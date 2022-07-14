/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  /**
   * Collection of table formatters.
   *
   * @param {object} this The context
   * @param {string} sName The inner function name
   * @param {object[]} oArgs The inner function parameters
   * @returns {object} The value from the inner function
   */
  var valueFormatters = function (sName) {
    if (valueFormatters.hasOwnProperty(sName)) {
      for (var _len = arguments.length, oArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        oArgs[_key - 1] = arguments[_key];
      }

      return valueFormatters[sName].apply(this, oArgs);
    } else {
      return "";
    }
  };

  var formatWithBrackets = function (firstPart, secondPart) {
    if (firstPart && secondPart) {
      return sap.ui.getCore().getLibraryResourceBundle("sap.fe.core").getText("C_FORMAT_FOR_TEXT_ARRANGEMENT", [firstPart, secondPart]);
    } else {
      return firstPart || secondPart || "";
    }
  };

  formatWithBrackets.__functionName = "sap.fe.core.formatters.ValueFormatter#formatWithBrackets";

  var formatWithPercentage = function (sValue) {
    return sValue !== null && sValue !== undefined ? sValue + " %" : "";
  };

  formatWithPercentage.__functionName = "sap.fe.core.formatters.ValueFormatter#formatWithPercentage";

  var computePercentage = function (value, target, sUnit) {
    var sPercentString;
    var iValue = typeof value === "string" ? parseFloat(value) : value;
    var iTarget = typeof target === "string" ? parseFloat(target) : target;

    if (sUnit === "%") {
      if (iValue > 100) {
        sPercentString = "100";
      } else if (iValue < 0) {
        sPercentString = "0";
      } else {
        sPercentString = typeof value === "string" ? value : value === null || value === void 0 ? void 0 : value.toString();
      }
    } else if (iValue > iTarget) {
      sPercentString = "100";
    } else if (iValue < 0) {
      sPercentString = "0";
    } else {
      sPercentString = iValue && iTarget ? (iValue / iTarget * 100).toString() : "";
    }

    return sPercentString;
  };

  computePercentage.__functionName = "sap.fe.core.formatters.ValueFormatter#computePercentage";

  var formatCriticalityIcon = function (val) {
    var sIcon;

    if (val === "UI.CriticalityType/Negative" || val === "1" || val === 1) {
      sIcon = "sap-icon://message-error";
    } else if (val === "UI.CriticalityType/Critical" || val === "2" || val === 2) {
      sIcon = "sap-icon://message-warning";
    } else if (val === "UI.CriticalityType/Positive" || val === "3" || val === 3) {
      sIcon = "sap-icon://message-success";
    } else if (val === "UI.CriticalityType/Information" || val === "5" || val === 5) {
      sIcon = "sap-icon://message-information";
    } else {
      sIcon = "";
    }

    return sIcon;
  };

  formatCriticalityIcon.__functionName = "sap.fe.core.formatters.ValueFormatter#formatCriticalityIcon";
  _exports.formatCriticalityIcon = formatCriticalityIcon;

  var formatCriticalityValueState = function (val) {
    var sValueState;

    if (val === "UI.CriticalityType/Negative" || val === "1" || val === 1) {
      sValueState = "Error";
    } else if (val === "UI.CriticalityType/Critical" || val === "2" || val === 2) {
      sValueState = "Warning";
    } else if (val === "UI.CriticalityType/Positive" || val === "3" || val === 3) {
      sValueState = "Success";
    } else if (val === "UI.CriticalityType/Information" || val === "5" || val === 5) {
      sValueState = "Indication05";
    } else {
      sValueState = "None";
    }

    return sValueState;
  };

  formatCriticalityValueState.__functionName = "sap.fe.core.formatters.ValueFormatter#formatCriticalityValueState";
  _exports.formatCriticalityValueState = formatCriticalityValueState;

  var formatCriticalityButtonType = function (val) {
    var sType;

    if (val === "UI.CriticalityType/Negative" || val === "1" || val === 1) {
      sType = "Reject";
    } else if (val === "UI.CriticalityType/Positive" || val === "3" || val === 3) {
      sType = "Accept";
    } else {
      sType = "Default";
    }

    return sType;
  };

  formatCriticalityButtonType.__functionName = "sap.fe.core.formatters.ValueFormatter#formatCriticalityButtonType";
  _exports.formatCriticalityButtonType = formatCriticalityButtonType;

  var formatCriticalityColorMicroChart = function (val) {
    var sColor;

    if (val === "UI.CriticalityType/Negative" || val === "1" || val === 1) {
      sColor = "Error";
    } else if (val === "UI.CriticalityType/Critical" || val === "2" || val === 2) {
      sColor = "Critical";
    } else if (val === "UI.CriticalityType/Positive" || val === "3" || val === 3) {
      sColor = "Good";
    } else {
      sColor = "Neutral";
    }

    return sColor;
  };

  formatCriticalityColorMicroChart.__functionName = "sap.fe.core.formatters.ValueFormatter#formatCriticalityColorMicroChart";
  _exports.formatCriticalityColorMicroChart = formatCriticalityColorMicroChart;
  valueFormatters.formatWithBrackets = formatWithBrackets;
  valueFormatters.formatWithPercentage = formatWithPercentage;
  valueFormatters.computePercentage = computePercentage;
  valueFormatters.formatCriticalityIcon = formatCriticalityIcon;
  valueFormatters.formatCriticalityValueState = formatCriticalityValueState;
  valueFormatters.formatCriticalityButtonType = formatCriticalityButtonType;
  valueFormatters.formatCriticalityColorMicroChart = formatCriticalityColorMicroChart;
  /**
   * @global
   */

  return valueFormatters;
}, true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlZhbHVlRm9ybWF0dGVyLnRzIl0sIm5hbWVzIjpbInZhbHVlRm9ybWF0dGVycyIsInNOYW1lIiwiaGFzT3duUHJvcGVydHkiLCJvQXJncyIsImFwcGx5IiwiZm9ybWF0V2l0aEJyYWNrZXRzIiwiZmlyc3RQYXJ0Iiwic2Vjb25kUGFydCIsInNhcCIsInVpIiwiZ2V0Q29yZSIsImdldExpYnJhcnlSZXNvdXJjZUJ1bmRsZSIsImdldFRleHQiLCJfX2Z1bmN0aW9uTmFtZSIsImZvcm1hdFdpdGhQZXJjZW50YWdlIiwic1ZhbHVlIiwidW5kZWZpbmVkIiwiY29tcHV0ZVBlcmNlbnRhZ2UiLCJ2YWx1ZSIsInRhcmdldCIsInNVbml0Iiwic1BlcmNlbnRTdHJpbmciLCJpVmFsdWUiLCJwYXJzZUZsb2F0IiwiaVRhcmdldCIsInRvU3RyaW5nIiwiZm9ybWF0Q3JpdGljYWxpdHlJY29uIiwidmFsIiwic0ljb24iLCJmb3JtYXRDcml0aWNhbGl0eVZhbHVlU3RhdGUiLCJzVmFsdWVTdGF0ZSIsImZvcm1hdENyaXRpY2FsaXR5QnV0dG9uVHlwZSIsInNUeXBlIiwiZm9ybWF0Q3JpdGljYWxpdHlDb2xvck1pY3JvQ2hhcnQiLCJzQ29sb3IiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBOzs7Ozs7OztBQVFBLE1BQU1BLGVBQWUsR0FBRyxVQUF1QkMsS0FBdkIsRUFBNEQ7QUFDbkYsUUFBSUQsZUFBZSxDQUFDRSxjQUFoQixDQUErQkQsS0FBL0IsQ0FBSixFQUEyQztBQUFBLHdDQURxQkUsS0FDckI7QUFEcUJBLFFBQUFBLEtBQ3JCO0FBQUE7O0FBQzFDLGFBQVFILGVBQUQsQ0FBeUJDLEtBQXpCLEVBQWdDRyxLQUFoQyxDQUFzQyxJQUF0QyxFQUE0Q0QsS0FBNUMsQ0FBUDtBQUNBLEtBRkQsTUFFTztBQUNOLGFBQU8sRUFBUDtBQUNBO0FBQ0QsR0FORDs7QUFRQSxNQUFNRSxrQkFBa0IsR0FBRyxVQUFDQyxTQUFELEVBQXFCQyxVQUFyQixFQUFxRDtBQUMvRSxRQUFJ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QUNBTCxFQUFBQSxlQUFlLENBQUNjLG9CQUFoQixHQUF1Q0Esb0JBQXZDO0FBQ0FkLEVBQUFBLGVBQWUsQ0FBQ2lCLGlCQUFoQixHQUFvQ0EsaUJBQXBDO0FBQ0FqQixFQUFBQSxlQUFlLENBQUMwQixxQkFBaEIsR0FBd0NBLHFCQUF4QztBQUNBMUIsRUFBQUEsZUFBZSxDQUFDNkIsMkJBQWhCLEdBQThDQSwyQkFBOUM7QUFDQTdCLEVBQUFBLGVBQWUsQ0FBQytCLDJCQUFoQixHQUE4Q0EsMkJBQTlDO0FBQ0EvQixFQUFBQSxlQUFlLENBQUNpQyxnQ0FBaEIsR0FBbURBLGdDQUFuRDtBQUNBOzs7O1NBR2VqQyxlIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvbGxlY3Rpb24gb2YgdGFibGUgZm9ybWF0dGVycy5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gdGhpcyBUaGUgY29udGV4dFxuICogQHBhcmFtIHtzdHJpbmd9IHNOYW1lIFRoZSBpbm5lciBmdW5jdGlvbiBuYW1lXG4gKiBAcGFyYW0ge29iamVjdFtdfSBvQXJncyBUaGUgaW5uZXIgZnVuY3Rpb24gcGFyYW1ldGVyc1xuICogQHJldHVybnMge29iamVjdH0gVGhlIHZhbHVlIGZyb20gdGhlIGlubmVyIGZ1bmN0aW9uXG4gKi9cbmNvbnN0IHZhbHVlRm9ybWF0dGVycyA9IGZ1bmN0aW9uKHRoaXM6IG9iamVjdCwgc05hbWU6IHN0cmluZywgLi4ub0FyZ3M6IGFueVtdKTogYW55IHtcblx0aWYgKHZhbHVlRm9ybWF0dGVycy5oYXNPd25Qcm9wZXJ0eShzTmFtZSkpIHtcblx0XHRyZXR1cm4gKHZhbHVlRm9ybWF0dGVycyBhcyBhbnkpW3NOYW1lXS5hcHBseSh0aGlzLCBvQXJncyk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIFwiXCI7XG5cdH1cbn07XG5cbmNvbnN0IGZvcm1hdFdpdGhCcmFja2V0cyA9IChmaXJzdFBhcnQ/OiBzdHJpbmcsIHNlY29uZFBhcnQ/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuXHRpZiAoZmlyc3RQYXJ0ICYmIHNlY29uZFBhcnQpIHtcblx0XHRyZXR1cm4gc2FwLnVpXG5cdFx0XHQuZ2V0Q29yZSgpXG5cdFx0XHQuZ2V0TGlicmFyeVJlc291cmNlQnVuZGxlKFwic2FwLmZlLmNvcmVcIilcblx0XHRcdC5nZXRUZXh0KFwiQ19GT1JNQVRfRk9SX1RFWFRfQVJSQU5HRU1FTlRcIiwgW2ZpcnN0UGFydCwgc2Vjb25kUGFydF0pO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBmaXJzdFBhcnQgfHwgc2Vjb25kUGFydCB8fCBcIlwiO1xuXHR9XG59O1xuZm9ybWF0V2l0aEJyYWNrZXRzLl9fZnVuY3Rpb25OYW1lID0gXCJzYXAuZmUuY29yZS5mb3JtYXR0ZXJzLlZhbHVlRm9ybWF0dGVyI2Zvcm1hdFdpdGhCcmFja2V0c1wiO1xuXG5jb25zdCBmb3JtYXRXaXRoUGVyY2VudGFnZSA9IChzVmFsdWU/OiBzdHJpbmcpOiBzdHJpbmcgPT4ge1xuXHRyZXR1cm4gc1ZhbHVlICE9PSBudWxsICYmIHNWYWx1ZSAhPT0gdW5kZWZpbmVkID8gc1ZhbHVlICsgXCIgJVwiIDogXCJcIjtcbn07XG5mb3JtYXRXaXRoUGVyY2VudGFnZS5fX2Z1bmN0aW9uTmFtZSA9IFwic2FwLmZlLmNvcmUuZm9ybWF0dGVycy5WYWx1ZUZvcm1hdHRlciNmb3JtYXRXaXRoUGVyY2VudGFnZVwiO1xuXG5jb25zdCBjb21wdXRlUGVyY2VudGFnZSA9ICh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCB0YXJnZXQ6IHN0cmluZyB8IG51bWJlciwgc1VuaXQ/OiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuXHRsZXQgc1BlcmNlbnRTdHJpbmc6IHN0cmluZztcblx0Y29uc3QgaVZhbHVlOiBudW1iZXIgPSB0eXBlb2YgdmFsdWUgPT09IFwic3RyaW5nXCIgPyBwYXJzZUZsb2F0KHZhbHVlKSA6IHZhbHVlO1xuXHRjb25zdCBpVGFyZ2V0OiBudW1iZXIgPSB0eXBlb2YgdGFyZ2V0ID09PSBcInN0cmluZ1wiID8gcGFyc2VGbG9hdCh0YXJnZXQpIDogdGFyZ2V0O1xuXG5cdGlmIChzVW5pdCA9PT0gXCIlXCIpIHtcblx0XHRpZiAoaVZhbHVlID4gMTAwKSB7XG5cdFx0XHRzUGVyY2VudFN0cmluZyA9IFwiMTAwXCI7XG5cdFx0fSBlbHNlIGlmIChpVmFsdWUgPCAwKSB7XG5cdFx0XHRzUGVyY2VudFN0cmluZyA9IFwiMFwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzUGVyY2VudFN0cmluZyA9IHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIiA/IHZhbHVlIDogdmFsdWU/LnRvU3RyaW5nKCk7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGlWYWx1ZSA+IGlUYXJnZXQpIHtcblx0XHRzUGVyY2VudFN0cmluZyA9IFwiMTAwXCI7XG5cdH0gZWxzZSBpZiAoaVZhbHVlIDwgMCkge1xuXHRcdHNQZXJjZW50U3RyaW5nID0gXCIwXCI7XG5cdH0gZWxzZSB7XG5cdFx0c1BlcmNlbnRTdHJpbmcgPSBpVmFsdWUgJiYgaVRhcmdldCA/ICgoaVZhbHVlIC8gaVRhcmdldCkgKiAxMDApLnRvU3RyaW5nKCkgOiBcIlwiO1xuXHR9XG5cdHJldHVybiBzUGVyY2VudFN0cmluZztcbn07XG5jb21wdXRlUGVyY2VudGFnZS5fX2Z1bmN0aW9uTmFtZSA9IFwic2FwLmZlLmNvcmUuZm9ybWF0dGVycy5WYWx1ZUZvcm1hdHRlciNjb21wdXRlUGVyY2VudGFnZVwiO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0Q3JpdGljYWxpdHlJY29uID0gKHZhbD86IHN0cmluZyB8IG51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG5cdGxldCBzSWNvbjogc3RyaW5nO1xuXHRpZiAodmFsID09PSBcIlVJLkNyaXRpY2FsaXR5VHlwZS9OZWdhdGl2ZVwiIHx8IHZhbCA9PT0gXCIxXCIgfHwgdmFsID09PSAxKSB7XG5cdFx0c0ljb24gPSBcInNhcC1pY29uOi8vbWVzc2FnZS1lcnJvclwiO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gXCJVSS5Dcml0aWNhbGl0eVR5cGUvQ3JpdGljYWxcIiB8fCB2YWwgPT09IFwiMlwiIHx8IHZhbCA9PT0gMikge1xuXHRcdHNJY29uID0gXCJzYXAtaWNvbjovL21lc3NhZ2Utd2FybmluZ1wiO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gXCJVSS5Dcml0aWNhbGl0eVR5cGUvUG9zaXRpdmVcIiB8fCB2YWwgPT09IFwiM1wiIHx8IHZhbCA9PT0gMykge1xuXHRcdHNJY29uID0gXCJzYXAtaWNvbjovL21lc3NhZ2Utc3VjY2Vzc1wiO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gXCJVSS5Dcml0aWNhbGl0eVR5cGUvSW5mb3JtYXRpb25cIiB8fCB2YWwgPT09IFwiNVwiIHx8IHZhbCA9PT0gNSkge1xuXHRcdHNJY29uID0gXCJzYXAtaWNvbjovL21lc3NhZ2UtaW5mb3JtYXRpb25cIjtcblx0fSBlbHNlIHtcblx0XHRzSWNvbiA9IFwiXCI7XG5cdH1cblx0cmV0dXJuIHNJY29uO1xufTtcbmZvcm1hdENyaXRpY2FsaXR5SWNvbi5fX2Z1bmN0aW9uTmFtZSA9IFwic2FwLmZlLmNvcmUuZm9ybWF0dGVycy5WYWx1ZUZvcm1hdHRlciNmb3JtYXRDcml0aWNhbGl0eUljb25cIjtcblxuZXhwb3J0IGNvbnN0IGZvcm1hdENyaXRpY2FsaXR5VmFsdWVTdGF0ZSA9ICh2YWw/OiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuXHRsZXQgc1ZhbHVlU3RhdGU6IHN0cmluZztcblx0aWYgKHZhbCA9PT0gXCJVSS5Dcml0aWNhbGl0eVR5cGUvTmVnYXRpdmVcIiB8fCB2YWwgPT09IFwiMVwiIHx8IHZhbCA9PT0gMSkge1xuXHRcdHNWYWx1ZVN0YXRlID0gXCJFcnJvclwiO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gXCJVSS5Dcml0aWNhbGl0eVR5cGUvQ3JpdGljYWxcIiB8fCB2YWwgPT09IFwiMlwiIHx8IHZhbCA9PT0gMikge1xuXHRcdHNWYWx1ZVN0YXRlID0gXCJXYXJuaW5nXCI7XG5cdH0gZWxzZSBpZiAodmFsID09PSBcIlVJLkNyaXRpY2FsaXR5VHlwZS9Qb3NpdGl2ZVwiIHx8IHZhbCA9PT0gXCIzXCIgfHwgdmFsID09PSAzKSB7XG5cdFx0c1ZhbHVlU3RhdGUgPSBcIlN1Y2Nlc3NcIjtcblx0fSBlbHNlIGlmICh2YWwgPT09IFwiVUkuQ3JpdGljYWxpdHlUeXBlL0luZm9ybWF0aW9uXCIgfHwgdmFsID09PSBcIjVcIiB8fCB2YWwgPT09IDUpIHtcblx0XHRzVmFsdWVTdGF0ZSA9IFwiSW5kaWNhdGlvbjA1XCI7XG5cdH0gZWxzZSB7XG5cdFx0c1ZhbHVlU3RhdGUgPSBcIk5vbmVcIjtcblx0fVxuXHRyZXR1cm4gc1ZhbHVlU3RhdGU7XG59O1xuZm9ybWF0Q3JpdGljYWxpdHlWYWx1ZVN0YXRlLl9fZnVuY3Rpb25OYW1lID0gXCJzYXAuZmUuY29yZS5mb3JtYXR0ZXJzLlZhbHVlRm9ybWF0dGVyI2Zvcm1hdENyaXRpY2FsaXR5VmFsdWVTdGF0ZVwiO1xuXG5leHBvcnQgY29uc3QgZm9ybWF0Q3JpdGljYWxpdHlCdXR0b25UeXBlID0gKHZhbD86IHN0cmluZyB8IG51bWJlcik6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG5cdGxldCBzVHlwZTogc3RyaW5nO1xuXHRpZiAodmFsID09PSBcIlVJLkNyaXRpY2FsaXR5VHlwZS9OZWdhdGl2ZVwiIHx8IHZhbCA9PT0gXCIxXCIgfHwgdmFsID09PSAxKSB7XG5cdFx0c1R5cGUgPSBcIlJlamVjdFwiO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gXCJVSS5Dcml0aWNhbGl0eVR5cGUvUG9zaXRpdmVcIiB8fCB2YWwgPT09IFwiM1wiIHx8IHZhbCA9PT0gMykge1xuXHRcdHNUeXBlID0gXCJBY2NlcHRcIjtcblx0fSBlbHNlIHtcblx0XHRzVHlwZSA9IFwiRGVmYXVsdFwiO1xuXHR9XG5cdHJldHVybiBzVHlwZTtcbn07XG5mb3JtYXRDcml0aWNhbGl0eUJ1dHRvblR5cGUuX19mdW5jdGlvbk5hbWUgPSBcInNhcC5mZS5jb3JlLmZvcm1hdHRlcnMuVmFsdWVGb3JtYXR0ZXIjZm9ybWF0Q3JpdGljYWxpdHlCdXR0b25UeXBlXCI7XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRDcml0aWNhbGl0eUNvbG9yTWljcm9DaGFydCA9ICh2YWw/OiBzdHJpbmcgfCBudW1iZXIpOiBzdHJpbmcgfCB1bmRlZmluZWQgPT4ge1xuXHRsZXQgc0NvbG9yOiBzdHJpbmc7XG5cdGlmICh2YWwgPT09IFwiVUkuQ3JpdGljYWxpdHlUeXBlL05lZ2F0aXZlXCIgfHwgdmFsID09PSBcIjFcIiB8fCB2YWwgPT09IDEpIHtcblx0XHRzQ29sb3IgPSBcIkVycm9yXCI7XG5cdH0gZWxzZSBpZiAodmFsID09PSBcIlVJLkNyaXRpY2FsaXR5VHlwZS9Dcml0aWNhbFwiIHx8IHZhbCA9PT0gXCIyXCIgfHwgdmFsID09PSAyKSB7XG5cdFx0c0NvbG9yID0gXCJDcml0aWNhbFwiO1xuXHR9IGVsc2UgaWYgKHZhbCA9PT0gXCJVSS5Dcml0aWNhbGl0eVR5cGUvUG9zaXRpdmVcIiB8fCB2YWwgPT09IFwiM1wiIHx8IHZhbCA9PT0gMykge1xuXHRcdHNDb2xvciA9IFwiR29vZFwiO1xuXHR9IGVsc2Uge1xuXHRcdHNDb2xvciA9IFwiTmV1dHJhbFwiO1xuXHR9XG5cdHJldHVybiBzQ29sb3I7XG59O1xuZm9ybWF0Q3JpdGljYWxpdHlDb2xvck1pY3JvQ2hhcnQuX19mdW5jdGlvbk5hbWUgPSBcInNhcC5mZS5jb3JlLmZvcm1hdHRlcnMuVmFsdWVGb3JtYXR0ZXIjZm9ybWF0Q3JpdGljYWxpdHlDb2xvck1pY3JvQ2hhcnRcIjtcblxudmFsdWVGb3JtYXR0ZXJzLmZvcm1hdFdpdGhCcmFja2V0cyA9IGZvcm1hdFdpdGhCcmFja2V0cztcbnZhbHVlRm9ybWF0dGVycy5mb3JtYXRXaXRoUGVyY2VudGFnZSA9IGZvcm1hdFdpdGhQZXJjZW50YWdlO1xudmFsdWVGb3JtYXR0ZXJzLmNvbXB1dGVQZXJjZW50YWdlID0gY29tcHV0ZVBlcmNlbnRhZ2U7XG52YWx1ZUZvcm1hdHRlcnMuZm9ybWF0Q3JpdGljYWxpdHlJY29uID0gZm9ybWF0Q3JpdGljYWxpdHlJY29uO1xudmFsdWVGb3JtYXR0ZXJzLmZvcm1hdENyaXRpY2FsaXR5VmFsdWVTdGF0ZSA9IGZvcm1hdENyaXRpY2FsaXR5VmFsdWVTdGF0ZTtcbnZhbHVlRm9ybWF0dGVycy5mb3JtYXRDcml0aWNhbGl0eUJ1dHRvblR5cGUgPSBmb3JtYXRDcml0aWNhbGl0eUJ1dHRvblR5cGU7XG52YWx1ZUZvcm1hdHRlcnMuZm9ybWF0Q3JpdGljYWxpdHlDb2xvck1pY3JvQ2hhcnQgPSBmb3JtYXRDcml0aWNhbGl0eUNvbG9yTWljcm9DaGFydDtcbi8qKlxuICogQGdsb2JhbFxuICovXG5leHBvcnQgZGVmYXVsdCB2YWx1ZUZvcm1hdHRlcnM7XG4iXX0=