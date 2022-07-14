/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingExpression", "sap/fe/core/templating/DataModelPathHelper"], function (BindingExpression, DataModelPathHelper) {
  "use strict";

  var _exports = {};
  var getPathRelativeLocation = DataModelPathHelper.getPathRelativeLocation;
  var ifElse = BindingExpression.ifElse;
  var equal = BindingExpression.equal;
  var or = BindingExpression.or;
  var annotationExpression = BindingExpression.annotationExpression;
  var constant = BindingExpression.constant;
  var compileBinding = BindingExpression.compileBinding;

  /**
   * Returns an expression to set button type based on Criticality
   * Supported Criticality: Positive, Negative, Critical and Information leading to Success, Error, Warning and None state respectively.
   *
   * @function
   * @static
   * @name sap.fe.core.CriticalityFormatters.buildExpressionForCriticalityColor
   * @memberof sap.fe.core.CriticalityFormatters
   * @param {object} oTarget A DataField a DataPoint or a DataModelObjectPath.
   * @param {object} [oPropertyDataModelPath] DataModelObjectPath.
   * @returns {string} An expression to deduce the state of an objectStatus.
   * @private
   * @ui5-restricted
   **/
  var buildExpressionForCriticalityColor = function (oTarget, oPropertyDataModelPath) {
    var oAnnotationTarget = oTarget.targetObject ? oTarget.targetObject : oTarget;
    var oCriticalityProperty = oAnnotationTarget === null || oAnnotationTarget === void 0 ? void 0 : oAnnotationTarget.Criticality;
    var relativeLocation = oPropertyDataModelPath ? getPathRelativeLocation(oPropertyDataModelPath.contextLocation, oPropertyDataModelPath.navigationProperties).map(function (np) {
      return np.name;
    }) : undefined;
    var oCriticalityExpression = annotationExpression(oCriticalityProperty, relativeLocation);
    var sValueStateExpression;

    if (oCriticalityProperty) {
      sValueStateExpression = ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Negative")), equal(oCriticalityExpression, constant(1)), equal(oCriticalityExpression, constant("1"))), constant("Error"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Critical")), equal(oCriticalityExpression, constant(2)), equal(oCriticalityExpression, constant("2"))), constant("Warning"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Positive")), equal(oCriticalityExpression, constant(3)), equal(oCriticalityExpression, constant("3"))), constant("Success"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Information")), equal(oCriticalityExpression, constant(5)), equal(oCriticalityExpression, constant("5"))), constant("Indication05"), constant("None")))));
    } else {
      // Any other cases are not valid, the default value of 'None' will be returned
      sValueStateExpression = constant("None");
    }

    return compileBinding(sValueStateExpression);
  };
  /**
   * Returns an expression to set icon type based on Criticality
   * Supported Criticality: Positive, Negative, Critical and Information.
   *
   * @function
   * @static
   * @name sap.fe.core.CriticalityFormatters.buildExpressionForCriticalityIcon
   * @memberof sap.fe.core.CriticalityFormatters
   * @param {object} oTarget A DataField a DataPoint or a DataModelObjectPath.
   * @param {object} [oPropertyDataModelPath] DataModelObjectPath.
   * @returns {string} An expression to deduce the icon of an objectStatus.
   * @private
   * @ui5-restricted
   **/


  _exports.buildExpressionForCriticalityColor = buildExpressionForCriticalityColor;

  var buildExpressionForCriticalityIcon = function (oTarget, oPropertyDataModelPath) {
    var oAnnotationTarget = (oTarget === null || oTarget === void 0 ? void 0 : oTarget.targetObject) ? oTarget.targetObject : oTarget;
    var oCriticalityProperty = oAnnotationTarget === null || oAnnotationTarget === void 0 ? void 0 : oAnnotationTarget.Criticality;
    var relativeLocation = oPropertyDataModelPath ? getPathRelativeLocation(oPropertyDataModelPath.contextLocation, oPropertyDataModelPath.navigationProperties).map(function (np) {
      return np.name;
    }) : undefined;
    var oCriticalityExpression = annotationExpression(oCriticalityProperty, relativeLocation);
    var bCondition = (oAnnotationTarget === null || oAnnotationTarget === void 0 ? void 0 : oAnnotationTarget.CriticalityRepresentation) && (oAnnotationTarget === null || oAnnotationTarget === void 0 ? void 0 : oAnnotationTarget.CriticalityRepresentation) === "UI.CriticalityRepresentationType/WithoutIcon";
    var sIconPath;

    if (!bCondition) {
      if (oCriticalityProperty) {
        sIconPath = ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Negative")), equal(oCriticalityExpression, constant(1)), equal(oCriticalityExpression, constant("1"))), constant("sap-icon://message-error"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Critical")), equal(oCriticalityExpression, constant(2)), equal(oCriticalityExpression, constant("2"))), constant("sap-icon://message-warning"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Positive")), equal(oCriticalityExpression, constant(3)), equal(oCriticalityExpression, constant("3"))), constant("sap-icon://message-success"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Information")), equal(oCriticalityExpression, constant(5)), equal(oCriticalityExpression, constant("5"))), constant("sap-icon://message-information"), constant("")))));
      } else {
        sIconPath = constant("");
      }
    } else {
      sIconPath = constant("");
    }

    return compileBinding(sIconPath);
  };
  /**
   * Returns an expression to set button type based on Criticality
   * Supported Criticality: Positive and Negative leading to Accept and Reject button type respectively.
   *
   * @function
   * @static
   * @name sap.fe.core.CriticalityFormatters.buildExpressionForCriticalityButtonType
   * @memberof sap.fe.core.CriticalityFormatters
   * @param {object} oTarget A DataField, DataPoint, DataModelObjectPath.
   * @returns {string} An expression to deduce button type.
   * @private
   * @ui5-restricted
   **/


  _exports.buildExpressionForCriticalityIcon = buildExpressionForCriticalityIcon;

  var buildExpressionForCriticalityButtonType = function (oTarget) {
    var oAnnotationTarget = (oTarget === null || oTarget === void 0 ? void 0 : oTarget.targetObject) ? oTarget.targetObject : oTarget;
    var oCriticalityProperty = oAnnotationTarget === null || oAnnotationTarget === void 0 ? void 0 : oAnnotationTarget.Criticality;
    var oCriticalityExpression = annotationExpression(oCriticalityProperty);
    var sButtonTypeExpression;

    if (oCriticalityProperty) {
      sButtonTypeExpression = ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Negative")), equal(oCriticalityExpression, constant(1)), equal(oCriticalityExpression, constant("1"))), constant("Reject"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Positive")), equal(oCriticalityExpression, constant(3)), equal(oCriticalityExpression, constant("3"))), constant("Accept"), constant("Default")));
    } else {
      // Any other cases are not valid, the default value of 'Default' will be returned
      sButtonTypeExpression = constant("Default");
    }

    return compileBinding(sButtonTypeExpression);
  };
  /**
   * Returns an expression to set color in MicroCharts based on Criticality
   * Supported Criticality: Positive, Negative and Critical leading to Good, Error and Critical color respectively.
   *
   * @function
   * @static
   * @name sap.fe.core.CriticalityFormatters.buildExpressionForCriticalityColorMicroChart
   * @memberof sap.fe.core.CriticalityFormatters
   * @param {object} oTarget A DataField, DataPoint, DataModelObjectPath
   * @returns {string} An expression to deduce colors in Microcharts
   * @private
   * @ui5-restricted
   **/


  _exports.buildExpressionForCriticalityButtonType = buildExpressionForCriticalityButtonType;

  var buildExpressionForCriticalityColorMicroChart = function (oTarget) {
    var oAnnotationTarget = (oTarget === null || oTarget === void 0 ? void 0 : oTarget.targetObject) ? oTarget.targetObject : oTarget;
    var oCriticalityProperty = oAnnotationTarget === null || oAnnotationTarget === void 0 ? void 0 : oAnnotationTarget.Criticality;
    var oCriticalityExpression = annotationExpression(oCriticalityProperty);
    var sColorExpression;

    if (oCriticalityProperty) {
      sColorExpression = ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Negative")), equal(oCriticalityExpression, constant(1)), equal(oCriticalityExpression, constant("1"))), constant("Error"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Critical")), equal(oCriticalityExpression, constant(2)), equal(oCriticalityExpression, constant("2"))), constant("Critical"), ifElse(or(equal(oCriticalityExpression, constant("UI.CriticalityType/Positive")), equal(oCriticalityExpression, constant(3)), equal(oCriticalityExpression, constant("3"))), constant("Good"), constant("Neutral"))));
    } else {
      sColorExpression = constant("Neutral");
    }

    return compileBinding(sColorExpression);
  };

  _exports.buildExpressionForCriticalityColorMicroChart = buildExpressionForCriticalityColorMicroChart;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNyaXRpY2FsaXR5Rm9ybWF0dGVycy50cyJdLCJuYW1lcyI6WyJidWlsZEV4cHJlc3Npb25Gb3JDcml0aWNhbGl0eUNvbG9yIiwib1RhcmdldCIsIm9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgiLCJvQW5ub3RhdGlvblRhcmdldCIsInRhcmdldE9iamVjdCIsIm9Dcml0aWNhbGl0eVByb3BlcnR5IiwiQ3JpdGljYWxpdHkiLCJyZWxhdGl2ZUxvY2F0aW9uIiwiZ2V0UGF0aFJlbGF0aXZlTG9jYXRpb24iLCJjb250ZXh0TG9jYXRpb24iLCJuYXZpZ2F0aW9uUHJvcGVydGllcyIsIm1hcCIsIm5wIiwibmFtZSIsInVuZGVmaW5lZCIsIm9Dcml0aWNhbGl0eUV4cHJlc3Npb24iLCJhbm5vdGF0aW9uRXhwcmVzc2lvbiIsInNWYWx1ZVN0YXRlRXhwcmVzc2lvbiIsImlmRWxzZSIsIm9yIiwiZXF1YWwiLCJjb25zdGFudCIsImNvbXBpbGVCaW5kaW5nIiwiYnVpbGRFeHByZXNzaW9uRm9yQ3JpdGljYWxpdHlJY29uIiwiYkNvbmRpdGlvbiIsIkNyaXRpY2FsaXR5UmVwcmVzZW50YXRpb24iLCJzSWNvblBhdGgiLCJidWlsZEV4cHJlc3Npb25Gb3JDcml0aWNhbGl0eUJ1dHRvblR5cGUiLCJzQnV0dG9uVHlwZUV4cHJlc3Npb24iLCJidWlsZEV4cHJlc3Npb25Gb3JDcml0aWNhbGl0eUNvbG9yTWljcm9DaGFydCIsInNDb2xvckV4cHJlc3Npb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7QUFjTyxNQUFNQSxrQ0FBa0MsR0FBRyxVQUFDQyxPQUFELEVBQWVDLHNCQUFmLEVBQW1GO0FBQ3BJLFFBQU1DLGlCQUFpQixHQUFHRixPQUFPLENBQUNHLFlBQVIsR0FBdUJILE9BQU8sQ0FBQ0csWUFBL0IsR0FBOENILE9BQXhFO0FBQ0EsUUFBTUksb0JBQW9CLEdBQUdGLGlCQUFILGFBQUdBLGlCQUFILHVCQUFHQSxpQkFBaUIsQ0FBRUcsV0FBaEQ7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBR0wsc0JBQXNCLEdBQzVDTSx1QkFBdUIsQ0FBQ04sc0JBQXNCLENBQUNPLGVBQXhCLEVBQXlDUCxzQkFBc0IsQ0FBQ1Esb0JBQWhFLENBQXZCLENBQTZHQyxHQUE3RyxDQUFpSCxVQUFBQyxFQUFFO0FBQUEsYUFBSUEsRUFBRSxDQUFDQyxJQUFQO0FBQUEsS0FBbkgsQ0FENEMsR0FFNUNDLFNBRkg7QUFHQSxRQUFNQyxzQkFBMEMsR0FBR0Msb0JBQW9CLENBQUNYLG9CQUFELEVBQXVCRSxnQkFBdkIsQ0FBdkU7QUFDQSxRQUFJVSxxQkFBSjs7QUFDQSxRQUFJWixvQkFBSixFQUEwQjtBQUN6QlksTUFBQUEscUJBQXFCLEdBQUdDLE1BQU0sQ0FDN0JDLEVBQUUsQ0FDREMsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLDZCQUFELENBQWpDLENBREosRUFFREQsS0FBSyxDQUFDTCxzQkFBRCxFQUErQ00sUUFBUSxDQUFDLENBQUQsQ0FBdkQsQ0FGSixFQUdERCxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsR0FBRCxDQUFqQyxDQUhKLENBRDJCLEVBTTdCQSxRQUFRLENBQUMsT0FBRCxDQU5xQixFQU83QkgsTUFBTSxDQUNMQyxFQUFFLENBQ0RDLEtBQUssQ0FBQ0wsc0JBQUQsRUFBeUJNLFFBQVEsQ0FBQyw2QkFBRCxDQUFqQyxDQURKLEVBRURELEtBQUssQ0FBQ0wsc0JBQUQsRUFBK0NNLFFBQVEsQ0FBQyxDQUFELENBQXZELENBRkosRUFHREQsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLEdBQUQsQ0FBakMsQ0FISixDQURHLEVBTUxBLFFBQVEsQ0FBQyxTQUFELENBTkgsRUFPTEgsTUFBTSxDQUNMQyxFQUFFLENBQ0RDLEtBQUssQ0FBQ0wsc0JBQUQsRUFBeUJNLFFBQVEsQ0FBQyw2QkFBRCxDQUFqQyxDQURKLEVBRURELEtBQUssQ0FBQ0wsc0JBQUQsRUFBK0NNLFFBQVEsQ0FBQyxDQUFELENBQXZELENBRkosRUFHREQsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLEdBQUQsQ0FBakMsQ0FISixDQURHLEVBTUxBLFFBQVEsQ0FBQyxTQUFELENBTkgsRUFPTEgsTUFBTSxDQUNMQyxFQUFFLENBQ0RDLEtBQUssQ0FBQ0wsc0JBQUQsRUFBeUJNLFFBQVEsQ0FBQyxnQ0FBRCxDQUFqQyxDQURKLEVBRURELEtBQUssQ0FBQ0wsc0JBQUQsRUFBK0NNLFFBQVEsQ0FBQyxDQUFELENBQXZELENBRkosRUFHREQsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLEdBQUQsQ0FBakMsQ0FISixDQURHLEVBTUxBLFFBQVEsQ0FBQyxjQUFELENBTkgsRUFPTEEsUUFBUSxDQUFDLE1BQUQsQ0FQSCxDQVBELENBUEQsQ0FQdUIsQ0FBOUI7QUFpQ0EsS0FsQ0QsTUFrQ087QUFDTjtBQUNBSixNQUFBQSxxQkFBcUIsR0FBR0ksUUFBUSxDQUFDLE1BQUQsQ0FBaEM7QUFDQTs7QUFDRCxXQUFPQyxjQUFjLENBQUNMLHFCQUFELENBQXJCO0FBQ0EsR0EvQ007QUFpRFA7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWNPLE1BQU1NLGlDQUFpQyxHQUFHLFVBQUN0QixPQUFELEVBQWVDLHNCQUFmLEVBQW1GO0FBQ25JLFFBQU1DLGlCQUFpQixHQUFHLENBQUFGLE9BQU8sU0FBUCxJQUFBQSxPQUFPLFdBQVAsWUFBQUEsT0FBTyxDQUFFRyxZQUFULElBQXdCSCxPQUFPLENBQUNHLFlBQWhDLEdBQStDSCxPQUF6RTtBQUNBLFFBQU1JLG9CQUFvQixHQUFHRixpQkFBSCxhQUFHQSxpQkFBSCx1QkFBR0EsaUJBQWlCLENBQUVHLFdBQWhEO0FBQ0EsUUFBTUMsZ0JBQWdCLEdBQUdMLHNCQUFzQixHQUM1Q00sdUJBQXVCLENBQUNOLHNCQUFzQixDQUFDTyxlQUF4QixFQUF5Q1Asc0JBQXNCLENBQUNRLG9CQUFoRSxDQUF2QixDQUE2R0MsR0FBN0csQ0FBaUgsVUFBQUMsRUFBRTtBQUFBLGFBQUlBLEVBQUUsQ0FBQ0MsSUFBUDtBQUFBLEtBQW5ILENBRDRDLEdBRTVDQyxTQUZIO0FBR0EsUUFBTUMsc0JBQTBDLEdBQUdDLG9CQUFvQixDQUFDWCxvQkFBRCxFQUF1QkUsZ0JBQXZCLENBQXZFO0FBQ0EsUUFBTWlCLFVBQVUsR0FDZixDQUFBckIsaUJBQWlCLFNBQWpCLElBQUFBLGlCQUFpQixXQUFqQixZQUFBQSxpQkFBaUIsQ0FBRXNCLHlCQUFuQixLQUNBLENBQUF0QixpQkFBaUIsU0FBakIsSUFBQUEsaUJBQWlCLFdBQWpCLFlBQUFBLGlCQUFpQixDQUFFc0IseUJBQW5CLE1BQWlELDhDQUZsRDtBQUdBLFFBQUlDLFNBQUo7O0FBQ0EsUUFBSSxDQUFDRixVQUFMLEVBQWlCO0FBQ2hCLFVBQUluQixvQkFBSixFQUEwQjtBQUN6QnFCLFFBQUFBLFNBQVMsR0FBR1IsTUFBTSxDQUNqQkMsRUFBRSxDQUNEQyxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsNkJBQUQsQ0FBakMsQ0FESixFQUVERCxLQUFLLENBQUNMLHNCQUFELEVBQStDTSxRQUFRLENBQUMsQ0FBRCxDQUF2RCxDQUZKLEVBR0RELEtBQUssQ0FBQ0wsc0JBQUQsRUFBeUJNLFFBQVEsQ0FBQyxHQUFELENBQWpDLENBSEosQ0FEZSxFQU1qQkEsUUFBUSxDQUFDLDBCQUFELENBTlMsRUFPakJILE1BQU0sQ0FDTEMsRUFBRSxDQUNEQyxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsNkJBQUQsQ0FBakMsQ0FESixFQUVERCxLQUFLLENBQUNMLHNCQUFELEVBQStDTSxRQUFRLENBQUMsQ0FBRCxDQUF2RCxDQUZKLEVBR0RELEtBQUssQ0FBQ0wsc0JBQUQsRUFBeUJNLFFBQVEsQ0FBQyxHQUFELENBQWpDLENBSEosQ0FERyxFQU1MQSxRQUFRLENBQUMsNEJBQUQsQ0FOSCxFQU9MSCxNQUFNLENBQ0xDLEVBQUUsQ0FDREMsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLDZCQUFELENBQWpDLENBREosRUFFREQsS0FBSyxDQUFDTCxzQkFBRCxFQUErQ00sUUFBUSxDQUFDLENBQUQsQ0FBdkQsQ0FGSixFQUdERCxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsR0FBRCxDQUFqQyxDQUhKLENBREcsRUFNTEEsUUFBUSxDQUFDLDRCQUFELENBTkgsRUFPTEgsTUFBTSxDQUNMQyxFQUFFLENBQ0RDLEtBQUssQ0FBQ0wsc0JBQUQsRUFBeUJNLFFBQVEsQ0FBQyxnQ0FBRCxDQUFqQyxDQURKLEVBRURELEtBQUssQ0FBQ0wsc0JBQUQsRUFBK0NNLFFBQVEsQ0FBQyxDQUFELENBQXZELENBRkosRUFHREQsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLEdBQUQsQ0FBakMsQ0FISixDQURHLEVBTUxBLFFBQVEsQ0FBQyxnQ0FBRCxDQU5ILEVBT0xBLFFBQVEsQ0FBQyxFQUFELENBUEgsQ0FQRCxDQVBELENBUFcsQ0FBbEI7QUFpQ0EsT0FsQ0QsTUFrQ087QUFDTkssUUFBQUEsU0FBUyxHQUFHTCxRQUFRLENBQUMsRUFBRCxDQUFwQjtBQUNBO0FBQ0QsS0F0Q0QsTUFzQ087QUFDTkssTUFBQUEsU0FBUyxHQUFHTCxRQUFRLENBQUMsRUFBRCxDQUFwQjtBQUNBOztBQUNELFdBQU9DLGNBQWMsQ0FBQ0ksU0FBRCxDQUFyQjtBQUNBLEdBckRNO0FBdURQOzs7Ozs7Ozs7Ozs7Ozs7OztBQWFPLE1BQU1DLHVDQUF1QyxHQUFHLFVBQUMxQixPQUFELEVBQXNDO0FBQzVGLFFBQU1FLGlCQUFpQixHQUFHLENBQUFGLE9BQU8sU0FBUCxJQUFBQSxPQUFPLFdBQVAsWUFBQUEsT0FBTyxDQUFFRyxZQUFULElBQXdCSCxPQUFPLENBQUNHLFlBQWhDLEdBQStDSCxPQUF6RTtBQUNBLFFBQU1JLG9CQUFvQixHQUFHRixpQkFBSCxhQUFHQSxpQkFBSCx1QkFBR0EsaUJBQWlCLENBQUVHLFdBQWhEO0FBQ0EsUUFBTVMsc0JBQTBDLEdBQUdDLG9CQUFvQixDQUFDWCxvQkFBRCxDQUF2RTtBQUNBLFFBQUl1QixxQkFBSjs7QUFDQSxRQUFJdkIsb0JBQUosRUFBMEI7QUFDekJ1QixNQUFBQSxxQkFBcUIsR0FBR1YsTUFBTSxDQUM3QkMsRUFBRSxDQUNEQyxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsNkJBQUQsQ0FBakMsQ0FESixFQUVERCxLQUFLLENBQUNMLHNCQUFELEVBQStDTSxRQUFRLENBQUMsQ0FBRCxDQUF2RCxDQUZKLEVBR0RELEtBQUssQ0FBQ0wsc0JBQUQsRUFBeUJNLFFBQVEsQ0FBQyxHQUFELENBQWpDLENBSEosQ0FEMkIsRUFNN0JBLFFBQVEsQ0FBQyxRQUFELENBTnFCLEVBTzdCSCxNQUFNLENBQ0xDLEVBQUUsQ0FDREMsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLDZCQUFELENBQWpDLENBREosRUFFREQsS0FBSyxDQUFDTCxzQkFBRCxFQUErQ00sUUFBUSxDQUFDLENBQUQsQ0FBdkQsQ0FGSixFQUdERCxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsR0FBRCxDQUFqQyxDQUhKLENBREcsRUFNTEEsUUFBUSxDQUFDLFFBQUQsQ0FOSCxFQU9MQSxRQUFRLENBQUMsU0FBRCxDQVBILENBUHVCLENBQTlCO0FBaUJBLEtBbEJELE1Ba0JPO0FBQ047QUFDQU8sTUFBQUEscUJBQXFCLEdBQUdQLFFBQVEsQ0FBQyxTQUFELENBQWhDO0FBQ0E7O0FBQ0QsV0FBT0MsY0FBYyxDQUFDTSxxQkFBRCxDQUFyQjtBQUNBLEdBNUJNO0FBOEJQOzs7Ozs7Ozs7Ozs7Ozs7OztBQWFPLE1BQU1DLDRDQUE0QyxHQUFHLFVBQUM1QixPQUFELEVBQXNDO0FBQ2pHLFFBQU1FLGlCQUFpQixHQUFHLENBQUFGLE9BQU8sU0FBUCxJQUFBQSxPQUFPLFdBQVAsWUFBQUEsT0FBTyxDQUFFRyxZQUFULElBQXdCSCxPQUFPLENBQUNHLFlBQWhDLEdBQStDSCxPQUF6RTtBQUNBLFFBQU1JLG9CQUFvQixHQUFHRixpQkFBSCxhQUFHQSxpQkFBSCx1QkFBR0EsaUJBQWlCLENBQUVHLFdBQWhEO0FBQ0EsUUFBTVMsc0JBQTBDLEdBQUdDLG9CQUFvQixDQUFDWCxvQkFBRCxDQUF2RTtBQUNBLFFBQUl5QixnQkFBSjs7QUFDQSxRQUFJekIsb0JBQUosRUFBMEI7QUFDekJ5QixNQUFBQSxnQkFBZ0IsR0FBR1osTUFBTSxDQUN4QkMsRUFBRSxDQUNEQyxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsNkJBQUQsQ0FBakMsQ0FESixFQUVERCxLQUFLLENBQUNMLHNCQUFELEVBQStDTSxRQUFRLENBQUMsQ0FBRCxDQUF2RCxDQUZKLEVBR0RELEtBQUssQ0FBQ0wsc0JBQUQsRUFBeUJNLFFBQVEsQ0FBQyxHQUFELENBQWpDLENBSEosQ0FEc0IsRUFNeEJBLFFBQVEsQ0FBQyxPQUFELENBTmdCLEVBT3hCSCxNQUFNLENBQ0xDLEVBQUUsQ0FDREMsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLDZCQUFELENBQWpDLENBREosRUFFREQsS0FBSyxDQUFDTCxzQkFBRCxFQUErQ00sUUFBUSxDQUFDLENBQUQsQ0FBdkQsQ0FGSixFQUdERCxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsR0FBRCxDQUFqQyxDQUhKLENBREcsRUFNTEEsUUFBUSxDQUFDLFVBQUQsQ0FOSCxFQU9MSCxNQUFNLENBQ0xDLEVBQUUsQ0FDREMsS0FBSyxDQUFDTCxzQkFBRCxFQUF5Qk0sUUFBUSxDQUFDLDZCQUFELENBQWpDLENBREosRUFFREQsS0FBSyxDQUFDTCxzQkFBRCxFQUErQ00sUUFBUSxDQUFDLENBQUQsQ0FBdkQsQ0FGSixFQUdERCxLQUFLLENBQUNMLHNCQUFELEVBQXlCTSxRQUFRLENBQUMsR0FBRCxDQUFqQyxDQUhKLENBREcsRUFNTEEsUUFBUSxDQUFDLE1BQUQsQ0FOSCxFQU9MQSxRQUFRLENBQUMsU0FBRCxDQVBILENBUEQsQ0FQa0IsQ0FBekI7QUF5QkEsS0ExQkQsTUEwQk87QUFDTlMsTUFBQUEsZ0JBQWdCLEdBQUdULFFBQVEsQ0FBQyxTQUFELENBQTNCO0FBQ0E7O0FBQ0QsV0FBT0MsY0FBYyxDQUFDUSxnQkFBRCxDQUFyQjtBQUNBLEdBbkNNIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb21waWxlQmluZGluZywgY29uc3RhbnQsIEV4cHJlc3Npb24sIGFubm90YXRpb25FeHByZXNzaW9uLCBvciwgZXF1YWwsIGlmRWxzZSB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdFeHByZXNzaW9uXCI7XG5pbXBvcnQgeyBEYXRhTW9kZWxPYmplY3RQYXRoLCBnZXRQYXRoUmVsYXRpdmVMb2NhdGlvbiB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0RhdGFNb2RlbFBhdGhIZWxwZXJcIjtcbi8qKlxuICogUmV0dXJucyBhbiBleHByZXNzaW9uIHRvIHNldCBidXR0b24gdHlwZSBiYXNlZCBvbiBDcml0aWNhbGl0eVxuICogU3VwcG9ydGVkIENyaXRpY2FsaXR5OiBQb3NpdGl2ZSwgTmVnYXRpdmUsIENyaXRpY2FsIGFuZCBJbmZvcm1hdGlvbiBsZWFkaW5nIHRvIFN1Y2Nlc3MsIEVycm9yLCBXYXJuaW5nIGFuZCBOb25lIHN0YXRlIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBzdGF0aWNcbiAqIEBuYW1lIHNhcC5mZS5jb3JlLkNyaXRpY2FsaXR5Rm9ybWF0dGVycy5idWlsZEV4cHJlc3Npb25Gb3JDcml0aWNhbGl0eUNvbG9yXG4gKiBAbWVtYmVyb2Ygc2FwLmZlLmNvcmUuQ3JpdGljYWxpdHlGb3JtYXR0ZXJzXG4gKiBAcGFyYW0ge29iamVjdH0gb1RhcmdldCBBIERhdGFGaWVsZCBhIERhdGFQb2ludCBvciBhIERhdGFNb2RlbE9iamVjdFBhdGguXG4gKiBAcGFyYW0ge29iamVjdH0gW29Qcm9wZXJ0eURhdGFNb2RlbFBhdGhdIERhdGFNb2RlbE9iamVjdFBhdGguXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBleHByZXNzaW9uIHRvIGRlZHVjZSB0aGUgc3RhdGUgb2YgYW4gb2JqZWN0U3RhdHVzLlxuICogQHByaXZhdGVcbiAqIEB1aTUtcmVzdHJpY3RlZFxuICoqL1xuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwcmVzc2lvbkZvckNyaXRpY2FsaXR5Q29sb3IgPSAob1RhcmdldDogYW55LCBvUHJvcGVydHlEYXRhTW9kZWxQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcblx0Y29uc3Qgb0Fubm90YXRpb25UYXJnZXQgPSBvVGFyZ2V0LnRhcmdldE9iamVjdCA/IG9UYXJnZXQudGFyZ2V0T2JqZWN0IDogb1RhcmdldDtcblx0Y29uc3Qgb0NyaXRpY2FsaXR5UHJvcGVydHkgPSBvQW5ub3RhdGlvblRhcmdldD8uQ3JpdGljYWxpdHk7XG5cdGNvbnN0IHJlbGF0aXZlTG9jYXRpb24gPSBvUHJvcGVydHlEYXRhTW9kZWxQYXRoXG5cdFx0PyBnZXRQYXRoUmVsYXRpdmVMb2NhdGlvbihvUHJvcGVydHlEYXRhTW9kZWxQYXRoLmNvbnRleHRMb2NhdGlvbiwgb1Byb3BlcnR5RGF0YU1vZGVsUGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcykubWFwKG5wID0+IG5wLm5hbWUpXG5cdFx0OiB1bmRlZmluZWQ7XG5cdGNvbnN0IG9Dcml0aWNhbGl0eUV4cHJlc3Npb246IEV4cHJlc3Npb248c3RyaW5nPiA9IGFubm90YXRpb25FeHByZXNzaW9uKG9Dcml0aWNhbGl0eVByb3BlcnR5LCByZWxhdGl2ZUxvY2F0aW9uKTtcblx0bGV0IHNWYWx1ZVN0YXRlRXhwcmVzc2lvbjtcblx0aWYgKG9Dcml0aWNhbGl0eVByb3BlcnR5KSB7XG5cdFx0c1ZhbHVlU3RhdGVFeHByZXNzaW9uID0gaWZFbHNlKFxuXHRcdFx0b3IoXG5cdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiVUkuQ3JpdGljYWxpdHlUeXBlL05lZ2F0aXZlXCIpKSxcblx0XHRcdFx0ZXF1YWwob0NyaXRpY2FsaXR5RXhwcmVzc2lvbiBhcyBFeHByZXNzaW9uPE51bWJlcj4sIGNvbnN0YW50KDEpKSxcblx0XHRcdFx0ZXF1YWwob0NyaXRpY2FsaXR5RXhwcmVzc2lvbiwgY29uc3RhbnQoXCIxXCIpKVxuXHRcdFx0KSxcblx0XHRcdGNvbnN0YW50KFwiRXJyb3JcIiksXG5cdFx0XHRpZkVsc2UoXG5cdFx0XHRcdG9yKFxuXHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiVUkuQ3JpdGljYWxpdHlUeXBlL0NyaXRpY2FsXCIpKSxcblx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uIGFzIEV4cHJlc3Npb248TnVtYmVyPiwgY29uc3RhbnQoMikpLFxuXHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiMlwiKSlcblx0XHRcdFx0KSxcblx0XHRcdFx0Y29uc3RhbnQoXCJXYXJuaW5nXCIpLFxuXHRcdFx0XHRpZkVsc2UoXG5cdFx0XHRcdFx0b3IoXG5cdFx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIlVJLkNyaXRpY2FsaXR5VHlwZS9Qb3NpdGl2ZVwiKSksXG5cdFx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uIGFzIEV4cHJlc3Npb248TnVtYmVyPiwgY29uc3RhbnQoMykpLFxuXHRcdFx0XHRcdFx0ZXF1YWwob0NyaXRpY2FsaXR5RXhwcmVzc2lvbiwgY29uc3RhbnQoXCIzXCIpKVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0Y29uc3RhbnQoXCJTdWNjZXNzXCIpLFxuXHRcdFx0XHRcdGlmRWxzZShcblx0XHRcdFx0XHRcdG9yKFxuXHRcdFx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIlVJLkNyaXRpY2FsaXR5VHlwZS9JbmZvcm1hdGlvblwiKSksXG5cdFx0XHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24gYXMgRXhwcmVzc2lvbjxOdW1iZXI+LCBjb25zdGFudCg1KSksXG5cdFx0XHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiNVwiKSlcblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRjb25zdGFudChcIkluZGljYXRpb24wNVwiKSxcblx0XHRcdFx0XHRcdGNvbnN0YW50KFwiTm9uZVwiKVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0gZWxzZSB7XG5cdFx0Ly8gQW55IG90aGVyIGNhc2VzIGFyZSBub3QgdmFsaWQsIHRoZSBkZWZhdWx0IHZhbHVlIG9mICdOb25lJyB3aWxsIGJlIHJldHVybmVkXG5cdFx0c1ZhbHVlU3RhdGVFeHByZXNzaW9uID0gY29uc3RhbnQoXCJOb25lXCIpO1xuXHR9XG5cdHJldHVybiBjb21waWxlQmluZGluZyhzVmFsdWVTdGF0ZUV4cHJlc3Npb24pO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGV4cHJlc3Npb24gdG8gc2V0IGljb24gdHlwZSBiYXNlZCBvbiBDcml0aWNhbGl0eVxuICogU3VwcG9ydGVkIENyaXRpY2FsaXR5OiBQb3NpdGl2ZSwgTmVnYXRpdmUsIENyaXRpY2FsIGFuZCBJbmZvcm1hdGlvbi5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBzdGF0aWNcbiAqIEBuYW1lIHNhcC5mZS5jb3JlLkNyaXRpY2FsaXR5Rm9ybWF0dGVycy5idWlsZEV4cHJlc3Npb25Gb3JDcml0aWNhbGl0eUljb25cbiAqIEBtZW1iZXJvZiBzYXAuZmUuY29yZS5Dcml0aWNhbGl0eUZvcm1hdHRlcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvVGFyZ2V0IEEgRGF0YUZpZWxkIGEgRGF0YVBvaW50IG9yIGEgRGF0YU1vZGVsT2JqZWN0UGF0aC5cbiAqIEBwYXJhbSB7b2JqZWN0fSBbb1Byb3BlcnR5RGF0YU1vZGVsUGF0aF0gRGF0YU1vZGVsT2JqZWN0UGF0aC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIGV4cHJlc3Npb24gdG8gZGVkdWNlIHRoZSBpY29uIG9mIGFuIG9iamVjdFN0YXR1cy5cbiAqIEBwcml2YXRlXG4gKiBAdWk1LXJlc3RyaWN0ZWRcbiAqKi9cbmV4cG9ydCBjb25zdCBidWlsZEV4cHJlc3Npb25Gb3JDcml0aWNhbGl0eUljb24gPSAob1RhcmdldDogYW55LCBvUHJvcGVydHlEYXRhTW9kZWxQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcblx0Y29uc3Qgb0Fubm90YXRpb25UYXJnZXQgPSBvVGFyZ2V0Py50YXJnZXRPYmplY3QgPyBvVGFyZ2V0LnRhcmdldE9iamVjdCA6IG9UYXJnZXQ7XG5cdGNvbnN0IG9Dcml0aWNhbGl0eVByb3BlcnR5ID0gb0Fubm90YXRpb25UYXJnZXQ/LkNyaXRpY2FsaXR5O1xuXHRjb25zdCByZWxhdGl2ZUxvY2F0aW9uID0gb1Byb3BlcnR5RGF0YU1vZGVsUGF0aFxuXHRcdD8gZ2V0UGF0aFJlbGF0aXZlTG9jYXRpb24ob1Byb3BlcnR5RGF0YU1vZGVsUGF0aC5jb250ZXh0TG9jYXRpb24sIG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgubmF2aWdhdGlvblByb3BlcnRpZXMpLm1hcChucCA9PiBucC5uYW1lKVxuXHRcdDogdW5kZWZpbmVkO1xuXHRjb25zdCBvQ3JpdGljYWxpdHlFeHByZXNzaW9uOiBFeHByZXNzaW9uPHN0cmluZz4gPSBhbm5vdGF0aW9uRXhwcmVzc2lvbihvQ3JpdGljYWxpdHlQcm9wZXJ0eSwgcmVsYXRpdmVMb2NhdGlvbik7XG5cdGNvbnN0IGJDb25kaXRpb24gPVxuXHRcdG9Bbm5vdGF0aW9uVGFyZ2V0Py5Dcml0aWNhbGl0eVJlcHJlc2VudGF0aW9uICYmXG5cdFx0b0Fubm90YXRpb25UYXJnZXQ/LkNyaXRpY2FsaXR5UmVwcmVzZW50YXRpb24gPT09IFwiVUkuQ3JpdGljYWxpdHlSZXByZXNlbnRhdGlvblR5cGUvV2l0aG91dEljb25cIjtcblx0bGV0IHNJY29uUGF0aDtcblx0aWYgKCFiQ29uZGl0aW9uKSB7XG5cdFx0aWYgKG9Dcml0aWNhbGl0eVByb3BlcnR5KSB7XG5cdFx0XHRzSWNvblBhdGggPSBpZkVsc2UoXG5cdFx0XHRcdG9yKFxuXHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiVUkuQ3JpdGljYWxpdHlUeXBlL05lZ2F0aXZlXCIpKSxcblx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uIGFzIEV4cHJlc3Npb248TnVtYmVyPiwgY29uc3RhbnQoMSkpLFxuXHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiMVwiKSlcblx0XHRcdFx0KSxcblx0XHRcdFx0Y29uc3RhbnQoXCJzYXAtaWNvbjovL21lc3NhZ2UtZXJyb3JcIiksXG5cdFx0XHRcdGlmRWxzZShcblx0XHRcdFx0XHRvcihcblx0XHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiVUkuQ3JpdGljYWxpdHlUeXBlL0NyaXRpY2FsXCIpKSxcblx0XHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24gYXMgRXhwcmVzc2lvbjxOdW1iZXI+LCBjb25zdGFudCgyKSksXG5cdFx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIjJcIikpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRjb25zdGFudChcInNhcC1pY29uOi8vbWVzc2FnZS13YXJuaW5nXCIpLFxuXHRcdFx0XHRcdGlmRWxzZShcblx0XHRcdFx0XHRcdG9yKFxuXHRcdFx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIlVJLkNyaXRpY2FsaXR5VHlwZS9Qb3NpdGl2ZVwiKSksXG5cdFx0XHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24gYXMgRXhwcmVzc2lvbjxOdW1iZXI+LCBjb25zdGFudCgzKSksXG5cdFx0XHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiM1wiKSlcblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRjb25zdGFudChcInNhcC1pY29uOi8vbWVzc2FnZS1zdWNjZXNzXCIpLFxuXHRcdFx0XHRcdFx0aWZFbHNlKFxuXHRcdFx0XHRcdFx0XHRvcihcblx0XHRcdFx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIlVJLkNyaXRpY2FsaXR5VHlwZS9JbmZvcm1hdGlvblwiKSksXG5cdFx0XHRcdFx0XHRcdFx0ZXF1YWwob0NyaXRpY2FsaXR5RXhwcmVzc2lvbiBhcyBFeHByZXNzaW9uPE51bWJlcj4sIGNvbnN0YW50KDUpKSxcblx0XHRcdFx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIjVcIikpXG5cdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdGNvbnN0YW50KFwic2FwLWljb246Ly9tZXNzYWdlLWluZm9ybWF0aW9uXCIpLFxuXHRcdFx0XHRcdFx0XHRjb25zdGFudChcIlwiKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0c0ljb25QYXRoID0gY29uc3RhbnQoXCJcIik7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHNJY29uUGF0aCA9IGNvbnN0YW50KFwiXCIpO1xuXHR9XG5cdHJldHVybiBjb21waWxlQmluZGluZyhzSWNvblBhdGgpO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGV4cHJlc3Npb24gdG8gc2V0IGJ1dHRvbiB0eXBlIGJhc2VkIG9uIENyaXRpY2FsaXR5XG4gKiBTdXBwb3J0ZWQgQ3JpdGljYWxpdHk6IFBvc2l0aXZlIGFuZCBOZWdhdGl2ZSBsZWFkaW5nIHRvIEFjY2VwdCBhbmQgUmVqZWN0IGJ1dHRvbiB0eXBlIHJlc3BlY3RpdmVseS5cbiAqXG4gKiBAZnVuY3Rpb25cbiAqIEBzdGF0aWNcbiAqIEBuYW1lIHNhcC5mZS5jb3JlLkNyaXRpY2FsaXR5Rm9ybWF0dGVycy5idWlsZEV4cHJlc3Npb25Gb3JDcml0aWNhbGl0eUJ1dHRvblR5cGVcbiAqIEBtZW1iZXJvZiBzYXAuZmUuY29yZS5Dcml0aWNhbGl0eUZvcm1hdHRlcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvVGFyZ2V0IEEgRGF0YUZpZWxkLCBEYXRhUG9pbnQsIERhdGFNb2RlbE9iamVjdFBhdGguXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBBbiBleHByZXNzaW9uIHRvIGRlZHVjZSBidXR0b24gdHlwZS5cbiAqIEBwcml2YXRlXG4gKiBAdWk1LXJlc3RyaWN0ZWRcbiAqKi9cbmV4cG9ydCBjb25zdCBidWlsZEV4cHJlc3Npb25Gb3JDcml0aWNhbGl0eUJ1dHRvblR5cGUgPSAob1RhcmdldDogYW55KTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcblx0Y29uc3Qgb0Fubm90YXRpb25UYXJnZXQgPSBvVGFyZ2V0Py50YXJnZXRPYmplY3QgPyBvVGFyZ2V0LnRhcmdldE9iamVjdCA6IG9UYXJnZXQ7XG5cdGNvbnN0IG9Dcml0aWNhbGl0eVByb3BlcnR5ID0gb0Fubm90YXRpb25UYXJnZXQ/LkNyaXRpY2FsaXR5O1xuXHRjb25zdCBvQ3JpdGljYWxpdHlFeHByZXNzaW9uOiBFeHByZXNzaW9uPHN0cmluZz4gPSBhbm5vdGF0aW9uRXhwcmVzc2lvbihvQ3JpdGljYWxpdHlQcm9wZXJ0eSk7XG5cdGxldCBzQnV0dG9uVHlwZUV4cHJlc3Npb247XG5cdGlmIChvQ3JpdGljYWxpdHlQcm9wZXJ0eSkge1xuXHRcdHNCdXR0b25UeXBlRXhwcmVzc2lvbiA9IGlmRWxzZShcblx0XHRcdG9yKFxuXHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIlVJLkNyaXRpY2FsaXR5VHlwZS9OZWdhdGl2ZVwiKSksXG5cdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24gYXMgRXhwcmVzc2lvbjxOdW1iZXI+LCBjb25zdGFudCgxKSksXG5cdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiMVwiKSlcblx0XHRcdCksXG5cdFx0XHRjb25zdGFudChcIlJlamVjdFwiKSxcblx0XHRcdGlmRWxzZShcblx0XHRcdFx0b3IoXG5cdFx0XHRcdFx0ZXF1YWwob0NyaXRpY2FsaXR5RXhwcmVzc2lvbiwgY29uc3RhbnQoXCJVSS5Dcml0aWNhbGl0eVR5cGUvUG9zaXRpdmVcIikpLFxuXHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24gYXMgRXhwcmVzc2lvbjxOdW1iZXI+LCBjb25zdGFudCgzKSksXG5cdFx0XHRcdFx0ZXF1YWwob0NyaXRpY2FsaXR5RXhwcmVzc2lvbiwgY29uc3RhbnQoXCIzXCIpKVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRjb25zdGFudChcIkFjY2VwdFwiKSxcblx0XHRcdFx0Y29uc3RhbnQoXCJEZWZhdWx0XCIpXG5cdFx0XHQpXG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHQvLyBBbnkgb3RoZXIgY2FzZXMgYXJlIG5vdCB2YWxpZCwgdGhlIGRlZmF1bHQgdmFsdWUgb2YgJ0RlZmF1bHQnIHdpbGwgYmUgcmV0dXJuZWRcblx0XHRzQnV0dG9uVHlwZUV4cHJlc3Npb24gPSBjb25zdGFudChcIkRlZmF1bHRcIik7XG5cdH1cblx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKHNCdXR0b25UeXBlRXhwcmVzc2lvbik7XG59O1xuXG4vKipcbiAqIFJldHVybnMgYW4gZXhwcmVzc2lvbiB0byBzZXQgY29sb3IgaW4gTWljcm9DaGFydHMgYmFzZWQgb24gQ3JpdGljYWxpdHlcbiAqIFN1cHBvcnRlZCBDcml0aWNhbGl0eTogUG9zaXRpdmUsIE5lZ2F0aXZlIGFuZCBDcml0aWNhbCBsZWFkaW5nIHRvIEdvb2QsIEVycm9yIGFuZCBDcml0aWNhbCBjb2xvciByZXNwZWN0aXZlbHkuXG4gKlxuICogQGZ1bmN0aW9uXG4gKiBAc3RhdGljXG4gKiBAbmFtZSBzYXAuZmUuY29yZS5Dcml0aWNhbGl0eUZvcm1hdHRlcnMuYnVpbGRFeHByZXNzaW9uRm9yQ3JpdGljYWxpdHlDb2xvck1pY3JvQ2hhcnRcbiAqIEBtZW1iZXJvZiBzYXAuZmUuY29yZS5Dcml0aWNhbGl0eUZvcm1hdHRlcnNcbiAqIEBwYXJhbSB7b2JqZWN0fSBvVGFyZ2V0IEEgRGF0YUZpZWxkLCBEYXRhUG9pbnQsIERhdGFNb2RlbE9iamVjdFBhdGhcbiAqIEByZXR1cm5zIHtzdHJpbmd9IEFuIGV4cHJlc3Npb24gdG8gZGVkdWNlIGNvbG9ycyBpbiBNaWNyb2NoYXJ0c1xuICogQHByaXZhdGVcbiAqIEB1aTUtcmVzdHJpY3RlZFxuICoqL1xuZXhwb3J0IGNvbnN0IGJ1aWxkRXhwcmVzc2lvbkZvckNyaXRpY2FsaXR5Q29sb3JNaWNyb0NoYXJ0ID0gKG9UYXJnZXQ6IGFueSk6IHN0cmluZyB8IHVuZGVmaW5lZCA9PiB7XG5cdGNvbnN0IG9Bbm5vdGF0aW9uVGFyZ2V0ID0gb1RhcmdldD8udGFyZ2V0T2JqZWN0ID8gb1RhcmdldC50YXJnZXRPYmplY3QgOiBvVGFyZ2V0O1xuXHRjb25zdCBvQ3JpdGljYWxpdHlQcm9wZXJ0eSA9IG9Bbm5vdGF0aW9uVGFyZ2V0Py5Dcml0aWNhbGl0eTtcblx0Y29uc3Qgb0NyaXRpY2FsaXR5RXhwcmVzc2lvbjogRXhwcmVzc2lvbjxzdHJpbmc+ID0gYW5ub3RhdGlvbkV4cHJlc3Npb24ob0NyaXRpY2FsaXR5UHJvcGVydHkpO1xuXHRsZXQgc0NvbG9yRXhwcmVzc2lvbjtcblx0aWYgKG9Dcml0aWNhbGl0eVByb3BlcnR5KSB7XG5cdFx0c0NvbG9yRXhwcmVzc2lvbiA9IGlmRWxzZShcblx0XHRcdG9yKFxuXHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIlVJLkNyaXRpY2FsaXR5VHlwZS9OZWdhdGl2ZVwiKSksXG5cdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24gYXMgRXhwcmVzc2lvbjxOdW1iZXI+LCBjb25zdGFudCgxKSksXG5cdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiMVwiKSlcblx0XHRcdCksXG5cdFx0XHRjb25zdGFudChcIkVycm9yXCIpLFxuXHRcdFx0aWZFbHNlKFxuXHRcdFx0XHRvcihcblx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIlVJLkNyaXRpY2FsaXR5VHlwZS9Dcml0aWNhbFwiKSksXG5cdFx0XHRcdFx0ZXF1YWwob0NyaXRpY2FsaXR5RXhwcmVzc2lvbiBhcyBFeHByZXNzaW9uPE51bWJlcj4sIGNvbnN0YW50KDIpKSxcblx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIjJcIikpXG5cdFx0XHRcdCksXG5cdFx0XHRcdGNvbnN0YW50KFwiQ3JpdGljYWxcIiksXG5cdFx0XHRcdGlmRWxzZShcblx0XHRcdFx0XHRvcihcblx0XHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24sIGNvbnN0YW50KFwiVUkuQ3JpdGljYWxpdHlUeXBlL1Bvc2l0aXZlXCIpKSxcblx0XHRcdFx0XHRcdGVxdWFsKG9Dcml0aWNhbGl0eUV4cHJlc3Npb24gYXMgRXhwcmVzc2lvbjxOdW1iZXI+LCBjb25zdGFudCgzKSksXG5cdFx0XHRcdFx0XHRlcXVhbChvQ3JpdGljYWxpdHlFeHByZXNzaW9uLCBjb25zdGFudChcIjNcIikpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRjb25zdGFudChcIkdvb2RcIiksXG5cdFx0XHRcdFx0Y29uc3RhbnQoXCJOZXV0cmFsXCIpXG5cdFx0XHRcdClcblx0XHRcdClcblx0XHQpO1xuXHR9IGVsc2Uge1xuXHRcdHNDb2xvckV4cHJlc3Npb24gPSBjb25zdGFudChcIk5ldXRyYWxcIik7XG5cdH1cblx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKHNDb2xvckV4cHJlc3Npb24pO1xufTtcbiJdfQ==