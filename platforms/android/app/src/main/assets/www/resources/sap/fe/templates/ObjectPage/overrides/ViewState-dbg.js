/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/core/library"], function(CoreLibrary) {
	"use strict";

	var VariantManagement = CoreLibrary.VariantManagement;

	return {
		applyInitialStateOnly: function() {
			return false;
		},
		adaptStateControls: function(aStateControls) {
			var oView = this.getView(),
				oController = oView.getController(),
				oViewData = oView.getViewData(),
				bControlVM = false;

			switch (oViewData.variantManagement) {
				case VariantManagement.Control:
					bControlVM = true;
					break;
				case VariantManagement.Page:
				case VariantManagement.None:
					break;
				default:
					throw new Error("unhandled variant setting: " + oViewData.getVariantManagement());
			}

			oController._findTables().forEach(function(oTable) {
				var oQuickFilter = oTable.getQuickFilter();
				if (oQuickFilter) {
					aStateControls.push(oQuickFilter);
				}
				if (bControlVM) {
					aStateControls.push(oTable.getVariant());
				}
			});

			aStateControls.push(oView.byId("fe::ObjectPage"));
		}
	};
});
