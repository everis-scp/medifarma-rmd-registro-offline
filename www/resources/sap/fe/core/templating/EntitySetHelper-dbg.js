/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  var isEntitySet = function (dataObject) {
    return dataObject && dataObject.hasOwnProperty("_type") && dataObject._type === "EntitySet";
  };

  _exports.isEntitySet = isEntitySet;

  var getFilterExpressionRestrictions = function (entitySet) {
    var _entitySet$annotation, _entitySet$annotation2, _entitySet$annotation3;

    return ((_entitySet$annotation = entitySet.annotations) === null || _entitySet$annotation === void 0 ? void 0 : (_entitySet$annotation2 = _entitySet$annotation.Capabilities) === null || _entitySet$annotation2 === void 0 ? void 0 : (_entitySet$annotation3 = _entitySet$annotation2.FilterRestrictions) === null || _entitySet$annotation3 === void 0 ? void 0 : _entitySet$annotation3.FilterExpressionRestrictions) || [];
  };

  _exports.getFilterExpressionRestrictions = getFilterExpressionRestrictions;

  var isStickySessionSupported = function (entitySet) {
    var _entitySet$annotation4;

    return !!((_entitySet$annotation4 = entitySet.annotations.Session) === null || _entitySet$annotation4 === void 0 ? void 0 : _entitySet$annotation4.StickySessionSupported);
  };

  _exports.isStickySessionSupported = isStickySessionSupported;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVudGl0eVNldEhlbHBlci50cyJdLCJuYW1lcyI6WyJpc0VudGl0eVNldCIsImRhdGFPYmplY3QiLCJoYXNPd25Qcm9wZXJ0eSIsIl90eXBlIiwiZ2V0RmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9ucyIsImVudGl0eVNldCIsImFubm90YXRpb25zIiwiQ2FwYWJpbGl0aWVzIiwiRmlsdGVyUmVzdHJpY3Rpb25zIiwiRmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9ucyIsImlzU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCIsIlNlc3Npb24iLCJTdGlja3lTZXNzaW9uU3VwcG9ydGVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFFTyxNQUFNQSxXQUFXLEdBQUcsVUFBU0MsVUFBVCxFQUFtRDtBQUM3RSxXQUFPQSxVQUFVLElBQUlBLFVBQVUsQ0FBQ0MsY0FBWCxDQUEwQixPQUExQixDQUFkLElBQW9ERCxVQUFVLENBQUNFLEtBQVgsS0FBcUIsV0FBaEY7QUFDQSxHQUZNOzs7O0FBSUEsTUFBTUMsK0JBQStCLEdBQUcsVUFBU0MsU0FBVCxFQUErQjtBQUFBOztBQUM3RSxXQUFPLDBCQUFBQSxTQUFTLENBQUNDLFdBQVYsMEdBQXVCQyxZQUF2Qiw0R0FBcUNDLGtCQUFyQyxrRkFBeURDLDRCQUF6RCxLQUF5RixFQUFoRztBQUNBLEdBRk07Ozs7QUFJQSxNQUFNQyx3QkFBd0IsR0FBRyxVQUFTTCxTQUFULEVBQXdDO0FBQUE7O0FBQy9FLFdBQU8sQ0FBQyw0QkFBQ0EsU0FBUyxDQUFDQyxXQUFWLENBQXNCSyxPQUF2QiwyREFBQyx1QkFBK0JDLHNCQUFoQyxDQUFSO0FBQ0EsR0FGTSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRW50aXR5U2V0IH0gZnJvbSBcIkBzYXAtdXgvYW5ub3RhdGlvbi1jb252ZXJ0ZXJcIjtcblxuZXhwb3J0IGNvbnN0IGlzRW50aXR5U2V0ID0gZnVuY3Rpb24oZGF0YU9iamVjdDogYW55KTogZGF0YU9iamVjdCBpcyBFbnRpdHlTZXQge1xuXHRyZXR1cm4gZGF0YU9iamVjdCAmJiBkYXRhT2JqZWN0Lmhhc093blByb3BlcnR5KFwiX3R5cGVcIikgJiYgZGF0YU9iamVjdC5fdHlwZSA9PT0gXCJFbnRpdHlTZXRcIjtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJFeHByZXNzaW9uUmVzdHJpY3Rpb25zID0gZnVuY3Rpb24oZW50aXR5U2V0OiBFbnRpdHlTZXQpIHtcblx0cmV0dXJuIGVudGl0eVNldC5hbm5vdGF0aW9ucz8uQ2FwYWJpbGl0aWVzPy5GaWx0ZXJSZXN0cmljdGlvbnM/LkZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvbnMgfHwgW107XG59O1xuXG5leHBvcnQgY29uc3QgaXNTdGlja3lTZXNzaW9uU3VwcG9ydGVkID0gZnVuY3Rpb24oZW50aXR5U2V0OiBFbnRpdHlTZXQpOiBib29sZWFuIHtcblx0cmV0dXJuICEhZW50aXR5U2V0LmFubm90YXRpb25zLlNlc3Npb24/LlN0aWNreVNlc3Npb25TdXBwb3J0ZWQ7XG59O1xuIl19