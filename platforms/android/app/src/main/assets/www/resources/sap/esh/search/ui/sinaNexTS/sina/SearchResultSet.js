/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var _=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function a(){this.constructor=d;}d.prototype=b===null?Object.create(b):(a.prototype=b.prototype,new a());};})();sap.ui.define(["require","exports","./ResultSet"],function(r,e,R){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.SearchResultSet=void 0;var S=(function(a){_(S,a);function S(p){var b,c,d;var f=a.call(this,p)||this;f.facets=[];f.nlqSuccess=false;f.facets=(b=p.facets)!==null&&b!==void 0?b:f.facets;f.totalCount=(c=p.totalCount)!==null&&c!==void 0?c:f.totalCount;f.nlqSuccess=(d=p.nlqSuccess)!==null&&d!==void 0?d:f.nlqSuccess;return f;}S.prototype.toString=function(){var b=[];for(var c=0;c<arguments.length;c++){b[c]=arguments[c];}var d=[];d.push(R.ResultSet.prototype.toString.apply(this,b));for(var i=0;i<this.facets.length;++i){var f=this.facets[i];d.push(f.toString());}return d.join("\n");};return S;}(R.ResultSet));e.SearchResultSet=S;});})();
