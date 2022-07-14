/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  // This list needs to come from AVT
  var ENUM_VALUES = {
    "com.sap.vocabularies.Common.v1.FieldControlType": {
      "Mandatory": 7,
      "Optional": 3,
      "ReadOnly": 0,
      "Inapplicable": 0,
      "Disabled": 1
    }
  };

  var resolveEnumValue = function (enumName) {
    var _enumName$split = enumName.split("/"),
        _enumName$split2 = _slicedToArray(_enumName$split, 2),
        termName = _enumName$split2[0],
        value = _enumName$split2[1];

    if (ENUM_VALUES.hasOwnProperty(termName)) {
      return ENUM_VALUES[termName][value];
    } else {
      return false;
    }
  };

  _exports.resolveEnumValue = resolveEnumValue;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFubm90YXRpb25FbnVtLnRzIl0sIm5hbWVzIjpbIkVOVU1fVkFMVUVTIiwicmVzb2x2ZUVudW1WYWx1ZSIsImVudW1OYW1lIiwic3BsaXQiLCJ0ZXJtTmFtZSIsInZhbHVlIiwiaGFzT3duUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0EsTUFBTUEsV0FBVyxHQUFHO0FBQ25CLHVEQUFtRDtBQUNsRCxtQkFBYSxDQURxQztBQUVsRCxrQkFBWSxDQUZzQztBQUdsRCxrQkFBWSxDQUhzQztBQUlsRCxzQkFBZ0IsQ0FKa0M7QUFLbEQsa0JBQVk7QUFMc0M7QUFEaEMsR0FBcEI7O0FBU08sTUFBTUMsZ0JBQWdCLEdBQUcsVUFBU0MsUUFBVCxFQUEyQjtBQUFBLDBCQUNoQ0EsUUFBUSxDQUFDQyxLQUFULENBQWUsR0FBZixDQURnQztBQUFBO0FBQUEsUUFDbkRDLFFBRG1EO0FBQUEsUUFDekNDLEtBRHlDOztBQUUxRCxRQUFJTCxXQUFXLENBQUNNLGNBQVosQ0FBMkJGLFFBQTNCLENBQUosRUFBMEM7QUFDekMsYUFBUUosV0FBRCxDQUFxQkksUUFBckIsRUFBK0JDLEtBQS9CLENBQVA7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPLEtBQVA7QUFDQTtBQUNELEdBUE0iLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgbGlzdCBuZWVkcyB0byBjb21lIGZyb20gQVZUXG5jb25zdCBFTlVNX1ZBTFVFUyA9IHtcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuRmllbGRDb250cm9sVHlwZVwiOiB7XG5cdFx0XCJNYW5kYXRvcnlcIjogNyxcblx0XHRcIk9wdGlvbmFsXCI6IDMsXG5cdFx0XCJSZWFkT25seVwiOiAwLFxuXHRcdFwiSW5hcHBsaWNhYmxlXCI6IDAsXG5cdFx0XCJEaXNhYmxlZFwiOiAxXG5cdH1cbn07XG5leHBvcnQgY29uc3QgcmVzb2x2ZUVudW1WYWx1ZSA9IGZ1bmN0aW9uKGVudW1OYW1lOiBzdHJpbmcpIHtcblx0Y29uc3QgW3Rlcm1OYW1lLCB2YWx1ZV0gPSBlbnVtTmFtZS5zcGxpdChcIi9cIik7XG5cdGlmIChFTlVNX1ZBTFVFUy5oYXNPd25Qcm9wZXJ0eSh0ZXJtTmFtZSkpIHtcblx0XHRyZXR1cm4gKEVOVU1fVkFMVUVTIGFzIGFueSlbdGVybU5hbWVdW3ZhbHVlXTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cbn07XG4iXX0=