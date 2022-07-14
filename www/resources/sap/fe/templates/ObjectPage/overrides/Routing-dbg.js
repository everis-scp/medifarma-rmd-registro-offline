/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/core/CommonUtils", "sap/fe/navigation/SelectionVariant"], function(CommonUtils, SelectionVariant) {
	"use strict";
	return {
		onBeforeNavigation: function(oContextInfo) {
			var oSource = oContextInfo.oEvent && oContextInfo.oEvent.getSource(),
				oPaginators = oSource && oSource.getMetadata().getName();
			if (!(oPaginators === "sap.uxap.ObjectPageHeaderActionButton")) {
				var oPageContext = this.getView().getBindingContext();
				if (oPageContext) {
					oContextInfo.objectPageContext = oPageContext.getObject();
				}
			}
			oContextInfo.oEvent ? delete oContextInfo.oEvent : oContextInfo;
		}
	};
});
