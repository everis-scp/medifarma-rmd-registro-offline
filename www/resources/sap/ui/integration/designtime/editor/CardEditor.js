/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["ui5loader","sap/ui/core/Control","sap/ui/core/Core","sap/base/util/deepClone","sap/base/util/merge","sap/ui/integration/widgets/Card","sap/ui/integration/Designtime","sap/ui/model/json/JSONModel","sap/ui/integration/util/CardMerger","sap/ui/integration/util/Utils","sap/m/Label","sap/m/Title","sap/m/Panel","sap/m/HBox","sap/m/VBox","sap/ui/core/Icon","sap/m/ResponsivePopover","sap/m/Popover","sap/m/Text","sap/base/Log","sap/ui/core/Popup","sap/base/i18n/ResourceBundle","sap/ui/thirdparty/URI","sap/ui/dom/includeStylesheet","sap/base/util/LoaderExtensions","sap/ui/core/theming/Parameters","sap/base/util/ObjectPath","sap/m/FormattedText","sap/m/MessageStrip","sap/m/ToolbarSpacer","sap/base/util/includes"],function(u,C,c,d,f,g,D,J,h,U,L,T,P,H,V,I,R,k,l,p,q,r,t,v,w,x,O,F,M,S,y){"use strict";var A=k.prototype.init;k.prototype.init=function(){A.apply(this,arguments);var a=this.oPopup._applyPosition,b=this;this.oPopup._applyPosition=function(){var e=b.close;b.close=function(){};a.apply(this,arguments);b.close=e;};};function B(s){if(s&&s.nodeType!==1){return 0;}var z=parseInt(window.getComputedStyle(s).getPropertyValue('z-index'));if(isNaN(z)){return B(s.parentNode);}return z+1;}var E=/\{\{(?!parameters.)(?!destinations.)([^\}\}]+)\}\}/g,G=5000,K=c.getLibraryResourceBundle("sap.ui.integration"),N="__strip0";var Q=C.extend("sap.ui.integration.designtime.editor.CardEditor",{metadata:{library:"sap.ui.integration",properties:{card:{type:"any",defaultValue:null},mode:{type:"string",defaultValue:"admin"},language:{type:"string",defaultValue:""},allowDynamicValues:{type:"boolean",defaultValue:false},allowSettings:{type:"boolean",defaultValue:false},designtime:{type:"object"}},aggregations:{_formContent:{type:"sap.ui.core.Control",multiple:true,visibility:"hidden"},_preview:{type:"sap.ui.integration.designtime.editor.CardPreview",multiple:false,visibility:"hidden"},_messageStrip:{type:"sap.m.MessageStrip",multiple:false,visibility:"hidden"}},events:{ready:{}}},renderer:function(o,a){o.openStart("div");a.getMode()==="translation"?o.addClass("sapUiIntegrationCardEditorTranslation"):o.addClass("sapUiIntegrationCardEditorPreview");o.addClass("sapUiIntegrationCardEditor");o.writeClasses();o.writeElementData(a);o.openEnd();if(a.isReady()){var b=a.getAggregation("_preview");var e=false;if(b&&b.getSettings()&&b.getSettings().preview&&b.getSettings().preview.modes==="None"){e=true;}o.openStart("div");a.getMode()==="translation"||e?o.addClass("sapUiIntegrationCardEditorFormWithNoPreview"):o.addClass("sapUiIntegrationCardEditorForm");if(a.getMode()!=="translation"){o.addClass("settingsButtonSpace");}o.writeClasses();o.openEnd();if(a.getMode()!=="translation"){o.renderControl(a.getAggregation("_messageStrip"));}var j=a.getAggregation("_formContent");if(j){var m;var s;var z;var X;var Y=[];var Z=2;var $;var _=function(){if(Y.length>0){var f1=Z-Y.length;for(var n=0;n<f1;n++){Y.push(new V({}));}m.addContent(new H({items:Y}));Y=[];}};for(var i=0;i<j.length;i++){var a1=j[i];if(a.getMode()!=="translation"){if(a1.isA("sap.m.Panel")){if(m){_();if(m.getContent().length>0){o.renderControl(m);}}m=a1;m.addStyleClass("sapUiIntegrationCardEditorItem");if(i===j.length-1){_();if(m.getContent().length>0){o.renderControl(m);}}continue;}if(a1.isA("sap.m.FormattedText")){m.addContent(new H({items:a1}).addStyleClass("sapUiIntegrationCardEditorHint"));continue;}if(a1.isA("sap.m.Label")){a1.addStyleClass("sapUiIntegrationCardEditorItemLabel");var b1=a1.getDependents()&&a1.getDependents()[0];var c1=new H({items:[a1.addStyleClass("description")]});if(b1){c1.addItem(b1);}if(a1._oMessageIcon){c1.addItem(a1._oMessageIcon);}if(a1._cols===1){if(Y.length===Z){m.addContent(new H({items:Y}));Y=[];}X=c1.addStyleClass("col1box");continue;}_();if(a1._sOriginalType==="boolean"){z=c1.addStyleClass("notWrappingRowLabelBox");}else{m.addContent(c1);}}else if(a1._cols===1){var d1=new V({items:[X,a1]});d1.addStyleClass("col1");Y.push(d1);X=null;}else if(z){m.addContent(new H({items:[z,a1]}).addStyleClass("notWrappingRow"));z=null;}else if(a1.isA("sap.m.ToolbarSpacer")){_();if(a1._hasLine){a1.addStyleClass("sapUiIntegrationCardEditorSpacerWithLine");}else{a1.addStyleClass("sapUiIntegrationCardEditorSpacerWithoutLine");}m.addContent(a1);}else{m.addContent(a1);}if(i===j.length-1){_();if(m.getContent().length>0){o.renderControl(m);}}}else{if(i===0){s=a1;o.renderControl(s);s.addStyleClass("sapUiIntegrationCardEditorTranslationPanel");continue;}if(a1.isA("sap.m.Panel")){if(m&&m.getContent().length>0){s.addContent(m);}m=a1;m.addStyleClass("sapUiIntegrationCardEditorTranslationSubPanel");continue;}if(a1.isA("sap.m.ToolbarSpacer")){continue;}if(a1.isA("sap.m.FormattedText")){continue;}if(a1.isA("sap.m.Label")){m.addContent(a1);continue;}if(a1.isOrigLangField){$=a1;continue;}$.addStyleClass("sapUiIntegrationFieldTranslationText");var e1=new H({items:[$,a1]}).addStyleClass("notWrappingRow");m.addContent(e1);if(i===j.length-1){s.addContent(m);}}}}o.close("div");b&&o.renderControl(b);}o.close("div");}});Q.prototype.init=function(){this._ready=false;this._aFieldReadyPromise=[];this._oResourceBundle=K;this._appliedLayerManifestChanges=[];this._currentLayerManifestChanges={};this._mDestinationDataProviders={};this.setAggregation("_messageStrip",new M({showIcon:false}));};Q.prototype.isReady=function(){return this._ready;};function W(o,s,a,b){b=b||"";a=a||[];if(typeof o==="object"){if(!o[s]){for(var n in o){W(o[n],s,a,b+"/"+n);}}else{if(o.type){a.push({path:o.pathvalue||b.substring(1),value:o.pathvalue||"{context>"+b.substring(1)+"/value}",object:o});}else{a.push({path:b.substring(1),object:o});for(var n in o){W(o[n],s,a,b+"/"+n);}}}}return a;}Q.prototype._filterManifestChangesByLayer=function(m){var a=this;var b=[],o={":layer":h.layers[a.getMode()]},i=h.layers[this.getMode()];m.manifestChanges.forEach(function(e){var j=e.hasOwnProperty(":layer")?e[":layer"]:1000;if(j<i){b.push(e);}else if(j===i){o=e;}});m.manifestChanges=b;a._currentLayerManifestChanges=o;};Q.prototype.setCard=function(a,s){this._ready=false;if(a===this.getProperty("card")){return this;}if(this._oEditorCard){this._oEditorCard.destroy();}if(this._oDesigntimeInstance){this._oDesigntimeInstance.destroy();}this.setProperty("card",a,s);Promise.resolve().then(function(){this._initCard(a);}.bind(this));return this;};Q.prototype.setLanguage=function(s,b){if(!s||typeof s!=="string"){return this;}this._language=s.replace("-","_");if(this.getLanguage()!=s){K=c.getLibraryResourceBundle("sap.ui.integration");this._oResourceBundle=K;}this.setProperty("language",s,b);if(!Q._languages[this._language]){this._language=this._language.split("_")[0];}if(!Q._languages[this._language]){p.warning("The language: "+s+" is currently unknown, some UI controls might show "+s+" instead of the language name.");}return this;};Q.prototype.onAfterRendering=function(){if(this.getDomRef()){this._iZIndex=B(this.getDomRef());q.setInitialZIndex(this._iZIndex);}};Q.prototype._getOriginalManifestJson=function(){try{return this._oEditorCard._oCardManifest._oManifest.getRawJson();}catch(e){return{};}};Q.prototype._initCard=function(a){if(typeof a==="string"){try{a=JSON.parse(a);}catch(e){var i=c.byId(a);if(!i){var b=document.getElementById(a);if(b&&b.tagName&&b.tagName==="ui-integration-card"){i=b._getControl();}}a=i;}}if(a&&a.isA&&a.isA("sap.ui.integration.widgets.Card")){a={manifest:a.getManifest(),manifestChanges:a.getManifestChanges(),host:a.getHost(),baseUrl:a.getBaseUrl()};}if(typeof a==="object"){var j=h.layers[this.getMode()];if(a.manifestChanges){this._filterManifestChangesByLayer(a);}this._oEditorCard=new g(a);var m=this;this._oEditorCard._prepareToApplyManifestSettings=function(){g.prototype._prepareToApplyManifestSettings.apply(this,arguments);if(!m._oEditorCard._isManifestReady){return;}if(m._manifestModel){return;}m._appliedLayerManifestChanges=a.manifestChanges;var o=m._oEditorCard.getManifestEntry("/");var _=f({},o);m._oProviderCard=m._oEditorCard;m._oProviderCard._editorManifest=o;m._beforeManifestModel=new J(_);if(j<h.layers["translation"]&&m._currentLayerManifestChanges){o=h.mergeCardDelta(o,[m._currentLayerManifestChanges]);}m._manifestModel=new J(o);m._originalManifestModel=new J(m._getOriginalManifestJson());m._initInternal();if(!m._oEditorCard.getModel("i18n")){m._oEditorCard._loadDefaultTranslations();}m.setModel(m._oEditorCard.getModel("i18n"),"i18n");m._createContextModel();};this._oEditorCard.onBeforeRendering();}};Q.prototype._initInternal=function(){var s=this._oEditorCard.getManifestEntry("/sap.card/configuration/editor");if(s===undefined){s=this._oEditorCard.getManifestEntry("/sap.card/designtime");}var o=this._manifestModel.getProperty("/sap.card/configuration"),a,b=this.getDesigntime();if(b){if(typeof b==="function"){a=new Promise(function(e,i){var j=new b();this._applyDesigntimeDefaults(j.getSettings());e(j);}.bind(this));}else if(typeof b==="object"){a=new Promise(function(e,i){sap.ui.require(["sap/ui/integration/Designtime"],function(D){var j=D.extend("test.Designtime");j.prototype.create=function(){return b;};var m=new j();this._applyDesigntimeDefaults(m.getSettings());e(m);}.bind(this));}.bind(this));}}else if(s){a=this._oEditorCard.loadDesigntime().then(function(e){this._applyDesigntimeDefaults(e.getSettings());return e;}.bind(this));}else{a=Promise.resolve(this._createParameterDesigntime(o));}a.then(function(e){this._oDesigntimeInstance=e;if(this.getMode()==="admin"||this.getMode()==="all"){this._addDestinationSettings(o,this._oDesigntimeInstance);}this._settingsModel=new J(this._oDesigntimeInstance.getSettings());this.setModel(this._settingsModel,"currentSettings");this.setModel(this._settingsModel,"items");this._oProviderCard.setModel(this._settingsModel,"currentSettings");this._oProviderCard.setModel(this._settingsModel,"items");this._applyDesigntimeLayers();this._requireFields().then(function(){this._startEditor();}.bind(this));}.bind(this));};Q.prototype.getCurrentSettings=function(){var s=this._settingsModel.getProperty("/"),m={},a;if(s&&s.form&&s.form.items){for(var n in s.form.items){var i=s.form.items[n];if(i.editable&&i.visible){var b="";if(i.manifestpath){b=i.manifestpath.substring(0,i.manifestpath.lastIndexOf("/"))+"/valueTranslations";}if(this.getMode()!=="translation"){if(i.translatable&&!i._changed&&i._translatedDefaultPlaceholder&&!this._currentLayerManifestChanges[i.manifestpath]&&!this._currentLayerManifestChanges[b]){continue;}else{m[i.manifestpath]=i.value;if(i.valueItems){m[i.manifestpath.substring(0,i.manifestpath.lastIndexOf("/"))+"/valueItems"]=i.valueItems;}}}else if(i.translatable&&i.value){m[i.manifestpath]=i.value;}if(i._next&&(this.getAllowSettings())){var e=typeof(i.visibleToUser)==="undefined"?true:i.visibleToUser;var j=typeof(i.editableToUser)==="undefined"?true:i.editableToUser;if(i._next.visible===!e){a=a||{};a[i._settingspath+"/visible"]=i._next.visible;}if(i._next.editable===!j){a=a||{};a[i._settingspath+"/editable"]=i._next.editable;}if(typeof i._next.allowDynamicValues==="boolean"&&this.getAllowDynamicValues()){a=a||{};a[i._settingspath+"/allowDynamicValues"]=i._next.allowDynamicValues;}}}}}if(this.getMode()!=="translation"){m[":multipleLanguage"]=true;}m[":layer"]=h.layers[this.getMode()];m[":errors"]=this.checkCurrentSettings()[":errors"];if(a){m[":designtime"]=a;}return m;};Q.prototype.checkCurrentSettings=function(){var s=this._settingsModel.getProperty("/"),m={};if(s&&s.form&&s.form.items){for(var n in s.form.items){var i=s.form.items[n];if(i.editable){if((i.isValid||i.required)&&!(this.getMode()==="translation"&&i.translatable)){if(i.isValid){m[i.manifestpath]=i.isValid(i);}m[i.manifestpath]=true;var a=i.value;var b=i.type;if(b==="string"&&a===""){m[i.manifestpath]=a;}if((b==="date"||b==="datetime")&&isNaN(Date.parse(a))){m[i.manifestpath]=a;}if(b==="integer"){if(isNaN(parseInt(a))){m[i.manifestpath]=a;}else if(a<i.min||a>i.max){m[i.manifestpath]=a;}}if(b==="number"){if(isNaN(parseFloat(a))){m[i.manifestpath]=a;}else if(a<i.min||a>i.max){m[i.manifestpath]=a;}}}}}m[":layer"]=h.layers[this.getMode()];}m[":errors"]=Object.values(m).indexOf(false)>-1;return m;};Q.prototype._createContextModel=function(){var b=this._oEditorCard.getHostInstance(),e=new J({}),i=new J([]);this.setModel(e,"context");this.setModel(i,"contextflat");i._getPathObject=function(s){var a=this.getData().filter(function(o){if(o.path===s){return true;}});return a.length?a[0]:null;};i._getValueObject=function(s){var a=this.getData()||[];a=a.filter(function(o){if(o.value===s||o.object.value===s){return true;}});return a.length?a[0]:null;};var j=new Promise(function(a,m){if(b&&b.getContext){var n=false;setTimeout(function(){if(n){return;}p.error("Card Editor context could not be determined with "+G+".");n=true;a({});},G);b.getContext().then(function(o){if(n){p.error("Card Editor context returned after more than "+G+". Context is ignored.");}n=true;a(o||{});});}else{a({});}});j.then(function(o){var a={};a["empty"]=Q._contextEntries.empty;for(var n in o){a[n]=o[n];}a["card.internal"]=Q._contextEntries["card.internal"];e.setData(a);i.setData(W(a,"label"));});e.getProperty=function(s,o){var a=this.resolve(s,o);if(a.endsWith("/value")){this._mValues=this._mValues||{};if(this._mValues.hasOwnProperty(a)){return this._mValues[a];}this._mValues[a]=undefined;b.getContextValue(a.substring(1)).then(function(m){this._mValues[a]=m;this.checkUpdate();}.bind(this));return undefined;}else{return J.prototype.getProperty.apply(this,arguments);}};};Q.fieldMap={"string":"sap/ui/integration/designtime/editor/fields/StringField","integer":"sap/ui/integration/designtime/editor/fields/IntegerField","number":"sap/ui/integration/designtime/editor/fields/NumberField","boolean":"sap/ui/integration/designtime/editor/fields/BooleanField","date":"sap/ui/integration/designtime/editor/fields/DateField","datetime":"sap/ui/integration/designtime/editor/fields/DateTimeField","string[]":"sap/ui/integration/designtime/editor/fields/ListField","destination":"sap/ui/integration/designtime/editor/fields/DestinationField"};Q.Fields=null;Q.prototype._requireFields=function(){if(Q.Fields){return Promise.resolve();}return new Promise(function(a){sap.ui.require(Object.values(Q.fieldMap),function(){Q.Fields={};for(var n in Q.fieldMap){Q.Fields[n]=arguments[Object.keys(Q.fieldMap).indexOf(n)];}a();});});};Q.prototype._createLabel=function(o){var a=new L({text:o.label,tooltip:o.tooltip||o.label,required:o.required&&o.editable||false,visible:o.visible,objectBindings:{currentSettings:{path:"currentSettings>"+o._settingspath},items:{path:"items>/form/items"}}});a._cols=o.cols||2;a._sOriginalType=o.type;if(o.description){var b=new I({src:"sap-icon://message-information",color:"Marker",size:"12px",useIconTooltip:false,visible:this.getMode()!=="translation"});b.addStyleClass("sapUiIntegrationCardEditorDescriptionIcon");a.addDependent(b);a._oDescriptionIcon=b;b.onmouseover=function(b){this._getPopover().getContent()[0].applySettings({text:o.description});this._getPopover().openBy(b);b.addDependent(this._getPopover());}.bind(this,b);b.onmouseout=function(b){this._getPopover().close();b.removeDependent(this._getPopover());}.bind(this,b);}var m=new I({src:"sap-icon://message-information",size:"12px",useIconTooltip:false});m.addStyleClass("sapUiIntegrationCardEditorMessageIcon");a._oMessageIcon=m;return a;};Q.prototype._getPopover=function(){if(this._oPopover){return this._oPopover;}var o=new l({text:""});o.addStyleClass("sapUiTinyMargin sapUiIntegrationCardEditorDescriptionText");this._oPopover=new R({showHeader:false,content:[o]});this._oPopover.addStyleClass("sapUiIntegrationCardEditorPopover");return this._oPopover;};Q.prototype._updateProviderCard=function(a){if(this._ready){var m=this._oProviderCard._editorManifest;if(a.length===0){return;}for(var i=0;i<a.length;i++){var o=a[i];o.config._cancel=true;}delete m["sap.card"].header;delete m["sap.card"].content;delete m["sap.card"].data;m["sap.card"].type="List";var b=this._oProviderCard;this._oProviderCard=new g({manifest:m,baseUrl:this._getBaseUrl(),host:this._oProviderCard.getHost()});this._oProviderCard.setManifestChanges([this.getCurrentSettings()]);this._oProviderCard._editorManifest=m;var e=this;this._oProviderCard._fillFiltersModel=function(){if(!e._oProviderCard._oDataProviderFactory){return;}e._bIgnoreUpdates=true;for(var i=0;i<a.length;i++){var o=a[i];o.config._cancel=false;e._addValueListModel(o.config,o.field,true,500*i);}e._bIgnoreUpdates=false;};this._oProviderCard.setVisible(false);this._oProviderCard.setModel(this._settingsModel,"items");this._oProviderCard.setModel(this._settingsModel,"currentSettings");this._oProviderCard.onBeforeRendering();if(b&&b!==this._oEditorCard){b.destroy();}}};Q.prototype._createField=function(o){var a=new Q.Fields[o.type]({configuration:o,mode:this.getMode(),host:this._oEditorCard.getHostInstance(),objectBindings:{currentSettings:{path:"currentSettings>"+o._settingspath},items:{path:"items>/form/items"}},visible:o.visible});this._aFieldReadyPromise.push(a._readyPromise);var b=this._settingsModel.bindProperty(o._settingspath+"/value");b.attachChange(function(){if(!this._bIgnoreUpdates){o._changed=true;if(o._dependentFields&&o._dependentFields.length>0){this._updateProviderCard(o._dependentFields);}this._updatePreview();}}.bind(this));if(a.isFilterBackend()){var s=this._settingsModel.bindProperty(o._settingspath+"/suggestValue");s.attachChange(function(){var e=f({},o);e._cancel=false;this._addValueListModel(e,a,true);}.bind(this));}this._addValueListModel(o,a);a._cols=o.cols||2;a._oProviderCard=this._oProviderCard;a.setAssociation("_messageStrip",this.getAggregation("_messageStrip"));return a;};Q.prototype._requestData=function(o,a){var b=this._oProviderCard._oDataProviderFactory.create(o.values.data);b.bindObject({path:"items>/form/items"});b.bindObject({path:"currentSettings>"+o._settingspath});var e=b.getData();e.then(function(i){if(o._cancel){o._values=[];this._settingsModel.setProperty(o._settingspath+"/_loading",false);return;}var j=a.getConfiguration();if(o.type==="string[]"){var s=o.values.data.path;if(s&&s!=="/"){if(s.startsWith("/")){s=s.substring(1);}if(s.endsWith("/")){s=s.substring(0,s.length-1);}var m=s.split("/");var z=O.get(m,i);if(Array.isArray(z)){for(var n in z){var X=a.getKeyFromItem(z[n]);if(Array.isArray(j.value)&&j.value.length>0&&y(j.value,X)){z[n].Selected=K.getText("CARDEDITOR_ITEM_SELECTED");}else{z[n].Selected=K.getText("CARDEDITOR_ITEM_UNSELECTED");}}O.set(m,z,i);}}else if(Array.isArray(i)){for(var n in i){var X=a.getKeyFromItem(i[n]);if(Array.isArray(j.value)&&j.value.length>0&&y(j.value,X)){i[n].Selected=K.getText("CARDEDITOR_ITEM_SELECTED");}else{i[n].Selected=K.getText("CARDEDITOR_ITEM_UNSELECTED");}}}}o._values=i;var Y=a.getModel();Y.setData(i);Y.checkUpdate(true);Y.firePropertyChange();this._settingsModel.setProperty(o._settingspath+"/_loading",false);a._hideValueState(true,true);}.bind(this)).catch(function(i){this._settingsModel.setProperty(o._settingspath+"/_loading",false);var s=K.getText("CARDEDITOR_BAD_REQUEST");if(Array.isArray(i)&&i.length>0){s=i[0];var j=i[1];if(j){var m;if(j.responseJSON){m=j.responseJSON.error;}else if(j.responseText){if(U.isJson(j.responseText)){m=JSON.parse(j.responseText).error;}else{s=j.responseText;}}if(m){s=(m.code||m.errorCode||j.status)+": "+m.message;}}}else if(typeof(i)==="string"){s=i;}var n=a.getModel();n.firePropertyChange();a._showValueState("error",s,true);}.bind(this));};Q.prototype._addValueListModel=function(o,a,b,n){if(o.values){var e;if(o.values.data){if(this._oProviderCard&&this._oProviderCard._oDataProviderFactory){e=a.getModel();if(!e){e=new J({});a.setModel(e,undefined);}this._settingsModel.setProperty(o._settingspath+"/_loading",true);if(!n){this._requestData(o,a);}else{setTimeout(function(){this._requestData(o,a);}.bind(this),n);}}a.bindObject({path:o.values.data.path||"/"});}else if(this._oProviderCard&&this._oProviderCard.getAggregation("_extension")){e=this._oProviderCard.getAggregation("_extension").getModel();a.bindObject({path:o.values.path||"/"});a.setModel(e,undefined);}if(!b){var s=JSON.stringify(o.values.data);if(s){var j=/parameters\.([^\}\}]+)|destinations\.([^\}\}]+)|\{items\>[\/?\w+]+\}/g,m=s.match(j);if(m){for(var i=0;i<m.length;i++){var z="/value";var X="/sap.card/configuration/";if(m[i].indexOf("destinations.")===0||m[i].indexOf("parameters.")===0){if(m[i].indexOf("destinations.")===0){z="/name";}X=X+m[i].replace(".","/")+z;}else if(m[i].indexOf("{items>")===0){X=X+"parameters/"+m[i].slice(7,-1);}var Y=this._mItemsByPaths[X];if(Y){if(Y._settingspath===o._settingspath){o=f({},o);}Y._dependentFields=Y._dependentFields||[];Y._dependentFields.push({field:a,config:o});}}}}}}};Q.prototype._addItem=function(o){var m=this.getMode();if(this.getAllowDynamicValues()===false||!o.allowDynamicValues){o.allowDynamicValues=false;}if(this.getAllowSettings()===false){o.allowSettings=false;}o._beforeValue=this._beforeManifestModel.getProperty(o.manifestpath);o.__cols=o.cols||2;if(o.visible===false||(!o.translatable&&m==="translation"&&o.type!=="group")){return;}if(o.type==="group"){var a=new P({headerText:o.label,visible:o.visible,expandable:o.expandable!==false,expanded:o.expanded!==false,width:"auto",backgroundDesign:"Transparent",objectBindings:{currentSettings:{path:"currentSettings>"+o._settingspath},items:{path:"items>/form/items"}},expand:function(j){var z=j.getSource();if(!j.mParameters.expand&&z.getParent().getAggregation("_messageStrip")!==null){N=z.getParent().getAggregation("_messageStrip").getId();}if(j.mParameters.expand){var X=c.byId(N);z.addContent(X);z.focus();}}});this.addAggregation("_formContent",a);a._cols=o.cols||2;if(o.hint){this._addHint(o.hint);}return;}if(o.type==="separator"){var s=new S({});this.addAggregation("_formContent",s);return;}var n=null;if(m==="translation"){if((typeof o.value==="string"&&o.value.indexOf("{")===0)||typeof o.values!=="undefined"){return;}o._language={value:o.value};o.cols=1;delete o.values;var b=d(o,10);b._settingspath+="/_language";b.editable=false;b.required=false;if(typeof(b._beforeValue)!=="undefined"&&!(b._beforeValue.startsWith("{i18n>")&&b._beforeValue.endsWith("}"))){b.value=b._beforeValue;}if(!b.value){b.value="-";}var e=this._createLabel(b);this.addAggregation("_formContent",e);var i=this._createField(b);i.isOrigLangField=true;this.addAggregation("_formContent",i);o.value=o._translatedDefaultValue||"";o.editable=o.visible=o.translatable;if(this._currentLayerManifestChanges){o.value=this._currentLayerManifestChanges[o.manifestpath]||o.value;}o.label=o._translatedLabel||"";o.required=false;}else{n=this._createLabel(o);this.addAggregation("_formContent",n);}var i=this._createField(o);i.setAssociation("_messageIcon",n&&n._oMessageIcon);this.addAggregation("_formContent",i);if(o.hint&&o.type==="boolean"&&(!o.cols||o.cols===2)){this._addHint(o.hint);}if(n){n._oMessageIcon.onmouseover=function(i){i._showMessage();}.bind(this,i);n._oMessageIcon.onmouseout=function(i){i._hideMessage();}.bind(this,i);}o.cols=o.__cols;delete o.__cols;};Q.prototype._addHint=function(s){s=s.replace(/<a href/g,"<a target='blank' href");var o=new F({htmlText:s});this.addAggregation("_formContent",o);};Q.prototype._getCurrentLanguageSpecificText=function(s){var a=this._language;if(this._oTranslationBundle){var b=this._oTranslationBundle.getText(s,[],true);if(b===undefined){return"";}return b;}if(!a){return"";}var i=this._oEditorCard.getManifestEntry("/sap.app/i18n");if(!i){return"";}if(typeof i==="string"){var e=[a];if(a.indexOf("_")>-1){e.push(a.substring(0,a.indexOf("_")));}if(!y(e,"en")){e.push("en");}this._oTranslationBundle=r.create({url:this._getBaseUrl()+i,async:false,locale:a,supportedLocales:e,fallbackLocale:"en"});return this._getCurrentLanguageSpecificText(s);}};Q.prototype._getBaseUrl=function(){if(this._oEditorCard&&this._oEditorCard.isReady()){return this._oEditorCard.getBaseUrl()||this.oCardEditor._oEditorCard._oCardManifest.getUrl();}else if(this._oEditorCard){return this._oEditorCard.getBaseUrl();}return"";};Q.prototype._startEditor=function(){var s=this._settingsModel.getProperty("/");var i;if(s.form&&s.form.items){i=s.form.items;var a=this._language||this.getLanguage()||c.getConfiguration().getLanguage().replaceAll('-','_');if(this.getMode()==="translation"){this._addItem({type:"group",translatable:true,expandable:false,label:K.getText("CARDEDITOR_ORIGINALLANG")+": "+Q._languages[a]});}var b=false;for(var m in i){var o=i[m];if(o.type==="group"){break;}else if(o.visible){b=true;break;}}if(b){this._addItem({type:"group",translatable:true,label:K.getText("CARDEDITOR_PARAMETERS_GENERALSETTINGS")});}this._mItemsByPaths={};for(var n in i){var o=i[n];if(o){o.label=o.label||n;var e;if(o.manifestpath){this._mItemsByPaths[o.manifestpath]=o;e=this._currentLayerManifestChanges[o.manifestpath];}o._changed=e!==undefined;if(o.values){o.translatable=false;}if(o.type==="string"){o._translatedDefaultPlaceholder=this._getManifestDefaultValue(o.manifestpath);var j=null,z=o._translatedDefaultPlaceholder;if(z){if(this._isValueWithHandlebarsTranslation(z)){j=z.substring(2,z.length-2);}else if(z.startsWith("{i18n>")){j=z.substring(6,z.length-1);}if(j){o.translatable=true;o._translatedDefaultValue=this.getModel("i18n").getResourceBundle().getText(j);if(o._changed){o.value=e;}else{o.value=o._translatedDefaultValue;}if(o.valueTranslations&&o.valueTranslations[a]){o.value=o.valueTranslations[a];}if(this.getMode()==="translation"){o._translatedDefaultValue=this._getCurrentLanguageSpecificText(j);}}else if(o.translatable&&this.getMode()==="translation"){o._translatedDefaultValue=o._translatedDefaultPlaceholder;}}if(this.getMode()==="translation"){if(o.valueTranslations&&o.valueTranslations[a]){o._translatedDefaultValue=o.valueTranslations[a];}if(this._isValueWithHandlebarsTranslation(o.label)){o._translatedLabel=this._getCurrentLanguageSpecificText(o.label.substring(2,o.label.length-2),true);}else if(o.label&&o.label.startsWith("{i18n>")){o._translatedLabel=this._getCurrentLanguageSpecificText(o.label.substring(6,o.label.length-1),true);}}}else if(o.type==="string[]"){var X=o.manifestpath.substring(0,o.manifestpath.lastIndexOf("/"))+"/valueItems";var Y=this._manifestModel.getProperty(X);if(Y){o.valueItems=Y;}}}}}for(var n in i){var o=i[n];this._addItem(o);}if(this.getMode()!=="translation"){this._initPreview().then(function(){Promise.all(this._aFieldReadyPromise).then(function(){this._ready=true;this.fireReady();}.bind(this));}.bind(this));}else{Promise.all(this._aFieldReadyPromise).then(function(){this._ready=true;this.fireReady();}.bind(this));}};Q.prototype.destroy=function(){if(this._oEditorCard){this._oEditorCard.destroy();}if(this._oPopover){this._oPopover.destroy();}if(this._oDesigntimeInstance){this._oDesigntimeInstance.destroy();}var o=this.getAggregation("_preview");if(o){o.destroy();}var m=c.byId(N);if(m){m.destroy();}this._manifestModel=null;this._originalManifestModel=null;this._settingsModel=null;C.prototype.destroy.apply(this,arguments);};Q.prototype._initPreview=function(){return new Promise(function(a,b){sap.ui.require(["sap/ui/integration/designtime/editor/CardPreview"],function(e){var o=new e({settings:this._oDesigntimeInstance.getSettings(),card:this._oEditorCard});this.setAggregation("_preview",o);a();}.bind(this));}.bind(this));};Q.prototype._updatePreview=function(){var o=this.getAggregation("_preview");if(o){o.update();}};Q.prototype._applyDesigntimeDefaults=function(s){s=s||{};s.form=s.form||{};s.form.items=s.form.items||{};s.preview=s.preview||{modes:"Abstract"};var i=s.form.items||s.form.items;for(var n in i){var o=i[n];if(o.manifestpath){o.value=this._manifestModel.getProperty(o.manifestpath);}if(o.visible===undefined||o.visible===null){o.visible=true;}if(o.editable===undefined||o.editable===null){o.editable=true;}if(this.getMode()!=="admin"){if(o.visibleToUser!==undefined){o.visible=o.visibleToUser;}if(o.editableToUser!==undefined){o.editable=o.editableToUser;}}if(typeof o.translatable!=="boolean"){o.translatable=false;}if(!o.label){o.label=n;}if(!o.type||o.type==="enum"){o.type="string";}if(o.value===undefined||o.value===null){switch(o.type){case"boolean":o.value=false;break;case"integer":case"number":o.value=0;break;case"string[]":o.value=[];break;default:o.value="";}}if(o.type==="group"){if(o.visible===undefined||o.value===null){o.visible=true;}}o._settingspath="/form/items/"+n;}};Q.prototype._applyDesigntimeLayers=function(s){if(this._appliedLayerManifestChanges&&Array.isArray(this._appliedLayerManifestChanges)){for(var i=0;i<this._appliedLayerManifestChanges.length;i++){var o=this._appliedLayerManifestChanges[i][":designtime"];if(o){var a=Object.keys(o);for(var j=0;j<a.length;j++){this._settingsModel.setProperty(a[j],o[a[j]]);}}}}if(this._currentLayerManifestChanges){var o=this._currentLayerManifestChanges[":designtime"];if(o){var a=Object.keys(o);for(var j=0;j<a.length;j++){var b=a[j],n=b.substring(0,b.lastIndexOf("/")+1)+"_next";if(!this._settingsModel.getProperty(n)){this._settingsModel.setProperty(n,{});}var n=b.substring(0,b.lastIndexOf("/")+1)+"_next",e=b.substring(b.lastIndexOf("/")+1);this._settingsModel.setProperty(n+"/"+e,o[a[j]]);}}}};Q.prototype._createParameterDesigntime=function(o){var s={},b="/sap.card/configuration/parameters/",m=this.getMode();if(o&&o.parameters){s.form=s.form||{};s.form.items=s.form.items||{};var i=s.form.items;Object.keys(o.parameters).forEach(function(n){i[n]=f({manifestpath:b+n+"/value",editable:(m!=="translation"),_settingspath:"/form/items/"+n},o.parameters[n]);var a=i[n];if(!a.type){a.type="string";}if(!a.hasOwnProperty("visible")){a.visible=true;}});}return new D(s);};Q.prototype._addDestinationSettings=function(o){var s=this._oDesigntimeInstance.getSettings(),i="/sap.card/configuration/destinations/";s.form=s.form||{};s.form.items=s.form.items||{};if(s&&o&&o.destinations){if(!s.form.items["destination.group"]){s.form.items["destination.group"]={label:K.getText("CARDEDITOR_DESTINATIONS")||"Destinations",type:"group",visible:true};}var j=s.form.items,m=this._oEditorCard.getHostInstance();Object.keys(o.destinations).forEach(function(n){j[n+".destinaton"]=f({manifestpath:i+n+"/name",visible:true,type:"destination",editable:true,allowDynamicValues:false,allowSettings:false,value:o.destinations[n].name,defaultValue:o.destinations[n].defaultUrl,_settingspath:"/form/items/"+[n+".destinaton"],_values:[],_destinationName:n},o.destinations[n]);if(typeof j[n+".destinaton"].label==="undefined"){j[n+".destinaton"].label=n;}if(m){j[n+".destinaton"]._loading=true;}});var z=false;if(m){this._oEditorCard.getHostInstance().getDestinations().then(function(a){z=true;Object.keys(o.destinations).forEach(function(n){j[n+".destinaton"]._values=a;j[n+".destinaton"]._loading=false;this._settingsModel.checkUpdate(true);}.bind(this));}.bind(this)).catch(function(){return this._oEditorCard.getHostInstance().getDestinations();}.bind(this)).then(function(b){if(z){return;}Object.keys(o.destinations).forEach(function(n){j[n+".destinaton"]._values=b;j[n+".destinaton"]._loading=false;this._settingsModel.checkUpdate(true);}.bind(this));}.bind(this)).catch(function(e){Object.keys(o.destinations).forEach(function(n){j[n+".destinaton"]._loading=false;this._settingsModel.checkUpdate(true);}.bind(this));p.error("Can not get destinations list from '"+m.getId()+"'.");}.bind(this));}}};Q.prototype._getManifestDefaultValue=function(s){return this._originalManifestModel.getProperty(s);};Q.prototype._isValueWithHandlebarsTranslation=function(a){if(typeof a==="string"){return!!a.match(E);}return false;};Q._contextEntries={empty:{label:K.getText("CARDEDITOR_CONTEXT_EMPTY_VAL"),type:"string",description:K.getText("CARDEDITOR_CONTEXT_EMPTY_DESC"),placeholder:"",value:""},"card.internal":{label:K.getText("CARDEDITOR_CONTEXT_CARD_INTERNAL_VAL"),todayIso:{type:"string",label:K.getText("CARDEDITOR_CONTEXT_CARD_TODAY_VAL"),description:K.getText("CARDEDITOR_CONTEXT_CARD_TODAY_DESC"),tags:[],placeholder:K.getText("CARDEDITOR_CONTEXT_CARD_TODAY_VAL"),customize:["format.dataTime"],value:"{{parameters.TODAY_ISO}}"},nowIso:{type:"string",label:K.getText("CARDEDITOR_CONTEXT_CARD_NOW_VAL"),description:K.getText("CARDEDITOR_CONTEXT_CARD_NOW_DESC"),tags:[],placeholder:K.getText("CARDEDITOR_CONTEXT_CARD_NOW_VAL"),customize:["dateFormatters"],value:"{{parameters.NOW_ISO}}"},currentLanguage:{type:"string",label:K.getText("CARDEDITOR_CONTEXT_CARD_LANG_VAL"),description:K.getText("CARDEDITOR_CONTEXT_CARD_LANG_VAL"),tags:["technical"],customize:["languageFormatters"],placeholder:K.getText("CARDEDITOR_CONTEXT_CARD_LANG_VAL"),value:"{{parameters.LOCALE}}"}}};Q._languages={};Q._appendThemeVars=function(){var o=document.getElementById("sap-ui-integration-editor-style");if(o&&o.parentNode){o.parentNode.removeChild(o);}var a=["sapUiButtonHoverBackground","sapUiBaseBG","sapUiContentLabelColor","sapUiTileSeparatorColor","sapUiHighlight","sapUiListSelectionBackgroundColor","sapUiNegativeText","sapUiCriticalText","sapUiPositiveText","sapUiChartScrollbarBorderColor"];var m=x.get({name:a,callback:function(_){}});if(m){var b=[],s=document.createElement("style");s.setAttribute("id","sap-ui-integration-editor-style");for(var n in m){b.push("--"+n+":"+m[n]);}s.innerHTML=".sapUiIntegrationCardEditor, .sapUiIntegrationFieldSettings, .sapUiIntegrationIconSelectList {"+b.join(";")+"}";document.body.appendChild(s);}};Q.init=function(){this.init=function(){};Q._appendThemeVars();c.attachThemeChanged(function(){Q._appendThemeVars();});var s=sap.ui.require.toUrl("sap.ui.integration.designtime.editor.css.CardEditor".replace(/\./g,"/")+".css");v(s);w.loadResource("sap/ui/integration/designtime/editor/languages.json",{dataType:"json",failOnError:false,async:true}).then(function(o){Q._languages=o;});};Q.init();return Q;});