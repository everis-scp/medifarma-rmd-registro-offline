/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	"./BaseController", "sap/ui/mdc/p13n/panels/ListView", "sap/ui/mdc/p13n/panels/SelectionPanel", "sap/m/Column"
], function (BaseController, ListView, SelectionPanel, Column) {
    "use strict";

    var oResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc");
    var ColumnController = BaseController.extend("sap.ui.mdc.p13n.subcontroller.ColumnController");

    ColumnController.prototype.getUISettings = function() {
        return {
            title: oResourceBundle.getText("table.SETTINGS_COLUMN"),
            tabText: oResourceBundle.getText("p13nDialog.TAB_Column")
        };
    };

    ColumnController.prototype.getResetEnabled = function() {
        return true;
    };

    ColumnController.prototype.model2State = function() {
        var aItems = [];
        this._oAdaptationModel.getProperty("/items").forEach(function(oItem){
            if (oItem.visible){
                aItems.push({
                    name: oItem.name
                });
            }
        });
        return aItems;
    };

    ColumnController.prototype.getAdaptationUI = function(oPropertyHelper){

        var oSelectionPanel = new ListView({
            enableReorder: true,
            showHeader: true,
            enableCount: true
        });

        oSelectionPanel.setPanelColumns([oResourceBundle.getText("fieldsui.COLUMNS"), new Column({
            width: "25%",
            hAlign: "Center",
            vAlign: "Middle"
        })]);

        var oAdaptationModel = this._getP13nModel(oPropertyHelper);
        oSelectionPanel.setP13nModel(oAdaptationModel);

        return Promise.resolve(oSelectionPanel);
    };

    ColumnController.prototype.getChangeOperations = function() {
        return {
            add: "addColumn",
            remove: "removeColumn",
            move: "moveColumn"
        };
    };

	return ColumnController;

});