// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/util/ObjectPath","sap/base/util/isPlainObject","sap/base/util/deepExtend","sap/ushell/utils","sap/base/Log","sap/ui2/srvc/ODataWrapper"],function(q,O,a,d,u,L){"use strict";var S="sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter",n=["sap-wd-configId","SAP-WD-CONFIGID","sap-client","SAP-CLIENT","System","SYSTEM","sap-language","SAP-LANGUAGE","sap-wd-htmlrendermode","sap-wd-deltarendering","wdallowvaluesuggest","sap-wd-lightspeed","sap-wd-remotedesktop","sap-wd-flashdebug","sap-accessibility","sap-theme","sap-*","SAP-*","wd*","WD*"];var C=function(s,p,A){var t=this;var c=sap.ushell.Container,P="";if(c){P=c.getLogonSystem().getProductName()||"";}this._oLocalSystemAlias={http:{id:"",host:"",port:"",pathPrefix:"/sap/bc/"},https:{id:"",host:"",port:"",pathPrefix:"/sap/bc/"},rfc:{id:"",systemId:"",host:"",service:0,loginGroup:"",sncNameR3:"",sncQoPR3:""},id:"",label:"local",client:"",language:"",properties:{productName:P}};this.hasSegmentedAccess=true;this._oAdapterConfig=A&&A.config;this._wdLengthLimit=1800;this._oODataWrapper=undefined;this._getODataWrapper=function(){if(!this._oODataWrapper){this._oODataWrapper=sap.ui2.srvc.createODataWrapper("/sap/opu/odata/UI2/INTEROP/");}return this._oODataWrapper;};this._aTargetMappings=[];this._aInbounds=[];this._aInitialSegment=undefined;this._oSystemAliasBuffer=new u.Map();this._oURLTemplates={};this._storeFromFullStartupResponse=function(f){if(f){if(f.targetMappings){t._aTargetMappings=f.targetMappings;}if(f.systemAliases){t._writeUserSystemAliasesToBuffer(f.systemAliases);}if(f.urlTemplates){t._oURLTemplates=f.urlTemplates;}}};this._fallbackToFullStartupRequest=function(r,R){L.debug("Falling back to full start_up request from adapter","","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");t._requestAllTargetMappings().done(function(f){t._storeFromFullStartupResponse(f);r();}).fail(function(m){R(m);});};this._iTargetMappingsUnusedPromiseRejectCount=0;this._oInitialSegmentPromise=A&&A.config&&A.config.initialSegmentPromise||(new Promise(function(r,R){t._iTargetMappingsUnusedPromiseRejectCount++;if(t._iTargetMappingsUnusedPromiseRejectCount===2){t._fallbackToFullStartupRequest(r,R);}}));this._oNavTargetPromise=A&&A.config&&A.config.navTargetDataPromise||(new Promise(function(r,R){t._iTargetMappingsUnusedPromiseRejectCount++;if(t._iTargetMappingsUnusedPromiseRejectCount===2){t._fallbackToFullStartupRequest(r,R);}}));this._oInitialSegmentPromise.then(function(b){if(b===null){L.debug("Initial target mappings segment promise resolved with 'null'","Will not process initial target mappings segments again (mostly likely because this is no longer needed)","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");return;}if(t._aTargetMappings.length===0){L.debug("Segmented start_up response returned","storing system aliases and inbounds from segment","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");var r=b[0],T=b[1],e=b[2];if(b.length>3){t._oURLTemplates=b[3];}t._aTargetMappings=T;t._writeUserSystemAliasesToBuffer(e);t._aInitialSegment=r;}else{L.debug("Segmented start_up response returned","ignoring response because the full target mapping response returned before","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");}}).catch(function(r){L.error("Initial segment promise was rejected.",r,"sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");});this._oNavTargetPromise.then(function(f){L.debug("Full start_up response returned","storing system aliases and inbounds","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");t._storeFromFullStartupResponse(f);});};C.prototype.resolveHashFragmentFallback=function(o,i,p){var s=this._constructShellHashForLpdCust(i,p),b=p&&p["sap-system"]&&p["sap-system"][0],D=new q.Deferred();this._resolveHashFragmentBE(s||o).done(function(r){if(r&&b){r["sap-system"]=r["sap-system"]||b;}D.resolve(r);}).fail(D.reject.bind(D));return D.promise();};C.prototype.getInbounds=function(s){var D=new q.Deferred(),t=this;this._oInitialSegmentPromise.then(function(i){if(i===null){return;}if(t._isInSegment(s,t._aInitialSegment)){L.debug("Got inbounds from initial segment","","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");t._aInbounds=t._formatDirectStart(t._aTargetMappings);D.resolve(t._aInbounds);}else{L.debug("Did not get inbound in initial segment","","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");}});this._oNavTargetPromise.then(function(){L.debug("Got inbounds from full start_up response","","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");t._aInbounds=t._formatDirectStart(t._aTargetMappings);t.getInbounds=function(){return new q.Deferred().resolve(t._aInbounds).promise();};D.resolve(t._aInbounds);},function(m){D.reject(m);});return D.promise();};C.prototype._isInSegment=function(s,b){if(!Array.isArray(b)||!Array.isArray(s)){return false;}return s.every(function(e){return!b.every(function(t){return!(e.semanticObject===t.semanticObject&&e.action===t.action);});});};C.prototype._requestAllTargetMappings=function(){var p=sap.ui2.srvc.getParameterMap();var D=new q.Deferred();var r="/sap/bc/ui2/start_up?so=%2A&action=%2A&",c=(O.create("services.targetMappings",this._oAdapterConfig).cacheId&&("&sap-cache-id="+O.create("services.targetMappings",this._oAdapterConfig).cacheId))||"";function b(N){var v=p[N];if(v){r+=N+"="+encodeURIComponent(v[0])+"&";}}b("sap-language");b("sap-client");sap.ui2.srvc.get(r+"&shellType="+sap.ushell_abap.getShellType()+"&depth=0"+c,false,function(N){var o=JSON.parse(N);if(!o){D.reject("Malformed Full TM Result");}D.resolve(o);},function(m){D.reject(m);});return D.promise();};C.prototype._formatDirectStart=function(D){var t=this;if(!D){this._aInitialSegment=undefined;return[];}function m(s,o){var T={};var M=s.match(/^([^-]+)-([^~]+)/);if(!M){L.warning("The target mapping id "+s+" is not valid","this target mapping will be discarded","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");return undefined;}if(!o.hasOwnProperty("text")){o.text="";}T.semanticObject=M[1];T.action=M[2];T.id=s;T.title=o.text;T.permanentKey="X-SAP-UI2-PAGE:"+o.catalogId+":"+o.tmChipId;T.contentProviderId="";var f={};["applicationType","applicationDependencies","applicationData","postParameters","text","url","systemAlias"].forEach(function(p){f[p]=o[p];});T.resolutionResult=sap.ushell_abap.bootstrap.adjustNavTargetResult(f);T.resolutionResult.additionalInformation=T.resolutionResult.additionalInformation||"";T.resolutionResult.appId=T.permanentKey;var r=T.resolutionResult,b=r.applicationType;if(s.indexOf("Shell-startWCF")===0&&b==="URL"){T.resolutionResult.systemAliasSemantics="apply";}T.resolutionResult.applicationType=t._formatApplicationType(s,T.resolutionResult);T.resolutionResult.systemAlias=o.systemAlias||"";T.deviceTypes=o.formfactors;T.resolutionResult["sap.ui"]={};T.resolutionResult["sap.ui"].technology=T.resolutionResult.applicationType;if(T.resolutionResult["sap.ui"].technology==="SAPUI5"){T.resolutionResult["sap.ui"].technology="UI5";}if(T.resolutionResult["sap.ui"].technology==="TR"){T.resolutionResult["sap.ui"].technology="GUI";}if(!T.deviceTypes){T.deviceTypes=o.formFactors||{};}T.deviceTypes.desktop=T.deviceTypes.desktop||false;T.deviceTypes.phone=T.deviceTypes.phone||false;T.deviceTypes.tablet=T.deviceTypes.tablet||false;if(Array.isArray(o.signature)){T.signature={};T.signature.additionalParameters=o.allowParams?"allowed":"ignored";T.signature.parameters={};o.signature.forEach(function(B){var p={};var U;var N=B.name;if(B.defaultValue&&B.defaultValue.value){p.defaultValue={};p.defaultValue.value=B.defaultValue.value;p.defaultValue.format=B.defaultValue.format||"plain";U=t._extractUserDefaultValue(p.defaultValue.value);if(U){p.defaultValue={value:U,format:"reference"};}}if(B.filter&&B.filter.value){p.filter={};p.filter.value=B.filter.value;p.filter.format=B.filter.format||"plain";U=t._extractUserDefaultValue(p.filter.value);if(U){p.filter={value:U,format:"reference"};}}if(B.renameTo){p.renameTo=B.renameTo;}p.required=B.required||false;T.signature.parameters[N]=p;});}else{T.signature=d({parameters:{}},o.signature);T.signature.additionalParameters=T.signature.additionalParameters||(o.allowParams?"allowed":"ignored");Object.keys(T.signature.parameters).forEach(function(k){var p=T.signature.parameters[k];if(p.filter){p.filter.format=p.filter.format||"plain";}if(p.defaultValue){p.defaultValue.format=p.defaultValue.format||"plain";}p.required=p.required||false;if(p.filter&&p.filter.hasOwnProperty("format")&&!(p.filter.hasOwnProperty("value"))){delete p.filter;}if(p.defaultValue&&p.defaultValue.hasOwnProperty("format")&&!(p.defaultValue.hasOwnProperty("value"))){delete p.defaultValue;}});}var c=T.signature&&T.signature.parameters&&T.signature.parameters["sap-hide-intent-link"];if(c&&c.hasOwnProperty("defaultValue")){T.hideIntentLink=c.defaultValue.value==="true";}if(c&&!c.required&&c.hasOwnProperty("defaultValue")){delete T.signature.parameters["sap-hide-intent-link"];}if(typeof o.parameterMappings==="object"){Object.keys(o.parameterMappings).forEach(function(k){var e=o.parameterMappings[k];if(k&&e.target){T.signature.parameters[k]=T.signature.parameters[k]||{};T.signature.parameters[k].renameTo=e.target;}});}if(T.resolutionResult.applicationType==="URL"&&a(o.urlTemplate)){T.templateContext=t.getUrlTemplateContext(o);}return T;}var R=[];Object.keys(D).forEach(function(k){var r=m(k,D[k]);if(r){R.push(r);}});return R;};C.prototype._formatApplicationType=function(t,r){var A=r.applicationType,U=r.url||"";function l(N,D){L.warning("Cannot detect application type for TargetMapping id '"+t+"', will default to "+D+" application type","TargetMapping URL is '"+U+"'",S);}if(A==="SAPUI5"){return"SAPUI5";}if(A==="URL"&&r.additionalInformation&&r.additionalInformation.indexOf("SAPUI5.Component=")===0){return"SAPUI5";}if(A==="WDA"||A==="TR"||A==="WCF"){return A;}if(t.indexOf("Shell-startWCF")===0&&A==="URL"){return"WCF";}if(A==="NWBC"){if(U.indexOf("/~canvas;window=app/wda")>=0){return"WDA";}if(U.indexOf("/~canvas;window=app/transaction")>=0){return"TR";}l(r,"TR");return"TR";}if(A!=="URL"){l(r,"URL");}return"URL";};C.prototype._extractUserDefaultValue=function(s){var r,b=new RegExp("^%%(UserDefault[.].+)%%$"),m=b.exec(s);return m?m[1]:r;};C.prototype._formatSignature=function(o,A){var t=this,r={parameters:{},additionalParameters:A===false?"ignored":"allowed"};if(!o.results){return r;}o.results.forEach(function(e){var p,E=e.name,s,U;if(Object.prototype.hasOwnProperty.call(r.parameters,E)){L.error("Duplicate property name "+E+" in "+JSON.stringify(o),"sap.ui2.srvc.ClientSideTargetResolutionAdapter._formatSignature");}r.parameters[E]={required:t._getObjectDefaulting(e,"required",false)};p=r.parameters[E];s=t._getObjectDefaulting(e,"value","");if(e.regexp===true){p.filter={value:(s===""?".*":s),format:"regexp"};return;}if(e.required===false){U=t._extractUserDefaultValue(s);if(U){p.defaultValue={value:U,format:"reference"};return;}if(s!==""){p.defaultValue={value:s};}return;}if(e.required===true&&e.value){U=t._extractUserDefaultValue(s);if(U){p.filter={value:U,format:"reference"};return;}if(s!==""){p.filter={value:s};}}});return r;};C.prototype._mergeParameterMappingsIntoSignature=function(s,o){var p=o.results;if(!p){return;}p.forEach(function(P){var b=P.source;var t=P.target;if(t){s.parameters[b]=s.parameters[b]||{};if(s.parameters[b].renameTo){L.warning("duplicate parameter mapping for'"+b+"'","OData Parameter mappings is "+JSON.stringify(P,null,"   "),S);}s.parameters[b].renameTo=t;}});};C.prototype._formatDeviceTypes=function(f){var r={},t=this;["desktop","tablet","phone"].forEach(function(p){r[p]=t._getObjectDefaulting(f,p,false);});return r;};C.prototype._getObjectDefaulting=function(r,s,D){var o=O.get(s||"",r);return(o===undefined)?D:o;};C.prototype._constructShellHashForLpdCust=function(i,p){var l="",f,t=O.get("resolutionResult._original",i);if(!a(t)){f="the given target mapping is not an object";}if(!f&&!t.hasOwnProperty("id")){f="no id found in target mapping _original object";}if(!f&&typeof t.id!=="string"){f="the target mapping id was not a string";}if(!f&&t.id.length===0){f="the target mapping id was an empty string";}if(f){L.error("Cannot construct Shell Hash for LPD_CUST resolution",f,"sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");return undefined;}l+=t.id;var b=sap.ushell.Container.getService("URLParsing").paramsToString(p);if(b.length>0){l+="?"+b;}return l;};C.prototype._openBatchQueueUnlessOpen=function(o){if(o.isBatchQueueOpen()){return false;}o.openBatchQueue();return true;};C.prototype._getShellType=function(){if(sap&&sap.ushell_abap&&typeof sap.ushell_abap.getShellType==="function"){return sap.ushell_abap.getShellType();}return"FLP";};C.prototype._resolveHashFragmentBE=function(f){var D=new q.Deferred(),t=this,b,F=sap.ui2.srvc.getFormFactor();function e(U){return encodeURIComponent(U).replace(/'/g,"''");}b=this._openBatchQueueUnlessOpen(this._getODataWrapper());this._oODataWrapper.read("ResolveLink?linkId='"+e(f)+"'&shellType='"+t._getShellType()+"'"+(F?"&formFactor='"+e(F)+"'":""),function(r){var i,s="",A;if(r.results.length){if(r.results.length>1){for(i=0;i<r.results.length;i+=1){delete r.results[i].__metadata;s+=(i===0?"used target: ":"\nignored target: ")+JSON.stringify(r.results[i]);}L.error("INTEROP service's ResolveLink operation "+"returned "+r.results.length+" targets for hash '#"+f+"', first one is used.",s,"sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");}r=r.results[0];A=sap.ushell_abap.bootstrap.adjustNavTargetResult(r);A.url=sap.ushell_abap.bootstrap.addPostParametersToNavTargetResultUrl(r.postParameters,A.url);if(A&&A.applicationType==="SAPUI5"){A.applicationType="URL";}t._compactTooLongWdaUrl(A).done(function(c){D.resolve(c);}).fail(function(m){D.reject("Could not resolve link '"+f+"' due to compactation failure"+m);});}else{D.reject("Could not resolve link '"+f+"'");}},function(m){D.reject(m);});if(b){t._getODataWrapper().submitBatchQueue(function(){},D.reject.bind(D));}return D.promise();};C.prototype._compactTooLongWdaUrl=function(r){var D=new q.Deferred();if(r&&r.applicationType==="NWBC"&&r.url&&r.url.indexOf("/ui2/nwbc/~canvas;window=")===0&&r.url.length>this._getWDAUrlShorteningLengthLimit()){this._compactUrl(r.url).done(function(c){r.url=c;D.resolve(r);}).fail(D.reject.bind(D));return D.promise();}return D.resolve(r).promise();};C.prototype._compactUrl=function(U){var m=U.match(/\?.*/);var o=sap.ushell.Container.getService("URLParsing");if(!(m&&m[0]&&m[0].length>this._getWDAUrlShorteningLengthLimit()-200)){return new q.Deferred().resolve(U).promise();}var p=o.parseParameters(m[0]);var D=new q.Deferred();sap.ushell.Container.getService("ShellNavigation").compactParams(p,n,undefined).done(function(c){var r=U.match(/^[^?]*/)[0]+"?"+o.paramsToString(c);D.resolve(r);}).fail(D.reject.bind(D));return D.promise();};C.prototype._getWDAUrlShorteningLengthLimit=function(){var N=u.getParameterValueBoolean("sap-ushell-nowdaurlshortening");if(N){return 6000000;}return this._wdLengthLimit;};C.prototype.resolveSystemAlias=function(s){var m,D=new q.Deferred(),t=this,o;o=this._readSystemAliasFromBuffer(s);if(o){L.debug("System alias '"+s+"' was already buffered","","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");window.setTimeout(function(){D.resolve(o);},0);}else{L.debug("System alias '"+s+"' is not in buffer","","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");var r=function(){o=t._readSystemAliasFromBuffer(s);if(o){L.debug("System alias '"+s+"' is now in buffer","Skipping INTEROP service call","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");D.resolve(o);}else{L.debug("System alias '"+s+"' still not in buffer","Resolving via INTEROP service","sap.ushell_abap.adapters.abap.ClientSideTargetResolutionAdapter");t._readSystemAliasViaInterop(s).fail(function(e){D.reject(e);}).done(function(b){o=t._fixSystemAlias(b);if(o&&o.id){t._writeSystemAliasToBuffer(o);D.resolve(o);}else{m="Data returned for system alias is not valid";L.warning("ClientSideTargetResolutionAdapter: "+m);D.reject(m);}});}};this._oInitialSegmentPromise.then(r,r);}return D.promise();};C.prototype._writeUserSystemAliasesToBuffer=function(s){var t=this;if(typeof s==="undefined"){return;}if(a(s)){Object.keys(s).forEach(function(b){t._writeSystemAliasToBuffer(t._fixSystemAlias(s[b]));});return;}s.forEach(function(o){t._writeSystemAliasToBuffer(t._fixSystemAlias(o));});};C.prototype._readSystemAliasFromBuffer=function(s){var r=this._oSystemAliasBuffer.get(s);if(s===""){if(!r){return this._oLocalSystemAlias;}r.properties=d({},this._oLocalSystemAlias.properties,r.properties||{});}return r;};C.prototype._writeSystemAliasToBuffer=function(s){if(s&&s.id){this._oSystemAliasBuffer.put(s.id,s);}return s;};C.prototype._fixSystemAlias=function(s){s=s||{};delete s.__metadata;var f={};f.id=s.id||"";f.client=s.client||"";f.language=s.language||"";["http","https"].forEach(function(D){if(s.hasOwnProperty(D)){delete s[D].__metadata;if(s[D].id!==""){f[D]=d({id:"",host:"",port:"",pathPrefix:""},s[D]);}}});if(s.hasOwnProperty("rfc")&&s.rfc.id){delete s.rfc.__metadata;f.rfc=d({id:"",systemId:"",host:"",service:0,loginGroup:"",sncNameR3:"",sncQoPR3:""},s.rfc);}return f;};C.prototype._readSystemAliasViaInterop=function(s){var D=new q.Deferred(),r="SystemAliases(id='"+encodeURIComponent(s)+"')?$format=json";this._getODataWrapper().read(r,function(o){D.resolve(o);},function(m){D.reject(m);});return D.promise();};C.prototype.getSystemAliases=function(){return(this._oSystemAliasBuffer&&this._oSystemAliasBuffer.entries)||{};};C.prototype.getUrlTemplateContext=function(D){var U=this._oURLTemplates[D.urlTemplate.id];if(!U){L.error("No URL template found.");return null;}var s={systemAliases:this.getSystemAliases(),urlTemplates:this._oURLTemplates};return{payload:U.payload,site:s,siteAppSection:D};};return C;},true);
