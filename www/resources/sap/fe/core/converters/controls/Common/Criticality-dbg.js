/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/formatters/TableFormatterTypes"], function (TableFormatterTypes) {
  "use strict";

  var _exports = {};
  var MessageType = TableFormatterTypes.MessageType;

  /**
   * Gets a MessageType enum value from a CriticalityType enum value.
   *
   * @param {CriticalityType} criticalityEnum The CriticalityType enum value
   * @returns {MessageType} Returns the MessageType enum value
   */
  function getMessageTypeFromCriticalityType(criticalityEnum) {
    var messageType;

    switch (criticalityEnum) {
      case "UI.CriticalityType/Negative":
      case "UI.CriticalityType/VeryNegative":
        messageType = MessageType.Error;
        break;

      case "UI.CriticalityType/Critical":
        messageType = MessageType.Warning;
        break;

      case "UI.CriticalityType/Positive":
      case "UI.CriticalityType/VeryPositive":
        messageType = MessageType.Success;
        break;

      case "UI.CriticalityType/Information":
        messageType = MessageType.Information;
        break;

      case "UI.CriticalityType/Neutral":
      default:
        messageType = MessageType.None;
    }

    return messageType;
  }

  _exports.getMessageTypeFromCriticalityType = getMessageTypeFromCriticalityType;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNyaXRpY2FsaXR5LnRzIl0sIm5hbWVzIjpbImdldE1lc3NhZ2VUeXBlRnJvbUNyaXRpY2FsaXR5VHlwZSIsImNyaXRpY2FsaXR5RW51bSIsIm1lc3NhZ2VUeXBlIiwiTWVzc2FnZVR5cGUiLCJFcnJvciIsIldhcm5pbmciLCJTdWNjZXNzIiwiSW5mb3JtYXRpb24iLCJOb25lIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBSUE7Ozs7OztBQU1PLFdBQVNBLGlDQUFULENBQTJDQyxlQUEzQyxFQUFxRztBQUMzRyxRQUFJQyxXQUFKOztBQUNBLFlBQVFELGVBQVI7QUFDQyxXQUFLLDZCQUFMO0FBQ0EsV0FBSyxpQ0FBTDtBQUNDQyxRQUFBQSxXQUFXLEdBQUdDLFdBQVcsQ0FBQ0MsS0FBMUI7QUFDQTs7QUFDRCxXQUFLLDZCQUFMO0FBQ0NGLFFBQUFBLFdBQVcsR0FBR0MsV0FBVyxDQUFDRSxPQUExQjtBQUNBOztBQUNELFdBQUssNkJBQUw7QUFDQSxXQUFLLGlDQUFMO0FBQ0NILFFBQUFBLFdBQVcsR0FBR0MsV0FBVyxDQUFDRyxPQUExQjtBQUNBOztBQUNELFdBQUssZ0NBQUw7QUFDQ0osUUFBQUEsV0FBVyxHQUFHQyxXQUFXLENBQUNJLFdBQTFCO0FBQ0E7O0FBQ0QsV0FBSyw0QkFBTDtBQUNBO0FBQ0NMLFFBQUFBLFdBQVcsR0FBR0MsV0FBVyxDQUFDSyxJQUExQjtBQWpCRjs7QUFtQkEsV0FBT04sV0FBUDtBQUNBIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDcml0aWNhbGl0eVR5cGUsIEVudW1WYWx1ZSB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuXG5pbXBvcnQgeyBNZXNzYWdlVHlwZSB9IGZyb20gXCJzYXAvZmUvY29yZS9mb3JtYXR0ZXJzL1RhYmxlRm9ybWF0dGVyVHlwZXNcIjtcblxuLyoqXG4gKiBHZXRzIGEgTWVzc2FnZVR5cGUgZW51bSB2YWx1ZSBmcm9tIGEgQ3JpdGljYWxpdHlUeXBlIGVudW0gdmFsdWUuXG4gKlxuICogQHBhcmFtIHtDcml0aWNhbGl0eVR5cGV9IGNyaXRpY2FsaXR5RW51bSBUaGUgQ3JpdGljYWxpdHlUeXBlIGVudW0gdmFsdWVcbiAqIEByZXR1cm5zIHtNZXNzYWdlVHlwZX0gUmV0dXJucyB0aGUgTWVzc2FnZVR5cGUgZW51bSB2YWx1ZVxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0TWVzc2FnZVR5cGVGcm9tQ3JpdGljYWxpdHlUeXBlKGNyaXRpY2FsaXR5RW51bTogRW51bVZhbHVlPENyaXRpY2FsaXR5VHlwZT4pOiBNZXNzYWdlVHlwZSB7XG5cdGxldCBtZXNzYWdlVHlwZTogTWVzc2FnZVR5cGU7XG5cdHN3aXRjaCAoY3JpdGljYWxpdHlFbnVtKSB7XG5cdFx0Y2FzZSBcIlVJLkNyaXRpY2FsaXR5VHlwZS9OZWdhdGl2ZVwiOlxuXHRcdGNhc2UgXCJVSS5Dcml0aWNhbGl0eVR5cGUvVmVyeU5lZ2F0aXZlXCI6XG5cdFx0XHRtZXNzYWdlVHlwZSA9IE1lc3NhZ2VUeXBlLkVycm9yO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIlVJLkNyaXRpY2FsaXR5VHlwZS9Dcml0aWNhbFwiOlxuXHRcdFx0bWVzc2FnZVR5cGUgPSBNZXNzYWdlVHlwZS5XYXJuaW5nO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIlVJLkNyaXRpY2FsaXR5VHlwZS9Qb3NpdGl2ZVwiOlxuXHRcdGNhc2UgXCJVSS5Dcml0aWNhbGl0eVR5cGUvVmVyeVBvc2l0aXZlXCI6XG5cdFx0XHRtZXNzYWdlVHlwZSA9IE1lc3NhZ2VUeXBlLlN1Y2Nlc3M7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiVUkuQ3JpdGljYWxpdHlUeXBlL0luZm9ybWF0aW9uXCI6XG5cdFx0XHRtZXNzYWdlVHlwZSA9IE1lc3NhZ2VUeXBlLkluZm9ybWF0aW9uO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIlVJLkNyaXRpY2FsaXR5VHlwZS9OZXV0cmFsXCI6XG5cdFx0ZGVmYXVsdDpcblx0XHRcdG1lc3NhZ2VUeXBlID0gTWVzc2FnZVR5cGUuTm9uZTtcblx0fVxuXHRyZXR1cm4gbWVzc2FnZVR5cGU7XG59XG4iXX0=