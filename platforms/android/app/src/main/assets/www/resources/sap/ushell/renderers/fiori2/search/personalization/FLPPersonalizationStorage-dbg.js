// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
/* global */

sap.ui.define([
    'sap/ushell/renderers/fiori2/search/personalization/Personalizer',
    'sap/ushell/renderers/fiori2/search/SearchHelper',
    'sap/ui/util/Storage'
], function (Personalizer, SearchHelper, Storage) {
    "use strict";

    // =======================================================================
    // flp personalization storage
    // =======================================================================
    var module = function () {
        this.init.apply(this, arguments);
    };
    var FLPPersonalizationStorage = module;

    module.prototype = {

        init: function (container) {
            this.container = container;
            this.save = SearchHelper.delayedExecution(this.save, 2000);
        },

        save: function () {
            this.container.save();
        },

        getItem: function (key) {
            key = this.limitLength(key);
            if (!this._isStorageSupported()) {
                throw 'not supported storage';
            }
            return this.container.getItemValue(key);
        },

        setItem: function (key, data) {
            key = this.limitLength(key);
            if (!this._isStorageSupported()) {
                throw 'not supported storage';
            }
            this.container.setItemValue(key, data);
            this.save();
        },

        limitLength: function (key) {
            return key.slice(-40);
        },

        getPersonalizer: function (key) {
            return new Personalizer(key, this);
        },

        _isStorageSupported: function () {
            if (Storage.isSupported()) {
                return true;
            }
            return false;

        }

    };

    module.getInstance = function () {
        var personalizationService = sap.ushell.Container.getService("Personalization");
        return personalizationService.getContainer("ushellSearchPersoServiceContainer").then(function (container) {
            return new FLPPersonalizationStorage(container);
        });
    };

    return module;
});
