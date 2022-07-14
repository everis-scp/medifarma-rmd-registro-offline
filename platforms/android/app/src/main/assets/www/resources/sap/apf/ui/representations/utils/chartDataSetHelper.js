/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP SE. All rights reserved
 */
sap.ui.define(["sap/apf/ui/representations/utils/displayOptionHandler","sap/ui/thirdparty/jquery"],function(d,q){"use strict";sap.apf.ui.representations.utils.ChartDataSetHelper=function(f,t){this.oFormatter=f;this.aDataResponseWithDisplayValue=[];this.oDisplayOptionHandler=new sap.apf.ui.representations.utils.DisplayOptionHandler();this.oTimeAxisDateConverter=t;this.oChartDataSet={};};sap.apf.ui.representations.utils.ChartDataSetHelper.getFieldNameForOriginalContentOfProperty=function(p){return"original_"+p;};function _(p,r){var P=p.map(function(s){return s.fieldName;});return P.indexOf(r)===-1?true:false;}function a(f){var p=f.dimensions.concat(f.measures),P;p.forEach(function(o){for(P in o){if((P!=='name')&&(P!=='value')&&(P!=='dataType')&&(P!=='displayValue')&&(P!=='identity')){delete o[P];}}});}function b(c,p,m,D){var e=q.extend(true,[],D);var C,f={};c.oTimeAxisDateConverter.createPropertyInfo(p.dimensions);var P=p.dimensions.concat(p.requiredFilters);P.forEach(function(g,n){var l=p.requiredFilterOptions?p.requiredFilterOptions.labelDisplayOption:undefined;var L=g.labelDisplayOption?g.labelDisplayOption:l;var s=g.fieldName?g.fieldName:g;if(L===undefined||L===sap.apf.core.constants.representationMetadata.labelDisplayOptions.TEXT){return e;}e.forEach(function(h,i){h[s]=(h[s]===null||h[s]===undefined)?h[s]:h[s].toString();if(L===sap.apf.core.constants.representationMetadata.labelDisplayOptions.KEY){C="formatted_"+s;if(!e[i][C]){e[i][C]=c.oFormatter.getFormattedValue(s,e[i][s]);}}if(L===sap.apf.core.constants.representationMetadata.labelDisplayOptions.KEY_AND_TEXT){var j=m.getPropertyMetadata(s).text;C=s+"_"+j;var t={text:e[i][j],key:e[i][s]};e[i][C]=c.oFormatter.getFormattedValueForTextProperty(s,t);}if(c.oTimeAxisDateConverter.bIsConversionToDateRequired(g.fieldName,m)){var o=h[s];var k=sap.apf.ui.representations.utils.ChartDataSetHelper.getFieldNameForOriginalContentOfProperty(s);if(h[k]){f[o]=h[k];}else{var r=sap.apf.utils.convertFiscalYearMonthDayToDateString(o)+"";f[r]=o;h[s]=r;h[k]=o;}}});});c.oTimeAxisDateConverter.setConvertedDateLookUp(f);return e;}sap.apf.ui.representations.utils.ChartDataSetHelper.prototype.constructor=sap.apf.ui.representations.utils.ChartDataSetHelper;sap.apf.ui.representations.utils.ChartDataSetHelper.prototype.createFlattenDataSet=function(p,m,D,A){var s=this;this.aDataResponseWithDisplayValue=b(this,p,m,D);p.dimensions.forEach(function(e,i){e.name=s.oDisplayOptionHandler.getDisplayNameForDimension(e,m,A);e.value='{'+e.fieldName+'}';e.identity=e.fieldName;e.displayValue='{'+s.oDisplayOptionHandler.getColumnNameBasedOnDisplayOption(e.fieldName,e.labelDisplayOption,m)+'}';});p.measures.forEach(function(e){e.name=s.oDisplayOptionHandler.getDisplayNameForMeasure(e,m,D,A);e.value='{'+e.fieldName+'}';e.identity=e.fieldName;});var c={dimensions:p.dimensions,measures:p.measures};var r=p.requiredFilters[0];this.oChartDataSet=q.extend(true,{},c);this.oChartDataSet.context=[];a(this.oChartDataSet);if(r&&_(p.dimensions,r)){this.oChartDataSet.context.push(r);this.oChartDataSet.dimensions.push({name:r,value:"{"+r+"}",identity:r});}this.oChartDataSet.data={path:"/data"};};sap.apf.ui.representations.utils.ChartDataSetHelper.prototype.addUnusedDimensionsToChartContext=function(m,D){if(D.length===0){return;}var u=[];this.oChartDataSet.dimensions.forEach(function(e){var f=e.identity;u.push(f);var t=m.getPropertyMetadata(f).text;if(t){u.push(t);}});this.oChartDataSet.measures.forEach(function(e){u.push(e.identity);});var c=Object.keys(D[0]);c.forEach(function(e){if(u.indexOf(e)>=0||e==="__metadata"){return;}var p=m.getPropertyMetadata(e);if(p&&p["aggregation-role"]==="measure"){return;}this.addPropertyToContext(e,p);}.bind(this));};sap.apf.ui.representations.utils.ChartDataSetHelper.prototype.addPropertyToContext=function(p,c){var e=c&&c.label?c.label:p;this.oChartDataSet.context.push(p);this.oChartDataSet.dimensions.push({name:e,value:"{"+p+"}",identity:p});};sap.apf.ui.representations.utils.ChartDataSetHelper.prototype.getFlattenDataSet=function(){return new sap.viz.ui5.data.FlattenedDataset(this.oChartDataSet);};sap.apf.ui.representations.utils.ChartDataSetHelper.prototype.getModel=function(){var m=new sap.ui.model.json.JSONModel({data:this.aDataResponseWithDisplayValue});return m;};});