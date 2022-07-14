/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  /**
   * KPI label formatting.
   * The KPI label is an abbreviation of the complete global KPI title. It is formed using the first three letters of the first three words of the KPI title.
   * If there is only one word in the global KPI title, the first three letters of the word are displayed.
   * If the KPI title has only two words, only the first letters of these two words are displayed.
   *
   * @param {string} kpiTitle KPI title value
   * @returns {string} The formatted criticality
   */
  var labelFormat = function (kpiTitle) {
    if (kpiTitle) {
      // Split the title in words
      var titleParts = kpiTitle.split(" ");
      var kpiLabel;

      if (titleParts.length === 1) {
        // Only 1 word --> first 3 capitalized letters of the word
        kpiLabel = titleParts[0].substring(0, 3).toUpperCase();
      } else if (titleParts.length === 2) {
        // 2 words --> first capitalized letters of these two words
        kpiLabel = (titleParts[0].substring(0, 1) + titleParts[1].substring(0, 1)).toUpperCase();
      } else {
        // 3 words or more --> first capitalized letters of the first 3 words
        kpiLabel = (titleParts[0].substring(0, 1) + titleParts[1].substring(0, 1) + titleParts[2].substring(0, 1)).toUpperCase();
      }

      return kpiLabel;
    } else {
      // No KPI title --> no label
      return "";
    }
  };

  labelFormat.__functionName = "sap.fe.core.formatters.KPIFormatter#labelFormat";
  /**
   * KPI tooltip formatting.
   *
   * @param kpiTitle KPI title
   * @param kpiValue KPI value
   * @param kpiUnit KPI unit or currency (can be undefined)
   * @param kpiStatus KPI status
   * @param hasUnit Is "true" if the KPI value has a unit or a currency
   * @returns Returns the text for the KPI tooltip.
   */

  var tooltipFormat = function (kpiTitle, kpiValue, kpiUnit, kpiStatus, hasUnit) {
    var resBundle = sap.ui.getCore().getLibraryResourceBundle("sap.fe.core");
    var msgKey = kpiStatus ? "C_KPI_TOOLTIP_" + kpiStatus.toUpperCase() : "C_KPI_TOOLTIP_NONE";
    var amountWithUnit;

    if (hasUnit === "true") {
      if (!kpiUnit) {
        // No unit means multi-unit situation
        amountWithUnit = resBundle.getText("C_KPI_TOOLTIP_AMOUNT_MULTIUNIT");
      } else {
        amountWithUnit = kpiValue + " " + kpiUnit;
      }
    } else {
      amountWithUnit = kpiValue;
    }

    return resBundle.getText(msgKey, [kpiTitle, amountWithUnit]);
  };

  tooltipFormat.__functionName = "sap.fe.core.formatters.KPIFormatter#tooltipFormat"; // See https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters for more detail on this weird syntax

  /**
   * Collection of table formatters.
   *
   * @param {object} this The context
   * @param {string} sName The inner function name
   * @param {object[]} oArgs The inner function parameters
   * @returns {object} The value from the inner function
   */

  var kpiFormatters = function (sName) {
    if (kpiFormatters.hasOwnProperty(sName)) {
      for (var _len = arguments.length, oArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        oArgs[_key - 1] = arguments[_key];
      }

      return kpiFormatters[sName].apply(this, oArgs);
    } else {
      return "";
    }
  };

  kpiFormatters.labelFormat = labelFormat;
  kpiFormatters.tooltipFormat = tooltipFormat;
  /**
   * @global
   */

  return kpiFormatters;
}, true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktQSUZvcm1hdHRlci50cyJdLCJuYW1lcyI6WyJsYWJlbEZvcm1hdCIsImtwaVRpdGxlIiwidGl0bGVQYXJ0cyIsInNwbGl0Iiwia3BpTGFiZWwiLCJsZW5ndGgiLCJzdWJzdHJpbmciLCJ0b1VwcGVyQ2FzZSIsIl9fZnVuY3Rpb25OYW1lIiwidG9vbHRpcEZvcm1hdCIsImtwaVZhbHVlIiwia3BpVW5pdCIsImtwaVN0YXR1cyIsImhhc1VuaXQiLCJyZXNCdW5kbGUiLCJzYXAiLCJ1aSIsImdldENvcmUiLCJnZXRMaWJyYXJ5UmVzb3VyY2VCdW5kbGUiLCJtc2dLZXkiLCJhbW91bnRXaXRoVW5pdCIsImdldFRleHQiLCJrcGlGb3JtYXR0ZXJzIiwic05hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsIm9BcmdzIiwiYXBwbHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7Ozs7Ozs7O0FBVUEsTUFBTUEsV0FBVyxHQUFHLFVBQVNDLFFBQVQsRUFBbUM7QUFDdEQsUUFBSUEsUUFBSixFQUFjO0FBQ2I7QUFDQSxVQUFNQyxVQUFVLEdBQUdELFFBQVEsQ0FBQ0UsS0FBVCxDQUFlLEdBQWYsQ0FBbkI7QUFFQSxVQUFJQyxRQUFKOztBQUNBLFVBQUlGLFVBQVUsQ0FBQ0csTUFBWCxLQUFzQixDQUExQixFQUE2QjtBQUM1QjtBQUNBRCxRQUFBQSxRQUFRLEdBQUdGLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY0ksU0FBZCxDQUF3QixDQUF4QixFQUEyQixDQUEzQixFQUE4QkMsV0FBOUIsRUFBWDtBQUNBLE9BSEQsTUFHTyxJQUFJTCxVQUFVLENBQUNHLE1BQVgsS0FBc0IsQ0FBMUIsRUFBNkI7QUFDbkM7QUFDQUQsUUFBQUEsUUFBUSxHQUFHLENBQUNGLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY0ksU0FBZCxDQUF3QixDQUF4QixFQUEyQixDQUEzQixJQUFnQ0osVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjSSxTQUFkLENBQXdCLENBQXhCLEVBQTJCLENBQTNCLENBQWpDLEVBQWdFQyxXQUFoRSxFQUFYO0FBQ0EsT0FITSxNQUdBO0FBQ047QUFDQUgsUUFBQUEsUUFBUSxHQUFHLENBQUNGLFVBQVUsQ0FBQyxDQUFELENBQVYsQ0FBY0ksU0FBZCxDQUF3QixDQUF4QixFQUEyQixDQUEzQixJQUFnQ0osVUFBVSxDQUFDLENBQUQsQ0FBVixDQUFjSSxTQUFkLENBQXdCLENBQXhCLEVBQTJCLENBQTNCLENBQWhDLEdBQWdFSixVQUFVLENBQUMsQ0FBRCxDQUFWLENBQWNJLFNBQWQsQ0FBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsQ0FBakUsRUFBZ0dDLFdBQWhHLEVBQVg7QUFDQTs7QUFFRCxhQUFPSCxRQUFQO0FBQ0EsS0FqQkQsTUFpQk87QUFDTjtBQUNBLGFBQU8sRUFBUDtBQUNBO0FBQ0QsR0F0QkQ7O0FBdUJBSixFQUFBQSxXQUFXLENBQUNRLGNBQVosR0FBNkIsaURBQTdCO0FBRUE7Ozs7Ozs7Ozs7O0FBVUEsTUFBTUMsYUFBYSxHQUFHLFVBQVNSLFFBQVQsRUFBMkJTLFFBQTNCLEVBQTZDQyxPQUE3QyxFQUE4REMsU0FBOUQsRUFBaUZDLE9BQWpGLEVBQTBHO0FBQy9ILFFBQU1DLFNBQVMsR0FBR0MsR0FBRyxDQUFDQyxFQUFKLENBQU9DLE9BQVAsR0FBaUJDLHdCQUFqQixDQUEwQyxhQUExQyxDQUFsQjtBQUNBLFFBQU1DLE1BQU0sR0FBR1AsU0FBUyxHQUFHLG1CQUFtQkEsU0FBUyxDQUFDTCxXQUFWLEVBQXRCLEdBQWdELG9CQUF4RTtBQUNBLFFBQUlhLGNBQUo7O0FBQ0EsUUFBSVAsT0FBTyxLQUFLLE1BQWhCLEVBQXdCO0FBQ3ZCLFVBQUksQ0FBQ0YsT0FBTCxFQUFjO0FBQ2I7QUFDQVMsUUFBQUEsY0FBYyxHQUFHTixTQUFTLENBQUNPLE9BQVYsQ0FBa0IsZ0NBQWxCLENBQWpCO0FBQ0EsT0FIRCxNQUdPO0FBQ05ELFFBQUFBLGNBQWMsR0FBR1YsUUFBUSxHQUFHLEdBQVgsR0FBaUJDLE9BQWxDO0FBQ0E7QUFDRCxLQVBELE1BT087QUFDTlMsTUFBQUEsY0FBYyxHQUFHVixRQUFqQjtBQUNBOztBQUVELFdBQU9JLFNBQVMsQ0FBQ08sT0FBVixDQUFrQkYsTUFBbEIsRUFBMEIsQ0FBQ2xCLFFBQUQsRUFBV21CLGNBQVgsQ0FBMUIsQ0FBUDtBQUNBLEdBaEJEOztBQWlCQVgsRUFBQUEsYUFBYSxDQUFDRCxjQUFkLEdBQStCLG1EQUEvQixDLENBRUE7O0FBQ0E7Ozs7Ozs7OztBQVFBLE1BQU1jLGFBQWEsR0FBRyxVQUF1QkMsS0FBdkIsRUFBNEQ7QUFDakYsUUFBSUQsYUFBYSxDQUFDRSxjQUFkLENBQTZCRCxLQUE3QixDQUFKLEVBQXlDO0FBQUEsd0NBRHFCRSxLQUNyQjtBQURxQkEsUUFBQUEsS0FDckI7QUFBQTs7QUFDeEMsYUFBUUgsYUFBRCxDQUF1QkMsS0FBdkIsRUFBOEJHLEtBQTlCLENBQW9DLElBQXBDLEVBQTBDRCxLQUExQyxDQUFQO0FBQ0EsS0FGRCxNQUVPO0FBQ04sYUFBTyxFQUFQO0FBQ0E7QUFDRCxHQU5EOztBQVFBSCxFQUFBQSxhQUFhLENBQUN0QixXQUFkLEdBQTRCQSxXQUE1QjtBQUNBc0IsRUFBQUEsYUFBYSxDQUFDYixhQUFkLEdBQThCQSxhQUE5QjtBQUVBOzs7O1NBR2VhLGEiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogS1BJIGxhYmVsIGZvcm1hdHRpbmcuXG4gKiBUaGUgS1BJIGxhYmVsIGlzIGFuIGFiYnJldmlhdGlvbiBvZiB0aGUgY29tcGxldGUgZ2xvYmFsIEtQSSB0aXRsZS4gSXQgaXMgZm9ybWVkIHVzaW5nIHRoZSBmaXJzdCB0aHJlZSBsZXR0ZXJzIG9mIHRoZSBmaXJzdCB0aHJlZSB3b3JkcyBvZiB0aGUgS1BJIHRpdGxlLlxuICogSWYgdGhlcmUgaXMgb25seSBvbmUgd29yZCBpbiB0aGUgZ2xvYmFsIEtQSSB0aXRsZSwgdGhlIGZpcnN0IHRocmVlIGxldHRlcnMgb2YgdGhlIHdvcmQgYXJlIGRpc3BsYXllZC5cbiAqIElmIHRoZSBLUEkgdGl0bGUgaGFzIG9ubHkgdHdvIHdvcmRzLCBvbmx5IHRoZSBmaXJzdCBsZXR0ZXJzIG9mIHRoZXNlIHR3byB3b3JkcyBhcmUgZGlzcGxheWVkLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBrcGlUaXRsZSBLUEkgdGl0bGUgdmFsdWVcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgY3JpdGljYWxpdHlcbiAqL1xuXG5jb25zdCBsYWJlbEZvcm1hdCA9IGZ1bmN0aW9uKGtwaVRpdGxlOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRpZiAoa3BpVGl0bGUpIHtcblx0XHQvLyBTcGxpdCB0aGUgdGl0bGUgaW4gd29yZHNcblx0XHRjb25zdCB0aXRsZVBhcnRzID0ga3BpVGl0bGUuc3BsaXQoXCIgXCIpO1xuXG5cdFx0bGV0IGtwaUxhYmVsOiBzdHJpbmc7XG5cdFx0aWYgKHRpdGxlUGFydHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHQvLyBPbmx5IDEgd29yZCAtLT4gZmlyc3QgMyBjYXBpdGFsaXplZCBsZXR0ZXJzIG9mIHRoZSB3b3JkXG5cdFx0XHRrcGlMYWJlbCA9IHRpdGxlUGFydHNbMF0uc3Vic3RyaW5nKDAsIDMpLnRvVXBwZXJDYXNlKCk7XG5cdFx0fSBlbHNlIGlmICh0aXRsZVBhcnRzLmxlbmd0aCA9PT0gMikge1xuXHRcdFx0Ly8gMiB3b3JkcyAtLT4gZmlyc3QgY2FwaXRhbGl6ZWQgbGV0dGVycyBvZiB0aGVzZSB0d28gd29yZHNcblx0XHRcdGtwaUxhYmVsID0gKHRpdGxlUGFydHNbMF0uc3Vic3RyaW5nKDAsIDEpICsgdGl0bGVQYXJ0c1sxXS5zdWJzdHJpbmcoMCwgMSkpLnRvVXBwZXJDYXNlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdC8vIDMgd29yZHMgb3IgbW9yZSAtLT4gZmlyc3QgY2FwaXRhbGl6ZWQgbGV0dGVycyBvZiB0aGUgZmlyc3QgMyB3b3Jkc1xuXHRcdFx0a3BpTGFiZWwgPSAodGl0bGVQYXJ0c1swXS5zdWJzdHJpbmcoMCwgMSkgKyB0aXRsZVBhcnRzWzFdLnN1YnN0cmluZygwLCAxKSArIHRpdGxlUGFydHNbMl0uc3Vic3RyaW5nKDAsIDEpKS50b1VwcGVyQ2FzZSgpO1xuXHRcdH1cblxuXHRcdHJldHVybiBrcGlMYWJlbDtcblx0fSBlbHNlIHtcblx0XHQvLyBObyBLUEkgdGl0bGUgLS0+IG5vIGxhYmVsXG5cdFx0cmV0dXJuIFwiXCI7XG5cdH1cbn07XG5sYWJlbEZvcm1hdC5fX2Z1bmN0aW9uTmFtZSA9IFwic2FwLmZlLmNvcmUuZm9ybWF0dGVycy5LUElGb3JtYXR0ZXIjbGFiZWxGb3JtYXRcIjtcblxuLyoqXG4gKiBLUEkgdG9vbHRpcCBmb3JtYXR0aW5nLlxuICpcbiAqIEBwYXJhbSBrcGlUaXRsZSBLUEkgdGl0bGVcbiAqIEBwYXJhbSBrcGlWYWx1ZSBLUEkgdmFsdWVcbiAqIEBwYXJhbSBrcGlVbml0IEtQSSB1bml0IG9yIGN1cnJlbmN5IChjYW4gYmUgdW5kZWZpbmVkKVxuICogQHBhcmFtIGtwaVN0YXR1cyBLUEkgc3RhdHVzXG4gKiBAcGFyYW0gaGFzVW5pdCBJcyBcInRydWVcIiBpZiB0aGUgS1BJIHZhbHVlIGhhcyBhIHVuaXQgb3IgYSBjdXJyZW5jeVxuICogQHJldHVybnMgUmV0dXJucyB0aGUgdGV4dCBmb3IgdGhlIEtQSSB0b29sdGlwLlxuICovXG5jb25zdCB0b29sdGlwRm9ybWF0ID0gZnVuY3Rpb24oa3BpVGl0bGU6IHN0cmluZywga3BpVmFsdWU6IHN0cmluZywga3BpVW5pdDogc3RyaW5nLCBrcGlTdGF0dXM6IHN0cmluZywgaGFzVW5pdDogc3RyaW5nKTogc3RyaW5nIHtcblx0Y29uc3QgcmVzQnVuZGxlID0gc2FwLnVpLmdldENvcmUoKS5nZXRMaWJyYXJ5UmVzb3VyY2VCdW5kbGUoXCJzYXAuZmUuY29yZVwiKTtcblx0Y29uc3QgbXNnS2V5ID0ga3BpU3RhdHVzID8gXCJDX0tQSV9UT09MVElQX1wiICsga3BpU3RhdHVzLnRvVXBwZXJDYXNlKCkgOiBcIkNfS1BJX1RPT0xUSVBfTk9ORVwiO1xuXHRsZXQgYW1vdW50V2l0aFVuaXQ6IHN0cmluZztcblx0aWYgKGhhc1VuaXQgPT09IFwidHJ1ZVwiKSB7XG5cdFx0aWYgKCFrcGlVbml0KSB7XG5cdFx0XHQvLyBObyB1bml0IG1lYW5zIG11bHRpLXVuaXQgc2l0dWF0aW9uXG5cdFx0XHRhbW91bnRXaXRoVW5pdCA9IHJlc0J1bmRsZS5nZXRUZXh0KFwiQ19LUElfVE9PTFRJUF9BTU9VTlRfTVVMVElVTklUXCIpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRhbW91bnRXaXRoVW5pdCA9IGtwaVZhbHVlICsgXCIgXCIgKyBrcGlVbml0O1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRhbW91bnRXaXRoVW5pdCA9IGtwaVZhbHVlO1xuXHR9XG5cblx0cmV0dXJuIHJlc0J1bmRsZS5nZXRUZXh0KG1zZ0tleSwgW2twaVRpdGxlLCBhbW91bnRXaXRoVW5pdF0pO1xufTtcbnRvb2x0aXBGb3JtYXQuX19mdW5jdGlvbk5hbWUgPSBcInNhcC5mZS5jb3JlLmZvcm1hdHRlcnMuS1BJRm9ybWF0dGVyI3Rvb2x0aXBGb3JtYXRcIjtcblxuLy8gU2VlIGh0dHBzOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy9kb2NzL2hhbmRib29rL2Z1bmN0aW9ucy5odG1sI3RoaXMtcGFyYW1ldGVycyBmb3IgbW9yZSBkZXRhaWwgb24gdGhpcyB3ZWlyZCBzeW50YXhcbi8qKlxuICogQ29sbGVjdGlvbiBvZiB0YWJsZSBmb3JtYXR0ZXJzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0aGlzIFRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gc05hbWUgVGhlIGlubmVyIGZ1bmN0aW9uIG5hbWVcbiAqIEBwYXJhbSB7b2JqZWN0W119IG9BcmdzIFRoZSBpbm5lciBmdW5jdGlvbiBwYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgdmFsdWUgZnJvbSB0aGUgaW5uZXIgZnVuY3Rpb25cbiAqL1xuY29uc3Qga3BpRm9ybWF0dGVycyA9IGZ1bmN0aW9uKHRoaXM6IG9iamVjdCwgc05hbWU6IHN0cmluZywgLi4ub0FyZ3M6IGFueVtdKTogYW55IHtcblx0aWYgKGtwaUZvcm1hdHRlcnMuaGFzT3duUHJvcGVydHkoc05hbWUpKSB7XG5cdFx0cmV0dXJuIChrcGlGb3JtYXR0ZXJzIGFzIGFueSlbc05hbWVdLmFwcGx5KHRoaXMsIG9BcmdzKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fVxufTtcblxua3BpRm9ybWF0dGVycy5sYWJlbEZvcm1hdCA9IGxhYmVsRm9ybWF0O1xua3BpRm9ybWF0dGVycy50b29sdGlwRm9ybWF0ID0gdG9vbHRpcEZvcm1hdDtcblxuLyoqXG4gKiBAZ2xvYmFsXG4gKi9cbmV4cG9ydCBkZWZhdWx0IGtwaUZvcm1hdHRlcnM7XG4iXX0=