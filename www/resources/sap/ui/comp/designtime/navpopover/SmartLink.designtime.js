/*
 * ! SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/comp/navpopover/RTAHandler','sap/m/ObjectIdentifier',"sap/base/Log"],function(R,O,L){"use strict";(function(){O.getMetadata().loadDesignTime().then(function(d){if(d.registerSettingsHandler){d.registerSettingsHandler({getStableElements:function(o){var n;o.fireEvent("ObjectIdentifier.designtime",{caller:"ObjectIdentifier.designtime",registerNavigationPopoverHandler:function(N){n=N;}});return R.getStableElements(n);},isSettingsAvailable:function(){return R.isSettingsAvailable();},execute:function(o,g){var n;o.fireEvent("ObjectIdentifier.designtime",{caller:"ObjectIdentifier.designtime",registerNavigationPopoverHandler:function(N){n=N;}});return R.execute(n,g);}});}});})();return{getStableElements:function(s){return R.getStableElements(s.getNavigationPopoverHandler());},actions:{settings:function(){if(!R.isSettingsAvailable()){L.error("sap.ui.comp.navpopover.SmartLink.designtime: 'settings' action is not available");return;}return{handler:function(s,p){return R.execute(s.getNavigationPopoverHandler(),p.getUnsavedChanges,p.styleClass);}};}},annotations:{semanticObjectMapping:{namespace:"com.sap.vocabularies.Common.v1",annotation:"SemanticObjectMapping",target:["Property"],defaultValue:null,appliesTo:["text"],group:["Behavior"],since:"1.48.0"},contact:{namespace:"com.sap.vocabularies.Communication.v1",annotation:"Contact",target:["EntityType"],allowList:{values:["Hidden"]},defaultValue:null,appliesTo:["text","label","value"],group:["Behavior"],since:"1.40.1"},semanticObjectUnavailableActions:{namespace:"com.sap.vocabularies.Common.v1",annotation:"SemanticObjectUnavailableActions",target:["Property"],defaultValue:null,appliesTo:["text"],group:["Behavior"],since:"1.60.0"}},properties:{semanticObject:{ignore:true},additionalSemanticObjects:{ignore:true},semanticObjectController:{ignore:true},fieldName:{ignore:true},semanticObjectLabel:{ignore:true},createControlCallback:{ignore:true},mapFieldToSemanticObject:{ignore:true},contactAnnotationPath:{ignore:false},ignoreLinkRendering:{ignore:true},enableAvailableActionsPersonalization:{ignore:false},uom:{ignore:true},enabled:{ignore:false},forceLinkRendering:{ignore:true},beforeNavigationCallback:{ignore:true}},customData:{}};});
