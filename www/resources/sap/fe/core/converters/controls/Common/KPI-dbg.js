/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../helpers/ID", "sap/fe/core/templating/PropertyHelper", "sap/fe/core/formatters/TableFormatterTypes", "../../helpers/Aggregation", "sap/fe/core/converters/helpers/IssueManager", "./Criticality", "sap/fe/core/converters/helpers/SelectionVariantHelper"], function (ID, PropertyHelper, TableFormatterTypes, Aggregation, IssueManager, Criticality, SelectionVariantHelper) {
  "use strict";

  var _exports = {};
  var getFilterDefinitionsFromSelectionVariant = SelectionVariantHelper.getFilterDefinitionsFromSelectionVariant;
  var getMessageTypeFromCriticalityType = Criticality.getMessageTypeFromCriticalityType;
  var IssueType = IssueManager.IssueType;
  var IssueSeverity = IssueManager.IssueSeverity;
  var IssueCategory = IssueManager.IssueCategory;
  var AggregationHelper = Aggregation.AggregationHelper;
  var MessageType = TableFormatterTypes.MessageType;
  var isPathExpression = PropertyHelper.isPathExpression;
  var KPIID = ID.KPIID;

  function createKPIDefinition(kpiName, kpiConfig, converterContext) {
    var _targetKPI$Detail;

    var kpiConverterContext = converterContext.getConverterContextFor("/" + kpiConfig.entitySet);
    var aKPIAnnotations = kpiConverterContext.getAnnotationsByTerm("UI", "com.sap.vocabularies.UI.v1.KPI");
    var targetKPI = aKPIAnnotations.find(function (kpi) {
      return kpi.qualifier === kpiConfig.qualifier;
    });
    var aggregationHelper = new AggregationHelper(kpiConverterContext.getEntityType(), kpiConverterContext);

    if (targetKPI && ((_targetKPI$Detail = targetKPI.Detail) === null || _targetKPI$Detail === void 0 ? void 0 : _targetKPI$Detail.DefaultPresentationVariant) && aggregationHelper.isAnalyticsSupported()) {
      var _targetValueProperty$, _targetValueProperty$3;

      var kpiID = KPIID(kpiName); // Datapoint

      var datapointAnnotation = targetKPI.DataPoint;
      var datapointProperty = datapointAnnotation.Value.$target;

      if (!aggregationHelper.isPropertyAggregatable(datapointProperty)) {
        // The main property of the KPI is not aggregatable --> We can't calculate its value so we ignore the KPI
        converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.Medium, IssueType.KPI_ISSUES.MAIN_PROPERTY_NOT_AGGREGATABLE + kpiConfig.qualifier);
        return undefined;
      }

      var kpiDef = {
        id: kpiID,
        entitySet: kpiConfig.entitySet,
        datapoint: {
          propertyPath: datapointAnnotation.Value.path,
          annotationPath: kpiConverterContext.getEntitySetBasedAnnotationPath(datapointAnnotation.fullyQualifiedName)
        },
        selectionVariantFilterDefinitions: targetKPI.SelectionVariant ? getFilterDefinitionsFromSelectionVariant(targetKPI.SelectionVariant) : undefined
      }; // Unit or currency

      var targetValueProperty = datapointAnnotation.Value.$target;

      if ((_targetValueProperty$ = targetValueProperty.annotations.Measures) === null || _targetValueProperty$ === void 0 ? void 0 : _targetValueProperty$.ISOCurrency) {
        var _targetValueProperty$2;

        var currency = (_targetValueProperty$2 = targetValueProperty.annotations.Measures) === null || _targetValueProperty$2 === void 0 ? void 0 : _targetValueProperty$2.ISOCurrency;

        if (isPathExpression(currency)) {
          kpiDef.datapoint.unit = {
            value: currency.$target.name,
            isCurrency: true,
            isPath: true
          };
        } else {
          kpiDef.datapoint.unit = {
            value: currency.toString(),
            isCurrency: true,
            isPath: false
          };
        }
      } else if ((_targetValueProperty$3 = targetValueProperty.annotations.Measures) === null || _targetValueProperty$3 === void 0 ? void 0 : _targetValueProperty$3.Unit) {
        var _targetValueProperty$4;

        var unit = (_targetValueProperty$4 = targetValueProperty.annotations.Measures) === null || _targetValueProperty$4 === void 0 ? void 0 : _targetValueProperty$4.Unit;

        if (isPathExpression(unit)) {
          kpiDef.datapoint.unit = {
            value: unit.$target.name,
            isCurrency: false,
            isPath: true
          };
        } else {
          kpiDef.datapoint.unit = {
            value: unit.toString(),
            isCurrency: false,
            isPath: false
          };
        }
      } // Criticality


      if (datapointAnnotation.Criticality) {
        if (typeof datapointAnnotation.Criticality === "object") {
          // Criticality is a path --> check if the corresponding property is aggregatable
          var criticalityProperty = datapointAnnotation.Criticality.$target;

          if (aggregationHelper.isPropertyAggregatable(criticalityProperty)) {
            kpiDef.datapoint.criticalityPath = datapointAnnotation.Criticality.path;
          } else {
            // The property isn't aggregatable --> we ignore it
            kpiDef.datapoint.criticalityValue = MessageType.None;
          }
        } else {
          // Criticality is an enum Value --> get the corresponding static value
          kpiDef.datapoint.criticalityValue = getMessageTypeFromCriticalityType(datapointAnnotation.Criticality);
        }
      } else if (datapointAnnotation.CriticalityCalculation) {
        kpiDef.datapoint.criticalityCalculationMode = datapointAnnotation.CriticalityCalculation.ImprovementDirection;
        kpiDef.datapoint.criticalityCalculationThresholds = [];

        switch (kpiDef.datapoint.criticalityCalculationMode) {
          case "UI.ImprovementDirectionType/Target":
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.DeviationRangeLowValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.ToleranceRangeLowValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.AcceptanceRangeLowValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.AcceptanceRangeHighValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.ToleranceRangeHighValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.DeviationRangeHighValue);
            break;

          case "UI.ImprovementDirectionType/Minimize":
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.AcceptanceRangeHighValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.ToleranceRangeHighValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.DeviationRangeHighValue);
            break;

          case "UI.ImprovementDirectionType/Maximize":
          default:
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.DeviationRangeLowValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.ToleranceRangeLowValue);
            kpiDef.datapoint.criticalityCalculationThresholds.push(datapointAnnotation.CriticalityCalculation.AcceptanceRangeLowValue);
        }
      } else {
        kpiDef.datapoint.criticalityValue = MessageType.None;
      }

      return kpiDef;
    } else {
      var _targetKPI$Detail2;

      if (!targetKPI) {
        // Couldn't find a KPI with the qualifier specified in the manifest
        converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.Medium, IssueType.KPI_ISSUES.KPI_NOT_FOUND + kpiConfig.qualifier);
      } else if (!((_targetKPI$Detail2 = targetKPI.Detail) === null || _targetKPI$Detail2 === void 0 ? void 0 : _targetKPI$Detail2.DefaultPresentationVariant)) {
        // No KPI detail/default presentation variant
        converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.Medium, IssueType.KPI_ISSUES.KPI_DETAIL_NOT_FOUND + kpiConfig.qualifier);
      } else {
        // Entity doesn't support analytics
        converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.Medium, IssueType.KPI_ISSUES.NO_ANALYTICS + kpiConfig.entitySet);
      }

      return undefined;
    }
  }
  /**
   * Creates the KPI definitions from the manifest and the annotations.
   *
   * @param {ConverterContext} converterContext The converter context for the page
   * @returns {KPIDefinition[]} Returns an array of KPI definitions
   */


  function getKPIDefinitions(converterContext) {
    var kpiConfigs = converterContext.getManifestWrapper().getKPIConfiguration(),
        kpiDefs = [];
    Object.keys(kpiConfigs).forEach(function (kpiName) {
      var oDef = createKPIDefinition(kpiName, kpiConfigs[kpiName], converterContext);

      if (oDef) {
        kpiDefs.push(oDef);
      }
    });
    return kpiDefs;
  }

  _exports.getKPIDefinitions = getKPIDefinitions;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktQSS50cyJdLCJuYW1lcyI6WyJjcmVhdGVLUElEZWZpbml0aW9uIiwia3BpTmFtZSIsImtwaUNvbmZpZyIsImNvbnZlcnRlckNvbnRleHQiLCJrcGlDb252ZXJ0ZXJDb250ZXh0IiwiZ2V0Q29udmVydGVyQ29udGV4dEZvciIsImVudGl0eVNldCIsImFLUElBbm5vdGF0aW9ucyIsImdldEFubm90YXRpb25zQnlUZXJtIiwidGFyZ2V0S1BJIiwiZmluZCIsImtwaSIsInF1YWxpZmllciIsImFnZ3JlZ2F0aW9uSGVscGVyIiwiQWdncmVnYXRpb25IZWxwZXIiLCJnZXRFbnRpdHlUeXBlIiwiRGV0YWlsIiwiRGVmYXVsdFByZXNlbnRhdGlvblZhcmlhbnQiLCJpc0FuYWx5dGljc1N1cHBvcnRlZCIsImtwaUlEIiwiS1BJSUQiLCJkYXRhcG9pbnRBbm5vdGF0aW9uIiwiRGF0YVBvaW50IiwiZGF0YXBvaW50UHJvcGVydHkiLCJWYWx1ZSIsIiR0YXJnZXQiLCJpc1Byb3BlcnR5QWdncmVnYXRhYmxlIiwiZ2V0RGlhZ25vc3RpY3MiLCJhZGRJc3N1ZSIsIklzc3VlQ2F0ZWdvcnkiLCJBbm5vdGF0aW9uIiwiSXNzdWVTZXZlcml0eSIsIk1lZGl1bSIsIklzc3VlVHlwZSIsIktQSV9JU1NVRVMiLCJNQUlOX1BST1BFUlRZX05PVF9BR0dSRUdBVEFCTEUiLCJ1bmRlZmluZWQiLCJrcGlEZWYiLCJpZCIsImRhdGFwb2ludCIsInByb3BlcnR5UGF0aCIsInBhdGgiLCJhbm5vdGF0aW9uUGF0aCIsImdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgiLCJmdWxseVF1YWxpZmllZE5hbWUiLCJzZWxlY3Rpb25WYXJpYW50RmlsdGVyRGVmaW5pdGlvbnMiLCJTZWxlY3Rpb25WYXJpYW50IiwiZ2V0RmlsdGVyRGVmaW5pdGlvbnNGcm9tU2VsZWN0aW9uVmFyaWFudCIsInRhcmdldFZhbHVlUHJvcGVydHkiLCJhbm5vdGF0aW9ucyIsIk1lYXN1cmVzIiwiSVNPQ3VycmVuY3kiLCJjdXJyZW5jeSIsImlzUGF0aEV4cHJlc3Npb24iLCJ1bml0IiwidmFsdWUiLCJuYW1lIiwiaXNDdXJyZW5jeSIsImlzUGF0aCIsInRvU3RyaW5nIiwiVW5pdCIsIkNyaXRpY2FsaXR5IiwiY3JpdGljYWxpdHlQcm9wZXJ0eSIsImNyaXRpY2FsaXR5UGF0aCIsImNyaXRpY2FsaXR5VmFsdWUiLCJNZXNzYWdlVHlwZSIsIk5vbmUiLCJnZXRNZXNzYWdlVHlwZUZyb21Dcml0aWNhbGl0eVR5cGUiLCJDcml0aWNhbGl0eUNhbGN1bGF0aW9uIiwiY3JpdGljYWxpdHlDYWxjdWxhdGlvbk1vZGUiLCJJbXByb3ZlbWVudERpcmVjdGlvbiIsImNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzIiwicHVzaCIsIkRldmlhdGlvblJhbmdlTG93VmFsdWUiLCJUb2xlcmFuY2VSYW5nZUxvd1ZhbHVlIiwiQWNjZXB0YW5jZVJhbmdlTG93VmFsdWUiLCJBY2NlcHRhbmNlUmFuZ2VIaWdoVmFsdWUiLCJUb2xlcmFuY2VSYW5nZUhpZ2hWYWx1ZSIsIkRldmlhdGlvblJhbmdlSGlnaFZhbHVlIiwiS1BJX05PVF9GT1VORCIsIktQSV9ERVRBSUxfTk9UX0ZPVU5EIiwiTk9fQU5BTFlUSUNTIiwiZ2V0S1BJRGVmaW5pdGlvbnMiLCJrcGlDb25maWdzIiwiZ2V0TWFuaWZlc3RXcmFwcGVyIiwiZ2V0S1BJQ29uZmlndXJhdGlvbiIsImtwaURlZnMiLCJPYmplY3QiLCJrZXlzIiwiZm9yRWFjaCIsIm9EZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNDQSxXQUFTQSxtQkFBVCxDQUE2QkMsT0FBN0IsRUFBOENDLFNBQTlDLEVBQTJFQyxnQkFBM0UsRUFBMEk7QUFBQTs7QUFDekksUUFBTUMsbUJBQW1CLEdBQUdELGdCQUFnQixDQUFDRSxzQkFBakIsQ0FBd0MsTUFBTUgsU0FBUyxDQUFDSSxTQUF4RCxDQUE1QjtBQUNBLFFBQU1DLGVBQWUsR0FBR0gsbUJBQW1CLENBQUNJLG9CQUFwQixDQUF5QyxJQUF6QyxtQ0FBeEI7QUFDQSxRQUFNQyxTQUFTLEdBQUdGLGVBQWUsQ0FBQ0csSUFBaEIsQ0FBcUIsVUFBQUMsR0FBRyxFQUFJO0FBQzdDLGFBQU9BLEdBQUcsQ0FBQ0MsU0FBSixLQUFrQlYsU0FBUyxDQUFDVSxTQUFuQztBQUNBLEtBRmlCLENBQWxCO0FBR0EsUUFBTUMsaUJBQWlCLEdBQUcsSUFBSUMsaUJBQUosQ0FBc0JWLG1CQUFtQixDQUFDVyxhQUFwQixFQUF0QixFQUEyRFgsbUJBQTNELENBQTFCOztBQUVBLFFBQUlLLFNBQVMsMEJBQUlBLFNBQVMsQ0FBQ08sTUFBZCxzREFBSSxrQkFBa0JDLDBCQUF0QixDQUFULElBQTZESixpQkFBaUIsQ0FBQ0ssb0JBQWxCLEVBQWpFLEVBQTJHO0FBQUE7O0FBQzFHLFVBQU1DLEtBQUssR0FBR0MsS0FBSyxDQUFDbkIsT0FBRCxDQUFuQixDQUQwRyxDQUcxRzs7QUFDQSxVQUFNb0IsbUJBQW1CLEdBQUdaLFNBQVMsQ0FBQ2EsU0FBdEM7QUFDQSxVQUFNQyxpQkFBaUIsR0FBR0YsbUJBQW1CLENBQUNHLEtBQXBCLENBQTBCQyxPQUFwRDs7QUFDQSxVQUFJLENBQUNaLGlCQUFpQixDQUFDYSxzQkFBbEIsQ0FBeUNILGlCQUF6QyxDQUFMLEVBQWtFO0FBQ2pFO0FBQ0FwQixRQUFBQSxnQkFBZ0IsQ0FDZHdCLGNBREYsR0FFRUMsUUFGRixDQUdFQyxhQUFhLENBQUNDLFVBSGhCLEVBSUVDLGFBQWEsQ0FBQ0MsTUFKaEIsRUFLRUMsU0FBUyxDQUFDQyxVQUFWLENBQXFCQyw4QkFBckIsR0FBc0RqQyxTQUFTLENBQUNVLFNBTGxFO0FBT0EsZUFBT3dCLFNBQVA7QUFDQTs7QUFFRCxVQUFNQyxNQUFxQixHQUFHO0FBQzdCQyxRQUFBQSxFQUFFLEVBQUVuQixLQUR5QjtBQUU3QmIsUUFBQUEsU0FBUyxFQUFFSixTQUFTLENBQUNJLFNBRlE7QUFHN0JpQyxRQUFBQSxTQUFTLEVBQUU7QUFDVkMsVUFBQUEsWUFBWSxFQUFFbkIsbUJBQW1CLENBQUNHLEtBQXBCLENBQTBCaUIsSUFEOUI7QUFFVkMsVUFBQUEsY0FBYyxFQUFFdEMsbUJBQW1CLENBQUN1QywrQkFBcEIsQ0FBb0R0QixtQkFBbUIsQ0FBQ3VCLGtCQUF4RTtBQUZOLFNBSGtCO0FBTzdCQyxRQUFBQSxpQ0FBaUMsRUFBRXBDLFNBQVMsQ0FBQ3FDLGdCQUFWLEdBQ2hDQyx3Q0FBd0MsQ0FBQ3RDLFNBQVMsQ0FBQ3FDLGdCQUFYLENBRFIsR0FFaENWO0FBVDBCLE9BQTlCLENBbEIwRyxDQThCMUc7O0FBQ0EsVUFBTVksbUJBQW1CLEdBQUczQixtQkFBbUIsQ0FBQ0csS0FBcEIsQ0FBMEJDLE9BQXREOztBQUNBLG1DQUFJdUIsbUJBQW1CLENBQUNDLFdBQXBCLENBQWdDQyxRQUFwQywwREFBSSxzQkFBMENDLFdBQTlDLEVBQTJEO0FBQUE7O0FBQzFELFlBQU1DLFFBQVEsNkJBQUdKLG1CQUFtQixDQUFDQyxXQUFwQixDQUFnQ0MsUUFBbkMsMkRBQUcsdUJBQTBDQyxXQUEzRDs7QUFDQSxZQUFJRSxnQkFBZ0IsQ0FBQ0QsUUFBRCxDQUFwQixFQUFnQztBQUMvQmYsVUFBQUEsTUFBTSxDQUFDRSxTQUFQLENBQWlCZSxJQUFqQixHQUF3QjtBQUN2QkMsWUFBQUEsS0FBSyxFQUFJSCxRQUFRLENBQUMzQixPQUFYLENBQTRDK0IsSUFENUI7QUFFdkJDLFlBQUFBLFVBQVUsRUFBRSxJQUZXO0FBR3ZCQyxZQUFBQSxNQUFNLEVBQUU7QUFIZSxXQUF4QjtBQUtBLFNBTkQsTUFNTztBQUNOckIsVUFBQUEsTUFBTSxDQUFDRSxTQUFQLENBQWlCZSxJQUFqQixHQUF3QjtBQUN2QkMsWUFBQUEsS0FBSyxFQUFFSCxRQUFRLENBQUNPLFFBQVQsRUFEZ0I7QUFFdkJGLFlBQUFBLFVBQVUsRUFBRSxJQUZXO0FBR3ZCQyxZQUFBQSxNQUFNLEVBQUU7QUFIZSxXQUF4QjtBQUtBO0FBQ0QsT0FmRCxNQWVPLDhCQUFJVixtQkFBbUIsQ0FBQ0MsV0FBcEIsQ0FBZ0NDLFFBQXBDLDJEQUFJLHVCQUEwQ1UsSUFBOUMsRUFBb0Q7QUFBQTs7QUFDMUQsWUFBTU4sSUFBSSw2QkFBR04sbUJBQW1CLENBQUNDLFdBQXBCLENBQWdDQyxRQUFuQywyREFBRyx1QkFBMENVLElBQXZEOztBQUNBLFlBQUlQLGdCQUFnQixDQUFDQyxJQUFELENBQXBCLEVBQTRCO0FBQzNCakIsVUFBQUEsTUFBTSxDQUFDRSxTQUFQLENBQWlCZSxJQUFqQixHQUF3QjtBQUN2QkMsWUFBQUEsS0FBSyxFQUFJRCxJQUFJLENBQUM3QixPQUFQLENBQXdDK0IsSUFEeEI7QUFFdkJDLFlBQUFBLFVBQVUsRUFBRSxLQUZXO0FBR3ZCQyxZQUFBQSxNQUFNLEVBQUU7QUFIZSxXQUF4QjtBQUtBLFNBTkQsTUFNTztBQUNOckIsVUFBQUEsTUFBTSxDQUFDRSxTQUFQLENBQWlCZSxJQUFqQixHQUF3QjtBQUN2QkMsWUFBQUEsS0FBSyxFQUFFRCxJQUFJLENBQUNLLFFBQUwsRUFEZ0I7QUFFdkJGLFlBQUFBLFVBQVUsRUFBRSxLQUZXO0FBR3ZCQyxZQUFBQSxNQUFNLEVBQUU7QUFIZSxXQUF4QjtBQUtBO0FBQ0QsT0E5RHlHLENBZ0UxRzs7O0FBQ0EsVUFBSXJDLG1CQUFtQixDQUFDd0MsV0FBeEIsRUFBcUM7QUFDcEMsWUFBSSxPQUFPeEMsbUJBQW1CLENBQUN3QyxXQUEzQixLQUEyQyxRQUEvQyxFQUF5RDtBQUN4RDtBQUNBLGNBQU1DLG1CQUFtQixHQUFJekMsbUJBQW1CLENBQUN3QyxXQUFyQixDQUMxQnBDLE9BREY7O0FBRUEsY0FBSVosaUJBQWlCLENBQUNhLHNCQUFsQixDQUF5Q29DLG1CQUF6QyxDQUFKLEVBQW1FO0FBQ2xFekIsWUFBQUEsTUFBTSxDQUFDRSxTQUFQLENBQWlCd0IsZUFBakIsR0FBb0MxQyxtQkFBbUIsQ0FBQ3dDLFdBQXJCLENBQStFcEIsSUFBbEg7QUFDQSxXQUZELE1BRU87QUFDTjtBQUNBSixZQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJ5QixnQkFBakIsR0FBb0NDLFdBQVcsQ0FBQ0MsSUFBaEQ7QUFDQTtBQUNELFNBVkQsTUFVTztBQUNOO0FBQ0E3QixVQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJ5QixnQkFBakIsR0FBb0NHLGlDQUFpQyxDQUFDOUMsbUJBQW1CLENBQUN3QyxXQUFyQixDQUFyRTtBQUNBO0FBQ0QsT0FmRCxNQWVPLElBQUl4QyxtQkFBbUIsQ0FBQytDLHNCQUF4QixFQUFnRDtBQUN0RC9CLFFBQUFBLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQjhCLDBCQUFqQixHQUE4Q2hELG1CQUFtQixDQUFDK0Msc0JBQXBCLENBQTJDRSxvQkFBekY7QUFDQWpDLFFBQUFBLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmdDLGdDQUFqQixHQUFvRCxFQUFwRDs7QUFDQSxnQkFBUWxDLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQjhCLDBCQUF6QjtBQUNDLGVBQUssb0NBQUw7QUFDQ2hDLFlBQUFBLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmdDLGdDQUFqQixDQUFrREMsSUFBbEQsQ0FDQ25ELG1CQUFtQixDQUFDK0Msc0JBQXBCLENBQTJDSyxzQkFENUM7QUFHQXBDLFlBQUFBLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmdDLGdDQUFqQixDQUFrREMsSUFBbEQsQ0FDQ25ELG1CQUFtQixDQUFDK0Msc0JBQXBCLENBQTJDTSxzQkFENUM7QUFHQXJDLFlBQUFBLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmdDLGdDQUFqQixDQUFrREMsSUFBbEQsQ0FDQ25ELG1CQUFtQixDQUFDK0Msc0JBQXBCLENBQTJDTyx1QkFENUM7QUFHQXRDLFlBQUFBLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmdDLGdDQUFqQixDQUFrREMsSUFBbEQsQ0FDQ25ELG1CQUFtQixDQUFDK0Msc0JBQXBCLENBQTJDUSx3QkFENUM7QUFHQXZDLFlBQUFBLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmdDLGdDQUFqQixDQUFrREMsSUFBbEQsQ0FDQ25ELG1CQUFtQixDQUFDK0Msc0JBQXBCLENBQTJDUyx1QkFENUM7QUFHQXhDLFlBQUFBLE1BQU0sQ0FBQ0UsU0FBUCxDQUFpQmdDLGdDQUFqQixDQUFrREMsSUFBbEQsQ0FDQ25ELG1CQUFtQixDQUFDK0Msc0JBQXBCLENBQTJDVSx1QkFENUM7QUFHQTs7QUFFRCxlQUFLLHNDQUFMO0FBQ0N6QyxZQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJnQyxnQ0FBakIsQ0FBa0RDLElBQWxELENBQ0NuRCxtQkFBbUIsQ0FBQytDLHNCQUFwQixDQUEyQ1Esd0JBRDVDO0FBR0F2QyxZQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJnQyxnQ0FBakIsQ0FBa0RDLElBQWxELENBQ0NuRCxtQkFBbUIsQ0FBQytDLHNCQUFwQixDQUEyQ1MsdUJBRDVDO0FBR0F4QyxZQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJnQyxnQ0FBakIsQ0FBa0RDLElBQWxELENBQ0NuRCxtQkFBbUIsQ0FBQytDLHNCQUFwQixDQUEyQ1UsdUJBRDVDO0FBR0E7O0FBRUQsZUFBSyxzQ0FBTDtBQUNBO0FBQ0N6QyxZQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJnQyxnQ0FBakIsQ0FBa0RDLElBQWxELENBQ0NuRCxtQkFBbUIsQ0FBQytDLHNCQUFwQixDQUEyQ0ssc0JBRDVDO0FBR0FwQyxZQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJnQyxnQ0FBakIsQ0FBa0RDLElBQWxELENBQ0NuRCxtQkFBbUIsQ0FBQytDLHNCQUFwQixDQUEyQ00sc0JBRDVDO0FBR0FyQyxZQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJnQyxnQ0FBakIsQ0FBa0RDLElBQWxELENBQ0NuRCxtQkFBbUIsQ0FBQytDLHNCQUFwQixDQUEyQ08sdUJBRDVDO0FBMUNGO0FBOENBLE9BakRNLE1BaURBO0FBQ050QyxRQUFBQSxNQUFNLENBQUNFLFNBQVAsQ0FBaUJ5QixnQkFBakIsR0FBb0NDLFdBQVcsQ0FBQ0MsSUFBaEQ7QUFDQTs7QUFFRCxhQUFPN0IsTUFBUDtBQUNBLEtBdElELE1Bc0lPO0FBQUE7O0FBQ04sVUFBSSxDQUFDNUIsU0FBTCxFQUFnQjtBQUNmO0FBQ0FOLFFBQUFBLGdCQUFnQixDQUNkd0IsY0FERixHQUVFQyxRQUZGLENBRVdDLGFBQWEsQ0FBQ0MsVUFGekIsRUFFcUNDLGFBQWEsQ0FBQ0MsTUFGbkQsRUFFMkRDLFNBQVMsQ0FBQ0MsVUFBVixDQUFxQjZDLGFBQXJCLEdBQXFDN0UsU0FBUyxDQUFDVSxTQUYxRztBQUdBLE9BTEQsTUFLTyxJQUFJLHdCQUFDSCxTQUFTLENBQUNPLE1BQVgsdURBQUMsbUJBQWtCQywwQkFBbkIsQ0FBSixFQUFtRDtBQUN6RDtBQUNBZCxRQUFBQSxnQkFBZ0IsQ0FDZHdCLGNBREYsR0FFRUMsUUFGRixDQUVXQyxhQUFhLENBQUNDLFVBRnpCLEVBRXFDQyxhQUFhLENBQUNDLE1BRm5ELEVBRTJEQyxTQUFTLENBQUNDLFVBQVYsQ0FBcUI4QyxvQkFBckIsR0FBNEM5RSxTQUFTLENBQUNVLFNBRmpIO0FBR0EsT0FMTSxNQUtBO0FBQ047QUFDQVQsUUFBQUEsZ0JBQWdCLENBQ2R3QixjQURGLEdBRUVDLFFBRkYsQ0FFV0MsYUFBYSxDQUFDQyxVQUZ6QixFQUVxQ0MsYUFBYSxDQUFDQyxNQUZuRCxFQUUyREMsU0FBUyxDQUFDQyxVQUFWLENBQXFCK0MsWUFBckIsR0FBb0MvRSxTQUFTLENBQUNJLFNBRnpHO0FBR0E7O0FBQ0QsYUFBTzhCLFNBQVA7QUFDQTtBQUNEO0FBRUQ7Ozs7Ozs7O0FBTU8sV0FBUzhDLGlCQUFULENBQTJCL0UsZ0JBQTNCLEVBQWdGO0FBQ3RGLFFBQU1nRixVQUFVLEdBQUdoRixnQkFBZ0IsQ0FBQ2lGLGtCQUFqQixHQUFzQ0MsbUJBQXRDLEVBQW5CO0FBQUEsUUFDQ0MsT0FBd0IsR0FBRyxFQUQ1QjtBQUdBQyxJQUFBQSxNQUFNLENBQUNDLElBQVAsQ0FBWUwsVUFBWixFQUF3Qk0sT0FBeEIsQ0FBZ0MsVUFBQXhGLE9BQU8sRUFBSTtBQUMxQyxVQUFNeUYsSUFBSSxHQUFHMUYsbUJBQW1CLENBQUNDLE9BQUQsRUFBVWtGLFVBQVUsQ0FBQ2xGLE9BQUQsQ0FBcEIsRUFBK0JFLGdCQUEvQixDQUFoQzs7QUFDQSxVQUFJdUYsSUFBSixFQUFVO0FBQ1RKLFFBQUFBLE9BQU8sQ0FBQ2QsSUFBUixDQUFha0IsSUFBYjtBQUNBO0FBQ0QsS0FMRDtBQU9BLFdBQU9KLE9BQVA7QUFDQSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS1BJQ29uZmlndXJhdGlvbiB9IGZyb20gXCIuLi8uLi9NYW5pZmVzdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBQcm9wZXJ0eSB9IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5pbXBvcnQge1xuXHRBbm5vdGF0aW9uVGVybSxcblx0VUlBbm5vdGF0aW9uVGVybXMsXG5cdFBhdGhBbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0Q3JpdGljYWxpdHlUeXBlLFxuXHRJbXByb3ZlbWVudERpcmVjdGlvblR5cGVcbn0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBLUElUeXBlIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzL2Rpc3QvZ2VuZXJhdGVkL1VJXCI7XG5pbXBvcnQgQ29udmVydGVyQ29udGV4dCBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9Db252ZXJ0ZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBLUElJRCB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL0lEXCI7XG5pbXBvcnQgeyBpc1BhdGhFeHByZXNzaW9uIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvUHJvcGVydHlIZWxwZXJcIjtcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcInNhcC9mZS9jb3JlL2Zvcm1hdHRlcnMvVGFibGVGb3JtYXR0ZXJUeXBlc1wiO1xuaW1wb3J0IHsgQWdncmVnYXRpb25IZWxwZXIgfSBmcm9tIFwiLi4vLi4vaGVscGVycy9BZ2dyZWdhdGlvblwiO1xuaW1wb3J0IHsgSXNzdWVDYXRlZ29yeSwgSXNzdWVTZXZlcml0eSwgSXNzdWVUeXBlIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Jc3N1ZU1hbmFnZXJcIjtcbmltcG9ydCB7IGdldE1lc3NhZ2VUeXBlRnJvbUNyaXRpY2FsaXR5VHlwZSB9IGZyb20gXCIuL0NyaXRpY2FsaXR5XCI7XG5pbXBvcnQgeyBnZXRGaWx0ZXJEZWZpbml0aW9uc0Zyb21TZWxlY3Rpb25WYXJpYW50LCBGaWx0ZXJEZWZpbml0aW9uIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9TZWxlY3Rpb25WYXJpYW50SGVscGVyXCI7XG5cbmV4cG9ydCB0eXBlIEtQSURlZmluaXRpb24gPSB7XG5cdGlkOiBzdHJpbmc7XG5cdGVudGl0eVNldDogc3RyaW5nO1xuXHRkYXRhcG9pbnQ6IHtcblx0XHRhbm5vdGF0aW9uUGF0aDogc3RyaW5nO1xuXHRcdHByb3BlcnR5UGF0aDogc3RyaW5nO1xuXHRcdHVuaXQ/OiB7XG5cdFx0XHR2YWx1ZTogc3RyaW5nO1xuXHRcdFx0aXNQYXRoOiBib29sZWFuO1xuXHRcdFx0aXNDdXJyZW5jeTogYm9vbGVhbjtcblx0XHR9O1xuXHRcdGNyaXRpY2FsaXR5UGF0aD86IHN0cmluZztcblx0XHRjcml0aWNhbGl0eVZhbHVlPzogTWVzc2FnZVR5cGU7XG5cdFx0Y3JpdGljYWxpdHlDYWxjdWxhdGlvbk1vZGU/OiBJbXByb3ZlbWVudERpcmVjdGlvblR5cGU7XG5cdFx0Y3JpdGljYWxpdHlDYWxjdWxhdGlvblRocmVzaG9sZHM/OiAobnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbClbXTtcblx0fTtcblx0c2VsZWN0aW9uVmFyaWFudEZpbHRlckRlZmluaXRpb25zPzogRmlsdGVyRGVmaW5pdGlvbltdO1xufTtcblxuZnVuY3Rpb24gY3JlYXRlS1BJRGVmaW5pdGlvbihrcGlOYW1lOiBzdHJpbmcsIGtwaUNvbmZpZzogS1BJQ29uZmlndXJhdGlvbiwgY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IEtQSURlZmluaXRpb24gfCB1bmRlZmluZWQge1xuXHRjb25zdCBrcGlDb252ZXJ0ZXJDb250ZXh0ID0gY29udmVydGVyQ29udGV4dC5nZXRDb252ZXJ0ZXJDb250ZXh0Rm9yKFwiL1wiICsga3BpQ29uZmlnLmVudGl0eVNldCk7XG5cdGNvbnN0IGFLUElBbm5vdGF0aW9ucyA9IGtwaUNvbnZlcnRlckNvbnRleHQuZ2V0QW5ub3RhdGlvbnNCeVRlcm0oXCJVSVwiLCBVSUFubm90YXRpb25UZXJtcy5LUEkpIGFzIEFubm90YXRpb25UZXJtPEtQSVR5cGU+W107XG5cdGNvbnN0IHRhcmdldEtQSSA9IGFLUElBbm5vdGF0aW9ucy5maW5kKGtwaSA9PiB7XG5cdFx0cmV0dXJuIGtwaS5xdWFsaWZpZXIgPT09IGtwaUNvbmZpZy5xdWFsaWZpZXI7XG5cdH0pO1xuXHRjb25zdCBhZ2dyZWdhdGlvbkhlbHBlciA9IG5ldyBBZ2dyZWdhdGlvbkhlbHBlcihrcGlDb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKSwga3BpQ29udmVydGVyQ29udGV4dCk7XG5cblx0aWYgKHRhcmdldEtQSSAmJiB0YXJnZXRLUEkuRGV0YWlsPy5EZWZhdWx0UHJlc2VudGF0aW9uVmFyaWFudCAmJiBhZ2dyZWdhdGlvbkhlbHBlci5pc0FuYWx5dGljc1N1cHBvcnRlZCgpKSB7XG5cdFx0Y29uc3Qga3BpSUQgPSBLUElJRChrcGlOYW1lKTtcblxuXHRcdC8vIERhdGFwb2ludFxuXHRcdGNvbnN0IGRhdGFwb2ludEFubm90YXRpb24gPSB0YXJnZXRLUEkuRGF0YVBvaW50O1xuXHRcdGNvbnN0IGRhdGFwb2ludFByb3BlcnR5ID0gZGF0YXBvaW50QW5ub3RhdGlvbi5WYWx1ZS4kdGFyZ2V0IGFzIFByb3BlcnR5O1xuXHRcdGlmICghYWdncmVnYXRpb25IZWxwZXIuaXNQcm9wZXJ0eUFnZ3JlZ2F0YWJsZShkYXRhcG9pbnRQcm9wZXJ0eSkpIHtcblx0XHRcdC8vIFRoZSBtYWluIHByb3BlcnR5IG9mIHRoZSBLUEkgaXMgbm90IGFnZ3JlZ2F0YWJsZSAtLT4gV2UgY2FuJ3QgY2FsY3VsYXRlIGl0cyB2YWx1ZSBzbyB3ZSBpZ25vcmUgdGhlIEtQSVxuXHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHQuZ2V0RGlhZ25vc3RpY3MoKVxuXHRcdFx0XHQuYWRkSXNzdWUoXG5cdFx0XHRcdFx0SXNzdWVDYXRlZ29yeS5Bbm5vdGF0aW9uLFxuXHRcdFx0XHRcdElzc3VlU2V2ZXJpdHkuTWVkaXVtLFxuXHRcdFx0XHRcdElzc3VlVHlwZS5LUElfSVNTVUVTLk1BSU5fUFJPUEVSVFlfTk9UX0FHR1JFR0FUQUJMRSArIGtwaUNvbmZpZy5xdWFsaWZpZXJcblx0XHRcdFx0KTtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXG5cdFx0Y29uc3Qga3BpRGVmOiBLUElEZWZpbml0aW9uID0ge1xuXHRcdFx0aWQ6IGtwaUlELFxuXHRcdFx0ZW50aXR5U2V0OiBrcGlDb25maWcuZW50aXR5U2V0LFxuXHRcdFx0ZGF0YXBvaW50OiB7XG5cdFx0XHRcdHByb3BlcnR5UGF0aDogZGF0YXBvaW50QW5ub3RhdGlvbi5WYWx1ZS5wYXRoLFxuXHRcdFx0XHRhbm5vdGF0aW9uUGF0aDoga3BpQ29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoKGRhdGFwb2ludEFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lKVxuXHRcdFx0fSxcblx0XHRcdHNlbGVjdGlvblZhcmlhbnRGaWx0ZXJEZWZpbml0aW9uczogdGFyZ2V0S1BJLlNlbGVjdGlvblZhcmlhbnRcblx0XHRcdFx0PyBnZXRGaWx0ZXJEZWZpbml0aW9uc0Zyb21TZWxlY3Rpb25WYXJpYW50KHRhcmdldEtQSS5TZWxlY3Rpb25WYXJpYW50KVxuXHRcdFx0XHQ6IHVuZGVmaW5lZFxuXHRcdH07XG5cblx0XHQvLyBVbml0IG9yIGN1cnJlbmN5XG5cdFx0Y29uc3QgdGFyZ2V0VmFsdWVQcm9wZXJ0eSA9IGRhdGFwb2ludEFubm90YXRpb24uVmFsdWUuJHRhcmdldCBhcyBQcm9wZXJ0eTtcblx0XHRpZiAodGFyZ2V0VmFsdWVQcm9wZXJ0eS5hbm5vdGF0aW9ucy5NZWFzdXJlcz8uSVNPQ3VycmVuY3kpIHtcblx0XHRcdGNvbnN0IGN1cnJlbmN5ID0gdGFyZ2V0VmFsdWVQcm9wZXJ0eS5hbm5vdGF0aW9ucy5NZWFzdXJlcz8uSVNPQ3VycmVuY3k7XG5cdFx0XHRpZiAoaXNQYXRoRXhwcmVzc2lvbihjdXJyZW5jeSkpIHtcblx0XHRcdFx0a3BpRGVmLmRhdGFwb2ludC51bml0ID0ge1xuXHRcdFx0XHRcdHZhbHVlOiAoKGN1cnJlbmN5LiR0YXJnZXQgYXMgdW5rbm93bikgYXMgUHJvcGVydHkpLm5hbWUsXG5cdFx0XHRcdFx0aXNDdXJyZW5jeTogdHJ1ZSxcblx0XHRcdFx0XHRpc1BhdGg6IHRydWVcblx0XHRcdFx0fTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtwaURlZi5kYXRhcG9pbnQudW5pdCA9IHtcblx0XHRcdFx0XHR2YWx1ZTogY3VycmVuY3kudG9TdHJpbmcoKSxcblx0XHRcdFx0XHRpc0N1cnJlbmN5OiB0cnVlLFxuXHRcdFx0XHRcdGlzUGF0aDogZmFsc2Vcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKHRhcmdldFZhbHVlUHJvcGVydHkuYW5ub3RhdGlvbnMuTWVhc3VyZXM/LlVuaXQpIHtcblx0XHRcdGNvbnN0IHVuaXQgPSB0YXJnZXRWYWx1ZVByb3BlcnR5LmFubm90YXRpb25zLk1lYXN1cmVzPy5Vbml0O1xuXHRcdFx0aWYgKGlzUGF0aEV4cHJlc3Npb24odW5pdCkpIHtcblx0XHRcdFx0a3BpRGVmLmRhdGFwb2ludC51bml0ID0ge1xuXHRcdFx0XHRcdHZhbHVlOiAoKHVuaXQuJHRhcmdldCBhcyB1bmtub3duKSBhcyBQcm9wZXJ0eSkubmFtZSxcblx0XHRcdFx0XHRpc0N1cnJlbmN5OiBmYWxzZSxcblx0XHRcdFx0XHRpc1BhdGg6IHRydWVcblx0XHRcdFx0fTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGtwaURlZi5kYXRhcG9pbnQudW5pdCA9IHtcblx0XHRcdFx0XHR2YWx1ZTogdW5pdC50b1N0cmluZygpLFxuXHRcdFx0XHRcdGlzQ3VycmVuY3k6IGZhbHNlLFxuXHRcdFx0XHRcdGlzUGF0aDogZmFsc2Vcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDcml0aWNhbGl0eVxuXHRcdGlmIChkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5KSB7XG5cdFx0XHRpZiAodHlwZW9mIGRhdGFwb2ludEFubm90YXRpb24uQ3JpdGljYWxpdHkgPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdFx0Ly8gQ3JpdGljYWxpdHkgaXMgYSBwYXRoIC0tPiBjaGVjayBpZiB0aGUgY29ycmVzcG9uZGluZyBwcm9wZXJ0eSBpcyBhZ2dyZWdhdGFibGVcblx0XHRcdFx0Y29uc3QgY3JpdGljYWxpdHlQcm9wZXJ0eSA9IChkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5IGFzIFBhdGhBbm5vdGF0aW9uRXhwcmVzc2lvbjxDcml0aWNhbGl0eVR5cGU+KVxuXHRcdFx0XHRcdC4kdGFyZ2V0IGFzIFByb3BlcnR5O1xuXHRcdFx0XHRpZiAoYWdncmVnYXRpb25IZWxwZXIuaXNQcm9wZXJ0eUFnZ3JlZ2F0YWJsZShjcml0aWNhbGl0eVByb3BlcnR5KSkge1xuXHRcdFx0XHRcdGtwaURlZi5kYXRhcG9pbnQuY3JpdGljYWxpdHlQYXRoID0gKGRhdGFwb2ludEFubm90YXRpb24uQ3JpdGljYWxpdHkgYXMgUGF0aEFubm90YXRpb25FeHByZXNzaW9uPENyaXRpY2FsaXR5VHlwZT4pLnBhdGg7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gVGhlIHByb3BlcnR5IGlzbid0IGFnZ3JlZ2F0YWJsZSAtLT4gd2UgaWdub3JlIGl0XG5cdFx0XHRcdFx0a3BpRGVmLmRhdGFwb2ludC5jcml0aWNhbGl0eVZhbHVlID0gTWVzc2FnZVR5cGUuTm9uZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Ly8gQ3JpdGljYWxpdHkgaXMgYW4gZW51bSBWYWx1ZSAtLT4gZ2V0IHRoZSBjb3JyZXNwb25kaW5nIHN0YXRpYyB2YWx1ZVxuXHRcdFx0XHRrcGlEZWYuZGF0YXBvaW50LmNyaXRpY2FsaXR5VmFsdWUgPSBnZXRNZXNzYWdlVHlwZUZyb21Dcml0aWNhbGl0eVR5cGUoZGF0YXBvaW50QW5ub3RhdGlvbi5Dcml0aWNhbGl0eSk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5Q2FsY3VsYXRpb24pIHtcblx0XHRcdGtwaURlZi5kYXRhcG9pbnQuY3JpdGljYWxpdHlDYWxjdWxhdGlvbk1vZGUgPSBkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5Q2FsY3VsYXRpb24uSW1wcm92ZW1lbnREaXJlY3Rpb247XG5cdFx0XHRrcGlEZWYuZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzID0gW107XG5cdFx0XHRzd2l0Y2ggKGtwaURlZi5kYXRhcG9pbnQuY3JpdGljYWxpdHlDYWxjdWxhdGlvbk1vZGUpIHtcblx0XHRcdFx0Y2FzZSBcIlVJLkltcHJvdmVtZW50RGlyZWN0aW9uVHlwZS9UYXJnZXRcIjpcblx0XHRcdFx0XHRrcGlEZWYuZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzLnB1c2goXG5cdFx0XHRcdFx0XHRkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5Q2FsY3VsYXRpb24uRGV2aWF0aW9uUmFuZ2VMb3dWYWx1ZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0a3BpRGVmLmRhdGFwb2ludC5jcml0aWNhbGl0eUNhbGN1bGF0aW9uVGhyZXNob2xkcy5wdXNoKFxuXHRcdFx0XHRcdFx0ZGF0YXBvaW50QW5ub3RhdGlvbi5Dcml0aWNhbGl0eUNhbGN1bGF0aW9uLlRvbGVyYW5jZVJhbmdlTG93VmFsdWVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGtwaURlZi5kYXRhcG9pbnQuY3JpdGljYWxpdHlDYWxjdWxhdGlvblRocmVzaG9sZHMucHVzaChcblx0XHRcdFx0XHRcdGRhdGFwb2ludEFubm90YXRpb24uQ3JpdGljYWxpdHlDYWxjdWxhdGlvbi5BY2NlcHRhbmNlUmFuZ2VMb3dWYWx1ZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0a3BpRGVmLmRhdGFwb2ludC5jcml0aWNhbGl0eUNhbGN1bGF0aW9uVGhyZXNob2xkcy5wdXNoKFxuXHRcdFx0XHRcdFx0ZGF0YXBvaW50QW5ub3RhdGlvbi5Dcml0aWNhbGl0eUNhbGN1bGF0aW9uLkFjY2VwdGFuY2VSYW5nZUhpZ2hWYWx1ZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0a3BpRGVmLmRhdGFwb2ludC5jcml0aWNhbGl0eUNhbGN1bGF0aW9uVGhyZXNob2xkcy5wdXNoKFxuXHRcdFx0XHRcdFx0ZGF0YXBvaW50QW5ub3RhdGlvbi5Dcml0aWNhbGl0eUNhbGN1bGF0aW9uLlRvbGVyYW5jZVJhbmdlSGlnaFZhbHVlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRrcGlEZWYuZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzLnB1c2goXG5cdFx0XHRcdFx0XHRkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5Q2FsY3VsYXRpb24uRGV2aWF0aW9uUmFuZ2VIaWdoVmFsdWVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdGNhc2UgXCJVSS5JbXByb3ZlbWVudERpcmVjdGlvblR5cGUvTWluaW1pemVcIjpcblx0XHRcdFx0XHRrcGlEZWYuZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzLnB1c2goXG5cdFx0XHRcdFx0XHRkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5Q2FsY3VsYXRpb24uQWNjZXB0YW5jZVJhbmdlSGlnaFZhbHVlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRrcGlEZWYuZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzLnB1c2goXG5cdFx0XHRcdFx0XHRkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5Q2FsY3VsYXRpb24uVG9sZXJhbmNlUmFuZ2VIaWdoVmFsdWVcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGtwaURlZi5kYXRhcG9pbnQuY3JpdGljYWxpdHlDYWxjdWxhdGlvblRocmVzaG9sZHMucHVzaChcblx0XHRcdFx0XHRcdGRhdGFwb2ludEFubm90YXRpb24uQ3JpdGljYWxpdHlDYWxjdWxhdGlvbi5EZXZpYXRpb25SYW5nZUhpZ2hWYWx1ZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdFx0Y2FzZSBcIlVJLkltcHJvdmVtZW50RGlyZWN0aW9uVHlwZS9NYXhpbWl6ZVwiOlxuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGtwaURlZi5kYXRhcG9pbnQuY3JpdGljYWxpdHlDYWxjdWxhdGlvblRocmVzaG9sZHMucHVzaChcblx0XHRcdFx0XHRcdGRhdGFwb2ludEFubm90YXRpb24uQ3JpdGljYWxpdHlDYWxjdWxhdGlvbi5EZXZpYXRpb25SYW5nZUxvd1ZhbHVlXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRrcGlEZWYuZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzLnB1c2goXG5cdFx0XHRcdFx0XHRkYXRhcG9pbnRBbm5vdGF0aW9uLkNyaXRpY2FsaXR5Q2FsY3VsYXRpb24uVG9sZXJhbmNlUmFuZ2VMb3dWYWx1ZVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0a3BpRGVmLmRhdGFwb2ludC5jcml0aWNhbGl0eUNhbGN1bGF0aW9uVGhyZXNob2xkcy5wdXNoKFxuXHRcdFx0XHRcdFx0ZGF0YXBvaW50QW5ub3RhdGlvbi5Dcml0aWNhbGl0eUNhbGN1bGF0aW9uLkFjY2VwdGFuY2VSYW5nZUxvd1ZhbHVlXG5cdFx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0a3BpRGVmLmRhdGFwb2ludC5jcml0aWNhbGl0eVZhbHVlID0gTWVzc2FnZVR5cGUuTm9uZTtcblx0XHR9XG5cblx0XHRyZXR1cm4ga3BpRGVmO1xuXHR9IGVsc2Uge1xuXHRcdGlmICghdGFyZ2V0S1BJKSB7XG5cdFx0XHQvLyBDb3VsZG4ndCBmaW5kIGEgS1BJIHdpdGggdGhlIHF1YWxpZmllciBzcGVjaWZpZWQgaW4gdGhlIG1hbmlmZXN0XG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0XHRcdC5nZXREaWFnbm9zdGljcygpXG5cdFx0XHRcdC5hZGRJc3N1ZShJc3N1ZUNhdGVnb3J5LkFubm90YXRpb24sIElzc3VlU2V2ZXJpdHkuTWVkaXVtLCBJc3N1ZVR5cGUuS1BJX0lTU1VFUy5LUElfTk9UX0ZPVU5EICsga3BpQ29uZmlnLnF1YWxpZmllcik7XG5cdFx0fSBlbHNlIGlmICghdGFyZ2V0S1BJLkRldGFpbD8uRGVmYXVsdFByZXNlbnRhdGlvblZhcmlhbnQpIHtcblx0XHRcdC8vIE5vIEtQSSBkZXRhaWwvZGVmYXVsdCBwcmVzZW50YXRpb24gdmFyaWFudFxuXHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHQuZ2V0RGlhZ25vc3RpY3MoKVxuXHRcdFx0XHQuYWRkSXNzdWUoSXNzdWVDYXRlZ29yeS5Bbm5vdGF0aW9uLCBJc3N1ZVNldmVyaXR5Lk1lZGl1bSwgSXNzdWVUeXBlLktQSV9JU1NVRVMuS1BJX0RFVEFJTF9OT1RfRk9VTkQgKyBrcGlDb25maWcucXVhbGlmaWVyKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRW50aXR5IGRvZXNuJ3Qgc3VwcG9ydCBhbmFseXRpY3Ncblx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdFx0LmdldERpYWdub3N0aWNzKClcblx0XHRcdFx0LmFkZElzc3VlKElzc3VlQ2F0ZWdvcnkuQW5ub3RhdGlvbiwgSXNzdWVTZXZlcml0eS5NZWRpdW0sIElzc3VlVHlwZS5LUElfSVNTVUVTLk5PX0FOQUxZVElDUyArIGtwaUNvbmZpZy5lbnRpdHlTZXQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHR9XG59XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgS1BJIGRlZmluaXRpb25zIGZyb20gdGhlIG1hbmlmZXN0IGFuZCB0aGUgYW5ub3RhdGlvbnMuXG4gKlxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dCBmb3IgdGhlIHBhZ2VcbiAqIEByZXR1cm5zIHtLUElEZWZpbml0aW9uW119IFJldHVybnMgYW4gYXJyYXkgb2YgS1BJIGRlZmluaXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRLUElEZWZpbml0aW9ucyhjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogS1BJRGVmaW5pdGlvbltdIHtcblx0Y29uc3Qga3BpQ29uZmlncyA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkuZ2V0S1BJQ29uZmlndXJhdGlvbigpLFxuXHRcdGtwaURlZnM6IEtQSURlZmluaXRpb25bXSA9IFtdO1xuXG5cdE9iamVjdC5rZXlzKGtwaUNvbmZpZ3MpLmZvckVhY2goa3BpTmFtZSA9PiB7XG5cdFx0Y29uc3Qgb0RlZiA9IGNyZWF0ZUtQSURlZmluaXRpb24oa3BpTmFtZSwga3BpQ29uZmlnc1trcGlOYW1lXSwgY29udmVydGVyQ29udGV4dCk7XG5cdFx0aWYgKG9EZWYpIHtcblx0XHRcdGtwaURlZnMucHVzaChvRGVmKTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBrcGlEZWZzO1xufVxuIl19