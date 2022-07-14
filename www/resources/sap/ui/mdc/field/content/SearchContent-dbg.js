/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/mdc/field/content/DefaultContent",
	"sap/ui/model/BindingMode"
], function(DefaultContent, BindingMode) {
	"use strict";

	/**
	 * Object-based definition of the search content type that is used in the {@link sap.ui.mdc.field.content.ContentFactory}.
	 * This defines which controls to load and create for a given {@link sap.ui.mdc.enum.ContentMode}.
	 * @author SAP SE
	 * @private
	 * @ui5-restricted sap.ui.mdc
	 * @experimental As of version 1.87
	 * @since 1.87
	 * @alias sap.ui.mdc.field.content.SearchContent
	 * @extends sap.ui.mdc.field.content.DefaultContent
	 * @MDC_PUBLIC_CANDIDATE
	 */
	var SearchContent = Object.assign({}, DefaultContent, {
		getEdit: function() {
			return ["sap/m/SearchField"];
		},
		getEditMulti: function() {
			return [null];
		},
		getEditMultiLine: function() {
			return [null];
		},
		getUseDefaultEnterHandler: function() {
			return false;
		},
		getUseDefaultFieldHelp: function() {
			return false;
		},
		createEdit: function(oContentFactory, aControlClasses, sId) {
			var SearchField = aControlClasses[0];
			var oConditionsType = oContentFactory.getConditionsType();
			oContentFactory.setHideOperator(true);
			oContentFactory.updateConditionType(); // to update HideOperator

			var oControl = new SearchField(sId, {
				value: { path: "$field>/conditions", type: oConditionsType, mode: BindingMode.OneWay }, // oneWay as SearchField updates "value" while typing
				placeholder: "{$field>/placeholder}",
				width: "100%",
				tooltip: "{$field>/tooltip}",
				search: oContentFactory.getHandleEnter(), // submit event should be fired on Enter and Search-button
				change: oContentFactory.getHandleContentChange(),
				liveChange: oContentFactory.getHandleContentLiveChange()
			});

			oContentFactory.setAriaLabelledBy(oControl);
			oContentFactory.setBoundProperty("value");

			return [oControl];
		},
		createEditMulti: function() {
			throw new Error("sap.ui.mdc.field.content.SearchContent - createEditMulti not defined!");
		},
		createEditMultiLine: function() {
			throw new Error("sap.ui.mdc.field.content.SearchContent - createEditMultiLine not defined!");
		}
	});

	return SearchContent;
});