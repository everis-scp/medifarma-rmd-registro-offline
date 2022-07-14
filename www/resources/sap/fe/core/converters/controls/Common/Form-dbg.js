/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../helpers/ConfigurableObject", "../../helpers/ID", "../../helpers/Key", "sap/fe/core/converters/annotations/DataField", "sap/fe/core/templating/DataModelPathHelper", "../../../helpers/StableIdHelper"], function (ConfigurableObject, ID, Key, DataField, DataModelPathHelper, StableIdHelper) {
  "use strict";

  var _exports = {};
  var generate = StableIdHelper.generate;
  var getTargetObjectPath = DataModelPathHelper.getTargetObjectPath;
  var getTargetEntitySetPath = DataModelPathHelper.getTargetEntitySetPath;
  var getSemanticObjectPath = DataField.getSemanticObjectPath;
  var KeyHelper = Key.KeyHelper;
  var FormID = ID.FormID;
  var Placement = ConfigurableObject.Placement;
  var insertCustomElements = ConfigurableObject.insertCustomElements;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  var FormElementType;

  (function (FormElementType) {
    FormElementType["Default"] = "Default";
    FormElementType["Annotation"] = "Annotation";
  })(FormElementType || (FormElementType = {}));

  _exports.FormElementType = FormElementType;

  /**
   * Returns default format options for text fields on a form.
   *
   * @returns {FormatOptionsType} Collection of format options with default values
   */
  function getDefaultFormatOptionsForForm() {
    return {
      textLinesDisplay: 0,
      textLinesEdit: 4
    };
  }

  function getFormElementsFromAnnotations(facetDefinition, converterContext) {
    var formElements = [];
    var resolvedTarget = converterContext.getEntityTypeAnnotation(facetDefinition.Target.value);
    var formAnnotation = resolvedTarget.annotation;
    converterContext = resolvedTarget.converterContext;

    function getDataFieldsFromAnnotations(field) {
      var _field$annotations, _field$annotations$UI, _field$annotations$UI2;

      var semanticObjectAnnotationPath = getSemanticObjectPath(converterContext, field);

      if (field.$Type !== "com.sap.vocabularies.UI.v1.DataFieldForAction" && field.$Type !== "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation" && ((_field$annotations = field.annotations) === null || _field$annotations === void 0 ? void 0 : (_field$annotations$UI = _field$annotations.UI) === null || _field$annotations$UI === void 0 ? void 0 : (_field$annotations$UI2 = _field$annotations$UI.Hidden) === null || _field$annotations$UI2 === void 0 ? void 0 : _field$annotations$UI2.valueOf()) !== true) {
        formElements.push({
          key: KeyHelper.generateKeyFromDataField(field),
          type: FormElementType.Annotation,
          annotationPath: converterContext.getEntitySetBasedAnnotationPath(field.fullyQualifiedName) + "/",
          semanticObjectPath: semanticObjectAnnotationPath,
          formatOptions: getDefaultFormatOptionsForForm()
        });
      }
    }

    switch (formAnnotation === null || formAnnotation === void 0 ? void 0 : formAnnotation.term) {
      case "com.sap.vocabularies.UI.v1.FieldGroup":
        formAnnotation.Data.forEach(getDataFieldsFromAnnotations);
        break;

      case "com.sap.vocabularies.UI.v1.Identification":
        formAnnotation.forEach(getDataFieldsFromAnnotations);
        break;

      case "com.sap.vocabularies.UI.v1.DataPoint":
        formElements.push({
          // key: KeyHelper.generateKeyFromDataField(formAnnotation),
          key: "DataPoint::" + (formAnnotation.qualifier ? formAnnotation.qualifier : ""),
          type: FormElementType.Annotation,
          annotationPath: converterContext.getEntitySetBasedAnnotationPath(formAnnotation.fullyQualifiedName) + "/"
        });
        break;

      case "com.sap.vocabularies.Communication.v1.Contact":
        formElements.push({
          // key: KeyHelper.generateKeyFromDataField(formAnnotation),
          key: "Contact::" + (formAnnotation.qualifier ? formAnnotation.qualifier : ""),
          type: FormElementType.Annotation,
          annotationPath: converterContext.getEntitySetBasedAnnotationPath(formAnnotation.fullyQualifiedName) + "/"
        });
        break;

      default:
        break;
    }

    return formElements;
  }

  function getFormElementsFromManifest(facetDefinition, converterContext) {
    var manifestWrapper = converterContext.getManifestWrapper();
    var manifestFormContainer = manifestWrapper.getFormContainer(facetDefinition.Target.value);
    var formElements = {};

    if (manifestFormContainer === null || manifestFormContainer === void 0 ? void 0 : manifestFormContainer.fields) {
      Object.keys(manifestFormContainer === null || manifestFormContainer === void 0 ? void 0 : manifestFormContainer.fields).forEach(function (fieldId) {
        formElements[fieldId] = {
          key: fieldId,
          type: FormElementType.Default,
          template: manifestFormContainer.fields[fieldId].template,
          label: manifestFormContainer.fields[fieldId].label,
          position: manifestFormContainer.fields[fieldId].position || {
            placement: Placement.After
          },
          formatOptions: _objectSpread({}, getDefaultFormatOptionsForForm(), {}, manifestFormContainer.fields[fieldId].formatOptions)
        };
      });
    }

    return formElements;
  }

  _exports.getFormElementsFromManifest = getFormElementsFromManifest;

  function getFormContainer(facetDefinition, converterContext) {
    var _resolvedTarget$conve;

    //TODO form container id
    var resolvedTarget = converterContext.getEntityTypeAnnotation(facetDefinition.Target.value);
    var sEntitySetPath; // resolvedTarget doesn't have a entitySet in case Containments and Paramterized services.

    if (resolvedTarget.converterContext.getEntitySet() && resolvedTarget.converterContext.getEntitySet() !== converterContext.getEntitySet()) {
      sEntitySetPath = getTargetEntitySetPath(resolvedTarget.converterContext.getDataModelObjectPath());
    } else if (((_resolvedTarget$conve = resolvedTarget.converterContext.getDataModelObjectPath().targetObject) === null || _resolvedTarget$conve === void 0 ? void 0 : _resolvedTarget$conve.containsTarget) === true) {
      sEntitySetPath = getTargetObjectPath(resolvedTarget.converterContext.getDataModelObjectPath(), false);
    }

    return {
      id: generate([{
        Facet: facetDefinition
      }]),
      formElements: insertCustomElements(getFormElementsFromAnnotations(facetDefinition, converterContext), getFormElementsFromManifest(facetDefinition, converterContext), {
        formatOptions: "overwrite"
      }),
      annotationPath: "/" + facetDefinition.fullyQualifiedName,
      entitySet: sEntitySetPath
    };
  }

  _exports.getFormContainer = getFormContainer;

  function getFormContainersForCollection(facetDefinition, converterContext) {
    var _facetDefinition$Face;

    var formContainers = []; //TODO coll facet inside coll facet?

    (_facetDefinition$Face = facetDefinition.Facets) === null || _facetDefinition$Face === void 0 ? void 0 : _facetDefinition$Face.forEach(function (facet) {
      // Ignore level 3 collection facet
      if (facet.$Type === "com.sap.vocabularies.UI.v1.CollectionFacet") {
        return;
      }

      formContainers.push(getFormContainer(facet, converterContext));
    });
    return formContainers;
  }

  function isReferenceFacet(facetDefinition) {
    return facetDefinition.$Type === "com.sap.vocabularies.UI.v1.ReferenceFacet";
  }

  _exports.isReferenceFacet = isReferenceFacet;

  function createFormDefinition(facetDefinition, converterContext) {
    var _facetDefinition$anno, _facetDefinition$anno2, _facetDefinition$anno3;

    switch (facetDefinition.$Type) {
      case "com.sap.vocabularies.UI.v1.CollectionFacet":
        // Keep only valid children
        var formCollectionDefinition = {
          id: FormID({
            Facet: facetDefinition
          }),
          useFormContainerLabels: true,
          hasFacetsNotPartOfPreview: facetDefinition.Facets.some(function (childFacet) {
            var _childFacet$annotatio, _childFacet$annotatio2, _childFacet$annotatio3;

            return ((_childFacet$annotatio = childFacet.annotations) === null || _childFacet$annotatio === void 0 ? void 0 : (_childFacet$annotatio2 = _childFacet$annotatio.UI) === null || _childFacet$annotatio2 === void 0 ? void 0 : (_childFacet$annotatio3 = _childFacet$annotatio2.PartOfPreview) === null || _childFacet$annotatio3 === void 0 ? void 0 : _childFacet$annotatio3.valueOf()) === false;
          }),
          formContainers: getFormContainersForCollection(facetDefinition, converterContext)
        };
        return formCollectionDefinition;

      case "com.sap.vocabularies.UI.v1.ReferenceFacet":
        var formDefinition = {
          id: FormID({
            Facet: facetDefinition
          }),
          useFormContainerLabels: false,
          hasFacetsNotPartOfPreview: ((_facetDefinition$anno = facetDefinition.annotations) === null || _facetDefinition$anno === void 0 ? void 0 : (_facetDefinition$anno2 = _facetDefinition$anno.UI) === null || _facetDefinition$anno2 === void 0 ? void 0 : (_facetDefinition$anno3 = _facetDefinition$anno2.PartOfPreview) === null || _facetDefinition$anno3 === void 0 ? void 0 : _facetDefinition$anno3.valueOf()) === false,
          formContainers: [getFormContainer(facetDefinition, converterContext)]
        };
        return formDefinition;

      default:
        throw new Error("Cannot create form based on ReferenceURLFacet");
    }
  }

  _exports.createFormDefinition = createFormDefinition;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZvcm0udHMiXSwibmFtZXMiOlsiRm9ybUVsZW1lbnRUeXBlIiwiZ2V0RGVmYXVsdEZvcm1hdE9wdGlvbnNGb3JGb3JtIiwidGV4dExpbmVzRGlzcGxheSIsInRleHRMaW5lc0VkaXQiLCJnZXRGb3JtRWxlbWVudHNGcm9tQW5ub3RhdGlvbnMiLCJmYWNldERlZmluaXRpb24iLCJjb252ZXJ0ZXJDb250ZXh0IiwiZm9ybUVsZW1lbnRzIiwicmVzb2x2ZWRUYXJnZXQiLCJnZXRFbnRpdHlUeXBlQW5ub3RhdGlvbiIsIlRhcmdldCIsInZhbHVlIiwiZm9ybUFubm90YXRpb24iLCJhbm5vdGF0aW9uIiwiZ2V0RGF0YUZpZWxkc0Zyb21Bbm5vdGF0aW9ucyIsImZpZWxkIiwic2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aCIsImdldFNlbWFudGljT2JqZWN0UGF0aCIsIiRUeXBlIiwiYW5ub3RhdGlvbnMiLCJVSSIsIkhpZGRlbiIsInZhbHVlT2YiLCJwdXNoIiwia2V5IiwiS2V5SGVscGVyIiwiZ2VuZXJhdGVLZXlGcm9tRGF0YUZpZWxkIiwidHlwZSIsIkFubm90YXRpb24iLCJhbm5vdGF0aW9uUGF0aCIsImdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgiLCJmdWxseVF1YWxpZmllZE5hbWUiLCJzZW1hbnRpY09iamVjdFBhdGgiLCJmb3JtYXRPcHRpb25zIiwidGVybSIsIkRhdGEiLCJmb3JFYWNoIiwicXVhbGlmaWVyIiwiZ2V0Rm9ybUVsZW1lbnRzRnJvbU1hbmlmZXN0IiwibWFuaWZlc3RXcmFwcGVyIiwiZ2V0TWFuaWZlc3RXcmFwcGVyIiwibWFuaWZlc3RGb3JtQ29udGFpbmVyIiwiZ2V0Rm9ybUNvbnRhaW5lciIsImZpZWxkcyIsIk9iamVjdCIsImtleXMiLCJmaWVsZElkIiwiRGVmYXVsdCIsInRlbXBsYXRlIiwibGFiZWwiLCJwb3NpdGlvbiIsInBsYWNlbWVudCIsIlBsYWNlbWVudCIsIkFmdGVyIiwic0VudGl0eVNldFBhdGgiLCJnZXRFbnRpdHlTZXQiLCJnZXRUYXJnZXRFbnRpdHlTZXRQYXRoIiwiZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCIsInRhcmdldE9iamVjdCIsImNvbnRhaW5zVGFyZ2V0IiwiZ2V0VGFyZ2V0T2JqZWN0UGF0aCIsImlkIiwiZ2VuZXJhdGUiLCJGYWNldCIsImluc2VydEN1c3RvbUVsZW1lbnRzIiwiZW50aXR5U2V0IiwiZ2V0Rm9ybUNvbnRhaW5lcnNGb3JDb2xsZWN0aW9uIiwiZm9ybUNvbnRhaW5lcnMiLCJGYWNldHMiLCJmYWNldCIsImlzUmVmZXJlbmNlRmFjZXQiLCJjcmVhdGVGb3JtRGVmaW5pdGlvbiIsImZvcm1Db2xsZWN0aW9uRGVmaW5pdGlvbiIsIkZvcm1JRCIsInVzZUZvcm1Db250YWluZXJMYWJlbHMiLCJoYXNGYWNldHNOb3RQYXJ0T2ZQcmV2aWV3Iiwic29tZSIsImNoaWxkRmFjZXQiLCJQYXJ0T2ZQcmV2aWV3IiwiZm9ybURlZmluaXRpb24iLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7TUE0QllBLGU7O2FBQUFBLGU7QUFBQUEsSUFBQUEsZTtBQUFBQSxJQUFBQSxlO0tBQUFBLGUsS0FBQUEsZTs7OztBQW1DWjs7Ozs7QUFLQSxXQUFTQyw4QkFBVCxHQUE2RDtBQUM1RCxXQUFPO0FBQ05DLE1BQUFBLGdCQUFnQixFQUFFLENBRFo7QUFFTkMsTUFBQUEsYUFBYSxFQUFFO0FBRlQsS0FBUDtBQUlBOztBQUVELFdBQVNDLDhCQUFULENBQXdDQyxlQUF4QyxFQUE4RUMsZ0JBQTlFLEVBQTJJO0FBQzFJLFFBQU1DLFlBQXFDLEdBQUcsRUFBOUM7QUFDQSxRQUFNQyxjQUFjLEdBQUdGLGdCQUFnQixDQUFDRyx1QkFBakIsQ0FBeUNKLGVBQWUsQ0FBQ0ssTUFBaEIsQ0FBdUJDLEtBQWhFLENBQXZCO0FBQ0EsUUFBTUMsY0FBMkUsR0FBR0osY0FBYyxDQUFDSyxVQUFuRztBQUdBUCxJQUFBQSxnQkFBZ0IsR0FBR0UsY0FBYyxDQUFDRixnQkFBbEM7O0FBRUEs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dXJjZXNDb250ZW50IjpbImltcG9ydCB7XG5cdEFubm90YXRpb25UZXJtLFxuXHRDb2xsZWN0aW9uRmFjZXRUeXBlcyxcblx0Q29tbXVuaWNhdGlvbkFubm90YXRpb25UZXJtcyxcblx0RGF0YUZpZWxkQWJzdHJhY3RUeXBlcyxcblx0RmFjZXRUeXBlcyxcblx0RmllbGRHcm91cCxcblx0SWRlbnRpZmljYXRpb24sXG5cdFJlZmVyZW5jZUZhY2V0VHlwZXMsXG5cdFVJQW5ub3RhdGlvblRlcm1zLFxuXHRVSUFubm90YXRpb25UeXBlc1xufSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXNcIjtcbmltcG9ydCB7IEJpbmRpbmdFeHByZXNzaW9uIH0gZnJvbSBcInNhcC9mZS9jb3JlL2hlbHBlcnMvQmluZGluZ0V4cHJlc3Npb25cIjtcbmltcG9ydCB7IENvbmZpZ3VyYWJsZU9iamVjdCwgQ3VzdG9tRWxlbWVudCwgaW5zZXJ0Q3VzdG9tRWxlbWVudHMsIFBsYWNlbWVudCB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL0NvbmZpZ3VyYWJsZU9iamVjdFwiO1xuaW1wb3J0IHsgRm9ybUlEIH0gZnJvbSBcIi4uLy4uL2hlbHBlcnMvSURcIjtcbmltcG9ydCB7IEtleUhlbHBlciB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL0tleVwiO1xuaW1wb3J0IHsgRm9ybU1hbmlmZXN0Q29uZmlndXJhdGlvbiwgRm9ybWF0T3B0aW9uc1R5cGUgfSBmcm9tIFwiLi4vLi4vTWFuaWZlc3RTZXR0aW5nc1wiO1xuaW1wb3J0IHsgZ2V0U2VtYW50aWNPYmplY3RQYXRoIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvYW5ub3RhdGlvbnMvRGF0YUZpZWxkXCI7XG5pbXBvcnQgeyBnZXRUYXJnZXRFbnRpdHlTZXRQYXRoLCBnZXRUYXJnZXRPYmplY3RQYXRoIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvRGF0YU1vZGVsUGF0aEhlbHBlclwiO1xuaW1wb3J0IHsgZ2VuZXJhdGUgfSBmcm9tIFwiLi4vLi4vLi4vaGVscGVycy9TdGFibGVJZEhlbHBlclwiO1xuaW1wb3J0IENvbnZlcnRlckNvbnRleHQgZnJvbSBcIi4uLy4uL0NvbnZlcnRlckNvbnRleHRcIjtcblxuZXhwb3J0IHR5cGUgRm9ybURlZmluaXRpb24gPSB7XG5cdGlkOiBzdHJpbmc7XG5cdHVzZUZvcm1Db250YWluZXJMYWJlbHM6IGJvb2xlYW47XG5cdGhhc0ZhY2V0c05vdFBhcnRPZlByZXZpZXc6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgZW51bSBGb3JtRWxlbWVudFR5cGUge1xuXHREZWZhdWx0ID0gXCJEZWZhdWx0XCIsXG5cdEFubm90YXRpb24gPSBcIkFubm90YXRpb25cIlxufVxuXG5leHBvcnQgdHlwZSBCYXNlRm9ybUVsZW1lbnQgPSBDb25maWd1cmFibGVPYmplY3QgJiB7XG5cdHR5cGU6IEZvcm1FbGVtZW50VHlwZTtcblx0bGFiZWw/OiBzdHJpbmc7XG5cdHZpc2libGU/OiBCaW5kaW5nRXhwcmVzc2lvbjxib29sZWFuPjtcblx0Zm9ybWF0T3B0aW9ucz86IEZvcm1hdE9wdGlvbnNUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgQW5ub3RhdGlvbkZvcm1FbGVtZW50ID0gQmFzZUZvcm1FbGVtZW50ICYge1xuXHRpZFByZWZpeD86IHN0cmluZztcblx0YW5ub3RhdGlvblBhdGg/OiBzdHJpbmc7XG5cdGlzVmFsdWVNdWx0aWxpbmVUZXh0PzogYm9vbGVhbjtcblx0c2VtYW50aWNPYmplY3RQYXRoPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgQ3VzdG9tRm9ybUVsZW1lbnQgPSBDdXN0b21FbGVtZW50PFxuXHRCYXNlRm9ybUVsZW1lbnQgJiB7XG5cdFx0dHlwZTogRm9ybUVsZW1lbnRUeXBlLkRlZmF1bHQ7XG5cdFx0dGVtcGxhdGU6IHN0cmluZztcblx0fVxuPjtcblxuZXhwb3J0IHR5cGUgRm9ybUVsZW1lbnQgPSBDdXN0b21Gb3JtRWxlbWVudCB8IEFubm90YXRpb25Gb3JtRWxlbWVudDtcblxudHlwZSBGb3JtQ29udGFpbmVyID0ge1xuXHRpZD86IHN0cmluZztcblx0Zm9ybUVsZW1lbnRzOiBGb3JtRWxlbWVudFtdO1xuXHRhbm5vdGF0aW9uUGF0aDogc3RyaW5nO1xuXHRlbnRpdHlTZXQ/OiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIFJldHVybnMgZGVmYXVsdCBmb3JtYXQgb3B0aW9ucyBmb3IgdGV4dCBmaWVsZHMgb24gYSBmb3JtLlxuICpcbiAqIEByZXR1cm5zIHtGb3JtYXRPcHRpb25zVHlwZX0gQ29sbGVjdGlvbiBvZiBmb3JtYXQgb3B0aW9ucyB3aXRoIGRlZmF1bHQgdmFsdWVzXG4gKi9cbmZ1bmN0aW9uIGdldERlZmF1bHRGb3JtYXRPcHRpb25zRm9yRm9ybSgpOiBGb3JtYXRPcHRpb25zVHlwZSB7XG5cdHJldHVybiB7XG5cdFx0dGV4dExpbmVzRGlzcGxheTogMCxcblx0XHR0ZXh0TGluZXNFZGl0OiA0XG5cdH07XG59XG5cbmZ1bmN0aW9uIGdldEZvcm1FbGVtZW50c0Zyb21Bbm5vdGF0aW9ucyhmYWNldERlZmluaXRpb246IFJlZmVyZW5jZUZhY2V0VHlwZXMsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBBbm5vdGF0aW9uRm9ybUVsZW1lbnRbXSB7XG5cdGNvbnN0IGZvcm1FbGVtZW50czogQW5ub3RhdGlvbkZvcm1FbGVtZW50W10gPSBbXTtcblx0Y29uc3QgcmVzb2x2ZWRUYXJnZXQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGVBbm5vdGF0aW9uKGZhY2V0RGVmaW5pdGlvbi5UYXJnZXQudmFsdWUpO1xuXHRjb25zdCBmb3JtQW5ub3RhdGlvbjogQW5ub3RhdGlvblRlcm08SWRlbnRpZmljYXRpb24+IHwgQW5ub3RhdGlvblRlcm08RmllbGRHcm91cD4gPSByZXNvbHZlZFRhcmdldC5hbm5vdGF0aW9uIGFzXG5cdFx0fCBBbm5vdGF0aW9uVGVybTxJZGVudGlmaWNhdGlvbj5cblx0XHR8IEFubm90YXRpb25UZXJtPEZpZWxkR3JvdXA+O1xuXHRjb252ZXJ0ZXJDb250ZXh0ID0gcmVzb2x2ZWRUYXJnZXQuY29udmVydGVyQ29udGV4dDtcblxuXHRmdW5jdGlvbiBnZXREYXRhRmllbGRzRnJvbUFubm90YXRpb25zKGZpZWxkOiBEYXRhRmllbGRBYnN0cmFjdFR5cGVzKSB7XG5cdFx0Y29uc3Qgc2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aCA9IGdldFNlbWFudGljT2JqZWN0UGF0aChjb252ZXJ0ZXJDb250ZXh0LCBmaWVsZCk7XG5cdFx0aWYgKFxuXHRcdFx0ZmllbGQuJFR5cGUgIT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckFjdGlvbiAmJlxuXHRcdFx0ZmllbGQuJFR5cGUgIT09IFVJQW5ub3RhdGlvblR5cGVzLkRhdGFGaWVsZEZvckludGVudEJhc2VkTmF2aWdhdGlvbiAmJlxuXHRcdFx0ZmllbGQuYW5ub3RhdGlvbnM/LlVJPy5IaWRkZW4/LnZhbHVlT2YoKSAhPT0gdHJ1ZVxuXHRcdCkge1xuXHRcdFx0Zm9ybUVsZW1lbnRzLnB1c2goe1xuXHRcdFx0XHRrZXk6IEtleUhlbHBlci5nZW5lcmF0ZUtleUZyb21EYXRhRmllbGQoZmllbGQpLFxuXHRcdFx0XHR0eXBlOiBGb3JtRWxlbWVudFR5cGUuQW5ub3RhdGlvbixcblx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChmaWVsZC5mdWxseVF1YWxpZmllZE5hbWUpICsgXCIvXCIsXG5cdFx0XHRcdHNlbWFudGljT2JqZWN0UGF0aDogc2VtYW50aWNPYmplY3RBbm5vdGF0aW9uUGF0aCxcblx0XHRcdFx0Zm9ybWF0T3B0aW9uczogZ2V0RGVmYXVsdEZvcm1hdE9wdGlvbnNGb3JGb3JtKClcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHN3aXRjaCAoZm9ybUFubm90YXRpb24/LnRlcm0pIHtcblx0XHRjYXNlIFVJQW5ub3RhdGlvblRlcm1zLkZpZWxkR3JvdXA6XG5cdFx0XHQoZm9ybUFubm90YXRpb24gYXMgQW5ub3RhdGlvblRlcm08RmllbGRHcm91cD4pLkRhdGEuZm9yRWFjaChnZXREYXRhRmllbGRzRnJvbUFubm90YXRpb25zKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgVUlBbm5vdGF0aW9uVGVybXMuSWRlbnRpZmljYXRpb246XG5cdFx0XHQoZm9ybUFubm90YXRpb24gYXMgQW5ub3RhdGlvblRlcm08SWRlbnRpZmljYXRpb24+KS5mb3JFYWNoKGdldERhdGFGaWVsZHNGcm9tQW5ub3RhdGlvbnMpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UZXJtcy5EYXRhUG9pbnQ6XG5cdFx0XHRmb3JtRWxlbWVudHMucHVzaCh7XG5cdFx0XHRcdC8vIGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChmb3JtQW5ub3RhdGlvbiksXG5cdFx0XHRcdGtleTogXCJEYXRhUG9pbnQ6OlwiICsgKGZvcm1Bbm5vdGF0aW9uLnF1YWxpZmllciA/IGZvcm1Bbm5vdGF0aW9uLnF1YWxpZmllciA6IFwiXCIpLFxuXHRcdFx0XHR0eXBlOiBGb3JtRWxlbWVudFR5cGUuQW5ub3RhdGlvbixcblx0XHRcdFx0YW5ub3RhdGlvblBhdGg6IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0QmFzZWRBbm5vdGF0aW9uUGF0aChmb3JtQW5ub3RhdGlvbi5mdWxseVF1YWxpZmllZE5hbWUpICsgXCIvXCJcblx0XHRcdH0pO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBDb21tdW5pY2F0aW9uQW5ub3RhdGlvblRlcm1zLkNvbnRhY3Q6XG5cdFx0XHRmb3JtRWxlbWVudHMucHVzaCh7XG5cdFx0XHRcdC8vIGtleTogS2V5SGVscGVyLmdlbmVyYXRlS2V5RnJvbURhdGFGaWVsZChmb3JtQW5ub3RhdGlvbiksXG5cdFx0XHRcdGtleTogXCJDb250YWN0OjpcIiArIChmb3JtQW5ub3RhdGlvbi5xdWFsaWZpZXIgPyBmb3JtQW5ub3RhdGlvbi5xdWFsaWZpZXIgOiBcIlwiKSxcblx0XHRcdFx0dHlwZTogRm9ybUVsZW1lbnRUeXBlLkFubm90YXRpb24sXG5cdFx0XHRcdGFubm90YXRpb25QYXRoOiBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoZm9ybUFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lKSArIFwiL1wiXG5cdFx0XHR9KTtcblx0XHRcdGJyZWFrO1xuXHRcdGRlZmF1bHQ6XG5cdFx0XHRicmVhaztcblx0fVxuXHRyZXR1cm4gZm9ybUVsZW1lbnRzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rm9ybUVsZW1lbnRzRnJvbU1hbmlmZXN0KFxuXHRmYWNldERlZmluaXRpb246IFJlZmVyZW5jZUZhY2V0VHlwZXMsXG5cdGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHRcbik6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUZvcm1FbGVtZW50PiB7XG5cdGNvbnN0IG1hbmlmZXN0V3JhcHBlciA9IGNvbnZlcnRlckNvbnRleHQuZ2V0TWFuaWZlc3RXcmFwcGVyKCk7XG5cdGNvbnN0IG1hbmlmZXN0Rm9ybUNvbnRhaW5lcjogRm9ybU1hbmlmZXN0Q29uZmlndXJhdGlvbiA9IG1hbmlmZXN0V3JhcHBlci5nZXRGb3JtQ29udGFpbmVyKGZhY2V0RGVmaW5pdGlvbi5UYXJnZXQudmFsdWUpO1xuXHRjb25zdCBmb3JtRWxlbWVudHM6IFJlY29yZDxzdHJpbmcsIEN1c3RvbUZvcm1FbGVtZW50PiA9IHt9O1xuXHRpZiAobWFuaWZlc3RGb3JtQ29udGFpbmVyPy5maWVsZHMpIHtcblx0XHRPYmplY3Qua2V5cyhtYW5pZmVzdEZvcm1Db250YWluZXI/LmZpZWxkcykuZm9yRWFjaChmaWVsZElkID0+IHtcblx0XHRcdGZvcm1FbGVtZW50c1tmaWVsZElkXSA9IHtcblx0XHRcdFx0a2V5OiBmaWVsZElkLFxuXHRcdFx0XHR0eXBlOiBGb3JtRWxlbWVudFR5cGUuRGVmYXVsdCxcblx0XHRcdFx0dGVtcGxhdGU6IG1hbmlmZXN0Rm9ybUNvbnRhaW5lci5maWVsZHNbZmllbGRJZF0udGVtcGxhdGUsXG5cdFx0XHRcdGxhYmVsOiBtYW5pZmVzdEZvcm1Db250YWluZXIuZmllbGRzW2ZpZWxkSWRdLmxhYmVsLFxuXHRcdFx0XHRwb3NpdGlvbjogbWFuaWZlc3RGb3JtQ29udGFpbmVyLmZpZWxkc1tmaWVsZElkXS5wb3NpdGlvbiB8fCB7XG5cdFx0XHRcdFx0cGxhY2VtZW50OiBQbGFjZW1lbnQuQWZ0ZXJcblx0XHRcdFx0fSxcblx0XHRcdFx0Zm9ybWF0T3B0aW9uczoge1xuXHRcdFx0XHRcdC4uLmdldERlZmF1bHRGb3JtYXRPcHRpb25zRm9yRm9ybSgpLFxuXHRcdFx0XHRcdC4uLm1hbmlmZXN0Rm9ybUNvbnRhaW5lci5maWVsZHNbZmllbGRJZF0uZm9ybWF0T3B0aW9uc1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBmb3JtRWxlbWVudHM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRGb3JtQ29udGFpbmVyKGZhY2V0RGVmaW5pdGlvbjogUmVmZXJlbmNlRmFjZXRUeXBlcywgY29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dCk6IEZvcm1Db250YWluZXIge1xuXHQvL1RPRE8gZm9ybSBjb250YWluZXIgaWRcblx0Y29uc3QgcmVzb2x2ZWRUYXJnZXQgPSBjb252ZXJ0ZXJDb250ZXh0LmdldEVudGl0eVR5cGVBbm5vdGF0aW9uKGZhY2V0RGVmaW5pdGlvbi5UYXJnZXQudmFsdWUpO1xuXHRsZXQgc0VudGl0eVNldFBhdGghOiBzdHJpbmc7XG5cdC8vIHJlc29sdmVkVGFyZ2V0IGRvZXNuJ3QgaGF2ZSBhIGVudGl0eVNldCBpbiBjYXNlIENvbnRhaW5tZW50cyBhbmQgUGFyYW10ZXJpemVkIHNlcnZpY2VzLlxuXHRpZiAoXG5cdFx0cmVzb2x2ZWRUYXJnZXQuY29udmVydGVyQ29udGV4dC5nZXRFbnRpdHlTZXQoKSAmJlxuXHRcdHJlc29sdmVkVGFyZ2V0LmNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KCkgIT09IGNvbnZlcnRlckNvbnRleHQuZ2V0RW50aXR5U2V0KClcblx0KSB7XG5cdFx0c0VudGl0eVNldFBhdGggPSBnZXRUYXJnZXRFbnRpdHlTZXRQYXRoKHJlc29sdmVkVGFyZ2V0LmNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpKTtcblx0fSBlbHNlIGlmIChyZXNvbHZlZFRhcmdldC5jb252ZXJ0ZXJDb250ZXh0LmdldERhdGFNb2RlbE9iamVjdFBhdGgoKS50YXJnZXRPYmplY3Q/LmNvbnRhaW5zVGFyZ2V0ID09PSB0cnVlKSB7XG5cdFx0c0VudGl0eVNldFBhdGggPSBnZXRUYXJnZXRPYmplY3RQYXRoKHJlc29sdmVkVGFyZ2V0LmNvbnZlcnRlckNvbnRleHQuZ2V0RGF0YU1vZGVsT2JqZWN0UGF0aCgpLCBmYWxzZSk7XG5cdH1cblx0cmV0dXJuIHtcblx0XHRpZDogZ2VuZXJhdGUoW3sgRmFjZXQ6IGZhY2V0RGVmaW5pdGlvbiB9XSksXG5cdFx0Zm9ybUVsZW1lbnRzOiBpbnNlcnRDdXN0b21FbGVtZW50cyhcblx0XHRcdGdldEZvcm1FbGVtZW50c0Zyb21Bbm5vdGF0aW9ucyhmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpLFxuXHRcdFx0Z2V0Rm9ybUVsZW1lbnRzRnJvbU1hbmlmZXN0KGZhY2V0RGVmaW5pdGlvbiwgY29udmVydGVyQ29udGV4dCksXG5cdFx0XHR7IGZvcm1hdE9wdGlvbnM6IFwib3ZlcndyaXRlXCIgfVxuXHRcdCksXG5cdFx0YW5ub3RhdGlvblBhdGg6IFwiL1wiICsgZmFjZXREZWZpbml0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSxcblx0XHRlbnRpdHlTZXQ6IHNFbnRpdHlTZXRQYXRoXG5cdH07XG59XG5cbmZ1bmN0aW9uIGdldEZvcm1Db250YWluZXJzRm9yQ29sbGVjdGlvbihmYWNldERlZmluaXRpb246IENvbGxlY3Rpb25GYWNldFR5cGVzLCBjb252ZXJ0ZXJDb250ZXh0OiBDb252ZXJ0ZXJDb250ZXh0KTogRm9ybUNvbnRhaW5lcltdIHtcblx0Y29uc3QgZm9ybUNvbnRhaW5lcnM6IEZvcm1Db250YWluZXJbXSA9IFtdO1xuXHQvL1RPRE8gY29sbCBmYWNldCBpbnNpZGUgY29sbCBmYWNldD9cblx0ZmFjZXREZWZpbml0aW9uLkZhY2V0cz8uZm9yRWFjaChmYWNldCA9PiB7XG5cdFx0Ly8gSWdub3JlIGxldmVsIDMgY29sbGVjdGlvbiBmYWNldFxuXHRcdGlmIChmYWNldC4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuQ29sbGVjdGlvbkZhY2V0KSB7XG5cdFx0XHRyZXR1cm47XG5cdFx0fVxuXHRcdGZvcm1Db250YWluZXJzLnB1c2goZ2V0Rm9ybUNvbnRhaW5lcihmYWNldCBhcyBSZWZlcmVuY2VGYWNldFR5cGVzLCBjb252ZXJ0ZXJDb250ZXh0KSk7XG5cdH0pO1xuXHRyZXR1cm4gZm9ybUNvbnRhaW5lcnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JlZmVyZW5jZUZhY2V0KGZhY2V0RGVmaW5pdGlvbjogRmFjZXRUeXBlcyk6IGZhY2V0RGVmaW5pdGlvbiBpcyBSZWZlcmVuY2VGYWNldFR5cGVzIHtcblx0cmV0dXJuIGZhY2V0RGVmaW5pdGlvbi4kVHlwZSA9PT0gVUlBbm5vdGF0aW9uVHlwZXMuUmVmZXJlbmNlRmFjZXQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtRGVmaW5pdGlvbihmYWNldERlZmluaXRpb246IEZhY2V0VHlwZXMsIGNvbnZlcnRlckNvbnRleHQ6IENvbnZlcnRlckNvbnRleHQpOiBGb3JtRGVmaW5pdGlvbiB7XG5cdHN3aXRjaCAoZmFjZXREZWZpbml0aW9uLiRUeXBlKSB7XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5Db2xsZWN0aW9uRmFjZXQ6XG5cdFx0XHQvLyBLZWVwIG9ubHkgdmFsaWQgY2hpbGRyZW5cblx0XHRcdGNvbnN0IGZvcm1Db2xsZWN0aW9uRGVmaW5pdGlvbiA9IHtcblx0XHRcdFx0aWQ6IEZvcm1JRCh7IEZhY2V0OiBmYWNldERlZmluaXRpb24gfSksXG5cdFx0XHRcdHVzZUZvcm1Db250YWluZXJMYWJlbHM6IHRydWUsXG5cdFx0XHRcdGhhc0ZhY2V0c05vdFBhcnRPZlByZXZpZXc6IGZhY2V0RGVmaW5pdGlvbi5GYWNldHMuc29tZShcblx0XHRcdFx0XHRjaGlsZEZhY2V0ID0+IGNoaWxkRmFjZXQuYW5ub3RhdGlvbnM/LlVJPy5QYXJ0T2ZQcmV2aWV3Py52YWx1ZU9mKCkgPT09IGZhbHNlXG5cdFx0XHRcdCksXG5cdFx0XHRcdGZvcm1Db250YWluZXJzOiBnZXRGb3JtQ29udGFpbmVyc0ZvckNvbGxlY3Rpb24oZmFjZXREZWZpbml0aW9uLCBjb252ZXJ0ZXJDb250ZXh0KVxuXHRcdFx0fTtcblx0XHRcdHJldHVybiBmb3JtQ29sbGVjdGlvbkRlZmluaXRpb247XG5cdFx0Y2FzZSBVSUFubm90YXRpb25UeXBlcy5SZWZlcmVuY2VGYWNldDpcblx0XHRcdGNvbnN0IGZvcm1EZWZpbml0aW9uID0ge1xuXHRcdFx0XHRpZDogRm9ybUlEKHsgRmFjZXQ6IGZhY2V0RGVmaW5pdGlvbiB9KSxcblx0XHRcdFx0dXNlRm9ybUNvbnRhaW5lckxhYmVsczogZmFsc2UsXG5cdFx0XHRcdGhhc0ZhY2V0c05vdFBhcnRPZlByZXZpZXc6IGZhY2V0RGVmaW5pdGlvbi5hbm5vdGF0aW9ucz8uVUk/LlBhcnRPZlByZXZpZXc/LnZhbHVlT2YoKSA9PT0gZmFsc2UsXG5cdFx0XHRcdGZvcm1Db250YWluZXJzOiBbZ2V0Rm9ybUNvbnRhaW5lcihmYWNldERlZmluaXRpb24sIGNvbnZlcnRlckNvbnRleHQpXVxuXHRcdFx0fTtcblx0XHRcdHJldHVybiBmb3JtRGVmaW5pdGlvbjtcblx0XHRkZWZhdWx0OlxuXHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGNyZWF0ZSBmb3JtIGJhc2VkIG9uIFJlZmVyZW5jZVVSTEZhY2V0XCIpO1xuXHR9XG59XG4iXX0=