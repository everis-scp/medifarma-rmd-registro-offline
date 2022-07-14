/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

sap.ui.define([
	'./BaseController', 'sap/ui/mdc/p13n/P13nBuilder', 'sap/ui/mdc/p13n/panels/SortPanel', 'sap/ui/mdc/p13n/panels/SortQueryPanel'
], function (BaseController, P13nBuilder, SortPanel, SortQueryPanel) {
	"use strict";

    var SortController = BaseController.extend("sap.ui.mdc.p13n.subcontroller.SortController");

    SortController.prototype.getCurrentState = function() {
        return this.getAdaptationControl().getCurrentState().sorters;
    };

    SortController.prototype.getResetEnabled = function() {
        return true;
    };

    SortController.prototype.getUISettings = function() {
        return {
            tabText: sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("p13nDialog.TAB_Sort"),
            title: sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("sort.PERSONALIZATION_DIALOG_TITLE")
        };
    };

    SortController.prototype.getDelta = function(mPropertyBag) {
        mPropertyBag.deltaAttributes.push("descending");
        return BaseController.prototype.getDelta.apply(this, arguments);
    };

    SortController.prototype.getAdaptationUI = function(oPropertyHelper){

        var oAdaptationControl = this.getAdaptationControl();
        var oSortPanel;

        //TODO: remove this condition once 'ChartNew' migration has been merged
        if (oAdaptationControl.isA("sap.ui.mdc.Chart") && !oAdaptationControl._bNewP13n) {
            oSortPanel = new SortPanel();
        } else {
            oSortPanel = new SortQueryPanel();
        }

        this._oPanel = oSortPanel;
        var oAdaptationModel = this._getP13nModel(oPropertyHelper);
        oSortPanel.setP13nModel(oAdaptationModel);

        return Promise.resolve(oSortPanel);
    };

    SortController.prototype.update = function(){
        BaseController.prototype.update.apply(this, arguments);
        this._oPanel.setP13nModel(this._oAdaptationModel);
    };

    SortController.prototype.model2State = function() {
        var aItems = [];
        this._oAdaptationModel.getProperty("/items").forEach(function(oItem){
            if (oItem.sorted){
                aItems.push({
                    name: oItem.name
                });
            }
        });
        return aItems;
    };

    SortController.prototype.getChangeOperations = function() {
        return {
            add: "addSort",
            remove: "removeSort",
            move: "moveSort"
        };
    };

    SortController.prototype._getPresenceAttribute = function(bexternalAppliance){
        return "sorted";
    };

    SortController.prototype.mixInfoAndState = function(oPropertyHelper) {

        var aItemState = this.getCurrentState();
        var mExistingSorters = P13nBuilder.arrayToMap(aItemState);

        var oP13nData = P13nBuilder.prepareAdaptationData(oPropertyHelper, function(mItem, oProperty){

            var oExistingSorter = mExistingSorters[oProperty.name];

            mItem.sorted = oExistingSorter ? true : false;
            mItem.sortPosition = oExistingSorter ? oExistingSorter.position : -1;
            mItem.descending = oExistingSorter ? !!oExistingSorter.descending : false;

            return !(oProperty.sortable === false);
        });

        P13nBuilder.sortP13nData({
            visible: "sorted",
            position: "sortPosition"
        }, oP13nData.items);

        oP13nData.presenceAttribute = this._getPresenceAttribute();

        oP13nData.items.forEach(function(oItem){delete oItem.sortPosition;});

        return oP13nData;
    };

	return SortController;

});
