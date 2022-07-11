/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/library',"sap/ui/core/Core"],function(c,C){"use strict";var A=c.aria.HasPopup;var a=function(o){if(o){this._oControl=o;this._oControl.addDelegate(this._controlDelegate,false,this);}this.oRb=C.getLibraryResourceBundle("sap.f");};a.AriaHasPopup={MENU:A.Menu,PRODUCTS:A.Menu,PROFILE:A.Menu,NOTIFICATIONS:A.Dialog};a.prototype._controlDelegate={onBeforeRendering:function(){this.attachDelegates();}};a.prototype.attachDelegates=function(){var o=this._oControl.getProfile();this._oDelegateSecondTitle={onAfterRendering:this.onAfterRenderingSecondTitle};this._oDelegateSearch={onAfterRendering:this.onAfterRenderingSearch};this._oDelegateAvatar={onAfterRendering:this.onAfterRenderingAvatar};this._oDelegateProducts={onAfterRendering:this.onAfterRenderingProducts};this._oDelegateNavButton={onAfterRendering:this.onAfterRenderingNavButton};this._oDelegateMenuButton={onAfterRendering:this.onAfterRenderingMenuButton};if(this._oControl._oSecondTitle){this._oControl._oSecondTitle.addDelegate(this._oDelegateSecondTitle,false,this);}if(this._oControl._oSearch){this._oControl._oSearch.addDelegate(this._oDelegateSearch,false,this);}if(o){o.addDelegate(this._oDelegateAvatar,false,this);}if(this._oControl._oProductSwitcher){this._oControl._oProductSwitcher.addDelegate(this._oDelegateProducts,false,this);}if(this._oControl._oNavButton){this._oControl._oNavButton.addDelegate(this._oDelegateNavButton,false,this);}if(this._oControl._oMenuButton){this._oControl._oMenuButton.addDelegate(this._oDelegateMenuButton,false,this);}};a.prototype.getRootAttributes=function(){return{role:"banner",label:this.oRb.getText("SHELLBAR_CONTAINER_LABEL")};};a.prototype.getCoPilotAttributes=function(){return{role:"button",label:this.oRb.getText("SHELLBAR_COPILOT_TOOLTIP")};};a.prototype.getEntityTooltip=function(e){return this.oRb.getText("SHELLBAR_"+e+"_TOOLTIP")||"";};a.prototype.updateNotificationsNumber=function(n){var t=this.getEntityTooltip("NOTIFICATIONS"),s=n?n+" "+t:t;this._oControl._oNotifications.setTooltip(s);};a.prototype.onAfterRenderingSecondTitle=function(){var $=this._oControl._oSecondTitle.$();$.attr("role","heading");$.attr("aria-level","2");};a.prototype.onAfterRenderingSearch=function(){this._oControl._oSearch.$().attr("aria-label",this.getEntityTooltip("SEARCH"));};a.prototype.onAfterRenderingAvatar=function(){var $=this._oControl.getProfile().$();$.attr("aria-label",this.getEntityTooltip("PROFILE"));$.attr("aria-haspopup","menu");};a.prototype.onAfterRenderingProducts=function(){var $=this._oControl._oProductSwitcher.$();$.attr("aria-label",this.getEntityTooltip("PRODUCTS"));};a.prototype.onAfterRenderingNavButton=function(){this._oControl._oNavButton.$().attr("aria-label",this.getEntityTooltip("BACK"));};a.prototype.onAfterRenderingMenuButton=function(){var $=this._oControl._oMenuButton.$();$.attr("aria-label",this.getEntityTooltip("MENU"));};a.prototype.exit=function(){var o=this._oControl.getProfile();if(this._oControl){this._oControl.removeDelegate(this._controlDelegate);}if(this._oControl._oSecondTitle){this._oControl._oSecondTitle.removeDelegate(this._oDelegateSecondTitle);}if(this._oControl._oSearch){this._oControl._oSearch.removeDelegate(this._oDelegateSearch);}if(o){o.removeDelegate(this._oDelegateAvatar);}if(this._oControl._oProductSwitcher){this._oControl._oProductSwitcher.removeDelegate(this._oDelegateProducts);}if(this._oControl._oNavButton){this._oControl._oNavButton.removeDelegate(this._oDelegateNavButton);}if(this._oControl._oMenuButton){this._oControl._oMenuButton.removeDelegate(this._oDelegateMenuButton);}};return a;});
