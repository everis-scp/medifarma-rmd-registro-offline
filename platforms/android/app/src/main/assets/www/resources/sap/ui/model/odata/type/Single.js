/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/core/format/NumberFormat","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType"],function(L,N,F,P,V,O){"use strict";function g(){return sap.ui.getCore().getLibraryResourceBundle().getText("EnterNumber");}function a(t){var f,T;if(!t.oFormat){f={groupingEnabled:true};T=t.oFormatOptions||{};if(T.style!=="short"&&T.style!=="long"){f.preserveDecimals=true;}Object.assign(f,t.oFormatOptions);t.oFormat=N.getFloatInstance(f);}return t.oFormat;}function i(t){return!t.oConstraints||t.oConstraints.nullable!==false;}function s(t,c){var n;t.oConstraints=undefined;if(c){n=c.nullable;if(n===false||n==="false"){t.oConstraints={nullable:false};}else if(n!==undefined&&n!==true&&n!=="true"){L.warning("Illegal nullable: "+n,null,t.getName());}}t._handleLocalizationChange();}var S=O.extend("sap.ui.model.odata.type.Single",{constructor:function(f,c){O.apply(this,arguments);this.oFormatOptions=f;s(this,c);}});S.prototype.formatValue=function(v,t){var f;if(v===null||v===undefined){return null;}if(typeof v==="number"){f=v;}else if(typeof v==="string"){f=parseFloat(v);}else if(t!=="any"){throw new F("Illegal "+this.getName()+" value: "+v);}switch(this.getPrimitiveType(t)){case"any":return v;case"float":return f;case"int":return Math.floor(f);case"string":return a(this).format(parseFloat(f.toPrecision(7)));default:throw new F("Don't know how to format "+this.getName()+" to "+t);}};S.prototype.parseValue=function(v,b){var r;if(v===null||v===""){return null;}switch(this.getPrimitiveType(b)){case"string":r=a(this).parse(v);if(isNaN(r)){throw new P(g());}break;case"int":case"float":r=v;break;default:throw new P("Don't know how to parse "+this.getName()+" from "+b);}return Math.fround(r);};S.prototype._handleLocalizationChange=function(){this.oFormat=null;};S.prototype.validateValue=function(v){if(v===null&&i(this)){return;}if(typeof v==="number"){return;}throw new V(g());};S.prototype.getName=function(){return"sap.ui.model.odata.type.Single";};return S;});
