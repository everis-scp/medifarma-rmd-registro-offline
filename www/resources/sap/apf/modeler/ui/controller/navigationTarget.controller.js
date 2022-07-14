sap.ui.define(["sap/apf/modeler/ui/utils/textPoolHelper","sap/apf/modeler/ui/utils/nullObjectChecker","sap/apf/modeler/ui/utils/viewValidator","sap/apf/modeler/ui/utils/staticValuesBuilder","sap/m/MessageBox","sap/apf/modeler/ui/utils/optionsValueModelBuilder","sap/ui/thirdparty/jquery"],function(t,n,v,s,M,o,q){"use strict";var p,T,a,c,C,N,b,d;var e;var n=sap.apf.modeler.ui.utils.nullObjectChecker;var o=sap.apf.modeler.ui.utils.optionsValueModelBuilder;var f=sap.apf.modeler.ui.utils.TranslationFormatMap.NAVTARGET_TITLE;function _(i){i.byId("idNavigationTargetHeaderLabel").setText(T("basicData"));i.byId("idSemanticObjectLabel").setText(T("semanticObject"));i.byId("idActionLabel").setText(T("action"));i.byId("idDescriptionLabel").setText(T("navigationTargetTitle"));i.byId("idNavigationParametersHeaderLabel").setText(T("navigationParametersHeader"));i.byId("idNavigationTargetTypeHeaderLabel").setText(T("navigationTargetType"));i.byId("idNavigationTargetTypeLabel").setText(T("assignmentType"));i.byId("idAssignedStepsLabel").setText(T("assignedSteps"));i.byId("idContextMapping").setText(T("contextMapping"));}function g(i){var G;if(p&&p.arguments&&p.arguments.navTargetId){N=C.getNavigationTarget(p.arguments.navTargetId);}if(!n.checkIsNotUndefined(N)){G=C.createNavigationTarget();N=C.getNavigationTarget(G);z(i);}}function h(i){var G=N.getTitleKey()?T("navigationTargetTitle"):T("navigationTargetTitle")+" ("+T("default")+")";i.byId("idDescriptionLabel").setText(G);i.byId("idDescriptionLabel").setTooltip(G);i.byId("idUseDynamicParametersCheckBoxLabel").setText(T("useDynamicParametersLabel"));}function j(i){var G,H;var V={oTextReader:T,oConfigurationHandler:c,oConfigurationEditor:C,oParentObject:N,getCalatogServiceUri:i.getView().getViewData().getCalatogServiceUri,oCoreApi:i.getView().getViewData().oCoreApi};G=new sap.ui.controller("sap.apf.modeler.ui.controller.navTargetContextMapping");H=new sap.ui.view({viewName:"sap.apf.modeler.ui.view.requestOptions",type:sap.ui.core.mvc.ViewType.XML,id:i.createId("idContextMappingView"),viewData:V,controller:G});i.getView().attachEvent(sap.apf.modeler.ui.utils.CONSTANTS.events.UPDATESUBVIEWINSTANCESONRESET,H.getController().updateSubViewInstancesOnReset.bind(H.getController()));H.addStyleClass("formTopPadding");i.byId("idContextMappingVBox").insertItem(H);e=0;var I=N.getAllNavigationParameters();if(I.length>0){I.forEach(function(J){k(i,J);});}else{k(i);}}function k(i,G){var H=new sap.ui.controller("sap.apf.modeler.ui.controller.navigationTargetParameter");var I=new sap.ui.view({viewName:"sap.apf.modeler.ui.view.navigationTargetParameter",type:sap.ui.core.mvc.ViewType.XML,id:i.createId("idNavigationTargetParameter"+e),viewData:{oTextReader:T,oParentController:i,oNavigationTarget:N,parameter:G,oConfigurationEditor:C},controller:H});i.byId("idNavigationParameterBox").addItem(I);e++;u(i);}function u(i){i.byId("idNavigationParameterBox").getItems().forEach(function(G){G.getController().checkVisibilityOfPlusMinus();});}function l(i){var P=q.Deferred();d.getAllAvailableSemanticObjects(function(G,H){if(H===undefined){var I=o.prepareModel(G,G.length);i.byId("idSemanticObjectField").setModel(I);if(n.checkIsNotNullOrUndefinedOrBlank(N.getSemanticObject())){i.byId("idSemanticObjectField").setValue(N.getSemanticObject());}P.resolve();}else{E(i,H,"11504");}});return P.promise();}function m(i){var G,P;P=q.Deferred();G=o.prepareModel([],0);i.byId("idActionField").setModel(G);w(undefined,i);r(i).then(function(S){P.resolve(S);});i.byId("idActionField").setValue(N.getAction());return P.promise();}function r(i){var G,S,P,H;H=new q.Deferred();S=N.getSemanticObject();if(n.checkIsNotUndefined(S)){P=d.getSemanticActions(S);P.then(function(I){G=o.prepareModel(I.semanticActions,I.semanticActions.length);i.byId("idActionField").setModel(G);H.resolve(I);},function(I){E(i,I,"11505");});}return H.promise();}function w(S,G){var H,I,i;var J=N.getTitleKey();if(n.checkIsNotUndefined(J)){I=G.getView().getViewData().oConfigurationHandler.getTextPool().get(J).TextElementDescription;G.byId("idDescription").setValue(I);}else{var K=S?S:G.byId("idActionField").getModel().getData().Objects;if(K&&n.checkIsNotNullOrBlank(N.getAction())){for(i=0;i<K.length;i++){if(K[i].id===N.getAction()){H=K[i].text;break;}}}I=H?H:N.getSemanticObject();G.byId("idDescription").setValue(I);}}function x(i){var s=new sap.apf.modeler.ui.utils.StaticValuesBuilder(T,o);var G=s.getNavTargetTypeData();i.byId("idNavigationTargetTypeField").setModel(G);var H=N.isStepSpecific()?T("stepSpecific"):T("globalNavTargets");i.byId("idNavigationTargetTypeField").setSelectedKey(H);}function y(G){var H=N.isStepSpecific()?T("stepSpecific"):T("globalNavTargets");if(H===T("stepSpecific")){D(G,true);var I=[];var S=C.getSteps();var i,J;for(i=0;i<S.length;i++){J={};J.stepKey=S[i].getId();J.stepName=a.get(S[i].getTitleId()).TextElementDescription;I.push(J);}var K=o.prepareModel(I,I.length);G.byId("idAssignedStepsCombo").setModel(K);var L=C.getStepsAssignedToNavigationTarget(N.getId());G.byId("idAssignedStepsCombo").setSelectedKeys(L);}}function z(i){var G={id:N.getId(),icon:N.isGlobal()?"sap-icon://overview-chart":"sap-icon://pushpin-off"};if(i.byId("idDescription").getValue()){G.name=i.byId("idDescription").getValue();}d.updateSelectedNode(G);}function A(i){var G=T("navigationTarget")+": "+i.byId("idDescription").getValue();d.updateTitleAndBreadCrumb(G);}function B(i){var G={key:N.getId(),value:i.byId("idDescription").getValue()};d.setNavigationTargetName(G);}function D(i,I){i.byId("idAssignedStepsLabel").setVisible(I);i.byId("idAssignedStepsCombo").setVisible(I);}function E(i,G,H){var I=d.createMessageObject({code:H});I.setPrevious(G);d.putMessage(I);}function F(){var i=C.getStepsAssignedToNavigationTarget(N.getId());var G,S;for(G=0;G<i.length;G++){S=C.getStep(i[G]);S.removeNavigationTarget(N.getId());}}sap.ui.controller("sap.apf.modeler.ui.controller.navigationTarget",{onInit:function(){var i=this;d=i.getView().getViewData();c=d.oConfigurationHandler;C=d.oConfigurationEditor;a=c.getTextPool();T=d.getText;p=d.oParams;if(!C){c.loadConfiguration(p.arguments.configId,function(G){C=G;});}_(i);b=new sap.apf.modeler.ui.utils.ViewValidator(i.getView());b.addFields(["idSemanticObjectField","idActionField"]);g(i);j(i);i.setDetailData();},onAfterRendering:function(){var i=this;if(i.getView().byId("idSemanticObjectField").getValue().length===0){i.getView().byId("idSemanticObjectField").focus();}},setDetailData:function(){var i=this;l(i).then(function(){m(i).then(function(S){w(S.semanticActions,i);});});h(i);x(i);y(i);var G=N.getUseDynamicParameters();if(G){this.getView().byId("idUseDynamicParametersCheckBox").setSelected(true);}else{this.getView().byId("idUseDynamicParametersCheckBox").setSelected(false);}},updateSubViewInstancesOnReset:function(i){var G=this;C=i;N=C.getNavigationTarget(N.getId());G.getView().fireEvent(sap.apf.modeler.ui.utils.CONSTANTS.events.UPDATESUBVIEWINSTANCESONRESET,{"oConfigurationEditor":C,"oParentObject":N});},handleChangeSemanticObjectValue:function(i){var S,G=this;S=i.getParameter("value").trim();N.setTitleKey(undefined);if(n.checkIsNotNullOrBlank(S)){N.setSemanticObject(S);r(G).then(function(H){if(H.semanticActions.length>0){N.setAction(G.byId("idActionField").getModel().getData().Objects[0].id);G.byId("idActionField").setSelectedKey(H.semanticActions[0].id);}else{G.byId("idActionField").setValue("");}w(H.semanticActions,G);h(G);z(G);A(G);B(G);});}C.setIsUnsaved();},handleChangeofAction:function(i){var G,H=this;G=i.getParameter("value");N.setTitleKey(undefined);if(n.checkIsNotNullOrBlank(G)){N.setAction(G);}w(undefined,H);h(H);z(H);A(H);B(H);C.setIsUnsaved();},handleChangeForTitleText:function(){var i=this,L;var G=i.byId("idDescription").getValue();if(G.trim().length===0){L=undefined;N.setTitleKey(L);w(undefined,i);h(i);z(i);A(i);B(i);C.setIsUnsaved();}else{i.getView().getViewData().oConfigurationHandler.getTextPool().setTextAsPromise(G,f).done(function(L){N.setTitleKey(L);h(i);i.byId("idDescription").setValue(G);z(i);A(i);B(i);C.setIsUnsaved();});}},handleSuggestions:function(i){var S=new sap.apf.modeler.ui.utils.SuggestionTextHandler(a);S.manageSuggestionTexts(i,f);},handleChangeOfNavigationTargetType:function(){var i=this;C.setIsUnsaved();var G=i.byId("idNavigationTargetTypeField").getSelectedKey();if(G===T("stepSpecific")){N.setStepSpecific();y(i);}else{N.setGlobal();D(i,false);i.byId("idAssignedStepsCombo").setSelectedKeys([]);F();}z(i,i.byId("idDescription").getValue());},handleChangeForAssignedSteps:function(){var i=this;C.setIsUnsaved();var G=i.byId("idAssignedStepsCombo").getSelectedKeys();var H=C.getStepsAssignedToNavigationTarget(N.getId());H.forEach(function(S){if(G.indexOf(S)===-1){var I=C.getStep(S);I.removeNavigationTarget(N.getId());}});G.forEach(function(S){if(H.indexOf(S)===-1){var I=C.getStep(S);I.addNavigationTarget(N.getId());}});},getValidationState:function(){var i=this;var G=true;i.byId("idNavigationParameterBox").getItems().forEach(function(H){if(!H.getController().validate()){G=false;}});return b.getValidationState()&&i.byId("idContextMappingView").getController().getValidationState()&&G;},getNavigationParameters:function(){return this.byId("idNavigationParameterBox").getItems();},addNavigationParameter:function(){k(this);},removeNavigationParameter:function(i){this.byId("idNavigationParameterBox").removeItem(i);u(this);},handleChangeForUseDynamicParameters:function(){var i=this.byId("idUseDynamicParametersCheckBox").getSelected();N.setUseDynamicParameters(i);},onExit:function(){var i=this;i.byId("idContextMappingView").destroy();},displayHelpAboutDynamicParameters:function(){var i=T("explanationOfDynamicParameters");var G=T("titleDynamicParameters");sap.m.MessageBox.show(i,{icon:sap.m.MessageBox.Icon.INFORMATION,title:G,actions:[sap.m.MessageBox.Action.CLOSE]});}});});