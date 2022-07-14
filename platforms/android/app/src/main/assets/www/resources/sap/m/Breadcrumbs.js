/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/util/openWindow","sap/m/Text","sap/m/Link","sap/m/Select","sap/ui/core/Item","sap/ui/core/delegate/ItemNavigation","sap/ui/core/ResizeHandler","sap/ui/core/IconPool","sap/ui/Device","sap/m/library","./BreadcrumbsRenderer",'sap/ui/base/ManagedObject','sap/ui/core/InvisibleText'],function(C,o,T,L,S,I,a,R,b,D,l,B,M,c){"use strict";var d=l.SelectType,e=l.BreadcrumbsSeparatorStyle;var f=C.extend("sap.m.Breadcrumbs",{metadata:{library:"sap.m",interfaces:["sap.m.IBreadcrumbs"],designtime:"sap/m/designtime/Breadcrumbs.designtime",properties:{currentLocationText:{type:"string",group:"Behavior",defaultValue:null},separatorStyle:{type:"sap.m.BreadcrumbsSeparatorStyle",group:"Appearance",defaultValue:e.Slash}},aggregations:{links:{type:"sap.m.Link",multiple:true,singularName:"link"},_currentLocation:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}},defaultAggregation:"links",associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});f.STYLE_MAPPER={Slash:"/",BackSlash:"\\",DoubleSlash:"//",DoubleBackSlash:"\\\\",GreaterThan:">",DoubleGreaterThan:">>"};f.prototype.init=function(){this._sSeparatorSymbol=f.STYLE_MAPPER[this.getSeparatorStyle()];this._getInvisibleText();};f.prototype.onBeforeRendering=function(){this.bRenderingPhase=true;if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(this._bControlsInfoCached){this._updateSelect(true);}};f.prototype.onAfterRendering=function(){if(!this._sResizeListenerId){this._sResizeListenerId=R.register(this,this._handleScreenResize.bind(this));}if(!this._bControlsInfoCached){this._updateSelect(true);return;}this._configureKeyboardHandling();this.bRenderingPhase=false;};f.prototype.onThemeChanged=function(){this._resetControl();};f.prototype.exit=function(){this._resetControl();this._destroyItemNavigation();if(this._oInvisibleText){this._oInvisibleText.destroy();this._oInvisibleText=null;}};f.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;f.prototype._getAugmentedId=function(s){return this.getId()+"-"+s;};f.prototype._getInvisibleText=function(){var A=B._getResourceBundleText("BREADCRUMB_LABEL");if(!this._oInvisibleText){this._oInvisibleText=new c({id:this.getId()+"-InvisibleText"});this._oInvisibleText.setText(A).toStatic();}return this._oInvisibleText;};f.prototype._getSelect=function(){if(!this.getAggregation("_select")){this.setAggregation("_select",this._decorateSelect(new S({id:this._getAugmentedId("select"),change:this._selectChangeHandler.bind(this),forceSelection:false,autoAdjustWidth:true,icon:b.getIconURI("slim-arrow-down"),type:d.IconOnly,tooltip:B._getResourceBundleText("BREADCRUMB_SELECT_TOOLTIP")})),true);}return this.getAggregation("_select");};f.prototype._getCurrentLocation=function(){if(!this.getAggregation("_currentLocation")){var i=new T({id:this._getAugmentedId("currentText"),text:this.getCurrentLocationText(),wrapping:false}).addStyleClass("sapMBreadcrumbsCurrentLocation");i.addEventDelegate({onAfterRendering:function(){i.$().attr("aria-current","page");i.$().attr("tabindex",0);}});this.setAggregation("_currentLocation",i).addStyleClass("sapMBreadcrumbsCurrentLocation");}return this.getAggregation("_currentLocation");};function g(A,i){var j=Array.prototype.slice.apply(i);j.unshift(A);return j;}f.prototype.insertLink=function(i,j){var r=this.insertAggregation.apply(this,g("links",arguments));this._registerControlListener(i);this._resetControl();return r;};f.prototype.addLink=function(i){var r=this.addAggregation.apply(this,g("links",arguments));this._registerControlListener(i);this._resetControl();return r;};f.prototype.removeLink=function(O){var r=this.removeAggregation.apply(this,g("links",arguments));this._deregisterControlListener(r);this._resetControl();return r;};f.prototype.removeAllLinks=function(){var i=this.getAggregation("links",[]);var r=this.removeAllAggregation.apply(this,g("links",arguments));i.forEach(this._deregisterControlListener,this);this._resetControl();return r;};f.prototype.destroyLinks=function(){var i=this.getAggregation("links",[]);var r=this.destroyAggregation.apply(this,g("links",arguments));i.forEach(this._deregisterControlListener,this);this._resetControl();return r;};f.prototype._decorateSelect=function(s){s.getPicker().attachAfterOpen(this._removeItemNavigation,this).attachBeforeClose(this._restoreItemNavigation,this);s._onBeforeOpenDialog=this._onSelectBeforeOpenDialog.bind(this);s._onBeforeOpenPopover=this._onSelectBeforeOpenPopover.bind(this);s.onsapescape=this._onSelectEscPress.bind(this);return s;};f.prototype._removeItemNavigation=function(){this.removeDelegate(this._getItemNavigation());};f.prototype._onSelectBeforeOpenDialog=function(){var s=this._getSelect();if(this.getCurrentLocationText()&&D.system.phone){s.setSelectedIndex(0);}else{s.setSelectedItem(null);}S.prototype._onBeforeOpenDialog.call(s);this._removeItemNavigation();};f.prototype._onSelectBeforeOpenPopover=function(){this._getSelect().setSelectedItem(null);this._removeItemNavigation();};f.prototype._restoreItemNavigation=function(){this.addDelegate(this._getItemNavigation());};f.prototype._onSelectEscPress=function(){this._getSelect().close();};f.prototype._createSelectItem=function(i){return new I({key:i.getId(),text:M.escapeSettingsValue(i.getText())});};f.prototype._selectChangeHandler=function(E){var i,s,j,k=E.getParameter("selectedItem");if(!k){return;}if(!this._getSelect().isOpen()){return;}i=sap.ui.getCore().byId(k.getKey());if(!(i instanceof L)){return;}s=i.getHref();j=i.getTarget();i.firePress();if(s){if(j){o(s,j);}else{window.location.href=s;}}};f.prototype._getItemsForMobile=function(){var i=this.getLinks();if(this.getCurrentLocationText()){i.push(this._getCurrentLocation());}return i;};f.prototype._updateSelect=function(i){var s=this._getSelect(),j,k=this._getControlDistribution();if(!this._bControlDistributionCached||i){s.destroyItems();j=D.system.phone?this._getItemsForMobile():k.aControlsForSelect;j.map(this._createSelectItem).reverse().forEach(s.insertItem,s);this._bControlDistributionCached=true;this.invalidate(this);}s.setVisible(!!k.aControlsForSelect.length);if(!this._sResizeListenerId&&!this.bRenderingPhase){this._sResizeListenerId=R.register(this,this._handleScreenResize.bind(this));}};f.prototype._getControlsForBreadcrumbTrail=function(){var v;if(this._bControlDistributionCached&&this._oDistributedControls){return this._oDistributedControls.aControlsForBreadcrumbTrail;}v=this.getLinks().filter(function(i){return i.getVisible();});if(this.getCurrentLocationText()){return v.concat([this._getCurrentLocation()]);}return v;};f.prototype._getControlInfo=function(i){return{id:i.getId(),control:i,width:h(i.$().parent()),bCanOverflow:i instanceof L};};f.prototype._getControlDistribution=function(m){m=m||this._iContainerSize;this._iContainerSize=m;this._oDistributedControls=this._determineControlDistribution(m);return this._oDistributedControls;};f.prototype._getSelectWidth=function(){return this._getSelect().getVisible()&&this._iSelectWidth||0;};f.prototype._determineControlDistribution=function(m){var i,j,k=this._getControlsInfo().aControlInfo,s=this._getSelectWidth(),n=[],p=[],u=s;for(i=k.length-1;i>=0;i--){j=k[i];u+=j.width;if(k.length-1===i){p.push(j.control);continue;}if(i===0){u-=s;}if(u>m&&j.bCanOverflow){n.unshift(j.control);}else{p.unshift(j.control);}}return{aControlsForBreadcrumbTrail:p,aControlsForSelect:n};};f.prototype._getControlsInfo=function(){if(!this._bControlsInfoCached){this._iSelectWidth=h(this._getSelect().$().parent())||0;this._aControlInfo=this._getControlsForBreadcrumbTrail().map(this._getControlInfo);this._iContainerSize=Math.ceil(h(this.$()));this._bControlsInfoCached=true;}return{aControlInfo:this._aControlInfo,iSelectWidth:this._iSelectWidth,iContentSize:this._iContainerSize};};f.prototype._handleScreenResize=function(E){var i,j,k;if(E.size.width===E.oldSize.width||E.size.width===0){return this;}i=this._oDistributedControls.aControlsForBreadcrumbTrail.length;j=this._getControlDistribution(Math.ceil(h(this.$())));k=j.aControlsForBreadcrumbTrail.length;if(i!==k){this._updateSelect(true);}return this;};f.prototype._getItemsToNavigate=function(){var i=this._getControlsForBreadcrumbTrail().slice(),s=this._getSelect();if(s.getVisible()){i.unshift(s);}return i;};f.prototype._getItemNavigation=function(){if(!this._itemNavigation){this._itemNavigation=new a();}return this._itemNavigation;};f.prototype._destroyItemNavigation=function(){if(this._itemNavigation){this.removeEventDelegate(this._itemNavigation);this._itemNavigation.destroy();this._itemNavigation=null;}};f.prototype._configureKeyboardHandling=function(){var i=this._getItemNavigation(),s=-1,j=this._getItemsToNavigate(),n=[];if(j.length===0){return;}j.forEach(function(k,m){if(m===0){k.$().attr("tabindex","0");}k.$().attr("tabindex","-1");n.push(k.getDomRef());});this.addDelegate(i);i.setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"],saphome:["alt"],sapend:["alt"]});i.setCycling(false);i.setPageSize(f.PAGEUP_AND_PAGEDOWN_JUMP_SIZE);i.setRootDomRef(this.getDomRef());i.setItemDomRefs(n);i.setSelectedIndex(s);return this;};f.prototype._registerControlListener=function(i){if(i){i.attachEvent("_change",this._resetControl,this);}};f.prototype._deregisterControlListener=function(i){if(i){i.detachEvent("_change",this._resetControl,this);}};f.prototype.setCurrentLocationText=function(t){var i=this._getCurrentLocation(),r=this.setProperty("currentLocationText",t,true);if(i.getText()!==t){i.setText(t);this._resetControl();}return r;};f.prototype.setSeparatorStyle=function(s){this.setProperty("separatorStyle",s);var i=f.STYLE_MAPPER[this.getSeparatorStyle()];if(i){this._sSeparatorSymbol=i;}return this;};f.prototype._resetControl=function(){this._aControlInfo=null;this._iContainerSize=null;this._bControlsInfoCached=null;this._bControlDistributionCached=null;this._oDistributedControls=null;if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this.removeDelegate(this._getItemNavigation());this.invalidate(this);return this;};function h($){var m;if($.length){m=$.outerWidth(true)-$.outerWidth();return $.get(0).getBoundingClientRect().width+m;}}return f;});
