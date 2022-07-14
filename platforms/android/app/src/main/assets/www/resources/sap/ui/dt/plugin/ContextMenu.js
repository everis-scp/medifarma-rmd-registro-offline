/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dt/Plugin","sap/ui/dt/ContextMenuControl","sap/ui/dt/Util","sap/ui/dt/OverlayRegistry","sap/ui/dt/util/_createPromise","sap/ui/Device","sap/base/assert","sap/ui/events/KeyCodes","sap/base/util/restricted/_debounce"],function(P,C,D,O,_,a,b,K,c){"use strict";var d=P.extend("sap.ui.dt.plugin.ContextMenu",{metadata:{library:"sap.ui.dt",properties:{contextElement:{type:"object"},styleClass:{type:"string"},openOnHover:{type:"boolean",defaultValue:true},openOnClick:{type:"boolean",defaultValue:true}},events:{openedContextMenu:{},closedContextMenu:{}}}});d.prototype.init=function(){this.iMenuHoverOpeningDelay=500;this.iMenuHoverClosingDelay=250;this.oContextMenuControl=new C({maxButtonsDisplayed:4});this.oContextMenuControl.attachClosed(this._contextMenuClosed,this);this.oContextMenuControl.attachOverflowButtonPressed(this._pressedOverflowButton,this);this._aMenuItems=[];this._aGroupedItems=[];this._aSubMenus=[];};d.prototype.exit=function(){this._clearHoverTimeout();delete this._aMenuItems;if(this.oContextMenuControl){this.oContextMenuControl.detachClosed(this._contextMenuClosed,this);this.oContextMenuControl.detachOverflowButtonPressed(this._pressedOverflowButton,this);this.oContextMenuControl.destroy();delete this.oContextMenuControl;}};d.prototype.addMenuItem=function(m,r,p){var M={menuItem:m,fromPlugin:!!r,bPersistOneTime:p};this._aMenuItems.push(M);};d.prototype.registerElementOverlay=function(o){o.attachBrowserEvent("click",this._onContextMenuOrClick,this);o.attachBrowserEvent("touchstart",this._onContextMenuOrClick,this);o.attachBrowserEvent("contextmenu",this._onContextMenuOrClick,this);o.attachBrowserEvent("keydown",this._onKeyDown,this);o.attachBrowserEvent("keyup",this._onKeyUp,this);};d.prototype.deregisterElementOverlay=function(o){o.detachBrowserEvent("click",this._onContextMenuOrClick,this);o.detachBrowserEvent("touchstart",this._onContextMenuOrClick,this);o.detachBrowserEvent("contextmenu",this._onContextMenuOrClick,this);o.detachBrowserEvent("keydown",this._onKeyDown,this);o.detachBrowserEvent("keyup",this._onKeyUp,this);};d.prototype.open=function(p,o,e,i){this._bContextMenu=!!e;var n=o.getElement();if(this._fnCancelMenuPromise){if(this.getContextElement()===n){return;}this._fnCancelMenuPromise();delete this._fnCancelMenuPromise;}this.setContextElement(n);this.getDesignTime().getSelectionManager().attachChange(this._onSelectionChanged,this);var s=this.getSelectedOverlays().filter(function(E){return E!==o;});s.unshift(o);if(document.activeElement){document.activeElement.blur();}this._aMenuItems=this._aMenuItems.filter(function(m){if(m.bPersistOneTime){m.bPersistOneTime=false;return true;}return!m.fromPlugin;});var f=Promise.resolve();if(!i){var g=_(function(r,h){D.waitForSynced(this.getDesignTime())().then(r).catch(h);}.bind(this));this._fnCancelMenuPromise=g.cancel;f=g.promise.then(function(){this._aGroupedItems=[];this._aSubMenus=[];var h=[];var j=this.getDesignTime().getPlugins();j.forEach(function(l){var m=l.getMenuItems(s);if(!(m instanceof Promise)){m=Promise.resolve(m);}h.push(m);});var k=_(function(r,l){Promise.all(h).then(r).catch(l);});this._fnCancelMenuPromise=k.cancel;return k.promise;}.bind(this)).then(function(h){return h.reduce(function(j,m){return j.concat(m);});}).then(function(h){h.forEach(function(m){if(m.group!==undefined&&!e){this._addMenuItemToGroup(m);}else if(m.submenu!==undefined){this._addSubMenu(m,p,o);}else{this.addMenuItem(m,true);}}.bind(this));this._addItemGroupsToMenu(p,o);delete this._fnCancelMenuPromise;}.bind(this));}f.then(function(){var m=this._aMenuItems.map(function(M){return M.menuItem;});if(m.length>0){m=this._sortMenuItems(m);this.oContextMenuControl.setButtons(m,this._onItemSelected.bind(this),s);this.oContextMenuControl.setStyleClass(this.getStyleClass());this.oContextMenuControl.show(o,e,{x:p.clientX,y:p.clientY});}this.fireOpenedContextMenu();}.bind(this)).catch(function(E){throw D.createError("ContextMenu#open","An error occured during calling getMenuItems: "+E);});};d.prototype._sortMenuItems=function(m){return m.sort(function(f,s){if(!f.rank&&!s.rank){return 0;}if(!f.rank&&s.rank){return-1;}if(f.rank&&!s.rank){return 1;}return f.rank-s.rank;});};d.prototype._onContextMenu=function(e){var o=O.getOverlay(e.currentTarget.id);var p={clientX:e.clientX,clientY:e.clientY};this._openContextMenu(e,o,p);};d.prototype._onItemSelected=function(e){this.oContextMenuControl.close(true);this._ensureSelection(this._oCurrentOverlay);this.setFocusLock(true);var s=[];var o=this.getContextElement();var S=e.data("id");this._aMenuItems.some(function(m){if(S===m.menuItem.id){var i=m.menuItem;s=m.menuItem.responsible||this.getSelectedOverlays();b(s.length>0,"sap.ui.rta - Opening context menu, with empty selection - check event order");var p={};p.eventItem=e;p.contextElement=o;var h=i.handler;if(this.oContextMenuControl.isPopupOpen()){this.oContextMenuControl.attachEventOnce("Closed",function(){h(s,p);});}else{h(s,p);}i=null;return true;}},this);};d.prototype._onContextMenuOrClick=function(e){if(!this.fnDebounced){this.fnDebounced=c(function(){if(this._oCurrentEvent.type==="contextmenu"){this._onContextMenu(this._oCurrentEvent);}else{this._onClickorTouch(this._oCurrentEvent);}this._oCurrentEvent=undefined;this.fnDebounced=undefined;}.bind(this),50);}var o=O.getOverlay(e.currentTarget.id);if(o&&o.isSelectable()&&o.getSelected()){this._oCurrentEvent=e;e.stopPropagation();this.fnDebounced();}};d.prototype._onClickorTouch=function(e){if(this.getOpenOnClick()){if(this.isMenuOpeningLocked()){this.unlockMenuOpening();this.oContextMenuControl.close();}this._startOpening(e);}};d.prototype._startOpening=function(e,l){clearTimeout(this.hoverTimeout);this._bOpenedByHover=false;this._oTempTarget=e.currentTarget.id;var o=O.getOverlay(e.currentTarget.id);var t=e.target.className;if(o&&o.isSelectable()&&t.indexOf("sapUiDtOverlay")>-1&&(!this.isMenuOpeningLocked())){e.stopPropagation();if(this._shouldContextMenuOpen(e)){this._ensureSelection(o);if(this._oCurrentOverlay.isSelected()||a.os.android){if(l){this.lockMenuOpening();}this.open({clientX:e.clientX,clientY:e.clientY},o);return true;}}}};d.prototype._onHover=function(e){var o=O.getOverlay(e.currentTarget.id);if(o&&o.isSelectable()&&!e.ctrlKey&&this.getOpenOnHover()){e.stopPropagation();if(this._shouldContextMenuOpen(e,true)){if(this.iMenuHoverClosingDelay>=this.iMenuHoverOpeningDelay){throw new Error("sap.ui.dt ContextMenu iMenuHoverClosingDelay is bigger or equal to iMenuHoverOpeningDelay!");}if(this.oContextMenuControl.getPopover().isOpen()){this._closingTimeout=setTimeout(function(){if(this.oContextMenuControl.getPopover().isOpen()){this.oContextMenuControl.close();}}.bind(this),this.iMenuHoverClosingDelay);}this.hoverTimeout=setTimeout(function(){O.getOverlay(e.currentTarget.id).focus();this._startOpening(e);this._bOpenedByHover=true;}.bind(this),this.iMenuHoverOpeningDelay);}}};d.prototype._clearHoverTimeout=function(){if(this.hoverTimeout){clearTimeout(this.hoverTimeout);this.hoverTimeout=null;}if(this._closingTimeout){clearTimeout(this._closingTimeout);this._closingTimeout=null;}};d.prototype._onKeyUp=function(e){var o=O.getOverlay(e.currentTarget.id);if((e.keyCode===K.SPACE||e.keyCode===K.ENTER)&&(e.shiftKey===false)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o&&o.isSelectable()&&!this._checkForPluginLock()){this._startOpening(e,true);e.stopPropagation();e.preventDefault();}}if((e.keyCode===K.F10)&&(e.shiftKey===true)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o&&o.isSelectable()){e.preventDefault();var p={clientX:"not set",clientY:"not set"};this._openContextMenu(e,o,p);}}};d.prototype._onKeyDown=function(e){var o=O.getOverlay(e.currentTarget.id);if((e.keyCode===K.SPACE)&&(e.shiftKey===false)&&(e.altKey===false)&&(e.ctrlKey===false)){if(o&&o.isSelectable()&&!this._checkForPluginLock()){e.stopPropagation();e.preventDefault();}}};d.prototype._shouldContextMenuOpen=function(e,o){if((!this._checkForPluginLock()&&!this.isMenuOpeningLocked())){if(!o){this._oCurrentOverlay=O.getOverlay(e.currentTarget.id);}return true;}return false;};d.prototype._pressedOverflowButton=function(e){this.lockMenuOpening();var o=O.getOverlay(e.oSource._oTarget.getAttribute("overlay"));var p={clientX:e.mParameters.oButton.$().offset().left,clientY:e.mParameters.oButton.$().offset().top};this._openContextMenu(e,o,p);this.setFocusLock(true);};d.prototype._openContextMenu=function(e,o,p){if(o&&o.isSelectable()){e.preventDefault();this._oCurrentOverlay=o;this.oContextMenuControl.close(true);this._bOpenedByHover=false;clearTimeout(this.hoverTimeout);this._ensureSelection(o);this.lockMenuOpening();this.open(p,o,true);if(e.stopPropagation){e.stopPropagation();}}};d.prototype._contextMenuClosed=function(){this.unlockMenuOpening();this.setFocusLock(false);};d.prototype._onSelectionChanged=function(){this.oContextMenuControl.close(true);this.getDesignTime().getSelectionManager().detachChange(this._onSelectionChanged,this);};d.prototype.lockMenuOpening=function(o){if((this.oContextMenuControl.getPopover(true).isOpen()||this.oContextMenuControl.getPopover(false).isOpen())&&o!==true){this._bAsyncLock=true;}else{this._bOpeningLocked=true;}};d.prototype.unlockMenuOpening=function(){this._bOpeningLocked=false;if(this._bAsyncLock){this.lockMenuOpening(true);}this._bAsyncLock=false;};d.prototype.isMenuOpeningLocked=function(){return this._bOpeningLocked;};d.prototype.setFocusLock=function(i){this._bFocusLocked=i;};d.prototype._ensureSelection=function(o){if(o&&!o.isSelected()){o.setSelected(true);}};d.prototype._checkForPluginLock=function(){if(a.os.ios){return false;}if(this.getDesignTime().getBusyPlugins().length){return true;}this.setFocusLock(false);return false;};d.prototype._addMenuItemToGroup=function(m){var g=this._aGroupedItems.some(function(e){if(e.sGroupName===m.group){e.aGroupedItems.push(m);return true;}});if(!g){this._aGroupedItems.push({sGroupName:m.group,aGroupedItems:[m]});}};d.prototype._addSubMenu=function(m,p,o){m.submenu.forEach(function(s){if(!s.handler){s.handler=m.handler;}});m.handler=function(M,p,o){this._aSubMenus.some(function(e){if(e.sSubMenuId===M){e.aSubMenuItems.forEach(function(s){this.addMenuItem(s,true,true);}.bind(this));return true;}}.bind(this));if(!this._bContextMenu){p.clientX=null;p.clientY=null;}this.oContextMenuControl.close();setTimeout(function(){this.open(p,o,true,true);}.bind(this),0);this.lockMenuOpening();}.bind(this,m.id,p,o);this._aSubMenus.push({sSubMenuId:m.id,aSubMenuItems:m.submenu});this.addMenuItem(m,true);};d.prototype._addItemGroupsToMenu=function(p,o){this._aGroupedItems.forEach(function(g,i){if(g.aGroupedItems.length===1){this.addMenuItem(g.aGroupedItems[0],true,false);}else{var h=function(i,p,o){this._aGroupedItems[i].aGroupedItems.forEach(function(m){this.addMenuItem(m,true,true);}.bind(this));this.oContextMenuControl.close();setTimeout(function(){this.open(p,o,true,true);}.bind(this),0);this.lockMenuOpening();};this.addMenuItem({id:g.sGroupName+"-groupButton",enabled:true,text:g.sGroupName,icon:g.aGroupedItems[0].icon,rank:g.aGroupedItems[0].rank,handler:h.bind(this,i,p,o)},true);}}.bind(this));};return d;});
