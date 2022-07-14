/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var _exports = {};

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * helper class for Aggregation annotations.
   */
  var AggregationHelper = /*#__PURE__*/function () {
    /**
     * Creates a helper for a specific entity type and a converter context.
     *
     * @param entityType The EntityType
     * @param converterContext The ConverterContext
     */
    function AggregationHelper(entityType, converterContext) {
      var _this$_oAggregationAn, _this$_oAggregationAn4, _this$_oAggregationAn7, _oTargetAggregationAn;

      _classCallCheck(this, AggregationHelper);

      this._entityType = entityType;
      this._converterContext = converterContext;
      this._oAggregationAnnotationTarget = this._determineAggregationAnnotationTarget();
      var oTargetAggregationAnnotations;

      if (((_this$_oAggregationAn = this._oAggregationAnnotationTarget) === null || _this$_oAggregationAn === void 0 ? void 0 : _this$_oAggregationAn._type) === "NavigationProperty") {
        var _this$_oAggregationAn2, _this$_oAggregationAn3;

        oTargetAggregationAnnotations = (_this$_oAggregationAn2 = this._oAggregationAnnotationTarget) === null || _this$_oAggregationAn2 === void 0 ? void 0 : (_this$_oAggregationAn3 = _this$_oAggregationAn2.annotations) === null || _this$_oAggregationAn3 === void 0 ? void 0 : _this$_oAggregationAn3.Aggregation;
      } else if (((_this$_oAggregationAn4 = this._oAggregationAnnotationTarget) === null || _this$_oAggregationAn4 === void 0 ? void 0 : _this$_oAggregationAn4._type) === "EntityType") {
        var _this$_oAggregationAn5, _this$_oAggregationAn6;

        oTargetAggregationAnnotations = (_this$_oAggregationAn5 = this._oAggregationAnnotationTarget) === null || _this$_oAggregationAn5 === void 0 ? void 0 : (_this$_oAggregationAn6 = _this$_oAggregationAn5.annotations) === null || _this$_oAggregationAn6 === void 0 ? void 0 : _this$_oAggregationAn6.Aggregation;
      } else if (((_this$_oAggregationAn7 = this._oAggregationAnnotationTarget) === null || _this$_oAggregationAn7 === void 0 ? void 0 : _this$_oAggregationAn7._type) === "EntitySet") {
        var _this$_oAggregationAn8, _this$_oAggregationAn9;

        oTargetAggregationAnnotations = (_this$_oAggregationAn8 = this._oAggregationAnnotationTarget) === null || _this$_oAggregationAn8 === void 0 ? void 0 : (_this$_oAggregationAn9 = _this$_oAggregationAn8.annotations) === null || _this$_oAggregationAn9 === void 0 ? void 0 : _this$_oAggregationAn9.Aggregation;
      }

      this._bApplySupported = ((_oTargetAggregationAn = oTargetAggregationAnnotations) === null || _oTargetAggregationAn === void 0 ? void 0 : _oTargetAggregationAn.ApplySupported) ? true : false;

      if (this._bApplySupported) {
        var _oTargetAggregationAn2, _oTargetAggregationAn3;

        this._aGroupableProperties = (_oTargetAggregationAn2 = oTargetAggregationAnnotations) === null || _oTargetAggregationAn2 === void 0 ? void 0 : (_oTargetAggregationAn3 = _oTargetAggregationAn2.ApplySupported) === null || _oTargetAggregationAn3 === void 0 ? void 0 : _oTargetAggregationAn3.GroupableProperties;
      }
    }
    /**
     * Determine the most appropriate target for the aggregation annotations.
     *
     * @returns  EntityType | EntitySet | NavigationProperty where aggregation annotations should be found.
     */


    _exports.AggregationHelper = AggregationHelper;

    _createClass(AggregationHelper, [{
      key: "_determineAggregationAnnotationTarget",
      value: function _determineAggregationAnnotationTarget() {
        var _this$_converterConte, _this$_converterConte2, _this$_converterConte3, _this$_converterConte4, _this$_converterConte5;

        var bIsParameterized = ((_this$_converterConte = this._converterContext.getDataModelObjectPath()) === null || _this$_converterConte === void 0 ? void 0 : (_this$_converterConte2 = _this$_converterConte.targetEntitySet) === null || _this$_converterConte2 === void 0 ? void 0 : (_this$_converterConte3 = _this$_converterConte2.entityType) === null || _this$_converterConte3 === void 0 ? void 0 : (_this$_converterConte4 = _this$_converterConte3.annotations) === null || _this$_converterConte4 === void 0 ? void 0 : (_this$_converterConte5 = _this$_converterConte4.Common) === null || _this$_converterConte5 === void 0 ? void 0 : _this$_converterConte5.ResultContext) ? true : false;
        var oAggregationAnnotationSource; // find ApplySupported

        if (bIsParameterized) {
          var _oNavigationPropertyO, _oNavigationPropertyO2, _oEntityTypeObject$an, _oEntityTypeObject$an2;

          // if this is a parameterized view then applysupported can be found at either the navProp pointing to the result set or entityType.
          // If applySupported is present at both the navProp and the entityType then navProp is more specific so take annotations from there
          // targetObject in the converter context for a parameterized view is the navigation property pointing to th result set
          var oDataModelObjectPath = this._converterContext.getDataModelObjectPath();

          var oNavigationPropertyObject = oDataModelObjectPath === null || oDataModelObjectPath === void 0 ? void 0 : oDataModelObjectPath.targetObject;
          var oEntityTypeObject = oDataModelObjectPath === null || oDataModelObjectPath === void 0 ? void 0 : oDataModelObjectPath.targetEntityType;

          if (oNavigationPropertyObject === null || oNavigationPropertyObject === void 0 ? void 0 : (_oNavigationPropertyO = oNavigationPropertyObject.annotations) === null || _oNavigationPropertyO === void 0 ? void 0 : (_oNavigationPropertyO2 = _oNavigationPropertyO.Aggregation) === null || _oNavigationPropertyO2 === void 0 ? void 0 : _oNavigationPropertyO2.ApplySupported) {
            oAggregationAnnotationSource = oNavigationPropertyObject;
          } else if (oEntityTypeObject === null || oEntityTypeObject === void 0 ? void 0 : (_oEntityTypeObject$an = oEntityTypeObject.annotations) === null || _oEntityTypeObject$an === void 0 ? void 0 : (_oEntityTypeObject$an2 = _oEntityTypeObject$an.Aggregation) === null || _oEntityTypeObject$an2 === void 0 ? void 0 : _oEntityTypeObject$an2.ApplySupported) {
            oAggregationAnnotationSource = oEntityTypeObject;
          }
        } else {
          // For the time being, we ignore annotations at the container level, until the vocabulary is stabilized
          oAggregationAnnotationSource = this._converterContext.getEntitySet();
        }

        return oAggregationAnnotationSource;
      }
      /**
       * Checks if the entity supports analytical queries.
       *
       * @returns `true` if analytical queries are supported, false otherwise.
       */

    }, {
      key: "isAnalyticsSupported",
      value: function isAnalyticsSupported() {
        return this._bApplySupported;
      }
      /**
       * Checks if a property is groupable.
       *
       * @param property The property to check
       * @returns `undefined` if the entity doesn't support analytical queries, true or false otherwise
       */

    }, {
      key: "isPropertyGroupable",
      value: function isPropertyGroupable(property) {
        if (!this._bApplySupported) {
          return undefined;
        } else if (!this._aGroupableProperties || this._aGroupableProperties.length === 0) {
          // No groupableProperties --> all properties are groupable
          return true;
        } else {
          return this._aGroupableProperties.findIndex(function (path) {
            return path.$target.fullyQualifiedName === property.fullyQualifiedName;
          }) >= 0;
        }
      }
      /**
       * Checks if a property is aggregatable.
       *
       * @param property The property to check
       * @returns `undefined` if the entity doesn't support analytical queries, true or false otherwise
       */

    }, {
      key: "isPropertyAggregatable",
      value: function isPropertyAggregatable(property) {
        if (!this._bApplySupported) {
          return undefined;
        } else {
          // Get the custom aggregates
          var aCustomAggregateAnnotations = this._converterContext.getAnnotationsByTerm("Aggregation", "Org.OData.Aggregation.V1.CustomAggregate", [this._oAggregationAnnotationTarget]); // Check if a custom aggregate has a qualifier that corresponds to the property name


          return aCustomAggregateAnnotations.some(function (annotation) {
            return property.name === annotation.qualifier;
          });
        }
      }
      /**
       * Returns the list of custom aggregate definitions for the entity type.
       *
       * @returns A map (propertyName --> array of context-defining property names) for each custom aggregate corresponding to a property. The array of
       * context-defining property names is empty if the custom aggregate doesn't have any context-defining property.
       */

    }, {
      key: "getCustomAggregateDefinitions",
      value: function getCustomAggregateDefinitions() {
        var _this = this;

        var mDefinitions = {}; // Get the custom aggregates

        var aCustomAggregateAnnotations = this._converterContext.getAnnotationsByTerm("Aggregation", "Org.OData.Aggregation.V1.CustomAggregate", [this._oAggregationAnnotationTarget]);

        aCustomAggregateAnnotations.forEach(function (annotation) {
          // Check if there's a property with the same name as the custom aggregate
          var oAggregatedProperty = _this._entityType.entityProperties.find(function (oProperty) {
            return oProperty.name === annotation.qualifier;
          });

          if (oAggregatedProperty) {
            var _annotation$annotatio, _annotation$annotatio2;

            var aContextDefiningProperties = (_annotation$annotatio = annotation.annotations) === null || _annotation$annotatio === void 0 ? void 0 : (_annotation$annotatio2 = _annotation$annotatio.Aggregation) === null || _annotation$annotatio2 === void 0 ? void 0 : _annotation$annotatio2.ContextDefiningProperties;
            mDefinitions[oAggregatedProperty.name] = aContextDefiningProperties ? aContextDefiningProperties.map(function (oCtxDefProperty) {
              return oCtxDefProperty.value;
            }) : [];
          }
        });
        return mDefinitions;
      }
    }]);

    return AggregationHelper;
  }();

  _exports.AggregationHelper = AggregationHelper;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFnZ3JlZ2F0aW9uLnRzIl0sIm5hbWVzIjpbIkFnZ3JlZ2F0aW9uSGVscGVyIiwiZW50aXR5VHlwZSIsImNvbnZlcnRlckNvbnRleHQiLCJfZW50aXR5VHlwZSIsIl9jb252ZXJ0ZXJDb250ZXh0IiwiX29BZ2dyZWdhdGlvbkFubm90YXRpb25UYXJnZXQiLCJfZGV0ZXJtaW5lQWdncmVnYXRpb25Bbm5vdGF0aW9uVGFyZ2V0Iiwib1RhcmdldEFnZ3JlZ2F0aW9uQW5ub3RhdGlvbnMiLCJfdHlwZSIsImFubm90YXRpb25zIiwiQWdncmVnYXRpb24iLCJfYkFwcGx5U3VwcG9ydGVkIiwiQXBwbHlTdXBwb3J0ZWQiLCJfYUdyb3VwYWJsZVByb3BlcnRpZXMiLCJHcm91cGFibGVQcm9wZXJ0aWVzIiwiYklzUGFyYW1ldGVyaXplZCIsImdldERhdGFNb2RlbE9iamVjdFBhdGgiLCJ0YXJnZXRFbnRpdHlTZXQiLCJDb21tb24iLCJSZXN1bHRDb250ZXh0Iiwib0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblNvdXJjZSIsIm9EYXRhTW9kZWxPYmplY3RQYXRoIiwib05hdmlnYXRpb25Qcm9wZXJ0eU9iamVjdCIsInRhcmdldE9iamVjdCIsIm9FbnRpdHlUeXBlT2JqZWN0IiwidGFyZ2V0RW50aXR5VHlwZSIsImdldEVudGl0eVNldCIsInByb3BlcnR5IiwidW5kZWZpbmVkIiwibGVuZ3RoIiwiZmluZEluZGV4IiwicGF0aCIsIiR0YXJnZXQiLCJmdWxseVF1YWxpZmllZE5hbWUiLCJhQ3VzdG9tQWdncmVnYXRlQW5ub3RhdGlvbnMiLCJnZXRBbm5vdGF0aW9uc0J5VGVybSIsInNvbWUiLCJhbm5vdGF0aW9uIiwibmFtZSIsInF1YWxpZmllciIsIm1EZWZpbml0aW9ucyIsImZvckVhY2giLCJvQWdncmVnYXRlZFByb3BlcnR5IiwiZW50aXR5UHJvcGVydGllcyIsImZpbmQiLCJvUHJvcGVydHkiLCJhQ29udGV4dERlZmluaW5nUHJvcGVydGllcyIsIkNvbnRleHREZWZpbmlu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QW9DLFVBQUFKLFVBQVUsRUFBSTtBQUNqRDtBQUNBLGNBQU1LLG1CQUFtQixHQUFHLEtBQUksQ0FBQ3ZDLFdBQUwsQ0FBaUJ3QyxnQkFBakIsQ0FBa0NDLElBQWxDLENBQXVDLFVBQUFDLFNBQVMsRUFBSTtBQUMvRSxtQkFBT0EsU0FBUyxDQUFDUCxJQUFWLEtBQW1CRCxVQUFVLENBQUNFLFNBQXJDO0FBQ0EsV0FGMkIsQ0FBNUI7O0FBR0EsY0FBSUcsbUJBQUosRUFBeUI7QUFBQTs7QUFDeEIsZ0JBQU1JLDBCQUEwQiw0QkFBR1QsVUFBVSxDQUFDNUIsV0FBZCxvRkFBRyxzQkFBd0JDLFdBQTNCLDJEQUFHLHVCQUFxQ3FDLHlCQUF4RTtBQUVBUCxZQUFBQSxZQUFZLENBQUNFLG1CQUFtQixDQUFDSixJQUFyQixDQUFaLEdBQXlDUSwwQkFBMEIsR0FDaEVBLDBCQUEwQixDQUFDRSxHQUEzQixDQUErQixVQUFBQyxlQUFlLEVBQUk7QUFDbEQscUJBQU9BLGVBQWUsQ0FBQ0MsS0FBdkI7QUFDQyxhQUZELENBRGdFLEdBSWhFLEVBSkg7QUFLQTtBQUNELFNBZEQ7QUFnQkEsZUFBT1YsWUFBUDtBQUNBIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlUeXBlLCBQcm9wZXJ0eSwgRW50aXR5U2V0LCBOYXZpZ2F0aW9uUHJvcGVydHkgfSBmcm9tIFwiQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlclwiO1xuaW1wb3J0IHsgQW5ub3RhdGlvblRlcm0gfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXNcIjtcbmltcG9ydCB7IEFnZ3JlZ2F0aW9uQW5ub3RhdGlvblRlcm1zLCBDdXN0b21BZ2dyZWdhdGUgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9nZW5lcmF0ZWQvQWdncmVnYXRpb25cIjtcbmltcG9ydCB7IFByb3BlcnR5UGF0aCB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy9kaXN0L0VkbVwiO1xuaW1wb3J0IENvbnZlcnRlckNvbnRleHQgZnJvbSBcIi4uL0NvbnZlcnRlckNvbnRleHRcIjtcbmltcG9ydCB7XG5cdENvbGxlY3Rpb25Bbm5vdGF0aW9uc19BZ2dyZWdhdGlvbixcblx0RW50aXR5VHlwZUFubm90YXRpb25zX0FnZ3JlZ2F0aW9uLFxuXHRFbnRpdHlTZXRBbm5vdGF0aW9uc19BZ2dyZWdhdGlvblxufSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvdHlwZXMvZ2VuZXJhdGVkL0FnZ3JlZ2F0aW9uX0VkbVwiO1xuXG4vKipcbiAqIGhlbHBlciBjbGFzcyBmb3IgQWdncmVnYXRpb24gYW5ub3RhdGlvbnMuXG4gKi9cbmV4cG9ydCBjbGFzcyBBZ2dyZWdhdGlvbkhlbHBlciB7XG5cdF9lbnRpdHlUeXBlOiBFbnRpdHlUeXBlO1xuXHRfY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dDtcblx0X2JBcHBseVN1cHBvcnRlZDogYm9vbGVhbjtcblx0X2FHcm91cGFibGVQcm9wZXJ0aWVzPzogUHJvcGVydHlQYXRoW107XG5cdF9vQWdncmVnYXRpb25Bbm5vdGF0aW9uVGFyZ2V0OiBFbnRpdHlUeXBlIHwgRW50aXR5U2V0IHwgTmF2aWdhdGlvblByb3BlcnR5O1xuXG5cdC8qKlxuXHQgKiBDcmVhdGVzIGEgaGVscGVyIGZvciBhIHNwZWNpZmljIGVudGl0eSB0eXBlIGFuZCBhIGNvbnZlcnRlciBjb250ZXh0LlxuXHQgKlxuXHQgKiBAcGFyYW0gZW50aXR5VHlwZSBUaGUgRW50aXR5VHlwZVxuXHQgKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgQ29udmVydGVyQ29udGV4dFxuXHQgKi9cblx0Y29uc3RydWN0b3IoZW50aXR5VHlwZTogRW50aXR5VHlwZSwgY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCkge1xuXHRcdHRoaXMuX2VudGl0eVR5cGUgPSBlbnRpdHlUeXBlO1xuXHRcdHRoaXMuX2NvbnZlcnRlckNvbnRleHQgPSBjb252ZXJ0ZXJDb250ZXh0O1xuXG5cdFx0dGhpcy5fb0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblRhcmdldCA9IHRoaXMuX2RldGVybWluZUFnZ3JlZ2F0aW9uQW5ub3RhdGlvblRhcmdldCgpO1xuXHRcdGxldCBvVGFyZ2V0QWdncmVnYXRpb25Bbm5vdGF0aW9ucztcblx0XHRpZiAodGhpcy5fb0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblRhcmdldD8uX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIpIHtcblx0XHRcdG9UYXJnZXRBZ2dyZWdhdGlvbkFubm90YXRpb25zID0gdGhpcy5fb0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblRhcmdldD8uYW5ub3RhdGlvbnNcblx0XHRcdFx0Py5BZ2dyZWdhdGlvbiBhcyBDb2xsZWN0aW9uQW5ub3RhdGlvbnNfQWdncmVnYXRpb247XG5cdFx0fSBlbHNlIGlmICh0aGlzLl9vQWdncmVnYXRpb25Bbm5vdGF0aW9uVGFyZ2V0Py5fdHlwZSA9PT0gXCJFbnRpdHlUeXBlXCIpIHtcblx0XHRcdG9UYXJnZXRBZ2dyZWdhdGlvbkFubm90YXRpb25zID0gdGhpcy5fb0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblRhcmdldD8uYW5ub3RhdGlvbnNcblx0XHRcdFx0Py5BZ2dyZWdhdGlvbiBhcyBFbnRpdHlUeXBlQW5ub3RhdGlvbnNfQWdncmVnYXRpb247XG5cdFx0fSBlbHNlIGlmICh0aGlzLl9vQWdncmVnYXRpb25Bbm5vdGF0aW9uVGFyZ2V0Py5fdHlwZSA9PT0gXCJFbnRpdHlTZXRcIikge1xuXHRcdFx0b1RhcmdldEFnZ3JlZ2F0aW9uQW5ub3RhdGlvbnMgPSB0aGlzLl9vQWdncmVnYXRpb25Bbm5vdGF0aW9uVGFyZ2V0Py5hbm5vdGF0aW9uc1xuXHRcdFx0XHQ/LkFnZ3JlZ2F0aW9uIGFzIEVudGl0eVNldEFubm90YXRpb25zX0FnZ3JlZ2F0aW9uO1xuXHRcdH1cblx0XHR0aGlzLl9iQXBwbHlTdXBwb3J0ZWQgPSBvVGFyZ2V0QWdncmVnYXRpb25Bbm5vdGF0aW9ucz8uQXBwbHlTdXBwb3J0ZWQgPyB0cnVlIDogZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fYkFwcGx5U3VwcG9ydGVkKSB7XG5cdFx0XHR0aGlzLl9hR3JvdXBhYmxlUHJvcGVydGllcyA9IG9UYXJnZXRBZ2dyZWdhdGlvbkFubm90YXRpb25zPy5BcHBseVN1cHBvcnRlZD8uR3JvdXBhYmxlUHJvcGVydGllcyBhcyBQcm9wZXJ0eVBhdGhbXTtcblx0XHR9XG5cdH1cblx0LyoqXG5cdCAqIERldGVybWluZSB0aGUgbW9zdCBhcHByb3ByaWF0ZSB0YXJnZXQgZm9yIHRoZSBhZ2dyZWdhdGlvbiBhbm5vdGF0aW9ucy5cblx0ICpcblx0ICogQHJldHVybnMgIEVudGl0eVR5cGUgfCBFbnRpdHlTZXQgfCBOYXZpZ2F0aW9uUHJvcGVydHkgd2hlcmUgYWdncmVnYXRpb24gYW5ub3RhdGlvbnMgc2hvdWxkIGJlIGZvdW5kLlxuXHQgKi9cblx0cHJpdmF0ZSBfZGV0ZXJtaW5lQWdncmVnYXRpb25Bbm5vdGF0aW9uVGFyZ2V0KCk6IEVudGl0eVR5cGUgfCBFbnRpdHlTZXQgfCBOYXZpZ2F0aW9uUHJvcGVydHkge1xuXHRcdGNvbnN0IGJJc1BhcmFtZXRlcml6ZWQgPSB0aGlzLl9jb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKT8udGFyZ2V0RW50aXR5U2V0Py5lbnRpdHlUeXBlPy5hbm5vdGF0aW9ucz8uQ29tbW9uXG5cdFx0XHQ/LlJlc3VsdENvbnRleHRcblx0XHRcdD8gdHJ1ZVxuXHRcdFx0OiBmYWxzZTtcblx0XHRsZXQgb0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblNvdXJjZTtcblxuXHRcdC8vIGZpbmQgQXBwbHlTdXBwb3J0ZWRcblx0XHRpZiAoYklzUGFyYW1ldGVyaXplZCkge1xuXHRcdFx0Ly8gaWYgdGhpcyBpcyBhIHBhcmFtZXRlcml6ZWQgdmlldyB0aGVuIGFwcGx5c3VwcG9ydGVkIGNhbiBiZSBmb3VuZCBhdCBlaXRoZXIgdGhlIG5hdlByb3AgcG9pbnRpbmcgdG8gdGhlIHJlc3VsdCBzZXQgb3IgZW50aXR5VHlwZS5cblx0XHRcdC8vIElmIGFwcGx5U3VwcG9ydGVkIGlzIHByZXNlbnQgYXQgYm90aCB0aGUgbmF2UHJvcCBhbmQgdGhlIGVudGl0eVR5cGUgdGhlbiBuYXZQcm9wIGlzIG1vcmUgc3BlY2lmaWMgc28gdGFrZSBhbm5vdGF0aW9ucyBmcm9tIHRoZXJlXG5cdFx0XHQvLyB0YXJnZXRPYmplY3QgaW4gdGhlIGNvbnZlcnRlciBjb250ZXh0IGZvciBhIHBhcmFtZXRlcml6ZWQgdmlldyBpcyB0aGUgbmF2aWdhdGlvbiBwcm9wZXJ0eSBwb2ludGluZyB0byB0aCByZXN1bHQgc2V0XG5cdFx0XHRjb25zdCBvRGF0YU1vZGVsT2JqZWN0UGF0aCA9IHRoaXMuX2NvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpO1xuXHRcdFx0Y29uc3Qgb05hdmlnYXRpb25Qcm9wZXJ0eU9iamVjdCA9IG9EYXRhTW9kZWxPYmplY3RQYXRoPy50YXJnZXRPYmplY3Q7XG5cdFx0XHRjb25zdCBvRW50aXR5VHlwZU9iamVjdCA9IG9EYXRhTW9kZWxPYmplY3RQYXRoPy50YXJnZXRFbnRpdHlUeXBlO1xuXHRcdFx0aWYgKG9OYXZpZ2F0aW9uUHJvcGVydHlPYmplY3Q/LmFubm90YXRpb25zPy5BZ2dyZWdhdGlvbj8uQXBwbHlTdXBwb3J0ZWQpIHtcblx0XHRcdFx0b0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblNvdXJjZSA9IG9OYXZpZ2F0aW9uUHJvcGVydHlPYmplY3Q7XG5cdFx0XHR9IGVsc2UgaWYgKG9FbnRpdHlUeXBlT2JqZWN0Py5hbm5vdGF0aW9ucz8uQWdncmVnYXRpb24/LkFwcGx5U3VwcG9ydGVkKSB7XG5cdFx0XHRcdG9BZ2dyZWdhdGlvbkFubm90YXRpb25Tb3VyY2UgPSBvRW50aXR5VHlwZU9iamVjdDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRm9yIHRoZSB0aW1lIGJlaW5nLCB3ZSBpZ25vcmUgYW5ub3RhdGlvbnMgYXQgdGhlIGNvbnRhaW5lciBsZXZlbCwgdW50aWwgdGhlIHZvY2FidWxhcnkgaXMgc3RhYmlsaXplZFxuXHRcdFx0b0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblNvdXJjZSA9IHRoaXMuX2NvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCk7XG5cdFx0fVxuXHRcdHJldHVybiBvQWdncmVnYXRpb25Bbm5vdGF0aW9uU291cmNlO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyBpZiB0aGUgZW50aXR5IHN1cHBvcnRzIGFuYWx5dGljYWwgcXVlcmllcy5cblx0ICpcblx0ICogQHJldHVybnMgYHRydWVgIGlmIGFuYWx5dGljYWwgcXVlcmllcyBhcmUgc3VwcG9ydGVkLCBmYWxzZSBvdGhlcndpc2UuXG5cdCAqL1xuXHRwdWJsaWMgaXNBbmFseXRpY3NTdXBwb3J0ZWQoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuX2JBcHBseVN1cHBvcnRlZDtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3MgaWYgYSBwcm9wZXJ0eSBpcyBncm91cGFibGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBwcm9wZXJ0eSBUaGUgcHJvcGVydHkgdG8gY2hlY2tcblx0ICogQHJldHVybnMgYHVuZGVmaW5lZGAgaWYgdGhlIGVudGl0eSBkb2Vzbid0IHN1cHBvcnQgYW5hbHl0aWNhbCBxdWVyaWVzLCB0cnVlIG9yIGZhbHNlIG90aGVyd2lzZVxuXHQgKi9cblx0cHVibGljIGlzUHJvcGVydHlHcm91cGFibGUocHJvcGVydHk6IFByb3BlcnR5KTogYm9vbGVhbiB8IHVuZGVmaW5lZCB7XG5cdFx0aWYgKCF0aGlzLl9iQXBwbHlTdXBwb3J0ZWQpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fSBlbHNlIGlmICghdGhpcy5fYUdyb3VwYWJsZVByb3BlcnRpZXMgfHwgdGhpcy5fYUdyb3VwYWJsZVByb3BlcnRpZXMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHQvLyBObyBncm91cGFibGVQcm9wZXJ0aWVzIC0tPiBhbGwgcHJvcGVydGllcyBhcmUgZ3JvdXBhYmxlXG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2FHcm91cGFibGVQcm9wZXJ0aWVzLmZpbmRJbmRleChwYXRoID0+IHBhdGguJHRhcmdldC5mdWxseVF1YWxpZmllZE5hbWUgPT09IHByb3BlcnR5LmZ1bGx5UXVhbGlmaWVkTmFtZSkgPj0gMDtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIGlmIGEgcHJvcGVydHkgaXMgYWdncmVnYXRhYmxlLlxuXHQgKlxuXHQgKiBAcGFyYW0gcHJvcGVydHkgVGhlIHByb3BlcnR5IHRvIGNoZWNrXG5cdCAqIEByZXR1cm5zIGB1bmRlZmluZWRgIGlmIHRoZSBlbnRpdHkgZG9lc24ndCBzdXBwb3J0IGFuYWx5dGljYWwgcXVlcmllcywgdHJ1ZSBvciBmYWxzZSBvdGhlcndpc2Vcblx0ICovXG5cdHB1YmxpYyBpc1Byb3BlcnR5QWdncmVnYXRhYmxlKHByb3BlcnR5OiBQcm9wZXJ0eSk6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuXHRcdGlmICghdGhpcy5fYkFwcGx5U3VwcG9ydGVkKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBHZXQgdGhlIGN1c3RvbSBhZ2dyZWdhdGVzXG5cdFx0XHRjb25zdCBhQ3VzdG9tQWdncmVnYXRlQW5ub3RhdGlvbnM6IEFubm90YXRpb25UZXJtPFxuXHRcdFx0XHRDdXN0b21BZ2dyZWdhdGVcblx0XHRcdD5bXSA9IHRoaXMuX2NvbnZlcnRlckNvbnRleHQuZ2V0QW5ub3RhdGlvbnNCeVRlcm0oXCJBZ2dyZWdhdGlvblwiLCBBZ2dyZWdhdGlvbkFubm90YXRpb25UZXJtcy5DdXN0b21BZ2dyZWdhdGUsIFtcblx0XHRcdFx0dGhpcy5fb0FnZ3JlZ2F0aW9uQW5ub3RhdGlvblRhcmdldFxuXHRcdFx0XSk7XG5cblx0XHRcdC8vIENoZWNrIGlmIGEgY3VzdG9tIGFnZ3JlZ2F0ZSBoYXMgYSBxdWFsaWZpZXIgdGhhdCBjb3JyZXNwb25kcyB0byB0aGUgcHJvcGVydHkgbmFtZVxuXHRcdFx0cmV0dXJuIGFDdXN0b21BZ2dyZWdhdGVBbm5vdGF0aW9ucy5zb21lKGFubm90YXRpb24gPT4ge1xuXHRcdFx0XHRyZXR1cm4gcHJvcGVydHkubmFtZSA9PT0gYW5ub3RhdGlvbi5xdWFsaWZpZXI7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgbGlzdCBvZiBjdXN0b20gYWdncmVnYXRlIGRlZmluaXRpb25zIGZvciB0aGUgZW50aXR5IHR5cGUuXG5cdCAqXG5cdCAqIEByZXR1cm5zIEEgbWFwIChwcm9wZXJ0eU5hbWUgLS0+IGFycmF5IG9mIGNvbnRleHQtZGVmaW5pbmcgcHJvcGVydHkgbmFtZXMpIGZvciBlYWNoIGN1c3RvbSBhZ2dyZWdhdGUgY29ycmVzcG9uZGluZyB0byBhIHByb3BlcnR5LiBUaGUgYXJyYXkgb2Zcblx0ICogY29udGV4dC1kZWZpbmluZyBwcm9wZXJ0eSBuYW1lcyBpcyBlbXB0eSBpZiB0aGUgY3VzdG9tIGFnZ3JlZ2F0ZSBkb2Vzbid0IGhhdmUgYW55IGNvbnRleHQtZGVmaW5pbmcgcHJvcGVydHkuXG5cdCAqL1xuXHRwdWJsaWMgZ2V0Q3VzdG9tQWdncmVnYXRlRGVmaW5pdGlvbnMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nW10+IHtcblx0XHRjb25zdCBtRGVmaW5pdGlvbnM6IFJlY29yZDxzdHJpbmcsIHN0cmluZ1tdPiA9IHt9O1xuXG5cdFx0Ly8gR2V0IHRoZSBjdXN0b20gYWdncmVnYXRlc1xuXHRcdGNvbnN0IGFDdXN0b21BZ2dyZWdhdGVBbm5vdGF0aW9uczogQW5ub3RhdGlvblRlcm08Q3VzdG9tQWdncmVnYXRlPltdID0gdGhpcy5fY29udmVydGVyQ29udGV4dC5nZXRBbm5vdGF0aW9uc0J5VGVybShcblx0XHRcdFwiQWdncmVnYXRpb25cIixcblx0XHRcdEFnZ3JlZ2F0aW9uQW5ub3RhdGlvblRlcm1zLkN1c3RvbUFnZ3JlZ2F0ZSxcblx0XHRcdFt0aGlzLl9vQWdncmVnYXRpb25Bbm5vdGF0aW9uVGFyZ2V0XVxuXHRcdCk7XG5cblx0XHRhQ3VzdG9tQWdncmVnYXRlQW5ub3RhdGlvbnMuZm9yRWFjaChhbm5vdGF0aW9uID0+IHtcblx0XHRcdC8vIENoZWNrIGlmIHRoZXJlJ3MgYSBwcm9wZXJ0eSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgdGhlIGN1c3RvbSBhZ2dyZWdhdGVcblx0XHRcdGNvbnN0IG9BZ2dyZWdhdGVkUHJvcGVydHkgPSB0aGlzLl9lbnRpdHlUeXBlLmVudGl0eVByb3BlcnRpZXMuZmluZChvUHJvcGVydHkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gb1Byb3BlcnR5Lm5hbWUgPT09IGFubm90YXRpb24ucXVhbGlmaWVyO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAob0FnZ3JlZ2F0ZWRQcm9wZXJ0eSkge1xuXHRcdFx0XHRjb25zdCBhQ29udGV4dERlZmluaW5nUHJvcGVydGllcyA9IGFubm90YXRpb24uYW5ub3RhdGlvbnM/LkFnZ3JlZ2F0aW9uPy5Db250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzO1xuXG5cdFx0XHRcdG1EZWZpbml0aW9uc1tvQWdncmVnYXRlZFByb3BlcnR5Lm5hbWVdID0gYUNvbnRleHREZWZpbmluZ1Byb3BlcnRpZXNcblx0XHRcdFx0XHQ/IGFDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzLm1hcChvQ3R4RGVmUHJvcGVydHkgPT4ge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gb0N0eERlZlByb3BlcnR5LnZhbHVlO1xuXHRcdFx0XHRcdCAgfSlcblx0XHRcdFx0XHQ6IFtdO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIG1EZWZpbml0aW9ucztcblx0fVxufVxuIl19