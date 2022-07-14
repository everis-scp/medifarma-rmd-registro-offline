/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["./SearchHelper","./error/errors"],function(S,e){"use strict";var a=function(){this.init.apply(this,arguments);};a.prototype={init:function(p){this.model=p.model;},parseUrlParameters:function(p){if(p.top){var t=parseInt(p.top,10);this.model.setTop(t,false);}var d=this.model.sinaNext.allDataSource;if(p.datasource){var b=JSON.parse(p.datasource);var c=b.ObjectName.value;switch(b.Type){case"Category":if(c==="$$ALL$$"){d=this.model.sinaNext.allDataSource;}else{d=this.model.sinaNext.getDataSource(c);if(!d){d=this.model.sinaNext._createDataSource({type:this.model.sinaNext.DataSourceType.Category,id:c,label:b.label,labelPlural:b.labelPlural,});}}break;case"BusinessObject":d=this.model.sinaNext.getDataSource(c);if(!d){d=this.model.sinaNext.allDataSource;delete p.filter;sap.m.MessageBox.show(sap.esh.search.ui.resources.i18n.getText("searchUrlParsingErrorLong")+"\n(Unknow datasource "+c+")",{icon:sap.m.MessageBox.Icon.ERROR,title:sap.esh.search.ui.resources.i18n.getText("searchUrlParsingError"),actions:[sap.m.MessageBox.Action.OK],});}break;default:{var i=new Error("Unknown datasource type "+b.Type);throw new e.UnknownDataSourceType(i);}}}return S.convertPromiseTojQueryDeferred(this.model.sinaNext.loadMetadata(d)).then(function(){var f={dataSource:d,};var r;if(p.filter){var g=JSON.parse(p.filter);r=this.parseCondition(f,g);}else{r=this.model.sinaNext.createComplexCondition();}var h=this.model.sinaNext.createFilter({dataSource:d,searchTerm:p.searchterm,rootCondition:r,});this.model.setProperty("/uiFilter",h);this.model.setDataSource(h.dataSource,false);}.bind(this));},parseCondition:function(c,b){if(b.conditions){return this.parseComplexCondition(c,b);}return this.parseSimpleCondition(c,b);},parseComplexCondition:function(c,b){var s=[];for(var i=0;i<b.conditions.length;++i){var d=b.conditions[i];s.push(this.parseCondition(c,d));}return this.model.sinaNext.createComplexCondition({operator:b.operator,conditions:s,valueLabel:b.label,});},parseSimpleCondition:function(c,b){c.attribute=b.attribute;return this.model.sinaNext.createSimpleCondition({attribute:b.attribute,attributeLabel:b.attributeLabel,value:this.parseValue(c,b.value),valueLabel:b.valueLabel||b.label,operator:this.parseOperator(c,b.operator),});},parseValue:function(c,v){var m=c.dataSource.getAttributeMetadata(c.attribute);return this.model.sinaNext.inav2TypeConverter.ina2Sina(m.type,v);},parseOperator:function(c,o){switch(o){case"=":return this.model.sinaNext.ComparisonOperator.Eq;case">":return this.model.sinaNext.ComparisonOperator.Gt;case">=":return this.model.sinaNext.ComparisonOperator.Ge;case"<":return this.model.sinaNext.ComparisonOperator.Lt;case"<=":return this.model.sinaNext.ComparisonOperator.Le;default:throw"Unknown operator "+o;}},};return a;});