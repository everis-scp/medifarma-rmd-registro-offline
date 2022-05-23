/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/XMLComposite','sap/ui/model/Filter','sap/ui/model/FilterOperator','sap/ui/base/ManagedObjectObserver','sap/base/Log','sap/ui/Device','sap/ui/model/json/JSONModel','sap/ui/core/ResizeHandler'],function(X,F,c,M,L,D,J,R){"use strict";var S=X.extend("sap.ui.mdc.base.personalization.SortPanel",{metadata:{library:"sap.ui.mdc",properties:{showReset:{type:"boolean",defaultValue:false,invalidate:true},showResetEnabled:{type:"boolean",defaultValue:false,invalidate:true}},associations:{source:{type:"sap.ui.core.Control"}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.mdc.base.personalization.SortPanelItem",multiple:true,singularName:"item",invalidate:true}},events:{initialOrderChanged:{keys:{type:"string[]"}},change:{},reset:{}}}});S.prototype.init=function(){var o=new J(D);o.setDefaultBindingMode("OneWay");this.setModel(o,"device");this._sKeyOfMarkedItem=null;this.aFilters=[];this._oObserver=new M(d.bind(this));this._oObserver.observe(this,{properties:["showResetEnabled"]});var s=this.byId("idScrollContainer");this._fnHandleResize=function(){var C=false;if(!this.getParent){return C;}var p=this.getParent();if(!p||!p.$){return C;}var t=this._getCompositeAggregation().getContent()[0];var $=p.$("cont");var i,h;if($.children().length>0&&t.$().length>0){var a=s.$()[0].clientHeight;i=$.children()[0].clientHeight;h=t?t.$()[0].clientHeight:0;var b=i-h;if(a!==b){s.setHeight(b+'px');C=true;}}return C;}.bind(this);this._sContainerResizeListener=R.register(s,this._fnHandleResize);};S.prototype.initialize=function(){this._removeMarkedStyleFromTableItem(this._getMarkedTableItem());this.fireInitialOrderChanged({keys:this._getInitialItemOrder()});var t=this._getVisibleTableItems()[0];this._toggleMarkedTableItem(t);this._updateEnableOfMoveButtons(t);};S.prototype.onDrop=function(e){this._moveTableItem(e.getParameter("draggedControl"),e.getParameter("droppedControl"));};S.prototype.onDragStart=function(e){this._toggleMarkedTableItem(e.getParameter("target"));};S.prototype.onSelectionChange=function(e){e.getParameter("listItems").forEach(function(t){this._selectTableItem(t);},this);};S.prototype.onItemPressed=function(e){var t=e.getParameter('listItem');this._toggleMarkedTableItem(t);this._updateEnableOfMoveButtons(t);};S.prototype.onSearchFieldLiveChange=function(e){var s=e.getSource();this._defineTableFiltersByText(s?s.getValue():"");this._filterTable(this.aFilters);};S.prototype.onSwitchButtonShowSelected=function(){this._defineTableFiltersByText(this._getSearchText());this._filterTable(this.aFilters);};S.prototype.onPressButtonMoveToTop=function(){this._moveTableItem(this._getMarkedTableItem(),this._getVisibleTableItems()[0]);};S.prototype.onPressButtonMoveUp=function(){var v=this._getVisibleTableItems();this._moveTableItem(this._getMarkedTableItem(),v[v.indexOf(this._getMarkedTableItem())-1]);};S.prototype.onPressButtonMoveDown=function(){var v=this._getVisibleTableItems();this._moveTableItem(this._getMarkedTableItem(),v[v.indexOf(this._getMarkedTableItem())+1]);};S.prototype.onPressButtonMoveToBottom=function(){var v=this._getVisibleTableItems();this._moveTableItem(this._getMarkedTableItem(),v[v.length-1]);};S.prototype.onPressReset=function(){this._removeMarkedStyleFromTableItem(this._getMarkedTableItem());this.fireReset();};S.prototype.onAfterClose=function(){this.fireCancel();};S.prototype.onChangeOfSortOrder=function(e){var s=e.getParameter("selectedItem");if(s){this.fireChange();}};S.prototype._selectTableItem=function(t){this._toggleMarkedTableItem(t);this._updateEnableOfMoveButtons(t);this.fireChange();};S.prototype._moveTableItem=function(t,T){this._removeMarkedStyleFromTableItem(this._getMarkedTableItem());var r=this.getModel("$sapuimdcPanel").getData().items;var m=_(this._getKeyByTableItem(t),r);r.splice(r.indexOf(m),1);r.splice(this._getItemPositionOfKey(this._getKeyByTableItem(T)),0,m);this.getModel("$sapuimdcPanel").setProperty("/items",r);this.fireChange();this._filterTable(this.aFilters);this._toggleMarkedTableItem(this._getMarkedTableItem());this._updateEnableOfMoveButtons(this._getMarkedTableItem());};S.prototype._getInitialItemOrder=function(){var k=this.getItems().filter(function(i){return i.getSelected();}).map(function(i){return i.getName();});var K=this.getItems().filter(function(i){return!i.getSelected();}).sort(function(a,b){if(a.getLabel()<b.getLabel()){return-1;}else if(a.getLabel()>b.getLabel()){return 1;}else{return 0;}}).map(function(i){return i.getName();});return k.concat(K);};S.prototype._isFilteredByShowSelected=function(){return false;};S.prototype._getSearchText=function(){var s=this.byId("idSearchField")||null;return s?s.getValue():"";};S.prototype._getTable=function(){return this.byId("idList")||null;};S.prototype._getTableBinding=function(){return this._getTable().getBinding("items");};S.prototype._getTableBindingContext=function(){return this._getTableBinding().getContexts();};S.prototype._setMarkedTableItem=function(t){this._sKeyOfMarkedItem=this._getKeyByTableItem(t);};S.prototype._getMarkedTableItem=function(){return this._getTableItemByKey(this._sKeyOfMarkedItem);};S.prototype._getVisibleTableItems=function(){return this._getTable().getItems().filter(function(t){return!!t.getVisible();});};S.prototype._getSelectedTableItems=function(){return this._getTable().getItems().filter(function(t){return!!t.getSelected();});};S.prototype._getTableItemByKey=function(k){var C=this._getTableBindingContext();var t=this._getTable().getItems().filter(function(T,i){return C[i].getObject().getName()===k;});return t[0];};S.prototype._getKeyByTableItem=function(t){var i=this._getTable().indexOfItem(t);return i<0?null:this._getTableBindingContext()[i].getObject().getName();};S.prototype._getItemPositionOfKey=function(k){return this.getItems().indexOf(this._getItemByKey(k));};S.prototype._getItemByKey=function(k){var i=this.getItems().filter(function(I){return I.getName()===k;});return i[0];};S.prototype._defineTableFiltersByText=function(s){this.aFilters=[];if(this._isFilteredByShowSelected()===true){this.aFilters.push(new sap.ui.model.Filter("selected","EQ",true));}if(s){this.aFilters.push(new F([new F("label",c.Contains,s),new F("tooltip",c.Contains,s)],false));}};S.prototype._filterTable=function(f){this._removeMarkedStyleFromTableItem(this._getMarkedTableItem());this._getTableBinding().filter(f);this._toggleMarkedTableItem(this._getMarkedTableItem());this._updateEnableOfMoveButtons(this._getMarkedTableItem());};S.prototype._toggleMarkedTableItem=function(t){this._removeMarkedStyleFromTableItem(this._getMarkedTableItem());var k=this._getKeyByTableItem(t);if(k){this._setMarkedTableItem(t);this._addMarkedStyleToTableItem(t);}};S.prototype._addMarkedStyleToTableItem=function(t){if(t){t.addStyleClass("sapUiMdcPersonalizationDialogMarked");}};S.prototype._removeMarkedStyleFromTableItem=function(t){if(t){t.removeStyleClass("sapUiMdcPersonalizationDialogMarked");}};S.prototype._setFocus=function(i){i.getDomRef().focus();};S.prototype._updateEnableOfMoveButtons=function(t){var v=this._getVisibleTableItems();var e=v.indexOf(t)>0;if(this._getManagedObjectModel().getProperty("/@custom/isMoveUpButtonEnabled")===true&&e===false){this._setFocus(t);}this._getManagedObjectModel().setProperty("/@custom/isMoveUpButtonEnabled",e);e=v.indexOf(t)>-1&&v.indexOf(t)<v.length-1;if(this._getManagedObjectModel().getProperty("/@custom/isMoveDownButtonEnabled")===true&&e===false){this._setFocus(t);}this._getManagedObjectModel().setProperty("/@custom/isMoveDownButtonEnabled",e);};function _(k,a){var e=a.filter(function(E){return E.name!==undefined&&E.name===k;});return e.length?e[0]:null;}function d(C){if(C.object.isA("sap.ui.mdc.base.personalization.SortPanel")){switch(C.name){case"showResetEnabled":if(C.current===false&&C.old===true){this._setFocus(this._getCompositeAggregation());}break;default:L.error("The property or aggregation '"+C.name+"' has not been registered.");}}}return S;},true);