/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ComboBoxTextField','./SuggestionsPopover','sap/ui/base/ManagedObjectObserver','sap/ui/core/SeparatorItem','sap/ui/core/InvisibleText','sap/ui/base/ManagedObject','sap/base/Log','./library','sap/ui/Device',"sap/ui/dom/containsOrEquals","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/base/security/encodeXML","sap/base/strings/escapeRegExp","sap/m/inputUtils/forwardItemProperties","sap/m/inputUtils/highlightDOMElements","sap/m/inputUtils/ListHelpers"],function(C,S,M,a,I,b,L,l,D,c,K,q,e,d,f,h,g){"use strict";var P=l.PlacementType;var j=["value","enabled","name","placeholder","editable","textAlign","textDirection","valueState","valueStateText"];var k=C.extend("sap.m.ComboBoxBase",{metadata:{library:"sap.m","abstract":true,defaultAggregation:"items",properties:{showSecondaryValues:{type:"boolean",group:"Misc",defaultValue:false},open:{type:"boolean",defaultValue:false,hidden:true}},aggregations:{items:{type:"sap.ui.core.Item",multiple:true,singularName:"item",bindable:"bindable"},picker:{type:"sap.ui.core.PopupInterface",multiple:false,visibility:"hidden"}},events:{loadItems:{}},dnd:{draggable:false,droppable:true}}});k.prototype.oncompositionend=function(E){C.prototype.oncompositionend.apply(this,arguments);if(!D.browser.firefox){this.handleInputValidation(E,this.isComposingCharacter());}};k.prototype.updateItems=function(r){this.bItemsUpdated=false;this.destroyItems();this.updateAggregation("items");this.bItemsUpdated=true;if(this.hasLoadItemsEventListeners()){if(this.isOpen()){g.fillList(this.getItems(),this._getList(),this._mapItemToListItem.bind(this));this.setRecreateItems(false);}this.onItemsLoaded();}};k.prototype.setFilterFunction=function(F){if(F===null||F===undefined){this.fnFilter=null;return this;}if(typeof(F)!=="function"){L.warning("Passed filter is not a function and the default implementation will be used");}else{this.fnFilter=F;}return this;};k.prototype.highlightList=function(v){var i=[];i=this._getList().$().find('.sapMSLIInfo, .sapMSLITitleOnly');h(i,v);};k.prototype._decoratePopupInput=function(i){if(i){this.setTextFieldHandler(i);}return i;};k.prototype.setTextFieldHandler=function(t){var i=this,T=t._handleEvent;t._handleEvent=function(E){T.apply(this,arguments);if(/keydown|sapdown|sapup|saphome|sapend|sappagedown|sappageup|input/.test(E.type)){i._handleEvent(E);}};};k.prototype.refreshItems=function(){this.bItemsUpdated=false;this.refreshAggregation("items");};k.prototype.loadItems=function(i,o){var m=typeof i==="function";if(this.hasLoadItemsEventListeners()&&(this.getItems().length===0)){this._bOnItemsLoadedScheduled=false;if(m){o=q.extend({action:i,busyIndicator:true,busyIndicatorDelay:300},o);this.aMessageQueue.push(o);if((this.iLoadItemsEventInitialProcessingTimeoutID===-1)&&(o.busyIndicator)){this.iLoadItemsEventInitialProcessingTimeoutID=setTimeout(function n(){this.setInternalBusyIndicatorDelay(0);this.setInternalBusyIndicator(true);}.bind(this),o.busyIndicatorDelay);}}if(!this.bProcessingLoadItemsEvent){this.bProcessingLoadItemsEvent=true;this.fireLoadItems();}}else if(m){i.call(this);}};k.prototype.onItemsLoaded=function(){this.bProcessingLoadItemsEvent=false;clearTimeout(this.iLoadItemsEventInitialProcessingTimeoutID);if(this.bInitialBusyIndicatorState!==this.getBusy()){this.setInternalBusyIndicator(this.bInitialBusyIndicatorState);}if(this.iInitialBusyIndicatorDelay!==this.getBusyIndicatorDelay()){this.setInternalBusyIndicatorDelay(this.iInitialBusyIndicatorDelay);}for(var i=0,m,n,o;i<this.aMessageQueue.length;i++){m=this.aMessageQueue.shift();i--;o=(i+1)===this.aMessageQueue.length;n=o?null:this.aMessageQueue[i+1];if(typeof m.action==="function"){if((m.name==="input")&&!o&&(n.name==="input")){continue;}m.action.call(this);}}};k.prototype.hasLoadItemsEventListeners=function(){return this.hasListeners("loadItems");};k.prototype._scheduleOnItemsLoadedOnce=function(){if(!this._bOnItemsLoadedScheduled&&!this.isBound("items")&&this.hasLoadItemsEventListeners()&&this.bProcessingLoadItemsEvent){this._bOnItemsLoadedScheduled=true;setTimeout(this.onItemsLoaded.bind(this),0);}};k.prototype.getPickerInvisibleTextId=function(){return I.getStaticId("sap.m","COMBOBOX_AVAILABLE_OPTIONS");};k.prototype._getGroupHeaderInvisibleText=function(){if(!this._oGroupHeaderInvisibleText){this._oGroupHeaderInvisibleText=new I();this._oGroupHeaderInvisibleText.toStatic();}return this._oGroupHeaderInvisibleText;};k.prototype._isListInSuggestMode=function(){return this._getList().getItems().some(function(o){return!o.getVisible()&&g.getItemByListItem(this.getItems(),o).getEnabled();},this);};k.prototype.getSelectable=function(i){return i._bSelectable;};k.prototype._setItemsShownWithFilter=function(v){this._bItemsShownWithFilter=v;};k.prototype._getItemsShownWithFilter=function(){return this._bItemsShownWithFilter;};k.prototype.init=function(){C.prototype.init.apply(this,arguments);this.setPickerType(D.system.phone?"Dialog":"Dropdown");this._setItemsShownWithFilter(false);this.bItemsUpdated=false;this.bOpenedByKeyboardOrButton=false;this._bShouldClosePicker=false;this.bProcessingLoadItemsEvent=false;this.iLoadItemsEventInitialProcessingTimeoutID=-1;this.aMessageQueue=[];this.bInitialBusyIndicatorState=this.getBusy();this.iInitialBusyIndicatorDelay=this.getBusyIndicatorDelay();this._bOnItemsLoadedScheduled=false;this._bDoTypeAhead=true;this.getIcon().addEventDelegate({onmousedown:function(E){this._bShouldClosePicker=this.isOpen();}},this);this.getIcon().attachPress(this._handlePopupOpenAndItemsLoad.bind(this,true,this));this.fnFilter=null;var i=new M(function(o){var m=o.mutation;var n=o.child;var E={"remove":"detachEvent","insert":"attachEvent"};var p={"remove":"handleItemRemoval","insert":"handleItemInsertion"};if(!n[E[m]]||!this[p[m]]){return;}n[E[m]]("_change",this.onItemChange,this);this.setRecreateItems(true);this[p[m]](n);}.bind(this));i.observe(this,{aggregations:["items"]});};k.prototype.handleItemRemoval=function(i){};k.prototype.handleItemInsertion=function(i){};k.prototype.setRecreateItems=function(r){this._bRecreateItems=r;};k.prototype.getRecreateItems=function(){return this._bRecreateItems;};k.prototype.onBeforeRendering=function(){var s=this.isOpen(),v=s?this._getSuggestionsPopover()._getValueStateHeader().getText():null,V=s?this._getSuggestionsPopover()._getValueStateHeader().getValueState():null;C.prototype.onBeforeRendering.apply(this,arguments);if(s&&((this.getValueStateText()&&v!==this.getValueStateText())||(this.getValueState()!==V)||this.getFormattedValueStateText())){this._updateSuggestionsPopoverValueState();}};k.prototype._handlePopupOpenAndItemsLoad=function(o,O){var p;if(!this.getEnabled()||!this.getEditable()){return;}if(o&&this._getItemsShownWithFilter()){this._bShouldClosePicker=false;this.toggleIconPressedStyle(true);this.bOpenedByKeyboardOrButton=false;this.clearFilter();this._setItemsShownWithFilter(false);return;}if(this._bShouldClosePicker){this._bShouldClosePicker=false;this.close();return;}this.loadItems();this.bOpenedByKeyboardOrButton=o;if(this.isPlatformTablet()){this.syncPickerContent();p=this.getPicker();p.setInitialFocus(p);}if(O){p=this.getPicker();p&&p.setInitialFocus(O);}this.open();};k.prototype.exit=function(){C.prototype.exit.apply(this,arguments);if(this._getGroupHeaderInvisibleText()){this._getGroupHeaderInvisibleText().destroy();this._oGroupHeaderInvisibleText=null;}if(this._oSuggestionPopover){this._oSuggestionPopover.destroy();this._oSuggestionPopover=null;}clearTimeout(this.iLoadItemsEventInitialProcessingTimeoutID);this.aMessageQueue=null;this.fnFilter=null;};k.prototype.onsapshow=function(E){if(!this.getEnabled()||!this.getEditable()){return;}E.setMarked();if(E.keyCode===K.F4){this.onF4(E);}if(this._getItemsShownWithFilter()){this.loadItems(this._handlePopupOpenAndItemsLoad.bind(this,true));return;}if(this.isOpen()){this.close();return;}this.selectText(0,this.getValue().length);this.loadItems();this.bOpenedByKeyboardOrButton=true;this.open();};k.prototype.onF4=function(E){E.preventDefault();};k.prototype.onsapescape=function(E){if(this.getEnabled()&&this.getEditable()&&this.isOpen()){E.setMarked();E.preventDefault();this.close();}else{C.prototype.onsapescape.apply(this,arguments);}};k.prototype.onsaphide=k.prototype.onsapshow;k.prototype.onsapfocusleave=function(E){if(!E.relatedControlId){C.prototype.onsapfocusleave.apply(this,arguments);return;}var r=sap.ui.getCore().byId(E.relatedControlId);if(r===this){return;}var p=this.getPicker(),F=r&&r.getFocusDomRef();if(p&&c(p.getFocusDomRef(),F)){return;}C.prototype.onsapfocusleave.apply(this,arguments);};k.prototype.getPopupAnchorDomRef=function(){return this.getDomRef();};k.prototype.addContent=function(p){};k.prototype.getList=function(){L.warning("[Warning]:","You are attempting to use deprecated method 'getList()', please refer to SAP note 2746748.",this);return this._getList();};k.prototype._getList=function(){var o=this._oSuggestionPopover&&this._oSuggestionPopover.getItemsContainer();if(this.bIsDestroyed||!o){return null;}return o;};k.prototype.setPickerType=function(p){this._sPickerType=p;};k.prototype.getPickerType=function(){return this._sPickerType;};k.prototype._updateSuggestionsPopoverValueState=function(){var s=this._getSuggestionsPopover();if(!s){return;}var v=this.getValueState(),n=this.getValueState()!==s._getValueStateHeader().getValueState(),N=this.getFormattedValueStateText(),V=this.getValueStateText(),i=N||n;if(s.isOpen()&&!i){this.setFormattedValueStateText(s._getValueStateHeader().getFormattedText());}s.updateValueState(v,(N||V),this.getShowValueStateMessage());};k.prototype.shouldValueStateMessageBeOpened=function(){var s=C.prototype.shouldValueStateMessageBeOpened.apply(this,arguments);return(s&&!this.isOpen());};k.prototype.onPropertyChange=function(o,i){var n=o.getParameter("newValue"),p=o.getParameter("name"),m="set"+p.charAt(0).toUpperCase()+p.slice(1),r=(i&&i.srcControl)||this.getPickerTextField();if(this.getInputForwardableProperties().indexOf(p)>-1&&r&&(typeof r[m]==="function")){r[m](n);}};k.prototype.getInputForwardableProperties=function(){return j;};k.prototype.isPickerDialog=function(){return this.getPickerType()==="Dialog";};k.prototype.isPlatformTablet=function(){var n=!D.system.combi,t=D.system.tablet&&n;return t;};k.prototype.getDropdownSettings=function(){return{showArrow:false,placement:P.VerticalPreferredBottom,offsetX:0,offsetY:0,bounce:false,ariaLabelledBy:this.getPickerInvisibleTextId()||undefined};};k.prototype._configureList=function(){};k.prototype.createPicker=function(p){var o=this.getAggregation("picker");if(o){return o;}this._oSuggestionPopover=this._createSuggestionsPopover();o=this._oSuggestionPopover.getPopover();this.setAggregation("picker",o,true);this.configPicker(o);return o;};k.prototype.configPicker=function(p){};k.prototype._hasShowSelectedButton=function(){return false;};k.prototype._createSuggestionsPopover=function(){var s=new S(this);s.decorateParent(this);s.createSuggestionPopup(this,{showSelectedButton:this._hasShowSelectedButton()});this._decoratePopupInput(s.getInput());s.initContent(this.getId());this.forwardEventHandlersToSuggPopover(s);this._configureList(s.getItemsContainer());return s;};k.prototype.forwardEventHandlersToSuggPopover=function(s){s.setOkPressHandler(this._handleOkPress.bind(this));s.setCancelPressHandler(this._handleCancelPress.bind(this));s.setInputLabels(this.getLabels.bind(this));};k.prototype._handleOkPress=function(){var t=this,T=t.getPickerTextField();t.updateDomValue(T.getValue());t.onChange();t.close();};k.prototype._handleCancelPress=function(){this.close();this.revertSelection();};k.prototype.setSelectable=function(i,s){if(this.indexOfItem(i)<0){return;}i._bSelectable=s;var o=g.getListItem(i);if(o){o.setVisible(s);}};k.prototype.onBeforeOpen=function(){this._updateSuggestionsPopoverValueState();if(!this._getItemsShownWithFilter()){this.toggleIconPressedStyle(true);}};k.prototype.onBeforeClose=function(){this.bOpenedByKeyboardOrButton=false;this._setItemsShownWithFilter(false);this._updateSuggestionsPopoverValueState();};k.prototype.getPicker=function(){var p=this.getAggregation("picker");if(p&&!p.bIsDestroyed&&!this.bIsDestroyed){return p;}return null;};k.prototype._getSuggestionsPopover=function(){return this._oSuggestionPopover;};k.prototype.getValueStateLinks=function(){var H=this.getPicker()&&this.getPicker().getCustomHeader()&&typeof this.getPicker().getCustomHeader().getFormattedText==="function",F=H&&this.getPicker().getCustomHeader().getFormattedText(),v=F&&F.getControls();return v||[];};k.prototype.getPickerTextField=function(){var s=this._getSuggestionsPopover();return s?s.getInput():null;};k.prototype.getPickerTitle=function(){var p=this.getPicker(),H=p&&p.getCustomHeader();if(this.isPickerDialog()&&H){return H.getContentMiddle()[0];}return null;};k.prototype.revertSelection=function(){};k.prototype.hasContent=function(){return this.getItems().length>0;};k.prototype.syncPickerContent=function(){};k.prototype.open=function(){var p=this.getPicker();if(p){p.open();}return this;};k.prototype.getVisibleItems=function(){return g.getVisibleItems(this.getItems());};k.prototype.isItemSelected=function(){};k.prototype.getKeys=function(m){m=m||this.getItems();for(var i=0,n=[];i<m.length;i++){n[i]=m[i].getKey();}return n;};k.prototype.findItem=function(p,v){var m="get"+p.charAt(0).toUpperCase()+p.slice(1);for(var i=0,n=this.getItems();i<n.length;i++){if(n[i][m]()===v){return n[i];}}return null;};k.prototype.getItemByText=function(t){return this.findItem("text",t);};k.prototype.clearFilter=function(){this.getItems().forEach(function(i){var o=g.getListItem(i);if(o){o.setVisible(i.getEnabled()&&this.getSelectable(i));}},this);};k.prototype.onItemChange=function(o,s){f({item:o.getSource(),propName:o.getParameter("name"),propValue:o.getParameter("newValue")},s);};k.prototype.clearSelection=function(){};k.prototype.setInternalBusyIndicator=function(B){this.bInitialBusyIndicatorState=this.getBusy();return this.setBusy.apply(this,arguments);};k.prototype.setInternalBusyIndicatorDelay=function(i){this.iInitialBusyIndicatorDelay=this.getBusyIndicatorDelay();return this.setBusyIndicatorDelay.apply(this,arguments);};k.prototype.getItemAt=function(i){return this.getItems()[+i]||null;};k.prototype.getFirstItem=function(){return this.getItems()[0]||null;};k.prototype.getLastItem=function(){var i=this.getItems();return i[i.length-1]||null;};k.prototype.getEnabledItems=function(i){return g.getEnabledItems(i||this.getItems());};k.prototype.getItemByKey=function(s){return this.findItem("key",s);};k.prototype.addItemGroup=function(G,H,s){H=H||new a({text:b.escapeSettingsValue(G.text)||b.escapeSettingsValue(G.key)});this.addAggregation("items",H,s);if(this._getList()&&H.isA("sap.ui.core.SeparatorItem")){this._getList().addItem(this._mapItemToListItem(H));}return H;};k.prototype.isOpen=function(){var p=this.getPicker();return!!(p&&p.isOpen());};k.prototype.close=function(){var p=this.getPicker();if(p){p.close();}return this;};k.prototype.intersectItems=function(i,o){return i.filter(function(m){return o.map(function(O){return O.getId();}).indexOf(m.getId())!==-1;});};k.prototype.showItems=function(F){var i=this.fnFilter,m=function(){if(!this.getItems().length){return;}this.detachLoadItems(m);this.setFilterFunction(F||function(){return true;});this.applyShowItemsFilters();this._handlePopupOpenAndItemsLoad(false,this);this.setFilterFunction(i);}.bind(this);if(!this.getEnabled()||!this.getEditable()){return;}this._setItemsShownWithFilter(true);this.attachLoadItems(m);this.loadItems(m);};k.prototype.applyShowItemsFilters=function(){};return k;});
