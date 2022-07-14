/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports","../../core/errors","../../sina/AttributeType","../../sina/ComparisonOperator","../../sina/ComplexCondition","./typeConverter"],function(r,e,a,A,C,b,t){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.serialize=void 0;var c=(function(){function c(d){this.dataSource=d;}c.prototype.convertSinaToInaOperator=function(d){switch(d){case C.ComparisonOperator.Eq:return"=";case C.ComparisonOperator.Lt:return"<";case C.ComparisonOperator.Gt:return">";case C.ComparisonOperator.Le:return"<=";case C.ComparisonOperator.Ge:return">=";case C.ComparisonOperator.Co:return"=";case C.ComparisonOperator.Bw:return"=";case C.ComparisonOperator.Ew:return"=";default:throw new a.UnknownComparisonOperatorError("unknow comparison operator "+d);}};c.prototype.serializeComplexCondition=function(d){var f={Selection:{Operator:{Code:d.operator,SubSelections:[],},},};var g=d.conditions;for(var i=0;i<g.length;++i){var h=g[i];f.Selection.Operator.SubSelections.push(this.serialize(h));}return f;};c.prototype.serializeSimpleCondition=function(d){if(!d.value){return undefined;}var f=d.attribute;var g;if(f.slice(0,2)==="$$"){g=A.AttributeType.String;}else{var m=this.dataSource.getAttributeMetadata(f);g=m.type;}var o="MemberOperand";if(f==="$$SuggestionTerms$$"||f==="$$SearchTerms$$"){o="SearchOperand";}var h={};h[o]={AttributeName:f,Comparison:this.convertSinaToInaOperator(d.operator),Value:t.sina2Ina(g,d.value,{operator:d.operator,}),};return h;};c.prototype.serialize=function(d){if(d instanceof b.ComplexCondition){return this.serializeComplexCondition(d);}return this.serializeSimpleCondition(d);};return c;}());function s(d,f){var g=new c(d);return g.serialize(f);}e.serialize=s;});})();