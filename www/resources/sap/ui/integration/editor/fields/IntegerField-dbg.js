/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([
	"sap/ui/integration/editor/fields/BaseField",
	"sap/m/Input"
], function (
	BaseField, Input
) {
	"use strict";

	/**
	 * @class
	 * @extends sap.ui.integration.editor.fields.BaseField
	 * @alias sap.ui.integration.editor.fields.IntegerField
	 * @author SAP SE
	 * @since 1.83.0
	 * @version 1.96.9
	 * @private
	 * @experimental since 1.83.0
	 * @ui5-restricted
	 */
	var IntegerField = BaseField.extend("sap.ui.integration.editor.fields.IntegerField", {
		metadata: {
			library: "sap.ui.integration"
		},
		renderer: BaseField.getMetadata().getRenderer()
	});
	IntegerField.prototype.initVisualization = function (oConfig) {
		var oVisualization = oConfig.visualization;
		var oFormatter = oConfig.formatter;
		if (!oVisualization) {
			oVisualization = {
				type: Input,
				settings: {
					value: {
						path: 'currentSettings>value',
						type: 'sap.ui.model.type.Integer',
						formatOptions: oFormatter
					},
					editable: oConfig.editable,
					type: "Number"
				}
			};
		}
		this._visualization = oVisualization;
	};

	return IntegerField;
});