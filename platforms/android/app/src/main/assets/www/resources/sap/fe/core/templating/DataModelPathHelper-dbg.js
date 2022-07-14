/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingExpression", "sap/fe/core/templating/PropertyHelper"], function (BindingExpression, PropertyHelper) {
  "use strict";

  var _exports = {};
  var isPathExpression = PropertyHelper.isPathExpression;
  var isAnnotationPathExpression = PropertyHelper.isAnnotationPathExpression;
  var equal = BindingExpression.equal;
  var constant = BindingExpression.constant;
  var annotationExpression = BindingExpression.annotationExpression;

  var getPathRelativeLocation = function (contextPath) {
    var visitedNavProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    if (!contextPath) {
      return visitedNavProps;
    } else {
      if (visitedNavProps.length >= contextPath.navigationProperties.length) {
        var remainingNavProps = [];
        contextPath.navigationProperties.forEach(function (navProp, navIndex) {
          if (visitedNavProps[navIndex] !== navProp) {
            remainingNavProps.push(visitedNavProps[navIndex]);
          }
        });
        remainingNavProps = remainingNavProps.concat(visitedNavProps.slice(contextPath.navigationProperties.length)); // Clean up NavProp -> Owner

        var currentIdx = 0;

        while (remainingNavProps.length > 1 && currentIdx != remainingNavProps.length - 1) {
          var currentNav = remainingNavProps[currentIdx];
          var nextNavProp = remainingNavProps[currentIdx + 1];

          if (currentNav.partner === nextNavProp.name) {
            remainingNavProps.splice(0, 2);
          } else {
            currentIdx++;
          }
        }

        return remainingNavProps;
      } else {
        var extraNavProp = [];
        visitedNavProps.forEach(function (navProp, navIndex) {
          if (contextPath.navigationProperties[navIndex] !== navProp) {
            extraNavProp.push(visitedNavProps[navIndex]);
          }
        });
        extraNavProp = extraNavProp.concat(contextPath.navigationProperties.slice(visitedNavProps.length)); // Clean up NavProp -> Owner

        var _currentIdx = 0;

        while (extraNavProp.length > 1 && _currentIdx != extraNavProp.length - 1) {
          var _currentNav = extraNavProp[_currentIdx];
          var _nextNavProp = extraNavProp[_currentIdx + 1];

          if (_currentNav.partner === _nextNavProp.name) {
            extraNavProp.splice(0, 2);
          } else {
            _currentIdx++;
          }
        }

        extraNavProp = extraNavProp.map(function (navProp) {
          return navProp.targetType.navigationProperties.find(function (np) {
            return np.name === navProp.partner;
          });
        });
        return extraNavProp;
      }
    }
  };

  _exports.getPathRelativeLocation = getPathRelativeLocation;

  var enhanceDataModelPath = function (dataModelObjectPath, propertyPath) {
    var sPropertyPath = "";

    if ((isPathExpression(propertyPath) || isAnnotationPathExpression(propertyPath)) && propertyPath.path) {
      sPropertyPath = propertyPath.path;
    } else if (typeof propertyPath === "string") {
      sPropertyPath = propertyPath;
    }

    var oTarget;

    if (isPathExpression(propertyPath) || isAnnotationPathExpression(propertyPath)) {
      oTarget = propertyPath.$target;
    } else if (dataModelObjectPath.targetEntityType) {
      oTarget = dataModelObjectPath.targetEntityType.resolvePath(sPropertyPath);
    } else {
      oTarget = dataModelObjectPath.targetObject;
    }

    var aPathSplit = sPropertyPath.split("/");
    var currentEntitySet = dataModelObjectPath.targetEntitySet;
    var currentEntityType = dataModelObjectPath.targetEntityType;
    var navigationProperties = dataModelObjectPath.navigationProperties.concat(); // Process only if we have to go through navigation properties

    aPathSplit.reduce(function (reducedEntityType, pathPart) {
      if (!reducedEntityType) {
        return undefined;
      }

      var potentialNavProp = reducedEntityType.navigationProperties.find(function (navProp) {
        return navProp.name === pathPart;
      });

      if (potentialNavProp) {
        navigationProperties.push(potentialNavProp);
        currentEntityType = potentialNavProp.targetType;

        if (currentEntitySet && currentEntitySet.navigationPropertyBinding.hasOwnProperty(pathPart)) {
          currentEntitySet = currentEntitySet.navigationPropertyBinding[pathPart];
        }

        return currentEntityType;
      }

      return undefined;
    }, dataModelObjectPath.targetEntityType);
    return {
      startingEntitySet: dataModelObjectPath.startingEntitySet,
      navigationProperties: navigationProperties,
      contextLocation: dataModelObjectPath.contextLocation,
      targetEntitySet: currentEntitySet,
      targetEntityType: currentEntityType,
      targetObject: oTarget
    };
  };

  _exports.enhanceDataModelPath = enhanceDataModelPath;

  var getTargetEntitySetPath = function (dataModelObjectPath) {
    var targetEntitySetPath = "/".concat(dataModelObjectPath.startingEntitySet.name);
    var currentEntitySet = dataModelObjectPath.startingEntitySet;
    var navigatedPaths = [];
    dataModelObjectPath.navigationProperties.forEach(function (navProp) {
      navigatedPaths.push(navProp.name);

      if (currentEntitySet && currentEntitySet.navigationPropertyBinding.hasOwnProperty(navigatedPaths.join("/"))) {
        targetEntitySetPath += "/$NavigationPropertyBinding/".concat(navigatedPaths.join("/"), "/$");
        currentEntitySet = currentEntitySet.navigationPropertyBinding[navigatedPaths.join("/")];
        navigatedPaths = [];
      }
    });
    return targetEntitySetPath;
  };

  _exports.getTargetEntitySetPath = getTargetEntitySetPath;

  var getTargetObjectPath = function (dataModelObjectPath) {
    var bRelative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var path = "";

    if (!dataModelObjectPath.startingEntitySet) {
      return "/";
    }

    if (!bRelative) {
      path += "/".concat(dataModelObjectPath.startingEntitySet.name);
    }

    if (dataModelObjectPath.navigationProperties.length > 0) {
      if (path.length > 0) {
        path += "/";
      }

      path += dataModelObjectPath.navigationProperties.map(function (navProp) {
        return navProp.name;
      }).join("/");
    }

    if (dataModelObjectPath.targetObject && dataModelObjectPath.targetObject.name && dataModelObjectPath.targetObject._type !== "NavigationProperty" && dataModelObjectPath.targetObject._type !== "EntityType" && dataModelObjectPath.targetObject !== dataModelObjectPath.startingEntitySet) {
      if (!path.endsWith("/")) {
        path += "/";
      }

      path += "".concat(dataModelObjectPath.targetObject.name);
    } else if (dataModelObjectPath.targetObject && dataModelObjectPath.targetObject.hasOwnProperty("term")) {
      if (path.length > 0 && !path.endsWith("/")) {
        path += "/";
      }

      path += "@".concat(dataModelObjectPath.targetObject.term);
    }

    return path;
  };

  _exports.getTargetObjectPath = getTargetObjectPath;

  var getContextRelativeTargetObjectPath = function (dataModelObjectPath) {
    var forBindingExpression = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var navProperties = getPathRelativeLocation(dataModelObjectPath.contextLocation, dataModelObjectPath.navigationProperties);

    if (forBindingExpression) {
      if (navProperties.find(function (np) {
        return np.isCollection;
      })) {
        return undefined;
      }
    }

    var path = navProperties.map(function (np) {
      return np.name;
    }).join("/");

    if (dataModelObjectPath.targetObject && (dataModelObjectPath.targetObject.name || dataModelObjectPath.targetObject.type === "PropertyPath" && dataModelObjectPath.targetObject.value) && dataModelObjectPath.targetObject._type !== "NavigationProperty" && dataModelObjectPath.targetObject !== dataModelObjectPath.startingEntitySet) {
      if (path.length > 0 && !path.endsWith("/")) {
        path += "/";
      }

      path += dataModelObjectPath.targetObject.type === "PropertyPath" ? "".concat(dataModelObjectPath.targetObject.value) : "".concat(dataModelObjectPath.targetObject.name);
    } else if (dataModelObjectPath.targetObject && dataModelObjectPath.targetObject.hasOwnProperty("term")) {
      if (path.length > 0 && !path.endsWith("/")) {
        path += "/";
      }

      path += "@".concat(dataModelObjectPath.targetObject.term);

      if (dataModelObjectPath.targetObject.hasOwnProperty("qualifier") && !!dataModelObjectPath.targetObject.qualifier) {
        path += "#".concat(dataModelObjectPath.targetObject.qualifier);
      }
    } else if (!dataModelObjectPath.targetObject) {
      return undefined;
    }

    return path;
  };

  _exports.getContextRelativeTargetObjectPath = getContextRelativeTargetObjectPath;

  var isPathUpdatable = function (dataModelObjectPath, propertyPath, bTableCase) {
    return checkOnPath(dataModelObjectPath, function (annotationObject) {
      var _annotationObject$Upd;

      return annotationObject === null || annotationObject === void 0 ? void 0 : (_annotationObject$Upd = annotationObject.UpdateRestrictions) === null || _annotationObject$Upd === void 0 ? void 0 : _annotationObject$Upd.Updatable;
    }, propertyPath, bTableCase);
  };

  _exports.isPathUpdatable = isPathUpdatable;

  var isPathDeletable = function (dataModelObjectPath, propertyPath, bTableCase) {
    return checkOnPath(dataModelObjectPath, function (annotationObject) {
      var _annotationObject$Del;

      return annotationObject === null || annotationObject === void 0 ? void 0 : (_annotationObject$Del = annotationObject.DeleteRestrictions) === null || _annotationObject$Del === void 0 ? void 0 : _annotationObject$Del.Deletable;
    }, propertyPath, bTableCase);
  };

  _exports.isPathDeletable = isPathDeletable;

  var isPathInsertable = function (dataModelObjectPath, propertyPath) {
    return checkOnPath(dataModelObjectPath, function (annotationObject) {
      var _annotationObject$Ins;

      return annotationObject === null || annotationObject === void 0 ? void 0 : (_annotationObject$Ins = annotationObject.InsertRestrictions) === null || _annotationObject$Ins === void 0 ? void 0 : _annotationObject$Ins.Insertable;
    }, propertyPath);
  };

  _exports.isPathInsertable = isPathInsertable;

  var checkFilterExpressionRestrictions = function (dataModelObjectPath, allowedExpression) {
    return checkOnPath(dataModelObjectPath, function (annotationObject) {
      if (annotationObject && "FilterRestrictions" in annotationObject) {
        var _annotationObject$Fil;

        var filterExpressionRestrictions = (annotationObject === null || annotationObject === void 0 ? void 0 : (_annotationObject$Fil = annotationObject.FilterRestrictions) === null || _annotationObject$Fil === void 0 ? void 0 : _annotationObject$Fil.FilterExpressionRestrictions) || [];
        var currentObjectRestriction = filterExpressionRestrictions.find(function (restriction) {
          return restriction.Property.$target === dataModelObjectPath.targetObject;
        });

        if (currentObjectRestriction) {
          var _currentObjectRestric;

          return allowedExpression.indexOf(currentObjectRestriction === null || currentObjectRestriction === void 0 ? void 0 : (_currentObjectRestric = currentObjectRestriction.AllowedExpressions) === null || _currentObjectRestric === void 0 ? void 0 : _currentObjectRestric.toString()) !== -1;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  };

  _exports.checkFilterExpressionRestrictions = checkFilterExpressionRestrictions;

  var checkOnPath = function (dataModelObjectPath, checkFunction, propertyPath, bTableCase) {
    var _targetEntitySet, _targetEntitySet$anno, _restrictionDefinitio;

    if (!dataModelObjectPath || !dataModelObjectPath.startingEntitySet) {
      return constant(true);
    }

    dataModelObjectPath = enhanceDataModelPath(dataModelObjectPath, propertyPath);
    var currentEntitySet = dataModelObjectPath.startingEntitySet;
    var parentEntitySet = null;
    var visitedNavigationPropsName = [];
    var allVisitedNavigationProps = [];
    var targetEntitySet = currentEntitySet;
    var targetEntityType = dataModelObjectPath.targetEntityType;
    var resetVisitedNavProps = false;
    dataModelObjectPath.navigationProperties.forEach(function (navigationProperty) {
      if (resetVisitedNavProps) {
        visitedNavigationPropsName = [];
      }

      visitedNavigationPropsName.push(navigationProperty.name);
      allVisitedNavigationProps.push(navigationProperty);

      if (!navigationProperty.containsTarget) {
        // We should have a navigationPropertyBinding associated with the path so far which can consist of ([ContainmentNavProp]/)*[NavProp]
        var _fullNavigationPath = visitedNavigationPropsName.join("/");

        if (currentEntitySet && currentEntitySet.navigationPropertyBinding.hasOwnProperty(_fullNavigationPath)) {
          parentEntitySet = currentEntitySet;
          currentEntitySet = currentEntitySet.navigationPropertyBinding[_fullNavigationPath];
          targetEntitySet = currentEntitySet; // If we reached a navigation property with a navigationpropertybinding, we need to reset the visited path on the next iteration (if there is one)

          resetVisitedNavProps = true;
        } else {
          // We really should not end up here but at least let's try to avoid incorrect behavior
          parentEntitySet = currentEntitySet;
          currentEntitySet = null;
          resetVisitedNavProps = true;
        }
      } else {
        parentEntitySet = currentEntitySet;
        targetEntitySet = null;
      }
    }); // At this point we have navigated down all the nav prop and we should have
    // The target entityset pointing to either null (in case of containment navprop a last part), or the actual target (non containment as target)
    // The parent entitySet pointing to the previous entityset used in the path
    // VisitedNavigationPath should contain the path up to this property
    // Restrictions should then be evaluated as ParentEntitySet.NavRestrictions[NavpropertyPath] || TargetEntitySet.Restrictions

    var fullNavigationPath = visitedNavigationPropsName.join("/");
    var restrictions, visitedNavProps;

    if (parentEntitySet !== null) {
      var _parentEntitySet$anno, _parentEntitySet$anno2, _parentEntitySet$anno3;

      var _parentEntitySet = parentEntitySet;
      (_parentEntitySet$anno = _parentEntitySet.annotations) === null || _parentEntitySet$anno === void 0 ? void 0 : (_parentEntitySet$anno2 = _parentEntitySet$anno.Capabilities) === null || _parentEntitySet$anno2 === void 0 ? void 0 : (_parentEntitySet$anno3 = _parentEntitySet$anno2.NavigationRestrictions) === null || _parentEntitySet$anno3 === void 0 ? void 0 : _parentEntitySet$anno3.RestrictedProperties.forEach(function (restrictedNavProp) {
        var _restrictedNavProp$Na;

        if (((_restrictedNavProp$Na = restrictedNavProp.NavigationProperty) === null || _restrictedNavProp$Na === void 0 ? void 0 : _restrictedNavProp$Na.type) === "NavigationPropertyPath") {
          var _restrictionDefinition = checkFunction(restrictedNavProp);

          if (fullNavigationPath === restrictedNavProp.NavigationProperty.value && _restrictionDefinition !== undefined) {
            var _dataModelObjectPath;

            var _allVisitedNavigationProps = allVisitedNavigationProps.slice(0, -1);

            if (targetEntitySet !== null) {
              visitedNavProps = _allVisitedNavigationProps;
            } else {
              if (_allVisitedNavigationProps.length === 0) {
                visitedNavProps = allVisitedNavigationProps.slice(0);
              } else {
                visitedNavProps = _allVisitedNavigationProps;
              }
            }

            restrictions = equal(annotationExpression(_restrictionDefinition, getPathRelativeLocation((_dataModelObjectPath = dataModelObjectPath) === null || _dataModelObjectPath === void 0 ? void 0 : _dataModelObjectPath.contextLocation, visitedNavProps).map(function (np) {
              return np.name;
            })), true);
          }
        }
      });
    }

    var targetRestrictions;
    var restrictionDefinition = checkFunction((_targetEntitySet = targetEntitySet) === null || _targetEntitySet === void 0 ? void 0 : (_targetEntitySet$anno = _targetEntitySet.annotations) === null || _targetEntitySet$anno === void 0 ? void 0 : _targetEntitySet$anno.Capabilities);

    if (targetEntitySet === null && restrictionDefinition === undefined) {
      var _targetEntityType$ann;

      restrictionDefinition = checkFunction(targetEntityType === null || targetEntityType === void 0 ? void 0 : (_targetEntityType$ann = targetEntityType.annotations) === null || _targetEntityType$ann === void 0 ? void 0 : _targetEntityType$ann.Capabilities);
    }

    if (restrictionDefinition !== undefined) {
      targetRestrictions = equal(annotationExpression(restrictionDefinition, getPathRelativeLocation(dataModelObjectPath.contextLocation, allVisitedNavigationProps).map(function (np) {
        return np.name;
      })), true);
    } //object page table case in path based scenario's fallback to exisiting approach


    if (bTableCase && !restrictions && ((_restrictionDefinitio = restrictionDefinition) === null || _restrictionDefinitio === void 0 ? void 0 : _restrictionDefinitio.path)) {
      var oResult = {
        "currentEntityRestriction": targetRestrictions
      };
      return oResult;
    }

    return restrictions || targetRestrictions || constant(true);
  };

  _exports.checkOnPath = checkOnPath;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRhdGFNb2RlbFBhdGhIZWxwZXIudHMiXSwibmFtZXMiOlsiZ2V0UGF0aFJlbGF0aXZlTG9jYXRpb24iLCJjb250ZXh0UGF0aCIsInZpc2l0ZWROYXZQcm9wcyIsImxlbmd0aCIsIm5hdmlnYXRpb25Qcm9wZXJ0aWVzIiwicmVtYWluaW5nTmF2UHJvcHMiLCJmb3JFYWNoIiwibmF2UHJvcCIsIm5hdkluZGV4IiwicHVzaCIsImNvbmNhdCIsInNsaWNlIiwiY3VycmVudElkeCIsImN1cnJlbnROYXYiLCJuZXh0TmF2UHJvcCIsInBhcnRuZXIiLCJuYW1lIiwic3BsaWNlIiwiZXh0cmFOYXZQcm9wIiwibWFwIiwidGFyZ2V0VHlwZSIsImZpbmQiLCJucCIsImVuaGFuY2VEYXRhTW9kZWxQYXRoIiwiZGF0YU1vZGVsT2JqZWN0UGF0aCIsInByb3BlcnR5UGF0aCIsInNQcm9wZXJ0eVBhdGgiLCJpc1BhdGhFeHByZXNzaW9uIiwiaXNBbm5vdGF0aW9uUGF0aEV4cHJlc3Npb24iLCJwYXRoIiwib1RhcmdldCIsIiR0YXJnZXQiLCJ0YXJnZXRFbnRpdHlUeXBlIiwicmVzb2x2ZVBhdGgiLCJ0YXJnZXRPYmplY3QiLCJhUGF0aFNwbGl0Iiwic3BsaXQiLCJjdXJyZW50RW50aXR5U2V0IiwidGFyZ2V0RW50aXR5U2V0IiwiY3VycmVudEVudGl0eVR5cGUiLCJyZWR1Y2UiLCJyZWR1Y2VkRW50aXR5VHlwZSIsInBhdGhQYXJ0IiwidW5kZWZpbmVkIiwicG90ZW50aWFsTmF2UHJvcCIsIm5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmciLCJoYXNPd25Qcm9wZXJ0eSIsInN0YXJ0aW5nRW50aXR5U2V0IiwiY29udGV4dExvY2F0aW9uIiwiZ2V0VGFyZ2V0RW50aXR5U2V0UGF0aCIsInRhcmdldEVudGl0eVNldFBhdGgiLCJuYXZpZ2F0ZWRQYXRocyIsImpvaW4iLCJnZXRUYXJnZXRPYmplY3RQYXRoIiwiYlJlbGF0aXZlIiwiX3R5cGUiLCJlbmRzV2l0aCIsInRlcm0iLCJnZXRDb250ZXh0UmVsYXRpdmVUYXJnZXRPYmplY3RQYXRoIiwiZm9yQmluZGluZ0V4cHJlc3Npb24iLCJuYXZQcm9wZXJ0aWVzIiwiaXNDb2xsZWN0aW9uIiwidHlwZSIsInZhbHVlIiwicXVhbGlmaWVyIiwiaXNQYXRoVXBkYXRhYmxlIiwiYlRhYmxlQ2FzZSIsImNoZWNrT25QYXRoIiwiYW5ub3RhdGlvbk9iamVjdCIsIlVwZGF0ZVJlc3RyaWN0aW9ucyIsIlVwZGF0YWJsZSIsImlzUGF0aERlbGV0YWJsZSIsIkRlbGV0ZVJlc3RyaWN0aW9ucyIsIkRlbGV0YWJsZSIsImlzUGF0aEluc2VydGFibGUiLCJJbnNlcnRSZXN0cmljdGlvbnMiLCJJbnNlcnRhYmxlIiwiY2hlY2tGaWx0ZXJFeHByZXNzaW9uUmVzdHJpY3Rpb25zIiwiYWxsb3dlZEV4cHJlc3Npb24iLCJmaWx0ZXJFeHByZXNzaW9uUmVzdHJpY3Rpb25zIiwiRmlsdGVyUmVzdHJpY3Rpb25zIiwiRmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9ucyIsImN1cnJlbnRPYmplY3RSZXN0cmljdGlvbiIsInJlc3RyaWN0aW9uIiwiUHJvcGVydHkiLCJpbmRleE9mIiwiQWxsb3dlZEV4cHJlc3Npb25zIiwidG9TdHJpbmciLCJjaGVja0Z1bmN0aW9uIiwiY29uc3RhbnQiLCJwYXJlbnRFbnRpdHlTZXQiLCJ2aXNpdGVkTmF2aWdhdGlvblByb3BzTmFtZSIsImFsbFZpc2l0ZWROYXZpZ2F0aW9uUHJvcHMiLCJyZXNldFZpc2l0ZWROYXZQcm9wcyIsIm5hdmlnYXRpb25Qcm9wZXJ0eSIsImNvbnRhaW5zVGFyZ2V0IiwiZnVsbE5hdmlnYXRpb25QYXRoIiwicmVzdHJpY3Rpb25zIiwiX3BhcmVudEVudGl0eVNldCIsImFubm90YXRpb25zIiwiQ2FwYWJpbGl0aWVzIiwiTmF2aWdhdGlvblJlc3RyaWN0aW9ucyIsIlJlc3RyaWN0ZWRQcm9wZXJ0aWVzIiwicmVzdHJpY3RlZE5hdlByb3AiLCJOYXZpZ2F0aW9uUHJvcGVydHkiLCJyZXN0cmljdGlvbkRlZmluaXRpb24iLCJfYWxsVmlzaXRlZE5hdmlnYXRpb25Qcm9wcyIsImVxdWFsIiwiYW5ub3RhdGlvbkV4cHJlc3Npb24iLCJ0YXJnZXRSZXN0cmljdGlvbnMiLCJvUmVzdWx0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQXdCTyxNQUFNQSx1QkFBdUIsR0FBRyxVQUN0Q0MsV0FEc0MsRUFHZjtBQUFBLFFBRHZCQyxlQUN1Qix1RUFEaUIsRUFDakI7O0FBQ3ZCLFFBQUksQ0FBQ0QsV0FBTCxFQUFrQjtBQUNqQixhQUFPQyxlQUFQO0FBQ0EsS0FGRCxNQUVPO0FBQ04sVUFBSUEsZUFBZSxDQUFDQyxNQUFoQixJQUEwQkYsV0FBVyxDQUFDRyxvQkFBWixDQUFpQ0QsTUFBL0QsRUFBdUU7QUFDdEUsWUFBSUUsaUJBQXVDLEdBQUcsRUFBOUM7QUFDQUosUUFBQUEsV0FBVyxDQUFDRyxvQkFBWixDQUFpQ0UsT0FBakMsQ0FBeUMsVUFBQ0MsT0FBRCxFQUFVQyxRQUFWLEVBQXVCO0FBQy9ELGNBQUlOLGVBQWUsQ0FBQ00sUUFBRCxDQUFmLEtBQThCRCxPQUFsQyxFQUEyQztBQUMxQ0YsWUFBQUEsaUJBQWlCLENBQUNJLElBQWxCLENBQXVCUCxlQUFlLENBQUNNLFFBQUQsQ0FBdEM7QUFDQTtBQUNELFNBSkQ7QUFLQUgsUUFBQUEsaUJBQWlCLEdBQUdBLGlCQUFpQixDQUFDSyxNQUFsQixDQUF5QlIsZUFBZSxDQUFDUyxLQUFoQixDQUFzQlYsV0FBVyxDQUFDRyxvQkFBWixDQUFpQ0QsTUFBdkQsQ0FBekIsQ0FBcEIsQ0FQc0UsQ0FRdEU7O0FBQ0EsWUFBSVMsVUFBVSxHQUFHLENBQWpCOztBQUNBLGVBQU9QLGlCQUFpQixDQUFDRixNQUFsQixHQUEyQixDQUEzQixJQUFnQ1MsVUFBVSxJQUFJUCxpQkFBaUIsQ0FBQ0YsTUFBbEIsR0FBMkIsQ0FBaEYsRUFBbUY7QUFDbEYsY0FBTVUsVUFBVSxHQUFHUixpQkFBaUIsQ0FBQ08sVUFBRCxDQUFwQztBQUNBLGNBQU1FLFdBQVcsR0FBR1QsaUJBQWlCLENB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RUFBRSxDQUFDTixJQUFQO0FBQUEsT0FBOUYsQ0FGbUIsQ0FESyxFQUt6QixJQUx5QixDQUExQjtBQU9BLEtBM0ZxQixDQTRGdEI7OztBQUNBLFFBQUlrRCxVQUFVLElBQUksQ0FBQytCLFlBQWYsOEJBQStCUSxxQkFBL0IsMERBQStCLHNCQUF1QjVFLElBQXRELENBQUosRUFBZ0U7QUFDL0QsVUFBTWlGLE9BQVksR0FBRztBQUNwQixvQ0FBNEJEO0FBRFIsT0FBckI7QUFHQSxhQUFPQyxPQUFQO0FBQ0E7O0FBQ0QsV0FBT2IsWUFBWSxJQUFJWSxrQkFBaEIsSUFBc0NwQixRQUFRLENBQUMsSUFBRCxDQUFyRDtBQUNBLEdBekdNIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFbnRpdHlTZXQsIEVudGl0eVR5cGUsIE5hdmlnYXRpb25Qcm9wZXJ0eSwgUHJvcGVydHkgfSBmcm9tIFwiQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlclwiO1xuaW1wb3J0IHsgYW5ub3RhdGlvbkV4cHJlc3Npb24sIGNvbnN0YW50LCBlcXVhbCwgRXhwcmVzc2lvbiB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdFeHByZXNzaW9uXCI7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uUHJvcGVydHlSZXN0cmljdGlvblR5cGVzIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzL2Rpc3QvZ2VuZXJhdGVkL0NhcGFiaWxpdGllc1wiO1xuaW1wb3J0IHsgUHJvcGVydHlPclBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9VSUZvcm1hdHRlcnNcIjtcbmltcG9ydCB7IGlzQW5ub3RhdGlvblBhdGhFeHByZXNzaW9uLCBpc1BhdGhFeHByZXNzaW9uIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvUHJvcGVydHlIZWxwZXJcIjtcbmltcG9ydCB7XG5cdEZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvblR5cGVUeXBlcyxcblx0TmF2aWdhdGlvblByb3BlcnR5UmVzdHJpY3Rpb25cbn0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzL3R5cGVzL2dlbmVyYXRlZC9DYXBhYmlsaXRpZXNcIjtcbmltcG9ydCB7XG5cdEVudGl0eVNldEFubm90YXRpb25zX0NhcGFiaWxpdGllcyxcblx0RW50aXR5VHlwZUFubm90YXRpb25zX0NhcGFiaWxpdGllc1xufSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9nZW5lcmF0ZWQvQ2FwYWJpbGl0aWVzX0VkbVwiO1xuaW1wb3J0IHsgUHJvcGVydHlQYXRoIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5cbmV4cG9ydCB0eXBlIERhdGFNb2RlbE9iamVjdFBhdGggPSB7XG5cdHN0YXJ0aW5nRW50aXR5U2V0OiBFbnRpdHlTZXQ7XG5cdGNvbnRleHRMb2NhdGlvbj86IERhdGFNb2RlbE9iamVjdFBhdGg7XG5cdG5hdmlnYXRpb25Qcm9wZXJ0aWVzOiBOYXZpZ2F0aW9uUHJvcGVydHlbXTtcblx0dGFyZ2V0RW50aXR5U2V0PzogRW50aXR5U2V0O1xuXHR0YXJnZXRFbnRpdHlUeXBlOiBFbnRpdHlUeXBlO1xuXHR0YXJnZXRPYmplY3Q6IGFueTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRQYXRoUmVsYXRpdmVMb2NhdGlvbiA9IGZ1bmN0aW9uKFxuXHRjb250ZXh0UGF0aD86IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdHZpc2l0ZWROYXZQcm9wczogTmF2aWdhdGlvblByb3BlcnR5W10gPSBbXVxuKTogTmF2aWdhdGlvblByb3BlcnR5W10ge1xuXHRpZiAoIWNvbnRleHRQYXRoKSB7XG5cdFx0cmV0dXJuIHZpc2l0ZWROYXZQcm9wcztcblx0fSBlbHNlIHtcblx0XHRpZiAodmlzaXRlZE5hdlByb3BzLmxlbmd0aCA+PSBjb250ZXh0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5sZW5ndGgpIHtcblx0XHRcdGxldCByZW1haW5pbmdOYXZQcm9wczogTmF2aWdhdGlvblByb3BlcnR5W10gPSBbXTtcblx0XHRcdGNvbnRleHRQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLmZvckVhY2goKG5hdlByb3AsIG5hdkluZGV4KSA9PiB7XG5cdFx0XHRcdGlmICh2aXNpdGVkTmF2UHJvcHNbbmF2SW5kZXhdICE9PSBuYXZQcm9wKSB7XG5cdFx0XHRcdFx0cmVtYWluaW5nTmF2UHJvcHMucHVzaCh2aXNpdGVkTmF2UHJvcHNbbmF2SW5kZXhdKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRyZW1haW5pbmdOYXZQcm9wcyA9IHJlbWFpbmluZ05hdlByb3BzLmNvbmNhdCh2aXNpdGVkTmF2UHJvcHMuc2xpY2UoY29udGV4dFBhdGgubmF2aWdhdGlvblByb3BlcnRpZXMubGVuZ3RoKSk7XG5cdFx0XHQvLyBDbGVhbiB1cCBOYXZQcm9wIC0+IE93bmVyXG5cdFx0XHRsZXQgY3VycmVudElkeCA9IDA7XG5cdFx0XHR3aGlsZSAocmVtYWluaW5nTmF2UHJvcHMubGVuZ3RoID4gMSAmJiBjdXJyZW50SWR4ICE9IHJlbWFpbmluZ05hdlByb3BzLmxlbmd0aCAtIDEpIHtcblx0XHRcdFx0Y29uc3QgY3VycmVudE5hdiA9IHJlbWFpbmluZ05hdlByb3BzW2N1cnJlbnRJZHhdO1xuXHRcdFx0XHRjb25zdCBuZXh0TmF2UHJvcCA9IHJlbWFpbmluZ05hdlByb3BzW2N1cnJlbnRJZHggKyAxXTtcblx0XHRcdFx0aWYgKGN1cnJlbnROYXYucGFydG5lciA9PT0gbmV4dE5hdlByb3AubmFtZSkge1xuXHRcdFx0XHRcdHJlbWFpbmluZ05hdlByb3BzLnNwbGljZSgwLCAyKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjdXJyZW50SWR4Kys7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVybiByZW1haW5pbmdOYXZQcm9wcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0bGV0IGV4dHJhTmF2UHJvcDogTmF2aWdhdGlvblByb3BlcnR5W10gPSBbXTtcblx0XHRcdHZpc2l0ZWROYXZQcm9wcy5mb3JFYWNoKChuYXZQcm9wLCBuYXZJbmRleCkgPT4ge1xuXHRcdFx0XHRpZiAoY29udGV4dFBhdGgubmF2aWdhdGlvblByb3BlcnRpZXNbbmF2SW5kZXhdICE9PSBuYXZQcm9wKSB7XG5cdFx0XHRcdFx0ZXh0cmFOYXZQcm9wLnB1c2godmlzaXRlZE5hdlByb3BzW25hdkluZGV4XSk7XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdFx0ZXh0cmFOYXZQcm9wID0gZXh0cmFOYXZQcm9wLmNvbmNhdChjb250ZXh0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5zbGljZSh2aXNpdGVkTmF2UHJvcHMubGVuZ3RoKSk7XG5cdFx0XHQvLyBDbGVhbiB1cCBOYXZQcm9wIC0+IE93bmVyXG5cdFx0XHRsZXQgY3VycmVudElkeCA9IDA7XG5cdFx0XHR3aGlsZSAoZXh0cmFOYXZQcm9wLmxlbmd0aCA+IDEgJiYgY3VycmVudElkeCAhPSBleHRyYU5hdlByb3AubGVuZ3RoIC0gMSkge1xuXHRcdFx0XHRjb25zdCBjdXJyZW50TmF2ID0gZXh0cmFOYXZQcm9wW2N1cnJlbnRJZHhdO1xuXHRcdFx0XHRjb25zdCBuZXh0TmF2UHJvcCA9IGV4dHJhTmF2UHJvcFtjdXJyZW50SWR4ICsgMV07XG5cdFx0XHRcdGlmIChjdXJyZW50TmF2LnBhcnRuZXIgPT09IG5leHROYXZQcm9wLm5hbWUpIHtcblx0XHRcdFx0XHRleHRyYU5hdlByb3Auc3BsaWNlKDAsIDIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGN1cnJlbnRJZHgrKztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0ZXh0cmFOYXZQcm9wID0gZXh0cmFOYXZQcm9wLm1hcChuYXZQcm9wID0+IHtcblx0XHRcdFx0cmV0dXJuIG5hdlByb3AudGFyZ2V0VHlwZS5uYXZpZ2F0aW9uUHJvcGVydGllcy5maW5kKG5wID0+IG5wLm5hbWUgPT09IG5hdlByb3AucGFydG5lcikgYXMgTmF2aWdhdGlvblByb3BlcnR5O1xuXHRcdFx0fSk7XG5cdFx0XHRyZXR1cm4gZXh0cmFOYXZQcm9wO1xuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGNvbnN0IGVuaGFuY2VEYXRhTW9kZWxQYXRoID0gZnVuY3Rpb24oXG5cdGRhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdHByb3BlcnR5UGF0aD86IFByb3BlcnR5T3JQYXRoPFByb3BlcnR5PlxuKTogRGF0YU1vZGVsT2JqZWN0UGF0aCB7XG5cdGxldCBzUHJvcGVydHlQYXRoOiBzdHJpbmcgPSBcIlwiO1xuXHRpZiAoKGlzUGF0aEV4cHJlc3Npb24ocHJvcGVydHlQYXRoKSB8fCBpc0Fubm90YXRpb25QYXRoRXhwcmVzc2lvbihwcm9wZXJ0eVBhdGgpKSAmJiBwcm9wZXJ0eVBhdGgucGF0aCkge1xuXHRcdHNQcm9wZXJ0eVBhdGggPSBwcm9wZXJ0eVBhdGgucGF0aDtcblx0fSBlbHNlIGlmICh0eXBlb2YgcHJvcGVydHlQYXRoID09PSBcInN0cmluZ1wiKSB7XG5cdFx0c1Byb3BlcnR5UGF0aCA9IHByb3BlcnR5UGF0aCBhcyBzdHJpbmc7XG5cdH1cblx0bGV0IG9UYXJnZXQ7XG5cdGlmIChpc1BhdGhFeHByZXNzaW9uKHByb3BlcnR5UGF0aCkgfHwgaXNBbm5vdGF0aW9uUGF0aEV4cHJlc3Npb24ocHJvcGVydHlQYXRoKSkge1xuXHRcdG9UYXJnZXQgPSBwcm9wZXJ0eVBhdGguJHRhcmdldDtcblx0fSBlbHNlIGlmIChkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldEVudGl0eVR5cGUpIHtcblx0XHRvVGFyZ2V0ID0gZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRFbnRpdHlUeXBlLnJlc29sdmVQYXRoKHNQcm9wZXJ0eVBhdGgpO1xuXHR9IGVsc2Uge1xuXHRcdG9UYXJnZXQgPSBkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdDtcblx0fVxuXHRjb25zdCBhUGF0aFNwbGl0ID0gc1Byb3BlcnR5UGF0aC5zcGxpdChcIi9cIik7XG5cdGxldCBjdXJyZW50RW50aXR5U2V0ID0gZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRFbnRpdHlTZXQ7XG5cdGxldCBjdXJyZW50RW50aXR5VHlwZSA9IGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0RW50aXR5VHlwZTtcblx0Y29uc3QgbmF2aWdhdGlvblByb3BlcnRpZXMgPSBkYXRhTW9kZWxPYmplY3RQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLmNvbmNhdCgpO1xuXHQvLyBQcm9jZXNzIG9ubHkgaWYgd2UgaGF2ZSB0byBnbyB0aHJvdWdoIG5hdmlnYXRpb24gcHJvcGVydGllc1xuXG5cdGFQYXRoU3BsaXQucmVkdWNlKChyZWR1Y2VkRW50aXR5VHlwZTogRW50aXR5VHlwZSB8IHVuZGVmaW5lZCwgcGF0aFBhcnQ6IHN0cmluZykgPT4ge1xuXHRcdGlmICghcmVkdWNlZEVudGl0eVR5cGUpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGNvbnN0IHBvdGVudGlhbE5hdlByb3AgPSByZWR1Y2VkRW50aXR5VHlwZS5uYXZpZ2F0aW9uUHJvcGVydGllcy5maW5kKG5hdlByb3AgPT4gbmF2UHJvcC5uYW1lID09PSBwYXRoUGFydCk7XG5cdFx0aWYgKHBvdGVudGlhbE5hdlByb3ApIHtcblx0XHRcdG5hdmlnYXRpb25Qcm9wZXJ0aWVzLnB1c2gocG90ZW50aWFsTmF2UHJvcCk7XG5cdFx0XHRjdXJyZW50RW50aXR5VHlwZSA9IHBvdGVudGlhbE5hdlByb3AudGFyZ2V0VHlwZTtcblx0XHRcdGlmIChjdXJyZW50RW50aXR5U2V0ICYmIGN1cnJlbnRFbnRpdHlTZXQubmF2aWdhdGlvblByb3BlcnR5QmluZGluZy5oYXNPd25Qcm9wZXJ0eShwYXRoUGFydCkpIHtcblx0XHRcdFx0Y3VycmVudEVudGl0eVNldCA9IGN1cnJlbnRFbnRpdHlTZXQubmF2aWdhdGlvblByb3BlcnR5QmluZGluZ1twYXRoUGFydF07XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gY3VycmVudEVudGl0eVR5cGU7XG5cdFx0fVxuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH0sIGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0RW50aXR5VHlwZSk7XG5cblx0cmV0dXJuIHtcblx0XHRzdGFydGluZ0VudGl0eVNldDogZGF0YU1vZGVsT2JqZWN0UGF0aC5zdGFydGluZ0VudGl0eVNldCxcblx0XHRuYXZpZ2F0aW9uUHJvcGVydGllczogbmF2aWdhdGlvblByb3BlcnRpZXMsXG5cdFx0Y29udGV4dExvY2F0aW9uOiBkYXRhTW9kZWxPYmplY3RQYXRoLmNvbnRleHRMb2NhdGlvbixcblx0XHR0YXJnZXRFbnRpdHlTZXQ6IGN1cnJlbnRFbnRpdHlTZXQsXG5cdFx0dGFyZ2V0RW50aXR5VHlwZTogY3VycmVudEVudGl0eVR5cGUsXG5cdFx0dGFyZ2V0T2JqZWN0OiBvVGFyZ2V0XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGFyZ2V0RW50aXR5U2V0UGF0aCA9IGZ1bmN0aW9uKGRhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgpOiBzdHJpbmcge1xuXHRsZXQgdGFyZ2V0RW50aXR5U2V0UGF0aDogc3RyaW5nID0gYC8ke2RhdGFNb2RlbE9iamVjdFBhdGguc3RhcnRpbmdFbnRpdHlTZXQubmFtZX1gO1xuXHRsZXQgY3VycmVudEVudGl0eVNldCA9IGRhdGFNb2RlbE9iamVjdFBhdGguc3RhcnRpbmdFbnRpdHlTZXQ7XG5cdGxldCBuYXZpZ2F0ZWRQYXRoczogc3RyaW5nW10gPSBbXTtcblx0ZGF0YU1vZGVsT2JqZWN0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5mb3JFYWNoKG5hdlByb3AgPT4ge1xuXHRcdG5hdmlnYXRlZFBhdGhzLnB1c2gobmF2UHJvcC5uYW1lKTtcblx0XHRpZiAoY3VycmVudEVudGl0eVNldCAmJiBjdXJyZW50RW50aXR5U2V0Lm5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmcuaGFzT3duUHJvcGVydHkobmF2aWdhdGVkUGF0aHMuam9pbihcIi9cIikpKSB7XG5cdFx0XHR0YXJnZXRFbnRpdHlTZXRQYXRoICs9IGAvJE5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmcvJHtuYXZpZ2F0ZWRQYXRocy5qb2luKFwiL1wiKX0vJGA7XG5cdFx0XHRjdXJyZW50RW50aXR5U2V0ID0gY3VycmVudEVudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nW25hdmlnYXRlZFBhdGhzLmpvaW4oXCIvXCIpXTtcblx0XHRcdG5hdmlnYXRlZFBhdGhzID0gW107XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHRhcmdldEVudGl0eVNldFBhdGg7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0VGFyZ2V0T2JqZWN0UGF0aCA9IGZ1bmN0aW9uKGRhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsIGJSZWxhdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogc3RyaW5nIHtcblx0bGV0IHBhdGggPSBcIlwiO1xuXHRpZiAoIWRhdGFNb2RlbE9iamVjdFBhdGguc3RhcnRpbmdFbnRpdHlTZXQpIHtcblx0XHRyZXR1cm4gXCIvXCI7XG5cdH1cblx0aWYgKCFiUmVsYXRpdmUpIHtcblx0XHRwYXRoICs9IGAvJHtkYXRhTW9kZWxPYmplY3RQYXRoLnN0YXJ0aW5nRW50aXR5U2V0Lm5hbWV9YDtcblx0fVxuXHRpZiAoZGF0YU1vZGVsT2JqZWN0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5sZW5ndGggPiAwKSB7XG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMCkge1xuXHRcdFx0cGF0aCArPSBcIi9cIjtcblx0XHR9XG5cdFx0cGF0aCArPSBkYXRhTW9kZWxPYmplY3RQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLm1hcChuYXZQcm9wID0+IG5hdlByb3AubmFtZSkuam9pbihcIi9cIik7XG5cdH1cblxuXHRpZiAoXG5cdFx0ZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QgJiZcblx0XHRkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC5uYW1lICYmXG5cdFx0ZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QuX3R5cGUgIT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIgJiZcblx0XHRkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC5fdHlwZSAhPT0gXCJFbnRpdHlUeXBlXCIgJiZcblx0XHRkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdCAhPT0gZGF0YU1vZGVsT2JqZWN0UGF0aC5zdGFydGluZ0VudGl0eVNldFxuXHQpIHtcblx0XHRpZiAoIXBhdGguZW5kc1dpdGgoXCIvXCIpKSB7XG5cdFx0XHRwYXRoICs9IFwiL1wiO1xuXHRcdH1cblx0XHRwYXRoICs9IGAke2RhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0Lm5hbWV9YDtcblx0fSBlbHNlIGlmIChkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdCAmJiBkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcInRlcm1cIikpIHtcblx0XHRpZiAocGF0aC5sZW5ndGggPiAwICYmICFwYXRoLmVuZHNXaXRoKFwiL1wiKSkge1xuXHRcdFx0cGF0aCArPSBcIi9cIjtcblx0XHR9XG5cdFx0cGF0aCArPSBgQCR7ZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QudGVybX1gO1xuXHR9XG5cdHJldHVybiBwYXRoO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldENvbnRleHRSZWxhdGl2ZVRhcmdldE9iamVjdFBhdGggPSBmdW5jdGlvbihcblx0ZGF0YU1vZGVsT2JqZWN0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0Zm9yQmluZGluZ0V4cHJlc3Npb246IGJvb2xlYW4gPSBmYWxzZVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0Y29uc3QgbmF2UHJvcGVydGllcyA9IGdldFBhdGhSZWxhdGl2ZUxvY2F0aW9uKGRhdGFNb2RlbE9iamVjdFBhdGguY29udGV4dExvY2F0aW9uLCBkYXRhTW9kZWxPYmplY3RQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzKTtcblx0aWYgKGZvckJpbmRpbmdFeHByZXNzaW9uKSB7XG5cdFx0aWYgKG5hdlByb3BlcnRpZXMuZmluZChucCA9PiBucC5pc0NvbGxlY3Rpb24pKSB7XG5cdFx0XHRyZXR1cm4gdW5kZWZpbmVkO1xuXHRcdH1cblx0fVxuXHRsZXQgcGF0aCA9IG5hdlByb3BlcnRpZXMubWFwKG5wID0+IG5wLm5hbWUpLmpvaW4oXCIvXCIpO1xuXHRpZiAoXG5cdFx0ZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QgJiZcblx0XHQoZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QubmFtZSB8fFxuXHRcdFx0KGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0LnR5cGUgPT09IFwiUHJvcGVydHlQYXRoXCIgJiYgZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QudmFsdWUpKSAmJlxuXHRcdGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0Ll90eXBlICE9PSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiICYmXG5cdFx0ZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QgIT09IGRhdGFNb2RlbE9iamVjdFBhdGguc3RhcnRpbmdFbnRpdHlTZXRcblx0KSB7XG5cdFx0aWYgKHBhdGgubGVuZ3RoID4gMCAmJiAhcGF0aC5lbmRzV2l0aChcIi9cIikpIHtcblx0XHRcdHBhdGggKz0gXCIvXCI7XG5cdFx0fVxuXHRcdHBhdGggKz1cblx0XHRcdGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0LnR5cGUgPT09IFwiUHJvcGVydHlQYXRoXCJcblx0XHRcdFx0PyBgJHtkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC52YWx1ZX1gXG5cdFx0XHRcdDogYCR7ZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QubmFtZX1gO1xuXHR9IGVsc2UgaWYgKGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0ICYmIGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0Lmhhc093blByb3BlcnR5KFwidGVybVwiKSkge1xuXHRcdGlmIChwYXRoLmxlbmd0aCA+IDAgJiYgIXBhdGguZW5kc1dpdGgoXCIvXCIpKSB7XG5cdFx0XHRwYXRoICs9IFwiL1wiO1xuXHRcdH1cblx0XHRwYXRoICs9IGBAJHtkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC50ZXJtfWA7XG5cdFx0aWYgKGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0Lmhhc093blByb3BlcnR5KFwicXVhbGlmaWVyXCIpICYmICEhZGF0YU1vZGVsT2JqZWN0UGF0aC50YXJnZXRPYmplY3QucXVhbGlmaWVyKSB7XG5cdFx0XHRwYXRoICs9IGAjJHtkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdC5xdWFsaWZpZXJ9YDtcblx0XHR9XG5cdH0gZWxzZSBpZiAoIWRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0KSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXHRyZXR1cm4gcGF0aDtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1BhdGhVcGRhdGFibGUgPSBmdW5jdGlvbihcblx0ZGF0YU1vZGVsT2JqZWN0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCB8IHVuZGVmaW5lZCxcblx0cHJvcGVydHlQYXRoPzogUHJvcGVydHlPclBhdGg8UHJvcGVydHk+LFxuXHRiVGFibGVDYXNlPzogYm9vbGVhblxuKTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdHJldHVybiBjaGVja09uUGF0aChcblx0XHRkYXRhTW9kZWxPYmplY3RQYXRoLFxuXHRcdChhbm5vdGF0aW9uT2JqZWN0OiBOYXZpZ2F0aW9uUHJvcGVydHlSZXN0cmljdGlvbiB8IEVudGl0eVNldEFubm90YXRpb25zX0NhcGFiaWxpdGllcyB8IEVudGl0eVR5cGVBbm5vdGF0aW9uc19DYXBhYmlsaXRpZXMpID0+IHtcblx0XHRcdHJldHVybiBhbm5vdGF0aW9uT2JqZWN0Py5VcGRhdGVSZXN0cmljdGlvbnM/LlVwZGF0YWJsZTtcblx0XHR9LFxuXHRcdHByb3BlcnR5UGF0aCxcblx0XHRiVGFibGVDYXNlXG5cdCk7XG59O1xuZXhwb3J0IGNvbnN0IGlzUGF0aERlbGV0YWJsZSA9IGZ1bmN0aW9uKFxuXHRkYXRhTW9kZWxPYmplY3RQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoIHwgdW5kZWZpbmVkLFxuXHRwcm9wZXJ0eVBhdGg/OiBQcm9wZXJ0eU9yUGF0aDxQcm9wZXJ0eT4sXG5cdGJUYWJsZUNhc2U/OiBib29sZWFuXG4pOiBFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0cmV0dXJuIGNoZWNrT25QYXRoKFxuXHRcdGRhdGFNb2RlbE9iamVjdFBhdGgsXG5cdFx0KGFubm90YXRpb25PYmplY3Q6IE5hdmlnYXRpb25Qcm9wZXJ0eVJlc3RyaWN0aW9uIHwgRW50aXR5U2V0QW5ub3RhdGlvbnNfQ2FwYWJpbGl0aWVzIHwgRW50aXR5VHlwZUFubm90YXRpb25zX0NhcGFiaWxpdGllcykgPT4ge1xuXHRcdFx0cmV0dXJuIGFubm90YXRpb25PYmplY3Q/LkRlbGV0ZVJlc3RyaWN0aW9ucz8uRGVsZXRhYmxlO1xuXHRcdH0sXG5cdFx0cHJvcGVydHlQYXRoLFxuXHRcdGJUYWJsZUNhc2Vcblx0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpc1BhdGhJbnNlcnRhYmxlID0gZnVuY3Rpb24oXG5cdGRhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGggfCB1bmRlZmluZWQsXG5cdHByb3BlcnR5UGF0aD86IFByb3BlcnR5T3JQYXRoPFByb3BlcnR5PlxuKTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdHJldHVybiBjaGVja09uUGF0aChcblx0XHRkYXRhTW9kZWxPYmplY3RQYXRoLFxuXHRcdChhbm5vdGF0aW9uT2JqZWN0OiBOYXZpZ2F0aW9uUHJvcGVydHlSZXN0cmljdGlvbiB8IEVudGl0eVNldEFubm90YXRpb25zX0NhcGFiaWxpdGllcyB8IEVudGl0eVR5cGVBbm5vdGF0aW9uc19DYXBhYmlsaXRpZXMpID0+IHtcblx0XHRcdHJldHVybiBhbm5vdGF0aW9uT2JqZWN0Py5JbnNlcnRSZXN0cmljdGlvbnM/Lkluc2VydGFibGU7XG5cdFx0fSxcblx0XHRwcm9wZXJ0eVBhdGhcblx0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja0ZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvbnMgPSBmdW5jdGlvbihcblx0ZGF0YU1vZGVsT2JqZWN0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0YWxsb3dlZEV4cHJlc3Npb246IChzdHJpbmcgfCB1bmRlZmluZWQpW11cbik6IEV4cHJlc3Npb248Ym9vbGVhbj4ge1xuXHRyZXR1cm4gY2hlY2tPblBhdGgoXG5cdFx0ZGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0XHQoYW5ub3RhdGlvbk9iamVjdDogTmF2aWdhdGlvblByb3BlcnR5UmVzdHJpY3Rpb24gfCBFbnRpdHlTZXRBbm5vdGF0aW9uc19DYXBhYmlsaXRpZXMgfCBFbnRpdHlUeXBlQW5ub3RhdGlvbnNfQ2FwYWJpbGl0aWVzKSA9PiB7XG5cdFx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdCAmJiBcIkZpbHRlclJlc3RyaWN0aW9uc1wiIGluIGFubm90YXRpb25PYmplY3QpIHtcblx0XHRcdFx0Y29uc3QgZmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9uczogRmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9uVHlwZVR5cGVzW10gPVxuXHRcdFx0XHRcdChhbm5vdGF0aW9uT2JqZWN0Py5GaWx0ZXJSZXN0cmljdGlvbnM/LkZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvbnMgYXMgRmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9uVHlwZVR5cGVzW10pIHx8IFtdO1xuXHRcdFx0XHRjb25zdCBjdXJyZW50T2JqZWN0UmVzdHJpY3Rpb24gPSBmaWx0ZXJFeHByZXNzaW9uUmVzdHJpY3Rpb25zLmZpbmQocmVzdHJpY3Rpb24gPT4ge1xuXHRcdFx0XHRcdHJldHVybiAocmVzdHJpY3Rpb24uUHJvcGVydHkgYXMgUHJvcGVydHlQYXRoKS4kdGFyZ2V0ID09PSBkYXRhTW9kZWxPYmplY3RQYXRoLnRhcmdldE9iamVjdDtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGlmIChjdXJyZW50T2JqZWN0UmVzdHJpY3Rpb24pIHtcblx0XHRcdFx0XHRyZXR1cm4gYWxsb3dlZEV4cHJlc3Npb24uaW5kZXhPZihjdXJyZW50T2JqZWN0UmVzdHJpY3Rpb24/LkFsbG93ZWRFeHByZXNzaW9ucz8udG9TdHJpbmcoKSkgIT09IC0xO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdFx0fVxuXHRcdH1cblx0KTtcbn07XG5cbmV4cG9ydCBjb25zdCBjaGVja09uUGF0aCA9IGZ1bmN0aW9uKFxuXHRkYXRhTW9kZWxPYmplY3RQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoIHwgdW5kZWZpbmVkLFxuXHRjaGVja0Z1bmN0aW9uOiBGdW5jdGlvbixcblx0cHJvcGVydHlQYXRoPzogUHJvcGVydHlPclBhdGg8UHJvcGVydHk+LFxuXHRiVGFibGVDYXNlPzogYm9vbGVhblxuKTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdGlmICghZGF0YU1vZGVsT2JqZWN0UGF0aCB8fCAhZGF0YU1vZGVsT2JqZWN0UGF0aC5zdGFydGluZ0VudGl0eVNldCkge1xuXHRcdHJldHVybiBjb25zdGFudCh0cnVlKTtcblx0fVxuXHRkYXRhTW9kZWxPYmplY3RQYXRoID0gZW5oYW5jZURhdGFNb2RlbFBhdGgoZGF0YU1vZGVsT2JqZWN0UGF0aCwgcHJvcGVydHlQYXRoKTtcblxuXHRsZXQgY3VycmVudEVudGl0eVNldDogRW50aXR5U2V0IHwgbnVsbCA9IGRhdGFNb2RlbE9iamVjdFBhdGguc3RhcnRpbmdFbnRpdHlTZXQ7XG5cdGxldCBwYXJlbnRFbnRpdHlTZXQ6IEVudGl0eVNldCB8IG51bGwgPSBudWxsO1xuXHRsZXQgdmlzaXRlZE5hdmlnYXRpb25Qcm9wc05hbWU6IHN0cmluZ1tdID0gW107XG5cdGNvbnN0IGFsbFZpc2l0ZWROYXZpZ2F0aW9uUHJvcHM6IE5hdmlnYXRpb25Qcm9wZXJ0eVtdID0gW107XG5cdGxldCB0YXJnZXRFbnRpdHlTZXQ6IEVudGl0eVNldCB8IG51bGwgPSBjdXJyZW50RW50aXR5U2V0O1xuXHRjb25zdCB0YXJnZXRFbnRpdHlUeXBlOiBFbnRpdHlUeXBlIHwgbnVsbCA9IGRhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0RW50aXR5VHlwZTtcblx0bGV0IHJlc2V0VmlzaXRlZE5hdlByb3BzID0gZmFsc2U7XG5cblx0ZGF0YU1vZGVsT2JqZWN0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5mb3JFYWNoKChuYXZpZ2F0aW9uUHJvcGVydHk6IE5hdmlnYXRpb25Qcm9wZXJ0eSkgPT4ge1xuXHRcdGlmIChyZXNldFZpc2l0ZWROYXZQcm9wcykge1xuXHRcdFx0dmlzaXRlZE5hdmlnYXRpb25Qcm9wc05hbWUgPSBbXTtcblx0XHR9XG5cdFx0dmlzaXRlZE5hdmlnYXRpb25Qcm9wc05hbWUucHVzaChuYXZpZ2F0aW9uUHJvcGVydHkubmFtZSk7XG5cdFx0YWxsVmlzaXRlZE5hdmlnYXRpb25Qcm9wcy5wdXNoKG5hdmlnYXRpb25Qcm9wZXJ0eSk7XG5cdFx0aWYgKCFuYXZpZ2F0aW9uUHJvcGVydHkuY29udGFpbnNUYXJnZXQpIHtcblx0XHRcdC8vIFdlIHNob3VsZCBoYXZlIGEgbmF2aWdhdGlvblByb3BlcnR5QmluZGluZyBhc3NvY2lhdGVkIHdpdGggdGhlIHBhdGggc28gZmFyIHdoaWNoIGNhbiBjb25zaXN0IG9mIChbQ29udGFpbm1lbnROYXZQcm9wXS8pKltOYXZQcm9wXVxuXHRcdFx0Y29uc3QgZnVsbE5hdmlnYXRpb25QYXRoID0gdmlzaXRlZE5hdmlnYXRpb25Qcm9wc05hbWUuam9pbihcIi9cIik7XG5cdFx0XHRpZiAoY3VycmVudEVudGl0eVNldCAmJiBjdXJyZW50RW50aXR5U2V0Lm5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmcuaGFzT3duUHJvcGVydHkoZnVsbE5hdmlnYXRpb25QYXRoKSkge1xuXHRcdFx0XHRwYXJlbnRFbnRpdHlTZXQgPSBjdXJyZW50RW50aXR5U2V0O1xuXHRcdFx0XHRjdXJyZW50RW50aXR5U2V0ID0gY3VycmVudEVudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nW2Z1bGxOYXZpZ2F0aW9uUGF0aF07XG5cdFx0XHRcdHRhcmdldEVudGl0eVNldCA9IGN1cnJlbnRFbnRpdHlTZXQ7XG5cdFx0XHRcdC8vIElmIHdlIHJlYWNoZWQgYSBuYXZpZ2F0aW9uIHByb3BlcnR5IHdpdGggYSBuYXZpZ2F0aW9ucHJvcGVydHliaW5kaW5nLCB3ZSBuZWVkIHRvIHJlc2V0IHRoZSB2aXNpdGVkIHBhdGggb24gdGhlIG5leHQgaXRlcmF0aW9uIChpZiB0aGVyZSBpcyBvbmUpXG5cdFx0XHRcdHJlc2V0VmlzaXRlZE5hdlByb3BzID0gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFdlIHJlYWxseSBzaG91bGQgbm90IGVuZCB1cCBoZXJlIGJ1dCBhdCBsZWFzdCBsZXQncyB0cnkgdG8gYXZvaWQgaW5jb3JyZWN0IGJlaGF2aW9yXG5cdFx0XHRcdHBhcmVudEVudGl0eVNldCA9IGN1cnJlbnRFbnRpdHlTZXQ7XG5cdFx0XHRcdGN1cnJlbnRFbnRpdHlTZXQgPSBudWxsO1xuXHRcdFx0XHRyZXNldFZpc2l0ZWROYXZQcm9wcyA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHBhcmVudEVudGl0eVNldCA9IGN1cnJlbnRFbnRpdHlTZXQ7XG5cdFx0XHR0YXJnZXRFbnRpdHlTZXQgPSBudWxsO1xuXHRcdH1cblx0fSk7XG5cblx0Ly8gQXQgdGhpcyBwb2ludCB3ZSBoYXZlIG5hdmlnYXRlZCBkb3duIGFsbCB0aGUgbmF2IHByb3AgYW5kIHdlIHNob3VsZCBoYXZlXG5cdC8vIFRoZSB0YXJnZXQgZW50aXR5c2V0IHBvaW50aW5nIHRvIGVpdGhlciBudWxsIChpbiBjYXNlIG9mIGNvbnRhaW5tZW50IG5hdnByb3AgYSBsYXN0IHBhcnQpLCBvciB0aGUgYWN0dWFsIHRhcmdldCAobm9uIGNvbnRhaW5tZW50IGFzIHRhcmdldClcblx0Ly8gVGhlIHBhcmVudCBlbnRpdHlTZXQgcG9pbnRpbmcgdG8gdGhlIHByZXZpb3VzIGVudGl0eXNldCB1c2VkIGluIHRoZSBwYXRoXG5cdC8vIFZpc2l0ZWROYXZpZ2F0aW9uUGF0aCBzaG91bGQgY29udGFpbiB0aGUgcGF0aCB1cCB0byB0aGlzIHByb3BlcnR5XG5cblx0Ly8gUmVzdHJpY3Rpb25zIHNob3VsZCB0aGVuIGJlIGV2YWx1YXRlZCBhcyBQYXJlbnRFbnRpdHlTZXQuTmF2UmVzdHJpY3Rpb25zW05hdnByb3BlcnR5UGF0aF0gfHwgVGFyZ2V0RW50aXR5U2V0LlJlc3RyaWN0aW9uc1xuXHRjb25zdCBmdWxsTmF2aWdhdGlvblBhdGggPSB2aXNpdGVkTmF2aWdhdGlvblByb3BzTmFtZS5qb2luKFwiL1wiKTtcblx0bGV0IHJlc3RyaWN0aW9ucywgdmlzaXRlZE5hdlByb3BzO1xuXHRpZiAocGFyZW50RW50aXR5U2V0ICE9PSBudWxsKSB7XG5cdFx0Y29uc3QgX3BhcmVudEVudGl0eVNldDogRW50aXR5U2V0ID0gcGFyZW50RW50aXR5U2V0O1xuXHRcdF9wYXJlbnRFbnRpdHlTZXQuYW5ub3RhdGlvbnM/LkNhcGFiaWxpdGllcz8uTmF2aWdhdGlvblJlc3RyaWN0aW9ucz8uUmVzdHJpY3RlZFByb3BlcnRpZXMuZm9yRWFjaChcblx0XHRcdChyZXN0cmljdGVkTmF2UHJvcDogTmF2aWdhdGlvblByb3BlcnR5UmVzdHJpY3Rpb25UeXBlcykgPT4ge1xuXHRcdFx0XHRpZiAocmVzdHJpY3RlZE5hdlByb3AuTmF2aWdhdGlvblByb3BlcnR5Py50eXBlID09PSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIikge1xuXHRcdFx0XHRcdGNvbnN0IHJlc3RyaWN0aW9uRGVmaW5pdGlvbiA9IGNoZWNrRnVuY3Rpb24ocmVzdHJpY3RlZE5hdlByb3ApO1xuXHRcdFx0XHRcdGlmIChmdWxsTmF2aWdhdGlvblBhdGggPT09IHJlc3RyaWN0ZWROYXZQcm9wLk5hdmlnYXRpb25Qcm9wZXJ0eS52YWx1ZSAmJiByZXN0cmljdGlvbkRlZmluaXRpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdFx0Y29uc3QgX2FsbFZpc2l0ZWROYXZpZ2F0aW9uUHJvcHMgPSBhbGxWaXNpdGVkTmF2aWdhdGlvblByb3BzLnNsaWNlKDAsIC0xKTtcblx0XHRcdFx0XHRcdGlmICh0YXJnZXRFbnRpdHlTZXQgIT09IG51bGwpIHtcblx0XHRcdFx0XHRcdFx0dmlzaXRlZE5hdlByb3BzID0gX2FsbFZpc2l0ZWROYXZpZ2F0aW9uUHJvcHM7XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZiAoX2FsbFZpc2l0ZWROYXZpZ2F0aW9uUHJvcHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRcdFx0dmlzaXRlZE5hdlByb3BzID0gYWxsVmlzaXRlZE5hdmlnYXRpb25Qcm9wcy5zbGljZSgwKTtcblx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHR2aXNpdGVkTmF2UHJvcHMgPSBfYWxsVmlzaXRlZE5hdmlnYXRpb25Qcm9wcztcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0cmVzdHJpY3Rpb25zID0gZXF1YWwoXG5cdFx0XHRcdFx0XHRcdGFubm90YXRpb25FeHByZXNzaW9uKFxuXHRcdFx0XHRcdFx0XHRcdHJlc3RyaWN0aW9uRGVmaW5pdGlvbixcblx0XHRcdFx0XHRcdFx0XHRnZXRQYXRoUmVsYXRpdmVMb2NhdGlvbihkYXRhTW9kZWxPYmplY3RQYXRoPy5jb250ZXh0TG9jYXRpb24sIHZpc2l0ZWROYXZQcm9wcykubWFwKG5wID0+IG5wLm5hbWUpXG5cdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0KTtcblx0fVxuXHRsZXQgdGFyZ2V0UmVzdHJpY3Rpb25zO1xuXHRsZXQgcmVzdHJpY3Rpb25EZWZpbml0aW9uID0gY2hlY2tGdW5jdGlvbih0YXJnZXRFbnRpdHlTZXQ/LmFubm90YXRpb25zPy5DYXBhYmlsaXRpZXMpO1xuXHRpZiAodGFyZ2V0RW50aXR5U2V0ID09PSBudWxsICYmIHJlc3RyaWN0aW9uRGVmaW5pdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0cmVzdHJpY3Rpb25EZWZpbml0aW9uID0gY2hlY2tGdW5jdGlvbih0YXJnZXRFbnRpdHlUeXBlPy5hbm5vdGF0aW9ucz8uQ2FwYWJpbGl0aWVzKTtcblx0fVxuXHRpZiAocmVzdHJpY3Rpb25EZWZpbml0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHR0YXJnZXRSZXN0cmljdGlvbnMgPSBlcXVhbChcblx0XHRcdGFubm90YXRpb25FeHByZXNzaW9uKFxuXHRcdFx0XHRyZXN0cmljdGlvbkRlZmluaXRpb24sXG5cdFx0XHRcdGdldFBhdGhSZWxhdGl2ZUxvY2F0aW9uKGRhdGFNb2RlbE9iamVjdFBhdGguY29udGV4dExvY2F0aW9uLCBhbGxWaXNpdGVkTmF2aWdhdGlvblByb3BzKS5tYXAobnAgPT4gbnAubmFtZSlcblx0XHRcdCksXG5cdFx0XHR0cnVlXG5cdFx0KTtcblx0fVxuXHQvL29iamVjdCBwYWdlIHRhYmxlIGNhc2UgaW4gcGF0aCBiYXNlZCBzY2VuYXJpbydzIGZhbGxiYWNrIHRvIGV4aXNpdGluZyBhcHByb2FjaFxuXHRpZiAoYlRhYmxlQ2FzZSAmJiAhcmVzdHJpY3Rpb25zICYmIHJlc3RyaWN0aW9uRGVmaW5pdGlvbj8ucGF0aCkge1xuXHRcdGNvbnN0IG9SZXN1bHQ6IGFueSA9IHtcblx0XHRcdFwiY3VycmVudEVudGl0eVJlc3RyaWN0aW9uXCI6IHRhcmdldFJlc3RyaWN0aW9uc1xuXHRcdH07XG5cdFx0cmV0dXJuIG9SZXN1bHQ7XG5cdH1cblx0cmV0dXJuIHJlc3RyaWN0aW9ucyB8fCB0YXJnZXRSZXN0cmljdGlvbnMgfHwgY29uc3RhbnQodHJ1ZSk7XG59O1xuIl19