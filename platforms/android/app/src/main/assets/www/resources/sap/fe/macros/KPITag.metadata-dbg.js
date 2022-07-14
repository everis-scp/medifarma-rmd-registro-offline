/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/macros/MacroMetadata", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/formatters/KPIFormatter"], function (MacroMetadata, BindingExpression, kpiFormatters) {
  "use strict";

  var formatResult = BindingExpression.formatResult;
  var compileBinding = BindingExpression.compileBinding;
  var bindingExpression = BindingExpression.bindingExpression;

  /**
   * @classdesc A building block used to display a KPI in the Analytical List Page
   *
   * @hideconstructor
   * @class sap.fe.macros.KPITag
   * @private
   * @experimental
   */
  var KPITag = MacroMetadata.extend("sap.fe.macros.KPITag", {
    /**
     * Name
     */
    name: "KPITag",

    /**
     * Namespace
     */
    namespace: "sap.fe.macros",

    /**
     * Fragment source
     */
    fragment: "sap.fe.macros.KPITag",

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
         * The ID of the KPI
         */
        id: {
          type: "string",
          required: true
        },

        /**
         * Shall be true if the KPI value has an associated currency or unit of measure
         */
        hasUnit: {
          type: "boolean",
          required: false
        },

        /**
         * Path to the DataPoint annotation of the KPI
         */
        metaPath: {
          type: "sap.ui.model.Context",
          required: true
        }
      },
      aggregations: {}
    },
    create: function (oProps) {
      // KPI tag label and tooltip
      var kpiTitle = oProps.metaPath.getProperty("Title");

      if (kpiTitle) {
        var bindingParts = kpiTitle.match(/{(.*)>(.*)}/); // Check if the title is a binding expr '{model>prop}'

        var titleExpression;

        if (bindingParts) {
          // KPI title is a binding expression (localized)
          titleExpression = bindingExpression(bindingParts[2], bindingParts[1]);
        } else {
          // KPI Title is a constant
          titleExpression = kpiTitle;
        }

        var labelExpression = formatResult([titleExpression], kpiFormatters.labelFormat);
        oProps.label = compileBinding(labelExpression);
        var tooltipExpression = formatResult([titleExpression, bindingExpression("/" + oProps.id + "/manifest/sap.card/data/json/mainValueUnscaled", "kpiModel"), bindingExpression("/" + oProps.id + "/manifest/sap.card/data/json/mainUnit", "kpiModel"), bindingExpression("/" + oProps.id + "/manifest/sap.card/data/json/mainCriticality", "kpiModel"), oProps.hasUnit], kpiFormatters.tooltipFormat);
        oProps.tooltip = compileBinding(tooltipExpression);
      }

      return oProps;
    }
  });
  return KPITag;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktQSVRhZy5tZXRhZGF0YS50cyJdLCJuYW1lcyI6WyJLUElUYWciLCJNYWNyb01ldGFkYXRhIiwiZXh0ZW5kIiwibmFtZSIsIm5hbWVzcGFjZSIsImZyYWdtZW50IiwibWV0YWRhdGEiLCJzdGVyZW90eXBlIiwicHJvcGVydGllcyIsImlkIiwidHlwZSIsInJlcXVpcmVkIiwiaGFzVW5pdCIsIm1ldGFQYXRoIiwiYWdncmVnYXRpb25zIiwiY3JlYXRlIiwib1Byb3BzIiwia3BpVGl0bGUiLCJnZXRQcm9wZXJ0eSIsImJpbmRpbmdQYXJ0cyIsIm1hdGNoIiwidGl0bGVFeHByZXNzaW9uIiwiYmluZGluZ0V4cHJlc3Npb24iLCJsYWJlbEV4cHJlc3Npb24iLCJmb3JtYXRSZXN1bHQiLCJrcGlGb3JtYXR0ZXJzIiwibGFiZWxGb3JtYXQiLCJsYWJlbCIsImNvbXBpbGVCaW5kaW5nIiwidG9vbHRpcEV4cHJlc3Npb24iLCJ0b29sdGlwRm9ybWF0IiwidG9vbHRpcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFhQTs7Ozs7Ozs7QUFRQSxNQUFNQSxNQUFNLEdBQUdDLGFBQWEsQ0FBQ0MsTUFBZCxDQUFxQixzQkFBckIsRUFBNkM7QUFDM0Q7OztBQUdBQyxJQUFBQSxJQUFJLEVBQUUsUUFKcUQ7O0FBSzNEOzs7QUFHQUMsSUFBQUEsU0FBUyxFQUFFLGVBUmdEOztBQVMzRDs7O0FBR0FDLElBQUFBLFFBQVEsRUFBRSxzQkFaaUQ7O0FBYTNEOzs7QUFHQUMsSUFBQUEsUUFBUSxFQUFFO0FBQ1Q7OztBQUdBQyxNQUFBQSxVQUFVLEVBQUUsVUFKSDs7QUFLVDs7O0FBR0FDLE1BQUFBLFVBQVUsRUFBRTtBQUNYOzs7QUFHQUMsUUFBQUEsRUFBRSxFQUFFO0FBQ0hDLFVBQUFBLElBQUksRUFBRSxRQURIO0FBRUhDLFVBQUFBLFFBQVEsRUFBRTtBQUZQLFNBSk87O0FBUVg7OztBQUdBQyxRQUFBQSxPQUFPLEVBQUU7QUFDUkYsVUFBQUEsSUFBSSxFQUFFLFNBREU7QUFFUkMsVUFBQUEsUUFBUSxFQUFFO0FBRkYsU0FYRTs7QUFlWDs7O0FBR0FFLFFBQUFBLFFBQVEsRUFBRTtBQUNUSCxVQUFBQSxJQUFJLEVBQUUsc0JBREc7QUFFVEMsVUFBQUEsUUFBUSxFQUFFO0FBRkQ7QUFsQkMsT0FSSDtBQStCVEcsTUFBQUEsWUFBWSxFQUFFO0FBL0JMLEtBaEJpRDtBQWlEM0RDLElBQUFBLE1BQU0sRUFBRSxVQUFTQyxNQUFULEVBQXNCO0FBQzdCO0FBQ0EsVUFBTUMsUUFBUSxHQUFHRCxNQUFNLENBQUNILFFBQVAsQ0FBZ0JLLFdBQWhCLENBQTRCLE9BQTVCLENBQWpCOztBQUNBLFVBQUlELFFBQUosRUFBYztBQUNiLFlBQU1FLFlBQVksR0FBR0YsUUFBUSxDQUFDRyxLQUFULENBQWUsYUFBZixDQUFyQixDQURhLENBQ3VDOztBQUNwRCxZQUFJQyxlQUFKOztBQUNBLFlBQUlGLFlBQUosRUFBa0I7QUFDakI7QUFDQUUsVUFBQUEsZUFBZSxHQUFHQyxpQkFBaUIsQ0FBQ0gsWUFBWSxDQUFDLENBQUQsQ0FBYixFQUFrQkEsWUFBWSxDQUFDLENBQUQsQ0FBOUIsQ0FBbkM7QUFDQSxTQUhELE1BR087QUFDTjtBQUNBRSxVQUFBQSxlQUFlLEdBQUdKLFFBQWxCO0FBQ0E7O0FBRUQsWUFBTU0sZUFBZSxHQUFHQyxZQUFZLENBQUMsQ0FBQ0gsZUFBRCxDQUFELEVBQW9CSSxhQUFhLENBQUNDLFdBQWxDLENBQXBDO0FBQ0FWLFFBQUFBLE1BQU0sQ0FBQ1csS0FBUCxHQUFlQyxjQUFjLENBQUNMLGVBQUQsQ0FBN0I7QUFFQSxZQUFNTSxpQkFBaUIsR0FBR0wsWUFBWSxDQUNyQyxDQUNDSCxlQURELEVBRUNDLGlCQUFpQixDQUFDLE1BQU1OLE1BQU0sQ0FBQ1AsRUFBYixHQUFrQixnREFBbkIsRUFBcUUsVUFBckUsQ0FGbEIsRUFHQ2EsaUJBQWlCLENBQUMsTUFBTU4sTUFBTSxDQUFDUCxFQUFiLEdBQWtCLHVDQUFuQixFQUE0RCxVQUE1RCxDQUhsQixFQUlDYSxpQkFBaUIsQ0FBQyxNQUFNTixNQUFNLENBQUNQLEVBQWIsR0FBa0IsOENBQW5CLEVBQW1FLFVBQW5FLENBSmxCLEVBS0NPLE1BQU0sQ0FBQ0osT0FMUixDQURxQyxFQVFyQ2EsYUFBYSxDQUFDSyxhQVJ1QixDQUF0QztBQVVBZCxRQUFBQSxNQUFNLENBQUNlLE9BQVAsR0FBaUJILGNBQWMsQ0FBQ0MsaUJBQUQsQ0FBL0I7QUFDQTs7QUFFRCxhQUFPYixNQUFQO0FBQ0E7QUFoRjBELEdBQTdDLENBQWY7U0FrRmVoQixNIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqICR7Y29weXJpZ2h0fVxuICovXG5pbXBvcnQgeyBNYWNyb01ldGFkYXRhIH0gZnJvbSBcInNhcC9mZS9tYWNyb3NcIjtcbmltcG9ydCB7XG5cdGJpbmRpbmdFeHByZXNzaW9uLFxuXHRCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb24sXG5cdGNvbXBpbGVCaW5kaW5nLFxuXHRmb3JtYXRSZXN1bHQsXG5cdFVucmVzb2x2ZWFibGVCaW5kaW5nRXhwcmVzc2lvblxufSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9CaW5kaW5nRXhwcmVzc2lvblwiO1xuaW1wb3J0IGtwaUZvcm1hdHRlcnMgZnJvbSBcInNhcC9mZS9jb3JlL2Zvcm1hdHRlcnMvS1BJRm9ybWF0dGVyXCI7XG5cbi8qKlxuICogQGNsYXNzZGVzYyBBIGJ1aWxkaW5nIGJsb2NrIHVzZWQgdG8gZGlzcGxheSBhIEtQSSBpbiB0aGUgQW5hbHl0aWNhbCBMaXN0IFBhZ2VcbiAqXG4gKiBAaGlkZWNvbnN0cnVjdG9yXG4gKiBAY2xhc3Mgc2FwLmZlLm1hY3Jvcy5LUElUYWdcbiAqIEBwcml2YXRlXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmNvbnN0IEtQSVRhZyA9IE1hY3JvTWV0YWRhdGEuZXh0ZW5kKFwic2FwLmZlLm1hY3Jvcy5LUElUYWdcIiwge1xuXHQvKipcblx0ICogTmFtZVxuXHQgKi9cblx0bmFtZTogXCJLUElUYWdcIixcblx0LyoqXG5cdCAqIE5hbWVzcGFjZVxuXHQgKi9cblx0bmFtZXNwYWNlOiBcInNhcC5mZS5tYWNyb3NcIixcblx0LyoqXG5cdCAqIEZyYWdtZW50IHNvdXJjZVxuXHQgKi9cblx0ZnJhZ21lbnQ6IFwic2FwLmZlLm1hY3Jvcy5LUElUYWdcIixcblx0LyoqXG5cdCAqIE1ldGFkYXRhXG5cdCAqL1xuXHRtZXRhZGF0YToge1xuXHRcdC8qKlxuXHRcdCAqIERlZmluZSBtYWNybyBzdGVyZW90eXBlIGZvciBkb2N1bWVudGF0aW9uXG5cdFx0ICovXG5cdFx0c3RlcmVvdHlwZTogXCJ4bWxtYWNyb1wiLFxuXHRcdC8qKlxuXHRcdCAqIFByb3BlcnRpZXMuXG5cdFx0ICovXG5cdFx0cHJvcGVydGllczoge1xuXHRcdFx0LyoqXG5cdFx0XHQgKiBUaGUgSUQgb2YgdGhlIEtQSVxuXHRcdFx0ICovXG5cdFx0XHRpZDoge1xuXHRcdFx0XHR0eXBlOiBcInN0cmluZ1wiLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxuXHRcdFx0fSxcblx0XHRcdC8qKlxuXHRcdFx0ICogU2hhbGwgYmUgdHJ1ZSBpZiB0aGUgS1BJIHZhbHVlIGhhcyBhbiBhc3NvY2lhdGVkIGN1cnJlbmN5IG9yIHVuaXQgb2YgbWVhc3VyZVxuXHRcdFx0ICovXG5cdFx0XHRoYXNVbml0OiB7XG5cdFx0XHRcdHR5cGU6IFwiYm9vbGVhblwiLFxuXHRcdFx0XHRyZXF1aXJlZDogZmFsc2Vcblx0XHRcdH0sXG5cdFx0XHQvKipcblx0XHRcdCAqIFBhdGggdG8gdGhlIERhdGFQb2ludCBhbm5vdGF0aW9uIG9mIHRoZSBLUElcblx0XHRcdCAqL1xuXHRcdFx0bWV0YVBhdGg6IHtcblx0XHRcdFx0dHlwZTogXCJzYXAudWkubW9kZWwuQ29udGV4dFwiLFxuXHRcdFx0XHRyZXF1aXJlZDogdHJ1ZVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0YWdncmVnYXRpb25zOiB7fVxuXHR9LFxuXHRjcmVhdGU6IGZ1bmN0aW9uKG9Qcm9wczogYW55KSB7XG5cdFx0Ly8gS1BJIHRhZyBsYWJlbCBhbmQgdG9vbHRpcFxuXHRcdGNvbnN0IGtwaVRpdGxlID0gb1Byb3BzLm1ldGFQYXRoLmdldFByb3BlcnR5KFwiVGl0bGVcIik7XG5cdFx0aWYgKGtwaVRpdGxlKSB7XG5cdFx0XHRjb25zdCBiaW5kaW5nUGFydHMgPSBrcGlUaXRsZS5tYXRjaCgveyguKik+KC4qKX0vKTsgLy8gQ2hlY2sgaWYgdGhlIHRpdGxlIGlzIGEgYmluZGluZyBleHByICd7bW9kZWw+cHJvcH0nXG5cdFx0XHRsZXQgdGl0bGVFeHByZXNzaW9uOiBCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb248YW55PiB8IFVucmVzb2x2ZWFibGVCaW5kaW5nRXhwcmVzc2lvbjtcblx0XHRcdGlmIChiaW5kaW5nUGFydHMpIHtcblx0XHRcdFx0Ly8gS1BJIHRpdGxlIGlzIGEgYmluZGluZyBleHByZXNzaW9uIChsb2NhbGl6ZWQpXG5cdFx0XHRcdHRpdGxlRXhwcmVzc2lvbiA9IGJpbmRpbmdFeHByZXNzaW9uKGJpbmRpbmdQYXJ0c1syXSwgYmluZGluZ1BhcnRzWzFdKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIEtQSSBUaXRsZSBpcyBhIGNvbnN0YW50XG5cdFx0XHRcdHRpdGxlRXhwcmVzc2lvbiA9IGtwaVRpdGxlO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBsYWJlbEV4cHJlc3Npb24gPSBmb3JtYXRSZXN1bHQoW3RpdGxlRXhwcmVzc2lvbl0sIGtwaUZvcm1hdHRlcnMubGFiZWxGb3JtYXQpO1xuXHRcdFx0b1Byb3BzLmxhYmVsID0gY29tcGlsZUJpbmRpbmcobGFiZWxFeHByZXNzaW9uKTtcblxuXHRcdFx0Y29uc3QgdG9vbHRpcEV4cHJlc3Npb24gPSBmb3JtYXRSZXN1bHQoXG5cdFx0XHRcdFtcblx0XHRcdFx0XHR0aXRsZUV4cHJlc3Npb24sXG5cdFx0XHRcdFx0YmluZGluZ0V4cHJlc3Npb24oXCIvXCIgKyBvUHJvcHMuaWQgKyBcIi9tYW5pZmVzdC9zYXAuY2FyZC9kYXRhL2pzb24vbWFpblZhbHVlVW5zY2FsZWRcIiwgXCJrcGlNb2RlbFwiKSxcblx0XHRcdFx0XHRiaW5kaW5nRXhwcmVzc2lvbihcIi9cIiArIG9Qcm9wcy5pZCArIFwiL21hbmlmZXN0L3NhcC5jYXJkL2RhdGEvanNvbi9tYWluVW5pdFwiLCBcImtwaU1vZGVsXCIpLFxuXHRcdFx0XHRcdGJpbmRpbmdFeHByZXNzaW9uKFwiL1wiICsgb1Byb3BzLmlkICsgXCIvbWFuaWZlc3Qvc2FwLmNhcmQvZGF0YS9qc29uL21haW5Dcml0aWNhbGl0eVwiLCBcImtwaU1vZGVsXCIpLFxuXHRcdFx0XHRcdG9Qcm9wcy5oYXNVbml0XG5cdFx0XHRcdF0sXG5cdFx0XHRcdGtwaUZvcm1hdHRlcnMudG9vbHRpcEZvcm1hdFxuXHRcdFx0KTtcblx0XHRcdG9Qcm9wcy50b29sdGlwID0gY29tcGlsZUJpbmRpbmcodG9vbHRpcEV4cHJlc3Npb24pO1xuXHRcdH1cblxuXHRcdHJldHVybiBvUHJvcHM7XG5cdH1cbn0pO1xuZXhwb3J0IGRlZmF1bHQgS1BJVGFnO1xuIl19