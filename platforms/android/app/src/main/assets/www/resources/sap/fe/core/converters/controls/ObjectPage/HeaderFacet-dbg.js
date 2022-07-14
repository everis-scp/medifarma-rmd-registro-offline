/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/helpers/ConfigurableObject", "sap/fe/core/converters/helpers/ID", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/Key", "../Common/Form", "sap/fe/core/converters/annotations/DataField", "../../../helpers/StableIdHelper"], function (ConfigurableObject, ID, BindingExpression, Key, Form, DataField, StableIdHelper) {
  "use strict";

  var _exports = {};
  var generate = StableIdHelper.generate;
  var getSemanticObjectPath = DataField.getSemanticObjectPath;
  var getFormElementsFromManifest = Form.getFormElementsFromManifest;
  var FormElementType = Form.FormElementType;
  var KeyHelper = Key.KeyHelper;
  var not = BindingExpression.not;
  var equal = BindingExpression.equal;
  var compileBinding = BindingExpression.compileBinding;
  var annotationExpression = BindingExpression.annotationExpression;
  var HeaderFacetID = ID.HeaderFacetID;
  var HeaderFacetFormID = ID.HeaderFacetFormID;
  var HeaderFacetContainerID = ID.HeaderFacetContainerID;
  var CustomHeaderFacetID = ID.CustomHeaderFacetID;
  var Placement = ConfigurableObject.Placement;
  var insertCustomElements = ConfigurableObject.insertCustomElements;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  // region definitions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Definitions: Header Facet Types, Generic OP Header Facet, Manifest Properties for Custom Header Facet
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  var HeaderFacetType;

  (function (HeaderFacetType) {
    HeaderFacetType["Annotation"] = "Annotation";
    HeaderFacetType["XMLFragment"] = "XMLFragment";
  })(HeaderFacetType || (HeaderFacetType = {}));

  _exports.HeaderFacetType = HeaderFacetType;
  var FacetType;

  (function (FacetType) {
    FacetType["Reference"] = "Reference";
    FacetType["Collection"] = "Collection";
  })(FacetType || (FacetType = {}));

  _exports.FacetType = FacetType;
  var FlexDesignTimeType;

  (function (FlexDesignTimeType) {
    FlexDesignTimeType["Default"] = "Default";
    FlexDesignTimeType["NotAdaptable"] = "not-adaptable";
    FlexDesignTimeType["NotAdaptableTree"] = "not-adaptable-tree";
    FlexDesignTimeType["NotAdaptableVisibility"] = "not-adaptable-visibility";
  })(FlexDesignTimeType || (FlexDesignTimeType = {}));

  _exports.FlexDesignTimeType = FlexDesignTimeType;
  var HeaderDataPointType;

  (function (HeaderDataPointType) {
    HeaderDataPointType["ProgressIndicator"] = "ProgressIndicator";
    HeaderDataPointType["RatingIndicator"] = "RatingIndicator";
    HeaderDataPointType["Content"] = "Content";
  })(HeaderDataPointType || (HeaderDataPointType = {}));

  var TargetAnnotationType;

  (function (TargetAnnotationType) {
    TargetAnnotationType["None"] = "None";
    TargetAnnotationType["DataPoint"] = "DataPoint";
    TargetAnnotationType["Chart"] = "Chart";
    TargetAnnotationType["Identification"] = "Identification";
    TargetAnnotationType["Contact"] = "Contact";
    TargetAnnotationType["Address"] = "Address";
    TargetAnnotationType["FieldGroup"] = "FieldGroup";
  })(TargetAnnotationType || (TargetAnnotationType = {}));

  // endregion definitions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Collect All Header Facets: Custom (via Manifest) and Annotation Based (via Metamodel)
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  /**
   * Retrieve header facets from annotations.
   *
   * @param {ConverterContext} converterContext
   *
   * @returns {ObjectPageHeaderFacet} Header facets from annotations
   */
  function getHeaderFacetsFromAnnotations(converterContext) {
    var _converterContext$get, _converterContext$get2, _converterContext$get3;

    var headerFacets = [];
    (_converterContext$get = converterContext.getEntityType().annotations) === null || _converterContext$get === void 0 ? void 0 : (_converterContext$get2 = _converterContext$get.UI) === null || _converterContext$get2 === void 0 ? void 0 : (_converterContext$get3 = _converterContext$get2.HeaderFacets) === null || _converterContext$get3 === void 0 ? void 0 : _converterContext$get3.forEach(function (facet) {
      var headerFacet = createHeaderFacet(facet, converterContext);

      if (headerFacet) {
        headerFacets.push(headerFacet);
      }
    });
    return headerFacets;
  }
  /**
   * Retrieve custom header facets from manifest.
   *
   * @param {ConfigurableRecord<ManifestHeaderFacet>} manifestCustomHeaderFacets
   *
   * @returns {Record<string, CustomObjectPageHeaderFacet>} HeaderFacets from manifest
   */


  _exports.getHeaderFacetsFromAnnotations = getHeaderFacetsFromAnnotations;

  function getHeaderFacetsFromManifest(manifestCustomHeaderFacets) {
    var customHeaderFacets = {};
    Object.keys(manifestCustomHeaderFacets).forEach(function (manifestHeaderFacetKey) {
      var customHeaderFacet = manifestCustomHeaderFacets[manifestHeaderFacetKey];
      customHeaderFacets[manifestHeaderFacetKey] = createCustomHeaderFacet(customHeaderFacet, manifestHeaderFacetKey);
    });
    return customHeaderFacets;
  }
  /**
   * Retrieve stashed settings for header facets from manifest.
   *
   * @param {FacetTypes} facetDefinition
   * @param {FacetTypes} collectionFacetDefinition
   * @param {ConverterContext} converterContext
   *
   * @returns {boolean} Stashed setting for header facet or false
   */


  _exports.getHeaderFacetsFromManifest = getHeaderFacetsFromManifest;

  function getStashedSettingsForHeaderFacet(facetDefinition, collectionFacetDefinition, converterContext) {
    var _headerFacetsControlC;

    // When a HeaderFacet is nested inside a CollectionFacet, stashing is not supported
    if (facetDefinition.$Type === "com.sap.vocabularies.UI.v1.ReferenceFacet" && collectionFacetDefinition.$Type === "com.sap.vocabularies.UI.v1.CollectionFacet") {
      return false;
    }

    var headerFacetID = generate([{
      Facet: facetDefinition
    }]);
    var headerFacetsControlConfig = converterContext.getManifestWrapper().getHeaderFacets();
    var stashedSetting = (_headerFacetsControlC = headerFacetsControlConfig[headerFacetID]) === null || _headerFacetsControlC === void 0 ? void 0 : _headerFacetsControlC.stashed;
    return stashedSetting === true;
  }
  /**
   * Retrieve flexibility designtime settings from manifest.
   *
   * @param {FacetTypes} facetDefinition
   * @param {FacetTypes} collectionFacetDefinition
   * @param {ConverterContext} converterContext
   *
   * @returns {FlexDesignTimeType} Designtime setting or default
   */


  _exports.getStashedSettingsForHeaderFacet = getStashedSettingsForHeaderFacet;

  function getDesignTimeMetadataSettingsForHeaderFacet(facetDefinition, collectionFacetDefinition, converterContext) {
    var designTimeMetadata = FlexDesignTimeType.Default;
    var headerFacetID = generate([{
      Facet: facetDefinition
    }]); // For HeaderFacets nested inside CollectionFacet RTA should be disabled, therefore set to "not-adaptable-tree"

    if (facetDefinition.$Type === "com.sap.vocabularies.UI.v1.ReferenceFacet" && collectionFacetDefinition.$Type === "com.sap.vocabularies.UI.v1.CollectionFacet") {
      designTimeMetadata = FlexDesignTimeType.NotAdaptableTree;
    } else {
      var headerFacetsControlConfig = converterContext.getManifestWrapper().getHeaderFacets();

      if (headerFacetID) {
        var _headerFacetsControlC2, _headerFacetsControlC3;

        var designTime = (_headerFacetsControlC2 = headerFacetsControlConfig[headerFacetID]) === null || _headerFacetsControlC2 === void 0 ? void 0 : (_headerFacetsControlC3 = _headerFacetsControlC2.flexSettings) === null || _headerFacetsControlC3 === void 0 ? void 0 : _headerFacetsControlC3.designtime;

        switch (designTime) {
          case FlexDesignTimeType.NotAdaptable:
          case FlexDesignTimeType.NotAdaptableTree:
          case FlexDesignTimeType.NotAdaptableVisibility:
            designTimeMetadata = designTime;
        }
      }
    }

    return designTimeMetadata;
  } ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Convert & Build Annotation Based Header Facets
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  _exports.getDesignTimeMetadataSettingsForHeaderFacet = getDesignTimeMetadataSettingsForHeaderFacet;

  function createReferenceHeaderFacet(facetDefinition, collectionFacetDefinition, converterContext) {
    var _facetDefinition$anno, _facetDefinition$anno2, _facetDefinition$anno3;

    if (facetDefinition.$Type === "com.sap.vocabularies.UI.v1.ReferenceFacet" && !(((_facetDefinition$anno = facetDefinition.annotations) === null || _facetDefinition$anno === void 0 ? void 0 : (_facetDefinition$anno2 = _facetDefinition$anno.UI) === null || _facetDefinition$anno2 === void 0 ? void 0 : (_facetDefinition$anno3 = _facetDefinition$anno2.Hidden) === null || _facetDefinition$anno3 === void 0 ? void 0 : _facetDefinition$anno3.valueOf()) === true)) {
      var _annotations$UI, _annotations$UI$Hidde;

      var headerFacetID = HeaderFacetID({
        Facet: facetDefinition
      }),
          getHeaderFacetKey = function (facetDefinition, fallback) {
        var _facetDefinition$ID, _facetDefinition$Labe;

        return ((_facetDefinition$ID = facetDefinition.ID) === null || _facetDefinition$ID === void 0 ? void 0 : _facetDefinition$ID.toString()) || ((_facetDefinition$Labe = facetDefinition.Label) === null || _facetDefinition$Labe === void 0 ? void 0 : _facetDefinition$Labe.toString()) || fallback;
      },
          targetAnnotationValue = facetDefinition.Target.value,
          targetAnnotationType = getTargetAnnotationType(facetDefinition);

      var headerFormData;
      var headerDataPointData;

      switch (targetAnnotationType) {
        case TargetAnnotationType.FieldGroup:
          headerFormData = getFieldGroupFormData(facetDefinition, converterContext);
          break;

        case TargetAnnotationType.DataPoint:
          headerDataPointData = getDataPointData(facetDefinition);
          break;
        // ToDo: Handle other cases
      }

      var annotations = facetDefinition.annotations;
      return {
        type: HeaderFacetType.Annotation,
        facetType: FacetType.Reference,
        id: headerFacetID,
        containerId: HeaderFacetContainerID({
          Facet: facetDefinition
        }),
        key: getHeaderFacetKey(facetDefinition, headerFacetID),
        flexSettings: {
          designtime: getDesignTimeMetadataSettingsForHeaderFacet(facetDefinition, collectionFacetDefinition, converterContext)
        },
        stashed: getStashedSettingsForHeaderFacet(facetDefinition, collectionFacetDefinition, converterContext),
        visible: compileBinding(not(equal(annotationExpression(annotations === null || annotations === void 0 ? void 0 : (_annotations$UI = annotations.UI) === null || _annotations$UI === void 0 ? void 0 : (_annotations$UI$Hidde = _annotations$UI.Hidden) === null || _annotations$UI$Hidde === void 0 ? void 0 : _annotations$UI$Hidde.valueOf()), true))),
        annotationPath: converterContext.getEntitySetBasedAnnotationPath(facetDefinition.fullyQualifiedName) + "/",
        targetAnnotationValue: targetAnnotationValue,
        targetAnnotationType: targetAnnotationType,
        headerFormData: headerFormData,
        headerDataPointData: headerDataPointData
      };
    }

    return undefined;
  }

  function createCollectionHeaderFacet(collectionFacetDefinition, converterContext) {
    if (collectionFacetDefinition.$Type === "com.sap.vocabularies.UI.v1.CollectionFacet") {
      var _collectionFacetDefin, _collectionFacetDefin2, _collectionFacetDefin3;

      var facets = [],
          headerFacetID = HeaderFacetID({
        Facet: collectionFacetDefinition
      }),
          getHeaderFacetKey = function (facetDefinition, fallback) {
        var _facetDefinition$ID2, _facetDefinition$Labe2;

        return ((_facetDefinition$ID2 = facetDefinition.ID) === null || _facetDefinition$ID2 === void 0 ? void 0 : _facetDefinition$ID2.toString()) || ((_facetDefinition$Labe2 = facetDefinition.Label) === null || _facetDefinition$Labe2 === void 0 ? void 0 : _facetDefinition$Labe2.toString()) || fallback;
      };

      collectionFacetDefinition.Facets.forEach(function (facetDefinition) {
        var facet = createReferenceHeaderFacet(facetDefinition, collectionFacetDefinition, converterContext);

        if (facet) {
          facets.push(facet);
        }
      });
      return {
        type: HeaderFacetType.Annotation,
        facetType: FacetType.Collection,
        id: headerFacetID,
        containerId: HeaderFacetContainerID({
          Facet: collectionFacetDefinition
        }),
        key: getHeaderFacetKey(collectionFacetDefinition, headerFacetID),
        flexSettings: {
          designtime: getDesignTimeMetadataSettingsForHeaderFacet(collectionFacetDefinition, collectionFacetDefinition, converterContext)
        },
        stashed: getStashedSettingsForHeaderFacet(collectionFacetDefinition, collectionFacetDefinition, converterContext),
        visible: compileBinding(not(equal(annotationExpression((_collectionFacetDefin = collectionFacetDefinition.annotations) === null || _collectionFacetDefin === void 0 ? void 0 : (_collectionFacetDefin2 = _collectionFacetDefin.UI) === null || _collectionFacetDefin2 === void 0 ? void 0 : (_collectionFacetDefin3 = _collectionFacetDefin2.Hidden) === null || _collectionFacetDefin3 === void 0 ? void 0 : _collectionFacetDefin3.valueOf()), true))),
        annotationPath: converterContext.getEntitySetBasedAnnotationPath(collectionFacetDefinition.fullyQualifiedName) + "/",
        facets: facets
      };
    }

    return undefined;
  }

  function getTargetAnnotationType(facetDefinition) {
    var annotationType = TargetAnnotationType.None;
    var annotationTypeMap = {
      "com.sap.vocabularies.UI.v1.DataPoint": TargetAnnotationType.DataPoint,
      "com.sap.vocabularies.UI.v1.Chart": TargetAnnotationType.Chart,
      "com.sap.vocabularies.UI.v1.Identification": TargetAnnotationType.Identification,
      "com.sap.vocabularies.Communication.v1.Contact": TargetAnnotationType.Contact,
      "com.sap.vocabularies.Communication.v1.Address": TargetAnnotationType.Address,
      "com.sap.vocabularies.UI.v1.FieldGroup": TargetAnnotationType.FieldGroup
    }; // ReferenceURLFacet and CollectionFacet do not have Target property.

    if (facetDefinition.$Type !== "com.sap.vocabularies.UI.v1.ReferenceURLFacet" && facetDefinition.$Type !== "com.sap.vocabularies.UI.v1.CollectionFacet") {
      var _facetDefinition$Targ, _facetDefinition$Targ2;

      annotationType = annotationTypeMap[(_facetDefinition$Targ = facetDefinition.Target) === null || _facetDefinition$Targ === void 0 ? void 0 : (_facetDefinition$Targ2 = _facetDefinition$Targ.$target) === null || _facetDefinition$Targ2 === void 0 ? void 0 : _facetDefinition$Targ2.term] || TargetAnnotationType.None;
    }

    return annotationType;
  }

  function getFieldGroupFormData(facetDefinition, converterContext) {
    var _facetDefinition$Labe3;

    // split in this from annotation + getFieldGroupFromDefault
    if (!facetDefinition) {
      throw new Error("Cannot get FieldGroup form data without facet definition");
    }

    var formElements = insertCustomElements(getFormElementsFromAnnotations(facetDefinition, converterContext), getFormElementsFromManifest(facetDefinition, converterContext));
    return {
      id: HeaderFacetFormID({
        Facet: facetDefinition
      }),
      label: (_facetDefinition$Labe3 = facetDefinition.Label) === null || _facetDefinition$Labe3 === void 0 ? void 0 : _facetDefinition$Labe3.toString(),
      formElements: formElements
    };
  }
  /**
   * Creates an array of manifest-based FormElements.
   *
   * @param {FacetType} facetDefinition The definition of the facet
   * @param {ConverterContext} converterContext The converter context for the facet
   *
   * @returns {Array} Annotation-based FormElements
   */


  function getFormElementsFromAnnotations(facetDefinition, converterContext) {
    var annotationBasedFormElements = []; // ReferenceURLFacet and CollectionFacet do not have Target property.

    if (facetDefinition.$Type !== "com.sap.vocabularies.UI.v1.ReferenceURLFacet" && facetDefinition.$Type !== "com.sap.vocabularies.UI.v1.CollectionFacet") {
      var _ref, _facetDefinition$Targ3;

      (_ref = (_facetDefinition$Targ3 = facetDefinition.Target) === null || _facetDefinition$Targ3 === void 0 ? void 0 : _facetDefinition$Targ3.$target) === null || _ref === void 0 ? void 0 : _ref.Data.forEach(function (dataField) {
        var _dataField$annotation, _dataField$annotation2, _dataField$annotation3;

        if (!(((_dataField$annotation = dataField.annotations) === null || _dataField$annotation === void 0 ? void 0 : (_dataField$annotation2 = _dataField$annotation.UI) === null || _dataField$annotation2 === void 0 ? void 0 : (_dataField$annotation3 = _dataField$annotation2.Hidden) === null || _dataField$annotation3 === void 0 ? void 0 : _dataField$annotation3.valueOf()) === true)) {
          var semanticObjectAnnotationPath = getSemanticObjectPath(converterContext, dataField);

          if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataField" || dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithUrl" || dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath") {
            var _dataField$Value, _dataField$Value$$tar, _dataField$Value$$tar2, _dataField$Value$$tar3, _dataField$Value$$tar4, _annotations$UI2, _annotations$UI2$Hidd, _dataField$Value2, _dataField$Value2$$ta, _dataField$Value2$$ta2, _dataField$Value2$$ta3;

            var annotations = dataField.annotations;
            annotationBasedFormElements.push({
              isValueMultilineText: ((_dataField$Value = dataField.Value) === null || _dataField$Value === void 0 ? void 0 : (_dataField$Value$$tar = _dataField$Value.$target) === null || _dataField$Value$$tar === void 0 ? void 0 : (_dataField$Value$$tar2 = _dataField$Value$$tar.annotations) === null || _dataField$Value$$tar2 === void 0 ? void 0 : (_dataField$Value$$tar3 = _dataField$Value$$tar2.UI) === null || _dataField$Value$$tar3 === void 0 ? void 0 : (_dataField$Value$$tar4 = _dataField$Value$$tar3.MultiLineText) === null || _dataField$Value$$tar4 === void 0 ? void 0 : _dataField$Value$$tar4.valueOf()) === true,
              type: FormElementType.Annotation,
              key: KeyHelper.generateKeyFromDataField(dataField),
              visible: compileBinding(not(equal(annotationExpression(annotations === null || annotations === void 0 ? void 0 : (_annotations$UI2 = annotations.UI) === null || _annotations$UI2 === void 0 ? void 0 : (_annotations$UI2$Hidd = _annotations$UI2.Hidden) === null || _annotations$UI2$Hidd === void 0 ? void 0 : _annotations$UI2$Hidd.valueOf()), true))),
              label: ((_dataField$Value2 = dataField.Value) === null || _dataField$Value2 === void 0 ? void 0 : (_dataField$Value2$$ta = _dataField$Value2.$target) === null || _dataField$Value2$$ta === void 0 ? void 0 : (_dataField$Value2$$ta2 = _dataField$Value2$$ta.annotations) === null || _dataField$Value2$$ta2 === void 0 ? void 0 : (_dataField$Value2$$ta3 = _dataField$Value2$$ta2.Common) === null || _dataField$Value2$$ta3 === void 0 ? void 0 : _dataField$Value2$$ta3.Label) || dataField.Label,
              idPrefix: HeaderFacetFormID({
                Facet: facetDefinition
              }, dataField),
              annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName) + "/",
              semanticObjectPath: semanticObjectAnnotationPath
            });
          } else if (dataField.$Type === "com.sap.vocabularies.UI.v1.DataFieldForAnnotation") {
            var _ref2, _ref2$MultiLineText, _dataField$Target, _dataField$Target$$ta, _dataField$Target$$ta2, _annotations$UI3, _annotations$UI3$Hidd, _dataField$Target2, _dataField$Target2$$t, _dataField$Target2$$t2, _dataField$Target2$$t3, _dataField$Target2$$t4, _dataField$Label;

            var _annotations = dataField.annotations;
            annotationBasedFormElements.push({
              // FIXME this is wrong
              isValueMultilineText: ((_ref2 = (_dataField$Target = dataField.Target) === null || _dataField$Target === void 0 ? void 0 : (_dataField$Target$$ta = _dataField$Target.$target) === null || _dataField$Target$$ta === void 0 ? void 0 : (_dataField$Target$$ta2 = _dataField$Target$$ta.annotations) === null || _dataField$Target$$ta2 === void 0 ? void 0 : _dataField$Target$$ta2.UI) === null || _ref2 === void 0 ? void 0 : (_ref2$MultiLineText = _ref2.MultiLineText) === null || _ref2$MultiLineText === void 0 ? void 0 : _ref2$MultiLineText.valueOf()) === true,
              type: FormElementType.Annotation,
              key: KeyHelper.generateKeyFromDataField(dataField),
              visible: compileBinding(not(equal(annotationExpression(_annotations === null || _annotations === void 0 ? void 0 : (_annotations$UI3 = _annotations.UI) === null || _annotations$UI3 === void 0 ? void 0 : (_annotations$UI3$Hidd = _annotations$UI3.Hidden) === null || _annotations$UI3$Hidd === void 0 ? void 0 : _annotations$UI3$Hidd.valueOf()), true))),
              label: ((_dataField$Target2 = dataField.Target) === null || _dataField$Target2 === void 0 ? void 0 : (_dataField$Target2$$t = _dataField$Target2.$target) === null || _dataField$Target2$$t === void 0 ? void 0 : (_dataField$Target2$$t2 = _dataField$Target2$$t.annotations) === null || _dataField$Target2$$t2 === void 0 ? void 0 : (_dataField$Target2$$t3 = _dataField$Target2$$t2.Common) === null || _dataField$Target2$$t3 === void 0 ? void 0 : (_dataField$Target2$$t4 = _dataField$Target2$$t3.Label) === null || _dataField$Target2$$t4 === void 0 ? void 0 : _dataField$Target2$$t4.toString()) || ((_dataField$Label = dataField.Label) === null || _dataField$Label === void 0 ? void 0 : _dataField$Label.toString()),
              idPrefix: HeaderFacetFormID({
                Facet: facetDefinition
              }, dataField),
              annotationPath: converterContext.getEntitySetBasedAnnotationPath(dataField.fullyQualifiedName) + "/",
              semanticObjectPath: semanticObjectAnnotationPath
            });
          }
        }
      });
    }

    return annotationBasedFormElements;
  }

  function getDataPointData(facetDefinition) {
    var type = HeaderDataPointType.Content;

    if (facetDefinition.$Type === "com.sap.vocabularies.UI.v1.ReferenceFacet") {
      var _ref3, _facetDefinition$Targ4, _ref4, _facetDefinition$Targ5;

      if (((_ref3 = (_facetDefinition$Targ4 = facetDefinition.Target) === null || _facetDefinition$Targ4 === void 0 ? void 0 : _facetDefinition$Targ4.$target) === null || _ref3 === void 0 ? void 0 : _ref3.Visualization) === "UI.VisualizationType/Progress") {
        type = HeaderDataPointType.ProgressIndicator;
      } else if (((_ref4 = (_facetDefinition$Targ5 = facetDefinition.Target) === null || _facetDefinition$Targ5 === void 0 ? void 0 : _facetDefinition$Targ5.$target) === null || _ref4 === void 0 ? void 0 : _ref4.Visualization) === "UI.VisualizationType/Rating") {
        type = HeaderDataPointType.RatingIndicator;
      }
    }

    return {
      type: type
    };
  }
  /**
   * Creates an annotation-based header facet.
   *
   * @param {FacetTypes} facetDefinition The definition of the facet
   * @param {ConverterContext} converterContext The converter context
   *
   * @returns {ObjectPageHeaderFacet} The created annotation-based header facet
   */


  function createHeaderFacet(facetDefinition, converterContext) {
    var headerFacet;

    switch (facetDefinition.$Type) {
      case "com.sap.vocabularies.UI.v1.ReferenceFacet":
        headerFacet = createReferenceHeaderFacet(facetDefinition, facetDefinition, converterContext);
        break;

      case "com.sap.vocabularies.UI.v1.CollectionFacet":
        headerFacet = createCollectionHeaderFacet(facetDefinition, converterContext);
        break;
    }

    return headerFacet;
  } ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // Convert & Build Manifest Based Header Facets
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  function generateBinding(requestGroupId) {
    if (!requestGroupId) {
      return undefined;
    }

    var groupId = ["Heroes", "Decoration", "Workers", "LongRunners"].indexOf(requestGroupId) !== -1 ? "$auto." + requestGroupId : requestGroupId;
    return "{ path : '', parameters : { $$groupId : '" + groupId + "' } }";
  }
  /**
   * Create a manifest based custom header facet.
   *
   * @param {ManifestHeaderFacet} customHeaderFacetDefinition
   * @param {string} headerFacetKey
   *
   * @returns {CustomObjectPageHeaderFacet} The manifest based custom header facet created
   */


  function createCustomHeaderFacet(customHeaderFacetDefinition, headerFacetKey) {
    var customHeaderFacetID = CustomHeaderFacetID(headerFacetKey);
    var position = customHeaderFacetDefinition.position;

    if (!position) {
      position = {
        placement: Placement.After
      };
    } // TODO for an non annotation fragment the name is mandatory -> Not checked


    return {
      facetType: FacetType.Reference,
      facets: [],
      type: customHeaderFacetDefinition.type,
      id: customHeaderFacetID,
      containerId: customHeaderFacetID,
      key: headerFacetKey,
      position: position,
      visible: customHeaderFacetDefinition.visible,
      fragmentName: customHeaderFacetDefinition.template || customHeaderFacetDefinition.name,
      title: customHeaderFacetDefinition.title,
      subTitle: customHeaderFacetDefinition.subTitle,
      stashed: customHeaderFacetDefinition.stashed || false,
      flexSettings: _objectSpread({}, {
        designtime: FlexDesignTimeType.Default
      }, {}, customHeaderFacetDefinition.flexSettings),
      binding: generateBinding(customHeaderFacetDefinition.requestGroupId),
      templateEdit: customHeaderFacetDefinition.templateEdit
    };
  }

  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkhlYWRlckZhY2V0LnRzIl0sIm5hbWVzIjpbIkhlYWRlckZhY2V0VHlwZSIsIkZhY2V0VHlwZSIsIkZsZXhEZXNpZ25UaW1lVHlwZSIsIkhlYWRlckRhdGFQb2ludFR5cGUiLCJUYXJnZXRBbm5vdGF0aW9uVHlwZSIsImdldEhlYWRlckZhY2V0c0Zyb21Bbm5vdGF0aW9ucyIsImNvbnZlcnRlckNvbnRleHQiLCJoZWFkZXJGYWNldHMiLCJnZXRFbnRpdHlUeXBlIiwiYW5ub3RhdGlvbnMiLCJVSSIsIkhlYWRlckZhY2V0cyIsImZvckVhY2giLCJmYWNldCIsImhlYWRlckZhY2V0IiwiY3JlYXRlSGVhZGVyRmFjZXQiLCJwdXNoIiwiZ2V0SGVhZGVyRmFjZXRzRnJvbU1hbmlmZXN0IiwibWFuaWZlc3RDdXN0b21IZWFkZXJGYWNldHMiLCJjdXN0b21IZWFkZXJGYWNldHMiLCJPYmplY3QiLCJrZXlzIiwibWFuaWZlc3RIZWFkZXJGYWNldEtleSIsImN1c3RvbUhlYWRlckZhY2V0IiwiY3JlYXRlQ3VzdG9tSGVhZGVyRmFjZXQiLCJnZXRTdGFzaGVkU2V0dGluZ3NGb3JIZWFkZXJGYWNldCIsImZhY2V0RGVmaW5pdGlvbiIsImNvbGxlY3Rpb25GYWNldERlZmluaXRpb24iLCIkVHlwZSIsImhlYWRlckZhY2V0SUQiLCJnZW5lcmF0ZSIsIkZhY2V0IiwiaGVhZGVyRmFjZXRzQ29udHJvbENvbmZpZyIsImdldE1hbmlmZXN0V3JhcHBlciIsImdldEhlYWRlckZhY2V0cyIsInN0YXNoZWRTZXR0aW5nIiwic3Rhc2hlZCIsImdldERlc2lnblRpbWVNZXRhZGF0YVNldHRpbmdzRm9ySGVhZGVyRmFjZXQiLCJkZXNpZ25UaW1lTWV0YWRhdGEiLCJEZWZhdWx0IiwiTm90QWRhcHRhYmxlVHJlZSIsImRlc2lnblRpbWUiLCJmbGV4U2V0dGluZ3MiLCJkZXNpZ250aW1lIiwiTm90QWRhcHRhYmxlIiwiTm90QWRhcHRhYmxlVmlzaWJpbGl0eSIsImNyZWF0ZVJlZmVyZW5jZUhlYWRlckZhY2V0IiwiSGlkZGVuIiwidmFsdWVPZiIsIkhlYWRlckZhY2V0SUQiLCJnZXRIZWFkZXJGYWNldEtleSIsImZhbGxiYWNrIiwiSUQiLCJ0b1N0cmluZyIsIkxhYmVsIiwidGFyZ2V0QW5ub3RhdGlvblZhbHVlIiwiVGFyZ2V0IiwidmFsdWUiLCJ0YXJnZXRBbm5vdGF0aW9uVHlwZSIsImdldFRhcmdldEFubm90YXRpb25UeXBlIiwiaGVhZGVyRm9ybURhdGEiLCJoZWFkZXJEYXRhUG9pbnREYXRhIiwiRmllbGRHcm91cCIsImdldEZpZWxkR3JvdXBGb3JtRGF0YSIsIkRhdGFQb2ludCIsImdldERhdGFQb2ludERhdGEiLCJ0eXBlIiwiQW5ub3RhdGlvbiIsImZhY2V0VHlwZSIsIlJlZmVyZW5jZSIsImlkIiwiY29udGFpbmVySWQiLCJIZWFkZXJGYWNldENvbnRhaW5lcklEIiwia2V5IiwidmlzaWJsZSIsImNvbXBpbGVCaW5kaW5nIiwibm90IiwiZXF1YWwiLCJhbm5vdGF0aW9uRXhwcmVzc2lvbiIsImFubm90YXRpb25QYXRoIiwiZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aCIsImZ1bGx5UXVhbGlmaWVkTmFtZSIsInVuZGVmaW5lZCIsImNyZWF0ZUNvbGxlY3Rpb25IZWFkZXJGYWNldCIsImZhY2V0cyIsIkZhY2V0cyIsIkNvbGxlY3Rpb24iLCJhbm5vdGF0aW9uVHlwZSIsIk5vbmUiLCJhbm5vdGF0aW9uVHlwZU1hcCIsIkNoYXJ0IiwiSWRlbnRpZmljYXRpb24iLCJDb250YWN0IiwiQWRkcmVzcyIsIiR0YXJnZXQiLCJ0ZXJtIiwiRXJyb3IiLCJmb3JtRWxlbWVudHMiLCJpbnNlcnRDdXN0b21FbGVtZW50cyIsImdldEZvcm1FbGVtZW50c0Zyb21Bbm5vdGF0aW9ucyIsImdldEZvcm1FbGVtZW50c0Zyb21NYW5pZmVzdCIsIkhlYWRlckZhY2V0Rm9ybUlEIiwibGFiZWwiLCJhbm5vdGF0aW9uQmFzZWRGb3JtRWxlbWVudHMiLCJEYXRhIiwiZGF0YUZpZWxkIiwic2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aCIsImdldFNlbWFudGljT2JqZWN0UGF0aCIsImlzVmFsdWVNdWx0aWxpbmVUZXh0IiwiVmFsdWUiLCJNdWx0aUxpbmVUZXh0IiwiRm9ybUVsZW1lbnRUeXBlIiwiS2V5SGVscGVyIiwiZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkIiwiQ29tbW9uIiwiaWRQcmVmaXgiLCJzZW1hbnRpY09iamVjdFBhdGgiLCJDb250ZW50IiwiVmlzdWFsaXphdGlvbiIsIlByb2dyZXNzSW5kaWNhdG9yIiwiUmF0aW5nSW5kaWNhdG9yIiwiZ2VuZXJhdGVCaW5kaW5nIiwicmVxdWVzdEdyb3VwSWQiLCJncm91cElkIiwiaW5kZXhPZiIsImN1c3RvbUhlYWRlckZhY2V0RGVmaW5pdGlvbiIsImhlYWRlckZhY2V0S2V5IiwiY3VzdG9tSGVhZGVyRmFjZXRJRCIsIkN1c3RvbUhlYWRlckZhY2V0SUQiLCJwb3NpdGlvbiIsInBsYWNlbWVudCIsIlBsYWNlbWVudCIsIkFmdGVyIiwiZnJhZ21lbnROYW1lIiwidGVtcGxhdGUiLCJuYW1lIiwidGl0bGUiLCJzdWJUaXRsZSIsImJpbmRpbmciLCJ0ZW1wbGF0ZUVkaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQTtBQUNBO0FBQ0E7QUFDQTtNQUVZQSxlOzthQUFBQSxlO0FBQUFBLElBQUFBLGU7QUFBQUEsSUFBQUEsZTtLQUFBQSxlLEtBQUFBLGU7OztNQUtBQyxTOzthQUFBQSxTO0FBQUFBLElBQUFBLFM7QUFBQUEsSUFBQUEsUztLQUFBQSxTLEtBQUFBLFM7OztNQUtBQyxrQjs7YUFBQUEsa0I7QUFBQUEsSUFBQUEsa0I7QUFBQUEsSUFBQUEsa0I7QUFBQUEsSUFBQUEsa0I7QUFBQUEsSUFBQUEsa0I7S0FBQUEsa0IsS0FBQUEsa0I7OztNQWlCUEMsbUI7O2FBQUFBLG1CO0FBQUFBLElBQUFBLG1CO0FBQUFBLElBQUFBLG1CO0FBQUFBLElBQUFBLG1CO0tBQUFBLG1CLEtBQUFBLG1COztN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ZTtBQUNkQSxNQUFBQSxRQUFRLEdBQUc7QUFDVkMsUUFBQUEsU0FBUyxFQUFFQyxTQUFTLENBQUNDO0FBRFgsT0FBWDtBQUdBLEtBUnNJLENBU3ZJOzs7QUFDQSxXQUFPO0FBQ05oRSxNQUFBQSxTQUFTLEVBQUVuRSxTQUFTLENBQUNvRSxTQURmO0FBRU5lLE1BQUFBLE1BQU0sRUFBRSxFQUZGO0FBR05sQixNQUFBQSxJQUFJLEVBQUUyRCwyQkFBMkIsQ0FBQzNELElBSDVCO0FBSU5JLE1BQUFBLEVBQUUsRUFBRXlELG1CQUpFO0FBS054RCxNQUFBQSxXQUFXLEVBQUV3RCxtQkFMUDtBQU1OdEQsTUFBQUEsR0FBRyxFQUFFcUQsY0FOQztBQU9ORyxNQUFBQSxRQUFRLEVBQUVBLFFBUEo7QUFRTnZELE1BQUFBLE9BQU8sRUFBRW1ELDJCQUEyQixDQUFDbkQsT0FSL0I7QUFTTjJELE1BQUFBLFlBQVksRUFBRVIsMkJBQTJCLENBQUNTLFFBQTVCLElBQXdDVCwyQkFBMkIsQ0FBQ1UsSUFUNUU7QUFVTkMsTUFBQUEsS0FBSyxFQUFFWCwyQkFBMkIsQ0FBQ1csS0FWN0I7QUFXTkMsTUFBQUEsUUFBUSxFQUFFWiwyQkFBMkIsQ0FBQ1ksUUFYaEM7QUFZTnJHLE1BQUFBLE9BQU8sRUFBRXlGLDJCQUEyQixDQUFDekYsT0FBNUIsSUFBdUMsS0FaMUM7QUFhTk0sTUFBQUEsWUFBWSxvQkFBTztBQUFFQyxRQUFBQSxVQUFVLEVBQUV6QyxrQkFBa0IsQ0FBQ3FDO0FBQWpDLE9BQVAsTUFBc0RzRiwyQkFBMkIsQ0FBQ25GLFlBQWxGLENBYk47QUFjTmdHLE1BQUFBLE9BQU8sRUFBRWpCLGVBQWUsQ0FBQ0ksMkJBQTJCLENBQUNILGNBQTdCLENBZGxCO0FBZU5pQixNQUFBQSxZQUFZLEVBQUVkLDJCQUEyQixDQUFDYztBQWZwQyxLQUFQO0FBaUJBIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNYW5pZmVzdEhlYWRlckZhY2V0IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvTWFuaWZlc3RTZXR0aW5nc1wiO1xuaW1wb3J0IHtcblx0Q29uZmlndXJhYmxlT2JqZWN0LFxuXHRDb25maWd1cmFibGVSZWNvcmQsXG5cdEN1c3RvbUVsZW1lbnQsXG5cdGluc2VydEN1c3RvbUVsZW1lbnRzLFxuXHRQbGFjZW1lbnQsXG5cdFBvc2l0aW9uXG59IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvQ29uZmlndXJhYmxlT2JqZWN0XCI7XG5pbXBvcnQge1xuXHREYXRhRmllbGRBYnN0cmFjdFR5cGVzLFxuXHREYXRhUG9pbnQsXG5cdEZhY2V0VHlwZXMsXG5cdEZpZWxkR3JvdXAsXG5cdFJlZmVyZW5jZUZhY2V0VHlwZXMsXG5cdFVJQW5ub3RhdGlvblR5cGVzXG59IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IHsgQ3VzdG9tSGVhZGVyRmFjZXRJRCwgSGVhZGVyRmFjZXRDb250YWluZXJJRCwgSGVhZGVyRmFjZXRGb3JtSUQsIEhlYWRlckZhY2V0SUQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0lEXCI7XG5pbXBvcnQgeyBhbm5vdGF0aW9uRXhwcmVzc2lvbiwgQmluZGluZ0V4cHJlc3Npb24sIGNvbXBpbGVCaW5kaW5nLCBlcXVhbCwgbm90IH0gZnJvbSBcInNhcC9mZS9jb3JlL2hlbHBlcnMvQmluZGluZ0V4cHJlc3Npb25cIjtcbmltcG9ydCB7IEtleUhlbHBlciB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvS2V5XCI7XG5pbXBvcnQgeyBBbm5vdGF0aW9uRm9ybUVsZW1lbnQsIEZvcm1FbGVtZW50LCBGb3JtRWxlbWVudFR5cGUsIGdldEZvcm1FbGVtZW50c0Zyb21NYW5pZmVzdCB9IGZyb20gXCIuLi9Db21tb24vRm9ybVwiO1xuaW1wb3J0IHsgZ2V0U2VtYW50aWNPYmplY3RQYXRoIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvYW5ub3RhdGlvbnMvRGF0YUZpZWxkXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gXCIuLi8uLi8uLi9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5pbXBvcnQgQ29udmVydGVyQ29udGV4dCBmcm9tIFwiLi4vLi4vQ29udmVydGVyQ29udGV4dFwiO1xuXG4vLyByZWdpb24gZGVmaW5pdGlvbnNcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gRGVmaW5pdGlvbnM6IEhlYWRlciBGYWNldCBUeXBlcywgR2VuZXJpYyBPUCBIZWFkZXIgRmFjZXQsIE1hbmlmZXN0IFByb3BlcnRpZXMgZm9yIEN1c3RvbSBIZWFkZXIgRmFjZXRcbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuXG5leHBvcnQgZW51bSBIZWFkZXJGYWNldFR5cGUge1xuXHRBbm5vdGF0aW9uID0gXCJBbm5vdGF0aW9uXCIsXG5cdFhNTEZyYWdtZW50ID0gXCJYTUxGcmFnbWVudFwiXG59XG5cbmV4cG9ydCBlbnVtIEZhY2V0VHlwZSB7XG5cdFJlZmVyZW5jZSA9IFwiUmVmZXJlbmNlXCIsXG5cdENvbGxlY3Rpb24gPSBcIkNvbGxlY3Rpb25cIlxufVxuXG5leHBvcnQgZW51bSBGbGV4RGVzaWduVGltZVR5cGUge1xuXHREZWZhdWx0ID0gXCJEZWZhdWx0XCIsXG5cdE5vdEFkYXB0YWJsZSA9IFwibm90LWFkYXB0YWJsZVwiLCAvLyBkaXNhYmxlIGFsbCBhY3Rpb25zIG9uIHRoYXQgaW5zdGFuY2Vcblx0Tm90QWRhcHRhYmxlVHJlZSA9IFwibm90LWFkYXB0YWJsZS10cmVlXCIsIC8vIGRpc2FibGUgYWxsIGFjdGlvbnMgb24gdGhhdCBpbnN0YW5jZSBhbmQgb24gYWxsIGNoaWxkcmVuIG9mIHRoYXQgaW5zdGFuY2Vcblx0Tm90QWRhcHRhYmxlVmlzaWJpbGl0eSA9IFwibm90LWFkYXB0YWJsZS12aXNpYmlsaXR5XCIgLy8gZGlzYWJsZSBhbGwgYWN0aW9ucyB0aGF0IGluZmx1ZW5jZSB0aGUgdmlzaWJpbGl0eSwgbmFtZWx5IHJldmVhbCBhbmQgcmVtb3ZlXG59XG5cbmV4cG9ydCB0eXBlIEZsZXhTZXR0aW5ncyA9IHtcblx0ZGVzaWdudGltZT86IEZsZXhEZXNpZ25UaW1lVHlwZTtcbn07XG5cbnR5cGUgSGVhZGVyRm9ybURhdGEgPSB7XG5cdGlkOiBzdHJpbmc7XG5cdGxhYmVsPzogc3RyaW5nO1xuXHRmb3JtRWxlbWVudHM6IEZvcm1FbGVtZW50W107XG59O1xuXG5lbnVtIEhlYWRlckRhdGFQb2ludFR5cGUge1xuXHRQcm9ncmVzc0luZGljYXRvciA9IFwiUHJvZ3Jlc3NJbmRpY2F0b3JcIixcblx0UmF0aW5nSW5kaWNhdG9yID0gXCJSYXRpbmdJbmRpY2F0b3JcIixcblx0Q29udGVudCA9IFwiQ29udGVudFwiXG59XG5cbnR5cGUgSGVhZGVyRGF0YVBvaW50RGF0YSA9IHtcblx0dHlwZTogSGVhZGVyRGF0YVBvaW50VHlwZTtcbn07XG5cbmVudW0gVGFyZ2V0QW5ub3RhdGlvblR5cGUge1xuXHROb25lID0gXCJOb25lXCIsXG5cdERhdGFQb2ludCA9IFwiRGF0YVBvaW50XCIsXG5cdENoYXJ0ID0gXCJDaGFydFwiLFxuXHRJZGVudGlmaWNhdGlvbiA9IFwiSWRlbnRpZmljYXRpb25cIixcblx0Q29udGFjdCA9IFwiQ29udGFjdFwiLFxuXHRBZGRyZXNzID0gXCJBZGRyZXNzXCIsXG5cdEZpZWxkR3JvdXAgPSBcIkZpZWxkR3JvdXBcIlxufVxuXG50eXBlIEJhc2VIZWFkZXJGYWNldCA9IENvbmZpZ3VyYWJsZU9iamVjdCAmIHtcblx0dHlwZT86IEhlYWRlckZhY2V0VHlwZTsgLy8gTWFuaWZlc3Qgb3IgTWV0YWRhdGFcblx0aWQ6IHN0cmluZztcblx0Y29udGFpbmVySWQ6IHN0cmluZztcblx0YW5ub3RhdGlvblBhdGg/OiBzdHJpbmc7XG5cdGZsZXhTZXR0aW5nczogRmxleFNldHRpbmdzO1xuXHRzdGFzaGVkOiBib29sZWFuO1xuXHR2aXNpYmxlOiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0dGFyZ2V0QW5ub3RhdGlvblZhbHVlPzogc3RyaW5nO1xuXHR0YXJnZXRBbm5vdGF0aW9uVHlwZT86IFRhcmdldEFubm90YXRpb25UeXBlO1xufTtcblxudHlwZSBCYXNlUmVmZXJlbmNlRmFjZXQgPSBCYXNlSGVhZGVyRmFjZXQgJiB7XG5cdGZhY2V0VHlwZTogRmFjZXRUeXBlLlJlZmVyZW5jZTtcbn07XG5cbnR5cGUgRmllbGRHcm91cEZhY2V0ID0gQmFzZVJlZmVyZW5jZUZhY2V0ICYge1xuXHRoZWFkZXJGb3JtRGF0YT86IEhlYWRlckZvcm1EYXRhO1xufTtcblxudHlwZSBEYXRhUG9pbnRGYWNldCA9IEJhc2VSZWZlcmVuY2VGYWNldCAmIHtcblx0aGVhZGVyRGF0YVBvaW50RGF0YT86IEhlYWRlckRhdGFQb2ludERhdGE7XG59O1xuXG50eXBlIFJlZmVyZW5jZUZhY2V0ID0gRmllbGRHcm91cEZhY2V0IHwgRGF0YVBvaW50RmFjZXQ7XG5cbmV4cG9ydCB0eXBlIENvbGxlY3Rpb25GYWNldCA9IEJhc2VIZWFkZXJGYWNldCAmIHtcblx0ZmFjZXRUeXBlOiBGYWNldFR5cGUuQ29sbGVjdGlvbjtcblx0ZmFjZXRzOiBSZWZlcmVuY2VGYWNldFtdO1xufTtcblxuZXhwb3J0IHR5cGUgT2JqZWN0UGFnZUhlYWRlckZhY2V0ID0gUmVmZXJlbmNlRmFjZXQgfCBDb2xsZWN0aW9uRmFjZXQ7XG5cbmV4cG9ydCB0eXBlIEN1c3RvbU9iamVjdFBhZ2VIZWFkZXJGYWNldCA9IEN1c3RvbUVsZW1lbnQ8T2JqZWN0UGFnZUhlYWRlckZhY2V0PiAmIHtcblx0ZnJhZ21lbnROYW1lPzogc3RyaW5nO1xuXHR0aXRsZT86IHN0cmluZztcblx0c3ViVGl0bGU/OiBzdHJpbmc7XG5cdHN0YXNoZWQ/OiBib29sZWFuO1xuXHRiaW5kaW5nPzogc3RyaW5nO1xuXHR0ZW1wbGF0ZUVkaXQ/OiBzdHJpbmc7XG59O1xuXG4vLyBlbmRyZWdpb24gZGVmaW5pdGlvbnNcblxuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBDb2xsZWN0IEFsbCBIZWFkZXIgRmFjZXRzOiBDdXN0b20gKHZpYSBNYW5pZmVzdCkgYW5kIEFubm90YXRpb24gQmFzZWQgKHZpYSBNZXRhbW9kZWwpXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuLyoqXG4gKiBSZXRyaWV2ZSBoZWFkZXIgZmFjZXRzIGZyb20gYW5ub3RhdGlvbnMuXG4gKlxuICogQHBhcmFtIHtDb252ZXJ0ZXJDb250ZXh0fSBjb252ZXJ0ZXJDb250ZXh0XG4gKlxuICogQHJldHVybnMge09iamVjdFBhZ2VIZWFkZXJGYWNldH0gSGVhZGVyIGZhY2V0cyBmcm9tIGFubm90YXRpb25zXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWFkZXJGYWNldHNGcm9tQW5ub3RhdGlvbnMoY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IE9iamVjdFBhZ2VIZWFkZXJGYWNldFtdIHtcblx0Y29uc3QgaGVhZGVyRmFjZXRzOiBPYmplY3RQYWdlSGVhZGVyRmFjZXRbXSA9IFtdO1xuXHRjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKS5hbm5vdGF0aW9ucz8uVUk/LkhlYWRlckZhY2V0cz8uZm9yRWFjaChmYWNldCA9PiB7XG5cdFx0Y29uc3QgaGVhZGVyRmFjZXQ6IE9iamVjdFBhZ2VIZWFkZXJGYWNldCB8IHVuZGVmaW5lZCA9IGNyZWF0ZUhlYWRlckZhY2V0KGZhY2V0LCBjb252ZXJ0ZXJDb250ZXh0KTtcblx0XHRpZiAoaGVhZGVyRmFjZXQpIHtcblx0XHRcdGhlYWRlckZhY2V0cy5wdXNoKGhlYWRlckZhY2V0KTtcblx0XHR9XG5cdH0pO1xuXG5cdHJldHVybiBoZWFkZXJGYWNldHM7XG59XG5cbi8qKlxuICogUmV0cmlldmUgY3VzdG9tIGhlYWRlciBmYWNldHMgZnJvbSBtYW5pZmVzdC5cbiAqXG4gKiBAcGFyYW0ge0NvbmZpZ3VyYWJsZVJlY29yZDxNYW5pZmVzdEhlYWRlckZhY2V0Pn0gbWFuaWZlc3RDdXN0b21IZWFkZXJGYWNldHNcbiAqXG4gKiBAcmV0dXJucyB7UmVjb3JkPHN0cmluZywgQ3VzdG9tT2JqZWN0UGFnZUhlYWRlckZhY2V0Pn0gSGVhZGVyRmFjZXRzIGZyb20gbWFuaWZlc3RcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEhlYWRlckZhY2V0c0Zyb21NYW5pZmVzdChcblx0bWFuaWZlc3RDdXN0b21IZWFkZXJGYWNldHM6IENvbmZpZ3VyYWJsZVJlY29yZDxNYW5pZmVzdEhlYWRlckZhY2V0PlxuKTogUmVjb3JkPHN0cmluZywgQ3VzdG9tT2JqZWN0UGFnZUhlYWRlckZhY2V0PiB7XG5cdGNvbnN0IGN1c3RvbUhlYWRlckZhY2V0czogUmVjb3JkPHN0cmluZywgQ3VzdG9tT2JqZWN0UGFnZUhlYWRlckZhY2V0PiA9IHt9O1xuXG5cdE9iamVjdC5rZXlzKG1hbmlmZXN0Q3VzdG9tSGVhZGVyRmFjZXRzKS5mb3JFYWNoKG1hbmlmZXN0SGVhZGVyRmFjZXRLZXkgPT4ge1xuXHRcdGNvbnN0IGN1c3RvbUhlYWRlckZhY2V0OiBNYW5pZmVzdEhlYWRlckZhY2V0ID0gbWFuaWZlc3RDdXN0b21IZWFkZXJGYWNldHNbbWFuaWZlc3RIZWFkZXJGYWNldEtleV07XG5cdFx0Y3VzdG9tSGVhZGVyRmFjZXRzW21hbmlmZXN0SGVhZGVyRmFjZXRLZXldID0gY3JlYXRlQ3VzdG9tSGVhZGVyRmFjZXQoY3VzdG9tSGVhZGVyRmFjZXQsIG1hbmlmZXN0SGVhZGVyRmFjZXRLZXkpO1xuXHR9KTtcblxuXHRyZXR1cm4gY3VzdG9tSGVhZGVyRmFjZXRzO1xufVxuXG4vKipcbiAqIFJldHJpZXZlIHN0YXNoZWQgc2V0dGluZ3MgZm9yIGhlYWRlciBmYWNldHMgZnJvbSBtYW5pZmVzdC5cbiAqXG4gKiBAcGFyYW0ge0ZhY2V0VHlwZXN9IGZhY2V0RGVmaW5pdGlvblxuICogQHBhcmFtIHtGYWNldFR5cGVzfSBjb2xsZWN0aW9uRmFjZXREZWZpbml0aW9uXG4gKiBAcGFyYW0ge0NvbnZlcnRlckNvbnRleHR9IGNvbnZlcnRlckNvbnRleHRcbiAqXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gU3Rhc2hlZCBzZXR0aW5nIGZvciBoZWFkZXIgZmFjZXQgb3IgZmFsc2VcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldFN0YXNoZWRTZXR0aW5nc0ZvckhlYWRlckZhY2V0KFxuXHRmYWNldERlZmluaXRpb246IEZhY2V0VHlwZXMsXG5cdGNvbGxlY3Rpb25GYWNldERlZmluaXRpb246IEZhY2V0VHlwZXMsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IGJvb2xlYW4ge1xuXHQvLyBXaGVuIGEgSGVhZGVyRmFjZXQgaXMgbmVzdGVkIGluc2lkZSBhIENvbGxlY3Rpb25GYWNldCwgc3Rhc2hpbmcgaXMgbm90IHN1cHBvcnRlZFxuXHRpZiAoXG5cdFx0ZmFjZXREZWZpbml0aW9uLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5SZWZlcmVuY2VGYWNldCAmJlxuXHRcdGNvbGxlY3Rpb25GYWNldERlZmluaXRpb24uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkNvbGxlY3Rpb25GYWNldFxuXHQpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblx0Y29uc3QgaGVhZGVyRmFjZXRJRCA9IGdlbmVyYXRlKFt7IEZhY2V0OiBmYWNldERlZmluaXRpb24gfV0pO1xuXHRjb25zdCBoZWFkZXJGYWNldHNDb250cm9sQ29uZmlnID0gY29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5nZXRIZWFkZXJGYWNldHMoKTtcblx0Y29uc3Qgc3Rhc2hlZFNldHRpbmcgPSBoZWFkZXJGYWNldHNDb250cm9sQ29uZmlnW2hlYWRlckZhY2V0SURdPy5zdGFzaGVkO1xuXHRyZXR1cm4gc3Rhc2hlZFNldHRpbmcgPT09IHRydWU7XG59XG5cbi8qKlxuICogUmV0cmlldmUgZmxleGliaWxpdHkgZGVzaWdudGltZSBzZXR0aW5ncyBmcm9tIG1hbmlmZXN0LlxuICpcbiAqIEBwYXJhbSB7RmFjZXRUeXBlc30gZmFjZXREZWZpbml0aW9uXG4gKiBAcGFyYW0ge0ZhY2V0VHlwZXN9IGNvbGxlY3Rpb25GYWNldERlZmluaXRpb25cbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dFxuICpcbiAqIEByZXR1cm5zIHtGbGV4RGVzaWduVGltZVR5cGV9IERlc2lnbnRpbWUgc2V0dGluZyBvciBkZWZhdWx0XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBnZXREZXNpZ25UaW1lTWV0YWRhdGFTZXR0aW5nc0ZvckhlYWRlckZhY2V0KFxuXHRmYWNldERlZmluaXRpb246IEZhY2V0VHlwZXMsXG5cdGNvbGxlY3Rpb25GYWNldERlZmluaXRpb246IEZhY2V0VHlwZXMsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IEZsZXhEZXNpZ25UaW1lVHlwZSB7XG5cdGxldCBkZXNpZ25UaW1lTWV0YWRhdGE6IEZsZXhEZXNpZ25UaW1lVHlwZSA9IEZsZXhEZXNpZ25UaW1lVHlwZS5EZWZhdWx0O1xuXHRjb25zdCBoZWFkZXJGYWNldElEID0gZ2VuZXJhdGUoW3sgRmFjZXQ6IGZhY2V0RGVmaW5pdGlvbiB9XSk7XG5cblx0Ly8gRm9yIEhlYWRlckZhY2V0cyBuZXN0ZWQgaW5zaWRlIENvbGxlY3Rpb25GYWNldCBSVEEgc2hvdWxkIGJlIGRpc2FibGVkLCB0aGVyZWZvcmUgc2V0IHRvIFwibm90LWFkYXB0YWJsZS10cmVlXCJcblx0aWYgKFxuXHRcdGZhY2V0RGVmaW5pdGlvbi4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuUmVmZXJlbmNlRmFjZXQgJiZcblx0XHRjb2xsZWN0aW9uRmFjZXREZWZpbml0aW9uLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5Db2xsZWN0aW9uRmFjZXRcblx0KSB7XG5cdFx0ZGVzaWduVGltZU1ldGFkYXRhID0gRmxleERlc2lnblRpbWVUeXBlLk5vdEFkYXB0YWJsZVRyZWU7XG5cdH0gZWxzZSB7XG5cdFx0Y29uc3QgaGVhZGVyRmFjZXRzQ29udHJvbENvbmZpZyA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCkuZ2V0SGVhZGVyRmFjZXRzKCk7XG5cdFx0aWYgKGhlYWRlckZhY2V0SUQpIHtcblx0XHRcdGNvbnN0IGRlc2lnblRpbWUgPSBoZWFkZXJGYWNldHNDb250cm9sQ29uZmlnW2hlYWRlckZhY2V0SURdPy5mbGV4U2V0dGluZ3M/LmRlc2lnbnRpbWU7XG5cdFx0XHRzd2l0Y2ggKGRlc2lnblRpbWUpIHtcblx0XHRcdFx0Y2FzZSBGbGV4RGVzaWduVGltZVR5cGUuTm90QWRhcHRhYmxlOlxuXHRcdFx0XHRjYXNlIEZsZXhEZXNpZ25UaW1lVHlwZS5Ob3RBZGFwdGFibGVUcmVlOlxuXHRcdFx0XHRjYXNlIEZsZXhEZXNpZ25UaW1lVHlwZS5Ob3RBZGFwdGFibGVWaXNpYmlsaXR5OlxuXHRcdFx0XHRcdGRlc2lnblRpbWVNZXRhZGF0YSA9IGRlc2lnblRpbWU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJldHVybiBkZXNpZ25UaW1lTWV0YWRhdGE7XG59XG5cbi8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gQ29udmVydCAmIEJ1aWxkIEFubm90YXRpb24gQmFzZWQgSGVhZGVyIEZhY2V0c1xuLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG5mdW5jdGlvbiBjcmVhdGVSZWZlcmVuY2VIZWFkZXJGYWNldChcblx0ZmFjZXREZWZpbml0aW9uOiBGYWNldFR5cGVzLFxuXHRjb2xsZWN0aW9uRmFjZXREZWZpbml0aW9uOiBGYWNldFR5cGVzLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBSZWZlcmVuY2VGYWNldCB8IHVuZGVmaW5lZCB7XG5cdGlmIChmYWNldERlZmluaXRpb24uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLlJlZmVyZW5jZUZhY2V0ICYmICEoZmFjZXREZWZpbml0aW9uLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgPT09IHRydWUpKSB7XG5cdFx0Y29uc3QgaGVhZGVyRmFjZXRJRCA9IEhlYWRlckZhY2V0SUQoeyBGYWNldDogZmFjZXREZWZpbml0aW9uIH0pLFxuXHRcdFx0Z2V0SGVhZGVyRmFjZXRLZXkgPSAoZmFjZXREZWZpbml0aW9uOiBGYWNldFR5cGVzLCBmYWxsYmFjazogc3RyaW5nKTogc3RyaW5nID0+IHtcblx0XHRcdFx0cmV0dXJuIGZhY2V0RGVmaW5pdGlvbi5JRD8udG9TdHJpbmcoKSB8fCBmYWNldERlZmluaXRpb24uTGFiZWw/LnRvU3RyaW5nKCkgfHwgZmFsbGJhY2s7XG5cdFx0XHR9LFxuXHRcdFx0dGFyZ2V0QW5ub3RhdGlvblZhbHVlID0gZmFjZXREZWZpbml0aW9uLlRhcmdldC52YWx1ZSxcblx0XHRcdHRhcmdldEFubm90YXRpb25UeXBlID0gZ2V0VGFyZ2V0QW5ub3RhdGlvblR5cGUoZmFjZXREZWZpbml0aW9uKTtcblxuXHRcdGxldCBoZWFkZXJGb3JtRGF0YTogSGVhZGVyRm9ybURhdGEgfCB1bmRlZmluZWQ7XG5cdFx0bGV0IGhlYWRlckRhdGFQb2ludERhdGE6IEhlYWRlckRhdGFQb2ludERhdGEgfCB1bmRlZmluZWQ7XG5cblx0XHRzd2l0Y2ggKHRhcmdldEFubm90YXRpb25UeXBlKSB7XG5cdFx0XHRjYXNlIFRhcmdldEFubm90YXRpb25UeXBlLkZpZWxkR3JvdXA6XG5cdFx0XHRcdGhlYWRlckZvcm1EYXRhID0gZ2V0RmllbGRHcm91cEZvcm1EYXRhKGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dCk7XG5cdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRjYXNlIFRhcmdldEFubm90YXRpb25UeXBlLkRhdGFQb2ludDpcblx0XHRcdFx0aGVhZGVyRGF0YVBvaW50RGF0YSA9IGdldERhdGFQb2ludERhdGEoZmFjZXREZWZpbml0aW9uKTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHQvLyBUb0RvOiBIYW5kbGUgb3RoZXIgY2FzZXNcblx0XHR9XG5cblx0XHRjb25zdCB7IGFubm90YXRpb25zIH0gPSBmYWNldERlZmluaXRpb247XG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IEhlYWRlckZhY2V0VHlwZS5Bbm5vdGF0aW9uLFxuXHRcdFx0ZmFjZXRUeXBlOiBGYWNldFR5cGUuUmVmZXJlbmNlLFxuXHRcdFx0aWQ6IGhlYWRlckZhY2V0SUQsXG5cdFx0XHRjb250YWluZXJJZDogSGVhZGVyRmFjZXRDb250YWluZXJJRCh7IEZhY2V0OiBmYWNldERlZmluaXRpb24gfSksXG5cdFx0XHRrZXk6IGdldEhlYWRlckZhY2V0S2V5KGZhY2V0RGVmaW5pdGlvbiwgaGVhZGVyRmFjZXRJRCksXG5cdFx0XHRmbGV4U2V0dGluZ3M6IHtcblx0XHRcdFx0ZGVzaWdudGltZTogZ2V0RGVzaWduVGltZU1ldGFkYXRhU2V0dGluZ3NGb3JIZWFkZXJGYWNldChmYWNldERlZmluaXRpb24sIGNvbGxlY3Rpb25GYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpXG5cdFx0XHR9LFxuXHRcdFx0c3Rhc2hlZDogZ2V0U3Rhc2hlZFNldHRpbmdzRm9ySGVhZGVyRmFjZXQoZmFjZXREZWZpbml0aW9uLCBjb2xsZWN0aW9uRmFjZXREZWZpbml0aW9uLCBjb252ZXJ0ZXJDb250ZXh0KSxcblx0XHRcdHZpc2libGU6IGNvbXBpbGVCaW5kaW5nKG5vdChlcXVhbChhbm5vdGF0aW9uRXhwcmVzc2lvbihhbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpKSwgdHJ1ZSkpKSxcblx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZmFjZXREZWZpbml0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSkgKyBcIi9cIixcblx0XHRcdHRhcmdldEFubm90YXRpb25WYWx1ZSxcblx0XHRcdHRhcmdldEFubm90YXRpb25UeXBlLFxuXHRcdFx0aGVhZGVyRm9ybURhdGEsXG5cdFx0XHRoZWFkZXJEYXRhUG9pbnREYXRhXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUNvbGxlY3Rpb25IZWFkZXJGYWNldChcblx0Y29sbGVjdGlvbkZhY2V0RGVmaW5pdGlvbjogRmFjZXRUeXBlcyxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dFxuKTogQ29sbGVjdGlvbkZhY2V0IHwgdW5kZWZpbmVkIHtcblx0aWYgKGNvbGxlY3Rpb25GYWNldERlZmluaXRpb24uJFR5cGUgPT09IFVJQW5ub3RhdGlvblR5cGVzLkNvbGxlY3Rpb25GYWNldCkge1xuXHRcdGNvbnN0IGZhY2V0czogUmVmZXJlbmNlRmFjZXRbXSA9IFtdLFxuXHRcdFx0aGVhZGVyRmFjZXRJRCA9IEhlYWRlckZhY2V0SUQoeyBGYWNldDogY29sbGVjdGlvbkZhY2V0RGVmaW5pdGlvbiB9KSxcblx0XHRcdGdldEhlYWRlckZhY2V0S2V5ID0gKGZhY2V0RGVmaW5pdGlvbjogRmFjZXRUeXBlcywgZmFsbGJhY2s6IHN0cmluZyk6IHN0cmluZyA9PiB7XG5cdFx0XHRcdHJldHVybiBmYWNldERlZmluaXRpb24uSUQ/LnRvU3RyaW5nKCkgfHwgZmFjZXREZWZpbml0aW9uLkxhYmVsPy50b1N0cmluZygpIHx8IGZhbGxiYWNrO1xuXHRcdFx0fTtcblxuXHRcdGNvbGxlY3Rpb25GYWNldERlZmluaXRpb24uRmFjZXRzLmZvckVhY2goZmFjZXREZWZpbml0aW9uID0+IHtcblx0XHRcdGNvbnN0IGZhY2V0OiBSZWZlcmVuY2VGYWNldCB8IHVuZGVmaW5lZCA9IGNyZWF0ZVJlZmVyZW5jZUhlYWRlckZhY2V0KFxuXHRcdFx0XHRmYWNldERlZmluaXRpb24sXG5cdFx0XHRcdGNvbGxlY3Rpb25GYWNldERlZmluaXRpb24sXG5cdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdCk7XG5cdFx0XHRpZiAoZmFjZXQpIHtcblx0XHRcdFx0ZmFjZXRzLnB1c2goZmFjZXQpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IEhlYWRlckZhY2V0VHlwZS5Bbm5vdGF0aW9uLFxuXHRcdFx0ZmFjZXRUeXBlOiBGYWNldFR5cGUuQ29sbGVjdGlvbixcblx0XHRcdGlkOiBoZWFkZXJGYWNldElELFxuXHRcdFx0Y29udGFpbmVySWQ6IEhlYWRlckZhY2V0Q29udGFpbmVySUQoeyBGYWNldDogY29sbGVjdGlvbkZhY2V0RGVmaW5pdGlvbiB9KSxcblx0XHRcdGtleTogZ2V0SGVhZGVyRmFjZXRLZXkoY29sbGVjdGlvbkZhY2V0RGVmaW5pdGlvbiwgaGVhZGVyRmFjZXRJRCksXG5cdFx0XHRmbGV4U2V0dGluZ3M6IHtcblx0XHRcdFx0ZGVzaWdudGltZTogZ2V0RGVzaWduVGltZU1ldGFkYXRhU2V0dGluZ3NGb3JIZWFkZXJGYWNldChcblx0XHRcdFx0XHRjb2xsZWN0aW9uRmFjZXREZWZpbml0aW9uLFxuXHRcdFx0XHRcdGNvbGxlY3Rpb25GYWNldERlZmluaXRpb24sXG5cdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHQpXG5cdFx0XHR9LFxuXHRcdFx0c3Rhc2hlZDogZ2V0U3Rhc2hlZFNldHRpbmdzRm9ySGVhZGVyRmFjZXQoY29sbGVjdGlvbkZhY2V0RGVmaW5pdGlvbiwgY29sbGVjdGlvbkZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dCksXG5cdFx0XHR2aXNpYmxlOiBjb21waWxlQmluZGluZyhub3QoZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24oY29sbGVjdGlvbkZhY2V0RGVmaW5pdGlvbi5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpKSwgdHJ1ZSkpKSxcblx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoY29sbGVjdGlvbkZhY2V0RGVmaW5pdGlvbi5mdWxseVF1YWxpZmllZE5hbWUpICsgXCIvXCIsXG5cdFx0XHRmYWNldHNcblx0XHR9O1xuXHR9XG5cblx0cmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0QW5ub3RhdGlvblR5cGUoZmFjZXREZWZpbml0aW9uOiBGYWNldFR5cGVzKTogVGFyZ2V0QW5ub3RhdGlvblR5cGUge1xuXHRsZXQgYW5ub3RhdGlvblR5cGUgPSBUYXJnZXRBbm5vdGF0aW9uVHlwZS5Ob25lO1xuXHRjb25zdCBhbm5vdGF0aW9uVHlwZU1hcDogUmVjb3JkPHN0cmluZywgVGFyZ2V0QW5ub3RhdGlvblR5cGU+ID0ge1xuXHRcdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YVBvaW50XCI6IFRhcmdldEFubm90YXRpb25UeXBlLkRhdGFQb2ludCxcblx0XHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNoYXJ0XCI6IFRhcmdldEFubm90YXRpb25UeXBlLkNoYXJ0LFxuXHRcdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuSWRlbnRpZmljYXRpb25cIjogVGFyZ2V0QW5ub3RhdGlvblR5cGUuSWRlbnRpZmljYXRpb24sXG5cdFx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxLkNvbnRhY3RcIjogVGFyZ2V0QW5ub3RhdGlvblR5cGUuQ29udGFjdCxcblx0XHRcImNvbS5zYXAudm9jYWJ1bGFyaWVzLkNvbW11bmljYXRpb24udjEuQWRkcmVzc1wiOiBUYXJnZXRBbm5vdGF0aW9uVHlwZS5BZGRyZXNzLFxuXHRcdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRmllbGRHcm91cFwiOiBUYXJnZXRBbm5vdGF0aW9uVHlwZS5GaWVsZEdyb3VwXG5cdH07XG5cdC8vIFJlZmVyZW5jZVVSTEZhY2V0IGFuZCBDb2xsZWN0aW9uRmFjZXQgZG8gbm90IGhhdmUgVGFyZ2V0IHByb3BlcnR5LlxuXHRpZiAoZmFjZXREZWZpbml0aW9uLiRUeXBlICE9PSBVSUFubm90YXRpb25UeXBlcy5SZWZlcmVuY2VVUkxGYWNldCAmJiBmYWNldERlZmluaXRpb24uJFR5cGUgIT09IFVJQW5ub3RhdGlvblR5cGVzLkNvbGxlY3Rpb25GYWNldCkge1xuXHRcdGFubm90YXRpb25UeXBlID0gYW5ub3RhdGlvblR5cGVNYXBbZmFjZXREZWZpbml0aW9uLlRhcmdldD8uJHRhcmdldD8udGVybV0gfHwgVGFyZ2V0QW5ub3RhdGlvblR5cGUuTm9uZTtcblx0fVxuXG5cdHJldHVybiBhbm5vdGF0aW9uVHlwZTtcbn1cblxuZnVuY3Rpb24gZ2V0RmllbGRHcm91cEZvcm1EYXRhKGZhY2V0RGVmaW5pdGlvbjogUmVmZXJlbmNlRmFjZXRUeXBlcywgY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IEhlYWRlckZvcm1EYXRhIHtcblx0Ly8gc3BsaXQgaW4gdGhpcyBmcm9tIGFubm90YXRpb24gKyBnZXRGaWVsZEdyb3VwRnJvbURlZmF1bHRcblx0aWYgKCFmYWNldERlZmluaXRpb24pIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZ2V0IEZpZWxkR3JvdXAgZm9ybSBkYXRhIHdpdGhvdXQgZmFjZXQgZGVmaW5pdGlvblwiKTtcblx0fVxuXG5cdGNvbnN0IGZvcm1FbGVtZW50cyA9IGluc2VydEN1c3RvbUVsZW1lbnRzKFxuXHRcdGdldEZvcm1FbGVtZW50c0Zyb21Bbm5vdGF0aW9ucyhmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdGdldEZvcm1FbGVtZW50c0Zyb21NYW5pZmVzdChmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpXG5cdCk7XG5cblx0cmV0dXJuIHtcblx0XHRpZDogSGVhZGVyRmFjZXRGb3JtSUQoeyBGYWNldDogZmFjZXREZWZpbml0aW9uIH0pLFxuXHRcdGxhYmVsOiBmYWNldERlZmluaXRpb24uTGFiZWw/LnRvU3RyaW5nKCksXG5cdFx0Zm9ybUVsZW1lbnRzXG5cdH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBtYW5pZmVzdC1iYXNlZCBGb3JtRWxlbWVudHMuXG4gKlxuICogQHBhcmFtIHtGYWNldFR5cGV9IGZhY2V0RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZmFjZXRcbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHQgZm9yIHRoZSBmYWNldFxuICpcbiAqIEByZXR1cm5zIHtBcnJheX0gQW5ub3RhdGlvbi1iYXNlZCBGb3JtRWxlbWVudHNcbiAqL1xuZnVuY3Rpb24gZ2V0Rm9ybUVsZW1lbnRzRnJvbUFubm90YXRpb25zKGZhY2V0RGVmaW5pdGlvbjogRmFjZXRUeXBlcywgY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IEFubm90YXRpb25Gb3JtRWxlbWVudFtdIHtcblx0Y29uc3QgYW5ub3RhdGlvbkJhc2VkRm9ybUVsZW1lbnRzOiBBbm5vdGF0aW9uRm9ybUVsZW1lbnRbXSA9IFtdO1xuXG5cdC8vIFJlZmVyZW5jZVVSTEZhY2V0IGFuZCBDb2xsZWN0aW9uRmFjZXQgZG8gbm90IGhhdmUgVGFyZ2V0IHByb3BlcnR5LlxuXHRpZiAoZmFjZXREZWZpbml0aW9uLiRUeXBlICE9PSBVSUFubm90YXRpb25UeXBlcy5SZWZlcmVuY2VVUkxGYWNldCAmJiBmYWNldERlZmluaXRpb24uJFR5cGUgIT09IFVJQW5ub3RhdGlvblR5cGVzLkNvbGxlY3Rpb25GYWNldCkge1xuXHRcdChmYWNldERlZmluaXRpb24uVGFyZ2V0Py4kdGFyZ2V0IGFzIEZpZWxkR3JvdXApPy5EYXRhLmZvckVhY2goKGRhdGFGaWVsZDogRGF0YUZpZWxkQWJzdHJhY3RUeXBlcykgPT4ge1xuXHRcdFx0aWYgKCEoZGF0YUZpZWxkLmFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkgPT09IHRydWUpKSB7XG5cdFx0XHRcdGNvbnN0IHNlbWFudGljT2JqZWN0QW5ub3RhdGlvblBhdGggPSBnZXRTZW1hbnRpY09iamVjdFBhdGgoY29udmVydGVyQ29udGV4dCwgZGF0YUZpZWxkKTtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdGRhdGFGaWVsZC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkIHx8XG5cdFx0XHRcdFx0ZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoVXJsIHx8XG5cdFx0XHRcdFx0ZGF0YUZpZWxkLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRXaXRoTmF2aWdhdGlvblBhdGhcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0Y29uc3QgeyBhbm5vdGF0aW9ucyB9ID0gZGF0YUZpZWxkO1xuXHRcdFx0XHRcdGFubm90YXRpb25CYXNlZEZvcm1FbGVtZW50cy5wdXNoKHtcblx0XHRcdFx0XHRcdGlzVmFsdWVNdWx0aWxpbmVUZXh0OiBkYXRhRmllbGQuVmFsdWU/LiR0YXJnZXQ/LmFubm90YXRpb25zPy5VST8uTXVsdGlMaW5lVGV4dD8udmFsdWVPZigpID09PSB0cnVlLFxuXHRcdFx0XHRcdFx0dHlwZTogRm9ybUVsZW1lbnRUeXBlLkFubm90YXRpb24sXG5cdFx0XHRcdFx0XHRrZXk6IEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQoZGF0YUZpZWxkKSxcblx0XHRcdFx0XHRcdHZpc2libGU6IGNvbXBpbGVCaW5kaW5nKG5vdChlcXVhbChhbm5vdGF0aW9uRXhwcmVzc2lvbihhbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpKSwgdHJ1ZSkpKSxcblx0XHRcdFx0XHRcdGxhYmVsOiBkYXRhRmllbGQuVmFsdWU/LiR0YXJnZXQ/LmFubm90YXRpb25zPy5Db21tb24/LkxhYmVsIHx8IGRhdGFGaWVsZC5MYWJlbCxcblx0XHRcdFx0XHRcdGlkUHJlZml4OiBIZWFkZXJGYWNldEZvcm1JRCh7IEZhY2V0OiBmYWNldERlZmluaXRpb24gfSwgZGF0YUZpZWxkKSxcblx0XHRcdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZGF0YUZpZWxkLmZ1bGx5UXVhbGlmaWVkTmFtZSkgKyBcIi9cIixcblx0XHRcdFx0XHRcdHNlbWFudGljT2JqZWN0UGF0aDogc2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGRhdGFGaWVsZC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuRGF0YUZpZWxkRm9yQW5ub3RhdGlvbikge1xuXHRcdFx0XHRcdGNvbnN0IHsgYW5ub3RhdGlvbnMgfSA9IGRhdGFGaWVsZDtcblx0XHRcdFx0XHRhbm5vdGF0aW9uQmFzZWRGb3JtRWxlbWVudHMucHVzaCh7XG5cdFx0XHRcdFx0XHQvLyBGSVhNRSB0aGlzIGlzIHdyb25nXG5cdFx0XHRcdFx0XHRpc1ZhbHVlTXVsdGlsaW5lVGV4dDogKGRhdGFGaWVsZC5UYXJnZXQ/LiR0YXJnZXQ/LmFubm90YXRpb25zPy5VSSBhcyBhbnkpPy5NdWx0aUxpbmVUZXh0Py52YWx1ZU9mKCkgPT09IHRydWUsXG5cdFx0XHRcdFx0XHR0eXBlOiBGb3JtRWxlbWVudFR5cGUuQW5ub3RhdGlvbixcblx0XHRcdFx0XHRcdGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChkYXRhRmllbGQpLFxuXHRcdFx0XHRcdFx0dmlzaWJsZTogY29tcGlsZUJpbmRpbmcobm90KGVxdWFsKGFubm90YXRpb25FeHByZXNzaW9uKGFubm90YXRpb25zPy5VST8uSGlkZGVuPy52YWx1ZU9mKCkpLCB0cnVlKSkpLFxuXHRcdFx0XHRcdFx0bGFiZWw6IGRhdGFGaWVsZC5UYXJnZXQ/LiR0YXJnZXQ/LmFubm90YXRpb25zPy5Db21tb24/LkxhYmVsPy50b1N0cmluZygpIHx8IGRhdGFGaWVsZC5MYWJlbD8udG9TdHJpbmcoKSxcblx0XHRcdFx0XHRcdGlkUHJlZml4OiBIZWFkZXJGYWNldEZvcm1JRCh7IEZhY2V0OiBmYWNldERlZmluaXRpb24gfSwgZGF0YUZpZWxkKSxcblx0XHRcdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZGF0YUZpZWxkLmZ1bGx5UXVhbGlmaWVkTmFtZSkgKyBcIi9cIixcblx0XHRcdFx0XHRcdHNlbWFudGljT2JqZWN0UGF0aDogc2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aFxuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRyZXR1cm4gYW5ub3RhdGlvbkJhc2VkRm9ybUVsZW1lbnRzO1xufVxuXG5mdW5jdGlvbiBnZXREYXRhUG9pbnREYXRhKGZhY2V0RGVmaW5pdGlvbjogRmFjZXRUeXBlcyk6IEhlYWRlckRhdGFQb2ludERhdGEge1xuXHRsZXQgdHlwZSA9IEhlYWRlckRhdGFQb2ludFR5cGUuQ29udGVudDtcblx0aWYgKGZhY2V0RGVmaW5pdGlvbi4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuUmVmZXJlbmNlRmFjZXQpIHtcblx0XHRpZiAoKGZhY2V0RGVmaW5pdGlvbi5UYXJnZXQ/LiR0YXJnZXQgYXMgRGF0YVBvaW50KT8uVmlzdWFsaXphdGlvbiA9PT0gXCJVSS5WaXN1YWxpemF0aW9uVHlwZS9Qcm9ncmVzc1wiKSB7XG5cdFx0XHR0eXBlID0gSGVhZGVyRGF0YVBvaW50VHlwZS5Qcm9ncmVzc0luZGljYXRvcjtcblx0XHR9IGVsc2UgaWYgKChmYWNldERlZmluaXRpb24uVGFyZ2V0Py4kdGFyZ2V0IGFzIERhdGFQb2ludCk/LlZpc3VhbGl6YXRpb24gPT09IFwiVUkuVmlzdWFsaXphdGlvblR5cGUvUmF0aW5nXCIpIHtcblx0XHRcdHR5cGUgPSBIZWFkZXJEYXRhUG9pbnRUeXBlLlJhdGluZ0luZGljYXRvcjtcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4geyB0eXBlIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhbm5vdGF0aW9uLWJhc2VkIGhlYWRlciBmYWNldC5cbiAqXG4gKiBAcGFyYW0ge0ZhY2V0VHlwZXN9IGZhY2V0RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBvZiB0aGUgZmFjZXRcbiAqIEBwYXJhbSB7Q29udmVydGVyQ29udGV4dH0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHRcbiAqXG4gKiBAcmV0dXJucyB7T2JqZWN0UGFnZUhlYWRlckZhY2V0fSBUaGUgY3JlYXRlZCBhbm5vdGF0aW9uLWJhc2VkIGhlYWRlciBmYWNldFxuICovXG5mdW5jdGlvbiBjcmVhdGVIZWFkZXJGYWNldChmYWNldERlZmluaXRpb246IEZhY2V0VHlwZXMsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBPYmplY3RQYWdlSGVhZGVyRmFjZXQgfCB1bmRlZmluZWQge1xuXHRsZXQgaGVhZGVyRmFjZXQ6IE9iamVjdFBhZ2VIZWFkZXJGYWNldCB8IHVuZGVmaW5lZDtcblx0c3dpdGNoIChmYWNldERlZmluaXRpb24uJFR5cGUpIHtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLlJlZmVyZW5jZUZhY2V0OlxuXHRcdFx0aGVhZGVyRmFjZXQgPSBjcmVhdGVSZWZlcmVuY2VIZWFkZXJGYWNldChmYWNldERlZmluaXRpb24sIGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dCk7XG5cdFx0XHRicmVhaztcblxuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuQ29sbGVjdGlvbkZhY2V0OlxuXHRcdFx0aGVhZGVyRmFjZXQgPSBjcmVhdGVDb2xsZWN0aW9uSGVhZGVyRmFjZXQoZmFjZXREZWZpbml0aW9uLCBjb252ZXJ0ZXJDb250ZXh0KTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cblx0cmV0dXJuIGhlYWRlckZhY2V0O1xufVxuXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIENvbnZlcnQgJiBCdWlsZCBNYW5pZmVzdCBCYXNlZCBIZWFkZXIgRmFjZXRzXG4vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy9cblxuZnVuY3Rpb24gZ2VuZXJhdGVCaW5kaW5nKHJlcXVlc3RHcm91cElkPzogc3RyaW5nKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0aWYgKCFyZXF1ZXN0R3JvdXBJZCkge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH1cblx0Y29uc3QgZ3JvdXBJZCA9XG5cdFx0W1wiSGVyb2VzXCIsIFwiRGVjb3JhdGlvblwiLCBcIldvcmtlcnNcIiwgXCJMb25nUnVubmVyc1wiXS5pbmRleE9mKHJlcXVlc3RHcm91cElkKSAhPT0gLTEgPyBcIiRhdXRvLlwiICsgcmVxdWVzdEdyb3VwSWQgOiByZXF1ZXN0R3JvdXBJZDtcblxuXHRyZXR1cm4gXCJ7IHBhdGggOiAnJywgcGFyYW1ldGVycyA6IHsgJCRncm91cElkIDogJ1wiICsgZ3JvdXBJZCArIFwiJyB9IH1cIjtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBtYW5pZmVzdCBiYXNlZCBjdXN0b20gaGVhZGVyIGZhY2V0LlxuICpcbiAqIEBwYXJhbSB7TWFuaWZlc3RIZWFkZXJGYWNldH0gY3VzdG9tSGVhZGVyRmFjZXREZWZpbml0aW9uXG4gKiBAcGFyYW0ge3N0cmluZ30gaGVhZGVyRmFjZXRLZXlcbiAqXG4gKiBAcmV0dXJucyB7Q3VzdG9tT2JqZWN0UGFnZUhlYWRlckZhY2V0fSBUaGUgbWFuaWZlc3QgYmFzZWQgY3VzdG9tIGhlYWRlciBmYWNldCBjcmVhdGVkXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUhlYWRlckZhY2V0KGN1c3RvbUhlYWRlckZhY2V0RGVmaW5pdGlvbjogTWFuaWZlc3RIZWFkZXJGYWNldCwgaGVhZGVyRmFjZXRLZXk6IHN0cmluZyk6IEN1c3RvbU9iamVjdFBhZ2VIZWFkZXJGYWNldCB7XG5cdGNvbnN0IGN1c3RvbUhlYWRlckZhY2V0SUQgPSBDdXN0b21IZWFkZXJGYWNldElEKGhlYWRlckZhY2V0S2V5KTtcblxuXHRsZXQgcG9zaXRpb246IFBvc2l0aW9uIHwgdW5kZWZpbmVkID0gY3VzdG9tSGVhZGVyRmFjZXREZWZpbml0aW9uLnBvc2l0aW9uO1xuXHRpZiAoIXBvc2l0aW9uKSB7XG5cdFx0cG9zaXRpb24gPSB7XG5cdFx0XHRwbGFjZW1lbnQ6IFBsYWNlbWVudC5BZnRlclxuXHRcdH07XG5cdH1cblx0Ly8gVE9ETyBmb3IgYW4gbm9uIGFubm90YXRpb24gZnJhZ21lbnQgdGhlIG5hbWUgaXMgbWFuZGF0b3J5IC0+IE5vdCBjaGVja2VkXG5cdHJldHVybiB7XG5cdFx0ZmFjZXRUeXBlOiBGYWNldFR5cGUuUmVmZXJlbmNlLFxuXHRcdGZhY2V0czogW10sXG5cdFx0dHlwZTogY3VzdG9tSGVhZGVyRmFjZXREZWZpbml0aW9uLnR5cGUsXG5cdFx0aWQ6IGN1c3RvbUhlYWRlckZhY2V0SUQsXG5cdFx0Y29udGFpbmVySWQ6IGN1c3RvbUhlYWRlckZhY2V0SUQsXG5cdFx0a2V5OiBoZWFkZXJGYWNldEtleSxcblx0XHRwb3NpdGlvbjogcG9zaXRpb24sXG5cdFx0dmlzaWJsZTogY3VzdG9tSGVhZGVyRmFjZXREZWZpbml0aW9uLnZpc2libGUsXG5cdFx0ZnJhZ21lbnROYW1lOiBjdXN0b21IZWFkZXJGYWNldERlZmluaXRpb24udGVtcGxhdGUgfHwgY3VzdG9tSGVhZGVyRmFjZXREZWZpbml0aW9uLm5hbWUsXG5cdFx0dGl0bGU6IGN1c3RvbUhlYWRlckZhY2V0RGVmaW5pdGlvbi50aXRsZSxcblx0XHRzdWJUaXRsZTogY3VzdG9tSGVhZGVyRmFjZXREZWZpbml0aW9uLnN1YlRpdGxlLFxuXHRcdHN0YXNoZWQ6IGN1c3RvbUhlYWRlckZhY2V0RGVmaW5pdGlvbi5zdGFzaGVkIHx8IGZhbHNlLFxuXHRcdGZsZXhTZXR0aW5nczogeyAuLi57IGRlc2lnbnRpbWU6IEZsZXhEZXNpZ25UaW1lVHlwZS5EZWZhdWx0IH0sIC4uLmN1c3RvbUhlYWRlckZhY2V0RGVmaW5pdGlvbi5mbGV4U2V0dGluZ3MgfSxcblx0XHRiaW5kaW5nOiBnZW5lcmF0ZUJpbmRpbmcoY3VzdG9tSGVhZGVyRmFjZXREZWZpbml0aW9uLnJlcXVlc3RHcm91cElkKSxcblx0XHR0ZW1wbGF0ZUVkaXQ6IGN1c3RvbUhlYWRlckZhY2V0RGVmaW5pdGlvbi50ZW1wbGF0ZUVkaXRcblx0fTtcbn1cbiJdfQ==