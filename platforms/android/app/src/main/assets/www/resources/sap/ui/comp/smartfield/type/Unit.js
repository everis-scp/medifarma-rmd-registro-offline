/*
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/model/odata/type/Unit","sap/ui/comp/smartfield/type/Decimal","sap/ui/comp/smartfield/type/Int16","sap/ui/comp/smartfield/type/Int32","sap/ui/comp/smartfield/type/Int64","sap/ui/comp/smartfield/type/Byte","sap/ui/comp/smartfield/type/SByte","sap/ui/comp/smartfield/type/Double","sap/ui/model/ValidateException"],function(C,O,D,I,a,b,B,S,c,V){"use strict";var _=/^([-]?)(\d+)(?:\.(\d+))?$/;var U=O.extend("sap.ui.comp.smartfield.type.Unit",{constructor:function(f,o){f.decimals=o.scale;O.apply(this,[f]);this.oConstraints=o;this.sName="Unit";}});U.prototype.parseValue=function(v,i,f){var h=O.prototype.parseValue.apply(this,arguments),s,F,m=Array.isArray(h)&&h[0]&&d(h[0]);if(Array.isArray(m)){s=m[1]+m[2];F=m[3];if(Number.parseInt(F)===0){h[0]=s;}}if(h[1]===undefined){h[1]=f[1];}return h;};U.prototype.validateValue=function(v){var m,s=v[0],n=s===null;if(v[1]&&this.shouldConvertUnitToUpperCase(v[1])){arguments[0][1]=arguments[0][1].toUpperCase();}O.prototype.validateValue.apply(this,arguments);if(this.oConstraints.nullable&&(n||(s===this.oFormatOptions.emptyString))){return;}e.call(this,this.oConstraints.type,s);m=d(s);if(m===null){throw new V(g("EnterNumber"));}var i=parseInt(m[2]),f,u=this.oConstraints&&this.oConstraints.scale,h=i===0?0:m[2].length,F=(m[3]||"").length,j=this.oConstraints&&this.oConstraints.precision,p=typeof j==="number"?j:Infinity,k=v[1],l=this.mCustomUnits&&this.mCustomUnits[k]&&this.mCustomUnits[k].decimals;if(l||l===0){u=l;}if(this.oConstraints&&this.oConstraints.variableScale){f=Math.min(p,u);}else{f=Math.min((this.oConstraints&&this.oConstraints.scale)||0,u);}if(f>p){f=p;}if(F>f){if(f===0){throw new V(g("EnterInt"));}if((h+f)>p){throw new V(g("EnterNumberIntegerFraction",[p-f,f]));}throw new V(g("EnterNumberFraction",[f]));}if(h>(p-f)){throw new V(g("EnterNumberInteger",[p-f]));}};function d(v){return _.exec(v);}function g(k,p){return C.getLibraryResourceBundle().getText(k,p);}function e(t,v){if(t){var T;switch(t){case"Edm.Double":T=new c({},this.oConstraints);break;case"Edm.Decimal":T=new D({},this.oConstraints);break;case"Edm.Int16":T=new I({},this.oConstraints);break;case"Edm.Int32":T=new a({},this.oConstraints);break;case"Edm.Int64":T=new b({},this.oConstraints);break;case"Edm.Byte":T=new B({},this.oConstraints);break;case"Edm.SByte":T=new S({},this.oConstraints);break;}T.validateValue(v);}}U.prototype.shouldConvertUnitToUpperCase=function(v){return this.mCustomUnits&&!this.mCustomUnits[v]&&this.mCustomUnits[v.toUpperCase()];};U.prototype.getName=function(){return"sap.ui.comp.smartfield.type.Unit";};return U;});
