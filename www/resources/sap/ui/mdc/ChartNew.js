/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/mdc/Control","./chart/ChartSettings","sap/ui/mdc/util/loadModules","./ChartNewRenderer","sap/ui/mdc/library","sap/m/Text","sap/m/VBox","sap/base/Log","./chartNew/ChartToolbarNew","./chartNew/PropertyHelperNew","sap/ui/mdc/mixin/FilterIntegrationMixin","sap/ui/model/base/ManagedObjectModel","sap/ui/mdc/p13n/subcontroller/ChartItemController","sap/ui/mdc/p13n/subcontroller/SortController","sap/ui/base/ManagedObjectObserver","sap/ui/mdc/chartNew/DrillBreadcrumbsNew"],function(C,a,b,l,c,M,T,V,L,d,P,F,f,g,S,h,B){"use strict";var i="sap.ui.mdc.IFilter";var D;var j=a.extend("sap.ui.mdc.ChartNew",{metadata:{library:"sap.ui.mdc",interfaces:["sap.ui.mdc.IxState"],defaultAggregation:"items",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%",invalidate:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%",invalidate:true},delegate:{type:"object",group:"Data",defaultValue:{name:"sap/ui/mdc/ChartDelegateNew"}},header:{type:"string",group:"Misc",defaultValue:null},noDataText:{type:"string",defaultValue:"No data"},p13nMode:{type:"sap.ui.mdc.ChartP13nMode[]"},legendVisible:{type:"boolean",group:"Misc",defaultValue:true},ignoreToolbarActions:{type:"sap.ui.mdc.ChartToolbarActionType[]",defaultValue:[]},minWidth:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"240px",invalidate:true},minHeight:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"400px",invalidate:true},sortConditions:{type:"object"},showChartTooltip:{type:"boolean",group:"Misc",defaultValue:true},autoBindOnInit:{type:"boolean",group:"Misc",defaultValue:true},chartType:{type:"string",group:"Misc",defaultValue:"column"},showSelectionDetails:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{items:{type:"sap.ui.mdc.chartNew.ItemNew",multiple:true},actions:{type:"sap.ui.core.Control",multiple:true,forwarding:{idSuffix:"--toolbar",aggregation:"actions"}},_toolbar:{type:"sap.ui.mdc.chartNew.ChartToolbarNew",multiple:false},_breadcrumbs:{type:"sap.m.Breadcrumbs",multiple:false},_innerChart:{type:"sap.ui.core.Control",multiple:false},selectionDetailsActions:{type:"sap.ui.mdc.chartNew.SelectionDetailsActionsNew",multiple:false}},associations:{filter:{type:i,multiple:false}},events:{selectionDetailsActionPressed:{parameters:{action:{type:"sap.ui.core.Item"},itemContexts:{type:"sap.ui.model.Context"},level:{type:"sap.m.SelectionDetailsActionLevel"}}},dataPointsSelected:{parameters:{dataContext:{type:"object"}}},innerChartLoadedData:{parameters:{innerChart:{type:"sap.core.Control"}}}}},renderer:c});F.call(j.prototype);j.prototype.init=function(){this._oManagedObjectModel=new f(this);this.setModel(this._oManagedObjectModel,"$mdcChart");this._bNewP13n=true;a.prototype.init.apply(this,arguments);};j.prototype.setP13nMode=function(m){var s=null;if(m&&m.length>1){s=[];var k=m.reduce(function(e,K,I){e[K]=true;return e;},{});if(k.Item){s.push("Item");}if(k.Sort){s.push("Sort");}if(k.Type){this._typeBtnActive=true;}else{this._typeBtnActive=false;}}else{s=m;}this.setProperty("p13nMode",s,true);this._updateAdaptation(this.getP13nMode());return this;};j.prototype._updateAdaptation=function(m){var r={controller:{}};var R={Item:g,Sort:S};if(m&&m.length>0){m.forEach(function(s){var k=s;r.controller[k]=R[s];});this.getEngine().registerAdaptation(this,r);}};j.prototype.applySettings=function(s,o){if(s){this._aInitialToolbarActions=s.actions;delete s.actions;}a.prototype.applySettings.apply(this,arguments);this.initializedPromise=new Promise(function(r,e){this._fnResolveInitialized=r;this._fnRejectInitialized=e;}.bind(this));this.innerChartBoundPromise=new Promise(function(r,e){this._fnResolveInnerChartBound=r;this._fnRejectInnerChartBound=e;}.bind(this));this._loadDelegate().then(function(e){this.initControlDelegate(e).then(function(){this._initInnerControls();}.bind(this)).catch(function(k){this._fnRejectInitialized(k);}.bind(this));}.bind(this)).catch(function(e){this._fnRejectInitialized(e);}.bind(this));};j.prototype._initInnerControls=function(){this.getControlDelegate().initializeInnerChart(this).then(function(I){this.setBusyIndicatorDelay(0);this.getControlDelegate().createInitialChartContent(this);this._renderOverlay(true);if(this.getAutoBindOnInit()){this.setBusy(true);this._createContentfromPropertyInfos();}this.setAggregation("_innerChart",I);this._bInnerChartReady=true;this._fnResolveInitialized();this.invalidate();}.bind(this)).catch(function(e){this._fnRejectInitialized(e);}.bind(this));this._createToolbar();};j.prototype._createContentfromPropertyInfos=function(){this.initPropertyHelper(P).then(function(){this.getControlDelegate().createInnerChartContent(this,this._innerChartDataLoadComplete.bind(this));this._createBreadcrumbs();this._oObserver=new h(this._propagateItemChangeToInnerChart.bind(this));this._oObserver.observe(this,{aggregations:["items"]});this._propagatePropertiesToInnerChart();this._fnResolveInnerChartBound();}.bind(this));};j.prototype._createBreadcrumbs=function(){this._oBreadcrumbs=new B(this.getId()+"--breadcrumbs");this._oBreadcrumbs.updateDrillBreadcrumbs(this,this.getControlDelegate().getDrillableItems(this));this.setAggregation("_breadcrumbs",this._oBreadcrumbs);};j.prototype._loadDelegate=function(){return new Promise(function(r){var n=[this.getDelegate().name];function o(e){r(e);}sap.ui.require(n,o);}.bind(this));};j.prototype.isFilteringEnabled=function(){};j.prototype._propagateItemChangeToInnerChart=function(o){this.setBusy(true);switch(o.mutation){case"insert":var I=this.getItems().indexOf(o.child);this.getControlDelegate().insertItemToInnerChart(o.child,I);break;case"remove":this.getControlDelegate().removeItemFromInnerChart(o.child);break;default:L.error("Unknown mutation on MDC Chart Item Aggregation. This will not sync to inner chart!");break;}this.rebind();this._oBreadcrumbs.updateDrillBreadcrumbs(this,this.getControlDelegate().getDrillableItems(this));};j.prototype.rebind=function(){if(!this._bInnerChartReady){this.initialized().then(function(){this.rebind();}.bind(this));return;}this.setBusy(true);if(!this.getControlDelegate().getInnerChartBound()){this._createContentfromPropertyInfos();return;}var o=this.oBindData?this.oBindData:this.getControlDelegate()._getBindingInfo(this);if(o){o.sorter=this._getSorters();}this.getControlDelegate().updateBindingInfo(this,o);this.getControlDelegate().rebindChart(this,o,this._innerChartDataLoadComplete.bind(this));this._updateToolbar();};j.prototype._createToolbar=function(){var t=new d(this.getId()+"--toolbar",{design:"Transparent"});t.createToolbarContent(this);this.setAggregation("_toolbar",t);};j.prototype._getInitialToolbarActions=function(){return this._aInitialToolbarActions?this._aInitialToolbarActions:[];};j.prototype._updateToolbar=function(){if(this.getAggregation("_toolbar")){this.getAggregation("_toolbar").updateToolbar(this);}else{L.warning("Trying to uipdate Chart Toolbar, but toolbar is not yet initialized. This will not work!");}};j.prototype._getInnerChart=function(){if(this._bInnerChartReady){return this.getControlDelegate().getInnerChart();}else{L.error("Trying to acces inner chart while inner chart is not yet initialized!");}};j.prototype._addItems=function(){};j.prototype.getCollectionModel=function(){var o=this.getBindingInfo("data");return o?this.getModel(o.model):null;};j.prototype.initialized=function(){return this.initializedPromise;};j.prototype.innerChartBound=function(){return this.innerChartBoundPromise;};j.prototype.zoomIn=function(v){if(!v){v=10;}this.getControlDelegate().zoomIn(v);};j.prototype.zoomOut=function(v){if(v){v=10;}this.getControlDelegate().zoomOut(v);};j.prototype.getZoomState=function(){return this.getControlDelegate().getZoomState();};j.prototype.getSelectionHandler=function(){return this.getControlDelegate().getInnerChartSelectionHandler();};j.prototype.setLegendVisible=function(v){this.setProperty("legendVisible",v);try{this.getControlDelegate().setLegendVisible(v);}catch(e){L.info("Trying to set legend visiblity for Chart before delegate was initialized");}return this;};j.prototype.setShowChartTooltip=function(v){this.setProperty("showChartTooltip",v);try{this.getControlDelegate().setChartTooltipVisibility(v);}catch(e){L.info("Trying to set tooltip visibility before delegate was initialized");}return this;};j.prototype._showDrillDown=function(o){if(D){if(!this._oDrillDownPopover){D.createDrillDownPopover(this);}return D.showDrillDownPopover(this,o);}return new Promise(function(r,e){sap.ui.require(["sap/ui/mdc/chartNew/DrillStackHandlerNew"],function(k){D=k;D.createDrillDownPopover(this);D.showDrillDownPopover(this,o).then(function(m){r(m);});}.bind(this));}.bind(this));};j.prototype._propagatePropertiesToInnerChart=function(){this.setLegendVisible(this.getLegendVisible());this.setShowChartTooltip(this.getShowChartTooltip());this.setChartType(this.getChartType());};j.prototype.getChartTypeInfo=function(){var I;try{I=this.getControlDelegate().getChartTypeInfo();}catch(e){if(!I){I={icon:"sap-icon://vertical-bar-chart",text:"Selected Chart Type: Bar Chart"};}}return I;};j.prototype.getAvailableChartTypes=function(){return this.getControlDelegate().getAvailableChartTypes();};j.prototype.setChartType=function(s){this.setProperty("chartType",s);try{this.getControlDelegate().setChartType(s);}catch(e){L.info("Trying to set chart type for Chart before delegate was initialized");}return this;};j.prototype.getManagedObjectModel=function(){return this._oManagedObjectModel;};j.prototype._innerChartDataLoadComplete=function(){this.setBusy(false);this._renderOverlay(false);this._updateToolbar();this.fireEvent("innerChartLoadedData ",{innerChart:this.getControlDelegate().getInnerChart()});};j.prototype.getCurrentState=function(){var s={};var p=this.getP13nMode();if(p){if(p.indexOf("Item")>-1){s.items=this._getVisibleProperties();}if(p.indexOf("Sort")>-1){s.sorters=this._getSortedProperties();}}return s;};j.prototype._getVisibleProperties=function(){var p=[];this.getItems().forEach(function(I){p.push({name:I.getName(),role:I.getRole()});});return p;};j.prototype._getSortedProperties=function(){return this.getSortConditions()?this.getSortConditions().sorters:[];};j.prototype._getSorters=function(){var s;var e=this.getSortConditions()?this.getSortConditions().sorters:[];e.forEach(function(o){var m=this.getItems().find(function(p){return p.getName()===o.name;});if(!m){return;}var k=this.getControlDelegate().getSorterForItem(m,o);if(s){s.push(k);}else{s=[k];}}.bind(this));return s;};j.prototype._getPropertyData=function(){if(!this.aFetchedProperties){this.aFetchedProperties=this.getControlDelegate().fetchProperties(this);}else{return this.aFetchedProperties;}};j.prototype._getTypeBtnActive=function(){return!!this._typeBtnActive;};j.prototype._onFiltersChanged=function(e){if(this._bInnerChartReady&&this.getControlDelegate()&&this.getControlDelegate().getInnerChartBound()&&e.getParameter("conditionsBased")){this._renderOverlay(true);}};j.prototype._renderOverlay=function(s){if(this.getControlDelegate().getInnerChart()){var $=this.getControlDelegate().getInnerChart().$(),e=$.find(".sapUiMdcChartOverlay");if(s&&e.length===0){e=jQuery("<div>").addClass("sapUiOverlay sapUiMdcChartOverlay").css("z-index","1");$.append(e);}else if(!s){e.remove();}}};return j;},true);