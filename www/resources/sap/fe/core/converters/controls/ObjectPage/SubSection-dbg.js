/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../ManifestSettings", "../../helpers/ID", "../Common/Form", "../Common/DataVisualization", "../../helpers/ConfigurableObject", "sap/fe/core/converters/controls/Common/Action", "sap/fe/core/converters/helpers/Key", "sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/IssueManager", "sap/fe/core/converters/controls/ObjectPage/HeaderFacet", "../../objectPage/FormMenuActions"], function (ManifestSettings, ID, Form, DataVisualization, ConfigurableObject, Action, Key, BindingExpression, IssueManager, HeaderFacet, FormMenuActions) {
  "use strict";

  var _exports = {};
  var getFormActions = FormMenuActions.getFormActions;
  var getFormHiddenActions = FormMenuActions.getFormHiddenActions;
  var getVisibilityEnablementFormMenuActions = FormMenuActions.getVisibilityEnablementFormMenuActions;
  var getHeaderFacetsFromManifest = HeaderFacet.getHeaderFacetsFromManifest;
  var getStashedSettingsForHeaderFacet = HeaderFacet.getStashedSettingsForHeaderFacet;
  var getDesignTimeMetadataSettingsForHeaderFacet = HeaderFacet.getDesignTimeMetadataSettingsForHeaderFacet;
  var IssueCategory = IssueManager.IssueCategory;
  var IssueSeverity = IssueManager.IssueSeverity;
  var IssueType = IssueManager.IssueType;
  var ref = BindingExpression.ref;
  var not = BindingExpression.not;
  var fn = BindingExpression.fn;
  var equal = BindingExpression.equal;
  var compileBinding = BindingExpression.compileBinding;
  var bindingExpression = BindingExpression.bindingExpression;
  var annotationExpression = BindingExpression.annotationExpression;
  var KeyHelper = Key.KeyHelper;
  var removeDuplicateActions = Action.removeDuplicateActions;
  var getSemanticObjectMapping = Action.getSemanticObjectMapping;
  var ButtonType = Action.ButtonType;
  var isActionNavigable = Action.isActionNavigable;
  var getEnabledBinding = Action.getEnabledBinding;
  var getActionsFromManifest = Action.getActionsFromManifest;
  var Placement = ConfigurableObject.Placement;
  var insertCustomElements = ConfigurableObject.insertCustomElements;
  var getDataVisualizationConfiguration = DataVisualization.getDataVisualizationConfiguration;
  var isReferenceFacet = Form.isReferenceFacet;
  var createFormDefinition = Form.createFormDefinition;
  var SideContentID = ID.SideContentID;
  var SubSectionID = ID.SubSectionID;
  var FormID = ID.FormID;
  var CustomSubSectionID = ID.CustomSubSectionID;
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

  var SubSectionType;

  (function (SubSectionType) {
    SubSectionType["Unknown"] = "Unknown";
    SubSectionType["Form"] = "Form";
    SubSectionType["DataVisualization"] = "DataVisualization";
    SubSectionType["XMLFragment"] = "XMLFragment";
    SubSectionType["Placeholder"] = "Placeholder";
    SubSectionType["Mixed"] = "Mixed";
  })(SubSectionType || (SubSectionType = {}));

  _exports.SubSectionType = SubSectionType;
  var targetTerms = ["com.sap.vocabularies.UI.v1.LineItem", "com.sap.vocabularies.UI.v1.PresentationVariant", "com.sap.vocabularies.UI.v1.SelectionPresentationVariant"]; // TODO: Need to handle Table case inside createSubSection function if CollectionFacet has Table ReferenceFacet

  var hasTable = function () {
    var facets = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return facets.some(function (facetType) {
      var _facetType$Target, _facetType$Target$$ta;

      return targetTerms.indexOf(facetType === null || facetType === void 0 ? void 0 : (_facetType$Target = facetType.Target) === null || _facetType$Target === void 0 ? void 0 : (_facetType$Target$$ta = _facetType$Target.$target) === null || _facetType$Target$$ta === void 0 ? void 0 : _facetType$Target$$ta.term) > -1;
    });
  };
  /**
   * Create subsections based on facet definition.
   *
   * @param facetCollection
   * @param converterContext
   * @param isHeaderSection
   * @returns {ObjectPageSubSection[]} The current subections
   */


  function createSubSections(facetCollection, converterContext, isHeaderSection) {
    // First we determine which sub section we need to create
    var facetsToCreate = facetCollection.reduce(function (facetsToCreate, facetDefinition) {
      switch (facetDefinition.$Type) {
        case "com.sap.vocabularies.UI.v1.ReferenceFacet":
          facetsToCreate.push(facetDefinition);
          break;

        case "com.sap.vocabularies.UI.v1.CollectionFacet":
          // TODO If the Collection Facet has a child of type Collection Facet we bring them up one level (Form + Table use case) ?
          // first case facet Collection is combination of collection and reference facet or not all facets are reference facets.
          if (facetDefinition.Facets.find(function (facetType) {
            return facetType.$Type === "com.sap.vocabularies.UI.v1.CollectionFacet";
          })) {
            facetsToCreate.splice.apply(facetsToCreate, [facetsToCreate.length, 0].concat(_toConsumableArray(facetDefinition.Facets)));
          } else {
            facetsToCreate.push(facetDefinition);
          }

          break;

        case "com.sap.vocabularies.UI.v1.ReferenceURLFacet":
          // Not supported
          break;
      }

      return facetsToCreate;
    }, []); // Then we create the actual subsections

    return facetsToCreate.map(function (facet) {
      var _ref, _ref$Facets;

      return createSubSection(facet, facetsToCreate, converterContext, 0, !((_ref = facet) === null || _ref === void 0 ? void 0 : (_ref$Facets = _ref.Facets) === null || _ref$Facets === void 0 ? void 0 : _ref$Facets.length), isHeaderSection);
    });
  }
  /**
   * Creates subsections based on the definition of the custom header facet.
   *
   * @param converterContext The converter context
   * @returns {ObjectPageSubSection[]} The current subections
   */


  _exports.createSubSections = createSubSections;

  function createCustomHeaderFacetSubSections(converterContext) {
    var customHeaderFacets = getHeaderFacetsFromManifest(converterContext.getManifestWrapper().getHeaderFacets());
    var aCustomHeaderFacets = [];
    Object.keys(customHeaderFacets).map(function (key) {
      aCustomHeaderFacets.push(customHeaderFacets[key]);
      return aCustomHeaderFacets;
    });
    var facetsToCreate = aCustomHeaderFacets.reduce(function (facetsToCreate, customHeaderFacet) {
      if (customHeaderFacet.templateEdit) {
        facetsToCreate.push(customHeaderFacet);
      }

      return facetsToCreate;
    }, []);
    return facetsToCreate.map(function (customHeaderFacet) {
      return createCustomHeaderFacetSubSection(customHeaderFacet);
    });
  }
  /**
   * Creates a subsection based on a custom header facet.
   *
   * @param customHeaderFacet A custom header facet
   *
   * @returns {ObjectPageSubSection} A definition for a subsection
   */


  _exports.createCustomHeaderFacetSubSections = createCustomHeaderFacetSubSections;

  function createCustomHeaderFacetSubSection(customHeaderFacet) {
    var subSectionID = CustomSubSectionID(customHeaderFacet.key);
    var subSection = {
      id: subSectionID,
      key: customHeaderFacet.key,
      title: customHeaderFacet.title,
      type: SubSectionType.XMLFragment,
      template: customHeaderFacet.templateEdit || "",
      visible: customHeaderFacet.visible,
      level: 1,
      sideContent: undefined,
      stashed: customHeaderFacet.stashed,
      flexSettings: customHeaderFacet.flexSettings,
      actions: {}
    };
    return subSection;
  } // function isTargetForCompliant(annotationPath: AnnotationPath) {
  // 	return /.*com\.sap\.vocabularies\.UI\.v1\.(FieldGroup|Identification|DataPoint|StatusInfo).*/.test(annotationPath.value);
  // }


  var getSubSectionKey = function (facetDefinition, fallback) {
    var _facetDefinition$ID, _facetDefinition$Labe;

    return ((_facetDefinition$ID = facetDefinition.ID) === null || _facetDefinition$ID === void 0 ? void 0 : _facetDefinition$ID.toString()) || ((_facetDefinition$Labe = facetDefinition.Label) === null || _facetDefinition$Labe === void 0 ? void 0 : _facetDefinition$Labe.toString()) || fallback;
  };
  /**
   * Adds Form menu action to all form actions, removes duplicate actions and hidden actions.
   * @param actions The actions involved
   * @param facetDefinition The definition for the facet
   * @param converterContext The converter context
   * @returns {BaseAction[] | ConverterAction[]}
   */


  function addFormMenuActions(actions, facetDefinition, converterContext) {
    var hiddenActions = getFormHiddenActions(facetDefinition, converterContext) || [],
        formActions = getFormActions(facetDefinition, converterContext),
        formAllActions = insertCustomElements(actions, getActionsFromManifest(formActions, converterContext, actions, undefined, undefined, hiddenActions));
    return formAllActions ? getVisibilityEnablementFormMenuActions(removeDuplicateActions(formAllActions)) : actions;
  }
  /**
   * Retrieves the action form a facet.
   * @param facetDefinition
   * @param converterContext
   * @returns {ConverterAction[] | BaseAction[]} The current facet actions
   */


  function getFacetActions(facetDefinition, converterContext) {
    var actions = new Array();

    switch (facetDefinition.$Type) {
      case "com.sap.vocabularies.UI.v1.CollectionFacet":
        actions = facetDefinition.Facets.filter(function (facetDefinition) {
          return isReferenceFacet(facetDefinition);
        }).reduce(function (actions, facetDefinition) {
          return createFormActionReducer(actions, facetDefinition, converterContext);
        }, []);
        break;

      case "com.sap.vocabularies.UI.v1.ReferenceFacet":
        actions = createFormActionReducer([], facetDefinition, converterContext);
        break;
    }

    return addFormMenuActions(actions, facetDefinition, converterContext);
  }
  /**
   * Retruns the button type based on @UI.Emphasized annotation.
   * @param Emphasized Emphasized annotation value.
   * @returns {ButtonType | string} The button type or path based expression.
   */


  function getButtonType(Emphasized) {
    var PathForButtonType = Emphasized === null || Emphasized === void 0 ? void 0 : Emphasized.path;

    if (PathForButtonType) {
      return "{= " + "!${" + PathForButtonType + "} ? '" + ButtonType.Transparent + "' : ${" + PathForButtonType + "}" + "}";
    } else if (Emphasized) {
      return ButtonType.Ghost;
    }

    return ButtonType.Transparent;
  }
  /**
   * Create a subsection based on a FacetTypes.
   * @param facetDefinition
   * @param facetsToCreate
   * @param converterContext
   * @param level
   * @param hasSingleContent
   * @param isHeaderSection
   * @returns {ObjectPageSubSection} A sub section definition
   */


  function createSubSection(facetDefinition, facetsToCreate, converterContext, level, hasSingleContent, isHeaderSection) {
    var _facetDefinition$anno, _facetDefinition$anno2, _ref2, _ref2$annotation, _ref3;

    var subSectionID = SubSectionID({
      Facet: facetDefinition
    });
    var subSection = {
      id: subSectionID,
      key: getSubSectionKey(facetDefinition, subSectionID),
      title: compileBinding(annotationExpression(facetDefinition.Label)),
      type: SubSectionType.Unknown,
      annotationPath: converterContext.getEntitySetBasedAnnotationPath(facetDefinition.fullyQualifiedName),
      visible: compileBinding(not(equal(annotationExpression((_facetDefinition$anno = facetDefinition.annotations) === null || _facetDefinition$anno === void 0 ? void 0 : (_facetDefinition$anno2 = _facetDefinition$anno.UI) === null || _facetDefinition$anno2 === void 0 ? void 0 : _facetDefinition$anno2.Hidden), true))),
      level: level,
      sideContent: undefined
    };

    if (isHeaderSection) {
      subSection.stashed = getStashedSettingsForHeaderFacet(facetDefinition, facetDefinition, converterContext);
      subSection.flexSettings = {
        designtime: getDesignTimeMetadataSettingsForHeaderFacet(facetDefinition, facetDefinition, converterContext)
      };
    }

    var content = [];
    var tableContent = [];
    var index = [];
    var unsupportedText = "";
    level++;

    switch (facetDefinition.$Type) {
      case "com.sap.vocabularies.UI.v1.CollectionFacet":
        var facets = facetDefinition.Facets;

        if (hasTable(facets)) {
          // if we have tables in a collection facet then we create separate subsection for them
          for (var i = 0; i < facets.length; i++) {
            var _Target, _Target$$target;

            if (targetTerms.indexOf((_Target = facets[i].Target) === null || _Target === void 0 ? void 0 : (_Target$$target = _Target.$target) === null || _Target$$target === void 0 ? void 0 : _Target$$target.term) > -1) {
              //creating separate array for tables
              tableContent.push(createSubSection(facets[i], [], converterContext, level, facets.length === 1, isHeaderSection));
              index.push(i);
            }
          }

          for (var _i = index.length - 1; _i >= 0; _i--) {
            //remove table facets from facet definition
            facets.splice(index[_i], 1);
          }

          if (facets.length) {
            facetDefinition.Facets = facets; //create a form subsection from the remaining facets

            content.push(createSubSection(facetDefinition, [], converterContext, level, hasSingleContent, isHeaderSection));
          }

          content = content.concat(tableContent);

          var mixedSubSection = _objectSpread({}, subSection, {
            type: SubSectionType.Mixed,
            level: level,
            content: content
          });

          return mixedSubSection;
        } else {
          var formCollectionSubSection = _objectSpread({}, subSection, {
            type: SubSectionType.Form,
            formDefinition: createFormDefinition(facetDefinition, converterContext),
            level: level,
            actions: getFacetActions(facetDefinition, converterContext)
          });

          return formCollectionSubSection;
        }

      case "com.sap.vocabularies.UI.v1.ReferenceFacet":
        if (!facetDefinition.Target.$target) {
          unsupportedText = "Unable to find annotationPath ".concat(facetDefinition.Target.value);
        } else {
          switch (facetDefinition.Target.$target.term) {
            case "com.sap.vocabularies.UI.v1.LineItem":
            case "com.sap.vocabularies.UI.v1.Chart":
            case "com.sap.vocabularies.UI.v1.PresentationVariant":
            case "com.sap.vocabularies.UI.v1.SelectionPresentationVariant":
              var presentation = getDataVisualizationConfiguration(facetDefinition.Target.value, getCondensedTableLayoutCompliance(facetDefinition, facetsToCreate, converterContext), converterContext, undefined, isHeaderSection);
              var controlTitle = (_ref2 = presentation.visualizations[0]) === null || _ref2 === void 0 ? void 0 : (_ref2$annotation = _ref2.annotation) === null || _ref2$annotation === void 0 ? void 0 : _ref2$annotation.title;
              controlTitle ? controlTitle : controlTitle = (_ref3 = presentation.visualizations[0]) === null || _ref3 === void 0 ? void 0 : _ref3.title;

              var dataVisualizationSubSection = _objectSpread({}, subSection, {
                type: SubSectionType.DataVisualization,
                level: level,
                presentation: presentation,
                showTitle: isSubsectionTitleShown(hasSingleContent, subSection.title, controlTitle)
              });

              return dataVisualizationSubSection;

            case "com.sap.vocabularies.UI.v1.FieldGroup":
            case "com.sap.vocabularies.UI.v1.Identification":
            case "com.sap.vocabularies.UI.v1.DataPoint":
            case "com.sap.vocabularies.UI.v1.StatusInfo":
            case "com.sap.vocabularies.Communication.v1.Contact":
              // All those element belong to a form facet
              var formElementSubSection = _objectSpread({}, subSection, {
                type: SubSectionType.Form,
                level: level,
                formDefinition: createFormDefinition(facetDefinition, converterContext),
                actions: getFacetActions(facetDefinition, converterContext)
              });

              return formElementSubSection;

            default:
              unsupportedText = "For ".concat(facetDefinition.Target.$target.term, " Fragment");
              break;
          }
        }

        break;

      case "com.sap.vocabularies.UI.v1.ReferenceURLFacet":
        unsupportedText = "For Reference URL Facet";
        break;

      default:
        break;
    } // If we reach here we ended up with an unsupported SubSection type


    var unsupportedSubSection = _objectSpread({}, subSection, {
      text: unsupportedText
    });

    return unsupportedSubSection;
  }

  _exports.createSubSection = createSubSection;

  function isSubsectionTitleShown(hasSingleContent, subSectionTitle, controlTitle) {
    if (hasSingleContent && controlTitle === subSectionTitle) {
      return false;
    }

    return true;
  }

  function createFormActionReducer(actions, facetDefinition, converterContext) {
    var referenceTarget = facetDefinition.Target.$target;
    var targetValue = facetDefinition.Target.value;
    var manifestActions = {};
    var dataFieldCollection = [];

    var _targetValue$split = targetValue.split("@"),
        _targetValue$split2 = _slicedToArray(_targetValue$split, 1),
        navigationPropertyPath = _targetValue$split2[0];

    if (navigationPropertyPath.length > 0) {
      if (navigationPropertyPath.lastIndexOf("/") === navigationPropertyPath.length - 1) {
        navigationPropertyPath = navigationPropertyPath.substr(0, navigationPropertyPath.length - 1);
      }
    } else {
      navigationPropertyPath = undefined;
    }

    if (referenceTarget) {
      switch (referenceTarget.term) {
        case "com.sap.vocabularies.UI.v1.FieldGroup":
          dataFieldCollection = referenceTarget.Data;
          manifestActions = getActionsFromManifest(converterContext.getManifestControlConfiguration(referenceTarget).actions, converterContext);
          break;

        case "com.sap.vocabularies.UI.v1.Identification":
        case "com.sap.vocabularies.UI.v1.StatusInfo":
          if (referenceTarget.qualifier) {
            dataFieldCollection = referenceTarget;
          }

          break;
      }
    }

    actions = dataFieldCollection.reduce(function (actions, dataField) {
      var _dataField$annotation, _dataField$RequiresCo, _dataField$Inline, _dataField$Label, _dataField$Navigation, _dataField$annotation2, _dataField$annotation3, _dataField$annotation4, _dataField$Label2, _dataField$annotation5, _dataField$annotation6, _dataField$annotation7;

      var UIAnnotation = dataField === null || dataField === void 0 ? void 0 : (_dataField$annotation = dataField.annotations) === null || _dataField$annotation === void 0 ? void 0 : _dataField$annotation.UI;

      switch (dataField.$Type) {
        case "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":
          if (((_dataField$RequiresCo = dataField.RequiresContext) === null || _dataField$RequiresCo === void 0 ? void 0 : _dataField$RequiresCo.valueOf()) === true) {
            converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.Low, IssueType.MALFORMED_DATAFIELD_FOR_IBN.REQUIRESCONTEXT);
          }

          if (((_dataField$Inline = dataField.Inline) === null || _dataField$Inline === void 0 ? void 0 : _dataField$Inline.valueOf()) === true) {
            converterContext.getDiagnostics().addIssue(IssueCategory.Annotation, IssueSeverity.Low, IssueType.MALFORMED_DATAFIELD_FOR_IBN.INLINE);
          }

          var mNavigationParameters = {};

          if (dataField.Mapping) {
            mNavigationParameters.semanticObjectMapping = getSemanticObjectMapping(dataField.Mapping);
          }

          actions.push({
            type: ActionType.DataFieldForIntentBasedNavigation,
            id: FormID({
              Facet: facetDefinition
            }, dataField),
            key: KeyHelper.generateKeyFromDataField(dataField),
            text: (_dataField$Label = dataField.Label) === null || _dataField$Label === void 0 ? void 0 : _dataField$Label.toString(),
            annotationPath: "",
            enabled: dataField.NavigationAvailable !== undefined ? compileBinding(equal(annotationExpression((_dataField$Navigation = dataField.NavigationAvailable) === null || _dataField$Navigation === void 0 ? void 0 : _dataField$Navigation.valueOf()), true)) : true,
            visible: compileBinding(not(equal(annotationExpression((_dataField$annotation2 = dataField.annotations) === null || _dataField$annotation2 === void 0 ? void 0 : (_dataField$annotation3 = _dataField$annotation2.UI) === null || _dataField$annotation3 === void 0 ? void 0 : (_dataField$annotation4 = _dataField$annotation3.Hidden) === null || _dataField$annotation4 === void 0 ? void 0 : _dataField$annotation4.valueOf()), true))),
            buttonType: getButtonType(UIAnnotation === null || UIAnnotation === void 0 ? void 0 : UIAnnotation.Emphasized),
            press: compileBinding(fn("._intentBasedNavigation.navigate", [annotationExpression(dataField.SemanticObject), annotationExpression(dataField.Action), mNavigationParameters])),
            customData: compileBinding({
              semanticObject: annotationExpression(dataField.SemanticObject),
              action: annotationExpression(dataField.Action)
            })
          });
          break;

        case "com.sap.vocabularies.UI.v1.DataFieldForAction":
          var formManifestActionsConfiguration = converterContext.getManifestControlConfiguration(referenceTarget).actions;
          var key = KeyHelper.generateKeyFromDataField(dataField);
          actions.push({
            type: ActionType.DataFieldForAction,
            id: FormID({
              Facet: facetDefinition
            }, dataField),
            key: key,
            text: (_dataField$Label2 = dataField.Label) === null || _dataField$Label2 === void 0 ? void 0 : _dataField$Label2.toString(),
            annotationPath: "",
            enabled: getEnabledBinding(dataField.ActionTarget),
            binding: navigationPropertyPath ? "{ 'path' : '" + navigationPropertyPath + "'}" : undefined,
            visible: compileBinding(not(equal(annotationExpression((_dataField$annotation5 = dataField.annotations) === null || _dataField$annotation5 === void 0 ? void 0 : (_dataField$annotation6 = _dataField$annotation5.UI) === null || _dataField$annotation6 === void 0 ? void 0 : (_dataField$annotation7 = _dataField$annotation6.Hidden) === null || _dataField$annotation7 === void 0 ? void 0 : _dataField$annotation7.valueOf()), true))),
            requiresDialog: isDialog(dataField.ActionTarget),
            buttonType: getButtonType(UIAnnotation === null || UIAnnotation === void 0 ? void 0 : UIAnnotation.Emphasized),
            press: compileBinding(fn("invokeAction", [dataField.Action, {
              contexts: fn("getBindingContext", [], bindingExpression("", "$source")),
              invocationGrouping: dataField.InvocationGrouping === "UI.OperationGroupingType/ChangeSet" ? "ChangeSet" : "Isolated",
              label: annotationExpression(dataField.Label),
              model: fn("getModel", [], bindingExpression("/", "$source")),
              isNavigable: isActionNavigable(formManifestActionsConfiguration && formManifestActionsConfiguration[key])
            }], ref(".editFlow")))
          });
          break;
      }

      return actions;
    }, actions);
    return insertCustomElements(actions, manifestActions);
  }

  function isDialog(actionDefinition) {
    if (actionDefinition) {
      var _actionDefinition$ann, _actionDefinition$ann2;

      var bCritical = (_actionDefinition$ann = actionDefinition.annotations) === null || _actionDefinition$ann === void 0 ? void 0 : (_actionDefinition$ann2 = _actionDefinition$ann.Common) === null || _actionDefinition$ann2 === void 0 ? void 0 : _actionDefinition$ann2.IsActionCritical;

      if (actionDefinition.parameters.length > 1 || bCritical) {
        return "Dialog";
      } else {
        return "None";
      }
    } else {
      return "None";
    }
  }

  _exports.isDialog = isDialog;

  function createCustomSubSections(manifestSubSections, converterContext) {
    var subSections = {};
    Object.keys(manifestSubSections).forEach(function (subSectionKey) {
      return subSections[subSectionKey] = createCustomSubSection(manifestSubSections[subSectionKey], subSectionKey, converterContext);
    });
    return subSections;
  }

  _exports.createCustomSubSections = createCustomSubSections;

  function createCustomSubSection(manifestSubSection, subSectionKey, converterContext) {
    var sideContent = manifestSubSection.sideContent ? {
      template: manifestSubSection.sideContent.template,
      id: SideContentID(subSectionKey),
      visible: false
    } : undefined;
    var position = manifestSubSection.position;

    if (!position) {
      position = {
        placement: Placement.After
      };
    }

    var subSectionDefinition = {
      type: SubSectionType.Unknown,
      id: manifestSubSection.id || CustomSubSectionID(subSectionKey),
      actions: getActionsFromManifest(manifestSubSection.actions, converterContext),
      key: subSectionKey,
      title: manifestSubSection.title,
      level: 1,
      position: position,
      visible: manifestSubSection.visible,
      sideContent: sideContent
    };

    if (manifestSubSection.template || manifestSubSection.name) {
      subSectionDefinition.type = SubSectionType.XMLFragment;
      subSectionDefinition.template = manifestSubSection.template || manifestSubSection.name || "";
    } else {
      subSectionDefinition.type = SubSectionType.Placeholder;
    }

    return subSectionDefinition;
  }
  /**
   * Evaluate if the condensed mode can be appli3ed on the table.
   *
   * @param currentFacet
   * @param facetsToCreateInSection
   * @param converterContext
   *
   * @returns {boolean} `true` for compliant, false otherwise
   */


  _exports.createCustomSubSection = createCustomSubSection;

  function getCondensedTableLayoutCompliance(currentFacet, facetsToCreateInSection, converterContext) {
    var manifestWrapper = converterContext.getManifestWrapper();

    if (manifestWrapper.useIconTabBar()) {
      // If the OP use the tab based we check if the facets that will be created for this section are all non visible
      return hasNoOtherVisibleTableInTargets(currentFacet, facetsToCreateInSection);
    } else {
      var _entityType$annotatio, _entityType$annotatio2, _entityType$annotatio3, _entityType$annotatio4, _entityType$annotatio5, _entityType$annotatio6;

      var entityType = converterContext.getEntityType();

      if (((_entityType$annotatio = entityType.annotations) === null || _entityType$annotatio === void 0 ? void 0 : (_entityType$annotatio2 = _entityType$annotatio.UI) === null || _entityType$annotatio2 === void 0 ? void 0 : (_entityType$annotatio3 = _entityType$annotatio2.Facets) === null || _entityType$annotatio3 === void 0 ? void 0 : _entityType$annotatio3.length) && ((_entityType$annotatio4 = entityType.annotations) === null || _entityType$annotatio4 === void 0 ? void 0 : (_entityType$annotatio5 = _entityType$annotatio4.UI) === null || _entityType$annotatio5 === void 0 ? void 0 : (_entityType$annotatio6 = _entityType$annotatio5.Facets) === null || _entityType$annotatio6 === void 0 ? void 0 : _entityType$annotatio6.length) > 1) {
        return hasNoOtherVisibleTableInTargets(currentFacet, facetsToCreateInSection);
      } else {
        return true;
      }
    }
  }

  function hasNoOtherVisibleTableInTargets(currentFacet, facetsToCreateInSection) {
    return facetsToCreateInSection.every(function (subFacet) {
      if (subFacet !== currentFacet) {
        if (subFacet.$Type === "com.sap.vocabularies.UI.v1.ReferenceFacet") {
          var _refFacet$Target, _refFacet$Target$$tar, _refFacet$Target2, _refFacet$Target2$$ta, _refFacet$Target$$tar2;

          var refFacet = subFacet;

          if (((_refFacet$Target = refFacet.Target) === null || _refFacet$Target === void 0 ? void 0 : (_refFacet$Target$$tar = _refFacet$Target.$target) === null || _refFacet$Target$$tar === void 0 ? void 0 : _refFacet$Target$$tar.term) === "com.sap.vocabularies.UI.v1.LineItem" || ((_refFacet$Target2 = refFacet.Target) === null || _refFacet$Target2 === void 0 ? void 0 : (_refFacet$Target2$$ta = _refFacet$Target2.$target) === null || _refFacet$Target2$$ta === void 0 ? void 0 : _refFacet$Target2$$ta.term) === "com.sap.vocabularies.UI.v1.PresentationVariant" || ((_refFacet$Target$$tar2 = refFacet.Target.$target) === null || _refFacet$Target$$tar2 === void 0 ? void 0 : _refFacet$Target$$tar2.term) === "com.sap.vocabularies.UI.v1.SelectionPresentationVariant") {
            var _refFacet$annotations, _refFacet$annotations2, _refFacet$annotations3, _refFacet$annotations4;

            return ((_refFacet$annotations = refFacet.annotations) === null || _refFacet$annotations === void 0 ? void 0 : (_refFacet$annotations2 = _refFacet$annotations.UI) === null || _refFacet$annotations2 === void 0 ? void 0 : _refFacet$annotations2.Hidden) !== undefined ? (_refFacet$annotations3 = refFacet.annotations) === null || _refFacet$annotations3 === void 0 ? void 0 : (_refFacet$annotations4 = _refFacet$annotations3.UI) === null || _refFacet$annotations4 === void 0 ? void 0 : _refFacet$annotations4.Hidden : false;
          }

          return true;
        } else {
          var subCollectionFacet = subFacet;
          return subCollectionFacet.Facets.every(function (facet) {
            var _subRefFacet$Target, _subRefFacet$Target$$, _subRefFacet$Target2, _subRefFacet$Target2$, _subRefFacet$Target3, _subRefFacet$Target3$;

            var subRefFacet = facet;

            if (((_subRefFacet$Target = subRefFacet.Target) === null || _subRefFacet$Target === void 0 ? void 0 : (_subRefFacet$Target$$ = _subRefFacet$Target.$target) === null || _subRefFacet$Target$$ === void 0 ? void 0 : _subRefFacet$Target$$.term) === "com.sap.vocabularies.UI.v1.LineItem" || ((_subRefFacet$Target2 = subRefFacet.Target) === null || _subRefFacet$Target2 === void 0 ? void 0 : (_subRefFacet$Target2$ = _subRefFacet$Target2.$target) === null || _subRefFacet$Target2$ === void 0 ? void 0 : _subRefFacet$Target2$.term) === "com.sap.vocabularies.UI.v1.PresentationVariant" || ((_subRefFacet$Target3 = subRefFacet.Target) === null || _subRefFacet$Target3 === void 0 ? void 0 : (_subRefFacet$Target3$ = _subRefFacet$Target3.$target) === null || _subRefFacet$Target3$ === void 0 ? void 0 : _subRefFacet$Target3$.term) === "com.sap.vocabularies.UI.v1.SelectionPresentationVariant") {
              var _subRefFacet$annotati, _subRefFacet$annotati2, _subRefFacet$annotati3, _subRefFacet$annotati4;

              return ((_subRefFacet$annotati = subRefFacet.annotations) === null || _subRefFacet$annotati === void 0 ? void 0 : (_subRefFacet$annotati2 = _subRefFacet$annotati.UI) === null || _subRefFacet$annotati2 === void 0 ? void 0 : _subRefFacet$annotati2.Hidden) !== undefined ? (_subRefFacet$annotati3 = subRefFacet.annotations) === null || _subRefFacet$annotati3 === void 0 ? void 0 : (_subRefFacet$annotati4 = _subRefFacet$annotati3.UI) === null || _subRefFacet$annotati4 === void 0 ? void 0 : _subRefFacet$annotati4.Hidden : false;
            }

            return true;
          });
        }
      }

      return true;
    });
  }

  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlN1YlNlY3Rpb24udHMiXSwibmFtZXMiOlsiU3ViU2VjdGlvblR5cGUiLCJ0YXJnZXRUZXJtcyIsImhhc1RhYmxlIiwiZmFjZXRzIiwic29tZSIsImZhY2V0VHlwZSIsImluZGV4T2YiLCJUYXJnZXQiLCIkdGFyZ2V0IiwidGVybSIsImNyZWF0ZVN1YlNlY3Rpb25zIiwiZmFjZXRDb2xsZWN0aW9uIiwiY29udmVydGVyQ29udGV4dCIsImlzSGVhZGVyU2VjdGlvbiIsImZhY2V0c1RvQ3JlYXRlIiwicmVkdWNlIiwiZmFjZXREZWZpbml0aW9uIiwiJFR5cGUiLCJwdXNoIiwiRmFjZXRzIiwiZmluZCIsInNwbGljZSIsImxlbmd0aCIsIm1hcCIsImZhY2V0IiwiY3JlYXRlU3ViU2VjdGlvbiIsImNyZWF0ZUN1c3RvbUhlYWRlckZhY2V0U3ViU2VjdGlvbnMiLCJjdXN0b21IZWFkZXJGYWNldHMiLCJnZXRIZWFkZXJGYWNldHNGcm9tTWFuaWZlc3QiLCJnZXRNYW5pZmVzdFdyYXBwZXIiLCJnZXRIZWFkZXJGYWNldHMiLCJhQ3VzdG9tSGVhZGVyRmFjZXRzIiwiT2JqZWN0Iiwia2V5cyIsImtleSIsImN1c3RvbUhlYWRlckZhY2V0IiwidGVtcGxhdGVFZGl0IiwiY3JlYXRlQ3VzdG9tSGVhZGVyRmFjZXRTdWJTZWN0aW9uIiwic3ViU2VjdGlvbklEIiwiQ3VzdG9tU3ViU2VjdGlvbklEIiwic3ViU2VjdGlvbiIsImlkIiwidGl0bGUiLCJ0eXBlIiwiWE1MRnJhZ21lbnQiLCJ0ZW1wbGF0ZSIsInZpc2libGUiLCJsZXZlbCIsInNpZGVDb250ZW50IiwidW5kZWZpbmVkIiwic3Rhc2hlZCIsImZsZXhTZXR0aW5ncyIsImFjdGlvbnMiLCJnZXRTdWJTZWN0aW9uS2V5IiwiZmFsbGJhY2siLCJJRCIsInRvU3RyaW5nIiwiTGFiZWwiLCJhZGRGb3JtTWVudUFjdGlvbnMiLCJoaWRkZW5BY3Rpb25zIiwiZ2V0Rm9ybUhpZGRlbkFjdGlvbnMiLCJmb3JtQWN0aW9ucyIsImdldEZvcm1BY3Rpb25zIiwiZm9ybUFsbEFjdGlvbnMiLCJpbnNlcnRDdXN0b21FbGVtZW50cyIsImdldEFjdGlvbnNGcm9tTWFuaWZlc3QiLCJnZXRWaXNpYmlsaXR5RW5hYmxlbWVudEZvcm1NZW51QWN0aW9ucyIsInJlbW92ZUR1cGxpY2F0ZUFjdGlvbnMiLCJnZXRGYWNldEFjdGlvbnMiLCJBcnJheSIsImZpbHRlciIsImlzUmVmZXJlbmNlRmFjZXQiLCJjcmVhdGVGb3JtQWN0aW9uUmVkdWNlciIsImdldEJ1dHRvblR5cGUiLCJFbXBoYXNpemVkIiwiUGF0aEZvckJ1dHRvblR5cGUiLCJwYXRoIiwiQnV0dG9uVHlwZSIsIlRyYW5zcGFyZW50IiwiR2hvc3QiLCJoYXNTaW5nbGVDb250ZW50IiwiU3ViU2VjdGlvbklEIiwiRmFjZXQiLCJjb21waWxlQmluZGluZyIsImFubm90YXRpb25FeHByZXNzaW9uIiwiVW5rbm93biIsImFubm90YXRpb25QYXRoIiwiZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aCIsImZ1bGx5UXVhbGlmaWVkTmFtZSIsIm5vdCIsImVxdWFsIiwiYW5ub3RhdGlvbnMiLCJVSSIsIkhpZGRlbiIsImdldFN0YXNoZWRTZXR0aW5nc0ZvckhlYWRlckZhY2V0IiwiZGVzaWdudGltZSIsImdldERlc2lnblRpbWVNZXRhZGF0YVNldHRpbmdzRm9ySGVhZGVyRmFjZXQiLCJjb250ZW50IiwidGFibGVDb250ZW50IiwiaW5kZXgiLCJ1bnN1cHBvcnRlZFRleHQiLCJpIiwiY29uY2F0IiwibWl4ZWRTdWJTZWN0aW9uIiwiTWl4ZWQiLCJmb3JtQ29sbGVjdGlvblN1YlNlY3Rpb24iLCJGb3JtIiwiZm9ybURlZmluaXRpb24iLCJjcmVhdGVGb3JtRGVmaW5pdGlvbiIsInZhbHVlIiwicHJlc2VudGF0aW9uIiwiZ2V0RGF0YVZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uIiwiZ2V0Q29uZGVuc2VkVGFibGVMYXlvdXRDb21wbGlhbmNlIiwiY29udHJvbFRpdGxlIiwidmlzdWFsaXphdGlvbnMiLCJhbm5vdGF0aW9uIiwiZGF0YVZpc3VhbGl6YXRpb25TdWJTZWN0aW9uIiwiRGF0YVZpc3VhbGl6YXRpb24iLCJzaG93VGl0bGUiLCJpc1N1YnNlY3Rpb25UaXRsZVNob3duIiwiZm9ybUVsZW1lbnRTdWJTZWN0aW9uIiwidW5zdXBwb3J0ZWRTdWJTZWN0aW9uIiwidGV4dCIsInN1YlNlY3Rpb25UaXRsZSIsInJlZmVyZW5jZVRhcmdldCIsInRhcmdldFZhbHVlIiwibWFuaWZlc3RBY3Rpb25zIiwiZGF0YUZpZWxkQ29sbGVjdGlvbiIsInNwbGl0IiwibmF2aWdhdGlvblByb3BlcnR5UGF0aCIsImxhc3RJbmRleE9mIiwic3Vic3RyIiwiRGF0YSIsImdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24iLCJxdWFsaWZpZXIiLCJkYXRhRmllbGQiLCJVSUFubm90YXRpb24iLCJSZXF1aXJlc0NvbnRleHQiLCJ2YWx1ZU9mIiwiZ2V0RGlhZ25vc3RpY3MiLCJhZGRJc3N1ZSIsIklzc3VlQ2F0ZWdvcnkiLCJBbm5vdGF0aW9uIiwiSXNzdWVTZXZlcml0eSIsIkxvdyIsIklzc3VlVHlwZSIsIk1BTEZPUk1FRF9EQVRBRklFTERfRk9SX0lCTiIsIlJFUVVJUkVTQ09OVEVYVCIsIklubGluZSIsIklOTElORSIsIm1OYXZpZ2F0aW9uUGFyYW1ldGVycyIsIk1hcHBpbmciLCJzZW1hbnRpY09iamVjdE1hcHBpbmciLCJnZXRTZW1hbnRpY09iamVjdE1hcHBpbmciLCJBY3Rpb25UeXBlIiwiRGF0YUZpZWxkRm9ySW50ZW50QmFzZWROYXZpZ2F0aW9uIiwiRm9ybUlEIiwiS2V5SGVscGVyIiwiZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkIiwiZW5hYmxlZCIsIk5hdmlnYXRpb25BdmFpbGFibGUiLCJidXR0b25UeXBlIiwicHJlc3MiLCJmbiIsIlNlbWFudGljT2JqZWN0IiwiQWN0aW9uIiwiY3VzdG9tRGF0YSIsInNlbWFudGljT2JqZWN0IiwiYWN0aW9uIiwiZm9ybU1hbmlmZXN0QWN0aW9uc0NvbmZpZ3VyYXRpb24iLCJEYXRhRmllbGRGb3JBY3Rpb24iLCJnZXRFbmFibGVkQmluZGluZyIsIkFjdGlvblRhcmdldCIsImJpbmRpbmciLCJyZXF1aXJlc0RpYWxvZyIsImlzRGlhbG9nIiwiY29udGV4dHMiLCJiaW5kaW5nRXhwcmVzc2lvbiIsImludm9jYXRpb25Hcm91cGluZyIsIkludm9jYXRpb25Hcm91cGluZyIsImxhYmVsIiwibW9kZWwiLCJpc05hdmlnYWJsZSIsImlzQWN0aW9uTmF2aWdhYmxlIiwicmVmIiwiYWN0aW9uRGVmaW5pdGlvbiIsImJDcml0aWNhbCIsIkNvbW1vbiIsIklzQWN0aW9uQ3JpdGljYWwiLCJwYXJhbWV0ZXJzIiwiY3JlYXRlQ3VzdG9tU3ViU2VjdGlvbnMiLCJtYW5pZmVzdFN1YlNlY3Rpb25zIiwic3ViU2VjdGlvbnMiLCJmb3JFYWNoIiwic3ViU2VjdGlvbktleSIsImNyZWF0ZUN1c3RvbVN1YlNlY3Rpb24iLCJtYW5pZmVzdFN1YlNlY3Rpb24iLCJTaWRlQ29udGVudElEIiwicG9zaXRpb24iLCJwbGFjZW1lbnQiLCJQbGFjZW1lbnQiLCJBZnRlciIsInN1YlNlY3Rpb25EZWZpbml0aW9uIiwibmFtZSIsIlBsYWNlaG9sZGVyIiwiY3VycmVudEZhY2V0IiwiZmFjZXRzVG9DcmVhdGVJblNlY3Rpb24iLCJtYW5pZmVzdFdyYXBwZXIiLCJ1c2VJY29uVGFiQmFyIiwiaGFzTm9PdGhlclZpc2libGVUYWJsZUluVGFyZ2V0cyIsImVudGl0eVR5cGUiLCJnZXRFbnRpdHlUeXBlIiwiZXZlcnkiLCJzdWJGYWNldCIsInJlZkZhY2V0Iiwic3ViQ29sbGVjdGlvbkZhY2V0Iiwic3ViUmVmRmFjZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01Bb0RZQSxjOzthQUFBQSxjO0FBQUFBLElBQUFBLGM7QUFBQUEsSUFBQUEsYztBQUFBQSxJQUFBQSxjO0FBQUFBLElB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LEVBSUU7QUFBQTs7QUFDRCxtQkFBTywwQkFBQTZNLFFBQVEsQ0FBQzNILFdBQVQsMEdBQXNCQyxFQUF0QixrRkFBMEJDLE1BQTFCLE1BQXFDNUMsU0FBckMsNkJBQWlEcUssUUFBUSxDQUFDM0gsV0FBMUQscUZBQWlELHVCQUFzQkMsRUFBdkUsMkRBQWlELHVCQUEwQkMsTUFBM0UsR0FBb0YsS0FBM0Y7QUFDQTs7QUFDRCxpQkFBTyxJQUFQO0FBQ0EsU0FWRCxNQVVPO0FBQ04sY0FBTTBILGtCQUFrQixHQUFHRixRQUEzQjtBQUNBLGlCQUFPRSxrQkFBa0IsQ0FBQ3BNLE1BQW5CLENBQTBCaU0sS0FBMUIsQ0FBZ0MsVUFBUzVMLEtBQVQsRUFBZ0I7QUFBQTs7QUFDdEQsZ0JBQU1nTSxXQUFXLEdBQUdoTSxLQUFwQjs7QUFDQSxnQkFDQyx3QkFBQWdNLFdBQVcsQ0FBQ2pOLE1BQVoscUdBQW9CQyxPQUFwQixnRkFBNkJDLElBQTdCLCtDQUNBLHlCQUFBK00sV0FBVyxDQUFDak4sTUFBWix1R0FBb0JDLE9BQXBCLGdGQUE2QkMsSUFBN0Isc0RBREEsSUFFQSx5QkFBQStNLFdBQVcsQ0FBQ2pOLE1BQVosdUdBQW9CQyxPQUFwQixnRkFBNkJDLElBQTdCLCtEQUhELEVBSUU7QUFBQTs7QUFDRCxxQkFBTywwQkFBQStNLFdBQVcsQ0FBQzdILFdBQVosMEdBQXlCQyxFQUF6QixrRkFBNkJDLE1BQTdCLE1BQXdDNUMsU0FBeEMsNkJBQW9EdUssV0FBVyxDQUFDN0gsV0FBaEUscUZBQW9ELHVCQUF5QkMsRUFBN0UsMkRBQW9ELHVCQUE2QkMsTUFBakYsR0FBMEYsS0FBakc7QUFDQTs7QUFDRCxtQkFBTyxJQUFQO0FBQ0EsV0FWTSxDQUFQO0FBV0E7QUFDRDs7QUFDRCxhQUFPLElBQVA7QUFDQSxLQTVCTSxDQUFQO0FBNkJBIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBY3Rpb25UeXBlLCBNYW5pZmVzdFN1YlNlY3Rpb24sIE1hbmlmZXN0QWN0aW9uIH0gZnJvbSBcIi4uLy4uL01hbmlmZXN0U2V0dGluZ3NcIjtcbmltcG9ydCB7XG5cdEFubm90YXRpb25UZXJtLFxuXHRDb2xsZWN0aW9uRmFjZXRUeXBlcyxcblx0RGF0YUZpZWxkQWJzdHJhY3RUeXBlcyxcblx0RmFjZXRUeXBlcyxcblx0RmllbGRHcm91cCxcblx0SWRlbnRpZmljYXRpb24sXG5cdE9wZXJhdGlvbkdyb3VwaW5nVHlwZSxcblx0UmVmZXJlbmNlRmFjZXRUeXBlcyxcblx0U3RhdHVzSW5mbyxcblx0VUlBbm5vdGF0aW9uVGVybXMsXG5cdFVJQW5ub3RhdGlvblR5cGVzXG59IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlc1wiO1xuaW1wb3J0IHsgQ29tbXVuaWNhdGlvbkFubm90YXRpb25UZXJtcyB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy9kaXN0L2dlbmVyYXRlZC9Db21tdW5pY2F0aW9uXCI7XG5pbXBvcnQgeyBDdXN0b21TdWJTZWN0aW9uSUQsIEZvcm1JRCwgU3ViU2VjdGlvbklELCBTaWRlQ29udGVudElEIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvSURcIjtcbmltcG9ydCB7IGNyZWF0ZUZvcm1EZWZpbml0aW9uLCBGb3JtRGVmaW5pdGlvbiwgaXNSZWZlcmVuY2VGYWNldCB9IGZyb20gXCIuLi9Db21tb24vRm9ybVwiO1xuaW1wb3J0IHsgRGF0YVZpc3VhbGl6YXRpb25EZWZpbml0aW9uLCBnZXREYXRhVmlzdWFsaXphdGlvbkNvbmZpZ3VyYXRpb24gfSBmcm9tIFwiLi4vQ29tbW9uL0RhdGFWaXN1YWxpemF0aW9uXCI7XG5pbXBvcnQgeyBDb25maWd1cmFibGVPYmplY3QsIENvbmZpZ3VyYWJsZVJlY29yZCwgQ3VzdG9tRWxlbWVudCwgaW5zZXJ0Q3VzdG9tRWxlbWVudHMsIFBsYWNlbWVudCB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL0NvbmZpZ3VyYWJsZU9iamVjdFwiO1xuaW1wb3J0IHtcblx0Q29udmVydGVyQWN0aW9uLFxuXHRDdXN0b21BY3Rpb24sXG5cdGdldEFjdGlvbnNGcm9tTWFuaWZlc3QsXG5cdGdldEVuYWJsZWRCaW5kaW5nLFxuXHRpc0FjdGlvbk5hdmlnYWJsZSxcblx0QnV0dG9uVHlwZSxcblx0Z2V0U2VtYW50aWNPYmplY3RNYXBwaW5nLFxuXHRyZW1vdmVEdXBsaWNhdGVBY3Rpb25zLFxuXHRCYXNlQWN0aW9uXG59IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2NvbnRyb2xzL0NvbW1vbi9BY3Rpb25cIjtcbmltcG9ydCB7IEtleUhlbHBlciB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvS2V5XCI7XG5pbXBvcnQge1xuXHRhbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0YmluZGluZ0V4cHJlc3Npb24sXG5cdEJpbmRpbmdFeHByZXNzaW9uLFxuXHRjb21waWxlQmluZGluZyxcblx0ZXF1YWwsXG5cdGZuLFxuXHRub3QsXG5cdHJlZlxufSBmcm9tIFwic2FwL2ZlL2NvcmUvaGVscGVycy9CaW5kaW5nRXhwcmVzc2lvblwiO1xuaW1wb3J0IHsgSXNzdWVUeXBlLCBJc3N1ZVNldmVyaXR5LCBJc3N1ZUNhdGVnb3J5IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Jc3N1ZU1hbmFnZXJcIjtcbmltcG9ydCB7XG5cdEZsZXhTZXR0aW5ncyxcblx0Z2V0RGVzaWduVGltZU1ldGFkYXRhU2V0dGluZ3NGb3JIZWFkZXJGYWNldCxcblx0Z2V0U3Rhc2hlZFNldHRpbmdzRm9ySGVhZGVyRmFjZXQsXG5cdEN1c3RvbU9iamVjdFBhZ2VIZWFkZXJGYWNldCxcblx0Z2V0SGVhZGVyRmFjZXRzRnJvbU1hbmlmZXN0XG59IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2NvbnRyb2xzL09iamVjdFBhZ2UvSGVhZGVyRmFjZXRcIjtcbmltcG9ydCB7IGdldFZpc2liaWxpdHlFbmFibGVtZW50Rm9ybU1lbnVBY3Rpb25zLCBnZXRGb3JtSGlkZGVuQWN0aW9ucywgZ2V0Rm9ybUFjdGlvbnMgfSBmcm9tIFwiLi4vLi4vb2JqZWN0UGFnZS9Gb3JtTWVudUFjdGlvbnNcIjtcbmltcG9ydCBDb252ZXJ0ZXJDb250ZXh0IGZyb20gXCIuLi8uLi9Db252ZXJ0ZXJDb250ZXh0XCI7XG5cbmV4cG9ydCBlbnVtIFN1YlNlY3Rpb25UeXBlIHtcblx0VW5rbm93biA9IFwiVW5rbm93blwiLCAvLyBEZWZhdWx0IFR5cGVcblx0Rm9ybSA9IFwiRm9ybVwiLFxuXHREYXRhVmlzdWFsaXphdGlvbiA9IFwiRGF0YVZpc3VhbGl6YXRpb25cIixcblx0WE1MRnJhZ21lbnQgPSBcIlhNTEZyYWdtZW50XCIsXG5cdFBsYWNlaG9sZGVyID0gXCJQbGFjZWhvbGRlclwiLFxuXHRNaXhlZCA9IFwiTWl4ZWRcIlxufVxuXG5leHBvcnQgdHlwZSBPYmplY3RQYWdlU3ViU2VjdGlvbiA9XG5cdHwgVW5zdXBwb3J0ZWRTdWJTZWN0aW9uXG5cdHwgRm9ybVN1YlNlY3Rpb25cblx0fCBEYXRhVmlzdWFsaXphdGlvblN1YlNlY3Rpb25cblx0fCBDb250YWN0U3ViU2VjdGlvblxuXHR8IFhNTEZyYWdtZW50U3ViU2VjdGlvblxuXHR8IFBsYWNlaG9sZGVyRnJhZ21lbnRTdWJTZWN0aW9uXG5cdHwgTWl4ZWRTdWJTZWN0aW9uO1xuXG50eXBlIEJhc2VTdWJTZWN0aW9uID0ge1xuXHRpZDogc3RyaW5nO1xuXHRrZXk6IHN0cmluZztcblx0dGl0bGU6IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz47XG5cdGFubm90YXRpb25QYXRoOiBzdHJpbmc7XG5cdHR5cGU6IFN1YlNlY3Rpb25UeXBlO1xuXHR2aXNpYmxlOiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0ZmxleFNldHRpbmdzPzogRmxleFNldHRpbmdzO1xuXHRzdGFzaGVkPzogYm9vbGVhbjtcblx0bGV2ZWw6IG51bWJlcjtcblx0c2lkZUNvbnRlbnQ/OiBTaWRlQ29udGVudERlZjtcbn07XG5cbnR5cGUgVW5zdXBwb3J0ZWRTdWJTZWN0aW9uID0gQmFzZVN1YlNlY3Rpb24gJiB7XG5cdHRleHQ6IHN0cmluZztcbn07XG5cbnR5cGUgRGF0YVZpc3VhbGl6YXRpb25TdWJTZWN0aW9uID0gQmFzZVN1YlNlY3Rpb24gJiB7XG5cdHR5cGU6IFN1YlNlY3Rpb25UeXBlLkRhdGFWaXN1YWxpemF0aW9uO1xuXHRwcmVzZW50YXRpb246IERhdGFWaXN1YWxpemF0aW9uRGVmaW5pdGlvbjtcblx0c2hvd1RpdGxlOiBib29sZWFuO1xufTtcblxudHlwZSBDb250YWN0U3ViU2VjdGlvbiA9IFVuc3VwcG9ydGVkU3ViU2VjdGlvbiAmIHt9O1xuXG50eXBlIFhNTEZyYWdtZW50U3ViU2VjdGlvbiA9IE9taXQ8QmFzZVN1YlNlY3Rpb24sIFwiYW5ub3RhdGlvblBhdGhcIj4gJiB7XG5cdHR5cGU6IFN1YlNlY3Rpb25UeXBlLlhNTEZyYWdtZW50O1xuXHR0ZW1wbGF0ZTogc3RyaW5nO1xuXHRhY3Rpb25zOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21BY3Rpb24+O1xufTtcblxudHlwZSBFbXBoYXNpemVkID0ge1xuXHRwYXRoOiBzdHJpbmc7XG59O1xuXG50eXBlIFBsYWNlaG9sZGVyRnJhZ21lbnRTdWJTZWN0aW9uID0gT21pdDxCYXNlU3ViU2VjdGlvbiwgXCJhbm5vdGF0aW9uUGF0aFwiPiAmIHtcblx0dHlwZTogU3ViU2VjdGlvblR5cGUuUGxhY2Vob2xkZXI7XG5cdGFjdGlvbnM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUFjdGlvbj47XG59O1xuXG50eXBlIE1peGVkU3ViU2VjdGlvbiA9IEJhc2VTdWJTZWN0aW9uICYge1xuXHRjb250ZW50OiBBcnJheTxPYmplY3RQYWdlU3ViU2VjdGlvbj47XG59O1xuXG5leHBvcnQgdHlwZSBGb3JtU3ViU2VjdGlvbiA9IEJhc2VTdWJTZWN0aW9uICYge1xuXHR0eXBlOiBTdWJTZWN0aW9uVHlwZS5Gb3JtO1xuXHRmb3JtRGVmaW5pdGlvbjogRm9ybURlZmluaXRpb247XG5cdGFjdGlvbnM6IENvbnZlcnRlckFjdGlvbltdIHwgQmFzZUFjdGlvbltdO1xufTtcblxuZXhwb3J0IHR5cGUgT2JqZWN0UGFnZVNlY3Rpb24gPSBDb25maWd1cmFibGVPYmplY3QgJiB7XG5cdGlkOiBzdHJpbmc7XG5cdHRpdGxlOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+O1xuXHRzaG93VGl0bGU/OiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0dmlzaWJsZTogQmluZGluZ0V4cHJlc3Npb248Ym9vbGVhbj47XG5cdHN1YlNlY3Rpb25zOiBPYmplY3RQYWdlU3ViU2VjdGlvbltdO1xufTtcblxudHlwZSBTaWRlQ29udGVudERlZiA9IHtcblx0dGVtcGxhdGU/OiBzdHJpbmc7XG5cdGlkPzogc3RyaW5nO1xuXHRzaWRlQ29udGVudEZhbGxEb3duPzogc3RyaW5nO1xuXHRjb250YWluZXJRdWVyeT86IHN0cmluZztcblx0dmlzaWJsZT86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBDdXN0b21PYmplY3RQYWdlU2VjdGlvbiA9IEN1c3RvbUVsZW1lbnQ8T2JqZWN0UGFnZVNlY3Rpb24+O1xuXG5leHBvcnQgdHlwZSBDdXN0b21PYmplY3RQYWdlU3ViU2VjdGlvbiA9IEN1c3RvbUVsZW1lbnQ8T2JqZWN0UGFnZVN1YlNlY3Rpb24+O1xuXG5jb25zdCB0YXJnZXRUZXJtczogc3RyaW5nW10gPSBbXG5cdFVJQW5ub3RhdGlvblRlcm1zLkxpbmVJdGVtLFxuXHRVSUFubm90YXRpb25UZXJtcy5QcmVzZW50YXRpb25WYXJpYW50LFxuXHRVSUFubm90YXRpb25UZXJtcy5TZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50XG5dO1xuXG4vLyBUT0RPOiBOZWVkIHRvIGhhbmRsZSBUYWJsZSBjYXNlIGluc2lkZSBjcmVhdGVTdWJTZWN0aW9uIGZ1bmN0aW9uIGlmIENvbGxlY3Rpb25GYWNldCBoYXMgVGFibGUgUmVmZXJlbmNlRmFjZXRcbmNvbnN0IGhhc1RhYmxlID0gKGZhY2V0czogYW55W10gPSBbXSkgPT4ge1xuXHRyZXR1cm4gZmFjZXRzLnNvbWUoZmFjZXRUeXBlID0+IHRhcmdldFRlcm1zLmluZGV4T2YoZmFjZXRUeXBlPy5UYXJnZXQ/LiR0YXJnZXQ/LnRlcm0pID4gLTEpO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgc3Vic2VjdGlvbnMgYmFzZWQgb24gZmFjZXQgZGVmaW5pdGlvbi5cbiAqXG4gKiBAcGFyYW0gZmFjZXRDb2xsZWN0aW9uXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dFxuICogQHBhcmFtIGlzSGVhZGVyU2VjdGlvblxuICogQHJldHVybnMge09iamVjdFBhZ2VTdWJTZWN0aW9uW119IFRoZSBjdXJyZW50IHN1YmVjdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN1YlNlY3Rpb25zKFxuXHRmYWNldENvbGxlY3Rpb246IEZhY2V0VHlwZXNbXSxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0aXNIZWFkZXJTZWN0aW9uPzogYm9vbGVhblxuKTogT2JqZWN0UGFnZVN1YlNlY3Rpb25bXSB7XG5cdC8vIEZpcnN0IHdlIGRldGVybWluZSB3aGljaCBzdWIgc2VjdGlvbiB3ZSBuZWVkIHRvIGNyZWF0ZVxuXHRjb25zdCBmYWNldHNUb0NyZWF0ZSA9IGZhY2V0Q29sbGVjdGlvbi5yZWR1Y2UoKGZhY2V0c1RvQ3JlYXRlOiBGYWNldFR5cGVzW10sIGZhY2V0RGVmaW5pdGlvbikgPT4ge1xuXHRcdHN3aXRjaCAoZmFjZXREZWZpbml0aW9uLiRUeXBlKSB7XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLlJlZmVyZW5jZUZhY2V0OlxuXHRcdFx0XHRmYWNldHNUb0NyZWF0ZS5wdXNoKGZhY2V0RGVmaW5pdGlvbik7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5Db2xsZWN0aW9uRmFjZXQ6XG5cdFx0XHRcdC8vIFRPRE8gSWYgdGhlIENvbGxlY3Rpb24gRmFjZXQgaGFzIGEgY2hpbGQgb2YgdHlwZSBDb2xsZWN0aW9uIEZhY2V0IHdlIGJyaW5nIHRoZW0gdXAgb25lIGxldmVsIChGb3JtICsgVGFibGUgdXNlIGNhc2UpID9cblx0XHRcdFx0Ly8gZmlyc3QgY2FzZSBmYWNldCBDb2xsZWN0aW9uIGlzIGNvbWJpbmF0aW9uIG9mIGNvbGxlY3Rpb24gYW5kIHJlZmVyZW5jZSBmYWNldCBvciBub3QgYWxsIGZhY2V0cyBhcmUgcmVmZXJlbmNlIGZhY2V0cy5cblx0XHRcdFx0aWYgKGZhY2V0RGVmaW5pdGlvbi5GYWNldHMuZmluZChmYWNldFR5cGUgPT4gZmFjZXRUeXBlLiRUeXBlID09PSBVSUFubm90YXRpb25UeXBlcy5Db2xsZWN0aW9uRmFjZXQpKSB7XG5cdFx0XHRcdFx0ZmFjZXRzVG9DcmVhdGUuc3BsaWNlKGZhY2V0c1RvQ3JlYXRlLmxlbmd0aCwgMCwgLi4uZmFjZXREZWZpbml0aW9uLkZhY2V0cyk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0ZmFjZXRzVG9DcmVhdGUucHVzaChmYWNldERlZmluaXRpb24pO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5SZWZlcmVuY2VVUkxGYWNldDpcblx0XHRcdFx0Ly8gTm90IHN1cHBvcnRlZFxuXHRcdFx0XHRicmVhaztcblx0XHR9XG5cdFx0cmV0dXJuIGZhY2V0c1RvQ3JlYXRlO1xuXHR9LCBbXSk7XG5cblx0Ly8gVGhlbiB3ZSBjcmVhdGUgdGhlIGFjdHVhbCBzdWJzZWN0aW9uc1xuXHRyZXR1cm4gZmFjZXRzVG9DcmVhdGUubWFwKGZhY2V0ID0+XG5cdFx0Y3JlYXRlU3ViU2VjdGlvbihmYWNldCwgZmFjZXRzVG9DcmVhdGUsIGNvbnZlcnRlckNvbnRleHQsIDAsICEoZmFjZXQgYXMgYW55KT8uRmFjZXRzPy5sZW5ndGgsIGlzSGVhZGVyU2VjdGlvbilcblx0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIHN1YnNlY3Rpb25zIGJhc2VkIG9uIHRoZSBkZWZpbml0aW9uIG9mIHRoZSBjdXN0b20gaGVhZGVyIGZhY2V0LlxuICpcbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0IFRoZSBjb252ZXJ0ZXIgY29udGV4dFxuICogQHJldHVybnMge09iamVjdFBhZ2VTdWJTZWN0aW9uW119IFRoZSBjdXJyZW50IHN1YmVjdGlvbnNcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbUhlYWRlckZhY2V0U3ViU2VjdGlvbnMoY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IE9iamVjdFBhZ2VTdWJTZWN0aW9uW10ge1xuXHRjb25zdCBjdXN0b21IZWFkZXJGYWNldHM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbU9iamVjdFBhZ2VIZWFkZXJGYWNldD4gPSBnZXRIZWFkZXJGYWNldHNGcm9tTWFuaWZlc3QoXG5cdFx0Y29udmVydGVyQ29udGV4dC5nZXRNYW5pZmVzdFdyYXBwZXIoKS5nZXRIZWFkZXJGYWNldHMoKVxuXHQpO1xuXHRjb25zdCBhQ3VzdG9tSGVhZGVyRmFjZXRzOiBDdXN0b21PYmplY3RQYWdlSGVhZGVyRmFjZXRbXSA9IFtdO1xuXHRPYmplY3Qua2V5cyhjdXN0b21IZWFkZXJGYWNldHMpLm1hcChmdW5jdGlvbihrZXkpIHtcblx0XHRhQ3VzdG9tSGVhZGVyRmFjZXRzLnB1c2goY3VzdG9tSGVhZGVyRmFjZXRzW2tleV0pO1xuXHRcdHJldHVybiBhQ3VzdG9tSGVhZGVyRmFjZXRzO1xuXHR9KTtcblx0Y29uc3QgZmFjZXRzVG9DcmVhdGUgPSBhQ3VzdG9tSGVhZGVyRmFjZXRzLnJlZHVjZSgoZmFjZXRzVG9DcmVhdGU6IEN1c3RvbU9iamVjdFBhZ2VIZWFkZXJGYWNldFtdLCBjdXN0b21IZWFkZXJGYWNldCkgPT4ge1xuXHRcdGlmIChjdXN0b21IZWFkZXJGYWNldC50ZW1wbGF0ZUVkaXQpIHtcblx0XHRcdGZhY2V0c1RvQ3JlYXRlLnB1c2goY3VzdG9tSGVhZGVyRmFjZXQpO1xuXHRcdH1cblx0XHRyZXR1cm4gZmFjZXRzVG9DcmVhdGU7XG5cdH0sIFtdKTtcblxuXHRyZXR1cm4gZmFjZXRzVG9DcmVhdGUubWFwKGN1c3RvbUhlYWRlckZhY2V0ID0+IGNyZWF0ZUN1c3RvbUhlYWRlckZhY2V0U3ViU2VjdGlvbihjdXN0b21IZWFkZXJGYWNldCkpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBzdWJzZWN0aW9uIGJhc2VkIG9uIGEgY3VzdG9tIGhlYWRlciBmYWNldC5cbiAqXG4gKiBAcGFyYW0gY3VzdG9tSGVhZGVyRmFjZXQgQSBjdXN0b20gaGVhZGVyIGZhY2V0XG4gKlxuICogQHJldHVybnMge09iamVjdFBhZ2VTdWJTZWN0aW9ufSBBIGRlZmluaXRpb24gZm9yIGEgc3Vic2VjdGlvblxuICovXG5mdW5jdGlvbiBjcmVhdGVDdXN0b21IZWFkZXJGYWNldFN1YlNlY3Rpb24oY3VzdG9tSGVhZGVyRmFjZXQ6IEN1c3RvbU9iamVjdFBhZ2VIZWFkZXJGYWNldCk6IE9iamVjdFBhZ2VTdWJTZWN0aW9uIHtcblx0Y29uc3Qgc3ViU2VjdGlvbklEID0gQ3VzdG9tU3ViU2VjdGlvbklEKGN1c3RvbUhlYWRlckZhY2V0LmtleSk7XG5cdGNvbnN0IHN1YlNlY3Rpb246IFhNTEZyYWdtZW50U3ViU2VjdGlvbiA9IHtcblx0XHRpZDogc3ViU2VjdGlvbklELFxuXHRcdGtleTogY3VzdG9tSGVhZGVyRmFjZXQua2V5LFxuXHRcdHRpdGxlOiBjdXN0b21IZWFkZXJGYWNldC50aXRsZSxcblx0XHR0eXBlOiBTdWJTZWN0aW9uVHlwZS5YTUxGcmFnbWVudCxcblx0XHR0ZW1wbGF0ZTogY3VzdG9tSGVhZGVyRmFjZXQudGVtcGxhdGVFZGl0IHx8IFwiXCIsXG5cdFx0dmlzaWJsZTogY3VzdG9tSGVhZGVyRmFjZXQudmlzaWJsZSxcblx0XHRsZXZlbDogMSxcblx0XHRzaWRlQ29udGVudDogdW5kZWZpbmVkLFxuXHRcdHN0YXNoZWQ6IGN1c3RvbUhlYWRlckZhY2V0LnN0YXNoZWQsXG5cdFx0ZmxleFNldHRpbmdzOiBjdXN0b21IZWFkZXJGYWNldC5mbGV4U2V0dGluZ3MsXG5cdFx0YWN0aW9uczoge31cblx0fTtcblx0cmV0dXJuIHN1YlNlY3Rpb247XG59XG5cbi8vIGZ1bmN0aW9uIGlzVGFyZ2V0Rm9yQ29tcGxpYW50KGFubm90YXRpb25QYXRoOiBBbm5vdGF0aW9uUGF0aCkge1xuLy8gXHRyZXR1cm4gLy4qY29tXFwuc2FwXFwudm9jYWJ1bGFyaWVzXFwuVUlcXC52MVxcLihGaWVsZEdyb3VwfElkZW50aWZpY2F0aW9ufERhdGFQb2ludHxTdGF0dXNJbmZvKS4qLy50ZXN0KGFubm90YXRpb25QYXRoLnZhbHVlKTtcbi8vIH1cbmNvbnN0IGdldFN1YlNlY3Rpb25LZXkgPSAoZmFjZXREZWZpbml0aW9uOiBGYWNldFR5cGVzLCBmYWxsYmFjazogc3RyaW5nKTogc3RyaW5nID0+IHtcblx0cmV0dXJuIGZhY2V0RGVmaW5pdGlvbi5JRD8udG9TdHJpbmcoKSB8fCBmYWNldERlZmluaXRpb24uTGFiZWw/LnRvU3RyaW5nKCkgfHwgZmFsbGJhY2s7XG59O1xuLyoqXG4gKiBBZGRzIEZvcm0gbWVudSBhY3Rpb24gdG8gYWxsIGZvcm0gYWN0aW9ucywgcmVtb3ZlcyBkdXBsaWNhdGUgYWN0aW9ucyBhbmQgaGlkZGVuIGFjdGlvbnMuXG4gKiBAcGFyYW0gYWN0aW9ucyBUaGUgYWN0aW9ucyBpbnZvbHZlZFxuICogQHBhcmFtIGZhY2V0RGVmaW5pdGlvbiBUaGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZhY2V0XG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dCBUaGUgY29udmVydGVyIGNvbnRleHRcbiAqIEByZXR1cm5zIHtCYXNlQWN0aW9uW10gfCBDb252ZXJ0ZXJBY3Rpb25bXX1cbiAqL1xuZnVuY3Rpb24gYWRkRm9ybU1lbnVBY3Rpb25zKFxuXHRhY3Rpb25zOiBDb252ZXJ0ZXJBY3Rpb25bXSxcblx0ZmFjZXREZWZpbml0aW9uOiBGYWNldFR5cGVzLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBCYXNlQWN0aW9uW10gfCBDb252ZXJ0ZXJBY3Rpb25bXSB7XG5cdGNvbnN0IGhpZGRlbkFjdGlvbnM6IEJhc2VBY3Rpb25bXSA9IGdldEZvcm1IaWRkZW5BY3Rpb25zKGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dCkgfHwgW10sXG5cdFx0Zm9ybUFjdGlvbnM6IENvbmZpZ3VyYWJsZVJlY29yZDxNYW5pZmVzdEFjdGlvbj4gPSBnZXRGb3JtQWN0aW9ucyhmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdGZvcm1BbGxBY3Rpb25zID0gaW5zZXJ0Q3VzdG9tRWxlbWVudHMoXG5cdFx0XHRhY3Rpb25zLFxuXHRcdFx0Z2V0QWN0aW9uc0Zyb21NYW5pZmVzdChmb3JtQWN0aW9ucywgY29udmVydGVyQ29udGV4dCwgYWN0aW9ucywgdW5kZWZpbmVkLCB1bmRlZmluZWQsIGhpZGRlbkFjdGlvbnMpXG5cdFx0KTtcblx0cmV0dXJuIGZvcm1BbGxBY3Rpb25zID8gZ2V0VmlzaWJpbGl0eUVuYWJsZW1lbnRGb3JtTWVudUFjdGlvbnMocmVtb3ZlRHVwbGljYXRlQWN0aW9ucyhmb3JtQWxsQWN0aW9ucykpIDogYWN0aW9ucztcbn1cblxuLyoqXG4gKiBSZXRyaWV2ZXMgdGhlIGFjdGlvbiBmb3JtIGEgZmFjZXQuXG4gKiBAcGFyYW0gZmFjZXREZWZpbml0aW9uXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dFxuICogQHJldHVybnMge0NvbnZlcnRlckFjdGlvbltdIHwgQmFzZUFjdGlvbltdfSBUaGUgY3VycmVudCBmYWNldCBhY3Rpb25zXG4gKi9cbmZ1bmN0aW9uIGdldEZhY2V0QWN0aW9ucyhmYWNldERlZmluaXRpb246IEZhY2V0VHlwZXMsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBCYXNlQWN0aW9uW10gfCBDb252ZXJ0ZXJBY3Rpb25bXSB7XG5cdGxldCBhY3Rpb25zID0gbmV3IEFycmF5PENvbnZlcnRlckFjdGlvbj4oKTtcblx0c3dpdGNoIChmYWNldERlZmluaXRpb24uJFR5cGUpIHtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLkNvbGxlY3Rpb25GYWNldDpcblx0XHRcdGFjdGlvbnMgPSAoZmFjZXREZWZpbml0aW9uLkZhY2V0cy5maWx0ZXIoZmFjZXREZWZpbml0aW9uID0+IGlzUmVmZXJlbmNlRmFjZXQoZmFjZXREZWZpbml0aW9uKSkgYXMgUmVmZXJlbmNlRmFjZXRUeXBlc1tdKS5yZWR1Y2UoXG5cdFx0XHRcdChhY3Rpb25zOiBDb252ZXJ0ZXJBY3Rpb25bXSwgZmFjZXREZWZpbml0aW9uKSA9PiBjcmVhdGVGb3JtQWN0aW9uUmVkdWNlcihhY3Rpb25zLCBmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdFx0XHRbXVxuXHRcdFx0KTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVHlwZXMuUmVmZXJlbmNlRmFjZXQ6XG5cdFx0XHRhY3Rpb25zID0gY3JlYXRlRm9ybUFjdGlvblJlZHVjZXIoW10sIGZhY2V0RGVmaW5pdGlvbiBhcyBSZWZlcmVuY2VGYWNldFR5cGVzLCBjb252ZXJ0ZXJDb250ZXh0KTtcblx0XHRcdGJyZWFrO1xuXHR9XG5cdHJldHVybiBhZGRGb3JtTWVudUFjdGlvbnMoYWN0aW9ucywgZmFjZXREZWZpbml0aW9uLCBjb252ZXJ0ZXJDb250ZXh0KTtcbn1cbi8qKlxuICogUmV0cnVucyB0aGUgYnV0dG9uIHR5cGUgYmFzZWQgb24gQFVJLkVtcGhhc2l6ZWQgYW5ub3RhdGlvbi5cbiAqIEBwYXJhbSBFbXBoYXNpemVkIEVtcGhhc2l6ZWQgYW5ub3RhdGlvbiB2YWx1ZS5cbiAqIEByZXR1cm5zIHtCdXR0b25UeXBlIHwgc3RyaW5nfSBUaGUgYnV0dG9uIHR5cGUgb3IgcGF0aCBiYXNlZCBleHByZXNzaW9uLlxuICovXG5mdW5jdGlvbiBnZXRCdXR0b25UeXBlKEVtcGhhc2l6ZWQ6IEVtcGhhc2l6ZWQpOiBCdXR0b25UeXBlIHwgc3RyaW5nIHtcblx0Y29uc3QgUGF0aEZvckJ1dHRvblR5cGU6IHN0cmluZyA9IEVtcGhhc2l6ZWQ/LnBhdGg7XG5cdGlmIChQYXRoRm9yQnV0dG9uVHlwZSkge1xuXHRcdHJldHVybiBcIns9IFwiICsgXCIhJHtcIiArIFBhdGhGb3JCdXR0b25UeXBlICsgXCJ9ID8gJ1wiICsgQnV0dG9uVHlwZS5UcmFuc3BhcmVudCArIFwiJyA6ICR7XCIgKyBQYXRoRm9yQnV0dG9uVHlwZSArIFwifVwiICsgXCJ9XCI7XG5cdH0gZWxzZSBpZiAoRW1waGFzaXplZCkge1xuXHRcdHJldHVybiBCdXR0b25UeXBlLkdob3N0O1xuXHR9XG5cdHJldHVybiBCdXR0b25UeXBlLlRyYW5zcGFyZW50O1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHN1YnNlY3Rpb24gYmFzZWQgb24gYSBGYWNldFR5cGVzLlxuICogQHBhcmFtIGZhY2V0RGVmaW5pdGlvblxuICogQHBhcmFtIGZhY2V0c1RvQ3JlYXRlXG4gKiBAcGFyYW0gY29udmVydGVyQ29udGV4dFxuICogQHBhcmFtIGxldmVsXG4gKiBAcGFyYW0gaGFzU2luZ2xlQ29udGVudFxuICogQHBhcmFtIGlzSGVhZGVyU2VjdGlvblxuICogQHJldHVybnMge09iamVjdFBhZ2VTdWJTZWN0aW9ufSBBIHN1YiBzZWN0aW9uIGRlZmluaXRpb25cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVN1YlNlY3Rpb24oXG5cdGZhY2V0RGVmaW5pdGlvbjogRmFjZXRUeXBlcyxcblx0ZmFjZXRzVG9DcmVhdGU6IEZhY2V0VHlwZXNbXSxcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCxcblx0bGV2ZWw6IG51bWJlcixcblx0aGFzU2luZ2xlQ29udGVudDogYm9vbGVhbixcblx0aXNIZWFkZXJTZWN0aW9uPzogYm9vbGVhblxuKTogT2JqZWN0UGFnZVN1YlNlY3Rpb24ge1xuXHRjb25zdCBzdWJTZWN0aW9uSUQgPSBTdWJTZWN0aW9uSUQoeyBGYWNldDogZmFjZXREZWZpbml0aW9uIH0pO1xuXHRjb25zdCBzdWJTZWN0aW9uOiBCYXNlU3ViU2VjdGlvbiA9IHtcblx0XHRpZDogc3ViU2VjdGlvbklELFxuXHRcdGtleTogZ2V0U3ViU2VjdGlvbktleShmYWNldERlZmluaXRpb24sIHN1YlNlY3Rpb25JRCksXG5cdFx0dGl0bGU6IGNvbXBpbGVCaW5kaW5nKGFubm90YXRpb25FeHByZXNzaW9uKGZhY2V0RGVmaW5pdGlvbi5MYWJlbCkpLFxuXHRcdHR5cGU6IFN1YlNlY3Rpb25UeXBlLlVua25vd24sXG5cdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChmYWNldERlZmluaXRpb24uZnVsbHlRdWFsaWZpZWROYW1lKSxcblx0XHR2aXNpYmxlOiBjb21waWxlQmluZGluZyhub3QoZXF1YWwoYW5ub3RhdGlvbkV4cHJlc3Npb24oZmFjZXREZWZpbml0aW9uLmFubm90YXRpb25zPy5VST8uSGlkZGVuKSwgdHJ1ZSkpKSxcblx0XHRsZXZlbDogbGV2ZWwsXG5cdFx0c2lkZUNvbnRlbnQ6IHVuZGVmaW5lZFxuXHR9O1xuXHRpZiAoaXNIZWFkZXJTZWN0aW9uKSB7XG5cdFx0c3ViU2VjdGlvbi5zdGFzaGVkID0gZ2V0U3Rhc2hlZFNldHRpbmdzRm9ySGVhZGVyRmFjZXQoZmFjZXREZWZpbml0aW9uLCBmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpO1xuXHRcdHN1YlNlY3Rpb24uZmxleFNldHRpbmdzID0ge1xuXHRcdFx0ZGVzaWdudGltZTogZ2V0RGVzaWduVGltZU1ldGFkYXRhU2V0dGluZ3NGb3JIZWFkZXJGYWNldChmYWNldERlZmluaXRpb24sIGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dClcblx0XHR9O1xuXHR9XG5cdGxldCBjb250ZW50OiBBcnJheTxPYmplY3RQYWdlU3ViU2VjdGlvbj4gPSBbXTtcblx0Y29uc3QgdGFibGVDb250ZW50OiBBcnJheTxPYmplY3RQYWdlU3ViU2VjdGlvbj4gPSBbXTtcblx0Y29uc3QgaW5kZXg6IEFycmF5PG51bWJlcj4gPSBbXTtcblx0bGV0IHVuc3VwcG9ydGVkVGV4dCA9IFwiXCI7XG5cdGxldmVsKys7XG5cdHN3aXRjaCAoZmFjZXREZWZpbml0aW9uLiRUeXBlKSB7XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5Db2xsZWN0aW9uRmFjZXQ6XG5cdFx0XHRjb25zdCBmYWNldHMgPSBmYWNldERlZmluaXRpb24uRmFjZXRzO1xuXHRcdFx0aWYgKGhhc1RhYmxlKGZhY2V0cykpIHtcblx0XHRcdFx0Ly8gaWYgd2UgaGF2ZSB0YWJsZXMgaW4gYSBjb2xsZWN0aW9uIGZhY2V0IHRoZW4gd2UgY3JlYXRlIHNlcGFyYXRlIHN1YnNlY3Rpb24gZm9yIHRoZW1cblx0XHRcdFx0Zm9yIChsZXQgaSA9IDA7IGkgPCBmYWNldHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRpZiAodGFyZ2V0VGVybXMuaW5kZXhPZigoZmFjZXRzW2ldIGFzIGFueSkuVGFyZ2V0Py4kdGFyZ2V0Py50ZXJtKSA+IC0xKSB7XG5cdFx0XHRcdFx0XHQvL2NyZWF0aW5nIHNlcGFyYXRlIGFycmF5IGZvciB0YWJsZXNcblx0XHRcdFx0XHRcdHRhYmxlQ29udGVudC5wdXNoKGNyZWF0ZVN1YlNlY3Rpb24oZmFjZXRzW2ldLCBbXSwgY29udmVydGVyQ29udGV4dCwgbGV2ZWwsIGZhY2V0cy5sZW5ndGggPT09IDEsIGlzSGVhZGVyU2VjdGlvbikpO1xuXHRcdFx0XHRcdFx0aW5kZXgucHVzaChpKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Zm9yIChsZXQgaSA9IGluZGV4Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG5cdFx0XHRcdFx0Ly9yZW1vdmUgdGFibGUgZmFjZXRzIGZyb20gZmFjZXQgZGVmaW5pdGlvblxuXHRcdFx0XHRcdGZhY2V0cy5zcGxpY2UoaW5kZXhbaV0sIDEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChmYWNldHMubGVuZ3RoKSB7XG5cdFx0XHRcdFx0ZmFjZXREZWZpbml0aW9uLkZhY2V0cyA9IGZhY2V0cztcblx0XHRcdFx0XHQvL2NyZWF0ZSBhIGZvcm0gc3Vic2VjdGlvbiBmcm9tIHRoZSByZW1haW5pbmcgZmFjZXRzXG5cdFx0XHRcdFx0Y29udGVudC5wdXNoKGNyZWF0ZVN1YlNlY3Rpb24oZmFjZXREZWZpbml0aW9uLCBbXSwgY29udmVydGVyQ29udGV4dCwgbGV2ZWwsIGhhc1NpbmdsZUNvbnRlbnQsIGlzSGVhZGVyU2VjdGlvbikpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGNvbnRlbnQgPSBjb250ZW50LmNvbmNhdCh0YWJsZUNvbnRlbnQpO1xuXHRcdFx0XHRjb25zdCBtaXhlZFN1YlNlY3Rpb246IE1peGVkU3ViU2VjdGlvbiA9IHtcblx0XHRcdFx0XHQuLi5zdWJTZWN0aW9uLFxuXHRcdFx0XHRcdHR5cGU6IFN1YlNlY3Rpb25UeXBlLk1peGVkLFxuXHRcdFx0XHRcdGxldmVsOiBsZXZlbCxcblx0XHRcdFx0XHRjb250ZW50OiBjb250ZW50XG5cdFx0XHRcdH07XG5cdFx0XHRcdHJldHVybiBtaXhlZFN1YlNlY3Rpb247XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjb25zdCBmb3JtQ29sbGVjdGlvblN1YlNlY3Rpb246IEZvcm1TdWJTZWN0aW9uID0ge1xuXHRcdFx0XHRcdC4uLnN1YlNlY3Rpb24sXG5cdFx0XHRcdFx0dHlwZTogU3ViU2VjdGlvblR5cGUuRm9ybSxcblx0XHRcdFx0XHRmb3JtRGVmaW5pdGlvbjogY3JlYXRlRm9ybURlZmluaXRpb24oZmFjZXREZWZpbml0aW9uLCBjb252ZXJ0ZXJDb250ZXh0KSxcblx0XHRcdFx0XHRsZXZlbDogbGV2ZWwsXG5cdFx0XHRcdFx0YWN0aW9uczogZ2V0RmFjZXRBY3Rpb25zKGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dClcblx0XHRcdFx0fTtcblx0XHRcdFx0cmV0dXJuIGZvcm1Db2xsZWN0aW9uU3ViU2VjdGlvbjtcblx0XHRcdH1cblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLlJlZmVyZW5jZUZhY2V0OlxuXHRcdFx0aWYgKCFmYWNldERlZmluaXRpb24uVGFyZ2V0LiR0YXJnZXQpIHtcblx0XHRcdFx0dW5zdXBwb3J0ZWRUZXh0ID0gYFVuYWJsZSB0byBmaW5kIGFubm90YXRpb25QYXRoICR7ZmFjZXREZWZpbml0aW9uLlRhcmdldC52YWx1ZX1gO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c3dpdGNoIChmYWNldERlZmluaXRpb24uVGFyZ2V0LiR0YXJnZXQudGVybSkge1xuXHRcdFx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVGVybXMuTGluZUl0ZW06XG5cdFx0XHRcdFx0Y2FzZSBVSUFubm90YXRpb25UZXJtcy5DaGFydDpcblx0XHRcdFx0XHRjYXNlIFVJQW5ub3RhdGlvblRlcm1zLlByZXNlbnRhdGlvblZhcmlhbnQ6XG5cdFx0XHRcdFx0Y2FzZSBVSUFubm90YXRpb25UZXJtcy5TZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50OlxuXHRcdFx0XHRcdFx0Y29uc3QgcHJlc2VudGF0aW9uID0gZ2V0RGF0YVZpc3VhbGl6YXRpb25Db25maWd1cmF0aW9uKFxuXHRcdFx0XHRcdFx0XHRmYWNldERlZmluaXRpb24uVGFyZ2V0LnZhbHVlLFxuXHRcdFx0XHRcdFx0XHRnZXRDb25kZW5zZWRUYWJsZUxheW91dENvbXBsaWFuY2UoZmFjZXREZWZpbml0aW9uLCBmYWNldHNUb0NyZWF0ZSwgY29udmVydGVyQ29udGV4dCksXG5cdFx0XHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHQsXG5cdFx0XHRcdFx0XHRcdHVuZGVmaW5lZCxcblx0XHRcdFx0XHRcdFx0aXNIZWFkZXJTZWN0aW9uXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0bGV0IGNvbnRyb2xUaXRsZSA9IChwcmVzZW50YXRpb24udmlzdWFsaXphdGlvbnNbMF0gYXMgYW55KT8uYW5ub3RhdGlvbj8udGl0bGU7XG5cdFx0XHRcdFx0XHRjb250cm9sVGl0bGUgPyBjb250cm9sVGl0bGUgOiAoY29udHJvbFRpdGxlID0gKHByZXNlbnRhdGlvbi52aXN1YWxpemF0aW9uc1swXSBhcyBhbnkpPy50aXRsZSk7XG5cdFx0XHRcdFx0XHRjb25zdCBkYXRhVmlzdWFsaXphdGlvblN1YlNlY3Rpb246IERhdGFWaXN1YWxpemF0aW9uU3ViU2VjdGlvbiA9IHtcblx0XHRcdFx0XHRcdFx0Li4uc3ViU2VjdGlvbixcblx0XHRcdFx0XHRcdFx0dHlwZTogU3ViU2VjdGlvblR5cGUuRGF0YVZpc3VhbGl6YXRpb24sXG5cdFx0XHRcdFx0XHRcdGxldmVsOiBsZXZlbCxcblx0XHRcdFx0XHRcdFx0cHJlc2VudGF0aW9uOiBwcmVzZW50YXRpb24sXG5cdFx0XHRcdFx0XHRcdHNob3dUaXRsZTogaXNTdWJzZWN0aW9uVGl0bGVTaG93bihoYXNTaW5nbGVDb250ZW50LCBzdWJTZWN0aW9uLnRpdGxlLCBjb250cm9sVGl0bGUpXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGRhdGFWaXN1YWxpemF0aW9uU3ViU2VjdGlvbjtcblxuXHRcdFx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVGVybXMuRmllbGRHcm91cDpcblx0XHRcdFx0XHRjYXNlIFVJQW5ub3RhdGlvblRlcm1zLklkZW50aWZpY2F0aW9uOlxuXHRcdFx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVGVybXMuRGF0YVBvaW50OlxuXHRcdFx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVGVybXMuU3RhdHVzSW5mbzpcblx0XHRcdFx0XHRjYXNlIENvbW11bmljYXRpb25Bbm5vdGF0aW9uVGVybXMuQ29udGFjdDpcblx0XHRcdFx0XHRcdC8vIEFsbCB0aG9zZSBlbGVtZW50IGJlbG9uZyB0byBhIGZvcm0gZmFjZXRcblx0XHRcdFx0XHRcdGNvbnN0IGZvcm1FbGVtZW50U3ViU2VjdGlvbjogRm9ybVN1YlNlY3Rpb24gPSB7XG5cdFx0XHRcdFx0XHRcdC4uLnN1YlNlY3Rpb24sXG5cdFx0XHRcdFx0XHRcdHR5cGU6IFN1YlNlY3Rpb25UeXBlLkZvcm0sXG5cdFx0XHRcdFx0XHRcdGxldmVsOiBsZXZlbCxcblx0XHRcdFx0XHRcdFx0Zm9ybURlZmluaXRpb246IGNyZWF0ZUZvcm1EZWZpbml0aW9uKGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dCksXG5cdFx0XHRcdFx0XHRcdGFjdGlvbnM6IGdldEZhY2V0QWN0aW9ucyhmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpXG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdFx0cmV0dXJuIGZvcm1FbGVtZW50U3ViU2VjdGlvbjtcblxuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0XHR1bnN1cHBvcnRlZFRleHQgPSBgRm9yICR7ZmFjZXREZWZpbml0aW9uLlRhcmdldC4kdGFyZ2V0LnRlcm19IEZyYWdtZW50YDtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFVJQW5ub3RhdGlvblR5cGVzLlJlZmVyZW5jZVVSTEZhY2V0OlxuXHRcdFx0dW5zdXBwb3J0ZWRUZXh0ID0gXCJGb3IgUmVmZXJlbmNlIFVSTCBGYWNldFwiO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGJyZWFrO1xuXHR9XG5cdC8vIElmIHdlIHJlYWNoIGhlcmUgd2UgZW5kZWQgdXAgd2l0aCBhbiB1bnN1cHBvcnRlZCBTdWJTZWN0aW9uIHR5cGVcblx0Y29uc3QgdW5zdXBwb3J0ZWRTdWJTZWN0aW9uOiBVbnN1cHBvcnRlZFN1YlNlY3Rpb24gPSB7XG5cdFx0Li4uc3ViU2VjdGlvbixcblx0XHR0ZXh0OiB1bnN1cHBvcnRlZFRleHRcblx0fTtcblx0cmV0dXJuIHVuc3VwcG9ydGVkU3ViU2VjdGlvbjtcbn1cbmZ1bmN0aW9uIGlzU3Vic2VjdGlvblRpdGxlU2hvd24oaGFzU2luZ2xlQ29udGVudDogYm9vbGVhbiwgc3ViU2VjdGlvblRpdGxlOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+LCBjb250cm9sVGl0bGU6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRpZiAoaGFzU2luZ2xlQ29udGVudCAmJiBjb250cm9sVGl0bGUgPT09IHN1YlNlY3Rpb25UaXRsZSkge1xuXHRcdHJldHVybiBmYWxzZTtcblx0fVxuXHRyZXR1cm4gdHJ1ZTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZUZvcm1BY3Rpb25SZWR1Y2VyKFxuXHRhY3Rpb25zOiBDb252ZXJ0ZXJBY3Rpb25bXSxcblx0ZmFjZXREZWZpbml0aW9uOiBSZWZlcmVuY2VGYWNldFR5cGVzLFxuXHRjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0XG4pOiBDb252ZXJ0ZXJBY3Rpb25bXSB7XG5cdGNvbnN0IHJlZmVyZW5jZVRhcmdldDogQW5ub3RhdGlvblRlcm08YW55PiA9IGZhY2V0RGVmaW5pdGlvbi5UYXJnZXQuJHRhcmdldDtcblx0Y29uc3QgdGFyZ2V0VmFsdWUgPSBmYWNldERlZmluaXRpb24uVGFyZ2V0LnZhbHVlO1xuXHRsZXQgbWFuaWZlc3RBY3Rpb25zOiBSZWNvcmQ8c3RyaW5nLCBDdXN0b21BY3Rpb24+ID0ge307XG5cdGxldCBkYXRhRmllbGRDb2xsZWN0aW9uOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzW10gPSBbXTtcblx0bGV0IFtuYXZpZ2F0aW9uUHJvcGVydHlQYXRoXTogYW55ID0gdGFyZ2V0VmFsdWUuc3BsaXQoXCJAXCIpO1xuXHRpZiAobmF2aWdhdGlvblByb3BlcnR5UGF0aC5sZW5ndGggPiAwKSB7XG5cdFx0aWYgKG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgubGFzdEluZGV4T2YoXCIvXCIpID09PSBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLmxlbmd0aCAtIDEpIHtcblx0XHRcdG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggPSBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLnN1YnN0cigwLCBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoLmxlbmd0aCAtIDEpO1xuXHRcdH1cblx0fSBlbHNlIHtcblx0XHRuYXZpZ2F0aW9uUHJvcGVydHlQYXRoID0gdW5kZWZpbmVkO1xuXHR9XG5cblx0aWYgKHJlZmVyZW5jZVRhcmdldCkge1xuXHRcdHN3aXRjaCAocmVmZXJlbmNlVGFyZ2V0LnRlcm0pIHtcblx0XHRcdGNhc2UgVUlBbm5vdGF0aW9uVGVybXMuRmllbGRHcm91cDpcblx0XHRcdFx0ZGF0YUZpZWxkQ29sbGVjdGlvbiA9IChyZWZlcmVuY2VUYXJnZXQgYXMgRmllbGRHcm91cCkuRGF0YTtcblx0XHRcdFx0bWFuaWZlc3RBY3Rpb25zID0gZ2V0QWN0aW9uc0Zyb21NYW5pZmVzdChcblx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24ocmVmZXJlbmNlVGFyZ2V0KS5hY3Rpb25zLFxuXHRcdFx0XHRcdGNvbnZlcnRlckNvbnRleHRcblx0XHRcdFx0KTtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHRjYXNlIFVJQW5ub3RhdGlvblRlcm1zLklkZW50aWZpY2F0aW9uOlxuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UZXJtcy5TdGF0dXNJbmZvOlxuXHRcdFx0XHRpZiAocmVmZXJlbmNlVGFyZ2V0LnF1YWxpZmllcikge1xuXHRcdFx0XHRcdGRhdGFGaWVsZENvbGxlY3Rpb24gPSByZWZlcmVuY2VUYXJnZXQgYXMgSWRlbnRpZmljYXRpb24gfCBTdGF0dXNJbmZvO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0fVxuXG5cdGFjdGlvbnMgPSBkYXRhRmllbGRDb2xsZWN0aW9uLnJlZHVjZSgoYWN0aW9ucywgZGF0YUZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzKSA9PiB7XG5cdFx0Y29uc3QgVUlBbm5vdGF0aW9uOiBhbnkgPSBkYXRhRmllbGQ/LmFubm90YXRpb25zPy5VSTtcblx0XHRzd2l0Y2ggKGRhdGFGaWVsZC4kVHlwZSkge1xuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb246XG5cdFx0XHRcdGlmIChkYXRhRmllbGQuUmVxdWlyZXNDb250ZXh0Py52YWx1ZU9mKCkgPT09IHRydWUpIHtcblx0XHRcdFx0XHRjb252ZXJ0ZXJDb250ZXh0XG5cdFx0XHRcdFx0XHQuZ2V0RGlhZ25vc3RpY3MoKVxuXHRcdFx0XHRcdFx0LmFkZElzc3VlKElzc3VlQ2F0ZWdvcnkuQW5ub3RhdGlvbiwgSXNzdWVTZXZlcml0eS5Mb3csIElzc3VlVHlwZS5NQUxGT1JNRURfREFUQUZJRUxEX0ZPUl9JQk4uUkVRVUlSRVNDT05URVhUKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZGF0YUZpZWxkLklubGluZT8udmFsdWVPZigpID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0Y29udmVydGVyQ29udGV4dFxuXHRcdFx0XHRcdFx0LmdldERpYWdub3N0aWNzKClcblx0XHRcdFx0XHRcdC5hZGRJc3N1ZShJc3N1ZUNhdGVnb3J5LkFubm90YXRpb24sIElzc3VlU2V2ZXJpdHkuTG93LCBJc3N1ZVR5cGUuTUFMRk9STUVEX0RBVEFGSUVMRF9GT1JfSUJOLklOTElORSk7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgbU5hdmlnYXRpb25QYXJhbWV0ZXJzOiBhbnkgPSB7fTtcblx0XHRcdFx0aWYgKGRhdGFGaWVsZC5NYXBwaW5nKSB7XG5cdFx0XHRcdFx0bU5hdmlnYXRpb25QYXJhbWV0ZXJzLnNlbWFudGljT2JqZWN0TWFwcGluZyA9IGdldFNlbWFudGljT2JqZWN0TWFwcGluZyhkYXRhRmllbGQuTWFwcGluZyk7XG5cdFx0XHRcdH1cblx0XHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHR0eXBlOiBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbixcblx0XHRcdFx0XHRpZDogRm9ybUlEKHsgRmFjZXQ6IGZhY2V0RGVmaW5pdGlvbiB9LCBkYXRhRmllbGQpLFxuXHRcdFx0XHRcdGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChkYXRhRmllbGQpLFxuXHRcdFx0XHRcdHRleHQ6IGRhdGFGaWVsZC5MYWJlbD8udG9TdHJpbmcoKSxcblx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aDogXCJcIixcblx0XHRcdFx0XHRlbmFibGVkOlxuXHRcdFx0XHRcdFx0ZGF0YUZpZWxkLk5hdmlnYXRpb25BdmFpbGFibGUgIT09IHVuZGVmaW5lZFxuXHRcdFx0XHRcdFx0XHQ/IGNvbXBpbGVCaW5kaW5nKGVxdWFsKGFubm90YXRpb25FeHByZXNzaW9uKGRhdGFGaWVsZC5OYXZpZ2F0aW9uQXZhaWxhYmxlPy52YWx1ZU9mKCkpLCB0cnVlKSlcblx0XHRcdFx0XHRcdFx0OiB0cnVlLFxuXHRcdFx0XHRcdHZpc2libGU6IGNvbXBpbGVCaW5kaW5nKG5vdChlcXVhbChhbm5vdGF0aW9uRXhwcmVzc2lvbihkYXRhRmllbGQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4/LnZhbHVlT2YoKSksIHRydWUpKSksXG5cdFx0XHRcdFx0YnV0dG9uVHlwZTogZ2V0QnV0dG9uVHlwZShVSUFubm90YXRpb24/LkVtcGhhc2l6ZWQpLFxuXHRcdFx0XHRcdHByZXNzOiBjb21waWxlQmluZGluZyhcblx0XHRcdFx0XHRcdGZuKFwiLl9pbnRlbnRCYXNlZE5hdmlnYXRpb24ubmF2aWdhdGVcIiwgW1xuXHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uRXhwcmVzc2lvbihkYXRhRmllbGQuU2VtYW50aWNPYmplY3QpLFxuXHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uRXhwcmVzc2lvbihkYXRhRmllbGQuQWN0aW9uKSxcblx0XHRcdFx0XHRcdFx0bU5hdmlnYXRpb25QYXJhbWV0ZXJzXG5cdFx0XHRcdFx0XHRdKVxuXHRcdFx0XHRcdCksXG5cdFx0XHRcdFx0Y3VzdG9tRGF0YTogY29tcGlsZUJpbmRpbmcoe1xuXHRcdFx0XHRcdFx0c2VtYW50aWNPYmplY3Q6IGFubm90YXRpb25FeHByZXNzaW9uKGRhdGFGaWVsZC5TZW1hbnRpY09iamVjdCksXG5cdFx0XHRcdFx0XHRhY3Rpb246IGFubm90YXRpb25FeHByZXNzaW9uKGRhdGFGaWVsZC5BY3Rpb24pXG5cdFx0XHRcdFx0fSlcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5EYXRhRmllbGRGb3JBY3Rpb246XG5cdFx0XHRcdGNvbnN0IGZvcm1NYW5pZmVzdEFjdGlvbnNDb25maWd1cmF0aW9uOiBhbnkgPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24ocmVmZXJlbmNlVGFyZ2V0KS5hY3Rpb25zO1xuXHRcdFx0XHRjb25zdCBrZXk6IHN0cmluZyA9IEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQoZGF0YUZpZWxkKTtcblx0XHRcdFx0YWN0aW9ucy5wdXNoKHtcblx0XHRcdFx0XHR0eXBlOiBBY3Rpb25UeXBlLkRhdGFGaWVsZEZvckFjdGlvbixcblx0XHRcdFx0XHRpZDogRm9ybUlEKHsgRmFjZXQ6IGZhY2V0RGVmaW5pdGlvbiB9LCBkYXRhRmllbGQpLFxuXHRcdFx0XHRcdGtleToga2V5LFxuXHRcdFx0XHRcdHRleHQ6IGRhdGFGaWVsZC5MYWJlbD8udG9TdHJpbmcoKSxcblx0XHRcdFx0XHRhbm5vdGF0aW9uUGF0aDogXCJcIixcblx0XHRcdFx0XHRlbmFibGVkOiBnZXRFbmFibGVkQmluZGluZyhkYXRhRmllbGQuQWN0aW9uVGFyZ2V0KSxcblx0XHRcdFx0XHRiaW5kaW5nOiBuYXZpZ2F0aW9uUHJvcGVydHlQYXRoID8gXCJ7ICdwYXRoJyA6ICdcIiArIG5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggKyBcIid9XCIgOiB1bmRlZmluZWQsXG5cdFx0XHRcdFx0dmlzaWJsZTogY29tcGlsZUJpbmRpbmcobm90KGVxdWFsKGFubm90YXRpb25FeHByZXNzaW9uKGRhdGFGaWVsZC5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbj8udmFsdWVPZigpKSwgdHJ1ZSkpKSxcblx0XHRcdFx0XHRyZXF1aXJlc0RpYWxvZzogaXNEaWFsb2coZGF0YUZpZWxkLkFjdGlvblRhcmdldCksXG5cdFx0XHRcdFx0YnV0dG9uVHlwZTogZ2V0QnV0dG9uVHlwZShVSUFubm90YXRpb24/LkVtcGhhc2l6ZWQpLFxuXHRcdFx0XHRcdHByZXNzOiBjb21waWxlQmluZGluZyhcblx0XHRcdFx0XHRcdGZuKFxuXHRcdFx0XHRcdFx0XHRcImludm9rZUFjdGlvblwiLFxuXHRcdFx0XHRcdFx0XHRbXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YUZpZWxkLkFjdGlvbixcblx0XHRcdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdFx0XHRjb250ZXh0czogZm4oXCJnZXRCaW5kaW5nQ29udGV4dFwiLCBbXSwgYmluZGluZ0V4cHJlc3Npb24oXCJcIiwgXCIkc291cmNlXCIpKSxcblx0XHRcdFx0XHRcdFx0XHRcdGludm9jYXRpb25Hcm91cGluZzogKGRhdGFGaWVsZC5JbnZvY2F0aW9uR3JvdXBpbmcgPT09IFwiVUkuT3BlcmF0aW9uR3JvdXBpbmdUeXBlL0NoYW5nZVNldFwiXG5cdFx0XHRcdFx0XHRcdFx0XHRcdD8gXCJDaGFuZ2VTZXRcIlxuXHRcdFx0XHRcdFx0XHRcdFx0XHQ6IFwiSXNvbGF0ZWRcIikgYXMgT3BlcmF0aW9uR3JvdXBpbmdUeXBlLFxuXHRcdFx0XHRcdFx0XHRcdFx0bGFiZWw6IGFubm90YXRpb25FeHByZXNzaW9uKGRhdGFGaWVsZC5MYWJlbCksXG5cdFx0XHRcdFx0XHRcdFx0XHRtb2RlbDogZm4oXCJnZXRNb2RlbFwiLCBbXSwgYmluZGluZ0V4cHJlc3Npb24oXCIvXCIsIFwiJHNvdXJjZVwiKSksXG5cdFx0XHRcdFx0XHRcdFx0XHRpc05hdmlnYWJsZTogaXNBY3Rpb25OYXZpZ2FibGUoXG5cdFx0XHRcdFx0XHRcdFx0XHRcdGZvcm1NYW5pZmVzdEFjdGlvbnNDb25maWd1cmF0aW9uICYmIGZvcm1NYW5pZmVzdEFjdGlvbnNDb25maWd1cmF0aW9uW2tleV1cblx0XHRcdFx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdF0sXG5cdFx0XHRcdFx0XHRcdHJlZihcIi5lZGl0Rmxvd1wiKVxuXHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdClcblx0XHRcdFx0fSk7XG5cdFx0XHRcdGJyZWFrO1xuXHRcdH1cblx0XHRyZXR1cm4gYWN0aW9ucztcblx0fSwgYWN0aW9ucyk7XG5cdHJldHVybiBpbnNlcnRDdXN0b21FbGVtZW50cyhhY3Rpb25zLCBtYW5pZmVzdEFjdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEaWFsb2coYWN0aW9uRGVmaW5pdGlvbjogYW55IHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcblx0aWYgKGFjdGlvbkRlZmluaXRpb24pIHtcblx0XHRjb25zdCBiQ3JpdGljYWwgPSBhY3Rpb25EZWZpbml0aW9uLmFubm90YXRpb25zPy5Db21tb24/LklzQWN0aW9uQ3JpdGljYWw7XG5cdFx0aWYgKGFjdGlvbkRlZmluaXRpb24ucGFyYW1ldGVycy5sZW5ndGggPiAxIHx8IGJDcml0aWNhbCkge1xuXHRcdFx0cmV0dXJuIFwiRGlhbG9nXCI7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIk5vbmVcIjtcblx0XHR9XG5cdH0gZWxzZSB7XG5cdFx0cmV0dXJuIFwiTm9uZVwiO1xuXHR9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDdXN0b21TdWJTZWN0aW9ucyhcblx0bWFuaWZlc3RTdWJTZWN0aW9uczogUmVjb3JkPHN0cmluZywgTWFuaWZlc3RTdWJTZWN0aW9uPixcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dFxuKTogUmVjb3JkPHN0cmluZywgQ3VzdG9tT2JqZWN0UGFnZVN1YlNlY3Rpb24+IHtcblx0Y29uc3Qgc3ViU2VjdGlvbnM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbU9iamVjdFBhZ2VTdWJTZWN0aW9uPiA9IHt9O1xuXHRPYmplY3Qua2V5cyhtYW5pZmVzdFN1YlNlY3Rpb25zKS5mb3JFYWNoKFxuXHRcdHN1YlNlY3Rpb25LZXkgPT5cblx0XHRcdChzdWJTZWN0aW9uc1tzdWJTZWN0aW9uS2V5XSA9IGNyZWF0ZUN1c3RvbVN1YlNlY3Rpb24obWFuaWZlc3RTdWJTZWN0aW9uc1tzdWJTZWN0aW9uS2V5XSwgc3ViU2VjdGlvbktleSwgY29udmVydGVyQ29udGV4dCkpXG5cdCk7XG5cdHJldHVybiBzdWJTZWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUN1c3RvbVN1YlNlY3Rpb24oXG5cdG1hbmlmZXN0U3ViU2VjdGlvbjogTWFuaWZlc3RTdWJTZWN0aW9uLFxuXHRzdWJTZWN0aW9uS2V5OiBzdHJpbmcsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IEN1c3RvbU9iamVjdFBhZ2VTdWJTZWN0aW9uIHtcblx0Y29uc3Qgc2lkZUNvbnRlbnQ6IFNpZGVDb250ZW50RGVmIHwgdW5kZWZpbmVkID0gbWFuaWZlc3RTdWJTZWN0aW9uLnNpZGVDb250ZW50XG5cdFx0PyB7XG5cdFx0XHRcdHRlbXBsYXRlOiBtYW5pZmVzdFN1YlNlY3Rpb24uc2lkZUNvbnRlbnQudGVtcGxhdGUsXG5cdFx0XHRcdGlkOiBTaWRlQ29udGVudElEKHN1YlNlY3Rpb25LZXkpLFxuXHRcdFx0XHR2aXNpYmxlOiBmYWxzZVxuXHRcdCAgfVxuXHRcdDogdW5kZWZpbmVkO1xuXHRsZXQgcG9zaXRpb24gPSBtYW5pZmVzdFN1YlNlY3Rpb24ucG9zaXRpb247XG5cdGlmICghcG9zaXRpb24pIHtcblx0XHRwb3NpdGlvbiA9IHtcblx0XHRcdHBsYWNlbWVudDogUGxhY2VtZW50LkFmdGVyXG5cdFx0fTtcblx0fVxuXHRjb25zdCBzdWJTZWN0aW9uRGVmaW5pdGlvbiA9IHtcblx0XHR0eXBlOiBTdWJTZWN0aW9uVHlwZS5Vbmtub3duLFxuXHRcdGlkOiBtYW5pZmVzdFN1YlNlY3Rpb24uaWQgfHwgQ3VzdG9tU3ViU2VjdGlvbklEKHN1YlNlY3Rpb25LZXkpLFxuXHRcdGFjdGlvbnM6IGdldEFjdGlvbnNGcm9tTWFuaWZlc3QobWFuaWZlc3RTdWJTZWN0aW9uLmFjdGlvbnMsIGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdGtleTogc3ViU2VjdGlvbktleSxcblx0XHR0aXRsZTogbWFuaWZlc3RTdWJTZWN0aW9uLnRpdGxlLFxuXHRcdGxldmVsOiAxLFxuXHRcdHBvc2l0aW9uOiBwb3NpdGlvbixcblx0XHR2aXNpYmxlOiBtYW5pZmVzdFN1YlNlY3Rpb24udmlzaWJsZSxcblx0XHRzaWRlQ29udGVudDogc2lkZUNvbnRlbnRcblx0fTtcblx0aWYgKG1hbmlmZXN0U3ViU2VjdGlvbi50ZW1wbGF0ZSB8fCBtYW5pZmVzdFN1YlNlY3Rpb24ubmFtZSkge1xuXHRcdHN1YlNlY3Rpb25EZWZpbml0aW9uLnR5cGUgPSBTdWJTZWN0aW9uVHlwZS5YTUxGcmFnbWVudDtcblx0XHQoKHN1YlNlY3Rpb25EZWZpbml0aW9uIGFzIHVua25vd24pIGFzIFhNTEZyYWdtZW50U3ViU2VjdGlvbikudGVtcGxhdGUgPVxuXHRcdFx0bWFuaWZlc3RTdWJTZWN0aW9uLnRlbXBsYXRlIHx8IG1hbmlmZXN0U3ViU2VjdGlvbi5uYW1lIHx8IFwiXCI7XG5cdH0gZWxzZSB7XG5cdFx0c3ViU2VjdGlvbkRlZmluaXRpb24udHlwZSA9IFN1YlNlY3Rpb25UeXBlLlBsYWNlaG9sZGVyO1xuXHR9XG5cdHJldHVybiBzdWJTZWN0aW9uRGVmaW5pdGlvbiBhcyBDdXN0b21PYmplY3RQYWdlU3ViU2VjdGlvbjtcbn1cblxuLyoqXG4gKiBFdmFsdWF0ZSBpZiB0aGUgY29uZGVuc2VkIG1vZGUgY2FuIGJlIGFwcGxpM2VkIG9uIHRoZSB0YWJsZS5cbiAqXG4gKiBAcGFyYW0gY3VycmVudEZhY2V0XG4gKiBAcGFyYW0gZmFjZXRzVG9DcmVhdGVJblNlY3Rpb25cbiAqIEBwYXJhbSBjb252ZXJ0ZXJDb250ZXh0XG4gKlxuICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBmb3IgY29tcGxpYW50LCBmYWxzZSBvdGhlcndpc2VcbiAqL1xuZnVuY3Rpb24gZ2V0Q29uZGVuc2VkVGFibGVMYXlvdXRDb21wbGlhbmNlKFxuXHRjdXJyZW50RmFjZXQ6IEZhY2V0VHlwZXMsXG5cdGZhY2V0c1RvQ3JlYXRlSW5TZWN0aW9uOiBGYWNldFR5cGVzW10sXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IGJvb2xlYW4ge1xuXHRjb25zdCBtYW5pZmVzdFdyYXBwZXIgPSBjb252ZXJ0ZXJDb250ZXh0LmdldE1hbmlmZXN0V3JhcHBlcigpO1xuXHRpZiAobWFuaWZlc3RXcmFwcGVyLnVzZUljb25UYWJCYXIoKSkge1xuXHRcdC8vIElmIHRoZSBPUCB1c2UgdGhlIHRhYiBiYXNlZCB3ZSBjaGVjayBpZiB0aGUgZmFjZXRzIHRoYXQgd2lsbCBiZSBjcmVhdGVkIGZvciB0aGlzIHNlY3Rpb24gYXJlIGFsbCBub24gdmlzaWJsZVxuXHRcdHJldHVybiBoYXNOb090aGVyVmlzaWJsZVRhYmxlSW5UYXJnZXRzKGN1cnJlbnRGYWNldCwgZmFjZXRzVG9DcmVhdGVJblNlY3Rpb24pO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGVudGl0eVR5cGUgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGUoKTtcblx0XHRpZiAoZW50aXR5VHlwZS5hbm5vdGF0aW9ucz8uVUk/LkZhY2V0cz8ubGVuZ3RoICYmIGVudGl0eVR5cGUuYW5ub3RhdGlvbnM/LlVJPy5GYWNldHM/Lmxlbmd0aCA+IDEpIHtcblx0XHRcdHJldHVybiBoYXNOb090aGVyVmlzaWJsZVRhYmxlSW5UYXJnZXRzKGN1cnJlbnRGYWNldCwgZmFjZXRzVG9DcmVhdGVJblNlY3Rpb24pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gaGFzTm9PdGhlclZpc2libGVUYWJsZUluVGFyZ2V0cyhjdXJyZW50RmFjZXQ6IEZhY2V0VHlwZXMsIGZhY2V0c1RvQ3JlYXRlSW5TZWN0aW9uOiBGYWNldFR5cGVzW10pOiBib29sZWFuIHtcblx0cmV0dXJuIGZhY2V0c1RvQ3JlYXRlSW5TZWN0aW9uLmV2ZXJ5KGZ1bmN0aW9uKHN1YkZhY2V0KSB7XG5cdFx0aWYgKHN1YkZhY2V0ICE9PSBjdXJyZW50RmFjZXQpIHtcblx0XHRcdGlmIChzdWJGYWNldC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuUmVmZXJlbmNlRmFjZXQpIHtcblx0XHRcdFx0Y29uc3QgcmVmRmFjZXQgPSBzdWJGYWNldCBhcyBSZWZlcmVuY2VGYWNldFR5cGVzO1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0cmVmRmFjZXQuVGFyZ2V0Py4kdGFyZ2V0Py50ZXJtID09PSBVSUFubm90YXRpb25UZXJtcy5MaW5lSXRlbSB8fFxuXHRcdFx0XHRcdHJlZkZhY2V0LlRhcmdldD8uJHRhcmdldD8udGVybSA9PT0gVUlBbm5vdGF0aW9uVGVybXMuUHJlc2VudGF0aW9uVmFyaWFudCB8fFxuXHRcdFx0XHRcdHJlZkZhY2V0LlRhcmdldC4kdGFyZ2V0Py50ZXJtID09PSBVSUFubm90YXRpb25UZXJtcy5TZWxlY3Rpb25QcmVzZW50YXRpb25WYXJpYW50XG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHJldHVybiByZWZGYWNldC5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbiAhPT0gdW5kZWZpbmVkID8gcmVmRmFjZXQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4gOiBmYWxzZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHN1YkNvbGxlY3Rpb25GYWNldCA9IHN1YkZhY2V0IGFzIENvbGxlY3Rpb25GYWNldFR5cGVzO1xuXHRcdFx0XHRyZXR1cm4gc3ViQ29sbGVjdGlvbkZhY2V0LkZhY2V0cy5ldmVyeShmdW5jdGlvbihmYWNldCkge1xuXHRcdFx0XHRcdGNvbnN0IHN1YlJlZkZhY2V0ID0gZmFjZXQgYXMgUmVmZXJlbmNlRmFjZXRUeXBlcztcblx0XHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0XHRzdWJSZWZGYWNldC5UYXJnZXQ/LiR0YXJnZXQ/LnRlcm0gPT09IFVJQW5ub3RhdGlvblRlcm1zLkxpbmVJdGVtIHx8XG5cdFx0XHRcdFx0XHRzdWJSZWZGYWNldC5UYXJnZXQ/LiR0YXJnZXQ/LnRlcm0gPT09IFVJQW5ub3RhdGlvblRlcm1zLlByZXNlbnRhdGlvblZhcmlhbnQgfHxcblx0XHRcdFx0XHRcdHN1YlJlZkZhY2V0LlRhcmdldD8uJHRhcmdldD8udGVybSA9PT0gVUlBbm5vdGF0aW9uVGVybXMuU2VsZWN0aW9uUHJlc2VudGF0aW9uVmFyaWFudFxuXHRcdFx0XHRcdCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIHN1YlJlZkZhY2V0LmFubm90YXRpb25zPy5VST8uSGlkZGVuICE9PSB1bmRlZmluZWQgPyBzdWJSZWZGYWNldC5hbm5vdGF0aW9ucz8uVUk/LkhpZGRlbiA6IGZhbHNlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHJldHVybiB0cnVlO1xuXHR9KTtcbn1cbiJdfQ==