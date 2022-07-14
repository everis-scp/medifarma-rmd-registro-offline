/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define("sap/zen/dsh/PivotTable",["sap/base/Log","sap/zen/dsh/utils/Utilities","sap/ui/core/Control","sap/ui/model/json/JSONModel","sap/zen/dsh/utils/ErrorHandler","sap/zen/dsh/utils/ResourceModel","sap/zen/commons/Format","sap/zen/commons/thirdparty/lodash"],function(L,U,C,J,E,R,F,_){"use strict";var P=C.extend("sap.zen.dsh.PivotTable",{metadata:{properties:{dataProviderName:{type:"string",defaultValue:"0"},format:{type:"sap.zen.commons.Format",multiple:false,defaultValue:F.ExcelStyle}},events:{navigationCmd:{parameters:{anchor:"sap.ui.core.Control",navigationCmdType:"sap.zen.dsh.NavigationCommandType",selection:"object",cmd:"function"}}},publicMethods:["autoFit","getRowCount","getColCount","getFixedRows","getFixedColumns"]},init:function(){var t=this;t.getInit=_.constant(U.getDialogs().then(function(d){return d.runAsOwner(function(){return sap.ui.core.mvc.XMLView.create({id:[t.getId(),"-gridView"].join(""),viewName:"sap.zen.dsh.view.Pivot"});});}).then(function(v){t.getView=_.constant(v);t.addDependent(t.getView());t.getView().setModel(R,"i18n").setModel(new J(),"VariableContainer").setModel(new J(),"cm").setModel(new J());v=t.getView();t.getEasyGrid=_.constant(v.byId("theEasyGrid"));v.getPivotTable=_.constant(t);v.getController().getPivot=_.constant(t);t.getFixedColumns=t.getEasyGrid().getFixedColumns.bind(t.getEasyGrid());t.getFixedRows=t.getEasyGrid().getFixedRows.bind(t.getEasyGrid());t.onBeforeRendering();return v;}).catch(E.handleWithPopUp));var s=t.setFormat;t.setFormat=function(){var r=s.apply(t,arguments);t.getInit().then(function(){return t.getModel("om").metadataLoaded();}).then(function(){t.getEasyGrid().setFormat(t.getFormat());}).catch(function(e){L.error(e);});return r;};},onBeforeRendering:function(){var t=this;if(!t.getVisible()||!t.getEasyGrid||!t.getEasyGrid()){return;}if(!t.getModel("om")){return;}var e=t.getEasyGrid();if(e.getFormat()!=t.getFormat()){e.setFormat(t.getFormat());}var d=t.getDataProviderName();function r(p){var b=_.clone(e.getBindingInfo(p));b.parts[0].path=["/dataProvider/",d,"/Grid/",p].join("");e.bindProperty(p,b);}if(t._oldDPName!==d){var b=_.clone(t.getEasyGrid().getBindingInfo("cells"));b.path=["/dataProvider/",d,"/Grid/Cells"].join("");e.bindAggregation("cells",b);["virtualRows","virtualColumns","fixedRows","fixedColumns","input","format"].forEach(r);t._oldDPName=d;}if(e.getModel("om").getDataProvider(t.getDataProviderName())&&e.getFormat()!=t.getFormat()){e.setFormat(t.getFormat());}},renderer:function(r,c){r.openStart("div").writeControlData(c).class("sapUiZenCommonsSize").openEnd();if(c.getView&&c.getView()){r.renderControl(c.getView());}else{c.getInit().then(function(){c.invalidate();});}r.close("div");},handleResize:_.constant(null),getRowCount:function(){return this.getEasyGrid().getRowCount();},autoFit:function(){var t=this;if(t.getEasyGrid){t.getEasyGrid().autoFit();}},getColCount:function(){return this.getEasyGrid().getRowCount();},exit:function(){var t=this;sap.ui.Device.resize.detachHandler(t.handleResize);if(t.getEasyGrid){var c=t.getEasyGrid().getBindingInfo("cells");if(c&&c.template){c.template.destroy();}}t.destroyDependents();t.removeAllDependents();C.prototype.exit(t,arguments);}});return P;});