/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
/* global */
sap.ui.define([
    "sap/esh/search/ui/personalization/FLPPersonalizationStorage",
    "sap/esh/search/ui/personalization/BrowserPersonalizationStorage",
    "sap/esh/search/ui/personalization/MemoryPersonalizationStorage",
    "sap/esh/search/ui/SearchConfiguration",
], function (FLPPersonalizationStorage, BrowserPersonalizationStorage, MemoryPersonalizationStorage) {
    "use strict";
    // =======================================================================
    // personalization storage
    // =======================================================================
    var PersonalizationStorage = {
        instance: null,
        isLaunchpad: function () {
            try {
                return !!sap.ushell.Container.getService("Personalization");
            }
            catch (e) {
                return false;
            }
        },
        create: function (personalizationStorage) {
            switch (personalizationStorage) {
                case "auto":
                    if (this.isLaunchpad()) {
                        return FLPPersonalizationStorage.create();
                    }
                    else {
                        return BrowserPersonalizationStorage.create();
                    }
                case "browser":
                    return BrowserPersonalizationStorage.create();
                case "flp":
                    return FLPPersonalizationStorage.create();
                case "memory":
                    return MemoryPersonalizationStorage.create();
                default:
                // nix
            }
        },
    };
    return PersonalizationStorage;
});
