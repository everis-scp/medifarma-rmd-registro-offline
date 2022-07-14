/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/UIComponent","sap/ui/model/json/JSONModel","sap/suite/ui/generic/template/lib/reuseComponentHelper","sap/suite/ui/generic/template/genericUtilities/FeLogger"],function(U,J,r,F){"use strict";var l=new F("extensionAPI.ReuseComponentSupport").getLogger();var j="sap.suite.ui.generic.template.extensionAPI.ReuseComponentSupport";function h(c,u){if(!c.extensionAPI){return;}var d=c.component.getBindingContext();var D=d&&d.getPath();if(!u&&(!d||D===c.currentContextPath)){return;}c.currentContextPath=D;var M=c.component.getModel();var C=(c.firstTime&&c.component.stStart)||c.component.stRefresh;c.firstTime=false;if(C){C.call(c.component,M,d,c.extensionAPI);}}function m(c,C,t){var o={component:c,firstTime:true,currentContextPath:null};var H=h.bind(null,o);var R={pathUnchangedCallBack:H,component:c,leaveApp:c.stLeaveApp?c.stLeaveApp.bind(c):Function.prototype};o.proxy=R;var a=new Promise(function(f){R.fnExtensionAPIAvailable=f;r.embeddedComponentMixInto(c,R);});a.then(function(e){o.extensionAPI=e;H();});if(c.stRefresh||c.stStart){c.attachEvent("modelContextChange",H.bind(null,false));}if(C){var p=c.getMetadata().getProperties();var M={};for(var P in p){M[P]=c.getProperty(P);}var b=new J(M);c.setModel(b,C);var s=c.setProperty||Function.prototype;c.setProperty=function(n,v){s.apply(c,arguments);b.setProperty("/"+n,v);l.debug(c.getId()+":"+c.getMetadata().getName()+": setProperty "+n+"="+v,j);};c.getComponentModel=c.getComponentModel||function(){return b;};if(t){var u=function(d,B){var v=B.getValue();if(v!==c.getProperty(d)){s.call(c,d,v);}};for(P in p){var B=b.bindProperty("/"+P);B.attachChange(u.bind(null,P,B));}}}return a;}return{mixInto:function(c,C,t){if(!(c instanceof U)){throw new Error("FioriElements: extensionAPI.ResuseComponentSupport: Reuse component must be an instance of sap.ui.core.UIComponent");}return m(c,C,t);}};});
