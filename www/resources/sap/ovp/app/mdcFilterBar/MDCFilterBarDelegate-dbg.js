sap.ui.define([
    'sap/ui/mdc/FilterBarDelegate',
    "sap/ui/mdc/odata/v4/TypeUtil"
], function(FilterBarDelegate, TypeUtil) {
    'use strict';

    var MDCFilterBarDelegate = Object.assign({}, FilterBarDelegate);

    MDCFilterBarDelegate.fetchProperties = function(oFilterBar) {
        var oFilterModel = oFilterBar.getModel();
        var oFilterMetaModel = oFilterModel.getMetaModel();
        var sEntityName = "/" + oFilterBar.data("entityName").split(".").pop();
        var oEntityType = oFilterBar.data("entityType");
        var sODataVersion = oFilterBar.data("oDataVersion");
        if (oEntityType) {
            if (sODataVersion === "ODataV2") {
                return _fetchPropertiesForODataV2(oFilterMetaModel, sEntityName, oEntityType);
            } else if (sODataVersion === "ODataV4") {
                return  _fetchPropertiesForODataV4(oFilterMetaModel, sEntityName, oEntityType);
            }
        }
        return Promise.resolve([]);
    };

    function _fetchPropertiesForODataV2(oFilterMetaModel, sEntityName, oEntityType) {
        var aProperties = [];
        for (var i = 0; i < oEntityType.property.length; i++) {
            var aProperty = oEntityType.property[i];
            var name = aProperty["name"];
            var sLabel = aProperty["sap:label"] || 
                        (aProperty["com.sap.vocabularies.Common.v1.Label"] && aProperty["com.sap.vocabularies.Common.v1.Label"].String) ||
                         name;
            var oProperty = {
                name: name,
                label: sLabel,
                type: aProperty.type,
                typeConfig: TypeUtil.getTypeConfig(aProperty.type),
                required: false,
                visible: true
            };
            aProperties.push(oProperty);
        }
        return Promise.resolve(aProperties);
    }

    function _fetchPropertiesForODataV4(oFilterMetaModel, sEntityName, oEntityType) {
        var aProperties = [];
        for (var sKey in oEntityType) {
            var oObj = oEntityType[sKey];
            if (oObj && oObj.$kind === "Property") {
                var sLabel = oFilterMetaModel.getObject(sEntityName + "/" + sKey + "@com.sap.vocabularies.Common.v1.Label") || sKey;
                var oProperty = {
                    name: sKey,
                    label: sLabel,
                    type: oObj.$Type,
                    typeConfig: TypeUtil.getTypeConfig(oObj.$Type),
                    required: false,
                    visible: true
                };
                aProperties.push(oProperty);
            }
        }
        return Promise.resolve(aProperties);
    }

    return MDCFilterBarDelegate;
});