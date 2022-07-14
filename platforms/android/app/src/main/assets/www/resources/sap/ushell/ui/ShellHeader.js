// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/Control","sap/ui/core/theming/Parameters","sap/ui/Device","sap/ui/dom/units/Rem","sap/ushell/EventHub","sap/ushell/Config","sap/ushell/ui/horizon/NewDesignSwitch","sap/ushell/library","sap/ushell/ui/shell/ShellAppTitle","sap/ushell/ui/ShellHeaderRenderer","sap/ushell/utils"],function(C,T,D,R,E,a,N,u,S,b,c){"use strict";var s="sapUshellShellShowSearchOverlay";var _=0;var d;var f="data:image/png;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";var g=sap.ui.require.toUrl("sap/ushell")+"/themes/base/img/SAPLogo.svg";var h=C.extend("sap.ushell.ui.ShellHeader",{metadata:{library:"sap.ushell",properties:{logo:{type:"sap.ui.core.URI",defaultValue:""},showLogo:{type:"boolean",defaultValue:true},homeUri:{type:"sap.ui.core.URI",defaultValue:"#"},searchState:{type:"string",defaultValue:"COL"},ariaLabel:{type:"string"},centralAreaElement:{type:"string",defaultValue:null},title:{type:"string",defaultValue:""}},aggregations:{headItems:{type:"sap.ushell.ui.shell.ShellHeadItem",multiple:true},headEndItems:{type:"sap.ui.core.Control",multiple:true},search:{type:"sap.ui.core.Control",multiple:false},appTitle:{type:"sap.ushell.ui.shell.ShellAppTitle",multiple:false}},associations:{shellLayout:{type:"sap.ui.base.ManagedObject",multiple:false}},events:{searchSizeChanged:{}}}});h.prototype.getShellLayoutControl=function(){return sap.ui.getCore().byId(this.getShellLayout());};h.prototype.createUIArea=function(){var e=window.document.getElementById("shell-hdr");if(!e){window.document.body.insertAdjacentHTML("afterbegin","<div id=\"shell-hdr\" class=\"sapContrastPlus sapUshellShellHead\"></div>");this.placeAt("shell-hdr");}};h.prototype.SearchState={COL:"COL",EXP:"EXP",EXP_S:"EXP_S"};h.prototype.init=function(){D.media.attachHandler(this.refreshLayout,this,D.media.RANGESETS.SAP_STANDARD);D.resize.attachHandler(this.refreshLayout,this);this._fnFocusListener=this._handleFocus.bind(this);this.addDelegate({onBeforeFastNavigationFocus:function(e){e.preventDefault();this._accessKeyHandler.sendFocusBackToShell(e);}.bind(this)});E.once("ShellNavigationInitialized").do(function(){sap.ushell.Container.getServiceAsync("ShellNavigation").then(function(o){this._rerenderLogoNavigationFilterBound=this._rerenderLogoNavigationFilter.bind(this);o.registerNavigationFilter(this._rerenderLogoNavigationFilterBound);this._rerenderLogoNavigationFilterBound.detach=function(){o.unregisterNavigationFilter(this._rerenderLogoNavigationFilterBound);};}.bind(this));}.bind(this));if(a.last("/core/shellHeader/newDesignSwitchVisible")){this._oNewDesignSwitch=new N("newDesignSwitch");this._oNewDesignSwitch.setParent(this);}};h.prototype.exit=function(){D.media.detachHandler(this.refreshLayout,this,D.media.RANGESETS.SAP_STANDARD);D.resize.detachHandler(this.refreshLayout,this);var o=window.document.getElementById("shell-hdr");if(o){o.parentElement.removeChild(o);}if(this._rerenderLogoNavigationFilterfnRerenderLogoNavigationFilter){this._rerenderLogoNavigationFilterfnRerenderLogoNavigationFilter.detach();}if(this._oNewDesignSwitch){this._oNewDesignSwitch.destroy();this._oNewDesignSwitch=null;}};h.prototype._toggleFocusListener=function(t){var A=window.document.getElementById("sapUshellHeaderAccessibilityHelper");if(A){A[t?"addEventListener":"removeEventListener"]("focus",this._fnFocusListener);}};h.prototype.setAccessKeyHandler=function(A){this._accessKeyHandler=A;};h.prototype._handleFocus=function(e){var t=this;function j(){if(t._accessKeyHandler.bForwardNavigation){var H=t.getHeadItems();if(H.length>0){H[0].focus();}else{t.getAppTitle().focus();}}else{var l=t.getHeadEndItems();if(l.length>0){l[l.length-1].focus();}else{t.getAppTitle().focus();}}t._accessKeyHandler.fromOutside=false;}if(this._accessKeyHandler){if(this._accessKeyHandler.fromOutside||this._accessKeyHandler.bForwardNavigation){j();}else{this._accessKeyHandler._handleEventUsingExternalKeysHandler(e);var A=window.document.getElementById("sapUshellHeaderAccessibilityHelper");if(window.document.activeElement===A){var k=window.document.querySelectorAll("#canvas [tabindex='0']");var F;for(var i=k.length-1;i>=0;i--){if(k[i].offsetWidth>0&&k[i].offsetHeight>0){F=k[i];break;}}if(F){F.focus();}else{j();return;}}this._accessKeyHandler.bFocusOnShell=false;}}};h.prototype.onsapspace=function(e){if(e.target===this.getDomRef("logo")){window.location.href=e.target.href;}};h.prototype.onBeforeRendering=function(){this._toggleFocusListener(false);};h.prototype.onAfterRendering=function(){var H=this.getDomRef();if(!d&&H.parentElement.getBoundingClientRect().height>0){H.style.visibility="hidden";H.style.height="2.75rem";return;}this.refreshLayout();this._toggleFocusListener(true);};h.prototype.onThemeChanged=function(e){d=e.theme;this.invalidate();};h.prototype.getLogo=function(){return this.getProperty("logo")||(sap.ui.getCore().isThemeApplied()?T._getThemeImage()||g:f);};h.prototype.refreshLayout=function(){if(!this.getDomRef()){return;}this._setAppTitleFontSize();if(this.getSearchVisible()){var o=this.getDomRef("hdr-search");o.style.display="none";this._hideElementsForSearch();o.style.display="";o.style["max-width"]=_+"rem";this.fireSearchSizeChanged({remSize:R.fromPx(o.getBoundingClientRect().width),isFullWidth:this.isPhoneState()||this.getDomRef("hdr-end").style.display==="none"});}else{var n=document.getElementById("newDesignSwitch");var e=document.getElementById("newDesignSwitch-lbl");if(n&&e&&n.parentElement){e.style.display="";if(n.getBoundingClientRect().left<n.parentElement.getBoundingClientRect().left){e.style.display="none";}}}};h.prototype._setAppTitleFontSize=function(){var B=this.getDomRef("hdr-begin"),A=window.document.getElementById("shellAppTitle"),e="sapUshellHeadTitleWithSmallerFontSize";if(B&&A){A.classList.remove(e);A.style.overflow="visible";var o=B.getBoundingClientRect(),i=o.x+o.width,j=A.getBoundingClientRect(),k=j.x+j.width;if(k>i){A.classList.add(e);A.style.overflow="hidden";}}};h.prototype.removeHeadItem=function(i){if(typeof i==="number"){i=this.getHeadItems()[i];}this.removeAggregation("headItems",i);};h.prototype.addHeadItem=function(i){this.addAggregation("headItems",i);};h.prototype.isPhoneState=function(){var e=D.media.getCurrentRange(D.media.RANGESETS.SAP_STANDARD).name;var i=this.getDomRef().getBoundingClientRect().width>_;return(D.system.phone||e==="Phone"||!i);};h.prototype.setSearchState=function(e,m,w){if(this.SearchState[e]&&this.getSearchState()!==e){if(typeof m==="boolean"){w=m;m=undefined;}this.setProperty("searchState",e,false);var i=(e!=="COL");var j=this.getShellLayoutControl();if(j){j.toggleStyleClass(s,i&&w);}_=i?m||35:0;}};h.prototype._hideElementsForSearch=function(){var n,o=this.getDomRef("hdr-search-container"),B=this.getDomRef("hdr-begin"),j=this.getDomRef("hdr-center"),k=this.getDomRef("hdr-end"),l=document.getElementById("newDesignSwitch");if(this.getSearchState()==="EXP"||this.isPhoneState()){n=R.toPx(_+3);}else{n=R.toPx(9+0.5);}var m=[B];Array.prototype.forEach.call(B.childNodes,function(e){m.unshift(e);});if(j){m.unshift(j);}if(l){m.push(l);}B.style.flexBasis="";k.style.display="";m.forEach(function(e){if(e.getAttribute("id")==="shellAppTitle"){e.classList.remove("sapUiPseudoInvisibleText");}else{e.style.display="";}});if(l){var p=l.getBoundingClientRect().width||0;n=n+p;}var q;for(var i=0;i<m.length;i++){q=m[i];if(n>o.getBoundingClientRect().width){if(q.getAttribute("id")==="shellAppTitle"){q.classList.add("sapUiPseudoInvisibleText");}else{q.style.display="none";if(j&&i===0){B.style.flexBasis="auto";}}}else{return;}}if(R.toPx(_)>o.getBoundingClientRect().width){k.style.display="none";}};h.prototype.getSearchWidth=function(){return _;};h.prototype.isHomepage=function(){var H=(window.hasher&&"#"+window.hasher.getHash())||"";var r=new RegExp("[?]"+"(?:"+"(?!&[/])."+")*");var e=H.replace(r,"");return c.isRootIntent(e)||e==="#Launchpad-openFLPPage";};h.prototype._rerenderLogoNavigationFilter=function(n,o){var e=sap.ushell.Container.getService("ShellNavigation");var A=e.hashChanger.isInnerAppNavigation(n,o);if(A){this.invalidate();}return e.NavigationFilterStatus.Continue;};h.prototype.getSearchVisible=function(){return this.getSearchState()!==this.SearchState.COL;};h.prototype.getCentralControl=function(){return sap.ui.getCore().byId(this.getCentralAreaElement());};h.prototype.setNoLogo=function(){this.setLogo(f);};h.prototype._getLeanMode=function(){return(window.location.search||"").indexOf("appState=lean")>=0;};return h;},true);
