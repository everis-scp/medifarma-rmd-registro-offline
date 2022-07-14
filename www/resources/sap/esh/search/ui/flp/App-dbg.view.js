/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
/**
 * @fileOverview
 *
 * @version
 */
sap.ui.define(["../SearchCompositeControl"], function (SearchCompositeControl) {
    "use strict";
    return sap.ui.jsview("sap.esh.search.ui.flp.App", {
        createContent: function () {
            var model = sap.esh.search.ui.getModelSingleton({}, "flp");
            return new SearchCompositeControl({ model: model });
        },
        getControllerName: function () {
            return "sap.esh.search.ui.flp.App";
        },
    });
});
