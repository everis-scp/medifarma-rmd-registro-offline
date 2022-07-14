// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/AppConfiguration","sap/ushell/services/_CrossApplicationNavigation/utils","sap/ushell/utils/type","sap/ushell/TechnicalParameters","sap/ushell/components/applicationIntegration/AppLifeCycle","sap/base/util/isPlainObject","sap/base/util/UriParameters","sap/ui/thirdparty/jquery","sap/base/util/ObjectPath","sap/base/util/merge","sap/ushell/utils","sap/ushell/ApplicationType","sap/ushell/library","sap/base/Log"],function(a,u,t,T,A,i,U,q,O,m,b,c,d,L){"use strict";var e=d.UI5ComponentType;function C(o,p,s){var f,S;if(s&&s.config){S=s.config;}function g(v,j){var r,k,n,l,w;if(typeof v!=="string"&&!i(v)&&v!==undefined){L.error("Unexpected input type",null,"sap.ushell.services.CrossApplicationNavigation");return undefined;}if(v===undefined){return undefined;}r=a.getCurrentApplication();if(j){if(typeof j.getComponentData!=="function"||!i(j.getComponentData())||!j.getComponentData().startupParameters||!i(j.getComponentData().startupParameters)){L.error("Cannot call getComponentData on component","the component should be an application root component","sap.ushell.services.CrossApplicationNavigation");}else{w=j.getComponentData().startupParameters;if(w.hasOwnProperty("sap-system")){k=w["sap-system"][0];}if(w.hasOwnProperty("sap-ushell-next-navmode")){n=w["sap-ushell-next-navmode"][0];}}}else{if(r&&r["sap-system"]){k=r["sap-system"];}else if(r&&r.url){k=new U(r.url).get("sap-system");}if(r&&r["sap-ushell-next-navmode"]){n=r["sap-ushell-next-navmode"];}else if(r&&r.url){n=new U(r.url).get("sap-ushell-next-navmode");}}if(r){l=r.contentProviderId;}var I=u._injectParameters({type:t,inject:{"sap-system":k,"sap-ushell-navmode":n,"sap-app-origin-hint":l},injectEmptyString:{"sap-app-origin-hint":true},args:v});return I;}function h(v){var j,k,l;if(localStorage&&localStorage["sap-ushell-enc-test"]==="false"){return v;}if(!S||!S["sap-ushell-enc-test"]){if(localStorage&&localStorage["sap-ushell-enc-test"]!=="true"){return v;}}if(typeof v!=="string"&&!i(v)&&v!==undefined){L.error("Unexpected input type",null,"sap.ushell.services.CrossApplicationNavigation");return undefined;}if(v===undefined){return undefined;}if(i(v)){k=q.extend(true,{},v);if(k.target&&k.target.shellHash){if(typeof k.target.shellHash==="string"){if(k.target.shellHash!=="#"&&k.target.shellHash!==""){k.target.shellHash=h(k.target.shellHash);}}return k;}k.params=k.params||{};k.params["sap-ushell-enc-test"]=["A B%20C"];return k;}l=v;if(!/[?&]sap-system=/.test(l)){j=(l.indexOf("?")>-1)?"&":"?";l+=j+"sap-ushell-enc-test="+encodeURIComponent("A B%20C");}return l;}this._extractInnerAppRoute=function(I){var j=this,P,k;if(typeof I==="string"){P=I.split("&/");k=P.shift();return{intent:k,innerAppRoute:P.length>0?"&/"+P.join("&/"):""};}if(Object.prototype.toString.apply(I)==="[object Object]"){var l=O.get("target.shellHash",I);if(typeof l==="string"){var r=j._extractInnerAppRoute(l);I.target.shellHash=r.intent;return{intent:I,innerAppRoute:r.innerAppRoute};}if(I.hasOwnProperty("appSpecificRoute")){var v=I.appSpecificRoute;delete I.appSpecificRoute;var n=typeof v==="string"&&v.indexOf("&/")!==0&&v.length>0;return{innerAppRoute:n?"&/"+v:v,intent:I};}return{intent:I,innerAppRoute:""};}L.error("Invalid input parameter","expected string or object","sap.ushell.services.CrossApplicationNavigation");return{intent:I};};this._injectInnerAppRoute=function(I,j){var k,l=this;if(!j){return I;}if(typeof I==="string"){return I+j;}if(Object.prototype.toString.apply(I)==="[object Object]"){k=O.get("target.shellHash",I);if(typeof k==="string"){I.target.shellHash=l._injectInnerAppRoute(k,j);return I;}I.appSpecificRoute=j;}return I;};this.hrefForExternal=function(j,k,l){var n,E,I;if(sap.ushell&&sap.ushell.Container&&typeof sap.ushell.Container.getService==="function"&&sap.ushell.Container.getService("ShellNavigation")){n=m({},j);E=this._extractInnerAppRoute(n);I=E.intent;u.addXAppStateFromParameter(I,"sap-xapp-state-data");n=g(I,k);n=u._injectStickyParameters({args:n,appLifeCycle:A,technicalParameters:T,type:t});n=h(n);n=this._injectInnerAppRoute(n,E.innerAppRoute);return sap.ushell.Container.getService("ShellNavigation").hrefForExternal(n,undefined,k,l);}L.debug("Shell not available, no Cross App Navigation");if(l){return(new q.Deferred()).resolve("").promise();}return"";};this.expandCompactHash=function(H){return sap.ushell.Container.getService("NavTargetResolution").expandCompactHash(H);};this.backToPreviousApp=function(){if(this.isInitialNavigation()){this.toExternal({target:{shellHash:"#"},writeHistory:false});return;}this.historyBack();};this.historyBack=function(j){var k=-1;if(j&&typeof j==="number"){if(j<=0){L.warning("historyBack called with an argument <= 0 and will result in a forward navigation or refresh","expected was an argument > 0","sap.ushell.services.CrossApplicationNavigation#historyBack");}k=j*-1;}window.history.go(k);};this.isInitialNavigation=function(){var j=sap.ushell&&sap.ushell.Container&&typeof sap.ushell.Container.getService==="function"&&sap.ushell.Container.getService("ShellNavigation");if(!j){L.debug("ShellNavigation service not available","This will be treated as the initial navigation","sap.ushell.services.CrossApplicationNavigation");return true;}var I=j.isInitialNavigation();if(typeof I==="undefined"){return true;}return I;};this.toExternal=function(j,k){var l,E,I,w=j.writeHistory;if(sap.ushell&&sap.ushell.Container&&typeof sap.ushell.Container.getService==="function"&&sap.ushell.Container.getService("ShellNavigation")){l=m({},j);this._processShellHashWithParams(l);E=this._extractInnerAppRoute(l);I=E.intent;u.addXAppStateFromParameter(I,"sap-xapp-state-data");l=g(I,k);l=u._injectStickyParameters({args:l,appLifeCycle:A,technicalParameters:T,type:t});l=h(l);delete l.writeHistory;l=this._injectInnerAppRoute(l,E.innerAppRoute);sap.ushell.Container.getService("ShellNavigation").toExternal(l,k,w);return;}L.debug("Shell not avialable, no Cross App Navigation");return;};this.hrefForAppSpecificHash=function(j){if(sap.ushell&&sap.ushell.Container&&typeof sap.ushell.Container.getService==="function"&&sap.ushell.Container.getService("ShellNavigation")){return sap.ushell.Container.getService("ShellNavigation").hrefForAppSpecificHash(j);}L.debug("Shell not available, no Cross App Navigation; fallback to app-specific part only");return"#"+encodeURI(j);};this.getPrimaryIntent=function(j,P){var Q={},k,r=/^#\w+-displayFactSheet(?:$|\?.)/;Q.tags=["primaryAction"];Q.semanticObject=j;if(P){Q.params=P;}return this.getLinks(Q).then(function(l){if(l.length===0){delete Q.tags;Q.action="displayFactSheet";k=function(n,v){var E;if(n.intent===v.intent){return 0;}E=r.test(n.intent)^r.test(v.intent);if(E){return r.test(n.intent)?-1:1;}return n.intent<v.intent?-1:1;};return this.getLinks(Q);}k=function(n,v){if(n.intent===v.intent){return 0;}return n.intent<v.intent?-1:1;};return l;}.bind(this)).then(function(l){return l.length===0?null:l.sort(k)[0];});};this.getSemanticObjectLinks=function(j,P,I,k,l,n){var r,v,E;r=u._injectStickyParameters({args:{params:P},appLifeCycle:A,technicalParameters:T,type:t});r=g(r,k).params;r=h({params:r}).params;v=sap.ushell.Container.getService("NavTargetResolution");var w;if(Array.isArray(j)){w=[];j.forEach(function(x){w.push([{semanticObject:x[0],params:x[1],ignoreFormFactor:!!x[2],ui5Component:x[3],appStateKey:x[4],compactIntents:!!(x[5])}]);});}else{w={semanticObject:j,params:r,ignoreFormFactor:I,ui5Component:k,appStateKey:l,compactIntents:!!n};}E=b.invokeUnfoldingArrayArguments(v.getLinks.bind(v),[w]);return E;};this.getLinks=function(v){var E;E=b.invokeUnfoldingArrayArguments(this._getLinks.bind(this),[v]);return E;};this._getLinks=function(n){var N,P,j,k=sap.ushell.Container.getService("NavTargetResolution");if(typeof n==="undefined"){n={};}N=q.extend(true,{},n);N.compactIntents=!!N.compactIntents;N.action=N.action||undefined;N.paramsOptions=u.extractGetLinksParameterOptions(N.params);N=u._injectStickyParameters({args:N,appLifeCycle:A,technicalParameters:T,type:t});P=N.params?u.extractGetLinksParameterDefinition(N.params):N.params;j=g({params:P},N.ui5Component).params;j=h({params:j}).params;if(N.appStateKey){j["sap-xapp-state"]=[N.appStateKey];delete N.appStateKey;}N.params=j;return k.getLinks(N);};this.getDistinctSemanticObjects=function(){var j=sap.ushell.Container.getService("NavTargetResolution");return j.getDistinctSemanticObjects();};this.isIntentSupported=function(I,j){var D=new q.Deferred(),k={},l=I.map(function(n){var r=g(n,j);k[r]=n;return r;});sap.ushell.Container.getService("NavTargetResolution").isIntentSupported(l).done(function(n){var r={};Object.keys(n).forEach(function(K){r[k[K]]=n[K];});D.resolve(r);}).fail(D.reject.bind(D));return D.promise();};this.isNavigationSupported=function(I,j){var k=I.map(function(l){return g(l,j);});return sap.ushell.Container.getService("NavTargetResolution").isNavigationSupported(k);};this.isUrlSupported=function(j){var D=new q.Deferred(),k,H;if(typeof j!=="string"){D.reject();return D.promise();}k=sap.ushell.Container.getService("URLParsing");if(k.isIntentUrl(j)){H=k.getHash(j);this.isIntentSupported(["#"+H]).done(function(r){if(r["#"+H]&&r["#"+H].supported){D.resolve();}else{D.reject();}}).fail(function(){D.reject();});}else{D.resolve();}return D.promise();};this.createComponentInstance=function(I,j,k){var D=new q.Deferred(),l=sap.ushell.Container,M;this.createComponentData(I,j).then(function(n){l.getServiceAsync("Ui5ComponentLoader").then(function(r){return r.modifyComponentProperties(n,e.Application).then(function(v){M=v;return r;});}).then(function(r){if(k){k.runAsOwner(function(){v(M);});}else{v(M);}function v(w){w.loadDefaultDependencies=false;r.instantiateComponent(w).then(function(x){D.resolve(x.componentHandle.getInstance());},function(E){E=E||"";L.error("Cannot create UI5 component: "+E,E.stack,"sap.ushell.services.CrossApplicationNavigation");D.reject(E);});}});},function(E){D.reject(E);});return D.promise();};this.createComponentData=function(I,j){return new Promise(function(r,R){var k=sap.ushell.Container,l,n;if(!j){j={};}else{n=Object.keys(j).length;if(n>1||(n===1&&!j.componentData)){R("`oConfig` argument should either be an empty object or contain only the `componentData` property.");return;}}if(j.componentData){delete j.componentData.startupParameters;delete j.componentData.config;delete j.componentData["sap-xapp-state"];}k.getServiceAsync("URLParsing").then(function(v){l=v.constructShellHash(v.parseShellHash(I));if(!l){R("Navigation intent invalid!");return;}k.getServiceAsync("NavTargetResolution").then(function(N){N.resolveHashFragment("#"+l).then(function(w){function x(z){z=q.extend(true,{},z,j);if(!z.ui5ComponentName){if(z.additionalInformation){z.ui5ComponentName=z.additionalInformation.replace(/^SAPUI5\.Component=/,"");}else if(z.name){z.ui5ComponentName=z.name;}}return z;}if(w.applicationType===c.URL.type&&w.appCapabilities&&w.appCapabilities.appFrameworkId==="UI5"&&sap.ushell.Container.inAppRuntime()){sap.ui["require"](["sap/ushell/appRuntime/ui5/services/AppLifeCycleAgent"],function(z){z.getAppInfo(w.appCapabilities.technicalAppComponentId).then(function(B){B=x(B);y({ui5ComponentName:w.appCapabilities.technicalAppComponentId,applicationDependencies:B,url:B.url});});});}else if(w.applicationType!==c.URL.type&&!(/^SAPUI5\.Component=/.test(w.additionalInformation))){R("The resolved target mapping is not of type UI5 component.");}else{y(w);}function y(z){k.getServiceAsync("Ui5ComponentLoader").then(function(B){z=x(z);z.loadDefaultDependencies=false;B.createComponentData(z).then(function(D){r(D);},function(E){E=E||"";L.error("Cannot get UI5 component data: "+E,E.stack,"sap.ushell.services.CrossApplicationNavigation");R(E);});});}});});});});};this.createEmptyAppState=function(j,k,P,l){if(!f){f=sap.ushell.Container.getService("AppState");}if(!(j instanceof sap.ui.core.UIComponent)){throw new Error("The passed oAppComponent must be a UI5 Component.");}return f.createEmptyAppState(j,k,P,l);};this.getStartupAppState=function(j){this._checkComponent(j);var k=j.getComponentData()&&j.getComponentData()["sap-xapp-state"]&&j.getComponentData()["sap-xapp-state"][0];return this.getAppState(j,k);};this._checkComponent=function(j){if(!(j instanceof sap.ui.core.UIComponent)){throw new Error("oComponent passed must be a UI5 Component");}};this.getAppState=function(j,k){var l,D=new q.Deferred();this._checkComponent(j);if(!f){f=sap.ushell.Container.getService("AppState");}if(typeof k!=="string"){if(k!==undefined){L.error("Illegal Argument sAppStateKey ");}setTimeout(function(){l=f.createEmptyUnmodifiableAppState(j);D.resolve(l);},0);return D.promise();}return f.getAppState(k);};this.getAppStateData=function(j){return b.invokeUnfoldingArrayArguments(this._getAppStateData.bind(this),[j]);};this._getAppStateData=function(j){var D=new q.Deferred();if(!f){f=sap.ushell.Container.getService("AppState");}if(typeof j!=="string"){if(j!==undefined){L.error("Illegal Argument sAppStateKey ");}setTimeout(function(){D.resolve(undefined);},0);}else{f.getAppState(j).done(function(k){D.resolve(k.getData());}).fail(D.resolve.bind(D,undefined));}return D.promise();};this.saveMultipleAppStates=function(j){var r=[],D=new q.Deferred();j.forEach(function(k){r.push(k.save());});q.when.apply(this,r).done(function(){D.resolve(r);}).fail(function(){D.reject("save failed");});return D.promise();};this._processShellHashWithParams=function(j){var k,H;if(j&&j.processParams===true&&j.target&&j.target.shellHash&&j.params){k=sap.ushell.Container.getService("URLParsing");H=k.parseShellHash(j.target.shellHash);j.target={semanticObject:H.semanticObject,action:H.action,contextRaw:H.contextRaw};j.appSpecificRoute=H.appSpecificRoute;j.params=Object.assign({},j.params,H.params);}};this.getSupportedAppStatePersistencyMethods=function(){if(!f){f=sap.ushell.Container.getService("AppState");}return f.getSupportedPersistencyMethods();};this.makeStatePersistent=function(k,P,j){if(!f){f=sap.ushell.Container.getService("AppState");}return f.makeStatePersistent(k,P,j);};this.resolveIntent=function(H){var D=new q.Deferred();sap.ushell.Container.getServiceAsync("NavTargetResolution").then(function(N){N.resolveHashFragment(H).then(function(r){D.resolve({url:r.url});}).fail(function(M){D.reject(M);});});return D.promise();};}C.hasNoAdapter=true;return C;},true);
