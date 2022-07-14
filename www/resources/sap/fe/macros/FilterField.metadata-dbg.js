/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

sap.ui.define(["./MacroMetadata"], function(MacroMetadata) {
	"use strict";

	/**
	 * @classdesc
	 * Building block for creating a FilterField based on the provided OData V4 metadata.
	 *
	 *
	 * Usage example:
	 * <pre>
	 * &lt;macro:FilterField
	 *   idPrefix="SomePrefix"
	 *   vhIdPrefix="SomeVhPrefix"
	 *   entitySet="{entitySet>}"
	 *   property="{entitySet>./@com.sap.vocabularies.UI.v1.SelectionFields/0/$PropertyPath}"
	 * /&gt;
	 * </pre>
	 *
	 * @class sap.fe.macros.FilterField
	 * @hideconstructor
	 * @private
	 * @experimental
	 */
	var FilterField = MacroMetadata.extend("sap.fe.macros.FilterField", {
		/**
		 * Name of the macro control.
		 */
		name: "FilterField",
		/**
		 * Namespace of the macro control.
		 */
		namespace: "sap.fe.macros",
		/**
		 * Fragment source of the macro (optional) - if not set, fragment is generated from namespace and name.
		 */
		fragment: "sap.fe.macros.FilterField",

		/**
		 * The metadata describing the macro control.
		 */
		metadata: {
			/**
			 * Macro stereotype for documentation generation. Not visible in documentation.
			 */
			stereotype: "xmlmacro",
			/**
			 * Location of the designtime information.
			 */
			designtime: "sap/fe/macros/FilterField.designtime",
			/**
			 * Properties.
			 */
			properties: {
				/**
				 * A prefix that is added to the generated ID of the filter field.
				 */
				idPrefix: {
					type: "string",
					defaultValue: "FilterField"
				},
				/**
				 * A prefix that is added to the generated ID of the value help used for the filter field.
				 */
				vhIdPrefix: {
					type: "string",
					defaultValue: "FilterFieldValueHelp"
				},
				/**
				 * Mandatory context to the EntityType
				 */
				entityType: {
					type: "sap.ui.model.Context",
					required: true,
					$kind: "EntityType"
				},
				/**
				 * Defines the metadata path to the property.
				 */
				property: {
					type: "sap.ui.model.Context",
					required: true,
					$kind: "Property"
				},
				/**
				 * Defines the metadata path to the value list.
				 */
				_valueList: {
					type: "sap.ui.model.Context",
					required: false
				},
				/**
				 * Specifies the Sematic Date Range option for the filter field.
				 */
				useSemanticDateRange: {
					type: "boolean",
					defaultValue: true
				},
				/**
				 * settings from the manifest settings.
				 */
				settings: {
					type: "string",
					defaultValue: ""
				},
				navigationPrefix: {
					type: "string"
				},
				/**
				 * visual filter settings for filter field
				 */
				visualFilter: {
					type: "sap.ui.model.Context"
				},
				_visualFilter: {
					type: "boolean"
				}
			},

			events: {}
		},
		create: function(oProps, oControlConfiguration, mSettings) {
			//TODO: We should ideally pass the visual filter context from the Filterbar Delegate which should re-template the field once it is added from adapt filters, but the field re-templating is not happening and we are by passing the same here by checking if the visual filter already exists. This needs to be re-looked at.
			if (!oProps.bHasVisualFilter) {
				oProps.bHasVisualFilter = oProps.visualFilter && oProps.visualFilter.getObject() ? true : false;
			}
			return oProps;
		}
	});

	return FilterField;
});
