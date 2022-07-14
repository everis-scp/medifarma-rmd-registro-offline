/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/Device","sap/ui/base/ManagedObject","sap/base/util/includes","sap/base/util/isPlainObject","sap/ui/dt/DesignTimeStatus"],function(q,D,M,i,a,b){"use strict";var U={};var S="sap.ui.dt";function c(n){return!isNaN(parseFloat(n))&&isFinite(n);}U.wrapError=function(e){var E=e instanceof Error&&e||new Error();if(typeof e==="string"){E.message=e;}return E;};U.isForeignError=function(e,l){if(e instanceof Error){return e.name.indexOf(l||S)===-1;}throw U.createError("Util#isForeignError","Wrong parameter specified");};U.createError=function(l,m,L){var e=new Error();var s=(L||S)+(l?"."+l:"");e.name="Error in "+s;e.message=m;return e;};U.errorToString=function(e){if(typeof e==="string"){return e;}else if(e instanceof Error){var E=e.toString();if(e.stack){E+="\n"+e.stack.replace(E,"").trim();}return E;}throw U.createError("Util#errorToString","Wrong parameter specified");};U.propagateError=function(e,l,m,L){var E=U.wrapError(e);if(U.isForeignError(E,L)){var s=(L||S)+"."+l;var o=[E.name,E.message].join(" - ");E.name="Error in "+s;E.message=U.printf("{0}. Original error: {1}",m,o||"¯\\_(ツ)_/¯");}return E;};U.getObjectType=function(o){return((o instanceof M&&U.printf('{0} (id = "{1}")',o.getMetadata().getName(),o.getId()))||typeof o);};U.printf=function(s){var A=Array.prototype.slice.call(arguments,1);return s.replace(/{(\d+)}/g,function(m,I){return typeof A[I]!=="undefined"?A[I]:m;});};U.objectValues=function(o){return q.map(o,function(v){return v;});};U.isInteger=function(v){return c(v)&&Math.ceil(v)===v;};U.castArray=function(v){var r=[];if(v){if(!Array.isArray(v)){r.push(v);}else{r=v;}}return r;};U.wrapIntoPromise=function(h){if(typeof h!=="function"){throw U.createError("Util#wrapIntoPromise",U.printf("Invalid argument specified. Function is expected, but '{0}' is given",typeof h),"sap.ui.dt");}return function(){var A=Array.prototype.slice.call(arguments);return Promise.resolve().then(function(){return h.apply(null,A);});};};U.isWebkit=function(){return D.browser.webkit&&(D.browser.safari||D.browser.chrome&&D.browser.mobile);};U.waitForSynced=function(d,o){return function(){o=o||function(){};var A=arguments;return new Promise(function(r,R){if(d.getStatus()===b.SYNCING){d.attachEventOnce("synced",function(){r(o.apply(null,A));});d.attachEventOnce("syncFailed",R);}else{r(o.apply(null,A));}});};};return U;},true);
