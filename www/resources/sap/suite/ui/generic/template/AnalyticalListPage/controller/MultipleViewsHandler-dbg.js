sap.ui.define([
	"sap/ui/base/Object",
	"sap/suite/ui/generic/template/js/StableIdHelper",
	"sap/suite/ui/generic/template/lib/multipleViews/MultipleViewsHandler",
	"sap/base/util/extend",
	"sap/suite/ui/generic/template/genericUtilities/FeError"
], function(BaseObject, StableIdHelper, MultipleViewsHandler, extend, FeError) {
	"use strict";

	// This helper class handles multiple views in the AnalyticalListPage.
	// In case the enclosing AnalyticalListPage really supports the multiple views feature it instantiates an instance of
	// sap.suite.ui.generic.template.lib.multipleViews.MultipleViewsHandler which implements the main part of the logic.
	// This class only contains the glue code which is used to adapt the services provided by this generic class to the requirements of the AnalyticalListPage
    // In AnalyticalListPage only single table mode is supported.

	// oState is used as a channel to transfer data to the controller and back.
	// oController is the controller of the enclosing AnalyticalListPage
	// oTemplateUtils are the template utils as passed to the controller implementation
	function getMethods(oState, oController, oTemplateUtils) {
		// Begin: Instance variables
		var oGenericMultipleViewsHandler;   // the generic implementation of the multiple views feature. Will be instantiated if this ALP uses the multiple views feature.
		var oQuickVariantSelectionEffective;
		var enableAutoBindingMultiView;



		function onDataRequested() {
			if (!oGenericMultipleViewsHandler) {
				return;
			}
			oGenericMultipleViewsHandler.updateCounts();
		}

		function onRebindContentControl(oBindingParams, aFiltersFromSmartTable) {
			if (!oGenericMultipleViewsHandler) {
				return;
			}
			oGenericMultipleViewsHandler.onRebindContentControl(oBindingParams, aFiltersFromSmartTable);
		}

		function fnGetContentForIappState(){
			if (oGenericMultipleViewsHandler) {
				var sSelectedKey = oGenericMultipleViewsHandler.getSelectedKey();
				var oTableState = oGenericMultipleViewsHandler.getContentForIappState(sSelectedKey);
				return {
					state: oTableState
				};
			}
			return null;
		}

		function fnFormatItemTextForMultipleView(oItemDataModel) {
			// if (!oGenericMultipleViewsHandler) {
			// 	return null;
			// }
			return oGenericMultipleViewsHandler && oGenericMultipleViewsHandler.formatItemTextForMultipleView(oItemDataModel);
		}

		function fnRestoreFromIappState(oState) {
			if (oGenericMultipleViewsHandler) {
				oGenericMultipleViewsHandler.restoreFromIappState(oState);
			}
		}

		function fnDetermineSortOrder() {
			// if (!oGenericMultipleViewsHandler) {
			// 	return null;
			// }
			return oGenericMultipleViewsHandler && oGenericMultipleViewsHandler.determineSortOrder();
		}

		function fnRefreshOperation(iRequest, vTabKey, mEntitySets) {
			if (!oGenericMultipleViewsHandler) {
				return false;
			}
			oGenericMultipleViewsHandler.refreshOperation(iRequest, vTabKey, mEntitySets);
			// tells caller there is generic multiple views handler which does the refresh
			return true;
		}

		function fnGetEnableAutoBinding() {
			// make it boolean value
			return !!(oQuickVariantSelectionEffective && oQuickVariantSelectionEffective.enableAutoBinding);
		}

		function fnGetOriginalEnableAutoBinding(){
			return enableAutoBindingMultiView;
		}

		function fnSetActiveButtonState() {
			if (!oGenericMultipleViewsHandler) {
				return;
			}
			oGenericMultipleViewsHandler.setActiveButtonState();
		}

		function fnRestoreActiveButtonState() {
			if (!oGenericMultipleViewsHandler) {
				return null;
			}
			return oGenericMultipleViewsHandler.restoreActiveButtonState();
		}

		function fnSetControlVariant(sChartVariantId, sTableVariantId, sPageVariantId) {
			if (!oGenericMultipleViewsHandler) {
				return;
			}
			oGenericMultipleViewsHandler.setControlVariant(sChartVariantId, sTableVariantId, sPageVariantId);
		}

		function fnHandleStartUpObject(oStartupObject) {
			if (!oGenericMultipleViewsHandler) {
				return;
			}
			if (oStartupObject.selectedQuickVariantSelectionKey) {
				oGenericMultipleViewsHandler.setSelectedKey(oStartupObject.selectedQuickVariantSelectionKey);
			}
		}

		function fnGetSelectedKeyPropertyName() {
			return "tableViewData";
		}

		function fnGetSelectedKey() {
			return oGenericMultipleViewsHandler.getSelectedKey();
		}

		function fnSetSelectedKey(sKey) {
			return oGenericMultipleViewsHandler.setSelectedKey(sKey);
		}

		function fnOnDetailsActionPress(oEvent) {
			var oBindingContext = oEvent.getParameter("itemContexts") && oEvent.getParameter("itemContexts")[0];
			oTemplateUtils.oCommonEventHandlers.onListNavigate(oEvent, oState, oBindingContext);
		}
		
		function fnGetMode() {
			return oGenericMultipleViewsHandler && oGenericMultipleViewsHandler.getMode();
		}

		(function() { // constructor coding encapsulated in order to reduce scope of helper variables
			var oSettings = oTemplateUtils.oComponentUtils.getSettings();
			var oQuickVariantSelection = oSettings.quickVariantSelection;
			oQuickVariantSelectionEffective = oQuickVariantSelection;
			if (!oQuickVariantSelectionEffective) {
				return;
			}
			var oSwitchingControl;
			var sSegmentedButton = StableIdHelper.getStableId({type:"QuickVariantSelection", subType: "SegmentedButton"});
			var sVariantSelect = StableIdHelper.getStableId({type:"QuickVariantSelection", subType: "VariantSelect"});
			oSwitchingControl = oController.byId(sSegmentedButton) || oController.byId(sVariantSelect);

			// manifestSettings: indicates multiple tab single view
			// pathInTemplatePrivateModel: path of the model to be read
			// smartControl: smartControl which contains table
			// getSmartControl : function which returns the smartcontrol by key
			// switchingControl: the control which is used to switch between the views. It must possess a getItems() method.
			// smartFilterBar: smartfilterbar which contains filter values
			var oConfiguration = {
				manifestSettings: oQuickVariantSelectionEffective,
				pathInTemplatePrivateModel: "/alp/multipleViews",
				smartControl: oQuickVariantSelection && oState.oSmartTable, // only in single views mode a single smart control is being transfered
				getSmartControl: function(sKey){
					var sId = StableIdHelper.getStableId({type: "AnalyticalListPageTable", subType: "SmartTable", "sQuickVariantKey": sKey});
					return oController.byId(sId);
				},
				switchingControl: oSwitchingControl,
				smartFilterBar: oState.oSmartFilterbar,
				getSearchValue: function () {
					return oState.oSmartFilterbar.getBasicSearchValue();
				},
				appStateChange: function(){
				},
				isDataToBeShown: function () {
					return true;
				},
				adaptRefreshRequestMode: function(iRefreshRequest) {
					return iRefreshRequest;
				},
				pathToActiveObjectEnabled: "/alp/activeObjectEnabled",
				refreshModelOnTableRefresh: true
			};
			oGenericMultipleViewsHandler = new MultipleViewsHandler(oController, oTemplateUtils, oConfiguration);

		})();

		// public instance methods
		return {
			onDataRequested: onDataRequested,
			refreshOperation: fnRefreshOperation,
			onRebindContentControl: onRebindContentControl,
			getContentForIappState: fnGetContentForIappState,
			restoreFromIappState: fnRestoreFromIappState,
			formatItemTextForMultipleView: fnFormatItemTextForMultipleView,
			getEnableAutoBinding: fnGetEnableAutoBinding,//
			getOriginalEnableAutoBinding: fnGetOriginalEnableAutoBinding, //
			determineSortOrder: fnDetermineSortOrder,
			setActiveButtonState: fnSetActiveButtonState,
			restoreActiveButtonState: fnRestoreActiveButtonState,
			setControlVariant: fnSetControlVariant,
			handleStartUpObject: fnHandleStartUpObject, //
			onDetailsActionPress: fnOnDetailsActionPress, //
			getSelectedKeyPropertyName: fnGetSelectedKeyPropertyName, //
			getSelectedKey: fnGetSelectedKey,
			setSelectedKey: fnSetSelectedKey,
			getMode: fnGetMode
		};
	}

	return BaseObject.extend("sap.suite.ui.generic.template.AnalyticalListPage.controller.MultipleViewsHandler", {
		constructor: function(oState, oController, oTemplateUtils) {
			extend(this, getMethods(oState, oController, oTemplateUtils));
		}
	});
});
