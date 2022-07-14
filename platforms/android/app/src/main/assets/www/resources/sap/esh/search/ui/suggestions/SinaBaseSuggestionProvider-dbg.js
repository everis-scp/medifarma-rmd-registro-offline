/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/suggestions/SuggestionProvider", "sap/esh/search/ui/suggestions/SuggestionType"], function (SuggestionProvider, SuggestionType) {
    "use strict";
    // =======================================================================
    // base class for ina based suggestion providers
    // =======================================================================
    var module = function () {
        this.init.apply(this, arguments);
    };
    module.prototype = jQuery.extend(new SuggestionProvider(), {
        // init
        // ===================================================================
        init: function () {
            // call super constructor
            SuggestionProvider.prototype.init.apply(this, arguments);
        },
        // prepare suggestions query
        // ===================================================================
        prepareSuggestionQuery: function (filter) {
            var that = this;
            that.suggestionQuery.resetResultSet();
            that.suggestionQuery.setFilter(filter);
            var sinaSuggestionTypes = that.assembleSinaSuggestionTypesAndCalcModes();
            that.suggestionQuery.setTypes(sinaSuggestionTypes.types);
            that.suggestionQuery.setCalculationModes(sinaSuggestionTypes.calculationModes);
            that.suggestionQuery.setTop(20);
        },
        // assemble suggestion types and calculation modes
        // ===================================================================
        assembleSinaSuggestionTypesAndCalcModes: function () {
            var append = function (list, element) {
                if (list.indexOf(element) >= 0) {
                    return;
                }
                list.push(element);
            };
            var result = {
                types: [],
                calculationModes: [],
            };
            for (var i = 0; i < this.suggestionTypes.length; ++i) {
                var suggestionType = this.suggestionTypes[i];
                switch (suggestionType) {
                    case SuggestionType.SearchTermHistory:
                        append(result.types, this.sinaNext.SuggestionType.SearchTerm);
                        append(result.calculationModes, this.sinaNext.SuggestionCalculationMode.History);
                        break;
                    case SuggestionType.SearchTermData:
                        append(result.types, this.sinaNext.SuggestionType.SearchTerm);
                        append(result.calculationModes, this.sinaNext.SuggestionCalculationMode.Data);
                        break;
                    case SuggestionType.DataSource:
                        append(result.types, this.sinaNext.SuggestionType.DataSource);
                        append(result.calculationModes, this.sinaNext.SuggestionCalculationMode.Data);
                        break;
                    case SuggestionType.Object:
                        append(result.types, this.sinaNext.SuggestionType.Object);
                        append(result.calculationModes, this.sinaNext.SuggestionCalculationMode.Data);
                        break;
                }
            }
            return result;
        },
    });
    return module;
});
