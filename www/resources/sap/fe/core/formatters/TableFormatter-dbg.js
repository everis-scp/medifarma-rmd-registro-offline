/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/formatters/TableFormatterTypes"], function (TableFormatterTypes) {
  "use strict";

  var MessageType = TableFormatterTypes.MessageType;

  /**
   * rowHighlighting
   *
   * @param {object} this The context
   * @param {string|number} CriticalityValue criticality value
   * @param {number} messageLastUpdate Timestamp of the last message created,  It's defined as input value but it is not used in the body of the function
   * It is used to refresh the formatting of the table each time a new message is updated
   * @returns {object} The value from the inner function
   */
  var rowHighlighting = function (criticalityValue, aFilteredMessages) {
    if (aFilteredMessages) {
      var sCurrentContextPath = this.getBindingContext() ? this.getBindingContext().getPath() : undefined;
      aFilteredMessages.forEach(function (oMessage) {
        if (oMessage.aTargets[0].indexOf(sCurrentContextPath) === 0) {
          criticalityValue = oMessage.type;
        }
      });
    }

    var criticalityProperty;

    if (typeof criticalityValue === "string") {
      return criticalityValue;
    }

    switch (criticalityValue) {
      case 1:
        criticalityProperty = MessageType.Error;
        break;

      case 2:
        criticalityProperty = MessageType.Warning;
        break;

      case 3:
        criticalityProperty = MessageType.Success;
        break;

      case 5:
        criticalityProperty = MessageType.Information;
        break;

      default:
        criticalityProperty = MessageType.None;
    }

    return criticalityProperty;
  };

  rowHighlighting.__functionName = "sap.fe.core.formatters.TableFormatter#rowHighlighting";

  var navigatedRow = function (sDeepestPath) {
    if (this.getBindingContext() && sDeepestPath) {
      return sDeepestPath.indexOf(this.getBindingContext().getPath()) === 0;
    } else {
      return false;
    }
  };

  navigatedRow.__functionName = "sap.fe.core.formatters.TableFormatter#navigatedRow"; // See https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters for more detail on this weird syntax

  /**
   * Collection of table formatters.
   *
   * @param {object} this The context
   * @param {string} sName The inner function name
   * @param {object[]} oArgs The inner function parameters
   * @returns {object} The value from the inner function
   */

  var tableFormatters = function (sName) {
    if (tableFormatters.hasOwnProperty(sName)) {
      for (var _len = arguments.length, oArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        oArgs[_key - 1] = arguments[_key];
      }

      return tableFormatters[sName].apply(this, oArgs);
    } else {
      return "";
    }
  };

  tableFormatters.rowHighlighting = rowHighlighting;
  tableFormatters.navigatedRow = navigatedRow;
  /**
   * @global
   */

  return tableFormatters;
}, true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbInJvd0hpZ2hsaWdodGluZyIsImNyaXRpY2FsaXR5VmFsdWUiLCJhRmlsdGVyZWRNZXNzYWdlcyIsInNDdXJyZW50Q29udGV4dFBhdGgiLCJnZXRCaW5kaW5nQ29udGV4dCIsImdldFBhdGgiLCJ1bmRlZmluZWQiLCJmb3JFYWNoIiwib01lc3NhZ2UiLCJhVGFyZ2V0cyIsImluZGV4T2YiLCJ0eXBlIiwiY3JpdGljYWxpdHlQcm9wZXJ0eSIsIk1lc3NhZ2VUeXBlIiwiRXJyb3IiLCJXYXJuaW5nIiwiU3VjY2VzcyIsIkluZm9ybWF0aW9uIiwiTm9uZSIsIl9fZnVuY3Rpb25OYW1lIiwibmF2aWdhdGVkUm93Iiwic0RlZXBlc3RQYXRoIiwidGFibGVGb3JtYXR0ZXJzIiwic05hbWUiLCJoYXNPd25Qcm9wZXJ0eSIsIm9BcmdzIiwiYXBwbHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBOzs7Ozs7Ozs7QUFVQSxNQUFNQSxlQUFlLEdBQUcsVUFBOEJDLGdCQUE5QixFQUFpRUMsaUJBQWpFLEVBQXdHO0FBQy9ILFFBQUlBLGlCQUFKLEVBQXVCO0FBQ3RCLFVBQU1DLG1CQUFtQixHQUFHLEtBQUtDLGlCQUFMLEtBQTJCLEtBQUtBLGlCQUFMLEdBQXlCQyxPQUF6QixFQUEzQixHQUFnRUMsU0FBNUY7QUFDQUosTUFBQUEsaUJBQWlCLENBQUNLLE9BQWxCLENBQTBCLFVBQUNDLFFBQUQsRUFBbUI7QUFDNUMsWUFBSUEsUUFBUSxDQUFDQyxRQUFULENBQWtCLENBQWxCLEVBQXFCQyxPQUFyQixDQUE2QlAsbUJBQTdCLE1BQXNELENBQTFELEVBQTZEO0FBQzVERixVQUFBQSxnQkFBZ0IsR0FBR08sUUFBUSxDQUFDRyxJQUE1QjtBQUNBO0FBQ0QsT0FKRDtBQUtBOztBQUVELFFBQUlDLG1CQUFKOztBQUNBLFFBQUksT0FBT1gsZ0JBQVAsS0FBNEIsUUFBaEMsRUFBMEM7QUFDekMsYUFBUUEsZ0JBQVI7QUFDQTs7QUFDRCxZQUFRQSxnQkFBUjtBQUNDLFdBQUssQ0FBTDtBQUNDVyxRQUFBQSxtQkFBbUIsR0FBR0MsV0FBVyxDQUFDQyxLQUFsQztBQUNBOztBQUNELFdBQUssQ0FBTDtBQUNDRixRQUFBQSxtQkFBbUIsR0FBR0MsV0FBVyxDQUFDRSxPQUFsQztBQUNBOztBQUNELFdBQUssQ0FBTDtBQUNDSCxRQUFBQSxtQkFBbUIsR0FBR0MsV0FBVyxDQUFDRyxPQUFsQztBQUNBOztBQUNELFdBQUssQ0FBTDtBQUNDSixRQUFBQSxtQkFBbUIsR0FBR0MsV0FBVyxDQUFDSSxXQUFsQztBQUNBOztBQUNEO0FBQ0NMLFFBQUFBLG1CQUFtQixHQUFHQyxXQUFXLENBQUNLLElBQWxDO0FBZEY7O0FBaUJBLFdBQU9OLG1CQUFQO0FBQ0EsR0FoQ0Q7O0FBaUNBWixFQUFBQSxlQUFlLENBQUNtQixjQUFoQixHQUFpQyx1REFBakM7O0FBRUEsTUFBTUMsWUFBWSxHQUFHLFVBQThCQyxZQUE5QixFQUFvRDtBQUN4RSxRQUFJLEtBQUtqQixpQkFBTCxNQUE0QmlCLFlBQWhDLEVBQThDO0FBQzdDLGFBQU9BLFlBQVksQ0FBQ1gsT0FBYixDQUFxQixLQUFLTixpQkFBTCxHQUF5QkMsT0FBekIsRUFBckIsTUFBNkQsQ0FBcEU7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPLEtBQVA7QUFDQTtBQUNELEdBTkQ7O0FBT0FlLEVBQUFBLFlBQVksQ0FBQ0QsY0FBYixHQUE4QixvREFBOUIsQyxDQUVBOztBQUNBOzs7Ozs7Ozs7QUFRQSxNQUFNRyxlQUFlLEdBQUcsVUFBdUJDLEtBQXZCLEVBQTREO0FBQ25GLFFBQUlELGVBQWUsQ0FBQ0UsY0FBaEIsQ0FBK0JELEtBQS9CLENBQUosRUFBMkM7QUFBQSx3Q0FEcUJFLEtBQ3JCO0FBRHFCQSxRQUFBQSxLQUNyQjtBQUFBOztBQUMxQyxhQUFRSCxlQUFELENBQXlCQyxLQUF6QixFQUFnQ0csS0FBaEMsQ0FBc0MsSUFBdEMsRUFBNENELEtBQTVDLENBQVA7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPLEVBQVA7QUFDQTtBQUNELEdBTkQ7O0FBUUFILEVBQUFBLGVBQWUsQ0FBQ3RCLGVBQWhCLEdBQWtDQSxlQUFsQztBQUNBc0IsRUFBQUEsZUFBZSxDQUFDRixZQUFoQixHQUErQkEsWUFBL0I7QUFDQTs7OztTQUdlRSxlIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYW5hZ2VkT2JqZWN0IH0gZnJvbSBcInNhcC91aS9iYXNlXCI7XG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCJzYXAvZmUvY29yZS9mb3JtYXR0ZXJzL1RhYmxlRm9ybWF0dGVyVHlwZXNcIjtcblxuLyoqXG4gKiByb3dIaWdobGlnaHRpbmdcbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGhpcyBUaGUgY29udGV4dFxuICogQHBhcmFtIHtzdHJpbmd8bnVtYmVyfSBDcml0aWNhbGl0eVZhbHVlIGNyaXRpY2FsaXR5IHZhbHVlXG4gKiBAcGFyYW0ge251bWJlcn0gbWVzc2FnZUxhc3RVcGRhdGUgVGltZXN0YW1wIG9mIHRoZSBsYXN0IG1lc3NhZ2UgY3JlYXRlZCwgIEl0J3MgZGVmaW5lZCBhcyBpbnB1dCB2YWx1ZSBidXQgaXQgaXMgbm90IHVzZWQgaW4gdGhlIGJvZHkgb2YgdGhlIGZ1bmN0aW9uXG4gKiBJdCBpcyB1c2VkIHRvIHJlZnJlc2ggdGhlIGZvcm1hdHRpbmcgb2YgdGhlIHRhYmxlIGVhY2ggdGltZSBhIG5ldyBtZXNzYWdlIGlzIHVwZGF0ZWRcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSB2YWx1ZSBmcm9tIHRoZSBpbm5lciBmdW5jdGlvblxuICovXG5cbmNvbnN0IHJvd0hpZ2hsaWdodGluZyA9IGZ1bmN0aW9uKHRoaXM6IE1hbmFnZWRPYmplY3QsIGNyaXRpY2FsaXR5VmFsdWU6IHN0cmluZyB8IG51bWJlciwgYUZpbHRlcmVkTWVzc2FnZXM6IGFueVtdKTogTWVzc2FnZVR5cGUge1xuXHRpZiAoYUZpbHRlcmVkTWVzc2FnZXMpIHtcblx0XHRjb25zdCBzQ3VycmVudENvbnRleHRQYXRoID0gdGhpcy5nZXRCaW5kaW5nQ29udGV4dCgpID8gdGhpcy5nZXRCaW5kaW5nQ29udGV4dCgpLmdldFBhdGgoKSA6IHVuZGVmaW5lZDtcblx0XHRhRmlsdGVyZWRNZXNzYWdlcy5mb3JFYWNoKChvTWVzc2FnZTogYW55KSA9PiB7XG5cdFx0XHRpZiAob01lc3NhZ2UuYVRhcmdldHNbMF0uaW5kZXhPZihzQ3VycmVudENvbnRleHRQYXRoKSA9PT0gMCkge1xuXHRcdFx0XHRjcml0aWNhbGl0eVZhbHVlID0gb01lc3NhZ2UudHlwZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdGxldCBjcml0aWNhbGl0eVByb3BlcnR5O1xuXHRpZiAodHlwZW9mIGNyaXRpY2FsaXR5VmFsdWUgPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gKGNyaXRpY2FsaXR5VmFsdWUgYXMgdW5rbm93bikgYXMgTWVzc2FnZVR5cGU7XG5cdH1cblx0c3dpdGNoIChjcml0aWNhbGl0eVZhbHVlKSB7XG5cdFx0Y2FzZSAxOlxuXHRcdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLkVycm9yO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAyOlxuXHRcdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLldhcm5pbmc7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDM6XG5cdFx0XHRjcml0aWNhbGl0eVByb3BlcnR5ID0gTWVzc2FnZVR5cGUuU3VjY2Vzcztcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgNTpcblx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5JbmZvcm1hdGlvbjtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRjcml0aWNhbGl0eVByb3BlcnR5ID0gTWVzc2FnZVR5cGUuTm9uZTtcblx0fVxuXG5cdHJldHVybiBjcml0aWNhbGl0eVByb3BlcnR5O1xufTtcbnJvd0hpZ2hsaWdodGluZy5fX2Z1bmN0aW9uTmFtZSA9IFwic2FwLmZlLmNvcmUuZm9ybWF0dGVycy5UYWJsZUZvcm1hdHRlciNyb3dIaWdobGlnaHRpbmdcIjtcblxuY29uc3QgbmF2aWdhdGVkUm93ID0gZnVuY3Rpb24odGhpczogTWFuYWdlZE9iamVjdCwgc0RlZXBlc3RQYXRoOiBzdHJpbmcpIHtcblx0aWYgKHRoaXMuZ2V0QmluZGluZ0NvbnRleHQoKSAmJiBzRGVlcGVzdFBhdGgpIHtcblx0XHRyZXR1cm4gc0RlZXBlc3RQYXRoLmluZGV4T2YodGhpcy5nZXRCaW5kaW5nQ29udGV4dCgpLmdldFBhdGgoKSkgPT09IDA7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59O1xubmF2aWdhdGVkUm93Ll9fZnVuY3Rpb25OYW1lID0gXCJzYXAuZmUuY29yZS5mb3JtYXR0ZXJzLlRhYmxlRm9ybWF0dGVyI25hdmlnYXRlZFJvd1wiO1xuXG4vLyBTZWUgaHR0cHM6Ly93d3cudHlwZXNjcmlwdGxhbmcub3JnL2RvY3MvaGFuZGJvb2svZnVuY3Rpb25zLmh0bWwjdGhpcy1wYXJhbWV0ZXJzIGZvciBtb3JlIGRldGFpbCBvbiB0aGlzIHdlaXJkIHN5bnRheFxuLyoqXG4gKiBDb2xsZWN0aW9uIG9mIHRhYmxlIGZvcm1hdHRlcnMuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IHRoaXMgVGhlIGNvbnRleHRcbiAqIEBwYXJhbSB7c3RyaW5nfSBzTmFtZSBUaGUgaW5uZXIgZnVuY3Rpb24gbmFtZVxuICogQHBhcmFtIHtvYmplY3RbXX0gb0FyZ3MgVGhlIGlubmVyIGZ1bmN0aW9uIHBhcmFtZXRlcnNcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSB2YWx1ZSBmcm9tIHRoZSBpbm5lciBmdW5jdGlvblxuICovXG5jb25zdCB0YWJsZUZvcm1hdHRlcnMgPSBmdW5jdGlvbih0aGlzOiBvYmplY3QsIHNOYW1lOiBzdHJpbmcsIC4uLm9BcmdzOiBhbnlbXSk6IGFueSB7XG5cdGlmICh0YWJsZUZvcm1hdHRlcnMuaGFzT3duUHJvcGVydHkoc05hbWUpKSB7XG5cdFx0cmV0dXJuICh0YWJsZUZvcm1hdHRlcnMgYXMgYW55KVtzTmFtZV0uYXBwbHkodGhpcywgb0FyZ3MpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBcIlwiO1xuXHR9XG59O1xuXG50YWJsZUZvcm1hdHRlcnMucm93SGlnaGxpZ2h0aW5nID0gcm93SGlnaGxpZ2h0aW5nO1xudGFibGVGb3JtYXR0ZXJzLm5hdmlnYXRlZFJvdyA9IG5hdmlnYXRlZFJvdztcbi8qKlxuICogQGdsb2JhbFxuICovXG5leHBvcnQgZGVmYXVsdCB0YWJsZUZvcm1hdHRlcnM7XG4iXX0=