/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["./AnnotationEnum"], function (AnnotationEnum) {
  "use strict";

  var _exports = {};
  var resolveEnumValue = AnnotationEnum.resolveEnumValue;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var unresolveableExpression = {
    _type: "Unresolveable"
  };
  _exports.unresolveableExpression = unresolveableExpression;

  function escapeXmlAttribute(inputString) {
    return inputString.replace(/[']/g, function (c) {
      switch (c) {
        case "'":
          return "\\'";

        default:
          return c;
      }
    });
  }

  function hasUnresolveableExpression() {
    for (var _len = arguments.length, expressions = new Array(_len), _key = 0; _key < _len; _key++) {
      expressions[_key] = arguments[_key];
    }

    return expressions.find(function (expr) {
      return expr._type === "Unresolveable";
    }) !== undefined;
  }
  /**
   * Check two expressions for (deep) equality.
   *
   * @param a
   * @param b
   * @returns {boolean} `true` if the two expressions are equal
   */


  _exports.hasUnresolveableExpression = hasUnresolveableExpression;

  function _checkExpressionsAreEqual(a, b) {
    if (a._type !== b._type) {
      return false;
    }

    switch (a._type) {
      case "Unresolveable":
        return false;
      // Unresolveable is never equal to anything even itself

      case "Constant":
      case "EmbeddedBinding":
      case "EmbeddedExpressionBinding":
        return a.value === b.value;

      case "Not":
        return _checkExpressionsAreEqual(a.operand, b.operand);

      case "Truthy":
        return _checkExpressionsAreEqual(a.operand, b.operand);

      case "Set":
        return a.operator === b.operator && a.operands.length === b.operands.length && a.operands.every(function (expression) {
          return b.operands.some(function (otherExpression) {
            return _checkExpressionsAreEqual(expression, otherExpression);
          });
        });

      case "IfElse":
        return _checkExpressionsAreEqual(a.condition, b.condition) && _checkExpressionsAreEqual(a.onTrue, b.onTrue) && _checkExpressionsAreEqual(a.onFalse, b.onFalse);

      case "Comparison":
        return a.operator == b.operator && _checkExpressionsAreEqual(a.operand1, b.operand1) && _checkExpressionsAreEqual(a.operand2, b.operand2);

      case "Concat":
        var aExpressions = a.expressions;
        var bExpressions = b.expressions;

        if (aExpressions.length !== bExpressions.length) {
          return false;
        }

        return aExpressions.every(function (expression, index) {
          return _checkExpressionsAreEqual(expression, bExpressions[index]);
        });

      case "Binding":
        return a.modelName === b.modelName && a.path === b.path && a.targetEntitySet === b.targetEntitySet;

      case "DefaultBinding":
        return a.modelName === b.modelName && a.path === b.path;

      case "Formatter":
        return a.fn === b.fn && a.parameters.length === b.parameters.length && a.parameters.every(function (value, index) {
          return _checkExpressionsAreEqual(b.parameters[index], value);
        });

      case "ComplexType":
        return a.type === b.type && a.bindingParameters.length === b.bindingParameters.length && a.bindingParameters.every(function (value, index) {
          return _checkExpressionsAreEqual(b.bindingParameters[index], value);
        });

      case "Function":
        var otherFunction = b;

        if (a.obj === undefined || otherFunction.obj === undefined) {
          return a.obj === otherFunction;
        }

        return a.fn === otherFunction.fn && _checkExpressionsAreEqual(a.obj, otherFunction.obj) && a.parameters.length === otherFunction.parameters.length && a.parameters.every(function (value, index) {
          return _checkExpressionsAreEqual(otherFunction.parameters[index], value);
        });

      case "Ref":
        return a.ref === b.ref;
    }
  }
  /**
   * Converts a nested SetExpression by inlining operands of type SetExpression with the same operator.
   *
   * @param expression The expression to flatten
   * @returns {SetExpression} A new SetExpression with the same operator
   */


  _exports._checkExpressionsAreEqual = _checkExpressionsAreEqual;

  function flattenSetExpression(expression) {
    return expression.operands.reduce(function (result, operand) {
      var candidatesForFlattening = operand._type === "Set" && operand.operator === expression.operator ? operand.operands : [operand];
      candidatesForFlattening.forEach(function (candidate) {
        if (result.operands.every(function (e) {
          return !_checkExpressionsAreEqual(e, candidate);
        })) {
          result.operands.push(candidate);
        }
      });
      return result;
    }, {
      _type: "Set",
      operator: expression.operator,
      operands: []
    });
  }
  /**
   * Detects whether an array of boolean expressions contains an expression and its negation.
   *
   * @param expressions Array of expressions
   * @returns {boolean} `true` if the set of expressions contains an expression and its negation
   */


  function hasOppositeExpressions(expressions) {
    if (expressions.length < 2) {
      return false;
    }

    var i = expressions.length;

    while (i--) {
      var expression = expressions[i];
      var negatedExpression = not(expression);

      for (var j = 0; j < i; j++) {
        if (_checkExpressionsAreEqual(expressions[j], negatedExpression)) {
          return true;
        }
      }
    }

    return false;
  }
  /**
   * Logical `and` expression.
   *
   * The expression is simplified to false if this can be decided statically (that is, if one operand is a constant
   * false or if the expression contains an operand and its negation).
   *
   * @param operands Expressions to connect by `and`
   * @returns {Expression<boolean>} Expression evaluating to boolean
   */


  function and() {
    for (var _len2 = arguments.length, operands = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      operands[_key2] = arguments[_key2];
    }

    var expressions = flattenSetExpression({
      _type: "Set",
      operator: "&&",
      operands: operands.map(wrapPrimitive)
    }).operands;

    if (hasUnresolveableExpression.apply(void 0, _toConsumableArray(expressions))) {
      return unresolveableExpression;
    }

    var isStaticFalse = false;
    var nonTrivialExpression = expressions.filter(function (expression) {
      if (isConstant(expression) && !expression.value) {
        isStaticFalse = true;
      }

      return !isConstant(expression);
    });

    if (isStaticFalse) {
      return constant(false);
    } else if (nonTrivialExpression.length === 0) {
      // Resolve the constant then
      var isValid = expressions.reduce(function (isValid, expression) {
        return isValid && isConstant(expression) && expression.value;
      }, true);
      return constant(isValid);
    } else if (nonTrivialExpression.length === 1) {
      return nonTrivialExpression[0];
    } else if (hasOppositeExpressions(nonTrivialExpression)) {
      return constant(false);
    } else {
      return {
        _type: "Set",
        operator: "&&",
        operands: nonTrivialExpression
      };
    }
  }
  /**
   * Logical `or` expression.
   *
   * The expression is simplified to true if this can be decided statically (that is, if one operand is a constant
   * true or if the expression contains an operand and its negation).
   *
   * @param operands Expressions to connect by `or`
   * @returns {Expression<boolean>} Expression evaluating to boolean
   */


  _exports.and = and;

  function or() {
    for (var _len3 = arguments.length, operands = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      operands[_key3] = arguments[_key3];
    }

    var expressions = flattenSetExpression({
      _type: "Set",
      operator: "||",
      operands: operands.map(wrapPrimitive)
    }).operands;

    if (hasUnresolveableExpression.apply(void 0, _toConsumableArray(expressions))) {
      return unresolveableExpression;
    }

    var isStaticTrue = false;
    var nonTrivialExpression = expressions.filter(function (expression) {
      if (isConstant(expression) && expression.value) {
        isStaticTrue = true;
      }

      return !isConstant(expression) || expression.value;
    });

    if (isStaticTrue) {
      return constant(true);
    } else if (nonTrivialExpression.length === 0) {
      // Resolve the constant then
      var isValid = expressions.reduce(function (isValid, expression) {
        return isValid && isConstant(expression) && expression.value;
      }, true);
      return constant(isValid);
    } else if (nonTrivialExpression.length === 1) {
      return nonTrivialExpression[0];
    } else if (hasOppositeExpressions(nonTrivialExpression)) {
      return constant(true);
    } else {
      return {
        _type: "Set",
        operator: "||",
        operands: nonTrivialExpression
      };
    }
  }
  /**
   * Logical `not` operator.
   *
   * @param operand The expression to reverse
   * @returns {Expression<boolean>} The resulting expression that evaluates to boolean
   */


  _exports.or = or;

  function not(operand) {
    operand = wrapPrimitive(operand);

    if (hasUnresolveableExpression(operand)) {
      return unresolveableExpression;
    } else if (isConstant(operand)) {
      return constant(!operand.value);
    } else if (typeof operand === "object" && operand._type === "Set" && operand.operator === "||" && operand.operands.every(function (expression) {
      return isConstant(expression) || isComparison(expression);
    })) {
      return and.apply(void 0, _toConsumableArray(operand.operands.map(function (expression) {
        return not(expression);
      })));
    } else if (typeof operand === "object" && operand._type === "Set" && operand.operator === "&&" && operand.operands.every(function (expression) {
      return isConstant(expression) || isComparison(expression);
    })) {
      return or.apply(void 0, _toConsumableArray(operand.operands.map(function (expression) {
        return not(expression);
      })));
    } else if (isComparison(operand)) {
      // Create the reverse comparison
      switch (operand.operator) {
        case "!==":
          return equal(operand.operand1, operand.operand2);

        case "<":
          return greaterOrEqual(operand.operand1, operand.operand2);

        case "<=":
          return greaterThan(operand.operand1, operand.operand2);

        case "===":
          return notEqual(operand.operand1, operand.operand2);

        case ">":
          return lessOrEqual(operand.operand1, operand.operand2);

        case ">=":
          return lessThan(operand.operand1, operand.operand2);
      }
    } else if (operand._type === "Not") {
      return operand.operand;
    } else {
      return {
        _type: "Not",
        operand: operand
      };
    }
  }
  /**
   * Evaluates whether a binding expression is equal to true with a loose equality.
   *
   * @param operand The expression to check
   * @returns {Expression<boolean>} The resulting expression that evaluates to boolean
   */


  _exports.not = not;

  function isTruthy(operand) {
    if (isConstant(operand)) {
      return constant(!!operand.value);
    } else {
      return {
        _type: "Truthy",
        operand: operand
      };
    }
  }
  /**
   * Creates a binding expression that will be evaluated by the corresponding model.
   *
   * @template TargetType
   * @param path The path on the model
   * @param [modelName] The name of the model
   * @param [visitedNavigationPaths] The paths from the root entitySet
   * @param [pathVisitor] A function to modify the resulting path
   * @returns {BindingExpressionExpression<TargetType>} The default binding expression
   */


  _exports.isTruthy = isTruthy;

  function bindingExpression(path, modelName) {
    var visitedNavigationPaths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var pathVisitor = arguments.length > 3 ? arguments[3] : undefined;

    if (path === undefined) {
      return unresolveableExpression;
    }

    var targetPath;

    if (pathVisitor) {
      targetPath = pathVisitor(path);

      if (targetPath === undefined) {
        return unresolveableExpression;
      }
    } else {
      var localPath = visitedNavigationPaths.concat();
      localPath.push(path);
      targetPath = localPath.join("/");
    }

    return {
      _type: "Binding",
      modelName: modelName,
      path: targetPath
    };
  }

  _exports.bindingExpression = bindingExpression;

  /**
   * Creates a constant expression based on a primitive value.
   *
   * @template T
   * @param value The constant to wrap in an expression
   * @returns {ConstantExpression<T>} The constant expression
   */
  function constant(value) {
    var constantValue;

    if (typeof value === "object" && value !== null && value !== undefined) {
      if (Array.isArray(value)) {
        constantValue = value.map(wrapPrimitive);
      } else if (isPrimitiveObject(value)) {
        constantValue = value.valueOf();
      } else {
        var val = value;
        var obj = Object.keys(val).reduce(function (obj, key) {
          var value = wrapPrimitive(val[key]);

          if (value._type !== "Constant" || value.value !== undefined) {
            obj[key] = value;
          }

          return obj;
        }, {});
        constantValue = obj;
      }
    } else {
      constantValue = value;
    }

    return {
      _type: "Constant",
      value: constantValue
    };
  }

  _exports.constant = constant;

  function resolveBindingString(value, targetType) {
    if (value !== undefined && typeof value === "string" && value.startsWith("{")) {
      if (value.startsWith("{=")) {
        // Expression binding, we can just remove the outer binding things
        return {
          _type: "EmbeddedExpressionBinding",
          value: value
        };
      } else {
        return {
          _type: "EmbeddedBinding",
          value: value
        };
      }
    } else {
      switch (targetType) {
        case "boolean":
          if (typeof value === "string" && (value === "true" || value === "false")) {
            return constant(value === "true");
          }

          return constant(value);

        default:
          return constant(value);
      }
    }
  }
  /**
   * A named reference.
   *
   * @see fn
   *
   * @param ref Reference
   * @returns {ReferenceExpression} The object reference binding part
   */


  _exports.resolveBindingString = resolveBindingString;

  function ref(ref) {
    return {
      _type: "Ref",
      ref: ref
    };
  }
  /**
   * Determine whether the type is an expression.
   *
   * Every object having a property named `_type` of some value is considered an expression, even if there is actually
   * no such expression type supported.
   *
   * @param something Type to check
   * @returns {boolean} `true` if the type is considered to be an expression
   */


  _exports.ref = ref;

  function isExpression(something) {
    return something !== null && typeof something === "object" && something._type !== undefined;
  }
  /**
   * Wrap a primitive into a constant expression if it is not already an expression.
   *
   * @template T
   * @param something The object to wrap in a Constant expression
   * @returns {Expression<T>} Either the original object or the wrapped one depending on the case
   */


  function wrapPrimitive(something) {
    if (isExpression(something)) {
      return something;
    }

    return constant(something);
  }
  /**
   * Checks if the expression or value provided is constant or not.
   *
   * @template T The target type
   * @param  maybeConstant The expression or primitive value that is to be checked
   * @returns {boolean} `true` if it is constant
   */


  function isConstant(maybeConstant) {
    return typeof maybeConstant !== "object" || maybeConstant._type === "Constant";
  }
  /**
   * Checks if the expression or value provided is binding or not.
   *
   * @template T The target type
   * @param  maybeBinding The expression or primitive value that is to be checked
   * @returns {boolean} `true` if it is binding
   */


  _exports.isConstant = isConstant;

  function isBinding(maybeBinding) {
    return typeof maybeBinding === "object" && maybeBinding._type === "Binding";
  }
  /**
   * Checks if the expression provided is a comparison or not.
   *
   * @template T The target type
   * @param expression The expression
   * @returns {boolean} `true` if the expression is a ComparisonExpression
   */


  _exports.isBinding = isBinding;

  function isComparison(expression) {
    return expression._type === "Comparison";
  }

  function isPrimitiveObject(objectType) {
    switch (objectType.constructor.name) {
      case "String":
      case "Number":
      case "Boolean":
        return true;

      default:
        return false;
    }
  }
  /**
   * Check if the passed annotation expression is a ComplexAnnotationExpression.
   *
   * @template T The target type
   * @param  annotationExpression The annotation expression to evaluate
   * @returns {boolean} `true` if the object is a {ComplexAnnotationExpression}
   */


  function isComplexAnnotationExpression(annotationExpression) {
    return typeof annotationExpression === "object" && !isPrimitiveObject(annotationExpression);
  }
  /**
   * Generate the corresponding expression for a given annotation expression.
   *
   * @template T The target type
   * @param annotationExpression The source annotation expression
   * @param visitedNavigationPaths The path from the root entity set
   * @param defaultValue Default value if the annotationExpression is undefined
   * @param pathVisitor A function to modify the resulting path
   * @returns {Expression<T>} The expression equivalent to that annotation expression
   */


  function annotationExpression(annotationExpression) {
    var visitedNavigationPaths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var defaultValue = arguments.length > 2 ? arguments[2] : undefined;
    var pathVisitor = arguments.length > 3 ? arguments[3] : undefined;

    if (annotationExpression === undefined) {
      return wrapPrimitive(defaultValue);
    }

    if (!isComplexAnnotationExpression(annotationExpression)) {
      return constant(annotationExpression);
    } else {
      switch (annotationExpression.type) {
        case "Path":
          return bindingExpression(annotationExpression.path, undefined, visitedNavigationPaths, pathVisitor);

        case "If":
          return annotationIfExpression(annotationExpression.If, visitedNavigationPaths, pathVisitor);

        case "Not":
          return not(parseAnnotationCondition(annotationExpression.Not, visitedNavigationPaths, pathVisitor));

        case "Eq":
          return equal(parseAnnotationCondition(annotationExpression.Eq[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationExpression.Eq[1], visitedNavigationPaths, pathVisitor));

        case "Ne":
          return notEqual(parseAnnotationCondition(annotationExpression.Ne[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationExpression.Ne[1], visitedNavigationPaths, pathVisitor));

        case "Gt":
          return greaterThan(parseAnnotationCondition(annotationExpression.Gt[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationExpression.Gt[1], visitedNavigationPaths, pathVisitor));

        case "Ge":
          return greaterOrEqual(parseAnnotationCondition(annotationExpression.Ge[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationExpression.Ge[1], visitedNavigationPaths, pathVisitor));

        case "Lt":
          return lessThan(parseAnnotationCondition(annotationExpression.Lt[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationExpression.Lt[1], visitedNavigationPaths, pathVisitor));

        case "Le":
          return lessOrEqual(parseAnnotationCondition(annotationExpression.Le[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationExpression.Le[1], visitedNavigationPaths, pathVisitor));

        case "Or":
          return or.apply(void 0, _toConsumableArray(annotationExpression.Or.map(function (orCondition) {
            return parseAnnotationCondition(orCondition, visitedNavigationPaths, pathVisitor);
          })));

        case "And":
          return and.apply(void 0, _toConsumableArray(annotationExpression.And.map(function (andCondition) {
            return parseAnnotationCondition(andCondition, visitedNavigationPaths, pathVisitor);
          })));

        case "Apply":
          return annotationApplyExpression(annotationExpression, visitedNavigationPaths, pathVisitor);
      }
    }
  }
  /**
   * Parse the annotation condition into an expression.
   *
   * @template T The target type
   * @param annotationValue The condition or value from the annotation
   * @param visitedNavigationPaths The path from the root entity set
   * @param pathVisitor A function to modify the resulting path
   * @returns {Expression<T>} An equivalent expression
   */


  _exports.annotationExpression = annotationExpression;

  function parseAnnotationCondition(annotationValue) {
    var visitedNavigationPaths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var pathVisitor = arguments.length > 2 ? arguments[2] : undefined;

    if (annotationValue === null || typeof annotationValue !== "object") {
      return constant(annotationValue);
    } else if (annotationValue.hasOwnProperty("$Or")) {
      return or.apply(void 0, _toConsumableArray(annotationValue.$Or.map(function (orCondition) {
        return parseAnnotationCondition(orCondition, visitedNavigationPaths, pathVisitor);
      })));
    } else if (annotationValue.hasOwnProperty("$And")) {
      return and.apply(void 0, _toConsumableArray(annotationValue.$And.map(function (andCondition) {
        return parseAnnotationCondition(andCondition, visitedNavigationPaths, pathVisitor);
      })));
    } else if (annotationValue.hasOwnProperty("$Not")) {
      return not(parseAnnotationCondition(annotationValue.$Not[0], visitedNavigationPaths, pathVisitor));
    } else if (annotationValue.hasOwnProperty("$Eq")) {
      return equal(parseAnnotationCondition(annotationValue.$Eq[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationValue.$Eq[1], visitedNavigationPaths, pathVisitor));
    } else if (annotationValue.hasOwnProperty("$Ne")) {
      return notEqual(parseAnnotationCondition(annotationValue.$Ne[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationValue.$Ne[1], visitedNavigationPaths, pathVisitor));
    } else if (annotationValue.hasOwnProperty("$Gt")) {
      return greaterThan(parseAnnotationCondition(annotationValue.$Gt[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationValue.$Gt[1], visitedNavigationPaths, pathVisitor));
    } else if (annotationValue.hasOwnProperty("$Ge")) {
      return greaterOrEqual(parseAnnotationCondition(annotationValue.$Ge[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationValue.$Ge[1], visitedNavigationPaths, pathVisitor));
    } else if (annotationValue.hasOwnProperty("$Lt")) {
      return lessThan(parseAnnotationCondition(annotationValue.$Lt[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationValue.$Lt[1], visitedNavigationPaths, pathVisitor));
    } else if (annotationValue.hasOwnProperty("$Le")) {
      return lessOrEqual(parseAnnotationCondition(annotationValue.$Le[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationValue.$Le[1], visitedNavigationPaths, pathVisitor));
    } else if (annotationValue.hasOwnProperty("$Path")) {
      return bindingExpression(annotationValue.$Path, undefined, visitedNavigationPaths, pathVisitor);
    } else if (annotationValue.hasOwnProperty("$Apply")) {
      return annotationExpression({
        type: "Apply",
        Function: annotationValue.$Function,
        Apply: annotationValue.$Apply
      }, visitedNavigationPaths, undefined, pathVisitor);
    } else if (annotationValue.hasOwnProperty("$If")) {
      return annotationExpression({
        type: "If",
        If: annotationValue.$If
      }, visitedNavigationPaths, undefined, pathVisitor);
    } else if (annotationValue.hasOwnProperty("$EnumMember")) {
      return constant(resolveEnumValue(annotationValue.$EnumMember));
    } else {
      return constant(false);
    }
  }
  /**
   * Process the {IfAnnotationExpressionValue} into an expression.
   *
   * @template T The target type
   * @param annotationIfExpression An If expression returning the type T
   * @param visitedNavigationPaths The path from the root entity set
   * @param pathVisitor A function to modify the resulting path
   * @returns {Expression<T>} The equivalent ifElse expression
   */


  function annotationIfExpression(annotationIfExpression) {
    var visitedNavigationPaths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var pathVisitor = arguments.length > 2 ? arguments[2] : undefined;
    return ifElse(parseAnnotationCondition(annotationIfExpression[0], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationIfExpression[1], visitedNavigationPaths, pathVisitor), parseAnnotationCondition(annotationIfExpression[2], visitedNavigationPaths, pathVisitor));
  }

  _exports.annotationIfExpression = annotationIfExpression;

  function annotationApplyExpression(annotationApplyExpression) {
    var visitedNavigationPaths = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var pathVisitor = arguments.length > 2 ? arguments[2] : undefined;

    switch (annotationApplyExpression.Function) {
      case "odata.concat":
        return concat.apply(void 0, _toConsumableArray(annotationApplyExpression.Apply.map(function (applyParam) {
          var applyParamConverted = applyParam;

          if (applyParam.hasOwnProperty("$Path")) {
            applyParamConverted = {
              type: "Path",
              path: applyParam.$Path
            };
          } else if (applyParam.hasOwnProperty("$If")) {
            applyParamConverted = {
              type: "If",
              If: applyParam.$If
            };
          } else if (applyParam.hasOwnProperty("$Apply")) {
            applyParamConverted = {
              type: "Apply",
              Function: applyParam.$Function,
              Apply: applyParam.$Apply
            };
          }

          return annotationExpression(applyParamConverted, visitedNavigationPaths, undefined, pathVisitor);
        })));
        break;
    }
  }
  /**
   * Generic helper for the comparison operations (equal, notEqual, ...).
   *
   * @template T The target type
   * @param operator The operator to apply
   * @param leftOperand The operand on the left side of the operator
   * @param rightOperand The operand on the right side of the operator
   * @returns {Expression<boolean>} An expression representing the comparison
   */


  _exports.annotationApplyExpression = annotationApplyExpression;

  function comparison(operator, leftOperand, rightOperand) {
    var leftExpression = wrapPrimitive(leftOperand);
    var rightExpression = wrapPrimitive(rightOperand);

    if (hasUnresolveableExpression(leftExpression, rightExpression)) {
      return unresolveableExpression;
    }

    if (isConstant(leftExpression) && isConstant(rightExpression)) {
      if (leftExpression.value === undefined || rightExpression.value === undefined) {
        return constant(leftExpression.value === rightExpression.value);
      }

      switch (operator) {
        case "!==":
          return constant(leftExpression.value !== rightExpression.value);

        case "<":
          return constant(leftExpression.value < rightExpression.value);

        case "<=":
          return constant(leftExpression.value <= rightExpression.value);

        case ">":
          return constant(leftExpression.value > rightExpression.value);

        case ">=":
          return constant(leftExpression.value >= rightExpression.value);

        case "===":
        default:
          return constant(leftExpression.value === rightExpression.value);
      }
    } else {
      return {
        _type: "Comparison",
        operator: operator,
        operand1: leftExpression,
        operand2: rightExpression
      };
    }
  }
  /**
   * Comparison: "equal" (===).
   *
   * @template T The target type
   * @param leftOperand The operand on the left side
   * @param rightOperand The operand on the right side of the comparison
   * @returns {Expression<boolean>} An expression representing the comparison
   */


  function equal(leftOperand, rightOperand) {
    var leftExpression = wrapPrimitive(leftOperand);
    var rightExpression = wrapPrimitive(rightOperand);

    if (hasUnresolveableExpression(leftExpression, rightExpression)) {
      return unresolveableExpression;
    }

    if (_checkExpressionsAreEqual(leftExpression, rightExpression)) {
      return constant(true);
    } // ((a === c) === true) => (a === c)


    if (leftExpression._type === "Comparison" && isConstant(rightExpression) && rightExpression.value === true) {
      return leftExpression;
    } else if (leftExpression._type === "Comparison" && isConstant(rightExpression) && rightExpression.value === true) {
      // ((a === c) === false) => !(a === c)
      return not(leftExpression);
    } else if (leftExpression._type === "IfElse" && _checkExpressionsAreEqual(leftExpression.onTrue, rightExpression)) {
      // (if(xxxx) { aaa } else { bbb } ) === aaa )
      return or(leftExpression.condition, equal(leftExpression.onFalse, rightExpression));
    } else if (leftExpression._type === "IfElse" && _checkExpressionsAreEqual(leftExpression.onFalse, rightExpression)) {
      return or(not(leftExpression.condition), equal(leftExpression.onTrue, rightExpression));
    } else if (leftExpression._type === "IfElse" && isConstant(leftExpression.onTrue) && isConstant(rightExpression) && isConstant(leftExpression.onFalse) && !_checkExpressionsAreEqual(leftExpression.onTrue, rightExpression) && !_checkExpressionsAreEqual(leftExpression.onFalse, rightExpression)) {
      return constant(false);
    }

    return comparison("===", leftExpression, rightExpression);
  }
  /**
   * Comparison: "not equal" (!==).
   *
   * @template T The target type
   * @param leftOperand The operand on the left side
   * @param rightOperand The operand on the right side of the comparison
   * @returns {Expression<boolean>} An expression representing the comparison
   */


  _exports.equal = equal;

  function notEqual(leftOperand, rightOperand) {
    var leftExpression = wrapPrimitive(leftOperand);
    var rightExpression = wrapPrimitive(rightOperand);

    if (_checkExpressionsAreEqual(leftExpression, rightExpression)) {
      return constant(false);
    } // ((a === c) !== true) => !(a === c)


    if (leftExpression._type === "Comparison" && isConstant(rightExpression) && rightExpression.value === true) {
      return not(leftExpression);
    } else if (leftExpression._type === "Comparison" && isConstant(rightExpression) && rightExpression.value === true) {
      // ((a === c) !== false) => (a === c)
      return leftExpression;
    } else if (leftExpression._type === "IfElse" && _checkExpressionsAreEqual(leftExpression.onTrue, rightExpression)) {
      return and(not(leftExpression.condition), notEqual(leftExpression.onFalse, rightExpression));
    } else if (leftExpression._type === "IfElse" && _checkExpressionsAreEqual(leftExpression.onFalse, rightExpression)) {
      return and(leftExpression.condition, notEqual(leftExpression.onTrue, rightExpression));
    } else if (leftExpression._type === "IfElse" && isConstant(leftExpression.onTrue) && isConstant(rightExpression) && isConstant(leftExpression.onFalse) && !_checkExpressionsAreEqual(leftExpression.onTrue, rightExpression) && !_checkExpressionsAreEqual(leftExpression.onFalse, rightExpression)) {
      // If the left expression is an if else where both onTrue and onFalse are not equals to the right expression -> simplify as true
      return constant(true);
    }

    return comparison("!==", leftExpression, rightExpression);
  }
  /**
   * Comparison: "greater or equal" (>=).
   *
   * @template T The target type
   * @param leftOperand The operand on the left side
   * @param rightOperand The operand on the right side of the comparison
   * @returns {Expression<boolean>} An expression representing the comparison
   */


  _exports.notEqual = notEqual;

  function greaterOrEqual(leftOperand, rightOperand) {
    return comparison(">=", leftOperand, rightOperand);
  }
  /**
   * Comparison: "greater than" (>).
   *
   * @template T The target type
   * @param leftOperand The operand on the left side
   * @param rightOperand The operand on the right side of the comparison
   * @returns {Expression<boolean>} An expression representing the comparison
   */


  _exports.greaterOrEqual = greaterOrEqual;

  function greaterThan(leftOperand, rightOperand) {
    return comparison(">", leftOperand, rightOperand);
  }
  /**
   * Comparison: "less or equal" (<=).
   *
   * @template T The target type
   * @param leftOperand The operand on the left side
   * @param rightOperand The operand on the right side of the comparison
   * @returns {Expression<boolean>} An expression representing the comparison
   */


  _exports.greaterThan = greaterThan;

  function lessOrEqual(leftOperand, rightOperand) {
    return comparison("<=", leftOperand, rightOperand);
  }
  /**
   * Comparison: "less than" (<).
   *
   * @template T The target type
   * @param leftOperand The operand on the left side
   * @param rightOperand The operand on the right side of the comparison
   * @returns {Expression<boolean>} An expression representing the comparison
   */


  _exports.lessOrEqual = lessOrEqual;

  function lessThan(leftOperand, rightOperand) {
    return comparison("<", leftOperand, rightOperand);
  }
  /**
   * If-then-else expression.
   *
   * Evaluates to onTrue if the condition evaluates to true, else evaluates to onFalse.
   *
   * @template T The target type
   * @param condition The condition to evaluate
   * @param onTrue Expression result if the condition evaluates to true
   * @param onFalse Expression result if the condition evaluates to false
   * @returns {Expression<T>} The expression that represents this conditional check
   */


  _exports.lessThan = lessThan;

  function ifElse(condition, onTrue, onFalse) {
    var conditionExpression = wrapPrimitive(condition);
    var onTrueExpression = wrapPrimitive(onTrue);
    var onFalseExpression = wrapPrimitive(onFalse);

    if (hasUnresolveableExpression(conditionExpression, onTrueExpression, onFalseExpression)) {
      return unresolveableExpression;
    } // swap branches if the condition is a negation


    if (conditionExpression._type === "Not") {
      // ifElse(not(X), a, b) --> ifElse(X, b, a)
      var _ref = [onFalseExpression, onTrueExpression];
      onTrueExpression = _ref[0];
      onFalseExpression = _ref[1];
      conditionExpression = not(conditionExpression);
    } // inline nested if-else expressions: onTrue branch
    // ifElse(X, ifElse(X, a, b), c) ==> ifElse(X, a, c)


    if (onTrueExpression._type === "IfElse" && _checkExpressionsAreEqual(conditionExpression, onTrueExpression.condition)) {
      onTrueExpression = onTrueExpression.onTrue;
    } // inline nested if-else expressions: onFalse branch
    // ifElse(X, a, ifElse(X, b, c)) ==> ifElse(X, a, c)


    if (onFalseExpression._type === "IfElse" && _checkExpressionsAreEqual(conditionExpression, onFalseExpression.condition)) {
      onFalseExpression = onFalseExpression.onFalse;
    } // inline nested if-else expressions: condition


    if (conditionExpression._type === "IfElse") {
      if (isConstant(conditionExpression.onFalse) && !conditionExpression.onFalse.value && isConstant(conditionExpression.onTrue) && conditionExpression.onTrue.value) {
        // ifElse(ifElse(X, true, false), a, b) ==> ifElse(X, a, b)
        conditionExpression = conditionExpression.condition;
      } else if (isConstant(conditionExpression.onFalse) && conditionExpression.onFalse.value && isConstant(conditionExpression.onTrue) && !conditionExpression.onTrue.value) {
        // ifElse(ifElse(X, false, true), a, b) ==> ifElse(not(X), a, b)
        conditionExpression = not(conditionExpression.condition);
      } else if (isConstant(conditionExpression.onTrue) && !conditionExpression.onTrue.value && !isConstant(conditionExpression.onFalse)) {
        // ifElse(ifElse(X, false, a), b, c) ==> ifElse(and(not(X), a), b, c)
        conditionExpression = and(not(conditionExpression.condition), conditionExpression.onFalse);
      }
    } // again swap branches if needed (in case one of the optimizations above led to a negated condition)


    if (conditionExpression._type === "Not") {
      // ifElse(not(X), a, b) --> ifElse(X, b, a)
      var _ref2 = [onFalseExpression, onTrueExpression];
      onTrueExpression = _ref2[0];
      onFalseExpression = _ref2[1];
      conditionExpression = not(conditionExpression);
    } // compute expression result for constant conditions


    if (isConstant(conditionExpression)) {
      return conditionExpression.value ? onTrueExpression : onFalseExpression;
    } // compute expression result if onTrue and onFalse branches are equal


    if (_checkExpressionsAreEqual(onTrueExpression, onFalseExpression)) {
      return onTrueExpression;
    } // If either trueExpression or falseExpression is a value equals to false the expression can be simplified
    // If(Condition) Then XXX Else False -> Condition && XXX


    if (isConstant(onFalseExpression) && onFalseExpression.value === false) {
      return and(conditionExpression, onTrueExpression);
    } // If(Condition) Then False Else XXX -> !Condition && XXX


    if (isConstant(onTrueExpression) && onTrueExpression.value === false) {
      return and(not(conditionExpression), onFalseExpression);
    }

    return {
      _type: "IfElse",
      condition: conditionExpression,
      onTrue: onTrueExpression,
      onFalse: onFalseExpression
    };
  }
  /**
   * Checks whether the current expression has a reference to the default model (undefined).
   *
   * @param expression The expression to evaluate
   * @returns {boolean} `true` if there is a reference to the default context
   */


  _exports.ifElse = ifElse;

  function hasReferenceToDefaultContext(expression) {
    switch (expression._type) {
      case "Constant":
      case "Formatter":
      case "ComplexType":
        return false;

      case "Set":
        return expression.operands.some(hasReferenceToDefaultContext);

      case "Binding":
        return expression.modelName === undefined;

      case "Comparison":
        return hasReferenceToDefaultContext(expression.operand1) || hasReferenceToDefaultContext(expression.operand2);

      case "DefaultBinding":
        return true;

      case "IfElse":
        return hasReferenceToDefaultContext(expression.condition) || hasReferenceToDefaultContext(expression.onTrue) || hasReferenceToDefaultContext(expression.onFalse);

      case "Not":
      case "Truthy":
        return hasReferenceToDefaultContext(expression.operand);

      default:
        return false;
    }
  }

  /**
   * Calls a formatter function to process the parameters.
   * If requireContext is set to true and no context is passed a default context will be added automatically.
   *
   * @template T
   * @template U
   * @param parameters The list of parameter that should match the type and number of the formatter function
   * @param formatterFunction The function to call
   * @param [contextEntityType] The context entity type to consider
   * @returns {Expression<T>} The corresponding expression
   */
  function formatResult(parameters, formatterFunction, contextEntityType) {
    var parameterExpressions = parameters.map(wrapPrimitive);

    if (hasUnresolveableExpression.apply(void 0, _toConsumableArray(parameterExpressions))) {
      return unresolveableExpression;
    }

    if (!!contextEntityType) {
      // Otherwise, if the context is required and no context is provided make sure to add the default binding
      if (!parameterExpressions.some(hasReferenceToDefaultContext)) {
        contextEntityType.keys.forEach(function (key) {
          return parameterExpressions.push(bindingExpression(key.name, ""));
        });
      }
    } // FormatterName can be of format sap.fe.core.xxx#methodName to have multiple formatter in one class


    var _formatterFunction$__ = formatterFunction.__functionName.split("#"),
        _formatterFunction$__2 = _slicedToArray(_formatterFunction$__, 2),
        formatterClass = _formatterFunction$__2[0],
        formatterName = _formatterFunction$__2[1];

    if (!!formatterName && formatterName.length > 0) {
      parameterExpressions.unshift(constant(formatterName));
    }

    return {
      _type: "Formatter",
      fn: formatterClass,
      parameters: parameterExpressions
    };
  }
  /**
   * Calls a complex type  to process the parameters.
   * If requireContext is set to true and no context is passed a default context will be added automatically.
   *
   * @template T
   * @template U
   * @param parameters The list of parameter that should match the type for the compplex type
   * @param type The complex type to use
   * @param [contextEntityType] The context entity type to consider
   * @returns {Expression<T>} The corresponding expression
   */


  _exports.formatResult = formatResult;

  function addTypeInformation(parameters, type, contextEntityType) {
    var _ref3, _ref3$type;

    var parameterExpressions = parameters.map(wrapPrimitive);

    if (hasUnresolveableExpression.apply(void 0, _toConsumableArray(parameterExpressions))) {
      return unresolveableExpression;
    } // If there is only one parameter and it is a constant and we don't expect the context then return the constant


    if (parameterExpressions.length === 1 && isConstant(parameterExpressions[0]) && !contextEntityType) {
      return parameterExpressions[0];
    } else if (!!contextEntityType) {
      // Otherwise, if the context is required and no context is provided make sure to add the default binding
      if (!parameterExpressions.some(hasReferenceToDefaultContext)) {
        contextEntityType.keys.forEach(function (key) {
          return parameterExpressions.push(bindingExpression(key.name, ""));
        });
      }
    }

    var oFormatOptions = ((_ref3 = parameters[0]) === null || _ref3 === void 0 ? void 0 : (_ref3$type = _ref3.type) === null || _ref3$type === void 0 ? void 0 : _ref3$type.indexOf("sap.ui.model.odata.type.Int")) === 0 ? {
      parseAsString: false,
      emptyString: ""
    } : {};
    return {
      _type: "ComplexType",
      type: type,
      formatOptions: oFormatOptions,
      parameters: {},
      bindingParameters: parameterExpressions
    };
  }
  /**
   * Function call, optionally with arguments.
   *
   * @param fn Function name or reference to function
   * @param parameters Arguments
   * @param on Object to call the function on
   * @returns {FunctionExpression<T>} Expression representing the function call (not the result of the function call!)
   */


  _exports.addTypeInformation = addTypeInformation;

  function fn(fn, parameters, on) {
    var functionName = typeof fn === "string" ? fn : fn.__functionName;
    return {
      _type: "Function",
      obj: on !== undefined ? wrapPrimitive(on) : undefined,
      fn: functionName,
      parameters: parameters.map(wrapPrimitive)
    };
  }
  /**
   * Shortcut function to determine if a binding value is null, undefined or empty.
   *
   * @param expression
   * @returns A boolean expression evaluating the fact that the current element is empty
   */


  _exports.fn = fn;

  function isEmpty(expression) {
    if (expression._type === "Concat") {
      return or.apply(void 0, _toConsumableArray(expression.expressions.map(isEmpty)));
    }

    return or(equal(expression, ""), equal(expression, undefined), equal(expression, null));
  }

  _exports.isEmpty = isEmpty;

  function concat() {
    for (var _len4 = arguments.length, inExpressions = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      inExpressions[_key4] = arguments[_key4];
    }

    var expressions = inExpressions.map(wrapPrimitive);

    if (hasUnresolveableExpression.apply(void 0, _toConsumableArray(expressions))) {
      return unresolveableExpression;
    }

    if (expressions.every(isConstant)) {
      return constant(expressions.reduce(function (concatenated, value) {
        return concatenated + value.value.toString();
      }, ""));
    }

    return {
      _type: "Concat",
      expressions: expressions
    };
  }

  _exports.concat = concat;

  function transformRecursively(inExpression, expressionType, transformFunction) {
    var includeAllExpression = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var expression = inExpression;

    switch (expression._type) {
      case "Function":
        expression.parameters = expression.parameters.map(function (expression) {
          return transformRecursively(expression, expressionType, transformFunction, includeAllExpression);
        });
        break;

      case "Concat":
        expression.expressions = expression.expressions.map(function (expression) {
          return transformRecursively(expression, expressionType, transformFunction, includeAllExpression);
        });
        break;

      case "ComplexType":
        expression.bindingParameters = expression.bindingParameters.map(function (expression) {
          return transformRecursively(expression, expressionType, transformFunction, includeAllExpression);
        });
        break;

      case "Formatter":
        expression.parameters = expression.parameters.map(function (expression) {
          return transformRecursively(expression, expressionType, transformFunction, includeAllExpression);
        });
        break;

      case "IfElse":
        var onTrue = transformRecursively(expression.onTrue, expressionType, transformFunction, includeAllExpression);
        var onFalse = transformRecursively(expression.onFalse, expressionType, transformFunction, includeAllExpression);
        var condition = expression.condition;

        if (includeAllExpression) {
          condition = transformRecursively(expression.condition, expressionType, transformFunction, includeAllExpression);
        }

        expression = ifElse(condition, onTrue, onFalse);
        break;

      case "Not":
        if (includeAllExpression) {
          var operand = transformRecursively(expression.operand, expressionType, transformFunction, includeAllExpression);
          expression = not(operand);
        }

        break;

      case "Truthy":
        break;

      case "Set":
        if (includeAllExpression) {
          expression.operands = expression.operands.map(function (expression) {
            return transformRecursively(expression, expressionType, transformFunction, includeAllExpression);
          });
        }

        break;

      case "Comparison":
        if (includeAllExpression) {
          var operand1 = transformRecursively(expression.operand1, expressionType, transformFunction, includeAllExpression);
          var operand2 = transformRecursively(expression.operand2, expressionType, transformFunction, includeAllExpression);
          expression = comparison(expression.operator, operand1, operand2);
        }

        break;

      case "DefaultBinding":
      case "Ref":
      case "Binding":
      case "Constant":
        // Do nothing
        break;
    }

    if (expressionType === expression._type) {
      expression = transformFunction(inExpression);
    }

    return expression;
  }

  _exports.transformRecursively = transformRecursively;

  /**
   * Compile an expression into an expression binding.
   *
   * @template T The target type
   * @param expression The expression to compile
   * @param embeddedInBinding Whether the expression to compile is embedded into another expression
   * @param keepTargetType Keep the target type of the embedded bindings instead of casting them to any
   * @returns {BindingExpression<T>} The corresponding expression binding
   */
  function compileBinding(expression) {
    var embeddedInBinding = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var keepTargetType = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var expr = wrapPrimitive(expression);
    var embeddedSeparator = keepTargetType ? "$" : "%";
    var outProperty = "";

    switch (expr._type) {
      case "Unresolveable":
        return undefined;

      case "Constant":
        if (expr.value === null) {
          return "null";
        }

        if (expr.value === undefined) {
          return "undefined";
        }

        if (typeof expr.value === "object") {
          if (Array.isArray(expr.value)) {
            var entries = expr.value.map(function (expression) {
              return compileBinding(expression, true);
            });
            return "[".concat(entries.join(", "), "]");
          } else {
            // Objects
            var o = expr.value;
            var properties = Object.keys(o).map(function (key) {
              var value = o[key];
              return "".concat(key, ": ").concat(compileBinding(value, true));
            });
            return "{".concat(properties.join(", "), "}");
          }
        }

        if (embeddedInBinding) {
          switch (typeof expr.value) {
            case "number":
            case "bigint":
            case "boolean":
              return expr.value.toString();

            case "string":
              return "'".concat(escapeXmlAttribute(expr.value.toString()), "'");

            default:
              return "";
          }
        } else {
          return expr.value.toString();
        }

      case "Ref":
        return expr.ref || "null";

      case "Function":
        var argumentString = "".concat(expr.parameters.map(function (arg) {
          return compileBinding(arg, true);
        }).join(", "));
        return expr.obj === undefined ? "".concat(expr.fn, "(").concat(argumentString, ")") : "".concat(compileBinding(expr.obj, true), ".").concat(expr.fn, "(").concat(argumentString, ")");

      case "EmbeddedExpressionBinding":
        if (embeddedInBinding) {
          return "(".concat(expr.value.substr(2, expr.value.length - 3), ")");
        } else {
          return "".concat(expr.value);
        }

      case "EmbeddedBinding":
        if (embeddedInBinding) {
          return "".concat(embeddedSeparator).concat(expr.value);
        } else {
          return "".concat(expr.value);
        }

      case "DefaultBinding":
      case "Binding":
        if (expr.type || expr.parameters || expr.targetType) {
          var outBinding = "";

          if (embeddedInBinding) {
            outBinding += "".concat(embeddedSeparator);
          }

          outBinding += "{path:'".concat(expr.modelName ? "".concat(expr.modelName, ">") : "").concat(expr.path, "'");

          if (expr.type) {
            outBinding += ", type: '".concat(expr.type, "'");
          }

          if (expr.constraints && Object.keys(expr.constraints).length > 0) {
            outBinding += ", constraints: ".concat(compileBinding(expr.constraints));
          }

          if (expr.formatOptions) {
            outBinding += ", formatOptions: ".concat(compileBinding(expr.formatOptions));
          }

          if (expr.parameters && Object.keys(expr.parameters).length > 0) {
            outBinding += ", parameters: ".concat(compileBinding(expr.parameters));
          }

          if (expr.targetType) {
            outBinding += ", targetType: '".concat(expr.targetType, "'");
          }

          outBinding += "}";
          return outBinding;
        } else {
          if (embeddedInBinding) {
            return "".concat(embeddedSeparator, "{").concat(expr.modelName ? "".concat(expr.modelName, ">") : "").concat(expr.path, "}");
          } else {
            return "{".concat(expr.modelName ? "".concat(expr.modelName, ">") : "").concat(expr.path, "}");
          }
        }

      case "Comparison":
        var comparisonPart = "".concat(compileBinding(expr.operand1, true), " ").concat(expr.operator, " ").concat(compileBinding(expr.operand2, true));

        if (embeddedInBinding) {
          return comparisonPart;
        }

        return "{= ".concat(comparisonPart, "}");

      case "IfElse":
        if (embeddedInBinding) {
          return "(".concat(compileBinding(expr.condition, true), " ? ").concat(compileBinding(expr.onTrue, true), " : ").concat(compileBinding(expr.onFalse, true), ")");
        } else {
          return "{= ".concat(compileBinding(expr.condition, true), " ? ").concat(compileBinding(expr.onTrue, true), " : ").concat(compileBinding(expr.onFalse, true), "}");
        }

      case "Set":
        if (embeddedInBinding) {
          return "(".concat(expr.operands.map(function (expression) {
            return compileBinding(expression, true);
          }).join(" ".concat(expr.operator, " ")), ")");
        } else {
          return "{= (".concat(expr.operands.map(function (expression) {
            return compileBinding(expression, true);
          }).join(" ".concat(expr.operator, " ")), ")}");
        }

      case "Concat":
        if (embeddedInBinding) {
          return "".concat(expr.expressions.map(function (expression) {
            return compileBinding(expression, true, true);
          }).join(" + "));
        } else {
          return "{= ".concat(expr.expressions.map(function (expression) {
            return compileBinding(expression, true, true);
          }).join(" + "), " }");
        }

      case "Not":
        if (embeddedInBinding) {
          return "!".concat(compileBinding(expr.operand, true));
        } else {
          return "{= !".concat(compileBinding(expr.operand, true), "}");
        }

      case "Truthy":
        if (embeddedInBinding) {
          return "!!".concat(compileBinding(expr.operand, true));
        } else {
          return "{= !!".concat(compileBinding(expr.operand, true), "}");
        }

      case "Formatter":
        if (expr.parameters.length === 1) {
          outProperty += "{".concat(compilePathParameter(expr.parameters[0], true), ", formatter: '").concat(expr.fn, "'}");
        } else {
          outProperty += "{parts:[".concat(expr.parameters.map(function (param) {
            return compilePathParameter(param);
          }).join(","), "], formatter: '").concat(expr.fn, "'}");
        }

        if (embeddedInBinding) {
          outProperty = "$".concat(outProperty);
        }

        return outProperty;

      case "ComplexType":
        if (expr.bindingParameters.length === 1) {
          outProperty += "{".concat(compilePathParameter(expr.bindingParameters[0], true), ", type: '").concat(expr.type, "'}");
        } else {
          var outputEnd; // this code is based on sap.ui.model.odata.v4._AnnotationHelperExpression.fetchCurrencyOrUnit

          switch (expr.type) {
            case "sap.ui.model.odata.type.Unit":
              outputEnd = ",{mode:'OneTime',path:'/##@@requestUnitsOfMeasure',targetType:'any'}],type:'sap.ui.model.odata.type.Unit'";
              break;

            case "sap.ui.model.odata.type.Currency":
              outputEnd = ",{mode:'OneTime',path:'/##@@requestCurrencyCodes',targetType:'any'}],type:'sap.ui.model.odata.type.Currency'";
              break;

            default:
              outputEnd = "], type: '".concat(expr.type, "'");
          }

          if (expr.formatOptions && Object.keys(expr.formatOptions).length > 0) {
            outputEnd += ", formatOptions: ".concat(compileBinding(expr.formatOptions));
          }

          if (expr.parameters && Object.keys(expr.parameters).length > 0) {
            outputEnd += ", parameters: ".concat(compileBinding(expr.parameters));
          }

          outputEnd += "}";
          outProperty += "{mode:'TwoWay', parts:[".concat(expr.bindingParameters.map(function (param) {
            return compilePathParameter(param);
          }).join(",")).concat(outputEnd);
        }

        if (embeddedInBinding) {
          outProperty = "$".concat(outProperty);
        }

        return outProperty;

      default:
        return "";
    }
  }
  /**
   * Compile the path parameter of a formatter call.
   *
   * @param expression The binding part to evaluate
   * @param singlePath Whether there is one or multiple path to consider
   * @returns {string} The string snippet to include in the overall binding definition
   */


  _exports.compileBinding = compileBinding;

  function compilePathParameter(expression) {
    var singlePath = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var outValue = "";

    switch (expression._type) {
      case "Constant":
        switch (typeof expression.value) {
          case "number":
          case "bigint":
            outValue = "value: ".concat(expression.value.toString());
            break;

          case "string":
            outValue = "value: '".concat(escapeXmlAttribute(expression.value.toString()), "'");
            break;

          case "boolean":
            outValue = "value: '".concat(expression.value.toString(), "'");
            break;

          default:
            outValue = "value: ''";
            break;
        }

        if (singlePath) {
          return outValue;
        }

        return "{".concat(outValue, "}");

      case "DefaultBinding":
      case "Binding":
        outValue = "path:'".concat(expression.modelName ? "".concat(expression.modelName, ">") : "").concat(expression.path, "'");

        if (expression.type) {
          outValue += ", type : '".concat(expression.type, "'");
        } else {
          outValue += ", targetType : 'any'";
        }

        if (expression.constraints && Object.keys(expression.constraints).length > 0) {
          outValue += ", constraints: ".concat(compileBinding(expression.constraints));
        }

        if (expression.formatOptions && Object.keys(expression.formatOptions).length > 0) {
          outValue += ", formatOptions: ".concat(compileBinding(expression.formatOptions));
        }

        if (expression.parameters && Object.keys(expression.parameters).length > 0) {
          outValue += ", parameters: ".concat(compileBinding(expression.parameters));
        }

        if (singlePath) {
          return outValue;
        }

        return "{".concat(outValue, "}");

      default:
        return "";
    }
  }

  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkJpbmRpbmdFeHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbInVucmVzb2x2ZWFibGVFeHByZXNzaW9uIiwiX3R5cGUiLCJlc2NhcGVYbWxBdHRyaWJ1dGUiLCJpbnB1dFN0cmluZyIsInJlcGxhY2UiLCJjIiwiaGFzVW5yZXNvbHZlYWJsZUV4cHJlc3Npb24iLCJleHByZXNzaW9ucyIsImZpbmQiLCJleHByIiwidW5kZWZpbmVkIiwiX2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbCIsImEiLCJiIiwidmFsdWUiLCJvcGVyYW5kIiwib3BlcmF0b3IiLCJvcGVyYW5kcyIsImxlbmd0aCIsImV2ZXJ5IiwiZXhwcmVzc2lvbiIsInNvbWUiLCJvdGhlckV4cHJlc3Npb24iLCJjb25kaXRpb24iLCJvblRydWUiLCJvbkZhbHNlIiwib3BlcmFuZDEiLCJvcGVyYW5kMiIsImFFeHByZXNzaW9ucyIsImJFeHByZXNzaW9ucyIsImluZGV4IiwibW9kZWxOYW1lIiwicGF0aCIsInRhcmdldEVudGl0eVNldCIsImZuIiwicGFyYW1ldGVycyIsInR5cGUiLCJiaW5kaW5nUGFyYW1ldGVycyIsIm90aGVyRnVuY3Rpb24iLCJvYmoiLCJyZWYiLCJmbGF0dGVuU2V0RXhwcmVzc2lvbiIsInJlZHVjZSIsInJlc3VsdCIsImNhbmRpZGF0ZXNGb3JGbGF0dGVuaW5nIiwiZm9yRWFjaCIsImNhbmRpZGF0ZSIsImUiLCJwdXNoIiwiaGFzT3Bwb3NpdGVFeHByZXNzaW9ucyIsImkiLCJuZWdhdGVkRXhwcmVzc2lvbiIsIm5vdCIsImoiLCJhbmQiLCJtYXAiLCJ3cmFwUHJpbWl0aXZlIiwiaXNTdGF0aWNGYWxzZSIsIm5vblRyaXZpYWxFeHByZXNzaW9uIiwiZmlsdGVyIiwiaXNDb25zdGFudCIsImNvbnN0YW50IiwiaXNWYWxpZCIsIm9yIiwiaXNTdGF0aWNUcnVlIiwiaXNDb21wYXJpc29uIiwiZXF1YWwiLCJncmVhdGVyT3JFcXVhbCIsImdyZWF0ZXJUaGFuIiwibm90RXF1YWwiLCJsZXNzT3JFcXVhbCIsImxlc3NUaGFuIiwiaXNUcnV0aHkiLCJiaW5kaW5nRXhwcmVzc2lvbiIsInZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMiLCJwYXRoVmlzaXRvciIsInRhcmdldFBhdGgiLCJsb2NhbFBhdGgiLCJjb25jYXQiLCJqb2luIiwiY29uc3RhbnRWYWx1ZSIsIkFycmF5IiwiaXNBcnJheSIsImlzUHJpbWl0aXZlT2JqZWN0IiwidmFsdWVPZiIsInZhbCIsIk9iamVjdCIsImtleXMiLCJrZXkiLCJyZXNvbHZlQmluZGluZ1N0cmluZyIsInRhcmdldFR5cGUiLCJzdGFydHNXaXRoIiwiaXNFeHByZXNzaW9uIiwic29tZXRoaW5nIiwibWF5YmVDb25zdGFudCIsImlzQmluZGluZyIsIm1heWJlQmluZGluZyIsIm9iamVjdFR5cGUiLCJjb25zdHJ1Y3RvciIsIm5hbWUiLCJpc0NvbXBsZXhBbm5vdGF0aW9uRXhwcmVzc2lvbiIsImFubm90YXRpb25FeHByZXNzaW9uIiwiZGVmYXVsdFZhbHVlIiwiYW5ub3RhdGlvbklmRXhwcmVzc2lvbiIsIklmIiwicGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uIiwiTm90IiwiRXEiLCJOZSIsIkd0IiwiR2UiLCJMdCIsIkxlIiwiT3IiLCJvckNvbmRpdGlvbiIsIkFuZCIsImFuZENvbmRpdGlvbiIsImFubm90YXRpb25BcHBseUV4cHJlc3Npb24iLCJhbm5vdGF0aW9uVmFsdWUiLCJoYXNPd25Qcm9wZXJ0eSIsIiRPciIsIiRBbmQiLCIkTm90IiwiJEVxIiwiJE5lIiwiJEd0IiwiJEdlIiwiJEx0IiwiJExlIiwiJFBhdGgiLCJGdW5jdGlvbiIsIiRGdW5jdGlvbiIsIkFwcGx5IiwiJEFwcGx5IiwiJElmIiwicmVzb2x2ZUVudW1WYWx1ZSIsIiRFbnVtTWVtYmVyIiwiaWZFbHNlIiwiYXBwbHlQYXJhbSIsImFwcGx5UGFyYW1Db252ZXJ0ZWQiLCJjb21wYXJpc29uIiwibGVmdE9wZXJhbmQiLCJyaWdodE9wZXJhbmQiLCJsZWZ0RXhwcmVzc2lvbiIsInJpZ2h0RXhwcmVzc2lvbiIsImNvbmRpdGlvbkV4cHJlc3Npb24iLCJvblRydWVFeHByZXNzaW9uIiwib25GYWxzZUV4cHJlc3Npb24iLCJoYXNSZWZlcmVuY2VUb0RlZmF1bHRDb250ZXh0IiwiZm9ybWF0UmVzdWx0IiwiZm9ybWF0dGVyRnVuY3Rpb24iLCJjb250ZXh0RW50aXR5VHlwZSIsInBhcmFtZXRlckV4cHJlc3Npb25zIiwiX19mdW5jdGlvbk5hbWUiLCJzcGxpdCIsImZvcm1hdHRlckNsYXNzIiwiZm9ybWF0dGVyTmFtZSIsInVuc2hpZnQiLCJhZGRUeXBlSW5mb3JtYXRpb24iLCJvRm9ybWF0T3B0aW9ucyIsImluZGV4T2YiLCJwYXJzZUFzU3RyaW5nIiwiZW1wdHlTdHJpbmciLCJmb3JtYXRPcHRpb25zIiwib24iLCJmdW5jdGlvbk5hbWUiLCJpc0VtcHR5IiwiaW5FeHByZXNzaW9ucyIsImNvbmNhdGVuYXRlZCIsInRvU3RyaW5nIiwidHJhbnNmb3JtUmVjdXJzaXZlbHkiLCJpbkV4cHJlc3Npb24iLCJleHByZXNzaW9uVHlwZSIsInRyYW5zZm9ybUZ1bmN0aW9uIiwiaW5jbHVkZUFsbEV4cHJlc3Npb24iLCJjb21waWxlQmluZGluZyIsImVtYmVkZGVkSW5CaW5kaW5nIiwia2VlcFRhcmdldFR5cGUiLCJlbWJlZGRlZFNlcGFyYXRvciIsIm91dFByb3BlcnR5IiwiZW50cmllcyIsIm8iLCJwcm9wZXJ0aWVzIiwiYXJndW1lbnRTdHJpbmciLCJhcmciLCJzdWJzdHIiLCJvdXRCaW5kaW5nIiwiY29uc3RyYWludHMiLCJjb21wYXJpc29uUGFydCIsImNvbXBpbGVQYXRoUGFyYW1ldGVyIiwicGFyYW0iLCJvdXRwdXRFbmQiLCJzaW5nbGVQYXRoIiwib3V0VmFsdWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTRLTyxNQUFNQSx1QkFBdUQsR0FBRztBQUN0RUMsSUFBQUEsS0FBSyxFQUFFO0FBRCtELEdBQWhFOzs7QUFJUCxXQUFTQyxrQkFBVCxDQUE0QkMsV0FBNUIs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bEIsY0FBYyxDQUFDM0osVUFBVSxDQUFDdUssV0FBWixDQUFwQyxDQUFSO0FBQ0E7O0FBQ0QsWUFBSXZLLFVBQVUsQ0FBQytJLGFBQVgsSUFBNEI3RSxNQUFNLENBQUNDLElBQVAsQ0FBWW5FLFVBQVUsQ0FBQytJLGFBQXZCLEVBQXNDakosTUFBdEMsR0FBK0MsQ0FBL0UsRUFBa0Y7QUFDakYrSyxVQUFBQSxRQUFRLCtCQUF3QmxCLGNBQWMsQ0FBQzNKLFVBQVUsQ0FBQytJLGFBQVosQ0FBdEMsQ0FBUjtBQUNBOztBQUNELFlBQUkvSSxVQUFVLENBQUNlLFVBQVgsSUFBeUJtRCxNQUFNLENBQUNDLElBQVAsQ0FBWW5FLFVBQVUsQ0FBQ2UsVUFBdkIsRUFBbUNqQixNQUFuQyxHQUE0QyxDQUF6RSxFQUE0RTtBQUMzRStLLFVBQUFBLFFBQVEsNEJBQXFCbEIsY0FBYyxDQUFDM0osVUFBVSxDQUFDZSxVQUFaLENBQW5DLENBQVI7QUFDQTs7QUFDRCxZQUFJNkosVUFBSixFQUFnQjtBQUNmLGlCQUFPQyxRQUFQO0FBQ0E7O0FBQ0QsMEJBQVdBLFFBQVg7O0FBQ0Q7QUFDQyxlQUFPLEVBQVA7QUE3Q0Y7QUErQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFuZEFubm90YXRpb25FeHByZXNzaW9uLFxuXHRBbmRDb25kaXRpb25hbEV4cHJlc3Npb24sXG5cdENvbmRpdGlvbmFsQ2hlY2tPclZhbHVlLFxuXHRFbnRpdHlUeXBlLFxuXHRFcUFubm90YXRpb25FeHByZXNzaW9uLFxuXHRFcUNvbmRpdGlvbmFsRXhwcmVzc2lvbixcblx0R2VBbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0R2VDb25kaXRpb25hbEV4cHJlc3Npb24sXG5cdEd0QW5ub3RhdGlvbkV4cHJlc3Npb24sXG5cdEd0Q29uZGl0aW9uYWxFeHByZXNzaW9uLFxuXHRJZkFubm90YXRpb25FeHByZXNzaW9uLFxuXHRJZkFubm90YXRpb25FeHByZXNzaW9uVmFsdWUsXG5cdExlQW5ub3RhdGlvbkV4cHJlc3Npb24sXG5cdExlQ29uZGl0aW9uYWxFeHByZXNzaW9uLFxuXHRMdEFubm90YXRpb25FeHByZXNzaW9uLFxuXHRMdENvbmRpdGlvbmFsRXhwcmVzc2lvbixcblx0TmVBbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0TmVDb25kaXRpb25hbEV4cHJlc3Npb24sXG5cdE5vdEFubm90YXRpb25FeHByZXNzaW9uLFxuXHROb3RDb25kaXRpb25hbEV4cHJlc3Npb24sXG5cdE9yQW5ub3RhdGlvbkV4cHJlc3Npb24sXG5cdE9yQ29uZGl0aW9uYWxFeHByZXNzaW9uLFxuXHRQYXRoQ29uZGl0aW9uRXhwcmVzc2lvbixcblx0UHJvcGVydHlBbm5vdGF0aW9uVmFsdWVcbn0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBBcHBseUFubm90YXRpb25FeHByZXNzaW9uLCBQYXRoQW5ub3RhdGlvbkV4cHJlc3Npb24gfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvdHlwZXMvRWRtXCI7XG5pbXBvcnQgeyBFbnRpdHlTZXQgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9Db252ZXJ0ZXJcIjtcbmltcG9ydCB7IHJlc29sdmVFbnVtVmFsdWUgfSBmcm9tIFwiLi9Bbm5vdGF0aW9uRW51bVwiO1xuXG50eXBlIFByaW1pdGl2ZVR5cGUgPSBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFuIHwgb2JqZWN0IHwgbnVsbCB8IHVuZGVmaW5lZDtcblxudHlwZSBCYXNlRXhwcmVzc2lvbjxUPiA9IHtcblx0X3R5cGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIENvbnN0YW50RXhwcmVzc2lvbjxUPiA9IEJhc2VFeHByZXNzaW9uPFQ+ICYge1xuXHRfdHlwZTogXCJDb25zdGFudFwiO1xuXHR2YWx1ZTogVDtcbn07XG5cbnR5cGUgU2V0T3BlcmF0b3IgPSBcIiYmXCIgfCBcInx8XCI7XG5leHBvcnQgdHlwZSBTZXRFeHByZXNzaW9uID0gQmFzZUV4cHJlc3Npb248Ym9vbGVhbj4gJiB7XG5cdF90eXBlOiBcIlNldFwiO1xuXHRvcGVyYXRvcjogU2V0T3BlcmF0b3I7XG5cdG9wZXJhbmRzOiBFeHByZXNzaW9uPGJvb2xlYW4+W107XG59O1xuXG5leHBvcnQgdHlwZSBOb3RFeHByZXNzaW9uID0gQmFzZUV4cHJlc3Npb248Ym9vbGVhbj4gJiB7XG5cdF90eXBlOiBcIk5vdFwiO1xuXHRvcGVyYW5kOiBFeHByZXNzaW9uPGJvb2xlYW4+O1xufTtcblxuZXhwb3J0IHR5cGUgVHJ1dGh5RXhwcmVzc2lvbiA9IEJhc2VFeHByZXNzaW9uPGJvb2xlYW4+ICYge1xuXHRfdHlwZTogXCJUcnV0aHlcIjtcblx0b3BlcmFuZDogRXhwcmVzc2lvbjxzdHJpbmc+O1xufTtcblxuZXhwb3J0IHR5cGUgUmVmZXJlbmNlRXhwcmVzc2lvbiA9IEJhc2VFeHByZXNzaW9uPG9iamVjdD4gJiB7XG5cdF90eXBlOiBcIlJlZlwiO1xuXHRyZWY6IHN0cmluZyB8IG51bGw7XG59O1xuXG5leHBvcnQgdHlwZSBGb3JtYXR0ZXJFeHByZXNzaW9uPFQ+ID0gQmFzZUV4cHJlc3Npb248VD4gJiB7XG5cdF90eXBlOiBcIkZvcm1hdHRlclwiO1xuXHRmbjogc3RyaW5nO1xuXHRwYXJhbWV0ZXJzOiBFeHByZXNzaW9uPGFueT5bXTtcbn07XG5cbmV4cG9ydCB0eXBlIENvbXBsZXhUeXBlRXhwcmVzc2lvbjxUPiA9IEJhc2VFeHByZXNzaW9uPFQ+ICYge1xuXHRfdHlwZTogXCJDb21wbGV4VHlwZVwiO1xuXHR0eXBlOiBzdHJpbmc7XG5cdGZvcm1hdE9wdGlvbnM6IG9iamVjdDtcblx0cGFyYW1ldGVyczogb2JqZWN0O1xuXHRiaW5kaW5nUGFyYW1ldGVyczogRXhwcmVzc2lvbjxhbnk+W107XG59O1xuXG5leHBvcnQgdHlwZSBGdW5jdGlvbkV4cHJlc3Npb248VD4gPSBCYXNlRXhwcmVzc2lvbjxUPiAmIHtcblx0X3R5cGU6IFwiRnVuY3Rpb25cIjtcblx0b2JqPzogRXhwcmVzc2lvbjxvYmplY3Q+O1xuXHRmbjogc3RyaW5nO1xuXHRwYXJhbWV0ZXJzOiBFeHByZXNzaW9uPGFueT5bXTtcbn07XG5cbmV4cG9ydCB0eXBlIENvbmNhdEV4cHJlc3Npb24gPSBCYXNlRXhwcmVzc2lvbjxzdHJpbmc+ICYge1xuXHRfdHlwZTogXCJDb25jYXRcIjtcblx0ZXhwcmVzc2lvbnM6IEV4cHJlc3Npb248c3RyaW5nPltdO1xufTtcblxuZXhwb3J0IHR5cGUgVW5yZXNvbHZlYWJsZUJpbmRpbmdFeHByZXNzaW9uID0gQmFzZUV4cHJlc3Npb248c3RyaW5nPiAmIHtcblx0X3R5cGU6IFwiVW5yZXNvbHZlYWJsZVwiO1xufTtcblxuLyoqXG4gKiBAdHlwZWRlZiBCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb25cbiAqL1xuZXhwb3J0IHR5cGUgQmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPFQ+ID0gQmFzZUV4cHJlc3Npb248VD4gJiB7XG5cdF90eXBlOiBcIkJpbmRpbmdcIjtcblx0bW9kZWxOYW1lPzogc3RyaW5nO1xuXHRwYXRoOiBzdHJpbmc7XG5cdHRhcmdldEVudGl0eVNldD86IEVudGl0eVNldDtcblx0dHlwZT86IHN0cmluZztcblx0Y29uc3RyYWludHM/OiBhbnk7XG5cdHBhcmFtZXRlcnM/OiBhbnk7XG5cdHRhcmdldFR5cGU/OiBzdHJpbmc7XG5cdGZvcm1hdE9wdGlvbnM/OiBhbnk7XG59O1xuXG5leHBvcnQgdHlwZSBEZWZhdWx0QmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPFQ+ID0gQmFzZUV4cHJlc3Npb248VD4gJiB7XG5cdF90eXBlOiBcIkRlZmF1bHRCaW5kaW5nXCI7XG5cdG1vZGVsTmFtZT86IHN0cmluZztcblx0cGF0aDogc3RyaW5nO1xuXHR0eXBlPzogc3RyaW5nO1xuXHRjb25zdHJhaW50cz86IG9iamVjdDtcblx0cGFyYW1ldGVycz86IGFueTtcblx0dGFyZ2V0VHlwZT86IHN0cmluZztcblx0Zm9ybWF0T3B0aW9ucz86IG9iamVjdDtcbn07XG5cbmV4cG9ydCB0eXBlIEVtYmVkZGVkQmluZGluZ0V4cHJlc3Npb248VD4gPSBCYXNlRXhwcmVzc2lvbjxUPiAmIHtcblx0X3R5cGU6IFwiRW1iZWRkZWRCaW5kaW5nXCI7XG5cdHZhbHVlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBFbWJlZGRlZEV4cHJlc3Npb25CaW5kaW5nRXhwcmVzc2lvbjxUPiA9IEJhc2VFeHByZXNzaW9uPFQ+ICYge1xuXHRfdHlwZTogXCJFbWJlZGRlZEV4cHJlc3Npb25CaW5kaW5nXCI7XG5cdHZhbHVlOiBzdHJpbmc7XG59O1xuXG50eXBlIENvbXBhcmlzb25PcGVyYXRvciA9IFwiPT09XCIgfCBcIiE9PVwiIHwgXCI+PVwiIHwgXCI+XCIgfCBcIjw9XCIgfCBcIjxcIjtcbmV4cG9ydCB0eXBlIENvbXBhcmlzb25FeHByZXNzaW9uID0gQmFzZUV4cHJlc3Npb248Ym9vbGVhbj4gJiB7XG5cdF90eXBlOiBcIkNvbXBhcmlzb25cIjtcblx0b3BlcmF0b3I6IENvbXBhcmlzb25PcGVyYXRvcjtcblx0b3BlcmFuZDE6IEV4cHJlc3Npb248YW55Pjtcblx0b3BlcmFuZDI6IEV4cHJlc3Npb248YW55Pjtcbn07XG5cbmV4cG9ydCB0eXBlIElmRWxzZUV4cHJlc3Npb248VD4gPSBCYXNlRXhwcmVzc2lvbjxUPiAmIHtcblx0X3R5cGU6IFwiSWZFbHNlXCI7XG5cdGNvbmRpdGlvbjogRXhwcmVzc2lvbjxib29sZWFuPjtcblx0b25UcnVlOiBFeHByZXNzaW9uPFQ+O1xuXHRvbkZhbHNlOiBFeHByZXNzaW9uPFQ+O1xufTtcblxuLyoqXG4gKiBBbiBleHByZXNzaW9uIHRoYXQgZXZhbHVhdGVzIHRvIHR5cGUgVC5cbiAqXG4gKiBAdHlwZWRlZiBFeHByZXNzaW9uXG4gKi9cbmV4cG9ydCB0eXBlIEV4cHJlc3Npb248VD4gPVxuXHR8IFVucmVzb2x2ZWFibGVCaW5kaW5nRXhwcmVzc2lvblxuXHR8IENvbnN0YW50RXhwcmVzc2lvbjxUPlxuXHR8IFNldEV4cHJlc3Npb25cblx0fCBOb3RFeHByZXNzaW9uXG5cdHwgVHJ1dGh5RXhwcmVzc2lvblxuXHR8IENvbmNhdEV4cHJlc3Npb25cblx0fCBCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb248VD5cblx0fCBFbWJlZGRlZEJpbmRpbmdFeHByZXNzaW9uPFQ+XG5cdHwgRW1iZWRkZWRFeHByZXNzaW9uQmluZGluZ0V4cHJlc3Npb248VD5cblx0fCBEZWZhdWx0QmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPFQ+XG5cdHwgQ29tcGFyaXNvbkV4cHJlc3Npb25cblx0fCBJZkVsc2VFeHByZXNzaW9uPFQ+XG5cdHwgRm9ybWF0dGVyRXhwcmVzc2lvbjxUPlxuXHR8IENvbXBsZXhUeXBlRXhwcmVzc2lvbjxUPlxuXHR8IFJlZmVyZW5jZUV4cHJlc3Npb25cblx0fCBGdW5jdGlvbkV4cHJlc3Npb248VD47XG5cbi8qKlxuICogQW4gZXhwcmVzc2lvbiB0aGF0IGV2YWx1YXRlcyB0byB0eXBlIFQsIG9yIGEgY29uc3RhbnQgdmFsdWUgb2YgdHlwZSBUXG4gKi9cbmV4cG9ydCB0eXBlIEV4cHJlc3Npb25PclByaW1pdGl2ZTxUIGV4dGVuZHMgUHJpbWl0aXZlVHlwZT4gPSBFeHByZXNzaW9uPFQ+IHwgVDtcblxuZXhwb3J0IGNvbnN0IHVucmVzb2x2ZWFibGVFeHByZXNzaW9uOiBVbnJlc29sdmVhYmxlQmluZGluZ0V4cHJlc3Npb24gPSB7XG5cdF90eXBlOiBcIlVucmVzb2x2ZWFibGVcIlxufTtcblxuZnVuY3Rpb24gZXNjYXBlWG1sQXR0cmlidXRlKGlucHV0U3RyaW5nOiBzdHJpbmcpIHtcblx0cmV0dXJuIGlucHV0U3RyaW5nLnJlcGxhY2UoL1snXS9nLCBmdW5jdGlvbihjOiBzdHJpbmcpIHtcblx0XHRzd2l0Y2ggKGMpIHtcblx0XHRcdGNhc2UgXCInXCI6XG5cdFx0XHRcdHJldHVybiBcIlxcXFwnXCI7XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gYztcblx0XHR9XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzVW5yZXNvbHZlYWJsZUV4cHJlc3Npb24oLi4uZXhwcmVzc2lvbnM6IEV4cHJlc3Npb248YW55PltdKTogYm9vbGVhbiB7XG5cdHJldHVybiBleHByZXNzaW9ucy5maW5kKGV4cHIgPT4gZXhwci5fdHlwZSA9PT0gXCJVbnJlc29sdmVhYmxlXCIpICE9PSB1bmRlZmluZWQ7XG59XG4vKipcbiAqIENoZWNrIHR3byBleHByZXNzaW9ucyBmb3IgKGRlZXApIGVxdWFsaXR5LlxuICpcbiAqIEBwYXJhbSBhXG4gKiBAcGFyYW0gYlxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdHdvIGV4cHJlc3Npb25zIGFyZSBlcXVhbFxuICovXG5leHBvcnQgZnVuY3Rpb24gX2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbDxUPihhOiBFeHByZXNzaW9uPFQ+LCBiOiBFeHByZXNzaW9uPFQ+KTogYm9vbGVhbiB7XG5cdGlmIChhLl90eXBlICE9PSBiLl90eXBlKSB7XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG5cblx0c3dpdGNoIChhLl90eXBlKSB7XG5cdFx0Y2FzZSBcIlVucmVzb2x2ZWFibGVcIjpcblx0XHRcdHJldHVybiBmYWxzZTsgLy8gVW5yZXNvbHZlYWJsZSBpcyBuZXZlciBlcXVhbCB0byBhbnl0aGluZyBldmVuIGl0c2VsZlxuXHRcdGNhc2UgXCJDb25zdGFudFwiOlxuXHRcdGNhc2UgXCJFbWJlZGRlZEJpbmRpbmdcIjpcblx0XHRjYXNlIFwiRW1iZWRkZWRFeHByZXNzaW9uQmluZGluZ1wiOlxuXHRcdFx0cmV0dXJuIGEudmFsdWUgPT09IChiIGFzIENvbnN0YW50RXhwcmVzc2lvbjxUPikudmFsdWU7XG5cblx0XHRjYXNlIFwiTm90XCI6XG5cdFx0XHRyZXR1cm4gX2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbChhLm9wZXJhbmQsIChiIGFzIE5vdEV4cHJlc3Npb24pLm9wZXJhbmQpO1xuXHRcdGNhc2UgXCJUcnV0aHlcIjpcblx0XHRcdHJldHVybiBfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKGEub3BlcmFuZCwgKGIgYXMgVHJ1dGh5RXhwcmVzc2lvbikub3BlcmFuZCk7XG5cdFx0Y2FzZSBcIlNldFwiOlxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0YS5vcGVyYXRvciA9PT0gKGIgYXMgU2V0RXhwcmVzc2lvbikub3BlcmF0b3IgJiZcblx0XHRcdFx0YS5vcGVyYW5kcy5sZW5ndGggPT09IChiIGFzIFNldEV4cHJlc3Npb24pLm9wZXJhbmRzLmxlbmd0aCAmJlxuXHRcdFx0XHRhLm9wZXJhbmRzLmV2ZXJ5KGV4cHJlc3Npb24gPT5cblx0XHRcdFx0XHQoYiBhcyBTZXRFeHByZXNzaW9uKS5vcGVyYW5kcy5zb21lKG90aGVyRXhwcmVzc2lvbiA9PiBfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKGV4cHJlc3Npb24sIG90aGVyRXhwcmVzc2lvbikpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cblx0XHRjYXNlIFwiSWZFbHNlXCI6XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKGEuY29uZGl0aW9uLCAoYiBhcyBJZkVsc2VFeHByZXNzaW9uPFQ+KS5jb25kaXRpb24pICYmXG5cdFx0XHRcdF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwoYS5vblRydWUsIChiIGFzIElmRWxzZUV4cHJlc3Npb248VD4pLm9uVHJ1ZSkgJiZcblx0XHRcdFx0X2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbChhLm9uRmFsc2UsIChiIGFzIElmRWxzZUV4cHJlc3Npb248VD4pLm9uRmFsc2UpXG5cdFx0XHQpO1xuXG5cdFx0Y2FzZSBcIkNvbXBhcmlzb25cIjpcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdGEub3BlcmF0b3IgPT0gKGIgYXMgQ29tcGFyaXNvbkV4cHJlc3Npb24pLm9wZXJhdG9yICYmXG5cdFx0XHRcdF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwoYS5vcGVyYW5kMSwgKGIgYXMgQ29tcGFyaXNvbkV4cHJlc3Npb24pLm9wZXJhbmQxKSAmJlxuXHRcdFx0XHRfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKGEub3BlcmFuZDIsIChiIGFzIENvbXBhcmlzb25FeHByZXNzaW9uKS5vcGVyYW5kMilcblx0XHRcdCk7XG5cblx0XHRjYXNlIFwiQ29uY2F0XCI6XG5cdFx0XHRjb25zdCBhRXhwcmVzc2lvbnMgPSBhLmV4cHJlc3Npb25zO1xuXHRcdFx0Y29uc3QgYkV4cHJlc3Npb25zID0gKGIgYXMgQ29uY2F0RXhwcmVzc2lvbikuZXhwcmVzc2lvbnM7XG5cdFx0XHRpZiAoYUV4cHJlc3Npb25zLmxlbmd0aCAhPT0gYkV4cHJlc3Npb25zLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYUV4cHJlc3Npb25zLmV2ZXJ5KChleHByZXNzaW9uLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gX2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbChleHByZXNzaW9uLCBiRXhwcmVzc2lvbnNbaW5kZXhdKTtcblx0XHRcdH0pO1xuXG5cdFx0Y2FzZSBcIkJpbmRpbmdcIjpcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdGEubW9kZWxOYW1lID09PSAoYiBhcyBCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb248VD4pLm1vZGVsTmFtZSAmJlxuXHRcdFx0XHRhLnBhdGggPT09IChiIGFzIEJpbmRpbmdFeHByZXNzaW9uRXhwcmVzc2lvbjxUPikucGF0aCAmJlxuXHRcdFx0XHRhLnRhcmdldEVudGl0eVNldCA9PT0gKGIgYXMgQmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPFQ+KS50YXJnZXRFbnRpdHlTZXRcblx0XHRcdCk7XG5cblx0XHRjYXNlIFwiRGVmYXVsdEJpbmRpbmdcIjpcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdGEubW9kZWxOYW1lID09PSAoYiBhcyBEZWZhdWx0QmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPFQ+KS5tb2RlbE5hbWUgJiZcblx0XHRcdFx0YS5wYXRoID09PSAoYiBhcyBEZWZhdWx0QmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPFQ+KS5wYXRoXG5cdFx0XHQpO1xuXG5cdFx0Y2FzZSBcIkZvcm1hdHRlclwiOlxuXHRcdFx0cmV0dXJuIChcblx0XHRcdFx0YS5mbiA9PT0gKGIgYXMgRm9ybWF0dGVyRXhwcmVzc2lvbjxUPikuZm4gJiZcblx0XHRcdFx0YS5wYXJhbWV0ZXJzLmxlbmd0aCA9PT0gKGIgYXMgRm9ybWF0dGVyRXhwcmVzc2lvbjxUPikucGFyYW1ldGVycy5sZW5ndGggJiZcblx0XHRcdFx0YS5wYXJhbWV0ZXJzLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwoKGIgYXMgRm9ybWF0dGVyRXhwcmVzc2lvbjxUPikucGFyYW1ldGVyc1tpbmRleF0sIHZhbHVlKSlcblx0XHRcdCk7XG5cdFx0Y2FzZSBcIkNvbXBsZXhUeXBlXCI6XG5cdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRhLnR5cGUgPT09IChiIGFzIENvbXBsZXhUeXBlRXhwcmVzc2lvbjxUPikudHlwZSAmJlxuXHRcdFx0XHRhLmJpbmRpbmdQYXJhbWV0ZXJzLmxlbmd0aCA9PT0gKGIgYXMgQ29tcGxleFR5cGVFeHByZXNzaW9uPFQ+KS5iaW5kaW5nUGFyYW1ldGVycy5sZW5ndGggJiZcblx0XHRcdFx0YS5iaW5kaW5nUGFyYW1ldGVycy5ldmVyeSgodmFsdWUsIGluZGV4KSA9PlxuXHRcdFx0XHRcdF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwoKGIgYXMgQ29tcGxleFR5cGVFeHByZXNzaW9uPFQ+KS5iaW5kaW5nUGFyYW1ldGVyc1tpbmRleF0sIHZhbHVlKVxuXHRcdFx0XHQpXG5cdFx0XHQpO1xuXHRcdGNhc2UgXCJGdW5jdGlvblwiOlxuXHRcdFx0Y29uc3Qgb3RoZXJGdW5jdGlvbiA9IGIgYXMgRnVuY3Rpb25FeHByZXNzaW9uPFQ+O1xuXHRcdFx0aWYgKGEub2JqID09PSB1bmRlZmluZWQgfHwgb3RoZXJGdW5jdGlvbi5vYmogPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gYS5vYmogPT09IG90aGVyRnVuY3Rpb247XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdGEuZm4gPT09IG90aGVyRnVuY3Rpb24uZm4gJiZcblx0XHRcdFx0X2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbChhLm9iaiwgb3RoZXJGdW5jdGlvbi5vYmopICYmXG5cdFx0XHRcdGEucGFyYW1ldGVycy5sZW5ndGggPT09IG90aGVyRnVuY3Rpb24ucGFyYW1ldGVycy5sZW5ndGggJiZcblx0XHRcdFx0YS5wYXJhbWV0ZXJzLmV2ZXJ5KCh2YWx1ZSwgaW5kZXgpID0+IF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwob3RoZXJGdW5jdGlvbi5wYXJhbWV0ZXJzW2luZGV4XSwgdmFsdWUpKVxuXHRcdFx0KTtcblxuXHRcdGNhc2UgXCJSZWZcIjpcblx0XHRcdHJldHVybiBhLnJlZiA9PT0gKGIgYXMgUmVmZXJlbmNlRXhwcmVzc2lvbikucmVmO1xuXHR9XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBuZXN0ZWQgU2V0RXhwcmVzc2lvbiBieSBpbmxpbmluZyBvcGVyYW5kcyBvZiB0eXBlIFNldEV4cHJlc3Npb24gd2l0aCB0aGUgc2FtZSBvcGVyYXRvci5cbiAqXG4gKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgZXhwcmVzc2lvbiB0byBmbGF0dGVuXG4gKiBAcmV0dXJucyB7U2V0RXhwcmVzc2lvbn0gQSBuZXcgU2V0RXhwcmVzc2lvbiB3aXRoIHRoZSBzYW1lIG9wZXJhdG9yXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW5TZXRFeHByZXNzaW9uKGV4cHJlc3Npb246IFNldEV4cHJlc3Npb24pOiBTZXRFeHByZXNzaW9uIHtcblx0cmV0dXJuIGV4cHJlc3Npb24ub3BlcmFuZHMucmVkdWNlKFxuXHRcdChyZXN1bHQ6IFNldEV4cHJlc3Npb24sIG9wZXJhbmQpID0+IHtcblx0XHRcdGNvbnN0IGNhbmRpZGF0ZXNGb3JGbGF0dGVuaW5nID1cblx0XHRcdFx0b3BlcmFuZC5fdHlwZSA9PT0gXCJTZXRcIiAmJiBvcGVyYW5kLm9wZXJhdG9yID09PSBleHByZXNzaW9uLm9wZXJhdG9yID8gb3BlcmFuZC5vcGVyYW5kcyA6IFtvcGVyYW5kXTtcblx0XHRcdGNhbmRpZGF0ZXNGb3JGbGF0dGVuaW5nLmZvckVhY2goY2FuZGlkYXRlID0+IHtcblx0XHRcdFx0aWYgKHJlc3VsdC5vcGVyYW5kcy5ldmVyeShlID0+ICFfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKGUsIGNhbmRpZGF0ZSkpKSB7XG5cdFx0XHRcdFx0cmVzdWx0Lm9wZXJhbmRzLnB1c2goY2FuZGlkYXRlKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gcmVzdWx0O1xuXHRcdH0sXG5cdFx0eyBfdHlwZTogXCJTZXRcIiwgb3BlcmF0b3I6IGV4cHJlc3Npb24ub3BlcmF0b3IsIG9wZXJhbmRzOiBbXSB9XG5cdCk7XG59XG5cbi8qKlxuICogRGV0ZWN0cyB3aGV0aGVyIGFuIGFycmF5IG9mIGJvb2xlYW4gZXhwcmVzc2lvbnMgY29udGFpbnMgYW4gZXhwcmVzc2lvbiBhbmQgaXRzIG5lZ2F0aW9uLlxuICpcbiAqIEBwYXJhbSBleHByZXNzaW9ucyBBcnJheSBvZiBleHByZXNzaW9uc1xuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgc2V0IG9mIGV4cHJlc3Npb25zIGNvbnRhaW5zIGFuIGV4cHJlc3Npb24gYW5kIGl0cyBuZWdhdGlvblxuICovXG5mdW5jdGlvbiBoYXNPcHBvc2l0ZUV4cHJlc3Npb25zKGV4cHJlc3Npb25zOiBFeHByZXNzaW9uPGJvb2xlYW4+W10pOiBib29sZWFuIHtcblx0aWYgKGV4cHJlc3Npb25zLmxlbmd0aCA8IDIpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRsZXQgaSA9IGV4cHJlc3Npb25zLmxlbmd0aDtcblx0d2hpbGUgKGktLSkge1xuXHRcdGNvbnN0IGV4cHJlc3Npb24gPSBleHByZXNzaW9uc1tpXTtcblx0XHRjb25zdCBuZWdhdGVkRXhwcmVzc2lvbiA9IG5vdChleHByZXNzaW9uKTtcblx0XHRmb3IgKGxldCBqID0gMDsgaiA8IGk7IGorKykge1xuXHRcdFx0aWYgKF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwoZXhwcmVzc2lvbnNbal0sIG5lZ2F0ZWRFeHByZXNzaW9uKSkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIExvZ2ljYWwgYGFuZGAgZXhwcmVzc2lvbi5cbiAqXG4gKiBUaGUgZXhwcmVzc2lvbiBpcyBzaW1wbGlmaWVkIHRvIGZhbHNlIGlmIHRoaXMgY2FuIGJlIGRlY2lkZWQgc3RhdGljYWxseSAodGhhdCBpcywgaWYgb25lIG9wZXJhbmQgaXMgYSBjb25zdGFudFxuICogZmFsc2Ugb3IgaWYgdGhlIGV4cHJlc3Npb24gY29udGFpbnMgYW4gb3BlcmFuZCBhbmQgaXRzIG5lZ2F0aW9uKS5cbiAqXG4gKiBAcGFyYW0gb3BlcmFuZHMgRXhwcmVzc2lvbnMgdG8gY29ubmVjdCBieSBgYW5kYFxuICogQHJldHVybnMge0V4cHJlc3Npb248Ym9vbGVhbj59IEV4cHJlc3Npb24gZXZhbHVhdGluZyB0byBib29sZWFuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmQoLi4ub3BlcmFuZHM6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxib29sZWFuPltdKTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdGNvbnN0IGV4cHJlc3Npb25zID0gZmxhdHRlblNldEV4cHJlc3Npb24oe1xuXHRcdF90eXBlOiBcIlNldFwiLFxuXHRcdG9wZXJhdG9yOiBcIiYmXCIsXG5cdFx0b3BlcmFuZHM6IG9wZXJhbmRzLm1hcCh3cmFwUHJpbWl0aXZlKVxuXHR9KS5vcGVyYW5kcztcblxuXHRpZiAoaGFzVW5yZXNvbHZlYWJsZUV4cHJlc3Npb24oLi4uZXhwcmVzc2lvbnMpKSB7XG5cdFx0cmV0dXJuIHVucmVzb2x2ZWFibGVFeHByZXNzaW9uO1xuXHR9XG5cdGxldCBpc1N0YXRpY0ZhbHNlOiBib29sZWFuID0gZmFsc2U7XG5cdGNvbnN0IG5vblRyaXZpYWxFeHByZXNzaW9uID0gZXhwcmVzc2lvbnMuZmlsdGVyKGV4cHJlc3Npb24gPT4ge1xuXHRcdGlmIChpc0NvbnN0YW50KGV4cHJlc3Npb24pICYmICFleHByZXNzaW9uLnZhbHVlKSB7XG5cdFx0XHRpc1N0YXRpY0ZhbHNlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuICFpc0NvbnN0YW50KGV4cHJlc3Npb24pO1xuXHR9KTtcblx0aWYgKGlzU3RhdGljRmFsc2UpIHtcblx0XHRyZXR1cm4gY29uc3RhbnQoZmFsc2UpO1xuXHR9IGVsc2UgaWYgKG5vblRyaXZpYWxFeHByZXNzaW9uLmxlbmd0aCA9PT0gMCkge1xuXHRcdC8vIFJlc29sdmUgdGhlIGNvbnN0YW50IHRoZW5cblx0XHRjb25zdCBpc1ZhbGlkID0gZXhwcmVzc2lvbnMucmVkdWNlKChpc1ZhbGlkLCBleHByZXNzaW9uKSA9PiB7XG5cdFx0XHRyZXR1cm4gaXNWYWxpZCAmJiBpc0NvbnN0YW50KGV4cHJlc3Npb24pICYmIGV4cHJlc3Npb24udmFsdWU7XG5cdFx0fSwgdHJ1ZSk7XG5cdFx0cmV0dXJuIGNvbnN0YW50KGlzVmFsaWQpO1xuXHR9IGVsc2UgaWYgKG5vblRyaXZpYWxFeHByZXNzaW9uLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBub25Ucml2aWFsRXhwcmVzc2lvblswXTtcblx0fSBlbHNlIGlmIChoYXNPcHBvc2l0ZUV4cHJlc3Npb25zKG5vblRyaXZpYWxFeHByZXNzaW9uKSkge1xuXHRcdHJldHVybiBjb25zdGFudChmYWxzZSk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdF90eXBlOiBcIlNldFwiLFxuXHRcdFx0b3BlcmF0b3I6IFwiJiZcIixcblx0XHRcdG9wZXJhbmRzOiBub25Ucml2aWFsRXhwcmVzc2lvblxuXHRcdH07XG5cdH1cbn1cblxuLyoqXG4gKiBMb2dpY2FsIGBvcmAgZXhwcmVzc2lvbi5cbiAqXG4gKiBUaGUgZXhwcmVzc2lvbiBpcyBzaW1wbGlmaWVkIHRvIHRydWUgaWYgdGhpcyBjYW4gYmUgZGVjaWRlZCBzdGF0aWNhbGx5ICh0aGF0IGlzLCBpZiBvbmUgb3BlcmFuZCBpcyBhIGNvbnN0YW50XG4gKiB0cnVlIG9yIGlmIHRoZSBleHByZXNzaW9uIGNvbnRhaW5zIGFuIG9wZXJhbmQgYW5kIGl0cyBuZWdhdGlvbikuXG4gKlxuICogQHBhcmFtIG9wZXJhbmRzIEV4cHJlc3Npb25zIHRvIGNvbm5lY3QgYnkgYG9yYFxuICogQHJldHVybnMge0V4cHJlc3Npb248Ym9vbGVhbj59IEV4cHJlc3Npb24gZXZhbHVhdGluZyB0byBib29sZWFuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBvciguLi5vcGVyYW5kczogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPGJvb2xlYW4+W10pOiBFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0Y29uc3QgZXhwcmVzc2lvbnMgPSBmbGF0dGVuU2V0RXhwcmVzc2lvbih7XG5cdFx0X3R5cGU6IFwiU2V0XCIsXG5cdFx0b3BlcmF0b3I6IFwifHxcIixcblx0XHRvcGVyYW5kczogb3BlcmFuZHMubWFwKHdyYXBQcmltaXRpdmUpXG5cdH0pLm9wZXJhbmRzO1xuXHRpZiAoaGFzVW5yZXNvbHZlYWJsZUV4cHJlc3Npb24oLi4uZXhwcmVzc2lvbnMpKSB7XG5cdFx0cmV0dXJuIHVucmVzb2x2ZWFibGVFeHByZXNzaW9uO1xuXHR9XG5cdGxldCBpc1N0YXRpY1RydWU6IGJvb2xlYW4gPSBmYWxzZTtcblx0Y29uc3Qgbm9uVHJpdmlhbEV4cHJlc3Npb24gPSBleHByZXNzaW9ucy5maWx0ZXIoZXhwcmVzc2lvbiA9PiB7XG5cdFx0aWYgKGlzQ29uc3RhbnQoZXhwcmVzc2lvbikgJiYgZXhwcmVzc2lvbi52YWx1ZSkge1xuXHRcdFx0aXNTdGF0aWNUcnVlID0gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuICFpc0NvbnN0YW50KGV4cHJlc3Npb24pIHx8IGV4cHJlc3Npb24udmFsdWU7XG5cdH0pO1xuXHRpZiAoaXNTdGF0aWNUcnVlKSB7XG5cdFx0cmV0dXJuIGNvbnN0YW50KHRydWUpO1xuXHR9IGVsc2UgaWYgKG5vblRyaXZpYWxFeHByZXNzaW9uLmxlbmd0aCA9PT0gMCkge1xuXHRcdC8vIFJlc29sdmUgdGhlIGNvbnN0YW50IHRoZW5cblx0XHRjb25zdCBpc1ZhbGlkID0gZXhwcmVzc2lvbnMucmVkdWNlKChpc1ZhbGlkLCBleHByZXNzaW9uKSA9PiB7XG5cdFx0XHRyZXR1cm4gaXNWYWxpZCAmJiBpc0NvbnN0YW50KGV4cHJlc3Npb24pICYmIGV4cHJlc3Npb24udmFsdWU7XG5cdFx0fSwgdHJ1ZSk7XG5cdFx0cmV0dXJuIGNvbnN0YW50KGlzVmFsaWQpO1xuXHR9IGVsc2UgaWYgKG5vblRyaXZpYWxFeHByZXNzaW9uLmxlbmd0aCA9PT0gMSkge1xuXHRcdHJldHVybiBub25Ucml2aWFsRXhwcmVzc2lvblswXTtcblx0fSBlbHNlIGlmIChoYXNPcHBvc2l0ZUV4cHJlc3Npb25zKG5vblRyaXZpYWxFeHByZXNzaW9uKSkge1xuXHRcdHJldHVybiBjb25zdGFudCh0cnVlKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0X3R5cGU6IFwiU2V0XCIsXG5cdFx0XHRvcGVyYXRvcjogXCJ8fFwiLFxuXHRcdFx0b3BlcmFuZHM6IG5vblRyaXZpYWxFeHByZXNzaW9uXG5cdFx0fTtcblx0fVxufVxuXG4vKipcbiAqIExvZ2ljYWwgYG5vdGAgb3BlcmF0b3IuXG4gKlxuICogQHBhcmFtIG9wZXJhbmQgVGhlIGV4cHJlc3Npb24gdG8gcmV2ZXJzZVxuICogQHJldHVybnMge0V4cHJlc3Npb248Ym9vbGVhbj59IFRoZSByZXN1bHRpbmcgZXhwcmVzc2lvbiB0aGF0IGV2YWx1YXRlcyB0byBib29sZWFuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3Qob3BlcmFuZDogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPGJvb2xlYW4+KTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdG9wZXJhbmQgPSB3cmFwUHJpbWl0aXZlKG9wZXJhbmQpO1xuXHRpZiAoaGFzVW5yZXNvbHZlYWJsZUV4cHJlc3Npb24ob3BlcmFuZCkpIHtcblx0XHRyZXR1cm4gdW5yZXNvbHZlYWJsZUV4cHJlc3Npb247XG5cdH0gZWxzZSBpZiAoaXNDb25zdGFudChvcGVyYW5kKSkge1xuXHRcdHJldHVybiBjb25zdGFudCghb3BlcmFuZC52YWx1ZSk7XG5cdH0gZWxzZSBpZiAoXG5cdFx0dHlwZW9mIG9wZXJhbmQgPT09IFwib2JqZWN0XCIgJiZcblx0XHRvcGVyYW5kLl90eXBlID09PSBcIlNldFwiICYmXG5cdFx0b3BlcmFuZC5vcGVyYXRvciA9PT0gXCJ8fFwiICYmXG5cdFx0b3BlcmFuZC5vcGVyYW5kcy5ldmVyeShleHByZXNzaW9uID0+IGlzQ29uc3RhbnQoZXhwcmVzc2lvbikgfHwgaXNDb21wYXJpc29uKGV4cHJlc3Npb24pKVxuXHQpIHtcblx0XHRyZXR1cm4gYW5kKC4uLm9wZXJhbmQub3BlcmFuZHMubWFwKGV4cHJlc3Npb24gPT4gbm90KGV4cHJlc3Npb24pKSk7XG5cdH0gZWxzZSBpZiAoXG5cdFx0dHlwZW9mIG9wZXJhbmQgPT09IFwib2JqZWN0XCIgJiZcblx0XHRvcGVyYW5kLl90eXBlID09PSBcIlNldFwiICYmXG5cdFx0b3BlcmFuZC5vcGVyYXRvciA9PT0gXCImJlwiICYmXG5cdFx0b3BlcmFuZC5vcGVyYW5kcy5ldmVyeShleHByZXNzaW9uID0+IGlzQ29uc3RhbnQoZXhwcmVzc2lvbikgfHwgaXNDb21wYXJpc29uKGV4cHJlc3Npb24pKVxuXHQpIHtcblx0XHRyZXR1cm4gb3IoLi4ub3BlcmFuZC5vcGVyYW5kcy5tYXAoZXhwcmVzc2lvbiA9PiBub3QoZXhwcmVzc2lvbikpKTtcblx0fSBlbHNlIGlmIChpc0NvbXBhcmlzb24ob3BlcmFuZCkpIHtcblx0XHQvLyBDcmVhdGUgdGhlIHJldmVyc2UgY29tcGFyaXNvblxuXHRcdHN3aXRjaCAob3BlcmFuZC5vcGVyYXRvcikge1xuXHRcdFx0Y2FzZSBcIiE9PVwiOlxuXHRcdFx0XHRyZXR1cm4gZXF1YWwob3BlcmFuZC5vcGVyYW5kMSwgb3BlcmFuZC5vcGVyYW5kMik7XG5cdFx0XHRjYXNlIFwiPFwiOlxuXHRcdFx0XHRyZXR1cm4gZ3JlYXRlck9yRXF1YWwob3BlcmFuZC5vcGVyYW5kMSwgb3BlcmFuZC5vcGVyYW5kMik7XG5cdFx0XHRjYXNlIFwiPD1cIjpcblx0XHRcdFx0cmV0dXJuIGdyZWF0ZXJUaGFuKG9wZXJhbmQub3BlcmFuZDEsIG9wZXJhbmQub3BlcmFuZDIpO1xuXHRcdFx0Y2FzZSBcIj09PVwiOlxuXHRcdFx0XHRyZXR1cm4gbm90RXF1YWwob3BlcmFuZC5vcGVyYW5kMSwgb3BlcmFuZC5vcGVyYW5kMik7XG5cdFx0XHRjYXNlIFwiPlwiOlxuXHRcdFx0XHRyZXR1cm4gbGVzc09yRXF1YWwob3BlcmFuZC5vcGVyYW5kMSwgb3BlcmFuZC5vcGVyYW5kMik7XG5cdFx0XHRjYXNlIFwiPj1cIjpcblx0XHRcdFx0cmV0dXJuIGxlc3NUaGFuKG9wZXJhbmQub3BlcmFuZDEsIG9wZXJhbmQub3BlcmFuZDIpO1xuXHRcdH1cblx0fSBlbHNlIGlmIChvcGVyYW5kLl90eXBlID09PSBcIk5vdFwiKSB7XG5cdFx0cmV0dXJuIG9wZXJhbmQub3BlcmFuZDtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0X3R5cGU6IFwiTm90XCIsXG5cdFx0XHRvcGVyYW5kOiBvcGVyYW5kXG5cdFx0fTtcblx0fVxufVxuXG4vKipcbiAqIEV2YWx1YXRlcyB3aGV0aGVyIGEgYmluZGluZyBleHByZXNzaW9uIGlzIGVxdWFsIHRvIHRydWUgd2l0aCBhIGxvb3NlIGVxdWFsaXR5LlxuICpcbiAqIEBwYXJhbSBvcGVyYW5kIFRoZSBleHByZXNzaW9uIHRvIGNoZWNrXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxib29sZWFuPn0gVGhlIHJlc3VsdGluZyBleHByZXNzaW9uIHRoYXQgZXZhbHVhdGVzIHRvIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzVHJ1dGh5KG9wZXJhbmQ6IEV4cHJlc3Npb248c3RyaW5nPik6IEV4cHJlc3Npb248Ym9vbGVhbj4ge1xuXHRpZiAoaXNDb25zdGFudChvcGVyYW5kKSkge1xuXHRcdHJldHVybiBjb25zdGFudCghIW9wZXJhbmQudmFsdWUpO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB7XG5cdFx0XHRfdHlwZTogXCJUcnV0aHlcIixcblx0XHRcdG9wZXJhbmQ6IG9wZXJhbmRcblx0XHR9O1xuXHR9XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGJpbmRpbmcgZXhwcmVzc2lvbiB0aGF0IHdpbGwgYmUgZXZhbHVhdGVkIGJ5IHRoZSBjb3JyZXNwb25kaW5nIG1vZGVsLlxuICpcbiAqIEB0ZW1wbGF0ZSBUYXJnZXRUeXBlXG4gKiBAcGFyYW0gcGF0aCBUaGUgcGF0aCBvbiB0aGUgbW9kZWxcbiAqIEBwYXJhbSBbbW9kZWxOYW1lXSBUaGUgbmFtZSBvZiB0aGUgbW9kZWxcbiAqIEBwYXJhbSBbdmlzaXRlZE5hdmlnYXRpb25QYXRoc10gVGhlIHBhdGhzIGZyb20gdGhlIHJvb3QgZW50aXR5U2V0XG4gKiBAcGFyYW0gW3BhdGhWaXNpdG9yXSBBIGZ1bmN0aW9uIHRvIG1vZGlmeSB0aGUgcmVzdWx0aW5nIHBhdGhcbiAqIEByZXR1cm5zIHtCaW5kaW5nRXhwcmVzc2lvbkV4cHJlc3Npb248VGFyZ2V0VHlwZT59IFRoZSBkZWZhdWx0IGJpbmRpbmcgZXhwcmVzc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYmluZGluZ0V4cHJlc3Npb248VGFyZ2V0VHlwZSBleHRlbmRzIFByaW1pdGl2ZVR5cGU+KFxuXHRwYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQsXG5cdG1vZGVsTmFtZT86IHN0cmluZyxcblx0dmlzaXRlZE5hdmlnYXRpb25QYXRoczogc3RyaW5nW10gPSBbXSxcblx0cGF0aFZpc2l0b3I/OiBGdW5jdGlvblxuKTogQmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPFRhcmdldFR5cGU+IHwgVW5yZXNvbHZlYWJsZUJpbmRpbmdFeHByZXNzaW9uIHtcblx0aWYgKHBhdGggPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiB1bnJlc29sdmVhYmxlRXhwcmVzc2lvbjtcblx0fVxuXHRsZXQgdGFyZ2V0UGF0aDtcblx0aWYgKHBhdGhWaXNpdG9yKSB7XG5cdFx0dGFyZ2V0UGF0aCA9IHBhdGhWaXNpdG9yKHBhdGgpO1xuXHRcdGlmICh0YXJnZXRQYXRoID09PSB1bmRlZmluZWQpIHtcblx0XHRcdHJldHVybiB1bnJlc29sdmVhYmxlRXhwcmVzc2lvbjtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgbG9jYWxQYXRoID0gdmlzaXRlZE5hdmlnYXRpb25QYXRocy5jb25jYXQoKTtcblx0XHRsb2NhbFBhdGgucHVzaChwYXRoKTtcblx0XHR0YXJnZXRQYXRoID0gbG9jYWxQYXRoLmpvaW4oXCIvXCIpO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0X3R5cGU6IFwiQmluZGluZ1wiLFxuXHRcdG1vZGVsTmFtZTogbW9kZWxOYW1lLFxuXHRcdHBhdGg6IHRhcmdldFBhdGhcblx0fTtcbn1cblxudHlwZSBQbGFpbkV4cHJlc3Npb25PYmplY3QgPSB7IFtpbmRleDogc3RyaW5nXTogRXhwcmVzc2lvbjxhbnk+IH07XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNvbnN0YW50IGV4cHJlc3Npb24gYmFzZWQgb24gYSBwcmltaXRpdmUgdmFsdWUuXG4gKlxuICogQHRlbXBsYXRlIFRcbiAqIEBwYXJhbSB2YWx1ZSBUaGUgY29uc3RhbnQgdG8gd3JhcCBpbiBhbiBleHByZXNzaW9uXG4gKiBAcmV0dXJucyB7Q29uc3RhbnRFeHByZXNzaW9uPFQ+fSBUaGUgY29uc3RhbnQgZXhwcmVzc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gY29uc3RhbnQ8VCBleHRlbmRzIFByaW1pdGl2ZVR5cGU+KHZhbHVlOiBUKTogQ29uc3RhbnRFeHByZXNzaW9uPFQ+IHtcblx0bGV0IGNvbnN0YW50VmFsdWU6IFQ7XG5cblx0aWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJvYmplY3RcIiAmJiB2YWx1ZSAhPT0gbnVsbCAmJiB2YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG5cdFx0XHRjb25zdGFudFZhbHVlID0gdmFsdWUubWFwKHdyYXBQcmltaXRpdmUpIGFzIFQ7XG5cdFx0fSBlbHNlIGlmIChpc1ByaW1pdGl2ZU9iamVjdCh2YWx1ZSBhcyBvYmplY3QpKSB7XG5cdFx0XHRjb25zdGFudFZhbHVlID0gdmFsdWUudmFsdWVPZigpIGFzIFQ7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGNvbnN0IHZhbCA9IHZhbHVlIGFzIHsgW25hbWU6IHN0cmluZ106IEV4cHJlc3Npb25PclByaW1pdGl2ZTxhbnk+IH07XG5cdFx0XHRjb25zdCBvYmogPSBPYmplY3Qua2V5cyh2YWwpLnJlZHVjZSgob2JqLCBrZXkpID0+IHtcblx0XHRcdFx0Y29uc3QgdmFsdWUgPSB3cmFwUHJpbWl0aXZlKHZhbFtrZXldKTtcblx0XHRcdFx0aWYgKHZhbHVlLl90eXBlICE9PSBcIkNvbnN0YW50XCIgfHwgdmFsdWUudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdG9ialtrZXldID0gdmFsdWU7XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIG9iajtcblx0XHRcdH0sIHt9IGFzIFBsYWluRXhwcmVzc2lvbk9iamVjdCk7XG5cblx0XHRcdGNvbnN0YW50VmFsdWUgPSBvYmogYXMgVDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3RhbnRWYWx1ZSA9IHZhbHVlO1xuXHR9XG5cblx0cmV0dXJuIHsgX3R5cGU6IFwiQ29uc3RhbnRcIiwgdmFsdWU6IGNvbnN0YW50VmFsdWUgfTtcbn1cblxudHlwZSBFdmFsdWF0aW9uVHlwZSA9IFwiYm9vbGVhblwiO1xuZXhwb3J0IGZ1bmN0aW9uIHJlc29sdmVCaW5kaW5nU3RyaW5nPFQgZXh0ZW5kcyBQcmltaXRpdmVUeXBlPihcblx0dmFsdWU6IHN0cmluZyB8IGJvb2xlYW4gfCBudW1iZXIsXG5cdHRhcmdldFR5cGU/OiBFdmFsdWF0aW9uVHlwZVxuKTogQ29uc3RhbnRFeHByZXNzaW9uPFQ+IHwgRW1iZWRkZWRCaW5kaW5nRXhwcmVzc2lvbjxUPiB8IEVtYmVkZGVkRXhwcmVzc2lvbkJpbmRpbmdFeHByZXNzaW9uPFQ+IHtcblx0aWYgKHZhbHVlICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmIHZhbHVlLnN0YXJ0c1dpdGgoXCJ7XCIpKSB7XG5cdFx0aWYgKHZhbHVlLnN0YXJ0c1dpdGgoXCJ7PVwiKSkge1xuXHRcdFx0Ly8gRXhwcmVzc2lvbiBiaW5kaW5nLCB3ZSBjYW4ganVzdCByZW1vdmUgdGhlIG91dGVyIGJpbmRpbmcgdGhpbmdzXG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRfdHlwZTogXCJFbWJlZGRlZEV4cHJlc3Npb25CaW5kaW5nXCIsXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0fTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0X3R5cGU6IFwiRW1iZWRkZWRCaW5kaW5nXCIsXG5cdFx0XHRcdHZhbHVlOiB2YWx1ZVxuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0c3dpdGNoICh0YXJnZXRUeXBlKSB7XG5cdFx0XHRjYXNlIFwiYm9vbGVhblwiOlxuXHRcdFx0XHRpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiICYmICh2YWx1ZSA9PT0gXCJ0cnVlXCIgfHwgdmFsdWUgPT09IFwiZmFsc2VcIikpIHtcblx0XHRcdFx0XHRyZXR1cm4gY29uc3RhbnQodmFsdWUgPT09IFwidHJ1ZVwiKSBhcyBDb25zdGFudEV4cHJlc3Npb248VD47XG5cdFx0XHRcdH1cblx0XHRcdFx0cmV0dXJuIGNvbnN0YW50KHZhbHVlKSBhcyBDb25zdGFudEV4cHJlc3Npb248VD47XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gY29uc3RhbnQodmFsdWUpIGFzIENvbnN0YW50RXhwcmVzc2lvbjxUPjtcblx0XHR9XG5cdH1cbn1cblxuLyoqXG4gKiBBIG5hbWVkIHJlZmVyZW5jZS5cbiAqXG4gKiBAc2VlIGZuXG4gKlxuICogQHBhcmFtIHJlZiBSZWZlcmVuY2VcbiAqIEByZXR1cm5zIHtSZWZlcmVuY2VFeHByZXNzaW9ufSBUaGUgb2JqZWN0IHJlZmVyZW5jZSBiaW5kaW5nIHBhcnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlZihyZWY6IHN0cmluZyB8IG51bGwpOiBSZWZlcmVuY2VFeHByZXNzaW9uIHtcblx0cmV0dXJuIHsgX3R5cGU6IFwiUmVmXCIsIHJlZiB9O1xufVxuXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIHRoZSB0eXBlIGlzIGFuIGV4cHJlc3Npb24uXG4gKlxuICogRXZlcnkgb2JqZWN0IGhhdmluZyBhIHByb3BlcnR5IG5hbWVkIGBfdHlwZWAgb2Ygc29tZSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFuIGV4cHJlc3Npb24sIGV2ZW4gaWYgdGhlcmUgaXMgYWN0dWFsbHlcbiAqIG5vIHN1Y2ggZXhwcmVzc2lvbiB0eXBlIHN1cHBvcnRlZC5cbiAqXG4gKiBAcGFyYW0gc29tZXRoaW5nIFR5cGUgdG8gY2hlY2tcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIHR5cGUgaXMgY29uc2lkZXJlZCB0byBiZSBhbiBleHByZXNzaW9uXG4gKi9cbmZ1bmN0aW9uIGlzRXhwcmVzc2lvbjxUIGV4dGVuZHMgUHJpbWl0aXZlVHlwZT4oc29tZXRoaW5nOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD4pOiBzb21ldGhpbmcgaXMgRXhwcmVzc2lvbjxUPiB7XG5cdHJldHVybiBzb21ldGhpbmcgIT09IG51bGwgJiYgdHlwZW9mIHNvbWV0aGluZyA9PT0gXCJvYmplY3RcIiAmJiAoc29tZXRoaW5nIGFzIEJhc2VFeHByZXNzaW9uPFQ+KS5fdHlwZSAhPT0gdW5kZWZpbmVkO1xufVxuXG4vKipcbiAqIFdyYXAgYSBwcmltaXRpdmUgaW50byBhIGNvbnN0YW50IGV4cHJlc3Npb24gaWYgaXQgaXMgbm90IGFscmVhZHkgYW4gZXhwcmVzc2lvbi5cbiAqXG4gKiBAdGVtcGxhdGUgVFxuICogQHBhcmFtIHNvbWV0aGluZyBUaGUgb2JqZWN0IHRvIHdyYXAgaW4gYSBDb25zdGFudCBleHByZXNzaW9uXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxUPn0gRWl0aGVyIHRoZSBvcmlnaW5hbCBvYmplY3Qgb3IgdGhlIHdyYXBwZWQgb25lIGRlcGVuZGluZyBvbiB0aGUgY2FzZVxuICovXG5mdW5jdGlvbiB3cmFwUHJpbWl0aXZlPFQgZXh0ZW5kcyBQcmltaXRpdmVUeXBlPihzb21ldGhpbmc6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxUPik6IEV4cHJlc3Npb248VD4ge1xuXHRpZiAoaXNFeHByZXNzaW9uKHNvbWV0aGluZykpIHtcblx0XHRyZXR1cm4gc29tZXRoaW5nO1xuXHR9XG5cblx0cmV0dXJuIGNvbnN0YW50KHNvbWV0aGluZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBleHByZXNzaW9uIG9yIHZhbHVlIHByb3ZpZGVkIGlzIGNvbnN0YW50IG9yIG5vdC5cbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdGFyZ2V0IHR5cGVcbiAqIEBwYXJhbSAgbWF5YmVDb25zdGFudCBUaGUgZXhwcmVzc2lvbiBvciBwcmltaXRpdmUgdmFsdWUgdGhhdCBpcyB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGl0IGlzIGNvbnN0YW50XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0NvbnN0YW50PFQgZXh0ZW5kcyBQcmltaXRpdmVUeXBlPihtYXliZUNvbnN0YW50OiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD4pOiBtYXliZUNvbnN0YW50IGlzIENvbnN0YW50RXhwcmVzc2lvbjxUPiB7XG5cdHJldHVybiB0eXBlb2YgbWF5YmVDb25zdGFudCAhPT0gXCJvYmplY3RcIiB8fCAobWF5YmVDb25zdGFudCBhcyBCYXNlRXhwcmVzc2lvbjxUPikuX3R5cGUgPT09IFwiQ29uc3RhbnRcIjtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGV4cHJlc3Npb24gb3IgdmFsdWUgcHJvdmlkZWQgaXMgYmluZGluZyBvciBub3QuXG4gKlxuICogQHRlbXBsYXRlIFQgVGhlIHRhcmdldCB0eXBlXG4gKiBAcGFyYW0gIG1heWJlQmluZGluZyBUaGUgZXhwcmVzc2lvbiBvciBwcmltaXRpdmUgdmFsdWUgdGhhdCBpcyB0byBiZSBjaGVja2VkXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIGl0IGlzIGJpbmRpbmdcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGlzQmluZGluZzxUIGV4dGVuZHMgUHJpbWl0aXZlVHlwZT4obWF5YmVCaW5kaW5nOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD4pOiBtYXliZUJpbmRpbmcgaXMgQmluZGluZ0V4cHJlc3Npb25FeHByZXNzaW9uPFQ+IHtcblx0cmV0dXJuIHR5cGVvZiBtYXliZUJpbmRpbmcgPT09IFwib2JqZWN0XCIgJiYgKG1heWJlQmluZGluZyBhcyBCYXNlRXhwcmVzc2lvbjxUPikuX3R5cGUgPT09IFwiQmluZGluZ1wiO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiB0aGUgZXhwcmVzc2lvbiBwcm92aWRlZCBpcyBhIGNvbXBhcmlzb24gb3Igbm90LlxuICpcbiAqIEB0ZW1wbGF0ZSBUIFRoZSB0YXJnZXQgdHlwZVxuICogQHBhcmFtIGV4cHJlc3Npb24gVGhlIGV4cHJlc3Npb25cbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlIGV4cHJlc3Npb24gaXMgYSBDb21wYXJpc29uRXhwcmVzc2lvblxuICovXG5mdW5jdGlvbiBpc0NvbXBhcmlzb248VCBleHRlbmRzIFByaW1pdGl2ZVR5cGU+KGV4cHJlc3Npb246IEV4cHJlc3Npb248VD4pOiBleHByZXNzaW9uIGlzIENvbXBhcmlzb25FeHByZXNzaW9uIHtcblx0cmV0dXJuIGV4cHJlc3Npb24uX3R5cGUgPT09IFwiQ29tcGFyaXNvblwiO1xufVxuXG50eXBlIENvbXBsZXhBbm5vdGF0aW9uRXhwcmVzc2lvbjxQPiA9XG5cdHwgUGF0aEFubm90YXRpb25FeHByZXNzaW9uPFA+XG5cdHwgQXBwbHlBbm5vdGF0aW9uRXhwcmVzc2lvbjxQPlxuXHR8IElmQW5ub3RhdGlvbkV4cHJlc3Npb248UD5cblx0fCBPckFubm90YXRpb25FeHByZXNzaW9uPFA+XG5cdHwgQW5kQW5ub3RhdGlvbkV4cHJlc3Npb248UD5cblx0fCBOZUFubm90YXRpb25FeHByZXNzaW9uPFA+XG5cdHwgRXFBbm5vdGF0aW9uRXhwcmVzc2lvbjxQPlxuXHR8IE5vdEFubm90YXRpb25FeHByZXNzaW9uPFA+XG5cdHwgR3RBbm5vdGF0aW9uRXhwcmVzc2lvbjxQPlxuXHR8IEdlQW5ub3RhdGlvbkV4cHJlc3Npb248UD5cblx0fCBMZUFubm90YXRpb25FeHByZXNzaW9uPFA+XG5cdHwgTHRBbm5vdGF0aW9uRXhwcmVzc2lvbjxQPjtcblxuZnVuY3Rpb24gaXNQcmltaXRpdmVPYmplY3Qob2JqZWN0VHlwZTogb2JqZWN0KTogYm9vbGVhbiB7XG5cdHN3aXRjaCAob2JqZWN0VHlwZS5jb25zdHJ1Y3Rvci5uYW1lKSB7XG5cdFx0Y2FzZSBcIlN0cmluZ1wiOlxuXHRcdGNhc2UgXCJOdW1iZXJcIjpcblx0XHRjYXNlIFwiQm9vbGVhblwiOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0fVxufVxuLyoqXG4gKiBDaGVjayBpZiB0aGUgcGFzc2VkIGFubm90YXRpb24gZXhwcmVzc2lvbiBpcyBhIENvbXBsZXhBbm5vdGF0aW9uRXhwcmVzc2lvbi5cbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdGFyZ2V0IHR5cGVcbiAqIEBwYXJhbSAgYW5ub3RhdGlvbkV4cHJlc3Npb24gVGhlIGFubm90YXRpb24gZXhwcmVzc2lvbiB0byBldmFsdWF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgb2JqZWN0IGlzIGEge0NvbXBsZXhBbm5vdGF0aW9uRXhwcmVzc2lvbn1cbiAqL1xuZnVuY3Rpb24gaXNDb21wbGV4QW5ub3RhdGlvbkV4cHJlc3Npb248VD4oXG5cdGFubm90YXRpb25FeHByZXNzaW9uOiBQcm9wZXJ0eUFubm90YXRpb25WYWx1ZTxUPlxuKTogYW5ub3RhdGlvbkV4cHJlc3Npb24gaXMgQ29tcGxleEFubm90YXRpb25FeHByZXNzaW9uPFQ+IHtcblx0cmV0dXJuIHR5cGVvZiBhbm5vdGF0aW9uRXhwcmVzc2lvbiA9PT0gXCJvYmplY3RcIiAmJiAhaXNQcmltaXRpdmVPYmplY3QoYW5ub3RhdGlvbkV4cHJlc3Npb24gYXMgb2JqZWN0KTtcbn1cblxuLyoqXG4gKiBHZW5lcmF0ZSB0aGUgY29ycmVzcG9uZGluZyBleHByZXNzaW9uIGZvciBhIGdpdmVuIGFubm90YXRpb24gZXhwcmVzc2lvbi5cbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdGFyZ2V0IHR5cGVcbiAqIEBwYXJhbSBhbm5vdGF0aW9uRXhwcmVzc2lvbiBUaGUgc291cmNlIGFubm90YXRpb24gZXhwcmVzc2lvblxuICogQHBhcmFtIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMgVGhlIHBhdGggZnJvbSB0aGUgcm9vdCBlbnRpdHkgc2V0XG4gKiBAcGFyYW0gZGVmYXVsdFZhbHVlIERlZmF1bHQgdmFsdWUgaWYgdGhlIGFubm90YXRpb25FeHByZXNzaW9uIGlzIHVuZGVmaW5lZFxuICogQHBhcmFtIHBhdGhWaXNpdG9yIEEgZnVuY3Rpb24gdG8gbW9kaWZ5IHRoZSByZXN1bHRpbmcgcGF0aFxuICogQHJldHVybnMge0V4cHJlc3Npb248VD59IFRoZSBleHByZXNzaW9uIGVxdWl2YWxlbnQgdG8gdGhhdCBhbm5vdGF0aW9uIGV4cHJlc3Npb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFubm90YXRpb25FeHByZXNzaW9uPFQgZXh0ZW5kcyBQcmltaXRpdmVUeXBlPihcblx0YW5ub3RhdGlvbkV4cHJlc3Npb246IFByb3BlcnR5QW5ub3RhdGlvblZhbHVlPFQ+LFxuXHR2aXNpdGVkTmF2aWdhdGlvblBhdGhzOiBzdHJpbmdbXSA9IFtdLFxuXHRkZWZhdWx0VmFsdWU/OiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD4sXG5cdHBhdGhWaXNpdG9yPzogRnVuY3Rpb25cbik6IEV4cHJlc3Npb248VD4ge1xuXHRpZiAoYW5ub3RhdGlvbkV4cHJlc3Npb24gPT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiB3cmFwUHJpbWl0aXZlKGRlZmF1bHRWYWx1ZSBhcyBUKTtcblx0fVxuXHRpZiAoIWlzQ29tcGxleEFubm90YXRpb25FeHByZXNzaW9uKGFubm90YXRpb25FeHByZXNzaW9uKSkge1xuXHRcdHJldHVybiBjb25zdGFudChhbm5vdGF0aW9uRXhwcmVzc2lvbik7XG5cdH0gZWxzZSB7XG5cdFx0c3dpdGNoIChhbm5vdGF0aW9uRXhwcmVzc2lvbi50eXBlKSB7XG5cdFx0XHRjYXNlIFwiUGF0aFwiOlxuXHRcdFx0XHRyZXR1cm4gYmluZGluZ0V4cHJlc3Npb24oYW5ub3RhdGlvbkV4cHJlc3Npb24ucGF0aCwgdW5kZWZpbmVkLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcik7XG5cdFx0XHRjYXNlIFwiSWZcIjpcblx0XHRcdFx0cmV0dXJuIGFubm90YXRpb25JZkV4cHJlc3Npb24oYW5ub3RhdGlvbkV4cHJlc3Npb24uSWYsIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKTtcblx0XHRcdGNhc2UgXCJOb3RcIjpcblx0XHRcdFx0cmV0dXJuIG5vdChwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5ub3RhdGlvbkV4cHJlc3Npb24uTm90LCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcikpIGFzIEV4cHJlc3Npb248VD47XG5cdFx0XHRjYXNlIFwiRXFcIjpcblx0XHRcdFx0cmV0dXJuIGVxdWFsKFxuXHRcdFx0XHRcdHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbihhbm5vdGF0aW9uRXhwcmVzc2lvbi5FcVswXSwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpLFxuXHRcdFx0XHRcdHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbihhbm5vdGF0aW9uRXhwcmVzc2lvbi5FcVsxXSwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpXG5cdFx0XHRcdCkgYXMgRXhwcmVzc2lvbjxUPjtcblx0XHRcdGNhc2UgXCJOZVwiOlxuXHRcdFx0XHRyZXR1cm4gbm90RXF1YWwoXG5cdFx0XHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKGFubm90YXRpb25FeHByZXNzaW9uLk5lWzBdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvciksXG5cdFx0XHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKGFubm90YXRpb25FeHByZXNzaW9uLk5lWzFdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcilcblx0XHRcdFx0KSBhcyBFeHByZXNzaW9uPFQ+O1xuXHRcdFx0Y2FzZSBcIkd0XCI6XG5cdFx0XHRcdHJldHVybiBncmVhdGVyVGhhbihcblx0XHRcdFx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5ub3RhdGlvbkV4cHJlc3Npb24uR3RbMF0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKSxcblx0XHRcdFx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5ub3RhdGlvbkV4cHJlc3Npb24uR3RbMV0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKVxuXHRcdFx0XHQpIGFzIEV4cHJlc3Npb248VD47XG5cdFx0XHRjYXNlIFwiR2VcIjpcblx0XHRcdFx0cmV0dXJuIGdyZWF0ZXJPckVxdWFsKFxuXHRcdFx0XHRcdHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbihhbm5vdGF0aW9uRXhwcmVzc2lvbi5HZVswXSwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpLFxuXHRcdFx0XHRcdHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbihhbm5vdGF0aW9uRXhwcmVzc2lvbi5HZVsxXSwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpXG5cdFx0XHRcdCkgYXMgRXhwcmVzc2lvbjxUPjtcblx0XHRcdGNhc2UgXCJMdFwiOlxuXHRcdFx0XHRyZXR1cm4gbGVzc1RoYW4oXG5cdFx0XHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKGFubm90YXRpb25FeHByZXNzaW9uLkx0WzBdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvciksXG5cdFx0XHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKGFubm90YXRpb25FeHByZXNzaW9uLkx0WzFdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcilcblx0XHRcdFx0KSBhcyBFeHByZXNzaW9uPFQ+O1xuXHRcdFx0Y2FzZSBcIkxlXCI6XG5cdFx0XHRcdHJldHVybiBsZXNzT3JFcXVhbChcblx0XHRcdFx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5ub3RhdGlvbkV4cHJlc3Npb24uTGVbMF0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKSxcblx0XHRcdFx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5ub3RhdGlvbkV4cHJlc3Npb24uTGVbMV0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKVxuXHRcdFx0XHQpIGFzIEV4cHJlc3Npb248VD47XG5cdFx0XHRjYXNlIFwiT3JcIjpcblx0XHRcdFx0cmV0dXJuIG9yKFxuXHRcdFx0XHRcdC4uLihhbm5vdGF0aW9uRXhwcmVzc2lvbi5Pci5tYXAoZnVuY3Rpb24ob3JDb25kaXRpb24pIHtcblx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUFubm90YXRpb25Db25kaXRpb24ob3JDb25kaXRpb24sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKTtcblx0XHRcdFx0XHR9KSBhcyBFeHByZXNzaW9uPGJvb2xlYW4+W10pXG5cdFx0XHRcdCkgYXMgRXhwcmVzc2lvbjxUPjtcblx0XHRcdGNhc2UgXCJBbmRcIjpcblx0XHRcdFx0cmV0dXJuIGFuZChcblx0XHRcdFx0XHQuLi4oYW5ub3RhdGlvbkV4cHJlc3Npb24uQW5kLm1hcChmdW5jdGlvbihhbmRDb25kaXRpb24pIHtcblx0XHRcdFx0XHRcdHJldHVybiBwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5kQ29uZGl0aW9uLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcik7XG5cdFx0XHRcdFx0fSkgYXMgRXhwcmVzc2lvbjxib29sZWFuPltdKVxuXHRcdFx0XHQpIGFzIEV4cHJlc3Npb248VD47XG5cdFx0XHRjYXNlIFwiQXBwbHlcIjpcblx0XHRcdFx0cmV0dXJuIGFubm90YXRpb25BcHBseUV4cHJlc3Npb24oXG5cdFx0XHRcdFx0YW5ub3RhdGlvbkV4cHJlc3Npb24gYXMgQXBwbHlBbm5vdGF0aW9uRXhwcmVzc2lvbjxzdHJpbmc+LFxuXHRcdFx0XHRcdHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsXG5cdFx0XHRcdFx0cGF0aFZpc2l0b3Jcblx0XHRcdFx0KSBhcyBFeHByZXNzaW9uPFQ+O1xuXHRcdH1cblx0fVxufVxuXG4vKipcbiAqIFBhcnNlIHRoZSBhbm5vdGF0aW9uIGNvbmRpdGlvbiBpbnRvIGFuIGV4cHJlc3Npb24uXG4gKlxuICogQHRlbXBsYXRlIFQgVGhlIHRhcmdldCB0eXBlXG4gKiBAcGFyYW0gYW5ub3RhdGlvblZhbHVlIFRoZSBjb25kaXRpb24gb3IgdmFsdWUgZnJvbSB0aGUgYW5ub3RhdGlvblxuICogQHBhcmFtIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMgVGhlIHBhdGggZnJvbSB0aGUgcm9vdCBlbnRpdHkgc2V0XG4gKiBAcGFyYW0gcGF0aFZpc2l0b3IgQSBmdW5jdGlvbiB0byBtb2RpZnkgdGhlIHJlc3VsdGluZyBwYXRoXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxUPn0gQW4gZXF1aXZhbGVudCBleHByZXNzaW9uXG4gKi9cbmZ1bmN0aW9uIHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbjxUIGV4dGVuZHMgUHJpbWl0aXZlVHlwZT4oXG5cdGFubm90YXRpb25WYWx1ZTogQ29uZGl0aW9uYWxDaGVja09yVmFsdWUsXG5cdHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHM6IHN0cmluZ1tdID0gW10sXG5cdHBhdGhWaXNpdG9yPzogRnVuY3Rpb25cbik6IEV4cHJlc3Npb248VD4ge1xuXHRpZiAoYW5ub3RhdGlvblZhbHVlID09PSBudWxsIHx8IHR5cGVvZiBhbm5vdGF0aW9uVmFsdWUgIT09IFwib2JqZWN0XCIpIHtcblx0XHRyZXR1cm4gY29uc3RhbnQoYW5ub3RhdGlvblZhbHVlIGFzIFQpO1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25WYWx1ZS5oYXNPd25Qcm9wZXJ0eShcIiRPclwiKSkge1xuXHRcdHJldHVybiBvcihcblx0XHRcdC4uLigoKGFubm90YXRpb25WYWx1ZSBhcyBPckNvbmRpdGlvbmFsRXhwcmVzc2lvbikuJE9yLm1hcChmdW5jdGlvbihvckNvbmRpdGlvbikge1xuXHRcdFx0XHRyZXR1cm4gcGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKG9yQ29uZGl0aW9uLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcik7XG5cdFx0XHR9KSBhcyB1bmtub3duKSBhcyBFeHByZXNzaW9uPGJvb2xlYW4+W10pXG5cdFx0KSBhcyBFeHByZXNzaW9uPFQ+O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25WYWx1ZS5oYXNPd25Qcm9wZXJ0eShcIiRBbmRcIikpIHtcblx0XHRyZXR1cm4gYW5kKFxuXHRcdFx0Li4uKCgoYW5ub3RhdGlvblZhbHVlIGFzIEFuZENvbmRpdGlvbmFsRXhwcmVzc2lvbikuJEFuZC5tYXAoZnVuY3Rpb24oYW5kQ29uZGl0aW9uKSB7XG5cdFx0XHRcdHJldHVybiBwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5kQ29uZGl0aW9uLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcik7XG5cdFx0XHR9KSBhcyB1bmtub3duKSBhcyBFeHByZXNzaW9uPGJvb2xlYW4+W10pXG5cdFx0KSBhcyBFeHByZXNzaW9uPFQ+O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25WYWx1ZS5oYXNPd25Qcm9wZXJ0eShcIiROb3RcIikpIHtcblx0XHRyZXR1cm4gbm90KFxuXHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKChhbm5vdGF0aW9uVmFsdWUgYXMgTm90Q29uZGl0aW9uYWxFeHByZXNzaW9uKS4kTm90WzBdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcilcblx0XHQpIGFzIEV4cHJlc3Npb248VD47XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvblZhbHVlLmhhc093blByb3BlcnR5KFwiJEVxXCIpKSB7XG5cdFx0cmV0dXJuIGVxdWFsKFxuXHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKChhbm5vdGF0aW9uVmFsdWUgYXMgRXFDb25kaXRpb25hbEV4cHJlc3Npb24pLiRFcVswXSwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpLFxuXHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKChhbm5vdGF0aW9uVmFsdWUgYXMgRXFDb25kaXRpb25hbEV4cHJlc3Npb24pLiRFcVsxXSwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpXG5cdFx0KSBhcyBFeHByZXNzaW9uPFQ+O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25WYWx1ZS5oYXNPd25Qcm9wZXJ0eShcIiROZVwiKSkge1xuXHRcdHJldHVybiBub3RFcXVhbChcblx0XHRcdHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbigoYW5ub3RhdGlvblZhbHVlIGFzIE5lQ29uZGl0aW9uYWxFeHByZXNzaW9uKS4kTmVbMF0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKSxcblx0XHRcdHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbigoYW5ub3RhdGlvblZhbHVlIGFzIE5lQ29uZGl0aW9uYWxFeHByZXNzaW9uKS4kTmVbMV0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKVxuXHRcdCkgYXMgRXhwcmVzc2lvbjxUPjtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uVmFsdWUuaGFzT3duUHJvcGVydHkoXCIkR3RcIikpIHtcblx0XHRyZXR1cm4gZ3JlYXRlclRoYW4oXG5cdFx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oKGFubm90YXRpb25WYWx1ZSBhcyBHdENvbmRpdGlvbmFsRXhwcmVzc2lvbikuJEd0WzBdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvciksXG5cdFx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oKGFubm90YXRpb25WYWx1ZSBhcyBHdENvbmRpdGlvbmFsRXhwcmVzc2lvbikuJEd0WzFdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcilcblx0XHQpIGFzIEV4cHJlc3Npb248VD47XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvblZhbHVlLmhhc093blByb3BlcnR5KFwiJEdlXCIpKSB7XG5cdFx0cmV0dXJuIGdyZWF0ZXJPckVxdWFsKFxuXHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKChhbm5vdGF0aW9uVmFsdWUgYXMgR2VDb25kaXRpb25hbEV4cHJlc3Npb24pLiRHZVswXSwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpLFxuXHRcdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKChhbm5vdGF0aW9uVmFsdWUgYXMgR2VDb25kaXRpb25hbEV4cHJlc3Npb24pLiRHZVsxXSwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpXG5cdFx0KSBhcyBFeHByZXNzaW9uPFQ+O1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25WYWx1ZS5oYXNPd25Qcm9wZXJ0eShcIiRMdFwiKSkge1xuXHRcdHJldHVybiBsZXNzVGhhbihcblx0XHRcdHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbigoYW5ub3RhdGlvblZhbHVlIGFzIEx0Q29uZGl0aW9uYWxFeHByZXNzaW9uKS4kTHRbMF0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKSxcblx0XHRcdHBhcnNlQW5ub3RhdGlvbkNvbmRpdGlvbigoYW5ub3RhdGlvblZhbHVlIGFzIEx0Q29uZGl0aW9uYWxFeHByZXNzaW9uKS4kTHRbMV0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKVxuXHRcdCkgYXMgRXhwcmVzc2lvbjxUPjtcblx0fSBlbHNlIGlmIChhbm5vdGF0aW9uVmFsdWUuaGFzT3duUHJvcGVydHkoXCIkTGVcIikpIHtcblx0XHRyZXR1cm4gbGVzc09yRXF1YWwoXG5cdFx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oKGFubm90YXRpb25WYWx1ZSBhcyBMZUNvbmRpdGlvbmFsRXhwcmVzc2lvbikuJExlWzBdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvciksXG5cdFx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oKGFubm90YXRpb25WYWx1ZSBhcyBMZUNvbmRpdGlvbmFsRXhwcmVzc2lvbikuJExlWzFdLCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzLCBwYXRoVmlzaXRvcilcblx0XHQpIGFzIEV4cHJlc3Npb248VD47XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvblZhbHVlLmhhc093blByb3BlcnR5KFwiJFBhdGhcIikpIHtcblx0XHRyZXR1cm4gYmluZGluZ0V4cHJlc3Npb24oKGFubm90YXRpb25WYWx1ZSBhcyBQYXRoQ29uZGl0aW9uRXhwcmVzc2lvbjxUPikuJFBhdGgsIHVuZGVmaW5lZCwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgcGF0aFZpc2l0b3IpO1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25WYWx1ZS5oYXNPd25Qcm9wZXJ0eShcIiRBcHBseVwiKSkge1xuXHRcdHJldHVybiBhbm5vdGF0aW9uRXhwcmVzc2lvbihcblx0XHRcdHtcblx0XHRcdFx0dHlwZTogXCJBcHBseVwiLFxuXHRcdFx0XHRGdW5jdGlvbjogKGFubm90YXRpb25WYWx1ZSBhcyBhbnkpLiRGdW5jdGlvbixcblx0XHRcdFx0QXBwbHk6IChhbm5vdGF0aW9uVmFsdWUgYXMgYW55KS4kQXBwbHlcblx0XHRcdH0gYXMgVCxcblx0XHRcdHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsXG5cdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRwYXRoVmlzaXRvclxuXHRcdCk7XG5cdH0gZWxzZSBpZiAoYW5ub3RhdGlvblZhbHVlLmhhc093blByb3BlcnR5KFwiJElmXCIpKSB7XG5cdFx0cmV0dXJuIGFubm90YXRpb25FeHByZXNzaW9uKFxuXHRcdFx0e1xuXHRcdFx0XHR0eXBlOiBcIklmXCIsXG5cdFx0XHRcdElmOiAoYW5ub3RhdGlvblZhbHVlIGFzIGFueSkuJElmXG5cdFx0XHR9IGFzIFQsXG5cdFx0XHR2aXNpdGVkTmF2aWdhdGlvblBhdGhzLFxuXHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0cGF0aFZpc2l0b3Jcblx0XHQpO1xuXHR9IGVsc2UgaWYgKGFubm90YXRpb25WYWx1ZS5oYXNPd25Qcm9wZXJ0eShcIiRFbnVtTWVtYmVyXCIpKSB7XG5cdFx0cmV0dXJuIGNvbnN0YW50KHJlc29sdmVFbnVtVmFsdWUoKGFubm90YXRpb25WYWx1ZSBhcyBhbnkpLiRFbnVtTWVtYmVyKSBhcyBUKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gY29uc3RhbnQoZmFsc2UgYXMgVCk7XG5cdH1cbn1cblxuLyoqXG4gKiBQcm9jZXNzIHRoZSB7SWZBbm5vdGF0aW9uRXhwcmVzc2lvblZhbHVlfSBpbnRvIGFuIGV4cHJlc3Npb24uXG4gKlxuICogQHRlbXBsYXRlIFQgVGhlIHRhcmdldCB0eXBlXG4gKiBAcGFyYW0gYW5ub3RhdGlvbklmRXhwcmVzc2lvbiBBbiBJZiBleHByZXNzaW9uIHJldHVybmluZyB0aGUgdHlwZSBUXG4gKiBAcGFyYW0gdmlzaXRlZE5hdmlnYXRpb25QYXRocyBUaGUgcGF0aCBmcm9tIHRoZSByb290IGVudGl0eSBzZXRcbiAqIEBwYXJhbSBwYXRoVmlzaXRvciBBIGZ1bmN0aW9uIHRvIG1vZGlmeSB0aGUgcmVzdWx0aW5nIHBhdGhcbiAqIEByZXR1cm5zIHtFeHByZXNzaW9uPFQ+fSBUaGUgZXF1aXZhbGVudCBpZkVsc2UgZXhwcmVzc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYW5ub3RhdGlvbklmRXhwcmVzc2lvbjxUIGV4dGVuZHMgUHJpbWl0aXZlVHlwZT4oXG5cdGFubm90YXRpb25JZkV4cHJlc3Npb246IElmQW5ub3RhdGlvbkV4cHJlc3Npb25WYWx1ZTxUPixcblx0dmlzaXRlZE5hdmlnYXRpb25QYXRoczogc3RyaW5nW10gPSBbXSxcblx0cGF0aFZpc2l0b3I/OiBGdW5jdGlvblxuKTogRXhwcmVzc2lvbjxUPiB7XG5cdHJldHVybiBpZkVsc2UoXG5cdFx0cGFyc2VBbm5vdGF0aW9uQ29uZGl0aW9uKGFubm90YXRpb25JZkV4cHJlc3Npb25bMF0sIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKSxcblx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5ub3RhdGlvbklmRXhwcmVzc2lvblsxXSBhcyBhbnksIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKSxcblx0XHRwYXJzZUFubm90YXRpb25Db25kaXRpb24oYW5ub3RhdGlvbklmRXhwcmVzc2lvblsyXSBhcyBhbnksIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMsIHBhdGhWaXNpdG9yKVxuXHQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYW5ub3RhdGlvbkFwcGx5RXhwcmVzc2lvbihcblx0YW5ub3RhdGlvbkFwcGx5RXhwcmVzc2lvbjogQXBwbHlBbm5vdGF0aW9uRXhwcmVzc2lvbjxzdHJpbmc+LFxuXHR2aXNpdGVkTmF2aWdhdGlvblBhdGhzOiBzdHJpbmdbXSA9IFtdLFxuXHRwYXRoVmlzaXRvcj86IEZ1bmN0aW9uXG4pOiBFeHByZXNzaW9uPHN0cmluZz4ge1xuXHRzd2l0Y2ggKGFubm90YXRpb25BcHBseUV4cHJlc3Npb24uRnVuY3Rpb24pIHtcblx0XHRjYXNlIFwib2RhdGEuY29uY2F0XCI6XG5cdFx0XHRyZXR1cm4gY29uY2F0KFxuXHRcdFx0XHQuLi5hbm5vdGF0aW9uQXBwbHlFeHByZXNzaW9uLkFwcGx5Lm1hcCgoYXBwbHlQYXJhbTogYW55KSA9PiB7XG5cdFx0XHRcdFx0bGV0IGFwcGx5UGFyYW1Db252ZXJ0ZWQgPSBhcHBseVBhcmFtO1xuXHRcdFx0XHRcdGlmIChhcHBseVBhcmFtLmhhc093blByb3BlcnR5KFwiJFBhdGhcIikpIHtcblx0XHRcdFx0XHRcdGFwcGx5UGFyYW1Db252ZXJ0ZWQgPSB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IFwiUGF0aFwiLFxuXHRcdFx0XHRcdFx0XHRwYXRoOiBhcHBseVBhcmFtLiRQYXRoXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYXBwbHlQYXJhbS5oYXNPd25Qcm9wZXJ0eShcIiRJZlwiKSkge1xuXHRcdFx0XHRcdFx0YXBwbHlQYXJhbUNvbnZlcnRlZCA9IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJJZlwiLFxuXHRcdFx0XHRcdFx0XHRJZjogYXBwbHlQYXJhbS4kSWZcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhcHBseVBhcmFtLmhhc093blByb3BlcnR5KFwiJEFwcGx5XCIpKSB7XG5cdFx0XHRcdFx0XHRhcHBseVBhcmFtQ29udmVydGVkID0ge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBcIkFwcGx5XCIsXG5cdFx0XHRcdFx0XHRcdEZ1bmN0aW9uOiBhcHBseVBhcmFtLiRGdW5jdGlvbixcblx0XHRcdFx0XHRcdFx0QXBwbHk6IGFwcGx5UGFyYW0uJEFwcGx5XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gYW5ub3RhdGlvbkV4cHJlc3Npb24oYXBwbHlQYXJhbUNvbnZlcnRlZCwgdmlzaXRlZE5hdmlnYXRpb25QYXRocywgdW5kZWZpbmVkLCBwYXRoVmlzaXRvcik7XG5cdFx0XHRcdH0pXG5cdFx0XHQpO1xuXHRcdFx0YnJlYWs7XG5cdH1cbn1cblxuLyoqXG4gKiBHZW5lcmljIGhlbHBlciBmb3IgdGhlIGNvbXBhcmlzb24gb3BlcmF0aW9ucyAoZXF1YWwsIG5vdEVxdWFsLCAuLi4pLlxuICpcbiAqIEB0ZW1wbGF0ZSBUIFRoZSB0YXJnZXQgdHlwZVxuICogQHBhcmFtIG9wZXJhdG9yIFRoZSBvcGVyYXRvciB0byBhcHBseVxuICogQHBhcmFtIGxlZnRPcGVyYW5kIFRoZSBvcGVyYW5kIG9uIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIG9wZXJhdG9yXG4gKiBAcGFyYW0gcmlnaHRPcGVyYW5kIFRoZSBvcGVyYW5kIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSBvcGVyYXRvclxuICogQHJldHVybnMge0V4cHJlc3Npb248Ym9vbGVhbj59IEFuIGV4cHJlc3Npb24gcmVwcmVzZW50aW5nIHRoZSBjb21wYXJpc29uXG4gKi9cbmZ1bmN0aW9uIGNvbXBhcmlzb248VCBleHRlbmRzIFByaW1pdGl2ZVR5cGU+KFxuXHRvcGVyYXRvcjogQ29tcGFyaXNvbk9wZXJhdG9yLFxuXHRsZWZ0T3BlcmFuZDogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPFQ+LFxuXHRyaWdodE9wZXJhbmQ6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxUPlxuKTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdGNvbnN0IGxlZnRFeHByZXNzaW9uID0gd3JhcFByaW1pdGl2ZShsZWZ0T3BlcmFuZCk7XG5cdGNvbnN0IHJpZ2h0RXhwcmVzc2lvbiA9IHdyYXBQcmltaXRpdmUocmlnaHRPcGVyYW5kKTtcblx0aWYgKGhhc1VucmVzb2x2ZWFibGVFeHByZXNzaW9uKGxlZnRFeHByZXNzaW9uLCByaWdodEV4cHJlc3Npb24pKSB7XG5cdFx0cmV0dXJuIHVucmVzb2x2ZWFibGVFeHByZXNzaW9uO1xuXHR9XG5cdGlmIChpc0NvbnN0YW50KGxlZnRFeHByZXNzaW9uKSAmJiBpc0NvbnN0YW50KHJpZ2h0RXhwcmVzc2lvbikpIHtcblx0XHRpZiAobGVmdEV4cHJlc3Npb24udmFsdWUgPT09IHVuZGVmaW5lZCB8fCByaWdodEV4cHJlc3Npb24udmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cmV0dXJuIGNvbnN0YW50KGxlZnRFeHByZXNzaW9uLnZhbHVlID09PSByaWdodEV4cHJlc3Npb24udmFsdWUpO1xuXHRcdH1cblxuXHRcdHN3aXRjaCAob3BlcmF0b3IpIHtcblx0XHRcdGNhc2UgXCIhPT1cIjpcblx0XHRcdFx0cmV0dXJuIGNvbnN0YW50KGxlZnRFeHByZXNzaW9uLnZhbHVlICE9PSByaWdodEV4cHJlc3Npb24udmFsdWUpO1xuXHRcdFx0Y2FzZSBcIjxcIjpcblx0XHRcdFx0cmV0dXJuIGNvbnN0YW50KGxlZnRFeHByZXNzaW9uLnZhbHVlIDwgcmlnaHRFeHByZXNzaW9uLnZhbHVlKTtcblx0XHRcdGNhc2UgXCI8PVwiOlxuXHRcdFx0XHRyZXR1cm4gY29uc3RhbnQobGVmdEV4cHJlc3Npb24udmFsdWUgPD0gcmlnaHRFeHByZXNzaW9uLnZhbHVlKTtcblx0XHRcdGNhc2UgXCI+XCI6XG5cdFx0XHRcdHJldHVybiBjb25zdGFudChsZWZ0RXhwcmVzc2lvbi52YWx1ZSA+IHJpZ2h0RXhwcmVzc2lvbi52YWx1ZSk7XG5cdFx0XHRjYXNlIFwiPj1cIjpcblx0XHRcdFx0cmV0dXJuIGNvbnN0YW50KGxlZnRFeHByZXNzaW9uLnZhbHVlID49IHJpZ2h0RXhwcmVzc2lvbi52YWx1ZSk7XG5cdFx0XHRjYXNlIFwiPT09XCI6XG5cdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRyZXR1cm4gY29uc3RhbnQobGVmdEV4cHJlc3Npb24udmFsdWUgPT09IHJpZ2h0RXhwcmVzc2lvbi52YWx1ZSk7XG5cdFx0fVxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiB7XG5cdFx0XHRfdHlwZTogXCJDb21wYXJpc29uXCIsXG5cdFx0XHRvcGVyYXRvcjogb3BlcmF0b3IsXG5cdFx0XHRvcGVyYW5kMTogbGVmdEV4cHJlc3Npb24sXG5cdFx0XHRvcGVyYW5kMjogcmlnaHRFeHByZXNzaW9uXG5cdFx0fTtcblx0fVxufVxuXG4vKipcbiAqIENvbXBhcmlzb246IFwiZXF1YWxcIiAoPT09KS5cbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdGFyZ2V0IHR5cGVcbiAqIEBwYXJhbSBsZWZ0T3BlcmFuZCBUaGUgb3BlcmFuZCBvbiB0aGUgbGVmdCBzaWRlXG4gKiBAcGFyYW0gcmlnaHRPcGVyYW5kIFRoZSBvcGVyYW5kIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSBjb21wYXJpc29uXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxib29sZWFuPn0gQW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgdGhlIGNvbXBhcmlzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGVxdWFsPFQgZXh0ZW5kcyBQcmltaXRpdmVUeXBlPihcblx0bGVmdE9wZXJhbmQ6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxUPixcblx0cmlnaHRPcGVyYW5kOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD5cbik6IEV4cHJlc3Npb248Ym9vbGVhbj4ge1xuXHRjb25zdCBsZWZ0RXhwcmVzc2lvbiA9IHdyYXBQcmltaXRpdmUobGVmdE9wZXJhbmQpO1xuXHRjb25zdCByaWdodEV4cHJlc3Npb24gPSB3cmFwUHJpbWl0aXZlKHJpZ2h0T3BlcmFuZCk7XG5cdGlmIChoYXNVbnJlc29sdmVhYmxlRXhwcmVzc2lvbihsZWZ0RXhwcmVzc2lvbiwgcmlnaHRFeHByZXNzaW9uKSkge1xuXHRcdHJldHVybiB1bnJlc29sdmVhYmxlRXhwcmVzc2lvbjtcblx0fVxuXHRpZiAoX2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbChsZWZ0RXhwcmVzc2lvbiwgcmlnaHRFeHByZXNzaW9uKSkge1xuXHRcdHJldHVybiBjb25zdGFudCh0cnVlKTtcblx0fVxuXG5cdC8vICgoYSA9PT0gYykgPT09IHRydWUpID0+IChhID09PSBjKVxuXHRpZiAobGVmdEV4cHJlc3Npb24uX3R5cGUgPT09IFwiQ29tcGFyaXNvblwiICYmIGlzQ29uc3RhbnQocmlnaHRFeHByZXNzaW9uKSAmJiByaWdodEV4cHJlc3Npb24udmFsdWUgPT09IHRydWUpIHtcblx0XHRyZXR1cm4gbGVmdEV4cHJlc3Npb247XG5cdH0gZWxzZSBpZiAobGVmdEV4cHJlc3Npb24uX3R5cGUgPT09IFwiQ29tcGFyaXNvblwiICYmIGlzQ29uc3RhbnQocmlnaHRFeHByZXNzaW9uKSAmJiByaWdodEV4cHJlc3Npb24udmFsdWUgPT09IHRydWUpIHtcblx0XHQvLyAoKGEgPT09IGMpID09PSBmYWxzZSkgPT4gIShhID09PSBjKVxuXHRcdHJldHVybiBub3QobGVmdEV4cHJlc3Npb24pO1xuXHR9IGVsc2UgaWYgKGxlZnRFeHByZXNzaW9uLl90eXBlID09PSBcIklmRWxzZVwiICYmIF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwobGVmdEV4cHJlc3Npb24ub25UcnVlLCByaWdodEV4cHJlc3Npb24pKSB7XG5cdFx0Ly8gKGlmKHh4eHgpIHsgYWFhIH0gZWxzZSB7IGJiYiB9ICkgPT09IGFhYSApXG5cdFx0cmV0dXJuIG9yKGxlZnRFeHByZXNzaW9uLmNvbmRpdGlvbiwgZXF1YWwobGVmdEV4cHJlc3Npb24ub25GYWxzZSwgcmlnaHRFeHByZXNzaW9uKSk7XG5cdH0gZWxzZSBpZiAobGVmdEV4cHJlc3Npb24uX3R5cGUgPT09IFwiSWZFbHNlXCIgJiYgX2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbChsZWZ0RXhwcmVzc2lvbi5vbkZhbHNlLCByaWdodEV4cHJlc3Npb24pKSB7XG5cdFx0cmV0dXJuIG9yKG5vdChsZWZ0RXhwcmVzc2lvbi5jb25kaXRpb24pLCBlcXVhbChsZWZ0RXhwcmVzc2lvbi5vblRydWUsIHJpZ2h0RXhwcmVzc2lvbikpO1xuXHR9IGVsc2UgaWYgKFxuXHRcdGxlZnRFeHByZXNzaW9uLl90eXBlID09PSBcIklmRWxzZVwiICYmXG5cdFx0aXNDb25zdGFudChsZWZ0RXhwcmVzc2lvbi5vblRydWUpICYmXG5cdFx0aXNDb25zdGFudChyaWdodEV4cHJlc3Npb24pICYmXG5cdFx0aXNDb25zdGFudChsZWZ0RXhwcmVzc2lvbi5vbkZhbHNlKSAmJlxuXHRcdCFfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKGxlZnRFeHByZXNzaW9uLm9uVHJ1ZSwgcmlnaHRFeHByZXNzaW9uKSAmJlxuXHRcdCFfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKGxlZnRFeHByZXNzaW9uLm9uRmFsc2UsIHJpZ2h0RXhwcmVzc2lvbilcblx0KSB7XG5cdFx0cmV0dXJuIGNvbnN0YW50KGZhbHNlKTtcblx0fVxuXG5cdHJldHVybiBjb21wYXJpc29uKFwiPT09XCIsIGxlZnRFeHByZXNzaW9uLCByaWdodEV4cHJlc3Npb24pO1xufVxuXG4vKipcbiAqIENvbXBhcmlzb246IFwibm90IGVxdWFsXCIgKCE9PSkuXG4gKlxuICogQHRlbXBsYXRlIFQgVGhlIHRhcmdldCB0eXBlXG4gKiBAcGFyYW0gbGVmdE9wZXJhbmQgVGhlIG9wZXJhbmQgb24gdGhlIGxlZnQgc2lkZVxuICogQHBhcmFtIHJpZ2h0T3BlcmFuZCBUaGUgb3BlcmFuZCBvbiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgY29tcGFyaXNvblxuICogQHJldHVybnMge0V4cHJlc3Npb248Ym9vbGVhbj59IEFuIGV4cHJlc3Npb24gcmVwcmVzZW50aW5nIHRoZSBjb21wYXJpc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub3RFcXVhbDxUIGV4dGVuZHMgUHJpbWl0aXZlVHlwZT4oXG5cdGxlZnRPcGVyYW5kOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD4sXG5cdHJpZ2h0T3BlcmFuZDogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPFQ+XG4pOiBFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0Y29uc3QgbGVmdEV4cHJlc3Npb24gPSB3cmFwUHJpbWl0aXZlKGxlZnRPcGVyYW5kKTtcblx0Y29uc3QgcmlnaHRFeHByZXNzaW9uID0gd3JhcFByaW1pdGl2ZShyaWdodE9wZXJhbmQpO1xuXG5cdGlmIChfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKGxlZnRFeHByZXNzaW9uLCByaWdodEV4cHJlc3Npb24pKSB7XG5cdFx0cmV0dXJuIGNvbnN0YW50KGZhbHNlKTtcblx0fVxuXG5cdC8vICgoYSA9PT0gYykgIT09IHRydWUpID0+ICEoYSA9PT0gYylcblx0aWYgKGxlZnRFeHByZXNzaW9uLl90eXBlID09PSBcIkNvbXBhcmlzb25cIiAmJiBpc0NvbnN0YW50KHJpZ2h0RXhwcmVzc2lvbikgJiYgcmlnaHRFeHByZXNzaW9uLnZhbHVlID09PSB0cnVlKSB7XG5cdFx0cmV0dXJuIG5vdChsZWZ0RXhwcmVzc2lvbik7XG5cdH0gZWxzZSBpZiAobGVmdEV4cHJlc3Npb24uX3R5cGUgPT09IFwiQ29tcGFyaXNvblwiICYmIGlzQ29uc3RhbnQocmlnaHRFeHByZXNzaW9uKSAmJiByaWdodEV4cHJlc3Npb24udmFsdWUgPT09IHRydWUpIHtcblx0XHQvLyAoKGEgPT09IGMpICE9PSBmYWxzZSkgPT4gKGEgPT09IGMpXG5cdFx0cmV0dXJuIGxlZnRFeHByZXNzaW9uO1xuXHR9IGVsc2UgaWYgKGxlZnRFeHByZXNzaW9uLl90eXBlID09PSBcIklmRWxzZVwiICYmIF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwobGVmdEV4cHJlc3Npb24ub25UcnVlLCByaWdodEV4cHJlc3Npb24pKSB7XG5cdFx0cmV0dXJuIGFuZChub3QobGVmdEV4cHJlc3Npb24uY29uZGl0aW9uKSwgbm90RXF1YWwobGVmdEV4cHJlc3Npb24ub25GYWxzZSwgcmlnaHRFeHByZXNzaW9uKSk7XG5cdH0gZWxzZSBpZiAobGVmdEV4cHJlc3Npb24uX3R5cGUgPT09IFwiSWZFbHNlXCIgJiYgX2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbChsZWZ0RXhwcmVzc2lvbi5vbkZhbHNlLCByaWdodEV4cHJlc3Npb24pKSB7XG5cdFx0cmV0dXJuIGFuZChsZWZ0RXhwcmVzc2lvbi5jb25kaXRpb24sIG5vdEVxdWFsKGxlZnRFeHByZXNzaW9uLm9uVHJ1ZSwgcmlnaHRFeHByZXNzaW9uKSk7XG5cdH0gZWxzZSBpZiAoXG5cdFx0bGVmdEV4cHJlc3Npb24uX3R5cGUgPT09IFwiSWZFbHNlXCIgJiZcblx0XHRpc0NvbnN0YW50KGxlZnRFeHByZXNzaW9uLm9uVHJ1ZSkgJiZcblx0XHRpc0NvbnN0YW50KHJpZ2h0RXhwcmVzc2lvbikgJiZcblx0XHRpc0NvbnN0YW50KGxlZnRFeHByZXNzaW9uLm9uRmFsc2UpICYmXG5cdFx0IV9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwobGVmdEV4cHJlc3Npb24ub25UcnVlLCByaWdodEV4cHJlc3Npb24pICYmXG5cdFx0IV9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwobGVmdEV4cHJlc3Npb24ub25GYWxzZSwgcmlnaHRFeHByZXNzaW9uKVxuXHQpIHtcblx0XHQvLyBJZiB0aGUgbGVmdCBleHByZXNzaW9uIGlzIGFuIGlmIGVsc2Ugd2hlcmUgYm90aCBvblRydWUgYW5kIG9uRmFsc2UgYXJlIG5vdCBlcXVhbHMgdG8gdGhlIHJpZ2h0IGV4cHJlc3Npb24gLT4gc2ltcGxpZnkgYXMgdHJ1ZVxuXHRcdHJldHVybiBjb25zdGFudCh0cnVlKTtcblx0fVxuXG5cdHJldHVybiBjb21wYXJpc29uKFwiIT09XCIsIGxlZnRFeHByZXNzaW9uLCByaWdodEV4cHJlc3Npb24pO1xufVxuXG4vKipcbiAqIENvbXBhcmlzb246IFwiZ3JlYXRlciBvciBlcXVhbFwiICg+PSkuXG4gKlxuICogQHRlbXBsYXRlIFQgVGhlIHRhcmdldCB0eXBlXG4gKiBAcGFyYW0gbGVmdE9wZXJhbmQgVGhlIG9wZXJhbmQgb24gdGhlIGxlZnQgc2lkZVxuICogQHBhcmFtIHJpZ2h0T3BlcmFuZCBUaGUgb3BlcmFuZCBvbiB0aGUgcmlnaHQgc2lkZSBvZiB0aGUgY29tcGFyaXNvblxuICogQHJldHVybnMge0V4cHJlc3Npb248Ym9vbGVhbj59IEFuIGV4cHJlc3Npb24gcmVwcmVzZW50aW5nIHRoZSBjb21wYXJpc29uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncmVhdGVyT3JFcXVhbDxUIGV4dGVuZHMgUHJpbWl0aXZlVHlwZT4oXG5cdGxlZnRPcGVyYW5kOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD4sXG5cdHJpZ2h0T3BlcmFuZDogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPFQ+XG4pOiBFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0cmV0dXJuIGNvbXBhcmlzb24oXCI+PVwiLCBsZWZ0T3BlcmFuZCwgcmlnaHRPcGVyYW5kKTtcbn1cblxuLyoqXG4gKiBDb21wYXJpc29uOiBcImdyZWF0ZXIgdGhhblwiICg+KS5cbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdGFyZ2V0IHR5cGVcbiAqIEBwYXJhbSBsZWZ0T3BlcmFuZCBUaGUgb3BlcmFuZCBvbiB0aGUgbGVmdCBzaWRlXG4gKiBAcGFyYW0gcmlnaHRPcGVyYW5kIFRoZSBvcGVyYW5kIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSBjb21wYXJpc29uXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxib29sZWFuPn0gQW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgdGhlIGNvbXBhcmlzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdyZWF0ZXJUaGFuPFQgZXh0ZW5kcyBQcmltaXRpdmVUeXBlPihcblx0bGVmdE9wZXJhbmQ6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxUPixcblx0cmlnaHRPcGVyYW5kOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD5cbik6IEV4cHJlc3Npb248Ym9vbGVhbj4ge1xuXHRyZXR1cm4gY29tcGFyaXNvbihcIj5cIiwgbGVmdE9wZXJhbmQsIHJpZ2h0T3BlcmFuZCk7XG59XG5cbi8qKlxuICogQ29tcGFyaXNvbjogXCJsZXNzIG9yIGVxdWFsXCIgKDw9KS5cbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdGFyZ2V0IHR5cGVcbiAqIEBwYXJhbSBsZWZ0T3BlcmFuZCBUaGUgb3BlcmFuZCBvbiB0aGUgbGVmdCBzaWRlXG4gKiBAcGFyYW0gcmlnaHRPcGVyYW5kIFRoZSBvcGVyYW5kIG9uIHRoZSByaWdodCBzaWRlIG9mIHRoZSBjb21wYXJpc29uXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxib29sZWFuPn0gQW4gZXhwcmVzc2lvbiByZXByZXNlbnRpbmcgdGhlIGNvbXBhcmlzb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGxlc3NPckVxdWFsPFQgZXh0ZW5kcyBQcmltaXRpdmVUeXBlPihcblx0bGVmdE9wZXJhbmQ6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxUPixcblx0cmlnaHRPcGVyYW5kOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD5cbik6IEV4cHJlc3Npb248Ym9vbGVhbj4ge1xuXHRyZXR1cm4gY29tcGFyaXNvbihcIjw9XCIsIGxlZnRPcGVyYW5kLCByaWdodE9wZXJhbmQpO1xufVxuXG4vKipcbiAqIENvbXBhcmlzb246IFwibGVzcyB0aGFuXCIgKDwpLlxuICpcbiAqIEB0ZW1wbGF0ZSBUIFRoZSB0YXJnZXQgdHlwZVxuICogQHBhcmFtIGxlZnRPcGVyYW5kIFRoZSBvcGVyYW5kIG9uIHRoZSBsZWZ0IHNpZGVcbiAqIEBwYXJhbSByaWdodE9wZXJhbmQgVGhlIG9wZXJhbmQgb24gdGhlIHJpZ2h0IHNpZGUgb2YgdGhlIGNvbXBhcmlzb25cbiAqIEByZXR1cm5zIHtFeHByZXNzaW9uPGJvb2xlYW4+fSBBbiBleHByZXNzaW9uIHJlcHJlc2VudGluZyB0aGUgY29tcGFyaXNvblxuICovXG5leHBvcnQgZnVuY3Rpb24gbGVzc1RoYW48VCBleHRlbmRzIFByaW1pdGl2ZVR5cGU+KFxuXHRsZWZ0T3BlcmFuZDogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPFQ+LFxuXHRyaWdodE9wZXJhbmQ6IEV4cHJlc3Npb25PclByaW1pdGl2ZTxUPlxuKTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdHJldHVybiBjb21wYXJpc29uKFwiPFwiLCBsZWZ0T3BlcmFuZCwgcmlnaHRPcGVyYW5kKTtcbn1cblxuLyoqXG4gKiBJZi10aGVuLWVsc2UgZXhwcmVzc2lvbi5cbiAqXG4gKiBFdmFsdWF0ZXMgdG8gb25UcnVlIGlmIHRoZSBjb25kaXRpb24gZXZhbHVhdGVzIHRvIHRydWUsIGVsc2UgZXZhbHVhdGVzIHRvIG9uRmFsc2UuXG4gKlxuICogQHRlbXBsYXRlIFQgVGhlIHRhcmdldCB0eXBlXG4gKiBAcGFyYW0gY29uZGl0aW9uIFRoZSBjb25kaXRpb24gdG8gZXZhbHVhdGVcbiAqIEBwYXJhbSBvblRydWUgRXhwcmVzc2lvbiByZXN1bHQgaWYgdGhlIGNvbmRpdGlvbiBldmFsdWF0ZXMgdG8gdHJ1ZVxuICogQHBhcmFtIG9uRmFsc2UgRXhwcmVzc2lvbiByZXN1bHQgaWYgdGhlIGNvbmRpdGlvbiBldmFsdWF0ZXMgdG8gZmFsc2VcbiAqIEByZXR1cm5zIHtFeHByZXNzaW9uPFQ+fSBUaGUgZXhwcmVzc2lvbiB0aGF0IHJlcHJlc2VudHMgdGhpcyBjb25kaXRpb25hbCBjaGVja1xuICovXG5leHBvcnQgZnVuY3Rpb24gaWZFbHNlPFQgZXh0ZW5kcyBQcmltaXRpdmVUeXBlPihcblx0Y29uZGl0aW9uOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8Ym9vbGVhbj4sXG5cdG9uVHJ1ZTogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPFQ+LFxuXHRvbkZhbHNlOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD5cbik6IEV4cHJlc3Npb248VD4ge1xuXHRsZXQgY29uZGl0aW9uRXhwcmVzc2lvbiA9IHdyYXBQcmltaXRpdmUoY29uZGl0aW9uKTtcblx0bGV0IG9uVHJ1ZUV4cHJlc3Npb24gPSB3cmFwUHJpbWl0aXZlKG9uVHJ1ZSk7XG5cdGxldCBvbkZhbHNlRXhwcmVzc2lvbiA9IHdyYXBQcmltaXRpdmUob25GYWxzZSk7XG5cblx0aWYgKGhhc1VucmVzb2x2ZWFibGVFeHByZXNzaW9uKGNvbmRpdGlvbkV4cHJlc3Npb24sIG9uVHJ1ZUV4cHJlc3Npb24sIG9uRmFsc2VFeHByZXNzaW9uKSkge1xuXHRcdHJldHVybiB1bnJlc29sdmVhYmxlRXhwcmVzc2lvbjtcblx0fVxuXHQvLyBzd2FwIGJyYW5jaGVzIGlmIHRoZSBjb25kaXRpb24gaXMgYSBuZWdhdGlvblxuXHRpZiAoY29uZGl0aW9uRXhwcmVzc2lvbi5fdHlwZSA9PT0gXCJOb3RcIikge1xuXHRcdC8vIGlmRWxzZShub3QoWCksIGEsIGIpIC0tPiBpZkVsc2UoWCwgYiwgYSlcblx0XHRbb25UcnVlRXhwcmVzc2lvbiwgb25GYWxzZUV4cHJlc3Npb25dID0gW29uRmFsc2VFeHByZXNzaW9uLCBvblRydWVFeHByZXNzaW9uXTtcblx0XHRjb25kaXRpb25FeHByZXNzaW9uID0gbm90KGNvbmRpdGlvbkV4cHJlc3Npb24pO1xuXHR9XG5cblx0Ly8gaW5saW5lIG5lc3RlZCBpZi1lbHNlIGV4cHJlc3Npb25zOiBvblRydWUgYnJhbmNoXG5cdC8vIGlmRWxzZShYLCBpZkVsc2UoWCwgYSwgYiksIGMpID09PiBpZkVsc2UoWCwgYSwgYylcblx0aWYgKG9uVHJ1ZUV4cHJlc3Npb24uX3R5cGUgPT09IFwiSWZFbHNlXCIgJiYgX2NoZWNrRXhwcmVzc2lvbnNBcmVFcXVhbChjb25kaXRpb25FeHByZXNzaW9uLCBvblRydWVFeHByZXNzaW9uLmNvbmRpdGlvbikpIHtcblx0XHRvblRydWVFeHByZXNzaW9uID0gb25UcnVlRXhwcmVzc2lvbi5vblRydWU7XG5cdH1cblxuXHQvLyBpbmxpbmUgbmVzdGVkIGlmLWVsc2UgZXhwcmVzc2lvbnM6IG9uRmFsc2UgYnJhbmNoXG5cdC8vIGlmRWxzZShYLCBhLCBpZkVsc2UoWCwgYiwgYykpID09PiBpZkVsc2UoWCwgYSwgYylcblx0aWYgKG9uRmFsc2VFeHByZXNzaW9uLl90eXBlID09PSBcIklmRWxzZVwiICYmIF9jaGVja0V4cHJlc3Npb25zQXJlRXF1YWwoY29uZGl0aW9uRXhwcmVzc2lvbiwgb25GYWxzZUV4cHJlc3Npb24uY29uZGl0aW9uKSkge1xuXHRcdG9uRmFsc2VFeHByZXNzaW9uID0gb25GYWxzZUV4cHJlc3Npb24ub25GYWxzZTtcblx0fVxuXG5cdC8vIGlubGluZSBuZXN0ZWQgaWYtZWxzZSBleHByZXNzaW9uczogY29uZGl0aW9uXG5cdGlmIChjb25kaXRpb25FeHByZXNzaW9uLl90eXBlID09PSBcIklmRWxzZVwiKSB7XG5cdFx0aWYgKFxuXHRcdFx0aXNDb25zdGFudChjb25kaXRpb25FeHByZXNzaW9uLm9uRmFsc2UpICYmXG5cdFx0XHQhY29uZGl0aW9uRXhwcmVzc2lvbi5vbkZhbHNlLnZhbHVlICYmXG5cdFx0XHRpc0NvbnN0YW50KGNvbmRpdGlvbkV4cHJlc3Npb24ub25UcnVlKSAmJlxuXHRcdFx0Y29uZGl0aW9uRXhwcmVzc2lvbi5vblRydWUudmFsdWVcblx0XHQpIHtcblx0XHRcdC8vIGlmRWxzZShpZkVsc2UoWCwgdHJ1ZSwgZmFsc2UpLCBhLCBiKSA9PT4gaWZFbHNlKFgsIGEsIGIpXG5cdFx0XHRjb25kaXRpb25FeHByZXNzaW9uID0gY29uZGl0aW9uRXhwcmVzc2lvbi5jb25kaXRpb247XG5cdFx0fSBlbHNlIGlmIChcblx0XHRcdGlzQ29uc3RhbnQoY29uZGl0aW9uRXhwcmVzc2lvbi5vbkZhbHNlKSAmJlxuXHRcdFx0Y29uZGl0aW9uRXhwcmVzc2lvbi5vbkZhbHNlLnZhbHVlICYmXG5cdFx0XHRpc0NvbnN0YW50KGNvbmRpdGlvbkV4cHJlc3Npb24ub25UcnVlKSAmJlxuXHRcdFx0IWNvbmRpdGlvbkV4cHJlc3Npb24ub25UcnVlLnZhbHVlXG5cdFx0KSB7XG5cdFx0XHQvLyBpZkVsc2UoaWZFbHNlKFgsIGZhbHNlLCB0cnVlKSwgYSwgYikgPT0+IGlmRWxzZShub3QoWCksIGEsIGIpXG5cdFx0XHRjb25kaXRpb25FeHByZXNzaW9uID0gbm90KGNvbmRpdGlvbkV4cHJlc3Npb24uY29uZGl0aW9uKTtcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0aXNDb25zdGFudChjb25kaXRpb25FeHByZXNzaW9uLm9uVHJ1ZSkgJiZcblx0XHRcdCFjb25kaXRpb25FeHByZXNzaW9uLm9uVHJ1ZS52YWx1ZSAmJlxuXHRcdFx0IWlzQ29uc3RhbnQoY29uZGl0aW9uRXhwcmVzc2lvbi5vbkZhbHNlKVxuXHRcdCkge1xuXHRcdFx0Ly8gaWZFbHNlKGlmRWxzZShYLCBmYWxzZSwgYSksIGIsIGMpID09PiBpZkVsc2UoYW5kKG5vdChYKSwgYSksIGIsIGMpXG5cdFx0XHRjb25kaXRpb25FeHByZXNzaW9uID0gYW5kKG5vdChjb25kaXRpb25FeHByZXNzaW9uLmNvbmRpdGlvbiksIGNvbmRpdGlvbkV4cHJlc3Npb24ub25GYWxzZSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYWdhaW4gc3dhcCBicmFuY2hlcyBpZiBuZWVkZWQgKGluIGNhc2Ugb25lIG9mIHRoZSBvcHRpbWl6YXRpb25zIGFib3ZlIGxlZCB0byBhIG5lZ2F0ZWQgY29uZGl0aW9uKVxuXHRpZiAoY29uZGl0aW9uRXhwcmVzc2lvbi5fdHlwZSA9PT0gXCJOb3RcIikge1xuXHRcdC8vIGlmRWxzZShub3QoWCksIGEsIGIpIC0tPiBpZkVsc2UoWCwgYiwgYSlcblx0XHRbb25UcnVlRXhwcmVzc2lvbiwgb25GYWxzZUV4cHJlc3Npb25dID0gW29uRmFsc2VFeHByZXNzaW9uLCBvblRydWVFeHByZXNzaW9uXTtcblx0XHRjb25kaXRpb25FeHByZXNzaW9uID0gbm90KGNvbmRpdGlvbkV4cHJlc3Npb24pO1xuXHR9XG5cblx0Ly8gY29tcHV0ZSBleHByZXNzaW9uIHJlc3VsdCBmb3IgY29uc3RhbnQgY29uZGl0aW9uc1xuXHRpZiAoaXNDb25zdGFudChjb25kaXRpb25FeHByZXNzaW9uKSkge1xuXHRcdHJldHVybiBjb25kaXRpb25FeHByZXNzaW9uLnZhbHVlID8gb25UcnVlRXhwcmVzc2lvbiA6IG9uRmFsc2VFeHByZXNzaW9uO1xuXHR9XG5cblx0Ly8gY29tcHV0ZSBleHByZXNzaW9uIHJlc3VsdCBpZiBvblRydWUgYW5kIG9uRmFsc2UgYnJhbmNoZXMgYXJlIGVxdWFsXG5cdGlmIChfY2hlY2tFeHByZXNzaW9uc0FyZUVxdWFsKG9uVHJ1ZUV4cHJlc3Npb24sIG9uRmFsc2VFeHByZXNzaW9uKSkge1xuXHRcdHJldHVybiBvblRydWVFeHByZXNzaW9uO1xuXHR9XG5cblx0Ly8gSWYgZWl0aGVyIHRydWVFeHByZXNzaW9uIG9yIGZhbHNlRXhwcmVzc2lvbiBpcyBhIHZhbHVlIGVxdWFscyB0byBmYWxzZSB0aGUgZXhwcmVzc2lvbiBjYW4gYmUgc2ltcGxpZmllZFxuXHQvLyBJZihDb25kaXRpb24pIFRoZW4gWFhYIEVsc2UgRmFsc2UgLT4gQ29uZGl0aW9uICYmIFhYWFxuXHRpZiAoaXNDb25zdGFudChvbkZhbHNlRXhwcmVzc2lvbikgJiYgb25GYWxzZUV4cHJlc3Npb24udmFsdWUgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIGFuZChjb25kaXRpb25FeHByZXNzaW9uLCBvblRydWVFeHByZXNzaW9uIGFzIEV4cHJlc3Npb248Ym9vbGVhbj4pIGFzIEV4cHJlc3Npb248VD47XG5cdH1cblx0Ly8gSWYoQ29uZGl0aW9uKSBUaGVuIEZhbHNlIEVsc2UgWFhYIC0+ICFDb25kaXRpb24gJiYgWFhYXG5cdGlmIChpc0NvbnN0YW50KG9uVHJ1ZUV4cHJlc3Npb24pICYmIG9uVHJ1ZUV4cHJlc3Npb24udmFsdWUgPT09IGZhbHNlKSB7XG5cdFx0cmV0dXJuIGFuZChub3QoY29uZGl0aW9uRXhwcmVzc2lvbiksIG9uRmFsc2VFeHByZXNzaW9uIGFzIEV4cHJlc3Npb248Ym9vbGVhbj4pIGFzIEV4cHJlc3Npb248VD47XG5cdH1cblxuXHRyZXR1cm4ge1xuXHRcdF90eXBlOiBcIklmRWxzZVwiLFxuXHRcdGNvbmRpdGlvbjogY29uZGl0aW9uRXhwcmVzc2lvbixcblx0XHRvblRydWU6IG9uVHJ1ZUV4cHJlc3Npb24sXG5cdFx0b25GYWxzZTogb25GYWxzZUV4cHJlc3Npb25cblx0fTtcbn1cblxuLyoqXG4gKiBDaGVja3Mgd2hldGhlciB0aGUgY3VycmVudCBleHByZXNzaW9uIGhhcyBhIHJlZmVyZW5jZSB0byB0aGUgZGVmYXVsdCBtb2RlbCAodW5kZWZpbmVkKS5cbiAqXG4gKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgZXhwcmVzc2lvbiB0byBldmFsdWF0ZVxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGVyZSBpcyBhIHJlZmVyZW5jZSB0byB0aGUgZGVmYXVsdCBjb250ZXh0XG4gKi9cbmZ1bmN0aW9uIGhhc1JlZmVyZW5jZVRvRGVmYXVsdENvbnRleHQoZXhwcmVzc2lvbjogRXhwcmVzc2lvbjxhbnk+KTogYm9vbGVhbiB7XG5cdHN3aXRjaCAoZXhwcmVzc2lvbi5fdHlwZSkge1xuXHRcdGNhc2UgXCJDb25zdGFudFwiOlxuXHRcdGNhc2UgXCJGb3JtYXR0ZXJcIjpcblx0XHRjYXNlIFwiQ29tcGxleFR5cGVcIjpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRjYXNlIFwiU2V0XCI6XG5cdFx0XHRyZXR1cm4gZXhwcmVzc2lvbi5vcGVyYW5kcy5zb21lKGhhc1JlZmVyZW5jZVRvRGVmYXVsdENvbnRleHQpO1xuXHRcdGNhc2UgXCJCaW5kaW5nXCI6XG5cdFx0XHRyZXR1cm4gZXhwcmVzc2lvbi5tb2RlbE5hbWUgPT09IHVuZGVmaW5lZDtcblx0XHRjYXNlIFwiQ29tcGFyaXNvblwiOlxuXHRcdFx0cmV0dXJuIGhhc1JlZmVyZW5jZVRvRGVmYXVsdENvbnRleHQoZXhwcmVzc2lvbi5vcGVyYW5kMSkgfHwgaGFzUmVmZXJlbmNlVG9EZWZhdWx0Q29udGV4dChleHByZXNzaW9uLm9wZXJhbmQyKTtcblx0XHRjYXNlIFwiRGVmYXVsdEJpbmRpbmdcIjpcblx0XHRcdHJldHVybiB0cnVlO1xuXHRcdGNhc2UgXCJJZkVsc2VcIjpcblx0XHRcdHJldHVybiAoXG5cdFx0XHRcdGhhc1JlZmVyZW5jZVRvRGVmYXVsdENvbnRleHQoZXhwcmVzc2lvbi5jb25kaXRpb24pIHx8XG5cdFx0XHRcdGhhc1JlZmVyZW5jZVRvRGVmYXVsdENvbnRleHQoZXhwcmVzc2lvbi5vblRydWUpIHx8XG5cdFx0XHRcdGhhc1JlZmVyZW5jZVRvRGVmYXVsdENvbnRleHQoZXhwcmVzc2lvbi5vbkZhbHNlKVxuXHRcdFx0KTtcblx0XHRjYXNlIFwiTm90XCI6XG5cdFx0Y2FzZSBcIlRydXRoeVwiOlxuXHRcdFx0cmV0dXJuIGhhc1JlZmVyZW5jZVRvRGVmYXVsdENvbnRleHQoZXhwcmVzc2lvbi5vcGVyYW5kKTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHR9XG59XG5cbnR5cGUgRm48VD4gPSAoKC4uLnBhcmFtczogYW55KSA9PiBUKSAmIHtcblx0X19mdW5jdGlvbk5hbWU6IHN0cmluZztcbn07XG5cbi8qKlxuICogQHR5cGVkZWYgV3JhcHBlZFR1cGxlXG4gKi9cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbi8vIEB0cy1pZ25vcmVcbnR5cGUgV3JhcHBlZFR1cGxlPFQ+ID0geyBbSyBpbiBrZXlvZiBUXTogV3JhcHBlZFR1cGxlPFRbS10+IHwgRXhwcmVzc2lvbk9yUHJpbWl0aXZlPFRbS10+IH07XG5cbi8vIFNvLCB0aGlzIHdvcmtzIGJ1dCBJIGNhbm5vdCBnZXQgaXQgdG8gY29tcGlsZSA6RCwgYnV0IGl0IHN0aWxsIGRvZXMgd2hhdCBpcyBleHBlY3RlZC4uLlxuXG4vKipcbiAqIEEgZnVuY3Rpb24gcmVmZXJlbmNlIG9yIGEgZnVuY3Rpb24gbmFtZS5cbiAqL1xudHlwZSBGdW5jdGlvbk9yTmFtZTxUPiA9IEZuPFQ+IHwgc3RyaW5nO1xuXG4vKipcbiAqIEZ1bmN0aW9uIHBhcmFtZXRlcnMsIGVpdGhlciBkZXJpdmVkIGZyb20gdGhlIGZ1bmN0aW9uIG9yIGFuIHVudHlwZWQgYXJyYXkuXG4gKi9cbnR5cGUgRnVuY3Rpb25QYXJhbWV0ZXJzPFQsIEYgZXh0ZW5kcyBGdW5jdGlvbk9yTmFtZTxUPj4gPSBGIGV4dGVuZHMgRm48VD4gPyBQYXJhbWV0ZXJzPEY+IDogYW55W107XG5cbi8qKlxuICogQ2FsbHMgYSBmb3JtYXR0ZXIgZnVuY3Rpb24gdG8gcHJvY2VzcyB0aGUgcGFyYW1ldGVycy5cbiAqIElmIHJlcXVpcmVDb250ZXh0IGlzIHNldCB0byB0cnVlIGFuZCBubyBjb250ZXh0IGlzIHBhc3NlZCBhIGRlZmF1bHQgY29udGV4dCB3aWxsIGJlIGFkZGVkIGF1dG9tYXRpY2FsbHkuXG4gKlxuICogQHRlbXBsYXRlIFRcbiAqIEB0ZW1wbGF0ZSBVXG4gKiBAcGFyYW0gcGFyYW1ldGVycyBUaGUgbGlzdCBvZiBwYXJhbWV0ZXIgdGhhdCBzaG91bGQgbWF0Y2ggdGhlIHR5cGUgYW5kIG51bWJlciBvZiB0aGUgZm9ybWF0dGVyIGZ1bmN0aW9uXG4gKiBAcGFyYW0gZm9ybWF0dGVyRnVuY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGNhbGxcbiAqIEBwYXJhbSBbY29udGV4dEVudGl0eVR5cGVdIFRoZSBjb250ZXh0IGVudGl0eSB0eXBlIHRvIGNvbnNpZGVyXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxUPn0gVGhlIGNvcnJlc3BvbmRpbmcgZXhwcmVzc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZm9ybWF0UmVzdWx0PFQsIFUgZXh0ZW5kcyBGbjxUPj4oXG5cdHBhcmFtZXRlcnM6IFdyYXBwZWRUdXBsZTxQYXJhbWV0ZXJzPFU+Pixcblx0Zm9ybWF0dGVyRnVuY3Rpb246IFUsXG5cdGNvbnRleHRFbnRpdHlUeXBlPzogRW50aXR5VHlwZVxuKTogRXhwcmVzc2lvbjxUPiB7XG5cdGNvbnN0IHBhcmFtZXRlckV4cHJlc3Npb25zID0gKHBhcmFtZXRlcnMgYXMgYW55W10pLm1hcCh3cmFwUHJpbWl0aXZlKTtcblxuXHRpZiAoaGFzVW5yZXNvbHZlYWJsZUV4cHJlc3Npb24oLi4ucGFyYW1ldGVyRXhwcmVzc2lvbnMpKSB7XG5cdFx0cmV0dXJuIHVucmVzb2x2ZWFibGVFeHByZXNzaW9uO1xuXHR9XG5cdGlmICghIWNvbnRleHRFbnRpdHlUeXBlKSB7XG5cdFx0Ly8gT3RoZXJ3aXNlLCBpZiB0aGUgY29udGV4dCBpcyByZXF1aXJlZCBhbmQgbm8gY29udGV4dCBpcyBwcm92aWRlZCBtYWtlIHN1cmUgdG8gYWRkIHRoZSBkZWZhdWx0IGJpbmRpbmdcblx0XHRpZiAoIXBhcmFtZXRlckV4cHJlc3Npb25zLnNvbWUoaGFzUmVmZXJlbmNlVG9EZWZhdWx0Q29udGV4dCkpIHtcblx0XHRcdGNvbnRleHRFbnRpdHlUeXBlLmtleXMuZm9yRWFjaChrZXkgPT4gcGFyYW1ldGVyRXhwcmVzc2lvbnMucHVzaChiaW5kaW5nRXhwcmVzc2lvbihrZXkubmFtZSwgXCJcIikpKTtcblx0XHR9XG5cdH1cblxuXHQvLyBGb3JtYXR0ZXJOYW1lIGNhbiBiZSBvZiBmb3JtYXQgc2FwLmZlLmNvcmUueHh4I21ldGhvZE5hbWUgdG8gaGF2ZSBtdWx0aXBsZSBmb3JtYXR0ZXIgaW4gb25lIGNsYXNzXG5cdGNvbnN0IFtmb3JtYXR0ZXJDbGFzcywgZm9ybWF0dGVyTmFtZV0gPSBmb3JtYXR0ZXJGdW5jdGlvbi5fX2Z1bmN0aW9uTmFtZS5zcGxpdChcIiNcIik7XG5cblx0aWYgKCEhZm9ybWF0dGVyTmFtZSAmJiBmb3JtYXR0ZXJOYW1lLmxlbmd0aCA+IDApIHtcblx0XHRwYXJhbWV0ZXJFeHByZXNzaW9ucy51bnNoaWZ0KGNvbnN0YW50KGZvcm1hdHRlck5hbWUpKTtcblx0fVxuXG5cdHJldHVybiB7XG5cdFx0X3R5cGU6IFwiRm9ybWF0dGVyXCIsXG5cdFx0Zm46IGZvcm1hdHRlckNsYXNzLFxuXHRcdHBhcmFtZXRlcnM6IHBhcmFtZXRlckV4cHJlc3Npb25zXG5cdH07XG59XG5cbi8qKlxuICogQ2FsbHMgYSBjb21wbGV4IHR5cGUgIHRvIHByb2Nlc3MgdGhlIHBhcmFtZXRlcnMuXG4gKiBJZiByZXF1aXJlQ29udGV4dCBpcyBzZXQgdG8gdHJ1ZSBhbmQgbm8gY29udGV4dCBpcyBwYXNzZWQgYSBkZWZhdWx0IGNvbnRleHQgd2lsbCBiZSBhZGRlZCBhdXRvbWF0aWNhbGx5LlxuICpcbiAqIEB0ZW1wbGF0ZSBUXG4gKiBAdGVtcGxhdGUgVVxuICogQHBhcmFtIHBhcmFtZXRlcnMgVGhlIGxpc3Qgb2YgcGFyYW1ldGVyIHRoYXQgc2hvdWxkIG1hdGNoIHRoZSB0eXBlIGZvciB0aGUgY29tcHBsZXggdHlwZVxuICogQHBhcmFtIHR5cGUgVGhlIGNvbXBsZXggdHlwZSB0byB1c2VcbiAqIEBwYXJhbSBbY29udGV4dEVudGl0eVR5cGVdIFRoZSBjb250ZXh0IGVudGl0eSB0eXBlIHRvIGNvbnNpZGVyXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxUPn0gVGhlIGNvcnJlc3BvbmRpbmcgZXhwcmVzc2lvblxuICovXG5leHBvcnQgZnVuY3Rpb24gYWRkVHlwZUluZm9ybWF0aW9uPFQsIFUgZXh0ZW5kcyBGbjxUPj4oXG5cdHBhcmFtZXRlcnM6IFdyYXBwZWRUdXBsZTxQYXJhbWV0ZXJzPFU+Pixcblx0dHlwZTogc3RyaW5nLFxuXHRjb250ZXh0RW50aXR5VHlwZT86IEVudGl0eVR5cGVcbik6IEV4cHJlc3Npb248VD4ge1xuXHRjb25zdCBwYXJhbWV0ZXJFeHByZXNzaW9ucyA9IChwYXJhbWV0ZXJzIGFzIGFueVtdKS5tYXAod3JhcFByaW1pdGl2ZSk7XG5cdGlmIChoYXNVbnJlc29sdmVhYmxlRXhwcmVzc2lvbiguLi5wYXJhbWV0ZXJFeHByZXNzaW9ucykpIHtcblx0XHRyZXR1cm4gdW5yZXNvbHZlYWJsZUV4cHJlc3Npb247XG5cdH1cblx0Ly8gSWYgdGhlcmUgaXMgb25seSBvbmUgcGFyYW1ldGVyIGFuZCBpdCBpcyBhIGNvbnN0YW50IGFuZCB3ZSBkb24ndCBleHBlY3QgdGhlIGNvbnRleHQgdGhlbiByZXR1cm4gdGhlIGNvbnN0YW50XG5cdGlmIChwYXJhbWV0ZXJFeHByZXNzaW9ucy5sZW5ndGggPT09IDEgJiYgaXNDb25zdGFudChwYXJhbWV0ZXJFeHByZXNzaW9uc1swXSkgJiYgIWNvbnRleHRFbnRpdHlUeXBlKSB7XG5cdFx0cmV0dXJuIHBhcmFtZXRlckV4cHJlc3Npb25zWzBdO1xuXHR9IGVsc2UgaWYgKCEhY29udGV4dEVudGl0eVR5cGUpIHtcblx0XHQvLyBPdGhlcndpc2UsIGlmIHRoZSBjb250ZXh0IGlzIHJlcXVpcmVkIGFuZCBubyBjb250ZXh0IGlzIHByb3ZpZGVkIG1ha2Ugc3VyZSB0byBhZGQgdGhlIGRlZmF1bHQgYmluZGluZ1xuXHRcdGlmICghcGFyYW1ldGVyRXhwcmVzc2lvbnMuc29tZShoYXNSZWZlcmVuY2VUb0RlZmF1bHRDb250ZXh0KSkge1xuXHRcdFx0Y29udGV4dEVudGl0eVR5cGUua2V5cy5mb3JFYWNoKGtleSA9PiBwYXJhbWV0ZXJFeHByZXNzaW9ucy5wdXNoKGJpbmRpbmdFeHByZXNzaW9uKGtleS5uYW1lLCBcIlwiKSkpO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IG9Gb3JtYXRPcHRpb25zID1cblx0XHQocGFyYW1ldGVyc1swXSBhcyBhbnkpPy50eXBlPy5pbmRleE9mKFwic2FwLnVpLm1vZGVsLm9kYXRhLnR5cGUuSW50XCIpID09PSAwID8geyBwYXJzZUFzU3RyaW5nOiBmYWxzZSwgZW1wdHlTdHJpbmc6IFwiXCIgfSA6IHt9O1xuXHRyZXR1cm4ge1xuXHRcdF90eXBlOiBcIkNvbXBsZXhUeXBlXCIsXG5cdFx0dHlwZTogdHlwZSxcblx0XHRmb3JtYXRPcHRpb25zOiBvRm9ybWF0T3B0aW9ucyxcblx0XHRwYXJhbWV0ZXJzOiB7fSxcblx0XHRiaW5kaW5nUGFyYW1ldGVyczogcGFyYW1ldGVyRXhwcmVzc2lvbnNcblx0fTtcbn1cbi8qKlxuICogRnVuY3Rpb24gY2FsbCwgb3B0aW9uYWxseSB3aXRoIGFyZ3VtZW50cy5cbiAqXG4gKiBAcGFyYW0gZm4gRnVuY3Rpb24gbmFtZSBvciByZWZlcmVuY2UgdG8gZnVuY3Rpb25cbiAqIEBwYXJhbSBwYXJhbWV0ZXJzIEFyZ3VtZW50c1xuICogQHBhcmFtIG9uIE9iamVjdCB0byBjYWxsIHRoZSBmdW5jdGlvbiBvblxuICogQHJldHVybnMge0Z1bmN0aW9uRXhwcmVzc2lvbjxUPn0gRXhwcmVzc2lvbiByZXByZXNlbnRpbmcgdGhlIGZ1bmN0aW9uIGNhbGwgKG5vdCB0aGUgcmVzdWx0IG9mIHRoZSBmdW5jdGlvbiBjYWxsISlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGZuPFQsIFUgZXh0ZW5kcyBGdW5jdGlvbk9yTmFtZTxUPj4oXG5cdGZuOiBVLFxuXHRwYXJhbWV0ZXJzOiBXcmFwcGVkVHVwbGU8RnVuY3Rpb25QYXJhbWV0ZXJzPFQsIFU+Pixcblx0b24/OiBFeHByZXNzaW9uT3JQcmltaXRpdmU8b2JqZWN0PlxuKTogRnVuY3Rpb25FeHByZXNzaW9uPFQ+IHtcblx0Y29uc3QgZnVuY3Rpb25OYW1lID0gdHlwZW9mIGZuID09PSBcInN0cmluZ1wiID8gZm4gOiAoZm4gYXMgRm48VD4pLl9fZnVuY3Rpb25OYW1lO1xuXHRyZXR1cm4ge1xuXHRcdF90eXBlOiBcIkZ1bmN0aW9uXCIsXG5cdFx0b2JqOiBvbiAhPT0gdW5kZWZpbmVkID8gd3JhcFByaW1pdGl2ZShvbikgOiB1bmRlZmluZWQsXG5cdFx0Zm46IGZ1bmN0aW9uTmFtZSxcblx0XHRwYXJhbWV0ZXJzOiAocGFyYW1ldGVycyBhcyBhbnlbXSkubWFwKHdyYXBQcmltaXRpdmUpXG5cdH07XG59XG5cbi8qKlxuICogU2hvcnRjdXQgZnVuY3Rpb24gdG8gZGV0ZXJtaW5lIGlmIGEgYmluZGluZyB2YWx1ZSBpcyBudWxsLCB1bmRlZmluZWQgb3IgZW1wdHkuXG4gKlxuICogQHBhcmFtIGV4cHJlc3Npb25cbiAqIEByZXR1cm5zIEEgYm9vbGVhbiBleHByZXNzaW9uIGV2YWx1YXRpbmcgdGhlIGZhY3QgdGhhdCB0aGUgY3VycmVudCBlbGVtZW50IGlzIGVtcHR5XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0VtcHR5KGV4cHJlc3Npb246IEV4cHJlc3Npb248c3RyaW5nPik6IEV4cHJlc3Npb248Ym9vbGVhbj4ge1xuXHRpZiAoZXhwcmVzc2lvbi5fdHlwZSA9PT0gXCJDb25jYXRcIikge1xuXHRcdHJldHVybiBvciguLi5leHByZXNzaW9uLmV4cHJlc3Npb25zLm1hcChpc0VtcHR5KSk7XG5cdH1cblx0cmV0dXJuIG9yKGVxdWFsKGV4cHJlc3Npb24sIFwiXCIpLCBlcXVhbChleHByZXNzaW9uLCB1bmRlZmluZWQpLCBlcXVhbChleHByZXNzaW9uLCBudWxsKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25jYXQoLi4uaW5FeHByZXNzaW9uczogRXhwcmVzc2lvbk9yUHJpbWl0aXZlPHN0cmluZz5bXSk6IEV4cHJlc3Npb248c3RyaW5nPiB7XG5cdGNvbnN0IGV4cHJlc3Npb25zID0gaW5FeHByZXNzaW9ucy5tYXAod3JhcFByaW1pdGl2ZSk7XG5cdGlmIChoYXNVbnJlc29sdmVhYmxlRXhwcmVzc2lvbiguLi5leHByZXNzaW9ucykpIHtcblx0XHRyZXR1cm4gdW5yZXNvbHZlYWJsZUV4cHJlc3Npb247XG5cdH1cblx0aWYgKGV4cHJlc3Npb25zLmV2ZXJ5KGlzQ29uc3RhbnQpKSB7XG5cdFx0cmV0dXJuIGNvbnN0YW50KFxuXHRcdFx0ZXhwcmVzc2lvbnMucmVkdWNlKChjb25jYXRlbmF0ZWQ6IHN0cmluZywgdmFsdWUpID0+IHtcblx0XHRcdFx0cmV0dXJuIGNvbmNhdGVuYXRlZCArICh2YWx1ZSBhcyBDb25zdGFudEV4cHJlc3Npb248YW55PikudmFsdWUudG9TdHJpbmcoKTtcblx0XHRcdH0sIFwiXCIpXG5cdFx0KTtcblx0fVxuXHRyZXR1cm4ge1xuXHRcdF90eXBlOiBcIkNvbmNhdFwiLFxuXHRcdGV4cHJlc3Npb25zOiBleHByZXNzaW9uc1xuXHR9O1xufVxuXG5leHBvcnQgdHlwZSBUcmFuc2Zvcm1GdW5jdGlvbiA9IDxUIGV4dGVuZHMgUHJpbWl0aXZlVHlwZSB8IHVua25vd24+KGV4cHJlc3Npb25QYXJ0OiBhbnkpID0+IEV4cHJlc3Npb248VD47XG5leHBvcnQgdHlwZSBFeHByZXNzaW9uVHlwZSA9IFBpY2s8RXhwcmVzc2lvbjxhbnk+LCBcIl90eXBlXCI+W1wiX3R5cGVcIl07XG5leHBvcnQgZnVuY3Rpb24gdHJhbnNmb3JtUmVjdXJzaXZlbHk8VCBleHRlbmRzIFByaW1pdGl2ZVR5cGUgfCB1bmtub3duPihcblx0aW5FeHByZXNzaW9uOiBFeHByZXNzaW9uPFQ+LFxuXHRleHByZXNzaW9uVHlwZTogRXhwcmVzc2lvblR5cGUsXG5cdHRyYW5zZm9ybUZ1bmN0aW9uOiBUcmFuc2Zvcm1GdW5jdGlvbixcblx0aW5jbHVkZUFsbEV4cHJlc3Npb246IGJvb2xlYW4gPSBmYWxzZVxuKTogRXhwcmVzc2lvbjxUPiB7XG5cdGxldCBleHByZXNzaW9uID0gaW5FeHByZXNzaW9uO1xuXHRzd2l0Y2ggKGV4cHJlc3Npb24uX3R5cGUpIHtcblx0XHRjYXNlIFwiRnVuY3Rpb25cIjpcblx0XHRcdGV4cHJlc3Npb24ucGFyYW1ldGVycyA9IGV4cHJlc3Npb24ucGFyYW1ldGVycy5tYXAoZXhwcmVzc2lvbiA9PlxuXHRcdFx0XHR0cmFuc2Zvcm1SZWN1cnNpdmVseShleHByZXNzaW9uLCBleHByZXNzaW9uVHlwZSwgdHJhbnNmb3JtRnVuY3Rpb24sIGluY2x1ZGVBbGxFeHByZXNzaW9uKVxuXHRcdFx0KTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJDb25jYXRcIjpcblx0XHRcdGV4cHJlc3Npb24uZXhwcmVzc2lvbnMgPSBleHByZXNzaW9uLmV4cHJlc3Npb25zLm1hcChleHByZXNzaW9uID0+XG5cdFx0XHRcdHRyYW5zZm9ybVJlY3Vyc2l2ZWx5KGV4cHJlc3Npb24sIGV4cHJlc3Npb25UeXBlLCB0cmFuc2Zvcm1GdW5jdGlvbiwgaW5jbHVkZUFsbEV4cHJlc3Npb24pXG5cdFx0XHQpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkNvbXBsZXhUeXBlXCI6XG5cdFx0XHRleHByZXNzaW9uLmJpbmRpbmdQYXJhbWV0ZXJzID0gZXhwcmVzc2lvbi5iaW5kaW5nUGFyYW1ldGVycy5tYXAoZXhwcmVzc2lvbiA9PlxuXHRcdFx0XHR0cmFuc2Zvcm1SZWN1cnNpdmVseShleHByZXNzaW9uLCBleHByZXNzaW9uVHlwZSwgdHJhbnNmb3JtRnVuY3Rpb24sIGluY2x1ZGVBbGxFeHByZXNzaW9uKVxuXHRcdFx0KTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJGb3JtYXR0ZXJcIjpcblx0XHRcdGV4cHJlc3Npb24ucGFyYW1ldGVycyA9IGV4cHJlc3Npb24ucGFyYW1ldGVycy5tYXAoZXhwcmVzc2lvbiA9PlxuXHRcdFx0XHR0cmFuc2Zvcm1SZWN1cnNpdmVseShleHByZXNzaW9uLCBleHByZXNzaW9uVHlwZSwgdHJhbnNmb3JtRnVuY3Rpb24sIGluY2x1ZGVBbGxFeHByZXNzaW9uKVxuXHRcdFx0KTtcblx0XHRcdGJyZWFrO1xuXG5cdFx0Y2FzZSBcIklmRWxzZVwiOlxuXHRcdFx0Y29uc3Qgb25UcnVlID0gdHJhbnNmb3JtUmVjdXJzaXZlbHkoZXhwcmVzc2lvbi5vblRydWUsIGV4cHJlc3Npb25UeXBlLCB0cmFuc2Zvcm1GdW5jdGlvbiwgaW5jbHVkZUFsbEV4cHJlc3Npb24pO1xuXHRcdFx0Y29uc3Qgb25GYWxzZSA9IHRyYW5zZm9ybVJlY3Vyc2l2ZWx5KGV4cHJlc3Npb24ub25GYWxzZSwgZXhwcmVzc2lvblR5cGUsIHRyYW5zZm9ybUZ1bmN0aW9uLCBpbmNsdWRlQWxsRXhwcmVzc2lvbik7XG5cdFx0XHRsZXQgY29uZGl0aW9uID0gZXhwcmVzc2lvbi5jb25kaXRpb247XG5cdFx0XHRpZiAoaW5jbHVkZUFsbEV4cHJlc3Npb24pIHtcblx0XHRcdFx0Y29uZGl0aW9uID0gdHJhbnNmb3JtUmVjdXJzaXZlbHkoZXhwcmVzc2lvbi5jb25kaXRpb24sIGV4cHJlc3Npb25UeXBlLCB0cmFuc2Zvcm1GdW5jdGlvbiwgaW5jbHVkZUFsbEV4cHJlc3Npb24pO1xuXHRcdFx0fVxuXHRcdFx0ZXhwcmVzc2lvbiA9IGlmRWxzZShjb25kaXRpb24sIG9uVHJ1ZSwgb25GYWxzZSkgYXMgRXhwcmVzc2lvbjxUPjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJOb3RcIjpcblx0XHRcdGlmIChpbmNsdWRlQWxsRXhwcmVzc2lvbikge1xuXHRcdFx0XHRjb25zdCBvcGVyYW5kID0gdHJhbnNmb3JtUmVjdXJzaXZlbHkoZXhwcmVzc2lvbi5vcGVyYW5kLCBleHByZXNzaW9uVHlwZSwgdHJhbnNmb3JtRnVuY3Rpb24sIGluY2x1ZGVBbGxFeHByZXNzaW9uKTtcblx0XHRcdFx0ZXhwcmVzc2lvbiA9IG5vdChvcGVyYW5kKSBhcyBFeHByZXNzaW9uPFQ+O1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIlRydXRoeVwiOlxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIlNldFwiOlxuXHRcdFx0aWYgKGluY2x1ZGVBbGxFeHByZXNzaW9uKSB7XG5cdFx0XHRcdGV4cHJlc3Npb24ub3BlcmFuZHMgPSBleHByZXNzaW9uLm9wZXJhbmRzLm1hcChleHByZXNzaW9uID0+XG5cdFx0XHRcdFx0dHJhbnNmb3JtUmVjdXJzaXZlbHkoZXhwcmVzc2lvbiwgZXhwcmVzc2lvblR5cGUsIHRyYW5zZm9ybUZ1bmN0aW9uLCBpbmNsdWRlQWxsRXhwcmVzc2lvbilcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJDb21wYXJpc29uXCI6XG5cdFx0XHRpZiAoaW5jbHVkZUFsbEV4cHJlc3Npb24pIHtcblx0XHRcdFx0Y29uc3Qgb3BlcmFuZDEgPSB0cmFuc2Zvcm1SZWN1cnNpdmVseShleHByZXNzaW9uLm9wZXJhbmQxLCBleHByZXNzaW9uVHlwZSwgdHJhbnNmb3JtRnVuY3Rpb24sIGluY2x1ZGVBbGxFeHByZXNzaW9uKTtcblx0XHRcdFx0Y29uc3Qgb3BlcmFuZDIgPSB0cmFuc2Zvcm1SZWN1cnNpdmVseShleHByZXNzaW9uLm9wZXJhbmQyLCBleHByZXNzaW9uVHlwZSwgdHJhbnNmb3JtRnVuY3Rpb24sIGluY2x1ZGVBbGxFeHByZXNzaW9uKTtcblx0XHRcdFx0ZXhwcmVzc2lvbiA9IGNvbXBhcmlzb24oZXhwcmVzc2lvbi5vcGVyYXRvciwgb3BlcmFuZDEsIG9wZXJhbmQyKSBhcyBFeHByZXNzaW9uPFQ+O1xuXHRcdFx0fVxuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcIkRlZmF1bHRCaW5kaW5nXCI6XG5cdFx0Y2FzZSBcIlJlZlwiOlxuXHRcdGNhc2UgXCJCaW5kaW5nXCI6XG5cdFx0Y2FzZSBcIkNvbnN0YW50XCI6XG5cdFx0XHQvLyBEbyBub3RoaW5nXG5cdFx0XHRicmVhaztcblx0fVxuXHRpZiAoZXhwcmVzc2lvblR5cGUgPT09IGV4cHJlc3Npb24uX3R5cGUpIHtcblx0XHRleHByZXNzaW9uID0gdHJhbnNmb3JtRnVuY3Rpb24oaW5FeHByZXNzaW9uKTtcblx0fVxuXHRyZXR1cm4gZXhwcmVzc2lvbjtcbn1cblxuZXhwb3J0IHR5cGUgQmluZGluZ0V4cHJlc3Npb248VD4gPSBUIHwgc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4vKipcbiAqIENvbXBpbGUgYW4gZXhwcmVzc2lvbiBpbnRvIGFuIGV4cHJlc3Npb24gYmluZGluZy5cbiAqXG4gKiBAdGVtcGxhdGUgVCBUaGUgdGFyZ2V0IHR5cGVcbiAqIEBwYXJhbSBleHByZXNzaW9uIFRoZSBleHByZXNzaW9uIHRvIGNvbXBpbGVcbiAqIEBwYXJhbSBlbWJlZGRlZEluQmluZGluZyBXaGV0aGVyIHRoZSBleHByZXNzaW9uIHRvIGNvbXBpbGUgaXMgZW1iZWRkZWQgaW50byBhbm90aGVyIGV4cHJlc3Npb25cbiAqIEBwYXJhbSBrZWVwVGFyZ2V0VHlwZSBLZWVwIHRoZSB0YXJnZXQgdHlwZSBvZiB0aGUgZW1iZWRkZWQgYmluZGluZ3MgaW5zdGVhZCBvZiBjYXN0aW5nIHRoZW0gdG8gYW55XG4gKiBAcmV0dXJucyB7QmluZGluZ0V4cHJlc3Npb248VD59IFRoZSBjb3JyZXNwb25kaW5nIGV4cHJlc3Npb24gYmluZGluZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gY29tcGlsZUJpbmRpbmc8VCBleHRlbmRzIFByaW1pdGl2ZVR5cGU+KFxuXHRleHByZXNzaW9uOiBFeHByZXNzaW9uT3JQcmltaXRpdmU8VD4sXG5cdGVtYmVkZGVkSW5CaW5kaW5nOiBib29sZWFuID0gZmFsc2UsXG5cdGtlZXBUYXJnZXRUeXBlOiBib29sZWFuID0gZmFsc2Vcbik6IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz4ge1xuXHRjb25zdCBleHByID0gd3JhcFByaW1pdGl2ZShleHByZXNzaW9uKTtcblx0Y29uc3QgZW1iZWRkZWRTZXBhcmF0b3IgPSBrZWVwVGFyZ2V0VHlwZSA/IFwiJFwiIDogXCIlXCI7XG5cdGxldCBvdXRQcm9wZXJ0eSA9IFwiXCI7XG5cdHN3aXRjaCAoZXhwci5fdHlwZSkge1xuXHRcdGNhc2UgXCJVbnJlc29sdmVhYmxlXCI6XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdGNhc2UgXCJDb25zdGFudFwiOlxuXHRcdFx0aWYgKGV4cHIudmFsdWUgPT09IG51bGwpIHtcblx0XHRcdFx0cmV0dXJuIFwibnVsbFwiO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGV4cHIudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRyZXR1cm4gXCJ1bmRlZmluZWRcIjtcblx0XHRcdH1cblx0XHRcdGlmICh0eXBlb2YgZXhwci52YWx1ZSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheShleHByLnZhbHVlKSkge1xuXHRcdFx0XHRcdGNvbnN0IGVudHJpZXMgPSBleHByLnZhbHVlLm1hcChleHByZXNzaW9uID0+IGNvbXBpbGVCaW5kaW5nKGV4cHJlc3Npb24sIHRydWUpKTtcblx0XHRcdFx0XHRyZXR1cm4gYFske2VudHJpZXMuam9pbihcIiwgXCIpfV1gO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdC8vIE9iamVjdHNcblx0XHRcdFx0XHRjb25zdCBvID0gZXhwci52YWx1ZSBhcyBQbGFpbkV4cHJlc3Npb25PYmplY3Q7XG5cdFx0XHRcdFx0Y29uc3QgcHJvcGVydGllcyA9IE9iamVjdC5rZXlzKG8pLm1hcChrZXkgPT4ge1xuXHRcdFx0XHRcdFx0Y29uc3QgdmFsdWUgPSBvW2tleV07XG5cdFx0XHRcdFx0XHRyZXR1cm4gYCR7a2V5fTogJHtjb21waWxlQmluZGluZyh2YWx1ZSwgdHJ1ZSl9YDtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gYHske3Byb3BlcnRpZXMuam9pbihcIiwgXCIpfX1gO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGlmIChlbWJlZGRlZEluQmluZGluZykge1xuXHRcdFx0XHRzd2l0Y2ggKHR5cGVvZiBleHByLnZhbHVlKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIm51bWJlclwiOlxuXHRcdFx0XHRcdGNhc2UgXCJiaWdpbnRcIjpcblx0XHRcdFx0XHRjYXNlIFwiYm9vbGVhblwiOlxuXHRcdFx0XHRcdFx0cmV0dXJuIGV4cHIudmFsdWUudG9TdHJpbmcoKTtcblx0XHRcdFx0XHRjYXNlIFwic3RyaW5nXCI6XG5cdFx0XHRcdFx0XHRyZXR1cm4gYCcke2VzY2FwZVhtbEF0dHJpYnV0ZShleHByLnZhbHVlLnRvU3RyaW5nKCkpfSdgO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRyZXR1cm4gXCJcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGV4cHIudmFsdWUudG9TdHJpbmcoKTtcblx0XHRcdH1cblxuXHRcdGNhc2UgXCJSZWZcIjpcblx0XHRcdHJldHVybiBleHByLnJlZiB8fCBcIm51bGxcIjtcblxuXHRcdGNhc2UgXCJGdW5jdGlvblwiOlxuXHRcdFx0Y29uc3QgYXJndW1lbnRTdHJpbmcgPSBgJHtleHByLnBhcmFtZXRlcnMubWFwKGFyZyA9PiBjb21waWxlQmluZGluZyhhcmcsIHRydWUpKS5qb2luKFwiLCBcIil9YDtcblx0XHRcdHJldHVybiBleHByLm9iaiA9PT0gdW5kZWZpbmVkXG5cdFx0XHRcdD8gYCR7ZXhwci5mbn0oJHthcmd1bWVudFN0cmluZ30pYFxuXHRcdFx0XHQ6IGAke2NvbXBpbGVCaW5kaW5nKGV4cHIub2JqLCB0cnVlKX0uJHtleHByLmZufSgke2FyZ3VtZW50U3RyaW5nfSlgO1xuXHRcdGNhc2UgXCJFbWJlZGRlZEV4cHJlc3Npb25CaW5kaW5nXCI6XG5cdFx0XHRpZiAoZW1iZWRkZWRJbkJpbmRpbmcpIHtcblx0XHRcdFx0cmV0dXJuIGAoJHtleHByLnZhbHVlLnN1YnN0cigyLCBleHByLnZhbHVlLmxlbmd0aCAtIDMpfSlgO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGAke2V4cHIudmFsdWV9YDtcblx0XHRcdH1cblx0XHRjYXNlIFwiRW1iZWRkZWRCaW5kaW5nXCI6XG5cdFx0XHRpZiAoZW1iZWRkZWRJbkJpbmRpbmcpIHtcblx0XHRcdFx0cmV0dXJuIGAke2VtYmVkZGVkU2VwYXJhdG9yfSR7ZXhwci52YWx1ZX1gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGAke2V4cHIudmFsdWV9YDtcblx0XHRcdH1cblx0XHRjYXNlIFwiRGVmYXVsdEJpbmRpbmdcIjpcblx0XHRjYXNlIFwiQmluZGluZ1wiOlxuXHRcdFx0aWYgKGV4cHIudHlwZSB8fCBleHByLnBhcmFtZXRlcnMgfHwgZXhwci50YXJnZXRUeXBlKSB7XG5cdFx0XHRcdGxldCBvdXRCaW5kaW5nID0gXCJcIjtcblx0XHRcdFx0aWYgKGVtYmVkZGVkSW5CaW5kaW5nKSB7XG5cdFx0XHRcdFx0b3V0QmluZGluZyArPSBgJHtlbWJlZGRlZFNlcGFyYXRvcn1gO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG91dEJpbmRpbmcgKz0gYHtwYXRoOicke2V4cHIubW9kZWxOYW1lID8gYCR7ZXhwci5tb2RlbE5hbWV9PmAgOiBcIlwifSR7ZXhwci5wYXRofSdgO1xuXHRcdFx0XHRpZiAoZXhwci50eXBlKSB7XG5cdFx0XHRcdFx0b3V0QmluZGluZyArPSBgLCB0eXBlOiAnJHtleHByLnR5cGV9J2A7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGV4cHIuY29uc3RyYWludHMgJiYgT2JqZWN0LmtleXMoZXhwci5jb25zdHJhaW50cykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdG91dEJpbmRpbmcgKz0gYCwgY29uc3RyYWludHM6ICR7Y29tcGlsZUJpbmRpbmcoZXhwci5jb25zdHJhaW50cyl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZXhwci5mb3JtYXRPcHRpb25zKSB7XG5cdFx0XHRcdFx0b3V0QmluZGluZyArPSBgLCBmb3JtYXRPcHRpb25zOiAke2NvbXBpbGVCaW5kaW5nKGV4cHIuZm9ybWF0T3B0aW9ucyl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZXhwci5wYXJhbWV0ZXJzICYmIE9iamVjdC5rZXlzKGV4cHIucGFyYW1ldGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdG91dEJpbmRpbmcgKz0gYCwgcGFyYW1ldGVyczogJHtjb21waWxlQmluZGluZyhleHByLnBhcmFtZXRlcnMpfWA7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKGV4cHIudGFyZ2V0VHlwZSkge1xuXHRcdFx0XHRcdG91dEJpbmRpbmcgKz0gYCwgdGFyZ2V0VHlwZTogJyR7ZXhwci50YXJnZXRUeXBlfSdgO1xuXHRcdFx0XHR9XG5cdFx0XHRcdG91dEJpbmRpbmcgKz0gXCJ9XCI7XG5cdFx0XHRcdHJldHVybiBvdXRCaW5kaW5nO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aWYgKGVtYmVkZGVkSW5CaW5kaW5nKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGAke2VtYmVkZGVkU2VwYXJhdG9yfXske2V4cHIubW9kZWxOYW1lID8gYCR7ZXhwci5tb2RlbE5hbWV9PmAgOiBcIlwifSR7ZXhwci5wYXRofX1gO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBgeyR7ZXhwci5tb2RlbE5hbWUgPyBgJHtleHByLm1vZGVsTmFtZX0+YCA6IFwiXCJ9JHtleHByLnBhdGh9fWA7XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdGNhc2UgXCJDb21wYXJpc29uXCI6XG5cdFx0XHRjb25zdCBjb21wYXJpc29uUGFydCA9IGAke2NvbXBpbGVCaW5kaW5nKGV4cHIub3BlcmFuZDEsIHRydWUpfSAke2V4cHIub3BlcmF0b3J9ICR7Y29tcGlsZUJpbmRpbmcoZXhwci5vcGVyYW5kMiwgdHJ1ZSl9YDtcblx0XHRcdGlmIChlbWJlZGRlZEluQmluZGluZykge1xuXHRcdFx0XHRyZXR1cm4gY29tcGFyaXNvblBhcnQ7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYHs9ICR7Y29tcGFyaXNvblBhcnR9fWA7XG5cblx0XHRjYXNlIFwiSWZFbHNlXCI6XG5cdFx0XHRpZiAoZW1iZWRkZWRJbkJpbmRpbmcpIHtcblx0XHRcdFx0cmV0dXJuIGAoJHtjb21waWxlQmluZGluZyhleHByLmNvbmRpdGlvbiwgdHJ1ZSl9ID8gJHtjb21waWxlQmluZGluZyhleHByLm9uVHJ1ZSwgdHJ1ZSl9IDogJHtjb21waWxlQmluZGluZyhcblx0XHRcdFx0XHRleHByLm9uRmFsc2UsXG5cdFx0XHRcdFx0dHJ1ZVxuXHRcdFx0XHQpfSlgO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGB7PSAke2NvbXBpbGVCaW5kaW5nKGV4cHIuY29uZGl0aW9uLCB0cnVlKX0gPyAke2NvbXBpbGVCaW5kaW5nKGV4cHIub25UcnVlLCB0cnVlKX0gOiAke2NvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRcdGV4cHIub25GYWxzZSxcblx0XHRcdFx0XHR0cnVlXG5cdFx0XHRcdCl9fWA7XG5cdFx0XHR9XG5cblx0XHRjYXNlIFwiU2V0XCI6XG5cdFx0XHRpZiAoZW1iZWRkZWRJbkJpbmRpbmcpIHtcblx0XHRcdFx0cmV0dXJuIGAoJHtleHByLm9wZXJhbmRzLm1hcChleHByZXNzaW9uID0+IGNvbXBpbGVCaW5kaW5nKGV4cHJlc3Npb24sIHRydWUpKS5qb2luKGAgJHtleHByLm9wZXJhdG9yfSBgKX0pYDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBgez0gKCR7ZXhwci5vcGVyYW5kcy5tYXAoZXhwcmVzc2lvbiA9PiBjb21waWxlQmluZGluZyhleHByZXNzaW9uLCB0cnVlKSkuam9pbihgICR7ZXhwci5vcGVyYXRvcn0gYCl9KX1gO1xuXHRcdFx0fVxuXG5cdFx0Y2FzZSBcIkNvbmNhdFwiOlxuXHRcdFx0aWYgKGVtYmVkZGVkSW5CaW5kaW5nKSB7XG5cdFx0XHRcdHJldHVybiBgJHtleHByLmV4cHJlc3Npb25zLm1hcChleHByZXNzaW9uID0+IGNvbXBpbGVCaW5kaW5nKGV4cHJlc3Npb24sIHRydWUsIHRydWUpKS5qb2luKGAgKyBgKX1gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGB7PSAke2V4cHIuZXhwcmVzc2lvbnMubWFwKGV4cHJlc3Npb24gPT4gY29tcGlsZUJpbmRpbmcoZXhwcmVzc2lvbiwgdHJ1ZSwgdHJ1ZSkpLmpvaW4oYCArIGApfSB9YDtcblx0XHRcdH1cblxuXHRcdGNhc2UgXCJOb3RcIjpcblx0XHRcdGlmIChlbWJlZGRlZEluQmluZGluZykge1xuXHRcdFx0XHRyZXR1cm4gYCEke2NvbXBpbGVCaW5kaW5nKGV4cHIub3BlcmFuZCwgdHJ1ZSl9YDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBgez0gISR7Y29tcGlsZUJpbmRpbmcoZXhwci5vcGVyYW5kLCB0cnVlKX19YDtcblx0XHRcdH1cblxuXHRcdGNhc2UgXCJUcnV0aHlcIjpcblx0XHRcdGlmIChlbWJlZGRlZEluQmluZGluZykge1xuXHRcdFx0XHRyZXR1cm4gYCEhJHtjb21waWxlQmluZGluZyhleHByLm9wZXJhbmQsIHRydWUpfWA7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gYHs9ICEhJHtjb21waWxlQmluZGluZyhleHByLm9wZXJhbmQsIHRydWUpfX1gO1xuXHRcdFx0fVxuXG5cdFx0Y2FzZSBcIkZvcm1hdHRlclwiOlxuXHRcdFx0aWYgKGV4cHIucGFyYW1ldGVycy5sZW5ndGggPT09IDEpIHtcblx0XHRcdFx0b3V0UHJvcGVydHkgKz0gYHske2NvbXBpbGVQYXRoUGFyYW1ldGVyKGV4cHIucGFyYW1ldGVyc1swXSwgdHJ1ZSl9LCBmb3JtYXR0ZXI6ICcke2V4cHIuZm59J31gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0b3V0UHJvcGVydHkgKz0gYHtwYXJ0czpbJHtleHByLnBhcmFtZXRlcnMubWFwKChwYXJhbTogYW55KSA9PiBjb21waWxlUGF0aFBhcmFtZXRlcihwYXJhbSkpLmpvaW4oXCIsXCIpfV0sIGZvcm1hdHRlcjogJyR7XG5cdFx0XHRcdFx0ZXhwci5mblxuXHRcdFx0XHR9J31gO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGVtYmVkZGVkSW5CaW5kaW5nKSB7XG5cdFx0XHRcdG91dFByb3BlcnR5ID0gYFxcJCR7b3V0UHJvcGVydHl9YDtcblx0XHRcdH1cblx0XHRcdHJldHVybiBvdXRQcm9wZXJ0eTtcblx0XHRjYXNlIFwiQ29tcGxleFR5cGVcIjpcblx0XHRcdGlmIChleHByLmJpbmRpbmdQYXJhbWV0ZXJzLmxlbmd0aCA9PT0gMSkge1xuXHRcdFx0XHRvdXRQcm9wZXJ0eSArPSBgeyR7Y29tcGlsZVBhdGhQYXJhbWV0ZXIoZXhwci5iaW5kaW5nUGFyYW1ldGVyc1swXSwgdHJ1ZSl9LCB0eXBlOiAnJHtleHByLnR5cGV9J31gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0bGV0IG91dHB1dEVuZDtcblx0XHRcdFx0Ly8gdGhpcyBjb2RlIGlzIGJhc2VkIG9uIHNhcC51aS5tb2RlbC5vZGF0YS52NC5fQW5ub3RhdGlvbkhlbHBlckV4cHJlc3Npb24uZmV0Y2hDdXJyZW5jeU9yVW5pdFxuXHRcdFx0XHRzd2l0Y2ggKGV4cHIudHlwZSkge1xuXHRcdFx0XHRcdGNhc2UgXCJzYXAudWkubW9kZWwub2RhdGEudHlwZS5Vbml0XCI6XG5cdFx0XHRcdFx0XHRvdXRwdXRFbmQgPSBgLHttb2RlOidPbmVUaW1lJyxwYXRoOicvIyNAQHJlcXVlc3RVbml0c09mTWVhc3VyZScsdGFyZ2V0VHlwZTonYW55J31dLHR5cGU6J3NhcC51aS5tb2RlbC5vZGF0YS50eXBlLlVuaXQnYDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgXCJzYXAudWkubW9kZWwub2RhdGEudHlwZS5DdXJyZW5jeVwiOlxuXHRcdFx0XHRcdFx0b3V0cHV0RW5kID0gYCx7bW9kZTonT25lVGltZScscGF0aDonLyMjQEByZXF1ZXN0Q3VycmVuY3lDb2RlcycsdGFyZ2V0VHlwZTonYW55J31dLHR5cGU6J3NhcC51aS5tb2RlbC5vZGF0YS50eXBlLkN1cnJlbmN5J2A7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0b3V0cHV0RW5kID0gYF0sIHR5cGU6ICcke2V4cHIudHlwZX0nYDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZXhwci5mb3JtYXRPcHRpb25zICYmIE9iamVjdC5rZXlzKGV4cHIuZm9ybWF0T3B0aW9ucykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdG91dHB1dEVuZCArPSBgLCBmb3JtYXRPcHRpb25zOiAke2NvbXBpbGVCaW5kaW5nKGV4cHIuZm9ybWF0T3B0aW9ucyl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZXhwci5wYXJhbWV0ZXJzICYmIE9iamVjdC5rZXlzKGV4cHIucGFyYW1ldGVycykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdG91dHB1dEVuZCArPSBgLCBwYXJhbWV0ZXJzOiAke2NvbXBpbGVCaW5kaW5nKGV4cHIucGFyYW1ldGVycyl9YDtcblx0XHRcdFx0fVxuXHRcdFx0XHRvdXRwdXRFbmQgKz0gXCJ9XCI7XG5cdFx0XHRcdG91dFByb3BlcnR5ICs9IGB7bW9kZTonVHdvV2F5JywgcGFydHM6WyR7ZXhwci5iaW5kaW5nUGFyYW1ldGVyc1xuXHRcdFx0XHRcdC5tYXAoKHBhcmFtOiBhbnkpID0+IGNvbXBpbGVQYXRoUGFyYW1ldGVyKHBhcmFtKSlcblx0XHRcdFx0XHQuam9pbihcIixcIil9JHtvdXRwdXRFbmR9YDtcblx0XHRcdH1cblx0XHRcdGlmIChlbWJlZGRlZEluQmluZGluZykge1xuXHRcdFx0XHRvdXRQcm9wZXJ0eSA9IGBcXCQke291dFByb3BlcnR5fWA7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gb3V0UHJvcGVydHk7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBcIlwiO1xuXHR9XG59XG5cbi8qKlxuICogQ29tcGlsZSB0aGUgcGF0aCBwYXJhbWV0ZXIgb2YgYSBmb3JtYXR0ZXIgY2FsbC5cbiAqXG4gKiBAcGFyYW0gZXhwcmVzc2lvbiBUaGUgYmluZGluZyBwYXJ0IHRvIGV2YWx1YXRlXG4gKiBAcGFyYW0gc2luZ2xlUGF0aCBXaGV0aGVyIHRoZXJlIGlzIG9uZSBvciBtdWx0aXBsZSBwYXRoIHRvIGNvbnNpZGVyXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBUaGUgc3RyaW5nIHNuaXBwZXQgdG8gaW5jbHVkZSBpbiB0aGUgb3ZlcmFsbCBiaW5kaW5nIGRlZmluaXRpb25cbiAqL1xuZnVuY3Rpb24gY29tcGlsZVBhdGhQYXJhbWV0ZXIoZXhwcmVzc2lvbjogRXhwcmVzc2lvbjxhbnk+LCBzaW5nbGVQYXRoOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcge1xuXHRsZXQgb3V0VmFsdWUgPSBcIlwiO1xuXHRzd2l0Y2ggKGV4cHJlc3Npb24uX3R5cGUpIHtcblx0XHRjYXNlIFwiQ29uc3RhbnRcIjpcblx0XHRcdHN3aXRjaCAodHlwZW9mIGV4cHJlc3Npb24udmFsdWUpIHtcblx0XHRcdFx0Y2FzZSBcIm51bWJlclwiOlxuXHRcdFx0XHRjYXNlIFwiYmlnaW50XCI6XG5cdFx0XHRcdFx0b3V0VmFsdWUgPSBgdmFsdWU6ICR7ZXhwcmVzc2lvbi52YWx1ZS50b1N0cmluZygpfWA7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJzdHJpbmdcIjpcblx0XHRcdFx0XHRvdXRWYWx1ZSA9IGB2YWx1ZTogJyR7ZXNjYXBlWG1sQXR0cmlidXRlKGV4cHJlc3Npb24udmFsdWUudG9TdHJpbmcoKSl9J2A7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJib29sZWFuXCI6XG5cdFx0XHRcdFx0b3V0VmFsdWUgPSBgdmFsdWU6ICcke2V4cHJlc3Npb24udmFsdWUudG9TdHJpbmcoKX0nYDtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRvdXRWYWx1ZSA9IFwidmFsdWU6ICcnXCI7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRpZiAoc2luZ2xlUGF0aCkge1xuXHRcdFx0XHRyZXR1cm4gb3V0VmFsdWU7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYHske291dFZhbHVlfX1gO1xuXG5cdFx0Y2FzZSBcIkRlZmF1bHRCaW5kaW5nXCI6XG5cdFx0Y2FzZSBcIkJpbmRpbmdcIjpcblx0XHRcdG91dFZhbHVlID0gYHBhdGg6JyR7ZXhwcmVzc2lvbi5tb2RlbE5hbWUgPyBgJHtleHByZXNzaW9uLm1vZGVsTmFtZX0+YCA6IFwiXCJ9JHtleHByZXNzaW9uLnBhdGh9J2A7XG5cblx0XHRcdGlmIChleHByZXNzaW9uLnR5cGUpIHtcblx0XHRcdFx0b3V0VmFsdWUgKz0gYCwgdHlwZSA6ICcke2V4cHJlc3Npb24udHlwZX0nYDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdG91dFZhbHVlICs9IGAsIHRhcmdldFR5cGUgOiAnYW55J2A7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXhwcmVzc2lvbi5jb25zdHJhaW50cyAmJiBPYmplY3Qua2V5cyhleHByZXNzaW9uLmNvbnN0cmFpbnRzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdG91dFZhbHVlICs9IGAsIGNvbnN0cmFpbnRzOiAke2NvbXBpbGVCaW5kaW5nKGV4cHJlc3Npb24uY29uc3RyYWludHMpfWA7XG5cdFx0XHR9XG5cdFx0XHRpZiAoZXhwcmVzc2lvbi5mb3JtYXRPcHRpb25zICYmIE9iamVjdC5rZXlzKGV4cHJlc3Npb24uZm9ybWF0T3B0aW9ucykubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRvdXRWYWx1ZSArPSBgLCBmb3JtYXRPcHRpb25zOiAke2NvbXBpbGVCaW5kaW5nKGV4cHJlc3Npb24uZm9ybWF0T3B0aW9ucyl9YDtcblx0XHRcdH1cblx0XHRcdGlmIChleHByZXNzaW9uLnBhcmFtZXRlcnMgJiYgT2JqZWN0LmtleXMoZXhwcmVzc2lvbi5wYXJhbWV0ZXJzKS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdG91dFZhbHVlICs9IGAsIHBhcmFtZXRlcnM6ICR7Y29tcGlsZUJpbmRpbmcoZXhwcmVzc2lvbi5wYXJhbWV0ZXJzKX1gO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHNpbmdsZVBhdGgpIHtcblx0XHRcdFx0cmV0dXJuIG91dFZhbHVlO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIGB7JHtvdXRWYWx1ZX19YDtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIFwiXCI7XG5cdH1cbn1cbiJdfQ==