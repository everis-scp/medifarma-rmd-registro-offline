// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/renderers/fiori2/search/controls/SearchFieldGroup','sap/ushell/renderers/fiori2/search/SearchHelper','sap/base/Log'],function(S,a,L){"use strict";jQuery.sap.declare('sap.ushell.renderers.fiori2.search.SearchShellHelper');var m=sap.ushell.renderers.fiori2.search.SearchShellHelper={};var s="sapUshellShellShowSearchOverlay";var b;m.injectSearchModel=function(_){b=b||_;};jQuery.extend(m,{init:function(){var t=this;sap.ushell.Container.getService("Search").prefetch();sap.ui.require('sap/ushell/renderers/fiori2/search/SearchModel');t.oModel=sap.ushell.renderers.fiori2.search.getModelSingleton();t.oShellHeader=sap.ui.getCore().byId('shell-header');t.oSearchFieldGroup=new S("searchFieldInShell");t.oSearchFieldGroup.setModel(t.oModel);t.oShellHeader.setSearch(t.oSearchFieldGroup);t.setSearchState('COL');this.setSearchStateSync=this.setSearchState;this.setSearchState=a.delayedExecution(this.setSearchState,500);t.oSearchInput=t.oSearchFieldGroup.input;t.oSearchInput.setMaxSuggestionWidth("30rem");t.oSearchInput.setValue(t.oModel.getSearchBoxTerm());t.oSearchSelect=t.oSearchFieldGroup.select;var l=new sap.ui.core.InvisibleText("selectLabel",{text:sap.ushell.resources.i18n.getText("searchIn")});if(l){t.oSearchSelect.addAriaLabelledBy("selectLabel");}t.oSearchSelect.setTooltip(sap.ushell.resources.i18n.getText("searchInTooltip"));t.oSearchSelect.addEventDelegate({onAfterRendering:function(e){jQuery('#searchFieldInShell-select-icon').attr('title',sap.ushell.resources.i18n.getText("searchIn"));}},t.oSearchSelect);t.oSearchSelect.setTooltip(sap.ushell.resources.i18n.getText("searchIn"));t.oSearchSelect.attachChange(function(e){t.focusInputField({selectContent:true});});t.oSearchButton=t.oSearchFieldGroup.button;t.oSearchButton.bindProperty("type",{parts:[{path:'/searchButtonStatus'}],formatter:function(c){if(c==='search'){return sap.m.ButtonType.Emphasized;}return sap.m.ButtonType.Default;}});t.oSearchButton.attachPress(function(){t.handleClickSearchButton();});t.oSearchButton.addEventDelegate({onAfterRendering:function(){var c=jQuery("div.sapUshellShellSearchHidden").length===0;var d=t.oModel.getProperty("/searchButtonStatus")==="close";var $=jQuery(t.oSearchButton.getDomRef());if(c){if(d){$.attr("aria-pressed",true);}else{$.removeAttr("aria-pressed");}}else{$.attr("aria-pressed",false);}}});t.oSearchCancelButton=t.oSearchFieldGroup.cancelButton;t.oSearchCancelButton.attachPress(function(){t.setSearchState('COL');window.setTimeout(function(){sap.ui.getCore().byId('sf').focus();},1000);});this.oSearchFieldGroup.setCancelButtonActive(false);t.registerFocusHandler();jQuery(document).on('keydown',function(e){if(e.keyCode===27){e.preventDefault();if(a.isSearchAppActive()){return;}if(t.oSearchInput){if(t.oSearchInput.getValue()===""){t.setSearchState('COL');window.setTimeout(function(){sap.ui.getCore().byId('sf').focus();},1000);}else if(t.oSearchInput.getValue()===" "){t.oSearchInput.setValue("");}}}});sap.ui.getCore().getEventBus().subscribe("shell","searchCompLoaded",t.onSearchComponentLoaded,t);sap.ui.getCore().getEventBus().subscribe("allSearchFinished",t.onAllSearchFinished,t);sap.ui.getCore().byId('viewPortContainer').attachAfterNavigate(t.onAfterNavigate,t);sap.ui.getCore().getEventBus().subscribe("sap.ushell","appComponentLoaded",function(){var o=sap.ui.getCore().byId('searchContainerResultsView');if(o&&o.oFocusHandler){o.oFocusHandler.setFocus();}});t.oShellHeader.attachSearchSizeChanged(this.sizeSearchFieldChanged.bind(this));},sizeSearchFieldChanged:function(e){var c=e.mParameters.remSize;var l=24;if(c<=l){this.oSearchSelect.setDisplayMode('icon');}else{this.oSearchSelect.setDisplayMode('default');}l=9;if(c<l){this.oSearchButton.setVisible(false);}else{this.oSearchButton.setVisible(true);}if(e.getParameter('isFullWidth')){this.oSearchFieldGroup.setCancelButtonActive(true);this.oSearchFieldGroup.addStyleClass('sapUshellSearchInputFullWidth');}else{this.oSearchFieldGroup.setCancelButtonActive(false);this.oSearchFieldGroup.removeStyleClass('sapUshellSearchInputFullWidth');}},sizeChanged:function(p){switch(p.name){case"Phone":this.oSearchFieldGroup.setCancelButtonActive(true);break;case"Tablet":this.oSearchFieldGroup.setCancelButtonActive(false);break;case"Desktop":this.oSearchFieldGroup.setCancelButtonActive(false);break;default:break;}},registerFocusHandler:function(){var r=true;if(!r){return;}var t=this;var c=t.oSearchInput.getModel();t.oSearchInput.addEventDelegate({onAfterRendering:function(){var i=jQuery(t.oSearchInput.getDomRef()).find('input')[0];var $=jQuery(i);$.on('focus',function(e){t.log('raw_in',document.activeElement);if(!t.isFocusHandlerActive){return;}t.setSearchState('EXP');});$.on('blur',function(e){t.log('raw_out',document.activeElement);if(!t.isFocusHandlerActive){return;}var p=t.oSearchSelect.getPicker();if(p&&p.oPopup&&p.oPopup.eOpenState==="OPENING"){return;}if(!a.isSearchAppActive()&&t.oSearchInput.getValue().length===0&&c.getDataSource()===c.getDefaultDataSource()){t.setSearchState('COL');}else{t.setSearchState('EXP_S');}});}});t.oSearchSelect.addEventDelegate({onAfterRendering:function(){var d=t.oSearchSelect.getDomRef();d=d.querySelector('select');d.addEventListener('focus',function(e){t.log('raw_in_select',document.activeElement);if(!t.isFocusHandlerActive){return;}if(t.oShellHeader.getSearchState()==='EXP_S'&&!t.isNoSearchResultsScreen()){t.setSearchState('EXP_S',true);return;}t.setSearchState.abort();});d.addEventListener('blur',function(e){t.log('raw_out_select',document.activeElement);if(!t.isFocusHandlerActive){return;}var p=t.oSearchSelect.getPicker();if(p&&p.oPopup&&p.oPopup.eOpenState==="OPENING"){return;}if(!a.isSearchAppActive()&&t.oSearchInput.getValue().length===0&&c.getDataSource()===c.getDefaultDataSource()){t.setSearchState('COL');}else{t.setSearchState('EXP_S');}});}});t.oSearchButton.addEventDelegate({onAfterRendering:function(){var d=t.oSearchButton.getDomRef();d.addEventListener('focus',function(e){t.log('raw_in_button',document.activeElement);if(!t.isFocusHandlerActive){return;}t.setSearchState.abort();});d.addEventListener('blur',function(e){t.log('raw_out_button',document.activeElement);if(!t.isFocusHandlerActive){return;}if(!a.isSearchAppActive()&&t.oSearchInput.getValue().length===0&&c.getDataSource()===c.getDefaultDataSource()){t.setSearchState('COL');}else{t.setSearchState('EXP_S');}});}});this.enableFocusHandler(true);},enableFocusHandler:function(c){this.isFocusHandlerActive=c;if(!c&&this.setSearchState.abort){this.setSearchState.abort();}},isOverlayShown:function(){var c=this.oShellHeader.getShellLayoutControl();return c.hasStyleClass(s);},setSearchState:function(c,d){var e=sap.ui.getCore().byId('sf');if(!e){return;}if(typeof d==='undefined'){switch(c){case'EXP':d=true;break;case'EXP_S':d=false;break;case'COL':d=false;break;}if(this.isNoSearchResultsScreen()){d=false;}}if(sap.ui.getCore().byId('searchFieldInShell')===undefined){return;}if(this.oShellHeader.getSearchState()===c&&d===this.isOverlayShown()){return;}if(c==='COL'){this.enableFocusHandler(false);}else{this.enableFocusHandler(true);}this.log('set search state',c,document.activeElement);switch(c){case'COL':this.oModel.abortSuggestions();this.oShellHeader.setSearchState(c,35,d);this.oSearchCancelButton.setVisible(false);e.setVisible(true);break;case'EXP_S':this.oShellHeader.setSearchState(c,35,d);this.oSearchCancelButton.setVisible(true);e.setVisible(false);break;case'EXP':this.oShellHeader.setSearchState(c,35,d);this.oSearchCancelButton.setVisible(true);e.setVisible(false);this.focusInputField({selectContent:true});break;default:break;}},isNoSearchResultsScreen:function(){return a.isSearchAppActive()&&this.oModel.getProperty("/boCount")===0&&this.oModel.getProperty("/appCount")===0;},onShellSearchButtonPressed:function(e){if(sap.ui.getCore().byId('searchFieldInShell')===undefined){this.init();}else if(!a.isSearchAppActive()&&this.oShellHeader.getSearchState()==='COL'){this.resetModel();}this.setSearchState('EXP');},handleClickSearchButton:function(){if(this.oSearchInput.getValue()===""&&this.oModel.getDataSource()===this.oModel.getDefaultDataSource()){this.setSearchState('COL');window.setTimeout(function(){sap.ui.getCore().byId('sf').focus();},1000);}},focusInputField:function(o){o=o||{};var t=this;if(t.focusInputFieldTimeout){window.clearTimeout(t.focusInputFieldTimeout);t.focusInputFieldTimeout=null;}var d=function(r){if(!t.oSearchInput){return;}t.focusInputFieldTimeout=null;var c=t.oSearchInput.getDomRef();if(c&&jQuery(c).is(':visible')&&!sap.ui.getCore().getUIDirty()){if(t.oSearchInput.getEnabled()){t.oSearchInput.focus();if(o.selectContent){t.oSearchInput.selectText(0,9999);}return;}}if(r>0){t.focusInputFieldTimeout=window.setTimeout(function(){if(!t.oModel.getProperty('/initializingObjSearch')){r--;}d(r);},100);}};d(10);},getDefaultOpen:function(){return this.defaultOpen;},setDefaultOpen:function(d){this.defaultOpen=d;},getSearchInput:function(){return this.oSearchFieldGroup?this.oSearchFieldGroup.input:null;},onAfterNavigate:function(e){if(e.getParameter('toId')!=='shellPage-Action-search'&&e.getParameter('toId')!=='applicationShellPage-Action-search'&&e.getParameter('toId')!=='application-Action-search'){return;}var o=sap.ui.getCore().byId('searchContainerResultsView');if(o&&o.oFocusHandler){o.oFocusHandler.setFocus();}if(o){var c=o.resultList;if(c&&c.getItems()){var M=c.getItems();for(var i=0;i<M.length;i++){var d=M[i];if(d.getContent()&&d.getContent().length>0){d.getContent()[0]._showOrHideExpandButton();}}}}sap.ui.getCore().getEventBus().publish("searchLayoutChanged");},onAllSearchFinished:function(){this.oSearchInput.setValue(this.oModel.getSearchBoxTerm());this.log('search finished');this.setSearchState('EXP_S');},onSearchComponentLoaded:function(){if(!a.isSearchAppActive()){return;}this.setSearchState('EXP_S');},resetModel:function(){this.oSearchInput.setValue('');this.oModel.resetQuery();},logSwitch:true,log:function(){if(!this.logSwitch){return;}var l=function(e){var f=e.getAttribute('id');if(f){return f;}return'unknown_id';};var c=function(e){var r=[];for(var i=0;i<e.classList.length;++i){r.push(e.classList.item(i));}return r.join(',');};var p=['xx'];for(var i=0;i<arguments.length;++i){var d=arguments[i];if(d&&d.getAttribute){p.push(l(d)+','+c(d));continue;}if(d){p.push(d);continue;}p.push('undef');}L.debug(p.join(' | '),undefined,"sap.ushell.renderers.fiori2.search.SearchShellHelper");}});return m;});