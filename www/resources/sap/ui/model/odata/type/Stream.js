/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/ui/model/odata/type/ODataType"],function(L,F,P,V,O){"use strict";function s(t,c){var n;t.oConstraints=undefined;if(c){n=c.nullable;if(n===false){t.oConstraints={nullable:false};}else if(n!==undefined&&n!==true){L.warning("Illegal nullable: "+n,null,t.getName());}}}var S=O.extend("sap.ui.model.odata.type.Stream",{constructor:function(f,c){O.apply(this,arguments);if(f!==undefined){throw new Error("Unsupported arguments");}s(this,c);}});S.prototype.formatValue=function(v,t){switch(this.getPrimitiveType(t)){case"any":case"string":return v;default:throw new F("Don't know how to format "+this.getName()+" to "+t);}};S.prototype.getName=function(){return"sap.ui.model.odata.type.Stream";};S.prototype.parseValue=function(){throw new P("Type 'sap.ui.model.odata.type.Stream' does not support parsing");};S.prototype.validateValue=function(){throw new V("Type 'sap.ui.model.odata.type.Stream' does not support validating");};return S;});
