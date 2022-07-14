/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/base/util/isEmptyObject","sap/ui/core/format/NumberFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/SimpleType","sap/ui/model/ValidateException"],function(e,i,N,F,P,S,V){"use strict";var a=S.extend("sap.ui.model.type.Float",{constructor:function(){S.apply(this,arguments);this.sName="Float";}});a.prototype.formatValue=function(v,I){var f=v;if(v==undefined||v==null){return null;}if(this.oInputFormat){f=this.oInputFormat.parse(v);if(f==null){throw new F("Cannot format float: "+v+" has the wrong format");}}switch(this.getPrimitiveType(I)){case"string":return this.oOutputFormat.format(f);case"int":return Math.floor(f);case"float":case"any":return f;default:throw new F("Don't know how to format Float to "+I);}};a.prototype.parseValue=function(v,I){var r,b;switch(this.getPrimitiveType(I)){case"string":r=this.oOutputFormat.parse(v);if(isNaN(r)){b=sap.ui.getCore().getLibraryResourceBundle();throw new P(b.getText("Float.Invalid"));}break;case"int":case"float":r=v;break;default:throw new P("Don't know how to parse Float from "+I);}if(this.oInputFormat){r=this.oInputFormat.format(r);}return r;};a.prototype.validateValue=function(v){if(this.oConstraints){var b=sap.ui.getCore().getLibraryResourceBundle(),c=[],m=[],f=v,t=this;if(this.oInputFormat){f=this.oInputFormat.parse(v);}e(this.oConstraints,function(n,C){switch(n){case"minimum":if(f<C){c.push("minimum");m.push(b.getText("Float.Minimum",[t.oOutputFormat.format(C)]));}break;case"maximum":if(f>C){c.push("maximum");m.push(b.getText("Float.Maximum",[t.oOutputFormat.format(C)]));}}});if(c.length>0){throw new V(this.combineMessages(m),c);}}};a.prototype.setFormatOptions=function(f){this.oFormatOptions=Object.assign(f.style!=="short"&&f.style!=="long"?{preserveDecimals:true}:{},f);this._createFormats();};a.prototype._handleLocalizationChange=function(){this._createFormats();};a.prototype._createFormats=function(){var s=this.oFormatOptions.source;this.oOutputFormat=N.getFloatInstance(this.oFormatOptions);if(s){if(i(s)){s={groupingEnabled:false,groupingSeparator:",",decimalSeparator:"."};}this.oInputFormat=N.getFloatInstance(s);}};return a;});
