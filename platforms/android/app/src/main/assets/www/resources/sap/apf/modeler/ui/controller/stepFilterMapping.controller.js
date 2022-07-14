/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/modeler/ui/controller/requestOptions","sap/apf/modeler/ui/utils/displayOptionsValueBuilder","sap/apf/modeler/ui/utils/textPoolHelper","sap/ui/thirdparty/jquery"],function(r,d,t,q){"use strict";var n=sap.apf.modeler.ui.utils.nullObjectChecker;var a=sap.apf.modeler.ui.utils.textManipulator;var T=sap.apf.modeler.ui.utils.TranslationFormatMap.STEPFILTERPROPERTY_LABEL;function _(C){var o=C.getView().getViewData().oTextReader;var e=C.oParentObject.getFilterMappingTargetPropertyLabelKey()?o("label"):o("label")+" ("+o("default")+")";C.byId("idOptionalSelectedPropertyLabel").setText(e);C.byId("idOptionalSelectedPropertyLabel").setTooltip(e);}function b(C){var S=C.getSource();var e=C.getEntity();var p;var P=C.oParentObject.getFilterMappingTargetPropertyLabelKey();if(S===undefined||e===undefined){return;}if(n.checkIsNotUndefined(P)){p=C.getView().getViewData().oConfigurationHandler.getTextPool().get(P).TextElementDescription;C.byId("idOptionalSelectedPropertyLabelText").setValue(p);return;}C.oStepPropertyMetadataHandler.getFilterMappingEntityTypeMetadataAsPromise(S,e).done(function(f){var g=C.oParentObject.getFilterMappingTargetProperties()[0];if(g){p=C.oStepPropertyMetadataHandler.getDefaultLabel(f,g);}C.byId("idOptionalSelectedPropertyLabelText").setValue(p);});}function c(C){C.byId("idOptionalRequestFieldLabel").addStyleClass("filterPropertyLable");C.byId("idOptionalRequestField").addStyleClass("filterProperty");C.byId("idOptionalLabelDisplayOptionType").addStyleClass("filterProperty");}var s=sap.apf.modeler.ui.controller.requestOptions.extend("sap.apf.modeler.ui.controller.stepFilterMapping",{setLabelDisplayOptionTypeAsPromise:function(o){var e=q.Deferred();var C=this;var S=C.getSource();var E=C.getEntity();var l=[];var f=C.getView().getViewData().oTextReader;var d=new sap.apf.modeler.ui.utils.DisplayOptionsValueBuilder(f,o);var m=d.getLabelDisplayOptions();var L=sap.apf.core.constants.representationMetadata.labelDisplayOptions;var p=a.removePrefixText(C.byId("idOptionalRequestField").getSelectedKey(),f(sap.apf.modeler.ui.utils.CONSTANTS.texts.NOTAVAILABLE));_(C);b(C);C.byId("idOptionalLabelDisplayOptionType").setEnabled(true);if(!p){C.byId("idOptionalLabelDisplayOptionType").setModel(m);C.byId("idOptionalLabelDisplayOptionType").setEnabled(false);return e.promise();}var g=C.oParentObject.getFilterMappingTargetPropertyLabelDisplayOption();C.oStepPropertyMetadataHandler.getFilterMappingEntityTypeMetadataAsPromise(S,E).done(function(h){if((g===L.KEY_AND_TEXT||g===L.TEXT)&&!h.getPropertyMetadata(p).text){m=d.getValidatedLabelDisplayOptions();l=a.addPrefixText([g],f);g=l[0];}C.byId("idOptionalLabelDisplayOptionType").setModel(m);C.byId("idOptionalLabelDisplayOptionType").setSelectedKey(g);e.resolve();});return e.promise();},enableDisableLabelDisplayOptionTypeAsPromise:function(){var C=this;var S=C.getSource();var e=C.getEntity();var f=q.Deferred();var o=C.getView().getViewData().oTextReader;var D=C.byId("idOptionalLabelDisplayOptionType");var p=a.removePrefixText(C.byId("idOptionalRequestField").getSelectedKey(),o(sap.apf.modeler.ui.utils.CONSTANTS.texts.NOTAVAILABLE));C.oStepPropertyMetadataHandler.getFilterMappingEntityTypeMetadataAsPromise(S,e).done(function(g){var i=g.getPropertyMetadata(p).text;D.getItems().forEach(function(h){h.setEnabled(true);if(h.getKey()!=="key"&&!i){h.setEnabled(false);}});f.resolve();});return f.promise();},changeLabelDisplayOption:function(l){var C=this;C.oParentObject.setFilterMappingTargetPropertyLabelDisplayOption(l);},changeOptionalSelectedPropertyLabelText:function(l){var C=this;if(l.trim().length===0){C.oParentObject.setFilterMappingTargetPropertyLabelKey(undefined);_(C);b(C);return;}C.getView().getViewData().oConfigurationHandler.getTextPool().setTextAsPromise(l,T).done(function(L){C.oParentObject.setFilterMappingTargetPropertyLabelKey(L);_(C);b(C);});},onBeforeRendering:function(){var C=this;C.byId("idSelectPropertiesLabel").setVisible(false);C.byId("idSelectProperties").setVisible(false);C.byId("idOptionalRequestFieldLabel").setVisible(true);C.byId("idOptionalRequestField").setVisible(true);C.byId("idOptionalLabelDisplayOptionType").setVisible(true);C.byId("idOptionalRequestField").setForceSelection(false);C.byId("idOptionalSelectedPropertyLabel").setVisible(true);C.byId("idOptionalSelectedPropertyLabelText").setVisible(true);},onAfterRendering:function(){c(this);},getIdOfPropertiesControl:function(){return"idOptionalRequestField";},getIdOfPropertyLabel:function(){return"idOptionalRequestFieldLabel";},setSelectedKeysForProperties:function(p){var C=this;if(p.length!==0){C.byId("idOptionalRequestField").setSelectedKey(p[0]);}else{C.byId("idOptionalRequestField").clearSelection();}},getSelectedKeysForProperties:function(){var C=this,S,e;var o=C.getView().getViewData().oTextReader;S=a.removePrefixText(C.byId("idOptionalRequestField").getSelectedKey(),o(sap.apf.modeler.ui.utils.CONSTANTS.texts.NOTAVAILABLE));e=n.checkIsNotNullOrUndefinedOrBlank(S)?[S]:[];return e;},setDisplayText:function(){var C=this;var o=C.getView().getViewData().oTextReader;C.byId("idSourceLabel").setText(o("source"));C.byId("idEntityLabel").setText(o("entity"));C.byId("idOptionalRequestFieldLabel").setText(o("targetProperty"));},resetEntityAndProperties:function(){var C=this;C.clearEntity();C.byId("idEntity").setModel(null);C.byId("idEntity").setSelectedKey(undefined);C.clearSelectProperties();C.byId("idOptionalRequestField").setModel(null);C.byId("idOptionalRequestField").setSelectedKey(undefined);},resetFilterMappingFields:function(){var C=this;C.clearSource();C.byId("idSource").setValue("");C.resetEntityAndProperties();C.addOrRemoveMandatoryFieldsAndRequiredFlag(false);},updateFilterMappingFields:function(){var C=this,S,e,E,f,g;var o=C.getView().getViewData().oTextReader;S=C.byId("idSource").getValue().trim();C.oConfigurationEditor.setIsUnsaved();if(n.checkIsNotNullOrUndefinedOrBlank(S)){C.getAllEntitiesAsPromise(S).done(function(h){if(!n.checkIsNotNullOrUndefinedOrBlank(h)){C.resetEntityAndProperties();return;}C.setDetailData();e=a.removePrefixText(C.byId("idEntity").getSelectedKey(),o(sap.apf.modeler.ui.utils.CONSTANTS.texts.NOTAVAILABLE));E=n.checkIsNotNullOrUndefinedOrBlank(e)?e:undefined;C.updateEntity(E);f=a.removePrefixText(C.byId("idOptionalRequestField").getSelectedKey(),o(sap.apf.modeler.ui.utils.CONSTANTS.texts.NOTAVAILABLE));g=n.checkIsNotNullOrUndefinedOrBlank(f)?[f]:[];C.updateSelectProperties(g);});}},getSource:function(){var C=this;return C.oParentObject.getFilterMappingService();},getAllEntitiesAsPromise:function(S){var C=this;return C.oConfigurationEditor.getAllEntitySetsOfServiceWithGivenPropertiesAsPromise(S,C.oParentObject.getFilterProperties());},getEntity:function(){var C=this;return C.oParentObject.getFilterMappingEntitySet();},getAllEntitySetPropertiesAsPromise:function(S,e){var C=this;return C.oConfigurationEditor.getAllPropertiesOfEntitySetAsPromise(S,e);},clearSource:function(){var C=this;C.oParentObject.setFilterMappingService(undefined);C.clearEntity();},clearEntity:function(){var C=this;C.oParentObject.setFilterMappingEntitySet(undefined);C.clearSelectProperties();},clearSelectProperties:function(){var C=this;var o=C.oParentObject.getFilterMappingTargetProperties();o.forEach(function(p){C.oParentObject.removeFilterMappingTargetProperty(p);});C.byId("idOptionalSelectedPropertyLabelText").setValue("");},removeSelectProperties:function(p){var C=this;p.forEach(function(e){C.oParentObject.removeFilterMappingTargetProperty(e);});},updateSource:function(S){var C=this;C.oParentObject.setFilterMappingService(S);},updateEntity:function(e){var C=this;C.oParentObject.setFilterMappingEntitySet(e);},updateSelectProperties:function(S){var C=this;C.removeSelectProperties(C.oParentObject.getFilterMappingTargetProperties());S.forEach(function(p){C.oParentObject.addFilterMappingTargetProperty(p);});},updateOptionalRequestFieldProperty:function(f){var C=this;C.updateSelectProperties(f);},getSelectProperties:function(){var C=this;return C.oParentObject.getFilterMappingTargetProperties();},getValidationState:function(){var C=this;return C.viewValidator.getValidationState();}});return s;},true);
