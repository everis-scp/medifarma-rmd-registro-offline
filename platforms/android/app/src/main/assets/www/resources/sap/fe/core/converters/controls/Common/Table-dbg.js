/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../ManifestSettings", "../../helpers/ID", "sap/fe/core/converters/controls/Common/Action", "sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/converters/annotations/DataField", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/BindingHelper", "sap/fe/core/converters/helpers/Key", "sap/fe/core/formatters/TableFormatter", "sap/fe/core/formatters/TableFormatterTypes", "sap/fe/core/templating/DataModelPathHelper", "sap/fe/core/helpers/StableIdHelper", "sap/fe/core/converters/helpers/IssueManager", "sap/fe/core/templating/PropertyHelper", "../../helpers/Aggregation", "sap/fe/core/templating/UIFormatters", "./Criticality"], function (ManifestSettings, ID, Action, ConfigurableObject, DataField, BindingExpression, BindingHelper, Key, tableFormatters, TableFormatterTypes, DataModelPathHelper, StableIdHelper, IssueManager, PropertyHelper, Aggregation, UIFormatters, Criticality) {
  "use strict";

  var _exports = {};
  var getMessageTypeFromCriticalityType = Criticality.getMessageTypeFromCriticalityType;
  var getDisplayMode = UIFormatters.getDisplayMode;
  var AggregationHelper = Aggregation.AggregationHelper;
  var getTargetValueOnDataPoint = PropertyHelper.getTargetValueOnDataPoint;
  var isPathExpression = PropertyHelper.isPathExpression;
  var getAssociatedCurrencyProperty = PropertyHelper.getAssociatedCurrencyProperty;
  var getAssociatedUnitProperty = PropertyHelper.getAssociatedUnitProperty;
  var isProperty = PropertyHelper.isProperty;
  var IssueType = IssueManager.IssueType;
  var IssueSeverity = IssueManager.IssueSeverity;
  var IssueCategory = IssueManager.IssueCategory;
  var replaceSpecialChars = StableIdHelper.replaceSpecialChars;
  var isPathUpdatable = DataModelPathHelper.isPathUpdatable;
  var isPathInsertable = DataModelPathHelper.isPathInsertable;
  var isPathDeletable = DataModelPathHelper.isPathDeletable;
  var getTargetObjectPath = DataModelPathHelper.getTargetObjectPath;
  var MessageType = TableFormatterTypes.MessageType;
  var KeyHelper = Key.KeyHelper;
  var UI = BindingHelper.UI;
  var singletonPathVisitor = BindingHelper.singletonPathVisitor;
  var Draft = BindingHelper.Draft;
  var resolveBindingString = BindingExpression.resolveBindingString;
  var or = BindingExpression.or;
  var not = BindingExpression.not;
  var isConstant = BindingExpression.isConstant;
  var isBinding = BindingExpression.isBinding;
  var ifElse = BindingExpression.ifElse;
  var formatResult = BindingExpression.formatResult;
  var equal = BindingExpression.equal;
  var constant = BindingExpression.constant;
  var compileBinding = BindingExpression.compileBinding;
  var bindingExpression = BindingExpression.bindingExpression;
  var annotationExpression = BindingExpression.annotationExpression;
  var and = BindingExpression.and;
  var isDataFieldTypes = DataField.isDataFieldTypes;
  var isDataFieldForActionAbstract = DataField.isDataFieldForActionAbstract;
  var isDataFieldAlwaysHidden = DataField.isDataFieldAlwaysHidden;
  var getSemanticObjectPath = DataField.getSemanticObjectPath;
  var collectRelatedPropertiesRecursively = DataField.collectRelatedPropertiesRecursively;
  var collectRelatedProperties = DataField.collectRelatedProperties;
  var Placement = ConfigurableObject.Placement;
  var insertCustomElements = ConfigurableObject.insertCustomElements;
  var removeDuplicateActions = Action.removeDuplicateActions;
  var isActionNavigable = Action.isActionNavigable;
  var getActionsFromManifest = Action.getActionsFromManifest;
  var TableID = ID.TableID;
  var VisualizationType = ManifestSettings.VisualizationType;
  var VariantManagementType = ManifestSettings.VariantManagementType;
  var TemplateType = ManifestSettings.TemplateType;
  var SelectionMode = ManifestSettings.SelectionMode;
  var HorizontalAlign = ManifestSettings.HorizontalAlign;
  var CreationMode = ManifestSettings.CreationMode;
  var AvailabilityType = ManifestSettings.AvailabilityType;
  var ActionType = ManifestSettings.ActionType;

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

  function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

  function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  var ColumnType;

  (function (ColumnType) {
    ColumnType["Default"] = "Default";
    ColumnType["Annotation"] = "Annotation";
    ColumnType["Slot"] = "Slot";
  })(ColumnType || (ColumnType = {}));

  /**
   * Returns an array of all annotation based and manifest based table actions.
   *
   * @param {LineItem} lineItemAnnotation
   * @param {string} visualizationPath
   * @param {ConverterContext} converterContext
   * @param {NavigationSettingsConfiguration} navigationSettings
   * @returns {BaseAction} The complete table actions
   */
  function getTableActions(lineItemAnnotation, visualizationPath, converterContext, navigationSettings) {
    var aTableActions = getTableAnnotationActions(lineItemAnnotation, visualizationPath, converterContext);
    var aAnnotationActions = aTableActions.tableActions;
    var aHiddenActions = aTableActions.hiddenTableActions;
    return insertCustomElements(aAnnotationActions, getActionsFromManifest(converterContext.getManifestControlConfiguration(visualizationPath).actions, converterContext, aAnnotationActions, navigationSettings, true, aHiddenActions), {
      isNavigable: "overwrite",
      enableOnSelect: "overwrite",
      enableAutoScroll: "overwrite",
      enabled: "overwrite",
      defaultValuesExtensionFunction: "overwrite"
    });
  }
  /**
   * Returns an array of all columns, annotation-based as well as manifest based.
   * They are sorted and some properties can be overwritten via the manifest (check out the keys that can be overwritten).
   *
   * @param {LineItem} lineItemAnnotation Collection of data fields for representation in a table or list
   * @param {string} visualizationPath
   * @param {ConverterContext} converterContext
   * @param {NavigationSettingsConfiguration} navigationSettings
   * @returns {TableColumn[]} Returns all table columns that should be available, regardless of templating or personalization or their origin
   */


  _exports.getTableActions = getTableActions;

  function getTableColumns(lineItemAnnotation, visualizationPath, converterContext, navigationSettings) {
    var annotationColumns = getColumnsFromAnnotations(lineItemAnnotation, visualizationPath, converterContext);
    var manifestColumns = getColumnsFromManifest(converterContext.getManifestControlConfiguration(visualizationPath).columns, annotationColumns, converterContext, converterContext.getAnnotationEntityType(lineItemAnnotation), navigationSettings);
    return insertCustomElements(annotationColumns, manifestColumns, {
      width: "overwrite",
      isNavigable: "overwrite",
      availability: "overwrite",
      settings: "overwrite",
      horizontalAlign: "overwrite",
      formatOptions: "overwrite"
    });
  }
  /**
   * Retrieve the custom aggregation definitions from the entityType.
   *
   * @param entityType The target entity type.
   * @param tableColumns The array of columns for the entity type.
   * @param converterContext The converter context.
   * @returns The aggregate definitions from the entityType, or undefined if the entity doesn't support analytical queries.
   */


  _exports.getTableColumns = getTableColumns;

  var getAggregateDefinitionsFromEntityType = function (entityType, tableColumns, converterContext) {
    var aggregationHelper = new AggregationHelper(entityType, converterContext);

    function findColumnFromPath(path) {
      return tableColumns.find(function (column) {
        var annotationColumn = column;
        return annotationColumn.propertyInfos === undefined && annotationColumn.relativePath === path;
      });
    }

    if (!aggregationHelper.isAnalyticsSupported()) {
      return undefined;
    } // Keep a set of all currency/unit properties, as we don't want to consider them as aggregates
    // They are aggregates for technical reasons (to manage multi-units situations) but it doesn't make sense from a user standpoint


    var mCurrencyOrUnitProperties = new Set();
    tableColumns.forEach(function (oColumn) {
      var oTableColumn = oColumn;

      if (oTableColumn.unit) {
        mCurrencyOrUnitProperties.add(oTableColumn.unit);
      }
    });
    var mRawDefinitions = aggregationHelper.getCustomAggregateDefinitions();
    var mResult = {};
    tableColumns.forEach(function (oColumn) {
      var oTableColumn = oColumn;

      if (oTableColumn.propertyInfos === undefined && oTableColumn.relativePath) {
        var aRawContextDefiningProperties = mRawDefinitions[oTableColumn.relativePath]; // Ignore aggregates corresponding to currencies or units of measure and dummy created property for datapoint target Value

        if (aRawContextDefiningProperties && !mCurrencyOrUnitProperties.has(oTableColumn.name) && !oTableColumn.isDataPointFakeTargetProperty) {
          mResult[oTableColumn.name] = {
            defaultAggregate: {},
            relativePath: oTableColumn.relativePath
          };
          var aContextDefiningProperties = [];
          aRawContextDefiningProperties.forEach(function (contextDefiningPropertyName) {
            var oColumn = findColumnFromPath(contextDefiningPropertyName);

            if (oColumn) {
              aContextDefiningProperties.push(oColumn.name);
            }
          });

          if (aContextDefiningProperties.length) {
            mResult[oTableColumn.name].defaultAggregate.contextDefiningProperties = aContextDefiningProperties;
          }
        }
      }
    });
    return mResult;
  };
  /**
   * Updates a table visualization for analytical use cases.
   *
   * @param tableVisualization The visualization to be updated
   * @param entityType The entity type displayed in the table
   * @param converterContext The converter context
   * @param presentationVariantAnnotation The presentationVariant annotation (if any)
   */


  _exports.getAggregateDefinitionsFromEntityType = getAggregateDefinitionsFromEntityType;

  function updateTableVisualizationForAnalytics(tableVisualization, entityType, converterContext, presentationVariantAnnotation) {
    if (tableVisualization.control.type === "AnalyticalTable") {
      var aggregatesDefinitions = getAggregateDefinitionsFromEntityType(entityType, tableVisualization.columns, converterContext);

      if (aggregatesDefinitions) {
        tableVisualization.enableAnalytics = true;
        tableVisualization.aggregates = aggregatesDefinitions; // Add group and sort conditions from the presentation variant

        tableVisualization.annotation.groupConditions = getGroupConditions(presentationVariantAnnotation, tableVisualization.columns);
        tableVisualization.annotation.aggregateConditions = getAggregateConditions(presentationVariantAnnotation, tableVisualization.columns);
      }

      tableVisualization.control.type = "GridTable"; // AnalyticalTable isn't a real type for the MDC:Table, so we always switch back to Grid
    }
  }
  /**
   * Get the navigation target path from manifest settings.
   *
   * @param converterContext The converter context
   * @param navigationPropertyPath The navigation path to check in the manifest settings
   * @returns Navigation path from manifest settings
   */


  function getNavigationTargetPath(converterContext, navigationPropertyPath) {
    var manifestWrapper = converterContext.getManifestWrapper();

    if (navigationPropertyPath && manifestWrapper.getNavigationConfiguration(navigationPropertyPath)) {
      var navConfig = manifestWrapper.getNavigationConfiguration(navigationPropertyPath);

      if (Object.keys(navConfig).length > 0) {
        return navigationPropertyPath;
      }
    }

    var dataModelPath = converterContext.getDataModelObjectPath();
    var contextPath = converterContext.getContextPath();
    var navConfigForContextPath = manifestWrapper.getNavigationConfiguration(contextPath);

    if (navConfigForContextPath && Object.keys(navConfigForContextPath).length > 0) {
      return contextPath;
    }

    return dataModelPath.targetEntitySet ? dataModelPath.targetEntitySet.name : dataModelPath.startingEntitySet.name;
  }
  /**
   * Sets the 'unit' and 'textArrangement' properties in columns when necessary.
   *
   * @param entityType The entity type displayed in the table
   * @param tableColumns The columns to be updated
   */


  function updateLinkedProperties(entityType, tableColumns) {
    function findColumnByPath(path) {
      return tableColumns.find(function (column) {
        var annotationColumn = column;
        return annotationColumn.propertyInfos === undefined && annotationColumn.relativePath === path;
      });
    }

    tableColumns.forEach(function (oColumn) {
      var oTableColumn = oColumn;

      if (oTableColumn.propertyInfos === undefined && oTableColumn.relativePath) {
        var oProperty = entityType.entityProperties.find(function (oProp) {
          return oProp.name === oTableColumn.relativePath;
        });

        if (oProperty) {
          var _getAssociatedCurrenc, _getAssociatedUnitPro, _oProperty$annotation;

          var sUnit = ((_getAssociatedCurrenc = getAssociatedCurrencyProperty(oProperty)) === null || _getAssociatedCurrenc === void 0 ? void 0 : _getAssociatedCurrenc.name) || ((_getAssociatedUnitPro = getAssociatedUnitProperty(oProperty)) === null || _getAssociatedUnitPro === void 0 ? void 0 : _getAssociatedUnitPro.name);

          if (sUnit) {
            var oUnitColumn = findColumnByPath(sUnit);
            oTableColumn.unit = oUnitColumn === null || oUnitColumn === void 0 ? void 0 : oUnitColumn.name;
          }

          var displayMode = getDisplayMode(oProperty),
              textAnnotation = (_oProperty$annotation = oProperty.annotations.Common) === null || _oProperty$annotation === void 0 ? void 0 : _oProperty$annotation.Text;

          if (isPathExpression(textAnnotation) && displayMode !== "Value") {
            var oTextColumn = findColumnByPath(textAnnotation.path);

            if (oTextColumn && oTextColumn.name !== oTableColumn.name) {
              oTableColumn.textArrangement = {
                textProperty: oTextColumn.name,
                mode: displayMode
              };
            }
          }
        }
      }
    });
  }

  _exports.updateLinkedProperties = updateLinkedProperties;

  function createTableVisualization(lineItemAnnotation, visualizationPath, converterContext, presentationVariantAnnotation, isCondensedTableLayoutCompliant, viewConfiguration) {
    var tableManifestConfig = getTableManifestConfiguration(lineItemAnnotation, visualizationPath, converterContext, isCondensedTableLayoutCompliant);

    var _splitPath = splitPath(visualizationPath),
        navigationPropertyPath = _splitPath.navigationPropertyPath;

    var navigationTargetPath = getNavigationTargetPath(converterContext, navigationPropertyPath);
    var navigationSettings = converterContext.getManifestWrapper().getNavigationConfiguration(navigationTargetPath);
    var columns = getTableColumns(lineItemAnnotation, visualizationPath, converterContext, navigationSettings);
    var oVisualization = {
      type: VisualizationType.Table,
      annotation: getTableAnnotationConfiguration(lineItemAnnotation, visualizationPath, converterContext, tableManifestConfig, columns, presentationVariantAnnotation, viewConfiguration),
      control: tableManifestConfig,
      actions: removeDuplicateActions(getTableActions(lineItemAnnotation, visualizationPath, converterContext, navigationSettings)),
      columns: columns,
      enableDataStateFilter: converterContext.getTemplateType() === "ObjectPage",
      operationAvailableMap: getOperationAvailableMap(lineItemAnnotation)
    };
    updateLinkedProperties(converterContext.getAnnotationEntityType(lineItemAnnotation), columns);
    updateTableVisualizationForAnalytics(oVisualization, converterContext.getAnnotationEntityType(lineItemAnnotation), converterContext, presentationVariantAnnotation);
    return oVisualization;
  }

  _exports.createTableVisualization = createTableVisualization;

  function createDefaultTableVisualization(converterContext) {
    var tableManifestConfig = getTableManifestConfiguration(undefined, "", converterContext, false);
    var columns = getColumnsFromEntityType({}, converterContext.getEntityType(), [], [], converterContext, tableManifestConfig.type);
    var oVisualization = {
      type: VisualizationType.Table,
      annotation: getTableAnnotationConfiguration(undefined, "", converterContext, tableManifestConfig, columns),
      control: tableManifestConfig,
      actions: [],
      columns: columns,
      enableDataStateFilter: converterContext.getTemplateType() === "ObjectPage",
      operationAvailableMap: getOperationAvailableMap(undefined)
    };
    updateLinkedProperties(converterContext.getEntityType(), columns);
    updateTableVisualizationForAnalytics(oVisualization, converterContext.getEntityType(), converterContext);
    return oVisualization;
  }

  _exports.createDefaultTableVisualization = createDefaultTableVisualization;

  function getOperationAvailableMap(lineItemAnnotation) {
    var operationAvailableMap = {};

    if (lineItemAnnotation) {
      lineItemAnnotation.forEach(function (dataField) {
        if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction") {
          var actionName = dataField.Action;

          if ((actionName === null || actionName === void 0 ? void 0 : actionName.indexOf("/")) < 0 && !dataField.Determining) {
            var _actionTarget$paramet;

            var actionTarget = dataField.ActionTarget;

            if (actionTarget === null || actionTarget === void 0 ? void 0 : (_actionTarget$paramet = actionTarget.parameters) === null || _actionTarget$paramet === void 0 ? void 0 : _actionTarget$paramet.length) {
              var _actionTarget$annotat, _actionTarget$annotat2, _actionTarget$annotat3, _actionTarget$annotat4;

              var bindingParameterFullName = actionTarget.parameters[0].fullyQualifiedName,
                  bindingParameter = bindingParameterFullName.substring(bindingParameterFullName.lastIndexOf("/") + 1),
                  // Strip the binding parameter name from OperationAvailable path
              // For e.g. _it/property1 --> property1
              targetExpression = annotationExpression(actionTarget === null || actionTarget === void 0 ? void 0 : (_actionTarget$annotat = actionTarget.annotations) === null || _actionTarget$annotat === void 0 ? void 0 : (_actionTarget$annotat2 = _actionTarget$annotat.Core) === null || _actionTarget$annotat2 === void 0 ? void 0 : _actionTarget$annotat2.OperationAvailable, [], undefined, function (path) {
                return path ? path.substring(bindingParameter.length + 1) : "";
              });

              if (targetExpression === null || targetExpression === void 0 ? void 0 : targetExpression.path) {
                operationAvailableMap[actionName] = targetExpression.path;
              } else if ((actionTarget === null || actionTarget === void 0 ? void 0 : (_actionTarget$annotat3 = actionTarget.annotations) === null || _actionTarget$annotat3 === void 0 ? void 0 : (_actionTarget$annotat4 = _actionTarget$annotat3.Core) === null || _actionTarget$annotat4 === void 0 ? void 0 : _actionTarget$annotat4.OperationAvailable) !== undefined) {
                operationAvailableMap[actionName] = targetExpression;
              }
            }
          }
        }
      });
    }

    return JSON.stringify(operationAvailableMap);
  }
  /**
   * Iterates over the DataFieldForAction and DataFieldForIntentBasedNavigation of a line item and
   * returns all the UI.Hidden annotation expressions.
   *
   * @param lineItemAnnotation Collection of data fields used for representation in a table or list
   * @param currentEntityType Current Entity Type
   * @param contextDataModelObjectPath DataModelObjectPath
   * @param isEntitySet
   * @returns All the `UI.Hidden` path expressions found in the relevant actions
   */


  function getUIHiddenExpForActionsRequiringContext(lineItemAnnotation, currentEntityType, contextDataModelObjectPath, isEntitySet) {
    var aUiHiddenPathExpressions = [];
    lineItemAnnotation.forEach(function (dataField) {
      var _dataField$ActionTarg, _dataField$Inline;

      // Check if the lineItem context is the same as that of the action:
      if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction" && (dataField === null || dataField === void 0 ? void 0 : (_dataField$ActionTarg = dataField.ActionTarget) === null || _dataField$ActionTarg === void 0 ? void 0 : _dataField$ActionTarg.isBound) && currentEntityType === (dataField === null || dataField === void 0 ? void 0 : dataField.ActionTarget.sourceEntityType) || dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation" && dataField.RequiresContext && (dataField === null || dataField === void 0 ? void 0 : (_dataField$Inline = dataField.Inline) === null || _dataField$Inline === void 0 ? void 0 : _dataField$Inline.valueOf()) !== true) {
        var _dataField$annotation, _dataField$annotation2, _dataField$annotation3;

        if (typeof ((_dataField$annotation = dataField.annotations) === null || _dataField$annotation === void 0 ? void 0 : (_dataField$annotation2 = _dataField$annotation.UI) === null || _dataField$annotation2 === void 0 ? void 0 : (_dataField$annotation3 = _dataField$annotation2.Hidden) === null || _dataField$annotation3 === void 0 ? void 0 : _dataField$annotation3.valueOf()) === "object") {
          aUiHiddenPathExpressions.push(equal(getBindingExpFromContext(dataField, contextDataModelObjectPath, isEntitySet), false));
        }
      }
    });
    return aUiHiddenPathExpressions;
  }
  /**
   * This method is used to change the context currently referenced by this binding by removing the last navigation property.
   *
   * It is used (specifically in this case), to transform a binding made for a NavProp context /MainObject/NavProp1/NavProp2,
   * into a binding on the previous context /MainObject/NavProp1.
   *
   * @param source DataFieldForAction | DataFieldForIntentBasedNavigation | CustomAction
   * @param contextDataModelObjectPath DataModelObjectPath
   * @param isEntitySet
   * @returns The binding expression
   */


  function getBindingExpFromContext(source, contextDataModelObjectPath, isEntitySet) {
    var _ref, _ref2, _sExpression;

    var sExpression;

    if (((_ref = source) === null || _ref === void 0 ? void 0 : _ref.$Type) === "com.sap.vocabularies.UI.v1.DataFieldForAction" || ((_ref2 = source) === null || _ref2 === void 0 ? void 0 : _ref2.$Type) === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") {
      var _ref3, _ref3$annotations, _ref3$annotations$UI;

      sExpression = (_ref3 = source) === null || _ref3 === void 0 ? void 0 : (_ref3$annotations = _ref3.annotations) === null || _ref3$annotations === void 0 ? void 0 : (_ref3$annotations$UI = _ref3$annotations.UI) === null || _ref3$annotations$UI === void 0 ? void 0 : _ref3$annotations$UI.Hidden;
    } else {
      var _ref4;

      sExpression = (_ref4 = source) === null || _ref4 === void 0 ? void 0 : _ref4.visible;
    }

    var sPath;

    if ((_sExpression = sExpression) === null || _sExpression === void 0 ? void 0 : _sExpression.path) {
      sPath = sExpression.path;
    } else {
      sPath = sExpression;
    }

    if (sPath) {
      var _ref5;

      if ((_ref5 = source) === null || _ref5 === void 0 ? void 0 : _ref5.visible) {
        sPath = sPath.substring(1, sPath.length - 1);
      }

      if (sPath.indexOf("/") > 0) {
        var _contextDataModelObje;

        //check if the navigation property is correct:
        var aSplitPath = sPath.split("/");
        var sNavigationPath = aSplitPath[0];

        if ((contextDataModelObjectPath === null || contextDataModelObjectPath === void 0 ? void 0 : (_contextDataModelObje = contextDataModelObjectPath.targetObject) === null || _contextDataModelObje === void 0 ? void 0 : _contextDataModelObje._type) === "NavigationProperty" && contextDataModelObjectPath.targetObject.partner === sNavigationPath) {
          return bindingExpression(aSplitPath.slice(1).join("/"));
        } else {
          return constant(true);
        } // In case there is no navigation property, if it's an entitySet, the expression binding has to be returned:

      } else if (isEntitySet) {
        return bindingExpression(sPath); // otherwise the expression binding cannot be taken into account for the selection mode evaluation:
      } else {
        return constant(true);
      }
    }

    return constant(true);
  }
  /**
   * Loop through the DataFieldForAction and DataFieldForIntentBasedNavigation of a line item and check
   * if at least one of them is always visible in the table toolbar (and requires a context).
   *
   * @param lineItemAnnotation Collection of data fields for representation in a table or list
   * @param currentEntityType Current Entity Type
   * @returns {boolean} `true` if there is at least 1 action that meets the criteria
   */


  function hasBoundActionsAlwaysVisibleInToolBar(lineItemAnnotation, currentEntityType) {
    return lineItemAnnotation.some(function (dataField) {
      var _dataField$Inline2, _dataField$annotation4, _dataField$annotation5, _dataField$annotation6, _dataField$annotation7, _dataField$annotation8, _dataField$annotation9;

      if ((dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction" || dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") && (dataField === null || dataField === void 0 ? void 0 : (_dataField$Inline2 = dataField.Inline) === null || _dataField$Inline2 === void 0 ? void 0 : _dataField$Inline2.valueOf()) !== true && (((_dataField$annotation4 = dataField.annotations) === null || _dataField$annotation4 === void 0 ? void 0 : (_dataField$annotation5 = _dataField$annotation4.UI) === null || _dataField$annotation5 === void 0 ? void 0 : (_dataField$annotation6 = _dataField$annotation5.Hidden) === null || _dataField$annotation6 === void 0 ? void 0 : _dataField$annotation6.valueOf()) === false || ((_dataField$annotation7 = dataField.annotations) === null || _dataField$annotation7 === void 0 ? void 0 : (_dataField$annotation8 = _dataField$annotation7.UI) === null || _dataField$annotation8 === void 0 ? void 0 : (_dataField$annotation9 = _dataField$annotation8.Hidden) === null || _dataField$annotation9 === void 0 ? void 0 : _dataField$annotation9.valueOf()) === undefined)) {
        if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAction") {
          var _dataField$ActionTarg2;

          // Check if the lineItem context is the same as that of the action:
          return (dataField === null || dataField === void 0 ? void 0 : (_dataField$ActionTarg2 = dataField.ActionTarget) === null || _dataField$ActionTarg2 === void 0 ? void 0 : _dataField$ActionTarg2.isBound) && currentEntityType === (dataField === null || dataField === void 0 ? void 0 : dataField.ActionTarget.sourceEntityType);
        } else if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation") {
          return dataField.RequiresContext;
        }
      }

      return false;
    });
  }

  function hasCustomActionsAlwaysVisibleInToolBar(manifestActions) {
    return Object.keys(manifestActions).some(function (actionKey) {
      var _action$visible;

      var action = manifestActions[actionKey];

      if (action.requiresSelection && ((_action$visible = action.visible) === null || _action$visible === void 0 ? void 0 : _action$visible.toString()) === "true") {
        return true;
      }

      return false;
    });
  }
  /**
   * Iterates over the custom actions (with key requiresSelection) declared in the manifest for the current line item and returns all the
   * visible key values as an expression.
   *
   * @param manifestActions The actions defined in the manifest
   * @returns Array<Expression<boolean>> All the visible path expressions of the actions that meet the criteria
   */


  function getVisibleExpForCustomActionsRequiringContext(manifestActions) {
    var aVisiblePathExpressions = [];

    if (manifestActions) {
      Object.keys(manifestActions).forEach(function (actionKey) {
        var action = manifestActions[actionKey];

        if (action.requiresSelection === true && action.visible !== undefined) {
          if (typeof action.visible === "string") {
            var _action$visible2;

            /*The final aim would be to check if the path expression depends on the parent context
            and considers only those expressions for the expression evaluation,
            but currently not possible from the manifest as the visible key is bound on the parent entity.
            Tricky to differentiate the path as it's done for the Hidden annotation.
            For the time being we consider all the paths of the manifest*/
            aVisiblePathExpressions.push(resolveBindingString(action === null || action === void 0 ? void 0 : (_action$visible2 = action.visible) === null || _action$visible2 === void 0 ? void 0 : _action$visible2.valueOf()));
          }
        }
      });
    }

    return aVisiblePathExpressions;
  }
  /**
   * Evaluate if the path is statically deletable or updatable.
   *
   * @param converterContext
   * @returns {TableCapabilityRestriction} The table capabilities
   */


  function getCapabilityRestriction(converterContext) {
    var isDeletable = isPathDeletable(converterContext.getDataModelObjectPath());
    var isUpdatable = isPathUpdatable(converterContext.getDataModelObjectPath());
    return {
      isDeletable: !(isConstant(isDeletable) && isDeletable.value === false),
      isUpdatable: !(isConstant(isUpdatable) && isUpdatable.value === false)
    };
  }

  _exports.getCapabilityRestriction = getCapabilityRestriction;

  function getSelectionMode(lineItemAnnotation, visualizationPath, converterContext, isEntitySet, targetCapabilities) {
    var _tableManifestSetting;

    if (!lineItemAnnotation) {
      return SelectionMode.None;
    }

    var tableManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath);
    var selectionMode = (_tableManifestSetting = tableManifestSettings.tableSettings) === null || _tableManifestSetting === void 0 ? void 0 : _tableManifestSetting.selectionMode;
    var aHiddenBindingExpressions = [],
        aVisibleBindingExpressions = [];
    var manifestActions = getActionsFromManifest(converterContext.getManifestControlConfiguration(visualizationPath).actions, converterContext, [], undefined, false);
    var isParentDeletable, parentEntitySetDeletable;

    if (converterContext.getTemplateType() === TemplateType.ObjectPage) {
      isParentDeletable = isPathDeletable(converterContext.getDataModelObjectPath(), undefined);
      parentEntitySetDeletable = isParentDeletable ? compileBinding(isParentDeletable, true) : isParentDeletable;
    }

    if (selectionMode && selectionMode === SelectionMode.None) {
      if (!isEntitySet) {
        if (targetCapabilities.isDeletable || parentEntitySetDeletable !== "false") {
          selectionMode = SelectionMode.Multi;
          return compileBinding(ifElse(equal(bindingExpression("/editMode", "ui"), "Editable"), constant(selectionMode), constant("None")));
        } else {
          selectionMode = SelectionMode.None;
        }
      } else if (isEntitySet) {
        if (targetCapabilities.isDeletable) {
          selectionMode = SelectionMode.Multi;
          return selectionMode;
        } else {
          selectionMode = SelectionMode.None;
        }
      }
    } else if (!selectionMode || selectionMode === SelectionMode.Auto) {
      selectionMode = SelectionMode.Multi;
    }

    if (hasBoundActionsAlwaysVisibleInToolBar(lineItemAnnotation, converterContext.getEntityType()) || hasCustomActionsAlwaysVisibleInToolBar(manifestActions)) {
      return selectionMode;
    }

    aHiddenBindingExpressions = getUIHiddenExpForActionsRequiringContext(lineItemAnnotation, converterContext.getEntityType(), converterContext.getDataModelObjectPath(), isEntitySet);
    aVisibleBindingExpressions = getVisibleExpForCustomActionsRequiringContext(manifestActions); // No action requiring a context:

    if (aHiddenBindingExpressions.length === 0 && aVisibleBindingExpressions.length === 0) {
      if (!isEntitySet) {
        if (targetCapabilities.isDeletable || parentEntitySetDeletable !== "false") {
          return compileBinding(ifElse(equal(bindingExpression("/editMode", "ui"), "Editable"), constant(selectionMode), constant(SelectionMode.None)));
        } else {
          return SelectionMode.None;
        } // EntitySet deletable:

      } else if (targetCapabilities.isDeletable) {
        return selectionMode; // EntitySet not deletable:
      } else {
        return SelectionMode.None;
      } // There are actions requiring a context:

    } else if (!isEntitySet) {
      if (targetCapabilities.isDeletable || parentEntitySetDeletable !== "false") {
        return compileBinding(ifElse(equal(bindingExpression("/editMode", "ui"), "Editable"), constant(selectionMode), ifElse(or.apply(void 0, _toConsumableArray(aHiddenBindingExpressions.concat(aVisibleBindingExpressions))), constant(selectionMode), constant(SelectionMode.None))));
      } else {
        return compileBinding(ifElse(or.apply(void 0, _toConsumableArray(aHiddenBindingExpressions.concat(aVisibleBindingExpressions))), constant(selectionMode), constant(SelectionMode.None)));
      } //EntitySet deletable:

    } else if (targetCapabilities.isDeletable) {
      return SelectionMode.Multi; //EntitySet not deletable:
    } else {
      return compileBinding(ifElse(or.apply(void 0, _toConsumableArray(aHiddenBindingExpressions.concat(aVisibleBindingExpressions))), constant(selectionMode), constant(SelectionMode.None)));
    }
  }
  /**
   * Method to retrieve all table actions from annotations.
   *
   * @param lineItemAnnotation
   * @param visualizationPath
   * @param converterContext
   * @returns {Record<BaseAction, BaseAction>} The table annotation actions
   */


  _exports.getSelectionMode = getSelectionMode;

  function getTableAnnotationActions(lineItemAnnotation, visualizationPath, converterContext) {
    var tableActions = [];
    var hiddenTableActions = [];

    if (lineItemAnnotation) {
      lineItemAnnotation.forEach(function (dataField) {
        var _dataField$annotation10, _dataField$annotation11, _dataField$annotation12, _dataField$annotation13, _dataField$annotation14, _dataField$annotation15, _dataField$annotation16, _dataField$annotation17, _dataField$annotation18, _dataField$annotation19;

        var tableAction;

        if (isDataFieldForActionAbstract(dataField) && !(((_dataField$annotation10 = dataField.annotations) === null || _dataField$annotation10 === void 0 ? void 0 : (_dataField$annotation11 = _dataField$annotation10.UI) === null || _dataField$annotation11 === void 0 ? void 0 : (_dataField$annotation12 = _dataField$annotation11.Hidden) === null || _dataField$annotation12 === void 0 ? void 0 : _dataField$annotation12.valueOf()) === true) && !dataField.Inline && !dataField.Determining) {
          var key = KeyHelper.generateKeyFromDataField(dataField);

          switch (dataField.$Type) {
            case "com.sap.vocabularies.UI.v1.DataFieldForAction":
              tableAction = {
                type: ActionType.DataFieldForAction,
                annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
                key: key,
                visible: compileBinding(not(equal(annotationExpression((_dataField$annotation13 = dataField.annotations) === null || _dataField$annotation13 === void 0 ? void 0 : (_dataField$annotation14 = _dataField$annotation13.UI) === null || _dataField$annotation14 === void 0 ? void 0 : _dataField$annotation14.Hidden, [], undefined, converterContext.getRelativeModelPathFunction()), true))),
                isNavigable: true
              };
              break;

            case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
              tableAction = {
                type: ActionType.DataFieldForIntentBasedNavigation,
                annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName),
                key: key,
                visible: compileBinding(not(equal(annotationExpression((_dataField$annotation15 = dataField.annotations) === null || _dataField$annotation15 === void 0 ? void 0 : (_dataField$annotation16 = _dataField$annotation15.UI) === null || _dataField$annotation16 === void 0 ? void 0 : _dataField$annotation16.Hidden, [], undefined, converterContext.getRelativeModelPathFunction()), true)))
              };
              break;

            default:
              break;
          }
        } else if (((_dataField$annotation17 = dataField.annotations) === null || _dataField$annotation17 === void 0 ? void 0 : (_dataField$annotation18 = _dataField$annotation17.UI) === null || _dataField$annotation18 === void 0 ? void 0 : (_dataField$annotation19 = _dataField$annotation18.Hidden) === null || _dataField$annotation19 === void 0 ? void 0 : _dataField$annotation19.valueOf()) === true) {
          hiddenTableActions.push({
            type: ActionType.Default,
            key: KeyHelper.generateKeyFromDataField(dataField)
          });
        }

        if (tableAction) {
          tableActions.push(tableAction);
        }
      });
    }

    return {
      tableActions: tableActions,
      hiddenTableActions: hiddenTableActions
    };
  }

  function getHighlightRowBinding(criticalityAnnotation, isDraftRoot, targetEntityType) {
    var defaultHighlightRowDefinition = MessageType.None;

    if (criticalityAnnotation) {
      if (typeof criticalityAnnotation === "object") {
        defaultHighlightRowDefinition = annotationExpression(criticalityAnnotation);
      } else {
        // Enum Value so we get the corresponding static part
        defaultHighlightRowDefinition = getMessageTypeFromCriticalityType(criticalityAnnotation);
      }
    }

    return ifElse(isDraftRoot && Draft.IsNewObject, MessageType.Information, formatResult([defaultHighlightRowDefinition, bindingExpression("filteredMessages", "internal")], tableFormatters.rowHighlighting, targetEntityType));
  }

  function _getCreationBehaviour(lineItemAnnotation, tableManifestConfiguration, converterContext, navigationSettings) {
    var _newAction2;

    var navigation = (navigationSettings === null || navigationSettings === void 0 ? void 0 : navigationSettings.create) || (navigationSettings === null || navigationSettings === void 0 ? void 0 : navigationSettings.detail); // cross-app

    if ((navigation === null || navigation === void 0 ? void 0 : navigation.outbound) && navigation.outboundDetail && (navigationSettings === null || navigationSettings === void 0 ? void 0 : navigationSettings.create)) {
      return {
        mode: "External",
        outbound: navigation.outbound,
        outboundDetail: navigation.outboundDetail,
        navigationSettings: navigationSettings
      };
    }

    var newAction;

    if (lineItemAnnotation) {
      var _converterContext$get, _targetAnnotations$Co, _targetAnnotations$Co2, _targetAnnotations$Se, _targetAnnotations$Se2;

      // in-app
      var targetAnnotations = (_converterContext$get = converterContext.getEntitySet()) === null || _converterContext$get === void 0 ? void 0 : _converterContext$get.annotations;
      newAction = (targetAnnotations === null || targetAnnotations === void 0 ? void 0 : (_targetAnnotations$Co = targetAnnotations.Common) === null || _targetAnnotations$Co === void 0 ? void 0 : (_targetAnnotations$Co2 = _targetAnnotations$Co.DraftRoot) === null || _targetAnnotations$Co2 === void 0 ? void 0 : _targetAnnotations$Co2.NewAction) || (targetAnnotations === null || targetAnnotations === void 0 ? void 0 : (_targetAnnotations$Se = targetAnnotations.Session) === null || _targetAnnotations$Se === void 0 ? void 0 : (_targetAnnotations$Se2 = _targetAnnotations$Se.StickySessionSupported) === null || _targetAnnotations$Se2 === void 0 ? void 0 : _targetAnnotations$Se2.NewAction); // TODO: Is there really no 'NewAction' on DraftNode? targetAnnotations?.Common?.DraftNode?.NewAction

      if (tableManifestConfiguration.creationMode === CreationMode.CreationRow && newAction) {
        // A combination of 'CreationRow' and 'NewAction' does not make sense
        // TODO: Or does it?
        throw Error("Creation mode '".concat(CreationMode.CreationRow, "' can not be used with a custom 'new' action (").concat(newAction, ")"));
      }

      if (navigation === null || navigation === void 0 ? void 0 : navigation.route) {
        var _newAction;

        // route specified
        return {
          mode: tableManifestConfiguration.creationMode,
          append: tableManifestConfiguration.createAtEnd,
          newAction: (_newAction = newAction) === null || _newAction === void 0 ? void 0 : _newAction.toString(),
          navigateToTarget: tableManifestConfiguration.creationMode === CreationMode.NewPage ? navigation.route : undefined // navigate only in NewPage mode

        };
      }
    } // no navigation or no route specified - fallback to inline create if original creation mode was 'NewPage'


    if (tableManifestConfiguration.creationMode === CreationMode.NewPage) {
      tableManifestConfiguration.creationMode = CreationMode.Inline;
    }

    return {
      mode: tableManifestConfiguration.creationMode,
      append: tableManifestConfiguration.createAtEnd,
      newAction: (_newAction2 = newAction) === null || _newAction2 === void 0 ? void 0 : _newAction2.toString()
    };
  }

  var _getRowConfigurationProperty = function (lineItemAnnotation, visualizationPath, converterContext, navigationSettings, targetPath) {
    var pressProperty, navigationTarget;
    var criticalityProperty = MessageType.None;
    var targetEntityType = converterContext.getEntityType();

    if (navigationSettings && lineItemAnnotation) {
      var _navigationSettings$d, _navigationSettings$d2;

      navigationTarget = ((_navigationSettings$d = navigationSettings.display) === null || _navigationSettings$d === void 0 ? void 0 : _navigationSettings$d.target) || ((_navigationSettings$d2 = navigationSettings.detail) === null || _navigationSettings$d2 === void 0 ? void 0 : _navigationSettings$d2.outbound);

      if (navigationTarget) {
        pressProperty = ".handlers.onChevronPressNavigateOutBound( $controller ,'" + navigationTarget + "', ${$parameters>bindingContext})";
      } else if (targetEntityType) {
        var _navigationSettings$d3;

        var targetEntitySet = converterContext.getEntitySet();
        navigationTarget = (_navigationSettings$d3 = navigationSettings.detail) === null || _navigationSettings$d3 === void 0 ? void 0 : _navigationSettings$d3.route;

        if (navigationTarget) {
          var _lineItemAnnotation$a, _lineItemAnnotation$a2, _targetEntitySet$anno, _targetEntitySet$anno2, _targetEntitySet$anno3, _targetEntitySet$anno4, _targetEntitySet$anno5, _targetEntitySet$anno6, _targetEntitySet$anno7, _targetEntitySet$anno8;

          criticalityProperty = getHighlightRowBinding((_lineItemAnnotation$a = lineItemAnnotation.annotations) === null || _lineItemAnnotation$a === void 0 ? void 0 : (_lineItemAnnotation$a2 = _lineItemAnnotation$a.UI) === null || _lineItemAnnotation$a2 === void 0 ? void 0 : _lineItemAnnotation$a2.Criticality, !!(targetEntitySet === null || targetEntitySet === void 0 ? void 0 : (_targetEntitySet$anno = targetEntitySet.annotations) === null || _targetEntitySet$anno === void 0 ? void 0 : (_targetEntitySet$anno2 = _targetEntitySet$anno.Common) === null || _targetEntitySet$anno2 === void 0 ? void 0 : _targetEntitySet$anno2.DraftRoot) || !!(targetEntitySet === null || targetEntitySet === void 0 ? void 0 : (_targetEntitySet$anno3 = targetEntitySet.annotations) === null || _targetEntitySet$anno3 === void 0 ? void 0 : (_targetEntitySet$anno4 = _targetEntitySet$anno3.Common) === null || _targetEntitySet$anno4 === void 0 ? void 0 : _targetEntitySet$anno4.DraftNode), targetEntityType);
          pressProperty = "API.onTableRowPress($event, $controller, ${$parameters>bindingContext}, { callExtension: true, targetPath: '" + targetPath + "', editable : " + ((targetEntitySet === null || targetEntitySet === void 0 ? void 0 : (_targetEntitySet$anno5 = targetEntitySet.annotations) === null || _targetEntitySet$anno5 === void 0 ? void 0 : (_targetEntitySet$anno6 = _targetEntitySet$anno5.Common) === null || _targetEntitySet$anno6 === void 0 ? void 0 : _targetEntitySet$anno6.DraftRoot) || (targetEntitySet === null || targetEntitySet === void 0 ? void 0 : (_targetEntitySet$anno7 = targetEntitySet.annotations) === null || _targetEntitySet$anno7 === void 0 ? void 0 : (_targetEntitySet$anno8 = _targetEntitySet$anno7.Common) === null || _targetEntitySet$anno8 === void 0 ? void 0 : _targetEntitySet$anno8.DraftNode) ? "!${$parameters>bindingContext}.getProperty('IsActiveEntity')" : "undefined") + "})"; //Need to access to DraftRoot and DraftNode !!!!!!!
        } else {
          var _lineItemAnnotation$a3, _lineItemAnnotation$a4;

          criticalityProperty = getHighlightRowBinding((_lineItemAnnotation$a3 = lineItemAnnotation.annotations) === null || _lineItemAnnotation$a3 === void 0 ? void 0 : (_lineItemAnnotation$a4 = _lineItemAnnotation$a3.UI) === null || _lineItemAnnotation$a4 === void 0 ? void 0 : _lineItemAnnotation$a4.Criticality, false, targetEntityType);
        }
      }
    }

    var rowNavigatedExpression = formatResult([bindingExpression("/deepestPath", "internal")], tableFormatters.navigatedRow, targetEntityType);
    return {
      press: pressProperty,
      action: pressProperty ? "Navigation" : undefined,
      rowHighlighting: compileBinding(criticalityProperty),
      rowNavigated: compileBinding(rowNavigatedExpression)
    };
  };
  /**
   * Retrieve the columns from the entityType.
   *
   * @param columnsToBeCreated The columns to be created.
   * @param entityType The target entity type.
   * @param annotationColumns The array of columns created based on LineItem annotations.
   * @param nonSortableColumns The array of all non sortable column names.
   * @param converterContext The converter context.
   * @param tableType The table type.
   * @returns {AnnotationTableColumn[]} The column from the entityType
   */


  var getColumnsFromEntityType = function (columnsToBeCreated, entityType) {
    var annotationColumns = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var nonSortableColumns = arguments.length > 3 ? arguments[3] : undefined;
    var converterContext = arguments.length > 4 ? arguments[4] : undefined;
    var tableType = arguments.length > 5 ? arguments[5] : undefined;
    var tableColumns = []; // Catch already existing columns - which were added before by LineItem Annotations

    var aggregationHelper = new AggregationHelper(entityType, converterContext);
    entityType.entityProperties.forEach(function (property) {
      // Catch already existing columns - which were added before by LineItem Annotations
      var exists = annotationColumns.some(function (column) {
        return column.name === property.name;
      }); // if target type exists, it is a complex property and should be ignored

      if (!property.targetType && !exists) {
        var relatedPropertiesInfo = collectRelatedProperties(property.name, property, converterContext, true, tableType);
        var relatedPropertyNames = Object.keys(relatedPropertiesInfo.properties);
        var additionalPropertyNames = Object.keys(relatedPropertiesInfo.additionalProperties);
        var columnInfo = getColumnDefinitionFromProperty(property, converterContext.getEntitySetBasedAnnotationPath(property.fullyQualifiedName), property.name, true, true, nonSortableColumns, aggregationHelper, converterContext);

        if (relatedPropertyNames.length > 0) {
          columnInfo.propertyInfos = relatedPropertyNames;
          columnInfo.exportSettings = _objectSpread({}, columnInfo.exportSettings, {
            template: relatedPropertiesInfo.exportSettingsTemplate,
            wrap: relatedPropertiesInfo.exportSettingsWrapping
          }); // Collect information of related columns to be created.

          relatedPropertyNames.forEach(function (name) {
            columnsToBeCreated[name] = relatedPropertiesInfo.properties[name];
          });
        }

        if (additionalPropertyNames.length > 0) {
          columnInfo.additionalPropertyInfos = additionalPropertyNames; // Create columns for additional properties identified for ALP use case.

          additionalPropertyNames.forEach(function (name) {
            // Intentional overwrite as we require only one new PropertyInfo for a related Property.
            columnsToBeCreated[name] = relatedPropertiesInfo.additionalProperties[name];
          });
        }

        tableColumns.push(columnInfo);
      }
    });
    return tableColumns;
  };
  /**
   * Create a column definition from a property.
   * @param {Property} property Entity type property for which the column is created
   * @param {string} fullPropertyPath The full path to the target property
   * @param {string} relativePath The relative path to the target property based on the context
   * @param {boolean} useDataFieldPrefix Should be prefixed with "DataField::", else it will be prefixed with "Property::"
   * @param {boolean} availableForAdaptation Decides whether column should be available for adaptation
   * @param {string[]} nonSortableColumns The array of all non sortable column names
   * @param {AggregationHelper} aggregationHelper The aggregationHelper for the entity
   * @param {ConverterContext} converterContext The converter context
   * @returns {AnnotationTableColumn} The annotation column definition
   */


  _exports.getColumnsFromEntityType = getColumnsFromEntityType;

  var getColumnDefinitionFromProperty = function (property, fullPropertyPath, relativePath, useDataFieldPrefix, availableForAdaptation, nonSortableColumns, aggregationHelper, converterContext) {
    var _property$annotations, _property$annotations2, _property$annotations3, _annotations, _annotations$UI, _annotations$UI$DataF, _annotations$UI$DataF2, _annotations$UI$DataF3, _annotations$UI$DataF4;

    var name = useDataFieldPrefix ? relativePath : "Property::" + relativePath;
    var key = (useDataFieldPrefix ? "DataField::" : "Property::") + replaceSpecialChars(relativePath);
    var semanticObjectAnnotationPath = getSemanticObjectPath(converterContext, property);
    var isHidden = ((_property$annotations = property.annotations) === null || _property$annotations === void 0 ? void 0 : (_property$annotations2 = _property$annotations.UI) === null || _property$annotations2 === void 0 ? void 0 : (_property$annotations3 = _property$annotations2.Hidden) === null || _property$annotations3 === void 0 ? void 0 : _property$annotations3.valueOf()) === true;
    var groupPath = property.name ? _sliceAtSlash(property.name, true, false) : undefined;
    var isGroup = groupPath != property.name;
    var isDataPointFakeProperty = name.indexOf("@com.sap.vocabularies.UI.v1.DataPoint") > -1;
    var exportSettings = isDataPointFakeProperty ? {
      template: getTargetValueOnDataPoint(property)
    } : undefined;
    return {
      key: key,
      isGroupable: !isDataPointFakeProperty && !isHidden ? aggregationHelper.isPropertyGroupable(property) : false,
      type: ColumnType.Annotation,
      label: _getLabel(property, isGroup),
      groupLabel: isGroup ? _getLabel(property) : null,
      group: isGroup ? groupPath : null,
      annotationPath: fullPropertyPath,
      semanticObjectPath: semanticObjectAnnotationPath,
      // A fake property was created for the TargetValue used on DataPoints, this property should be hidden and non sortable
      availability: !availableForAdaptation || isHidden || isDataPointFakeProperty ? AvailabilityType.Hidden : AvailabilityType.Adaptation,
      name: name,
      relativePath: isDataPointFakeProperty ? ((_annotations = property.annotations) === null || _annotations === void 0 ? void 0 : (_annotations$UI = _annotations.UI) === null || _annotations$UI === void 0 ? void 0 : (_annotations$UI$DataF = _annotations$UI.DataFieldDefault) === null || _annotations$UI$DataF === void 0 ? void 0 : (_annotations$UI$DataF2 = _annotations$UI$DataF.Target) === null || _annotations$UI$DataF2 === void 0 ? void 0 : (_annotations$UI$DataF3 = _annotations$UI$DataF2.$target) === null || _annotations$UI$DataF3 === void 0 ? void 0 : (_annotations$UI$DataF4 = _annotations$UI$DataF3.Value) === null || _annotations$UI$DataF4 === void 0 ? void 0 : _annotations$UI$DataF4.path) || property.Value.path : relativePath,
      sortable: !isHidden && nonSortableColumns.indexOf(relativePath) === -1 && !isDataPointFakeProperty,
      isKey: property.isKey,
      isDataPointFakeTargetProperty: isDataPointFakeProperty,
      exportSettings: exportSettings
    };
  };
  /**
   * Returns boolean true for valid columns, false for invalid columns.
   *
   * @param {DataFieldAbstractTypes} dataField Different DataField types defined in the annotations
   * @returns {boolean} True for valid columns, false for invalid columns
   * @private
   */


  var _isValidColumn = function (dataField) {
    switch (dataField.$Type) {
      case "com.sap.vocabularies.UI.v1.DataFieldForAction":
      case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        return !!dataField.Inline;

      case "com.sap.vocabularies.UI.v1.DataFieldWithAction":
      case "com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation":
        return false;

      case "com.sap.vocabularies.UI.v1.DataField":
      case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
      case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
      case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
        return true;

      default: // Todo: Replace with proper Log statement once available
      //  throw new Error("Unhandled DataField Abstract type: " + dataField.$Type);

    }
  };
  /**
   * Returns label for property and dataField.
   * @param {DataFieldAbstractTypes | Property} property Entity type property or DataField defined in the annotations
   * @param isGroup
   * @returns {string} Label of the property or DataField
   * @private
   */


  var _getLabel = function (property) {
    var isGroup = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    if (!property) {
      return undefined;
    }

    if (isProperty(property)) {
      var _property$annotations4, _property$annotations5, _dataFieldDefault$Lab, _property$annotations6, _property$annotations7;

      var dataFieldDefault = (_property$annotations4 = property.annotations) === null || _property$annotations4 === void 0 ? void 0 : (_property$annotations5 = _property$annotations4.UI) === null || _property$annotations5 === void 0 ? void 0 : _property$annotations5.DataFieldDefault;

      if (dataFieldDefault && !dataFieldDefault.qualifier && ((_dataFieldDefault$Lab = dataFieldDefault.Label) === null || _dataFieldDefault$Lab === void 0 ? void 0 : _dataFieldDefault$Lab.valueOf())) {
        var _dataFieldDefault$Lab2;

        return compileBinding(annotationExpression((_dataFieldDefault$Lab2 = dataFieldDefault.Label) === null || _dataFieldDefault$Lab2 === void 0 ? void 0 : _dataFieldDefault$Lab2.valueOf()));
      }

      return compileBinding(annotationExpression(((_property$annotations6 = property.annotations.Common) === null || _property$annotations6 === void 0 ? void 0 : (_property$annotations7 = _property$annotations6.Label) === null || _property$annotations7 === void 0 ? void 0 : _property$annotations7.valueOf()) || property.name));
    } else if (isDataFieldTypes(property)) {
      var _property$Label2, _property$Value, _property$Value$$targ, _property$Value$$targ2, _property$Value$$targ3, _property$Value$$targ4, _property$Value2, _property$Value2$$tar;

      if (!!isGroup && property.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation") {
        var _property$Label;

        return compileBinding(annotationExpression((_property$Label = property.Label) === null || _property$Label === void 0 ? void 0 : _property$Label.valueOf()));
      }

      return compileBinding(annotationExpression(((_property$Label2 = property.Label) === null || _property$Label2 === void 0 ? void 0 : _property$Label2.valueOf()) || ((_property$Value = property.Value) === null || _property$Value === void 0 ? void 0 : (_property$Value$$targ = _property$Value.$target) === null || _property$Value$$targ === void 0 ? void 0 : (_property$Value$$targ2 = _property$Value$$targ.annotations) === null || _property$Value$$targ2 === void 0 ? void 0 : (_property$Value$$targ3 = _property$Value$$targ2.Common) === null || _property$Value$$targ3 === void 0 ? void 0 : (_property$Value$$targ4 = _property$Value$$targ3.Label) === null || _property$Value$$targ4 === void 0 ? void 0 : _property$Value$$targ4.valueOf()) || ((_property$Value2 = property.Value) === null || _property$Value2 === void 0 ? void 0 : (_property$Value2$$tar = _property$Value2.$target) === null || _property$Value2$$tar === void 0 ? void 0 : _property$Value2$$tar.name)));
    } else if (property.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation") {
      var _property$Label3, _ref6, _ref6$Value, _ref6$Value$$target, _ref6$Value$$target$a, _ref6$Value$$target$a2, _ref6$Value$$target$a3, _property$Target;

      return compileBinding(annotationExpression(((_property$Label3 = property.Label) === null || _property$Label3 === void 0 ? void 0 : _property$Label3.valueOf()) || ((_ref6 = (_property$Target = property.Target) === null || _property$Target === void 0 ? void 0 : _property$Target.$target) === null || _ref6 === void 0 ? void 0 : (_ref6$Value = _ref6.Value) === null || _ref6$Value === void 0 ? void 0 : (_ref6$Value$$target = _ref6$Value.$target) === null || _ref6$Value$$target === void 0 ? void 0 : (_ref6$Value$$target$a = _ref6$Value$$target.annotations) === null || _ref6$Value$$target$a === void 0 ? void 0 : (_ref6$Value$$target$a2 = _ref6$Value$$target$a.Common) === null || _ref6$Value$$target$a2 === void 0 ? void 0 : (_ref6$Value$$target$a3 = _ref6$Value$$target$a2.Label) === null || _ref6$Value$$target$a3 === void 0 ? void 0 : _ref6$Value$$target$a3.valueOf())));
    } else {
      var _property$Label4;

      return compileBinding(annotationExpression((_property$Label4 = property.Label) === null || _property$Label4 === void 0 ? void 0 : _property$Label4.valueOf()));
    }
  };
  /**
   * Creates a PropertyInfo for each identified property consumed by a LineItem.
   *
   * @param {Record<string, Property>} columnsToBeCreated Identified properties.
   * @param existingColumns The list of columns created for LineItems and Properties of entityType.
   * @param nonSortableColumns The array of column names which cannot be sorted.
   * @param converterContext The converter context.
   * @param entityType The entity type for the LineItem
   * @returns {AnnotationTableColumn[]} The array of columns created.
   */


  var _createRelatedColumns = function (columnsToBeCreated, existingColumns, nonSortableColumns, converterContext, entityType) {
    var relatedColumns = [];
    var relatedPropertyNameMap = {};
    var aggregationHelper = new AggregationHelper(entityType, converterContext);
    Object.keys(columnsToBeCreated).forEach(function (name) {
      var property = columnsToBeCreated[name],
          annotationPath = converterContext.getAbsoluteAnnotationPath(name),
          // Check whether the related column already exists.
      relatedColumn = existingColumns.find(function (column) {
        return column.name === name;
      });

      if (relatedColumn === undefined) {
        // Case 1: Key contains DataField prefix to ensure all property columns have the same key format.
        // New created property column is set to hidden.
        relatedColumns.push(getColumnDefinitionFromProperty(property, annotationPath, name, true, false, nonSortableColumns, aggregationHelper, converterContext));
      } else if (relatedColumn.annotationPath !== annotationPath || relatedColumn.propertyInfos && relatedColumn.propertyInfos.indexOf(name) !== -1) {
        // Case 2: The existing column points to a LineItem (or)
        // Case 3: This is a self reference from an existing column and
        // both cases require a dummy PropertyInfo for setting correct export settings.
        var newName = "Property::" + name; // Checking whether the related property column has already been created in a previous iteration.

        if (!existingColumns.some(function (column) {
          return column.name === newName;
        })) {
          // Create a new property column with 'Property::' prefix,
          // Set it to hidden as it is only consumed by Complex property infos.
          relatedColumns.push(getColumnDefinitionFromProperty(property, annotationPath, name, false, false, nonSortableColumns, aggregationHelper, converterContext));
          relatedPropertyNameMap[name] = newName;
        }
      }
    }); // The property 'name' has been prefixed with 'Property::' for uniqueness.
    // Update the same in other propertyInfos[] references which point to this property.

    existingColumns.forEach(function (column) {
      var _column$propertyInfos, _column$additionalPro;

      column.propertyInfos = (_column$propertyInfos = column.propertyInfos) === null || _column$propertyInfos === void 0 ? void 0 : _column$propertyInfos.map(function (propertyInfo) {
        var _relatedPropertyNameM;

        return (_relatedPropertyNameM = relatedPropertyNameMap[propertyInfo]) !== null && _relatedPropertyNameM !== void 0 ? _relatedPropertyNameM : propertyInfo;
      });
      column.additionalPropertyInfos = (_column$additionalPro = column.additionalPropertyInfos) === null || _column$additionalPro === void 0 ? void 0 : _column$additionalPro.map(function (propertyInfo) {
        var _relatedPropertyNameM2;

        return (_relatedPropertyNameM2 = relatedPropertyNameMap[propertyInfo]) !== null && _relatedPropertyNameM2 !== void 0 ? _relatedPropertyNameM2 : propertyInfo;
      });
    });
    return relatedColumns;
  };
  /**
   * Getting the Column Name
   * If it points to a DataField with one property or DataPoint with one property, it will use the property name
   * here to be consistent with the existing flex changes.
   *
   * @param {DataFieldAbstractTypes} dataField Different DataField types defined in the annotations
   * @returns {string} The name of annotation columns
   * @private
   */


  var _getAnnotationColumnName = function (dataField) {
    var _ref7, _ref7$Value, _dataField$Target;

    // This is needed as we have flexibility changes already that we have to check against
    if (isDataFieldTypes(dataField)) {
      var _dataField$Value;

      return (_dataField$Value = dataField.Value) === null || _dataField$Value === void 0 ? void 0 : _dataField$Value.path;
    } else if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation" && ((_ref7 = (_dataField$Target = dataField.Target) === null || _dataField$Target === void 0 ? void 0 : _dataField$Target.$target) === null || _ref7 === void 0 ? void 0 : (_ref7$Value = _ref7.Value) === null || _ref7$Value === void 0 ? void 0 : _ref7$Value.path)) {
      var _ref8, _dataField$Target2;

      // This is for removing duplicate properties. For example, 'Progress' Property is removed if it is already defined as a DataPoint
      return (_ref8 = (_dataField$Target2 = dataField.Target) === null || _dataField$Target2 === void 0 ? void 0 : _dataField$Target2.$target) === null || _ref8 === void 0 ? void 0 : _ref8.Value.path;
    } else {
      return KeyHelper.generateKeyFromDataField(dataField);
    }
  };
  /**
   * Determines the relative path of the property with respect to the root entity.
   * @param dataField The `DataField` being processed.
   * @returns {string} The relative path
   */


  var _getRelativePath = function (dataField) {
    var _ref9, _ref9$Value, _ref10, _ref10$Target;

    var relativePath = "";

    switch (dataField.$Type) {
      case "com.sap.vocabularies.UI.v1.DataField":
      case "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":
      case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
        relativePath = (_ref9 = dataField) === null || _ref9 === void 0 ? void 0 : (_ref9$Value = _ref9.Value) === null || _ref9$Value === void 0 ? void 0 : _ref9$Value.path;
        break;

      case "com.sap.vocabularies.UI.v1.DataFieldForAnnotation":
        relativePath = (_ref10 = dataField) === null || _ref10 === void 0 ? void 0 : (_ref10$Target = _ref10.Target) === null || _ref10$Target === void 0 ? void 0 : _ref10$Target.value;
        break;

      case "com.sap.vocabularies.UI.v1.DataFieldForAction":
      case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        relativePath = KeyHelper.generateKeyFromDataField(dataField);
        break;
    }

    return relativePath;
  };

  var _sliceAtSlash = function (path, isLastSlash, isLastPart) {
    var iSlashIndex = isLastSlash ? path.lastIndexOf("/") : path.indexOf("/");

    if (iSlashIndex === -1) {
      return path;
    }

    return isLastPart ? path.substring(iSlashIndex + 1, path.length) : path.substring(0, iSlashIndex);
  };
  /**
   * Determine whether a column is sortable.
   *
   * @param dataField The data field being processed
   * @param propertyPath The property path
   * @param nonSortableColumns Collection of non-sortable column names as per annotation
   * @returns {boolean} True if the column is sortable
   */


  var _isColumnSortable = function (dataField, propertyPath, nonSortableColumns) {
    var isSortable = false;

    if (nonSortableColumns.indexOf(propertyPath) === -1) {
      // Column is not marked as non-sortable via annotation
      switch (dataField.$Type) {
        case "com.sap.vocabularies.UI.v1.DataField":
        case "com.sap.vocabularies.UI.v1.DataFieldWithUrl":
          isSortable = true;
          break;

        case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
        case "com.sap.vocabularies.UI.v1.DataFieldForAction":
          // Action columns are not sortable
          isSortable = false;
          break;
      }
    }

    return isSortable;
  };
  /**
   * Returns default format options for text fields in a table.
   *
   * @returns {FormatOptionsType} Collection of format options with default values
   */


  function getDefaultFormatOptionsForTable() {
    return {
      textLinesDisplay: 4,
      textLinesEdit: 4
    };
  }
  /**
   * Returns line items from metadata annotations.
   *
   * @param {LineItem} lineItemAnnotation Collection of data fields with their annotations
   * @param {string} visualizationPath The visualization path
   * @param {ConverterContext} converterContext The converter context
   * @returns {TableColumn[]} The columns from the annotations
   */


  var getColumnsFromAnnotations = function (lineItemAnnotation, visualizationPath, converterContext) {
    var _map, _ref11, _converterContext$get2, _converterContext$get3, _converterContext$get4, _converterContext$get5, _tableManifestSetting2;

    var entityType = converterContext.getAnnotationEntityType(lineItemAnnotation),
        annotationColumns = [],
        columnsToBeCreated = {},
        nonSortableColumns = (_map = (_ref11 = (_converterContext$get2 = converterContext.getEntitySet()) === null || _converterContext$get2 === void 0 ? void 0 : (_converterContext$get3 = _converterContext$get2.annotations) === null || _converterContext$get3 === void 0 ? void 0 : (_converterContext$get4 = _converterContext$get3.Capabilities) === null || _converterContext$get4 === void 0 ? void 0 : (_converterContext$get5 = _converterContext$get4.SortRestrictions) === null || _converterContext$get5 === void 0 ? void 0 : _converterContext$get5.NonSortableProperties) === null || _ref11 === void 0 ? void 0 : _ref11.map(function (property) {
      return property.value;
    })) !== null && _map !== void 0 ? _map : [],
        tableManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath),
        tableType = (tableManifestSettings === null || tableManifestSettings === void 0 ? void 0 : (_tableManifestSetting2 = tableManifestSettings.tableSettings) === null || _tableManifestSetting2 === void 0 ? void 0 : _tableManifestSetting2.type) || "ResponsiveTable";

    if (lineItemAnnotation) {
      // Get columns from the LineItem Annotation
      lineItemAnnotation.forEach(function (lineItem) {
        var _lineItem$Value, _lineItem$Value$$targ, _lineItem$annotations, _lineItem$annotations2, _lineItem$annotations3;

        if (!_isValidColumn(lineItem)) {
          return;
        }

        var semanticObjectAnnotationPath = isDataFieldTypes(lineItem) && ((_lineItem$Value = lineItem.Value) === null || _lineItem$Value === void 0 ? void 0 : (_lineItem$Value$$targ = _lineItem$Value.$target) === null || _lineItem$Value$$targ === void 0 ? void 0 : _lineItem$Value$$targ.fullyQualifiedName) ? getSemanticObjectPath(converterContext, lineItem) : undefined;

        var relativePath = _getRelativePath(lineItem); // Determine properties which are consumed by this LineItem.


        var relatedPropertiesInfo = collectRelatedPropertiesRecursively(lineItem, converterContext, tableType);
        var relatedPropertyNames = Object.keys(relatedPropertiesInfo.properties);
        var additionalPropertyNames = Object.keys(relatedPropertiesInfo.additionalProperties);

        var groupPath = _sliceAtSlash(relativePath, true, false);

        var isGroup = groupPath != relativePath;

        var sLabel = _getLabel(lineItem, isGroup);

        var name = _getAnnotationColumnName(lineItem);

        annotationColumns.push({
          key: KeyHelper.generateKeyFromDataField(lineItem),
          type: ColumnType.Annotation,
          label: sLabel,
          groupLabel: isGroup ? _getLabel(lineItem) : null,
          group: isGroup ? groupPath : null,
          annotationPath: converterContext.getEntitySetBasedAnnotationPath(lineItem.fullyQualifiedName),
          semanticObjectPath: semanticObjectAnnotationPath,
          availability: isDataFieldAlwaysHidden(lineItem) ? AvailabilityType.Hidden : AvailabilityType.Default,
          name: name,
          relativePath: relativePath,
          sortable: _isColumnSortable(lineItem, relativePath, nonSortableColumns),
          propertyInfos: relatedPropertyNames.length > 0 ? relatedPropertyNames : undefined,
          additionalPropertyInfos: additionalPropertyNames.length > 0 ? additionalPropertyNames : undefined,
          exportSettings: {
            template: relatedPropertiesInfo.exportSettingsTemplate,
            wrap: relatedPropertiesInfo.exportSettingsWrapping
          },
          width: ((_lineItem$annotations = lineItem.annotations) === null || _lineItem$annotations === void 0 ? void 0 : (_lineItem$annotations2 = _lineItem$annotations.HTML5) === null || _lineItem$annotations2 === void 0 ? void 0 : (_lineItem$annotations3 = _lineItem$annotations2.CssDefaults) === null || _lineItem$annotations3 === void 0 ? void 0 : _lineItem$annotations3.width) || undefined,
          isNavigable: true,
          formatOptions: getDefaultFormatOptionsForTable(),
          exportContactProperty: relatedPropertiesInfo.exportSettingsContactProperty
        }); // Collect information of related columns to be created.

        relatedPropertyNames.forEach(function (name) {
          columnsToBeCreated[name] = relatedPropertiesInfo.properties[name];
        }); // Create columns for additional properties identified for ALP use case.

        additionalPropertyNames.forEach(function (name) {
          // Intentional overwrite as we require only one new PropertyInfo for a related Property.
          columnsToBeCreated[name] = relatedPropertiesInfo.additionalProperties[name];
        });
      });
    } // Get columns from the Properties of EntityType


    var tableColumns = getColumnsFromEntityType(columnsToBeCreated, entityType, annotationColumns, nonSortableColumns, converterContext, tableType);
    tableColumns = tableColumns.concat(annotationColumns); // Create a propertyInfo for each related property.

    var relatedColumns = _createRelatedColumns(columnsToBeCreated, tableColumns, nonSortableColumns, converterContext, entityType);

    tableColumns = tableColumns.concat(relatedColumns);
    return tableColumns;
  };
  /**
   * Gets the property names from the manifest and checks against existing properties already added by annotations.
   * If a not yet stored property is found it adds it for sorting and filtering only to the annotationColumns.
   * @param {string[] | undefined} properties
   * @param {AnnotationTableColumn[]} annotationColumns
   * @param {ConverterContext} converterContext
   * @param entityType
   * @returns {string[]} The columns from the annotations
   */


  var _getPropertyNames = function (properties, annotationColumns, converterContext, entityType) {
    var matchedProperties;

    if (properties) {
      matchedProperties = properties.map(function (propertyPath) {
        var annotationColumn = annotationColumns.find(function (annotationColumn) {
          return annotationColumn.relativePath === propertyPath && annotationColumn.propertyInfos === undefined;
        });

        if (annotationColumn) {
          return annotationColumn.name;
        } else {
          var relatedColumns = _createRelatedColumns(_defineProperty({}, propertyPath, entityType.resolvePath(propertyPath)), annotationColumns, [], converterContext, entityType);

          annotationColumns.push(relatedColumns[0]);
          return relatedColumns[0].name;
        }
      });
    }

    return matchedProperties;
  };

  var _appendCustomTemplate = function (properties) {
    return properties.map(function (property) {
      return "{".concat(properties.indexOf(property), "}");
    }).join("\n");
  };
  /**
   * Retrieves the table column property value based on certain conditions.
   *
   * Manifest defined property value for custom / annotation columns
   * Default property value for custom column if not overwritten in manifest.
   *
   * @param {any} property The column property defined in the manifest
   * @param {any} defaultValue The default value of the property
   * @param {boolean} isAnnotationColumn Whether the column, defined in manifest, corresponds to an existing annotation column.
   * @returns {any} Determined property value for the column
   */


  var _getManifestOrDefaultValue = function (property, defaultValue, isAnnotationColumn) {
    if (property === undefined) {
      // If annotation column has no property defined in manifest,
      // do not overwrite it with manifest column's default value.
      return isAnnotationColumn ? undefined : defaultValue;
    } // Return what is defined in manifest.


    return property;
  };
  /**
   * Returns table column definitions from manifest.
   * @param columns
   * @param annotationColumns
   * @param converterContext
   * @param entityType
   * @param navigationSettings
   * @returns {Record<string, CustomColumn>} The columns from the manifest
   */


  var getColumnsFromManifest = function (columns, annotationColumns, converterContext, entityType, navigationSettings) {
    var internalColumns = {};

    var _loop = function (key) {
      var _manifestColumn$posit;

      var manifestColumn = columns[key]; // To identify the annotation column property overwrite via manifest use-case.

      var isAnnotationColumn = annotationColumns.some(function (column) {
        return column.key === key;
      });
      KeyHelper.validateKey(key);

      var propertyInfos = _getPropertyNames(manifestColumn.properties, annotationColumns, converterContext, entityType);

      internalColumns[key] = {
        key: key,
        id: "CustomColumn::" + key,
        name: "CustomColumn::" + key,
        header: manifestColumn.header,
        width: manifestColumn.width || undefined,
        horizontalAlign: _getManifestOrDefaultValue(manifestColumn === null || manifestColumn === void 0 ? void 0 : manifestColumn.horizontalAlign, HorizontalAlign.Begin, isAnnotationColumn),
        type: manifestColumn.type === "Slot" ? ColumnType.Slot : ColumnType.Default,
        availability: _getManifestOrDefaultValue(manifestColumn === null || manifestColumn === void 0 ? void 0 : manifestColumn.availability, AvailabilityType.Default, isAnnotationColumn),
        template: manifestColumn.template || "undefined",
        position: {
          anchor: (_manifestColumn$posit = manifestColumn.position) === null || _manifestColumn$posit === void 0 ? void 0 : _manifestColumn$posit.anchor,
          placement: manifestColumn.position === undefined ? Placement.After : manifestColumn.position.placement
        },
        isNavigable: isAnnotationColumn ? undefined : isActionNavigable(manifestColumn, navigationSettings, true),
        settings: manifestColumn.settings,
        sortable: false,
        propertyInfos: propertyInfos,
        formatOptions: _objectSpread({}, getDefaultFormatOptionsForTable(), {}, manifestColumn.formatOptions),
        exportSettings: {
          template: propertyInfos ? _appendCustomTemplate(propertyInfos) : undefined,
          fieldLabel: propertyInfos ? manifestColumn.header : undefined,
          wrap: propertyInfos && propertyInfos.length > 1 ? true : false
        }
      };
    };

    for (var key in columns) {
      _loop(key);
    }

    return internalColumns;
  };

  function getP13nMode(visualizationPath, converterContext, tableManifestConfiguration) {
    var _tableManifestSetting3;

    var manifestWrapper = converterContext.getManifestWrapper();
    var tableManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath);
    var variantManagement = manifestWrapper.getVariantManagement();
    var aPersonalization = [];
    var bAnalyticalTable = tableManifestConfiguration.type === "AnalyticalTable";

    if ((tableManifestSettings === null || tableManifestSettings === void 0 ? void 0 : (_tableManifestSetting3 = tableManifestSettings.tableSettings) === null || _tableManifestSetting3 === void 0 ? void 0 : _tableManifestSetting3.personalization) !== undefined) {
      // Personalization configured in manifest.
      var personalization = tableManifestSettings.tableSettings.personalization;

      if (personalization === true) {
        // Table personalization fully enabled.
        return bAnalyticalTable ? "Sort,Column,Filter,Group,Aggregate" : "Sort,Column,Filter";
      } else if (typeof personalization === "object") {
        // Specific personalization options enabled in manifest. Use them as is.
        if (personalization.sort) {
          aPersonalization.push("Sort");
        }

        if (personalization.column) {
          aPersonalization.push("Column");
        }

        if (personalization.filter) {
          aPersonalization.push("Filter");
        }

        if (personalization.group && bAnalyticalTable) {
          aPersonalization.push("Group");
        }

        if (personalization.aggregate && bAnalyticalTable) {
          aPersonalization.push("Aggregate");
        }

        return aPersonalization.length > 0 ? aPersonalization.join(",") : undefined;
      }
    } else {
      // No personalization configured in manifest.
      aPersonalization.push("Sort");
      aPersonalization.push("Column");

      if (variantManagement === VariantManagementType.Control) {
        // Feature parity with V2.
        // Enable table filtering by default only in case of Control level variant management.
        aPersonalization.push("Filter");
      }

      if (bAnalyticalTable) {
        aPersonalization.push("Group");
        aPersonalization.push("Aggregate");
      }

      return aPersonalization.join(",");
    }

    return undefined;
  }
  /**
   * Function to determine the visibility of the Delete button.
   *
   * @param converterContext The instance of the converter context
   * @param navigationPath Path to the navigation entity
   * @param isTargetDeletable Flag which determines whether a target is deletable
   * @param viewConfiguration The instance of the configuration for the view path
   * @returns {BindingExpression<boolean>} The binding expression for the Delete button
   */


  _exports.getP13nMode = getP13nMode;

  function getDeleteVisible(converterContext, navigationPath, isTargetDeletable, viewConfiguration) {
    var _currentEntitySet$ann;

    var currentEntitySet = converterContext.getEntitySet();
    var dataModelObjectPath = converterContext.getDataModelObjectPath();
    var visitedNavigationPaths = dataModelObjectPath.navigationProperties.map(function (navProp) {
      return navProp.name;
    });
    var isDeleteHiddenExpression = currentEntitySet ? annotationExpression((currentEntitySet === null || currentEntitySet === void 0 ? void 0 : (_currentEntitySet$ann = currentEntitySet.annotations.UI) === null || _currentEntitySet$ann === void 0 ? void 0 : _currentEntitySet$ann.DeleteHidden) || false, visitedNavigationPaths, undefined, function (path) {
      return singletonPathVisitor(path, converterContext, visitedNavigationPaths);
    }) : constant(false);
    var isDeleteHidden = compileBinding(isDeleteHiddenExpression);
    var isParentDeletable, parentEntitySetDeletable;

    if (converterContext.getTemplateType() === TemplateType.ObjectPage) {
      isParentDeletable = isPathDeletable(converterContext.getDataModelObjectPath(), navigationPath);
      parentEntitySetDeletable = isParentDeletable ? compileBinding(isParentDeletable) : isParentDeletable;
    } //do not show case the delete button if parentEntitySetDeletable is false


    if (parentEntitySetDeletable === "false") {
      return false;
    } else if (parentEntitySetDeletable && isDeleteHidden !== "true") {
      //Delete Hidden in case of true and path based
      if (isDeleteHidden && isDeleteHidden !== "false") {
        return "{= !$" + isDeleteHidden + " && ${ui>/editMode} === 'Editable'}";
      } else {
        return "{= ${ui>/editMode} === 'Editable'}";
      }
    } else if (isDeleteHidden === "true" || !isTargetDeletable || viewConfiguration && converterContext.getManifestWrapper().hasMultipleVisualizations(viewConfiguration) || converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
      return false;
    } else if (converterContext.getTemplateType() !== TemplateType.ListReport) {
      if (isDeleteHidden && isDeleteHidden === "false") {
        return "{= !$" + isDeleteHidden + " && ${ui>/editMode} === 'Editable'}";
      } else {
        return "{= ${ui>/editMode} === 'Editable'}";
      }
    } else if (isBinding(isDeleteHiddenExpression)) {
      // UI.DeleteHidden annotation points to a path
      return compileBinding(not(isDeleteHiddenExpression));
    } else {
      return true;
    }
  }
  /**
   * Returns the enablement for the 'Mass Edit' button
   *
   * @param converterContext The converterContext
   * @param bMassEditVisible The visibility of the 'Mass Edit' button
   * @returns {*} Expression or Boolean value for the enablement of the 'Mass Edit' button
   */


  _exports.getDeleteVisible = getDeleteVisible;

  function getEnablementMassEdit(converterContext, bMassEditVisible) {
    if (bMassEditVisible) {
      var isParentUpdatable = isPathUpdatable(converterContext.getDataModelObjectPath(), undefined, true); //when updatable is path based and pointing to current entity set property, that case is handled in table helper and runtime

      if (isParentUpdatable === null || isParentUpdatable === void 0 ? void 0 : isParentUpdatable.currentEntityRestriction) {
        return false;
      }

      var oExpression = compileBinding(isParentUpdatable);
      return isParentUpdatable ? "{= %{internal>numberOfSelectedContexts} >= 2 && " + compileBinding(isParentUpdatable, oExpression) + "}" : false;
    }

    return false;
  }
  /**
   * Returns the visibility for the 'Mass Edit' button
   *
   * @param converterContext The converterContext
   * @param tableManifestConfiguration The manifest configuration for the table
   * @param targetCapabilities The target capability restrictions for the table
   * @param selectionMode The selection mode for the table
   * @returns {*} Expression or Boolean value for the visibility of the 'Mass Edit' button
   */


  _exports.getEnablementMassEdit = getEnablementMassEdit;

  function getVisibilityMassEdit(converterContext, tableManifestConfiguration, targetCapabilities, selectionMode) {
    var _entitySet$annotation, _entitySet$annotation2;

    var entitySet = converterContext.getEntitySet(),
        bUpdateHidden = entitySet && (entitySet === null || entitySet === void 0 ? void 0 : (_entitySet$annotation = entitySet.annotations.UI) === null || _entitySet$annotation === void 0 ? void 0 : (_entitySet$annotation2 = _entitySet$annotation.UpdateHidden) === null || _entitySet$annotation2 === void 0 ? void 0 : _entitySet$annotation2.valueOf()),
        bMassEditEnabled = (tableManifestConfiguration === null || tableManifestConfiguration === void 0 ? void 0 : tableManifestConfiguration.enableMassEdit) || false,
        iSelectionLimit = tableManifestConfiguration === null || tableManifestConfiguration === void 0 ? void 0 : tableManifestConfiguration.selectionLimit;
    var bMassEditVisible = true;

    if (selectionMode && selectionMode === "Single" || iSelectionLimit && iSelectionLimit < 2) {
      bMassEditVisible = false;
    } else if (selectionMode && (selectionMode === "Auto" || selectionMode === "None")) {
      bMassEditVisible = true;
    }

    if ((targetCapabilities === null || targetCapabilities === void 0 ? void 0 : targetCapabilities.isUpdatable) !== false && bMassEditVisible && bMassEditEnabled) {
      if (bUpdateHidden && typeof bUpdateHidden === "boolean") {
        return !bUpdateHidden && converterContext.getTemplateType() === TemplateType.ObjectPage ? compileBinding(UI.IsEditable) : false;
      } else if (bUpdateHidden && (bUpdateHidden === null || bUpdateHidden === void 0 ? void 0 : bUpdateHidden.path)) {
        return converterContext.getTemplateType() === TemplateType.ObjectPage ? compileBinding(and(equal(UI.IsEditable, true), equal(annotationExpression(bUpdateHidden), false))) : false;
      }

      return converterContext.getTemplateType() === TemplateType.ObjectPage ? compileBinding(UI.IsEditable) : false;
    }

    return false;
  }
  /**
   * Function to determine the visibility of the Create button.
   *
   * @param converterContext The instance of the converter context
   * @param creationMode The mode used for creation
   * @param isInsertable Annotation expression of InsertRestrictions.Insertable
   * @param viewConfiguration The instance of the configuration for the view path
   * @returns {Expression<boolean>} Expression or Boolean value of the 'UI.CreateHidden' annotation
   */


  _exports.getVisibilityMassEdit = getVisibilityMassEdit;

  function getCreateVisible(converterContext, creationMode, isInsertable, viewConfiguration) {
    var _currentEntitySet$ann2, _currentEntitySet$ann3, _currentEntitySet$ann4, _currentEntitySet$ann5, _converterContext$get6, _converterContext$get7, _converterContext$get8;

    var currentEntitySet = converterContext.getEntitySet();
    var dataModelObjectPath = converterContext.getDataModelObjectPath();
    var visitedNavigationPaths = dataModelObjectPath.navigationProperties.map(function (navProp) {
      return navProp.name;
    });
    var isCreateHidden = currentEntitySet ? annotationExpression((currentEntitySet === null || currentEntitySet === void 0 ? void 0 : (_currentEntitySet$ann2 = currentEntitySet.annotations.UI) === null || _currentEntitySet$ann2 === void 0 ? void 0 : _currentEntitySet$ann2.CreateHidden) || false, visitedNavigationPaths, undefined, function (path) {
      return singletonPathVisitor(path, converterContext, visitedNavigationPaths);
    }) : constant(false); // if there is a custom new action the create button will be bound against this new action (instead of a POST action).
    // The visibility of the create button then depends on the new action's OperationAvailable annotation (instead of the insertRestrictions):
    // OperationAvailable = true or undefined -> create is visible
    // OperationAvailable = false -> create is not visible

    var newActionName = currentEntitySet === null || currentEntitySet === void 0 ? void 0 : (_currentEntitySet$ann3 = currentEntitySet.annotations.Common) === null || _currentEntitySet$ann3 === void 0 ? void 0 : (_currentEntitySet$ann4 = _currentEntitySet$ann3.DraftRoot) === null || _currentEntitySet$ann4 === void 0 ? void 0 : (_currentEntitySet$ann5 = _currentEntitySet$ann4.NewAction) === null || _currentEntitySet$ann5 === void 0 ? void 0 : _currentEntitySet$ann5.toString();
    var showCreateForNewAction = newActionName ? annotationExpression(converterContext === null || converterContext === void 0 ? void 0 : (_converterContext$get6 = converterContext.getEntityType().actions[newActionName].annotations) === null || _converterContext$get6 === void 0 ? void 0 : (_converterContext$get7 = _converterContext$get6.Core) === null || _converterContext$get7 === void 0 ? void 0 : (_converterContext$get8 = _converterContext$get7.OperationAvailable) === null || _converterContext$get8 === void 0 ? void 0 : _converterContext$get8.valueOf(), [], true) : undefined; // - If it's statically not insertable -> create is not visible
    // - If create is statically hidden -> create is not visible
    // - If it's an ALP template -> create is not visible
    // -
    // - Otherwise
    // 	 - If the create mode is external -> create is visible
    // 	 - If we're on the list report ->
    // 	 	- If UI.CreateHidden points to a property path -> provide a negated binding to this path
    // 	 	- Otherwise, create is visible
    // 	 - Otherwise
    // 	   - This depends on the value of the the UI.IsEditable

    return ifElse(or(or(equal(showCreateForNewAction, false), and(isConstant(isInsertable), equal(isInsertable, false), equal(showCreateForNewAction, undefined))), isConstant(isCreateHidden) && equal(isCreateHidden, true), or(viewConfiguration ? converterContext.getManifestWrapper().hasMultipleVisualizations(viewConfiguration) : false, converterContext.getTemplateType() === TemplateType.AnalyticalListPage)), false, ifElse(creationMode === "External", true, ifElse(converterContext.getTemplateType() === TemplateType.ListReport, ifElse(isBinding(isCreateHidden), not(isCreateHidden), true), and(not(isCreateHidden), UI.IsEditable))));
  }
  /**
   * Returns the visibility for the Paste button.
   *
   * @param converterContext The instance of the converter context
   * @param creationBehaviour The chosen behavior of creation
   * @param isInsertable The expression which denotes insert restrictions
   * @param pasteEnabledInManifest The flag which denotes the paste enablement status via manifest
   * @param viewConfiguration The instance of the configuration for the view path
   * @returns {Expression<boolean>} Expression or Boolean value of the UI.CreateHidden annotation
   */


  _exports.getCreateVisible = getCreateVisible;

  function getPasteEnabled(converterContext, creationBehaviour, isInsertable, pasteEnabledInManifest, viewConfiguration) {
    // If create is not visible -> it's not enabled
    // If create is visible ->
    // 	 If it's in the ListReport -> not enabled
    //	 If it's insertable -> enabled
    return ifElse(pasteEnabledInManifest && equal(getCreateVisible(converterContext, creationBehaviour.mode, isInsertable, viewConfiguration), true), converterContext.getTemplateType() === TemplateType.ObjectPage && isInsertable, false);
  }
  /**
   * Returns a JSON string containing Presentation Variant sort conditions.
   *
   * @param {PresentationVariantTypeTypes | undefined} presentationVariantAnnotation Presentation variant annotation
   * @param columns Converter processed table columns
   * @returns {string | undefined} Sort conditions for a Presentation variant.
   */


  _exports.getPasteEnabled = getPasteEnabled;

  function getSortConditions(presentationVariantAnnotation, columns) {
    var sortConditions;

    if (presentationVariantAnnotation === null || presentationVariantAnnotation === void 0 ? void 0 : presentationVariantAnnotation.SortOrder) {
      var sorters = [];
      var conditions = {
        sorters: sorters
      };
      presentationVariantAnnotation.SortOrder.forEach(function (condition) {
        var _ref12, _ref12$$target, _sortColumn$propertyI, _sortColumn$propertyI2;

        var propertyName = (_ref12 = condition.Property) === null || _ref12 === void 0 ? void 0 : (_ref12$$target = _ref12.$target) === null || _ref12$$target === void 0 ? void 0 : _ref12$$target.name;
        var sortColumn = columns.find(function (column) {
          return column.name === propertyName;
        });
        sortColumn === null || sortColumn === void 0 ? void 0 : (_sortColumn$propertyI = sortColumn.propertyInfos) === null || _sortColumn$propertyI === void 0 ? void 0 : _sortColumn$propertyI.forEach(function (relatedPropertyName) {
          // Complex PropertyInfo. Add each related property for sorting.
          conditions.sorters.push({
            name: relatedPropertyName,
            descending: !!condition.Descending
          });
        });

        if (!(sortColumn === null || sortColumn === void 0 ? void 0 : (_sortColumn$propertyI2 = sortColumn.propertyInfos) === null || _sortColumn$propertyI2 === void 0 ? void 0 : _sortColumn$propertyI2.length)) {
          // Not a complex PropertyInfo. Consider the property itself for sorting.
          conditions.sorters.push({
            name: propertyName,
            descending: !!condition.Descending
          });
        }
      });
      sortConditions = conditions.sorters.length ? JSON.stringify(conditions) : undefined;
    }

    return sortConditions;
  }
  /**
   * Converts an array of propertyPath to an array of propertyInfo names.
   *
   * @param paths the array to be converted
   * @param columns the array of propertyInfos
   * @returns an array of propertyInfo names
   */


  function convertPropertyPathsToInfoNames(paths, columns) {
    var infoNames = [];
    paths.forEach(function (currentPath) {
      var _currentPath$$target;

      if (currentPath === null || currentPath === void 0 ? void 0 : (_currentPath$$target = currentPath.$target) === null || _currentPath$$target === void 0 ? void 0 : _currentPath$$target.name) {
        var propertyInfo = columns.find(function (column) {
          var _currentPath$$target2;

          var annotationColumn = column;
          return !annotationColumn.propertyInfos && annotationColumn.relativePath === (currentPath === null || currentPath === void 0 ? void 0 : (_currentPath$$target2 = currentPath.$target) === null || _currentPath$$target2 === void 0 ? void 0 : _currentPath$$target2.name);
        });

        if (propertyInfo) {
          infoNames.push(propertyInfo.name);
        }
      }
    });
    return infoNames;
  }
  /**
   * Returns a JSON string containing Presentation Variant group conditions.
   *
   * @param {PresentationVariantTypeTypes | undefined} presentationVariantAnnotation Presentation variant annotation
   * @param columns Converter processed table columns
   * @returns {string | undefined} Group conditions for a Presentation variant.
   */


  function getGroupConditions(presentationVariantAnnotation, columns) {
    var groupConditions;

    if (presentationVariantAnnotation === null || presentationVariantAnnotation === void 0 ? void 0 : presentationVariantAnnotation.GroupBy) {
      var aGroupBy = presentationVariantAnnotation.GroupBy;
      var aGroupLevels = convertPropertyPathsToInfoNames(aGroupBy, columns).map(function (infoName) {
        return {
          name: infoName
        };
      });
      groupConditions = aGroupLevels.length ? JSON.stringify({
        groupLevels: aGroupLevels
      }) : undefined;
    }

    return groupConditions;
  }
  /**
   * Returns a JSON string containing Presentation Variant aggregate conditions.
   *
   * @param {PresentationVariantTypeTypes | undefined} presentationVariantAnnotation Presentation variant annotation
   * @param columns Converter processed table columns
   * @returns {string | undefined} Group conditions for a Presentation variant.
   */


  function getAggregateConditions(presentationVariantAnnotation, columns) {
    var aggregateConditions;

    if (presentationVariantAnnotation === null || presentationVariantAnnotation === void 0 ? void 0 : presentationVariantAnnotation.Total) {
      var aTotals = presentationVariantAnnotation.Total;
      var aggregates = {};
      convertPropertyPathsToInfoNames(aTotals, columns).forEach(function (infoName) {
        aggregates[infoName] = {};
      });
      aggregateConditions = JSON.stringify(aggregates);
    }

    return aggregateConditions;
  }

  function getTableAnnotationConfiguration(lineItemAnnotation, visualizationPath, converterContext, tableManifestConfiguration, columns, presentationVariantAnnotation, viewConfiguration) {
    var _converterContext$get9, _converterContext$get10, _converterContext$get11;

    // Need to get the target
    var _splitPath2 = splitPath(visualizationPath),
        navigationPropertyPath = _splitPath2.navigationPropertyPath;

    var title = (_converterContext$get9 = converterContext.getDataModelObjectPath().targetEntityType.annotations) === null || _converterContext$get9 === void 0 ? void 0 : (_converterContext$get10 = _converterContext$get9.UI) === null || _converterContext$get10 === void 0 ? void 0 : (_converterContext$get11 = _converterContext$get10.HeaderInfo) === null || _converterContext$get11 === void 0 ? void 0 : _converterContext$get11.TypeNamePlural;
    var entitySet = converterContext.getDataModelObjectPath().targetEntitySet;
    var pageManifestSettings = converterContext.getManifestWrapper();
    var hasAbsolutePath = navigationPropertyPath.length === 0,
        p13nMode = getP13nMode(visualizationPath, converterContext, tableManifestConfiguration),
        id = navigationPropertyPath ? TableID(visualizationPath) : TableID(converterContext.getContextPath(), "LineItem");
    var targetCapabilities = getCapabilityRestriction(converterContext);
    var selectionMode = getSelectionMode(lineItemAnnotation, visualizationPath, converterContext, hasAbsolutePath, targetCapabilities);
    var threshold = navigationPropertyPath ? 10 : 30;

    if (presentationVariantAnnotation === null || presentationVariantAnnotation === void 0 ? void 0 : presentationVariantAnnotation.MaxItems) {
      threshold = presentationVariantAnnotation.MaxItems.valueOf();
    }

    var navigationTargetPath = getNavigationTargetPath(converterContext, navigationPropertyPath);
    var navigationSettings = pageManifestSettings.getNavigationConfiguration(navigationTargetPath);

    var creationBehaviour = _getCreationBehaviour(lineItemAnnotation, tableManifestConfiguration, converterContext, navigationSettings);

    var isParentDeletable, parentEntitySetDeletable;

    if (converterContext.getTemplateType() === TemplateType.ObjectPage) {
      var _isParentDeletable;

      isParentDeletable = isPathDeletable(converterContext.getDataModelObjectPath(), undefined, true);

      if ((_isParentDeletable = isParentDeletable) === null || _isParentDeletable === void 0 ? void 0 : _isParentDeletable.currentEntityRestriction) {
        parentEntitySetDeletable = undefined;
      } else {
        parentEntitySetDeletable = isParentDeletable ? compileBinding(isParentDeletable, true) : isParentDeletable;
      }
    }

    var dataModelObjectPath = converterContext.getDataModelObjectPath();
    var isInsertable = isPathInsertable(dataModelObjectPath);
    var variantManagement = pageManifestSettings.getVariantManagement();
    var bMassEditVisible = getVisibilityMassEdit(converterContext, tableManifestConfiguration, targetCapabilities, selectionMode);
    return {
      id: id,
      entityName: entitySet ? entitySet.name : "",
      collection: getTargetObjectPath(converterContext.getDataModelObjectPath()),
      navigationPath: navigationPropertyPath,
      row: _getRowConfigurationProperty(lineItemAnnotation, visualizationPath, converterContext, navigationSettings, navigationTargetPath),
      p13nMode: p13nMode,
      show: {
        "delete": getDeleteVisible(converterContext, navigationPropertyPath, targetCapabilities.isDeletable, viewConfiguration),
        create: compileBinding(getCreateVisible(converterContext, creationBehaviour === null || creationBehaviour === void 0 ? void 0 : creationBehaviour.mode, isInsertable)),
        paste: compileBinding(getPasteEnabled(converterContext, creationBehaviour, isInsertable, tableManifestConfiguration.enablePaste, viewConfiguration)),
        massEdit: {
          visible: bMassEditVisible,
          enabled: getEnablementMassEdit(converterContext, bMassEditVisible)
        }
      },
      displayMode: isInDisplayMode(converterContext, viewConfiguration),
      create: creationBehaviour,
      selectionMode: selectionMode,
      autoBindOnInit: converterContext.getTemplateType() !== TemplateType.ListReport && converterContext.getTemplateType() !== TemplateType.AnalyticalListPage && !(viewConfiguration && converterContext.getManifestWrapper().hasMultipleVisualizations(viewConfiguration)),
      variantManagement: variantManagement === "Control" && !p13nMode ? VariantManagementType.None : variantManagement,
      threshold: threshold,
      sortConditions: getSortConditions(presentationVariantAnnotation, columns),
      parentEntityDeleteEnabled: parentEntitySetDeletable,
      title: title
    };
  }

  _exports.getTableAnnotationConfiguration = getTableAnnotationConfiguration;

  function isInDisplayMode(converterContext, viewConfiguration) {
    var templateType = converterContext.getTemplateType();

    if (templateType === TemplateType.ListReport || templateType === TemplateType.AnalyticalListPage || viewConfiguration && converterContext.getManifestWrapper().hasMultipleVisualizations(viewConfiguration)) {
      return true;
    } // updatable will be handled at the property level


    return false;
  }
  /**
   * Split the visualization path into the navigation property path and annotation.
   *
   * @param visualizationPath
   * @returns {object}
   */


  function splitPath(visualizationPath) {
    var _visualizationPath$sp = visualizationPath.split("@"),
        _visualizationPath$sp2 = _slicedToArray(_visualizationPath$sp, 2),
        navigationPropertyPath = _visualizationPath$sp2[0],
        annotationPath = _visualizationPath$sp2[1];

    if (navigationPropertyPath.lastIndexOf("/") === navigationPropertyPath.length - 1) {
      // Drop trailing slash
      navigationPropertyPath = navigationPropertyPath.substr(0, navigationPropertyPath.length - 1);
    }

    return {
      navigationPropertyPath: navigationPropertyPath,
      annotationPath: annotationPath
    };
  }

  function getSelectionVariantConfiguration(selectionVariantPath, converterContext) {
    var resolvedTarget = converterContext.getEntityTypeAnnotation(selectionVariantPath);
    var selection = resolvedTarget.annotation;

    if (selection) {
      var _selection$SelectOpti, _selection$Text;

      var propertyNames = [];
      (_selection$SelectOpti = selection.SelectOptions) === null || _selection$SelectOpti === void 0 ? void 0 : _selection$SelectOpti.forEach(function (selectOption) {
        var propertyName = selectOption.PropertyName;
        var PropertyPath = propertyName.value;

        if (propertyNames.indexOf(PropertyPath) === -1) {
          propertyNames.push(PropertyPath);
        }
      });
      return {
        text: selection === null || selection === void 0 ? void 0 : (_selection$Text = selection.Text) === null || _selection$Text === void 0 ? void 0 : _selection$Text.toString(),
        propertyNames: propertyNames
      };
    }

    return undefined;
  }

  _exports.getSelectionVariantConfiguration = getSelectionVariantConfiguration;

  function getTableManifestConfiguration(lineItemAnnotation, visualizationPath, converterContext) {
    var _tableSettings$quickV5;

    var checkCondensedLayout = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var tableManifestSettings = converterContext.getManifestControlConfiguration(visualizationPath);
    var tableSettings = tableManifestSettings && tableManifestSettings.tableSettings || {};
    var quickSelectionVariant;
    var quickFilterPaths = [];
    var enableExport = true;
    var creationMode = CreationMode.NewPage;
    var filters;
    var createAtEnd = true;
    var disableAddRowButtonForEmptyData = false;
    var customValidationFunction;
    var condensedTableLayout = false;
    var hideTableTitle = false;
    var tableType = "ResponsiveTable";
    var enableFullScreen = false;
    var selectionLimit = 200;
    var enablePaste = converterContext.getTemplateType() === "ObjectPage";
    var isCondensedTableLayoutCompliant = checkCondensedLayout && converterContext.getManifestWrapper().isCondensedLayoutCompliant();
    var entityType = converterContext.getEntityType();
    var aggregationHelper = new AggregationHelper(entityType, converterContext);

    if (lineItemAnnotation) {
      var _tableSettings$quickV, _tableSettings$quickV2, _tableSettings$creati, _tableSettings$creati2, _tableSettings$creati3, _tableSettings$creati4, _tableSettings$creati5, _tableSettings$quickV4;

      var targetEntityType = converterContext.getAnnotationEntityType(lineItemAnnotation);
      tableSettings === null || tableSettings === void 0 ? void 0 : (_tableSettings$quickV = tableSettings.quickVariantSelection) === null || _tableSettings$quickV === void 0 ? void 0 : (_tableSettings$quickV2 = _tableSettings$quickV.paths) === null || _tableSettings$quickV2 === void 0 ? void 0 : _tableSettings$quickV2.forEach(function (path) {
        var _tableSettings$quickV3;

        quickSelectionVariant = targetEntityType.resolvePath("@" + path.annotationPath); // quickSelectionVariant = converterContext.getEntityTypeAnnotation(path.annotationPath);

        if (quickSelectionVariant) {
          quickFilterPaths.push({
            annotationPath: path.annotationPath
          });
        }

        filters = {
          quickFilters: {
            enabled: converterContext.getTemplateType() === TemplateType.ListReport ? "{= ${pageInternal>hasPendingFilters} !== true}" : true,
            showCounts: tableSettings === null || tableSettings === void 0 ? void 0 : (_tableSettings$quickV3 = tableSettings.quickVariantSelection) === null || _tableSettings$quickV3 === void 0 ? void 0 : _tableSettings$quickV3.showCounts,
            paths: quickFilterPaths
          }
        };
      });
      creationMode = ((_tableSettings$creati = tableSettings.creationMode) === null || _tableSettings$creati === void 0 ? void 0 : _tableSettings$creati.name) || creationMode;
      createAtEnd = ((_tableSettings$creati2 = tableSettings.creationMode) === null || _tableSettings$creati2 === void 0 ? void 0 : _tableSettings$creati2.createAtEnd) !== undefined ? (_tableSettings$creati3 = tableSettings.creationMode) === null || _tableSettings$creati3 === void 0 ? void 0 : _tableSettings$creati3.createAtEnd : true;
      customValidationFunction = (_tableSettings$creati4 = tableSettings.creationMode) === null || _tableSettings$creati4 === void 0 ? void 0 : _tableSettings$creati4.customValidationFunction; // if a custom validation function is provided, disableAddRowButtonForEmptyData should not be considered, i.e. set to false

      disableAddRowButtonForEmptyData = !customValidationFunction ? !!((_tableSettings$creati5 = tableSettings.creationMode) === null || _tableSettings$creati5 === void 0 ? void 0 : _tableSettings$creati5.disableAddRowButtonForEmptyData) : false;
      condensedTableLayout = tableSettings.condensedTableLayout !== undefined ? tableSettings.condensedTableLayout : false;
      hideTableTitle = !!((_tableSettings$quickV4 = tableSettings.quickVariantSelection) === null || _tableSettings$quickV4 === void 0 ? void 0 : _tableSettings$quickV4.hideTableTitle);
      tableType = (tableSettings === null || tableSettings === void 0 ? void 0 : tableSettings.type) || "ResponsiveTable";

      if (converterContext.getTemplateType() !== "ObjectPage") {
        if ((tableSettings === null || tableSettings === void 0 ? void 0 : tableSettings.type) === "AnalyticalTable" && !aggregationHelper.isAnalyticsSupported()) {
          tableType = "GridTable";
        }

        if (!(tableSettings === null || tableSettings === void 0 ? void 0 : tableSettings.type)) {
          if (converterContext.getManifestWrapper().isDesktop() && aggregationHelper.isAnalyticsSupported()) {
            tableType = "AnalyticalTable";
          } else {
            tableType = "ResponsiveTable";
          }
        }
      }

      enableFullScreen = tableSettings.enableFullScreen || false;

      if (enableFullScreen === true && converterContext.getTemplateType() === TemplateType.ListReport) {
        enableFullScreen = false;
        converterContext.getDiagnostics().addIssue(IssueCategory.Manifest, IssueSeverity.Low, IssueType.FULLSCREENMODE_NOT_ON_LISTREPORT);
      }

      selectionLimit = tableSettings.selectAll === true || tableSettings.selectionLimit === 0 ? 0 : tableSettings.selectionLimit || 200;
      enablePaste = converterContext.getTemplateType() === "ObjectPage" && tableSettings.enablePaste !== false;
      enableExport = tableSettings.enableExport !== undefined ? tableSettings.enableExport : converterContext.getTemplateType() !== "ObjectPage" || enablePaste;
    }

    return {
      filters: filters,
      type: tableType,
      enableFullScreen: enableFullScreen,
      headerVisible: !(quickSelectionVariant && hideTableTitle),
      enableExport: enableExport,
      creationMode: creationMode,
      createAtEnd: createAtEnd,
      disableAddRowButtonForEmptyData: disableAddRowButtonForEmptyData,
      customValidationFunction: customValidationFunction,
      useCondensedTableLayout: condensedTableLayout && isCondensedTableLayoutCompliant,
      selectionLimit: selectionLimit,
      enablePaste: enablePaste,
      showRowCount: !(tableSettings === null || tableSettings === void 0 ? void 0 : (_tableSettings$quickV5 = tableSettings.quickVariantSelection) === null || _tableSettings$quickV5 === void 0 ? void 0 : _tableSettings$quickV5.showCounts),
      enableMassEdit: tableSettings === null || tableSettings === void 0 ? void 0 : tableSettings.enableMassEdit
    };
  }

  _exports.getTableManifestConfiguration = getTableManifestConfiguration;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlLnRzIl0sIm5hbWVzIjpbIkNvbHVtblR5cGUiLCJnZXRUYWJsZUFjdGlvbnMiLCJsaW5lSXRlbUFubm90YXRpb24iLCJ2aXN1YWxpemF0aW9uUGF0aCIsImNvbnZlcnRlckNvbnRleHQiLCJuYXZpZ2F0aW9uU2V0dGluZ3MiLCJhVGFibGVBY3Rpb25zIiwiZ2V0VGFibGVBbm5vdGF0aW9uQWN0aW9ucyIsImFBbm5vdGF0aW9uQWN0aW9ucyIsInRhYmxlQWN0aW9ucyIsImFIaWRkZW5BY3Rpb25zIiwiaGlkZGVuVGFibGVBY3Rpb25zIiwiaW5zZXJ0Q3VzdG9tRWxlbWVudHMiLCJnZXRBY3Rpb25zRnJvbU1hbmlmZXN0IiwiZ2V0TWFuaWZlc3RDb250cm9sQ29uZmlndXJhdGlvbiIsImFjdGlvbnMiLCJpc05hdmlnYWJsZSIsImVuYWJsZU9uU2VsZWN0IiwiZW5hYmxlQXV0b1Njcm9sbCIsImVuYWJsZWQiLCJkZWZhdWx0VmFsdWVzRXh0ZW5zaW9uRnVuY3Rpb24iLCJnZXRUYWJsZUNvbHVtbnMiLCJhbm5vdGF0aW9uQ29sdW1ucyIsImdldENvbHVtbnNGcm9tQW5ub3RhdGlvbnMiLCJtYW5pZmVzdENvbHVtbnMiLCJnZXRDb2x1bW5zRnJvbU1hbmlmZXN0IiwiY29sdW1ucyIsImdldEFubm90YXRpb25FbnRpdHlUeXBlIiwid2lkdGgiLCJhdmFpbGFiaWxpdHkiLCJzZXR0aW5ncyIsImhvcml6b250YWxBbGlnbiIsImZvcm1hdE9wdGlvbnMiLCJnZXRBZ2dyZWdhdGVEZWZpbml0aW9uc0Zyb21FbnRpdHlUeXBlIiwiZW50aXR5VHlwZSIsInRhYmxlQ29sdW1ucyIsImFnZ3JlZ2F0aW9uSGVscGVyIiwiQWdncmVnYXRpb25IZWxwZXIiLCJmaW5kQ29sdW1uRnJvbVBhdGgiLCJwYXRoIiwiZmluZCIsImNvbHVtbiIsImFubm90YXRpb25Db2x1bW4iLCJwcm9wZXJ0eUluZm9zIiwidW5kZWZpbmVkIiwicmVsYXRpdmVQYXRoIiwiaXNBbmFseXRpY3NTdXBwb3J0ZWQiLCJtQ3VycmVuY3lPclVuaXRQcm9wZXJ0aWVzIiwiU2V0IiwiZm9yRWFjaCIsIm9Db2x1bW4iLCJvVGFibGVDb2x1bW4iLCJ1bml0IiwiYWRkIiwibVJhd0RlZmluaXRpb25zIiwiZ2V0Q3VzdG9tQWdncmVnYXRlRGVmaW5pdGlvbnMiLCJtUmVzdWx0IiwiYVJhd0NvbnRleHREZWZpbmluZ1Byb3BlcnRpZXMiLCJoYXMiLCJuYW1lIiwiaXNEYXRhUG9pbnRGYWtlVGFyZ2V0UHJvcGVydHkiLCJkZWZhdWx0QWdncmVnYXRlIiwiYUNvbnRleHREZWZpbmluZ1Byb3BlcnRpZXMiLCJjb250ZXh0RGVmaW5pbmdQcm9wZXJ0eU5hbWUiLCJwdXNoIiwibGVuZ3RoIiwiY29udGV4dERlZmluaW5nUHJvcGVydGllcyIsInVwZGF0ZVRhYmxlVmlzdWFsaXphdGlvbkZvckFuYWx5dGljcyIsInRhYmxlVmlzdWFsaXphdGlvbiIsInByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uIiwiY29udHJvbCIsInR5cGUiLCJhZ2dyZWdhdGVzRGVmaW5pdGlvbnMiLCJlbmFibGVBbmFseXRpY3MiLCJhZ2dyZWdhdGVzIiwiYW5ub3RhdGlvbiIsImdyb3VwQ29uZGl0aW9ucyIsImdldEdyb3VwQ29uZGl0aW9ucyIsImFnZ3JlZ2F0ZUNvbmRpdGlvbnMiLCJnZXRBZ2dyZWdhdGVDb25kaXRpb25zIiwiZ2V0TmF2aWdhdGlvblRhcmdldFBhdGgiLCJuYXZpZ2F0aW9uUHJvcGVydHlQYXRoIiwibWFuaWZlc3RXcmFwcGVyIiwiZ2V0TWFuaWZlc3RXcmFwcGVyIiwiZ2V0TmF2aWdhdGlvbkNvbmZpZ3VyYXRpb24iLCJuYXZDb25maWciLCJPYmplY3QiLCJrZXlzIiwiZGF0YU1vZGVsUGF0aCIsImdldERhdGFNb2RlbE9iamVjdFBhdGgiLCJjb250ZXh0UGF0aCIsImdldENvbnRleHRQYXRoIiwibmF2Q29uZmlnRm9yQ29udGV4dFBhdGgiLCJ0YXJnZXRFbnRpdHlTZXQiLCJzdGFydGluZ0VudGl0eVNldCIsInVwZGF0ZUxpbmtlZFByb3BlcnRpZXMiLCJmaW5kQ29sdW1uQnlQYXRoIiwib1Byb3BlcnR5IiwiZW50aXR5UHJvcGVydGllcyIsIm9Qcm9wIiwic1VuaXQiLCJnZXRBc3NvY2lhdGVkQ3VycmVuY3lQcm9wZXJ0eSIsImdldEFzc29jaWF0ZWRVbml0UHJvcGVydHkiLCJvVW5pdENvbHVtbiIsImRpc3BsYXlNb2RlIiwiZ2V0RGlzcGxheU1vZGUiLCJ0ZXh0QW5ub3RhdGlvbiIsImFubm90YXRpb25zIiwiQ29tbW9uIiwiVGV4dCIsImlzUGF0aEV4cHJlc3Npb24iLCJvVGV4dENvbHVtbiIsInRleHRBcnJhbmdlbWVudCIsInRleHRQcm9wZXJ0eSIsIm1vZGUiLCJjcmVhdGVUYWJsZVZpc3VhbGl6YXRpb24iLCJpc0NvbmRlbnNlZFRhYmxlTGF5b3V0Q29tcGxpYW50Iiwidmlld0NvbmZpZ3VyYXRpb24iLCJ0YWJsZU1hbmlmZXN0Q29uZmlnIiwiZ2V0VGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24iLCJzcGxpdFBhdGgiLCJuYXZpZ2F0aW9uVGFyZ2V0UGF0aCIsIm9WaXN1YWxpemF0aW9uIiwiVmlzdWFsaXphdGlvblR5cGUiLCJUYWJsZSIsImdldFRhYmxlQW5ub3RhdGlvbkNvbmZpZ3VyYXRpb24iLCJyZW1vdmVEdXBsaWNhdGVBY3Rpb25zIiwiZW5hYmxlRGF0YVN0YXRlRmlsdGVyIiwiZ2V0VGVtcGxhdGVUeXBlIiwib3BlcmF0aW9uQXZhaWxhYmxlTWFwIiwiZ2V0T3BlcmF0aW9uQXZhaWxhYmxlTWFwIiwiY3JlYXRlRGVmYXVsdFRhYmxlVmlzdWFsaXphdGlvbiIsImdldENvbHVtbnNGcm9tRW50aXR5VHlwZSIsImdldEVudGl0eVR5cGUiLCJkYXRhRmllbGQiLCIkVHlwZSIsImFjdGlvbk5hbWUiLCJBY3Rpb24iLCJpbmRleE9mIiwiRGV0ZXJtaW5pbmciLCJhY3Rpb25UYXJnZXQiLCJBY3Rpb25UYXJnZXQiLCJwYXJhbWV0ZXJzIiwiYmluZGluZ1BhcmFtZXRlckZ1bGxOYW1lIiwiZnVsbHlRdWFsaWZpZWROYW1lIiwiYmluZGluZ1BhcmFtZXRlciIsInN1YnN0cmluZyIsImxhc3RJbmRleE9mIiwidGFyZ2V0RXhwcmVzc2lvbiIsImFubm90YXRpb25FeHByZXNzaW9uIiwiQ29yZSIsIk9wZXJhdGlvbkF2YWlsYWJsZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJnZXRVSUhpZGRlbkV4cEZvckFjdGlvbnNSZXF1aXJpbmdDb250ZXh0IiwiY3VycmVudEVudGl0eVR5cGUiLCJjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aCIsImlzRW50aXR5U2V0IiwiYVVpSGlkZGVuUGF0aEV4cHJlc3Npb25zIiwiaXNCb3VuZCIsInNvdXJjZUVudGl0eVR5cGUiLCJSZXF1aXJlc0NvbnRleHQiLCJJbmxpbmUiLCJ2YWx1ZU9mIiwiVUkiLCJIaWRkZW4iLCJlcXVhbCIsImdldEJpbmRpbmdFeHBGcm9tQ29udGV4dCIsInNvdXJjZSIsInNFeHByZXNzaW9uIiwidmlzaWJsZSIsInNQYXRoIiwiYVNwbGl0UGF0aCIsInNwbGl0Iiwic05hdmlnYXRpb25QYXRoIiwidGFyZ2V0T2JqZWN0IiwiX3R5cGUiLCJwYXJ0bmVyIiwiYmluZGluZ0V4cHJlc3Npb24iLCJzbGljZSIsImpvaW4iLCJjb25zdGFudCIsImhhc0JvdW5kQWN0aW9uc0Fsd2F5c1Zpc2libGVJblRvb2xCYXIiLCJzb21lIiwiaGFzQ3VzdG9tQWN0aW9uc0Fsd2F5c1Zpc2libGVJblRvb2xCYXIiLCJtYW5pZmVzdEFjdGlvbnMiLCJhY3Rpb25LZXkiLCJhY3Rpb24iLCJyZXF1aXJlc1NlbGVjdGlvbiIsInRvU3RyaW5nIiwiZ2V0VmlzaWJsZUV4cEZvckN1c3RvbUFjdGlvbnNSZXF1aXJpbmdDb250ZXh0IiwiYVZpc2libGVQYXRoRXhwcmVzc2lvbnMiLCJyZXNvbHZlQmluZGluZ1N0cmluZyIsImdldENhcGFiaWxpdHlSZXN0cmljdGlvbiIsImlzRGVsZXRhYmxlIiwiaXNQYXRoRGVsZXRhYmxlIiwiaXNVcGRhdGFibGUiLCJpc1BhdGhVcGRhdGFibGUiLCJpc0NvbnN0YW50IiwidmFsdWUiLCJnZXRTZWxlY3Rpb25Nb2RlIiwidGFyZ2V0Q2FwYWJpbGl0aWVzIiwiU2VsZWN0aW9uTW9kZSIsIk5vbmUiLCJ0YWJsZU1hbmlmZXN0U2V0dGluZ3MiLCJzZWxlY3Rpb25Nb2RlIiwidGFibGVTZXR0aW5ncyIsImFIaWRkZW5CaW5kaW5nRXhwcmVzc2lvbnMiLCJhVmlzaWJsZUJpbmRpbmdFeHByZXNzaW9ucyIsImlzUGFyZW50RGVsZXRhYmxlIiwicGFyZW50RW50aXR5U2V0RGVsZXRhYmxlIiwiVGVtcGxhdGVUeXBlIiwiT2JqZWN0UGFnZSIsImNvbXBpbGVCaW5kaW5nIiwiTXVsdGkiLCJpZkVsc2UiLCJBdXRvIiwib3IiLCJjb25jYXQiLCJ0YWJsZUFjdGlvbiIsImlzRGF0YUZpZWxkRm9yQWN0aW9uQWJzdHJhY3QiLCJrZXkiLCJLZXlIZWxwZXIiLCJnZW5lcmF0ZUtleUZyb21EYXRhRmllbGQiLCJBY3Rpb25UeXBlIiwiRGF0YUZpZWxkRm9yQWN0aW9uIiwiYW5ub3RhdGlvblBhdGgiLCJnZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoIiwibm90IiwiZ2V0UmVsYXRpdmVNb2RlbFBhdGhGdW5jdGlvbiIsIkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiIsIkRlZmF1bHQiLCJnZXRIaWdobGlnaHRSb3dCaW5kaW5nIiwiY3JpdGljYWxpdHlBbm5vdGF0aW9uIiwiaXNEcmFmdFJvb3QiLCJ0YXJnZXRFbnRpdHlUeXBlIiwiZGVmYXVsdEhpZ2hsaWdodFJvd0RlZmluaXRpb24iLCJNZXNzYWdlVHlwZSIsImdldE1lc3NhZ2VUeXBlRnJvbUNyaXRpY2FsaXR5VHlwZSIsIkRyYWZ0IiwiSXNOZXdPYmplY3QiLCJJbmZvcm1hdGlvbiIsImZvcm1hdFJlc3VsdCIsInRhYmxlRm9ybWF0dGVycyIsInJvd0hpZ2hsaWdodGluZyIsIl9nZXRDcmVhdGlvbkJlaGF2aW91ciIsInRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uIiwibmF2aWdhdGlvbiIsImNyZWF0ZSIsImRldGFpbCIsIm91dGJvdW5kIiwib3V0Ym91bmREZXRhaWwiLCJuZXdBY3Rpb24iLCJ0YXJnZXRBbm5vdGF0aW9ucyIsImdldEVudGl0eVNldCIsIkRyYWZ0Um9vdCIsIk5ld0FjdGlvbiIsIlNlc3Npb24iLCJTdGlja3lTZXNzaW9uU3VwcG9ydGVkIiwiY3JlYXRpb25Nb2RlIiwiQ3JlYXRpb25Nb2RlIiwiQ3JlYXRpb25Sb3ciLCJFcnJvciIsInJvdXRlIiwiYXBwZW5kIiwiY3JlYXRlQXRFbmQiLCJuYXZpZ2F0ZVRvVGFyZ2V0IiwiTmV3UGFnZSIsIl9nZXRSb3dDb25maWd1cmF0aW9uUHJvcGVydHkiLCJ0YXJnZXRQYXRoIiwicHJlc3NQcm9wZXJ0eSIsIm5hdmlnYXRpb25UYXJnZXQiLCJjcml0aWNhbGl0eVByb3BlcnR5IiwiZGlzcGxheSIsInRhcmdldCIsIkNyaXRpY2FsaXR5IiwiRHJhZnROb2RlIiwicm93TmF2aWdhdGVkRXhwcmVzc2lvbiIsIm5hdmlnYXRlZFJvdyIsInByZXNzIiwicm93TmF2aWdhdGVkIiwiY29sdW1uc1RvQmVDcmVhdGVkIiwibm9uU29ydGFibGVDb2x1bW5zIiwidGFibGVUeXBlIiwicHJvcGVydHkiLCJleGlzdHMiLCJ0YXJnZXRUeXBlIiwicmVsYXRlZFByb3BlcnRpZXNJbmZvIiwiY29sbGVjdFJlbGF0ZWRQcm9wZXJ0aWVzIiwicmVsYXRlZFByb3BlcnR5TmFtZXMiLCJwcm9wZXJ0aWVzIiwiYWRkaXRpb25hbFByb3BlcnR5TmFtZXMiLCJhZGRpdGlvbmFsUHJvcGVydGllcyIsImNvbHVtbkluZm8iLCJnZXRDb2x1bW5EZWZpbml0aW9uRnJvbVByb3BlcnR5IiwiZXhwb3J0U2V0dGluZ3MiLCJ0ZW1wbGF0ZSIsImV4cG9ydFNldHRpbmdzVGVtcGxhdGUiLCJ3cmFwIiwiZXhwb3J0U2V0dGluZ3NXcmFwcGluZyIsImFkZGl0aW9uYWxQcm9wZXJ0eUluZm9zIiwiZnVsbFByb3BlcnR5UGF0aCIsInVzZURhdGFGaWVsZFByZWZpeCIsImF2YWlsYWJsZUZvckFkYXB0YXRpb24iLCJyZXBsYWNlU3BlY2lhbENoYXJzIiwic2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aCIsImdldFNlbWFudGljT2JqZWN0UGF0aCIsImlzSGlkZGVuIiwiZ3JvdXBQYXRoIiwiX3NsaWNlQXRTbGFzaCIsImlzR3JvdXAiLCJpc0RhdGFQb2ludEZha2VQcm9wZXJ0eSIsImdldFRhcmdldFZhbHVlT25EYXRhUG9pbnQiLCJpc0dyb3VwYWJsZSIsImlzUHJvcGVydHlHcm91cGFibGUiLCJBbm5vdGF0aW9uIiwibGFiZWwiLCJfZ2V0TGFiZWwiLCJncm91cExhYmVsIiwiZ3JvdXAiLCJzZW1hbnRpY09iamVjdFBhdGgiLCJBdmFpbGFiaWxpdHlUeXBlIiwiQWRhcHRhdGlvbiIsIkRhdGFGaWVsZERlZmF1bHQiLCJUYXJnZXQiLCIkdGFyZ2V0IiwiVmFsdWUiLCJzb3J0YWJsZSIsImlzS2V5IiwiX2lzVmFsaWRDb2x1bW4iLCJpc1Byb3BlcnR5IiwiZGF0YUZpZWxkRGVmYXVsdCIsInF1YWxpZmllciIsIkxhYmVsIiwiaXNEYXRhRmllbGRUeXBlcyIsIl9jcmVhdGVSZWxhdGVkQ29sdW1ucyIsImV4aXN0aW5nQ29sdW1ucyIsInJlbGF0ZWRDb2x1bW5zIiwicmVsYXRlZFByb3BlcnR5TmFtZU1hcCIsImdldEFic29sdXRlQW5ub3RhdGlvblBhdGgiLCJyZWxhdGVkQ29sdW1uIiwibmV3TmFtZSIsIm1hcCIsInByb3BlcnR5SW5mbyIsIl9nZXRBbm5vdGF0aW9uQ29sdW1uTmFtZSIsIl9nZXRSZWxhdGl2ZVBhdGgiLCJpc0xhc3RTbGFzaCIsImlzTGFzdFBhcnQiLCJpU2xhc2hJbmRleCIsIl9pc0NvbHVtblNvcnRhYmxlIiwicHJvcGVydHlQYXRoIiwiaXNTb3J0YWJsZSIsImdldERlZmF1bHRGb3JtYXRPcHRpb25zRm9yVGFibGUiLCJ0ZXh0TGluZXNEaXNwbGF5IiwidGV4dExpbmVzRWRpdCIsIkNhcGFiaWxpdGllcyIsIlNvcnRSZXN0cmljdGlvbnMiLCJOb25Tb3J0YWJsZVByb3BlcnRpZXMiLCJsaW5lSXRlbSIsImNvbGxlY3RSZWxhdGVkUHJvcGVydGllc1JlY3Vyc2l2ZWx5Iiwic0xhYmVsIiwiaXNEYXRhRmllbGRBbHdheXNIaWRkZW4iLCJIVE1MNSIsIkNzc0RlZmF1bHRzIiwiZXhwb3J0Q29udGFjdFByb3BlcnR5IiwiZXhwb3J0U2V0dGluZ3NDb250YWN0UHJvcGVydHkiLCJfZ2V0UHJvcGVydHlOYW1lcyIsIm1hdGNoZWRQcm9wZXJ0aWVzIiwicmVzb2x2ZVBhdGgiLCJfYXBwZW5kQ3VzdG9tVGVtcGxhdGUiLCJfZ2V0TWFuaWZlc3RPckRlZmF1bHRWYWx1ZSIsImRlZmF1bHRWYWx1ZSIsImlzQW5ub3RhdGlvbkNvbHVtbiIsImludGVybmFsQ29sdW1ucyIsIm1hbmlmZXN0Q29sdW1uIiwidmFsaWRhdGVLZXkiLCJpZCIsImhlYWRlciIsIkhvcml6b250YWxBbGlnbiIsIkJlZ2luIiwiU2xvdCIsInBvc2l0aW9uIiwiYW5jaG9yIiwicGxhY2VtZW50IiwiUGxhY2VtZW50IiwiQWZ0ZXIiLCJpc0FjdGlvbk5hdmlnYWJsZSIsImZpZWxkTGFiZWwiLCJnZXRQMTNuTW9kZSIsInZhcmlhbnRNYW5hZ2VtZW50IiwiZ2V0VmFyaWFudE1hbmFnZW1lbnQiLCJhUGVyc29uYWxpemF0aW9uIiwiYkFuYWx5dGljYWxUYWJsZSIsInBlcnNvbmFsaXphdGlvbiIsInNvcnQiLCJmaWx0ZXIiLCJhZ2dyZWdhdGUiLCJWYXJpYW50TWFuYWdlbWVudFR5cGUiLCJDb250cm9sIiwiZ2V0RGVsZXRlVmlzaWJsZSIsIm5hdmlnYXRpb25QYXRoIiwiaXNUYXJnZXREZWxldGFibGUiLCJjdXJyZW50RW50aXR5U2V0IiwiZGF0YU1vZGVsT2JqZWN0UGF0aCIsInZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMiLCJuYXZpZ2F0aW9uUHJvcGVydGllcyIsIm5hdlByb3AiLCJpc0RlbGV0ZUhpZGRlbkV4cHJlc3Npb24iLCJEZWxldGVIaWRkZW4iLCJzaW5nbGV0b25QYXRoVmlzaXRvciIsImlzRGVsZXRlSGlkZGVuIiwiaGFzTXVsdGlwbGVWaXN1YWxpemF0aW9ucyIsIkFuYWx5dGljYWxMaXN0UGFnZSIsIkxpc3RSZXBvcnQiLCJpc0JpbmRpbmciLCJnZXRFbmFibGVtZW50TWFzc0VkaXQiLCJiTWFzc0VkaXRWaXNpYmxlIiwiaXNQYXJlbnRVcGRhdGFibGUiLCJjdXJyZW50RW50aXR5UmVzdHJpY3Rpb24iLCJvRXhwcmVzc2lvbiIsImdldFZpc2liaWxpdHlNYXNzRWRpdCIsImVudGl0eVNldCIsImJVcGRhdGVIaWRkZW4iLCJVcGRhdGVIaWRkZW4iLCJiTWFzc0VkaXRFbmFibGVkIiwiZW5hYmxlTWFzc0VkaXQiLCJpU2VsZWN0aW9uTGltaXQiLCJzZWxlY3Rpb25MaW1pdCIsIklzRWRpdGFibGUiLCJhbmQiLCJnZXRDcmVhdGVWaXNpYmxlIiwiaXNJbnNlcnRhYmxlIiwiaXNDcmVhdGVIaWRkZW4iLCJDcmVhdGVIaWRkZW4iLCJuZXdBY3Rpb25OYW1lIiwic2hvd0NyZWF0ZUZvck5ld0FjdGlvbiIsImdldFBhc3RlRW5hYmxlZCIsImNyZWF0aW9uQmVoYXZpb3VyIiwicGFzdGVFbmFibGVkSW5NYW5pZmVzdCIsImdldFNvcnRDb25kaXRpb25zIiwic29ydENvbmRpdGlvbnMiLCJTb3J0T3JkZXIiLCJzb3J0ZXJzIiwiY29uZGl0aW9ucyIsImNvbmRpdGlvbiIsInByb3BlcnR5TmFtZSIsIlByb3BlcnR5Iiwic29ydENvbHVtbiIsInJlbGF0ZWRQcm9wZXJ0eU5hbWUiLCJkZXNjZW5kaW5nIiwiRGVzY2VuZGluZyIsImNvbnZlcnRQcm9wZXJ0eVBhdGhzVG9JbmZvTmFtZXMiLCJwYXRocyIsImluZm9OYW1lcyIsImN1cnJlbnRQYXRoIiwiR3JvdXBCeSIsImFHcm91cEJ5IiwiYUdyb3VwTGV2ZWxzIiwiaW5mb05hbWUiLCJncm91cExldmVscyIsIlRvdGFsIiwiYVRvdGFscyIsInRpdGxlIiwiSGVhZGVySW5mbyIsIlR5cGVOYW1lUGx1cmFsIiwicGFnZU1hbmlmZXN0U2V0dGluZ3MiLCJoYXNBYnNvbHV0ZVBhdGgiLCJwMTNuTW9kZSIsIlRhYmxlSUQiLCJ0aHJlc2hvbGQiLCJNYXhJdGVtcyIsImlzUGF0aEluc2VydGFibGUiLCJlbnRpdHlOYW1lIiwiY29sbGVjdGlvbiIsImdldFRhcmdldE9iamVjdFBhdGgiLCJyb3ciLCJzaG93IiwicGFzdGUiLCJlbmFibGVQYXN0ZSIsIm1hc3NFZGl0IiwiaXNJbkRpc3BsYXlNb2RlIiwiYXV0b0JpbmRPbkluaXQiLCJwYXJlbnRFbnRpdHlEZWxldGVFbmFibGVkIiwidGVtcGxhdGVUeXBlIiwic3Vic3RyIiwiZ2V0U2VsZWN0aW9uVmFyaWFudENvbmZpZ3VyYXRpb24iLCJzZWxlY3Rpb25WYXJpYW50UGF0aCIsInJlc29sdmVkVGFyZ2V0IiwiZ2V0RW50aXR5VHlwZUFubm90YXRpb24iLCJzZWxlY3Rpb24iLCJwcm9wZXJ0eU5hbWVzIiwiU2VsZWN0T3B0aW9ucyIsInNlbGVjdE9wdGlvbiIsIlByb3BlcnR5TmFtZSIsIlByb3BlcnR5UGF0aCIsInRleHQiLCJjaGVja0NvbmRlbnNlZExheW91dCIsInF1aWNrU2VsZWN0aW9uVmFyaWFudCIsInF1aWNrRmlsdGVyUGF0aHMiLCJlbmFibGVFeHBvcnQiLCJmaWx0ZXJzIiwiZGlzYWJsZUFkZFJvd0J1dHRvbkZvckVtcHR5RGF0YSIsImN1c3RvbVZhbGlkYXRpb25GdW5jdGlvbiIsImNvbmRlbnNlZFRhYmxlTGF5b3V0IiwiaGlkZVRhYmxlVGl0bGUiLCJlbmFibGVGdWxsU2NyZWVuIiwiaXNDb25kZW5zZWRMYXlvdXRDb21wbGlhbnQiLCJxdWlja1ZhcmlhbnRTZWxlY3Rpb24iLCJxdWlja0ZpbHRlcnMiLCJzaG93Q291bnRzIiwiaXNEZXNrdG9wIiwiZ2V0RGlhZ25vc3RpY3MiLCJhZGRJc3N1ZSIsIklzc3VlQ2F0ZWdvcnkiLCJNYW5pZmVzdCIsIklzc3VlU2V2ZXJpdHkiLCJMb3ciLCJJc3N1ZVR5cGUiLCJGVUxMU0NSRUVOTU9ERV9OT1RfT05fTElTVFJFUE9SVCIsInNlbGVjdEFsbCIsImhlYWRlclZpc2libGUiLCJ1c2VDb25kZW5zZWRUYWJsZUxheW91dCIsInNob3dSb3dDb3VudCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUFxTUtBLFU7O2FBQUFBLFU7QUFBQUEsSUFBQUEsVTtBQUFBQSxJQUFBQSxVO0FBQUFBLElBQUFBLFU7S0FBQUEsVSxLQUFBQSxVOztBQThFTDs7Ozs7Ozs7O0FBU08sV0FBU0MsZUFBVCxDQUNOQyxrQkFETSxFQUVOQyxpQkFGTSxFQUdOQyxnQkFITSxFQUlOQyxrQkFKTSxFQUtTO0FBQ2YsUUFBTUMsYUFBYSxHQUFHQyx5QkFBeUIsQ0FBQ0wsa0JBQUQsRUFBcUJDLGlCQUFyQixFQUF3Q0MsZ0JBQXhDLENBQS9DO0FBQ0EsUUFBTUksa0JBQWtCLEdBQUdGLGFBQWEsQ0FBQ0csWUFBekM7QUFDQSxRQUFNQyxjQUFjLEdBQUdKLGFBQWEsQ0FBQ0ssa0JBQXJDO0FBQ0EsV0FBT0Msb0JBQW9CLENBQzFCSixrQkFEMEIsRUFFMUJLLHNCQUFzQixDQUNyQlQsZ0JBQWdCLENBQUNVLCtCQUFqQixDQUFpRFgsaUJBQWpELEVBQW9FWSxPQUQvQyxFQUVyQlgsZ0JBRnFCLEVBR3JCSSxrQkFIcUIsRUFJckJILGtCQUpxQixFQUtyQixJQUxxQixFQU1yQkssY0FOcUIsQ0FGSSxFQVUxQjtBQUNDTSxNQUFBQSxXQUFXLEVBQUUsV0FEZDtBQUVDQyxNQUFBQSxjQUFjLEVBQUUsV0FGakI7QUFHQ0MsTUFBQUEsZ0JBQWdCLEVBQUUsV0FIbkI7QUFJQ0MsTUFBQUEsT0FBTyxFQUFFLFdBSlY7QUFLQ0MsTUFBQUEsOEJBQThCLEVBQUU7QUFMakMsS0FWMEIsQ0FBM0I7QUFrQkE7QUFFRDs7Ozs7Ozs7Ozs7Ozs7QUFVTyxXQUFTQyxlQUFULENBQ05uQixrQkFETSxFQUVOQyxpQkFGTSxFQUdOQyxnQkFITSxFQUlOQyxrQkFKTSxFQUtV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TjdhLE1BQUFBLElBQUksRUFBRW9OLFNBRkE7QUFHTjhOLE1BQUFBLGdCQUFnQixFQUFFQSxnQkFIWjtBQUlOZSxNQUFBQSxhQUFhLEVBQUUsRUFBRXZCLHFCQUFxQixJQUFJTyxjQUEzQixDQUpUO0FBS05MLE1BQUFBLFlBQVksRUFBRUEsWUFMUjtBQU1OaFAsTUFBQUEsWUFBWSxFQUFFQSxZQU5SO0FBT05NLE1BQUFBLFdBQVcsRUFBRUEsV0FQUDtBQVFONE8sTUFBQUEsK0JBQStCLEVBQUVBLCtCQVIzQjtBQVNOQyxNQUFBQSx3QkFBd0IsRUFBRUEsd0JBVHBCO0FBVU5tQixNQUFBQSx1QkFBdUIsRUFBRWxCLG9CQUFvQixJQUFJblksK0JBVjNDO0FBV051VCxNQUFBQSxjQUFjLEVBQUVBLGNBWFY7QUFZTm1ELE1BQUFBLFdBQVcsRUFBRUEsV0FaUDtBQWFONEMsTUFBQUEsWUFBWSxFQUFFLEVBQUM1VCxhQUFELGFBQUNBLGFBQUQsaURBQUNBLGFBQWEsQ0FBRTZTLHFCQUFoQiwyREFBQyx1QkFBc0NFLFVBQXZDLENBYlI7QUFjTnBGLE1BQUFBLGNBQWMsRUFBRTNOLGFBQUYsYUFBRUEsYUFBRix1QkFBRUEsYUFBYSxDQUFFMk47QUFkekIsS0FBUDtBQWdCQSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0Q3JpdGljYWxpdHlUeXBlLFxuXHREYXRhRmllbGQsXG5cdERhdGFGaWVsZEFic3RyYWN0VHlwZXMsXG5cdERhdGFGaWVsZEZvckFjdGlvbixcblx0RGF0YUZpZWxkRm9yQW5ub3RhdGlvbixcblx0RGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uLFxuXHREYXRhUG9pbnQsXG5cdEVudW1WYWx1ZSxcblx0TGluZUl0ZW0sXG5cdFBhdGhBbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0UHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyxcblx0UHJvcGVydHlBbm5vdGF0aW9uVmFsdWUsXG5cdFByb3BlcnR5UGF0aCxcblx0U2VsZWN0aW9uVmFyaWFudFR5cGUsXG5cdFNlbGVjdE9wdGlvblR5cGUsXG5cdFVJQW5ub3RhdGlvblR5cGVzXG59IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IHtcblx0QWN0aW9uVHlwZSxcblx0QXZhaWxhYmlsaXR5VHlwZSxcblx0Q3JlYXRpb25Nb2RlLFxuXHRGb3JtYXRPcHRpb25zVHlwZSxcblx0SG9yaXpvbnRhbEFsaWduLFxuXHRNYW5pZmVzdFRhYmxlQ29sdW1uLFxuXHROYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9uLFxuXHROYXZpZ2F0aW9uVGFyZ2V0Q29uZmlndXJhdGlvbixcblx0U2VsZWN0aW9uTW9kZSxcblx0VGFibGVDb2x1bW5TZXR0aW5ncyxcblx0VGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24sXG5cdFRlbXBsYXRlVHlwZSxcblx0VmFyaWFudE1hbmFnZW1lbnRUeXBlLFxuXHRWaWV3UGF0aENvbmZpZ3VyYXRpb24sXG5cdFZpc3VhbGl6YXRpb25UeXBlXG59IGZyb20gXCIuLi8uLi9NYW5pZmVzdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBFbnRpdHlUeXBlLCBQcm9wZXJ0eSB9IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5pbXBvcnQgeyBUYWJsZUlEIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvSURcIjtcbmltcG9ydCB7XG5cdEFubm90YXRpb25BY3Rpb24sXG5cdEJhc2VBY3Rpb24sXG5cdEN1c3RvbUFjdGlvbixcblx0Z2V0QWN0aW9uc0Zyb21NYW5pZmVzdCxcblx0aXNBY3Rpb25OYXZpZ2FibGUsXG5cdHJlbW92ZUR1cGxpY2F0ZUFjdGlvbnNcbn0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29udHJvbHMvQ29tbW9uL0FjdGlvblwiO1xuaW1wb3J0IHsgQ29uZmlndXJhYmxlT2JqZWN0LCBDdXN0b21FbGVtZW50LCBpbnNlcnRDdXN0b21FbGVtZW50cywgUGxhY2VtZW50IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Db25maWd1cmFibGVPYmplY3RcIjtcbmltcG9ydCB7XG5cdGNvbGxlY3RSZWxhdGVkUHJvcGVydGllcyxcblx0Y29sbGVjdFJlbGF0ZWRQcm9wZXJ0aWVzUmVjdXJzaXZlbHksXG5cdENvbXBsZXhQcm9wZXJ0eUluZm8sXG5cdGdldFNlbWFudGljT2JqZWN0UGF0aCxcblx0aXNEYXRhRmllbGRBbHdheXNIaWRkZW4sXG5cdGlzRGF0YUZpZWxkRm9yQWN0aW9uQWJzdHJhY3QsXG5cdGlzRGF0YUZpZWxkVHlwZXNcbn0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvYW5ub3RhdGlvbnMvRGF0YUZpZWxkXCI7XG5pbXBvcnQge1xuXHRhbmQsXG5cdGFubm90YXRpb25FeHByZXNzaW9uLFxuXHRCaW5kaW5nRXhwcmVzc2lvbixcblx0YmluZGluZ0V4cHJlc3Npb24sXG5cdEJpbmRpbmdFeHByZXNzaW9uRXhwcmVzc2lvbixcblx0Y29tcGlsZUJpbmRpbmcsXG5cdGNvbnN0YW50LFxuXHRlcXVhbCxcblx0RXhwcmVzc2lvbixcblx0RXhwcmVzc2lvbk9yUHJpbWl0aXZlLFxuXHRmb3JtYXRSZXN1bHQsXG5cdGlmRWxzZSxcblx0aXNCaW5kaW5nLFxuXHRpc0NvbnN0YW50LFxuXHRub3QsXG5cdG9yLFxuXHRyZXNvbHZlQmluZGluZ1N0cmluZ1xufSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9CaW5kaW5nRXhwcmVzc2lvblwiO1xuaW1wb3J0IHsgRHJhZnQsIHNpbmdsZXRvblBhdGhWaXNpdG9yLCBVSSB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvQmluZGluZ0hlbHBlclwiO1xuaW1wb3J0IHsgS2V5SGVscGVyIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9LZXlcIjtcbmltcG9ydCB0YWJsZUZvcm1hdHRlcnMgZnJvbSBcInNhcC9mZS9jb3JlL2Zvcm1hdHRlcnMvVGFibGVGb3JtYXR0ZXJcIjtcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcInNhcC9mZS9jb3JlL2Zvcm1hdHRlcnMvVGFibGVGb3JtYXR0ZXJUeXBlc1wiO1xuaW1wb3J0IHtcblx0RGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0Z2V0VGFyZ2V0T2JqZWN0UGF0aCxcblx0aXNQYXRoRGVsZXRhYmxlLFxuXHRpc1BhdGhJbnNlcnRhYmxlLFxuXHRpc1BhdGhVcGRhdGFibGVcbn0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvRGF0YU1vZGVsUGF0aEhlbHBlclwiO1xuaW1wb3J0IHsgcmVwbGFjZVNwZWNpYWxDaGFycyB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5pbXBvcnQgeyBJc3N1ZUNhdGVnb3J5LCBJc3N1ZVNldmVyaXR5LCBJc3N1ZVR5cGUgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0lzc3VlTWFuYWdlclwiO1xuaW1wb3J0ICogYXMgRWRtIGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy9kaXN0L0VkbVwiO1xuXG5pbXBvcnQgTWFuaWZlc3RXcmFwcGVyIGZyb20gXCIuLi8uLi9NYW5pZmVzdFdyYXBwZXJcIjtcbmltcG9ydCBDb252ZXJ0ZXJDb250ZXh0IGZyb20gXCIuLi8uLi9Db252ZXJ0ZXJDb250ZXh0XCI7XG5pbXBvcnQge1xuXHRpc1Byb3BlcnR5LFxuXHRnZXRBc3NvY2lhdGVkVW5pdFByb3BlcnR5LFxuXHRnZXRBc3NvY2lhdGVkQ3VycmVuY3lQcm9wZXJ0eSxcblx0aXNQYXRoRXhwcmVzc2lvbixcblx0Z2V0VGFyZ2V0VmFsdWVPbkRhdGFQb2ludFxufSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9Qcm9wZXJ0eUhlbHBlclwiO1xuXG5pbXBvcnQgeyBBZ2dyZWdhdGlvbkhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL0FnZ3JlZ2F0aW9uXCI7XG5pbXBvcnQgeyBEaXNwbGF5TW9kZSwgZ2V0RGlzcGxheU1vZGUgfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9VSUZvcm1hdHRlcnNcIjtcbmltcG9ydCB7IGdldE1lc3NhZ2VUeXBlRnJvbUNyaXRpY2FsaXR5VHlwZSB9IGZyb20gXCIuL0NyaXRpY2FsaXR5XCI7XG5cbmV4cG9ydCB0eXBlIFRhYmxlQW5ub3RhdGlvbkNvbmZpZ3VyYXRpb24gPSB7XG5cdGF1dG9CaW5kT25Jbml0OiBib29sZWFuO1xuXHRjb2xsZWN0aW9uOiBzdHJpbmc7XG5cdHZhcmlhbnRNYW5hZ2VtZW50OiBWYXJpYW50TWFuYWdlbWVudFR5cGU7XG5cdGZpbHRlcklkPzogc3RyaW5nO1xuXHRpZDogc3RyaW5nO1xuXHRuYXZpZ2F0aW9uUGF0aDogc3RyaW5nO1xuXHRwMTNuTW9kZT86IHN0cmluZztcblx0cm93Pzoge1xuXHRcdGFjdGlvbj86IHN0cmluZztcblx0XHRwcmVzcz86IHN0cmluZztcblx0XHRyb3dIaWdobGlnaHRpbmc6IEJpbmRpbmdFeHByZXNzaW9uPE1lc3NhZ2VUeXBlPjtcblx0XHRyb3dOYXZpZ2F0ZWQ6IEJpbmRpbmdFeHByZXNzaW9uPGJvb2xlYW4+O1xuXHR9O1xuXHRzZWxlY3Rpb25Nb2RlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdHNob3c/OiB7XG5cdFx0Y3JlYXRlPzogc3RyaW5nIHwgYm9vbGVhbjtcblx0XHRkZWxldGU/OiBzdHJpbmcgfCBib29sZWFuO1xuXHRcdHBhc3RlPzogQmluZGluZ0V4cHJlc3Npb248Ym9vbGVhbj47XG5cdFx0bWFzc0VkaXQ/OiB7IHZpc2libGU6IGJvb2xlYW4gfCBzdHJpbmc7IGVuYWJsZWQ6IGJvb2xlYW4gfCBzdHJpbmcgfTtcblx0fTtcblx0ZGlzcGxheU1vZGU/OiBib29sZWFuO1xuXHR0aHJlc2hvbGQ6IG51bWJlcjtcblx0ZW50aXR5TmFtZTogc3RyaW5nO1xuXHRzb3J0Q29uZGl0aW9ucz86IHN0cmluZztcblx0Z3JvdXBDb25kaXRpb25zPzogc3RyaW5nO1xuXHRhZ2dyZWdhdGVDb25kaXRpb25zPzogc3RyaW5nO1xuXG5cdC8qKiBDcmVhdGUgbmV3IGVudHJpZXMgKi9cblx0Y3JlYXRlOiBDcmVhdGVCZWhhdmlvdXIgfCBDcmVhdGVCZWhhdmlvdXJFeHRlcm5hbDtcblx0cGFyZW50RW50aXR5RGVsZXRlRW5hYmxlZD86IEJpbmRpbmdFeHByZXNzaW9uPGJvb2xlYW4+O1xuXHR0aXRsZTogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBOZXcgZW50cmllcyBhcmUgY3JlYXRlZCB3aXRoaW4gdGhlIGFwcCAoZGVmYXVsdCBjYXNlKVxuICovXG50eXBlIENyZWF0ZUJlaGF2aW91ciA9IHtcblx0bW9kZTogQ3JlYXRpb25Nb2RlO1xuXHRhcHBlbmQ6IEJvb2xlYW47XG5cdG5ld0FjdGlvbj86IHN0cmluZztcblx0bmF2aWdhdGVUb1RhcmdldD86IHN0cmluZztcbn07XG5cbi8qKlxuICogTmV3IGVudHJpZXMgYXJlIGNyZWF0ZWQgYnkgbmF2aWdhdGluZyB0byBzb21lIHRhcmdldFxuICovXG50eXBlIENyZWF0ZUJlaGF2aW91ckV4dGVybmFsID0ge1xuXHRtb2RlOiBcIkV4dGVybmFsXCI7XG5cdG91dGJvdW5kOiBzdHJpbmc7XG5cdG91dGJvdW5kRGV0YWlsOiBOYXZpZ2F0aW9uVGFyZ2V0Q29uZmlndXJhdGlvbltcIm91dGJvdW5kRGV0YWlsXCJdO1xuXHRuYXZpZ2F0aW9uU2V0dGluZ3M6IE5hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb247XG59O1xuXG5leHBvcnQgdHlwZSBUYWJsZUNhcGFiaWxpdHlSZXN0cmljdGlvbiA9IHtcblx0aXNEZWxldGFibGU6IGJvb2xlYW47XG5cdGlzVXBkYXRhYmxlOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgVGFibGVGaWx0ZXJzQ29uZmlndXJhdGlvbiA9IHtcblx0ZW5hYmxlZD86IHN0cmluZyB8IGJvb2xlYW47XG5cdHBhdGhzOiBbXG5cdFx0e1xuXHRcdFx0YW5ub3RhdGlvblBhdGg6IHN0cmluZztcblx0XHR9XG5cdF07XG5cdHNob3dDb3VudHM/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgU2VsZWN0aW9uVmFyaWFudENvbmZpZ3VyYXRpb24gPSB7XG5cdHByb3BlcnR5TmFtZXM6IHN0cmluZ1tdO1xuXHR0ZXh0Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgVGFibGVDb250cm9sQ29uZmlndXJhdGlvbiA9IHtcblx0Y3JlYXRlQXRFbmQ6IGJvb2xlYW47XG5cdGNyZWF0aW9uTW9kZTogQ3JlYXRpb25Nb2RlO1xuXHRkaXNhYmxlQWRkUm93QnV0dG9uRm9yRW1wdHlEYXRhOiBib29sZWFuO1xuXHRjdXN0b21WYWxpZGF0aW9uRnVuY3Rpb246IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0dXNlQ29uZGVuc2VkVGFibGVMYXlvdXQ6IGJvb2xlYW47XG5cdGVuYWJsZUV4cG9ydDogYm9vbGVhbjtcblx0aGVhZGVyVmlzaWJsZTogYm9vbGVhbjtcblx0ZmlsdGVycz86IFJlY29yZDxzdHJpbmcsIFRhYmxlRmlsdGVyc0NvbmZpZ3VyYXRpb24+O1xuXHR0eXBlOiBUYWJsZVR5cGU7XG5cdHNlbGVjdEFsbD86IGJvb2xlYW47XG5cdHNlbGVjdGlvbkxpbWl0OiBudW1iZXI7XG5cdGVuYWJsZVBhc3RlOiBib29sZWFuO1xuXHRlbmFibGVGdWxsU2NyZWVuOiBib29sZWFuO1xuXHRzaG93Um93Q291bnQ6IGJvb2xlYW47XG5cdGVuYWJsZU1hc3NFZGl0OiBib29sZWFuIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IHR5cGUgVGFibGVUeXBlID0gXCJHcmlkVGFibGVcIiB8IFwiUmVzcG9uc2l2ZVRhYmxlXCIgfCBcIkFuYWx5dGljYWxUYWJsZVwiO1xuXG5lbnVtIENvbHVtblR5cGUge1xuXHREZWZhdWx0ID0gXCJEZWZhdWx0XCIsIC8vIERlZmF1bHQgVHlwZVxuXHRBbm5vdGF0aW9uID0gXCJBbm5vdGF0aW9uXCIsXG5cdFNsb3QgPSBcIlNsb3RcIlxufVxuXG5leHBvcnQgdHlwZSBCYXNlVGFibGVDb2x1bW4gPSBDb25maWd1cmFibGVPYmplY3QgJiB7XG5cdGlkOiBzdHJpbmc7XG5cdHdpZHRoPzogc3RyaW5nO1xuXHRuYW1lOiBzdHJpbmc7XG5cdGF2YWlsYWJpbGl0eT86IEF2YWlsYWJpbGl0eVR5cGU7XG5cdHR5cGU6IENvbHVtblR5cGU7IC8vT3JpZ2luIG9mIHRoZSBzb3VyY2Ugd2hlcmUgd2UgYXJlIGdldHRpbmcgdGhlIHRlbXBsYXRlZCBpbmZvcm1hdGlvbiBmcm9tLFxuXHRpc05hdmlnYWJsZT86IGJvb2xlYW47XG5cdHNldHRpbmdzPzogVGFibGVDb2x1bW5TZXR0aW5ncztcblx0c2VtYW50aWNPYmplY3RQYXRoPzogc3RyaW5nO1xuXHRwcm9wZXJ0eUluZm9zPzogc3RyaW5nW107XG5cdHNvcnRhYmxlOiBib29sZWFuO1xuXHRob3Jpem9udGFsQWxpZ24/OiBIb3Jpem9udGFsQWxpZ247XG5cdGZvcm1hdE9wdGlvbnM6IEZvcm1hdE9wdGlvbnNUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgQ3VzdG9tVGFibGVDb2x1bW4gPSBCYXNlVGFibGVDb2x1bW4gJiB7XG5cdGhlYWRlcj86IHN0cmluZztcblx0dGVtcGxhdGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEFubm90YXRpb25UYWJsZUNvbHVtbiA9IEJhc2VUYWJsZUNvbHVtbiAmIHtcblx0YW5ub3RhdGlvblBhdGg6IHN0cmluZztcblx0cmVsYXRpdmVQYXRoOiBzdHJpbmc7XG5cdGxhYmVsPzogc3RyaW5nO1xuXHRncm91cExhYmVsPzogc3RyaW5nO1xuXHRncm91cD86IHN0cmluZztcblx0aXNHcm91cGFibGU/OiBib29sZWFuO1xuXHRpc0tleT86IGJvb2xlYW47XG5cdHVuaXQ/OiBzdHJpbmc7XG5cdGV4cG9ydFNldHRpbmdzPzoge1xuXHRcdHRlbXBsYXRlPzogc3RyaW5nO1xuXHRcdGxhYmVsPzogc3RyaW5nO1xuXHRcdGZpZWxkTGFiZWw/OiBzdHJpbmc7XG5cdFx0d3JhcD86IGJvb2xlYW47XG5cdH07XG5cdGlzRGF0YVBvaW50RmFrZVRhcmdldFByb3BlcnR5PzogYm9vbGVhbjtcblx0dGV4dEFycmFuZ2VtZW50Pzoge1xuXHRcdHRleHRQcm9wZXJ0eTogc3RyaW5nO1xuXHRcdG1vZGU6IERpc3BsYXlNb2RlO1xuXHR9O1xuXHRleHBvcnRDb250YWN0UHJvcGVydHk/OiBzdHJpbmc7XG5cdGFkZGl0aW9uYWxQcm9wZXJ0eUluZm9zPzogc3RyaW5nW107XG59O1xuXG5leHBvcnQgdHlwZSBUYWJsZUNvbHVtbiA9IEN1c3RvbVRhYmxlQ29sdW1uIHwgQW5ub3RhdGlvblRhYmxlQ29sdW1uO1xuXG5leHBvcnQgdHlwZSBDdXN0b21Db2x1bW4gPSBDdXN0b21FbGVtZW50PFRhYmxlQ29sdW1uPjtcblxuZXhwb3J0IHR5cGUgQWdncmVnYXRlRGF0YSA9IHtcblx0ZGVmYXVsdEFnZ3JlZ2F0ZToge1xuXHRcdGNvbnRleHREZWZpbmluZ1Byb3BlcnRpZXM/OiBzdHJpbmdbXTtcblx0fTtcblx0cmVsYXRpdmVQYXRoOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBUYWJsZVZpc3VhbGl6YXRpb24gPSB7XG5cdHR5cGU6IFZpc3VhbGl6YXRpb25UeXBlLlRhYmxlO1xuXHRhbm5vdGF0aW9uOiBUYWJsZUFubm90YXRpb25Db25maWd1cmF0aW9uO1xuXHRjb250cm9sOiBUYWJsZUNvbnRyb2xDb25maWd1cmF0aW9uO1xuXHRjb2x1bW5zOiBUYWJsZUNvbHVtbltdO1xuXHRhY3Rpb25zOiBCYXNlQWN0aW9uW107XG5cdGFnZ3JlZ2F0ZXM/OiBSZWNvcmQ8c3RyaW5nLCBBZ2dyZWdhdGVEYXRhPjtcblx0ZW5hYmxlQW5hbHl0aWNzPzogYm9vbGVhbjtcblx0ZW5hYmxlRGF0YVN0YXRlRmlsdGVyOiBib29sZWFuO1xuXHRvcGVyYXRpb25BdmFpbGFibGVNYXA6IHN0cmluZztcbn07XG5cbnR5cGUgU29ydGVyVHlwZSA9IHtcblx0bmFtZTogc3RyaW5nO1xuXHRkZXNjZW5kaW5nOiBib29sZWFuO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIGFycmF5IG9mIGFsbCBhbm5vdGF0aW9uIGJhc2VkIGFuZCBtYW5pZmVzdCBiYXNlZCB0YWJsZSBhY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7TGluZUl0ZW19IGxpbmVJdGVtQW5ub3RhdGlvblxuICogQHBhcmFtIHtzdHJpbmd9IHZpc3VhbGl6YXRpb25QYXRoXG4gKiBAcGFyYW0ge0NvbnZlcnRlckNvbnRleHR9IGNvbnZlcnRlckNvbnRleHRcbiAqIEBwYXJhbSB7TmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvbn0gbmF2aWdhdGlvblNldHRpbmdzXG4gKiBAcmV0dXJucyB7QmFzZUFjdGlvbn0gVGhlIGNvbXBsZXRlIHRhYmxlIGFjdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFRhYmxlQWN0aW9ucyhcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSxcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0bmF2aWdhdGlvblNldHRpbmdzPzogTmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvblxuKTogQmFzZUFjdGlvbltdIHtcblx0Y29uc3QgYVRhYmxlQWN0aW9ucyA9IGdldFRhYmxlQW5ub3RhdGlvbkFjdGlvbnMobGluZUl0ZW1Bbm5vdGF0aW9uLCB2aXN1YWxpemF0aW9uUGF0aCwgY29udmVydGVyQ29udGV4dCk7XG5cdGNvbnN0IGFBbm5vdGF0aW9uQWN0aW9ucyA9IGFUYWJsZUFjdGlvbnMudGFibGVBY3Rpb25zO1xuXHRjb25zdCBhSGlkZGVuQWN0aW9ucyA9IGFUYWJsZUFjdGlvbnMuaGlkZGVuVGFibGVBY3Rpb25zO1xuXHRyZXR1cm4gaW5zZXJ0Q3VzdG9tRWxlbWVudHMoXG5cdFx0YUFubm90YXRpb25BY3Rpb25zLFxuXHRcdGdldEFjdGlvbnNGcm9tTWFuaWZlc3QoXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpLmFjdGlvbnMsXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0YUFubm90YXRpb25BY3Rpb25zLFxuXHRcdFx0bmF2aWdhdGlvblNldHRpbmdzLFxuXHRcdFx0dHJ1ZSxcblx0XHRcdGFIaWRkZW5BY3Rpb25zXG5cdFx0KSxcblx0XHR7XG5cdFx0XHRpc05hdmlnYWJsZTogXCJvdmVyd3JpdGVcIixcblx0XHRcdGVuYWJsZU9uU2VsZWN0OiBcIm92ZXJ3cml0ZVwiLFxuXHRcdFx0ZW5hYmxlQXV0b1Njcm9sbDogXCJvdmVyd3JpdGVcIixcblx0XHRcdGVuYWJsZWQ6IFwib3ZlcndyaXRlXCIsXG5cdFx0XHRkZWZhdWx0VmFsdWVzRXh0ZW5zaW9uRnVuY3Rpb246IFwib3ZlcndyaXRlXCJcblx0XHR9XG5cdCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhbiBhcnJheSBvZiBhbGwgY29sdW1ucywgYW5ub3RhdGlvbi1iYXNlZCBhcyB3ZWxsIGFzIG1hbmlmZXN0IGJhc2VkLlxuICogVGhleSBhcmUgc29ydGVkIGFuZCBzb21lIHByb3BlcnRpZXMgY2FuIGJlIG92ZXJ3cml0dGVuIHZpYSB0aGUgbWFuaWZlc3QgKGNoZWNrIG91dCB0aGUga2V5cyB0aGF0IGNhbiBiZSBvdmVyd3JpdHRlbikuXG4gKlxuICogQHBhcmFtIHtMaW5lSXRlbX0gbGluZUl0ZW1Bbm5vdGF0aW9uIENvbGxlY3Rpb24gb2YgZGF0YSBmaWVsZHMgZm9yIHJlcHJlc2VudGF0aW9uIGluIGEgdGFibGUgb3IgbGlzdFxuICogQHBhcmFtIHtzdHJpbmd9IHZpc3VhbGl6YXRpb25QYXRoXG4gKiBAcGFyYW0ge0NvbnZlcnRlckNvbnRleHR9IGNvbnZlcnRlckNvbnRleHRcbiAqIEBwYXJhbSB7TmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvbn0gbmF2aWdhdGlvblNldHRpbmdzXG4gKiBAcmV0dXJucyB7VGFibGVDb2x1bW5bXX0gUmV0dXJucyBhbGwgdGFibGUgY29sdW1ucyB0aGF0IHNob3VsZCBiZSBhdmFpbGFibGUsIHJlZ2FyZGxlc3Mgb2YgdGVtcGxhdGluZyBvciBwZXJzb25hbGl6YXRpb24gb3IgdGhlaXIgb3JpZ2luXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRUYWJsZUNvbHVtbnMoXG5cdGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0sXG5cdHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdG5hdmlnYXRpb25TZXR0aW5ncz86IE5hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb25cbik6IFRhYmxlQ29sdW1uW10ge1xuXHRjb25zdCBhbm5vdGF0aW9uQ29sdW1ucyA9IGdldENvbHVtbnNGcm9tQW5ub3RhdGlvbnMobGluZUl0ZW1Bbm5vdGF0aW9uLCB2aXN1YWxpemF0aW9uUGF0aCwgY29udmVydGVyQ29udGV4dCk7XG5cdGNvbnN0IG1hbmlmZXN0Q29sdW1ucyA9IGdldENvbHVtbnNGcm9tTWFuaWZlc3QoXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdENvbnRyb2xDb25maWd1cmF0aW9uKHZpc3VhbGl6YXRpb25QYXRoKS5jb2x1bW5zLFxuXHRcdGFubm90YXRpb25Db2x1bW5zIGFzIEFubm90YXRpb25UYWJsZUNvbHVtbltdLFxuXHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRBbm5vdGF0aW9uRW50aXR5VHlwZShsaW5lSXRlbUFubm90YXRpb24pLFxuXHRcdG5hdmlnYXRpb25TZXR0aW5nc1xuXHQpO1xuXG5cdHJldHVybiBpbnNlcnRDdXN0b21FbGVtZW50cyhhbm5vdGF0aW9uQ29sdW1ucywgbWFuaWZlc3RDb2x1bW5zLCB7XG5cdFx0d2lkdGg6IFwib3ZlcndyaXRlXCIsXG5cdFx0aXNOYXZpZ2FibGU6IFwib3ZlcndyaXRlXCIsXG5cdFx0YXZhaWxhYmlsaXR5OiBcIm92ZXJ3cml0ZVwiLFxuXHRcdHNldHRpbmdzOiBcIm92ZXJ3cml0ZVwiLFxuXHRcdGhvcml6b250YWxBbGlnbjogXCJvdmVyd3JpdGVcIixcblx0XHRmb3JtYXRPcHRpb25zOiBcIm92ZXJ3cml0ZVwiXG5cdH0pO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIHRoZSBjdXN0b20gYWdncmVnYXRpb24gZGVmaW5pdGlvbnMgZnJvbSB0aGUgZW50aXR5VHlwZS5cbiAqXG4gKiBAcGFyYW0gZW50aXR5VHlwZSBUaGUgdGFyZ2V0IGVudGl0eSB0eXBlLlxuICogQHBhcmFtIHRhYmxlQ29sdW1ucyBUaGUgYXJyYXkgb2YgY29sdW1ucyBmb3IgdGhlIGVudGl0eSB0eXBlLlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlciBjb250ZXh0LlxuICogQHJldHVybnMgVGhlIGFnZ3JlZ2F0ZSBkZWZpbml0aW9ucyBmcm9tIHRoZSBlbnRpdHlUeXBlLCBvciB1bmRlZmluZWQgaWYgdGhlIGVudGl0eSBkb2Vzbid0IHN1cHBvcnQgYW5hbHl0aWNhbCBxdWVyaWVzLlxuICovXG5leHBvcnQgY29uc3QgZ2V0QWdncmVnYXRlRGVmaW5pdGlvbnNGcm9tRW50aXR5VHlwZSA9IGZ1bmN0aW9uKFxuXHRlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLFxuXHR0YWJsZUNvbHVtbnM6IFRhYmxlQ29sdW1uW10sXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IFJlY29yZDxzdHJpbmcsIEFnZ3JlZ2F0ZURhdGE+IHwgdW5kZWZpbmVkIHtcblx0Y29uc3QgYWdncmVnYXRpb25IZWxwZXIgPSBuZXcgQWdncmVnYXRpb25IZWxwZXIoZW50aXR5VHlwZSwgY29udmVydGVyQ29udGV4dCk7XG5cblx0ZnVuY3Rpb24gZmluZENvbHVtbkZyb21QYXRoKHBhdGg6IHN0cmluZyk6IFRhYmxlQ29sdW1uIHwgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gdGFibGVDb2x1bW5zLmZpbmQoY29sdW1uID0+IHtcblx0XHRcdGNvbnN0IGFubm90YXRpb25Db2x1bW4gPSBjb2x1bW4gYXMgQW5ub3RhdGlvblRhYmxlQ29sdW1uO1xuXHRcdFx0cmV0dXJuIGFubm90YXRpb25Db2x1bW4ucHJvcGVydHlJbmZvcyA9PT0gdW5kZWZpbmVkICYmIGFubm90YXRpb25Db2x1bW4ucmVsYXRpdmVQYXRoID09PSBwYXRoO1xuXHRcdH0pO1xuXHR9XG5cblx0aWYgKCFhZ2dyZWdhdGlvbkhlbHBlci5pc0FuYWx5dGljc1N1cHBvcnRlZCgpKSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXG5cdC8vIEtlZXAgYSBzZXQgb2YgYWxsIGN1cnJlbmN5L3VuaXQgcHJvcGVydGllcywgYXMgd2UgZG9uJ3Qgd2FudCB0byBjb25zaWRlciB0aGVtIGFzIGFnZ3JlZ2F0ZXNcblx0Ly8gVGhleSBhcmUgYWdncmVnYXRlcyBmb3IgdGVjaG5pY2FsIHJlYXNvbnMgKHRvIG1hbmFnZSBtdWx0aS11bml0cyBzaXR1YXRpb25zKSBidXQgaXQgZG9lc24ndCBtYWtlIHNlbnNlIGZyb20gYSB1c2VyIHN0YW5kcG9pbnRcblx0Y29uc3QgbUN1cnJlbmN5T3JVbml0UHJvcGVydGllcyA9IG5ldyBTZXQoKTtcblx0dGFibGVDb2x1bW5zLmZvckVhY2gob0NvbHVtbiA9PiB7XG5cdFx0Y29uc3Qgb1RhYmxlQ29sdW1uID0gb0NvbHVtbiBhcyBBbm5vdGF0aW9uVGFibGVDb2x1bW47XG5cdFx0aWYgKG9UYWJsZUNvbHVtbi51bml0KSB7XG5cdFx0XHRtQ3VycmVuY3lPclVuaXRQcm9wZXJ0aWVzLmFkZChvVGFibGVDb2x1bW4udW5pdCk7XG5cdFx0fVxuXHR9KTtcblxuXHRjb25zdCBtUmF3RGVmaW5pdGlvbnMgPSBhZ2dyZWdhdGlvbkhlbHBlci5nZXRDdXN0b21BZ2dyZWdhdGVEZWZpbml0aW9ucygpO1xuXHRjb25zdCBtUmVzdWx0OiBSZWNvcmQ8c3RyaW5nLCBBZ2dyZWdhdGVEYXRhPiA9IHt9O1xuXG5cdHRhYmxlQ29sdW1ucy5mb3JFYWNoKG9Db2x1bW4gPT4ge1xuXHRcdGNvbnN0IG9UYWJsZUNvbHVtbiA9IG9Db2x1bW4gYXMgQW5ub3RhdGlvblRhYmxlQ29sdW1uO1xuXHRcdGlmIChvVGFibGVDb2x1bW4ucHJvcGVydHlJbmZvcyA9PT0gdW5kZWZpbmVkICYmIG9UYWJsZUNvbHVtbi5yZWxhdGl2ZVBhdGgpIHtcblx0XHRcdGNvbnN0IGFSYXdDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzID0gbVJhd0RlZmluaXRpb25zW29UYWJsZUNvbHVtbi5yZWxhdGl2ZVBhdGhdO1xuXG5cdFx0XHQvLyBJZ25vcmUgYWdncmVnYXRlcyBjb3JyZXNwb25kaW5nIHRvIGN1cnJlbmNpZXMgb3IgdW5pdHMgb2YgbWVhc3VyZSBhbmQgZHVtbXkgY3JlYXRlZCBwcm9wZXJ0eSBmb3IgZGF0YXBvaW50IHRhcmdldCBWYWx1ZVxuXHRcdFx0aWYgKFxuXHRcdFx0XHRhUmF3Q29udGV4dERlZmluaW5nUHJvcGVydGllcyAmJlxuXHRcdFx0XHQhbUN1cnJlbmN5T3JVbml0UHJvcGVydGllcy5oYXMob1RhYmxlQ29sdW1uLm5hbWUpICYmXG5cdFx0XHRcdCFvVGFibGVDb2x1bW4uaXNEYXRhUG9pbnRGYWtlVGFyZ2V0UHJvcGVydHlcblx0XHRcdCkge1xuXHRcdFx0XHRtUmVzdWx0W29UYWJsZUNvbHVtbi5uYW1lXSA9IHtcblx0XHRcdFx0XHRkZWZhdWx0QWdncmVnYXRlOiB7fSxcblx0XHRcdFx0XHRyZWxhdGl2ZVBhdGg6IG9UYWJsZUNvbHVtbi5yZWxhdGl2ZVBhdGhcblx0XHRcdFx0fTtcblx0XHRcdFx0Y29uc3QgYUNvbnRleHREZWZpbmluZ1Byb3BlcnRpZXM6IHN0cmluZ1tdID0gW107XG5cdFx0XHRcdGFSYXdDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzLmZvckVhY2goY29udGV4dERlZmluaW5nUHJvcGVydHlOYW1lID0+IHtcblx0XHRcdFx0XHRjb25zdCBvQ29sdW1uID0gZmluZENvbHVtbkZyb21QYXRoKGNvbnRleHREZWZpbmluZ1Byb3BlcnR5TmFtZSk7XG5cdFx0XHRcdFx0aWYgKG9Db2x1bW4pIHtcblx0XHRcdFx0XHRcdGFDb250ZXh0RGVmaW5pbmdQcm9wZXJ0aWVzLnB1c2gob0NvbHVtbi5uYW1lKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdGlmIChhQ29udGV4dERlZmluaW5nUHJvcGVydGllcy5sZW5ndGgpIHtcblx0XHRcdFx0XHRtUmVzdWx0W29UYWJsZUNvbHVtbi5uYW1lXS5kZWZhdWx0QWdncmVnYXRlLmNvbnRleHREZWZpbmluZ1Byb3BlcnRpZXMgPSBhQ29udGV4dERlZmluaW5nUHJvcGVydGllcztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0cmV0dXJuIG1SZXN1bHQ7XG59O1xuXG4vKipcbiAqIFVwZGF0ZXMgYSB0YWJsZSB2aXN1YWxpemF0aW9uIGZvciBhbmFseXRpY2FsIHVzZSBjYXNlcy5cbiAqXG4gKiBAcGFyYW0gdGFibGVWaXN1YWxpemF0aW9uIFRoZSB2aXN1YWxpemF0aW9uIHRvIGJlIHVwZGF0ZWRcbiAqIEBwYXJhbSBlbnRpdHlUeXBlIFRoZSBlbnRpdHkgdHlwZSBkaXNwbGF5ZWQgaW4gdGhlIHRhYmxlXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHRcbiAqIEBwYXJhbSBwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbiBUaGUgcHJlc2VudGF0aW9uVmFyaWFudCBhbm5vdGF0aW9uIChpZiBhbnkpXG4gKi9cbmZ1bmN0aW9uIHVwZGF0ZVRhYmxlVmlzdWFsaXphdGlvbkZvckFuYWx5dGljcyhcblx0dGFibGVWaXN1YWxpemF0aW9uOiBUYWJsZVZpc3VhbGl6YXRpb24sXG5cdGVudGl0eVR5cGU6IEVudGl0eVR5cGUsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uPzogUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlc1xuKSB7XG5cdGlmICh0YWJsZVZpc3VhbGl6YXRpb24uY29udHJvbC50eXBlID09PSBcIkFuYWx5dGljYWxUYWJsZVwiKSB7XG5cdFx0Y29uc3QgYWdncmVnYXRlc0RlZmluaXRpb25zID0gZ2V0QWdncmVnYXRlRGVmaW5pdGlvbnNGcm9tRW50aXR5VHlwZShlbnRpdHlUeXBlLCB0YWJsZVZpc3VhbGl6YXRpb24uY29sdW1ucywgY29udmVydGVyQ29udGV4dCk7XG5cblx0XHRpZiAoYWdncmVnYXRlc0RlZmluaXRpb25zKSB7XG5cdFx0XHR0YWJsZVZpc3VhbGl6YXRpb24uZW5hYmxlQW5hbHl0aWNzID0gdHJ1ZTtcblx0XHRcdHRhYmxlVmlzdWFsaXphdGlvbi5hZ2dyZWdhdGVzID0gYWdncmVnYXRlc0RlZmluaXRpb25zO1xuXG5cdFx0XHQvLyBBZGQgZ3JvdXAgYW5kIHNvcnQgY29uZGl0aW9ucyBmcm9tIHRoZSBwcmVzZW50YXRpb24gdmFyaWFudFxuXHRcdFx0dGFibGVWaXN1YWxpemF0aW9uLmFubm90YXRpb24uZ3JvdXBDb25kaXRpb25zID0gZ2V0R3JvdXBDb25kaXRpb25zKHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uLCB0YWJsZVZpc3VhbGl6YXRpb24uY29sdW1ucyk7XG5cdFx0XHR0YWJsZVZpc3VhbGl6YXRpb24uYW5ub3RhdGlvbi5hZ2dyZWdhdGVDb25kaXRpb25zID0gZ2V0QWdncmVnYXRlQ29uZGl0aW9ucyhcblx0XHRcdFx0cHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24sXG5cdFx0XHRcdHRhYmxlVmlzdWFsaXphdGlvbi5jb2x1bW5zXG5cdFx0XHQpO1xuXHRcdH1cblxuXHRcdHRhYmxlVmlzdWFsaXphdGlvbi5jb250cm9sLnR5cGUgPSBcIkdyaWRUYWJsZVwiOyAvLyBBbmFseXRpY2FsVGFibGUgaXNuJ3QgYSByZWFsIHR5cGUgZm9yIHRoZSBNREM6VGFibGUsIHNvIHdlIGFsd2F5cyBzd2l0Y2ggYmFjayB0byBHcmlkXG5cdH1cbn1cblxuLyoqXG4gKiBHZXQgdGhlIG5hdmlnYXRpb24gdGFyZ2V0IHBhdGggZnJvbSBtYW5pZmVzdCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHRcbiAqIEBwYXJhbSBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoIFRoZSBuYXZpZ2F0aW9uIHBhdGggdG8gY2hlY2sgaW4gdGhlIG1hbmlmZXN0IHNldHRpbmdzXG4gKiBAcmV0dXJucyBOYXZpZ2F0aW9uIHBhdGggZnJvbSBtYW5pZmVzdCBzZXR0aW5nc1xuICovXG5mdW5jdGlvbiBnZXROYXZpZ2F0aW9uVGFyZ2V0UGF0aChjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LCBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoOiBzdHJpbmcpIHtcblx0Y29uc3QgbWFuaWZlc3RXcmFwcGVyID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKTtcblx0aWYgKG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggJiYgbWFuaWZlc3RXcmFwcGVyLmdldE5hdmlnYXRpb25Db25maWd1cmF0aW9uKG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgpKSB7XG5cdFx0Y29uc3QgbmF2Q29uZmlnID0gbWFuaWZlc3RXcmFwcGVyLmdldE5hdmlnYXRpb25Db25maWd1cmF0aW9uKG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgpO1xuXHRcdGlmIChPYmplY3Qua2V5cyhuYXZDb25maWcpLmxlbmd0aCA+IDApIHtcblx0XHRcdHJldHVybiBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoO1xuXHRcdH1cblx0fVxuXG5cdGNvbnN0IGRhdGFNb2RlbFBhdGggPSBjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKTtcblx0Y29uc3QgY29udGV4dFBhdGggPSBjb252ZXJ0ZXJDb250ZXh0LmdldENvbnRleHRQYXRoKCk7XG5cdGNvbnN0IG5hdkNvbmZpZ0ZvckNvbnRleHRQYXRoID0gbWFuaWZlc3RXcmFwcGVyLmdldE5hdmlnYXRpb25Db25maWd1cmF0aW9uKGNvbnRleHRQYXRoKTtcblx0aWYgKG5hdkNvbmZpZ0ZvckNvbnRleHRQYXRoICYmIE9iamVjdC5rZXlzKG5hdkNvbmZpZ0ZvckNvbnRleHRQYXRoKS5sZW5ndGggPiAwKSB7XG5cdFx0cmV0dXJuIGNvbnRleHRQYXRoO1xuXHR9XG5cblx0cmV0dXJuIGRhdGFNb2RlbFBhdGgudGFyZ2V0RW50aXR5U2V0ID8gZGF0YU1vZGVsUGF0aC50YXJnZXRFbnRpdHlTZXQubmFtZSA6IGRhdGFNb2RlbFBhdGguc3RhcnRpbmdFbnRpdHlTZXQubmFtZTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSAndW5pdCcgYW5kICd0ZXh0QXJyYW5nZW1lbnQnIHByb3BlcnRpZXMgaW4gY29sdW1ucyB3aGVuIG5lY2Vzc2FyeS5cbiAqXG4gKiBAcGFyYW0gZW50aXR5VHlwZSBUaGUgZW50aXR5IHR5cGUgZGlzcGxheWVkIGluIHRoZSB0YWJsZVxuICogQHBhcmFtIHRhYmxlQ29sdW1ucyBUaGUgY29sdW1ucyB0byBiZSB1cGRhdGVkXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVMaW5rZWRQcm9wZXJ0aWVzKGVudGl0eVR5cGU6IEVudGl0eVR5cGUsIHRhYmxlQ29sdW1uczogVGFibGVDb2x1bW5bXSkge1xuXHRmdW5jdGlvbiBmaW5kQ29sdW1uQnlQYXRoKHBhdGg6IHN0cmluZyk6IFRhYmxlQ29sdW1uIHwgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gdGFibGVDb2x1bW5zLmZpbmQoY29sdW1uID0+IHtcblx0XHRcdGNvbnN0IGFubm90YXRpb25Db2x1bW4gPSBjb2x1bW4gYXMgQW5ub3RhdGlvblRhYmxlQ29sdW1uO1xuXHRcdFx0cmV0dXJuIGFubm90YXRpb25Db2x1bW4ucHJvcGVydHlJbmZvcyA9PT0gdW5kZWZpbmVkICYmIGFubm90YXRpb25Db2x1bW4ucmVsYXRpdmVQYXRoID09PSBwYXRoO1xuXHRcdH0pO1xuXHR9XG5cblx0dGFibGVDb2x1bW5zLmZvckVhY2gob0NvbHVtbiA9PiB7XG5cdFx0Y29uc3Qgb1RhYmxlQ29sdW1uID0gb0NvbHVtbiBhcyBBbm5vdGF0aW9uVGFibGVDb2x1bW47XG5cdFx0aWYgKG9UYWJsZUNvbHVtbi5wcm9wZXJ0eUluZm9zID09PSB1bmRlZmluZWQgJiYgb1RhYmxlQ29sdW1uLnJlbGF0aXZlUGF0aCkge1xuXHRcdFx0Y29uc3Qgb1Byb3BlcnR5ID0gZW50aXR5VHlwZS5lbnRpdHlQcm9wZXJ0aWVzLmZpbmQob1Byb3AgPT4gb1Byb3AubmFtZSA9PT0gb1RhYmxlQ29sdW1uLnJlbGF0aXZlUGF0aCk7XG5cdFx0XHRpZiAob1Byb3BlcnR5KSB7XG5cdFx0XHRcdGNvbnN0IHNVbml0ID0gZ2V0QXNzb2NpYXRlZEN1cnJlbmN5UHJvcGVydHkob1Byb3BlcnR5KT8ubmFtZSB8fCBnZXRBc3NvY2lhdGVkVW5pdFByb3BlcnR5KG9Qcm9wZXJ0eSk/Lm5hbWU7XG5cdFx0XHRcdGlmIChzVW5pdCkge1xuXHRcdFx0XHRcdGNvbnN0IG9Vbml0Q29sdW1uID0gZmluZENvbHVtbkJ5UGF0aChzVW5pdCk7XG5cblx0XHRcdFx0XHRvVGFibGVDb2x1bW4udW5pdCA9IG9Vbml0Q29sdW1uPy5uYW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Y29uc3QgZGlzcGxheU1vZGUgPSBnZXREaXNwbGF5TW9kZShvUHJvcGVydHkpLFxuXHRcdFx0XHRcdHRleHRBbm5vdGF0aW9uID0gb1Byb3BlcnR5LmFubm90YXRpb25zLkNvbW1vbj8uVGV4dDtcblx0XHRcdFx0aWYgKGlzUGF0aEV4cHJlc3Npb24odGV4dEFubm90YXRpb24pICYmIGRpc3BsYXlNb2RlICE9PSBcIlZhbHVlXCIpIHtcblx0XHRcdFx0XHRjb25zdCBvVGV4dENvbHVtbiA9IGZpbmRDb2x1bW5CeVBhdGgodGV4dEFubm90YXRpb24ucGF0aCk7XG5cdFx0XHRcdFx0aWYgKG9UZXh0Q29sdW1uICYmIG9UZXh0Q29sdW1uLm5hbWUgIT09IG9UYWJsZUNvbHVtbi5uYW1lKSB7XG5cdFx0XHRcdFx0XHRvVGFibGVDb2x1bW4udGV4dEFycmFuZ2VtZW50ID0ge1xuXHRcdFx0XHRcdFx0XHR0ZXh0UHJvcGVydHk6IG9UZXh0Q29sdW1uLm5hbWUsXG5cdFx0XHRcdFx0XHRcdG1vZGU6IGRpc3BsYXlNb2RlXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVUYWJsZVZpc3VhbGl6YXRpb24oXG5cdGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0sXG5cdHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uPzogUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyxcblx0aXNDb25kZW5zZWRUYWJsZUxheW91dENvbXBsaWFudD86IGJvb2xlYW4sXG5cdHZpZXdDb25maWd1cmF0aW9uPzogVmlld1BhdGhDb25maWd1cmF0aW9uXG4pOiBUYWJsZVZpc3VhbGl6YXRpb24ge1xuXHRjb25zdCB0YWJsZU1hbmlmZXN0Q29uZmlnID0gZ2V0VGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24oXG5cdFx0bGluZUl0ZW1Bbm5vdGF0aW9uLFxuXHRcdHZpc3VhbGl6YXRpb25QYXRoLFxuXHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0aXNDb25kZW5zZWRUYWJsZUxheW91dENvbXBsaWFudFxuXHQpO1xuXHRjb25zdCB7IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggfSA9IHNwbGl0UGF0aCh2aXN1YWxpemF0aW9uUGF0aCk7XG5cdGNvbnN0IG5hdmlnYXRpb25UYXJnZXRQYXRoID0gZ2V0TmF2aWdhdGlvblRhcmdldFBhdGgoY29udmVydGVyQ29udGV4dCwgbmF2aWdhdGlvblByb3BlcnR5UGF0aCk7XG5cdGNvbnN0IG5hdmlnYXRpb25TZXR0aW5ncyA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkuZ2V0TmF2aWdhdGlvbkNvbmZpZ3VyYXRpb24obmF2aWdhdGlvblRhcmdldFBhdGgpO1xuXHRjb25zdCBjb2x1bW5zID0gZ2V0VGFibGVDb2x1bW5zKGxpbmVJdGVtQW5ub3RhdGlvbiwgdmlzdWFsaXphdGlvblBhdGgsIGNvbnZlcnRlckNvbnRleHQsIG5hdmlnYXRpb25TZXR0aW5ncyk7XG5cblx0Y29uc3Qgb1Zpc3VhbGl6YXRpb246IFRhYmxlVmlzdWFsaXphdGlvbiA9IHtcblx0XHR0eXBlOiBWaXN1YWxpemF0aW9uVHlwZS5UYWJsZSxcblx0XHRhbm5vdGF0aW9uOiBnZXRUYWJsZUFubm90YXRpb25Db25maWd1cmF0aW9uKFxuXHRcdFx0bGluZUl0ZW1Bbm5vdGF0aW9uLFxuXHRcdFx0dmlzdWFsaXphdGlvblBhdGgsXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0dGFibGVNYW5pZmVzdENvbmZpZyxcblx0XHRcdGNvbHVtbnMsXG5cdFx0XHRwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbixcblx0XHRcdHZpZXdDb25maWd1cmF0aW9uXG5cdFx0KSxcblx0XHRjb250cm9sOiB0YWJsZU1hbmlmZXN0Q29uZmlnLFxuXHRcdGFjdGlvbnM6IHJlbW92ZUR1cGxpY2F0ZUFjdGlvbnMoZ2V0VGFibGVBY3Rpb25zKGxpbmVJdGVtQW5ub3RhdGlvbiwgdmlzdWFsaXphdGlvblBhdGgsIGNvbnZlcnRlckNvbnRleHQsIG5hdmlnYXRpb25TZXR0aW5ncykpLFxuXHRcdGNvbHVtbnM6IGNvbHVtbnMsXG5cdFx0ZW5hYmxlRGF0YVN0YXRlRmlsdGVyOiBjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBcIk9iamVjdFBhZ2VcIixcblx0XHRvcGVyYXRpb25BdmFpbGFibGVNYXA6IGdldE9wZXJhdGlvbkF2YWlsYWJsZU1hcChsaW5lSXRlbUFubm90YXRpb24pXG5cdH07XG5cblx0dXBkYXRlTGlua2VkUHJvcGVydGllcyhjb252ZXJ0ZXJDb250ZXh0LmdldEFubm90YXRpb25FbnRpdHlUeXBlKGxpbmVJdGVtQW5ub3RhdGlvbiksIGNvbHVtbnMpO1xuXHR1cGRhdGVUYWJsZVZpc3VhbGl6YXRpb25Gb3JBbmFseXRpY3MoXG5cdFx0b1Zpc3VhbGl6YXRpb24sXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRBbm5vdGF0aW9uRW50aXR5VHlwZShsaW5lSXRlbUFubm90YXRpb24pLFxuXHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0cHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb25cblx0KTtcblxuXHRyZXR1cm4gb1Zpc3VhbGl6YXRpb247XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVEZWZhdWx0VGFibGVWaXN1YWxpemF0aW9uKGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBUYWJsZVZpc3VhbGl6YXRpb24ge1xuXHRjb25zdCB0YWJsZU1hbmlmZXN0Q29uZmlnID0gZ2V0VGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24odW5kZWZpbmVkLCBcIlwiLCBjb252ZXJ0ZXJDb250ZXh0LCBmYWxzZSk7XG5cdGNvbnN0IGNvbHVtbnMgPSBnZXRDb2x1bW5zRnJvbUVudGl0eVR5cGUoe30sIGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpLCBbXSwgW10sIGNvbnZlcnRlckNvbnRleHQsIHRhYmxlTWFuaWZlc3RDb25maWcudHlwZSk7XG5cdGNvbnN0IG9WaXN1YWxpemF0aW9uOiBUYWJsZVZpc3VhbGl6YXRpb24gPSB7XG5cdFx0dHlwZTogVmlzdWFsaXphdGlvblR5cGUuVGFibGUsXG5cdFx0YW5ub3RhdGlvbjogZ2V0VGFibGVBbm5vdGF0aW9uQ29uZmlndXJhdGlvbih1bmRlZmluZWQsIFwiXCIsIGNvbnZlcnRlckNvbnRleHQsIHRhYmxlTWFuaWZlc3RDb25maWcsIGNvbHVtbnMpLFxuXHRcdGNvbnRyb2w6IHRhYmxlTWFuaWZlc3RDb25maWcsXG5cdFx0YWN0aW9uczogW10sXG5cdFx0Y29sdW1uczogY29sdW1ucyxcblx0XHRlbmFibGVEYXRhU3RhdGVGaWx0ZXI6IGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFwiT2JqZWN0UGFnZVwiLFxuXHRcdG9wZXJhdGlvbkF2YWlsYWJsZU1hcDogZ2V0T3BlcmF0aW9uQXZhaWxhYmxlTWFwKHVuZGVmaW5lZClcblx0fTtcblxuXHR1cGRhdGVMaW5rZWRQcm9wZXJ0aWVzKGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpLCBjb2x1bW5zKTtcblx0dXBkYXRlVGFibGVWaXN1YWxpemF0aW9uRm9yQW5hbHl0aWNzKG9WaXN1YWxpemF0aW9uLCBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKSwgY29udmVydGVyQ29udGV4dCk7XG5cblx0cmV0dXJuIG9WaXN1YWxpemF0aW9uO1xufVxuXG5mdW5jdGlvbiBnZXRPcGVyYXRpb25BdmFpbGFibGVNYXAobGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSB8IHVuZGVmaW5lZCk6IHN0cmluZyB7XG5cdGNvbnN0IG9wZXJhdGlvbkF2YWlsYWJsZU1hcDogUmVjb3JkPHN0cmluZywgYW55PiA9IHt9O1xuXHRpZiAobGluZUl0ZW1Bbm5vdGF0aW9uKSB7XG5cdFx0bGluZUl0ZW1Bbm5vdGF0aW9uLmZvckVhY2goZGF0YUZpZWxkID0+IHtcblx0XHRcdGlmIChkYXRhRmllbGQuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbikge1xuXHRcdFx0XHRjb25zdCBhY3Rpb25OYW1lID0gZGF0YUZpZWxkLkFjdGlvbiBhcyBzdHJpbmc7XG5cdFx0XHRcdGlmIChhY3Rpb25OYW1lPy5pbmRleE9mKFwiL1wiKSA8IDAgJiYgIWRhdGFGaWVsZC5EZXRlcm1pbmluZykge1xuXHRcdFx0XHRcdGNvbnN0IGFjdGlvblRhcmdldCA9IGRhdGFGaWVsZC5BY3Rpb25UYXJnZXQ7XG5cblx0XHRcdFx0XHRpZiAoYWN0aW9uVGFyZ2V0Py5wYXJhbWV0ZXJzPy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGNvbnN0IGJpbmRpbmdQYXJhbWV0ZXJGdWxsTmFtZSA9IGFjdGlvblRhcmdldC5wYXJhbWV0ZXJzWzBdLmZ1bGx5UXVhbGlmaWVkTmFtZSxcblx0XHRcdFx0XHRcdFx0YmluZGluZ1BhcmFtZXRlciA9IGJpbmRpbmdQYXJhbWV0ZXJGdWxsTmFtZS5zdWJzdHJpbmcoYmluZGluZ1BhcmFtZXRlckZ1bGxOYW1lLmxhc3RJbmRleE9mKFwiL1wiKSArIDEpLFxuXHRcdFx0XHRcdFx0XHQvLyBTdHJpcCB0aGUgYmluZGluZyBwYXJhbWV0ZXIgbmFtZSBmcm9tIE9wZXJhdGlvbkF2YWlsYWJsZSBwYXRoXG5cdFx0XHRcdFx0XHRcdC8vIEZvciBlLmcuIF9pdC9wcm9wZXJ0eTEgLS0+IHByb3BlcnR5MVxuXHRcdFx0XHRcdFx0XHR0YXJnZXRFeHByZXNzaW9uID0gYW5ub3RhdGlvbkV4cHJlc3Npb24oXG5cdFx0XHRcdFx0XHRcdFx0YWN0aW9uVGFyZ2V0Py5hbm5vdGF0aW9ucz8uQ29yZT8uT3BlcmF0aW9uQXZhaWxhYmxlLFxuXHRcdFx0XHRcdFx0XHRcdFtdLFxuXHRcdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdFx0XHQocGF0aDogc3RyaW5nKSA9PiAocGF0aCA/IHBhdGguc3Vic3RyaW5nKGJpbmRpbmdQYXJhbWV0ZXIubGVuZ3RoICsgMSkgOiBcIlwiKVxuXHRcdFx0XHRcdFx0XHQpIGFzIEJpbmRpbmdFeHByZXNzaW9uRXhwcmVzc2lvbjxzdHJpbmc+O1xuXG5cdFx0XHRcdFx0XHRpZiAodGFyZ2V0RXhwcmVzc2lvbj8ucGF0aCkge1xuXHRcdFx0XHRcdFx0XHRvcGVyYXRpb25BdmFpbGFibGVNYXBbYWN0aW9uTmFtZV0gPSB0YXJnZXRFeHByZXNzaW9uLnBhdGg7XG5cdFx0XHRcdFx0XHR9IGVsc2UgaWYgKGFjdGlvblRhcmdldD8uYW5ub3RhdGlvbnM/LkNvcmU/Lk9wZXJhdGlvbkF2YWlsYWJsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRcdG9wZXJhdGlvbkF2YWlsYWJsZU1hcFthY3Rpb25OYW1lXSA9IHRhcmdldEV4cHJlc3Npb247XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gSlNPTi5zdHJpbmdpZnkob3BlcmF0aW9uQXZhaWxhYmxlTWFwKTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIHRoZSBEYXRhRmllbGRGb3JBY3Rpb24gYW5kIERhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiBvZiBhIGxpbmUgaXRlbSBhbmRcbiAqIHJldHVybnMgYWxsIHRoZSBVSS5IaWRkZW4gYW5ub3RhdGlvbiBleHByZXNzaW9ucy5cbiAqXG4gKiBAcGFyYW0gbGluZUl0ZW1Bbm5vdGF0aW9uIENvbGxlY3Rpb24gb2YgZGF0YSBmaWVsZHMgdXNlZCBmb3IgcmVwcmVzZW50YXRpb24gaW4gYSB0YWJsZSBvciBsaXN0XG4gKiBAcGFyYW0gY3VycmVudEVudGl0eVR5cGUgQ3VycmVudCBFbnRpdHkgVHlwZVxuICogQHBhcmFtIGNvbnRleHREYXRhTW9kZWxPYmplY3RQYXRoIERhdGFNb2RlbE9iamVjdFBhdGhcbiAqIEBwYXJhbSBpc0VudGl0eVNldFxuICogQHJldHVybnMgQWxsIHRoZSBgVUkuSGlkZGVuYCBwYXRoIGV4cHJlc3Npb25zIGZvdW5kIGluIHRoZSByZWxldmFudCBhY3Rpb25zXG4gKi9cbmZ1bmN0aW9uIGdldFVJSGlkZGVuRXhwRm9yQWN0aW9uc1JlcXVpcmluZ0NvbnRleHQoXG5cdGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0sXG5cdGN1cnJlbnRFbnRpdHlUeXBlOiBFbnRpdHlUeXBlLFxuXHRjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0aXNFbnRpdHlTZXQ6IGJvb2xlYW5cbik6IEV4cHJlc3Npb248Ym9vbGVhbj5bXSB7XG5cdGNvbnN0IGFVaUhpZGRlblBhdGhFeHByZXNzaW9uczogRXhwcmVzc2lvbjxib29sZWFuPltdID0gW107XG5cdGxpbmVJdGVtQW5ub3RhdGlvbi5mb3JFYWNoKGRhdGFGaWVsZCA9PiB7XG5cdFx0Ly8gQ2hlY2sgaWYgdGhlIGxpbmVJdGVtIGNvbnRleHQgaXMgdGhlIHNhbWUgYXMgdGhhdCBvZiB0aGUgYWN0aW9uOlxuXHRcdGlmIChcblx0XHRcdChkYXRhRmllbGQuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbiAmJlxuXHRcdFx0XHRkYXRhRmllbGQ/LkFjdGlvblRhcmdldD8uaXNCb3VuZCAmJlxuXHRcdFx0XHRjdXJyZW50RW50aXR5VHlwZSA9PT0gZGF0YUZpZWxkPy5BY3Rpb25UYXJnZXQuc291cmNlRW50aXR5VHlwZSkgfHxcblx0XHRcdChkYXRhRmllbGQuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiAmJlxuXHRcdFx0XHRkYXRhRmllbGQuUmVxdWlyZXNDb250ZXh0ICYmXG5cdFx0XHRcdGRhdGFGaWVsZD8uSW5saW5lPy52YWx1ZU9mKCkgIT09IHRydWUpXG5cdFx0KSB7XG5cdFx0XHRpZiAodHlwZW9mIGRhdGFGaWVsZC5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdGFVaUhpZGRlblBhdGhFeHByZXNzaW9ucy5wdXNoKFxuXHRcdFx0XHRcdGVxdWFsKFxuXHRcdFx0XHRcdFx0Z2V0QmluZGluZ0V4cEZyb21Db250ZXh0KFxuXHRcdFx0XHRcdFx0XHRkYXRhRmllbGQgYXMgRGF0YUZpZWxkRm9yQWN0aW9uIHwgRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uLFxuXHRcdFx0XHRcdFx0XHRjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aCxcblx0XHRcdFx0XHRcdFx0aXNFbnRpdHlTZXRcblx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRmYWxzZVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KTtcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gYVVpSGlkZGVuUGF0aEV4cHJlc3Npb25zO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gY2hhbmdlIHRoZSBjb250ZXh0IGN1cnJlbnRseSByZWZlcmVuY2VkIGJ5IHRoaXMgYmluZGluZyBieSByZW1vdmluZyB0aGUgbGFzdCBuYXZpZ2F0aW9uIHByb3BlcnR5LlxuICpcbiAqIEl0IGlzIHVzZWQgKHNwZWNpZmljYWxseSBpbiB0aGlzIGNhc2UpLCB0byB0cmFuc2Zvcm0gYSBiaW5kaW5nIG1hZGUgZm9yIGEgTmF2UHJvcCBjb250ZXh0IC9NYWluT2JqZWN0L05hdlByb3AxL05hdlByb3AyLFxuICogaW50byBhIGJpbmRpbmcgb24gdGhlIHByZXZpb3VzIGNvbnRleHQgL01haW5PYmplY3QvTmF2UHJvcDEuXG4gKlxuICogQHBhcmFtIHNvdXJjZSBEYXRhRmllbGRGb3JBY3Rpb24gfCBEYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24gfCBDdXN0b21BY3Rpb25cbiAqIEBwYXJhbSBjb250ZXh0RGF0YU1vZGVsT2JqZWN0UGF0aCBEYXRhTW9kZWxPYmplY3RQYXRoXG4gKiBAcGFyYW0gaXNFbnRpdHlTZXRcbiAqIEByZXR1cm5zIFRoZSBiaW5kaW5nIGV4cHJlc3Npb25cbiAqL1xuZnVuY3Rpb24gZ2V0QmluZGluZ0V4cEZyb21Db250ZXh0KFxuXHRzb3VyY2U6IERhdGFGaWVsZEZvckFjdGlvbiB8IERhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiB8IEN1c3RvbUFjdGlvbixcblx0Y29udGV4dERhdGFNb2RlbE9iamVjdFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGgsXG5cdGlzRW50aXR5U2V0OiBib29sZWFuXG4pOiBFeHByZXNzaW9uPGFueT4ge1xuXHRsZXQgc0V4cHJlc3Npb246IGFueSB8IHVuZGVmaW5lZDtcblx0aWYgKFxuXHRcdChzb3VyY2UgYXMgRGF0YUZpZWxkRm9yQWN0aW9uKT8uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbiB8fFxuXHRcdChzb3VyY2UgYXMgRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uKT8uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvblxuXHQpIHtcblx0XHRzRXhwcmVzc2lvbiA9IChzb3VyY2UgYXMgRGF0YUZpZWxkRm9yQWN0aW9uIHwgRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uKT8uYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW47XG5cdH0gZWxzZSB7XG5cdFx0c0V4cHJlc3Npb24gPSAoc291cmNlIGFzIEN1c3RvbUFjdGlvbik/LnZpc2libGU7XG5cdH1cblx0bGV0IHNQYXRoOiBzdHJpbmc7XG5cdGlmIChzRXhwcmVzc2lvbj8ucGF0aCkge1xuXHRcdHNQYXRoID0gc0V4cHJlc3Npb24ucGF0aDtcblx0fSBlbHNlIHtcblx0XHRzUGF0aCA9IHNFeHByZXNzaW9uO1xuXHR9XG5cdGlmIChzUGF0aCkge1xuXHRcdGlmICgoc291cmNlIGFzIEN1c3RvbUFjdGlvbik/LnZpc2libGUpIHtcblx0XHRcdHNQYXRoID0gc1BhdGguc3Vic3RyaW5nKDEsIHNQYXRoLmxlbmd0aCAtIDEpO1xuXHRcdH1cblx0XHRpZiAoc1BhdGguaW5kZXhPZihcIi9cIikgPiAwKSB7XG5cdFx0XHQvL2NoZWNrIGlmIHRoZSBuYXZpZ2F0aW9uIHByb3BlcnR5IGlzIGNvcnJlY3Q6XG5cdFx0XHRjb25zdCBhU3BsaXRQYXRoID0gc1BhdGguc3BsaXQoXCIvXCIpO1xuXHRcdFx0Y29uc3Qgc05hdmlnYXRpb25QYXRoID0gYVNwbGl0UGF0aFswXTtcblx0XHRcdGlmIChcblx0XHRcdFx0Y29udGV4dERhdGFNb2RlbE9iamVjdFBhdGg/LnRhcmdldE9iamVjdD8uX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIgJiZcblx0XHRcdFx0Y29udGV4dERhdGFNb2RlbE9iamVjdFBhdGgudGFyZ2V0T2JqZWN0LnBhcnRuZXIgPT09IHNOYXZpZ2F0aW9uUGF0aFxuXHRcdFx0KSB7XG5cdFx0XHRcdHJldHVybiBiaW5kaW5nRXhwcmVzc2lvbihhU3BsaXRQYXRoLnNsaWNlKDEpLmpvaW4oXCIvXCIpKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb25zdGFudCh0cnVlKTtcblx0XHRcdH1cblx0XHRcdC8vIEluIGNhc2UgdGhlcmUgaXMgbm8gbmF2aWdhdGlvbiBwcm9wZXJ0eSwgaWYgaXQncyBhbiBlbnRpdHlTZXQsIHRoZSBleHByZXNzaW9uIGJpbmRpbmcgaGFzIHRvIGJlIHJldHVybmVkOlxuXHRcdH0gZWxzZSBpZiAoaXNFbnRpdHlTZXQpIHtcblx0XHRcdHJldHVybiBiaW5kaW5nRXhwcmVzc2lvbihzUGF0aCk7XG5cdFx0XHQvLyBvdGhlcndpc2UgdGhlIGV4cHJlc3Npb24gYmluZGluZyBjYW5ub3QgYmUgdGFrZW4gaW50byBhY2NvdW50IGZvciB0aGUgc2VsZWN0aW9uIG1vZGUgZXZhbHVhdGlvbjpcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGNvbnN0YW50KHRydWUpO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gY29uc3RhbnQodHJ1ZSk7XG59XG5cbi8qKlxuICogTG9vcCB0aHJvdWdoIHRoZSBEYXRhRmllbGRGb3JBY3Rpb24gYW5kIERhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiBvZiBhIGxpbmUgaXRlbSBhbmQgY2hlY2tcbiAqIGlmIGF0IGxlYXN0IG9uZSBvZiB0aGVtIGlzIGFsd2F5cyB2aXNpYmxlIGluIHRoZSB0YWJsZSB0b29sYmFyIChhbmQgcmVxdWlyZXMgYSBjb250ZXh0KS5cbiAqXG4gKiBAcGFyYW0gbGluZUl0ZW1Bbm5vdGF0aW9uIENvbGxlY3Rpb24gb2YgZGF0YSBmaWVsZHMgZm9yIHJlcHJlc2VudGF0aW9uIGluIGEgdGFibGUgb3IgbGlzdFxuICogQHBhcmFtIGN1cnJlbnRFbnRpdHlUeXBlIEN1cnJlbnQgRW50aXR5IFR5cGVcbiAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlcmUgaXMgYXQgbGVhc3QgMSBhY3Rpb24gdGhhdCBtZWV0cyB0aGUgY3JpdGVyaWFcbiAqL1xuZnVuY3Rpb24gaGFzQm91bmRBY3Rpb25zQWx3YXlzVmlzaWJsZUluVG9vbEJhcihsaW5lSXRlbUFubm90YXRpb246IExpbmVJdGVtLCBjdXJyZW50RW50aXR5VHlwZTogRW50aXR5VHlwZSk6IGJvb2xlYW4ge1xuXHRyZXR1cm4gbGluZUl0ZW1Bbm5vdGF0aW9uLnNvbWUoZGF0YUZpZWxkID0+IHtcblx0XHRpZiAoXG5cdFx0XHQoZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBY3Rpb24gfHxcblx0XHRcdFx0ZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb24pICYmXG5cdFx0XHRkYXRhRmllbGQ/LklubGluZT8udmFsdWVPZigpICE9PSB0cnVlICYmXG5cdFx0XHQoZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgPT09IGZhbHNlIHx8IGRhdGFGaWVsZC5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpID09PSB1bmRlZmluZWQpXG5cdFx0KSB7XG5cdFx0XHRpZiAoZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBY3Rpb24pIHtcblx0XHRcdFx0Ly8gQ2hlY2sgaWYgdGhlIGxpbmVJdGVtIGNvbnRleHQgaXMgdGhlIHNhbWUgYXMgdGhhdCBvZiB0aGUgYWN0aW9uOlxuXHRcdFx0XHRyZXR1cm4gZGF0YUZpZWxkPy5BY3Rpb25UYXJnZXQ/LmlzQm91bmQgJiYgY3VycmVudEVudGl0eVR5cGUgPT09IGRhdGFGaWVsZD8uQWN0aW9uVGFyZ2V0LnNvdXJjZUVudGl0eVR5cGU7XG5cdFx0XHR9IGVsc2UgaWYgKGRhdGFGaWVsZC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uKSB7XG5cdFx0XHRcdHJldHVybiBkYXRhRmllbGQuUmVxdWlyZXNDb250ZXh0O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBoYXNDdXN0b21BY3Rpb25zQWx3YXlzVmlzaWJsZUluVG9vbEJhcihtYW5pZmVzdEFjdGlvbnM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUFjdGlvbj4pOiBib29sZWFuIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hbmlmZXN0QWN0aW9ucykuc29tZShhY3Rpb25LZXkgPT4ge1xuXHRcdGNvbnN0IGFjdGlvbiA9IG1hbmlmZXN0QWN0aW9uc1thY3Rpb25LZXldO1xuXHRcdGlmIChhY3Rpb24ucmVxdWlyZXNTZWxlY3Rpb24gJiYgYWN0aW9uLnZpc2libGU/LnRvU3RyaW5nKCkgPT09IFwidHJ1ZVwiKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdFx0cmV0dXJuIGZhbHNlO1xuXHR9KTtcbn1cblxuLyoqXG4gKiBJdGVyYXRlcyBvdmVyIHRoZSBjdXN0b20gYWN0aW9ucyAod2l0aCBrZXkgcmVxdWlyZXNTZWxlY3Rpb24pIGRlY2xhcmVkIGluIHRoZSBtYW5pZmVzdCBmb3IgdGhlIGN1cnJlbnQgbGluZSBpdGVtIGFuZCByZXR1cm5zIGFsbCB0aGVcbiAqIHZpc2libGUga2V5IHZhbHVlcyBhcyBhbiBleHByZXNzaW9uLlxuICpcbiAqIEBwYXJhbSBtYW5pZmVzdEFjdGlvbnMgVGhlIGFjdGlvbnMgZGVmaW5lZCBpbiB0aGUgbWFuaWZlc3RcbiAqIEByZXR1cm5zIEFycmF5PEV4cHJlc3Npb248Ym9vbGVhbj4+IEFsbCB0aGUgdmlzaWJsZSBwYXRoIGV4cHJlc3Npb25zIG9mIHRoZSBhY3Rpb25zIHRoYXQgbWVldCB0aGUgY3JpdGVyaWFcbiAqL1xuZnVuY3Rpb24gZ2V0VmlzaWJsZUV4cEZvckN1c3RvbUFjdGlvbnNSZXF1aXJpbmdDb250ZXh0KG1hbmlmZXN0QWN0aW9uczogUmVjb3JkPHN0cmluZywgQ3VzdG9tQWN0aW9uPik6IEV4cHJlc3Npb248Ym9vbGVhbj5bXSB7XG5cdGNvbnN0IGFWaXNpYmxlUGF0aEV4cHJlc3Npb25zOiBFeHByZXNzaW9uPGJvb2xlYW4+W10gPSBbXTtcblx0aWYgKG1hbmlmZXN0QWN0aW9ucykge1xuXHRcdE9iamVjdC5rZXlzKG1hbmlmZXN0QWN0aW9ucykuZm9yRWFjaChhY3Rpb25LZXkgPT4ge1xuXHRcdFx0Y29uc3QgYWN0aW9uID0gbWFuaWZlc3RBY3Rpb25zW2FjdGlvbktleV07XG5cdFx0XHRpZiAoYWN0aW9uLnJlcXVpcmVzU2VsZWN0aW9uID09PSB0cnVlICYmIGFjdGlvbi52aXNpYmxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0aWYgKHR5cGVvZiBhY3Rpb24udmlzaWJsZSA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRcdC8qVGhlIGZpbmFsIGFpbSB3b3VsZCBiZSB0byBjaGVjayBpZiB0aGUgcGF0aCBleHByZXNzaW9uIGRlcGVuZHMgb24gdGhlIHBhcmVudCBjb250ZXh0XG5cdFx0XHRcdFx0YW5kIGNvbnNpZGVycyBvbmx5IHRob3NlIGV4cHJlc3Npb25zIGZvciB0aGUgZXhwcmVzc2lvbiBldmFsdWF0aW9uLFxuXHRcdFx0XHRcdGJ1dCBjdXJyZW50bHkgbm90IHBvc3NpYmxlIGZyb20gdGhlIG1hbmlmZXN0IGFzIHRoZSB2aXNpYmxlIGtleSBpcyBib3VuZCBvbiB0aGUgcGFyZW50IGVudGl0eS5cblx0XHRcdFx0XHRUcmlja3kgdG8gZGlmZmVyZW50aWF0ZSB0aGUgcGF0aCBhcyBpdCdzIGRvbmUgZm9yIHRoZSBIaWRkZW4gYW5ub3RhdGlvbi5cblx0XHRcdFx0XHRGb3IgdGhlIHRpbWUgYmVpbmcgd2UgY29uc2lkZXIgYWxsIHRoZSBwYXRocyBvZiB0aGUgbWFuaWZlc3QqL1xuXG5cdFx0XHRcdFx0YVZpc2libGVQYXRoRXhwcmVzc2lvbnMucHVzaChyZXNvbHZlQmluZGluZ1N0cmluZyhhY3Rpb24/LnZpc2libGU/LnZhbHVlT2YoKSkpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGFWaXNpYmxlUGF0aEV4cHJlc3Npb25zO1xufVxuXG4vKipcbiAqIEV2YWx1YXRlIGlmIHRoZSBwYXRoIGlzIHN0YXRpY2FsbHkgZGVsZXRhYmxlIG9yIHVwZGF0YWJsZS5cbiAqXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dFxuICogQHJldHVybnMge1RhYmxlQ2FwYWJpbGl0eVJlc3RyaWN0aW9ufSBUaGUgdGFibGUgY2FwYWJpbGl0aWVzXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRDYXBhYmlsaXR5UmVzdHJpY3Rpb24oY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IFRhYmxlQ2FwYWJpbGl0eVJlc3RyaWN0aW9uIHtcblx0Y29uc3QgaXNEZWxldGFibGUgPSBpc1BhdGhEZWxldGFibGUoY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCkpO1xuXHRjb25zdCBpc1VwZGF0YWJsZSA9IGlzUGF0aFVwZGF0YWJsZShjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKSk7XG5cdHJldHVybiB7XG5cdFx0aXNEZWxldGFibGU6ICEoaXNDb25zdGFudChpc0RlbGV0YWJsZSkgJiYgaXNEZWxldGFibGUudmFsdWUgPT09IGZhbHNlKSxcblx0XHRpc1VwZGF0YWJsZTogIShpc0NvbnN0YW50KGlzVXBkYXRhYmxlKSAmJiBpc1VwZGF0YWJsZS52YWx1ZSA9PT0gZmFsc2UpXG5cdH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3Rpb25Nb2RlKFxuXHRsaW5lSXRlbUFubm90YXRpb246IExpbmVJdGVtIHwgdW5kZWZpbmVkLFxuXHR2aXN1YWxpemF0aW9uUGF0aDogc3RyaW5nLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRpc0VudGl0eVNldDogYm9vbGVhbixcblx0dGFyZ2V0Q2FwYWJpbGl0aWVzOiBUYWJsZUNhcGFiaWxpdHlSZXN0cmljdGlvblxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0aWYgKCFsaW5lSXRlbUFubm90YXRpb24pIHtcblx0XHRyZXR1cm4gU2VsZWN0aW9uTW9kZS5Ob25lO1xuXHR9XG5cdGNvbnN0IHRhYmxlTWFuaWZlc3RTZXR0aW5ncyA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RDb250cm9sQ29uZmlndXJhdGlvbih2aXN1YWxpemF0aW9uUGF0aCk7XG5cdGxldCBzZWxlY3Rpb25Nb2RlID0gdGFibGVNYW5pZmVzdFNldHRpbmdzLnRhYmxlU2V0dGluZ3M/LnNlbGVjdGlvbk1vZGU7XG5cdGxldCBhSGlkZGVuQmluZGluZ0V4cHJlc3Npb25zOiBFeHByZXNzaW9uPGJvb2xlYW4+W10gPSBbXSxcblx0XHRhVmlzaWJsZUJpbmRpbmdFeHByZXNzaW9uczogRXhwcmVzc2lvbjxib29sZWFuPltdID0gW107XG5cdGNvbnN0IG1hbmlmZXN0QWN0aW9ucyA9IGdldEFjdGlvbnNGcm9tTWFuaWZlc3QoXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdENvbnRyb2xDb25maWd1cmF0aW9uKHZpc3VhbGl6YXRpb25QYXRoKS5hY3Rpb25zLFxuXHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0W10sXG5cdFx0dW5kZWZpbmVkLFxuXHRcdGZhbHNlXG5cdCk7XG5cdGxldCBpc1BhcmVudERlbGV0YWJsZSwgcGFyZW50RW50aXR5U2V0RGVsZXRhYmxlO1xuXHRpZiAoY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLk9iamVjdFBhZ2UpIHtcblx0XHRpc1BhcmVudERlbGV0YWJsZSA9IGlzUGF0aERlbGV0YWJsZShjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKSwgdW5kZWZpbmVkKTtcblx0XHRwYXJlbnRFbnRpdHlTZXREZWxldGFibGUgPSBpc1BhcmVudERlbGV0YWJsZSA/IGNvbXBpbGVCaW5kaW5nKGlzUGFyZW50RGVsZXRhYmxlLCB0cnVlKSA6IGlzUGFyZW50RGVsZXRhYmxlO1xuXHR9XG5cdGlmIChzZWxlY3Rpb25Nb2RlICYmIHNlbGVjdGlvbk1vZGUgPT09IFNlbGVjdGlvbk1vZGUuTm9uZSkge1xuXHRcdGlmICghaXNFbnRpdHlTZXQpIHtcblx0XHRcdGlmICh0YXJnZXRDYXBhYmlsaXRpZXMuaXNEZWxldGFibGUgfHwgcGFyZW50RW50aXR5U2V0RGVsZXRhYmxlICE9PSBcImZhbHNlXCIpIHtcblx0XHRcdFx0c2VsZWN0aW9uTW9kZSA9IFNlbGVjdGlvbk1vZGUuTXVsdGk7XG5cdFx0XHRcdHJldHVybiBjb21waWxlQmluZGluZyhcblx0XHRcdFx0XHRpZkVsc2UoZXF1YWwoYmluZGluZ0V4cHJlc3Npb24oXCIvZWRpdE1vZGVcIiwgXCJ1aVwiKSwgXCJFZGl0YWJsZVwiKSwgY29uc3RhbnQoc2VsZWN0aW9uTW9kZSksIGNvbnN0YW50KFwiTm9uZVwiKSlcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGVjdGlvbk1vZGUgPSBTZWxlY3Rpb25Nb2RlLk5vbmU7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChpc0VudGl0eVNldCkge1xuXHRcdFx0aWYgKHRhcmdldENhcGFiaWxpdGllcy5pc0RlbGV0YWJsZSkge1xuXHRcdFx0XHRzZWxlY3Rpb25Nb2RlID0gU2VsZWN0aW9uTW9kZS5NdWx0aTtcblx0XHRcdFx0cmV0dXJuIHNlbGVjdGlvbk1vZGU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzZWxlY3Rpb25Nb2RlID0gU2VsZWN0aW9uTW9kZS5Ob25lO1xuXHRcdFx0fVxuXHRcdH1cblx0fSBlbHNlIGlmICghc2VsZWN0aW9uTW9kZSB8fCBzZWxlY3Rpb25Nb2RlID09PSBTZWxlY3Rpb25Nb2RlLkF1dG8pIHtcblx0XHRzZWxlY3Rpb25Nb2RlID0gU2VsZWN0aW9uTW9kZS5NdWx0aTtcblx0fVxuXG5cdGlmIChcblx0XHRoYXNCb3VuZEFjdGlvbnNBbHdheXNWaXNpYmxlSW5Ub29sQmFyKGxpbmVJdGVtQW5ub3RhdGlvbiwgY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCkpIHx8XG5cdFx0aGFzQ3VzdG9tQWN0aW9uc0Fsd2F5c1Zpc2libGVJblRvb2xCYXIobWFuaWZlc3RBY3Rpb25zKVxuXHQpIHtcblx0XHRyZXR1cm4gc2VsZWN0aW9uTW9kZTtcblx0fVxuXHRhSGlkZGVuQmluZGluZ0V4cHJlc3Npb25zID0gZ2V0VUlIaWRkZW5FeHBGb3JBY3Rpb25zUmVxdWlyaW5nQ29udGV4dChcblx0XHRsaW5lSXRlbUFubm90YXRpb24sXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCksXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCksXG5cdFx0aXNFbnRpdHlTZXRcblx0KTtcblx0YVZpc2libGVCaW5kaW5nRXhwcmVzc2lvbnMgPSBnZXRWaXNpYmxlRXhwRm9yQ3VzdG9tQWN0aW9uc1JlcXVpcmluZ0NvbnRleHQobWFuaWZlc3RBY3Rpb25zKTtcblxuXHQvLyBObyBhY3Rpb24gcmVxdWlyaW5nIGEgY29udGV4dDpcblx0aWYgKGFIaWRkZW5CaW5kaW5nRXhwcmVzc2lvbnMubGVuZ3RoID09PSAwICYmIGFWaXNpYmxlQmluZGluZ0V4cHJlc3Npb25zLmxlbmd0aCA9PT0gMCkge1xuXHRcdGlmICghaXNFbnRpdHlTZXQpIHtcblx0XHRcdGlmICh0YXJnZXRDYXBhYmlsaXRpZXMuaXNEZWxldGFibGUgfHwgcGFyZW50RW50aXR5U2V0RGVsZXRhYmxlICE9PSBcImZhbHNlXCIpIHtcblx0XHRcdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRcdGlmRWxzZShlcXVhbChiaW5kaW5nRXhwcmVzc2lvbihcIi9lZGl0TW9kZVwiLCBcInVpXCIpLCBcIkVkaXRhYmxlXCIpLCBjb25zdGFudChzZWxlY3Rpb25Nb2RlKSwgY29uc3RhbnQoU2VsZWN0aW9uTW9kZS5Ob25lKSlcblx0XHRcdFx0KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBTZWxlY3Rpb25Nb2RlLk5vbmU7XG5cdFx0XHR9XG5cdFx0XHQvLyBFbnRpdHlTZXQgZGVsZXRhYmxlOlxuXHRcdH0gZWxzZSBpZiAodGFyZ2V0Q2FwYWJpbGl0aWVzLmlzRGVsZXRhYmxlKSB7XG5cdFx0XHRyZXR1cm4gc2VsZWN0aW9uTW9kZTtcblx0XHRcdC8vIEVudGl0eVNldCBub3QgZGVsZXRhYmxlOlxuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gU2VsZWN0aW9uTW9kZS5Ob25lO1xuXHRcdH1cblx0XHQvLyBUaGVyZSBhcmUgYWN0aW9ucyByZXF1aXJpbmcgYSBjb250ZXh0OlxuXHR9IGVsc2UgaWYgKCFpc0VudGl0eVNldCkge1xuXHRcdGlmICh0YXJnZXRDYXBhYmlsaXRpZXMuaXNEZWxldGFibGUgfHwgcGFyZW50RW50aXR5U2V0RGVsZXRhYmxlICE9PSBcImZhbHNlXCIpIHtcblx0XHRcdHJldHVybiBjb21waWxlQmluZGluZyhcblx0XHRcdFx0aWZFbHNlKFxuXHRcdFx0XHRcdGVxdWFsKGJpbmRpbmdFeHByZXNzaW9uKFwiL2VkaXRNb2RlXCIsIFwidWlcIiksIFwiRWRpdGFibGVcIiksXG5cdFx0XHRcdFx0Y29uc3RhbnQoc2VsZWN0aW9uTW9kZSksXG5cdFx0XHRcdFx0aWZFbHNlKFxuXHRcdFx0XHRcdFx0b3IoLi4uYUhpZGRlbkJpbmRpbmdFeHByZXNzaW9ucy5jb25jYXQoYVZpc2libGVCaW5kaW5nRXhwcmVzc2lvbnMpKSxcblx0XHRcdFx0XHRcdGNvbnN0YW50KHNlbGVjdGlvbk1vZGUpLFxuXHRcdFx0XHRcdFx0Y29uc3RhbnQoU2VsZWN0aW9uTW9kZS5Ob25lKVxuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRpZkVsc2UoXG5cdFx0XHRcdFx0b3IoLi4uYUhpZGRlbkJpbmRpbmdFeHByZXNzaW9ucy5jb25jYXQoYVZpc2libGVCaW5kaW5nRXhwcmVzc2lvbnMpKSxcblx0XHRcdFx0XHRjb25zdGFudChzZWxlY3Rpb25Nb2RlKSxcblx0XHRcdFx0XHRjb25zdGFudChTZWxlY3Rpb25Nb2RlLk5vbmUpXG5cdFx0XHRcdClcblx0XHRcdCk7XG5cdFx0fVxuXHRcdC8vRW50aXR5U2V0IGRlbGV0YWJsZTpcblx0fSBlbHNlIGlmICh0YXJnZXRDYXBhYmlsaXRpZXMuaXNEZWxldGFibGUpIHtcblx0XHRyZXR1cm4gU2VsZWN0aW9uTW9kZS5NdWx0aTtcblx0XHQvL0VudGl0eVNldCBub3QgZGVsZXRhYmxlOlxuXHR9IGVsc2Uge1xuXHRcdHJldHVybiBjb21waWxlQmluZGluZyhcblx0XHRcdGlmRWxzZShcblx0XHRcdFx0b3IoLi4uYUhpZGRlbkJpbmRpbmdFeHByZXNzaW9ucy5jb25jYXQoYVZpc2libGVCaW5kaW5nRXhwcmVzc2lvbnMpKSxcblx0XHRcdFx0Y29uc3RhbnQoc2VsZWN0aW9uTW9kZSksXG5cdFx0XHRcdGNvbnN0YW50KFNlbGVjdGlvbk1vZGUuTm9uZSlcblx0XHRcdClcblx0XHQpO1xuXHR9XG59XG5cbi8qKlxuICogTWV0aG9kIHRvIHJldHJpZXZlIGFsbCB0YWJsZSBhY3Rpb25zIGZyb20gYW5ub3RhdGlvbnMuXG4gKlxuICogQHBhcmFtIGxpbmVJdGVtQW5ub3RhdGlvblxuICogQHBhcmFtIHZpc3VhbGl6YXRpb25QYXRoXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dFxuICogQHJldHVybnMge1JlY29yZDxCYXNlQWN0aW9uLCBCYXNlQWN0aW9uPn0gVGhlIHRhYmxlIGFubm90YXRpb24gYWN0aW9uc1xuICovXG5mdW5jdGlvbiBnZXRUYWJsZUFubm90YXRpb25BY3Rpb25zKGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0sIHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpIHtcblx0Y29uc3QgdGFibGVBY3Rpb25zOiBCYXNlQWN0aW9uW10gPSBbXTtcblx0Y29uc3QgaGlkZGVuVGFibGVBY3Rpb25zOiBCYXNlQWN0aW9uW10gPSBbXTtcblx0aWYgKGxpbmVJdGVtQW5ub3RhdGlvbikge1xuXHRcdGxpbmVJdGVtQW5ub3RhdGlvbi5mb3JFYWNoKChkYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpID0+IHtcblx0XHRcdGxldCB0YWJsZUFjdGlvbjogQW5ub3RhdGlvbkFjdGlvbiB8IHVuZGVmaW5lZDtcblx0XHRcdGlmIChcblx0XHRcdFx0aXNEYXRhRmllbGRGb3JBY3Rpb25BYnN0cmFjdChkYXRhRmllbGQpICYmXG5cdFx0XHRcdCEoZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgPT09IHRydWUpICYmXG5cdFx0XHRcdCFkYXRhRmllbGQuSW5saW5lICYmXG5cdFx0XHRcdCFkYXRhRmllbGQuRGV0ZXJtaW5pbmdcblx0XHRcdCkge1xuXHRcdFx0XHRjb25zdCBrZXkgPSBLZXlIZWxwZXIuZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkKGRhdGFGaWVsZCk7XG5cdFx0XHRcdHN3aXRjaCAoZGF0YUZpZWxkLiRUeXBlKSB7XG5cdFx0XHRcdFx0Y2FzZSBcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZEZvckFjdGlvblwiOlxuXHRcdFx0XHRcdFx0dGFibGVBY3Rpb24gPSB7XG5cdFx0XHRcdFx0XHRcdHR5cGU6IEFjdGlvblR5cGUuRGF0YUZpZWxkRm9yQWN0aW9uLFxuXHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aDogY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXRCYXNlZEFubm90YXRpb25QYXRoKGRhdGFGaWVsZC5mdWxseVF1YWxpZmllZE5hbWUpLFxuXHRcdFx0XHRcdFx0XHRrZXk6IGtleSxcblx0XHRcdFx0XHRcdFx0dmlzaWJsZTogY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRcdFx0XHRcdFx0bm90KFxuXHRcdFx0XHRcdFx0XHRcdFx0ZXF1YWwoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGFubm90YXRpb25FeHByZXNzaW9uKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRhdGFGaWVsZC5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRbXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRSZWxhdGl2ZU1vZGVsUGF0aEZ1bmN0aW9uKClcblx0XHRcdFx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHJ1ZVxuXHRcdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRcdFx0aXNOYXZpZ2FibGU6IHRydWVcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdGNhc2UgXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb25cIjpcblx0XHRcdFx0XHRcdHRhYmxlQWN0aW9uID0ge1xuXHRcdFx0XHRcdFx0XHR0eXBlOiBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbixcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChkYXRhRmllbGQuZnVsbHlRdWFsaWZpZWROYW1lKSxcblx0XHRcdFx0XHRcdFx0a2V5OiBrZXksXG5cdFx0XHRcdFx0XHRcdHZpc2libGU6IGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRcdFx0XHRcdG5vdChcblx0XHRcdFx0XHRcdFx0XHRcdGVxdWFsKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uRXhwcmVzc2lvbihcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkYXRhRmllbGQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0W10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0UmVsYXRpdmVNb2RlbFBhdGhGdW5jdGlvbigpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdHRydWVcblx0XHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSBpZiAoZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgPT09IHRydWUpIHtcblx0XHRcdFx0aGlkZGVuVGFibGVBY3Rpb25zLnB1c2goe1xuXHRcdFx0XHRcdHR5cGU6IEFjdGlvblR5cGUuRGVmYXVsdCxcblx0XHRcdFx0XHRrZXk6IEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQoZGF0YUZpZWxkKVxuXHRcdFx0XHR9KTtcblx0XHRcdH1cblx0XHRcdGlmICh0YWJsZUFjdGlvbikge1xuXHRcdFx0XHR0YWJsZUFjdGlvbnMucHVzaCh0YWJsZUFjdGlvbik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIHtcblx0XHR0YWJsZUFjdGlvbnM6IHRhYmxlQWN0aW9ucyxcblx0XHRoaWRkZW5UYWJsZUFjdGlvbnM6IGhpZGRlblRhYmxlQWN0aW9uc1xuXHR9O1xufVxuXG5mdW5jdGlvbiBnZXRIaWdobGlnaHRSb3dCaW5kaW5nKFxuXHRjcml0aWNhbGl0eUFubm90YXRpb246IFBhdGhBbm5vdGF0aW9uRXhwcmVzc2lvbjxDcml0aWNhbGl0eVR5cGU+IHwgRW51bVZhbHVlPENyaXRpY2FsaXR5VHlwZT4gfCB1bmRlZmluZWQsXG5cdGlzRHJhZnRSb290OiBib29sZWFuLFxuXHR0YXJnZXRFbnRpdHlUeXBlPzogRW50aXR5VHlwZVxuKTogRXhwcmVzc2lvbjxNZXNzYWdlVHlwZT4ge1xuXHRsZXQgZGVmYXVsdEhpZ2hsaWdodFJvd0RlZmluaXRpb246IE1lc3NhZ2VUeXBlIHwgRXhwcmVzc2lvbjxNZXNzYWdlVHlwZT4gPSBNZXNzYWdlVHlwZS5Ob25lO1xuXHRpZiAoY3JpdGljYWxpdHlBbm5vdGF0aW9uKSB7XG5cdFx0aWYgKHR5cGVvZiBjcml0aWNhbGl0eUFubm90YXRpb24gPT09IFwib2JqZWN0XCIpIHtcblx0XHRcdGRlZmF1bHRIaWdobGlnaHRSb3dEZWZpbml0aW9uID0gYW5ub3RhdGlvbkV4cHJlc3Npb24oY3JpdGljYWxpdHlBbm5vdGF0aW9uKSBhcyBFeHByZXNzaW9uPE1lc3NhZ2VUeXBlPjtcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gRW51bSBWYWx1ZSBzbyB3ZSBnZXQgdGhlIGNvcnJlc3BvbmRpbmcgc3RhdGljIHBhcnRcblx0XHRcdGRlZmF1bHRIaWdobGlnaHRSb3dEZWZpbml0aW9uID0gZ2V0TWVzc2FnZVR5cGVGcm9tQ3JpdGljYWxpdHlUeXBlKGNyaXRpY2FsaXR5QW5ub3RhdGlvbik7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBpZkVsc2UoXG5cdFx0aXNEcmFmdFJvb3QgJiYgRHJhZnQuSXNOZXdPYmplY3QsXG5cdFx0TWVzc2FnZVR5cGUuSW5mb3JtYXRpb24gYXMgTWVzc2FnZVR5cGUsXG5cdFx0Zm9ybWF0UmVzdWx0KFxuXHRcdFx0W2RlZmF1bHRIaWdobGlnaHRSb3dEZWZpbml0aW9uLCBiaW5kaW5nRXhwcmVzc2lvbihgZmlsdGVyZWRNZXNzYWdlc2AsIFwiaW50ZXJuYWxcIildLFxuXHRcdFx0dGFibGVGb3JtYXR0ZXJzLnJvd0hpZ2hsaWdodGluZyxcblx0XHRcdHRhcmdldEVudGl0eVR5cGVcblx0XHQpXG5cdCk7XG59XG5cbmZ1bmN0aW9uIF9nZXRDcmVhdGlvbkJlaGF2aW91cihcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSB8IHVuZGVmaW5lZCxcblx0dGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb246IFRhYmxlQ29udHJvbENvbmZpZ3VyYXRpb24sXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdG5hdmlnYXRpb25TZXR0aW5nczogTmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvblxuKTogVGFibGVBbm5vdGF0aW9uQ29uZmlndXJhdGlvbltcImNyZWF0ZVwiXSB7XG5cdGNvbnN0IG5hdmlnYXRpb24gPSBuYXZpZ2F0aW9uU2V0dGluZ3M/LmNyZWF0ZSB8fCBuYXZpZ2F0aW9uU2V0dGluZ3M/LmRldGFpbDtcblxuXHQvLyBjcm9zcy1hcHBcblx0aWYgKG5hdmlnYXRpb24/Lm91dGJvdW5kICYmIG5hdmlnYXRpb24ub3V0Ym91bmREZXRhaWwgJiYgbmF2aWdhdGlvblNldHRpbmdzPy5jcmVhdGUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bW9kZTogXCJFeHRlcm5hbFwiLFxuXHRcdFx0b3V0Ym91bmQ6IG5hdmlnYXRpb24ub3V0Ym91bmQsXG5cdFx0XHRvdXRib3VuZERldGFpbDogbmF2aWdhdGlvbi5vdXRib3VuZERldGFpbCxcblx0XHRcdG5hdmlnYXRpb25TZXR0aW5nczogbmF2aWdhdGlvblNldHRpbmdzXG5cdFx0fTtcblx0fVxuXG5cdGxldCBuZXdBY3Rpb247XG5cdGlmIChsaW5lSXRlbUFubm90YXRpb24pIHtcblx0XHQvLyBpbi1hcHBcblx0XHRjb25zdCB0YXJnZXRBbm5vdGF0aW9ucyA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCk/LmFubm90YXRpb25zO1xuXHRcdG5ld0FjdGlvbiA9IHRhcmdldEFubm90YXRpb25zPy5Db21tb24/LkRyYWZ0Um9vdD8uTmV3QWN0aW9uIHx8IHRhcmdldEFubm90YXRpb25zPy5TZXNzaW9uPy5TdGlja3lTZXNzaW9uU3VwcG9ydGVkPy5OZXdBY3Rpb247IC8vIFRPRE86IElzIHRoZXJlIHJlYWxseSBubyAnTmV3QWN0aW9uJyBvbiBEcmFmdE5vZGU/IHRhcmdldEFubm90YXRpb25zPy5Db21tb24/LkRyYWZ0Tm9kZT8uTmV3QWN0aW9uXG5cblx0XHRpZiAodGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24uY3JlYXRpb25Nb2RlID09PSBDcmVhdGlvbk1vZGUuQ3JlYXRpb25Sb3cgJiYgbmV3QWN0aW9uKSB7XG5cdFx0XHQvLyBBIGNvbWJpbmF0aW9uIG9mICdDcmVhdGlvblJvdycgYW5kICdOZXdBY3Rpb24nIGRvZXMgbm90IG1ha2Ugc2Vuc2Vcblx0XHRcdC8vIFRPRE86IE9yIGRvZXMgaXQ/XG5cdFx0XHR0aHJvdyBFcnJvcihgQ3JlYXRpb24gbW9kZSAnJHtDcmVhdGlvbk1vZGUuQ3JlYXRpb25Sb3d9JyBjYW4gbm90IGJlIHVzZWQgd2l0aCBhIGN1c3RvbSAnbmV3JyBhY3Rpb24gKCR7bmV3QWN0aW9ufSlgKTtcblx0XHR9XG5cdFx0aWYgKG5hdmlnYXRpb24/LnJvdXRlKSB7XG5cdFx0XHQvLyByb3V0ZSBzcGVjaWZpZWRcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdG1vZGU6IHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uLmNyZWF0aW9uTW9kZSxcblx0XHRcdFx0YXBwZW5kOiB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi5jcmVhdGVBdEVuZCxcblx0XHRcdFx0bmV3QWN0aW9uOiBuZXdBY3Rpb24/LnRvU3RyaW5nKCksXG5cdFx0XHRcdG5hdmlnYXRlVG9UYXJnZXQ6IHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uLmNyZWF0aW9uTW9kZSA9PT0gQ3JlYXRpb25Nb2RlLk5ld1BhZ2UgPyBuYXZpZ2F0aW9uLnJvdXRlIDogdW5kZWZpbmVkIC8vIG5hdmlnYXRlIG9ubHkgaW4gTmV3UGFnZSBtb2RlXG5cdFx0XHR9O1xuXHRcdH1cblx0fVxuXG5cdC8vIG5vIG5hdmlnYXRpb24gb3Igbm8gcm91dGUgc3BlY2lmaWVkIC0gZmFsbGJhY2sgdG8gaW5saW5lIGNyZWF0ZSBpZiBvcmlnaW5hbCBjcmVhdGlvbiBtb2RlIHdhcyAnTmV3UGFnZSdcblx0aWYgKHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uLmNyZWF0aW9uTW9kZSA9PT0gQ3JlYXRpb25Nb2RlLk5ld1BhZ2UpIHtcblx0XHR0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi5jcmVhdGlvbk1vZGUgPSBDcmVhdGlvbk1vZGUuSW5saW5lO1xuXHR9XG5cblx0cmV0dXJuIHtcblx0XHRtb2RlOiB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi5jcmVhdGlvbk1vZGUsXG5cdFx0YXBwZW5kOiB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi5jcmVhdGVBdEVuZCxcblx0XHRuZXdBY3Rpb246IG5ld0FjdGlvbj8udG9TdHJpbmcoKVxuXHR9O1xufVxuXG5jb25zdCBfZ2V0Um93Q29uZmlndXJhdGlvblByb3BlcnR5ID0gZnVuY3Rpb24oXG5cdGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0gfCB1bmRlZmluZWQsXG5cdHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdG5hdmlnYXRpb25TZXR0aW5nczogTmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvbixcblx0dGFyZ2V0UGF0aDogc3RyaW5nXG4pIHtcblx0bGV0IHByZXNzUHJvcGVydHksIG5hdmlnYXRpb25UYXJnZXQ7XG5cdGxldCBjcml0aWNhbGl0eVByb3BlcnR5OiBFeHByZXNzaW9uT3JQcmltaXRpdmU8TWVzc2FnZVR5cGU+ID0gTWVzc2FnZVR5cGUuTm9uZTtcblx0Y29uc3QgdGFyZ2V0RW50aXR5VHlwZSA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpO1xuXHRpZiAobmF2aWdhdGlvblNldHRpbmdzICYmIGxpbmVJdGVtQW5ub3RhdGlvbikge1xuXHRcdG5hdmlnYXRpb25UYXJnZXQgPSBuYXZpZ2F0aW9uU2V0dGluZ3MuZGlzcGxheT8udGFyZ2V0IHx8IG5hdmlnYXRpb25TZXR0aW5ncy5kZXRhaWw/Lm91dGJvdW5kO1xuXHRcdGlmIChuYXZpZ2F0aW9uVGFyZ2V0KSB7XG5cdFx0XHRwcmVzc1Byb3BlcnR5ID1cblx0XHRcdFx0XCIuaGFuZGxlcnMub25DaGV2cm9uUHJlc3NOYXZpZ2F0ZU91dEJvdW5kKCAkY29udHJvbGxlciAsJ1wiICsgbmF2aWdhdGlvblRhcmdldCArIFwiJywgJHskcGFyYW1ldGVycz5iaW5kaW5nQ29udGV4dH0pXCI7XG5cdFx0fSBlbHNlIGlmICh0YXJnZXRFbnRpdHlUeXBlKSB7XG5cdFx0XHRjb25zdCB0YXJnZXRFbnRpdHlTZXQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldCgpO1xuXHRcdFx0bmF2aWdhdGlvblRhcmdldCA9IG5hdmlnYXRpb25TZXR0aW5ncy5kZXRhaWw/LnJvdXRlO1xuXHRcdFx0aWYgKG5hdmlnYXRpb25UYXJnZXQpIHtcblx0XHRcdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IGdldEhpZ2hsaWdodFJvd0JpbmRpbmcoXG5cdFx0XHRcdFx0bGluZUl0ZW1Bbm5vdGF0aW9uLmFubm90YXRpb25zPy5VST8uQ3JpdGljYWxpdHksXG5cdFx0XHRcdFx0ISF0YXJnZXRFbnRpdHlTZXQ/LmFubm90YXRpb25zPy5Db21tb24/LkRyYWZ0Um9vdCB8fCAhIXRhcmdldEVudGl0eVNldD8uYW5ub3RhdGlvbnM/LkNvbW1vbj8uRHJhZnROb2RlLFxuXHRcdFx0XHRcdHRhcmdldEVudGl0eVR5cGVcblx0XHRcdFx0KTtcblx0XHRcdFx0cHJlc3NQcm9wZXJ0eSA9XG5cdFx0XHRcdFx0XCJBUEkub25UYWJsZVJvd1ByZXNzKCRldmVudCwgJGNvbnRyb2xsZXIsICR7JHBhcmFtZXRlcnM+YmluZGluZ0NvbnRleHR9LCB7IGNhbGxFeHRlbnNpb246IHRydWUsIHRhcmdldFBhdGg6ICdcIiArXG5cdFx0XHRcdFx0dGFyZ2V0UGF0aCArXG5cdFx0XHRcdFx0XCInLCBlZGl0YWJsZSA6IFwiICtcblx0XHRcdFx0XHQodGFyZ2V0RW50aXR5U2V0Py5hbm5vdGF0aW9ucz8uQ29tbW9uPy5EcmFmdFJvb3QgfHwgdGFyZ2V0RW50aXR5U2V0Py5hbm5vdGF0aW9ucz8uQ29tbW9uPy5EcmFmdE5vZGVcblx0XHRcdFx0XHRcdD8gXCIhJHskcGFyYW1ldGVycz5iaW5kaW5nQ29udGV4dH0uZ2V0UHJvcGVydHkoJ0lzQWN0aXZlRW50aXR5JylcIlxuXHRcdFx0XHRcdFx0OiBcInVuZGVmaW5lZFwiKSArXG5cdFx0XHRcdFx0XCJ9KVwiOyAvL05lZWQgdG8gYWNjZXNzIHRvIERyYWZ0Um9vdCBhbmQgRHJhZnROb2RlICEhISEhISFcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBnZXRIaWdobGlnaHRSb3dCaW5kaW5nKGxpbmVJdGVtQW5ub3RhdGlvbi5hbm5vdGF0aW9ucz8uVUk/LkNyaXRpY2FsaXR5LCBmYWxzZSwgdGFyZ2V0RW50aXR5VHlwZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGNvbnN0IHJvd05hdmlnYXRlZEV4cHJlc3Npb246IEV4cHJlc3Npb248Ym9vbGVhbj4gPSBmb3JtYXRSZXN1bHQoXG5cdFx0W2JpbmRpbmdFeHByZXNzaW9uKFwiL2RlZXBlc3RQYXRoXCIsIFwiaW50ZXJuYWxcIildLFxuXHRcdHRhYmxlRm9ybWF0dGVycy5uYXZpZ2F0ZWRSb3csXG5cdFx0dGFyZ2V0RW50aXR5VHlwZVxuXHQpO1xuXHRyZXR1cm4ge1xuXHRcdHByZXNzOiBwcmVzc1Byb3BlcnR5LFxuXHRcdGFjdGlvbjogcHJlc3NQcm9wZXJ0eSA/IFwiTmF2aWdhdGlvblwiIDogdW5kZWZpbmVkLFxuXHRcdHJvd0hpZ2hsaWdodGluZzogY29tcGlsZUJpbmRpbmcoY3JpdGljYWxpdHlQcm9wZXJ0eSksXG5cdFx0cm93TmF2aWdhdGVkOiBjb21waWxlQmluZGluZyhyb3dOYXZpZ2F0ZWRFeHByZXNzaW9uKVxuXHR9O1xufTtcblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgY29sdW1ucyBmcm9tIHRoZSBlbnRpdHlUeXBlLlxuICpcbiAqIEBwYXJhbSBjb2x1bW5zVG9CZUNyZWF0ZWQgVGhlIGNvbHVtbnMgdG8gYmUgY3JlYXRlZC5cbiAqIEBwYXJhbSBlbnRpdHlUeXBlIFRoZSB0YXJnZXQgZW50aXR5IHR5cGUuXG4gKiBAcGFyYW0gYW5ub3RhdGlvbkNvbHVtbnMgVGhlIGFycmF5IG9mIGNvbHVtbnMgY3JlYXRlZCBiYXNlZCBvbiBMaW5lSXRlbSBhbm5vdGF0aW9ucy5cbiAqIEBwYXJhbSBub25Tb3J0YWJsZUNvbHVtbnMgVGhlIGFycmF5IG9mIGFsbCBub24gc29ydGFibGUgY29sdW1uIG5hbWVzLlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlciBjb250ZXh0LlxuICogQHBhcmFtIHRhYmxlVHlwZSBUaGUgdGFibGUgdHlwZS5cbiAqIEByZXR1cm5zIHtBbm5vdGF0aW9uVGFibGVDb2x1bW5bXX0gVGhlIGNvbHVtbiBmcm9tIHRoZSBlbnRpdHlUeXBlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb2x1bW5zRnJvbUVudGl0eVR5cGUgPSBmdW5jdGlvbihcblx0Y29sdW1uc1RvQmVDcmVhdGVkOiBSZWNvcmQ8c3RyaW5nLCBQcm9wZXJ0eT4sXG5cdGVudGl0eVR5cGU6IEVudGl0eVR5cGUsXG5cdGFubm90YXRpb25Db2x1bW5zOiBBbm5vdGF0aW9uVGFibGVDb2x1bW5bXSA9IFtdLFxuXHRub25Tb3J0YWJsZUNvbHVtbnM6IHN0cmluZ1tdLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHR0YWJsZVR5cGU6IFRhYmxlVHlwZVxuKTogQW5ub3RhdGlvblRhYmxlQ29sdW1uW10ge1xuXHRjb25zdCB0YWJsZUNvbHVtbnM6IEFubm90YXRpb25UYWJsZUNvbHVtbltdID0gW107XG5cdC8vIENhdGNoIGFscmVhZHkgZXhpc3RpbmcgY29sdW1ucyAtIHdoaWNoIHdlcmUgYWRkZWQgYmVmb3JlIGJ5IExpbmVJdGVtIEFubm90YXRpb25zXG5cdGNvbnN0IGFnZ3JlZ2F0aW9uSGVscGVyID0gbmV3IEFnZ3JlZ2F0aW9uSGVscGVyKGVudGl0eVR5cGUsIGNvbnZlcnRlckNvbnRleHQpO1xuXG5cdGVudGl0eVR5cGUuZW50aXR5UHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eTogUHJvcGVydHkpID0+IHtcblx0XHQvLyBDYXRjaCBhbHJlYWR5IGV4aXN0aW5nIGNvbHVtbnMgLSB3aGljaCB3ZXJlIGFkZGVkIGJlZm9yZSBieSBMaW5lSXRlbSBBbm5vdGF0aW9uc1xuXHRcdGNvbnN0IGV4aXN0cyA9IGFubm90YXRpb25Db2x1bW5zLnNvbWUoY29sdW1uID0+IHtcblx0XHRcdHJldHVybiBjb2x1bW4ubmFtZSA9PT0gcHJvcGVydHkubmFtZTtcblx0XHR9KTtcblxuXHRcdC8vIGlmIHRhcmdldCB0eXBlIGV4aXN0cywgaXQgaXMgYSBjb21wbGV4IHByb3BlcnR5IGFuZCBzaG91bGQgYmUgaWdub3JlZFxuXHRcdGlmICghcHJvcGVydHkudGFyZ2V0VHlwZSAmJiAhZXhpc3RzKSB7XG5cdFx0XHRjb25zdCByZWxhdGVkUHJvcGVydGllc0luZm86IENvbXBsZXhQcm9wZXJ0eUluZm8gPSBjb2xsZWN0UmVsYXRlZFByb3BlcnRpZXMoXG5cdFx0XHRcdHByb3BlcnR5Lm5hbWUsXG5cdFx0XHRcdHByb3BlcnR5LFxuXHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0XHR0cnVlLFxuXHRcdFx0XHR0YWJsZVR5cGVcblx0XHRcdCk7XG5cdFx0XHRjb25zdCByZWxhdGVkUHJvcGVydHlOYW1lczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhyZWxhdGVkUHJvcGVydGllc0luZm8ucHJvcGVydGllcyk7XG5cdFx0XHRjb25zdCBhZGRpdGlvbmFsUHJvcGVydHlOYW1lczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhyZWxhdGVkUHJvcGVydGllc0luZm8uYWRkaXRpb25hbFByb3BlcnRpZXMpO1xuXHRcdFx0Y29uc3QgY29sdW1uSW5mbyA9IGdldENvbHVtbkRlZmluaXRpb25Gcm9tUHJvcGVydHkoXG5cdFx0XHRcdHByb3BlcnR5LFxuXHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgocHJvcGVydHkuZnVsbHlRdWFsaWZpZWROYW1lKSxcblx0XHRcdFx0cHJvcGVydHkubmFtZSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0dHJ1ZSxcblx0XHRcdFx0bm9uU29ydGFibGVDb2x1bW5zLFxuXHRcdFx0XHRhZ2dyZWdhdGlvbkhlbHBlcixcblx0XHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0KTtcblx0XHRcdGlmIChyZWxhdGVkUHJvcGVydHlOYW1lcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbHVtbkluZm8ucHJvcGVydHlJbmZvcyA9IHJlbGF0ZWRQcm9wZXJ0eU5hbWVzO1xuXHRcdFx0XHRjb2x1bW5JbmZvLmV4cG9ydFNldHRpbmdzID0ge1xuXHRcdFx0XHRcdC4uLmNvbHVtbkluZm8uZXhwb3J0U2V0dGluZ3MsXG5cdFx0XHRcdFx0dGVtcGxhdGU6IHJlbGF0ZWRQcm9wZXJ0aWVzSW5mby5leHBvcnRTZXR0aW5nc1RlbXBsYXRlLFxuXHRcdFx0XHRcdHdyYXA6IHJlbGF0ZWRQcm9wZXJ0aWVzSW5mby5leHBvcnRTZXR0aW5nc1dyYXBwaW5nXG5cdFx0XHRcdH07XG5cblx0XHRcdFx0Ly8gQ29sbGVjdCBpbmZvcm1hdGlvbiBvZiByZWxhdGVkIGNvbHVtbnMgdG8gYmUgY3JlYXRlZC5cblx0XHRcdFx0cmVsYXRlZFByb3BlcnR5TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdFx0XHRjb2x1bW5zVG9CZUNyZWF0ZWRbbmFtZV0gPSByZWxhdGVkUHJvcGVydGllc0luZm8ucHJvcGVydGllc1tuYW1lXTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChhZGRpdGlvbmFsUHJvcGVydHlOYW1lcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdGNvbHVtbkluZm8uYWRkaXRpb25hbFByb3BlcnR5SW5mb3MgPSBhZGRpdGlvbmFsUHJvcGVydHlOYW1lcztcblx0XHRcdFx0Ly8gQ3JlYXRlIGNvbHVtbnMgZm9yIGFkZGl0aW9uYWwgcHJvcGVydGllcyBpZGVudGlmaWVkIGZvciBBTFAgdXNlIGNhc2UuXG5cdFx0XHRcdGFkZGl0aW9uYWxQcm9wZXJ0eU5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG5cdFx0XHRcdFx0Ly8gSW50ZW50aW9uYWwgb3ZlcndyaXRlIGFzIHdlIHJlcXVpcmUgb25seSBvbmUgbmV3IFByb3BlcnR5SW5mbyBmb3IgYSByZWxhdGVkIFByb3BlcnR5LlxuXHRcdFx0XHRcdGNvbHVtbnNUb0JlQ3JlYXRlZFtuYW1lXSA9IHJlbGF0ZWRQcm9wZXJ0aWVzSW5mby5hZGRpdGlvbmFsUHJvcGVydGllc1tuYW1lXTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0XHR0YWJsZUNvbHVtbnMucHVzaChjb2x1bW5JbmZvKTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gdGFibGVDb2x1bW5zO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBjb2x1bW4gZGVmaW5pdGlvbiBmcm9tIGEgcHJvcGVydHkuXG4gKiBAcGFyYW0ge1Byb3BlcnR5fSBwcm9wZXJ0eSBFbnRpdHkgdHlwZSBwcm9wZXJ0eSBmb3Igd2hpY2ggdGhlIGNvbHVtbiBpcyBjcmVhdGVkXG4gKiBAcGFyYW0ge3N0cmluZ30gZnVsbFByb3BlcnR5UGF0aCBUaGUgZnVsbCBwYXRoIHRvIHRoZSB0YXJnZXQgcHJvcGVydHlcbiAqIEBwYXJhbSB7c3RyaW5nfSByZWxhdGl2ZVBhdGggVGhlIHJlbGF0aXZlIHBhdGggdG8gdGhlIHRhcmdldCBwcm9wZXJ0eSBiYXNlZCBvbiB0aGUgY29udGV4dFxuICogQHBhcmFtIHtib29sZWFufSB1c2VEYXRhRmllbGRQcmVmaXggU2hvdWxkIGJlIHByZWZpeGVkIHdpdGggXCJEYXRhRmllbGQ6OlwiLCBlbHNlIGl0IHdpbGwgYmUgcHJlZml4ZWQgd2l0aCBcIlByb3BlcnR5OjpcIlxuICogQHBhcmFtIHtib29sZWFufSBhdmFpbGFibGVGb3JBZGFwdGF0aW9uIERlY2lkZXMgd2hldGhlciBjb2x1bW4gc2hvdWxkIGJlIGF2YWlsYWJsZSBmb3IgYWRhcHRhdGlvblxuICogQHBhcmFtIHtzdHJpbmdbXX0gbm9uU29ydGFibGVDb2x1bW5zIFRoZSBhcnJheSBvZiBhbGwgbm9uIHNvcnRhYmxlIGNvbHVtbiBuYW1lc1xuICogQHBhcmFtIHtBZ2dyZWdhdGlvbkhlbHBlcn0gYWdncmVnYXRpb25IZWxwZXIgVGhlIGFnZ3JlZ2F0aW9uSGVscGVyIGZvciB0aGUgZW50aXR5XG4gKiBAcGFyYW0ge0NvbnZlcnRlckNvbnRleHR9IGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlciBjb250ZXh0XG4gKiBAcmV0dXJucyB7QW5ub3RhdGlvblRhYmxlQ29sdW1ufSBUaGUgYW5ub3RhdGlvbiBjb2x1bW4gZGVmaW5pdGlvblxuICovXG5jb25zdCBnZXRDb2x1bW5EZWZpbml0aW9uRnJvbVByb3BlcnR5ID0gZnVuY3Rpb24oXG5cdHByb3BlcnR5OiBQcm9wZXJ0eSxcblx0ZnVsbFByb3BlcnR5UGF0aDogc3RyaW5nLFxuXHRyZWxhdGl2ZVBhdGg6IHN0cmluZyxcblx0dXNlRGF0YUZpZWxkUHJlZml4OiBib29sZWFuLFxuXHRhdmFpbGFibGVGb3JBZGFwdGF0aW9uOiBib29sZWFuLFxuXHRub25Tb3J0YWJsZUNvbHVtbnM6IHN0cmluZ1tdLFxuXHRhZ2dyZWdhdGlvbkhlbHBlcjogQWdncmVnYXRpb25IZWxwZXIsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IEFubm90YXRpb25UYWJsZUNvbHVtbiB7XG5cdGNvbnN0IG5hbWUgPSB1c2VEYXRhRmllbGRQcmVmaXggPyByZWxhdGl2ZVBhdGggOiBcIlByb3BlcnR5OjpcIiArIHJlbGF0aXZlUGF0aDtcblx0Y29uc3Qga2V5ID0gKHVzZURhdGFGaWVsZFByZWZpeCA/IFwiRGF0YUZpZWxkOjpcIiA6IFwiUHJvcGVydHk6OlwiKSArIHJlcGxhY2VTcGVjaWFsQ2hhcnMocmVsYXRpdmVQYXRoKTtcblx0Y29uc3Qgc2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aCA9IGdldFNlbWFudGljT2JqZWN0UGF0aChjb252ZXJ0ZXJDb250ZXh0LCBwcm9wZXJ0eSk7XG5cdGNvbnN0IGlzSGlkZGVuID0gcHJvcGVydHkuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4/LnZhbHVlT2YoKSA9PT0gdHJ1ZTtcblx0Y29uc3QgZ3JvdXBQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBwcm9wZXJ0eS5uYW1lID8gX3NsaWNlQXRTbGFzaChwcm9wZXJ0eS5uYW1lLCB0cnVlLCBmYWxzZSkgOiB1bmRlZmluZWQ7XG5cdGNvbnN0IGlzR3JvdXA6IGJvb2xlYW4gPSBncm91cFBhdGggIT0gcHJvcGVydHkubmFtZTtcblx0Y29uc3QgaXNEYXRhUG9pbnRGYWtlUHJvcGVydHk6IGJvb2xlYW4gPSBuYW1lLmluZGV4T2YoXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YVBvaW50XCIpID4gLTE7XG5cdGNvbnN0IGV4cG9ydFNldHRpbmdzID0gaXNEYXRhUG9pbnRGYWtlUHJvcGVydHlcblx0XHQ/IHtcblx0XHRcdFx0dGVtcGxhdGU6IGdldFRhcmdldFZhbHVlT25EYXRhUG9pbnQocHJvcGVydHkpXG5cdFx0ICB9XG5cdFx0OiB1bmRlZmluZWQ7XG5cdHJldHVybiB7XG5cdFx0a2V5OiBrZXksXG5cdFx0aXNHcm91cGFibGU6ICFpc0RhdGFQb2ludEZha2VQcm9wZXJ0eSAmJiAhaXNIaWRkZW4gPyBhZ2dyZWdhdGlvbkhlbHBlci5pc1Byb3BlcnR5R3JvdXBhYmxlKHByb3BlcnR5KSA6IGZhbHNlLFxuXHRcdHR5cGU6IENvbHVtblR5cGUuQW5ub3RhdGlvbixcblx0XHRsYWJlbDogX2dldExhYmVsKHByb3BlcnR5LCBpc0dyb3VwKSxcblx0XHRncm91cExhYmVsOiBpc0dyb3VwID8gX2dldExhYmVsKHByb3BlcnR5KSA6IG51bGwsXG5cdFx0Z3JvdXA6IGlzR3JvdXAgPyBncm91cFBhdGggOiBudWxsLFxuXHRcdGFubm90YXRpb25QYXRoOiBmdWxsUHJvcGVydHlQYXRoLFxuXHRcdHNlbWFudGljT2JqZWN0UGF0aDogc2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aCxcblx0XHQvLyBBIGZha2UgcHJvcGVydHkgd2FzIGNyZWF0ZWQgZm9yIHRoZSBUYXJnZXRWYWx1ZSB1c2VkIG9uIERhdGFQb2ludHMsIHRoaXMgcHJvcGVydHkgc2hvdWxkIGJlIGhpZGRlbiBhbmQgbm9uIHNvcnRhYmxlXG5cdFx0YXZhaWxhYmlsaXR5OlxuXHRcdFx0IWF2YWlsYWJsZUZvckFkYXB0YXRpb24gfHwgaXNIaWRkZW4gfHwgaXNEYXRhUG9pbnRGYWtlUHJvcGVydHkgPyBBdmFpbGFiaWxpdHlUeXBlLkhpZGRlbiA6IEF2YWlsYWJpbGl0eVR5cGUuQWRhcHRhdGlvbixcblx0XHRuYW1lOiBuYW1lLFxuXHRcdHJlbGF0aXZlUGF0aDogaXNEYXRhUG9pbnRGYWtlUHJvcGVydHlcblx0XHRcdD8gKHByb3BlcnR5IGFzIGFueSkuYW5ub3RhdGlvbnM/LlVJPy5EYXRhRmllbGREZWZhdWx0Py5UYXJnZXQ/LiR0YXJnZXQ/LlZhbHVlPy5wYXRoIHx8IChwcm9wZXJ0eSBhcyBhbnkpLlZhbHVlLnBhdGhcblx0XHRcdDogcmVsYXRpdmVQYXRoLFxuXHRcdHNvcnRhYmxlOiAhaXNIaWRkZW4gJiYgbm9uU29ydGFibGVDb2x1bW5zLmluZGV4T2YocmVsYXRpdmVQYXRoKSA9PT0gLTEgJiYgIWlzRGF0YVBvaW50RmFrZVByb3BlcnR5LFxuXHRcdGlzS2V5OiBwcm9wZXJ0eS5pc0tleSxcblx0XHRpc0RhdGFQb2ludEZha2VUYXJnZXRQcm9wZXJ0eTogaXNEYXRhUG9pbnRGYWtlUHJvcGVydHksXG5cdFx0ZXhwb3J0U2V0dGluZ3M6IGV4cG9ydFNldHRpbmdzXG5cdH0gYXMgQW5ub3RhdGlvblRhYmxlQ29sdW1uO1xufTtcblxuLyoqXG4gKiBSZXR1cm5zIGJvb2xlYW4gdHJ1ZSBmb3IgdmFsaWQgY29sdW1ucywgZmFsc2UgZm9yIGludmFsaWQgY29sdW1ucy5cbiAqXG4gKiBAcGFyYW0ge0RhdGFGaWVsZEFic3RyYWN0VHlwZXN9IGRhdGFGaWVsZCBEaWZmZXJlbnQgRGF0YUZpZWxkIHR5cGVzIGRlZmluZWQgaW4gdGhlIGFubm90YXRpb25zXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBmb3IgdmFsaWQgY29sdW1ucywgZmFsc2UgZm9yIGludmFsaWQgY29sdW1uc1xuICogQHByaXZhdGVcbiAqL1xuY29uc3QgX2lzVmFsaWRDb2x1bW4gPSBmdW5jdGlvbihkYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpIHtcblx0c3dpdGNoIChkYXRhRmllbGQuJFR5cGUpIHtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbjpcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbjpcblx0XHRcdHJldHVybiAhIWRhdGFGaWVsZC5JbmxpbmU7XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoQWN0aW9uOlxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aEludGVudEJhc2VkTmF2aWdhdGlvbjpcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZDpcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZFdpdGhVcmw6XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBbm5vdGF0aW9uOlxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkV2l0aE5hdmlnYXRpb25QYXRoOlxuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0ZGVmYXVsdDpcblx0XHQvLyBUb2RvOiBSZXBsYWNlIHdpdGggcHJvcGVyIExvZyBzdGF0ZW1lbnQgb25jZSBhdmFpbGFibGVcblx0XHQvLyAgdGhyb3cgbmV3IEVycm9yKFwiVW5oYW5kbGVkIERhdGFGaWVsZCBBYnN0cmFjdCB0eXBlOiBcIiArIGRhdGFGaWVsZC4kVHlwZSk7XG5cdH1cbn07XG5cbi8qKlxuICogUmV0dXJucyBsYWJlbCBmb3IgcHJvcGVydHkgYW5kIGRhdGFGaWVsZC5cbiAqIEBwYXJhbSB7RGF0YUZpZWxkQWJzdHJhY3RUeXBlcyB8IFByb3BlcnR5fSBwcm9wZXJ0eSBFbnRpdHkgdHlwZSBwcm9wZXJ0eSBvciBEYXRhRmllbGQgZGVmaW5lZCBpbiB0aGUgYW5ub3RhdGlvbnNcbiAqIEBwYXJhbSBpc0dyb3VwXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBMYWJlbCBvZiB0aGUgcHJvcGVydHkgb3IgRGF0YUZpZWxkXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBfZ2V0TGFiZWwgPSBmdW5jdGlvbihwcm9wZXJ0eTogRGF0YUZpZWxkQWJzdHJhY3RUeXBlcyB8IFByb3BlcnR5LCBpc0dyb3VwOiBib29sZWFuID0gZmFsc2UpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRpZiAoIXByb3BlcnR5KSB7XG5cdFx0cmV0dXJuIHVuZGVmaW5lZDtcblx0fVxuXHRpZiAoaXNQcm9wZXJ0eShwcm9wZXJ0eSkpIHtcblx0XHRjb25zdCBkYXRhRmllbGREZWZhdWx0ID0gcHJvcGVydHkuYW5ub3RhdGlvbnM/LlVJPy5EYXRhRmllbGREZWZhdWx0O1xuXHRcdGlmIChkYXRhRmllbGREZWZhdWx0ICYmICFkYXRhRmllbGREZWZhdWx0LnF1YWxpZmllciAmJiBkYXRhRmllbGREZWZhdWx0LkxhYmVsPy52YWx1ZU9mKCkpIHtcblx0XHRcdHJldHVybiBjb21waWxlQmluZGluZyhhbm5vdGF0aW9uRXhwcmVzc2lvbihkYXRhRmllbGREZWZhdWx0LkxhYmVsPy52YWx1ZU9mKCkpKTtcblx0XHR9XG5cdFx0cmV0dXJuIGNvbXBpbGVCaW5kaW5nKGFubm90YXRpb25FeHByZXNzaW9uKHByb3BlcnR5LmFubm90YXRpb25zLkNvbW1vbj8uTGFiZWw/LnZhbHVlT2YoKSB8fCBwcm9wZXJ0eS5uYW1lKSk7XG5cdH0gZWxzZSBpZiAoaXNEYXRhRmllbGRUeXBlcyhwcm9wZXJ0eSkpIHtcblx0XHRpZiAoISFpc0dyb3VwICYmIHByb3BlcnR5LiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoSW50ZW50QmFzZWROYXZpZ2F0aW9uKSB7XG5cdFx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoYW5ub3RhdGlvbkV4cHJlc3Npb24ocHJvcGVydHkuTGFiZWw/LnZhbHVlT2YoKSkpO1xuXHRcdH1cblx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRhbm5vdGF0aW9uRXhwcmVzc2lvbihcblx0XHRcdFx0cHJvcGVydHkuTGFiZWw/LnZhbHVlT2YoKSB8fCBwcm9wZXJ0eS5WYWx1ZT8uJHRhcmdldD8uYW5ub3RhdGlvbnM/LkNvbW1vbj8uTGFiZWw/LnZhbHVlT2YoKSB8fCBwcm9wZXJ0eS5WYWx1ZT8uJHRhcmdldD8ubmFtZVxuXHRcdFx0KVxuXHRcdCk7XG5cdH0gZWxzZSBpZiAocHJvcGVydHkuJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFubm90YXRpb24pIHtcblx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRhbm5vdGF0aW9uRXhwcmVzc2lvbihcblx0XHRcdFx0cHJvcGVydHkuTGFiZWw/LnZhbHVlT2YoKSB8fCAocHJvcGVydHkuVGFyZ2V0Py4kdGFyZ2V0IGFzIERhdGFQb2ludCk/LlZhbHVlPy4kdGFyZ2V0Py5hbm5vdGF0aW9ucz8uQ29tbW9uPy5MYWJlbD8udmFsdWVPZigpXG5cdFx0XHQpXG5cdFx0KTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoYW5ub3RhdGlvbkV4cHJlc3Npb24ocHJvcGVydHkuTGFiZWw/LnZhbHVlT2YoKSkpO1xuXHR9XG59O1xuXG4vKipcbiAqIENyZWF0ZXMgYSBQcm9wZXJ0eUluZm8gZm9yIGVhY2ggaWRlbnRpZmllZCBwcm9wZXJ0eSBjb25zdW1lZCBieSBhIExpbmVJdGVtLlxuICpcbiAqIEBwYXJhbSB7UmVjb3JkPHN0cmluZywgUHJvcGVydHk+fSBjb2x1bW5zVG9CZUNyZWF0ZWQgSWRlbnRpZmllZCBwcm9wZXJ0aWVzLlxuICogQHBhcmFtIGV4aXN0aW5nQ29sdW1ucyBUaGUgbGlzdCBvZiBjb2x1bW5zIGNyZWF0ZWQgZm9yIExpbmVJdGVtcyBhbmQgUHJvcGVydGllcyBvZiBlbnRpdHlUeXBlLlxuICogQHBhcmFtIG5vblNvcnRhYmxlQ29sdW1ucyBUaGUgYXJyYXkgb2YgY29sdW1uIG5hbWVzIHdoaWNoIGNhbm5vdCBiZSBzb3J0ZWQuXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHQuXG4gKiBAcGFyYW0gZW50aXR5VHlwZSBUaGUgZW50aXR5IHR5cGUgZm9yIHRoZSBMaW5lSXRlbVxuICogQHJldHVybnMge0Fubm90YXRpb25UYWJsZUNvbHVtbltdfSBUaGUgYXJyYXkgb2YgY29sdW1ucyBjcmVhdGVkLlxuICovXG5jb25zdCBfY3JlYXRlUmVsYXRlZENvbHVtbnMgPSBmdW5jdGlvbihcblx0Y29sdW1uc1RvQmVDcmVhdGVkOiBSZWNvcmQ8c3RyaW5nLCBQcm9wZXJ0eT4sXG5cdGV4aXN0aW5nQ29sdW1uczogQW5ub3RhdGlvblRhYmxlQ29sdW1uW10sXG5cdG5vblNvcnRhYmxlQ29sdW1uczogc3RyaW5nW10sXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGVudGl0eVR5cGU6IEVudGl0eVR5cGVcbik6IEFubm90YXRpb25UYWJsZUNvbHVtbltdIHtcblx0Y29uc3QgcmVsYXRlZENvbHVtbnM6IEFubm90YXRpb25UYWJsZUNvbHVtbltdID0gW107XG5cdGNvbnN0IHJlbGF0ZWRQcm9wZXJ0eU5hbWVNYXA6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7fTtcblx0Y29uc3QgYWdncmVnYXRpb25IZWxwZXIgPSBuZXcgQWdncmVnYXRpb25IZWxwZXIoZW50aXR5VHlwZSwgY29udmVydGVyQ29udGV4dCk7XG5cblx0T2JqZWN0LmtleXMoY29sdW1uc1RvQmVDcmVhdGVkKS5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdGNvbnN0IHByb3BlcnR5ID0gY29sdW1uc1RvQmVDcmVhdGVkW25hbWVdLFxuXHRcdFx0YW5ub3RhdGlvblBhdGggPSBjb252ZXJ0ZXJDb250ZXh0LmdldEFic29sdXRlQW5ub3RhdGlvblBhdGgobmFtZSksXG5cdFx0XHQvLyBDaGVjayB3aGV0aGVyIHRoZSByZWxhdGVkIGNvbHVtbiBhbHJlYWR5IGV4aXN0cy5cblx0XHRcdHJlbGF0ZWRDb2x1bW4gPSBleGlzdGluZ0NvbHVtbnMuZmluZChjb2x1bW4gPT4gY29sdW1uLm5hbWUgPT09IG5hbWUpO1xuXHRcdGlmIChyZWxhdGVkQ29sdW1uID09PSB1bmRlZmluZWQpIHtcblx0XHRcdC8vIENhc2UgMTogS2V5IGNvbnRhaW5zIERhdGFGaWVsZCBwcmVmaXggdG8gZW5zdXJlIGFsbCBwcm9wZXJ0eSBjb2x1bW5zIGhhdmUgdGhlIHNhbWUga2V5IGZvcm1hdC5cblx0XHRcdC8vIE5ldyBjcmVhdGVkIHByb3BlcnR5IGNvbHVtbiBpcyBzZXQgdG8gaGlkZGVuLlxuXHRcdFx0cmVsYXRlZENvbHVtbnMucHVzaChcblx0XHRcdFx0Z2V0Q29sdW1uRGVmaW5pdGlvbkZyb21Qcm9wZXJ0eShcblx0XHRcdFx0XHRwcm9wZXJ0eSxcblx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aCxcblx0XHRcdFx0XHRuYW1lLFxuXHRcdFx0XHRcdHRydWUsXG5cdFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0bm9uU29ydGFibGVDb2x1bW5zLFxuXHRcdFx0XHRcdGFnZ3JlZ2F0aW9uSGVscGVyLFxuXHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0cmVsYXRlZENvbHVtbi5hbm5vdGF0aW9uUGF0aCAhPT0gYW5ub3RhdGlvblBhdGggfHxcblx0XHRcdChyZWxhdGVkQ29sdW1uLnByb3BlcnR5SW5mb3MgJiYgcmVsYXRlZENvbHVtbi5wcm9wZXJ0eUluZm9zLmluZGV4T2YobmFtZSkgIT09IC0xKVxuXHRcdCkge1xuXHRcdFx0Ly8gQ2FzZSAyOiBUaGUgZXhpc3RpbmcgY29sdW1uIHBvaW50cyB0byBhIExpbmVJdGVtIChvcilcblx0XHRcdC8vIENhc2UgMzogVGhpcyBpcyBhIHNlbGYgcmVmZXJlbmNlIGZyb20gYW4gZXhpc3RpbmcgY29sdW1uIGFuZFxuXHRcdFx0Ly8gYm90aCBjYXNlcyByZXF1aXJlIGEgZHVtbXkgUHJvcGVydHlJbmZvIGZvciBzZXR0aW5nIGNvcnJlY3QgZXhwb3J0IHNldHRpbmdzLlxuXG5cdFx0XHRjb25zdCBuZXdOYW1lID0gXCJQcm9wZXJ0eTo6XCIgKyBuYW1lO1xuXG5cdFx0XHQvLyBDaGVja2luZyB3aGV0aGVyIHRoZSByZWxhdGVkIHByb3BlcnR5IGNvbHVtbiBoYXMgYWxyZWFkeSBiZWVuIGNyZWF0ZWQgaW4gYSBwcmV2aW91cyBpdGVyYXRpb24uXG5cdFx0XHRpZiAoIWV4aXN0aW5nQ29sdW1ucy5zb21lKGNvbHVtbiA9PiBjb2x1bW4ubmFtZSA9PT0gbmV3TmFtZSkpIHtcblx0XHRcdFx0Ly8gQ3JlYXRlIGEgbmV3IHByb3BlcnR5IGNvbHVtbiB3aXRoICdQcm9wZXJ0eTo6JyBwcmVmaXgsXG5cdFx0XHRcdC8vIFNldCBpdCB0byBoaWRkZW4gYXMgaXQgaXMgb25seSBjb25zdW1lZCBieSBDb21wbGV4IHByb3BlcnR5IGluZm9zLlxuXHRcdFx0XHRyZWxhdGVkQ29sdW1ucy5wdXNoKFxuXHRcdFx0XHRcdGdldENvbHVtbkRlZmluaXRpb25Gcm9tUHJvcGVydHkoXG5cdFx0XHRcdFx0XHRwcm9wZXJ0eSxcblx0XHRcdFx0XHRcdGFubm90YXRpb25QYXRoLFxuXHRcdFx0XHRcdFx0bmFtZSxcblx0XHRcdFx0XHRcdGZhbHNlLFxuXHRcdFx0XHRcdFx0ZmFsc2UsXG5cdFx0XHRcdFx0XHRub25Tb3J0YWJsZUNvbHVtbnMsXG5cdFx0XHRcdFx0XHRhZ2dyZWdhdGlvbkhlbHBlcixcblx0XHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHJlbGF0ZWRQcm9wZXJ0eU5hbWVNYXBbbmFtZV0gPSBuZXdOYW1lO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cblx0Ly8gVGhlIHByb3BlcnR5ICduYW1lJyBoYXMgYmVlbiBwcmVmaXhlZCB3aXRoICdQcm9wZXJ0eTo6JyBmb3IgdW5pcXVlbmVzcy5cblx0Ly8gVXBkYXRlIHRoZSBzYW1lIGluIG90aGVyIHByb3BlcnR5SW5mb3NbXSByZWZlcmVuY2VzIHdoaWNoIHBvaW50IHRvIHRoaXMgcHJvcGVydHkuXG5cdGV4aXN0aW5nQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG5cdFx0Y29sdW1uLnByb3BlcnR5SW5mb3MgPSBjb2x1bW4ucHJvcGVydHlJbmZvcz8ubWFwKHByb3BlcnR5SW5mbyA9PiByZWxhdGVkUHJvcGVydHlOYW1lTWFwW3Byb3BlcnR5SW5mb10gPz8gcHJvcGVydHlJbmZvKTtcblx0XHRjb2x1bW4uYWRkaXRpb25hbFByb3BlcnR5SW5mb3MgPSBjb2x1bW4uYWRkaXRpb25hbFByb3BlcnR5SW5mb3M/Lm1hcChcblx0XHRcdHByb3BlcnR5SW5mbyA9PiByZWxhdGVkUHJvcGVydHlOYW1lTWFwW3Byb3BlcnR5SW5mb10gPz8gcHJvcGVydHlJbmZvXG5cdFx0KTtcblx0fSk7XG5cblx0cmV0dXJuIHJlbGF0ZWRDb2x1bW5zO1xufTtcblxuLyoqXG4gKiBHZXR0aW5nIHRoZSBDb2x1bW4gTmFtZVxuICogSWYgaXQgcG9pbnRzIHRvIGEgRGF0YUZpZWxkIHdpdGggb25lIHByb3BlcnR5IG9yIERhdGFQb2ludCB3aXRoIG9uZSBwcm9wZXJ0eSwgaXQgd2lsbCB1c2UgdGhlIHByb3BlcnR5IG5hbWVcbiAqIGhlcmUgdG8gYmUgY29uc2lzdGVudCB3aXRoIHRoZSBleGlzdGluZyBmbGV4IGNoYW5nZXMuXG4gKlxuICogQHBhcmFtIHtEYXRhRmllbGRBYnN0cmFjdFR5cGVzfSBkYXRhRmllbGQgRGlmZmVyZW50IERhdGFGaWVsZCB0eXBlcyBkZWZpbmVkIGluIHRoZSBhbm5vdGF0aW9uc1xuICogQHJldHVybnMge3N0cmluZ30gVGhlIG5hbWUgb2YgYW5ub3RhdGlvbiBjb2x1bW5zXG4gKiBAcHJpdmF0ZVxuICovXG5jb25zdCBfZ2V0QW5ub3RhdGlvbkNvbHVtbk5hbWUgPSBmdW5jdGlvbihkYXRhRmllbGQ6IERhdGFGaWVsZEFic3RyYWN0VHlwZXMpIHtcblx0Ly8gVGhpcyBpcyBuZWVkZWQgYXMgd2UgaGF2ZSBmbGV4aWJpbGl0eSBjaGFuZ2VzIGFscmVhZHkgdGhhdCB3ZSBoYXZlIHRvIGNoZWNrIGFnYWluc3Rcblx0aWYgKGlzRGF0YUZpZWxkVHlwZXMoZGF0YUZpZWxkKSkge1xuXHRcdHJldHVybiBkYXRhRmllbGQuVmFsdWU/LnBhdGg7XG5cdH0gZWxzZSBpZiAoZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBbm5vdGF0aW9uICYmIChkYXRhRmllbGQuVGFyZ2V0Py4kdGFyZ2V0IGFzIERhdGFQb2ludCk/LlZhbHVlPy5wYXRoKSB7XG5cdFx0Ly8gVGhpcyBpcyBmb3IgcmVtb3ZpbmcgZHVwbGljYXRlIHByb3BlcnRpZXMuIEZvciBleGFtcGxlLCAnUHJvZ3Jlc3MnIFByb3BlcnR5IGlzIHJlbW92ZWQgaWYgaXQgaXMgYWxyZWFkeSBkZWZpbmVkIGFzIGEgRGF0YVBvaW50XG5cdFx0cmV0dXJuIChkYXRhRmllbGQuVGFyZ2V0Py4kdGFyZ2V0IGFzIERhdGFQb2ludCk/LlZhbHVlLnBhdGg7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQoZGF0YUZpZWxkKTtcblx0fVxufTtcblxuLyoqXG4gKiBEZXRlcm1pbmVzIHRoZSByZWxhdGl2ZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB3aXRoIHJlc3BlY3QgdG8gdGhlIHJvb3QgZW50aXR5LlxuICogQHBhcmFtIGRhdGFGaWVsZCBUaGUgYERhdGFGaWVsZGAgYmVpbmcgcHJvY2Vzc2VkLlxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHJlbGF0aXZlIHBhdGhcbiAqL1xuY29uc3QgX2dldFJlbGF0aXZlUGF0aCA9IGZ1bmN0aW9uKGRhdGFGaWVsZDogRGF0YUZpZWxkQWJzdHJhY3RUeXBlcyk6IHN0cmluZyB7XG5cdGxldCByZWxhdGl2ZVBhdGg6IHN0cmluZyA9IFwiXCI7XG5cblx0c3dpdGNoIChkYXRhRmllbGQuJFR5cGUpIHtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZDpcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZFdpdGhOYXZpZ2F0aW9uUGF0aDpcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZFdpdGhVcmw6XG5cdFx0XHRyZWxhdGl2ZVBhdGggPSAoZGF0YUZpZWxkIGFzIERhdGFGaWVsZCk/LlZhbHVlPy5wYXRoO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFubm90YXRpb246XG5cdFx0XHRyZWxhdGl2ZVBhdGggPSAoZGF0YUZpZWxkIGFzIERhdGFGaWVsZEZvckFubm90YXRpb24pPy5UYXJnZXQ/LnZhbHVlO1xuXHRcdFx0YnJlYWs7XG5cblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbjpcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbjpcblx0XHRcdHJlbGF0aXZlUGF0aCA9IEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQoZGF0YUZpZWxkKTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIHJlbGF0aXZlUGF0aDtcbn07XG5cbmNvbnN0IF9zbGljZUF0U2xhc2ggPSBmdW5jdGlvbihwYXRoOiBzdHJpbmcsIGlzTGFzdFNsYXNoOiBib29sZWFuLCBpc0xhc3RQYXJ0OiBib29sZWFuKSB7XG5cdGNvbnN0IGlTbGFzaEluZGV4ID0gaXNMYXN0U2xhc2ggPyBwYXRoLmxhc3RJbmRleE9mKFwiL1wiKSA6IHBhdGguaW5kZXhPZihcIi9cIik7XG5cblx0aWYgKGlTbGFzaEluZGV4ID09PSAtMSkge1xuXHRcdHJldHVybiBwYXRoO1xuXHR9XG5cdHJldHVybiBpc0xhc3RQYXJ0ID8gcGF0aC5zdWJzdHJpbmcoaVNsYXNoSW5kZXggKyAxLCBwYXRoLmxlbmd0aCkgOiBwYXRoLnN1YnN0cmluZygwLCBpU2xhc2hJbmRleCk7XG59O1xuXG4vKipcbiAqIERldGVybWluZSB3aGV0aGVyIGEgY29sdW1uIGlzIHNvcnRhYmxlLlxuICpcbiAqIEBwYXJhbSBkYXRhRmllbGQgVGhlIGRhdGEgZmllbGQgYmVpbmcgcHJvY2Vzc2VkXG4gKiBAcGFyYW0gcHJvcGVydHlQYXRoIFRoZSBwcm9wZXJ0eSBwYXRoXG4gKiBAcGFyYW0gbm9uU29ydGFibGVDb2x1bW5zIENvbGxlY3Rpb24gb2Ygbm9uLXNvcnRhYmxlIGNvbHVtbiBuYW1lcyBhcyBwZXIgYW5ub3RhdGlvblxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdGhlIGNvbHVtbiBpcyBzb3J0YWJsZVxuICovXG5jb25zdCBfaXNDb2x1bW5Tb3J0YWJsZSA9IGZ1bmN0aW9uKGRhdGFGaWVsZDogRGF0YUZpZWxkQWJzdHJhY3RUeXBlcywgcHJvcGVydHlQYXRoOiBzdHJpbmcsIG5vblNvcnRhYmxlQ29sdW1uczogc3RyaW5nW10pOiBib29sZWFuIHtcblx0bGV0IGlzU29ydGFibGU6IGJvb2xlYW4gPSBmYWxzZTtcblx0aWYgKG5vblNvcnRhYmxlQ29sdW1ucy5pbmRleE9mKHByb3BlcnR5UGF0aCkgPT09IC0xKSB7XG5cdFx0Ly8gQ29sdW1uIGlzIG5vdCBtYXJrZWQgYXMgbm9uLXNvcnRhYmxlIHZpYSBhbm5vdGF0aW9uXG5cdFx0c3dpdGNoIChkYXRhRmllbGQuJFR5cGUpIHtcblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkOlxuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoVXJsOlxuXHRcdFx0XHRpc1NvcnRhYmxlID0gdHJ1ZTtcblx0XHRcdFx0YnJlYWs7XG5cblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uOlxuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBY3Rpb246XG5cdFx0XHRcdC8vIEFjdGlvbiBjb2x1bW5zIGFyZSBub3Qgc29ydGFibGVcblx0XHRcdFx0aXNTb3J0YWJsZSA9IGZhbHNlO1xuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdH1cblx0cmV0dXJuIGlzU29ydGFibGU7XG59O1xuXG4vKipcbiAqIFJldHVybnMgZGVmYXVsdCBmb3JtYXQgb3B0aW9ucyBmb3IgdGV4dCBmaWVsZHMgaW4gYSB0YWJsZS5cbiAqXG4gKiBAcmV0dXJucyB7Rm9ybWF0T3B0aW9uc1R5cGV9IENvbGxlY3Rpb24gb2YgZm9ybWF0IG9wdGlvbnMgd2l0aCBkZWZhdWx0IHZhbHVlc1xuICovXG5mdW5jdGlvbiBnZXREZWZhdWx0Rm9ybWF0T3B0aW9uc0ZvclRhYmxlKCk6IEZvcm1hdE9wdGlvbnNUeXBlIHtcblx0cmV0dXJuIHtcblx0XHR0ZXh0TGluZXNEaXNwbGF5OiA0LFxuXHRcdHRleHRMaW5lc0VkaXQ6IDRcblx0fTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIGxpbmUgaXRlbXMgZnJvbSBtZXRhZGF0YSBhbm5vdGF0aW9ucy5cbiAqXG4gKiBAcGFyYW0ge0xpbmVJdGVtfSBsaW5lSXRlbUFubm90YXRpb24gQ29sbGVjdGlvbiBvZiBkYXRhIGZpZWxkcyB3aXRoIHRoZWlyIGFubm90YXRpb25zXG4gKiBAcGFyYW0ge3N0cmluZ30gdmlzdWFsaXphdGlvblBhdGggVGhlIHZpc3VhbGl6YXRpb24gcGF0aFxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHJldHVybnMge1RhYmxlQ29sdW1uW119IFRoZSBjb2x1bW5zIGZyb20gdGhlIGFubm90YXRpb25zXG4gKi9cbmNvbnN0IGdldENvbHVtbnNGcm9tQW5ub3RhdGlvbnMgPSBmdW5jdGlvbihcblx0bGluZUl0ZW1Bbm5vdGF0aW9uOiBMaW5lSXRlbSxcblx0dmlzdWFsaXphdGlvblBhdGg6IHN0cmluZyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dFxuKTogVGFibGVDb2x1bW5bXSB7XG5cdGNvbnN0IGVudGl0eVR5cGUgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEFubm90YXRpb25FbnRpdHlUeXBlKGxpbmVJdGVtQW5ub3RhdGlvbiksXG5cdFx0YW5ub3RhdGlvbkNvbHVtbnM6IEFubm90YXRpb25UYWJsZUNvbHVtbltdID0gW10sXG5cdFx0Y29sdW1uc1RvQmVDcmVhdGVkOiBSZWNvcmQ8c3RyaW5nLCBQcm9wZXJ0eT4gPSB7fSxcblx0XHRub25Tb3J0YWJsZUNvbHVtbnM6IHN0cmluZ1tdID1cblx0XHRcdChjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldCgpPy5hbm5vdGF0aW9ucz8uQ2FwYWJpbGl0aWVzPy5Tb3J0UmVzdHJpY3Rpb25zXG5cdFx0XHRcdD8uTm9uU29ydGFibGVQcm9wZXJ0aWVzIGFzIEVkbS5Qcm9wZXJ0eVBhdGhbXSk/Lm1hcCgocHJvcGVydHk6IFByb3BlcnR5UGF0aCkgPT4gcHJvcGVydHkudmFsdWUpID8/IFtdLFxuXHRcdHRhYmxlTWFuaWZlc3RTZXR0aW5nczogVGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24gPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpLFxuXHRcdHRhYmxlVHlwZTogVGFibGVUeXBlID0gdGFibGVNYW5pZmVzdFNldHRpbmdzPy50YWJsZVNldHRpbmdzPy50eXBlIHx8IFwiUmVzcG9uc2l2ZVRhYmxlXCI7XG5cblx0aWYgKGxpbmVJdGVtQW5ub3RhdGlvbikge1xuXHRcdC8vIEdldCBjb2x1bW5zIGZyb20gdGhlIExpbmVJdGVtIEFubm90YXRpb25cblx0XHRsaW5lSXRlbUFubm90YXRpb24uZm9yRWFjaChsaW5lSXRlbSA9PiB7XG5cdFx0XHRpZiAoIV9pc1ZhbGlkQ29sdW1uKGxpbmVJdGVtKSkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBzZW1hbnRpY09iamVjdEFubm90YXRpb25QYXRoID1cblx0XHRcdFx0aXNEYXRhRmllbGRUeXBlcyhsaW5lSXRlbSkgJiYgbGluZUl0ZW0uVmFsdWU/LiR0YXJnZXQ/LmZ1bGx5UXVhbGlmaWVkTmFtZVxuXHRcdFx0XHRcdD8gZ2V0U2VtYW50aWNPYmplY3RQYXRoKGNvbnZlcnRlckNvbnRleHQsIGxpbmVJdGVtKVxuXHRcdFx0XHRcdDogdW5kZWZpbmVkO1xuXHRcdFx0Y29uc3QgcmVsYXRpdmVQYXRoID0gX2dldFJlbGF0aXZlUGF0aChsaW5lSXRlbSk7XG5cdFx0XHQvLyBEZXRlcm1pbmUgcHJvcGVydGllcyB3aGljaCBhcmUgY29uc3VtZWQgYnkgdGhpcyBMaW5lSXRlbS5cblx0XHRcdGNvbnN0IHJlbGF0ZWRQcm9wZXJ0aWVzSW5mbzogQ29tcGxleFByb3BlcnR5SW5mbyA9IGNvbGxlY3RSZWxhdGVkUHJvcGVydGllc1JlY3Vyc2l2ZWx5KGxpbmVJdGVtLCBjb252ZXJ0ZXJDb250ZXh0LCB0YWJsZVR5cGUpO1xuXHRcdFx0Y29uc3QgcmVsYXRlZFByb3BlcnR5TmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMocmVsYXRlZFByb3BlcnRpZXNJbmZvLnByb3BlcnRpZXMpO1xuXHRcdFx0Y29uc3QgYWRkaXRpb25hbFByb3BlcnR5TmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMocmVsYXRlZFByb3BlcnRpZXNJbmZvLmFkZGl0aW9uYWxQcm9wZXJ0aWVzKTtcblx0XHRcdGNvbnN0IGdyb3VwUGF0aDogc3RyaW5nID0gX3NsaWNlQXRTbGFzaChyZWxhdGl2ZVBhdGgsIHRydWUsIGZhbHNlKTtcblx0XHRcdGNvbnN0IGlzR3JvdXA6IGJvb2xlYW4gPSBncm91cFBhdGggIT0gcmVsYXRpdmVQYXRoO1xuXHRcdFx0Y29uc3Qgc0xhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBfZ2V0TGFiZWwobGluZUl0ZW0sIGlzR3JvdXApO1xuXHRcdFx0Y29uc3QgbmFtZSA9IF9nZXRBbm5vdGF0aW9uQ29sdW1uTmFtZShsaW5lSXRlbSk7XG5cdFx0XHRhbm5vdGF0aW9uQ29sdW1ucy5wdXNoKHtcblx0XHRcdFx0a2V5OiBLZXlIZWxwZXIuZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkKGxpbmVJdGVtKSxcblx0XHRcdFx0dHlwZTogQ29sdW1uVHlwZS5Bbm5vdGF0aW9uLFxuXHRcdFx0XHRsYWJlbDogc0xhYmVsLFxuXHRcdFx0XHRncm91cExhYmVsOiBpc0dyb3VwID8gX2dldExhYmVsKGxpbmVJdGVtKSA6IG51bGwsXG5cdFx0XHRcdGdyb3VwOiBpc0dyb3VwID8gZ3JvdXBQYXRoIDogbnVsbCxcblx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChsaW5lSXRlbS5mdWxseVF1YWxpZmllZE5hbWUpLFxuXHRcdFx0XHRzZW1hbnRpY09iamVjdFBhdGg6IHNlbWFudGljT2JqZWN0QW5ub3RhdGlvblBhdGgsXG5cdFx0XHRcdGF2YWlsYWJpbGl0eTogaXNEYXRhRmllbGRBbHdheXNIaWRkZW4obGluZUl0ZW0pID8gQXZhaWxhYmlsaXR5VHlwZS5IaWRkZW4gOiBBdmFpbGFiaWxpdHlUeXBlLkRlZmF1bHQsXG5cdFx0XHRcdG5hbWU6IG5hbWUsXG5cdFx0XHRcdHJlbGF0aXZlUGF0aDogcmVsYXRpdmVQYXRoLFxuXHRcdFx0XHRzb3J0YWJsZTogX2lzQ29sdW1uU29ydGFibGUobGluZUl0ZW0sIHJlbGF0aXZlUGF0aCwgbm9uU29ydGFibGVDb2x1bW5zKSxcblx0XHRcdFx0cHJvcGVydHlJbmZvczogcmVsYXRlZFByb3BlcnR5TmFtZXMubGVuZ3RoID4gMCA/IHJlbGF0ZWRQcm9wZXJ0eU5hbWVzIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRhZGRpdGlvbmFsUHJvcGVydHlJbmZvczogYWRkaXRpb25hbFByb3BlcnR5TmFtZXMubGVuZ3RoID4gMCA/IGFkZGl0aW9uYWxQcm9wZXJ0eU5hbWVzIDogdW5kZWZpbmVkLFxuXHRcdFx0XHRleHBvcnRTZXR0aW5nczoge1xuXHRcdFx0XHRcdHRlbXBsYXRlOiByZWxhdGVkUHJvcGVydGllc0luZm8uZXhwb3J0U2V0dGluZ3NUZW1wbGF0ZSxcblx0XHRcdFx0XHR3cmFwOiByZWxhdGVkUHJvcGVydGllc0luZm8uZXhwb3J0U2V0dGluZ3NXcmFwcGluZ1xuXHRcdFx0XHR9LFxuXHRcdFx0XHR3aWR0aDogbGluZUl0ZW0uYW5ub3RhdGlvbnM/LkhUTUw1Py5Dc3NEZWZhdWx0cz8ud2lkdGggfHwgdW5kZWZpbmVkLFxuXHRcdFx0XHRpc05hdmlnYWJsZTogdHJ1ZSxcblx0XHRcdFx0Zm9ybWF0T3B0aW9uczogZ2V0RGVmYXVsdEZvcm1hdE9wdGlvbnNGb3JUYWJsZSgpLFxuXHRcdFx0XHRleHBvcnRDb250YWN0UHJvcGVydHk6IHJlbGF0ZWRQcm9wZXJ0aWVzSW5mby5leHBvcnRTZXR0aW5nc0NvbnRhY3RQcm9wZXJ0eVxuXHRcdFx0fSBhcyBBbm5vdGF0aW9uVGFibGVDb2x1bW4pO1xuXG5cdFx0XHQvLyBDb2xsZWN0IGluZm9ybWF0aW9uIG9mIHJlbGF0ZWQgY29sdW1ucyB0byBiZSBjcmVhdGVkLlxuXHRcdFx0cmVsYXRlZFByb3BlcnR5TmFtZXMuZm9yRWFjaChuYW1lID0+IHtcblx0XHRcdFx0Y29sdW1uc1RvQmVDcmVhdGVkW25hbWVdID0gcmVsYXRlZFByb3BlcnRpZXNJbmZvLnByb3BlcnRpZXNbbmFtZV07XG5cdFx0XHR9KTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGNvbHVtbnMgZm9yIGFkZGl0aW9uYWwgcHJvcGVydGllcyBpZGVudGlmaWVkIGZvciBBTFAgdXNlIGNhc2UuXG5cdFx0XHRhZGRpdGlvbmFsUHJvcGVydHlOYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xuXHRcdFx0XHQvLyBJbnRlbnRpb25hbCBvdmVyd3JpdGUgYXMgd2UgcmVxdWlyZSBvbmx5IG9uZSBuZXcgUHJvcGVydHlJbmZvIGZvciBhIHJlbGF0ZWQgUHJvcGVydHkuXG5cdFx0XHRcdGNvbHVtbnNUb0JlQ3JlYXRlZFtuYW1lXSA9IHJlbGF0ZWRQcm9wZXJ0aWVzSW5mby5hZGRpdGlvbmFsUHJvcGVydGllc1tuYW1lXTtcblx0XHRcdH0pO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gR2V0IGNvbHVtbnMgZnJvbSB0aGUgUHJvcGVydGllcyBvZiBFbnRpdHlUeXBlXG5cdGxldCB0YWJsZUNvbHVtbnMgPSBnZXRDb2x1bW5zRnJvbUVudGl0eVR5cGUoXG5cdFx0Y29sdW1uc1RvQmVDcmVhdGVkLFxuXHRcdGVudGl0eVR5cGUsXG5cdFx0YW5ub3RhdGlvbkNvbHVtbnMsXG5cdFx0bm9uU29ydGFibGVDb2x1bW5zLFxuXHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0dGFibGVUeXBlXG5cdCk7XG5cdHRhYmxlQ29sdW1ucyA9IHRhYmxlQ29sdW1ucy5jb25jYXQoYW5ub3RhdGlvbkNvbHVtbnMpO1xuXG5cdC8vIENyZWF0ZSBhIHByb3BlcnR5SW5mbyBmb3IgZWFjaCByZWxhdGVkIHByb3BlcnR5LlxuXHRjb25zdCByZWxhdGVkQ29sdW1ucyA9IF9jcmVhdGVSZWxhdGVkQ29sdW1ucyhjb2x1bW5zVG9CZUNyZWF0ZWQsIHRhYmxlQ29sdW1ucywgbm9uU29ydGFibGVDb2x1bW5zLCBjb252ZXJ0ZXJDb250ZXh0LCBlbnRpdHlUeXBlKTtcblx0dGFibGVDb2x1bW5zID0gdGFibGVDb2x1bW5zLmNvbmNhdChyZWxhdGVkQ29sdW1ucyk7XG5cblx0cmV0dXJuIHRhYmxlQ29sdW1ucztcbn07XG5cbi8qKlxuICogR2V0cyB0aGUgcHJvcGVydHkgbmFtZXMgZnJvbSB0aGUgbWFuaWZlc3QgYW5kIGNoZWNrcyBhZ2FpbnN0IGV4aXN0aW5nIHByb3BlcnRpZXMgYWxyZWFkeSBhZGRlZCBieSBhbm5vdGF0aW9ucy5cbiAqIElmIGEgbm90IHlldCBzdG9yZWQgcHJvcGVydHkgaXMgZm91bmQgaXQgYWRkcyBpdCBmb3Igc29ydGluZyBhbmQgZmlsdGVyaW5nIG9ubHkgdG8gdGhlIGFubm90YXRpb25Db2x1bW5zLlxuICogQHBhcmFtIHtzdHJpbmdbXSB8IHVuZGVmaW5lZH0gcHJvcGVydGllc1xuICogQHBhcmFtIHtBbm5vdGF0aW9uVGFibGVDb2x1bW5bXX0gYW5ub3RhdGlvbkNvbHVtbnNcbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dFxuICogQHBhcmFtIGVudGl0eVR5cGVcbiAqIEByZXR1cm5zIHtzdHJpbmdbXX0gVGhlIGNvbHVtbnMgZnJvbSB0aGUgYW5ub3RhdGlvbnNcbiAqL1xuY29uc3QgX2dldFByb3BlcnR5TmFtZXMgPSBmdW5jdGlvbihcblx0cHJvcGVydGllczogc3RyaW5nW10gfCB1bmRlZmluZWQsXG5cdGFubm90YXRpb25Db2x1bW5zOiBBbm5vdGF0aW9uVGFibGVDb2x1bW5bXSxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0ZW50aXR5VHlwZTogRW50aXR5VHlwZVxuKTogc3RyaW5nW10gfCB1bmRlZmluZWQge1xuXHRsZXQgbWF0Y2hlZFByb3BlcnRpZXM6IHN0cmluZ1tdIHwgdW5kZWZpbmVkO1xuXHRpZiAocHJvcGVydGllcykge1xuXHRcdG1hdGNoZWRQcm9wZXJ0aWVzID0gcHJvcGVydGllcy5tYXAoZnVuY3Rpb24ocHJvcGVydHlQYXRoKSB7XG5cdFx0XHRjb25zdCBhbm5vdGF0aW9uQ29sdW1uID0gYW5ub3RhdGlvbkNvbHVtbnMuZmluZChmdW5jdGlvbihhbm5vdGF0aW9uQ29sdW1uKSB7XG5cdFx0XHRcdHJldHVybiBhbm5vdGF0aW9uQ29sdW1uLnJlbGF0aXZlUGF0aCA9PT0gcHJvcGVydHlQYXRoICYmIGFubm90YXRpb25Db2x1bW4ucHJvcGVydHlJbmZvcyA9PT0gdW5kZWZpbmVkO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoYW5ub3RhdGlvbkNvbHVtbikge1xuXHRcdFx0XHRyZXR1cm4gYW5ub3RhdGlvbkNvbHVtbi5uYW1lO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgcmVsYXRlZENvbHVtbnMgPSBfY3JlYXRlUmVsYXRlZENvbHVtbnMoXG5cdFx0XHRcdFx0eyBbcHJvcGVydHlQYXRoXTogZW50aXR5VHlwZS5yZXNvbHZlUGF0aChwcm9wZXJ0eVBhdGgpIH0sXG5cdFx0XHRcdFx0YW5ub3RhdGlvbkNvbHVtbnMsXG5cdFx0XHRcdFx0W10sXG5cdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRcdFx0XHRlbnRpdHlUeXBlXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGFubm90YXRpb25Db2x1bW5zLnB1c2gocmVsYXRlZENvbHVtbnNbMF0pO1xuXHRcdFx0XHRyZXR1cm4gcmVsYXRlZENvbHVtbnNbMF0ubmFtZTtcblx0XHRcdH1cblx0XHR9KTtcblx0fVxuXG5cdHJldHVybiBtYXRjaGVkUHJvcGVydGllcztcbn07XG5cbmNvbnN0IF9hcHBlbmRDdXN0b21UZW1wbGF0ZSA9IGZ1bmN0aW9uKHByb3BlcnRpZXM6IHN0cmluZ1tdKTogc3RyaW5nIHtcblx0cmV0dXJuIHByb3BlcnRpZXNcblx0XHQubWFwKHByb3BlcnR5ID0+IHtcblx0XHRcdHJldHVybiBgeyR7cHJvcGVydGllcy5pbmRleE9mKHByb3BlcnR5KX19YDtcblx0XHR9KVxuXHRcdC5qb2luKGAke1wiXFxuXCJ9YCk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgdGFibGUgY29sdW1uIHByb3BlcnR5IHZhbHVlIGJhc2VkIG9uIGNlcnRhaW4gY29uZGl0aW9ucy5cbiAqXG4gKiBNYW5pZmVzdCBkZWZpbmVkIHByb3BlcnR5IHZhbHVlIGZvciBjdXN0b20gLyBhbm5vdGF0aW9uIGNvbHVtbnNcbiAqIERlZmF1bHQgcHJvcGVydHkgdmFsdWUgZm9yIGN1c3RvbSBjb2x1bW4gaWYgbm90IG92ZXJ3cml0dGVuIGluIG1hbmlmZXN0LlxuICpcbiAqIEBwYXJhbSB7YW55fSBwcm9wZXJ0eSBUaGUgY29sdW1uIHByb3BlcnR5IGRlZmluZWQgaW4gdGhlIG1hbmlmZXN0XG4gKiBAcGFyYW0ge2FueX0gZGVmYXVsdFZhbHVlIFRoZSBkZWZhdWx0IHZhbHVlIG9mIHRoZSBwcm9wZXJ0eVxuICogQHBhcmFtIHtib29sZWFufSBpc0Fubm90YXRpb25Db2x1bW4gV2hldGhlciB0aGUgY29sdW1uLCBkZWZpbmVkIGluIG1hbmlmZXN0LCBjb3JyZXNwb25kcyB0byBhbiBleGlzdGluZyBhbm5vdGF0aW9uIGNvbHVtbi5cbiAqIEByZXR1cm5zIHthbnl9IERldGVybWluZWQgcHJvcGVydHkgdmFsdWUgZm9yIHRoZSBjb2x1bW5cbiAqL1xuY29uc3QgX2dldE1hbmlmZXN0T3JEZWZhdWx0VmFsdWUgPSBmdW5jdGlvbihwcm9wZXJ0eTogYW55LCBkZWZhdWx0VmFsdWU6IGFueSwgaXNBbm5vdGF0aW9uQ29sdW1uOiBib29sZWFuKTogYW55IHtcblx0aWYgKHByb3BlcnR5ID09PSB1bmRlZmluZWQpIHtcblx0XHQvLyBJZiBhbm5vdGF0aW9uIGNvbHVtbiBoYXMgbm8gcHJvcGVydHkgZGVmaW5lZCBpbiBtYW5pZmVzdCxcblx0XHQvLyBkbyBub3Qgb3ZlcndyaXRlIGl0IHdpdGggbWFuaWZlc3QgY29sdW1uJ3MgZGVmYXVsdCB2YWx1ZS5cblx0XHRyZXR1cm4gaXNBbm5vdGF0aW9uQ29sdW1uID8gdW5kZWZpbmVkIDogZGVmYXVsdFZhbHVlO1xuXHR9XG5cdC8vIFJldHVybiB3aGF0IGlzIGRlZmluZWQgaW4gbWFuaWZlc3QuXG5cdHJldHVybiBwcm9wZXJ0eTtcbn07XG5cbi8qKlxuICogUmV0dXJucyB0YWJsZSBjb2x1bW4gZGVmaW5pdGlvbnMgZnJvbSBtYW5pZmVzdC5cbiAqIEBwYXJhbSBjb2x1bW5zXG4gKiBAcGFyYW0gYW5ub3RhdGlvbkNvbHVtbnNcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0XG4gKiBAcGFyYW0gZW50aXR5VHlwZVxuICogQHBhcmFtIG5hdmlnYXRpb25TZXR0aW5nc1xuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIEN1c3RvbUNvbHVtbj59IFRoZSBjb2x1bW5zIGZyb20gdGhlIG1hbmlmZXN0XG4gKi9cbmNvbnN0IGdldENvbHVtbnNGcm9tTWFuaWZlc3QgPSBmdW5jdGlvbihcblx0Y29sdW1uczogUmVjb3JkPHN0cmluZywgTWFuaWZlc3RUYWJsZUNvbHVtbj4sXG5cdGFubm90YXRpb25Db2x1bW5zOiBBbm5vdGF0aW9uVGFibGVDb2x1bW5bXSxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0ZW50aXR5VHlwZTogRW50aXR5VHlwZSxcblx0bmF2aWdhdGlvblNldHRpbmdzPzogTmF2aWdhdGlvblNldHRpbmdzQ29uZmlndXJhdGlvblxuKTogUmVjb3JkPHN0cmluZywgQ3VzdG9tQ29sdW1uPiB7XG5cdGNvbnN0IGludGVybmFsQ29sdW1uczogUmVjb3JkPHN0cmluZywgQ3VzdG9tQ29sdW1uPiA9IHt9O1xuXG5cdGZvciAoY29uc3Qga2V5IGluIGNvbHVtbnMpIHtcblx0XHRjb25zdCBtYW5pZmVzdENvbHVtbiA9IGNvbHVtbnNba2V5XTtcblx0XHQvLyBUbyBpZGVudGlmeSB0aGUgYW5ub3RhdGlvbiBjb2x1bW4gcHJvcGVydHkgb3ZlcndyaXRlIHZpYSBtYW5pZmVzdCB1c2UtY2FzZS5cblx0XHRjb25zdCBpc0Fubm90YXRpb25Db2x1bW4gPSBhbm5vdGF0aW9uQ29sdW1ucy5zb21lKGNvbHVtbiA9PiBjb2x1bW4ua2V5ID09PSBrZXkpO1xuXHRcdEtleUhlbHBlci52YWxpZGF0ZUtleShrZXkpO1xuXHRcdGNvbnN0IHByb3BlcnR5SW5mb3M6IHN0cmluZ1tdIHwgdW5kZWZpbmVkID0gX2dldFByb3BlcnR5TmFtZXMoXG5cdFx0XHRtYW5pZmVzdENvbHVtbi5wcm9wZXJ0aWVzLFxuXHRcdFx0YW5ub3RhdGlvbkNvbHVtbnMsXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0ZW50aXR5VHlwZVxuXHRcdCk7XG5cblx0XHRpbnRlcm5hbENvbHVtbnNba2V5XSA9IHtcblx0XHRcdGtleToga2V5LFxuXHRcdFx0aWQ6IFwiQ3VzdG9tQ29sdW1uOjpcIiArIGtleSxcblx0XHRcdG5hbWU6IFwiQ3VzdG9tQ29sdW1uOjpcIiArIGtleSxcblx0XHRcdGhlYWRlcjogbWFuaWZlc3RDb2x1bW4uaGVhZGVyLFxuXHRcdFx0d2lkdGg6IG1hbmlmZXN0Q29sdW1uLndpZHRoIHx8IHVuZGVmaW5lZCxcblx0XHRcdGhvcml6b250YWxBbGlnbjogX2dldE1hbmlmZXN0T3JEZWZhdWx0VmFsdWUobWFuaWZlc3RDb2x1bW4/Lmhvcml6b250YWxBbGlnbiwgSG9yaXpvbnRhbEFsaWduLkJlZ2luLCBpc0Fubm90YXRpb25Db2x1bW4pLFxuXHRcdFx0dHlwZTogbWFuaWZlc3RDb2x1bW4udHlwZSA9PT0gXCJTbG90XCIgPyBDb2x1bW5UeXBlLlNsb3QgOiBDb2x1bW5UeXBlLkRlZmF1bHQsXG5cdFx0XHRhdmFpbGFiaWxpdHk6IF9nZXRNYW5pZmVzdE9yRGVmYXVsdFZhbHVlKG1hbmlmZXN0Q29sdW1uPy5hdmFpbGFiaWxpdHksIEF2YWlsYWJpbGl0eVR5cGUuRGVmYXVsdCwgaXNBbm5vdGF0aW9uQ29sdW1uKSxcblx0XHRcdHRlbXBsYXRlOiBtYW5pZmVzdENvbHVtbi50ZW1wbGF0ZSB8fCBcInVuZGVmaW5lZFwiLFxuXHRcdFx0cG9zaXRpb246IHtcblx0XHRcdFx0YW5jaG9yOiBtYW5pZmVzdENvbHVtbi5wb3NpdGlvbj8uYW5jaG9yLFxuXHRcdFx0XHRwbGFjZW1lbnQ6IG1hbmlmZXN0Q29sdW1uLnBvc2l0aW9uID09PSB1bmRlZmluZWQgPyBQbGFjZW1lbnQuQWZ0ZXIgOiBtYW5pZmVzdENvbHVtbi5wb3NpdGlvbi5wbGFjZW1lbnRcblx0XHRcdH0sXG5cdFx0XHRpc05hdmlnYWJsZTogaXNBbm5vdGF0aW9uQ29sdW1uID8gdW5kZWZpbmVkIDogaXNBY3Rpb25OYXZpZ2FibGUobWFuaWZlc3RDb2x1bW4sIG5hdmlnYXRpb25TZXR0aW5ncywgdHJ1ZSksXG5cdFx0XHRzZXR0aW5nczogbWFuaWZlc3RDb2x1bW4uc2V0dGluZ3MsXG5cdFx0XHRzb3J0YWJsZTogZmFsc2UsXG5cdFx0XHRwcm9wZXJ0eUluZm9zOiBwcm9wZXJ0eUluZm9zLFxuXHRcdFx0Zm9ybWF0T3B0aW9uczoge1xuXHRcdFx0XHQuLi5nZXREZWZhdWx0Rm9ybWF0T3B0aW9uc0ZvclRhYmxlKCksXG5cdFx0XHRcdC4uLm1hbmlmZXN0Q29sdW1uLmZvcm1hdE9wdGlvbnNcblx0XHRcdH0sXG5cdFx0XHRleHBvcnRTZXR0aW5nczoge1xuXHRcdFx0XHR0ZW1wbGF0ZTogcHJvcGVydHlJbmZvcyA/IF9hcHBlbmRDdXN0b21UZW1wbGF0ZShwcm9wZXJ0eUluZm9zKSA6IHVuZGVmaW5lZCxcblx0XHRcdFx0ZmllbGRMYWJlbDogcHJvcGVydHlJbmZvcyA/IG1hbmlmZXN0Q29sdW1uLmhlYWRlciA6IHVuZGVmaW5lZCxcblx0XHRcdFx0d3JhcDogcHJvcGVydHlJbmZvcyAmJiBwcm9wZXJ0eUluZm9zLmxlbmd0aCA+IDEgPyB0cnVlIDogZmFsc2Vcblx0XHRcdH1cblx0XHR9O1xuXHR9XG5cdHJldHVybiBpbnRlcm5hbENvbHVtbnM7XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UDEzbk1vZGUoXG5cdHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uOiBUYWJsZUNvbnRyb2xDb25maWd1cmF0aW9uXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuXHRjb25zdCBtYW5pZmVzdFdyYXBwZXI6IE1hbmlmZXN0V3JhcHBlciA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCk7XG5cdGNvbnN0IHRhYmxlTWFuaWZlc3RTZXR0aW5nczogVGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24gPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odmlzdWFsaXphdGlvblBhdGgpO1xuXHRjb25zdCB2YXJpYW50TWFuYWdlbWVudDogVmFyaWFudE1hbmFnZW1lbnRUeXBlID0gbWFuaWZlc3RXcmFwcGVyLmdldFZhcmlhbnRNYW5hZ2VtZW50KCk7XG5cdGNvbnN0IGFQZXJzb25hbGl6YXRpb246IHN0cmluZ1tdID0gW107XG5cdGNvbnN0IGJBbmFseXRpY2FsVGFibGUgPSB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbi50eXBlID09PSBcIkFuYWx5dGljYWxUYWJsZVwiO1xuXHRpZiAodGFibGVNYW5pZmVzdFNldHRpbmdzPy50YWJsZVNldHRpbmdzPy5wZXJzb25hbGl6YXRpb24gIT09IHVuZGVmaW5lZCkge1xuXHRcdC8vIFBlcnNvbmFsaXphdGlvbiBjb25maWd1cmVkIGluIG1hbmlmZXN0LlxuXHRcdGNvbnN0IHBlcnNvbmFsaXphdGlvbjogYW55ID0gdGFibGVNYW5pZmVzdFNldHRpbmdzLnRhYmxlU2V0dGluZ3MucGVyc29uYWxpemF0aW9uO1xuXHRcdGlmIChwZXJzb25hbGl6YXRpb24gPT09IHRydWUpIHtcblx0XHRcdC8vIFRhYmxlIHBlcnNvbmFsaXphdGlvbiBmdWxseSBlbmFibGVkLlxuXHRcdFx0cmV0dXJuIGJBbmFseXRpY2FsVGFibGUgPyBcIlNvcnQsQ29sdW1uLEZpbHRlcixHcm91cCxBZ2dyZWdhdGVcIiA6IFwiU29ydCxDb2x1bW4sRmlsdGVyXCI7XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgcGVyc29uYWxpemF0aW9uID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHQvLyBTcGVjaWZpYyBwZXJzb25hbGl6YXRpb24gb3B0aW9ucyBlbmFibGVkIGluIG1hbmlmZXN0LiBVc2UgdGhlbSBhcyBpcy5cblx0XHRcdGlmIChwZXJzb25hbGl6YXRpb24uc29ydCkge1xuXHRcdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJTb3J0XCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBlcnNvbmFsaXphdGlvbi5jb2x1bW4pIHtcblx0XHRcdFx0YVBlcnNvbmFsaXphdGlvbi5wdXNoKFwiQ29sdW1uXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBlcnNvbmFsaXphdGlvbi5maWx0ZXIpIHtcblx0XHRcdFx0YVBlcnNvbmFsaXphdGlvbi5wdXNoKFwiRmlsdGVyXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBlcnNvbmFsaXphdGlvbi5ncm91cCAmJiBiQW5hbHl0aWNhbFRhYmxlKSB7XG5cdFx0XHRcdGFQZXJzb25hbGl6YXRpb24ucHVzaChcIkdyb3VwXCIpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKHBlcnNvbmFsaXphdGlvbi5hZ2dyZWdhdGUgJiYgYkFuYWx5dGljYWxUYWJsZSkge1xuXHRcdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJBZ2dyZWdhdGVcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gYVBlcnNvbmFsaXphdGlvbi5sZW5ndGggPiAwID8gYVBlcnNvbmFsaXphdGlvbi5qb2luKFwiLFwiKSA6IHVuZGVmaW5lZDtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0Ly8gTm8gcGVyc29uYWxpemF0aW9uIGNvbmZpZ3VyZWQgaW4gbWFuaWZlc3QuXG5cdFx0YVBlcnNvbmFsaXphdGlvbi5wdXNoKFwiU29ydFwiKTtcblx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJDb2x1bW5cIik7XG5cdFx0aWYgKHZhcmlhbnRNYW5hZ2VtZW50ID09PSBWYXJpYW50TWFuYWdlbWVudFR5cGUuQ29udHJvbCkge1xuXHRcdFx0Ly8gRmVhdHVyZSBwYXJpdHkgd2l0aCBWMi5cblx0XHRcdC8vIEVuYWJsZSB0YWJsZSBmaWx0ZXJpbmcgYnkgZGVmYXVsdCBvbmx5IGluIGNhc2Ugb2YgQ29udHJvbCBsZXZlbCB2YXJpYW50IG1hbmFnZW1lbnQuXG5cdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJGaWx0ZXJcIik7XG5cdFx0fVxuXHRcdGlmIChiQW5hbHl0aWNhbFRhYmxlKSB7XG5cdFx0XHRhUGVyc29uYWxpemF0aW9uLnB1c2goXCJHcm91cFwiKTtcblx0XHRcdGFQZXJzb25hbGl6YXRpb24ucHVzaChcIkFnZ3JlZ2F0ZVwiKTtcblx0XHR9XG5cdFx0cmV0dXJuIGFQZXJzb25hbGl6YXRpb24uam9pbihcIixcIik7XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBkZXRlcm1pbmUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIERlbGV0ZSBidXR0b24uXG4gKlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGluc3RhbmNlIG9mIHRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHBhcmFtIG5hdmlnYXRpb25QYXRoIFBhdGggdG8gdGhlIG5hdmlnYXRpb24gZW50aXR5XG4gKiBAcGFyYW0gaXNUYXJnZXREZWxldGFibGUgRmxhZyB3aGljaCBkZXRlcm1pbmVzIHdoZXRoZXIgYSB0YXJnZXQgaXMgZGVsZXRhYmxlXG4gKiBAcGFyYW0gdmlld0NvbmZpZ3VyYXRpb24gVGhlIGluc3RhbmNlIG9mIHRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgdmlldyBwYXRoXG4gKiBAcmV0dXJucyB7QmluZGluZ0V4cHJlc3Npb248Ym9vbGVhbj59IFRoZSBiaW5kaW5nIGV4cHJlc3Npb24gZm9yIHRoZSBEZWxldGUgYnV0dG9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREZWxldGVWaXNpYmxlKFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRuYXZpZ2F0aW9uUGF0aDogc3RyaW5nLFxuXHRpc1RhcmdldERlbGV0YWJsZTogYm9vbGVhbixcblx0dmlld0NvbmZpZ3VyYXRpb24/OiBWaWV3UGF0aENvbmZpZ3VyYXRpb25cbik6IEJpbmRpbmdFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0Y29uc3QgY3VycmVudEVudGl0eVNldCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCk7XG5cdGNvbnN0IGRhdGFNb2RlbE9iamVjdFBhdGggPSBjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKTtcblx0Y29uc3QgdmlzaXRlZE5hdmlnYXRpb25QYXRocyA9IGRhdGFNb2RlbE9iamVjdFBhdGgubmF2aWdhdGlvblByb3BlcnRpZXMubWFwKG5hdlByb3AgPT4gbmF2UHJvcC5uYW1lKTtcblx0Y29uc3QgaXNEZWxldGVIaWRkZW5FeHByZXNzaW9uID0gY3VycmVudEVudGl0eVNldFxuXHRcdD8gYW5ub3RhdGlvbkV4cHJlc3Npb24oXG5cdFx0XHRcdChjdXJyZW50RW50aXR5U2V0Py5hbm5vdGF0aW9ucy5VST8uRGVsZXRlSGlkZGVuIGFzIFByb3BlcnR5QW5ub3RhdGlvblZhbHVlPGJvb2xlYW4+KSB8fCBmYWxzZSxcblx0XHRcdFx0dmlzaXRlZE5hdmlnYXRpb25QYXRocyxcblx0XHRcdFx0dW5kZWZpbmVkLFxuXHRcdFx0XHQocGF0aDogc3RyaW5nKSA9PiBzaW5nbGV0b25QYXRoVmlzaXRvcihwYXRoLCBjb252ZXJ0ZXJDb250ZXh0LCB2aXNpdGVkTmF2aWdhdGlvblBhdGhzKVxuXHRcdCAgKVxuXHRcdDogY29uc3RhbnQoZmFsc2UpO1xuXHRjb25zdCBpc0RlbGV0ZUhpZGRlbjogYW55ID0gY29tcGlsZUJpbmRpbmcoaXNEZWxldGVIaWRkZW5FeHByZXNzaW9uKTtcblx0bGV0IGlzUGFyZW50RGVsZXRhYmxlLCBwYXJlbnRFbnRpdHlTZXREZWxldGFibGU7XG5cdGlmIChjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuT2JqZWN0UGFnZSkge1xuXHRcdGlzUGFyZW50RGVsZXRhYmxlID0gaXNQYXRoRGVsZXRhYmxlKGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLCBuYXZpZ2F0aW9uUGF0aCk7XG5cdFx0cGFyZW50RW50aXR5U2V0RGVsZXRhYmxlID0gaXNQYXJlbnREZWxldGFibGUgPyBjb21waWxlQmluZGluZyhpc1BhcmVudERlbGV0YWJsZSkgOiBpc1BhcmVudERlbGV0YWJsZTtcblx0fVxuXHQvL2RvIG5vdCBzaG93IGNhc2UgdGhlIGRlbGV0ZSBidXR0b24gaWYgcGFyZW50RW50aXR5U2V0RGVsZXRhYmxlIGlzIGZhbHNlXG5cdGlmIChwYXJlbnRFbnRpdHlTZXREZWxldGFibGUgPT09IFwiZmFsc2VcIikge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fSBlbHNlIGlmIChwYXJlbnRFbnRpdHlTZXREZWxldGFibGUgJiYgaXNEZWxldGVIaWRkZW4gIT09IFwidHJ1ZVwiKSB7XG5cdFx0Ly9EZWxldGUgSGlkZGVuIGluIGNhc2Ugb2YgdHJ1ZSBhbmQgcGF0aCBiYXNlZFxuXHRcdGlmIChpc0RlbGV0ZUhpZGRlbiAmJiBpc0RlbGV0ZUhpZGRlbiAhPT0gXCJmYWxzZVwiKSB7XG5cdFx0XHRyZXR1cm4gXCJ7PSAhJFwiICsgaXNEZWxldGVIaWRkZW4gKyBcIiAmJiAke3VpPi9lZGl0TW9kZX0gPT09ICdFZGl0YWJsZSd9XCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIns9ICR7dWk+L2VkaXRNb2RlfSA9PT0gJ0VkaXRhYmxlJ31cIjtcblx0XHR9XG5cdH0gZWxzZSBpZiAoXG5cdFx0aXNEZWxldGVIaWRkZW4gPT09IFwidHJ1ZVwiIHx8XG5cdFx0IWlzVGFyZ2V0RGVsZXRhYmxlIHx8XG5cdFx0KHZpZXdDb25maWd1cmF0aW9uICYmIGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkuaGFzTXVsdGlwbGVWaXN1YWxpemF0aW9ucyh2aWV3Q29uZmlndXJhdGlvbikpIHx8XG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLkFuYWx5dGljYWxMaXN0UGFnZVxuXHQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH0gZWxzZSBpZiAoY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSAhPT0gVGVtcGxhdGVUeXBlLkxpc3RSZXBvcnQpIHtcblx0XHRpZiAoaXNEZWxldGVIaWRkZW4gJiYgaXNEZWxldGVIaWRkZW4gPT09IFwiZmFsc2VcIikge1xuXHRcdFx0cmV0dXJuIFwiez0gISRcIiArIGlzRGVsZXRlSGlkZGVuICsgXCIgJiYgJHt1aT4vZWRpdE1vZGV9ID09PSAnRWRpdGFibGUnfVwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gXCJ7PSAke3VpPi9lZGl0TW9kZX0gPT09ICdFZGl0YWJsZSd9XCI7XG5cdFx0fVxuXHR9IGVsc2UgaWYgKGlzQmluZGluZyhpc0RlbGV0ZUhpZGRlbkV4cHJlc3Npb24pKSB7XG5cdFx0Ly8gVUkuRGVsZXRlSGlkZGVuIGFubm90YXRpb24gcG9pbnRzIHRvIGEgcGF0aFxuXHRcdHJldHVybiBjb21waWxlQmluZGluZyhub3QoaXNEZWxldGVIaWRkZW5FeHByZXNzaW9uKSk7XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSBlbmFibGVtZW50IGZvciB0aGUgJ01hc3MgRWRpdCcgYnV0dG9uXG4gKlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlckNvbnRleHRcbiAqIEBwYXJhbSBiTWFzc0VkaXRWaXNpYmxlIFRoZSB2aXNpYmlsaXR5IG9mIHRoZSAnTWFzcyBFZGl0JyBidXR0b25cbiAqIEByZXR1cm5zIHsqfSBFeHByZXNzaW9uIG9yIEJvb2xlYW4gdmFsdWUgZm9yIHRoZSBlbmFibGVtZW50IG9mIHRoZSAnTWFzcyBFZGl0JyBidXR0b25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RW5hYmxlbWVudE1hc3NFZGl0KFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRiTWFzc0VkaXRWaXNpYmxlOiBzdHJpbmcgfCBib29sZWFuIHwgdW5kZWZpbmVkXG4pOiBzdHJpbmcgfCBib29sZWFuIHtcblx0aWYgKGJNYXNzRWRpdFZpc2libGUpIHtcblx0XHRjb25zdCBpc1BhcmVudFVwZGF0YWJsZTogYW55ID0gaXNQYXRoVXBkYXRhYmxlKGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLCB1bmRlZmluZWQsIHRydWUpO1xuXHRcdC8vd2hlbiB1cGRhdGFibGUgaXMgcGF0aCBiYXNlZCBhbmQgcG9pbnRpbmcgdG8gY3VycmVudCBlbnRpdHkgc2V0IHByb3BlcnR5LCB0aGF0IGNhc2UgaXMgaGFuZGxlZCBpbiB0YWJsZSBoZWxwZXIgYW5kIHJ1bnRpbWVcblx0XHRpZiAoaXNQYXJlbnRVcGRhdGFibGU/LmN1cnJlbnRFbnRpdHlSZXN0cmljdGlvbikge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRjb25zdCBvRXhwcmVzc2lvbjogYW55ID0gY29tcGlsZUJpbmRpbmcoaXNQYXJlbnRVcGRhdGFibGUpO1xuXHRcdHJldHVybiBpc1BhcmVudFVwZGF0YWJsZVxuXHRcdFx0PyBcIns9ICV7aW50ZXJuYWw+bnVtYmVyT2ZTZWxlY3RlZENvbnRleHRzfSA+PSAyICYmIFwiICsgY29tcGlsZUJpbmRpbmcoaXNQYXJlbnRVcGRhdGFibGUsIG9FeHByZXNzaW9uKSArIFwifVwiXG5cdFx0XHQ6IGZhbHNlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2aXNpYmlsaXR5IGZvciB0aGUgJ01hc3MgRWRpdCcgYnV0dG9uXG4gKlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlckNvbnRleHRcbiAqIEBwYXJhbSB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbiBUaGUgbWFuaWZlc3QgY29uZmlndXJhdGlvbiBmb3IgdGhlIHRhYmxlXG4gKiBAcGFyYW0gdGFyZ2V0Q2FwYWJpbGl0aWVzIFRoZSB0YXJnZXQgY2FwYWJpbGl0eSByZXN0cmljdGlvbnMgZm9yIHRoZSB0YWJsZVxuICogQHBhcmFtIHNlbGVjdGlvbk1vZGUgVGhlIHNlbGVjdGlvbiBtb2RlIGZvciB0aGUgdGFibGVcbiAqIEByZXR1cm5zIHsqfSBFeHByZXNzaW9uIG9yIEJvb2xlYW4gdmFsdWUgZm9yIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSAnTWFzcyBFZGl0JyBidXR0b25cbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0VmlzaWJpbGl0eU1hc3NFZGl0KFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHR0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbjogVGFibGVDb250cm9sQ29uZmlndXJhdGlvbixcblx0dGFyZ2V0Q2FwYWJpbGl0aWVzOiBUYWJsZUNhcGFiaWxpdHlSZXN0cmljdGlvbixcblx0c2VsZWN0aW9uTW9kZTogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuIHwgc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0Y29uc3QgZW50aXR5U2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKSxcblx0XHRiVXBkYXRlSGlkZGVuOiBhbnkgPSBlbnRpdHlTZXQgJiYgZW50aXR5U2V0Py5hbm5vdGF0aW9ucy5VST8uVXBkYXRlSGlkZGVuPy52YWx1ZU9mKCksXG5cdFx0Yk1hc3NFZGl0RW5hYmxlZDogYm9vbGVhbiA9IHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uPy5lbmFibGVNYXNzRWRpdCB8fCBmYWxzZSxcblx0XHRpU2VsZWN0aW9uTGltaXQ6IG51bWJlciA9IHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uPy5zZWxlY3Rpb25MaW1pdDtcblx0bGV0IGJNYXNzRWRpdFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXHRpZiAoKHNlbGVjdGlvbk1vZGUgJiYgc2VsZWN0aW9uTW9kZSA9PT0gXCJTaW5nbGVcIikgfHwgKGlTZWxlY3Rpb25MaW1pdCAmJiBpU2VsZWN0aW9uTGltaXQgPCAyKSkge1xuXHRcdGJNYXNzRWRpdFZpc2libGUgPSBmYWxzZTtcblx0fSBlbHNlIGlmIChzZWxlY3Rpb25Nb2RlICYmIChzZWxlY3Rpb25Nb2RlID09PSBcIkF1dG9cIiB8fCBzZWxlY3Rpb25Nb2RlID09PSBcIk5vbmVcIikpIHtcblx0XHRiTWFzc0VkaXRWaXNpYmxlID0gdHJ1ZTtcblx0fVxuXHRpZiAodGFyZ2V0Q2FwYWJpbGl0aWVzPy5pc1VwZGF0YWJsZSAhPT0gZmFsc2UgJiYgYk1hc3NFZGl0VmlzaWJsZSAmJiBiTWFzc0VkaXRFbmFibGVkKSB7XG5cdFx0aWYgKGJVcGRhdGVIaWRkZW4gJiYgdHlwZW9mIGJVcGRhdGVIaWRkZW4gPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0XHRyZXR1cm4gIWJVcGRhdGVIaWRkZW4gJiYgY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLk9iamVjdFBhZ2UgPyBjb21waWxlQmluZGluZyhVSS5Jc0VkaXRhYmxlKSA6IGZhbHNlO1xuXHRcdH0gZWxzZSBpZiAoYlVwZGF0ZUhpZGRlbiAmJiBiVXBkYXRlSGlkZGVuPy5wYXRoKSB7XG5cdFx0XHRyZXR1cm4gY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLk9iamVjdFBhZ2Vcblx0XHRcdFx0PyBjb21waWxlQmluZGluZyhhbmQoZXF1YWwoVUkuSXNFZGl0YWJsZSwgdHJ1ZSksIGVxdWFsKGFubm90YXRpb25FeHByZXNzaW9uKGJVcGRhdGVIaWRkZW4pLCBmYWxzZSkpKVxuXHRcdFx0XHQ6IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLk9iamVjdFBhZ2UgPyBjb21waWxlQmluZGluZyhVSS5Jc0VkaXRhYmxlKSA6IGZhbHNlO1xuXHR9XG5cdHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBkZXRlcm1pbmUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIENyZWF0ZSBidXR0b24uXG4gKlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGluc3RhbmNlIG9mIHRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHBhcmFtIGNyZWF0aW9uTW9kZSBUaGUgbW9kZSB1c2VkIGZvciBjcmVhdGlvblxuICogQHBhcmFtIGlzSW5zZXJ0YWJsZSBBbm5vdGF0aW9uIGV4cHJlc3Npb24gb2YgSW5zZXJ0UmVzdHJpY3Rpb25zLkluc2VydGFibGVcbiAqIEBwYXJhbSB2aWV3Q29uZmlndXJhdGlvbiBUaGUgaW5zdGFuY2Ugb2YgdGhlIGNvbmZpZ3VyYXRpb24gZm9yIHRoZSB2aWV3IHBhdGhcbiAqIEByZXR1cm5zIHtFeHByZXNzaW9uPGJvb2xlYW4+fSBFeHByZXNzaW9uIG9yIEJvb2xlYW4gdmFsdWUgb2YgdGhlICdVSS5DcmVhdGVIaWRkZW4nIGFubm90YXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldENyZWF0ZVZpc2libGUoXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGNyZWF0aW9uTW9kZTogQ3JlYXRpb25Nb2RlIHwgXCJFeHRlcm5hbFwiLFxuXHRpc0luc2VydGFibGU6IEV4cHJlc3Npb248Ym9vbGVhbj4sXG5cdHZpZXdDb25maWd1cmF0aW9uPzogVmlld1BhdGhDb25maWd1cmF0aW9uXG4pOiBFeHByZXNzaW9uPGJvb2xlYW4+IHtcblx0Y29uc3QgY3VycmVudEVudGl0eVNldCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCk7XG5cdGNvbnN0IGRhdGFNb2RlbE9iamVjdFBhdGggPSBjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKTtcblx0Y29uc3QgdmlzaXRlZE5hdmlnYXRpb25QYXRocyA9IGRhdGFNb2RlbE9iamVjdFBhdGgubmF2aWdhdGlvblByb3BlcnRpZXMubWFwKG5hdlByb3AgPT4gbmF2UHJvcC5uYW1lKTtcblx0Y29uc3QgaXNDcmVhdGVIaWRkZW46IEV4cHJlc3Npb248Ym9vbGVhbj4gPSBjdXJyZW50RW50aXR5U2V0XG5cdFx0PyBhbm5vdGF0aW9uRXhwcmVzc2lvbihcblx0XHRcdFx0KGN1cnJlbnRFbnRpdHlTZXQ/LmFubm90YXRpb25zLlVJPy5DcmVhdGVIaWRkZW4gYXMgUHJvcGVydHlBbm5vdGF0aW9uVmFsdWU8Ym9vbGVhbj4pIHx8IGZhbHNlLFxuXHRcdFx0XHR2aXNpdGVkTmF2aWdhdGlvblBhdGhzLFxuXHRcdFx0XHR1bmRlZmluZWQsXG5cdFx0XHRcdChwYXRoOiBzdHJpbmcpID0+IHNpbmdsZXRvblBhdGhWaXNpdG9yKHBhdGgsIGNvbnZlcnRlckNvbnRleHQsIHZpc2l0ZWROYXZpZ2F0aW9uUGF0aHMpXG5cdFx0ICApXG5cdFx0OiBjb25zdGFudChmYWxzZSk7XG5cblx0Ly8gaWYgdGhlcmUgaXMgYSBjdXN0b20gbmV3IGFjdGlvbiB0aGUgY3JlYXRlIGJ1dHRvbiB3aWxsIGJlIGJvdW5kIGFnYWluc3QgdGhpcyBuZXcgYWN0aW9uIChpbnN0ZWFkIG9mIGEgUE9TVCBhY3Rpb24pLlxuXHQvLyBUaGUgdmlzaWJpbGl0eSBvZiB0aGUgY3JlYXRlIGJ1dHRvbiB0aGVuIGRlcGVuZHMgb24gdGhlIG5ldyBhY3Rpb24ncyBPcGVyYXRpb25BdmFpbGFibGUgYW5ub3RhdGlvbiAoaW5zdGVhZCBvZiB0aGUgaW5zZXJ0UmVzdHJpY3Rpb25zKTpcblx0Ly8gT3BlcmF0aW9uQXZhaWxhYmxlID0gdHJ1ZSBvciB1bmRlZmluZWQgLT4gY3JlYXRlIGlzIHZpc2libGVcblx0Ly8gT3BlcmF0aW9uQXZhaWxhYmxlID0gZmFsc2UgLT4gY3JlYXRlIGlzIG5vdCB2aXNpYmxlXG5cdGNvbnN0IG5ld0FjdGlvbk5hbWU6IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz4gPSBjdXJyZW50RW50aXR5U2V0Py5hbm5vdGF0aW9ucy5Db21tb24/LkRyYWZ0Um9vdD8uTmV3QWN0aW9uPy50b1N0cmluZygpO1xuXHRjb25zdCBzaG93Q3JlYXRlRm9yTmV3QWN0aW9uID0gbmV3QWN0aW9uTmFtZVxuXHRcdD8gYW5ub3RhdGlvbkV4cHJlc3Npb24oXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQ/LmdldEVudGl0eVR5cGUoKS5hY3Rpb25zW25ld0FjdGlvbk5hbWVdLmFubm90YXRpb25zPy5Db3JlPy5PcGVyYXRpb25BdmFpbGFibGU/LnZhbHVlT2YoKSxcblx0XHRcdFx0W10sXG5cdFx0XHRcdHRydWVcblx0XHQgIClcblx0XHQ6IHVuZGVmaW5lZDtcblxuXHQvLyAtIElmIGl0J3Mgc3RhdGljYWxseSBub3QgaW5zZXJ0YWJsZSAtPiBjcmVhdGUgaXMgbm90IHZpc2libGVcblx0Ly8gLSBJZiBjcmVhdGUgaXMgc3RhdGljYWxseSBoaWRkZW4gLT4gY3JlYXRlIGlzIG5vdCB2aXNpYmxlXG5cdC8vIC0gSWYgaXQncyBhbiBBTFAgdGVtcGxhdGUgLT4gY3JlYXRlIGlzIG5vdCB2aXNpYmxlXG5cdC8vIC1cblx0Ly8gLSBPdGhlcndpc2Vcblx0Ly8gXHQgLSBJZiB0aGUgY3JlYXRlIG1vZGUgaXMgZXh0ZXJuYWwgLT4gY3JlYXRlIGlzIHZpc2libGVcblx0Ly8gXHQgLSBJZiB3ZSdyZSBvbiB0aGUgbGlzdCByZXBvcnQgLT5cblx0Ly8gXHQgXHQtIElmIFVJLkNyZWF0ZUhpZGRlbiBwb2ludHMgdG8gYSBwcm9wZXJ0eSBwYXRoIC0+IHByb3ZpZGUgYSBuZWdhdGVkIGJpbmRpbmcgdG8gdGhpcyBwYXRoXG5cdC8vIFx0IFx0LSBPdGhlcndpc2UsIGNyZWF0ZSBpcyB2aXNpYmxlXG5cdC8vIFx0IC0gT3RoZXJ3aXNlXG5cdC8vIFx0ICAgLSBUaGlzIGRlcGVuZHMgb24gdGhlIHZhbHVlIG9mIHRoZSB0aGUgVUkuSXNFZGl0YWJsZVxuXHRyZXR1cm4gaWZFbHNlKFxuXHRcdG9yKFxuXHRcdFx0b3IoXG5cdFx0XHRcdGVxdWFsKHNob3dDcmVhdGVGb3JOZXdBY3Rpb24sIGZhbHNlKSxcblx0XHRcdFx0YW5kKGlzQ29uc3RhbnQoaXNJbnNlcnRhYmxlKSwgZXF1YWwoaXNJbnNlcnRhYmxlLCBmYWxzZSksIGVxdWFsKHNob3dDcmVhdGVGb3JOZXdBY3Rpb24sIHVuZGVmaW5lZCkpXG5cdFx0XHQpLFxuXHRcdFx0aXNDb25zdGFudChpc0NyZWF0ZUhpZGRlbikgJiYgZXF1YWwoaXNDcmVhdGVIaWRkZW4sIHRydWUpLFxuXHRcdFx0b3IoXG5cdFx0XHRcdHZpZXdDb25maWd1cmF0aW9uID8gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKHZpZXdDb25maWd1cmF0aW9uKSA6IGZhbHNlLFxuXHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuQW5hbHl0aWNhbExpc3RQYWdlXG5cdFx0XHQpXG5cdFx0KSxcblx0XHRmYWxzZSxcblx0XHRpZkVsc2UoXG5cdFx0XHRjcmVhdGlvbk1vZGUgPT09IFwiRXh0ZXJuYWxcIixcblx0XHRcdHRydWUsXG5cdFx0XHRpZkVsc2UoXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5MaXN0UmVwb3J0LFxuXHRcdFx0XHRpZkVsc2UoaXNCaW5kaW5nKGlzQ3JlYXRlSGlkZGVuKSwgbm90KGlzQ3JlYXRlSGlkZGVuKSwgdHJ1ZSksXG5cdFx0XHRcdGFuZChub3QoaXNDcmVhdGVIaWRkZW4pLCBVSS5Jc0VkaXRhYmxlKVxuXHRcdFx0KVxuXHRcdClcblx0KTtcbn1cblxuLyoqXG4gKiBSZXR1cm5zIHRoZSB2aXNpYmlsaXR5IGZvciB0aGUgUGFzdGUgYnV0dG9uLlxuICpcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBpbnN0YW5jZSBvZiB0aGUgY29udmVydGVyIGNvbnRleHRcbiAqIEBwYXJhbSBjcmVhdGlvbkJlaGF2aW91ciBUaGUgY2hvc2VuIGJlaGF2aW9yIG9mIGNyZWF0aW9uXG4gKiBAcGFyYW0gaXNJbnNlcnRhYmxlIFRoZSBleHByZXNzaW9uIHdoaWNoIGRlbm90ZXMgaW5zZXJ0IHJlc3RyaWN0aW9uc1xuICogQHBhcmFtIHBhc3RlRW5hYmxlZEluTWFuaWZlc3QgVGhlIGZsYWcgd2hpY2ggZGVub3RlcyB0aGUgcGFzdGUgZW5hYmxlbWVudCBzdGF0dXMgdmlhIG1hbmlmZXN0XG4gKiBAcGFyYW0gdmlld0NvbmZpZ3VyYXRpb24gVGhlIGluc3RhbmNlIG9mIHRoZSBjb25maWd1cmF0aW9uIGZvciB0aGUgdmlldyBwYXRoXG4gKiBAcmV0dXJucyB7RXhwcmVzc2lvbjxib29sZWFuPn0gRXhwcmVzc2lvbiBvciBCb29sZWFuIHZhbHVlIG9mIHRoZSBVSS5DcmVhdGVIaWRkZW4gYW5ub3RhdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFzdGVFbmFibGVkKFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRjcmVhdGlvbkJlaGF2aW91cjogVGFibGVBbm5vdGF0aW9uQ29uZmlndXJhdGlvbltcImNyZWF0ZVwiXSxcblx0aXNJbnNlcnRhYmxlOiBFeHByZXNzaW9uPGJvb2xlYW4+LFxuXHRwYXN0ZUVuYWJsZWRJbk1hbmlmZXN0OiBib29sZWFuLFxuXHR2aWV3Q29uZmlndXJhdGlvbj86IFZpZXdQYXRoQ29uZmlndXJhdGlvblxuKTogRXhwcmVzc2lvbjxib29sZWFuPiB7XG5cdC8vIElmIGNyZWF0ZSBpcyBub3QgdmlzaWJsZSAtPiBpdCdzIG5vdCBlbmFibGVkXG5cdC8vIElmIGNyZWF0ZSBpcyB2aXNpYmxlIC0+XG5cdC8vIFx0IElmIGl0J3MgaW4gdGhlIExpc3RSZXBvcnQgLT4gbm90IGVuYWJsZWRcblx0Ly9cdCBJZiBpdCdzIGluc2VydGFibGUgLT4gZW5hYmxlZFxuXHRyZXR1cm4gaWZFbHNlKFxuXHRcdHBhc3RlRW5hYmxlZEluTWFuaWZlc3QgJiYgZXF1YWwoZ2V0Q3JlYXRlVmlzaWJsZShjb252ZXJ0ZXJDb250ZXh0LCBjcmVhdGlvbkJlaGF2aW91ci5tb2RlLCBpc0luc2VydGFibGUsIHZpZXdDb25maWd1cmF0aW9uKSwgdHJ1ZSksXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLk9iamVjdFBhZ2UgJiYgaXNJbnNlcnRhYmxlLFxuXHRcdGZhbHNlXG5cdCk7XG59XG5cbi8qKlxuICogUmV0dXJucyBhIEpTT04gc3RyaW5nIGNvbnRhaW5pbmcgUHJlc2VudGF0aW9uIFZhcmlhbnQgc29ydCBjb25kaXRpb25zLlxuICpcbiAqIEBwYXJhbSB7UHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IHVuZGVmaW5lZH0gcHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24gUHJlc2VudGF0aW9uIHZhcmlhbnQgYW5ub3RhdGlvblxuICogQHBhcmFtIGNvbHVtbnMgQ29udmVydGVyIHByb2Nlc3NlZCB0YWJsZSBjb2x1bW5zXG4gKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfSBTb3J0IGNvbmRpdGlvbnMgZm9yIGEgUHJlc2VudGF0aW9uIHZhcmlhbnQuXG4gKi9cbmZ1bmN0aW9uIGdldFNvcnRDb25kaXRpb25zKFxuXHRwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbjogUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IHVuZGVmaW5lZCxcblx0Y29sdW1uczogVGFibGVDb2x1bW5bXVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0bGV0IHNvcnRDb25kaXRpb25zOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cdGlmIChwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbj8uU29ydE9yZGVyKSB7XG5cdFx0Y29uc3Qgc29ydGVyczogU29ydGVyVHlwZVtdID0gW107XG5cdFx0Y29uc3QgY29uZGl0aW9ucyA9IHtcblx0XHRcdHNvcnRlcnM6IHNvcnRlcnNcblx0XHR9O1xuXHRcdHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uLlNvcnRPcmRlci5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG5cdFx0XHRjb25zdCBwcm9wZXJ0eU5hbWUgPSAoY29uZGl0aW9uLlByb3BlcnR5IGFzIFByb3BlcnR5UGF0aCk/LiR0YXJnZXQ/Lm5hbWU7XG5cdFx0XHRjb25zdCBzb3J0Q29sdW1uID0gY29sdW1ucy5maW5kKGNvbHVtbiA9PiBjb2x1bW4ubmFtZSA9PT0gcHJvcGVydHlOYW1lKSBhcyBBbm5vdGF0aW9uVGFibGVDb2x1bW47XG5cdFx0XHRzb3J0Q29sdW1uPy5wcm9wZXJ0eUluZm9zPy5mb3JFYWNoKHJlbGF0ZWRQcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdFx0XHQvLyBDb21wbGV4IFByb3BlcnR5SW5mby4gQWRkIGVhY2ggcmVsYXRlZCBwcm9wZXJ0eSBmb3Igc29ydGluZy5cblx0XHRcdFx0Y29uZGl0aW9ucy5zb3J0ZXJzLnB1c2goe1xuXHRcdFx0XHRcdG5hbWU6IHJlbGF0ZWRQcm9wZXJ0eU5hbWUsXG5cdFx0XHRcdFx0ZGVzY2VuZGluZzogISFjb25kaXRpb24uRGVzY2VuZGluZ1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXG5cdFx0XHRpZiAoIXNvcnRDb2x1bW4/LnByb3BlcnR5SW5mb3M/Lmxlbmd0aCkge1xuXHRcdFx0XHQvLyBOb3QgYSBjb21wbGV4IFByb3BlcnR5SW5mby4gQ29uc2lkZXIgdGhlIHByb3BlcnR5IGl0c2VsZiBmb3Igc29ydGluZy5cblx0XHRcdFx0Y29uZGl0aW9ucy5zb3J0ZXJzLnB1c2goe1xuXHRcdFx0XHRcdG5hbWU6IHByb3BlcnR5TmFtZSxcblx0XHRcdFx0XHRkZXNjZW5kaW5nOiAhIWNvbmRpdGlvbi5EZXNjZW5kaW5nXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHRcdHNvcnRDb25kaXRpb25zID0gY29uZGl0aW9ucy5zb3J0ZXJzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KGNvbmRpdGlvbnMpIDogdW5kZWZpbmVkO1xuXHR9XG5cdHJldHVybiBzb3J0Q29uZGl0aW9ucztcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBhcnJheSBvZiBwcm9wZXJ0eVBhdGggdG8gYW4gYXJyYXkgb2YgcHJvcGVydHlJbmZvIG5hbWVzLlxuICpcbiAqIEBwYXJhbSBwYXRocyB0aGUgYXJyYXkgdG8gYmUgY29udmVydGVkXG4gKiBAcGFyYW0gY29sdW1ucyB0aGUgYXJyYXkgb2YgcHJvcGVydHlJbmZvc1xuICogQHJldHVybnMgYW4gYXJyYXkgb2YgcHJvcGVydHlJbmZvIG5hbWVzXG4gKi9cblxuZnVuY3Rpb24gY29udmVydFByb3BlcnR5UGF0aHNUb0luZm9OYW1lcyhwYXRoczogUHJvcGVydHlQYXRoW10sIGNvbHVtbnM6IFRhYmxlQ29sdW1uW10pOiBzdHJpbmdbXSB7XG5cdGNvbnN0IGluZm9OYW1lczogc3RyaW5nW10gPSBbXTtcblx0cGF0aHMuZm9yRWFjaChjdXJyZW50UGF0aCA9PiB7XG5cdFx0aWYgKGN1cnJlbnRQYXRoPy4kdGFyZ2V0Py5uYW1lKSB7XG5cdFx0XHRjb25zdCBwcm9wZXJ0eUluZm8gPSBjb2x1bW5zLmZpbmQoY29sdW1uID0+IHtcblx0XHRcdFx0Y29uc3QgYW5ub3RhdGlvbkNvbHVtbiA9IGNvbHVtbiBhcyBBbm5vdGF0aW9uVGFibGVDb2x1bW47XG5cdFx0XHRcdHJldHVybiAhYW5ub3RhdGlvbkNvbHVtbi5wcm9wZXJ0eUluZm9zICYmIGFubm90YXRpb25Db2x1bW4ucmVsYXRpdmVQYXRoID09PSBjdXJyZW50UGF0aD8uJHRhcmdldD8ubmFtZTtcblx0XHRcdH0pO1xuXHRcdFx0aWYgKHByb3BlcnR5SW5mbykge1xuXHRcdFx0XHRpbmZvTmFtZXMucHVzaChwcm9wZXJ0eUluZm8ubmFtZSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9KTtcblxuXHRyZXR1cm4gaW5mb05hbWVzO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBKU09OIHN0cmluZyBjb250YWluaW5nIFByZXNlbnRhdGlvbiBWYXJpYW50IGdyb3VwIGNvbmRpdGlvbnMuXG4gKlxuICogQHBhcmFtIHtQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzIHwgdW5kZWZpbmVkfSBwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbiBQcmVzZW50YXRpb24gdmFyaWFudCBhbm5vdGF0aW9uXG4gKiBAcGFyYW0gY29sdW1ucyBDb252ZXJ0ZXIgcHJvY2Vzc2VkIHRhYmxlIGNvbHVtbnNcbiAqIEByZXR1cm5zIHtzdHJpbmcgfCB1bmRlZmluZWR9IEdyb3VwIGNvbmRpdGlvbnMgZm9yIGEgUHJlc2VudGF0aW9uIHZhcmlhbnQuXG4gKi9cbmZ1bmN0aW9uIGdldEdyb3VwQ29uZGl0aW9ucyhcblx0cHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb246IFByZXNlbnRhdGlvblZhcmlhbnRUeXBlVHlwZXMgfCB1bmRlZmluZWQsXG5cdGNvbHVtbnM6IFRhYmxlQ29sdW1uW11cbik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG5cdGxldCBncm91cENvbmRpdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0aWYgKHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uPy5Hcm91cEJ5KSB7XG5cdFx0Y29uc3QgYUdyb3VwQnkgPSBwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbi5Hcm91cEJ5IGFzIFByb3BlcnR5UGF0aFtdO1xuXHRcdGNvbnN0IGFHcm91cExldmVscyA9IGNvbnZlcnRQcm9wZXJ0eVBhdGhzVG9JbmZvTmFtZXMoYUdyb3VwQnksIGNvbHVtbnMpLm1hcChpbmZvTmFtZSA9PiB7XG5cdFx0XHRyZXR1cm4geyBuYW1lOiBpbmZvTmFtZSB9O1xuXHRcdH0pO1xuXG5cdFx0Z3JvdXBDb25kaXRpb25zID0gYUdyb3VwTGV2ZWxzLmxlbmd0aCA/IEpTT04uc3RyaW5naWZ5KHsgZ3JvdXBMZXZlbHM6IGFHcm91cExldmVscyB9KSA6IHVuZGVmaW5lZDtcblx0fVxuXHRyZXR1cm4gZ3JvdXBDb25kaXRpb25zO1xufVxuXG4vKipcbiAqIFJldHVybnMgYSBKU09OIHN0cmluZyBjb250YWluaW5nIFByZXNlbnRhdGlvbiBWYXJpYW50IGFnZ3JlZ2F0ZSBjb25kaXRpb25zLlxuICpcbiAqIEBwYXJhbSB7UHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IHVuZGVmaW5lZH0gcHJlc2VudGF0aW9uVmFyaWFudEFubm90YXRpb24gUHJlc2VudGF0aW9uIHZhcmlhbnQgYW5ub3RhdGlvblxuICogQHBhcmFtIGNvbHVtbnMgQ29udmVydGVyIHByb2Nlc3NlZCB0YWJsZSBjb2x1bW5zXG4gKiBAcmV0dXJucyB7c3RyaW5nIHwgdW5kZWZpbmVkfSBHcm91cCBjb25kaXRpb25zIGZvciBhIFByZXNlbnRhdGlvbiB2YXJpYW50LlxuICovXG5mdW5jdGlvbiBnZXRBZ2dyZWdhdGVDb25kaXRpb25zKFxuXHRwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbjogUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IHVuZGVmaW5lZCxcblx0Y29sdW1uczogVGFibGVDb2x1bW5bXVxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0bGV0IGFnZ3JlZ2F0ZUNvbmRpdGlvbnM6IHN0cmluZyB8IHVuZGVmaW5lZDtcblx0aWYgKHByZXNlbnRhdGlvblZhcmlhbnRBbm5vdGF0aW9uPy5Ub3RhbCkge1xuXHRcdGNvbnN0IGFUb3RhbHMgPSBwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbi5Ub3RhbCBhcyBQcm9wZXJ0eVBhdGhbXTtcblx0XHRjb25zdCBhZ2dyZWdhdGVzOiBSZWNvcmQ8c3RyaW5nLCBvYmplY3Q+ID0ge307XG5cdFx0Y29udmVydFByb3BlcnR5UGF0aHNUb0luZm9OYW1lcyhhVG90YWxzLCBjb2x1bW5zKS5mb3JFYWNoKGluZm9OYW1lID0+IHtcblx0XHRcdGFnZ3JlZ2F0ZXNbaW5mb05hbWVdID0ge307XG5cdFx0fSk7XG5cblx0XHRhZ2dyZWdhdGVDb25kaXRpb25zID0gSlNPTi5zdHJpbmdpZnkoYWdncmVnYXRlcyk7XG5cdH1cblxuXHRyZXR1cm4gYWdncmVnYXRlQ29uZGl0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhYmxlQW5ub3RhdGlvbkNvbmZpZ3VyYXRpb24oXG5cdGxpbmVJdGVtQW5ub3RhdGlvbjogTGluZUl0ZW0gfCB1bmRlZmluZWQsXG5cdHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uOiBUYWJsZUNvbnRyb2xDb25maWd1cmF0aW9uLFxuXHRjb2x1bW5zOiBUYWJsZUNvbHVtbltdLFxuXHRwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbj86IFByZXNlbnRhdGlvblZhcmlhbnRUeXBlVHlwZXMsXG5cdHZpZXdDb25maWd1cmF0aW9uPzogVmlld1BhdGhDb25maWd1cmF0aW9uXG4pOiBUYWJsZUFubm90YXRpb25Db25maWd1cmF0aW9uIHtcblx0Ly8gTmVlZCB0byBnZXQgdGhlIHRhcmdldFxuXHRjb25zdCB7IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggfSA9IHNwbGl0UGF0aCh2aXN1YWxpemF0aW9uUGF0aCk7XG5cdGNvbnN0IHRpdGxlOiBhbnkgPSBjb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKS50YXJnZXRFbnRpdHlUeXBlLmFubm90YXRpb25zPy5VST8uSGVhZGVySW5mbz8uVHlwZU5hbWVQbHVyYWw7XG5cdGNvbnN0IGVudGl0eVNldCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLnRhcmdldEVudGl0eVNldDtcblx0Y29uc3QgcGFnZU1hbmlmZXN0U2V0dGluZ3M6IE1hbmlmZXN0V3JhcHBlciA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCk7XG5cdGNvbnN0IGhhc0Fic29sdXRlUGF0aCA9IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgubGVuZ3RoID09PSAwLFxuXHRcdHAxM25Nb2RlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBnZXRQMTNuTW9kZSh2aXN1YWxpemF0aW9uUGF0aCwgY29udmVydGVyQ29udGV4dCwgdGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24pLFxuXHRcdGlkID0gbmF2aWdhdGlvblByb3BlcnR5UGF0aCA/IFRhYmxlSUQodmlzdWFsaXphdGlvblBhdGgpIDogVGFibGVJRChjb252ZXJ0ZXJDb250ZXh0LmdldENvbnRleHRQYXRoKCksIFwiTGluZUl0ZW1cIik7XG5cdGNvbnN0IHRhcmdldENhcGFiaWxpdGllcyA9IGdldENhcGFiaWxpdHlSZXN0cmljdGlvbihjb252ZXJ0ZXJDb250ZXh0KTtcblx0Y29uc3Qgc2VsZWN0aW9uTW9kZSA9IGdldFNlbGVjdGlvbk1vZGUobGluZUl0ZW1Bbm5vdGF0aW9uLCB2aXN1YWxpemF0aW9uUGF0aCwgY29udmVydGVyQ29udGV4dCwgaGFzQWJzb2x1dGVQYXRoLCB0YXJnZXRDYXBhYmlsaXRpZXMpO1xuXHRsZXQgdGhyZXNob2xkID0gbmF2aWdhdGlvblByb3BlcnR5UGF0aCA/IDEwIDogMzA7XG5cdGlmIChwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbj8uTWF4SXRlbXMpIHtcblx0XHR0aHJlc2hvbGQgPSBwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbi5NYXhJdGVtcy52YWx1ZU9mKCkgYXMgbnVtYmVyO1xuXHR9XG5cdGNvbnN0IG5hdmlnYXRpb25UYXJnZXRQYXRoID0gZ2V0TmF2aWdhdGlvblRhcmdldFBhdGgoY29udmVydGVyQ29udGV4dCwgbmF2aWdhdGlvblByb3BlcnR5UGF0aCk7XG5cdGNvbnN0IG5hdmlnYXRpb25TZXR0aW5ncyA9IHBhZ2VNYW5pZmVzdFNldHRpbmdzLmdldE5hdmlnYXRpb25Db25maWd1cmF0aW9uKG5hdmlnYXRpb25UYXJnZXRQYXRoKTtcblx0Y29uc3QgY3JlYXRpb25CZWhhdmlvdXIgPSBfZ2V0Q3JlYXRpb25CZWhhdmlvdXIobGluZUl0ZW1Bbm5vdGF0aW9uLCB0YWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbiwgY29udmVydGVyQ29udGV4dCwgbmF2aWdhdGlvblNldHRpbmdzKTtcblx0bGV0IGlzUGFyZW50RGVsZXRhYmxlOiBhbnksIHBhcmVudEVudGl0eVNldERlbGV0YWJsZTtcblx0aWYgKGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5PYmplY3RQYWdlKSB7XG5cdFx0aXNQYXJlbnREZWxldGFibGUgPSBpc1BhdGhEZWxldGFibGUoY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCksIHVuZGVmaW5lZCwgdHJ1ZSk7XG5cdFx0aWYgKGlzUGFyZW50RGVsZXRhYmxlPy5jdXJyZW50RW50aXR5UmVzdHJpY3Rpb24pIHtcblx0XHRcdHBhcmVudEVudGl0eVNldERlbGV0YWJsZSA9IHVuZGVmaW5lZDtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cGFyZW50RW50aXR5U2V0RGVsZXRhYmxlID0gaXNQYXJlbnREZWxldGFibGUgPyBjb21waWxlQmluZGluZyhpc1BhcmVudERlbGV0YWJsZSwgdHJ1ZSkgOiBpc1BhcmVudERlbGV0YWJsZTtcblx0XHR9XG5cdH1cblx0Y29uc3QgZGF0YU1vZGVsT2JqZWN0UGF0aCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpO1xuXHRjb25zdCBpc0luc2VydGFibGU6IEV4cHJlc3Npb248Ym9vbGVhbj4gPSBpc1BhdGhJbnNlcnRhYmxlKGRhdGFNb2RlbE9iamVjdFBhdGgpO1xuXHRjb25zdCB2YXJpYW50TWFuYWdlbWVudDogVmFyaWFudE1hbmFnZW1lbnRUeXBlID0gcGFnZU1hbmlmZXN0U2V0dGluZ3MuZ2V0VmFyaWFudE1hbmFnZW1lbnQoKTtcblx0Y29uc3QgYk1hc3NFZGl0VmlzaWJsZTogYW55ID0gZ2V0VmlzaWJpbGl0eU1hc3NFZGl0KGNvbnZlcnRlckNvbnRleHQsIHRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uLCB0YXJnZXRDYXBhYmlsaXRpZXMsIHNlbGVjdGlvbk1vZGUpO1xuXG5cdHJldHVybiB7XG5cdFx0aWQ6IGlkLFxuXHRcdGVudGl0eU5hbWU6IGVudGl0eVNldCA/IGVudGl0eVNldC5uYW1lIDogXCJcIixcblx0XHRjb2xsZWN0aW9uOiBnZXRUYXJnZXRPYmplY3RQYXRoKGNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpKSxcblx0XHRuYXZpZ2F0aW9uUGF0aDogbmF2aWdhdGlvblByb3BlcnR5UGF0aCxcblx0XHRyb3c6IF9nZXRSb3dDb25maWd1cmF0aW9uUHJvcGVydHkoXG5cdFx0XHRsaW5lSXRlbUFubm90YXRpb24sXG5cdFx0XHR2aXN1YWxpemF0aW9uUGF0aCxcblx0XHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRuYXZpZ2F0aW9uU2V0dGluZ3MsXG5cdFx0XHRuYXZpZ2F0aW9uVGFyZ2V0UGF0aFxuXHRcdCksXG5cdFx0cDEzbk1vZGU6IHAxM25Nb2RlLFxuXHRcdHNob3c6IHtcblx0XHRcdFwiZGVsZXRlXCI6IGdldERlbGV0ZVZpc2libGUoY29udmVydGVyQ29udGV4dCwgbmF2aWdhdGlvblByb3BlcnR5UGF0aCwgdGFyZ2V0Q2FwYWJpbGl0aWVzLmlzRGVsZXRhYmxlLCB2aWV3Q29uZmlndXJhdGlvbiksXG5cdFx0XHRjcmVhdGU6IGNvbXBpbGVCaW5kaW5nKGdldENyZWF0ZVZpc2libGUoY29udmVydGVyQ29udGV4dCwgY3JlYXRpb25CZWhhdmlvdXI/Lm1vZGUsIGlzSW5zZXJ0YWJsZSkpLFxuXHRcdFx0cGFzdGU6IGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRnZXRQYXN0ZUVuYWJsZWQoXG5cdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dCxcblx0XHRcdFx0XHRjcmVhdGlvbkJlaGF2aW91cixcblx0XHRcdFx0XHRpc0luc2VydGFibGUsXG5cdFx0XHRcdFx0dGFibGVNYW5pZmVzdENvbmZpZ3VyYXRpb24uZW5hYmxlUGFzdGUsXG5cdFx0XHRcdFx0dmlld0NvbmZpZ3VyYXRpb25cblx0XHRcdFx0KVxuXHRcdFx0KSxcblx0XHRcdG1hc3NFZGl0OiB7XG5cdFx0XHRcdHZpc2libGU6IGJNYXNzRWRpdFZpc2libGUsXG5cdFx0XHRcdGVuYWJsZWQ6IGdldEVuYWJsZW1lbnRNYXNzRWRpdChjb252ZXJ0ZXJDb250ZXh0LCBiTWFzc0VkaXRWaXNpYmxlKVxuXHRcdFx0fVxuXHRcdH0sXG5cdFx0ZGlzcGxheU1vZGU6IGlzSW5EaXNwbGF5TW9kZShjb252ZXJ0ZXJDb250ZXh0LCB2aWV3Q29uZmlndXJhdGlvbiksXG5cdFx0Y3JlYXRlOiBjcmVhdGlvbkJlaGF2aW91cixcblx0XHRzZWxlY3Rpb25Nb2RlOiBzZWxlY3Rpb25Nb2RlLFxuXHRcdGF1dG9CaW5kT25Jbml0OlxuXHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSAhPT0gVGVtcGxhdGVUeXBlLkxpc3RSZXBvcnQgJiZcblx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgIT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2UgJiZcblx0XHRcdCEodmlld0NvbmZpZ3VyYXRpb24gJiYgY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKHZpZXdDb25maWd1cmF0aW9uKSksXG5cdFx0dmFyaWFudE1hbmFnZW1lbnQ6IHZhcmlhbnRNYW5hZ2VtZW50ID09PSBcIkNvbnRyb2xcIiAmJiAhcDEzbk1vZGUgPyBWYXJpYW50TWFuYWdlbWVudFR5cGUuTm9uZSA6IHZhcmlhbnRNYW5hZ2VtZW50LFxuXHRcdHRocmVzaG9sZDogdGhyZXNob2xkLFxuXHRcdHNvcnRDb25kaXRpb25zOiBnZXRTb3J0Q29uZGl0aW9ucyhwcmVzZW50YXRpb25WYXJpYW50QW5ub3RhdGlvbiwgY29sdW1ucyksXG5cdFx0cGFyZW50RW50aXR5RGVsZXRlRW5hYmxlZDogcGFyZW50RW50aXR5U2V0RGVsZXRhYmxlLFxuXHRcdHRpdGxlOiB0aXRsZVxuXHR9O1xufVxuXG5mdW5jdGlvbiBpc0luRGlzcGxheU1vZGUoY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCwgdmlld0NvbmZpZ3VyYXRpb24/OiBWaWV3UGF0aENvbmZpZ3VyYXRpb24pOiBib29sZWFuIHtcblx0Y29uc3QgdGVtcGxhdGVUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKTtcblx0aWYgKFxuXHRcdHRlbXBsYXRlVHlwZSA9PT0gVGVtcGxhdGVUeXBlLkxpc3RSZXBvcnQgfHxcblx0XHR0ZW1wbGF0ZVR5cGUgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2UgfHxcblx0XHQodmlld0NvbmZpZ3VyYXRpb24gJiYgY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKHZpZXdDb25maWd1cmF0aW9uKSlcblx0KSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0Ly8gdXBkYXRhYmxlIHdpbGwgYmUgaGFuZGxlZCBhdCB0aGUgcHJvcGVydHkgbGV2ZWxcblx0cmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFNwbGl0IHRoZSB2aXN1YWxpemF0aW9uIHBhdGggaW50byB0aGUgbmF2aWdhdGlvbiBwcm9wZXJ0eSBwYXRoIGFuZCBhbm5vdGF0aW9uLlxuICpcbiAqIEBwYXJhbSB2aXN1YWxpemF0aW9uUGF0aFxuICogQHJldHVybnMge29iamVjdH1cbiAqL1xuZnVuY3Rpb24gc3BsaXRQYXRoKHZpc3VhbGl6YXRpb25QYXRoOiBzdHJpbmcpIHtcblx0bGV0IFtuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLCBhbm5vdGF0aW9uUGF0aF0gPSB2aXN1YWxpemF0aW9uUGF0aC5zcGxpdChcIkBcIik7XG5cblx0aWYgKG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgubGFzdEluZGV4T2YoXCIvXCIpID09PSBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLmxlbmd0aCAtIDEpIHtcblx0XHQvLyBEcm9wIHRyYWlsaW5nIHNsYXNoXG5cdFx0bmF2aWdhdGlvblByb3BlcnR5UGF0aCA9IG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGguc3Vic3RyKDAsIG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgubGVuZ3RoIC0gMSk7XG5cdH1cblx0cmV0dXJuIHsgbmF2aWdhdGlvblByb3BlcnR5UGF0aCwgYW5ub3RhdGlvblBhdGggfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNlbGVjdGlvblZhcmlhbnRDb25maWd1cmF0aW9uKFxuXHRzZWxlY3Rpb25WYXJpYW50UGF0aDogc3RyaW5nLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBTZWxlY3Rpb25WYXJpYW50Q29uZmlndXJhdGlvbiB8IHVuZGVmaW5lZCB7XG5cdGNvbnN0IHJlc29sdmVkVGFyZ2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlQW5ub3RhdGlvbihzZWxlY3Rpb25WYXJpYW50UGF0aCk7XG5cdGNvbnN0IHNlbGVjdGlvbjogU2VsZWN0aW9uVmFyaWFudFR5cGUgPSByZXNvbHZlZFRhcmdldC5hbm5vdGF0aW9uIGFzIFNlbGVjdGlvblZhcmlhbnRUeXBlO1xuXG5cdGlmIChzZWxlY3Rpb24pIHtcblx0XHRjb25zdCBwcm9wZXJ0eU5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuXHRcdHNlbGVjdGlvbi5TZWxlY3RPcHRpb25zPy5mb3JFYWNoKChzZWxlY3RPcHRpb246IFNlbGVjdE9wdGlvblR5cGUpID0+IHtcblx0XHRcdGNvbnN0IHByb3BlcnR5TmFtZTogYW55ID0gc2VsZWN0T3B0aW9uLlByb3BlcnR5TmFtZTtcblx0XHRcdGNvbnN0IFByb3BlcnR5UGF0aDogc3RyaW5nID0gcHJvcGVydHlOYW1lLnZhbHVlO1xuXHRcdFx0aWYgKHByb3BlcnR5TmFtZXMuaW5kZXhPZihQcm9wZXJ0eVBhdGgpID09PSAtMSkge1xuXHRcdFx0XHRwcm9wZXJ0eU5hbWVzLnB1c2goUHJvcGVydHlQYXRoKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGV4dDogc2VsZWN0aW9uPy5UZXh0Py50b1N0cmluZygpLFxuXHRcdFx0cHJvcGVydHlOYW1lczogcHJvcGVydHlOYW1lc1xuXHRcdH07XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRhYmxlTWFuaWZlc3RDb25maWd1cmF0aW9uKFxuXHRsaW5lSXRlbUFubm90YXRpb246IExpbmVJdGVtIHwgdW5kZWZpbmVkLFxuXHR2aXN1YWxpemF0aW9uUGF0aDogc3RyaW5nLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRjaGVja0NvbmRlbnNlZExheW91dDogYm9vbGVhbiA9IGZhbHNlXG4pOiBUYWJsZUNvbnRyb2xDb25maWd1cmF0aW9uIHtcblx0Y29uc3QgdGFibGVNYW5pZmVzdFNldHRpbmdzOiBUYWJsZU1hbmlmZXN0Q29uZmlndXJhdGlvbiA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RDb250cm9sQ29uZmlndXJhdGlvbih2aXN1YWxpemF0aW9uUGF0aCk7XG5cdGNvbnN0IHRhYmxlU2V0dGluZ3MgPSAodGFibGVNYW5pZmVzdFNldHRpbmdzICYmIHRhYmxlTWFuaWZlc3RTZXR0aW5ncy50YWJsZVNldHRpbmdzKSB8fCB7fTtcblx0bGV0IHF1aWNrU2VsZWN0aW9uVmFyaWFudDogYW55O1xuXHRjb25zdCBxdWlja0ZpbHRlclBhdGhzOiB7IGFubm90YXRpb25QYXRoOiBzdHJpbmcgfVtdID0gW107XG5cdGxldCBlbmFibGVFeHBvcnQgPSB0cnVlO1xuXHRsZXQgY3JlYXRpb25Nb2RlID0gQ3JlYXRpb25Nb2RlLk5ld1BhZ2U7XG5cdGxldCBmaWx0ZXJzO1xuXHRsZXQgY3JlYXRlQXRFbmQgPSB0cnVlO1xuXHRsZXQgZGlzYWJsZUFkZFJvd0J1dHRvbkZvckVtcHR5RGF0YSA9IGZhbHNlO1xuXHRsZXQgY3VzdG9tVmFsaWRhdGlvbkZ1bmN0aW9uO1xuXHRsZXQgY29uZGVuc2VkVGFibGVMYXlvdXQgPSBmYWxzZTtcblx0bGV0IGhpZGVUYWJsZVRpdGxlID0gZmFsc2U7XG5cdGxldCB0YWJsZVR5cGU6IFRhYmxlVHlwZSA9IFwiUmVzcG9uc2l2ZVRhYmxlXCI7XG5cdGxldCBlbmFibGVGdWxsU2NyZWVuID0gZmFsc2U7XG5cdGxldCBzZWxlY3Rpb25MaW1pdCA9IDIwMDtcblx0bGV0IGVuYWJsZVBhc3RlID0gY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gXCJPYmplY3RQYWdlXCI7XG5cdGNvbnN0IGlzQ29uZGVuc2VkVGFibGVMYXlvdXRDb21wbGlhbnQgPSBjaGVja0NvbmRlbnNlZExheW91dCAmJiBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmlzQ29uZGVuc2VkTGF5b3V0Q29tcGxpYW50KCk7XG5cdGNvbnN0IGVudGl0eVR5cGUgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKTtcblx0Y29uc3QgYWdncmVnYXRpb25IZWxwZXIgPSBuZXcgQWdncmVnYXRpb25IZWxwZXIoZW50aXR5VHlwZSwgY29udmVydGVyQ29udGV4dCk7XG5cdGlmIChsaW5lSXRlbUFubm90YXRpb24pIHtcblx0XHRjb25zdCB0YXJnZXRFbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRBbm5vdGF0aW9uRW50aXR5VHlwZShsaW5lSXRlbUFubm90YXRpb24pO1xuXHRcdHRhYmxlU2V0dGluZ3M/LnF1aWNrVmFyaWFudFNlbGVjdGlvbj8ucGF0aHM/LmZvckVhY2goKHBhdGg6IHsgYW5ub3RhdGlvblBhdGg6IHN0cmluZyB9KSA9PiB7XG5cdFx0XHRxdWlja1NlbGVjdGlvblZhcmlhbnQgPSB0YXJnZXRFbnRpdHlUeXBlLnJlc29sdmVQYXRoKFwiQFwiICsgcGF0aC5hbm5vdGF0aW9uUGF0aCk7XG5cdFx0XHQvLyBxdWlja1NlbGVjdGlvblZhcmlhbnQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGVBbm5vdGF0aW9uKHBhdGguYW5ub3RhdGlvblBhdGgpO1xuXHRcdFx0aWYgKHF1aWNrU2VsZWN0aW9uVmFyaWFudCkge1xuXHRcdFx0XHRxdWlja0ZpbHRlclBhdGhzLnB1c2goeyBhbm5vdGF0aW9uUGF0aDogcGF0aC5hbm5vdGF0aW9uUGF0aCB9KTtcblx0XHRcdH1cblx0XHRcdGZpbHRlcnMgPSB7XG5cdFx0XHRcdHF1aWNrRmlsdGVyczoge1xuXHRcdFx0XHRcdGVuYWJsZWQ6XG5cdFx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuTGlzdFJlcG9ydFxuXHRcdFx0XHRcdFx0XHQ/IFwiez0gJHtwYWdlSW50ZXJuYWw+aGFzUGVuZGluZ0ZpbHRlcnN9ICE9PSB0cnVlfVwiXG5cdFx0XHRcdFx0XHRcdDogdHJ1ZSxcblx0XHRcdFx0XHRzaG93Q291bnRzOiB0YWJsZVNldHRpbmdzPy5xdWlja1ZhcmlhbnRTZWxlY3Rpb24/LnNob3dDb3VudHMsXG5cdFx0XHRcdFx0cGF0aHM6IHF1aWNrRmlsdGVyUGF0aHNcblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9KTtcblx0XHRjcmVhdGlvbk1vZGUgPSB0YWJsZVNldHRpbmdzLmNyZWF0aW9uTW9kZT8ubmFtZSB8fCBjcmVhdGlvbk1vZGU7XG5cdFx0Y3JlYXRlQXRFbmQgPSB0YWJsZVNldHRpbmdzLmNyZWF0aW9uTW9kZT8uY3JlYXRlQXRFbmQgIT09IHVuZGVmaW5lZCA/IHRhYmxlU2V0dGluZ3MuY3JlYXRpb25Nb2RlPy5jcmVhdGVBdEVuZCA6IHRydWU7XG5cdFx0Y3VzdG9tVmFsaWRhdGlvbkZ1bmN0aW9uID0gdGFibGVTZXR0aW5ncy5jcmVhdGlvbk1vZGU/LmN1c3RvbVZhbGlkYXRpb25GdW5jdGlvbjtcblx0XHQvLyBpZiBhIGN1c3RvbSB2YWxpZGF0aW9uIGZ1bmN0aW9uIGlzIHByb3ZpZGVkLCBkaXNhYmxlQWRkUm93QnV0dG9uRm9yRW1wdHlEYXRhIHNob3VsZCBub3QgYmUgY29uc2lkZXJlZCwgaS5lLiBzZXQgdG8gZmFsc2Vcblx0XHRkaXNhYmxlQWRkUm93QnV0dG9uRm9yRW1wdHlEYXRhID0gIWN1c3RvbVZhbGlkYXRpb25GdW5jdGlvbiA/ICEhdGFibGVTZXR0aW5ncy5jcmVhdGlvbk1vZGU/LmRpc2FibGVBZGRSb3dCdXR0b25Gb3JFbXB0eURhdGEgOiBmYWxzZTtcblx0XHRjb25kZW5zZWRUYWJsZUxheW91dCA9IHRhYmxlU2V0dGluZ3MuY29uZGVuc2VkVGFibGVMYXlvdXQgIT09IHVuZGVmaW5lZCA/IHRhYmxlU2V0dGluZ3MuY29uZGVuc2VkVGFibGVMYXlvdXQgOiBmYWxzZTtcblx0XHRoaWRlVGFibGVUaXRsZSA9ICEhdGFibGVTZXR0aW5ncy5xdWlja1ZhcmlhbnRTZWxlY3Rpb24/LmhpZGVUYWJsZVRpdGxlO1xuXHRcdHRhYmxlVHlwZSA9IHRhYmxlU2V0dGluZ3M/LnR5cGUgfHwgXCJSZXNwb25zaXZlVGFibGVcIjtcblx0XHRpZiAoY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSAhPT0gXCJPYmplY3RQYWdlXCIpIHtcblx0XHRcdGlmICh0YWJsZVNldHRpbmdzPy50eXBlID09PSBcIkFuYWx5dGljYWxUYWJsZVwiICYmICFhZ2dyZWdhdGlvbkhlbHBlci5pc0FuYWx5dGljc1N1cHBvcnRlZCgpKSB7XG5cdFx0XHRcdHRhYmxlVHlwZSA9IFwiR3JpZFRhYmxlXCI7XG5cdFx0XHR9XG5cdFx0XHRpZiAoIXRhYmxlU2V0dGluZ3M/LnR5cGUpIHtcblx0XHRcdFx0aWYgKGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkuaXNEZXNrdG9wKCkgJiYgYWdncmVnYXRpb25IZWxwZXIuaXNBbmFseXRpY3NTdXBwb3J0ZWQoKSkge1xuXHRcdFx0XHRcdHRhYmxlVHlwZSA9IFwiQW5hbHl0aWNhbFRhYmxlXCI7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGFibGVUeXBlID0gXCJSZXNwb25zaXZlVGFibGVcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRlbmFibGVGdWxsU2NyZWVuID0gdGFibGVTZXR0aW5ncy5lbmFibGVGdWxsU2NyZWVuIHx8IGZhbHNlO1xuXHRcdGlmIChlbmFibGVGdWxsU2NyZWVuID09PSB0cnVlICYmIGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5MaXN0UmVwb3J0KSB7XG5cdFx0XHRlbmFibGVGdWxsU2NyZWVuID0gZmFsc2U7XG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0XHRcdC5nZXREaWFnbm9zdGljcygpXG5cdFx0XHRcdC5hZGRJc3N1ZShJc3N1ZUNhdGVnb3J5Lk1hbmlmZXN0LCBJc3N1ZVNldmVyaXR5LkxvdywgSXNzdWVUeXBlLkZVTExTQ1JFRU5NT0RFX05PVF9PTl9MSVNUUkVQT1JUKTtcblx0XHR9XG5cdFx0c2VsZWN0aW9uTGltaXQgPSB0YWJsZVNldHRpbmdzLnNlbGVjdEFsbCA9PT0gdHJ1ZSB8fCB0YWJsZVNldHRpbmdzLnNlbGVjdGlvbkxpbWl0ID09PSAwID8gMCA6IHRhYmxlU2V0dGluZ3Muc2VsZWN0aW9uTGltaXQgfHwgMjAwO1xuXHRcdGVuYWJsZVBhc3RlID0gY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gXCJPYmplY3RQYWdlXCIgJiYgdGFibGVTZXR0aW5ncy5lbmFibGVQYXN0ZSAhPT0gZmFsc2U7XG5cdFx0ZW5hYmxlRXhwb3J0ID1cblx0XHRcdHRhYmxlU2V0dGluZ3MuZW5hYmxlRXhwb3J0ICE9PSB1bmRlZmluZWRcblx0XHRcdFx0PyB0YWJsZVNldHRpbmdzLmVuYWJsZUV4cG9ydFxuXHRcdFx0XHQ6IGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgIT09IFwiT2JqZWN0UGFnZVwiIHx8IGVuYWJsZVBhc3RlO1xuXHR9XG5cdHJldHVybiB7XG5cdFx0ZmlsdGVyczogZmlsdGVycyxcblx0XHR0eXBlOiB0YWJsZVR5cGUsXG5cdFx0ZW5hYmxlRnVsbFNjcmVlbjogZW5hYmxlRnVsbFNjcmVlbixcblx0XHRoZWFkZXJWaXNpYmxlOiAhKHF1aWNrU2VsZWN0aW9uVmFyaWFudCAmJiBoaWRlVGFibGVUaXRsZSksXG5cdFx0ZW5hYmxlRXhwb3J0OiBlbmFibGVFeHBvcnQsXG5cdFx0Y3JlYXRpb25Nb2RlOiBjcmVhdGlvbk1vZGUsXG5cdFx0Y3JlYXRlQXRFbmQ6IGNyZWF0ZUF0RW5kLFxuXHRcdGRpc2FibGVBZGRSb3dCdXR0b25Gb3JFbXB0eURhdGE6IGRpc2FibGVBZGRSb3dCdXR0b25Gb3JFbXB0eURhdGEsXG5cdFx0Y3VzdG9tVmFsaWRhdGlvbkZ1bmN0aW9uOiBjdXN0b21WYWxpZGF0aW9uRnVuY3Rpb24sXG5cdFx0dXNlQ29uZGVuc2VkVGFibGVMYXlvdXQ6IGNvbmRlbnNlZFRhYmxlTGF5b3V0ICYmIGlzQ29uZGVuc2VkVGFibGVMYXlvdXRDb21wbGlhbnQsXG5cdFx0c2VsZWN0aW9uTGltaXQ6IHNlbGVjdGlvbkxpbWl0LFxuXHRcdGVuYWJsZVBhc3RlOiBlbmFibGVQYXN0ZSxcblx0XHRzaG93Um93Q291bnQ6ICF0YWJsZVNldHRpbmdzPy5xdWlja1ZhcmlhbnRTZWxlY3Rpb24/LnNob3dDb3VudHMsXG5cdFx0ZW5hYmxlTWFzc0VkaXQ6IHRhYmxlU2V0dGluZ3M/LmVuYWJsZU1hc3NFZGl0XG5cdH07XG59XG4iXX0=