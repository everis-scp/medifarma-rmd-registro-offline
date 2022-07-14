/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/SearchHelper", "sap/m/Button", "sap/ui/core/IconPool"], function (SearchHelper, Button, IconPool) {
    "use strict";
    Button.extend("sap.esh.search.ui.controls.SearchButton", {
        constructor: function (sId, options) {
            options = jQuery.extend({}, {
                icon: IconPool.getIconURI("search"),
                tooltip: sap.esh.search.ui.resources.i18n.getText("search"),
                enabled: {
                    parts: [
                        {
                            path: "/initializingObjSearch",
                        },
                    ],
                    formatter: function (initializingObjSearch) {
                        return !SearchHelper.isSearchAppActive() || !initializingObjSearch;
                    },
                },
            }, options);
            Button.prototype.constructor.apply(this, [sId, options]);
            this.addStyleClass("searchBtn");
        },
        renderer: "sap.m.ButtonRenderer",
    });
});
