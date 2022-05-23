// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/applications/PageComposer/controller/BaseController","sap/ushell/applications/PageComposer/controller/Page","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/base/Log","sap/base/strings/formatMessage"],function(B,P,J,M,L,f){"use strict";return B.extend("sap.ushell.applications.PageComposer.controller.PageDetail",{onInit:function(){var r=this.getRouter();r.getRoute("detail").attachPatternMatched(this._onPageMatched,this);this.oCopyDialogModel=new J({page:null,approvalText:""});this.setModel(new J({page:{},editMode:false}));this.Page.init(this);},onExit:function(){this.Page.exit();},mCatalogTiles:{},Page:P,formatMessage:f,_onPageMatched:function(e){var p=e.getParameter("arguments").pageId;this._loadPage(decodeURIComponent(p)).then(function(o){this.getModel().setProperty("/page",o);this.Page.init(this);this._fetchCatalogInfo().then(function(c){this.mCatalogTiles=c.mCatalogTiles;this.getModel().updateBindings(true);}.bind(this));}.bind(this),function(E){this.showMessageBoxError(E,true);}.bind(this));},_loadPage:function(p){return this.getPageRepository().getPage(p);},_navigateToEdit:function(p){this.getRouter().navTo("edit",{pageId:encodeURIComponent(p)});},onDeleteCancel:function(){var d=this.byId("deleteDialog");d.close();},_deletePage:function(e){var d=e.getSource().getParent();var t=e.metadata&&e.metadata.transportId||"";var p=this.getModel().getProperty("/page/content/id");var s=this.getResourceBundle().getText("Message.SuccessDeletePage");return this.getPageRepository().deletePage(p,t).then(function(){this.navigateToPageOverview();M.show(s,{closeOnBrowserNavigation:false});d.close();}.bind(this)).catch(this.handleBackendError.bind(this));},_copyPage:function(){},onEdit:function(){this._navigateToEdit(this.getModel().getProperty("/page/content/id"));},onDelete:function(){var p=this.getModel().getProperty("/page");this.checkShowDeleteDialog(p,this._deletePage.bind(this));},onCopy:function(){var p=this.getModel().getProperty("/page");var a=this.getResourceBundle().getText("CopyDialog.Message",[p.content.id,p.content.title]);this.oCopyDialogModel.setProperty("/page",p);this.oCopyDialogModel.setProperty("/approvalText",a);this.getOwnerComponent().showCopyDialog(this.oCopyDialogModel,this._copyPage.bind(this));},_fetchCatalogInfo:function(){return sap.ushell.Container.getServiceAsync("LaunchPage").then(function(l){return l.getCatalogs().then(function(c){var C=c.map(function(o){var s=l.getCatalogId(o)||"";return l.getCatalogTitle(o)||s.split(":").slice(1).join(":");});return Promise.all(c.map(function(o){return l.getCatalogTiles(o);})).then(function(a){var v={};for(var i=0;i<a.length;i++){for(var j=0;j<a[i].length;j++){v[l.getCatalogTileId(a[i][j])]=a[i][j];}}return{catalogTitles:C,catalogTiles:a,mCatalogTiles:v};});});});}});});