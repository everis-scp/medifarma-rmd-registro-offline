/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/macros/MacroMetadata", "sap/fe/core/helpers/BindingExpression"], function (MacroMetadata, BindingExpression) {
  "use strict";

  var compileBinding = BindingExpression.compileBinding;
  var resolveBindingString = BindingExpression.resolveBindingString;
  var equal = BindingExpression.equal;
  var ifElse = BindingExpression.ifElse;

  /**
   * @class A form element containing a label and a field
   *
   * @hideconstructor
   * @name sap.fe.macros.FormElement
   * @public
   * @since 1.90.0
   */
  var FormElement = MacroMetadata.extend("sap.fe.macros.FormElement", {
    /**
     * Name
     */
    name: "FormElement",

    /**
     * Namespace
     */
    namespace: "sap.fe.macros",

    /**
     * Fragment source
     */
    fragment: "sap.fe.macros.FormElement",

    /**
     * Metadata
     */
    metadata: {
      /**
       * Define macro stereotype for documentation
       */
      stereotype: "xmlmacro",

      /**
       * Properties.
       */
      properties: {
        /**
         * Defines the relative path of the property in the metamodel, based on the current contextPath.
         * @public
         */
        metaPath: {
          type: "sap.ui.model.Context",
          required: true
        },

        /**
         * Defines the path of the context used in the current page or block. This setting is defined by the framework.
         * @public
         */
        contextPath: {
          type: "sap.ui.model.Context",
          required: true
        },

        /**
         * The identifier of the table control.
         * @public
         */
        id: {
          type: "string",
          required: true
        },

        /**
         * Label shown for the field. If not set, the label from the annotations will be shown.
         * @public
         */
        label: {
          type: "string",
          required: false
        },

        /**
         * 	If set to false, the FormElement is not rendered.
         * 	@public
         */
        visible: {
          type: "boolean",
          required: false
        }
      },
      aggregations: {
        /**
         * Optional aggregation of controls that should be displayed inside the FormElement.
         * If not set, a default Field Macro control will be rendered
         * @public
         */
        "fields": {
          type: "sap.ui.core.Control"
        }
      }
    },
    create: function (oProps, oControlConfig, oAppComponent, oAggregations) {
      if (oProps.label === undefined) {
        oProps.label = oProps.metaPath.getModel().getProperty(oProps.metaPath.sPath + "@com.sap.vocabularies.Common.v1.Label");
      }

      if (oProps.editable !== undefined) {
        oProps.editModeExpression = compileBinding(ifElse(equal(resolveBindingString(oProps.editable, "boolean"), true), "Editable", "Display"));
      } else {
        oProps.editModeExpression = undefined;
      }

      oProps.fieldsAvailable = oAggregations.fields !== undefined;
      return oProps;
    }
  });
  return FormElement;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm1FbGVtZW50Lm1ldGFkYXRhLnRzIl0sIm5hbWVzIjpbIkZvcm1FbGVtZW50IiwiTWFjcm9NZXRhZGF0YSIsImV4dGVuZCIsIm5hbWUiLCJuYW1lc3BhY2UiLCJmcmFnbWVudCIsIm1ldGFkYXRhIiwic3RlcmVvdHlwZSIsInByb3BlcnRpZXMiLCJtZXRhUGF0aCIsInR5cGUiLCJyZXF1aXJlZCIsImNvbnRleHRQYXRoIiwiaWQiLCJsYWJlbCIsInZpc2libGUiLCJhZ2dyZWdhdGlvbnMiLCJjcmVhdGUiLCJvUHJvcHMiLCJvQ29udHJvbENvbmZpZyIsIm9BcHBDb21wb25lbnQiLCJvQWdncmVnYXRpb25zIiwidW5kZWZpbmVkIiwiZ2V0TW9kZWwiLCJnZXRQcm9wZXJ0eSIsInNQYXRoIiwiZWRpdGFibGUiLCJlZGl0TW9kZUV4cHJlc3Npb24iLCJjb21waWxlQmluZGluZyIsImlmRWxzZSIsImVxdWFsIiwicmVzb2x2ZUJpbmRpbmdTdHJpbmciLCJmaWVsZHNBdmFpbGFibGUiLCJmaWVsZHMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU9BOzs7Ozs7OztBQVFBLE1BQU1BLFdBQVcsR0FBR0MsYUFBYSxDQUFDQyxNQUFkLENBQXFCLDJCQUFyQixFQUFrRDtBQUNyRTs7O0FBR0FDLElBQUFBLElBQUksRUFBRSxhQUorRDs7QUFLckU7OztBQUdBQyxJQUFBQSxTQUFTLEVBQUUsZUFSMEQ7O0FBU3JFOzs7QUFHQUMsSUFBQUEsUUFBUSxFQUFFLDJCQVoyRDs7QUFjckU7OztBQUdBQyxJQUFBQSxRQUFRLEVBQUU7QUFDVDs7O0FBR0FDLE1BQUFBLFVBQVUsRUFBRSxVQUpIOztBQUtUOzs7QUFHQUMsTUFBQUEsVUFBVSxFQUFFO0FBQ1g7Ozs7QUFJQUMsUUFBQUEsUUFBUSxFQUFFO0FBQ1RDLFVBQUFBLElBQUksRUFBRSxzQkFERztBQUVUQyxVQUFBQSxRQUFRLEVBQUU7QUFGRCxTQUxDOztBQVNYOzs7O0FBSUFDLFFBQUFBLFdBQVcsRUFBRTtBQUNaRixVQUFBQSxJQUFJLEVBQUUsc0JBRE07QUFFWkMsVUFBQUEsUUFBUSxFQUFFO0FBRkUsU0FiRjs7QUFpQlg7Ozs7QUFJQUUsUUFBQUEsRUFBRSxFQUFFO0FBQ0hILFVBQUFBLElBQUksRUFBRSxRQURIO0FBRUhDLFVBQUFBLFFBQVEsRUFBRTtBQUZQLFNBckJPOztBQXlCWDs7OztBQUlBRyxRQUFBQSxLQUFLLEVBQUU7QUFDTkosVUFBQUEsSUFBSSxFQUFFLFFBREE7QUFFTkMsVUFBQUEsUUFBUSxFQUFFO0FBRkosU0E3Qkk7O0FBaUNYOzs7O0FBSUFJLFFBQUFBLE9BQU8sRUFBRTtBQUNSTCxVQUFBQSxJQUFJLEVBQUUsU0FERTtBQUVSQyxVQUFBQSxRQUFRLEVBQUU7QUFGRjtBQXJDRSxPQVJIO0FBa0RUSyxNQUFBQSxZQUFZLEVBQUU7QUFDYjs7Ozs7QUFLQSxrQkFBVTtBQUNUTixVQUFBQSxJQUFJLEVBQUU7QUFERztBQU5HO0FBbERMLEtBakIyRDtBQThFckVPLElBQUFBLE1BQU0sRUFBRSxVQUFTQyxNQUFULEVBQXNCQyxjQUF0QixFQUEyQ0MsYUFBM0MsRUFBK0RDLGFBQS9ELEVBQW1GO0FBQzFGLFVBQUlILE1BQU0sQ0FBQ0osS0FBUCxLQUFpQlEsU0FBckIsRUFBZ0M7QUFDL0JKLFFBQUFBLE1BQU0sQ0FBQ0osS0FBUCxHQUFlSSxNQUFNLENBQUNULFFBQVAsQ0FBZ0JjLFFBQWhCLEdBQTJCQyxXQUEzQixDQUF1Q04sTUFBTSxDQUFDVCxRQUFQLENBQWdCZ0IsS0FBaEIsR0FBd0IsdUNBQS9ELENBQWY7QUFDQTs7QUFDRCxVQUFJUCxNQUFNLENBQUNRLFFBQVAsS0FBb0JKLFNBQXhCLEVBQW1DO0FBQ2xDSixRQUFBQSxNQUFNLENBQUNTLGtCQUFQLEdBQTRCQyxjQUFjLENBQ3pDQyxNQUFNLENBQUNDLEtBQUssQ0FBQ0Msb0JBQW9CLENBQUNiLE1BQU0sQ0FBQ1EsUUFBUixFQUFrQixTQUFsQixDQUFyQixFQUFtRCxJQUFuRCxDQUFOLEVBQWdFLFVBQWhFLEVBQTRFLFNBQTVFLENBRG1DLENBQTFDO0FBR0EsT0FKRCxNQUlPO0FBQ05SLFFBQUFBLE1BQU0sQ0FBQ1Msa0JBQVAsR0FBNEJMLFNBQTVCO0FBQ0E7O0FBQ0RKLE1BQUFBLE1BQU0sQ0FBQ2MsZUFBUCxHQUF5QlgsYUFBYSxDQUFDWSxNQUFkLEtBQXlCWCxTQUFsRDtBQUVBLGFBQU9KLE1BQVA7QUFDQTtBQTVGb0UsR0FBbEQsQ0FBcEI7U0ErRmVsQixXIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqICR7Y29weXJpZ2h0fVxuICovXG5cbmltcG9ydCB7IE1hY3JvTWV0YWRhdGEgfSBmcm9tIFwic2FwL2ZlL21hY3Jvc1wiO1xuaW1wb3J0IHsgaWZFbHNlLCBlcXVhbCwgcmVzb2x2ZUJpbmRpbmdTdHJpbmcsIGNvbXBpbGVCaW5kaW5nIH0gZnJvbSBcInNhcC9mZS9jb3JlL2hlbHBlcnMvQmluZGluZ0V4cHJlc3Npb25cIjtcblxuLyoqXG4gKiBAY2xhc3MgQSBmb3JtIGVsZW1lbnQgY29udGFpbmluZyBhIGxhYmVsIGFuZCBhIGZpZWxkXG4gKlxuICogQGhpZGVjb25zdHJ1Y3RvclxuICogQG5hbWUgc2FwLmZlLm1hY3Jvcy5Gb3JtRWxlbWVudFxuICogQHB1YmxpY1xuICogQHNpbmNlIDEuOTAuMFxuICovXG5jb25zdCBGb3JtRWxlbWVudCA9IE1hY3JvTWV0YWRhdGEuZXh0ZW5kKFwic2FwLmZlLm1hY3Jvcy5Gb3JtRWxlbWVudFwiLCB7XG5cdC8qKlxuXHQgKiBOYW1lXG5cdCAqL1xuXHRuYW1lOiBcIkZvcm1FbGVtZW50XCIsXG5cdC8qKlxuXHQgKiBOYW1lc3BhY2Vcblx0ICovXG5cdG5hbWVzcGFjZTogXCJzYXAuZmUubWFjcm9zXCIsXG5cdC8qKlxuXHQgKiBGcmFnbWVudCBzb3VyY2Vcblx0ICovXG5cdGZyYWdtZW50OiBcInNhcC5mZS5tYWNyb3MuRm9ybUVsZW1lbnRcIixcblxuXHQvKipcblx0ICogTWV0YWRhdGFcblx0ICovXG5cdG1ldGFkYXRhOiB7XG5cdFx0LyoqXG5cdFx0ICogRGVmaW5lIG1hY3JvIHN0ZXJlb3R5cGUgZm9yIGRvY3VtZW50YXRpb25cblx0XHQgKi9cblx0XHRzdGVyZW90eXBlOiBcInhtbG1hY3JvXCIsXG5cdFx0LyoqXG5cdFx0ICogUHJvcGVydGllcy5cblx0XHQgKi9cblx0XHRwcm9wZXJ0aWVzOiB7XG5cdFx0XHQvKipcblx0XHRcdCAqIERlZmluZXMgdGhlIHJlbGF0aXZlIHBhdGggb2YgdGhlIHByb3BlcnR5IGluIHRoZSBtZXRhbW9kZWwsIGJhc2VkIG9uIHRoZSBjdXJyZW50IGNvbnRleHRQYXRoLlxuXHRcdFx0ICogQHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHRtZXRhUGF0aDoge1xuXHRcdFx0XHR0eXBlOiBcInNhcC51aS5tb2RlbC5Db250ZXh0XCIsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBEZWZpbmVzIHRoZSBwYXRoIG9mIHRoZSBjb250ZXh0IHVzZWQgaW4gdGhlIGN1cnJlbnQgcGFnZSBvciBibG9jay4gVGhpcyBzZXR0aW5nIGlzIGRlZmluZWQgYnkgdGhlIGZyYW1ld29yay5cblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqL1xuXHRcdFx0Y29udGV4dFBhdGg6IHtcblx0XHRcdFx0dHlwZTogXCJzYXAudWkubW9kZWwuQ29udGV4dFwiLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogVGhlIGlkZW50aWZpZXIgb2YgdGhlIHRhYmxlIGNvbnRyb2wuXG5cdFx0XHQgKiBAcHVibGljXG5cdFx0XHQgKi9cblx0XHRcdGlkOiB7XG5cdFx0XHRcdHR5cGU6IFwic3RyaW5nXCIsXG5cdFx0XHRcdHJlcXVpcmVkOiB0cnVlXG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBMYWJlbCBzaG93biBmb3IgdGhlIGZpZWxkLiBJZiBub3Qgc2V0LCB0aGUgbGFiZWwgZnJvbSB0aGUgYW5ub3RhdGlvbnMgd2lsbCBiZSBzaG93bi5cblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqL1xuXHRcdFx0bGFiZWw6IHtcblx0XHRcdFx0dHlwZTogXCJzdHJpbmdcIixcblx0XHRcdFx0cmVxdWlyZWQ6IGZhbHNlXG5cdFx0XHR9LFxuXHRcdFx0LyoqXG5cdFx0XHQgKiBcdElmIHNldCB0byBmYWxzZSwgdGhlIEZvcm1FbGVtZW50IGlzIG5vdCByZW5kZXJlZC5cblx0XHRcdCAqIFx0QHB1YmxpY1xuXHRcdFx0ICovXG5cdFx0XHR2aXNpYmxlOiB7XG5cdFx0XHRcdHR5cGU6IFwiYm9vbGVhblwiLFxuXHRcdFx0XHRyZXF1aXJlZDogZmFsc2Vcblx0XHRcdH1cblx0XHR9LFxuXHRcdGFnZ3JlZ2F0aW9uczoge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBPcHRpb25hbCBhZ2dyZWdhdGlvbiBvZiBjb250cm9scyB0aGF0IHNob3VsZCBiZSBkaXNwbGF5ZWQgaW5zaWRlIHRoZSBGb3JtRWxlbWVudC5cblx0XHRcdCAqIElmIG5vdCBzZXQsIGEgZGVmYXVsdCBGaWVsZCBNYWNybyBjb250cm9sIHdpbGwgYmUgcmVuZGVyZWRcblx0XHRcdCAqIEBwdWJsaWNcblx0XHRcdCAqL1xuXHRcdFx0XCJmaWVsZHNcIjoge1xuXHRcdFx0XHR0eXBlOiBcInNhcC51aS5jb3JlLkNvbnRyb2xcIlxuXHRcdFx0fVxuXHRcdH1cblx0fSxcblx0Y3JlYXRlOiBmdW5jdGlvbihvUHJvcHM6IGFueSwgb0NvbnRyb2xDb25maWc6IGFueSwgb0FwcENvbXBvbmVudDogYW55LCBvQWdncmVnYXRpb25zOiBhbnkpIHtcblx0XHRpZiAob1Byb3BzLmxhYmVsID09PSB1bmRlZmluZWQpIHtcblx0XHRcdG9Qcm9wcy5sYWJlbCA9IG9Qcm9wcy5tZXRhUGF0aC5nZXRNb2RlbCgpLmdldFByb3BlcnR5KG9Qcm9wcy5tZXRhUGF0aC5zUGF0aCArIFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5MYWJlbFwiKTtcblx0XHR9XG5cdFx0aWYgKG9Qcm9wcy5lZGl0YWJsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRvUHJvcHMuZWRpdE1vZGVFeHByZXNzaW9uID0gY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRcdGlmRWxzZShlcXVhbChyZXNvbHZlQmluZGluZ1N0cmluZyhvUHJvcHMuZWRpdGFibGUsIFwiYm9vbGVhblwiKSwgdHJ1ZSksIFwiRWRpdGFibGVcIiwgXCJEaXNwbGF5XCIpXG5cdFx0XHQpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvUHJvcHMuZWRpdE1vZGVFeHByZXNzaW9uID0gdW5kZWZpbmVkO1xuXHRcdH1cblx0XHRvUHJvcHMuZmllbGRzQXZhaWxhYmxlID0gb0FnZ3JlZ2F0aW9ucy5maWVsZHMgIT09IHVuZGVmaW5lZDtcblxuXHRcdHJldHVybiBvUHJvcHM7XG5cdH1cbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBGb3JtRWxlbWVudDtcbiJdfQ==