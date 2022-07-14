/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/templating/UIFormatters", "sap/fe/core/templating/DataModelPathHelper", "sap/fe/core/converters/helpers/BindingHelper", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/templating/PropertyHelper", "sap/fe/core/formatters/ValueFormatter", "sap/fe/core/templating/FieldControlHelper"], function (UIFormatters, DataModelPathHelper, BindingHelper, BindingExpression, PropertyHelper, valueFormatters, FieldControlHelper) {
  "use strict";

  var _exports = {};
  var isReadOnlyExpression = FieldControlHelper.isReadOnlyExpression;
  var getAssociatedTextPropertyPath = PropertyHelper.getAssociatedTextPropertyPath;
  var hasValueHelp = PropertyHelper.hasValueHelp;
  var getAssociatedCurrencyPropertyPath = PropertyHelper.getAssociatedCurrencyPropertyPath;
  var getAssociatedUnitPropertyPath = PropertyHelper.getAssociatedUnitPropertyPath;
  var isProperty = PropertyHelper.isProperty;
  var getAssociatedCurrencyProperty = PropertyHelper.getAssociatedCurrencyProperty;
  var getAssociatedUnitProperty = PropertyHelper.getAssociatedUnitProperty;
  var isPathExpression = PropertyHelper.isPathExpression;
  var not = BindingExpression.not;
  var equal = BindingExpression.equal;
  var ifElse = BindingExpression.ifElse;
  var or = BindingExpression.or;
  var and = BindingExpression.and;
  var bindingExpression = BindingExpression.bindingExpression;
  var constant = BindingExpression.constant;
  var compileBinding = BindingExpression.compileBinding;
  var transformRecursively = BindingExpression.transformRecursively;
  var formatResult = BindingExpression.formatResult;
  var annotationExpression = BindingExpression.annotationExpression;
  var UI = BindingHelper.UI;
  var getContextRelativeTargetObjectPath = DataModelPathHelper.getContextRelativeTargetObjectPath;
  var getPathRelativeLocation = DataModelPathHelper.getPathRelativeLocation;
  var enhanceDataModelPath = DataModelPathHelper.enhanceDataModelPath;
  var formatWithTypeInformation = UIFormatters.formatWithTypeInformation;
  var getBindingWithUnitOrCurrency = UIFormatters.getBindingWithUnitOrCurrency;
  var getDisplayMode = UIFormatters.getDisplayMode;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Recursively add the text arrangement to a binding expression.
   *
   * @param bindingExpression The binding expression to enhance
   * @param fullContextPath The current context path we're on (to properly resolve the text arrangement properties)
   * @returns An updated expression containing the text arrangement binding.
   */
  var addTextArrangementToBindingExpression = function (bindingExpression, fullContextPath) {
    return transformRecursively(bindingExpression, "Binding", function (expression) {
      var outExpression = expression;

      if (expression.modelName === undefined) {
        // In case of default model we then need to resolve the text arrangement property
        var oPropertyDataModelPath = enhanceDataModelPath(fullContextPath, expression.path);
        outExpression = getBindingWithTextArrangement(oPropertyDataModelPath, expression);
      }

      return outExpression;
    });
  };

  _exports.addTextArrangementToBindingExpression = addTextArrangementToBindingExpression;

  var getBindingWithTextArrangement = function (oPropertyDataModelPath, propertyBindingExpression, fieldFormatOptions) {
    var _oPropertyDefinition$, _oPropertyDefinition$2;

    var targetDisplayModeOverride = fieldFormatOptions === null || fieldFormatOptions === void 0 ? void 0 : fieldFormatOptions.displayMode;
    var outExpression = propertyBindingExpression;
    var oPropertyDefinition = oPropertyDataModelPath.targetObject.type === "PropertyPath" ? oPropertyDataModelPath.targetObject.$target : oPropertyDataModelPath.targetObject;
    var targetDisplayMode = targetDisplayModeOverride || getDisplayMode(oPropertyDefinition, oPropertyDataModelPath);
    var commonText = (_oPropertyDefinition$ = oPropertyDefinition.annotations) === null || _oPropertyDefinition$ === void 0 ? void 0 : (_oPropertyDefinition$2 = _oPropertyDefinition$.Common) === null || _oPropertyDefinition$2 === void 0 ? void 0 : _oPropertyDefinition$2.Text;
    var relativeLocation = getPathRelativeLocation(oPropertyDataModelPath.contextLocation, oPropertyDataModelPath.navigationProperties).map(function (np) {
      return np.name;
    });
    propertyBindingExpression = formatWithTypeInformation(oPropertyDefinition, propertyBindingExpression);

    if (targetDisplayMode !== "Value" && commonText) {
      switch (targetDisplayMode) {
        case "Description":
          outExpression = annotationExpression(commonText, relativeLocation);
          break;

        case "DescriptionValue":
          outExpression = formatResult([annotationExpression(commonText, relativeLocation), propertyBindingExpression], valueFormatters.formatWithBrackets);
          break;

        case "ValueDescription":
          outExpression = formatResult([propertyBindingExpression, annotationExpression(commonText, relativeLocation)], valueFormatters.formatWithBrackets);
          break;
      }
    }

    return outExpression;
  };

  _exports.getBindingWithTextArrangement = getBindingWithTextArrangement;

  var formatValueRecursively = function (bindingExpression, fullContextPath) {
    return transformRecursively(bindingExpression, "Binding", function (expression) {
      var outExpression = expression;

      if (expression.modelName === undefined) {
        // In case of default model we then need to resolve the text arrangement property
        var oPropertyDataModelPath = enhanceDataModelPath(fullContextPath, expression.path);
        outExpression = formatWithTypeInformation(oPropertyDataModelPath.targetObject, expression);
      }

      return outExpression;
    });
  };

  _exports.formatValueRecursively = formatValueRecursively;

  var getTextBinding = function (oPropertyDataModelObjectPath, fieldFormatOptions) {
    var _oPropertyDataModelOb, _oPropertyDataModelOb2, _oPropertyDataModelOb3, _oPropertyDataModelOb4, _oPropertyDataModelOb5, _oPropertyDataModelOb6, _oPropertyDataModelOb7, _oPropertyDataModelOb8, _oPropertyDataModelOb9, _oPropertyDataModelOb10;

    var asObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (((_oPropertyDataModelOb = oPropertyDataModelObjectPath.targetObject) === null || _oPropertyDataModelOb === void 0 ? void 0 : _oPropertyDataModelOb.$Type) === "com.sap.vocabularies.UI.v1.DataField" || ((_oPropertyDataModelOb2 = oPropertyDataModelObjectPath.targetObject) === null || _oPropertyDataModelOb2 === void 0 ? void 0 : _oPropertyDataModelOb2.$Type) === "com.sap.vocabularies.UI.v1.DataPointType" || ((_oPropertyDataModelOb3 = oPropertyDataModelObjectPath.targetObject) === null || _oPropertyDataModelOb3 === void 0 ? void 0 : _oPropertyDataModelOb3.$Type) === "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath" || ((_oPropertyDataModelOb4 = oPropertyDataModelObjectPath.targetObject) === null || _oPropertyDataModelOb4 === void 0 ? void 0 : _oPropertyDataModelOb4.$Type) === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") {
      // If there is no resolved property, the value is returned as a constant
      var fieldValue = oPropertyDataModelObjectPath.targetObject.Value || "";
      return compileBinding(constant(fieldValue));
    }

    if (isPathExpression(oPropertyDataModelObjectPath.targetObject) && oPropertyDataModelObjectPath.targetObject.$target) {
      var oNavPath = oPropertyDataModelObjectPath.targetEntityType.resolvePath(oPropertyDataModelObjectPath.targetObject.path, true);
      oPropertyDataModelObjectPath.targetObject = oNavPath.target;
      oNavPath.visitedObjects.forEach(function (oNavObj) {
        if (oNavObj && oNavObj._type === "NavigationProperty") {
          oPropertyDataModelObjectPath.navigationProperties.push(oNavObj);
        }
      });
    }

    var oBindingExpression = bindingExpression(getContextRelativeTargetObjectPath(oPropertyDataModelObjectPath));
    var oTargetBinding;

    if (((_oPropertyDataModelOb5 = oPropertyDataModelObjectPath.targetObject) === null || _oPropertyDataModelOb5 === void 0 ? void 0 : (_oPropertyDataModelOb6 = _oPropertyDataModelOb5.annotations) === null || _oPropertyDataModelOb6 === void 0 ? void 0 : (_oPropertyDataModelOb7 = _oPropertyDataModelOb6.Measures) === null || _oPropertyDataModelOb7 === void 0 ? void 0 : _oPropertyDataModelOb7.Unit) || ((_oPropertyDataModelOb8 = oPropertyDataModelObjectPath.targetObject) === null || _oPropertyDataModelOb8 === void 0 ? void 0 : (_oPropertyDataModelOb9 = _oPropertyDataModelOb8.annotations) === null || _oPropertyDataModelOb9 === void 0 ? void 0 : (_oPropertyDataModelOb10 = _oPropertyDataModelOb9.Measures) === null || _oPropertyDataModelOb10 === void 0 ? void 0 : _oPropertyDataModelOb10.ISOCurrency)) {
      oTargetBinding = getBindingWithUnitOrCurrency(oPropertyDataModelObjectPath, oBindingExpression);

      if ((fieldFormatOptions === null || fieldFormatOptions === void 0 ? void 0 : fieldFormatOptions.measureDisplayMode) === "Hidden") {
        // TODO: Refactor once types are less generic here
        oTargetBinding.formatOptions = _objectSpread({}, oTargetBinding.formatOptions, {
          showMeasure: false
        });
      }
    } else {
      oTargetBinding = getBindingWithTextArrangement(oPropertyDataModelObjectPath, oBindingExpression, fieldFormatOptions);
    }

    if (asObject) {
      return oTargetBinding;
    } // We don't include $$nopatch and parseKeepEmptyString as they make no sense in the text binding case


    return compileBinding(oTargetBinding);
  };

  _exports.getTextBinding = getTextBinding;

  var getValueBinding = function (oPropertyDataModelObjectPath, fieldFormatOptions) {
    var ignoreUnit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var ignoreFormatting = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var bindingParameters = arguments.length > 4 ? arguments[4] : undefined;
    var targetTypeAny = arguments.length > 5 ? arguments[5] : undefined;

    if (isPathExpression(oPropertyDataModelObjectPath.targetObject) && oPropertyDataModelObjectPath.targetObject.$target) {
      var oNavPath = oPropertyDataModelObjectPath.targetEntityType.resolvePath(oPropertyDataModelObjectPath.targetObject.path, true);
      oPropertyDataModelObjectPath.targetObject = oNavPath.target;
      oNavPath.visitedObjects.forEach(function (oNavObj) {
        if (oNavObj && oNavObj._type === "NavigationProperty") {
          oPropertyDataModelObjectPath.navigationProperties.push(oNavObj);
        }
      });
    }

    var targetObject = oPropertyDataModelObjectPath.targetObject;

    if (isProperty(targetObject)) {
      var _targetObject$annotat, _targetObject$annotat2;

      var oBindingExpression = bindingExpression(getContextRelativeTargetObjectPath(oPropertyDataModelObjectPath));

      if ((_targetObject$annotat = targetObject.annotations) === null || _targetObject$annotat === void 0 ? void 0 : (_targetObject$annotat2 = _targetObject$annotat.Communication) === null || _targetObject$annotat2 === void 0 ? void 0 : _targetObject$annotat2.IsEmailAddress) {
        oBindingExpression.type = "sap.fe.core.type.Email";
      } else {
        var oPropertyUnit = getAssociatedUnitProperty(oPropertyDataModelObjectPath.targetObject);
        var oPropertyCurrency = getAssociatedCurrencyProperty(oPropertyDataModelObjectPath.targetObject);

        if (!ignoreUnit && (oPropertyUnit || oPropertyCurrency)) {
          oBindingExpression = getBindingWithUnitOrCurrency(oPropertyDataModelObjectPath, oBindingExpression);

          if (oPropertyUnit && !hasValueHelp(oPropertyUnit) || oPropertyCurrency && !hasValueHelp(oPropertyCurrency) || (fieldFormatOptions === null || fieldFormatOptions === void 0 ? void 0 : fieldFormatOptions.measureDisplayMode) === "Hidden") {
            // If there is a unit or currency without a value help, or in case the currency should be explicitly hidden,
            // we need to configure the binding to not show the measure, otherwise it's needed for the mdc field
            if (!oBindingExpression.formatOptions) {
              oBindingExpression.formatOptions = {};
            }

            oBindingExpression.formatOptions.showMeasure = false;
          }
        } else {
          oBindingExpression = formatWithTypeInformation(targetObject, oBindingExpression);

          if (oBindingExpression.type === "sap.ui.model.odata.type.String") {
            oBindingExpression.formatOptions = {
              parseKeepsEmptyString: true
            };
          }
        }
      }

      if (ignoreFormatting) {
        delete oBindingExpression.formatOptions;
        delete oBindingExpression.constraints;
        delete oBindingExpression.type;
      }

      if (bindingParameters) {
        oBindingExpression.parameters = bindingParameters;
      }

      if (targetTypeAny) {
        oBindingExpression.targetType = "any";
      }

      return compileBinding(oBindingExpression);
    } else {
      if (targetObject && targetObject.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") {
        return compileBinding(annotationExpression(targetObject.Value));
      } else {
        return "";
      }
    }
  };

  _exports.getValueBinding = getValueBinding;

  var getUnitBinding = function (oPropertyDataModelObjectPath, fieldFormatOptions) {
    var sUnitPropertyPath = getAssociatedUnitPropertyPath(oPropertyDataModelObjectPath.targetObject);
    var sCurrencyPropertyPath = getAssociatedCurrencyPropertyPath(oPropertyDataModelObjectPath.targetObject);

    if (sUnitPropertyPath || sCurrencyPropertyPath) {
      var targetPropertyPath = sUnitPropertyPath || sCurrencyPropertyPath;
      var oUOMPropertyDataModelObjectPath = enhanceDataModelPath(oPropertyDataModelObjectPath, targetPropertyPath);
      return getValueBinding(oUOMPropertyDataModelObjectPath, fieldFormatOptions);
    }

    return undefined;
  };

  _exports.getUnitBinding = getUnitBinding;

  var getAssociatedTextBinding = function (oPropertyDataModelObjectPath, fieldFormatOptions) {
    var textPropertyPath = getAssociatedTextPropertyPath(oPropertyDataModelObjectPath.targetObject);

    if (textPropertyPath) {
      var oTextPropertyPath = enhanceDataModelPath(oPropertyDataModelObjectPath, textPropertyPath);
      var oValueBinding = getValueBinding(oTextPropertyPath, fieldFormatOptions, true, true, {
        $$noPatch: true
      });
      return oValueBinding;
    }

    return undefined;
  };

  _exports.getAssociatedTextBinding = getAssociatedTextBinding;

  var getDisplayStyle = function (oPropertyPath, oDataField, oDataModelPath, fieldFormatOptions, semanticObject) {
    var _oProperty$annotation, _oProperty$annotation2, _oProperty$annotation3, _oProperty$annotation4, _oProperty$annotation5, _oProperty$annotation6, _oProperty$annotation7, _oProperty$annotation8, _oDataField$Target, _oDataField$Target$$t, _oDataField$Target2, _oDataField$Target2$$, _oDataModelPath$targe, _oDataModelPath$targe2, _oDataModelPath$targe3, _oProperty$annotation9, _oProperty$annotation10, _oProperty$annotation11, _oProperty$annotation12, _oProperty$annotation13, _oProperty$annotation14, _oProperty$annotation15, _oProperty$annotation16, _oDataModelPath$targe7, _oProperty$annotation17, _oProperty$annotation18;

    // algorithm to determine the field fragment to use
    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath;

    if (semanticObject && !((_oProperty$annotation = oProperty.annotations) === null || _oProperty$annotation === void 0 ? void 0 : (_oProperty$annotation2 = _oProperty$annotation.UI) === null || _oProperty$annotation2 === void 0 ? void 0 : _oProperty$annotation2.IsImageURL) && !(oProperty.type === "Edm.Stream") && !(((_oProperty$annotation3 = oProperty.annotations) === null || _oProperty$annotation3 === void 0 ? void 0 : (_oProperty$annotation4 = _oProperty$annotation3.Communication) === null || _oProperty$annotation4 === void 0 ? void 0 : _oProperty$annotation4.IsEmailAddress) || ((_oProperty$annotation5 = oProperty.annotations) === null || _oProperty$annotation5 === void 0 ? void 0 : (_oProperty$annotation6 = _oProperty$annotation5.Communication) === null || _oProperty$annotation6 === void 0 ? void 0 : _oProperty$annotation6.IsPhoneNumber))) {
      return "LinkWithQuickViewForm";
    }

    if (!oPropertyPath || typeof oPropertyPath === "string") {
      return "Text";
    }

    if ((_oProperty$annotation7 = oProperty.annotations) === null || _oProperty$annotation7 === void 0 ? void 0 : (_oProperty$annotation8 = _oProperty$annotation7.UI) === null || _oProperty$annotation8 === void 0 ? void 0 : _oProperty$annotation8.IsImageURL) {
      return "Avatar";
    }

    if (oProperty.type === "Edm.Stream") {
      return "Avatar";
    }

    switch (oDataField.$Type) {
      case "com.sap.vocabularies.UI.v1.DataPointType":
        return "DataPoint";

      case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
        if (((_oDataField$Target = oDataField.Target) === null || _oDataField$Target === void 0 ? void 0 : (_oDataField$Target$$t = _oDataField$Target.$target) === null || _oDataField$Target$$t === void 0 ? void 0 : _oDataField$Target$$t.$Type) === "com.sap.vocabularies.UI.v1.DataPointType") {
          return "DataPoint";
        } else if (((_oDataField$Target2 = oDataField.Target) === null || _oDataField$Target2 === void 0 ? void 0 : (_oDataField$Target2$$ = _oDataField$Target2.$target) === null || _oDataField$Target2$$ === void 0 ? void 0 : _oDataField$Target2$$.$Type) === "com.sap.vocabularies.Communication.v1.ContactType") {
          return "Contact";
        }

        break;

      case "com.sap.vocabularies.UI.v1.DataFieldForAction":
      case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        return "Button";

      case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
        return "Link";
    }

    if (oDataModelPath === null || oDataModelPath === void 0 ? void 0 : (_oDataModelPath$targe = oDataModelPath.targetEntityType) === null || _oDataModelPath$targe === void 0 ? void 0 : (_oDataModelPath$targe2 = _oDataModelPath$targe.annotations) === null || _oDataModelPath$targe2 === void 0 ? void 0 : (_oDataModelPath$targe3 = _oDataModelPath$targe2.Common) === null || _oDataModelPath$targe3 === void 0 ? void 0 : _oDataModelPath$targe3.SemanticKey) {
      var aSemanticKeys = oDataModelPath.targetEntityType.annotations.Common.SemanticKey;
      var bIsSemanticKey = !aSemanticKeys.every(function (oKey) {
        var _oKey$$target;

        return (oKey === null || oKey === void 0 ? void 0 : (_oKey$$target = oKey.$target) === null || _oKey$$target === void 0 ? void 0 : _oKey$$target.name) !== oProperty.name; // need to check if it works also for direct properties
      });

      if (bIsSemanticKey && fieldFormatOptions.semanticKeyStyle) {
        var _oDataModelPath$targe4, _oDataModelPath$targe5, _oDataModelPath$targe6;

        if ((_oDataModelPath$targe4 = oDataModelPath.targetEntitySet) === null || _oDataModelPath$targe4 === void 0 ? void 0 : (_oDataModelPath$targe5 = _oDataModelPath$targe4.annotations) === null || _oDataModelPath$targe5 === void 0 ? void 0 : (_oDataModelPath$targe6 = _oDataModelPath$targe5.Common) === null || _oDataModelPath$targe6 === void 0 ? void 0 : _oDataModelPath$targe6.DraftRoot) {
          // we then still check whether this is available at designtime on the entityset
          return "SemanticKeyWithDraftIndicator";
        }

        return fieldFormatOptions.semanticKeyStyle === "ObjectIdentifier" ? "ObjectIdentifier" : "LabelSemanticKey";
      }
    }

    if (oDataField.Criticality) {
      return "ObjectStatus";
    }

    if ((_oProperty$annotation9 = oProperty.annotations) === null || _oProperty$annotation9 === void 0 ? void 0 : (_oProperty$annotation10 = _oProperty$annotation9.Measures) === null || _oProperty$annotation10 === void 0 ? void 0 : _oProperty$annotation10.ISOCurrency) {
      if (fieldFormatOptions.measureDisplayMode === "Hidden") {
        return "Text";
      }

      return "AmountWithCurrency";
    }

    if (((_oProperty$annotation11 = oProperty.annotations) === null || _oProperty$annotation11 === void 0 ? void 0 : (_oProperty$annotation12 = _oProperty$annotation11.Communication) === null || _oProperty$annotation12 === void 0 ? void 0 : _oProperty$annotation12.IsEmailAddress) || ((_oProperty$annotation13 = oProperty.annotations) === null || _oProperty$annotation13 === void 0 ? void 0 : (_oProperty$annotation14 = _oProperty$annotation13.Communication) === null || _oProperty$annotation14 === void 0 ? void 0 : _oProperty$annotation14.IsPhoneNumber)) {
      return "Link";
    }

    if ((_oProperty$annotation15 = oProperty.annotations) === null || _oProperty$annotation15 === void 0 ? void 0 : (_oProperty$annotation16 = _oProperty$annotation15.UI) === null || _oProperty$annotation16 === void 0 ? void 0 : _oProperty$annotation16.MultiLineText) {
      return "Text";
    }

    var aNavigationProperties = (oDataModelPath === null || oDataModelPath === void 0 ? void 0 : (_oDataModelPath$targe7 = oDataModelPath.targetEntityType) === null || _oDataModelPath$targe7 === void 0 ? void 0 : _oDataModelPath$targe7.navigationProperties) || [];
    var bIsUsedInNavigationWithQuickViewFacets = false;
    aNavigationProperties.forEach(function (oNavProp) {
      if (oNavProp.referentialConstraint && oNavProp.referentialConstraint.length) {
        oNavProp.referentialConstraint.forEach(function (oRefConstraint) {
          if ((oRefConstraint === null || oRefConstraint === void 0 ? void 0 : oRefConstraint.sourceProperty) === oProperty.name) {
            var _oNavProp$targetType, _oNavProp$targetType$, _oNavProp$targetType$2;

            if (oNavProp === null || oNavProp === void 0 ? void 0 : (_oNavProp$targetType = oNavProp.targetType) === null || _oNavProp$targetType === void 0 ? void 0 : (_oNavProp$targetType$ = _oNavProp$targetType.annotations) === null || _oNavProp$targetType$ === void 0 ? void 0 : (_oNavProp$targetType$2 = _oNavProp$targetType$.UI) === null || _oNavProp$targetType$2 === void 0 ? void 0 : _oNavProp$targetType$2.QuickViewFacets) {
              bIsUsedInNavigationWithQuickViewFacets = true;
            }
          }
        });
      }
    });

    if (bIsUsedInNavigationWithQuickViewFacets) {
      return "LinkWithQuickViewForm";
    }

    if ((_oProperty$annotation17 = oProperty.annotations) === null || _oProperty$annotation17 === void 0 ? void 0 : (_oProperty$annotation18 = _oProperty$annotation17.Common) === null || _oProperty$annotation18 === void 0 ? void 0 : _oProperty$annotation18.SemanticObject) {
      return "LinkWrapper";
    }

    if (oDataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithUrl") {
      return "Link";
    }

    return "Text";
  };

  _exports.getDisplayStyle = getDisplayStyle;

  var getEditStyle = function (oPropertyPath, oDataField, oFieldFormatOptions) {
    var _oDataField$Target3, _oDataField$Target3$$, _oDataField$Target4, _oDataField$Target4$$, _oProperty$annotation19, _oProperty$annotation20, _oProperty$annotation21, _oProperty$annotation22, _oProperty$annotation23, _oProperty$annotation24, _oProperty$annotation25;

    // algorithm to determine the field fragment to use
    if (!oPropertyPath || typeof oPropertyPath === "string") {
      return null;
    }

    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath;

    switch (oDataField.$Type) {
      case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
        if (((_oDataField$Target3 = oDataField.Target) === null || _oDataField$Target3 === void 0 ? void 0 : (_oDataField$Target3$$ = _oDataField$Target3.$target) === null || _oDataField$Target3$$ === void 0 ? void 0 : _oDataField$Target3$$.$Type) === "com.sap.vocabularies.Communication.v1.ContactType") {
          return null;
        } else if (((_oDataField$Target4 = oDataField.Target) === null || _oDataField$Target4 === void 0 ? void 0 : (_oDataField$Target4$$ = _oDataField$Target4.$target) === null || _oDataField$Target4$$ === void 0 ? void 0 : _oDataField$Target4$$.Visualization) === "UI.VisualizationType/Rating") {
          return "RatingIndicator";
        }

        break;

      case "com.sap.vocabularies.UI.v1.DataPointType":
        if ((oDataField === null || oDataField === void 0 ? void 0 : oDataField.Visualization) === "UI.VisualizationType/Rating") {
          return "RatingIndicator";
        }

        break;

      case "com.sap.vocabularies.UI.v1.DataFieldForAction":
      case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
      case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        return null;
    }

    var oPropertyUnit = getAssociatedUnitProperty(oProperty);
    var oPropertyCurrency = getAssociatedCurrencyProperty(oProperty);

    if (PropertyHelper.hasValueHelp(oProperty) || oPropertyUnit && PropertyHelper.hasValueHelp(oPropertyUnit) || oPropertyCurrency && PropertyHelper.hasValueHelp(oPropertyCurrency)) {
      if ((oFieldFormatOptions === null || oFieldFormatOptions === void 0 ? void 0 : oFieldFormatOptions.measureDisplayMode) === "Hidden") {
        return "Input";
      }

      return "InputWithValueHelp";
    }

    if (((_oProperty$annotation19 = oProperty.annotations) === null || _oProperty$annotation19 === void 0 ? void 0 : (_oProperty$annotation20 = _oProperty$annotation19.UI) === null || _oProperty$annotation20 === void 0 ? void 0 : (_oProperty$annotation21 = _oProperty$annotation20.MultiLineText) === null || _oProperty$annotation21 === void 0 ? void 0 : _oProperty$annotation21.valueOf()) && oProperty.type === "Edm.String") {
      return "TextArea";
    }

    switch (oProperty.type) {
      case "Edm.Date":
        return "DatePicker";

      case "Edm.Time":
      case "Edm.TimeOfDay":
        return "TimePicker";

      case "Edm.DateTime":
      case "Edm.DateTimeOffset":
        return "DateTimePicker";

      case "Edm.Boolean":
        return "CheckBox";
    }

    if (((_oProperty$annotation22 = oProperty.annotations) === null || _oProperty$annotation22 === void 0 ? void 0 : (_oProperty$annotation23 = _oProperty$annotation22.Measures) === null || _oProperty$annotation23 === void 0 ? void 0 : _oProperty$annotation23.ISOCurrency) || ((_oProperty$annotation24 = oProperty.annotations) === null || _oProperty$annotation24 === void 0 ? void 0 : (_oProperty$annotation25 = _oProperty$annotation24.Measures) === null || _oProperty$annotation25 === void 0 ? void 0 : _oProperty$annotation25.Unit)) {
      return "InputWithUnit";
    }

    return "Input";
  };
  /**
   * Returns the binding expression to evaluate the visibility of a DataField or DataPoint annotation.
   *
   * SAP Fiori elements will evaluate either the UI.Hidden annotation defined on the annotation itself or on the target property.
   *
   * @param {DataModelObjectPath} dataFieldModelPath The metapath referring to the annotation we are evaluating.
   * @param {FieldFormatOptions} [formatOptions] FormatOptions optional.
   * @returns {BindingExpression<string>} An expression that you can bind to the UI.
   */


  _exports.getEditStyle = getEditStyle;

  var getVisibleExpression = function (dataFieldModelPath, formatOptions) {
    var _targetObject$Target, _targetObject$Target$, _targetObject$annotat3, _targetObject$annotat4, _propertyValue$annota, _propertyValue$annota2;

    var targetObject = dataFieldModelPath.targetObject;
    var propertyValue;

    if (targetObject) {
      switch (targetObject.$Type) {
        case "com.sap.vocabularies.UI.v1.DataField":
        case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
        case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
        case "com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation":
        case "com.sap.vocabularies.UI.v1.DataFieldWithAction":
        case "com.sap.vocabularies.UI.v1.DataPointType":
          propertyValue = targetObject.Value.$target;
          break;

        case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
          // if it is a DataFieldForAnnotation pointing to a DataPoint we look at the dataPoint's value
          if ((targetObject === null || targetObject === void 0 ? void 0 : (_targetObject$Target = targetObject.Target) === null || _targetObject$Target === void 0 ? void 0 : (_targetObject$Target$ = _targetObject$Target.$target) === null || _targetObject$Target$ === void 0 ? void 0 : _targetObject$Target$.$Type) === "com.sap.vocabularies.UI.v1.DataPointType") {
            var _targetObject$Target$2;

            propertyValue = (_targetObject$Target$2 = targetObject.Target.$target) === null || _targetObject$Target$2 === void 0 ? void 0 : _targetObject$Target$2.Value.$target;
            break;
          }

        // eslint-disable-next-line no-fallthrough

        case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        case "com.sap.vocabularies.UI.v1.DataFieldForAction":
        default:
          propertyValue = undefined;
      }
    }

    var isAnalyticalGroupHeaderExpanded = (formatOptions === null || formatOptions === void 0 ? void 0 : formatOptions.isAnalytics) ? UI.IsExpanded : constant(false);
    var isAnalyticalLeaf = (formatOptions === null || formatOptions === void 0 ? void 0 : formatOptions.isAnalytics) ? equal(UI.NodeLevel, 0) : constant(false); // A data field is visible if:
    // - the UI.Hidden expression in the original annotation does not evaluate to 'true'
    // - the UI.Hidden expression in the target property does not evaluate to 'true'
    // - in case of Analytics it's not visible for an expanded GroupHeader

    return compileBinding(and.apply(void 0, [not(equal(annotationExpression(targetObject === null || targetObject === void 0 ? void 0 : (_targetObject$annotat3 = targetObject.annotations) === null || _targetObject$annotat3 === void 0 ? void 0 : (_targetObject$annotat4 = _targetObject$annotat3.UI) === null || _targetObject$annotat4 === void 0 ? void 0 : _targetObject$annotat4.Hidden), true)), ifElse(!!propertyValue, propertyValue && not(equal(annotationExpression((_propertyValue$annota = propertyValue.annotations) === null || _propertyValue$annota === void 0 ? void 0 : (_propertyValue$annota2 = _propertyValue$annota.UI) === null || _propertyValue$annota2 === void 0 ? void 0 : _propertyValue$annota2.Hidden), true)), true), or(not(isAnalyticalGroupHeaderExpanded), isAnalyticalLeaf)]));
  };

  _exports.getVisibleExpression = getVisibleExpression;

  var getInputDescription = function (oPropertyPath, oDataModelObjectPath, fieldFormatOptions) {
    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath;
    var unitProperty = getAssociatedCurrencyProperty(oProperty) || getAssociatedUnitProperty(oProperty);

    if (!unitProperty) {
      return compileBinding("");
    }

    var oPropertyDataModelObjectPath = enhanceDataModelPath(oDataModelObjectPath, oPropertyPath);
    var oNonEditableValue = getUnitBinding(oPropertyDataModelObjectPath, fieldFormatOptions);
    var editableExpression = and(not(isReadOnlyExpression(unitProperty)), not(PropertyHelper.isComputed(unitProperty)));
    return compileBinding(ifElse(editableExpression, "", oNonEditableValue));
  };

  _exports.getInputDescription = getInputDescription;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpZWxkVGVtcGxhdGluZy50cyJdLCJuYW1lcyI6WyJhZGRUZXh0QXJyYW5nZW1lbnRUb0JpbmRpbmdFeHByZXNzaW9uIiwiYmluZGluZ0V4cHJlc3Npb24iLCJmdWxsQ29udGV4dFBhdGgiLCJ0cmFuc2Zvcm1SZWN1cnNpdmVseSIsImV4cHJlc3Npb24iLCJvdXRFeHByZXNzaW9uIiwibW9kZWxOYW1lIiwidW5kZWZpbmVkIiwib1Byb3BlcnR5RGF0YU1vZGVsUGF0aCIsImVuaGFuY2VEYXRhTW9kZWxQYXRoIiwicGF0aCIsImdldEJpbmRpbmdXaXRoVGV4dEFycmFuZ2VtZW50IiwicHJvcGVydHlCaW5kaW5nRXhwcmVzc2lvbiIsImZpZWxkRm9ybWF0T3B0aW9ucyIsInRhcmdldERpc3BsYXlNb2RlT3ZlcnJpZGUiLCJkaXNwbGF5TW9kZSIsIm9Qcm9wZXJ0eURlZmluaXRpb24iLCJ0YXJnZXRPYmplY3QiLCJ0eXBlIiwiJHRhcmdldCIsInRhcmdldERpc3BsYXlNb2RlIiwiZ2V0RGlzcGxheU1vZGUiLCJjb21tb25UZXh0IiwiYW5ub3RhdGlvbnMiLCJDb21tb24iLCJUZXh0IiwicmVsYXRpdmVMb2NhdGlvbiIsImdldFBhdGhSZWxhdGl2ZUxvY2F0aW9uIiwiY29udGV4dExvY2F0aW9uIiwibmF2aWdhdGlvblByb3BlcnRpZXMiLCJtYXAiLCJucCIsIm5hbWUiLCJmb3JtYXRXaXRoVHlwZUluZm9ybWF0aW9uIiwiYW5ub3RhdGlvbkV4cHJlc3Npb24iLCJmb3JtYXRSZXN1bHQiLCJ2YWx1ZUZvcm1hdHRlcnMiLCJmb3JtYXRXaXRoQnJhY2tldHMiLCJmb3JtYXRWYWx1ZVJlY3Vyc2l2ZWx5IiwiZ2V0VGV4dEJpbmRpbmciLCJvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoIiwiYXNPYmplY3QiLCIkVHlwZSIsImZpZWxkVmFsdWUiLCJWYWx1ZSIsImNvbXBpbGVCaW5kaW5nIiwiY29uc3RhbnQiLCJpc1BhdGhFeHByZXNzaW9uIiwib05hdlBhdGgiLCJ0YXJnZXRFbnRpdHlUeXBlIiwicmVzb2x2ZVBhdGgiLCJ0YXJnZXQiLCJ2aXNpdGVkT2JqZWN0cyIsImZvckVhY2giLCJvTmF2T2JqIiwiX3R5cGUiLCJwdXNoIiwib0JpbmRpbmdFeHByZXNzaW9uIiwiZ2V0Q29udGV4dFJlbGF0aXZlVGFyZ2V0T2JqZWN0UGF0aCIsIm9UYXJnZXRCaW5kaW5nIiwiTWVhc3VyZXMiLCJVbml0IiwiSVNPQ3VycmVuY3kiLCJnZXRCaW5kaW5nV2l0aFVuaXRPckN1cnJlbmN5IiwibWVhc3VyZURpc3BsYXlNb2RlIiwiZm9ybWF0T3B0aW9ucyIsInNob3dNZWFzdXJlIiwiZ2V0VmFsdWVCaW5kaW5nIiwiaWdub3JlVW5pdCIsImlnbm9yZUZvcm1hdHRpbmciLCJiaW5kaW5nUGFyYW1ldGVycyIsInRhcmdldFR5cGVBbnkiLCJpc1Byb3BlcnR5IiwiQ29tbXVuaWNhdGlvbiIsIklzRW1haWxBZGRyZXNzIiwib1Byb3BlcnR5VW5pdCIsImdldEFzc29jaWF0ZWRVbml0UHJvcGVydHkiLCJvUHJvcGVydHlDdXJyZW5jeSIsImdldEFzc29jaWF0ZWRDdXJyZW5jeVByb3BlcnR5IiwiaGFzVmFsdWVIZWxwIiwicGFyc2VLZWVwc0VtcHR5U3RyaW5nIiwiY29uc3RyYWludHMiLCJwYXJhbWV0ZXJzIiwidGFyZ2V0VHlwZSIsImdldFVuaXRCaW5kaW5nIiwic1VuaXRQcm9wZXJ0eVBhdGgiLCJnZXRBc3NvY2lhdGVkVW5pdFByb3BlcnR5UGF0aCIsInNDdXJyZW5jeVByb3BlcnR5UGF0aCIsImdldEFzc29jaWF0ZWRDdXJyZW5jeVByb3BlcnR5UGF0aCIsInRhcmdldFByb3BlcnR5UGF0aCIsIm9VT01Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgiLCJnZXRBc3NvY2lhdGVkVGV4dEJpbmRpbmciLCJ0ZXh0UHJvcGVydHlQYXRoIiwiZ2V0QXNzb2NpYXRlZFRleHRQcm9wZXJ0eVBhdGgiLCJvVGV4dFByb3BlcnR5UGF0aCIsIm9WYWx1ZUJpbmRpbmciLCIkJG5vUGF0Y2giLCJnZXREaXNwbGF5U3R5bGUiLCJvUHJvcGVydHlQYXRoIiwib0RhdGFGaWVsZCIsIm9EYXRhTW9kZWxQYXRoIiwic2VtYW50aWNPYmplY3QiLCJvUHJvcGVydHkiLCJVSSIsIklzSW1hZ2VVUkwiLCJJc1Bob25lTnVtYmVyIiwiVGFyZ2V0IiwiU2VtYW50aWNLZXkiLCJhU2VtYW50aWNLZXlzIiwiYklzU2VtYW50aWNLZXkiLCJldmVyeSIsIm9LZXkiLCJzZW1hbnRpY0tleVN0eWxlIiwidGFyZ2V0RW50aXR5U2V0IiwiRHJhZnRSb290IiwiQ3JpdGljYWxpdHkiLCJNdWx0aUxpbmVUZXh0IiwiYU5hdmlnYXRpb25Qcm9wZXJ0aWVzIiwiYklzVXNlZEluTmF2aWdhdGlvbldpdGhRdWlja1ZpZXdGYWNldHMiLCJvTmF2UHJvcCIsInJlZmVyZW50aWFsQ29uc3RyYWludCIsImxlbmd0aCIsIm9SZWZDb25zdHJhaW50Iiwic291cmNlUHJvcGVydHkiLCJRdWlja1ZpZXdGYWNldHMiLCJTZW1hbnRpY09iamVjdCIsImdldEVkaXRTdHlsZSIsIm9GaWVsZEZvcm1hdE9wdGlvbnMiLCJWaXN1YWxpemF0aW9uIiwiUHJvcGVydHlIZWxwZXIiLCJ2YWx1ZU9mIiwiZ2V0VmlzaWJsZUV4cHJlc3Npb24iLCJkYXRhRmllbGRNb2RlbFBhdGgiLCJwcm9wZXJ0eVZhbHVlIiwiaXNBbmFseXRpY2FsR3JvdXBIZWFkZXJFeHBhbmRlZCIsImlzQW5hbHl0aWNzIiwiSXNFeHBhbmRlZCIsImlzQW5hbHl0aWNhbExlYWYiLCJlcXVhbCIsIk5vZGVMZXZlbCIsImFuZCIsIm5vdCIsIkhpZGRlbiIsImlmRWxzZSIsIm9yIiwiZ2V0SW5wdXREZXNjcmlwdGlvbiIsIm9EYXRhTW9kZWxPYmplY3RQYXRoIiwidW5pdFByb3BlcnR5Iiwib05vbkVkaXRhYmxlVmFsdWUiLCJlZGl0YWJsZUV4cHJlc3Npb24iLCJpc1JlYWRPbmx5RXhwcmVzc2lvbiIsImlzQ29tcHV0ZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtGQTs7Ozs7OztBQU9PLE1BQU1BLHFDQUFxQyxHQUFHLFVBQ3BEQyxpQkFEb0QsRUFFcERDLGVBRm9ELEVBR2xDO0FBQ2xCLFdBQU9DLG9CQUFvQixDQUFDRixpQkFBRCxFQUFvQixTQUFwQixFQUErQixVQUFDRyxVQUFELEVBQWtEO0FBQzNHLFVBQUlDLGFBQThCLEdBQUdELFVBQXJDOztBQUNBLFVBQUlBLFVBQVUsQ0FBQ0UsU0FBWCxLQUF5QkMsU0FBN0IsRUFBd0M7QUFDdkM7QUFDQSxZQUFNQyxzQkFBc0IsR0FBR0Msb0JBQW9CLENBQUNQLGVBQUQsRUFBa0JFLFVBQVUsQ0FBQ00sSUFBN0IsQ0FBbkQ7QUFDQUwsUUFBQUEsYUFBYSxHQUFHTSw2QkFBNkIsQ0FBQ0gsc0JBQUQsRUFBeUJKLFVBQXpCLENBQTdDO0FBQ0E7O0FBQ0QsYUFBT0MsYUFBUDtBQUNBLEtBUjBCLENBQTNCO0FBU0EsR0FiTTs7OztBQWVBLE1BQU1NLDZCQUE2QixHQUFHLFVBQzVDSCxzQkFENEMsRUFFNUNJLHlCQUY0QyxFQUc1Q0Msa0JBSDRDLEVBSXZCO0FBQUE7O0FBQ3JCLFFBQU1DLHlCQUF5QixHQUFHRCxrQkFBSCxhQUFHQSxrQkFBSCx1QkFBR0Esa0JBQWtCLENBQUVFLFdBQXREO0FBQ0EsUUFBSVYsYUFBYSxHQUFHTyx5QkFBcEI7QUFDQSxRQUFNSSxtQkFBbUIsR0FDeEJSLHNCQUFzQixDQUFDUyxZQUF2QixDQUFvQ0MsSUFBcEMsS0FBNkMsY0FBN0MsR0FDSVYsc0JBQXNCLENBQUNTLFlBQXZCLENBQW9DRSxPQUR4QyxHQUVJWCxzQkFBc0IsQ0FBQ1MsWUFINUI7QUFJQSxRQUFNRyxpQkFBaUIsR0FBR04seUJBQXlCLElBQUlPLGNBQWMsQ0FBQ0wsbUJBQUQsRUFBc0JSLHNCQUF0QixDQUFyRTtBQUNBLFFBQU1jLFVBQVUsNEJBQUdOLG1CQUFtQixDQUFDTyxXQUF2QixvRkFBRyxzQkFBaUNDLE1BQXBDLDJEQUFHLHVCQUF5Q0MsSUFBNUQ7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBR0MsdUJBQXVCLENBQy9DbkIsc0JBQXNCLENBQUNvQixlQUR3QixFQUUvQ3BCLHNCQUFzQixDQUFDcUIsb0JBRndCLENBQXZCLENBR3ZCQyxHQUh1QixDQUduQixVQUFBQyxFQUFFO0FBQUEsYUFBSUEsRUFBRSxDQUFDQyxJQUFQO0FBQUEsS0FIaUIsQ0FBekI7QUFJQXBCLElBQUFBLHlCQUF5QixHQUFHcUIseUJBQXlCLENBQUNqQixtQkFBRCxFQUFzQkoseUJBQXRCLENBQXJEOztBQUNBLFFBQUlRLGlCQUFpQixLQUFLLE9BQXRCLElBQWlDRSxVQUFyQyxFQUFpRDtBQUNoRCxjQUFRRixpQkFBUjtBQUNDLGFBQUssYUFBTDtBQUNDZixVQUFBQSxhQUFhLEdBQUc2QixvQkFBb0IsQ0FBQ1osVUFBRCxFQUFhSSxnQkFBYixDQUFwQztBQUNBOztBQUNELGFBQUssa0JBQUw7QUFDQ3JCLFVBQUFBLGFBQWEsR0FBRzhCLFlBQVksQ0FDM0IsQ0FBQ0Qsb0JBQW9CLENBQUNaLFVBQUQsRUFBYUksZ0JBQWIsQ0FBckIsRUFBMkVkLHlCQUEzRSxDQUQyQixFQUUzQndCLGVBQWUsQ0FBQ0Msa0JBRlcsQ0FBNUI7QUFJQTs7QUFDRCxhQUFLLGtCQUFMO0FBQ0NoQyxVQUFBQSxhQUFhLEdBQUc4QixZQUFZLENBQzNCLENBQUN2Qix5QkFBRCxFQUE0QnNCLG9CQUFvQixDQUFDWixVQUFELEVBQWFJLGdCQUFiLENBQWhELENBRDJCLEVBRTNCVSxlQUFlLENBQUNDLGtCQUZXLENBQTVCO0FBSUE7QUFmRjtBQWlCQTs7QUFDRCxXQUFPaEMsYUFBUDtBQUNBLEdBdENNOzs7O0FBd0NBLE1BQU1pQyxzQkFBc0IsR0FBRyxVQUFTckMsaUJBQVQsRUFBNkNDLGVBQTdDLEVBQW9HO0FBQ3pJLFdBQU9DLG9CQUFvQixDQUFDRixpQkFBRCxFQUFvQixTQUFwQixFQUErQixVQUFDRyxVQUFELEVBQWtEO0FBQzNHLFVBQUlDLGFBQThCLEdBQUdELFVBQXJDOztBQUNBLFVBQUlBLFVBQVUsQ0FBQ0UsU0FBWCxLQUF5QkMsU0FBN0IsRUFBd0M7QUFDdkM7QUFDQSxZQUFNQyxzQkFBc0IsR0FBR0Msb0JBQW9CLENBQUNQLGVBQUQsRUFBa0JFLFVBQVUsQ0FBQ00sSUFBN0IsQ0FBbkQ7QUFDQUwsUUFBQUEsYUFBYSxHQUFHNEIseUJBQXlCLENBQUN6QixzQkFBc0IsQ0FBQ1MsWUFBeEIsRUFBc0NiLFVBQXRDLENBQXpDO0FBQ0E7O0FBQ0QsYUFBT0MsYUFBUDtBQUNBLEtBUjBCLENBQTNCO0FBU0EsR0FWTTs7OztBQVlBLE1BQU1rQyxjQUFjLEdBQUcsVUFDN0JDLDRCQUQ2QixFQUU3QjNCLGtCQUY2QixFQUlvQjtBQUFBOztBQUFBLFFBRGpENEIsUUFDaUQsdUVBRDdCLEtBQzZCOztBQUNqRCxRQUNDLDBCQUFBRCw0QkFBNEIsQ0FBQ3ZCLFlBQTdCLGdGQUEyQ3lCLEtBQTNDLE1BQXFELHNDQUFyRCxJQUNBLDJCQUFBRiw0QkFBNEIsQ0FBQ3ZCLFlBQTdCLGtGQUEyQ3lCLEtBQTNDLE1BQXFELDBDQURyRCxJQUVBLDJCQUFBRiw0QkFBNEIsQ0FBQ3ZCLFlBQTdCLGtGQUEyQ3lCLEtBQTNDLE1BQXFELHdEQUZyRCxJQUdBLDJCQUFBRiw0QkFBNEIsQ0FBQ3ZCLFlBQTdCLGtGQUEyQ3lCLEtBQTNDLE1BQXFELDZDQUp0RCxFQUtFO0FBQ0Q7QUFDQSxVQUFNQyxVQUFVLEdBQUdILDRCQUE0QixDQUFDdkIsWUFBN0IsQ0FBMEMyQixLQUExQyxJQUFtRCxFQUF0RTtBQUNBLGFBQU9DLGNBQWMsQ0FBQ0MsUUFBUSxDQUFDSCxVQUFELENBQVQsQ0FBckI7QUFDQTs7QUFDRCxRQUFJSSxnQkFBZ0IsQ0FBQ1AsNEJBQTRCLENBQUN2QixZQUE5QixDQUFoQixJQUErRHVCLDRCQUE0QixDQUFDdkIsWUFBN0IsQ0FBMENFLE9BQTdHLEVBQXNIO0FBQ3JILFVBQU02QixRQUFRLEdBQUdSLDRCQUE0QixDQUFDUyxnQkFBN0IsQ0FBOENDLFdBQTlDLENBQTBEViw0QkFBNEIsQ0FBQ3ZCLFlBQTdCLENBQTBDUCxJQUFwRyxFQUEwRyxJQUExRyxDQUFqQjtBQUNBOEIsTUFBQUEsNEJBQTRCLENBQUN2QixZQUE3QixHQUE0QytCLFFBQVEsQ0FBQ0csTUFBckQ7QUFDQUgsTUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCQyxPQUF4QixDQUFnQyxVQUFDQyxPQUFELEVBQWtCO0FBQ2pELFlBQUlBLE9BQU8sSUFBSUEsT0FBTyxDQUFDQyxLQUFSLEtBQWtCLG9CQUFqQyxFQUF1RDtBQUN0RGYsVUFBQUEsNEJBQTRCLENBQUNYLG9CQUE3QixDQUFrRDJCLElBQWxELENBQXVERixPQUF2RDtBQUNBO0FBQ0QsT0FKRDtBQUtBOztBQUNELFFBQU1HLGtCQUFrQixHQUFHeEQsaUJBQWlCLENBQUN5RCxrQ0FBa0MsQ0FBQ2xCLDRCQUFELENBQW5DLENBQTVDO0FBQ0EsUUFBSW1CLGNBQUo7O0FBQ0EsUUFDQywyQkFBQW5CLDRCQUE0QixDQUFDdkIsWUFBN0IsNEdBQTJDTSxXQUEzQyw0R0FBd0RxQyxRQUF4RCxrRkFBa0VDLElBQWxFLGdDQUNBckIsNEJBQTRCLENBQUN2QixZQUQ3QixxRkFDQSx1QkFBMkNNLFdBRDNDLHNGQUNBLHVCQUF3RHFDLFFBRHhELDREQUNBLHdCQUFrRUUsV0FEbEUsQ0FERCxFQUdFO0FBQ0RILE1BQUFBLGNBQWMsR0FBR0ksNEJBQTRCLENBQUN2Qiw0QkFBRCxFQUErQmlCLGtCQUEvQixDQUE3Qzs7QUFDQSxVQUFJLENBQUE1QyxrQkFBa0IsU0FBbEIsSUFBQUEsa0JBQWtCLFdBQWxCLFlBQUFBLGtCQUFrQixDQUFFbUQsa0JBQXBCLE1BQTJDLFFBQS9DLEVBQXlEO0FBQ3hEO0FBQ0NMLFFBQUFBLGNBQUQsQ0FBa0RNLGFBQWxELHFCQUNLTixjQUFELENBQWtETSxhQUR0RDtBQUVDQyxVQUFBQSxXQUFXLEVBQUU7QUFGZDtBQUlBO0FBQ0QsS0FaRCxNQVlPO0FBQ05QLE1BQUFBLGNBQWMsR0FBR2hELDZCQUE2QixDQUFDNkIsNEJBQUQsRUFBK0JpQixrQkFBL0IsRUFBbUQ1QyxrQkFBbkQsQ0FBOUM7QUFDQTs7QUFDRCxRQUFJNEIsUUFBSixFQUFjO0FBQ2IsYUFBT2tCLGNBQVA7QUFDQSxLQXZDZ0QsQ0F3Q2pEOzs7QUFDQSxXQUFPZCxjQUFjLENBQUNjLGNBQUQsQ0FBckI7QUFDQSxHQTlDTTs7OztBQWdEQSxNQUFNUSxlQUFlLEdBQUcsVUFDOUIzQiw0QkFEOEIsRUFFOUIzQixrQkFGOEIsRUFPRjtBQUFBLFFBSjVCdUQsVUFJNEIsdUVBSk4sS0FJTTtBQUFBLFFBSDVCQyxnQkFHNEIsdUVBSEEsS0FHQTtBQUFBLFFBRjVCQyxpQkFFNEI7QUFBQSxRQUQ1QkMsYUFDNEI7O0FBQzVCLFFBQUl4QixnQkFBZ0IsQ0FBQ1AsNEJBQTRCLENBQUN2QixZQUE5QixDQUFoQixJQUErRHVCLDRCQUE0QixDQUFDdkIsWUFBN0IsQ0FBMENFLE9BQTdHLEVBQXNIO0FBQ3JILFVBQU02QixRQUFRLEdBQUdSLDRCQUE0QixDQUFDUyxnQkFBN0IsQ0FBOENDLFdBQTlDLENBQTBEViw0QkFBNEIsQ0FBQ3ZCLFlBQTdCLENBQTBDUCxJQUFwRyxFQUEwRyxJQUExRyxDQUFqQjtBQUNBOEIsTUFBQUEsNEJBQTRCLENBQUN2QixZQUE3QixHQUE0QytCLFFBQVEsQ0FBQ0csTUFBckQ7QUFDQUgsTUFBQUEsUUFBUSxDQUFDSSxjQUFULENBQXdCQyxPQUF4QixDQUFnQyxVQUFDQyxPQUFELEVBQWtCO0FBQ2pELFlBQUlBLE9BQU8sSUFBSUEsT0FBTyxDQUFDQyxLQUFSLEtBQWtCLG9CQUFqQyxFQUF1RDtBQUN0RGYsVUFBQUEsNEJBQTRCLENBQUNYLG9CQUE3QixDQUFrRDJCLElBQWxELENBQXVERixPQUF2RDtBQUNBO0FBQ0QsT0FKRDtBQUtBOztBQUVELFFBQU1yQyxZQUFZLEdBQUd1Qiw0QkFBNEIsQ0FBQ3ZCLFlBQWxEOztBQUNBLFFBQUl1RCxVQUFVLENBQUN2RCxZQUFELENBQWQsRUFBOEI7QUFBQTs7QUFDN0IsVUFBSXdDLGtCQUF1RCxHQUFHeEQsaUJBQWlCLENBQzlFeUQsa0NBQWtDLENBQUNsQiw0QkFBRCxDQUQ0QyxDQUEvRTs7QUFHQSxtQ0FBSXZCLFlBQVksQ0FBQ00sV0FBakIsb0ZBQUksc0JBQTBCa0QsYUFBOUIsMkRBQUksdUJBQXlDQyxjQUE3QyxFQUE2RDtBQUM1RGpCLFFBQUFBLGtCQUFrQixDQUFDdkMsSUFBbkIsR0FBMEIsd0JBQTFCO0FBQ0EsT0FGRCxNQUVPO0FBQ04sWUFBTXlELGFBQWEsR0FBR0MseUJBQXlCLENBQUNwQyw0QkFBNEIsQ0FBQ3ZCLFlBQTlCLENBQS9DO0FBQ0EsWUFBTTRELGlCQUFpQixHQUFHQyw2QkFBNkIsQ0FBQ3RDLDRCQUE0QixDQUFDdkIsWUFBOUIsQ0FBdkQ7O0FBQ0EsWUFBSSxDQUFDbUQsVUFBRCxLQUFnQk8sYUFBYSxJQUFJRSxpQkFBakMsQ0FBSixFQUF5RDtBQUN4RHBCLFVBQUFBLGtCQUFrQixHQUFHTSw0QkFBNEIsQ0FBQ3ZCLDRCQUFELEVBQStCaUIsa0JBQS9CLENBQWpEOztBQUNBLGNBQ0VrQixhQUFhLElBQUksQ0FBQ0ksWUFBWSxDQUFDSixhQUFELENBQS9CLElBQ0NFLGlCQUFpQixJQUFJLENBQUNFLFlBQVksQ0FBQ0YsaUJBQUQsQ0FEbkMsSUFFQSxDQUFBaEUsa0JBQWtCLFNBQWxCLElBQUFBLGtCQUFrQixXQUFsQixZQUFBQSxrQkFBa0IsQ0FBRW1ELGtCQUFwQixNQUEyQyxRQUg1QyxFQUlFO0FBQ0Q7QUFDQTtBQUNBLGdCQUFJLENBQUNQLGtCQUFrQixDQUFDUSxhQUF4QixFQUF1QztBQUN0Q1IsY0FBQUEsa0JBQWtCLENBQUNRLGFBQW5CLEdBQW1DLEVBQW5DO0FBQ0E7O0FBQ0RSLFlBQUFBLGtCQUFrQixDQUFDUSxhQUFuQixDQUFpQ0MsV0FBakMsR0FBK0MsS0FBL0M7QUFDQTtBQUNELFNBZEQsTUFjTztBQUNOVCxVQUFBQSxrQkFBa0IsR0FBR3hCLHlCQUF5QixDQUFDaEIsWUFBRCxFQUFld0Msa0JBQWYsQ0FBOUM7O0FBQ0EsY0FBSUEsa0JBQWtCLENBQUN2QyxJQUFuQixLQUE0QixnQ0FBaEMsRUFBa0U7QUFDakV1QyxZQUFBQSxrQkFBa0IsQ0FBQ1EsYUFBbkIsR0FBbUM7QUFDbENlLGNBQUFBLHFCQUFxQixFQUFFO0FBRFcsYUFBbkM7QUFHQTtBQUNEO0FBQ0Q7O0FBQ0QsVUFBSVgsZ0JBQUosRUFBc0I7QUFDckIsZUFBT1osa0JBQWtCLENBQUNRLGFBQTFCO0FBQ0EsZUFBT1Isa0JBQWtCLENBQUN3QixXQUExQjtBQUNBLGVBQU94QixrQkFBa0IsQ0FBQ3ZDLElBQTFCO0FBQ0E7O0FBQ0QsVUFBSW9ELGlCQUFKLEVBQXVCO0FBQ3RCYixRQUFBQSxrQkFBa0IsQ0FBQ3lCLFVBQW5CLEdBQWdDWixpQkFBaEM7QUFDQTs7QUFDRCxVQUFJQyxhQUFKLEVBQW1CO0FBQ2xCZCxRQUFBQSxrQkFBa0IsQ0FBQzBCLFVBQW5CLEdBQWdDLEtBQWhDO0FBQ0E7O0FBQ0QsYUFBT3RDLGNBQWMsQ0FBQ1ksa0JBQUQsQ0FBckI7QUFDQSxLQTVDRCxNQTRDTztBQUNOLFVBQUl4QyxZQUFZLElBQUlBLFlBQVksQ0FBQ3lCLEtBQWIsa0RBQXBCLEVBQStFO0FBQzlFLGVBQU9HLGNBQWMsQ0FBQ1gsb0JBQW9CLENBQUVqQixZQUFELENBQW1DMkIsS0FBcEMsQ0FBckIsQ0FBckI7QUFDQSxPQUZELE1BRU87QUFDTixlQUFPLEVBQVA7QUFDQTtBQUNEO0FBQ0QsR0F0RU07Ozs7QUF3RUEsTUFBTXdDLGNBQWMsR0FBRyxVQUM3QjVDLDRCQUQ2QixFQUU3QjNCLGtCQUY2QixFQUdEO0FBQzVCLFFBQU13RSxpQkFBaUIsR0FBR0MsNkJBQTZCLENBQUM5Qyw0QkFBNEIsQ0FBQ3ZCLFlBQTlCLENBQXZEO0FBQ0EsUUFBTXNFLHFCQUFxQixHQUFHQyxpQ0FBaUMsQ0FBQ2hELDRCQUE0QixDQUFDdkIsWUFBOUIsQ0FBL0Q7O0FBQ0EsUUFBSW9FLGlCQUFpQixJQUFJRSxxQkFBekIsRUFBZ0Q7QUFDL0MsVUFBTUUsa0JBQWtCLEdBQUdKLGlCQUFpQixJQUFJRSxxQkFBaEQ7QUFDQSxVQUFNRywrQkFBK0IsR0FBR2pGLG9CQUFvQixDQUFDK0IsNEJBQUQsRUFBK0JpRCxrQkFBL0IsQ0FBNUQ7QUFDQSxhQUFPdEIsZUFBZSxDQUFDdUIsK0JBQUQsRUFBa0M3RSxrQkFBbEMsQ0FBdEI7QUFDQTs7QUFDRCxXQUFPTixTQUFQO0FBQ0EsR0FaTTs7OztBQWNBLE1BQU1vRix3QkFBd0IsR0FBRyxVQUN2Q25ELDRCQUR1QyxFQUV2QzNCLGtCQUZ1QyxFQUdYO0FBQzVCLFFBQU0rRSxnQkFBZ0IsR0FBR0MsNkJBQTZCLENBQUNyRCw0QkFBNEIsQ0FBQ3ZCLFlBQTlCLENBQXREOztBQUNBLFFBQUkyRSxnQkFBSixFQUFzQjtBQUNyQixVQUFNRSxpQkFBaUIsR0FBR3JGLG9CQUFvQixDQUFDK0IsNEJBQUQsRUFBK0JvRCxnQkFBL0IsQ0FBOUM7QUFDQSxVQUFNRyxhQUFhLEdBQUc1QixlQUFlLENBQUMyQixpQkFBRCxFQUFvQmpGLGtCQUFwQixFQUF3QyxJQUF4QyxFQUE4QyxJQUE5QyxFQUFvRDtBQUFFbUYsUUFBQUEsU0FBUyxFQUFFO0FBQWIsT0FBcEQsQ0FBckM7QUFDQSxhQUFPRCxhQUFQO0FBQ0E7O0FBQ0QsV0FBT3hGLFNBQVA7QUFDQSxHQVhNOzs7O0FBYUEsTUFBTTBGLGVBQWUsR0FBRyxVQUM5QkMsYUFEOEIsRUFFOUJDLFVBRjhCLEVBRzlCQyxjQUg4QixFQUk5QnZGLGtCQUo4QixFQUs5QndGLGNBTDhCLEVBTWY7QUFBQTs7QUFDZjtBQUNBLFFBQU1DLFNBQW1CLEdBQUl2RCxnQkFBZ0IsQ0FBQ21ELGFBQUQsQ0FBaEIsSUFBbUNBLGFBQWEsQ0FBQy9FLE9BQWxELElBQStEK0UsYUFBM0Y7O0FBQ0EsUUFDQ0csY0FBYyxJQUNkLDJCQUFDQyxTQUFTLENBQUMvRSxXQUFYLG9GQUFDLHNCQUF1QmdGLEVBQXhCLDJEQUFDLHVCQUEyQkMsVUFBNUIsQ0FEQSxJQUVBLEVBQUVGLFNBQVMsQ0FBQ3BGLElBQVYsS0FBbUIsWUFBckIsQ0FGQSxJQUdBLEVBQUUsMkJBQUFvRixTQUFTLENBQUMvRSxXQUFWLDRHQUF1QmtELGFBQXZCLGtGQUFzQ0MsY0FBdEMsZ0NBQXdENEIsU0FBUyxDQUFDL0UsV0FBbEUscUZBQXdELHVCQUF1QmtELGFBQS9FLDJEQUF3RCx1QkFBc0NnQyxhQUE5RixDQUFGLENBSkQsRUFLRTtBQUNELGFBQU8sdUJBQVA7QUFDQTs7QUFDRCxRQUFJLENBQUNQLGFBQUQsSUFBa0IsT0FBT0EsYUFBUCxLQUF5QixRQUEvQyxFQUF5RDtBQUN4RCxhQUFPLE1BQVA7QUFDQTs7QUFDRCxrQ0FBSUksU0FBUyxDQUFDL0UsV0FBZCxxRkFBSSx1QkFBdUJnRixFQUEzQiwyREFBSSx1QkFBMkJDLFVBQS9CLEVBQTJDO0FBQzFDLGFBQU8sUUFBUDtBQUNBOztBQUNELFFBQUlGLFNBQVMsQ0FBQ3BGLElBQVYsS0FBbUIsWUFBdkIsRUFBcUM7QUFDcEMsYUFBTyxRQUFQO0FBQ0E7O0FBQ0QsWUFBUWlGLFVBQVUsQ0FBQ3pELEtBQW5CO0FBQ0MsV0FBSywwQ0FBTDtBQUNDLGVBQU8sV0FBUDs7QUFDRCxXQUFLLG1EQUFMO0FBQ0MsWUFBSSx1QkFBQXlELFVBQVUsQ0FBQ08sTUFBWCxtR0FBbUJ2RixPQUFuQixnRkFBNEJ1QixLQUE1QixNQUFzQywwQ0FBMUMsRUFBc0Y7QUFDckYsaUJBQU8sV0FBUDtBQUNBLFNBRkQsTUFFTyxJQUFJLHdCQUFBeUQsVUFBVSxDQUFDTyxNQUFYLHFHQUFtQnZGLE9BQW5CLGdGQUE0QnVCLEtBQTVCLE1BQXNDLG1EQUExQyxFQUErRjtBQUNyRyxpQkFBTyxTQUFQO0FBQ0E7O0FBQ0Q7O0FBQ0QsV0FBSywrQ0FBTDtBQUNBLFdBQUssOERBQUw7QUFDQyxlQUFPLFFBQVA7O0FBQ0QsV0FBSyx3REFBTDtBQUNDLGVBQU8sTUFBUDtBQWRGOztBQWdCQSxRQUFJMEQsY0FBSixhQUFJQSxjQUFKLGdEQUFJQSxjQUFjLENBQUVuRCxnQkFBcEIsb0ZBQUksc0JBQWtDMUIsV0FBdEMscUZBQUksdUJBQStDQyxNQUFuRCwyREFBSSx1QkFBdURtRixXQUEzRCxFQUF3RTtBQUN2RSxVQUFNQyxhQUFhLEdBQUdSLGNBQWMsQ0FBQ25ELGdCQUFmLENBQWdDMUIsV0FBaEMsQ0FBNENDLE1BQTVDLENBQW1EbUYsV0FBekU7QUFDQSxVQUFNRSxjQUFjLEdBQUcsQ0FBQ0QsYUFBYSxDQUFDRSxLQUFkLENBQW9CLFVBQVNDLElBQVQsRUFBZTtBQUFBOztBQUMxRCxlQUFPLENBQUFBLElBQUksU0FBSixJQUFBQSxJQUFJLFdBQUosNkJBQUFBLElBQUksQ0FBRTVGLE9BQU4sZ0VBQWVhLElBQWYsTUFBd0JzRSxTQUFTLENBQUN0RSxJQUF6QyxDQUQwRCxDQUUxRDtBQUNBLE9BSHVCLENBQXhCOztBQUlBLFVBQUk2RSxjQUFjLElBQUloRyxrQkFBa0IsQ0FBQ21HLGdCQUF6QyxFQUEyRDtBQUFBOztBQUMxRCxzQ0FBSVosY0FBYyxDQUFDYSxlQUFuQixxRkFBSSx1QkFBZ0MxRixXQUFwQyxxRkFBSSx1QkFBNkNDLE1BQWpELDJEQUFJLHVCQUFxRDBGLFNBQXpELEVBQW9FO0FBQ25FO0FBQ0EsaUJBQU8sK0JBQVA7QUFDQTs7QUFDRCxlQUFPckcsa0JBQWtCLENBQUNtRyxnQkFBbkIsS0FBd0Msa0JBQXhDLEdBQTZELGtCQUE3RCxHQUFrRixrQkFBekY7QUFDQTtBQUNEOztBQUNELFFBQUliLFVBQVUsQ0FBQ2dCLFdBQWYsRUFBNEI7QUFDM0IsYUFBTyxjQUFQO0FBQ0E7O0FBQ0Qsa0NBQUliLFNBQVMsQ0FBQy9FLFdBQWQsc0ZBQUksdUJBQXVCcUMsUUFBM0IsNERBQUksd0JBQWlDRSxXQUFyQyxFQUFrRDtBQUNqRCxVQUFJakQsa0JBQWtCLENBQUNtRCxrQkFBbkIsS0FBMEMsUUFBOUMsRUFBd0Q7QUFDdkQsZUFBTyxNQUFQO0FBQ0E7O0FBQ0QsYUFBTyxvQkFBUDtBQUNBOztBQUNELFFBQUksNEJBQUFzQyxTQUFTLENBQUMvRSxXQUFWLCtHQUF1QmtELGFBQXZCLG9GQUFzQ0MsY0FBdEMsaUNBQXdENEIsU0FBUyxDQUFDL0UsV0FBbEUsdUZBQXdELHdCQUF1QmtELGFBQS9FLDREQUF3RCx3QkFBc0NnQyxhQUE5RixDQUFKLEVBQWlIO0FBQ2hILGFBQU8sTUFBUDtBQUNBOztBQUNELG1DQUFJSCxTQUFTLENBQUMvRSxXQUFkLHVGQUFJLHdCQUF1QmdGLEVBQTNCLDREQUFJLHdCQUEyQmEsYUFBL0IsRUFBOEM7QUFDN0MsYUFBTyxNQUFQO0FBQ0E7O0FBQ0QsUUFBTUMscUJBQXFCLEdBQUcsQ0FBQWpCLGNBQWMsU0FBZCxJQUFBQSxjQUFjLFdBQWQsc0NBQUFBLGNBQWMsQ0FBRW5ELGdCQUFoQixrRkFBa0NwQixvQkFBbEMsS0FBMEQsRUFBeEY7QUFDQSxRQUFJeUYsc0NBQXNDLEdBQUcsS0FBN0M7QUFDQUQsSUFBQUEscUJBQXFCLENBQUNoRSxPQUF0QixDQUE4QixVQUFBa0UsUUFBUSxFQUFJO0FBQ3pDLFVBQUlBLFFBQVEsQ0FBQ0MscUJBQVQsSUFBa0NELFFBQVEsQ0FBQ0MscUJBQVQsQ0FBK0JDLE1BQXJFLEVBQTZFO0FBQzVFRixRQUFBQSxRQUFRLENBQUNDLHFCQUFULENBQStCbkUsT0FBL0IsQ0FBdUMsVUFBQXFFLGNBQWMsRUFBSTtBQUN4RCxjQUFJLENBQUFBLGNBQWMsU0FBZCxJQUFBQSxjQUFjLFdBQWQsWUFBQUEsY0FBYyxDQUFFQyxjQUFoQixNQUFtQ3JCLFNBQVMsQ0FBQ3RFLElBQWpELEVBQXVEO0FBQUE7O0FBQ3RELGdCQUFJdUYsUUFBSixhQUFJQSxRQUFKLCtDQUFJQSxRQUFRLENBQUVwQyxVQUFkLGtGQUFJLHFCQUFzQjVELFdBQTFCLG9GQUFJLHNCQUFtQ2dGLEVBQXZDLDJEQUFJLHVCQUF1Q3FCLGVBQTNDLEVBQTREO0FBQzNETixjQUFBQSxzQ0FBc0MsR0FBRyxJQUF6QztBQUNBO0FBQ0Q7QUFDRCxTQU5EO0FBT0E7QUFDRCxLQVZEOztBQVdBLFFBQUlBLHNDQUFKLEVBQTRDO0FBQzNDLGFBQU8sdUJBQVA7QUFDQTs7QUFDRCxtQ0FBSWhCLFNBQVMsQ0FBQy9FLFdBQWQsdUZBQUksd0JBQXVCQyxNQUEzQiw0REFBSSx3QkFBK0JxRyxjQUFuQyxFQUFtRDtBQUNsRCxhQUFPLGFBQVA7QUFDQTs7QUFDRCxRQUFJMUIsVUFBVSxDQUFDekQsS0FBWCxLQUFxQiw2Q0FBekIsRUFBd0U7QUFDdkUsYUFBTyxNQUFQO0FBQ0E7O0FBQ0QsV0FBTyxNQUFQO0FBQ0EsR0E5Rk07Ozs7QUFnR0EsTUFBTW9GLFlBQVksR0FBRyxVQUMzQjVCLGFBRDJCLEVBRTNCQyxVQUYyQixFQUczQjRCLG1CQUgyQixFQUlSO0FBQUE7O0FBQ25CO0FBQ0EsUUFBSSxDQUFDN0IsYUFBRCxJQUFrQixPQUFPQSxhQUFQLEtBQXlCLFFBQS9DLEVBQXlEO0FBQ3hELGFBQU8sSUFBUDtBQUNBOztBQUNELFFBQU1JLFNBQW1CLEdBQUl2RCxnQkFBZ0IsQ0FBQ21ELGFBQUQsQ0FBaEIsSUFBbUNBLGFBQWEsQ0FBQy9FLE9BQWxELElBQStEK0UsYUFBM0Y7O0FBQ0EsWUFBUUMsVUFBVSxDQUFDekQsS0FBbkI7QUFDQyxXQUFLLG1EQUFMO0FBQ0MsWUFBSSx3QkFBQXlELFVBQVUsQ0FBQ08sTUFBWCxxR0FBbUJ2RixPQUFuQixnRkFBNEJ1QixLQUE1QixNQUFzQyxtREFBMUMsRUFBK0Y7QUFDOUYsaUJBQU8sSUFBUDtBQUNBLFNBRkQsTUFFTyxJQUFJLHdCQUFBeUQsVUFBVSxDQUFDTyxNQUFYLHFHQUFtQnZGLE9BQW5CLGdGQUE0QjZHLGFBQTVCLE1BQThDLDZCQUFsRCxFQUFpRjtBQUN2RixpQkFBTyxpQkFBUDtBQUNBOztBQUNEOztBQUNELFdBQUssMENBQUw7QUFDQyxZQUFJLENBQUE3QixVQUFVLFNBQVYsSUFBQUEsVUFBVSxXQUFWLFlBQUFBLFVBQVUsQ0FBRTZCLGFBQVosTUFBOEIsNkJBQWxDLEVBQWlFO0FBQ2hFLGlCQUFPLGlCQUFQO0FBQ0E7O0FBQ0Q7O0FBRUQsV0FBSywrQ0FBTDtBQUNBLFdBQUssd0RBQUw7QUFDQSxXQUFLLDhEQUFMO0FBQ0MsZUFBTyxJQUFQO0FBakJGOztBQW1CQSxRQUFNckQsYUFBYSxHQUFHQyx5QkFBeUIsQ0FBQzBCLFNBQUQsQ0FBL0M7QUFDQSxRQUFNekIsaUJBQWlCLEdBQUdDLDZCQUE2QixDQUFDd0IsU0FBRCxDQUF2RDs7QUFDQSxRQUNDMkIsY0FBYyxDQUFDbEQsWUFBZixDQUE0QnVCLFNBQTVCLEtBQ0MzQixhQUFhLElBQUlzRCxjQUFjLENBQUNsRCxZQUFmLENBQTRCSixhQUE1QixDQURsQixJQUVDRSxpQkFBaUIsSUFBSW9ELGNBQWMsQ0FBQ2xELFlBQWYsQ0FBNEJGLGlCQUE1QixDQUh2QixFQUlFO0FBQ0QsVUFBSSxDQUFBa0QsbUJBQW1CLFNBQW5CLElBQUFBLG1CQUFtQixXQUFuQixZQUFBQSxtQkFBbUIsQ0FBRS9ELGtCQUFyQixNQUE0QyxRQUFoRCxFQUEwRDtBQUN6RCxlQUFPLE9BQVA7QUFDQTs7QUFDRCxhQUFPLG9CQUFQO0FBQ0E7O0FBQ0QsUUFBSSw0QkFBQXNDLFNBQVMsQ0FBQy9FLFdBQVYsK0dBQXVCZ0YsRUFBdkIsK0dBQTJCYSxhQUEzQixvRkFBMENjLE9BQTFDLE9BQXVENUIsU0FBUyxDQUFDcEYsSUFBVixLQUFtQixZQUE5RSxFQUE0RjtBQUMzRixhQUFPLFVBQVA7QUFDQTs7QUFDRCxZQUFRb0YsU0FBUyxDQUFDcEYsSUFBbEI7QUFDQyxXQUFLLFVBQUw7QUFDQyxlQUFPLFlBQVA7O0FBQ0QsV0FBSyxVQUFMO0FBQ0EsV0FBSyxlQUFMO0FBQ0MsZUFBTyxZQUFQOztBQUNELFdBQUssY0FBTDtBQUNBLFdBQUssb0JBQUw7QUFDQyxlQUFPLGdCQUFQOztBQUNELFdBQUssYUFBTDtBQUNDLGVBQU8sVUFBUDtBQVZGOztBQVlBLFFBQUksNEJBQUFvRixTQUFTLENBQUMvRSxXQUFWLCtHQUF1QnFDLFFBQXZCLG9GQUFpQ0UsV0FBakMsaUNBQWdEd0MsU0FBUyxDQUFDL0UsV0FBMUQsdUZBQWdELHdCQUF1QnFDLFFBQXZFLDREQUFnRCx3QkFBaUNDLElBQWpGLENBQUosRUFBMkY7QUFDMUYsYUFBTyxlQUFQO0FBQ0E7O0FBQ0QsV0FBTyxPQUFQO0FBQ0EsR0E1RE07QUE4RFA7Ozs7Ozs7Ozs7Ozs7QUFTTyxNQUFNc0Usb0JBQW9CLEdBQUcsVUFDbkNDLGtCQURtQyxFQUVuQ25FLGFBRm1DLEVBR1A7QUFBQTs7QUFDNUIsUUFBTWhELFlBQXlELEdBQUdtSCxrQkFBa0IsQ0FBQ25ILFlBQXJGO0FBQ0EsUUFBSW9ILGFBQUo7O0FBQ0EsUUFBSXBILFlBQUosRUFBa0I7QUFDakIsY0FBUUEsWUFBWSxDQUFDeUIsS0FBckI7QUFDQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQzJGLFVBQUFBLGFBQWEsR0FBR3BILFlBQVksQ0FBQzJCLEtBQWIsQ0FBbUJ6QixPQUFuQztBQUNBOztBQUNEO0FBQ0M7QUFDQSxjQUFJLENBQUFGLFlBQVksU0FBWixJQUFBQSxZQUFZLFdBQVosb0NBQUFBLFlBQVksQ0FBRXlGLE1BQWQsdUdBQXNCdkYsT0FBdEIsZ0ZBQStCdUIsS0FBL0IsZ0RBQUosRUFBOEU7QUFBQTs7QUFDN0UyRixZQUFBQSxhQUFhLDZCQUFHcEgsWUFBWSxDQUFDeUYsTUFBYixDQUFvQnZGLE9BQXZCLDJEQUFHLHVCQUE2QnlCLEtBQTdCLENBQW1DekIsT0FBbkQ7QUFDQTtBQUNBOztBQUNGOztBQUNBO0FBQ0E7QUFDQTtBQUNDa0gsVUFBQUEsYUFBYSxHQUFHOUgsU0FBaEI7QUFuQkY7QUFxQkE7O0FBQ0QsUUFBTStILCtCQUErQixHQUFHLENBQUFyRSxhQUFhLFNBQWIsSUFBQUEsYUFBYSxXQUFiLFlBQUFBLGFBQWEsQ0FBRXNFLFdBQWYsSUFBNkJoQyxFQUFFLENBQUNpQyxVQUFoQyxHQUE2QzFGLFFBQVEsQ0FBQyxLQUFELENBQTdGO0FBQ0EsUUFBTTJGLGdCQUFnQixHQUFHLENBQUF4RSxhQUFhLFNBQWIsSUFBQUEsYUFBYSxXQUFiLFlBQUFBLGFBQWEsQ0FBRXNFLFdBQWYsSUFBNkJHLEtBQUssQ0FBQ25DLEVBQUUsQ0FBQ29DLFNBQUosRUFBZSxDQUFmLENBQWxDLEdBQXNEN0YsUUFBUSxDQUFDLEtBQUQsQ0FBdkYsQ0EzQjRCLENBNkI1QjtBQUNBO0FBQ0E7QUFDQTs7QUFDQSxXQUFPRCxjQUFjLENBQ3BCK0YsR0FBRyxNQUFILFNBQ0ksQ0FDRkMsR0FBRyxDQUFDSCxLQUFLLENBQUN4RyxvQkFBb0IsQ0FBQ2pCLFlBQUQsYUFBQ0EsWUFBRCxpREFBQ0EsWUFBWSxDQUFFTSxXQUFmLHFGQUFDLHVCQUEyQmdGLEVBQTVCLDJEQUFDLHVCQUErQnVDLE1BQWhDLENBQXJCLEVBQThELElBQTlELENBQU4sQ0FERCxFQUVGQyxNQUFNLENBQ0wsQ0FBQyxDQUFDVixhQURHLEVBRUxBLGFBQWEsSUFBSVEsR0FBRyxDQUFDSCxLQUFLLENBQUN4RyxvQkFBb0IsMEJBQUNtRyxhQUFhLENBQUM5RyxXQUFmLG9GQUFDLHNCQUEyQmdGLEVBQTVCLDJEQUFDLHVCQUErQnVDLE1BQWhDLENBQXJCLEVBQThELElBQTlELENBQU4sQ0FGZixFQUdMLElBSEssQ0FGSixFQU9GRSxFQUFFLENBQUNILEdBQUcsQ0FBQ1AsK0JBQUQsQ0FBSixFQUF1Q0csZ0JBQXZDLENBUEEsQ0FESixDQURvQixDQUFyQjtBQWFBLEdBakRNOzs7O0FBbURBLE1BQU1RLG1CQUFtQixHQUFHLFVBQ2xDL0MsYUFEa0MsRUFFbENnRCxvQkFGa0MsRUFHbENySSxrQkFIa0MsRUFJTjtBQUM1QixRQUFNeUYsU0FBUyxHQUFJdkQsZ0JBQWdCLENBQUNtRCxhQUFELENBQWhCLElBQW1DQSxhQUFhLENBQUMvRSxPQUFsRCxJQUErRCtFLGFBQWpGO0FBQ0EsUUFBTWlELFlBQVksR0FBR3JFLDZCQUE2QixDQUFDd0IsU0FBRCxDQUE3QixJQUE0QzFCLHlCQUF5QixDQUFDMEIsU0FBRCxDQUExRjs7QUFDQSxRQUFJLENBQUM2QyxZQUFMLEVBQW1CO0FBQ2xCLGFBQU90RyxjQUFjLENBQUMsRUFBRCxDQUFyQjtBQUNBOztBQUNELFFBQU1MLDRCQUE0QixHQUFHL0Isb0JBQW9CLENBQUN5SSxvQkFBRCxFQUF1QmhELGFBQXZCLENBQXpEO0FBQ0EsUUFBTWtELGlCQUFpQixHQUFHaEUsY0FBYyxDQUFDNUMsNEJBQUQsRUFBK0IzQixrQkFBL0IsQ0FBeEM7QUFDQSxRQUFNd0ksa0JBQWtCLEdBQUdULEdBQUcsQ0FBQ0MsR0FBRyxDQUFDUyxvQkFBb0IsQ0FBQ0gsWUFBRCxDQUFyQixDQUFKLEVBQTBDTixHQUFHLENBQUNaLGNBQWMsQ0FBQ3NCLFVBQWYsQ0FBMEJKLFlBQTFCLENBQUQsQ0FBN0MsQ0FBOUI7QUFDQSxXQUFPdEcsY0FBYyxDQUFDa0csTUFBTSxDQUFDTSxrQkFBRCxFQUFxQixFQUFyQixFQUF5QkQsaUJBQXpCLENBQVAsQ0FBckI7QUFDQSxHQWRNIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXREaXNwbGF5TW9kZSwgUHJvcGVydHlPclBhdGgsIERpc3BsYXlNb2RlIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvVUlGb3JtYXR0ZXJzXCI7XG5pbXBvcnQgeyBnZXRCaW5kaW5nV2l0aFVuaXRPckN1cnJlbmN5LCBmb3JtYXRXaXRoVHlwZUluZm9ybWF0aW9uIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvVUlGb3JtYXR0ZXJzXCI7XG5pbXBvcnQge1xuXHREYXRhTW9kZWxPYmplY3RQYXRoLFxuXHRlbmhhbmNlRGF0YU1vZGVsUGF0aCxcblx0Z2V0UGF0aFJlbGF0aXZlTG9jYXRpb24sXG5cdGdldENvbnRleHRSZWxhdGl2ZVRhcmdldE9iamVjdFBhdGhcbn0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvRGF0YU1vZGVsUGF0aEhlbHBlclwiO1xuaW1wb3J0IHsgUHJvcGVydHkgfSBmcm9tIFwiQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlclwiO1xuaW1wb3J0IHsgVUkgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0JpbmRpbmdIZWxwZXJcIjtcbmltcG9ydCB7XG5cdEV4cHJlc3Npb24sXG5cdGFubm90YXRpb25FeHByZXNzaW9uLFxuXHRmb3JtYXRSZXN1bHQsXG5cdHRyYW5zZm9ybVJlY3Vyc2l2ZWx5LFxuXHRCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb24sXG5cdEJpbmRpbmdFeHByZXNzaW9uLFxuXHRjb21waWxlQmluZGluZyxcblx0Y29uc3RhbnQsXG5cdGJpbmRpbmdFeHByZXNzaW9uLFxuXHRhbmQsXG5cdG9yLFxuXHRpZkVsc2UsXG5cdGVxdWFsLFxuXHRub3QsXG5cdENvbXBsZXhUeXBlRXhwcmVzc2lvblxufSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9CaW5kaW5nRXhwcmVzc2lvblwiO1xuaW1wb3J0IHtcblx0aXNQYXRoRXhwcmVzc2lvbixcblx0Z2V0QXNzb2NpYXRlZFVuaXRQcm9wZXJ0eSxcblx0Z2V0QXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHksXG5cdGlzUHJvcGVydHksXG5cdGdldEFzc29jaWF0ZWRVbml0UHJvcGVydHlQYXRoLFxuXHRnZXRBc3NvY2lhdGVkQ3VycmVuY3lQcm9wZXJ0eVBhdGgsXG5cdGhhc1ZhbHVlSGVscCxcblx0Z2V0QXNzb2NpYXRlZFRleHRQcm9wZXJ0eVBhdGhcbn0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvUHJvcGVydHlIZWxwZXJcIjtcbmltcG9ydCB2YWx1ZUZvcm1hdHRlcnMgZnJvbSBcInNhcC9mZS9jb3JlL2Zvcm1hdHRlcnMvVmFsdWVGb3JtYXR0ZXJcIjtcbmltcG9ydCAqIGFzIFByb3BlcnR5SGVscGVyIGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL1Byb3BlcnR5SGVscGVyXCI7XG5pbXBvcnQgeyBpc1JlYWRPbmx5RXhwcmVzc2lvbiB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0ZpZWxkQ29udHJvbEhlbHBlclwiO1xuaW1wb3J0IHsgRGF0YUZpZWxkQWJzdHJhY3RUeXBlcywgRGF0YUZpZWxkV2l0aFVybCwgRGF0YVBvaW50VHlwZVR5cGVzLCBVSUFubm90YXRpb25UeXBlcyB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuXG5leHBvcnQgdHlwZSBGaWVsZEZvcm1hdE9wdGlvbnMgPSBQYXJ0aWFsPHtcblx0dmFsdWVGb3JtYXQ6IFN0cmluZztcblx0dGV4dEFsaWduTW9kZTogU3RyaW5nO1xuXHRkaXNwbGF5TW9kZTogRGlzcGxheU1vZGU7XG5cdG1lYXN1cmVEaXNwbGF5TW9kZTogU3RyaW5nO1xuXHR0ZXh0TGluZXNEaXNwbGF5OiBTdHJpbmc7XG5cdHRleHRMaW5lc0VkaXQ6IFN0cmluZztcblx0dGV4dE1heExpbmVzOiBTdHJpbmc7XG5cdHNob3dFbXB0eUluZGljYXRvcjogYm9vbGVhbjtcblx0c2VtYW50aWNLZXlTdHlsZTogU3RyaW5nO1xuXHRzaG93SWNvblVybDogYm9vbGVhbjtcblx0aXNBbmFseXRpY3M6IGJvb2xlYW47XG59PjtcblxuZXhwb3J0IHR5cGUgRWRpdFN0eWxlID1cblx0fCBcIklucHV0V2l0aFZhbHVlSGVscFwiXG5cdHwgXCJUZXh0QXJlYVwiXG5cdHwgXCJEYXRlUGlja2VyXCJcblx0fCBcIlRpbWVQaWNrZXJcIlxuXHR8IFwiRGF0ZVRpbWVQaWNrZXJcIlxuXHR8IFwiQ2hlY2tCb3hcIlxuXHR8IFwiSW5wdXRXaXRoVW5pdFwiXG5cdHwgXCJJbnB1dFwiXG5cdHwgXCJSYXRpbmdJbmRpY2F0b3JcIjtcblxuZXhwb3J0IHR5cGUgRGlzcGxheVN0eWxlID1cblx0fCBcIlRleHRcIlxuXHR8IFwiQXZhdGFyXCJcblx0fCBcIkRhdGFQb2ludFwiXG5cdHwgXCJDb250YWN0XCJcblx0fCBcIkJ1dHRvblwiXG5cdHwgXCJMaW5rXCJcblx0fCBcIk9iamVjdFN0YXR1c1wiXG5cdHwgXCJBbW91bnRXaXRoQ3VycmVuY3lcIlxuXHR8IFwiU2VtYW50aWNLZXlXaXRoRHJhZnRJbmRpY2F0b3JcIlxuXHR8IFwiT2JqZWN0SWRlbnRpZmllclwiXG5cdHwgXCJMYWJlbFNlbWFudGljS2V5XCJcblx0fCBcIkxpbmtXaXRoUXVpY2tWaWV3Rm9ybVwiXG5cdHwgXCJMaW5rV3JhcHBlclwiO1xuXG4vKipcbiAqIFJlY3Vyc2l2ZWx5IGFkZCB0aGUgdGV4dCBhcnJhbmdlbWVudCB0byBhIGJpbmRpbmcgZXhwcmVzc2lvbi5cbiAqXG4gKiBAcGFyYW0gYmluZGluZ0V4cHJlc3Npb24gVGhlIGJpbmRpbmcgZXhwcmVzc2lvbiB0byBlbmhhbmNlXG4gKiBAcGFyYW0gZnVsbENvbnRleHRQYXRoIFRoZSBjdXJyZW50IGNvbnRleHQgcGF0aCB3ZSdyZSBvbiAodG8gcHJvcGVybHkgcmVzb2x2ZSB0aGUgdGV4dCBhcnJhbmdlbWVudCBwcm9wZXJ0aWVzKVxuICogQHJldHVybnMgQW4gdXBkYXRlZCBleHByZXNzaW9uIGNvbnRhaW5pbmcgdGhlIHRleHQgYXJyYW5nZW1lbnQgYmluZGluZy5cbiAqL1xuZXhwb3J0IGNvbnN0IGFkZFRleHRBcnJhbmdlbWVudFRvQmluZGluZ0V4cHJlc3Npb24gPSBmdW5jdGlvbihcblx0YmluZGluZ0V4cHJlc3Npb246IEV4cHJlc3Npb248YW55Pixcblx0ZnVsbENvbnRleHRQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoXG4pOiBFeHByZXNzaW9uPGFueT4ge1xuXHRyZXR1cm4gdHJhbnNmb3JtUmVjdXJzaXZlbHkoYmluZGluZ0V4cHJlc3Npb24sIFwiQmluZGluZ1wiLCAoZXhwcmVzc2lvbjogQmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPGFueT4pID0+IHtcblx0XHRsZXQgb3V0RXhwcmVzc2lvbjogRXhwcmVzc2lvbjxhbnk+ID0gZXhwcmVzc2lvbjtcblx0XHRpZiAoZXhwcmVzc2lvbi5tb2RlbE5hbWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0Ly8gSW4gY2FzZSBvZiBkZWZhdWx0IG1vZGVsIHdlIHRoZW4gbmVlZCB0byByZXNvbHZlIHRoZSB0ZXh0IGFycmFuZ2VtZW50IHByb3BlcnR5XG5cdFx0XHRjb25zdCBvUHJvcGVydHlEYXRhTW9kZWxQYXRoID0gZW5oYW5jZURhdGFNb2RlbFBhdGgoZnVsbENvbnRleHRQYXRoLCBleHByZXNzaW9uLnBhdGgpO1xuXHRcdFx0b3V0RXhwcmVzc2lvbiA9IGdldEJpbmRpbmdXaXRoVGV4dEFycmFuZ2VtZW50KG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgsIGV4cHJlc3Npb24pO1xuXHRcdH1cblx0XHRyZXR1cm4gb3V0RXhwcmVzc2lvbjtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QmluZGluZ1dpdGhUZXh0QXJyYW5nZW1lbnQgPSBmdW5jdGlvbihcblx0b1Byb3BlcnR5RGF0YU1vZGVsUGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0cHJvcGVydHlCaW5kaW5nRXhwcmVzc2lvbjogRXhwcmVzc2lvbjxzdHJpbmc+LFxuXHRmaWVsZEZvcm1hdE9wdGlvbnM/OiBGaWVsZEZvcm1hdE9wdGlvbnNcbik6IEV4cHJlc3Npb248c3RyaW5nPiB7XG5cdGNvbnN0IHRhcmdldERpc3BsYXlNb2RlT3ZlcnJpZGUgPSBmaWVsZEZvcm1hdE9wdGlvbnM/LmRpc3BsYXlNb2RlO1xuXHRsZXQgb3V0RXhwcmVzc2lvbiA9IHByb3BlcnR5QmluZGluZ0V4cHJlc3Npb247XG5cdGNvbnN0IG9Qcm9wZXJ0eURlZmluaXRpb24gPVxuXHRcdG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgudGFyZ2V0T2JqZWN0LnR5cGUgPT09IFwiUHJvcGVydHlQYXRoXCJcblx0XHRcdD8gKG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgudGFyZ2V0T2JqZWN0LiR0YXJnZXQgYXMgUHJvcGVydHkpXG5cdFx0XHQ6IChvUHJvcGVydHlEYXRhTW9kZWxQYXRoLnRhcmdldE9iamVjdCBhcyBQcm9wZXJ0eSk7XG5cdGNvbnN0IHRhcmdldERpc3BsYXlNb2RlID0gdGFyZ2V0RGlzcGxheU1vZGVPdmVycmlkZSB8fCBnZXREaXNwbGF5TW9kZShvUHJvcGVydHlEZWZpbml0aW9uLCBvUHJvcGVydHlEYXRhTW9kZWxQYXRoKTtcblx0Y29uc3QgY29tbW9uVGV4dCA9IG9Qcm9wZXJ0eURlZmluaXRpb24uYW5ub3RhdGlvbnM/LkNvbW1vbj8uVGV4dDtcblx0Y29uc3QgcmVsYXRpdmVMb2NhdGlvbiA9IGdldFBhdGhSZWxhdGl2ZUxvY2F0aW9uKFxuXHRcdG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGguY29udGV4dExvY2F0aW9uLFxuXHRcdG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgubmF2aWdhdGlvblByb3BlcnRpZXNcblx0KS5tYXAobnAgPT4gbnAubmFtZSk7XG5cdHByb3BlcnR5QmluZGluZ0V4cHJlc3Npb24gPSBmb3JtYXRXaXRoVHlwZUluZm9ybWF0aW9uKG9Qcm9wZXJ0eURlZmluaXRpb24sIHByb3BlcnR5QmluZGluZ0V4cHJlc3Npb24pO1xuXHRpZiAodGFyZ2V0RGlzcGxheU1vZGUgIT09IFwiVmFsdWVcIiAmJiBjb21tb25UZXh0KSB7XG5cdFx0c3dpdGNoICh0YXJnZXREaXNwbGF5TW9kZSkge1xuXHRcdFx0Y2FzZSBcIkRlc2NyaXB0aW9uXCI6XG5cdFx0XHRcdG91dEV4cHJlc3Npb24gPSBhbm5vdGF0aW9uRXhwcmVzc2lvbihjb21tb25UZXh0LCByZWxhdGl2ZUxvY2F0aW9uKSBhcyBFeHByZXNzaW9uPHN0cmluZz47XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIkRlc2NyaXB0aW9uVmFsdWVcIjpcblx0XHRcdFx0b3V0RXhwcmVzc2lvbiA9IGZvcm1hdFJlc3VsdChcblx0XHRcdFx0XHRbYW5ub3RhdGlvbkV4cHJlc3Npb24oY29tbW9uVGV4dCwgcmVsYXRpdmVMb2NhdGlvbikgYXMgRXhwcmVzc2lvbjxzdHJpbmc+LCBwcm9wZXJ0eUJpbmRpbmdFeHByZXNzaW9uXSxcblx0XHRcdFx0XHR2YWx1ZUZvcm1hdHRlcnMuZm9ybWF0V2l0aEJyYWNrZXRzXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBcIlZhbHVlRGVzY3JpcHRpb25cIjpcblx0XHRcdFx0b3V0RXhwcmVzc2lvbiA9IGZvcm1hdFJlc3VsdChcblx0XHRcdFx0XHRbcHJvcGVydHlCaW5kaW5nRXhwcmVzc2lvbiwgYW5ub3RhdGlvbkV4cHJlc3Npb24oY29tbW9uVGV4dCwgcmVsYXRpdmVMb2NhdGlvbikgYXMgRXhwcmVzc2lvbjxzdHJpbmc+XSxcblx0XHRcdFx0XHR2YWx1ZUZvcm1hdHRlcnMuZm9ybWF0V2l0aEJyYWNrZXRzXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gb3V0RXhwcmVzc2lvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRWYWx1ZVJlY3Vyc2l2ZWx5ID0gZnVuY3Rpb24oYmluZGluZ0V4cHJlc3Npb246IEV4cHJlc3Npb248YW55PiwgZnVsbENvbnRleHRQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoKTogRXhwcmVzc2lvbjxhbnk+IHtcblx0cmV0dXJuIHRyYW5zZm9ybVJlY3Vyc2l2ZWx5KGJpbmRpbmdFeHByZXNzaW9uLCBcIkJpbmRpbmdcIiwgKGV4cHJlc3Npb246IEJpbmRpbmdFeHByZXNzaW9uRXhwcmVzc2lvbjxhbnk+KSA9PiB7XG5cdFx0bGV0IG91dEV4cHJlc3Npb246IEV4cHJlc3Npb248YW55PiA9IGV4cHJlc3Npb247XG5cdFx0aWYgKGV4cHJlc3Npb24ubW9kZWxOYW1lID09PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vIEluIGNhc2Ugb2YgZGVmYXVsdCBtb2RlbCB3ZSB0aGVuIG5lZWQgdG8gcmVzb2x2ZSB0aGUgdGV4dCBhcnJhbmdlbWVudCBwcm9wZXJ0eVxuXHRcdFx0Y29uc3Qgb1Byb3BlcnR5RGF0YU1vZGVsUGF0aCA9IGVuaGFuY2VEYXRhTW9kZWxQYXRoKGZ1bGxDb250ZXh0UGF0aCwgZXhwcmVzc2lvbi5wYXRoKTtcblx0XHRcdG91dEV4cHJlc3Npb24gPSBmb3JtYXRXaXRoVHlwZUluZm9ybWF0aW9uKG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgudGFyZ2V0T2JqZWN0LCBleHByZXNzaW9uKTtcblx0XHR9XG5cdFx0cmV0dXJuIG91dEV4cHJlc3Npb247XG5cdH0pO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFRleHRCaW5kaW5nID0gZnVuY3Rpb24oXG5cdG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGZpZWxkRm9ybWF0T3B0aW9uczogRmllbGRGb3JtYXRPcHRpb25zLFxuXHRhc09iamVjdDogYm9vbGVhbiA9IGZhbHNlXG4pOiBFeHByZXNzaW9uPHN0cmluZz4gfCBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0aWYgKFxuXHRcdG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0Py4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRcIiB8fFxuXHRcdG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0Py4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhUG9pbnRUeXBlXCIgfHxcblx0XHRvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdD8uJFR5cGUgPT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkV2l0aE5hdmlnYXRpb25QYXRoXCIgfHxcblx0XHRvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdD8uJFR5cGUgPT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkV2l0aFVybFwiXG5cdCkge1xuXHRcdC8vIElmIHRoZXJlIGlzIG5vIHJlc29sdmVkIHByb3BlcnR5LCB0aGUgdmFsdWUgaXMgcmV0dXJuZWQgYXMgYSBjb25zdGFudFxuXHRcdGNvbnN0IGZpZWxkVmFsdWUgPSBvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC5WYWx1ZSB8fCBcIlwiO1xuXHRcdHJldHVybiBjb21waWxlQmluZGluZyhjb25zdGFudChmaWVsZFZhbHVlKSk7XG5cdH1cblx0aWYgKGlzUGF0aEV4cHJlc3Npb24ob1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QpICYmIG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0LiR0YXJnZXQpIHtcblx0XHRjb25zdCBvTmF2UGF0aCA9IG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0RW50aXR5VHlwZS5yZXNvbHZlUGF0aChvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC5wYXRoLCB0cnVlKTtcblx0XHRvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdCA9IG9OYXZQYXRoLnRhcmdldDtcblx0XHRvTmF2UGF0aC52aXNpdGVkT2JqZWN0cy5mb3JFYWNoKChvTmF2T2JqOiBhbnkpID0+IHtcblx0XHRcdGlmIChvTmF2T2JqICYmIG9OYXZPYmouX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIpIHtcblx0XHRcdFx0b1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5wdXNoKG9OYXZPYmopO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGNvbnN0IG9CaW5kaW5nRXhwcmVzc2lvbiA9IGJpbmRpbmdFeHByZXNzaW9uKGdldENvbnRleHRSZWxhdGl2ZVRhcmdldE9iamVjdFBhdGgob1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aCkpO1xuXHRsZXQgb1RhcmdldEJpbmRpbmc7XG5cdGlmIChcblx0XHRvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdD8uYW5ub3RhdGlvbnM/Lk1lYXN1cmVzPy5Vbml0IHx8XG5cdFx0b1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3Q/LmFubm90YXRpb25zPy5NZWFzdXJlcz8uSVNPQ3VycmVuY3lcblx0KSB7XG5cdFx0b1RhcmdldEJpbmRpbmcgPSBnZXRCaW5kaW5nV2l0aFVuaXRPckN1cnJlbmN5KG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgsIG9CaW5kaW5nRXhwcmVzc2lvbik7XG5cdFx0aWYgKGZpZWxkRm9ybWF0T3B0aW9ucz8ubWVhc3VyZURpc3BsYXlNb2RlID09PSBcIkhpZGRlblwiKSB7XG5cdFx0XHQvLyBUT0RPOiBSZWZhY3RvciBvbmNlIHR5cGVzIGFyZSBsZXNzIGdlbmVyaWMgaGVyZVxuXHRcdFx0KG9UYXJnZXRCaW5kaW5nIGFzIENvbXBsZXhUeXBlRXhwcmVzc2lvbjxTdHJpbmc+KS5mb3JtYXRPcHRpb25zID0ge1xuXHRcdFx0XHQuLi4ob1RhcmdldEJpbmRpbmcgYXMgQ29tcGxleFR5cGVFeHByZXNzaW9uPFN0cmluZz4pLmZvcm1hdE9wdGlvbnMsXG5cdFx0XHRcdHNob3dNZWFzdXJlOiBmYWxzZVxuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0b1RhcmdldEJpbmRpbmcgPSBnZXRCaW5kaW5nV2l0aFRleHRBcnJhbmdlbWVudChvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLCBvQmluZGluZ0V4cHJlc3Npb24sIGZpZWxkRm9ybWF0T3B0aW9ucyk7XG5cdH1cblx0aWYgKGFzT2JqZWN0KSB7XG5cdFx0cmV0dXJuIG9UYXJnZXRCaW5kaW5nO1xuXHR9XG5cdC8vIFdlIGRvbid0IGluY2x1ZGUgJCRub3BhdGNoIGFuZCBwYXJzZUtlZXBFbXB0eVN0cmluZyBhcyB0aGV5IG1ha2Ugbm8gc2Vuc2UgaW4gdGhlIHRleHQgYmluZGluZyBjYXNlXG5cdHJldHVybiBjb21waWxlQmluZGluZyhvVGFyZ2V0QmluZGluZyk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VmFsdWVCaW5kaW5nID0gZnVuY3Rpb24oXG5cdG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGZpZWxkRm9ybWF0T3B0aW9uczogRmllbGRGb3JtYXRPcHRpb25zLFxuXHRpZ25vcmVVbml0OiBib29sZWFuID0gZmFsc2UsXG5cdGlnbm9yZUZvcm1hdHRpbmc6IGJvb2xlYW4gPSBmYWxzZSxcblx0YmluZGluZ1BhcmFtZXRlcnM/OiBvYmplY3QsXG5cdHRhcmdldFR5cGVBbnk/OiBib29sZWFuXG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0aWYgKGlzUGF0aEV4cHJlc3Npb24ob1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QpICYmIG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0LiR0YXJnZXQpIHtcblx0XHRjb25zdCBvTmF2UGF0aCA9IG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0RW50aXR5VHlwZS5yZXNvbHZlUGF0aChvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC5wYXRoLCB0cnVlKTtcblx0XHRvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdCA9IG9OYXZQYXRoLnRhcmdldDtcblx0XHRvTmF2UGF0aC52aXNpdGVkT2JqZWN0cy5mb3JFYWNoKChvTmF2T2JqOiBhbnkpID0+IHtcblx0XHRcdGlmIChvTmF2T2JqICYmIG9OYXZPYmouX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIpIHtcblx0XHRcdFx0b1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5wdXNoKG9OYXZPYmopO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0Y29uc3QgdGFyZ2V0T2JqZWN0ID0gb1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3Q7XG5cdGlmIChpc1Byb3BlcnR5KHRhcmdldE9iamVjdCkpIHtcblx0XHRsZXQgb0JpbmRpbmdFeHByZXNzaW9uOiBCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb248c3RyaW5nPiA9IGJpbmRpbmdFeHByZXNzaW9uKFxuXHRcdFx0Z2V0Q29udGV4dFJlbGF0aXZlVGFyZ2V0T2JqZWN0UGF0aChvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoKVxuXHRcdCkgYXMgQmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPHN0cmluZz47XG5cdFx0aWYgKHRhcmdldE9iamVjdC5hbm5vdGF0aW9ucz8uQ29tbXVuaWNhdGlvbj8uSXNFbWFpbEFkZHJlc3MpIHtcblx0XHRcdG9CaW5kaW5nRXhwcmVzc2lvbi50eXBlID0gXCJzYXAuZmUuY29yZS50eXBlLkVtYWlsXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IG9Qcm9wZXJ0eVVuaXQgPSBnZXRBc3NvY2lhdGVkVW5pdFByb3BlcnR5KG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0KTtcblx0XHRcdGNvbnN0IG9Qcm9wZXJ0eUN1cnJlbmN5ID0gZ2V0QXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHkob1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QpO1xuXHRcdFx0aWYgKCFpZ25vcmVVbml0ICYmIChvUHJvcGVydHlVbml0IHx8IG9Qcm9wZXJ0eUN1cnJlbmN5KSkge1xuXHRcdFx0XHRvQmluZGluZ0V4cHJlc3Npb24gPSBnZXRCaW5kaW5nV2l0aFVuaXRPckN1cnJlbmN5KG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgsIG9CaW5kaW5nRXhwcmVzc2lvbikgYXMgYW55O1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0KG9Qcm9wZXJ0eVVuaXQgJiYgIWhhc1ZhbHVlSGVscChvUHJvcGVydHlVbml0KSkgfHxcblx0XHRcdFx0XHQob1Byb3BlcnR5Q3VycmVuY3kgJiYgIWhhc1ZhbHVlSGVscChvUHJvcGVydHlDdXJyZW5jeSkpIHx8XG5cdFx0XHRcdFx0ZmllbGRGb3JtYXRPcHRpb25zPy5tZWFzdXJlRGlzcGxheU1vZGUgPT09IFwiSGlkZGVuXCJcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Ly8gSWYgdGhlcmUgaXMgYSB1bml0IG9yIGN1cnJlbmN5IHdpdGhvdXQgYSB2YWx1ZSBoZWxwLCBvciBpbiBjYXNlIHRoZSBjdXJyZW5jeSBzaG91bGQgYmUgZXhwbGljaXRseSBoaWRkZW4sXG5cdFx0XHRcdFx0Ly8gd2UgbmVlZCB0byBjb25maWd1cmUgdGhlIGJpbmRpbmcgdG8gbm90IHNob3cgdGhlIG1lYXN1cmUsIG90aGVyd2lzZSBpdCdzIG5lZWRlZCBmb3IgdGhlIG1kYyBmaWVsZFxuXHRcdFx0XHRcdGlmICghb0JpbmRpbmdFeHByZXNzaW9uLmZvcm1hdE9wdGlvbnMpIHtcblx0XHRcdFx0XHRcdG9CaW5kaW5nRXhwcmVzc2lvbi5mb3JtYXRPcHRpb25zID0ge307XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG9CaW5kaW5nRXhwcmVzc2lvbi5mb3JtYXRPcHRpb25zLnNob3dNZWFzdXJlID0gZmFsc2U7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG9CaW5kaW5nRXhwcmVzc2lvbiA9IGZvcm1hdFdpdGhUeXBlSW5mb3JtYXRpb24odGFyZ2V0T2JqZWN0LCBvQmluZGluZ0V4cHJlc3Npb24pIGFzIEJpbmRpbmdFeHByZXNzaW9uRXhwcmVzc2lvbjxzdHJpbmc+O1xuXHRcdFx0XHRpZiAob0JpbmRpbmdFeHByZXNzaW9uLnR5cGUgPT09IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuU3RyaW5nXCIpIHtcblx0XHRcdFx0XHRvQmluZGluZ0V4cHJlc3Npb24uZm9ybWF0T3B0aW9ucyA9IHtcblx0XHRcdFx0XHRcdHBhcnNlS2VlcHNFbXB0eVN0cmluZzogdHJ1ZVxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGlnbm9yZUZvcm1hdHRpbmcpIHtcblx0XHRcdGRlbGV0ZSBvQmluZGluZ0V4cHJlc3Npb24uZm9ybWF0T3B0aW9ucztcblx0XHRcdGRlbGV0ZSBvQmluZGluZ0V4cHJlc3Npb24uY29uc3RyYWludHM7XG5cdFx0XHRkZWxldGUgb0JpbmRpbmdFeHByZXNzaW9uLnR5cGU7XG5cdFx0fVxuXHRcdGlmIChiaW5kaW5nUGFyYW1ldGVycykge1xuXHRcdFx0b0JpbmRpbmdFeHByZXNzaW9uLnBhcmFtZXRlcnMgPSBiaW5kaW5nUGFyYW1ldGVycztcblx0XHR9XG5cdFx0aWYgKHRhcmdldFR5cGVBbnkpIHtcblx0XHRcdG9CaW5kaW5nRXhwcmVzc2lvbi50YXJnZXRUeXBlID0gXCJhbnlcIjtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKG9CaW5kaW5nRXhwcmVzc2lvbik7XG5cdH0gZWxzZSB7XG5cdFx0aWYgKHRhcmdldE9iamVjdCAmJiB0YXJnZXRPYmplY3QuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZFdpdGhVcmwpIHtcblx0XHRcdHJldHVybiBjb21waWxlQmluZGluZyhhbm5vdGF0aW9uRXhwcmVzc2lvbigodGFyZ2V0T2JqZWN0IGFzIERhdGFGaWVsZFdpdGhVcmwpLlZhbHVlKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIlwiO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IGdldFVuaXRCaW5kaW5nID0gZnVuY3Rpb24oXG5cdG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGZpZWxkRm9ybWF0T3B0aW9uczogRmllbGRGb3JtYXRPcHRpb25zXG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0Y29uc3Qgc1VuaXRQcm9wZXJ0eVBhdGggPSBnZXRBc3NvY2lhdGVkVW5pdFByb3BlcnR5UGF0aChvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdCk7XG5cdGNvbnN0IHNDdXJyZW5jeVByb3BlcnR5UGF0aCA9IGdldEFzc29jaWF0ZWRDdXJyZW5jeVByb3BlcnR5UGF0aChvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdCk7XG5cdGlmIChzVW5pdFByb3BlcnR5UGF0aCB8fCBzQ3VycmVuY3lQcm9wZXJ0eVBhdGgpIHtcblx0XHRjb25zdCB0YXJnZXRQcm9wZXJ0eVBhdGggPSBzVW5pdFByb3BlcnR5UGF0aCB8fCBzQ3VycmVuY3lQcm9wZXJ0eVBhdGg7XG5cdFx0Y29uc3Qgb1VPTVByb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aCA9IGVuaGFuY2VEYXRhTW9kZWxQYXRoKG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgsIHRhcmdldFByb3BlcnR5UGF0aCk7XG5cdFx0cmV0dXJuIGdldFZhbHVlQmluZGluZyhvVU9NUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLCBmaWVsZEZvcm1hdE9wdGlvbnMpO1xuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QXNzb2NpYXRlZFRleHRCaW5kaW5nID0gZnVuY3Rpb24oXG5cdG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGZpZWxkRm9ybWF0T3B0aW9uczogRmllbGRGb3JtYXRPcHRpb25zXG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0Y29uc3QgdGV4dFByb3BlcnR5UGF0aCA9IGdldEFzc29jaWF0ZWRUZXh0UHJvcGVydHlQYXRoKG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0KTtcblx0aWYgKHRleHRQcm9wZXJ0eVBhdGgpIHtcblx0XHRjb25zdCBvVGV4dFByb3BlcnR5UGF0aCA9IGVuaGFuY2VEYXRhTW9kZWxQYXRoKG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgsIHRleHRQcm9wZXJ0eVBhdGgpO1xuXHRcdGNvbnN0IG9WYWx1ZUJpbmRpbmcgPSBnZXRWYWx1ZUJpbmRpbmcob1RleHRQcm9wZXJ0eVBhdGgsIGZpZWxkRm9ybWF0T3B0aW9ucywgdHJ1ZSwgdHJ1ZSwgeyAkJG5vUGF0Y2g6IHRydWUgfSk7XG5cdFx0cmV0dXJuIG9WYWx1ZUJpbmRpbmc7XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXREaXNwbGF5U3R5bGUgPSBmdW5jdGlvbihcblx0b1Byb3BlcnR5UGF0aDogUHJvcGVydHlPclBhdGg8UHJvcGVydHk+LFxuXHRvRGF0YUZpZWxkOiBhbnksXG5cdG9EYXRhTW9kZWxQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoLFxuXHRmaWVsZEZvcm1hdE9wdGlvbnM6IEZpZWxkRm9ybWF0T3B0aW9ucyxcblx0c2VtYW50aWNPYmplY3Q6IHN0cmluZ1xuKTogRGlzcGxheVN0eWxlIHtcblx0Ly8gYWxnb3JpdGhtIHRvIGRldGVybWluZSB0aGUgZmllbGQgZnJhZ21lbnQgdG8gdXNlXG5cdGNvbnN0IG9Qcm9wZXJ0eTogUHJvcGVydHkgPSAoaXNQYXRoRXhwcmVzc2lvbihvUHJvcGVydHlQYXRoKSAmJiBvUHJvcGVydHlQYXRoLiR0YXJnZXQpIHx8IChvUHJvcGVydHlQYXRoIGFzIFByb3BlcnR5KTtcblx0aWYgKFxuXHRcdHNlbWFudGljT2JqZWN0ICYmXG5cdFx0IW9Qcm9wZXJ0eS5hbm5vdGF0aW9ucz8uVUk/LklzSW1hZ2VVUkwgJiZcblx0XHQhKG9Qcm9wZXJ0eS50eXBlID09PSBcIkVkbS5TdHJlYW1cIikgJiZcblx0XHQhKG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucz8uQ29tbXVuaWNhdGlvbj8uSXNFbWFpbEFkZHJlc3MgfHwgb1Byb3BlcnR5LmFubm90YXRpb25zPy5Db21tdW5pY2F0aW9uPy5Jc1Bob25lTnVtYmVyKVxuXHQpIHtcblx0XHRyZXR1cm4gXCJMaW5rV2l0aFF1aWNrVmlld0Zvcm1cIjtcblx0fVxuXHRpZiAoIW9Qcm9wZXJ0eVBhdGggfHwgdHlwZW9mIG9Qcm9wZXJ0eVBhdGggPT09IFwic3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gXCJUZXh0XCI7XG5cdH1cblx0aWYgKG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucz8uVUk/LklzSW1hZ2VVUkwpIHtcblx0XHRyZXR1cm4gXCJBdmF0YXJcIjtcblx0fVxuXHRpZiAob1Byb3BlcnR5LnR5cGUgPT09IFwiRWRtLlN0cmVhbVwiKSB7XG5cdFx0cmV0dXJuIFwiQXZhdGFyXCI7XG5cdH1cblx0c3dpdGNoIChvRGF0YUZpZWxkLiRUeXBlKSB7XG5cdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFQb2ludFR5cGVcIjpcblx0XHRcdHJldHVybiBcIkRhdGFQb2ludFwiO1xuXHRcdGNhc2UgXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRGb3JBbm5vdGF0aW9uXCI6XG5cdFx0XHRpZiAob0RhdGFGaWVsZC5UYXJnZXQ/LiR0YXJnZXQ/LiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFQb2ludFR5cGVcIikge1xuXHRcdFx0XHRyZXR1cm4gXCJEYXRhUG9pbnRcIjtcblx0XHRcdH0gZWxzZSBpZiAob0RhdGFGaWVsZC5UYXJnZXQ/LiR0YXJnZXQ/LiRUeXBlID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW11bmljYXRpb24udjEuQ29udGFjdFR5cGVcIikge1xuXHRcdFx0XHRyZXR1cm4gXCJDb250YWN0XCI7XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkRm9yQWN0aW9uXCI6XG5cdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvblwiOlxuXHRcdFx0cmV0dXJuIFwiQnV0dG9uXCI7XG5cdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZFdpdGhOYXZpZ2F0aW9uUGF0aFwiOlxuXHRcdFx0cmV0dXJuIFwiTGlua1wiO1xuXHR9XG5cdGlmIChvRGF0YU1vZGVsUGF0aD8udGFyZ2V0RW50aXR5VHlwZT8uYW5ub3RhdGlvbnM/LkNvbW1vbj8uU2VtYW50aWNLZXkpIHtcblx0XHRjb25zdCBhU2VtYW50aWNLZXlzID0gb0RhdGFNb2RlbFBhdGgudGFyZ2V0RW50aXR5VHlwZS5hbm5vdGF0aW9ucy5Db21tb24uU2VtYW50aWNLZXk7XG5cdFx0Y29uc3QgYklzU2VtYW50aWNLZXkgPSAhYVNlbWFudGljS2V5cy5ldmVyeShmdW5jdGlvbihvS2V5KSB7XG5cdFx0XHRyZXR1cm4gb0tleT8uJHRhcmdldD8ubmFtZSAhPT0gb1Byb3BlcnR5Lm5hbWU7XG5cdFx0XHQvLyBuZWVkIHRvIGNoZWNrIGlmIGl0IHdvcmtzIGFsc28gZm9yIGRpcmVjdCBwcm9wZXJ0aWVzXG5cdFx0fSk7XG5cdFx0aWYgKGJJc1NlbWFudGljS2V5ICYmIGZpZWxkRm9ybWF0T3B0aW9ucy5zZW1hbnRpY0tleVN0eWxlKSB7XG5cdFx0XHRpZiAob0RhdGFNb2RlbFBhdGgudGFyZ2V0RW50aXR5U2V0Py5hbm5vdGF0aW9ucz8uQ29tbW9uPy5EcmFmdFJvb3QpIHtcblx0XHRcdFx0Ly8gd2UgdGhlbiBzdGlsbCBjaGVjayB3aGV0aGVyIHRoaXMgaXMgYXZhaWxhYmxlIGF0IGRlc2lnbnRpbWUgb24gdGhlIGVudGl0eXNldFxuXHRcdFx0XHRyZXR1cm4gXCJTZW1hbnRpY0tleVdpdGhEcmFmdEluZGljYXRvclwiO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGZpZWxkRm9ybWF0T3B0aW9ucy5zZW1hbnRpY0tleVN0eWxlID09PSBcIk9iamVjdElkZW50aWZpZXJcIiA/IFwiT2JqZWN0SWRlbnRpZmllclwiIDogXCJMYWJlbFNlbWFudGljS2V5XCI7XG5cdFx0fVxuXHR9XG5cdGlmIChvRGF0YUZpZWxkLkNyaXRpY2FsaXR5KSB7XG5cdFx0cmV0dXJuIFwiT2JqZWN0U3RhdHVzXCI7XG5cdH1cblx0aWYgKG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucz8uTWVhc3VyZXM/LklTT0N1cnJlbmN5KSB7XG5cdFx0aWYgKGZpZWxkRm9ybWF0T3B0aW9ucy5tZWFzdXJlRGlzcGxheU1vZGUgPT09IFwiSGlkZGVuXCIpIHtcblx0XHRcdHJldHVybiBcIlRleHRcIjtcblx0XHR9XG5cdFx0cmV0dXJuIFwiQW1vdW50V2l0aEN1cnJlbmN5XCI7XG5cdH1cblx0aWYgKG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucz8uQ29tbXVuaWNhdGlvbj8uSXNFbWFpbEFkZHJlc3MgfHwgb1Byb3BlcnR5LmFubm90YXRpb25zPy5Db21tdW5pY2F0aW9uPy5Jc1Bob25lTnVtYmVyKSB7XG5cdFx0cmV0dXJuIFwiTGlua1wiO1xuXHR9XG5cdGlmIChvUHJvcGVydHkuYW5ub3RhdGlvbnM/LlVJPy5NdWx0aUxpbmVUZXh0KSB7XG5cdFx0cmV0dXJuIFwiVGV4dFwiO1xuXHR9XG5cdGNvbnN0IGFOYXZpZ2F0aW9uUHJvcGVydGllcyA9IG9EYXRhTW9kZWxQYXRoPy50YXJnZXRFbnRpdHlUeXBlPy5uYXZpZ2F0aW9uUHJvcGVydGllcyB8fCBbXTtcblx0bGV0IGJJc1VzZWRJbk5hdmlnYXRpb25XaXRoUXVpY2tWaWV3RmFjZXRzID0gZmFsc2U7XG5cdGFOYXZpZ2F0aW9uUHJvcGVydGllcy5mb3JFYWNoKG9OYXZQcm9wID0+IHtcblx0XHRpZiAob05hdlByb3AucmVmZXJlbnRpYWxDb25zdHJhaW50ICYmIG9OYXZQcm9wLnJlZmVyZW50aWFsQ29uc3RyYWludC5sZW5ndGgpIHtcblx0XHRcdG9OYXZQcm9wLnJlZmVyZW50aWFsQ29uc3RyYWludC5mb3JFYWNoKG9SZWZDb25zdHJhaW50ID0+IHtcblx0XHRcdFx0aWYgKG9SZWZDb25zdHJhaW50Py5zb3VyY2VQcm9wZXJ0eSA9PT0gb1Byb3BlcnR5Lm5hbWUpIHtcblx0XHRcdFx0XHRpZiAob05hdlByb3A/LnRhcmdldFR5cGU/LmFubm90YXRpb25zPy5VST8uUXVpY2tWaWV3RmFjZXRzKSB7XG5cdFx0XHRcdFx0XHRiSXNVc2VkSW5OYXZpZ2F0aW9uV2l0aFF1aWNrVmlld0ZhY2V0cyA9IHRydWU7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9XG5cdH0pO1xuXHRpZiAoYklzVXNlZEluTmF2aWdhdGlvbldpdGhRdWlja1ZpZXdGYWNldHMpIHtcblx0XHRyZXR1cm4gXCJMaW5rV2l0aFF1aWNrVmlld0Zvcm1cIjtcblx0fVxuXHRpZiAob1Byb3BlcnR5LmFubm90YXRpb25zPy5Db21tb24/LlNlbWFudGljT2JqZWN0KSB7XG5cdFx0cmV0dXJuIFwiTGlua1dyYXBwZXJcIjtcblx0fVxuXHRpZiAob0RhdGFGaWVsZC4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRXaXRoVXJsXCIpIHtcblx0XHRyZXR1cm4gXCJMaW5rXCI7XG5cdH1cblx0cmV0dXJuIFwiVGV4dFwiO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEVkaXRTdHlsZSA9IGZ1bmN0aW9uKFxuXHRvUHJvcGVydHlQYXRoOiBQcm9wZXJ0eU9yUGF0aDxQcm9wZXJ0eT4sXG5cdG9EYXRhRmllbGQ6IGFueSxcblx0b0ZpZWxkRm9ybWF0T3B0aW9uczogRmllbGRGb3JtYXRPcHRpb25zXG4pOiBFZGl0U3R5bGUgfCBudWxsIHtcblx0Ly8gYWxnb3JpdGhtIHRvIGRldGVybWluZSB0aGUgZmllbGQgZnJhZ21lbnQgdG8gdXNlXG5cdGlmICghb1Byb3BlcnR5UGF0aCB8fCB0eXBlb2Ygb1Byb3BlcnR5UGF0aCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdHJldHVybiBudWxsO1xuXHR9XG5cdGNvbnN0IG9Qcm9wZXJ0eTogUHJvcGVydHkgPSAoaXNQYXRoRXhwcmVzc2lvbihvUHJvcGVydHlQYXRoKSAmJiBvUHJvcGVydHlQYXRoLiR0YXJnZXQpIHx8IChvUHJvcGVydHlQYXRoIGFzIFByb3BlcnR5KTtcblx0c3dpdGNoIChvRGF0YUZpZWxkLiRUeXBlKSB7XG5cdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckFubm90YXRpb25cIjpcblx0XHRcdGlmIChvRGF0YUZpZWxkLlRhcmdldD8uJHRhcmdldD8uJFR5cGUgPT09IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbXVuaWNhdGlvbi52MS5Db250YWN0VHlwZVwiKSB7XG5cdFx0XHRcdHJldHVybiBudWxsO1xuXHRcdFx0fSBlbHNlIGlmIChvRGF0YUZpZWxkLlRhcmdldD8uJHRhcmdldD8uVmlzdWFsaXphdGlvbiA9PT0gXCJVSS5WaXN1YWxpemF0aW9uVHlwZS9SYXRpbmdcIikge1xuXHRcdFx0XHRyZXR1cm4gXCJSYXRpbmdJbmRpY2F0b3JcIjtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhUG9pbnRUeXBlXCI6XG5cdFx0XHRpZiAob0RhdGFGaWVsZD8uVmlzdWFsaXphdGlvbiA9PT0gXCJVSS5WaXN1YWxpemF0aW9uVHlwZS9SYXRpbmdcIikge1xuXHRcdFx0XHRyZXR1cm4gXCJSYXRpbmdJbmRpY2F0b3JcIjtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckFjdGlvblwiOlxuXHRcdGNhc2UgXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRXaXRoTmF2aWdhdGlvblBhdGhcIjpcblx0XHRjYXNlIFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uXCI6XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXHRjb25zdCBvUHJvcGVydHlVbml0ID0gZ2V0QXNzb2NpYXRlZFVuaXRQcm9wZXJ0eShvUHJvcGVydHkpO1xuXHRjb25zdCBvUHJvcGVydHlDdXJyZW5jeSA9IGdldEFzc29jaWF0ZWRDdXJyZW5jeVByb3BlcnR5KG9Qcm9wZXJ0eSk7XG5cdGlmIChcblx0XHRQcm9wZXJ0eUhlbHBlci5oYXNWYWx1ZUhlbHAob1Byb3BlcnR5KSB8fFxuXHRcdChvUHJvcGVydHlVbml0ICYmIFByb3BlcnR5SGVscGVyLmhhc1ZhbHVlSGVscChvUHJvcGVydHlVbml0KSkgfHxcblx0XHQob1Byb3BlcnR5Q3VycmVuY3kgJiYgUHJvcGVydHlIZWxwZXIuaGFzVmFsdWVIZWxwKG9Qcm9wZXJ0eUN1cnJlbmN5KSlcblx0KSB7XG5cdFx0aWYgKG9GaWVsZEZvcm1hdE9wdGlvbnM/Lm1lYXN1cmVEaXNwbGF5TW9kZSA9PT0gXCJIaWRkZW5cIikge1xuXHRcdFx0cmV0dXJuIFwiSW5wdXRcIjtcblx0XHR9XG5cdFx0cmV0dXJuIFwiSW5wdXRXaXRoVmFsdWVIZWxwXCI7XG5cdH1cblx0aWYgKG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucz8uVUk/Lk11bHRpTGluZVRleHQ/LnZhbHVlT2YoKSAmJiBvUHJvcGVydHkudHlwZSA9PT0gXCJFZG0uU3RyaW5nXCIpIHtcblx0XHRyZXR1cm4gXCJUZXh0QXJlYVwiO1xuXHR9XG5cdHN3aXRjaCAob1Byb3BlcnR5LnR5cGUpIHtcblx0XHRjYXNlIFwiRWRtLkRhdGVcIjpcblx0XHRcdHJldHVybiBcIkRhdGVQaWNrZXJcIjtcblx0XHRjYXNlIFwiRWRtLlRpbWVcIjpcblx0XHRjYXNlIFwiRWRtLlRpbWVPZkRheVwiOlxuXHRcdFx0cmV0dXJuIFwiVGltZVBpY2tlclwiO1xuXHRcdGNhc2UgXCJFZG0uRGF0ZVRpbWVcIjpcblx0XHRjYXNlIFwiRWRtLkRhdGVUaW1lT2Zmc2V0XCI6XG5cdFx0XHRyZXR1cm4gXCJEYXRlVGltZVBpY2tlclwiO1xuXHRcdGNhc2UgXCJFZG0uQm9vbGVhblwiOlxuXHRcdFx0cmV0dXJuIFwiQ2hlY2tCb3hcIjtcblx0fVxuXHRpZiAob1Byb3BlcnR5LmFubm90YXRpb25zPy5NZWFzdXJlcz8uSVNPQ3VycmVuY3kgfHwgb1Byb3BlcnR5LmFubm90YXRpb25zPy5NZWFzdXJlcz8uVW5pdCkge1xuXHRcdHJldHVybiBcIklucHV0V2l0aFVuaXRcIjtcblx0fVxuXHRyZXR1cm4gXCJJbnB1dFwiO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBiaW5kaW5nIGV4cHJlc3Npb24gdG8gZXZhbHVhdGUgdGhlIHZpc2liaWxpdHkgb2YgYSBEYXRhRmllbGQgb3IgRGF0YVBvaW50IGFubm90YXRpb24uXG4gKlxuICogU0FQIEZpb3JpIGVsZW1lbnRzIHdpbGwgZXZhbHVhdGUgZWl0aGVyIHRoZSBVSS5IaWRkZW4gYW5ub3RhdGlvbiBkZWZpbmVkIG9uIHRoZSBhbm5vdGF0aW9uIGl0c2VsZiBvciBvbiB0aGUgdGFyZ2V0IHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7RGF0YU1vZGVsT2JqZWN0UGF0aH0gZGF0YUZpZWxkTW9kZWxQYXRoIFRoZSBtZXRhcGF0aCByZWZlcnJpbmcgdG8gdGhlIGFubm90YXRpb24gd2UgYXJlIGV2YWx1YXRpbmcuXG4gKiBAcGFyYW0ge0ZpZWxkRm9ybWF0T3B0aW9uc30gW2Zvcm1hdE9wdGlvbnNdIEZvcm1hdE9wdGlvbnMgb3B0aW9uYWwuXG4gKiBAcmV0dXJucyB7QmluZGluZ0V4cHJlc3Npb248c3RyaW5nPn0gQW4gZXhwcmVzc2lvbiB0aGF0IHlvdSBjYW4gYmluZCB0byB0aGUgVUkuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRWaXNpYmxlRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKFxuXHRkYXRhRmllbGRNb2RlbFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGZvcm1hdE9wdGlvbnM/OiBGaWVsZEZvcm1hdE9wdGlvbnNcbik6IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz4ge1xuXHRjb25zdCB0YXJnZXRPYmplY3Q6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMgfCBEYXRhUG9pbnRUeXBlVHlwZXMgPSBkYXRhRmllbGRNb2RlbFBhdGgudGFyZ2V0T2JqZWN0O1xuXHRsZXQgcHJvcGVydHlWYWx1ZTtcblx0aWYgKHRhcmdldE9iamVjdCkge1xuXHRcdHN3aXRjaCAodGFyZ2V0T2JqZWN0LiRUeXBlKSB7XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZDpcblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aFVybDpcblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aE5hdmlnYXRpb25QYXRoOlxuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoSW50ZW50QmFzZWROYXZpZ2F0aW9uOlxuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoQWN0aW9uOlxuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhUG9pbnRUeXBlOlxuXHRcdFx0XHRwcm9wZXJ0eVZhbHVlID0gdGFyZ2V0T2JqZWN0LlZhbHVlLiR0YXJnZXQ7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBbm5vdGF0aW9uOlxuXHRcdFx0XHQvLyBpZiBpdCBpcyBhIERhdGFGaWVsZEZvckFubm90YXRpb24gcG9pbnRpbmcgdG8gYSBEYXRhUG9pbnQgd2UgbG9vayBhdCB0aGUgZGF0YVBvaW50J3MgdmFsdWVcblx0XHRcdFx0aWYgKHRhcmdldE9iamVjdD8uVGFyZ2V0Py4kdGFyZ2V0Py4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YVBvaW50VHlwZSkge1xuXHRcdFx0XHRcdHByb3BlcnR5VmFsdWUgPSB0YXJnZXRPYmplY3QuVGFyZ2V0LiR0YXJnZXQ/LlZhbHVlLiR0YXJnZXQ7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1mYWxsdGhyb3VnaFxuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb246XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbjpcblx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdHByb3BlcnR5VmFsdWUgPSB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cdGNvbnN0IGlzQW5hbHl0aWNhbEdyb3VwSGVhZGVyRXhwYW5kZWQgPSBmb3JtYXRPcHRpb25zPy5pc0FuYWx5dGljcyA/IFVJLklzRXhwYW5kZWQgOiBjb25zdGFudChmYWxzZSk7XG5cdGNvbnN0IGlzQW5hbHl0aWNhbExlYWYgPSBmb3JtYXRPcHRpb25zPy5pc0FuYWx5dGljcyA/IGVxdWFsKFVJLk5vZGVMZXZlbCwgMCkgOiBjb25zdGFudChmYWxzZSk7XG5cblx0Ly8gQSBkYXRhIGZpZWxkIGlzIHZpc2libGUgaWY6XG5cdC8vIC0gdGhlIFVJLkhpZGRlbiBleHByZXNzaW9uIGluIHRoZSBvcmlnaW5hbCBhbm5vdGF0aW9uIGRvZXMgbm90IGV2YWx1YXRlIHRvICd0cnVlJ1xuXHQvLyAtIHRoZSBVSS5IaWRkZW4gZXhwcmVzc2lvbiBpbiB0aGUgdGFyZ2V0IHByb3BlcnR5IGRvZXMgbm90IGV2YWx1YXRlIHRvICd0cnVlJ1xuXHQvLyAtIGluIGNhc2Ugb2YgQW5hbHl0aWNzIGl0J3Mgbm90IHZpc2libGUgZm9yIGFuIGV4cGFuZGVkIEdyb3VwSGVhZGVyXG5cdHJldHVybiBjb21waWxlQmluZGluZyhcblx0XHRhbmQoXG5cdFx0XHQuLi5bXG5cdFx0XHRcdG5vdChlcXVhbChhbm5vdGF0aW9uRXhwcmVzc2lvbih0YXJnZXRPYmplY3Q/LmFubm90YXRpb25zPy5VST8uSGlkZGVuKSwgdHJ1ZSkpLFxuXHRcdFx0XHRpZkVsc2UoXG5cdFx0XHRcdFx0ISFwcm9wZXJ0eVZhbHVlLFxuXHRcdFx0XHRcdHByb3BlcnR5VmFsdWUgJiYgbm90KGVxdWFsKGFubm90YXRpb25FeHByZXNzaW9uKHByb3BlcnR5VmFsdWUuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4pLCB0cnVlKSksXG5cdFx0XHRcdFx0dHJ1ZVxuXHRcdFx0XHQpLFxuXHRcdFx0XHRvcihub3QoaXNBbmFseXRpY2FsR3JvdXBIZWFkZXJFeHBhbmRlZCksIGlzQW5hbHl0aWNhbExlYWYpXG5cdFx0XHRdXG5cdFx0KVxuXHQpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldElucHV0RGVzY3JpcHRpb24gPSBmdW5jdGlvbihcblx0b1Byb3BlcnR5UGF0aDogUHJvcGVydHlPclBhdGg8UHJvcGVydHk+LFxuXHRvRGF0YU1vZGVsT2JqZWN0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0ZmllbGRGb3JtYXRPcHRpb25zOiBGaWVsZEZvcm1hdE9wdGlvbnNcbik6IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz4ge1xuXHRjb25zdCBvUHJvcGVydHkgPSAoaXNQYXRoRXhwcmVzc2lvbihvUHJvcGVydHlQYXRoKSAmJiBvUHJvcGVydHlQYXRoLiR0YXJnZXQpIHx8IChvUHJvcGVydHlQYXRoIGFzIFByb3BlcnR5KTtcblx0Y29uc3QgdW5pdFByb3BlcnR5ID0gZ2V0QXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHkob1Byb3BlcnR5KSB8fCBnZXRBc3NvY2lhdGVkVW5pdFByb3BlcnR5KG9Qcm9wZXJ0eSk7XG5cdGlmICghdW5pdFByb3BlcnR5KSB7XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKFwiXCIpO1xuXHR9XG5cdGNvbnN0IG9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGggPSBlbmhhbmNlRGF0YU1vZGVsUGF0aChvRGF0YU1vZGVsT2JqZWN0UGF0aCwgb1Byb3BlcnR5UGF0aCk7XG5cdGNvbnN0IG9Ob25FZGl0YWJsZVZhbHVlID0gZ2V0VW5pdEJpbmRpbmcob1Byb3BlcnR5RGF0YU1vZGVsT2JqZWN0UGF0aCwgZmllbGRGb3JtYXRPcHRpb25zKTtcblx0Y29uc3QgZWRpdGFibGVFeHByZXNzaW9uID0gYW5kKG5vdChpc1JlYWRPbmx5RXhwcmVzc2lvbih1bml0UHJvcGVydHkpKSwgbm90KFByb3BlcnR5SGVscGVyLmlzQ29tcHV0ZWQodW5pdFByb3BlcnR5KSkpO1xuXHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoaWZFbHNlKGVkaXRhYmxlRXhwcmVzc2lvbiwgXCJcIiwgb05vbkVkaXRhYmxlVmFsdWUpKTtcbn07XG4iXX0=