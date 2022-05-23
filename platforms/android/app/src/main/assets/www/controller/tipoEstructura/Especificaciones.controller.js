sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/MessageToast",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    'sap/ui/export/Spreadsheet',
    'sap/ui/export/library',
    '../../services/Service',
    "sap/ui/model/json/JSONModel",
    "mif/rmd/configuracion/utils/util",
    "../../libs/xlsx.full.min",
    "mif/rmd/configuracion/utils/formatter"
],
    function (Controller, MessageBox, MessageToast, Filter, FilterOperator, FilterType, Spreadsheet, exportLibrary, Service, JSONModel, util, xlsx, formatter) {
        "use strict";
        const rootPath = "mif.rmd.registro";
        let oThat;
        return {

            onAfterRendering: function (aThat) {
                oThat = aThat;
                oThatCuadro = this;
            }
        };
    },
);