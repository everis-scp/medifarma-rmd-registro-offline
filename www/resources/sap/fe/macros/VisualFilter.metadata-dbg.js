/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

sap.ui.define(
	[
		"./MacroMetadata",
		"sap/fe/core/converters/MetaModelConverter",
		"sap/fe/core/converters/helpers/Aggregation",
		"sap/fe/core/templating/DataModelPathHelper"
	],
	function(MacroMetadata, MetaModelConverter, AggregationHelper, DataModelPathHelper) {
		"use strict";

		/**
		 * @classdesc
		 * Macro for creating an VisualFilter based on provided OData v4 metadata.
		 * <br>
		 * A Chart annotation is required to bring up an Interactive Chart
		 *
		 *
		 * Usage example:
		 * <pre>
		 * &lt;macro:VisualFilter
		 *   collection="{entitySet&gt;}"
		 *   chartAnnotation="{chartAnnotation&gt;}"
		 *   id="someID"
		 *   groupId="someGroupID"
		 *   title="some Title"
		 * /&gt;
		 * </pre>
		 *
		 * @class sap.fe.macros.VisualFilter
		 * @hideconstructor
		 * @private
		 * @experimental
		 */
		var VisualFilter = MacroMetadata.extend("sap.fe.macros.VisualFilter", {
			/**
			 * Name of the macro control.
			 */
			name: "VisualFilter",
			/**
			 * Namespace of the macro control
			 */
			namespace: "sap.fe.macros",
			/**
			 * Fragment source of the macro (optional) - if not set, fragment is generated from namespace and name
			 */
			fragment: "sap.fe.macros.VisualFilter",
			/**
			 * The metadata describing the macro control.
			 */
			metadata: {
				/**
				 * Properties.
				 */
				properties: {
					/**
					 * ID of the visual filter
					 */
					id: {
						type: "string"
					},
					/**
					 * Title for the visual filter.
					 */
					title: {
						type: "string",
						defaultValue: ""
					},
					/**
					 * Metadata path to the entitySet or navigationProperty
					 */
					contextPath: {
						type: "sap.ui.model.Context",
						required: true,
						$kind: ["EntitySet", "NavigationProperty"]
					},
					/**
					 * Metadata path to the presentation variant annotations
					 */
					metaPath: {
						type: "sap.ui.model.Context"
					},
					/**
					 * Property Path of the Dimension in the main entity set
					 */
					outParameter: {
						type: "string"
					},
					/**
					 * Metadata path to the selection variant annotations
					 */
					selectionVariantAnnotation: {
						type: "sap.ui.model.Context"
					},
					/**
					 * inParameters applicable to the visual filter
					 */
					inParameters: {
						type: "sap.ui.model.Context"
					},
					/**
					 * multiple selection applicable to the visual filter
					 */
					multipleSelectionAllowed: {
						type: "boolean"
					},
					/**
					 * required property of the visual filter
					 */
					required: {
						type: "boolean"
					},
					showOverlayInitially: {
						type: "boolean"
					},
					requiredProperties: {
						type: "sap.ui.model.Context"
					}
				}
			},
			create: function(oProps, oControlConfiguration, mSettings) {
				oProps.groupId = "$auto.visualFilters";
				oProps.inParameters = oProps.inParameters.getObject();
				this.setDefaultValue(oProps, "aggregateProperties", undefined);
				this.setDefaultValue(oProps, "bCustomAggregate", false);
				var oContextObjectPath = MetaModelConverter.getInvolvedDataModelObjects(oProps.metaPath, oProps.contextPath);
				var oConverterContext = this.getConverterContext(oContextObjectPath, oProps.contextPath, mSettings);
				var aggregationHelper = new AggregationHelper.AggregationHelper(oConverterContext.getEntityType(), oConverterContext);
				var customAggregates = aggregationHelper.getCustomAggregateDefinitions();
				var oModel = oProps.contextPath && oProps.contextPath.getModel();
				var sPath = oProps.metaPath && oProps.metaPath.getPath();
				var pvAnnotation = oModel.getObject(sPath);
				var chartAnnotation, sMeasure;
				var aVisualizations = pvAnnotation && pvAnnotation.Visualizations;
				if (aVisualizations) {
					for (var i = 0; i < aVisualizations.length; i++) {
						var sAnnotationPath = pvAnnotation.Visualizations[i] && pvAnnotation.Visualizations[i].$AnnotationPath;
						chartAnnotation =
							oConverterContext.getEntityTypeAnnotation(sAnnotationPath) &&
							oConverterContext.getEntityTypeAnnotation(sAnnotationPath).annotation;
					}
				}
				if (chartAnnotation && chartAnnotation.Measures[0]) {
					sMeasure = chartAnnotation.Measures[0].value;
				}
				if (customAggregates[sMeasure]) {
					oProps.bCustomAggregate = true;
				}
				var oSelectionVariant = oProps.selectionVariantAnnotation && oProps.selectionVariantAnnotation.getObject();
				var iSelectOptionsForDimension = 0;
				if (oSelectionVariant && !oProps.multipleSelectionAllowed) {
					for (var j = 0; j < oSelectionVariant.SelectOptions.length; j++) {
						if (oSelectionVariant.SelectOptions[j].PropertyName.$PropertyPath === chartAnnotation.Dimensions[0].value) {
							iSelectOptionsForDimension++;
							if (iSelectOptionsForDimension > 1) {
								throw new Error("Multiple SelectOptions for FilterField having SingleValue Allowed Expression");
							}
						}
					}
				}
				var aAggregations = oConverterContext.getAnnotationsByTerm(
					"Analytics",
					"com.sap.vocabularies.Analytics.v1.AggregatedProperties",
					[oConverterContext.getEntityContainer(), oConverterContext.getEntityType()]
				);
				var oAggregation = this.getAggregateProperties(aAggregations[0], sMeasure);
				if (oAggregation) {
					oProps.aggregateProperties = oAggregation;
				}
				var vUOM = this.getUoM(oModel, oProps.contextPath, sMeasure, oAggregation);
				if (vUOM && vUOM.$Path && customAggregates[vUOM.$Path]) {
					oProps.bUoMHasCustomAggregate = true;
				} else {
					oProps.bUoMHasCustomAggregate = false;
				}
				return oProps;
			},

			getAggregateProperties: function(aAggregations, sMeasure) {
				var oMatchedAggregate = {};
				if (!aAggregations) {
					return;
				}
				aAggregations.some(function(oAggregate) {
					if (oAggregate.Name === sMeasure) {
						oMatchedAggregate = oAggregate;
						return true;
					}
				});
				return oMatchedAggregate;
			},

			getUoM: function(oModel, sContextPath, sMeasure, oAggregation) {
				var vISOCurrency = oModel.getObject(sContextPath + "/" + sMeasure + "@Org.OData.Measures.V1.ISOCurrency");
				var vUnit = oModel.getObject(sContextPath + "/" + sMeasure + "@Org.OData.Measures.V1.Unit");
				if (!vISOCurrency && !vUnit && oAggregation && oAggregation.AggregatableProperty) {
					vISOCurrency = oModel.getObject(
						sContextPath + "/" + oAggregation.AggregatableProperty.value + "@Org.OData.Measures.V1.ISOCurrency"
					);
					vUnit = oModel.getObject(sContextPath + "/" + oAggregation.AggregatableProperty.value + "@Org.OData.Measures.V1.Unit");
				}
				return vISOCurrency || vUnit;
			}
		});
		return VisualFilter;
	}
);
