/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/common/AnnotationConverter"], function (AnnotationConverter) {
  "use strict";

  var _exports = {};

  function _createForOfIteratorHelper(o) { if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (o = _unsupportedIterableToArray(o))) { var i = 0; var F = function () {}; return { s: F, n: function () { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function (e) { throw e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var it, normalCompletion = true, didErr = false, err; return { s: function () { it = o[Symbol.iterator](); }, n: function () { var step = it.next(); normalCompletion = step.done; return step; }, e: function (e) { didErr = true; err = e; }, f: function () { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

  function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

  function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

  function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

  function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

  function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

  var VOCABULARY_ALIAS = {
    "Org.OData.Capabilities.V1": "Capabilities",
    "Org.OData.Core.V1": "Core",
    "Org.OData.Measures.V1": "Measures",
    "com.sap.vocabularies.Common.v1": "Common",
    "com.sap.vocabularies.UI.v1": "UI",
    "com.sap.vocabularies.Session.v1": "Session",
    "com.sap.vocabularies.Analytics.v1": "Analytics",
    "com.sap.vocabularies.PersonalData.v1": "PersonalData",
    "com.sap.vocabularies.Communication.v1": "Communication"
  };
  var DefaultEnvironmentCapabilities = {
    Chart: true,
    MicroChart: true,
    UShell: true,
    IntentBasedNavigation: true
  };
  _exports.DefaultEnvironmentCapabilities = DefaultEnvironmentCapabilities;
  var MetaModelConverter = {
    parsePropertyValue: function (annotationObject, propertyKey, currentTarget, annotationsLists, oCapabilities) {
      var _this = this;

      var value;
      var currentPropertyTarget = currentTarget + "/" + propertyKey;

      if (annotationObject === null) {
        value = {
          type: "Null",
          Null: null
        };
      } else if (typeof annotationObject === "string") {
        value = {
          type: "String",
          String: annotationObject
        };
      } else if (typeof annotationObject === "boolean") {
        value = {
          type: "Bool",
          Bool: annotationObject
        };
      } else if (typeof annotationObject === "number") {
        value = {
          type: "Int",
          Int: annotationObject
        };
      } else if (Array.isArray(annotationObject)) {
        value = {
          type: "Collection",
          Collection: annotationObject.map(function (subAnnotationObject, subAnnotationObjectIndex) {
            return _this.parseAnnotationObject(subAnnotationObject, currentPropertyTarget + "/" + subAnnotationObjectIndex, annotationsLists, oCapabilities);
          })
        };

        if (annotationObject.length > 0) {
          if (annotationObject[0].hasOwnProperty("$PropertyPath")) {
            value.Collection.type = "PropertyPath";
          } else if (annotationObject[0].hasOwnProperty("$Path")) {
            value.Collection.type = "Path";
          } else if (annotationObject[0].hasOwnProperty("$NavigationPropertyPath")) {
            value.Collection.type = "NavigationPropertyPath";
          } else if (annotationObject[0].hasOwnProperty("$AnnotationPath")) {
            value.Collection.type = "AnnotationPath";
          } else if (annotationObject[0].hasOwnProperty("$Type")) {
            value.Collection.type = "Record";
          } else if (annotationObject[0].hasOwnProperty("$If")) {
            value.Collection.type = "If";
          } else if (annotationObject[0].hasOwnProperty("$Or")) {
            value.Collection.type = "Or";
          } else if (annotationObject[0].hasOwnProperty("$And")) {
            value.Collection.type = "And";
          } else if (annotationObject[0].hasOwnProperty("$Eq")) {
            value.Collection.type = "Eq";
          } else if (annotationObject[0].hasOwnProperty("$Ne")) {
            value.Collection.type = "Ne";
          } else if (annotationObject[0].hasOwnProperty("$Not")) {
            value.Collection.type = "Not";
          } else if (annotationObject[0].hasOwnProperty("$Gt")) {
            value.Collection.type = "Gt";
          } else if (annotationObject[0].hasOwnProperty("$Ge")) {
            value.Collection.type = "Ge";
          } else if (annotationObject[0].hasOwnProperty("$Lt")) {
            value.Collection.type = "Lt";
          } else if (annotationObject[0].hasOwnProperty("$Le")) {
            value.Collection.type = "Le";
          } else if (annotationObject[0].hasOwnProperty("$Apply")) {
            value.Collection.type = "Apply";
          } else if (typeof annotationObject[0] === "object") {
            // $Type is optional...
            value.Collection.type = "Record";
          } else {
            value.Collection.type = "String";
          }
        }
      } else if (annotationObject.$Path !== undefined) {
        value = {
          type: "Path",
          Path: annotationObject.$Path
        };
      } else if (annotationObject.$Decimal !== undefined) {
        value = {
          type: "Decimal",
          Decimal: parseFloat(annotationObject.$Decimal)
        };
      } else if (annotationObject.$PropertyPath !== undefined) {
        value = {
          type: "PropertyPath",
          PropertyPath: annotationObject.$PropertyPath
        };
      } else if (annotationObject.$NavigationPropertyPath !== undefined) {
        value = {
          type: "NavigationPropertyPath",
          NavigationPropertyPath: annotationObject.$NavigationPropertyPath
        };
      } else if (annotationObject.$If !== undefined) {
        value = {
          type: "If",
          If: annotationObject.$If
        };
      } else if (annotationObject.$And !== undefined) {
        value = {
          type: "And",
          And: annotationObject.$And
        };
      } else if (annotationObject.$Or !== undefined) {
        value = {
          type: "Or",
          Or: annotationObject.$Or
        };
      } else if (annotationObject.$Not !== undefined) {
        value = {
          type: "Not",
          Not: annotationObject.$Not
        };
      } else if (annotationObject.$Eq !== undefined) {
        value = {
          type: "Eq",
          Eq: annotationObject.$Eq
        };
      } else if (annotationObject.$Ne !== undefined) {
        value = {
          type: "Ne",
          Ne: annotationObject.$Ne
        };
      } else if (annotationObject.$Gt !== undefined) {
        value = {
          type: "Gt",
          Gt: annotationObject.$Gt
        };
      } else if (annotationObject.$Ge !== undefined) {
        value = {
          type: "Ge",
          Ge: annotationObject.$Ge
        };
      } else if (annotationObject.$Lt !== undefined) {
        value = {
          type: "Lt",
          Lt: annotationObject.$Lt
        };
      } else if (annotationObject.$Le !== undefined) {
        value = {
          type: "Le",
          Le: annotationObject.$Le
        };
      } else if (annotationObject.$Apply !== undefined) {
        value = {
          type: "Apply",
          Apply: annotationObject.$Apply,
          Function: annotationObject.$Function
        };
      } else if (annotationObject.$AnnotationPath !== undefined) {
        value = {
          type: "AnnotationPath",
          AnnotationPath: annotationObject.$AnnotationPath
        };
      } else if (annotationObject.$EnumMember !== undefined) {
        value = {
          type: "EnumMember",
          EnumMember: this.mapNameToAlias(annotationObject.$EnumMember.split("/")[0]) + "/" + annotationObject.$EnumMember.split("/")[1]
        };
      } else if (annotationObject.$Type) {
        value = {
          type: "Record",
          Record: this.parseAnnotationObject(annotationObject, currentTarget, annotationsLists, oCapabilities)
        };
      } else {
        value = {
          type: "Record",
          Record: this.parseAnnotationObject(annotationObject, currentTarget, annotationsLists, oCapabilities)
        };
      }

      return {
        name: propertyKey,
        value: value
      };
    },
    mapNameToAlias: function (annotationName) {
      var _annotationName$split = annotationName.split("@"),
          _annotationName$split2 = _slicedToArray(_annotationName$split, 2),
          pathPart = _annotationName$split2[0],
          annoPart = _annotationName$split2[1];

      if (!annoPart) {
        annoPart = pathPart;
        pathPart = "";
      } else {
        pathPart += "@";
      }

      var lastDot = annoPart.lastIndexOf(".");
      return pathPart + VOCABULARY_ALIAS[annoPart.substr(0, lastDot)] + "." + annoPart.substr(lastDot + 1);
    },
    parseAnnotationObject: function (annotationObject, currentObjectTarget, annotationsLists, oCapabilities) {
      var _this2 = this;

      var parsedAnnotationObject = {};

      if (annotationObject === null) {
        parsedAnnotationObject = {
          type: "Null",
          Null: null
        };
      } else if (typeof annotationObject === "string") {
        parsedAnnotationObject = {
          type: "String",
          String: annotationObject
        };
      } else if (typeof annotationObject === "boolean") {
        parsedAnnotationObject = {
          type: "Bool",
          Bool: annotationObject
        };
      } else if (typeof annotationObject === "number") {
        parsedAnnotationObject = {
          type: "Int",
          Int: annotationObject
        };
      } else if (annotationObject.$AnnotationPath !== undefined) {
        parsedAnnotationObject = {
          type: "AnnotationPath",
          AnnotationPath: annotationObject.$AnnotationPath
        };
      } else if (annotationObject.$Path !== undefined) {
        parsedAnnotationObject = {
          type: "Path",
          Path: annotationObject.$Path
        };
      } else if (annotationObject.$Decimal !== undefined) {
        parsedAnnotationObject = {
          type: "Decimal",
          Decimal: parseFloat(annotationObject.$Decimal)
        };
      } else if (annotationObject.$PropertyPath !== undefined) {
        parsedAnnotationObject = {
          type: "PropertyPath",
          PropertyPath: annotationObject.$PropertyPath
        };
      } else if (annotationObject.$If !== undefined) {
        parsedAnnotationObject = {
          type: "If",
          If: annotationObject.$If
        };
      } else if (annotationObject.$And !== undefined) {
        parsedAnnotationObject = {
          type: "And",
          And: annotationObject.$And
        };
      } else if (annotationObject.$Or !== undefined) {
        parsedAnnotationObject = {
          type: "Or",
          Or: annotationObject.$Or
        };
      } else if (annotationObject.$Not !== undefined) {
        parsedAnnotationObject = {
          type: "Not",
          Not: annotationObject.$Not
        };
      } else if (annotationObject.$Eq !== undefined) {
        parsedAnnotationObject = {
          type: "Eq",
          Eq: annotationObject.$Eq
        };
      } else if (annotationObject.$Ne !== undefined) {
        parsedAnnotationObject = {
          type: "Ne",
          Ne: annotationObject.$Ne
        };
      } else if (annotationObject.$Gt !== undefined) {
        parsedAnnotationObject = {
          type: "Gt",
          Gt: annotationObject.$Gt
        };
      } else if (annotationObject.$Ge !== undefined) {
        parsedAnnotationObject = {
          type: "Ge",
          Ge: annotationObject.$Ge
        };
      } else if (annotationObject.$Lt !== undefined) {
        parsedAnnotationObject = {
          type: "Lt",
          Lt: annotationObject.$Lt
        };
      } else if (annotationObject.$Le !== undefined) {
        parsedAnnotationObject = {
          type: "Le",
          Le: annotationObject.$Le
        };
      } else if (annotationObject.$Apply !== undefined) {
        parsedAnnotationObject = {
          type: "Apply",
          Apply: annotationObject.$Apply,
          Function: annotationObject.$Function
        };
      } else if (annotationObject.$NavigationPropertyPath !== undefined) {
        parsedAnnotationObject = {
          type: "NavigationPropertyPath",
          NavigationPropertyPath: annotationObject.$NavigationPropertyPath
        };
      } else if (annotationObject.$EnumMember !== undefined) {
        parsedAnnotationObject = {
          type: "EnumMember",
          EnumMember: this.mapNameToAlias(annotationObject.$EnumMember.split("/")[0]) + "/" + annotationObject.$EnumMember.split("/")[1]
        };
      } else if (Array.isArray(annotationObject)) {
        var parsedAnnotationCollection = parsedAnnotationObject;
        parsedAnnotationCollection.collection = annotationObject.map(function (subAnnotationObject, subAnnotationIndex) {
          return _this2.parseAnnotationObject(subAnnotationObject, currentObjectTarget + "/" + subAnnotationIndex, annotationsLists, oCapabilities);
        });

        if (annotationObject.length > 0) {
          if (annotationObject[0].hasOwnProperty("$PropertyPath")) {
            parsedAnnotationCollection.collection.type = "PropertyPath";
          } else if (annotationObject[0].hasOwnProperty("$Path")) {
            parsedAnnotationCollection.collection.type = "Path";
          } else if (annotationObject[0].hasOwnProperty("$NavigationPropertyPath")) {
            parsedAnnotationCollection.collection.type = "NavigationPropertyPath";
          } else if (annotationObject[0].hasOwnProperty("$AnnotationPath")) {
            parsedAnnotationCollection.collection.type = "AnnotationPath";
          } else if (annotationObject[0].hasOwnProperty("$Type")) {
            parsedAnnotationCollection.collection.type = "Record";
          } else if (annotationObject[0].hasOwnProperty("$If")) {
            parsedAnnotationCollection.collection.type = "If";
          } else if (annotationObject[0].hasOwnProperty("$And")) {
            parsedAnnotationCollection.collection.type = "And";
          } else if (annotationObject[0].hasOwnProperty("$Or")) {
            parsedAnnotationCollection.collection.type = "Or";
          } else if (annotationObject[0].hasOwnProperty("$Eq")) {
            parsedAnnotationCollection.collection.type = "Eq";
          } else if (annotationObject[0].hasOwnProperty("$Ne")) {
            parsedAnnotationCollection.collection.type = "Ne";
          } else if (annotationObject[0].hasOwnProperty("$Not")) {
            parsedAnnotationCollection.collection.type = "Not";
          } else if (annotationObject[0].hasOwnProperty("$Gt")) {
            parsedAnnotationCollection.collection.type = "Gt";
          } else if (annotationObject[0].hasOwnProperty("$Ge")) {
            parsedAnnotationCollection.collection.type = "Ge";
          } else if (annotationObject[0].hasOwnProperty("$Lt")) {
            parsedAnnotationCollection.collection.type = "Lt";
          } else if (annotationObject[0].hasOwnProperty("$Le")) {
            parsedAnnotationCollection.collection.type = "Le";
          } else if (annotationObject[0].hasOwnProperty("$Apply")) {
            parsedAnnotationCollection.collection.type = "Apply";
          } else if (typeof annotationObject[0] === "object") {
            parsedAnnotationCollection.collection.type = "Record";
          } else {
            parsedAnnotationCollection.collection.type = "String";
          }
        }
      } else {
        if (annotationObject.$Type) {
          var typeValue = annotationObject.$Type;
          parsedAnnotationObject.type = typeValue; //`${typeAlias}.${typeTerm}`;
        }

        var propertyValues = [];
        Object.keys(annotationObject).forEach(function (propertyKey) {
          if (propertyKey !== "$Type" && propertyKey !== "$If" && propertyKey !== "$Apply" && propertyKey !== "$And" && propertyKey !== "$Or" && propertyKey !== "$Ne" && propertyKey !== "$Gt" && propertyKey !== "$Ge" && propertyKey !== "$Lt" && propertyKey !== "$Le" && propertyKey !== "$Not" && propertyKey !== "$Eq" && !propertyKey.startsWith("@")) {
            propertyValues.push(_this2.parsePropertyValue(annotationObject[propertyKey], propertyKey, currentObjectTarget, annotationsLists, oCapabilities));
          } else if (propertyKey.startsWith("@")) {
            // Annotation of annotation
            _this2.createAnnotationLists(_defineProperty({}, propertyKey, annotationObject[propertyKey]), currentObjectTarget, annotationsLists, oCapabilities);
          }
        });
        parsedAnnotationObject.propertyValues = propertyValues;
      }

      return parsedAnnotationObject;
    },
    getOrCreateAnnotationList: function (target, annotationsLists) {
      var potentialTarget = annotationsLists.find(function (annotationList) {
        return annotationList.target === target;
      });

      if (!potentialTarget) {
        potentialTarget = {
          target: target,
          annotations: []
        };
        annotationsLists.push(potentialTarget);
      }

      return potentialTarget;
    },
    createAnnotationLists: function (annotationObjects, annotationTarget, annotationLists, oCapabilities) {
      var _this3 = this;

      var outAnnotationObject = this.getOrCreateAnnotationList(annotationTarget, annotationLists);

      if (!oCapabilities.MicroChart) {
        delete annotationObjects["@com.sap.vocabularies.UI.v1.Chart"];
      }

      function removeChartAnnotations(annotationObject) {
        return annotationObject.filter(function (oRecord) {
          if (oRecord.Target && oRecord.Target.$AnnotationPath) {
            return oRecord.Target.$AnnotationPath.indexOf("@com.sap.vocabularies.UI.v1.Chart") === -1;
          } else {
            return true;
          }
        });
      }

      function removeIBNAnnotations(annotationObject) {
        return annotationObject.filter(function (oRecord) {
          return oRecord.$Type !== "com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation";
        });
      }

      function handlePresentationVariant(annotationObject) {
        return annotationObject.filter(function (oRecord) {
          return oRecord.$AnnotationPath !== "@com.sap.vocabularies.UI.v1.Chart";
        });
      }

      Object.keys(annotationObjects).forEach(function (annotationKey) {
        var annotationObject = annotationObjects[annotationKey];

        switch (annotationKey) {
          case "@com.sap.vocabularies.UI.v1.HeaderFacets":
            if (!oCapabilities.MicroChart) {
              annotationObject = removeChartAnnotations(annotationObject);
            }

            break;

          case "@com.sap.vocabularies.UI.v1.Identification":
            if (!oCapabilities.IntentBasedNavigation) {
              annotationObject = removeIBNAnnotations(annotationObject);
            }

            break;

          case "@com.sap.vocabularies.UI.v1.LineItem":
            if (!oCapabilities.IntentBasedNavigation) {
              annotationObject = removeIBNAnnotations(annotationObject);
            }

            if (!oCapabilities.MicroChart) {
              annotationObject = removeChartAnnotations(annotationObject);
            }

            break;

          case "@com.sap.vocabularies.UI.v1.FieldGroup":
            if (!oCapabilities.IntentBasedNavigation) {
              annotationObject.Data = removeIBNAnnotations(annotationObject.Data);
            }

            if (!oCapabilities.MicroChart) {
              annotationObject.Data = removeChartAnnotations(annotationObject.Data);
            }

            break;

          case "@com.sap.vocabularies.UI.v1.PresentationVariant":
            if (!oCapabilities.Chart && annotationObject.Visualizations) {
              annotationObject.Visualizations = handlePresentationVariant(annotationObject.Visualizations);
            }

            break;

          default:
            break;
        }

        annotationObjects[annotationKey] = annotationObject;
        var currentOutAnnotationObject = outAnnotationObject; // Check for annotation of annotation

        var annotationOfAnnotationSplit = annotationKey.split("@");

        if (annotationOfAnnotationSplit.length > 2) {
          currentOutAnnotationObject = _this3.getOrCreateAnnotationList(annotationTarget + "@" + annotationOfAnnotationSplit[1], annotationLists);
          annotationKey = annotationOfAnnotationSplit[2];
        } else {
          annotationKey = annotationOfAnnotationSplit[1];
        }

        var annotationQualifierSplit = annotationKey.split("#");
        var qualifier = annotationQualifierSplit[1];
        annotationKey = annotationQualifierSplit[0];
        var parsedAnnotationObject = {
          term: "".concat(annotationKey),
          qualifier: qualifier
        };
        var currentAnnotationTarget = annotationTarget + "@" + parsedAnnotationObject.term;

        if (qualifier) {
          currentAnnotationTarget += "#" + qualifier;
        }

        var isCollection = false;

        if (annotationObject === null) {
          parsedAnnotationObject.value = {
            type: "Bool",
            Bool: annotationObject
          };
        } else if (typeof annotationObject === "string") {
          parsedAnnotationObject.value = {
            type: "String",
            String: annotationObject
          };
        } else if (typeof annotationObject === "boolean") {
          parsedAnnotationObject.value = {
            type: "Bool",
            Bool: annotationObject
          };
        } else if (typeof annotationObject === "number") {
          parsedAnnotationObject.value = {
            type: "Int",
            Int: annotationObject
          };
        } else if (annotationObject.$If !== undefined) {
          parsedAnnotationObject.value = {
            type: "If",
            If: annotationObject.$If
          };
        } else if (annotationObject.$And !== undefined) {
          parsedAnnotationObject.value = {
            type: "And",
            And: annotationObject.$And
          };
        } else if (annotationObject.$Or !== undefined) {
          parsedAnnotationObject.value = {
            type: "Or",
            Or: annotationObject.$Or
          };
        } else if (annotationObject.$Not !== undefined) {
          parsedAnnotationObject.value = {
            type: "Not",
            Not: annotationObject.$Not
          };
        } else if (annotationObject.$Eq !== undefined) {
          parsedAnnotationObject.value = {
            type: "Eq",
            Eq: annotationObject.$Eq
          };
        } else if (annotationObject.$Ne !== undefined) {
          parsedAnnotationObject.value = {
            type: "Ne",
            Ne: annotationObject.$Ne
          };
        } else if (annotationObject.$Gt !== undefined) {
          parsedAnnotationObject.value = {
            type: "Gt",
            Gt: annotationObject.$Gt
          };
        } else if (annotationObject.$Ge !== undefined) {
          parsedAnnotationObject.value = {
            type: "Ge",
            Ge: annotationObject.$Ge
          };
        } else if (annotationObject.$Lt !== undefined) {
          parsedAnnotationObject.value = {
            type: "Lt",
            Lt: annotationObject.$Lt
          };
        } else if (annotationObject.$Le !== undefined) {
          parsedAnnotationObject.value = {
            type: "Le",
            Le: annotationObject.$Le
          };
        } else if (annotationObject.$Apply !== undefined) {
          parsedAnnotationObject.value = {
            type: "Apply",
            Apply: annotationObject.$Apply,
            Function: annotationObject.$Function
          };
        } else if (annotationObject.$Path !== undefined) {
          parsedAnnotationObject.value = {
            type: "Path",
            Path: annotationObject.$Path
          };
        } else if (annotationObject.$AnnotationPath !== undefined) {
          parsedAnnotationObject.value = {
            type: "AnnotationPath",
            AnnotationPath: annotationObject.$AnnotationPath
          };
        } else if (annotationObject.$Decimal !== undefined) {
          parsedAnnotationObject.value = {
            type: "Decimal",
            Decimal: parseFloat(annotationObject.$Decimal)
          };
        } else if (annotationObject.$EnumMember !== undefined) {
          parsedAnnotationObject.value = {
            type: "EnumMember",
            EnumMember: _this3.mapNameToAlias(annotationObject.$EnumMember.split("/")[0]) + "/" + annotationObject.$EnumMember.split("/")[1]
          };
        } else if (Array.isArray(annotationObject)) {
          isCollection = true;
          parsedAnnotationObject.collection = annotationObject.map(function (subAnnotationObject, subAnnotationIndex) {
            return _this3.parseAnnotationObject(subAnnotationObject, currentAnnotationTarget + "/" + subAnnotationIndex, annotationLists, oCapabilities);
          });

          if (annotationObject.length > 0) {
            if (annotationObject[0].hasOwnProperty("$PropertyPath")) {
              parsedAnnotationObject.collection.type = "PropertyPath";
            } else if (annotationObject[0].hasOwnProperty("$Path")) {
              parsedAnnotationObject.collection.type = "Path";
            } else if (annotationObject[0].hasOwnProperty("$NavigationPropertyPath")) {
              parsedAnnotationObject.collection.type = "NavigationPropertyPath";
            } else if (annotationObject[0].hasOwnProperty("$AnnotationPath")) {
              parsedAnnotationObject.collection.type = "AnnotationPath";
            } else if (annotationObject[0].hasOwnProperty("$Type")) {
              parsedAnnotationObject.collection.type = "Record";
            } else if (annotationObject[0].hasOwnProperty("$If")) {
              parsedAnnotationObject.collection.type = "If";
            } else if (annotationObject[0].hasOwnProperty("$Or")) {
              parsedAnnotationObject.collection.type = "Or";
            } else if (annotationObject[0].hasOwnProperty("$Eq")) {
              parsedAnnotationObject.collection.type = "Eq";
            } else if (annotationObject[0].hasOwnProperty("$Ne")) {
              parsedAnnotationObject.collection.type = "Ne";
            } else if (annotationObject[0].hasOwnProperty("$Not")) {
              parsedAnnotationObject.collection.type = "Not";
            } else if (annotationObject[0].hasOwnProperty("$Gt")) {
              parsedAnnotationObject.collection.type = "Gt";
            } else if (annotationObject[0].hasOwnProperty("$Ge")) {
              parsedAnnotationObject.collection.type = "Ge";
            } else if (annotationObject[0].hasOwnProperty("$Lt")) {
              parsedAnnotationObject.collection.type = "Lt";
            } else if (annotationObject[0].hasOwnProperty("$Le")) {
              parsedAnnotationObject.collection.type = "Le";
            } else if (annotationObject[0].hasOwnProperty("$And")) {
              parsedAnnotationObject.collection.type = "And";
            } else if (annotationObject[0].hasOwnProperty("$Apply")) {
              parsedAnnotationObject.collection.type = "Apply";
            } else if (typeof annotationObject[0] === "object") {
              parsedAnnotationObject.collection.type = "Record";
            } else {
              parsedAnnotationObject.collection.type = "String";
            }
          }
        } else {
          var record = {
            propertyValues: []
          };

          if (annotationObject.$Type) {
            var typeValue = annotationObject.$Type;
            record.type = "".concat(typeValue);
          }

          var propertyValues = [];
          Object.keys(annotationObject).forEach(function (propertyKey) {
            if (propertyKey !== "$Type" && !propertyKey.startsWith("@")) {
              propertyValues.push(_this3.parsePropertyValue(annotationObject[propertyKey], propertyKey, currentAnnotationTarget, annotationLists, oCapabilities));
            } else if (propertyKey.startsWith("@")) {
              // Annotation of record
              _this3.createAnnotationLists(_defineProperty({}, propertyKey, annotationObject[propertyKey]), currentAnnotationTarget, annotationLists, oCapabilities);
            }
          });
          record.propertyValues = propertyValues;
          parsedAnnotationObject.record = record;
        }

        parsedAnnotationObject.isCollection = isCollection;
        currentOutAnnotationObject.annotations.push(parsedAnnotationObject);
      });
    },
    parseProperty: function (oMetaModel, entityTypeObject, propertyName, annotationLists, oCapabilities) {
      var propertyAnnotation = oMetaModel.getObject("/".concat(entityTypeObject.fullyQualifiedName, "/").concat(propertyName, "@"));
      var propertyDefinition = oMetaModel.getObject("/".concat(entityTypeObject.fullyQualifiedName, "/").concat(propertyName));
      var propertyObject = {
        _type: "Property",
        name: propertyName,
        fullyQualifiedName: "".concat(entityTypeObject.fullyQualifiedName, "/").concat(propertyName),
        type: propertyDefinition.$Type,
        maxLength: propertyDefinition.$MaxLength,
        precision: propertyDefinition.$Precision,
        scale: propertyDefinition.$Scale,
        nullable: propertyDefinition.$Nullable
      };
      this.createAnnotationLists(propertyAnnotation, propertyObject.fullyQualifiedName, annotationLists, oCapabilities);
      return propertyObject;
    },
    parseNavigationProperty: function (oMetaModel, entityTypeObject, navPropertyName, annotationLists, oCapabilities) {
      var navPropertyAnnotation = oMetaModel.getObject("/".concat(entityTypeObject.fullyQualifiedName, "/").concat(navPropertyName, "@"));
      var navPropertyDefinition = oMetaModel.getObject("/".concat(entityTypeObject.fullyQualifiedName, "/").concat(navPropertyName));
      var referentialConstraint = [];

      if (navPropertyDefinition.$ReferentialConstraint) {
        referentialConstraint = Object.keys(navPropertyDefinition.$ReferentialConstraint).map(function (sourcePropertyName) {
          return {
            sourceTypeName: entityTypeObject.name,
            sourceProperty: sourcePropertyName,
            targetTypeName: navPropertyDefinition.$Type,
            targetProperty: navPropertyDefinition.$ReferentialConstraint[sourcePropertyName]
          };
        });
      }

      var navigationProperty = {
        _type: "NavigationProperty",
        name: navPropertyName,
        fullyQualifiedName: "".concat(entityTypeObject.fullyQualifiedName, "/").concat(navPropertyName),
        partner: navPropertyDefinition.$Partner,
        isCollection: navPropertyDefinition.$isCollection ? navPropertyDefinition.$isCollection : false,
        containsTarget: navPropertyDefinition.$ContainsTarget,
        targetTypeName: navPropertyDefinition.$Type,
        referentialConstraint: referentialConstraint
      };
      this.createAnnotationLists(navPropertyAnnotation, navigationProperty.fullyQualifiedName, annotationLists, oCapabilities);
      return navigationProperty;
    },
    parseEntitySet: function (oMetaModel, entitySetName, annotationLists, entityContainerName, oCapabilities) {
      var entitySetDefinition = oMetaModel.getObject("/".concat(entitySetName));
      var entitySetAnnotation = oMetaModel.getObject("/".concat(entitySetName, "@"));
      var entitySetObject = {
        _type: "EntitySet",
        name: entitySetName,
        navigationPropertyBinding: {},
        entityTypeName: entitySetDefinition.$Type,
        fullyQualifiedName: "".concat(entityContainerName, "/").concat(entitySetName)
      };
      this.createAnnotationLists(entitySetAnnotation, entitySetObject.fullyQualifiedName, annotationLists, oCapabilities);
      return entitySetObject;
    },
    parseSingleton: function (oMetaModel, singletonName, annotationLists, entityContainerName, oCapabilities) {
      var singletonDefinition = oMetaModel.getObject("/".concat(singletonName));
      var singletonAnnotation = oMetaModel.getObject("/".concat(singletonName, "@"));
      var singletonObject = {
        _type: "Singleton",
        name: singletonName,
        navigationPropertyBinding: {},
        typeName: singletonDefinition.$Type,
        fullyQualifiedName: "".concat(entityContainerName, "/").concat(singletonName),
        nullable: true
      };
      this.createAnnotationLists(singletonAnnotation, singletonObject.fullyQualifiedName, annotationLists, oCapabilities);
      return singletonObject;
    },
    parseEntityType: function (oMetaModel, entityTypeName, annotationLists, namespace, oCapabilities) {
      var _this4 = this;

      var entityTypeAnnotation = oMetaModel.getObject("/".concat(entityTypeName, "@"));
      var entityTypeDefinition = oMetaModel.getObject("/".concat(entityTypeName));
      var entityKeys = getEntityKeys(entityTypeDefinition);

      function getEntityKeys(entityTypeDefinition) {
        if (!entityTypeDefinition.$Key && entityTypeDefinition.$BaseType) {
          return getEntityKeys(oMetaModel.getObject("/".concat(entityTypeDefinition.$BaseType)));
        }

        return entityTypeDefinition.$Key || []; //handling of entity types without key as well as basetype
      }

      var entityTypeObject = {
        _type: "EntityType",
        name: entityTypeName.replace(namespace + ".", ""),
        fullyQualifiedName: entityTypeName,
        keys: [],
        entityProperties: [],
        navigationProperties: []
      };
      this.createAnnotationLists(entityTypeAnnotation, entityTypeObject.fullyQualifiedName, annotationLists, oCapabilities);
      var entityProperties = Object.keys(entityTypeDefinition).filter(function (propertyNameOrNot) {
        if (propertyNameOrNot != "$Key" && propertyNameOrNot != "$kind") {
          return entityTypeDefinition[propertyNameOrNot].$kind === "Property";
        }
      }).map(function (propertyName) {
        return _this4.parseProperty(oMetaModel, entityTypeObject, propertyName, annotationLists, oCapabilities);
      });
      var navigationProperties = Object.keys(entityTypeDefinition).filter(function (propertyNameOrNot) {
        if (propertyNameOrNot != "$Key" && propertyNameOrNot != "$kind") {
          return entityTypeDefinition[propertyNameOrNot].$kind === "NavigationProperty";
        }
      }).map(function (navPropertyName) {
        return _this4.parseNavigationProperty(oMetaModel, entityTypeObject, navPropertyName, annotationLists, oCapabilities);
      });
      entityTypeObject.keys = entityKeys.map(function (entityKey) {
        return entityProperties.find(function (property) {
          return property.name === entityKey;
        });
      }).filter(function (property) {
        return property !== undefined;
      });
      entityTypeObject.entityProperties = entityProperties;
      entityTypeObject.navigationProperties = navigationProperties;
      return entityTypeObject;
    },
    parseComplexType: function (oMetaModel, complexTypeName, annotationLists, namespace, oCapabilities) {
      var _this5 = this;

      var complexTypeAnnotation = oMetaModel.getObject("/".concat(complexTypeName, "@"));
      var complexTypeDefinition = oMetaModel.getObject("/".concat(complexTypeName));
      var complexTypeObject = {
        _type: "ComplexType",
        name: complexTypeName.replace(namespace + ".", ""),
        fullyQualifiedName: complexTypeName,
        properties: [],
        navigationProperties: []
      };
      this.createAnnotationLists(complexTypeAnnotation, complexTypeObject.fullyQualifiedName, annotationLists, oCapabilities);
      var complexTypeProperties = Object.keys(complexTypeDefinition).filter(function (propertyNameOrNot) {
        if (propertyNameOrNot != "$Key" && propertyNameOrNot != "$kind") {
          return complexTypeDefinition[propertyNameOrNot].$kind === "Property";
        }
      }).map(function (propertyName) {
        return _this5.parseProperty(oMetaModel, complexTypeObject, propertyName, annotationLists, oCapabilities);
      });
      complexTypeObject.properties = complexTypeProperties;
      var complexTypeNavigationProperties = Object.keys(complexTypeDefinition).filter(function (propertyNameOrNot) {
        if (propertyNameOrNot != "$Key" && propertyNameOrNot != "$kind") {
          return complexTypeDefinition[propertyNameOrNot].$kind === "NavigationProperty";
        }
      }).map(function (navPropertyName) {
        return _this5.parseNavigationProperty(oMetaModel, complexTypeObject, navPropertyName, annotationLists, oCapabilities);
      });
      complexTypeObject.navigationProperties = complexTypeNavigationProperties;
      return complexTypeObject;
    },
    parseAction: function (actionName, actionRawData, namespace, entityContainerName) {
      var actionEntityType = "";
      var actionFQN = "".concat(actionName);
      var actionShortName = actionName.substr(namespace.length + 1);

      if (actionRawData.$IsBound) {
        var bindingParameter = actionRawData.$Parameter[0];
        actionEntityType = bindingParameter.$Type;

        if (bindingParameter.$isCollection === true) {
          actionFQN = "".concat(actionName, "(Collection(").concat(actionEntityType, "))");
        } else {
          actionFQN = "".concat(actionName, "(").concat(actionEntityType, ")");
        }
      } else {
        actionFQN = "".concat(entityContainerName, "/").concat(actionShortName);
      }

      var parameters = actionRawData.$Parameter || [];
      return {
        _type: "Action",
        name: actionShortName,
        fullyQualifiedName: actionFQN,
        isBound: actionRawData.$IsBound,
        sourceType: actionEntityType,
        returnType: actionRawData.$ReturnType ? actionRawData.$ReturnType.$Type : "",
        parameters: parameters.map(function (param) {
          return {
            _type: "ActionParameter",
            isEntitySet: param.$Type === actionRawData.$EntitySetPath,
            fullyQualifiedName: "".concat(actionFQN, "/").concat(param.$Name),
            type: param.$Type // TODO missing properties ?

          };
        })
      };
    },
    parseEntityTypes: function (oMetaModel, oInCapabilities) {
      var _this6 = this;

      var oCapabilities;

      if (!oInCapabilities) {
        oCapabilities = DefaultEnvironmentCapabilities;
      } else {
        oCapabilities = oInCapabilities;
      }

      var oMetaModelData = oMetaModel.getObject("/$");
      var oEntitySets = oMetaModel.getObject("/");
      var annotationLists = [];
      var entityTypes = [];
      var entitySets = [];
      var singletons = [];
      var complexTypes = [];
      var entityContainerName = oMetaModelData.$EntityContainer;
      var namespace = "";
      var schemaKeys = Object.keys(oMetaModelData).filter(function (metamodelKey) {
        return oMetaModelData[metamodelKey].$kind === "Schema";
      });

      if (schemaKeys && schemaKeys.length > 0) {
        namespace = schemaKeys[0].substr(0, schemaKeys[0].length - 1);
      } else if (entityTypes && entityTypes.length) {
        namespace = entityTypes[0].fullyQualifiedName.replace(entityTypes[0].name, "");
        namespace = namespace.substr(0, namespace.length - 1);
      }

      Object.keys(oMetaModelData).filter(function (entityTypeName) {
        return entityTypeName !== "$kind" && oMetaModelData[entityTypeName].$kind === "EntityType";
      }).forEach(function (entityTypeName) {
        var entityType = _this6.parseEntityType(oMetaModel, entityTypeName, annotationLists, namespace, oCapabilities);

        entityType.entityProperties.forEach(function (entityProperty) {
          if (!oMetaModelData.$Annotations[entityProperty.fullyQualifiedName]) {
            oMetaModelData.$Annotations[entityProperty.fullyQualifiedName] = {};
          }

          if (!oMetaModelData.$Annotations[entityProperty.fullyQualifiedName]["@com.sap.vocabularies.UI.v1.DataFieldDefault"]) {
            oMetaModelData.$Annotations[entityProperty.fullyQualifiedName]["@com.sap.vocabularies.UI.v1.DataFieldDefault"] = {
              $Type: "com.sap.vocabularies.UI.v1.DataField",
              Value: {
                $Path: entityProperty.name
              }
            };

            _this6.createAnnotationLists({
              "@com.sap.vocabularies.UI.v1.DataFieldDefault": oMetaModelData.$Annotations[entityProperty.fullyQualifiedName]["@com.sap.vocabularies.UI.v1.DataFieldDefault"]
            }, entityProperty.fullyQualifiedName, annotationLists, oCapabilities);
          }
        });
        entityTypes.push(entityType);
      });
      Object.keys(oEntitySets).filter(function (entitySetName) {
        return entitySetName !== "$kind" && oEntitySets[entitySetName].$kind === "EntitySet";
      }).forEach(function (entitySetName) {
        var entitySet = _this6.parseEntitySet(oMetaModel, entitySetName, annotationLists, entityContainerName, oCapabilities);

        entitySets.push(entitySet);
      });
      Object.keys(oEntitySets).filter(function (singletonName) {
        return singletonName !== "$kind" && oEntitySets[singletonName].$kind === "Singleton";
      }).forEach(function (singletonName) {
        var singleton = _this6.parseSingleton(oMetaModel, singletonName, annotationLists, entityContainerName, oCapabilities);

        singletons.push(singleton);
      });
      Object.keys(oMetaModelData).filter(function (complexTypeName) {
        return complexTypeName !== "$kind" && oMetaModelData[complexTypeName].$kind === "ComplexType";
      }).forEach(function (complexTypeName) {
        var complexType = _this6.parseComplexType(oMetaModel, complexTypeName, annotationLists, namespace, oCapabilities);

        complexTypes.push(complexType);
      });
      var oEntityContainerName = Object.keys(oMetaModelData).find(function (entityContainerName) {
        return entityContainerName !== "$kind" && oMetaModelData[entityContainerName].$kind === "EntityContainer";
      });
      var entityContainer = {};

      if (oEntityContainerName) {
        entityContainer = {
          name: oEntityContainerName.replace(namespace + ".", ""),
          fullyQualifiedName: oEntityContainerName
        };
      }

      entitySets.forEach(function (entitySet) {
        var navPropertyBindings = oMetaModelData[entityContainerName][entitySet.name].$NavigationPropertyBinding;

        if (navPropertyBindings) {
          Object.keys(navPropertyBindings).forEach(function (navPropName) {
            var targetEntitySet = entitySets.find(function (entitySetName) {
              return entitySetName.name === navPropertyBindings[navPropName];
            });

            if (targetEntitySet) {
              entitySet.navigationPropertyBinding[navPropName] = targetEntitySet;
            }
          });
        }
      });
      var actions = Object.keys(oMetaModelData).filter(function (key) {
        return Array.isArray(oMetaModelData[key]) && oMetaModelData[key].length > 0 && oMetaModelData[key][0].$kind === "Action";
      }).reduce(function (outActions, actionName) {
        var actions = oMetaModelData[actionName];
        actions.forEach(function (action) {
          outActions.push(_this6.parseAction(actionName, action, namespace, entityContainerName));
        });
        return outActions;
      }, []); // FIXME Crappy code to deal with annotations for functions

      var annotations = oMetaModelData.$Annotations;
      var actionAnnotations = Object.keys(annotations).filter(function (target) {
        return target.indexOf("(") !== -1;
      });
      actionAnnotations.forEach(function (target) {
        _this6.createAnnotationLists(oMetaModelData.$Annotations[target], target, annotationLists, oCapabilities);
      });
      var actionsNameWithoutOverload = actions.map(function (action) {
        return action.fullyQualifiedName.split("(")[0];
      });
      actionsNameWithoutOverload.forEach(function (actionName) {
        if (annotations.hasOwnProperty(actionName)) {
          _this6.createAnnotationLists(oMetaModelData.$Annotations[actionName], actionName, annotationLists, oCapabilities);
        }
      });
      var entityContainerAnnotations = annotations[entityContainerName]; // Retrieve Entity Container annotations

      if (entityContainerAnnotations) {
        this.createAnnotationLists(entityContainerAnnotations, entityContainerName, annotationLists, oCapabilities);
      } // Sort by target length


      annotationLists = annotationLists.sort(function (a, b) {
        return a.target.length >= b.target.length ? 1 : -1;
      });
      var references = [];
      return {
        identification: "metamodelResult",
        version: "4.0",
        schema: {
          entityContainer: entityContainer,
          entitySets: entitySets,
          entityTypes: entityTypes,
          complexTypes: complexTypes,
          singletons: singletons,
          associations: [],
          actions: actions,
          namespace: namespace,
          annotations: {
            "metamodelResult": annotationLists
          }
        },
        references: references
      };
    }
  };
  var mMetaModelMap = {};
  /**
   * Convert the ODataMetaModel into another format that allow for easy manipulation of the annotations.
   *
   * @param {ODataMetaModel} oMetaModel The current oDataMetaModel
   * @param oCapabilities The current capabilities
   * @returns {ConverterOutput} An object containing object like annotation
   */

  function convertTypes(oMetaModel, oCapabilities) {
    var sMetaModelId = oMetaModel.id;

    if (!mMetaModelMap.hasOwnProperty(sMetaModelId)) {
      var parsedOutput = MetaModelConverter.parseEntityTypes(oMetaModel, oCapabilities);
      mMetaModelMap[sMetaModelId] = AnnotationConverter.convertTypes(parsedOutput);
    }

    return mMetaModelMap[sMetaModelId];
  }

  _exports.convertTypes = convertTypes;

  function deleteModelCacheData(oMetaModel) {
    delete mMetaModelMap[oMetaModel.id];
  }

  _exports.deleteModelCacheData = deleteModelCacheData;

  function convertMetaModelContext(oMetaModelContext) {
    var bIncludeVisitedObjects = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var oConverterOutput = convertTypes(oMetaModelContext.getModel());
    var sPath = oMetaModelContext.getPath();
    var aPathSplit = sPath.split("/");
    var targetEntitySet = oConverterOutput.entitySets.find(function (entitySet) {
      return entitySet.name === aPathSplit[1];
    });
    var relativePath = aPathSplit.slice(2).join("/");
    var localObjects = [targetEntitySet];

    while (relativePath && relativePath.length > 0 && relativePath.startsWith("$NavigationPropertyBinding")) {
      var _sNavPropToCheck;

      var relativeSplit = relativePath.split("/");
      var idx = 0;
      var currentEntitySet = void 0,
          sNavPropToCheck = void 0;
      relativeSplit = relativeSplit.slice(1); // Removing "$NavigationPropertyBinding"

      while (!currentEntitySet && relativeSplit.length > idx && relativeSplit[idx] !== "$NavigationPropertyBinding") {
        // Finding the correct entitySet for the navigaiton property binding example: "Set/_SalesOrder"
        sNavPropToCheck = relativeSplit.slice(0, idx + 1).join("/");
        currentEntitySet = targetEntitySet && targetEntitySet.navigationPropertyBinding[sNavPropToCheck];
        idx++;
      }

      if (!currentEntitySet) {
        // Fall back to Single nav prop if entitySet is not found.
        sNavPropToCheck = relativeSplit[0];
      }

      var aNavProps = ((_sNavPropToCheck = sNavPropToCheck) === null || _sNavPropToCheck === void 0 ? void 0 : _sNavPropToCheck.split("/")) || [];
      var targetEntityType = targetEntitySet && targetEntitySet.entityType;

      var _iterator = _createForOfIteratorHelper(aNavProps),
          _step;

      try {
        var _loop = function () {
          var sNavProp = _step.value;
          // Pushing all nav props to the visited objects. example: "Set", "_SalesOrder" for "Set/_SalesOrder"(in NavigationPropertyBinding)
          var targetNavProp = targetEntityType && targetEntityType.navigationProperties.find(function (navProp) {
            return navProp.name === sNavProp;
          });

          if (targetNavProp) {
            localObjects.push(targetNavProp);
            targetEntityType = targetNavProp.targetType;
          } else {
            return "break";
          }
        };

        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var _ret = _loop();

          if (_ret === "break") break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      targetEntitySet = targetEntitySet && currentEntitySet || targetEntitySet && targetEntitySet.navigationPropertyBinding[relativeSplit[0]];

      if (targetEntitySet) {
        // Pushing the target entitySet to visited objects
        localObjects.push(targetEntitySet);
      } // Re-calculating the relative path


      relativePath = relativeSplit.slice(aNavProps.length || 1).join("/");
    }

    if (relativePath.startsWith("$Type")) {
      // We're anyway going to look on the entityType...
      relativePath = aPathSplit.slice(3).join("/");
    }

    if (targetEntitySet && relativePath.length) {
      var oTarget = targetEntitySet.entityType.resolvePath(relativePath, bIncludeVisitedObjects);

      if (oTarget) {
        if (bIncludeVisitedObjects) {
          oTarget.visitedObjects = localObjects.concat(oTarget.visitedObjects);
        }
      } else if (targetEntitySet.entityType && targetEntitySet.entityType.actions) {
        // if target is an action or an action parameter
        var actions = targetEntitySet.entityType && targetEntitySet.entityType.actions;

        var _relativeSplit = relativePath.split("/");

        if (actions[_relativeSplit[0]]) {
          var action = actions[_relativeSplit[0]];

          if (_relativeSplit[1] && action.parameters) {
            var parameterName = _relativeSplit[1];
            var targetParameter = action.parameters.find(function (parameter) {
              return parameter.fullyQualifiedName.endsWith("/" + parameterName);
            });
            return targetParameter;
          } else if (relativePath.length === 1) {
            return action;
          }
        }
      }

      return oTarget;
    } else {
      if (bIncludeVisitedObjects) {
        return {
          target: targetEntitySet,
          visitedObjects: localObjects
        };
      }

      return targetEntitySet;
    }
  }

  _exports.convertMetaModelContext = convertMetaModelContext;

  function getInvolvedDataModelObjects(oMetaModelContext, oEntitySetMetaModelContext) {
    var metaModelContext = convertMetaModelContext(oMetaModelContext, true);
    var targetEntitySetLocation;

    if (oEntitySetMetaModelContext && oEntitySetMetaModelContext.getPath() !== "/") {
      targetEntitySetLocation = getInvolvedDataModelObjects(oEntitySetMetaModelContext);
    }

    return getInvolvedDataModelObjectFromPath(metaModelContext, targetEntitySetLocation);
  }

  _exports.getInvolvedDataModelObjects = getInvolvedDataModelObjects;

  function getInvolvedDataModelObjectFromPath(metaModelContext, targetEntitySetLocation) {
    var dataModelObjects = metaModelContext.visitedObjects.filter(function (visitedObject) {
      return visitedObject && visitedObject.hasOwnProperty("_type") && visitedObject._type !== "EntityType";
    });

    if (metaModelContext.target && metaModelContext.target.hasOwnProperty("_type") && metaModelContext.target._type !== "EntityType") {
      dataModelObjects.push(metaModelContext.target);
    }

    var navigationProperties = [];
    var rootEntitySet = dataModelObjects[0]; // currentEntitySet can be undefined.

    var currentEntitySet = rootEntitySet;
    var currentEntityType = rootEntitySet.entityType;
    var i = 1;
    var currentObject;
    var navigatedPaths = [];

    while (i < dataModelObjects.length) {
      currentObject = dataModelObjects[i++];

      if (currentObject._type === "NavigationProperty") {
        navigatedPaths.push(currentObject.name);
        navigationProperties.push(currentObject);
        currentEntityType = currentObject.targetType;

        if (currentEntitySet && currentEntitySet.navigationPropertyBinding.hasOwnProperty(navigatedPaths.join("/"))) {
          currentEntitySet = currentEntitySet.navigationPropertyBinding[currentObject.name];
          navigatedPaths = [];
        } else {
          currentEntitySet = undefined;
        }
      }

      if (currentObject._type === "EntitySet") {
        currentEntitySet = currentObject;
        currentEntityType = currentEntitySet.entityType;
      }
    }

    if (targetEntitySetLocation && targetEntitySetLocation.startingEntitySet !== rootEntitySet) {
      // In case the entityset is not starting from the same location it may mean that we are doing too much work earlier for some reason
      // As such we need to redefine the context source for the targetEntitySetLocation
      var startingIndex = dataModelObjects.indexOf(targetEntitySetLocation.startingEntitySet);

      if (startingIndex !== -1) {
        // If it's not found I don't know what we can do (probably nothing)
        var requiredDataModelObjects = dataModelObjects.slice(0, startingIndex);
        targetEntitySetLocation.startingEntitySet = rootEntitySet;
        targetEntitySetLocation.navigationProperties = requiredDataModelObjects.filter(function (object) {
          return object._type === "NavigationProperty";
        }).concat(targetEntitySetLocation.navigationProperties);
      }
    }

    var outDataModelPath = {
      startingEntitySet: rootEntitySet,
      targetEntitySet: currentEntitySet,
      targetEntityType: currentEntityType,
      targetObject: metaModelContext.target,
      navigationProperties: navigationProperties,
      contextLocation: targetEntitySetLocation
    };

    if (!outDataModelPath.contextLocation) {
      outDataModelPath.contextLocation = outDataModelPath;
    }

    return outDataModelPath;
  }

  _exports.getInvolvedDataModelObjectFromPath = getInvolvedDataModelObjectFromPath;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1ldGFNb2RlbENvbnZlcnRlci50cyJdLCJuYW1lcyI6WyJWT0NBQlVMQVJZX0FMSUFTIiwiRGVmYXVsdEVudmlyb25tZW50Q2FwYWJpbGl0aWVzIiwiQ2hhcnQiLCJNaWNyb0NoYXJ0IiwiVVNoZWxsIiwiSW50ZW50QmFzZWROYXZpZ2F0aW9uIiwiTWV0YU1vZGVsQ29udmVydGVyIiwicGFyc2VQcm9wZXJ0eVZhbHVlIiwiYW5ub3RhdGlvbk9iamVjdCIsInByb3BlcnR5S2V5IiwiY3VycmVudFRhcmdldCIsImFubm90YXRpb25zTGlzdHMiLCJvQ2FwYWJpbGl0aWVzIiwidmFsdWUiLCJjdXJyZW50UHJvcGVydHlUYXJnZXQiLCJ0eXBlIiwiTnVsbCIsIlN0cmluZyIsIkJvb2wiLCJJbnQiLCJBcnJheSIsImlzQXJyYXkiLCJDb2xsZWN0aW9uIiwibWFwIiwic3ViQW5ub3RhdGlvbk9iamVjdCIsInN1YkFubm90YXRpb25PYmplY3RJbmRleCIsInBhcnNlQW5ub3RhdGlvbk9iamVjdCIsImxlbmd0aCIsImhhc093blByb3BlcnR5IiwiJFBhdGgiLCJ1bmRlZmluZWQiLCJQYXRoIiwiJERlY2ltYWwiLCJEZWNpbWFsIiwicGFyc2VGbG9hdCIsIiRQcm9wZXJ0eVBhdGgiLCJQcm9wZXJ0eVBhdGgiLCIkTmF2aWdhdGlvblByb3BlcnR5UGF0aCIsIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGgiLCIkSWYiLCJJZiIsIiRBbmQiLCJBbmQiLCIkT3IiLCJPciIsIiROb3QiLCJOb3QiLCIkRXEiLCJFcSIsIiROZSIsIk5lIiwiJEd0IiwiR3QiLCIkR2UiLCJHZSIsIiRMdCIsIkx0IiwiJExlIiwiTGUiLCIkQXBwbHkiLCJBcHBseSIsIkZ1bmN0aW9uIiwiJEZ1bmN0aW9uIiwiJEFubm90YXRpb25QYXRoIiwiQW5ub3RhdGlvblBhdGgiLCIkRW51bU1lbWJlciIsIkVudW1NZW1iZXIiLCJtYXBOYW1lVG9BbGlhcyIsInNwbGl0IiwiJFR5cGUiLCJSZWNvcmQiLCJuYW1lIiwiYW5ub3RhdGlvbk5hbWUiLCJwYXRoUGFydCIsImFubm9QYXJ0IiwibGFzdERvdCIsImxhc3RJbmRleE9mIiwic3Vic3RyIiwiY3VycmVudE9iamVjdFRhcmdldCIsInBhcnNlZEFubm90YXRpb25PYmplY3QiLCJwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbiIsImNvbGxlY3Rpb24iLCJzdWJBbm5vdGF0aW9uSW5kZXgiLCJ0eXBlVmFsdWUiLCJwcm9wZXJ0eVZhbHVlcyIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwic3RhcnRzV2l0aCIsInB1c2giLCJjcmVhdGVBbm5vdGF0aW9uTGlzdHMiLCJnZXRPckNyZWF0ZUFubm90YXRpb25MaXN0IiwidGFyZ2V0IiwicG90ZW50aWFsVGFyZ2V0IiwiZmluZCIsImFubm90YXRpb25MaXN0IiwiYW5ub3RhdGlvbnMiLCJhbm5vdGF0aW9uT2JqZWN0cyIsImFubm90YXRpb25UYXJnZXQiLCJhbm5vdGF0aW9uTGlzdHMiLCJvdXRBbm5vdGF0aW9uT2JqZWN0IiwicmVtb3ZlQ2hhcnRBbm5vdGF0aW9ucyIsImZpbHRlciIsIm9SZWNvcmQiLCJUYXJnZXQiLCJpbmRleE9mIiwicmVtb3ZlSUJOQW5ub3RhdGlvbnMiLCJoYW5kbGVQcmVzZW50YXRpb25WYXJpYW50IiwiYW5ub3RhdGlvbktleSIsIkRhdGEiLCJWaXN1YWxpemF0aW9ucyIsImN1cnJlbnRPdXRBbm5vdGF0aW9uT2JqZWN0IiwiYW5ub3RhdGlvbk9mQW5ub3RhdGlvblNwbGl0IiwiYW5ub3RhdGlvblF1YWxpZmllclNwbGl0IiwicXVhbGlmaWVyIiwidGVybSIsImN1cnJlbnRBbm5vdGF0aW9uVGFyZ2V0IiwiaXNDb2xsZWN0aW9uIiwicmVjb3JkIiwicGFyc2VQcm9wZXJ0eSIsIm9NZXRhTW9kZWwiLCJlbnRpdHlUeXBlT2JqZWN0IiwicHJvcGVydHlOYW1lIiwicHJvcGVydHlBbm5vdGF0aW9uIiwiZ2V0T2JqZWN0IiwiZnVsbHlRdWFsaWZpZWROYW1lIiwicHJvcGVydHlEZWZpbml0aW9uIiwicHJvcGVydHlPYmplY3QiLCJfdHlwZSIsIm1heExlbmd0aCIsIiRNYXhMZW5ndGgiLCJwcmVjaXNpb24iLCIkUHJlY2lzaW9uIiwic2NhbGUiLCIkU2NhbGUiLCJudWxsYWJsZSIsIiROdWxsYWJsZSIsInBhcnNlTmF2aWdhdGlvblByb3BlcnR5IiwibmF2UHJvcGVydHlOYW1lIiwibmF2UHJvcGVydHlBbm5vdGF0aW9uIiwibmF2UHJvcGVydHlEZWZpbml0aW9uIiwicmVmZXJlbnRpYWxDb25zdHJhaW50IiwiJFJlZmVyZW50aWFsQ29uc3RyYWludCIsInNvdXJjZVByb3BlcnR5TmFtZSIsInNvdXJjZVR5cGVOYW1lIiwic291cmNlUHJvcGVydHkiLCJ0YXJnZXRUeXBlTmFtZSIsInRhcmdldFByb3BlcnR5IiwibmF2aWdhdGlvblByb3BlcnR5IiwicGFydG5lciIsIiRQYXJ0bmVyIiwiJGlzQ29sbGVjdGlvbiIsImNvbnRhaW5zVGFyZ2V0IiwiJENvbnRhaW5zVGFyZ2V0IiwicGFyc2VFbnRpdHlTZXQiLCJlbnRpdHlTZXROYW1lIiwiZW50aXR5Q29udGFpbmVyTmFtZSIsImVudGl0eVNldERlZmluaXRpb24iLCJlbnRpdHlTZXRBbm5vdGF0aW9uIiwiZW50aXR5U2V0T2JqZWN0IiwibmF2aWdhdGlvblByb3BlcnR5QmluZGluZyIsImVudGl0eVR5cGVOYW1lIiwicGFyc2VTaW5nbGV0b24iLCJzaW5nbGV0b25OYW1lIiwic2luZ2xldG9uRGVmaW5pdGlvbiIsInNpbmdsZXRvbkFubm90YXRpb24iLCJzaW5nbGV0b25PYmplY3QiLCJ0eXBlTmFtZSIsInBhcnNlRW50aXR5VHlwZSIsIm5hbWVzcGFjZSIsImVudGl0eVR5cGVBbm5vdGF0aW9uIiwiZW50aXR5VHlwZURlZmluaXRpb24iLCJlbnRpdHlLZXlzIiwiZ2V0RW50aXR5S2V5cyIsIiRLZXkiLCIkQmFzZVR5cGUiLCJyZXBsYWNlIiwiZW50aXR5UHJvcGVydGllcyIsIm5hdmlnYXRpb25Qcm9wZXJ0aWVzIiwicHJvcGVydHlOYW1lT3JOb3QiLCIka2luZCIsImVudGl0eUtleSIsInByb3BlcnR5IiwicGFyc2VDb21wbGV4VHlwZSIsImNvbXBsZXhUeXBlTmFtZSIsImNvbXBsZXhUeXBlQW5ub3RhdGlvbiIsImNvbXBsZXhUeXBlRGVmaW5pdGlvbiIsImNvbXBsZXhUeXBlT2JqZWN0IiwicHJvcGVydGllcyIsImNvbXBsZXhUeXBlUHJvcGVydGllcyIsImNvbXBsZXhUeXBlTmF2aWdhdGlvblByb3BlcnRpZXMiLCJwYXJzZUFjdGlvbiIsImFjdGlvbk5hbWUiLCJhY3Rpb25SYXdEYXRhIiwiYWN0aW9uRW50aXR5VHlwZSIsImFjdGlvbkZRTiIsImFjdGlvblNob3J0TmFtZSIsIiRJc0JvdW5kIiwiYmluZGluZ1BhcmFtZXRlciIsIiRQYXJhbWV0ZXIiLCJwYXJhbWV0ZXJzIiwiaXNCb3VuZCIsInNvdXJjZVR5cGUiLCJyZXR1cm5UeXBlIiwiJFJldHVyblR5cGUiLCJwYXJhbSIsImlzRW50aXR5U2V0IiwiJEVudGl0eVNldFBhdGgiLCIkTmFtZSIsInBhcnNlRW50aXR5VHlwZXMiLCJvSW5DYXBhYmlsaXRpZXMiLCJvTWV0YU1vZGVsRGF0YSIsIm9FbnRpdHlTZXRzIiwiZW50aXR5VHlwZXMiLCJlbnRpdHlTZXRzIiwic2luZ2xldG9ucyIsImNvbXBsZXhUeXBlcyIsIiRFbnRpdHlDb250YWluZXIiLCJzY2hlbWFLZXlzIiwibWV0YW1vZGVsS2V5IiwiZW50aXR5VHlwZSIsImVudGl0eVByb3BlcnR5IiwiJEFubm90YXRpb25zIiwiVmFsdWUiLCJlbnRpdHlTZXQiLCJzaW5nbGV0b24iLCJjb21wbGV4VHlwZSIsIm9FbnRpdHlDb250YWluZXJOYW1lIiwiZW50aXR5Q29udGFpbmVyIiwibmF2UHJvcGVydHlCaW5kaW5ncyIsIiROYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nIiwibmF2UHJvcE5hbWUiLCJ0YXJnZXRFbnRpdHlTZXQiLCJhY3Rpb25zIiwia2V5IiwicmVkdWNlIiwib3V0QWN0aW9ucyIsImFjdGlvbiIsImFjdGlvbkFubm90YXRpb25zIiwiYWN0aW9uc05hbWVXaXRob3V0T3ZlcmxvYWQiLCJlbnRpdHlDb250YWluZXJBbm5vdGF0aW9ucyIsInNvcnQiLCJhIiwiYiIsInJlZmVyZW5jZXMiLCJpZGVudGlmaWNhdGlvbiIsInZlcnNpb24iLCJzY2hlbWEiLCJhc3NvY2lhdGlvbnMiLCJtTWV0YU1vZGVsTWFwIiwiY29udmVydFR5cGVzIiwic01ldGFNb2RlbElkIiwiaWQiLCJwYXJzZWRPdXRwdXQiLCJBbm5vdGF0aW9uQ29udmVydGVyIiwiZGVsZXRlTW9kZWxDYWNoZURhdGEiLCJjb252ZXJ0TWV0YU1vZGVsQ29udGV4dCIsIm9NZXRhTW9kZWxDb250ZXh0IiwiYkluY2x1ZGVWaXNpdGVkT2JqZWN0cyIsIm9Db252ZXJ0ZXJPdXRwdXQiLCJnZXRNb2RlbCIsInNQYXRoIiwiZ2V0UGF0aCIsImFQYXRoU3BsaXQiLCJyZWxhdGl2ZVBhdGgiLCJzbGljZSIsImpvaW4iLCJsb2NhbE9iamVjdHMiLCJyZWxhdGl2ZVNwbGl0IiwiaWR4IiwiY3VycmVudEVudGl0eVNldCIsInNOYXZQcm9wVG9DaGVjayIsImFOYXZQcm9wcyIsInRhcmdldEVudGl0eVR5cGUiLCJzTmF2UHJvcCIsInRhcmdldE5hdlByb3AiLCJuYXZQcm9wIiwidGFyZ2V0VHlwZSIsIm9UYXJnZXQiLCJyZXNvbHZlUGF0aCIsInZpc2l0ZWRPYmplY3RzIiwiY29uY2F0IiwicGFyYW1ldGVyTmFtZSIsInRhcmdldFBhcmFtZXRlciIsInBhcmFtZXRlciIsImVuZHNXaXRoIiwiZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzIiwib0VudGl0eVNldE1ldGFNb2RlbENvbnRleHQiLCJtZXRhTW9kZWxDb250ZXh0IiwidGFyZ2V0RW50aXR5U2V0TG9jYXRpb24iLCJnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdEZyb21QYXRoIiwiZGF0YU1vZGVsT2JqZWN0cyIsInZpc2l0ZWRPYmplY3QiLCJyb290RW50aXR5U2V0IiwiY3VycmVudEVudGl0eVR5cGUiLCJpIiwiY3VycmVudE9iamVjdCIsIm5hdmlnYXRlZFBhdGhzIiwic3RhcnRpbmdFbnRpdHlTZXQiLCJzdGFydGluZ0luZGV4IiwicmVxdWlyZWREYXRhTW9kZWxPYmplY3RzIiwib2JqZWN0Iiwib3V0RGF0YU1vZGVsUGF0aCIsInRhcmdldE9iamVjdCIsImNvbnRleHRMb2NhdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXlCQSxNQUFNQSxnQkFBcUIsR0FBRztBQUM3QixpQ0FBNkIsY0FEQTtBQUU3Qix5QkFBcUIsTUFGUTtBQUc3Qiw2QkFBeUIsVUFISTtBQUk3QixzQ0FBa0MsUUFKTDtBQUs3QixrQ0FBOEIsSUFMRDtBQU03Qix1Q0FBbUMsU0FOTjtBQU83Qix5Q0FBcUMsV0FQUjtBQVE3Qiw0Q0FBd0MsY0FSWDtBQVM3Qiw2Q0FBeUM7QUFUWixHQUE5QjtBQW1CTyxNQUFNQyw4QkFBOEIsR0FBRztBQUM3Q0MsSUFBQUEsS0FBSyxFQUFFLElBRHNDO0FBRTdDQyxJQUFBQSxVQUFVLEVBQUUsSUFGaUM7QUFHN0NDLElBQUFBLE1BQU0sRUFBRSxJQUhxQztBQUk3Q0MsSUFBQUEscUJBQXFCLEVBQUU7QUFKc0IsR0FBdkM7O0FBeUJQLE1BQU1DLGtCQUFrQixHQUFHO0FBQzFCQyxJQUFBQSxrQkFEMEIsWUFFekJDLGdCQUZ5QixFQUd6QkMsV0FIeUIsRUFJekJDLGFBSnlCLEVBS3pCQyxnQkFMeUIsRUFNekJDLGFBTnlCLEVBT25CO0FBQUE7O0FBQ04sVUFBSUMsS0FBSjtBQUNBLFVBQU1DLHFCQUE2QixHQUFHSixhQUFhLEdBQUcsR0FBaEIsR0FBc0JELFdBQTVEOztBQUNBLFVBQUlELGdCQUFnQixLQUFLLElBQXpCLEVBQStCO0FBQzlCSyxRQUFBQSxLQUFLLEdBQUc7QUFBRUUsVUFBQUEsSUFBSSxFQUFFLE1BQVI7QUFBZ0JDLFVBQUFBLElBQUksRUFBRTtBQUF0QixTQUFSO0FBQ0EsT0FGRCxNQUVPLElBQUksT0FBT1IsZ0JBQVAsS0FBNEIsUUFBaEMsRUFBMEM7QUFDaERL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QSxJQUFJUCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9Cb0IsY0FBcEIsQ0FBbUMsS0FBbkMsQ0FBSixFQUErQztBQUNwRGYsWUFBQUEsS0FBSyxDQUFDUyxVQUFQLENBQTBCUCxJQUExQixHQUFpQyxJQUFqQztBQUNBLFdBRk0sTUFFQSxJQUFJUCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9Cb0IsY0FBcEIsQ0FBbUMsS0FBbkMsQ0FBSixFQUErQztBQUNwRGYsWUFBQUEsS0FBSyxDQUFDUyxVQUFQLENBQTBCUCxJQUExQixHQUFpQyxJQUFqQztBQUNBLFdBRk0sTUFFQSxJQUFJUCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9Cb0IsY0FBcEIsQ0FBbUMsTUFBbkMsQ0FBSixFQUFnRDtBQUNyRGYsWUFBQUEsS0FBSyxDQUFDUyxVQUFQLENBQTBCUCxJQUExQixHQUFpQyxLQUFqQztBQUNBLFdBRk0sTUFFQSxJQUFJUCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9Cb0IsY0FBcEIsQ0FBbUMsS0FBbkMsQ0FBSixFQUErQztBQUNwRGYsWUFBQUEsS0FBSyxDQUFDUyxVQUFQLENBQTBCUCxJQUExQixHQUFpQyxJQUFqQztBQUNBLFdBRk0sTUFFQSxJQUFJUCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9Cb0IsY0FBcEIsQ0FBbUMsS0FBbkMsQ0FBSixFQUErQztBQUNwRGYsWUFBQUEsS0FBSyxDQUFDUyxVQUFQLENBQTBCUCxJQUExQixHQUFpQyxJQUFqQztBQUNBLFdBRk0sTUFFQSxJQUFJUCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9Cb0IsY0FBcEIsQ0FBbUMsS0FBbkMsQ0FBSixFQUErQztBQUNwRGYsWUFBQUEsS0FBSyxDQUFDUyxVQUFQLENBQTBCUCxJQUExQixHQUFpQyxJQUFqQztBQUNBLFdBRk0sTUFFQSxJQUFJUCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9Cb0IsY0FBcEIsQ0FBbUMsS0FBbkMsQ0FBSixFQUErQztBQUNwRGYsWUFBQUEsS0FBSyxDQUFD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dCI6WyJpbXBvcnQgeyBBbm5vdGF0aW9uLCBBbm5vdGF0aW9uTGlzdCwgQW5ub3RhdGlvblJlY29yZCwgRXhwcmVzc2lvbiwgUGFyc2VyT3V0cHV0IH0gZnJvbSBcIkBzYXAtdXgvdm9jYWJ1bGFyaWVzLXR5cGVzXCI7XG4vLyBUaGlzIGZpbGUgaXMgcmV0cmlldmVkIGZyb20gQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlciwgc2hhcmVkIGNvZGUgd2l0aCB0b29sIHN1aXRlXG5pbXBvcnQgeyBBbm5vdGF0aW9uQ29udmVydGVyIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvY29tbW9uXCI7XG5pbXBvcnQgeyBPRGF0YU1ldGFNb2RlbCB9IGZyb20gXCJzYXAvdWkvbW9kZWwvb2RhdGEvdjRcIjtcbmltcG9ydCB7XG5cdENvbnZlcnRlck91dHB1dCxcblx0RW50aXR5U2V0IGFzIF9FbnRpdHlTZXQsXG5cdEVudGl0eVR5cGUgYXMgX0VudGl0eVR5cGUsXG5cdE5hdmlnYXRpb25Qcm9wZXJ0eSBhcyBfTmF2aWdhdGlvblByb3BlcnR5XG59IGZyb20gXCJAc2FwLXV4L2Fubm90YXRpb24tY29udmVydGVyXCI7XG5pbXBvcnQge1xuXHRFbnRpdHlUeXBlLFxuXHRFbnRpdHlTZXQsXG5cdFByb3BlcnR5LFxuXHRDb21wbGV4VHlwZSxcblx0UmVmZXJlbnRpYWxDb25zdHJhaW50LFxuXHRWNE5hdmlnYXRpb25Qcm9wZXJ0eSxcblx0QWN0aW9uLFxuXHRSZWZlcmVuY2UsXG5cdEVudGl0eUNvbnRhaW5lcixcblx0U2luZ2xldG9uXG59IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy9kaXN0L1BhcnNlclwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJzYXAvdWkvbW9kZWxcIjtcbmltcG9ydCB7IERhdGFNb2RlbE9iamVjdFBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EYXRhTW9kZWxQYXRoSGVscGVyXCI7XG5cbmNvbnN0IFZPQ0FCVUxBUllfQUxJQVM6IGFueSA9IHtcblx0XCJPcmcuT0RhdGEuQ2FwYWJpbGl0aWVzLlYxXCI6IFwiQ2FwYWJpbGl0aWVzXCIsXG5cdFwiT3JnLk9EYXRhLkNvcmUuVjFcIjogXCJDb3JlXCIsXG5cdFwiT3JnLk9EYXRhLk1lYXN1cmVzLlYxXCI6IFwiTWVhc3VyZXNcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tb24udjFcIjogXCJDb21tb25cIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MVwiOiBcIlVJXCIsXG5cdFwiY29tLnNhcC52b2NhYnVsYXJpZXMuU2Vzc2lvbi52MVwiOiBcIlNlc3Npb25cIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5BbmFseXRpY3MudjFcIjogXCJBbmFseXRpY3NcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5QZXJzb25hbERhdGEudjFcIjogXCJQZXJzb25hbERhdGFcIixcblx0XCJjb20uc2FwLnZvY2FidWxhcmllcy5Db21tdW5pY2F0aW9uLnYxXCI6IFwiQ29tbXVuaWNhdGlvblwiXG59O1xuXG5leHBvcnQgdHlwZSBFbnZpcm9ubWVudENhcGFiaWxpdGllcyA9IHtcblx0Q2hhcnQ6IGJvb2xlYW47XG5cdE1pY3JvQ2hhcnQ6IGJvb2xlYW47XG5cdFVTaGVsbDogYm9vbGVhbjtcblx0SW50ZW50QmFzZWROYXZpZ2F0aW9uOiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHRFbnZpcm9ubWVudENhcGFiaWxpdGllcyA9IHtcblx0Q2hhcnQ6IHRydWUsXG5cdE1pY3JvQ2hhcnQ6IHRydWUsXG5cdFVTaGVsbDogdHJ1ZSxcblx0SW50ZW50QmFzZWROYXZpZ2F0aW9uOiB0cnVlXG59O1xuXG50eXBlIE1ldGFNb2RlbEFjdGlvbiA9IHtcblx0JGtpbmQ6IFwiQWN0aW9uXCI7XG5cdCRJc0JvdW5kOiBib29sZWFuO1xuXHQkRW50aXR5U2V0UGF0aDogc3RyaW5nO1xuXHQkUGFyYW1ldGVyOiB7XG5cdFx0JFR5cGU6IHN0cmluZztcblx0XHQkTmFtZTogc3RyaW5nO1xuXHRcdCROdWxsYWJsZT86IGJvb2xlYW47XG5cdFx0JE1heExlbmd0aD86IG51bWJlcjtcblx0XHQkUHJlY2lzaW9uPzogbnVtYmVyO1xuXHRcdCRTY2FsZT86IG51bWJlcjtcblx0XHQkaXNDb2xsZWN0aW9uPzogYm9vbGVhbjtcblx0fVtdO1xuXHQkUmV0dXJuVHlwZToge1xuXHRcdCRUeXBlOiBzdHJpbmc7XG5cdH07XG59O1xuXG5jb25zdCBNZXRhTW9kZWxDb252ZXJ0ZXIgPSB7XG5cdHBhcnNlUHJvcGVydHlWYWx1ZShcblx0XHRhbm5vdGF0aW9uT2JqZWN0OiBhbnksXG5cdFx0cHJvcGVydHlLZXk6IHN0cmluZyxcblx0XHRjdXJyZW50VGFyZ2V0OiBzdHJpbmcsXG5cdFx0YW5ub3RhdGlvbnNMaXN0czogYW55W10sXG5cdFx0b0NhcGFiaWxpdGllczogRW52aXJvbm1lbnRDYXBhYmlsaXRpZXNcblx0KTogYW55IHtcblx0XHRsZXQgdmFsdWU7XG5cdFx0Y29uc3QgY3VycmVudFByb3BlcnR5VGFyZ2V0OiBzdHJpbmcgPSBjdXJyZW50VGFyZ2V0ICsgXCIvXCIgKyBwcm9wZXJ0eUtleTtcblx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdCA9PT0gbnVsbCkge1xuXHRcdFx0dmFsdWUgPSB7IHR5cGU6IFwiTnVsbFwiLCBOdWxsOiBudWxsIH07XG5cdFx0fSBlbHNlIGlmICh0eXBlb2YgYW5ub3RhdGlvbk9iamVjdCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0dmFsdWUgPSB7IHR5cGU6IFwiU3RyaW5nXCIsIFN0cmluZzogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGFubm90YXRpb25PYmplY3QgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJCb29sXCIsIEJvb2w6IGFubm90YXRpb25PYmplY3QgfTtcblx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhbm5vdGF0aW9uT2JqZWN0ID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJJbnRcIiwgSW50OiBhbm5vdGF0aW9uT2JqZWN0IH07XG5cdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFubm90YXRpb25PYmplY3QpKSB7XG5cdFx0XHR2YWx1ZSA9IHtcblx0XHRcdFx0dHlwZTogXCJDb2xsZWN0aW9uXCIsXG5cdFx0XHRcdENvbGxlY3Rpb246IGFubm90YXRpb25PYmplY3QubWFwKChzdWJBbm5vdGF0aW9uT2JqZWN0LCBzdWJBbm5vdGF0aW9uT2JqZWN0SW5kZXgpID0+XG5cdFx0XHRcdFx0dGhpcy5wYXJzZUFubm90YXRpb25PYmplY3QoXG5cdFx0XHRcdFx0XHRzdWJBbm5vdGF0aW9uT2JqZWN0LFxuXHRcdFx0XHRcdFx0Y3VycmVudFByb3BlcnR5VGFyZ2V0ICsgXCIvXCIgKyBzdWJBbm5vdGF0aW9uT2JqZWN0SW5kZXgsXG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uc0xpc3RzLFxuXHRcdFx0XHRcdFx0b0NhcGFiaWxpdGllc1xuXHRcdFx0XHRcdClcblx0XHRcdFx0KVxuXHRcdFx0fTtcblx0XHRcdGlmIChhbm5vdGF0aW9uT2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0aWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkUHJvcGVydHlQYXRoXCIpKSB7XG5cdFx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJQcm9wZXJ0eVBhdGhcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJFBhdGhcIikpIHtcblx0XHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIlBhdGhcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIikpIHtcblx0XHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEFubm90YXRpb25QYXRoXCIpKSB7XG5cdFx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJBbm5vdGF0aW9uUGF0aFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkVHlwZVwiKSkge1xuXHRcdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiUmVjb3JkXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRJZlwiKSkge1xuXHRcdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiSWZcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJE9yXCIpKSB7XG5cdFx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJPclwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkQW5kXCIpKSB7XG5cdFx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJBbmRcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEVxXCIpKSB7XG5cdFx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJFcVwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTmVcIikpIHtcblx0XHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5lXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiROb3RcIikpIHtcblx0XHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5vdFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkR3RcIikpIHtcblx0XHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkd0XCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRHZVwiKSkge1xuXHRcdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiR2VcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEx0XCIpKSB7XG5cdFx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJMdFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTGVcIikpIHtcblx0XHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkxlXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRBcHBseVwiKSkge1xuXHRcdFx0XHRcdCh2YWx1ZS5Db2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiQXBwbHlcIjtcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYW5ub3RhdGlvbk9iamVjdFswXSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdC8vICRUeXBlIGlzIG9wdGlvbmFsLi4uXG5cdFx0XHRcdFx0KHZhbHVlLkNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJSZWNvcmRcIjtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQodmFsdWUuQ29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIlN0cmluZ1wiO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRQYXRoICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHZhbHVlID0geyB0eXBlOiBcIlBhdGhcIiwgUGF0aDogYW5ub3RhdGlvbk9iamVjdC4kUGF0aCB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kRGVjaW1hbCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJEZWNpbWFsXCIsIERlY2ltYWw6IHBhcnNlRmxvYXQoYW5ub3RhdGlvbk9iamVjdC4kRGVjaW1hbCkgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFByb3BlcnR5UGF0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJQcm9wZXJ0eVBhdGhcIiwgUHJvcGVydHlQYXRoOiBhbm5vdGF0aW9uT2JqZWN0LiRQcm9wZXJ0eVBhdGggfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFsdWUgPSB7XG5cdFx0XHRcdHR5cGU6IFwiTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiLFxuXHRcdFx0XHROYXZpZ2F0aW9uUHJvcGVydHlQYXRoOiBhbm5vdGF0aW9uT2JqZWN0LiROYXZpZ2F0aW9uUHJvcGVydHlQYXRoXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kSWYgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFsdWUgPSB7IHR5cGU6IFwiSWZcIiwgSWY6IGFubm90YXRpb25PYmplY3QuJElmIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRBbmQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFsdWUgPSB7IHR5cGU6IFwiQW5kXCIsIEFuZDogYW5ub3RhdGlvbk9iamVjdC4kQW5kIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRPciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJPclwiLCBPcjogYW5ub3RhdGlvbk9iamVjdC4kT3IgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE5vdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJOb3RcIiwgTm90OiBhbm5vdGF0aW9uT2JqZWN0LiROb3QgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEVxICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHZhbHVlID0geyB0eXBlOiBcIkVxXCIsIEVxOiBhbm5vdGF0aW9uT2JqZWN0LiRFcSB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kTmUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFsdWUgPSB7IHR5cGU6IFwiTmVcIiwgTmU6IGFubm90YXRpb25PYmplY3QuJE5lIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRHdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJHdFwiLCBHdDogYW5ub3RhdGlvbk9iamVjdC4kR3QgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEdlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHZhbHVlID0geyB0eXBlOiBcIkdlXCIsIEdlOiBhbm5vdGF0aW9uT2JqZWN0LiRHZSB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kTHQgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFsdWUgPSB7IHR5cGU6IFwiTHRcIiwgTHQ6IGFubm90YXRpb25PYmplY3QuJEx0IH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRMZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJMZVwiLCBMZTogYW5ub3RhdGlvbk9iamVjdC4kTGUgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEFwcGx5ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHZhbHVlID0geyB0eXBlOiBcIkFwcGx5XCIsIEFwcGx5OiBhbm5vdGF0aW9uT2JqZWN0LiRBcHBseSwgRnVuY3Rpb246IGFubm90YXRpb25PYmplY3QuJEZ1bmN0aW9uIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRBbm5vdGF0aW9uUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR2YWx1ZSA9IHsgdHlwZTogXCJBbm5vdGF0aW9uUGF0aFwiLCBBbm5vdGF0aW9uUGF0aDogYW5ub3RhdGlvbk9iamVjdC4kQW5ub3RhdGlvblBhdGggfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEVudW1NZW1iZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0dmFsdWUgPSB7XG5cdFx0XHRcdHR5cGU6IFwiRW51bU1lbWJlclwiLFxuXHRcdFx0XHRFbnVtTWVtYmVyOlxuXHRcdFx0XHRcdHRoaXMubWFwTmFtZVRvQWxpYXMoYW5ub3RhdGlvbk9iamVjdC4kRW51bU1lbWJlci5zcGxpdChcIi9cIilbMF0pICsgXCIvXCIgKyBhbm5vdGF0aW9uT2JqZWN0LiRFbnVtTWVtYmVyLnNwbGl0KFwiL1wiKVsxXVxuXHRcdFx0fTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFR5cGUpIHtcblx0XHRcdHZhbHVlID0ge1xuXHRcdFx0XHR0eXBlOiBcIlJlY29yZFwiLFxuXHRcdFx0XHRSZWNvcmQ6IHRoaXMucGFyc2VBbm5vdGF0aW9uT2JqZWN0KGFubm90YXRpb25PYmplY3QsIGN1cnJlbnRUYXJnZXQsIGFubm90YXRpb25zTGlzdHMsIG9DYXBhYmlsaXRpZXMpXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YWx1ZSA9IHtcblx0XHRcdFx0dHlwZTogXCJSZWNvcmRcIixcblx0XHRcdFx0UmVjb3JkOiB0aGlzLnBhcnNlQW5ub3RhdGlvbk9iamVjdChhbm5vdGF0aW9uT2JqZWN0LCBjdXJyZW50VGFyZ2V0LCBhbm5vdGF0aW9uc0xpc3RzLCBvQ2FwYWJpbGl0aWVzKVxuXHRcdFx0fTtcblx0XHR9XG5cblx0XHRyZXR1cm4ge1xuXHRcdFx0bmFtZTogcHJvcGVydHlLZXksXG5cdFx0XHR2YWx1ZVxuXHRcdH07XG5cdH0sXG5cdG1hcE5hbWVUb0FsaWFzKGFubm90YXRpb25OYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuXHRcdGxldCBbcGF0aFBhcnQsIGFubm9QYXJ0XSA9IGFubm90YXRpb25OYW1lLnNwbGl0KFwiQFwiKTtcblx0XHRpZiAoIWFubm9QYXJ0KSB7XG5cdFx0XHRhbm5vUGFydCA9IHBhdGhQYXJ0O1xuXHRcdFx0cGF0aFBhcnQgPSBcIlwiO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRwYXRoUGFydCArPSBcIkBcIjtcblx0XHR9XG5cdFx0Y29uc3QgbGFzdERvdCA9IGFubm9QYXJ0Lmxhc3RJbmRleE9mKFwiLlwiKTtcblx0XHRyZXR1cm4gcGF0aFBhcnQgKyBWT0NBQlVMQVJZX0FMSUFTW2Fubm9QYXJ0LnN1YnN0cigwLCBsYXN0RG90KV0gKyBcIi5cIiArIGFubm9QYXJ0LnN1YnN0cihsYXN0RG90ICsgMSk7XG5cdH0sXG5cdHBhcnNlQW5ub3RhdGlvbk9iamVjdChcblx0XHRhbm5vdGF0aW9uT2JqZWN0OiBhbnksXG5cdFx0Y3VycmVudE9iamVjdFRhcmdldDogc3RyaW5nLFxuXHRcdGFubm90YXRpb25zTGlzdHM6IGFueVtdLFxuXHRcdG9DYXBhYmlsaXRpZXM6IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzXG5cdCk6IEV4cHJlc3Npb24gfCBBbm5vdGF0aW9uUmVjb3JkIHwgQW5ub3RhdGlvbiB7XG5cdFx0bGV0IHBhcnNlZEFubm90YXRpb25PYmplY3Q6IGFueSA9IHt9O1xuXHRcdGlmIChhbm5vdGF0aW9uT2JqZWN0ID09PSBudWxsKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIk51bGxcIiwgTnVsbDogbnVsbCB9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGFubm90YXRpb25PYmplY3QgPT09IFwic3RyaW5nXCIpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiU3RyaW5nXCIsIFN0cmluZzogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGFubm90YXRpb25PYmplY3QgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIkJvb2xcIiwgQm9vbDogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIGFubm90YXRpb25PYmplY3QgPT09IFwibnVtYmVyXCIpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiSW50XCIsIEludDogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kQW5ub3RhdGlvblBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJBbm5vdGF0aW9uUGF0aFwiLCBBbm5vdGF0aW9uUGF0aDogYW5ub3RhdGlvbk9iamVjdC4kQW5ub3RhdGlvblBhdGggfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJQYXRoXCIsIFBhdGg6IGFubm90YXRpb25PYmplY3QuJFBhdGggfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJERlY2ltYWwgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJEZWNpbWFsXCIsIERlY2ltYWw6IHBhcnNlRmxvYXQoYW5ub3RhdGlvbk9iamVjdC4kRGVjaW1hbCkgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFByb3BlcnR5UGF0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIlByb3BlcnR5UGF0aFwiLCBQcm9wZXJ0eVBhdGg6IGFubm90YXRpb25PYmplY3QuJFByb3BlcnR5UGF0aCB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kSWYgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJJZlwiLCBJZjogYW5ub3RhdGlvbk9iamVjdC4kSWYgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEFuZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIkFuZFwiLCBBbmQ6IGFubm90YXRpb25PYmplY3QuJEFuZCB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kT3IgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJPclwiLCBPcjogYW5ub3RhdGlvbk9iamVjdC4kT3IgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE5vdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIk5vdFwiLCBOb3Q6IGFubm90YXRpb25PYmplY3QuJE5vdCB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kRXEgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJFcVwiLCBFcTogYW5ub3RhdGlvbk9iamVjdC4kRXEgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE5lICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiTmVcIiwgTmU6IGFubm90YXRpb25PYmplY3QuJE5lIH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRHdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIkd0XCIsIEd0OiBhbm5vdGF0aW9uT2JqZWN0LiRHdCB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kR2UgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJHZVwiLCBHZTogYW5ub3RhdGlvbk9iamVjdC4kR2UgfTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEx0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QgPSB7IHR5cGU6IFwiTHRcIiwgTHQ6IGFubm90YXRpb25PYmplY3QuJEx0IH07XG5cdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRMZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0geyB0eXBlOiBcIkxlXCIsIExlOiBhbm5vdGF0aW9uT2JqZWN0LiRMZSB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kQXBwbHkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHsgdHlwZTogXCJBcHBseVwiLCBBcHBseTogYW5ub3RhdGlvbk9iamVjdC4kQXBwbHksIEZ1bmN0aW9uOiBhbm5vdGF0aW9uT2JqZWN0LiRGdW5jdGlvbiB9O1xuXHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kTmF2aWdhdGlvblByb3BlcnR5UGF0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0ID0ge1xuXHRcdFx0XHR0eXBlOiBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIixcblx0XHRcdFx0TmF2aWdhdGlvblByb3BlcnR5UGF0aDogYW5ub3RhdGlvbk9iamVjdC4kTmF2aWdhdGlvblByb3BlcnR5UGF0aFxuXHRcdFx0fTtcblx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEVudW1NZW1iZXIgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdCA9IHtcblx0XHRcdFx0dHlwZTogXCJFbnVtTWVtYmVyXCIsXG5cdFx0XHRcdEVudW1NZW1iZXI6XG5cdFx0XHRcdFx0dGhpcy5tYXBOYW1lVG9BbGlhcyhhbm5vdGF0aW9uT2JqZWN0LiRFbnVtTWVtYmVyLnNwbGl0KFwiL1wiKVswXSkgKyBcIi9cIiArIGFubm90YXRpb25PYmplY3QuJEVudW1NZW1iZXIuc3BsaXQoXCIvXCIpWzFdXG5cdFx0XHR9O1xuXHRcdH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShhbm5vdGF0aW9uT2JqZWN0KSkge1xuXHRcdFx0Y29uc3QgcGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24gPSBwYXJzZWRBbm5vdGF0aW9uT2JqZWN0IGFzIGFueTtcblx0XHRcdHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gPSBhbm5vdGF0aW9uT2JqZWN0Lm1hcCgoc3ViQW5ub3RhdGlvbk9iamVjdCwgc3ViQW5ub3RhdGlvbkluZGV4KSA9PlxuXHRcdFx0XHR0aGlzLnBhcnNlQW5ub3RhdGlvbk9iamVjdChcblx0XHRcdFx0XHRzdWJBbm5vdGF0aW9uT2JqZWN0LFxuXHRcdFx0XHRcdGN1cnJlbnRPYmplY3RUYXJnZXQgKyBcIi9cIiArIHN1YkFubm90YXRpb25JbmRleCxcblx0XHRcdFx0XHRhbm5vdGF0aW9uc0xpc3RzLFxuXHRcdFx0XHRcdG9DYXBhYmlsaXRpZXNcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHRcdGlmIChhbm5vdGF0aW9uT2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0aWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkUHJvcGVydHlQYXRoXCIpKSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJQcm9wZXJ0eVBhdGhcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJFBhdGhcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIlBhdGhcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJE5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEFubm90YXRpb25QYXRoXCIpKSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJBbm5vdGF0aW9uUGF0aFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkVHlwZVwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiUmVjb3JkXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRJZlwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiSWZcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEFuZFwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiQW5kXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRPclwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiT3JcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEVxXCIpKSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJFcVwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTmVcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5lXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiROb3RcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5vdFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkR3RcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkd0XCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRHZVwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiR2VcIjtcblx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEx0XCIpKSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJMdFwiO1xuXHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTGVcIikpIHtcblx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbkNvbGxlY3Rpb24uY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkxlXCI7XG5cdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRBcHBseVwiKSkge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiQXBwbHlcIjtcblx0XHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYW5ub3RhdGlvbk9iamVjdFswXSA9PT0gXCJvYmplY3RcIikge1xuXHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uQ29sbGVjdGlvbi5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiUmVjb3JkXCI7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25Db2xsZWN0aW9uLmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJTdHJpbmdcIjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdC4kVHlwZSkge1xuXHRcdFx0XHRjb25zdCB0eXBlVmFsdWUgPSBhbm5vdGF0aW9uT2JqZWN0LiRUeXBlO1xuXHRcdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnR5cGUgPSB0eXBlVmFsdWU7IC8vYCR7dHlwZUFsaWFzfS4ke3R5cGVUZXJtfWA7XG5cdFx0XHR9XG5cdFx0XHRjb25zdCBwcm9wZXJ0eVZhbHVlczogYW55ID0gW107XG5cdFx0XHRPYmplY3Qua2V5cyhhbm5vdGF0aW9uT2JqZWN0KS5mb3JFYWNoKHByb3BlcnR5S2V5ID0+IHtcblx0XHRcdFx0aWYgKFxuXHRcdFx0XHRcdHByb3BlcnR5S2V5ICE9PSBcIiRUeXBlXCIgJiZcblx0XHRcdFx0XHRwcm9wZXJ0eUtleSAhPT0gXCIkSWZcIiAmJlxuXHRcdFx0XHRcdHByb3BlcnR5S2V5ICE9PSBcIiRBcHBseVwiICYmXG5cdFx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJEFuZFwiICYmXG5cdFx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJE9yXCIgJiZcblx0XHRcdFx0XHRwcm9wZXJ0eUtleSAhPT0gXCIkTmVcIiAmJlxuXHRcdFx0XHRcdHByb3BlcnR5S2V5ICE9PSBcIiRHdFwiICYmXG5cdFx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJEdlXCIgJiZcblx0XHRcdFx0XHRwcm9wZXJ0eUtleSAhPT0gXCIkTHRcIiAmJlxuXHRcdFx0XHRcdHByb3BlcnR5S2V5ICE9PSBcIiRMZVwiICYmXG5cdFx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJE5vdFwiICYmXG5cdFx0XHRcdFx0cHJvcGVydHlLZXkgIT09IFwiJEVxXCIgJiZcblx0XHRcdFx0XHQhcHJvcGVydHlLZXkuc3RhcnRzV2l0aChcIkBcIilcblx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0cHJvcGVydHlWYWx1ZXMucHVzaChcblx0XHRcdFx0XHRcdHRoaXMucGFyc2VQcm9wZXJ0eVZhbHVlKFxuXHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uT2JqZWN0W3Byb3BlcnR5S2V5XSxcblx0XHRcdFx0XHRcdFx0cHJvcGVydHlLZXksXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRPYmplY3RUYXJnZXQsXG5cdFx0XHRcdFx0XHRcdGFubm90YXRpb25zTGlzdHMsXG5cdFx0XHRcdFx0XHRcdG9DYXBhYmlsaXRpZXNcblx0XHRcdFx0XHRcdClcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5S2V5LnN0YXJ0c1dpdGgoXCJAXCIpKSB7XG5cdFx0XHRcdFx0Ly8gQW5ub3RhdGlvbiBvZiBhbm5vdGF0aW9uXG5cdFx0XHRcdFx0dGhpcy5jcmVhdGVBbm5vdGF0aW9uTGlzdHMoXG5cdFx0XHRcdFx0XHR7IFtwcm9wZXJ0eUtleV06IGFubm90YXRpb25PYmplY3RbcHJvcGVydHlLZXldIH0sXG5cdFx0XHRcdFx0XHRjdXJyZW50T2JqZWN0VGFyZ2V0LFxuXHRcdFx0XHRcdFx0YW5ub3RhdGlvbnNMaXN0cyxcblx0XHRcdFx0XHRcdG9DYXBhYmlsaXRpZXNcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QucHJvcGVydHlWYWx1ZXMgPSBwcm9wZXJ0eVZhbHVlcztcblx0XHR9XG5cdFx0cmV0dXJuIHBhcnNlZEFubm90YXRpb25PYmplY3Q7XG5cdH0sXG5cdGdldE9yQ3JlYXRlQW5ub3RhdGlvbkxpc3QodGFyZ2V0OiBzdHJpbmcsIGFubm90YXRpb25zTGlzdHM6IEFubm90YXRpb25MaXN0W10pOiBBbm5vdGF0aW9uTGlzdCB7XG5cdFx0bGV0IHBvdGVudGlhbFRhcmdldCA9IGFubm90YXRpb25zTGlzdHMuZmluZChhbm5vdGF0aW9uTGlzdCA9PiBhbm5vdGF0aW9uTGlzdC50YXJnZXQgPT09IHRhcmdldCk7XG5cdFx0aWYgKCFwb3RlbnRpYWxUYXJnZXQpIHtcblx0XHRcdHBvdGVudGlhbFRhcmdldCA9IHtcblx0XHRcdFx0dGFyZ2V0OiB0YXJnZXQsXG5cdFx0XHRcdGFubm90YXRpb25zOiBbXVxuXHRcdFx0fTtcblx0XHRcdGFubm90YXRpb25zTGlzdHMucHVzaChwb3RlbnRpYWxUYXJnZXQpO1xuXHRcdH1cblx0XHRyZXR1cm4gcG90ZW50aWFsVGFyZ2V0O1xuXHR9LFxuXG5cdGNyZWF0ZUFubm90YXRpb25MaXN0cyhcblx0XHRhbm5vdGF0aW9uT2JqZWN0czogYW55LFxuXHRcdGFubm90YXRpb25UYXJnZXQ6IHN0cmluZyxcblx0XHRhbm5vdGF0aW9uTGlzdHM6IGFueVtdLFxuXHRcdG9DYXBhYmlsaXRpZXM6IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzXG5cdCkge1xuXHRcdGNvbnN0IG91dEFubm90YXRpb25PYmplY3QgPSB0aGlzLmdldE9yQ3JlYXRlQW5ub3RhdGlvbkxpc3QoYW5ub3RhdGlvblRhcmdldCwgYW5ub3RhdGlvbkxpc3RzKTtcblx0XHRpZiAoIW9DYXBhYmlsaXRpZXMuTWljcm9DaGFydCkge1xuXHRcdFx0ZGVsZXRlIGFubm90YXRpb25PYmplY3RzW1wiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNoYXJ0XCJdO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIHJlbW92ZUNoYXJ0QW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdDogYW55KSB7XG5cdFx0XHRyZXR1cm4gYW5ub3RhdGlvbk9iamVjdC5maWx0ZXIoKG9SZWNvcmQ6IGFueSkgPT4ge1xuXHRcdFx0XHRpZiAob1JlY29yZC5UYXJnZXQgJiYgb1JlY29yZC5UYXJnZXQuJEFubm90YXRpb25QYXRoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG9SZWNvcmQuVGFyZ2V0LiRBbm5vdGF0aW9uUGF0aC5pbmRleE9mKFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNoYXJ0XCIpID09PSAtMTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0ZnVuY3Rpb24gcmVtb3ZlSUJOQW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdDogYW55KSB7XG5cdFx0XHRyZXR1cm4gYW5ub3RhdGlvbk9iamVjdC5maWx0ZXIoKG9SZWNvcmQ6IGFueSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gb1JlY29yZC4kVHlwZSAhPT0gXCJjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGRGb3JJbnRlbnRCYXNlZE5hdmlnYXRpb25cIjtcblx0XHRcdH0pO1xuXHRcdH1cblxuXHRcdGZ1bmN0aW9uIGhhbmRsZVByZXNlbnRhdGlvblZhcmlhbnQoYW5ub3RhdGlvbk9iamVjdDogYW55KSB7XG5cdFx0XHRyZXR1cm4gYW5ub3RhdGlvbk9iamVjdC5maWx0ZXIoKG9SZWNvcmQ6IGFueSkgPT4ge1xuXHRcdFx0XHRyZXR1cm4gb1JlY29yZC4kQW5ub3RhdGlvblBhdGggIT09IFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkNoYXJ0XCI7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHRPYmplY3Qua2V5cyhhbm5vdGF0aW9uT2JqZWN0cykuZm9yRWFjaChhbm5vdGF0aW9uS2V5ID0+IHtcblx0XHRcdGxldCBhbm5vdGF0aW9uT2JqZWN0ID0gYW5ub3RhdGlvbk9iamVjdHNbYW5ub3RhdGlvbktleV07XG5cdFx0XHRzd2l0Y2ggKGFubm90YXRpb25LZXkpIHtcblx0XHRcdFx0Y2FzZSBcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5IZWFkZXJGYWNldHNcIjpcblx0XHRcdFx0XHRpZiAoIW9DYXBhYmlsaXRpZXMuTWljcm9DaGFydCkge1xuXHRcdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdCA9IHJlbW92ZUNoYXJ0QW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLklkZW50aWZpY2F0aW9uXCI6XG5cdFx0XHRcdFx0aWYgKCFvQ2FwYWJpbGl0aWVzLkludGVudEJhc2VkTmF2aWdhdGlvbikge1xuXHRcdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdCA9IHJlbW92ZUlCTkFubm90YXRpb25zKGFubm90YXRpb25PYmplY3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5MaW5lSXRlbVwiOlxuXHRcdFx0XHRcdGlmICghb0NhcGFiaWxpdGllcy5JbnRlbnRCYXNlZE5hdmlnYXRpb24pIHtcblx0XHRcdFx0XHRcdGFubm90YXRpb25PYmplY3QgPSByZW1vdmVJQk5Bbm5vdGF0aW9ucyhhbm5vdGF0aW9uT2JqZWN0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCFvQ2FwYWJpbGl0aWVzLk1pY3JvQ2hhcnQpIHtcblx0XHRcdFx0XHRcdGFubm90YXRpb25PYmplY3QgPSByZW1vdmVDaGFydEFubm90YXRpb25zKGFubm90YXRpb25PYmplY3QpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5GaWVsZEdyb3VwXCI6XG5cdFx0XHRcdFx0aWYgKCFvQ2FwYWJpbGl0aWVzLkludGVudEJhc2VkTmF2aWdhdGlvbikge1xuXHRcdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdC5EYXRhID0gcmVtb3ZlSUJOQW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdC5EYXRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCFvQ2FwYWJpbGl0aWVzLk1pY3JvQ2hhcnQpIHtcblx0XHRcdFx0XHRcdGFubm90YXRpb25PYmplY3QuRGF0YSA9IHJlbW92ZUNoYXJ0QW5ub3RhdGlvbnMoYW5ub3RhdGlvbk9iamVjdC5EYXRhKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuUHJlc2VudGF0aW9uVmFyaWFudFwiOlxuXHRcdFx0XHRcdGlmICghb0NhcGFiaWxpdGllcy5DaGFydCAmJiBhbm5vdGF0aW9uT2JqZWN0LlZpc3VhbGl6YXRpb25zKSB7XG5cdFx0XHRcdFx0XHRhbm5vdGF0aW9uT2JqZWN0LlZpc3VhbGl6YXRpb25zID0gaGFuZGxlUHJlc2VudGF0aW9uVmFyaWFudChhbm5vdGF0aW9uT2JqZWN0LlZpc3VhbGl6YXRpb25zKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0XHRhbm5vdGF0aW9uT2JqZWN0c1thbm5vdGF0aW9uS2V5XSA9IGFubm90YXRpb25PYmplY3Q7XG5cdFx0XHRsZXQgY3VycmVudE91dEFubm90YXRpb25PYmplY3QgPSBvdXRBbm5vdGF0aW9uT2JqZWN0O1xuXG5cdFx0XHQvLyBDaGVjayBmb3IgYW5ub3RhdGlvbiBvZiBhbm5vdGF0aW9uXG5cdFx0XHRjb25zdCBhbm5vdGF0aW9uT2ZBbm5vdGF0aW9uU3BsaXQgPSBhbm5vdGF0aW9uS2V5LnNwbGl0KFwiQFwiKTtcblx0XHRcdGlmIChhbm5vdGF0aW9uT2ZBbm5vdGF0aW9uU3BsaXQubGVuZ3RoID4gMikge1xuXHRcdFx0XHRjdXJyZW50T3V0QW5ub3RhdGlvbk9iamVjdCA9IHRoaXMuZ2V0T3JDcmVhdGVBbm5vdGF0aW9uTGlzdChcblx0XHRcdFx0XHRhbm5vdGF0aW9uVGFyZ2V0ICsgXCJAXCIgKyBhbm5vdGF0aW9uT2ZBbm5vdGF0aW9uU3BsaXRbMV0sXG5cdFx0XHRcdFx0YW5ub3RhdGlvbkxpc3RzXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGFubm90YXRpb25LZXkgPSBhbm5vdGF0aW9uT2ZBbm5vdGF0aW9uU3BsaXRbMl07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRhbm5vdGF0aW9uS2V5ID0gYW5ub3RhdGlvbk9mQW5ub3RhdGlvblNwbGl0WzFdO1xuXHRcdFx0fVxuXG5cdFx0XHRjb25zdCBhbm5vdGF0aW9uUXVhbGlmaWVyU3BsaXQgPSBhbm5vdGF0aW9uS2V5LnNwbGl0KFwiI1wiKTtcblx0XHRcdGNvbnN0IHF1YWxpZmllciA9IGFubm90YXRpb25RdWFsaWZpZXJTcGxpdFsxXTtcblx0XHRcdGFubm90YXRpb25LZXkgPSBhbm5vdGF0aW9uUXVhbGlmaWVyU3BsaXRbMF07XG5cblx0XHRcdGNvbnN0IHBhcnNlZEFubm90YXRpb25PYmplY3Q6IGFueSA9IHtcblx0XHRcdFx0dGVybTogYCR7YW5ub3RhdGlvbktleX1gLFxuXHRcdFx0XHRxdWFsaWZpZXI6IHF1YWxpZmllclxuXHRcdFx0fTtcblx0XHRcdGxldCBjdXJyZW50QW5ub3RhdGlvblRhcmdldCA9IGFubm90YXRpb25UYXJnZXQgKyBcIkBcIiArIHBhcnNlZEFubm90YXRpb25PYmplY3QudGVybTtcblx0XHRcdGlmIChxdWFsaWZpZXIpIHtcblx0XHRcdFx0Y3VycmVudEFubm90YXRpb25UYXJnZXQgKz0gXCIjXCIgKyBxdWFsaWZpZXI7XG5cdFx0XHR9XG5cdFx0XHRsZXQgaXNDb2xsZWN0aW9uID0gZmFsc2U7XG5cdFx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdCA9PT0gbnVsbCkge1xuXHRcdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIkJvb2xcIiwgQm9vbDogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHRcdFx0fSBlbHNlIGlmICh0eXBlb2YgYW5ub3RhdGlvbk9iamVjdCA9PT0gXCJzdHJpbmdcIikge1xuXHRcdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIlN0cmluZ1wiLCBTdHJpbmc6IGFubm90YXRpb25PYmplY3QgfTtcblx0XHRcdH0gZWxzZSBpZiAodHlwZW9mIGFubm90YXRpb25PYmplY3QgPT09IFwiYm9vbGVhblwiKSB7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiQm9vbFwiLCBCb29sOiBhbm5vdGF0aW9uT2JqZWN0IH07XG5cdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhbm5vdGF0aW9uT2JqZWN0ID09PSBcIm51bWJlclwiKSB7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiSW50XCIsIEludDogYW5ub3RhdGlvbk9iamVjdCB9O1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRJZiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiSWZcIiwgSWY6IGFubm90YXRpb25PYmplY3QuJElmIH07XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEFuZCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiQW5kXCIsIEFuZDogYW5ub3RhdGlvbk9iamVjdC4kQW5kIH07XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJE9yICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJPclwiLCBPcjogYW5ub3RhdGlvbk9iamVjdC4kT3IgfTtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kTm90ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJOb3RcIiwgTm90OiBhbm5vdGF0aW9uT2JqZWN0LiROb3QgfTtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kRXEgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIkVxXCIsIEVxOiBhbm5vdGF0aW9uT2JqZWN0LiRFcSB9O1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiROZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiTmVcIiwgTmU6IGFubm90YXRpb25PYmplY3QuJE5lIH07XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJEd0ICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJHdFwiLCBHdDogYW5ub3RhdGlvbk9iamVjdC4kR3QgfTtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kR2UgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIkdlXCIsIEdlOiBhbm5vdGF0aW9uT2JqZWN0LiRHZSB9O1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRMdCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7IHR5cGU6IFwiTHRcIiwgTHQ6IGFubm90YXRpb25PYmplY3QuJEx0IH07XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJExlICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJMZVwiLCBMZTogYW5ub3RhdGlvbk9iamVjdC4kTGUgfTtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kQXBwbHkgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIkFwcGx5XCIsIEFwcGx5OiBhbm5vdGF0aW9uT2JqZWN0LiRBcHBseSwgRnVuY3Rpb246IGFubm90YXRpb25PYmplY3QuJEZ1bmN0aW9uIH07XG5cdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3QuJFBhdGggIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LnZhbHVlID0geyB0eXBlOiBcIlBhdGhcIiwgUGF0aDogYW5ub3RhdGlvbk9iamVjdC4kUGF0aCB9O1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiRBbm5vdGF0aW9uUGF0aCAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJBbm5vdGF0aW9uUGF0aFwiLFxuXHRcdFx0XHRcdEFubm90YXRpb25QYXRoOiBhbm5vdGF0aW9uT2JqZWN0LiRBbm5vdGF0aW9uUGF0aFxuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0LiREZWNpbWFsICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC52YWx1ZSA9IHsgdHlwZTogXCJEZWNpbWFsXCIsIERlY2ltYWw6IHBhcnNlRmxvYXQoYW5ub3RhdGlvbk9iamVjdC4kRGVjaW1hbCkgfTtcblx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdC4kRW51bU1lbWJlciAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QudmFsdWUgPSB7XG5cdFx0XHRcdFx0dHlwZTogXCJFbnVtTWVtYmVyXCIsXG5cdFx0XHRcdFx0RW51bU1lbWJlcjpcblx0XHRcdFx0XHRcdHRoaXMubWFwTmFtZVRvQWxpYXMoYW5ub3RhdGlvbk9iamVjdC4kRW51bU1lbWJlci5zcGxpdChcIi9cIilbMF0pICsgXCIvXCIgKyBhbm5vdGF0aW9uT2JqZWN0LiRFbnVtTWVtYmVyLnNwbGl0KFwiL1wiKVsxXVxuXHRcdFx0XHR9O1xuXHRcdFx0fSBlbHNlIGlmIChBcnJheS5pc0FycmF5KGFubm90YXRpb25PYmplY3QpKSB7XG5cdFx0XHRcdGlzQ29sbGVjdGlvbiA9IHRydWU7XG5cdFx0XHRcdHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiA9IGFubm90YXRpb25PYmplY3QubWFwKChzdWJBbm5vdGF0aW9uT2JqZWN0LCBzdWJBbm5vdGF0aW9uSW5kZXgpID0+XG5cdFx0XHRcdFx0dGhpcy5wYXJzZUFubm90YXRpb25PYmplY3QoXG5cdFx0XHRcdFx0XHRzdWJBbm5vdGF0aW9uT2JqZWN0LFxuXHRcdFx0XHRcdFx0Y3VycmVudEFubm90YXRpb25UYXJnZXQgKyBcIi9cIiArIHN1YkFubm90YXRpb25JbmRleCxcblx0XHRcdFx0XHRcdGFubm90YXRpb25MaXN0cyxcblx0XHRcdFx0XHRcdG9DYXBhYmlsaXRpZXNcblx0XHRcdFx0XHQpXG5cdFx0XHRcdCk7XG5cdFx0XHRcdGlmIChhbm5vdGF0aW9uT2JqZWN0Lmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRQcm9wZXJ0eVBhdGhcIikpIHtcblx0XHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJQcm9wZXJ0eVBhdGhcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkUGF0aFwiKSkge1xuXHRcdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIlBhdGhcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTmF2aWdhdGlvblByb3BlcnR5UGF0aFwiKSkge1xuXHRcdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVBhdGhcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkQW5ub3RhdGlvblBhdGhcIikpIHtcblx0XHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJBbm5vdGF0aW9uUGF0aFwiO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRUeXBlXCIpKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiUmVjb3JkXCI7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJElmXCIpKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiSWZcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkT3JcIikpIHtcblx0XHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJPclwiO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRFcVwiKSkge1xuXHRcdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkVxXCI7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJE5lXCIpKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiTmVcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkTm90XCIpKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiTm90XCI7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEd0XCIpKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiR3RcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkR2VcIikpIHtcblx0XHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJHZVwiO1xuXHRcdFx0XHRcdH0gZWxzZSBpZiAoYW5ub3RhdGlvbk9iamVjdFswXS5oYXNPd25Qcm9wZXJ0eShcIiRMdFwiKSkge1xuXHRcdFx0XHRcdFx0KHBhcnNlZEFubm90YXRpb25PYmplY3QuY29sbGVjdGlvbiBhcyBhbnkpLnR5cGUgPSBcIkx0XCI7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJExlXCIpKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiTGVcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGFubm90YXRpb25PYmplY3RbMF0uaGFzT3duUHJvcGVydHkoXCIkQW5kXCIpKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiQW5kXCI7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChhbm5vdGF0aW9uT2JqZWN0WzBdLmhhc093blByb3BlcnR5KFwiJEFwcGx5XCIpKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiQXBwbHlcIjtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHR5cGVvZiBhbm5vdGF0aW9uT2JqZWN0WzBdID09PSBcIm9iamVjdFwiKSB7XG5cdFx0XHRcdFx0XHQocGFyc2VkQW5ub3RhdGlvbk9iamVjdC5jb2xsZWN0aW9uIGFzIGFueSkudHlwZSA9IFwiUmVjb3JkXCI7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdChwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmNvbGxlY3Rpb24gYXMgYW55KS50eXBlID0gXCJTdHJpbmdcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IHJlY29yZDogQW5ub3RhdGlvblJlY29yZCA9IHtcblx0XHRcdFx0XHRwcm9wZXJ0eVZhbHVlczogW11cblx0XHRcdFx0fTtcblx0XHRcdFx0aWYgKGFubm90YXRpb25PYmplY3QuJFR5cGUpIHtcblx0XHRcdFx0XHRjb25zdCB0eXBlVmFsdWUgPSBhbm5vdGF0aW9uT2JqZWN0LiRUeXBlO1xuXHRcdFx0XHRcdHJlY29yZC50eXBlID0gYCR7dHlwZVZhbHVlfWA7XG5cdFx0XHRcdH1cblx0XHRcdFx0Y29uc3QgcHJvcGVydHlWYWx1ZXM6IGFueVtdID0gW107XG5cdFx0XHRcdE9iamVjdC5rZXlzKGFubm90YXRpb25PYmplY3QpLmZvckVhY2gocHJvcGVydHlLZXkgPT4ge1xuXHRcdFx0XHRcdGlmIChwcm9wZXJ0eUtleSAhPT0gXCIkVHlwZVwiICYmICFwcm9wZXJ0eUtleS5zdGFydHNXaXRoKFwiQFwiKSkge1xuXHRcdFx0XHRcdFx0cHJvcGVydHlWYWx1ZXMucHVzaChcblx0XHRcdFx0XHRcdFx0dGhpcy5wYXJzZVByb3BlcnR5VmFsdWUoXG5cdFx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbk9iamVjdFtwcm9wZXJ0eUtleV0sXG5cdFx0XHRcdFx0XHRcdFx0cHJvcGVydHlLZXksXG5cdFx0XHRcdFx0XHRcdFx0Y3VycmVudEFubm90YXRpb25UYXJnZXQsXG5cdFx0XHRcdFx0XHRcdFx0YW5ub3RhdGlvbkxpc3RzLFxuXHRcdFx0XHRcdFx0XHRcdG9DYXBhYmlsaXRpZXNcblx0XHRcdFx0XHRcdFx0KVxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKHByb3BlcnR5S2V5LnN0YXJ0c1dpdGgoXCJAXCIpKSB7XG5cdFx0XHRcdFx0XHQvLyBBbm5vdGF0aW9uIG9mIHJlY29yZFxuXHRcdFx0XHRcdFx0dGhpcy5jcmVhdGVBbm5vdGF0aW9uTGlzdHMoXG5cdFx0XHRcdFx0XHRcdHsgW3Byb3BlcnR5S2V5XTogYW5ub3RhdGlvbk9iamVjdFtwcm9wZXJ0eUtleV0gfSxcblx0XHRcdFx0XHRcdFx0Y3VycmVudEFubm90YXRpb25UYXJnZXQsXG5cdFx0XHRcdFx0XHRcdGFubm90YXRpb25MaXN0cyxcblx0XHRcdFx0XHRcdFx0b0NhcGFiaWxpdGllc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRyZWNvcmQucHJvcGVydHlWYWx1ZXMgPSBwcm9wZXJ0eVZhbHVlcztcblx0XHRcdFx0cGFyc2VkQW5ub3RhdGlvbk9iamVjdC5yZWNvcmQgPSByZWNvcmQ7XG5cdFx0XHR9XG5cdFx0XHRwYXJzZWRBbm5vdGF0aW9uT2JqZWN0LmlzQ29sbGVjdGlvbiA9IGlzQ29sbGVjdGlvbjtcblx0XHRcdGN1cnJlbnRPdXRBbm5vdGF0aW9uT2JqZWN0LmFubm90YXRpb25zLnB1c2gocGFyc2VkQW5ub3RhdGlvbk9iamVjdCk7XG5cdFx0fSk7XG5cdH0sXG5cdHBhcnNlUHJvcGVydHkoXG5cdFx0b01ldGFNb2RlbDogYW55LFxuXHRcdGVudGl0eVR5cGVPYmplY3Q6IEVudGl0eVR5cGUgfCBDb21wbGV4VHlwZSxcblx0XHRwcm9wZXJ0eU5hbWU6IHN0cmluZyxcblx0XHRhbm5vdGF0aW9uTGlzdHM6IEFubm90YXRpb25MaXN0W10sXG5cdFx0b0NhcGFiaWxpdGllczogRW52aXJvbm1lbnRDYXBhYmlsaXRpZXNcblx0KTogUHJvcGVydHkge1xuXHRcdGNvbnN0IHByb3BlcnR5QW5ub3RhdGlvbiA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KGAvJHtlbnRpdHlUeXBlT2JqZWN0LmZ1bGx5UXVhbGlmaWVkTmFtZX0vJHtwcm9wZXJ0eU5hbWV9QGApO1xuXHRcdGNvbnN0IHByb3BlcnR5RGVmaW5pdGlvbiA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KGAvJHtlbnRpdHlUeXBlT2JqZWN0LmZ1bGx5UXVhbGlmaWVkTmFtZX0vJHtwcm9wZXJ0eU5hbWV9YCk7XG5cblx0XHRjb25zdCBwcm9wZXJ0eU9iamVjdDogUHJvcGVydHkgPSB7XG5cdFx0XHRfdHlwZTogXCJQcm9wZXJ0eVwiLFxuXHRcdFx0bmFtZTogcHJvcGVydHlOYW1lLFxuXHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBgJHtlbnRpdHlUeXBlT2JqZWN0LmZ1bGx5UXVhbGlmaWVkTmFtZX0vJHtwcm9wZXJ0eU5hbWV9YCxcblx0XHRcdHR5cGU6IHByb3BlcnR5RGVmaW5pdGlvbi4kVHlwZSxcblx0XHRcdG1heExlbmd0aDogcHJvcGVydHlEZWZpbml0aW9uLiRNYXhMZW5ndGgsXG5cdFx0XHRwcmVjaXNpb246IHByb3BlcnR5RGVmaW5pdGlvbi4kUHJlY2lzaW9uLFxuXHRcdFx0c2NhbGU6IHByb3BlcnR5RGVmaW5pdGlvbi4kU2NhbGUsXG5cdFx0XHRudWxsYWJsZTogcHJvcGVydHlEZWZpbml0aW9uLiROdWxsYWJsZVxuXHRcdH07XG5cblx0XHR0aGlzLmNyZWF0ZUFubm90YXRpb25MaXN0cyhwcm9wZXJ0eUFubm90YXRpb24sIHByb3BlcnR5T2JqZWN0LmZ1bGx5UXVhbGlmaWVkTmFtZSwgYW5ub3RhdGlvbkxpc3RzLCBvQ2FwYWJpbGl0aWVzKTtcblxuXHRcdHJldHVybiBwcm9wZXJ0eU9iamVjdDtcblx0fSxcblx0cGFyc2VOYXZpZ2F0aW9uUHJvcGVydHkoXG5cdFx0b01ldGFNb2RlbDogYW55LFxuXHRcdGVudGl0eVR5cGVPYmplY3Q6IEVudGl0eVR5cGUgfCBDb21wbGV4VHlwZSxcblx0XHRuYXZQcm9wZXJ0eU5hbWU6IHN0cmluZyxcblx0XHRhbm5vdGF0aW9uTGlzdHM6IEFubm90YXRpb25MaXN0W10sXG5cdFx0b0NhcGFiaWxpdGllczogRW52aXJvbm1lbnRDYXBhYmlsaXRpZXNcblx0KTogVjROYXZpZ2F0aW9uUHJvcGVydHkge1xuXHRcdGNvbnN0IG5hdlByb3BlcnR5QW5ub3RhdGlvbiA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KGAvJHtlbnRpdHlUeXBlT2JqZWN0LmZ1bGx5UXVhbGlmaWVkTmFtZX0vJHtuYXZQcm9wZXJ0eU5hbWV9QGApO1xuXHRcdGNvbnN0IG5hdlByb3BlcnR5RGVmaW5pdGlvbiA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KGAvJHtlbnRpdHlUeXBlT2JqZWN0LmZ1bGx5UXVhbGlmaWVkTmFtZX0vJHtuYXZQcm9wZXJ0eU5hbWV9YCk7XG5cblx0XHRsZXQgcmVmZXJlbnRpYWxDb25zdHJhaW50OiBSZWZlcmVudGlhbENvbnN0cmFpbnRbXSA9IFtdO1xuXHRcdGlmIChuYXZQcm9wZXJ0eURlZmluaXRpb24uJFJlZmVyZW50aWFsQ29uc3RyYWludCkge1xuXHRcdFx0cmVmZXJlbnRpYWxDb25zdHJhaW50ID0gT2JqZWN0LmtleXMobmF2UHJvcGVydHlEZWZpbml0aW9uLiRSZWZlcmVudGlhbENvbnN0cmFpbnQpLm1hcChzb3VyY2VQcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHNvdXJjZVR5cGVOYW1lOiBlbnRpdHlUeXBlT2JqZWN0Lm5hbWUsXG5cdFx0XHRcdFx0c291cmNlUHJvcGVydHk6IHNvdXJjZVByb3BlcnR5TmFtZSxcblx0XHRcdFx0XHR0YXJnZXRUeXBlTmFtZTogbmF2UHJvcGVydHlEZWZpbml0aW9uLiRUeXBlLFxuXHRcdFx0XHRcdHRhcmdldFByb3BlcnR5OiBuYXZQcm9wZXJ0eURlZmluaXRpb24uJFJlZmVyZW50aWFsQ29uc3RyYWludFtzb3VyY2VQcm9wZXJ0eU5hbWVdXG5cdFx0XHRcdH07XG5cdFx0XHR9KTtcblx0XHR9XG5cdFx0Y29uc3QgbmF2aWdhdGlvblByb3BlcnR5OiBWNE5hdmlnYXRpb25Qcm9wZXJ0eSA9IHtcblx0XHRcdF90eXBlOiBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiLFxuXHRcdFx0bmFtZTogbmF2UHJvcGVydHlOYW1lLFxuXHRcdFx0ZnVsbHlRdWFsaWZpZWROYW1lOiBgJHtlbnRpdHlUeXBlT2JqZWN0LmZ1bGx5UXVhbGlmaWVkTmFtZX0vJHtuYXZQcm9wZXJ0eU5hbWV9YCxcblx0XHRcdHBhcnRuZXI6IG5hdlByb3BlcnR5RGVmaW5pdGlvbi4kUGFydG5lcixcblx0XHRcdGlzQ29sbGVjdGlvbjogbmF2UHJvcGVydHlEZWZpbml0aW9uLiRpc0NvbGxlY3Rpb24gPyBuYXZQcm9wZXJ0eURlZmluaXRpb24uJGlzQ29sbGVjdGlvbiA6IGZhbHNlLFxuXHRcdFx0Y29udGFpbnNUYXJnZXQ6IG5hdlByb3BlcnR5RGVmaW5pdGlvbi4kQ29udGFpbnNUYXJnZXQsXG5cdFx0XHR0YXJnZXRUeXBlTmFtZTogbmF2UHJvcGVydHlEZWZpbml0aW9uLiRUeXBlLFxuXHRcdFx0cmVmZXJlbnRpYWxDb25zdHJhaW50XG5cdFx0fTtcblxuXHRcdHRoaXMuY3JlYXRlQW5ub3RhdGlvbkxpc3RzKG5hdlByb3BlcnR5QW5ub3RhdGlvbiwgbmF2aWdhdGlvblByb3BlcnR5LmZ1bGx5UXVhbGlmaWVkTmFtZSwgYW5ub3RhdGlvbkxpc3RzLCBvQ2FwYWJpbGl0aWVzKTtcblxuXHRcdHJldHVybiBuYXZpZ2F0aW9uUHJvcGVydHk7XG5cdH0sXG5cdHBhcnNlRW50aXR5U2V0KFxuXHRcdG9NZXRhTW9kZWw6IGFueSxcblx0XHRlbnRpdHlTZXROYW1lOiBzdHJpbmcsXG5cdFx0YW5ub3RhdGlvbkxpc3RzOiBBbm5vdGF0aW9uTGlzdFtdLFxuXHRcdGVudGl0eUNvbnRhaW5lck5hbWU6IHN0cmluZyxcblx0XHRvQ2FwYWJpbGl0aWVzOiBFbnZpcm9ubWVudENhcGFiaWxpdGllc1xuXHQpOiBFbnRpdHlTZXQge1xuXHRcdGNvbnN0IGVudGl0eVNldERlZmluaXRpb24gPSBvTWV0YU1vZGVsLmdldE9iamVjdChgLyR7ZW50aXR5U2V0TmFtZX1gKTtcblx0XHRjb25zdCBlbnRpdHlTZXRBbm5vdGF0aW9uID0gb01ldGFNb2RlbC5nZXRPYmplY3QoYC8ke2VudGl0eVNldE5hbWV9QGApO1xuXHRcdGNvbnN0IGVudGl0eVNldE9iamVjdDogRW50aXR5U2V0ID0ge1xuXHRcdFx0X3R5cGU6IFwiRW50aXR5U2V0XCIsXG5cdFx0XHRuYW1lOiBlbnRpdHlTZXROYW1lLFxuXHRcdFx0bmF2aWdhdGlvblByb3BlcnR5QmluZGluZzoge30sXG5cdFx0XHRlbnRpdHlUeXBlTmFtZTogZW50aXR5U2V0RGVmaW5pdGlvbi4kVHlwZSxcblx0XHRcdGZ1bGx5UXVhbGlmaWVkTmFtZTogYCR7ZW50aXR5Q29udGFpbmVyTmFtZX0vJHtlbnRpdHlTZXROYW1lfWBcblx0XHR9O1xuXHRcdHRoaXMuY3JlYXRlQW5ub3RhdGlvbkxpc3RzKGVudGl0eVNldEFubm90YXRpb24sIGVudGl0eVNldE9iamVjdC5mdWxseVF1YWxpZmllZE5hbWUsIGFubm90YXRpb25MaXN0cywgb0NhcGFiaWxpdGllcyk7XG5cdFx0cmV0dXJuIGVudGl0eVNldE9iamVjdDtcblx0fSxcblxuXHRwYXJzZVNpbmdsZXRvbihcblx0XHRvTWV0YU1vZGVsOiBhbnksXG5cdFx0c2luZ2xldG9uTmFtZTogc3RyaW5nLFxuXHRcdGFubm90YXRpb25MaXN0czogQW5ub3RhdGlvbkxpc3RbXSxcblx0XHRlbnRpdHlDb250YWluZXJOYW1lOiBzdHJpbmcsXG5cdFx0b0NhcGFiaWxpdGllczogRW52aXJvbm1lbnRDYXBhYmlsaXRpZXNcblx0KTogU2luZ2xldG9uIHtcblx0XHRjb25zdCBzaW5nbGV0b25EZWZpbml0aW9uID0gb01ldGFNb2RlbC5nZXRPYmplY3QoYC8ke3NpbmdsZXRvbk5hbWV9YCk7XG5cdFx0Y29uc3Qgc2luZ2xldG9uQW5ub3RhdGlvbiA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KGAvJHtzaW5nbGV0b25OYW1lfUBgKTtcblx0XHRjb25zdCBzaW5nbGV0b25PYmplY3Q6IFNpbmdsZXRvbiA9IHtcblx0XHRcdF90eXBlOiBcIlNpbmdsZXRvblwiLFxuXHRcdFx0bmFtZTogc2luZ2xldG9uTmFtZSxcblx0XHRcdG5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmc6IHt9LFxuXHRcdFx0dHlwZU5hbWU6IHNpbmdsZXRvbkRlZmluaXRpb24uJFR5cGUsXG5cdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGAke2VudGl0eUNvbnRhaW5lck5hbWV9LyR7c2luZ2xldG9uTmFtZX1gLFxuXHRcdFx0bnVsbGFibGU6IHRydWVcblx0XHR9O1xuXHRcdHRoaXMuY3JlYXRlQW5ub3RhdGlvbkxpc3RzKHNpbmdsZXRvbkFubm90YXRpb24sIHNpbmdsZXRvbk9iamVjdC5mdWxseVF1YWxpZmllZE5hbWUsIGFubm90YXRpb25MaXN0cywgb0NhcGFiaWxpdGllcyk7XG5cdFx0cmV0dXJuIHNpbmdsZXRvbk9iamVjdDtcblx0fSxcblxuXHRwYXJzZUVudGl0eVR5cGUoXG5cdFx0b01ldGFNb2RlbDogYW55LFxuXHRcdGVudGl0eVR5cGVOYW1lOiBzdHJpbmcsXG5cdFx0YW5ub3RhdGlvbkxpc3RzOiBBbm5vdGF0aW9uTGlzdFtdLFxuXHRcdG5hbWVzcGFjZTogc3RyaW5nLFxuXHRcdG9DYXBhYmlsaXRpZXM6IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzXG5cdCk6IEVudGl0eVR5cGUge1xuXHRcdGNvbnN0IGVudGl0eVR5cGVBbm5vdGF0aW9uID0gb01ldGFNb2RlbC5nZXRPYmplY3QoYC8ke2VudGl0eVR5cGVOYW1lfUBgKTtcblx0XHRjb25zdCBlbnRpdHlUeXBlRGVmaW5pdGlvbiA9IG9NZXRhTW9kZWwuZ2V0T2JqZWN0KGAvJHtlbnRpdHlUeXBlTmFtZX1gKTtcblxuXHRcdGNvbnN0IGVudGl0eUtleXM6IGFueSA9IGdldEVudGl0eUtleXMoZW50aXR5VHlwZURlZmluaXRpb24pO1xuXG5cdFx0ZnVuY3Rpb24gZ2V0RW50aXR5S2V5cyhlbnRpdHlUeXBlRGVmaW5pdGlvbjogYW55KTogYW55IHtcblx0XHRcdGlmICghZW50aXR5VHlwZURlZmluaXRpb24uJEtleSAmJiBlbnRpdHlUeXBlRGVmaW5pdGlvbi4kQmFzZVR5cGUpIHtcblx0XHRcdFx0cmV0dXJuIGdldEVudGl0eUtleXMob01ldGFNb2RlbC5nZXRPYmplY3QoYC8ke2VudGl0eVR5cGVEZWZpbml0aW9uLiRCYXNlVHlwZX1gKSk7XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gZW50aXR5VHlwZURlZmluaXRpb24uJEtleSB8fCBbXTsgLy9oYW5kbGluZyBvZiBlbnRpdHkgdHlwZXMgd2l0aG91dCBrZXkgYXMgd2VsbCBhcyBiYXNldHlwZVxuXHRcdH1cblx0XHRjb25zdCBlbnRpdHlUeXBlT2JqZWN0OiBFbnRpdHlUeXBlID0ge1xuXHRcdFx0X3R5cGU6IFwiRW50aXR5VHlwZVwiLFxuXHRcdFx0bmFtZTogZW50aXR5VHlwZU5hbWUucmVwbGFjZShuYW1lc3BhY2UgKyBcIi5cIiwgXCJcIiksXG5cdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGVudGl0eVR5cGVOYW1lLFxuXHRcdFx0a2V5czogW10sXG5cdFx0XHRlbnRpdHlQcm9wZXJ0aWVzOiBbXSxcblx0XHRcdG5hdmlnYXRpb25Qcm9wZXJ0aWVzOiBbXVxuXHRcdH07XG5cblx0XHR0aGlzLmNyZWF0ZUFubm90YXRpb25MaXN0cyhlbnRpdHlUeXBlQW5ub3RhdGlvbiwgZW50aXR5VHlwZU9iamVjdC5mdWxseVF1YWxpZmllZE5hbWUsIGFubm90YXRpb25MaXN0cywgb0NhcGFiaWxpdGllcyk7XG5cdFx0Y29uc3QgZW50aXR5UHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGVudGl0eVR5cGVEZWZpbml0aW9uKVxuXHRcdFx0LmZpbHRlcihwcm9wZXJ0eU5hbWVPck5vdCA9PiB7XG5cdFx0XHRcdGlmIChwcm9wZXJ0eU5hbWVPck5vdCAhPSBcIiRLZXlcIiAmJiBwcm9wZXJ0eU5hbWVPck5vdCAhPSBcIiRraW5kXCIpIHtcblx0XHRcdFx0XHRyZXR1cm4gZW50aXR5VHlwZURlZmluaXRpb25bcHJvcGVydHlOYW1lT3JOb3RdLiRraW5kID09PSBcIlByb3BlcnR5XCI7XG5cdFx0XHRcdH1cblx0XHRcdH0pXG5cdFx0XHQubWFwKHByb3BlcnR5TmFtZSA9PiB7XG5cdFx0XHRcdHJldHVybiB0aGlzLnBhcnNlUHJvcGVydHkob01ldGFNb2RlbCwgZW50aXR5VHlwZU9iamVjdCwgcHJvcGVydHlOYW1lLCBhbm5vdGF0aW9uTGlzdHMsIG9DYXBhYmlsaXRpZXMpO1xuXHRcdFx0fSk7XG5cblx0XHRjb25zdCBuYXZpZ2F0aW9uUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGVudGl0eVR5cGVEZWZpbml0aW9uKVxuXHRcdFx0LmZpbHRlcihwcm9wZXJ0eU5hbWVPck5vdCA9PiB7XG5cdFx0XHRcdGlmIChwcm9wZXJ0eU5hbWVPck5vdCAhPSBcIiRLZXlcIiAmJiBwcm9wZXJ0eU5hbWVPck5vdCAhPSBcIiRraW5kXCIpIHtcblx0XHRcdFx0XHRyZXR1cm4gZW50aXR5VHlwZURlZmluaXRpb25bcHJvcGVydHlOYW1lT3JOb3RdLiRraW5kID09PSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0Lm1hcChuYXZQcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5wYXJzZU5hdmlnYXRpb25Qcm9wZXJ0eShvTWV0YU1vZGVsLCBlbnRpdHlUeXBlT2JqZWN0LCBuYXZQcm9wZXJ0eU5hbWUsIGFubm90YXRpb25MaXN0cywgb0NhcGFiaWxpdGllcyk7XG5cdFx0XHR9KTtcblxuXHRcdGVudGl0eVR5cGVPYmplY3Qua2V5cyA9IGVudGl0eUtleXNcblx0XHRcdC5tYXAoKGVudGl0eUtleTogc3RyaW5nKSA9PiBlbnRpdHlQcm9wZXJ0aWVzLmZpbmQoKHByb3BlcnR5OiBQcm9wZXJ0eSkgPT4gcHJvcGVydHkubmFtZSA9PT0gZW50aXR5S2V5KSlcblx0XHRcdC5maWx0ZXIoKHByb3BlcnR5OiBQcm9wZXJ0eSkgPT4gcHJvcGVydHkgIT09IHVuZGVmaW5lZCk7XG5cdFx0ZW50aXR5VHlwZU9iamVjdC5lbnRpdHlQcm9wZXJ0aWVzID0gZW50aXR5UHJvcGVydGllcztcblx0XHRlbnRpdHlUeXBlT2JqZWN0Lm5hdmlnYXRpb25Qcm9wZXJ0aWVzID0gbmF2aWdhdGlvblByb3BlcnRpZXM7XG5cblx0XHRyZXR1cm4gZW50aXR5VHlwZU9iamVjdDtcblx0fSxcblx0cGFyc2VDb21wbGV4VHlwZShcblx0XHRvTWV0YU1vZGVsOiBhbnksXG5cdFx0Y29tcGxleFR5cGVOYW1lOiBzdHJpbmcsXG5cdFx0YW5ub3RhdGlvbkxpc3RzOiBBbm5vdGF0aW9uTGlzdFtdLFxuXHRcdG5hbWVzcGFjZTogc3RyaW5nLFxuXHRcdG9DYXBhYmlsaXRpZXM6IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzXG5cdCk6IENvbXBsZXhUeXBlIHtcblx0XHRjb25zdCBjb21wbGV4VHlwZUFubm90YXRpb24gPSBvTWV0YU1vZGVsLmdldE9iamVjdChgLyR7Y29tcGxleFR5cGVOYW1lfUBgKTtcblx0XHRjb25zdCBjb21wbGV4VHlwZURlZmluaXRpb24gPSBvTWV0YU1vZGVsLmdldE9iamVjdChgLyR7Y29tcGxleFR5cGVOYW1lfWApO1xuXHRcdGNvbnN0IGNvbXBsZXhUeXBlT2JqZWN0OiBDb21wbGV4VHlwZSA9IHtcblx0XHRcdF90eXBlOiBcIkNvbXBsZXhUeXBlXCIsXG5cdFx0XHRuYW1lOiBjb21wbGV4VHlwZU5hbWUucmVwbGFjZShuYW1lc3BhY2UgKyBcIi5cIiwgXCJcIiksXG5cdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGNvbXBsZXhUeXBlTmFtZSxcblx0XHRcdHByb3BlcnRpZXM6IFtdLFxuXHRcdFx0bmF2aWdhdGlvblByb3BlcnRpZXM6IFtdXG5cdFx0fTtcblxuXHRcdHRoaXMuY3JlYXRlQW5ub3RhdGlvbkxpc3RzKGNvbXBsZXhUeXBlQW5ub3RhdGlvbiwgY29tcGxleFR5cGVPYmplY3QuZnVsbHlRdWFsaWZpZWROYW1lLCBhbm5vdGF0aW9uTGlzdHMsIG9DYXBhYmlsaXRpZXMpO1xuXHRcdGNvbnN0IGNvbXBsZXhUeXBlUHJvcGVydGllcyA9IE9iamVjdC5rZXlzKGNvbXBsZXhUeXBlRGVmaW5pdGlvbilcblx0XHRcdC5maWx0ZXIocHJvcGVydHlOYW1lT3JOb3QgPT4ge1xuXHRcdFx0XHRpZiAocHJvcGVydHlOYW1lT3JOb3QgIT0gXCIkS2V5XCIgJiYgcHJvcGVydHlOYW1lT3JOb3QgIT0gXCIka2luZFwiKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbXBsZXhUeXBlRGVmaW5pdGlvbltwcm9wZXJ0eU5hbWVPck5vdF0uJGtpbmQgPT09IFwiUHJvcGVydHlcIjtcblx0XHRcdFx0fVxuXHRcdFx0fSlcblx0XHRcdC5tYXAocHJvcGVydHlOYW1lID0+IHtcblx0XHRcdFx0cmV0dXJuIHRoaXMucGFyc2VQcm9wZXJ0eShvTWV0YU1vZGVsLCBjb21wbGV4VHlwZU9iamVjdCwgcHJvcGVydHlOYW1lLCBhbm5vdGF0aW9uTGlzdHMsIG9DYXBhYmlsaXRpZXMpO1xuXHRcdFx0fSk7XG5cblx0XHRjb21wbGV4VHlwZU9iamVjdC5wcm9wZXJ0aWVzID0gY29tcGxleFR5cGVQcm9wZXJ0aWVzO1xuXHRcdGNvbnN0IGNvbXBsZXhUeXBlTmF2aWdhdGlvblByb3BlcnRpZXMgPSBPYmplY3Qua2V5cyhjb21wbGV4VHlwZURlZmluaXRpb24pXG5cdFx0XHQuZmlsdGVyKHByb3BlcnR5TmFtZU9yTm90ID0+IHtcblx0XHRcdFx0aWYgKHByb3BlcnR5TmFtZU9yTm90ICE9IFwiJEtleVwiICYmIHByb3BlcnR5TmFtZU9yTm90ICE9IFwiJGtpbmRcIikge1xuXHRcdFx0XHRcdHJldHVybiBjb21wbGV4VHlwZURlZmluaXRpb25bcHJvcGVydHlOYW1lT3JOb3RdLiRraW5kID09PSBcIk5hdmlnYXRpb25Qcm9wZXJ0eVwiO1xuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXHRcdFx0Lm1hcChuYXZQcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdFx0XHRyZXR1cm4gdGhpcy5wYXJzZU5hdmlnYXRpb25Qcm9wZXJ0eShvTWV0YU1vZGVsLCBjb21wbGV4VHlwZU9iamVjdCwgbmF2UHJvcGVydHlOYW1lLCBhbm5vdGF0aW9uTGlzdHMsIG9DYXBhYmlsaXRpZXMpO1xuXHRcdFx0fSk7XG5cdFx0Y29tcGxleFR5cGVPYmplY3QubmF2aWdhdGlvblByb3BlcnRpZXMgPSBjb21wbGV4VHlwZU5hdmlnYXRpb25Qcm9wZXJ0aWVzO1xuXHRcdHJldHVybiBjb21wbGV4VHlwZU9iamVjdDtcblx0fSxcblx0cGFyc2VBY3Rpb24oYWN0aW9uTmFtZTogc3RyaW5nLCBhY3Rpb25SYXdEYXRhOiBNZXRhTW9kZWxBY3Rpb24sIG5hbWVzcGFjZTogc3RyaW5nLCBlbnRpdHlDb250YWluZXJOYW1lOiBzdHJpbmcpOiBBY3Rpb24ge1xuXHRcdGxldCBhY3Rpb25FbnRpdHlUeXBlOiBzdHJpbmcgPSBcIlwiO1xuXHRcdGxldCBhY3Rpb25GUU4gPSBgJHthY3Rpb25OYW1lfWA7XG5cdFx0Y29uc3QgYWN0aW9uU2hvcnROYW1lID0gYWN0aW9uTmFtZS5zdWJzdHIobmFtZXNwYWNlLmxlbmd0aCArIDEpO1xuXHRcdGlmIChhY3Rpb25SYXdEYXRhLiRJc0JvdW5kKSB7XG5cdFx0XHRjb25zdCBiaW5kaW5nUGFyYW1ldGVyID0gYWN0aW9uUmF3RGF0YS4kUGFyYW1ldGVyWzBdO1xuXHRcdFx0YWN0aW9uRW50aXR5VHlwZSA9IGJpbmRpbmdQYXJhbWV0ZXIuJFR5cGU7XG5cdFx0XHRpZiAoYmluZGluZ1BhcmFtZXRlci4kaXNDb2xsZWN0aW9uID09PSB0cnVlKSB7XG5cdFx0XHRcdGFjdGlvbkZRTiA9IGAke2FjdGlvbk5hbWV9KENvbGxlY3Rpb24oJHthY3Rpb25FbnRpdHlUeXBlfSkpYDtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGFjdGlvbkZRTiA9IGAke2FjdGlvbk5hbWV9KCR7YWN0aW9uRW50aXR5VHlwZX0pYDtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0YWN0aW9uRlFOID0gYCR7ZW50aXR5Q29udGFpbmVyTmFtZX0vJHthY3Rpb25TaG9ydE5hbWV9YDtcblx0XHR9XG5cdFx0Y29uc3QgcGFyYW1ldGVycyA9IGFjdGlvblJhd0RhdGEuJFBhcmFtZXRlciB8fCBbXTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0X3R5cGU6IFwiQWN0aW9uXCIsXG5cdFx0XHRuYW1lOiBhY3Rpb25TaG9ydE5hbWUsXG5cdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGFjdGlvbkZRTixcblx0XHRcdGlzQm91bmQ6IGFjdGlvblJhd0RhdGEuJElzQm91bmQsXG5cdFx0XHRzb3VyY2VUeXBlOiBhY3Rpb25FbnRpdHlUeXBlLFxuXHRcdFx0cmV0dXJuVHlwZTogYWN0aW9uUmF3RGF0YS4kUmV0dXJuVHlwZSA/IGFjdGlvblJhd0RhdGEuJFJldHVyblR5cGUuJFR5cGUgOiBcIlwiLFxuXHRcdFx0cGFyYW1ldGVyczogcGFyYW1ldGVycy5tYXAocGFyYW0gPT4ge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdF90eXBlOiBcIkFjdGlvblBhcmFtZXRlclwiLFxuXHRcdFx0XHRcdGlzRW50aXR5U2V0OiBwYXJhbS4kVHlwZSA9PT0gYWN0aW9uUmF3RGF0YS4kRW50aXR5U2V0UGF0aCxcblx0XHRcdFx0XHRmdWxseVF1YWxpZmllZE5hbWU6IGAke2FjdGlvbkZRTn0vJHtwYXJhbS4kTmFtZX1gLFxuXHRcdFx0XHRcdHR5cGU6IHBhcmFtLiRUeXBlXG5cdFx0XHRcdFx0Ly8gVE9ETyBtaXNzaW5nIHByb3BlcnRpZXMgP1xuXHRcdFx0XHR9O1xuXHRcdFx0fSlcblx0XHR9O1xuXHR9LFxuXHRwYXJzZUVudGl0eVR5cGVzKG9NZXRhTW9kZWw6IGFueSwgb0luQ2FwYWJpbGl0aWVzPzogRW52aXJvbm1lbnRDYXBhYmlsaXRpZXMpOiBQYXJzZXJPdXRwdXQge1xuXHRcdGxldCBvQ2FwYWJpbGl0aWVzOiBFbnZpcm9ubWVudENhcGFiaWxpdGllcztcblx0XHRpZiAoIW9JbkNhcGFiaWxpdGllcykge1xuXHRcdFx0b0NhcGFiaWxpdGllcyA9IERlZmF1bHRFbnZpcm9ubWVudENhcGFiaWxpdGllcztcblx0XHR9IGVsc2Uge1xuXHRcdFx0b0NhcGFiaWxpdGllcyA9IG9JbkNhcGFiaWxpdGllcztcblx0XHR9XG5cdFx0Y29uc3Qgb01ldGFNb2RlbERhdGEgPSBvTWV0YU1vZGVsLmdldE9iamVjdChcIi8kXCIpO1xuXHRcdGNvbnN0IG9FbnRpdHlTZXRzID0gb01ldGFNb2RlbC5nZXRPYmplY3QoXCIvXCIpO1xuXHRcdGxldCBhbm5vdGF0aW9uTGlzdHM6IEFubm90YXRpb25MaXN0W10gPSBbXTtcblx0XHRjb25zdCBlbnRpdHlUeXBlczogRW50aXR5VHlwZVtdID0gW107XG5cdFx0Y29uc3QgZW50aXR5U2V0czogRW50aXR5U2V0W10gPSBbXTtcblx0XHRjb25zdCBzaW5nbGV0b25zOiBTaW5nbGV0b25bXSA9IFtdO1xuXHRcdGNvbnN0IGNvbXBsZXhUeXBlczogQ29tcGxleFR5cGVbXSA9IFtdO1xuXHRcdGNvbnN0IGVudGl0eUNvbnRhaW5lck5hbWUgPSBvTWV0YU1vZGVsRGF0YS4kRW50aXR5Q29udGFpbmVyO1xuXHRcdGxldCBuYW1lc3BhY2UgPSBcIlwiO1xuXHRcdGNvbnN0IHNjaGVtYUtleXMgPSBPYmplY3Qua2V5cyhvTWV0YU1vZGVsRGF0YSkuZmlsdGVyKG1ldGFtb2RlbEtleSA9PiBvTWV0YU1vZGVsRGF0YVttZXRhbW9kZWxLZXldLiRraW5kID09PSBcIlNjaGVtYVwiKTtcblx0XHRpZiAoc2NoZW1hS2V5cyAmJiBzY2hlbWFLZXlzLmxlbmd0aCA+IDApIHtcblx0XHRcdG5hbWVzcGFjZSA9IHNjaGVtYUtleXNbMF0uc3Vic3RyKDAsIHNjaGVtYUtleXNbMF0ubGVuZ3RoIC0gMSk7XG5cdFx0fSBlbHNlIGlmIChlbnRpdHlUeXBlcyAmJiBlbnRpdHlUeXBlcy5sZW5ndGgpIHtcblx0XHRcdG5hbWVzcGFjZSA9IGVudGl0eVR5cGVzWzBdLmZ1bGx5UXVhbGlmaWVkTmFtZS5yZXBsYWNlKGVudGl0eVR5cGVzWzBdLm5hbWUsIFwiXCIpO1xuXHRcdFx0bmFtZXNwYWNlID0gbmFtZXNwYWNlLnN1YnN0cigwLCBuYW1lc3BhY2UubGVuZ3RoIC0gMSk7XG5cdFx0fVxuXHRcdE9iamVjdC5rZXlzKG9NZXRhTW9kZWxEYXRhKVxuXHRcdFx0LmZpbHRlcihlbnRpdHlUeXBlTmFtZSA9PiB7XG5cdFx0XHRcdHJldHVybiBlbnRpdHlUeXBlTmFtZSAhPT0gXCIka2luZFwiICYmIG9NZXRhTW9kZWxEYXRhW2VudGl0eVR5cGVOYW1lXS4ka2luZCA9PT0gXCJFbnRpdHlUeXBlXCI7XG5cdFx0XHR9KVxuXHRcdFx0LmZvckVhY2goZW50aXR5VHlwZU5hbWUgPT4ge1xuXHRcdFx0XHRjb25zdCBlbnRpdHlUeXBlID0gdGhpcy5wYXJzZUVudGl0eVR5cGUob01ldGFNb2RlbCwgZW50aXR5VHlwZU5hbWUsIGFubm90YXRpb25MaXN0cywgbmFtZXNwYWNlLCBvQ2FwYWJpbGl0aWVzKTtcblx0XHRcdFx0ZW50aXR5VHlwZS5lbnRpdHlQcm9wZXJ0aWVzLmZvckVhY2goZW50aXR5UHJvcGVydHkgPT4ge1xuXHRcdFx0XHRcdGlmICghb01ldGFNb2RlbERhdGEuJEFubm90YXRpb25zW2VudGl0eVByb3BlcnR5LmZ1bGx5UXVhbGlmaWVkTmFtZV0pIHtcblx0XHRcdFx0XHRcdG9NZXRhTW9kZWxEYXRhLiRBbm5vdGF0aW9uc1tlbnRpdHlQcm9wZXJ0eS5mdWxseVF1YWxpZmllZE5hbWVdID0ge307XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGlmICghb01ldGFNb2RlbERhdGEuJEFubm90YXRpb25zW2VudGl0eVByb3BlcnR5LmZ1bGx5UXVhbGlmaWVkTmFtZV1bXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkRGVmYXVsdFwiXSkge1xuXHRcdFx0XHRcdFx0b01ldGFNb2RlbERhdGEuJEFubm90YXRpb25zW2VudGl0eVByb3BlcnR5LmZ1bGx5UXVhbGlmaWVkTmFtZV1bXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkRGVmYXVsdFwiXSA9IHtcblx0XHRcdFx0XHRcdFx0JFR5cGU6IFwiY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRGF0YUZpZWxkXCIsXG5cdFx0XHRcdFx0XHRcdFZhbHVlOiB7ICRQYXRoOiBlbnRpdHlQcm9wZXJ0eS5uYW1lIH1cblx0XHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0XHR0aGlzLmNyZWF0ZUFubm90YXRpb25MaXN0cyhcblx0XHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRcdFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkRhdGFGaWVsZERlZmF1bHRcIjpcblx0XHRcdFx0XHRcdFx0XHRcdG9NZXRhTW9kZWxEYXRhLiRBbm5vdGF0aW9uc1tlbnRpdHlQcm9wZXJ0eS5mdWxseVF1YWxpZmllZE5hbWVdW1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcIkBjb20uc2FwLnZvY2FidWxhcmllcy5VSS52MS5EYXRhRmllbGREZWZhdWx0XCJcblx0XHRcdFx0XHRcdFx0XHRcdF1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0ZW50aXR5UHJvcGVydHkuZnVsbHlRdWFsaWZpZWROYW1lLFxuXHRcdFx0XHRcdFx0XHRhbm5vdGF0aW9uTGlzdHMsXG5cdFx0XHRcdFx0XHRcdG9DYXBhYmlsaXRpZXNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdFx0ZW50aXR5VHlwZXMucHVzaChlbnRpdHlUeXBlKTtcblx0XHRcdH0pO1xuXHRcdE9iamVjdC5rZXlzKG9FbnRpdHlTZXRzKVxuXHRcdFx0LmZpbHRlcihlbnRpdHlTZXROYW1lID0+IHtcblx0XHRcdFx0cmV0dXJuIGVudGl0eVNldE5hbWUgIT09IFwiJGtpbmRcIiAmJiBvRW50aXR5U2V0c1tlbnRpdHlTZXROYW1lXS4ka2luZCA9PT0gXCJFbnRpdHlTZXRcIjtcblx0XHRcdH0pXG5cdFx0XHQuZm9yRWFjaChlbnRpdHlTZXROYW1lID0+IHtcblx0XHRcdFx0Y29uc3QgZW50aXR5U2V0ID0gdGhpcy5wYXJzZUVudGl0eVNldChvTWV0YU1vZGVsLCBlbnRpdHlTZXROYW1lLCBhbm5vdGF0aW9uTGlzdHMsIGVudGl0eUNvbnRhaW5lck5hbWUsIG9DYXBhYmlsaXRpZXMpO1xuXHRcdFx0XHRlbnRpdHlTZXRzLnB1c2goZW50aXR5U2V0KTtcblx0XHRcdH0pO1xuXHRcdE9iamVjdC5rZXlzKG9FbnRpdHlTZXRzKVxuXHRcdFx0LmZpbHRlcihzaW5nbGV0b25OYW1lID0+IHtcblx0XHRcdFx0cmV0dXJuIHNpbmdsZXRvbk5hbWUgIT09IFwiJGtpbmRcIiAmJiBvRW50aXR5U2V0c1tzaW5nbGV0b25OYW1lXS4ka2luZCA9PT0gXCJTaW5nbGV0b25cIjtcblx0XHRcdH0pXG5cdFx0XHQuZm9yRWFjaChzaW5nbGV0b25OYW1lID0+IHtcblx0XHRcdFx0Y29uc3Qgc2luZ2xldG9uID0gdGhpcy5wYXJzZVNpbmdsZXRvbihvTWV0YU1vZGVsLCBzaW5nbGV0b25OYW1lLCBhbm5vdGF0aW9uTGlzdHMsIGVudGl0eUNvbnRhaW5lck5hbWUsIG9DYXBhYmlsaXRpZXMpO1xuXHRcdFx0XHRzaW5nbGV0b25zLnB1c2goc2luZ2xldG9uKTtcblx0XHRcdH0pO1xuXHRcdE9iamVjdC5rZXlzKG9NZXRhTW9kZWxEYXRhKVxuXHRcdFx0LmZpbHRlcihjb21wbGV4VHlwZU5hbWUgPT4ge1xuXHRcdFx0XHRyZXR1cm4gY29tcGxleFR5cGVOYW1lICE9PSBcIiRraW5kXCIgJiYgb01ldGFNb2RlbERhdGFbY29tcGxleFR5cGVOYW1lXS4ka2luZCA9PT0gXCJDb21wbGV4VHlwZVwiO1xuXHRcdFx0fSlcblx0XHRcdC5mb3JFYWNoKGNvbXBsZXhUeXBlTmFtZSA9PiB7XG5cdFx0XHRcdGNvbnN0IGNvbXBsZXhUeXBlID0gdGhpcy5wYXJzZUNvbXBsZXhUeXBlKG9NZXRhTW9kZWwsIGNvbXBsZXhUeXBlTmFtZSwgYW5ub3RhdGlvbkxpc3RzLCBuYW1lc3BhY2UsIG9DYXBhYmlsaXRpZXMpO1xuXHRcdFx0XHRjb21wbGV4VHlwZXMucHVzaChjb21wbGV4VHlwZSk7XG5cdFx0XHR9KTtcblx0XHRjb25zdCBvRW50aXR5Q29udGFpbmVyTmFtZSA9IE9iamVjdC5rZXlzKG9NZXRhTW9kZWxEYXRhKS5maW5kKGVudGl0eUNvbnRhaW5lck5hbWUgPT4ge1xuXHRcdFx0cmV0dXJuIGVudGl0eUNvbnRhaW5lck5hbWUgIT09IFwiJGtpbmRcIiAmJiBvTWV0YU1vZGVsRGF0YVtlbnRpdHlDb250YWluZXJOYW1lXS4ka2luZCA9PT0gXCJFbnRpdHlDb250YWluZXJcIjtcblx0XHR9KTtcblx0XHRsZXQgZW50aXR5Q29udGFpbmVyOiBFbnRpdHlDb250YWluZXIgPSB7fTtcblx0XHRpZiAob0VudGl0eUNvbnRhaW5lck5hbWUpIHtcblx0XHRcdGVudGl0eUNvbnRhaW5lciA9IHtcblx0XHRcdFx0bmFtZTogb0VudGl0eUNvbnRhaW5lck5hbWUucmVwbGFjZShuYW1lc3BhY2UgKyBcIi5cIiwgXCJcIiksXG5cdFx0XHRcdGZ1bGx5UXVhbGlmaWVkTmFtZTogb0VudGl0eUNvbnRhaW5lck5hbWVcblx0XHRcdH07XG5cdFx0fVxuXHRcdGVudGl0eVNldHMuZm9yRWFjaChlbnRpdHlTZXQgPT4ge1xuXHRcdFx0Y29uc3QgbmF2UHJvcGVydHlCaW5kaW5ncyA9IG9NZXRhTW9kZWxEYXRhW2VudGl0eUNvbnRhaW5lck5hbWVdW2VudGl0eVNldC5uYW1lXS4kTmF2aWdhdGlvblByb3BlcnR5QmluZGluZztcblx0XHRcdGlmIChuYXZQcm9wZXJ0eUJpbmRpbmdzKSB7XG5cdFx0XHRcdE9iamVjdC5rZXlzKG5hdlByb3BlcnR5QmluZGluZ3MpLmZvckVhY2gobmF2UHJvcE5hbWUgPT4ge1xuXHRcdFx0XHRcdGNvbnN0IHRhcmdldEVudGl0eVNldCA9IGVudGl0eVNldHMuZmluZChlbnRpdHlTZXROYW1lID0+IGVudGl0eVNldE5hbWUubmFtZSA9PT0gbmF2UHJvcGVydHlCaW5kaW5nc1tuYXZQcm9wTmFtZV0pO1xuXHRcdFx0XHRcdGlmICh0YXJnZXRFbnRpdHlTZXQpIHtcblx0XHRcdFx0XHRcdGVudGl0eVNldC5uYXZpZ2F0aW9uUHJvcGVydHlCaW5kaW5nW25hdlByb3BOYW1lXSA9IHRhcmdldEVudGl0eVNldDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Y29uc3QgYWN0aW9uczogQWN0aW9uW10gPSBPYmplY3Qua2V5cyhvTWV0YU1vZGVsRGF0YSlcblx0XHRcdC5maWx0ZXIoa2V5ID0+IHtcblx0XHRcdFx0cmV0dXJuIEFycmF5LmlzQXJyYXkob01ldGFNb2RlbERhdGFba2V5XSkgJiYgb01ldGFNb2RlbERhdGFba2V5XS5sZW5ndGggPiAwICYmIG9NZXRhTW9kZWxEYXRhW2tleV1bMF0uJGtpbmQgPT09IFwiQWN0aW9uXCI7XG5cdFx0XHR9KVxuXHRcdFx0LnJlZHVjZSgob3V0QWN0aW9uczogQWN0aW9uW10sIGFjdGlvbk5hbWUpID0+IHtcblx0XHRcdFx0Y29uc3QgYWN0aW9ucyA9IG9NZXRhTW9kZWxEYXRhW2FjdGlvbk5hbWVdO1xuXHRcdFx0XHRhY3Rpb25zLmZvckVhY2goKGFjdGlvbjogTWV0YU1vZGVsQWN0aW9uKSA9PiB7XG5cdFx0XHRcdFx0b3V0QWN0aW9ucy5wdXNoKHRoaXMucGFyc2VBY3Rpb24oYWN0aW9uTmFtZSwgYWN0aW9uLCBuYW1lc3BhY2UsIGVudGl0eUNvbnRhaW5lck5hbWUpKTtcblx0XHRcdFx0fSk7XG5cdFx0XHRcdHJldHVybiBvdXRBY3Rpb25zO1xuXHRcdFx0fSwgW10pO1xuXHRcdC8vIEZJWE1FIENyYXBweSBjb2RlIHRvIGRlYWwgd2l0aCBhbm5vdGF0aW9ucyBmb3IgZnVuY3Rpb25zXG5cdFx0Y29uc3QgYW5ub3RhdGlvbnMgPSBvTWV0YU1vZGVsRGF0YS4kQW5ub3RhdGlvbnM7XG5cdFx0Y29uc3QgYWN0aW9uQW5ub3RhdGlvbnMgPSBPYmplY3Qua2V5cyhhbm5vdGF0aW9ucykuZmlsdGVyKHRhcmdldCA9PiB0YXJnZXQuaW5kZXhPZihcIihcIikgIT09IC0xKTtcblx0XHRhY3Rpb25Bbm5vdGF0aW9ucy5mb3JFYWNoKHRhcmdldCA9PiB7XG5cdFx0XHR0aGlzLmNyZWF0ZUFubm90YXRpb25MaXN0cyhvTWV0YU1vZGVsRGF0YS4kQW5ub3RhdGlvbnNbdGFyZ2V0XSwgdGFyZ2V0LCBhbm5vdGF0aW9uTGlzdHMsIG9DYXBhYmlsaXRpZXMpO1xuXHRcdH0pO1xuXHRcdGNvbnN0IGFjdGlvbnNOYW1lV2l0aG91dE92ZXJsb2FkID0gYWN0aW9ucy5tYXAoYWN0aW9uID0+IGFjdGlvbi5mdWxseVF1YWxpZmllZE5hbWUuc3BsaXQoXCIoXCIpWzBdKTtcblx0XHRhY3Rpb25zTmFtZVdpdGhvdXRPdmVybG9hZC5mb3JFYWNoKGFjdGlvbk5hbWUgPT4ge1xuXHRcdFx0aWYgKGFubm90YXRpb25zLmhhc093blByb3BlcnR5KGFjdGlvbk5hbWUpKSB7XG5cdFx0XHRcdHRoaXMuY3JlYXRlQW5ub3RhdGlvbkxpc3RzKG9NZXRhTW9kZWxEYXRhLiRBbm5vdGF0aW9uc1thY3Rpb25OYW1lXSwgYWN0aW9uTmFtZSwgYW5ub3RhdGlvbkxpc3RzLCBvQ2FwYWJpbGl0aWVzKTtcblx0XHRcdH1cblx0XHR9KTtcblx0XHRjb25zdCBlbnRpdHlDb250YWluZXJBbm5vdGF0aW9ucyA9IGFubm90YXRpb25zW2VudGl0eUNvbnRhaW5lck5hbWVdO1xuXG5cdFx0Ly8gUmV0cmlldmUgRW50aXR5IENvbnRhaW5lciBhbm5vdGF0aW9uc1xuXHRcdGlmIChlbnRpdHlDb250YWluZXJBbm5vdGF0aW9ucykge1xuXHRcdFx0dGhpcy5jcmVhdGVBbm5vdGF0aW9uTGlzdHMoZW50aXR5Q29udGFpbmVyQW5ub3RhdGlvbnMsIGVudGl0eUNvbnRhaW5lck5hbWUsIGFubm90YXRpb25MaXN0cywgb0NhcGFiaWxpdGllcyk7XG5cdFx0fVxuXHRcdC8vIFNvcnQgYnkgdGFyZ2V0IGxlbmd0aFxuXHRcdGFubm90YXRpb25MaXN0cyA9IGFubm90YXRpb25MaXN0cy5zb3J0KChhLCBiKSA9PiAoYS50YXJnZXQubGVuZ3RoID49IGIudGFyZ2V0Lmxlbmd0aCA/IDEgOiAtMSkpO1xuXHRcdGNvbnN0IHJlZmVyZW5jZXM6IFJlZmVyZW5jZVtdID0gW107XG5cdFx0cmV0dXJuIHtcblx0XHRcdGlkZW50aWZpY2F0aW9uOiBcIm1ldGFtb2RlbFJlc3VsdFwiLFxuXHRcdFx0dmVyc2lvbjogXCI0LjBcIixcblx0XHRcdHNjaGVtYToge1xuXHRcdFx0XHRlbnRpdHlDb250YWluZXIsXG5cdFx0XHRcdGVudGl0eVNldHMsXG5cdFx0XHRcdGVudGl0eVR5cGVzLFxuXHRcdFx0XHRjb21wbGV4VHlwZXMsXG5cdFx0XHRcdHNpbmdsZXRvbnMsXG5cdFx0XHRcdGFzc29jaWF0aW9uczogW10sXG5cdFx0XHRcdGFjdGlvbnMsXG5cdFx0XHRcdG5hbWVzcGFjZSxcblx0XHRcdFx0YW5ub3RhdGlvbnM6IHtcblx0XHRcdFx0XHRcIm1ldGFtb2RlbFJlc3VsdFwiOiBhbm5vdGF0aW9uTGlzdHNcblx0XHRcdFx0fVxuXHRcdFx0fSxcblx0XHRcdHJlZmVyZW5jZXM6IHJlZmVyZW5jZXNcblx0XHR9O1xuXHR9XG59O1xuXG5jb25zdCBtTWV0YU1vZGVsTWFwOiBSZWNvcmQ8c3RyaW5nLCBQYXJzZXJPdXRwdXQ+ID0ge307XG5cbi8qKlxuICogQ29udmVydCB0aGUgT0RhdGFNZXRhTW9kZWwgaW50byBhbm90aGVyIGZvcm1hdCB0aGF0IGFsbG93IGZvciBlYXN5IG1hbmlwdWxhdGlvbiBvZiB0aGUgYW5ub3RhdGlvbnMuXG4gKlxuICogQHBhcmFtIHtPRGF0YU1ldGFNb2RlbH0gb01ldGFNb2RlbCBUaGUgY3VycmVudCBvRGF0YU1ldGFNb2RlbFxuICogQHBhcmFtIG9DYXBhYmlsaXRpZXMgVGhlIGN1cnJlbnQgY2FwYWJpbGl0aWVzXG4gKiBAcmV0dXJucyB7Q29udmVydGVyT3V0cHV0fSBBbiBvYmplY3QgY29udGFpbmluZyBvYmplY3QgbGlrZSBhbm5vdGF0aW9uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0VHlwZXMob01ldGFNb2RlbDogT0RhdGFNZXRhTW9kZWwsIG9DYXBhYmlsaXRpZXM/OiBFbnZpcm9ubWVudENhcGFiaWxpdGllcyk6IENvbnZlcnRlck91dHB1dCB7XG5cdGNvbnN0IHNNZXRhTW9kZWxJZCA9IChvTWV0YU1vZGVsIGFzIGFueSkuaWQ7XG5cdGlmICghbU1ldGFNb2RlbE1hcC5oYXNPd25Qcm9wZXJ0eShzTWV0YU1vZGVsSWQpKSB7XG5cdFx0Y29uc3QgcGFyc2VkT3V0cHV0ID0gTWV0YU1vZGVsQ29udmVydGVyLnBhcnNlRW50aXR5VHlwZXMob01ldGFNb2RlbCwgb0NhcGFiaWxpdGllcyk7XG5cdFx0bU1ldGFNb2RlbE1hcFtzTWV0YU1vZGVsSWRdID0gQW5ub3RhdGlvbkNvbnZlcnRlci5jb252ZXJ0VHlwZXMocGFyc2VkT3V0cHV0KTtcblx0fVxuXHRyZXR1cm4gKG1NZXRhTW9kZWxNYXBbc01ldGFNb2RlbElkXSBhcyBhbnkpIGFzIENvbnZlcnRlck91dHB1dDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlbGV0ZU1vZGVsQ2FjaGVEYXRhKG9NZXRhTW9kZWw6IE9EYXRhTWV0YU1vZGVsKSB7XG5cdGRlbGV0ZSBtTWV0YU1vZGVsTWFwWyhvTWV0YU1vZGVsIGFzIGFueSkuaWRdO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29udmVydE1ldGFNb2RlbENvbnRleHQob01ldGFNb2RlbENvbnRleHQ6IENvbnRleHQsIGJJbmNsdWRlVmlzaXRlZE9iamVjdHM6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XG5cdGNvbnN0IG9Db252ZXJ0ZXJPdXRwdXQgPSBjb252ZXJ0VHlwZXMoKG9NZXRhTW9kZWxDb250ZXh0LmdldE1vZGVsKCkgYXMgdW5rbm93bikgYXMgT0RhdGFNZXRhTW9kZWwpO1xuXHRjb25zdCBzUGF0aCA9IG9NZXRhTW9kZWxDb250ZXh0LmdldFBhdGgoKTtcblxuXHRjb25zdCBhUGF0aFNwbGl0ID0gc1BhdGguc3BsaXQoXCIvXCIpO1xuXHRsZXQgdGFyZ2V0RW50aXR5U2V0OiBfRW50aXR5U2V0ID0gb0NvbnZlcnRlck91dHB1dC5lbnRpdHlTZXRzLmZpbmQoZW50aXR5U2V0ID0+IGVudGl0eVNldC5uYW1lID09PSBhUGF0aFNwbGl0WzFdKSBhcyBfRW50aXR5U2V0O1xuXHRsZXQgcmVsYXRpdmVQYXRoID0gYVBhdGhTcGxpdC5zbGljZSgyKS5qb2luKFwiL1wiKTtcblxuXHRjb25zdCBsb2NhbE9iamVjdHM6IGFueVtdID0gW3RhcmdldEVudGl0eVNldF07XG5cdHdoaWxlIChyZWxhdGl2ZVBhdGggJiYgcmVsYXRpdmVQYXRoLmxlbmd0aCA+IDAgJiYgcmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgoXCIkTmF2aWdhdGlvblByb3BlcnR5QmluZGluZ1wiKSkge1xuXHRcdGxldCByZWxhdGl2ZVNwbGl0ID0gcmVsYXRpdmVQYXRoLnNwbGl0KFwiL1wiKTtcblx0XHRsZXQgaWR4ID0gMDtcblx0XHRsZXQgY3VycmVudEVudGl0eVNldCwgc05hdlByb3BUb0NoZWNrO1xuXG5cdFx0cmVsYXRpdmVTcGxpdCA9IHJlbGF0aXZlU3BsaXQuc2xpY2UoMSk7IC8vIFJlbW92aW5nIFwiJE5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmdcIlxuXHRcdHdoaWxlICghY3VycmVudEVudGl0eVNldCAmJiByZWxhdGl2ZVNwbGl0Lmxlbmd0aCA+IGlkeCAmJiByZWxhdGl2ZVNwbGl0W2lkeF0gIT09IFwiJE5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmdcIikge1xuXHRcdFx0Ly8gRmluZGluZyB0aGUgY29ycmVjdCBlbnRpdHlTZXQgZm9yIHRoZSBuYXZpZ2FpdG9uIHByb3BlcnR5IGJpbmRpbmcgZXhhbXBsZTogXCJTZXQvX1NhbGVzT3JkZXJcIlxuXHRcdFx0c05hdlByb3BUb0NoZWNrID0gcmVsYXRpdmVTcGxpdC5zbGljZSgwLCBpZHggKyAxKS5qb2luKFwiL1wiKTtcblx0XHRcdGN1cnJlbnRFbnRpdHlTZXQgPSB0YXJnZXRFbnRpdHlTZXQgJiYgdGFyZ2V0RW50aXR5U2V0Lm5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmdbc05hdlByb3BUb0NoZWNrXTtcblx0XHRcdGlkeCsrO1xuXHRcdH1cblx0XHRpZiAoIWN1cnJlbnRFbnRpdHlTZXQpIHtcblx0XHRcdC8vIEZhbGwgYmFjayB0byBTaW5nbGUgbmF2IHByb3AgaWYgZW50aXR5U2V0IGlzIG5vdCBmb3VuZC5cblx0XHRcdHNOYXZQcm9wVG9DaGVjayA9IHJlbGF0aXZlU3BsaXRbMF07XG5cdFx0fVxuXHRcdGNvbnN0IGFOYXZQcm9wcyA9IHNOYXZQcm9wVG9DaGVjaz8uc3BsaXQoXCIvXCIpIHx8IFtdO1xuXHRcdGxldCB0YXJnZXRFbnRpdHlUeXBlID0gdGFyZ2V0RW50aXR5U2V0ICYmIHRhcmdldEVudGl0eVNldC5lbnRpdHlUeXBlO1xuXHRcdGZvciAoY29uc3Qgc05hdlByb3Agb2YgYU5hdlByb3BzKSB7XG5cdFx0XHQvLyBQdXNoaW5nIGFsbCBuYXYgcHJvcHMgdG8gdGhlIHZpc2l0ZWQgb2JqZWN0cy4gZXhhbXBsZTogXCJTZXRcIiwgXCJfU2FsZXNPcmRlclwiIGZvciBcIlNldC9fU2FsZXNPcmRlclwiKGluIE5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmcpXG5cdFx0XHRjb25zdCB0YXJnZXROYXZQcm9wID0gdGFyZ2V0RW50aXR5VHlwZSAmJiB0YXJnZXRFbnRpdHlUeXBlLm5hdmlnYXRpb25Qcm9wZXJ0aWVzLmZpbmQobmF2UHJvcCA9PiBuYXZQcm9wLm5hbWUgPT09IHNOYXZQcm9wKTtcblx0XHRcdGlmICh0YXJnZXROYXZQcm9wKSB7XG5cdFx0XHRcdGxvY2FsT2JqZWN0cy5wdXNoKHRhcmdldE5hdlByb3ApO1xuXHRcdFx0XHR0YXJnZXRFbnRpdHlUeXBlID0gdGFyZ2V0TmF2UHJvcC50YXJnZXRUeXBlO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fVxuXHRcdHRhcmdldEVudGl0eVNldCA9XG5cdFx0XHQodGFyZ2V0RW50aXR5U2V0ICYmIGN1cnJlbnRFbnRpdHlTZXQpIHx8ICh0YXJnZXRFbnRpdHlTZXQgJiYgdGFyZ2V0RW50aXR5U2V0Lm5hdmlnYXRpb25Qcm9wZXJ0eUJpbmRpbmdbcmVsYXRpdmVTcGxpdFswXV0pO1xuXHRcdGlmICh0YXJnZXRFbnRpdHlTZXQpIHtcblx0XHRcdC8vIFB1c2hpbmcgdGhlIHRhcmdldCBlbnRpdHlTZXQgdG8gdmlzaXRlZCBvYmplY3RzXG5cdFx0XHRsb2NhbE9iamVjdHMucHVzaCh0YXJnZXRFbnRpdHlTZXQpO1xuXHRcdH1cblx0XHQvLyBSZS1jYWxjdWxhdGluZyB0aGUgcmVsYXRpdmUgcGF0aFxuXHRcdHJlbGF0aXZlUGF0aCA9IHJlbGF0aXZlU3BsaXQuc2xpY2UoYU5hdlByb3BzLmxlbmd0aCB8fCAxKS5qb2luKFwiL1wiKTtcblx0fVxuXHRpZiAocmVsYXRpdmVQYXRoLnN0YXJ0c1dpdGgoXCIkVHlwZVwiKSkge1xuXHRcdC8vIFdlJ3JlIGFueXdheSBnb2luZyB0byBsb29rIG9uIHRoZSBlbnRpdHlUeXBlLi4uXG5cdFx0cmVsYXRpdmVQYXRoID0gYVBhdGhTcGxpdC5zbGljZSgzKS5qb2luKFwiL1wiKTtcblx0fVxuXHRpZiAodGFyZ2V0RW50aXR5U2V0ICYmIHJlbGF0aXZlUGF0aC5sZW5ndGgpIHtcblx0XHRjb25zdCBvVGFyZ2V0ID0gdGFyZ2V0RW50aXR5U2V0LmVudGl0eVR5cGUucmVzb2x2ZVBhdGgocmVsYXRpdmVQYXRoLCBiSW5jbHVkZVZpc2l0ZWRPYmplY3RzKTtcblx0XHRpZiAob1RhcmdldCkge1xuXHRcdFx0aWYgKGJJbmNsdWRlVmlzaXRlZE9iamVjdHMpIHtcblx0XHRcdFx0b1RhcmdldC52aXNpdGVkT2JqZWN0cyA9IGxvY2FsT2JqZWN0cy5jb25jYXQob1RhcmdldC52aXNpdGVkT2JqZWN0cyk7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIGlmICh0YXJnZXRFbnRpdHlTZXQuZW50aXR5VHlwZSAmJiB0YXJnZXRFbnRpdHlTZXQuZW50aXR5VHlwZS5hY3Rpb25zKSB7XG5cdFx0XHQvLyBpZiB0YXJnZXQgaXMgYW4gYWN0aW9uIG9yIGFuIGFjdGlvbiBwYXJhbWV0ZXJcblx0XHRcdGNvbnN0IGFjdGlvbnMgPSB0YXJnZXRFbnRpdHlTZXQuZW50aXR5VHlwZSAmJiB0YXJnZXRFbnRpdHlTZXQuZW50aXR5VHlwZS5hY3Rpb25zO1xuXHRcdFx0Y29uc3QgcmVsYXRpdmVTcGxpdCA9IHJlbGF0aXZlUGF0aC5zcGxpdChcIi9cIik7XG5cdFx0XHRpZiAoYWN0aW9uc1tyZWxhdGl2ZVNwbGl0WzBdXSkge1xuXHRcdFx0XHRjb25zdCBhY3Rpb24gPSBhY3Rpb25zW3JlbGF0aXZlU3BsaXRbMF1dO1xuXHRcdFx0XHRpZiAocmVsYXRpdmVTcGxpdFsxXSAmJiBhY3Rpb24ucGFyYW1ldGVycykge1xuXHRcdFx0XHRcdGNvbnN0IHBhcmFtZXRlck5hbWUgPSByZWxhdGl2ZVNwbGl0WzFdO1xuXHRcdFx0XHRcdGNvbnN0IHRhcmdldFBhcmFtZXRlciA9IGFjdGlvbi5wYXJhbWV0ZXJzLmZpbmQocGFyYW1ldGVyID0+IHtcblx0XHRcdFx0XHRcdHJldHVybiBwYXJhbWV0ZXIuZnVsbHlRdWFsaWZpZWROYW1lLmVuZHNXaXRoKFwiL1wiICsgcGFyYW1ldGVyTmFtZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0cmV0dXJuIHRhcmdldFBhcmFtZXRlcjtcblx0XHRcdFx0fSBlbHNlIGlmIChyZWxhdGl2ZVBhdGgubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdFx0cmV0dXJuIGFjdGlvbjtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0XHRyZXR1cm4gb1RhcmdldDtcblx0fSBlbHNlIHtcblx0XHRpZiAoYkluY2x1ZGVWaXNpdGVkT2JqZWN0cykge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0dGFyZ2V0OiB0YXJnZXRFbnRpdHlTZXQsXG5cdFx0XHRcdHZpc2l0ZWRPYmplY3RzOiBsb2NhbE9iamVjdHNcblx0XHRcdH07XG5cdFx0fVxuXHRcdHJldHVybiB0YXJnZXRFbnRpdHlTZXQ7XG5cdH1cbn1cblxudHlwZSBDb252ZXJ0ZXJPYmplY3QgPSB7XG5cdF90eXBlOiBzdHJpbmc7XG5cdG5hbWU6IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBSZXNvbHZlZFRhcmdldCA9IHtcblx0dGFyZ2V0PzogQ29udmVydGVyT2JqZWN0O1xuXHR2aXNpdGVkT2JqZWN0czogQ29udmVydGVyT2JqZWN0W107XG59O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzKG9NZXRhTW9kZWxDb250ZXh0OiBDb250ZXh0LCBvRW50aXR5U2V0TWV0YU1vZGVsQ29udGV4dD86IENvbnRleHQpOiBEYXRhTW9kZWxPYmplY3RQYXRoIHtcblx0Y29uc3QgbWV0YU1vZGVsQ29udGV4dCA9IGNvbnZlcnRNZXRhTW9kZWxDb250ZXh0KG9NZXRhTW9kZWxDb250ZXh0LCB0cnVlKTtcblx0bGV0IHRhcmdldEVudGl0eVNldExvY2F0aW9uO1xuXHRpZiAob0VudGl0eVNldE1ldGFNb2RlbENvbnRleHQgJiYgb0VudGl0eVNldE1ldGFNb2RlbENvbnRleHQuZ2V0UGF0aCgpICE9PSBcIi9cIikge1xuXHRcdHRhcmdldEVudGl0eVNldExvY2F0aW9uID0gZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RzKG9FbnRpdHlTZXRNZXRhTW9kZWxDb250ZXh0KTtcblx0fVxuXHRyZXR1cm4gZ2V0SW52b2x2ZWREYXRhTW9kZWxPYmplY3RGcm9tUGF0aChtZXRhTW9kZWxDb250ZXh0LCB0YXJnZXRFbnRpdHlTZXRMb2NhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbnZvbHZlZERhdGFNb2RlbE9iamVjdEZyb21QYXRoKFxuXHRtZXRhTW9kZWxDb250ZXh0OiBSZXNvbHZlZFRhcmdldCxcblx0dGFyZ2V0RW50aXR5U2V0TG9jYXRpb24/OiBEYXRhTW9kZWxPYmplY3RQYXRoXG4pOiBEYXRhTW9kZWxPYmplY3RQYXRoIHtcblx0Y29uc3QgZGF0YU1vZGVsT2JqZWN0cyA9IG1ldGFNb2RlbENvbnRleHQudmlzaXRlZE9iamVjdHMuZmlsdGVyKFxuXHRcdCh2aXNpdGVkT2JqZWN0OiBhbnkpID0+IHZpc2l0ZWRPYmplY3QgJiYgdmlzaXRlZE9iamVjdC5oYXNPd25Qcm9wZXJ0eShcIl90eXBlXCIpICYmIHZpc2l0ZWRPYmplY3QuX3R5cGUgIT09IFwiRW50aXR5VHlwZVwiXG5cdCk7XG5cdGlmIChtZXRhTW9kZWxDb250ZXh0LnRhcmdldCAmJiBtZXRhTW9kZWxDb250ZXh0LnRhcmdldC5oYXNPd25Qcm9wZXJ0eShcIl90eXBlXCIpICYmIG1ldGFNb2RlbENvbnRleHQudGFyZ2V0Ll90eXBlICE9PSBcIkVudGl0eVR5cGVcIikge1xuXHRcdGRhdGFNb2RlbE9iamVjdHMucHVzaChtZXRhTW9kZWxDb250ZXh0LnRhcmdldCk7XG5cdH1cblx0Y29uc3QgbmF2aWdhdGlvblByb3BlcnRpZXM6IF9OYXZpZ2F0aW9uUHJvcGVydHlbXSA9IFtdO1xuXHRjb25zdCByb290RW50aXR5U2V0OiBfRW50aXR5U2V0ID0gZGF0YU1vZGVsT2JqZWN0c1swXSBhcyBfRW50aXR5U2V0O1xuXHQvLyBjdXJyZW50RW50aXR5U2V0IGNhbiBiZSB1bmRlZmluZWQuXG5cdGxldCBjdXJyZW50RW50aXR5U2V0OiBfRW50aXR5U2V0IHwgdW5kZWZpbmVkID0gcm9vdEVudGl0eVNldCBhcyBfRW50aXR5U2V0O1xuXHRsZXQgY3VycmVudEVudGl0eVR5cGU6IF9FbnRpdHlUeXBlID0gcm9vdEVudGl0eVNldC5lbnRpdHlUeXBlO1xuXHRsZXQgaSA9IDE7XG5cdGxldCBjdXJyZW50T2JqZWN0O1xuXHRsZXQgbmF2aWdhdGVkUGF0aHMgPSBbXTtcblx0d2hpbGUgKGkgPCBkYXRhTW9kZWxPYmplY3RzLmxlbmd0aCkge1xuXHRcdGN1cnJlbnRPYmplY3QgPSBkYXRhTW9kZWxPYmplY3RzW2krK107XG5cdFx0aWYgKGN1cnJlbnRPYmplY3QuX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIpIHtcblx0XHRcdG5hdmlnYXRlZFBhdGhzLnB1c2goY3VycmVudE9iamVjdC5uYW1lKTtcblx0XHRcdG5hdmlnYXRpb25Qcm9wZXJ0aWVzLnB1c2goY3VycmVudE9iamVjdCBhcyBfTmF2aWdhdGlvblByb3BlcnR5KTtcblx0XHRcdGN1cnJlbnRFbnRpdHlUeXBlID0gKGN1cnJlbnRPYmplY3QgYXMgX05hdmlnYXRpb25Qcm9wZXJ0eSkudGFyZ2V0VHlwZTtcblx0XHRcdGlmIChjdXJyZW50RW50aXR5U2V0ICYmIGN1cnJlbnRFbnRpdHlTZXQubmF2aWdhdGlvblByb3BlcnR5QmluZGluZy5oYXNPd25Qcm9wZXJ0eShuYXZpZ2F0ZWRQYXRocy5qb2luKFwiL1wiKSkpIHtcblx0XHRcdFx0Y3VycmVudEVudGl0eVNldCA9IGN1cnJlbnRFbnRpdHlTZXQubmF2aWdhdGlvblByb3BlcnR5QmluZGluZ1tjdXJyZW50T2JqZWN0Lm5hbWVdO1xuXHRcdFx0XHRuYXZpZ2F0ZWRQYXRocyA9IFtdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0Y3VycmVudEVudGl0eVNldCA9IHVuZGVmaW5lZDtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYgKGN1cnJlbnRPYmplY3QuX3R5cGUgPT09IFwiRW50aXR5U2V0XCIpIHtcblx0XHRcdGN1cnJlbnRFbnRpdHlTZXQgPSBjdXJyZW50T2JqZWN0IGFzIF9FbnRpdHlTZXQ7XG5cdFx0XHRjdXJyZW50RW50aXR5VHlwZSA9IGN1cnJlbnRFbnRpdHlTZXQuZW50aXR5VHlwZTtcblx0XHR9XG5cdH1cblxuXHRpZiAodGFyZ2V0RW50aXR5U2V0TG9jYXRpb24gJiYgdGFyZ2V0RW50aXR5U2V0TG9jYXRpb24uc3RhcnRpbmdFbnRpdHlTZXQgIT09IHJvb3RFbnRpdHlTZXQpIHtcblx0XHQvLyBJbiBjYXNlIHRoZSBlbnRpdHlzZXQgaXMgbm90IHN0YXJ0aW5nIGZyb20gdGhlIHNhbWUgbG9jYXRpb24gaXQgbWF5IG1lYW4gdGhhdCB3ZSBhcmUgZG9pbmcgdG9vIG11Y2ggd29yayBlYXJsaWVyIGZvciBzb21lIHJlYXNvblxuXHRcdC8vIEFzIHN1Y2ggd2UgbmVlZCB0byByZWRlZmluZSB0aGUgY29udGV4dCBzb3VyY2UgZm9yIHRoZSB0YXJnZXRFbnRpdHlTZXRMb2NhdGlvblxuXHRcdGNvbnN0IHN0YXJ0aW5nSW5kZXggPSBkYXRhTW9kZWxPYmplY3RzLmluZGV4T2YodGFyZ2V0RW50aXR5U2V0TG9jYXRpb24uc3RhcnRpbmdFbnRpdHlTZXQpO1xuXHRcdGlmIChzdGFydGluZ0luZGV4ICE9PSAtMSkge1xuXHRcdFx0Ly8gSWYgaXQncyBub3QgZm91bmQgSSBkb24ndCBrbm93IHdoYXQgd2UgY2FuIGRvIChwcm9iYWJseSBub3RoaW5nKVxuXHRcdFx0Y29uc3QgcmVxdWlyZWREYXRhTW9kZWxPYmplY3RzID0gZGF0YU1vZGVsT2JqZWN0cy5zbGljZSgwLCBzdGFydGluZ0luZGV4KTtcblx0XHRcdHRhcmdldEVudGl0eVNldExvY2F0aW9uLnN0YXJ0aW5nRW50aXR5U2V0ID0gcm9vdEVudGl0eVNldDtcblx0XHRcdHRhcmdldEVudGl0eVNldExvY2F0aW9uLm5hdmlnYXRpb25Qcm9wZXJ0aWVzID0gcmVxdWlyZWREYXRhTW9kZWxPYmplY3RzXG5cdFx0XHRcdC5maWx0ZXIoKG9iamVjdDogYW55KSA9PiBvYmplY3QuX3R5cGUgPT09IFwiTmF2aWdhdGlvblByb3BlcnR5XCIpXG5cdFx0XHRcdC5jb25jYXQodGFyZ2V0RW50aXR5U2V0TG9jYXRpb24ubmF2aWdhdGlvblByb3BlcnRpZXMpIGFzIF9OYXZpZ2F0aW9uUHJvcGVydHlbXTtcblx0XHR9XG5cdH1cblx0Y29uc3Qgb3V0RGF0YU1vZGVsUGF0aCA9IHtcblx0XHRzdGFydGluZ0VudGl0eVNldDogcm9vdEVudGl0eVNldCxcblx0XHR0YXJnZXRFbnRpdHlTZXQ6IGN1cnJlbnRFbnRpdHlTZXQsXG5cdFx0dGFyZ2V0RW50aXR5VHlwZTogY3VycmVudEVudGl0eVR5cGUsXG5cdFx0dGFyZ2V0T2JqZWN0OiBtZXRhTW9kZWxDb250ZXh0LnRhcmdldCxcblx0XHRuYXZpZ2F0aW9uUHJvcGVydGllcyxcblx0XHRjb250ZXh0TG9jYXRpb246IHRhcmdldEVudGl0eVNldExvY2F0aW9uXG5cdH07XG5cdGlmICghb3V0RGF0YU1vZGVsUGF0aC5jb250ZXh0TG9jYXRpb24pIHtcblx0XHRvdXREYXRhTW9kZWxQYXRoLmNvbnRleHRMb2NhdGlvbiA9IG91dERhdGFNb2RlbFBhdGg7XG5cdH1cblx0cmV0dXJuIG91dERhdGFNb2RlbFBhdGg7XG59XG4iXX0=