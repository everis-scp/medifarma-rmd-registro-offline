/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/UIComponent","../i18n"],function(U){"use strict";return U.extend("sap.esh.search.ui.flp.Component",{metadata:{version:"1.93.3",library:"sap.esh.search.ui.flp",includes:[],dependencies:{libs:["sap.m"],components:[],},config:{title:sap.esh.search.ui.resources.i18n.getText("searchAppTitle"),compactContentDensity:true,cozyContentDensity:true,},},createContent:function(){return sap.ui.view({id:"searchContainerApp",viewName:"sap.esh.search.ui.flp.App",type:sap.ui.core.mvc.ViewType.JS,});},});});
