/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/formatters/TableFormatterTypes"], function (TableFormatterTypes) {
  "use strict";

  var MessageType = TableFormatterTypes.MessageType;

  /**
   * criticality formatting
   *
   * @param {string|number} criticalityValue criticality value
   * @returns {object} The formatted criticality
   */
  var criticalityFormat = function (criticalityValue) {
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

  criticalityFormat.__functionName = "sap.fe.core.formatters.CriticalityFormatter#criticalityFormat"; // See https://www.typescriptlang.org/docs/handbook/functions.html#this-parameters for more detail on this weird syntax

  /**
   * Collection of table formatters.
   *
   * @param {object} this The context
   * @param {string} sName The inner function name
   * @param {object[]} oArgs The inner function parameters
   * @returns {object} The value from the inner function
   */

  var criticalityFormatters = function (sName) {
    if (criticalityFormatters.hasOwnProperty(sName)) {
      for (var _len = arguments.length, oArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        oArgs[_key - 1] = arguments[_key];
      }

      return criticalityFormatters[sName].apply(this, oArgs);
    } else {
      return "";
    }
  };

  criticalityFormatters.criticalityFormat = criticalityFormat;
  /**
   * @global
   */

  return criticalityFormatters;
}, true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNyaXRpY2FsaXR5Rm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbImNyaXRpY2FsaXR5Rm9ybWF0IiwiY3JpdGljYWxpdHlWYWx1ZSIsImNyaXRpY2FsaXR5UHJvcGVydHkiLCJNZXNzYWdlVHlwZSIsIkVycm9yIiwiV2FybmluZyIsIlN1Y2Nlc3MiLCJJbmZvcm1hdGlvbiIsIk5vbmUiLCJfX2Z1bmN0aW9uTmFtZSIsImNyaXRpY2FsaXR5Rm9ybWF0dGVycyIsInNOYW1lIiwiaGFzT3duUHJvcGVydHkiLCJvQXJncyIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFQTs7Ozs7O0FBT0EsTUFBTUEsaUJBQWlCLEdBQUcsVUFBU0MsZ0JBQVQsRUFBeUQ7QUFDbEYsUUFBSUMsbUJBQUo7O0FBQ0EsUUFBSSxPQUFPRCxnQkFBUCxLQUE0QixRQUFoQyxFQUEwQztBQUN6QyxhQUFRQSxnQkFBUjtBQUNBOztBQUNELFlBQVFBLGdCQUFSO0FBQ0MsV0FBSyxDQUFMO0FBQ0NDLFFBQUFBLG1CQUFtQixHQUFHQyxXQUFXLENBQUNDLEtBQWxDO0FBQ0E7O0FBQ0QsV0FBSyxDQUFMO0FBQ0NGLFFBQUFBLG1CQUFtQixHQUFHQyxXQUFXLENBQUNFLE9BQWxDO0FBQ0E7O0FBQ0QsV0FBSyxDQUFMO0FBQ0NILFFBQUFBLG1CQUFtQixHQUFHQyxXQUFXLENBQUNHLE9BQWxDO0FBQ0E7O0FBQ0QsV0FBSyxDQUFMO0FBQ0NKLFFBQUFBLG1CQUFtQixHQUFHQyxXQUFXLENBQUNJLFdBQWxDO0FBQ0E7O0FBQ0Q7QUFDQ0wsUUFBQUEsbUJBQW1CLEdBQUdDLFdBQVcsQ0FBQ0ssSUFBbEM7QUFkRjs7QUFpQkEsV0FBT04sbUJBQVA7QUFDQSxHQXZCRDs7QUF3QkFGLEVBQUFBLGlCQUFpQixDQUFDUyxjQUFsQixHQUFtQywrREFBbkMsQyxDQUVBOztBQUNBOzs7Ozs7Ozs7QUFRQSxNQUFNQyxxQkFBcUIsR0FBRyxVQUF1QkMsS0FBdkIsRUFBNEQ7QUFDekYsUUFBSUQscUJBQXFCLENBQUNFLGNBQXRCLENBQXFDRCxLQUFyQyxDQUFKLEVBQWlEO0FBQUEsd0NBRHFCRSxLQUNyQjtBQURxQkEsUUFBQUEsS0FDckI7QUFBQTs7QUFDaEQsYUFBUUgscUJBQUQsQ0FBK0JDLEtBQS9CLEVBQXNDRyxLQUF0QyxDQUE0QyxJQUE1QyxFQUFrREQsS0FBbEQsQ0FBUDtBQUNBLEtBRkQsTUFFTztBQUNOLGFBQU8sRUFBUDtBQUNBO0FBQ0QsR0FORDs7QUFRQUgsRUFBQUEscUJBQXFCLENBQUNWLGlCQUF0QixHQUEwQ0EsaUJBQTFDO0FBRUE7Ozs7U0FHZVUscUIiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcInNhcC9mZS9jb3JlL2Zvcm1hdHRlcnMvVGFibGVGb3JtYXR0ZXJUeXBlc1wiO1xuXG4vKipcbiAqIGNyaXRpY2FsaXR5IGZvcm1hdHRpbmdcbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xudW1iZXJ9IGNyaXRpY2FsaXR5VmFsdWUgY3JpdGljYWxpdHkgdmFsdWVcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBmb3JtYXR0ZWQgY3JpdGljYWxpdHlcbiAqL1xuXG5jb25zdCBjcml0aWNhbGl0eUZvcm1hdCA9IGZ1bmN0aW9uKGNyaXRpY2FsaXR5VmFsdWU6IHN0cmluZyB8IG51bWJlcik6IE1lc3NhZ2VUeXBlIHtcblx0bGV0IGNyaXRpY2FsaXR5UHJvcGVydHk7XG5cdGlmICh0eXBlb2YgY3JpdGljYWxpdHlWYWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiAoY3JpdGljYWxpdHlWYWx1ZSBhcyB1bmtub3duKSBhcyBNZXNzYWdlVHlwZTtcblx0fVxuXHRzd2l0Y2ggKGNyaXRpY2FsaXR5VmFsdWUpIHtcblx0XHRjYXNlIDE6XG5cdFx0XHRjcml0aWNhbGl0eVByb3BlcnR5ID0gTWVzc2FnZVR5cGUuRXJyb3I7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDI6XG5cdFx0XHRjcml0aWNhbGl0eVByb3BlcnR5ID0gTWVzc2FnZVR5cGUuV2FybmluZztcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMzpcblx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5TdWNjZXNzO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSA1OlxuXHRcdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLkluZm9ybWF0aW9uO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5Ob25lO1xuXHR9XG5cblx0cmV0dXJuIGNyaXRpY2FsaXR5UHJvcGVydHk7XG59O1xuY3JpdGljYWxpdHlGb3JtYXQuX19mdW5jdGlvbk5hbWUgPSBcInNhcC5mZS5jb3JlLmZvcm1hdHRlcnMuQ3JpdGljYWxpdHlGb3JtYXR0ZXIjY3JpdGljYWxpdHlGb3JtYXRcIjtcblxuLy8gU2VlIGh0dHBzOi8vd3d3LnR5cGVzY3JpcHRsYW5nLm9yZy9kb2NzL2hhbmRib29rL2Z1bmN0aW9ucy5odG1sI3RoaXMtcGFyYW1ldGVycyBmb3IgbW9yZSBkZXRhaWwgb24gdGhpcyB3ZWlyZCBzeW50YXhcbi8qKlxuICogQ29sbGVjdGlvbiBvZiB0YWJsZSBmb3JtYXR0ZXJzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0aGlzIFRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gc05hbWUgVGhlIGlubmVyIGZ1bmN0aW9uIG5hbWVcbiAqIEBwYXJhbSB7b2JqZWN0W119IG9BcmdzIFRoZSBpbm5lciBmdW5jdGlvbiBwYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgdmFsdWUgZnJvbSB0aGUgaW5uZXIgZnVuY3Rpb25cbiAqL1xuY29uc3QgY3JpdGljYWxpdHlGb3JtYXR0ZXJzID0gZnVuY3Rpb24odGhpczogb2JqZWN0LCBzTmFtZTogc3RyaW5nLCAuLi5vQXJnczogYW55W10pOiBhbnkge1xuXHRpZiAoY3JpdGljYWxpdHlGb3JtYXR0ZXJzLmhhc093blByb3BlcnR5KHNOYW1lKSkge1xuXHRcdHJldHVybiAoY3JpdGljYWxpdHlGb3JtYXR0ZXJzIGFzIGFueSlbc05hbWVdLmFwcGx5KHRoaXMsIG9BcmdzKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fVxufTtcblxuY3JpdGljYWxpdHlGb3JtYXR0ZXJzLmNyaXRpY2FsaXR5Rm9ybWF0ID0gY3JpdGljYWxpdHlGb3JtYXQ7XG5cbi8qKlxuICogQGdsb2JhbFxuICovXG5leHBvcnQgZGVmYXVsdCBjcml0aWNhbGl0eUZvcm1hdHRlcnM7XG4iXX0=