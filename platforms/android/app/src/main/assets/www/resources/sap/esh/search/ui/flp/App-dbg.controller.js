/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/m/MessageToast", "sap/esh/search/ui/SearchShellHelper"], 
/**
 * Search App for Fiori Launchpad
 */
function (MessageToast, SearchShellHelper) {
    "use strict";
    return sap.ui.controller("sap.esh.search.ui.flp.App", {
        onInit: function () {
            this.oShellNavigation = sap.ushell.Container.getService("ShellNavigation");
            this.oShellNavigation.hashChanger.attachEvent("hashChanged", this.hashChanged);
            if (SearchShellHelper.oSearchFieldGroup === undefined) {
                SearchShellHelper.init();
            }
            SearchShellHelper.setSearchState("EXP_S");
        },
        hashChanged: function () {
            var model = sap.esh.search.ui.getModelSingleton({}, "flp");
            model.parseURL();
        },
        onExit: function () {
            this.oShellNavigation.hashChanger.detachEvent("hashChanged", this.hashChanged);
            // destroy TablePersoDialog when exit search app to avoid to create same-id-TablePersoDialog triggered by oTablePersoController.active() in SearchCompositeControl.js
            var searchResultsViewId = document.querySelectorAll('[id$="-searchContainerResultsView"]')[0]
                .id; // ToDo: ID --> always matches first instance of search control
            if (sap.ui.getCore().byId(searchResultsViewId) &&
                sap.ui.getCore().byId(searchResultsViewId).oTablePersoController &&
                sap.ui.getCore().byId(searchResultsViewId).oTablePersoController.getTablePersoDialog()) {
                sap.ui
                    .getCore()
                    .byId(searchResultsViewId)
                    .oTablePersoController.getTablePersoDialog()
                    .destroy();
            }
            if (SearchShellHelper.getDefaultOpen() !== true) {
                SearchShellHelper.setSearchStateSync("COL");
            }
            else {
                SearchShellHelper.setSearchState("EXP");
            }
            if (this.oView.getContent()[0].oSearchPage.oFacetDialog) {
                this.oView.getContent()[0].oSearchPage.oFacetDialog.destroy();
            }
        },
    });
});
