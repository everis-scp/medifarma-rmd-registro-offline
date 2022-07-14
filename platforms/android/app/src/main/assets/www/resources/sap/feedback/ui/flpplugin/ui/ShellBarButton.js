/*!
 * SAPUI5

		(c) Copyright 2009-2020 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/InvisibleText","../utils/Constants","../utils/Utils"],function(O,I,C,U){"use strict";return O.extend("sap.feedback.ui.flpplugin.ui.ShellBarButton",{_fnRendererPromise:null,_oResourceBundle:null,_oInvisibleSurveyButton:null,_oHeaderItemOptions:{},_oHeaderItem:null,_fnDialogCallback:null,_bIsButtonHidden:false,constructor:function(r,d,R){this._fnRendererPromise=r;this._fnDialogCallback=d;this._oResourceBundle=R;},init:function(){this._createInvisibleText();this._defineButtonOptions();return this._fnRendererPromise.then(function(r){this._oHeaderItem=r.addHeaderEndItem("sap.ushell.ui.shell.ShellHeadItem",this._oHeaderItemOptions,true);}.bind(this));},_createInvisibleText:function(){this._oInvisibleSurveyButton=new I({id:C.S_INVISIBLE_ITEM_ID,text:this._getText("SHELLBAR_BUTTON_TOOLTIP")}).toStatic();},_defineButtonOptions:function(){this._oHeaderItemOptions={id:C.S_SHELL_BTN_ID,icon:"sap-icon://feedback",tooltip:this._getText("SHELLBAR_BUTTON_TOOLTIP"),ariaLabel:this._getText("SHELLBAR_BUTTON_TOOLTIP"),text:this._getText("SHELLBAR_BUTTON_TOOLTIP"),press:this._fnDialogCallback.bind(this)};},updateButtonState:function(){var c=U.getCurrentApp();if(U.isSupportedAppType(c)){this._showButton();return;}this._hideButton();},_showButton:function(){this._showHeaderItem();this._bIsButtonHidden=false;},_hideButton:function(){this._bIsButtonHidden=true;this._hideHeaderItem();return C.E_SHELLBAR_BUTTON_STATE.unchanged;},_showHeaderItem:function(){sap.ushell.Container.getRenderer("fiori2").showHeaderEndItem([C.S_SHELL_BTN_ID]);},_hideHeaderItem:function(){sap.ushell.Container.getRenderer("fiori2").hideHeaderEndItem([C.S_SHELL_BTN_ID]);},_getText:function(t){var a=this._oResourceBundle.getText(t);return a;}});});