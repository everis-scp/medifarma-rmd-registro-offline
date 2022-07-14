sap.ui.define([], function() {
    "use strict";

    var formatter = {
        resolveFilterFieldLabel: function(oProperty) { 
            var sPropertyPath = oProperty.$PropertyPath || oProperty.Value.$Path;
            var sLabel = oProperty.Label;
            return sLabel || sPropertyPath;
        },

        resolveFilterFieldConditions: function(oProperty) {
            var sPropertyPath = oProperty.$PropertyPath || oProperty.Value.$Path;
            return "{$filters>/conditions/" + sPropertyPath + "}";
        },

        resolveFilterFieldDataType: function(oProperty, oEntityType) {
            var sPropertyPath = oProperty.$PropertyPath || oProperty.Value.$Path;
            var oPropertyValue = oEntityType[sPropertyPath];
            if (oPropertyValue.$kind === "Property") {
                return oProperty.$Type;
            }
        },

        resolveFilterRequired: function(oProperty) {
            return false;
        },

        getContextPath: function(oValue, oInterface) {
            return oInterface && oInterface.context && oInterface.context.getPath();
        },

        getFilterFieldHelpId: function(oProperty) {
            var sPropertyPath = oProperty.$PropertyPath || oProperty.Value.$Path;
            return 'ovpGlobalMDCFilter-' + sPropertyPath + "-FH";
        },

        resolveFilterMaxConditions: function(oProperty, oEntityType) {
            var sPropertyPath = oProperty.$PropertyPath || oProperty.Value.$Path;
            var oProperty = oEntityType[sPropertyPath];
            var sType = oProperty.$Type;
            return (sType === 'Edm.Boolean') ? 1 : undefined;
        }
    };
   
    return formatter;
});