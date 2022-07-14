/*!
 * SAPUI5

(c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/Element","sap/chart/utils/ChartUtils","sap/chart/data/MeasureSemantics","sap/ui/thirdparty/jquery"],function(E,C,M,q){"use strict";var _={axis1:true,axis2:true,axis3:true,axis4:true};var a=E.extend("sap.chart.data.Measure",{metadata:{library:"sap.chart",properties:{name:{type:"string"},label:{type:"string"},unitBinding:{type:"string"},valueFormat:{type:"string",defaultValue:null},role:{type:"string",defaultValue:"axis1"},semantics:{type:"sap.chart.data.MeasureSemantics",defaultValue:M.Actual},semanticallyRelatedMeasures:{type:"object",defaultValue:null},analyticalInfo:{type:"object",defaultValue:null}}}});a.prototype.setLabel=C.makeNotifyParentProperty("label");var r=C.makeNotifyParentProperty("role");a.prototype.setRole=function(v,s){if(!_[v]){throw new TypeError("Invalide Measure role: "+v);}return r.apply(this,arguments);};a.prototype.setUnitBinding=C.makeNotifyParentProperty("unitBinding");a.prototype.setValueFormat=C.makeNotifyParentProperty("valueFormat");a.prototype.setSemantics=C.makeNotifyParentProperty("semantics");a.prototype.setSemanticallyRelatedMeasures=C.makeNotifyParentProperty("semanticallyRelatedMeasures");a.prototype._getFixedRole=function(){return this._sFixedRole||this.getRole();};return a;});
