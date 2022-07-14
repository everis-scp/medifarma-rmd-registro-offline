/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define([], function () {
    var Facet = function () {
        this.init.apply(this, arguments);
    };
    Facet.prototype = {
        init: function (properties) {
            this.title = properties.title;
            this.facetType = properties.facetType; //datasource or attribute
            this.dimension = properties.dimension;
            this.dataType = properties.dataType;
            this.matchingStrategy = properties.matchingStrategy;
            this.items = properties.items || [];
            this.totalCount = properties.totalCount;
            this.visible = properties.visible || true;
        },
        /**
         * Checks if the facet has the given filter condition
         * @param   {object}  filterCondition the condition to check for in this facet
         * @returns {Boolean} true if the filtercondition was found in this facet
         */
        hasFilterCondition: function (filterCondition) {
            for (var i = 0, len = this.items.length; i < len; i++) {
                var fc = this.items[i].filterCondition || this.items[i];
                if (fc.equals && fc.equals(filterCondition)) {
                    return true;
                }
            }
            return false;
        },
        /**
         * Checks if this facet has at least one filter condition
         * @returns {Boolean} true if it has at least one filter condition, false otherwise
         */
        hasFilterConditions: function () {
            for (var i = 0, len = this.items.length; i < len; i++) {
                if (this.items[i].filterCondition) {
                    return true;
                }
            }
            return false;
        },
        removeItem: function (facetItem) {
            for (var i = 0, len = this.items.length; i < len; i++) {
                var fc = this.items[i].filterCondition || this.items[i];
                if (fc.equals && facetItem.filterCondition && fc.equals(facetItem.filterCondition)) {
                    return this.items.splice(i, 1);
                }
            }
        },
    };
    return Facet;
});
