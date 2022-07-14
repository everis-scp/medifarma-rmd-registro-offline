/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

sap.ui.define(
	["sap/ui/model/odata/v4/AnnotationHelper", "sap/ui/base/ManagedObject", "sap/fe/macros/CommonHelper"],
	function(ODataModelAnnotationHelper, ManagedObject, CommonHelper) {
		"use strict";

		/*
	 This class contains annotation helpers that might be used from several templates or controls
	 */

		var AnnotationHelper = {
			getElementBinding: function(sPath) {
				var sNavigationPath = ODataModelAnnotationHelper.getNavigationPath(sPath);
				if (sNavigationPath) {
					return "{path:'" + sNavigationPath + "'}";
				} else {
					//no navigation property needs empty object
					return "{path: ''}";
				}
			},

			/**
			 * Function to check if draft pattern is supported.
			 *
			 * @param {object} oAnnotations Annotations of the current entity set.
			 * @returns {string} Returns the Boolean value based on draft state
			 */
			checkDraftState: function(oAnnotations) {
				if (
					oAnnotations["@com.sap.vocabularies.Common.v1.DraftRoot"] &&
					oAnnotations["@com.sap.vocabularies.Common.v1.DraftRoot"]["EditAction"]
				) {
					return true;
				} else {
					return false;
				}
			},

			/**
			 * Function to get the visibility for the SwitchToActive button in the object page or subobject page.
			 *
			 * @param {object} oAnnotations Annotations of the current entity set.
			 * @returns {string} Returns expression binding or Boolean value based on the draft state
			 */
			getSwitchToActiveVisibility: function(oAnnotations) {
				if (this.checkDraftState(oAnnotations)) {
					return "{= (${ui>/editMode} === 'Editable') && !${ui>createMode} && %{DraftAdministrativeData/DraftIsCreatedByMe} }";
				} else {
					return false;
				}
			},

			/**
			 * Function to get the visibility for the SwitchToDraft button in the object page or subobject page.
			 *
			 * @param {object} oAnnotations Annotations of the current entity set.
			 * @returns {string} Returns expression binding or Boolean value based on the draft state
			 */
			getSwitchToDraftVisibility: function(oAnnotations) {
				if (this.checkDraftState(oAnnotations)) {
					return "{= !(${ui>/editMode} === 'Editable') && !${ui>createMode} && (${HasDraftEntity} && %{DraftAdministrativeData/DraftIsCreatedByMe}) }";
				} else {
					return false;
				}
			},

			/**
			 * Function to format the 'enable' property for the Delete button in the object page or subobject page in case of Command Execution.
			 * @param {object} oDeletable Current 'delete' restriction value for the entity set.
			 * @param {Array}	aConverterContextHeaderActions Array of 'header' actions on the object page.
			 * @returns {string} Returns the expression binding or Boolean value based on oDeleteHidden, viewLevel.
			 */
			getDeleteCommandExecutionEnabled: function(oDeletable, aConverterContextHeaderActions) {
				var oDeleteAction = aConverterContextHeaderActions.find(function(oAction) {
					return oAction.type === "Secondary";
				});
				return this.getDeleteButtonEnabled(oDeletable, oDeleteAction.parentEntityDeleteEnabled);
			},
			/**
			 * Function to format the 'visible' property for the Delete button on the object page or subobject page in case of a Command Execution.
			 *
			 * @param {Array} aConverterContextHeaderActions Array of header actions on the object page
			 * @returns {string} Returns expression binding or Boolean value from the converter output
			 */
			getDeleteCommandExecutionVisible: function(aConverterContextHeaderActions) {
				var oDeleteAction = aConverterContextHeaderActions.find(function(oAction) {
					return oAction.type === "Secondary";
				});

				return oDeleteAction ? oDeleteAction.visible : "true";
			},
			/**
			 * Function to format the 'visible' property for the Edit button on the object page or subobject page in case of a Command Execution.
			 *
			 * @param {Array} aConverterContextHeaderActions Array of header actions on the object page
			 * @returns {string} Returns expression binding or Boolean value from the converter output
			 */
			getEditCommandExecutionVisible: function(aConverterContextHeaderActions) {
				var oEditAction = aConverterContextHeaderActions.find(function(oAction) {
					return oAction.type === "Primary";
				});

				return oEditAction ? oEditAction.visible : "true";
			},
			/**
			 * Function to get the enablement for the Delete button on the object page or subobject page.
			 *
			 * @param {object} [oDeletable] Delete restrictions on the entity set
			 * @returns {string} Returns expression binding or Boolean value based on oDeletable
			 */
			fnGetDeleteButtonEnabled: function(oDeletable) {
				if (oDeletable === "false") {
					return false;
				} else if (oDeletable && oDeletable !== "true") {
					return "{= $" + oDeletable + "}";
				} else {
					return true;
				}
			},

			/**
			 * Function to get the enablement for the Delete button in the object page/sub-object page based on current and parent entity-set restrictions.
			 *
			 * @param {object} [oDeletable] Current Entity Set delete restriction value.
			 * @param {object} [bParentDeleteRestrictionEnabled] The parent entity's delete restriction value via navigation restriction.
			 * @returns {string} Returns expression binding or boolean value based on oDeletable
			 */
			getDeleteButtonEnabled: function(oDeletable, bParentDeleteRestrictionEnabled) {
				var bDeletable = AnnotationHelper.fnGetDeleteButtonEnabled(oDeletable);
				return bParentDeleteRestrictionEnabled ? bParentDeleteRestrictionEnabled : bDeletable;
			},
			/**
			 * Function to get the EditAction from the Entityset based on Draft or sticky based application.
			 *
			 * @param {object} [oEntitySet] The value from the expression.
			 * @returns {string} Returns expression binding or boolean value based on vRawValue & oDraftNode
			 */
			getEditAction: function(oEntitySet) {
				var sPath = oEntitySet.getPath(),
					oAnnotations = oEntitySet.getObject(sPath + "@");
				var bDraftRoot = oAnnotations.hasOwnProperty("@com.sap.vocabularies.Common.v1.DraftRoot");
				var bStickySession = oAnnotations.hasOwnProperty("@com.sap.vocabularies.Session.v1.StickySessionSupported");
				var sActionName;
				if (bDraftRoot) {
					sActionName = oEntitySet.getObject(sPath + "@com.sap.vocabularies.Common.v1.DraftRoot/EditAction");
				} else if (bStickySession) {
					sActionName = oEntitySet.getObject(sPath + "@com.sap.vocabularies.Session.v1.StickySessionSupported/EditAction");
				}
				return !sActionName ? sActionName : sPath + "/" + sActionName;
			},
			isReadOnlyFromStaticAnnotations: function(oAnnotations, oFieldControl) {
				var bComputed, bImmutable, bReadOnly;
				if (oAnnotations["@Org.OData.Core.V1.Computed"]) {
					bComputed = oAnnotations["@Org.OData.Core.V1.Computed"].Bool
						? oAnnotations["@Org.OData.Core.V1.Computed"].Bool == "true"
						: true;
				}
				if (oAnnotations["@Org.OData.Core.V1.Immutable"]) {
					bImmutable = oAnnotations["@Org.OData.Core.V1.Immutable"].Bool
						? oAnnotations["@Org.OData.Core.V1.Immutable"].Bool == "true"
						: true;
				}
				bReadOnly = bComputed || bImmutable;

				if (oFieldControl) {
					bReadOnly = bReadOnly || oFieldControl == "com.sap.vocabularies.Common.v1.FieldControlType/ReadOnly";
				}
				if (bReadOnly) {
					return false;
				} else {
					return true;
				}
			},
			isReadOnlyFromDynamicAnnotations: function(oFieldControl) {
				var sIsFieldControlPathReadOnly;
				if (oFieldControl) {
					if (ManagedObject.bindingParser(oFieldControl)) {
						sIsFieldControlPathReadOnly = "$" + oFieldControl + " === '1'";
					}
				}
				if (sIsFieldControlPathReadOnly) {
					return "{= " + sIsFieldControlPathReadOnly + "? false : true }";
				} else {
					return true;
				}
			},
			/*
			 * Function to get the expression for chart Title Press
			 *
			 * @function
			 * @param {oConfiguration} [oConfigurations] control configuration from manifest
			 *  @param {oManifest} [oManifest] Outbounds from manifest
			 * returns {String} [sCollectionName] Collection Name of the Micro Chart
			 *
			 * returns {String} [Expression] Handler Expression for the title press
			 *
			 */
			getExpressionForMicroChartTitlePress: function(oConfiguration, oManifestOutbound, sCollectionName) {
				if (oConfiguration) {
					if (
						(oConfiguration["targetOutbound"] && oConfiguration["targetOutbound"]["outbound"]) ||
						(oConfiguration["targetOutbound"] &&
							oConfiguration["targetOutbound"]["outbound"] &&
							oConfiguration["targetSections"])
					) {
						return (
							".handlers.onDataPointTitlePressed($controller, ${$source>/},'" +
							JSON.stringify(oManifestOutbound) +
							"','" +
							oConfiguration["targetOutbound"]["outbound"] +
							"','" +
							sCollectionName +
							"' )"
						);
					} else if (oConfiguration["targetSections"]) {
						return ".handlers.navigateToSubSection($controller, '" + JSON.stringify(oConfiguration["targetSections"]) + "')";
					} else {
						return undefined;
					}
				}
			},
			/*
			 * Function to render Chart Title as Link
			 *
			 * @function
			 * @param {oControlConfiguration} [oConfigurations] control configuration from manifest
			 * returns {String} [sKey] For the TargetOutbound and TargetSection
			 *
			 */
			getMicroChartTitleAsLink: function(oControlConfiguration) {
				if (
					oControlConfiguration &&
					(oControlConfiguration["targetOutbound"] ||
						(oControlConfiguration["targetOutbound"] && oControlConfiguration["targetSections"]))
				) {
					return "External";
				} else if (oControlConfiguration && oControlConfiguration["targetSections"]) {
					return "InPage";
				} else {
					return "None";
				}
			},

			/* Get groupId from control configuration
			 *
			 * @function
			 * @param {Object} [oConfigurations] control configuration from manifest
			 * @param {String} [sAnnotationPath] Annotation Path for the configuration
			 * @description Used to get the groupId for DataPoints and MicroCharts in the Header.
			 *
			 */
			getGroupIdFromConfig: function(oConfigurations, sAnnotationPath, sDefaultGroupId) {
				var oConfiguration = oConfigurations[sAnnotationPath],
					aAutoPatterns = ["Heroes", "Decoration", "Workers", "LongRunners"],
					sGroupId = sDefaultGroupId;
				if (
					oConfiguration &&
					oConfiguration.requestGroupId &&
					aAutoPatterns.some(function(autoPattern) {
						return autoPattern === oConfiguration.requestGroupId;
					})
				) {
					sGroupId = "$auto." + oConfiguration.requestGroupId;
				}
				return sGroupId;
			},

			/*
			 * Get Context Binding with groupId from control configuration
			 *
			 * @function
			 * @param {Object} [oConfigurations] control configuration from manifest
			 * @param {String} [sKey] Annotation Path for of the configuration
			 * @description Used to get the binding for DataPoints in the Header.
			 *
			 */
			getBindingWithGroupIdFromConfig: function(oConfigurations, sKey) {
				var sGroupId = AnnotationHelper.getGroupIdFromConfig(oConfigurations, sKey),
					sBinding;
				if (sGroupId) {
					sBinding = "{ path : '', parameters : { $$groupId : '" + sGroupId + "' } }";
				}
				return sBinding;
			},
			/**
			 * Method to check whether a FieldGroup consists of only 1 DataField with MultiLine Text annotation.
			 *
			 * @param {DataFieldAbstractTypes[]} aFormElements A collection of form elements used in the current field group
			 * @returns {boolean} Returns true if only 1 data field with Multiline Text annotation exists.
			 */
			doesFieldGroupContainOnlyOneMultiLineDataField: function(aFormElements) {
				return aFormElements && aFormElements.length === 1 && !!aFormElements[0].isValueMultilineText;
			},
			/*
			 * Get Visiblity of breadcrumbs.
			 *
			 * @function
			 * @param {Object} [oViewData] ViewData model
			 * returns {*} Expression or boolean
			 */
			getVisibleExpressionForBreadcrumbs: function(oViewData) {
				return oViewData.showBreadCrumbs && oViewData.fclEnabled !== undefined
					? "{fclhelper>/breadCrumbIsVisible}"
					: oViewData.showBreadCrumbs;
			},
			/*
			 * Get expression for header action's enable property.
			 *
			 * @function
			 * @param {Object} [operationAvailable] operationAvailable object,
			 * @param {object} [oEntitySet] entity set information
			 * @param {string} [sOperationAvailableFormatted] formatted value of operational available
			 * returns {*} Expression or boolean values true if operationAvailable is not path based
			 */
			getEnabledExpressionForHeaderActions: function(operationAvailable, oEntitySet, sOperationAvailableFormatted) {
				if (operationAvailable === null) {
					var oEditAction =
						(oEntitySet["@com.sap.vocabularies.Common.v1.DraftRoot"] &&
							oEntitySet["@com.sap.vocabularies.Common.v1.DraftRoot"].EditAction) ||
						(oEntitySet["@com.sap.vocabularies.Common.v1.StickySessionSupported"] &&
							oEntitySet["@com.sap.vocabularies.Common.v1.StickySessionSupported"].EditAction);
					if (oEditAction) {
						return "{= ${#" + oEditAction + "} ? true : false }";
					}
				}
				if (operationAvailable && operationAvailable.$Path) {
					return sOperationAvailableFormatted;
				} else {
					return true;
				}
			},

			/*
			 * Gets the expression for the enablement of the action annotation.
			 *
			 * @function
			 * @param {object} [oBound] The Bound action context
			 * @param {object} [oActionContext] The object of the action context
			 * @param {object} [oDataField] The object of the data field
			 * @param {string} [sFormattedValueOperationalAvailable] The string value of the available operation
			 * returns {*}  returns {*} both Boolean and expression with the following logic:
			 * if none of the conditions is met, the button is enabled
			 * if bound is false, then 'true' is returned as a string
			 * in all other cases a runtime binding expression is returned
			 */
			getButtonEnabledForAnnotationAction: function(oBound, oActionContext, oDataField, sFormattedValueOperationalAvailable) {
				if (oBound && oBound.$IsBound !== true) {
					return "true";
				}
				if (oActionContext && oActionContext["@Org.OData.Core.V1.OperationAvailable"] === null && oDataField) {
					return "{= !${#" + oDataField.Action + "} ? false : true } }";
				}
				if (
					oActionContext &&
					oActionContext["@Org.OData.Core.V1.OperationAvailable"] &&
					oActionContext["@Org.OData.Core.V1.OperationAvailable"].$Path
				) {
					return "{= $" + sFormattedValueOperationalAvailable + "}";
				}
				return true;
			},

			getShareButtonVisibility: function(viewData) {
				var sShareButtonVisibilityExp = "!${ui>createMode}";
				if (viewData.fclEnabled) {
					sShareButtonVisibilityExp = "${fclhelper>/showShareIcon} && " + sShareButtonVisibilityExp;
				}
				return "{= " + sShareButtonVisibilityExp + " }";
			},

			/*
			 * Get visiblity for editable header facet.
			 *
			 * @function
			 * @param {object} [oAnnotations] Annotations object for given entity set
			 * @param {object} [oFieldControl] field control
			 * returns {*}  binding expression or boolean value resolved form funcitons isReadOnlyFromStaticAnnotations and isReadOnlyFromDynamicAnnotations
			 */
			getVisiblityOfHeaderFacet: function(oAnnotations, oFieldControl) {
				return (
					AnnotationHelper.isReadOnlyFromStaticAnnotations(oAnnotations, oFieldControl) &&
					AnnotationHelper.isReadOnlyFromDynamicAnnotations(oFieldControl)
				);
			},
			/*
			 * Get Expression of press event of delete button.
			 *
			 * @function
			 * @param {string} [sEntitySetName] Entity set name
			 * returns {string}  binding expression / function string generated from commanhelper's function generateFunction
			 */
			getPressExpressionForDelete: function(sEntitySetName) {
				var sDeletableContexts = "${$view>/getBindingContext}",
					sTitle = "${$view>/#fe::ObjectPage/getHeaderTitle/getExpandedHeading/getItems/1/getItems/0/getText}",
					sDescription = "${$view>/#fe::ObjectPage/getHeaderTitle/getExpandedHeading/getItems/1/getItems/1/getText}";
				var oParams = {
					title: sTitle,
					entitySetName: CommonHelper.addSingleQuotes(sEntitySetName),
					description: sDescription
				};
				return CommonHelper.generateFunction(".editFlow.deleteDocument", sDeletableContexts, CommonHelper.objectToString(oParams));
			},
			/*
			 * Get Expression of press event of Edit button.
			 *
			 * @function
			 * @param {object} [oDataField] Data field object
			 * @param {string} [sEntitySetName] Entity set name
			 * @param {object} [oHeaderAction] Header action object
			 * returns {string}  binding expression / function string generated from commanhelper's function generateFunction
			 */
			getPressExpressionForEdit: function(oDataField, sEntitySetName, oHeaderAction) {
				var sEditableContexts = CommonHelper.addSingleQuotes(oDataField && oDataField.Action),
					sDataFieldEnumMember = oDataField && oDataField.InvocationGrouping && oDataField.InvocationGrouping["$EnumMember"],
					sInvocationGroup =
						sDataFieldEnumMember === "com.sap.vocabularies.UI.v1.OperationGroupingType/ChangeSet" ? "ChangeSet" : "Isolated";
				var oParams = {
					contexts: "${$view>/getBindingContext}",
					entitySetName: CommonHelper.addSingleQuotes(sEntitySetName),
					invocationGrouping: CommonHelper.addSingleQuotes(sInvocationGroup),
					model: "${$source>/}.getModel()",
					label: CommonHelper.addSingleQuotes(oDataField && oDataField.Label, true),
					isNavigable: oHeaderAction && oHeaderAction.isNavigable,
					defaultValuesExtensionFunction:
						oHeaderAction && oHeaderAction.defaultValuesExtensionFunction
							? "'" + oHeaderAction.defaultValuesExtensionFunction + "'"
							: undefined
				};
				return CommonHelper.generateFunction(
					".handlers.onCallAction",
					"${$view>/}",
					sEditableContexts,
					CommonHelper.objectToString(oParams)
				);
			},
			/*
			 * Method to get the expression for the 'press' event for footer annotation actions
			 *
			 * @function
			 * @param {object} [oDataField] Data field object
			 * @param {string} [sEntitySetName] Entity set name
			 * @param {object} [oHeaderAction] Header action object
			 * returns {string}  Binding expression or function string that is generated from the Commonhelper's function generateFunction
			 */
			getPressExpressionForFooterAnnotationAction: function(oDataField, sEntitySetName, oHeaderAction) {
				var sActionContexts = CommonHelper.addSingleQuotes(oDataField && oDataField.Action),
					sDataFieldEnumMember = oDataField && oDataField.InvocationGrouping && oDataField.InvocationGrouping["$EnumMember"],
					sInvocationGroup =
						sDataFieldEnumMember === "com.sap.vocabularies.UI.v1.OperationGroupingType/ChangeSet" ? "ChangeSet" : "Isolated";
				var oParams = {
					contexts: "${$view>/#fe::ObjectPage/}.getBindingContext()",
					entitySetName: CommonHelper.addSingleQuotes(sEntitySetName),
					invocationGrouping: CommonHelper.addSingleQuotes(sInvocationGroup),
					model: "${$source>/}.getModel()",
					label: CommonHelper.addSingleQuotes(oDataField && oDataField.Label, true),
					isNavigable: oHeaderAction && oHeaderAction.isNavigable,
					defaultValuesExtensionFunction:
						oHeaderAction && oHeaderAction.defaultValuesExtensionFunction
							? "'" + oHeaderAction.defaultValuesExtensionFunction + "'"
							: undefined
				};
				return CommonHelper.generateFunction(
					".handlers.onCallAction",
					"${$view>/}",
					sActionContexts,
					CommonHelper.objectToString(oParams)
				);
			},
			/*
			 * Gets the binding of the container HBox for the header facet.
			 *
			 * @function
			 * @param {object} [oControlConfiguration] The control configuration form of the viewData model
			 * @param {object} [oHeaderFacet] The object of the header facet
			 * returns {*}  The binding expression from function getBindingWithGroupIdFromConfig or undefined.
			 */
			getStashableHBoxBinding: function(oControlConfiguration, oHeaderFacet) {
				if (oHeaderFacet && oHeaderFacet.Facet && oHeaderFacet.Facet.targetAnnotationType === "DataPoint") {
					return AnnotationHelper.getBindingWithGroupIdFromConfig(
						oControlConfiguration,
						oHeaderFacet.Facet.targetAnnotationValue
					);
				}
			},

			/*
			 * Gets the 'Press' event expression for the external and internal data point link.
			 *
			 * @function
			 * @param {object} [oConfiguration] Control configuration from manifest
			 * @param {object} [oManifestOutbound] Outbounds from manifest
			 * returns {string} The runtime binding of the 'Press' event
			 */
			getPressExpressionForLink: function(oConfiguration, oManifestOutbound) {
				if (oConfiguration) {
					if (oConfiguration["targetOutbound"] && oConfiguration["targetOutbound"]["outbound"]) {
						return (
							".handlers.onDataPointTitlePressed($controller, ${$source>}, " +
							JSON.stringify(oManifestOutbound) +
							"," +
							JSON.stringify(oConfiguration["targetOutbound"]["outbound"]) +
							")"
						);
					} else if (oConfiguration["targetSections"]) {
						return ".handlers.navigateToSubSection($controller, '" + JSON.stringify(oConfiguration["targetSections"]) + "')";
					} else {
						return undefined;
					}
				}
			}
		};

		return AnnotationHelper;
	},
	true
);
