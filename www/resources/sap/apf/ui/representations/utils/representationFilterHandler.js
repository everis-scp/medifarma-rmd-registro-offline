/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/ui/representations/utils/displayOptionHandler","sap/apf/utils/utils","sap/apf/core/metadataProperty","sap/ui/thirdparty/jquery"],function(d,u,m,q){"use strict";function _(f){return f.filter(function(i,n,F){return F.indexOf(i)===n;});}function a(r,M,b){var n,s;var R=r.oParameter.requiredFilters[0];if(R){var l=r.oParameter.requiredFilterOptions?r.oParameter.requiredFilterOptions.labelDisplayOption:undefined;var c=r.oDisplayOptionHandler.getColumnNameBasedOnDisplayOption(R,l,M);var p=new sap.apf.core.MetadataProperty(M.getPropertyMetadata(c));r.aFilterValues.forEach(function(f){for(n=0;n<b.length;n++){if(b[n][R]===f){if(b[n]["formatted_"+c]){s=b[n]["formatted_"+c];}else{s=sap.apf.utils.convertToExternalFormat(b[n][c],p);}break;}}r.filterValueLookup[f]=s;});}}sap.apf.ui.representations.utils.RepresentationFilterHandler=function(A,p,t){this.oApi=A;this.aFilterValues=[];this.oParameter=p;this.sRequiredFilter=this.oParameter.requiredFilters[0];this.oDisplayOptionHandler=new sap.apf.ui.representations.utils.DisplayOptionHandler();this.filterValueLookup={};this.oTimeAxisDateConverter=t;};sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.constructor=sap.apf.ui.representations.utils.RepresentationFilterHandler;sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.setMetadataAndDataResponse=function(M,D){this.oMetadata=M;this.aDataResponse=D;};sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.validateFiltersWithDataset=function(){var v=[];var A=this.aDataResponse.map(function(D){return D[this.sRequiredFilter];}.bind(this));v=this.aFilterValues.filter(function(f){return A.indexOf(f)!==-1;});this.aFilterValues=v;};sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.createFilterFromSelectedValues=function(n){var f=this,i=false,v;var F=this.oApi.createFilter();if(n&&n.length>0){this.aFilterValues=_(n.concat(this.aFilterValues));}var A=F.getTopAnd().addOr('exprssionOr');var E=F.getOperators().EQ;i=f.oTimeAxisDateConverter.bIsConversionToDateRequired(this.oParameter.requiredFilters[0],this.oMetadata);this.aFilterValues.forEach(function(r){if(i){v=f.oTimeAxisDateConverter.getConvertedDateLookUp()[r]||r;}else{v=r;}var o={id:r,name:f.sRequiredFilter,operator:E,value:v};A.addExpression(o);});return F;};sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.updateFilterFromSelection=function(f){var U=_(f);this.aFilterValues=U.slice(0);};sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.clearFilters=function(){this.aFilterValues=[];};sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.getDisplayInfoForFilters=function(M,b){var f=[],r=this;a(r,M,b);r.aFilterValues.forEach(function(c){var F={id:c,text:r.filterValueLookup[c]};f.push(F);});return f;};sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.getFilterValues=function(){return this.aFilterValues;};sap.apf.ui.representations.utils.RepresentationFilterHandler.prototype.getIfSelectedFilterChanged=function(n){var i=(q(this.aFilterValues).not(n).length===0)&&(q(n).not(this.aFilterValues).length===0);return!i;};});