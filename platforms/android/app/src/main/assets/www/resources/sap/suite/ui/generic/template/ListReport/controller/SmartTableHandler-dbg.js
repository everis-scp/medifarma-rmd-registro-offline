sap.ui.define([
    "sap/ui/base/Object",
    "sap/base/util/extend",
    "sap/suite/ui/generic/template/js/StableIdHelper"
], function(BaseObject, extend, StableIdHelper) {
    "use strict";
    
	function getMethods(oState, oController, oTemplateUtils) {
        function getSmartTable() {
            var sSmartTableId = StableIdHelper.getStableId({
                type: "ListReportTable",
                subType: "SmartTable"
            });
            return oState.oMultipleViewsHandler.getPresentationControl() || oController.byId(sSmartTableId);
        }

        function getBinding() {
            var oTable = getSmartTable().getTable();
            return oTable.getBinding("rows") || oTable.getBinding("items");
        }

        function getEntitySet() {
            return getSmartTable().getEntitySet();
        }

		// public instance methods
		return {
            getBinding: getBinding,
            getEntitySet: getEntitySet
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.ListReport.controller.SmartTableHandler", {
		constructor: function(oState, oController, oTemplateUtils) {
			extend(this, getMethods(oState, oController, oTemplateUtils));
		}
	});
});