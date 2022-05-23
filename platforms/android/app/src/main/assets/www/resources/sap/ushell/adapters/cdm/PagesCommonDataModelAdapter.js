// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log"],function(L){"use strict";var P=function(u,p,a){this.sComponent="sap/ushell/adapters/cdm/PagesCommonDataModelAdapter";this.oCDMSiteRequestPromise=new Promise(function(r,b){if(a&&a.config&&a.config.pageId){Promise.all([sap.ushell.Container.getServiceAsync("NavigationDataProvider"),sap.ushell.Container.getServiceAsync("VisualizationDataProvider"),sap.ushell.Container.getServiceAsync("PagePersistence")]).then(function(s){var n=s[0]&&s[0].getNavigationData();var v=s[1]&&s[1].getVisualizationData();var o=s[2]&&s[2].getPage(a.config.pageId);Promise.all([o,v,n]).then(r);}).catch(function(c){L.fatal("PagesCommonDataModelAdapter encountered an error while fetching required services: ",c,this.sComponent);b(c);}.bind(this));}else{var e="PagesCommonDataModelAdapter was instantiated without a configured page";L.fatal(e,null,this.sComponent);b(e);}}.bind(this));};P.prototype.getSite=function(){var d=new jQuery.Deferred();Promise.all([this.oCDMSiteRequestPromise,sap.ushell.Container.getServiceAsync("PageReferencing")]).then(function(r){var s=r[0];var a=r[1];var p=s[0]&&s[0].content;var v=s[1];var n=s[2];var c=a.dereferencePage(p,v,n);d.resolve(c);}).catch(function(m){L.error("PagesCommonDataModelAdapter:getSite encountered an error while acquiring the data - ",m,this.sComponent);d.reject(m);}.bind(this));return d.promise();};P.prototype.getPersonalization=function(){return new jQuery.Deferred().resolve({}).promise();};P.prototype.setPersonalization=function(p){return new jQuery.Deferred().resolve().promise();};return P;},true);