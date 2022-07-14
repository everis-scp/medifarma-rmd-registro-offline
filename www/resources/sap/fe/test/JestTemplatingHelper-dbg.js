/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/macros/internal/Field.metadata", "sap/fe/macros/PhantomUtil", "sap/ui/model/odata/v4/lib/_MetadataRequestor", "sap/ui/model/odata/v4/ODataMetaModel", "sap/ui/core/util/XMLPreprocessor", "sap/base/Log", "xpath", "fs", "@sap/cds-compiler", "prettier", "sap/ui/base/BindingParser", "sap/ui/model/json/JSONModel", "sap/ui/core/InvisibleText", "sap/base/util/merge", "path", "sap/fe/core/converters/ConverterContext", "sap/fe/core/services/SideEffectsServiceFactory"], function (FieldMetadata, PhantomUtil, _MetadataRequestor, ODataMetaModel, XMLPreprocessor, Log, xpath, fs, cds_compiler, prettier, BindingParser, JSONModel, InvisibleText, merge, path, ConverterContext, SideEffectsFactory) {
  "use strict";

  var _exports = {};
  var format = prettier.format;
  var to = cds_compiler.to;
  var compileSources = cds_compiler.compileSources;
  var compactModel = cds_compiler.compactModel;

  PhantomUtil.register(FieldMetadata);
  Log.setLevel(1, "sap.ui.core.util.XMLPreprocessor");
  jest.setTimeout(40000);
  var nameSpaceMap = {
    "macros": "sap.fe.macros",
    "macro": "sap.fe.macros",
    "macrodata": "http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1",
    "log": "http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1",
    "unittest": "http://schemas.sap.com/sapui5/preprocessorextension/sap.fe.unittesting/1",
    "control": "sap.fe.core.controls",
    "core": "sap.ui.core",
    "m": "sap.m",
    "f": "sap.ui.layout.form",
    "mdc": "sap.ui.mdc",
    "mdcField": "sap.ui.mdc.field",
    "u": "sap.ui.unified",
    "macroMicroChart": "sap.fe.macros.microchart",
    "microChart": "sap.suite.ui.microchart"
  };
  var select = xpath.useNamespaces(nameSpaceMap);

  var registerMacro = function (macroMetadata) {
    PhantomUtil.register(macroMetadata);
  };

  _exports.registerMacro = registerMacro;

  var runXPathQuery = function (selector, xmldom) {
    return select(selector, xmldom);
  };

  expect.extend({
    toHaveControl: function (xmldom, selector) {
      var nodes = runXPathQuery("/root".concat(selector), xmldom);
      return {
        message: function () {
          var outputXml = serializeXML(xmldom);
          return "did not find controls matching ".concat(selector, " in generated xml:\n ").concat(outputXml);
        },
        pass: nodes && nodes.length >= 1
      };
    },
    toNotHaveControl: function (xmldom, selector) {
      var nodes = runXPathQuery("/root".concat(selector), xmldom);
      return {
        message: function () {
          var outputXml = serializeXML(xmldom);
          return "There is a control matching ".concat(selector, " in generated xml:\n ").concat(outputXml);
        },
        pass: nodes && nodes.length === 0
      };
    }
  });
  _exports.runXPathQuery = runXPathQuery;

  var getControlAttribute = function (controlSelector, attributeName, xmlDom) {
    var selector = "string(/root".concat(controlSelector, "/@").concat(attributeName, ")");
    return runXPathQuery(selector, xmlDom);
  };

  _exports.getControlAttribute = getControlAttribute;

  var serializeXML = function (xmlDom) {
    var serializer = new window.XMLSerializer();
    var xmlString = serializer.serializeToString(xmlDom).replace(/(?:[\t ]*(?:\r?\n|\r))+/g, "\n").replace(/\\"/g, '"');
    return format(xmlString, {
      parser: "html"
    });
  };
  /**
   * Compile a CDS file into an EDMX file.
   *
   * @param {string} sCDSUrl The path to the file containing the CDS definition. This file MUST declare the namespace
   * sap.fe.test and a service JestService
   * @returns {string} The path of the generated EDMX
   */


  _exports.serializeXML = serializeXML;

  var compileCDS = function (sCDSUrl) {
    var cdsString = fs.readFileSync(sCDSUrl, "utf-8");
    var csn = compileSources({
      "string.cds": cdsString
    }, {});
    var csnModel = compactModel(csn);
    var edmxContent = to.edmx(csnModel, {
      service: "sap.fe.test.JestService"
    });
    var dir = path.resolve(sCDSUrl, "..", "gen");
    var edmxUrl = path.resolve(dir, path.basename(sCDSUrl).replace(".cds", ".xml"));

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }

    fs.writeFileSync(edmxUrl, edmxContent);
    return edmxUrl;
  };

  _exports.compileCDS = compileCDS;

  var getFakeSideEffectsService = function (oMetaModel) {
    try {
      var oServiceContext = {
        scopeObject: {},
        scopeType: "",
        settings: {}
      };
      return Promise.resolve(new SideEffectsFactory().createInstance(oServiceContext).then(function (oServiceInstance) {
        var oJestSideEffectsService = oServiceInstance.getInterface();

        oJestSideEffectsService.getContext = function () {
          return {
            scopeObject: {
              getModel: function () {
                return {
                  getMetaModel: function () {
                    return oMetaModel;
                  }
                };
              }
            }
          };
        };

        return oJestSideEffectsService;
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _exports.getFakeSideEffectsService = getFakeSideEffectsService;

  var getFakeDiagnostics = function () {
    var issues = [];
    return {
      addIssue: function (issueCategory, issueSeverity, details) {
        issues.push({
          issueCategory: issueCategory,
          issueSeverity: issueSeverity,
          details: details
        });
      },
      getIssues: function () {
        return issues;
      },
      checkIfIssueExists: function (issueCategory, issueSeverity, details) {
        return issues.find(function (issue) {
          issue.issueCategory === issueCategory && issue.issueSeverity === issueSeverity && issue.details === details;
        });
      }
    };
  };

  _exports.getFakeDiagnostics = getFakeDiagnostics;

  var getConverterContextForTest = function (convertedTypes, manifestSettings) {
    var entitySet = convertedTypes.entitySets.find(function (es) {
      return es.name === manifestSettings.entitySet;
    });
    var dataModelPath = getDataModelObjectPathForProperty(entitySet, entitySet);
    return new ConverterContext(convertedTypes, manifestSettings, getFakeDiagnostics(), merge, dataModelPath);
  };

  _exports.getConverterContextForTest = getConverterContextForTest;
  var metaModelCache = {};

  var getMetaModel = function (sMetadataUrl) {
    try {
      function _temp3() {
        return metaModelCache[sMetadataUrl];
      }

      var oRequestor = _MetadataRequestor.create({}, "4.0", {});

      var _temp4 = function () {
        if (!metaModelCache[sMetadataUrl]) {
          var oMetaModel = new ODataMetaModel(oRequestor, sMetadataUrl, undefined, null);
          return Promise.resolve(oMetaModel.fetchEntityContainer()).then(function () {
            metaModelCache[sMetadataUrl] = oMetaModel;
          });
        }
      }();

      return Promise.resolve(_temp4 && _temp4.then ? _temp4.then(_temp3) : _temp3(_temp4));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _exports.getMetaModel = getMetaModel;

  var getDataModelObjectPathForProperty = function (entitySet, property) {
    var targetPath = {
      startingEntitySet: entitySet,
      navigationProperties: [],
      targetObject: property,
      targetEntitySet: entitySet,
      targetEntityType: entitySet.entityType
    };
    targetPath.contextLocation = targetPath;
    return targetPath;
  };

  _exports.getDataModelObjectPathForProperty = getDataModelObjectPathForProperty;

  var evaluateBinding = function (bindingString) {
    var bindingElement = BindingParser.complexParser(bindingString);

    for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return bindingElement.formatter.apply(undefined, args);
  };

  _exports.evaluateBinding = evaluateBinding;

  var evaluateBindingWithModel = function (bindingString, modelContent) {
    var bindingElement = BindingParser.complexParser(bindingString);
    var jsonModel = new JSONModel(modelContent);
    var text = new InvisibleText();
    text.bindProperty("text", bindingElement);
    text.setModel(jsonModel);
    text.setBindingContext(jsonModel.createBindingContext("/"));
    return text.getText();
  };

  _exports.evaluateBindingWithModel = evaluateBindingWithModel;

  var getTemplatingResult = function (xmlInput, sMetadataUrl, mBindingContexts, mModels) {
    try {
      var templatedXml = "<root>".concat(xmlInput, "</root>");
      var parser = new window.DOMParser();
      var xmlDoc = parser.parseFromString(templatedXml, "text/xml");
      return Promise.resolve(getMetaModel(sMetadataUrl)).then(function (oMetaModel) {
        var oPreprocessorSettings = {
          models: Object.assign({
            metaModel: oMetaModel
          }, mModels),
          bindingContexts: {}
        }; //Inject models and bindingContexts

        Object.keys(mBindingContexts).forEach(function (sKey) {
          /* Assert to make sure the annotations are in the test metadata -> avoid misleading tests */
          expect(typeof oMetaModel.getObject(mBindingContexts[sKey])).toBeDefined();
          var oModel = mModels[sKey] || oMetaModel;
          oPreprocessorSettings.bindingContexts[sKey] = oModel.createBindingContext(mBindingContexts[sKey]); //Value is sPath

          oPreprocessorSettings.models[sKey] = oModel;
        }); //This context for macro testing

        if (oPreprocessorSettings.models["this"]) {
          oPreprocessorSettings.bindingContexts["this"] = oPreprocessorSettings.models["this"].createBindingContext("/");
        }

        return XMLPreprocessor.process(xmlDoc.firstElementChild, {
          name: "Test Fragment"
        }, oPreprocessorSettings);
      });
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _exports.getTemplatingResult = getTemplatingResult;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkplc3RUZW1wbGF0aW5nSGVscGVyLnRzIl0sIm5hbWVzIjpbIlBoYW50b21VdGlsIiwicmVnaXN0ZXIiLCJGaWVsZE1ldGFkYXRhIiwiTG9nIiwic2V0TGV2ZWwiLCJqZXN0Iiwic2V0VGltZW91dCIsIm5hbWVTcGFjZU1hcCIsInNlbGVjdCIsInhwYXRoIiwidXNlTmFtZXNwYWNlcyIsInJlZ2lzdGVyTWFjcm8iLCJtYWNyb01ldGFkYXRhIiwicnVuWFBhdGhRdWVyeSIsInNlbGVjdG9yIiwieG1sZG9tIiwiZXhwZWN0IiwiZXh0ZW5kIiwidG9IYXZlQ29udHJvbCIsIm5vZGVzIiwibWVzc2FnZSIsIm91dHB1dFhtbCIsInNlcmlhbGl6ZVhNTCIsInBhc3MiLCJsZW5ndGgiLCJ0b05vdEhhdmVDb250cm9sIiwiZ2V0Q29udHJvbEF0dHJpYnV0ZSIsImNvbnRyb2xTZWxlY3RvciIsImF0dHJpYnV0ZU5hbWUiLCJ4bWxEb20iLCJzZXJpYWxpemVyIiwid2luZG93IiwiWE1MU2VyaWFsaXplciIsInhtbFN0cmluZyIsInNlcmlhbGl6ZVRvU3RyaW5nIiwicmVwbGFjZSIsImZvcm1hdCIsInBhcnNlciIsImNvbXBpbGVDRFMiLCJzQ0RTVXJsIiwiY2RzU3RyaW5nIiwiZnMiLCJyZWFkRmlsZVN5bmMiLCJjc24iLCJjb21waWxlU291cmNlcyIsImNzbk1vZGVsIiwiY29tcGFjdE1vZGVsIiwiZWRteENvbnRlbnQiLCJ0byIsImVkbXgiLCJzZXJ2aWNlIiwiZGlyIiwicGF0aCIsInJlc29sdmUiLCJlZG14VXJsIiwiYmFzZW5hbWUiLCJleGlzdHNTeW5jIiwibWtkaXJTeW5jIiwid3JpdGVGaWxlU3luYyIsImdldEZha2VTaWRlRWZmZWN0c1NlcnZpY2UiLCJvTWV0YU1vZGVsIiwib1NlcnZpY2VDb250ZXh0Iiwic2NvcGVPYmplY3QiLCJzY29wZVR5cGUiLCJzZXR0aW5ncyIsIlNpZGVFZmZlY3RzRmFjdG9yeSIsImNyZWF0ZUluc3RhbmNlIiwidGhlbiIsIm9TZXJ2aWNlSW5zdGFuY2UiLCJvSmVzdFNpZGVFZmZlY3RzU2VydmljZSIsImdldEludGVyZmFjZSIsImdldENvbnRleHQiLCJnZXRNb2RlbCIsImdldE1ldGFNb2RlbCIsImdldEZha2VEaWFnbm9zdGljcyIsImlzc3VlcyIsImFkZElzc3VlIiwiaXNzdWVDYXRlZ29yeSIsImlzc3VlU2V2ZXJpdHkiLCJkZXRhaWxzIiwicHVzaCIsImdldElzc3VlcyIsImNoZWNrSWZJc3N1ZUV4aXN0cyIsImZpbmQiLCJpc3N1ZSIsImdldENvbnZlcnRlckNvbnRleHRGb3JUZXN0IiwiY29udmVydGVkVHlwZXMiLCJtYW5pZmVzdFNldHRpbmdzIiwiZW50aXR5U2V0IiwiZW50aXR5U2V0cyIsImVzIiwibmFtZSIsImRhdGFNb2RlbFBhdGgiLCJnZXREYXRhTW9kZWxPYmplY3RQYXRoRm9yUHJvcGVydHkiLCJDb252ZXJ0ZXJDb250ZXh0IiwibWVyZ2UiLCJtZXRhTW9kZWxDYWNoZSIsInNNZXRhZGF0YVVybCIsIm9SZXF1ZXN0b3IiLCJfTWV0YWRhdGFSZXF1ZXN0b3IiLCJjcmVhdGUiLCJPRGF0YU1ldGFNb2RlbCIsInVuZGVmaW5lZCIsImZldGNoRW50aXR5Q29udGFpbmVyIiwicHJvcGVydHkiLCJ0YXJnZXRQYXRoIiwic3RhcnRpbmdFbnRpdHlTZXQiLCJuYXZpZ2F0aW9uUHJvcGVydGllcyIsInRhcmdldE9iamVjdCIsInRhcmdldEVudGl0eVNldCIsInRhcmdldEVudGl0eVR5cGUiLCJlbnRpdHlUeXBlIiwiY29udGV4dExvY2F0aW9uIiwiZXZhbHVhdGVCaW5kaW5nIiwiYmluZGluZ1N0cmluZyIsImJpbmRpbmdFbGVtZW50IiwiQmluZGluZ1BhcnNlciIsImNvbXBsZXhQYXJzZXIiLCJhcmdzIiwiZm9ybWF0dGVyIiwiYXBwbHkiLCJldmFsdWF0ZUJpbmRpbmdXaXRoTW9kZWwiLCJtb2RlbENvbnRlbnQiLCJqc29uTW9kZWwiLCJKU09OTW9kZWwiLCJ0ZXh0IiwiSW52aXNpYmxlVGV4dCIsImJpbmRQcm9wZXJ0eSIsInNldE1vZGVsIiwic2V0QmluZGluZ0NvbnRleHQiLCJjcmVhdGVCaW5kaW5nQ29udGV4dCIsImdldFRleHQiLCJnZXRUZW1wbGF0aW5nUmVzdWx0IiwieG1sSW5wdXQiLCJtQmluZGluZ0NvbnRleHRzIiwibU1vZGVscyIsInRlbXBsYXRlZFhtbCIsIkRPTVBhcnNlciIsInhtbERvYyIsInBhcnNlRnJvbVN0cmluZyIsIm9QcmVwcm9jZXNzb3JTZXR0aW5ncyIsIm1vZGVscyIsIk9iamVjdCIsImFzc2lnbiIsIm1ldGFNb2RlbCIsImJpbmRpbmdDb250ZXh0cyIsImtleXMiLCJmb3JFYWNoIiwic0tleSIsImdldE9iamVjdCIsInRvQmVEZWZpbmVkIiwib01vZGVsIiwiWE1MUHJlcHJvY2Vzc29yIiwicHJvY2VzcyIsImZpcnN0RWxlbWVudENoaWxkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBdUJBQSxFQUFBQSxXQUFXLENBQUNDLFFBQVosQ0FBcUJDLGFBQXJCO0FBRUFDLEVBQUFBLEdBQUcsQ0FBQ0MsUUFBSixDQUFhLENBQWIsRUFBdUIsa0NBQXZCO0FBQ0FDLEVBQUFBLElBQUksQ0FBQ0MsVUFBTCxDQUFnQixLQUFoQjtBQUVBLE1BQU1DLFlBQVksR0FBRztBQUNwQixjQUFVLGVBRFU7QUFFcEIsYUFBUyxlQUZXO0FBR3BCLGlCQUFhLGtFQUhPO0FBSXBCLFdBQU8sa0VBSmE7QUFLcEIsZ0JBQVksMEVBTFE7QUFNcEIsZUFBVyxzQkFOUztBQU9wQixZQUFRLGFBUFk7QUFRcEIsU0FBSyxPQVJlO0FBU3BCLFNBQUssb0JBVGU7QUFVcEIsV0FBTyxZQVZhO0FBV3BCLGdCQUFZLGtCQVhRO0FBWXBCLFNBQUssZ0JBWmU7QUFhcEIsdUJBQW1CLDBCQWJDO0FBY3BCLGtCQUFjO0FBZE0sR0FBckI7QUFnQkEsTUFBTUMsTUFBTSxHQUFHQyxLQUFLLENBQUNDLGFBQU4sQ0FBb0JILFlBQXBCLENBQWY7O0FBRU8sTUFBTUksYUFBYSxHQUFHLFVBQVNDLGFBQVQsRUFBNkI7QUFDekRa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U0FBbkMsQ0FOQyxDQWdCRDs7QUFDQUgsUUFBQUEsTUFBTSxDQUFDSSxJQUFQLENBQVlaLGdCQUFaLEVBQThCYSxPQUE5QixDQUFzQyxVQUFTQyxJQUFULEVBQWU7QUFDcEQ7QUFDQXBJLFVBQUFBLE1BQU0sQ0FBQyxPQUFPNEMsVUFBVSxDQUFDeUYsU0FBWCxDQUFxQmYsZ0JBQWdCLENBQUNjLElBQUQsQ0FBckMsQ0FBUixDQUFOLENBQTRERSxXQUE1RDtBQUNBLGNBQU1DLE1BQU0sR0FBR2hCLE9BQU8sQ0FBQ2EsSUFBRCxDQUFQLElBQWlCeEYsVUFBaEM7QUFDQWdGLFVBQUFBLHFCQUFxQixDQUFDSyxlQUF0QixDQUFzQ0csSUFBdEMsSUFBOENHLE1BQU0sQ0FBQ3JCLG9CQUFQLENBQTRCSSxnQkFBZ0IsQ0FBQ2MsSUFBRCxDQUE1QyxDQUE5QyxDQUpvRCxDQUkrQzs7QUFDbkdSLFVBQUFBLHFCQUFxQixDQUFDQyxNQUF0QixDQUE2Qk8sSUFBN0IsSUFBcUNHLE1BQXJDO0FBQ0EsU0FORCxFQWpCQyxDQXlCRDs7QUFDQSxZQUFJWCxxQkFBcUIsQ0FBQ0MsTUFBdEIsQ0FBNkIsTUFBN0IsQ0FBSixFQUEwQztBQUN6Q0QsVUFBQUEscUJBQXFCLENBQUNLLGVBQXRCLENBQXNDLE1BQXRDLElBQWdETCxxQkFBcUIsQ0FBQ0MsTUFBdEIsQ0FBNkIsTUFBN0IsRUFBcUNYLG9CQUFyQyxDQUEwRCxHQUExRCxDQUFoRDtBQUNBOztBQUVELGVBQU9zQixlQUFlLENBQUNDLE9BQWhCLENBQXdCZixNQUFNLENBQUNnQixpQkFBL0IsRUFBbUQ7QUFBRS9ELFVBQUFBLElBQUksRUFBRTtBQUFSLFNBQW5ELEVBQThFaUQscUJBQTlFLENBQVA7QUE5QkM7QUErQkQsS0FwQytCO0FBQUE7QUFBQTtBQUFBLEdBQXpCIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRmllbGRNZXRhZGF0YSBmcm9tIFwic2FwL2ZlL21hY3Jvcy9pbnRlcm5hbC9GaWVsZC5tZXRhZGF0YVwiO1xuaW1wb3J0IHsgUGhhbnRvbVV0aWwgfSBmcm9tIFwic2FwL2ZlL21hY3Jvc1wiO1xuaW1wb3J0IHsgX01ldGFkYXRhUmVxdWVzdG9yIH0gZnJvbSBcInNhcC91aS9tb2RlbC9vZGF0YS92NC9saWJcIjtcbmltcG9ydCB7IE9EYXRhTWV0YU1vZGVsIH0gZnJvbSBcInNhcC91aS9tb2RlbC9vZGF0YS92NFwiO1xuaW1wb3J0IHsgWE1MUHJlcHJvY2Vzc29yIH0gZnJvbSBcInNhcC91aS9jb3JlL3V0aWxcIjtcbmltcG9ydCB7IExvZyB9IGZyb20gXCJzYXAvYmFzZVwiO1xuaW1wb3J0IHhwYXRoIGZyb20gXCJ4cGF0aFwiO1xuaW1wb3J0ICogYXMgZnMgZnJvbSBcImZzXCI7XG5pbXBvcnQgeyBjb21wYWN0TW9kZWwsIGNvbXBpbGVTb3VyY2VzLCB0byB9IGZyb20gXCJAc2FwL2Nkcy1jb21waWxlclwiO1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSBcInByZXR0aWVyXCI7XG5pbXBvcnQgeyBCaW5kaW5nUGFyc2VyIH0gZnJvbSBcInNhcC91aS9iYXNlXCI7XG5pbXBvcnQgeyBBbnlBbm5vdGF0aW9uLCBDb252ZXJ0ZXJPdXRwdXQsIEVudGl0eVNldCwgUHJvcGVydHkgfSBmcm9tIFwiQHNhcC11eC9hbm5vdGF0aW9uLWNvbnZlcnRlclwiO1xuaW1wb3J0IHsgRGF0YU1vZGVsT2JqZWN0UGF0aCB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0RhdGFNb2RlbFBhdGhIZWxwZXJcIjtcbmltcG9ydCB7IEpTT05Nb2RlbCB9IGZyb20gXCJzYXAvdWkvbW9kZWwvanNvblwiO1xuaW1wb3J0IHsgSW52aXNpYmxlVGV4dCB9IGZyb20gXCJzYXAvdWkvY29yZVwiO1xuaW1wb3J0IHsgTGlzdFJlcG9ydE1hbmlmZXN0U2V0dGluZ3MsIE9iamVjdFBhZ2VNYW5pZmVzdFNldHRpbmdzIH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvTWFuaWZlc3RTZXR0aW5nc1wiO1xuaW1wb3J0IHsgSXNzdWVDYXRlZ29yeSwgSXNzdWVTZXZlcml0eSB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvSXNzdWVNYW5hZ2VyXCI7XG5pbXBvcnQgeyBJRGlhZ25vc3RpY3MgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9UZW1wbGF0ZUNvbnZlcnRlclwiO1xuaW1wb3J0IHsgbWVyZ2UgfSBmcm9tIFwic2FwL2Jhc2UvdXRpbFwiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IENvbnZlcnRlckNvbnRleHQgZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvQ29udmVydGVyQ29udGV4dFwiO1xuaW1wb3J0IFNpZGVFZmZlY3RzRmFjdG9yeSBmcm9tIFwic2FwL2ZlL2NvcmUvc2VydmljZXMvU2lkZUVmZmVjdHNTZXJ2aWNlRmFjdG9yeVwiO1xuXG5QaGFudG9tVXRpbC5yZWdpc3RlcihGaWVsZE1ldGFkYXRhKTtcblxuTG9nLnNldExldmVsKDEgYXMgYW55LCBcInNhcC51aS5jb3JlLnV0aWwuWE1MUHJlcHJvY2Vzc29yXCIpO1xuamVzdC5zZXRUaW1lb3V0KDQwMDAwKTtcblxuY29uc3QgbmFtZVNwYWNlTWFwID0ge1xuXHRcIm1hY3Jvc1wiOiBcInNhcC5mZS5tYWNyb3NcIixcblx0XCJtYWNyb1wiOiBcInNhcC5mZS5tYWNyb3NcIixcblx0XCJtYWNyb2RhdGFcIjogXCJodHRwOi8vc2NoZW1hcy5zYXAuY29tL3NhcHVpNS9leHRlbnNpb24vc2FwLnVpLmNvcmUuQ3VzdG9tRGF0YS8xXCIsXG5cdFwibG9nXCI6IFwiaHR0cDovL3NjaGVtYXMuc2FwLmNvbS9zYXB1aTUvZXh0ZW5zaW9uL3NhcC51aS5jb3JlLkN1c3RvbURhdGEvMVwiLFxuXHRcInVuaXR0ZXN0XCI6IFwiaHR0cDovL3NjaGVtYXMuc2FwLmNvbS9zYXB1aTUvcHJlcHJvY2Vzc29yZXh0ZW5zaW9uL3NhcC5mZS51bml0dGVzdGluZy8xXCIsXG5cdFwiY29udHJvbFwiOiBcInNhcC5mZS5jb3JlLmNvbnRyb2xzXCIsXG5cdFwiY29yZVwiOiBcInNhcC51aS5jb3JlXCIsXG5cdFwibVwiOiBcInNhcC5tXCIsXG5cdFwiZlwiOiBcInNhcC51aS5sYXlvdXQuZm9ybVwiLFxuXHRcIm1kY1wiOiBcInNhcC51aS5tZGNcIixcblx0XCJtZGNGaWVsZFwiOiBcInNhcC51aS5tZGMuZmllbGRcIixcblx0XCJ1XCI6IFwic2FwLnVpLnVuaWZpZWRcIixcblx0XCJtYWNyb01pY3JvQ2hhcnRcIjogXCJzYXAuZmUubWFjcm9zLm1pY3JvY2hhcnRcIixcblx0XCJtaWNyb0NoYXJ0XCI6IFwic2FwLnN1aXRlLnVpLm1pY3JvY2hhcnRcIlxufTtcbmNvbnN0IHNlbGVjdCA9IHhwYXRoLnVzZU5hbWVzcGFjZXMobmFtZVNwYWNlTWFwKTtcblxuZXhwb3J0IGNvbnN0IHJlZ2lzdGVyTWFjcm8gPSBmdW5jdGlvbihtYWNyb01ldGFkYXRhOiBhbnkpIHtcblx0UGhhbnRvbVV0aWwucmVnaXN0ZXIobWFjcm9NZXRhZGF0YSk7XG59O1xuZXhwb3J0IGNvbnN0IHJ1blhQYXRoUXVlcnkgPSBmdW5jdGlvbihzZWxlY3Rvcjogc3RyaW5nLCB4bWxkb206IE5vZGUgfCB1bmRlZmluZWQpIHtcblx0cmV0dXJuIHNlbGVjdChzZWxlY3RvciwgeG1sZG9tKTtcbn07XG5cbmV4cGVjdC5leHRlbmQoe1xuXHR0b0hhdmVDb250cm9sKHhtbGRvbSwgc2VsZWN0b3IpIHtcblx0XHRjb25zdCBub2RlcyA9IHJ1blhQYXRoUXVlcnkoYC9yb290JHtzZWxlY3Rvcn1gLCB4bWxkb20pO1xuXHRcdHJldHVybiB7XG5cdFx0XHRtZXNzYWdlOiAoKSA9PiB7XG5cdFx0XHRcdGNvbnN0IG91dHB1dFhtbCA9IHNlcmlhbGl6ZVhNTCh4bWxkb20pO1xuXHRcdFx0XHRyZXR1cm4gYGRpZCBub3QgZmluZCBjb250cm9scyBtYXRjaGluZyAke3NlbGVjdG9yfSBpbiBnZW5lcmF0ZWQgeG1sOlxcbiAke291dHB1dFhtbH1gO1xuXHRcdFx0fSxcblx0XHRcdHBhc3M6IG5vZGVzICYmIG5vZGVzLmxlbmd0aCA+PSAxXG5cdFx0fTtcblx0fSxcblx0dG9Ob3RIYXZlQ29udHJvbCh4bWxkb20sIHNlbGVjdG9yKSB7XG5cdFx0Y29uc3Qgbm9kZXMgPSBydW5YUGF0aFF1ZXJ5KGAvcm9vdCR7c2VsZWN0b3J9YCwgeG1sZG9tKTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0bWVzc2FnZTogKCkgPT4ge1xuXHRcdFx0XHRjb25zdCBvdXRwdXRYbWwgPSBzZXJpYWxpemVYTUwoeG1sZG9tKTtcblx0XHRcdFx0cmV0dXJuIGBUaGVyZSBpcyBhIGNvbnRyb2wgbWF0Y2hpbmcgJHtzZWxlY3Rvcn0gaW4gZ2VuZXJhdGVkIHhtbDpcXG4gJHtvdXRwdXRYbWx9YDtcblx0XHRcdH0sXG5cdFx0XHRwYXNzOiBub2RlcyAmJiBub2Rlcy5sZW5ndGggPT09IDBcblx0XHR9O1xuXHR9XG59KTtcblxuZXhwb3J0IGNvbnN0IGdldENvbnRyb2xBdHRyaWJ1dGUgPSBmdW5jdGlvbihjb250cm9sU2VsZWN0b3I6IHN0cmluZywgYXR0cmlidXRlTmFtZTogc3RyaW5nLCB4bWxEb206IE5vZGUpIHtcblx0Y29uc3Qgc2VsZWN0b3IgPSBgc3RyaW5nKC9yb290JHtjb250cm9sU2VsZWN0b3J9L0Ake2F0dHJpYnV0ZU5hbWV9KWA7XG5cdHJldHVybiBydW5YUGF0aFF1ZXJ5KHNlbGVjdG9yLCB4bWxEb20pO1xufTtcblxuZXhwb3J0IGNvbnN0IHNlcmlhbGl6ZVhNTCA9IGZ1bmN0aW9uKHhtbERvbTogTm9kZSkge1xuXHRjb25zdCBzZXJpYWxpemVyID0gbmV3IHdpbmRvdy5YTUxTZXJpYWxpemVyKCk7XG5cdGNvbnN0IHhtbFN0cmluZyA9IHNlcmlhbGl6ZXJcblx0XHQuc2VyaWFsaXplVG9TdHJpbmcoeG1sRG9tKVxuXHRcdC5yZXBsYWNlKC8oPzpbXFx0IF0qKD86XFxyP1xcbnxcXHIpKSsvZywgXCJcXG5cIilcblx0XHQucmVwbGFjZSgvXFxcXFwiL2csICdcIicpO1xuXHRyZXR1cm4gZm9ybWF0KHhtbFN0cmluZywgeyBwYXJzZXI6IFwiaHRtbFwiIH0pO1xufTtcblxuLyoqXG4gKiBDb21waWxlIGEgQ0RTIGZpbGUgaW50byBhbiBFRE1YIGZpbGUuXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IHNDRFNVcmwgVGhlIHBhdGggdG8gdGhlIGZpbGUgY29udGFpbmluZyB0aGUgQ0RTIGRlZmluaXRpb24uIFRoaXMgZmlsZSBNVVNUIGRlY2xhcmUgdGhlIG5hbWVzcGFjZVxuICogc2FwLmZlLnRlc3QgYW5kIGEgc2VydmljZSBKZXN0U2VydmljZVxuICogQHJldHVybnMge3N0cmluZ30gVGhlIHBhdGggb2YgdGhlIGdlbmVyYXRlZCBFRE1YXG4gKi9cbmV4cG9ydCBjb25zdCBjb21waWxlQ0RTID0gZnVuY3Rpb24oc0NEU1VybDogc3RyaW5nKSB7XG5cdGNvbnN0IGNkc1N0cmluZyA9IGZzLnJlYWRGaWxlU3luYyhzQ0RTVXJsLCBcInV0Zi04XCIpO1xuXHRjb25zdCBjc24gPSBjb21waWxlU291cmNlcyh7IFwic3RyaW5nLmNkc1wiOiBjZHNTdHJpbmcgfSwge30pO1xuXHRjb25zdCBjc25Nb2RlbCA9IGNvbXBhY3RNb2RlbChjc24pO1xuXHRjb25zdCBlZG14Q29udGVudCA9IHRvLmVkbXgoY3NuTW9kZWwsIHsgc2VydmljZTogXCJzYXAuZmUudGVzdC5KZXN0U2VydmljZVwiIH0pO1xuXHRjb25zdCBkaXIgPSBwYXRoLnJlc29sdmUoc0NEU1VybCwgXCIuLlwiLCBcImdlblwiKTtcblx0Y29uc3QgZWRteFVybCA9IHBhdGgucmVzb2x2ZShkaXIsIHBhdGguYmFzZW5hbWUoc0NEU1VybCkucmVwbGFjZShcIi5jZHNcIiwgXCIueG1sXCIpKTtcblxuXHRpZiAoIWZzLmV4aXN0c1N5bmMoZGlyKSkge1xuXHRcdGZzLm1rZGlyU3luYyhkaXIpO1xuXHR9XG5cblx0ZnMud3JpdGVGaWxlU3luYyhlZG14VXJsLCBlZG14Q29udGVudCk7XG5cdHJldHVybiBlZG14VXJsO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEZha2VTaWRlRWZmZWN0c1NlcnZpY2UgPSBhc3luYyBmdW5jdGlvbihvTWV0YU1vZGVsOiBPRGF0YU1ldGFNb2RlbCk6IFByb21pc2U8YW55PiB7XG5cdGNvbnN0IG9TZXJ2aWNlQ29udGV4dCA9IHsgc2NvcGVPYmplY3Q6IHt9LCBzY29wZVR5cGU6IFwiXCIsIHNldHRpbmdzOiB7fSB9O1xuXHRyZXR1cm4gbmV3IFNpZGVFZmZlY3RzRmFjdG9yeSgpLmNyZWF0ZUluc3RhbmNlKG9TZXJ2aWNlQ29udGV4dCkudGhlbihmdW5jdGlvbihvU2VydmljZUluc3RhbmNlOiBhbnkpIHtcblx0XHRjb25zdCBvSmVzdFNpZGVFZmZlY3RzU2VydmljZSA9IG9TZXJ2aWNlSW5zdGFuY2UuZ2V0SW50ZXJmYWNlKCk7XG5cdFx0b0plc3RTaWRlRWZmZWN0c1NlcnZpY2UuZ2V0Q29udGV4dCA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0c2NvcGVPYmplY3Q6IHtcblx0XHRcdFx0XHRnZXRNb2RlbDogZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0XHRnZXRNZXRhTW9kZWw6IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRcdHJldHVybiBvTWV0YU1vZGVsO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9O1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblx0XHR9O1xuXHRcdHJldHVybiBvSmVzdFNpZGVFZmZlY3RzU2VydmljZTtcblx0fSk7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0RmFrZURpYWdub3N0aWNzID0gZnVuY3Rpb24oKTogSURpYWdub3N0aWNzIHtcblx0Y29uc3QgaXNzdWVzOiBhbnlbXSA9IFtdO1xuXHRyZXR1cm4ge1xuXHRcdGFkZElzc3VlKGlzc3VlQ2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnksIGlzc3VlU2V2ZXJpdHk6IElzc3VlU2V2ZXJpdHksIGRldGFpbHM6IHN0cmluZyk6IHZvaWQge1xuXHRcdFx0aXNzdWVzLnB1c2goe1xuXHRcdFx0XHRpc3N1ZUNhdGVnb3J5LFxuXHRcdFx0XHRpc3N1ZVNldmVyaXR5LFxuXHRcdFx0XHRkZXRhaWxzXG5cdFx0XHR9KTtcblx0XHR9LFxuXHRcdGdldElzc3VlcygpOiBhbnlbXSB7XG5cdFx0XHRyZXR1cm4gaXNzdWVzO1xuXHRcdH0sXG5cdFx0Y2hlY2tJZklzc3VlRXhpc3RzKGlzc3VlQ2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnksIGlzc3VlU2V2ZXJpdHk6IElzc3VlU2V2ZXJpdHksIGRldGFpbHM6IHN0cmluZyk6IGJvb2xlYW4ge1xuXHRcdFx0cmV0dXJuIGlzc3Vlcy5maW5kKGlzc3VlID0+IHtcblx0XHRcdFx0aXNzdWUuaXNzdWVDYXRlZ29yeSA9PT0gaXNzdWVDYXRlZ29yeSAmJiBpc3N1ZS5pc3N1ZVNldmVyaXR5ID09PSBpc3N1ZVNldmVyaXR5ICYmIGlzc3VlLmRldGFpbHMgPT09IGRldGFpbHM7XG5cdFx0XHR9KTtcblx0XHR9XG5cdH07XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udmVydGVyQ29udGV4dEZvclRlc3QgPSBmdW5jdGlvbihcblx0Y29udmVydGVkVHlwZXM6IENvbnZlcnRlck91dHB1dCxcblx0bWFuaWZlc3RTZXR0aW5nczogTGlzdFJlcG9ydE1hbmlmZXN0U2V0dGluZ3MgfCBPYmplY3RQYWdlTWFuaWZlc3RTZXR0aW5nc1xuKSB7XG5cdGNvbnN0IGVudGl0eVNldCA9IGNvbnZlcnRlZFR5cGVzLmVudGl0eVNldHMuZmluZChlcyA9PiBlcy5uYW1lID09PSBtYW5pZmVzdFNldHRpbmdzLmVudGl0eVNldCk7XG5cdGNvbnN0IGRhdGFNb2RlbFBhdGggPSBnZXREYXRhTW9kZWxPYmplY3RQYXRoRm9yUHJvcGVydHkoZW50aXR5U2V0IGFzIEVudGl0eVNldCwgZW50aXR5U2V0KTtcblx0cmV0dXJuIG5ldyBDb252ZXJ0ZXJDb250ZXh0KGNvbnZlcnRlZFR5cGVzLCBtYW5pZmVzdFNldHRpbmdzLCBnZXRGYWtlRGlhZ25vc3RpY3MoKSwgbWVyZ2UsIGRhdGFNb2RlbFBhdGgpO1xufTtcbmNvbnN0IG1ldGFNb2RlbENhY2hlOiBhbnkgPSB7fTtcbmV4cG9ydCBjb25zdCBnZXRNZXRhTW9kZWwgPSBhc3luYyBmdW5jdGlvbihzTWV0YWRhdGFVcmw6IHN0cmluZykge1xuXHRjb25zdCBvUmVxdWVzdG9yID0gX01ldGFkYXRhUmVxdWVzdG9yLmNyZWF0ZSh7fSwgXCI0LjBcIiwge30pO1xuXHRpZiAoIW1ldGFNb2RlbENhY2hlW3NNZXRhZGF0YVVybF0pIHtcblx0XHRjb25zdCBvTWV0YU1vZGVsID0gbmV3IE9EYXRhTWV0YU1vZGVsKG9SZXF1ZXN0b3IsIHNNZXRhZGF0YVVybCwgdW5kZWZpbmVkLCBudWxsKTtcblx0XHRhd2FpdCBvTWV0YU1vZGVsLmZldGNoRW50aXR5Q29udGFpbmVyKCk7XG5cdFx0bWV0YU1vZGVsQ2FjaGVbc01ldGFkYXRhVXJsXSA9IG9NZXRhTW9kZWw7XG5cdH1cblxuXHRyZXR1cm4gbWV0YU1vZGVsQ2FjaGVbc01ldGFkYXRhVXJsXTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXREYXRhTW9kZWxPYmplY3RQYXRoRm9yUHJvcGVydHkgPSBmdW5jdGlvbihcblx0ZW50aXR5U2V0OiBFbnRpdHlTZXQsXG5cdHByb3BlcnR5PzogUHJvcGVydHkgfCBFbnRpdHlTZXQgfCBBbnlBbm5vdGF0aW9uXG4pOiBEYXRhTW9kZWxPYmplY3RQYXRoIHtcblx0Y29uc3QgdGFyZ2V0UGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCA9IHtcblx0XHRzdGFydGluZ0VudGl0eVNldDogZW50aXR5U2V0LFxuXHRcdG5hdmlnYXRpb25Qcm9wZXJ0aWVzOiBbXSxcblx0XHR0YXJnZXRPYmplY3Q6IHByb3BlcnR5LFxuXHRcdHRhcmdldEVudGl0eVNldDogZW50aXR5U2V0LFxuXHRcdHRhcmdldEVudGl0eVR5cGU6IGVudGl0eVNldC5lbnRpdHlUeXBlXG5cdH07XG5cdHRhcmdldFBhdGguY29udGV4dExvY2F0aW9uID0gdGFyZ2V0UGF0aDtcblx0cmV0dXJuIHRhcmdldFBhdGg7XG59O1xuXG5leHBvcnQgY29uc3QgZXZhbHVhdGVCaW5kaW5nID0gZnVuY3Rpb24oYmluZGluZ1N0cmluZzogc3RyaW5nLCAuLi5hcmdzOiBhbnlbXSkge1xuXHRjb25zdCBiaW5kaW5nRWxlbWVudCA9IEJpbmRpbmdQYXJzZXIuY29tcGxleFBhcnNlcihiaW5kaW5nU3RyaW5nKTtcblx0cmV0dXJuIGJpbmRpbmdFbGVtZW50LmZvcm1hdHRlci5hcHBseSh1bmRlZmluZWQsIGFyZ3MpO1xufTtcblxuZXhwb3J0IGNvbnN0IGV2YWx1YXRlQmluZGluZ1dpdGhNb2RlbCA9IGZ1bmN0aW9uKGJpbmRpbmdTdHJpbmc6IHN0cmluZyB8IHVuZGVmaW5lZCwgbW9kZWxDb250ZW50OiBhbnkpIHtcblx0Y29uc3QgYmluZGluZ0VsZW1lbnQgPSBCaW5kaW5nUGFyc2VyLmNvbXBsZXhQYXJzZXIoYmluZGluZ1N0cmluZyk7XG5cdGNvbnN0IGpzb25Nb2RlbCA9IG5ldyBKU09OTW9kZWwobW9kZWxDb250ZW50KTtcblx0Y29uc3QgdGV4dCA9IG5ldyBJbnZpc2libGVUZXh0KCk7XG5cdHRleHQuYmluZFByb3BlcnR5KFwidGV4dFwiLCBiaW5kaW5nRWxlbWVudCk7XG5cdHRleHQuc2V0TW9kZWwoanNvbk1vZGVsKTtcblx0dGV4dC5zZXRCaW5kaW5nQ29udGV4dChqc29uTW9kZWwuY3JlYXRlQmluZGluZ0NvbnRleHQoXCIvXCIpKTtcblx0cmV0dXJuIHRleHQuZ2V0VGV4dCgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldFRlbXBsYXRpbmdSZXN1bHQgPSBhc3luYyBmdW5jdGlvbihcblx0eG1sSW5wdXQ6IHN0cmluZyxcblx0c01ldGFkYXRhVXJsOiBzdHJpbmcsXG5cdG1CaW5kaW5nQ29udGV4dHM6IHsgW3g6IHN0cmluZ106IGFueTsgZW50aXR5U2V0Pzogc3RyaW5nIH0sXG5cdG1Nb2RlbHM6IHsgW3g6IHN0cmluZ106IGFueSB9XG4pIHtcblx0Y29uc3QgdGVtcGxhdGVkWG1sID0gYDxyb290PiR7eG1sSW5wdXR9PC9yb290PmA7XG5cdGNvbnN0IHBhcnNlciA9IG5ldyB3aW5kb3cuRE9NUGFyc2VyKCk7XG5cdGNvbnN0IHhtbERvYyA9IHBhcnNlci5wYXJzZUZyb21TdHJpbmcodGVtcGxhdGVkWG1sLCBcInRleHQveG1sXCIpO1xuXG5cdGNvbnN0IG9NZXRhTW9kZWwgPSBhd2FpdCBnZXRNZXRhTW9kZWwoc01ldGFkYXRhVXJsKTtcblx0Y29uc3Qgb1ByZXByb2Nlc3NvclNldHRpbmdzOiBhbnkgPSB7XG5cdFx0bW9kZWxzOiBPYmplY3QuYXNzaWduKFxuXHRcdFx0e1xuXHRcdFx0XHRtZXRhTW9kZWw6IG9NZXRhTW9kZWxcblx0XHRcdH0sXG5cdFx0XHRtTW9kZWxzXG5cdFx0KSxcblx0XHRiaW5kaW5nQ29udGV4dHM6IHt9XG5cdH07XG5cblx0Ly9JbmplY3QgbW9kZWxzIGFuZCBiaW5kaW5nQ29udGV4dHNcblx0T2JqZWN0LmtleXMobUJpbmRpbmdDb250ZXh0cykuZm9yRWFjaChmdW5jdGlvbihzS2V5KSB7XG5cdFx0LyogQXNzZXJ0IHRvIG1ha2Ugc3VyZSB0aGUgYW5ub3RhdGlvbnMgYXJlIGluIHRoZSB0ZXN0IG1ldGFkYXRhIC0+IGF2b2lkIG1pc2xlYWRpbmcgdGVzdHMgKi9cblx0XHRleHBlY3QodHlwZW9mIG9NZXRhTW9kZWwuZ2V0T2JqZWN0KG1CaW5kaW5nQ29udGV4dHNbc0tleV0pKS50b0JlRGVmaW5lZCgpO1xuXHRcdGNvbnN0IG9Nb2RlbCA9IG1Nb2RlbHNbc0tleV0gfHwgb01ldGFNb2RlbDtcblx0XHRvUHJlcHJvY2Vzc29yU2V0dGluZ3MuYmluZGluZ0NvbnRleHRzW3NLZXldID0gb01vZGVsLmNyZWF0ZUJpbmRpbmdDb250ZXh0KG1CaW5kaW5nQ29udGV4dHNbc0tleV0pOyAvL1ZhbHVlIGlzIHNQYXRoXG5cdFx0b1ByZXByb2Nlc3NvclNldHRpbmdzLm1vZGVsc1tzS2V5XSA9IG9Nb2RlbDtcblx0fSk7XG5cblx0Ly9UaGlzIGNvbnRleHQgZm9yIG1hY3JvIHRlc3Rpbmdcblx0aWYgKG9QcmVwcm9jZXNzb3JTZXR0aW5ncy5tb2RlbHNbXCJ0aGlzXCJdKSB7XG5cdFx0b1ByZXByb2Nlc3NvclNldHRpbmdzLmJpbmRpbmdDb250ZXh0c1tcInRoaXNcIl0gPSBvUHJlcHJvY2Vzc29yU2V0dGluZ3MubW9kZWxzW1widGhpc1wiXS5jcmVhdGVCaW5kaW5nQ29udGV4dChcIi9cIik7XG5cdH1cblxuXHRyZXR1cm4gWE1MUHJlcHJvY2Vzc29yLnByb2Nlc3MoeG1sRG9jLmZpcnN0RWxlbWVudENoaWxkISwgeyBuYW1lOiBcIlRlc3QgRnJhZ21lbnRcIiB9LCBvUHJlcHJvY2Vzc29yU2V0dGluZ3MpO1xufTtcbiJdfQ==