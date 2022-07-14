/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../ManifestSettings", "../controls/Common/DataVisualization", "../helpers/ID", "sap/fe/core/converters/controls/Common/Table", "sap/fe/core/converters/controls/Common/Action", "sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/converters/helpers/Key", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/IssueManager", "sap/fe/core/templating/FilterTemplating", "sap/fe/core/templating/DataModelPathHelper", "../helpers/Aggregation", "../controls/Common/KPI"], function (ManifestSettings, DataVisualization, ID, Table, Action, ConfigurableObject, Key, BindingExpression, IssueManager, FilterTemplating, DataModelPathHelper, Aggregation, KPI) {
  "use strict";

  var _exports = {};
  var getKPIDefinitions = KPI.getKPIDefinitions;
  var AggregationHelper = Aggregation.AggregationHelper;
  var checkFilterExpressionRestrictions = DataModelPathHelper.checkFilterExpressionRestrictions;
  var getIsRequired = FilterTemplating.getIsRequired;
  var isPropertyFilterable = FilterTemplating.isPropertyFilterable;
  var IssueCategory = IssueManager.IssueCategory;
  var IssueSeverity = IssueManager.IssueSeverity;
  var IssueType = IssueManager.IssueType;
  var compileBinding = BindingExpression.compileBinding;
  var annotationExpression = BindingExpression.annotationExpression;
  var KeyHelper = Key.KeyHelper;
  var Placement = ConfigurableObject.Placement;
  var insertCustomElements = ConfigurableObject.insertCustomElements;
  var getActionsFromManifest = Action.getActionsFromManifest;
  var getSelectionVariantConfiguration = Table.getSelectionVariantConfiguration;
  var VisualFilterID = ID.VisualFilterID;
  var TableID = ID.TableID;
  var FilterVariantManagementID = ID.FilterVariantManagementID;
  var FilterBarID = ID.FilterBarID;
  var CustomTabID = ID.CustomTabID;
  var isSelectionPresentationCompliant = DataVisualization.isSelectionPresentationCompliant;
  var getSelectionVariant = DataVisualization.getSelectionVariant;
  var isPresentationCompliant = DataVisualization.isPresentationCompliant;
  var getSelectionPresentationVariant = DataVisualization.getSelectionPresentationVariant;
  var getDefaultPresentationVariant = DataVisualization.getDefaultPresentationVariant;
  var getDefaultLineItem = DataVisualization.getDefaultLineItem;
  var getDefaultChart = DataVisualization.getDefaultChart;
  var getDataVisualizationConfiguration = DataVisualization.getDataVisualizationConfiguration;
  var TemplateType = ManifestSettings.TemplateType;
  var VisualizationType = ManifestSettings.VisualizationType;
  var AvailabilityType = ManifestSettings.AvailabilityType;

  function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function () { it = o[Symbol.iterator](); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  /**
   * Returns the condition path required for the condition model. It looks like follow:
   * <1:N-PropertyName>*\/<1:1-PropertyName>/<PropertyName>.
   *
   * @param entityType The root EntityTy[e
   * @param propertyPath The full path to the target property
   * @returns {string} The formatted condition path
   */
  var _getConditionPath = function (entityType, propertyPath) {
    var parts = propertyPath.split("/");
    var partialPath;
    var key = "";

    while (parts.length) {
      var part = parts.shift();
      partialPath = partialPath ? partialPath + "/" + part : part;
      var property = entityType.resolvePath(partialPath);

      if (property._type === "NavigationProperty" && property.isCollection) {
        part += "*";
      }

      key = key ? key + "/" + part : part;
    }

    return key;
  };

  var _createFilterSelectionField = function (entityType, property, fullPropertyPath, includeHidden, converterContext) {
    var _property$annotations, _property$annotations2, _property$annotations3;

    // ignore complex property types and hidden annotated ones
    if (property !== undefined && property.targetType === undefined && (includeHidden || ((_property$annotations = property.annotations) === null || _property$annotations === void 0 ? void 0 : (_property$annotations2 = _property$annotations.UI) === null || _property$annotations2 === void 0 ? void 0 : (_property$annotations3 = _property$annotations2.Hidden) === null || _property$annotations3 === void 0 ? void 0 : _property$annotations3.valueOf()) !== true)) {
      var _property$annotations4, _property$annotations5, _property$annotations6, _property$annotations7, _property$annotations8, _targetEntityType$ann, _targetEntityType$ann2, _targetEntityType$ann3;

      var targetEntityType = converterContext.getAnnotationEntityType(property);
      return {
        key: KeyHelper.getSelectionFieldKeyFromPath(fullPropertyPath),
        annotationPath: converterContext.getAbsoluteAnnotationPath(fullPropertyPath),
        conditionPath: _getConditionPath(entityType, fullPropertyPath),
        availability: ((_property$annotations4 = property.annotations) === null || _property$annotations4 === void 0 ? void 0 : (_property$annotations5 = _property$annotations4.UI) === null || _property$annotations5 === void 0 ? void 0 : (_property$annotations6 = _property$annotations5.HiddenFilter) === null || _property$annotations6 === void 0 ? void 0 : _property$annotations6.valueOf()) === true ? AvailabilityType.Hidden : AvailabilityType.Adaptation,
        label: compileBinding(annotationExpression(((_property$annotations7 = property.annotations.Common) === null || _property$annotations7 === void 0 ? void 0 : (_property$annotations8 = _property$annotations7.Label) === null || _property$annotations8 === void 0 ? void 0 : _property$annotations8.valueOf()) || property.name)),
        group: targetEntityType.name,
        groupLabel: compileBinding(annotationExpression((targetEntityType === null || targetEntityType === void 0 ? void 0 : (_targetEntityType$ann = targetEntityType.annotations) === null || _targetEntityType$ann === void 0 ? void 0 : (_targetEntityType$ann2 = _targetEntityType$ann.Common) === null || _targetEntityType$ann2 === void 0 ? void 0 : (_targetEntityType$ann3 = _targetEntityType$ann2.Label) === null || _targetEntityType$ann3 === void 0 ? void 0 : _targetEntityType$ann3.valueOf()) || targetEntityType.name))
      };
    }

    return undefined;
  };

  var _getSelectionFields = function (entityType, navigationPath, properties, includeHidden, converterContext) {
    var selectionFieldMap = {};

    if (properties) {
      properties.forEach(function (property) {
        var propertyPath = property.name;
        var fullPath = (navigationPath ? navigationPath + "/" : "") + propertyPath;

        var selectionField = _createFilterSelectionField(entityType, property, fullPath, includeHidden, converterContext);

        if (selectionField) {
          selectionFieldMap[fullPath] = selectionField;
        }
      });
    }

    return selectionFieldMap;
  };

  var _getSelectionFieldsByPath = function (entityType, propertyPaths, includeHidden, converterContext) {
    var selectionFields = {};

    if (propertyPaths) {
      propertyPaths.forEach(function (propertyPath) {
        var localSelectionFields;
        var property = entityType.resolvePath(propertyPath);

        if (property === undefined) {
          return;
        }

        if (property._type === "NavigationProperty") {
          // handle navigation properties
          localSelectionFields = _getSelectionFields(entityType, propertyPath, property.targetType.entityProperties, includeHidden, converterContext);
        } else if (property.targetType !== undefined) {
          // handle ComplexType properties
          localSelectionFields = _getSelectionFields(entityType, propertyPath, property.targetType.properties, includeHidden, converterContext);
        } else {
          var navigationPath = propertyPath.includes("/") ? propertyPath.split("/").splice(0, 1).join("/") : "";
          localSelectionFields = _getSelectionFields(entityType, navigationPath, [property], includeHidden, converterContext);
        }

        selectionFields = _objectSpread({}, selectionFields, {}, localSelectionFields);
      });
    }

    return selectionFields;
  };
  /**
   * Enter all DataFields of a given FieldGroup into the filterFacetMap.
   *
   * @param {AnnotationTerm<FieldGroupType>} fieldGroup
   * @returns {Record<string, FilterGroup>} The map of facets for the given fieldGroup
   */


  function getFieldGroupFilterGroups(fieldGroup) {
    var filterFacetMap = {};
    fieldGroup.Data.forEach(function (dataField) {
      if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataField") {
        var _fieldGroup$annotatio, _fieldGroup$annotatio2;

        filterFacetMap[dataField.Value.path] = {
          group: fieldGroup.fullyQualifiedName,
          groupLabel: compileBinding(annotationExpression(fieldGroup.Label || ((_fieldGroup$annotatio = fieldGroup.annotations) === null || _fieldGroup$annotatio === void 0 ? void 0 : (_fieldGroup$annotatio2 = _fieldGroup$annotatio.Common) === null || _fieldGroup$annotatio2 === void 0 ? void 0 : _fieldGroup$annotatio2.Label) || fieldGroup.qualifier)) || fieldGroup.qualifier
        };
      }
    });
    return filterFacetMap;
  }
  /**
   * Retrieves all list report tables.
   * @param {ListReportViewDefinition[]} views The list report views configured in the manifest
   * @returns {TableVisualization[]} The list report table
   */


  function getTableVisualizations(views) {
    var tables = [];
    views.forEach(function (view) {
      if (!view.type) {
        var visualizations = view.secondaryVisualization ? view.secondaryVisualization.visualizations : view.presentation.visualizations;
        visualizations.forEach(function (visualization) {
          if (visualization.type === VisualizationType.Table) {
            tables.push(visualization);
          }
        });
      }
    });
    return tables;
  }
  /**
   * Determines if the FilterBar search field is hidden or not.
   *
   * @param {TableVisualization[]} listReportTables The list report tables
   * @param {ConverterContext} converterContext The converter context
   * @returns {boolean} The information if the FilterBar search field is hidden or not
   */


  function getFilterBarhideBasicSearch(listReportTables, converterContext) {
    if (converterContext.getManifestWrapper().hasMultipleVisualizations() || converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
      return true;
    } // Tries to find a non-analytical table with the main entity set (page entity set) as collection
    // if at least one table matches these conditions, basic search field must be displayed.


    var sContextPath = converterContext.getContextPath();
    return checkAllTableForEntitySetAreAnalytical(listReportTables, sContextPath);
  }
  /**
   * Check that all the tables for a dedicated entityset are configured as analytical table.
   * @param {TableVisualization[]} listReportTables List Report tables
   * @param {string} contextPath
   * @returns {boolean} Is FilterBar search field hidden or not
   */


  function checkAllTableForEntitySetAreAnalytical(listReportTables, contextPath) {
    if (contextPath && listReportTables.length > 0) {
      return listReportTables.every(function (visualization) {
        return visualization.enableAnalytics && contextPath === visualization.annotation.collection;
      });
    }

    return false;
  }
  /**
   * Get all Parameter filterFields in case of a parameterized service.
   * @param {ConverterContext} converterContext
   * @returns {FilterField[]} An array of parameter filterfields
   */


  function _getParameterFields(converterContext) {
    var _parameterEntityType$, _parameterEntityType$2;

    var dataModelObjectPath = converterContext.getDataModelObjectPath();
    var parameterEntityType = dataModelObjectPath.startingEntitySet.entityType;
    var isParameterized = !!((_parameterEntityType$ = parameterEntityType.annotations) === null || _parameterEntityType$ === void 0 ? void 0 : (_parameterEntityType$2 = _parameterEntityType$.Common) === null || _parameterEntityType$2 === void 0 ? void 0 : _parameterEntityType$2.ResultContext);
    var parameterConverterContext = isParameterized && converterContext.getConverterContextFor("/" + dataModelObjectPath.startingEntitySet.name);
    var parameterFields = parameterConverterContext ? parameterEntityType.entityProperties.map(function (property) {
      return _getFilterField({}, property.name, parameterConverterContext, parameterEntityType);
    }) : [];
    return parameterFields;
  }
  /**
   * Retrieve the configuration for the selection fields that will be used within the filter bar
   * This configuration takes into account annotation and the selection variants.
   *
   * @param {ConverterContext} converterContext
   * @param {TableVisualization[]} lrTables
   * @returns {FilterSelectionField[]} An array of selection fields
   */


  var getSelectionFields = function (converterContext) {
    var _entityType$annotatio, _entityType$annotatio2, _entityType$annotatio3, _entityType$annotatio4;

    var lrTables = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    // Fetch all selectionVariants defined in the different visualizations and different views (multi table mode)
    var selectionVariants = getSelectionVariants(lrTables, converterContext); // create a map of properties to be used in selection variants

    var excludedFilterProperties = getExcludedFilterProperties(selectionVariants);
    var entityType = converterContext.getEntityType();
    var filterFacets = (_entityType$annotatio = entityType.annotations.UI) === null || _entityType$annotatio === void 0 ? void 0 : _entityType$annotatio.FilterFacets;
    var filterFacetMap = {};
    var aFieldGroups = converterContext.getAnnotationsByTerm("UI", "com.sap.vocabularies.UI.v1.FieldGroup");

    if (filterFacets === undefined || filterFacets.length < 0) {
      for (var i in aFieldGroups) {
        filterFacetMap = _objectSpread({}, filterFacetMap, {}, getFieldGroupFilterGroups(aFieldGroups[i]));
      }
    } else {
      filterFacetMap = filterFacets.reduce(function (previousValue, filterFacet) {
        for (var _i = 0; _i < filterFacet.Target.$target.Data.length; _i++) {
          var _filterFacet$ID, _filterFacet$Label;

          previousValue[filterFacet.Target.$target.Data[_i].Value.path] = {
            group: filterFacet === null || filterFacet === void 0 ? void 0 : (_filterFacet$ID = filterFacet.ID) === null || _filterFacet$ID === void 0 ? void 0 : _filterFacet$ID.toString(),
            groupLabel: filterFacet === null || filterFacet === void 0 ? void 0 : (_filterFacet$Label = filterFacet.Label) === null || _filterFacet$Label === void 0 ? void 0 : _filterFacet$Label.toString()
          };
        }

        return previousValue;
      }, {});
    }

    var aSelectOptions = [];
    var selectionVariant = getSelectionVariant(entityType, converterContext);

    if (selectionVariant) {
      aSelectOptions = selectionVariant.SelectOptions;
    } // create a map of all potential filter fields based on...


    var filterFields = _objectSpread({}, _getSelectionFields(entityType, "", entityType.entityProperties, false, converterContext), {}, _getSelectionFieldsByPath(entityType, converterContext.getManifestWrapper().getFilterConfiguration().navigationProperties, false, converterContext)); //Filters which has to be added which is part of SV/Default annotations but not present in the SelectionFields


    var defaultFilters = _getDefaultFilterFields(filterFields, aSelectOptions, entityType, converterContext, excludedFilterProperties);

    var parameterFields = _getParameterFields(converterContext); // finally create final list of filter fields by adding the SelectionFields first (order matters)...


    var allFilters = parameterFields.concat(((_entityType$annotatio2 = entityType.annotations) === null || _entityType$annotatio2 === void 0 ? void 0 : (_entityType$annotatio3 = _entityType$annotatio2.UI) === null || _entityType$annotatio3 === void 0 ? void 0 : (_entityType$annotatio4 = _entityType$annotatio3.SelectionFields) === null || _entityType$annotatio4 === void 0 ? void 0 : _entityType$annotatio4.reduce(function (selectionFields, selectionField) {
      var propertyPath = selectionField.value;

      if (!(propertyPath in excludedFilterProperties)) {
        var filterField = _getFilterField(filterFields, propertyPath, converterContext, entityType);

        if (filterField) {
          filterField.group = "";
          filterField.groupLabel = "";
          selectionFields.push(filterField);
        }
      }

      return selectionFields;
    }, [])) || []) // To add the FilterField which is not part of the Selection Fields but the property is mentioned in the Selection Variant
    .concat(defaultFilters || []) // ...and adding remaining filter fields, that are not used in a SelectionVariant (order doesn't matter)
    .concat(Object.keys(filterFields).filter(function (propertyPath) {
      return !(propertyPath in excludedFilterProperties);
    }).map(function (propertyPath) {
      return Object.assign(filterFields[propertyPath], filterFacetMap[propertyPath]);
    }));
    var sContextPath = converterContext.getContextPath(); //if all tables are analytical tables "aggregatable" properties must be excluded

    if (checkAllTableForEntitySetAreAnalytical(lrTables, sContextPath)) {
      // Currently all agregates are root entity properties (no properties coming from navigation) and all
      // tables with same entitySet gets same aggreagte configuration that's why we can use first table into
      // LR to get aggregates (without currency/unit properties since we expect to be able to filter them).
      var aggregates = lrTables[0].aggregates;

      if (aggregates) {
        var aggregatableProperties = Object.keys(aggregates).map(function (aggregateKey) {
          return aggregates[aggregateKey].relativePath;
        });
        allFilters = allFilters.filter(function (filterField) {
          return aggregatableProperties.indexOf(filterField.key) === -1;
        });
      }
    }

    var selectionFields = insertCustomElements(allFilters, getManifestFilterFields(entityType, converterContext), {
      "availability": "overwrite",
      label: "overwrite",
      position: "overwrite",
      template: "overwrite",
      settings: "overwrite",
      visualFilter: "overwrite"
    });
    return selectionFields;
  };

  _exports.getSelectionFields = getSelectionFields;

  var getVisualFilters = function (entityType, converterContext, sPropertyPath, FilterFields) {
    var _entityType$annotatio5, _entityType$annotatio6, _entityType$annotatio7;

    var visualFilter = {};
    (_entityType$annotatio5 = entityType.annotations) === null || _entityType$annotatio5 === void 0 ? void 0 : (_entityType$annotatio6 = _entityType$annotatio5.UI) === null || _entityType$annotatio6 === void 0 ? void 0 : (_entityType$annotatio7 = _entityType$annotatio6.SelectionFields) === null || _entityType$annotatio7 === void 0 ? void 0 : _entityType$annotatio7.map(function (selectionField) {
      if (sPropertyPath === (selectionField === null || selectionField === void 0 ? void 0 : selectionField.value)) {
        var _oVisualFilter$visual;

        var oVisualFilter = FilterFields[sPropertyPath];

        if (oVisualFilter && (oVisualFilter === null || oVisualFilter === void 0 ? void 0 : oVisualFilter.visualFilter) && (oVisualFilter === null || oVisualFilter === void 0 ? void 0 : (_oVisualFilter$visual = oVisualFilter.visualFilter) === null || _oVisualFilter$visual === void 0 ? void 0 : _oVisualFilter$visual.valueList)) {
          var _oVisualFilter$visual2, _selectionField$$targ, _selectionField$$targ2;

          var oVFPath = oVisualFilter === null || oVisualFilter === void 0 ? void 0 : (_oVisualFilter$visual2 = oVisualFilter.visualFilter) === null || _oVisualFilter$visual2 === void 0 ? void 0 : _oVisualFilter$visual2.valueList;
          var annotationQualifierSplit = oVFPath.split("#");
          var qualifierVL = annotationQualifierSplit.length > 1 ? "ValueList#" + annotationQualifierSplit[1] : annotationQualifierSplit[0];
          var valueList = (_selectionField$$targ = selectionField.$target) === null || _selectionField$$targ === void 0 ? void 0 : (_selectionField$$targ2 = _selectionField$$targ.annotations) === null || _selectionField$$targ2 === void 0 ? void 0 : _selectionField$$targ2.Common[qualifierVL];

          if (valueList) {
            var _converterContext$get, _collectionPathConver;

            var collectionPath = valueList === null || valueList === void 0 ? void 0 : valueList.CollectionPath;
            var collectionPathConverterContext = converterContext.getConverterContextFor("/" + (collectionPath || ((_converterContext$get = converterContext.getEntitySet()) === null || _converterContext$get === void 0 ? void 0 : _converterContext$get.name)));
            var valueListParams = valueList === null || valueList === void 0 ? void 0 : valueList.Parameters;
            var outParameter;
            var inParameters = [];

            if (valueListParams) {
              for (var i = 0; i < valueListParams.length; i++) {
                var _LocalDataProperty, _valueListParams$i, _valueListParams$i2, _valueListParams$i3, _valueListParams$i4;

                var localDataProperty = (_LocalDataProperty = valueListParams[i].LocalDataProperty) === null || _LocalDataProperty === void 0 ? void 0 : _LocalDataProperty.value;
                var valueListProperty = valueListParams[i].ValueListProperty;

                if ((((_valueListParams$i = valueListParams[i]) === null || _valueListParams$i === void 0 ? void 0 : _valueListParams$i.$Type) === "com.sap.vocabularies.Common.v1.ValueListParameterInOut" || ((_valueListParams$i2 = valueListParams[i]) === null || _valueListParams$i2 === void 0 ? void 0 : _valueListParams$i2.$Type) === "com.sap.vocabularies.Common.v1.ValueListParameterOut") && sPropertyPath === localDataProperty) {
                  outParameter = valueListParams[i];
                }

                if ((((_valueListParams$i3 = valueListParams[i]) === null || _valueListParams$i3 === void 0 ? void 0 : _valueListParams$i3.$Type) === "com.sap.vocabularies.Common.v1.ValueListParameterInOut" || ((_valueListParams$i4 = valueListParams[i]) === null || _valueListParams$i4 === void 0 ? void 0 : _valueListParams$i4.$Type) === "com.sap.vocabularies.Common.v1.ValueListParameterIn") && sPropertyPath !== localDataProperty) {
                  var bNotFilterable = isPropertyFilterable(collectionPathConverterContext, valueListProperty);

                  if (!bNotFilterable) {
                    inParameters.push({
                      localDataProperty: localDataProperty,
                      valueListProperty: valueListProperty
                    });
                  }
                }
              }
            }

            if (inParameters && inParameters.length) {
              inParameters.forEach(function (oInParameter) {
                var mainEntitySetInMappingAllowedExpression = compileBinding(checkFilterExpressionRestrictions(converterContext.getConverterContextFor(converterContext.getAbsoluteAnnotationPath(oInParameter === null || oInParameter === void 0 ? void 0 : oInParameter.localDataProperty)).getDataModelObjectPath(), ["SingleValue"]));
                var valueListEntitySetInMappingAllowedExpression = compileBinding(checkFilterExpressionRestrictions(collectionPathConverterContext.getConverterContextFor(collectionPathConverterContext.getAbsoluteAnnotationPath(oInParameter === null || oInParameter === void 0 ? void 0 : oInParameter.valueListProperty)).getDataModelObjectPath(), ["SingleValue"]));

                if (valueListEntitySetInMappingAllowedExpression === "true" && mainEntitySetInMappingAllowedExpression === "false") {
                  throw new Error("FilterRestrictions of " + sPropertyPath + " in MainEntitySet and ValueListEntitySet are different");
                }
              });
            }

            var pvQualifier = valueList === null || valueList === void 0 ? void 0 : valueList.PresentationVariantQualifier;
            var svQualifier = valueList === null || valueList === void 0 ? void 0 : valueList.SelectionVariantQualifier;
            var pvAnnotation = collectionPathConverterContext === null || collectionPathConverterContext === void 0 ? void 0 : (_collectionPathConver = collectionPathConverterContext.getEntityTypeAnnotation("@UI.PresentationVariant#" + pvQualifier)) === null || _collectionPathConver === void 0 ? void 0 : _collectionPathConver.annotation;
            var aggregationHelper = new AggregationHelper(collectionPathConverterContext.getEntityType(), collectionPathConverterContext);

            if (!aggregationHelper.isAnalyticsSupported()) {
              return;
            }

            if (pvAnnotation) {
              var _collectionPathConver2;

              var aVisualizations = pvAnnotation === null || pvAnnotation === void 0 ? void 0 : pvAnnotation.Visualizations;
              var contextPath = "/" + (collectionPathConverterContext === null || collectionPathConverterContext === void 0 ? void 0 : (_collectionPathConver2 = collectionPathConverterContext.getEntitySet()) === null || _collectionPathConver2 === void 0 ? void 0 : _collectionPathConver2.name);
              visualFilter.contextPath = contextPath;
              var chartAnnotation;

              for (var _i2 = 0; _i2 < aVisualizations.length; _i2++) {
                var _aVisualizations$_i2$;

                if (((_aVisualizations$_i2$ = aVisualizations[_i2].$target) === null || _aVisualizations$_i2$ === void 0 ? void 0 : _aVisualizations$_i2$.term) === "com.sap.vocabularies.UI.v1.Chart") {
                  chartAnnotation = aVisualizations[_i2];
                  break;
                }
              }

              if (chartAnnotation) {
                var _chartAnnotation, _chartAnnotation$$tar, _chartAnnotation$$tar2, _chartAnnotation$$tar3, _chartAnnotation$$tar4, _chartAnnotation$$tar5, _chartAnnotation$$tar6, _chartAnnotation2, _chartAnnotation2$$ta, _chartAnnotation2$$ta2, _chartAnnotation2$$ta3, _chartAnnotation2$$ta4, _chartAnnotation2$$ta5, _chartAnnotation2$$ta6;

                var _bgetVFAggregation = _checkVFAggregation(collectionPathConverterContext, chartAnnotation, aggregationHelper);

                if (!_bgetVFAggregation) {
                  return;
                }

                var bDimensionHidden = (_chartAnnotation = chartAnnotation) === null || _chartAnnotation === void 0 ? void 0 : (_chartAnnotation$$tar = _chartAnnotation.$target) === null || _chartAnnotation$$tar === void 0 ? void 0 : (_chartAnnotation$$tar2 = _chartAnnotation$$tar.Dimensions[0]) === null || _chartAnnotation$$tar2 === void 0 ? void 0 : (_chartAnnotation$$tar3 = _chartAnnotation$$tar2.$target) === null || _chartAnnotation$$tar3 === void 0 ? void 0 : (_chartAnnotation$$tar4 = _chartAnnotation$$tar3.annotations) === null || _chartAnnotation$$tar4 === void 0 ? void 0 : (_chartAnnotation$$tar5 = _chartAnnotation$$tar4.UI) === null || _chartAnnotation$$tar5 === void 0 ? void 0 : (_chartAnnotation$$tar6 = _chartAnnotation$$tar5.Hidden) === null || _chartAnnotation$$tar6 === void 0 ? void 0 : _chartAnnotation$$tar6.valueOf();
                var bDimensionHiddenFilter = (_chartAnnotation2 = chartAnnotation) === null || _chartAnnotation2 === void 0 ? void 0 : (_chartAnnotation2$$ta = _chartAnnotation2.$target) === null || _chartAnnotation2$$ta === void 0 ? void 0 : (_chartAnnotation2$$ta2 = _chartAnnotation2$$ta.Dimensions[0]) === null || _chartAnnotation2$$ta2 === void 0 ? void 0 : (_chartAnnotation2$$ta3 = _chartAnnotation2$$ta2.$target) === null || _chartAnnotation2$$ta3 === void 0 ? void 0 : (_chartAnnotation2$$ta4 = _chartAnnotation2$$ta3.annotations) === null || _chartAnnotation2$$ta4 === void 0 ? void 0 : (_chartAnnotation2$$ta5 = _chartAnnotation2$$ta4.UI) === null || _chartAnnotation2$$ta5 === void 0 ? void 0 : (_chartAnnotation2$$ta6 = _chartAnnotation2$$ta5.HiddenFilter) === null || _chartAnnotation2$$ta6 === void 0 ? void 0 : _chartAnnotation2$$ta6.valueOf();

                if (bDimensionHidden === true || bDimensionHiddenFilter === true) {
                  return;
                } else {
                  if (aVisualizations && aVisualizations.length) {
                    var _chartAnnotation3, _chartAnnotation3$$ta, _chartAnnotation3$$ta2, _outParameter, _outParameter$LocalDa, _collectionPathConver4, _entitySetAnnotations, _entitySetAnnotations2, _visualFilter$require;

                    visualFilter.chartAnnotation = chartAnnotation ? collectionPathConverterContext === null || collectionPathConverterContext === void 0 ? void 0 : collectionPathConverterContext.getAbsoluteAnnotationPath(chartAnnotation.fullyQualifiedName + "/$AnnotationPath/") : undefined;
                    visualFilter.presentationAnnotation = pvAnnotation ? collectionPathConverterContext === null || collectionPathConverterContext === void 0 ? void 0 : collectionPathConverterContext.getAbsoluteAnnotationPath(pvAnnotation.fullyQualifiedName + "/") : undefined;
                    visualFilter.visualFilterId = VisualFilterID((_chartAnnotation3 = chartAnnotation) === null || _chartAnnotation3 === void 0 ? void 0 : (_chartAnnotation3$$ta = _chartAnnotation3.$target) === null || _chartAnnotation3$$ta === void 0 ? void 0 : (_chartAnnotation3$$ta2 = _chartAnnotation3$$ta.Dimensions[0]) === null || _chartAnnotation3$$ta2 === void 0 ? void 0 : _chartAnnotation3$$ta2.value);
                    visualFilter.outParameter = (_outParameter = outParameter) === null || _outParameter === void 0 ? void 0 : (_outParameter$LocalDa = _outParameter.LocalDataProperty) === null || _outParameter$LocalDa === void 0 ? void 0 : _outParameter$LocalDa.value;
                    visualFilter.inParameters = inParameters;
                    var bIsRange = checkFilterExpressionRestrictions(converterContext.getConverterContextFor(converterContext.getAbsoluteAnnotationPath(sPropertyPath)).getDataModelObjectPath(), ["SingleRange", "MultiRange"]);

                    if (compileBinding(bIsRange) === "true") {
                      throw new Error("Range AllowedExpression is not supported for visual filters");
                    }

                    var bIsMainEntitySetSingleSelection = checkFilterExpressionRestrictions(converterContext.getConverterContextFor(converterContext.getAbsoluteAnnotationPath(sPropertyPath)).getDataModelObjectPath(), ["SingleValue"]);
                    visualFilter.multipleSelectionAllowed = compileBinding(!bIsMainEntitySetSingleSelection.value);
                    visualFilter.required = getIsRequired(converterContext, sPropertyPath);
                    var svAnnotation;

                    if (svQualifier) {
                      var _collectionPathConver3;

                      svAnnotation = collectionPathConverterContext === null || collectionPathConverterContext === void 0 ? void 0 : (_collectionPathConver3 = collectionPathConverterContext.getEntityTypeAnnotation("@UI.SelectionVariant#" + svQualifier)) === null || _collectionPathConver3 === void 0 ? void 0 : _collectionPathConver3.annotation;
                      visualFilter.selectionVariantAnnotation = svAnnotation ? collectionPathConverterContext === null || collectionPathConverterContext === void 0 ? void 0 : collectionPathConverterContext.getAbsoluteAnnotationPath(svAnnotation.fullyQualifiedName + "/") : undefined;
                    }

                    var entitySetAnnotations = (_collectionPathConver4 = collectionPathConverterContext.getEntitySet()) === null || _collectionPathConver4 === void 0 ? void 0 : _collectionPathConver4.annotations;
                    var requiredPropertyPaths = [];
                    var requiredProperties = entitySetAnnotations === null || entitySetAnnotations === void 0 ? void 0 : (_entitySetAnnotations = entitySetAnnotations.Capabilities) === null || _entitySetAnnotations === void 0 ? void 0 : (_entitySetAnnotations2 = _entitySetAnnotations.FilterRestrictions) === null || _entitySetAnnotations2 === void 0 ? void 0 : _entitySetAnnotations2.RequiredProperties;

                    if (requiredProperties === null || requiredProperties === void 0 ? void 0 : requiredProperties.length) {
                      requiredProperties.forEach(function (oRequireProperty) {
                        requiredPropertyPaths.push(oRequireProperty.value);
                      });
                    }

                    visualFilter.requiredProperties = requiredPropertyPaths;

                    if ((_visualFilter$require = visualFilter.requiredProperties) === null || _visualFilter$require === void 0 ? void 0 : _visualFilter$require.length) {
                      if (!visualFilter.inParameters || !visualFilter.inParameters.length) {
                        if (!visualFilter.selectionVariantAnnotation) {
                          visualFilter.showOverlayInitially = true;
                        } else {
                          var _svAnnotation;

                          var selectOptions = [];
                          (_svAnnotation = svAnnotation) === null || _svAnnotation === void 0 ? void 0 : _svAnnotation.SelectOptions.forEach(function (oSelectOption) {
                            selectOptions.push(oSelectOption.PropertyName.value);
                          });
                          requiredPropertyPaths = requiredPropertyPaths.sort();
                          selectOptions = selectOptions.sort();
                          visualFilter.showOverlayInitially = requiredPropertyPaths.some(function (sPath) {
                            return selectOptions.indexOf(sPath) === -1;
                          });
                        }
                      } else {
                        visualFilter.showOverlayInitially = false;
                      }
                    } else {
                      visualFilter.showOverlayInitially = false;
                    }
                  }
                }
              } else {
                converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.High, IssueType.MALFORMED_VISUALFILTERS.CHART);
              }
            } else {
              converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.High, IssueType.MALFORMED_VISUALFILTERS.PRESENTATIONVARIANT);
            }
          } else {
            converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.High, IssueType.MALFORMED_VISUALFILTERS.VALUELIST);
          }
        } else {
          converterContext.getDiagnostics().addIssue(IssueCategory.Manifest, IssueSeverity.High, IssueType.MALFORMED_VISUALFILTERS.VALUELIST);
        }
      }
    });

    if (Object.keys(visualFilter).length > 1) {
      return visualFilter;
    }
  };
  /**
   * Checks that measures and dimensions of the visual filter chart can be aggregated and grouped.
   * @param converterContext The converter context
   * @param chartAnnotation The chart annotation
   * @param aggregationHelper The aggregation helper
   * @returns {boolean | undefined }
   */


  var _checkVFAggregation = function (converterContext, chartAnnotation, aggregationHelper) {
    var _chartAnnotation$$tar7, _chartAnnotation$$tar8, _chartAnnotation$$tar9, _chartAnnotation$$tar10, _converterContext$get2, _converterContext$get3, _converterContext$get4, _converterContext$get5, _converterContext$get6, _converterContext$get7, _converterContext$get8, _converterContext$get9;

    var sMeasurePath, bGroupable, bAggregatable;
    var sMeasure = chartAnnotation === null || chartAnnotation === void 0 ? void 0 : (_chartAnnotation$$tar7 = chartAnnotation.$target) === null || _chartAnnotation$$tar7 === void 0 ? void 0 : (_chartAnnotation$$tar8 = _chartAnnotation$$tar7.Measures[0]) === null || _chartAnnotation$$tar8 === void 0 ? void 0 : _chartAnnotation$$tar8.value;
    var sDimension = chartAnnotation === null || chartAnnotation === void 0 ? void 0 : (_chartAnnotation$$tar9 = chartAnnotation.$target) === null || _chartAnnotation$$tar9 === void 0 ? void 0 : (_chartAnnotation$$tar10 = _chartAnnotation$$tar9.Dimensions[0]) === null || _chartAnnotation$$tar10 === void 0 ? void 0 : _chartAnnotation$$tar10.value;
    var customAggregates = aggregationHelper.getCustomAggregateDefinitions();
    var aTransAggregations = converterContext.getAnnotationsByTerm("Analytics", "com.sap.vocabularies.Analytics.v1.AggregatedProperties", [converterContext.getEntityContainer(), converterContext.getEntityType()]);

    if (customAggregates[sMeasure]) {
      sMeasurePath = sMeasure;
    } else if (aTransAggregations && aTransAggregations[0]) {
      var aAggregations = aTransAggregations[0];
      aAggregations.some(function (oAggregate) {
        if (oAggregate.Name === sMeasure) {
          sMeasurePath = oAggregate === null || oAggregate === void 0 ? void 0 : oAggregate.AggregatableProperty.value;
        }
      });
    }

    var aAggregatablePropsFromContainer = ((_converterContext$get2 = converterContext.getEntitySet()) === null || _converterContext$get2 === void 0 ? void 0 : (_converterContext$get3 = _converterContext$get2.annotations) === null || _converterContext$get3 === void 0 ? void 0 : (_converterContext$get4 = _converterContext$get3.Aggregation) === null || _converterContext$get4 === void 0 ? void 0 : (_converterContext$get5 = _converterContext$get4.ApplySupported) === null || _converterContext$get5 === void 0 ? void 0 : _converterContext$get5.AggregatableProperties) || [];
    var aGroupablePropsFromContainer = ((_converterContext$get6 = converterContext.getEntitySet()) === null || _converterContext$get6 === void 0 ? void 0 : (_converterContext$get7 = _converterContext$get6.annotations) === null || _converterContext$get7 === void 0 ? void 0 : (_converterContext$get8 = _converterContext$get7.Aggregation) === null || _converterContext$get8 === void 0 ? void 0 : (_converterContext$get9 = _converterContext$get8.ApplySupported) === null || _converterContext$get9 === void 0 ? void 0 : _converterContext$get9.GroupableProperties) || [];

    if (aAggregatablePropsFromContainer && aAggregatablePropsFromContainer.length) {
      for (var i = 0; i < aAggregatablePropsFromContainer.length; i++) {
        var _aAggregatablePropsFr, _aAggregatablePropsFr2;

        if (((_aAggregatablePropsFr = aAggregatablePropsFromContainer[i]) === null || _aAggregatablePropsFr === void 0 ? void 0 : (_aAggregatablePropsFr2 = _aAggregatablePropsFr.Property) === null || _aAggregatablePropsFr2 === void 0 ? void 0 : _aAggregatablePropsFr2.value) === sMeasurePath) {
          bAggregatable = true;
        }
      }
    }

    if (aGroupablePropsFromContainer && aGroupablePropsFromContainer.length) {
      for (var _i3 = 0; _i3 < aGroupablePropsFromContainer.length; _i3++) {
        var _aGroupablePropsFromC;

        if (((_aGroupablePropsFromC = aGroupablePropsFromContainer[_i3]) === null || _aGroupablePropsFromC === void 0 ? void 0 : _aGroupablePropsFromC.value) === sDimension) {
          bGroupable = true;
        }
      }
    }

    return bAggregatable && bGroupable;
  };

  var _getDefaultFilterFields = function (filterFields, aSelectOptions, entityType, converterContext, excludedFilterProperties) {
    var _entityType$annotatio8, _entityType$annotatio9, _entityType$annotatio10;

    var selectionFields = [];
    var UISelectionFields = {};
    var properties = entityType.entityProperties; // Using entityType instead of entitySet

    (_entityType$annotatio8 = entityType.annotations) === null || _entityType$annotatio8 === void 0 ? void 0 : (_entityType$annotatio9 = _entityType$annotatio8.UI) === null || _entityType$annotatio9 === void 0 ? void 0 : (_entityType$annotatio10 = _entityType$annotatio9.SelectionFields) === null || _entityType$annotatio10 === void 0 ? void 0 : _entityType$annotatio10.forEach(function (SelectionField) {
      UISelectionFields[SelectionField.value] = true;
    });

    if (aSelectOptions && aSelectOptions.length > 0) {
      aSelectOptions === null || aSelectOptions === void 0 ? void 0 : aSelectOptions.forEach(function (selectOption) {
        var _entityType$annotatio11, _entityType$annotatio12, _entityType$annotatio13;

        var propertyName = selectOption.PropertyName;
        var sPropertyPath = propertyName.value;
        var UISelectionFields = {};
        (_entityType$annotatio11 = entityType.annotations) === null || _entityType$annotatio11 === void 0 ? void 0 : (_entityType$annotatio12 = _entityType$annotatio11.UI) === null || _entityType$annotatio12 === void 0 ? void 0 : (_entityType$annotatio13 = _entityType$annotatio12.SelectionFields) === null || _entityType$annotatio13 === void 0 ? void 0 : _entityType$annotatio13.forEach(function (SelectionField) {
          UISelectionFields[SelectionField.value] = true;
        });

        if (!(sPropertyPath in excludedFilterProperties)) {
          if (!(sPropertyPath in UISelectionFields)) {
            var _FilterField = _getFilterField(filterFields, sPropertyPath, converterContext, entityType);

            if (_FilterField) {
              selectionFields.push(_FilterField);
            }
          }
        }
      });
    } else if (properties) {
      properties.forEach(function (property) {
        var _property$annotations9, _property$annotations10;

        var defaultFilterValue = (_property$annotations9 = property.annotations) === null || _property$annotations9 === void 0 ? void 0 : (_property$annotations10 = _property$annotations9.Common) === null || _property$annotations10 === void 0 ? void 0 : _property$annotations10.FilterDefaultValue;
        var PropertyPath = property.name;

        if (!(PropertyPath in excludedFilterProperties)) {
          if (defaultFilterValue && !(PropertyPath in UISelectionFields)) {
            var _FilterField2 = _getFilterField(filterFields, PropertyPath, converterContext, entityType);

            if (_FilterField2) {
              selectionFields.push(_FilterField2);
            }
          }
        }
      });
    }

    return selectionFields;
  };

  var _getFilterField = function (filterFields, propertyPath, converterContext, entityType) {
    var filterField = filterFields[propertyPath];

    if (filterField) {
      delete filterFields[propertyPath];
    } else {
      filterField = _createFilterSelectionField(entityType, entityType.resolvePath(propertyPath), propertyPath, true, converterContext);
    }

    if (!filterField) {
      converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.High, IssueType.MISSING_SELECTIONFIELD);
    } // defined SelectionFields are available by default


    if (filterField) {
      var _entityType$annotatio14, _entityType$annotatio15;

      filterField.availability = AvailabilityType.Default;
      filterField.isParameter = !!((_entityType$annotatio14 = entityType.annotations) === null || _entityType$annotatio14 === void 0 ? void 0 : (_entityType$annotatio15 = _entityType$annotatio14.Common) === null || _entityType$annotatio15 === void 0 ? void 0 : _entityType$annotatio15.ResultContext);
    }

    return filterField;
  };

  var getDefaultSemanticDates = function (filterFields) {
    var defaultSemanticDates = {};

    for (var filterField in filterFields) {
      var _filterFields$filterF, _filterFields$filterF2, _filterFields$filterF3;

      if ((_filterFields$filterF = filterFields[filterField]) === null || _filterFields$filterF === void 0 ? void 0 : (_filterFields$filterF2 = _filterFields$filterF.settings) === null || _filterFields$filterF2 === void 0 ? void 0 : (_filterFields$filterF3 = _filterFields$filterF2.defaultValues) === null || _filterFields$filterF3 === void 0 ? void 0 : _filterFields$filterF3.length) {
        var _filterFields$filterF4, _filterFields$filterF5;

        defaultSemanticDates[filterField] = (_filterFields$filterF4 = filterFields[filterField]) === null || _filterFields$filterF4 === void 0 ? void 0 : (_filterFields$filterF5 = _filterFields$filterF4.settings) === null || _filterFields$filterF5 === void 0 ? void 0 : _filterFields$filterF5.defaultValues;
      }
    }

    return defaultSemanticDates;
  };

  var getFilterField = function (propertyPath, converterContext, entityType) {
    return _getFilterField({}, propertyPath, converterContext, entityType);
  };
  /**
   * Retrieves filter fields from the manifest.
   *
   * @param entityType The current entityType
   * @param converterContext The converter context
   * @returns {Record<string, CustomElementFilterField>} The filter fields defined in the manifest
   */


  _exports.getFilterField = getFilterField;

  var getManifestFilterFields = function (entityType, converterContext) {
    var fbConfig = converterContext.getManifestWrapper().getFilterConfiguration();
    var definedFilterFields = (fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.filterFields) || {};

    var selectionFields = _getSelectionFieldsByPath(entityType, Object.keys(definedFilterFields).map(function (key) {
      return KeyHelper.getPathFromSelectionFieldKey(key);
    }), true, converterContext);

    var filterFields = {};

    for (var sKey in definedFilterFields) {
      var filterField = definedFilterFields[sKey];
      var propertyName = KeyHelper.getPathFromSelectionFieldKey(sKey);
      var selectionField = selectionFields[propertyName];
      var visualFilter = getVisualFilters(entityType, converterContext, sKey, definedFilterFields);
      filterFields[sKey] = {
        key: sKey,
        annotationPath: selectionField === null || selectionField === void 0 ? void 0 : selectionField.annotationPath,
        conditionPath: (selectionField === null || selectionField === void 0 ? void 0 : selectionField.conditionPath) || propertyName,
        template: filterField.template,
        label: filterField.label,
        position: filterField.position || {
          placement: Placement.After
        },
        availability: filterField.availability || AvailabilityType.Default,
        settings: filterField.settings,
        visualFilter: visualFilter
      };
    }

    return filterFields;
  };
  /**
   * Find a visualization annotation that can be used for rendering the list report.
   *
   * @param {EntityType} entityType The current EntityType
   * @param converterContext
   * @param bIsALP
   * @returns {LineItem | PresentationVariantTypeTypes | undefined} A compliant annotation for rendering the list report
   */


  function getCompliantVisualizationAnnotation(entityType, converterContext, bIsALP) {
    var annotationPath = converterContext.getManifestWrapper().getDefaultTemplateAnnotationPath();
    var selectionPresentationVariant = getSelectionPresentationVariant(entityType, annotationPath, converterContext);

    if (annotationPath && selectionPresentationVariant) {
      var _presentationVariant = selectionPresentationVariant.PresentationVariant;

      if (!_presentationVariant) {
        throw new Error("Presentation Variant is not configured in the SPV mentioned in the manifest");
      }

      var bPVComplaint = isPresentationCompliant(selectionPresentationVariant.PresentationVariant);

      if (!bPVComplaint) {
        return undefined;
      }

      if (isSelectionPresentationCompliant(selectionPresentationVariant, bIsALP)) {
        return selectionPresentationVariant;
      }
    }

    if (selectionPresentationVariant) {
      if (isSelectionPresentationCompliant(selectionPresentationVariant, bIsALP)) {
        return selectionPresentationVariant;
      }
    }

    var presentationVariant = getDefaultPresentationVariant(entityType);

    if (presentationVariant) {
      if (isPresentationCompliant(presentationVariant, bIsALP)) {
        return presentationVariant;
      }
    }

    if (!bIsALP) {
      var defaultLineItem = getDefaultLineItem(entityType);

      if (defaultLineItem) {
        return defaultLineItem;
      }
    }

    return undefined;
  }

  var getView = function (viewConverterConfiguration) {
    var config = viewConverterConfiguration;

    if (config.converterContext) {
      var _presentation, _presentation$visuali;

      var converterContext = config.converterContext;
      config = config;
      var presentation = getDataVisualizationConfiguration(config.annotation ? converterContext.getRelativeAnnotationPath(config.annotation.fullyQualifiedName, converterContext.getEntityType()) : "", true, converterContext, config);
      var tableControlId = "";
      var chartControlId = "";
      var title = "";
      var selectionVariantPath = "";

      var isMultipleViewConfiguration = function (config) {
        return config.key !== undefined;
      };

      var createVisualization = function (presentation, isPrimary) {
        var defaultVisualization;

        var _iterator = _createForOfIteratorHelper(presentation.visualizations),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var visualization = _step.value;

            if (isPrimary && visualization.type === VisualizationType.Chart) {
              defaultVisualization = visualization;
              break;
            }

            if (!isPrimary && visualization.type === VisualizationType.Table) {
              defaultVisualization = visualization;
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }

        var presentationCreated = Object.assign({}, presentation);

        if (defaultVisualization) {
          presentationCreated.visualizations = [defaultVisualization];
        }

        return presentationCreated;
      };

      var getPresentation = function (item) {
        var resolvedTarget = converterContext.getEntityTypeAnnotation(item.annotationPath);
        var targetAnnotation = resolvedTarget.annotation;
        converterContext = resolvedTarget.converterContext;
        var annotation = targetAnnotation;
        presentation = getDataVisualizationConfiguration(annotation ? converterContext.getRelativeAnnotationPath(annotation.fullyQualifiedName, converterContext.getEntityType()) : "", true, converterContext, config);
        return presentation;
      };

      var createAlpView = function (presentations, defaultPath) {
        var primaryVisualization = createVisualization(presentations[0], true);
        chartControlId = (primaryVisualization === null || primaryVisualization === void 0 ? void 0 : primaryVisualization.visualizations[0]).id;
        var secondaryVisualization = createVisualization(presentations[1] ? presentations[1] : presentations[0]);
        tableControlId = (secondaryVisualization === null || secondaryVisualization === void 0 ? void 0 : secondaryVisualization.visualizations[0]).annotation.id;

        if (primaryVisualization && secondaryVisualization) {
          var view = {
            primaryVisualization: primaryVisualization,
            secondaryVisualization: secondaryVisualization,
            tableControlId: tableControlId,
            chartControlId: chartControlId,
            defaultPath: defaultPath
          };
          return view;
        }
      };

      if (((_presentation = presentation) === null || _presentation === void 0 ? void 0 : (_presentation$visuali = _presentation.visualizations) === null || _presentation$visuali === void 0 ? void 0 : _presentation$visuali.length) === 2 && converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
        var view = createAlpView([presentation], "both");

        if (view) {
          return view;
        }
      } else if (converterContext.getManifestWrapper().hasMultipleVisualizations(config) || converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
        var _ref = config,
            primary = _ref.primary,
            secondary = _ref.secondary;

        if (primary && primary.length && secondary && secondary.length) {
          var _view = createAlpView([getPresentation(primary[0]), getPresentation(secondary[0])], config.defaultPath);

          if (_view) {
            return _view;
          }
        } else {
          throw new Error("SecondaryItems in the Views is not present");
        }
      } else if (isMultipleViewConfiguration(config)) {
        // key exists only on multi tables mode
        var resolvedTarget = converterContext.getEntityTypeAnnotation(config.annotationPath);
        var viewAnnotation = resolvedTarget.annotation;
        converterContext = resolvedTarget.converterContext;
        title = compileBinding(annotationExpression(viewAnnotation.Text)); // Need to loop on table into views since multi table mode get specific configuration (hidden filters or Table Id)

        presentation.visualizations.forEach(function (visualizationDefinition, index) {
          switch (visualizationDefinition.type) {
            case VisualizationType.Table:
              var tableVisualization = presentation.visualizations[index];
              var filters = tableVisualization.control.filters || {};
              filters.hiddenFilters = filters.hiddenFilters || {
                paths: []
              };

              if (!config.keepPreviousPresonalization) {
                // Need to override Table Id to match with Tab Key (currently only table is managed in multiple view mode)
                tableVisualization.annotation.id = TableID(config.key || "", "LineItem");
              }

              config = config;

              if (config && config.annotation && config.annotation.term === "com.sap.vocabularies.UI.v1.SelectionPresentationVariant") {
                selectionVariantPath = config.annotation.SelectionVariant.fullyQualifiedName.split("@")[1];
              } else {
                selectionVariantPath = config.annotationPath;
              } //Provide Selection Variant to hiddenFilters in order to set the SV filters to the table.
              //MDC Table overrides binding Filter and from SAP FE the only method where we are able to add
              //additional filter is 'rebindTable' into Table delegate.
              //To avoid implementing specific LR feature to SAP FE Macro Table, the filter(s) related to the Tab (multi table mode)
              //can be passed to macro table via parameter/context named filters and key hiddenFilters.


              filters.hiddenFilters.paths.push({
                annotationPath: selectionVariantPath
              });
              tableVisualization.control.filters = filters;
              break;

            case VisualizationType.Chart:
              // Not currently managed
              break;

            default:
              break;
          }
        });
      }

      presentation.visualizations.forEach(function (visualizationDefinition) {
        if (visualizationDefinition.type === VisualizationType.Table) {
          tableControlId = visualizationDefinition.annotation.id;
        } else if (visualizationDefinition.type === VisualizationType.Chart) {
          chartControlId = visualizationDefinition.id;
        }
      });
      return {
        presentation: presentation,
        tableControlId: tableControlId,
        chartControlId: chartControlId,
        title: title,
        selectionVariantPath: selectionVariantPath
      };
    } else {
      config = config;
      var _title = config.label,
          fragment = config.template,
          type = config.type,
          customTabId = CustomTabID(config.key || "");
      return {
        title: _title,
        fragment: fragment,
        type: type,
        customTabId: customTabId
      };
    }
  };

  var getViews = function (converterContext, settingsViews) {
    var viewConverterConfigs = [];

    if (settingsViews) {
      settingsViews.paths.forEach(function (path) {
        if (converterContext.getManifestWrapper().hasMultipleVisualizations(path)) {
          if (settingsViews.paths.length > 1) {
            throw new Error("ALP flavor cannot have multiple views");
          } else {
            path = path;
            viewConverterConfigs.push({
              converterContext: converterContext,
              primary: path.primary,
              secondary: path.secondary,
              defaultPath: path.defaultPath
            });
          }
        } else if (path.template) {
          path = path;
          viewConverterConfigs.push({
            key: path.key,
            label: path.label,
            template: path.template,
            type: "Custom"
          });
        } else {
          path = path;
          var manifestWrapper = converterContext.getManifestWrapper(),
              viewConverterContext = converterContext.getConverterContextFor(path.contextPath || path.entitySet && "/" + path.entitySet || converterContext.getContextPath()),
              entityType = viewConverterContext.getEntityType();

          if (entityType && viewConverterContext) {
            var annotationPath = manifestWrapper.getDefaultTemplateAnnotationPath();
            var annotation;
            var resolvedTarget = viewConverterContext.getEntityTypeAnnotation(path.annotationPath);
            var targetAnnotation = resolvedTarget.annotation;
            converterContext = resolvedTarget.converterContext;

            if (targetAnnotation) {
              if (targetAnnotation.term === "com.sap.vocabularies.UI.v1.SelectionVariant") {
                if (annotationPath) {
                  annotation = getSelectionPresentationVariant(viewConverterContext.getEntityType(), annotationPath, converterContext);
                } else {
                  annotation = getDefaultLineItem(viewConverterContext.getEntityType());
                }
              } else {
                annotation = targetAnnotation;
              }

              viewConverterConfigs.push({
                converterContext: viewConverterContext,
                annotation: annotation,
                annotationPath: path.annotationPath,
                keepPreviousPresonalization: path.keepPreviousPresonalization,
                key: path.key
              });
            }
          } else {// TODO Diagnostics message
          }
        }
      });
    } else {
      var entityType = converterContext.getEntityType();

      if (converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
        viewConverterConfigs = getAlpViewConfig(converterContext, viewConverterConfigs);
      } else {
        viewConverterConfigs.push({
          annotation: getCompliantVisualizationAnnotation(entityType, converterContext, false),
          converterContext: converterContext
        });
      }
    }

    return viewConverterConfigs.map(function (viewConverterConfig) {
      return getView(viewConverterConfig);
    });
  };

  function getAlpViewConfig(converterContext, viewConfigs) {
    var entityType = converterContext.getEntityType();
    var annotation = getCompliantVisualizationAnnotation(entityType, converterContext, true);
    var chart, table;

    if (annotation) {
      viewConfigs.push({
        annotation: annotation,
        converterContext: converterContext
      });
    } else {
      chart = getDefaultChart(entityType);
      table = getDefaultLineItem(entityType);

      if (chart && table) {
        var primary = [{
          annotationPath: chart.term
        }];
        var secondary = [{
          annotationPath: table.term
        }];
        viewConfigs.push({
          converterContext: converterContext,
          primary: primary,
          secondary: secondary,
          defaultPath: "both"
        });
      }
    }

    return viewConfigs;
  }

  var getHeaderActions = function (converterContext) {
    var manifestWrapper = converterContext.getManifestWrapper();
    return insertCustomElements([], getActionsFromManifest(manifestWrapper.getHeaderActions(), converterContext));
  };
  /**
   * Create the ListReportDefinition for the multi entitySets (multi table instances).
   *
   * @param converterContext
   * @returns {ListReportDefinition} The list report definition based on annotation + manifest
   */


  _exports.getHeaderActions = getHeaderActions;

  var convertPage = function (converterContext) {
    var entityType = converterContext.getEntityType();
    var sContextPath = converterContext.getContextPath();

    if (!sContextPath) {
      // If we don't have an entitySet at this point we have an issue I'd say
      throw new Error("An EntitySet is required to be able to display a ListReport, please adjust your `entitySet` property to point to one.");
    }

    var manifestWrapper = converterContext.getManifestWrapper();
    var viewsDefinition = manifestWrapper.getViewConfiguration();
    var hasMultipleEntitySets = manifestWrapper.hasMultipleEntitySets();
    var views = getViews(converterContext, viewsDefinition);
    var showTabCounts = viewsDefinition ? (viewsDefinition === null || viewsDefinition === void 0 ? void 0 : viewsDefinition.showCounts) || hasMultipleEntitySets : undefined; // with multi EntitySets, tab counts are displayed by default

    var lrTableVisualizations = getTableVisualizations(views);
    var showPinnableToggle = lrTableVisualizations.some(function (table) {
      return table.control.type === "ResponsiveTable";
    });
    var singleTableId = "";
    var singleChartId = "";
    var filterBarId = FilterBarID(sContextPath);
    var filterVariantManagementID = FilterVariantManagementID(filterBarId);
    var targetControlIds = [filterBarId].concat(lrTableVisualizations.map(function (visualization) {
      return visualization.annotation.id;
    }));
    var fbConfig = manifestWrapper.getFilterConfiguration();
    var filterInitialLayout = (fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.initialLayout) !== undefined ? fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.initialLayout.toLowerCase() : "compact";
    var filterLayout = (fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.layout) !== undefined ? fbConfig === null || fbConfig === void 0 ? void 0 : fbConfig.layout.toLowerCase() : "compact";
    var useSemanticDateRange = fbConfig.useSemanticDateRange !== undefined ? fbConfig.useSemanticDateRange : true;
    var oConfig = getContentAreaId(converterContext, views);

    if (oConfig) {
      singleChartId = oConfig.chartId;
      singleTableId = oConfig.tableId;
    }

    var selectionFields = getSelectionFields(converterContext, lrTableVisualizations);
    var hideBasicSearch = getFilterBarhideBasicSearch(lrTableVisualizations, converterContext);
    var selectionVariant = getSelectionVariant(entityType, converterContext);
    var defaultSemanticDates = useSemanticDateRange ? getDefaultSemanticDates(getManifestFilterFields(entityType, converterContext)) : {}; // Sort header actions according to position attributes in manifest

    var headerActions = getHeaderActions(converterContext);
    var hasMultiVisualizations = manifestWrapper.hasMultipleVisualizations() || converterContext.getTemplateType() === TemplateType.AnalyticalListPage;
    return {
      mainEntitySet: sContextPath,
      mainEntityType: sContextPath + "/",
      singleTableId: singleTableId,
      singleChartId: singleChartId,
      showTabCounts: showTabCounts,
      headerActions: headerActions,
      showPinnableToggle: showPinnableToggle,
      filterBar: {
        selectionFields: selectionFields,
        hideBasicSearch: hideBasicSearch
      },
      views: views,
      filterBarId: filterBarId,
      filterConditions: {
        selectionVariant: selectionVariant,
        defaultSemanticDates: defaultSemanticDates
      },
      variantManagement: {
        id: filterVariantManagementID,
        targetControlIds: targetControlIds.join(",")
      },
      isMultiEntitySets: hasMultipleEntitySets,
      hasMultiVisualizations: hasMultiVisualizations,
      useSemanticDateRange: useSemanticDateRange,
      filterInitialLayout: filterInitialLayout,
      filterLayout: filterLayout,
      kpiDefinitions: getKPIDefinitions(converterContext)
    };
  };

  _exports.convertPage = convertPage;

  function getSelectionVariants(lrTableVisualizations, converterContext) {
    var selectionVariantPaths = [];
    return lrTableVisualizations.map(function (visualization) {
      var tableFilters = visualization.control.filters;
      var tableSVConfigs = [];

      for (var key in tableFilters) {
        if (Array.isArray(tableFilters[key].paths)) {
          var paths = tableFilters[key].paths;
          paths.forEach(function (path) {
            if (path && path.annotationPath && selectionVariantPaths.indexOf(path.annotationPath) === -1) {
              selectionVariantPaths.push(path.annotationPath);
              var selectionVariantConfig = getSelectionVariantConfiguration(path.annotationPath, converterContext);

              if (selectionVariantConfig) {
                tableSVConfigs.push(selectionVariantConfig);
              }
            }
          });
        }
      }

      return tableSVConfigs;
    }).reduce(function (svConfigs, selectionVariant) {
      return svConfigs.concat(selectionVariant);
    }, []);
  }

  function getExcludedFilterProperties(selectionVariants) {
    return selectionVariants.reduce(function (previousValue, selectionVariant) {
      selectionVariant.propertyNames.forEach(function (propertyName) {
        previousValue[propertyName] = true;
      });
      return previousValue;
    }, {});
  }

  function getContentAreaId(converterContext, views) {
    var singleTableId = "",
        singleChartId = "";

    if (converterContext.getManifestWrapper().hasMultipleVisualizations() || converterContext.getTemplateType() === TemplateType.AnalyticalListPage) {
      var _iterator2 = _createForOfIteratorHelper(views),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var view = _step2.value;
          view = view;

          if (view.chartControlId && view.tableControlId) {
            singleChartId = view.chartControlId;
            singleTableId = view.tableControlId;
            break;
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    } else {
      singleTableId = views[0].tableControlId;
    }

    if (singleTableId || singleChartId) {
      return {
        chartId: singleChartId,
        tableId: singleTableId
      };
    }

    return undefined;
  }

  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkxpc3RSZXBvcnRDb252ZXJ0ZXIudHMiXSwibmFtZXMiOlsiX2dldENvbmRpdGlvblBhdGgiLCJlbnRpdHlUeXBlIiwicHJvcGVydHlQYXRoIiwicGFydHMiLCJzcGxpdCIsInBhcnRpYWxQYXRoIiwia2V5IiwibGVuZ3RoIiwicGFydCIsInNoaWZ0IiwicHJvcGVydHkiLCJyZXNvbHZlUGF0aCIsIl90eXBlIiwiaXNDb2xsZWN0aW9uIiwiX2NyZWF0ZUZpbHRlclNlbGVjdGlvbkZpZWxkIiwiZnVsbFByb3BlcnR5UGF0aCIsImluY2x1ZGVIaWRkZW4iLCJjb252ZXJ0ZXJDb250ZXh0IiwidW5kZWZpbmVkIiwidGFyZ2V0VHlwZSIsImFubm90YXRpb25zIiwiVUkiLCJIaWRkZW4iLCJ2YWx1ZU9mIiwidGFyZ2V0RW50aXR5VHlwZSIsImdldEFubm90YXRpb25FbnRpdHlUeXBlIiwiS2V5SGVscGVyIiwiZ2V0U2VsZWN0aW9uRmllbGRLZXlGcm9tUGF0aCIsImFubm90YXRpb25QYXRoIiwiZ2V0QWJzb2x1dGVBbm5vdGF0aW9uUGF0aCIsImNvbmRpdGlvblBhdGgiLCJhdmFpbGFiaWxpdHkiLCJIaWRkZW5GaWx0ZXIiLCJBdmFpbGFiaWxpdHlUeXBlIiwiQWRhcHRhdGlvbiIsImxhYmVsIiwiY29tcGlsZUJpbmRpbmciLCJhbm5vdGF0aW9uRXhwcmVzc2lvbiIsIkNvbW1vbiIsIkxhYmVsIiwibmFtZSIsImdyb3VwIiwiZ3JvdXBMYWJlbCIsIl9nZXRTZWxlY3Rpb25GaWVsZHMiLCJuYXZpZ2F0aW9uUGF0aCIsInByb3BlcnRpZXMiLCJzZWxlY3Rpb25GaWVsZE1hcCIsImZvckVhY2giLCJmdWxsUGF0aCIsInNlbGVjdGlvbkZpZWxkIiwiX2dldFNlbGVjdGlvbkZpZWxkc0J5UGF0aCIsInByb3BlcnR5UGF0aHMiLCJzZWxlY3Rpb25GaWVsZHMiLCJsb2NhbFNlbGVjdGlvbkZpZWxkcyIsImVudGl0eVByb3BlcnRpZXMiLCJpbmNsdWRlcyIsInNwbGljZSIsImpvaW4iLCJnZXRGaWVsZEdyb3VwRmlsdGVyR3JvdXBzIiwiZmllbGRHcm91cCIsImZpbHRlckZhY2V0TWFwIiwiRGF0YSIsImRhdGFGaWVsZCIsIiRUeXBlIiwiVmFsdWUiLCJwYXRoIiwiZnVsbHlRdWFsaWZpZWROYW1lIiwicXVhbGlmaWVyIiwiZ2V0VGFibGVWaXN1YWxpemF0aW9ucyIsInZpZXdzIiwidGFibGVzIiwidmlldyIsInR5cGUiLCJ2aXN1YWxpemF0aW9ucyIsInNlY29uZGFyeVZpc3VhbGl6YXRpb24iLCJwcmVzZW50YXRpb24iLCJ2aXN1YWxpemF0aW9uIiwiVmlzdWFsaXphdGlvblR5cGUiLCJUYWJsZSIsInB1c2giLCJnZXRGaWx0ZXJCYXJoaWRlQmFzaWNTZWFyY2giLCJsaXN0UmVwb3J0VGFibGVzIiwiZ2V0TWFuaWZlc3RXcmFwcGVyIiwiaGFzTXVsdGlwbGVWaXN1YWxpemF0aW9ucyIsImdldFRlbXBsYXRlVHlwZSIsIlRlbXBsYXRlVHlwZSIsIkFuYWx5dGljYWxMaXN0UGFnZSIsInNDb250ZXh0UGF0aCIsImdldENvbnRleHRQYXRoIiwiY2hlY2tBbGxUYWJsZUZvckVudGl0eVNldEFyZUFuYWx5dGljYWwiLCJjb250ZXh0UGF0aCIsImV2ZXJ5IiwiZW5hYmxlQW5hbHl0aWNzIiwiYW5ub3RhdGlvbiIsImNvbGxlY3Rpb24iLCJfZ2V0UGFyYW1ldGVyRmllbGRzIiwiZGF0YU1vZGVsT2JqZWN0UGF0aCIsImdldERhdGFNb2RlbE9iamVjdFBhdGgiLCJwYXJhbWV0ZXJFbnRpdHlUeXBlIiwic3RhcnRpbmdFbnRpdHlTZXQiLCJpc1BhcmFtZXRlcml6ZWQiLCJSZXN1bHRDb250ZXh0IiwicGFyYW1ldGVyQ29udmVydGVyQ29udGV4dCIsImdldENvbnZlcnRlckNvbnRleHRGb3IiLCJwYXJhbWV0ZXJGaWVsZHMiLCJtYXAiLCJfZ2V0RmlsdGVyRmllbGQiLCJnZXRTZWxlY3Rpb25GaWVsZHMiLCJsclRhYmxlcyIsInNlbGVjdGlvblZhcmlhbnRzIiwiZ2V0U2VsZWN0aW9uVmFyaWFudHMiLCJleGNsdWRlZEZpbHRlclByb3BlcnRpZXMiLCJnZXRFeGNsdWRlZEZpbHRlclByb3BlcnRpZXMiLCJnZXRFbnRpdHlUeXBlIiwiZmlsdGVyRmFjZXRzIiwiRmlsdGVyRmFjZXRzIiwiYUZpZWxkR3JvdXBzIiwiZ2V0QW5ub3RhdGlvbnNCeVRlcm0iLCJpIiwicmVkdWNlIiwicHJldmlvdXNWYWx1ZSIsImZpbHRlckZhY2V0IiwiVGFyZ2V0IiwiJHRhcmdldCIsIklEIiwidG9TdHJpbmciLCJhU2VsZWN0T3B0aW9ucyIsInNlbGVjdGlvblZhcmlhbnQiLCJnZXRTZWxlY3Rpb25WYXJpYW50IiwiU2VsZWN0T3B0aW9ucyIsImZpbHRlckZpZWxkcyIsImdldEZpbHRlckNvbmZpZ3VyYXRpb24iLCJuYXZpZ2F0aW9uUHJvcGVydGllcyIsImRlZmF1bHRGaWx0ZXJzIiwiX2dldERlZmF1bHRGaWx0ZXJGaWVsZHMiLCJhbGxGaWx0ZXJzIiwiY29uY2F0IiwiU2VsZWN0aW9uRmllbGRzIiwidmFsdWUiLCJmaWx0ZXJGaWVsZCIsIk9iamVjdCIsImtleXMiLCJmaWx0ZXIiLCJhc3NpZ24iLCJhZ2dyZWdhdGVzIiwiYWdncmVnYXRhYmxlUHJvcGVydGllcyIsImFnZ3JlZ2F0ZUtleSIsInJlbGF0aXZlUGF0aCIsImluZGV4T2YiLCJpbnNlcnRDdXN0b21FbGVtZW50cyIsImdldE1hbmlmZXN0RmlsdGVyRmllbGRzIiwicG9zaXRpb24iLCJ0ZW1wbGF0ZSIsInNldHRpbmdzIiwidmlzdWFsRmlsdGVyIiwiZ2V0VmlzdWFsRmlsdGVycyIsInNQcm9wZXJ0eVBhdGgiLCJGaWx0ZXJGaWVsZHMiLCJvVmlzdWFsRmlsdGVyIiwidmFsdWVMaXN0Iiwib1ZGUGF0aCIsImFubm90YXRpb25RdWFsaWZpZXJTcGxpdCIsInF1YWxpZmllclZMIiwiY29sbGVjdGlvblBhdGgiLCJDb2xsZWN0aW9uUGF0aCIsImNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dCIsImdldEVudGl0eVNldCIsInZhbHVlTGlzdFBhcmFtcyIsIlBhcmFtZXRlcnMiLCJvdXRQYXJhbWV0ZXIiLCJpblBhcmFtZXRlcnMiLCJsb2NhbERhdGFQcm9wZXJ0eSIsIkxvY2FsRGF0YVByb3BlcnR5IiwidmFsdWVMaXN0UHJvcGVydHkiLCJWYWx1ZUxpc3RQcm9wZXJ0eSIsImJOb3RGaWx0ZXJhYmxlIiwiaXNQcm9wZXJ0eUZpbHRlcmFibGUiLCJvSW5QYXJhbWV0ZXIiLCJtYWluRW50aXR5U2V0SW5NYXBwaW5nQWxsb3dlZEV4cHJlc3Npb24iLCJjaGVja0ZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvbnMiLCJ2YWx1ZUxpc3RFbnRpdHlTZXRJbk1hcHBpbmdBbGxvd2VkRXhwcmVzc2lvbiIsIkVycm9yIiwicHZRdWFsaWZpZXIiLCJQcmVzZW50YXRpb25WYXJpYW50UXVhbGlmaWVyIiwic3ZRdWFsaWZpZXIiLCJTZWxlY3Rpb25WYXJpYW50UXVhbGlmaWVyIiwicHZBbm5vdGF0aW9uIiwiZ2V0RW50aXR5VHlwZUFubm90YXRpb24iLCJhZ2dyZWdhdGlvbkhlbHBlciIsIkFnZ3JlZ2F0aW9uSGVscGVyIiwiaXNBbmFseXRpY3NTdXBwb3J0ZWQiLCJhVmlzdWFsaXphdGlvbnMiLCJWaXN1YWxpemF0aW9ucyIsImNoYXJ0QW5ub3RhdGlvbiIsInRlcm0iLCJfYmdldFZGQWdncmVnYXRpb24iLCJfY2hlY2tWRkFnZ3JlZ2F0aW9uIiwiYkRpbWVuc2lvbkhpZGRlbiIsIkRpbWVuc2lvbnMiLCJiRGltZW5zaW9uSGlkZGVuRmlsdGVyIiwicHJlc2VudGF0aW9uQW5ub3RhdGlvbiIsInZpc3VhbEZpbHRlcklkIiwiVmlzdWFsRmlsdGVySUQiLCJiSXNSYW5nZSIsImJJc01haW5FbnRpdHlTZXRTaW5nbGVTZWxlY3Rpb24iLCJtdWx0aXBsZVNlbGVjdGlvbkFsbG93ZWQiLCJyZXF1aXJlZCIsImdldElzUmVxdWlyZWQiLCJzdkFubm90YXRpb24iLCJzZWxlY3Rpb25WYXJpYW50QW5ub3RhdGlvbiIsImVudGl0eVNldEFubm90YXRpb25zIiwicmVxdWlyZWRQcm9wZXJ0eVBhdGhzIiwicmVxdWlyZWRQcm9wZXJ0aWVzIiwiQ2FwYWJpbGl0aWVzIiwiRmlsdGVyUmVzdHJpY3Rpb25zIiwiUmVxdWlyZWRQcm9wZXJ0aWVzIiwib1JlcXVpcmVQcm9wZXJ0eSIsInNob3dPdmVybGF5SW5pdGlhbGx5Iiwic2VsZWN0T3B0aW9ucyIsIm9TZWxlY3RPcHRpb24iLCJQcm9wZXJ0eU5hbWUiLCJzb3J0Iiwic29tZSIsInNQYXRoIiwiZ2V0RGlhZ25vc3RpY3MiLCJhZGRJc3N1ZSIsIklzc3VlQ2F0ZWdvcnkiLCJBbm5vdGF0aW9uIiwiSXNzdWVTZXZlcml0eSIsIkhpZ2giLCJJc3N1ZVR5cGUiLCJNQUxGT1JNRURfVklTVUFMRklMVEVSUyIsIkNIQVJUIiwiUFJFU0VOVEFUSU9OVkFSSUFOVCIsIlZBTFVFTElTVCIsIk1hbmlmZXN0Iiwic01lYXN1cmVQYXRoIiwiYkdyb3VwYWJsZSIsImJBZ2dyZWdhdGFibGUiLCJzTWVhc3VyZSIsIk1lYXN1cmVzIiwic0RpbWVuc2lvbiIsImN1c3RvbUFnZ3JlZ2F0ZXMiLCJnZXRDdXN0b21BZ2dyZWdhdGVEZWZpbml0aW9ucyIsImFUcmFuc0FnZ3JlZ2F0aW9ucyIsImdldEVudGl0eUNvbnRhaW5lciIsImFBZ2dyZWdhdGlvbnMiLCJvQWdncmVnYXRlIiwiTmFtZSIsIkFnZ3JlZ2F0YWJsZVByb3BlcnR5IiwiYUFnZ3JlZ2F0YWJsZVByb3BzRnJvbUNvbnRhaW5lciIsIkFnZ3JlZ2F0aW9uIiwiQXBwbHlTdXBwb3J0ZWQiLCJBZ2dyZWdhdGFibGVQcm9wZXJ0aWVzIiwiYUdyb3VwYWJsZVByb3BzRnJvbUNvbnRhaW5lciIsIkdyb3VwYWJsZVByb3BlcnRpZXMiLCJQcm9wZXJ0eSIsIlVJU2VsZWN0aW9uRmllbGRzIiwiU2VsZWN0aW9uRmllbGQiLCJzZWxlY3RPcHRpb24iLCJwcm9wZXJ0eU5hbWUiLCJGaWx0ZXJGaWVsZCIsImRlZmF1bHRGaWx0ZXJWYWx1ZSIsIkZpbHRlckRlZmF1bHRWYWx1ZSIsIlByb3BlcnR5UGF0aCIsIk1JU1NJTkdfU0VMRUNUSU9ORklFTEQiLCJEZWZhdWx0IiwiaXNQYXJhbWV0ZXIiLCJnZXREZWZhdWx0U2VtYW50aWNEYXRlcyIsImRlZmF1bHRTZW1hbnRpY0RhdGVzIiwiZGVmYXVsdFZhbHVlcyIsImdldEZpbHRlckZpZWxkIiwiZmJDb25maWciLCJkZWZpbmVkRmlsdGVyRmllbGRzIiwiZ2V0UGF0aEZyb21TZWxlY3Rpb25GaWVsZEtleSIsInNLZXkiLCJwbGFjZW1lbnQiLCJQbGFjZW1lbnQiLCJBZnRlciIsImdldENvbXBsaWFudFZpc3VhbGl6YXRpb25Bbm5vdGF0aW9uIiwiYklzQUxQIiwiZ2V0RGVmYXVsdFRlbXBsYXRlQW5ub3RhdGlvblBhdGgiLCJzZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50IiwiZ2V0U2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudCIsInByZXNlbnRhdGlvblZhcmlhbnQiLCJQcmVzZW50YXRpb25WYXJpYW50IiwiYlBWQ29tcGxhaW50IiwiaXNQcmVzZW50YXRpb25Db21wbGlhbnQiLCJpc1NlbGVjdGlvblByZXNlbnRhdGlvbkNvbXBsaWFudCIsImdldERlZmF1bHRQcmVzZW50YXRpb25WYXJpYW50IiwiZGVmYXVsdExpbmVJdGVtIiwiZ2V0RGVmYXVsdExpbmVJdGVtIiwiZ2V0VmlldyIsInZpZXdDb252ZXJ0ZXJDb25maWd1cmF0aW9uIiwiY29uZmlnIiwiZ2V0RGF0YVZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uIiwiZ2V0UmVsYXRpdmVBbm5vdGF0aW9uUGF0aCIsInRhYmxlQ29udHJvbElkIiwiY2hhcnRDb250cm9sSWQiLCJ0aXRsZSIsInNlbGVjdGlvblZhcmlhbnRQYXRoIiwiaXNNdWx0aXBsZVZpZXdDb25maWd1cmF0aW9uIiwiY3JlYXRlVmlzdWFsaXphdGlvbiIsImlzUHJpbWFyeSIsImRlZmF1bHRWaXN1YWxpemF0aW9uIiwiQ2hhcnQiLCJwcmVzZW50YXRpb25DcmVhdGVkIiwiZ2V0UHJlc2VudGF0aW9uIiwiaXRlbSIsInJlc29sdmVkVGFyZ2V0IiwidGFyZ2V0QW5ub3RhdGlvbiIsImNyZWF0ZUFscFZpZXciLCJwcmVzZW50YXRpb25zIiwiZGVmYXVsdFBhdGgiLCJwcmltYXJ5VmlzdWFsaXphdGlvbiIsImlkIiwicHJpbWFyeSIsInNlY29uZGFyeSIsInZpZXdBbm5vdGF0aW9uIiwiVGV4dCIsInZpc3VhbGl6YXRpb25EZWZpbml0aW9uIiwiaW5kZXgiLCJ0YWJsZVZpc3VhbGl6YXRpb24iLCJmaWx0ZXJzIiwiY29udHJvbCIsImhpZGRlbkZpbHRlcnMiLCJwYXRocyIsImtlZXBQcmV2aW91c1ByZXNvbmFsaXphdGlvbiIsIlRhYmxlSUQiLCJTZWxlY3Rpb25WYXJpYW50IiwiZnJhZ21lbnQiLCJjdXN0b21UYWJJZCIsIkN1c3RvbVRhYklEIiwiZ2V0Vmlld3MiLCJzZXR0aW5nc1ZpZXdzIiwidmlld0NvbnZlcnRlckNvbmZpZ3MiLCJtYW5pZmVzdFdyYXBwZXIiLCJ2aWV3Q29udmVydGVyQ29udGV4dCIsImVudGl0eVNldCIsImdldEFscFZpZXdDb25maWciLCJ2aWV3Q29udmVydGVyQ29uZmlnIiwidmlld0NvbmZpZ3MiLCJjaGFydCIsInRhYmxlIiwiZ2V0RGVmYXVsdENoYXJ0IiwiZ2V0SGVhZGVyQWN0aW9ucyIsImdldEFjdGlvbnNGcm9tTWFuaWZlc3QiLCJjb252ZXJ0UGFnZSIsInZpZXdzRGVmaW5pdGlvbiIsImdldFZpZXdDb25maWd1cmF0aW9uIiwiaGFzTXVsdGlwbGVFbnRpdHlTZXRzIiwic2hvd1RhYkNvdW50cyIsInNob3dDb3VudHMiLCJsclRhYmxlVmlzdWFsaXphdGlvbnMiLCJzaG93UGlubmFibGVUb2dnbGUiLCJzaW5nbGVUYWJsZUlkIiwic2luZ2xlQ2hhcnRJZCIsImZpbHRlckJhcklkIiwiRmlsdGVyQmFySUQiLCJmaWx0ZXJWYXJpYW50TWFuYWdlbWVudElEIiwiRmlsdGVyVmFyaWFudE1hbmFnZW1lbnRJRCIsInRhcmdldENvbnRyb2xJZHMiLCJmaWx0ZXJJbml0aWFsTGF5b3V0IiwiaW5pdGlhbExheW91dCIsInRvTG93ZXJDYXNlIiwiZmlsdGVyTGF5b3V0IiwibGF5b3V0IiwidXNlU2VtYW50aWNEYXRlUmFuZ2UiLCJvQ29uZmlnIiwiZ2V0Q29udGVudEFyZWFJZCIsImNoYXJ0SWQiLCJ0YWJsZUlkIiwiaGlkZUJhc2ljU2VhcmNoIiwiaGVhZGVyQWN0aW9ucyIsImhhc011bHRpVmlzdWFsaXphdGlvbnMiLCJtYWluRW50aXR5U2V0IiwibWFpbkVudGl0eVR5cGUiLCJmaWx0ZXJCYXIiLCJmaWx0ZXJDb25kaXRpb25zIiwidmFyaWFudE1hbmFnZW1lbnQiLCJpc011bHRpRW50aXR5U2V0cyIsImtwaURlZmluaXRpb25zIiwiZ2V0S1BJRGVmaW5pdGlvbnMiLCJzZWxlY3Rpb25WYXJpYW50UGF0aHMiLCJ0YWJsZUZpbHRlcnMiLCJ0YWJsZVNWQ29uZmlncyIsIkFycmF5IiwiaXNBcnJheSIsInNlbGVjdGlvblZhcmlhbnRDb25maWciLCJnZXRTZWxlY3Rpb25WYXJpYW50Q29uZmlndXJhdGlvbiIsInN2Q29uZmlncyIsInByb3BlcnR5TmFtZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnTEE7Ozs7Ozs7O0FBUUEsTUFBTUEsaUJBQWlCLEdBQUcsVUFBU0MsVUFBVCxFQUFpQ0MsWUFBakMsRUFBK0Q7QUFDeEYsUUFBTUMsS0FBSyxHQUFHRCxZQUFZLENBQUNFLEtBQWIsQ0FBbUIsR0FBbkIsQ0FBZDtBQUNBLFFBQUlDLFdBQUo7QUFDQSxRQUFJQyxHQUFHLEdBQUcsRUFBVjs7QUFDQSxXQUFPSCxLQUFLLENBQUNJLE1BQWIsRUFBcUI7QUFDcEIsVUFBSUMsSUFBSSxHQUFHTCxLQUFLLENBQUNNLEtBQU4sRUFBWDtBQUNBSixNQUFBQSxXQUFXLEdBQUdBLFdBQVcsR0FBR0EsV0FBVyxHQUFHLEdBQWQsR0FBb0JHLElBQXZCLEdBQThCQSxJQUF2RDtBQUNBLFVBQU1FLFFBQXVDLEdBQUdULFVBQVUsQ0FBQ1UsV0FBWCxDQUF1Qk4sV0FBdkIsQ0FBaEQ7O0FBQ0EsVUFBSUssUUFBUSxDQUFDRSxLQUFULEtBQW1CLG9CQUFuQixJQUEyQ0YsUUFBUSxDQUFDRyxZQUF4RCxFQUFzRTtBQUNyRUwsUUFBQUEsSUFBSSxJQUFJLEdBQVI7QUFDQTs7QUFDREYsTUFBQUEsR0FBRyxHQUFHQSxHQUFHLEdBQUdBLEdBQUcsR0FBRyxHQUFOLEdBQVlFLElBQWYsR0FBc0JBLElBQS9CO0FBQ0E7O0FBQ0QsV0FBT0YsR0FBUDtBQUNBLEdBZEQ7O0FBZ0JBLE1BQU1RLDJCQUEyQixHQUFHLFVBQ25DYixVQURtQyxFQUVuQ1MsUUFGbUMsRUFHbkNLLGdCQUhtQyxFQUluQ0MsYUFKbUMsRUFLbkNDLGdCQUxtQyxFQU1UO0FBQUE7O0FBQzFCO0FBQ0EsUUFDQ1AsUUFBUSxLQUFLUSxTQUFiLElBQ0FSLFFBQVEsQ0FBQ1MsVUFBVCxLQUF3QkQsU0FEeEIsS0FFQ0YsYUFBYSxJQUFJLDBCQUFBTixRQUFRLENBQUNVLFdBQVQsMEdBQXNCQyxFQUF0Qiw0R0FBMEJDLE1BQTFCLGtGQUFrQ0MsT0FBbEMsUUFBZ0QsSUFGbEUsQ0FERCxFQUlFO0FBQUE7O0FBQ0QsVUFBTUMsZ0JBQWdCLEdBQUdQLGdCQUFnQixDQUFDUSx1QkFBakIsQ0FBeUNmLFFBQXpDLENBQXpCO0FBQ0EsYUFBTztBQUNOSixRQUFBQSxHQUFHLEVBQUVvQixTQUFTLENBQUNDLDRCQUFWLENBQXVDWixnQkFBdkMsQ0FEQztBQUVOYSxRQUFBQSxjQUFjLEVBQUVYLGdCQUFnQixDQUFDWSx5QkFBakIsQ0FBMkNkLGdCQUEzQyxDQUZWO0FBR05lLFFBQUFBLGFBQWEsRUFBRTlCLGlCQUFpQixDQUFDQyxVQUFELEVBQWFjLGdCQUFiLENBSDFCO0FBSU5nQixRQUFBQSxZQUFZLEVBQ1gsMkJBQUFyQixRQUFRLENBQUNVLFdBQVQsNEdBQXNCQyxFQUF0Qiw0R0FBMEJXLFlBQTFCLGtGQUF3Q1QsT0FBeEMsUUFBc0QsSUFBdEQsR0FBNkRVLGdCQUFnQixDQUFDWCxNQUE5RSxHQUF1RlcsZ0JBQWdCLENBQUNDLFVBTG5HO0FBTU5DLFFBQUFBLEtBQUssRUFBRUMsY0FBYyxDQUFDQyxvQkFBb0IsQ0FBQywyQkFBQTNCLFFBQVEsQ0FBQ1UsV0FBVCxDQUFxQmtCLE1BQXJCLDRHQUE2QkMsS0FBN0Isa0ZBQW9DaEIsT0FBcEMsT0FBaURiLFFBQVEsQ0FBQzhCLElBQTNELENBQXJCLENBTmY7QUFPTkMsUUFBQUEsS0FBSyxFQUFFakIsZ0JBQWdCLENBQUNnQixJQVBsQjtBQVFORSxRQUFBQSxVQUFVLEVBQUVOLGNBQWMsQ0FDekJDLG9CQUFvQixDQUFDLENBQUFiLGdCQUFnQixTQUFoQixJQUFBQSxnQkFBZ0IsV0FBaEIscUNBQUFBLGdCQUFnQixDQUFFSixXQUFsQiwwR0FBK0JrQixNQUEvQiw0R0FBdUNDLEtBQXZDLGtGQUE4Q2hCLE9BQTlDLE9BQTJEQyxnQkFBZ0IsQ0FBQ2dCLElBQTdFLENBREs7QUFScEIsT0FBUDtBQVlBOztBQUNELFdBQU90QixTQUFQO0FBQ0EsR0E1QkQ7O0FBOEJBLE1BQU15QixtQkFBbUIsR0FBRyxVQUMzQjFDLFVBRDJCLEVBRTNCMkMsY0FGMkIsRUFHM0JDLFVBSDJCLEVBSTNCN0IsYUFKMkIsRUFLM0JDLGdCQUwyQixFQU1HO0FBQzlCLFFBQU02QixpQkFBOEMsR0FBRyxFQUF2RDs7QUFDQSxRQUFJRCxVQUFKLEVBQWdCO0FBQ2ZBLE1BQUFBLFVBQVUsQ0FBQ0UsT0FBWCxDQUFtQixVQUFDckMsUUFBRCxFQUF3QjtBQUMxQyxZQUFNUixZQUFvQixHQUFHUSxRQUFRLENBQUM4QixJQUF0QztBQUNBLFlBQU1RLFFBQWdCLEdBQUcsQ0FBQ0osY0FBYyxHQUFHQSxjQUFjLEdBQUcsR0FBcEIsR0FBMEIsRUFBekMsSUFBK0MxQyxZQUF4RTs7QUFDQSxZQUFNK0MsY0FBYyxHQUFHbkMsMkJBQTJCLENBQUNiLFVBQUQsRUFBYVMsUUFBYixFQUF1QnNDLFFBQXZCLEVBQWlDaEMsYUFBakMsRUFBZ0RDLGdCQUFoRCxDQUFsRDs7QUFDQSxZQUFJZ0MsY0FBSixFQUFvQjtBQUNuQkgsVUFBQUEsaUJBQWlCLENBQUNFLFFBQUQsQ0FBakIsR0FBOEJDLGNBQTlCO0FBQ0E7QUFDRCxPQVBEO0FBUUE7O0FBQ0QsV0FBT0gsaUJBQVA7QUFDQSxHQW5CRDs7QUFxQkEsTUFBTUkseUJBQXlCLEdBQUcsVUFDakNqRCxVQURpQyxFQUVqQ2tELGFBRmlDLEVBR2pDbkMsYUFIaUMsRUFJakNDLGdCQUppQyxFQUtIO0FBQzlCLFFBQUltQyxlQUE0QyxHQUFHLEVBQW5EOztBQUNBLFFBQUlELGFBQUosRUFBbUI7QUFDbEJBLE1BQUFBLGFBQWEsQ0FBQ0osT0FBZCxDQUFzQixVQUFDN0MsWUFBRCxFQUEwQjtBQUMvQyxZQUFJbUQsb0JBQUo7QUFFQSxZQUFNM0MsUUFBdUMsR0FBR1QsVUFBVSxDQUFDVSxXQUFYLENBQXVCVCxZQUF2QixDQUFoRDs7QUFDQSxZQUFJUSxRQUFRLEtBQUtRLFNBQWpCLEVBQTRCO0FBQzNCO0FBQ0E7O0FBQ0QsWUFBSVIsUUFBUSxDQUFDRSxLQUFULEtBQW1CLG9CQUF2QixFQUE2QztBQUM1QztBQUNBeUMsVUFBQUEsb0JBQW9CLEdBQUdWLG1CQUFtQixDQUN6QzFDLFVBRHlDLEVBRXpDQyxZQUZ5QyxFQUd6Q1EsUUFBUSxDQUFDUyxVQUFULENBQW9CbUMsZ0JBSHFCLEVBSXpDdEMsYUFKeUMsRUFLekNDLGdCQUx5QyxDQUExQztBQU9BLFNBVEQsTUFTTyxJQUFJUCxRQUFRLENBQUNTLFVBQVQsS0FBd0JELFNBQTVCLEVBQXVDO0FBQzdDO0FBQ0FtQyxVQUFBQSxvQkFBb0IsR0FBR1YsbUJBQW1CLENBQ3pDMUMsVUFEeUMsRUFFekNDLFlBRnlDLEVBR3pDUSxRQUFRLENBQUNTLFVBQVQsQ0FBb0IwQixVQUhxQixFQUl6QzdCLGFBSnlDLEVBS3pDQyxnQkFMeUMsQ0FBMUM7QUFPQSxTQVRNLE1BU0E7QUFDTixjQUFNMkIsY0FBYyxHQUFHMUMsWUFBWSxDQUFDcUQsUUFBYixDQUFzQixHQUF0QixJQUNwQnJELFlBQVksQ0FDWEUsS0FERCxDQUNPLEdBRFAsRUFFQ29ELE1BRkQsQ0FFUSxDQUZSLEVBRVcsQ0FGWCxFQUdDQyxJQUhELENBR00sR0FITixDQURvQixHQUtwQixFQUxIO0FBTUFKLFVBQUFBLG9CQUFvQixHQUFHVixtQkFBbUIsQ0FBQzFDLFVBQUQsRUFBYTJDLGNBQWIsRUFBNkIsQ0FBQ2xDLFFBQUQsQ0FBN0IsRUFBeUNNLGFBQXpDLEVBQXdEQyxnQkFBeEQsQ0FBMUM7QUFDQTs7QUFFRG1DLFFBQUFBLGVBQWUscUJBQ1hBLGVBRFcsTUFFWEMsb0JBRlcsQ0FBZjtBQUlBLE9BdkNEO0FBd0NBOztBQUNELFdBQU9ELGVBQVA7QUFDQSxHQWxERDtBQW9EQTs7Ozs7Ozs7QUFNQSxXQUFTTSx5QkFBVCxDQUFtQ0MsVUFBbkMsRUFBNEc7QUFDM0csUUFBTUMsY0FBMkMsR0FBRyxFQUFwRDtBQUNBRCxJQUFBQSxVQUFVLENBQUNFLElBQVgsQ0FBZ0JkLE9BQWhCLENBQXdCLFVBQUNlLFNBQUQsRUFBdUM7QUFDOUQsVUFBSUEsU0FBUyxDQUFDQyxLQUFWLEtBQW9CLHNDQUF4QixFQUFnRTtBQUFBOztBQUMvREgsUUFBQUEsY0FBYyxDQUFDRSxTQUFTLENBQUNFLEtBQVYsQ0FBZ0JDLElBQWpCLENBQWQsR0FBdUM7QUFDdEN4QixVQUFBQSxLQUFLLEVBQUVrQixVQUFVLENBQUNPLGtCQURvQjtBQUV0Q3hCLFVBQUFBLFVBQVUsRUFDVE4sY0FBYyxDQUNiQyxvQkFBb0IsQ0FBQ3NCLFVBQVUsQ0FBQ3BCLEtBQVgsOEJBQW9Cb0IsVUFBVSxDQUFDdkMsV0FBL0Isb0ZBQW9CLHNCQUF3QmtCLE1BQTVDLDJEQUFvQix1QkFBZ0NDLEtBQXBELEtBQTZEb0IsVUFBVSxDQUFDUSxTQUF6RSxDQURQLENBQWQsSUFFS1IsVUFBVSxDQUFDUTtBQUxxQixTQUF2QztBQU9BO0FBQ0QsS0FWRDtBQVdBLFdBQU9QLGNBQVA7QUFDQTtBQUVEOzs7Ozs7O0FBS0EsV0FBU1Esc0JBQVQsQ0FBZ0NDLEtBQWhDLEVBQXlGO0FBQ3hGLFFBQU1DLE1BQTRCLEdBQUcsRUFBckM7QUFDQUQsSUFBQUEsS0FBSyxDQUFDdEIsT0FBTixDQUFjLFVBQVN3QixJQUFULEVBQWU7QUFDNUIsVUFBSSxDQUFFQSxJQUFELENBQStCQyxJQUFwQyxFQUEwQztBQUN6QyxZQUFNQyxjQUFjLEdBQUlGLElBQUQsQ0FBaUNHLHNCQUFqQyxHQUNuQkgsSUFBRCxDQUFpQ0csc0JBQWpDLENBQXdERCxjQURwQyxHQUVuQkYsSUFBRCxDQUErQkksWUFBL0IsQ0FBNENGLGNBRi9DO0FBSUFBLFFBQUFBLGNBQWMsQ0FBQzFCLE9BQWYsQ0FBdUIsVUFBUzZCLGFBQVQsRUFBd0I7QUFDOUMsY0FBSUEsYUFBYSxDQUFDSixJQUFkLEtBQXVCSyxpQkFBaUIsQ0FBQ0MsS0FBN0MsRUFBb0Q7QUFDbkRSLFlBQUFBLE1BQU0sQ0FBQ1MsSUFBUCxDQUFZSCxhQUFaO0FBQ0E7QUFDRCxTQUpEO0FBS0E7QUFDRCxLQVpEO0FBYUEsV0FBT04sTUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7OztBQU9BLFdBQVNVLDJCQUFULENBQXFDQyxnQkFBckMsRUFBNkVoRSxnQkFBN0UsRUFBMEg7QUFDekgsUUFDQ0EsZ0JBQWdCLENBQUNpRSxrQkFBakIsR0FBc0NDLHlCQUF0QyxNQUNBbEUsZ0JBQWdCLENBQUNtRSxlQUFqQixPQUF1Q0MsWUFBWSxDQUFDQyxrQkFGckQsRUFHRTtBQUNELGFBQU8sSUFBUDtBQUNBLEtBTndILENBT3pIO0FBQ0E7OztBQUNBLFFBQU1DLFlBQVksR0FBR3RFLGdCQUFnQixDQUFDdUUsY0FBakIsRUFBckI7QUFDQSxXQUFPQyxzQ0FBc0MsQ0FBQ1IsZ0JBQUQsRUFBbUJNLFlBQW5CLENBQTdDO0FBQ0E7QUFFRDs7Ozs7Ozs7QUFNQSxXQUFTRSxzQ0FBVCxDQUFnRFIsZ0JBQWhELEVBQXdGUyxXQUF4RixFQUF5SDtBQUN4SCxRQUFJQSxXQUFXLElBQUlULGdCQUFnQixDQUFDMUUsTUFBakIsR0FBMEIsQ0FBN0MsRUFBZ0Q7QUFDL0MsYUFBTzBFLGdCQUFnQixDQUFDVSxLQUFqQixDQUF1QixVQUFBZixhQUFhLEVBQUk7QUFDOUMsZUFBT0EsYUFBYSxDQUFDZ0IsZUFBZCxJQUFpQ0YsV0FBVyxLQUFLZCxhQUFhLENBQUNpQixVQUFkLENBQXlCQyxVQUFqRjtBQUNBLE9BRk0sQ0FBUDtBQUdBOztBQUNELFdBQU8sS0FBUDtBQUNBO0FBRUQ7Ozs7Ozs7QUFLQSxXQUFTQyxtQkFBVCxDQUE2QjlFLGdCQUE3QixFQUFnRjtBQUFBOztBQUMvRSxRQUFNK0UsbUJBQW1CLEdBQUcvRSxnQkFBZ0IsQ0FBQ2dGLHNCQUFqQixFQUE1QjtBQUNBLFFBQU1DLG1CQUFtQixHQUFHRixtQkFBbUIsQ0FBQ0csaUJBQXBCLENBQXNDbEcsVUFBbEU7QUFDQSxRQUFNbUcsZUFBZSxHQUFHLENBQUMsMkJBQUNGLG1CQUFtQixDQUFDOUUsV0FBckIsb0ZBQUMsc0JBQWlDa0IsTUFBbEMsMkRBQUMsdUJBQXlDK0QsYUFBMUMsQ0FBekI7QUFDQSxRQUFNQyx5QkFBeUIsR0FDOUJGLGVBQWUsSUFBSW5GLGdCQUFnQixDQUFDc0Ysc0JBQWpCLENBQXdDLE1BQU1QLG1CQUFtQixDQUFDRyxpQkFBcEIsQ0FBc0MzRCxJQUFwRixDQURwQjtBQUdBLFFBQU1nRSxlQUFlLEdBQUlGLHlCQUF5QixHQUMvQ0osbUJBQW1CLENBQUM1QyxnQkFBcEIsQ0FBcUNtRCxHQUFyQyxDQUF5QyxVQUFTL0YsUUFBVCxFQUFtQjtBQUM1RCxhQUFPZ0csZUFBZSxDQUFDLEVBQUQsRUFBb0NoRyxRQUFRLENBQUM4QixJQUE3QyxFQUFtRDhELHlCQUFuRCxFQUE4RUosbUJBQTlFLENBQXRCO0FBQ0MsS0FGRCxDQUQrQyxHQUkvQyxFQUpIO0FBTUEsV0FBT00sZUFBUDtBQUNBO0FBRUQ7Ozs7Ozs7Ozs7QUFTTyxNQUFNRyxrQkFBa0IsR0FBRyxVQUFTMUYsZ0JBQVQsRUFBaUc7QUFBQTs7QUFBQSxRQUFwRDJGLFFBQW9ELHVFQUFuQixFQUFtQjtBQUNsSTtBQUNBLFFBQU1DLGlCQUFrRCxHQUFHQyxvQkFBb0IsQ0FBQ0YsUUFBRCxFQUFXM0YsZ0JBQVgsQ0FBL0UsQ0FGa0ksQ0FJbEk7O0FBQ0EsUUFBTThGLHdCQUFpRCxHQUFHQywyQkFBMkIsQ0FBQ0gsaUJBQUQsQ0FBckY7QUFDQSxRQUFNNUcsVUFBVSxHQUFHZ0IsZ0JBQWdCLENBQUNnRyxhQUFqQixFQUFuQjtBQUNBLFFBQU1DLFlBQVksNEJBQUdqSCxVQUFVLENBQUNtQixXQUFYLENBQXVCQyxFQUExQiwwREFBRyxzQkFBMkI4RixZQUFoRDtBQUNBLFFBQUl2RCxjQUEyQyxHQUFHLEVBQWxEO0FBRUEsUUFBTXdELFlBQVksR0FBR25HLGdCQUFnQixDQUFDb0csb0JBQWpCLENBQXNDLElBQXRDLDBDQUFyQjs7QUFFQSxRQUFJSCxZQUFZLEtBQUtoRyxTQUFqQixJQUE4QmdHLFlBQVksQ0FBQzNHLE1BQWIsR0FBc0IsQ0FBeEQsRUFBMkQ7QUFDMUQsV0FBSyxJQUFNK0csQ0FBWCxJQUFnQkYsWUFBaEIsRUFBOEI7QUFDN0J4RCxRQUFBQSxjQUFjLHFCQUNWQSxjQURVLE1BRVZGLHlCQUF5QixDQUFDMEQsWUFBWSxDQUFDRSxDQUFELENBQWIsQ0FGZixDQUFkO0FBSUE7QUFDRCxLQVBELE1BT087QUFDTjFELE1BQUFBLGNBQWMsR0FBR3NELFlBQVksQ0FBQ0ssTUFBYixDQUFvQixVQUFDQyxhQUFELEVBQTZDQyxXQUE3QyxFQUFrRjtBQUN0SCxhQUFLLElBQUlILEVBQUMsR0FBRyxDQUFiLEVBQWdCQSxFQUFDLEdBQUlHLFdBQVcsQ0FBQ0MsTUFBWixDQUFtQkMsT0FBcEIsQ0FBMkM5RCxJQUEzQyxDQUFnRHRELE1BQXBFLEVBQTRFK0csRUFBQyxFQUE3RSxFQUFpRjtBQUFBOztBQUNoRkUsVUFBQUEsYUFBYSxDQUFHQyxXQUFXLENBQUNDLE1BQVosQ0FBbUJDLE9BQXBCLENBQTJDOUQsSUFBM0MsQ0FBZ0R5RCxFQUFoRCxDQUFELENBQXVFdEQsS0FBdkUsQ0FBNkVDLElBQTlFLENBQWIsR0FBbUc7QUFDbEd4QixZQUFBQSxLQUFLLEVBQUVnRixXQUFGLGFBQUVBLFdBQUYsMENBQUVBLFdBQVcsQ0FBRUcsRUFBZixvREFBRSxnQkFBaUJDLFFBQWpCLEVBRDJGO0FBRWxHbkYsWUFBQUEsVUFBVSxFQUFFK0UsV0FBRixhQUFFQSxXQUFGLDZDQUFFQSxXQUFXLENBQUVsRixLQUFmLHVEQUFFLG1CQUFvQnNGLFFBQXBCO0FBRnNGLFdBQW5HO0FBSUE7O0FBQ0QsZUFBT0wsYUFBUDtBQUNBLE9BUmdCLEVBUWQsRUFSYyxDQUFqQjtBQVNBOztBQUVELFFBQUlNLGNBQXFCLEdBQUcsRUFBNUI7QUFDQSxRQUFNQyxnQkFBZ0IsR0FBR0MsbUJBQW1CLENBQUMvSCxVQUFELEVBQWFnQixnQkFBYixDQUE1Qzs7QUFDQSxRQUFJOEcsZ0JBQUosRUFBc0I7QUFDckJELE1BQUFBLGNBQWMsR0FBR0MsZ0JBQWdCLENBQUNFLGFBQWxDO0FBQ0EsS0FuQ2lJLENBcUNsSTs7O0FBQ0EsUUFBTUMsWUFBeUMscUJBRTNDdkYsbUJBQW1CLENBQUMxQyxVQUFELEVBQWEsRUFBYixFQUFpQkEsVUFBVSxDQUFDcUQsZ0JBQTVCLEVBQThDLEtBQTlDLEVBQXFEckMsZ0JBQXJELENBRndCLE1BSTNDaUMseUJBQXlCLENBQzNCakQsVUFEMkIsRUFFM0JnQixnQkFBZ0IsQ0FBQ2lFLGtCQUFqQixHQUFzQ2lELHNCQUF0QyxHQUErREMsb0JBRnBDLEVBRzNCLEtBSDJCLEVBSTNCbkgsZ0JBSjJCLENBSmtCLENBQS9DLENBdENrSSxDQWtEbEk7OztBQUNBLFFBQU1vSCxjQUFjLEdBQUdDLHVCQUF1QixDQUFDSixZQUFELEVBQWVKLGNBQWYsRUFBK0I3SCxVQUEvQixFQUEyQ2dCLGdCQUEzQyxFQUE2RDhGLHdCQUE3RCxDQUE5Qzs7QUFDQSxRQUFNUCxlQUFlLEdBQUdULG1CQUFtQixDQUFDOUUsZ0JBQUQsQ0FBM0MsQ0FwRGtJLENBcURsSTs7O0FBQ0EsUUFBSXNILFVBQVUsR0FBRy9CLGVBQWUsQ0FDOUJnQyxNQURlLENBRWYsMkJBQUF2SSxVQUFVLENBQUNtQixXQUFYLDRHQUF3QkMsRUFBeEIsNEdBQTRCb0gsZUFBNUIsa0ZBQTZDbEIsTUFBN0MsQ0FBb0QsVUFBQ25FLGVBQUQsRUFBaUNILGNBQWpDLEVBQW9EO0FBQ3ZHLFVBQU0vQyxZQUFZLEdBQUcrQyxjQUFjLENBQUN5RixLQUFwQzs7QUFDQSxVQUFJLEVBQUV4SSxZQUFZLElBQUk2Ryx3QkFBbEIsQ0FBSixFQUFpRDtBQUNoRCxZQUFNNEIsV0FBb0MsR0FBR2pDLGVBQWUsQ0FBQ3dCLFlBQUQsRUFBZWhJLFlBQWYsRUFBNkJlLGdCQUE3QixFQUErQ2hCLFVBQS9DLENBQTVEOztBQUNBLFlBQUkwSSxXQUFKLEVBQWlCO0FBQ2hCQSxVQUFBQSxXQUFXLENBQUNsRyxLQUFaLEdBQW9CLEVBQXBCO0FBQ0FrRyxVQUFBQSxXQUFXLENBQUNqRyxVQUFaLEdBQXlCLEVBQXpCO0FBQ0FVLFVBQUFBLGVBQWUsQ0FBQzJCLElBQWhCLENBQXFCNEQsV0FBckI7QUFDQTtBQUNEOztBQUNELGFBQU92RixlQUFQO0FBQ0EsS0FYRCxFQVdHLEVBWEgsTUFXVSxFQWJLLEVBZWhCO0FBZmdCLEtBZ0Jmb0YsTUFoQmUsQ0FnQlJILGNBQWMsSUFBSSxFQWhCVixFQWlCaEI7QUFqQmdCLEtBa0JmRyxNQWxCZSxDQW1CZkksTUFBTSxDQUFDQyxJQUFQLENBQVlYLFlBQVosRUFDRVksTUFERixDQUNTLFVBQUE1SSxZQUFZO0FBQUEsYUFBSSxFQUFFQSxZQUFZLElBQUk2Ryx3QkFBbEIsQ0FBSjtBQUFBLEtBRHJCLEVBRUVOLEdBRkYsQ0FFTSxVQUFBdkcsWUFBWSxFQUFJO0FBQ3BCLGFBQU8wSSxNQUFNLENBQUNHLE1BQVAsQ0FBY2IsWUFBWSxDQUFDaEksWUFBRCxDQUExQixFQUEwQzBELGNBQWMsQ0FBQzFELFlBQUQsQ0FBeEQsQ0FBUDtBQUNBLEtBSkYsQ0FuQmUsQ0FBakI7QUF5QkEsUUFBTXFGLFlBQVksR0FBR3RFLGdCQUFnQixDQUFDdUUsY0FBakIsRUFBckIsQ0EvRWtJLENBaUZsSTs7QUFDQSxRQUFJQyxzQ0FBc0MsQ0FBQ21CLFFBQUQsRUFBV3JCLFlBQVgsQ0FBMUMsRUFBb0U7QUFDbkU7QUFDQTtBQUNBO0FBQ0EsVUFBTXlELFVBQVUsR0FBR3BDLFFBQVEsQ0FBQyxDQUFELENBQVIsQ0FBWW9DLFVBQS9COztBQUNBLFVBQUlBLFVBQUosRUFBZ0I7QUFDZixZQUFNQyxzQkFBZ0MsR0FBR0wsTUFBTSxDQUFDQyxJQUFQLENBQVlHLFVBQVosRUFBd0J2QyxHQUF4QixDQUE0QixVQUFBeUMsWUFBWTtBQUFBLGlCQUFJRixVQUFVLENBQUNFLFlBQUQsQ0FBVixDQUF5QkMsWUFBN0I7QUFBQSxTQUF4QyxDQUF6QztBQUNBWixRQUFBQSxVQUFVLEdBQUdBLFVBQVUsQ0FBQ08sTUFBWCxDQUFrQixVQUFBSCxXQUFXLEVBQUk7QUFDN0MsaUJBQU9NLHNCQUFzQixDQUFDRyxPQUF2QixDQUErQlQsV0FBVyxDQUFDckksR0FBM0MsTUFBb0QsQ0FBQyxDQUE1RDtBQUNBLFNBRlksQ0FBYjtBQUdBO0FBQ0Q7O0FBRUQsUUFBTThDLGVBQWUsR0FBR2lHLG9CQUFvQixDQUFDZCxVQUFELEVBQWFlLHVCQUF1QixDQUFDckosVUFBRCxFQUFhZ0IsZ0JBQWIsQ0FBcEMsRUFBb0U7QUFDL0csc0JBQWdCLFdBRCtGO0FBRS9Ha0IsTUFBQUEsS0FBSyxFQUFFLFdBRndHO0FBRy9Hb0gsTUFBQUEsUUFBUSxFQUFFLFdBSHFHO0FBSS9HQyxNQUFBQSxRQUFRLEVBQUUsV0FKcUc7QUFLL0dDLE1BQUFBLFFBQVEsRUFBRSxXQUxxRztBQU0vR0MsTUFBQUEsWUFBWSxFQUFFO0FBTmlHLEtBQXBFLENBQTVDO0FBUUEsV0FBT3RHLGVBQVA7QUFDQSxHQXhHTTs7OztBQTBHUCxNQUFNdUcsZ0JBQWdCLEdBQUcsVUFDeEIxSixVQUR3QixFQUV4QmdCLGdCQUZ3QixFQUd4QjJJLGFBSHdCLEVBSXhCQyxZQUp3QixFQUtJO0FBQUE7O0FBQzVCLFFBQU1ILFlBQTJCLEdBQUcsRUFBcEM7QUFDQSw4QkFBQXpKLFVBQVUsQ0FBQ21CLFdBQVgsNEdBQXdCQyxFQUF4Qiw0R0FBNEJvSCxlQUE1QixrRkFBNkNoQyxHQUE3QyxDQUFpRCxVQUFDeEQsY0FBRCxFQUF5QjtBQUN6RSxVQUFJMkcsYUFBYSxNQUFLM0csY0FBTCxhQUFLQSxjQUFMLHVCQUFLQSxjQUFjLENBQUV5RixLQUFyQixDQUFqQixFQUE2QztBQUFBOztBQUM1QyxZQUFNb0IsYUFBK0MsR0FBR0QsWUFBWSxDQUFDRCxhQUFELENBQXBFOztBQUNBLFlBQUlFLGFBQWEsS0FBSUEsYUFBSixhQUFJQSxhQUFKLHVCQUFJQSxhQUFhLENBQUVKLFlBQW5CLENBQWIsS0FBZ0RJLGFBQWhELGFBQWdEQSxhQUFoRCxnREFBZ0RBLGFBQWEsQ0FBRUosWUFBL0QsMERBQWdELHNCQUE2QkssU0FBN0UsQ0FBSixFQUE0RjtBQUFBOztBQUMzRixjQUFNQyxPQUFPLEdBQUdGLGFBQUgsYUFBR0EsYUFBSCxpREFBR0EsYUFBYSxDQUFFSixZQUFsQiwyREFBRyx1QkFBNkJLLFNBQTdDO0FBQ0EsY0FBTUUsd0JBQXdCLEdBQUdELE9BQU8sQ0FBQzVKLEtBQVIsQ0FBYyxHQUFkLENBQWpDO0FBQ0EsY0FBTThKLFdBQVcsR0FDaEJELHdCQUF3QixDQUFDMUosTUFBekIsR0FBa0MsQ0FBbEMsR0FBc0MsZUFBZTBKLHdCQUF3QixDQUFDLENBQUQsQ0FBN0UsR0FBbUZBLHdCQUF3QixDQUFDLENBQUQsQ0FENUc7QUFFQSxjQUFNRixTQUFjLDRCQUFHOUcsY0FBYyxDQUFDMEUsT0FBbEIsb0ZBQUcsc0JBQXdCdkcsV0FBM0IsMkRBQUcsdUJBQXFDa0IsTUFBckMsQ0FBNEM0SCxXQUE1QyxDQUF2Qjs7QUFDQSxjQUFJSCxTQUFKLEVBQWU7QUFBQTs7QUFDZCxnQkFBTUksY0FBYyxHQUFHSixTQUFILGFBQUdBLFNBQUgsdUJBQUdBLFNBQVMsQ0FBRUssY0FBbEM7QUFDQSxnQkFBTUMsOEJBQThCLEdBQUdwSixnQkFBZ0IsQ0FBQ3NGLHNCQUFqQixDQUN0QyxPQUFPNEQsY0FBYyw4QkFBSWxKLGdCQUFnQixDQUFDcUosWUFBakIsRUFBSiwwREFBSSxzQkFBaUM5SCxJQUFyQyxDQUFyQixDQURzQyxDQUF2QztBQUdBLGdCQUFNK0gsZUFBZSxHQUFHUixTQUFILGFBQUdBLFNBQUgsdUJBQUdBLFNBQVMsQ0FBRVMsVUFBbkM7QUFDQSxnQkFBSUMsWUFBSjtBQUNBLGdCQUFNQyxZQUEyQixHQUFHLEVBQXBDOztBQUNBLGdCQUFJSCxlQUFKLEVBQXFCO0FBQ3BCLG1CQUFLLElBQUlqRCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHaUQsZUFBZSxDQUFDaEssTUFBcEMsRUFBNEMrRyxDQUFDLEVBQTdDLEVBQWlEO0FBQUE7O0FBQ2hELG9CQUFNcUQsaUJBQWlCLHlCQUFJSixlQUFlLENBQUNqRCxDQUFELENBQWhCLENBQTRCc0QsaUJBQS9CLHVEQUFHLG1CQUErQ2xDLEtBQXpFO0FBQ0Esb0JBQU1tQyxpQkFBaUIsR0FBSU4sZUFBZSxDQUFDakQsQ0FBRCxDQUFoQixDQUE0QndELGlCQUF0RDs7QUFDQSxvQkFDQyxDQUFDLHVCQUFBUCxlQUFlLENBQUNqRCxDQUFELENBQWYsMEVBQW9CdkQsS0FBcEIsTUFBOEIsd0RBQTlCLElBQ0Esd0JBQUF3RyxlQUFlLENBQUNqRCxDQUFELENBQWYsNEVBQW9CdkQsS0FBcEIsTUFBOEIsc0RBRC9CLEtBRUE2RixhQUFhLEtBQUtlLGlCQUhuQixFQUlFO0FBQ0RGLGtCQUFBQSxZQUFZLEdBQUdGLGVBQWUsQ0FBQ2pELENBQUQsQ0FBOUI7QUFDQTs7QUFDRCxvQkFDQyxDQUFDLHdCQUFBaUQsZUFBZSxDQUFDakQsQ0FBRCxDQUFmLDRFQUFvQnZELEtBQXBCLE1BQThCLHdEQUE5QixJQUNBLHdCQUFBd0csZUFBZSxDQUFDakQsQ0FBRCxDQUFmLDRFQUFvQnZELEtBQXBCLE1BQThCLHFEQUQvQixLQUVBNkYsYUFBYSxLQUFLZSxpQkFIbkIsRUFJRTtBQUNELHNCQUFNSSxjQUFjLEdBQUdDLG9CQUFvQixDQUFDWCw4QkFBRCxFQUFpQ1EsaUJBQWpDLENBQTNDOztBQUNBLHNCQUFJLENBQUNFLGNBQUwsRUFBcUI7QUFDcEJMLG9CQUFBQSxZQUFZLENBQUMzRixJQUFiLENBQWtCO0FBQ2pCNEYsc0JBQUFBLGlCQUFpQixFQUFFQSxpQkFERjtBQUVqQkUsc0JBQUFBLGlCQUFpQixFQUFFQTtBQUZGLHFCQUFsQjtBQUlBO0FBQ0Q7QUFDRDtBQUNEOztBQUNELGdCQUFJSCxZQUFZLElBQUlBLFlBQVksQ0FBQ25LLE1BQWpDLEVBQXlDO0FBQ3hDbUssY0FBQUEsWUFBWSxDQUFDM0gsT0FBYixDQUFxQixVQUFTa0ksWUFBVCxFQUE0QjtBQUNoRCxvQkFBTUMsdUNBQXVDLEdBQUc5SSxjQUFjLENBQzdEK0ksaUNBQWlDLENBQ2hDbEssZ0JBQWdCLENBQ2RzRixzQkFERixDQUN5QnRGLGdCQUFnQixDQUFDWSx5QkFBakIsQ0FBMkNvSixZQUEzQyxhQUEyQ0EsWUFBM0MsdUJBQTJDQSxZQUFZLENBQUVOLGlCQUF6RCxDQUR6QixFQUVFMUUsc0JBRkYsRUFEZ0MsRUFJaEMsQ0FBQyxhQUFELENBSmdDLENBRDRCLENBQTlEO0FBUUEsb0JBQU1tRiw0Q0FBNEMsR0FBR2hKLGNBQWMsQ0FDbEUrSSxpQ0FBaUMsQ0FDaENkLDhCQUE4QixDQUM1QjlELHNCQURGLENBRUU4RCw4QkFBOEIsQ0FBQ3hJLHlCQUEvQixDQUF5RG9KLFlBQXpELGFBQXlEQSxZQUF6RCx1QkFBeURBLFlBQVksQ0FBRUosaUJBQXZFLENBRkYsRUFJRTVFLHNCQUpGLEVBRGdDLEVBTWhDLENBQUMsYUFBRCxDQU5nQyxDQURpQyxDQUFuRTs7QUFVQSxvQkFDQ21GLDRDQUE0QyxLQUFLLE1BQWpELElBQ0FGLHVDQUF1QyxLQUFLLE9BRjdDLEVBR0U7QUFDRCx3QkFBTSxJQUFJRyxLQUFKLENBQ0wsMkJBQTJCekIsYUFBM0IsR0FBMkMsd0RBRHRDLENBQU47QUFHQTtBQUNELGVBM0JEO0FBNEJBOztBQUNELGdCQUFNMEIsV0FBVyxHQUFHdkIsU0FBSCxhQUFHQSxTQUFILHVCQUFHQSxTQUFTLENBQUV3Qiw0QkFBL0I7QUFDQSxnQkFBTUMsV0FBVyxHQUFHekIsU0FBSCxhQUFHQSxTQUFILHVCQUFHQSxTQUFTLENBQUUwQix5QkFBL0I7QUFDQSxnQkFBTUMsWUFBaUIsR0FBR3JCLDhCQUFILGFBQUdBLDhCQUFILGdEQUFHQSw4QkFBOEIsQ0FBRXNCLHVCQUFoQyxDQUN6Qiw2QkFBNkJMLFdBREosQ0FBSCwwREFBRyxzQkFFdkJ6RixVQUZIO0FBR0EsZ0JBQU0rRixpQkFBaUIsR0FBRyxJQUFJQyxpQkFBSixDQUN6QnhCLDhCQUE4QixDQUFDcEQsYUFBL0IsRUFEeUIsRUFFekJvRCw4QkFGeUIsQ0FBMUI7O0FBSUEsZ0JBQUksQ0FBQ3VCLGlCQUFpQixDQUFDRSxvQkFBbEIsRUFBTCxFQUErQztBQUM5QztBQUNBOztBQUNELGdCQUFJSixZQUFKLEVBQWtCO0FBQUE7O0FBQ2pCLGtCQUFNSyxlQUFlLEdBQUdMLFlBQUgsYUFBR0EsWUFBSCx1QkFBR0EsWUFBWSxDQUFFTSxjQUF0QztBQUNBLGtCQUFNdEcsV0FBVyxHQUFHLE9BQU0yRSw4QkFBTixhQUFNQSw4QkFBTixpREFBTUEsOEJBQThCLENBQUVDLFlBQWhDLEVBQU4sMkRBQU0sdUJBQWdEOUgsSUFBdEQsQ0FBcEI7QUFDQWtILGNBQUFBLFlBQVksQ0FBQ2hFLFdBQWIsR0FBMkJBLFdBQTNCO0FBQ0Esa0JBQUl1RyxlQUFKOztBQUNBLG1CQUFLLElBQUkzRSxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHeUUsZUFBZSxDQUFDeEwsTUFBcEMsRUFBNEMrRyxHQUFDLEVBQTdDLEVBQWlEO0FBQUE7O0FBQ2hELG9CQUFJLDBCQUFBeUUsZUFBZSxDQUFDekUsR0FBRCxDQUFmLENBQW1CSyxPQUFuQixnRkFBNEJ1RSxJQUE1QixNQUFxQyxrQ0FBekMsRUFBNkU7QUFDNUVELGtCQUFBQSxlQUFlLEdBQUdGLGVBQWUsQ0FBQ3pFLEdBQUQsQ0FBakM7QUFDQTtBQUNBO0FBQ0Q7O0FBQ0Qsa0JBQUkyRSxlQUFKLEVBQXFCO0FBQUE7O0FBQ3BCLG9CQUFNRSxrQkFBdUMsR0FBR0MsbUJBQW1CLENBQ2xFL0IsOEJBRGtFLEVBRWxFNEIsZUFGa0UsRUFHbEVMLGlCQUhrRSxDQUFuRTs7QUFLQSxvQkFBSSxDQUFDTyxrQkFBTCxFQUF5QjtBQUN4QjtBQUNBOztBQUNELG9CQUFNRSxnQkFBeUIsdUJBQUdKLGVBQUgsOEVBQUcsaUJBQWlCdEUsT0FBcEIsb0ZBQUcsc0JBQTBCMkUsVUFBMUIsQ0FBcUMsQ0FBckMsQ0FBSCxxRkFBRyx1QkFBeUMzRSxPQUE1QyxxRkFBRyx1QkFBa0R2RyxXQUFyRCxxRkFBRyx1QkFBK0RDLEVBQWxFLHFGQUFHLHVCQUFtRUMsTUFBdEUsMkRBQUcsdUJBQTJFQyxPQUEzRSxFQUFsQztBQUNBLG9CQUFNZ0wsc0JBQStCLHdCQUFHTixlQUFILCtFQUFHLGtCQUFpQnRFLE9BQXBCLG9GQUFHLHNCQUEwQjJFLFVBQTFCLENBQXFDLENBQXJDLENBQUgscUZBQUcsdUJBQXlDM0UsT0FBNUMscUZBQUcsdUJBQWtEdkcsV0FBckQscUZBQUcsdUJBQStEQyxFQUFsRSxxRkFBRyx1QkFBbUVXLFlBQXRFLDJEQUFHLHVCQUFpRlQsT0FBakYsRUFBeEM7O0FBQ0Esb0JBQUk4SyxnQkFBZ0IsS0FBSyxJQUFyQixJQUE2QkUsc0JBQXNCLEtBQUssSUFBNUQsRUFBa0U7QUFDakU7QUFDQSxpQkFGRCxNQUVPO0FBQ04sc0JBQUlSLGVBQWUsSUFBSUEsZUFBZSxDQUFDeEwsTUFBdkMsRUFBK0M7QUFBQTs7QUFDOUNtSixvQkFBQUEsWUFBWSxDQUFDdUMsZUFBYixHQUErQkEsZUFBZSxHQUMzQzVCLDhCQUQyQyxhQUMzQ0EsOEJBRDJDLHVCQUMzQ0EsOEJBQThCLENBQUV4SSx5QkFBaEMsQ0FDQW9LLGVBQWUsQ0FBQy9ILGtCQUFoQixHQUFxQyxtQkFEckMsQ0FEMkMsR0FJM0NoRCxTQUpIO0FBS0F3SSxvQkFBQUEsWUFBWSxDQUFDOEMsc0JBQWIsR0FBc0NkLFlBQVksR0FDL0NyQiw4QkFEK0MsYUFDL0NBLDhCQUQrQyx1QkFDL0NBLDhCQUE4QixDQUFFeEkseUJBQWhDLENBQTBENkosWUFBWSxDQUFDeEgsa0JBQWIsR0FBa0MsR0FBNUYsQ0FEK0MsR0FFL0NoRCxTQUZIO0FBR0F3SSxvQkFBQUEsWUFBWSxDQUFDK0MsY0FBYixHQUE4QkMsY0FBYyxzQkFBQ1QsZUFBRCwrRUFBQyxrQkFBaUJ0RSxPQUFsQixvRkFBQyxzQkFBMEIyRSxVQUExQixDQUFxQyxDQUFyQyxDQUFELDJEQUFDLHVCQUF5QzVELEtBQTFDLENBQTVDO0FBQ0FnQixvQkFBQUEsWUFBWSxDQUFDZSxZQUFiLG9CQUE0QkEsWUFBNUIsMkVBQTRCLGNBQWNHLGlCQUExQywwREFBNEIsc0JBQWlDbEMsS0FBN0Q7QUFDQWdCLG9CQUFBQSxZQUFZLENBQUNnQixZQUFiLEdBQTRCQSxZQUE1QjtBQUNBLHdCQUFNaUMsUUFBUSxHQUFHeEIsaUNBQWlDLENBQ2pEbEssZ0JBQWdCLENBQ2RzRixzQkFERixDQUN5QnRGLGdCQUFnQixDQUFDWSx5QkFBakIsQ0FBMkMrSCxhQUEzQyxDQUR6QixFQUVFM0Qsc0JBRkYsRUFEaUQsRUFJakQsQ0FBQyxhQUFELEVBQWdCLFlBQWhCLENBSmlELENBQWxEOztBQU9BLHdCQUFJN0QsY0FBYyxDQUFDdUssUUFBRCxDQUFkLEtBQTZCLE1BQWpDLEVBQXlDO0FBQ3hDLDRCQUFNLElBQUl0QixLQUFKLENBQVUsNkRBQVYsQ0FBTjtBQUNBOztBQUVELHdCQUFNdUIsK0JBQW9DLEdBQUd6QixpQ0FBaUMsQ0FDN0VsSyxnQkFBZ0IsQ0FDZHNGLHNCQURGLENBQ3lCdEYsZ0JBQWdCLENBQUNZLHlCQUFqQixDQUEyQytILGFBQTNDLENBRHpCLEVBRUUzRCxzQkFGRixFQUQ2RSxFQUk3RSxDQUFDLGFBQUQsQ0FKNkUsQ0FBOUU7QUFNQXlELG9CQUFBQSxZQUFZLENBQUNtRCx3QkFBYixHQUF3Q3pLLGNBQWMsQ0FBQyxDQUFDd0ssK0JBQStCLENBQUNsRSxLQUFsQyxDQUF0RDtBQUNBZ0Isb0JBQUFBLFlBQVksQ0FBQ29ELFFBQWIsR0FBd0JDLGFBQWEsQ0FBQzlMLGdCQUFELEVBQW1CMkksYUFBbkIsQ0FBckM7QUFDQSx3QkFBSW9ELFlBQUo7O0FBQ0Esd0JBQUl4QixXQUFKLEVBQWlCO0FBQUE7O0FBQ2hCd0Isc0JBQUFBLFlBQVksR0FBRzNDLDhCQUFILGFBQUdBLDhCQUFILGlEQUFHQSw4QkFBOEIsQ0FBRXNCLHVCQUFoQyxDQUNkLDBCQUEwQkgsV0FEWixDQUFILDJEQUFHLHVCQUVaM0YsVUFGSDtBQUdBNkQsc0JBQUFBLFlBQVksQ0FBQ3VELDBCQUFiLEdBQTBDRCxZQUFZLEdBQ25EM0MsOEJBRG1ELGFBQ25EQSw4QkFEbUQsdUJBQ25EQSw4QkFBOEIsQ0FBRXhJLHlCQUFoQyxDQUNBbUwsWUFBWSxDQUFDOUksa0JBQWIsR0FBa0MsR0FEbEMsQ0FEbUQsR0FJbkRoRCxTQUpIO0FBS0E7O0FBQ0Qsd0JBQU1nTSxvQkFBb0IsNkJBQUc3Qyw4QkFBOEIsQ0FBQ0MsWUFBL0IsRUFBSCwyREFBRyx1QkFBK0NsSixXQUE1RTtBQUNBLHdCQUFJK0wscUJBQW9DLEdBQUcsRUFBM0M7QUFDQSx3QkFBTUMsa0JBQWtCLEdBQUdGLG9CQUFILGFBQUdBLG9CQUFILGdEQUFHQSxvQkFBb0IsQ0FBRUcsWUFBekIsb0ZBQUcsc0JBQW9DQyxrQkFBdkMsMkRBQUcsdUJBQ3hCQyxrQkFESDs7QUFFQSx3QkFBSUgsa0JBQUosYUFBSUEsa0JBQUosdUJBQUlBLGtCQUFrQixDQUFFN00sTUFBeEIsRUFBZ0M7QUFDL0I2TSxzQkFBQUEsa0JBQWtCLENBQUNySyxPQUFuQixDQUEyQixVQUFTeUssZ0JBQVQsRUFBZ0M7QUFDMURMLHdCQUFBQSxxQkFBcUIsQ0FBQ3BJLElBQXRCLENBQTJCeUksZ0JBQWdCLENBQUM5RSxLQUE1QztBQUNBLHVCQUZEO0FBR0E7O0FBQ0RnQixvQkFBQUEsWUFBWSxDQUFDMEQsa0JBQWIsR0FBa0NELHFCQUFsQzs7QUFDQSxpREFBSXpELFlBQVksQ0FBQzBELGtCQUFqQiwwREFBSSxzQkFBaUM3TSxNQUFyQyxFQUE2QztBQUM1QywwQkFBSSxDQUFDbUosWUFBWSxDQUFDZ0IsWUFBZCxJQUE4QixDQUFDaEIsWUFBWSxDQUFDZ0IsWUFBYixDQUEwQm5LLE1BQTdELEVBQXFFO0FBQ3BFLDRCQUFJLENBQUNtSixZQUFZLENBQUN1RCwwQkFBbEIsRUFBOEM7QUFDN0N2RCwwQkFBQUEsWUFBWSxDQUFDK0Qsb0JBQWIsR0FBb0MsSUFBcEM7QUFDQSx5QkFGRCxNQUVPO0FBQUE7O0FBQ04sOEJBQUlDLGFBQW9CLEdBQUcsRUFBM0I7QUFDQSwyQ0FBQVYsWUFBWSxVQUFaLHNEQUFjL0UsYUFBZCxDQUE0QmxGLE9BQTVCLENBQW9DLFVBQVM0SyxhQUFULEVBQTZCO0FBQ2hFRCw0QkFBQUEsYUFBYSxDQUFDM0ksSUFBZCxDQUFtQjRJLGFBQWEsQ0FBQ0MsWUFBZCxDQUEyQmxGLEtBQTlDO0FBQ0EsMkJBRkQ7QUFHQXlFLDBCQUFBQSxxQkFBcUIsR0FBR0EscUJBQXFCLENBQUNVLElBQXRCLEVBQXhCO0FBQ0FILDBCQUFBQSxhQUFhLEdBQUdBLGFBQWEsQ0FBQ0csSUFBZCxFQUFoQjtBQUNBbkUsMEJBQUFBLFlBQVksQ0FBQytELG9CQUFiLEdBQW9DTixxQkFBcUIsQ0FBQ1csSUFBdEIsQ0FBMkIsVUFBU0MsS0FBVCxFQUFnQjtBQUM5RSxtQ0FBT0wsYUFBYSxDQUFDdEUsT0FBZCxDQUFzQjJFLEtBQXRCLE1BQWlDLENBQUMsQ0FBekM7QUFDQSwyQkFGbUMsQ0FBcEM7QUFHQTtBQUNELHVCQWRELE1BY087QUFDTnJFLHdCQUFBQSxZQUFZLENBQUMrRCxvQkFBYixHQUFvQyxLQUFwQztBQUNBO0FBQ0QscUJBbEJELE1Ba0JPO0FBQ04vRCxzQkFBQUEsWUFBWSxDQUFDK0Qsb0JBQWIsR0FBb0MsS0FBcEM7QUFDQTtBQUNEO0FBQ0Q7QUFDRCxlQXpGRCxNQXlGTztBQUNOeE0sZ0JBQUFBLGdCQUFnQixDQUNkK00sY0FERixHQUVFQyxRQUZGLENBRVdDLGFBQWEsQ0FBQ0MsVUFGekIsRUFFcUNDLGFBQWEsQ0FBQ0MsSUFGbkQsRUFFeURDLFNBQVMsQ0FBQ0MsdUJBQVYsQ0FBa0NDLEtBRjNGO0FBR0E7QUFDRCxhQXpHRCxNQXlHTztBQUNOdk4sY0FBQUEsZ0JBQWdCLENBQ2QrTSxjQURGLEdBRUVDLFFBRkYsQ0FFV0MsYUFBYSxDQUFDQyxVQUZ6QixFQUVxQ0MsYUFBYSxDQUFDQyxJQUZuRCxFQUV5REMsU0FBUyxDQUFDQyx1QkFBVixDQUFrQ0UsbUJBRjNGO0FBR0E7QUFDRCxXQTFMRCxNQTBMTztBQUNOeE4sWUFBQUEsZ0JBQWdCLENBQ2QrTSxjQURGLEdBRUVDLFFBRkYsQ0FFV0MsYUFBYSxDQUFDQyxVQUZ6QixFQUVxQ0MsYUFBYSxDQUFDQyxJQUZuRCxFQUV5REMsU0FBUyxDQUFDQyx1QkFBVixDQUFrQ0csU0FGM0Y7QUFHQTtBQUNELFNBck1ELE1BcU1PO0FBQ056TixVQUFBQSxnQkFBZ0IsQ0FDZCtNLGNBREYsR0FFRUMsUUFGRixDQUVXQyxhQUFhLENBQUNTLFFBRnpCLEVBRW1DUCxhQUFhLENBQUNDLElBRmpELEVBRXVEQyxTQUFTLENBQUNDLHVCQUFWLENBQWtDRyxTQUZ6RjtBQUdBO0FBQ0Q7QUFDRCxLQTlNRDs7QUErTUEsUUFBSTlGLE1BQU0sQ0FBQ0MsSUFBUCxDQUFZYSxZQUFaLEVBQTBCbkosTUFBMUIsR0FBbUMsQ0FBdkMsRUFBMEM7QUFDekMsYUFBT21KLFlBQVA7QUFDQTtBQUNELEdBek5EO0FBMk5BOzs7Ozs7Ozs7QUFRQSxNQUFNMEMsbUJBQW1CLEdBQUcsVUFDM0JuTCxnQkFEMkIsRUFFM0JnTCxlQUYyQixFQUczQkwsaUJBSDJCLEVBSUw7QUFBQTs7QUFDdEIsUUFBSWdELFlBQUosRUFBa0JDLFVBQWxCLEVBQThCQyxhQUE5QjtBQUNBLFFBQU1DLFFBQWdCLEdBQUc5QyxlQUFILGFBQUdBLGVBQUgsaURBQUdBLGVBQWUsQ0FBRXRFLE9BQXBCLHFGQUFHLHVCQUEwQnFILFFBQTFCLENBQW1DLENBQW5DLENBQUgsMkRBQUcsdUJBQXVDdEcsS0FBaEU7QUFDQSxRQUFNdUcsVUFBa0IsR0FBR2hELGVBQUgsYUFBR0EsZUFBSCxpREFBR0EsZUFBZSxDQUFFdEUsT0FBcEIsc0ZBQUcsdUJBQTBCMkUsVUFBMUIsQ0FBcUMsQ0FBckMsQ0FBSCw0REFBRyx3QkFBeUM1RCxLQUFwRTtBQUNBLFFBQU13RyxnQkFBZ0IsR0FBR3RELGlCQUFpQixDQUFDdUQsNkJBQWxCLEVBQXpCO0FBQ0EsUUFBTUMsa0JBQWtCLEdBQUduTyxnQkFBZ0IsQ0FBQ29HLG9CQUFqQixDQUMxQixXQUQwQixFQUUxQix3REFGMEIsRUFHMUIsQ0FBQ3BHLGdCQUFnQixDQUFDb08sa0JBQWpCLEVBQUQsRUFBd0NwTyxnQkFBZ0IsQ0FBQ2dHLGFBQWpCLEVBQXhDLENBSDBCLENBQTNCOztBQUtBLFFBQUlpSSxnQkFBZ0IsQ0FBQ0gsUUFBRCxDQUFwQixFQUFnQztBQUMvQkgsTUFBQUEsWUFBWSxHQUFHRyxRQUFmO0FBQ0EsS0FGRCxNQUVPLElBQUlLLGtCQUFrQixJQUFJQSxrQkFBa0IsQ0FBQyxDQUFELENBQTVDLEVBQWlEO0FBQ3ZELFVBQU1FLGFBQWEsR0FBR0Ysa0JBQWtCLENBQUMsQ0FBRCxDQUF4QztBQUNBRSxNQUFBQSxhQUFhLENBQUN4QixJQUFkLENBQW1CLFVBQVN5QixVQUFULEVBQTBCO0FBQzVDLFlBQUlBLFVBQVUsQ0FBQ0MsSUFBWCxLQUFvQlQsUUFBeEIsRUFBa0M7QUFDakNILFVBQUFBLFlBQVksR0FBR1csVUFBSCxhQUFHQSxVQUFILHVCQUFHQSxVQUFVLENBQUVFLG9CQUFaLENBQWlDL0csS0FBaEQ7QUFDQTtBQUNELE9BSkQ7QUFLQTs7QUFDRCxRQUFNZ0gsK0JBQStCLEdBQUksMkJBQUF6TyxnQkFBZ0IsQ0FBQ3FKLFlBQWpCLDhHQUFpQ2xKLFdBQWpDLDRHQUE4Q3VPLFdBQTlDLDRHQUEyREMsY0FBM0Qsa0ZBQ3RDQyxzQkFEc0MsS0FDWixFQUQ3QjtBQUVBLFFBQU1DLDRCQUE0QixHQUFJLDJCQUFBN08sZ0JBQWdCLENBQUNxSixZQUFqQiw4R0FBaUNsSixXQUFqQyw0R0FBOEN1TyxXQUE5Qyw0R0FBMkRDLGNBQTNELGtGQUEyRUcsbUJBQTNFLEtBQ3JDLEVBREQ7O0FBRUEsUUFBSUwsK0JBQStCLElBQUlBLCtCQUErQixDQUFDblAsTUFBdkUsRUFBK0U7QUFDOUUsV0FBSyxJQUFJK0csQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR29JLCtCQUErQixDQUFDblAsTUFBcEQsRUFBNEQrRyxDQUFDLEVBQTdELEVBQWlFO0FBQUE7O0FBQ2hFLFlBQUksMEJBQUFvSSwrQkFBK0IsQ0FBQ3BJLENBQUQsQ0FBL0IsMEdBQW9DMEksUUFBcEMsa0ZBQThDdEgsS0FBOUMsTUFBd0RrRyxZQUE1RCxFQUEwRTtBQUN6RUUsVUFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0E7QUFDRDtBQUNEOztBQUNELFFBQUlnQiw0QkFBNEIsSUFBSUEsNEJBQTRCLENBQUN2UCxNQUFqRSxFQUF5RTtBQUN4RSxXQUFLLElBQUkrRyxHQUFDLEdBQUcsQ0FBYixFQUFnQkEsR0FBQyxHQUFHd0ksNEJBQTRCLENBQUN2UCxNQUFqRCxFQUF5RCtHLEdBQUMsRUFBMUQsRUFBOEQ7QUFBQTs7QUFDN0QsWUFBSSwwQkFBQXdJLDRCQUE0QixDQUFDeEksR0FBRCxDQUE1QixnRkFBaUNvQixLQUFqQyxNQUEyQ3VHLFVBQS9DLEVBQTJEO0FBQzFESixVQUFBQSxVQUFVLEdBQUcsSUFBYjtBQUNBO0FBQ0Q7QUFDRDs7QUFDRCxXQUFPQyxhQUFhLElBQUlELFVBQXhCO0FBQ0EsR0EzQ0Q7O0FBNkNBLE1BQU12Ryx1QkFBdUIsR0FBRyxVQUMvQkosWUFEK0IsRUFFL0JKLGNBRitCLEVBRy9CN0gsVUFIK0IsRUFJL0JnQixnQkFKK0IsRUFLL0I4Rix3QkFMK0IsRUFNZjtBQUFBOztBQUNoQixRQUFNM0QsZUFBOEIsR0FBRyxFQUF2QztBQUNBLFFBQU02TSxpQkFBc0IsR0FBRyxFQUEvQjtBQUNBLFFBQU1wTixVQUFVLEdBQUc1QyxVQUFVLENBQUNxRCxnQkFBOUIsQ0FIZ0IsQ0FJaEI7O0FBQ0EsOEJBQUFyRCxVQUFVLENBQUNtQixXQUFYLDRHQUF3QkMsRUFBeEIsNkdBQTRCb0gsZUFBNUIsb0ZBQTZDMUYsT0FBN0MsQ0FBcUQsVUFBQW1OLGNBQWMsRUFBSTtBQUN0RUQsTUFBQUEsaUJBQWlCLENBQUNDLGNBQWMsQ0FBQ3hILEtBQWhCLENBQWpCLEdBQTBDLElBQTFDO0FBQ0EsS0FGRDs7QUFHQSxRQUFJWixjQUFjLElBQUlBLGNBQWMsQ0FBQ3ZILE1BQWYsR0FBd0IsQ0FBOUMsRUFBaUQ7QUFDaER1SCxNQUFBQSxjQUFjLFNBQWQsSUFBQUEsY0FBYyxXQUFkLFlBQUFBLGNBQWMsQ0FBRS9FLE9BQWhCLENBQXdCLFVBQUNvTixZQUFELEVBQW9DO0FBQUE7O0FBQzNELFlBQU1DLFlBQWlCLEdBQUdELFlBQVksQ0FBQ3ZDLFlBQXZDO0FBQ0EsWUFBTWhFLGFBQXFCLEdBQUd3RyxZQUFZLENBQUMxSCxLQUEzQztBQUNBLFlBQU11SCxpQkFBc0IsR0FBRyxFQUEvQjtBQUNBLG1DQUFBaFEsVUFBVSxDQUFDbUIsV0FBWCwrR0FBd0JDLEVBQXhCLCtHQUE0Qm9ILGVBQTVCLG9GQUE2QzFGLE9BQTdDLENBQXFELFVBQUFtTixjQUFjLEVBQUk7QUFDdEVELFVBQUFBLGlCQUFpQixDQUFDQyxjQUFjLENBQUN4SCxLQUFoQixDQUFqQixHQUEwQyxJQUExQztBQUNBLFNBRkQ7O0FBR0EsWUFBSSxFQUFFa0IsYUFBYSxJQUFJN0Msd0JBQW5CLENBQUosRUFBa0Q7QUFDakQsY0FBSSxFQUFFNkMsYUFBYSxJQUFJcUcsaUJBQW5CLENBQUosRUFBMkM7QUFDMUMsZ0JBQU1JLFlBQW9DLEdBQUczSixlQUFlLENBQUN3QixZQUFELEVBQWUwQixhQUFmLEVBQThCM0ksZ0JBQTlCLEVBQWdEaEIsVUFBaEQsQ0FBNUQ7O0FBQ0EsZ0JBQUlvUSxZQUFKLEVBQWlCO0FBQ2hCak4sY0FBQUEsZUFBZSxDQUFDMkIsSUFBaEIsQ0FBcUJzTCxZQUFyQjtBQUNBO0FBQ0Q7QUFDRDtBQUNELE9BZkQ7QUFnQkEsS0FqQkQsTUFpQk8sSUFBSXhOLFVBQUosRUFBZ0I7QUFDdEJBLE1BQUFBLFVBQVUsQ0FBQ0UsT0FBWCxDQUFtQixVQUFDckMsUUFBRCxFQUF3QjtBQUFBOztBQUMxQyxZQUFNNFAsa0JBQWtCLDZCQUFHNVAsUUFBUSxDQUFDVSxXQUFaLHNGQUFHLHVCQUFzQmtCLE1BQXpCLDREQUFHLHdCQUE4QmlPLGtCQUF6RDtBQUNBLFlBQU1DLFlBQVksR0FBRzlQLFFBQVEsQ0FBQzhCLElBQTlCOztBQUNBLFlBQUksRUFBRWdPLFlBQVksSUFBSXpKLHdCQUFsQixDQUFKLEVBQWlEO0FBQ2hELGNBQUl1SixrQkFBa0IsSUFBSSxFQUFFRSxZQUFZLElBQUlQLGlCQUFsQixDQUExQixFQUFnRTtBQUMvRCxnQkFBTUksYUFBb0MsR0FBRzNKLGVBQWUsQ0FBQ3dCLFlBQUQsRUFBZXNJLFlBQWYsRUFBNkJ2UCxnQkFBN0IsRUFBK0NoQixVQUEvQyxDQUE1RDs7QUFDQSxnQkFBSW9RLGFBQUosRUFBaUI7QUFDaEJqTixjQUFBQSxlQUFlLENBQUMyQixJQUFoQixDQUFxQnNMLGFBQXJCO0FBQ0E7QUFDRDtBQUNEO0FBQ0QsT0FYRDtBQVlBOztBQUNELFdBQU9qTixlQUFQO0FBQ0EsR0E5Q0Q7O0FBZ0RBLE1BQU1zRCxlQUFlLEdBQUcsVUFDdkJ3QixZQUR1QixFQUV2QmhJLFlBRnVCLEVBR3ZCZSxnQkFIdUIsRUFJdkJoQixVQUp1QixFQUtHO0FBQzFCLFFBQUkwSSxXQUFvQyxHQUFHVCxZQUFZLENBQUNoSSxZQUFELENBQXZEOztBQUNBLFFBQUl5SSxXQUFKLEVBQWlCO0FBQ2hCLGFBQU9ULFlBQVksQ0FBQ2hJLFlBQUQsQ0FBbkI7QUFDQSxLQUZELE1BRU87QUFDTnlJLE1BQUFBLFdBQVcsR0FBRzdILDJCQUEyQixDQUFDYixVQUFELEVBQWFBLFVBQVUsQ0FBQ1UsV0FBWCxDQUF1QlQsWUFBdkIsQ0FBYixFQUFtREEsWUFBbkQsRUFBaUUsSUFBakUsRUFBdUVlLGdCQUF2RSxDQUF6QztBQUNBOztBQUNELFFBQUksQ0FBQzBILFdBQUwsRUFBa0I7QUFDakIxSCxNQUFBQSxnQkFBZ0IsQ0FBQytNLGNBQWpCLEdBQWtDQyxRQUFsQyxDQUEyQ0MsYUFBYSxDQUFDQyxVQUF6RCxFQUFxRUMsYUFBYSxDQUFDQyxJQUFuRixFQUF5RkMsU0FBUyxDQUFDbUMsc0JBQW5HO0FBQ0EsS0FUeUIsQ0FVMUI7OztBQUNBLFFBQUk5SCxXQUFKLEVBQWlCO0FBQUE7O0FBQ2hCQSxNQUFBQSxXQUFXLENBQUM1RyxZQUFaLEdBQTJCRSxnQkFBZ0IsQ0FBQ3lPLE9BQTVDO0FBQ0EvSCxNQUFBQSxXQUFXLENBQUNnSSxXQUFaLEdBQTBCLENBQUMsNkJBQUMxUSxVQUFVLENBQUNtQixXQUFaLHVGQUFDLHdCQUF3QmtCLE1BQXpCLDREQUFDLHdCQUFnQytELGFBQWpDLENBQTNCO0FBQ0E7O0FBQ0QsV0FBT3NDLFdBQVA7QUFDQSxHQXJCRDs7QUF1QkEsTUFBTWlJLHVCQUF1QixHQUFHLFVBQVMxSSxZQUFULEVBQXNHO0FBQ3JJLFFBQU0ySSxvQkFBeUIsR0FBRyxFQUFsQzs7QUFDQSxTQUFLLElBQU1sSSxXQUFYLElBQTBCVCxZQUExQixFQUF3QztBQUFBOztBQUN2QyxtQ0FBSUEsWUFBWSxDQUFDUyxXQUFELENBQWhCLG9GQUFJLHNCQUEyQmMsUUFBL0IscUZBQUksdUJBQXFDcUgsYUFBekMsMkRBQUksdUJBQW9EdlEsTUFBeEQsRUFBZ0U7QUFBQTs7QUFDL0RzUSxRQUFBQSxvQkFBb0IsQ0FBQ2xJLFdBQUQsQ0FBcEIsNkJBQW9DVCxZQUFZLENBQUNTLFdBQUQsQ0FBaEQscUZBQW9DLHVCQUEyQmMsUUFBL0QsMkRBQW9DLHVCQUFxQ3FILGFBQXpFO0FBQ0E7QUFDRDs7QUFDRCxXQUFPRCxvQkFBUDtBQUNBLEdBUkQ7O0FBVU8sTUFBTUUsY0FBYyxHQUFHLFVBQVM3USxZQUFULEVBQStCZSxnQkFBL0IsRUFBbUVoQixVQUFuRSxFQUEyRjtBQUN4SCxXQUFPeUcsZUFBZSxDQUFDLEVBQUQsRUFBS3hHLFlBQUwsRUFBbUJlLGdCQUFuQixFQUFxQ2hCLFVBQXJDLENBQXRCO0FBQ0EsR0FGTTtBQUlQOzs7Ozs7Ozs7OztBQU9BLE1BQU1xSix1QkFBdUIsR0FBRyxVQUMvQnJKLFVBRCtCLEVBRS9CZ0IsZ0JBRitCLEVBR1k7QUFDM0MsUUFBTStQLFFBQXFDLEdBQUcvUCxnQkFBZ0IsQ0FBQ2lFLGtCQUFqQixHQUFzQ2lELHNCQUF0QyxFQUE5QztBQUNBLFFBQU04SSxtQkFBcUUsR0FBRyxDQUFBRCxRQUFRLFNBQVIsSUFBQUEsUUFBUSxXQUFSLFlBQUFBLFFBQVEsQ0FBRTlJLFlBQVYsS0FBMEIsRUFBeEc7O0FBQ0EsUUFBTTlFLGVBQTRDLEdBQUdGLHlCQUF5QixDQUM3RWpELFVBRDZFLEVBRTdFMkksTUFBTSxDQUFDQyxJQUFQLENBQVlvSSxtQkFBWixFQUFpQ3hLLEdBQWpDLENBQXFDLFVBQUFuRyxHQUFHO0FBQUEsYUFBSW9CLFNBQVMsQ0FBQ3dQLDRCQUFWLENBQXVDNVEsR0FBdkMsQ0FBSjtBQUFBLEtBQXhDLENBRjZFLEVBRzdFLElBSDZFLEVBSTdFVyxnQkFKNkUsQ0FBOUU7O0FBTUEsUUFBTWlILFlBQXNELEdBQUcsRUFBL0Q7O0FBRUEsU0FBSyxJQUFNaUosSUFBWCxJQUFtQkYsbUJBQW5CLEVBQXdDO0FBQ3ZDLFVBQU10SSxXQUFXLEdBQUdzSSxtQkFBbUIsQ0FBQ0UsSUFBRCxDQUF2QztBQUNBLFVBQU1mLFlBQVksR0FBRzFPLFNBQVMsQ0FBQ3dQLDRCQUFWLENBQXVDQyxJQUF2QyxDQUFyQjtBQUNBLFVBQU1sTyxjQUFjLEdBQUdHLGVBQWUsQ0FBQ2dOLFlBQUQsQ0FBdEM7QUFDQSxVQUFNMUcsWUFBWSxHQUFHQyxnQkFBZ0IsQ0FBQzFKLFVBQUQsRUFBYWdCLGdCQUFiLEVBQStCa1EsSUFBL0IsRUFBcUNGLG1CQUFyQyxDQUFyQztBQUNBL0ksTUFBQUEsWUFBWSxDQUFDaUosSUFBRCxDQUFaLEdBQXFCO0FBQ3BCN1EsUUFBQUEsR0FBRyxFQUFFNlEsSUFEZTtBQUVwQnZQLFFBQUFBLGNBQWMsRUFBRXFCLGNBQUYsYUFBRUEsY0FBRix1QkFBRUEsY0FBYyxDQUFFckIsY0FGWjtBQUdwQkUsUUFBQUEsYUFBYSxFQUFFLENBQUFtQixjQUFjLFNBQWQsSUFBQUEsY0FBYyxXQUFkLFlBQUFBLGNBQWMsQ0FBRW5CLGFBQWhCLEtBQWlDc08sWUFINUI7QUFJcEI1RyxRQUFBQSxRQUFRLEVBQUViLFdBQVcsQ0FBQ2EsUUFKRjtBQUtwQnJILFFBQUFBLEtBQUssRUFBRXdHLFdBQVcsQ0FBQ3hHLEtBTEM7QUFNcEJvSCxRQUFBQSxRQUFRLEVBQUVaLFdBQVcsQ0FBQ1ksUUFBWixJQUF3QjtBQUFFNkgsVUFBQUEsU0FBUyxFQUFFQyxTQUFTLENBQUNDO0FBQXZCLFNBTmQ7QUFPcEJ2UCxRQUFBQSxZQUFZLEVBQUU0RyxXQUFXLENBQUM1RyxZQUFaLElBQTRCRSxnQkFBZ0IsQ0FBQ3lPLE9BUHZDO0FBUXBCakgsUUFBQUEsUUFBUSxFQUFFZCxXQUFXLENBQUNjLFFBUkY7QUFTcEJDLFFBQUFBLFlBQVksRUFBRUE7QUFUTSxPQUFyQjtBQVdBOztBQUNELFdBQU94QixZQUFQO0FBQ0EsR0FoQ0Q7QUFrQ0E7Ozs7Ozs7Ozs7QUFRQSxXQUFTcUosbUNBQVQsQ0FDQ3RSLFVBREQsRUFFQ2dCLGdCQUZELEVBR0N1USxNQUhELEVBSStGO0FBQzlGLFFBQU01UCxjQUFjLEdBQUdYLGdCQUFnQixDQUFDaUUsa0JBQWpCLEdBQXNDdU0sZ0NBQXRDLEVBQXZCO0FBQ0EsUUFBTUMsNEJBQTRCLEdBQUdDLCtCQUErQixDQUFDMVIsVUFBRCxFQUFhMkIsY0FBYixFQUE2QlgsZ0JBQTdCLENBQXBFOztBQUNBLFFBQUlXLGNBQWMsSUFBSThQLDRCQUF0QixFQUFvRDtBQUNuRCxVQUFNRSxvQkFBbUIsR0FBR0YsNEJBQTRCLENBQUNHLG1CQUF6RDs7QUFDQSxVQUFJLENBQUNELG9CQUFMLEVBQTBCO0FBQ3pCLGNBQU0sSUFBSXZHLEtBQUosQ0FBVSw2RUFBVixDQUFOO0FBQ0E7O0FBQ0QsVUFBTXlHLFlBQVksR0FBR0MsdUJBQXVCLENBQUNMLDRCQUE0QixDQUFDRyxtQkFBOUIsQ0FBNUM7O0FBQ0EsVUFBSSxDQUFDQyxZQUFMLEVBQW1CO0FBQ2xCLGVBQU81USxTQUFQO0FBQ0E7O0FBQ0QsVUFBSThRLGdDQUFnQyxDQUFDTiw0QkFBRCxFQUErQkYsTUFBL0IsQ0FBcEMsRUFBNEU7QUFDM0UsZUFBT0UsNEJBQVA7QUFDQTtBQUNEOztBQUNELFFBQUlBLDRCQUFKLEVBQWtDO0FBQ2pDLFVBQUlNLGdDQUFnQyxDQUFDTiw0QkFBRCxFQUErQkYsTUFBL0IsQ0FBcEMsRUFBNEU7QUFDM0UsZUFBT0UsNEJBQVA7QUFDQTtBQUNEOztBQUNELFFBQU1FLG1CQUFtQixHQUFHSyw2QkFBNkIsQ0FBQ2hTLFVBQUQsQ0FBekQ7O0FBQ0EsUUFBSTJSLG1CQUFKLEVBQXlCO0FBQ3hCLFVBQUlHLHVCQUF1QixDQUFDSCxtQkFBRCxFQUFzQkosTUFBdEIsQ0FBM0IsRUFBMEQ7QUFDekQsZUFBT0ksbUJBQVA7QUFDQTtBQUNEOztBQUNELFFBQUksQ0FBQ0osTUFBTCxFQUFhO0FBQ1osVUFBTVUsZUFBZSxHQUFHQyxrQkFBa0IsQ0FBQ2xTLFVBQUQsQ0FBMUM7O0FBQ0EsVUFBSWlTLGVBQUosRUFBcUI7QUFDcEIsZUFBT0EsZUFBUDtBQUNBO0FBQ0Q7O0FBQ0QsV0FBT2hSLFNBQVA7QUFDQTs7QUFFRCxNQUFNa1IsT0FBTyxHQUFHLFVBQVNDLDBCQUFULEVBQXNGO0FBQ3JHLFFBQUlDLE1BQU0sR0FBR0QsMEJBQWI7O0FBQ0EsUUFBSUMsTUFBTSxDQUFDclIsZ0JBQVgsRUFBNkI7QUFBQTs7QUFDNUIsVUFBSUEsZ0JBQWdCLEdBQUdxUixNQUFNLENBQUNyUixnQkFBOUI7QUFDQXFSLE1BQUFBLE1BQU0sR0FBR0EsTUFBVDtBQUNBLFVBQUkzTixZQUF5QyxHQUFHNE4saUNBQWlDLENBQ2hGRCxNQUFNLENBQUN6TSxVQUFQLEdBQ0c1RSxnQkFBZ0IsQ0FBQ3VSLHlCQUFqQixDQUEyQ0YsTUFBTSxDQUFDek0sVUFBUCxDQUFrQjNCLGtCQUE3RCxFQUFpRmpELGdCQUFnQixDQUFDZ0csYUFBakIsRUFBakYsQ0FESCxHQUVHLEVBSDZFLEVBSWhGLElBSmdGLEVBS2hGaEcsZ0JBTGdGLEVBTWhGcVIsTUFOZ0YsQ0FBakY7QUFRQSxVQUFJRyxjQUFjLEdBQUcsRUFBckI7QUFDQSxVQUFJQyxjQUFjLEdBQUcsRUFBckI7QUFDQSxVQUFJQyxLQUF5QixHQUFHLEVBQWhDO0FBQ0EsVUFBSUMsb0JBQW9CLEdBQUcsRUFBM0I7O0FBQ0EsVUFBTUMsMkJBQTJCLEdBQUcsVUFBU1AsTUFBVCxFQUF5RTtBQUM1RyxlQUFRQSxNQUFELENBQXNDaFMsR0FBdEMsS0FBOENZLFNBQXJEO0FBQ0EsT0FGRDs7QUFHQSxVQUFNNFIsbUJBQW1CLEdBQUcsVUFBU25PLFlBQVQsRUFBb0RvTyxTQUFwRCxFQUF5RTtBQUNwRyxZQUFJQyxvQkFBSjs7QUFEb0csbURBRXhFck8sWUFBWSxDQUFDRixjQUYyRDtBQUFBOztBQUFBO0FBRXBHLDhEQUF5RDtBQUFBLGdCQUE5Q0csYUFBOEM7O0FBQ3hELGdCQUFJbU8sU0FBUyxJQUFJbk8sYUFBYSxDQUFDSixJQUFkLEtBQXVCSyxpQkFBaUIsQ0FBQ29PLEtBQTFELEVBQWlFO0FBQ2hFRCxjQUFBQSxvQkFBb0IsR0FBR3BPLGFBQXZCO0FBQ0E7QUFDQTs7QUFDRCxnQkFBSSxDQUFDbU8sU0FBRCxJQUFjbk8sYUFBYSxDQUFDSixJQUFkLEtBQXVCSyxpQkFBaUIsQ0FBQ0MsS0FBM0QsRUFBa0U7QUFDakVrTyxjQUFBQSxvQkFBb0IsR0FBR3BPLGFBQXZCO0FBQ0E7QUFDQTtBQUNEO0FBWG1HO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBWXBHLFlBQU1zTyxtQkFBbUIsR0FBR3RLLE1BQU0sQ0FBQ0csTUFBUCxDQUFjLEVBQWQsRUFBa0JwRSxZQUFsQixDQUE1Qjs7QUFDQSxZQUFJcU8sb0JBQUosRUFBMEI7QUFDekJFLFVBQUFBLG1CQUFtQixDQUFDek8sY0FBcEIsR0FBcUMsQ0FBQ3VPLG9CQUFELENBQXJDO0FBQ0E7O0FBQ0QsZUFBT0UsbUJBQVA7QUFDQSxPQWpCRDs7QUFrQkEsVUFBTUMsZUFBZSxHQUFHLFVBQVNDLElBQVQsRUFBNEM7QUFDbkUsWUFBTUMsY0FBYyxHQUFHcFMsZ0JBQWdCLENBQUMwSyx1QkFBakIsQ0FBeUN5SCxJQUFJLENBQUN4UixjQUE5QyxDQUF2QjtBQUNBLFlBQU0wUixnQkFBZ0IsR0FBR0QsY0FBYyxDQUFDeE4sVUFBeEM7QUFDQTVFLFFBQUFBLGdCQUFnQixHQUFHb1MsY0FBYyxDQUFDcFMsZ0JBQWxDO0FBQ0EsWUFBTTRFLFVBQVUsR0FBR3lOLGdCQUFuQjtBQUNBM08sUUFBQUEsWUFBWSxHQUFHNE4saUNBQWlDLENBQy9DMU0sVUFBVSxHQUNQNUUsZ0JBQWdCLENBQUN1Uix5QkFBakIsQ0FBMkMzTSxVQUFVLENBQUMzQixrQkFBdEQsRUFBMEVqRCxnQkFBZ0IsQ0FBQ2dHLGFBQWpCLEVBQTFFLENBRE8sR0FFUCxFQUg0QyxFQUkvQyxJQUorQyxFQUsvQ2hHLGdCQUwrQyxFQU0vQ3FSLE1BTitDLENBQWhEO0FBUUEsZUFBTzNOLFlBQVA7QUFDQSxPQWREOztBQWVBLFVBQU00TyxhQUFhLEdBQUcsVUFDckJDLGFBRHFCLEVBRXJCQyxXQUZxQixFQUdwQjtBQUNELFlBQU1DLG9CQUE2RCxHQUFHWixtQkFBbUIsQ0FBQ1UsYUFBYSxDQUFDLENBQUQsQ0FBZCxFQUFtQixJQUFuQixDQUF6RjtBQUNBZCxRQUFBQSxjQUFjLEdBQUcsQ0FBQ2dCLG9CQUFELGFBQUNBLG9CQUFELHVCQUFDQSxvQkFBb0IsQ0FBRWpQLGNBQXRCLENBQXFDLENBQXJDLENBQUQsRUFBZ0VrUCxFQUFqRjtBQUNBLFlBQU1qUCxzQkFBK0QsR0FBR29PLG1CQUFtQixDQUMxRlUsYUFBYSxDQUFDLENBQUQsQ0FBYixHQUFtQkEsYUFBYSxDQUFDLENBQUQsQ0FBaEMsR0FBc0NBLGFBQWEsQ0FBQyxDQUFELENBRHVDLENBQTNGO0FBR0FmLFFBQUFBLGNBQWMsR0FBRyxDQUFDL04sc0JBQUQsYUFBQ0Esc0JBQUQsdUJBQUNBLHNCQUFzQixDQUFFRCxjQUF4QixDQUF1QyxDQUF2QyxDQUFELEVBQWtFb0IsVUFBbEUsQ0FBNkU4TixFQUE5Rjs7QUFDQSxZQUFJRCxvQkFBb0IsSUFBSWhQLHNCQUE1QixFQUFvRDtBQUNuRCxjQUFNSCxJQUE0QixHQUFHO0FBQ3BDbVAsWUFBQUEsb0JBQW9CLEVBQXBCQSxvQkFEb0M7QUFFcENoUCxZQUFBQSxzQkFBc0IsRUFBdEJBLHNCQUZvQztBQUdwQytOLFlBQUFBLGNBQWMsRUFBZEEsY0FIb0M7QUFJcENDLFlBQUFBLGNBQWMsRUFBZEEsY0FKb0M7QUFLcENlLFlBQUFBLFdBQVcsRUFBWEE7QUFMb0MsV0FBckM7QUFPQSxpQkFBT2xQLElBQVA7QUFDQTtBQUNELE9BcEJEOztBQXFCQSxVQUFJLGtCQUFBSSxZQUFZLFVBQVosK0VBQWNGLGNBQWQsZ0ZBQThCbEUsTUFBOUIsTUFBeUMsQ0FBekMsSUFBOENVLGdCQUFnQixDQUFDbUUsZUFBakIsT0FBdUNDLFlBQVksQ0FBQ0Msa0JBQXRHLEVBQTBIO0FBQ3pILFlBQU1mLElBQXdDLEdBQUdnUCxhQUFhLENBQUMsQ0FBQzVPLFlBQUQsQ0FBRCxFQUFpQixNQUFqQixDQUE5RDs7QUFDQSxZQUFJSixJQUFKLEVBQVU7QUFDVCxpQkFBT0EsSUFBUDtBQUNBO0FBQ0QsT0FMRCxNQUtPLElBQ050RCxnQkFBZ0IsQ0FBQ2lFLGtCQUFqQixHQUFzQ0MseUJBQXRDLENBQWdFbU4sTUFBaEUsS0FDQXJSLGdCQUFnQixDQUFDbUUsZUFBakIsT0FBdUNDLFlBQVksQ0FBQ0Msa0JBRjlDLEVBR0w7QUFBQSxtQkFDOEJnTixNQUQ5QjtBQUFBLFlBQ09zQixPQURQLFFBQ09BLE9BRFA7QUFBQSxZQUNnQkMsU0FEaEIsUUFDZ0JBLFNBRGhCOztBQUVELFlBQUlELE9BQU8sSUFBSUEsT0FBTyxDQUFDclQsTUFBbkIsSUFBNkJzVCxTQUE3QixJQUEwQ0EsU0FBUyxDQUFDdFQsTUFBeEQsRUFBZ0U7QUFDL0QsY0FBTWdFLEtBQXdDLEdBQUdnUCxhQUFhLENBQzdELENBQUNKLGVBQWUsQ0FBQ1MsT0FBTyxDQUFDLENBQUQsQ0FBUixDQUFoQixFQUE4QlQsZUFBZSxDQUFDVSxTQUFTLENBQUMsQ0FBRCxDQUFWLENBQTdDLENBRDZELEVBRTVEdkIsTUFBRCxDQUEwQ21CLFdBRm1CLENBQTlEOztBQUlBLGNBQUlsUCxLQUFKLEVBQVU7QUFDVCxtQkFBT0EsS0FBUDtBQUNBO0FBQ0QsU0FSRCxNQVFPO0FBQ04sZ0JBQU0sSUFBSThHLEtBQUosQ0FBVSw0Q0FBVixDQUFOO0FBQ0E7QUFDRCxPQWhCTSxNQWdCQSxJQUFJd0gsMkJBQTJCLENBQUNQLE1BQUQsQ0FBL0IsRUFBeUM7QUFDL0M7QUFDQSxZQUFNZSxjQUFjLEdBQUdwUyxnQkFBZ0IsQ0FBQzBLLHVCQUFqQixDQUEwQzJHLE1BQUQsQ0FBd0MxUSxjQUFqRixDQUF2QjtBQUNBLFlBQU1rUyxjQUF3QyxHQUFHVCxjQUFjLENBQUN4TixVQUFoRTtBQUNBNUUsUUFBQUEsZ0JBQWdCLEdBQUdvUyxjQUFjLENBQUNwUyxnQkFBbEM7QUFDQTBSLFFBQUFBLEtBQUssR0FBR3ZRLGNBQWMsQ0FBQ0Msb0JBQW9CLENBQUN5UixjQUFjLENBQUNDLElBQWhCLENBQXJCLENBQXRCLENBTCtDLENBTS9DOztBQUNBcFAsUUFBQUEsWUFBWSxDQUFDRixjQUFiLENBQTRCMUIsT0FBNUIsQ0FBb0MsVUFBQ2lSLHVCQUFELEVBQTBCQyxLQUExQixFQUFvQztBQUN2RSxrQkFBUUQsdUJBQXVCLENBQUN4UCxJQUFoQztBQUNDLGlCQUFLSyxpQkFBaUIsQ0FBQ0MsS0FBdkI7QUFDQyxrQkFBTW9QLGtCQUFrQixHQUFHdlAsWUFBWSxDQUFDRixjQUFiLENBQTRCd1AsS0FBNUIsQ0FBM0I7QUFDQSxrQkFBTUUsT0FBTyxHQUFHRCxrQkFBa0IsQ0FBQ0UsT0FBbkIsQ0FBMkJELE9BQTNCLElBQXNDLEVBQXREO0FBQ0FBLGNBQUFBLE9BQU8sQ0FBQ0UsYUFBUixHQUF3QkYsT0FBTyxDQUFDRSxhQUFSLElBQXlCO0FBQUVDLGdCQUFBQSxLQUFLLEVBQUU7QUFBVCxlQUFqRDs7QUFDQSxrQkFBSSxDQUFFaEMsTUFBRCxDQUF3Q2lDLDJCQUE3QyxFQUEwRTtBQUN6RTtBQUNBTCxnQkFBQUEsa0JBQWtCLENBQUNyTyxVQUFuQixDQUE4QjhOLEVBQTlCLEdBQW1DYSxPQUFPLENBQUVsQyxNQUFELENBQXdDaFMsR0FBeEMsSUFBK0MsRUFBaEQsRUFBb0QsVUFBcEQsQ0FBMUM7QUFDQTs7QUFDRGdTLGNBQUFBLE1BQU0sR0FBR0EsTUFBVDs7QUFDQSxrQkFBSUEsTUFBTSxJQUFJQSxNQUFNLENBQUN6TSxVQUFqQixJQUErQnlNLE1BQU0sQ0FBQ3pNLFVBQVAsQ0FBa0JxRyxJQUFsQiw4REFBbkMsRUFBOEc7QUFDN0cwRyxnQkFBQUEsb0JBQW9CLEdBQUlOLE1BQU0sQ0FBQ3pNLFVBQVIsQ0FBNkQ0TyxnQkFBN0QsQ0FBOEV2USxrQkFBOUUsQ0FBaUc5RCxLQUFqRyxDQUN0QixHQURzQixFQUVyQixDQUZxQixDQUF2QjtBQUdBLGVBSkQsTUFJTztBQUNOd1MsZ0JBQUFBLG9CQUFvQixHQUFJTixNQUFELENBQXdDMVEsY0FBL0Q7QUFDQSxlQWZGLENBZ0JDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUNBdVMsY0FBQUEsT0FBTyxDQUFDRSxhQUFSLENBQXNCQyxLQUF0QixDQUE0QnZQLElBQTVCLENBQWlDO0FBQUVuRCxnQkFBQUEsY0FBYyxFQUFFZ1I7QUFBbEIsZUFBakM7QUFDQXNCLGNBQUFBLGtCQUFrQixDQUFDRSxPQUFuQixDQUEyQkQsT0FBM0IsR0FBcUNBLE9BQXJDO0FBQ0E7O0FBQ0QsaUJBQUt0UCxpQkFBaUIsQ0FBQ29PLEtBQXZCO0FBQ0M7QUFDQTs7QUFDRDtBQUNDO0FBN0JGO0FBK0JBLFNBaENEO0FBaUNBOztBQUNEdE8sTUFBQUEsWUFBWSxDQUFDRixjQUFiLENBQTRCMUIsT0FBNUIsQ0FBb0MsVUFBQWlSLHVCQUF1QixFQUFJO0FBQzlELFlBQUlBLHVCQUF1QixDQUFDeFAsSUFBeEIsS0FBaUNLLGlCQUFpQixDQUFDQyxLQUF2RCxFQUE4RDtBQUM3RDJOLFVBQUFBLGNBQWMsR0FBR3VCLHVCQUF1QixDQUFDbk8sVUFBeEIsQ0FBbUM4TixFQUFwRDtBQUNBLFNBRkQsTUFFTyxJQUFJSyx1QkFBdUIsQ0FBQ3hQLElBQXhCLEtBQWlDSyxpQkFBaUIsQ0FBQ29PLEtBQXZELEVBQThEO0FBQ3BFUCxVQUFBQSxjQUFjLEdBQUdzQix1QkFBdUIsQ0FBQ0wsRUFBekM7QUFDQTtBQUNELE9BTkQ7QUFPQSxhQUFPO0FBQ05oUCxRQUFBQSxZQUFZLEVBQVpBLFlBRE07QUFFTjhOLFFBQUFBLGNBQWMsRUFBZEEsY0FGTTtBQUdOQyxRQUFBQSxjQUFjLEVBQWRBLGNBSE07QUFJTkMsUUFBQUEsS0FBSyxFQUFMQSxLQUpNO0FBS05DLFFBQUFBLG9CQUFvQixFQUFwQkE7QUFMTSxPQUFQO0FBT0EsS0FwSkQsTUFvSk87QUFDTk4sTUFBQUEsTUFBTSxHQUFHQSxNQUFUO0FBQ0EsVUFBTUssTUFBSyxHQUFHTCxNQUFNLENBQUNuUSxLQUFyQjtBQUFBLFVBQ0N1UyxRQUFRLEdBQUdwQyxNQUFNLENBQUM5SSxRQURuQjtBQUFBLFVBRUNoRixJQUFJLEdBQUc4TixNQUFNLENBQUM5TixJQUZmO0FBQUEsVUFHQ21RLFdBQVcsR0FBR0MsV0FBVyxDQUFDdEMsTUFBTSxDQUFDaFMsR0FBUCxJQUFjLEVBQWYsQ0FIMUI7QUFJQSxhQUFPO0FBQ05xUyxRQUFBQSxLQUFLLEVBQUxBLE1BRE07QUFFTitCLFFBQUFBLFFBQVEsRUFBUkEsUUFGTTtBQUdObFEsUUFBQUEsSUFBSSxFQUFKQSxJQUhNO0FBSU5tUSxRQUFBQSxXQUFXLEVBQVhBO0FBSk0sT0FBUDtBQU1BO0FBQ0QsR0FuS0Q7O0FBcUtBLE1BQU1FLFFBQVEsR0FBRyxVQUNoQjVULGdCQURnQixFQUVoQjZULGFBRmdCLEVBR2E7QUFDN0IsUUFBSUMsb0JBQTZDLEdBQUcsRUFBcEQ7O0FBQ0EsUUFBSUQsYUFBSixFQUFtQjtBQUNsQkEsTUFBQUEsYUFBYSxDQUFDUixLQUFkLENBQW9CdlIsT0FBcEIsQ0FBNEIsVUFBQ2tCLElBQUQsRUFBbUU7QUFDOUYsWUFBSWhELGdCQUFnQixDQUFDaUUsa0JBQWpCLEdBQXNDQyx5QkFBdEMsQ0FBZ0VsQixJQUFoRSxDQUFKLEVBQW9HO0FBQ25HLGNBQUk2USxhQUFhLENBQUNSLEtBQWQsQ0FBb0IvVCxNQUFwQixHQUE2QixDQUFqQyxFQUFvQztBQUNuQyxrQkFBTSxJQUFJOEssS0FBSixDQUFVLHVDQUFWLENBQU47QUFDQSxXQUZELE1BRU87QUFDTnBILFlBQUFBLElBQUksR0FBR0EsSUFBUDtBQUNBOFEsWUFBQUEsb0JBQW9CLENBQUNoUSxJQUFyQixDQUEwQjtBQUN6QjlELGNBQUFBLGdCQUFnQixFQUFFQSxnQkFETztBQUV6QjJTLGNBQUFBLE9BQU8sRUFBRTNQLElBQUksQ0FBQzJQLE9BRlc7QUFHekJDLGNBQUFBLFNBQVMsRUFBRTVQLElBQUksQ0FBQzRQLFNBSFM7QUFJekJKLGNBQUFBLFdBQVcsRUFBRXhQLElBQUksQ0FBQ3dQO0FBSk8sYUFBMUI7QUFNQTtBQUNELFNBWkQsTUFZTyxJQUFLeFAsSUFBRCxDQUFrQ3VGLFFBQXRDLEVBQWdEO0FBQ3REdkYsVUFBQUEsSUFBSSxHQUFHQSxJQUFQO0FBQ0E4USxVQUFBQSxvQkFBb0IsQ0FBQ2hRLElBQXJCLENBQTBCO0FBQ3pCekUsWUFBQUEsR0FBRyxFQUFFMkQsSUFBSSxDQUFDM0QsR0FEZTtBQUV6QjZCLFlBQUFBLEtBQUssRUFBRThCLElBQUksQ0FBQzlCLEtBRmE7QUFHekJxSCxZQUFBQSxRQUFRLEVBQUV2RixJQUFJLENBQUN1RixRQUhVO0FBSXpCaEYsWUFBQUEsSUFBSSxFQUFFO0FBSm1CLFdBQTFCO0FBTUEsU0FSTSxNQVFBO0FBQ05QLFVBQUFBLElBQUksR0FBR0EsSUFBUDtBQUNBLGNBQU0rUSxlQUFlLEdBQUcvVCxnQkFBZ0IsQ0FBQ2lFLGtCQUFqQixFQUF4QjtBQUFBLGNBQ0MrUCxvQkFBb0IsR0FBR2hVLGdCQUFnQixDQUFDc0Ysc0JBQWpCLENBQ3RCdEMsSUFBSSxDQUFDeUIsV0FBTCxJQUFxQnpCLElBQUksQ0FBQ2lSLFNBQUwsSUFBa0IsTUFBTWpSLElBQUksQ0FBQ2lSLFNBQWxELElBQWdFalUsZ0JBQWdCLENBQUN1RSxjQUFqQixFQUQxQyxDQUR4QjtBQUFBLGNBSUN2RixVQUFVLEdBQUdnVixvQkFBb0IsQ0FBQ2hPLGFBQXJCLEVBSmQ7O0FBTUEsY0FBSWhILFVBQVUsSUFBSWdWLG9CQUFsQixFQUF3QztBQUN2QyxnQkFBTXJULGNBQWMsR0FBR29ULGVBQWUsQ0FBQ3ZELGdDQUFoQixFQUF2QjtBQUNBLGdCQUFJNUwsVUFBSjtBQUNBLGdCQUFNd04sY0FBYyxHQUFHNEIsb0JBQW9CLENBQUN0Six1QkFBckIsQ0FBNkMxSCxJQUFJLENBQUNyQyxjQUFsRCxDQUF2QjtBQUNBLGdCQUFNMFIsZ0JBQWdCLEdBQUdELGNBQWMsQ0FBQ3hOLFVBQXhDO0FBQ0E1RSxZQUFBQSxnQkFBZ0IsR0FBR29TLGNBQWMsQ0FBQ3BTLGdCQUFsQzs7QUFDQSxnQkFBSXFTLGdCQUFKLEVBQXNCO0FBQ3JCLGtCQUFJQSxnQkFBZ0IsQ0FBQ3BILElBQWpCLGtEQUFKLEVBQWtFO0FBQ2pFLG9CQUFJdEssY0FBSixFQUFvQjtBQUNuQmlFLGtCQUFBQSxVQUFVLEdBQUc4TCwrQkFBK0IsQ0FDM0NzRCxvQkFBb0IsQ0FBQ2hPLGFBQXJCLEVBRDJDLEVBRTNDckYsY0FGMkMsRUFHM0NYLGdCQUgyQyxDQUE1QztBQUtBLGlCQU5ELE1BTU87QUFDTjRFLGtCQUFBQSxVQUFVLEdBQUdzTSxrQkFBa0IsQ0FBQzhDLG9CQUFvQixDQUFDaE8sYUFBckIsRUFBRCxDQUEvQjtBQUNBO0FBQ0QsZUFWRCxNQVVPO0FBQ05wQixnQkFBQUEsVUFBVSxHQUFHeU4sZ0JBQWI7QUFDQTs7QUFDRHlCLGNBQUFBLG9CQUFvQixDQUFDaFEsSUFBckIsQ0FBMEI7QUFDekI5RCxnQkFBQUEsZ0JBQWdCLEVBQUVnVSxvQkFETztBQUV6QnBQLGdCQUFBQSxVQUFVLEVBQVZBLFVBRnlCO0FBR3pCakUsZ0JBQUFBLGNBQWMsRUFBRXFDLElBQUksQ0FBQ3JDLGNBSEk7QUFJekIyUyxnQkFBQUEsMkJBQTJCLEVBQUV0USxJQUFJLENBQUNzUSwyQkFKVDtBQUt6QmpVLGdCQUFBQSxHQUFHLEVBQUUyRCxJQUFJLENBQUMzRDtBQUxlLGVBQTFCO0FBT0E7QUFDRCxXQTVCRCxNQTRCTyxDQUNOO0FBQ0E7QUFDRDtBQUNELE9BN0REO0FBOERBLEtBL0RELE1BK0RPO0FBQ04sVUFBTUwsVUFBVSxHQUFHZ0IsZ0JBQWdCLENBQUNnRyxhQUFqQixFQUFuQjs7QUFDQSxVQUFJaEcsZ0JBQWdCLENBQUNtRSxlQUFqQixPQUF1Q0MsWUFBWSxDQUFDQyxrQkFBeEQsRUFBNEU7QUFDM0V5UCxRQUFBQSxvQkFBb0IsR0FBR0ksZ0JBQWdCLENBQUNsVSxnQkFBRCxFQUFtQjhULG9CQUFuQixDQUF2QztBQUNBLE9BRkQsTUFFTztBQUNOQSxRQUFBQSxvQkFBb0IsQ0FBQ2hRLElBQXJCLENBQTBCO0FBQ3pCYyxVQUFBQSxVQUFVLEVBQUUwTCxtQ0FBbUMsQ0FBQ3RSLFVBQUQsRUFBYWdCLGdCQUFiLEVBQStCLEtBQS9CLENBRHRCO0FBRXpCQSxVQUFBQSxnQkFBZ0IsRUFBRUE7QUFGTyxTQUExQjtBQUlBO0FBQ0Q7O0FBQ0QsV0FBTzhULG9CQUFvQixDQUFDdE8sR0FBckIsQ0FBeUIsVUFBQTJPLG1CQUFtQixFQUFJO0FBQ3RELGFBQU9oRCxPQUFPLENBQUNnRCxtQkFBRCxDQUFkO0FBQ0EsS0FGTSxDQUFQO0FBR0EsR0FsRkQ7O0FBb0ZBLFdBQVNELGdCQUFULENBQTBCbFUsZ0JBQTFCLEVBQThEb1UsV0FBOUQsRUFBNkg7QUFDNUgsUUFBTXBWLFVBQVUsR0FBR2dCLGdCQUFnQixDQUFDZ0csYUFBakIsRUFBbkI7QUFDQSxRQUFNcEIsVUFBVSxHQUFHMEwsbUNBQW1DLENBQUN0UixVQUFELEVBQWFnQixnQkFBYixFQUErQixJQUEvQixDQUF0RDtBQUNBLFFBQUlxVSxLQUFKLEVBQVdDLEtBQVg7O0FBQ0EsUUFBSTFQLFVBQUosRUFBZ0I7QUFDZndQLE1BQUFBLFdBQVcsQ0FBQ3RRLElBQVosQ0FBaUI7QUFDaEJjLFFBQUFBLFVBQVUsRUFBRUEsVUFESTtBQUVoQjVFLFFBQUFBLGdCQUFnQixFQUFoQkE7QUFGZ0IsT0FBakI7QUFJQSxLQUxELE1BS087QUFDTnFVLE1BQUFBLEtBQUssR0FBR0UsZUFBZSxDQUFDdlYsVUFBRCxDQUF2QjtBQUNBc1YsTUFBQUEsS0FBSyxHQUFHcEQsa0JBQWtCLENBQUNsUyxVQUFELENBQTFCOztBQUNBLFVBQUlxVixLQUFLLElBQUlDLEtBQWIsRUFBb0I7QUFDbkIsWUFBTTNCLE9BQXNDLEdBQUcsQ0FBQztBQUFFaFMsVUFBQUEsY0FBYyxFQUFFMFQsS0FBSyxDQUFDcEo7QUFBeEIsU0FBRCxDQUEvQztBQUNBLFlBQU0ySCxTQUF3QyxHQUFHLENBQUM7QUFBRWpTLFVBQUFBLGNBQWMsRUFBRTJULEtBQUssQ0FBQ3JKO0FBQXhCLFNBQUQsQ0FBakQ7QUFDQW1KLFFBQUFBLFdBQVcsQ0FBQ3RRLElBQVosQ0FBaUI7QUFDaEI5RCxVQUFBQSxnQkFBZ0IsRUFBRUEsZ0JBREY7QUFFaEIyUyxVQUFBQSxPQUFPLEVBQUVBLE9BRk87QUFHaEJDLFVBQUFBLFNBQVMsRUFBRUEsU0FISztBQUloQkosVUFBQUEsV0FBVyxFQUFFO0FBSkcsU0FBakI7QUFNQTtBQUNEOztBQUNELFdBQU80QixXQUFQO0FBQ0E7O0FBRU0sTUFBTUksZ0JBQWdCLEdBQUcsVUFBU3hVLGdCQUFULEVBQTJEO0FBQzFGLFFBQU0rVCxlQUFlLEdBQUcvVCxnQkFBZ0IsQ0FBQ2lFLGtCQUFqQixFQUF4QjtBQUNBLFdBQU9tRSxvQkFBb0IsQ0FBQyxFQUFELEVBQUtxTSxzQkFBc0IsQ0FBQ1YsZUFBZSxDQUFDUyxnQkFBaEIsRUFBRCxFQUFxQ3hVLGdCQUFyQyxDQUEzQixDQUEzQjtBQUNBLEdBSE07QUFLUDs7Ozs7Ozs7OztBQU1PLE1BQU0wVSxXQUFXLEdBQUcsVUFBUzFVLGdCQUFULEVBQW1FO0FBQzdGLFFBQU1oQixVQUFVLEdBQUdnQixnQkFBZ0IsQ0FBQ2dHLGFBQWpCLEVBQW5CO0FBQ0EsUUFBTTFCLFlBQVksR0FBR3RFLGdCQUFnQixDQUFDdUUsY0FBakIsRUFBckI7O0FBRUEsUUFBSSxDQUFDRCxZQUFMLEVBQW1CO0FBQ2xCO0FBQ0EsWUFBTSxJQUFJOEYsS0FBSixDQUNMLHVIQURLLENBQU47QUFHQTs7QUFDRCxRQUFNMkosZUFBZSxHQUFHL1QsZ0JBQWdCLENBQUNpRSxrQkFBakIsRUFBeEI7QUFDQSxRQUFNMFEsZUFBdUQsR0FBR1osZUFBZSxDQUFDYSxvQkFBaEIsRUFBaEU7QUFDQSxRQUFNQyxxQkFBcUIsR0FBR2QsZUFBZSxDQUFDYyxxQkFBaEIsRUFBOUI7QUFDQSxRQUFNelIsS0FBaUMsR0FBR3dRLFFBQVEsQ0FBQzVULGdCQUFELEVBQW1CMlUsZUFBbkIsQ0FBbEQ7QUFDQSxRQUFNRyxhQUFhLEdBQUdILGVBQWUsR0FBRyxDQUFBQSxlQUFlLFNBQWYsSUFBQUEsZUFBZSxXQUFmLFlBQUFBLGVBQWUsQ0FBRUksVUFBakIsS0FBK0JGLHFCQUFsQyxHQUEwRDVVLFNBQS9GLENBZDZGLENBY2E7O0FBQzFHLFFBQU0rVSxxQkFBcUIsR0FBRzdSLHNCQUFzQixDQUFDQyxLQUFELENBQXBEO0FBQ0EsUUFBTTZSLGtCQUFrQixHQUFHRCxxQkFBcUIsQ0FBQ25JLElBQXRCLENBQTJCLFVBQUF5SCxLQUFLO0FBQUEsYUFBSUEsS0FBSyxDQUFDbkIsT0FBTixDQUFjNVAsSUFBZCxLQUF1QixpQkFBM0I7QUFBQSxLQUFoQyxDQUEzQjtBQUNBLFFBQUkyUixhQUFhLEdBQUcsRUFBcEI7QUFDQSxRQUFJQyxhQUFhLEdBQUcsRUFBcEI7QUFDQSxRQUFNQyxXQUFXLEdBQUdDLFdBQVcsQ0FBQy9RLFlBQUQsQ0FBL0I7QUFDQSxRQUFNZ1IseUJBQXlCLEdBQUdDLHlCQUF5QixDQUFDSCxXQUFELENBQTNEO0FBQ0EsUUFBTUksZ0JBQWdCLEdBQUcsQ0FBQ0osV0FBRCxFQUFjN04sTUFBZCxDQUN4QnlOLHFCQUFxQixDQUFDeFAsR0FBdEIsQ0FBMEIsVUFBQTdCLGFBQWEsRUFBSTtBQUMxQyxhQUFPQSxhQUFhLENBQUNpQixVQUFkLENBQXlCOE4sRUFBaEM7QUFDQSxLQUZELENBRHdCLENBQXpCO0FBS0EsUUFBTTNDLFFBQVEsR0FBR2dFLGVBQWUsQ0FBQzdNLHNCQUFoQixFQUFqQjtBQUNBLFFBQU11TyxtQkFBbUIsR0FBRyxDQUFBMUYsUUFBUSxTQUFSLElBQUFBLFFBQVEsV0FBUixZQUFBQSxRQUFRLENBQUUyRixhQUFWLE1BQTRCelYsU0FBNUIsR0FBd0M4UCxRQUF4QyxhQUF3Q0EsUUFBeEMsdUJBQXdDQSxRQUFRLENBQUUyRixhQUFWLENBQXdCQyxXQUF4QixFQUF4QyxHQUFnRixTQUE1RztBQUNBLFFBQU1DLFlBQVksR0FBRyxDQUFBN0YsUUFBUSxTQUFSLElBQUFBLFFBQVEsV0FBUixZQUFBQSxRQUFRLENBQUU4RixNQUFWLE1BQXFCNVYsU0FBckIsR0FBaUM4UCxRQUFqQyxhQUFpQ0EsUUFBakMsdUJBQWlDQSxRQUFRLENBQUU4RixNQUFWLENBQWlCRixXQUFqQixFQUFqQyxHQUFrRSxTQUF2RjtBQUNBLFFBQU1HLG9CQUFvQixHQUFHL0YsUUFBUSxDQUFDK0Ysb0JBQVQsS0FBa0M3VixTQUFsQyxHQUE4QzhQLFFBQVEsQ0FBQytGLG9CQUF2RCxHQUE4RSxJQUEzRztBQUVBLFFBQU1DLE9BQU8sR0FBR0MsZ0JBQWdCLENBQUNoVyxnQkFBRCxFQUFtQm9ELEtBQW5CLENBQWhDOztBQUNBLFFBQUkyUyxPQUFKLEVBQWE7QUFDWlosTUFBQUEsYUFBYSxHQUFHWSxPQUFPLENBQUNFLE9BQXhCO0FBQ0FmLE1BQUFBLGFBQWEsR0FBR2EsT0FBTyxDQUFDRyxPQUF4QjtBQUNBOztBQUNELFFBQU0vVCxlQUFlLEdBQUd1RCxrQkFBa0IsQ0FBQzFGLGdCQUFELEVBQW1CZ1YscUJBQW5CLENBQTFDO0FBRUEsUUFBTW1CLGVBQWUsR0FBR3BTLDJCQUEyQixDQUFDaVIscUJBQUQsRUFBd0JoVixnQkFBeEIsQ0FBbkQ7QUFDQSxRQUFNOEcsZ0JBQWdCLEdBQUdDLG1CQUFtQixDQUFDL0gsVUFBRCxFQUFhZ0IsZ0JBQWIsQ0FBNUM7QUFDQSxRQUFNNFAsb0JBQXlCLEdBQUdrRyxvQkFBb0IsR0FDbkRuRyx1QkFBdUIsQ0FBQ3RILHVCQUF1QixDQUFDckosVUFBRCxFQUFhZ0IsZ0JBQWIsQ0FBeEIsQ0FENEIsR0FFbkQsRUFGSCxDQXhDNkYsQ0EyQzdGOztBQUNBLFFBQU1vVyxhQUFhLEdBQUc1QixnQkFBZ0IsQ0FBQ3hVLGdCQUFELENBQXRDO0FBQ0EsUUFBTXFXLHNCQUErQixHQUNwQ3RDLGVBQWUsQ0FBQzdQLHlCQUFoQixNQUErQ2xFLGdCQUFnQixDQUFDbUUsZUFBakIsT0FBdUNDLFlBQVksQ0FBQ0Msa0JBRHBHO0FBR0EsV0FBTztBQUNOaVMsTUFBQUEsYUFBYSxFQUFFaFMsWUFEVDtBQUVOaVMsTUFBQUEsY0FBYyxFQUFFalMsWUFBWSxHQUFHLEdBRnpCO0FBR040USxNQUFBQSxhQUFhLEVBQWJBLGFBSE07QUFJTkMsTUFBQUEsYUFBYSxFQUFiQSxhQUpNO0FBS05MLE1BQUFBLGFBQWEsRUFBYkEsYUFMTTtBQU1Oc0IsTUFBQUEsYUFBYSxFQUFiQSxhQU5NO0FBT05uQixNQUFBQSxrQkFBa0IsRUFBRUEsa0JBUGQ7QUFRTnVCLE1BQUFBLFNBQVMsRUFBRTtBQUNWclUsUUFBQUEsZUFBZSxFQUFmQSxlQURVO0FBRVZnVSxRQUFBQSxlQUFlLEVBQWZBO0FBRlUsT0FSTDtBQVlOL1MsTUFBQUEsS0FBSyxFQUFFQSxLQVpEO0FBYU5nUyxNQUFBQSxXQUFXLEVBQVhBLFdBYk07QUFjTnFCLE1BQUFBLGdCQUFnQixFQUFFO0FBQ2pCM1AsUUFBQUEsZ0JBQWdCLEVBQUVBLGdCQUREO0FBRWpCOEksUUFBQUEsb0JBQW9CLEVBQUVBO0FBRkwsT0FkWjtBQWtCTjhHLE1BQUFBLGlCQUFpQixFQUFFO0FBQ2xCaEUsUUFBQUEsRUFBRSxFQUFFNEMseUJBRGM7QUFFbEJFLFFBQUFBLGdCQUFnQixFQUFFQSxnQkFBZ0IsQ0FBQ2hULElBQWpCLENBQXNCLEdBQXRCO0FBRkEsT0FsQmI7QUFzQk5tVSxNQUFBQSxpQkFBaUIsRUFBRTlCLHFCQXRCYjtBQXVCTndCLE1BQUFBLHNCQUFzQixFQUFFQSxzQkF2QmxCO0FBd0JOUCxNQUFBQSxvQkFBb0IsRUFBcEJBLG9CQXhCTTtBQXlCTkwsTUFBQUEsbUJBQW1CLEVBQW5CQSxtQkF6Qk07QUEwQk5HLE1BQUFBLFlBQVksRUFBWkEsWUExQk07QUEyQk5nQixNQUFBQSxjQUFjLEVBQUVDLGlCQUFpQixDQUFDN1csZ0JBQUQ7QUEzQjNCLEtBQVA7QUE2QkEsR0E3RU07Ozs7QUErRVAsV0FBUzZGLG9CQUFULENBQ0NtUCxxQkFERCxFQUVDaFYsZ0JBRkQsRUFHbUM7QUFDbEMsUUFBTThXLHFCQUErQixHQUFHLEVBQXhDO0FBQ0EsV0FBTzlCLHFCQUFxQixDQUMxQnhQLEdBREssQ0FDRCxVQUFBN0IsYUFBYSxFQUFJO0FBQ3JCLFVBQU1vVCxZQUFZLEdBQUdwVCxhQUFhLENBQUN3UCxPQUFkLENBQXNCRCxPQUEzQztBQUNBLFVBQU04RCxjQUErQyxHQUFHLEVBQXhEOztBQUNBLFdBQUssSUFBTTNYLEdBQVgsSUFBa0IwWCxZQUFsQixFQUFnQztBQUMvQixZQUFJRSxLQUFLLENBQUNDLE9BQU4sQ0FBY0gsWUFBWSxDQUFDMVgsR0FBRCxDQUFaLENBQWtCZ1UsS0FBaEMsQ0FBSixFQUE0QztBQUMzQyxjQUFNQSxLQUFLLEdBQUcwRCxZQUFZLENBQUMxWCxHQUFELENBQVosQ0FBa0JnVSxLQUFoQztBQUNBQSxVQUFBQSxLQUFLLENBQUN2UixPQUFOLENBQWMsVUFBQWtCLElBQUksRUFBSTtBQUNyQixnQkFBSUEsSUFBSSxJQUFJQSxJQUFJLENBQUNyQyxjQUFiLElBQStCbVcscUJBQXFCLENBQUMzTyxPQUF0QixDQUE4Qm5GLElBQUksQ0FBQ3JDLGNBQW5DLE1BQXVELENBQUMsQ0FBM0YsRUFBOEY7QUFDN0ZtVyxjQUFBQSxxQkFBcUIsQ0FBQ2hULElBQXRCLENBQTJCZCxJQUFJLENBQUNyQyxjQUFoQztBQUNBLGtCQUFNd1csc0JBQXNCLEdBQUdDLGdDQUFnQyxDQUFDcFUsSUFBSSxDQUFDckMsY0FBTixFQUFzQlgsZ0JBQXRCLENBQS9EOztBQUNBLGtCQUFJbVgsc0JBQUosRUFBNEI7QUFDM0JILGdCQUFBQSxjQUFjLENBQUNsVCxJQUFmLENBQW9CcVQsc0JBQXBCO0FBQ0E7QUFDRDtBQUNELFdBUkQ7QUFTQTtBQUNEOztBQUNELGFBQU9ILGNBQVA7QUFDQSxLQW5CSyxFQW9CTDFRLE1BcEJLLENBb0JFLFVBQUMrUSxTQUFELEVBQVl2USxnQkFBWjtBQUFBLGFBQWlDdVEsU0FBUyxDQUFDOVAsTUFBVixDQUFpQlQsZ0JBQWpCLENBQWpDO0FBQUEsS0FwQkYsRUFvQnVFLEVBcEJ2RSxDQUFQO0FBcUJBOztBQUVELFdBQVNmLDJCQUFULENBQXFDSCxpQkFBckMsRUFBa0g7QUFDakgsV0FBT0EsaUJBQWlCLENBQUNVLE1BQWxCLENBQXlCLFVBQUNDLGFBQUQsRUFBeUNPLGdCQUF6QyxFQUE4RDtBQUM3RkEsTUFBQUEsZ0JBQWdCLENBQUN3USxhQUFqQixDQUErQnhWLE9BQS9CLENBQXVDLFVBQUFxTixZQUFZLEVBQUk7QUFDdEQ1SSxRQUFBQSxhQUFhLENBQUM0SSxZQUFELENBQWIsR0FBOEIsSUFBOUI7QUFDQSxPQUZEO0FBR0EsYUFBTzVJLGFBQVA7QUFDQSxLQUxNLEVBS0osRUFMSSxDQUFQO0FBTUE7O0FBRUQsV0FBU3lQLGdCQUFULENBQTBCaFcsZ0JBQTFCLEVBQThEb0QsS0FBOUQsRUFBNEg7QUFDM0gsUUFBSThSLGFBQWEsR0FBRyxFQUFwQjtBQUFBLFFBQ0NDLGFBQWEsR0FBRyxFQURqQjs7QUFFQSxRQUNDblYsZ0JBQWdCLENBQUNpRSxrQkFBakIsR0FBc0NDLHlCQUF0QyxNQUNBbEUsZ0JBQWdCLENBQUNtRSxlQUFqQixPQUF1Q0MsWUFBWSxDQUFDQyxrQkFGckQsRUFHRTtBQUFBLGtEQUNnQmpCLEtBRGhCO0FBQUE7O0FBQUE7QUFDRCwrREFBd0I7QUFBQSxjQUFmRSxJQUFlO0FBQ3ZCQSxVQUFBQSxJQUFJLEdBQUdBLElBQVA7O0FBQ0EsY0FBSUEsSUFBSSxDQUFDbU8sY0FBTCxJQUF1Qm5PLElBQUksQ0FBQ2tPLGNBQWhDLEVBQWdEO0FBQy9DMkQsWUFBQUEsYUFBYSxHQUFHN1IsSUFBSSxDQUFDbU8sY0FBckI7QUFDQXlELFlBQUFBLGFBQWEsR0FBRzVSLElBQUksQ0FBQ2tPLGNBQXJCO0FBQ0E7QUFDQTtBQUNEO0FBUkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNELEtBWkQsTUFZTztBQUNOMEQsTUFBQUEsYUFBYSxHQUFJOVIsS0FBSyxDQUFDLENBQUQsQ0FBTixDQUFtQ29PLGNBQW5EO0FBQ0E7O0FBQ0QsUUFBSTBELGFBQWEsSUFBSUMsYUFBckIsRUFBb0M7QUFDbkMsYUFBTztBQUNOYyxRQUFBQSxPQUFPLEVBQUVkLGFBREg7QUFFTmUsUUFBQUEsT0FBTyxFQUFFaEI7QUFGSCxPQUFQO0FBSUE7O0FBQ0QsV0FBT2pWLFNBQVA7QUFDQSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcblx0QXZhaWxhYmlsaXR5VHlwZSxcblx0RmlsdGVyRmllbGRNYW5pZmVzdENvbmZpZ3VyYXRpb24sXG5cdEZpbHRlck1hbmlmZXN0Q29uZmlndXJhdGlvbixcblx0TXVsdGlwbGVWaWV3c0NvbmZpZ3VyYXRpb24sXG5cdFZpZXdQYXRoQ29uZmlndXJhdGlvbixcblx0U2luZ2xlVmlld1BhdGhDb25maWd1cmF0aW9uLFxuXHRWaXN1YWxpemF0aW9uVHlwZSxcblx0RmlsdGVyU2V0dGluZ3MsXG5cdFRlbXBsYXRlVHlwZSxcblx0Q29tYmluZWRWaWV3UGF0aENvbmZpZ3VyYXRpb24sXG5cdEN1c3RvbVZpZXdUZW1wbGF0ZUNvbmZpZ3VyYXRpb25cbn0gZnJvbSBcIi4uL01hbmlmZXN0U2V0dGluZ3NcIjtcbmltcG9ydCB7IEVudGl0eVR5cGUsIE5hdmlnYXRpb25Qcm9wZXJ0eSwgUHJvcGVydHkgfSBmcm9tIFwiQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlclwiO1xuaW1wb3J0IHtcblx0RGF0YVZpc3VhbGl6YXRpb25Bbm5vdGF0aW9ucyxcblx0RGF0YVZpc3VhbGl6YXRpb25EZWZpbml0aW9uLFxuXHRnZXREYXRhVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb24sXG5cdGdldERlZmF1bHRDaGFydCxcblx0Z2V0RGVmYXVsdExpbmVJdGVtLFxuXHRnZXREZWZhdWx0UHJlc2VudGF0aW9uVmFyaWFudCxcblx0Z2V0U2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudCxcblx0aXNQcmVzZW50YXRpb25Db21wbGlhbnQsXG5cdGdldFNlbGVjdGlvblZhcmlhbnQsXG5cdGlzU2VsZWN0aW9uUHJlc2VudGF0aW9uQ29tcGxpYW50XG59IGZyb20gXCIuLi9jb250cm9scy9Db21tb24vRGF0YVZpc3VhbGl6YXRpb25cIjtcbmltcG9ydCB7XG5cdExpbmVJdGVtLFxuXHRQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzLFxuXHRTZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzLFxuXHRTZWxlY3RPcHRpb25UeXBlLFxuXHRTZWxlY3Rpb25WYXJpYW50VHlwZVR5cGVzLFxuXHRGaWVsZEdyb3VwVHlwZSxcblx0RmllbGRHcm91cFxufSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvZGlzdC9nZW5lcmF0ZWQvVUlcIjtcbmltcG9ydCB7IEFubm90YXRpb25UZXJtLCBEYXRhRmllbGRBYnN0cmFjdFR5cGVzLCBEYXRhRmllbGRUeXBlcywgUmVmZXJlbmNlRmFjZXRUeXBlcywgVUlBbm5vdGF0aW9uVGVybXMgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXNcIjtcbmltcG9ydCB7IEN1c3RvbVRhYklELCBGaWx0ZXJCYXJJRCwgRmlsdGVyVmFyaWFudE1hbmFnZW1lbnRJRCwgVGFibGVJRCwgVmlzdWFsRmlsdGVySUQgfSBmcm9tIFwiLi4vaGVscGVycy9JRFwiO1xuaW1wb3J0IHtcblx0Z2V0U2VsZWN0aW9uVmFyaWFudENvbmZpZ3VyYXRpb24sXG5cdFNlbGVjdGlvblZhcmlhbnRDb25maWd1cmF0aW9uLFxuXHRUYWJsZVZpc3VhbGl6YXRpb25cbn0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29udHJvbHMvQ29tbW9uL1RhYmxlXCI7XG5pbXBvcnQgeyBDaGFydFZpc3VhbGl6YXRpb24gfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb250cm9scy9Db21tb24vQ2hhcnRcIjtcbmltcG9ydCB7IEJhc2VBY3Rpb24sIGdldEFjdGlvbnNGcm9tTWFuaWZlc3QgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb250cm9scy9Db21tb24vQWN0aW9uXCI7XG5pbXBvcnQgeyBDb25maWd1cmFibGVPYmplY3QsIEN1c3RvbUVsZW1lbnQsIGluc2VydEN1c3RvbUVsZW1lbnRzLCBQbGFjZW1lbnQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0NvbmZpZ3VyYWJsZU9iamVjdFwiO1xuaW1wb3J0IHsgS2V5SGVscGVyIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9LZXlcIjtcbmltcG9ydCB7IGFubm90YXRpb25FeHByZXNzaW9uLCBjb21waWxlQmluZGluZyB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdFeHByZXNzaW9uXCI7XG5pbXBvcnQgeyBJc3N1ZVR5cGUsIElzc3VlU2V2ZXJpdHksIElzc3VlQ2F0ZWdvcnkgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0lzc3VlTWFuYWdlclwiO1xuaW1wb3J0IHsgaXNQcm9wZXJ0eUZpbHRlcmFibGUsIGdldElzUmVxdWlyZWQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9GaWx0ZXJUZW1wbGF0aW5nXCI7XG5pbXBvcnQgeyBjaGVja0ZpbHRlckV4cHJlc3Npb25SZXN0cmljdGlvbnMgfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EYXRhTW9kZWxQYXRoSGVscGVyXCI7XG5pbXBvcnQgQ29udmVydGVyQ29udGV4dCBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9Db252ZXJ0ZXJDb250ZXh0XCI7XG5pbXBvcnQgeyBBZ2dyZWdhdGlvbkhlbHBlciB9IGZyb20gXCIuLi9oZWxwZXJzL0FnZ3JlZ2F0aW9uXCI7XG5pbXBvcnQgeyBLUElEZWZpbml0aW9uLCBnZXRLUElEZWZpbml0aW9ucyB9IGZyb20gXCIuLi9jb250cm9scy9Db21tb24vS1BJXCI7XG5cbnR5cGUgVmlld0Fubm90YXRpb25zVHlwZVR5cGVzID0gU2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IFNlbGVjdGlvblZhcmlhbnRUeXBlVHlwZXM7XG50eXBlIFZhcmlhbnRNYW5hZ2VtZW50RGVmaW5pdGlvbiA9IHtcblx0aWQ6IHN0cmluZztcblx0dGFyZ2V0Q29udHJvbElkczogc3RyaW5nO1xufTtcblxudHlwZSBNdWx0aXBsZVZpZXdDb25maWd1cmF0aW9uID0gVmlld1BhdGhDb25maWd1cmF0aW9uICYge1xuXHRhbm5vdGF0aW9uPzogRGF0YVZpc3VhbGl6YXRpb25Bbm5vdGF0aW9ucztcbn07XG5cbnR5cGUgU2luZ2xlVmlld0NvbmZpZ3VyYXRpb24gPSB7XG5cdGFubm90YXRpb24/OiBEYXRhVmlzdWFsaXphdGlvbkFubm90YXRpb25zO1xufTtcblxudHlwZSBDdXN0b21WaWV3Q29uZmlndXJhdGlvbiA9IEN1c3RvbVZpZXdUZW1wbGF0ZUNvbmZpZ3VyYXRpb24gJiB7XG5cdHR5cGU6IHN0cmluZztcbn07XG5cbnR5cGUgVmlld0NvbmZpZ3VyYXRpb24gPSBNdWx0aXBsZVZpZXdDb25maWd1cmF0aW9uIHwgU2luZ2xlVmlld0NvbmZpZ3VyYXRpb24gfCBDdXN0b21WaWV3Q29uZmlndXJhdGlvbjtcbnR5cGUgVmlld0Fubm90YXRpb25Db25maWd1cmF0aW9uID0gTXVsdGlwbGVWaWV3Q29uZmlndXJhdGlvbiB8IFNpbmdsZVZpZXdDb25maWd1cmF0aW9uO1xuXG50eXBlIEZpbHRlckZpZWxkID0gQ29uZmlndXJhYmxlT2JqZWN0ICYge1xuXHRjb25kaXRpb25QYXRoOiBzdHJpbmc7XG5cdGF2YWlsYWJpbGl0eTogQXZhaWxhYmlsaXR5VHlwZTtcblx0YW5ub3RhdGlvblBhdGg6IHN0cmluZztcblx0bGFiZWw/OiBzdHJpbmc7XG5cdHRlbXBsYXRlPzogc3RyaW5nO1xuXHRncm91cD86IHN0cmluZztcblx0Z3JvdXBMYWJlbD86IHN0cmluZztcblx0c2V0dGluZ3M/OiBGaWx0ZXJTZXR0aW5ncztcblx0aXNQYXJhbWV0ZXI/OiBib29sZWFuO1xuXHR2aXN1YWxGaWx0ZXI/OiBWaXN1YWxGaWx0ZXJzO1xufTtcblxudHlwZSBWaXN1YWxGaWx0ZXJzID0ge1xuXHRkaW1lbnNpb25QYXRoPzogc3RyaW5nO1xuXHRtZWFzdXJlUGF0aD86IHN0cmluZztcblx0dmlzdWFsRmlsdGVySWQ/OiBzdHJpbmc7XG5cdGxhYmVsPzogc3RyaW5nO1xuXHRjaGFydEFubm90YXRpb24/OiBzdHJpbmc7XG5cdHByZXNlbnRhdGlvbkFubm90YXRpb24/OiBzdHJpbmc7XG5cdHZpc2libGU/OiBib29sZWFuO1xuXHRvdXRQYXJhbWV0ZXI/OiBzdHJpbmc7XG5cdGluUGFyYW1ldGVycz86IG9iamVjdFtdO1xuXHRjb250ZXh0UGF0aD86IHN0cmluZztcblx0c2VsZWN0aW9uVmFyaWFudEFubm90YXRpb24/OiBzdHJpbmc7XG5cdG11bHRpcGxlU2VsZWN0aW9uQWxsb3dlZD86IGJvb2xlYW47XG5cdHJlcXVpcmVkPzogYm9vbGVhbjtcblx0c2hvd092ZXJsYXlJbml0aWFsbHk/OiBib29sZWFuO1xuXHRyZXF1aXJlZFByb3BlcnRpZXM/OiBvYmplY3RbXTtcbn07XG5cbnR5cGUgRmlsdGVyR3JvdXAgPSB7XG5cdGdyb3VwPzogc3RyaW5nO1xuXHRncm91cExhYmVsPzogc3RyaW5nO1xufTtcblxudHlwZSBWaWV3Q29udmVydGVyU2V0dGluZ3MgPSBWaWV3Q29uZmlndXJhdGlvbiAmIHtcblx0Y29udmVydGVyQ29udGV4dD86IENvbnZlcnRlckNvbnRleHQ7XG59O1xuXG50eXBlIEN1c3RvbUVsZW1lbnRGaWx0ZXJGaWVsZCA9IEN1c3RvbUVsZW1lbnQ8RmlsdGVyRmllbGQ+O1xuXG50eXBlIERlZmF1bHRTZW1hbnRpY0RhdGUgPSBDb25maWd1cmFibGVPYmplY3QgJiB7XG5cdG9wZXJhdG9yOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBMaXN0UmVwb3J0RGVmaW5pdGlvbiA9IHtcblx0bWFpbkVudGl0eVNldDogc3RyaW5nO1xuXHRtYWluRW50aXR5VHlwZTogc3RyaW5nOyAvLyBlbnRpdHlUeXBlPiBhdCB0aGUgc3RhcnQgb2YgTFIgdGVtcGxhdGluZ1xuXHRzaW5nbGVUYWJsZUlkPzogc3RyaW5nOyAvLyBvbmx5IHdpdGggc2luZ2xlIFRhYmxlIG1vZGVcblx0c2luZ2xlQ2hhcnRJZD86IHN0cmluZzsgLy8gb25seSB3aXRoIHNpbmdsZSBUYWJsZSBtb2RlXG5cdHNob3dUYWJDb3VudHM/OiBib29sZWFuOyAvLyBvbmx5IHdpdGggbXVsdGkgVGFibGUgbW9kZVxuXHRoZWFkZXJBY3Rpb25zOiBCYXNlQWN0aW9uW107XG5cdHNob3dQaW5uYWJsZVRvZ2dsZT86IGJvb2xlYW47XG5cdGZpbHRlckJhcjoge1xuXHRcdHNlbGVjdGlvbkZpZWxkczogRmlsdGVyRmllbGRbXTtcblx0XHRoaWRlQmFzaWNTZWFyY2g6IGJvb2xlYW47XG5cdH07XG5cdHZpZXdzOiBMaXN0UmVwb3J0Vmlld0RlZmluaXRpb25bXTtcblx0ZmlsdGVyQ29uZGl0aW9uczogb2JqZWN0O1xuXHRpc011bHRpRW50aXR5U2V0czogYm9vbGVhbjtcblx0ZmlsdGVyQmFySWQ6IHN0cmluZztcblx0dmFyaWFudE1hbmFnZW1lbnQ6IFZhcmlhbnRNYW5hZ2VtZW50RGVmaW5pdGlvbjtcblx0aGFzTXVsdGlWaXN1YWxpemF0aW9uczogYm9vbGVhbjtcblx0dXNlU2VtYW50aWNEYXRlUmFuZ2U/OiBib29sZWFuO1xuXHRmaWx0ZXJJbml0aWFsTGF5b3V0Pzogc3RyaW5nO1xuXHRmaWx0ZXJMYXlvdXQ/OiBzdHJpbmc7XG5cdGtwaURlZmluaXRpb25zOiBLUElEZWZpbml0aW9uW107XG59O1xuXG5leHBvcnQgdHlwZSBMaXN0UmVwb3J0Vmlld0RlZmluaXRpb24gPSBTaW5nbGVWaWV3RGVmaW5pdGlvbiB8IEN1c3RvbVZpZXdEZWZpbml0aW9uIHwgQ29tYmluZWRWaWV3RGVmaW5pdGlvbjtcblxuZXhwb3J0IHR5cGUgQ29tYmluZWRWaWV3RGVmaW5pdGlvbiA9IHtcblx0c2VsZWN0aW9uVmFyaWFudFBhdGg/OiBzdHJpbmc7IC8vIG9ubHkgd2l0aCBvbiBtdWx0aSBUYWJsZSBtb2RlXG5cdHRpdGxlPzogc3RyaW5nOyAvLyBvbmx5IHdpdGggbXVsdGkgVGFibGUgbW9kZVxuXHRwcmltYXJ5VmlzdWFsaXphdGlvbjogRGF0YVZpc3VhbGl6YXRpb25EZWZpbml0aW9uO1xuXHRzZWNvbmRhcnlWaXN1YWxpemF0aW9uOiBEYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb247XG5cdHRhYmxlQ29udHJvbElkOiBzdHJpbmc7XG5cdGNoYXJ0Q29udHJvbElkOiBzdHJpbmc7XG5cdGRlZmF1bHRQYXRoPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQ3VzdG9tVmlld0RlZmluaXRpb24gPSB7XG5cdHRpdGxlPzogc3RyaW5nOyAvLyBvbmx5IHdpdGggbXVsdGkgVGFibGUgbW9kZVxuXHRmcmFnbWVudDogc3RyaW5nO1xuXHR0eXBlOiBzdHJpbmc7XG5cdGN1c3RvbVRhYklkOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBTaW5nbGVWaWV3RGVmaW5pdGlvbiA9IHtcblx0c2VsZWN0aW9uVmFyaWFudFBhdGg/OiBzdHJpbmc7IC8vIG9ubHkgd2l0aCBvbiBtdWx0aSBUYWJsZSBtb2RlXG5cdHRpdGxlPzogc3RyaW5nOyAvLyBvbmx5IHdpdGggbXVsdGkgVGFibGUgbW9kZVxuXHRwcmVzZW50YXRpb246IERhdGFWaXN1YWxpemF0aW9uRGVmaW5pdGlvbjtcblx0dGFibGVDb250cm9sSWQ6IHN0cmluZztcbn07XG5cbnR5cGUgQ29udGVudEFyZWFJRCA9IHtcblx0Y2hhcnRJZDogc3RyaW5nO1xuXHR0YWJsZUlkOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgdGhlIGNvbmRpdGlvbiBwYXRoIHJlcXVpcmVkIGZvciB0aGUgY29uZGl0aW9uIG1vZGVsLiBJdCBsb29rcyBsaWtlIGZvbGxvdzpcbiAqIDwxOk4tUHJvcGVydHlOYW1lPipcXC88MToxLVByb3BlcnR5TmFtZT4vPFByb3BlcnR5TmFtZT4uXG4gKlxuICogQHBhcmFtIGVudGl0eVR5cGUgVGhlIHJvb3QgRW50aXR5VHlbZVxuICogQHBhcmFtIHByb3BlcnR5UGF0aCBUaGUgZnVsbCBwYXRoIHRvIHRoZSB0YXJnZXQgcHJvcGVydHlcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgY29uZGl0aW9uIHBhdGhcbiAqL1xuY29uc3QgX2dldENvbmRpdGlvblBhdGggPSBmdW5jdGlvbihlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLCBwcm9wZXJ0eVBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG5cdGNvbnN0IHBhcnRzID0gcHJvcGVydHlQYXRoLnNwbGl0KFwiL1wiKTtcblx0bGV0IHBhcnRpYWxQYXRoO1xuXHRsZXQga2V5ID0gXCJcIjtcblx0d2hpbGUgKHBhcnRzLmxlbmd0aCkge1xuXHRcdGxldCBwYXJ0ID0gcGFydHMuc2hpZnQoKSBhcyBzdHJpbmc7XG5cdFx0cGFydGlhbFBhdGggPSBwYXJ0aWFsUGF0aCA/IHBhcnRpYWxQYXRoICsgXCIvXCIgKyBwYXJ0IDogcGFydDtcblx0XHRjb25zdCBwcm9wZXJ0eTogUHJvcGVydHkgfCBOYXZpZ2F0aW9uUHJvcGVydHkgPSBlbnRpdHlUeXBlLnJlc29sdmVQYXRoKHBhcnRpYWxQYXRoKTtcblx0XHRpZiAocHJvcGVydHkuX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIgJiYgcHJvcGVydHkuaXNDb2xsZWN0aW9uKSB7XG5cdFx0XHRwYXJ0ICs9IFwiKlwiO1xuXHRcdH1cblx0XHRrZXkgPSBrZXkgPyBrZXkgKyBcIi9cIiArIHBhcnQgOiBwYXJ0O1xuXHR9XG5cdHJldHVybiBrZXk7XG59O1xuXG5jb25zdCBfY3JlYXRlRmlsdGVyU2VsZWN0aW9uRmllbGQgPSBmdW5jdGlvbihcblx0ZW50aXR5VHlwZTogRW50aXR5VHlwZSxcblx0cHJvcGVydHk6IFByb3BlcnR5LFxuXHRmdWxsUHJvcGVydHlQYXRoOiBzdHJpbmcsXG5cdGluY2x1ZGVIaWRkZW46IGJvb2xlYW4sXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IEZpbHRlckZpZWxkIHwgdW5kZWZpbmVkIHtcblx0Ly8gaWdub3JlIGNvbXBsZXggcHJvcGVydHkgdHlwZXMgYW5kIGhpZGRlbiBhbm5vdGF0ZWQgb25lc1xuXHRpZiAoXG5cdFx0cHJvcGVydHkgIT09IHVuZGVmaW5lZCAmJlxuXHRcdHByb3BlcnR5LnRhcmdldFR5cGUgPT09IHVuZGVmaW5lZCAmJlxuXHRcdChpbmNsdWRlSGlkZGVuIHx8IHByb3BlcnR5LmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgIT09IHRydWUpXG5cdCkge1xuXHRcdGNvbnN0IHRhcmdldEVudGl0eVR5cGUgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEFubm90YXRpb25FbnRpdHlUeXBlKHByb3BlcnR5KTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0a2V5OiBLZXlIZWxwZXIuZ2V0U2VsZWN0aW9uRmllbGRLZXlGcm9tUGF0aChmdWxsUHJvcGVydHlQYXRoKSxcblx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEFic29sdXRlQW5ub3RhdGlvblBhdGgoZnVsbFByb3BlcnR5UGF0aCksXG5cdFx0XHRjb25kaXRpb25QYXRoOiBfZ2V0Q29uZGl0aW9uUGF0aChlbnRpdHlUeXBlLCBmdWxsUHJvcGVydHlQYXRoKSxcblx0XHRcdGF2YWlsYWJpbGl0eTpcblx0XHRcdFx0cHJvcGVydHkuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW5GaWx0ZXI/LnZhbHVlT2YoKSA9PT0gdHJ1ZSA/IEF2YWlsYWJpbGl0eVR5cGUuSGlkZGVuIDogQXZhaWxhYmlsaXR5VHlwZS5BZGFwdGF0aW9uLFxuXHRcdFx0bGFiZWw6IGNvbXBpbGVCaW5kaW5nKGFubm90YXRpb25FeHByZXNzaW9uKHByb3BlcnR5LmFubm90YXRpb25zLkNvbW1vbj8uTGFiZWw/LnZhbHVlT2YoKSB8fCBwcm9wZXJ0eS5uYW1lKSksXG5cdFx0XHRncm91cDogdGFyZ2V0RW50aXR5VHlwZS5uYW1lLFxuXHRcdFx0Z3JvdXBMYWJlbDogY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRcdGFubm90YXRpb25FeHByZXNzaW9uKHRhcmdldEVudGl0eVR5cGU/LmFubm90YXRpb25zPy5Db21tb24/LkxhYmVsPy52YWx1ZU9mKCkgfHwgdGFyZ2V0RW50aXR5VHlwZS5uYW1lKVxuXHRcdFx0KVxuXHRcdH07XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn07XG5cbmNvbnN0IF9nZXRTZWxlY3Rpb25GaWVsZHMgPSBmdW5jdGlvbihcblx0ZW50aXR5VHlwZTogRW50aXR5VHlwZSxcblx0bmF2aWdhdGlvblBhdGg6IHN0cmluZyxcblx0cHJvcGVydGllczogQXJyYXk8UHJvcGVydHk+IHwgdW5kZWZpbmVkLFxuXHRpbmNsdWRlSGlkZGVuOiBib29sZWFuLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBSZWNvcmQ8c3RyaW5nLCBGaWx0ZXJGaWVsZD4ge1xuXHRjb25zdCBzZWxlY3Rpb25GaWVsZE1hcDogUmVjb3JkPHN0cmluZywgRmlsdGVyRmllbGQ+ID0ge307XG5cdGlmIChwcm9wZXJ0aWVzKSB7XG5cdFx0cHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eTogUHJvcGVydHkpID0+IHtcblx0XHRcdGNvbnN0IHByb3BlcnR5UGF0aDogc3RyaW5nID0gcHJvcGVydHkubmFtZTtcblx0XHRcdGNvbnN0IGZ1bGxQYXRoOiBzdHJpbmcgPSAobmF2aWdhdGlvblBhdGggPyBuYXZpZ2F0aW9uUGF0aCArIFwiL1wiIDogXCJcIikgKyBwcm9wZXJ0eVBhdGg7XG5cdFx0XHRjb25zdCBzZWxlY3Rpb25GaWVsZCA9IF9jcmVhdGVGaWx0ZXJTZWxlY3Rpb25GaWVsZChlbnRpdHlUeXBlLCBwcm9wZXJ0eSwgZnVsbFBhdGgsIGluY2x1ZGVIaWRkZW4sIGNvbnZlcnRlckNvbnRleHQpO1xuXHRcdFx0aWYgKHNlbGVjdGlvbkZpZWxkKSB7XG5cdFx0XHRcdHNlbGVjdGlvbkZpZWxkTWFwW2Z1bGxQYXRoXSA9IHNlbGVjdGlvbkZpZWxkO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBzZWxlY3Rpb25GaWVsZE1hcDtcbn07XG5cbmNvbnN0IF9nZXRTZWxlY3Rpb25GaWVsZHNCeVBhdGggPSBmdW5jdGlvbihcblx0ZW50aXR5VHlwZTogRW50aXR5VHlwZSxcblx0cHJvcGVydHlQYXRoczogQXJyYXk8c3RyaW5nPiB8IHVuZGVmaW5lZCxcblx0aW5jbHVkZUhpZGRlbjogYm9vbGVhbixcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dFxuKTogUmVjb3JkPHN0cmluZywgRmlsdGVyRmllbGQ+IHtcblx0bGV0IHNlbGVjdGlvbkZpZWxkczogUmVjb3JkPHN0cmluZywgRmlsdGVyRmllbGQ+ID0ge307XG5cdGlmIChwcm9wZXJ0eVBhdGhzKSB7XG5cdFx0cHJvcGVydHlQYXRocy5mb3JFYWNoKChwcm9wZXJ0eVBhdGg6IHN0cmluZykgPT4ge1xuXHRcdFx0bGV0IGxvY2FsU2VsZWN0aW9uRmllbGRzOiBSZWNvcmQ8c3RyaW5nLCBGaWx0ZXJGaWVsZD47XG5cblx0XHRcdGNvbnN0IHByb3BlcnR5OiBQcm9wZXJ0eSB8IE5hdmlnYXRpb25Qcm9wZXJ0eSA9IGVudGl0eVR5cGUucmVzb2x2ZVBhdGgocHJvcGVydHlQYXRoKTtcblx0XHRcdGlmIChwcm9wZXJ0eSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHJldHVybjtcblx0XHRcdH1cblx0XHRcdGlmIChwcm9wZXJ0eS5fdHlwZSA9PT0gXCJOYXZpZ2F0aW9uUHJvcGVydHlcIikge1xuXHRcdFx0XHQvLyBoYW5kbGUgbmF2aWdhdGlvbiBwcm9wZXJ0aWVzXG5cdFx0XHRcdGxvY2FsU2VsZWN0aW9uRmllbGRzID0gX2dldFNlbGVjdGlvbkZpZWxkcyhcblx0XHRcdFx0XHRlbnRpdHlUeXBlLFxuXHRcdFx0XHRcdHByb3BlcnR5UGF0aCxcblx0XHRcdFx0XHRwcm9wZXJ0eS50YXJnZXRUeXBlLmVudGl0eVByb3BlcnRpZXMsXG5cdFx0XHRcdFx0aW5jbHVkZUhpZGRlbixcblx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0XHRcdCk7XG5cdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5LnRhcmdldFR5cGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHQvLyBoYW5kbGUgQ29tcGxleFR5cGUgcHJvcGVydGllc1xuXHRcdFx0XHRsb2NhbFNlbGVjdGlvbkZpZWxkcyA9IF9nZXRTZWxlY3Rpb25GaWVsZHMoXG5cdFx0XHRcdFx0ZW50aXR5VHlwZSxcblx0XHRcdFx0XHRwcm9wZXJ0eVBhdGgsXG5cdFx0XHRcdFx0cHJvcGVydHkudGFyZ2V0VHlwZS5wcm9wZXJ0aWVzLFxuXHRcdFx0XHRcdGluY2x1ZGVIaWRkZW4sXG5cdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHQpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y29uc3QgbmF2aWdhdGlvblBhdGggPSBwcm9wZXJ0eVBhdGguaW5jbHVkZXMoXCIvXCIpXG5cdFx0XHRcdFx0PyBwcm9wZXJ0eVBhdGhcblx0XHRcdFx0XHRcdFx0LnNwbGl0KFwiL1wiKVxuXHRcdFx0XHRcdFx0XHQuc3BsaWNlKDAsIDEpXG5cdFx0XHRcdFx0XHRcdC5qb2luKFwiL1wiKVxuXHRcdFx0XHRcdDogXCJcIjtcblx0XHRcdFx0bG9jYWxTZWxlY3Rpb25GaWVsZHMgPSBfZ2V0U2VsZWN0aW9uRmllbGRzKGVudGl0eVR5cGUsIG5hdmlnYXRpb25QYXRoLCBbcHJvcGVydHldLCBpbmNsdWRlSGlkZGVuLCBjb252ZXJ0ZXJDb250ZXh0KTtcblx0XHRcdH1cblxuXHRcdFx0c2VsZWN0aW9uRmllbGRzID0ge1xuXHRcdFx0XHQuLi5zZWxlY3Rpb25GaWVsZHMsXG5cdFx0XHRcdC4uLmxvY2FsU2VsZWN0aW9uRmllbGRzXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBzZWxlY3Rpb25GaWVsZHM7XG59O1xuXG4vKipcbiAqIEVudGVyIGFsbCBEYXRhRmllbGRzIG9mIGEgZ2l2ZW4gRmllbGRHcm91cCBpbnRvIHRoZSBmaWx0ZXJGYWNldE1hcC5cbiAqXG4gKiBAcGFyYW0ge0Fubm90YXRpb25UZXJtPEZpZWxkR3JvdXBUeXBlPn0gZmllbGRHcm91cFxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIEZpbHRlckdyb3VwPn0gVGhlIG1hcCBvZiBmYWNldHMgZm9yIHRoZSBnaXZlbiBmaWVsZEdyb3VwXG4gKi9cbmZ1bmN0aW9uIGdldEZpZWxkR3JvdXBGaWx0ZXJHcm91cHMoZmllbGRHcm91cDogQW5ub3RhdGlvblRlcm08RmllbGRHcm91cFR5cGU+KTogUmVjb3JkPHN0cmluZywgRmlsdGVyR3JvdXA+IHtcblx0Y29uc3QgZmlsdGVyRmFjZXRNYXA6IFJlY29yZDxzdHJpbmcsIEZpbHRlckdyb3VwPiA9IHt9O1xuXHRmaWVsZEdyb3VwLkRhdGEuZm9yRWFjaCgoZGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzKSA9PiB7XG5cdFx0aWYgKGRhdGFGaWVsZC4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRcIikge1xuXHRcdFx0ZmlsdGVyRmFjZXRNYXBbZGF0YUZpZWxkLlZhbHVlLnBhdGhdID0ge1xuXHRcdFx0XHRncm91cDogZmllbGRHcm91cC5mdWxseVF1YWxpZmllZE5hbWUsXG5cdFx0XHRcdGdyb3VwTGFiZWw6XG5cdFx0XHRcdFx0Y29tcGlsZUJpbmRpbmcoXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uRXhwcmVzc2lvbihmaWVsZEdyb3VwLkxhYmVsIHx8IGZpZWxkR3JvdXAuYW5ub3RhdGlvbnM/LkNvbW1vbj8uTGFiZWwgfHwgZmllbGRHcm91cC5xdWFsaWZpZXIpXG5cdFx0XHRcdFx0KSB8fCBmaWVsZEdyb3VwLnF1YWxpZmllclxuXHRcdFx0fTtcblx0XHR9XG5cdH0pO1xuXHRyZXR1cm4gZmlsdGVyRmFjZXRNYXA7XG59XG5cbi8qKlxuICogUmV0cmlldmVzIGFsbCBsaXN0IHJlcG9ydCB0YWJsZXMuXG4gKiBAcGFyYW0ge0xpc3RSZXBvcnRWaWV3RGVmaW5pdGlvbltdfSB2aWV3cyBUaGUgbGlzdCByZXBvcnQgdmlld3MgY29uZmlndXJlZCBpbiB0aGUgbWFuaWZlc3RcbiAqIEByZXR1cm5zIHtUYWJsZVZpc3VhbGl6YXRpb25bXX0gVGhlIGxpc3QgcmVwb3J0IHRhYmxlXG4gKi9cbmZ1bmN0aW9uIGdldFRhYmxlVmlzdWFsaXphdGlvbnModmlld3M6IExpc3RSZXBvcnRWaWV3RGVmaW5pdGlvbltdKTogVGFibGVWaXN1YWxpemF0aW9uW10ge1xuXHRjb25zdCB0YWJsZXM6IFRhYmxlVmlzdWFsaXphdGlvbltdID0gW107XG5cdHZpZXdzLmZvckVhY2goZnVuY3Rpb24odmlldykge1xuXHRcdGlmICghKHZpZXcgYXMgQ3VzdG9tVmlld0RlZmluaXRpb24pLnR5cGUpIHtcblx0XHRcdGNvbnN0IHZpc3VhbGl6YXRpb25zID0gKHZpZXcgYXMgQ29tYmluZWRWaWV3RGVmaW5pdGlvbikuc2Vjb25kYXJ5VmlzdWFsaXphdGlvblxuXHRcdFx0XHQ/ICh2aWV3IGFzIENvbWJpbmVkVmlld0RlZmluaXRpb24pLnNlY29uZGFyeVZpc3VhbGl6YXRpb24udmlzdWFsaXphdGlvbnNcblx0XHRcdFx0OiAodmlldyBhcyBTaW5nbGVWaWV3RGVmaW5pdGlvbikucHJlc2VudGF0aW9uLnZpc3VhbGl6YXRpb25zO1xuXG5cdFx0XHR2aXN1YWxpemF0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKHZpc3VhbGl6YXRpb24pIHtcblx0XHRcdFx0aWYgKHZpc3VhbGl6YXRpb24udHlwZSA9PT0gVmlzdWFsaXphdGlvblR5cGUuVGFibGUpIHtcblx0XHRcdFx0XHR0YWJsZXMucHVzaCh2aXN1YWxpemF0aW9uKTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9KTtcblx0cmV0dXJuIHRhYmxlcztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmVzIGlmIHRoZSBGaWx0ZXJCYXIgc2VhcmNoIGZpZWxkIGlzIGhpZGRlbiBvciBub3QuXG4gKlxuICogQHBhcmFtIHtUYWJsZVZpc3VhbGl6YXRpb25bXX0gbGlzdFJlcG9ydFRhYmxlcyBUaGUgbGlzdCByZXBvcnQgdGFibGVzXG4gKiBAcGFyYW0ge0NvbnZlcnRlckNvbnRleHR9IGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlciBjb250ZXh0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVGhlIGluZm9ybWF0aW9uIGlmIHRoZSBGaWx0ZXJCYXIgc2VhcmNoIGZpZWxkIGlzIGhpZGRlbiBvciBub3RcbiAqL1xuZnVuY3Rpb24gZ2V0RmlsdGVyQmFyaGlkZUJhc2ljU2VhcmNoKGxpc3RSZXBvcnRUYWJsZXM6IFRhYmxlVmlzdWFsaXphdGlvbltdLCBjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogYm9vbGVhbiB7XG5cdGlmIChcblx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmhhc011bHRpcGxlVmlzdWFsaXphdGlvbnMoKSB8fFxuXHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2Vcblx0KSB7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0Ly8gVHJpZXMgdG8gZmluZCBhIG5vbi1hbmFseXRpY2FsIHRhYmxlIHdpdGggdGhlIG1haW4gZW50aXR5IHNldCAocGFnZSBlbnRpdHkgc2V0KSBhcyBjb2xsZWN0aW9uXG5cdC8vIGlmIGF0IGxlYXN0IG9uZSB0YWJsZSBtYXRjaGVzIHRoZXNlIGNvbmRpdGlvbnMsIGJhc2ljIHNlYXJjaCBmaWVsZCBtdXN0IGJlIGRpc3BsYXllZC5cblx0Y29uc3Qgc0NvbnRleHRQYXRoID0gY29udmVydGVyQ29udGV4dC5nZXRDb250ZXh0UGF0aCgpO1xuXHRyZXR1cm4gY2hlY2tBbGxUYWJsZUZvckVudGl0eVNldEFyZUFuYWx5dGljYWwobGlzdFJlcG9ydFRhYmxlcywgc0NvbnRleHRQYXRoKTtcbn1cblxuLyoqXG4gKiBDaGVjayB0aGF0IGFsbCB0aGUgdGFibGVzIGZvciBhIGRlZGljYXRlZCBlbnRpdHlzZXQgYXJlIGNvbmZpZ3VyZWQgYXMgYW5hbHl0aWNhbCB0YWJsZS5cbiAqIEBwYXJhbSB7VGFibGVWaXN1YWxpemF0aW9uW119IGxpc3RSZXBvcnRUYWJsZXMgTGlzdCBSZXBvcnQgdGFibGVzXG4gKiBAcGFyYW0ge3N0cmluZ30gY29udGV4dFBhdGhcbiAqIEByZXR1cm5zIHtib29sZWFufSBJcyBGaWx0ZXJCYXIgc2VhcmNoIGZpZWxkIGhpZGRlbiBvciBub3RcbiAqL1xuZnVuY3Rpb24gY2hlY2tBbGxUYWJsZUZvckVudGl0eVNldEFyZUFuYWx5dGljYWwobGlzdFJlcG9ydFRhYmxlczogVGFibGVWaXN1YWxpemF0aW9uW10sIGNvbnRleHRQYXRoOiBzdHJpbmcgfCB1bmRlZmluZWQpIHtcblx0aWYgKGNvbnRleHRQYXRoICYmIGxpc3RSZXBvcnRUYWJsZXMubGVuZ3RoID4gMCkge1xuXHRcdHJldHVybiBsaXN0UmVwb3J0VGFibGVzLmV2ZXJ5KHZpc3VhbGl6YXRpb24gPT4ge1xuXHRcdFx0cmV0dXJuIHZpc3VhbGl6YXRpb24uZW5hYmxlQW5hbHl0aWNzICYmIGNvbnRleHRQYXRoID09PSB2aXN1YWxpemF0aW9uLmFubm90YXRpb24uY29sbGVjdGlvbjtcblx0XHR9KTtcblx0fVxuXHRyZXR1cm4gZmFsc2U7XG59XG5cbi8qKlxuICogR2V0IGFsbCBQYXJhbWV0ZXIgZmlsdGVyRmllbGRzIGluIGNhc2Ugb2YgYSBwYXJhbWV0ZXJpemVkIHNlcnZpY2UuXG4gKiBAcGFyYW0ge0NvbnZlcnRlckNvbnRleHR9IGNvbnZlcnRlckNvbnRleHRcbiAqIEByZXR1cm5zIHtGaWx0ZXJGaWVsZFtdfSBBbiBhcnJheSBvZiBwYXJhbWV0ZXIgZmlsdGVyZmllbGRzXG4gKi9cbmZ1bmN0aW9uIF9nZXRQYXJhbWV0ZXJGaWVsZHMoY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IEZpbHRlckZpZWxkW10ge1xuXHRjb25zdCBkYXRhTW9kZWxPYmplY3RQYXRoID0gY29udmVydGVyQ29udGV4dC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCk7XG5cdGNvbnN0IHBhcmFtZXRlckVudGl0eVR5cGUgPSBkYXRhTW9kZWxPYmplY3RQYXRoLnN0YXJ0aW5nRW50aXR5U2V0LmVudGl0eVR5cGU7XG5cdGNvbnN0IGlzUGFyYW1ldGVyaXplZCA9ICEhcGFyYW1ldGVyRW50aXR5VHlwZS5hbm5vdGF0aW9ucz8uQ29tbW9uPy5SZXN1bHRDb250ZXh0O1xuXHRjb25zdCBwYXJhbWV0ZXJDb252ZXJ0ZXJDb250ZXh0ID1cblx0XHRpc1BhcmFtZXRlcml6ZWQgJiYgY29udmVydGVyQ29udGV4dC5nZXRDb252ZXJ0ZXJDb250ZXh0Rm9yKFwiL1wiICsgZGF0YU1vZGVsT2JqZWN0UGF0aC5zdGFydGluZ0VudGl0eVNldC5uYW1lKTtcblxuXHRjb25zdCBwYXJhbWV0ZXJGaWVsZHMgPSAocGFyYW1ldGVyQ29udmVydGVyQ29udGV4dFxuXHRcdD8gcGFyYW1ldGVyRW50aXR5VHlwZS5lbnRpdHlQcm9wZXJ0aWVzLm1hcChmdW5jdGlvbihwcm9wZXJ0eSkge1xuXHRcdFx0XHRyZXR1cm4gX2dldEZpbHRlckZpZWxkKHt9IGFzIFJlY29yZDxzdHJpbmcsIEZpbHRlckZpZWxkPiwgcHJvcGVydHkubmFtZSwgcGFyYW1ldGVyQ29udmVydGVyQ29udGV4dCwgcGFyYW1ldGVyRW50aXR5VHlwZSk7XG5cdFx0ICB9KVxuXHRcdDogW10pIGFzIEZpbHRlckZpZWxkW107XG5cblx0cmV0dXJuIHBhcmFtZXRlckZpZWxkcztcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZSB0aGUgY29uZmlndXJhdGlvbiBmb3IgdGhlIHNlbGVjdGlvbiBmaWVsZHMgdGhhdCB3aWxsIGJlIHVzZWQgd2l0aGluIHRoZSBmaWx0ZXIgYmFyXG4gKiBUaGlzIGNvbmZpZ3VyYXRpb24gdGFrZXMgaW50byBhY2NvdW50IGFubm90YXRpb24gYW5kIHRoZSBzZWxlY3Rpb24gdmFyaWFudHMuXG4gKlxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0XG4gKiBAcGFyYW0ge1RhYmxlVmlzdWFsaXphdGlvbltdfSBsclRhYmxlc1xuICogQHJldHVybnMge0ZpbHRlclNlbGVjdGlvbkZpZWxkW119IEFuIGFycmF5IG9mIHNlbGVjdGlvbiBmaWVsZHNcbiAqL1xuXG5leHBvcnQgY29uc3QgZ2V0U2VsZWN0aW9uRmllbGRzID0gZnVuY3Rpb24oY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCwgbHJUYWJsZXM6IFRhYmxlVmlzdWFsaXphdGlvbltdID0gW10pOiBGaWx0ZXJGaWVsZFtdIHtcblx0Ly8gRmV0Y2ggYWxsIHNlbGVjdGlvblZhcmlhbnRzIGRlZmluZWQgaW4gdGhlIGRpZmZlcmVudCB2aXN1YWxpemF0aW9ucyBhbmQgZGlmZmVyZW50IHZpZXdzIChtdWx0aSB0YWJsZSBtb2RlKVxuXHRjb25zdCBzZWxlY3Rpb25WYXJpYW50czogU2VsZWN0aW9uVmFyaWFudENvbmZpZ3VyYXRpb25bXSA9IGdldFNlbGVjdGlvblZhcmlhbnRzKGxyVGFibGVzLCBjb252ZXJ0ZXJDb250ZXh0KTtcblxuXHQvLyBjcmVhdGUgYSBtYXAgb2YgcHJvcGVydGllcyB0byBiZSB1c2VkIGluIHNlbGVjdGlvbiB2YXJpYW50c1xuXHRjb25zdCBleGNsdWRlZEZpbHRlclByb3BlcnRpZXM6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+ID0gZ2V0RXhjbHVkZWRGaWx0ZXJQcm9wZXJ0aWVzKHNlbGVjdGlvblZhcmlhbnRzKTtcblx0Y29uc3QgZW50aXR5VHlwZSA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpO1xuXHRjb25zdCBmaWx0ZXJGYWNldHMgPSBlbnRpdHlUeXBlLmFubm90YXRpb25zLlVJPy5GaWx0ZXJGYWNldHM7XG5cdGxldCBmaWx0ZXJGYWNldE1hcDogUmVjb3JkPHN0cmluZywgRmlsdGVyR3JvdXA+ID0ge307XG5cblx0Y29uc3QgYUZpZWxkR3JvdXBzID0gY29udmVydGVyQ29udGV4dC5nZXRBbm5vdGF0aW9uc0J5VGVybShcIlVJXCIsIFVJQW5ub3RhdGlvblRlcm1zLkZpZWxkR3JvdXApO1xuXG5cdGlmIChmaWx0ZXJGYWNldHMgPT09IHVuZGVmaW5lZCB8fCBmaWx0ZXJGYWNldHMubGVuZ3RoIDwgMCkge1xuXHRcdGZvciAoY29uc3QgaSBpbiBhRmllbGRHcm91cHMpIHtcblx0XHRcdGZpbHRlckZhY2V0TWFwID0ge1xuXHRcdFx0XHQuLi5maWx0ZXJGYWNldE1hcCxcblx0XHRcdFx0Li4uZ2V0RmllbGRHcm91cEZpbHRlckdyb3VwcyhhRmllbGRHcm91cHNbaV0gYXMgQW5ub3RhdGlvblRlcm08RmllbGRHcm91cFR5cGU+KVxuXHRcdFx0fTtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0ZmlsdGVyRmFjZXRNYXAgPSBmaWx0ZXJGYWNldHMucmVkdWNlKChwcmV2aW91c1ZhbHVlOiBSZWNvcmQ8c3RyaW5nLCBGaWx0ZXJHcm91cD4sIGZpbHRlckZhY2V0OiBSZWZlcmVuY2VGYWNldFR5cGVzKSA9PiB7XG5cdFx0XHRmb3IgKGxldCBpID0gMDsgaSA8IChmaWx0ZXJGYWNldC5UYXJnZXQuJHRhcmdldCBhcyBGaWVsZEdyb3VwKS5EYXRhLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHByZXZpb3VzVmFsdWVbKChmaWx0ZXJGYWNldC5UYXJnZXQuJHRhcmdldCBhcyBGaWVsZEdyb3VwKS5EYXRhW2ldIGFzIERhdGFGaWVsZFR5cGVzKS5WYWx1ZS5wYXRoXSA9IHtcblx0XHRcdFx0XHRncm91cDogZmlsdGVyRmFjZXQ/LklEPy50b1N0cmluZygpLFxuXHRcdFx0XHRcdGdyb3VwTGFiZWw6IGZpbHRlckZhY2V0Py5MYWJlbD8udG9TdHJpbmcoKVxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHByZXZpb3VzVmFsdWU7XG5cdFx0fSwge30pO1xuXHR9XG5cblx0bGV0IGFTZWxlY3RPcHRpb25zOiBhbnlbXSA9IFtdO1xuXHRjb25zdCBzZWxlY3Rpb25WYXJpYW50ID0gZ2V0U2VsZWN0aW9uVmFyaWFudChlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0KTtcblx0aWYgKHNlbGVjdGlvblZhcmlhbnQpIHtcblx0XHRhU2VsZWN0T3B0aW9ucyA9IHNlbGVjdGlvblZhcmlhbnQuU2VsZWN0T3B0aW9ucztcblx0fVxuXG5cdC8vIGNyZWF0ZSBhIG1hcCBvZiBhbGwgcG90ZW50aWFsIGZpbHRlciBmaWVsZHMgYmFzZWQgb24uLi5cblx0Y29uc3QgZmlsdGVyRmllbGRzOiBSZWNvcmQ8c3RyaW5nLCBGaWx0ZXJGaWVsZD4gPSB7XG5cdFx0Ly8gLi4ubm9uIGhpZGRlbiBwcm9wZXJ0aWVzIG9mIHRoZSBlbnRpdHlcblx0XHQuLi5fZ2V0U2VsZWN0aW9uRmllbGRzKGVudGl0eVR5cGUsIFwiXCIsIGVudGl0eVR5cGUuZW50aXR5UHJvcGVydGllcywgZmFsc2UsIGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdC8vIC4uLmFkZGl0aW9uYWwgbWFuaWZlc3QgZGVmaW5lZCBuYXZpZ2F0aW9uIHByb3BlcnRpZXNcblx0XHQuLi5fZ2V0U2VsZWN0aW9uRmllbGRzQnlQYXRoKFxuXHRcdFx0ZW50aXR5VHlwZSxcblx0XHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkuZ2V0RmlsdGVyQ29uZmlndXJhdGlvbigpLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLFxuXHRcdFx0ZmFsc2UsXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0KVxuXHR9O1xuXG5cdC8vRmlsdGVycyB3aGljaCBoYXMgdG8gYmUgYWRkZWQgd2hpY2ggaXMgcGFydCBvZiBTVi9EZWZhdWx0IGFubm90YXRpb25zIGJ1dCBub3QgcHJlc2VudCBpbiB0aGUgU2VsZWN0aW9uRmllbGRzXG5cdGNvbnN0IGRlZmF1bHRGaWx0ZXJzID0gX2dldERlZmF1bHRGaWx0ZXJGaWVsZHMoZmlsdGVyRmllbGRzLCBhU2VsZWN0T3B0aW9ucywgZW50aXR5VHlwZSwgY29udmVydGVyQ29udGV4dCwgZXhjbHVkZWRGaWx0ZXJQcm9wZXJ0aWVzKTtcblx0Y29uc3QgcGFyYW1ldGVyRmllbGRzID0gX2dldFBhcmFtZXRlckZpZWxkcyhjb252ZXJ0ZXJDb250ZXh0KTtcblx0Ly8gZmluYWxseSBjcmVhdGUgZmluYWwgbGlzdCBvZiBmaWx0ZXIgZmllbGRzIGJ5IGFkZGluZyB0aGUgU2VsZWN0aW9uRmllbGRzIGZpcnN0IChvcmRlciBtYXR0ZXJzKS4uLlxuXHRsZXQgYWxsRmlsdGVycyA9IHBhcmFtZXRlckZpZWxkc1xuXHRcdC5jb25jYXQoXG5cdFx0XHRlbnRpdHlUeXBlLmFubm90YXRpb25zPy5VST8uU2VsZWN0aW9uRmllbGRzPy5yZWR1Y2UoKHNlbGVjdGlvbkZpZWxkczogRmlsdGVyRmllbGRbXSwgc2VsZWN0aW9uRmllbGQpID0+IHtcblx0XHRcdFx0Y29uc3QgcHJvcGVydHlQYXRoID0gc2VsZWN0aW9uRmllbGQudmFsdWU7XG5cdFx0XHRcdGlmICghKHByb3BlcnR5UGF0aCBpbiBleGNsdWRlZEZpbHRlclByb3BlcnRpZXMpKSB7XG5cdFx0XHRcdFx0Y29uc3QgZmlsdGVyRmllbGQ6IEZpbHRlckZpZWxkIHwgdW5kZWZpbmVkID0gX2dldEZpbHRlckZpZWxkKGZpbHRlckZpZWxkcywgcHJvcGVydHlQYXRoLCBjb252ZXJ0ZXJDb250ZXh0LCBlbnRpdHlUeXBlKTtcblx0XHRcdFx0XHRpZiAoZmlsdGVyRmllbGQpIHtcblx0XHRcdFx0XHRcdGZpbHRlckZpZWxkLmdyb3VwID0gXCJcIjtcblx0XHRcdFx0XHRcdGZpbHRlckZpZWxkLmdyb3VwTGFiZWwgPSBcIlwiO1xuXHRcdFx0XHRcdFx0c2VsZWN0aW9uRmllbGRzLnB1c2goZmlsdGVyRmllbGQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gc2VsZWN0aW9uRmllbGRzO1xuXHRcdFx0fSwgW10pIHx8IFtdXG5cdFx0KVxuXHRcdC8vIFRvIGFkZCB0aGUgRmlsdGVyRmllbGQgd2hpY2ggaXMgbm90IHBhcnQgb2YgdGhlIFNlbGVjdGlvbiBGaWVsZHMgYnV0IHRoZSBwcm9wZXJ0eSBpcyBtZW50aW9uZWQgaW4gdGhlIFNlbGVjdGlvbiBWYXJpYW50XG5cdFx0LmNvbmNhdChkZWZhdWx0RmlsdGVycyB8fCBbXSlcblx0XHQvLyAuLi5hbmQgYWRkaW5nIHJlbWFpbmluZyBmaWx0ZXIgZmllbGRzLCB0aGF0IGFyZSBub3QgdXNlZCBpbiBhIFNlbGVjdGlvblZhcmlhbnQgKG9yZGVyIGRvZXNuJ3QgbWF0dGVyKVxuXHRcdC5jb25jYXQoXG5cdFx0XHRPYmplY3Qua2V5cyhmaWx0ZXJGaWVsZHMpXG5cdFx0XHRcdC5maWx0ZXIocHJvcGVydHlQYXRoID0+ICEocHJvcGVydHlQYXRoIGluIGV4Y2x1ZGVkRmlsdGVyUHJvcGVydGllcykpXG5cdFx0XHRcdC5tYXAocHJvcGVydHlQYXRoID0+IHtcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmFzc2lnbihmaWx0ZXJGaWVsZHNbcHJvcGVydHlQYXRoXSwgZmlsdGVyRmFjZXRNYXBbcHJvcGVydHlQYXRoXSk7XG5cdFx0XHRcdH0pXG5cdFx0KTtcblx0Y29uc3Qgc0NvbnRleHRQYXRoID0gY29udmVydGVyQ29udGV4dC5nZXRDb250ZXh0UGF0aCgpO1xuXG5cdC8vaWYgYWxsIHRhYmxlcyBhcmUgYW5hbHl0aWNhbCB0YWJsZXMgXCJhZ2dyZWdhdGFibGVcIiBwcm9wZXJ0aWVzIG11c3QgYmUgZXhjbHVkZWRcblx0aWYgKGNoZWNrQWxsVGFibGVGb3JFbnRpdHlTZXRBcmVBbmFseXRpY2FsKGxyVGFibGVzLCBzQ29udGV4dFBhdGgpKSB7XG5cdFx0Ly8gQ3VycmVudGx5IGFsbCBhZ3JlZ2F0ZXMgYXJlIHJvb3QgZW50aXR5IHByb3BlcnRpZXMgKG5vIHByb3BlcnRpZXMgY29taW5nIGZyb20gbmF2aWdhdGlvbikgYW5kIGFsbFxuXHRcdC8vIHRhYmxlcyB3aXRoIHNhbWUgZW50aXR5U2V0IGdldHMgc2FtZSBhZ2dyZWFndGUgY29uZmlndXJhdGlvbiB0aGF0J3Mgd2h5IHdlIGNhbiB1c2UgZmlyc3QgdGFibGUgaW50b1xuXHRcdC8vIExSIHRvIGdldCBhZ2dyZWdhdGVzICh3aXRob3V0IGN1cnJlbmN5L3VuaXQgcHJvcGVydGllcyBzaW5jZSB3ZSBleHBlY3QgdG8gYmUgYWJsZSB0byBmaWx0ZXIgdGhlbSkuXG5cdFx0Y29uc3QgYWdncmVnYXRlcyA9IGxyVGFibGVzWzBdLmFnZ3JlZ2F0ZXM7XG5cdFx0aWYgKGFnZ3JlZ2F0ZXMpIHtcblx0XHRcdGNvbnN0IGFnZ3JlZ2F0YWJsZVByb3BlcnRpZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoYWdncmVnYXRlcykubWFwKGFnZ3JlZ2F0ZUtleSA9PiBhZ2dyZWdhdGVzW2FnZ3JlZ2F0ZUtleV0ucmVsYXRpdmVQYXRoKTtcblx0XHRcdGFsbEZpbHRlcnMgPSBhbGxGaWx0ZXJzLmZpbHRlcihmaWx0ZXJGaWVsZCA9PiB7XG5cdFx0XHRcdHJldHVybiBhZ2dyZWdhdGFibGVQcm9wZXJ0aWVzLmluZGV4T2YoZmlsdGVyRmllbGQua2V5KSA9PT0gLTE7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH1cblxuXHRjb25zdCBzZWxlY3Rpb25GaWVsZHMgPSBpbnNlcnRDdXN0b21FbGVtZW50cyhhbGxGaWx0ZXJzLCBnZXRNYW5pZmVzdEZpbHRlckZpZWxkcyhlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0KSwge1xuXHRcdFwiYXZhaWxhYmlsaXR5XCI6IFwib3ZlcndyaXRlXCIsXG5cdFx0bGFiZWw6IFwib3ZlcndyaXRlXCIsXG5cdFx0cG9zaXRpb246IFwib3ZlcndyaXRlXCIsXG5cdFx0dGVtcGxhdGU6IFwib3ZlcndyaXRlXCIsXG5cdFx0c2V0dGluZ3M6IFwib3ZlcndyaXRlXCIsXG5cdFx0dmlzdWFsRmlsdGVyOiBcIm92ZXJ3cml0ZVwiXG5cdH0pO1xuXHRyZXR1cm4gc2VsZWN0aW9uRmllbGRzO1xufTtcblxuY29uc3QgZ2V0VmlzdWFsRmlsdGVycyA9IGZ1bmN0aW9uKFxuXHRlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRzUHJvcGVydHlQYXRoOiBzdHJpbmcsXG5cdEZpbHRlckZpZWxkczogUmVjb3JkPHN0cmluZywgRmlsdGVyRmllbGRNYW5pZmVzdENvbmZpZ3VyYXRpb24+XG4pOiBWaXN1YWxGaWx0ZXJzIHwgdW5kZWZpbmVkIHtcblx0Y29uc3QgdmlzdWFsRmlsdGVyOiBWaXN1YWxGaWx0ZXJzID0ge307XG5cdGVudGl0eVR5cGUuYW5ub3RhdGlvbnM/LlVJPy5TZWxlY3Rpb25GaWVsZHM/Lm1hcCgoc2VsZWN0aW9uRmllbGQ6IGFueSkgPT4ge1xuXHRcdGlmIChzUHJvcGVydHlQYXRoID09PSBzZWxlY3Rpb25GaWVsZD8udmFsdWUpIHtcblx0XHRcdGNvbnN0IG9WaXN1YWxGaWx0ZXI6IEZpbHRlckZpZWxkTWFuaWZlc3RDb25maWd1cmF0aW9uID0gRmlsdGVyRmllbGRzW3NQcm9wZXJ0eVBhdGhdO1xuXHRcdFx0aWYgKG9WaXN1YWxGaWx0ZXIgJiYgb1Zpc3VhbEZpbHRlcj8udmlzdWFsRmlsdGVyICYmIG9WaXN1YWxGaWx0ZXI/LnZpc3VhbEZpbHRlcj8udmFsdWVMaXN0KSB7XG5cdFx0XHRcdGNvbnN0IG9WRlBhdGggPSBvVmlzdWFsRmlsdGVyPy52aXN1YWxGaWx0ZXI/LnZhbHVlTGlzdDtcblx0XHRcdFx0Y29uc3QgYW5ub3RhdGlvblF1YWxpZmllclNwbGl0ID0gb1ZGUGF0aC5zcGxpdChcIiNcIik7XG5cdFx0XHRcdGNvbnN0IHF1YWxpZmllclZMID1cblx0XHRcdFx0XHRhbm5vdGF0aW9uUXVhbGlmaWVyU3BsaXQubGVuZ3RoID4gMSA/IFwiVmFsdWVMaXN0I1wiICsgYW5ub3RhdGlvblF1YWxpZmllclNwbGl0WzFdIDogYW5ub3RhdGlvblF1YWxpZmllclNwbGl0WzBdO1xuXHRcdFx0XHRjb25zdCB2YWx1ZUxpc3Q6IGFueSA9IHNlbGVjdGlvbkZpZWxkLiR0YXJnZXQ/LmFubm90YXRpb25zPy5Db21tb25bcXVhbGlmaWVyVkxdO1xuXHRcdFx0XHRpZiAodmFsdWVMaXN0KSB7XG5cdFx0XHRcdFx0Y29uc3QgY29sbGVjdGlvblBhdGggPSB2YWx1ZUxpc3Q/LkNvbGxlY3Rpb25QYXRoO1xuXHRcdFx0XHRcdGNvbnN0IGNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0Q29udmVydGVyQ29udGV4dEZvcihcblx0XHRcdFx0XHRcdFwiL1wiICsgKGNvbGxlY3Rpb25QYXRoIHx8IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCk/Lm5hbWUpXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRjb25zdCB2YWx1ZUxpc3RQYXJhbXMgPSB2YWx1ZUxpc3Q/LlBhcmFtZXRlcnM7XG5cdFx0XHRcdFx0bGV0IG91dFBhcmFtZXRlcjogYW55O1xuXHRcdFx0XHRcdGNvbnN0IGluUGFyYW1ldGVyczogQXJyYXk8b2JqZWN0PiA9IFtdO1xuXHRcdFx0XHRcdGlmICh2YWx1ZUxpc3RQYXJhbXMpIHtcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgdmFsdWVMaXN0UGFyYW1zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IGxvY2FsRGF0YVByb3BlcnR5ID0gKHZhbHVlTGlzdFBhcmFtc1tpXSBhcyBhbnkpLkxvY2FsRGF0YVByb3BlcnR5Py52YWx1ZTtcblx0XHRcdFx0XHRcdFx0Y29uc3QgdmFsdWVMaXN0UHJvcGVydHkgPSAodmFsdWVMaXN0UGFyYW1zW2ldIGFzIGFueSkuVmFsdWVMaXN0UHJvcGVydHk7XG5cdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHQodmFsdWVMaXN0UGFyYW1zW2ldPy4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVmFsdWVMaXN0UGFyYW1ldGVySW5PdXRcIiB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWVMaXN0UGFyYW1zW2ldPy4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVmFsdWVMaXN0UGFyYW1ldGVyT3V0XCIpICYmXG5cdFx0XHRcdFx0XHRcdFx0c1Byb3BlcnR5UGF0aCA9PT0gbG9jYWxEYXRhUHJvcGVydHlcblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0b3V0UGFyYW1ldGVyID0gdmFsdWVMaXN0UGFyYW1zW2ldO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChcblx0XHRcdFx0XHRcdFx0XHQodmFsdWVMaXN0UGFyYW1zW2ldPy4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVmFsdWVMaXN0UGFyYW1ldGVySW5PdXRcIiB8fFxuXHRcdFx0XHRcdFx0XHRcdFx0dmFsdWVMaXN0UGFyYW1zW2ldPy4kVHlwZSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjEuVmFsdWVMaXN0UGFyYW1ldGVySW5cIikgJiZcblx0XHRcdFx0XHRcdFx0XHRzUHJvcGVydHlQYXRoICE9PSBsb2NhbERhdGFQcm9wZXJ0eVxuXHRcdFx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBiTm90RmlsdGVyYWJsZSA9IGlzUHJvcGVydHlGaWx0ZXJhYmxlKGNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dCwgdmFsdWVMaXN0UHJvcGVydHkpO1xuXHRcdFx0XHRcdFx0XHRcdGlmICghYk5vdEZpbHRlcmFibGUpIHtcblx0XHRcdFx0XHRcdFx0XHRcdGluUGFyYW1ldGVycy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0bG9jYWxEYXRhUHJvcGVydHk6IGxvY2FsRGF0YVByb3BlcnR5LFxuXHRcdFx0XHRcdFx0XHRcdFx0XHR2YWx1ZUxpc3RQcm9wZXJ0eTogdmFsdWVMaXN0UHJvcGVydHlcblx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiAoaW5QYXJhbWV0ZXJzICYmIGluUGFyYW1ldGVycy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdGluUGFyYW1ldGVycy5mb3JFYWNoKGZ1bmN0aW9uKG9JblBhcmFtZXRlcjogYW55KSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IG1haW5FbnRpdHlTZXRJbk1hcHBpbmdBbGxvd2VkRXhwcmVzc2lvbiA9IGNvbXBpbGVCaW5kaW5nKFxuXHRcdFx0XHRcdFx0XHRcdGNoZWNrRmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9ucyhcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmdldENvbnZlcnRlckNvbnRleHRGb3IoY29udmVydGVyQ29udGV4dC5nZXRBYnNvbHV0ZUFubm90YXRpb25QYXRoKG9JblBhcmFtZXRlcj8ubG9jYWxEYXRhUHJvcGVydHkpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0W1wiU2luZ2xlVmFsdWVcIl1cblx0XHRcdFx0XHRcdFx0XHQpXG5cdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IHZhbHVlTGlzdEVudGl0eVNldEluTWFwcGluZ0FsbG93ZWRFeHByZXNzaW9uID0gY29tcGlsZUJpbmRpbmcoXG5cdFx0XHRcdFx0XHRcdFx0Y2hlY2tGaWx0ZXJFeHByZXNzaW9uUmVzdHJpY3Rpb25zKFxuXHRcdFx0XHRcdFx0XHRcdFx0Y29sbGVjdGlvblBhdGhDb252ZXJ0ZXJDb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdC5nZXRDb252ZXJ0ZXJDb250ZXh0Rm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dC5nZXRBYnNvbHV0ZUFubm90YXRpb25QYXRoKG9JblBhcmFtZXRlcj8udmFsdWVMaXN0UHJvcGVydHkpXG5cdFx0XHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHRcdFx0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKSxcblx0XHRcdFx0XHRcdFx0XHRcdFtcIlNpbmdsZVZhbHVlXCJdXG5cdFx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRcdFx0dmFsdWVMaXN0RW50aXR5U2V0SW5NYXBwaW5nQWxsb3dlZEV4cHJlc3Npb24gPT09IFwidHJ1ZVwiICYmXG5cdFx0XHRcdFx0XHRcdFx0bWFpbkVudGl0eVNldEluTWFwcGluZ0FsbG93ZWRFeHByZXNzaW9uID09PSBcImZhbHNlXCJcblx0XHRcdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcdFx0XCJGaWx0ZXJSZXN0cmljdGlvbnMgb2YgXCIgKyBzUHJvcGVydHlQYXRoICsgXCIgaW4gTWFpbkVudGl0eVNldCBhbmQgVmFsdWVMaXN0RW50aXR5U2V0IGFyZSBkaWZmZXJlbnRcIlxuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRjb25zdCBwdlF1YWxpZmllciA9IHZhbHVlTGlzdD8uUHJlc2VudGF0aW9uVmFyaWFudFF1YWxpZmllcjtcblx0XHRcdFx0XHRjb25zdCBzdlF1YWxpZmllciA9IHZhbHVlTGlzdD8uU2VsZWN0aW9uVmFyaWFudFF1YWxpZmllcjtcblx0XHRcdFx0XHRjb25zdCBwdkFubm90YXRpb246IGFueSA9IGNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dD8uZ2V0RW50aXR5VHlwZUFubm90YXRpb24oXG5cdFx0XHRcdFx0XHRcIkBVSS5QcmVzZW50YXRpb25WYXJpYW50I1wiICsgcHZRdWFsaWZpZXJcblx0XHRcdFx0XHQpPy5hbm5vdGF0aW9uO1xuXHRcdFx0XHRcdGNvbnN0IGFnZ3JlZ2F0aW9uSGVscGVyID0gbmV3IEFnZ3JlZ2F0aW9uSGVscGVyKFxuXHRcdFx0XHRcdFx0Y29sbGVjdGlvblBhdGhDb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKSxcblx0XHRcdFx0XHRcdGNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKCFhZ2dyZWdhdGlvbkhlbHBlci5pc0FuYWx5dGljc1N1cHBvcnRlZCgpKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm47XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmIChwdkFubm90YXRpb24pIHtcblx0XHRcdFx0XHRcdGNvbnN0IGFWaXN1YWxpemF0aW9ucyA9IHB2QW5ub3RhdGlvbj8uVmlzdWFsaXphdGlvbnM7XG5cdFx0XHRcdFx0XHRjb25zdCBjb250ZXh0UGF0aCA9IFwiL1wiICsgY29sbGVjdGlvblBhdGhDb252ZXJ0ZXJDb250ZXh0Py5nZXRFbnRpdHlTZXQoKT8ubmFtZTtcblx0XHRcdFx0XHRcdHZpc3VhbEZpbHRlci5jb250ZXh0UGF0aCA9IGNvbnRleHRQYXRoO1xuXHRcdFx0XHRcdFx0bGV0IGNoYXJ0QW5ub3RhdGlvbjtcblx0XHRcdFx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYVZpc3VhbGl6YXRpb25zLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGlmIChhVmlzdWFsaXphdGlvbnNbaV0uJHRhcmdldD8udGVybSA9PT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5DaGFydFwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2hhcnRBbm5vdGF0aW9uID0gYVZpc3VhbGl6YXRpb25zW2ldO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoY2hhcnRBbm5vdGF0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdGNvbnN0IF9iZ2V0VkZBZ2dyZWdhdGlvbjogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IF9jaGVja1ZGQWdncmVnYXRpb24oXG5cdFx0XHRcdFx0XHRcdFx0Y29sbGVjdGlvblBhdGhDb252ZXJ0ZXJDb250ZXh0LFxuXHRcdFx0XHRcdFx0XHRcdGNoYXJ0QW5ub3RhdGlvbixcblx0XHRcdFx0XHRcdFx0XHRhZ2dyZWdhdGlvbkhlbHBlclxuXHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoIV9iZ2V0VkZBZ2dyZWdhdGlvbikge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRjb25zdCBiRGltZW5zaW9uSGlkZGVuOiBib29sZWFuID0gY2hhcnRBbm5vdGF0aW9uPy4kdGFyZ2V0Py5EaW1lbnNpb25zWzBdPy4kdGFyZ2V0Py5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpO1xuXHRcdFx0XHRcdFx0XHRjb25zdCBiRGltZW5zaW9uSGlkZGVuRmlsdGVyOiBib29sZWFuID0gY2hhcnRBbm5vdGF0aW9uPy4kdGFyZ2V0Py5EaW1lbnNpb25zWzBdPy4kdGFyZ2V0Py5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbkZpbHRlcj8udmFsdWVPZigpO1xuXHRcdFx0XHRcdFx0XHRpZiAoYkRpbWVuc2lvbkhpZGRlbiA9PT0gdHJ1ZSB8fCBiRGltZW5zaW9uSGlkZGVuRmlsdGVyID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChhVmlzdWFsaXphdGlvbnMgJiYgYVZpc3VhbGl6YXRpb25zLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0dmlzdWFsRmlsdGVyLmNoYXJ0QW5ub3RhdGlvbiA9IGNoYXJ0QW5ub3RhdGlvblxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ/IGNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dD8uZ2V0QWJzb2x1dGVBbm5vdGF0aW9uUGF0aChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGNoYXJ0QW5ub3RhdGlvbi5mdWxseVF1YWxpZmllZE5hbWUgKyBcIi8kQW5ub3RhdGlvblBhdGgvXCJcblx0XHRcdFx0XHRcdFx0XHRcdFx0ICApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdDogdW5kZWZpbmVkO1xuXHRcdFx0XHRcdFx0XHRcdFx0dmlzdWFsRmlsdGVyLnByZXNlbnRhdGlvbkFubm90YXRpb24gPSBwdkFubm90YXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0PyBjb2xsZWN0aW9uUGF0aENvbnZlcnRlckNvbnRleHQ/LmdldEFic29sdXRlQW5ub3RhdGlvblBhdGgocHZBbm5vdGF0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSArIFwiL1wiKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IHVuZGVmaW5lZDtcblx0XHRcdFx0XHRcdFx0XHRcdHZpc3VhbEZpbHRlci52aXN1YWxGaWx0ZXJJZCA9IFZpc3VhbEZpbHRlcklEKGNoYXJ0QW5ub3RhdGlvbj8uJHRhcmdldD8uRGltZW5zaW9uc1swXT8udmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0dmlzdWFsRmlsdGVyLm91dFBhcmFtZXRlciA9IG91dFBhcmFtZXRlcj8uTG9jYWxEYXRhUHJvcGVydHk/LnZhbHVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0dmlzdWFsRmlsdGVyLmluUGFyYW1ldGVycyA9IGluUGFyYW1ldGVycztcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGJJc1JhbmdlID0gY2hlY2tGaWx0ZXJFeHByZXNzaW9uUmVzdHJpY3Rpb25zKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0LmdldENvbnZlcnRlckNvbnRleHRGb3IoY29udmVydGVyQ29udGV4dC5nZXRBYnNvbHV0ZUFubm90YXRpb25QYXRoKHNQcm9wZXJ0eVBhdGgpKVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5nZXREYXRhTW9kZWxPYmplY3RQYXRoKCksXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFtcIlNpbmdsZVJhbmdlXCIsIFwiTXVsdGlSYW5nZVwiXVxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKGNvbXBpbGVCaW5kaW5nKGJJc1JhbmdlKSA9PT0gXCJ0cnVlXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiUmFuZ2UgQWxsb3dlZEV4cHJlc3Npb24gaXMgbm90IHN1cHBvcnRlZCBmb3IgdmlzdWFsIGZpbHRlcnNcIik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdFx0XHRcdGNvbnN0IGJJc01haW5FbnRpdHlTZXRTaW5nbGVTZWxlY3Rpb246IGFueSA9IGNoZWNrRmlsdGVyRXhwcmVzc2lvblJlc3RyaWN0aW9ucyhcblx0XHRcdFx0XHRcdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdC5nZXRDb252ZXJ0ZXJDb250ZXh0Rm9yKGNvbnZlcnRlckNvbnRleHQuZ2V0QWJzb2x1dGVBbm5vdGF0aW9uUGF0aChzUHJvcGVydHlQYXRoKSlcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRbXCJTaW5nbGVWYWx1ZVwiXVxuXHRcdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRcdHZpc3VhbEZpbHRlci5tdWx0aXBsZVNlbGVjdGlvbkFsbG93ZWQgPSBjb21waWxlQmluZGluZyghYklzTWFpbkVudGl0eVNldFNpbmdsZVNlbGVjdGlvbi52YWx1ZSkgYXMgYW55O1xuXHRcdFx0XHRcdFx0XHRcdFx0dmlzdWFsRmlsdGVyLnJlcXVpcmVkID0gZ2V0SXNSZXF1aXJlZChjb252ZXJ0ZXJDb250ZXh0LCBzUHJvcGVydHlQYXRoKTtcblx0XHRcdFx0XHRcdFx0XHRcdGxldCBzdkFubm90YXRpb246IGFueTtcblx0XHRcdFx0XHRcdFx0XHRcdGlmIChzdlF1YWxpZmllcikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRzdkFubm90YXRpb24gPSBjb2xsZWN0aW9uUGF0aENvbnZlcnRlckNvbnRleHQ/LmdldEVudGl0eVR5cGVBbm5vdGF0aW9uKFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFwiQFVJLlNlbGVjdGlvblZhcmlhbnQjXCIgKyBzdlF1YWxpZmllclxuXHRcdFx0XHRcdFx0XHRcdFx0XHQpPy5hbm5vdGF0aW9uO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2aXN1YWxGaWx0ZXIuc2VsZWN0aW9uVmFyaWFudEFubm90YXRpb24gPSBzdkFubm90YXRpb25cblx0XHRcdFx0XHRcdFx0XHRcdFx0XHQ/IGNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dD8uZ2V0QWJzb2x1dGVBbm5vdGF0aW9uUGF0aChcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c3ZBbm5vdGF0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSArIFwiL1wiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ICApXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0OiB1bmRlZmluZWQ7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCBlbnRpdHlTZXRBbm5vdGF0aW9ucyA9IGNvbGxlY3Rpb25QYXRoQ29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKT8uYW5ub3RhdGlvbnM7XG5cdFx0XHRcdFx0XHRcdFx0XHRsZXQgcmVxdWlyZWRQcm9wZXJ0eVBhdGhzOiBBcnJheTxvYmplY3Q+ID0gW107XG5cdFx0XHRcdFx0XHRcdFx0XHRjb25zdCByZXF1aXJlZFByb3BlcnRpZXMgPSBlbnRpdHlTZXRBbm5vdGF0aW9ucz8uQ2FwYWJpbGl0aWVzPy5GaWx0ZXJSZXN0cmljdGlvbnNcblx0XHRcdFx0XHRcdFx0XHRcdFx0Py5SZXF1aXJlZFByb3BlcnRpZXMgYXMgYW55W107XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAocmVxdWlyZWRQcm9wZXJ0aWVzPy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVxdWlyZWRQcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24ob1JlcXVpcmVQcm9wZXJ0eTogYW55KSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVxdWlyZWRQcm9wZXJ0eVBhdGhzLnB1c2gob1JlcXVpcmVQcm9wZXJ0eS52YWx1ZSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0dmlzdWFsRmlsdGVyLnJlcXVpcmVkUHJvcGVydGllcyA9IHJlcXVpcmVkUHJvcGVydHlQYXRocztcblx0XHRcdFx0XHRcdFx0XHRcdGlmICh2aXN1YWxGaWx0ZXIucmVxdWlyZWRQcm9wZXJ0aWVzPy5sZW5ndGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKCF2aXN1YWxGaWx0ZXIuaW5QYXJhbWV0ZXJzIHx8ICF2aXN1YWxGaWx0ZXIuaW5QYXJhbWV0ZXJzLmxlbmd0aCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghdmlzdWFsRmlsdGVyLnNlbGVjdGlvblZhcmlhbnRBbm5vdGF0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR2aXN1YWxGaWx0ZXIuc2hvd092ZXJsYXlJbml0aWFsbHkgPSB0cnVlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRsZXQgc2VsZWN0T3B0aW9uczogYW55W10gPSBbXTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdHN2QW5ub3RhdGlvbj8uU2VsZWN0T3B0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uKG9TZWxlY3RPcHRpb246IGFueSkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRzZWxlY3RPcHRpb25zLnB1c2gob1NlbGVjdE9wdGlvbi5Qcm9wZXJ0eU5hbWUudmFsdWUpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRyZXF1aXJlZFByb3BlcnR5UGF0aHMgPSByZXF1aXJlZFByb3BlcnR5UGF0aHMuc29ydCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0c2VsZWN0T3B0aW9ucyA9IHNlbGVjdE9wdGlvbnMuc29ydCgpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dmlzdWFsRmlsdGVyLnNob3dPdmVybGF5SW5pdGlhbGx5ID0gcmVxdWlyZWRQcm9wZXJ0eVBhdGhzLnNvbWUoZnVuY3Rpb24oc1BhdGgpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmV0dXJuIHNlbGVjdE9wdGlvbnMuaW5kZXhPZihzUGF0aCkgPT09IC0xO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHZpc3VhbEZpbHRlci5zaG93T3ZlcmxheUluaXRpYWxseSA9IGZhbHNlO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR2aXN1YWxGaWx0ZXIuc2hvd092ZXJsYXlJbml0aWFsbHkgPSBmYWxzZTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHQuZ2V0RGlhZ25vc3RpY3MoKVxuXHRcdFx0XHRcdFx0XHRcdC5hZGRJc3N1ZShJc3N1ZUNhdGVnb3J5LkFubm90YXRpb24sIElzc3VlU2V2ZXJpdHkuSGlnaCwgSXNzdWVUeXBlLk1BTEZPUk1FRF9WSVNVQUxGSUxURVJTLkNIQVJUKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHRcdFx0XHQuZ2V0RGlhZ25vc3RpY3MoKVxuXHRcdFx0XHRcdFx0XHQuYWRkSXNzdWUoSXNzdWVDYXRlZ29yeS5Bbm5vdGF0aW9uLCBJc3N1ZVNldmVyaXR5LkhpZ2gsIElzc3VlVHlwZS5NQUxGT1JNRURfVklTVUFMRklMVEVSUy5QUkVTRU5UQVRJT05WQVJJQU5UKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHRcdFx0LmdldERpYWdub3N0aWNzKClcblx0XHRcdFx0XHRcdC5hZGRJc3N1ZShJc3N1ZUNhdGVnb3J5LkFubm90YXRpb24sIElzc3VlU2V2ZXJpdHkuSGlnaCwgSXNzdWVUeXBlLk1BTEZPUk1FRF9WSVNVQUxGSUxURVJTLlZBTFVFTElTVCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdFx0XHQuZ2V0RGlhZ25vc3RpY3MoKVxuXHRcdFx0XHRcdC5hZGRJc3N1ZShJc3N1ZUNhdGVnb3J5Lk1hbmlmZXN0LCBJc3N1ZVNldmVyaXR5LkhpZ2gsIElzc3VlVHlwZS5NQUxGT1JNRURfVklTVUFMRklMVEVSUy5WQUxVRUxJU1QpO1xuXHRcdFx0fVxuXHRcdH1cblx0fSk7XG5cdGlmIChPYmplY3Qua2V5cyh2aXN1YWxGaWx0ZXIpLmxlbmd0aCA+IDEpIHtcblx0XHRyZXR1cm4gdmlzdWFsRmlsdGVyO1xuXHR9XG59O1xuXG4vKipcbiAqIENoZWNrcyB0aGF0IG1lYXN1cmVzIGFuZCBkaW1lbnNpb25zIG9mIHRoZSB2aXN1YWwgZmlsdGVyIGNoYXJ0IGNhbiBiZSBhZ2dyZWdhdGVkIGFuZCBncm91cGVkLlxuICogQHBhcmFtIGNvbnZlcnRlckNvbnRleHQgVGhlIGNvbnZlcnRlciBjb250ZXh0XG4gKiBAcGFyYW0gY2hhcnRBbm5vdGF0aW9uIFRoZSBjaGFydCBhbm5vdGF0aW9uXG4gKiBAcGFyYW0gYWdncmVnYXRpb25IZWxwZXIgVGhlIGFnZ3JlZ2F0aW9uIGhlbHBlclxuICogQHJldHVybnMge2Jvb2xlYW4gfCB1bmRlZmluZWQgfVxuICovXG5cbmNvbnN0IF9jaGVja1ZGQWdncmVnYXRpb24gPSBmdW5jdGlvbihcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0Y2hhcnRBbm5vdGF0aW9uOiBhbnksXG5cdGFnZ3JlZ2F0aW9uSGVscGVyOiBhbnlcbik6IGJvb2xlYW4gfCB1bmRlZmluZWQge1xuXHRsZXQgc01lYXN1cmVQYXRoLCBiR3JvdXBhYmxlLCBiQWdncmVnYXRhYmxlO1xuXHRjb25zdCBzTWVhc3VyZTogc3RyaW5nID0gY2hhcnRBbm5vdGF0aW9uPy4kdGFyZ2V0Py5NZWFzdXJlc1swXT8udmFsdWU7XG5cdGNvbnN0IHNEaW1lbnNpb246IHN0cmluZyA9IGNoYXJ0QW5ub3RhdGlvbj8uJHRhcmdldD8uRGltZW5zaW9uc1swXT8udmFsdWU7XG5cdGNvbnN0IGN1c3RvbUFnZ3JlZ2F0ZXMgPSBhZ2dyZWdhdGlvbkhlbHBlci5nZXRDdXN0b21BZ2dyZWdhdGVEZWZpbml0aW9ucygpO1xuXHRjb25zdCBhVHJhbnNBZ2dyZWdhdGlvbnMgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEFubm90YXRpb25zQnlUZXJtKFxuXHRcdFwiQW5hbHl0aWNzXCIsXG5cdFx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5BbmFseXRpY3MudjEuQWdncmVnYXRlZFByb3BlcnRpZXNcIixcblx0XHRbY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlDb250YWluZXIoKSwgY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCldXG5cdCk7XG5cdGlmIChjdXN0b21BZ2dyZWdhdGVzW3NNZWFzdXJlXSkge1xuXHRcdHNNZWFzdXJlUGF0aCA9IHNNZWFzdXJlO1xuXHR9IGVsc2UgaWYgKGFUcmFuc0FnZ3JlZ2F0aW9ucyAmJiBhVHJhbnNBZ2dyZWdhdGlvbnNbMF0pIHtcblx0XHRjb25zdCBhQWdncmVnYXRpb25zID0gYVRyYW5zQWdncmVnYXRpb25zWzBdO1xuXHRcdGFBZ2dyZWdhdGlvbnMuc29tZShmdW5jdGlvbihvQWdncmVnYXRlOiBhbnkpIHtcblx0XHRcdGlmIChvQWdncmVnYXRlLk5hbWUgPT09IHNNZWFzdXJlKSB7XG5cdFx0XHRcdHNNZWFzdXJlUGF0aCA9IG9BZ2dyZWdhdGU/LkFnZ3JlZ2F0YWJsZVByb3BlcnR5LnZhbHVlO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cdGNvbnN0IGFBZ2dyZWdhdGFibGVQcm9wc0Zyb21Db250YWluZXIgPSAoY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKT8uYW5ub3RhdGlvbnM/LkFnZ3JlZ2F0aW9uPy5BcHBseVN1cHBvcnRlZFxuXHRcdD8uQWdncmVnYXRhYmxlUHJvcGVydGllcyB8fCBbXSkgYXMgYW55W107XG5cdGNvbnN0IGFHcm91cGFibGVQcm9wc0Zyb21Db250YWluZXIgPSAoY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKT8uYW5ub3RhdGlvbnM/LkFnZ3JlZ2F0aW9uPy5BcHBseVN1cHBvcnRlZD8uR3JvdXBhYmxlUHJvcGVydGllcyB8fFxuXHRcdFtdKSBhcyBhbnlbXTtcblx0aWYgKGFBZ2dyZWdhdGFibGVQcm9wc0Zyb21Db250YWluZXIgJiYgYUFnZ3JlZ2F0YWJsZVByb3BzRnJvbUNvbnRhaW5lci5sZW5ndGgpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFBZ2dyZWdhdGFibGVQcm9wc0Zyb21Db250YWluZXIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChhQWdncmVnYXRhYmxlUHJvcHNGcm9tQ29udGFpbmVyW2ldPy5Qcm9wZXJ0eT8udmFsdWUgPT09IHNNZWFzdXJlUGF0aCkge1xuXHRcdFx0XHRiQWdncmVnYXRhYmxlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0aWYgKGFHcm91cGFibGVQcm9wc0Zyb21Db250YWluZXIgJiYgYUdyb3VwYWJsZVByb3BzRnJvbUNvbnRhaW5lci5sZW5ndGgpIHtcblx0XHRmb3IgKGxldCBpID0gMDsgaSA8IGFHcm91cGFibGVQcm9wc0Zyb21Db250YWluZXIubGVuZ3RoOyBpKyspIHtcblx0XHRcdGlmIChhR3JvdXBhYmxlUHJvcHNGcm9tQ29udGFpbmVyW2ldPy52YWx1ZSA9PT0gc0RpbWVuc2lvbikge1xuXHRcdFx0XHRiR3JvdXBhYmxlID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmV0dXJuIGJBZ2dyZWdhdGFibGUgJiYgYkdyb3VwYWJsZTtcbn07XG5cbmNvbnN0IF9nZXREZWZhdWx0RmlsdGVyRmllbGRzID0gZnVuY3Rpb24oXG5cdGZpbHRlckZpZWxkczogUmVjb3JkPHN0cmluZywgRmlsdGVyRmllbGQ+LFxuXHRhU2VsZWN0T3B0aW9uczogYW55W10sXG5cdGVudGl0eVR5cGU6IEVudGl0eVR5cGUsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGV4Y2x1ZGVkRmlsdGVyUHJvcGVydGllczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj5cbik6IEZpbHRlckZpZWxkW10ge1xuXHRjb25zdCBzZWxlY3Rpb25GaWVsZHM6IEZpbHRlckZpZWxkW10gPSBbXTtcblx0Y29uc3QgVUlTZWxlY3Rpb25GaWVsZHM6IGFueSA9IHt9O1xuXHRjb25zdCBwcm9wZXJ0aWVzID0gZW50aXR5VHlwZS5lbnRpdHlQcm9wZXJ0aWVzO1xuXHQvLyBVc2luZyBlbnRpdHlUeXBlIGluc3RlYWQgb2YgZW50aXR5U2V0XG5cdGVudGl0eVR5cGUuYW5ub3RhdGlvbnM/LlVJPy5TZWxlY3Rpb25GaWVsZHM/LmZvckVhY2goU2VsZWN0aW9uRmllbGQgPT4ge1xuXHRcdFVJU2VsZWN0aW9uRmllbGRzW1NlbGVjdGlvbkZpZWxkLnZhbHVlXSA9IHRydWU7XG5cdH0pO1xuXHRpZiAoYVNlbGVjdE9wdGlvbnMgJiYgYVNlbGVjdE9wdGlvbnMubGVuZ3RoID4gMCkge1xuXHRcdGFTZWxlY3RPcHRpb25zPy5mb3JFYWNoKChzZWxlY3RPcHRpb246IFNlbGVjdE9wdGlvblR5cGUpID0+IHtcblx0XHRcdGNvbnN0IHByb3BlcnR5TmFtZTogYW55ID0gc2VsZWN0T3B0aW9uLlByb3BlcnR5TmFtZTtcblx0XHRcdGNvbnN0IHNQcm9wZXJ0eVBhdGg6IHN0cmluZyA9IHByb3BlcnR5TmFtZS52YWx1ZTtcblx0XHRcdGNvbnN0IFVJU2VsZWN0aW9uRmllbGRzOiBhbnkgPSB7fTtcblx0XHRcdGVudGl0eVR5cGUuYW5ub3RhdGlvbnM/LlVJPy5TZWxlY3Rpb25GaWVsZHM/LmZvckVhY2goU2VsZWN0aW9uRmllbGQgPT4ge1xuXHRcdFx0XHRVSVNlbGVjdGlvbkZpZWxkc1tTZWxlY3Rpb25GaWVsZC52YWx1ZV0gPSB0cnVlO1xuXHRcdFx0fSk7XG5cdFx0XHRpZiAoIShzUHJvcGVydHlQYXRoIGluIGV4Y2x1ZGVkRmlsdGVyUHJvcGVydGllcykpIHtcblx0XHRcdFx0aWYgKCEoc1Byb3BlcnR5UGF0aCBpbiBVSVNlbGVjdGlvbkZpZWxkcykpIHtcblx0XHRcdFx0XHRjb25zdCBGaWx0ZXJGaWVsZDogRmlsdGVyRmllbGQgfCB1bmRlZmluZWQgPSBfZ2V0RmlsdGVyRmllbGQoZmlsdGVyRmllbGRzLCBzUHJvcGVydHlQYXRoLCBjb252ZXJ0ZXJDb250ZXh0LCBlbnRpdHlUeXBlKTtcblx0XHRcdFx0XHRpZiAoRmlsdGVyRmllbGQpIHtcblx0XHRcdFx0XHRcdHNlbGVjdGlvbkZpZWxkcy5wdXNoKEZpbHRlckZpZWxkKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSBlbHNlIGlmIChwcm9wZXJ0aWVzKSB7XG5cdFx0cHJvcGVydGllcy5mb3JFYWNoKChwcm9wZXJ0eTogUHJvcGVydHkpID0+IHtcblx0XHRcdGNvbnN0IGRlZmF1bHRGaWx0ZXJWYWx1ZSA9IHByb3BlcnR5LmFubm90YXRpb25zPy5Db21tb24/LkZpbHRlckRlZmF1bHRWYWx1ZTtcblx0XHRcdGNvbnN0IFByb3BlcnR5UGF0aCA9IHByb3BlcnR5Lm5hbWU7XG5cdFx0XHRpZiAoIShQcm9wZXJ0eVBhdGggaW4gZXhjbHVkZWRGaWx0ZXJQcm9wZXJ0aWVzKSkge1xuXHRcdFx0XHRpZiAoZGVmYXVsdEZpbHRlclZhbHVlICYmICEoUHJvcGVydHlQYXRoIGluIFVJU2VsZWN0aW9uRmllbGRzKSkge1xuXHRcdFx0XHRcdGNvbnN0IEZpbHRlckZpZWxkOiBGaWx0ZXJGaWVsZCB8IHVuZGVmaW5lZCA9IF9nZXRGaWx0ZXJGaWVsZChmaWx0ZXJGaWVsZHMsIFByb3BlcnR5UGF0aCwgY29udmVydGVyQ29udGV4dCwgZW50aXR5VHlwZSk7XG5cdFx0XHRcdFx0aWYgKEZpbHRlckZpZWxkKSB7XG5cdFx0XHRcdFx0XHRzZWxlY3Rpb25GaWVsZHMucHVzaChGaWx0ZXJGaWVsZCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIHNlbGVjdGlvbkZpZWxkcztcbn07XG5cbmNvbnN0IF9nZXRGaWx0ZXJGaWVsZCA9IGZ1bmN0aW9uKFxuXHRmaWx0ZXJGaWVsZHM6IFJlY29yZDxzdHJpbmcsIEZpbHRlckZpZWxkPixcblx0cHJvcGVydHlQYXRoOiBzdHJpbmcsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdGVudGl0eVR5cGU6IEVudGl0eVR5cGVcbik6IEZpbHRlckZpZWxkIHwgdW5kZWZpbmVkIHtcblx0bGV0IGZpbHRlckZpZWxkOiBGaWx0ZXJGaWVsZCB8IHVuZGVmaW5lZCA9IGZpbHRlckZpZWxkc1twcm9wZXJ0eVBhdGhdO1xuXHRpZiAoZmlsdGVyRmllbGQpIHtcblx0XHRkZWxldGUgZmlsdGVyRmllbGRzW3Byb3BlcnR5UGF0aF07XG5cdH0gZWxzZSB7XG5cdFx0ZmlsdGVyRmllbGQgPSBfY3JlYXRlRmlsdGVyU2VsZWN0aW9uRmllbGQoZW50aXR5VHlwZSwgZW50aXR5VHlwZS5yZXNvbHZlUGF0aChwcm9wZXJ0eVBhdGgpLCBwcm9wZXJ0eVBhdGgsIHRydWUsIGNvbnZlcnRlckNvbnRleHQpO1xuXHR9XG5cdGlmICghZmlsdGVyRmllbGQpIHtcblx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldERpYWdub3N0aWNzKCkuYWRkSXNzdWUoSXNzdWVDYXRlZ29yeS5Bbm5vdGF0aW9uLCBJc3N1ZVNldmVyaXR5LkhpZ2gsIElzc3VlVHlwZS5NSVNTSU5HX1NFTEVDVElPTkZJRUxEKTtcblx0fVxuXHQvLyBkZWZpbmVkIFNlbGVjdGlvbkZpZWxkcyBhcmUgYXZhaWxhYmxlIGJ5IGRlZmF1bHRcblx0aWYgKGZpbHRlckZpZWxkKSB7XG5cdFx0ZmlsdGVyRmllbGQuYXZhaWxhYmlsaXR5ID0gQXZhaWxhYmlsaXR5VHlwZS5EZWZhdWx0O1xuXHRcdGZpbHRlckZpZWxkLmlzUGFyYW1ldGVyID0gISFlbnRpdHlUeXBlLmFubm90YXRpb25zPy5Db21tb24/LlJlc3VsdENvbnRleHQ7XG5cdH1cblx0cmV0dXJuIGZpbHRlckZpZWxkO1xufTtcblxuY29uc3QgZ2V0RGVmYXVsdFNlbWFudGljRGF0ZXMgPSBmdW5jdGlvbihmaWx0ZXJGaWVsZHM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUVsZW1lbnRGaWx0ZXJGaWVsZD4pOiBSZWNvcmQ8c3RyaW5nLCBEZWZhdWx0U2VtYW50aWNEYXRlPiB7XG5cdGNvbnN0IGRlZmF1bHRTZW1hbnRpY0RhdGVzOiBhbnkgPSB7fTtcblx0Zm9yIChjb25zdCBmaWx0ZXJGaWVsZCBpbiBmaWx0ZXJGaWVsZHMpIHtcblx0XHRpZiAoZmlsdGVyRmllbGRzW2ZpbHRlckZpZWxkXT8uc2V0dGluZ3M/LmRlZmF1bHRWYWx1ZXM/Lmxlbmd0aCkge1xuXHRcdFx0ZGVmYXVsdFNlbWFudGljRGF0ZXNbZmlsdGVyRmllbGRdID0gZmlsdGVyRmllbGRzW2ZpbHRlckZpZWxkXT8uc2V0dGluZ3M/LmRlZmF1bHRWYWx1ZXM7XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkZWZhdWx0U2VtYW50aWNEYXRlcztcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJGaWVsZCA9IGZ1bmN0aW9uKHByb3BlcnR5UGF0aDogc3RyaW5nLCBjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LCBlbnRpdHlUeXBlOiBFbnRpdHlUeXBlKSB7XG5cdHJldHVybiBfZ2V0RmlsdGVyRmllbGQoe30sIHByb3BlcnR5UGF0aCwgY29udmVydGVyQ29udGV4dCwgZW50aXR5VHlwZSk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyBmaWx0ZXIgZmllbGRzIGZyb20gdGhlIG1hbmlmZXN0LlxuICpcbiAqIEBwYXJhbSBlbnRpdHlUeXBlIFRoZSBjdXJyZW50IGVudGl0eVR5cGVcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHJldHVybnMge1JlY29yZDxzdHJpbmcsIEN1c3RvbUVsZW1lbnRGaWx0ZXJGaWVsZD59IFRoZSBmaWx0ZXIgZmllbGRzIGRlZmluZWQgaW4gdGhlIG1hbmlmZXN0XG4gKi9cbmNvbnN0IGdldE1hbmlmZXN0RmlsdGVyRmllbGRzID0gZnVuY3Rpb24oXG5cdGVudGl0eVR5cGU6IEVudGl0eVR5cGUsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUVsZW1lbnRGaWx0ZXJGaWVsZD4ge1xuXHRjb25zdCBmYkNvbmZpZzogRmlsdGVyTWFuaWZlc3RDb25maWd1cmF0aW9uID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5nZXRGaWx0ZXJDb25maWd1cmF0aW9uKCk7XG5cdGNvbnN0IGRlZmluZWRGaWx0ZXJGaWVsZHM6IFJlY29yZDxzdHJpbmcsIEZpbHRlckZpZWxkTWFuaWZlc3RDb25maWd1cmF0aW9uPiA9IGZiQ29uZmlnPy5maWx0ZXJGaWVsZHMgfHwge307XG5cdGNvbnN0IHNlbGVjdGlvbkZpZWxkczogUmVjb3JkPHN0cmluZywgRmlsdGVyRmllbGQ+ID0gX2dldFNlbGVjdGlvbkZpZWxkc0J5UGF0aChcblx0XHRlbnRpdHlUeXBlLFxuXHRcdE9iamVjdC5rZXlzKGRlZmluZWRGaWx0ZXJGaWVsZHMpLm1hcChrZXkgPT4gS2V5SGVscGVyLmdldFBhdGhGcm9tU2VsZWN0aW9uRmllbGRLZXkoa2V5KSksXG5cdFx0dHJ1ZSxcblx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdCk7XG5cdGNvbnN0IGZpbHRlckZpZWxkczogUmVjb3JkPHN0cmluZywgQ3VzdG9tRWxlbWVudEZpbHRlckZpZWxkPiA9IHt9O1xuXG5cdGZvciAoY29uc3Qgc0tleSBpbiBkZWZpbmVkRmlsdGVyRmllbGRzKSB7XG5cdFx0Y29uc3QgZmlsdGVyRmllbGQgPSBkZWZpbmVkRmlsdGVyRmllbGRzW3NLZXldO1xuXHRcdGNvbnN0IHByb3BlcnR5TmFtZSA9IEtleUhlbHBlci5nZXRQYXRoRnJvbVNlbGVjdGlvbkZpZWxkS2V5KHNLZXkpO1xuXHRcdGNvbnN0IHNlbGVjdGlvbkZpZWxkID0gc2VsZWN0aW9uRmllbGRzW3Byb3BlcnR5TmFtZV07XG5cdFx0Y29uc3QgdmlzdWFsRmlsdGVyID0gZ2V0VmlzdWFsRmlsdGVycyhlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0LCBzS2V5LCBkZWZpbmVkRmlsdGVyRmllbGRzKTtcblx0XHRmaWx0ZXJGaWVsZHNbc0tleV0gPSB7XG5cdFx0XHRrZXk6IHNLZXksXG5cdFx0XHRhbm5vdGF0aW9uUGF0aDogc2VsZWN0aW9uRmllbGQ/LmFubm90YXRpb25QYXRoLFxuXHRcdFx0Y29uZGl0aW9uUGF0aDogc2VsZWN0aW9uRmllbGQ/LmNvbmRpdGlvblBhdGggfHwgcHJvcGVydHlOYW1lLFxuXHRcdFx0dGVtcGxhdGU6IGZpbHRlckZpZWxkLnRlbXBsYXRlLFxuXHRcdFx0bGFiZWw6IGZpbHRlckZpZWxkLmxhYmVsLFxuXHRcdFx0cG9zaXRpb246IGZpbHRlckZpZWxkLnBvc2l0aW9uIHx8IHsgcGxhY2VtZW50OiBQbGFjZW1lbnQuQWZ0ZXIgfSxcblx0XHRcdGF2YWlsYWJpbGl0eTogZmlsdGVyRmllbGQuYXZhaWxhYmlsaXR5IHx8IEF2YWlsYWJpbGl0eVR5cGUuRGVmYXVsdCxcblx0XHRcdHNldHRpbmdzOiBmaWx0ZXJGaWVsZC5zZXR0aW5ncyxcblx0XHRcdHZpc3VhbEZpbHRlcjogdmlzdWFsRmlsdGVyXG5cdFx0fTtcblx0fVxuXHRyZXR1cm4gZmlsdGVyRmllbGRzO1xufTtcblxuLyoqXG4gKiBGaW5kIGEgdmlzdWFsaXphdGlvbiBhbm5vdGF0aW9uIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHJlbmRlcmluZyB0aGUgbGlzdCByZXBvcnQuXG4gKlxuICogQHBhcmFtIHtFbnRpdHlUeXBlfSBlbnRpdHlUeXBlIFRoZSBjdXJyZW50IEVudGl0eVR5cGVcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0XG4gKiBAcGFyYW0gYklzQUxQXG4gKiBAcmV0dXJucyB7TGluZUl0ZW0gfCBQcmVzZW50YXRpb25WYXJpYW50VHlwZVR5cGVzIHwgdW5kZWZpbmVkfSBBIGNvbXBsaWFudCBhbm5vdGF0aW9uIGZvciByZW5kZXJpbmcgdGhlIGxpc3QgcmVwb3J0XG4gKi9cbmZ1bmN0aW9uIGdldENvbXBsaWFudFZpc3VhbGl6YXRpb25Bbm5vdGF0aW9uKFxuXHRlbnRpdHlUeXBlOiBFbnRpdHlUeXBlLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0LFxuXHRiSXNBTFA6IEJvb2xlYW5cbik6IExpbmVJdGVtIHwgUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcyB8IFNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnRUeXBlVHlwZXMgfCB1bmRlZmluZWQge1xuXHRjb25zdCBhbm5vdGF0aW9uUGF0aCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkuZ2V0RGVmYXVsdFRlbXBsYXRlQW5ub3RhdGlvblBhdGgoKTtcblx0Y29uc3Qgc2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudCA9IGdldFNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQoZW50aXR5VHlwZSwgYW5ub3RhdGlvblBhdGgsIGNvbnZlcnRlckNvbnRleHQpO1xuXHRpZiAoYW5ub3RhdGlvblBhdGggJiYgc2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudCkge1xuXHRcdGNvbnN0IHByZXNlbnRhdGlvblZhcmlhbnQgPSBzZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50LlByZXNlbnRhdGlvblZhcmlhbnQ7XG5cdFx0aWYgKCFwcmVzZW50YXRpb25WYXJpYW50KSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJQcmVzZW50YXRpb24gVmFyaWFudCBpcyBub3QgY29uZmlndXJlZCBpbiB0aGUgU1BWIG1lbnRpb25lZCBpbiB0aGUgbWFuaWZlc3RcIik7XG5cdFx0fVxuXHRcdGNvbnN0IGJQVkNvbXBsYWludCA9IGlzUHJlc2VudGF0aW9uQ29tcGxpYW50KHNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQuUHJlc2VudGF0aW9uVmFyaWFudCk7XG5cdFx0aWYgKCFiUFZDb21wbGFpbnQpIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHRcdGlmIChpc1NlbGVjdGlvblByZXNlbnRhdGlvbkNvbXBsaWFudChzZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50LCBiSXNBTFApKSB7XG5cdFx0XHRyZXR1cm4gc2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudDtcblx0XHR9XG5cdH1cblx0aWYgKHNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQpIHtcblx0XHRpZiAoaXNTZWxlY3Rpb25QcmVzZW50YXRpb25Db21wbGlhbnQoc2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudCwgYklzQUxQKSkge1xuXHRcdFx0cmV0dXJuIHNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQ7XG5cdFx0fVxuXHR9XG5cdGNvbnN0IHByZXNlbnRhdGlvblZhcmlhbnQgPSBnZXREZWZhdWx0UHJlc2VudGF0aW9uVmFyaWFudChlbnRpdHlUeXBlKTtcblx0aWYgKHByZXNlbnRhdGlvblZhcmlhbnQpIHtcblx0XHRpZiAoaXNQcmVzZW50YXRpb25Db21wbGlhbnQocHJlc2VudGF0aW9uVmFyaWFudCwgYklzQUxQKSkge1xuXHRcdFx0cmV0dXJuIHByZXNlbnRhdGlvblZhcmlhbnQ7XG5cdFx0fVxuXHR9XG5cdGlmICghYklzQUxQKSB7XG5cdFx0Y29uc3QgZGVmYXVsdExpbmVJdGVtID0gZ2V0RGVmYXVsdExpbmVJdGVtKGVudGl0eVR5cGUpO1xuXHRcdGlmIChkZWZhdWx0TGluZUl0ZW0pIHtcblx0XHRcdHJldHVybiBkZWZhdWx0TGluZUl0ZW07XG5cdFx0fVxuXHR9XG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IGdldFZpZXcgPSBmdW5jdGlvbih2aWV3Q29udmVydGVyQ29uZmlndXJhdGlvbjogVmlld0NvbnZlcnRlclNldHRpbmdzKTogTGlzdFJlcG9ydFZpZXdEZWZpbml0aW9uIHtcblx0bGV0IGNvbmZpZyA9IHZpZXdDb252ZXJ0ZXJDb25maWd1cmF0aW9uO1xuXHRpZiAoY29uZmlnLmNvbnZlcnRlckNvbnRleHQpIHtcblx0XHRsZXQgY29udmVydGVyQ29udGV4dCA9IGNvbmZpZy5jb252ZXJ0ZXJDb250ZXh0O1xuXHRcdGNvbmZpZyA9IGNvbmZpZyBhcyBWaWV3QW5ub3RhdGlvbkNvbmZpZ3VyYXRpb247XG5cdFx0bGV0IHByZXNlbnRhdGlvbjogRGF0YVZpc3VhbGl6YXRpb25EZWZpbml0aW9uID0gZ2V0RGF0YVZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uKFxuXHRcdFx0Y29uZmlnLmFubm90YXRpb25cblx0XHRcdFx0PyBjb252ZXJ0ZXJDb250ZXh0LmdldFJlbGF0aXZlQW5ub3RhdGlvblBhdGgoY29uZmlnLmFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lLCBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKSlcblx0XHRcdFx0OiBcIlwiLFxuXHRcdFx0dHJ1ZSxcblx0XHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRjb25maWcgYXMgVmlld1BhdGhDb25maWd1cmF0aW9uXG5cdFx0KTtcblx0XHRsZXQgdGFibGVDb250cm9sSWQgPSBcIlwiO1xuXHRcdGxldCBjaGFydENvbnRyb2xJZCA9IFwiXCI7XG5cdFx0bGV0IHRpdGxlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBcIlwiO1xuXHRcdGxldCBzZWxlY3Rpb25WYXJpYW50UGF0aCA9IFwiXCI7XG5cdFx0Y29uc3QgaXNNdWx0aXBsZVZpZXdDb25maWd1cmF0aW9uID0gZnVuY3Rpb24oY29uZmlnOiBWaWV3Q29uZmlndXJhdGlvbik6IGNvbmZpZyBpcyBNdWx0aXBsZVZpZXdDb25maWd1cmF0aW9uIHtcblx0XHRcdHJldHVybiAoY29uZmlnIGFzIE11bHRpcGxlVmlld0NvbmZpZ3VyYXRpb24pLmtleSAhPT0gdW5kZWZpbmVkO1xuXHRcdH07XG5cdFx0Y29uc3QgY3JlYXRlVmlzdWFsaXphdGlvbiA9IGZ1bmN0aW9uKHByZXNlbnRhdGlvbjogRGF0YVZpc3VhbGl6YXRpb25EZWZpbml0aW9uLCBpc1ByaW1hcnk/OiBib29sZWFuKSB7XG5cdFx0XHRsZXQgZGVmYXVsdFZpc3VhbGl6YXRpb247XG5cdFx0XHRmb3IgKGNvbnN0IHZpc3VhbGl6YXRpb24gb2YgcHJlc2VudGF0aW9uLnZpc3VhbGl6YXRpb25zKSB7XG5cdFx0XHRcdGlmIChpc1ByaW1hcnkgJiYgdmlzdWFsaXphdGlvbi50eXBlID09PSBWaXN1YWxpemF0aW9uVHlwZS5DaGFydCkge1xuXHRcdFx0XHRcdGRlZmF1bHRWaXN1YWxpemF0aW9uID0gdmlzdWFsaXphdGlvbjtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoIWlzUHJpbWFyeSAmJiB2aXN1YWxpemF0aW9uLnR5cGUgPT09IFZpc3VhbGl6YXRpb25UeXBlLlRhYmxlKSB7XG5cdFx0XHRcdFx0ZGVmYXVsdFZpc3VhbGl6YXRpb24gPSB2aXN1YWxpemF0aW9uO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBwcmVzZW50YXRpb25DcmVhdGVkID0gT2JqZWN0LmFzc2lnbih7fSwgcHJlc2VudGF0aW9uKTtcblx0XHRcdGlmIChkZWZhdWx0VmlzdWFsaXphdGlvbikge1xuXHRcdFx0XHRwcmVzZW50YXRpb25DcmVhdGVkLnZpc3VhbGl6YXRpb25zID0gW2RlZmF1bHRWaXN1YWxpemF0aW9uXTtcblx0XHRcdH1cblx0XHRcdHJldHVybiBwcmVzZW50YXRpb25DcmVhdGVkO1xuXHRcdH07XG5cdFx0Y29uc3QgZ2V0UHJlc2VudGF0aW9uID0gZnVuY3Rpb24oaXRlbTogU2luZ2xlVmlld1BhdGhDb25maWd1cmF0aW9uKSB7XG5cdFx0XHRjb25zdCByZXNvbHZlZFRhcmdldCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZUFubm90YXRpb24oaXRlbS5hbm5vdGF0aW9uUGF0aCk7XG5cdFx0XHRjb25zdCB0YXJnZXRBbm5vdGF0aW9uID0gcmVzb2x2ZWRUYXJnZXQuYW5ub3RhdGlvbiBhcyBEYXRhVmlzdWFsaXphdGlvbkFubm90YXRpb25zO1xuXHRcdFx0Y29udmVydGVyQ29udGV4dCA9IHJlc29sdmVkVGFyZ2V0LmNvbnZlcnRlckNvbnRleHQ7XG5cdFx0XHRjb25zdCBhbm5vdGF0aW9uID0gdGFyZ2V0QW5ub3RhdGlvbjtcblx0XHRcdHByZXNlbnRhdGlvbiA9IGdldERhdGFWaXN1YWxpemF0aW9uQ29uZmlndXJhdGlvbihcblx0XHRcdFx0YW5ub3RhdGlvblxuXHRcdFx0XHRcdD8gY29udmVydGVyQ29udGV4dC5nZXRSZWxhdGl2ZUFubm90YXRpb25QYXRoKGFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lLCBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKSlcblx0XHRcdFx0XHQ6IFwiXCIsXG5cdFx0XHRcdHRydWUsXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRcdGNvbmZpZyBhcyBWaWV3UGF0aENvbmZpZ3VyYXRpb25cblx0XHRcdCk7XG5cdFx0XHRyZXR1cm4gcHJlc2VudGF0aW9uO1xuXHRcdH07XG5cdFx0Y29uc3QgY3JlYXRlQWxwVmlldyA9IGZ1bmN0aW9uKFxuXHRcdFx0cHJlc2VudGF0aW9uczogRGF0YVZpc3VhbGl6YXRpb25EZWZpbml0aW9uW10sXG5cdFx0XHRkZWZhdWx0UGF0aDogXCJib3RoXCIgfCBcInByaW1hcnlcIiB8IFwic2Vjb25kYXJ5XCIgfCB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdGNvbnN0IHByaW1hcnlWaXN1YWxpemF0aW9uOiBEYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb24gfCB1bmRlZmluZWQgPSBjcmVhdGVWaXN1YWxpemF0aW9uKHByZXNlbnRhdGlvbnNbMF0sIHRydWUpO1xuXHRcdFx0Y2hhcnRDb250cm9sSWQgPSAocHJpbWFyeVZpc3VhbGl6YXRpb24/LnZpc3VhbGl6YXRpb25zWzBdIGFzIENoYXJ0VmlzdWFsaXphdGlvbikuaWQ7XG5cdFx0XHRjb25zdCBzZWNvbmRhcnlWaXN1YWxpemF0aW9uOiBEYXRhVmlzdWFsaXphdGlvbkRlZmluaXRpb24gfCB1bmRlZmluZWQgPSBjcmVhdGVWaXN1YWxpemF0aW9uKFxuXHRcdFx0XHRwcmVzZW50YXRpb25zWzFdID8gcHJlc2VudGF0aW9uc1sxXSA6IHByZXNlbnRhdGlvbnNbMF1cblx0XHRcdCk7XG5cdFx0XHR0YWJsZUNvbnRyb2xJZCA9IChzZWNvbmRhcnlWaXN1YWxpemF0aW9uPy52aXN1YWxpemF0aW9uc1swXSBhcyBUYWJsZVZpc3VhbGl6YXRpb24pLmFubm90YXRpb24uaWQ7XG5cdFx0XHRpZiAocHJpbWFyeVZpc3VhbGl6YXRpb24gJiYgc2Vjb25kYXJ5VmlzdWFsaXphdGlvbikge1xuXHRcdFx0XHRjb25zdCB2aWV3OiBDb21iaW5lZFZpZXdEZWZpbml0aW9uID0ge1xuXHRcdFx0XHRcdHByaW1hcnlWaXN1YWxpemF0aW9uLFxuXHRcdFx0XHRcdHNlY29uZGFyeVZpc3VhbGl6YXRpb24sXG5cdFx0XHRcdFx0dGFibGVDb250cm9sSWQsXG5cdFx0XHRcdFx0Y2hhcnRDb250cm9sSWQsXG5cdFx0XHRcdFx0ZGVmYXVsdFBhdGhcblx0XHRcdFx0fTtcblx0XHRcdFx0cmV0dXJuIHZpZXc7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRpZiAocHJlc2VudGF0aW9uPy52aXN1YWxpemF0aW9ucz8ubGVuZ3RoID09PSAyICYmIGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2UpIHtcblx0XHRcdGNvbnN0IHZpZXc6IENvbWJpbmVkVmlld0RlZmluaXRpb24gfCB1bmRlZmluZWQgPSBjcmVhdGVBbHBWaWV3KFtwcmVzZW50YXRpb25dLCBcImJvdGhcIik7XG5cdFx0XHRpZiAodmlldykge1xuXHRcdFx0XHRyZXR1cm4gdmlldztcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0Y29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKGNvbmZpZyBhcyBWaWV3UGF0aENvbmZpZ3VyYXRpb24pIHx8XG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldFRlbXBsYXRlVHlwZSgpID09PSBUZW1wbGF0ZVR5cGUuQW5hbHl0aWNhbExpc3RQYWdlXG5cdFx0KSB7XG5cdFx0XHRjb25zdCB7IHByaW1hcnksIHNlY29uZGFyeSB9ID0gY29uZmlnIGFzIENvbWJpbmVkVmlld1BhdGhDb25maWd1cmF0aW9uO1xuXHRcdFx0aWYgKHByaW1hcnkgJiYgcHJpbWFyeS5sZW5ndGggJiYgc2Vjb25kYXJ5ICYmIHNlY29uZGFyeS5sZW5ndGgpIHtcblx0XHRcdFx0Y29uc3QgdmlldzogQ29tYmluZWRWaWV3RGVmaW5pdGlvbiB8IHVuZGVmaW5lZCA9IGNyZWF0ZUFscFZpZXcoXG5cdFx0XHRcdFx0W2dldFByZXNlbnRhdGlvbihwcmltYXJ5WzBdKSwgZ2V0UHJlc2VudGF0aW9uKHNlY29uZGFyeVswXSldLFxuXHRcdFx0XHRcdChjb25maWcgYXMgQ29tYmluZWRWaWV3UGF0aENvbmZpZ3VyYXRpb24pLmRlZmF1bHRQYXRoXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmICh2aWV3KSB7XG5cdFx0XHRcdFx0cmV0dXJuIHZpZXc7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvcihcIlNlY29uZGFyeUl0ZW1zIGluIHRoZSBWaWV3cyBpcyBub3QgcHJlc2VudFwiKTtcblx0XHRcdH1cblx0XHR9IGVsc2UgaWYgKGlzTXVsdGlwbGVWaWV3Q29uZmlndXJhdGlvbihjb25maWcpKSB7XG5cdFx0XHQvLyBrZXkgZXhpc3RzIG9ubHkgb24gbXVsdGkgdGFibGVzIG1vZGVcblx0XHRcdGNvbnN0IHJlc29sdmVkVGFyZ2V0ID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlQW5ub3RhdGlvbigoY29uZmlnIGFzIFNpbmdsZVZpZXdQYXRoQ29uZmlndXJhdGlvbikuYW5ub3RhdGlvblBhdGgpO1xuXHRcdFx0Y29uc3Qgdmlld0Fubm90YXRpb246IFZpZXdBbm5vdGF0aW9uc1R5cGVUeXBlcyA9IHJlc29sdmVkVGFyZ2V0LmFubm90YXRpb24gYXMgVmlld0Fubm90YXRpb25zVHlwZVR5cGVzO1xuXHRcdFx0Y29udmVydGVyQ29udGV4dCA9IHJlc29sdmVkVGFyZ2V0LmNvbnZlcnRlckNvbnRleHQ7XG5cdFx0XHR0aXRsZSA9IGNvbXBpbGVCaW5kaW5nKGFubm90YXRpb25FeHByZXNzaW9uKHZpZXdBbm5vdGF0aW9uLlRleHQpKTtcblx0XHRcdC8vIE5lZWQgdG8gbG9vcCBvbiB0YWJsZSBpbnRvIHZpZXdzIHNpbmNlIG11bHRpIHRhYmxlIG1vZGUgZ2V0IHNwZWNpZmljIGNvbmZpZ3VyYXRpb24gKGhpZGRlbiBmaWx0ZXJzIG9yIFRhYmxlIElkKVxuXHRcdFx0cHJlc2VudGF0aW9uLnZpc3VhbGl6YXRpb25zLmZvckVhY2goKHZpc3VhbGl6YXRpb25EZWZpbml0aW9uLCBpbmRleCkgPT4ge1xuXHRcdFx0XHRzd2l0Y2ggKHZpc3VhbGl6YXRpb25EZWZpbml0aW9uLnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlIFZpc3VhbGl6YXRpb25UeXBlLlRhYmxlOlxuXHRcdFx0XHRcdFx0Y29uc3QgdGFibGVWaXN1YWxpemF0aW9uID0gcHJlc2VudGF0aW9uLnZpc3VhbGl6YXRpb25zW2luZGV4XSBhcyBUYWJsZVZpc3VhbGl6YXRpb247XG5cdFx0XHRcdFx0XHRjb25zdCBmaWx0ZXJzID0gdGFibGVWaXN1YWxpemF0aW9uLmNvbnRyb2wuZmlsdGVycyB8fCB7fTtcblx0XHRcdFx0XHRcdGZpbHRlcnMuaGlkZGVuRmlsdGVycyA9IGZpbHRlcnMuaGlkZGVuRmlsdGVycyB8fCB7IHBhdGhzOiBbXSB9O1xuXHRcdFx0XHRcdFx0aWYgKCEoY29uZmlnIGFzIFNpbmdsZVZpZXdQYXRoQ29uZmlndXJhdGlvbikua2VlcFByZXZpb3VzUHJlc29uYWxpemF0aW9uKSB7XG5cdFx0XHRcdFx0XHRcdC8vIE5lZWQgdG8gb3ZlcnJpZGUgVGFibGUgSWQgdG8gbWF0Y2ggd2l0aCBUYWIgS2V5IChjdXJyZW50bHkgb25seSB0YWJsZSBpcyBtYW5hZ2VkIGluIG11bHRpcGxlIHZpZXcgbW9kZSlcblx0XHRcdFx0XHRcdFx0dGFibGVWaXN1YWxpemF0aW9uLmFubm90YXRpb24uaWQgPSBUYWJsZUlEKChjb25maWcgYXMgU2luZ2xlVmlld1BhdGhDb25maWd1cmF0aW9uKS5rZXkgfHwgXCJcIiwgXCJMaW5lSXRlbVwiKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGNvbmZpZyA9IGNvbmZpZyBhcyBWaWV3QW5ub3RhdGlvbkNvbmZpZ3VyYXRpb247XG5cdFx0XHRcdFx0XHRpZiAoY29uZmlnICYmIGNvbmZpZy5hbm5vdGF0aW9uICYmIGNvbmZpZy5hbm5vdGF0aW9uLnRlcm0gPT09IFVJQW5ub3RhdGlvblRlcm1zLlNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQpIHtcblx0XHRcdFx0XHRcdFx0c2VsZWN0aW9uVmFyaWFudFBhdGggPSAoY29uZmlnLmFubm90YXRpb24gYXMgU2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudFR5cGVUeXBlcykuU2VsZWN0aW9uVmFyaWFudC5mdWxseVF1YWxpZmllZE5hbWUuc3BsaXQoXG5cdFx0XHRcdFx0XHRcdFx0XCJAXCJcblx0XHRcdFx0XHRcdFx0KVsxXTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdHNlbGVjdGlvblZhcmlhbnRQYXRoID0gKGNvbmZpZyBhcyBTaW5nbGVWaWV3UGF0aENvbmZpZ3VyYXRpb24pLmFubm90YXRpb25QYXRoO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Ly9Qcm92aWRlIFNlbGVjdGlvbiBWYXJpYW50IHRvIGhpZGRlbkZpbHRlcnMgaW4gb3JkZXIgdG8gc2V0IHRoZSBTViBmaWx0ZXJzIHRvIHRoZSB0YWJsZS5cblx0XHRcdFx0XHRcdC8vTURDIFRhYmxlIG92ZXJyaWRlcyBiaW5kaW5nIEZpbHRlciBhbmQgZnJvbSBTQVAgRkUgdGhlIG9ubHkgbWV0aG9kIHdoZXJlIHdlIGFyZSBhYmxlIHRvIGFkZFxuXHRcdFx0XHRcdFx0Ly9hZGRpdGlvbmFsIGZpbHRlciBpcyAncmViaW5kVGFibGUnIGludG8gVGFibGUgZGVsZWdhdGUuXG5cdFx0XHRcdFx0XHQvL1RvIGF2b2lkIGltcGxlbWVudGluZyBzcGVjaWZpYyBMUiBmZWF0dXJlIHRvIFNBUCBGRSBNYWNybyBUYWJsZSwgdGhlIGZpbHRlcihzKSByZWxhdGVkIHRvIHRoZSBUYWIgKG11bHRpIHRhYmxlIG1vZGUpXG5cdFx0XHRcdFx0XHQvL2NhbiBiZSBwYXNzZWQgdG8gbWFjcm8gdGFibGUgdmlhIHBhcmFtZXRlci9jb250ZXh0IG5hbWVkIGZpbHRlcnMgYW5kIGtleSBoaWRkZW5GaWx0ZXJzLlxuXHRcdFx0XHRcdFx0ZmlsdGVycy5oaWRkZW5GaWx0ZXJzLnBhdGhzLnB1c2goeyBhbm5vdGF0aW9uUGF0aDogc2VsZWN0aW9uVmFyaWFudFBhdGggfSk7XG5cdFx0XHRcdFx0XHR0YWJsZVZpc3VhbGl6YXRpb24uY29udHJvbC5maWx0ZXJzID0gZmlsdGVycztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgVmlzdWFsaXphdGlvblR5cGUuQ2hhcnQ6XG5cdFx0XHRcdFx0XHQvLyBOb3QgY3VycmVudGx5IG1hbmFnZWRcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHByZXNlbnRhdGlvbi52aXN1YWxpemF0aW9ucy5mb3JFYWNoKHZpc3VhbGl6YXRpb25EZWZpbml0aW9uID0+IHtcblx0XHRcdGlmICh2aXN1YWxpemF0aW9uRGVmaW5pdGlvbi50eXBlID09PSBWaXN1YWxpemF0aW9uVHlwZS5UYWJsZSkge1xuXHRcdFx0XHR0YWJsZUNvbnRyb2xJZCA9IHZpc3VhbGl6YXRpb25EZWZpbml0aW9uLmFubm90YXRpb24uaWQ7XG5cdFx0XHR9IGVsc2UgaWYgKHZpc3VhbGl6YXRpb25EZWZpbml0aW9uLnR5cGUgPT09IFZpc3VhbGl6YXRpb25UeXBlLkNoYXJ0KSB7XG5cdFx0XHRcdGNoYXJ0Q29udHJvbElkID0gdmlzdWFsaXphdGlvbkRlZmluaXRpb24uaWQ7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHByZXNlbnRhdGlvbixcblx0XHRcdHRhYmxlQ29udHJvbElkLFxuXHRcdFx0Y2hhcnRDb250cm9sSWQsXG5cdFx0XHR0aXRsZSxcblx0XHRcdHNlbGVjdGlvblZhcmlhbnRQYXRoXG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRjb25maWcgPSBjb25maWcgYXMgQ3VzdG9tVmlld0NvbmZpZ3VyYXRpb247XG5cdFx0Y29uc3QgdGl0bGUgPSBjb25maWcubGFiZWwsXG5cdFx0XHRmcmFnbWVudCA9IGNvbmZpZy50ZW1wbGF0ZSxcblx0XHRcdHR5cGUgPSBjb25maWcudHlwZSxcblx0XHRcdGN1c3RvbVRhYklkID0gQ3VzdG9tVGFiSUQoY29uZmlnLmtleSB8fCBcIlwiKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0dGl0bGUsXG5cdFx0XHRmcmFnbWVudCxcblx0XHRcdHR5cGUsXG5cdFx0XHRjdXN0b21UYWJJZFxuXHRcdH07XG5cdH1cbn07XG5cbmNvbnN0IGdldFZpZXdzID0gZnVuY3Rpb24oXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsXG5cdHNldHRpbmdzVmlld3M6IE11bHRpcGxlVmlld3NDb25maWd1cmF0aW9uIHwgdW5kZWZpbmVkXG4pOiBMaXN0UmVwb3J0Vmlld0RlZmluaXRpb25bXSB7XG5cdGxldCB2aWV3Q29udmVydGVyQ29uZmlnczogVmlld0NvbnZlcnRlclNldHRpbmdzW10gPSBbXTtcblx0aWYgKHNldHRpbmdzVmlld3MpIHtcblx0XHRzZXR0aW5nc1ZpZXdzLnBhdGhzLmZvckVhY2goKHBhdGg6IFZpZXdQYXRoQ29uZmlndXJhdGlvbiB8IEN1c3RvbVZpZXdUZW1wbGF0ZUNvbmZpZ3VyYXRpb24pID0+IHtcblx0XHRcdGlmIChjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmhhc011bHRpcGxlVmlzdWFsaXphdGlvbnMocGF0aCBhcyBWaWV3UGF0aENvbmZpZ3VyYXRpb24pKSB7XG5cdFx0XHRcdGlmIChzZXR0aW5nc1ZpZXdzLnBhdGhzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJBTFAgZmxhdm9yIGNhbm5vdCBoYXZlIG11bHRpcGxlIHZpZXdzXCIpO1xuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdHBhdGggPSBwYXRoIGFzIENvbWJpbmVkVmlld1BhdGhDb25maWd1cmF0aW9uO1xuXHRcdFx0XHRcdHZpZXdDb252ZXJ0ZXJDb25maWdzLnB1c2goe1xuXHRcdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dDogY29udmVydGVyQ29udGV4dCxcblx0XHRcdFx0XHRcdHByaW1hcnk6IHBhdGgucHJpbWFyeSxcblx0XHRcdFx0XHRcdHNlY29uZGFyeTogcGF0aC5zZWNvbmRhcnksXG5cdFx0XHRcdFx0XHRkZWZhdWx0UGF0aDogcGF0aC5kZWZhdWx0UGF0aFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2UgaWYgKChwYXRoIGFzIEN1c3RvbVZpZXdDb25maWd1cmF0aW9uKS50ZW1wbGF0ZSkge1xuXHRcdFx0XHRwYXRoID0gcGF0aCBhcyBDdXN0b21WaWV3Q29uZmlndXJhdGlvbjtcblx0XHRcdFx0dmlld0NvbnZlcnRlckNvbmZpZ3MucHVzaCh7XG5cdFx0XHRcdFx0a2V5OiBwYXRoLmtleSxcblx0XHRcdFx0XHRsYWJlbDogcGF0aC5sYWJlbCxcblx0XHRcdFx0XHR0ZW1wbGF0ZTogcGF0aC50ZW1wbGF0ZSxcblx0XHRcdFx0XHR0eXBlOiBcIkN1c3RvbVwiXG5cdFx0XHRcdH0pO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0cGF0aCA9IHBhdGggYXMgU2luZ2xlVmlld1BhdGhDb25maWd1cmF0aW9uO1xuXHRcdFx0XHRjb25zdCBtYW5pZmVzdFdyYXBwZXIgPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLFxuXHRcdFx0XHRcdHZpZXdDb252ZXJ0ZXJDb250ZXh0ID0gY29udmVydGVyQ29udGV4dC5nZXRDb252ZXJ0ZXJDb250ZXh0Rm9yKFxuXHRcdFx0XHRcdFx0cGF0aC5jb250ZXh0UGF0aCB8fCAocGF0aC5lbnRpdHlTZXQgJiYgXCIvXCIgKyBwYXRoLmVudGl0eVNldCkgfHwgY29udmVydGVyQ29udGV4dC5nZXRDb250ZXh0UGF0aCgpXG5cdFx0XHRcdFx0KSxcblx0XHRcdFx0XHRlbnRpdHlUeXBlID0gdmlld0NvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpO1xuXG5cdFx0XHRcdGlmIChlbnRpdHlUeXBlICYmIHZpZXdDb252ZXJ0ZXJDb250ZXh0KSB7XG5cdFx0XHRcdFx0Y29uc3QgYW5ub3RhdGlvblBhdGggPSBtYW5pZmVzdFdyYXBwZXIuZ2V0RGVmYXVsdFRlbXBsYXRlQW5ub3RhdGlvblBhdGgoKTtcblx0XHRcdFx0XHRsZXQgYW5ub3RhdGlvbjtcblx0XHRcdFx0XHRjb25zdCByZXNvbHZlZFRhcmdldCA9IHZpZXdDb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGVBbm5vdGF0aW9uKHBhdGguYW5ub3RhdGlvblBhdGgpO1xuXHRcdFx0XHRcdGNvbnN0IHRhcmdldEFubm90YXRpb24gPSByZXNvbHZlZFRhcmdldC5hbm5vdGF0aW9uIGFzIERhdGFWaXN1YWxpemF0aW9uQW5ub3RhdGlvbnM7XG5cdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dCA9IHJlc29sdmVkVGFyZ2V0LmNvbnZlcnRlckNvbnRleHQ7XG5cdFx0XHRcdFx0aWYgKHRhcmdldEFubm90YXRpb24pIHtcblx0XHRcdFx0XHRcdGlmICh0YXJnZXRBbm5vdGF0aW9uLnRlcm0gPT09IFVJQW5ub3RhdGlvblRlcm1zLlNlbGVjdGlvblZhcmlhbnQpIHtcblx0XHRcdFx0XHRcdFx0aWYgKGFubm90YXRpb25QYXRoKSB7XG5cdFx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbiA9IGdldFNlbGVjdGlvblByZXNlbnRhdGlvblZhcmlhbnQoXG5cdFx0XHRcdFx0XHRcdFx0XHR2aWV3Q29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCksXG5cdFx0XHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aCxcblx0XHRcdFx0XHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdGFubm90YXRpb24gPSBnZXREZWZhdWx0TGluZUl0ZW0odmlld0NvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5VHlwZSgpKSBhcyBMaW5lSXRlbTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbiA9IHRhcmdldEFubm90YXRpb247XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR2aWV3Q29udmVydGVyQ29uZmlncy5wdXNoKHtcblx0XHRcdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dDogdmlld0NvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRcdFx0XHRcdGFubm90YXRpb24sXG5cdFx0XHRcdFx0XHRcdGFubm90YXRpb25QYXRoOiBwYXRoLmFubm90YXRpb25QYXRoLFxuXHRcdFx0XHRcdFx0XHRrZWVwUHJldmlvdXNQcmVzb25hbGl6YXRpb246IHBhdGgua2VlcFByZXZpb3VzUHJlc29uYWxpemF0aW9uLFxuXHRcdFx0XHRcdFx0XHRrZXk6IHBhdGgua2V5XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gVE9ETyBEaWFnbm9zdGljcyBtZXNzYWdlXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fSBlbHNlIHtcblx0XHRjb25zdCBlbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCk7XG5cdFx0aWYgKGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2UpIHtcblx0XHRcdHZpZXdDb252ZXJ0ZXJDb25maWdzID0gZ2V0QWxwVmlld0NvbmZpZyhjb252ZXJ0ZXJDb250ZXh0LCB2aWV3Q29udmVydGVyQ29uZmlncyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZpZXdDb252ZXJ0ZXJDb25maWdzLnB1c2goe1xuXHRcdFx0XHRhbm5vdGF0aW9uOiBnZXRDb21wbGlhbnRWaXN1YWxpemF0aW9uQW5ub3RhdGlvbihlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0LCBmYWxzZSksXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQ6IGNvbnZlcnRlckNvbnRleHRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmlld0NvbnZlcnRlckNvbmZpZ3MubWFwKHZpZXdDb252ZXJ0ZXJDb25maWcgPT4ge1xuXHRcdHJldHVybiBnZXRWaWV3KHZpZXdDb252ZXJ0ZXJDb25maWcpO1xuXHR9KTtcbn07XG5cbmZ1bmN0aW9uIGdldEFscFZpZXdDb25maWcoY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCwgdmlld0NvbmZpZ3M6IFZpZXdDb252ZXJ0ZXJTZXR0aW5nc1tdKTogVmlld0NvbnZlcnRlclNldHRpbmdzW10ge1xuXHRjb25zdCBlbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCk7XG5cdGNvbnN0IGFubm90YXRpb24gPSBnZXRDb21wbGlhbnRWaXN1YWxpemF0aW9uQW5ub3RhdGlvbihlbnRpdHlUeXBlLCBjb252ZXJ0ZXJDb250ZXh0LCB0cnVlKTtcblx0bGV0IGNoYXJ0LCB0YWJsZTtcblx0aWYgKGFubm90YXRpb24pIHtcblx0XHR2aWV3Q29uZmlncy5wdXNoKHtcblx0XHRcdGFubm90YXRpb246IGFubm90YXRpb24sXG5cdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0fSk7XG5cdH0gZWxzZSB7XG5cdFx0Y2hhcnQgPSBnZXREZWZhdWx0Q2hhcnQoZW50aXR5VHlwZSk7XG5cdFx0dGFibGUgPSBnZXREZWZhdWx0TGluZUl0ZW0oZW50aXR5VHlwZSk7XG5cdFx0aWYgKGNoYXJ0ICYmIHRhYmxlKSB7XG5cdFx0XHRjb25zdCBwcmltYXJ5OiBTaW5nbGVWaWV3UGF0aENvbmZpZ3VyYXRpb25bXSA9IFt7IGFubm90YXRpb25QYXRoOiBjaGFydC50ZXJtIH1dO1xuXHRcdFx0Y29uc3Qgc2Vjb25kYXJ5OiBTaW5nbGVWaWV3UGF0aENvbmZpZ3VyYXRpb25bXSA9IFt7IGFubm90YXRpb25QYXRoOiB0YWJsZS50ZXJtIH1dO1xuXHRcdFx0dmlld0NvbmZpZ3MucHVzaCh7XG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHQ6IGNvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRcdHByaW1hcnk6IHByaW1hcnksXG5cdFx0XHRcdHNlY29uZGFyeTogc2Vjb25kYXJ5LFxuXHRcdFx0XHRkZWZhdWx0UGF0aDogXCJib3RoXCJcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gdmlld0NvbmZpZ3M7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRIZWFkZXJBY3Rpb25zID0gZnVuY3Rpb24oY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IEJhc2VBY3Rpb25bXSB7XG5cdGNvbnN0IG1hbmlmZXN0V3JhcHBlciA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCk7XG5cdHJldHVybiBpbnNlcnRDdXN0b21FbGVtZW50cyhbXSwgZ2V0QWN0aW9uc0Zyb21NYW5pZmVzdChtYW5pZmVzdFdyYXBwZXIuZ2V0SGVhZGVyQWN0aW9ucygpLCBjb252ZXJ0ZXJDb250ZXh0KSk7XG59O1xuXG4vKipcbiAqIENyZWF0ZSB0aGUgTGlzdFJlcG9ydERlZmluaXRpb24gZm9yIHRoZSBtdWx0aSBlbnRpdHlTZXRzIChtdWx0aSB0YWJsZSBpbnN0YW5jZXMpLlxuICpcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0XG4gKiBAcmV0dXJucyB7TGlzdFJlcG9ydERlZmluaXRpb259IFRoZSBsaXN0IHJlcG9ydCBkZWZpbml0aW9uIGJhc2VkIG9uIGFubm90YXRpb24gKyBtYW5pZmVzdFxuICovXG5leHBvcnQgY29uc3QgY29udmVydFBhZ2UgPSBmdW5jdGlvbihjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogTGlzdFJlcG9ydERlZmluaXRpb24ge1xuXHRjb25zdCBlbnRpdHlUeXBlID0gY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlUeXBlKCk7XG5cdGNvbnN0IHNDb250ZXh0UGF0aCA9IGNvbnZlcnRlckNvbnRleHQuZ2V0Q29udGV4dFBhdGgoKTtcblxuXHRpZiAoIXNDb250ZXh0UGF0aCkge1xuXHRcdC8vIElmIHdlIGRvbid0IGhhdmUgYW4gZW50aXR5U2V0IGF0IHRoaXMgcG9pbnQgd2UgaGF2ZSBhbiBpc3N1ZSBJJ2Qgc2F5XG5cdFx0dGhyb3cgbmV3IEVycm9yKFxuXHRcdFx0XCJBbiBFbnRpdHlTZXQgaXMgcmVxdWlyZWQgdG8gYmUgYWJsZSB0byBkaXNwbGF5IGEgTGlzdFJlcG9ydCwgcGxlYXNlIGFkanVzdCB5b3VyIGBlbnRpdHlTZXRgIHByb3BlcnR5IHRvIHBvaW50IHRvIG9uZS5cIlxuXHRcdCk7XG5cdH1cblx0Y29uc3QgbWFuaWZlc3RXcmFwcGVyID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKTtcblx0Y29uc3Qgdmlld3NEZWZpbml0aW9uOiBNdWx0aXBsZVZpZXdzQ29uZmlndXJhdGlvbiB8IHVuZGVmaW5lZCA9IG1hbmlmZXN0V3JhcHBlci5nZXRWaWV3Q29uZmlndXJhdGlvbigpO1xuXHRjb25zdCBoYXNNdWx0aXBsZUVudGl0eVNldHMgPSBtYW5pZmVzdFdyYXBwZXIuaGFzTXVsdGlwbGVFbnRpdHlTZXRzKCk7XG5cdGNvbnN0IHZpZXdzOiBMaXN0UmVwb3J0Vmlld0RlZmluaXRpb25bXSA9IGdldFZpZXdzKGNvbnZlcnRlckNvbnRleHQsIHZpZXdzRGVmaW5pdGlvbik7XG5cdGNvbnN0IHNob3dUYWJDb3VudHMgPSB2aWV3c0RlZmluaXRpb24gPyB2aWV3c0RlZmluaXRpb24/LnNob3dDb3VudHMgfHwgaGFzTXVsdGlwbGVFbnRpdHlTZXRzIDogdW5kZWZpbmVkOyAvLyB3aXRoIG11bHRpIEVudGl0eVNldHMsIHRhYiBjb3VudHMgYXJlIGRpc3BsYXllZCBieSBkZWZhdWx0XG5cdGNvbnN0IGxyVGFibGVWaXN1YWxpemF0aW9ucyA9IGdldFRhYmxlVmlzdWFsaXphdGlvbnModmlld3MpO1xuXHRjb25zdCBzaG93UGlubmFibGVUb2dnbGUgPSBsclRhYmxlVmlzdWFsaXphdGlvbnMuc29tZSh0YWJsZSA9PiB0YWJsZS5jb250cm9sLnR5cGUgPT09IFwiUmVzcG9uc2l2ZVRhYmxlXCIpO1xuXHRsZXQgc2luZ2xlVGFibGVJZCA9IFwiXCI7XG5cdGxldCBzaW5nbGVDaGFydElkID0gXCJcIjtcblx0Y29uc3QgZmlsdGVyQmFySWQgPSBGaWx0ZXJCYXJJRChzQ29udGV4dFBhdGgpO1xuXHRjb25zdCBmaWx0ZXJWYXJpYW50TWFuYWdlbWVudElEID0gRmlsdGVyVmFyaWFudE1hbmFnZW1lbnRJRChmaWx0ZXJCYXJJZCk7XG5cdGNvbnN0IHRhcmdldENvbnRyb2xJZHMgPSBbZmlsdGVyQmFySWRdLmNvbmNhdChcblx0XHRsclRhYmxlVmlzdWFsaXphdGlvbnMubWFwKHZpc3VhbGl6YXRpb24gPT4ge1xuXHRcdFx0cmV0dXJuIHZpc3VhbGl6YXRpb24uYW5ub3RhdGlvbi5pZDtcblx0XHR9KVxuXHQpO1xuXHRjb25zdCBmYkNvbmZpZyA9IG1hbmlmZXN0V3JhcHBlci5nZXRGaWx0ZXJDb25maWd1cmF0aW9uKCk7XG5cdGNvbnN0IGZpbHRlckluaXRpYWxMYXlvdXQgPSBmYkNvbmZpZz8uaW5pdGlhbExheW91dCAhPT0gdW5kZWZpbmVkID8gZmJDb25maWc/LmluaXRpYWxMYXlvdXQudG9Mb3dlckNhc2UoKSA6IFwiY29tcGFjdFwiO1xuXHRjb25zdCBmaWx0ZXJMYXlvdXQgPSBmYkNvbmZpZz8ubGF5b3V0ICE9PSB1bmRlZmluZWQgPyBmYkNvbmZpZz8ubGF5b3V0LnRvTG93ZXJDYXNlKCkgOiBcImNvbXBhY3RcIjtcblx0Y29uc3QgdXNlU2VtYW50aWNEYXRlUmFuZ2UgPSBmYkNvbmZpZy51c2VTZW1hbnRpY0RhdGVSYW5nZSAhPT0gdW5kZWZpbmVkID8gZmJDb25maWcudXNlU2VtYW50aWNEYXRlUmFuZ2UgOiB0cnVlO1xuXG5cdGNvbnN0IG9Db25maWcgPSBnZXRDb250ZW50QXJlYUlkKGNvbnZlcnRlckNvbnRleHQsIHZpZXdzKTtcblx0aWYgKG9Db25maWcpIHtcblx0XHRzaW5nbGVDaGFydElkID0gb0NvbmZpZy5jaGFydElkO1xuXHRcdHNpbmdsZVRhYmxlSWQgPSBvQ29uZmlnLnRhYmxlSWQ7XG5cdH1cblx0Y29uc3Qgc2VsZWN0aW9uRmllbGRzID0gZ2V0U2VsZWN0aW9uRmllbGRzKGNvbnZlcnRlckNvbnRleHQsIGxyVGFibGVWaXN1YWxpemF0aW9ucyk7XG5cblx0Y29uc3QgaGlkZUJhc2ljU2VhcmNoID0gZ2V0RmlsdGVyQmFyaGlkZUJhc2ljU2VhcmNoKGxyVGFibGVWaXN1YWxpemF0aW9ucywgY29udmVydGVyQ29udGV4dCk7XG5cdGNvbnN0IHNlbGVjdGlvblZhcmlhbnQgPSBnZXRTZWxlY3Rpb25WYXJpYW50KGVudGl0eVR5cGUsIGNvbnZlcnRlckNvbnRleHQpO1xuXHRjb25zdCBkZWZhdWx0U2VtYW50aWNEYXRlczogYW55ID0gdXNlU2VtYW50aWNEYXRlUmFuZ2Vcblx0XHQ/IGdldERlZmF1bHRTZW1hbnRpY0RhdGVzKGdldE1hbmlmZXN0RmlsdGVyRmllbGRzKGVudGl0eVR5cGUsIGNvbnZlcnRlckNvbnRleHQpKVxuXHRcdDoge307XG5cdC8vIFNvcnQgaGVhZGVyIGFjdGlvbnMgYWNjb3JkaW5nIHRvIHBvc2l0aW9uIGF0dHJpYnV0ZXMgaW4gbWFuaWZlc3Rcblx0Y29uc3QgaGVhZGVyQWN0aW9ucyA9IGdldEhlYWRlckFjdGlvbnMoY29udmVydGVyQ29udGV4dCk7XG5cdGNvbnN0IGhhc011bHRpVmlzdWFsaXphdGlvbnM6IGJvb2xlYW4gPVxuXHRcdG1hbmlmZXN0V3JhcHBlci5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKCkgfHwgY29udmVydGVyQ29udGV4dC5nZXRUZW1wbGF0ZVR5cGUoKSA9PT0gVGVtcGxhdGVUeXBlLkFuYWx5dGljYWxMaXN0UGFnZTtcblxuXHRyZXR1cm4ge1xuXHRcdG1haW5FbnRpdHlTZXQ6IHNDb250ZXh0UGF0aCxcblx0XHRtYWluRW50aXR5VHlwZTogc0NvbnRleHRQYXRoICsgXCIvXCIsXG5cdFx0c2luZ2xlVGFibGVJZCxcblx0XHRzaW5nbGVDaGFydElkLFxuXHRcdHNob3dUYWJDb3VudHMsXG5cdFx0aGVhZGVyQWN0aW9ucyxcblx0XHRzaG93UGlubmFibGVUb2dnbGU6IHNob3dQaW5uYWJsZVRvZ2dsZSxcblx0XHRmaWx0ZXJCYXI6IHtcblx0XHRcdHNlbGVjdGlvbkZpZWxkcyxcblx0XHRcdGhpZGVCYXNpY1NlYXJjaFxuXHRcdH0sXG5cdFx0dmlld3M6IHZpZXdzLFxuXHRcdGZpbHRlckJhcklkLFxuXHRcdGZpbHRlckNvbmRpdGlvbnM6IHtcblx0XHRcdHNlbGVjdGlvblZhcmlhbnQ6IHNlbGVjdGlvblZhcmlhbnQsXG5cdFx0XHRkZWZhdWx0U2VtYW50aWNEYXRlczogZGVmYXVsdFNlbWFudGljRGF0ZXNcblx0XHR9LFxuXHRcdHZhcmlhbnRNYW5hZ2VtZW50OiB7XG5cdFx0XHRpZDogZmlsdGVyVmFyaWFudE1hbmFnZW1lbnRJRCxcblx0XHRcdHRhcmdldENvbnRyb2xJZHM6IHRhcmdldENvbnRyb2xJZHMuam9pbihcIixcIilcblx0XHR9LFxuXHRcdGlzTXVsdGlFbnRpdHlTZXRzOiBoYXNNdWx0aXBsZUVudGl0eVNldHMsXG5cdFx0aGFzTXVsdGlWaXN1YWxpemF0aW9uczogaGFzTXVsdGlWaXN1YWxpemF0aW9ucyxcblx0XHR1c2VTZW1hbnRpY0RhdGVSYW5nZSxcblx0XHRmaWx0ZXJJbml0aWFsTGF5b3V0LFxuXHRcdGZpbHRlckxheW91dCxcblx0XHRrcGlEZWZpbml0aW9uczogZ2V0S1BJRGVmaW5pdGlvbnMoY29udmVydGVyQ29udGV4dClcblx0fTtcbn07XG5cbmZ1bmN0aW9uIGdldFNlbGVjdGlvblZhcmlhbnRzKFxuXHRsclRhYmxlVmlzdWFsaXphdGlvbnM6IFRhYmxlVmlzdWFsaXphdGlvbltdLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBTZWxlY3Rpb25WYXJpYW50Q29uZmlndXJhdGlvbltdIHtcblx0Y29uc3Qgc2VsZWN0aW9uVmFyaWFudFBhdGhzOiBzdHJpbmdbXSA9IFtdO1xuXHRyZXR1cm4gbHJUYWJsZVZpc3VhbGl6YXRpb25zXG5cdFx0Lm1hcCh2aXN1YWxpemF0aW9uID0+IHtcblx0XHRcdGNvbnN0IHRhYmxlRmlsdGVycyA9IHZpc3VhbGl6YXRpb24uY29udHJvbC5maWx0ZXJzO1xuXHRcdFx0Y29uc3QgdGFibGVTVkNvbmZpZ3M6IFNlbGVjdGlvblZhcmlhbnRDb25maWd1cmF0aW9uW10gPSBbXTtcblx0XHRcdGZvciAoY29uc3Qga2V5IGluIHRhYmxlRmlsdGVycykge1xuXHRcdFx0XHRpZiAoQXJyYXkuaXNBcnJheSh0YWJsZUZpbHRlcnNba2V5XS5wYXRocykpIHtcblx0XHRcdFx0XHRjb25zdCBwYXRocyA9IHRhYmxlRmlsdGVyc1trZXldLnBhdGhzO1xuXHRcdFx0XHRcdHBhdGhzLmZvckVhY2gocGF0aCA9PiB7XG5cdFx0XHRcdFx0XHRpZiAocGF0aCAmJiBwYXRoLmFubm90YXRpb25QYXRoICYmIHNlbGVjdGlvblZhcmlhbnRQYXRocy5pbmRleE9mKHBhdGguYW5ub3RhdGlvblBhdGgpID09PSAtMSkge1xuXHRcdFx0XHRcdFx0XHRzZWxlY3Rpb25WYXJpYW50UGF0aHMucHVzaChwYXRoLmFubm90YXRpb25QYXRoKTtcblx0XHRcdFx0XHRcdFx0Y29uc3Qgc2VsZWN0aW9uVmFyaWFudENvbmZpZyA9IGdldFNlbGVjdGlvblZhcmlhbnRDb25maWd1cmF0aW9uKHBhdGguYW5ub3RhdGlvblBhdGgsIGNvbnZlcnRlckNvbnRleHQpO1xuXHRcdFx0XHRcdFx0XHRpZiAoc2VsZWN0aW9uVmFyaWFudENvbmZpZykge1xuXHRcdFx0XHRcdFx0XHRcdHRhYmxlU1ZDb25maWdzLnB1c2goc2VsZWN0aW9uVmFyaWFudENvbmZpZyk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuIHRhYmxlU1ZDb25maWdzO1xuXHRcdH0pXG5cdFx0LnJlZHVjZSgoc3ZDb25maWdzLCBzZWxlY3Rpb25WYXJpYW50KSA9PiBzdkNvbmZpZ3MuY29uY2F0KHNlbGVjdGlvblZhcmlhbnQpLCBbXSk7XG59XG5cbmZ1bmN0aW9uIGdldEV4Y2x1ZGVkRmlsdGVyUHJvcGVydGllcyhzZWxlY3Rpb25WYXJpYW50czogU2VsZWN0aW9uVmFyaWFudENvbmZpZ3VyYXRpb25bXSk6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+IHtcblx0cmV0dXJuIHNlbGVjdGlvblZhcmlhbnRzLnJlZHVjZSgocHJldmlvdXNWYWx1ZTogUmVjb3JkPHN0cmluZywgYm9vbGVhbj4sIHNlbGVjdGlvblZhcmlhbnQpID0+IHtcblx0XHRzZWxlY3Rpb25WYXJpYW50LnByb3BlcnR5TmFtZXMuZm9yRWFjaChwcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdFx0cHJldmlvdXNWYWx1ZVtwcm9wZXJ0eU5hbWVdID0gdHJ1ZTtcblx0XHR9KTtcblx0XHRyZXR1cm4gcHJldmlvdXNWYWx1ZTtcblx0fSwge30pO1xufVxuXG5mdW5jdGlvbiBnZXRDb250ZW50QXJlYUlkKGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQsIHZpZXdzOiBMaXN0UmVwb3J0Vmlld0RlZmluaXRpb25bXSk6IENvbnRlbnRBcmVhSUQgfCB1bmRlZmluZWQge1xuXHRsZXQgc2luZ2xlVGFibGVJZCA9IFwiXCIsXG5cdFx0c2luZ2xlQ2hhcnRJZCA9IFwiXCI7XG5cdGlmIChcblx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpLmhhc011bHRpcGxlVmlzdWFsaXphdGlvbnMoKSB8fFxuXHRcdGNvbnZlcnRlckNvbnRleHQuZ2V0VGVtcGxhdGVUeXBlKCkgPT09IFRlbXBsYXRlVHlwZS5BbmFseXRpY2FsTGlzdFBhZ2Vcblx0KSB7XG5cdFx0Zm9yIChsZXQgdmlldyBvZiB2aWV3cykge1xuXHRcdFx0dmlldyA9IHZpZXcgYXMgQ29tYmluZWRWaWV3RGVmaW5pdGlvbjtcblx0XHRcdGlmICh2aWV3LmNoYXJ0Q29udHJvbElkICYmIHZpZXcudGFibGVDb250cm9sSWQpIHtcblx0XHRcdFx0c2luZ2xlQ2hhcnRJZCA9IHZpZXcuY2hhcnRDb250cm9sSWQ7XG5cdFx0XHRcdHNpbmdsZVRhYmxlSWQgPSB2aWV3LnRhYmxlQ29udHJvbElkO1xuXHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0c2luZ2xlVGFibGVJZCA9ICh2aWV3c1swXSBhcyBTaW5nbGVWaWV3RGVmaW5pdGlvbikudGFibGVDb250cm9sSWQ7XG5cdH1cblx0aWYgKHNpbmdsZVRhYmxlSWQgfHwgc2luZ2xlQ2hhcnRJZCkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjaGFydElkOiBzaW5nbGVDaGFydElkLFxuXHRcdFx0dGFibGVJZDogc2luZ2xlVGFibGVJZFxuXHRcdH07XG5cdH1cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cbiJdfQ==