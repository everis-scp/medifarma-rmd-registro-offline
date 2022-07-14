// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log","sap/m/Bar","sap/m/Button","sap/m/ButtonRenderer","sap/m/Dialog","sap/m/DisplayListItem","sap/m/library","sap/m/List","sap/m/Text","sap/m/ObjectIdentifier","sap/ui/core/IconPool","sap/ui/Device","sap/ui/layout/VerticalLayout","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/library","sap/ushell/resources","sap/ushell/ui/launchpad/AccessibilityCustomData","sap/ushell/ui/launchpad/ActionItem","sap/ushell/ui/utils"],function(L,B,a,b,D,c,m,d,T,O,I,f,V,J,q,C,E,u,r,A,g,U){"use strict";var h=m.ButtonType;var j=g.extend("sap.ushell.ui.footerbar.UserPreferencesButton",{metadata:{library:"sap.ushell"},renderer:"sap.m.ButtonRenderer"});j.prototype.init=function(){if(g.prototype.init){g.prototype.init.apply(this,arguments);}this.setIcon("sap-icon://person-placeholder");this.translationBundle=r.i18n;this.setText(this.translationBundle.getText("userSettings"));this.setTooltip(this.translationBundle.getText("settings_tooltip"));this.attachPress(this.showUserPreferencesDialog);this.oModel=C.createModel("/core/userPreferences",J);this.setModel(this.oModel);};j.prototype.createDialog=function(){var t=this;this.saveButton=this._createSaveButton();this.cancelButton=this._createCancelButton();this.oDialog=new D({id:"userPreferencesDialog",title:"{/dialogTitle}",contentWidth:"29.6rem",content:null,contentHeight:"17rem",buttons:[this.saveButton,this.cancelButton],afterClose:function(){this._destroyDialog();this.oUser.resetChangedProperties();}.bind(t),stretch:f.system.phone}).addStyleClass("sapUshellUserPreferencesDialog").addStyleClass("sapContrastPlus");this._addDialogBackButton();this.oDialog.setModel(this.getModel());this.oDialog.addCustomData(new A({key:"aria-label",value:t.translationBundle.getText("Settings_Dialog_Main_label"),writeToDom:true}));this.oDialog.addContent(this._getOriginalDialogContent());};j.prototype._getOriginalDialogContent=function(){if(!this.oInitialContent){var o,e;o=this._getUserDetailsControl();e=this._getEntryListControl();this.oInitialContent=new V("userPreferencesLayout",{content:[o,e],width:"100%"});}return this.oInitialContent;};j.prototype._getEntryListControl=function(){var e=this._getUserPrefEntriesTemplate(),x=this.getModel()&&this.getModel().getProperty("/enableHelp"),t=this,i,s=this.oUser.getFullName(),o,k=new d("userPrefEnteryList",{items:{path:"/entries",template:e}});k.addCustomData(new A({key:"aria-label",value:t.translationBundle.getText("Settings_EntryList_label")+s,writeToDom:true}));o=k.onAfterRendering;k.onAfterRendering=function(){var l=this.getItems(),n;o.apply(this,arguments);for(i=0;i<l.length;i++){n=l[i].getBindingContext().getPath();if(!t.getModel().getProperty(n+"/valueResult")){t._setEntryValueResult(n);}if(x){t._addXRayHelpId(n,l[i]);}}};return k;};j.prototype._addXRayHelpId=function(e,l){var i=this.getModel().getProperty(e+"/entryHelpID");if(i){l.addStyleClass("help-id-"+i);}};j.prototype._setEntryValueResult=function(e){var t=this,i=this.getModel().getProperty(e+"/editable"),v=this.getModel().getProperty(e+"/valueArgument");if(typeof v==="function"){this.getModel().setProperty(e+"/valueResult",this.translationBundle.getText("genericLoading"));this.getModel().setProperty(e+"/editable",false);var o=v();o.done(function(k){t.getModel().setProperty(e+"/editable",i);t.getModel().setProperty(e+"/visible",typeof(k)==="object"?!!k.value:true);t.getModel().setProperty(e+"/valueResult",typeof(k)==="object"?k.displayText:k);});o.fail(function(){t.getModel().setProperty(e+"/valueResult",t.translationBundle.getText("loadingErrorMessage"));});}else if(v){this.getModel().setProperty(e+"/valueResult",v);this.getModel().setProperty(e+"/editable",i);}else{this.getModel().setProperty(e+"/valueResult",this.translationBundle.getText("loadingErrorMessage"));}};j.prototype._emitEntryOpened=function(e){var o=E.last("UserSettingsOpened")||{},p=e.split("/").pop();o[p]=true;E.emit("UserSettingsOpened",o);};j.prototype._getUserPrefEntriesTemplate=function(){var t=this,i,p=function(e){var o={};o=q.extend(true,{},{},e);sap.ui.require(["sap/m/FlexBox","sap/m/FlexAlignItems","sap/m/FlexJustifyContent","sap/m/BusyIndicator"],function(F,k,l,n){var s=true,v,w,x=o.getSource().getLabel(),y=o.getSource().getBindingContext().getPath();t.getModel().setProperty("/activeEntryPath",y);t._setDetailedEntryModeMode(true,y,x,y);t.oDialog.removeAllContent();w=t.getModel().getProperty(y+"/contentResult");if(w){v=sap.ui.getCore().byId(w);t.oDialog.addContent(v);t._emitEntryOpened(y);}else{var z=null,G,S=true,H=false,K=t.getModel().getProperty(y+"/contentFunc");if(typeof K==="function"){t._emitEntryOpened(y);G=K();G.done(function(M){S=false;if(H===true){t.oDialog.removeAllContent();z.destroy();}if(M instanceof sap.ui.core.Control){t.getModel().setProperty(y+"/contentResult",M.getId());t.oDialog.addContent(M);}else{s=false;}});G.fail(function(){S=false;if(H===true){t.oDialog.removeAllContent();z.destroy();}s=false;});G.always(function(){if(s===false){var M=new F("userPrefErrorFlexBox",{height:"5rem",alignItems:k.Center,justifyContent:l.Center,items:[new T("userPrefErrorText",{text:t.translationBundle.getText("loadingErrorMessage")})]});t.getModel().setProperty(y+"/contentResult",M.getId());t.oDialog.addContent(M);}});if(S===true){z=new n("userPrefLoadingBusyIndicator",{size:"2rem"});t.oDialog.addContent(z);H=true;}}}});};i=new c({label:"{title}",value:"{valueResult}",tooltip:{path:"valueResult",formatter:function(v){return typeof(v)==="string"?v:"";}},type:{path:"editable",formatter:function(e){return(e===true)?"Navigation":"Inactive";}},visible:{path:"visible",formatter:function(v){return(v!==undefined)?v:true;}},press:p,customData:new A({key:"aria-label",value:{parts:[{path:"title"},{path:"valueResult"}],formatter:function(s,v){v=v||"";return s+" "+v;}},writeToDom:true})});return i;};j.prototype._getUserDetailsControl=function(){return new O({title:this.oUser.getFullName(),text:this.oUser.getEmail()}).addStyleClass("sapUshellUserPrefUserIdentifier");};j.prototype._createCancelButton=function(){var t=this;return new a({id:"cancelButton",text:{parts:["/entries"],formatter:function(e){if(!e){return"";}var i=e.some(function(o){return o.editable;});return i>0?t.translationBundle.getText("cancelBtn"):t.translationBundle.getText("close");}},press:t._dialogCancelButtonHandler.bind(t),visible:true});};j.prototype._createSaveButton=function(){var t=this;return new a({id:"saveButton",text:this.translationBundle.getText("saveBtn"),type:h.Emphasized,press:t._dialogSaveButtonHandler.bind(t),visible:{parts:["/entries"],formatter:function(e){if(!e){return false;}return e.some(function(o){return o.editable;});}}});};j.prototype._setDetailedEntryModeMode=function(i,e,k,l){this.getModel().setProperty("/isDetailedEntryMode",!!i);this.getModel().setProperty("/dialogTitle",k);};j.prototype.showUserPreferencesDialog=function(){this.oUser=sap.ushell.Container.getUser();this.createDialog();this.oDialog.open();};j.prototype._dialogBackButtonHandler=function(){var t=this;t.getModel().setProperty("/isDetailedEntryMode",false);t.getModel().setProperty("/dialogTitle",t.translationBundle.getText("userSettings"));t.oDialog.removeAllContent();t.oDialog.addContent(t._getOriginalDialogContent());t._setEntryValueResult(t.getModel().getProperty("/activeEntryPath"));t.getModel().setProperty("/activeEntryPath",null);};j.prototype._destroyDialog=function(){this.oHeadBar.destroy();this.oInitialContent.destroy();this.oInitialContent=null;this._modelCleanUpToInitial();this._entriesCleanUp();this.oDialog.destroy();this.saveButton.destroy();this.cancelButton.destroy();};j.prototype._entriesCleanUp=function(){var i,e=this.getModel().getProperty("/entries"),s,o;for(i=0;i<e.length;i++){s=e[i].contentResult;delete e[i].contentResult;if(s){o=sap.ui.getCore().byId(s);o.destroy();o=null;}e[i].valueResult=null;}this.getModel().setProperty("/entries",e);};j.prototype._modelCleanUpToInitial=function(){this.getModel().setProperty("/isDetailedEntryMode",false);this.getModel().setProperty("/dialogTitle",this.translationBundle.getText("userSettings"));};j.prototype._dialogSaveButtonHandler=function(){var t=this,i,e=this.getModel().getProperty("/entries"),s=U.saveUserPreferenceEntries(e);i=this.getModel().getProperty("/isDetailedEntryMode");if(i){this.getModel().setProperty("/activeEntryPath",null);}s.done(function(){t._showSaveMessageToast();});s.fail(function(k){var l,n="";if(k.length===1){l=t.translationBundle.getText("savingEntryError")+" ";}else{l=t.translationBundle.getText("savingEntriesError")+"\n";}k.forEach(function(o){l+=o.entry+"\n";n+="Entry: "+o.entry+" - Error message: "+o.message+"\n";});sap.ushell.Container.getServiceAsync("Message").then(function(M){M.error(l,t.translationBundle.getText("Error"));});L.error("Failed to save the following entries",n,"sap.ushell.ui.footerbar.UserPreferencesButton");});this.oDialog.close();this._destroyDialog();};j.prototype._dialogCancelButtonHandler=function(){var i,e=this.getModel().getProperty("/entries");for(i=0;i<e.length;i++){if(e[i]&&e[i].onCancel){e[i].onCancel();}}this.oDialog.close();this._destroyDialog();};j.prototype._addDialogBackButton=function(){var t=this,o=new a("userPrefBackBtn",{visible:"{/isDetailedEntryMode}",icon:I.getIconURI("nav-back"),press:t._dialogBackButtonHandler.bind(t),tooltip:this.translationBundle.getText("feedbackGoBackBtn_tooltip")}),e=new T("userPrefTitle",{text:"{/dialogTitle}"});this.oHeadBar=new B({contentLeft:[o],contentMiddle:[e]});this.oDialog.setCustomHeader(this.oHeadBar);};j.prototype._showSaveMessageToast=function(){var t=this;sap.ui.require(["sap/m/MessageToast"],function(M){var e=t.translationBundle.getText("savedChanges");M.show(e,{duration:3000,width:"15em",my:"center bottom",at:"center bottom",of:window,offset:"0 -50",collision:"fit fit"});});};return j;});
