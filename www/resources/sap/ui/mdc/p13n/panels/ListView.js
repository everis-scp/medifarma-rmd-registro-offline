/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BasePanel","sap/m/Label","sap/m/ColumnListItem","sap/m/HBox","sap/m/VBox","sap/ui/core/Icon","sap/m/Text","sap/m/Column","sap/m/Table","sap/m/library","sap/m/ToolbarSpacer","sap/m/Button","sap/m/OverflowToolbar","sap/ui/model/Filter"],function(B,L,C,H,V,I,T,a,b,l,c,d,O,F){"use strict";var e=l.ListKeyboardMode;var f=l.FlexJustifyContent;var g=l.ListType;var h=B.extend("sap.ui.mdc.p13n.panels.ListView",{metadata:{library:"sap.ui.mdc",properties:{showHeader:{type:"boolean",defaultValue:false},enableCount:{type:"boolean",defaultValue:false}}},renderer:{apiVersion:2}});h.prototype.applySettings=function(){this.setTemplate(this._getListTemplate());B.prototype.applySettings.apply(this,arguments);this.addStyleClass("sapUiMDCListView");this._aInitializedFields=[];this._bShowFactory=false;this.addStyleClass("listViewHover");this.displayColumns();this.setEnableReorder(true);};h.prototype.setItemFactory=function(i){this.setProperty("itemFactory",i);this._oListControl.setGrowing(!!i);return this;};h.prototype._getListTemplate=function(){return new C({selected:"{"+this.P13N_MODEL+">visible}",type:g.Active,cells:[new V({items:[new L({wrapping:true,required:"{"+this.P13N_MODEL+">required}",tooltip:"{"+this.P13N_MODEL+">tooltip}",text:"{"+this.P13N_MODEL+">label}"})]}),new H({justifyContent:f.Center,items:[new I({src:"sap-icon://circle-task-2",size:"0.5rem",color:sap.ui.core.IconColor.Neutral,visible:{path:this.P13N_MODEL+">isFiltered",formatter:function(i){if(i){return true;}else{return false;}}}})]})]});};h.prototype.setShowHeader=function(s){if(s){var S=this.getResourceText("p13nDialog.SHOW_SELECTED");var i=this.getResourceText("p13nDialog.SHOW_ALL");this._oListControl.setHeaderToolbar(new O({content:[this._getSearchField(),new c(),new d({press:function(E){this._bShowSelected=E.getSource().getText()==S;this._filterList(this._bShowSelected,this._sSearch);E.getSource().setText(this._bShowSelected?i:S);}.bind(this),text:S})]}));}this.setProperty("showHeader",s);return this;};h.prototype._filterList=function(s,S){var o=[],i=[];if(s){i=new F(this._getPresenceAttribute(),"EQ",true);}if(S){o=new F("label","Contains",S);}this._oListControl.getBinding("items").filter(new F([].concat(i,o),true));};h.prototype._onSearchFieldLiveChange=function(E){this._sSearch=E.getSource().getValue();this._filterList(this._bShowSelected,this._sSearch);};h.prototype._handleActivated=function(o){this.removeMoveButtons();if(this._oHoveredItem&&this._oHoveredItem.getBindingContextPath()){var v=!!this.getP13nModel().getProperty(this._oHoveredItem.getBindingContextPath()).isFiltered;var i=this._oHoveredItem.getCells()[1].getItems()[0];i.setVisible(v);}var j=o.getCells()[1].getItems()[0];j.setVisible(false);this._oHoveredItem=o;this._updateEnableOfMoveButtons(o,false);this._addMoveButtons(o);};h.prototype.removeMoveButtons=function(){var m=this._getMoveButtonContainer();if(m){m.removeItem(this._getMoveTopButton());m.removeItem(this._getMoveUpButton());m.removeItem(this._getMoveDownButton());m.removeItem(this._getMoveBottomButton());}};h.prototype._getMoveButtonContainer=function(){if(this._oMoveBottomButton&&this._oMoveBottomButton.getParent()&&this._oMoveBottomButton.getParent().isA("sap.m.FlexBox")){return this._oMoveBottomButton.getParent();}};h.prototype.showFactory=function(s){this._bShowFactory=s;this.displayColumns();if(s){this.removeStyleClass("listViewHover");this._oListControl.setKeyboardMode(e.Edit);this._addFactoryControl();}else{this.addStyleClass("listViewHover");this._oListControl.setKeyboardMode(e.Navigation);this._removeFactoryControl();}};h.prototype._updateCount=function(){this.getP13nModel().setProperty("/selectedItems",this._oListControl.getSelectedContexts(true).length);};h.prototype._selectTableItem=function(t,s){B.prototype._selectTableItem.apply(this,arguments);this._updateCount();};h.prototype.setP13nModel=function(m){this.setModel(m,"$p13n");this._updateCount();this.setPanelMode(true);this._getDragDropConfig().setEnabled(this.getEnableReorder());};h.prototype._removeFactoryControl=function(){this._oListControl.getItems().forEach(function(i){var o=i.getCells()[0];if(o.getItems().length>1){o.removeItem(o.getItems()[1]);}});this.removeStyleClass("sapUiMDCAFLabelMarkingList");return this._aInitializedFields;};h.prototype._moveSelectedItem=function(){this._oSelectedItem=this._getMoveButtonContainer().getParent();B.prototype._moveSelectedItem.apply(this,arguments);};h.prototype.getShowFactory=function(){return this._bShowFactory;};h.prototype.displayColumns=function(){var i=[this.getResourceText("p13nDialog.LIST_VIEW_COLUMN")];if(!this._bShowFactory){i.push(new a({width:"25%",hAlign:"Center",vAlign:"Middle",header:new T({text:this.getResourceText("p13nDialog.LIST_VIEW_ACTIVE")})}));}this.setPanelColumns(i);};h.prototype.setPanelColumns=function(i){this._sText=i[0];var E=this.getEnableCount();if(E){var o=new a({header:new T({text:{parts:[{path:this.P13N_MODEL+'>/selectedItems'},{path:this.P13N_MODEL+'>/items'}],formatter:function(s,A){return this._sText+" "+this.getResourceText('p13nDialog.HEADER_COUNT',[s,A.length]);}.bind(this)}})});i[0]=o;}B.prototype.setPanelColumns.apply(this,arguments);};h.prototype._addFactoryControl=function(o){this._oListControl.getItems().forEach(function(i){var j=i.getBindingContext(this.P13N_MODEL);var k=this.getItemFactory().call(this,j);var m=i.getCells()[0];m.addItem(k);}.bind(this));this.addStyleClass("sapUiMDCAFLabelMarkingList");};h.prototype._createInnerListControl=function(){return new b(this.getId()+"-innerListViewTable",Object.assign({growing:false,growingThreshold:25,growingScrollToLoad:true,updateStarted:function(){this.removeMoveButtons();this._removeFactoryControl();}.bind(this),updateFinished:function(){if(this.getShowFactory()){this._addFactoryControl();}}.bind(this)},this._getListControlConfig()));};h.prototype.getSelectedFields=function(){var s=[];this._loopItems(this._oListControl,function(i,k){if(i.getSelected()){s.push(k);}});return s;};h.prototype._loopItems=function(o,i){o.getItems().forEach(function(j){var p=j.getBindingContextPath();var k=this.getP13nModel().getProperty(p).name;i.call(this,j,k);}.bind(this));};h.prototype.filterWithoutDestroy=function(i){if(this._oListControl.getBinding("items")){this._oListControl.getBinding("items").filter(i,true);}};h.prototype._addMoveButtons=function(i){var t=i;if(!t){return;}var j=this.getP13nModel().getProperty(t.getBindingContextPath()).visible;if(j){t.getCells()[1].addItem(this._getMoveTopButton());t.getCells()[1].addItem(this._getMoveUpButton());t.getCells()[1].addItem(this._getMoveDownButton());t.getCells()[1].addItem(this._getMoveBottomButton());}};h.prototype.exit=function(){B.prototype.exit.apply(this,arguments);this._aInitializedFields=null;this._oHoveredItem=null;this._bShowFactory=null;this._sSearch=null;this._bShowSelected=null;};return h;});
