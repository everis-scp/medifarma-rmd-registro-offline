/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	[],
	function() {
		"use strict";

		/**
		 * Static class used by MDC Field during runtime
		 *
		 * @private
		 * @experimental This module is only for internal/experimental use!
		 */
		var MassEditRuntime = {
			handleMassEditChange: function(oEvent) {
				var oSource = oEvent && oEvent.getSource();
				var aParams = oSource && oSource.getSelectedKey() && oSource.getSelectedKey().split("/");
				var oDialog =
					oSource &&
					oSource
						.getParent()
						.getParent()
						.getParent();
				var oFieldsInfoData = oDialog && oDialog.getModel("fieldsInfo").getData();
				var oDataObject;
				//TODO - Value Help Handling Load Value Help when respective value is selected in combo Box in dialog
				/*
				if (aParams[0] === "ValueHelp") {
				} */
				if (aParams[0] === "Default") {
					oDataObject = { keyValue: aParams[1], value: aParams[0] };
				} else if (aParams[0] === "ClearFieldValue") {
					oDataObject = { keyValue: aParams[1], value: "" };
				} else if (!aParams) {
					var sPropertyName = oSource.getId().substring(oSource.getId().lastIndexOf(":") + 1);
					var aCurrentPropertyInfo = oFieldsInfoData.values[sPropertyName] || oFieldsInfoData.unitData[sPropertyName];
					var aRelatedProps = aCurrentPropertyInfo.filter(function(oPropertyInfo) {
						return oPropertyInfo && oPropertyInfo.fieldRequiredInfo && oPropertyInfo.fieldRequiredInfo.isFieldRequired;
					});

					if (
						!oSource.getValue() &&
						aRelatedProps &&
						aRelatedProps.length &&
						aRelatedProps[0].fieldRequiredInfo.isFieldRequired
					) {
						var oControl = sap.ui.getCore().byId(oSource.getId());
						if (oControl.getValueState() !== "Error") {
							oControl.setValueState("Error");
							oControl.setValueStateText("Please enter a value");
						}
						if (aRelatedProps[0].fieldRequiredInfo.relatedUnitField) {
							var idPrefix = oSource.getId().substring(0, oSource.getId().lastIndexOf(":") + 1);
							var relatedFieldId = idPrefix + aRelatedProps[0].fieldRequiredInfo.relatedUnitField;
							var oRealtedUnitControl = sap.ui.getCore().byId(relatedFieldId);
							oControl.unitPropertyControl = oRealtedUnitControl;
							if (oRealtedUnitControl.getValueState() !== "Error") {
								oRealtedUnitControl.setValueState("Error");
								oRealtedUnitControl.setValueStateText("Please enter a value");
							}
						}
						oDataObject = {
							control: oSource,
							valueState: "Error",
							valueStateText: "Please enter a value",
							validationError: true
						};
					} else {
						oDataObject = {
							keyValue: sPropertyName,
							value: oSource.getValue()
						};
					}
				} else {
					var aRelatedField =
						aParams[0] &&
						oFieldsInfoData.values &&
						oFieldsInfoData.values[aParams[0]].filter(function(oFieldData) {
							return oFieldData.text === oSource.getValue();
						});
					oDataObject =
						aRelatedField && aRelatedField[0] && aRelatedField[0].textInfo
							? { keyValue: aParams[0], value: aRelatedField[0].textInfo.value }
							: { keyValue: aParams[0], value: oSource.getValue() };
				}
				if (oDataObject && oDataObject.validationError) {
					oFieldsInfoData.results.push(oDataObject);
				} else if (oDataObject && oDataObject.value && oDataObject.keyValue && !oDataObject.validationError) {
					var oControl = sap.ui.getCore().byId(oSource.getId());
					if (oControl && oControl.getValueState() === "Error") {
						oControl.setValueState("None");
						oControl.setValueStateText(null);
						oControl.unitPropertyControl && oControl.unitPropertyControl.setValueState("None");
						oControl.unitPropertyControl && oControl.unitPropertyControl.setValueStateText(null);
					}
					oFieldsInfoData.results.push(oDataObject);
				}
			}
		};

		return MassEditRuntime;
	},
	/* bExport= */ true
);
