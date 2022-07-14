/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["../SearchCompositeControl"],function(S){"use strict";return sap.ui.jsview("sap.esh.search.ui.flp.App",{createContent:function(){var m=sap.esh.search.ui.getModelSingleton({},"flp");return new S({model:m});},getControllerName:function(){return"sap.esh.search.ui.flp.App";},});});
