import { KPIConfiguration } from "../../ManifestSettings";
import { Property } from "@sap-ux/annotation-converter";
import {
	AnnotationTerm,
	UIAnnotationTerms,
	PathAnnotationExpression,
	CriticalityType,
	ImprovementDirectionType
} from "@sap-ux/vocabularies-types";
import { KPIType } from "@sap-ux/vocabularies-types/dist/generated/UI";
import ConverterContext from "sap/fe/core/converters/ConverterContext";
import { KPIID } from "../../helpers/ID";
import { isPathExpression } from "sap/fe/core/templating/PropertyHelper";
import { MessageType } from "sap/fe/core/formatters/TableFormatterTypes";
import { AggregationHelper } from "../../helpers/Aggregation";
import { IssueCategory, IssueSeverity, IssueType } from "sap/fe/core/converters/helpers/IssueManager";
import { getMessageTypeFromCriticalityType } from "./Criticality";
import { getFilterDefinitionsFromSelectionVariant, FilterDefinition } from "sap/fe/core/converters/helpers/SelectionVariantHelper";

export type KPIDefinition = {
	id: string;
	entitySet: string;
	datapoint: {
		annotationPath: string;
		propertyPath: string;
		unit?: {
			value: string;
			isPath: boolean;
			isCurrency: boolean;
		};
		criticalityPath?: string;
		criticalityValue?: MessageType;
		criticalityCalculationMode?: ImprovementDirectionType;
		criticalityCalculationThresholds?: (number | undefined | null)[];
	};
	selectionVariantFilterDefinitions?: FilterDefinition[];
};

function createKPIDefinition(kpiName: string, kpiConfig: KPIConfiguration, converterContext: ConverterContext): KPIDefinition | undefined {
	const kpiConverterContext = converterContext.getConverterContextFor("/" + kpiConfig.entitySet);
	const aKPIAnnotations = kpiConverterContext.getAnnotationsByTerm("UI", UIAnnotationTerms.KPI) as AnnotationTerm<KPIType>[];
	const targetKPI = aKPIAnnotations.find(kpi => {
		return kpi.qualifier === kpiConfig.qualifier;
	});
	const aggregationHelper = new AggregationHelper(kpiConverterContext.getEntityType(), kpiConverterContext);

	if (targetKPI && targetKPI.Detail?.DefaultPresentationVariant && aggregationHelper.isAnalyticsSupported()) {
		const kpiID = KPIID(kpiName);

		// Datapoint
		const datapointAnnotation = targetKPI.DataPoint;
		const datapointProperty = datapointAnnotation.Value.$target as Property;
		if (!aggregationHelper.isPropertyAggregatable(datapointProperty)) {
			// The main property of the KPI is not aggregatable --> We can't calculate its value so we ignore the KPI
			converterContext
				.getDiagnostics()
				.addIssue(
					IssueCategory.Annotation,
					IssueSeverity.Medium,
					IssueType.KPI_ISSUES.MAIN_PROPERTY_NOT_AGGREGATABLE + kpiConfig.qualifier
				);
			return undefined;
		}

		const kpiDef: KPIDefinition = {
			id: kpiID,
			entitySet: kpiConfig.entitySet,
			datapoint: {
				propertyPath: datapointAnnotation.Value.path,
				annotationPath: kpiConverterContext.getEntitySetBasedAnnotationPath(datapointAnnotation.fullyQualifiedName)
			},
			selectionVariantFilterDefinitions: targetKPI.SelectionVariant
				? getFilterDefinitionsFromSelectionVariant(targetKPI.SelectionVariant)
				: undefined
		};

		// Unit or currency
		const targetValueProperty = datapointAnnotation.Value.$target as Property;
		if (targetValueProperty.annotations.Measures?.ISOCurrency) {
			const currency = targetValueProperty.annotations.Measures?.ISOCurrency;
			if (isPathExpression(currency)) {
				kpiDef.datapoint.unit = {
					value: ((currency.$target as unknown) as Property).name,
					isCurrency: true,
					isPath: true
				};
			} else {
				kpiDef.datapoint.unit = {
					value: currency.toString(),
					isCurrency: true,
					isPath: false
				};
			}
		} else if (targetValueProperty.annotations.Measures?.Unit) {
			const unit = targetValueProperty.annotations.Measures?.Unit;
			if (isPathExpression(unit)) {
				kpiDef.datapoint.unit = {
					value: ((unit.$target as unknown) as Property).name,
					isCurrency: false,
					isPath: true
				};
			} else {
				kpiDef.datapoint.unit = {
					value: unit.toString(),
					isCurrency: false,
					isPath: false
				};
			}
		}

		// Criticality
		if (datapointAnnotation.Criticality) {
			if (typeof datapointAnnotation.Criticality === "object") {
				// Criticality is a path --> check if the corresponding property is aggregatable
				const criticalityProperty = (datapointAnnotation.Criticality as PathAnnotationExpression<CriticalityType>)
					.$target as Property;
				if (aggregationHelper.isPropertyAggregatable(criticalityProperty)) {
					kpiDef.datapoint.criticalityPath = (datapointAnnotation.Criticality as PathAnnotationExpression<CriticalityType>).path;
				} else {
					// The property isn't aggregatable --> we ignore it
					kpiDef.datapoint.criticalityValue = MessageType.None;
				}
			} else {
				// Criticality is an enum Value --> get the corresponding static value
				kpiDef.datapoint.criticalityValue = getMessageTypeFromCriticalityType(datapointAnnotation.Criticality);
			}
		} else if (datapointAnnotation.CriticalityCalculation) {
			kpiDef.datapoint.criticalityCalculationMode = datapointAnnotation.CriticalityCalculation.ImprovementDirection;
			kpiDef.datapoint.criticalityCalculationThresholds = [];
			switch (kpiDef.datapoint.criticalityCalculationMode) {
				case "UI.ImprovementDirectionType/Target":
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.DeviationRangeLowValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.ToleranceRangeLowValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.AcceptanceRangeLowValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.AcceptanceRangeHighValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.ToleranceRangeHighValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.DeviationRangeHighValue
					);
					break;

				case "UI.ImprovementDirectionType/Minimize":
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.AcceptanceRangeHighValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.ToleranceRangeHighValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.DeviationRangeHighValue
					);
					break;

				case "UI.ImprovementDirectionType/Maximize":
				default:
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.DeviationRangeLowValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.ToleranceRangeLowValue
					);
					kpiDef.datapoint.criticalityCalculationThresholds.push(
						datapointAnnotation.CriticalityCalculation.AcceptanceRangeLowValue
					);
			}
		} else {
			kpiDef.datapoint.criticalityValue = MessageType.None;
		}

		return kpiDef;
	} else {
		if (!targetKPI) {
			// Couldn't find a KPI with the qualifier specified in the manifest
			converterContext
				.getDiagnostics()
				.addIssue(IssueCategory.Annotation, IssueSeverity.Medium, IssueType.KPI_ISSUES.KPI_NOT_FOUND + kpiConfig.qualifier);
		} else if (!targetKPI.Detail?.DefaultPresentationVariant) {
			// No KPI detail/default presentation variant
			converterContext
				.getDiagnostics()
				.addIssue(IssueCategory.Annotation, IssueSeverity.Medium, IssueType.KPI_ISSUES.KPI_DETAIL_NOT_FOUND + kpiConfig.qualifier);
		} else {
			// Entity doesn't support analytics
			converterContext
				.getDiagnostics()
				.addIssue(IssueCategory.Annotation, IssueSeverity.Medium, IssueType.KPI_ISSUES.NO_ANALYTICS + kpiConfig.entitySet);
		}
		return undefined;
	}
}

/**
 * Creates the KPI definitions from the manifest and the annotations.
 *
 * @param {ConverterContext} converterContext The converter context for the page
 * @returns {KPIDefinition[]} Returns an array of KPI definitions
 */
export function getKPIDefinitions(converterContext: ConverterContext): KPIDefinition[] {
	const kpiConfigs = converterContext.getManifestWrapper().getKPIConfiguration(),
		kpiDefs: KPIDefinition[] = [];

	Object.keys(kpiConfigs).forEach(kpiName => {
		const oDef = createKPIDefinition(kpiName, kpiConfigs[kpiName], converterContext);
		if (oDef) {
			kpiDefs.push(oDef);
		}
	});

	return kpiDefs;
}
