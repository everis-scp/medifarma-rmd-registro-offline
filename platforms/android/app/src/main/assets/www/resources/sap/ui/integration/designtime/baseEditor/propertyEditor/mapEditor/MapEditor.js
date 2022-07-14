/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/base/util/deepClone","sap/base/util/deepEqual","sap/ui/model/json/JSONModel","sap/base/util/restricted/_merge","sap/base/util/restricted/_omit","sap/base/util/isPlainObject","sap/base/util/includes"],function(B,d,c,J,_,e,i,f){"use strict";var S={"string":"BASE_EDITOR.MAP.TYPES.STRING","boolean":"BASE_EDITOR.MAP.TYPES.BOOLEAN","number":"BASE_EDITOR.MAP.TYPES.NUMBER","integer":"BASE_EDITOR.MAP.TYPES.INTEGER","date":"BASE_EDITOR.MAP.TYPES.DATE","datetime":"BASE_EDITOR.MAP.TYPES.DATETIME","icon":"BASE_EDITOR.MAP.TYPES.ICON","simpleicon":"BASE_EDITOR.MAP.TYPES.SIMPLEICON","group":"BASE_EDITOR.MAP.TYPES.GROUP","separator":"BASE_EDITOR.MAP.TYPES.SEPARATOR","array":"BASE_EDITOR.MAP.TYPES.ARRAY"};var M=B.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.mapEditor.MapEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.mapEditor.MapEditor",metadata:{library:"sap.ui.integration"},init:function(){B.prototype.init.apply(this,arguments);this._itemsModel=new J();this._itemsModel.setDefaultBindingMode("OneWay");this.setModel(this._itemsModel,"itemsModel");this._supportedTypesModel=new J();this._supportedTypesModel.setDefaultBindingMode("OneWay");this.setModel(this._supportedTypesModel,"supportedTypes");this.attachModelContextChange(function(){if(this.getModel("i18n")){var r=this.getModel("i18n").getResourceBundle();this._aSupportedTypes=Object.keys(S).map(function(k){return{key:k,label:r.getText(S[k])};});this._setSupportedTypesModel();}},this);this.attachConfigChange(this._setSupportedTypesModel,this);this._mTypes={};},setValue:function(v){v=i(v)?v:{};var p=this._getPositions(v);this.setDesigntimeMetadata(_({},this.getDesigntimeMetadata(),Object.keys(p).reduce(function(n,k){n[k]={__value:{position:p[k]}};return n;},{})));B.prototype.setValue.call(this,v);var I=this._processValue(v);I=I.sort(function(V,o){return p[V.key]-p[o.key];}).map(function(o,a){o.index=a;o.total=I.length;return o;});this._itemsModel.setData(I);},_processValue:function(v){return Object.keys(v).map(function(k){var F=this._prepareInputValue(v[k],k);this._mTypes[k]=F.type;var I={key:k,value:F,designtime:this.getNestedDesigntimeMetadata(k)};return this.getConfig().includeInvalidEntries||this._isValidItem(I,d(v[k]))?I:undefined;},this).filter(Boolean);},_getPositions:function(v){var k=Object.keys(v);var E=k.map(function(K){var a=this.getNestedDesigntimeMetadataValue(K).position;return a>=0?a:-1;}.bind(this));var n=E.reduce(function(a,b){return Math.max(a,b);},-1);var p={};E.forEach(function(a,b){p[k[b]]=a>=0?a:++n;});return p;},_prepareInputValue:function(v,k){var F=this.processInputValue(d(v),k);if(!F.type){F.type=this._mTypes[k]||this._getDesigntimeMetadataValue(k).type||this._getDefaultType(F.value);}return F;},_getDesigntimeMetadataValue:function(k){var D=(this.getConfig()||{}).designtime||{};var o=D[k]||{};return o.__value||{};},_isValidItem:function(I){var t=I.value.type;return t&&f(this._getAllowedTypes(),t);},_getDefaultType:function(v){var a=this._getAllowedTypes();var t=typeof v;var C=f(a,t)?t:undefined;if(!C&&f(a,"string")){C="string";}return C;},_getAllowedTypes:function(){return(this.getConfig()||M.configMetadata).allowedTypes;},_setSupportedTypesModel:function(){var a=this._getAllowedTypes();this._supportedTypesModel.setData(this._aSupportedTypes.filter(function(s){return f(a,s.key);}));},formatItemConfig:function(C){var k=C.key;var t=C.value.type;var v=C.value.value;if(t==="boolean"){v=C.value.value!==false;}var D=(C.designtime||{}).__value;var o=this.getConfig();return[{label:this.getI18nProperty("BASE_EDITOR.MAP.KEY"),path:"key",value:k,type:"string",enabled:o.allowKeyChange,itemKey:k,allowBindings:false,validators:[{type:"isUniqueKey",config:{keys:function(){return Object.keys(this.getValue());}.bind(this),currentKey:function(p){return p.getValue();}}}]},{label:this.getI18nProperty("BASE_EDITOR.MAP.TYPE"),path:"type",value:t,type:"select",items:this._getAllowedTypes().map(function(k){return{key:k,title:this.getI18nProperty(S[k])};}.bind(this)),visible:o.allowTypeChange,itemKey:k,allowBindings:false},{label:this.getI18nProperty("BASE_EDITOR.MAP.VALUE"),path:"value",value:v,type:t&&f(this._getAllowedTypes(),t)?t:this._getDefaultType(v),visible:t!=="group"&&t!=="separator",itemKey:k,designtime:(D||{}).value}];},getExpectedWrapperCount:function(v){return this._processValue(v).length;},processInputValue:function(v){return{value:v};},processOutputValue:function(v){return v.value;},_onRemoveElement:function(E){var k=E.getSource().getBindingContext("itemsModel").getObject().key;var v=this.getValue();this.setValue(e(v,k));var n=d(this.getDesigntimeMetadata());delete n[k];this.setDesigntimeMetadata(n);},_onAddElement:function(){var p=_({},this.getValue());var k=this._getUniqueKey(p);p[k]=this.processOutputValue(this._getItemTemplate());this.setValue(p);},_moveUp:function(E){var I=E.getSource().data("index");if(I>0){var v=this._itemsModel.getData();this._swapPositions(v[I].key,v[I-1].key);}},_moveDown:function(E){var I=E.getSource().data("index");var v=this._itemsModel.getData();if(I<v.length-1){this._swapPositions(v[I].key,v[I+1].key);}},_swapPositions:function(k,K){var n={};n[k]={__value:{position:this.getNestedDesigntimeMetadataValue(K).position}};n[K]={__value:{position:this.getNestedDesigntimeMetadataValue(k).position}};this.setDesigntimeMetadata(_({},this.getDesigntimeMetadata(),n));this.setValue(this.getValue());},_getItemTemplate:function(){return{value:"",type:"string"};},_isNewItem:function(I){return c(I.value,this._prepareInputValue(this.processOutputValue(this._getItemTemplate())));},_getUniqueKey:function(p){var k="key";var I=0;while(p.hasOwnProperty(k)){k="key"+ ++I;}return k;},_propertyEditorsChange:function(E){var p=E.getParameter("previousPropertyEditors");var P=E.getParameter("propertyEditors");if(Array.isArray(p)){p.forEach(function(o){o.detachValueChange(this._onItemChange,this);o.detachDesigntimeMetadataChange(this._onDesigntimeValueChange,this);},this);}if(Array.isArray(P)){P.forEach(function(o){o.attachValueChange(this._onItemChange,this);o.attachDesigntimeMetadataChange(this._onDesigntimeValueChange,this);},this);}},_onItemChange:function(E){var k=E.getSource().getConfig().itemKey;var C=E.getParameter("path");var h=this.getItemChangeHandlers()[C];if(typeof h!=='function'){h=this._onFieldChange;}h.call(this,k,E);},_onDesigntimeValueChange:function(E){var k=E.getSource().getConfig().itemKey;var C=E.getParameter("path");if(C!=="value"){return;}this._onDesigntimeChange(k,E);},_onDesigntimeChange:function(k,E){var D=_({},this.getConfig().designtime);var n={__value:{}};n.__value[E.getParameter("path")]=E.getParameter("value");D[k]=_({},D[k],n);this.setDesigntimeMetadata(D);this.setValue(this.getValue());},getItemChangeHandlers:function(){return{"key":this._onKeyChange,"type":this._onTypeChange};},_onKeyChange:function(o,E){if(E.getParameter("previousValue")===undefined){return;}var a=_({},this.getValue());var n=E.getParameter("value");if(n!==o){var N={};Object.keys(a).forEach(function(I){var s=I===o?n:I;N[s]=a[I];});if(N[n]&&N[n].type!=="group"&&N[n].type!=="separator"&&N[n].manifestpath&&N[n].manifestpath.startsWith("/sap.card/configuration/parameters/")){N[n].manifestpath="/sap.card/configuration/parameters/"+n+"/value";}this._mTypes[n]=this._mTypes[o];delete this._mTypes[o];this.setValue(N);var D=_({},this.getConfig().designtime);if(D.hasOwnProperty(o)){D[n]=D[o];if(D[n].__value&&D[n].__value.type&&D[n].__value.type!=="group"&&D[n].__value.type!=="separator"&&D[n].__value.manifestpath){D[n].__value.manifestpath=D[n].__value.manifestpath.replace(o,n);}delete D[o];this.setDesigntimeMetadata(D);}}},_onTypeChange:function(k,E){if(E.getParameter("previousValue")===undefined){return;}var o=_({},this.getValue());var n=E.getParameter("value");var O=E.getParameter("previousValue");if(n!==O){var I=this.processInputValue(o[k]);I.type=n;o[k]=this.processOutputValue(I);if(n==="simpleicon"){o[k].visualization={"type":"IconSelect","settings":{"value":"{currentSettings>value}","editable":"{currentSettings>editable}"}};}else{delete o[k].visualization;}if(n!=="array"&&n!=="string"){delete o[k].values;}this._mTypes[k]=n;this.setValue(o);var D=_({},this.getConfig().designtime);if(D.hasOwnProperty(k)){if(n==="simpleicon"){D[k].__value.visualization={"type":"IconSelect","settings":{"value":"{currentSettings>value}","editable":"{currentSettings>editable}"}};}else{delete D[k].__value.visualization;}if(n!=="array"&&n!=="string"){delete D[k].__value.values;}D[k].__value.type=n;this.setDesigntimeMetadata(D);}}},_onFieldChange:function(k,E){var o=_({},this.getValue());var p=E.getParameter("path");var v=E.getParameter("value");var I=this.processInputValue(o[k]);I[p]=v;o[k]=this.processOutputValue(I);this.setValue(o);},renderer:B.getMetadata().getRenderer().render});M.configMetadata=Object.assign({},B.configMetadata,{allowKeyChange:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowTypeChange:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowAddAndRemove:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowedTypes:{defaultValue:["string"],mergeStrategy:"intersection"},allowSorting:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},includeInvalidEntries:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"}});return M;});
