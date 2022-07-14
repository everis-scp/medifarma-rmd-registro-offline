/*
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/model/odata/type/Guid","sap/ui/model/ValidateException"],function(G,V){"use strict";var r=/^[A-F0-9]{8}-([A-F0-9]{4}-){3}[A-F0-9]{12}$/i;function g(b){return sap.ui.getCore().getLibraryResourceBundle(b.resourceBundle).getText(b.text);}function s(v){throw new V(g(v));}var a=G.extend("sap.ui.comp.smartfield.type.Guid",{constructor:function(f,c,S){G.apply(this,arguments);this.oSettings=S;this.oFieldControl=null;this.oValidateExceptionSettings=this.oSettings&&this.oSettings.validateException||{resourceBundle:"",text:"EnterGuid"};}});a.prototype.parseValue=function(v,S){v=G.prototype.parseValue.apply(this,arguments);if(typeof this.oFieldControl==="function"){this.oFieldControl(v,S);}return v;};a.prototype.validateValue=function(v){if(v===null){if(this.oConstraints&&this.oConstraints.nullable===false){s.call(this,this.oValidateExceptionSettings);}return;}if(typeof v!=="string"){throw new V("Illegal "+this.getName()+" value: "+v);}if(!r.test(v)){s.call(this,this.oValidateExceptionSettings);}};a.prototype.destroy=function(){G.prototype.destroy.apply(this,arguments);this.oFieldControl=null;};a.prototype.getName=function(){return"sap.ui.comp.smartfield.type.Guid";};return a;});
