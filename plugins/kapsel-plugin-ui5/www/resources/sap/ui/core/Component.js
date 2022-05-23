/*
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./Manifest','./ComponentMetadata','./Element','sap/base/util/merge','sap/ui/base/ManagedObject','sap/ui/base/ManagedObjectRegistry','sap/ui/thirdparty/URI','sap/ui/performance/trace/Interaction','sap/base/assert','sap/base/Log','sap/base/util/ObjectPath','sap/base/util/UriParameters','sap/base/util/isPlainObject','sap/base/util/LoaderExtensions','sap/ui/VersionInfo'],function(q,M,C,E,a,b,c,U,I,d,L,O,f,g,h,V){"use strict";var j={JSON:"JSON",XML:"XML",HTML:"HTML",JS:"JS",Template:"Template"};var S={lazy:"lazy",eager:"eager",waitFor:"waitFor"};function k(e){['sap-client','sap-server'].forEach(function(N){if(!e.hasSearch(N)){var v=sap.ui.getCore().getConfiguration().getSAPParam(N);if(v){e.addSearch(N,v);}}});}function l(D,m,e,i){if(e){for(var N in D){if(!m[N]&&e[N]&&e[N].uri){m[N]=i;}}}}function n(m,e,K,i){var D=e.getEntry(K);if(D!==undefined&&!g(D)){return D;}var P,v;if(i&&(P=m.getParent())instanceof C){v=P.getManifestEntry(K,i);}if(v||D){D=q.extend(true,{},v,D);}return D;}function o(e,i){var v=Object.create(Object.getPrototypeOf(e));v._oMetadata=e;v._oManifest=i;for(var m in e){if(!/^(getManifest|getManifestObject|getManifestEntry|getMetadataVersion)$/.test(m)&&typeof e[m]==="function"){v[m]=e[m].bind(e);}}v.getManifest=function(){return i&&i.getJson();};v.getManifestObject=function(){return i;};v.getManifestEntry=function(K,A){return n(e,i,K,A);};v.getMetadataVersion=function(){return 2;};return v;}function r(e,i,T){d(typeof e==="function","fn must be a function");var m=b._sOwnerId;try{b._sOwnerId=i;return e.call(T);}finally{b._sOwnerId=m;}}var p=b.extend("sap.ui.core.Component",{constructor:function(i,m){var e=Array.prototype.slice.call(arguments);if(typeof i!=="string"){m=i;i=undefined;}if(m&&typeof m._metadataProxy==="object"){this._oMetadataProxy=m._metadataProxy;this._oManifest=m._metadataProxy._oManifest;delete m._metadataProxy;this.getMetadata=function(){return this._oMetadataProxy;};}if(m&&typeof m._cacheTokens==="object"){this._mCacheTokens=m._cacheTokens;delete m._cacheTokens;}if(m&&typeof m._manifestModels==="object"){this._mManifestModels=m._manifestModels;delete m._manifestModels;}else{this._mManifestModels={};}this._mServices={};b.apply(this,e);},metadata:{stereotype:"component","abstract":true,specialSettings:{componentData:'any'},version:"0.0",includes:[],dependencies:{libs:[],components:[],ui5version:""},config:{},customizing:{},library:"sap.ui.core"}},C);c.apply(p,{onDeregister:function(e){E.registry.forEach(function(i){if(i._sapui_candidateForDestroy&&i._sOwnerId===e&&!i.getParent()){L.debug("destroying dangling template "+i+" when destroying the owner component");i.destroy();}});}});p.prototype.getManifest=function(){if(!this._oManifest){return this.getMetadata().getManifest();}else{return this._oManifest.getJson();}};p.prototype.getManifestEntry=function(K){return this._getManifestEntry(K);};p.prototype._getManifestEntry=function(K,m){if(!this._oManifest){return this.getMetadata().getManifestEntry(K,m);}else{return n(this.getMetadata(),this._oManifest,K,m);}};p.prototype.getManifestObject=function(){if(!this._oManifest){return this.getMetadata().getManifestObject();}else{return this._oManifest;}};p.prototype._isVariant=function(){if(this._oManifest){var e=this.getManifestEntry("/sap.ui5/componentName");return e&&e!==this.getManifestEntry("/sap.app/id");}else{return false;}};p.activateCustomizing=function(e){};p.deactivateCustomizing=function(e){};p.getOwnerIdFor=function(e){d(e instanceof b,"oObject must be given and must be a ManagedObject");var i=(e instanceof b)&&e._sOwnerId;return i||undefined;};p.getOwnerComponentFor=function(e){return p.get(p.getOwnerIdFor(e));};p.prototype.runAsOwner=function(e){return r(e,this.getId());};p.prototype.getInterface=function(){return this;};p.prototype._initCompositeSupport=function(m){this.oComponentData=m&&m.componentData;if(!this._isVariant()){this.getMetadata().init();}else{this._oManifest.init(this);var A=this._oManifest.getEntry("/sap.app/id");if(A){w(A,this._oManifest.resolveUri("./","manifest"));}}this.initComponentModels();if(this.onWindowError){this._fnWindowErrorHandler=q.proxy(function(e){var i=e.originalEvent;this.onWindowError(i.message,i.filename,i.lineno);},this);q(window).bind("error",this._fnWindowErrorHandler);}if(this.onWindowBeforeUnload){this._fnWindowBeforeUnloadHandler=q.proxy(this.onWindowBeforeUnload,this);q(window).bind("beforeunload",this._fnWindowBeforeUnloadHandler);}if(this.onWindowUnload){this._fnWindowUnloadHandler=q.proxy(this.onWindowUnload,this);q(window).bind("unload",this._fnWindowUnloadHandler);}};p.prototype.destroy=function(){for(var e in this._mServices){if(this._mServices[e].instance){this._mServices[e].instance.destroy();}}delete this._mServices;for(var m in this._mManifestModels){this._mManifestModels[m].destroy();}delete this._mManifestModels;if(this._fnWindowErrorHandler){q(window).unbind("error",this._fnWindowErrorHandler);delete this._fnWindowErrorHandler;}if(this._fnWindowBeforeUnloadHandler){q(window).unbind("beforeunload",this._fnWindowBeforeUnloadHandler);delete this._fnWindowBeforeUnloadHandler;}if(this._fnWindowUnloadHandler){q(window).unbind("unload",this._fnWindowUnloadHandler);delete this._fnWindowUnloadHandler;}if(this._oEventBus){this._oEventBus.destroy();delete this._oEventBus;}b.prototype.destroy.apply(this,arguments);sap.ui.getCore().getMessageManager().unregisterObject(this);if(!this._isVariant()){this.getMetadata().exit();}else{this._oManifest.exit(this);delete this._oManifest;}};p.prototype.getComponentData=function(){return this.oComponentData;};p.prototype.getEventBus=function(){if(!this._oEventBus){var e=this.getMetadata().getName();L.warning("Synchronous loading of EventBus, due to #getEventBus() call on Component '"+e+"'.","SyncXHR",null,function(){return{type:"SyncXHR",name:e};});var i=sap.ui.requireSync("sap/ui/core/EventBus");this._oEventBus=new i();}return this._oEventBus;};p.prototype.initComponentModels=function(){var m=this.getMetadata();if(m.isBaseClass()){return;}var e=this._getManifestEntry("/sap.app/dataSources",true)||{};var i=this._getManifestEntry("/sap.ui5/models",true)||{};this._initComponentModels(i,e,this._mCacheTokens);};p.prototype._initComponentModels=function(m,D,e){var A=p._createManifestModelConfigurations({models:m,dataSources:D,component:this,mergeParent:true,cacheTokens:e});if(!A){return;}var i={};for(var v in A){if(!this._mManifestModels[v]){i[v]=A[v];}}var B=p._createManifestModels(i,this.toString());for(var v in B){this._mManifestModels[v]=B[v];}for(var v in this._mManifestModels){var F=this._mManifestModels[v];this.setModel(F,v||undefined);}};p.prototype.getService=function(e){if(!this._mServices[e]){this._mServices[e]={};this._mServices[e].promise=new Promise(function(R,i){sap.ui.require(["sap/ui/core/service/ServiceFactoryRegistry"],function(m){var v=this._getManifestEntry("/sap.ui5/services/"+e,true);var A=v&&v.factoryName;if(!A){i(new Error("Service "+e+" not declared!"));return;}var B=m.get(A);if(B){B.createInstance({scopeObject:this,scopeType:"component",settings:v.settings||{}}).then(function(G){if(!this.bIsDestroyed){this._mServices[e].instance=G;this._mServices[e].interface=G.getInterface();R(this._mServices[e].interface);}else{i(new Error("Service "+e+" could not be loaded as its Component was destroyed."));}}.bind(this)).catch(i);}else{var D="The ServiceFactory "+A+" for Service "+e+" not found in ServiceFactoryRegistry!";var F=this._getManifestEntry("/sap.ui5/services/"+e+"/optional",true);if(!F){L.error(D);}i(new Error(D));}}.bind(this),i);}.bind(this));}return this._mServices[e].promise;};function s(e,A){var i=e._getManifestEntry("/sap.ui5/services",true);var m=A?[]:null;if(!i){return m;}var v=Object.keys(i);if(!A&&v.some(function(B){return i[B].startup===S.waitFor;})){throw new Error("The specified component \""+e.getMetadata().getName()+"\" cannot be loaded in sync mode since it has some services declared with \"startup\" set to \"waitFor\"");}return v.reduce(function(P,B){if(i[B].lazy===false||i[B].startup===S.waitFor||i[B].startup===S.eager){var D=e.getService(B);if(i[B].startup===S.waitFor){P.push(D);}}return P;},m);}p.prototype.createComponent=function(v){d((typeof v==='string'&&v)||(typeof v==='object'&&typeof v.usage==='string'&&v.usage),"vUsage either must be a non-empty string or an object with a non-empty usage id");var m={async:true};if(v){var e;if(typeof v==="object"){e=v.usage;["id","async","settings","componentData"].forEach(function(N){if(v[N]!==undefined){m[N]=v[N];}});}else if(typeof v==="string"){e=v;}m=this._enhanceWithUsageConfig(e,m);}return p._createComponent(m,this);};p.prototype._enhanceWithUsageConfig=function(e,m){var i=this.getManifestEntry("/sap.ui5/componentUsages/"+e);if(!i){throw new Error("Component usage \""+e+"\" not declared in Component \""+this.getManifestObject().getComponentName()+"\"!");}return q.extend(true,i,m);};p._createComponent=function(m,e){function i(){if(m.async===true){return p.create(m);}else{return sap.ui.component(m);}}if(e){return e.runAsOwner(i);}else{return i();}};p._createManifestModelConfigurations=function(m){var e=m.component;var v=m.manifest||e.getManifestObject();var A=m.mergeParent;var B=m.cacheTokens||{};var D=e?e.toString():v.getComponentName();var F=sap.ui.getCore().getConfiguration();if(!m.models){return null;}var G={models:m.models,dataSources:m.dataSources||{},origin:{dataSources:{},models:{}}};if(e&&A){var H=e.getMetadata();while(H instanceof C){var J=H.getManifestObject();var K=H.getManifestEntry("/sap.app/dataSources");l(G.dataSources,G.origin.dataSources,K,J);var N=H.getManifestEntry("/sap.ui5/models");l(G.models,G.origin.models,N,J);H=H.getParent();}}var P={};for(var Q in G.models){var R=G.models[Q];var T=false;var W=null;if(typeof R==='string'){R={dataSource:R};}if(R.dataSource){var X=G.dataSources&&G.dataSources[R.dataSource];if(typeof X==='object'){if(X.type===undefined){X.type='OData';}var Y;if(!R.type){switch(X.type){case'OData':Y=X.settings&&X.settings.odataVersion;if(Y==="4.0"){R.type='sap.ui.model.odata.v4.ODataModel';}else if(!Y||Y==="2.0"){R.type='sap.ui.model.odata.v2.ODataModel';}else{L.error('Component Manifest: Provided OData version "'+Y+'" in '+'dataSource "'+R.dataSource+'" for model "'+Q+'" is unknown. '+'Falling back to default model type "sap.ui.model.odata.v2.ODataModel".','["sap.app"]["dataSources"]["'+R.dataSource+'"]',D);R.type='sap.ui.model.odata.v2.ODataModel';}break;case'JSON':R.type='sap.ui.model.json.JSONModel';break;case'XML':R.type='sap.ui.model.xml.XMLModel';break;default:}}if(R.type==='sap.ui.model.odata.v4.ODataModel'&&X.settings&&X.settings.odataVersion){R.settings=R.settings||{};R.settings.odataVersion=X.settings.odataVersion;}if(!R.uri){R.uri=X.uri;T=true;}if(X.type==='OData'&&X.settings&&typeof X.settings.maxAge==="number"){R.settings=R.settings||{};R.settings.headers=R.settings.headers||{};R.settings.headers["Cache-Control"]="max-age="+X.settings.maxAge;}if(X.type==='OData'&&X.settings&&X.settings.annotations){var Z=X.settings.annotations;for(var i=0;i<Z.length;i++){var $=G.dataSources[Z[i]];if(!$){L.error("Component Manifest: ODataAnnotation \""+Z[i]+"\" for dataSource \""+R.dataSource+"\" could not be found in manifest","[\"sap.app\"][\"dataSources\"][\""+Z[i]+"\"]",D);continue;}if($.type!=='ODataAnnotation'){L.error("Component Manifest: dataSource \""+Z[i]+"\" was expected to have type \"ODataAnnotation\" but was \""+$.type+"\"","[\"sap.app\"][\"dataSources\"][\""+Z[i]+"\"]",D);continue;}if(!$.uri){L.error("Component Manifest: Missing \"uri\" for ODataAnnotation \""+Z[i]+"\"","[\"sap.app\"][\"dataSources\"][\""+Z[i]+"\"]",D);continue;}var _=new U($.uri);if(R.type==='sap.ui.model.odata.v2.ODataModel'){["sap-language","sap-client"].forEach(function(n1){if(!_.hasQuery(n1)&&F.getSAPParam(n1)){_.setQuery(n1,F.getSAPParam(n1));}});var a1=B.dataSources&&B.dataSources[$.uri];if(a1){var b1=function(){if(!_.hasQuery("sap-language")){L.warning("Component Manifest: Ignoring provided \"sap-context-token="+a1+"\" for ODataAnnotation \""+Z[i]+"\" ("+_.toString()+"). "+"Missing \"sap-language\" URI parameter","[\"sap.app\"][\"dataSources\"][\""+Z[i]+"\"]",D);return;}if(!_.hasQuery("sap-client")){L.warning("Component Manifest: Ignoring provided \"sap-context-token="+a1+"\" for ODataAnnotation \""+Z[i]+"\" ("+_.toString()+"). "+"Missing \"sap-client\" URI parameter","[\"sap.app\"][\"dataSources\"][\""+Z[i]+"\"]",D);return;}if(!_.hasQuery("sap-client",F.getSAPParam("sap-client"))){L.warning("Component Manifest: Ignoring provided \"sap-context-token="+a1+"\" for ODataAnnotation \""+Z[i]+"\" ("+_.toString()+"). "+"URI parameter \"sap-client="+_.query(true)["sap-client"]+"\" must be identical with configuration \"sap-client="+F.getSAPParam("sap-client")+"\"","[\"sap.app\"][\"dataSources\"][\""+Z[i]+"\"]",D);return;}if(_.hasQuery("sap-context-token")&&!_.hasQuery("sap-context-token",a1)){var n1=_.query(true)["sap-context-token"];L.warning("Component Manifest: Overriding existing \"sap-context-token="+n1+"\" with provided value \""+a1+"\" for ODataAnnotation \""+Z[i]+"\" ("+_.toString()+").","[\"sap.app\"][\"dataSources\"][\""+Z[i]+"\"]",D);}_.setQuery("sap-context-token",a1);};b1();}}var c1=G.origin.dataSources[Z[i]]||v;var d1=c1._resolveUri(_).toString();R.settings=R.settings||{};R.settings.annotationURI=R.settings.annotationURI||[];R.settings.annotationURI.push(d1);}}}else{L.error("Component Manifest: dataSource \""+R.dataSource+"\" for model \""+Q+"\" not found or invalid","[\"sap.app\"][\"dataSources\"][\""+R.dataSource+"\"]",D);}}if(!R.type){L.error("Component Manifest: Missing \"type\" for model \""+Q+"\"","[\"sap.ui5\"][\"models\"][\""+Q+"\"]",D);continue;}if(R.type==='sap.ui.model.odata.ODataModel'&&(!R.settings||R.settings.json===undefined)){R.settings=R.settings||{};R.settings.json=true;}if(R.uri){var e1=new U(R.uri);var f1=(T?G.origin.dataSources[R.dataSource]:G.origin.models[Q])||v;e1=f1._resolveUri(e1);if(R.dataSource){k(e1);if(R.type==='sap.ui.model.odata.v2.ODataModel'){W=R.settings&&R.settings.metadataUrlParams;if((!W||typeof W['sap-language']==='undefined')&&!e1.hasQuery('sap-language')&&F.getSAPParam('sap-language')){R.settings=R.settings||{};W=R.settings.metadataUrlParams=R.settings.metadataUrlParams||{};W['sap-language']=F.getSAPParam('sap-language');}if(B.dataSources){var a1=B.dataSources[X.uri];if(a1){var g1=function(){if(e1.hasQuery("sap-context-token")){L.warning("Component Manifest: Ignoring provided \"sap-context-token="+a1+"\" for model \""+Q+"\" ("+e1.toString()+"). "+"Model URI already contains parameter \"sap-context-token="+e1.query(true)["sap-context-token"]+"\"","[\"sap.ui5\"][\"models\"][\""+Q+"\"]",D);return;}if((!W||typeof W["sap-language"]==="undefined")&&!e1.hasQuery("sap-language")){L.warning("Component Manifest: Ignoring provided \"sap-context-token="+a1+"\" for model \""+Q+"\" ("+e1.toString()+"). "+"Missing \"sap-language\" parameter","[\"sap.ui5\"][\"models\"][\""+Q+"\"]",D);return;}if(!e1.hasQuery("sap-client")){L.warning("Component Manifest: Ignoring provided \"sap-context-token="+a1+"\" for model \""+Q+"\" ("+e1.toString()+"). "+"Missing \"sap-client\" parameter","[\"sap.ui5\"][\"models\"][\""+Q+"\"]",D);return;}if(!e1.hasQuery("sap-client",F.getSAPParam("sap-client"))){L.warning("Component Manifest: Ignoring provided \"sap-context-token="+a1+"\" for model \""+Q+"\" ("+e1.toString()+"). "+"URI parameter \"sap-client="+e1.query(true)["sap-client"]+"\" must be identical with configuration \"sap-client="+F.getSAPParam("sap-client")+"\"","[\"sap.ui5\"][\"models\"][\""+Q+"\"]",D);return;}if(W&&typeof W["sap-client"]!=="undefined"){if(W["sap-client"]!==F.getSAPParam("sap-client")){L.warning("Component Manifest: Ignoring provided \"sap-context-token="+a1+"\" for model \""+Q+"\" ("+e1.toString()+"). "+"Parameter metadataUrlParams[\"sap-client\"] = \""+W["sap-client"]+"\" must be identical with configuration \"sap-client="+F.getSAPParam("sap-client")+"\"","[\"sap.ui5\"][\"models\"][\""+Q+"\"]",D);return;}}if(W&&W["sap-context-token"]&&W["sap-context-token"]!==a1){L.warning("Component Manifest: Overriding existing \"sap-context-token="+W["sap-context-token"]+"\" with provided value \""+a1+"\" for model \""+Q+"\" ("+e1.toString()+").","[\"sap.ui5\"][\"models\"][\""+Q+"\"]",D);}if(!W){R.settings=R.settings||{};W=R.settings.metadataUrlParams=R.settings.metadataUrlParams||{};}W["sap-context-token"]=a1;};g1();}}}}R.uri=e1.toString();}if(R.uriSettingName===undefined){switch(R.type){case'sap.ui.model.odata.ODataModel':case'sap.ui.model.odata.v2.ODataModel':case'sap.ui.model.odata.v4.ODataModel':R.uriSettingName='serviceUrl';break;case'sap.ui.model.resource.ResourceModel':R.uriSettingName='bundleUrl';break;default:}}var h1;var i1;if(e){i1=e.getComponentData();}else{i1=m.componentData;}h1=i1&&i1.startupParameters&&i1.startupParameters["sap-system"];if(!h1){h1=F.getSAPParam("sap-system");}var j1=false;var k1;if(h1&&["sap.ui.model.odata.ODataModel","sap.ui.model.odata.v2.ODataModel"].indexOf(R.type)!=-1){j1=true;k1=sap.ui.requireSync("sap/ui/model/odata/ODataUtils");}if(R.uri){if(j1){R.preOriginBaseUri=R.uri.split("?")[0];R.uri=k1.setOrigin(R.uri,{alias:h1});R.postOriginBaseUri=R.uri.split("?")[0];}if(R.uriSettingName!==undefined){R.settings=R.settings||{};if(!R.settings[R.uriSettingName]){R.settings[R.uriSettingName]=R.uri;}}else if(R.settings){R.settings=[R.uri,R.settings];}else{R.settings=[R.uri];}}else{if(j1&&R.uriSettingName!==undefined&&R.settings&&R.settings[R.uriSettingName]){R.preOriginBaseUri=R.settings[R.uriSettingName].split("?")[0];R.settings[R.uriSettingName]=k1.setOrigin(R.settings[R.uriSettingName],{alias:h1});R.postOriginUri=R.settings[R.uriSettingName].split("?")[0];}}if(j1&&R.settings&&R.settings.annotationURI){var l1=[].concat(R.settings.annotationURI);var m1=[];for(var i=0;i<l1.length;i++){m1.push(k1.setAnnotationOrigin(l1[i],{alias:h1,preOriginBaseUri:R.preOriginBaseUri,postOriginBaseUri:R.postOriginBaseUri}));}R.settings.annotationURI=m1;}if(R.type==='sap.ui.model.resource.ResourceModel'&&R.settings&&Array.isArray(R.settings.enhanceWith)){R.settings.enhanceWith.forEach(function(n1){if(n1.bundleUrl){n1.bundleUrl=v.resolveUri(n1.bundleUrl,n1.bundleUrlRelativeTo);}});}if(R.settings&&!Array.isArray(R.settings)){R.settings=[R.settings];}P[Q]=R;}if(v.getEntry("/sap.ui5/commands")){P["$cmd"]={type:'sap.ui.model.json.JSONModel'};}return P;};p._createManifestModels=function(m,e){var i={};for(var v in m){var A=m[v];try{sap.ui.requireSync(A.type.replace(/\./g,"/"));}catch(B){L.error("Component Manifest: Class \""+A.type+"\" for model \""+v+"\" could not be loaded. "+B,"[\"sap.ui5\"][\"models\"][\""+v+"\"]",e);continue;}var D=O.get(A.type);if(!D){L.error("Component Manifest: Class \""+A.type+"\" for model \""+v+"\" could not be found","[\"sap.ui5\"][\"models\"][\""+v+"\"]",e);continue;}var F=[null].concat(A.settings||[]);var G=D.bind.apply(D,F);var H=new G();i[v]=H;}return i;};function t(m,e,i){var v={afterManifest:{},afterPreload:{}};var A=q.extend(true,{},m.getEntry("/sap.app/dataSources"));var B=q.extend(true,{},m.getEntry("/sap.ui5/models"));var D=p._createManifestModelConfigurations({models:B,dataSources:A,manifest:m,componentData:e,cacheTokens:i});var P=f.fromQuery(window.location.search).get("sap-ui-xx-preload-component-models-"+m.getComponentName());var F=P&&P.split(",");for(var G in D){var H=D[G];if(!H.preload&&F&&F.indexOf(G)>-1){H.preload=true;L.warning("FOR TESTING ONLY!!! Activating preload for model \""+G+"\" ("+H.type+")",m.getComponentName(),"sap.ui.core.Component");}if(H.type==="sap.ui.model.resource.ResourceModel"&&Array.isArray(H.settings)&&H.settings.length>0&&H.settings[0].async!==true){v.afterPreload[G]=H;}else if(H.preload){if(sap.ui.loader._.getModuleState(H.type.replace(/\./g,"/")+".js")){v.afterManifest[G]=H;}else{L.warning("Can not preload model \""+G+"\" as required class has not been loaded: \""+H.type+"\"",m.getComponentName(),"sap.ui.core.Component");}}}return v;}function u(e){return sap.ui.require.toUrl(e.replace(/\./g,"/")+"/manifest.json");}function w(m,v){h.registerResourcePath(m.replace(/\./g,"/"),v);}function x(R){var m=[];var e=[];function v(i){if(!i._oManifest){var N=i.getComponentName();var D=u(N);var A=h.loadResource({url:D,dataType:"json",async:true}).catch(function(B){L.error("Failed to load component manifest from \""+D+"\" (component "+N+")! Reason: "+B);return{};});m.push(A);e.push(i);}var P=i.getParent();if(P&&(P instanceof C)&&!P.isBaseClass()){v(P);}}v(R);return Promise.all(m).then(function(A){for(var i=0;i<A.length;i++){if(A[i]){e[i]._applyManifest(A[i]);}}});}p._fnLoadComponentCallback=null;p._fnOnInstanceCreated=null;p._fnPreprocessManifest=null;p.create=function(m){if(m==null||typeof m!=="object"){throw new TypeError("Component.create() must be called with a configuration object.");}var P=a({},m);P.async=true;if(P.manifest===undefined){P.manifest=true;}return y(P);};sap.ui.component=function(v){if(!v){throw new Error("sap.ui.component cannot be called without parameter!");}var e=function(i){return{type:"sap.ui.component",name:i};};if(typeof v==='string'){L.warning("Do not use deprecated function 'sap.ui.component' ("+v+") + for Component instance lookup. "+"Use 'Component.get' instead","sap.ui.component",null,e.bind(null,v));return sap.ui.getCore().getComponent(v);}if(v.async){L.info("Do not use deprecated factory function 'sap.ui.component' ("+v["name"]+"). "+"Use 'Component.create' instead","sap.ui.component",null,e.bind(null,v["name"]));}else{L.warning("Do not use synchronous component creation ("+v["name"]+")! "+"Use the new asynchronous factory 'Component.create' instead","sap.ui.component",null,e.bind(null,v["name"]));}return y(v);};function y(v){if(!v.asyncHints||!v.asyncHints.cacheTokens){var e=p.get(b._sOwnerId);var m=e&&e._mCacheTokens;if(typeof m==="object"){v.asyncHints=v.asyncHints||{};v.asyncHints.cacheTokens=m;}}function i(F,v){if(typeof p._fnOnInstanceCreated==="function"){var P=p._fnOnInstanceCreated(F,v);if(v.async&&P instanceof Promise){return P;}}if(v.async){return Promise.resolve(F);}return F;}function A(F){var N=v.name,G=v.id,H=v.componentData,J=N+'.Component',K=v.settings;var P=new F(q.extend({},K,{id:G,componentData:H,_cacheTokens:v.asyncHints&&v.asyncHints.cacheTokens}));d(P instanceof p,"The specified component \""+J+"\" must be an instance of sap.ui.core.Component!");L.info("Component instance Id = "+P.getId());var Q=P.getMetadata().handleValidation()!==undefined||v.handleValidation;if(Q){if(P.getMetadata().handleValidation()!==undefined){Q=P.getMetadata().handleValidation();}else{Q=v.handleValidation;}sap.ui.getCore().getMessageManager().registerObject(P,Q);}var R=s(P,v.async);if(v.async){return i(P,v).then(function(){return Promise.all(R);}).then(function(){return P;});}else{i(P,v);return P;}}var B=z(v,{failOnError:true,createModels:true,waitFor:v.asyncHints&&v.asyncHints.waitFor});if(v.async){var D=b._sOwnerId;return B.then(function(F){return r(function(){return A(F);},D);});}else{return A(B);}}p.load=function(m){var P=a({},m);P.async=true;if(P.manifest===undefined){P.manifest=true;}return z(P,{preloadOnly:P.asyncHints&&P.asyncHints.preloadOnly});};p.get=function(i){return sap.ui.getCore().getComponent(i);};sap.ui.component.load=function(e,F){L.warning("Do not use deprecated function 'sap.ui.component.load'! Use 'Component.load' instead");return z(e,{failOnError:F,preloadOnly:e.asyncHints&&e.asyncHints.preloadOnly});};function z(m,A){var N=m.name,B=m.url,D=sap.ui.getCore().getConfiguration(),F=/^(sync|async)$/.test(D.getComponentPreload()),G=m.manifest,H,J,K,P,Q,R;function T(e,A){var i=JSON.parse(JSON.stringify(e));if(m.async){return W(i).then(function(v){return new M(v,A);});}else{return new M(i,A);}}function W(e){if(typeof p._fnPreprocessManifest==="function"){try{return p._fnPreprocessManifest(e);}catch(i){L.error("Failed to execute flexibility hook for manifest preprocessing.",i);return Promise.reject(i);}}else{return Promise.resolve(e);}}d(!B||typeof B==='string',"sUrl must be a string or undefined");if(N&&typeof B==='string'){w(N,B);}I.setStepComponent(N);if(G===undefined){H=m.manifestFirst===undefined?D.getManifestFirst():!!m.manifestFirst;J=m.manifestUrl;}else{if(m.async===undefined){m.async=true;}H=!!G;J=G&&typeof G==='string'?G:undefined;K=G&&typeof G==='object'?T(G,{url:m&&m.altManifestUrl}):undefined;}if(!K&&J){K=M.load({manifestUrl:J,componentName:N,processJson:W,async:m.async});}if(K&&!m.async){N=K.getComponentName();if(N&&typeof B==='string'){w(N,B);}}if(!(K&&m.async)){if(!N){throw new Error("The name of the component is undefined.");}d(typeof N==='string',"sName must be a string");}if(H&&!K){K=M.load({manifestUrl:u(N),componentName:N,async:m.async,failOnError:false,processJson:W});}function X(){return(N+".Component").replace(/\./g,"/");}function Y(e){var i=N+'.Component';if(!e){var v="The specified component controller '"+i+"' could not be found!";if(A.failOnError){throw new Error(v);}else{L.warning(v);}}if(K){var $=o(e.getMetadata(),K);var i1=function(){var j1=Array.prototype.slice.call(arguments);var k1;if(j1.length===0||typeof j1[0]==="object"){k1=j1[0]=j1[0]||{};}else if(typeof j1[0]==="string"){k1=j1[1]=j1[1]||{};}k1._metadataProxy=$;if(P){k1._manifestModels=P;}var l1=Object.create(e.prototype);e.apply(l1,j1);return l1;};i1.getMetadata=function(){return $;};i1.extend=function(){throw new Error("Extending Components created by Manifest is not supported!");};return i1;}else{return e;}}function Z(v,i){d((typeof v==='string'&&v)||(typeof v==='object'&&typeof v.name==='string'&&v.name),"reference either must be a non-empty string or an object with a non-empty 'name' and an optional 'url' property");if(typeof v==='object'){if(v.url){w(v.name,v.url);}return(v.lazy&&i!==true)?undefined:v.name;}return v;}function _(i,v){var $=i+'.Component',i1=sap.ui.getCore().getConfiguration().getDepCache(),j1,k1,l1;if(F&&i!=null&&!sap.ui.loader._.getModuleState($.replace(/\./g,"/")+".js")){if(v){k1=V._getTransitiveDependencyForComponent(i);if(k1&&!k1.hasOwnPreload){l1=[k1.library];Array.prototype.push.apply(l1,k1.dependencies);return sap.ui.getCore().loadLibraries(l1,{preloadOnly:true});}else{j1=$.replace(/\./g,"/")+(i1?'-h2-preload.js':'-preload.js');return sap.ui.loader._.loadJSResourceAsync(j1,true);}}try{j1=$+'-preload';sap.ui.requireSync(j1.replace(/\./g,"/"));}catch(e){L.warning("couldn't preload component from "+j1+": "+((e&&e.message)||e));}}else if(v){return Promise.resolve();}}function a1(e,K,i){var v=[];var $=i?function(q1){v.push(q1);}:function(){};K.defineResourceRoots();var i1=K.getEntry("/sap.ui5/dependencies/libs");if(i1){var j1=[];for(var k1 in i1){if(!i1[k1].lazy){j1.push(k1);}}if(j1.length>0){L.info("Component \""+e+"\" is loading libraries: \""+j1.join(", ")+"\"");$(sap.ui.getCore().loadLibraries(j1,{async:i}));}}var l1=K.getEntry("/sap.ui5/extends/component");if(l1){$(_(l1,i));}var m1=[];var n1=K.getEntry("/sap.ui5/dependencies/components");if(n1){for(var e in n1){if(!n1[e].lazy){m1.push(e);}}}var o1=K.getEntry("/sap.ui5/componentUsages");if(o1){for(var p1 in o1){if(o1[p1].lazy===false&&m1.indexOf(o1[p1].name)===-1){m1.push(o1[p1].name);}}}if(m1.length>0){m1.forEach(function(e){$(_(e,i));});}return i?Promise.all(v):undefined;}if(m.async){var b1=m.asyncHints||{},c1=[],d1=function(e){e=e.then(function(v){return{result:v,rejected:false};},function(v){return{result:v,rejected:true};});return e;},e1=function(e){if(e){c1.push(d1(e));}},f1=function($){return $;},g1,h1;if(K&&A.createModels){e1(K.then(function(K){Q=t(K,m.componentData,b1.cacheTokens);return K;}).then(function(K){if(Object.keys(Q.afterManifest).length>0){P=p._createManifestModels(Q.afterManifest,K.getComponentName());}return K;}));}g1=[];if(Array.isArray(b1.preloadBundles)){b1.preloadBundles.forEach(function(v){g1.push(sap.ui.loader._.loadJSResourceAsync(Z(v,true),true));});}if(Array.isArray(b1.libs)){h1=b1.libs.map(Z).filter(f1);g1.push(sap.ui.getCore().loadLibraries(h1,{preloadOnly:true}));}g1=Promise.all(g1);if(h1&&!A.preloadOnly){g1=g1.then(function(){return sap.ui.getCore().loadLibraries(h1);});}e1(g1);if(!K){e1(_(N,true));}else{e1(K.then(function(K){var e=K.getComponentName();if(typeof B==='string'){w(e,B);}return _(e,true).then(function(){return K._processI18n(true);}).then(function(){if(!A.createModels){return null;}var i=Object.keys(Q.afterPreload);if(i.length===0){return null;}return new Promise(function(v,$){sap.ui.require(["sap/ui/model/resource/ResourceModel"],function(i1){v(i1);},$);}).then(function(v){function $(i1){var j1=Q.afterPreload[i1];if(Array.isArray(j1.settings)&&j1.settings.length>0){var k1=j1.settings[0];return v.loadResourceBundle(k1,true).then(function(l1){k1.bundle=l1;},function(l1){L.error("Component Manifest: Could not preload ResourceBundle for ResourceModel. "+"The model will be skipped here and tried to be created on Component initialization.","[\"sap.ui5\"][\"models\"][\""+i1+"\"]",e);L.error(l1);delete Q.afterPreload[i1];});}else{return Promise.resolve();}}return Promise.all(i.map($)).then(function(){if(Object.keys(Q.afterPreload).length>0){var i1=p._createManifestModels(Q.afterPreload,K.getComponentName());if(!P){P={};}for(var j1 in i1){P[j1]=i1[j1];}}});});});}));R=function(e){if(typeof p._fnLoadComponentCallback==="function"){var i=q.extend(true,{},m);var v=q.extend(true,{},e);try{p._fnLoadComponentCallback(i,v);}catch($){L.error("Callback for loading the component \""+e.getComponentName()+"\" run into an error. The callback was skipped and the component loading resumed.",$,"sap.ui.core.Component");}}};}if(b1.components){q.each(b1.components,function(i,v){e1(_(Z(v),true));});}return Promise.all(c1).then(function(v){var e=[],i=false,$;i=v.some(function(i1){if(i1&&i1.rejected){$=i1.result;return true;}e.push(i1.result);});if(i){return Promise.reject($);}return e;}).then(function(v){if(K&&R){K.then(R);}return v;}).then(function(v){L.debug("Component.load: all promises fulfilled, then "+v);if(K){return K.then(function(e){K=e;N=K.getComponentName();return a1(N,K,true);});}else{return v;}}).then(function(){if(A.preloadOnly){return true;}return new Promise(function(e,i){sap.ui.require([X()],function(v){e(v);},i);}).then(function(e){var i=e.getMetadata();var N=i.getComponentName();var v=u(N);var $;if(K&&typeof G!=="object"&&(typeof J==="undefined"||J===v)){i._applyManifest(JSON.parse(JSON.stringify(K.getRawJson())));}$=x(i);return $.then(function(){return Y(e);});});}).then(function(e){if(!K){return e;}var i=[];var v;var $=K.getEntry("/sap.ui5/rootView");if(typeof $==="string"){v="XML";}else if($&&typeof $==="object"&&$.type){v=$.type;}if(v&&j[v]){var i1="sap/ui/core/mvc/"+j[v]+"View";i.push(i1);}var j1=K.getEntry("/sap.ui5/routing");if(j1&&j1.routes){var k1=K.getEntry("/sap.ui5/routing/config/routerClass")||"sap.ui.core.routing.Router";var l1=k1.replace(/\./g,"/");i.push(l1);}var m1=q.extend(true,{},K.getEntry("/sap.ui5/models"));var n1=q.extend(true,{},K.getEntry("/sap.app/dataSources"));var o1=p._createManifestModelConfigurations({models:m1,dataSources:n1,manifest:K,cacheTokens:b1.cacheTokens});for(var p1 in o1){if(!o1.hasOwnProperty(p1)){continue;}var q1=o1[p1];if(!q1.type){continue;}var r1=q1.type.replace(/\./g,"/");if(i.indexOf(r1)===-1){i.push(r1);}}if(i.length>0){return Promise.all(i.map(function(r1){return new Promise(function(s1,t1){var u1=false;function v1(w1){if(u1){return;}L.warning("Can not preload module \""+r1+"\". "+"This will most probably cause an error once the module is used later on.",K.getComponentName(),"sap.ui.core.Component");L.warning(w1);u1=true;s1();}sap.ui.require([r1],s1,v1);});})).then(function(){return e;});}else{return e;}}).then(function(e){var i=A.waitFor;if(i){var v=Array.isArray(i)?i:[i];return Promise.all(v).then(function(){return e;});}return e;}).catch(function(e){if(P){for(var N in P){var i=P[N];if(i&&typeof i.destroy==="function"){i.destroy();}}}throw e;});}if(K){a1(N,K);}_(N);return Y(sap.ui.requireSync(X()));}if(Math.sqrt(2)<1){sap.ui.require(["sap/ui/core/Core"],function(){});}p.prototype.getCommand=function(e){var i,m=this.getManifestEntry("/sap.ui5/commands");if(m&&e){i=m[e];}return e?i:m;};return p;});
