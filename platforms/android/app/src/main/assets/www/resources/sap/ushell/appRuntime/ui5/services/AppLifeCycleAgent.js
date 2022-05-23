// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/appRuntime/ui5/AppRuntimePostMessageAPI","sap/ushell/appRuntime/ui5/AppRuntimeService","sap/base/util/UriParameters","sap/ui/thirdparty/URI","sap/ui/thirdparty/jquery","sap/ushell/appRuntime/ui5/services/TunnelsAgent","sap/ushell/appRuntime/ui5/services/AppDelegationBootstrap"],function(A,a,U,b,q,t,d){"use strict";function c(C){var e=this,f,g,o={},r,R,h={};this.getAppInfo=function(m,i,j){sap.ui.require([m.replace(/\./g,"/")],function(f){e.init(f,i,j);});};this.init=function(i,j,k){f=i;g=j;R=k;A.registerCommHandlers({"sap.ushell.services.appLifeCycle":{"oInboundActions":{"create":{executeServiceCallFn:function(m){var M=JSON.parse(m.oMessage.data),s=new U(M.body.sUrl).get("sap-ui-app-id");window.hasher.replaceHash(M.body.sHash);e.create(s,M.body.sUrl);return new q.Deferred().resolve().promise();}},"destroy":{executeServiceCallFn:function(m){var M=JSON.parse(m.oMessage.data);e.destroy(M.body.sCacheId);return new q.Deferred().resolve().promise();}},"store":{executeServiceCallFn:function(m){var M=JSON.parse(m.oMessage.data);e.store(M.body.sCacheId);return new q.Deferred().resolve().promise();}},"restore":{executeServiceCallFn:function(m){var M=JSON.parse(m.oMessage.data);window.hasher.replaceHash(M.body.sHash);e.restore(M.body.sCacheId);return new q.Deferred().resolve().promise();}}}},"sap.ushell.eventDelegation":{"oInboundActions":{"registerEventHandler":{executeServiceCallFn:function(s){var E=JSON.parse(s.oMessageData.body.sEventObject),l=E.eventKey,m=E.eventData;if(h.hasOwnProperty(l)){var n=h[l];for(var p=0;p<n.length;p++){n[p](m);}}return new q.Deferred().resolve().promise();}}}}});this.initialSetup();};this.initialSetup=function(){d.bootstrap();a.sendMessageToOuterShell("sap.ushell.services.appLifeCycle.setup",{isStateful:true,isKeepAlive:true,lifecycle:{bActive:true,bSwitch:true,bStorageIdentifier:true},settings:{bTheme:true,bLocal:true},session:{bSignOffSupport:true,bExtendSessionSupport:true}});};this.restore=function(s){var i=o[s],j=i.getComponentInstance();i.setVisible(true);if(j){if(j.restore){j.restore();}if(j.getRouter&&j.getRouter()&&j.getRouter().initialize){j.getRouter().initialize();}r=i;}};this.store=function(s){var i=r,j;o[s]=i;j=i.getComponentInstance();i.setVisible(false);if(j){if(j.suspend){j.suspend();}if(j.getRouter&&j.getRouter()){j.getRouter().stop();}}};this.getURLParameters=function(u){return new Promise(function(i,j){if(u.hasOwnProperty("sap-intent-param")){var s=u["sap-intent-param"];a.sendMessageToOuterShell("sap.ushell.services.CrossApplicationNavigation.getAppStateData",{"sAppStateKey":s}).then(function(p){delete u["sap-intent-param"];var k=q.extend({},u,(new b("?"+p)).query(true),true);i(k);},function(E){i(u);});}else{i(u);}});};this.create=function(i,u){var j=new Promise(function(k){f.getAppInfo(i).then(function(l){k(l);});}).then(function(k){e.getURLParameters(new b(u).query(true)).then(function(l){g(i,l,k).then(function(m){R(m);});});});return j;};this.setComponent=function(i){r=i;};this.destroy=function(s){if(s){if(o[s]===r){r=undefined;}o[s].destroy();delete o[s];}else if(r){r.destroy();r=undefined;}};this.jsonStringifyFn=function(j){var s=JSON.stringify(j,function(k,v){return(typeof v==="function")?v.toString():v;});return s;};}return new c();},true);