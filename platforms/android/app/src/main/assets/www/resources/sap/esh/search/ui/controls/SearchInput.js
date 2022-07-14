/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/m/Input","sap/m/Label","sap/m/Text","sap/m/ListType","sap/m/Column","sap/m/ColumnListItem","sap/m/CustomListItem","sap/m/FlexItemData","sap/m/BusyIndicator","sap/m/FlexBox","sap/ui/core/Icon","sap/ui/layout/HorizontalLayout","sap/ui/layout/VerticalLayout","sap/ui/model/BindingMode","sap/ushell/Config","sap/ushell/services/AppType","../SearchHelper","../suggestions/SuggestionType","../controls/SearchObjectSuggestionImage",],function(I,L,T,a,C,b,c,F,B,d,e,H,V,f,g,A,S,h,i){("use strict");return sap.m.Input.extend("sap.esh.search.ui.controls.SearchInput",{constructor:function(s,o){var t=this;o=Object.assign({width:"100%",showValueStateMessage:false,showTableSuggestionValueHelp:false,enableSuggestionsHighlighting:false,showSuggestion:true,filterSuggests:false,suggestionColumns:[new C()],autocomplete:false,tooltip:sap.esh.search.ui.resources.i18n.getText("search"),placeholder:{path:"/searchTermPlaceholder",mode:f.OneWay,},liveChange:this.handleLiveChange.bind(this),suggestionItemSelected:this.handleSuggestionItemSelected.bind(this),enabled:{parts:[{path:"/initializingObjSearch",},],formatter:function(j){return!j;},},},o);var p=sap.ui.Device.system.phone;sap.ui.Device.system.phone=false;I.prototype.constructor.apply(this,[s,o]);sap.ui.Device.system.phone=p;this.bindAggregation("suggestionRows",{path:"/suggestions",factory:function(s,j){return t.suggestionItemFactory(s,j);},});this.addStyleClass("searchInput");this._bUseDialog=false;this._bFullScreen=false;this._ariaDescriptionIdNoResults=s+"-No-Results-Description";this.listNavigationMode=false;this.listNavigationModeCache={};},isMobileDevice:function(){return false;},renderer:"sap.m.InputRenderer",onsapenter:function(j){if(!(this._oSuggestionPopup&&this._oSuggestionPopup.isOpen()&&this._oSuggPopover.getFocusedListItem())){this.getModel().invalidateQuery();this.triggerSearch();}sap.m.Input.prototype.onsapenter.apply(this,arguments);},triggerSearch:function(){var t=this;var m=t.getModel().getProperty("/messagePopoverControlId");var j=(sap.ui.getCore().byId(m));if(t.getModel().getProperty("/errors").length>0&&j&&j.isOpen()){j.close();j.setVisible(false);}S.subscribeOnlyOnce("triggerSearch","ESHSearchFinished",function(){t.getModel().autoStartApp();},t);var s=this.getValue();if(s.trim()===""){s="*";}this.getModel().setSearchBoxTerm(s,false);this.navigateToSearchApp();this.destroySuggestionRows();this.getModel().abortSuggestions();},handleLiveChange:function(){if(this._oSuggPopover&&this._oSuggPopover.handleListNavigation&&!this._oSuggPopover.handleListNavigation.decorated){var j=this._oSuggPopover.handleListNavigation;this._oSuggPopover.handleListNavigation=function(){this.listNavigationMode=true;this.listNavigationModeCache={};var v=j.apply(this._oSuggPopover,arguments);this.listNavigationMode=false;return v;}.bind(this);this._oSuggPopover.handleListNavigation.decorated=true;}var s=this.getValue();var m=this.getModel();m.setSearchBoxTerm(s,false);if(m.getSearchBoxTerm().length>0){m.doSuggestion();}else{this.destroySuggestionRows();m.abortSuggestions();}},handleSuggestionItemSelected:function(E){var m=this.getModel();var s=m.getSearchBoxTerm();var j;if(E.getId()==="AutoSelectAppSuggestion"){j=E.getParameter("suggestion");}else{j=E.getParameter("selectedRow").getBindingContext().getObject();}var k=j.searchTerm||"";var l=j.dataSource||m.getDataSource();var t=j.url;var n=j.uiSuggestionType;m.eventLogger.logEvent({type:m.eventLogger.SUGGESTION_SELECT,suggestionType:n,suggestionTerm:k,searchTerm:s,targetUrl:t,dataSourceKey:l?l.id:"",});this.selectText(0,0);switch(n){case h.App:this.destroySuggestionRows();m.abortSuggestions();if(t[0]==="#"){if(t.indexOf("#Action-search")===0&&t===decodeURIComponent(S.getHashFromUrl())){m.setSearchBoxTerm(m.getLastSearchTerm(),false);m._notifySubscribers("ESHSearchFinished");sap.ui.getCore().getEventBus().publish("ESHSearchFinished");return;}if(window.hasher){window.hasher.setHash(t);}else{window.location.href=t;}}else{var o=g.last("/core/shell/enableRecentActivity")&&g.last("/core/shell/enableRecentActivityLogging");if(o){var r={title:j.title,appType:A.URL,url:j.url,appId:j.url,};sap.ushell.Container.getRenderer("fiori2").logRecentActivity(r);}window.open(t,"_blank","noopener,noreferrer");m.setSearchBoxTerm("",false);this.setValue("");}if(t.indexOf("#Action-search")!==0){sap.ui.require("sap/esh/search/ui/SearchShellHelper").setSearchStateSync("COL");}else{this.focus();}break;case h.DataSource:m.setDataSource(l,false);m.setSearchBoxTerm("",false);this.setValue("");this.focus();break;case h.SearchTermData:m.setDataSource(l,false);m.setSearchBoxTerm(k,false);this.getModel().invalidateQuery();this.navigateToSearchApp();this.setValue(k);break;case h.SearchTermHistory:m.setDataSource(l,false);m.setSearchBoxTerm(k,false);this.getModel().invalidateQuery();this.navigateToSearchApp();this.setValue(k);break;case h.Object:if(j.titleNavigation){j.titleNavigation.performNavigation();}break;default:break;}},suggestionItemFactory:function(s,o){var j=o.getObject();switch(j.uiSuggestionType){case h.Object:return this.objectSuggestionItemFactory(s,o);case h.Header:return this.headerSuggestionItemFactory(s,o);case h.BusyIndicator:return this.busyIndicatorSuggestionItemFactory(s,o);default:return this.regularSuggestionItemFactory(s,o);}},busyIndicatorSuggestionItemFactory:function(){var j=new V("",{content:[new B("",{size:"0.6rem",}),],});(j).getText=function(){return this.getValue();}.bind(this);var l=new b("",{cells:[j],type:a.Inactive,});l.addStyleClass("searchSuggestion");l.addStyleClass("searchBusyIndicatorSuggestion");l.getVisible=this.assembleListNavigationModeGetVisibleFunction(l);return l;},headerSuggestionItemFactory:function(){var l=new L("",{text:"{label}",});var j=new V("",{content:[l],});(j).getText=function(){return this.getValue();}.bind(this);var k=new b("",{cells:[j],type:a.Inactive,});k.addStyleClass("searchSuggestion");k.addStyleClass("searchHeaderSuggestion");k.getVisible=this.assembleListNavigationModeGetVisibleFunction(k);return k;},assembleListNavigationModeGetVisibleFunction:function(l){return function(){if(!this.listNavigationMode){return true;}if(!this.listNavigationModeCache[l.getId()]){this.listNavigationModeCache[l.getId()]=true;return false;}else{return true;}}.bind(this);},assembleObjectSuggestionLabels:function(s){var l=[];var j=new L("",{text:"{label1}",});j.addEventDelegate({onAfterRendering:function(){S.boldTagUnescaper((this).getDomRef());},},j);j.addStyleClass("sapUshellSearchObjectSuggestion-Label1");l.push(j);if(s.label2){var k=new L("",{text:"{label2}",});k.addEventDelegate({onAfterRendering:function(){S.boldTagUnescaper((this).getDomRef());},},k);k.addStyleClass("sapUshellSearchObjectSuggestion-Label2");l.push(k);}var v=new V("",{content:l,});v.addStyleClass("sapUshellSearchObjectSuggestion-Labels");return v;},objectSuggestionItemFactory:function(s,o){var j=o.getObject();var k=[];if(j.imageExists&&j.imageUrl){if(j.imageUrl.startsWith("sap-icon://")){k.push(new e("",{src:j.imageUrl,}).addStyleClass("sapUshellSearchObjectSuggestIcon"));}else{k.push(new i({src:"{imageUrl}",isCircular:"{imageIsCircular}",}));}}var l=this.assembleObjectSuggestionLabels(j);k.push(l);var m=new H("",{content:k,});m.addStyleClass("sapUshellSearchObjectSuggestion-Container");(m).getText=function(){return this.getValue();}.bind(this);var n=new b("",{cells:[m],type:a.Active,});n.addStyleClass("searchSuggestion");n.addStyleClass("searchObjectSuggestion");return n;},regularSuggestionItemFactory:function(s,o){var t=this;var j=new e("",{src:"{icon}",}).addStyleClass("suggestIcon").addStyleClass("sapUshellSearchSuggestAppIcon").addStyleClass("suggestListItemCell");var l=(new F("",{shrinkFactor:1,minWidth:"4rem",}));var k=new T("",{text:"{label}",layoutData:l,wrapping:false,}).addStyleClass("suggestText").addStyleClass("suggestNavItem").addStyleClass("suggestListItemCell");k.addEventDelegate({onAfterRendering:function(){S.boldTagUnescaper((this).getDomRef());},},k);var m=new c("",{type:a.Active,content:new d("",{items:[j,k],}),});var n=o.oModel.getProperty(o.sPath);(m).getText=function(){return typeof n.searchTerm==="string"?n.searchTerm:t.getValue();};var p=new b("",{cells:[m],type:a.Active,});if(n.uiSuggestionType===h.App){if(n.title&&n.title.indexOf("combinedAppSuggestion")>=0){p.addStyleClass("searchCombinedAppSuggestion");}else{p.addStyleClass("searchAppSuggestion");}}if(n.uiSuggestionType===h.DataSource){p.addStyleClass("searchDataSourceSuggestion");}if(n.uiSuggestionType===h.SearchTermData){p.addStyleClass("searchBOSuggestion");}if(n.uiSuggestionType===h.SearchTermHistory){p.addStyleClass("searchHistorySuggestion");}p.addStyleClass("searchSuggestion");p.addEventDelegate({onAfterRendering:function(){var q=(p.$()).find(".suggestListItemCell");var r=0;q.each(function(){r+=$(this).outerWidth(true);});if(r>(p.$()).find("li").get(0).scrollWidth){p.setTooltip($(q[0]).text()+" "+$(q[2]).text());}},});return p;},navigateToSearchApp:function(){if(S.isSearchAppActive()||this.getModel().preventUpdateURL||this.getModel().isSearchCompositeControl){this.getModel()._firePerspectiveQuery();}else{var s=this.getModel().renderSearchURL();window.location.hash=s;}},getAriaDescriptionIdForNoResults:function(){return this._ariaDescriptionIdNoResults;},onAfterRendering:function(){var j=$(this.getDomRef()).find("#searchFieldInShell-input-inner");$(this.getDomRef()).find("input").attr("autocomplete","off");$(this.getDomRef()).find("input").attr("autocorrect","off");$(this.getDomRef()).find("input").attr("type","search");$(this.getDomRef()).find("input").attr("name","search");var k=jQuery('<form action=""></form>').on("submit",function(){return false;});$(this.getDomRef()).children("input").parent().append(k);$(this.getDomRef()).children("input").detach().appendTo(k);j.attr("aria-describedby",j.attr("aria-describedby")+" "+this._ariaDescriptionIdNoResults);},onValueRevertedByEscape:function(){if(S.isSearchAppActive()){return;}this.setValue(" ");},});});
