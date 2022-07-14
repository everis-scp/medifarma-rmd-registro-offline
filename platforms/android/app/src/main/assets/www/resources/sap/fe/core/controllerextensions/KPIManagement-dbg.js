/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/mvc/ControllerExtension", "sap/fe/core/controllerextensions/ControllerExtensionMetadata", "../helpers/ClassSupport", "sap/ui/model/json/JSONModel", "sap/base/Log", "sap/fe/core/CommonUtils", "sap/fe/core/formatters/TableFormatterTypes", "sap/ui/core/format/NumberFormat", "sap/ui/core/Locale", "sap/ui/model/Filter"], function (ControllerExtension, ControllerExtensionMetadata, ClassSupport, JSONModel, Log, CommonUtils, TableFormatterTypes, NumberFormat, Locale, Filter) {
  "use strict";

  var _dec, _dec2, _dec3, _class, _class2;

  var _exports = {};
  var MessageType = TableFormatterTypes.MessageType;
  var Override = ClassSupport.Override;
  var UI5Class = ClassSupport.UI5Class;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

  function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  /**
   * Function to calculate a message state from a criticality value.
   *
   * @param {number|string} criticalityValue The criticality values.
   * @returns {MessageType} Returns the corresponding MessageType
   */
  function messageTypeFromCriticality(criticalityValue) {
    var criticalityProperty;

    switch (criticalityValue) {
      case 1:
        criticalityProperty = MessageType.Error;
        break;

      case 2:
        criticalityProperty = MessageType.Warning;
        break;

      case 3:
        criticalityProperty = MessageType.Success;
        break;

      case 5:
        criticalityProperty = MessageType.Information;
        break;

      default:
        criticalityProperty = MessageType.None;
    }

    return criticalityProperty;
  }
  /**
   * Function to calculate the message state for a criticality calculation of type 'Target'.
   *
   * @param {number} kpiValue The value of the KPI to be tested against.
   * @param {number[]} aThresholds Thresholds to be used [DeviationRangeLowValue,ToleranceRangeLowValue,AcceptanceRangeLowValue,AcceptanceRangeHighValue,ToleranceRangeHighValue,DeviationRangeHighValue].
   * @returns {MessageType} Returns the corresponding MessageType
   */


  function messageTypeFromTargetCalculation(kpiValue, aThresholds) {
    var criticalityProperty;

    if (aThresholds[0] !== undefined && aThresholds[0] !== null && kpiValue < aThresholds[0]) {
      criticalityProperty = MessageType.Error;
    } else if (aThresholds[1] !== undefined && aThresholds[1] !== null && kpiValue < aThresholds[1]) {
      criticalityProperty = MessageType.Warning;
    } else if (aThresholds[2] !== undefined && aThresholds[2] !== null && kpiValue < aThresholds[2]) {
      criticalityProperty = MessageType.None;
    } else if (aThresholds[5] !== undefined && aThresholds[5] !== null && kpiValue > aThresholds[5]) {
      criticalityProperty = MessageType.Error;
    } else if (aThresholds[4] !== undefined && aThresholds[4] !== null && kpiValue > aThresholds[4]) {
      criticalityProperty = MessageType.Warning;
    } else if (aThresholds[3] !== undefined && aThresholds[3] !== null && kpiValue > aThresholds[3]) {
      criticalityProperty = MessageType.None;
    } else {
      criticalityProperty = MessageType.Success;
    }

    return criticalityProperty;
  }
  /**
   * Function to calculate the message state for a criticality calculation of type 'Minimize'.
   *
   * @param {number} kpiValue The value of the KPI to be tested against.
   * @param {number[]} aThresholds Thresholds to be used [AcceptanceRangeHighValue,ToleranceRangeHighValue,DeviationRangeHighValue].
   * @returns {MessageType} Returns the corresponding MessageType
   */


  function messageTypeFromMinimizeCalculation(kpiValue, aThresholds) {
    var criticalityProperty;

    if (aThresholds[2] !== undefined && aThresholds[2] !== null && kpiValue > aThresholds[2]) {
      criticalityProperty = MessageType.Error;
    } else if (aThresholds[1] !== undefined && aThresholds[1] !== null && kpiValue > aThresholds[1]) {
      criticalityProperty = MessageType.Warning;
    } else if (aThresholds[0] !== undefined && aThresholds[0] !== null && kpiValue > aThresholds[0]) {
      criticalityProperty = MessageType.None;
    } else {
      criticalityProperty = MessageType.Success;
    }

    return criticalityProperty;
  }
  /**
   * Function to calculate the message state for a criticality calculation of type 'Maximize'.
   *
   * @param {number} kpiValue The value of the KPI to be tested against.
   * @param {number[]} aThresholds Thresholds to be used [DeviationRangeLowValue,ToleranceRangeLowValue,AcceptanceRangeLowValue].
   * @returns {MessageType} Returns the corresponding MessageType
   */


  function messageTypeFromMaximizeCalculation(kpiValue, aThresholds) {
    var criticalityProperty;

    if (aThresholds[0] !== undefined && aThresholds[0] !== null && kpiValue < aThresholds[0]) {
      criticalityProperty = MessageType.Error;
    } else if (aThresholds[1] !== undefined && aThresholds[1] !== null && kpiValue < aThresholds[1]) {
      criticalityProperty = MessageType.Warning;
    } else if (aThresholds[2] !== undefined && aThresholds[2] !== null && kpiValue < aThresholds[2]) {
      criticalityProperty = MessageType.None;
    } else {
      criticalityProperty = MessageType.Success;
    }

    return criticalityProperty;
  }
  /**
   * Creates a sap.ui.model.Filter from a filter definition.
   *
   * @param filterDefinition The filter definition
   * @returns Returns a sap.ui.model.Filter from the definition, or undefined if the definition is empty (no ranges)
   */


  function createFilterFromDefinition(filterDefinition) {
    if (filterDefinition.ranges.length === 0) {
      return undefined;
    } else if (filterDefinition.ranges.length === 1) {
      return new Filter(filterDefinition.propertyPath, filterDefinition.ranges[0].operator, filterDefinition.ranges[0].rangeLow, filterDefinition.ranges[0].rangeHigh);
    } else {
      var aRangeFilters = filterDefinition.ranges.map(function (range) {
        return new Filter(filterDefinition.propertyPath, range.operator, range.rangeLow, range.rangeHigh);
      });
      return new Filter({
        filters: aRangeFilters,
        and: false
      });
    }
  }
  /**
   * @class A controller extension for managing KPI in an AnalyticalListPage
   *
   * @name sap.fe.core.controllerextensions.KPIManagement
   * @hideconstructor
   *
   * @private
   * @since 1.93.0
   */


  _exports.createFilterFromDefinition = createFilterFromDefinition;
  var KPIManagementControllerExtension = (_dec = UI5Class("sap.fe.core.controllerextensions.KPIManagement", ControllerExtensionMetadata), _dec2 = Override(), _dec3 = Override(), _dec(_class = (_class2 = /*#__PURE__*/function (_ControllerExtension) {
    _inherits(KPIManagementControllerExtension, _ControllerExtension);

    var _super = _createSuper(KPIManagementControllerExtension);

    function KPIManagementControllerExtension() {
      _classCallCheck(this, KPIManagementControllerExtension);

      return _super.apply(this, arguments);
    }

    _createClass(KPIManagementControllerExtension, [{
      key: "onInit",
      value: function onInit() {
        var _this = this;

        this.aKPIDefinitions = this.getKPIData();

        if (this.aKPIDefinitions && this.aKPIDefinitions.length) {
          var oView = this.getView();
          this.oAppComponent = CommonUtils.getAppComponent(oView); // Create a JSON model to store KPI data

          var oKPIModel = new JSONModel();
          oView.setModel(oKPIModel, "kpiModel");
          this.aKPIDefinitions.forEach(function (kpiDefinition) {
            // Create the manifest for the KPI card and store it in the KPI model
            var oCardManifest = {
              "sap.app": {
                id: "sap.fe",
                type: "card"
              },
              "sap.ui": {
                technology: "UI5"
              },
              "sap.card": {
                type: "Analytical",
                data: {
                  json: {}
                },
                header: {
                  type: "Numeric",
                  mainIndicator: {
                    number: "{mainValue}",
                    unit: "{mainUnit}"
                  },
                  title: "{cardTitle}"
                },
                content: {
                  plotArea: {
                    "dataLabel": {
                      "visible": false
                    },
                    "categoryAxisText": {
                      "visible": false
                    },
                    "valueAxisText": {
                      "visible": false
                    }
                  },
                  title: {
                    text: "{chartTitle}",
                    visible: true,
                    alignment: "Left"
                  },
                  measureAxis: "valueAxis",
                  dimensionAxis: "categoryAxis",
                  data: {
                    path: "/chartData"
                  }
                }
              }
            };
            oKPIModel.setProperty("/" + kpiDefinition.id, {
              manifest: oCardManifest
            }); // Load tag data for the KPI

            _this.loadKPITagData(kpiDefinition).catch(function (err) {
              Log.error(err);
            });
          });
        }
      }
    }, {
      key: "onExit",
      value: function onExit() {
        var oKPIModel = this.getView().getModel("kpiModel");

        if (oKPIModel) {
          oKPIModel.destroy();
        }
      }
    }, {
      key: "getKPIData",
      value: function getKPIData() {
        var oView = this.getView(),
            sCustomData = oView.getContent()[0].data("KPIData");

        if (sCustomData) {
          var vData = typeof sCustomData === "string" ? JSON.parse(sCustomData) : sCustomData;

          if ("customData" in vData) {
            return vData["customData"];
          } else {
            return vData;
          }
        } else {
          return undefined;
        }
      }
      /**
       * Loads tag data for a KPI.
       *
       * @param {KPIDefinition} kpiDefinition The definition of the KPI.
       * @returns {Promise} Returns the Promise that is resolved when data is loaded.
       */

    }, {
      key: "loadKPITagData",
      value: function loadKPITagData(kpiDefinition) {
        var _kpiDefinition$datapo, _kpiDefinition$select;

        var oModel = this.oAppComponent.getModel();
        var oKPIModel = this.getView().getModel("kpiModel");
        var oListBinding = oModel.bindList("/" + kpiDefinition.entitySet);
        var oAggregate = {}; // Main value + currency/unit

        if ((_kpiDefinition$datapo = kpiDefinition.datapoint.unit) === null || _kpiDefinition$datapo === void 0 ? void 0 : _kpiDefinition$datapo.isPath) {
          oAggregate[kpiDefinition.datapoint.propertyPath] = {
            unit: kpiDefinition.datapoint.unit.value
          };
        } else {
          oAggregate[kpiDefinition.datapoint.propertyPath] = {};
        } // Property for criticality


        if (kpiDefinition.datapoint.criticalityPath) {
          oAggregate[kpiDefinition.datapoint.criticalityPath] = {};
        }

        oListBinding.setAggregation({
          aggregate: oAggregate
        }); // Manage SelectionVariant filters

        if ((_kpiDefinition$select = kpiDefinition.selectionVariantFilterDefinitions) === null || _kpiDefinition$select === void 0 ? void 0 : _kpiDefinition$select.length) {
          var aFilters = kpiDefinition.selectionVariantFilterDefinitions.map(createFilterFromDefinition);
          oListBinding.filter(aFilters);
        }

        return oListBinding.requestContexts(0, 1).then(function (aContexts) {
          if (aContexts.length) {
            var _kpiDefinition$datapo2, _kpiDefinition$datapo3;

            var currentLocale = new Locale(sap.ui.getCore().getConfiguration().getLanguage());
            var rawUnit = ((_kpiDefinition$datapo2 = kpiDefinition.datapoint.unit) === null || _kpiDefinition$datapo2 === void 0 ? void 0 : _kpiDefinition$datapo2.isPath) ? aContexts[0].getProperty(kpiDefinition.datapoint.unit.value) : (_kpiDefinition$datapo3 = kpiDefinition.datapoint.unit) === null || _kpiDefinition$datapo3 === void 0 ? void 0 : _kpiDefinition$datapo3.value;

            if (kpiDefinition.datapoint.unit && !rawUnit) {
              // A unit/currency is defined, but its value is undefined --> multi-unit situation
              oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainValue", "*");
              oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainValueUnscaled", "*");
              oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainUnit", undefined);
              oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality", MessageType.None);
            } else {
              var _kpiDefinition$datapo4;

              var isPercentage = ((_kpiDefinition$datapo4 = kpiDefinition.datapoint.unit) === null || _kpiDefinition$datapo4 === void 0 ? void 0 : _kpiDefinition$datapo4.isCurrency) === false && rawUnit === "%"; // Main KPI value

              var rawValue = Number.parseFloat(aContexts[0].getProperty(kpiDefinition.datapoint.propertyPath));
              var kpiValue = NumberFormat.getFloatInstance({
                style: isPercentage ? undefined : "short",
                minFractionDigits: 0,
                maxFractionDigits: 1,
                showScale: !isPercentage
              }, currentLocale).format(rawValue);
              oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainValue", kpiValue);
              var kpiValueUnscaled = NumberFormat.getFloatInstance({
                maxFractionDigits: 2,
                showScale: false,
                groupingEnabled: true
              }, currentLocale).format(rawValue);
              oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainValueUnscaled", kpiValueUnscaled); // Unit or currency

              if (kpiDefinition.datapoint.unit && rawUnit) {
                if (kpiDefinition.datapoint.unit.isCurrency) {
                  oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainUnit", rawUnit);
                } else {
                  // In case of unit of measure, we have to format it properly
                  var kpiUnit = NumberFormat.getUnitInstance({
                    showNumber: false
                  }, currentLocale).format(rawValue, rawUnit);
                  oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainUnit", kpiUnit);
                }
              } // Criticality


              if (kpiDefinition.datapoint.criticalityValue) {
                // Criticality is a fixed value
                oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality", kpiDefinition.datapoint.criticalityValue);
              } else if (kpiDefinition.datapoint.criticalityPath) {
                // Criticality comes from another property (via a path)
                var criticalityValue = messageTypeFromCriticality(aContexts[0].getProperty(kpiDefinition.datapoint.criticalityPath));
                oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality", criticalityValue);
              } else if (kpiDefinition.datapoint.criticalityCalculationThresholds && kpiDefinition.datapoint.criticalityCalculationMode) {
                // Criticality calculation
                var calculatedCriticality;

                switch (kpiDefinition.datapoint.criticalityCalculationMode) {
                  case "UI.ImprovementDirectionType/Target":
                    calculatedCriticality = messageTypeFromTargetCalculation(rawValue, kpiDefinition.datapoint.criticalityCalculationThresholds);
                    break;

                  case "UI.ImprovementDirectionType/Minimize":
                    calculatedCriticality = messageTypeFromMinimizeCalculation(rawValue, kpiDefinition.datapoint.criticalityCalculationThresholds);
                    break;

                  case "UI.ImprovementDirectionType/Maximize":
                  default:
                    calculatedCriticality = messageTypeFromMaximizeCalculation(rawValue, kpiDefinition.datapoint.criticalityCalculationThresholds);
                    break;
                }

                oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality", calculatedCriticality);
              } else {
                // No criticality
                oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality", MessageType.None);
              }
            }
          }
        });
      }
    }]);

    return KPIManagementControllerExtension;
  }(ControllerExtension), (_applyDecoratedDescriptor(_class2.prototype, "onInit", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onExit", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "onExit"), _class2.prototype)), _class2)) || _class);
  return KPIManagementControllerExtension;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIktQSU1hbmFnZW1lbnQudHMiXSwibmFtZXMiOlsibWVzc2FnZVR5cGVGcm9tQ3JpdGljYWxpdHkiLCJjcml0aWNhbGl0eVZhbHVlIiwiY3JpdGljYWxpdHlQcm9wZXJ0eSIsIk1lc3NhZ2VUeXBlIiwiRXJyb3IiLCJXYXJuaW5nIiwiU3VjY2VzcyIsIkluZm9ybWF0aW9uIiwiTm9uZSIsIm1lc3NhZ2VUeXBlRnJvbVRhcmdldENhbGN1bGF0aW9uIiwia3BpVmFsdWUiLCJhVGhyZXNob2xkcyIsInVuZGVmaW5lZCIsIm1lc3NhZ2VUeXBlRnJvbU1pbmltaXplQ2FsY3VsYXRpb24iLCJtZXNzYWdlVHlwZUZyb21NYXhpbWl6ZUNhbGN1bGF0aW9uIiwiY3JlYXRlRmlsdGVyRnJvbURlZmluaXRpb24iLCJmaWx0ZXJEZWZpbml0aW9uIiwicmFuZ2VzIiwibGVuZ3RoIiwiRmlsdGVyIiwicHJvcGVydHlQYXRoIiwib3BlcmF0b3IiLCJyYW5nZUxvdyIsInJhbmdlSGlnaCIsImFSYW5nZUZpbHRlcnMiLCJtYXAiLCJyYW5nZSIsImZpbHRlcnMiLCJhbmQiLCJLUElNYW5hZ2VtZW50Q29udHJvbGxlckV4dGVuc2lvbiIsIlVJNUNsYXNzIiwiQ29udHJvbGxlckV4dGVuc2lvbk1ldGFkYXRhIiwiT3ZlcnJpZGUiLCJhS1BJRGVmaW5pdGlvbnMiLCJnZXRLUElEYXRhIiwib1ZpZXciLCJnZXRWaWV3Iiwib0FwcENvbXBvbmVudCIsIkNvbW1vblV0aWxzIiwiZ2V0QXBwQ29tcG9uZW50Iiwib0tQSU1vZGVsIiwiSlNPTk1vZGVsIiwic2V0TW9kZWwiLCJmb3JFYWNoIiwia3BpRGVmaW5pdGlvbiIsIm9DYXJkTWFuaWZlc3QiLCJpZCIsInR5cGUiLCJ0ZWNobm9sb2d5IiwiZGF0YSIsImpzb24iLCJoZWFkZXIiLCJtYWluSW5kaWNhdG9yIiwibnVtYmVyIiwidW5pdCIsInRpdGxlIiwiY29udGVudCIsInBsb3RBcmVhIiwidGV4dCIsInZpc2libGUiLCJhbGlnbm1lbnQiLCJtZWFzdXJlQXhpcyIsImRpbWVuc2lvbkF4aXMiLCJwYXRoIiwic2V0UHJvcGVydHkiLCJtYW5pZmVzdCIsImxvYWRLUElUYWdEYXRhIiwiY2F0Y2giLCJlcnIiLCJMb2ciLCJlcnJvciIsImdldE1vZGVsIiwiZGVzdHJveSIsInNDdXN0b21EYXRhIiwiZ2V0Q29udGVudCIsInZEYXRhIiwiSlNPTiIsInBhcnNlIiwib01vZGVsIiwib0xpc3RCaW5kaW5nIiwiYmluZExpc3QiLCJlbnRpdHlTZXQiLCJvQWdncmVnYXRlIiwiZGF0YXBvaW50IiwiaXNQYXRoIiwidmFsdWUiLCJjcml0aWNhbGl0eVBhdGgiLCJzZXRBZ2dyZWdhdGlvbiIsImFnZ3JlZ2F0ZSIsInNlbGVjdGlvblZhcmlhbnRGaWx0ZXJEZWZpbml0aW9ucyIsImFGaWx0ZXJzIiwiZmlsdGVyIiwicmVxdWVzdENvbnRleHRzIiwidGhlbiIsImFDb250ZXh0cyIsImN1cnJlbnRMb2NhbGUiLCJMb2NhbGUiLCJzYXAiLCJ1aSIsImdldENvcmUiLCJnZXRDb25maWd1cmF0aW9uIiwiZ2V0TGFuZ3VhZ2UiLCJyYXdVbml0IiwiZ2V0UHJvcGVydHkiLCJpc1BlcmNlbnRhZ2UiLCJpc0N1cnJlbmN5IiwicmF3VmFsdWUiLCJOdW1iZXIiLCJwYXJzZUZsb2F0IiwiTnVtYmVyRm9ybWF0IiwiZ2V0RmxvYXRJbnN0YW5jZSIsInN0eWxlIiwibWluRnJhY3Rpb25EaWdpdHMiLCJtYXhGcmFjdGlvbkRpZ2l0cyIsInNob3dTY2FsZSIsImZvcm1hdCIsImtwaVZhbHVlVW5zY2FsZWQiLCJncm91cGluZ0VuYWJsZWQiLCJrcGlVbml0IiwiZ2V0VW5pdEluc3RhbmNlIiwic2hvd051bWJlciIsImNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzIiwiY3JpdGljYWxpdHlDYWxjdWxhdGlvbk1vZGUiLCJjYWxjdWxhdGVkQ3JpdGljYWxpdHkiLCJDb250cm9sbGVyRXh0ZW5zaW9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7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R0FBRzlHLGtDQUFrQyxDQUN6RDZGLFFBRHlELEVBRXpEOUQsYUFBYSxDQUFDdUMsU0FBZCxDQUF3QnNDLGdDQUZpQyxDQUExRDtBQUlBOztBQUVELHVCQUFLLHNDQUFMO0FBQ0E7QUFDQ0Usb0JBQUFBLHFCQUFxQixHQUFHN0csa0NBQWtDLENBQ3pENEYsUUFEeUQsRUFFekQ5RCxhQUFhLENBQUN1QyxTQUFkLENBQXdCc0MsZ0NBRmlDLENBQTFEO0FBSUE7QUFyQkY7O0FBdUJBakYsZ0JBQUFBLFNBQVMsQ0FBQ3dCLFdBQVYsQ0FDQyxNQUFNcEIsYUFBYSxDQUFDRSxFQUFwQixHQUF5Qiw4Q0FEMUIsRUFFQzZFLHFCQUZEO0FBSUEsZUFqQ00sTUFpQ0E7QUFDTjtBQUNBbkYsZ0JBQUFBLFNBQVMsQ0FBQ3dCLFdBQVYsQ0FBc0IsTUFBTXBCLGFBQWEsQ0FBQ0UsRUFBcEIsR0FBeUIsOENBQS9DLEVBQStGM0MsV0FBVyxDQUFDSyxJQUEzRztBQUNBO0FBQ0Q7QUFDRDtBQUNELFNBMUdNLENBQVA7QUEyR0E7Ozs7SUFoUDZDb0gsbUI7U0FtUGhDL0YsZ0MiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnRyb2xsZXJFeHRlbnNpb24gfSBmcm9tIFwic2FwL3VpL2NvcmUvbXZjXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyRXh0ZW5zaW9uTWV0YWRhdGEgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udHJvbGxlcmV4dGVuc2lvbnNcIjtcbmltcG9ydCB7IFVJNUNsYXNzLCBPdmVycmlkZSB9IGZyb20gXCIuLi9oZWxwZXJzL0NsYXNzU3VwcG9ydFwiO1xuaW1wb3J0IHsgSlNPTk1vZGVsIH0gZnJvbSBcInNhcC91aS9tb2RlbC9qc29uXCI7XG5pbXBvcnQgeyBMb2cgfSBmcm9tIFwic2FwL2Jhc2VcIjtcbmltcG9ydCB7IEtQSURlZmluaXRpb24gfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb250cm9scy9Db21tb24vS1BJXCI7XG5pbXBvcnQgeyBDb21tb25VdGlscyB9IGZyb20gXCJzYXAvZmUvY29yZVwiO1xuaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJzYXAvdWkvbW9kZWwvb2RhdGEvdjRcIjtcbmltcG9ydCB7IE1lc3NhZ2VUeXBlIH0gZnJvbSBcInNhcC9mZS9jb3JlL2Zvcm1hdHRlcnMvVGFibGVGb3JtYXR0ZXJUeXBlc1wiO1xuaW1wb3J0IHsgRmlsdGVyRGVmaW5pdGlvbiB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvU2VsZWN0aW9uVmFyaWFudEhlbHBlclwiO1xuaW1wb3J0IHsgTnVtYmVyRm9ybWF0IH0gZnJvbSBcInNhcC91aS9jb3JlL2Zvcm1hdFwiO1xuaW1wb3J0IHsgTG9jYWxlIH0gZnJvbSBcInNhcC91aS9jb3JlXCI7XG5pbXBvcnQgeyBGaWx0ZXIsIEZpbHRlck9wZXJhdG9yIH0gZnJvbSBcInNhcC91aS9tb2RlbFwiO1xuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSBhIG1lc3NhZ2Ugc3RhdGUgZnJvbSBhIGNyaXRpY2FsaXR5IHZhbHVlLlxuICpcbiAqIEBwYXJhbSB7bnVtYmVyfHN0cmluZ30gY3JpdGljYWxpdHlWYWx1ZSBUaGUgY3JpdGljYWxpdHkgdmFsdWVzLlxuICogQHJldHVybnMge01lc3NhZ2VUeXBlfSBSZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIE1lc3NhZ2VUeXBlXG4gKi9cbmZ1bmN0aW9uIG1lc3NhZ2VUeXBlRnJvbUNyaXRpY2FsaXR5KGNyaXRpY2FsaXR5VmFsdWU6IG51bWJlciB8IHN0cmluZyk6IE1lc3NhZ2VUeXBlIHtcblx0bGV0IGNyaXRpY2FsaXR5UHJvcGVydHk6IE1lc3NhZ2VUeXBlO1xuXG5cdHN3aXRjaCAoY3JpdGljYWxpdHlWYWx1ZSkge1xuXHRcdGNhc2UgMTpcblx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5FcnJvcjtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgMjpcblx0XHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5XYXJuaW5nO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSAzOlxuXHRcdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLlN1Y2Nlc3M7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIDU6XG5cdFx0XHRjcml0aWNhbGl0eVByb3BlcnR5ID0gTWVzc2FnZVR5cGUuSW5mb3JtYXRpb247XG5cdFx0XHRicmVhaztcblx0XHRkZWZhdWx0OlxuXHRcdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLk5vbmU7XG5cdH1cblxuXHRyZXR1cm4gY3JpdGljYWxpdHlQcm9wZXJ0eTtcbn1cblxuLyoqXG4gKiBGdW5jdGlvbiB0byBjYWxjdWxhdGUgdGhlIG1lc3NhZ2Ugc3RhdGUgZm9yIGEgY3JpdGljYWxpdHkgY2FsY3VsYXRpb24gb2YgdHlwZSAnVGFyZ2V0Jy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0ga3BpVmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBLUEkgdG8gYmUgdGVzdGVkIGFnYWluc3QuXG4gKiBAcGFyYW0ge251bWJlcltdfSBhVGhyZXNob2xkcyBUaHJlc2hvbGRzIHRvIGJlIHVzZWQgW0RldmlhdGlvblJhbmdlTG93VmFsdWUsVG9sZXJhbmNlUmFuZ2VMb3dWYWx1ZSxBY2NlcHRhbmNlUmFuZ2VMb3dWYWx1ZSxBY2NlcHRhbmNlUmFuZ2VIaWdoVmFsdWUsVG9sZXJhbmNlUmFuZ2VIaWdoVmFsdWUsRGV2aWF0aW9uUmFuZ2VIaWdoVmFsdWVdLlxuICogQHJldHVybnMge01lc3NhZ2VUeXBlfSBSZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIE1lc3NhZ2VUeXBlXG4gKi9cbmZ1bmN0aW9uIG1lc3NhZ2VUeXBlRnJvbVRhcmdldENhbGN1bGF0aW9uKGtwaVZhbHVlOiBudW1iZXIsIGFUaHJlc2hvbGRzOiAobnVtYmVyIHwgdW5kZWZpbmVkIHwgbnVsbClbXSk6IE1lc3NhZ2VUeXBlIHtcblx0bGV0IGNyaXRpY2FsaXR5UHJvcGVydHk6IE1lc3NhZ2VUeXBlO1xuXG5cdGlmIChhVGhyZXNob2xkc1swXSAhPT0gdW5kZWZpbmVkICYmIGFUaHJlc2hvbGRzWzBdICE9PSBudWxsICYmIGtwaVZhbHVlIDwgYVRocmVzaG9sZHNbMF0pIHtcblx0XHRjcml0aWNhbGl0eVByb3BlcnR5ID0gTWVzc2FnZVR5cGUuRXJyb3I7XG5cdH0gZWxzZSBpZiAoYVRocmVzaG9sZHNbMV0gIT09IHVuZGVmaW5lZCAmJiBhVGhyZXNob2xkc1sxXSAhPT0gbnVsbCAmJiBrcGlWYWx1ZSA8IGFUaHJlc2hvbGRzWzFdKSB7XG5cdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLldhcm5pbmc7XG5cdH0gZWxzZSBpZiAoYVRocmVzaG9sZHNbMl0gIT09IHVuZGVmaW5lZCAmJiBhVGhyZXNob2xkc1syXSAhPT0gbnVsbCAmJiBrcGlWYWx1ZSA8IGFUaHJlc2hvbGRzWzJdKSB7XG5cdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLk5vbmU7XG5cdH0gZWxzZSBpZiAoYVRocmVzaG9sZHNbNV0gIT09IHVuZGVmaW5lZCAmJiBhVGhyZXNob2xkc1s1XSAhPT0gbnVsbCAmJiBrcGlWYWx1ZSA+IGFUaHJlc2hvbGRzWzVdKSB7XG5cdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLkVycm9yO1xuXHR9IGVsc2UgaWYgKGFUaHJlc2hvbGRzWzRdICE9PSB1bmRlZmluZWQgJiYgYVRocmVzaG9sZHNbNF0gIT09IG51bGwgJiYga3BpVmFsdWUgPiBhVGhyZXNob2xkc1s0XSkge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5XYXJuaW5nO1xuXHR9IGVsc2UgaWYgKGFUaHJlc2hvbGRzWzNdICE9PSB1bmRlZmluZWQgJiYgYVRocmVzaG9sZHNbM10gIT09IG51bGwgJiYga3BpVmFsdWUgPiBhVGhyZXNob2xkc1szXSkge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5Ob25lO1xuXHR9IGVsc2Uge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5TdWNjZXNzO1xuXHR9XG5cblx0cmV0dXJuIGNyaXRpY2FsaXR5UHJvcGVydHk7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBtZXNzYWdlIHN0YXRlIGZvciBhIGNyaXRpY2FsaXR5IGNhbGN1bGF0aW9uIG9mIHR5cGUgJ01pbmltaXplJy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0ga3BpVmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBLUEkgdG8gYmUgdGVzdGVkIGFnYWluc3QuXG4gKiBAcGFyYW0ge251bWJlcltdfSBhVGhyZXNob2xkcyBUaHJlc2hvbGRzIHRvIGJlIHVzZWQgW0FjY2VwdGFuY2VSYW5nZUhpZ2hWYWx1ZSxUb2xlcmFuY2VSYW5nZUhpZ2hWYWx1ZSxEZXZpYXRpb25SYW5nZUhpZ2hWYWx1ZV0uXG4gKiBAcmV0dXJucyB7TWVzc2FnZVR5cGV9IFJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgTWVzc2FnZVR5cGVcbiAqL1xuZnVuY3Rpb24gbWVzc2FnZVR5cGVGcm9tTWluaW1pemVDYWxjdWxhdGlvbihrcGlWYWx1ZTogbnVtYmVyLCBhVGhyZXNob2xkczogKG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGwpW10pOiBNZXNzYWdlVHlwZSB7XG5cdGxldCBjcml0aWNhbGl0eVByb3BlcnR5OiBNZXNzYWdlVHlwZTtcblxuXHRpZiAoYVRocmVzaG9sZHNbMl0gIT09IHVuZGVmaW5lZCAmJiBhVGhyZXNob2xkc1syXSAhPT0gbnVsbCAmJiBrcGlWYWx1ZSA+IGFUaHJlc2hvbGRzWzJdKSB7XG5cdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLkVycm9yO1xuXHR9IGVsc2UgaWYgKGFUaHJlc2hvbGRzWzFdICE9PSB1bmRlZmluZWQgJiYgYVRocmVzaG9sZHNbMV0gIT09IG51bGwgJiYga3BpVmFsdWUgPiBhVGhyZXNob2xkc1sxXSkge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5XYXJuaW5nO1xuXHR9IGVsc2UgaWYgKGFUaHJlc2hvbGRzWzBdICE9PSB1bmRlZmluZWQgJiYgYVRocmVzaG9sZHNbMF0gIT09IG51bGwgJiYga3BpVmFsdWUgPiBhVGhyZXNob2xkc1swXSkge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5Ob25lO1xuXHR9IGVsc2Uge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5TdWNjZXNzO1xuXHR9XG5cblx0cmV0dXJuIGNyaXRpY2FsaXR5UHJvcGVydHk7XG59XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gY2FsY3VsYXRlIHRoZSBtZXNzYWdlIHN0YXRlIGZvciBhIGNyaXRpY2FsaXR5IGNhbGN1bGF0aW9uIG9mIHR5cGUgJ01heGltaXplJy5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0ga3BpVmFsdWUgVGhlIHZhbHVlIG9mIHRoZSBLUEkgdG8gYmUgdGVzdGVkIGFnYWluc3QuXG4gKiBAcGFyYW0ge251bWJlcltdfSBhVGhyZXNob2xkcyBUaHJlc2hvbGRzIHRvIGJlIHVzZWQgW0RldmlhdGlvblJhbmdlTG93VmFsdWUsVG9sZXJhbmNlUmFuZ2VMb3dWYWx1ZSxBY2NlcHRhbmNlUmFuZ2VMb3dWYWx1ZV0uXG4gKiBAcmV0dXJucyB7TWVzc2FnZVR5cGV9IFJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgTWVzc2FnZVR5cGVcbiAqL1xuZnVuY3Rpb24gbWVzc2FnZVR5cGVGcm9tTWF4aW1pemVDYWxjdWxhdGlvbihrcGlWYWx1ZTogbnVtYmVyLCBhVGhyZXNob2xkczogKG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGwpW10pOiBNZXNzYWdlVHlwZSB7XG5cdGxldCBjcml0aWNhbGl0eVByb3BlcnR5OiBNZXNzYWdlVHlwZTtcblxuXHRpZiAoYVRocmVzaG9sZHNbMF0gIT09IHVuZGVmaW5lZCAmJiBhVGhyZXNob2xkc1swXSAhPT0gbnVsbCAmJiBrcGlWYWx1ZSA8IGFUaHJlc2hvbGRzWzBdKSB7XG5cdFx0Y3JpdGljYWxpdHlQcm9wZXJ0eSA9IE1lc3NhZ2VUeXBlLkVycm9yO1xuXHR9IGVsc2UgaWYgKGFUaHJlc2hvbGRzWzFdICE9PSB1bmRlZmluZWQgJiYgYVRocmVzaG9sZHNbMV0gIT09IG51bGwgJiYga3BpVmFsdWUgPCBhVGhyZXNob2xkc1sxXSkge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5XYXJuaW5nO1xuXHR9IGVsc2UgaWYgKGFUaHJlc2hvbGRzWzJdICE9PSB1bmRlZmluZWQgJiYgYVRocmVzaG9sZHNbMl0gIT09IG51bGwgJiYga3BpVmFsdWUgPCBhVGhyZXNob2xkc1syXSkge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5Ob25lO1xuXHR9IGVsc2Uge1xuXHRcdGNyaXRpY2FsaXR5UHJvcGVydHkgPSBNZXNzYWdlVHlwZS5TdWNjZXNzO1xuXHR9XG5cblx0cmV0dXJuIGNyaXRpY2FsaXR5UHJvcGVydHk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIHNhcC51aS5tb2RlbC5GaWx0ZXIgZnJvbSBhIGZpbHRlciBkZWZpbml0aW9uLlxuICpcbiAqIEBwYXJhbSBmaWx0ZXJEZWZpbml0aW9uIFRoZSBmaWx0ZXIgZGVmaW5pdGlvblxuICogQHJldHVybnMgUmV0dXJucyBhIHNhcC51aS5tb2RlbC5GaWx0ZXIgZnJvbSB0aGUgZGVmaW5pdGlvbiwgb3IgdW5kZWZpbmVkIGlmIHRoZSBkZWZpbml0aW9uIGlzIGVtcHR5IChubyByYW5nZXMpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWx0ZXJGcm9tRGVmaW5pdGlvbihmaWx0ZXJEZWZpbml0aW9uOiBGaWx0ZXJEZWZpbml0aW9uKTogRmlsdGVyIHwgdW5kZWZpbmVkIHtcblx0aWYgKGZpbHRlckRlZmluaXRpb24ucmFuZ2VzLmxlbmd0aCA9PT0gMCkge1xuXHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdH0gZWxzZSBpZiAoZmlsdGVyRGVmaW5pdGlvbi5yYW5nZXMubGVuZ3RoID09PSAxKSB7XG5cdFx0cmV0dXJuIG5ldyBGaWx0ZXIoXG5cdFx0XHRmaWx0ZXJEZWZpbml0aW9uLnByb3BlcnR5UGF0aCxcblx0XHRcdGZpbHRlckRlZmluaXRpb24ucmFuZ2VzWzBdLm9wZXJhdG9yIGFzIEZpbHRlck9wZXJhdG9yLFxuXHRcdFx0ZmlsdGVyRGVmaW5pdGlvbi5yYW5nZXNbMF0ucmFuZ2VMb3csXG5cdFx0XHRmaWx0ZXJEZWZpbml0aW9uLnJhbmdlc1swXS5yYW5nZUhpZ2hcblx0XHQpO1xuXHR9IGVsc2Uge1xuXHRcdGNvbnN0IGFSYW5nZUZpbHRlcnMgPSBmaWx0ZXJEZWZpbml0aW9uLnJhbmdlcy5tYXAocmFuZ2UgPT4ge1xuXHRcdFx0cmV0dXJuIG5ldyBGaWx0ZXIoZmlsdGVyRGVmaW5pdGlvbi5wcm9wZXJ0eVBhdGgsIHJhbmdlLm9wZXJhdG9yIGFzIEZpbHRlck9wZXJhdG9yLCByYW5nZS5yYW5nZUxvdywgcmFuZ2UucmFuZ2VIaWdoKTtcblx0XHR9KTtcblx0XHRyZXR1cm4gbmV3IEZpbHRlcih7XG5cdFx0XHRmaWx0ZXJzOiBhUmFuZ2VGaWx0ZXJzLFxuXHRcdFx0YW5kOiBmYWxzZVxuXHRcdH0pO1xuXHR9XG59XG5cbi8qKlxuICogQGNsYXNzIEEgY29udHJvbGxlciBleHRlbnNpb24gZm9yIG1hbmFnaW5nIEtQSSBpbiBhbiBBbmFseXRpY2FsTGlzdFBhZ2VcbiAqXG4gKiBAbmFtZSBzYXAuZmUuY29yZS5jb250cm9sbGVyZXh0ZW5zaW9ucy5LUElNYW5hZ2VtZW50XG4gKiBAaGlkZWNvbnN0cnVjdG9yXG4gKlxuICogQHByaXZhdGVcbiAqIEBzaW5jZSAxLjkzLjBcbiAqL1xuQFVJNUNsYXNzKFwic2FwLmZlLmNvcmUuY29udHJvbGxlcmV4dGVuc2lvbnMuS1BJTWFuYWdlbWVudFwiLCBDb250cm9sbGVyRXh0ZW5zaW9uTWV0YWRhdGEpXG5jbGFzcyBLUElNYW5hZ2VtZW50Q29udHJvbGxlckV4dGVuc2lvbiBleHRlbmRzIENvbnRyb2xsZXJFeHRlbnNpb24ge1xuXHRwcm90ZWN0ZWQgYUtQSURlZmluaXRpb25zPzogS1BJRGVmaW5pdGlvbltdO1xuXHRwcm90ZWN0ZWQgb0FwcENvbXBvbmVudCE6IGFueTtcblxuXHRAT3ZlcnJpZGUoKVxuXHRwdWJsaWMgb25Jbml0KCk6IHZvaWQge1xuXHRcdHRoaXMuYUtQSURlZmluaXRpb25zID0gdGhpcy5nZXRLUElEYXRhKCk7XG5cblx0XHRpZiAodGhpcy5hS1BJRGVmaW5pdGlvbnMgJiYgdGhpcy5hS1BJRGVmaW5pdGlvbnMubGVuZ3RoKSB7XG5cdFx0XHRjb25zdCBvVmlldyA9IHRoaXMuZ2V0VmlldygpO1xuXHRcdFx0dGhpcy5vQXBwQ29tcG9uZW50ID0gQ29tbW9uVXRpbHMuZ2V0QXBwQ29tcG9uZW50KG9WaWV3KTtcblxuXHRcdFx0Ly8gQ3JlYXRlIGEgSlNPTiBtb2RlbCB0byBzdG9yZSBLUEkgZGF0YVxuXHRcdFx0Y29uc3Qgb0tQSU1vZGVsID0gbmV3IEpTT05Nb2RlbCgpO1xuXHRcdFx0b1ZpZXcuc2V0TW9kZWwob0tQSU1vZGVsLCBcImtwaU1vZGVsXCIpO1xuXG5cdFx0XHR0aGlzLmFLUElEZWZpbml0aW9ucy5mb3JFYWNoKGtwaURlZmluaXRpb24gPT4ge1xuXHRcdFx0XHQvLyBDcmVhdGUgdGhlIG1hbmlmZXN0IGZvciB0aGUgS1BJIGNhcmQgYW5kIHN0b3JlIGl0IGluIHRoZSBLUEkgbW9kZWxcblx0XHRcdFx0Y29uc3Qgb0NhcmRNYW5pZmVzdCA9IHtcblx0XHRcdFx0XHRcInNhcC5hcHBcIjoge1xuXHRcdFx0XHRcdFx0aWQ6IFwic2FwLmZlXCIsXG5cdFx0XHRcdFx0XHR0eXBlOiBcImNhcmRcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJzYXAudWlcIjoge1xuXHRcdFx0XHRcdFx0dGVjaG5vbG9neTogXCJVSTVcIlxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XCJzYXAuY2FyZFwiOiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcIkFuYWx5dGljYWxcIixcblx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0anNvbjoge31cblx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRoZWFkZXI6IHtcblx0XHRcdFx0XHRcdFx0dHlwZTogXCJOdW1lcmljXCIsXG5cdFx0XHRcdFx0XHRcdG1haW5JbmRpY2F0b3I6IHtcblx0XHRcdFx0XHRcdFx0XHRudW1iZXI6IFwie21haW5WYWx1ZX1cIixcblx0XHRcdFx0XHRcdFx0XHR1bml0OiBcInttYWluVW5pdH1cIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHR0aXRsZTogXCJ7Y2FyZFRpdGxlfVwiXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Y29udGVudDoge1xuXHRcdFx0XHRcdFx0XHRwbG90QXJlYToge1xuXHRcdFx0XHRcdFx0XHRcdFwiZGF0YUxhYmVsXCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZVxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XCJjYXRlZ29yeUF4aXNUZXh0XCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZVxuXHRcdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdFx0XCJ2YWx1ZUF4aXNUZXh0XCI6IHtcblx0XHRcdFx0XHRcdFx0XHRcdFwidmlzaWJsZVwiOiBmYWxzZVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdFx0dGl0bGU6IHtcblx0XHRcdFx0XHRcdFx0XHR0ZXh0OiBcIntjaGFydFRpdGxlfVwiLFxuXHRcdFx0XHRcdFx0XHRcdHZpc2libGU6IHRydWUsXG5cdFx0XHRcdFx0XHRcdFx0YWxpZ25tZW50OiBcIkxlZnRcIlxuXHRcdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0XHRtZWFzdXJlQXhpczogXCJ2YWx1ZUF4aXNcIixcblx0XHRcdFx0XHRcdFx0ZGltZW5zaW9uQXhpczogXCJjYXRlZ29yeUF4aXNcIixcblx0XHRcdFx0XHRcdFx0ZGF0YToge1xuXHRcdFx0XHRcdFx0XHRcdHBhdGg6IFwiL2NoYXJ0RGF0YVwiXG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH07XG5cblx0XHRcdFx0b0tQSU1vZGVsLnNldFByb3BlcnR5KFwiL1wiICsga3BpRGVmaW5pdGlvbi5pZCwge1xuXHRcdFx0XHRcdG1hbmlmZXN0OiBvQ2FyZE1hbmlmZXN0XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdC8vIExvYWQgdGFnIGRhdGEgZm9yIHRoZSBLUElcblx0XHRcdFx0dGhpcy5sb2FkS1BJVGFnRGF0YShrcGlEZWZpbml0aW9uKS5jYXRjaChmdW5jdGlvbihlcnI6IGFueSkge1xuXHRcdFx0XHRcdExvZy5lcnJvcihlcnIpO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdEBPdmVycmlkZSgpXG5cdHB1YmxpYyBvbkV4aXQoKTogdm9pZCB7XG5cdFx0Y29uc3Qgb0tQSU1vZGVsID0gdGhpcy5nZXRWaWV3KCkuZ2V0TW9kZWwoXCJrcGlNb2RlbFwiKSBhcyBKU09OTW9kZWw7XG5cblx0XHRpZiAob0tQSU1vZGVsKSB7XG5cdFx0XHRvS1BJTW9kZWwuZGVzdHJveSgpO1xuXHRcdH1cblx0fVxuXG5cdHByaXZhdGUgZ2V0S1BJRGF0YSgpOiBLUElEZWZpbml0aW9uW10gfCB1bmRlZmluZWQge1xuXHRcdGNvbnN0IG9WaWV3ID0gdGhpcy5nZXRWaWV3KCksXG5cdFx0XHRzQ3VzdG9tRGF0YSA9IG9WaWV3LmdldENvbnRlbnQoKVswXS5kYXRhKFwiS1BJRGF0YVwiKTtcblxuXHRcdGlmIChzQ3VzdG9tRGF0YSkge1xuXHRcdFx0Y29uc3QgdkRhdGEgPSB0eXBlb2Ygc0N1c3RvbURhdGEgPT09IFwic3RyaW5nXCIgPyBKU09OLnBhcnNlKHNDdXN0b21EYXRhKSA6IHNDdXN0b21EYXRhO1xuXHRcdFx0aWYgKFwiY3VzdG9tRGF0YVwiIGluIHZEYXRhKSB7XG5cdFx0XHRcdHJldHVybiB2RGF0YVtcImN1c3RvbURhdGFcIl07XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gdkRhdGE7XG5cdFx0XHR9XG5cdFx0fSBlbHNlIHtcblx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0fVxuXHR9XG5cblx0LyoqXG5cdCAqIExvYWRzIHRhZyBkYXRhIGZvciBhIEtQSS5cblx0ICpcblx0ICogQHBhcmFtIHtLUElEZWZpbml0aW9ufSBrcGlEZWZpbml0aW9uIFRoZSBkZWZpbml0aW9uIG9mIHRoZSBLUEkuXG5cdCAqIEByZXR1cm5zIHtQcm9taXNlfSBSZXR1cm5zIHRoZSBQcm9taXNlIHRoYXQgaXMgcmVzb2x2ZWQgd2hlbiBkYXRhIGlzIGxvYWRlZC5cblx0ICovXG5cdHByb3RlY3RlZCBsb2FkS1BJVGFnRGF0YShrcGlEZWZpbml0aW9uOiBLUElEZWZpbml0aW9uKTogYW55IHtcblx0XHRjb25zdCBvTW9kZWwgPSB0aGlzLm9BcHBDb21wb25lbnQuZ2V0TW9kZWwoKTtcblx0XHRjb25zdCBvS1BJTW9kZWwgPSB0aGlzLmdldFZpZXcoKS5nZXRNb2RlbChcImtwaU1vZGVsXCIpIGFzIEpTT05Nb2RlbDtcblx0XHRjb25zdCBvTGlzdEJpbmRpbmcgPSBvTW9kZWwuYmluZExpc3QoXCIvXCIgKyBrcGlEZWZpbml0aW9uLmVudGl0eVNldCk7XG5cdFx0Y29uc3Qgb0FnZ3JlZ2F0ZTogUmVjb3JkPHN0cmluZywgeyB1bml0Pzogc3RyaW5nIH0+ID0ge307XG5cblx0XHQvLyBNYWluIHZhbHVlICsgY3VycmVuY3kvdW5pdFxuXHRcdGlmIChrcGlEZWZpbml0aW9uLmRhdGFwb2ludC51bml0Py5pc1BhdGgpIHtcblx0XHRcdG9BZ2dyZWdhdGVba3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQucHJvcGVydHlQYXRoXSA9IHsgdW5pdDoga3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQudW5pdC52YWx1ZSB9O1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvQWdncmVnYXRlW2twaURlZmluaXRpb24uZGF0YXBvaW50LnByb3BlcnR5UGF0aF0gPSB7fTtcblx0XHR9XG5cblx0XHQvLyBQcm9wZXJ0eSBmb3IgY3JpdGljYWxpdHlcblx0XHRpZiAoa3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQuY3JpdGljYWxpdHlQYXRoKSB7XG5cdFx0XHRvQWdncmVnYXRlW2twaURlZmluaXRpb24uZGF0YXBvaW50LmNyaXRpY2FsaXR5UGF0aF0gPSB7fTtcblx0XHR9XG5cdFx0b0xpc3RCaW5kaW5nLnNldEFnZ3JlZ2F0aW9uKHsgYWdncmVnYXRlOiBvQWdncmVnYXRlIH0pO1xuXG5cdFx0Ly8gTWFuYWdlIFNlbGVjdGlvblZhcmlhbnQgZmlsdGVyc1xuXHRcdGlmIChrcGlEZWZpbml0aW9uLnNlbGVjdGlvblZhcmlhbnRGaWx0ZXJEZWZpbml0aW9ucz8ubGVuZ3RoKSB7XG5cdFx0XHRjb25zdCBhRmlsdGVycyA9IGtwaURlZmluaXRpb24uc2VsZWN0aW9uVmFyaWFudEZpbHRlckRlZmluaXRpb25zLm1hcChjcmVhdGVGaWx0ZXJGcm9tRGVmaW5pdGlvbik7XG5cdFx0XHRvTGlzdEJpbmRpbmcuZmlsdGVyKGFGaWx0ZXJzKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gb0xpc3RCaW5kaW5nLnJlcXVlc3RDb250ZXh0cygwLCAxKS50aGVuKChhQ29udGV4dHM6IENvbnRleHRbXSkgPT4ge1xuXHRcdFx0aWYgKGFDb250ZXh0cy5sZW5ndGgpIHtcblx0XHRcdFx0Y29uc3QgY3VycmVudExvY2FsZSA9IG5ldyBMb2NhbGUoXG5cdFx0XHRcdFx0c2FwLnVpXG5cdFx0XHRcdFx0XHQuZ2V0Q29yZSgpXG5cdFx0XHRcdFx0XHQuZ2V0Q29uZmlndXJhdGlvbigpXG5cdFx0XHRcdFx0XHQuZ2V0TGFuZ3VhZ2UoKVxuXHRcdFx0XHQpO1xuXHRcdFx0XHRjb25zdCByYXdVbml0ID0ga3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQudW5pdD8uaXNQYXRoXG5cdFx0XHRcdFx0PyBhQ29udGV4dHNbMF0uZ2V0UHJvcGVydHkoa3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQudW5pdC52YWx1ZSlcblx0XHRcdFx0XHQ6IGtwaURlZmluaXRpb24uZGF0YXBvaW50LnVuaXQ/LnZhbHVlO1xuXG5cdFx0XHRcdGlmIChrcGlEZWZpbml0aW9uLmRhdGFwb2ludC51bml0ICYmICFyYXdVbml0KSB7XG5cdFx0XHRcdFx0Ly8gQSB1bml0L2N1cnJlbmN5IGlzIGRlZmluZWQsIGJ1dCBpdHMgdmFsdWUgaXMgdW5kZWZpbmVkIC0tPiBtdWx0aS11bml0IHNpdHVhdGlvblxuXHRcdFx0XHRcdG9LUElNb2RlbC5zZXRQcm9wZXJ0eShcIi9cIiArIGtwaURlZmluaXRpb24uaWQgKyBcIi9tYW5pZmVzdC9zYXAuY2FyZC9kYXRhL2pzb24vbWFpblZhbHVlXCIsIFwiKlwiKTtcblx0XHRcdFx0XHRvS1BJTW9kZWwuc2V0UHJvcGVydHkoXCIvXCIgKyBrcGlEZWZpbml0aW9uLmlkICsgXCIvbWFuaWZlc3Qvc2FwLmNhcmQvZGF0YS9qc29uL21haW5WYWx1ZVVuc2NhbGVkXCIsIFwiKlwiKTtcblx0XHRcdFx0XHRvS1BJTW9kZWwuc2V0UHJvcGVydHkoXCIvXCIgKyBrcGlEZWZpbml0aW9uLmlkICsgXCIvbWFuaWZlc3Qvc2FwLmNhcmQvZGF0YS9qc29uL21haW5Vbml0XCIsIHVuZGVmaW5lZCk7XG5cdFx0XHRcdFx0b0tQSU1vZGVsLnNldFByb3BlcnR5KFwiL1wiICsga3BpRGVmaW5pdGlvbi5pZCArIFwiL21hbmlmZXN0L3NhcC5jYXJkL2RhdGEvanNvbi9tYWluQ3JpdGljYWxpdHlcIiwgTWVzc2FnZVR5cGUuTm9uZSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Y29uc3QgaXNQZXJjZW50YWdlID0ga3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQudW5pdD8uaXNDdXJyZW5jeSA9PT0gZmFsc2UgJiYgcmF3VW5pdCA9PT0gXCIlXCI7XG5cblx0XHRcdFx0XHQvLyBNYWluIEtQSSB2YWx1ZVxuXHRcdFx0XHRcdGNvbnN0IHJhd1ZhbHVlID0gTnVtYmVyLnBhcnNlRmxvYXQoYUNvbnRleHRzWzBdLmdldFByb3BlcnR5KGtwaURlZmluaXRpb24uZGF0YXBvaW50LnByb3BlcnR5UGF0aCkpO1xuXHRcdFx0XHRcdGNvbnN0IGtwaVZhbHVlID0gTnVtYmVyRm9ybWF0LmdldEZsb2F0SW5zdGFuY2UoXG5cdFx0XHRcdFx0XHR7XG5cdFx0XHRcdFx0XHRcdHN0eWxlOiBpc1BlcmNlbnRhZ2UgPyB1bmRlZmluZWQgOiBcInNob3J0XCIsXG5cdFx0XHRcdFx0XHRcdG1pbkZyYWN0aW9uRGlnaXRzOiAwLFxuXHRcdFx0XHRcdFx0XHRtYXhGcmFjdGlvbkRpZ2l0czogMSxcblx0XHRcdFx0XHRcdFx0c2hvd1NjYWxlOiAhaXNQZXJjZW50YWdlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Y3VycmVudExvY2FsZVxuXHRcdFx0XHRcdCkuZm9ybWF0KHJhd1ZhbHVlKTtcblx0XHRcdFx0XHRvS1BJTW9kZWwuc2V0UHJvcGVydHkoXCIvXCIgKyBrcGlEZWZpbml0aW9uLmlkICsgXCIvbWFuaWZlc3Qvc2FwLmNhcmQvZGF0YS9qc29uL21haW5WYWx1ZVwiLCBrcGlWYWx1ZSk7XG5cdFx0XHRcdFx0Y29uc3Qga3BpVmFsdWVVbnNjYWxlZCA9IE51bWJlckZvcm1hdC5nZXRGbG9hdEluc3RhbmNlKFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRtYXhGcmFjdGlvbkRpZ2l0czogMixcblx0XHRcdFx0XHRcdFx0c2hvd1NjYWxlOiBmYWxzZSxcblx0XHRcdFx0XHRcdFx0Z3JvdXBpbmdFbmFibGVkOiB0cnVlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0Y3VycmVudExvY2FsZVxuXHRcdFx0XHRcdCkuZm9ybWF0KHJhd1ZhbHVlKTtcblx0XHRcdFx0XHRvS1BJTW9kZWwuc2V0UHJvcGVydHkoXCIvXCIgKyBrcGlEZWZpbml0aW9uLmlkICsgXCIvbWFuaWZlc3Qvc2FwLmNhcmQvZGF0YS9qc29uL21haW5WYWx1ZVVuc2NhbGVkXCIsIGtwaVZhbHVlVW5zY2FsZWQpO1xuXG5cdFx0XHRcdFx0Ly8gVW5pdCBvciBjdXJyZW5jeVxuXHRcdFx0XHRcdGlmIChrcGlEZWZpbml0aW9uLmRhdGFwb2ludC51bml0ICYmIHJhd1VuaXQpIHtcblx0XHRcdFx0XHRcdGlmIChrcGlEZWZpbml0aW9uLmRhdGFwb2ludC51bml0LmlzQ3VycmVuY3kpIHtcblx0XHRcdFx0XHRcdFx0b0tQSU1vZGVsLnNldFByb3BlcnR5KFwiL1wiICsga3BpRGVmaW5pdGlvbi5pZCArIFwiL21hbmlmZXN0L3NhcC5jYXJkL2RhdGEvanNvbi9tYWluVW5pdFwiLCByYXdVbml0KTtcblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdC8vIEluIGNhc2Ugb2YgdW5pdCBvZiBtZWFzdXJlLCB3ZSBoYXZlIHRvIGZvcm1hdCBpdCBwcm9wZXJseVxuXHRcdFx0XHRcdFx0XHRjb25zdCBrcGlVbml0ID0gTnVtYmVyRm9ybWF0LmdldFVuaXRJbnN0YW5jZSh7IHNob3dOdW1iZXI6IGZhbHNlIH0sIGN1cnJlbnRMb2NhbGUpLmZvcm1hdChyYXdWYWx1ZSwgcmF3VW5pdCk7XG5cdFx0XHRcdFx0XHRcdG9LUElNb2RlbC5zZXRQcm9wZXJ0eShcIi9cIiArIGtwaURlZmluaXRpb24uaWQgKyBcIi9tYW5pZmVzdC9zYXAuY2FyZC9kYXRhL2pzb24vbWFpblVuaXRcIiwga3BpVW5pdCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0Ly8gQ3JpdGljYWxpdHlcblx0XHRcdFx0XHRpZiAoa3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQuY3JpdGljYWxpdHlWYWx1ZSkge1xuXHRcdFx0XHRcdFx0Ly8gQ3JpdGljYWxpdHkgaXMgYSBmaXhlZCB2YWx1ZVxuXHRcdFx0XHRcdFx0b0tQSU1vZGVsLnNldFByb3BlcnR5KFxuXHRcdFx0XHRcdFx0XHRcIi9cIiArIGtwaURlZmluaXRpb24uaWQgKyBcIi9tYW5pZmVzdC9zYXAuY2FyZC9kYXRhL2pzb24vbWFpbkNyaXRpY2FsaXR5XCIsXG5cdFx0XHRcdFx0XHRcdGtwaURlZmluaXRpb24uZGF0YXBvaW50LmNyaXRpY2FsaXR5VmFsdWVcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChrcGlEZWZpbml0aW9uLmRhdGFwb2ludC5jcml0aWNhbGl0eVBhdGgpIHtcblx0XHRcdFx0XHRcdC8vIENyaXRpY2FsaXR5IGNvbWVzIGZyb20gYW5vdGhlciBwcm9wZXJ0eSAodmlhIGEgcGF0aClcblx0XHRcdFx0XHRcdGNvbnN0IGNyaXRpY2FsaXR5VmFsdWUgPSBtZXNzYWdlVHlwZUZyb21Dcml0aWNhbGl0eShcblx0XHRcdFx0XHRcdFx0YUNvbnRleHRzWzBdLmdldFByb3BlcnR5KGtwaURlZmluaXRpb24uZGF0YXBvaW50LmNyaXRpY2FsaXR5UGF0aClcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRvS1BJTW9kZWwuc2V0UHJvcGVydHkoXCIvXCIgKyBrcGlEZWZpbml0aW9uLmlkICsgXCIvbWFuaWZlc3Qvc2FwLmNhcmQvZGF0YS9qc29uL21haW5Dcml0aWNhbGl0eVwiLCBjcml0aWNhbGl0eVZhbHVlKTtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRcdFx0a3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQuY3JpdGljYWxpdHlDYWxjdWxhdGlvblRocmVzaG9sZHMgJiZcblx0XHRcdFx0XHRcdGtwaURlZmluaXRpb24uZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25Nb2RlXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHQvLyBDcml0aWNhbGl0eSBjYWxjdWxhdGlvblxuXHRcdFx0XHRcdFx0bGV0IGNhbGN1bGF0ZWRDcml0aWNhbGl0eTogTWVzc2FnZVR5cGU7XG5cdFx0XHRcdFx0XHRzd2l0Y2ggKGtwaURlZmluaXRpb24uZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25Nb2RlKSB7XG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJVSS5JbXByb3ZlbWVudERpcmVjdGlvblR5cGUvVGFyZ2V0XCI6XG5cdFx0XHRcdFx0XHRcdFx0Y2FsY3VsYXRlZENyaXRpY2FsaXR5ID0gbWVzc2FnZVR5cGVGcm9tVGFyZ2V0Q2FsY3VsYXRpb24oXG5cdFx0XHRcdFx0XHRcdFx0XHRyYXdWYWx1ZSxcblx0XHRcdFx0XHRcdFx0XHRcdGtwaURlZmluaXRpb24uZGF0YXBvaW50LmNyaXRpY2FsaXR5Q2FsY3VsYXRpb25UaHJlc2hvbGRzXG5cdFx0XHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdFx0XHRicmVhaztcblxuXHRcdFx0XHRcdFx0XHRjYXNlIFwiVUkuSW1wcm92ZW1lbnREaXJlY3Rpb25UeXBlL01pbmltaXplXCI6XG5cdFx0XHRcdFx0XHRcdFx0Y2FsY3VsYXRlZENyaXRpY2FsaXR5ID0gbWVzc2FnZVR5cGVGcm9tTWluaW1pemVDYWxjdWxhdGlvbihcblx0XHRcdFx0XHRcdFx0XHRcdHJhd1ZhbHVlLFxuXHRcdFx0XHRcdFx0XHRcdFx0a3BpRGVmaW5pdGlvbi5kYXRhcG9pbnQuY3JpdGljYWxpdHlDYWxjdWxhdGlvblRocmVzaG9sZHNcblx0XHRcdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0XHRcdGJyZWFrO1xuXG5cdFx0XHRcdFx0XHRcdGNhc2UgXCJVSS5JbXByb3ZlbWVudERpcmVjdGlvblR5cGUvTWF4aW1pemVcIjpcblx0XHRcdFx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHRcdFx0XHRjYWxjdWxhdGVkQ3JpdGljYWxpdHkgPSBtZXNzYWdlVHlwZUZyb21NYXhpbWl6ZUNhbGN1bGF0aW9uKFxuXHRcdFx0XHRcdFx0XHRcdFx0cmF3VmFsdWUsXG5cdFx0XHRcdFx0XHRcdFx0XHRrcGlEZWZpbml0aW9uLmRhdGFwb2ludC5jcml0aWNhbGl0eUNhbGN1bGF0aW9uVGhyZXNob2xkc1xuXHRcdFx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRvS1BJTW9kZWwuc2V0UHJvcGVydHkoXG5cdFx0XHRcdFx0XHRcdFwiL1wiICsga3BpRGVmaW5pdGlvbi5pZCArIFwiL21hbmlmZXN0L3NhcC5jYXJkL2RhdGEvanNvbi9tYWluQ3JpdGljYWxpdHlcIixcblx0XHRcdFx0XHRcdFx0Y2FsY3VsYXRlZENyaXRpY2FsaXR5XG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHQvLyBObyBjcml0aWNhbGl0eVxuXHRcdFx0XHRcdFx0b0tQSU1vZGVsLnNldFByb3BlcnR5KFwiL1wiICsga3BpRGVmaW5pdGlvbi5pZCArIFwiL21hbmlmZXN0L3NhcC5jYXJkL2RhdGEvanNvbi9tYWluQ3JpdGljYWxpdHlcIiwgTWVzc2FnZVR5cGUuTm9uZSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgS1BJTWFuYWdlbWVudENvbnRyb2xsZXJFeHRlbnNpb247XG4iXX0=