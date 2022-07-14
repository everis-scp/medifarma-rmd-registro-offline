/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/core/Fragment"],function(B,F){"use strict";var J=B.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.jsonEditor.JsonEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.jsonEditor.JsonEditor",metadata:{library:"sap.ui.integration"},_onLiveChange:function(){var i=this.getContent();var j=this._parseJson(i.getValue());if(j instanceof Error){i.setValueState("Error");i.setValueStateText("Error: "+j);}else{i.setValueState("None");this.setValue(j);}},_parseJson:function(j){try{var p=JSON.parse(j);return p;}catch(e){return e;}},_openJsonEditor:function(){if(!this._oDialog){return F.load({name:"sap.ui.integration.designtime.baseEditor.propertyEditor.jsonEditor.JsonEditorDialog",controller:this}).then(function(d){this._oDialog=d;this._oErrorMsg=this._oDialog.getContent()[0];this._oEditor=this._oDialog.getContent()[1];this._oEditor.getInternalEditorInstance().getSession().on("changeAnnotation",this.onShowError.bind(this));this._oDialog.attachAfterOpen(function(){this._oEditor.getInternalEditorInstance().focus();this._oEditor.getInternalEditorInstance().navigateFileEnd();},this);this.addDependent(this._oDialog);this._openDialog();return this._oDialog;}.bind(this));}else{this._openDialog();return Promise.resolve(this._oDialog);}},_openDialog:function(){var i=this.getContent().getValue();try{var c=JSON.stringify(JSON.parse(i),0,"\t");this._oEditor.setValue(c);}catch(e){this._oEditor.setValue(i);}this._oDialog.open();},onClose:function(){this._oCode=null;this._oDialog.close();},onBeautify:function(){try{var b=JSON.stringify(JSON.parse(this._oEditor.getValue()),0,"\t");this._oEditor.setValue(b);}catch(e){}},onLiveChange:function(e){try{this._oCode=JSON.parse(e.getParameter("value"));this._oDialog.getBeginButton().setEnabled(true);}catch(a){this._oDialog.getBeginButton().setEnabled(false);}},onShowError:function(){var e=(this._oEditor.getInternalEditorInstance().getSession().getAnnotations()||[]).map(function(E){return"Line "+String(E.row)+": "+E.text;}).join("\n");this._oErrorMsg.setText(e);this._oErrorMsg.setVisible(!!e);},onSave:function(){var i=this.getContent();if(this._oCode){this.setValue(this._oCode);i.setValueState("None");i.setValue(JSON.stringify(this._oCode));}this._oDialog.close();},renderer:B.getMetadata().getRenderer().render});J.configMetadata=Object.assign({},B.configMetadata);return J;});
