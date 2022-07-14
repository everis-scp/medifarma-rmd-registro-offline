/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/library','sap/fe/placeholder/library'],function(l,p){"use strict";sap.ui.getCore().initLibrary({name:"sap.suite.ui.generic.template",dependencies:["sap.ui.core","sap.fe.placeholder"],designtime:"sap/suite/ui/generic/template/designtime/library.designtime",types:[],interfaces:[],controls:[],elements:[],version:"1.93.4",extensions:{"sap.ui.support":{publicRules:true,internalRules:false,diagnosticPlugins:["sap/suite/ui/generic/template/support/DiagnosticsTool/DiagnosticsTool"]},flChangeHandlers:{"sap.m.Button":{"addToolbarActionButton":"sap/suite/ui/generic/template/changeHandler/AddToolbarActionButton","addHeaderActionButton":"sap/suite/ui/generic/template/changeHandler/AddHeaderActionButton","addFooterActionButton":"sap/suite/ui/generic/template/changeHandler/AddFooterActionButton"},"sap.m.OverflowToolbar":{"addToolbarActionButton":"sap/suite/ui/generic/template/changeHandler/AddToolbarActionButton","addFooterActionButton":"sap/suite/ui/generic/template/changeHandler/AddFooterActionButton"},"sap.uxap.ObjectPageHeader":{"addHeaderActionButton":"sap/suite/ui/generic/template/changeHandler/AddHeaderActionButton"},"sap.uxap.ObjectPageHeaderActionButton":{"addHeaderActionButton":"sap/suite/ui/generic/template/changeHandler/AddHeaderActionButton"},"sap.uxap.ObjectPageDynamicHeaderTitle":{"addHeaderActionButton":"sap/suite/ui/generic/template/changeHandler/AddHeaderActionButton"}}}});sap.suite.ui.generic.template.displayMode={undefined:"undefined",display:"display",edit:"edit",create:"create"};return sap.suite.ui.generic.template;},false);
