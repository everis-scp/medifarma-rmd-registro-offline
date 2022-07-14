/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','./library','./ActionBarRenderer','sap/ui/core/ResizeHandler','sap/ui/ux3/ThingAction','sap/ui/ux3/ToolPopup','sap/ui/ux3/Feeder','sap/ui/core/Popup','sap/ui/commons/MenuItem','sap/ui/commons/Menu','sap/ui/commons/MenuButton','sap/ui/commons/Button','sap/ui/Device','sap/base/Log'],function(q,C,I,l,A,R,T,a,F,P,M,b,c,B,D,L){"use strict";var d=P.Dock;var e=l.FeederType;var f=l.ActionBarSocialActions;var g=l.FollowActionState;var h=C.extend("sap.ui.ux3.ActionBar",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{followState:{type:"sap.ui.ux3.FollowActionState",group:"Misc",defaultValue:g.Default},flagState:{type:"boolean",group:"Misc",defaultValue:null},favoriteState:{type:"boolean",group:"Misc",defaultValue:null},updateState:{type:"boolean",group:"Misc",defaultValue:null},thingIconURI:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},alwaysShowMoreMenu:{type:"boolean",group:"Misc",defaultValue:true},showUpdate:{type:"boolean",group:"Misc",defaultValue:true},showFollow:{type:"boolean",group:"Misc",defaultValue:true},showFlag:{type:"boolean",group:"Misc",defaultValue:true},showFavorite:{type:"boolean",group:"Misc",defaultValue:true},showOpen:{type:"boolean",group:"Misc",defaultValue:true},dividerWidth:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:null}},aggregations:{businessActions:{type:"sap.ui.ux3.ThingAction",multiple:true,singularName:"businessAction"},_businessActionButtons:{type:"sap.ui.commons.Button",multiple:true,singularName:"_businessActionButton",visibility:"hidden"},_socialActions:{type:"sap.ui.ux3.ThingAction",multiple:true,singularName:"_socialAction",visibility:"hidden"}},events:{actionSelected:{parameters:{id:{type:"string"},action:{type:"sap.ui.ux3.ThingAction"},newState:{type:"string"}}},feedSubmit:{parameters:{text:{type:"string"}}}}}});h.prototype.init=function(){this.mActionMap={};this.mActionKeys=f;this.oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Update),true);this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Follow),true);this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Flag),true);this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Favorite),true);this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Open),true);if(!this._oItemNavigation){this._oItemNavigation=new I();this.addDelegate(this._oItemNavigation);}};h.prototype.exit=function(){this.closePopups();if(this._oUpdatePopup){this._oUpdatePopup.destroy();this._oUpdatePopup=null;}if(this._oMoreMenuButton){this._oMoreMenuButton.destroy();this._oMoreMenuButton=null;}if(this._oMoreMenu){this._oMoreMenu.destroy();this._oMoreMenu=null;}if(this._oHoldItem){this._oHoldItem.destroy();}if(this._oUnFollowItem){this._oUnFollowItem.destroy();}if(this._oUnHoldItem){this._oUnHoldItem.destroy();}if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this.mActionKeys=null;this.oRb=null;this.destroyAggregation("_socialActions");this.destroyAggregation("_businessActionButtons");if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}};h.prototype.isActive=function(){var r=this.getDomRef()!=null;return r;};h.prototype._getLocalizedText=function(k,i){var t;if(this.oRb){t=this.oRb.getText(k);}if(t&&i){for(var j=0;j<i.length;j++){t=t.replace("{"+j+"}",i[j]);}}return t?t:k;};h.prototype._getSocialAction=function(s){var r=this.mActionMap[s];if(!r){r=new T({id:this.getId()+"-"+s});switch(s){case this.mActionKeys.Update:r.name=this.mActionKeys.Update;r.tooltipKey="ACTIONBAR_UPDATE_ACTION_TOOLTIP";r.cssClass="sapUiUx3ActionBarUpdateAction";r.fnInit=function(o){o._oUpdatePopup=new a({id:o.getId()+"-UpdateActionPopup"}).addStyleClass("sapUiUx3ActionBarUpdatePopup");o._oUpdatePopup._ensurePopup().setAutoClose(true);o._feeder=new F({id:o.getId()+"-Feeder",type:e.Comment,thumbnailSrc:o.getThingIconURI(),text:"",submit:q.proxy(function(E){var m=E.getParameter("text");this.fireFeedSubmit({text:m});this._oUpdatePopup.close();},o)});o._feeder.addStyleClass("sapUiUx3ActionBarFeeder");o._oUpdatePopup.addContent(o._feeder);};r.fnActionSelected=function(E,o){o._setUpdateState(!o.getUpdateState());if(o._oUpdatePopup.isOpen()){o._oUpdatePopup.close();}else{var m,t,n;o._oUpdatePopup.setPosition(d.BeginBottom,d.BeginTop,E.getSource().getDomRef(),"-8 -13","none");o._oUpdatePopup.open();m=q(o._oUpdatePopup.getDomRef());t=q(window).height();n=q(o.getDomRef()).offset().top;m.css("top","auto").css("bottom",(t-n+7)+"px");setTimeout(function(){if(o._feeder.getFocusDomRef()){o._feeder.getFocusDomRef().focus();}},1000);}o._updateSocialActionDomRef(r);};r.fnExit=function(o){if(o._oUpdatePopup){o._oUpdatePopup.destroy();o._oUpdatePopup=null;}};r.fnCalculateState=function(o){var m=null;if(o.getUpdateState()){m="Selected";}return m;};break;case this.mActionKeys.Follow:var i=r;r.name=this.mActionKeys.Follow;r.tooltipKey="ACTIONBAR_FOLLOW_ACTION_TOOLTIP_FOLLOW";r.cssClass="sapUiUx3ActionBarFollowAction";r.isMenu=function(o){return o.getFollowState()!=g.Default;};r.fnActionSelected=function(E,o){if(o.getFollowState()==g.Default){o._setFollowState(g.Follow);o.fireActionSelected({id:i.name,state:"followState",action:i});this._fnPrepareFollowMenu(E,o);}else{o._oMenu.open(false,i.getFocusDomRef(),d.BeginBottom,d.BeginTop,i.getDomRef());}};r.fnCalculateState=function(o){return o.getFollowState();};r._fnPrepareFollowMenu=function(E,o){var m=sap.ui.resource("sap.ui.ux3","themes/"+sap.ui.getCore().getConfiguration().getTheme());if(o.mActionMap[o.mActionKeys.Follow]){if(!o._oUnFollowItem){o._oUnFollowItem=new M({id:o.getId()+"-unfollowState",text:o._getLocalizedText("TI_FOLLOW_ACTION_MENU_TXT_UNFOLLOW"),icon:m+"/img/menu_unlisten.png"});}if(!o._oHoldItem){o._oHoldItem=new M({id:o.getId()+"-holdState",text:o._getLocalizedText("TI_FOLLOW_ACTION_MENU_TXT_HOLD"),icon:m+"/img/menu_hold.png"});}if(!o._oUnHoldItem){o._oUnHoldItem=new M({id:o.getId()+"-unholdState",text:o._getLocalizedText("TI_FOLLOW_ACTION_MENU_TXT_UNHOLD"),icon:m+"/img/menu_follow.png"});}if(!o._oMenu){o._oMenu=new b({id:o.getId()+"-followActionMenu"});o._oMenu.attachItemSelect(q.proxy(function(n){this._fnFollowMenuSelected(n,o);},this));o._oMenu.addItem(o._oHoldItem);o._oMenu.addItem(o._oUnHoldItem);o._oMenu.addItem(o._oUnFollowItem);}if(o.getFollowState()==g.Default){o.mActionMap[o.mActionKeys.Follow].setTooltip(o._getLocalizedText("TI_FOLLOW_ACTION_TOOLTIP_FOLLOW"));o._oHoldItem.setVisible(false);o._oUnFollowItem.setVisible(false);o._oUnHoldItem.setVisible(false);}else if(o.getFollowState()==g.Follow){o.mActionMap[o.mActionKeys.Follow].setTooltip(o._getLocalizedText("TI_FOLLOW_ACTION_TOOLTIP_STOPPAUSE_FOLLOW"));o._oHoldItem.setVisible(true);o._oUnFollowItem.setVisible(true);o._oUnHoldItem.setVisible(false);}else if(o.getFollowState()==g.Hold){o.mActionMap[o.mActionKeys.Follow].setTooltip(o._getLocalizedText("TI_FOLLOW_ACTION_TOOLTIP_STOPCONTINUE_FOLLOW"));o._oHoldItem.setVisible(false);o._oUnFollowItem.setVisible(true);o._oUnHoldItem.setVisible(true);}o._updateSocialActionDomRef(r);}};r._fnFollowMenuSelected=function(E,o){if(o.mActionMap[o.mActionKeys.Follow]){var m=E.getParameters().item.getId();if(m==o.getId()+"-followState"){o._setFollowState(g.Follow);}else if(m==o.getId()+"-unfollowState"){o._setFollowState(g.Default);}else if(m==o.getId()+"-holdState"){o._setFollowState(g.Hold);}else if(m+"-unholdState"){o._setFollowState(g.Follow);}o.fireActionSelected({id:i.name,state:m,action:i});this._fnPrepareFollowMenu(E,o);}};break;case this.mActionKeys.Favorite:var j=r;r.name=this.mActionKeys.Favorite;r.tooltipKey="ACTIONBAR_FAVORITE_ACTION_TOOLTIP";r.cssClass="sapUiUx3ActionBarFavoriteAction";r.fnActionSelected=function(E,o){if(o.getFavoriteState()==true){o._setFavoriteState(false);}else{o._setFavoriteState(true);}o.fireActionSelected({id:j.name,state:o.getFavoriteState(),action:j});o._updateSocialActionDomRef(r);};r.fnCalculateState=function(o){var m=null;if(o.getFavoriteState()){m="Selected";}return m;};break;case this.mActionKeys.Flag:var k=r;r.name=this.mActionKeys.Flag;r.tooltipKey="ACTIONBAR_FLAG_ACTION_TOOLTIP";r.cssClass="sapUiUx3ActionBarFlagAction";r.fnActionSelected=function(E,o){o._setFlagState(!o.getFlagState());o.fireActionSelected({id:k.name,state:o.getFlagState(),action:k});o._updateSocialActionDomRef(r);};r.fnCalculateState=function(o){var m=null;if(o.getFlagState()){m="Selected";}return m;};break;case this.mActionKeys.Open:r.name=this.mActionKeys.Open;r.tooltipKey="ACTIONBAR_OPEN_THING_ACTION_TOOLTIP";r.cssClass="sapUiUx3ActionBarOpenThingAction";break;default:L.warning("Function \"sap.ui.ux3.ActionBar.prototype._getSocialAction\" was called with unknown action key \""+s+"\".\n\tNo action will not be rendered.");return undefined;}}return r;};h.prototype._updateSocialActionDomRef=function(s){var i=s.$();if(i){i.attr("class",s.cssClass);if(s.fnCalculateState){i.addClass("sapUiUx3ActionBarAction");i.addClass(s.fnCalculateState(this));}if(s.name==this.mActionKeys.Update||s.name==this.mActionKeys.Flag||s.name==this.mActionKeys.Favorite){i.attr("aria-pressed",s.fnCalculateState(this)=="Selected"?"true":"false");}if(s.isMenu){i.attr("aria-haspopup",s.isMenu(this)?"true":"false");}}};h.prototype._rerenderSocialActions=function(){var i=this.$("socialActions");if(i.length>0){var r=sap.ui.getCore().createRenderManager();A.renderSocialActions(r,this);r.flush(i[0]);r.destroy();}};h.prototype._rerenderBusinessAction=function(o){var i=o.$();if(i.length>0){var r=sap.ui.getCore().createRenderManager();r.renderControl(o);r.flush(i[0].parentNode);r.destroy();}};h.prototype._rerenderBusinessActions=function(){if(!this.getAlwaysShowMoreMenu()){var i=this.$("businessActions");if(i&&i.length>0){var r=sap.ui.getCore().createRenderManager();A.renderBusinessActionButtons(r,this);r.flush(i[0]);r.destroy();}}this._onresize();};h.prototype.setFollowState=function(o){this.setProperty("followState",o);if(!this._oMenu){var i=this._getSocialAction(this.mActionKeys.Follow);i._fnPrepareFollowMenu(null,this);}return this;};h.prototype.setShowUpdate=function(i){this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Update),i);this.setProperty("showUpdate",i,true);return this;};h.prototype.setShowFollow=function(i){this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Follow),i);this.setProperty("showFollow",i,true);return this;};h.prototype.setShowFlag=function(i){this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Flag),i);this.setProperty("showFlag",i,true);return this;};h.prototype.setShowFavorite=function(i){this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Favorite),i);this.setProperty("showFavorite",i,true);return this;};h.prototype.setShowOpen=function(i){this._setShowSocialAction(this._getSocialAction(this.mActionKeys.Open),i);this.setProperty("showOpen",i,true);return this;};h.prototype._setFollowState=function(o){this.setProperty("followState",o,true);return this;};h.prototype._setFlagState=function(o){this.setProperty("flagState",o,true);return this;};h.prototype._setUpdateState=function(u){this.setProperty("updateState",u,true);return this;};h.prototype._setFavoriteState=function(o){this.setProperty("favoriteState",o,true);return this;};h.prototype.setThingIconURI=function(i){this.setProperty("thingIconURI",i,true);var u=this.mActionMap[this.mActionKeys.Update];if(u&&this._feeder){this._feeder.setThumbnailSrc(i);}else{L.warning("Function \"sap.ui.ux3.ActionBar.setThingIconURI\": failed to set new icon \""+i+"\".\n\tReason: either updateAction "+u+" or feeder "+this._feeder+" is not defined.");}return this;};h.prototype.setDividerWidth=function(w){this._iSocActListWidth=null;this.setProperty("dividerWidth",w);return this;};h.prototype.setAlwaysShowMoreMenu=function(j){var o=this.getProperty("alwaysShowMoreMenu");var k=this.getAggregation("businessActions",[]);this.setProperty("alwaysShowMoreMenu",j,true);if(o!=j&&k){if(!j){for(var i=0;i<k.length;i++){var m=k[i];this._createButtonForAction(m,this._oMoreMenu._getMenuItemForAction(m));}}else{var n=this._getBusinessActionButtons();for(var p=0;p<n.length;p++){if(n[p].oMenuItem){n[p].oMenuItem.setVisible(true);n[p].oMenuItem=null;}}this.destroyAggregation("_businessActionButtons");}this._styleMoreMenuButton();}this._bCallOnresize=true;this._rerenderBusinessActions();return this;};h.prototype.closePopups=function(){if(this._oUpdatePopup){this._oUpdatePopup.close();}if(this._oMoreMenu){this._oMoreMenu.close();}if(this._oMenu){this._oMenu.close();}};h.prototype._removeSocialAction=function(s){var r=null;if(s.name&&this.mActionMap[s.name]){if(this.mActionMap[s.name].fnExit){this.mActionMap[s.name].fnExit(this);}r=this.removeAggregation("_socialActions",this.mActionMap[s.name],true);this.mActionMap[s.name].destroy();delete this.mActionMap[s.name];this._rerenderSocialActions();this._iSocActListWidth=null;}return r;};h.prototype._removeAllSocialActions=function(){for(var k in this.mActionMap){if(this.mActionMap[k]&&this.mActionMap[k].fnExit){this.mActionMap[k].fnExit(this);}}this.mActionMap={};var r=this.removeAllAggregation("_socialActions",true);this._iSocActListWidth=null;this._rerenderSocialActions();return r;};h.prototype._addSocialAction=function(s,i){var r=null;if(!this.mActionMap[s.name]){r=this._prepareSocialAction(s,i);if(s.fnInit){s.fnInit(this);}this._iSocActListWidth=null;}if(r){this._rerenderSocialActions();}return r;};h.prototype._prepareSocialAction=function(s,i){s.attachSelect(q.proxy(function(o){if(s.fnActionSelected){s.fnActionSelected(o,this);}else{this.fireActionSelected({id:s.name,action:s});}},this));s.setTooltip(this._getLocalizedText(s.tooltipKey));this.mActionMap[s.name]=s;if(i){this.insertAggregation("_socialActions",s,i,true);}else{this.addAggregation("_socialActions",s,true);}return s;};h.prototype._setShowSocialAction=function(s,i){return i?this._addSocialAction(s):this._removeSocialAction(s);};h.prototype.addBusinessAction=function(o){return this._addBusinessAction(o);};h.prototype.insertBusinessAction=function(o,i){return this._addBusinessAction(o,i);};h.prototype.removeBusinessAction=function(o){return this._removeBusinessAction(o,true);};h.prototype._removeBusinessAction=function(o,r){if(typeof o==="string"){var j;var s=o;for(var i=0;i<this.getBusinessActions().length;i++){var k=this.getBusinessActions()[i];if(k.getId()===s){j=k;break;}}o=j;}if(this._oMoreMenu){var m=this._oMoreMenu._getMenuItemForAction(o);if(m){this._oMoreMenu.removeItem(m);m.destroy();}if(this._oMoreMenu.getItems().length==0){this._oMoreMenuButton.destroy();this._oMoreMenuButton=null;this._oMoreMenu.destroy();this._oMoreMenu=null;}}if(!this.getAlwaysShowMoreMenu()){var n=this._getButtonForAction(o);if(n){this.removeAggregation("_businessActionButtons",n,true);n.destroy();}}var p=this.removeAggregation("businessActions",o,true);if(r){this._rerenderBusinessActions();}return p;};h.prototype.removeAllBusinessActions=function(){var j=this.getAggregation("businessActions",[]);if(j){for(var i=0;i<j.length;i++){this._removeBusinessAction(j[i],false);}}this._rerenderBusinessActions();var r=this.removeAllAggregation("businessActions",true);return r;};h.prototype.destroyBusinessActions=function(){var j=this.getAggregation("businessActions",[]);if(j){for(var i=0;i<j.length;i++){var k=this._removeBusinessAction(j[i],false);if(k instanceof sap.ui.core.Element){k.destroy(true);}}}this._rerenderBusinessActions();var r=this.destroyAggregation("businessActions",true);return r;};h.prototype._getBusinessActionButtons=function(){return this.getAggregation("_businessActionButtons",[]);};h.prototype._addBusinessAction=function(o,j){var r;if(!j&&j!=0){r=this.addAggregation("businessActions",o,true);}else{r=this.insertAggregation("businessActions",o,j,true);}if(!this._oMoreMenuButton){this._oMoreMenuButton=new c(this.getId()+"-MoreMenuButton");this._oMoreMenuButton.setText(this._getLocalizedText("ACTIONBAR_BUTTON_MORE_TEXT"));this._oMoreMenuButton.setTooltip(this._getLocalizedText("ACTIONBAR_BUTTON_MORE_TOOLTIP"));this._oMoreMenuButton.setDockButton(d.EndTop);this._oMoreMenuButton.setDockMenu(d.EndBottom);this._styleMoreMenuButton();this._oMoreMenu=new b(this.getId()+"-MoreMenu",{ariaDescription:this._getLocalizedText("ACTIONBAR_BUTTON_MORE_TOOLTIP")});this._oMoreMenu._getMenuItemForAction=function(n){for(var i=0;i<this.getItems().length;i++){var k=this.getItems()[i];if(k.action==n){return k;}}return null;};this._oMoreMenuButton.setMenu(this._oMoreMenu);}var m=this._oMoreMenu.getId()+"-MenuItem-"+o.getId();var k=new M(m,{text:o.getText(),enabled:o.getEnabled()});k.action=o;k.attachSelect(q.proxy(function(i){this.fireActionSelected({id:o.getId(),action:o});},this));if(j){this._oMoreMenu.insertItem(k,j);}else{this._oMoreMenu.addItem(k);}this._createButtonForAction(o,k,j);this._rerenderBusinessActions();return r;};h.prototype._getMoreMenuButton=function(){return this._oMoreMenuButton;};h.prototype._onresize=function(E){var o=this.$();if(o){var s=this.getActionBarMinWidth()+"px";if(o.css('minWidth')!=s){o.css('minWidth',s);}}if(!this.getAlwaysShowMoreMenu()&&this._oMoreMenuButton){var S=false;if(this._getBusinessActionButtons().length>1){var m=this._oMoreMenuButton.$().outerWidth();var i=o.outerWidth()-this._getSocialActionListMinWidth()-m;var j=this._getBusinessActionButtons();var k=0;for(var n=0;n<j.length;n++){var p=j[n].$().parent();k+=p.outerWidth();if(n==j.length-1){k-=m;}if(k>=i){if(p.length>0){p.css('display','none');if(j[n].oMenuItem){j[n].oMenuItem.setVisible(true);}S=true;}}else{if(p.length>0){p.css('display','');if(D.browser.msie){this._rerenderBusinessAction(j[n]);}if(j[n].oMenuItem){j[n].oMenuItem.setVisible(false);}}}}S|=this.getAggregation("businessActions").length>j.length;}var r=this._oMoreMenuButton.$().parent();if(r.length>0){S?r.css('display',''):r.css('display','none');}if(!S&&this._oMoreMenu){this._oMoreMenu.close();}}this._setItemNavigation();};h.prototype.onBeforeRendering=function(){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;};h.prototype.onAfterRendering=function(){this._sResizeListenerId=R.register(this.getDomRef(),q.proxy(this._onresize,this));if(this._bCallOnresize){this._onresize();}this._setItemNavigation();};h.prototype._getSocialActionListMinWidth=function(){if(!this._iSocActListWidth){if(this.getDividerWidth()){this._iSocActListWidth=parseInt(this.getDividerWidth());}else{var s=this.getAggregation("_socialActions",[]);var i=s.length;this._iSocActListWidth=24*i+12;}}return this._iSocActListWidth;};h.prototype.getActionBarMinWidth=function(){var r=this._getSocialActionListMinWidth();var o=this._oMoreMenuButton;if(!this.getAlwaysShowMoreMenu()&&this._getBusinessActionButtons().length==1){o=this._getBusinessActionButtons()[0];}if(o){var p=o.$().parent();if(p){r+=p.outerWidth()-3;}}return r;};h.prototype._getButtonForAction=function(o){for(var i=0;i<this._getBusinessActionButtons().length;i++){var j=this._getBusinessActionButtons()[i];if(j.action==o){return j;}}return null;};h.prototype._createButtonForAction=function(o,m,i){if(!this.getAlwaysShowMoreMenu()&&!o.showInMoreMenu){var j=new B({id:this.getId()+"-"+o.getId()+"Button",text:o.getText(),tooltip:o.getTooltip(),enabled:o.getEnabled()});j.attachPress(q.proxy(function(k){this.fireActionSelected({id:o.getId(),action:o});},this));j.oMenuItem=m;j.action=o;if(i){this.insertAggregation("_businessActionButtons",j,i,true);}else{this.addAggregation("_businessActionButtons",j,true);}return j;}return null;};h.prototype._styleMoreMenuButton=function(){if(this._oMoreMenuButton){if(this.getAlwaysShowMoreMenu()){this._oMoreMenuButton.setLite(true);this._oMoreMenuButton.addStyleClass("sapUiUx3ActionBarLiteMoreButton");}else{this._oMoreMenuButton.setLite(false);this._oMoreMenuButton.removeStyleClass("sapUiUx3ActionBarLiteMoreButton");}}};h.prototype._setItemNavigation=function(){if(this.getDomRef()){this._oItemNavigation.setRootDomRef(q(this.getDomRef()).get(0));var j=[];var o=this.getAggregation("_socialActions",[]);for(var i=0;i<o.length;i++){j.push(o[i].getDomRef());}o=this.getAggregation("_businessActionButtons",[]);for(var i=0;i<o.length;i++){j.push(o[i].getDomRef());}if(this._oMoreMenuButton&&this._oMoreMenuButton.getDomRef()){j.push(this._oMoreMenuButton.getDomRef());}this._oItemNavigation.setItemDomRefs(j);}};h.prototype.invalidate=function(o){if(o instanceof T){var i=sap.ui.getCore().byId(this.getId()+"-"+o.getId()+"Button");var j=this._oMoreMenu&&this._oMoreMenu._getMenuItemForAction(o);if(i){i.setTooltip(o.getTooltip());i.setText(o.getText());i.setEnabled(o.getEnabled());}if(j){j.setTooltip(o.getTooltip());j.setText(o.getText());j.setEnabled(o.getEnabled());}if(!i&&!j){C.prototype.invalidate.apply(this,arguments);}}C.prototype.invalidate.apply(this,arguments);};return h;});
