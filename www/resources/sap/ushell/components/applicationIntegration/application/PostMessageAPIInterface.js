// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery"],function(q){"use strict";var U="user.postapi.";function P(){var _,a;this.init=function(i,D){_=i;a=D;};this.getInterface=function(){var i={};i.registerPostMessageAPIs=r.bind(null,a);i[(_===true?"postMessageToApp":"postMessageToFlp")]=d.bind(null,_);i.createPostMessageResult=c;return i;};}function r(D,p){var R={status:"success",desc:""};var o={isActiveOnly:true,distributionType:["all"],fnResponseHandler:function(){}};if(p===undefined||Object.keys(p).length<=0){R.status="error";R.desc="no handler was found to register";return R;}Object.keys(p).forEach(function(s){if(typeof s!=="string"){R.status="error";R.desc="oPostMessageAPIs should contain only string keys";}else if(s.indexOf(U)!==0){R.status="error";R.desc="all user custom Message APIs must start with '"+U+"'";}else{Object.keys(p[s]).forEach(function(t){if(t=="inCalls"){p[s].oServiceCalls=p[s][t];delete p[s][t];}else if(t=="outCalls"){Object.keys(p[s][t]).forEach(function(m){p[s][t][m]=q.extend(true,{},o,p[s][t][m]);});p[s].oRequestCalls=p[s][t];delete p[s][t];}else{R.status="error";R.desc="api should contain either 'inCalls' or 'outCalls'";}});}});if(R.status==="success"){D(p);}return R;}function d(i,s,I,p){var D=new q.Deferred();if(p===undefined){p={};}if(i){sap.ui.require(["sap/ushell/components/applicationIntegration/AppLifeCycle"],function(A){A.postMessageToIframeApp(s,I,p,true).then(function(R){D.resolve(R&&R[0]&&R[0].body.result);});});}else{sap.ui.require(["sap/ushell/appRuntime/ui5/AppRuntimeService"],function(A){A.sendMessageToOuterShell(s+"."+I,p).done(function(R){D.resolve(R);});});}return D.promise();}function c(R){if(R===undefined){R={};}return new q.Deferred().resolve(R).promise();}return new P();});
