/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/util/LoaderExtensions","sap/base/util/UriParameters","sap/base/util/merge","sap/base/strings/formatMessage","sap/base/strings/capitalize"],function(L,U,m,f,c){"use strict";var a={};a.getManifest=function(C){var u=sap.ushell&&sap.ushell.Container;if(!u){var b=a.getNoFLPAppPath();C="local"+b;}var o=new U(window.location.href),d=o.get("manifest"),s=o.get("user"),t,M="",D=L.loadResource(C+"/manifest.json");try{if(window.parent.__karma__.config.ui5.config.usetenants){t=window.parent.__karma__.config.ui5.shardIndex;}}catch(e){t=undefined;}var T=D;if(d){d.split(",").forEach(function(S){if(S.indexOf("/")!==0){S=C+"/"+S;}T=m({},T,L.loadResource(S));});}if(t!==undefined&&T["sap.app"].tenantSupport!==false){M+="/tenant-"+t;T.tenantID=t;}T["sap.app"].dataSources.mainService.uri=M+T["sap.app"].dataSources.mainService.uri+(s?"?u="+s:"");return T;};a.getNoFLPAppPath=function(){var u=new U(window.location.href);var A=u.get("app")||"SalesOrder";var b=a.getAppInfo(A).appPath;return b;};a.getAppInfo=function(A){var o={"SalesOrder-manage":{appName:"SalesOrder",appPath:"/apps/salesorder/webapp"},"SalesOrder-manageInline":{appName:"SalesOrder",appPath:"/apps/salesorder/webapp"},"SalesOrder-manageFCL":{appName:"SalesOrderFCL",appPath:"/apps/salesorder-FCL/webapp"},"SalesOrder-aggregate":{appName:"SalesOrder",appPath:"/apps/salesorder-aggregate/webapp"},"SalesOrder-manageInlineTest":{appName:"SalesOrder",appPath:"/apps/salesorder/webapp"},"Customer-manage":{appName:"Customer",appPath:"/apps/customer/webapp"},"Customer-displayFactSheet":{appName:"Customer",appPath:"/apps/customer-displayFactSheet/webapp"},"SalesOrder-sticky":{appName:"SalesOrder",appPath:"/apps/salesorder/webapp"},"SalesOrder-stickyFCL":{appName:"SalesOrderFCL",appPath:"/apps/salesorder-FCL/webapp"},"Products-manage":{appName:"catalog-admin-ui",appPath:"/apps/office-supplies/admin/webapp"},"Products-custom":{appName:"catalog-admin-ui",appPath:"/apps/office-supplies/custompage/webapp"},"Chevron-Navigation":{appName:"SalesOrder",appPath:"/apps/salesorder/webapp"},"Manage-items":{appName:"ManageItems",appPath:"/apps/manage-items/webapp"},"Drafts-manage":{appName:"ManageDrafts",appPath:"/apps/manage-drafts/webapp"},"Drafts-manageFCL":{appName:"ManageDraftsFCL",appPath:"/apps/manage-drafts-FCL/webapp"},"Manage-itemsSem":{appName:"ManageItemsSem",appPath:"/apps/manage-drafts/webapp"},"CustomNavigation-sample":{appName:"customNavigation.sample",appPath:"/apps/customNav"},"SalesOrder-Create":{appName:"SalesOrderCreate",appPath:"/apps/salesorder-Create/webapp"},"SalesOrder-CreateFCL":{appName:"SalesOrderCreateFCL",appPath:"/apps/salesorder-CreateFCL/webapp"},"SalesOrder":{appName:"SalesOrder",appPath:"/apps/salesorder/webapp"}};return o[A];};a.isOfType=function(t,v,n){var V=Array.isArray(v)?v:[v];return V.reduce(function(i,T){if(i){return true;}if(T===null||T===undefined){return t===T;}if(t===null||t===undefined){return!!n;}if(typeof T==="function"){if(T===Boolean){return typeof t==="boolean";}if(T===Array){return Array.isArray(t);}if(T===String){return typeof t==="string"||t instanceof String;}if(T===Object){return typeof t==="object"&&t.constructor===Object;}if(T===Number){return typeof t==="number";}return t instanceof T;}return typeof t===T;},false);};a.isArguments=function(v){return Object.prototype.toString.call(v)==="[object Arguments]";};a.parseArguments=function(e){var A=Array.prototype.slice.call(arguments,1);if(A.length===1&&a.isArguments(A[0])){A=Array.prototype.slice.call(A[0],0);}return e.reduce(function(b,E){if(a.isOfType(A[0],E,true)){b.push(A.shift());}else{b.push(undefined);}return b;},[]);};a.formatObject=function(o){if(a.isOfType(o,[null,undefined])){return"";}if(a.isOfType(o,Array)){return("["+o.map(function(e){return a.formatObject(e);}).join(", ")+"]");}if(a.isOfType(o,Object)){return("{"+Object.keys(o).map(function(k){return k+": "+a.formatObject(o[k]);}).join(", ")+"}");}return o.toString();};a.formatMessage=function(M){var p=Array.prototype.slice.call(arguments,1).map(function(P){return a.formatObject(P);});return f(M&&M.replace(/'/g,"''"),p);};a.mergeObjects=function(){return m.apply(this,[{}].concat(Array.prototype.slice.call(arguments)));};a.getAggregation=function(M,A){if(!M){return null;}var b=M["get"+c(A,0)];if(!b){throw new Error("Object '"+M+"' does not have an aggregation called '"+A+"'");}return b.call(M);};a.pushToArray=function(e,t,A){if(t===undefined){t=[];}else if(!Array.isArray(t)){t=[t];}else{t=t.slice(0);}if(Array.isArray(e)){t=A?e.slice(0).concat(t):t.concat(e);}else if(e!==undefined){if(A){t.unshift(e);}else{t.push(e);}}return t;};a.getParametersArray=function(s,A){var A=Array.prototype.slice.call(arguments,1);if(A.length===1&&a.isArguments(A[0])){A=Array.prototype.slice.call(A[0],0);}var p=A[s];if(A.length>s||(p&&!Array.isArray(p))){p=Array.prototype.slice.call(A,s);}return p;};return a;});