/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
// @ts-check
sap.ui.define([], function () {
    var module = {};
    // generic ESH UI Error, DON'T USE THAT but create your own more specific error!
    module.ESHUIError = function ESHUIError(properties) {
        if (typeof properties === "string") {
            this.message = properties;
        }
        if (properties) {
            if (properties.message) {
                this.message = properties.message;
            }
            if (properties.previous) {
                this.previous = properties.previous;
            }
        }
        this.name = "ESHUIError";
        this.stack = new Error().stack;
    };
    module.ESHUIConstructionError = function ESHUIConstructionError(previousError) {
        this.name = "ESHUIConstructionError";
        this.message = sap.esh.search.ui.resources.i18n.getText("error.ESHUIConstructionError.message");
        this.stack = new Error().stack;
        this.previous = previousError;
    };
    module.UnknownDataSourceType = function UnknownDataSourceType(previousError) {
        this.name = "UnknownDataSourceType";
        this.message = sap.esh.search.ui.resources.i18n.getText("error.UnknownDataSourceType.message");
        this.solution = sap.esh.search.ui.resources.i18n.getText("error.UnknownDataSourceType.solution");
        this.stack = new Error().stack;
        this.previous = previousError;
    };
    module.UnknownFacetType = function UnknownFacetType(previousError) {
        this.name = "UnknownFacetType";
        this.message = sap.esh.search.ui.resources.i18n.getText("error.UnknownFacetType.message");
        this.solution = sap.esh.search.ui.resources.i18n.getText("error.UnknownFacetType.solution");
        this.stack = new Error().stack;
        this.previous = previousError;
    };
    return module;
});
