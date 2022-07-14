/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/mdc/condition/Condition", "sap/ui/mdc/enum/ConditionValidated"], function (Condition, ConditionValidated) {
  "use strict";

  var _exports = {};
  var createCondition = Condition.createCondition;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var aValidTypes = ["Edm.Boolean", "Edm.Byte", "Edm.Date", "Edm.DateTime", "Edm.DateTimeOffset", "Edm.Decimal", "Edm.Double", "Edm.Float", "Edm.Guid", "Edm.Int16", "Edm.Int32", "Edm.Int64", "Edm.SByte", "Edm.Single", "Edm.String", "Edm.Time", "Edm.TimeOfDay"];
  var oExcludeMap = {
    "Contains": "NotContains",
    "StartsWith": "NotStartsWith",
    "EndsWith": "NotEndsWith",
    "Empty": "NotEmpty",
    "NotEmpty": "Empty",
    "LE": "NOTLE",
    "GE": "NOTGE",
    "LT": "NOTLT",
    "GT": "NOTGT",
    "BT": "NOTBT",
    "NE": "EQ",
    "EQ": "NE"
  };
  /**
   * Method to get the compliant value type based on the data type.
   *
   * @param  sValue Raw value
   * @param  sType The property type
   * @returns Value to be propagated to the condition.
   */

  function getTypeCompliantValue(sValue, sType) {
    var oValue;

    if (aValidTypes.indexOf(sType) > -1) {
      oValue = sValue;

      if (sType === "Edm.Boolean") {
        oValue = sValue === "true" || (sValue === "false" ? false : undefined);
      } else if (sType === "Edm.Double" || sType === "Edm.Single") {
        oValue = isNaN(sValue) ? undefined : parseFloat(sValue);
      } else if (sType === "Edm.Byte" || sType === "Edm.Int16" || sType === "Edm.Int32" || sType === "Edm.SByte") {
        oValue = isNaN(sValue) ? undefined : parseInt(sValue, 10);
      } else if (sType === "Edm.Date") {
        oValue = sValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/) ? sValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[0] : sValue.match(/^(\d{8})/) && sValue.match(/^(\d{8})/)[0];
      } else if (sType === "Edm.DateTimeOffset") {
        if (sValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})\+(\d{1,4})/)) {
          oValue = sValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})\+(\d{1,4})/)[0];
        } else if (sValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})/)) {
          oValue = sValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})T(\d{1,2}):(\d{1,2}):(\d{1,2})/)[0] + "+0000";
        } else if (sValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)) {
          oValue = sValue.match(/^(\d{4})-(\d{1,2})-(\d{1,2})/)[0] + "T00:00:00+0000";
        } else if (sValue.indexOf("Z") === sValue.length - 1) {
          oValue = sValue.split("Z")[0] + "+0100";
        } else {
          oValue = undefined;
        }
      } else if (sType === "Edm.TimeOfDay") {
        oValue = sValue.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/) ? sValue.match(/(\d{1,2}):(\d{1,2}):(\d{1,2})/)[0] : undefined;
      }
    }

    return oValue;
  }
  /**
   * Method to create a condition.
   * @param  sOption Operator to be used.
   * @param  oV1 Lower value
   * @param  oV2 Higher value
   * @param sSign
   * @returns Condition to be created
   */


  _exports.getTypeCompliantValue = getTypeCompliantValue;

  function resolveConditionValues(sOption, oV1, oV2, sSign) {
    var oValue = oV1,
        oValue2,
        sInternalOperation;
    var oCondition = {};
    oCondition.values = [];
    oCondition.isEmpty = null;

    if (oV1 === undefined || oV1 === null) {
      return;
    }

    switch (sOption) {
      case "CP":
        sInternalOperation = "Contains";

        if (oValue) {
          var nIndexOf = oValue.indexOf("*");
          var nLastIndex = oValue.lastIndexOf("*"); // only when there are '*' at all

          if (nIndexOf > -1) {
            if (nIndexOf === 0 && nLastIndex !== oValue.length - 1) {
              sInternalOperation = "EndsWith";
              oValue = oValue.substring(1, oValue.length);
            } else if (nIndexOf !== 0 && nLastIndex === oValue.length - 1) {
              sInternalOperation = "StartsWith";
              oValue = oValue.substring(0, oValue.length - 1);
            } else {
              oValue = oValue.substring(1, oValue.length - 1);
            }
          } else {
            /* TODO Add diagonostics Log.warning("Contains Option cannot be used without '*'.") */
            return;
          }
        }

        break;

      case "EQ":
        sInternalOperation = oV1 === "" ? "Empty" : sOption;
        break;

      case "NE":
        sInternalOperation = oV1 === "" ? "NotEmpty" : sOption;
        break;

      case "BT":
        if (oV2 === undefined || oV2 === null) {
          return;
        }

        oValue2 = oV2;
        sInternalOperation = sOption;
        break;

      case "LE":
      case "GE":
      case "GT":
      case "LT":
        sInternalOperation = sOption;
        break;

      default:
        /* TODO Add diagonostics Log.warning("Selection Option is not supported : '" + sOption + "'"); */
        return;
    }

    if (sSign === "E") {
      sInternalOperation = oExcludeMap[sInternalOperation];
    }

    oCondition.operator = sInternalOperation;

    if (sInternalOperation !== "Empty") {
      oCondition.values.push(oValue);

      if (oValue2) {
        oCondition.values.push(oValue2);
      }
    }

    return oCondition;
  }
  /* Method to get the operator from the Selection Option */


  _exports.resolveConditionValues = resolveConditionValues;

  function getOperator(sOperator) {
    return sOperator.indexOf("/") > 0 ? sOperator.split("/")[1] : sOperator;
  }

  _exports.getOperator = getOperator;

  function getFiltersConditionsFromSelectionVariant(entityTypeProperties, selectionVariant, getCustomConditions) {
    var ofilterConditions = {};

    if (selectionVariant) {
      var aSelectOptions = selectionVariant.SelectOptions;
      var aValidProperties = entityTypeProperties;
      aSelectOptions === null || aSelectOptions === void 0 ? void 0 : aSelectOptions.forEach(function (selectOption) {
        var propertyName = selectOption.PropertyName;
        var sPropertyName = propertyName.value || propertyName.$PropertyPath;
        var Ranges = selectOption.Ranges;

        for (var key in aValidProperties) {
          if (sPropertyName === key) {
            (function () {
              var oValidProperty = aValidProperties[key];
              var aConditions = [];
              Ranges === null || Ranges === void 0 ? void 0 : Ranges.forEach(function (Range) {
                var oCondition = getCustomConditions ? getCustomConditions(Range, oValidProperty, sPropertyName) : getConditions(Range, oValidProperty);
                aConditions.push(oCondition);

                if (aConditions.length) {
                  ofilterConditions[sPropertyName] = aConditions;
                }
              });
            })();
          }
        }
      });
    }

    return ofilterConditions;
  }

  _exports.getFiltersConditionsFromSelectionVariant = getFiltersConditionsFromSelectionVariant;

  function getConditions(Range, oValidProperty) {
    var oCondition;
    var sign = Range.Sign;
    var sOption = Range.Option ? getOperator(Range.Option) : undefined;
    var oValue1 = getTypeCompliantValue(Range.Low, oValidProperty.$Type);
    var oValue2 = Range.High ? getTypeCompliantValue(Range.High, oValidProperty.$Type) : undefined;
    var oConditionValues = resolveConditionValues(sOption, oValue1, oValue2, sign);

    if (oConditionValues) {
      oCondition = createCondition(oConditionValues.operator, oConditionValues.values, null, null, ConditionValidated.Validated);
    }

    return oCondition;
  }

  _exports.getConditions = getConditions;

  var getDefaultValueFilters = function (oContext, properties) {
    var filterConditions = {};
    var entitySetPath = oContext.getInterface(1).getPath(),
        oMetaModel = oContext.getInterface(1).getModel();

    if (properties) {
      for (var key in properties) {
        var defaultFilterValue = oMetaModel.getObject(entitySetPath + "/" + key + "@com.sap.vocabularies.Common.v1.FilterDefaultValue");

        if (defaultFilterValue !== undefined) {
          var PropertyName = key;
          filterConditions[PropertyName] = [createCondition("EQ", [defaultFilterValue], null, null, ConditionValidated.Validated)];
        }
      }
    }

    return filterConditions;
  };

  var getDefaultSemanticDateFilters = function (oContext, properties, defaultSemanticDates) {
    var filterConditions = {};

    if (properties) {
      for (var key in properties) {
        // currently defaultSemanticDates can support only one entry, we pick the first one directly using 0 index
        if (defaultSemanticDates[key] && defaultSemanticDates[key][0]) {
          filterConditions[key] = [createCondition(defaultSemanticDates[key][0].operator, [], null, null, null)];
        }
      }
    }

    return filterConditions;
  };

  function getEditStatusFilter() {
    var ofilterConditions = {};
    ofilterConditions["$editState"] = [createCondition("DRAFT_EDIT_STATE", ["ALL"], null, null, ConditionValidated.Validated)];
    return ofilterConditions;
  }

  function getFilterConditions(oContext, filterConditions) {
    var _filterConditions, _filterConditions2;

    var editStateFilter;
    var entitySetPath = oContext.getInterface(1).getPath(),
        oMetaModel = oContext.getInterface(1).getModel(),
        entityTypeAnnotations = oMetaModel.getObject(entitySetPath + "@"),
        entityTypeProperties = oMetaModel.getObject(entitySetPath + "/");

    if (entityTypeAnnotations["@com.sap.vocabularies.Common.v1.DraftRoot"] || entityTypeAnnotations["@com.sap.vocabularies.Common.v1.DraftNode"]) {
      editStateFilter = getEditStatusFilter();
    }

    var selectionVariant = (_filterConditions = filterConditions) === null || _filterConditions === void 0 ? void 0 : _filterConditions.selectionVariant;
    var defaultSemanticDates = ((_filterConditions2 = filterConditions) === null || _filterConditions2 === void 0 ? void 0 : _filterConditions2.defaultSemanticDates) || {};
    var defaultFilters = getDefaultValueFilters(oContext, entityTypeProperties);
    var defaultSemanticDateFilters = getDefaultSemanticDateFilters(oContext, entityTypeProperties, defaultSemanticDates);

    if (selectionVariant) {
      filterConditions = getFiltersConditionsFromSelectionVariant(entityTypeProperties, selectionVariant);
    } else if (defaultFilters) {
      filterConditions = defaultFilters;
    }

    if (defaultSemanticDateFilters) {
      // only for semantic date:
      // 1. value from manifest get merged with SV
      // 2. manifest value is given preference when there is same semantic date property in SV and manifest
      filterConditions = _objectSpread({}, filterConditions, {}, defaultSemanticDateFilters);
    }

    if (editStateFilter) {
      filterConditions = _objectSpread({}, filterConditions, {}, editStateFilter);
    }

    return Object.keys(filterConditions).length > 0 ? JSON.stringify(filterConditions) : undefined;
  }

  _exports.getFilterConditions = getFilterConditions;
  getFilterConditions.requiresIContext = true;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpbHRlckhlbHBlci50cyJdLCJuYW1lcyI6WyJhVmFsaWRUeXBlcyIsIm9FeGNsdWRlTWFwIiwiZ2V0VHlwZUNvbXBsaWFudFZhbHVlIiwic1ZhbHVlIiwic1R5cGUiLCJvVmFsdWUiLCJpbmRleE9mIiwidW5kZWZpbmVkIiwiaXNOYU4iLCJwYXJzZUZsb2F0IiwicGFyc2VJbnQiLCJtYXRjaCIsImxlbmd0aCIsInNwbGl0IiwicmVzb2x2ZUNvbmRpdGlvblZhbHVlcyIsInNPcHRpb24iLCJvVjEiLCJvVjIiLCJzU2lnbiIsIm9WYWx1ZTIiLCJzSW50ZXJuYWxPcGVyYXRpb24iLCJvQ29uZGl0aW9uIiwidmFsdWVzIiwiaXNFbXB0eSIsIm5JbmRleE9mIiwibkxhc3RJbmRleCIsImxhc3RJbmRleE9mIiwic3Vic3RyaW5nIiwib3BlcmF0b3IiLCJwdXNoIiwiZ2V0T3BlcmF0b3IiLCJzT3BlcmF0b3IiLCJnZXRGaWx0ZXJzQ29uZGl0aW9uc0Zyb21TZWxlY3Rpb25WYXJpYW50IiwiZW50aXR5VHlwZVByb3BlcnRpZXMiLCJzZWxlY3Rpb25WYXJpYW50IiwiZ2V0Q3VzdG9tQ29uZGl0aW9ucyIsIm9maWx0ZXJDb25kaXRpb25zIiwiYVNlbGVjdE9wdGlvbnMiLCJTZWxlY3RPcHRpb25zIiwiYVZhbGlkUHJvcGVydGllcyIsImZvckVhY2giLCJzZWxlY3RPcHRpb24iLCJwcm9wZXJ0eU5hbWUiLCJQcm9wZXJ0eU5hbWUiLCJzUHJvcGVydHlOYW1lIiwidmFsdWUiLCIkUHJvcGVydHlQYXRoIiwiUmFuZ2VzIiwia2V5Iiwib1ZhbGlkUHJvcGVydHkiLCJhQ29uZGl0aW9ucyIsIlJhbmdlIiwiZ2V0Q29uZGl0aW9ucyIsInNpZ24iLCJTaWduIiwiT3B0aW9uIiwib1ZhbHVlMSIsIkxvdyIsIiRUeXBlIiwiSGlnaCIsIm9Db25kaXRpb25WYWx1ZXMiLCJjcmVhdGVDb25kaXRpb24iLCJDb25kaXRpb25WYWxpZGF0ZWQiLCJWYWxpZGF0ZWQiLCJnZXREZWZhdWx0VmFsdWVGaWx0ZXJzIiwib0NvbnRleHQiLCJwcm9wZXJ0aWVzIiwiZmlsdGVyQ29uZGl0aW9ucyIsImVudGl0eVNldFBhdGgiLCJnZXRJbnRlcmZhY2UiLCJnZXRQYXRoIiwib01ldGFNb2RlbCIsImdldE1vZGVsIiwiZGVmYXVsdEZpbHRlclZhbHVlIiwiZ2V0T2JqZWN0IiwiZ2V0RGVmYXVsdFNlbWFudGljRGF0ZUZpbHRlcnMiLCJkZWZhdWx0U2VtYW50aWNEYXRlcyIsImdldEVkaXRTdGF0dXNGaWx0ZXIiLCJnZXRGaWx0ZXJDb25kaXRpb25zIiwiZWRpdFN0YXRlRmlsdGVyIiwiZW50aXR5VHlwZUFubm90YXRpb25zIiwiZGVmYXVsdEZpbHRlcnMiLCJkZWZhdWx0U2VtYW50aWNEYXRlRmlsdGVycyIsIk9iamVjdCIsImtleXMiLCJKU09OIiwic3RyaW5naWZ5IiwicmVxdWlyZXNJQ29udGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLE1BQU1BLFdBQVcsR0FBRyxDQUNuQixhQURtQixFQUVuQixVQUZtQixFQUduQixVQUhtQixFQUluQixjQUptQixFQUtuQixvQkFMbUIsRUFNbkIsYUFObUIsRUFPbkIsWUFQbUIsRUFRbkIsV0FSbUIsRUFTbkIsVUFUbUIsRUFVbkIsV0FWbUIsRUFXbkIsV0FYbUIsRUFZbkIsV0FabUIsRUFhbkIsV0FibUIsRUFjbkIsWUFkbUIsRUFlbkIsWUFmbUIsRUFnQm5CLFVBaEJtQixFQWlCbkIsZUFqQm1CLENBQXBCO0FBb0JBLE1BQU1DLFdBQWdDLEdBQUc7QUFDeEMsZ0JBQVksYUFENEI7QUFFeEMsa0JBQWMsZUFGMEI7QUFHeEMsZ0JBQVksYUFINEI7QUFJeEMsYUFBUyxVQUorQjtBQUt4QyxnQkFBWSxPQUw0QjtBQU14QyxVQUFNLE9BTmtDO0FBT3hDLFVBQU0sT0FQa0M7QUFReEMsVUFBTSxPQVJrQztBQVN4QyxVQUFNLE9BVGtDO0FBVXhDLFVBQU0sT0FWa0M7QUFXeEMsVUFBTSxJQVhrQztBQVl4QyxVQUFNO0FBWmtDLEdBQXpDO0FB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dGVudCI6WyJpbXBvcnQgeyBTZWxlY3RPcHRpb25UeXBlLCBTZWxlY3Rpb25WYXJpYW50VHlwZVR5cGVzIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzL2Rpc3QvZ2VuZXJhdGVkL1VJXCI7XG5pbXBvcnQgeyBjcmVhdGVDb25kaXRpb24gfSBmcm9tIFwic2FwL3VpL21kYy9jb25kaXRpb24vQ29uZGl0aW9uXCI7XG5pbXBvcnQgeyBDb25kaXRpb25WYWxpZGF0ZWQgfSBmcm9tIFwic2FwL3VpL21kYy9lbnVtXCI7XG5cbmV4cG9ydCB0eXBlIEZpbHRlckNvbmRpdGlvbnMgPSB7XG5cdG9wZXJhdG9yOiBzdHJpbmc7XG5cdHZhbHVlczogQXJyYXk8c3RyaW5nPjtcblx0aXNFbXB0eT86IGJvb2xlYW4gfCBudWxsO1xuXHR2YWxpZGF0ZWQ/OiBzdHJpbmc7XG59O1xuXG5jb25zdCBhVmFsaWRUeXBlcyA9IFtcblx0XCJFZG0uQm9vbGVhblwiLFxuXHRcIkVkbS5CeXRlXCIsXG5cdFwiRWRtLkRhdGVcIixcblx0XCJFZG0uRGF0ZVRpbWVcIixcblx0XCJFZG0uRGF0ZVRpbWVPZmZzZXRcIixcblx0XCJFZG0uRGVjaW1hbFwiLFxuXHRcIkVkbS5Eb3VibGVcIixcblx0XCJFZG0uRmxvYXRcIixcblx0XCJFZG0uR3VpZFwiLFxuXHRcIkVkbS5JbnQxNlwiLFxuXHRcIkVkbS5JbnQzMlwiLFxuXHRcIkVkbS5JbnQ2NFwiLFxuXHRcIkVkbS5TQnl0ZVwiLFxuXHRcIkVkbS5TaW5nbGVcIixcblx0XCJFZG0uU3RyaW5nXCIsXG5cdFwiRWRtLlRpbWVcIixcblx0XCJFZG0uVGltZU9mRGF5XCJcbl07XG5cbmNvbnN0IG9FeGNsdWRlTWFwOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge1xuXHRcIkNvbnRhaW5zXCI6IFwiTm90Q29udGFpbnNcIixcblx0XCJTdGFydHNXaXRoXCI6IFwiTm90U3RhcnRzV2l0aFwiLFxuXHRcIkVuZHNXaXRoXCI6IFwiTm90RW5kc1dpdGhcIixcblx0XCJFbXB0eVwiOiBcIk5vdEVtcHR5XCIsXG5cdFwiTm90RW1wdHlcIjogXCJFbXB0eVwiLFxuXHRcIkxFXCI6IFwiTk9UTEVcIixcblx0XCJHRVwiOiBcIk5PVEdFXCIsXG5cdFwiTFRcIjogXCJOT1RMVFwiLFxuXHRcIkdUXCI6IFwiTk9UR1RcIixcblx0XCJCVFwiOiBcIk5PVEJUXCIsXG5cdFwiTkVcIjogXCJFUVwiLFxuXHRcIkVRXCI6IFwiTkVcIlxufTtcblxuLyoqXG4gKiBNZXRob2QgdG8gZ2V0IHRoZSBjb21wbGlhbnQgdmFsdWUgdHlwZSBiYXNlZCBvbiB0aGUgZGF0YSB0eXBlLlxuICpcbiAqIEBwYXJhbSAgc1ZhbHVlIFJhdyB2YWx1ZVxuICogQHBhcmFtICBzVHlwZSBUaGUgcHJvcGVydHkgdHlwZVxuICogQHJldHVybnMgVmFsdWUgdG8gYmUgcHJvcGFnYXRlZCB0byB0aGUgY29uZGl0aW9uLlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUeXBlQ29tcGxpYW50VmFsdWUoc1ZhbHVlOiBhbnksIHNUeXBlOiBzdHJpbmcpIHtcblx0bGV0IG9WYWx1ZTtcblx0aWYgKGFWYWxpZFR5cGVzLmluZGV4T2Yoc1R5cGUpID4gLTEpIHtcblx0XHRvVmFsdWUgPSBzVmFsdWU7XG5cdFx0aWYgKHNUeXBlID09PSBcIkVkbS5Cb29sZWFuXCIpIHtcblx0XHRcdG9WYWx1ZSA9IHNWYWx1ZSA9PT0gXCJ0cnVlXCIgfHwgKHNWYWx1ZSA9PT0gXCJmYWxzZVwiID8gZmFsc2UgOiB1bmRlZmluZWQpO1xuXHRcdH0gZWxzZSBpZiAoc1R5cGUgPT09IFwiRWRtLkRvdWJsZVwiIHx8IHNUeXBlID09PSBcIkVkbS5TaW5nbGVcIikge1xuXHRcdFx0b1ZhbHVlID0gaXNOYU4oc1ZhbHVlKSA/IHVuZGVmaW5lZCA6IHBhcnNlRmxvYXQoc1ZhbHVlKTtcblx0XHR9IGVsc2UgaWYgKHNUeXBlID09PSBcIkVkbS5CeXRlXCIgfHwgc1R5cGUgPT09IFwiRWRtLkludDE2XCIgfHwgc1R5cGUgPT09IFwiRWRtLkludDMyXCIgfHwgc1R5cGUgPT09IFwiRWRtLlNCeXRlXCIpIHtcblx0XHRcdG9WYWx1ZSA9IGlzTmFOKHNWYWx1ZSkgPyB1bmRlZmluZWQgOiBwYXJzZUludChzVmFsdWUsIDEwKTtcblx0XHR9IGVsc2UgaWYgKHNUeXBlID09PSBcIkVkbS5EYXRlXCIpIHtcblx0XHRcdG9WYWx1ZSA9IHNWYWx1ZS5tYXRjaCgvXihcXGR7NH0pLShcXGR7MSwyfSktKFxcZHsxLDJ9KS8pXG5cdFx0XHRcdD8gc1ZhbHVlLm1hdGNoKC9eKFxcZHs0fSktKFxcZHsxLDJ9KS0oXFxkezEsMn0pLylbMF1cblx0XHRcdFx0OiBzVmFsdWUubWF0Y2goL14oXFxkezh9KS8pICYmIHNWYWx1ZS5tYXRjaCgvXihcXGR7OH0pLylbMF07XG5cdFx0fSBlbHNlIGlmIChzVHlwZSA9PT0gXCJFZG0uRGF0ZVRpbWVPZmZzZXRcIikge1xuXHRcdFx0aWYgKHNWYWx1ZS5tYXRjaCgvXihcXGR7NH0pLShcXGR7MSwyfSktKFxcZHsxLDJ9KVQoXFxkezEsMn0pOihcXGR7MSwyfSk6KFxcZHsxLDJ9KVxcKyhcXGR7MSw0fSkvKSkge1xuXHRcdFx0XHRvVmFsdWUgPSBzVmFsdWUubWF0Y2goL14oXFxkezR9KS0oXFxkezEsMn0pLShcXGR7MSwyfSlUKFxcZHsxLDJ9KTooXFxkezEsMn0pOihcXGR7MSwyfSlcXCsoXFxkezEsNH0pLylbMF07XG5cdFx0XHR9IGVsc2UgaWYgKHNWYWx1ZS5tYXRjaCgvXihcXGR7NH0pLShcXGR7MSwyfSktKFxcZHsxLDJ9KVQoXFxkezEsMn0pOihcXGR7MSwyfSk6KFxcZHsxLDJ9KS8pKSB7XG5cdFx0XHRcdG9WYWx1ZSA9IHNWYWx1ZS5tYXRjaCgvXihcXGR7NH0pLShcXGR7MSwyfSktKFxcZHsxLDJ9KVQoXFxkezEsMn0pOihcXGR7MSwyfSk6KFxcZHsxLDJ9KS8pWzBdICsgXCIrMDAwMFwiO1xuXHRcdFx0fSBlbHNlIGlmIChzVmFsdWUubWF0Y2goL14oXFxkezR9KS0oXFxkezEsMn0pLShcXGR7MSwyfSkvKSkge1xuXHRcdFx0XHRvVmFsdWUgPSBzVmFsdWUubWF0Y2goL14oXFxkezR9KS0oXFxkezEsMn0pLShcXGR7MSwyfSkvKVswXSArIFwiVDAwOjAwOjAwKzAwMDBcIjtcblx0XHRcdH0gZWxzZSBpZiAoc1ZhbHVlLmluZGV4T2YoXCJaXCIpID09PSBzVmFsdWUubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRvVmFsdWUgPSBzVmFsdWUuc3BsaXQoXCJaXCIpWzBdICsgXCIrMDEwMFwiO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b1ZhbHVlID0gdW5kZWZpbmVkO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSBpZiAoc1R5cGUgPT09IFwiRWRtLlRpbWVPZkRheVwiKSB7XG5cdFx0XHRvVmFsdWUgPSBzVmFsdWUubWF0Y2goLyhcXGR7MSwyfSk6KFxcZHsxLDJ9KTooXFxkezEsMn0pLykgPyBzVmFsdWUubWF0Y2goLyhcXGR7MSwyfSk6KFxcZHsxLDJ9KTooXFxkezEsMn0pLylbMF0gOiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBvVmFsdWU7XG59XG5cbi8qKlxuICogTWV0aG9kIHRvIGNyZWF0ZSBhIGNvbmRpdGlvbi5cbiAqIEBwYXJhbSAgc09wdGlvbiBPcGVyYXRvciB0byBiZSB1c2VkLlxuICogQHBhcmFtICBvVjEgTG93ZXIgdmFsdWVcbiAqIEBwYXJhbSAgb1YyIEhpZ2hlciB2YWx1ZVxuICogQHBhcmFtIHNTaWduXG4gKiBAcmV0dXJucyBDb25kaXRpb24gdG8gYmUgY3JlYXRlZFxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVzb2x2ZUNvbmRpdGlvblZhbHVlcyhzT3B0aW9uOiBzdHJpbmcgfCB1bmRlZmluZWQsIG9WMTogYW55LCBvVjI6IGFueSwgc1NpZ246IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuXHRsZXQgb1ZhbHVlID0gb1YxLFxuXHRcdG9WYWx1ZTIsXG5cdFx0c0ludGVybmFsT3BlcmF0aW9uOiBhbnk7XG5cdGNvbnN0IG9Db25kaXRpb246IFJlY29yZDxzdHJpbmcsIEZpbHRlckNvbmRpdGlvbnNbXT4gPSB7fTtcblx0b0NvbmRpdGlvbi52YWx1ZXMgPSBbXTtcblx0b0NvbmRpdGlvbi5pc0VtcHR5ID0gbnVsbCBhcyBhbnk7XG5cdGlmIChvVjEgPT09IHVuZGVmaW5lZCB8fCBvVjEgPT09IG51bGwpIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRzd2l0Y2ggKHNPcHRpb24pIHtcblx0XHRjYXNlIFwiQ1BcIjpcblx0XHRcdHNJbnRlcm5hbE9wZXJhdGlvbiA9IFwiQ29udGFpbnNcIjtcblx0XHRcdGlmIChvVmFsdWUpIHtcblx0XHRcdFx0Y29uc3QgbkluZGV4T2YgPSBvVmFsdWUuaW5kZXhPZihcIipcIik7XG5cdFx0XHRcdGNvbnN0IG5MYXN0SW5kZXggPSBvVmFsdWUubGFzdEluZGV4T2YoXCIqXCIpO1xuXG5cdFx0XHRcdC8vIG9ubHkgd2hlbiB0aGVyZSBhcmUgJyonIGF0IGFsbFxuXHRcdFx0XHRpZiAobkluZGV4T2YgPiAtMSkge1xuXHRcdFx0XHRcdGlmIChuSW5kZXhPZiA9PT0gMCAmJiBuTGFzdEluZGV4ICE9PSBvVmFsdWUubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRcdFx0c0ludGVybmFsT3BlcmF0aW9uID0gXCJFbmRzV2l0aFwiO1xuXHRcdFx0XHRcdFx0b1ZhbHVlID0gb1ZhbHVlLnN1YnN0cmluZygxLCBvVmFsdWUubGVuZ3RoKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKG5JbmRleE9mICE9PSAwICYmIG5MYXN0SW5kZXggPT09IG9WYWx1ZS5sZW5ndGggLSAxKSB7XG5cdFx0XHRcdFx0XHRzSW50ZXJuYWxPcGVyYXRpb24gPSBcIlN0YXJ0c1dpdGhcIjtcblx0XHRcdFx0XHRcdG9WYWx1ZSA9IG9WYWx1ZS5zdWJzdHJpbmcoMCwgb1ZhbHVlLmxlbmd0aCAtIDEpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRvVmFsdWUgPSBvVmFsdWUuc3Vic3RyaW5nKDEsIG9WYWx1ZS5sZW5ndGggLSAxKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0LyogVE9ETyBBZGQgZGlhZ29ub3N0aWNzIExvZy53YXJuaW5nKFwiQ29udGFpbnMgT3B0aW9uIGNhbm5vdCBiZSB1c2VkIHdpdGhvdXQgJyonLlwiKSAqL1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkVRXCI6XG5cdFx0XHRzSW50ZXJuYWxPcGVyYXRpb24gPSBvVjEgPT09IFwiXCIgPyBcIkVtcHR5XCIgOiBzT3B0aW9uO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIk5FXCI6XG5cdFx0XHRzSW50ZXJuYWxPcGVyYXRpb24gPSBvVjEgPT09IFwiXCIgPyBcIk5vdEVtcHR5XCIgOiBzT3B0aW9uO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkJUXCI6XG5cdFx0XHRpZiAob1YyID09PSB1bmRlZmluZWQgfHwgb1YyID09PSBudWxsKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdG9WYWx1ZTIgPSBvVjI7XG5cdFx0XHRzSW50ZXJuYWxPcGVyYXRpb24gPSBzT3B0aW9uO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkxFXCI6XG5cdFx0Y2FzZSBcIkdFXCI6XG5cdFx0Y2FzZSBcIkdUXCI6XG5cdFx0Y2FzZSBcIkxUXCI6XG5cdFx0XHRzSW50ZXJuYWxPcGVyYXRpb24gPSBzT3B0aW9uO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdC8qIFRPRE8gQWRkIGRpYWdvbm9zdGljcyBMb2cud2FybmluZyhcIlNlbGVjdGlvbiBPcHRpb24gaXMgbm90IHN1cHBvcnRlZCA6ICdcIiArIHNPcHRpb24gKyBcIidcIik7ICovXG5cdFx0XHRyZXR1cm47XG5cdH1cblx0aWYgKHNTaWduID09PSBcIkVcIikge1xuXHRcdHNJbnRlcm5hbE9wZXJhdGlvbiA9IG9FeGNsdWRlTWFwW3NJbnRlcm5hbE9wZXJhdGlvbl07XG5cdH1cblx0b0NvbmRpdGlvbi5vcGVyYXRvciA9IHNJbnRlcm5hbE9wZXJhdGlvbjtcblx0aWYgKHNJbnRlcm5hbE9wZXJhdGlvbiAhPT0gXCJFbXB0eVwiKSB7XG5cdFx0b0NvbmRpdGlvbi52YWx1ZXMucHVzaChvVmFsdWUpO1xuXHRcdGlmIChvVmFsdWUyKSB7XG5cdFx0XHRvQ29uZGl0aW9uLnZhbHVlcy5wdXNoKG9WYWx1ZTIpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gb0NvbmRpdGlvbjtcbn1cblxuLyogTWV0aG9kIHRvIGdldCB0aGUgb3BlcmF0b3IgZnJvbSB0aGUgU2VsZWN0aW9uIE9wdGlvbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldE9wZXJhdG9yKHNPcGVyYXRvcjogc3RyaW5nKTogc3RyaW5nIHtcblx0cmV0dXJuIHNPcGVyYXRvci5pbmRleE9mKFwiL1wiKSA+IDAgPyBzT3BlcmF0b3Iuc3BsaXQoXCIvXCIpWzFdIDogc09wZXJhdG9yO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyc0NvbmRpdGlvbnNGcm9tU2VsZWN0aW9uVmFyaWFudChcblx0ZW50aXR5VHlwZVByb3BlcnRpZXM6IFJlY29yZDxzdHJpbmcsIG9iamVjdD4sXG5cdHNlbGVjdGlvblZhcmlhbnQ6IFNlbGVjdGlvblZhcmlhbnRUeXBlVHlwZXMsXG5cdGdldEN1c3RvbUNvbmRpdGlvbnM/OiBGdW5jdGlvblxuKTogUmVjb3JkPHN0cmluZywgRmlsdGVyQ29uZGl0aW9uc1tdPiB7XG5cdGNvbnN0IG9maWx0ZXJDb25kaXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBGaWx0ZXJDb25kaXRpb25zW10+ID0ge307XG5cdGlmIChzZWxlY3Rpb25WYXJpYW50KSB7XG5cdFx0Y29uc3QgYVNlbGVjdE9wdGlvbnMgPSBzZWxlY3Rpb25WYXJpYW50LlNlbGVjdE9wdGlvbnM7XG5cdFx0Y29uc3QgYVZhbGlkUHJvcGVydGllcyA9IGVudGl0eVR5cGVQcm9wZXJ0aWVzO1xuXHRcdGFTZWxlY3RPcHRpb25zPy5mb3JFYWNoKChzZWxlY3RPcHRpb246IFNlbGVjdE9wdGlvblR5cGUpID0+IHtcblx0XHRcdGNvbnN0IHByb3BlcnR5TmFtZTogYW55ID0gc2VsZWN0T3B0aW9uLlByb3BlcnR5TmFtZTtcblx0XHRcdGNvbnN0IHNQcm9wZXJ0eU5hbWU6IHN0cmluZyA9IHByb3BlcnR5TmFtZS52YWx1ZSB8fCBwcm9wZXJ0eU5hbWUuJFByb3BlcnR5UGF0aDtcblx0XHRcdGNvbnN0IFJhbmdlczogYW55ID0gc2VsZWN0T3B0aW9uLlJhbmdlcztcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIGFWYWxpZFByb3BlcnRpZXMpIHtcblx0XHRcdFx0aWYgKHNQcm9wZXJ0eU5hbWUgPT09IGtleSkge1xuXHRcdFx0XHRcdGNvbnN0IG9WYWxpZFByb3BlcnR5ID0gYVZhbGlkUHJvcGVydGllc1trZXldIGFzIGFueTtcblx0XHRcdFx0XHRjb25zdCBhQ29uZGl0aW9uczogYW55W10gPSBbXTtcblx0XHRcdFx0XHRSYW5nZXM/LmZvckVhY2goKFJhbmdlOiBhbnkpID0+IHtcblx0XHRcdFx0XHRcdGNvbnN0IG9Db25kaXRpb24gPSBnZXRDdXN0b21Db25kaXRpb25zXG5cdFx0XHRcdFx0XHRcdD8gZ2V0Q3VzdG9tQ29uZGl0aW9ucyhSYW5nZSwgb1ZhbGlkUHJvcGVydHksIHNQcm9wZXJ0eU5hbWUpXG5cdFx0XHRcdFx0XHRcdDogZ2V0Q29uZGl0aW9ucyhSYW5nZSwgb1ZhbGlkUHJvcGVydHkpO1xuXHRcdFx0XHRcdFx0YUNvbmRpdGlvbnMucHVzaChvQ29uZGl0aW9uKTtcblx0XHRcdFx0XHRcdGlmIChhQ29uZGl0aW9ucy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0b2ZpbHRlckNvbmRpdGlvbnNbc1Byb3BlcnR5TmFtZV0gPSBhQ29uZGl0aW9ucztcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBvZmlsdGVyQ29uZGl0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbmRpdGlvbnMoUmFuZ2U6IGFueSwgb1ZhbGlkUHJvcGVydHk6IGFueSkge1xuXHRsZXQgb0NvbmRpdGlvbjtcblx0Y29uc3Qgc2lnbjogc3RyaW5nIHwgdW5kZWZpbmVkID0gUmFuZ2UuU2lnbjtcblx0Y29uc3Qgc09wdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkID0gUmFuZ2UuT3B0aW9uID8gZ2V0T3BlcmF0b3IoUmFuZ2UuT3B0aW9uKSA6IHVuZGVmaW5lZDtcblx0Y29uc3Qgb1ZhbHVlMTogYW55ID0gZ2V0VHlwZUNvbXBsaWFudFZhbHVlKFJhbmdlLkxvdywgb1ZhbGlkUHJvcGVydHkuJFR5cGUpO1xuXHRjb25zdCBvVmFsdWUyOiBhbnkgPSBSYW5nZS5IaWdoID8gZ2V0VHlwZUNvbXBsaWFudFZhbHVlKFJhbmdlLkhpZ2gsIG9WYWxpZFByb3BlcnR5LiRUeXBlKSA6IHVuZGVmaW5lZDtcblx0Y29uc3Qgb0NvbmRpdGlvblZhbHVlcyA9IHJlc29sdmVDb25kaXRpb25WYWx1ZXMoc09wdGlvbiwgb1ZhbHVlMSwgb1ZhbHVlMiwgc2lnbikgYXMgYW55O1xuXHRpZiAob0NvbmRpdGlvblZhbHVlcykge1xuXHRcdG9Db25kaXRpb24gPSBjcmVhdGVDb25kaXRpb24ob0NvbmRpdGlvblZhbHVlcy5vcGVyYXRvciwgb0NvbmRpdGlvblZhbHVlcy52YWx1ZXMsIG51bGwsIG51bGwsIENvbmRpdGlvblZhbGlkYXRlZC5WYWxpZGF0ZWQpO1xuXHR9XG5cdHJldHVybiBvQ29uZGl0aW9uO1xufVxuXG5jb25zdCBnZXREZWZhdWx0VmFsdWVGaWx0ZXJzID0gZnVuY3Rpb24ob0NvbnRleHQ6IGFueSwgcHJvcGVydGllczogYW55KTogUmVjb3JkPHN0cmluZywgRmlsdGVyQ29uZGl0aW9uc1tdPiB7XG5cdGNvbnN0IGZpbHRlckNvbmRpdGlvbnM6IFJlY29yZDxzdHJpbmcsIEZpbHRlckNvbmRpdGlvbnNbXT4gPSB7fTtcblx0Y29uc3QgZW50aXR5U2V0UGF0aCA9IG9Db250ZXh0LmdldEludGVyZmFjZSgxKS5nZXRQYXRoKCksXG5cdFx0b01ldGFNb2RlbCA9IG9Db250ZXh0LmdldEludGVyZmFjZSgxKS5nZXRNb2RlbCgpO1xuXHRpZiAocHJvcGVydGllcykge1xuXHRcdGZvciAoY29uc3Qga2V5IGluIHByb3BlcnRpZXMpIHtcblx0XHRcdGNvbnN0IGRlZmF1bHRGaWx0ZXJWYWx1ZSA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KFxuXHRcdFx0XHRlbnRpdHlTZXRQYXRoICsgXCIvXCIgKyBrZXkgKyBcIkBjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuRmlsdGVyRGVmYXVsdFZhbHVlXCJcblx0XHRcdCk7XG5cdFx0XHRpZiAoZGVmYXVsdEZpbHRlclZhbHVlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0Y29uc3QgUHJvcGVydHlOYW1lID0ga2V5O1xuXHRcdFx0XHRmaWx0ZXJDb25kaXRpb25zW1Byb3BlcnR5TmFtZV0gPSBbXG5cdFx0XHRcdFx0Y3JlYXRlQ29uZGl0aW9uKFwiRVFcIiwgW2RlZmF1bHRGaWx0ZXJWYWx1ZV0sIG51bGwsIG51bGwsIENvbmRpdGlvblZhbGlkYXRlZC5WYWxpZGF0ZWQpIGFzIEZpbHRlckNvbmRpdGlvbnNcblx0XHRcdFx0XTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGZpbHRlckNvbmRpdGlvbnM7XG59O1xuXG5jb25zdCBnZXREZWZhdWx0U2VtYW50aWNEYXRlRmlsdGVycyA9IGZ1bmN0aW9uKFxuXHRvQ29udGV4dDogYW55LFxuXHRwcm9wZXJ0aWVzOiBhbnksXG5cdGRlZmF1bHRTZW1hbnRpY0RhdGVzOiBhbnlcbik6IFJlY29yZDxzdHJpbmcsIEZpbHRlckNvbmRpdGlvbnNbXT4ge1xuXHRjb25zdCBmaWx0ZXJDb25kaXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBGaWx0ZXJDb25kaXRpb25zW10+ID0ge307XG5cdGlmIChwcm9wZXJ0aWVzKSB7XG5cdFx0Zm9yIChjb25zdCBrZXkgaW4gcHJvcGVydGllcykge1xuXHRcdFx0Ly8gY3VycmVudGx5IGRlZmF1bHRTZW1hbnRpY0RhdGVzIGNhbiBzdXBwb3J0IG9ubHkgb25lIGVudHJ5LCB3ZSBwaWNrIHRoZSBmaXJzdCBvbmUgZGlyZWN0bHkgdXNpbmcgMCBpbmRleFxuXHRcdFx0aWYgKGRlZmF1bHRTZW1hbnRpY0RhdGVzW2tleV0gJiYgZGVmYXVsdFNlbWFudGljRGF0ZXNba2V5XVswXSkge1xuXHRcdFx0XHRmaWx0ZXJDb25kaXRpb25zW2tleV0gPSBbY3JlYXRlQ29uZGl0aW9uKGRlZmF1bHRTZW1hbnRpY0RhdGVzW2tleV1bMF0ub3BlcmF0b3IsIFtdLCBudWxsLCBudWxsLCBudWxsKSBhcyBGaWx0ZXJDb25kaXRpb25zXTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGZpbHRlckNvbmRpdGlvbnM7XG59O1xuXG5mdW5jdGlvbiBnZXRFZGl0U3RhdHVzRmlsdGVyKCk6IFJlY29yZDxzdHJpbmcsIEZpbHRlckNvbmRpdGlvbnNbXT4ge1xuXHRjb25zdCBvZmlsdGVyQ29uZGl0aW9uczogUmVjb3JkPHN0cmluZywgRmlsdGVyQ29uZGl0aW9uc1tdPiA9IHt9O1xuXHRvZmlsdGVyQ29uZGl0aW9uc1tcIiRlZGl0U3RhdGVcIl0gPSBbXG5cdFx0Y3JlYXRlQ29uZGl0aW9uKFwiRFJBRlRfRURJVF9TVEFURVwiLCBbXCJBTExcIl0sIG51bGwsIG51bGwsIENvbmRpdGlvblZhbGlkYXRlZC5WYWxpZGF0ZWQpIGFzIEZpbHRlckNvbmRpdGlvbnNcblx0XTtcblx0cmV0dXJuIG9maWx0ZXJDb25kaXRpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RmlsdGVyQ29uZGl0aW9ucyhvQ29udGV4dDogYW55LCBmaWx0ZXJDb25kaXRpb25zOiBhbnkpOiBSZWNvcmQ8c3RyaW5nLCBGaWx0ZXJDb25kaXRpb25zW10+IHtcblx0bGV0IGVkaXRTdGF0ZUZpbHRlcjtcblx0Y29uc3QgZW50aXR5U2V0UGF0aCA9IG9Db250ZXh0LmdldEludGVyZmFjZSgxKS5nZXRQYXRoKCksXG5cdFx0b01ldGFNb2RlbCA9IG9Db250ZXh0LmdldEludGVyZmFjZSgxKS5nZXRNb2RlbCgpLFxuXHRcdGVudGl0eVR5cGVBbm5vdGF0aW9ucyA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KGVudGl0eVNldFBhdGggKyBcIkBcIiksXG5cdFx0ZW50aXR5VHlwZVByb3BlcnRpZXMgPSBvTWV0YU1vZGVsLmdldE9iamVjdChlbnRpdHlTZXRQYXRoICsgXCIvXCIpO1xuXHRpZiAoXG5cdFx0ZW50aXR5VHlwZUFubm90YXRpb25zW1wiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5EcmFmdFJvb3RcIl0gfHxcblx0XHRlbnRpdHlUeXBlQW5ub3RhdGlvbnNbXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLkRyYWZ0Tm9kZVwiXVxuXHQpIHtcblx0XHRlZGl0U3RhdGVGaWx0ZXIgPSBnZXRFZGl0U3RhdHVzRmlsdGVyKCk7XG5cdH1cblx0Y29uc3Qgc2VsZWN0aW9uVmFyaWFudCA9IGZpbHRlckNvbmRpdGlvbnM/LnNlbGVjdGlvblZhcmlhbnQ7XG5cdGNvbnN0IGRlZmF1bHRTZW1hbnRpY0RhdGVzID0gZmlsdGVyQ29uZGl0aW9ucz8uZGVmYXVsdFNlbWFudGljRGF0ZXMgfHwge307XG5cdGNvbnN0IGRlZmF1bHRGaWx0ZXJzID0gZ2V0RGVmYXVsdFZhbHVlRmlsdGVycyhvQ29udGV4dCwgZW50aXR5VHlwZVByb3BlcnRpZXMpO1xuXHRjb25zdCBkZWZhdWx0U2VtYW50aWNEYXRlRmlsdGVycyA9IGdldERlZmF1bHRTZW1hbnRpY0RhdGVGaWx0ZXJzKG9Db250ZXh0LCBlbnRpdHlUeXBlUHJvcGVydGllcywgZGVmYXVsdFNlbWFudGljRGF0ZXMpO1xuXHRpZiAoc2VsZWN0aW9uVmFyaWFudCkge1xuXHRcdGZpbHRlckNvbmRpdGlvbnMgPSBnZXRGaWx0ZXJzQ29uZGl0aW9uc0Zyb21TZWxlY3Rpb25WYXJpYW50KGVudGl0eVR5cGVQcm9wZXJ0aWVzLCBzZWxlY3Rpb25WYXJpYW50KTtcblx0fSBlbHNlIGlmIChkZWZhdWx0RmlsdGVycykge1xuXHRcdGZpbHRlckNvbmRpdGlvbnMgPSBkZWZhdWx0RmlsdGVycztcblx0fVxuXHRpZiAoZGVmYXVsdFNlbWFudGljRGF0ZUZpbHRlcnMpIHtcblx0XHQvLyBvbmx5IGZvciBzZW1hbnRpYyBkYXRlOlxuXHRcdC8vIDEuIHZhbHVlIGZyb20gbWFuaWZlc3QgZ2V0IG1lcmdlZCB3aXRoIFNWXG5cdFx0Ly8gMi4gbWFuaWZlc3QgdmFsdWUgaXMgZ2l2ZW4gcHJlZmVyZW5jZSB3aGVuIHRoZXJlIGlzIHNhbWUgc2VtYW50aWMgZGF0ZSBwcm9wZXJ0eSBpbiBTViBhbmQgbWFuaWZlc3Rcblx0XHRmaWx0ZXJDb25kaXRpb25zID0geyAuLi5maWx0ZXJDb25kaXRpb25zLCAuLi5kZWZhdWx0U2VtYW50aWNEYXRlRmlsdGVycyB9O1xuXHR9XG5cdGlmIChlZGl0U3RhdGVGaWx0ZXIpIHtcblx0XHRmaWx0ZXJDb25kaXRpb25zID0geyAuLi5maWx0ZXJDb25kaXRpb25zLCAuLi5lZGl0U3RhdGVGaWx0ZXIgfTtcblx0fVxuXHRyZXR1cm4gKE9iamVjdC5rZXlzKGZpbHRlckNvbmRpdGlvbnMpLmxlbmd0aCA+IDAgPyBKU09OLnN0cmluZ2lmeShmaWx0ZXJDb25kaXRpb25zKSA6IHVuZGVmaW5lZCkgYXMgYW55O1xufVxuXG5nZXRGaWx0ZXJDb25kaXRpb25zLnJlcXVpcmVzSUNvbnRleHQgPSB0cnVlO1xuIl19