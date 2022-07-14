sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/ListReport/extensionAPI/NonDraftTransactionController","sap/suite/ui/generic/template/extensionAPI/NavigationController","sap/base/util/extend"],function(B,N,a,e){"use strict";function g(t,c,s){var T;var n;return{getSelectedContexts:function(){return t.oCommonUtils.getSelectedContexts(s.oSmartTable);},getTransactionController:function(){if(t.oComponentUtils.isDraftEnabled()){throw new Error("FioriElements: ListReport.extensionAPI.ExtensionAPI : Transaction support on ListReport for draft case not implemented yet");}T=T||new N(t,c,s);return T;},rebindTable:function(v){if(s.oMultipleViewsHandler.refreshOperation(1,v)){return;}s.oSmartTable.rebindTable();},refreshTable:function(v){if(s.oMultipleViewsHandler.refreshOperation(2,v)){return;}s.refreshModel();t.oCommonUtils.refreshSmartTable(s.oSmartTable);},attachToView:function(C){t.oCommonUtils.attachControlToView(C);},invokeActions:function(f,C,u,S){return t.oCommonUtils.invokeActionsForExtensionAPI(f,C,u,S,s);},getNavigationController:function(){if(!n){n=new a(t,c,s);}return n;},getCommunicationObject:function(l){return t.oComponentUtils.getCommunicationObject(l);},securedExecution:function(f,p){return t.oCommonUtils.securedExecution(f,p,s);},getQuickVariantSelectionKey:function(){return s.oMultipleViewsHandler.getSelectedKey();},setQuickVariantSelectionKey:function(k){s.oMultipleViewsHandler.setSelectedKey(k);},onCustomAppStateChange:function(){var d=s.oIappStateHandler.areDataShownInTable();s.oIappStateHandler.changeIappState(d);}};}return B.extend("sap.suite.ui.generic.template.ListReport.extensionAPI.ExtensionAPI",{constructor:function(t,c,s){e(this,g(t,c,s));}});});
