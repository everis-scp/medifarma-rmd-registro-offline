import {
	AvailabilityType,
	FilterFieldManifestConfiguration,
	FilterManifestConfiguration,
	MultipleViewsConfiguration,
	ViewPathConfiguration,
	SingleViewPathConfiguration,
	VisualizationType,
	FilterSettings,
	TemplateType,
	CombinedViewPathConfiguration,
	CustomViewTemplateConfiguration
} from "../ManifestSettings";
import { EntityType, NavigationProperty, Property } from "@sap-ux/annotation-converter";
import {
	DataVisualizationAnnotations,
	DataVisualizationDefinition,
	getDataVisualizationConfiguration,
	getDefaultChart,
	getDefaultLineItem,
	getDefaultPresentationVariant,
	getSelectionPresentationVariant,
	isPresentationCompliant,
	getSelectionVariant,
	isSelectionPresentationCompliant
} from "../controls/Common/DataVisualization";
import {
	LineItem,
	PresentationVariantTypeTypes,
	SelectionPresentationVariantTypeTypes,
	SelectOptionType,
	SelectionVariantTypeTypes,
	FieldGroupType,
	FieldGroup
} from "@sap-ux/vocabularies-types/dist/generated/UI";
import { AnnotationTerm, DataFieldAbstractTypes, DataFieldTypes, ReferenceFacetTypes, UIAnnotationTerms } from "@sap-ux/vocabularies-types";
import { CustomTabID, FilterBarID, FilterVariantManagementID, TableID, VisualFilterID } from "../helpers/ID";
import {
	getSelectionVariantConfiguration,
	SelectionVariantConfiguration,
	TableVisualization
} from "sap/fe/core/converters/controls/Common/Table";
import { ChartVisualization } from "sap/fe/core/converters/controls/Common/Chart";
import { BaseAction, getActionsFromManifest } from "sap/fe/core/converters/controls/Common/Action";
import { ConfigurableObject, CustomElement, insertCustomElements, Placement } from "sap/fe/core/converters/helpers/ConfigurableObject";
import { KeyHelper } from "sap/fe/core/converters/helpers/Key";
import { annotationExpression, compileBinding } from "sap/fe/core/helpers/BindingExpression";
import { IssueType, IssueSeverity, IssueCategory } from "sap/fe/core/converters/helpers/IssueManager";
import { isPropertyFilterable, getIsRequired } from "sap/fe/core/templating/FilterTemplating";
import { checkFilterExpressionRestrictions } from "sap/fe/core/templating/DataModelPathHelper";
import ConverterContext from "sap/fe/core/converters/ConverterContext";
import { AggregationHelper } from "../helpers/Aggregation";
import { KPIDefinition, getKPIDefinitions } from "../controls/Common/KPI";

type ViewAnnotationsTypeTypes = SelectionPresentationVariantTypeTypes | SelectionVariantTypeTypes;
type VariantManagementDefinition = {
	id: string;
	targetControlIds: string;
};

type MultipleViewConfiguration = ViewPathConfiguration & {
	annotation?: DataVisualizationAnnotations;
};

type SingleViewConfiguration = {
	annotation?: DataVisualizationAnnotations;
};

type CustomViewConfiguration = CustomViewTemplateConfiguration & {
	type: string;
};

type ViewConfiguration = MultipleViewConfiguration | SingleViewConfiguration | CustomViewConfiguration;
type ViewAnnotationConfiguration = MultipleViewConfiguration | SingleViewConfiguration;

type FilterField = ConfigurableObject & {
	conditionPath: string;
	availability: AvailabilityType;
	annotationPath: string;
	label?: string;
	template?: string;
	group?: string;
	groupLabel?: string;
	settings?: FilterSettings;
	isParameter?: boolean;
	visualFilter?: VisualFilters;
};

type VisualFilters = {
	dimensionPath?: string;
	measurePath?: string;
	visualFilterId?: string;
	label?: string;
	chartAnnotation?: string;
	presentationAnnotation?: string;
	visible?: boolean;
	outParameter?: string;
	inParameters?: object[];
	contextPath?: string;
	selectionVariantAnnotation?: string;
	multipleSelectionAllowed?: boolean;
	required?: boolean;
	showOverlayInitially?: boolean;
	requiredProperties?: object[];
};

type FilterGroup = {
	group?: string;
	groupLabel?: string;
};

type ViewConverterSettings = ViewConfiguration & {
	converterContext?: ConverterContext;
};

type CustomElementFilterField = CustomElement<FilterField>;

type DefaultSemanticDate = ConfigurableObject & {
	operator: string;
};

export type ListReportDefinition = {
	mainEntitySet: string;
	mainEntityType: string; // entityType> at the start of LR templating
	singleTableId?: string; // only with single Table mode
	singleChartId?: string; // only with single Table mode
	showTabCounts?: boolean; // only with multi Table mode
	headerActions: BaseAction[];
	showPinnableToggle?: boolean;
	filterBar: {
		selectionFields: FilterField[];
		hideBasicSearch: boolean;
	};
	views: ListReportViewDefinition[];
	filterConditions: object;
	isMultiEntitySets: boolean;
	filterBarId: string;
	variantManagement: VariantManagementDefinition;
	hasMultiVisualizations: boolean;
	useSemanticDateRange?: boolean;
	filterInitialLayout?: string;
	filterLayout?: string;
	kpiDefinitions: KPIDefinition[];
};

export type ListReportViewDefinition = SingleViewDefinition | CustomViewDefinition | CombinedViewDefinition;

export type CombinedViewDefinition = {
	selectionVariantPath?: string; // only with on multi Table mode
	title?: string; // only with multi Table mode
	primaryVisualization: DataVisualizationDefinition;
	secondaryVisualization: DataVisualizationDefinition;
	tableControlId: string;
	chartControlId: string;
	defaultPath?: string;
};

export type CustomViewDefinition = {
	title?: string; // only with multi Table mode
	fragment: string;
	type: string;
	customTabId: string;
};

export type SingleViewDefinition = {
	selectionVariantPath?: string; // only with on multi Table mode
	title?: string; // only with multi Table mode
	presentation: DataVisualizationDefinition;
	tableControlId: string;
};

type ContentAreaID = {
	chartId: string;
	tableId: string;
};

/**
 * Returns the condition path required for the condition model. It looks like follow:
 * <1:N-PropertyName>*\/<1:1-PropertyName>/<PropertyName>.
 *
 * @param entityType The root EntityTy[e
 * @param propertyPath The full path to the target property
 * @returns {string} The formatted condition path
 */
const _getConditionPath = function(entityType: EntityType, propertyPath: string): string {
	const parts = propertyPath.split("/");
	let partialPath;
	let key = "";
	while (parts.length) {
		let part = parts.shift() as string;
		partialPath = partialPath ? partialPath + "/" + part : part;
		const property: Property | NavigationProperty = entityType.resolvePath(partialPath);
		if (property._type === "NavigationProperty" && property.isCollection) {
			part += "*";
		}
		key = key ? key + "/" + part : part;
	}
	return key;
};

const _createFilterSelectionField = function(
	entityType: EntityType,
	property: Property,
	fullPropertyPath: string,
	includeHidden: boolean,
	converterContext: ConverterContext
): FilterField | undefined {
	// ignore complex property types and hidden annotated ones
	if (
		property !== undefined &&
		property.targetType === undefined &&
		(includeHidden || property.annotations?.UI?.Hidden?.valueOf() !== true)
	) {
		const targetEntityType = converterContext.getAnnotationEntityType(property);
		return {
			key: KeyHelper.getSelectionFieldKeyFromPath(fullPropertyPath),
			annotationPath: converterContext.getAbsoluteAnnotationPath(fullPropertyPath),
			conditionPath: _getConditionPath(entityType, fullPropertyPath),
			availability:
				property.annotations?.UI?.HiddenFilter?.valueOf() === true ? AvailabilityType.Hidden : AvailabilityType.Adaptation,
			label: compileBinding(annotationExpression(property.annotations.Common?.Label?.valueOf() || property.name)),
			group: targetEntityType.name,
			groupLabel: compileBinding(
				annotationExpression(targetEntityType?.annotations?.Common?.Label?.valueOf() || targetEntityType.name)
			)
		};
	}
	return undefined;
};

const _getSelectionFields = function(
	entityType: EntityType,
	navigationPath: string,
	properties: Array<Property> | undefined,
	includeHidden: boolean,
	converterContext: ConverterContext
): Record<string, FilterField> {
	const selectionFieldMap: Record<string, FilterField> = {};
	if (properties) {
		properties.forEach((property: Property) => {
			const propertyPath: string = property.name;
			const fullPath: string = (navigationPath ? navigationPath + "/" : "") + propertyPath;
			const selectionField = _createFilterSelectionField(entityType, property, fullPath, includeHidden, converterContext);
			if (selectionField) {
				selectionFieldMap[fullPath] = selectionField;
			}
		});
	}
	return selectionFieldMap;
};

const _getSelectionFieldsByPath = function(
	entityType: EntityType,
	propertyPaths: Array<string> | undefined,
	includeHidden: boolean,
	converterContext: ConverterContext
): Record<string, FilterField> {
	let selectionFields: Record<string, FilterField> = {};
	if (propertyPaths) {
		propertyPaths.forEach((propertyPath: string) => {
			let localSelectionFields: Record<string, FilterField>;

			const property: Property | NavigationProperty = entityType.resolvePath(propertyPath);
			if (property === undefined) {
				return;
			}
			if (property._type === "NavigationProperty") {
				// handle navigation properties
				localSelectionFields = _getSelectionFields(
					entityType,
					propertyPath,
					property.targetType.entityProperties,
					includeHidden,
					converterContext
				);
			} else if (property.targetType !== undefined) {
				// handle ComplexType properties
				localSelectionFields = _getSelectionFields(
					entityType,
					propertyPath,
					property.targetType.properties,
					includeHidden,
					converterContext
				);
			} else {
				const navigationPath = propertyPath.includes("/")
					? propertyPath
							.split("/")
							.splice(0, 1)
							.join("/")
					: "";
				localSelectionFields = _getSelectionFields(entityType, navigationPath, [property], includeHidden, converterContext);
			}

			selectionFields = {
				...selectionFields,
				...localSelectionFields
			};
		});
	}
	return selectionFields;
};

/**
 * Enter all DataFields of a given FieldGroup into the filterFacetMap.
 *
 * @param {AnnotationTerm<FieldGroupType>} fieldGroup
 * @returns {Record<string, FilterGroup>} The map of facets for the given fieldGroup
 */
function getFieldGroupFilterGroups(fieldGroup: AnnotationTerm<FieldGroupType>): Record<string, FilterGroup> {
	const filterFacetMap: Record<string, FilterGroup> = {};
	fieldGroup.Data.forEach((dataField: DataFieldAbstractTypes) => {
		if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataField") {
			filterFacetMap[dataField.Value.path] = {
				group: fieldGroup.fullyQualifiedName,
				groupLabel:
					compileBinding(
						annotationExpression(fieldGroup.Label || fieldGroup.annotations?.Common?.Label || fieldGroup.qualifier)
					) || fieldGroup.qualifier
			};
		}
	});
	return filterFacetMap;
}

/**
 * Retrieves all list report tables.
 * @param {ListReportViewDefinition[]} views The list report views configured in the manifest
 * @returns {TableVisualization[]} The list report table
 */
function getTableVisualizations(views: ListReportViewDefinition[]): TableVisualization[] {
	const tables: TableVisualization[] = [];
	views.forEach(function(view) {
		if (!(view as CustomViewDefinition).type) {
			const visualizations = (view as CombinedViewDefinition).secondaryVisualization
				? (view as CombinedViewDefinition).secondaryVisualization.visualizations
				: (view as SingleViewDefinition).presentation.visualizations;

			visualizations.forEach(function(visualization) {
				if (visualization.type === VisualizationType.Table) {
					tables.push(visualization);
				}
			});
		}
	});
	return tables;
}

/**
 * Determines if the FilterBar search field is hidden or not.
 *
 * @param {TableVisualization[]} listReportTables The list report tables
 * @param {ConverterContext} converterContext The converter context
 * @returns {boolean} The information if the FilterBar search field is hidden or not
 */
function getFilterBarhideBasicSearch(listReportTables: TableVisualization[], converterContext: ConverterContext): boolean {
	if (
		converterContext.getManifestWrapper().hasMultipleVisualizations() ||
		converterContext.getTemplateType() === TemplateType.AnalyticalListPage
	) {
		return true;
	}
	// Tries to find a non-analytical table with the main entity set (page entity set) as collection
	// if at least one table matches these conditions, basic search field must be displayed.
	const sContextPath = converterContext.getContextPath();
	return checkAllTableForEntitySetAreAnalytical(listReportTables, sContextPath);
}

/**
 * Check that all the tables for a dedicated entityset are configured as analytical table.
 * @param {TableVisualization[]} listReportTables List Report tables
 * @param {string} contextPath
 * @returns {boolean} Is FilterBar search field hidden or not
 */
function checkAllTableForEntitySetAreAnalytical(listReportTables: TableVisualization[], contextPath: string | undefined) {
	if (contextPath && listReportTables.length > 0) {
		return listReportTables.every(visualization => {
			return visualization.enableAnalytics && contextPath === visualization.annotation.collection;
		});
	}
	return false;
}

/**
 * Get all Parameter filterFields in case of a parameterized service.
 * @param {ConverterContext} converterContext
 * @returns {FilterField[]} An array of parameter filterfields
 */
function _getParameterFields(converterContext: ConverterContext): FilterField[] {
	const dataModelObjectPath = converterContext.getDataModelObjectPath();
	const parameterEntityType = dataModelObjectPath.startingEntitySet.entityType;
	const isParameterized = !!parameterEntityType.annotations?.Common?.ResultContext;
	const parameterConverterContext =
		isParameterized && converterContext.getConverterContextFor("/" + dataModelObjectPath.startingEntitySet.name);

	const parameterFields = (parameterConverterContext
		? parameterEntityType.entityProperties.map(function(property) {
				return _getFilterField({} as Record<string, FilterField>, property.name, parameterConverterContext, parameterEntityType);
		  })
		: []) as FilterField[];

	return parameterFields;
}

/**
 * Retrieve the configuration for the selection fields that will be used within the filter bar
 * This configuration takes into account annotation and the selection variants.
 *
 * @param {ConverterContext} converterContext
 * @param {TableVisualization[]} lrTables
 * @returns {FilterSelectionField[]} An array of selection fields
 */

export const getSelectionFields = function(converterContext: ConverterContext, lrTables: TableVisualization[] = []): FilterField[] {
	// Fetch all selectionVariants defined in the different visualizations and different views (multi table mode)
	const selectionVariants: SelectionVariantConfiguration[] = getSelectionVariants(lrTables, converterContext);

	// create a map of properties to be used in selection variants
	const excludedFilterProperties: Record<string, boolean> = getExcludedFilterProperties(selectionVariants);
	const entityType = converterContext.getEntityType();
	const filterFacets = entityType.annotations.UI?.FilterFacets;
	let filterFacetMap: Record<string, FilterGroup> = {};

	const aFieldGroups = converterContext.getAnnotationsByTerm("UI", UIAnnotationTerms.FieldGroup);

	if (filterFacets === undefined || filterFacets.length < 0) {
		for (const i in aFieldGroups) {
			filterFacetMap = {
				...filterFacetMap,
				...getFieldGroupFilterGroups(aFieldGroups[i] as AnnotationTerm<FieldGroupType>)
			};
		}
	} else {
		filterFacetMap = filterFacets.reduce((previousValue: Record<string, FilterGroup>, filterFacet: ReferenceFacetTypes) => {
			for (let i = 0; i < (filterFacet.Target.$target as FieldGroup).Data.length; i++) {
				previousValue[((filterFacet.Target.$target as FieldGroup).Data[i] as DataFieldTypes).Value.path] = {
					group: filterFacet?.ID?.toString(),
					groupLabel: filterFacet?.Label?.toString()
				};
			}
			return previousValue;
		}, {});
	}

	let aSelectOptions: any[] = [];
	const selectionVariant = getSelectionVariant(entityType, converterContext);
	if (selectionVariant) {
		aSelectOptions = selectionVariant.SelectOptions;
	}

	// create a map of all potential filter fields based on...
	const filterFields: Record<string, FilterField> = {
		// ...non hidden properties of the entity
		..._getSelectionFields(entityType, "", entityType.entityProperties, false, converterContext),
		// ...additional manifest defined navigation properties
		..._getSelectionFieldsByPath(
			entityType,
			converterContext.getManifestWrapper().getFilterConfiguration().navigationProperties,
			false,
			converterContext
		)
	};

	//Filters which has to be added which is part of SV/Default annotations but not present in the SelectionFields
	const defaultFilters = _getDefaultFilterFields(filterFields, aSelectOptions, entityType, converterContext, excludedFilterProperties);
	const parameterFields = _getParameterFields(converterContext);
	// finally create final list of filter fields by adding the SelectionFields first (order matters)...
	let allFilters = parameterFields
		.concat(
			entityType.annotations?.UI?.SelectionFields?.reduce((selectionFields: FilterField[], selectionField) => {
				const propertyPath = selectionField.value;
				if (!(propertyPath in excludedFilterProperties)) {
					const filterField: FilterField | undefined = _getFilterField(filterFields, propertyPath, converterContext, entityType);
					if (filterField) {
						filterField.group = "";
						filterField.groupLabel = "";
						selectionFields.push(filterField);
					}
				}
				return selectionFields;
			}, []) || []
		)
		// To add the FilterField which is not part of the Selection Fields but the property is mentioned in the Selection Variant
		.concat(defaultFilters || [])
		// ...and adding remaining filter fields, that are not used in a SelectionVariant (order doesn't matter)
		.concat(
			Object.keys(filterFields)
				.filter(propertyPath => !(propertyPath in excludedFilterProperties))
				.map(propertyPath => {
					return Object.assign(filterFields[propertyPath], filterFacetMap[propertyPath]);
				})
		);
	const sContextPath = converterContext.getContextPath();

	//if all tables are analytical tables "aggregatable" properties must be excluded
	if (checkAllTableForEntitySetAreAnalytical(lrTables, sContextPath)) {
		// Currently all agregates are root entity properties (no properties coming from navigation) and all
		// tables with same entitySet gets same aggreagte configuration that's why we can use first table into
		// LR to get aggregates (without currency/unit properties since we expect to be able to filter them).
		const aggregates = lrTables[0].aggregates;
		if (aggregates) {
			const aggregatableProperties: string[] = Object.keys(aggregates).map(aggregateKey => aggregates[aggregateKey].relativePath);
			allFilters = allFilters.filter(filterField => {
				return aggregatableProperties.indexOf(filterField.key) === -1;
			});
		}
	}

	const selectionFields = insertCustomElements(allFilters, getManifestFilterFields(entityType, converterContext), {
		"availability": "overwrite",
		label: "overwrite",
		position: "overwrite",
		template: "overwrite",
		settings: "overwrite",
		visualFilter: "overwrite"
	});
	return selectionFields;
};

const getVisualFilters = function(
	entityType: EntityType,
	converterContext: ConverterContext,
	sPropertyPath: string,
	FilterFields: Record<string, FilterFieldManifestConfiguration>
): VisualFilters | undefined {
	const visualFilter: VisualFilters = {};
	entityType.annotations?.UI?.SelectionFields?.map((selectionField: any) => {
		if (sPropertyPath === selectionField?.value) {
			const oVisualFilter: FilterFieldManifestConfiguration = FilterFields[sPropertyPath];
			if (oVisualFilter && oVisualFilter?.visualFilter && oVisualFilter?.visualFilter?.valueList) {
				const oVFPath = oVisualFilter?.visualFilter?.valueList;
				const annotationQualifierSplit = oVFPath.split("#");
				const qualifierVL =
					annotationQualifierSplit.length > 1 ? "ValueList#" + annotationQualifierSplit[1] : annotationQualifierSplit[0];
				const valueList: any = selectionField.$target?.annotations?.Common[qualifierVL];
				if (valueList) {
					const collectionPath = valueList?.CollectionPath;
					const collectionPathConverterContext = converterContext.getConverterContextFor(
						"/" + (collectionPath || converterContext.getEntitySet()?.name)
					);
					const valueListParams = valueList?.Parameters;
					let outParameter: any;
					const inParameters: Array<object> = [];
					if (valueListParams) {
						for (let i = 0; i < valueListParams.length; i++) {
							const localDataProperty = (valueListParams[i] as any).LocalDataProperty?.value;
							const valueListProperty = (valueListParams[i] as any).ValueListProperty;
							if (
								(valueListParams[i]?.$Type === "com.sap.vocabularies.Common.v1.ValueListParameterInOut" ||
									valueListParams[i]?.$Type === "com.sap.vocabularies.Common.v1.ValueListParameterOut") &&
								sPropertyPath === localDataProperty
							) {
								outParameter = valueListParams[i];
							}
							if (
								(valueListParams[i]?.$Type === "com.sap.vocabularies.Common.v1.ValueListParameterInOut" ||
									valueListParams[i]?.$Type === "com.sap.vocabularies.Common.v1.ValueListParameterIn") &&
								sPropertyPath !== localDataProperty
							) {
								const bNotFilterable = isPropertyFilterable(collectionPathConverterContext, valueListProperty);
								if (!bNotFilterable) {
									inParameters.push({
										localDataProperty: localDataProperty,
										valueListProperty: valueListProperty
									});
								}
							}
						}
					}
					if (inParameters && inParameters.length) {
						inParameters.forEach(function(oInParameter: any) {
							const mainEntitySetInMappingAllowedExpression = compileBinding(
								checkFilterExpressionRestrictions(
									converterContext
										.getConverterContextFor(converterContext.getAbsoluteAnnotationPath(oInParameter?.localDataProperty))
										.getDataModelObjectPath(),
									["SingleValue"]
								)
							);
							const valueListEntitySetInMappingAllowedExpression = compileBinding(
								checkFilterExpressionRestrictions(
									collectionPathConverterContext
										.getConverterContextFor(
											collectionPathConverterContext.getAbsoluteAnnotationPath(oInParameter?.valueListProperty)
										)
										.getDataModelObjectPath(),
									["SingleValue"]
								)
							);
							if (
								valueListEntitySetInMappingAllowedExpression === "true" &&
								mainEntitySetInMappingAllowedExpression === "false"
							) {
								throw new Error(
									"FilterRestrictions of " + sPropertyPath + " in MainEntitySet and ValueListEntitySet are different"
								);
							}
						});
					}
					const pvQualifier = valueList?.PresentationVariantQualifier;
					const svQualifier = valueList?.SelectionVariantQualifier;
					const pvAnnotation: any = collectionPathConverterContext?.getEntityTypeAnnotation(
						"@UI.PresentationVariant#" + pvQualifier
					)?.annotation;
					const aggregationHelper = new AggregationHelper(
						collectionPathConverterContext.getEntityType(),
						collectionPathConverterContext
					);
					if (!aggregationHelper.isAnalyticsSupported()) {
						return;
					}
					if (pvAnnotation) {
						const aVisualizations = pvAnnotation?.Visualizations;
						const contextPath = "/" + collectionPathConverterContext?.getEntitySet()?.name;
						visualFilter.contextPath = contextPath;
						let chartAnnotation;
						for (let i = 0; i < aVisualizations.length; i++) {
							if (aVisualizations[i].$target?.term === "com.sap.vocabularies.UI.v1.Chart") {
								chartAnnotation = aVisualizations[i];
								break;
							}
						}
						if (chartAnnotation) {
							const _bgetVFAggregation: boolean | undefined = _checkVFAggregation(
								collectionPathConverterContext,
								chartAnnotation,
								aggregationHelper
							);
							if (!_bgetVFAggregation) {
								return;
							}
							const bDimensionHidden: boolean = chartAnnotation?.$target?.Dimensions[0]?.$target?.annotations?.UI?.Hidden?.valueOf();
							const bDimensionHiddenFilter: boolean = chartAnnotation?.$target?.Dimensions[0]?.$target?.annotations?.UI?.HiddenFilter?.valueOf();
							if (bDimensionHidden === true || bDimensionHiddenFilter === true) {
								return;
							} else {
								if (aVisualizations && aVisualizations.length) {
									visualFilter.chartAnnotation = chartAnnotation
										? collectionPathConverterContext?.getAbsoluteAnnotationPath(
												chartAnnotation.fullyQualifiedName + "/$AnnotationPath/"
										  )
										: undefined;
									visualFilter.presentationAnnotation = pvAnnotation
										? collectionPathConverterContext?.getAbsoluteAnnotationPath(pvAnnotation.fullyQualifiedName + "/")
										: undefined;
									visualFilter.visualFilterId = VisualFilterID(chartAnnotation?.$target?.Dimensions[0]?.value);
									visualFilter.outParameter = outParameter?.LocalDataProperty?.value;
									visualFilter.inParameters = inParameters;
									const bIsRange = checkFilterExpressionRestrictions(
										converterContext
											.getConverterContextFor(converterContext.getAbsoluteAnnotationPath(sPropertyPath))
											.getDataModelObjectPath(),
										["SingleRange", "MultiRange"]
									);

									if (compileBinding(bIsRange) === "true") {
										throw new Error("Range AllowedExpression is not supported for visual filters");
									}

									const bIsMainEntitySetSingleSelection: any = checkFilterExpressionRestrictions(
										converterContext
											.getConverterContextFor(converterContext.getAbsoluteAnnotationPath(sPropertyPath))
											.getDataModelObjectPath(),
										["SingleValue"]
									);
									visualFilter.multipleSelectionAllowed = compileBinding(!bIsMainEntitySetSingleSelection.value) as any;
									visualFilter.required = getIsRequired(converterContext, sPropertyPath);
									let svAnnotation: any;
									if (svQualifier) {
										svAnnotation = collectionPathConverterContext?.getEntityTypeAnnotation(
											"@UI.SelectionVariant#" + svQualifier
										)?.annotation;
										visualFilter.selectionVariantAnnotation = svAnnotation
											? collectionPathConverterContext?.getAbsoluteAnnotationPath(
													svAnnotation.fullyQualifiedName + "/"
											  )
											: undefined;
									}
									const entitySetAnnotations = collectionPathConverterContext.getEntitySet()?.annotations;
									let requiredPropertyPaths: Array<object> = [];
									const requiredProperties = entitySetAnnotations?.Capabilities?.FilterRestrictions
										?.RequiredProperties as any[];
									if (requiredProperties?.length) {
										requiredProperties.forEach(function(oRequireProperty: any) {
											requiredPropertyPaths.push(oRequireProperty.value);
										});
									}
									visualFilter.requiredProperties = requiredPropertyPaths;
									if (visualFilter.requiredProperties?.length) {
										if (!visualFilter.inParameters || !visualFilter.inParameters.length) {
											if (!visualFilter.selectionVariantAnnotation) {
												visualFilter.showOverlayInitially = true;
											} else {
												let selectOptions: any[] = [];
												svAnnotation?.SelectOptions.forEach(function(oSelectOption: any) {
													selectOptions.push(oSelectOption.PropertyName.value);
												});
												requiredPropertyPaths = requiredPropertyPaths.sort();
												selectOptions = selectOptions.sort();
												visualFilter.showOverlayInitially = requiredPropertyPaths.some(function(sPath) {
													return selectOptions.indexOf(sPath) === -1;
												});
											}
										} else {
											visualFilter.showOverlayInitially = false;
										}
									} else {
										visualFilter.showOverlayInitially = false;
									}
								}
							}
						} else {
							converterContext
								.getDiagnostics()
								.addIssue(IssueCategory.Annotation, IssueSeverity.High, IssueType.MALFORMED_VISUALFILTERS.CHART);
						}
					} else {
						converterContext
							.getDiagnostics()
							.addIssue(IssueCategory.Annotation, IssueSeverity.High, IssueType.MALFORMED_VISUALFILTERS.PRESENTATIONVARIANT);
					}
				} else {
					converterContext
						.getDiagnostics()
						.addIssue(IssueCategory.Annotation, IssueSeverity.High, IssueType.MALFORMED_VISUALFILTERS.VALUELIST);
				}
			} else {
				converterContext
					.getDiagnostics()
					.addIssue(IssueCategory.Manifest, IssueSeverity.High, IssueType.MALFORMED_VISUALFILTERS.VALUELIST);
			}
		}
	});
	if (Object.keys(visualFilter).length > 1) {
		return visualFilter;
	}
};

/**
 * Checks that measures and dimensions of the visual filter chart can be aggregated and grouped.
 * @param converterContext The converter context
 * @param chartAnnotation The chart annotation
 * @param aggregationHelper The aggregation helper
 * @returns {boolean | undefined }
 */

const _checkVFAggregation = function(
	converterContext: ConverterContext,
	chartAnnotation: any,
	aggregationHelper: any
): boolean | undefined {
	let sMeasurePath, bGroupable, bAggregatable;
	const sMeasure: string = chartAnnotation?.$target?.Measures[0]?.value;
	const sDimension: string = chartAnnotation?.$target?.Dimensions[0]?.value;
	const customAggregates = aggregationHelper.getCustomAggregateDefinitions();
	const aTransAggregations = converterContext.getAnnotationsByTerm(
		"Analytics",
		"com.sap.vocabularies.Analytics.v1.AggregatedProperties",
		[converterContext.getEntityContainer(), converterContext.getEntityType()]
	);
	if (customAggregates[sMeasure]) {
		sMeasurePath = sMeasure;
	} else if (aTransAggregations && aTransAggregations[0]) {
		const aAggregations = aTransAggregations[0];
		aAggregations.some(function(oAggregate: any) {
			if (oAggregate.Name === sMeasure) {
				sMeasurePath = oAggregate?.AggregatableProperty.value;
			}
		});
	}
	const aAggregatablePropsFromContainer = (converterContext.getEntitySet()?.annotations?.Aggregation?.ApplySupported
		?.AggregatableProperties || []) as any[];
	const aGroupablePropsFromContainer = (converterContext.getEntitySet()?.annotations?.Aggregation?.ApplySupported?.GroupableProperties ||
		[]) as any[];
	if (aAggregatablePropsFromContainer && aAggregatablePropsFromContainer.length) {
		for (let i = 0; i < aAggregatablePropsFromContainer.length; i++) {
			if (aAggregatablePropsFromContainer[i]?.Property?.value === sMeasurePath) {
				bAggregatable = true;
			}
		}
	}
	if (aGroupablePropsFromContainer && aGroupablePropsFromContainer.length) {
		for (let i = 0; i < aGroupablePropsFromContainer.length; i++) {
			if (aGroupablePropsFromContainer[i]?.value === sDimension) {
				bGroupable = true;
			}
		}
	}
	return bAggregatable && bGroupable;
};

const _getDefaultFilterFields = function(
	filterFields: Record<string, FilterField>,
	aSelectOptions: any[],
	entityType: EntityType,
	converterContext: ConverterContext,
	excludedFilterProperties: Record<string, boolean>
): FilterField[] {
	const selectionFields: FilterField[] = [];
	const UISelectionFields: any = {};
	const properties = entityType.entityProperties;
	// Using entityType instead of entitySet
	entityType.annotations?.UI?.SelectionFields?.forEach(SelectionField => {
		UISelectionFields[SelectionField.value] = true;
	});
	if (aSelectOptions && aSelectOptions.length > 0) {
		aSelectOptions?.forEach((selectOption: SelectOptionType) => {
			const propertyName: any = selectOption.PropertyName;
			const sPropertyPath: string = propertyName.value;
			const UISelectionFields: any = {};
			entityType.annotations?.UI?.SelectionFields?.forEach(SelectionField => {
				UISelectionFields[SelectionField.value] = true;
			});
			if (!(sPropertyPath in excludedFilterProperties)) {
				if (!(sPropertyPath in UISelectionFields)) {
					const FilterField: FilterField | undefined = _getFilterField(filterFields, sPropertyPath, converterContext, entityType);
					if (FilterField) {
						selectionFields.push(FilterField);
					}
				}
			}
		});
	} else if (properties) {
		properties.forEach((property: Property) => {
			const defaultFilterValue = property.annotations?.Common?.FilterDefaultValue;
			const PropertyPath = property.name;
			if (!(PropertyPath in excludedFilterProperties)) {
				if (defaultFilterValue && !(PropertyPath in UISelectionFields)) {
					const FilterField: FilterField | undefined = _getFilterField(filterFields, PropertyPath, converterContext, entityType);
					if (FilterField) {
						selectionFields.push(FilterField);
					}
				}
			}
		});
	}
	return selectionFields;
};

const _getFilterField = function(
	filterFields: Record<string, FilterField>,
	propertyPath: string,
	converterContext: ConverterContext,
	entityType: EntityType
): FilterField | undefined {
	let filterField: FilterField | undefined = filterFields[propertyPath];
	if (filterField) {
		delete filterFields[propertyPath];
	} else {
		filterField = _createFilterSelectionField(entityType, entityType.resolvePath(propertyPath), propertyPath, true, converterContext);
	}
	if (!filterField) {
		converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.High, IssueType.MISSING_SELECTIONFIELD);
	}
	// defined SelectionFields are available by default
	if (filterField) {
		filterField.availability = AvailabilityType.Default;
		filterField.isParameter = !!entityType.annotations?.Common?.ResultContext;
	}
	return filterField;
};

const getDefaultSemanticDates = function(filterFields: Record<string, CustomElementFilterField>): Record<string, DefaultSemanticDate> {
	const defaultSemanticDates: any = {};
	for (const filterField in filterFields) {
		if (filterFields[filterField]?.settings?.defaultValues?.length) {
			defaultSemanticDates[filterField] = filterFields[filterField]?.settings?.defaultValues;
		}
	}
	return defaultSemanticDates;
};

export const getFilterField = function(propertyPath: string, converterContext: ConverterContext, entityType: EntityType) {
	return _getFilterField({}, propertyPath, converterContext, entityType);
};

/**
 * Retrieves filter fields from the manifest.
 *
 * @param entityType The current entityType
 * @param converterContext The converter context
 * @returns {Record<string, CustomElementFilterField>} The filter fields defined in the manifest
 */
const getManifestFilterFields = function(
	entityType: EntityType,
	converterContext: ConverterContext
): Record<string, CustomElementFilterField> {
	const fbConfig: FilterManifestConfiguration = converterContext.getManifestWrapper().getFilterConfiguration();
	const definedFilterFields: Record<string, FilterFieldManifestConfiguration> = fbConfig?.filterFields || {};
	const selectionFields: Record<string, FilterField> = _getSelectionFieldsByPath(
		entityType,
		Object.keys(definedFilterFields).map(key => KeyHelper.getPathFromSelectionFieldKey(key)),
		true,
		converterContext
	);
	const filterFields: Record<string, CustomElementFilterField> = {};

	for (const sKey in definedFilterFields) {
		const filterField = definedFilterFields[sKey];
		const propertyName = KeyHelper.getPathFromSelectionFieldKey(sKey);
		const selectionField = selectionFields[propertyName];
		const visualFilter = getVisualFilters(entityType, converterContext, sKey, definedFilterFields);
		filterFields[sKey] = {
			key: sKey,
			annotationPath: selectionField?.annotationPath,
			conditionPath: selectionField?.conditionPath || propertyName,
			template: filterField.template,
			label: filterField.label,
			position: filterField.position || { placement: Placement.After },
			availability: filterField.availability || AvailabilityType.Default,
			settings: filterField.settings,
			visualFilter: visualFilter
		};
	}
	return filterFields;
};

/**
 * Find a visualization annotation that can be used for rendering the list report.
 *
 * @param {EntityType} entityType The current EntityType
 * @param converterContext
 * @param bIsALP
 * @returns {LineItem | PresentationVariantTypeTypes | undefined} A compliant annotation for rendering the list report
 */
function getCompliantVisualizationAnnotation(
	entityType: EntityType,
	converterContext: ConverterContext,
	bIsALP: Boolean
): LineItem | PresentationVariantTypeTypes | SelectionPresentationVariantTypeTypes | undefined {
	const annotationPath = converterContext.getManifestWrapper().getDefaultTemplateAnnotationPath();
	const selectionPresentationVariant = getSelectionPresentationVariant(entityType, annotationPath, converterContext);
	if (annotationPath && selectionPresentationVariant) {
		const presentationVariant = selectionPresentationVariant.PresentationVariant;
		if (!presentationVariant) {
			throw new Error("Presentation Variant is not configured in the SPV mentioned in the manifest");
		}
		const bPVComplaint = isPresentationCompliant(selectionPresentationVariant.PresentationVariant);
		if (!bPVComplaint) {
			return undefined;
		}
		if (isSelectionPresentationCompliant(selectionPresentationVariant, bIsALP)) {
			return selectionPresentationVariant;
		}
	}
	if (selectionPresentationVariant) {
		if (isSelectionPresentationCompliant(selectionPresentationVariant, bIsALP)) {
			return selectionPresentationVariant;
		}
	}
	const presentationVariant = getDefaultPresentationVariant(entityType);
	if (presentationVariant) {
		if (isPresentationCompliant(presentationVariant, bIsALP)) {
			return presentationVariant;
		}
	}
	if (!bIsALP) {
		const defaultLineItem = getDefaultLineItem(entityType);
		if (defaultLineItem) {
			return defaultLineItem;
		}
	}
	return undefined;
}

const getView = function(viewConverterConfiguration: ViewConverterSettings): ListReportViewDefinition {
	let config = viewConverterConfiguration;
	if (config.converterContext) {
		let converterContext = config.converterContext;
		config = config as ViewAnnotationConfiguration;
		let presentation: DataVisualizationDefinition = getDataVisualizationConfiguration(
			config.annotation
				? converterContext.getRelativeAnnotationPath(config.annotation.fullyQualifiedName, converterContext.getEntityType())
				: "",
			true,
			converterContext,
			config as ViewPathConfiguration
		);
		let tableControlId = "";
		let chartControlId = "";
		let title: string | undefined = "";
		let selectionVariantPath = "";
		const isMultipleViewConfiguration = function(config: ViewConfiguration): config is MultipleViewConfiguration {
			return (config as MultipleViewConfiguration).key !== undefined;
		};
		const createVisualization = function(presentation: DataVisualizationDefinition, isPrimary?: boolean) {
			let defaultVisualization;
			for (const visualization of presentation.visualizations) {
				if (isPrimary && visualization.type === VisualizationType.Chart) {
					defaultVisualization = visualization;
					break;
				}
				if (!isPrimary && visualization.type === VisualizationType.Table) {
					defaultVisualization = visualization;
					break;
				}
			}
			const presentationCreated = Object.assign({}, presentation);
			if (defaultVisualization) {
				presentationCreated.visualizations = [defaultVisualization];
			}
			return presentationCreated;
		};
		const getPresentation = function(item: SingleViewPathConfiguration) {
			const resolvedTarget = converterContext.getEntityTypeAnnotation(item.annotationPath);
			const targetAnnotation = resolvedTarget.annotation as DataVisualizationAnnotations;
			converterContext = resolvedTarget.converterContext;
			const annotation = targetAnnotation;
			presentation = getDataVisualizationConfiguration(
				annotation
					? converterContext.getRelativeAnnotationPath(annotation.fullyQualifiedName, converterContext.getEntityType())
					: "",
				true,
				converterContext,
				config as ViewPathConfiguration
			);
			return presentation;
		};
		const createAlpView = function(
			presentations: DataVisualizationDefinition[],
			defaultPath: "both" | "primary" | "secondary" | undefined
		) {
			const primaryVisualization: DataVisualizationDefinition | undefined = createVisualization(presentations[0], true);
			chartControlId = (primaryVisualization?.visualizations[0] as ChartVisualization).id;
			const secondaryVisualization: DataVisualizationDefinition | undefined = createVisualization(
				presentations[1] ? presentations[1] : presentations[0]
			);
			tableControlId = (secondaryVisualization?.visualizations[0] as TableVisualization).annotation.id;
			if (primaryVisualization && secondaryVisualization) {
				const view: CombinedViewDefinition = {
					primaryVisualization,
					secondaryVisualization,
					tableControlId,
					chartControlId,
					defaultPath
				};
				return view;
			}
		};
		if (presentation?.visualizations?.length === 2 && converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
			const view: CombinedViewDefinition | undefined = createAlpView([presentation], "both");
			if (view) {
				return view;
			}
		} else if (
			converterContext.getManifestWrapper().hasMultipleVisualizations(config as ViewPathConfiguration) ||
			converterContext.getTemplateType() === TemplateType.AnalyticalListPage
		) {
			const { primary, secondary } = config as CombinedViewPathConfiguration;
			if (primary && primary.length && secondary && secondary.length) {
				const view: CombinedViewDefinition | undefined = createAlpView(
					[getPresentation(primary[0]), getPresentation(secondary[0])],
					(config as CombinedViewPathConfiguration).defaultPath
				);
				if (view) {
					return view;
				}
			} else {
				throw new Error("SecondaryItems in the Views is not present");
			}
		} else if (isMultipleViewConfiguration(config)) {
			// key exists only on multi tables mode
			const resolvedTarget = converterContext.getEntityTypeAnnotation((config as SingleViewPathConfiguration).annotationPath);
			const viewAnnotation: ViewAnnotationsTypeTypes = resolvedTarget.annotation as ViewAnnotationsTypeTypes;
			converterContext = resolvedTarget.converterContext;
			title = compileBinding(annotationExpression(viewAnnotation.Text));
			// Need to loop on table into views since multi table mode get specific configuration (hidden filters or Table Id)
			presentation.visualizations.forEach((visualizationDefinition, index) => {
				switch (visualizationDefinition.type) {
					case VisualizationType.Table:
						const tableVisualization = presentation.visualizations[index] as TableVisualization;
						const filters = tableVisualization.control.filters || {};
						filters.hiddenFilters = filters.hiddenFilters || { paths: [] };
						if (!(config as SingleViewPathConfiguration).keepPreviousPresonalization) {
							// Need to override Table Id to match with Tab Key (currently only table is managed in multiple view mode)
							tableVisualization.annotation.id = TableID((config as SingleViewPathConfiguration).key || "", "LineItem");
						}
						config = config as ViewAnnotationConfiguration;
						if (config && config.annotation && config.annotation.term === UIAnnotationTerms.SelectionPresentationVariant) {
							selectionVariantPath = (config.annotation as SelectionPresentationVariantTypeTypes).SelectionVariant.fullyQualifiedName.split(
								"@"
							)[1];
						} else {
							selectionVariantPath = (config as SingleViewPathConfiguration).annotationPath;
						}
						//Provide Selection Variant to hiddenFilters in order to set the SV filters to the table.
						//MDC Table overrides binding Filter and from SAP FE the only method where we are able to add
						//additional filter is 'rebindTable' into Table delegate.
						//To avoid implementing specific LR feature to SAP FE Macro Table, the filter(s) related to the Tab (multi table mode)
						//can be passed to macro table via parameter/context named filters and key hiddenFilters.
						filters.hiddenFilters.paths.push({ annotationPath: selectionVariantPath });
						tableVisualization.control.filters = filters;
						break;
					case VisualizationType.Chart:
						// Not currently managed
						break;
					default:
						break;
				}
			});
		}
		presentation.visualizations.forEach(visualizationDefinition => {
			if (visualizationDefinition.type === VisualizationType.Table) {
				tableControlId = visualizationDefinition.annotation.id;
			} else if (visualizationDefinition.type === VisualizationType.Chart) {
				chartControlId = visualizationDefinition.id;
			}
		});
		return {
			presentation,
			tableControlId,
			chartControlId,
			title,
			selectionVariantPath
		};
	} else {
		config = config as CustomViewConfiguration;
		const title = config.label,
			fragment = config.template,
			type = config.type,
			customTabId = CustomTabID(config.key || "");
		return {
			title,
			fragment,
			type,
			customTabId
		};
	}
};

const getViews = function(
	converterContext: ConverterContext,
	settingsViews: MultipleViewsConfiguration | undefined
): ListReportViewDefinition[] {
	let viewConverterConfigs: ViewConverterSettings[] = [];
	if (settingsViews) {
		settingsViews.paths.forEach((path: ViewPathConfiguration | CustomViewTemplateConfiguration) => {
			if (converterContext.getManifestWrapper().hasMultipleVisualizations(path as ViewPathConfiguration)) {
				if (settingsViews.paths.length > 1) {
					throw new Error("ALP flavor cannot have multiple views");
				} else {
					path = path as CombinedViewPathConfiguration;
					viewConverterConfigs.push({
						converterContext: converterContext,
						primary: path.primary,
						secondary: path.secondary,
						defaultPath: path.defaultPath
					});
				}
			} else if ((path as CustomViewConfiguration).template) {
				path = path as CustomViewConfiguration;
				viewConverterConfigs.push({
					key: path.key,
					label: path.label,
					template: path.template,
					type: "Custom"
				});
			} else {
				path = path as SingleViewPathConfiguration;
				const manifestWrapper = converterContext.getManifestWrapper(),
					viewConverterContext = converterContext.getConverterContextFor(
						path.contextPath || (path.entitySet && "/" + path.entitySet) || converterContext.getContextPath()
					),
					entityType = viewConverterContext.getEntityType();

				if (entityType && viewConverterContext) {
					const annotationPath = manifestWrapper.getDefaultTemplateAnnotationPath();
					let annotation;
					const resolvedTarget = viewConverterContext.getEntityTypeAnnotation(path.annotationPath);
					const targetAnnotation = resolvedTarget.annotation as DataVisualizationAnnotations;
					converterContext = resolvedTarget.converterContext;
					if (targetAnnotation) {
						if (targetAnnotation.term === UIAnnotationTerms.SelectionVariant) {
							if (annotationPath) {
								annotation = getSelectionPresentationVariant(
									viewConverterContext.getEntityType(),
									annotationPath,
									converterContext
								);
							} else {
								annotation = getDefaultLineItem(viewConverterContext.getEntityType()) as LineItem;
							}
						} else {
							annotation = targetAnnotation;
						}
						viewConverterConfigs.push({
							converterContext: viewConverterContext,
							annotation,
							annotationPath: path.annotationPath,
							keepPreviousPresonalization: path.keepPreviousPresonalization,
							key: path.key
						});
					}
				} else {
					// TODO Diagnostics message
				}
			}
		});
	} else {
		const entityType = converterContext.getEntityType();
		if (converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
			viewConverterConfigs = getAlpViewConfig(converterContext, viewConverterConfigs);
		} else {
			viewConverterConfigs.push({
				annotation: getCompliantVisualizationAnnotation(entityType, converterContext, false),
				converterContext: converterContext
			});
		}
	}
	return viewConverterConfigs.map(viewConverterConfig => {
		return getView(viewConverterConfig);
	});
};

function getAlpViewConfig(converterContext: ConverterContext, viewConfigs: ViewConverterSettings[]): ViewConverterSettings[] {
	const entityType = converterContext.getEntityType();
	const annotation = getCompliantVisualizationAnnotation(entityType, converterContext, true);
	let chart, table;
	if (annotation) {
		viewConfigs.push({
			annotation: annotation,
			converterContext
		});
	} else {
		chart = getDefaultChart(entityType);
		table = getDefaultLineItem(entityType);
		if (chart && table) {
			const primary: SingleViewPathConfiguration[] = [{ annotationPath: chart.term }];
			const secondary: SingleViewPathConfiguration[] = [{ annotationPath: table.term }];
			viewConfigs.push({
				converterContext: converterContext,
				primary: primary,
				secondary: secondary,
				defaultPath: "both"
			});
		}
	}
	return viewConfigs;
}

export const getHeaderActions = function(converterContext: ConverterContext): BaseAction[] {
	const manifestWrapper = converterContext.getManifestWrapper();
	return insertCustomElements([], getActionsFromManifest(manifestWrapper.getHeaderActions(), converterContext));
};

/**
 * Create the ListReportDefinition for the multi entitySets (multi table instances).
 *
 * @param converterContext
 * @returns {ListReportDefinition} The list report definition based on annotation + manifest
 */
export const convertPage = function(converterContext: ConverterContext): ListReportDefinition {
	const entityType = converterContext.getEntityType();
	const sContextPath = converterContext.getContextPath();

	if (!sContextPath) {
		// If we don't have an entitySet at this point we have an issue I'd say
		throw new Error(
			"An EntitySet is required to be able to display a ListReport, please adjust your `entitySet` property to point to one."
		);
	}
	const manifestWrapper = converterContext.getManifestWrapper();
	const viewsDefinition: MultipleViewsConfiguration | undefined = manifestWrapper.getViewConfiguration();
	const hasMultipleEntitySets = manifestWrapper.hasMultipleEntitySets();
	const views: ListReportViewDefinition[] = getViews(converterContext, viewsDefinition);
	const showTabCounts = viewsDefinition ? viewsDefinition?.showCounts || hasMultipleEntitySets : undefined; // with multi EntitySets, tab counts are displayed by default
	const lrTableVisualizations = getTableVisualizations(views);
	const showPinnableToggle = lrTableVisualizations.some(table => table.control.type === "ResponsiveTable");
	let singleTableId = "";
	let singleChartId = "";
	const filterBarId = FilterBarID(sContextPath);
	const filterVariantManagementID = FilterVariantManagementID(filterBarId);
	const targetControlIds = [filterBarId].concat(
		lrTableVisualizations.map(visualization => {
			return visualization.annotation.id;
		})
	);
	const fbConfig = manifestWrapper.getFilterConfiguration();
	const filterInitialLayout = fbConfig?.initialLayout !== undefined ? fbConfig?.initialLayout.toLowerCase() : "compact";
	const filterLayout = fbConfig?.layout !== undefined ? fbConfig?.layout.toLowerCase() : "compact";
	const useSemanticDateRange = fbConfig.useSemanticDateRange !== undefined ? fbConfig.useSemanticDateRange : true;

	const oConfig = getContentAreaId(converterContext, views);
	if (oConfig) {
		singleChartId = oConfig.chartId;
		singleTableId = oConfig.tableId;
	}
	const selectionFields = getSelectionFields(converterContext, lrTableVisualizations);

	const hideBasicSearch = getFilterBarhideBasicSearch(lrTableVisualizations, converterContext);
	const selectionVariant = getSelectionVariant(entityType, converterContext);
	const defaultSemanticDates: any = useSemanticDateRange
		? getDefaultSemanticDates(getManifestFilterFields(entityType, converterContext))
		: {};
	// Sort header actions according to position attributes in manifest
	const headerActions = getHeaderActions(converterContext);
	const hasMultiVisualizations: boolean =
		manifestWrapper.hasMultipleVisualizations() || converterContext.getTemplateType() === TemplateType.AnalyticalListPage;

	return {
		mainEntitySet: sContextPath,
		mainEntityType: sContextPath + "/",
		singleTableId,
		singleChartId,
		showTabCounts,
		headerActions,
		showPinnableToggle: showPinnableToggle,
		filterBar: {
			selectionFields,
			hideBasicSearch
		},
		views: views,
		filterBarId,
		filterConditions: {
			selectionVariant: selectionVariant,
			defaultSemanticDates: defaultSemanticDates
		},
		variantManagement: {
			id: filterVariantManagementID,
			targetControlIds: targetControlIds.join(",")
		},
		isMultiEntitySets: hasMultipleEntitySets,
		hasMultiVisualizations: hasMultiVisualizations,
		useSemanticDateRange,
		filterInitialLayout,
		filterLayout,
		kpiDefinitions: getKPIDefinitions(converterContext)
	};
};

function getSelectionVariants(
	lrTableVisualizations: TableVisualization[],
	converterContext: ConverterContext
): SelectionVariantConfiguration[] {
	const selectionVariantPaths: string[] = [];
	return lrTableVisualizations
		.map(visualization => {
			const tableFilters = visualization.control.filters;
			const tableSVConfigs: SelectionVariantConfiguration[] = [];
			for (const key in tableFilters) {
				if (Array.isArray(tableFilters[key].paths)) {
					const paths = tableFilters[key].paths;
					paths.forEach(path => {
						if (path && path.annotationPath && selectionVariantPaths.indexOf(path.annotationPath) === -1) {
							selectionVariantPaths.push(path.annotationPath);
							const selectionVariantConfig = getSelectionVariantConfiguration(path.annotationPath, converterContext);
							if (selectionVariantConfig) {
								tableSVConfigs.push(selectionVariantConfig);
							}
						}
					});
				}
			}
			return tableSVConfigs;
		})
		.reduce((svConfigs, selectionVariant) => svConfigs.concat(selectionVariant), []);
}

function getExcludedFilterProperties(selectionVariants: SelectionVariantConfiguration[]): Record<string, boolean> {
	return selectionVariants.reduce((previousValue: Record<string, boolean>, selectionVariant) => {
		selectionVariant.propertyNames.forEach(propertyName => {
			previousValue[propertyName] = true;
		});
		return previousValue;
	}, {});
}

function getContentAreaId(converterContext: ConverterContext, views: ListReportViewDefinition[]): ContentAreaID | undefined {
	let singleTableId = "",
		singleChartId = "";
	if (
		converterContext.getManifestWrapper().hasMultipleVisualizations() ||
		converterContext.getTemplateType() === TemplateType.AnalyticalListPage
	) {
		for (let view of views) {
			view = view as CombinedViewDefinition;
			if (view.chartControlId && view.tableControlId) {
				singleChartId = view.chartControlId;
				singleTableId = view.tableControlId;
				break;
			}
		}
	} else {
		singleTableId = (views[0] as SingleViewDefinition).tableControlId;
	}
	if (singleTableId || singleChartId) {
		return {
			chartId: singleChartId,
			tableId: singleTableId
		};
	}
	return undefined;
}
