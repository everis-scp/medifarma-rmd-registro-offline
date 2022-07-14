sap.ui.define(["sap/ui/core/mvc/Controller","sap/apf/modeler/ui/utils/nullObjectChecker","sap/apf/modeler/ui/utils/viewValidator","sap/apf/modeler/ui/utils/constants","sap/apf/modeler/ui/utils/textPoolHelper"],function(B,n,V,c,t){"use strict";function _(C){C.byId("idConfigurationBasicData").setText(C.textReader("configurationData"));C.byId("idConfigTitleLabel").setText(C.textReader("configTitle"));C.byId("idConfigTitle").setPlaceholder(C.textReader("newConfiguration"));C.byId("idConfigurationIdLabel").setText(C.textReader("configurationId"));if(C.coreApi.showSemanticObject()){C.byId("idSemanticObjectLabel").setText(C.textReader("semanticObject"));}C.byId("idNoOfCategoriesLabel").setText(C.textReader("noOfCategories"));C.byId("idNoOfStepsLabel").setText(C.textReader("noOfSteps"));C.byId("idFilterTypeData").setText(C.textReader("filterType"));C.byId("idFilterTypeLabel").setText(C.textReader("type"));C.byId("smartFilterBar").setText(C.textReader("smartFilterBar"));C.byId("facetFilter").setText(C.textReader("configuredFilters"));C.byId("none").setText(C.textReader("noFilters"));C.byId("idAriaPropertyForFilterRadioGp").setText(C.textReader("type"));}function a(C){if(!C.configuration){return;}C.byId("idNoOfCategories").setValue(C.configurationEditor.getCategories().length);}function b(C){if(!C.configuration){return;}C.byId("idNoOfSteps").setValue(C.configurationEditor.getSteps().length);}function d(C){if(!C.configuration){return;}C.byId("idConfigTitle").setValue(C.configuration.AnalyticalConfigurationName);}function e(C){if(!C.configuration){return;}if(C.configuration.AnalyticalConfiguration.indexOf(c.configurationObjectTypes.ISNEWCONFIG)===-1){C.byId("idConfigurationId").setValue(C.configuration.AnalyticalConfiguration);}}function f(C){var m=C.applicationHandler.getApplication(C.params.arguments.appId);if(m){C.byId("idSemanticObject").setValue(m.SemanticObject);}}function g(C){var F;if(C.configuration){F=Object.keys(C.configurationEditor.getFilterOption())[0];C.byId("idFilterTypeRadioGroup").setEnabled(true);C.byId("idFilterTypeRadioGroup").setSelectedButton(C.byId(F));}}function h(C){if(C.params&&C.params.arguments&&C.params.arguments.configId){C.configuration=C.configurationHandler.getConfiguration(C.params.arguments.configId);}if(C.configuration){C.configurationEditor=C.getView().getViewData().oConfigurationEditor;}}function i(C,s){var T=C.textReader("configuration")+": "+s;C.getView().getViewData().updateTitleAndBreadCrumb(T);}function j(C,s){var T=C.configurationHandler.getTextPool();var o=sap.apf.modeler.ui.utils.TranslationFormatMap.APPLICATION_TITLE;T.setTextAsPromise(s,o).done(function(A){C.configurationEditor.setApplicationTitle(A);});}function k(C,s,m){var o={appId:C.params.arguments.appId};var p={name:s};if(m){p.id=m;o.configId=m;C.getView().getViewData().updateSelectedNode(p,o);}else{C.getView().getViewData().updateSelectedNode(p);}}function l(C){var F={};var s=C.byId("idFilterTypeRadioGroup").getSelectedButton().getCustomData()[0].getValue();F[s]=true;C.configurationEditor.setFilterOption(F);C.configurationEditor.setIsUnsaved();}return B.extend("sap.apf.modeler.ui.controller.configuration",{onInit:function(){var C=this;var v=C.getView().getViewData();C.applicationHandler=v.oApplicationHandler;C.configurationHandler=v.oConfigurationHandler;C.textReader=v.getText;C.params=v.oParams;this.coreApi=v.oCoreApi;this.viewValidatorForConfig=new V(C.getView());_(C);if(!this.coreApi.showSemanticObject()){C.byId("idSemanticObjectLabel").setVisible(false);C.byId("idSemanticObject").setVisible(false);}h(C);C.setDetailData();this.viewValidatorForConfig.addField("idConfigTitle");},onAfterRendering:function(){var C=this;if(C.getView().byId("idConfigTitle").getValue().length===0){C.getView().byId("idConfigTitle").focus();}},setDetailData:function(){var C=this;f(C);e(C);d(C);a(C);b(C);g(C);},updateSubViewInstancesOnReset:function(C){this.configurationEditor=C;},handleChangeDetailValue:function(){var C=this;var s=C.byId("idConfigTitle").getValue().trim();var m;if(n.checkIsNotNullOrUndefinedOrBlank(s)){m={AnalyticalConfigurationName:s};if(C.params&&C.params.arguments&&C.params.arguments.configId&&(C.params.arguments.configId.indexOf("newConfig")===-1)){C.configurationHandler.setConfiguration(m,C.params.arguments.configId);k(C,s);}else{var T=C.configurationHandler.setConfiguration(m);C.configuration=C.configurationHandler.getConfiguration(T);if(!C.configurationEditor){C.configurationHandler.loadConfiguration(T,function(o){C.configurationEditor=o;});}k(C,s,T);}j(C,s);i(C,s);C.configuration=m;}C.configurationEditor.setIsUnsaved();},handleChangeForFilterType:function(){var C=this,F;if(!C.configurationEditor.isDataLostByFilterOptionChange()){l(C);C.getView().getViewData().updateTree();}else{F=new sap.ui.xmlfragment("idFilterOptionChangeFragment","sap.apf.modeler.ui.fragment.dialogWithTwoButtons",C);F.setState(sap.ui.core.ValueState.Warning);F.setTitle(C.textReader("warning"));sap.ui.core.Fragment.byId("idFilterOptionChangeFragment","idLabelForDialog").setText(C.textReader("filterOptionChangeMessage"));sap.ui.core.Fragment.byId("idFilterOptionChangeFragment","idBeginButtonForDialog").setText(C.textReader("continue"));sap.ui.core.Fragment.byId("idFilterOptionChangeFragment","idEndButtonForDialog").setText(C.textReader("cancel"));F.open();}},handleBeginButtonDialogWithTwoButtons:function(){var C=this;l(C);C.getView().getViewData().updateTree();sap.ui.core.Fragment.byId("idFilterOptionChangeFragment","idDialogWithTwoButtons").destroy();},handleCancel:function(){var C=this;g(C);sap.ui.core.Fragment.byId("idFilterOptionChangeFragment","idDialogWithTwoButtons").destroy();},getValidationState:function(){return this.viewValidatorForConfig.getValidationState();}});},true);