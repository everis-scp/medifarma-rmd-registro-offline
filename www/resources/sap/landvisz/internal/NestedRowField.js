/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2013 SAP AG. All rights reserved
 */
sap.ui.define(["sap/landvisz/library","sap/ui/core/Control","sap/ui/commons/Image","sap/ui/commons/Label","sap/ui/commons/TextView","./NestedRowFieldRenderer"],function(l,C,I,L,T,N){"use strict";var E=l.EntityCSSSize;var a=C.extend("sap.landvisz.internal.NestedRowField",{metadata:{library:"sap.landvisz",properties:{label:{type:"string",group:"Data",defaultValue:null},values:{type:"string[]",group:"Data",defaultValue:null},renderingSize:{type:"sap.landvisz.EntityCSSSize",group:"Dimension",defaultValue:E.Regular},iconTitle:{type:"string",group:"Data",defaultValue:null},type:{type:"string",group:"Identification",defaultValue:null},valueType:{type:"string",group:"Identification",defaultValue:null},rightIconSrc:{type:"string",group:"Data",defaultValue:null},linkSource:{type:"string",group:"Data",defaultValue:null}},aggregations:{linearRows:{type:"sap.landvisz.internal.LinearRowField",multiple:true,singularName:"linearRow"}}}});a.prototype.init=function(){this.initializationDone=false;};a.prototype.exit=function(){this.oNestedRowFieldLabel&&this.oNestedRowFieldLabel.destroy();this.oNestedRowFieldValue&&this.oNestedRowFieldValue.destroy();this.iconType&&this.iconType.destroy();this.iconValue&&this.iconValue.destroy();};a.prototype.initControls=function(){var n=this.getId();if(!this.oNestedRowFieldLabel)this.oNestedRowFieldLabel=new L(n+"-CLVConNestedLabel");if(!this.oNestedRowFieldValue)this.oNestedRowFieldValue=new T(n+"-CLVConNestedValue");if(!this.iconLabel)this.iconLabel=new I(n+"-CLVDataLabelImg");if(!this.iconValue)this.iconValue=new I(n+"-CLVDataValueImg");};return a;});