// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/strings/formatMessage","sap/ushell/applications/PageComposer/controller/BaseController","sap/ui/core/Fragment","sap/ushell/applications/PageComposer/i18n/resources"],function(f,B,F,r){"use strict";return B.extend("sap.ushell.applications.PageComposer.controller.BaseDialog.controller",{destroy:function(){if(this._oView.byId(this.sViewId)){this._oView.byId(this.sViewId).destroy();}},onCancel:function(){this._oView.byId(this.sViewId).close();if(this._fnCancel){this._fnCancel();}},attachConfirm:function(c){this._fnConfirm=c;},onConfirm:function(e){if(this._fnConfirm){this._fnConfirm(e);}},getModel:function(){return this._oModel;},validate:function(v){for(var i in v){if(!v[i]){return false;}}return true;},attachCancel:function(c){this._fnCancel=c;},transportExtensionPoint:function(c){this._oView.byId("transportContainer").setComponent(c);},load:function(){var o={id:this._oView.getId(),name:this.sId,controller:this};return F.load(o).then(function(a){a.setModel(this._oModel);a.setModel(r.i18nModel,"i18n");}.bind(this));},open:function(){var d=this._oView.byId(this.sViewId);this._oView.addDependent(d);d.open();}});});
