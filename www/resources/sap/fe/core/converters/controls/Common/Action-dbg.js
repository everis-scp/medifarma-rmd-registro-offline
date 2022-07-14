/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/ManifestSettings", "sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/converters/helpers/ID", "sap/fe/core/helpers/StableIdHelper", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/formatters/FPMFormatter"], function (ManifestSettings, ConfigurableObject, ID, StableIdHelper, BindingExpression, fpmFormatter) {
  "use strict";

  var _exports = {};
  var greaterOrEqual = BindingExpression.greaterOrEqual;
  var and = BindingExpression.and;
  var ifElse = BindingExpression.ifElse;
  var equal = BindingExpression.equal;
  var resolveBindingString = BindingExpression.resolveBindingString;
  var isConstant = BindingExpression.isConstant;
  var formatResult = BindingExpression.formatResult;
  var or = BindingExpression.or;
  var compileBinding = BindingExpression.compileBinding;
  var bindingExpression = BindingExpression.bindingExpression;
  var annotationExpression = BindingExpression.annotationExpression;
  var replaceSpecialChars = StableIdHelper.replaceSpecialChars;
  var CustomActionID = ID.CustomActionID;
  var Placement = ConfigurableObject.Placement;
  var ActionType = ManifestSettings.ActionType;

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var ButtonType;

  (function (ButtonType) {
    ButtonType["Accept"] = "Accept";
    ButtonType["Attention"] = "Attention";
    ButtonType["Back"] = "Back";
    ButtonType["Critical"] = "Critical";
    ButtonType["Default"] = "Default";
    ButtonType["Emphasized"] = "Emphasized";
    ButtonType["Ghost"] = "Ghost";
    ButtonType["Negative"] = "Negative";
    ButtonType["Neutral"] = "Neutral";
    ButtonType["Reject"] = "Reject";
    ButtonType["Success"] = "Success";
    ButtonType["Transparent"] = "Transparent";
    ButtonType["Unstyled"] = "Unstyled";
    ButtonType["Up"] = "Up";
  })(ButtonType || (ButtonType = {}));

  _exports.ButtonType = ButtonType;

  /**
   * Creates the menu action from manifest actions.
   * @param {Record<string, CustomAction>} actions The manifest definition
   * @param {BaseAction[]} aAnnotationActions The annotation actions definition
   * @param aHiddenHeaderActions
   * @returns {Record<string, CustomAction>} The actions from the manifest and the menu option that were added
   */
  function prepareMenuAction(actions, aAnnotationActions, aHiddenHeaderActions) {
    var _menuItemKeys2;

    var allActions = {};
    var menuItemKeys = [];

    var _loop = function (actionKey) {
      var manifestAction = actions[actionKey];

      if (manifestAction.type === ActionType.Menu) {
        var _manifestAction$menu$, _manifestAction$menu;

        var menuItems = [];
        var menuVisible = false;

        var _menuItemKeys = (_manifestAction$menu$ = (_manifestAction$menu = manifestAction.menu) === null || _manifestAction$menu === void 0 ? void 0 : _manifestAction$menu.map(function (menuKey) {
          var _action, _action2, _action3;

          var action = aAnnotationActions.find(function (action) {
            return action.key === menuKey;
          });

          if (!action) {
            action = actions[menuKey];
          }

          if ((((_action = action) === null || _action === void 0 ? void 0 : _action.visible) || ((_action2 = action) === null || _action2 === void 0 ? void 0 : _action2.type) === ActionType.DataFieldForAction || ((_action3 = action) === null || _action3 === void 0 ? void 0 : _action3.type) === ActionType.DataFieldForIntentBasedNavigation) && !aHiddenHeaderActions.find(function (hiddenAction) {
            return hiddenAction.key === menuKey;
          })) {
            menuVisible = compileBinding(or(resolveBindingString(action.visible, "boolean"), resolveBindingString(menuVisible, "boolean")));
            menuItems.push(action);
          }

          return menuKey;
        })) !== null && _manifestAction$menu$ !== void 0 ? _manifestAction$menu$ : []; // Show menu button if it has one or more then 1 items visible


        if (menuItems.length) {
          manifestAction.visible = menuVisible;
          manifestAction.menu = menuItems;
        } else {
          _menuItemKeys = [actionKey];
        }

        menuItemKeys = [].concat(_toConsumableArray(menuItemKeys), _toConsumableArray(_menuItemKeys));
      }

      if (aHiddenHeaderActions.find(function (hiddenAction) {
        return hiddenAction.key === actionKey;
      })) {
        manifestAction.visible = false;
      }

      allActions[actionKey] = manifestAction;
    };

    for (var actionKey in actions) {
      _loop(actionKey);
    } // eslint-disable-next-line no-unused-expressions


    (_menuItemKeys2 = menuItemKeys) === null || _menuItemKeys2 === void 0 ? void 0 : _menuItemKeys2.forEach(function (actionKey) {
      return delete allActions[actionKey];
    });
    return allActions;
  }

  var removeDuplicateActions = function (actions) {
    var oMenuItemKeys = {};
    actions.forEach(function (action) {
      var _action$menu;

      if (action === null || action === void 0 ? void 0 : (_action$menu = action.menu) === null || _action$menu === void 0 ? void 0 : _action$menu.length) {
        action.menu.reduce(function (item, _ref) {
          var key = _ref.key;

          if (key && !item[key]) {
            item[key] = true;
          }

          return item;
        }, oMenuItemKeys);
      }
    });
    return actions.filter(function (action) {
      return !oMenuItemKeys[action.key];
    });
  };
  /**
   * Retrieves an action default value based on its kind.
   *
   * Default property value for custom actions if not overwritten in manifest.
   * @param {ManifestAction} manifestAction The action configured in the manifest
   * @param {boolean} isAnnotationAction Whether the action, defined in manifest, corresponds to an existing annotation action.
   * @param {ConverterContext} converterContext The instance of the converter context
   * @returns {BindingExpression<string> | string | boolean} Determined property value for the column
   */


  _exports.removeDuplicateActions = removeDuplicateActions;

  var _getManifestEnabled = function (manifestAction, isAnnotationAction, converterContext) {
    if (isAnnotationAction && manifestAction.enabled === undefined) {
      // If annotation action has no property defined in manifest,
      // do not overwrite it with manifest action's default value.
      return undefined;
    } // Return what is defined in manifest.


    return getManifestActionEnablement(manifestAction, converterContext);
  };
  /**
   * Create the action configuration based on the manifest settings.
   * @param {Record<string, ManifestAction> | undefined} manifestActions The manifest
   * @param converterContext
   * @param {BaseAction[]} aAnnotationActions The annotation actions definition
   * @param {NavigationSettingsConfiguration} navigationSettings
   * @param {boolean} considerNavigationSettings
   * @param {BaseAction[]} aHiddenHeaderActions
   * @returns {Record<string, CustomAction>} The actions from the manifest
   */


  function getActionsFromManifest(manifestActions, converterContext, aAnnotationActions, navigationSettings, considerNavigationSettings, aHiddenHeaderActions) {
    var actions = {};

    var _loop2 = function (actionKey) {
      var _manifestAction$press, _manifestAction$posit, _manifestAction$menu2;

      var manifestAction = manifestActions[actionKey];
      var lastDotIndex = ((_manifestAction$press = manifestAction.press) === null || _manifestAction$press === void 0 ? void 0 : _manifestAction$press.lastIndexOf(".")) || -1; // To identify the annotation action property overwrite via manifest use-case.

      var isAnnotationAction = (aAnnotationActions === null || aAnnotationActions === void 0 ? void 0 : aAnnotationActions.some(function (action) {
        return action.key === actionKey;
      })) || false;
      actions[actionKey] = {
        id: (aAnnotationActions === null || aAnnotationActions === void 0 ? void 0 : aAnnotationActions.some(function (action) {
          return action.key === actionKey;
        })) ? actionKey : CustomActionID(actionKey),
        visible: manifestAction.visible === undefined ? "true" : manifestAction.visible,
        enabled: _getManifestEnabled(manifestAction, isAnnotationAction, converterContext),
        handlerModule: manifestAction.press && manifestAction.press.substring(0, lastDotIndex).replace(/\./gi, "/"),
        handlerMethod: manifestAction.press && manifestAction.press.substring(lastDotIndex + 1),
        press: manifestAction.press,
        type: manifestAction.menu ? ActionType.Menu : ActionType.Default,
        text: manifestAction.text,
        noWrap: manifestAction.__noWrap,
        key: replaceSpecialChars(actionKey),
        enableOnSelect: manifestAction.enableOnSelect,
        defaultValuesExtensionFunction: manifestAction.defaultValuesFunction,
        position: {
          anchor: (_manifestAction$posit = manifestAction.position) === null || _manifestAction$posit === void 0 ? void 0 : _manifestAction$posit.anchor,
          placement: manifestAction.position === undefined ? Placement.After : manifestAction.position.placement
        },
        isNavigable: isActionNavigable(manifestAction, navigationSettings, considerNavigationSettings),
        requiresSelection: manifestAction.requiresSelection === undefined ? false : manifestAction.requiresSelection,
        enableAutoScroll: enableAutoScroll(manifestAction),
        menu: (_manifestAction$menu2 = manifestAction.menu) !== null && _manifestAction$menu2 !== void 0 ? _manifestAction$menu2 : []
      };
    };

    for (var actionKey in manifestActions) {
      _loop2(actionKey);
    }

    return prepareMenuAction(actions, aAnnotationActions !== null && aAnnotationActions !== void 0 ? aAnnotationActions : [], aHiddenHeaderActions !== null && aHiddenHeaderActions !== void 0 ? aHiddenHeaderActions : []);
  }

  _exports.getActionsFromManifest = getActionsFromManifest;

  function getManifestActionEnablement(manifestAction, converterContext) {
    var resolvedBinding = resolveBindingString(manifestAction.enabled, "boolean");
    var result;

    if (isConstant(resolvedBinding) && resolvedBinding.value === undefined) {
      // No enabled property configured in manifest for the custom action --> enable custom action
      result = true;
    } else if (isConstant(resolvedBinding) && typeof resolvedBinding.value === "boolean") {
      // true / false
      result = resolvedBinding.value;
    } else if (resolvedBinding._type !== "EmbeddedBinding" && resolvedBinding._type !== "EmbeddedExpressionBinding") {
      // Then it's a module-method reference "sap.xxx.yyy.doSomething"
      var methodPath = resolvedBinding.value;
      result = formatResult([bindingExpression("/", "$view"), methodPath, bindingExpression("selectedContexts", "internal")], fpmFormatter.customIsEnabledCheck, converterContext.getEntityType());
    } else {
      // then it's a binding
      result = resolvedBinding;
    } // Consider requiresSelection property to include selectedContexts in the binding expression


    return compileBinding(ifElse(manifestAction.requiresSelection === true, and(greaterOrEqual(bindingExpression("numberOfSelectedContexts", "internal"), 1), result), result));
  }

  function getEnabledBinding(actionDefinition) {
    var _actionDefinition$ann, _actionDefinition$ann2;

    if (!actionDefinition) {
      return "true";
    }

    if (!actionDefinition.isBound) {
      return "true";
    }

    var operationAvailable = (_actionDefinition$ann = actionDefinition.annotations) === null || _actionDefinition$ann === void 0 ? void 0 : (_actionDefinition$ann2 = _actionDefinition$ann.Core) === null || _actionDefinition$ann2 === void 0 ? void 0 : _actionDefinition$ann2.OperationAvailable;

    if (operationAvailable) {
      var _bindingExpression = compileBinding(equal(annotationExpression(operationAvailable.valueOf()), true));

      if (_bindingExpression) {
        var _actionDefinition$par, _actionDefinition$par2;

        /**
         * Since the action is bound, all the annotation that evaluates path expression are doing so while including the entityset binding parameter name (self.xxx or _it.xxx).
         * However in the UI we are usually already bound to the entityset that this action refers to and as such we just need to ignore that part.
         * The following code does that for us.
         * NB : This is old code and there are nicer way to do it now but I won't get over them for now.
         **/
        var paramSuffix = (_actionDefinition$par = actionDefinition.parameters) === null || _actionDefinition$par === void 0 ? void 0 : (_actionDefinition$par2 = _actionDefinition$par[0]) === null || _actionDefinition$par2 === void 0 ? void 0 : _actionDefinition$par2.fullyQualifiedName;

        if (paramSuffix) {
          paramSuffix = paramSuffix.replace(actionDefinition.fullyQualifiedName + "/", "");
          _bindingExpression = _bindingExpression.replace(paramSuffix + "/", "");
        }

        return _bindingExpression;
      }

      return "true";
    }

    return "true";
    /*
       FIXME Disable failing music tests
    	Currently on CAP the following binding (which is the good one) generates error:
    			   return "{= !${#" + field.Action + "} ? false : true }";
    	CAP tries to read the action as property and doesn't find it
    */
  }

  _exports.getEnabledBinding = getEnabledBinding;

  function getSemanticObjectMapping(aMappings) {
    var aSemanticObjectMappings = [];
    aMappings.forEach(function (oMapping) {
      var oSOMapping = {
        "LocalProperty": {
          "$PropertyPath": oMapping.LocalProperty.value
        },
        "SemanticObjectProperty": oMapping.SemanticObjectProperty
      };
      aSemanticObjectMappings.push(oSOMapping);
    });
    return aSemanticObjectMappings;
  }

  _exports.getSemanticObjectMapping = getSemanticObjectMapping;

  function isActionNavigable(action, navigationSettings, considerNavigationSettings) {
    var _action$afterExecutio, _action$afterExecutio2;

    var bIsNavigationConfigured = true;

    if (considerNavigationSettings) {
      var detailOrDisplay = navigationSettings && (navigationSettings.detail || navigationSettings.display);
      bIsNavigationConfigured = (detailOrDisplay === null || detailOrDisplay === void 0 ? void 0 : detailOrDisplay.route) ? true : false;
    } // when enableAutoScroll is true the navigateToInstance feature is disabled


    if (action && action.afterExecution && (((_action$afterExecutio = action.afterExecution) === null || _action$afterExecutio === void 0 ? void 0 : _action$afterExecutio.navigateToInstance) === false || ((_action$afterExecutio2 = action.afterExecution) === null || _action$afterExecutio2 === void 0 ? void 0 : _action$afterExecutio2.enableAutoScroll) === true) || !bIsNavigationConfigured) {
      return false;
    }

    return true;
  }

  _exports.isActionNavigable = isActionNavigable;

  function enableAutoScroll(action) {
    var _action$afterExecutio3;

    return (action === null || action === void 0 ? void 0 : (_action$afterExecutio3 = action.afterExecution) === null || _action$afterExecutio3 === void 0 ? void 0 : _action$afterExecutio3.enableAutoScroll) === true;
  }

  _exports.enableAutoScroll = enableAutoScroll;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFjdGlvbi50cyJdLCJuYW1lcyI6WyJCdXR0b25UeXBlIiwicHJlcGFyZU1lbnVBY3Rpb24iLCJhY3Rpb25zIiwiYUFubm90YXRpb25BY3Rpb25zIiwiYUhpZGRlbkhlYWRlckFjdGlvbnMiLCJhbGxBY3Rpb25zIiwibWVudUl0ZW1LZXlzIiwiYWN0aW9uS2V5IiwibWFuaWZlc3RBY3Rpb24iLCJ0eXBlIiwiQWN0aW9uVHlwZSIsIk1lbnUiLCJtZW51SXRlbXMiLCJtZW51VmlzaWJsZSIsIl9tZW51SXRlbUtleXMiLCJtZW51IiwibWFwIiwibWVudUtleSIsImFjdGlvbiIsImZpbmQiLCJrZXkiLCJ2aXNpYmxlIiwiRGF0YUZpZWxkRm9yQWN0aW9uIiwiRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uIiwiaGlkZGVuQWN0aW9uIiwiY29tcGlsZUJpbmRpbmciLCJvciIsInJlc29sdmVCaW5kaW5nU3RyaW5nIiwicHVzaCIsImxlbmd0aCIsImZvckVhY2giLCJyZW1vdmVEdXBsaWNhdGVBY3Rpb25zIiwib01lbnVJdGVtS2V5cyIsInJlZHVjZSIsIml0ZW0iLCJmaWx0ZXIiLCJfZ2V0TWFuaWZlc3RFbmFibGVkIiwiaXNBbm5vdGF0aW9uQWN0aW9uIiwiY29udmVydGVyQ29udGV4dCIsImVuYWJsZWQiLCJ1bmRlZmluZWQiLCJnZXRNYW5pZmVzdEFjdGlvbkVuYWJsZW1lbnQiLCJnZXRBY3Rpb25zRnJvbU1hbmlmZXN0IiwibWFuaWZlc3RBY3Rpb25zIiwibmF2aWdhdGlvblNldHRpbmdzIiwiY29uc2lkZXJOYXZpZ2F0aW9uU2V0dGluZ3MiLCJsYXN0RG90SW5kZXgiLCJwcmVzcyIsImxhc3RJbmRleE9mIiwic29tZSIsImlkIiwiQ3VzdG9tQWN0aW9uSUQiLCJoYW5kbGVyTW9kdWxlIiwic3Vic3RyaW5nIiwicmVwbGFjZSIsImhhbmRsZXJNZXRob2QiLCJEZWZhdWx0IiwidGV4dCIsIm5vV3JhcCIsIl9fbm9XcmFwIiwicmVwbGFjZVNwZWNpYWxDaGFycyIsImVuYWJsZU9uU2VsZWN0IiwiZGVmYXVsdFZhbHVlc0V4dGVuc2lvbkZ1bmN0aW9uIiwiZGVmYXVsdFZhbHVlc0Z1bmN0aW9uIiwicG9zaXRpb24iLCJhbmNob3IiLCJwbGFjZW1lbnQiLCJQbGFjZW1lbnQiLCJBZnRlciIsImlzTmF2aWdhYmxlIiwiaXNBY3Rpb25OYXZpZ2FibGUiLCJyZXF1aXJlc1NlbGVjdGlvbiIsImVuYWJsZUF1dG9TY3JvbGwiLCJyZXNvbHZlZEJpbmRpbmciLCJyZXN1bHQiLCJpc0NvbnN0YW50IiwidmFsdWUiLCJfdHlwZSIsIm1ldGhvZFBhdGgiLCJmb3JtYXRSZXN1bHQiLCJiaW5kaW5nRXhwcmVzc2lvbiIsImZwbUZvcm1hdHRlciIsImN1c3RvbUlzRW5hYmxlZENoZWNrIiwiZ2V0RW50aXR5VHlwZSIsImlmRWxzZSIsImFuZCIsImdyZWF0ZXJPckVxdWFsIiwiZ2V0RW5hYmxlZEJpbmRpbmciLCJhY3Rpb25EZWZpbml0aW9uIiwiaXNCb3VuZCIsIm9wZXJhdGlvbkF2YWlsYWJsZSIsImFubm90YXRpb25zIiwiQ29yZSIsIk9wZXJhdGlvbkF2YWlsYWJsZSIsImVxdWFsIiwiYW5ub3RhdGlvbkV4cHJlc3Npb24iLCJ2YWx1ZU9mIiwicGFyYW1TdWZmaXgiLCJwYXJhbWV0ZXJzIiwiZnVsbHlRdWFsaWZpZWROYW1lIiwiZ2V0U2VtYW50aWNPYmplY3RNYXBwaW5nIiwiYU1hcHBpbmdzIiwiYVNlbWFudGljT2JqZWN0TWFwcGluZ3MiLCJvTWFwcGluZyIsIm9TT01hcHBpbmciLCJMb2NhbFByb3BlcnR5IiwiU2VtYW50aWNPYmplY3RQcm9wZXJ0eSIsImJJc05hdmlnYXRpb25Db25maWd1cmVkIiwiZGV0YWlsT3JEaXNwbGF5IiwiZGV0YWlsIiwiZGlzcGxheSIsInJvdXRlIiwiYWZ0ZXJFeGVjdXRpb24iLCJuYXZpZ2F0ZVRvSW5zdGFuY2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQXNCWUEsVTs7YUFB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QVNoQyxpQkFBVCxDQUNOcEQsTUFETSxFQUVOMEIsa0JBRk0sRUFHTkMsMEJBSE0sRUFJSTtBQUFBOztBQUNWLFFBQUk4RCx1QkFBZ0MsR0FBRyxJQUF2Qzs7QUFDQSxRQUFJOUQsMEJBQUosRUFBZ0M7QUFDL0IsVUFBTStELGVBQWUsR0FBR2hFLGtCQUFrQixLQUFLQSxrQkFBa0IsQ0FBQ2lFLE1BQW5CLElBQTZCakUsa0JBQWtCLENBQUNrRSxPQUFyRCxDQUExQztBQUNBSCxNQUFBQSx1QkFBdUIsR0FBRyxDQUFBQyxlQUFlLFNBQWYsSUFBQUEsZUFBZSxXQUFmLFlBQUFBLGVBQWUsQ0FBRUcsS0FBakIsSUFBeUIsSUFBekIsR0FBZ0MsS0FBMUQ7QUFDQSxLQUxTLENBTVY7OztBQUNBLFFBQ0U3RixNQUFNLElBQ05BLE1BQU0sQ0FBQzhGLGNBRFAsS0FFQywwQkFBQTlGLE1BQU0sQ0FBQzhGLGNBQVAsZ0ZBQXVCQyxrQkFBdkIsTUFBOEMsS0FBOUMsSUFBdUQsMkJBQUEvRixNQUFNLENBQUM4RixjQUFQLGtGQUF1QnhDLGdCQUF2QixNQUE0QyxJQUZwRyxDQUFELElBR0EsQ0FBQ21DLHVCQUpGLEVBS0U7QUFDRCxhQUFPLEtBQVA7QUFDQTs7QUFDRCxXQUFPLElBQVA7QUFDQTs7OztBQUVNLFdBQVNuQyxnQkFBVCxDQUEwQnRELE1BQTFCLEVBQTJEO0FBQUE7O0FBQ2pFLFdBQU8sQ0FBQUEsTUFBTSxTQUFOLElBQUFBLE1BQU0sV0FBTixzQ0FBQUEsTUFBTSxDQUFFOEYsY0FBUixrRkFBd0J4QyxnQkFBeEIsTUFBNkMsSUFBcEQ7QUFDQSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBBY3Rpb25UeXBlLCBNYW5pZmVzdEFjdGlvbiwgTmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvbiwgTWFuaWZlc3RUYWJsZUNvbHVtbiB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL01hbmlmZXN0U2V0dGluZ3NcIjtcbmltcG9ydCB7IENvbmZpZ3VyYWJsZU9iamVjdCwgQ3VzdG9tRWxlbWVudCwgUGxhY2VtZW50IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Db25maWd1cmFibGVPYmplY3RcIjtcbmltcG9ydCB7IEN1c3RvbUFjdGlvbklEIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9JRFwiO1xuaW1wb3J0IHsgcmVwbGFjZVNwZWNpYWxDaGFycyB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5pbXBvcnQge1xuXHRhbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0YmluZGluZ0V4cHJlc3Npb24sXG5cdEJpbmRpbmdFeHByZXNzaW9uLFxuXHRjb21waWxlQmluZGluZyxcblx0b3IsXG5cdGZvcm1hdFJlc3VsdCxcblx0aXNDb25zdGFudCxcblx0cmVzb2x2ZUJpbmRpbmdTdHJpbmcsXG5cdGVxdWFsLFxuXHRpZkVsc2UsXG5cdGFuZCxcblx0Z3JlYXRlck9yRXF1YWxcbn0gZnJvbSBcInNhcC9mZS9jb3JlL2hlbHBlcnMvQmluZGluZ0V4cHJlc3Npb25cIjtcbmltcG9ydCBmcG1Gb3JtYXR0ZXIgZnJvbSBcInNhcC9mZS9jb3JlL2Zvcm1hdHRlcnMvRlBNRm9ybWF0dGVyXCI7XG5pbXBvcnQgQ29udmVydGVyQ29udGV4dCBmcm9tIFwiLi4vLi4vQ29udmVydGVyQ29udGV4dFwiO1xuXG5leHBvcnQgZW51bSBCdXR0b25UeXBlIHtcblx0QWNjZXB0ID0gXCJBY2NlcHRcIixcblx0QXR0ZW50aW9uID0gXCJBdHRlbnRpb25cIixcblx0QmFjayA9IFwiQmFja1wiLFxuXHRDcml0aWNhbCA9IFwiQ3JpdGljYWxcIixcblx0RGVmYXVsdCA9IFwiRGVmYXVsdFwiLFxuXHRFbXBoYXNpemVkID0gXCJFbXBoYXNpemVkXCIsXG5cdEdob3N0ID0gXCJHaG9zdFwiLFxuXHROZWdhdGl2ZSA9IFwiTmVnYXRpdmVcIixcblx0TmV1dHJhbCA9IFwiTmV1dHJhbFwiLFxuXHRSZWplY3QgPSBcIlJlamVjdFwiLFxuXHRTdWNjZXNzID0gXCJTdWNjZXNzXCIsXG5cdFRyYW5zcGFyZW50ID0gXCJUcmFuc3BhcmVudFwiLFxuXHRVbnN0eWxlZCA9IFwiVW5zdHlsZWRcIixcblx0VXAgPSBcIlVwXCJcbn1cblxuZXhwb3J0IHR5cGUgQmFzZUFjdGlvbiA9IENvbmZpZ3VyYWJsZU9iamVjdCAmIHtcblx0aWQ/OiBzdHJpbmc7XG5cdHRleHQ/OiBzdHJpbmc7XG5cdHR5cGU6IEFjdGlvblR5cGU7XG5cdHByZXNzPzogc3RyaW5nO1xuXHRlbmFibGVkPzogQmluZGluZ0V4cHJlc3Npb248Ym9vbGVhbj47XG5cdHZpc2libGU/OiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0ZW5hYmxlT25TZWxlY3Q/OiBzdHJpbmc7XG5cdGRlZmF1bHRWYWx1ZXNFeHRlbnNpb25GdW5jdGlvbj86IHN0cmluZztcblx0aXNOYXZpZ2FibGU/OiBib29sZWFuO1xuXHRlbmFibGVBdXRvU2Nyb2xsPzogYm9vbGVhbjtcblx0cmVxdWlyZXNEaWFsb2c/OiBzdHJpbmc7XG5cdGJpbmRpbmc/OiBzdHJpbmc7XG5cdGJ1dHRvblR5cGU/OiBCdXR0b25UeXBlLkdob3N0IHwgQnV0dG9uVHlwZS5UcmFuc3BhcmVudCB8IHN0cmluZztcblx0cGFyZW50RW50aXR5RGVsZXRlRW5hYmxlZD86IEJpbmRpbmdFeHByZXNzaW9uPGJvb2xlYW4+O1xuXHRtZW51PzogKHN0cmluZyB8IEN1c3RvbUFjdGlvbiB8IEJhc2VBY3Rpb24pW107XG59O1xuXG5leHBvcnQgdHlwZSBBbm5vdGF0aW9uQWN0aW9uID0gQmFzZUFjdGlvbiAmIHtcblx0dHlwZTogQWN0aW9uVHlwZS5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24gfCBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckFjdGlvbjtcblx0YW5ub3RhdGlvblBhdGg6IHN0cmluZztcblx0aWQ/OiBzdHJpbmc7XG5cdGN1c3RvbURhdGE/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIERlZmluaXRpb24gZm9yIGN1c3RvbSBhY3Rpb25zXG4gKlxuICogQHR5cGVkZWYgQ3VzdG9tQWN0aW9uXG4gKi9cbmV4cG9ydCB0eXBlIEN1c3RvbUFjdGlvbiA9IEN1c3RvbUVsZW1lbnQ8XG5cdEJhc2VBY3Rpb24gJiB7XG5cdFx0dHlwZTogQWN0aW9uVHlwZS5EZWZhdWx0IHwgQWN0aW9uVHlwZS5NZW51O1xuXHRcdGhhbmRsZXJNZXRob2Q/OiBzdHJpbmc7XG5cdFx0aGFuZGxlck1vZHVsZT86IHN0cmluZztcblx0XHRtZW51PzogKHN0cmluZyB8IEN1c3RvbUFjdGlvbiB8IEJhc2VBY3Rpb24pW107XG5cdFx0bm9XcmFwPzogYm9vbGVhbjsgLy8gSW5kaWNhdGVzIHRoYXQgd2Ugd2FudCB0byBhdm9pZCB0aGUgd3JhcHBpbmcgZnJvbSB0aGUgRlBNSGVscGVyXG5cdFx0cmVxdWlyZXNTZWxlY3Rpb24/OiBib29sZWFuO1xuXHR9XG4+O1xuXG4vLyBSZXVzZSBvZiBDb25maWd1cmFibGVPYmplY3QgYW5kIEN1c3RvbUVsZW1lbnQgaXMgZG9uZSBmb3Igb3JkZXJpbmdcbmV4cG9ydCB0eXBlIENvbnZlcnRlckFjdGlvbiA9IEFubm90YXRpb25BY3Rpb24gfCBDdXN0b21BY3Rpb247XG5cbi8qKlxuICogQ3JlYXRlcyB0aGUgbWVudSBhY3Rpb24gZnJvbSBtYW5pZmVzdCBhY3Rpb25zLlxuICogQHBhcmFtIHtSZWNvcmQ8c3RyaW5nLCBDdXN0b21BY3Rpb24+fSBhY3Rpb25zIFRoZSBtYW5pZmVzdCBkZWZpbml0aW9uXG4gKiBAcGFyYW0ge0Jhc2VBY3Rpb25bXX0gYUFubm90YXRpb25BY3Rpb25zIFRoZSBhbm5vdGF0aW9uIGFjdGlvbnMgZGVmaW5pdGlvblxuICogQHBhcmFtIGFIaWRkZW5IZWFkZXJBY3Rpb25zXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPn0gVGhlIGFjdGlvbnMgZnJvbSB0aGUgbWFuaWZlc3QgYW5kIHRoZSBtZW51IG9wdGlvbiB0aGF0IHdlcmUgYWRkZWRcbiAqL1xuZnVuY3Rpb24gcHJlcGFyZU1lbnVBY3Rpb24oXG5cdGFjdGlvbnM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUFjdGlvbj4sXG5cdGFBbm5vdGF0aW9uQWN0aW9uczogQmFzZUFjdGlvbltdLFxuXHRhSGlkZGVuSGVhZGVyQWN0aW9uczogQmFzZUFjdGlvbltdXG4pOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21BY3Rpb24+IHtcblx0Y29uc3QgYWxsQWN0aW9uczogUmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPiA9IHt9O1xuXHRsZXQgbWVudUl0ZW1LZXlzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZCA9IFtdO1xuXG5cdGZvciAoY29uc3QgYWN0aW9uS2V5IGluIGFjdGlvbnMpIHtcblx0XHRjb25zdCBtYW5pZmVzdEFjdGlvbjogQ3VzdG9tQWN0aW9uID0gYWN0aW9uc1thY3Rpb25LZXldO1xuXHRcdGlmIChtYW5pZmVzdEFjdGlvbi50eXBlID09PSBBY3Rpb25UeXBlLk1lbnUpIHtcblx0XHRcdGNvbnN0IG1lbnVJdGVtczogKEN1c3RvbUFjdGlvbiB8IEJhc2VBY3Rpb24pW10gPSBbXTtcblx0XHRcdGxldCBtZW51VmlzaWJsZTogYW55ID0gZmFsc2U7XG5cdFx0XHRsZXQgX21lbnVJdGVtS2V5cyA9XG5cdFx0XHRcdG1hbmlmZXN0QWN0aW9uLm1lbnU/Lm1hcCgobWVudUtleTogc3RyaW5nIHwgQ3VzdG9tQWN0aW9uKSA9PiB7XG5cdFx0XHRcdFx0bGV0IGFjdGlvbjogQmFzZUFjdGlvbiB8IEN1c3RvbUFjdGlvbiB8IHVuZGVmaW5lZCA9IGFBbm5vdGF0aW9uQWN0aW9ucy5maW5kKFxuXHRcdFx0XHRcdFx0KGFjdGlvbjogQmFzZUFjdGlvbikgPT4gYWN0aW9uLmtleSA9PT0gbWVudUtleVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKCFhY3Rpb24pIHtcblx0XHRcdFx0XHRcdGFjdGlvbiA9IGFjdGlvbnNbbWVudUtleSBhcyBzdHJpbmddO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdChhY3Rpb24/LnZpc2libGUgfHxcblx0XHRcdFx0XHRcdFx0YWN0aW9uPy50eXBlID09PSBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckFjdGlvbiB8fFxuXHRcdFx0XHRcdFx0XHRhY3Rpb24/LnR5cGUgPT09IEFjdGlvblR5cGUuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uKSAmJlxuXHRcdFx0XHRcdFx0IWFIaWRkZW5IZWFkZXJBY3Rpb25zLmZpbmQoaGlkZGVuQWN0aW9uID0+IGhpZGRlbkFjdGlvbi5rZXkgPT09IG1lbnVLZXkpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRtZW51VmlzaWJsZSA9IGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRcdFx0XHRvcihyZXNvbHZlQmluZGluZ1N0cmluZygoYWN0aW9uIGFzIGFueSkudmlzaWJsZSwgXCJib29sZWFuXCIpLCByZXNvbHZlQmluZGluZ1N0cmluZyhtZW51VmlzaWJsZSwgXCJib29sZWFuXCIpKVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdG1lbnVJdGVtcy5wdXNoKGFjdGlvbik7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0cmV0dXJuIG1lbnVLZXkgYXMgc3RyaW5nO1xuXHRcdFx0XHR9KSA/PyBbXTtcblxuXHRcdFx0Ly8gU2hvdyBtZW51IGJ1dHRvbiBpZiBpdCBoYXMgb25lIG9yIG1vcmUgdGhlbiAxIGl0ZW1zIHZpc2libGVcblx0XHRcdGlmIChtZW51SXRlbXMubGVuZ3RoKSB7XG5cdFx0XHRcdG1hbmlmZXN0QWN0aW9uLnZpc2libGUgPSBtZW51VmlzaWJsZTtcblx0XHRcdFx0bWFuaWZlc3RBY3Rpb24ubWVudSA9IG1lbnVJdGVtcztcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF9tZW51SXRlbUtleXMgPSBbYWN0aW9uS2V5XTtcblx0XHRcdH1cblxuXHRcdFx0bWVudUl0ZW1LZXlzID0gWy4uLm1lbnVJdGVtS2V5cywgLi4uX21lbnVJdGVtS2V5c107XG5cdFx0fVxuXHRcdGlmIChhSGlkZGVuSGVhZGVyQWN0aW9ucy5maW5kKGhpZGRlbkFjdGlvbiA9PiBoaWRkZW5BY3Rpb24ua2V5ID09PSBhY3Rpb25LZXkpKSB7XG5cdFx0XHRtYW5pZmVzdEFjdGlvbi52aXNpYmxlID0gZmFsc2U7XG5cdFx0fVxuXHRcdGFsbEFjdGlvbnNbYWN0aW9uS2V5XSA9IG1hbmlmZXN0QWN0aW9uO1xuXHR9XG5cblx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVudXNlZC1leHByZXNzaW9uc1xuXHRtZW51SXRlbUtleXM/LmZvckVhY2goKGFjdGlvbktleTogc3RyaW5nKSA9PiBkZWxldGUgYWxsQWN0aW9uc1thY3Rpb25LZXldKTtcblx0cmV0dXJuIGFsbEFjdGlvbnM7XG59XG5cbmV4cG9ydCBjb25zdCByZW1vdmVEdXBsaWNhdGVBY3Rpb25zID0gKGFjdGlvbnM6IEJhc2VBY3Rpb25bXSk6IEJhc2VBY3Rpb25bXSA9PiB7XG5cdGNvbnN0IG9NZW51SXRlbUtleXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcblx0YWN0aW9ucy5mb3JFYWNoKGFjdGlvbiA9PiB7XG5cdFx0aWYgKGFjdGlvbj8ubWVudT8ubGVuZ3RoKSB7XG5cdFx0XHRhY3Rpb24ubWVudS5yZWR1Y2UoKGl0ZW0sIHsga2V5IH06IGFueSkgPT4ge1xuXHRcdFx0XHRpZiAoa2V5ICYmICFpdGVtW2tleV0pIHtcblx0XHRcdFx0XHRpdGVtW2tleV0gPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdHJldHVybiBpdGVtO1xuXHRcdFx0fSwgb01lbnVJdGVtS2V5cyk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIGFjdGlvbnMuZmlsdGVyKGFjdGlvbiA9PiAhb01lbnVJdGVtS2V5c1thY3Rpb24ua2V5XSk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBhbiBhY3Rpb24gZGVmYXVsdCB2YWx1ZSBiYXNlZCBvbiBpdHMga2luZC5cbiAqXG4gKiBEZWZhdWx0IHByb3BlcnR5IHZhbHVlIGZvciBjdXN0b20gYWN0aW9ucyBpZiBub3Qgb3ZlcndyaXR0ZW4gaW4gbWFuaWZlc3QuXG4gKiBAcGFyYW0ge01hbmlmZXN0QWN0aW9ufSBtYW5pZmVzdEFjdGlvbiBUaGUgYWN0aW9uIGNvbmZpZ3VyZWQgaW4gdGhlIG1hbmlmZXN0XG4gKiBAcGFyYW0ge2Jvb2xlYW59IGlzQW5ub3RhdGlvbkFjdGlvbiBXaGV0aGVyIHRoZSBhY3Rpb24sIGRlZmluZWQgaW4gbWFuaWZlc3QsIGNvcnJlc3BvbmRzIHRvIGFuIGV4aXN0aW5nIGFubm90YXRpb24gYWN0aW9uLlxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBpbnN0YW5jZSBvZiB0aGUgY29udmVydGVyIGNvbnRleHRcbiAqIEByZXR1cm5zIHtCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHwgc3RyaW5nIHwgYm9vbGVhbn0gRGV0ZXJtaW5lZCBwcm9wZXJ0eSB2YWx1ZSBmb3IgdGhlIGNvbHVtblxuICovXG5jb25zdCBfZ2V0TWFuaWZlc3RFbmFibGVkID0gZnVuY3Rpb24oXG5cdG1hbmlmZXN0QWN0aW9uOiBNYW5pZmVzdEFjdGlvbixcblx0aXNBbm5vdGF0aW9uQWN0aW9uOiBib29sZWFuLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHwgc3RyaW5nIHwgYm9vbGVhbiB7XG5cdGlmIChpc0Fubm90YXRpb25BY3Rpb24gJiYgbWFuaWZlc3RBY3Rpb24uZW5hYmxlZCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0Ly8gSWYgYW5ub3RhdGlvbiBhY3Rpb24gaGFzIG5vIHByb3BlcnR5IGRlZmluZWQgaW4gbWFuaWZlc3QsXG5cdFx0Ly8gZG8gbm90IG92ZXJ3cml0ZSBpdCB3aXRoIG1hbmlmZXN0IGFjdGlvbidzIGRlZmF1bHQgdmFsdWUuXG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXHQvLyBSZXR1cm4gd2hhdCBpcyBkZWZpbmVkIGluIG1hbmlmZXN0LlxuXHRyZXR1cm4gZ2V0TWFuaWZlc3RBY3Rpb25FbmFibGVtZW50KG1hbmlmZXN0QWN0aW9uLCBjb252ZXJ0ZXJDb250ZXh0KTtcbn07XG5cbi8qKlxuICogQ3JlYXRlIHRoZSBhY3Rpb24gY29uZmlndXJhdGlvbiBiYXNlZCBvbiB0aGUgbWFuaWZlc3Qgc2V0dGluZ3MuXG4gKiBAcGFyYW0ge1JlY29yZDxzdHJpbmcsIE1hbmlmZXN0QWN0aW9uPiB8IHVuZGVmaW5lZH0gbWFuaWZlc3RBY3Rpb25zIFRoZSBtYW5pZmVzdFxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHRcbiAqIEBwYXJhbSB7QmFzZUFjdGlvbltdfSBhQW5ub3RhdGlvbkFjdGlvbnMgVGhlIGFubm90YXRpb24gYWN0aW9ucyBkZWZpbml0aW9uXG4gKiBAcGFyYW0ge05hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb259IG5hdmlnYXRpb25TZXR0aW5nc1xuICogQHBhcmFtIHtib29sZWFufSBjb25zaWRlck5hdmlnYXRpb25TZXR0aW5nc1xuICogQHBhcmFtIHtCYXNlQWN0aW9uW119IGFIaWRkZW5IZWFkZXJBY3Rpb25zXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPn0gVGhlIGFjdGlvbnMgZnJvbSB0aGUgbWFuaWZlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFjdGlvbnNGcm9tTWFuaWZlc3QoXG5cdG1hbmlmZXN0QWN0aW9uczogUmVjb3JkPHN0cmluZywgTWFuaWZlc3RBY3Rpb24+IHwgdW5kZWZpbmVkLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRhQW5ub3RhdGlvbkFjdGlvbnM/OiBCYXNlQWN0aW9uW10sXG5cdG5hdmlnYXRpb25TZXR0aW5ncz86IE5hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb24sXG5cdGNvbnNpZGVyTmF2aWdhdGlvblNldHRpbmdzPzogYm9vbGVhbixcblx0YUhpZGRlbkhlYWRlckFjdGlvbnM/OiBCYXNlQWN0aW9uW11cbik6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUFjdGlvbj4ge1xuXHRjb25zdCBhY3Rpb25zOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21BY3Rpb24+ID0ge307XG5cdGZvciAoY29uc3QgYWN0aW9uS2V5IGluIG1hbmlmZXN0QWN0aW9ucykge1xuXHRcdGNvbnN0IG1hbmlmZXN0QWN0aW9uOiBNYW5pZmVzdEFjdGlvbiA9IG1hbmlmZXN0QWN0aW9uc1thY3Rpb25LZXldO1xuXHRcdGNvbnN0IGxhc3REb3RJbmRleCA9IG1hbmlmZXN0QWN0aW9uLnByZXNzPy5sYXN0SW5kZXhPZihcIi5cIikgfHwgLTE7XG5cblx0XHQvLyBUbyBpZGVudGlmeSB0aGUgYW5ub3RhdGlvbiBhY3Rpb24gcHJvcGVydHkgb3ZlcndyaXRlIHZpYSBtYW5pZmVzdCB1c2UtY2FzZS5cblx0XHRjb25zdCBpc0Fubm90YXRpb25BY3Rpb24gPSBhQW5ub3RhdGlvbkFjdGlvbnM/LnNvbWUoYWN0aW9uID0+IGFjdGlvbi5rZXkgPT09IGFjdGlvbktleSkgfHwgZmFsc2U7XG5cblx0XHRhY3Rpb25zW2FjdGlvbktleV0gPSB7XG5cdFx0XHRpZDogYUFubm90YXRpb25BY3Rpb25zPy5zb21lKGFjdGlvbiA9PiBhY3Rpb24ua2V5ID09PSBhY3Rpb25LZXkpID8gYWN0aW9uS2V5IDogQ3VzdG9tQWN0aW9uSUQoYWN0aW9uS2V5KSxcblx0XHRcdHZpc2libGU6IG1hbmlmZXN0QWN0aW9uLnZpc2libGUgPT09IHVuZGVmaW5lZCA/IFwidHJ1ZVwiIDogbWFuaWZlc3RBY3Rpb24udmlzaWJsZSxcblx0XHRcdGVuYWJsZWQ6IF9nZXRNYW5pZmVzdEVuYWJsZWQobWFuaWZlc3RBY3Rpb24sIGlzQW5ub3RhdGlvbkFjdGlvbiwgY29udmVydGVyQ29udGV4dCksXG5cdFx0XHRoYW5kbGVyTW9kdWxlOiBtYW5pZmVzdEFjdGlvbi5wcmVzcyAmJiBtYW5pZmVzdEFjdGlvbi5wcmVzcy5zdWJzdHJpbmcoMCwgbGFzdERvdEluZGV4KS5yZXBsYWNlKC9cXC4vZ2ksIFwiL1wiKSxcblx0XHRcdGhhbmRsZXJNZXRob2Q6IG1hbmlmZXN0QWN0aW9uLnByZXNzICYmIG1hbmlmZXN0QWN0aW9uLnByZXNzLnN1YnN0cmluZyhsYXN0RG90SW5kZXggKyAxKSxcblx0XHRcdHByZXNzOiBtYW5pZmVzdEFjdGlvbi5wcmVzcyxcblx0XHRcdHR5cGU6IG1hbmlmZXN0QWN0aW9uLm1lbnUgPyBBY3Rpb25UeXBlLk1lbnUgOiBBY3Rpb25UeXBlLkRlZmF1bHQsXG5cdFx0XHR0ZXh0OiBtYW5pZmVzdEFjdGlvbi50ZXh0LFxuXHRcdFx0bm9XcmFwOiBtYW5pZmVzdEFjdGlvbi5fX25vV3JhcCxcblx0XHRcdGtleTogcmVwbGFjZVNwZWNpYWxDaGFycyhhY3Rpb25LZXkpLFxuXHRcdFx0ZW5hYmxlT25TZWxlY3Q6IG1hbmlmZXN0QWN0aW9uLmVuYWJsZU9uU2VsZWN0LFxuXHRcdFx0ZGVmYXVsdFZhbHVlc0V4dGVuc2lvbkZ1bmN0aW9uOiBtYW5pZmVzdEFjdGlvbi5kZWZhdWx0VmFsdWVzRnVuY3Rpb24sXG5cdFx0XHRwb3NpdGlvbjoge1xuXHRcdFx0XHRhbmNob3I6IG1hbmlmZXN0QWN0aW9uLnBvc2l0aW9uPy5hbmNob3IsXG5cdFx0XHRcdHBsYWNlbWVudDogbWFuaWZlc3RBY3Rpb24ucG9zaXRpb24gPT09IHVuZGVmaW5lZCA/IFBsYWNlbWVudC5BZnRlciA6IG1hbmlmZXN0QWN0aW9uLnBvc2l0aW9uLnBsYWNlbWVudFxuXHRcdFx0fSxcblx0XHRcdGlzTmF2aWdhYmxlOiBpc0FjdGlvbk5hdmlnYWJsZShtYW5pZmVzdEFjdGlvbiwgbmF2aWdhdGlvblNldHRpbmdzLCBjb25zaWRlck5hdmlnYXRpb25TZXR0aW5ncyksXG5cdFx0XHRyZXF1aXJlc1NlbGVjdGlvbjogbWFuaWZlc3RBY3Rpb24ucmVxdWlyZXNTZWxlY3Rpb24gPT09IHVuZGVmaW5lZCA/IGZhbHNlIDogbWFuaWZlc3RBY3Rpb24ucmVxdWlyZXNTZWxlY3Rpb24sXG5cdFx0XHRlbmFibGVBdXRvU2Nyb2xsOiBlbmFibGVBdXRvU2Nyb2xsKG1hbmlmZXN0QWN0aW9uKSxcblx0XHRcdG1lbnU6IG1hbmlmZXN0QWN0aW9uLm1lbnUgPz8gW11cblx0XHR9O1xuXHR9XG5cdHJldHVybiBwcmVwYXJlTWVudUFjdGlvbihhY3Rpb25zLCBhQW5ub3RhdGlvbkFjdGlvbnMgPz8gW10sIGFIaWRkZW5IZWFkZXJBY3Rpb25zID8/IFtdKTtcbn1cblxuZnVuY3Rpb24gZ2V0TWFuaWZlc3RBY3Rpb25FbmFibGVtZW50KG1hbmlmZXN0QWN0aW9uOiBNYW5pZmVzdEFjdGlvbiwgY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCkge1xuXHRjb25zdCByZXNvbHZlZEJpbmRpbmcgPSByZXNvbHZlQmluZGluZ1N0cmluZyhtYW5pZmVzdEFjdGlvbi5lbmFibGVkIGFzIHN0cmluZywgXCJib29sZWFuXCIpO1xuXHRsZXQgcmVzdWx0OiBhbnk7XG5cdGlmIChpc0NvbnN0YW50KHJlc29sdmVkQmluZGluZykgJiYgcmVzb2x2ZWRCaW5kaW5nLnZhbHVlID09PSB1bmRlZmluZWQpIHtcblx0XHQvLyBObyBlbmFibGVkIHByb3BlcnR5IGNvbmZpZ3VyZWQgaW4gbWFuaWZlc3QgZm9yIHRoZSBjdXN0b20gYWN0aW9uIC0tPiBlbmFibGUgY3VzdG9tIGFjdGlvblxuXHRcdHJlc3VsdCA9IHRydWU7XG5cdH0gZWxzZSBpZiAoaXNDb25zdGFudChyZXNvbHZlZEJpbmRpbmcpICYmIHR5cGVvZiByZXNvbHZlZEJpbmRpbmcudmFsdWUgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0Ly8gdHJ1ZSAvIGZhbHNlXG5cdFx0cmVzdWx0ID0gcmVzb2x2ZWRCaW5kaW5nLnZhbHVlO1xuXHR9IGVsc2UgaWYgKHJlc29sdmVkQmluZGluZy5fdHlwZSAhPT0gXCJFbWJlZGRlZEJpbmRpbmdcIiAmJiByZXNvbHZlZEJpbmRpbmcuX3R5cGUgIT09IFwiRW1iZWRkZWRFeHByZXNzaW9uQmluZGluZ1wiKSB7XG5cdFx0Ly8gVGhlbiBpdCdzIGEgbW9kdWxlLW1ldGhvZCByZWZlcmVuY2UgXCJzYXAueHh4Lnl5eS5kb1NvbWV0aGluZ1wiXG5cdFx0Y29uc3QgbWV0aG9kUGF0aCA9IHJlc29sdmVkQmluZGluZy52YWx1ZSBhcyBzdHJpbmc7XG5cdFx0cmVzdWx0ID0gZm9ybWF0UmVzdWx0KFxuXHRcdFx0W2JpbmRpbmdFeHByZXNzaW9uKFwiL1wiLCBcIiR2aWV3XCIpLCBtZXRob2RQYXRoLCBiaW5kaW5nRXhwcmVzc2lvbihcInNlbGVjdGVkQ29udGV4dHNcIiwgXCJpbnRlcm5hbFwiKV0sXG5cdFx0XHRmcG1Gb3JtYXR0ZXIuY3VzdG9tSXNFbmFibGVkQ2hlY2sgYXMgYW55LFxuXHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKClcblx0XHQpO1xuXHR9IGVsc2Uge1xuXHRcdC8vIHRoZW4gaXQncyBhIGJpbmRpbmdcblx0XHRyZXN1bHQgPSByZXNvbHZlZEJpbmRpbmc7XG5cdH1cblxuXHQvLyBDb25zaWRlciByZXF1aXJlc1NlbGVjdGlvbiBwcm9wZXJ0eSB0byBpbmNsdWRlIHNlbGVjdGVkQ29udGV4dHMgaW4gdGhlIGJpbmRpbmcgZXhwcmVzc2lvblxuXHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoXG5cdFx0aWZFbHNlKFxuXHRcdFx0bWFuaWZlc3RBY3Rpb24ucmVxdWlyZXNTZWxlY3Rpb24gPT09IHRydWUsXG5cdFx0XHRhbmQoZ3JlYXRlck9yRXF1YWwoYmluZGluZ0V4cHJlc3Npb24oXCJudW1iZXJPZlNlbGVjdGVkQ29udGV4dHNcIiwgXCJpbnRlcm5hbFwiKSwgMSksIHJlc3VsdCksXG5cdFx0XHRyZXN1bHRcblx0XHQpXG5cdCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbmFibGVkQmluZGluZyhhY3Rpb25EZWZpbml0aW9uOiBBY3Rpb24gfCB1bmRlZmluZWQpOiBzdHJpbmcge1xuXHRpZiAoIWFjdGlvbkRlZmluaXRpb24pIHtcblx0XHRyZXR1cm4gXCJ0cnVlXCI7XG5cdH1cblx0aWYgKCFhY3Rpb25EZWZpbml0aW9uLmlzQm91bmQpIHtcblx0XHRyZXR1cm4gXCJ0cnVlXCI7XG5cdH1cblx0Y29uc3Qgb3BlcmF0aW9uQXZhaWxhYmxlID0gYWN0aW9uRGVmaW5pdGlvbi5hbm5vdGF0aW9ucz8uQ29yZT8uT3BlcmF0aW9uQXZhaWxhYmxlO1xuXHRpZiAob3BlcmF0aW9uQXZhaWxhYmxlKSB7XG5cdFx0bGV0IGJpbmRpbmdFeHByZXNzaW9uID0gY29tcGlsZUJpbmRpbmcoZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24ob3BlcmF0aW9uQXZhaWxhYmxlLnZhbHVlT2YoKSksIHRydWUpKTtcblx0XHRpZiAoYmluZGluZ0V4cHJlc3Npb24pIHtcblx0XHRcdC8qKlxuXHRcdFx0ICogU2luY2UgdGhlIGFjdGlvbiBpcyBib3VuZCwgYWxsIHRoZSBhbm5vdGF0aW9uIHRoYXQgZXZhbHVhdGVzIHBhdGggZXhwcmVzc2lvbiBhcmUgZG9pbmcgc28gd2hpbGUgaW5jbHVkaW5nIHRoZSBlbnRpdHlzZXQgYmluZGluZyBwYXJhbWV0ZXIgbmFtZSAoc2VsZi54eHggb3IgX2l0Lnh4eCkuXG5cdFx0XHQgKiBIb3dldmVyIGluIHRoZSBVSSB3ZSBhcmUgdXN1YWxseSBhbHJlYWR5IGJvdW5kIHRvIHRoZSBlbnRpdHlzZXQgdGhhdCB0aGlzIGFjdGlvbiByZWZlcnMgdG8gYW5kIGFzIHN1Y2ggd2UganVzdCBuZWVkIHRvIGlnbm9yZSB0aGF0IHBhcnQuXG5cdFx0XHQgKiBUaGUgZm9sbG93aW5nIGNvZGUgZG9lcyB0aGF0IGZvciB1cy5cblx0XHRcdCAqIE5CIDogVGhpcyBpcyBvbGQgY29kZSBhbmQgdGhlcmUgYXJlIG5pY2VyIHdheSB0byBkbyBpdCBub3cgYnV0IEkgd29uJ3QgZ2V0IG92ZXIgdGhlbSBmb3Igbm93LlxuXHRcdFx0ICoqL1xuXHRcdFx0bGV0IHBhcmFtU3VmZml4ID0gYWN0aW9uRGVmaW5pdGlvbi5wYXJhbWV0ZXJzPy5bMF0/LmZ1bGx5UXVhbGlmaWVkTmFtZTtcblx0XHRcdGlmIChwYXJhbVN1ZmZpeCkge1xuXHRcdFx0XHRwYXJhbVN1ZmZpeCA9IHBhcmFtU3VmZml4LnJlcGxhY2UoYWN0aW9uRGVmaW5pdGlvbi5mdWxseVF1YWxpZmllZE5hbWUgKyBcIi9cIiwgXCJcIik7XG5cdFx0XHRcdGJpbmRpbmdFeHByZXNzaW9uID0gYmluZGluZ0V4cHJlc3Npb24ucmVwbGFjZShwYXJhbVN1ZmZpeCArIFwiL1wiLCBcIlwiKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBiaW5kaW5nRXhwcmVzc2lvbjtcblx0XHR9XG5cdFx0cmV0dXJuIFwidHJ1ZVwiO1xuXHR9XG5cdHJldHVybiBcInRydWVcIjtcblx0Lypcblx0ICAgRklYTUUgRGlzYWJsZSBmYWlsaW5nIG11c2ljIHRlc3RzXG5cdFx0Q3VycmVudGx5IG9uIENBUCB0aGUgZm9sbG93aW5nIGJpbmRpbmcgKHdoaWNoIGlzIHRoZSBnb29kIG9uZSkgZ2VuZXJhdGVzIGVycm9yOlxuXHRcdFx0XHQgICByZXR1cm4gXCJ7PSAhJHsjXCIgKyBmaWVsZC5BY3Rpb24gKyBcIn0gPyBmYWxzZSA6IHRydWUgfVwiO1xuXHRcdENBUCB0cmllcyB0byByZWFkIHRoZSBhY3Rpb24gYXMgcHJvcGVydHkgYW5kIGRvZXNuJ3QgZmluZCBpdFxuXHQqL1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2VtYW50aWNPYmplY3RNYXBwaW5nKGFNYXBwaW5nczogYW55W10pOiBhbnlbXSB7XG5cdGNvbnN0IGFTZW1hbnRpY09iamVjdE1hcHBpbmdzOiBhbnlbXSA9IFtdO1xuXHRhTWFwcGluZ3MuZm9yRWFjaChvTWFwcGluZyA9PiB7XG5cdFx0Y29uc3Qgb1NPTWFwcGluZyA9IHtcblx0XHRcdFwiTG9jYWxQcm9wZXJ0eVwiOiB7XG5cdFx0XHRcdFwiJFByb3BlcnR5UGF0aFwiOiBvTWFwcGluZy5Mb2NhbFByb3BlcnR5LnZhbHVlXG5cdFx0XHR9LFxuXHRcdFx0XCJTZW1hbnRpY09iamVjdFByb3BlcnR5XCI6IG9NYXBwaW5nLlNlbWFudGljT2JqZWN0UHJvcGVydHlcblx0XHR9O1xuXHRcdGFTZW1hbnRpY09iamVjdE1hcHBpbmdzLnB1c2gob1NPTWFwcGluZyk7XG5cdH0pO1xuXHRyZXR1cm4gYVNlbWFudGljT2JqZWN0TWFwcGluZ3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0FjdGlvbk5hdmlnYWJsZShcblx0YWN0aW9uOiBNYW5pZmVzdEFjdGlvbiB8IE1hbmlmZXN0VGFibGVDb2x1bW4sXG5cdG5hdmlnYXRpb25TZXR0aW5ncz86IE5hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb24sXG5cdGNvbnNpZGVyTmF2aWdhdGlvblNldHRpbmdzPzogYm9vbGVhblxuKTogYm9vbGVhbiB7XG5cdGxldCBiSXNOYXZpZ2F0aW9uQ29uZmlndXJlZDogYm9vbGVhbiA9IHRydWU7XG5cdGlmIChjb25zaWRlck5hdmlnYXRpb25TZXR0aW5ncykge1xuXHRcdGNvbnN0IGRldGFpbE9yRGlzcGxheSA9IG5hdmlnYXRpb25TZXR0aW5ncyAmJiAobmF2aWdhdGlvblNldHRpbmdzLmRldGFpbCB8fCBuYXZpZ2F0aW9uU2V0dGluZ3MuZGlzcGxheSk7XG5cdFx0YklzTmF2aWdhdGlvbkNvbmZpZ3VyZWQgPSBkZXRhaWxPckRpc3BsYXk/LnJvdXRlID8gdHJ1ZSA6IGZhbHNlO1xuXHR9XG5cdC8vIHdoZW4gZW5hYmxlQXV0b1Njcm9sbCBpcyB0cnVlIHRoZSBuYXZpZ2F0ZVRvSW5zdGFuY2UgZmVhdHVyZSBpcyBkaXNhYmxlZFxuXHRpZiAoXG5cdFx0KGFjdGlvbiAmJlxuXHRcdFx0YWN0aW9uLmFmdGVyRXhlY3V0aW9uICYmXG5cdFx0XHQoYWN0aW9uLmFmdGVyRXhlY3V0aW9uPy5uYXZpZ2F0ZVRvSW5zdGFuY2UgPT09IGZhbHNlIHx8IGFjdGlvbi5hZnRlckV4ZWN1dGlvbj8uZW5hYmxlQXV0b1Njcm9sbCA9PT0gdHJ1ZSkpIHx8XG5cdFx0IWJJc05hdmlnYXRpb25Db25maWd1cmVkXG5cdCkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVuYWJsZUF1dG9TY3JvbGwoYWN0aW9uOiBNYW5pZmVzdEFjdGlvbik6IGJvb2xlYW4ge1xuXHRyZXR1cm4gYWN0aW9uPy5hZnRlckV4ZWN1dGlvbj8uZW5hYmxlQXV0b1Njcm9sbCA9PT0gdHJ1ZTtcbn1cbiJdfQ==