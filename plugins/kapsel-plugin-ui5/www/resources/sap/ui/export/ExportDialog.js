/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/library','sap/m/library','sap/m/Dialog','sap/m/Button','sap/m/ProgressIndicator','sap/m/Text','sap/m/MessageBox'],function(c,M,D,B,P,T,a){'use strict';var V=c.ValueState;var b=M.DialogType;var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.export",true);function d(){return new Promise(function(R,f){var g;r.then(function(o){var h=new B({text:o.getText("CANCEL_BUTTON"),press:function(){if(g&&g.oncancel){g.oncancel();}g.finish();}});var p=new P({showValue:false,height:"0.75rem"});p.addStyleClass("sapUiMediumMarginTop");var m=new T({text:o.getText("PROGRESS_FETCHING_MSG")});g=new D({title:o.getText("PROGRESS_TITLE"),type:b.Message,contentWidth:"500px",content:[m,p],endButton:h,ariaLabelledBy:[m]});g.updateStatus=function(n){if(n>=100){h.setEnabled(false);m.setText(o.getText("PROGRESS_BUNDLE_MSG"));}p.setPercentValue(n);};g.finish=function(){g.close();g.destroy();};R(g);});});}function s(p){return new Promise(function(R,f){r.then(function(o){var C,w,W,g;C=false;g=p.rows?o.getText("SIZE_WARNING_MSG",[p.rows,p.columns]):o.getText("NO_COUNT_WARNING_MSG");W=new T({text:g});w=new D({title:o.getText('PROGRESS_TITLE'),type:b.Message,state:V.Warning,content:W,ariaLabelledBy:W,beginButton:new B({text:o.getText("CANCEL_BUTTON"),press:function(){w.close();}}),endButton:new B({text:o.getText("EXPORT_BUTTON"),press:function(){C=true;w.close();}}),afterClose:function(){w.destroy();C?R():f();}});w.open();});});}function e(m){r.then(function(R){var f=m||R.getText('PROGRESS_ERROR_DEFAULT');a.error(R.getText("PROGRESS_ERROR_MSG")+"\n"+f,{title:R.getText("PROGRESS_ERROR_TITLE")});});}return{getProgressDialog:d,showErrorMessage:e,showWarningDialog:s};},true);