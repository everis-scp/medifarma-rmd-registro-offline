/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var _=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function a(){this.constructor=d;}d.prototype=b===null?Object.create(b):(a.prototype=b.prototype,new a());};})();sap.ui.define(["require","exports","./SinaObject","./SimpleCondition","./ComplexCondition","./LogicalOperator","../core/errors"],function(r,e,S,a,C,L,b){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.Filter=void 0;var F=(function(c){_(F,c);function F(p){var d,f,g;var h=c.call(this,p)||this;h.searchTerm="";h.rootCondition=new C.ComplexCondition({sina:h.sina});h.dataSource=(d=p.dataSource)!==null&&d!==void 0?d:h.sina.getAllDataSource();h.searchTerm=(f=p.searchTerm)!==null&&f!==void 0?f:h.searchTerm;h.rootCondition=(g=p.rootCondition)!==null&&g!==void 0?g:h.rootCondition;return h;}F.prototype.setSearchTerm=function(s){this.searchTerm=s;};F.prototype.setRootCondition=function(d){this.rootCondition=d;};F.prototype.clone=function(){return new F({sina:this.sina,dataSource:this.dataSource,searchTerm:this.searchTerm,rootCondition:this.rootCondition.clone(),});};F.prototype.equals=function(o){return(o instanceof F&&this.dataSource===o.dataSource&&this.searchTerm===o.searchTerm&&this.rootCondition.equals(o.rootCondition));};F.prototype._getAttribute=function(d){if(d instanceof a.SimpleCondition){return d.attribute;}for(var i=0;i<d.conditions.length;++i){var f=this._getAttribute(d.conditions[i]);if(f){return f;}}};F.prototype.setDataSource=function(d){if(this.dataSource===d){return;}this.dataSource=d;this.resetConditions();};F.prototype.resetConditions=function(){this.rootCondition.resetConditions();};F.prototype.autoInsertCondition=function(d){if(!(this.rootCondition instanceof C.ComplexCondition)){throw new b.CanOnlyAutoInsertComplexConditionError("cannot auto insert condition - condition is not a complex condition");}var f=this._getAttribute(d);var m,g;for(var i=0;i<this.rootCondition.conditions.length;++i){g=this.rootCondition.conditions[i];var h=this._getAttribute(g);if(h===f){m=g;break;}}if(!m){m=this.sina.createComplexCondition({operator:L.LogicalOperator.Or,});this.rootCondition.addCondition(m);}for(var j=0;j<m.conditions.length;++j){g=m.conditions[j];if(g.equals(d)){return;}}m.addCondition(d);};F.prototype.autoRemoveCondition=function(d){var f=function(g,d){for(var i=0;i<g.conditions.length;++i){var s=g.conditions[i];if(s.equals(d)){g.removeConditionAt(i);i--;continue;}if(s instanceof C.ComplexCondition){f(s,d);if(s.conditions.length===0){g.removeConditionAt(i);i--;continue;}}}};f(this.rootCondition,d);};F.prototype.toJson=function(){return{dataSource:this.dataSource.toJson(),searchTerm:this.searchTerm,rootCondition:this.rootCondition.toJson(),};};return F;}(S.SinaObject));e.Filter=F;});})();