// Copyright (c) 2009-2020 SAP SE, All Rights Reserved

sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
    "use strict";

    return Controller.extend(
        "sap.ushell.components.shell.Settings.search.Search",
        {
            onInit: function () {
                this._loadContent();
            },

            _loadContent: function () {
                var oVBox = this.getView().byId("searchContent");

                var searchView = sap.ui.view({
                    id: "searchPrefsDialogView",
                    type: sap.ui.core.mvc.ViewType.JS,
                    viewName: "sap.esh.search.ui.userpref.SearchPrefsDialog"
                });
                oVBox.addItem(searchView);
                return searchView;
            },

            onCancel: function () {
                this.oView.getModel().cancelPreferences();
            },

            onSave: function () {
                return this.oView.getModel().savePreferences();
            }
        }
    );
});
