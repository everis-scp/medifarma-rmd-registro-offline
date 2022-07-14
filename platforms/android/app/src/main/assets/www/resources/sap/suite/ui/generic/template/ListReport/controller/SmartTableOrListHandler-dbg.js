sap.ui.define([
    "sap/ui/base/Object",
    "sap/base/util/extend",
    "sap/suite/ui/generic/template/ListReport/controller/SmartTableHandler",
    "sap/suite/ui/generic/template/ListReport/controller/SmartListHandler",
    "sap/suite/ui/generic/template/js/StableIdHelper"
], function(BaseObject, extend, SmartTableHandler, SmartListHandler, StableIdHelper) {
	"use strict";
    var oImplementingHandler;
	// This helper class handles smart table or smart list in the List Report.
	function getMethods(oState, oController, oTemplateUtils) {
        var sSmartListId = StableIdHelper.getStableId({
            type: "ListReportTable",
            subType: "SmartList"
        });
        oImplementingHandler = oController.byId(sSmartListId) ? new SmartListHandler(oState, oController, oTemplateUtils) : new SmartTableHandler(oState, oController, oTemplateUtils);

		// public instance methods
		return {
            getBinding: oImplementingHandler.getBinding,
            getEntitySet: oImplementingHandler.getEntitySet
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.ListReport.controller.SmartTableOrListHandler", {
		constructor: function(oState, oController, oTemplateUtils) {
			extend(this, getMethods(oState, oController, oTemplateUtils));
		}
	});
});