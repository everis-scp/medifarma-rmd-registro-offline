// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
/**
 * @fileOverview handle all the services for the different applications.
 * @version 1.93.6
 */
sap.ui.define([], function () {
    "use strict";

    function RelatedServices () {
        //handle the history service
        var bDefaultBrowserBack = false,
            fnCustomBackNavigation,
            bBackNavigation = false;

        this.resetBackNavigationFlag = function () {
            bBackNavigation = false;
        };

        sap.ui.getCore().getEventBus().subscribe("relatedServices", "resetBackNavigation", this.resetBackNavigationFlag, this);

        this._defaultBackNavigation = function () {
            window.history.back();
        };

        sap.ui.getCore().getEventBus().subscribe("relatedServices", "resetBackNavigation", this.resetBackNavigationFlag, this);

        this.isBackNavigation = function () {
            return bBackNavigation;
        };

        this.navigateBack = function () {
            bBackNavigation = true;
            if (bDefaultBrowserBack === true) {
                this._defaultBackNavigation();
            } else if (fnCustomBackNavigation) {
                fnCustomBackNavigation();
            } else {
                if (sap.ushell.Container.getService("CrossApplicationNavigation").isInitialNavigation()) {
                    // go back home
                    sap.ushell.Container.getService("CrossApplicationNavigation").toExternal({ target: { shellHash: "#" }, writeHistory: false });
                    return;
                }
                this._defaultBackNavigation();
            }
        };

        this.setNavigateBack = function (inFnBKImp) {
            bDefaultBrowserBack = false;
            fnCustomBackNavigation = inFnBKImp;
        };

        this.resetNavigateBack = function () {
            bDefaultBrowserBack = true;
            fnCustomBackNavigation = undefined;
        };

        this.restore = function (oInServices) {
            bDefaultBrowserBack = oInServices.bDefaultBrowserBack;
            fnCustomBackNavigation = oInServices.fnCustomBackNavigation;
        };

        this.store = function (oServices) {
            oServices.bDefaultBrowserBack = bDefaultBrowserBack;
            oServices.fnCustomBackNavigation = fnCustomBackNavigation;
        };
    }

    return new RelatedServices();
}, /* bExport= */ true);
