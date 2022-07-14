/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  function getRangeDefinition(range) {
    var operator;
    var bInclude = range.Sign === "UI.SelectionRangeSignType/I" ? true : false;

    switch (range.Option) {
      case "UI.SelectionRangeOptionType/BT":
        operator = bInclude ? "BT" : "NB";
        break;

      case "UI.SelectionRangeOptionType/CP":
        operator = bInclude ? "Contains" : "NotContains";
        break;

      case "UI.SelectionRangeOptionType/EQ":
        operator = bInclude ? "EQ" : "NE";
        break;

      case "UI.SelectionRangeOptionType/GE":
        operator = bInclude ? "GE" : "LT";
        break;

      case "UI.SelectionRangeOptionType/GT":
        operator = bInclude ? "GT" : "LE";
        break;

      case "UI.SelectionRangeOptionType/LE":
        operator = bInclude ? "LE" : "GT";
        break;

      case "UI.SelectionRangeOptionType/LT":
        operator = bInclude ? "LT" : "GE";
        break;

      case "UI.SelectionRangeOptionType/NB":
        operator = bInclude ? "NB" : "BT";
        break;

      case "UI.SelectionRangeOptionType/NE":
        operator = bInclude ? "NE" : "EQ";
        break;

      case "UI.SelectionRangeOptionType/NP":
        operator = bInclude ? "NotContains" : "Contains";
        break;

      default:
        operator = "EQ";
    }

    return {
      operator: operator,
      rangeLow: range.Low,
      rangeHigh: range.High
    };
  }
  /**
   * Parses a SelectionVariant annotations and creates the correspoding filter definitions.
   *
   * @param selectionVariant SelectionVariant annotation
   * @returns Returns an array of filter definitions corresponding to the SelectionVariant.
   */


  function getFilterDefinitionsFromSelectionVariant(selectionVariant) {
    var aFilterDefs = [];

    if (selectionVariant.SelectOptions) {
      selectionVariant.SelectOptions.forEach(function (selectOption) {
        if (selectOption.PropertyName && selectOption.Ranges.length > 0) {
          aFilterDefs.push({
            propertyPath: selectOption.PropertyName.value,
            ranges: selectOption.Ranges.map(getRangeDefinition)
          });
        }
      });
    }

    return aFilterDefs;
  }

  _exports.getFilterDefinitionsFromSelectionVariant = getFilterDefinitionsFromSelectionVariant;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlNlbGVjdGlvblZhcmlhbnRIZWxwZXIudHMiXSwibmFtZXMiOlsiZ2V0UmFuZ2VEZWZpbml0aW9uIiwicmFuZ2UiLCJvcGVyYXRvciIsImJJbmNsdWRlIiwiU2lnbiIsIk9wdGlvbiIsInJhbmdlTG93IiwiTG93IiwicmFuZ2VIaWdoIiwiSGlnaCIsImdldEZpbHRlckRlZmluaXRpb25zRnJvbVNlbGVjdGlvblZhcmlhbnQiLCJzZWxlY3Rpb25WYXJpYW50IiwiYUZpbHRlckRlZnMiLCJTZWxlY3RPcHRpb25zIiwiZm9yRWFjaCIsInNlbGVjdE9wdGlvbiIsIlByb3BlcnR5TmFtZSIsIlJhbmdlcyIsImxlbmd0aCIsInB1c2giLCJwcm9wZXJ0eVBhdGgiLCJ2YWx1ZSIsInJhbmdlcyIsIm1hcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBY0EsV0FBU0Esa0JBQVQsQ0FBNEJDLEtBQTVCLEVBQXdFO0FBQ3ZFLFFBQUlDLFFBQUo7QUFDQSxRQUFNQyxRQUFRLEdBQUdGLEtBQUssQ0FBQ0csSUFBTixLQUFlLDZCQUFmLEdBQStDLElBQS9DLEdBQXNELEtBQXZFOztBQUVBLFlBQVFILEtBQUssQ0FBQ0ksTUFBZDtBQUNDLFdBQUssZ0NBQUw7QUFDQ0gsUUFBQUEsUUFBUSxHQUFHQyxRQUFRLEdBQUcsSUFBSCxHQUFVLElBQTdCO0FBQ0E7O0FBRUQsV0FBSyxnQ0FBTDtBQUNDRCxRQUFBQSxRQUFRLEdBQUdDLFFBQVEsR0FBRyxVQUFILEdBQWdCLGFBQW5DO0FBQ0E7O0FBRUQsV0FBSyxnQ0FBTDtBQUNDRCxRQUFBQSxRQUFRLEdBQUdDLFFBQVEsR0FBRyxJQUFILEdBQVUsSUFBN0I7QUFDQTs7QUFFRCxXQUFLLGdDQUFMO0FBQ0NELFFBQUFBLFFBQVEsR0FBR0MsUUFBUSxHQUFHLElBQUgsR0FBVSxJQUE3QjtBQUNBOztBQUVELFdBQUssZ0NBQUw7QUFDQ0QsUUFBQUEsUUFBUSxHQUFHQyxRQUFRLEdBQUcsSUFBSCxHQUFVLElBQTdCO0FBQ0E7O0FBRUQsV0FBSyxnQ0FBTDtBQUNDRCxRQUFBQSxRQUFRLEdBQUdDLFFBQVEsR0FBRyxJQUFILEdBQVUsSUFBN0I7QUFDQTs7QUFFRCxXQUFLLGdDQUFMO0FBQ0NELFFBQUFBLFFBQVEsR0FBR0MsUUFBUSxHQUFHLElBQUgsR0FBVSxJQUE3QjtBQUNBOztBQUVELFdBQUssZ0NBQUw7QUFDQ0QsUUFBQUEsUUFBUSxHQUFHQyxRQUFRLEdBQUcsSUFBSCxHQUFVLElBQTdCO0FBQ0E7O0FBRUQsV0FBSyxnQ0FBTDtBQUNDRCxRQUFBQSxRQUFRLEdBQUdDLFFBQVEsR0FBRyxJQUFILEdBQVUsSUFBN0I7QUFDQTs7QUFFRCxXQUFLLGdDQUFMO0FBQ0NELFFBQUFBLFFBQVEsR0FBR0MsUUFBUSxHQUFHLGFBQUgsR0FBbUIsVUFBdEM7QUFDQTs7QUFFRDtBQUNDRCxRQUFBQSxRQUFRLEdBQUcsSUFBWDtBQTFDRjs7QUE2Q0EsV0FBTztBQUNOQSxNQUFBQSxRQUFRLEVBQUVBLFFBREo7QUFFTkksTUFBQUEsUUFBUSxFQUFFTCxLQUFLLENBQUNNLEdBRlY7QUFHTkMsTUFBQUEsU0FBUyxFQUFFUCxLQUFLLENBQUNRO0FBSFgsS0FBUDtBQUtBO0FBRUQ7Ozs7Ozs7O0FBTU8sV0FBU0Msd0NBQVQsQ0FBa0RDLGdCQUFsRCxFQUEwSDtBQUNoSSxRQUFNQyxXQUErQixHQUFHLEVBQXhDOztBQUVBLFFBQUlELGdCQUFnQixDQUFDRSxhQUFyQixFQUFvQztBQUNuQ0YsTUFBQUEsZ0JBQWdCLENBQUNFLGFBQWpCLENBQStCQyxPQUEvQixDQUF1QyxVQUFBQyxZQUFZLEVBQUk7QUFDdEQsWUFBSUEsWUFBWSxDQUFDQyxZQUFiLElBQTZCRCxZQUFZLENBQUNFLE1BQWIsQ0FBb0JDLE1BQXBCLEdBQTZCLENBQTlELEVBQWlFO0FBQ2hFTixVQUFBQSxXQUFXLENBQUNPLElBQVosQ0FBaUI7QUFDaEJDLFlBQUFBLFlBQVksRUFBRUwsWUFBWSxDQUFDQyxZQUFiLENBQTBCSyxLQUR4QjtBQUVoQkMsWUFBQUEsTUFBTSxFQUFFUCxZQUFZLENBQUNFLE1BQWIsQ0FBb0JNLEdBQXBCLENBQXdCdkIsa0JBQXhCO0FBRlEsV0FBakI7QUFJQTtBQUNELE9BUEQ7QUFRQTs7QUFFRCxXQUFPWSxXQUFQO0FBQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFubm90YXRpb25UZXJtIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBTZWxlY3Rpb25WYXJpYW50LCBTZWxlY3Rpb25SYW5nZVR5cGUgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9nZW5lcmF0ZWQvVUlcIjtcblxuZXhwb3J0IHR5cGUgUmFuZ2VEZWZpbml0aW9uID0ge1xuXHRvcGVyYXRvcjogc3RyaW5nO1xuXHRyYW5nZUxvdzogYW55O1xuXHRyYW5nZUhpZ2g/OiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBGaWx0ZXJEZWZpbml0aW9uID0ge1xuXHRwcm9wZXJ0eVBhdGg6IHN0cmluZztcblx0cmFuZ2VzOiBSYW5nZURlZmluaXRpb25bXTtcbn07XG5cbmZ1bmN0aW9uIGdldFJhbmdlRGVmaW5pdGlvbihyYW5nZTogU2VsZWN0aW9uUmFuZ2VUeXBlKTogUmFuZ2VEZWZpbml0aW9uIHtcblx0bGV0IG9wZXJhdG9yOiBTdHJpbmc7XG5cdGNvbnN0IGJJbmNsdWRlID0gcmFuZ2UuU2lnbiA9PT0gXCJVSS5TZWxlY3Rpb25SYW5nZVNpZ25UeXBlL0lcIiA/IHRydWUgOiBmYWxzZTtcblxuXHRzd2l0Y2ggKHJhbmdlLk9wdGlvbiBhcyBzdHJpbmcpIHtcblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL0JUXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJCVFwiIDogXCJOQlwiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL0NQXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJDb250YWluc1wiIDogXCJOb3RDb250YWluc1wiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL0VRXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJFUVwiIDogXCJORVwiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL0dFXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJHRVwiIDogXCJMVFwiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL0dUXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJHVFwiIDogXCJMRVwiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL0xFXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJMRVwiIDogXCJHVFwiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL0xUXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJMVFwiIDogXCJHRVwiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL05CXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJOQlwiIDogXCJCVFwiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL05FXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJORVwiIDogXCJFUVwiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFwiVUkuU2VsZWN0aW9uUmFuZ2VPcHRpb25UeXBlL05QXCI6XG5cdFx0XHRvcGVyYXRvciA9IGJJbmNsdWRlID8gXCJOb3RDb250YWluc1wiIDogXCJDb250YWluc1wiO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRkZWZhdWx0OlxuXHRcdFx0b3BlcmF0b3IgPSBcIkVRXCI7XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdG9wZXJhdG9yOiBvcGVyYXRvciBhcyBzdHJpbmcsXG5cdFx0cmFuZ2VMb3c6IHJhbmdlLkxvdyxcblx0XHRyYW5nZUhpZ2g6IHJhbmdlLkhpZ2hcblx0fTtcbn1cblxuLyoqXG4gKiBQYXJzZXMgYSBTZWxlY3Rpb25WYXJpYW50IGFubm90YXRpb25zIGFuZCBjcmVhdGVzIHRoZSBjb3JyZXNwb2RpbmcgZmlsdGVyIGRlZmluaXRpb25zLlxuICpcbiAqIEBwYXJhbSBzZWxlY3Rpb25WYXJpYW50IFNlbGVjdGlvblZhcmlhbnQgYW5ub3RhdGlvblxuICogQHJldHVybnMgUmV0dXJucyBhbiBhcnJheSBvZiBmaWx0ZXIgZGVmaW5pdGlvbnMgY29ycmVzcG9uZGluZyB0byB0aGUgU2VsZWN0aW9uVmFyaWFudC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEZpbHRlckRlZmluaXRpb25zRnJvbVNlbGVjdGlvblZhcmlhbnQoc2VsZWN0aW9uVmFyaWFudDogQW5ub3RhdGlvblRlcm08U2VsZWN0aW9uVmFyaWFudD4pOiBGaWx0ZXJEZWZpbml0aW9uW10ge1xuXHRjb25zdCBhRmlsdGVyRGVmczogRmlsdGVyRGVmaW5pdGlvbltdID0gW107XG5cblx0aWYgKHNlbGVjdGlvblZhcmlhbnQuU2VsZWN0T3B0aW9ucykge1xuXHRcdHNlbGVjdGlvblZhcmlhbnQuU2VsZWN0T3B0aW9ucy5mb3JFYWNoKHNlbGVjdE9wdGlvbiA9PiB7XG5cdFx0XHRpZiAoc2VsZWN0T3B0aW9uLlByb3BlcnR5TmFtZSAmJiBzZWxlY3RPcHRpb24uUmFuZ2VzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0YUZpbHRlckRlZnMucHVzaCh7XG5cdFx0XHRcdFx0cHJvcGVydHlQYXRoOiBzZWxlY3RPcHRpb24uUHJvcGVydHlOYW1lLnZhbHVlLFxuXHRcdFx0XHRcdHJhbmdlczogc2VsZWN0T3B0aW9uLlJhbmdlcy5tYXAoZ2V0UmFuZ2VEZWZpbml0aW9uKVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBhRmlsdGVyRGVmcztcbn1cbiJdfQ==