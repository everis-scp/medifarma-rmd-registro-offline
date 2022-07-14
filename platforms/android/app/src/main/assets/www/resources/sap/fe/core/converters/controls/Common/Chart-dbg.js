/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../ManifestSettings", "sap/fe/core/converters/controls/Common/Action", "sap/fe/core/converters/annotations/DataField", "../../helpers/ID", "sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/converters/helpers/Key", "sap/fe/core/templating/DataModelPathHelper", "../../helpers/Aggregation"], function (ManifestSettings, Action, DataField, ID, ConfigurableObject, Key, DataModelPathHelper, Aggregation) {
  "use strict";

  var _exports = {};
  var AggregationHelper = Aggregation.AggregationHelper;
  var getTargetObjectPath = DataModelPathHelper.getTargetObjectPath;
  var KeyHelper = Key.KeyHelper;
  var insertCustomElements = ConfigurableObject.insertCustomElements;
  var FilterBarID = ID.FilterBarID;
  var ChartID = ID.ChartID;
  var isDataFieldForActionAbstract = DataField.isDataFieldForActionAbstract;
  var getActionsFromManifest = Action.getActionsFromManifest;
  var TemplateType = ManifestSettings.TemplateType;
  var ActionType = ManifestSettings.ActionType;
  var VisualizationType = ManifestSettings.VisualizationType;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  /**
   * Method to retrieve all chart actions from annotations.
   *
   * @param chartAnnotation
   * @param visualizationPath
   * @param converterContext
   * @returns {BaseAction[]} The table annotation actions
   */
  function getChartActionsFromAnnotations(chartAnnotation, visualizationPath, converterContext) {
    var chartActions = [];

    if (chartAnnotation) {
      var aActions = chartAnnotation.Actions || [];
      aActions.forEach(function (dataField) {
        var _dataField$annotation, _dataField$annotation2, _dataField$annotation3;

        var chartAction;

        if (isDataFieldForActionAbstract(dataField) && !(((_dataField$annotation = dataField.annotations) === null || _dataField$annotation === void 0 ? void 0 : (_dataField$annotation2 = _dataField$annotation.UI) === null || _dataField$annotation2 === void 0 ? void 0 : (_dataField$annotation3 = _dataField$annotation2.Hidden) === null || _dataField$annotation3 === void 0 ? void 0 : _dataField$annotation3.valueOf()) === true) && !dataField.Inline && !dataField.Determining) {
          var key = KeyHelper.generateKeyFromDataField(dataField);

          switch (dataField.$Type) {
            case "com.sap.vocabularies.UI.v1.DataFieldForAction":
              chartAction = {
                type: ActionType.DataFieldForAction,
                annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
                key: key
              };
              break;

            case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
              chartAction = {
                type: ActionType.DataFieldForIntentBasedNavigation,
                annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
                key: key
              };
              break;
          }
        }

        if (chartAction) {
          chartActions.push(chartAction);
        }
      });
    }

    return chartActions;
  }

  function getChartActions(chartAnnotation, visualizationPath, converterContext) {
    var aAnnotationActions = getChartActionsFromAnnotations(chartAnnotation, visualizationPath, converterContext);
    return insertCustomElements(aAnnotationActions, getActionsFromManifest(converterContext.getManifestControlConfiguration(visualizationPath).actions, converterContext, aAnnotationActions), {
      enableOnSelect: "overwrite",
      enabled: "overwrite"
    });
  }

  _exports.getChartActions = getChartActions;

  function getP13nMode(visualizationPath, converterContext) {
    var _chartManifestSetting;

    var manifestWrapper = converterContext.getManifestWrapper();
    var chartManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath);
    var hasVariantManagement = ["Page", "Control"].indexOf(manifestWrapper.getVariantManagement()) > -1;
    var personalization = true;
    var aPersonalization = [];

    if ((chartManifestSettings === null || chartManifestSettings === void 0 ? void 0 : (_chartManifestSetting = chartManifestSettings.chartSettings) === null || _chartManifestSetting === void 0 ? void 0 : _chartManifestSetting.personalization) !== undefined) {
      personalization = chartManifestSettings.chartSettings.personalization;
    }

    if (hasVariantManagement && personalization) {
      if (personalization === true) {
        return "Sort,Type,Item";
      } else if (typeof personalization === "object") {
        if (personalization.type) {
          aPersonalization.push("Type");
        }

        if (personalization.item) {
          aPersonalization.push("Item");
        }

        if (personalization.sort) {
          aPersonalization.push("Sort");
        }

        return aPersonalization.join(",");
      }
    }

    return undefined;
  }
  /**
   * Create the ChartVisualization configuration that will be used to display a chart via Chart Macro.
   *
   * @param {ChartDefinitionTypeTypes} chartAnnotation The target chart annotation
   * @param {string} visualizationPath The current visualization annotation path
   * @param {ConverterContext} converterContext The converter context
   * @param {boolean} doNotCheckApplySupported Flag that tells whether applysupported to be checked or not
   * @returns {ChartVisualization} The chart visualization based on the annotation
   */


  _exports.getP13nMode = getP13nMode;

  function createChartVisualization(chartAnnotation, visualizationPath, converterContext, doNotCheckApplySupported) {
    var _converterContext$get, _converterContext$get2, _converterContext$get3;

    var aggregationHelper = new AggregationHelper(converterContext.getEntityType(), converterContext);

    if (!doNotCheckApplySupported && !aggregationHelper.isAnalyticsSupported()) {
      throw new Error("ApplySupported is not added to the annotations");
    }

    var chartActions = getChartActions(chartAnnotation, visualizationPath, converterContext);

    var _visualizationPath$sp = visualizationPath.split("@"),
        _visualizationPath$sp2 = _slicedToArray(_visualizationPath$sp, 1),
        navigationPropertyPath
    /*, annotationPath*/
    = _visualizationPath$sp2[0];

    if (navigationPropertyPath.lastIndexOf("/") === navigationPropertyPath.length - 1) {
      // Drop trailing slash
      navigationPropertyPath = navigationPropertyPath.substr(0, navigationPropertyPath.length - 1);
    }

    var title = (_converterContext$get = converterContext.getDataModelObjectPath().targetEntityType.annotations) === null || _converterContext$get === void 0 ? void 0 : (_converterContext$get2 = _converterContext$get.UI) === null || _converterContext$get2 === void 0 ? void 0 : (_converterContext$get3 = _converterContext$get2.HeaderInfo) === null || _converterContext$get3 === void 0 ? void 0 : _converterContext$get3.TypeNamePlural;
    var dataModelPath = converterContext.getDataModelObjectPath();
    var isEntitySet = navigationPropertyPath.length === 0;
    var entityName = dataModelPath.targetEntitySet ? dataModelPath.targetEntitySet.name : dataModelPath.startingEntitySet.name;
    var sFilterbarId = isEntitySet ? FilterBarID(converterContext.getContextPath()) : undefined;
    var oVizProperties = {
      "legendGroup": {
        "layout": {
          "position": "bottom"
        }
      }
    };
    return {
      type: VisualizationType.Chart,
      id: ChartID(isEntitySet ? entityName : navigationPropertyPath, VisualizationType.Chart),
      collection: getTargetObjectPath(converterContext.getDataModelObjectPath()),
      entityName: entityName,
      p13nMode: getP13nMode(visualizationPath, converterContext),
      navigationPath: navigationPropertyPath,
      annotationPath: converterContext.getAbsoluteAnnotationPath(visualizationPath),
      filterId: sFilterbarId,
      vizProperties: JSON.stringify(oVizProperties),
      actions: chartActions,
      title: title,
      autoBindOnInit: converterContext.getTemplateType() === TemplateType.ObjectPage
    };
  }

  _exports.createChartVisualization = createChartVisualization;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNoYXJ0LnRzIl0sIm5hbWVzIjpbImdldENoYXJ0QWN0aW9uc0Zyb21Bbm5vdGF0aW9ucyIsImNoYXJ0QW5ub3RhdGlvbiIsInZpc3VhbGl6YXRpb25QYXRoIiwiY29udmVydGVyQ29udGV4dCIsImNoYXJ0QWN0aW9ucyIsImFBY3Rpb25zIiwiQWN0aW9ucyIsImZvckVhY2giLCJkYXRhRmllbGQiLCJjaGFydEFjdGlvbiIsImlzRGF0YUZpZWxkRm9yQWN0aW9uQWJzdHJhY3QiLCJhbm5vdGF0aW9ucyIsIlVJIiwiSGlkZGVuIiwidmFsdWVPZiIsIklubGluZSIsIkRldGVybWluaW5nIiwia2V5IiwiS2V5SGVscGVyIiwiZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkIiwiJFR5cGUiLCJ0eXBlIiwiQWN0aW9uVHlwZSIsIkRhdGFGaWVsZEZvckFjdGlvbiIsImFubm90YXRpb25QYXRoIiwiZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aCIsImZ1bGx5UXVhbGlmaWVkTmFtZSIsIkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiIsInB1c2giLCJnZXRDaGFydEFjdGlvbnMiLCJhQW5ub3RhdGlvbkFjdGlvbnMiLCJpbnNlcnRDdXN0b21FbGVtZW50cyIsImdldEFjdGlvbnNGcm9tTWFuaWZlc3QiLCJnZXRNYW5pZmVzdENvbnRyb2xDb25maWd1cmF0aW9uIiwiYWN0aW9ucyIsImVuYWJsZU9uU2VsZWN0IiwiZW5hYmxlZCIsImdldFAxM25Nb2RlIiwibWFuaWZlc3RXcmFwcGVyIiwiZ2V0TWFuaWZlc3RXcmFwcGVyIiwiY2hhcnRNYW5pZmVzdFNldHRpbmdzIiwiaGFzVmFyaWFudE1hbmFnZW1lbnQiLCJpbmRleE9mIiwiZ2V0VmFyaWFudE1hbmFnZW1lbnQiLCJwZXJzb25hbGl6YXRpb24iLCJhUGVyc29uYWxpemF0aW9uIiwiY2hhcnRTZXR0aW5ncyIsInVuZGVmaW5lZCIsIml0ZW0iLCJzb3J0Iiwiam9pbiIsImNyZWF0ZUNoYXJ0VmlzdWFsaXphdGlvbiIsImRvTm90Q2hlY2tBcHBseVN1cHBvcnRlZCIsImFnZ3JlZ2F0aW9uSGVscGVyIiwiQWdncmVnYXRpb25IZWxwZXIiLCJnZXRFbnRpdHlUeXBlIiwiaXNBbmFseXRpY3NTdXBwb3J0ZWQiLCJFcnJvciIsInNwbGl0IiwibmF2aWdhdGlvblByb3BlcnR5UGF0aCIsImxhc3RJbmRleE9mIiwibGVuZ3RoIiwic3Vic3RyIiwidGl0bGUiLCJnZXREYXRhTW9kZWxPYmplY3RQYXRoIiwidGFyZ2V0RW50aXR5VHlwZSIsIkhlYWRlckluZm8iLCJUeXBlTmFtZVBsdXJhbCIsImRhdGFNb2RlbFBhdGgiLCJpc0VudGl0eVNldCIsImVudGl0eU5hbWUiLCJ0YXJnZXRFbnRpdHlTZXQiLCJuYW1lIiwic3RhcnRpbmdFbnRpdHlTZXQiLCJzRmlsdGVyYmFySWQiLCJGaWx0ZXJCYXJJRCIsImdldENvbnRleHRQYXRoIiwib1ZpelByb3BlcnRpZXMiLCJWaXN1YWxpemF0aW9uVHlwZSIsIkNoYXJ0IiwiaWQiLCJDaGFydElEIiwiY29sbGVjdGlvbiIsImdldFRhcmdldE9iamVjdFBhdGgiLCJwMTNuTW9kZSIsIm5hdmlnYXRpb25QYXRoIiwiZ2V0QWJzb2x1dGVBbm5vdGF0aW9uUGF0aCIsImZpbHRlcklkIiwidml6UHJvcGVydGllcyIsIkpTT04iLCJzdHJpbmdpZnkiLCJhdXRvQmluZE9uSW5pdCIsImdldFRlbXBsYXRlVHlwZSIsIlRlbXBsYXRlVHlwZSIsIk9iamVjdFBhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBb0NBOzs7Ozs7OztBQVFBLFdBQVNBLDhCQUFULENBQ0NDLGVBREQsRUFFQ0MsaUJBRkQsRUFHQ0MsZ0JBSEQsRUFJZ0I7QUFDZixRQUFNQyxZQUEwQixHQUFHLEVBQW5DOztBQUNBLFFBQUlILGVBQUosRUFBcUI7QUFDcEIsVUFBTUksUUFBUSxHQUFHSixlQUFlLENBQUNLLE9BQWhCLElBQTJCLEVBQTVDO0FBQ0FELE1BQUFBLFFB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LEVBQUVBLFVBSk47QUFLTmMsTUFBQUEsUUFBUSxFQUFFL0MsV0FBVyxDQUFDbkMsaUJBQUQsRUFBb0JDLGdCQUFwQixDQUxmO0FBTU5rRixNQUFBQSxjQUFjLEVBQUUxQixzQkFOVjtBQU9ObkMsTUFBQUEsY0FBYyxFQUFFckIsZ0JBQWdCLENBQUNtRix5QkFBakIsQ0FBMkNwRixpQkFBM0MsQ0FQVjtBQVFOcUYsTUFBQUEsUUFBUSxFQUFFYixZQVJKO0FBU05jLE1BQUFBLGFBQWEsRUFBRUMsSUFBSSxDQUFDQyxTQUFMLENBQWViLGNBQWYsQ0FUVDtBQVVOM0MsTUFBQUEsT0FBTyxFQUFFOUIsWUFWSDtBQVdOMkQsTUFBQUEsS0FBSyxFQUFFQSxLQVhEO0FBWU40QixNQUFBQSxjQUFjLEVBQUV4RixnQkFBZ0IsQ0FBQ3lGLGVBQWpCLE9BQXVDQyxZQUFZLENBQUNDO0FBWjlELEtBQVA7QUFjQSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q2hhcnRNYW5pZmVzdENvbmZpZ3VyYXRpb24sXG5cdENoYXJ0UGVyc29uYWxpemF0aW9uTWFuaWZlc3RTZXR0aW5ncyxcblx0VmlzdWFsaXphdGlvblR5cGUsXG5cdEFjdGlvblR5cGUsXG5cdFRlbXBsYXRlVHlwZVxufSBmcm9tIFwiLi4vLi4vTWFuaWZlc3RTZXR0aW5nc1wiO1xuaW1wb3J0IHsgQ2hhcnREZWZpbml0aW9uVHlwZVR5cGVzLCBEYXRhRmllbGRBYnN0cmFjdFR5cGVzIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBBbm5vdGF0aW9uQWN0aW9uLCBCYXNlQWN0aW9uLCBnZXRBY3Rpb25zRnJvbU1hbmlmZXN0IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29udHJvbHMvQ29tbW9uL0FjdGlvblwiO1xuaW1wb3J0IHsgaXNEYXRhRmllbGRGb3JBY3Rpb25BYnN0cmFjdCB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2Fubm90YXRpb25zL0RhdGFGaWVsZFwiO1xuaW1wb3J0IHsgQ2hhcnRJRCwgRmlsdGVyQmFySUQgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9JRFwiO1xuaW1wb3J0IHsgaW5zZXJ0Q3VzdG9tRWxlbWVudHMgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0NvbmZpZ3VyYWJsZU9iamVjdFwiO1xuaW1wb3J0IHsgS2V5SGVscGVyIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9LZXlcIjtcbmltcG9ydCB7IGdldFRhcmdldE9iamVjdFBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EYXRhTW9kZWxQYXRoSGVscGVyXCI7XG5pbXBvcnQgeyBBZ2dyZWdhdGlvbkhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL0FnZ3JlZ2F0aW9uXCI7XG5pbXBvcnQgTWFuaWZlc3RXcmFwcGVyIGZyb20gXCIuLi8uLi9NYW5pZmVzdFdyYXBwZXJcIjtcbmltcG9ydCBDb252ZXJ0ZXJDb250ZXh0IGZyb20gXCIuLi8uLi9Db252ZXJ0ZXJDb250ZXh0XCI7XG5cbi8qKlxuICogQHR5cGVkZWYgQ2hhcnRWaXN1YWxpemF0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIENoYXJ0VmlzdWFsaXphdGlvbiA9IHtcblx0dHlwZTogVmlzdWFsaXphdGlvblR5cGUuQ2hhcnQ7XG5cdGlkOiBzdHJpbmc7XG5cdGNvbGxlY3Rpb246IHN0cmluZztcblx0ZW50aXR5TmFtZTogc3RyaW5nO1xuXHRwMTNuTW9kZT86IHN0cmluZztcblx0bmF2aWdhdGlvblBhdGg6IHN0cmluZztcblx0YW5ub3RhdGlvblBhdGg6IHN0cmluZztcblx0ZmlsdGVySWQ/OiBzdHJpbmc7XG5cdHZpelByb3BlcnRpZXM6IHN0cmluZztcblx0YWN0aW9uczogQmFzZUFjdGlvbltdO1xuXHR0aXRsZTogc3RyaW5nO1xuXHRhdXRvQmluZE9uSW5pdDogYm9vbGVhbjtcbn07XG5cbi8qKlxuICogTWV0aG9kIHRvIHJldHJpZXZlIGFsbCBjaGFydCBhY3Rpb25zIGZyb20gYW5ub3RhdGlvbnMuXG4gKlxuICogQHBhcmFtIGNoYXJ0QW5ub3RhdGlvblxuICogQHBhcmFtIHZpc3VhbGl6YXRpb25QYXRoXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dFxuICogQHJldHVybnMge0Jhc2VBY3Rpb25bXX0gVGhlIHRhYmxlIGFubm90YXRpb24gYWN0aW9uc1xuICovXG5mdW5jdGlvbiBnZXRDaGFydEFjdGlvbnNGcm9tQW5ub3RhdGlvbnMoXG5cdGNoYXJ0QW5ub3RhdGlvbjogQ2hhcnREZWZpbml0aW9uVHlwZVR5cGVzLFxuXHR2aXN1YWxpemF0aW9uUGF0aDogc3RyaW5nLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBCYXNlQWN0aW9uW10ge1xuXHRjb25zdCBjaGFydEFjdGlvbnM6IEJhc2VBY3Rpb25bXSA9IFtdO1xuXHRpZiAoY2hhcnRBbm5vdGF0aW9uKSB7XG5cdFx0Y29uc3QgYUFjdGlvbnMgPSBjaGFydEFubm90YXRpb24uQWN0aW9ucyB8fCBbXTtcblx0XHRhQWN0aW9ucy5mb3JFYWNoKChkYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpID0+IHtcblx0XHRcdGxldCBjaGFydEFjdGlvbjogQW5ub3RhdGlvbkFjdGlvbiB8IHVuZGVmaW5lZDtcblx0XHRcdGlmIChcblx0XHRcdFx0aXNEYXRhRmllbGRGb3JBY3Rpb25BYnN0cmFjdChkYXRhRmllbGQpICYmXG5cdFx0XHRcdCEoZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgPT09IHRydWUpICYmXG5cdFx0XHRcdCFkYXRhRmllbGQuSW5saW5lICYmXG5cdFx0XHRcdCFkYXRhRmllbGQuRGV0ZXJtaW5pbmdcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBLZXlIZWxwZXIuZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkKGRhdGFGaWVsZCk7XG5cdFx0XHRcdHN3aXRjaCAoZGF0YUZpZWxkLiRUeXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckFjdGlvblwiOlxuXHRcdFx0XHRcdFx0Y2hhcnRBY3Rpb24gPSB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IEFjdGlvblR5cGUuRGF0YUZpZWxkRm9yQWN0aW9uLFxuXHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aDogY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoKGRhdGFGaWVsZC5mdWxseVF1YWxpZmllZE5hbWUpLFxuXHRcdFx0XHRcdFx0XHRrZXk6IGtleVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvblwiOlxuXHRcdFx0XHRcdFx0Y2hhcnRBY3Rpb24gPSB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IEFjdGlvblR5cGUuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uLFxuXHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aDogY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoKGRhdGFGaWVsZC5mdWxseVF1YWxpZmllZE5hbWUpLFxuXHRcdFx0XHRcdFx0XHRrZXk6IGtleVxuXHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoY2hhcnRBY3Rpb24pIHtcblx0XHRcdFx0Y2hhcnRBY3Rpb25zLnB1c2goY2hhcnRBY3Rpb24pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBjaGFydEFjdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRDaGFydEFjdGlvbnMoXG5cdGNoYXJ0QW5ub3RhdGlvbjogQ2hhcnREZWZpbml0aW9uVHlwZVR5cGVzLFxuXHR2aXN1YWxpemF0aW9uUGF0aDogc3RyaW5nLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBCYXNlQWN0aW9uW10ge1xuXHRjb25zdCBhQW5ub3RhdGlvbkFjdGlvbnM6IEJhc2VBY3Rpb25bXSA9IGdldENoYXJ0QWN0aW9uc0Zyb21Bbm5vdGF0aW9ucyhjaGFydEFubm90YXRpb24sIHZpc3VhbGl6YXRpb25QYXRoLCBjb252ZXJ0ZXJDb250ZXh0KTtcblxuXHRyZXR1cm4gaW5zZXJ0Q3VzdG9tRWxlbWVudHMoXG5cdFx0YUFubm90YXRpb25BY3Rpb25zLFxuXHRcdGdldEFjdGlvbnNGcm9tTWFuaWZlc3QoXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpLmFjdGlvbnMsXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0YUFubm90YXRpb25BY3Rpb25zXG5cdFx0KSxcblx0XHR7IGVuYWJsZU9uU2VsZWN0OiBcIm92ZXJ3cml0ZVwiLCBlbmFibGVkOiBcIm92ZXJ3cml0ZVwiIH1cblx0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFAxM25Nb2RlKHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRjb25zdCBtYW5pZmVzdFdyYXBwZXI6IE1hbmlmZXN0V3JhcHBlciA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCk7XG5cdGNvbnN0IGNoYXJ0TWFuaWZlc3RTZXR0aW5nczogQ2hhcnRNYW5pZmVzdENvbmZpZ3VyYXRpb24gPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpO1xuXHRjb25zdCBoYXNWYXJpYW50TWFuYWdlbWVudDogYm9vbGVhbiA9IFtcIlBhZ2VcIiwgXCJDb250cm9sXCJdLmluZGV4T2YobWFuaWZlc3RXcmFwcGVyLmdldFZhcmlhbnRNYW5hZ2VtZW50KCkpID4gLTE7XG5cdGxldCBwZXJzb25hbGl6YXRpb246IENoYXJ0UGVyc29uYWxpemF0aW9uTWFuaWZlc3RTZXR0aW5ncyA9IHRydWU7XG5cdGNvbnN0IGFQZXJzb25hbGl6YXRpb246IHN0cmluZ1tdID0gW107XG5cdGlmIChjaGFydE1hbmlmZXN0U2V0dGluZ3M/LmNoYXJ0U2V0dGluZ3M/LnBlcnNvbmFsaXphdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cGVyc29uYWxpemF0aW9uID0gY2hhcnRNYW5pZmVzdFNldHRpbmdzLmNoYXJ0U2V0dGluZ3MucGVyc29uYWxpemF0aW9uO1xuXHR9XG5cdGlmIChoYXNWYXJpYW50TWFuYWdlbWVudCAmJiBwZXJzb25hbGl6YXRpb24pIHtcblx0XHRpZiAocGVyc29uYWxpemF0aW9uID09PSB0cnVlKSB7XG5cdFx0XHRyZXR1cm4gXCJTb3J0LFR5cGUsSXRlbVwiO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIHBlcnNvbmFsaXphdGlvbiA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0aWYgKHBlcnNvbmFsaXphdGlvbi50eXBlKSB7XG5cdFx0XHRcdGFQZXJzb25hbGl6YXRpb24ucHVzaChcIlR5cGVcIik7XG5cdFx0XHR9XG5cdFx0XHRpZiAocGVyc29uYWxpemF0aW9uLml0ZW0pIHtcblx0XHRcdFx0YVBlcnNvbmFsaXphdGlvbi5wdXNoKFwiSXRlbVwiKTtcblx0XHRcdH1cblx0XHRcdGlmIChwZXJzb25hbGl6YXRpb24uc29ydCkge1xuXHRcdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJTb3J0XCIpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGFQZXJzb25hbGl6YXRpb24uam9pbihcIixcIik7XG5cdFx0fVxuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBDaGFydFZpc3VhbGl6YXRpb24gY29uZmlndXJhdGlvbiB0aGF0IHdpbGwgYmUgdXNlZCB0byBkaXNwbGF5IGEgY2hhcnQgdmlhIENoYXJ0IE1hY3JvLlxuICpcbiAqIEBwYXJhbSB7Q2hhcnREZWZpbml0aW9uVHlwZVR5cGVzfSBjaGFydEFubm90YXRpb24gVGhlIHRhcmdldCBjaGFydCBhbm5vdGF0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gdmlzdWFsaXphdGlvblBhdGggVGhlIGN1cnJlbnQgdmlzdWFsaXphdGlvbiBhbm5vdGF0aW9uIHBhdGhcbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHRcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gZG9Ob3RDaGVja0FwcGx5U3VwcG9ydGVkIEZsYWcgdGhhdCB0ZWxscyB3aGV0aGVyIGFwcGx5c3VwcG9ydGVkIHRvIGJlIGNoZWNrZWQgb3Igbm90XG4gKiBAcmV0dXJucyB7Q2hhcnRWaXN1YWxpemF0aW9ufSBUaGUgY2hhcnQgdmlzdWFsaXphdGlvbiBiYXNlZCBvbiB0aGUgYW5ub3RhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2hhcnRWaXN1YWxpemF0aW9uKFxuXHRjaGFydEFubm90YXRpb246IENoYXJ0RGVmaW5pdGlvblR5cGVUeXBlcyxcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0ZG9Ob3RDaGVja0FwcGx5U3VwcG9ydGVkPzogYm9vbGVhblxuKTogQ2hhcnRWaXN1YWxpemF0aW9uIHtcblx0Y29uc3QgYWdncmVnYXRpb25IZWxwZXIgPSBuZXcgQWdncmVnYXRpb25IZWxwZXIoY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCksIGNvbnZlcnRlckNvbnRleHQpO1xuXHRpZiAoIWRvTm90Q2hlY2tBcHBseVN1cHBvcnRlZCAmJiAhYWdncmVnYXRpb25IZWxwZXIuaXNBbmFseXRpY3NTdXBwb3J0ZWQoKSkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkFwcGx5U3VwcG9ydGVkIGlzIG5vdCBhZGRlZCB0byB0aGUgYW5ub3RhdGlvbnNcIik7XG5cdH1cblx0Y29uc3QgY2hhcnRBY3Rpb25zID0gZ2V0Q2hhcnRBY3Rpb25zKGNoYXJ0QW5ub3RhdGlvbiwgdmlzdWFsaXphdGlvblBhdGgsIGNvbnZlcnRlckNvbnRleHQpO1xuXHRsZXQgW25hdmlnYXRpb25Qcm9wZXJ0eVBhdGggLyosIGFubm90YXRpb25QYXRoKi9dID0gdmlzdWFsaXphdGlvblBhdGguc3BsaXQoXCJAXCIpO1xuXHRpZiAobmF2aWdhdGlvblByb3BlcnR5UGF0aC5sYXN0SW5kZXhPZihcIi9cIikgPT09IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgubGVuZ3RoIC0gMSkge1xuXHRcdC8vIERyb3AgdHJhaWxpbmcgc2xhc2hcblx0XHRuYXZpZ2F0aW9uUHJvcGVydHlQYXRoID0gbmF2aWdhdGlvblByb3BlcnR5UGF0aC5zdWJzdHIoMCwgbmF2aWdhdGlvblByb3BlcnR5UGF0aC5sZW5ndGggLSAxKTtcblx0fVxuXHRjb25zdCB0aXRsZTogYW55ID0gY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCkudGFyZ2V0RW50aXR5VHlwZS5hbm5vdGF0aW9ucz8uVUk/LkhlYWRlckluZm8/LlR5cGVOYW1lUGx1cmFsO1xuXHRjb25zdCBkYXRhTW9kZWxQYXRoID0gY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCk7XG5cdGNvbnN0IGlzRW50aXR5U2V0OiBib29sZWFuID0gbmF2aWdhdGlvblByb3BlcnR5UGF0aC5sZW5ndGggPT09IDA7XG5cdGNvbnN0IGVudGl0eU5hbWU6IHN0cmluZyA9IGRhdGFNb2RlbFBhdGgudGFyZ2V0RW50aXR5U2V0ID8gZGF0YU1vZGVsUGF0aC50YXJnZXRFbnRpdHlTZXQubmFtZSA6IGRhdGFNb2RlbFBhdGguc3RhcnRpbmdFbnRpdHlTZXQubmFtZTtcblx0Y29uc3Qgc0ZpbHRlcmJhcklkID0gaXNFbnRpdHlTZXQgPyBGaWx0ZXJCYXJJRChjb252ZXJ0ZXJDb250ZXh0LmdldENvbnRleHRQYXRoKCkpIDogdW5kZWZpbmVkO1xuXHRjb25zdCBvVml6UHJvcGVydGllcyA9IHtcblx0XHRcImxlZ2VuZEdyb3VwXCI6IHtcblx0XHRcdFwibGF5b3V0XCI6IHtcblx0XHRcdFx0XCJwb3NpdGlvblwiOiBcImJvdHRvbVwiXG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4ge1xuXHRcdHR5cGU6IFZpc3VhbGl6YXRpb25UeXBlLkNoYXJ0LFxuXHRcdGlkOiBDaGFydElEKGlzRW50aXR5U2V0ID8gZW50aXR5TmFtZSA6IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgsIFZpc3VhbGl6YXRpb25UeXBlLkNoYXJ0KSxcblx0XHRjb2xsZWN0aW9uOiBnZXRUYXJnZXRPYmplY3RQYXRoKGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpKSxcblx0XHRlbnRpdHlOYW1lOiBlbnRpdHlOYW1lLFxuXHRcdHAxM25Nb2RlOiBnZXRQMTNuTW9kZSh2aXN1YWxpemF0aW9uUGF0aCwgY29udmVydGVyQ29udGV4dCksXG5cdFx0bmF2aWdhdGlvblBhdGg6IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgsXG5cdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0QWJzb2x1dGVBbm5vdGF0aW9uUGF0aCh2aXN1YWxpemF0aW9uUGF0aCksXG5cdFx0ZmlsdGVySWQ6IHNGaWx0ZXJiYXJJZCxcblx0XHR2aXpQcm9wZXJ0aWVzOiBKU09OLnN0cmluZ2lmeShvVml6UHJvcGVydGllcyksXG5cdFx0YWN0aW9uczogY2hhcnRBY3Rpb25zLFxuXHRcdHRpdGxlOiB0aXRsZSxcblx0XHRhdXRvQmluZE9uSW5pdDogY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLk9iamVjdFBhZ2Vcblx0fTtcbn1cbiJdfQ==