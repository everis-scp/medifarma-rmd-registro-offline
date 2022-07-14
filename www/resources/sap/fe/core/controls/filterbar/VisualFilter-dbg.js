/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

// Provides control sap.fe.core.controls.filterbar.VisualFilter.
sap.ui.define(["sap/m/VBox", "sap/m/VBoxRenderer", "sap/fe/macros/CommonHelper"], function(VBox, VBoxRenderer, CommonHelper) {
	"use strict";

	/**
	 * Constructor for a new filterBar/aligned/FilterItemLayout.
	 * @param {string} [sId] ID for the new control, generated automatically if no ID is given
	 * @param {object} [mSettings] Initial settings for the new control
	 * @class Represents a filter item on the UI.
	 * @extends sap.m.VBox
	 * @implements {sap.ui.core.IFormContent}
	 * @class
	 * @private
	 * @since 1.61.0
	 * @alias control sap.fe.core.controls.filterbar.VisualFilter
	 */
	var VisualFilter = VBox.extend(
		"sap.fe.core.controls.filterbar.VisualFilter",
		/** @lends sap.ui.mdc.filterbar.aligned.FilterItemLayout.prototype */ {
			renderer: {
				apiVersion: 2,
				render: VBoxRenderer.render
			},
			metadata: {
				interfaces: ["sap.ui.core.IFormContent"]
			}
		}
	);

	VisualFilter.prototype.onAfterRendering = function() {
		var oInteractiveChart = this.getItems()[1].getItems()[0];
		var oInteractiveChartListBinding =
			oInteractiveChart.getBinding("segments") || oInteractiveChart.getBinding("bars") || oInteractiveChart.getBinding("points");
		var oInternalModelContext = oInteractiveChart.getBindingContext("internal");
		var sId = oInteractiveChart.getId().split("fe::VisualFilter");
		var sChartId = "fe::VisualFilter" + sId[1];
		var oResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.fe.macros");
		var bShowOverLayInitially = oInteractiveChart.data("showOverlayInitially");
		var oSelectionVariantAnnotation = CommonHelper.parseCustomData(oInteractiveChart.data("selectionVariantAnnotation"));
		var aRequiredProperties = CommonHelper.parseCustomData(oInteractiveChart.data("requiredProperties"));
		var oMetaModel = oInteractiveChart.getModel().getMetaModel();
		var sEntitySetPath = oInteractiveChartListBinding.getPath();
		if (bShowOverLayInitially === "true") {
			if (!Object.keys(oSelectionVariantAnnotation).length) {
				if (aRequiredProperties.length > 1) {
					oInternalModelContext.setProperty(sChartId, {
						"VFOverLayMessage": oResourceBundle.getText("M_VISUAL_FILTERS_PROVIDE_FILTER_VAL_MULTIPLEVF"),
						"showOverLayForVF": true
					});
				} else {
					var sLabel =
						oMetaModel.getObject(sEntitySetPath + "/" + aRequiredProperties[0] + "@com.sap.vocabularies.Common.v1.Label") ||
						aRequiredProperties[0];
					oInternalModelContext.setProperty(sChartId, {
						"VFOverLayMessage": oResourceBundle.getText("M_VISUAL_FILTERS_PROVIDE_FILTER_VAL_SINGLEVF", sLabel),
						"showOverLayForVF": true
					});
				}
			} else {
				var aSelectOptions = [];
				var aNotMatchedConditions = [];
				oSelectionVariantAnnotation.SelectOptions.forEach(function(oSelectOption) {
					aSelectOptions.push(oSelectOption.PropertyName.$PropertyPath);
				});
				aRequiredProperties.forEach(function(sPath) {
					if (aSelectOptions.indexOf(sPath) === -1) {
						aNotMatchedConditions.push(sPath);
					}
				});
				if (aNotMatchedConditions.length > 1) {
					oInternalModelContext.setProperty(sChartId, {
						"VFOverLayMessage": oResourceBundle.getText("M_VISUAL_FILTERS_PROVIDE_FILTER_VAL_MULTIPLEVF"),
						"showOverLayForVF": true
					});
				} else {
					var sLabel =
						oMetaModel.getObject(sEntitySetPath + "/" + aNotMatchedConditions[0] + "@com.sap.vocabularies.Common.v1.Label") ||
						aNotMatchedConditions[0];
					oInternalModelContext.setProperty(sChartId, {
						"VFOverLayMessage": oResourceBundle.getText("M_VISUAL_FILTERS_PROVIDE_FILTER_VAL_SINGLEVF", sLabel),
						"showOverLayForVF": true
					});
				}
				aNotMatchedConditions.length > 1
					? oInternalModelContext.setProperty(sChartId, {
							"VFOverLayMessage": oResourceBundle.getText("M_VISUAL_FILTERS_PROVIDE_FILTER_VAL_MULTIPLEVF"),
							"showOverLayForVF": true
					  })
					: oInternalModelContext.setProperty(sChartId, {
							"VFOverLayMessage": oResourceBundle.getText(
								"M_VISUAL_FILTERS_PROVIDE_FILTER_VAL_SINGLEVF",
								aNotMatchedConditions[0]
							),
							"showOverLayForVF": true
					  });
			}
		}

		var bShowOverlay = oInternalModelContext.getProperty(sChartId) && oInternalModelContext.getProperty(sChartId).showOverLayForVF;
		// resume binding for only those visual filters that do not have a in parameter attached.
		// Bindings of visual filters with inParameters will be resumed later after considering in parameters.
		if (oInteractiveChartListBinding && oInteractiveChartListBinding.isSuspended() && !bShowOverlay) {
			oInteractiveChartListBinding.resume();
		}
	};
	return VisualFilter;
});
