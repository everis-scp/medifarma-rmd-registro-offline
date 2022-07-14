/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../helpers/StableIdHelper"], function (StableIdHelper) {
  "use strict";

  var _exports = {};
  var getStableIdPartFromDataField = StableIdHelper.getStableIdPartFromDataField;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * The KeyHelper is used for dealing with Key in the concern of the flexible programming model
   */
  var KeyHelper = /*#__PURE__*/function () {
    function KeyHelper() {
      _classCallCheck(this, KeyHelper);
    }

    _exports.KeyHelper = KeyHelper;

    _createClass(KeyHelper, null, [{
      key: "generateKeyFromDataField",

      /**
       * Returns a generated key for DataFields to be used in the flexible programming model.
       *
       * @param {DataFieldAbstractTypes} oDataField DataField to generate the key for
       * @returns {string} Returns a through StableIdHelper generated key
       */
      value: function generateKeyFromDataField(oDataField) {
        return getStableIdPartFromDataField(oDataField);
      }
      /**
       * Throws a Error if any other character then aA-zZ, 0-9, ':', '_' or '-' is used.
       *
       * @param {string} key String to check validity on
       */

    }, {
      key: "validateKey",
      value: function validateKey(key) {
        var pattern = /[^A-Za-z0-9_\-:]/;

        if (pattern.exec(key)) {
          throw new Error("Invalid key: " + key + " - only 'A-Za-z0-9_-:' are allowed");
        }
      }
      /**
       * Returns the key for a selection field required for adaption.
       *
       * @param fullPropertyPath The full property path (without entityType)
       * @returns {string} The key of the selection field
       */

    }, {
      key: "getSelectionFieldKeyFromPath",
      value: function getSelectionFieldKeyFromPath(fullPropertyPath) {
        return fullPropertyPath.replace(/(\*|\+)?\//g, "::");
      }
      /**
       * Returns the path for a selection field required for adaption.
       *
       * @param selectionFieldKey The key of the selection field
       * @returns {string} The full property path
       */

    }, {
      key: "getPathFromSelectionFieldKey",
      value: function getPathFromSelectionFieldKey(selectionFieldKey) {
        return selectionFieldKey.replace(/::\//g, "/");
      }
    }]);

    return KeyHelper;
  }();

  _exports.KeyHelper = KeyHelper;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktleS50cyJdLCJuYW1lcyI6WyJLZXlIZWxwZXIiLCJvRGF0YUZpZWxkIiwiZ2V0U3RhYmxlSWRQYXJ0RnJvbURhdGFGaWVsZCIsImtleSIsInBhdHRlcm4iLCJleGVjIiwiRXJyb3IiLCJmdWxsUHJvcGVydHlQYXRoIiwicmVwbGFjZSIsInNlbGVjdGlvbkZpZWxkS2V5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0E7OztNQUdhQSxTOzs7Ozs7Ozs7O0FBQ1o7Ozs7OzsrQ0FNZ0NDLFUsRUFBNEM7QUFDM0UsZUFBT0MsNEJBQTRCLENBQUNELFVBQUQsQ0FBbkM7QUFDQTtBQUVEOzs7Ozs7OztrQ0FLbUJFLEcsRUFBYTtBQUMvQixZQUFNQyxPQUFPLEdBQUcsa0JBQWhCOztBQUNBLFlBQUlBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhRixHQUFiLENBQUosRUFBdUI7QUFDdEIsZ0JBQU0sSUFBSUcsS0FBSixDQUFVLGtCQUFrQkgsR0FBbEIsR0FBd0Isb0NBQWxDLENBQU47QUFDQTtBQUNEO0FBRUQ7Ozs7Ozs7OzttREFNb0NJLGdCLEVBQTBCO0FBQzdELGVBQU9BLGdCQUFnQixDQUFDQyxPQUFqQixDQUF5QixhQUF6QixFQUF3QyxJQUF4QyxDQUFQO0FBQ0E7QUFFRDs7Ozs7Ozs7O21EQU1vQ0MsaUIsRUFBMkI7QUFDOUQsZUFBT0EsaUJBQWlCLENBQUNELE9BQWxCLENBQTBCLE9BQTFCLEVBQW1DLEdBQW5DLENBQVA7QUFDQSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGF0YUZpZWxkQWJzdHJhY3RUeXBlcyB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IHsgZ2V0U3RhYmxlSWRQYXJ0RnJvbURhdGFGaWVsZCB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5cbi8qKlxuICogVGhlIEtleUhlbHBlciBpcyB1c2VkIGZvciBkZWFsaW5nIHdpdGggS2V5IGluIHRoZSBjb25jZXJuIG9mIHRoZSBmbGV4aWJsZSBwcm9ncmFtbWluZyBtb2RlbFxuICovXG5leHBvcnQgY2xhc3MgS2V5SGVscGVyIHtcblx0LyoqXG5cdCAqIFJldHVybnMgYSBnZW5lcmF0ZWQga2V5IGZvciBEYXRhRmllbGRzIHRvIGJlIHVzZWQgaW4gdGhlIGZsZXhpYmxlIHByb2dyYW1taW5nIG1vZGVsLlxuXHQgKlxuXHQgKiBAcGFyYW0ge0RhdGFGaWVsZEFic3RyYWN0VHlwZXN9IG9EYXRhRmllbGQgRGF0YUZpZWxkIHRvIGdlbmVyYXRlIHRoZSBrZXkgZm9yXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgYSB0aHJvdWdoIFN0YWJsZUlkSGVscGVyIGdlbmVyYXRlZCBrZXlcblx0ICovXG5cdHN0YXRpYyBnZW5lcmF0ZUtleUZyb21EYXRhRmllbGQob0RhdGFGaWVsZDogRGF0YUZpZWxkQWJzdHJhY3RUeXBlcyk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGdldFN0YWJsZUlkUGFydEZyb21EYXRhRmllbGQob0RhdGFGaWVsZCkhO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRocm93cyBhIEVycm9yIGlmIGFueSBvdGhlciBjaGFyYWN0ZXIgdGhlbiBhQS16WiwgMC05LCAnOicsICdfJyBvciAnLScgaXMgdXNlZC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGtleSBTdHJpbmcgdG8gY2hlY2sgdmFsaWRpdHkgb25cblx0ICovXG5cdHN0YXRpYyB2YWxpZGF0ZUtleShrZXk6IHN0cmluZykge1xuXHRcdGNvbnN0IHBhdHRlcm4gPSAvW15BLVphLXowLTlfXFwtOl0vO1xuXHRcdGlmIChwYXR0ZXJuLmV4ZWMoa2V5KSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW52YWxpZCBrZXk6IFwiICsga2V5ICsgXCIgLSBvbmx5ICdBLVphLXowLTlfLTonIGFyZSBhbGxvd2VkXCIpO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBrZXkgZm9yIGEgc2VsZWN0aW9uIGZpZWxkIHJlcXVpcmVkIGZvciBhZGFwdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIGZ1bGxQcm9wZXJ0eVBhdGggVGhlIGZ1bGwgcHJvcGVydHkgcGF0aCAod2l0aG91dCBlbnRpdHlUeXBlKVxuXHQgKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUga2V5IG9mIHRoZSBzZWxlY3Rpb24gZmllbGRcblx0ICovXG5cdHN0YXRpYyBnZXRTZWxlY3Rpb25GaWVsZEtleUZyb21QYXRoKGZ1bGxQcm9wZXJ0eVBhdGg6IHN0cmluZykge1xuXHRcdHJldHVybiBmdWxsUHJvcGVydHlQYXRoLnJlcGxhY2UoLyhcXCp8XFwrKT9cXC8vZywgXCI6OlwiKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRoZSBwYXRoIGZvciBhIHNlbGVjdGlvbiBmaWVsZCByZXF1aXJlZCBmb3IgYWRhcHRpb24uXG5cdCAqXG5cdCAqIEBwYXJhbSBzZWxlY3Rpb25GaWVsZEtleSBUaGUga2V5IG9mIHRoZSBzZWxlY3Rpb24gZmllbGRcblx0ICogQHJldHVybnMge3N0cmluZ30gVGhlIGZ1bGwgcHJvcGVydHkgcGF0aFxuXHQgKi9cblx0c3RhdGljIGdldFBhdGhGcm9tU2VsZWN0aW9uRmllbGRLZXkoc2VsZWN0aW9uRmllbGRLZXk6IHN0cmluZykge1xuXHRcdHJldHVybiBzZWxlY3Rpb25GaWVsZEtleS5yZXBsYWNlKC86OlxcLy9nLCBcIi9cIik7XG5cdH1cbn1cbiJdfQ==