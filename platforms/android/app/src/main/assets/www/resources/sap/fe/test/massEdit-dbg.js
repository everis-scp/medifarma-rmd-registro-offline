/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	[],
	function() {
		"use strict";

		var MassEditRuntime = {
			handleMassEditChange: function(oSource, value, bValidationCase) {
				var oDialog =
					oSource &&
					oSource
						.getParent()
						.getParent()
						.getParent();
				var oFieldsInfoData = oDialog && oDialog.getModel("fieldsInfo").getData();
				var oDataObject = {
					keyValue: oSource.getId().substring(oSource.getId().lastIndexOf(":") + 1),
					value: value
				};
				if (!value && bValidationCase) {
					// var oSourceControl = sap.ui.getCore().byId(sUnitId);
					oSource.setValueState("Error");
					oSource.setValueStateText("Please enter a value");
					oDataObject = {
						control: oSource,
						valueState: "Error",
						valueStateText: "Please enter a value",
						validationError: true
					};
				} else {
					oSource.setValueState("None");
					oSource.setValueStateText(null);
				}
				oFieldsInfoData.results.push(oDataObject);
			}
		};

		return MassEditRuntime;
	},
	/* bExport= */ true
);
