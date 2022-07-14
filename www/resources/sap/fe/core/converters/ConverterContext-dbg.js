/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/MetaModelConverter", "sap/fe/core/templating/DataModelPathHelper", "sap/fe/core/converters/ManifestWrapper"], function (MetaModelConverter, DataModelPathHelper, ManifestWrapper) {
  "use strict";

  var getTargetObjectPath = DataModelPathHelper.getTargetObjectPath;
  var getContextRelativeTargetObjectPath = DataModelPathHelper.getContextRelativeTargetObjectPath;
  var enhanceDataModelPath = DataModelPathHelper.enhanceDataModelPath;
  var convertTypes = MetaModelConverter.convertTypes;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   * Checks whether an object is an annotation term.
   *
   * @param {string|AnnotationTerm<object>} vAnnotationPath
   * @returns {boolean}
   */
  var isAnnotationTerm = function (vAnnotationPath) {
    return typeof vAnnotationPath === "object";
  };

  function isServiceObject(objectPart) {
    return objectPart && objectPart.hasOwnProperty("_type");
  }

  var getDataModelPathForEntitySet = function (resolvedMetaPath) {
    var rootEntitySet;
    var currentEntitySet;
    var previousEntitySet;
    var currentEntityType;
    var navigatedPaths = [];
    var navigationProperties = [];
    resolvedMetaPath.objectPath.forEach(function (objectPart) {
      var _currentEntitySet;

      if (isServiceObject(objectPart)) {
        switch (objectPart._type) {
          case "NavigationProperty":
            navigatedPaths.push(objectPart.name);
            navigationProperties.push(objectPart);
            currentEntityType = objectPart.targetType;

            if (previousEntitySet && previousEntitySet.navigationPropertyBinding.hasOwnProperty(navigatedPaths.join("/"))) {
              currentEntitySet = previousEntitySet.navigationPropertyBinding[navigatedPaths.join("/")];
              previousEntitySet = currentEntitySet;
              navigatedPaths = [];
            } else {
              currentEntitySet = undefined;
            }

            break;

          case "EntitySet":
            if (rootEntitySet === undefined) {
              rootEntitySet = objectPart;
            }

            currentEntitySet = objectPart;
            previousEntitySet = currentEntitySet;
            currentEntityType = (_currentEntitySet = currentEntitySet) === null || _currentEntitySet === void 0 ? void 0 : _currentEntitySet.entityType;
            break;

          default:
            break;
        }
      }
    });
    var dataModelPath = {
      startingEntitySet: rootEntitySet,
      targetEntityType: currentEntityType,
      targetEntitySet: currentEntitySet,
      navigationProperties: navigationProperties,
      contextLocation: undefined,
      targetObject: resolvedMetaPath.target
    };
    dataModelPath.contextLocation = dataModelPath;
    return dataModelPath;
  };
  /**
   * Create a ConverterContext object that will be used within the converters.
   *
   * @param {ConverterOutput} oConvertedTypes The converted annotation and service types
   * @param {BaseManifestSettings} oManifestSettings The manifestSettings that applies to this page
   * @param {TemplateType} templateType The type of template we're looking at right now
   * @param {IShellServicesProxy} shellServices The current instance of the shellservice
   * @param {IDiagnostics} diagnostics The diagnostics shim
   * @param {Function} mergeFn The function to be used to perfom some deep merges between object
   * @param {DataModelObjectPath} targetDataModelPath The global path to reach the entitySet
   *
   * @returns {ConverterContext} A converter context for the converters
   */


  var ConverterContext = /*#__PURE__*/function () {
    function ConverterContext(convertedTypes, manifestSettings, diagnostics, mergeFn, targetDataModelPath) {
      _classCallCheck(this, ConverterContext);

      this.convertedTypes = convertedTypes;
      this.manifestSettings = manifestSettings;
      this.diagnostics = diagnostics;
      this.mergeFn = mergeFn;
      this.targetDataModelPath = targetDataModelPath;
      this.manifestWrapper = new ManifestWrapper(this.manifestSettings, mergeFn);
      this.baseContextPath = getTargetObjectPath(this.targetDataModelPath);
    }
    /**
     * Retrieve the property based on the path.
     *
     * @param fullyQualifiedName The fully qualified name
     * @returns {Property} The property EntityType based
     */


    _createClass(ConverterContext, [{
      key: "_getEntityTypeFromFullyQualifiedName",
      value: function _getEntityTypeFromFullyQualifiedName(fullyQualifiedName) {
        var targetEntityType = this.convertedTypes.entityTypes.find(function (entityType) {
          if (fullyQualifiedName.startsWith(entityType.fullyQualifiedName)) {
            var replaceAnnotation = fullyQualifiedName.replace(entityType.fullyQualifiedName, "");
            return replaceAnnotation.startsWith("/") || replaceAnnotation.startsWith("@");
          }

          return false;
        });
        return targetEntityType;
      }
      /**
       * Retrieve the entityType associated with an annotation object.
       *
       * @param annotation The annotation object for which we want to find the entityType
       * @returns {EntityType} The EntityType the annotation refers to
       */

    }, {
      key: "getAnnotationEntityType",
      value: function getAnnotationEntityType(annotation) {
        if (annotation) {
          var annotationPath = annotation.fullyQualifiedName;

          var targetEntityType = this._getEntityTypeFromFullyQualifiedName(annotationPath);

          if (!targetEntityType) {
            throw new Error("Cannot find Entity Type for " + annotation.fullyQualifiedName);
          }

          return targetEntityType;
        } else {
          return this.targetDataModelPath.targetEntityType;
        }
      }
      /**
       * Retrieve the manifest settings defined for a specific control within controlConfiguration.
       *
       * @param vAnnotationPath The annotation path or object to evaluate
       * @returns The control configuration for that specific anntoation path if it exists
       */

    }, {
      key: "getManifestControlConfiguration",
      value: function getManifestControlConfiguration(vAnnotationPath) {
        if (isAnnotationTerm(vAnnotationPath)) {
          return this.manifestWrapper.getControlConfiguration(vAnnotationPath.fullyQualifiedName.replace(this.targetDataModelPath.targetEntityType.fullyQualifiedName, ""));
        }

        return this.manifestWrapper.getControlConfiguration(vAnnotationPath);
      }
      /**
       * Create an absolute annotation path based on the current meta model context.
       *
       * @param sAnnotationPath The relative annotation path
       * @returns The correct annotation path based on the current context
       */

    }, {
      key: "getAbsoluteAnnotationPath",
      value: function getAbsoluteAnnotationPath(sAnnotationPath) {
        if (!sAnnotationPath) {
          return sAnnotationPath;
        }

        if (sAnnotationPath[0] === "/") {
          return sAnnotationPath;
        }

        return this.baseContextPath + "/" + sAnnotationPath;
      }
      /**
       * Retrieve the current entitySet.
       *
       * @returns The current EntitySet if it exists.
       */

    }, {
      key: "getEntitySet",
      value: function getEntitySet() {
        return this.targetDataModelPath.targetEntitySet;
      }
      /**
       * Retrieve the context path.
       *
       * @returns The context path of the converter.
       */

    }, {
      key: "getContextPath",
      value: function getContextPath() {
        return this.baseContextPath;
      }
      /**
       * Retrieve the current data model object path.
       *
       * @returns The current data model object path
       */

    }, {
      key: "getDataModelObjectPath",
      value: function getDataModelObjectPath() {
        return this.targetDataModelPath;
      }
      /**
       * Get the EntityContainer.
       *
       * @returns The current service EntityContainer
       */

    }, {
      key: "getEntityContainer",
      value: function getEntityContainer() {
        return this.convertedTypes.entityContainer;
      }
      /**
       * Get the EntityType based on the fully qualified name.
       *
       * @returns The current EntityType.
       */

    }, {
      key: "getEntityType",
      value: function getEntityType() {
        return this.targetDataModelPath.targetEntityType;
      }
      /**
       * Get a singleton based on fully qualified name.
       *
       * @param {string} fullyQualifiedName The fully qualified name of the singleton
       * @returns {Singleton | undefined} The singleton instance.
       */

    }, {
      key: "getSingleton",
      value: function getSingleton(fullyQualifiedName) {
        return this.convertedTypes.singletons.find(function (singleton) {
          return singleton.fullyQualifiedName === fullyQualifiedName;
        });
      }
      /**
       * Retrieve an annotation from an EntityType based on an annotation path.
       *
       * @param annotationPath The annotation path to evaluate
       * @returns The target annotation path as well as a converter context to go with it
       */

    }, {
      key: "getEntityTypeAnnotation",
      value: function getEntityTypeAnnotation(annotationPath) {
        var _startingEntityType$a;

        if (annotationPath.indexOf("@") === -1) {
          annotationPath = "@" + annotationPath;
        }

        var targetObject = this.targetDataModelPath.targetEntityType.resolvePath(annotationPath, true);
        var rootEntitySet = this.targetDataModelPath.targetEntitySet;
        var currentEntityType = this.targetDataModelPath.targetEntityType;
        var startingEntityType = this.targetDataModelPath.startingEntitySet.entityType;
        var navigationProperties = this.targetDataModelPath.navigationProperties.concat();
        var i = 1;
        var currentObject;
        var navigatedPaths = [];
        var visitedObjects = targetObject.visitedObjects; // In case of parameterized service

        if (!rootEntitySet && ((_startingEntityType$a = startingEntityType.annotations.Common) === null || _startingEntityType$a === void 0 ? void 0 : _startingEntityType$a.ResultContext)) {
          rootEntitySet = this.targetDataModelPath.startingEntitySet;
          this.targetDataModelPath.navigationProperties.forEach(function (navObject) {
            navigatedPaths.push(navObject.name);
          });
        }

        while (i < visitedObjects.length) {
          currentObject = visitedObjects[i++];

          if (currentObject._type === "NavigationProperty") {
            navigatedPaths.push(currentObject.name);
            navigationProperties.push(currentObject);
            currentEntityType = currentObject.targetType;

            if (rootEntitySet && rootEntitySet.navigationPropertyBinding.hasOwnProperty(navigatedPaths.join("/"))) {
              var navPath = navigatedPaths.join("/");
              rootEntitySet = rootEntitySet.navigationPropertyBinding[currentObject.name] || rootEntitySet.navigationPropertyBinding[navPath];
              navigatedPaths = [];
            } else {
              rootEntitySet = undefined;
            }
          }

          if (currentObject._type === "EntitySet") {
            rootEntitySet = currentObject;
            currentEntityType = rootEntitySet.entityType;
          }
        }

        var outDataModelPath = {
          startingEntitySet: this.targetDataModelPath.startingEntitySet,
          targetEntitySet: rootEntitySet,
          targetEntityType: currentEntityType,
          targetObject: navigationProperties[navigationProperties.length - 1],
          navigationProperties: navigationProperties,
          contextLocation: this.targetDataModelPath.contextLocation
        };
        return {
          annotation: targetObject.target,
          converterContext: new ConverterContext(this.convertedTypes, this.manifestSettings, this.diagnostics, this.mergeFn, outDataModelPath)
        };
      }
      /**
       * Retrieve the type of template we're working on (e.g. ListReport / ObjectPage / ...).
       *
       * @returns The current tenplate type
       */

    }, {
      key: "getTemplateType",
      value: function getTemplateType() {
        return this.manifestWrapper.getTemplateType();
      }
      /**
       * Retrieve a relative annotation path between an annotation path and an entity type.
       *
       * @param annotationPath
       * @param entityType
       * @returns The relative anntotation path.
       */

    }, {
      key: "getRelativeAnnotationPath",
      value: function getRelativeAnnotationPath(annotationPath, entityType) {
        return annotationPath.replace(entityType.fullyQualifiedName, "");
      }
      /**
       * Transform an entityType based path to an entitySet based one (ui5 templating generally expect an entitySetBasedPath).
       *
       * @param annotationPath
       * @returns The EntitySet based annotation path
       */

    }, {
      key: "getEntitySetBasedAnnotationPath",
      value: function getEntitySetBasedAnnotationPath(annotationPath) {
        if (!annotationPath) {
          return annotationPath;
        }

        var entityTypeFQN = this.targetDataModelPath.targetEntityType.fullyQualifiedName;

        if (this.targetDataModelPath.targetEntitySet || (this.baseContextPath.startsWith("/") && this.baseContextPath.match(/\//g) || []).length > 1) {
          var replacedAnnotationPath = annotationPath.replace(entityTypeFQN, "/");

          if (replacedAnnotationPath.length > 2 && replacedAnnotationPath[0] === "/" && replacedAnnotationPath[1] === "/") {
            replacedAnnotationPath = replacedAnnotationPath.substr(1);
          }

          return this.baseContextPath + replacedAnnotationPath;
        } else {
          return "/" + annotationPath;
        }
      }
      /**
       * Retrieve the manifest wrapper for the current context.
       *
       * @returns The current manifest wrapper
       */

    }, {
      key: "getManifestWrapper",
      value: function getManifestWrapper() {
        return this.manifestWrapper;
      }
    }, {
      key: "getDiagnostics",
      value: function getDiagnostics() {
        return this.diagnostics;
      }
      /**
       * Retrieve a new converter context, scoped for a different context path.
       *
       * @param {string} contextPath The path we want to orchestrate the converter context around
       * @returns {ConverterContext}
       */

    }, {
      key: "getConverterContextFor",
      value: function getConverterContextFor(contextPath) {
        var resolvedMetaPath = this.convertedTypes.resolvePath(contextPath);
        var targetPath = getDataModelPathForEntitySet(resolvedMetaPath);
        return new ConverterContext(this.convertedTypes, this.manifestSettings, this.diagnostics, this.mergeFn, targetPath);
      }
      /**
       * Get all annotations of a given term and vocabulary on an entity type
       * (or on the current entity type if entityType isn't specified).
       *
       * @param vocabularyName
       * @param annotationTerm
       * @param [annotationSources]
       * @returns All the annotation for a specific term and vocabulary from an entity type
       */

    }, {
      key: "getAnnotationsByTerm",
      value: function getAnnotationsByTerm(vocabularyName, annotationTerm) {
        var annotationSources = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [this.getEntityType()];
        var outAnnotations = [];
        annotationSources.forEach(function (annotationSource) {
          if (annotationSource) {
            var annotations = (annotationSource === null || annotationSource === void 0 ? void 0 : annotationSource.annotations[vocabularyName]) || {};

            if (annotations) {
              outAnnotations = Object.keys(annotations).filter(function (annotation) {
                return annotations[annotation].term === annotationTerm;
              }).reduce(function (previousValue, key) {
                previousValue.push(annotations[key]);
                return previousValue;
              }, outAnnotations);
            }
          }
        });
        return outAnnotations;
      }
      /**
       * Retrieves the relative model path based on the current context path.
       *
       * @returns {string|undefined} The relative model path or undefined if the path is not resolveable
       */

    }, {
      key: "getRelativeModelPathFunction",
      value: function getRelativeModelPathFunction() {
        var targetDataModelPath = this.targetDataModelPath;
        return function (sPath) {
          var enhancedPath = enhanceDataModelPath(targetDataModelPath, sPath);
          return getContextRelativeTargetObjectPath(enhancedPath, true);
        };
      }
      /**
       * Create the converter context necessary for a macro based on a metamodel context.
       * @param sEntitySetName
       * @param oMetaModelContext
       * @param diagnostics
       * @param mergeFn
       * @param targetDataModelPath
       * @param manifestSettings
       * @returns {ConverterContext} The current converter context
       */

    }], [{
      key: "createConverterContextForMacro",
      value: function createConverterContextForMacro(sEntitySetName, oMetaModelContext, diagnostics, mergeFn, targetDataModelPath) {
        var manifestSettings = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
        var oMetaModel = oMetaModelContext.isA("sap.ui.model.odata.v4.ODataMetaModel") ? oMetaModelContext : oMetaModelContext.getModel();
        var oConverterOutput = convertTypes(oMetaModel);
        var targetEntitySet = oConverterOutput.entitySets.find(function (entitySet) {
          return entitySet.name === sEntitySetName;
        });

        if (!targetDataModelPath) {
          targetDataModelPath = {
            startingEntitySet: targetEntitySet,
            navigationProperties: [],
            targetEntitySet: targetEntitySet,
            targetEntityType: targetEntitySet.entityType,
            targetObject: targetEntitySet
          };
        }

        return new ConverterContext(oConverterOutput, manifestSettings, diagnostics, mergeFn, targetDataModelPath);
      }
    }]);

    return ConverterContext;
  }();

  return ConverterContext;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbnZlcnRlckNvbnRleHQudHMiXSwibmFtZXMiOlsiaXNBbm5vdGF0aW9uVGVybSIsInZBbm5vdGF0aW9uUGF0aCIsImlzU2VydmljZU9iamVjdCIsIm9iamVjdFBhcnQiLCJoYXNPd25Qcm9wZXJ0eSIsImdldERhdGFNb2RlbFBhdGhGb3JFbnRpdHlTZXQiLCJyZXNvbHZlZE1ldGFQYXRoIiwicm9vdEVudGl0eVNldCIsImN1cnJlbnRFbnRpdHlTZXQiLCJwcmV2aW91c0VudGl0eVNldCIsImN1cnJlbnRFbnRpdHlUeXBlIiwibmF2aWdhdGVkUGF0aHMiLCJuYXZpZ2F0aW9uUHJvcGVydGllcyIsIm9iamVjdFBhdGgiLCJmb3JFYWNoIiwiX3R5cGUiLCJwdXNoIiwibmFtZSIsInRhcmdldFR5cGUiLCJuYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nIiwiam9pbiIsInVuZGVmaW5lZCIsImVudGl0eVR5cGUiLCJkYXRhTW9kZWxQYXRoIiwic3RhcnRpbmdFbnRpdHlTZXQiLCJ0YXJnZXRFbnRpdHlUeXBlIiwidGFyZ2V0RW50aXR5U2V0IiwiY29udGV4dExvY2F0aW9uIiwidGFyZ2V0T2JqZWN0IiwidGFyZ2V0IiwiQ29udmVydGVyQ29udGV4dCIsImNvbnZlcnRlZFR5cGVzIiwibWFuaWZlc3RTZXR0aW5ncyIsImRpYWdub3N0aWNzIiwibWVyZ2VGbiIsInRhcmdldERhdGFNb2RlbFBhdGgiLCJtYW5pZmVzdFdyYXBwZXIiLCJNYW5pZmVzdFdyYXBwZXIiLCJiYXNlQ29udGV4dFBhdGgiLCJnZXRUYXJnZXRPYmplY3RQYXRoIiwiZnVsbHlRdWFsaWZpZWROYW1lIiwiZW50aXR5VHlwZXMiLCJmaW5kIiwic3RhcnRzV2l0aCIsInJlcGxhY2VBbm5vdGF0aW9uIiwicmVwbGFjZSIsImFubm90YXRpb24iLCJhbm5vdGF0aW9uUGF0aCIsIl9nZXRFbnRpdHlUeXBlRnJvbUZ1bGx5UXVhbGlmaWVkTmFtZSIsIkVycm9yIiwiZ2V0Q29udHJvbENvbmZpZ3VyYXRpb24iLCJzQW5ub3RhdGlvblBhdGgiLCJlbnRpdHlDb250YWluZXIiLCJzaW5nbGV0b25zIiwic2luZ2xldG9uIiwiaW5kZXhPZiIsInJlc29sdmVQYXRoIiwic3RhcnRpbmdFbnRpdHlUeXBlIiwiY29uY2F0IiwiaSIsImN1cnJlbnRPYmplY3QiLCJ2aXNpdGVkT2JqZWN0cyIsImFubm90YXRpb25zIiwiQ29tbW9uIiwiUmVzdWx0Q29udGV4dCIsIm5hdk9iamVjdCIsImxlbmd0aCIsIm5hdlBhdGgiLCJvdXREYXRhTW9kZWxQYXRoIiwiY29udmVydGVyQ29udGV4dCIsImdldFRlbXBsYXRlVHlwZSIsImVudGl0eVR5cGVGUU4iLCJtYXRjaCIsInJlcGxhY2VkQW5ub3RhdGlvblBhdGgiLCJzdWJzdHIiLCJjb250ZXh0UGF0aCIsInRhcmdldFBhdGgiLCJ2b2NhYnVsYXJ5TmFtZSIsImFubm90YXRpb25UZXJtIiwiYW5ub3RhdGlvblNvdXJjZXMiLCJnZXRFbnRpdHlUeXBlIiwib3V0QW5ub3RhdGlvbnMiLCJhbm5vdGF0aW9uU291cmNlIiwiT2JqZWN0Iiwia2V5cyIsImZpbHRlciIsInRlcm0iLCJyZWR1Y2UiLCJwcmV2aW91c1ZhbHVlIiwia2V5Iiwic1BhdGgiLCJlbmhhbmNlZFBhdGgiLCJlbmhhbmNlRGF0YU1vZGVsUGF0aCIsImdldENvbnRleHRSZWxhdGl2ZVRhcmdldE9iamVjdFBhdGgiLCJzRW50aXR5U2V0TmFtZSIsIm9NZXRhTW9kZWxDb250ZXh0Iiwib01ldGFNb2RlbCIsImlzQSIsImdldE1vZGVsIiwib0NvbnZlcnRlck91dHB1dCIsImNvbnZlcnRUeXBlcyIsImVudGl0eVNldHMiLCJlbnRpdHlTZXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCQTs7Ozs7O0FBTUEsTUFBTUEsZ0JBQWdCLEdBQUcsVUFBU0MsZUFBVCxFQUFnRztBQUN4SCxXQUFPLE9BQU9BLGVBQVAsS0FBMkIsUUFBbEM7QUFDQSxHQUZEOztBQUlBLFdBQVNDLGVBQVQsQ0FBeUJDLFVBQXpC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QUksQ0FBQzNELG1CQUFMLEVBQTBCO0FBQ3pCQSxVQUFBQSxtQkFBbUIsR0FBRztBQUNyQlgsWUFBQUEsaUJBQWlCLEVBQUVFLGVBREU7QUFFckJkLFlBQUFBLG9CQUFvQixFQUFFLEVBRkQ7QUFHckJjLFlBQUFBLGVBQWUsRUFBRUEsZUFISTtBQUlyQkQsWUFBQUEsZ0JBQWdCLEVBQUVDLGVBQWUsQ0FBQ0osVUFKYjtBQUtyQk0sWUFBQUEsWUFBWSxFQUFFRjtBQUxPLFdBQXRCO0FBT0E7O0FBQ0QsZUFBTyxJQUFJSSxnQkFBSixDQUFxQnFFLGdCQUFyQixFQUF1Q25FLGdCQUF2QyxFQUF5REMsV0FBekQsRUFBc0VDLE9BQXRFLEVBQStFQyxtQkFBL0UsQ0FBUDtBQUNBOzs7Ozs7U0FHYUwsZ0IiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFubm90YXRpb25UZXJtIH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG5pbXBvcnQge1xuXHRBbnlBbm5vdGF0aW9uLFxuXHRDb252ZXJ0ZXJPdXRwdXQsXG5cdEVudGl0eVNldCxcblx0RW50aXR5VHlwZSxcblx0RW50aXR5Q29udGFpbmVyLFxuXHROYXZpZ2F0aW9uUHJvcGVydHksXG5cdFNlcnZpY2VPYmplY3QsXG5cdFNpbmdsZXRvbixcblx0UmVzb2x1dGlvblRhcmdldCxcblx0U2VydmljZU9iamVjdEFuZEFubm90YXRpb25cbn0gZnJvbSBcIkBzYXAtdXgvYW5ub3RhdGlvbi1jb252ZXJ0ZXJcIjtcbmltcG9ydCB7IEJhc2VNYW5pZmVzdFNldHRpbmdzLCBUZW1wbGF0ZVR5cGUgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9NYW5pZmVzdFNldHRpbmdzXCI7XG5pbXBvcnQgeyBDb250ZXh0LCBPRGF0YU1ldGFNb2RlbCB9IGZyb20gXCJzYXAvdWkvbW9kZWwvb2RhdGEvdjRcIjtcbmltcG9ydCB7IGNvbnZlcnRUeXBlcywgUmVzb2x2ZWRUYXJnZXQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9NZXRhTW9kZWxDb252ZXJ0ZXJcIjtcbmltcG9ydCB7IElEaWFnbm9zdGljcyB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL1RlbXBsYXRlQ29udmVydGVyXCI7XG5pbXBvcnQge1xuXHREYXRhTW9kZWxPYmplY3RQYXRoLFxuXHRlbmhhbmNlRGF0YU1vZGVsUGF0aCxcblx0Z2V0Q29udGV4dFJlbGF0aXZlVGFyZ2V0T2JqZWN0UGF0aCxcblx0Z2V0VGFyZ2V0T2JqZWN0UGF0aFxufSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EYXRhTW9kZWxQYXRoSGVscGVyXCI7XG5pbXBvcnQgeyBFbnRpdHlUeXBlQW5ub3RhdGlvbnMgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXMvdHlwZXMvZ2VuZXJhdGVkL0VkbV9UeXBlc1wiO1xuaW1wb3J0IE1hbmlmZXN0V3JhcHBlciBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9NYW5pZmVzdFdyYXBwZXJcIjtcblxuZXhwb3J0IHR5cGUgUmVzb2x2ZWRBbm5vdGF0aW9uQ29udGV4dCA9IHtcblx0YW5ub3RhdGlvbjogQW55QW5ub3RhdGlvbjtcblx0Y29udmVydGVyQ29udGV4dDogQ29udmVydGVyQ29udGV4dDtcbn07XG5cbi8qKlxuICogQ2hlY2tzIHdoZXRoZXIgYW4gb2JqZWN0IGlzIGFuIGFubm90YXRpb24gdGVybS5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3xBbm5vdGF0aW9uVGVybTxvYmplY3Q+fSB2QW5ub3RhdGlvblBhdGhcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5jb25zdCBpc0Fubm90YXRpb25UZXJtID0gZnVuY3Rpb24odkFubm90YXRpb25QYXRoOiBzdHJpbmcgfCBBbm5vdGF0aW9uVGVybTxhbnk+KTogdkFubm90YXRpb25QYXRoIGlzIEFubm90YXRpb25UZXJtPGFueT4ge1xuXHRyZXR1cm4gdHlwZW9mIHZBbm5vdGF0aW9uUGF0aCA9PT0gXCJvYmplY3RcIjtcbn07XG5cbmZ1bmN0aW9uIGlzU2VydmljZU9iamVjdChvYmplY3RQYXJ0OiBTZXJ2aWNlT2JqZWN0QW5kQW5ub3RhdGlvbik6IG9iamVjdFBhcnQgaXMgU2VydmljZU9iamVjdCB7XG5cdHJldHVybiBvYmplY3RQYXJ0ICYmIG9iamVjdFBhcnQuaGFzT3duUHJvcGVydHkoXCJfdHlwZVwiKTtcbn1cblxuY29uc3QgZ2V0RGF0YU1vZGVsUGF0aEZvckVudGl0eVNldCA9IGZ1bmN0aW9uKHJlc29sdmVkTWV0YVBhdGg6IFJlc29sdXRpb25UYXJnZXQ8YW55Pik6IERhdGFNb2RlbE9iamVjdFBhdGgge1xuXHRsZXQgcm9vdEVudGl0eVNldDogRW50aXR5U2V0IHwgdW5kZWZpbmVkO1xuXHRsZXQgY3VycmVudEVudGl0eVNldDogRW50aXR5U2V0IHwgdW5kZWZpbmVkO1xuXHRsZXQgcHJldmlvdXNFbnRpdHlTZXQ6IEVudGl0eVNldCB8IHVuZGVmaW5lZDtcblx0bGV0IGN1cnJlbnRFbnRpdHlUeXBlOiBFbnRpdHlUeXBlIHwgdW5kZWZpbmVkO1xuXHRsZXQgbmF2aWdhdGVkUGF0aHM6IHN0cmluZ1tdID0gW107XG5cdGNvbnN0IG5hdmlnYXRpb25Qcm9wZXJ0aWVzOiBOYXZpZ2F0aW9uUHJvcGVydHlbXSA9IFtdO1xuXHRyZXNvbHZlZE1ldGFQYXRoLm9iamVjdFBhdGguZm9yRWFjaCgob2JqZWN0UGFydDogU2VydmljZU9iamVjdEFuZEFubm90YXRpb24pID0+IHtcblx0XHRpZiAoaXNTZXJ2aWNlT2JqZWN0KG9iamVjdFBhcnQpKSB7XG5cdFx0XHRzd2l0Y2ggKG9iamVjdFBhcnQuX3R5cGUpIHtcblx0XHRcdFx0Y2FzZSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiOlxuXHRcdFx0XHRcdG5hdmlnYXRlZFBhdGhzLnB1c2gob2JqZWN0UGFydC5uYW1lKTtcblx0XHRcdFx0XHRuYXZpZ2F0aW9uUHJvcGVydGllcy5wdXNoKG9iamVjdFBhcnQpO1xuXHRcdFx0XHRcdGN1cnJlbnRFbnRpdHlUeXBlID0gb2JqZWN0UGFydC50YXJnZXRUeXBlO1xuXHRcdFx0XHRcdGlmIChwcmV2aW91c0VudGl0eVNldCAmJiBwcmV2aW91c0VudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nLmhhc093blByb3BlcnR5KG5hdmlnYXRlZFBhdGhzLmpvaW4oXCIvXCIpKSkge1xuXHRcdFx0XHRcdFx0Y3VycmVudEVudGl0eVNldCA9IHByZXZpb3VzRW50aXR5U2V0Lm5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmdbbmF2aWdhdGVkUGF0aHMuam9pbihcIi9cIildO1xuXHRcdFx0XHRcdFx0cHJldmlvdXNFbnRpdHlTZXQgPSBjdXJyZW50RW50aXR5U2V0O1xuXHRcdFx0XHRcdFx0bmF2aWdhdGVkUGF0aHMgPSBbXTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0Y3VycmVudEVudGl0eVNldCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJFbnRpdHlTZXRcIjpcblx0XHRcdFx0XHRpZiAocm9vdEVudGl0eVNldCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0XHRyb290RW50aXR5U2V0ID0gb2JqZWN0UGFydDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Y3VycmVudEVudGl0eVNldCA9IG9iamVjdFBhcnQ7XG5cdFx0XHRcdFx0cHJldmlvdXNFbnRpdHlTZXQgPSBjdXJyZW50RW50aXR5U2V0O1xuXHRcdFx0XHRcdGN1cnJlbnRFbnRpdHlUeXBlID0gY3VycmVudEVudGl0eVNldD8uZW50aXR5VHlwZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9XG5cdH0pO1xuXHRjb25zdCBkYXRhTW9kZWxQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoID0ge1xuXHRcdHN0YXJ0aW5nRW50aXR5U2V0OiByb290RW50aXR5U2V0IGFzIEVudGl0eVNldCxcblx0XHR0YXJnZXRFbnRpdHlUeXBlOiBjdXJyZW50RW50aXR5VHlwZSBhcyBFbnRpdHlUeXBlLFxuXHRcdHRhcmdldEVudGl0eVNldDogY3VycmVudEVudGl0eVNldCxcblx0XHRuYXZpZ2F0aW9uUHJvcGVydGllczogbmF2aWdhdGlvblByb3BlcnRpZXMsXG5cdFx0Y29udGV4dExvY2F0aW9uOiB1bmRlZmluZWQsXG5cdFx0dGFyZ2V0T2JqZWN0OiByZXNvbHZlZE1ldGFQYXRoLnRhcmdldFxuXHR9O1xuXHRkYXRhTW9kZWxQYXRoLmNvbnRleHRMb2NhdGlvbiA9IGRhdGFNb2RlbFBhdGg7XG5cdHJldHVybiBkYXRhTW9kZWxQYXRoO1xufTtcblxuLyoqXG4gKiBDcmVhdGUgYSBDb252ZXJ0ZXJDb250ZXh0IG9iamVjdCB0aGF0IHdpbGwgYmUgdXNlZCB3aXRoaW4gdGhlIGNvbnZlcnRlcnMuXG4gKlxuICogQHBhcmFtIHtDb252ZXJ0ZXJPdXRwdXR9IG9Db252ZXJ0ZWRUeXBlcyBUaGUgY29udmVydGVkIGFubm90YXRpb24gYW5kIHNlcnZpY2UgdHlwZXNcbiAqIEBwYXJhbSB7QmFzZU1hbmlmZXN0U2V0dGluZ3N9IG9NYW5pZmVzdFNldHRpbmdzIFRoZSBtYW5pZmVzdFNldHRpbmdzIHRoYXQgYXBwbGllcyB0byB0aGlzIHBhZ2VcbiAqIEBwYXJhbSB7VGVtcGxhdGVUeXBlfSB0ZW1wbGF0ZVR5cGUgVGhlIHR5cGUgb2YgdGVtcGxhdGUgd2UncmUgbG9va2luZyBhdCByaWdodCBub3dcbiAqIEBwYXJhbSB7SVNoZWxsU2VydmljZXNQcm94eX0gc2hlbGxTZXJ2aWNlcyBUaGUgY3VycmVudCBpbnN0YW5jZSBvZiB0aGUgc2hlbGxzZXJ2aWNlXG4gKiBAcGFyYW0ge0lEaWFnbm9zdGljc30gZGlhZ25vc3RpY3MgVGhlIGRpYWdub3N0aWNzIHNoaW1cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG1lcmdlRm4gVGhlIGZ1bmN0aW9uIHRvIGJlIHVzZWQgdG8gcGVyZm9tIHNvbWUgZGVlcCBtZXJnZXMgYmV0d2VlbiBvYmplY3RcbiAqIEBwYXJhbSB7RGF0YU1vZGVsT2JqZWN0UGF0aH0gdGFyZ2V0RGF0YU1vZGVsUGF0aCBUaGUgZ2xvYmFsIHBhdGggdG8gcmVhY2ggdGhlIGVudGl0eVNldFxuICpcbiAqIEByZXR1cm5zIHtDb252ZXJ0ZXJDb250ZXh0fSBBIGNvbnZlcnRlciBjb250ZXh0IGZvciB0aGUgY29udmVydGVyc1xuICovXG5jbGFzcyBDb252ZXJ0ZXJDb250ZXh0IHtcblx0cHJpdmF0ZSBtYW5pZmVzdFdyYXBwZXI6IE1hbmlmZXN0V3JhcHBlcjtcblx0cHJpdmF0ZSBiYXNlQ29udGV4dFBhdGg6IHN0cmluZztcblxuXHRjb25zdHJ1Y3Rvcihcblx0XHRwcml2YXRlIGNvbnZlcnRlZFR5cGVzOiBDb252ZXJ0ZXJPdXRwdXQsXG5cdFx0cHJpdmF0ZSBtYW5pZmVzdFNldHRpbmdzOiBCYXNlTWFuaWZlc3RTZXR0aW5ncyxcblx0XHRwcml2YXRlIGRpYWdub3N0aWNzOiBJRGlhZ25vc3RpY3MsXG5cdFx0cHJpdmF0ZSBtZXJnZUZuOiBGdW5jdGlvbixcblx0XHRwcml2YXRlIHRhcmdldERhdGFNb2RlbFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGhcblx0KSB7XG5cdFx0dGhpcy5tYW5pZmVzdFdyYXBwZXIgPSBuZXcgTWFuaWZlc3RXcmFwcGVyKHRoaXMubWFuaWZlc3RTZXR0aW5ncywgbWVyZ2VGbik7XG5cdFx0dGhpcy5iYXNlQ29udGV4dFBhdGggPSBnZXRUYXJnZXRPYmplY3RQYXRoKHRoaXMudGFyZ2V0RGF0YU1vZGVsUGF0aCk7XG5cdH1cblxuXHQvKipcblx0ICogUmV0cmlldmUgdGhlIHByb3BlcnR5IGJhc2VkIG9uIHRoZSBwYXRoLlxuXHQgKlxuXHQgKiBAcGFyYW0gZnVsbHlRdWFsaWZpZWROYW1lIFRoZSBmdWxseSBxdWFsaWZpZWQgbmFtZVxuXHQgKiBAcmV0dXJucyB7UHJvcGVydHl9IFRoZSBwcm9wZXJ0eSBFbnRpdHlUeXBlIGJhc2VkXG5cdCAqL1xuXHRwcml2YXRlIF9nZXRFbnRpdHlUeXBlRnJvbUZ1bGx5UXVhbGlmaWVkTmFtZShmdWxseVF1YWxpZmllZE5hbWU6IHN0cmluZyk6IEVudGl0eVR5cGUgfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IHRhcmdldEVudGl0eVR5cGUgPSB0aGlzLmNvbnZlcnRlZFR5cGVzLmVudGl0eVR5cGVzLmZpbmQoZW50aXR5VHlwZSA9PiB7XG5cdFx0XHRpZiAoZnVsbHlRdWFsaWZpZWROYW1lLnN0YXJ0c1dpdGgoZW50aXR5VHlwZS5mdWxseVF1YWxpZmllZE5hbWUpKSB7XG5cdFx0XHRcdGNvbnN0IHJlcGxhY2VBbm5vdGF0aW9uID0gZnVsbHlRdWFsaWZpZWROYW1lLnJlcGxhY2UoZW50aXR5VHlwZS5mdWxseVF1YWxpZmllZE5hbWUsIFwiXCIpO1xuXHRcdFx0XHRyZXR1cm4gcmVwbGFjZUFubm90YXRpb24uc3RhcnRzV2l0aChcIi9cIikgfHwgcmVwbGFjZUFubm90YXRpb24uc3RhcnRzV2l0aChcIkBcIik7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHRhcmdldEVudGl0eVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogUmV0cmlldmUgdGhlIGVudGl0eVR5cGUgYXNzb2NpYXRlZCB3aXRoIGFuIGFubm90YXRpb24gb2JqZWN0LlxuXHQgKlxuXHQgKiBAcGFyYW0gYW5ub3RhdGlvbiBUaGUgYW5ub3RhdGlvbiBvYmplY3QgZm9yIHdoaWNoIHdlIHdhbnQgdG8gZmluZCB0aGUgZW50aXR5VHlwZVxuXHQgKiBAcmV0dXJucyB7RW50aXR5VHlwZX0gVGhlIEVudGl0eVR5cGUgdGhlIGFubm90YXRpb24gcmVmZXJzIHRvXG5cdCAqL1xuXHRnZXRBbm5vdGF0aW9uRW50aXR5VHlwZShhbm5vdGF0aW9uPzogQW5ub3RhdGlvblRlcm08YW55Pik6IEVudGl0eVR5cGUge1xuXHRcdGlmIChhbm5vdGF0aW9uKSB7XG5cdFx0XHRjb25zdCBhbm5vdGF0aW9uUGF0aCA9IGFubm90YXRpb24uZnVsbHlRdWFsaWZpZWROYW1lO1xuXHRcdFx0Y29uc3QgdGFyZ2V0RW50aXR5VHlwZSA9IHRoaXMuX2dldEVudGl0eVR5cGVGcm9tRnVsbHlRdWFsaWZpZWROYW1lKGFubm90YXRpb25QYXRoKTtcblx0XHRcdGlmICghdGFyZ2V0RW50aXR5VHlwZSkge1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBFbnRpdHkgVHlwZSBmb3IgXCIgKyBhbm5vdGF0aW9uLmZ1bGx5UXVhbGlmaWVkTmFtZSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gdGFyZ2V0RW50aXR5VHlwZTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMudGFyZ2V0RGF0YU1vZGVsUGF0aC50YXJnZXRFbnRpdHlUeXBlO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSB0aGUgbWFuaWZlc3Qgc2V0dGluZ3MgZGVmaW5lZCBmb3IgYSBzcGVjaWZpYyBjb250cm9sIHdpdGhpbiBjb250cm9sQ29uZmlndXJhdGlvbi5cblx0ICpcblx0ICogQHBhcmFtIHZBbm5vdGF0aW9uUGF0aCBUaGUgYW5ub3RhdGlvbiBwYXRoIG9yIG9iamVjdCB0byBldmFsdWF0ZVxuXHQgKiBAcmV0dXJucyBUaGUgY29udHJvbCBjb25maWd1cmF0aW9uIGZvciB0aGF0IHNwZWNpZmljIGFubnRvYXRpb24gcGF0aCBpZiBpdCBleGlzdHNcblx0ICovXG5cdGdldE1hbmlmZXN0Q29udHJvbENvbmZpZ3VyYXRpb24odkFubm90YXRpb25QYXRoOiBzdHJpbmcgfCBBbm5vdGF0aW9uVGVybTxhbnk+KTogYW55IHtcblx0XHRpZiAoaXNBbm5vdGF0aW9uVGVybSh2QW5ub3RhdGlvblBhdGgpKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdFdyYXBwZXIuZ2V0Q29udHJvbENvbmZpZ3VyYXRpb24oXG5cdFx0XHRcdHZBbm5vdGF0aW9uUGF0aC5mdWxseVF1YWxpZmllZE5hbWUucmVwbGFjZSh0aGlzLnRhcmdldERhdGFNb2RlbFBhdGgudGFyZ2V0RW50aXR5VHlwZS5mdWxseVF1YWxpZmllZE5hbWUsIFwiXCIpXG5cdFx0XHQpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5tYW5pZmVzdFdyYXBwZXIuZ2V0Q29udHJvbENvbmZpZ3VyYXRpb24odkFubm90YXRpb25QYXRoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDcmVhdGUgYW4gYWJzb2x1dGUgYW5ub3RhdGlvbiBwYXRoIGJhc2VkIG9uIHRoZSBjdXJyZW50IG1ldGEgbW9kZWwgY29udGV4dC5cblx0ICpcblx0ICogQHBhcmFtIHNBbm5vdGF0aW9uUGF0aCBUaGUgcmVsYXRpdmUgYW5ub3RhdGlvbiBwYXRoXG5cdCAqIEByZXR1cm5zIFRoZSBjb3JyZWN0IGFubm90YXRpb24gcGF0aCBiYXNlZCBvbiB0aGUgY3VycmVudCBjb250ZXh0XG5cdCAqL1xuXHRnZXRBYnNvbHV0ZUFubm90YXRpb25QYXRoKHNBbm5vdGF0aW9uUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcblx0XHRpZiAoIXNBbm5vdGF0aW9uUGF0aCkge1xuXHRcdFx0cmV0dXJuIHNBbm5vdGF0aW9uUGF0aDtcblx0XHR9XG5cdFx0aWYgKHNBbm5vdGF0aW9uUGF0aFswXSA9PT0gXCIvXCIpIHtcblx0XHRcdHJldHVybiBzQW5ub3RhdGlvblBhdGg7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLmJhc2VDb250ZXh0UGF0aCArIFwiL1wiICsgc0Fubm90YXRpb25QYXRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHJpZXZlIHRoZSBjdXJyZW50IGVudGl0eVNldC5cblx0ICpcblx0ICogQHJldHVybnMgVGhlIGN1cnJlbnQgRW50aXR5U2V0IGlmIGl0IGV4aXN0cy5cblx0ICovXG5cdGdldEVudGl0eVNldCgpOiBFbnRpdHlTZXQgfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0aGlzLnRhcmdldERhdGFNb2RlbFBhdGgudGFyZ2V0RW50aXR5U2V0O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHJpZXZlIHRoZSBjb250ZXh0IHBhdGguXG5cdCAqXG5cdCAqIEByZXR1cm5zIFRoZSBjb250ZXh0IHBhdGggb2YgdGhlIGNvbnZlcnRlci5cblx0ICovXG5cdGdldENvbnRleHRQYXRoKCk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIHRoaXMuYmFzZUNvbnRleHRQYXRoO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHJpZXZlIHRoZSBjdXJyZW50IGRhdGEgbW9kZWwgb2JqZWN0IHBhdGguXG5cdCAqXG5cdCAqIEByZXR1cm5zIFRoZSBjdXJyZW50IGRhdGEgbW9kZWwgb2JqZWN0IHBhdGhcblx0ICovXG5cdGdldERhdGFNb2RlbE9iamVjdFBhdGgoKTogRGF0YU1vZGVsT2JqZWN0UGF0aCB7XG5cdFx0cmV0dXJuIHRoaXMudGFyZ2V0RGF0YU1vZGVsUGF0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIEVudGl0eUNvbnRhaW5lci5cblx0ICpcblx0ICogQHJldHVybnMgVGhlIGN1cnJlbnQgc2VydmljZSBFbnRpdHlDb250YWluZXJcblx0ICovXG5cdGdldEVudGl0eUNvbnRhaW5lcigpOiBFbnRpdHlDb250YWluZXIge1xuXHRcdHJldHVybiB0aGlzLmNvbnZlcnRlZFR5cGVzLmVudGl0eUNvbnRhaW5lcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgdGhlIEVudGl0eVR5cGUgYmFzZWQgb24gdGhlIGZ1bGx5IHF1YWxpZmllZCBuYW1lLlxuXHQgKlxuXHQgKiBAcmV0dXJucyBUaGUgY3VycmVudCBFbnRpdHlUeXBlLlxuXHQgKi9cblx0Z2V0RW50aXR5VHlwZSgpOiBFbnRpdHlUeXBlIHtcblx0XHRyZXR1cm4gdGhpcy50YXJnZXREYXRhTW9kZWxQYXRoLnRhcmdldEVudGl0eVR5cGU7XG5cdH1cblxuXHQvKipcblx0ICogR2V0IGEgc2luZ2xldG9uIGJhc2VkIG9uIGZ1bGx5IHF1YWxpZmllZCBuYW1lLlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gZnVsbHlRdWFsaWZpZWROYW1lIFRoZSBmdWxseSBxdWFsaWZpZWQgbmFtZSBvZiB0aGUgc2luZ2xldG9uXG5cdCAqIEByZXR1cm5zIHtTaW5nbGV0b24gfCB1bmRlZmluZWR9IFRoZSBzaW5nbGV0b24gaW5zdGFuY2UuXG5cdCAqL1xuXHRnZXRTaW5nbGV0b24oZnVsbHlRdWFsaWZpZWROYW1lOiBzdHJpbmcpOiBTaW5nbGV0b24gfCB1bmRlZmluZWQge1xuXHRcdHJldHVybiB0aGlzLmNvbnZlcnRlZFR5cGVzLnNpbmdsZXRvbnMuZmluZChzaW5nbGV0b24gPT4gc2luZ2xldG9uLmZ1bGx5UXVhbGlmaWVkTmFtZSA9PT0gZnVsbHlRdWFsaWZpZWROYW1lKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSBhbiBhbm5vdGF0aW9uIGZyb20gYW4gRW50aXR5VHlwZSBiYXNlZCBvbiBhbiBhbm5vdGF0aW9uIHBhdGguXG5cdCAqXG5cdCAqIEBwYXJhbSBhbm5vdGF0aW9uUGF0aCBUaGUgYW5ub3RhdGlvbiBwYXRoIHRvIGV2YWx1YXRlXG5cdCAqIEByZXR1cm5zIFRoZSB0YXJnZXQgYW5ub3RhdGlvbiBwYXRoIGFzIHdlbGwgYXMgYSBjb252ZXJ0ZXIgY29udGV4dCB0byBnbyB3aXRoIGl0XG5cdCAqL1xuXHRnZXRFbnRpdHlUeXBlQW5ub3RhdGlvbihhbm5vdGF0aW9uUGF0aDogc3RyaW5nKTogUmVzb2x2ZWRBbm5vdGF0aW9uQ29udGV4dCB7XG5cdFx0aWYgKGFubm90YXRpb25QYXRoLmluZGV4T2YoXCJAXCIpID09PSAtMSkge1xuXHRcdFx0YW5ub3RhdGlvblBhdGggPSBcIkBcIiArIGFubm90YXRpb25QYXRoO1xuXHRcdH1cblx0XHRjb25zdCB0YXJnZXRPYmplY3Q6IFJlc29sdmVkVGFyZ2V0ID0gdGhpcy50YXJnZXREYXRhTW9kZWxQYXRoLnRhcmdldEVudGl0eVR5cGUucmVzb2x2ZVBhdGgoYW5ub3RhdGlvblBhdGgsIHRydWUpO1xuXG5cdFx0bGV0IHJvb3RFbnRpdHlTZXQgPSB0aGlzLnRhcmdldERhdGFNb2RlbFBhdGgudGFyZ2V0RW50aXR5U2V0O1xuXHRcdGxldCBjdXJyZW50RW50aXR5VHlwZSA9IHRoaXMudGFyZ2V0RGF0YU1vZGVsUGF0aC50YXJnZXRFbnRpdHlUeXBlO1xuXHRcdGNvbnN0IHN0YXJ0aW5nRW50aXR5VHlwZSA9IHRoaXMudGFyZ2V0RGF0YU1vZGVsUGF0aC5zdGFydGluZ0VudGl0eVNldC5lbnRpdHlUeXBlO1xuXHRcdGNvbnN0IG5hdmlnYXRpb25Qcm9wZXJ0aWVzID0gdGhpcy50YXJnZXREYXRhTW9kZWxQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLmNvbmNhdCgpO1xuXHRcdGxldCBpID0gMTtcblx0XHRsZXQgY3VycmVudE9iamVjdDtcblx0XHRsZXQgbmF2aWdhdGVkUGF0aHMgPSBbXTtcblx0XHRjb25zdCB2aXNpdGVkT2JqZWN0cyA9IHRhcmdldE9iamVjdC52aXNpdGVkT2JqZWN0cztcblx0XHQvLyBJbiBjYXNlIG9mIHBhcmFtZXRlcml6ZWQgc2VydmljZVxuXHRcdGlmICghcm9vdEVudGl0eVNldCAmJiBzdGFydGluZ0VudGl0eVR5cGUuYW5ub3RhdGlvbnMuQ29tbW9uPy5SZXN1bHRDb250ZXh0KSB7XG5cdFx0XHRyb290RW50aXR5U2V0ID0gdGhpcy50YXJnZXREYXRhTW9kZWxQYXRoLnN0YXJ0aW5nRW50aXR5U2V0O1xuXHRcdFx0dGhpcy50YXJnZXREYXRhTW9kZWxQYXRoLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLmZvckVhY2goZnVuY3Rpb24obmF2T2JqZWN0KSB7XG5cdFx0XHRcdG5hdmlnYXRlZFBhdGhzLnB1c2gobmF2T2JqZWN0Lm5hbWUpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHdoaWxlIChpIDwgdmlzaXRlZE9iamVjdHMubGVuZ3RoKSB7XG5cdFx0XHRjdXJyZW50T2JqZWN0ID0gdmlzaXRlZE9iamVjdHNbaSsrXTtcblx0XHRcdGlmIChjdXJyZW50T2JqZWN0Ll90eXBlID09PSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiKSB7XG5cdFx0XHRcdG5hdmlnYXRlZFBhdGhzLnB1c2goY3VycmVudE9iamVjdC5uYW1lKTtcblx0XHRcdFx0bmF2aWdhdGlvblByb3BlcnRpZXMucHVzaChjdXJyZW50T2JqZWN0IGFzIE5hdmlnYXRpb25Qcm9wZXJ0eSk7XG5cdFx0XHRcdGN1cnJlbnRFbnRpdHlUeXBlID0gKGN1cnJlbnRPYmplY3QgYXMgTmF2aWdhdGlvblByb3BlcnR5KS50YXJnZXRUeXBlO1xuXHRcdFx0XHRpZiAocm9vdEVudGl0eVNldCAmJiByb290RW50aXR5U2V0Lm5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmcuaGFzT3duUHJvcGVydHkobmF2aWdhdGVkUGF0aHMuam9pbihcIi9cIikpKSB7XG5cdFx0XHRcdFx0Y29uc3QgbmF2UGF0aCA9IG5hdmlnYXRlZFBhdGhzLmpvaW4oXCIvXCIpO1xuXHRcdFx0XHRcdHJvb3RFbnRpdHlTZXQgPVxuXHRcdFx0XHRcdFx0cm9vdEVudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nW2N1cnJlbnRPYmplY3QubmFtZV0gfHwgcm9vdEVudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nW25hdlBhdGhdO1xuXHRcdFx0XHRcdG5hdmlnYXRlZFBhdGhzID0gW107XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cm9vdEVudGl0eVNldCA9IHVuZGVmaW5lZDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGN1cnJlbnRPYmplY3QuX3R5cGUgPT09IFwiRW50aXR5U2V0XCIpIHtcblx0XHRcdFx0cm9vdEVudGl0eVNldCA9IGN1cnJlbnRPYmplY3QgYXMgRW50aXR5U2V0O1xuXHRcdFx0XHRjdXJyZW50RW50aXR5VHlwZSA9IHJvb3RFbnRpdHlTZXQuZW50aXR5VHlwZTtcblx0XHRcdH1cblx0XHR9XG5cdFx0Y29uc3Qgb3V0RGF0YU1vZGVsUGF0aCA9IHtcblx0XHRcdHN0YXJ0aW5nRW50aXR5U2V0OiB0aGlzLnRhcmdldERhdGFNb2RlbFBhdGguc3RhcnRpbmdFbnRpdHlTZXQsXG5cdFx0XHR0YXJnZXRFbnRpdHlTZXQ6IHJvb3RFbnRpdHlTZXQsXG5cdFx0XHR0YXJnZXRFbnRpdHlUeXBlOiBjdXJyZW50RW50aXR5VHlwZSxcblx0XHRcdHRhcmdldE9iamVjdDogbmF2aWdhdGlvblByb3BlcnRpZXNbbmF2aWdhdGlvblByb3BlcnRpZXMubGVuZ3RoIC0gMV0sXG5cdFx0XHRuYXZpZ2F0aW9uUHJvcGVydGllcyxcblx0XHRcdGNvbnRleHRMb2NhdGlvbjogdGhpcy50YXJnZXREYXRhTW9kZWxQYXRoLmNvbnRleHRMb2NhdGlvblxuXHRcdH07XG5cdFx0cmV0dXJuIHtcblx0XHRcdGFubm90YXRpb246IHRhcmdldE9iamVjdC50YXJnZXQgYXMgQW55QW5ub3RhdGlvbixcblx0XHRcdGNvbnZlcnRlckNvbnRleHQ6IG5ldyBDb252ZXJ0ZXJDb250ZXh0KFxuXHRcdFx0XHR0aGlzLmNvbnZlcnRlZFR5cGVzLFxuXHRcdFx0XHR0aGlzLm1hbmlmZXN0U2V0dGluZ3MsXG5cdFx0XHRcdHRoaXMuZGlhZ25vc3RpY3MsXG5cdFx0XHRcdHRoaXMubWVyZ2VGbixcblx0XHRcdFx0b3V0RGF0YU1vZGVsUGF0aFxuXHRcdFx0KVxuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogUmV0cmlldmUgdGhlIHR5cGUgb2YgdGVtcGxhdGUgd2UncmUgd29ya2luZyBvbiAoZS5nLiBMaXN0UmVwb3J0IC8gT2JqZWN0UGFnZSAvIC4uLikuXG5cdCAqXG5cdCAqIEByZXR1cm5zIFRoZSBjdXJyZW50IHRlbnBsYXRlIHR5cGVcblx0ICovXG5cdGdldFRlbXBsYXRlVHlwZSgpOiBUZW1wbGF0ZVR5cGUge1xuXHRcdHJldHVybiB0aGlzLm1hbmlmZXN0V3JhcHBlci5nZXRUZW1wbGF0ZVR5cGUoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSBhIHJlbGF0aXZlIGFubm90YXRpb24gcGF0aCBiZXR3ZWVuIGFuIGFubm90YXRpb24gcGF0aCBhbmQgYW4gZW50aXR5IHR5cGUuXG5cdCAqXG5cdCAqIEBwYXJhbSBhbm5vdGF0aW9uUGF0aFxuXHQgKiBAcGFyYW0gZW50aXR5VHlwZVxuXHQgKiBAcmV0dXJucyBUaGUgcmVsYXRpdmUgYW5udG90YXRpb24gcGF0aC5cblx0ICovXG5cdGdldFJlbGF0aXZlQW5ub3RhdGlvblBhdGgoYW5ub3RhdGlvblBhdGg6IHN0cmluZywgZW50aXR5VHlwZTogRW50aXR5VHlwZSk6IHN0cmluZyB7XG5cdFx0cmV0dXJuIGFubm90YXRpb25QYXRoLnJlcGxhY2UoZW50aXR5VHlwZS5mdWxseVF1YWxpZmllZE5hbWUsIFwiXCIpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFRyYW5zZm9ybSBhbiBlbnRpdHlUeXBlIGJhc2VkIHBhdGggdG8gYW4gZW50aXR5U2V0IGJhc2VkIG9uZSAodWk1IHRlbXBsYXRpbmcgZ2VuZXJhbGx5IGV4cGVjdCBhbiBlbnRpdHlTZXRCYXNlZFBhdGgpLlxuXHQgKlxuXHQgKiBAcGFyYW0gYW5ub3RhdGlvblBhdGhcblx0ICogQHJldHVybnMgVGhlIEVudGl0eVNldCBiYXNlZCBhbm5vdGF0aW9uIHBhdGhcblx0ICovXG5cdGdldEVudGl0eVNldEJhc2VkQW5ub3RhdGlvblBhdGgoYW5ub3RhdGlvblBhdGg6IHN0cmluZyk6IHN0cmluZyB7XG5cdFx0aWYgKCFhbm5vdGF0aW9uUGF0aCkge1xuXHRcdFx0cmV0dXJuIGFubm90YXRpb25QYXRoO1xuXHRcdH1cblx0XHRjb25zdCBlbnRpdHlUeXBlRlFOID0gdGhpcy50YXJnZXREYXRhTW9kZWxQYXRoLnRhcmdldEVudGl0eVR5cGUuZnVsbHlRdWFsaWZpZWROYW1lO1xuXHRcdGlmIChcblx0XHRcdHRoaXMudGFyZ2V0RGF0YU1vZGVsUGF0aC50YXJnZXRFbnRpdHlTZXQgfHxcblx0XHRcdCgodGhpcy5iYXNlQ29udGV4dFBhdGguc3RhcnRzV2l0aChcIi9cIikgJiYgdGhpcy5iYXNlQ29udGV4dFBhdGgubWF0Y2goL1xcLy9nKSkgfHwgW10pLmxlbmd0aCA+IDFcblx0XHQpIHtcblx0XHRcdGxldCByZXBsYWNlZEFubm90YXRpb25QYXRoID0gYW5ub3RhdGlvblBhdGgucmVwbGFjZShlbnRpdHlUeXBlRlFOLCBcIi9cIik7XG5cdFx0XHRpZiAocmVwbGFjZWRBbm5vdGF0aW9uUGF0aC5sZW5ndGggPiAyICYmIHJlcGxhY2VkQW5ub3RhdGlvblBhdGhbMF0gPT09IFwiL1wiICYmIHJlcGxhY2VkQW5ub3RhdGlvblBhdGhbMV0gPT09IFwiL1wiKSB7XG5cdFx0XHRcdHJlcGxhY2VkQW5ub3RhdGlvblBhdGggPSByZXBsYWNlZEFubm90YXRpb25QYXRoLnN1YnN0cigxKTtcblx0XHRcdH1cblx0XHRcdHJldHVybiB0aGlzLmJhc2VDb250ZXh0UGF0aCArIHJlcGxhY2VkQW5ub3RhdGlvblBhdGg7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiBcIi9cIiArIGFubm90YXRpb25QYXRoO1xuXHRcdH1cblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSB0aGUgbWFuaWZlc3Qgd3JhcHBlciBmb3IgdGhlIGN1cnJlbnQgY29udGV4dC5cblx0ICpcblx0ICogQHJldHVybnMgVGhlIGN1cnJlbnQgbWFuaWZlc3Qgd3JhcHBlclxuXHQgKi9cblx0Z2V0TWFuaWZlc3RXcmFwcGVyKCk6IE1hbmlmZXN0V3JhcHBlciB7XG5cdFx0cmV0dXJuIHRoaXMubWFuaWZlc3RXcmFwcGVyO1xuXHR9XG5cblx0Z2V0RGlhZ25vc3RpY3MoKTogSURpYWdub3N0aWNzIHtcblx0XHRyZXR1cm4gdGhpcy5kaWFnbm9zdGljcztcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZSBhIG5ldyBjb252ZXJ0ZXIgY29udGV4dCwgc2NvcGVkIGZvciBhIGRpZmZlcmVudCBjb250ZXh0IHBhdGguXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBjb250ZXh0UGF0aCBUaGUgcGF0aCB3ZSB3YW50IHRvIG9yY2hlc3RyYXRlIHRoZSBjb252ZXJ0ZXIgY29udGV4dCBhcm91bmRcblx0ICogQHJldHVybnMge0NvbnZlcnRlckNvbnRleHR9XG5cdCAqL1xuXHRnZXRDb252ZXJ0ZXJDb250ZXh0Rm9yPFQ+KGNvbnRleHRQYXRoOiBzdHJpbmcpOiBDb252ZXJ0ZXJDb250ZXh0IHtcblx0XHRjb25zdCByZXNvbHZlZE1ldGFQYXRoOiBSZXNvbHV0aW9uVGFyZ2V0PFQ+ID0gdGhpcy5jb252ZXJ0ZWRUeXBlcy5yZXNvbHZlUGF0aChjb250ZXh0UGF0aCk7XG5cdFx0Y29uc3QgdGFyZ2V0UGF0aCA9IGdldERhdGFNb2RlbFBhdGhGb3JFbnRpdHlTZXQocmVzb2x2ZWRNZXRhUGF0aCk7XG5cdFx0cmV0dXJuIG5ldyBDb252ZXJ0ZXJDb250ZXh0KHRoaXMuY29udmVydGVkVHlwZXMsIHRoaXMubWFuaWZlc3RTZXR0aW5ncywgdGhpcy5kaWFnbm9zdGljcywgdGhpcy5tZXJnZUZuLCB0YXJnZXRQYXRoKTtcblx0fVxuXG5cdC8qKlxuXHQgKiBHZXQgYWxsIGFubm90YXRpb25zIG9mIGEgZ2l2ZW4gdGVybSBhbmQgdm9jYWJ1bGFyeSBvbiBhbiBlbnRpdHkgdHlwZVxuXHQgKiAob3Igb24gdGhlIGN1cnJlbnQgZW50aXR5IHR5cGUgaWYgZW50aXR5VHlwZSBpc24ndCBzcGVjaWZpZWQpLlxuXHQgKlxuXHQgKiBAcGFyYW0gdm9jYWJ1bGFyeU5hbWVcblx0ICogQHBhcmFtIGFubm90YXRpb25UZXJtXG5cdCAqIEBwYXJhbSBbYW5ub3RhdGlvblNvdXJjZXNdXG5cdCAqIEByZXR1cm5zIEFsbCB0aGUgYW5ub3RhdGlvbiBmb3IgYSBzcGVjaWZpYyB0ZXJtIGFuZCB2b2NhYnVsYXJ5IGZyb20gYW4gZW50aXR5IHR5cGVcblx0ICovXG5cdGdldEFubm90YXRpb25zQnlUZXJtKFxuXHRcdHZvY2FidWxhcnlOYW1lOiBrZXlvZiBFbnRpdHlUeXBlQW5ub3RhdGlvbnMsXG5cdFx0YW5ub3RhdGlvblRlcm06IHN0cmluZyxcblx0XHRhbm5vdGF0aW9uU291cmNlczogKFNlcnZpY2VPYmplY3QgfCB1bmRlZmluZWQpW10gPSBbdGhpcy5nZXRFbnRpdHlUeXBlKCldXG5cdCk6IEFubm90YXRpb25UZXJtPGFueT5bXSB7XG5cdFx0bGV0IG91dEFubm90YXRpb25zOiBBbm5vdGF0aW9uVGVybTxhbnk+W10gPSBbXTtcblx0XHRhbm5vdGF0aW9uU291cmNlcy5mb3JFYWNoKGFubm90YXRpb25Tb3VyY2UgPT4ge1xuXHRcdFx0aWYgKGFubm90YXRpb25Tb3VyY2UpIHtcblx0XHRcdFx0Y29uc3QgYW5ub3RhdGlvbnM6IFJlY29yZDxzdHJpbmcsIEFubm90YXRpb25UZXJtPGFueT4+ID0gYW5ub3RhdGlvblNvdXJjZT8uYW5ub3RhdGlvbnNbdm9jYWJ1bGFyeU5hbWVdIHx8IHt9O1xuXHRcdFx0XHRpZiAoYW5ub3RhdGlvbnMpIHtcblx0XHRcdFx0XHRvdXRBbm5vdGF0aW9ucyA9IE9iamVjdC5rZXlzKGFubm90YXRpb25zKVxuXHRcdFx0XHRcdFx0LmZpbHRlcihhbm5vdGF0aW9uID0+IGFubm90YXRpb25zW2Fubm90YXRpb25dLnRlcm0gPT09IGFubm90YXRpb25UZXJtKVxuXHRcdFx0XHRcdFx0LnJlZHVjZSgocHJldmlvdXNWYWx1ZTogQW5ub3RhdGlvblRlcm08YW55PltdLCBrZXk6IHN0cmluZykgPT4ge1xuXHRcdFx0XHRcdFx0XHRwcmV2aW91c1ZhbHVlLnB1c2goYW5ub3RhdGlvbnNba2V5XSk7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBwcmV2aW91c1ZhbHVlO1xuXHRcdFx0XHRcdFx0fSwgb3V0QW5ub3RhdGlvbnMpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIG91dEFubm90YXRpb25zO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHJpZXZlcyB0aGUgcmVsYXRpdmUgbW9kZWwgcGF0aCBiYXNlZCBvbiB0aGUgY3VycmVudCBjb250ZXh0IHBhdGguXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBUaGUgcmVsYXRpdmUgbW9kZWwgcGF0aCBvciB1bmRlZmluZWQgaWYgdGhlIHBhdGggaXMgbm90IHJlc29sdmVhYmxlXG5cdCAqL1xuXHRnZXRSZWxhdGl2ZU1vZGVsUGF0aEZ1bmN0aW9uKCk6IEZ1bmN0aW9uIHtcblx0XHRjb25zdCB0YXJnZXREYXRhTW9kZWxQYXRoID0gdGhpcy50YXJnZXREYXRhTW9kZWxQYXRoO1xuXHRcdHJldHVybiBmdW5jdGlvbihzUGF0aDogc3RyaW5nKSB7XG5cdFx0XHRjb25zdCBlbmhhbmNlZFBhdGggPSBlbmhhbmNlRGF0YU1vZGVsUGF0aCh0YXJnZXREYXRhTW9kZWxQYXRoLCBzUGF0aCk7XG5cdFx0XHRyZXR1cm4gZ2V0Q29udGV4dFJlbGF0aXZlVGFyZ2V0T2JqZWN0UGF0aChlbmhhbmNlZFBhdGgsIHRydWUpO1xuXHRcdH07XG5cdH1cblxuXHQvKipcblx0ICogQ3JlYXRlIHRoZSBjb252ZXJ0ZXIgY29udGV4dCBuZWNlc3NhcnkgZm9yIGEgbWFjcm8gYmFzZWQgb24gYSBtZXRhbW9kZWwgY29udGV4dC5cblx0ICogQHBhcmFtIHNFbnRpdHlTZXROYW1lXG5cdCAqIEBwYXJhbSBvTWV0YU1vZGVsQ29udGV4dFxuXHQgKiBAcGFyYW0gZGlhZ25vc3RpY3Ncblx0ICogQHBhcmFtIG1lcmdlRm5cblx0ICogQHBhcmFtIHRhcmdldERhdGFNb2RlbFBhdGhcblx0ICogQHBhcmFtIG1hbmlmZXN0U2V0dGluZ3Ncblx0ICogQHJldHVybnMge0NvbnZlcnRlckNvbnRleHR9IFRoZSBjdXJyZW50IGNvbnZlcnRlciBjb250ZXh0XG5cdCAqL1xuXHRzdGF0aWMgY3JlYXRlQ29udmVydGVyQ29udGV4dEZvck1hY3JvKFxuXHRcdHNFbnRpdHlTZXROYW1lOiBzdHJpbmcsXG5cdFx0b01ldGFNb2RlbENvbnRleHQ6IENvbnRleHQgfCBPRGF0YU1ldGFNb2RlbCxcblx0XHRkaWFnbm9zdGljczogSURpYWdub3N0aWNzLFxuXHRcdG1lcmdlRm46IEZ1bmN0aW9uLFxuXHRcdHRhcmdldERhdGFNb2RlbFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGggfCB1bmRlZmluZWQsXG5cdFx0bWFuaWZlc3RTZXR0aW5nczogQmFzZU1hbmlmZXN0U2V0dGluZ3MgPSB7fSBhcyBCYXNlTWFuaWZlc3RTZXR0aW5nc1xuXHQpOiBDb252ZXJ0ZXJDb250ZXh0IHtcblx0XHRjb25zdCBvTWV0YU1vZGVsOiBPRGF0YU1ldGFNb2RlbCA9IG9NZXRhTW9kZWxDb250ZXh0LmlzQShcInNhcC51aS5tb2RlbC5vZGF0YS52NC5PRGF0YU1ldGFNb2RlbFwiKVxuXHRcdFx0PyAob01ldGFNb2RlbENvbnRleHQgYXMgT0RhdGFNZXRhTW9kZWwpXG5cdFx0XHQ6ICgoKG9NZXRhTW9kZWxDb250ZXh0IGFzIENvbnRleHQpLmdldE1vZGVsKCkgYXMgdW5rbm93bikgYXMgT0RhdGFNZXRhTW9kZWwpO1xuXHRcdGNvbnN0IG9Db252ZXJ0ZXJPdXRwdXQgPSBjb252ZXJ0VHlwZXMob01ldGFNb2RlbCk7XG5cdFx0Y29uc3QgdGFyZ2V0RW50aXR5U2V0ID0gb0NvbnZlcnRlck91dHB1dC5lbnRpdHlTZXRzLmZpbmQoZW50aXR5U2V0ID0+IGVudGl0eVNldC5uYW1lID09PSBzRW50aXR5U2V0TmFtZSkgYXMgRW50aXR5U2V0O1xuXHRcdGlmICghdGFyZ2V0RGF0YU1vZGVsUGF0aCkge1xuXHRcdFx0dGFyZ2V0RGF0YU1vZGVsUGF0aCA9IHtcblx0XHRcdFx0c3RhcnRpbmdFbnRpdHlTZXQ6IHRhcmdldEVudGl0eVNldCxcblx0XHRcdFx0bmF2aWdhdGlvblByb3BlcnRpZXM6IFtdLFxuXHRcdFx0XHR0YXJnZXRFbnRpdHlTZXQ6IHRhcmdldEVudGl0eVNldCxcblx0XHRcdFx0dGFyZ2V0RW50aXR5VHlwZTogdGFyZ2V0RW50aXR5U2V0LmVudGl0eVR5cGUsXG5cdFx0XHRcdHRhcmdldE9iamVjdDogdGFyZ2V0RW50aXR5U2V0XG5cdFx0XHR9O1xuXHRcdH1cblx0XHRyZXR1cm4gbmV3IENvbnZlcnRlckNvbnRleHQob0NvbnZlcnRlck91dHB1dCwgbWFuaWZlc3RTZXR0aW5ncywgZGlhZ25vc3RpY3MsIG1lcmdlRm4sIHRhcmdldERhdGFNb2RlbFBhdGgpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbnZlcnRlckNvbnRleHQ7XG4iXX0=