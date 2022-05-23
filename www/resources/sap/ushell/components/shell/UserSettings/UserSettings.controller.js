// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/Device","sap/ushell/components/applicationIntegration/AppLifeCycle","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/resources","sap/ushell/ui/utils","sap/base/Log","sap/ui/thirdparty/jquery","sap/m/ObjectHeader","sap/m/library","sap/ui/core/IconPool","sap/m/Page","sap/m/Label","sap/m/Input","sap/m/StandardListItem","sap/m/Text","sap/m/FlexBox"],function(C,D,A,a,E,r,u,L,q,O,m,I,P,b,c,S,T,F){"use strict";var B=m.BackgroundDesign;var d;return C.extend("sap.ushell.components.shell.UserSettings",{onInit:function(){this.getView().byId("userSettingEntryList").addEventDelegate({onAfterRendering:this._listAfterRendering.bind(this)});this.getView().byId("userSettingsDialog").addEventDelegate({onkeydown:this._keyDown.bind(this)});var s=this.getView().byId("settingsApp");s.setMode(D.system.desktop?"StretchCompressMode":"ShowHideMode");s._oDetailNav.setAutoFocus(false);d=E.on("openUserSettings").do(this.openUserSettings.bind(this));},onExit:function(){d.off();},openUserSettings:function(){this.getView().byId("userSettingsDialog").open();},_afterClose:function(){sap.ushell.Container.getUser().resetChangedProperties();if(window.document.activeElement&&window.document.activeElement.tagName==="BODY"){window.document.getElementById("meAreaHeaderButton").focus();}},_createDetailPage:function(e,t,o){var f=new O({title:t,backgroundDesign:B.Solid}).addStyleClass("sapUshellUserSettingDetailHeader");if(e==="userAccountEntry"){var U=sap.ushell.Container.getUser();if(U.getImage()){f.setIcon(a.last("/core/shell/model/userImage/personPlaceHolder"));}else{f.setIcon(I.getIconURI("sap-icon://person-placeholder"));}U.attachOnSetImage(function(){var s=a.last("/core/shell/model/userImage/personPlaceHolder"),g=I.getIconURI("sap-icon://person-placeholder");f.setIcon(s||g);});f.setTitle(sap.ushell.Container.getUser().getFullName());}var p=new P("detail"+o.getId(),{content:[f,o],showHeader:false}).addStyleClass("sapUsheUserSettingDetaildPage");p.addEventDelegate({onAfterRendering:this._handleNavButton.bind(this)});this.getView().byId("settingsApp").addDetailPage(p);return p.getId();},_createEntryContent:function(e){var t=this;return new Promise(function(f){if(typeof e.contentFunc==="function"){e.contentFunc().always(function(g){if(g instanceof sap.ui.core.Control){f(t._createDetailPage(e.entryHelpID,e.title,g));}else{var h=new F(e.entryHelpID,{height:"5rem",alignItems:"Center",justifyContent:"Center",items:[new T({text:r.i18n.getText("loadingErrorMessage")})]});f(t._createDetailPage(e.entryHelpID,e.title,h));}});}else{var o;e.valueArgument().done(function(v){o=t._getKeyValueContent(e,v);}).fail(function(){o=t._getKeyValueContent(e);}).always(function(){f(t._createDetailPage(e.entryHelpID,e.title,o));});}});},_createListEntry:function(i,o){var e=o.getProperty(o.sPath);if(e.entryHelpID){i=e.entryHelpID+"-UserSettingsEntry";}return new S(i,{title:{path:"entries>title"},description:{path:"entries>valueResult"},icon:{parts:[{path:"entries>icon"},{path:"/userImage/account"}],formatter:this._getEntryIcon},visible:{parts:[{path:"entries>visible"},{path:"entries>defaultVisibility"},{path:"entries>title"}],formatter:this._getEntryVisible.bind(this)},type:D.system.phone?"Navigation":"Inactive"}).addStyleClass("sapUshellUserSettingMasterListItem");},_dialogCancelButtonHandler:function(){var e=this.getView().getModel("entries").getData().entries||[];for(var i=0;i<e.length;i++){if(e[i]&&e[i].onCancel){e[i].onCancel();}}this._handleSettingsDialogClose();},_emitEntryOpened:function(e){var U=E.last("UserSettingsOpened")||{},p=e.split("/").pop();U[p]=true;E.emit("UserSettingsOpened",U);},_getEntryIcon:function(e,U){if(e==="sap-icon://account"&&U){return U;}return e||"sap-icon://action-settings";},_getEntryVisible:function(v,e,t){if(t===r.i18n.getText("userProfiling")){var p=this.getView().getModel("entries").getProperty("/profiling")||[],U=sap.ushell.Container.getService("UsageAnalytics");for(var i=p.length-1;i>=0;i--){if(p[i].entryHelpID==="usageAnalytics"){if(!U.systemEnabled()||!U.isSetUsageAnalyticsPermitted()){p.splice(i,1);}}}return p&&p.length>0;}if(v!==undefined){return v;}if(e!==undefined){return e;}return true;},_getKeyValueContent:function(e,s){var k=new b({text:e.title+":"}).addStyleClass("sapUshellUserSettingsDetailsKey");var v=new c({value:s||" ",editable:false}).addStyleClass("sapUshellUserSettingsDetailsValue");var o=new F(e.entryHelpID,{alignItems:D.system.phone?"Start":"Center",wrap:D.system.phone?"Wrap":"NoWrap",direction:D.system.phone?"Column":"Row",items:[k,v]});return o;},_handleNavButton:function(){var s=this.getView().byId("settingsApp"),n=this.getView().byId("userSettingsNavBackButton");n.setVisible(!s.isMasterShown());},_handleSettingsDialogClose:function(){this.getView().byId("settingsApp").toMaster("sapFlpUserSettings-View--userSettingMaster");this.getView().byId("userSettingEntryList").removeSelections(true);this.getView().byId("userSettingsDialog").close();},_handleSettingsSave:function(){var s=A.getElementsModel().getModel(),t=this;var i=s.getProperty("/userPreferences/isDetailedEntryMode");if(i){s.setProperty("/userPreferences/activeEntryPath",null);}u.saveUserPreferenceEntries(s.getProperty("/userPreferences/entries")).done(function(){t._handleSettingsDialogClose();sap.ui.require(["sap/m/MessageToast"],function(M){var e=r.i18n.getText("savedChanges");M.show(e,{duration:3000,width:"15em",my:"center bottom",at:"center bottom",of:window,offset:"0 -50",collision:"fit fit"});});}).fail(function(f){sap.ui.require(["sap/m/MessageBox"],function(M){var e;var g="";if(f.length===1){e=r.i18n.getText("savingEntryError")+" ";}else{e=r.i18n.getText("savingEntriesError")+"\n";}f.forEach(function(o){e+=o.entry+"\n";g+="Entry: "+o.entry+" - Error message: "+o.message+"\n";});M.show(e,{icon:M.Icon.ERROR,title:r.i18n.getText("error"),actions:[M.Action.OK]});L.error("Failed to save the following entries",g,"sap.ushell.ui.footerbar.UserPreferencesButton");});});},_itemPress:function(e){this._toDetail(e.getSource().getSelectedItem(),e.getId());},_keyDown:function(e){if(e.keyCode===27){this._dialogCancelButtonHandler();}},_listAfterRendering:function(){var M=this.getView().byId("userSettingEntryList");var e=M.getItems();for(var i=0;i<e.length;i++){var p=e[i].getBindingContext("entries").getPath();this._setEntryValueResult(p);}if(!D.system.phone){var f=M.getItems()[0];if(f){M.setSelectedItem(f);this._toDetail(f,"select");f.getDomRef().focus();}}},_navBackButtonPressHandler:function(e){var s=this.getView().byId("settingsApp");if(D.system.phone){s.backDetail();this._handleNavButton();e.getSource().setPressed(false);}else if(s.isMasterShown()){s.hideMaster();e.getSource().setTooltip(r.i18n.getText("ToggleButtonShow"));e.getSource().setPressed(false);}else{s.showMaster();e.getSource().setTooltip(r.i18n.getText("ToggleButtonHide"));e.getSource().setPressed(true);}},_navToDetail:function(i,e,s){var o=this.getView().byId("settingsApp");o.toDetail(i);E.emit("UserPreferencesDetailNavigated",i);if(e==="select"&&!D.system.phone){var f=q(document.getElementById(i)).firstFocusableDomRef();if(f){f.focus();}}if(o.getMode()==="ShowHideMode"){o.hideMaster();}this._handleNavButton();this._emitEntryOpened(s);},_setEntryValueResult:function(e){var M=this.getView().getModel("entries"),i=M.getProperty(e+"/editable"),v=M.getProperty(e+"/valueArgument"),V=M.getProperty(e+"/visible"),f=M.getProperty(e+"/defaultVisibility");if(typeof v==="function"){M.setProperty(e+"/valueResult",r.i18n.getText("genericLoading"));M.setProperty(e+"/editable",false);v().done(function(g){M.setProperty(e+"/editable",i);var h=true;if(g&&g.value!==undefined){h=!!g.value;}else if(V!==undefined){h=V;}else if(f!==undefined){h=f;}var s=" ";if(g!==undefined){if(typeof(g)==="object"){s=g.displayText;}else{s=g;}}M.setProperty(e+"/visible",h);M.setProperty(e+"/valueResult",s);}).fail(function(){M.setProperty(e+"/valueResult",r.i18n.getText("loadingErrorMessage"));});}else if(v){M.setProperty(e+"/valueResult",v);}else{M.setProperty(e+"/valueResult",r.i18n.getText("loadingErrorMessage"));}},_toDetail:function(s,e){var M=this.getView().getModel("entries"),f=s.getBindingContext("entries").getPath(),g=M.getProperty(f+"/contentResult");if(D.system.phone){s.setSelected(false);}if(g){this._navToDetail(g,e,f);}else{var t=this,o=M.getProperty(f);this._createEntryContent(o).then(function(n){M.setProperty(f+"/contentResult",n);t._navToDetail(n,e,f);});}}});});