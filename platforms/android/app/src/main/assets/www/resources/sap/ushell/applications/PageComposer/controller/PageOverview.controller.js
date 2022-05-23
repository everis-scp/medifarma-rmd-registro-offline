//Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/applications/PageComposer/controller/BaseController","sap/base/Log","sap/m/MessageToast","sap/ui/model/json/JSONModel","sap/ui/model/Filter","sap/ui/model/FilterOperator"],function(B,L,M,J,F,a){"use strict";return B.extend("sap.ushell.applications.PageComposer.controller.Main",{aPropertiesToFilter:["id","title","description","createdBy","modifiedBy","BusinessRoleId","BusinessRole"],oDialogFactory:null,onInit:function(){this.setModel(new J({busy:false,pages:[]}));this.getRouter().getRoute("overview").attachPatternMatched(this._onPageOverviewMatched,this);this.setModel(this._createInitialButtonStateModel(),"buttonStates");},onItemPress:function(e){var p=e.getParameter("listItem").getBindingContext().getObject();this._navigateToDetail(p.content.id);},_onPageOverviewMatched:function(){this._refreshModel();},_navigateToEdit:function(p){this.getRouter().navTo("edit",{pageId:encodeURIComponent(p)});},_navigateToDetail:function(p){this.getRouter().navTo("detail",{pageId:encodeURIComponent(p)});},onSelectionChange:function(e){this._setDeleteButtonEnabled(true);},onEdit:function(e){var p=e.getSource().getBindingContext().getObject();this._navigateToEdit(p.content.id);},onAdd:function(){this.showCreateDialog(function(p){sap.ushell.Container.getServiceAsync("PageReferencing").then(function(P){return P.createReferencePage(p,[]);}).then(function(r){return this.getPageRepository().createPage(r);}.bind(this)).then(function(){this._navigateToEdit(p.content.id);M.show(this.getResourceBundle().getText("Message.PageCreated"),{closeOnBrowserNavigation:false});}.bind(this)).catch(this.handleBackendError.bind(this));}.bind(this));},_deletePage:function(e){var d=e.getSource().getParent();var t=e.metadata&&e.metadata.transportId||"";var T=this.byId("table");var i=T.getSelectedItems().map(function(b){return b.getBindingContext().getObject();});var s=this.getResourceBundle().getText("Message.SuccessDeletePage");var D=i.map(function(I){return this.getPageRepository().deletePage(I.content.id,t);}.bind(this));return Promise.all(D).then(function(){return this._refreshModel();}.bind(this)).then(function(){T.fireSelectionChange();M.show(s,{closeOnBrowserNavigation:false});d.close();}).catch(this.handleBackendError.bind(this));},onDelete:function(){var t=this.byId("table");var s=t.getSelectedItem();if(!s){return;}this.checkShowDeleteDialog(s.getBindingContext().getObject(),this._deletePage.bind(this));},onSearch:function(e){var t=this.byId("table");var b=t.getBinding("items");var s=e.getSource().getValue();var f=this.aPropertiesToFilter.map(function(p){return new F({path:"content/"+p,operator:a.Contains,value1:s});});var o=new F({filters:f,and:false});b.filter([o]);},_refreshModel:function(){this.getModel().setProperty("/busy",true);return this._loadAvailablePages().then(function(p){this.getModel().setSizeLimit(p.pages.length);this.getModel().setProperty("/pages",p.pages);this.getModel().setProperty("/busy",false);}.bind(this),function(e){this.getModel().setProperty("/busy",false);this.showMessageBoxError(e);}.bind(this));},onTableUpdate:function(){var t=this.byId("table"),m=this.getView().getModel("buttonStates");if(t.getSelectedItems().length===0&&m.getProperty("/isDeleteEnabled")){t.removeSelections(true);this._setDeleteButtonEnabled(false);}},_loadAvailablePages:function(){return this.getPageRepository().getPages().then(function(p){return{pages:p};});},_createInitialButtonStateModel:function(){return new J({isDeleteEnabled:false});},_setDeleteButtonEnabled:function(e){this.getView().getModel("buttonStates").setProperty("/isDeleteEnabled",e);}});});