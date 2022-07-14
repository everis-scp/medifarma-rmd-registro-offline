// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
prepareModules();sap.ui.define(["sap/ui/Device","sap/ushell/resources","sap/base/util/LoaderExtensions","sap/ushell/appRuntime/ui5/AppRuntimePostMessageAPI","sap/ushell/appRuntime/ui5/AppCommunicationMgr","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/ui/thirdparty/URI","sap/ushell/appRuntime/ui5/SessionHandlerAgent","sap/ushell/appRuntime/ui5/services/AppLifeCycleAgent","sap/ushell/appRuntime/ui5/services/ShellUIService","sap/ushell/ui5service/UserStatus","sap/ushell/appRuntime/ui5/services/AppConfiguration","sap/ui/core/Popup","sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject","sap/base/Log","sap/ui/core/ComponentContainer","sap/ushell/appRuntime/ui5/renderers/fiori2/AccessKeysAgent","sap/ui/core/BusyIndicator","sap/ushell/library","sap/ushell/iconfonts","sap/ushell/utils/WindowUtils"],function(D,r,L,A,a,b,U,S,c,d,f,g,P,q,i,h,C,j,B,u,I,W){"use strict";var _,p=new U().search(true),o,s,k=false,O,l=false,H=false,m=false,n={},t=u.UI5ComponentType,v=false,G=false;function w(){this.main=function(){a.init();this.getPageConfig();Promise.all([c.getURLParameters(_._getURI())]).then(function(e){var F=e[0],J=F["sap-ui-app-id"];_.setModulePaths();_.init();var K=new Promise(function(R){sap.ui.require(["sap/ushell/appRuntime/ui5/services/UserInfo"],R);});Promise.all([_.initServicesContainer(),_.getAppInfo(J),K]).then(function(e){var M=e[1];S.init();j.init();_._setInitialAppRoute();_.createApplication(J,F,M).then(function(R){_.renderApplication(R);});});});};this._setInitialAppRoute=function(){sap.ushell.Container.getServiceAsync("URLParsing").then(function(e){var F=e.parseShellHash(window.hasher.getHash());if(F&&F.appSpecificRoute&&F.appSpecificRoute.length>0){b.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.setInnerAppRoute",{appSpecificRoute:decodeURIComponent(F.appSpecificRoute)});}});};this._getURI=function(){return new U().query(true);};this.init=function(){I.registerFiori2IconFont();G=this._getURIParams()["sap-manifest-width"];A.registerCommHandlers({"sap.ushell.appRuntime":{oServiceCalls:{"hashChange":{executeServiceCallFn:function(e){var F=e.oMessageData.body.sHash;if(F&&F.length>0){window.hasher.replaceHash(F);}return new q.Deferred().resolve().promise();}},"setDirtyFlag":{executeServiceCallFn:function(e){var F=e.oMessageData.body.bIsDirty;if(F!==sap.ushell.Container.getDirtyFlag()){sap.ushell.Container.setDirtyFlag(F);}return new q.Deferred().resolve().promise();}},"getDirtyFlag":{executeServiceCallFn:function(e){return new q.Deferred().resolve(sap.ushell.Container.getDirtyFlag()).promise();}},"themeChange":{executeServiceCallFn:function(e){var F=e.oMessageData.body.currentThemeId;sap.ushell.Container.getUser().setTheme(F);return new q.Deferred().resolve().promise();}},"buttonClick":{executeServiceCallFn:function(e){sap.ushell.renderers.fiori2.Renderer.handleHeaderButtonClick(e.oMessageData.body.buttonId);return new q.Deferred().resolve().promise();}},"uiDensityChange":{executeServiceCallFn:function(e){var F=e.oMessageData.body.isTouch;q("body").toggleClass("sapUiSizeCompact",(F==="0")).toggleClass("sapUiSizeCozy",(F==="1"));return new q.Deferred().resolve().promise();}}}}});};this.handleLinkElementOpen=function(e,F){if(e.target&&e.target.tagName==="A"&&e.target.target==="_blank"&&e.target.href&&e.target.href.indexOf('#')>0){var N=_.rebuildNewAppUrl(e.target.href,F);if(N!==e.target.href){W.openURL(N);return false;}}};this.rebuildNewAppUrl=function(T,F){var e=T.split('#');if(e[0].length===0||e[0]===document.URL.split('#')[0]){return F+"#"+e[1];}return T;};this.getStartupPlugins=function(){return n;};this.inIframe=function(){try{return window.self!==window.top;}catch(e){return true;}};this.getPageConfig=function(){var e,F={};v=(p["sap-spaces"]==="true");e=q("meta[name='sap.ushellConfig.ui5appruntime']")[0];if(e!==undefined){F=JSON.parse(e.content);if(v===true){F.ushell=F.ushell||{};F.ushell.spaces={"enabled":true};}}window["sap-ushell-config"]=q.extend(true,{},x(),F);};this.setModulePaths=function(){if(window["sap-ushell-config"].modulePaths){var e=Object.keys(window["sap-ushell-config"].modulePaths);for(var F in e){(function(){var J={};J[e[F].replace(/\./g,"/")]=window["sap-ushell-config"].modulePaths[e[F]];sap.ui.loader.config({paths:J});}());}}};this.initServicesContainer=function(){return new Promise(function(R){sap.ui.require(["sap/ushell/appRuntime/ui5/services/Container"],function(F){F.bootstrap("apprt",{apprt:"sap.ushell.appRuntime.ui5.services.adapters"}).then(function(){window.onbeforeunload=function(){if(sap.ushell.Container&&sap.ushell.Container.getDirtyFlag()){if(!r.browserI18n){r.browserI18n=r.getTranslationModel(window.navigator.language).getResourceBundle();}return r.browserI18n.getText("dataLossExternalMessage");}return undefined;};sap.ushell.Container.getFLPUrlAsync().then(function(J){window.onclick=function(e){return _.handleLinkElementOpen(e,J);};window.onkeydown=function(e){if(e.code==='Enter'){return _.handleLinkElementOpen(event,J);}};});R();});});});};this._getURIParams=function(){return p;};this.getAppInfo=function(e){var F=window["sap-ushell-config"].ui5appruntime.config.appIndex.data,M=window["sap-ushell-config"].ui5appruntime.config.appIndex.module,J=window["sap-ushell-config"].ui5appruntime.config.appIndex.enableCache;return new Promise(function(R){if(F&&!i(F)){c.init(M,_.createApplication.bind(_),_.renderApplication.bind(_),J,e,F);R(F);}else{c.init(M,_.createApplication.bind(_),_.renderApplication.bind(_),J);c.getAppInfo(e,document.URL).then(function(K){R(K);});}});};this.setApplicationParameters=function(e,F){var J,K,M,N=new q.Deferred();function Q(R,T){var V="";if(R&&R.length>0){V=(R.startsWith("?")?"":"?")+R;}if(T&&T.length>0){V+=(V.length>0?"&":"?")+T;}return V;}if(F.hasOwnProperty("sap-startup-params")){J=(new U("?"+F["sap-startup-params"])).query(true);if(J.hasOwnProperty("sap-intent-param")){K=J["sap-intent-param"];delete J["sap-intent-param"];}M=(new U("?")).query(J).toString();if(K){b.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getAppStateData",{"sAppStateKey":K}).then(function(R){e.url+=Q(M,R);N.resolve();},function(R){e.url+=Q(M);N.resolve();});}else{e.url+=Q(M);N.resolve();}}else{N.resolve();}return N.promise();};this.setHashChangedCallback=function(){if(H===true){return;}function e(F){if(window.hasher.disableCFLPUpdate===true){return;}if(F&&typeof F==="string"&&F.length>0){b.sendMessageToOuterShell("sap.ushell.appRuntime.hashChange",{"newHash":F});}}window.hasher.changed.add(e.bind(this),this);H=true;};this.createApplication=function(e,F,J){var K=sap.ushell.Container.getService("URLParsing"),M=K.getHash(window.location.href);var N=K.parseShellHash(M);var Q=function(R){b.sendMessageToOuterShell("sap.ushell.services.ShellUIService.showShellUIBlocker",{"bShow":R.getParameters().visible});};return new Promise(function(R){o=new C({id:e+"-content",width:"100%",height:"100%"});var T="0";if(p.hasOwnProperty("sap-touch")){T=p["sap-touch"];if(T!=="0"&&T!=="1"){T="0";}}q("body").toggleClass("sapUiSizeCompact",(T==="0")).toggleClass("sapUiSizeCozy",(T==="1"));if(!s){sap.ushell.renderers.fiori2.utils.init();s=sap.ushell.Container.getService("ShellNavigation");s.init(function(){});}c.setComponent(o);new d({scopeObject:o,scopeType:"component"});new f({scopeObject:o,scopeType:"component"});if(P.attachBlockLayerStateChange&&m===false){P.attachBlockLayerStateChange(Q);m=true;}_.setApplicationParameters(J,F).done(function(){_.setHashChangedCallback();sap.ushell.Container.getServiceAsync("Ui5ComponentLoader").then(function(V){if(J.asyncHints&&Array.isArray(J.asyncHints.libs)){J.asyncHints.libs=J.asyncHints.libs.filter(function(X){return X.name!=="sap.ushell";});}V.createComponent({ui5ComponentName:e,applicationDependencies:J,url:J.url},N,[],t.Application).then(function(X){sap.ushell.Container.getServiceAsync("AppLifeCycle").then(function(Y){Y.prepareCurrentAppObject("UI5",X.componentHandle.getInstance(),false,undefined);});_.considerChangingTheDefaultFullWidthVal(X);_.overrideUrlHelperFuncs();_.loadPlugins();R(X);});});});});};this.considerChangingTheDefaultFullWidthVal=function(R){if(G===true||G==="true"){q("body").toggleClass("sapUiSizeCompact",false).toggleClass("sapUShellApplicationContainerLimitedWidth",true).toggleClass("sapUShellApplicationContainer",true);var e=R.componentHandle.getInstance();var F=e.getMetadata();if(F){var J=e.getMetadata().getManifestEntry("/sap.ui/fullWidth");if(J===true||J==="true"){q("body").toggleClass("sapUiSizeCompact",true).toggleClass("sapUShellApplicationContainerLimitedWidth",false).toggleClass("sapUShellApplicationContainer",false);}}}};this.overrideUrlHelperFuncs=function(){if(k===true){return;}k=true;if(sap.m&&sap.m.URLHelper){sap.m.URLHelper.triggerEmail=function(T,e,F,J,K){b.sendMessageToOuterShell("sap.ushell.services.ShellUIService.sendEmail",{sTo:T,sSubject:e,sBody:F,sCc:J,sBcc:K,sIFrameURL:document.URL,bSetAppStateToPublic:true});};O=sap.m.URLHelper.redirect;sap.m.URLHelper.redirect=function(e,N){if(e&&N===true&&e.indexOf('#')>=0){sap.ushell.Container.getFLPUrlAsync().then(function(F){var J=_.rebuildNewAppUrl(e,F);O.call(sap.m.URLHelper,J,N);});}else{O.call(sap.m.URLHelper,e,N);}};}};this.loadPlugins=function(){if(l===true){return;}z();E();l=true;sap.ushell.Container.getServiceAsync("PluginManager").then(function(e){e.loadPlugins("RendererExtensions");});};function z(){sap.ushell.Container.getService("PluginManager").registerPlugins({RTAPluginAgent:{component:"sap.ushell.appRuntime.ui5.plugins.rtaAgent",url:sap.ui.require.toUrl("sap/ushell/appRuntime/ui5/plugins/rtaAgent"),config:{"sap-plugin-agent":true}}});}function E(){var e;if(p.hasOwnProperty("sap-wa-debug")&&p["sap-wa-debug"]=="dev"){e="https://education3.hana.ondemand.com/education3/web_assistant/framework/FioriAgent.js";}else if(p.hasOwnProperty("sap-wa-debug")&&p["sap-wa-debug"]=="prev"){e="https://webassistant-outlook.enable-now.cloud.sap/web_assistant/framework/FioriAgent.js";}else{e="https://webassistant.enable-now.cloud.sap/web_assistant/framework/FioriAgent.js";}sap.ushell.Container.getService("PluginManager").registerPlugins({WAPluginAgent:{component:"sap.ushell.appRuntime.ui5.plugins.scriptAgent",url:sap.ui.require.toUrl("sap/ushell/appRuntime/ui5/plugins/scriptAgent"),config:{"sap-plugin-agent":true,"url":e}}});}this.renderApplication=function(R){o.setComponent(R.componentHandle.getInstance()).placeAt("content");B.hide();};}function x(){return{services:{CrossApplicationNavigation:{module:"sap.ushell.appRuntime.ui5.services.CrossApplicationNavigation",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},NavTargetResolution:{module:"sap.ushell.appRuntime.ui5.services.NavTargetResolution",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},ShellNavigation:{module:"sap.ushell.appRuntime.ui5.services.ShellNavigation",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},AppConfiguration:{module:"sap.ushell.appRuntime.ui5.services.AppConfiguration"},Bookmark:{module:"sap.ushell.appRuntime.ui5.services.Bookmark",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},LaunchPage:{module:"sap.ushell.appRuntime.ui5.services.LaunchPage",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},UserInfo:{module:"sap.ushell.appRuntime.ui5.services.UserInfo",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},AppState:{module:"sap.ushell.appRuntime.ui5.services.AppState",adapter:{module:"sap.ushell.appRuntime.ui5.services.adapters.EmptyAdapter"}},PluginManager:{module:"sap.ushell.appRuntime.ui5.services.PluginManager",config:{isBlueBox:true}},Ui5ComponentLoader:{config:{amendedLoading:false}}}};}var y=new w();_=y;y.main();return y;});
function prepareModules(){"use strict";sap.ui.require(["sap/ui/core/BusyIndicator"],function(B){B.show(0);});if(document.URL.indexOf("ui5appruntime")>0){sap.ui.define("sap/ushell/ApplicationType",[],function(){return{URL:{type:"URL"},WDA:{type:"WDA"},TR:{type:"TR"},NWBC:{type:"NWBC"},WCF:{type:"WCF"},SAPUI5:{type:"SAPUI5"}};});sap.ui.define("sap/ushell/components/applicationIntegration/AppLifeCycle",[],function(){return{};});sap.ui.define("sap/ushell/services/_AppState/WindowAdapter",[],function(){return function(){};});sap.ui.define("sap/ushell/services/_AppState/SequentializingAdapter",[],function(){return function(){};});sap.ui.define("sap/ushell/services/_AppState/Sequentializer",[],function(){return function(){};});sap.ui.define("sap/ushell/services/Configuration",[],function(){function C(){this.attachSizeBehaviorUpdate=function(){};this.hasNoAdapter=true;}C.hasNoAdapter=true;return C;});sap.ui.define("sap/ushell/services/_PluginManager/Extensions",[],function(){return function(){};});sap.ui.define("sap/ushell/TechnicalParameters",[],function(){return{getParameterValue:function(){return Promise.resolve([]);},getParameterValueSync:function(){return[];},getParameters:function(){return[];},getParameterNames:function(){return[];},isTechnicalParameter:function(){return false;}};});sap.ui.define("sap/ushell/AppInfoParameters",[],function(){return{getInfo:function(){return Promise.resolve({});}};});}}
