sap.ui.define([
    "sap/ui/base/Object",
    "sap/base/util/extend",
    "sap/suite/ui/generic/template/js/StableIdHelper"
], function(BaseObject, extend, StableIdHelper) {
    "use strict";
    
	function getMethods(oState, oController, oTemplateUtils) {

        function getSmartList() {
            var sSmartListId = StableIdHelper.getStableId({
                type: "ListReportTable",
                subType: "SmartList"
            });
            return oState.oMultipleViewsHandler.getPresentationControl() || oController.byId(sSmartListId);
        }

        function getBinding() {
            return getSmartList().getList().getBinding("items");
        }

        function getEntitySet() {
            return getSmartList().getEntitySet();
        }

		// public instance methods
		return {
            getBinding: getBinding,
            getEntitySet: getEntitySet
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.ListReport.controller.SmartListHandler", {
		constructor: function(oState, oController, oTemplateUtils) {
			extend(this, getMethods(oState, oController, oTemplateUtils));
		}
	});
});