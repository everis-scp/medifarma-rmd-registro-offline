/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../ManifestSettings", "sap/fe/core/converters/controls/Common/Action", "sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/Key", "sap/fe/core/templating/DataModelPathHelper", "../helpers/BindingHelper"], function (ManifestSettings, Action, ConfigurableObject, BindingExpression, Key, DataModelPathHelper, BindingHelper) {
  "use strict";

  var _exports = {};
  var UI = BindingHelper.UI;
  var singletonPathVisitor = BindingHelper.singletonPathVisitor;
  var Draft = BindingHelper.Draft;
  var isPathDeletable = DataModelPathHelper.isPathDeletable;
  var KeyHelper = Key.KeyHelper;
  var ifElse = BindingExpression.ifElse;
  var and = BindingExpression.and;
  var fn = BindingExpression.fn;
  var equal = BindingExpression.equal;
  var not = BindingExpression.not;
  var compileBinding = BindingExpression.compileBinding;
  var annotationExpression = BindingExpression.annotationExpression;
  var Placement = ConfigurableObject.Placement;
  var getSemanticObjectMapping = Action.getSemanticObjectMapping;
  var ButtonType = Action.ButtonType;
  var ActionType = ManifestSettings.ActionType;

  /**
   * Retrieves all the data field for actions for the identification annotation
   * They must be
   * - Not statically hidden
   * - Either linked to an Unbound action or to an action which has an OperationAvailable that is not set to false statically.
   *
   * @param {EntityType} entityType The current entity type
   * @param {boolean} bDetermining The flag which denotes whether or not the action is a determining action
   * @returns {DataFieldForActionTypes[]} An array of DataField for action respecting the input parameter 'bDetermining'
   */
  function getIdentificationDataFieldForActions(entityType, bDetermining) {
    var _entityType$annotatio, _entityType$annotatio2, _entityType$annotatio3;

    return ((_entityType$annotatio = entityType.annotations) === null || _entityType$annotatio === void 0 ? void 0 : (_entityType$annotatio2 = _entityType$annotatio.UI) === null || _entityType$annotatio2 === void 0 ? void 0 : (_entityType$annotatio3 = _entityType$annotatio2.Identification) === null || _entityType$annotatio3 === void 0 ? void 0 : _entityType$annotatio3.filter(function (identificationDataField) {
      var _identificationDataFi, _identificationDataFi2, _identificationDataFi3;

      if ((identificationDataField === null || identificationDataField === void 0 ? void 0 : (_identificationDataFi = identificationDataField.annotations) === null || _identificationDataFi === void 0 ? void 0 : (_identificationDataFi2 = _identificationDataFi.UI) === null || _identificationDataFi2 === void 0 ? void 0 : (_identificationDataFi3 = _identificationDataFi2.Hidden) === null || _identificationDataFi3 === void 0 ? void 0 : _identificationDataFi3.valueOf()) !== true) {
        var _identificationDataFi4, _identificationDataFi5, _identificationDataFi6, _identificationDataFi7, _identificationDataFi8;

        if ((identificationDataField === null || identificationDataField === void 0 ? void 0 : identificationDataField.$Type) === "com.sap.vocabularies.UI.v1.DataFieldForAction" && !!identificationDataField.Determining === bDetermining && (!(identificationDataField === null || identificationDataField === void 0 ? void 0 : (_identificationDataFi4 = identificationDataField.ActionTarget) === null || _identificationDataFi4 === void 0 ? void 0 : _identificationDataFi4.isBound) || (identificationDataField === null || identificationDataField === void 0 ? void 0 : (_identificationDataFi5 = identificationDataField.ActionTarget) === null || _identificationDataFi5 === void 0 ? void 0 : (_identificationDataFi6 = _identificationDataFi5.annotations) === null || _identificationDataFi6 === void 0 ? void 0 : (_identificationDataFi7 = _identificationDataFi6.Core) === null || _identificationDataFi7 === void 0 ? void 0 : (_identificationDataFi8 = _identificationDataFi7.OperationAvailable) === null || _identificationDataFi8 === void 0 ? void 0 : _identificationDataFi8.valueOf()) !== false)) {
          return true;
        }
      }

      return false;
    })) || [];
  }
  /**
   * Retrieve all the IBN actions for the identification annotation.
   * They must be
   * - Not statically hidden.
   * @param {EntityType} entityType The current entitytype
   * @param {boolean} bDetermining Whether or not the action should be determining
   * @returns {DataFieldForIntentBasedNavigationTypes[]} An array of datafield for action respecting the bDetermining property.
   */


  _exports.getIdentificationDataFieldForActions = getIdentificationDataFieldForActions;

  function getIdentificationDataFieldForIBNActions(entityType, bDetermining) {
    var _entityType$annotatio4, _entityType$annotatio5, _entityType$annotatio6;

    return ((_entityType$annotatio4 = entityType.annotations) === null || _entityType$annotatio4 === void 0 ? void 0 : (_entityType$annotatio5 = _entityType$annotatio4.UI) === null || _entityType$annotatio5 === void 0 ? void 0 : (_entityType$annotatio6 = _entityType$annotatio5.Identification) === null || _entityType$annotatio6 === void 0 ? void 0 : _entityType$annotatio6.filter(function (identificationDataField) {
      var _identificationDataFi9, _identificationDataFi10, _identificationDataFi11;

      if ((identificationDataField === null || identificationDataField === void 0 ? void 0 : (_identificationDataFi9 = identificationDataField.annotations) === null || _identificationDataFi9 === void 0 ? void 0 : (_identificationDataFi10 = _identificationDataFi9.UI) === null || _identificationDataFi10 === void 0 ? void 0 : (_identificationDataFi11 = _identificationDataFi10.Hidden) === null || _identificationDataFi11 === void 0 ? void 0 : _identificationDataFi11.valueOf()) !== true) {
        if ((identificationDataField === null || identificationDataField === void 0 ? void 0 : identificationDataField.$Type) === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation" && !!identificationDataField.Determining === bDetermining) {
          return true;
        }
      }

      return false;
    })) || [];
  }

  var IMPORTANT_CRITICALITIES = ["UI.CriticalityType/VeryPositive", "UI.CriticalityType/Positive", "UI.CriticalityType/Negative", "UI.CriticalityType/VeryNegative"];
  /**
   * Method to determine the 'visible' property binding for the Delete button on an object page.
   *
   * @param {ConverterContext} converterContext Instance of the converter context.
   * @param {PropertyAnnotationValue<boolean> | undefined} deleteHidden The value of the UI.DeleteHidden annotation on the entity set / type.
   * @returns {Expression<boolean>} The binding expression for the 'visible' property of the Delete button.
   */

  function getDeleteButtonVisibility(converterContext, deleteHidden) {
    var dataModelObjectPath = converterContext.getDataModelObjectPath(),
        visitedNavigationPaths = dataModelObjectPath.navigationProperties.map(function (navProp) {
      return navProp.name;
    }),
        // Set absolute binding path for Singleton references, otherwise the configured annotation path itself.
    // For e.g. /com.sap.namespace.EntityContainer/Singleton/Property to /Singleton/Property
    deleteHiddenExpression = annotationExpression(deleteHidden, visitedNavigationPaths, undefined, function (path) {
      return singletonPathVisitor(path, converterContext, visitedNavigationPaths);
    }),
        manifestWrapper = converterContext.getManifestWrapper(),
        viewLevel = manifestWrapper.getViewLevel(),
        // Delete button is visible
    // In OP 		-->  when not in edit mode
    // In sub-OP 	-->  when in edit mode
    editableExpression = viewLevel > 1 ? UI.IsEditable : not(UI.IsEditable); // If UI.DeleteHidden annotation on entity set or type is either not defined or explicitly set to false,
    // Delete button is visible based on editableExpression.
    // else,
    // Delete button is visible based on both annotation path and editableExpression.

    return ifElse(deleteHidden === undefined || deleteHidden.valueOf() === false, editableExpression, and(editableExpression, equal(deleteHiddenExpression, false)));
  }
  /**
   * Method to determine the 'visible' property binding for the Edit button on an object page.
   *
   * @param {ConverterContext} converterContext Instance of the converter context.
   * @param {PropertyAnnotationValue<boolean> | undefined} updateHidden The value of the UI.UpdateHidden annotation on the entity set / type.
   * @returns {Expression<boolean>} The binding expression for the 'visible' property of the Edit button.
   */


  _exports.getDeleteButtonVisibility = getDeleteButtonVisibility;

  function getEditButtonVisibility(converterContext, updateHidden) {
    var _entitySet$annotation;

    var entitySet = converterContext.getEntitySet(),
        bIsDraftRoot = entitySet && ((_entitySet$annotation = entitySet.annotations.Common) === null || _entitySet$annotation === void 0 ? void 0 : _entitySet$annotation.DraftRoot) ? true : false,
        dataModelObjectPath = converterContext.getDataModelObjectPath(),
        visitedNavigationPaths = dataModelObjectPath.navigationProperties.map(function (navProp) {
      return navProp.name;
    }),
        // Set absolute binding path for Singleton references, otherwise the configured annotation path itself.
    // For e.g. /com.sap.namespace.EntityContainer/Singleton/Property to /Singleton/Property
    updateHiddenExpression = annotationExpression(updateHidden, visitedNavigationPaths, undefined, function (path) {
      return singletonPathVisitor(path, converterContext, visitedNavigationPaths);
    }),
        notEditableExpression = not(UI.IsEditable); // If UI.UpdateHidden annotation on entity set or type is either not defined or explicitly set to false,
    // Edit button is visible in display mode.
    // else,
    // Edit button is visible based on both annotation path and in display mode.

    var resultantExpression = ifElse(updateHidden === undefined || updateHidden.valueOf() === false, notEditableExpression, and(notEditableExpression, equal(updateHiddenExpression, false)));
    return ifElse(bIsDraftRoot, and(resultantExpression, Draft.HasNoDraftForCurrentUser), resultantExpression);
  }

  _exports.getEditButtonVisibility = getEditButtonVisibility;

  function getHeaderDefaultActions(converterContext) {
    var _entitySet$annotation2, _entitySet$annotation3, _entitySet$annotation4, _entitySet$annotation5, _entitySet$annotation6, _entitySet$annotation7, _entitySet$annotation8, _oEntityDeleteRestric;

    var entitySet = converterContext.getEntitySet(),
        entityType = converterContext.getEntityType(),
        oStickySessionSupported = entitySet && ((_entitySet$annotation2 = entitySet.annotations) === null || _entitySet$annotation2 === void 0 ? void 0 : (_entitySet$annotation3 = _entitySet$annotation2.Session) === null || _entitySet$annotation3 === void 0 ? void 0 : _entitySet$annotation3.StickySessionSupported),
        //for sticky app
    oDraftRoot = entitySet && ((_entitySet$annotation4 = entitySet.annotations.Common) === null || _entitySet$annotation4 === void 0 ? void 0 : _entitySet$annotation4.DraftRoot),
        oEntityDeleteRestrictions = entitySet && ((_entitySet$annotation5 = entitySet.annotations) === null || _entitySet$annotation5 === void 0 ? void 0 : (_entitySet$annotation6 = _entitySet$annotation5.Capabilities) === null || _entitySet$annotation6 === void 0 ? void 0 : _entitySet$annotation6.DeleteRestrictions),
        bUpdateHidden = entitySet && ((_entitySet$annotation7 = entitySet.annotations.UI) === null || _entitySet$annotation7 === void 0 ? void 0 : (_entitySet$annotation8 = _entitySet$annotation7.UpdateHidden) === null || _entitySet$annotation8 === void 0 ? void 0 : _entitySet$annotation8.valueOf()),
        dataModelObjectPath = converterContext.getDataModelObjectPath(),
        isParentDeletable = isPathDeletable(dataModelObjectPath),
        bParentEntitySetDeletable = isParentDeletable ? compileBinding(isParentDeletable) : isParentDeletable,
        headerDataFieldForActions = getIdentificationDataFieldForActions(converterContext.getEntityType(), false); // First add the "Critical" DataFieldForActions

    var headerActions = headerDataFieldForActions.filter(function (dataField) {
      return IMPORTANT_CRITICALITIES.indexOf(dataField === null || dataField === void 0 ? void 0 : dataField.Criticality) > -1;
    }).map(function (dataField) {
      var _dataField$annotation, _dataField$annotation2;

      return {
        type: ActionType.DataFieldForAction,
        annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
        key: KeyHelper.generateKeyFromDataField(dataField),
        visible: compileBinding(not(equal(annotationExpression((_dataField$annotation = dataField.annotations) === null || _dataField$annotation === void 0 ? void 0 : (_dataField$annotation2 = _dataField$annotation.UI) === null || _dataField$annotation2 === void 0 ? void 0 : _dataField$annotation2.Hidden), true))),
        isNavigable: true
      };
    }); // Then the edit action if it exists

    if (((oDraftRoot === null || oDraftRoot === void 0 ? void 0 : oDraftRoot.EditAction) || (oStickySessionSupported === null || oStickySessionSupported === void 0 ? void 0 : oStickySessionSupported.EditAction)) && bUpdateHidden !== true) {
      var _entitySet$annotation9, _entitySet$annotation10, _entitySet$annotation11, _entityType$annotatio7;

      var updateHidden = (entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation9 = entitySet.annotations.UI) === null || _entitySet$annotation9 === void 0 ? void 0 : (_entitySet$annotation10 = _entitySet$annotation9.UpdateHidden) === null || _entitySet$annotation10 === void 0 ? void 0 : _entitySet$annotation10.valueOf()) !== undefined ? entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation11 = entitySet.annotations.UI) === null || _entitySet$annotation11 === void 0 ? void 0 : _entitySet$annotation11.UpdateHidden : entityType === null || entityType === void 0 ? void 0 : (_entityType$annotatio7 = entityType.annotations.UI) === null || _entityType$annotatio7 === void 0 ? void 0 : _entityType$annotatio7.UpdateHidden;
      headerActions.push({
        type: ActionType.Primary,
        key: "EditAction",
        visible: compileBinding(getEditButtonVisibility(converterContext, updateHidden))
      });
    } // Then the delete action if we're not statically not deletable


    if (bParentEntitySetDeletable && bParentEntitySetDeletable !== "false" || (oEntityDeleteRestrictions === null || oEntityDeleteRestrictions === void 0 ? void 0 : (_oEntityDeleteRestric = oEntityDeleteRestrictions.Deletable) === null || _oEntityDeleteRestric === void 0 ? void 0 : _oEntityDeleteRestric.valueOf()) !== false && bParentEntitySetDeletable !== "false") {
      var _entitySet$annotation12, _entitySet$annotation13, _entitySet$annotation14, _entityType$annotatio8;

      var deleteHidden = (entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation12 = entitySet.annotations.UI) === null || _entitySet$annotation12 === void 0 ? void 0 : (_entitySet$annotation13 = _entitySet$annotation12.DeleteHidden) === null || _entitySet$annotation13 === void 0 ? void 0 : _entitySet$annotation13.valueOf()) !== undefined ? entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation14 = entitySet.annotations.UI) === null || _entitySet$annotation14 === void 0 ? void 0 : _entitySet$annotation14.DeleteHidden : entityType === null || entityType === void 0 ? void 0 : (_entityType$annotatio8 = entityType.annotations.UI) === null || _entityType$annotatio8 === void 0 ? void 0 : _entityType$annotatio8.DeleteHidden;
      headerActions.push({
        type: ActionType.Secondary,
        key: "DeleteAction",
        visible: compileBinding(getDeleteButtonVisibility(converterContext, deleteHidden)),
        parentEntityDeleteEnabled: bParentEntitySetDeletable
      });
    }

    if ((oDraftRoot === null || oDraftRoot === void 0 ? void 0 : oDraftRoot.EditAction) && bUpdateHidden !== true) {
      headerActions.push({
        type: ActionType.SwitchToActiveObject,
        key: "SwitchToActiveObject"
      });
      headerActions.push({
        type: ActionType.SwitchToDraftObject,
        key: "SwitchToDraftObject"
      });
    }

    var headerDataFieldForIBNActions = getIdentificationDataFieldForIBNActions(converterContext.getEntityType(), false);
    headerDataFieldForIBNActions.filter(function (dataField) {
      return IMPORTANT_CRITICALITIES.indexOf(dataField === null || dataField === void 0 ? void 0 : dataField.Criticality) === -1;
    }).map(function (dataField) {
      var _dataField$RequiresCo, _dataField$Inline, _dataField$Label, _dataField$annotation3, _dataField$annotation4, _dataField$annotation5, _dataField$Navigation;

      var oNavigationParams = {
        semanticObjectMapping: dataField.Mapping ? getSemanticObjectMapping(dataField.Mapping) : []
      };

      if (((_dataField$RequiresCo = dataField.RequiresContext) === null || _dataField$RequiresCo === void 0 ? void 0 : _dataField$RequiresCo.valueOf()) === true) {
        throw new Error("RequiresContext property should not be true for header IBN action : " + dataField.Label);
      } else if (((_dataField$Inline = dataField.Inline) === null || _dataField$Inline === void 0 ? void 0 : _dataField$Inline.valueOf()) === true) {
        throw new Error("Inline property should not be true for header IBN action : " + dataField.Label);
      }

      headerActions.push({
        type: ActionType.DataFieldForIntentBasedNavigation,
        text: (_dataField$Label = dataField.Label) === null || _dataField$Label === void 0 ? void 0 : _dataField$Label.toString(),
        annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
        buttonType: ButtonType.Ghost,
        visible: compileBinding(not(equal(annotationExpression((_dataField$annotation3 = dataField.annotations) === null || _dataField$annotation3 === void 0 ? void 0 : (_dataField$annotation4 = _dataField$annotation3.UI) === null || _dataField$annotation4 === void 0 ? void 0 : (_dataField$annotation5 = _dataField$annotation4.Hidden) === null || _dataField$annotation5 === void 0 ? void 0 : _dataField$annotation5.valueOf()), true))),
        enabled: dataField.NavigationAvailable !== undefined ? compileBinding(equal(annotationExpression((_dataField$Navigation = dataField.NavigationAvailable) === null || _dataField$Navigation === void 0 ? void 0 : _dataField$Navigation.valueOf()), true)) : true,
        key: KeyHelper.generateKeyFromDataField(dataField),
        isNavigable: true,
        press: compileBinding(fn("._intentBasedNavigation.navigate", [annotationExpression(dataField.SemanticObject), annotationExpression(dataField.Action), oNavigationParams])),
        customData: compileBinding({
          semanticObject: annotationExpression(dataField.SemanticObject),
          action: annotationExpression(dataField.Action)
        })
      });
    }); // Finally the non critical DataFieldForActions

    headerDataFieldForActions.filter(function (dataField) {
      return IMPORTANT_CRITICALITIES.indexOf(dataField === null || dataField === void 0 ? void 0 : dataField.Criticality) === -1;
    }).map(function (dataField) {
      var _dataField$annotation6, _dataField$annotation7;

      headerActions.push({
        type: ActionType.DataFieldForAction,
        annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
        key: KeyHelper.generateKeyFromDataField(dataField),
        visible: compileBinding(not(equal(annotationExpression((_dataField$annotation6 = dataField.annotations) === null || _dataField$annotation6 === void 0 ? void 0 : (_dataField$annotation7 = _dataField$annotation6.UI) === null || _dataField$annotation7 === void 0 ? void 0 : _dataField$annotation7.Hidden), true))),
        isNavigable: true
      });
    });
    return headerActions;
  }

  _exports.getHeaderDefaultActions = getHeaderDefaultActions;

  function getHiddenHeaderActions(converterContext) {
    var _entityType$annotatio9, _entityType$annotatio10, _entityType$annotatio11;

    var entityType = converterContext.getEntityType();
    var hiddenActions = ((_entityType$annotatio9 = entityType.annotations) === null || _entityType$annotatio9 === void 0 ? void 0 : (_entityType$annotatio10 = _entityType$annotatio9.UI) === null || _entityType$annotatio10 === void 0 ? void 0 : (_entityType$annotatio11 = _entityType$annotatio10.Identification) === null || _entityType$annotatio11 === void 0 ? void 0 : _entityType$annotatio11.filter(function (identificationDataField) {
      var _identificationDataFi12, _identificationDataFi13, _identificationDataFi14;

      return (identificationDataField === null || identificationDataField === void 0 ? void 0 : (_identificationDataFi12 = identificationDataField.annotations) === null || _identificationDataFi12 === void 0 ? void 0 : (_identificationDataFi13 = _identificationDataFi12.UI) === null || _identificationDataFi13 === void 0 ? void 0 : (_identificationDataFi14 = _identificationDataFi13.Hidden) === null || _identificationDataFi14 === void 0 ? void 0 : _identificationDataFi14.valueOf()) === true;
    })) || [];
    return hiddenActions.map(function (dataField) {
      return {
        type: ActionType.Default,
        key: KeyHelper.generateKeyFromDataField(dataField)
      };
    });
  }

  _exports.getHiddenHeaderActions = getHiddenHeaderActions;

  function getFooterDefaultActions(viewLevel, converterContext) {
    var _entitySet$annotation15, _entitySet$annotation16, _entitySet$annotation17, _entitySet$annotation18, _entitySet$annotation19, _entitySet$annotation20, _entitySet$annotation21;

    var entitySet = converterContext.getEntitySet();
    var entityType = converterContext.getEntityType();
    var oStickySessionSupported = entitySet && ((_entitySet$annotation15 = entitySet.annotations) === null || _entitySet$annotation15 === void 0 ? void 0 : (_entitySet$annotation16 = _entitySet$annotation15.Session) === null || _entitySet$annotation16 === void 0 ? void 0 : _entitySet$annotation16.StickySessionSupported),
        //for sticky app
    sEntitySetDraftRoot = entitySet && (((_entitySet$annotation17 = entitySet.annotations.Common) === null || _entitySet$annotation17 === void 0 ? void 0 : (_entitySet$annotation18 = _entitySet$annotation17.DraftRoot) === null || _entitySet$annotation18 === void 0 ? void 0 : _entitySet$annotation18.term) || ((_entitySet$annotation19 = entitySet.annotations) === null || _entitySet$annotation19 === void 0 ? void 0 : (_entitySet$annotation20 = _entitySet$annotation19.Session) === null || _entitySet$annotation20 === void 0 ? void 0 : (_entitySet$annotation21 = _entitySet$annotation20.StickySessionSupported) === null || _entitySet$annotation21 === void 0 ? void 0 : _entitySet$annotation21.term)),
        bConditionSave = sEntitySetDraftRoot === "com.sap.vocabularies.Common.v1.DraftRoot" || oStickySessionSupported && (oStickySessionSupported === null || oStickySessionSupported === void 0 ? void 0 : oStickySessionSupported.SaveAction),
        bConditionApply = viewLevel > 1,
        bConditionCancel = sEntitySetDraftRoot === "com.sap.vocabularies.Common.v1.DraftRoot" || oStickySessionSupported && (oStickySessionSupported === null || oStickySessionSupported === void 0 ? void 0 : oStickySessionSupported.DiscardAction); // Retrieve all determining actions

    var footerDataFieldForActions = getIdentificationDataFieldForActions(converterContext.getEntityType(), true); // First add the "Critical" DataFieldForActions

    var footerActions = footerDataFieldForActions.filter(function (dataField) {
      return IMPORTANT_CRITICALITIES.indexOf(dataField === null || dataField === void 0 ? void 0 : dataField.Criticality) > -1;
    }).map(function (dataField) {
      var _dataField$annotation8, _dataField$annotation9;

      return {
        type: ActionType.DataFieldForAction,
        annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
        key: KeyHelper.generateKeyFromDataField(dataField),
        visible: compileBinding(not(equal(annotationExpression((_dataField$annotation8 = dataField.annotations) === null || _dataField$annotation8 === void 0 ? void 0 : (_dataField$annotation9 = _dataField$annotation8.UI) === null || _dataField$annotation9 === void 0 ? void 0 : _dataField$annotation9.Hidden), true))),
        isNavigable: true
      };
    }); // Then the save action if it exists

    if ((entitySet === null || entitySet === void 0 ? void 0 : entitySet.entityTypeName) === (entityType === null || entityType === void 0 ? void 0 : entityType.fullyQualifiedName) && bConditionSave) {
      footerActions.push({
        type: ActionType.Primary,
        key: "SaveAction"
      });
    } // Then the apply action if it exists


    if (bConditionApply) {
      footerActions.push({
        type: ActionType.DefaultApply,
        key: "ApplyAction"
      });
    } // Then the non critical DataFieldForActions


    footerDataFieldForActions.filter(function (dataField) {
      return IMPORTANT_CRITICALITIES.indexOf(dataField === null || dataField === void 0 ? void 0 : dataField.Criticality) === -1;
    }).map(function (dataField) {
      var _dataField$annotation10, _dataField$annotation11;

      footerActions.push({
        type: ActionType.DataFieldForAction,
        annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
        key: KeyHelper.generateKeyFromDataField(dataField),
        visible: compileBinding(not(equal(annotationExpression((_dataField$annotation10 = dataField.annotations) === null || _dataField$annotation10 === void 0 ? void 0 : (_dataField$annotation11 = _dataField$annotation10.UI) === null || _dataField$annotation11 === void 0 ? void 0 : _dataField$annotation11.Hidden), true))),
        isNavigable: true
      });
    }); // Then the cancel action if it exists

    if (bConditionCancel) {
      footerActions.push({
        type: ActionType.Secondary,
        key: "CancelAction",
        position: {
          placement: Placement.End
        }
      });
    }

    return footerActions;
  }

  _exports.getFooterDefaultActions = getFooterDefaultActions;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlckFuZEZvb3RlckFjdGlvbi50cyJdLCJuYW1lcyI6WyJnZXRJZGVudGlmaWNhdGlvbkRhdGFGaWVsZEZvckFjdGlvbnMiLCJlbnRpdHlUeXBlIiwiYkRldGVybWluaW5nIiwiYW5ub3RhdGlvbnMiLCJVSSIsIklkZW50aWZpY2F0aW9uIiwiZmlsdGVyIiwiaWRlbnRpZmljYXRpb25EYXRhRmllbGQiLCJIaWRkZW4iLCJ2YWx1ZU9mIiwiJFR5cGUiLCJEZXRlcm1pbmluZyIsIkFjdGlvblRhcmdldCIsImlzQm91bmQiLCJDb3JlIiwiT3BlcmF0aW9uQXZhaWxhYmxlIiwiZ2V0SWRlbnRpZmljYXRpb25EYXRhRmllbGRGb3JJQk5BY3Rpb25zIiwiSU1QT1JUQU5UX0NSSVRJQ0FMSVRJRVMiLCJnZXREZWxldGVCdXR0b25WaXNpYmlsaXR5IiwiY29udmVydGVyQ29udGV4dCIsImRlbGV0ZUhpZGRlbiIsImRhdGFNb2RlbE9iamVjdFBhdGgiLCJnZXREYXRhTW9kZWxPYmplY3RQYXRoIiwidmlzaXRlZE5hdmlnYXRpb25QYXRocyIsIm5hdmlnYXRpb25Qcm9wZXJ0aWVzIiwibWFwIiwibmF2UHJvcCIsIm5hbWUiLCJkZWxldGVIaWRkZW5FeHByZXNzaW9uIiwiYW5ub3RhdGlvbkV4cHJlc3Npb24iLCJ1bmRlZmluZWQiLCJwYXRoIiwic2luZ2xldG9uUGF0aFZpc2l0b3IiLCJtYW5pZmVzdFdyYXBwZXIiLCJnZXRNYW5pZmVzdFdyYXBwZXIiLCJ2aWV3TGV2ZWwiLCJnZXRWaWV3TGV2ZWwiLCJlZGl0YWJsZUV4cHJlc3Npb24iLCJJc0VkaXRhYmxlIiwibm90IiwiaWZFbHNlIiwiYW5kIiwiZXF1YWwiLCJnZXRFZGl0QnV0dG9uVmlzaWJpbGl0eSIsInVwZGF0ZUhpZGRlbiIsImVudGl0eVNldCIsImdldEVudGl0eVNldCIsImJJc0RyYWZ0Um9vdCIsIkNvbW1vbiIsIkRyYWZ0Um9vdCIsInVwZGF0ZUhpZGRlbkV4cHJlc3Npb24iLCJub3RFZGl0YWJsZUV4cHJlc3Npb24iLCJyZXN1bHRhbnRFeHByZXNzaW9uIiwiRHJhZnQiLCJIYXNOb0RyYWZ0Rm9yQ3VycmVudFVzZXIiLCJnZXRIZWFkZXJEZWZhdWx0QWN0aW9ucyIsImdldEVudGl0eVR5cGUiLCJvU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCIsIlNlc3Npb24iLCJTdGlja3lTZXNzaW9uU3VwcG9ydGVkIiwib0RyYWZ0Um9vdCIsIm9FbnRpdHlEZWxldGVSZXN0cmljdGlvbnMiLCJDYXBhYmlsaXRpZXMiLCJEZWxldGVSZXN0cmljdGlvbnMiLCJiVXBkYXRlSGlkZGVuIiwiVXBkYXRlSGlkZGVuIiwiaXNQYXJlbnREZWxldGFibGUiLCJpc1BhdGhEZWxldGFibGUiLCJiUGFyZW50RW50aXR5U2V0RGVsZXRhYmxlIiwiY29tcGlsZUJpbmRpbmciLCJoZWFkZXJEYXRhRmllbGRGb3JBY3Rpb25zIiwiaGVhZGVyQWN0aW9ucyIsImRhdGFGaWVsZCIsImluZGV4T2YiLCJDcml0aWNhbGl0eSIsInR5cGUiLCJBY3Rpb25UeXBlIiwiRGF0YUZpZWxkRm9yQWN0aW9uIiwiYW5ub3RhdGlvblBhdGgiLCJnZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoIiwiZnVsbHlRdWFsaWZpZWROYW1lIiwia2V5IiwiS2V5SGVscGVyIiwiZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkIiwidmlzaWJsZSIsImlzTmF2aWdhYmxlIiwiRWRpdEFjdGlvbiIsInB1c2giLCJQcmltYXJ5IiwiRGVsZXRhYmxlIiwiRGVsZXRlSGlkZGVuIiwiU2Vjb25kYXJ5IiwicGFyZW50RW50aXR5RGVsZXRlRW5hYmxlZCIsIlN3aXRjaFRvQWN0aXZlT2JqZWN0IiwiU3dpdGNoVG9EcmFmdE9iamVjdCIsImhlYWRlckRhdGFGaWVsZEZvcklCTkFjdGlvbnMiLCJvTmF2aWdhdGlvblBhcmFtcyIsInNlbWFudGljT2JqZWN0TWFwcGluZyIsIk1hcHBpbmciLCJnZXRTZW1hbnRpY09iamVjdE1hcHBpbmciLCJSZXF1aXJlc0NvbnRleHQiLCJFcnJvciIsIkxhYmVsIiwiSW5saW5lIiwiRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uIiwidGV4dCIsInRvU3RyaW5nIiwiYnV0dG9uVHlwZSIsIkJ1dHRvblR5cGUiLCJHaG9zdCIsImVuYWJsZWQiLCJOYXZpZ2F0aW9uQXZhaWxhYmxlIiwicHJlc3MiLCJmbiIsIlNlbWFudGljT2JqZWN0IiwiQWN0aW9uIiwiY3VzdG9tRGF0YSIsInNlbWFudGljT2JqZWN0IiwiYWN0aW9uIiwiZ2V0SGlkZGVuSGVhZGVyQWN0aW9ucyIsImhpZGRlbkFjdGlvbnMiLCJEZWZhdWx0IiwiZ2V0Rm9vdGVyRGVmYXVsdEFjdGlvbnMiLCJzRW50aXR5U2V0RHJhZnRSb290IiwidGVybSIsImJDb25kaXRpb25TYXZlIiwiU2F2ZUFjdGlvbiIsImJDb25kaXRpb25BcHBseSIsImJDb25kaXRpb25DYW5jZWwiLCJEaXNjYXJkQWN0aW9uIiwiZm9vdGVyRGF0YUZpZWxkRm9yQWN0aW9ucyIsImZvb3RlckFjdGlvbnMiLCJlbnRpdHlUeXBlTmFtZSIsIkRlZmF1bHRBcHBseSIsInBvc2l0aW9uIiwicGxhY2VtZW50IiwiUGxhY2VtZW50IiwiRW5kIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7QUFVTyxXQUFTQSxvQ0FBVCxDQUE4Q0MsVUFBOUMsRUFBc0VDLFlBQXRFLEVBQXdIO0FBQUE7O0FBQzlILFdBQVEsMEJBQUFELFVBQVUsQ0FBQ0UsV0FBWCwwR0FBd0JDLEVBQXhCLDRHQUE0QkMsY0FBNUIsa0ZBQTRDQyxNQUE1QyxDQUFtRCxVQUFBQyx1QkFBdUIsRUFBSTtBQUFBOztBQUNyRixVQUFJLENBQUFBLHVCQUF1QixTQUF2QixJQUFBQSx1QkFBdUIsV0FBdkIscUNBQUFBLHVCQUF1QixDQUFFSixXQUF6QiwwR0FBc0NDLEVBQXRDLDRHQUEwQ0ksTUFBMUMsa0ZBQWtEQyxPQUFsRCxRQUFnRSxJQUFwRSxFQUEwRTtBQUFBOztBQUN6RSxZQUNDLENBQUFGLHVC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QUFBQSxRQUFRLEVBQUU7QUFBRUMsVUFBQUEsU0FBUyxFQUFFQyxTQUFTLENBQUNDO0FBQXZCO0FBSFEsT0FBbkI7QUFLQTs7QUFDRCxXQUFPTixhQUFQO0FBQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFjdGlvblR5cGUgfSBmcm9tIFwiLi4vTWFuaWZlc3RTZXR0aW5nc1wiO1xuaW1wb3J0IHsgRW50aXR5VHlwZSB9IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5pbXBvcnQgeyBBbm5vdGF0aW9uQWN0aW9uLCBCYXNlQWN0aW9uLCBCdXR0b25UeXBlLCBnZXRTZW1hbnRpY09iamVjdE1hcHBpbmcgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb250cm9scy9Db21tb24vQWN0aW9uXCI7XG5pbXBvcnQgeyBEYXRhRmllbGRGb3JBY3Rpb25UeXBlcywgRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uVHlwZXMsIFByb3BlcnR5QW5ub3RhdGlvblZhbHVlIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQgeyBQbGFjZW1lbnQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0NvbmZpZ3VyYWJsZU9iamVjdFwiO1xuaW1wb3J0IHsgYW5ub3RhdGlvbkV4cHJlc3Npb24sIGNvbXBpbGVCaW5kaW5nLCBub3QsIGVxdWFsLCBmbiwgRXhwcmVzc2lvbiwgYW5kLCBpZkVsc2UgfSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9CaW5kaW5nRXhwcmVzc2lvblwiO1xuaW1wb3J0IHsgS2V5SGVscGVyIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9LZXlcIjtcbmltcG9ydCB7IGlzUGF0aERlbGV0YWJsZSB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0RhdGFNb2RlbFBhdGhIZWxwZXJcIjtcbmltcG9ydCBDb252ZXJ0ZXJDb250ZXh0IGZyb20gXCIuLi9Db252ZXJ0ZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBEcmFmdCwgc2luZ2xldG9uUGF0aFZpc2l0b3IsIFVJIH0gZnJvbSBcIi4uL2hlbHBlcnMvQmluZGluZ0hlbHBlclwiO1xuXG4vKipcbiAqIFJldHJpZXZlcyBhbGwgdGhlIGRhdGEgZmllbGQgZm9yIGFjdGlvbnMgZm9yIHRoZSBpZGVudGlmaWNhdGlvbiBhbm5vdGF0aW9uXG4gKiBUaGV5IG11c3QgYmVcbiAqIC0gTm90IHN0YXRpY2FsbHkgaGlkZGVuXG4gKiAtIEVpdGhlciBsaW5rZWQgdG8gYW4gVW5ib3VuZCBhY3Rpb24gb3IgdG8gYW4gYWN0aW9uIHdoaWNoIGhhcyBhbiBPcGVyYXRpb25BdmFpbGFibGUgdGhhdCBpcyBub3Qgc2V0IHRvIGZhbHNlIHN0YXRpY2FsbHkuXG4gKlxuICogQHBhcmFtIHtFbnRpdHlUeXBlfSBlbnRpdHlUeXBlIFRoZSBjdXJyZW50IGVudGl0eSB0eXBlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IGJEZXRlcm1pbmluZyBUaGUgZmxhZyB3aGljaCBkZW5vdGVzIHdoZXRoZXIgb3Igbm90IHRoZSBhY3Rpb24gaXMgYSBkZXRlcm1pbmluZyBhY3Rpb25cbiAqIEByZXR1cm5zIHtEYXRhRmllbGRGb3JBY3Rpb25UeXBlc1tdfSBBbiBhcnJheSBvZiBEYXRhRmllbGQgZm9yIGFjdGlvbiByZXNwZWN0aW5nIHRoZSBpbnB1dCBwYXJhbWV0ZXIgJ2JEZXRlcm1pbmluZydcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldElkZW50aWZpY2F0aW9uRGF0YUZpZWxkRm9yQWN0aW9ucyhlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLCBiRGV0ZXJtaW5pbmc6IGJvb2xlYW4pOiBEYXRhRmllbGRGb3JBY3Rpb25UeXBlc1tdIHtcblx0cmV0dXJuIChlbnRpdHlUeXBlLmFubm90YXRpb25zPy5VST8uSWRlbnRpZmljYXRpb24/LmZpbHRlcihpZGVudGlmaWNhdGlvbkRhdGFGaWVsZCA9PiB7XG5cdFx0aWYgKGlkZW50aWZpY2F0aW9uRGF0YUZpZWxkPy5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpICE9PSB0cnVlKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGlkZW50aWZpY2F0aW9uRGF0YUZpZWxkPy4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRGb3JBY3Rpb25cIiAmJlxuXHRcdFx0XHQhIWlkZW50aWZpY2F0aW9uRGF0YUZpZWxkLkRldGVybWluaW5nID09PSBiRGV0ZXJtaW5pbmcgJiZcblx0XHRcdFx0KCFpZGVudGlmaWNhdGlvbkRhdGFGaWVsZD8uQWN0aW9uVGFyZ2V0Py5pc0JvdW5kIHx8XG5cdFx0XHRcdFx0aWRlbnRpZmljYXRpb25EYXRhRmllbGQ/LkFjdGlvblRhcmdldD8uYW5ub3RhdGlvbnM/LkNvcmU/Lk9wZXJhdGlvbkF2YWlsYWJsZT8udmFsdWVPZigpICE9PSBmYWxzZSlcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KSB8fCBbXSkgYXMgRGF0YUZpZWxkRm9yQWN0aW9uVHlwZXNbXTtcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSBhbGwgdGhlIElCTiBhY3Rpb25zIGZvciB0aGUgaWRlbnRpZmljYXRpb24gYW5ub3RhdGlvbi5cbiAqIFRoZXkgbXVzdCBiZVxuICogLSBOb3Qgc3RhdGljYWxseSBoaWRkZW4uXG4gKiBAcGFyYW0ge0VudGl0eVR5cGV9IGVudGl0eVR5cGUgVGhlIGN1cnJlbnQgZW50aXR5dHlwZVxuICogQHBhcmFtIHtib29sZWFufSBiRGV0ZXJtaW5pbmcgV2hldGhlciBvciBub3QgdGhlIGFjdGlvbiBzaG91bGQgYmUgZGV0ZXJtaW5pbmdcbiAqIEByZXR1cm5zIHtEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb25UeXBlc1tdfSBBbiBhcnJheSBvZiBkYXRhZmllbGQgZm9yIGFjdGlvbiByZXNwZWN0aW5nIHRoZSBiRGV0ZXJtaW5pbmcgcHJvcGVydHkuXG4gKi9cbmZ1bmN0aW9uIGdldElkZW50aWZpY2F0aW9uRGF0YUZpZWxkRm9ySUJOQWN0aW9ucyhlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLCBiRGV0ZXJtaW5pbmc6IGJvb2xlYW4pOiBEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb25UeXBlc1tdIHtcblx0cmV0dXJuIChlbnRpdHlUeXBlLmFubm90YXRpb25zPy5VST8uSWRlbnRpZmljYXRpb24/LmZpbHRlcihpZGVudGlmaWNhdGlvbkRhdGFGaWVsZCA9PiB7XG5cdFx0aWYgKGlkZW50aWZpY2F0aW9uRGF0YUZpZWxkPy5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpICE9PSB0cnVlKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGlkZW50aWZpY2F0aW9uRGF0YUZpZWxkPy4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb25cIiAmJlxuXHRcdFx0XHQhIWlkZW50aWZpY2F0aW9uRGF0YUZpZWxkLkRldGVybWluaW5nID09PSBiRGV0ZXJtaW5pbmdcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pIHx8IFtdKSBhcyBEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb25UeXBlc1tdO1xufVxuXG5jb25zdCBJTVBPUlRBTlRfQ1JJVElDQUxJVElFUyA9IFtcblx0XCJVSS5Dcml0aWNhbGl0eVR5cGUvVmVyeVBvc2l0aXZlXCIsXG5cdFwiVUkuQ3JpdGljYWxpdHlUeXBlL1Bvc2l0aXZlXCIsXG5cdFwiVUkuQ3JpdGljYWxpdHlUeXBlL05lZ2F0aXZlXCIsXG5cdFwiVUkuQ3JpdGljYWxpdHlUeXBlL1ZlcnlOZWdhdGl2ZVwiXG5dO1xuXG4vKipcbiAqIE1ldGhvZCB0byBkZXRlcm1pbmUgdGhlICd2aXNpYmxlJyBwcm9wZXJ0eSBiaW5kaW5nIGZvciB0aGUgRGVsZXRlIGJ1dHRvbiBvbiBhbiBvYmplY3QgcGFnZS5cbiAqXG4gKiBAcGFyYW0ge0NvbnZlcnRlckNvbnRleHR9IGNvbnZlcnRlckNvbnRleHQgSW5zdGFuY2Ugb2YgdGhlIGNvbnZlcnRlciBjb250ZXh0LlxuICogQHBhcmFtIHtQcm9wZXJ0eUFubm90YXRpb25WYWx1ZTxib29sZWFuPiB8IHVuZGVmaW5lZH0gZGVsZXRlSGlkZGVuIFRoZSB2YWx1ZSBvZiB0aGUgVUkuRGVsZXRlSGlkZGVuIGFubm90YXRpb24gb24gdGhlIGVudGl0eSBzZXQgLyB0eXBlLlxuICogQHJldHVybnMge0V4cHJlc3Npb248Ym9vbGVhbj59IFRoZSBiaW5kaW5nIGV4cHJlc3Npb24gZm9yIHRoZSAndmlzaWJsZScgcHJvcGVydHkgb2YgdGhlIERlbGV0ZSBidXR0b24uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWxldGVCdXR0b25WaXNpYmlsaXR5KFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRkZWxldGVIaWRkZW46IFByb3BlcnR5QW5ub3RhdGlvblZhbHVlPGJvb2xlYW4+IHwgdW5kZWZpbmVkXG4pOiBFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0Y29uc3QgZGF0YU1vZGVsT2JqZWN0UGF0aCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLFxuXHRcdHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMgPSBkYXRhTW9kZWxPYmplY3RQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLm1hcChuYXZQcm9wID0+IG5hdlByb3AubmFtZSksXG5cdFx0Ly8gU2V0IGFic29sdXRlIGJpbmRpbmcgcGF0aCBmb3IgU2luZ2xldG9uIHJlZmVyZW5jZXMsIG90aGVyd2lzZSB0aGUgY29uZmlndXJlZCBhbm5vdGF0aW9uIHBhdGggaXRzZWxmLlxuXHRcdC8vIEZvciBlLmcuIC9jb20uc2FwLm5hbWVzcGFjZS5FbnRpdHlDb250YWluZXIvU2luZ2xldG9uL1Byb3BlcnR5IHRvIC9TaW5nbGV0b24vUHJvcGVydHlcblx0XHRkZWxldGVIaWRkZW5FeHByZXNzaW9uOiBFeHByZXNzaW9uPGJvb2xlYW4gfCB1bmRlZmluZWQ+ID0gYW5ub3RhdGlvbkV4cHJlc3Npb24oXG5cdFx0XHRkZWxldGVIaWRkZW4sXG5cdFx0XHR2aXNpdGVkTmF2aWdhdGlvblBhdGhzLFxuXHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0KHBhdGg6IHN0cmluZykgPT4gc2luZ2xldG9uUGF0aFZpc2l0b3IocGF0aCwgY29udmVydGVyQ29udGV4dCwgdmlzaXRlZE5hdmlnYXRpb25QYXRocylcblx0XHQpLFxuXHRcdG1hbmlmZXN0V3JhcHBlciA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCksXG5cdFx0dmlld0xldmVsID0gbWFuaWZlc3RXcmFwcGVyLmdldFZpZXdMZXZlbCgpLFxuXHRcdC8vIERlbGV0ZSBidXR0b24gaXMgdmlzaWJsZVxuXHRcdC8vIEluIE9QIFx0XHQtLT4gIHdoZW4gbm90IGluIGVkaXQgbW9kZVxuXHRcdC8vIEluIHN1Yi1PUCBcdC0tPiAgd2hlbiBpbiBlZGl0IG1vZGVcblx0XHRlZGl0YWJsZUV4cHJlc3Npb246IEV4cHJlc3Npb248Ym9vbGVhbj4gPSB2aWV3TGV2ZWwgPiAxID8gVUkuSXNFZGl0YWJsZSA6IG5vdChVSS5Jc0VkaXRhYmxlKTtcblxuXHQvLyBJZiBVSS5EZWxldGVIaWRkZW4gYW5ub3RhdGlvbiBvbiBlbnRpdHkgc2V0IG9yIHR5cGUgaXMgZWl0aGVyIG5vdCBkZWZpbmVkIG9yIGV4cGxpY2l0bHkgc2V0IHRvIGZhbHNlLFxuXHQvLyBEZWxldGUgYnV0dG9uIGlzIHZpc2libGUgYmFzZWQgb24gZWRpdGFibGVFeHByZXNzaW9uLlxuXHQvLyBlbHNlLFxuXHQvLyBEZWxldGUgYnV0dG9uIGlzIHZpc2libGUgYmFzZWQgb24gYm90aCBhbm5vdGF0aW9uIHBhdGggYW5kIGVkaXRhYmxlRXhwcmVzc2lvbi5cblx0cmV0dXJuIGlmRWxzZShcblx0XHRkZWxldGVIaWRkZW4gPT09IHVuZGVmaW5lZCB8fCBkZWxldGVIaWRkZW4udmFsdWVPZigpID09PSBmYWxzZSxcblx0XHRlZGl0YWJsZUV4cHJlc3Npb24sXG5cdFx0YW5kKGVkaXRhYmxlRXhwcmVzc2lvbiwgZXF1YWwoZGVsZXRlSGlkZGVuRXhwcmVzc2lvbiwgZmFsc2UpKVxuXHQpO1xufVxuXG4vKipcbiAqIE1ldGhvZCB0byBkZXRlcm1pbmUgdGhlICd2aXNpYmxlJyBwcm9wZXJ0eSBiaW5kaW5nIGZvciB0aGUgRWRpdCBidXR0b24gb24gYW4gb2JqZWN0IHBhZ2UuXG4gKlxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0IEluc3RhbmNlIG9mIHRoZSBjb252ZXJ0ZXIgY29udGV4dC5cbiAqIEBwYXJhbSB7UHJvcGVydHlBbm5vdGF0aW9uVmFsdWU8Ym9vbGVhbj4gfCB1bmRlZmluZWR9IHVwZGF0ZUhpZGRlbiBUaGUgdmFsdWUgb2YgdGhlIFVJLlVwZGF0ZUhpZGRlbiBhbm5vdGF0aW9uIG9uIHRoZSBlbnRpdHkgc2V0IC8gdHlwZS5cbiAqIEByZXR1cm5zIHtFeHByZXNzaW9uPGJvb2xlYW4+fSBUaGUgYmluZGluZyBleHByZXNzaW9uIGZvciB0aGUgJ3Zpc2libGUnIHByb3BlcnR5IG9mIHRoZSBFZGl0IGJ1dHRvbi5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVkaXRCdXR0b25WaXNpYmlsaXR5KFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHR1cGRhdGVIaWRkZW46IFByb3BlcnR5QW5ub3RhdGlvblZhbHVlPGJvb2xlYW4+IHwgdW5kZWZpbmVkXG4pOiBFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0Y29uc3QgZW50aXR5U2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKSxcblx0XHRiSXNEcmFmdFJvb3QgPSBlbnRpdHlTZXQgJiYgZW50aXR5U2V0LmFubm90YXRpb25zLkNvbW1vbj8uRHJhZnRSb290ID8gdHJ1ZSA6IGZhbHNlLFxuXHRcdGRhdGFNb2RlbE9iamVjdFBhdGggPSBjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKSxcblx0XHR2aXNpdGVkTmF2aWdhdGlvblBhdGhzID0gZGF0YU1vZGVsT2JqZWN0UGF0aC5uYXZpZ2F0aW9uUHJvcGVydGllcy5tYXAobmF2UHJvcCA9PiBuYXZQcm9wLm5hbWUpLFxuXHRcdC8vIFNldCBhYnNvbHV0ZSBiaW5kaW5nIHBhdGggZm9yIFNpbmdsZXRvbiByZWZlcmVuY2VzLCBvdGhlcndpc2UgdGhlIGNvbmZpZ3VyZWQgYW5ub3RhdGlvbiBwYXRoIGl0c2VsZi5cblx0XHQvLyBGb3IgZS5nLiAvY29tLnNhcC5uYW1lc3BhY2UuRW50aXR5Q29udGFpbmVyL1NpbmdsZXRvbi9Qcm9wZXJ0eSB0byAvU2luZ2xldG9uL1Byb3BlcnR5XG5cdFx0dXBkYXRlSGlkZGVuRXhwcmVzc2lvbjogRXhwcmVzc2lvbjxib29sZWFuIHwgdW5kZWZpbmVkPiA9IGFubm90YXRpb25FeHByZXNzaW9uKFxuXHRcdFx0dXBkYXRlSGlkZGVuLFxuXHRcdFx0dmlzaXRlZE5hdmlnYXRpb25QYXRocyxcblx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdChwYXRoOiBzdHJpbmcpID0+IHNpbmdsZXRvblBhdGhWaXNpdG9yKHBhdGgsIGNvbnZlcnRlckNvbnRleHQsIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMpXG5cdFx0KSxcblx0XHRub3RFZGl0YWJsZUV4cHJlc3Npb246IEV4cHJlc3Npb248Ym9vbGVhbj4gPSBub3QoVUkuSXNFZGl0YWJsZSk7XG5cblx0Ly8gSWYgVUkuVXBkYXRlSGlkZGVuIGFubm90YXRpb24gb24gZW50aXR5IHNldCBvciB0eXBlIGlzIGVpdGhlciBub3QgZGVmaW5lZCBvciBleHBsaWNpdGx5IHNldCB0byBmYWxzZSxcblx0Ly8gRWRpdCBidXR0b24gaXMgdmlzaWJsZSBpbiBkaXNwbGF5IG1vZGUuXG5cdC8vIGVsc2UsXG5cdC8vIEVkaXQgYnV0dG9uIGlzIHZpc2libGUgYmFzZWQgb24gYm90aCBhbm5vdGF0aW9uIHBhdGggYW5kIGluIGRpc3BsYXkgbW9kZS5cblx0Y29uc3QgcmVzdWx0YW50RXhwcmVzc2lvbjogRXhwcmVzc2lvbjxib29sZWFuPiA9IGlmRWxzZShcblx0XHR1cGRhdGVIaWRkZW4gPT09IHVuZGVmaW5lZCB8fCB1cGRhdGVIaWRkZW4udmFsdWVPZigpID09PSBmYWxzZSxcblx0XHRub3RFZGl0YWJsZUV4cHJlc3Npb24sXG5cdFx0YW5kKG5vdEVkaXRhYmxlRXhwcmVzc2lvbiwgZXF1YWwodXBkYXRlSGlkZGVuRXhwcmVzc2lvbiwgZmFsc2UpKVxuXHQpO1xuXG5cdHJldHVybiBpZkVsc2UoYklzRHJhZnRSb290LCBhbmQocmVzdWx0YW50RXhwcmVzc2lvbiwgRHJhZnQuSGFzTm9EcmFmdEZvckN1cnJlbnRVc2VyKSwgcmVzdWx0YW50RXhwcmVzc2lvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFkZXJEZWZhdWx0QWN0aW9ucyhjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogQmFzZUFjdGlvbltdIHtcblx0Y29uc3QgZW50aXR5U2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKSxcblx0XHRlbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCksXG5cdFx0b1N0aWNreVNlc3Npb25TdXBwb3J0ZWQgPSBlbnRpdHlTZXQgJiYgZW50aXR5U2V0LmFubm90YXRpb25zPy5TZXNzaW9uPy5TdGlja3lTZXNzaW9uU3VwcG9ydGVkLCAvL2ZvciBzdGlja3kgYXBwXG5cdFx0b0RyYWZ0Um9vdCA9IGVudGl0eVNldCAmJiBlbnRpdHlTZXQuYW5ub3RhdGlvbnMuQ29tbW9uPy5EcmFmdFJvb3QsXG5cdFx0b0VudGl0eURlbGV0ZVJlc3RyaWN0aW9ucyA9IGVudGl0eVNldCAmJiBlbnRpdHlTZXQuYW5ub3RhdGlvbnM/LkNhcGFiaWxpdGllcz8uRGVsZXRlUmVzdHJpY3Rpb25zLFxuXHRcdGJVcGRhdGVIaWRkZW4gPSBlbnRpdHlTZXQgJiYgZW50aXR5U2V0LmFubm90YXRpb25zLlVJPy5VcGRhdGVIaWRkZW4/LnZhbHVlT2YoKSxcblx0XHRkYXRhTW9kZWxPYmplY3RQYXRoID0gY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCksXG5cdFx0aXNQYXJlbnREZWxldGFibGUgPSBpc1BhdGhEZWxldGFibGUoZGF0YU1vZGVsT2JqZWN0UGF0aCksXG5cdFx0YlBhcmVudEVudGl0eVNldERlbGV0YWJsZSA9IGlzUGFyZW50RGVsZXRhYmxlID8gY29tcGlsZUJpbmRpbmcoaXNQYXJlbnREZWxldGFibGUpIDogaXNQYXJlbnREZWxldGFibGUsXG5cdFx0aGVhZGVyRGF0YUZpZWxkRm9yQWN0aW9ucyA9IGdldElkZW50aWZpY2F0aW9uRGF0YUZpZWxkRm9yQWN0aW9ucyhjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKSwgZmFsc2UpO1xuXG5cdC8vIEZpcnN0IGFkZCB0aGUgXCJDcml0aWNhbFwiIERhdGFGaWVsZEZvckFjdGlvbnNcblx0Y29uc3QgaGVhZGVyQWN0aW9uczogQmFzZUFjdGlvbltdID0gaGVhZGVyRGF0YUZpZWxkRm9yQWN0aW9uc1xuXHRcdC5maWx0ZXIoZGF0YUZpZWxkID0+IHtcblx0XHRcdHJldHVybiBJTVBPUlRBTlRfQ1JJVElDQUxJVElFUy5pbmRleE9mKGRhdGFGaWVsZD8uQ3JpdGljYWxpdHkgYXMgc3RyaW5nKSA+IC0xO1xuXHRcdH0pXG5cdFx0Lm1hcChkYXRhRmllbGQgPT4ge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dHlwZTogQWN0aW9uVHlwZS5EYXRhRmllbGRGb3JBY3Rpb24sXG5cdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZGF0YUZpZWxkLmZ1bGx5UXVhbGlmaWVkTmFtZSksXG5cdFx0XHRcdGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChkYXRhRmllbGQpLFxuXHRcdFx0XHR2aXNpYmxlOiBjb21waWxlQmluZGluZyhub3QoZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24oZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuKSwgdHJ1ZSkpKSxcblx0XHRcdFx0aXNOYXZpZ2FibGU6IHRydWVcblx0XHRcdH07XG5cdFx0fSk7XG5cblx0Ly8gVGhlbiB0aGUgZWRpdCBhY3Rpb24gaWYgaXQgZXhpc3RzXG5cdGlmICgob0RyYWZ0Um9vdD8uRWRpdEFjdGlvbiB8fCBvU3RpY2t5U2Vzc2lvblN1cHBvcnRlZD8uRWRpdEFjdGlvbikgJiYgYlVwZGF0ZUhpZGRlbiAhPT0gdHJ1ZSkge1xuXHRcdGNvbnN0IHVwZGF0ZUhpZGRlbiA9IChlbnRpdHlTZXQ/LmFubm90YXRpb25zLlVJPy5VcGRhdGVIaWRkZW4/LnZhbHVlT2YoKSAhPT0gdW5kZWZpbmVkXG5cdFx0XHQ/IGVudGl0eVNldD8uYW5ub3RhdGlvbnMuVUk/LlVwZGF0ZUhpZGRlblxuXHRcdFx0OiBlbnRpdHlUeXBlPy5hbm5vdGF0aW9ucy5VST8uVXBkYXRlSGlkZGVuKSBhcyBQcm9wZXJ0eUFubm90YXRpb25WYWx1ZTxib29sZWFuPjtcblx0XHRoZWFkZXJBY3Rpb25zLnB1c2goe1xuXHRcdFx0dHlwZTogQWN0aW9uVHlwZS5QcmltYXJ5LFxuXHRcdFx0a2V5OiBcIkVkaXRBY3Rpb25cIixcblx0XHRcdHZpc2libGU6IGNvbXBpbGVCaW5kaW5nKGdldEVkaXRCdXR0b25WaXNpYmlsaXR5KGNvbnZlcnRlckNvbnRleHQsIHVwZGF0ZUhpZGRlbikpXG5cdFx0fSk7XG5cdH1cblx0Ly8gVGhlbiB0aGUgZGVsZXRlIGFjdGlvbiBpZiB3ZSdyZSBub3Qgc3RhdGljYWxseSBub3QgZGVsZXRhYmxlXG5cdGlmIChcblx0XHQoYlBhcmVudEVudGl0eVNldERlbGV0YWJsZSAmJiBiUGFyZW50RW50aXR5U2V0RGVsZXRhYmxlICE9PSBcImZhbHNlXCIpIHx8XG5cdFx0KG9FbnRpdHlEZWxldGVSZXN0cmljdGlvbnM/LkRlbGV0YWJsZT8udmFsdWVPZigpICE9PSBmYWxzZSAmJiBiUGFyZW50RW50aXR5U2V0RGVsZXRhYmxlICE9PSBcImZhbHNlXCIpXG5cdCkge1xuXHRcdGNvbnN0IGRlbGV0ZUhpZGRlbiA9IChlbnRpdHlTZXQ/LmFubm90YXRpb25zLlVJPy5EZWxldGVIaWRkZW4/LnZhbHVlT2YoKSAhPT0gdW5kZWZpbmVkXG5cdFx0XHQ/IGVudGl0eVNldD8uYW5ub3RhdGlvbnMuVUk/LkRlbGV0ZUhpZGRlblxuXHRcdFx0OiBlbnRpdHlUeXBlPy5hbm5vdGF0aW9ucy5VST8uRGVsZXRlSGlkZGVuKSBhcyBQcm9wZXJ0eUFubm90YXRpb25WYWx1ZTxib29sZWFuPjtcblx0XHRoZWFkZXJBY3Rpb25zLnB1c2goe1xuXHRcdFx0dHlwZTogQWN0aW9uVHlwZS5TZWNvbmRhcnksXG5cdFx0XHRrZXk6IFwiRGVsZXRlQWN0aW9uXCIsXG5cdFx0XHR2aXNpYmxlOiBjb21waWxlQmluZGluZyhnZXREZWxldGVCdXR0b25WaXNpYmlsaXR5KGNvbnZlcnRlckNvbnRleHQsIGRlbGV0ZUhpZGRlbikpLFxuXHRcdFx0cGFyZW50RW50aXR5RGVsZXRlRW5hYmxlZDogYlBhcmVudEVudGl0eVNldERlbGV0YWJsZVxuXHRcdH0pO1xuXHR9XG5cblx0aWYgKG9EcmFmdFJvb3Q/LkVkaXRBY3Rpb24gJiYgYlVwZGF0ZUhpZGRlbiAhPT0gdHJ1ZSkge1xuXHRcdGhlYWRlckFjdGlvbnMucHVzaCh7IHR5cGU6IEFjdGlvblR5cGUuU3dpdGNoVG9BY3RpdmVPYmplY3QsIGtleTogXCJTd2l0Y2hUb0FjdGl2ZU9iamVjdFwiIH0pO1xuXHRcdGhlYWRlckFjdGlvbnMucHVzaCh7IHR5cGU6IEFjdGlvblR5cGUuU3dpdGNoVG9EcmFmdE9iamVjdCwga2V5OiBcIlN3aXRjaFRvRHJhZnRPYmplY3RcIiB9KTtcblx0fVxuXG5cdGNvbnN0IGhlYWRlckRhdGFGaWVsZEZvcklCTkFjdGlvbnMgPSBnZXRJZGVudGlmaWNhdGlvbkRhdGFGaWVsZEZvcklCTkFjdGlvbnMoY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCksIGZhbHNlKTtcblxuXHRoZWFkZXJEYXRhRmllbGRGb3JJQk5BY3Rpb25zXG5cdFx0LmZpbHRlcihkYXRhRmllbGQgPT4ge1xuXHRcdFx0cmV0dXJuIElNUE9SVEFOVF9DUklUSUNBTElUSUVTLmluZGV4T2YoZGF0YUZpZWxkPy5Dcml0aWNhbGl0eSBhcyBzdHJpbmcpID09PSAtMTtcblx0XHR9KVxuXHRcdC5tYXAoZGF0YUZpZWxkID0+IHtcblx0XHRcdGNvbnN0IG9OYXZpZ2F0aW9uUGFyYW1zID0ge1xuXHRcdFx0XHRzZW1hbnRpY09iamVjdE1hcHBpbmc6IGRhdGFGaWVsZC5NYXBwaW5nID8gZ2V0U2VtYW50aWNPYmplY3RNYXBwaW5nKGRhdGFGaWVsZC5NYXBwaW5nKSA6IFtdXG5cdFx0XHR9O1xuXG5cdFx0XHRpZiAoZGF0YUZpZWxkLlJlcXVpcmVzQ29udGV4dD8udmFsdWVPZigpID09PSB0cnVlKSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlJlcXVpcmVzQ29udGV4dCBwcm9wZXJ0eSBzaG91bGQgbm90IGJlIHRydWUgZm9yIGhlYWRlciBJQk4gYWN0aW9uIDogXCIgKyBkYXRhRmllbGQuTGFiZWwpO1xuXHRcdFx0fSBlbHNlIGlmIChkYXRhRmllbGQuSW5saW5lPy52YWx1ZU9mKCkgPT09IHRydWUpIHtcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiSW5saW5lIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdHJ1ZSBmb3IgaGVhZGVyIElCTiBhY3Rpb24gOiBcIiArIGRhdGFGaWVsZC5MYWJlbCk7XG5cdFx0XHR9XG5cdFx0XHRoZWFkZXJBY3Rpb25zLnB1c2goe1xuXHRcdFx0XHR0eXBlOiBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbixcblx0XHRcdFx0dGV4dDogZGF0YUZpZWxkLkxhYmVsPy50b1N0cmluZygpLFxuXHRcdFx0XHRhbm5vdGF0aW9uUGF0aDogY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoKGRhdGFGaWVsZC5mdWxseVF1YWxpZmllZE5hbWUpLFxuXHRcdFx0XHRidXR0b25UeXBlOiBCdXR0b25UeXBlLkdob3N0LFxuXHRcdFx0XHR2aXNpYmxlOiBjb21waWxlQmluZGluZyhub3QoZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24oZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkpLCB0cnVlKSkpLFxuXHRcdFx0XHRlbmFibGVkOlxuXHRcdFx0XHRcdGRhdGFGaWVsZC5OYXZpZ2F0aW9uQXZhaWxhYmxlICE9PSB1bmRlZmluZWRcblx0XHRcdFx0XHRcdD8gY29tcGlsZUJpbmRpbmcoZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24oZGF0YUZpZWxkLk5hdmlnYXRpb25BdmFpbGFibGU/LnZhbHVlT2YoKSksIHRydWUpKVxuXHRcdFx0XHRcdFx0OiB0cnVlLFxuXHRcdFx0XHRrZXk6IEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQoZGF0YUZpZWxkKSxcblx0XHRcdFx0aXNOYXZpZ2FibGU6IHRydWUsXG5cdFx0XHRcdHByZXNzOiBjb21waWxlQmluZGluZyhcblx0XHRcdFx0XHRmbihcIi5faW50ZW50QmFzZWROYXZpZ2F0aW9uLm5hdmlnYXRlXCIsIFtcblx0XHRcdFx0XHRcdGFubm90YXRpb25FeHByZXNzaW9uKGRhdGFGaWVsZC5TZW1hbnRpY09iamVjdCksXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uRXhwcmVzc2lvbihkYXRhRmllbGQuQWN0aW9uKSxcblx0XHRcdFx0XHRcdG9OYXZpZ2F0aW9uUGFyYW1zXG5cdFx0XHRcdFx0XSlcblx0XHRcdFx0KSxcblx0XHRcdFx0Y3VzdG9tRGF0YTogY29tcGlsZUJpbmRpbmcoe1xuXHRcdFx0XHRcdHNlbWFudGljT2JqZWN0OiBhbm5vdGF0aW9uRXhwcmVzc2lvbihkYXRhRmllbGQuU2VtYW50aWNPYmplY3QpLFxuXHRcdFx0XHRcdGFjdGlvbjogYW5ub3RhdGlvbkV4cHJlc3Npb24oZGF0YUZpZWxkLkFjdGlvbilcblx0XHRcdFx0fSlcblx0XHRcdH0gYXMgQW5ub3RhdGlvbkFjdGlvbik7XG5cdFx0fSk7XG5cdC8vIEZpbmFsbHkgdGhlIG5vbiBjcml0aWNhbCBEYXRhRmllbGRGb3JBY3Rpb25zXG5cdGhlYWRlckRhdGFGaWVsZEZvckFjdGlvbnNcblx0XHQuZmlsdGVyKGRhdGFGaWVsZCA9PiB7XG5cdFx0XHRyZXR1cm4gSU1QT1JUQU5UX0NSSVRJQ0FMSVRJRVMuaW5kZXhPZihkYXRhRmllbGQ/LkNyaXRpY2FsaXR5IGFzIHN0cmluZykgPT09IC0xO1xuXHRcdH0pXG5cdFx0Lm1hcChkYXRhRmllbGQgPT4ge1xuXHRcdFx0aGVhZGVyQWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0dHlwZTogQWN0aW9uVHlwZS5EYXRhRmllbGRGb3JBY3Rpb24sXG5cdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZGF0YUZpZWxkLmZ1bGx5UXVhbGlmaWVkTmFtZSksXG5cdFx0XHRcdGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChkYXRhRmllbGQpLFxuXHRcdFx0XHR2aXNpYmxlOiBjb21waWxlQmluZGluZyhub3QoZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24oZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuKSwgdHJ1ZSkpKSxcblx0XHRcdFx0aXNOYXZpZ2FibGU6IHRydWVcblx0XHRcdH0gYXMgQW5ub3RhdGlvbkFjdGlvbik7XG5cdFx0fSk7XG5cblx0cmV0dXJuIGhlYWRlckFjdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIaWRkZW5IZWFkZXJBY3Rpb25zKGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBCYXNlQWN0aW9uW10ge1xuXHRjb25zdCBlbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCk7XG5cdGNvbnN0IGhpZGRlbkFjdGlvbnMgPSAoZW50aXR5VHlwZS5hbm5vdGF0aW9ucz8uVUk/LklkZW50aWZpY2F0aW9uPy5maWx0ZXIoaWRlbnRpZmljYXRpb25EYXRhRmllbGQgPT4ge1xuXHRcdHJldHVybiBpZGVudGlmaWNhdGlvbkRhdGFGaWVsZD8uYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4/LnZhbHVlT2YoKSA9PT0gdHJ1ZTtcblx0fSkgfHwgW10pIGFzIERhdGFGaWVsZEZvckFjdGlvblR5cGVzW107XG5cdHJldHVybiBoaWRkZW5BY3Rpb25zLm1hcChkYXRhRmllbGQgPT4ge1xuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBBY3Rpb25UeXBlLkRlZmF1bHQsXG5cdFx0XHRrZXk6IEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQoZGF0YUZpZWxkKVxuXHRcdH07XG5cdH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9vdGVyRGVmYXVsdEFjdGlvbnModmlld0xldmVsOiBudW1iZXIsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBCYXNlQWN0aW9uW10ge1xuXHRjb25zdCBlbnRpdHlTZXQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldCgpO1xuXHRjb25zdCBlbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCk7XG5cdGNvbnN0IG9TdGlja3lTZXNzaW9uU3VwcG9ydGVkID0gZW50aXR5U2V0ICYmIGVudGl0eVNldC5hbm5vdGF0aW9ucz8uU2Vzc2lvbj8uU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCwgLy9mb3Igc3RpY2t5IGFwcFxuXHRcdHNFbnRpdHlTZXREcmFmdFJvb3QgPVxuXHRcdFx0ZW50aXR5U2V0ICYmIChlbnRpdHlTZXQuYW5ub3RhdGlvbnMuQ29tbW9uPy5EcmFmdFJvb3Q/LnRlcm0gfHwgZW50aXR5U2V0LmFubm90YXRpb25zPy5TZXNzaW9uPy5TdGlja3lTZXNzaW9uU3VwcG9ydGVkPy50ZXJtKSxcblx0XHRiQ29uZGl0aW9uU2F2ZSA9XG5cdFx0XHRzRW50aXR5U2V0RHJhZnRSb290ID09PSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW1vbi52MS5EcmFmdFJvb3RcIiB8fFxuXHRcdFx0KG9TdGlja3lTZXNzaW9uU3VwcG9ydGVkICYmIG9TdGlja3lTZXNzaW9uU3VwcG9ydGVkPy5TYXZlQWN0aW9uKSxcblx0XHRiQ29uZGl0aW9uQXBwbHkgPSB2aWV3TGV2ZWwgPiAxLFxuXHRcdGJDb25kaXRpb25DYW5jZWwgPVxuXHRcdFx0c0VudGl0eVNldERyYWZ0Um9vdCA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuRHJhZnRSb290XCIgfHxcblx0XHRcdChvU3RpY2t5U2Vzc2lvblN1cHBvcnRlZCAmJiBvU3RpY2t5U2Vzc2lvblN1cHBvcnRlZD8uRGlzY2FyZEFjdGlvbik7XG5cblx0Ly8gUmV0cmlldmUgYWxsIGRldGVybWluaW5nIGFjdGlvbnNcblx0Y29uc3QgZm9vdGVyRGF0YUZpZWxkRm9yQWN0aW9ucyA9IGdldElkZW50aWZpY2F0aW9uRGF0YUZpZWxkRm9yQWN0aW9ucyhjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKSwgdHJ1ZSk7XG5cblx0Ly8gRmlyc3QgYWRkIHRoZSBcIkNyaXRpY2FsXCIgRGF0YUZpZWxkRm9yQWN0aW9uc1xuXHRjb25zdCBmb290ZXJBY3Rpb25zOiBCYXNlQWN0aW9uW10gPSBmb290ZXJEYXRhRmllbGRGb3JBY3Rpb25zXG5cdFx0LmZpbHRlcihkYXRhRmllbGQgPT4ge1xuXHRcdFx0cmV0dXJuIElNUE9SVEFOVF9DUklUSUNBTElUSUVTLmluZGV4T2YoZGF0YUZpZWxkPy5Dcml0aWNhbGl0eSBhcyBzdHJpbmcpID4gLTE7XG5cdFx0fSlcblx0XHQubWFwKGRhdGFGaWVsZCA9PiB7XG5cdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHR0eXBlOiBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckFjdGlvbixcblx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChkYXRhRmllbGQuZnVsbHlRdWFsaWZpZWROYW1lKSxcblx0XHRcdFx0a2V5OiBLZXlIZWxwZXIuZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkKGRhdGFGaWVsZCksXG5cdFx0XHRcdHZpc2libGU6IGNvbXBpbGVCaW5kaW5nKG5vdChlcXVhbChhbm5vdGF0aW9uRXhwcmVzc2lvbihkYXRhRmllbGQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4pLCB0cnVlKSkpLFxuXHRcdFx0XHRpc05hdmlnYWJsZTogdHJ1ZVxuXHRcdFx0fTtcblx0XHR9KTtcblxuXHQvLyBUaGVuIHRoZSBzYXZlIGFjdGlvbiBpZiBpdCBleGlzdHNcblx0aWYgKGVudGl0eVNldD8uZW50aXR5VHlwZU5hbWUgPT09IGVudGl0eVR5cGU/LmZ1bGx5UXVhbGlmaWVkTmFtZSAmJiBiQ29uZGl0aW9uU2F2ZSkge1xuXHRcdGZvb3RlckFjdGlvbnMucHVzaCh7IHR5cGU6IEFjdGlvblR5cGUuUHJpbWFyeSwga2V5OiBcIlNhdmVBY3Rpb25cIiB9KTtcblx0fVxuXG5cdC8vIFRoZW4gdGhlIGFwcGx5IGFjdGlvbiBpZiBpdCBleGlzdHNcblx0aWYgKGJDb25kaXRpb25BcHBseSkge1xuXHRcdGZvb3RlckFjdGlvbnMucHVzaCh7IHR5cGU6IEFjdGlvblR5cGUuRGVmYXVsdEFwcGx5LCBrZXk6IFwiQXBwbHlBY3Rpb25cIiB9KTtcblx0fVxuXG5cdC8vIFRoZW4gdGhlIG5vbiBjcml0aWNhbCBEYXRhRmllbGRGb3JBY3Rpb25zXG5cdGZvb3RlckRhdGFGaWVsZEZvckFjdGlvbnNcblx0XHQuZmlsdGVyKGRhdGFGaWVsZCA9PiB7XG5cdFx0XHRyZXR1cm4gSU1QT1JUQU5UX0NSSVRJQ0FMSVRJRVMuaW5kZXhPZihkYXRhRmllbGQ/LkNyaXRpY2FsaXR5IGFzIHN0cmluZykgPT09IC0xO1xuXHRcdH0pXG5cdFx0Lm1hcChkYXRhRmllbGQgPT4ge1xuXHRcdFx0Zm9vdGVyQWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0dHlwZTogQWN0aW9uVHlwZS5EYXRhRmllbGRGb3JBY3Rpb24sXG5cdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZGF0YUZpZWxkLmZ1bGx5UXVhbGlmaWVkTmFtZSksXG5cdFx0XHRcdGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChkYXRhRmllbGQpLFxuXHRcdFx0XHR2aXNpYmxlOiBjb21waWxlQmluZGluZyhub3QoZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24oZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuKSwgdHJ1ZSkpKSxcblx0XHRcdFx0aXNOYXZpZ2FibGU6IHRydWVcblx0XHRcdH0gYXMgQW5ub3RhdGlvbkFjdGlvbik7XG5cdFx0fSk7XG5cblx0Ly8gVGhlbiB0aGUgY2FuY2VsIGFjdGlvbiBpZiBpdCBleGlzdHNcblx0aWYgKGJDb25kaXRpb25DYW5jZWwpIHtcblx0XHRmb290ZXJBY3Rpb25zLnB1c2goe1xuXHRcdFx0dHlwZTogQWN0aW9uVHlwZS5TZWNvbmRhcnksXG5cdFx0XHRrZXk6IFwiQ2FuY2VsQWN0aW9uXCIsXG5cdFx0XHRwb3NpdGlvbjogeyBwbGFjZW1lbnQ6IFBsYWNlbWVudC5FbmQgfVxuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBmb290ZXJBY3Rpb25zO1xufVxuIl19