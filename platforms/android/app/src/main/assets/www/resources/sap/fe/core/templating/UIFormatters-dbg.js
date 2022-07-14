/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/MetaModelConverter", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/BindingHelper", "sap/fe/core/templating/PropertyHelper", "sap/fe/core/templating/DataModelPathHelper", "sap/fe/core/templating/FieldControlHelper", "sap/fe/core/formatters/ValueFormatter"], function (MetaModelConverter, BindingExpression, BindingHelper, PropertyHelper, DataModelPathHelper, FieldControlHelper, valueFormatters) {
  "use strict";

  var _exports = {};
  var isDisabledExpression = FieldControlHelper.isDisabledExpression;
  var isNonEditableExpression = FieldControlHelper.isNonEditableExpression;
  var isReadOnlyExpression = FieldControlHelper.isReadOnlyExpression;
  var getPathRelativeLocation = DataModelPathHelper.getPathRelativeLocation;
  var isPathUpdatable = DataModelPathHelper.isPathUpdatable;
  var getTargetEntitySetPath = DataModelPathHelper.getTargetEntitySetPath;
  var isPathExpression = PropertyHelper.isPathExpression;
  var isKey = PropertyHelper.isKey;
  var isImmutable = PropertyHelper.isImmutable;
  var isComputed = PropertyHelper.isComputed;
  var hasValueHelp = PropertyHelper.hasValueHelp;
  var getAssociatedCurrencyProperty = PropertyHelper.getAssociatedCurrencyProperty;
  var getAssociatedUnitProperty = PropertyHelper.getAssociatedUnitProperty;
  var UI = BindingHelper.UI;
  var or = BindingExpression.or;
  var not = BindingExpression.not;
  var isTruthy = BindingExpression.isTruthy;
  var isConstant = BindingExpression.isConstant;
  var ifElse = BindingExpression.ifElse;
  var formatResult = BindingExpression.formatResult;
  var equal = BindingExpression.equal;
  var constant = BindingExpression.constant;
  var compileBinding = BindingExpression.compileBinding;
  var annotationExpression = BindingExpression.annotationExpression;
  var and = BindingExpression.and;
  var addTypeInformation = BindingExpression.addTypeInformation;
  var getInvolvedDataModelObjects = MetaModelConverter.getInvolvedDataModelObjects;
  var convertMetaModelContext = MetaModelConverter.convertMetaModelContext;

  var EDM_TYPE_MAPPING = {
    "Edm.Boolean": {
      type: "sap.ui.model.odata.type.Boolean"
    },
    "Edm.Byte": {
      type: "sap.ui.model.odata.type.Byte"
    },
    "Edm.Date": {
      type: "sap.ui.model.odata.type.Date"
    },
    "Edm.DateTimeOffset": {
      constraints: {
        "$Precision": "precision"
      },
      type: "sap.ui.model.odata.type.DateTimeOffset"
    },
    "Edm.Decimal": {
      constraints: {
        "@Org.OData.Validation.V1.Minimum/$Decimal": "minimum",
        "@Org.OData.Validation.V1.Minimum@Org.OData.Validation.V1.Exclusive": "minimumExclusive",
        "@Org.OData.Validation.V1.Maximum/$Decimal": "maximum",
        "@Org.OData.Validation.V1.Maximum@Org.OData.Validation.V1.Exclusive": "maximumExclusive",
        "$Precision": "precision",
        "$Scale": "scale"
      },
      type: "sap.ui.model.odata.type.Decimal"
    },
    "Edm.Double": {
      type: "sap.ui.model.odata.type.Double"
    },
    "Edm.Guid": {
      type: "sap.ui.model.odata.type.Guid"
    },
    "Edm.Int16": {
      type: "sap.ui.model.odata.type.Int16"
    },
    "Edm.Int32": {
      type: "sap.ui.model.odata.type.Int32"
    },
    "Edm.Int64": {
      type: "sap.ui.model.odata.type.Int64"
    },
    "Edm.SByte": {
      type: "sap.ui.model.odata.type.SByte"
    },
    "Edm.Single": {
      type: "sap.ui.model.odata.type.Single"
    },
    "Edm.Stream": {
      type: "sap.ui.model.odata.type.Stream"
    },
    "Edm.String": {
      constraints: {
        "@com.sap.vocabularies.Common.v1.IsDigitSequence": "isDigitSequence",
        "$MaxLength": "maxLength",
        "$Nullable": "nullable"
      },
      type: "sap.ui.model.odata.type.String"
    },
    "Edm.TimeOfDay": {
      constraints: {
        "$Precision": "precision"
      },
      type: "sap.ui.model.odata.type.TimeOfDay"
    }
  };
  /**
   * Create the expression to generate an "editable" boolean value.
   *
   * @param {PropertyPath} oPropertyPath The input property
   * @param {object} oDataFieldConverted The DataFieldConverted object to read the fieldControl annotation
   * @param {DataModelObjectPath} oDataModelObjectPath The path to this property object
   * @param {boolean} bAsObject Whether or not this should be returned as an object or a binding string
   * @returns {string} The binding expression used to determine if a property is editable or not
   */

  _exports.EDM_TYPE_MAPPING = EDM_TYPE_MAPPING;

  var getEditableExpression = function (oPropertyPath) {
    var oDataFieldConverted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var oDataModelObjectPath = arguments.length > 2 ? arguments[2] : undefined;
    var bAsObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    if (!oPropertyPath || typeof oPropertyPath === "string") {
      return compileBinding(false);
    }

    var dataFieldEditableExpression = true;

    if (oDataFieldConverted !== null) {
      dataFieldEditableExpression = ifElse(isNonEditableExpression(oDataFieldConverted), false, UI.IsEditable);
    }

    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath; // Editability depends on the field control expression
    // If the Field control is statically in ReadOnly or Inapplicable (disabled) -> not editable
    // If the property is a key -> not editable except in creation if not computed
    // If the property is computed -> not editable
    // If the property is not updatable -> not editable
    // If the property is immutable -> not editable except in creation
    // If the Field control is a path resolving to ReadOnly or Inapplicable (disabled) (<= 1) -> not editable
    // Else, to be editable you need
    // immutable and key while in the creation row
    // ui/isEditable

    var isPathUpdatableExpression = isPathUpdatable(oDataModelObjectPath, oPropertyPath);
    var editableExpression = ifElse(or(not(isPathUpdatableExpression), isComputed(oProperty), isKey(oProperty), isImmutable(oProperty), isNonEditableExpression(oProperty)), ifElse(or(isComputed(oProperty), isNonEditableExpression(oProperty)), false, UI.IsTransientBinding), UI.IsEditable);

    if (bAsObject) {
      return and(editableExpression, dataFieldEditableExpression);
    }

    return compileBinding(and(editableExpression, dataFieldEditableExpression));
  };
  /**
   * Create the expression to generate an "enabled" boolean value.
   *
   * @param {PropertyPath} oPropertyPath The input property
   * @param {any} oDataFieldConverted The DataFieldConverted Object to read the fieldControl annotation
   * @param {boolean} bAsObject Whether or not this should be returned as an object or a binding string
   * @returns {string} The binding expression to determine if a property is enabled or not
   */


  _exports.getEditableExpression = getEditableExpression;

  var getEnabledExpression = function (oPropertyPath, oDataFieldConverted) {
    var bAsObject = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    if (!oPropertyPath || typeof oPropertyPath === "string") {
      return compileBinding(true);
    }

    var dataFieldEnabledExpression = true;

    if (oDataFieldConverted !== null) {
      dataFieldEnabledExpression = ifElse(isDisabledExpression(oDataFieldConverted), false, true);
    }

    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath; // Enablement depends on the field control expression
    // If the Field control is statically in Inapplicable (disabled) -> not enabled

    var enabledExpression = ifElse(isDisabledExpression(oProperty), false, true);

    if (bAsObject) {
      return and(enabledExpression, dataFieldEnabledExpression);
    }

    return compileBinding(and(enabledExpression, dataFieldEnabledExpression));
  };
  /**
   * Create the expression to generate an "editMode" enum value.
   * @param {PropertyPath} oPropertyPath The input property
   * @param {DataModelObjectPath} oDataModelObjectPath The list of data model objects that are involved to reach that property
   * @param {boolean} bMeasureReadOnly Whether we should set UoM / currency field mode to read only
   * @param {boolean} bAsObject Whether we should return this as an expression or as a string
   * @param {object} oDataFieldConverted The dataField object
   * @returns {BindingExpression<string> | ExpressionOrPrimitive<string>} The binding expression representing the current property edit mode, compliant with the MDC Field definition of editMode.
   */


  _exports.getEnabledExpression = getEnabledExpression;

  var getEditMode = function (oPropertyPath, oDataModelObjectPath) {
    var bMeasureReadOnly = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var bAsObject = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var oDataFieldConverted = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;

    if (!oPropertyPath || typeof oPropertyPath === "string") {
      return "Display";
    }

    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath; // if the property is not enabled => Disabled
    // if the property is enabled && not editable => ReadOnly
    // if the property is enabled && editable => Editable
    // If there is an associated unit, and it has a field control also use consider the following
    // if the unit field control is readonly -> EditableReadOnly
    // otherwise -> Editable

    var editableExpression = getEditableExpression(oPropertyPath, oDataFieldConverted, oDataModelObjectPath, true);
    var enabledExpression = getEnabledExpression(oPropertyPath, oDataFieldConverted, true);
    var associatedCurrencyProperty = getAssociatedCurrencyProperty(oProperty);
    var unitProperty = associatedCurrencyProperty || getAssociatedUnitProperty(oProperty);
    var resultExpression = "Editable";

    if (unitProperty) {
      resultExpression = ifElse(or(isReadOnlyExpression(unitProperty), isComputed(unitProperty), bMeasureReadOnly), "EditableReadOnly", "Editable");
    }

    var readOnlyExpression = or(isReadOnlyExpression(oProperty), isReadOnlyExpression(oDataFieldConverted)); // if the property is from a non-updatable entity => Read only mode, previously calculated edit Mode is ignored
    // if the property is from an updatable entity => previously calculated edit Mode expression

    var editModeExpression = ifElse(enabledExpression, ifElse(editableExpression, resultExpression, ifElse(and(!isConstant(readOnlyExpression) && readOnlyExpression, UI.IsEditable), "ReadOnly", "Display")), ifElse(UI.IsEditable, "Disabled", "Display"));

    if (bAsObject) {
      return editModeExpression;
    }

    return compileBinding(editModeExpression);
  };

  _exports.getEditMode = getEditMode;

  var hasValidAnalyticalCurrencyOrUnit = function (oPropertyDataModelObjectPath) {
    var _oPropertyDefinition$, _oPropertyDefinition$2, _oPropertyDefinition$3, _oPropertyDefinition$4;

    var oPropertyDefinition = oPropertyDataModelObjectPath.targetObject;
    var currency = (_oPropertyDefinition$ = oPropertyDefinition.annotations) === null || _oPropertyDefinition$ === void 0 ? void 0 : (_oPropertyDefinition$2 = _oPropertyDefinition$.Measures) === null || _oPropertyDefinition$2 === void 0 ? void 0 : _oPropertyDefinition$2.ISOCurrency;
    var measure = currency ? currency : (_oPropertyDefinition$3 = oPropertyDefinition.annotations) === null || _oPropertyDefinition$3 === void 0 ? void 0 : (_oPropertyDefinition$4 = _oPropertyDefinition$3.Measures) === null || _oPropertyDefinition$4 === void 0 ? void 0 : _oPropertyDefinition$4.Unit;

    if (measure) {
      return compileBinding(or(isTruthy(annotationExpression(measure)), not(UI.IsTotal)));
    } else {
      return compileBinding(constant(true));
    }
  };

  _exports.hasValidAnalyticalCurrencyOrUnit = hasValidAnalyticalCurrencyOrUnit;

  var ifUnitEditable = function (oPropertyPath, sEditableValue, sNonEditableValue) {
    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath;
    var unitProperty = getAssociatedCurrencyProperty(oProperty) || getAssociatedUnitProperty(oProperty);

    if (!unitProperty) {
      return compileBinding(sNonEditableValue);
    }

    var editableExpression = and(not(isReadOnlyExpression(unitProperty)), not(isComputed(unitProperty)));
    return compileBinding(ifElse(editableExpression, sEditableValue, sNonEditableValue));
  };

  _exports.ifUnitEditable = ifUnitEditable;

  var getDisplayMode = function (oPropertyPath, oDataModelObjectPath) {
    var _oProperty$annotation, _oProperty$annotation2, _oTextAnnotation$anno, _oTextAnnotation$anno2, _oTextAnnotation$anno3, _oEntityType$annotati, _oEntityType$annotati2, _oEntityType$annotati3;

    if (!oPropertyPath || typeof oPropertyPath === "string") {
      return "Value";
    }

    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath;
    var oEntityType = oDataModelObjectPath && oDataModelObjectPath.targetEntityType;
    var oTextAnnotation = (_oProperty$annotation = oProperty.annotations) === null || _oProperty$annotation === void 0 ? void 0 : (_oProperty$annotation2 = _oProperty$annotation.Common) === null || _oProperty$annotation2 === void 0 ? void 0 : _oProperty$annotation2.Text;
    var oTextArrangementAnnotation = typeof oTextAnnotation !== "string" && (oTextAnnotation === null || oTextAnnotation === void 0 ? void 0 : (_oTextAnnotation$anno = oTextAnnotation.annotations) === null || _oTextAnnotation$anno === void 0 ? void 0 : (_oTextAnnotation$anno2 = _oTextAnnotation$anno.UI) === null || _oTextAnnotation$anno2 === void 0 ? void 0 : (_oTextAnnotation$anno3 = _oTextAnnotation$anno2.TextArrangement) === null || _oTextAnnotation$anno3 === void 0 ? void 0 : _oTextAnnotation$anno3.toString()) || (oEntityType === null || oEntityType === void 0 ? void 0 : (_oEntityType$annotati = oEntityType.annotations) === null || _oEntityType$annotati === void 0 ? void 0 : (_oEntityType$annotati2 = _oEntityType$annotati.UI) === null || _oEntityType$annotati2 === void 0 ? void 0 : (_oEntityType$annotati3 = _oEntityType$annotati2.TextArrangement) === null || _oEntityType$annotati3 === void 0 ? void 0 : _oEntityType$annotati3.toString());
    var sDisplayValue = oTextAnnotation ? "DescriptionValue" : "Value";

    if (oTextAnnotation && oTextArrangementAnnotation) {
      if (oTextArrangementAnnotation === "UI.TextArrangementType/TextOnly") {
        sDisplayValue = "Description";
      } else if (oTextArrangementAnnotation === "UI.TextArrangementType/TextLast") {
        sDisplayValue = "ValueDescription";
      } else if (oTextArrangementAnnotation === "UI.TextArrangementType/TextSeparate") {
        sDisplayValue = "Value";
      } else {
        //Default should be TextFirst if there is a Text annotation and neither TextOnly nor TextLast are set
        sDisplayValue = "DescriptionValue";
      }
    }

    return sDisplayValue;
  };

  _exports.getDisplayMode = getDisplayMode;

  var getFieldDisplay = function (oPropertyPath, sTargetDisplayMode, oComputedEditMode) {
    var oProperty = isPathExpression(oPropertyPath) && oPropertyPath.$target || oPropertyPath;
    return hasValueHelp(oProperty) ? compileBinding(sTargetDisplayMode) : compileBinding(ifElse(equal(oComputedEditMode, "Editable"), "Value", sTargetDisplayMode));
  };

  _exports.getFieldDisplay = getFieldDisplay;

  var formatWithTypeInformation = function (oProperty, propertyBindingExpression) {
    var outExpression = propertyBindingExpression;

    if (oProperty._type === "Property") {
      var oTargetMapping = EDM_TYPE_MAPPING[oProperty.type];

      if (oTargetMapping) {
        var _outExpression$type, _outExpression$type2;

        outExpression.type = oTargetMapping.type;

        if (oTargetMapping.constraints) {
          var _oProperty$annotation3, _oProperty$annotation4, _oProperty$annotation5, _oProperty$annotation6;

          outExpression.constraints = {};

          if (oTargetMapping.constraints.$Scale && oProperty.scale !== undefined) {
            outExpression.constraints.scale = oProperty.scale;
          }

          if (oTargetMapping.constraints.$Precision && oProperty.precision !== undefined) {
            outExpression.constraints.precision = oProperty.precision;
          }

          if (oTargetMapping.constraints.$MaxLength && oProperty.maxLength !== undefined) {
            outExpression.constraints.maxLength = oProperty.maxLength;
          }

          if (oTargetMapping.constraints.$Nullable && oProperty.nullable === false) {
            outExpression.constraints.nullable = oProperty.nullable;
          }

          if (oTargetMapping.constraints["@Org.OData.Validation.V1.Minimum/$Decimal"] && ((_oProperty$annotation3 = oProperty.annotations) === null || _oProperty$annotation3 === void 0 ? void 0 : (_oProperty$annotation4 = _oProperty$annotation3.Validation) === null || _oProperty$annotation4 === void 0 ? void 0 : _oProperty$annotation4.Minimum) !== undefined && !isNaN(oProperty.annotations.Validation.Minimum)) {
            outExpression.constraints.minimum = "".concat(oProperty.annotations.Validation.Minimum);
          }

          if (oTargetMapping.constraints["@Org.OData.Validation.V1.Maximum/$Decimal"] && ((_oProperty$annotation5 = oProperty.annotations) === null || _oProperty$annotation5 === void 0 ? void 0 : (_oProperty$annotation6 = _oProperty$annotation5.Validation) === null || _oProperty$annotation6 === void 0 ? void 0 : _oProperty$annotation6.Maximum) !== undefined && !isNaN(oProperty.annotations.Validation.Maximum)) {
            outExpression.constraints.maximum = "".concat(oProperty.annotations.Validation.Maximum);
          }
        }

        if ((outExpression === null || outExpression === void 0 ? void 0 : (_outExpression$type = outExpression.type) === null || _outExpression$type === void 0 ? void 0 : _outExpression$type.indexOf("sap.ui.model.odata.type.Int")) === 0) {
          if (!outExpression.formatOptions) {
            outExpression.formatOptions = {};
          }

          outExpression.formatOptions = Object.assign(outExpression.formatOptions, {
            parseAsString: false,
            emptyString: ""
          });
        }

        if (outExpression.type === "sap.ui.model.odata.type.String") {
          var _oTargetMapping$const, _oProperty$annotation7, _oProperty$annotation8;

          if (!outExpression.formatOptions) {
            outExpression.formatOptions = {};
          }

          outExpression.formatOptions.parseKeepsEmptyString = true;

          if (((_oTargetMapping$const = oTargetMapping.constraints) === null || _oTargetMapping$const === void 0 ? void 0 : _oTargetMapping$const["@com.sap.vocabularies.Common.v1.IsDigitSequence"]) && ((_oProperty$annotation7 = oProperty.annotations) === null || _oProperty$annotation7 === void 0 ? void 0 : (_oProperty$annotation8 = _oProperty$annotation7.Common) === null || _oProperty$annotation8 === void 0 ? void 0 : _oProperty$annotation8.IsDigitSequence)) {
            outExpression.constraints.isDigitSequence = true;
          }
        }

        if ((outExpression === null || outExpression === void 0 ? void 0 : (_outExpression$type2 = outExpression.type) === null || _outExpression$type2 === void 0 ? void 0 : _outExpression$type2.indexOf("sap.ui.model.odata.type.Double")) === 0) {
          if (!outExpression.formatOptions) {
            outExpression.formatOptions = {};
          }

          outExpression.formatOptions = Object.assign(outExpression.formatOptions, {
            parseAsString: false,
            emptyString: ""
          });
        }
      }
    }

    return outExpression;
  };

  _exports.formatWithTypeInformation = formatWithTypeInformation;

  var getBindingWithUnitOrCurrency = function (oPropertyDataModelPath, propertyBindingExpression) {
    var _oPropertyDefinition$5, _oPropertyDefinition$6, _unit, _oPropertyDefinition$7, _oPropertyDefinition$8;

    var oPropertyDefinition = oPropertyDataModelPath.targetObject;
    var unit = (_oPropertyDefinition$5 = oPropertyDefinition.annotations) === null || _oPropertyDefinition$5 === void 0 ? void 0 : (_oPropertyDefinition$6 = _oPropertyDefinition$5.Measures) === null || _oPropertyDefinition$6 === void 0 ? void 0 : _oPropertyDefinition$6.Unit;
    var relativeLocation = getPathRelativeLocation(oPropertyDataModelPath.contextLocation, oPropertyDataModelPath.navigationProperties).map(function (np) {
      return np.name;
    });
    propertyBindingExpression = formatWithTypeInformation(oPropertyDefinition, propertyBindingExpression);

    if (((_unit = unit) === null || _unit === void 0 ? void 0 : _unit.toString()) === "%") {
      return formatResult([propertyBindingExpression], valueFormatters.formatWithPercentage);
    }

    var complexType = unit ? "sap.ui.model.odata.type.Unit" : "sap.ui.model.odata.type.Currency";
    unit = unit ? unit : (_oPropertyDefinition$7 = oPropertyDefinition.annotations) === null || _oPropertyDefinition$7 === void 0 ? void 0 : (_oPropertyDefinition$8 = _oPropertyDefinition$7.Measures) === null || _oPropertyDefinition$8 === void 0 ? void 0 : _oPropertyDefinition$8.ISOCurrency;
    var unitBindingExpression = unit.$target ? formatWithTypeInformation(unit.$target, annotationExpression(unit, relativeLocation)) : annotationExpression(unit, relativeLocation);
    return addTypeInformation([propertyBindingExpression, unitBindingExpression], complexType);
  };

  _exports.getBindingWithUnitOrCurrency = getBindingWithUnitOrCurrency;

  var getAlignmentExpression = function (oComputedEditMode) {
    var sAlignDisplay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "Begin";
    var sAlignEdit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "Begin";
    return compileBinding(ifElse(equal(oComputedEditMode, "Display"), sAlignDisplay, sAlignEdit));
  };
  /**
   * Formatter helper to retrieve the converterContext from the metamodel context.
   *
   * @param {Context} oContext The original metamodel context
   * @param {ComputedAnnotationInterface} oInterface The current templating context
   * @returns {object} The ConverterContext representing that object
   */


  _exports.getAlignmentExpression = getAlignmentExpression;

  var getConverterContext = function (oContext, oInterface) {
    if (oInterface && oInterface.context) {
      return convertMetaModelContext(oInterface.context);
    }

    return null;
  };

  getConverterContext.requiresIContext = true;
  /**
   * Formatter helper to retrieve the data model objects that are involved from the metamodel context.
   *
   * @param {Context} oContext The original ODataMetaModel context
   * @param {ComputedAnnotationInterface} oInterface The current templating context
   * @returns {object[]} An array of entitysets and navproperties that are involved to get to a specific object in the metamodel
   */

  _exports.getConverterContext = getConverterContext;

  var getDataModelObjectPath = function (oContext, oInterface) {
    if (oInterface && oInterface.context) {
      return getInvolvedDataModelObjects(oInterface.context);
    }

    return null;
  };

  getDataModelObjectPath.requiresIContext = true;
  /**
   * Retrieves the expressionBinding created out of a binding expression.
   *
   * @param {Expression<any>} expression The expression which needs to be compiled
   * @returns {BindingExpression<string>} The expression-binding string
   */

  _exports.getDataModelObjectPath = getDataModelObjectPath;

  var getExpressionBinding = function (expression) {
    return compileBinding(expression);
  };
  /**
   * Retrieve the target entityset for a context path if it exists.
   *
   * @param oContext
   * @returns {string}
   */


  _exports.getExpressionBinding = getExpressionBinding;

  var getTargetEntitySet = function (oContext) {
    if (oContext) {
      var oDataModelPath = getInvolvedDataModelObjects(oContext);
      return getTargetEntitySetPath(oDataModelPath);
    }

    return null;
  };

  _exports.getTargetEntitySet = getTargetEntitySet;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlVJRm9ybWF0dGVycy50cyJdLCJuYW1lcyI6WyJFRE1fVFlQRV9NQVBQSU5HIiwidHlwZSIsImNvbnN0cmFpbnRzIiwiZ2V0RWRpdGFibGVFeHByZXNzaW9uIiwib1Byb3BlcnR5UGF0aCIsIm9EYXRhRmllbGRDb252ZXJ0ZWQiLCJvRGF0YU1vZGVsT2JqZWN0UGF0aCIsImJBc09iamVjdCIsImNvbXBpbGVCaW5kaW5nIiwiZGF0YUZpZWxkRWRpdGFibGVFeHByZXNzaW9uIiwiaWZFbHNlIiwiaXNOb25FZGl0YWJsZUV4cHJlc3Npb24iLCJVSSIsIklzRWRpdGFibGUiLCJvUHJvcGVydHkiLCJpc1BhdGhFeHByZXNzaW9uIiwiJHRhcmdldCIsImlzUGF0aFVwZGF0YWJsZUV4cHJlc3Npb24iLCJpc1BhdGhVcGRhdGFibGUiLCJlZGl0YWJsZUV4cHJlc3Npb24iLCJvciIsIm5vdCIsImlzQ29tcHV0ZWQiLCJpc0tleSIsImlzSW1tdXRhYmxlIiwiSXNUcmFuc2llbnRCaW5kaW5nIiwiYW5kIiwiZ2V0RW5hYmxlZEV4cHJlc3Npb24iLCJkYXRhRmllbGRFbmFibGVkRXhwcmVzc2lvbiIsImlzRGlzYWJsZWRFeHByZXNzaW9uIiwiZW5hYmxlZEV4cHJlc3Npb24iLCJnZXRFZGl0TW9kZSIsImJNZWFzdXJlUmVhZE9ubHkiLCJhc3NvY2lhdGVkQ3VycmVuY3lQcm9wZXJ0eSIsImdldEFzc29jaWF0ZWRDdXJyZW5jeVByb3BlcnR5IiwidW5pdFByb3BlcnR5IiwiZ2V0QXNzb2NpYXRlZFVuaXRQcm9wZXJ0eSIsInJlc3VsdEV4cHJlc3Npb24iLCJpc1JlYWRPbmx5RXhwcmVzc2lvbiIsInJlYWRPbmx5RXhwcmVzc2lvbiIsImVkaXRNb2RlRXhwcmVzc2lvbiIsImlzQ29uc3RhbnQiLCJoYXNWYWxpZEFuYWx5dGljYWxDdXJyZW5jeU9yVW5pdCIsIm9Qcm9wZXJ0eURhdGFNb2RlbE9iamVjdFBhdGgiLCJvUHJvcGVydHlEZWZpbml0aW9uIiwidGFyZ2V0T2JqZWN0IiwiY3VycmVuY3kiLCJhbm5vdGF0aW9ucyIsIk1lYXN1cmVzIiwiSVNPQ3VycmVuY3kiLCJtZWFzdXJlIiwiVW5pdCIsImlzVHJ1dGh5IiwiYW5ub3RhdGlvbkV4cHJlc3Npb24iLCJJc1RvdGFsIiwiY29uc3RhbnQiLCJpZlVuaXRFZGl0YWJsZSIsInNFZGl0YWJsZVZhbHVlIiwic05vbkVkaXRhYmxlVmFsdWUiLCJnZXREaXNwbGF5TW9kZSIsIm9FbnRpdHlUeXBlIiwidGFyZ2V0RW50aXR5VHlwZSIsIm9UZXh0QW5ub3RhdGlvbiIsIkNvbW1vbiIsIlRleHQiLCJvVGV4dEFycmFuZ2VtZW50QW5ub3RhdGlvbiIsIlRleHRBcnJhbmdlbWVudCIsInRvU3RyaW5nIiwic0Rpc3BsYXlWYWx1ZSIsImdldEZpZWxkRGlzcGxheSIsInNUYXJnZXREaXNwbGF5TW9kZSIsIm9Db21wdXRlZEVkaXRNb2RlIiwiaGFzVmFsdWVIZWxwIiwiZXF1YWwiLCJmb3JtYXRXaXRoVHlwZUluZm9ybWF0aW9uIiwicHJvcGVydHlCaW5kaW5nRXhwcmVzc2lvbiIsIm91dEV4cHJlc3Npb24iLCJfdHlwZSIsIm9UYXJnZXRNYXBwaW5nIiwiJFNjYWxlIiwic2NhbGUiLCJ1bmRlZmluZWQiLCIkUHJlY2lzaW9uIiwicHJlY2lzaW9uIiwiJE1heExlbmd0aCIsIm1heExlbmd0aCIsIiROdWxsYWJsZSIsIm51bGxhYmxlIiwiVmFsaWRhdGlvbiIsIk1pbmltdW0iLCJpc05hTiIsIm1pbmltdW0iLCJNYXhpbXVtIiwibWF4aW11bSIsImluZGV4T2YiLCJmb3JtYXRPcHRpb25zIiwiT2JqZWN0IiwiYXNzaWduIiwicGFyc2VBc1N0cmluZyIsImVtcHR5U3RyaW5nIiwicGFyc2VLZWVwc0VtcHR5U3RyaW5nIiwiSXNEaWdpdFNlcXVlbmNlIiwiaXNEaWdpdFNlcXVlbmNlIiwiZ2V0QmluZGluZ1dpdGhVbml0T3JDdXJyZW5jeSIsIm9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgiLCJ1bml0IiwicmVsYXRpdmVMb2NhdGlvbiIsImdldFBhdGhSZWxhdGl2ZUxvY2F0aW9uIiwiY29udGV4dExvY2F0aW9uIiwibmF2aWdhdGlvblByb3BlcnRpZXMiLCJtYXAiLCJucCIsIm5hbWUiLCJmb3JtYXRSZXN1bHQiLCJ2YWx1ZUZvcm1hdHRlcnMiLCJmb3JtYXRXaXRoUGVyY2VudGFnZSIsImNvbXBsZXhUeXBlIiwidW5pdEJpbmRpbmdFeHByZXNzaW9uIiwiYWRkVHlwZUluZm9ybWF0aW9uIiwiZ2V0QWxpZ25tZW50RXhwcmVzc2lvbiIsInNBbGlnbkRpc3BsYXkiLCJzQWxpZ25FZGl0IiwiZ2V0Q29udmVydGVyQ29udGV4dCIsIm9Db250ZXh0Iiwib0ludGVyZmFjZSIsImNvbnRleHQiLCJjb252ZXJ0TWV0YU1vZGVsQ29udGV4dCIsInJlcXVpcmVzSUNvbnRleHQiLCJnZXREYXRhTW9kZWxPYmplY3RQYXRoIiwiZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzIiwiZ2V0RXhwcmVzc2lvbkJpbmRpbmciLCJleHByZXNzaW9uIiwiZ2V0VGFyZ2V0RW50aXR5U2V0Iiwib0RhdGFNb2RlbFBhdGgiLCJnZXRUYXJnZXRFbnRpdHlTZXRQYXRoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBbURPLE1BQU1BLGdCQUFxQyxHQUFHO0FBQ3BELG1CQUFlO0FBQUVDLE1BQUFBLElBQUksRUFBRTtBQUFSLEtBRHFDO0FBRXBELGdCQUFZO0FBQUVBLE1BQUFBLElBQUksRUFBRTtBQUFSLEtBRndDO0FBR3BELGdCQUFZO0FBQUVBLE1BQUFBLElBQUksRUFBRTtBQUFSLEtBSHdDO0FBSXBELDBCQUFzQjtBQUNyQkMsTUFBQUEsV0FBVyxFQUFFO0FBQ1osc0JBQWM7QUFERixPQURRO0FBSXJCRCxNQUFBQSxJQUFJLEVBQUU7QUFKZSxLQUo4QjtBQVVwRCxtQkFBZTtBQUNkQyxNQUFBQSxXQUFXLEVBQUU7QUFDWixxREFBNkMsU0FEakM7QUFFWiw4RUFBc0Usa0JBRjFEO0FBR1oscURBQTZDLFNBSGpDO0FBSVosOEVB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QUFpRTtBQUNwRyxXQUFPM0gsY0FBYyxDQUFDMkgsVUFBRCxDQUFyQjtBQUNBLEdBRk07QUFJUDs7Ozs7Ozs7OztBQU1PLE1BQU1DLGtCQUFrQixHQUFHLFVBQVNULFFBQVQsRUFBMkM7QUFDNUUsUUFBSUEsUUFBSixFQUFjO0FBQ2IsVUFBTVUsY0FBYyxHQUFHSiwyQkFBMkIsQ0FBQ04sUUFBRCxDQUFsRDtBQUNBLGFBQU9XLHNCQUFzQixDQUFDRCxjQUFELENBQTdCO0FBQ0E7O0FBRUQsV0FBTyxJQUFQO0FBQ0EsR0FQTSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJzYXAvdWkvbW9kZWwvb2RhdGEvdjRcIjtcbmltcG9ydCB7IGNvbnZlcnRNZXRhTW9kZWxDb250ZXh0LCBnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdHMgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9NZXRhTW9kZWxDb252ZXJ0ZXJcIjtcbmltcG9ydCB7XG5cdGFkZFR5cGVJbmZvcm1hdGlvbixcblx0YW5kLFxuXHRhbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0QmluZGluZ0V4cHJlc3Npb24sXG5cdEJpbmRpbmdFeHByZXNzaW9uRXhwcmVzc2lvbixcblx0Y29tcGlsZUJpbmRpbmcsXG5cdGNvbnN0YW50LFxuXHRlcXVhbCxcblx0RXhwcmVzc2lvbixcblx0RXhwcmVzc2lvbk9yUHJpbWl0aXZlLFxuXHRmb3JtYXRSZXN1bHQsXG5cdGlmRWxzZSxcblx0aXNDb25zdGFudCxcblx0aXNUcnV0aHksXG5cdG5vdCxcblx0b3Jcbn0gZnJvbSBcInNhcC9mZS9jb3JlL2hlbHBlcnMvQmluZGluZ0V4cHJlc3Npb25cIjtcbmltcG9ydCB7IFVJIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9CaW5kaW5nSGVscGVyXCI7XG5pbXBvcnQge1xuXHRnZXRBc3NvY2lhdGVkVW5pdFByb3BlcnR5LFxuXHRnZXRBc3NvY2lhdGVkQ3VycmVuY3lQcm9wZXJ0eSxcblx0aGFzVmFsdWVIZWxwLFxuXHRpc0NvbXB1dGVkLFxuXHRpc0ltbXV0YWJsZSxcblx0aXNLZXksXG5cdGlzUGF0aEV4cHJlc3Npb25cbn0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvUHJvcGVydHlIZWxwZXJcIjtcbmltcG9ydCB7IFByb3BlcnR5IH0gZnJvbSBcIkBzYXAtdXgvYW5ub3RhdGlvbi1jb252ZXJ0ZXJcIjtcbmltcG9ydCB7IFBhdGhBbm5vdGF0aW9uRXhwcmVzc2lvbiB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy90eXBlcy9FZG1cIjtcbmltcG9ydCB7XG5cdERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGdldFRhcmdldEVudGl0eVNldFBhdGgsXG5cdGlzUGF0aFVwZGF0YWJsZSxcblx0Z2V0UGF0aFJlbGF0aXZlTG9jYXRpb25cbn0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvRGF0YU1vZGVsUGF0aEhlbHBlclwiO1xuaW1wb3J0IHsgaXNSZWFkT25seUV4cHJlc3Npb24sIGlzTm9uRWRpdGFibGVFeHByZXNzaW9uLCBpc0Rpc2FibGVkRXhwcmVzc2lvbiB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0ZpZWxkQ29udHJvbEhlbHBlclwiO1xuaW1wb3J0IHZhbHVlRm9ybWF0dGVycyBmcm9tIFwic2FwL2ZlL2NvcmUvZm9ybWF0dGVycy9WYWx1ZUZvcm1hdHRlclwiO1xuXG5leHBvcnQgdHlwZSBQcm9wZXJ0eU9yUGF0aDxQPiA9IHN0cmluZyB8IFAgfCBQYXRoQW5ub3RhdGlvbkV4cHJlc3Npb248UD47XG5leHBvcnQgdHlwZSBNZXRhTW9kZWxDb250ZXh0ID0ge1xuXHQka2luZDogc3RyaW5nO1xufTtcbmV4cG9ydCB0eXBlIENvbXB1dGVkQW5ub3RhdGlvbkludGVyZmFjZSA9IHtcblx0Y29udGV4dDogQ29udGV4dDtcblx0YXJndW1lbnRzOiBhbnlbXTtcblx0JCR2YWx1ZUFzUHJvbWlzZTogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjb25zdCBFRE1fVFlQRV9NQVBQSU5HOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge1xuXHRcIkVkbS5Cb29sZWFuXCI6IHsgdHlwZTogXCJzYXAudWkubW9kZWwub2RhdGEudHlwZS5Cb29sZWFuXCIgfSxcblx0XCJFZG0uQnl0ZVwiOiB7IHR5cGU6IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuQnl0ZVwiIH0sXG5cdFwiRWRtLkRhdGVcIjogeyB0eXBlOiBcInNhcC51aS5tb2RlbC5vZGF0YS50eXBlLkRhdGVcIiB9LFxuXHRcIkVkbS5EYXRlVGltZU9mZnNldFwiOiB7XG5cdFx0Y29uc3RyYWludHM6IHtcblx0XHRcdFwiJFByZWNpc2lvblwiOiBcInByZWNpc2lvblwiXG5cdFx0fSxcblx0XHR0eXBlOiBcInNhcC51aS5tb2RlbC5vZGF0YS50eXBlLkRhdGVUaW1lT2Zmc2V0XCJcblx0fSxcblx0XCJFZG0uRGVjaW1hbFwiOiB7XG5cdFx0Y29uc3RyYWludHM6IHtcblx0XHRcdFwiQE9yZy5PRGF0YS5WYWxpZGF0aW9uLlYxLk1pbmltdW0vJERlY2ltYWxcIjogXCJtaW5pbXVtXCIsXG5cdFx0XHRcIkBPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5NaW5pbXVtQE9yZy5PRGF0YS5WYWxpZGF0aW9uLlYxLkV4Y2x1c2l2ZVwiOiBcIm1pbmltdW1FeGNsdXNpdmVcIixcblx0XHRcdFwiQE9yZy5PRGF0YS5WYWxpZGF0aW9uLlYxLk1heGltdW0vJERlY2ltYWxcIjogXCJtYXhpbXVtXCIsXG5cdFx0XHRcIkBPcmcuT0RhdGEuVmFsaWRhdGlvbi5WMS5NYXhpbXVtQE9yZy5PRGF0YS5WYWxpZGF0aW9uLlYxLkV4Y2x1c2l2ZVwiOiBcIm1heGltdW1FeGNsdXNpdmVcIixcblx0XHRcdFwiJFByZWNpc2lvblwiOiBcInByZWNpc2lvblwiLFxuXHRcdFx0XCIkU2NhbGVcIjogXCJzY2FsZVwiXG5cdFx0fSxcblx0XHR0eXBlOiBcInNhcC51aS5tb2RlbC5vZGF0YS50eXBlLkRlY2ltYWxcIlxuXHR9LFxuXHRcIkVkbS5Eb3VibGVcIjogeyB0eXBlOiBcInNhcC51aS5tb2RlbC5vZGF0YS50eXBlLkRvdWJsZVwiIH0sXG5cdFwiRWRtLkd1aWRcIjogeyB0eXBlOiBcInNhcC51aS5tb2RlbC5vZGF0YS50eXBlLkd1aWRcIiB9LFxuXHRcIkVkbS5JbnQxNlwiOiB7IHR5cGU6IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuSW50MTZcIiB9LFxuXHRcIkVkbS5JbnQzMlwiOiB7IHR5cGU6IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuSW50MzJcIiB9LFxuXHRcIkVkbS5JbnQ2NFwiOiB7IHR5cGU6IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuSW50NjRcIiB9LFxuXHRcIkVkbS5TQnl0ZVwiOiB7IHR5cGU6IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuU0J5dGVcIiB9LFxuXHRcIkVkbS5TaW5nbGVcIjogeyB0eXBlOiBcInNhcC51aS5tb2RlbC5vZGF0YS50eXBlLlNpbmdsZVwiIH0sXG5cdFwiRWRtLlN0cmVhbVwiOiB7IHR5cGU6IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuU3RyZWFtXCIgfSxcblx0XCJFZG0uU3RyaW5nXCI6IHtcblx0XHRjb25zdHJhaW50czoge1xuXHRcdFx0XCJAY29tLnNhcC52b2NhYnVsYXJpZXMuQ29tbW9uLnYxLklzRGlnaXRTZXF1ZW5jZVwiOiBcImlzRGlnaXRTZXF1ZW5jZVwiLFxuXHRcdFx0XCIkTWF4TGVuZ3RoXCI6IFwibWF4TGVuZ3RoXCIsXG5cdFx0XHRcIiROdWxsYWJsZVwiOiBcIm51bGxhYmxlXCJcblx0XHR9LFxuXHRcdHR5cGU6IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuU3RyaW5nXCJcblx0fSxcblx0XCJFZG0uVGltZU9mRGF5XCI6IHtcblx0XHRjb25zdHJhaW50czoge1xuXHRcdFx0XCIkUHJlY2lzaW9uXCI6IFwicHJlY2lzaW9uXCJcblx0XHR9LFxuXHRcdHR5cGU6IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuVGltZU9mRGF5XCJcblx0fVxufTtcblxuLyoqXG4gKiBDcmVhdGUgdGhlIGV4cHJlc3Npb24gdG8gZ2VuZXJhdGUgYW4gXCJlZGl0YWJsZVwiIGJvb2xlYW4gdmFsdWUuXG4gKlxuICogQHBhcmFtIHtQcm9wZXJ0eVBhdGh9IG9Qcm9wZXJ0eVBhdGggVGhlIGlucHV0IHByb3BlcnR5XG4gKiBAcGFyYW0ge29iamVjdH0gb0RhdGFGaWVsZENvbnZlcnRlZCBUaGUgRGF0YUZpZWxkQ29udmVydGVkIG9iamVjdCB0byByZWFkIHRoZSBmaWVsZENvbnRyb2wgYW5ub3RhdGlvblxuICogQHBhcmFtIHtEYXRhTW9kZWxPYmplY3RQYXRofSBvRGF0YU1vZGVsT2JqZWN0UGF0aCBUaGUgcGF0aCB0byB0aGlzIHByb3BlcnR5IG9iamVjdFxuICogQHBhcmFtIHtib29sZWFufSBiQXNPYmplY3QgV2hldGhlciBvciBub3QgdGhpcyBzaG91bGQgYmUgcmV0dXJuZWQgYXMgYW4gb2JqZWN0IG9yIGEgYmluZGluZyBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBiaW5kaW5nIGV4cHJlc3Npb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgYSBwcm9wZXJ0eSBpcyBlZGl0YWJsZSBvciBub3RcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVkaXRhYmxlRXhwcmVzc2lvbiA9IGZ1bmN0aW9uKFxuXHRvUHJvcGVydHlQYXRoOiBQcm9wZXJ0eU9yUGF0aDxQcm9wZXJ0eT4sXG5cdG9EYXRhRmllbGRDb252ZXJ0ZWQ6IGFueSA9IG51bGwsXG5cdG9EYXRhTW9kZWxPYmplY3RQYXRoPzogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0YkFzT2JqZWN0OiBib29sZWFuID0gZmFsc2Vcbik6IEJpbmRpbmdFeHByZXNzaW9uPGJvb2xlYW4+IHwgRXhwcmVzc2lvbk9yUHJpbWl0aXZlPGJvb2xlYW4+IHtcblx0aWYgKCFvUHJvcGVydHlQYXRoIHx8IHR5cGVvZiBvUHJvcGVydHlQYXRoID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKGZhbHNlKTtcblx0fVxuXHRsZXQgZGF0YUZpZWxkRWRpdGFibGVFeHByZXNzaW9uOiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPiB8IEV4cHJlc3Npb25PclByaW1pdGl2ZTxib29sZWFuPiA9IHRydWU7XG5cdGlmIChvRGF0YUZpZWxkQ29udmVydGVkICE9PSBudWxsKSB7XG5cdFx0ZGF0YUZpZWxkRWRpdGFibGVFeHByZXNzaW9uID0gaWZFbHNlKGlzTm9uRWRpdGFibGVFeHByZXNzaW9uKG9EYXRhRmllbGRDb252ZXJ0ZWQpLCBmYWxzZSwgVUkuSXNFZGl0YWJsZSk7XG5cdH1cblxuXHRjb25zdCBvUHJvcGVydHk6IFByb3BlcnR5ID0gKGlzUGF0aEV4cHJlc3Npb24ob1Byb3BlcnR5UGF0aCkgJiYgb1Byb3BlcnR5UGF0aC4kdGFyZ2V0KSB8fCAob1Byb3BlcnR5UGF0aCBhcyBQcm9wZXJ0eSk7XG5cdC8vIEVkaXRhYmlsaXR5IGRlcGVuZHMgb24gdGhlIGZpZWxkIGNvbnRyb2wgZXhwcmVzc2lvblxuXHQvLyBJZiB0aGUgRmllbGQgY29udHJvbCBpcyBzdGF0aWNhbGx5IGluIFJlYWRPbmx5IG9yIEluYXBwbGljYWJsZSAoZGlzYWJsZWQpIC0+IG5vdCBlZGl0YWJsZVxuXHQvLyBJZiB0aGUgcHJvcGVydHkgaXMgYSBrZXkgLT4gbm90IGVkaXRhYmxlIGV4Y2VwdCBpbiBjcmVhdGlvbiBpZiBub3QgY29tcHV0ZWRcblx0Ly8gSWYgdGhlIHByb3BlcnR5IGlzIGNvbXB1dGVkIC0+IG5vdCBlZGl0YWJsZVxuXHQvLyBJZiB0aGUgcHJvcGVydHkgaXMgbm90IHVwZGF0YWJsZSAtPiBub3QgZWRpdGFibGVcblx0Ly8gSWYgdGhlIHByb3BlcnR5IGlzIGltbXV0YWJsZSAtPiBub3QgZWRpdGFibGUgZXhjZXB0IGluIGNyZWF0aW9uXG5cdC8vIElmIHRoZSBGaWVsZCBjb250cm9sIGlzIGEgcGF0aCByZXNvbHZpbmcgdG8gUmVhZE9ubHkgb3IgSW5hcHBsaWNhYmxlIChkaXNhYmxlZCkgKDw9IDEpIC0+IG5vdCBlZGl0YWJsZVxuXHQvLyBFbHNlLCB0byBiZSBlZGl0YWJsZSB5b3UgbmVlZFxuXHQvLyBpbW11dGFibGUgYW5kIGtleSB3aGlsZSBpbiB0aGUgY3JlYXRpb24gcm93XG5cdC8vIHVpL2lzRWRpdGFibGVcblx0Y29uc3QgaXNQYXRoVXBkYXRhYmxlRXhwcmVzc2lvbiA9IGlzUGF0aFVwZGF0YWJsZShvRGF0YU1vZGVsT2JqZWN0UGF0aCwgb1Byb3BlcnR5UGF0aCk7XG5cdGNvbnN0IGVkaXRhYmxlRXhwcmVzc2lvbiA9IGlmRWxzZShcblx0XHRvcihcblx0XHRcdG5vdChpc1BhdGhVcGRhdGFibGVFeHByZXNzaW9uKSxcblx0XHRcdGlzQ29tcHV0ZWQob1Byb3BlcnR5KSxcblx0XHRcdGlzS2V5KG9Qcm9wZXJ0eSksXG5cdFx0XHRpc0ltbXV0YWJsZShvUHJvcGVydHkpLFxuXHRcdFx0aXNOb25FZGl0YWJsZUV4cHJlc3Npb24ob1Byb3BlcnR5KVxuXHRcdCksXG5cdFx0aWZFbHNlKG9yKGlzQ29tcHV0ZWQob1Byb3BlcnR5KSwgaXNOb25FZGl0YWJsZUV4cHJlc3Npb24ob1Byb3BlcnR5KSksIGZhbHNlLCBVSS5Jc1RyYW5zaWVudEJpbmRpbmcpLFxuXHRcdFVJLklzRWRpdGFibGVcblx0KTtcblx0aWYgKGJBc09iamVjdCkge1xuXHRcdHJldHVybiBhbmQoZWRpdGFibGVFeHByZXNzaW9uLCBkYXRhRmllbGRFZGl0YWJsZUV4cHJlc3Npb24pO1xuXHR9XG5cdHJldHVybiBjb21waWxlQmluZGluZyhhbmQoZWRpdGFibGVFeHByZXNzaW9uLCBkYXRhRmllbGRFZGl0YWJsZUV4cHJlc3Npb24pKTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBleHByZXNzaW9uIHRvIGdlbmVyYXRlIGFuIFwiZW5hYmxlZFwiIGJvb2xlYW4gdmFsdWUuXG4gKlxuICogQHBhcmFtIHtQcm9wZXJ0eVBhdGh9IG9Qcm9wZXJ0eVBhdGggVGhlIGlucHV0IHByb3BlcnR5XG4gKiBAcGFyYW0ge2FueX0gb0RhdGFGaWVsZENvbnZlcnRlZCBUaGUgRGF0YUZpZWxkQ29udmVydGVkIE9iamVjdCB0byByZWFkIHRoZSBmaWVsZENvbnRyb2wgYW5ub3RhdGlvblxuICogQHBhcmFtIHtib29sZWFufSBiQXNPYmplY3QgV2hldGhlciBvciBub3QgdGhpcyBzaG91bGQgYmUgcmV0dXJuZWQgYXMgYW4gb2JqZWN0IG9yIGEgYmluZGluZyBzdHJpbmdcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBiaW5kaW5nIGV4cHJlc3Npb24gdG8gZGV0ZXJtaW5lIGlmIGEgcHJvcGVydHkgaXMgZW5hYmxlZCBvciBub3RcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEVuYWJsZWRFeHByZXNzaW9uID0gZnVuY3Rpb24oXG5cdG9Qcm9wZXJ0eVBhdGg6IFByb3BlcnR5T3JQYXRoPFByb3BlcnR5Pixcblx0b0RhdGFGaWVsZENvbnZlcnRlZD86IGFueSxcblx0YkFzT2JqZWN0OiBib29sZWFuID0gZmFsc2Vcbik6IEJpbmRpbmdFeHByZXNzaW9uPGJvb2xlYW4+IHwgRXhwcmVzc2lvbk9yUHJpbWl0aXZlPGJvb2xlYW4+IHtcblx0aWYgKCFvUHJvcGVydHlQYXRoIHx8IHR5cGVvZiBvUHJvcGVydHlQYXRoID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKHRydWUpO1xuXHR9XG5cdGxldCBkYXRhRmllbGRFbmFibGVkRXhwcmVzc2lvbjogQmluZGluZ0V4cHJlc3Npb248Ym9vbGVhbj4gfCBFeHByZXNzaW9uT3JQcmltaXRpdmU8Ym9vbGVhbj4gPSB0cnVlO1xuXHRpZiAob0RhdGFGaWVsZENvbnZlcnRlZCAhPT0gbnVsbCkge1xuXHRcdGRhdGFGaWVsZEVuYWJsZWRFeHByZXNzaW9uID0gaWZFbHNlKGlzRGlzYWJsZWRFeHByZXNzaW9uKG9EYXRhRmllbGRDb252ZXJ0ZWQpLCBmYWxzZSwgdHJ1ZSk7XG5cdH1cblxuXHRjb25zdCBvUHJvcGVydHk6IFByb3BlcnR5ID0gKGlzUGF0aEV4cHJlc3Npb24ob1Byb3BlcnR5UGF0aCkgJiYgb1Byb3BlcnR5UGF0aC4kdGFyZ2V0KSB8fCAob1Byb3BlcnR5UGF0aCBhcyBQcm9wZXJ0eSk7XG5cdC8vIEVuYWJsZW1lbnQgZGVwZW5kcyBvbiB0aGUgZmllbGQgY29udHJvbCBleHByZXNzaW9uXG5cdC8vIElmIHRoZSBGaWVsZCBjb250cm9sIGlzIHN0YXRpY2FsbHkgaW4gSW5hcHBsaWNhYmxlIChkaXNhYmxlZCkgLT4gbm90IGVuYWJsZWRcblx0Y29uc3QgZW5hYmxlZEV4cHJlc3Npb24gPSBpZkVsc2UoaXNEaXNhYmxlZEV4cHJlc3Npb24ob1Byb3BlcnR5KSwgZmFsc2UsIHRydWUpO1xuXHRpZiAoYkFzT2JqZWN0KSB7XG5cdFx0cmV0dXJuIGFuZChlbmFibGVkRXhwcmVzc2lvbiwgZGF0YUZpZWxkRW5hYmxlZEV4cHJlc3Npb24pO1xuXHR9XG5cdHJldHVybiBjb21waWxlQmluZGluZyhhbmQoZW5hYmxlZEV4cHJlc3Npb24sIGRhdGFGaWVsZEVuYWJsZWRFeHByZXNzaW9uKSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgZXhwcmVzc2lvbiB0byBnZW5lcmF0ZSBhbiBcImVkaXRNb2RlXCIgZW51bSB2YWx1ZS5cbiAqIEBwYXJhbSB7UHJvcGVydHlQYXRofSBvUHJvcGVydHlQYXRoIFRoZSBpbnB1dCBwcm9wZXJ0eVxuICogQHBhcmFtIHtEYXRhTW9kZWxPYmplY3RQYXRofSBvRGF0YU1vZGVsT2JqZWN0UGF0aCBUaGUgbGlzdCBvZiBkYXRhIG1vZGVsIG9iamVjdHMgdGhhdCBhcmUgaW52b2x2ZWQgdG8gcmVhY2ggdGhhdCBwcm9wZXJ0eVxuICogQHBhcmFtIHtib29sZWFufSBiTWVhc3VyZVJlYWRPbmx5IFdoZXRoZXIgd2Ugc2hvdWxkIHNldCBVb00gLyBjdXJyZW5jeSBmaWVsZCBtb2RlIHRvIHJlYWQgb25seVxuICogQHBhcmFtIHtib29sZWFufSBiQXNPYmplY3QgV2hldGhlciB3ZSBzaG91bGQgcmV0dXJuIHRoaXMgYXMgYW4gZXhwcmVzc2lvbiBvciBhcyBhIHN0cmluZ1xuICogQHBhcmFtIHtvYmplY3R9IG9EYXRhRmllbGRDb252ZXJ0ZWQgVGhlIGRhdGFGaWVsZCBvYmplY3RcbiAqIEByZXR1cm5zIHtCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHwgRXhwcmVzc2lvbk9yUHJpbWl0aXZlPHN0cmluZz59IFRoZSBiaW5kaW5nIGV4cHJlc3Npb24gcmVwcmVzZW50aW5nIHRoZSBjdXJyZW50IHByb3BlcnR5IGVkaXQgbW9kZSwgY29tcGxpYW50IHdpdGggdGhlIE1EQyBGaWVsZCBkZWZpbml0aW9uIG9mIGVkaXRNb2RlLlxuICovXG5leHBvcnQgY29uc3QgZ2V0RWRpdE1vZGUgPSBmdW5jdGlvbihcblx0b1Byb3BlcnR5UGF0aDogUHJvcGVydHlPclBhdGg8UHJvcGVydHk+LFxuXHRvRGF0YU1vZGVsT2JqZWN0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0Yk1lYXN1cmVSZWFkT25seTogYm9vbGVhbiA9IGZhbHNlLFxuXHRiQXNPYmplY3Q6IGJvb2xlYW4gPSBmYWxzZSxcblx0b0RhdGFGaWVsZENvbnZlcnRlZDogYW55ID0gbnVsbFxuKTogQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPiB8IEV4cHJlc3Npb25PclByaW1pdGl2ZTxzdHJpbmc+IHtcblx0aWYgKCFvUHJvcGVydHlQYXRoIHx8IHR5cGVvZiBvUHJvcGVydHlQYXRoID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIFwiRGlzcGxheVwiO1xuXHR9XG5cdGNvbnN0IG9Qcm9wZXJ0eTogUHJvcGVydHkgPSAoaXNQYXRoRXhwcmVzc2lvbihvUHJvcGVydHlQYXRoKSAmJiBvUHJvcGVydHlQYXRoLiR0YXJnZXQpIHx8IChvUHJvcGVydHlQYXRoIGFzIFByb3BlcnR5KTtcblx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIG5vdCBlbmFibGVkID0+IERpc2FibGVkXG5cdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBlbmFibGVkICYmIG5vdCBlZGl0YWJsZSA9PiBSZWFkT25seVxuXHQvLyBpZiB0aGUgcHJvcGVydHkgaXMgZW5hYmxlZCAmJiBlZGl0YWJsZSA9PiBFZGl0YWJsZVxuXHQvLyBJZiB0aGVyZSBpcyBhbiBhc3NvY2lhdGVkIHVuaXQsIGFuZCBpdCBoYXMgYSBmaWVsZCBjb250cm9sIGFsc28gdXNlIGNvbnNpZGVyIHRoZSBmb2xsb3dpbmdcblx0Ly8gaWYgdGhlIHVuaXQgZmllbGQgY29udHJvbCBpcyByZWFkb25seSAtPiBFZGl0YWJsZVJlYWRPbmx5XG5cdC8vIG90aGVyd2lzZSAtPiBFZGl0YWJsZVxuXHRjb25zdCBlZGl0YWJsZUV4cHJlc3Npb24gPSBnZXRFZGl0YWJsZUV4cHJlc3Npb24oXG5cdFx0b1Byb3BlcnR5UGF0aCxcblx0XHRvRGF0YUZpZWxkQ29udmVydGVkLFxuXHRcdG9EYXRhTW9kZWxPYmplY3RQYXRoLFxuXHRcdHRydWVcblx0KSBhcyBFeHByZXNzaW9uT3JQcmltaXRpdmU8Ym9vbGVhbj47XG5cblx0Y29uc3QgZW5hYmxlZEV4cHJlc3Npb24gPSBnZXRFbmFibGVkRXhwcmVzc2lvbihvUHJvcGVydHlQYXRoLCBvRGF0YUZpZWxkQ29udmVydGVkLCB0cnVlKSBhcyBFeHByZXNzaW9uT3JQcmltaXRpdmU8Ym9vbGVhbj47XG5cdGNvbnN0IGFzc29jaWF0ZWRDdXJyZW5jeVByb3BlcnR5ID0gZ2V0QXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHkob1Byb3BlcnR5KTtcblx0Y29uc3QgdW5pdFByb3BlcnR5ID0gYXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHkgfHwgZ2V0QXNzb2NpYXRlZFVuaXRQcm9wZXJ0eShvUHJvcGVydHkpO1xuXHRsZXQgcmVzdWx0RXhwcmVzc2lvbjogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPHN0cmluZz4gPSBcIkVkaXRhYmxlXCI7XG5cdGlmICh1bml0UHJvcGVydHkpIHtcblx0XHRyZXN1bHRFeHByZXNzaW9uID0gaWZFbHNlKFxuXHRcdFx0b3IoaXNSZWFkT25seUV4cHJlc3Npb24odW5pdFByb3BlcnR5KSwgaXNDb21wdXRlZCh1bml0UHJvcGVydHkpLCBiTWVhc3VyZVJlYWRPbmx5KSxcblx0XHRcdFwiRWRpdGFibGVSZWFkT25seVwiLFxuXHRcdFx0XCJFZGl0YWJsZVwiXG5cdFx0KTtcblx0fVxuXHRjb25zdCByZWFkT25seUV4cHJlc3Npb24gPSBvcihpc1JlYWRPbmx5RXhwcmVzc2lvbihvUHJvcGVydHkpLCBpc1JlYWRPbmx5RXhwcmVzc2lvbihvRGF0YUZpZWxkQ29udmVydGVkKSk7XG5cblx0Ly8gaWYgdGhlIHByb3BlcnR5IGlzIGZyb20gYSBub24tdXBkYXRhYmxlIGVudGl0eSA9PiBSZWFkIG9ubHkgbW9kZSwgcHJldmlvdXNseSBjYWxjdWxhdGVkIGVkaXQgTW9kZSBpcyBpZ25vcmVkXG5cdC8vIGlmIHRoZSBwcm9wZXJ0eSBpcyBmcm9tIGFuIHVwZGF0YWJsZSBlbnRpdHkgPT4gcHJldmlvdXNseSBjYWxjdWxhdGVkIGVkaXQgTW9kZSBleHByZXNzaW9uXG5cdGNvbnN0IGVkaXRNb2RlRXhwcmVzc2lvbiA9IGlmRWxzZShcblx0XHRlbmFibGVkRXhwcmVzc2lvbixcblx0XHRpZkVsc2UoXG5cdFx0XHRlZGl0YWJsZUV4cHJlc3Npb24sXG5cdFx0XHRyZXN1bHRFeHByZXNzaW9uLFxuXHRcdFx0aWZFbHNlKGFuZCghaXNDb25zdGFudChyZWFkT25seUV4cHJlc3Npb24pICYmIHJlYWRPbmx5RXhwcmVzc2lvbiwgVUkuSXNFZGl0YWJsZSksIFwiUmVhZE9ubHlcIiwgXCJEaXNwbGF5XCIpXG5cdFx0KSxcblx0XHRpZkVsc2UoVUkuSXNFZGl0YWJsZSwgXCJEaXNhYmxlZFwiLCBcIkRpc3BsYXlcIilcblx0KTtcblx0aWYgKGJBc09iamVjdCkge1xuXHRcdHJldHVybiBlZGl0TW9kZUV4cHJlc3Npb247XG5cdH1cblx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKGVkaXRNb2RlRXhwcmVzc2lvbik7XG59O1xuXG5leHBvcnQgY29uc3QgaGFzVmFsaWRBbmFseXRpY2FsQ3VycmVuY3lPclVuaXQgPSBmdW5jdGlvbihvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoKTogQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPiB7XG5cdGNvbnN0IG9Qcm9wZXJ0eURlZmluaXRpb24gPSBvUHJvcGVydHlEYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdCBhcyBQcm9wZXJ0eTtcblx0Y29uc3QgY3VycmVuY3kgPSBvUHJvcGVydHlEZWZpbml0aW9uLmFubm90YXRpb25zPy5NZWFzdXJlcz8uSVNPQ3VycmVuY3k7XG5cdGNvbnN0IG1lYXN1cmUgPSBjdXJyZW5jeSA/IGN1cnJlbmN5IDogb1Byb3BlcnR5RGVmaW5pdGlvbi5hbm5vdGF0aW9ucz8uTWVhc3VyZXM/LlVuaXQ7XG5cdGlmIChtZWFzdXJlKSB7XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKG9yKGlzVHJ1dGh5KGFubm90YXRpb25FeHByZXNzaW9uKG1lYXN1cmUpIGFzIEV4cHJlc3Npb248c3RyaW5nPiksIG5vdChVSS5Jc1RvdGFsKSkpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBjb21waWxlQmluZGluZyhjb25zdGFudCh0cnVlKSk7XG5cdH1cbn07XG5cbmV4cG9ydCBjb25zdCBpZlVuaXRFZGl0YWJsZSA9IGZ1bmN0aW9uKFxuXHRvUHJvcGVydHlQYXRoOiBQcm9wZXJ0eU9yUGF0aDxQcm9wZXJ0eT4sXG5cdHNFZGl0YWJsZVZhbHVlOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8c3RyaW5nPixcblx0c05vbkVkaXRhYmxlVmFsdWU6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxzdHJpbmc+XG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0Y29uc3Qgb1Byb3BlcnR5ID0gKGlzUGF0aEV4cHJlc3Npb24ob1Byb3BlcnR5UGF0aCkgJiYgb1Byb3BlcnR5UGF0aC4kdGFyZ2V0KSB8fCAob1Byb3BlcnR5UGF0aCBhcyBQcm9wZXJ0eSk7XG5cdGNvbnN0IHVuaXRQcm9wZXJ0eSA9IGdldEFzc29jaWF0ZWRDdXJyZW5jeVByb3BlcnR5KG9Qcm9wZXJ0eSkgfHwgZ2V0QXNzb2NpYXRlZFVuaXRQcm9wZXJ0eShvUHJvcGVydHkpO1xuXHRpZiAoIXVuaXRQcm9wZXJ0eSkge1xuXHRcdHJldHVybiBjb21waWxlQmluZGluZyhzTm9uRWRpdGFibGVWYWx1ZSk7XG5cdH1cblx0Y29uc3QgZWRpdGFibGVFeHByZXNzaW9uID0gYW5kKG5vdChpc1JlYWRPbmx5RXhwcmVzc2lvbih1bml0UHJvcGVydHkpKSwgbm90KGlzQ29tcHV0ZWQodW5pdFByb3BlcnR5KSkpO1xuXHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoaWZFbHNlKGVkaXRhYmxlRXhwcmVzc2lvbiwgc0VkaXRhYmxlVmFsdWUsIHNOb25FZGl0YWJsZVZhbHVlKSk7XG59O1xuXG5leHBvcnQgdHlwZSBEaXNwbGF5TW9kZSA9IFwiVmFsdWVcIiB8IFwiRGVzY3JpcHRpb25cIiB8IFwiRGVzY3JpcHRpb25WYWx1ZVwiIHwgXCJWYWx1ZURlc2NyaXB0aW9uXCI7XG5leHBvcnQgY29uc3QgZ2V0RGlzcGxheU1vZGUgPSBmdW5jdGlvbihvUHJvcGVydHlQYXRoOiBQcm9wZXJ0eU9yUGF0aDxQcm9wZXJ0eT4sIG9EYXRhTW9kZWxPYmplY3RQYXRoPzogRGF0YU1vZGVsT2JqZWN0UGF0aCk6IERpc3BsYXlNb2RlIHtcblx0aWYgKCFvUHJvcGVydHlQYXRoIHx8IHR5cGVvZiBvUHJvcGVydHlQYXRoID09PSBcInN0cmluZ1wiKSB7XG5cdFx0cmV0dXJuIFwiVmFsdWVcIjtcblx0fVxuXHRjb25zdCBvUHJvcGVydHkgPSAoaXNQYXRoRXhwcmVzc2lvbihvUHJvcGVydHlQYXRoKSAmJiBvUHJvcGVydHlQYXRoLiR0YXJnZXQpIHx8IChvUHJvcGVydHlQYXRoIGFzIFByb3BlcnR5KTtcblx0Y29uc3Qgb0VudGl0eVR5cGUgPSBvRGF0YU1vZGVsT2JqZWN0UGF0aCAmJiBvRGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRFbnRpdHlUeXBlO1xuXHRjb25zdCBvVGV4dEFubm90YXRpb24gPSBvUHJvcGVydHkuYW5ub3RhdGlvbnM/LkNvbW1vbj8uVGV4dDtcblx0Y29uc3Qgb1RleHRBcnJhbmdlbWVudEFubm90YXRpb24gPVxuXHRcdCh0eXBlb2Ygb1RleHRBbm5vdGF0aW9uICE9PSBcInN0cmluZ1wiICYmIG9UZXh0QW5ub3RhdGlvbj8uYW5ub3RhdGlvbnM/LlVJPy5UZXh0QXJyYW5nZW1lbnQ/LnRvU3RyaW5nKCkpIHx8XG5cdFx0b0VudGl0eVR5cGU/LmFubm90YXRpb25zPy5VST8uVGV4dEFycmFuZ2VtZW50Py50b1N0cmluZygpO1xuXG5cdGxldCBzRGlzcGxheVZhbHVlID0gb1RleHRBbm5vdGF0aW9uID8gXCJEZXNjcmlwdGlvblZhbHVlXCIgOiBcIlZhbHVlXCI7XG5cdGlmIChvVGV4dEFubm90YXRpb24gJiYgb1RleHRBcnJhbmdlbWVudEFubm90YXRpb24pIHtcblx0XHRpZiAob1RleHRBcnJhbmdlbWVudEFubm90YXRpb24gPT09IFwiVUkuVGV4dEFycmFuZ2VtZW50VHlwZS9UZXh0T25seVwiKSB7XG5cdFx0XHRzRGlzcGxheVZhbHVlID0gXCJEZXNjcmlwdGlvblwiO1xuXHRcdH0gZWxzZSBpZiAob1RleHRBcnJhbmdlbWVudEFubm90YXRpb24gPT09IFwiVUkuVGV4dEFycmFuZ2VtZW50VHlwZS9UZXh0TGFzdFwiKSB7XG5cdFx0XHRzRGlzcGxheVZhbHVlID0gXCJWYWx1ZURlc2NyaXB0aW9uXCI7XG5cdFx0fSBlbHNlIGlmIChvVGV4dEFycmFuZ2VtZW50QW5ub3RhdGlvbiA9PT0gXCJVSS5UZXh0QXJyYW5nZW1lbnRUeXBlL1RleHRTZXBhcmF0ZVwiKSB7XG5cdFx0XHRzRGlzcGxheVZhbHVlID0gXCJWYWx1ZVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvL0RlZmF1bHQgc2hvdWxkIGJlIFRleHRGaXJzdCBpZiB0aGVyZSBpcyBhIFRleHQgYW5ub3RhdGlvbiBhbmQgbmVpdGhlciBUZXh0T25seSBub3IgVGV4dExhc3QgYXJlIHNldFxuXHRcdFx0c0Rpc3BsYXlWYWx1ZSA9IFwiRGVzY3JpcHRpb25WYWx1ZVwiO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc0Rpc3BsYXlWYWx1ZSBhcyBEaXNwbGF5TW9kZTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGaWVsZERpc3BsYXkgPSBmdW5jdGlvbihcblx0b1Byb3BlcnR5UGF0aDogUHJvcGVydHlPclBhdGg8UHJvcGVydHk+LFxuXHRzVGFyZ2V0RGlzcGxheU1vZGU6IHN0cmluZyxcblx0b0NvbXB1dGVkRWRpdE1vZGU6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxzdHJpbmc+XG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0Y29uc3Qgb1Byb3BlcnR5ID0gKGlzUGF0aEV4cHJlc3Npb24ob1Byb3BlcnR5UGF0aCkgJiYgb1Byb3BlcnR5UGF0aC4kdGFyZ2V0KSB8fCAob1Byb3BlcnR5UGF0aCBhcyBQcm9wZXJ0eSk7XG5cblx0cmV0dXJuIGhhc1ZhbHVlSGVscChvUHJvcGVydHkpXG5cdFx0PyBjb21waWxlQmluZGluZyhzVGFyZ2V0RGlzcGxheU1vZGUpXG5cdFx0OiBjb21waWxlQmluZGluZyhpZkVsc2UoZXF1YWwob0NvbXB1dGVkRWRpdE1vZGUsIFwiRWRpdGFibGVcIiksIFwiVmFsdWVcIiwgc1RhcmdldERpc3BsYXlNb2RlKSk7XG59O1xuXG5leHBvcnQgY29uc3QgZm9ybWF0V2l0aFR5cGVJbmZvcm1hdGlvbiA9IGZ1bmN0aW9uKG9Qcm9wZXJ0eTogUHJvcGVydHksIHByb3BlcnR5QmluZGluZ0V4cHJlc3Npb246IEV4cHJlc3Npb248c3RyaW5nPik6IEV4cHJlc3Npb248c3RyaW5nPiB7XG5cdGNvbnN0IG91dEV4cHJlc3Npb246IEJpbmRpbmdFeHByZXNzaW9uRXhwcmVzc2lvbjxhbnk+ID0gcHJvcGVydHlCaW5kaW5nRXhwcmVzc2lvbiBhcyBCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb248YW55Pjtcblx0aWYgKG9Qcm9wZXJ0eS5fdHlwZSA9PT0gXCJQcm9wZXJ0eVwiKSB7XG5cdFx0Y29uc3Qgb1RhcmdldE1hcHBpbmcgPSBFRE1fVFlQRV9NQVBQSU5HWyhvUHJvcGVydHkgYXMgUHJvcGVydHkpLnR5cGVdO1xuXHRcdGlmIChvVGFyZ2V0TWFwcGluZykge1xuXHRcdFx0b3V0RXhwcmVzc2lvbi50eXBlID0gb1RhcmdldE1hcHBpbmcudHlwZTtcblx0XHRcdGlmIChvVGFyZ2V0TWFwcGluZy5jb25zdHJhaW50cykge1xuXHRcdFx0XHRvdXRFeHByZXNzaW9uLmNvbnN0cmFpbnRzID0ge307XG5cdFx0XHRcdGlmIChvVGFyZ2V0TWFwcGluZy5jb25zdHJhaW50cy4kU2NhbGUgJiYgb1Byb3BlcnR5LnNjYWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRvdXRFeHByZXNzaW9uLmNvbnN0cmFpbnRzLnNjYWxlID0gb1Byb3BlcnR5LnNjYWxlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvVGFyZ2V0TWFwcGluZy5jb25zdHJhaW50cy4kUHJlY2lzaW9uICYmIG9Qcm9wZXJ0eS5wcmVjaXNpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdG91dEV4cHJlc3Npb24uY29uc3RyYWludHMucHJlY2lzaW9uID0gb1Byb3BlcnR5LnByZWNpc2lvbjtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAob1RhcmdldE1hcHBpbmcuY29uc3RyYWludHMuJE1heExlbmd0aCAmJiBvUHJvcGVydHkubWF4TGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0XHRvdXRFeHByZXNzaW9uLmNvbnN0cmFpbnRzLm1heExlbmd0aCA9IG9Qcm9wZXJ0eS5tYXhMZW5ndGg7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG9UYXJnZXRNYXBwaW5nLmNvbnN0cmFpbnRzLiROdWxsYWJsZSAmJiBvUHJvcGVydHkubnVsbGFibGUgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0b3V0RXhwcmVzc2lvbi5jb25zdHJhaW50cy5udWxsYWJsZSA9IG9Qcm9wZXJ0eS5udWxsYWJsZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0b1RhcmdldE1hcHBpbmcuY29uc3RyYWludHNbXCJAT3JnLk9EYXRhLlZhbGlkYXRpb24uVjEuTWluaW11bS8kRGVjaW1hbFwiXSAmJlxuXHRcdFx0XHRcdG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucz8uVmFsaWRhdGlvbj8uTWluaW11bSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0IWlzTmFOKG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucy5WYWxpZGF0aW9uLk1pbmltdW0pXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdG91dEV4cHJlc3Npb24uY29uc3RyYWludHMubWluaW11bSA9IGAke29Qcm9wZXJ0eS5hbm5vdGF0aW9ucy5WYWxpZGF0aW9uLk1pbmltdW19YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0b1RhcmdldE1hcHBpbmcuY29uc3RyYWludHNbXCJAT3JnLk9EYXRhLlZhbGlkYXRpb24uVjEuTWF4aW11bS8kRGVjaW1hbFwiXSAmJlxuXHRcdFx0XHRcdG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucz8uVmFsaWRhdGlvbj8uTWF4aW11bSAhPT0gdW5kZWZpbmVkICYmXG5cdFx0XHRcdFx0IWlzTmFOKG9Qcm9wZXJ0eS5hbm5vdGF0aW9ucy5WYWxpZGF0aW9uLk1heGltdW0pXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdG91dEV4cHJlc3Npb24uY29uc3RyYWludHMubWF4aW11bSA9IGAke29Qcm9wZXJ0eS5hbm5vdGF0aW9ucy5WYWxpZGF0aW9uLk1heGltdW19YDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKG91dEV4cHJlc3Npb24/LnR5cGU/LmluZGV4T2YoXCJzYXAudWkubW9kZWwub2RhdGEudHlwZS5JbnRcIikgPT09IDApIHtcblx0XHRcdFx0aWYgKCFvdXRFeHByZXNzaW9uLmZvcm1hdE9wdGlvbnMpIHtcblx0XHRcdFx0XHRvdXRFeHByZXNzaW9uLmZvcm1hdE9wdGlvbnMgPSB7fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRvdXRFeHByZXNzaW9uLmZvcm1hdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG91dEV4cHJlc3Npb24uZm9ybWF0T3B0aW9ucywge1xuXHRcdFx0XHRcdHBhcnNlQXNTdHJpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdGVtcHR5U3RyaW5nOiBcIlwiXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0aWYgKG91dEV4cHJlc3Npb24udHlwZSA9PT0gXCJzYXAudWkubW9kZWwub2RhdGEudHlwZS5TdHJpbmdcIikge1xuXHRcdFx0XHRpZiAoIW91dEV4cHJlc3Npb24uZm9ybWF0T3B0aW9ucykge1xuXHRcdFx0XHRcdG91dEV4cHJlc3Npb24uZm9ybWF0T3B0aW9ucyA9IHt9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdG91dEV4cHJlc3Npb24uZm9ybWF0T3B0aW9ucy5wYXJzZUtlZXBzRW1wdHlTdHJpbmcgPSB0cnVlO1xuXG5cdFx0XHRcdGlmIChcblx0XHRcdFx0XHRvVGFyZ2V0TWFwcGluZy5jb25zdHJhaW50cz8uW1wiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5Jc0RpZ2l0U2VxdWVuY2VcIl0gJiZcblx0XHRcdFx0XHRvUHJvcGVydHkuYW5ub3RhdGlvbnM/LkNvbW1vbj8uSXNEaWdpdFNlcXVlbmNlXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdG91dEV4cHJlc3Npb24uY29uc3RyYWludHMuaXNEaWdpdFNlcXVlbmNlID0gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKG91dEV4cHJlc3Npb24/LnR5cGU/LmluZGV4T2YoXCJzYXAudWkubW9kZWwub2RhdGEudHlwZS5Eb3VibGVcIikgPT09IDApIHtcblx0XHRcdFx0aWYgKCFvdXRFeHByZXNzaW9uLmZvcm1hdE9wdGlvbnMpIHtcblx0XHRcdFx0XHRvdXRFeHByZXNzaW9uLmZvcm1hdE9wdGlvbnMgPSB7fTtcblx0XHRcdFx0fVxuXHRcdFx0XHRvdXRFeHByZXNzaW9uLmZvcm1hdE9wdGlvbnMgPSBPYmplY3QuYXNzaWduKG91dEV4cHJlc3Npb24uZm9ybWF0T3B0aW9ucywge1xuXHRcdFx0XHRcdHBhcnNlQXNTdHJpbmc6IGZhbHNlLFxuXHRcdFx0XHRcdGVtcHR5U3RyaW5nOiBcIlwiXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gb3V0RXhwcmVzc2lvbjtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRCaW5kaW5nV2l0aFVuaXRPckN1cnJlbmN5ID0gZnVuY3Rpb24oXG5cdG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdHByb3BlcnR5QmluZGluZ0V4cHJlc3Npb246IEV4cHJlc3Npb248c3RyaW5nPlxuKTogRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0Y29uc3Qgb1Byb3BlcnR5RGVmaW5pdGlvbiA9IG9Qcm9wZXJ0eURhdGFNb2RlbFBhdGgudGFyZ2V0T2JqZWN0IGFzIFByb3BlcnR5O1xuXHRsZXQgdW5pdCA9IG9Qcm9wZXJ0eURlZmluaXRpb24uYW5ub3RhdGlvbnM/Lk1lYXN1cmVzPy5Vbml0O1xuXHRjb25zdCByZWxhdGl2ZUxvY2F0aW9uID0gZ2V0UGF0aFJlbGF0aXZlTG9jYXRpb24oXG5cdFx0b1Byb3BlcnR5RGF0YU1vZGVsUGF0aC5jb250ZXh0TG9jYXRpb24sXG5cdFx0b1Byb3BlcnR5RGF0YU1vZGVsUGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllc1xuXHQpLm1hcChucCA9PiBucC5uYW1lKTtcblx0cHJvcGVydHlCaW5kaW5nRXhwcmVzc2lvbiA9IGZvcm1hdFdpdGhUeXBlSW5mb3JtYXRpb24ob1Byb3BlcnR5RGVmaW5pdGlvbiwgcHJvcGVydHlCaW5kaW5nRXhwcmVzc2lvbik7XG5cdGlmICh1bml0Py50b1N0cmluZygpID09PSBcIiVcIikge1xuXHRcdHJldHVybiBmb3JtYXRSZXN1bHQoW3Byb3BlcnR5QmluZGluZ0V4cHJlc3Npb25dLCB2YWx1ZUZvcm1hdHRlcnMuZm9ybWF0V2l0aFBlcmNlbnRhZ2UpO1xuXHR9XG5cdGNvbnN0IGNvbXBsZXhUeXBlID0gdW5pdCA/IFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuVW5pdFwiIDogXCJzYXAudWkubW9kZWwub2RhdGEudHlwZS5DdXJyZW5jeVwiO1xuXHR1bml0ID0gdW5pdCA/IHVuaXQgOiBvUHJvcGVydHlEZWZpbml0aW9uLmFubm90YXRpb25zPy5NZWFzdXJlcz8uSVNPQ3VycmVuY3k7XG5cdGNvbnN0IHVuaXRCaW5kaW5nRXhwcmVzc2lvbiA9ICh1bml0IGFzIGFueSkuJHRhcmdldFxuXHRcdD8gZm9ybWF0V2l0aFR5cGVJbmZvcm1hdGlvbigodW5pdCBhcyBhbnkpLiR0YXJnZXQsIGFubm90YXRpb25FeHByZXNzaW9uKHVuaXQsIHJlbGF0aXZlTG9jYXRpb24pIGFzIEV4cHJlc3Npb248c3RyaW5nPilcblx0XHQ6IChhbm5vdGF0aW9uRXhwcmVzc2lvbih1bml0LCByZWxhdGl2ZUxvY2F0aW9uKSBhcyBFeHByZXNzaW9uPHN0cmluZz4pO1xuXHRyZXR1cm4gYWRkVHlwZUluZm9ybWF0aW9uKFtwcm9wZXJ0eUJpbmRpbmdFeHByZXNzaW9uLCB1bml0QmluZGluZ0V4cHJlc3Npb25dLCBjb21wbGV4VHlwZSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0QWxpZ25tZW50RXhwcmVzc2lvbiA9IGZ1bmN0aW9uKFxuXHRvQ29tcHV0ZWRFZGl0TW9kZTogRXhwcmVzc2lvbjxzdHJpbmc+LFxuXHRzQWxpZ25EaXNwbGF5OiBzdHJpbmcgPSBcIkJlZ2luXCIsXG5cdHNBbGlnbkVkaXQ6IHN0cmluZyA9IFwiQmVnaW5cIlxuKTogQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPiB8IEV4cHJlc3Npb248c3RyaW5nPiB7XG5cdHJldHVybiBjb21waWxlQmluZGluZyhpZkVsc2UoZXF1YWwob0NvbXB1dGVkRWRpdE1vZGUsIFwiRGlzcGxheVwiKSwgc0FsaWduRGlzcGxheSwgc0FsaWduRWRpdCkpO1xufTtcblxuLyoqXG4gKiBGb3JtYXR0ZXIgaGVscGVyIHRvIHJldHJpZXZlIHRoZSBjb252ZXJ0ZXJDb250ZXh0IGZyb20gdGhlIG1ldGFtb2RlbCBjb250ZXh0LlxuICpcbiAqIEBwYXJhbSB7Q29udGV4dH0gb0NvbnRleHQgVGhlIG9yaWdpbmFsIG1ldGFtb2RlbCBjb250ZXh0XG4gKiBAcGFyYW0ge0NvbXB1dGVkQW5ub3RhdGlvbkludGVyZmFjZX0gb0ludGVyZmFjZSBUaGUgY3VycmVudCB0ZW1wbGF0aW5nIGNvbnRleHRcbiAqIEByZXR1cm5zIHtvYmplY3R9IFRoZSBDb252ZXJ0ZXJDb250ZXh0IHJlcHJlc2VudGluZyB0aGF0IG9iamVjdFxuICovXG5leHBvcnQgY29uc3QgZ2V0Q29udmVydGVyQ29udGV4dCA9IGZ1bmN0aW9uKG9Db250ZXh0OiBNZXRhTW9kZWxDb250ZXh0LCBvSW50ZXJmYWNlOiBDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2UpOiBvYmplY3QgfCBudWxsIHtcblx0aWYgKG9JbnRlcmZhY2UgJiYgb0ludGVyZmFjZS5jb250ZXh0KSB7XG5cdFx0cmV0dXJuIGNvbnZlcnRNZXRhTW9kZWxDb250ZXh0KG9JbnRlcmZhY2UuY29udGV4dCk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuZ2V0Q29udmVydGVyQ29udGV4dC5yZXF1aXJlc0lDb250ZXh0ID0gdHJ1ZTtcblxuLyoqXG4gKiBGb3JtYXR0ZXIgaGVscGVyIHRvIHJldHJpZXZlIHRoZSBkYXRhIG1vZGVsIG9iamVjdHMgdGhhdCBhcmUgaW52b2x2ZWQgZnJvbSB0aGUgbWV0YW1vZGVsIGNvbnRleHQuXG4gKlxuICogQHBhcmFtIHtDb250ZXh0fSBvQ29udGV4dCBUaGUgb3JpZ2luYWwgT0RhdGFNZXRhTW9kZWwgY29udGV4dFxuICogQHBhcmFtIHtDb21wdXRlZEFubm90YXRpb25JbnRlcmZhY2V9IG9JbnRlcmZhY2UgVGhlIGN1cnJlbnQgdGVtcGxhdGluZyBjb250ZXh0XG4gKiBAcmV0dXJucyB7b2JqZWN0W119IEFuIGFycmF5IG9mIGVudGl0eXNldHMgYW5kIG5hdnByb3BlcnRpZXMgdGhhdCBhcmUgaW52b2x2ZWQgdG8gZ2V0IHRvIGEgc3BlY2lmaWMgb2JqZWN0IGluIHRoZSBtZXRhbW9kZWxcbiAqL1xuZXhwb3J0IGNvbnN0IGdldERhdGFNb2RlbE9iamVjdFBhdGggPSBmdW5jdGlvbihcblx0b0NvbnRleHQ6IE1ldGFNb2RlbENvbnRleHQsXG5cdG9JbnRlcmZhY2U6IENvbXB1dGVkQW5ub3RhdGlvbkludGVyZmFjZVxuKTogRGF0YU1vZGVsT2JqZWN0UGF0aCB8IG51bGwge1xuXHRpZiAob0ludGVyZmFjZSAmJiBvSW50ZXJmYWNlLmNvbnRleHQpIHtcblx0XHRyZXR1cm4gZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzKG9JbnRlcmZhY2UuY29udGV4dCk7XG5cdH1cblx0cmV0dXJuIG51bGw7XG59O1xuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aC5yZXF1aXJlc0lDb250ZXh0ID0gdHJ1ZTtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGV4cHJlc3Npb25CaW5kaW5nIGNyZWF0ZWQgb3V0IG9mIGEgYmluZGluZyBleHByZXNzaW9uLlxuICpcbiAqIEBwYXJhbSB7RXhwcmVzc2lvbjxhbnk+fSBleHByZXNzaW9uIFRoZSBleHByZXNzaW9uIHdoaWNoIG5lZWRzIHRvIGJlIGNvbXBpbGVkXG4gKiBAcmV0dXJucyB7QmluZGluZ0V4cHJlc3Npb248c3RyaW5nPn0gVGhlIGV4cHJlc3Npb24tYmluZGluZyBzdHJpbmdcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEV4cHJlc3Npb25CaW5kaW5nID0gZnVuY3Rpb24oZXhwcmVzc2lvbjogRXhwcmVzc2lvbjxhbnk+KTogQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPiB7XG5cdHJldHVybiBjb21waWxlQmluZGluZyhleHByZXNzaW9uKTtcbn07XG5cbi8qKlxuICogUmV0cmlldmUgdGhlIHRhcmdldCBlbnRpdHlzZXQgZm9yIGEgY29udGV4dCBwYXRoIGlmIGl0IGV4aXN0cy5cbiAqXG4gKiBAcGFyYW0gb0NvbnRleHRcbiAqIEByZXR1cm5zIHtzdHJpbmd9XG4gKi9cbmV4cG9ydCBjb25zdCBnZXRUYXJnZXRFbnRpdHlTZXQgPSBmdW5jdGlvbihvQ29udGV4dDogQ29udGV4dCk6IHN0cmluZyB8IG51bGwge1xuXHRpZiAob0NvbnRleHQpIHtcblx0XHRjb25zdCBvRGF0YU1vZGVsUGF0aCA9IGdldEludm9sdmVkRGF0YU1vZGVsT2JqZWN0cyhvQ29udGV4dCk7XG5cdFx0cmV0dXJuIGdldFRhcmdldEVudGl0eVNldFBhdGgob0RhdGFNb2RlbFBhdGgpO1xuXHR9XG5cblx0cmV0dXJuIG51bGw7XG59O1xuIl19