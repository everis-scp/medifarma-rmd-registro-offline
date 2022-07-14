/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports","../../sina/AttributeType","../../sina/util","../../core/errors"],function(r,e,A,s,a){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.addLeadingZeros=e.sina2OdataString=e.sina2OdataDate=e.odata2SinaDate=e.sina2OdataTime=e.odata2SinaTime=e.sina2OdataTimestamp=e.odata2SinaTimestamp=e.odata2Sina=e.sina2Odata=void 0;function b(l,v,m){if(m===void 0){m={};}switch(l){case A.AttributeType.Double:return v.toString();case A.AttributeType.Integer:return v.toString();case A.AttributeType.String:return this.sina2OdataString(v,m);case A.AttributeType.ImageUrl:return v;case A.AttributeType.ImageBlob:throw new a.NotImplementedError();case A.AttributeType.GeoJson:return v;case A.AttributeType.Date:return this.sina2OdataDate(v);case A.AttributeType.Time:return this.sina2OdataTime(v);case A.AttributeType.Timestamp:return this.sina2OdataTimestamp(v);default:throw new a.UnknownAttributeTypeError("unknown attribute type "+l);}}e.sina2Odata=b;function o(l,v){switch(l){case A.AttributeType.Double:return parseFloat(v);case A.AttributeType.Integer:return parseInt(v,10);case A.AttributeType.String:return v;case A.AttributeType.ImageUrl:return v;case A.AttributeType.ImageBlob:throw new a.NotImplementedError();case A.AttributeType.GeoJson:return v;case A.AttributeType.Date:return this.odata2SinaDate(v);case A.AttributeType.Time:return this.odata2SinaTime(v);case A.AttributeType.Timestamp:return this.odata2SinaTimestamp(v);default:throw new a.UnknownAttributeTypeError("unknown attribute type "+l);}}e.odata2Sina=o;function c(v){if(v===void 0){v="";}if(v.length===0){return"";}v=v.trim();var y=parseInt(v.slice(0,4),10);var m=parseInt(v.slice(5,7),10);var l=parseInt(v.slice(8,10),10);var n=parseInt(v.slice(11,13),10);var p=parseInt(v.slice(14,16),10);var q=parseInt(v.slice(17,19),10);var t=parseInt(v.slice(20,20+6),10);return new Date(Date.UTC(y,m-1,l,n,p,q,t/1000));}e.odata2SinaTimestamp=c;function d(v){if(typeof v==="string"){if(v.length===0){return"";}if(v==="$$now$$"){v=new Date();}}var y=v.getUTCFullYear();var m=v.getUTCMonth()+1;var l=v.getUTCDate();var n=v.getUTCHours();var p=v.getUTCMinutes();var q=v.getUTCSeconds();var t=v.getUTCMilliseconds()*1000;var u=this.addLeadingZeros(y.toString(),4)+"-"+this.addLeadingZeros(m.toString(),2)+"-"+this.addLeadingZeros(l.toString(),2)+"T"+this.addLeadingZeros(n.toString(),2)+":"+this.addLeadingZeros(p.toString(),2)+":"+this.addLeadingZeros(q.toString(),2)+"."+this.addLeadingZeros(t.toString(),7)+"Z";return u;}e.sina2OdataTimestamp=d;function f(v){if(v.length===0){return"";}v=v.trim();return v;}e.odata2SinaTime=f;function g(v){if(v.length===0){return"";}return v;}e.sina2OdataTime=g;function h(v){if(v.length===0){return"";}v=v.trim();return v.slice(0,4)+"/"+v.slice(5,7)+"/"+v.slice(8,10);}e.odata2SinaDate=h;function i(v){if(v.length===0){return"";}return v.slice(0,4)+"-"+v.slice(5,7)+"-"+v.slice(8,10);}e.sina2OdataDate=i;function j(v,l){return s.convertOperator2Wildcards(v,l.operator);}e.sina2OdataString=j;function k(v,l){return"00000000000000".slice(0,l-v.length)+v;}e.addLeadingZeros=k;});})();