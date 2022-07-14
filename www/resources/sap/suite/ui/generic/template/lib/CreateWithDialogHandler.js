sap.ui.define(["sap/ui/base/Object","sap/suite/ui/generic/template/js/StableIdHelper","sap/suite/ui/generic/template/lib/MessageUtils","sap/base/util/extend","sap/suite/ui/generic/template/genericUtilities/controlHelper","sap/suite/ui/generic/template/genericUtilities/testableHelper","sap/suite/ui/generic/template/lib/CRUDHelper","sap/base/util/isEmptyObject"],function(B,S,M,e,c,t,C,i){"use strict";function g(s,o,T){var d,a;function G(){return{"aFilters":[{sPath:"fullTarget",sOperator:"StartsWith",oValue1:d.getBindingContext().getPath()},{sPath:"target",sOperator:"EQ",oValue1:"/"+o.getOwnerComponent().getEntitySet()}]};}function r(){var j=G(d);var m=sap.ui.getCore().getMessageManager().getMessageModel();if(j){var k=m.bindList("/",null,null,[j]);var l=k.getContexts();if(l.length){var E=[];for(var n in l){E.push(l[n].getObject());}sap.ui.getCore().getMessageManager().removeMessages(E);}}}function f(){d.close();if(T.oComponentUtils.isDraftEnabled()){T.oServices.oCRUDManager.discardDraft(d.getBindingContext());}else{r(d);o.getView().getModel().deleteCreatedEntry(d.getBindingContext());}d.setBindingContext(null);}function b(E){var m=false;var F;var j=d&&typeof d.getContent==="function"&&d.getContent()&&d.getContent()[0];var k=j?j.check():Promise.resolve();k.then(function(){var l=sap.ui.getCore().getMessageManager().getMessageModel().getData();m=l.some(function(u){return u.type==="Error"&&u.validation;});if(!m&&T.oComponentUtils.isDraftEnabled()){var n=T.oComponentUtils.getCRUDActionHandler();F=G(d);n.handleCRUDScenario(1,A.bind(null,F));}else if(!m){T.oCommonEventHandlers.submitChangesForSmartMultiInput();F=G(d);var p=T.oServices.oCRUDManager.saveEntity(F);if(T.oComponentUtils.getViewLevel()===1){T.oServices.oApplicationController.executeSideEffects(a.getBindingContext(),[],[a.getTableBindingPath()]);}p.then(function(){d.close();if(s&&s.oSmartTable){if(s.refreshModel){s.refreshModel();}else{T.oCommonUtils.refreshModel(s.oSmartTable);}T.oCommonUtils.refreshSmartTable(s.oSmartTable);M.showSuccessMessageIfRequired(T.oCommonUtils.getText("OBJECT_CREATED"),T.oServices);}else{T.oCommonUtils.refreshModel(a);T.oCommonUtils.refreshSmartTable(a);M.showSuccessMessageIfRequired(T.oCommonUtils.getContextText("ITEM_CREATED",a.getId()),T.oServices);}r(d);d.setBindingContext(null);});var q={saveEntityPromise:p};T.oComponentUtils.fire(o,"AfterSave",q);}});}function A(j){var k=T.oServices.oCRUDManager.activateDraftEntity(d.getBindingContext(),j);k.then(function(R){if(R&&R.response&&R.response.statusCode==="200"){d.close();d.setBindingContext(null);M.showSuccessMessageIfRequired(T.oCommonUtils.getText("OBJECT_CREATED"),T.oServices);T.oCommonUtils.refreshSmartTable(s.oSmartTable);}},Function.prototype);var E={activationPromise:k};T.oComponentUtils.fire(o,"AfterActivate",E);}function h(j,E,p){d=j;var k=s.oSmartFilterbar;a=T.oCommonUtils.getOwnerControl(E);a=c.isSmartTable(a)?a:a.getParent();var m=new sap.ui.model.json.JSONModel();m.setProperty("/title",T.oCommonUtils.getContextText("CREATE_DIALOG_TITLE",a.getId()));d.setModel(m,"localModel");d.setEscapeHandler(f);p=i(p)?false:p;if(T.oComponentUtils.isDraftEnabled()){T.oCommonEventHandlers.addEntry(E,false,k,p,false,true).then(function(q){T.oServices.oApplication.registerContext(q);d.setBindingContext(q);d.open();});}else{var P=a.getParent().getBindingContext();var l=P?a.getTableBindingPath():'/'+a.getEntitySet();var n=C.createNonDraft(P,l,d.getModel(),p);d.setBindingContext(n);d.open();}}var A=t.testable(A,"fnActivateImpl");var r=t.testable(r,"fnRemoveOldMessageFromModel");var G=t.testable(G,"fnGetFilterForCurrentState");return{onCancelPopUpDialog:f,onSavePopUpDialog:b,createWithDialog:h};}return B.extend("sap.suite.ui.generic.template.lib.CreateWithDialogHandler",{constructor:function(s,o,T){e(this,g(s,o,T));}});});