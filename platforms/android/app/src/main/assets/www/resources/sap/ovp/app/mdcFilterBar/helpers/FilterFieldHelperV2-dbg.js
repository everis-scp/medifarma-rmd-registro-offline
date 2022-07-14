sap.ui.define([], function() {
    "use strict";

    function _getTypeFromPropertyPath(sPropertyPath, aProperties) {
        var sType;

        if (sPropertyPath && aProperties) {
            for (var i = 0; i < aProperties.length; i++) {
                var oProperty = aProperties[i];
                if (oProperty.name === sPropertyPath) {
                    sType = oProperty.type || "";
                    break;
                }
            }
        }
        return sType;
    }

    var formatter = {
        resolveFilterFieldLabel: function(oProperty, oEntityType) {
            var sPropertyPath = oProperty.PropertyPath || oProperty.Value.Path;
            var aProperties = oEntityType.property;
            var sLabel;
            
            if (sPropertyPath && aProperties) {
                for (var i = 0; i < aProperties.length; i++) {
                    var oProperty = aProperties[i];
                    if (oProperty.name === sPropertyPath) {
                        sLabel = oProperty["sap:label"];
                        break;
                    }
                }
            }
            return sLabel || sPropertyPath;
        },

        resolveFilterFieldConditions: function(oProperty, oEntityType) {
            var sPropertyPath = oProperty.PropertyPath || oProperty.Value.Path;
            return "{$filters>/conditions/" + sPropertyPath + "}";
        },

        resolveFilterFieldDataType: function(oProperty, oEntityType) {
            var sPropertyPath = oProperty.PropertyPath || oProperty.Value.Path;
            var aProperties = oEntityType.property;
            return _getTypeFromPropertyPath(sPropertyPath, aProperties);
        },

        resolveFilterRequired: function(oProperty) {
            return false;
        },

        getFilterFieldId: function(oProperty) {
            var sPropertyPath = oProperty.PropertyPath || oProperty.Value.Path;
            return "ovpGlobalMDCFilter-" + sPropertyPath;
        },

        getContextPath: function(oValue, oInterface) {
            return oInterface && oInterface.context && oInterface.context.getPath();
        },

        getFilterFieldHelpId: function(oProperty) {
            var sPropertyPath = oProperty.PropertyPath || oProperty.Value.Path;
            return 'ovpGlobalMDCFilter-' + sPropertyPath + "-FH";
        },

        resolveFilterMaxConditions: function(oProperty, oEntityType) {
            var sPropertyPath = oProperty.PropertyPath || oProperty.Value.Path;
            var aProperties = oEntityType.property;
            var sType = _getTypeFromPropertyPath(sPropertyPath, aProperties);
            return (sType === 'Edm.Boolean') ? 1 : undefined;
        }
    };
   
    return formatter;
});