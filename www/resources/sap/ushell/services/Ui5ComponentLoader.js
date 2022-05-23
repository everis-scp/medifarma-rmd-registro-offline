// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/services/Ui5ComponentHandle","sap/ushell/services/_Ui5ComponentLoader/utils","sap/ushell/EventHub","sap/ui/thirdparty/jquery"],function(U,u,e,q){"use strict";function a(c,p,C){this._oConfig=(C&&C.config)||{};this.createComponent=function(A,P,w){var o=A||{},l=u.shouldLoadCoreExt(o),b=u.shouldUseAmendedLoading(this._oConfig),L=u.shouldLoadDefaultDependencies(o,this._oConfig,b),d=o.applicationDependencies||{};u.logAnyApplicationDependenciesMessages(d.name,d.messages);if(!o.ui5ComponentName){return new q.Deferred().resolve(A).promise();}delete o.loadCoreExt;delete o.loadDefaultDependencies;var f=u.createComponentData(o.componentData||{},o.url,o.applicationConfiguration,o.reservedParameters);if(o.getExtensions){f.getExtensions=o.getExtensions;delete o.getExtensions;}var s=u.constructAppComponentId(P||{}),g=l&&b,h=u.prepareBundle(this._oConfig.coreResourcesComplement),i=u.createComponentProperties(g,L,w,o.applicationDependencies||{},o.ui5ComponentName,o.url,s,h);U.onBeforeApplicationInstanceCreated.call(null,i);var D=new q.Deferred();u.createUi5Component(i,f).then(function(j){var k=new U(j);o.componentHandle=k;var m=l;if(m){o.coreResourcesFullyLoaded=m;e.emit("CoreResourcesComplementLoaded",{status:"success"});}D.resolve(o);},function(E){var j=JSON.stringify(i,null,4);u.logInstantiateComponentError(i.name,E+"",E.status,E.stack,j);D.reject(E);});return D.promise();};this.loadCoreResourcesComplement=function(){if(this.loadCoreResourcesComplementPromise){return this.loadCoreResourcesComplementPromise.promise();}var o=u.prepareBundle(this._oConfig.coreResourcesComplement),d=new q.Deferred();u.loadBundle(o).done(function(){e.emit("CoreResourcesComplementLoaded",{status:"success"});this.loadCoreResourcesComplementPromise=d;d.resolve();}.bind(this)).fail(function(){e.emit("CoreResourcesComplementLoaded",{status:"failed"});d.reject();});return d.promise();};e.once("loadCoreResourcesComplement").do(function(){this.loadCoreResourcesComplement();}.bind(this));}a.hasNoAdapter=true;return a;},true);