/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var _=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function a(){this.constructor=d;}d.prototype=b===null?Object.create(b):(a.prototype=b.prototype,new a());};})();sap.ui.define(["require","exports","./ResultSet"],function(r,e,R){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.FacetResultSet=void 0;var F=(function(a){_(F,a);function F(p){return a.call(this,p)||this;}F.prototype.toString=function(){var b=[];for(var c=0;c<arguments.length;c++){b[c]=arguments[c];}var d=[];d.push("--Facet");d.push(R.ResultSet.prototype.toString.apply(this,b));return d.join("\n");};return F;}(R.ResultSet));e.FacetResultSet=F;});})();
