/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/base/util/isEmptyObject","sap/ui/core/format/NumberFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/SimpleType","sap/ui/model/ValidateException"],function(e,i,N,F,P,S,V){"use strict";var I=S.extend("sap.ui.model.type.Integer",{constructor:function(){S.apply(this,arguments);this.sName="Integer";}});I.prototype.formatValue=function(v,s){var a=v;if(v==undefined||v==null){return null;}if(this.oInputFormat){a=this.oInputFormat.parse(v);if(a==null){throw new F("Cannot format float: "+v+" has the wrong format");}}switch(this.getPrimitiveType(s)){case"string":return this.oOutputFormat.format(a);case"int":case"float":case"any":return a;default:throw new F("Don't know how to format Integer to "+s);}};I.prototype.parseValue=function(v,s){var r,b;switch(this.getPrimitiveType(s)){case"string":r=this.oOutputFormat.parse(String(v));if(isNaN(r)){b=sap.ui.getCore().getLibraryResourceBundle();throw new P(b.getText("EnterInt"));}break;case"float":r=Math.floor(v);if(r!=v){b=sap.ui.getCore().getLibraryResourceBundle();throw new P(b.getText("EnterInt"));}break;case"int":r=v;break;default:throw new P("Don't know how to parse Integer from "+s);}if(this.oInputFormat){r=this.oInputFormat.format(r);}return r;};I.prototype.validateValue=function(v){if(this.oConstraints){var b=sap.ui.getCore().getLibraryResourceBundle(),a=[],m=[],c=v,t=this;if(this.oInputFormat){c=this.oInputFormat.parse(v);}e(this.oConstraints,function(n,C){switch(n){case"minimum":if(c<C){a.push("minimum");m.push(b.getText("Integer.Minimum",[t.oOutputFormat.format(C)]));}break;case"maximum":if(c>C){a.push("maximum");m.push(b.getText("Integer.Maximum",[t.oOutputFormat.format(C)]));}}});if(a.length>0){throw new V(this.combineMessages(m),a);}}};I.prototype.setFormatOptions=function(f){this.oFormatOptions=f;this._createFormats();};I.prototype._handleLocalizationChange=function(){this._createFormats();};I.prototype._createFormats=function(){var s=this.oFormatOptions.source;this.oOutputFormat=N.getIntegerInstance(this.oFormatOptions);if(s){if(i(s)){s={groupingEnabled:false,groupingSeparator:",",decimalSeparator:"."};}this.oInputFormat=N.getIntegerInstance(s);}};return I;});
