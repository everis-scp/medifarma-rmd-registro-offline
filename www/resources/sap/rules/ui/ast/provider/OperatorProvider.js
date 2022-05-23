sap.ui.define(["sap/rules/ui/ast/model/Operator"],function(O){'use strict';var i;var a=function(){this._operatorsBusinessDataTypeMap={};this._operatorsDataObjectTypeMap={};this._operatorsCategoryMap={};this._operatorsNameMap={};this._operatorsLabelMap={};};a.prototype.reset=function(){this._operatorsBusinessDataTypeMap={};this._operatorsDataObjectTypeMap={};this._operatorsCategoryMap={};this._operatorsNameMap={};this._operatorsLabelMap={};};a.prototype.getAllOperators=function(){var v=[];var t=this;if(this._operatorsNameMap){v=Object.keys(this._operatorsNameMap).map(function(o){return t._operatorsNameMap[o];});}return v;};a.prototype.getOperatorByName=function(n){return this._operatorsNameMap[n];};a.prototype.addOperatorToNameMap=function(o){var n=o.getName();this._operatorsNameMap[n]=o;};a.prototype.getOperatorByLabel=function(l){return this._operatorsLabelMap[l];};a.prototype.addOperatorToLabelMap=function(o){var l=o.getLabel();if(l)this._operatorsLabelMap[l]=o;};a.prototype.getAllOperatorsByBusinessDataType=function(t){return this._operatorsBusinessDataTypeMap[t];};a.prototype.getAllOperatorsByDataObjectType=function(t){return this._operatorsDataObjectTypeMap[t];};a.prototype.getAllOperatorsByCategory=function(t){return this._operatorsCategoryMap[t];};a.prototype.createOperator=function(n,b,r,c,l,d,s){return new O().setName(n).setLabel(l).setNumberOfArguments(b).setReturnValueBussinessDataTypeCollection(r).setReturnValueDataObjectTypeCollection(c).setCategory(d).setSupportedFunctions(s);};a.prototype.addOperatorToBusinessDataTypeMap=function(o){var b=o.getReturnValueBussinessDataTypeCollection();for(var t in b){if(!this._operatorsBusinessDataTypeMap[t]){this._operatorsBusinessDataTypeMap[t]=[];}this._operatorsBusinessDataTypeMap[t].push(o);}};a.prototype.addOperatorToDataObjectTypeMap=function(o){var b=o.getReturnValueDataObjectTypeCollection();for(var t in b){if(!this._operatorsDataObjectTypeMap[t]){this._operatorsDataObjectTypeMap[t]=[];}this._operatorsDataObjectTypeMap[t].push(o);}};a.prototype.addOperatorToCategoryMap=function(o){var b=o.getCategory();if(!this._operatorsCategoryMap[b]){this._operatorsCategoryMap[b]=[];}this._operatorsCategoryMap[b].push(o);};return{getInstance:function(){if(!i){i=new a();i.constructor=null;}return i;}};},true);
