/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Control","./ActionToolbar","./table/TableSettings","./table/GridTableType","./table/ResponsiveTableType","./table/PropertyHelper","./mixin/FilterIntegrationMixin","./library","sap/m/Text","sap/m/Title","sap/m/ColumnHeaderPopover","sap/m/OverflowToolbar","sap/m/library","sap/ui/core/Core","sap/ui/core/format/NumberFormat","sap/ui/core/dnd/DragDropInfo","sap/ui/core/Item","sap/ui/core/format/ListFormat","sap/ui/events/KeyCodes","sap/ui/model/Sorter","sap/ui/dom/containsOrEquals","sap/base/strings/capitalize","sap/base/util/deepEqual","sap/base/util/Deferred","sap/ui/core/InvisibleMessage","sap/ui/core/InvisibleText","sap/ui/mdc/p13n/subcontroller/ColumnController","sap/ui/mdc/p13n/subcontroller/SortController","sap/ui/mdc/p13n/subcontroller/FilterController","sap/ui/mdc/p13n/subcontroller/GroupController","sap/ui/mdc/p13n/subcontroller/AggregateController","sap/m/ColumnPopoverSelectListItem","sap/m/ColumnPopoverActionItem","sap/ui/mdc/p13n/subcontroller/ColumnWidthController","sap/ui/mdc/actiontoolbar/ActionToolbarAction"],function(C,A,T,G,R,P,F,l,a,b,c,O,M,d,N,D,I,L,K,S,e,f,g,h,i,j,k,m,n,o,p,q,r,s,t){"use strict";var u=l.SelectionMode;var v=l.TableType;var w=l.RowAction;var x=M.ToolbarDesign;var y=M.ToolbarStyle;var z=l.MultiSelectMode;var B="sap.ui.mdc.IFilter";var E=new window.WeakMap();var H=function(e1){if(!E.has(e1)){E.set(e1,{oFilterInfoBar:null});}return E.get(e1);};function J(e1,f1){sap.ui.require(["sap/m/MessageToast"],function(g1){var h1=d.getLibraryResourceBundle("sap.ui.mdc");g1.show(h1.getText(e1,f1));});}var Q=C.extend("sap.ui.mdc.Table",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/table/Table.designtime",interfaces:["sap.ui.mdc.IFilterSource","sap.ui.mdc.IxState"],defaultAggregation:"columns",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null,invalidate:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null,invalidate:true},rowAction:{type:"sap.ui.mdc.RowAction[]",defaultValue:[]},p13nMode:{type:"sap.ui.mdc.TableP13nMode[]",defaultValue:[]},delegate:{type:"object",defaultValue:{name:"sap/ui/mdc/TableDelegate",payload:{}}},headerLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:sap.ui.core.TitleLevel.Auto},autoBindOnInit:{type:"boolean",group:"Misc",defaultValue:true},header:{type:"string",group:"Misc",defaultValue:null},headerVisible:{type:"boolean",group:"Misc",defaultValue:true},selectionMode:{type:"sap.ui.mdc.SelectionMode",defaultValue:u.None},showRowCount:{type:"boolean",group:"Misc",defaultValue:true},threshold:{type:"int",group:"Appearance",defaultValue:-1},noDataText:{type:"string"},sortConditions:{type:"object"},filterConditions:{type:"object",defaultValue:{}},groupConditions:{type:"object"},aggregateConditions:{type:"object"},enableExport:{type:"boolean",defaultValue:false},busyIndicatorDelay:{type:"int",defaultValue:100},enableColumnResize:{type:"boolean",group:"Behavior",defaultValue:true},showPasteButton:{type:"boolean",group:"Behavior",defaultValue:false},enablePaste:{type:"boolean",group:"Behavior",defaultValue:true},multiSelectMode:{type:"sap.ui.mdc.MultiSelectMode",group:"Behavior",defaultValue:z.Default},enableAutoColumnWidth:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},type:{type:"sap.ui.mdc.table.TableTypeBase",altTypes:["sap.ui.mdc.TableType"],multiple:false},columns:{type:"sap.ui.mdc.table.Column",multiple:true},creationRow:{type:"sap.ui.mdc.table.CreationRow",multiple:false},actions:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_createToolbar",aggregation:"actions"}},variant:{type:"sap.ui.fl.variants.VariantManagement",multiple:false},quickFilter:{type:"sap.ui.core.Control",multiple:false},rowSettings:{type:"sap.ui.mdc.table.RowSettings",multiple:false},dataStateIndicator:{type:"sap.m.plugins.DataStateIndicator",multiple:false}},associations:{filter:{type:B,multiple:false}},events:{rowPress:{parameters:{bindingContext:{type:"sap.ui.model.Context"}}},selectionChange:{parameters:{bindingContext:{type:"sap.ui.model.Context"},selected:{type:"boolean"},selectAll:{type:"boolean"}}},beforeExport:{parameters:{exportSettings:{type:"object"},userExportSettings:{type:"object"}}},paste:{parameters:{data:{type:"string[][]"}}}}},constructor:function(){this._oTableReady=new h();this._oFullInitialize=new h();C.apply(this,arguments);this.bCreated=true;this._doOneTimeOperations();this._initializeContent();},renderer:{apiVersion:2,render:function(e1,f1){e1.openStart("div",f1);e1.class("sapUiMdcTable");e1.style("height",f1.getHeight());e1.style("width",f1.getWidth());e1.openEnd();e1.renderControl(f1.getAggregation("_content"));e1.close("div");}}});var U=["variant","quickFilter"];F.call(Q.prototype);U.forEach(function(e1){var f1=f(e1),g1="_o"+f1,h1="get"+f1,i1="set"+f1,j1="destroy"+f1;Q.prototype[h1]=function(){return this[g1];};Q.prototype[j1]=function(){var k1=this[g1];this[i1]();if(k1){k1.destroy();}return this;};Q.prototype[i1]=function(k1){this.validateAggregation(e1,k1,false);var l1=this._createToolbar(),m1=k1!==this[g1];if(!k1||m1){l1.removeBetween((this[h1]()));this[g1]=k1;}if(m1&&k1){this._setToolbarBetween(l1);}return this;};});Q.prototype.init=function(){C.prototype.init.apply(this,arguments);this._bForceRebind=true;this._updateAdaptation(this.getP13nMode());this.mSkipPropagation={rowSettings:true};};Q.prototype.applySettings=function(){C.prototype.applySettings.apply(this,arguments);this.initControlDelegate();};Q.prototype._setToolbarBetween=function(e1){[this._oVariant,this._oQuickFilter].forEach(function(f1){if(f1){e1.addBetween(f1);}});};Q.prototype.initialized=function(){return this._oTableReady.promise;};Q.prototype._fullyInitialized=function(){return this._oFullInitialize.promise;};Q.prototype.getDataStateIndicatorPluginOwner=function(e1){return this._oTable||this._oFullInitialize.promise;};Q.prototype.setDataStateIndicator=function(e1){this._handleDataStateEvents(this.getDataStateIndicator(),"detach");this.setAggregation("dataStateIndicator",e1,true);this._handleDataStateEvents(this.getDataStateIndicator(),"attach");return this;};Q.prototype._handleDataStateEvents=function(e1,f1){if(e1){e1[f1+"ApplyFilter"](this._onApplyMessageFilter,this);e1[f1+"ClearFilter"](this._onClearMessageFilter,this);e1[f1+"Event"]("filterInfoPress",d1,this);}};Q.prototype._onApplyMessageFilter=function(e1){this._oMessageFilter=e1.getParameter("filter");e1.preventDefault();this.rebind();};Q.prototype._onClearMessageFilter=function(e1){this._oMessageFilter=null;e1.preventDefault();this.rebind();};Q.prototype._getStringType=function(e1){var f1,g1=f1=e1||this.getType();if(!g1){f1=v.Table;}else if(typeof g1==="object"){if(g1.isA("sap.ui.mdc.table.ResponsiveTableType")){f1=v.ResponsiveTable;}else{f1=v.Table;}}return f1;};Q.prototype._isOfType=function(e1){return this._getStringType()===e1;};Q.prototype._updateTypeSettings=function(){var e1=this.getType();if(e1&&typeof e1==="object"){e1.updateTableSettings();}else{if(e1==="ResponsiveTable"){e1=R;}else{e1=G;}e1.updateDefault(this._oTable);}};Q.prototype.scrollToIndex=function(e1){return new Promise(function(f1,g1){if(!this._oTable){return g1();}if(typeof e1!=="number"){return g1("The iIndex parameter has to be a number");}if(this._isOfType(v.ResponsiveTable)){this._oTable.scrollToIndex(e1).then(f1).catch(g1);}else{if(e1===-1){e1=this._getRowCount(false);}if(this._oTable._setFirstVisibleRowIndex(e1)){this._oTable.attachEventOnce("rowsUpdated",function(){f1();});}else{f1();}}}.bind(this));};Q.prototype.focusRow=function(e1,f1){return this.scrollToIndex(e1).then(function(){return this._oTable._setFocus(e1,f1);}.bind(this));};Q.prototype.setType=function(e1){var f1=this._getStringType(e1);var g1=this._getStringType();this.setAggregation("type",e1,true);if(f1===g1&&this._oTable){this._updateTypeSettings();return this;}if(this.bCreated){if(this._oTable){if(g1==="ResponsiveTable"){this._oTable.setHeaderToolbar();}else{this._oTable.removeExtension(this._oToolbar);}this._oTable.destroy("KeepDom");this._oTable=null;this._bTableExists=false;}else{this._onAfterTableCreated();this._onAfterFullInitialization();}if(this._oTemplate){this._oTemplate.destroy();this._oTemplate=null;}this._oTableReady=new h();this._oFullInitialize=new h();this._bFullyInitialized=false;this._initializeContent();}return this;};Q.prototype.setRowSettings=function(e1){this.setAggregation("rowSettings",e1,true);if(this._oTable){if(this._isOfType(v.ResponsiveTable)){R.updateRowSettings(this._oTemplate,e1);}else{G.updateRowSettings(this._oTable,e1);}this._bForceRebind=true;this.checkAndRebind();}return this;};Q.prototype.setHeaderLevel=function(e1){if(this.getHeaderLevel()===e1){return this;}this.setProperty("headerLevel",e1,true);this._oTitle&&this._oTitle.setLevel(e1);return this;};Q.prototype.focus=function(e1){var f1=this.getDomRef();if(this._oTable&&f1&&!e(f1,document.activeElement)){this._oTable.focus();}};Q.prototype.setBusy=function(e1){this.setProperty('busy',e1,true);if(this._oTable){this._oTable.setBusy(e1);}return this;};Q.prototype.setBusyIndicatorDelay=function(e1){this.setProperty('busyIndicatorDelay',e1,true);if(this._oTable){this._oTable.setBusyIndicatorDelay(e1);}return this;};Q.prototype.setSelectionMode=function(e1){var f1=this.getSelectionMode();this.setProperty("selectionMode",e1,true);if(this._oTable&&f1!=this.getSelectionMode()){this._updateSelectionBehavior();}return this;};Q.prototype.setMultiSelectMode=function(e1){var f1=this.getMultiSelectMode();this.setProperty("multiSelectMode",e1,true);if(this._oTable&&f1!=this.getMultiSelectMode()){this._updateMultiSelectMode();}return this;};Q.prototype.setRowAction=function(e1){var f1=this.getRowAction();this.setProperty("rowAction",e1,true);if(!g(f1.sort(),this.getRowAction().sort())){this._updateRowAction();}return this;};Q.prototype.setCreationRow=function(e1){this.setAggregation("creationRow",e1,true);if(e1){e1.update();}return this;};Q.prototype.setEnableColumnResize=function(e1){var f1=this.getEnableColumnResize();this.setProperty("enableColumnResize",e1,true);if(this.getEnableColumnResize()!==f1){this._updateColumnResizer();this._updateAdaptation(this.getP13nMode());}return this;};Q.prototype._onModifications=function(){if(!this._oTable){return;}var e1=this.getCurrentState().xConfig;var f1=e1.aggregations&&e1.aggregations.columns;this.getColumns().forEach(function(g1,h1){var i1=f1&&f1[g1.getDataProperty()]&&f1[g1.getDataProperty()].width;var j1=this._oTable.getColumns()[h1];if(!i1&&j1.getWidth()!==g1.getWidth()){j1.setWidth(g1.getWidth());}else if(i1&&i1!==j1.getWidth()){j1.setWidth(i1);}},this);};Q.prototype.setP13nMode=function(e1){var f1=this.getP13nMode();var g1=null;if(e1&&e1.length>1){g1=[];var h1=e1.reduce(function(i1,j1,k1){i1[j1]=true;return i1;},{});if(h1.Column){g1.push("Column");}if(h1.Sort){g1.push("Sort");}if(h1.Filter){g1.push("Filter");}if(h1.Group){g1.push("Group");}if(h1.Aggregate){g1.push("Aggregate");}}else{g1=e1;}this.setProperty("p13nMode",g1,true);this._updateAdaptation(this.getP13nMode());if(!g(f1.sort(),this.getP13nMode().sort())){V(this);}return this;};Q.prototype._updateAdaptation=function(e1){var f1={controller:{}};var g1={Column:k,Sort:m,Group:o,Filter:n,Aggregate:p,ColumnWidth:s};e1.forEach(function(h1){var i1=h1;f1.controller[i1]=g1[h1];});if(this.getEnableColumnResize()){f1.controller["ColumnWidth"]=g1["ColumnWidth"];}this.getEngine().registerAdaptation(this,f1);};function V(e1){if(e1._oToolbar){e1._oToolbar.destroyEnd();e1._getP13nButtons().forEach(function(g1){e1._oToolbar.addEnd(g1);});}if(e1._oTable){var f1=e1._oTable.getDragDropConfig()[0];if(f1){f1.setEnabled(e1.getP13nMode().indexOf("Column")>-1);}}if(e1.isFilteringEnabled()){X(e1);}W(e1);}Q.prototype.setFilterConditions=function(e1){this.setProperty("filterConditions",e1,true);var f1=this.getInbuiltFilter();if(f1){f1.setFilterConditions(e1);}W(this);return this;};function W(e1){var f1=$(e1);var g1=_(e1);var h1=a1(e1);if(!f1){return;}if(h1.length===0||!e1.isFilteringEnabled()){var i1=f1.getDomRef();if(i1&&i1.contains(document.activeElement)){e1.focus();}f1.setVisible(false);Y(e1).setText("");return;}e1._fullyInitialized().then(function(){var j1=h1.map(function(n1){return e1.getPropertyHelper().getLabel(n1);});var k1=d.getLibraryResourceBundle("sap.ui.mdc");var l1=L.getInstance();var m1=k1.getText("table.FILTER_INFO",l1.format(j1));if(!f1.getVisible()){f1.setVisible(true);}g1.setText(m1);Y(e1).setText(m1);});}function X(e1){if(!e1._oTable){return;}var f1=$(e1);if(!f1){f1=Z(e1);}if(e1._bMobileTable){if(e1._oTable.getInfoToolbar()!==f1){e1._oTable.setInfoToolbar(f1);}}else if(e1._oTable.indexOfExtension(f1)===-1){e1._oTable.insertExtension(f1,1);}var g1=Y(e1);e1._oTable.addAriaLabelledBy(g1.getId());}function Y(e1){if(!e1){return null;}if(!e1._oFilterInfoBarInvisibleText){e1._oFilterInfoBarInvisibleText=new j().toStatic();}return e1._oFilterInfoBarInvisibleText;}function Z(e1){var f1=e1.getId()+"-filterInfoBar";var g1=H(e1).oFilterInfoBar;if(g1&&!g1.bIsDestroyed){g1.destroy();}g1=new O({id:f1,active:true,design:x.Info,visible:false,content:[new a({id:f1+"-text",wrapping:false})],press:[d1,e1]});g1.focus=function(){if(this.getDomRef()){O.prototype.focus.apply(this,arguments);}else{e1.focus();}};H(e1).oFilterInfoBar=g1;W(e1);return g1;}function $(e1){var f1=H(e1).oFilterInfoBar;if(f1&&(f1.bIsDestroyed||f1.bIsBeingDestroyed)){return null;}return H(e1).oFilterInfoBar;}function _(e1){var f1=$(e1);return f1?f1.getContent()[0]:null;}Q.prototype.setThreshold=function(e1){this.setProperty("threshold",e1,true);if(!this._oTable){return this;}e1=this.getThreshold()>-1?this.getThreshold():undefined;if(this._bMobileTable){this._oTable.setGrowingThreshold(e1);}else{this._oTable.setThreshold(e1);}return this;};Q.prototype._onFilterProvided=function(e1){this._updateInnerTableNoDataText();};Q.prototype._onFilterRemoved=function(e1){this._updateInnerTableNoDataText();};Q.prototype._onFiltersChanged=function(e1){if(this.isTableBound()&&e1.getParameter("conditionsBased")){this._oTable.setShowOverlay(true);}};Q.prototype._onFilterSearch=function(e1){this._bIgnoreChange=true;this._bAnnounceTableUpdate=true;};Q.prototype.setNoDataText=function(e1){this.setProperty("noDataText",e1,true);this._updateInnerTableNoDataText();return this;};Q.prototype._updateInnerTableNoDataText=function(){if(!this._oTable){return;}var e1=this._getNoDataText();if(this._bMobileTable){this._oTable.setNoDataText(e1);}else{this._oTable.setNoData(e1);}};Q.prototype._getNoDataText=function(){var e1=this.getNoDataText();if(e1){return e1;}var f1=d.getLibraryResourceBundle("sap.ui.mdc");if(!this.isTableBound()){if(this.getFilter()){return f1.getText("table.NO_DATA_WITH_FILTERBAR");}return f1.getText("table.NO_DATA");}return f1.getText("table.NO_RESULTS");};Q.prototype._updateRowAction=function(){if(!this._oTable){return;}var e1=this.getRowAction().indexOf(w.Navigation)>-1;var f1=this._bMobileTable?R:G;f1.updateRowAction(this,e1,this._bMobileTable?undefined:this._onRowActionPress);};Q.prototype._initializeContent=function(){var e1,f1=this._getStringType();if(this._isOfType(v.ResponsiveTable)){e1=R;}else{e1=G;}var g1=[this.awaitControlDelegate(),e1.loadTableModules()];if(this.isFilteringEnabled()){g1.push(this.retrieveInbuiltFilter());}Promise.all(g1).then(function(){if(this.bIsDestroyed){return;}var h1=this.getControlDelegate();if(h1.preInit){this._pDelegatePreInit=h1.preInit(this);}if(!this._bTableExists&&f1===this._getStringType()){this._bMobileTable=f1==="ResponsiveTable";this._createContent();this._bTableExists=true;}}.bind(this)).catch(function(h1){this._onAfterTableCreated();throw h1;}.bind(this));};Q.prototype._doOneTimeOperations=function(){if(!this.bColumnsOrdered){this.bColumnsOrdered=true;this._orderColumns();}};Q.prototype._onAfterTableCreated=function(e1){this._oTableReady[e1?"resolve":"reject"](this);};Q.prototype._onAfterFullInitialization=function(e1){this._oFullInitialize[e1?"resolve":"reject"](this);};Q.prototype._createContent=function(){this._createToolbar();this._createTable();this._updateColumnResizer();this._updateRowAction();this.getColumns().forEach(this._insertInnerColumn,this);this.setAggregation("_content",this._oTable);this._onAfterTableCreated(true);var e1=this.initialized().then(function(){this.initPropertyHelper(P);var f1=this.getCreationRow();if(f1){f1.update();}if(this.getAutoBindOnInit()){this.checkAndRebind();}return this.awaitPropertyHelper();}.bind(this));Promise.all([e1,this._pDelegatePreInit]).then(function(){delete this._pDelegatePreInit;this._bFullyInitialized=true;this._onAfterFullInitialization(true);}.bind(this)).catch(function(f1){this._onAfterFullInitialization();throw f1;}.bind(this));};Q.prototype.setHeader=function(e1){this.setProperty("header",e1,true);this._updateHeaderText();this._updateExportState(true);return this;};Q.prototype.setHeaderVisible=function(e1){this.setProperty("headerVisible",e1,true);if(this._oTitle){this._oTitle.setWidth(this.getHeaderVisible()?undefined:"0px");}return this;};Q.prototype.setShowRowCount=function(e1){this.setProperty("showRowCount",e1,true);this._updateHeaderText();return this;};Q.prototype.setEnableExport=function(e1){if(e1!==this.getEnableExport()){this.setProperty("enableExport",e1,true);if(e1&&!this._oExportButton&&this._oToolbar){this._oToolbar.addEnd(this._getExportButton());}else if(this._oExportButton){this._oExportButton.setVisible(e1);}}return this;};Q.prototype.setShowPasteButton=function(e1){if((e1=!!e1)==this.getShowPasteButton()){return this;}this.setProperty("showPasteButton",e1,true);if(e1&&!this._oPasteButton&&this._oToolbar){this._oToolbar.insertEnd(this._getPasteButton(),0);this._oPasteButton.setEnabled(this.getEnablePaste());}else if(this._oPasteButton){this._oPasteButton.setVisible(e1);this._oPasteButton.setEnabled(this.getEnablePaste());}return this;};Q.prototype.setEnablePaste=function(e1){this.setProperty("enablePaste",e1,true);if(this._oPasteButton){this._oPasteButton.setEnabled(this.getEnablePaste());}return this;};Q.prototype._createToolbar=function(){if(this.isDestroyStarted()||this.isDestroyed()){return;}if(!this._oToolbar){this._oTitle=new b(this.getId()+"-title",{text:this.getHeader(),width:this.getHeaderVisible()?undefined:"0px",level:this.getHeaderLevel()});this._oToolbar=new A(this.getId()+"-toolbar",{design:x.Transparent,begin:[this._oTitle],end:[this._getPasteButton(),this._getP13nButtons(),this._getExportButton()]});}this._oToolbar.setStyle(this._bMobileTable?y.Standard:y.Clear);return this._oToolbar;};Q.prototype._getVisibleProperties=function(){var e1=[],f1;this.getColumns().forEach(function(g1,h1){f1=g1&&g1.getDataProperty();if(f1){e1.push({name:f1});}});return e1;};Q.prototype.getConditions=function(){return this.getInbuiltFilter()?this.getInbuiltFilter().getConditions():[];};Q.prototype._getSortedProperties=function(){return this.getSortConditions()?this.getSortConditions().sorters:[];};Q.prototype._getGroupedProperties=function(){return this.getGroupConditions()?this.getGroupConditions().groupLevels:[];};Q.prototype._getAggregatedProperties=function(){return this.getAggregateConditions()?this.getAggregateConditions():{};};Q.prototype._getXConfig=function(){return this.getEngine().readXConfig(this);};function a1(e1){var f1=e1.getFilterConditions();return Object.keys(f1).filter(function(g1){return f1[g1].length>0;});}Q.prototype.getCurrentState=function(){var e1={};var f1=this.getP13nMode();if(f1.indexOf("Column")>-1){e1.items=this._getVisibleProperties();}if(this.isSortingEnabled()){e1.sorters=this._getSortedProperties();}if(this.isFilteringEnabled()){e1.filter=this.getFilterConditions();}if(this.isGroupingEnabled()){e1.groupLevels=this._getGroupedProperties();}if(this.isAggregationEnabled()){e1.aggregations=this._getAggregatedProperties();}if(this.getEnableColumnResize()){e1.xConfig=this._getXConfig();}return e1;};Q.prototype.isFilteringEnabled=function(){return this.getP13nMode().indexOf("Filter")>-1;};Q.prototype.isSortingEnabled=function(){return this.getP13nMode().indexOf("Sort")>-1;};Q.prototype.isGroupingEnabled=function(){return this.getP13nMode().indexOf("Group")>-1;};Q.prototype.isAggregationEnabled=function(){return this.getP13nMode().indexOf("Aggregate")>-1;};Q.prototype._getP13nButtons=function(){var e1=this.getP13nMode();var f1=[];var g1=e1.length===1&&e1[0]==="Aggregate";if(e1.length>0&&!g1){f1.push(T.createSettingsButton(this.getId(),[c1,this]));}return f1;};Q.prototype._getPasteButton=function(){if(this.getShowPasteButton()){if(!this._oPasteButton){this._oPasteButton=T.createPasteButton(this.getId());}return this._oPasteButton;}};Q.prototype._getExportButton=function(){if(!this.getEnableExport()){return null;}var e1={fileName:this.getHeader()};if(!this._cachedExportSettings){this._cachedExportSettings=e1;}if(!this._oExportButton){this._oExportButton=T.createExportButton(this.getId(),{"default":[function(){this._onExport(e1);},this],"exportAs":[this._onExportAs,this]});}this._updateExportState();return this._oExportButton;};Q.prototype._updateExportState=function(e1){if(this._oExportButton){this._oExportButton.setEnabled(this._getRowCount(false)>0);if(e1&&this._cachedExportSettings){this._cachedExportSettings.fileName=this.getHeader();}}};Q.prototype._createExportColumnConfiguration=function(e1){var f1=e1&&e1.splitCells;var g1=this.getColumns();return this._fullyInitialized().then(function(){var h1=this.getPropertyHelper();var i1=[];g1.forEach(function(j1){var k1=h1.getColumnExportSettings(j1,f1);i1=i1.concat(k1);},this);return[i1,h1];}.bind(this));};Q.prototype._onExport=function(e1){var f1=this;return this._createExportColumnConfiguration(e1).then(function(g1){var h1=g1[0];var i1=g1[1];if(!h1||!h1.length){sap.ui.require(["sap/m/MessageBox"],function(l1){l1.error(d.getLibraryResourceBundle("sap.ui.mdc").getText("table.NO_COLS_EXPORT"),{styleClass:(this.$()&&this.$().closest(".sapUiSizeCompact").length)?"sapUiSizeCompact":""});}.bind(f1));return;}var j1=f1._getRowBinding();var k1={workbook:{columns:h1},dataSource:j1,fileType:e1.selectedFileType=="pdf"?"PDF":"XLSX",fileName:e1?e1.fileName:f1.getHeader()};f1._loadExportLibrary().then(function(){sap.ui.require(["sap/ui/export/ExportUtils"],function(l1){var m1=Promise.resolve();if(e1.includeFilterSettings){m1=l1.parseFilterConfiguration(j1,function(n1){return i1.getLabel(n1);}).then(function(n1){if(n1){k1.workbook.context={metaSheetName:n1.name,metainfo:[n1]};}});}m1.then(function(){var n1={splitCells:false,includeFilterSettings:false};if(e1){n1.splitCells=e1.splitCells;n1.includeFilterSettings=e1.includeFilterSettings;}l1.getExportInstance(k1).then(function(o1){o1.attachBeforeExport(function(p1){var q1=p1.getParameter("exportSettings");f1.fireBeforeExport({exportSettings:q1,userExportSettings:n1});},f1);o1.build().finally(function(){o1.destroy();});});});});});});};Q.prototype._onExportAs=function(e1){var f1=this;this._loadExportLibrary().then(function(){sap.ui.require(['sap/ui/export/ExportUtils'],function(g1){var h1=new URL(window.location.href).search.indexOf("sap-ui-xx-enablePDFExport=true")>-1;g1.getExportSettingsViaDialog(f1._cachedExportSettings,f1,undefined,h1).then(function(i1){f1._cachedExportSettings=i1;f1._onExport(i1);});});});};Q.prototype._loadExportLibrary=function(){if(!this._oExportLibLoadPromise){this._oExportLibLoadPromise=d.loadLibrary("sap.ui.export",true);}return this._oExportLibLoadPromise;};Q.prototype.onkeydown=function(e1){if(e1.isMarked()){return;}if((e1.metaKey||e1.ctrlKey)&&e1.shiftKey&&e1.which===K.E){if(this.getEnableExport()&&this._oExportButton&&this._oExportButton.getEnabled()){this._onExportAs();e1.setMarked();e1.preventDefault();}}if((e1.metaKey||e1.ctrlKey)&&e1.which===K.COMMA){var f1=d.byId(this.getId()+"-settings");if(f1&&f1.getEnabled()&&f1.getVisible()){f1.firePress();e1.setMarked();e1.preventDefault();}}};Q.prototype._createTable=function(){var e1=this.getThreshold()>-1?this.getThreshold():undefined;var f1=this.getRowSettings()?this.getRowSettings().getAllSettings():{};if(this._bMobileTable){this._oTable=R.createTable(this.getId()+"-innerTable",{autoPopinMode:true,contextualWidth:"Auto",growing:true,sticky:["ColumnHeaders","HeaderToolbar","InfoToolbar"],itemPress:[this._onItemPress,this],selectionChange:[this._onSelectionChange,this],growingThreshold:e1,noDataText:this._getNoDataText(),headerToolbar:this._oToolbar,ariaLabelledBy:[this._oTitle]});this._oTemplate=R.createTemplate(this.getId()+"-innerTableRow",f1);this._createColumn=Q.prototype._createMobileColumn;this._sAggregation="items";this._oTable.bindRows=this._oTable.bindItems;this._oTable.bActiveHeaders=true;this._oTable.attachEvent("columnPress",this._onResponsiveTableColumnPress,this);}else{this._oTable=G.createTable(this.getId()+"-innerTable",{enableBusyIndicator:true,enableColumnReordering:false,threshold:e1,cellClick:[this._onCellClick,this],noData:this._getNoDataText(),extension:[this._oToolbar],ariaLabelledBy:[this._oTitle],plugins:[G.createMultiSelectionPlugin(this,[this._onRowSelectionChange,this])],columnSelect:[this._onGridTableColumnPress,this],rowSettingsTemplate:f1});this._createColumn=Q.prototype._createColumn;this._sAggregation="rows";}this._updateTypeSettings();this._updateSelectionBehavior();this._updateMultiSelectMode();var g1=new D({sourceAggregation:"columns",targetAggregation:"columns",dropPosition:"Between",enabled:this.getP13nMode().indexOf("Column")>-1,drop:[this._onColumnRearrange,this]});g1.bIgnoreMetadataCheck=true;this._oTable.addDragDropConfig(g1);this._oTable.setBusyIndicatorDelay(this.getBusyIndicatorDelay());this._oTable.attachPaste(this._onInnerTablePaste,this);if(this.isFilteringEnabled()){X(this);}};Q.prototype._updateColumnResizer=function(){if(!this._oTable){return;}var e1=this.getEnableColumnResize();var f1=this._bMobileTable?R:G;if(e1){f1.enableColumnResizer(this,this._oTable);}else{f1.disableColumnResizer(this,this._oTable);}var g1=this.getColumns();g1.forEach(function(h1){h1.updateColumnResizing(e1);},this);};Q.prototype._updateSelectionBehavior=function(){var e1=this._bMobileTable?R:G;e1.updateSelection(this);};Q.prototype._updateMultiSelectMode=function(){if(this._bMobileTable){R.updateMultiSelectMode(this);}};Q.prototype._onColumnRearrange=function(e1){var f1=e1.getParameter("draggedControl");var g1=e1.getParameter("droppedControl");if(f1===g1){return;}var h1=e1.getParameter("dropPosition");var i1=this._oTable.indexOfColumn(f1);var j1=this._oTable.indexOfColumn(g1);var k1=j1+(h1=="Before"?0:1)+(i1<j1?-1:0);T.moveColumn(this,i1,k1);};Q.prototype._onColumnPress=function(e1){if(this._bSuppressOpenMenu){return;}var f1=e1.getParent(),g1=f1.indexOfColumn(e1),h1=this.getColumns()[g1],i1=this._bMobileTable&&this.getEnableColumnResize();this._fullyInitialized().then(function(){var j1=d.getLibraryResourceBundle("sap.ui.mdc");if(this._oPopover){this._oPopover.destroy();this._oPopover=null;}if(this.isSortingEnabled()){var k1=[],l1=[];this.getPropertyHelper().getSortableProperties(h1.getDataProperty()).forEach(function(r1){k1.push(new I({text:r1.getLabel(),key:r1.getName()}));l1.push(new I({text:r1.getLabel(),key:r1.getName()}));});if(k1.length>0){this._oPopover=new c({items:[new q({items:k1,label:j1.getText("table.SETTINGS_ASCENDING"),icon:"sap-icon://sort-ascending",action:[false,this._onCustomSort,this]}),new q({items:l1,label:j1.getText("table.SETTINGS_DESCENDING"),icon:"sap-icon://sort-descending",action:[true,this._onCustomSort,this]})]});e1.addDependent(this._oPopover);}}var m1=[];var n1=[];var o1=this.getControlDelegate();m1=(o1.addColumnMenuItems&&o1.addColumnMenuItems(this,h1))||[];this.getPropertyHelper().getFilterableProperties(h1.getDataProperty()).forEach(function(r1){n1.push(new I({text:r1.getLabel(),key:r1.getName()}));});if(this.isFilteringEnabled()&&n1.length){var p1=new q({label:j1.getText("table.SETTINGS_FILTER"),icon:"sap-icon://filter",action:[d1,this]});m1.unshift(p1);}if(i1){var q1=R.startColumnResize(this._oTable,e1);q1&&m1.push(q1);}m1.forEach(function(r1){this._createPopover(r1,e1);},this);if(this._oPopover){this._oPopover.openBy(e1);this._oPopover.getAggregation("_popover").attachAfterClose(function(){this._bSuppressOpenMenu=false;},this);this._bSuppressOpenMenu=true;}}.bind(this));};Q.prototype._createPopover=function(e1,f1){if(this._oPopover){this._oPopover.addItem(e1);}else{this._oPopover=new c({items:e1});f1.addDependent(this._oPopover);}};Q.prototype._onCustomSort=function(e1,f1){var g1=e1.getParameter("property");T.createSort(this,g1,f1,true);};Q.prototype._onColumnResize=function(e1){var f1=e1.getParameter("column");var g1=e1.getParameter("width");var h1=this._oTable.indexOfColumn(f1);var i1=this.getColumns()[h1];var j1=i1.getDataProperty();T.createColumnWidth(this,j1,g1);};Q.prototype._onCustomGroup=function(e1){T.createGroup(this,e1);};Q.prototype._onCustomAggregate=function(e1){T.createAggregation(this,e1);};Q.prototype._setColumnWidth=function(e1){if(!this.getEnableAutoColumnWidth()||e1.getWidth()||e1.isBound("width")){return;}var f1=this._oPropertyHelper;if(f1){f1.setColumnWidth(e1);}else{this.awaitPropertyHelper().then(this._setColumnWidth.bind(this,e1));}};Q.prototype._insertInnerColumn=function(e1,f1){if(!this._oTable){return;}this._setColumnWidth(e1);var g1=this._createColumn(e1);b1(this,e1,g1,f1);this._bForceRebind=true;if(f1===undefined){this._oTable.addColumn(g1);}else{this._oTable.insertColumn(g1,f1);}};Q.prototype._orderColumns=function(){var e1,f1=[],g1=this.getColumns();g1.forEach(function(h1){e1=h1.getInitialIndex();if(e1>-1){f1.push({index:e1,column:this.removeColumn(h1)});}},this);f1.sort(function(h1,i1){return h1-i1;});f1.forEach(function(h1){this.insertColumn(h1.column,h1.index);},this);};function b1(e1,f1,g1,h1){var i1=f1.getTemplate(true);if(!e1._bMobileTable){var j1=f1.getCreationTemplate(true);[i1,j1].forEach(function(k1){if(!k1){return;}if(k1.setWrapping){k1.setWrapping(false);}if(k1.setRenderWhitespace){k1.setRenderWhitespace(false);}});g1.setTemplate(i1);g1.setCreationTemplate(j1);}else if(h1>=0){e1._oTemplate.insertCell(i1,h1);e1._oTable.getItems().forEach(function(k1){k1.insertAggregation("cells",new j(),h1,true);});}else{e1._oTemplate.addCell(i1);}}Q.prototype._createColumn=function(e1){return G.createColumn(e1.getId()+"-innerColumn",{width:e1.getWidth(),minWidth:Math.round(e1.getMinWidth()*parseFloat(M.BaseFontSize)),hAlign:e1.getHAlign(),label:e1.getColumnHeaderControl(this._bMobileTable,this.getEnableColumnResize()),resizable:this.getEnableColumnResize(),autoResizable:this.getEnableColumnResize()});};Q.prototype._createMobileColumn=function(e1){return R.createColumn(e1.getId()+"-innerColumn",{width:e1.getWidth(),autoPopinWidth:e1.getMinWidth(),hAlign:e1.getHAlign(),header:e1.getColumnHeaderControl(this._bMobileTable,this.getEnableColumnResize()),importance:e1.getImportance(),popinDisplay:"Inline"});};Q.prototype.moveColumn=function(e1,f1){var g1;this.removeAggregation("columns",e1,true);this.insertAggregation("columns",e1,f1,true);if(this._oTable){g1=this._oTable.removeColumn(e1.getId()+"-innerColumn");this._oTable.insertColumn(g1,f1);if(this._bMobileTable){this._setMobileColumnOrder();this._updateColumnTemplate(e1,f1);}}};Q.prototype.removeColumn=function(e1){e1=this.removeAggregation("columns",e1,true);if(this._oTable){var f1=this._oTable.removeColumn(e1.getId()+"-innerColumn");f1.destroy("KeepDom");if(this._bMobileTable){this._updateColumnTemplate(e1,-1);}this._onModifications();}return e1;};Q.prototype.addColumn=function(e1){this.addAggregation("columns",e1,true);this._insertInnerColumn(e1);return this;};Q.prototype.insertColumn=function(e1,f1){this.insertAggregation("columns",e1,f1,true);this._insertInnerColumn(e1,f1);this._onModifications();return this;};Q.prototype._updateColumnTemplate=function(e1,f1){var g1,h1;if(this._oTemplate){g1=e1.getTemplate(true);h1=this._oTemplate.indexOfCell(g1);Q._removeItemCell(this._oTemplate,h1,f1);}if(h1>-1){this._oTable.getItems().forEach(function(i1){if(i1.removeCell){Q._removeItemCell(i1,h1,f1);}});}};Q.prototype._setMobileColumnOrder=function(){this.getColumns().forEach(function(e1){var f1=d.byId(e1.getId()+"-innerColumn");if(!f1){return;}f1.setOrder(this.indexOfColumn(e1));},this);this._oTable.invalidate();};Q._removeItemCell=function(e1,f1,g1){var h1=e1.removeCell(f1);if(h1){if(g1>-1){e1.insertCell(h1,g1);}else{h1.destroy();}}};Q.prototype._onItemPress=function(e1){this.fireRowPress({bindingContext:e1.getParameter("listItem").getBindingContext()});};Q.prototype._onSelectionChange=function(e1){var f1=e1.getParameter("selectAll");this.fireSelectionChange({bindingContext:e1.getParameter("listItem").getBindingContext(),selected:e1.getParameter("selected"),selectAll:f1});if(f1){var g1=this.getRowBinding();if(g1&&this._oTable){var h1=g1.getLength();var i1=this._oTable.getItems().length;var j1=g1.isLengthFinal();if(i1!=h1||!j1){J("table.SELECTION_LIMIT_MESSAGE",[i1]);}}}};Q.prototype._onResponsiveTableColumnPress=function(e1){this._onColumnPress(e1.getParameter("column"));};Q.prototype._onCellClick=function(e1){this.fireRowPress({bindingContext:e1.getParameter("rowBindingContext")});};Q.prototype._onRowActionPress=function(e1){var f1=e1.getParameter("row");this.fireRowPress({bindingContext:f1.getBindingContext()});};Q.prototype._onRowSelectionChange=function(e1){if(!this._bSelectionChangedByAPI){this.fireSelectionChange({bindingContext:e1.getParameter("rowContext"),selected:e1.getSource().isIndexSelected(e1.getParameter("rowIndex")),selectAll:e1.getParameter("selectAll")});}};Q.prototype._onGridTableColumnPress=function(e1){e1.preventDefault();this._onColumnPress(e1.getParameter("column"));};Q.prototype.getSelectedContexts=function(){if(this._oTable){if(this._bMobileTable){return this._oTable.getSelectedContexts();}var e1=this._oTable.getPlugins()[0].getSelectedIndices();return e1.map(function(f1){return this._oTable.getContextByIndex(f1);},this);}return[];};Q.prototype.clearSelection=function(){if(this._oTable){if(this._bMobileTable){this._oTable.removeSelections(true);}else{this._bSelectionChangedByAPI=true;this._oTable.getPlugins()[0].clearSelection();this._bSelectionChangedByAPI=false;}}};Q.prototype._registerInnerFilter=function(e1){e1.attachSearch(function(){this.rebind();},this);};Q.prototype.isTableBound=function(){return this._oTable?this._oTable.isBound(this._bMobileTable?"items":"rows"):false;};Q.prototype.bindRows=function(){if(!this.bDelegateInitialized||!this._oTable){return;}var e1={};this.getControlDelegate().updateBindingInfo(this,this.getPayload(),e1);if(e1.path){this._oTable.setShowOverlay(false);if(this._bMobileTable&&this._oTemplate){e1.template=this._oTemplate;}else{delete e1.template;}Q._addBindingListener(e1,"dataRequested",this._onDataRequested.bind(this));Q._addBindingListener(e1,"dataReceived",this._onDataReceived.bind(this));Q._addBindingListener(e1,"change",this._onBindingChange.bind(this));this._updateColumnsBeforeBinding(e1);this.getControlDelegate().updateBinding(this,e1,this._bForceRebind?null:this.getRowBinding());this._updateInnerTableNoDataText();this._bForceRebind=false;}};Q.prototype._onDataRequested=function(){this._bIgnoreChange=true;};Q.prototype._onDataReceived=function(){this._bIgnoreChange=false;this._updateHeaderText();this._updateExportState();};Q.prototype._onBindingChange=function(){if(this._bIgnoreChange){return;}this._updateHeaderText();};Q.prototype._updateHeaderText=function(){var e1,f1;if(!this._oNumberFormatInstance){this._oNumberFormatInstance=N.getFloatInstance();}if(this._oTitle&&this.getHeader()){e1=this.getHeader();if(this.getShowRowCount()){f1=this._getRowCount(true);if(f1>0){var g1=this._oNumberFormatInstance.format(f1);e1+=" ("+g1+")";}}this._oTitle.setText(e1);}if(!this._bIgnoreChange&&this._bAnnounceTableUpdate){this._bAnnounceTableUpdate=false;this._announceTableUpdate(f1);}};Q.prototype._announceTableUpdate=function(e1){var f1=i.getInstance();if(f1){var g1=d.getLibraryResourceBundle("sap.ui.mdc");var h1=this.getHeader();if(e1===undefined&&this._getRowCount(false)>0){f1.announce(g1.getText("table.ANNOUNCEMENT_TABLE_UPDATED",[h1]));}else if(e1>1){f1.announce(g1.getText("table.ANNOUNCEMENT_TABLE_UPDATED_MULT",[h1,e1]));}else if(e1===1){f1.announce(g1.getText("table.ANNOUNCEMENT_TABLE_UPDATED_SING",[h1,e1]));}else{f1.announce(g1.getText("table.ANNOUNCEMENT_TABLE_UPDATED_NOITEMS",[h1]));}}};Q.prototype._updateColumnsBeforeBinding=function(e1){var f1=[].concat(e1.sorter||[]);var g1=this.getColumns();var h1=this._bMobileTable;var i1=this.getPropertyHelper();g1.forEach(function(j1){var k1=d.byId(j1.getId()+"-innerColumn");var l1=i1.getSortableProperties(j1.getDataProperty()).map(function(o1){return o1.getPath();});if(l1.length>0){var m1=f1.find(function(m1){return l1.indexOf(m1.sPath)>-1;});var n1=m1&&m1.bDescending?"Descending":"Ascending";if(h1){k1.setSortIndicator(m1?n1:"None");}else{k1.setSorted(!!m1).setSortOrder(n1);}}});};Q.prototype._getRowCount=function(e1){var f1=this._getRowBinding();if(!f1){return e1?undefined:0;}var g1;if(!e1){g1=f1.getLength();}else{if(typeof f1.getCount==='function'){g1=f1.getCount();}else if(f1.isLengthFinal()){g1=f1.getLength();}}if(g1<0||g1==="0"){g1=0;}return g1;};Q.prototype.getRowBinding=function(){return this._getRowBinding();};Q.prototype._getRowBinding=function(){if(this._oTable){return this._oTable.getBinding(this._sAggregation);}};Q._addBindingListener=function(e1,f1,g1){if(!e1.events){e1.events={};}if(!e1.events[f1]){e1.events[f1]=g1;}else{var h1=e1.events[f1];e1.events[f1]=function(){g1.apply(this,arguments);h1.apply(this,arguments);};}};Q.prototype.rebindTable=function(){this.rebind();};Q.prototype.rebind=function(){if(this._bFullyInitialized){this.bindRows();}else{this._fullyInitialized().then(this.rebind.bind(this));}};function c1(e1){T.showPanel(this,"Columns",e1.getSource());}function d1(e1){T.showPanel(this,"Filter",e1.getSource());}Q.prototype._getSorters=function(){var e1=this.getSortConditions()?this.getSortConditions().sorters:[];var f1=[],g1=this.getPropertyHelper();e1.forEach(function(h1){var i1=g1.getPath(h1.name);f1.push(new S(i1,h1.descending));});return f1;};Q.prototype._onInnerTablePaste=function(e1){if(!this.getEnablePaste()){return;}this.firePaste({data:e1.getParameter("data")});};Q.prototype.exit=function(){if(this._oTemplate){this._oTemplate.destroy();}this._oTemplate=null;this._oTable=null;if(this._oToolbar&&!this._bTableExists){this._oToolbar.destroy();}this._oToolbar=null;this._oTitle=null;this._oNumberFormatInstance=null;U.forEach(function(e1){var f1=f(e1),g1="_o"+f1;this[g1]=null;},this);this._oTableReady=null;this._oFullInitialize=null;this._oPasteButton=null;if(this._oFilterInfoBarInvisibleText){this._oFilterInfoBarInvisibleText.destroy();this._oFilterInfoBarInvisibleText=null;}C.prototype.exit.apply(this,arguments);};Q.prototype.addAction=function(e1){if(e1.getMetadata().getName()!=="sap.ui.mdc.actiontoolbar.ActionToolbarAction"){e1=new t(e1.getId()+"-action",{action:e1});}return C.prototype.addAggregation.apply(this,["actions",e1]);};return Q;});
