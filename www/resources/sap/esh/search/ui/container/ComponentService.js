/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.storage",],function(){"use strict";if(!window.sap.ushell){window.sap.ushell={};}if(!window.sap.ushell.Container){window.sap.ushell.Container={};}var m={};jQuery.extend(m,{init:function(){sap.ushell.Container={getService:function(n){if(n==="Search"){return{queryApplications:function(p){return jQuery.when().then(function(){return{totalResults:0,searchTerm:p.searchTerm,getElements:function(){return[];},};});},};}else if(n==="URLParsing"){return{parseParameters:function(s){s=s.substr(1);var r={};var p=s.split("&");for(var i=0;i<p.length;i++){var a=p[i].split("=");if(!a[1]){a[1]="";}r[a[0]]=[a[1]];}return r;},splitHash:function(h){var r={};r.appSpecificRoute=h.substr(14);return r;},};}},getLogonSystem:function(){return{getName:function(){return;},getClient:function(){return;},getPlatform:function(){return;},};},};},});return m;});
