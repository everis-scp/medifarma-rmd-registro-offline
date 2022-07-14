//@ui5-bundle sap/ushell/plugins/rta-personalize/Component-h2-preload.js
// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.predefine('sap/ushell/plugins/rta-personalize/Component',["sap/base/util/UriParameters","sap/m/MessageBox","sap/m/MessageToast","sap/ui/core/Component","sap/ui/fl/Utils","sap/ui/fl/EventHistory","sap/ushell/plugins/BaseRTAPlugin","sap/ushell/appRuntime/ui5/plugins/baseRta/CheckConditions","sap/ushell/appRuntime/ui5/plugins/baseRta/Renderer"],function(U,M,a,C,F,E,B,b,R){"use strict";var s="PERSONALIZE_Plugin_ActionButton";var c=B.extend("sap.ushell.plugins.rta-personalize.Component",{sType:"rta-personalize",metadata:{manifest:"json",library:"sap.ushell"},init:function(){var o={sComponentName:"sap.ushell.plugins.rta-personalize",layer:"USER",developerMode:false,id:s,text:"PERSONALIZE_BUTTON_TEXT",icon:"sap-icon://edit",visible:false,checkRestartRTA:false};B.prototype.init.call(this,o);var d=this.mConfig.visible&&b.checkUI5App(this);R.createActionButton(this,this._onAdapt.bind(this),d).then(this._checkForEnabledControls.bind(this));},removePersonalizableControl:function(o){var i=this._aPersonalizableControls.indexOf(o);this._aPersonalizableControls.splice(i,1);this._aOriginalFooterVisibility.splice(i,1);if(this._aPersonalizableControls.length===0){this._oObserver.disconnect();delete this._oObserver;this._adaptButtonVisibility(s,false);}},_checkForEnabledControls:function(){this._aPersonalizableControls=[];this._aOriginalFooterVisibility=[];function d(f){if(this._aPersonalizableControls.indexOf(f)===-1){this._aPersonalizableControls.push(f);this._adaptButtonVisibility(s,b.checkUI5App(this));}}function o(f,g,v){if(F.checkControlId(v)){var h=this._getControlInstance(v);d.call(this,h);if(!this._oObserver){this._oObserver=new MutationObserver(function(m){this._aPersonalizableControls.forEach(function(p){if(!p.getDomRef()){this.removePersonalizableControl(p);}}.bind(this));}.bind(this));var O={attributes:true,childList:true,characterData:false,subtree:true,attributeFilter:["style","class"]};this._oObserver.observe(window.document,O);}}}sap.ui.getCore().getEventBus().subscribe("sap.ui","ControlForPersonalizationRendered",o,this);var e=E.getHistoryAndStop("ControlForPersonalizationRendered");e.forEach(function(f){o.call(this,f.channelId,f.eventId,f.parameters);}.bind(this));},_getControlInstance:function(e){if(typeof e==="string"){var o=sap.ui.getCore().byId(e);return o||C.get(e);}return e;},_onAppLoaded:function(){var l=this._aPersonalizableControls.length;for(var i=l;i>0;i--){this.removePersonalizableControl(this._aPersonalizableControls[i-1]);}},_onStartHandler:function(e){var i=e.getParameter("editablePluginsCount");if(i!==undefined&&i<=0){M.information(this.mConfig.i18n.getText("MSG_STARTUP_NO_OVERLAYS"),{onClose:function(){this.oTrigger.triggerStopRta(true,true);}.bind(this)});}},_loadPlugins:function(r){var p=new Promise(function(d){sap.ui.require(["sap/ui/rta/plugin/EasyAdd","sap/ui/rta/plugin/EasyRemove"],function(e,f){var P=r.getDefaultPlugins(),o=P.remove;P.remove=new f({commandFactory:o.getCommandFactory()});var A=P.additionalElements;P.additionalElements=new e({commandFactory:A.getCommandFactory(),analyzer:A.getAnalyzer(),dialog:A.getDialog()});P.contextMenu.setOpenOnClick(false);r.setPlugins(P);d();});});return p;},_onAdapt:function(e){if(!b.checkFlexEnabledOnStart(this)){this.oTrigger.handleFlexDisabledOnStart();}else if(e.getSource().getText()===this.mConfig.i18n.getText("PERSONALIZE_BUTTON_TEXT")){var u=U.fromURL(window.location.href),S=u.mParams["sap-ui-layer"]&&u.mParams["sap-ui-layer"][0];if(!S||S==="USER"){e.getSource().setText(this.mConfig.i18n.getText("END_PERSONALIZE_BUTTON_TEXT"));this._adaptButtonVisibility("RTA_Plugin_ActionButton",false);this._aPersonalizableControls.forEach(function(d){if(d.setShowFooter){this._aOriginalFooterVisibility.push(d.getShowFooter());}else{this._aOriginalFooterVisibility.push(undefined);}}.bind(this));this._adaptFooterVisibility(false);var o=this._getFlpSearchButton();this._bOriginalSearchButtonVisibility=o&&o.getVisible();if(this._bOriginalSearchButtonVisibility){this._adaptButtonVisibility(o,false);}B.prototype._onAdapt.call(this,e);}else{M.information(this.mConfig.i18n.getText("MSG_STARTUP_WRONG_LAYER"));}}else{this.oTrigger.triggerStopRta(false,true);}},_switchToDefaultMode:function(){sap.ui.getCore().byId(s).setText(this.mConfig.i18n.getText("PERSONALIZE_BUTTON_TEXT"));this._adaptButtonVisibility("RTA_Plugin_ActionButton",true);this._adaptFooterVisibility(true);if(this._bOriginalSearchButtonVisibility!==undefined){this._adaptButtonVisibility(this._getFlpSearchButton(),this._bOriginalSearchButtonVisibility);delete this._bOriginalSearchButtonVisibility;}a.show(this.mConfig.i18n.getText("SAVE_SUCCESSFUL"),{duration:4000,offset:"0 -50"});},_adaptFooterVisibility:function(v){this._aPersonalizableControls.forEach(function(o,i){if(this._aOriginalFooterVisibility[i]){o.setShowFooter(v);}}.bind(this));},_getFlpSearchButton:function(){return this.oRenderer.getRootControl().getOUnifiedShell().getHeader().getHeadEndItems()[0];},_getFLPViewPort:function(){return sap.ui.getCore().byId("viewPortContainer");}});return c;});
sap.ui.require.preload({
	"sap/ushell/plugins/rta-personalize/manifest.json":'{"_version":"1.21.0","sap.app":{"_version":"1.1.0","i18n":{"bundleUrl":"i18n/i18n.properties","supportedLocales":["","ar","bg","ca","cs","da","de","el","en","en_US_sappsd","en_US_saptrc","es","et","fi","fr","hi","hr","hu","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh_CN","zh_TW"],"fallbackLocale":"en"},"id":"sap.ushell.plugins.rta-personalize","title":"{{APP_TITLE}}","type":"component","applicationVersion":{"version":"1.0.0"},"ach":"CA-UI5-FL-RTA","resources":"resources.json"},"sap.ui":{"_version":"1.1.0","technology":"UI5","supportedThemes":["sap_hcb","sap_bluecrystal"],"deviceTypes":{"desktop":true,"tablet":false,"phone":false}},"sap.ui5":{"_version":"1.1.0","contentDensities":{"compact":true,"cozy":false},"dependencies":{"minUI5Version":"1.30.1","libs":{"sap.ui.core":{"minVersion":"1.30.1"},"sap.m":{"minVersion":"1.30.1"},"sap.ui.dt":{"minVersion":"1.30.1","lazy":true},"sap.ui.rta":{"minVersion":"1.30.1","lazy":true}}},"models":{"i18n":{"type":"sap.ui.model.resource.ResourceModel","uri":"i18n/i18n.properties","settings":{"supportedLocales":["","ar","bg","ca","cs","da","de","el","en","en_US_sappsd","en_US_saptrc","es","et","fi","fr","hi","hr","hu","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh_CN","zh_TW"],"fallbackLocale":"en"}}}},"sap.flp":{"type":"plugin"}}'
},"sap/ushell/plugins/rta-personalize/Component-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ushell/plugins/rta-personalize/Component.js":["sap/base/util/UriParameters.js","sap/m/MessageBox.js","sap/m/MessageToast.js","sap/ui/core/Component.js","sap/ui/fl/EventHistory.js","sap/ui/fl/Utils.js","sap/ushell/appRuntime/ui5/plugins/baseRta/CheckConditions.js","sap/ushell/appRuntime/ui5/plugins/baseRta/Renderer.js","sap/ushell/plugins/BaseRTAPlugin.js"]
}});
//# sourceMappingURL=Component-h2-preload.js.map