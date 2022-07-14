/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/base/Log","sap/zen/commons/thirdparty/lodash","sap/ui/base/ManagedObject","sap/ui/core/Control","sap/zen/dsh/utils/BaseHandler","sap/zen/dsh/widgets/utils/info_error_handler","sap/zen/dsh/widgets/utils/info_error_lookup","sap/zen/dsh/widgets/utils/info_data_mapper","sap/zen/dsh/widgets/info_vizframe","sap/zen/dsh/widgets/utils/info_default_data","sap/zen/dsh/widgets/utils/info_chart_exception","sap/zen/dsh/widgets/utils/info_conditional_format_mapper","sap/zen/dsh/widgets/utils/sdk_data","sap/zen/dsh/widgets/utils/info_chart_locale","sap/zen/dsh/widgets/utils/info_binding_service","sap/zen/dsh/widgets/utils/info_legacy_binding_service","sap/zen/dsh/widgets/utils/info_property_builder","sap/zen/dsh/widgets/utils/info_dataseries_helper","sap/zen/dsh/widgets/utils/info_id_utils","sap/zen/dsh/widgets/utils/waterfall_data_factory","sap/zen/dsh/widgets/utils/hichert_data_factory"],function(q,L,_,M,C,B,a,E,I,V,c,b,d,S,f,i,g,j,k,l,W,H){"use strict";var m="infochartupdate";var n=new f();var o=new l();var p=C.extend("com.sap.ip.bi.InfoChart",{metadata:{properties:{"width":{type:"sap.ui.core.CSSSize"},"height":{type:"sap.ui.core.CSSSize"},"CHARTTYPE":{type:"string"},"cvomdata":{type:"object"},"cvombinding":{type:"object"},"chartconfig":{type:"object"},"data":{type:"object"},"chartSelection":{type:"object"},"showTotals":{type:"boolean"},"showScaling":{type:"boolean"},"enableConditionalFormatting":{type:"boolean"},"plotAreaMeasureShapes":{type:"object"},"enrichData":{type:"object"},"useLegacyBindings":{type:"boolean"}},events:{chartError:{}}},setProperty:M.prototype.setProperty,init:function(h,w,x,y){var z=this;this._errorHandler=h||new a(this,new E(sap.zen.designmode,n),sap.zen.designmode);this._infoDataMapper=w||new I();this._conditionalFormatMapper=x||new d();this._infoBindingService=y||i;this._legacyBindingService=new g();sap.viz.api.env.Resource.path("sap.viz.api.env.Template.loadPaths",["../libs/resources/chart/templates"]);this.attachEvent("EventHandlerChange",undefined,function(e){r(z,e);});this._dataSeriesHelper=new k();},initDesignStudio:function(){},beforeDesignStudioUpdate:function(){this._errorHandler.clearError();this._oldChartType=this.getCHARTTYPE();},afterDesignStudioUpdate:function(){},onAfterRendering:function(){var h=this;n.onLoad(function(){try{h._errorHandler.checkError();u(h);}catch(e){h._errorHandler.renderError(e);}});},renderer:function(R,p){if(p.oComponentProperties.content&&p.oComponentProperties.content.control){var e=p.oComponentProperties.content.control.chart_mode;if(e){sap.viz.api.env.globalSettings({"treatAsMobile":e.toLowerCase()});}}R.write("<div");R.writeControlData(p);R.addStyle("width",p.getWidth());R.addStyle("height",p.getHeight());R.addClass("sapzeninfochart");R.writeStyles();R.writeClasses();R.write("data-chart-identifier=\"CLIENT_SIDE_INFO_CHART\"");R.write(">");R.write("<div id='"+p.getId()+"_container' style='width: 100%; height: 100%; overflow:visible'></div>");R.write("</div>");},exit:function(){if(this._vizframe){delete this._vizframe;}},getContextMenuAction:function(){L.error("boo");},getControlDiv:function(){return q(document.getElementById(this.getId()));},getChartContainer:function(){return this.getControlDiv().children().first();},setEmptyBackground:function(){t(this,{"type":"info/column","data":c.flatData(),"bindings":c.bindings(),"template":"empty_ghost"});},setData:function(h){var w=h?q.extend(true,{},h):null;try{this.setProperty("data",w);if(!this.oControlProperties.DATA_SOURCE_ALIAS_REF){throw new b("control.nodatasource");}else if(!h){var x=this.oComponentProperties.content.control.chartReady&&this.oComponentProperties.content.control.chartReady===true;if(x===true){throw new b("mapper.nodata");}else{throw new b("control.waitForReady");}}}catch(e){this._errorHandler.setError(e);}},setCvombinding:s("cvombinding"),setCvomdata:s("cvomdata"),setChartconfig:s("chartconfig"),setPlotAreaMeasureShapes:s("plotAreaMeasureShapes"),setEnrichData:s("enrichData"),setChartSelection:function(e){if(e==="CLEAR"){this._vizframe.selection(e);}else if(e!==""){this._chartSelection=JSON.parse(e);}},setCHARTTYPE:function(e){var h=o.convertEnumToId(e);this.setProperty("CHARTTYPE",h);},setCharttype:function(e){this.setCHARTTYPE(e);},setShowScaling:function(e){this.setProperty("showScaling",e);},getDataSelected:function(){var e=new function(){var e={};this.addSelection=function(x,y){e[x]=_.union(e[x]||[],[y]);};this.getSelections=function(){return e;};}();if(this._vizframe){var h=this._vizframe.selection();var w=this;_.forEach(h,function(x){var y=_.omit(x.data,function(K,N,O){return!(Object.prototype.hasOwnProperty.call(O,N+".d"));});var z=_.pairs(y);_.forEach(z,function(K){var N=K[0];var O=K[1];e.addSelection(N,O);});var A=_.omit(x.data,function(K,N,O){if(Object.prototype.hasOwnProperty.call(O,N+".d")){return true;}return N.slice(-2)===".d";});var D=_.pairs(A);var F=D[0][0];var G=w.getData();var J=w._infoDataMapper.getMeasuresDimensionKey(G.dimensions,G.externalDimensions);e.addSelection(J,F);});}return JSON.stringify(e.getSelections());},getChartSelection:function(){return this._vizframe&&this._vizframe.selection();},exportToSVGString:function(e){var h=this._vizframe._vizframe;var w=h.size();h.size({auto:false,height:e.height,width:e.width});var x=this._vizframe._vizframe.__internal_reference_VizFrame__._viz._vizInstance.app.exportToSVGString(e);h.size(w);return x;},getDataSourceName:function(){return this.oControlProperties.DATA_SOURCE_ALIAS_REF;}});function s(e){return function(h){try{if(h){h=h.replace(/\\x/gi,"\\u00");}var w=h&&JSON.parse(h);this.setProperty(e,w||{});}catch(x){this._errorHandler.renderError(x);}};}function r(h,e){var w=e.mParameters||{};var x=w.type;var y=w.EventId;n.onLoad(function(){if(x==="listenerAttached"&&y===m){try{h.fireEvent(m,v(h));}catch(z){L.error(z);h._errorHandler.renderError(z);}}});}function u(x){var $=x.getControlDiv();var w=$.width();var h=$.height();$.contextmenu(function(e){e.preventDefault();});if((w*h)===0){setTimeout(function(){u(x);},1);return;}try{var y=v(x);t(x,y);x.fireEvent(m,y);x._infoBindingService.validateBindings(y.type,y.bindings);}catch(e){L.error(e);x._errorHandler.renderError(e);}}function t(h,w){try{var $=h.getChartContainer();if(h._vizframe){h._vizframe.destroy();}if(h.oControlProperties.chartconfig)h.oControlProperties.chartconfig=h.oControlProperties.chartconfig.replace(/\\x/gi,"\\u00");$.empty();h._vizframe=new V();h._vizframe.create($,w,h);$.data("chartCtrl",h);}catch(e){L.error(e);h._errorHandler.renderError(e);}}function v(e){if(!e.oControlProperties.DATA_SOURCE_ALIAS_REF){throw new b("control.nodatasource");}var h=e.getCHARTTYPE();if(!sap.viz.api.metadata.Viz.get(h)){throw new b("control.invalidChartType");}var w=e.oControlProperties.chartReady&&e.oControlProperties.chartReady===true;if(w!==true){throw new b("control.waitForReady");}var x=(e.getChartconfig()&&e.getChartconfig().properties)||{};var y=!e.getShowTotals();var z;var A;var D;var F={"binding":[],chartType:h};if(e.oControlProperties.cvombinding&&_.isString(e.oControlProperties.cvombinding)){F=JSON.parse(e.oControlProperties.cvombinding);if(_.isArray(F)){throw new b();}}if(e.getCvomdata()&&!_.isEmpty(e.getCvomdata())){z=new sap.viz.api.data.FlatTableDataset(e.getCvomdata());}else{A=new S(e.getData());if(e.oControlProperties.useLegacyBindings){F.binding=e._legacyBindingService.createBindings(h,e.getData());A.keepDimensions(_.flatten(_.map(F.binding,"source")));D=A.toFlatData(y);}else{D=A.toFlatData(y);}var G=new j(x,h);if(H.isNeeded(h)&&e.getEnrichData()&&e.getEnrichData().hichert_chart){D=H.transformData(D,e.getEnrichData().hichert_chart,e);}else if(W.isNeeded(h)&&e.getEnrichData()&&e.getEnrichData().info_waterfall){D=W.transformData(D,e.getEnrichData().info_waterfall,e);}if(e.oControlProperties.showScaling){G.applyScalingFactor(A,D);}if(e.getUseLegacyBindings()){F.binding=e._legacyBindingService.createBindings(h,e.getData());}else{F.binding=e._infoBindingService.suggestBindings(h,D.metadata,F.binding,F.chartType);}z=e._infoDataMapper.map(D,y);if(e.getEnableConditionalFormatting()){G.setPropertyValue("plotArea.dataPointStyle",e._conditionalFormatMapper.createDataPointStyle(A));}G.setDefaultColorPalette().mapFormatStrings(A.getSDKFormatStrings());x=G.getProperties();if(e.oControlProperties.plotAreaMeasureShapes){var J=JSON.parse(e.oControlProperties.plotAreaMeasureShapes);var K=e._dataSeriesHelper.getProperties(J,h,F.binding);if(K[0].length!==0){x.plotArea=x.plotArea||{};x.plotArea.dataShape=x.plotArea.dataShape||{};x.plotArea.dataShape.primaryAxis=K[0];}if(K[1].length!==0){x.plotArea=x.plotArea||{};x.plotArea.dataShape=x.plotArea.dataShape||{};x.plotArea.dataShape.secondaryAxis=K[1];}}}return{type:h,data:z,bindings:F.binding,selection:e._chartSelection,properties:x};}return p;});
