/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/Component"],function(L,C){"use strict";var e={};var a={};a._sExtensionProvider=null;a.registerExtensionProvider=function(E){a._sExtensionProvider=E;};a.getControllerExtensions=function(c,s,v,A){var m={customizingControllerNames:[],providerControllers:[]};var o=C.get(s);if(o&&o.getLocalId){v=o.getLocalId(v)||v;}var M=r(c,o,v);m.customizingControllerNames=M;if(A){if(a._sExtensionProvider){return l(A).then(function(E){return E.getControllerExtensions(c,s,A,v);}).then(function(b){m.providerControllers=b||[];return m;});}else{return Promise.resolve(m);}}else{if(a._sExtensionProvider){var E=l();if(E){var b=E.getControllerExtensions(c,s,A,v);if(b&&Array.isArray(b)){m.providerControllers=b;}else{L.error("Controller Extension Provider: Error in ExtensionProvider.getControllerExtensions: "+a._sExtensionProvider+" - no valid extensions returned. Return value must be an array of ControllerExtensions.");}}}return m;}};function r(c,o,v){var b=[];var I=C.getCustomizing(o,{type:"sap.ui.controllerExtensions",name:c+"#"+v});var d=[];if(I){d.push(I);}else{var D=C.getCustomizing(o,{type:"sap.ui.controllerExtensions",name:c});if(D){d.push(D);}}for(var i=0;i<d.length;i++){var f=d[i];if(f){var E=typeof f==="string"?f:f.controllerName;b=b.concat(f.controllerNames||[]);if(E){b.unshift(E);}}}return b;}function l(A){var p=a._sExtensionProvider.replace(/\./g,"/"),P=e[p];if(P){return A?Promise.resolve(P):P;}if(p){if(A){return new Promise(function(b,c){sap.ui.require([p],function(d){P=new d();e[p]=P;b(P);},c);});}else{var E=sap.ui.requireSync(p);P=new E();e[p]=P;return P;}}else{return A?Promise.resolve():undefined;}}return a;});
