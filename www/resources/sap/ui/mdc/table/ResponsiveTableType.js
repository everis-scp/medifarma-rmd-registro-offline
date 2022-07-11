/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./TableTypeBase","../library","sap/m/Button","sap/ui/Device","sap/m/plugins/ColumnResizer"],function(C,T,l,B,D,a){"use strict";var I,b,c;var G=l.GrowingMode;var R=l.RowAction;var d=T.extend("sap.ui.mdc.table.ResponsiveTableType",{metadata:{library:"sap.ui.mdc",properties:{growingMode:{type:"sap.ui.mdc.GrowingMode",defaultValue:G.Basic},showDetailsButton:{type:"boolean",group:"Misc",defaultValue:false},detailsButtonSetting:{type:"sap.ui.core.Priority[]",group:"Behavior"},popinLayout:{type:"sap.m.PopinLayout",group:"Appearance",defaultValue:"Block"}}}});d.prototype.setDetailsButtonSetting=function(p){this.setProperty("detailsButtonSetting",p,true);return this;};d.prototype.updateRelevantTableProperty=function(t,p,v){if(t&&t.isA("sap.m.Table")){if(p==="growingMode"){t.setGrowingScrollToLoad(v===G.Scroll);t.setGrowing(v!==G.None);}else if(p==="showDetailsButton"){this.updateShowDetailsButton(t,v);}else if(p==="popinLayout"){t.setPopinLayout(v);}}};d.updateDefault=function(t){if(t){t.setGrowing(true);t.setGrowingScrollToLoad(false);}};d.prototype.updateShowDetailsButton=function(t,v){if(v&&!this._oShowDetailsButton){t.getHeaderToolbar().insertEnd(this._getShowDetailsButton(),0);this._renderShowDetailsButton();t.attachEvent("popinChanged",this._onPopinChanged,this);t.setHiddenInPopin(this._getImportanceToHide());}else if(!v&&this._oShowDetailsButton){t.detachEvent("popinChanged",this._onPopinChanged,this);t.getHeaderToolbar().removeEnd(this._oShowDetailsButton);t.setHiddenInPopin([]);this._oShowDetailsButton.destroy();delete this._oShowDetailsButton;}};d.loadTableModules=function(){if(!I){return new Promise(function(r,e){sap.ui.require(["sap/m/Table","sap/m/Column","sap/m/ColumnListItem"],function(f,g,h){I=f;b=g;c=h;r();},function(){e("Failed to load some modules");});});}else{return Promise.resolve();}};d.createTable=function(i,s){return new I(i,s);};d.createColumn=function(i,s){return new b(i,s);};d.createTemplate=function(i,s){return new c(i,s);};d.updateSelection=function(t){t._oTable.setMode(T.getSelectionMode(t));};d.updateMultiSelectMode=function(t){t._oTable.setMultiSelectMode(t.getMultiSelectMode());};d.updateNavigation=function(t){t._oTemplate.setType(R.Navigation);};d.updateRowAction=function(t,n){var s=t.hasListeners("rowPress")?"Active":"Inactive";t._oTemplate.setType(s);if(n){this.updateNavigation(t);}};d.updateRowSettings=function(r,o){r.unbindProperty("navigated");r.unbindProperty("highlight");r.unbindProperty("highlightText");r.applySettings(o.getAllSettings());};d.disableColumnResizer=function(t,i){var o=a.getPlugin(i);if(o){o.setEnabled(false);o.detachColumnResize(t._onColumnResize,t);}};d.enableColumnResizer=function(t,i){i.setFixedLayout("Strict");var o=a.getPlugin(i);if(!o){var e=new a();i.addDependent(e);e.attachColumnResize(t._onColumnResize,t);}else{o.setEnabled(true);o.detachColumnResize(t._onColumnResize,t);o.attachColumnResize(t._onColumnResize,t);}};d.startColumnResize=function(i,o){var e=a.getPlugin(i);if(!e){return;}return e.getColumnResizeButton(o);};d.prototype._renderShowDetailsButton=function(){var r=C.getLibraryResourceBundle("sap.ui.mdc"),t;t=this.bHideDetails?r.getText("table.SHOWDETAILS_TEXT"):r.getText("table.HIDEDETAILS_TEXT");this._oShowDetailsButton.setTooltip(t);this._oShowDetailsButton.setText(t);};d.prototype._toggleShowDetails=function(v){if(!this._oShowDetailsButton||(v===this.bHideDetails)){return;}var t=this.getRelevantTable();this.bHideDetails=v;if(this.bHideDetails){t.setHiddenInPopin(this._getImportanceToHide());}else{t.setHiddenInPopin([]);}this._renderShowDetailsButton();};d.prototype._getShowDetailsButton=function(){if(!this._oShowDetailsButton){this.bHideDetails=true;this._oShowDetailsButton=new B(this.getId()+"-showHideDetails",{visible:false,press:[function(){this._toggleShowDetails(!this.bHideDetails);},this]});}return this._oShowDetailsButton;};d.prototype._getImportanceToHide=function(){var e=this.getDetailsButtonSetting()||[];var i=[];if(e.length){i=e;}else{i=D.system.phone?["Low","Medium"]:["Low"];}return i;};d.prototype._onPopinChanged=function(e){var h=e.getParameter("hasPopin");var H=e.getParameter("hiddenInPopin");var v=e.getSource().getVisibleItems().length;if(v&&(H.length||(h&&!this.bHideDetails))){this._oShowDetailsButton.setVisible(true);}else{this._oShowDetailsButton.setVisible(false);}};return d;});
