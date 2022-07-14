/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var _=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function a(){this.constructor=d;}d.prototype=b===null?Object.create(b):(a.prototype=b.prototype,new a());};})();sap.ui.define(["require","exports","../core/util","./ComparisonOperator","./Condition","./ConditionType"],function(r,e,u,C,a,b){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.SimpleCondition=void 0;var S=(function(c){_(S,c);function S(p){var d,f,g,h;var i=c.call(this,p)||this;i.type=b.ConditionType.Simple;i.operator=C.ComparisonOperator.Eq;i.operator=(d=p.operator)!==null&&d!==void 0?d:i.operator;i.attribute=(f=p.attribute)!==null&&f!==void 0?f:i.attribute;i.userDefined=(g=p.userDefined)!==null&&g!==void 0?g:i.userDefined;i.value=(h=p.value)!==null&&h!==void 0?h:i.value;return i;}S.prototype.clone=function(){return new S({operator:this.operator,attribute:this.attribute,attributeLabel:this.attributeLabel,value:this.value,valueLabel:this.valueLabel,userDefined:this.userDefined,});};S.prototype.equals=function(o){if(!(o instanceof S)){return false;}if(this.attribute!==o.attribute||this.operator!==o.operator){return false;}if(this.value.equals){return this.value.equals(o.value.equals);}if(this.value instanceof Date&&o.value instanceof Date){return this.value.getTime()===o.value.getTime();}return this.value===o.value;};S.prototype.containsAttribute=function(d){return this.attribute===d;};S.prototype._collectAttributes=function(d){d[this.attribute]=true;};S.prototype._getAttribute=function(){return this.attribute;};S.prototype.removeAttributeConditions=function(d){if(this.attribute===d){throw"program error";}return{deleted:false,attribute:"",value:"",};};S.prototype.toJson=function(){var j;if(this.value instanceof Date){j=u.dateToJson(this.value);}else{j=this.value;}var d={type:b.ConditionType.Simple,operator:this.operator,attribute:this.attribute,value:j,valueLabel:this.valueLabel,attributeLabel:this.attributeLabel,};if(this.userDefined){d.userDefined=true;}return d;};return S;}(a.Condition));e.SimpleCondition=S;});})();
