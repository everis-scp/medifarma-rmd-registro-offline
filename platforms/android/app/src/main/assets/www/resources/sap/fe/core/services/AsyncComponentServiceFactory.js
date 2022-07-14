/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/service/ServiceFactory","sap/ui/core/service/Service"],function(S,a){"use strict";function _(i,C){if(!(i instanceof C)){throw new TypeError("Cannot call a class as a function");}}function b(t,p){for(var i=0;i<p.length;i++){var e=p[i];e.enumerable=e.enumerable||false;e.configurable=true;if("value"in e)e.writable=true;Object.defineProperty(t,e.key,e);}}function c(C,p,s){if(p)b(C.prototype,p);if(s)b(C,s);return C;}function d(s,e){if(typeof e!=="function"&&e!==null){throw new TypeError("Super expression must either be null or a function");}s.prototype=Object.create(e&&e.prototype,{constructor:{value:s,writable:true,configurable:true}});if(e)f(s,e);}function f(o,p){f=Object.setPrototypeOf||function f(o,p){o.__proto__=p;return o;};return f(o,p);}function g(D){return function(){var e=l(D),r;if(k()){var N=l(this).constructor;r=Reflect.construct(e,arguments,N);}else{r=e.apply(this,arguments);}return h(this,r);};}function h(s,e){if(e&&(typeof e==="object"||typeof e==="function")){return e;}return j(s);}function j(s){if(s===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return s;}function k(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}function l(o){l=Object.setPrototypeOf?Object.getPrototypeOf:function l(o){return o.__proto__||Object.getPrototypeOf(o);};return l(o);}var A=function(e){d(A,e);var i=g(A);function A(){_(this,A);return i.apply(this,arguments);}c(A,[{key:"init",value:function p(){var n=this;this.initPromise=new Promise(function(r,q){n.resolveFn=r;n.rejectFn=q;});var C=this.getContext();var o=C.scopeObject;var s=o._getManifestEntry("/sap.ui5/services",true);Promise.all(Object.keys(s).filter(function(q){return s[q].startup==="waitFor"&&s[q].factoryName!=="sap.fe.core.services.AsyncComponentService";}).map(function(q){return o.getService(q).then(function(r){var M="get".concat(q[0].toUpperCase()).concat(q.substr(1));if(!o.hasOwnProperty(M)){o[M]=function(){return r;};}});})).then(function(){return o.pRootControlLoaded||Promise.resolve();}).then(function(){if(o.onServicesStarted){o.onServicesStarted();}n.resolveFn(n);}).catch(this.rejectFn);}}]);return A;}(a);var m=function(e){d(m,e);var i=g(m);function m(){_(this,m);return i.apply(this,arguments);}c(m,[{key:"createInstance",value:function o(s){var n=new A(s);return n.initPromise;}}]);return m;}(S);return m;},false);
