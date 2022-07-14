//@ui5-bundle sap/ushell/components/shell/UserImage/Component-preload.js
/*!
 * Copyright (c) 2009-2020 SAP SE, All Rights Reserved
 */
sap.ui.predefine('sap/ushell/components/shell/UserImage/Component',["sap/ushell/resources","sap/ui/core/UIComponent","sap/ui/core/IconPool","sap/ui/Device","sap/m/Button","sap/m/ButtonType","sap/base/Log","sap/base/util/isEmptyObject","sap/ui/thirdparty/jquery"],function(r,U,I,D,B,a,l,i,q){"use strict";var s;return U.extend("sap.ushell.components.shell.UserImage.Component",{metadata:{version:"1.93.6",library:"sap.ushell.components.shell.UserImage",dependencies:{libs:{"sap.m":{},"sap.ui.layout":{lazy:true}}}},createContent:function(){var S;s=sap.ushell.Container.getRenderer("fiori2")._oShellView;S=(s.getViewData()?s.getViewData().config:{})||{};this.loadUserImage();var u=sap.ushell.Container.getUser();if(S.enableUserImgConsent===true&&u.getImageConsent()===undefined){this._showUserConsentPopup();}},_showUserConsentPopup:function(){var t=this;var T=sap.ui.getCore().getConfiguration().getRTL()?"Right":"Left";var d,f,b,c;var y=new B("yesButton",{text:r.i18n.getText("DisplayImg"),type:a.Emphasized,press:function(){t.updateUserImage(true);d.close();}});var n=new B("noButton",{text:r.i18n.getText("DontDisplayImg"),press:function(){t.updateUserImage(false);d.close();}});sap.ui.require(["sap/ui/layout/form/VerticalLayout","sap/m/Dialog","sap/m/Text","sap/m/Link","sap/m/FlexBox"],function(V,e,g,L,F){d=new e("userConsentDialog",{title:r.i18n.getText("userImageConsentDialogTitle"),modal:true,stretch:D.system.phone,buttons:[y,n],afterClose:function(){d.destroy();}}).addStyleClass("sapUshellUserConsentDialog").addStyleClass("sapContrastPlus");var u=new g({text:r.i18n.getText("userImageConsentDialogTermsOfUse")}).addStyleClass("sapUshellUserConsentDialogTerms");var h=new g({text:r.i18n.getText("userImageConsentText"),textAlign:T}).addStyleClass("sapUshellUserConsentDialogText");var j=new L({text:r.i18n.getText("userImageConsentDialogShowTermsOfUse"),textAlign:T,press:function(){var m=c.getVisible();if(m){c.setVisible(false);j.setText(r.i18n.getText("userImageConsentDialogShowTermsOfUse"));}else{j.setText(r.i18n.getText("userImageConsentDialogHideTermsOfUse"));c.setVisible(true);}}}).addAriaLabelledBy(h);f=new F({alignItems:"Center",direction:"Row",items:[h]}).addStyleClass("sapUshellUserConsentDialogBox");b=new F({alignItems:"Center",direction:"Row",items:[j]}).addStyleClass("sapUshellUserConsentDialogBox").addStyleClass("sapUshellUserConsentDialogLink");c=new F({alignItems:"Center",direction:"Row",items:[u]}).addStyleClass("ushellUserImgConsentTermsOfUseFlexBox");c.setVisible(false);var k=new V("userConsentDialogLayout",{content:[f,b,c]});d.addContent(k);d.open();});},loadUserImage:function(){var u=sap.ushell.Container.getUser(),b=u.getImage();if(b){this._setUserImage(b);}u.attachOnSetImage(this._setUserImage.bind(this));},_setUserImage:function(p){var u=typeof p==="string"?p:p.mParameters;if(u&&typeof u==="string"||!i(u)){q.ajax({url:u,headers:{"Cache-Control":"no-cache, no-store, must-revalidate",Pragma:"no-cache",Expires:"0"},success:function(){s.getModel().setProperty("/userImage/personPlaceHolder",u);s.getModel().setProperty("/userImage/account",u);},error:function(){l.error("Could not load user image from: "+u,"","sap.ushell.renderers.fiori2.Shell.view");sap.ushell.Container.getUser().setImage("");}});}else{s.getModel().setProperty("/userImage/personPlaceHolder",null);s.getModel().setProperty("/userImage/account",I.getIconURI("account"));}},updateUserImage:function(b){var u=sap.ushell.Container.getUser(),d=new q.Deferred(),o;this.userInfoService=sap.ushell.Container.getService("UserInfo");if(b!==undefined){u.setImageConsent(b);o=this.userInfoService.updateUserPreferences(u);o.done(function(){u.resetChangedProperty("isImageConsent");d.resolve();});}else{d.reject(b+"is undefined");}},exit:function(){}});});
//# sourceMappingURL=Component-preload.js.map