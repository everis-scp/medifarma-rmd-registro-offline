sap.ui.define(["sap/ui/base/Object", "sap/base/util/extend", "sap/suite/ui/generic/template/lib/CRUDHelper", "sap/m/MessageBox"
	], function(BaseObject, extend, CRUDHelper, MessageBox) {
		"use strict";

		function getMethods(oTemplateContract) {
			// This can be used to supress the pop, as it already existing, we are not changing this name
			

			var fnOnDiscardOrKeepDraftConfirmed;
			var fnOnDiscardOrKeepDraftCancel;
			/*
			ShowDiscardDraftPopUp
			*/
			function fnDiscardOrKeepDraftConfirmation(onDiscardOrKeepDraftConfirmed, onDiscardOrKeepDraftCancel) {
				fnOnDiscardOrKeepDraftConfirmed = onDiscardOrKeepDraftConfirmed;
				fnOnDiscardOrKeepDraftCancel = onDiscardOrKeepDraftCancel;
			    var sWarningText = oTemplateContract.getText("ST_KEEP_DRAFT_MESSAGE");
			    var sKeepDraft = oTemplateContract.getText("ST_KEEP_DRAFT_BTN");
			    var sDiscardDraft = oTemplateContract.getText("ST_DISCARD_DRAFT_BTN");
			    var sCancel =  oTemplateContract.getText("CANCEL");
				MessageBox.warning(sWarningText, {
					title: oTemplateContract.getText("ST_UNSAVED_CHANGES_TITLE"),
					actions: [sKeepDraft, sDiscardDraft, sCancel],
					emphasizedAction: sKeepDraft,
					onClose: function (sAction) {
						if (sAction === sKeepDraft) {
							fnOnDiscardOrKeepDraftConfirmed();
						} else if (sAction === sDiscardDraft) {
							var discardDraftPromise = fnDiscardDraft().then(fnOnDiscardOrKeepDraftConfirmed);
							discardDraftPromise.catch(fnOnDiscardOrKeepDraftCancel);
						} else if (sAction === sCancel) {
							fnOnDiscardOrKeepDraftCancel();
						}
					}
				});
			}

			var oDiscardPromise; 
			function fnDiscardDraft(){
				var oTransactionController = oTemplateContract.oAppComponent.getTransactionController();
				var oDraftController = oTransactionController.getDraftController();
				var oApplicationProxy = oTemplateContract.oApplicationProxy;
				var oBindingContextOfRootObject = oApplicationProxy.getContextForPath(getRootObjectPath());
				var oCurrentIdentity = oTemplateContract.oNavigationControllerProxy.getCurrentIdentity();
				oDiscardPromise = CRUDHelper.discardDraft(oDraftController, oTransactionController, oApplicationProxy, oBindingContextOfRootObject).then(function(){
					oTemplateContract.oViewDependencyHelper.setRootPageToDirty();
					oTemplateContract.oViewDependencyHelper.unbindChildrenUsingTreeNode(oCurrentIdentity.treeNode);
					// Draft discard is a kind of cross navigation -> invalidate paginator info
					oApplicationProxy.invalidatePaginatorInfo();
				}
				);
				return oDiscardPromise;				
			}
			function fnPerformAfterDiscardOrKeepDraftImpl(fnPositive, fnNegative, sMode, bIsTechnical) {
				var fnPerformAction = function(){
						fnPositive();
					};
				var sEnableDiscardDraftConfirmation = oTemplateContract.oNavigationControllerProxy.isDiscardDraftConfirmationNeeded();
				var isUIEditable = isObjectEditable();
				var bNeedsPopup;
				if (sMode === "NavigateExternal" && sEnableDiscardDraftConfirmation === "restricted"){
					bNeedsPopup = false;
				} else {
					bNeedsPopup = (sEnableDiscardDraftConfirmation === "always" || sEnableDiscardDraftConfirmation === "restricted") && isUIEditable;
				}	
				if (bNeedsPopup){ 
					fnDiscardOrKeepDraftConfirmation(fnPerformAction, fnNegative);
				} else {
					fnPerformAction();
				}
			}

			function isObjectEditable(){
				return oTemplateContract.oApplicationProxy.checkIfObjectIsADraftInstance(getRootObjectPath());
			}

			function getRootObjectPath(){
				var oCurrentIdentity = oTemplateContract.oNavigationControllerProxy.getCurrentIdentity();
				var oAncestralNode = oTemplateContract.oApplicationProxy.getAncestralNode(oCurrentIdentity.treeNode,1);
				var sPath = oAncestralNode.getPath(3,oCurrentIdentity.keys);
				return sPath;
			}

			function fnPerformAfterDiscardOrKeepDraft(fnProcessFunction, fnCancelFunction, sMode, bNoBusyCheck, bIsTechnical) {
				// Two possible values for sMode - LeavePage or Proceed. Default the value to LeavePage when the sMode is undefined
				sMode = sMode || "LeavePage";
				var oRet = new Promise(function(fnResolve, fnReject){
					var fnPositive = function(){
						var oRet = fnProcessFunction();
						fnResolve(oRet);
					};
					var fnNegative = function(){
						fnCancelFunction();
						fnReject();
					};
					if (bNoBusyCheck){
						fnPerformAfterDiscardOrKeepDraftImpl(fnPositive, fnNegative, sMode, bIsTechnical);
					} else {
						oTemplateContract.oApplicationProxy.performAfterSideEffectExecution(fnPerformAfterDiscardOrKeepDraftImpl.bind(null, fnPositive, fnNegative, sMode, bIsTechnical), true);
					}
				});
				return oRet;
			}
			
			// public instance methods
			return {
				discardDraft: fnDiscardDraft,
				performAfterDiscardOrKeepDraft: fnPerformAfterDiscardOrKeepDraft
			};
		}

		return BaseObject.extend("sap.suite.ui.generic.template.lib.PageLeaveHandler", {
			constructor: function(oTemplateContract) {
				extend(this, getMethods(oTemplateContract));
			}
		});
	});
