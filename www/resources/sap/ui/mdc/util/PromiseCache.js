/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object"],function(B){"use strict";var _=function(n){if(!n){throw new Error("PromiseCache: Please provide an identifier!");}if(this._oCache&&this._oCache[n]){this.remove.call(this,n);}};var a=function(p){if(typeof p==="object"&&this._oCache){for(var k in this._oCache){if(this._oCache[k].promise===p){return k;}}}};var b=function(p,t){var k=typeof p==="string"?p:a.call(this,p);var c=k&&this._oCache&&this._oCache[k];if(t&&!c){throw new Error("PromiseCache: Promise not found!");}return c;};var P=B.extend("sap.ui.mdc.util.PromiseCache",{constructor:function(){this._oCache={};},add:function(n,c){_.call(this,n);var p={};this._oCache[n]=p;p.promise=new Promise(function(r,e){p.resolve=function(R){if(!p._isCanceled){p._isSettled=true;r(R);}};p.reject=function(E){if(!p._isCanceled){p._isSettled=true;e(E);}};});p.promise.isSettled=function(){return!!p._isSettled;};p.promise.isCanceled=function(){return!!p._isCanceled;};p.promise.getInternalPromise=function(){return p._promise;};if(c){var i=typeof c==="function";var I=!i&&typeof c.then==="function";if(!i&&!I){throw new Error("PromiseCache: fnCreate must be a promise or function");}var C=i?c():c;var d=C&&typeof C.then==="function";if(d){p._promise=C;p._promise.then(function(r){if(!p._isCanceled){p._isSettled=true;p.resolve(r);}return r;},function(e){if(!p._isCanceled){p._isSettled=true;p.reject(e);}});}else{p.resolve(C);}}return this._oCache[n].promise;},cancel:function(p){var o=b.call(this,p,true);if(!o._isSettled){o._isCanceled=true;}return o.promise;},retrieve:function(n,c){var p=this._oCache&&this._oCache[n];if(!p&&c){return this.add.apply(this,[n,c]);}return p&&p.promise;},retrieveMany:function(){var r=[];var k=arguments.length?[].slice.call(arguments):Object.keys(this._oCache);for(var i=0;i<k.length;i++){r.push(this.retrieve(k[i].toString()));}return r;},remove:function(p){var k=typeof p==="string"?p:a.call(this,p);var c=k&&this._oCache&&this._oCache[k];if(c){c._isCanceled=true;delete this._oCache[k];}},resolve:function(p,v){var c=b.call(this,p,true);c.resolve(v);return c.promise;},reject:function(p,v){var c=b.call(this,p,true);c.reject(v);return c.promise;},clear:function(){Object.keys(this._oCache).forEach(function(k){this.remove(k);}.bind(this));},destroy:function(){this.clear();this._oCache=null;}});return P;});
