/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	[
		"sap/fe/macros/ResourceModel",
		"sap/base/Log",
		"sap/fe/core/CommonUtils",
		"sap/ui/util/openWindow",
		"sap/ui/mdc/enum/ConditionValidated",
		"sap/fe/macros/FieldAPI"
	],
	function(ResourceModel, Log, CommonUtils, openWindow, ConditionValidated, FieldAPI) {
		"use strict";

		/**
		 * Static class used by MDC Field during runtime
		 *
		 * @private
		 * @experimental This module is only for internal/experimental use!
		 */
		var FieldRuntime = {
			formatDraftOwnerTextInPopover: function(
				bHasDraftEntity,
				sDraftInProcessByUser,
				sDraftLastChangedByUser,
				sDraftInProcessByUserDesc,
				sDraftLastChangedByUserDesc
			) {
				if (bHasDraftEntity) {
					var sUserDescription =
						sDraftInProcessByUserDesc || sDraftInProcessByUser || sDraftLastChangedByUserDesc || sDraftLastChangedByUser;

					if (!sUserDescription) {
						return ResourceModel.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_UNSAVED_CHANGES_BY_UNKNOWN");
					} else {
						return sDraftInProcessByUser
							? ResourceModel.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_LOCKED_BY_KNOWN", sUserDescription)
							: ResourceModel.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_UNSAVED_CHANGES_BY_KNOWN", sUserDescription);
					}
				} else {
					return ResourceModel.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_NO_DATA_TEXT");
				}
			},

			/**
			 * Triggers an internal navigation on link pertaining to DataFieldWithNavigationPath.
			 *
			 * @param {object} oSource Source of the press event
			 * @param {object} oController Instance of the controller
			 * @param {string} sSemanticObjectName Semantic object name
			 */
			onDataFieldWithNavigationPath: function(oSource, oController, sSemanticObjectName) {
				var oBindingContext = oSource.getBindingContext();
				// ToDo: Assumes that the controller has the routing listener extension. Candidate for macroData?
				if (oController.routing) {
					oController._routing.navigateToTarget(oBindingContext, sSemanticObjectName);
				} else {
					Log.error(
						"FieldRuntime: No routing listener controller extension found. Internal navigation aborted.",
						"sap.fe.macros.field.FieldRuntime",
						"onDataFieldWithNavigationPath"
					);
				}
			},
			hasTargets: function(bSemanticObjectHasTargets, sSemanticObjectPathValue) {
				return bSemanticObjectHasTargets ? bSemanticObjectHasTargets : false;
			},
			/**
			 * Handler for change event.
			 * Store field group ids of this field for requesting side effects when required.
			 * We store them here to ensure a change in value of the field has taken place.
			 *
			 * @function
			 * @name handleChange
			 * @param {object} oController The controller of the page containing the field
			 * @param {object} oEvent The event object passed by the change event
			 */
			handleChange: function(oController, oEvent) {
				var oSourceField = oEvent.getSource(),
					bIsTransient = oSourceField && oSourceField.getBindingContext().isTransient(),
					pValueResolved = oEvent.getParameter("promise") || Promise.resolve(),
					oSource = oEvent.getSource(),
					bValid = oEvent.getParameter("valid"),
					oFEController;

				// TODO: currently we have undefined and true... and our creation row implementation relies on this.
				// I would move this logic to this place as it's hard to understand for field consumer

				pValueResolved
					.then(function() {
						// FIXME: the event is gone. For now we'll just recreate it again
						oEvent.oSource = oSource;
						oEvent.mParameters = {
							valid: bValid
						};
						FieldAPI.handleChange(oEvent, oController);
					})
					.catch(function(oError) {
						// FIXME: the event is gone. For now we'll just recreate it again
						oEvent.oSource = oSource;
						oEvent.mParameters = {
							valid: false
						};

						// TODO: for sure it makes sense to inform also in case of non valid entries
						// as the UI might need to react on. We could provide a parameter to inform if validation
						// was successful?
						FieldAPI.handleChange(oEvent, oController);
					});

				// Use the FE Controller instead of the extensionAPI to access internal FE controllers
				if (oController.isA("sap.fe.core.ExtensionAPI")) {
					oFEController = oController._controller;
				} else {
					oFEController = oController;
				}

				oFEController._editFlow.syncTask(pValueResolved);

				// if the context is transient, it means the request would fail anyway as the record does not exist in reality
				// TODO: should the request be made in future if the context is transient?
				if (bIsTransient) {
					return;
				}

				// SIDE EFFECTS
				oFEController.sideEffects.handleFieldChange(oEvent, pValueResolved);
			},
			/**
			 * Gets the field value and validity on a change event.
			 *
			 * @function
			 * @name fieldValidityOnChange
			 * @param {object} oEvent The event object passed by the change event
			 * @returns {object} Field value and validity
			 */
			getFieldStateOnChange: function(oEvent) {
				var oSourceField = oEvent.getSource(),
					mFieldState = {},
					_isBindingStateMessages = function(oBinding) {
						return oBinding && oBinding.getDataState() ? oBinding.getDataState().getInvalidValue() === undefined : true;
					};
				if (oSourceField.isA("sap.fe.macros.FieldAPI")) {
					oSourceField = oSourceField.getContent();
				}

				if (oSourceField.isA("sap.fe.core.controls.FieldWrapper") && oSourceField.getEditMode() === "Editable") {
					oSourceField = oSourceField.getContentEdit()[0];
				}

				if (oSourceField.isA("sap.ui.mdc.Field")) {
					var bIsValid = oEvent.getParameter("valid") || oEvent.getParameter("isValid");
					if (bIsValid === undefined) {
						if (oSourceField.getMaxConditions() === 1) {
							var oValueBindingInfo = oSourceField.getBindingInfo("value");
							bIsValid = _isBindingStateMessages(oValueBindingInfo && oValueBindingInfo.binding);
						}
						if (oSourceField.getValue() === "" && !oSourceField.getProperty("required")) {
							bIsValid = true;
						}
					}
					mFieldState = {
						fieldValue: oSourceField.getValue(),
						validity: !!bIsValid
					};
				} else {
					// oSourceField extends from Input || is a CheckBox
					var oBinding = oSourceField.getBinding("value") || oSourceField.getBinding("selected");
					mFieldState = {
						fieldValue: oBinding && oBinding.getValue(),
						validity: _isBindingStateMessages(oBinding)
					};
				}
				return {
					field: oSourceField,
					state: mFieldState
				};
			},
			_fnSetFieldWidth: function(oFieldInfo) {
				var _fnSetWidthInModel = function(oFieldInfo, oAvatar, oVBox) {
					var oAvatarDom = oAvatar ? oAvatar.getDomRef() : undefined;
					var iWidth = 0;
					if (oAvatarDom) {
						iWidth =
							parseInt(getComputedStyle(oAvatarDom).marginRight, 10) +
							parseInt(getComputedStyle(oAvatarDom).marginLeft, 10) +
							oAvatar.getDomRef().offsetWidth;
					}
					var iVBoxWidth = oVBox.getDomRef().offsetWidth;
					var iFinalWidth = iVBoxWidth - iWidth;
					oFieldInfo.getModel("internal").setProperty("/QuickViewLinkContainerWidth", iFinalWidth + "px");
				};
				var oAvatar = oFieldInfo.findElements(true, function(oElement) {
					return oElement.isA("sap.m.Avatar");
				})[0];
				var oVBox = oFieldInfo.findElements(true, function(oElement) {
					return oElement.isA("sap.m.VBox");
				})[0];
				if (oVBox.getDomRef().offsetWidth === 0) {
					oVBox.onAfterRendering = function() {
						_fnSetWidthInModel(oFieldInfo, oAvatar, oVBox);
					};
				} else {
					_fnSetWidthInModel(oFieldInfo, oAvatar, oVBox);
				}
			},
			popoverAfterOpen: function(oEvent) {
				var oLink = oEvent.getSource();
				if (oLink.getDependents() && oLink.getDependents().length > 0) {
					var oFieldInfo = oLink.getDependents()[0];
					if (oFieldInfo && oFieldInfo.isA("sap.m.ResponsivePopover")) {
						FieldRuntime._fnSetFieldWidth(oFieldInfo);
					}
				}
			},
			LinkModelContextChange: function(oEvent) {
				var oLink = oEvent.getSource();
				if (!oLink.getModel() || !oLink.getBindingContext()) {
					return;
				}
				var sSemanticObjectPathValue, oValueBinding, pGetLinksPromise;
				var oSource,
					sLocalPath,
					oModel,
					oMetaModel,
					sMetaPath,
					sSemanticObjectFullPath,
					sSemanticObjectName,
					aSemanticObjectUnavailableActions,
					oView,
					oInternalModelContext,
					oAppComponent,
					oShellServiceHelper,
					sCurrentHash;

				var _fnUpdateSemanticObjectsTargetModel = function(oEvent, sValue) {
					oSource = oEvent && oEvent.getSource();
					sLocalPath = oLink && oLink.getBindingPath("text");
					oModel = oLink && oLink.getModel();
					oMetaModel = oModel && oModel.getMetaModel();
					sMetaPath = oMetaModel && oMetaModel.getMetaPath(oLink.getBindingContext());
					sSemanticObjectFullPath = sMetaPath + "/" + sLocalPath;
					sSemanticObjectName = sValue || (oSource && oSource.getValue());
					oView = oLink && sap.ui.fl.Utils.getViewForControl(oLink);
					oInternalModelContext = oView && oView.getBindingContext("internal");
					oAppComponent = oView && CommonUtils.getAppComponent(oView);
					oShellServiceHelper = oAppComponent && oAppComponent.getShellServices();

					pGetLinksPromise =
						oShellServiceHelper && oShellServiceHelper.getLinksWithCache([[{ semanticObject: sSemanticObjectName }]]);
					aSemanticObjectUnavailableActions =
						oMetaModel &&
						oMetaModel.getObject(sSemanticObjectFullPath + "@com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions");

					sCurrentHash = oShellServiceHelper && oShellServiceHelper.hrefForExternal();
					if (sCurrentHash && sCurrentHash.indexOf("?") !== -1) {
						// sCurrentHash can contain query string, cut it off!
						sCurrentHash = sCurrentHash.split("?")[0];
					}

					CommonUtils.updateSemanticTargets(
						[pGetLinksPromise],
						[{ semanticObject: sSemanticObjectName, path: sSemanticObjectFullPath }],
						oInternalModelContext,
						sCurrentHash
					)
						.then(function(oValue) {
							var oConditionalWrapper = oLink.getParent();
							if (oConditionalWrapper && oConditionalWrapper.isA("sap.fe.core.controls.ConditionalWrapper")) {
								if (oValue && oValue[sSemanticObjectName]) {
									var bResultingNewConditionForConditionalWrapper = false,
										sTmpPath,
										oSemanticObjectPayload,
										aSemanticObjectPaths = Object.keys(oValue[sSemanticObjectName]);
									for (var iPathsCount = 0; iPathsCount < aSemanticObjectPaths.length; iPathsCount++) {
										sTmpPath = aSemanticObjectPaths[iPathsCount];
										oSemanticObjectPayload = oValue[sSemanticObjectName] && oValue[sSemanticObjectName][sTmpPath];
										if (
											oSemanticObjectPayload &&
											oSemanticObjectPayload.path &&
											oSemanticObjectPayload.path === sSemanticObjectFullPath
										) {
											// Got the resolved Semantic Object!
											bResultingNewConditionForConditionalWrapper =
												oSemanticObjectPayload[
													!aSemanticObjectUnavailableActions ? "HasTargetsNotFiltered" : "HasTargets"
												];
											// Reevaluate the ConditionalWrapper condition property
											oConditionalWrapper.setCondition(!!bResultingNewConditionForConditionalWrapper);
											break;
										}
									}
								}

								//oConditionalWrapper.setCondition(true);
							}
						})
						.catch(function(oError) {
							Log.error("LinkModelContextChange: Cannot update Semantic Targets model", oError);
						});
				};

				var aCustomData = oLink.getCustomData();
				if (aCustomData && aCustomData.length > 0) {
					for (var i = 0; i < aCustomData.length; i++) {
						sSemanticObjectPathValue = aCustomData[i].getValue();
						if (!sSemanticObjectPathValue) {
							oValueBinding = aCustomData[i].getBinding("value");
							if (oValueBinding) {
								oValueBinding.attachEventOnce("change", _fnUpdateSemanticObjectsTargetModel);
							}
						}
						_fnUpdateSemanticObjectsTargetModel(null, sSemanticObjectPathValue);
					}
				}
			},
			pressLink: function(oEvent) {
				var oLink = oEvent.getSource();
				if (oLink.getDependents() && oLink.getDependents().length > 0) {
					var oFieldInfo = oLink.getDependents()[0];
					if (oFieldInfo && oFieldInfo.isA("sap.ui.mdc.Link")) {
						oFieldInfo
							.getTriggerHref()
							.then(function(sHref) {
								if (!sHref) {
									oFieldInfo
										.open(oLink)
										.then(function() {
											FieldRuntime._fnSetFieldWidth(oFieldInfo);
										})
										.catch(function(oError) {
											Log.error("Cannot retrieve the QuickView Popover dialog", oError);
										});
								} else {
									var oView = sap.ui.fl.Utils.getViewForControl(oLink);
									var oAppComponent = CommonUtils.getAppComponent(oView);
									var oShellServiceHelper = oAppComponent.getShellServices();
									var oShellHash = oShellServiceHelper.parseShellHash(sHref);
									var oNavArgs = {
										target: {
											semanticObject: oShellHash.semanticObject,
											action: oShellHash.action
										},
										params: oShellHash.params
									};
									if (CommonUtils.isStickyEditMode(oLink) !== true) {
										//URL params and xappState has been generated earlier hence using toExternal
										oShellServiceHelper.toExternal(oNavArgs, oAppComponent);
									} else {
										var sNewHref = oShellServiceHelper.hrefForExternal(oNavArgs, oAppComponent, false);
										openWindow(sNewHref);
									}
								}
							})
							.catch(function(oError) {
								Log.error("Error triggering link Href", oError);
							});
					}
				}
			}
		};

		return FieldRuntime;
	},
	/* bExport= */ true
);
