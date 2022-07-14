/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(['sap/apf/ui/instance','sap/apf/core/instance','sap/apf/core/messageHandler','sap/apf/core/messageDefinition','sap/apf/core/constants','sap/apf/core/utils/filterSimplify','sap/ui/thirdparty/datajs','sap/apf/utils/utils','sap/apf/utils/filter','sap/apf/utils/externalContext','sap/apf/utils/startFilterHandler','sap/apf/utils/startFilter','sap/apf/utils/filterIdHandler','sap/apf/utils/serializationMediator','sap/apf/utils/navigationHandler','sap/apf/utils/startParameter','sap/apf/messageCallbackForStartup','sap/apf/ui/representations/RepresentationInterfaceProxy','sap/base/Log','sap/ui/thirdparty/jquery'],function(U,C,M,a,b,F,D,c,d,E,S,f,g,h,N,i,j,R,L,q){'use strict';function A(o,k,m){var l;var n;var s;var p;var r;var t;var u;var v;var w;var x;var y;var z;var B;var G=true;var H=q.Deferred();var I=new q.Deferred();var J;var K;this.type='api';this.constants={};this.constants.eventTypes=b.eventTypes;this.destroy=function(){l.activateOnErrorHandling(false);l.setMessageCallback(undefined);l.setLifeTimePhaseShutdown();if(z&&z.destroy){z.destroy();}if(n){n.destroy();}z=undefined;n=undefined;l=undefined;s=undefined;p=undefined;};this.activateOnErrorHandling=function(e){return n.activateOnErrorHandling(e);};this.getStartParameterFacade=function(){return n.getStartParameterFacade();};this.getLogMessages=function(){return n.getLogMessages();};this.createStep=function(e,Q,T){return n.createStep(e,Q,T);};this.getActiveStep=function(){return n.getActiveStep();};this.getCategories=function(){return n.getCategories();};this.getSteps=function(){return n.getSteps();};this.getStepTemplates=function(){return n.getStepTemplates();};this.getFacetFilterConfigurations=function(){return n.getFacetFilterConfigurations();};this.getApplicationConfigProperties=function(){return n.getApplicationConfigProperties();};this.moveStepToPosition=function(e,Q,T){return n.moveStepToPosition(e,Q,T);};this.removeStep=function(e,Q){return n.removeStep(e,Q);};this.resetPath=function(){return n.resetPath();};this.setActiveStep=function(e){return n.setActiveStep(e);};this.stepIsActive=function(e){return n.stepIsActive(e);};this.updatePath=function(e){return n.updatePath(e);};this.getApfLocation=function(){return n.getUriGenerator().getApfLocation();};this.readPaths=function(e){return n.readPaths(e);};this.savePath=function(e,Q,T){n.savePath(e,Q,T);};this.openPath=function(e,Q,T){return n.openPath(e,Q,T);};this.deletePath=function(e,Q){return n.deletePath(e,Q);};this.addFacetFilter=function(e){z.getLayoutView().getController().addFacetFilter(e);};this.getEventCallback=function(e){return z.getEventCallback(e);};this.putMessage=function(e){return n.putMessage(e);};this.createMessageObject=function(e){return n.createMessageObject(e);};this.getTextHtmlEncoded=function(e,Q){return n.getTextHtmlEncoded(e,Q);};this.getTextNotHtmlEncoded=function(e,Q){return n.getTextNotHtmlEncoded(e,Q);};if(!m){this.loadApplicationConfig=function(e){n.loadApplicationConfig(e);};}else{this.loadApplicationConfig=function(e){};}this.createFilter=function(){return n.createFilter();};this.addPathFilter=function(e){return u.add(e);};this.updatePathFilter=function(e,Q){u.update(e,Q);};this.getPathFilter=function(e){return u.get(e);};this.createReadRequest=function(e){return n.createReadRequest(e);};this.createReadRequestByRequiredFilter=function(e){return n.createReadRequestByRequiredFilter(e);};this.selectionChanged=function(e){z.selectionChanged(e);};this.createApplicationLayout=function(){if(!J){J=new sap.m.App().addStyleClass("sapApf");}return J;};this.startApf=function(){var Q;var T=this;var V=this.createApplicationLayout();I.done(function(){try{if(this.fnBeforeApfStartupCallback&&typeof this.fnBeforeApfStartupCallback==="function"){this.fnBeforeApfStartupCallback.apply(o,[this]);}H.resolve();z.createApplicationLayout(V).then(function(){Q=p.checkMode();var W=z.handleStartup(Q);W.done(function(){if(T.fnAfterApfStartupCallback&&typeof T.fnAfterApfStartupCallback==="function"){T.fnAfterApfStartupCallback.apply(o,[T]);}l.setLifeTimePhaseRunning();});});}catch(e){G=false;}}.bind(this));return V;};this.addMasterFooterContent=function(e){return z.addMasterFooterContentRight(e);};this.setEventCallback=function(e,Q){switch(e){case b.eventTypes.contextChanged:z.setEventCallback(e,Q);return true;case b.eventTypes.printTriggered:z.setEventCallback(e,Q);return true;case b.eventTypes.format:this.customFormat(Q);return true;default:return false;}};this.customFormat=function(e){z.setCustomFormatExit(e);};this.setCallbackBeforeApfStartup=function(e){this.fnBeforeApfStartupCallback=e;};this.setCallbackAfterApfStartup=function(e){this.fnAfterApfStartupCallback=e;};this.getPropertyValuesOfExternalContext=function(e){var Q=q.Deferred();t.getCombinedContext().then(function(T){var V=T.getFilterTermsForProperty(e);var W=[];V.forEach(function(X){var Y={Low:X.getValue(),Option:X.getOp(),High:X.getHighValue()};W.push(Y);});Q.resolve(W);});return Q.promise();};this.startupSucceeded=function(){return G;};if(o&&o.getInjections instanceof Function){if(!k){k={};}q.extend(k,k,o.getInjections());}s=new(k&&k.constructors&&k.constructors.StartParameter||i)(o,m);l=new(k&&k.constructors&&k.constructors.MessageHandler||M)();l.activateOnErrorHandling(true);l.setLifeTimePhaseStartup();l.loadConfig(a,true);B=k&&k.functions&&k.functions.messageCallbackForStartup||j;l.setMessageCallback(B);if(k&&k.functions&&k.functions.isUsingCloudFoundryProxy){K=k.functions.isUsingCloudFoundryProxy;}else{K=function(){return false;};}try{n=new(k&&k.constructors&&k.constructors.CoreInstance||C.constructor)({functions:{isUsingCloudFoundryProxy:K,getCumulativeFilter:function(){return r.getCumulativeFilter();},getCombinedContext:function(){return t.getCombinedContext();},ajax:(k&&k.functions&&k.functions.ajax),serializeApfState:function(e,Q){return y.serialize(e,Q);},deserializeApfState:function(e){return y.deserialize(e);},odataRequest:(k&&k.functions&&k.functions.odataRequest),getComponentName:function(){if(m&&m.manifest&&m.manifest["sap.app"]){return m.manifest["sap.app"].id;}return o.getMetadata().getComponentName();}},instances:{messageHandler:l,startParameter:s,datajs:(k&&k.instances&&k.instances.datajs)||OData,component:o},constructors:{Request:(k&&k.constructors&&k.constructors.Request),Metadata:(k&&k.constructors&&k.constructors.Metadata),MetadataFactory:(k&&k.constructors&&k.constructors.MetadataFactory),ResourcePathHandler:(k&&k.constructors&&k.constructors.ResourcePathHandler),TextResourceHandler:(k&&k.constructors&&k.constructors.TextResourceHandler),SessionHandler:(k&&k.constructors&&k.constructors.SessionHandler),Persistence:(k&&k.constructors&&k.constructors.Persistence)},manifests:m,exits:(k&&k.exits),coreProbe:(k&&k.coreProbe),corePromise:I});w={instances:{startParameter:s,component:o,messageHandler:l},functions:{getConfigurationProperties:n.getApplicationConfigProperties,ajax:n.ajax}};t=new((k&&k.constructors&&k.constructors.ExternalContext)||E)(w);v={functions:{getFacetFilterConfigurations:this.getFacetFilterConfigurations,getReducedCombinedContext:n.getReducedCombinedContext,createRequest:n.getFunctionCreateRequest()},instances:{messageHandler:l,onBeforeApfStartupPromise:H.promise()},constructors:{StartFilter:f}};r=new((k&&k.constructors&&k.constructors.StartFilterHandler)||S)(v);x={functions:{setRestrictionByProperty:r.setRestrictionByProperty,getRestrictionByProperty:r.getRestrictionByProperty},instances:{messageHandler:l}};u=new((k&&k.constructors&&k.constructors.FilterIdHandler)||g)(x);y=new((k&&k.constructors&&k.constructors.SerializationMediator)||h)({instances:{coreApi:n,filterIdHandler:u,startFilterHandler:r,messageHandler:l}});var O={constructors:{FilterReduction:F.FilterReduction},functions:{getCumulativeFilterUpToActiveStep:n.getCumulativeFilterUpToActiveStep,getNavigationTargets:n.getNavigationTargets,getActiveStep:n.getActiveStep,createRequest:n.getFunctionCreateRequest(),getXappStateId:n.getStartParameterFacade().getXappStateId,isFilterReductionActive:n.getStartParameterFacade().isFilterReductionActive,getAllParameterEntitySetKeyProperties:n.getMetadataFacade().getAllParameterEntitySetKeyProperties},instances:{messageHandler:l,component:o,serializationMediator:y}};p=new((k&&k.constructors&&k.constructors.NavigationHandler)||N)(O);z=new(k&&k.constructors&&k.constructors.UiInstance||U)({oCoreApi:n,oFilterIdHandler:u,oSerializationMediator:y,oNavigationHandler:p,oComponent:o,oStartParameter:s,oStartFilterHandler:r,functions:k&&k.functions||{},exits:k&&k.exits||{}});}catch(P){G=false;this.startApf=function(){return new sap.m.Text({text:""});};this.loadApplicationConfig=function(){return"";};L.error("Caught exception during creation of APF API");}if(n){n.createRepresentation=function(e,Q){var T=e.replaceAll(".","/");sap.ui.require([T],function(X){return X;});var V=new sap.apf.ui.representations.RepresentationInterfaceProxy(n,z);var W=c.extractFunctionFromModulePathString(e);return new W(V,Q);};}if(k&&k.probe&&typeof k.probe==='function'){k.probe({apfApi:this,coreApi:n,component:o,uiApi:z,messageHandler:l,serializationMediator:y,navigationHandler:p,startParameter:s,injectedFunctionsNavigationHandler:O&&O.functions,startFilterHandler:r,externalContext:t,filterIdHandler:u,corePromise:I});}}sap.apf.Api=A;return A;},true);