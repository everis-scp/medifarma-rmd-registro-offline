/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/test/Opa','sap/ui/base/Object',"sap/base/Log"],function($,O,U,L){"use strict";var P=U.extend("sap.ui.test.PageObjectFactory");P.create=function(p,f){var m={};for(var s in p){if(p.hasOwnProperty(s)&&$.isEmptyObject(m[s])){m[s]=P._createPageObject({name:s,baseClass:p[s].baseClass||f,namespace:p[s].namespace||"sap.ui.test.opa.pageObject",view:e(p[s]),actions:p[s].actions,assertions:p[s].assertions});}}return m;};P._createPageObject=function(p){var o={};["actions","assertions"].forEach(function(s){var f=_(s,p);var g=new f();b(g,p.view);d(g,s);c(g,s,p.name);o[s]=g;});return o;};function _(o,p){var C=a(p.namespace,p.name,o);var f=p.baseClass.extend(C);for(var m in p[o]){if(p[o].hasOwnProperty(m)){f.prototype[m]=p[o][m];}}return f;}function a(n,p,o){var C=n+"."+p+"."+o;var f=$.sap.getObject(C,NaN);if(f){L.error("Opa5 Page Object namespace clash: You have loaded multiple page objects with the same name '"+C+"'. "+"To prevent override, specify the namespace parameter.");}return C;}function b(o,v){if(!$.isEmptyObject(v)&&o.waitFor){var f=o.waitFor;o.waitFor=function(g){return f.call(this,$.extend(true,{},v,g));};}}function c(o,s,p){if(s==="actions"){O.config.arrangements[p]=o;O.config.actions[p]=o;}else if(s==="assertions"){O.config.assertions[p]=o;}}function d(o,s){if(O.config.testLibs){for(var t in O.config.testLibs){if(O.config.testLibBase&&!$.isEmptyObject(O.config.testLibBase[t])){var f=Object.getPrototypeOf(o);f[t]={};var T=O.config.testLibBase[t][s];if(T){for(var m in T){if(T.hasOwnProperty(m)){f[t][m]=T[m].bind(o);}}}}}}}function e(p){var v={};["viewName","viewId"].forEach(function(s){if(p[s]){v[s]=p[s];}});return v;}return P;});
