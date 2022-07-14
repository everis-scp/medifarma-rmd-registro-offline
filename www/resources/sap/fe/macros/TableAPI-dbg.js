/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport", "sap/fe/core/helpers/PasteHelper", "sap/m/MessageBox", "sap/ui/Device", "sap/base/Log", "./MacroAPI", "sap/fe/macros/massedit/MassEditHandler", "sap/fe/macros/DelegateUtil"], function (ClassSupport, PasteHelper, MessageBox, Device, Log, MacroAPI, MassEditHandler, DelegateUtil) {
  "use strict";

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _temp;

  var getLocalizedText = DelegateUtil.getLocalizedText;
  var openMassEditDialog = MassEditHandler.openMassEditDialog;
  var parseDataForTablePaste = PasteHelper.parseDataForTablePaste;
  var Event = ClassSupport.Event;
  var Property = ClassSupport.Property;
  var MacroContext = ClassSupport.MacroContext;
  var EventHandler = ClassSupport.EventHandler;
  var APIClass = ClassSupport.APIClass;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

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

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  /**
   * Macro used to create a table based on the metadata provided by OData V4.
   * <br>
   * Usually, a LineItem or PresentationVariant annotation is expected, but the macro Table can also be used to display an EntitySet.
   *
   *
   * Usage example:
   * <pre>
   * &lt;macro:Table id="MyTable" metaPath="@com.sap.vocabularies.UI.v1.LineItem" /&gt;
   * </pre>
   *
   * @alias sap.fe.macros.Table
   * @public
   */
  var TableAPI = (_dec = APIClass("sap.fe.macros.TableAPI"), _dec2 = MacroContext(), _dec3 = Property({
    type: "boolean"
  }), _dec4 = Property({
    type: "string"
  }), _dec5 = Property({
    type: "boolean",
    defaultValue: false
  }), _dec6 = Property({
    type: "string",
    defaultValue: "ResponsiveTable"
  }), _dec7 = Property({
    type: "boolean",
    defaultValue: true
  }), _dec8 = Property({
    type: "boolean",
    defaultValue: false
  }), _dec9 = Property({
    type: "boolean",
    defaultValue: false
  }), _dec10 = Property({
    type: "string"
  }), _dec11 = Property({
    type: "string"
  }), _dec12 = Property({
    type: "boolean",
    defaultValue: true
  }), _dec13 = Property({
    type: "boolean|string",
    defaultValue: true
  }), _dec14 = Property({
    type: "string"
  }), _dec15 = Property({
    type: "boolean"
  }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_MacroAPI) {
    _inherits(TableAPI, _MacroAPI);

    var _super = _createSuper(TableAPI);

    function TableAPI() {
      var _this;

      _classCallCheck(this, TableAPI);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_assertThisInitialized(_this), "tableDefinition", _descriptor, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "readOnly", _descriptor2, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "id", _descriptor3, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "busy", _descriptor4, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "type", _descriptor5, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "enableExport", _descriptor6, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "enablePaste", _descriptor7, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "enableFullScreen", _descriptor8, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "selectionMode", _descriptor9, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "header", _descriptor10, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "headerVisible", _descriptor11, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "rowPress", _descriptor12, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "personalization", _descriptor13, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "variantManagement", _descriptor14, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "enableDataStateFilter", _descriptor15, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(TableAPI, [{
      key: "onTableRowPress",
      value: function onTableRowPress(oEvent, oController, oContext, mParameters) {
        // In the case of an analytical table, if we're trying to navigate to a context corresponding to a visual group or grand total
        // --> Cancel navigation
        if (oContext && oContext.isA("sap.ui.model.odata.v4.Context") && typeof oContext.getProperty("@$ui5.node.isExpanded") === "boolean") {
          return false;
        } else {
          oController._routing.navigateForwardToContext(oContext, mParameters);
        }
      }
    }, {
      key: "onInternalDataReceived",
      value: function onInternalDataReceived(oEvent) {
        if (oEvent.getParameter("error")) {
          this.getController().messageHandler.showMessageDialog();
        }
      }
    }, {
      key: "onPaste",
      value: function onPaste(oEvent, oController) {
        var _this2 = this;

        // If paste is disable or if we're not in edit mode, we can't paste anything
        if (!this.tableDefinition.control.enablePaste || !this.getModel("ui").getProperty("/isEditable")) {
          return;
        }

        var aRawPastedData = oEvent.getParameter("data"),
            oTable = oEvent.getSource(),
            bPasteEnabled = oTable.data()["enablePaste"];
        var oResourceModel;

        if (bPasteEnabled === true || bPasteEnabled === "true") {
          parseDataForTablePaste(aRawPastedData, oTable).then(function (aParsedData) {
            if (aParsedData && aParsedData.length > 0) {
              return oController._editFlow.createMultipleDocuments(oTable.getRowBinding(), aParsedData, _this2.tableDefinition.control.createAtEnd);
            }
          }).catch(function (oError) {
            Log.error("Error while pasting data", oError);
          });
        } else {
          oResourceModel = sap.ui.getCore().getLibraryResourceBundle("sap.fe.core");
          MessageBox.error(oResourceModel.getText("T_OP_CONTROLLER_SAPFE_PASTE_DISABLED_MESSAGE"), {
            title: oResourceModel.getText("C_COMMON_SAPFE_ERROR")
          });
        }
      }
    }, {
      key: "onPasteButtonPressed",
      value: function onPasteButtonPressed() {
        var _this3 = this;

        var oResourceModel = sap.ui.getCore().getLibraryResourceBundle("sap.fe.templates"),
            sDeviceOs = Device.os.name,
            sDeviceSystem = Device.system; // We need a default in case we fall through the crack

        var sMessageOnPasteButton = oResourceModel.getText("T_OP_CONTROLLER_TABLE_PASTE_BUTTON_ACTION_MESSAGE_WINDOWS_DESKTOP"); // On mobile, there is no native paste trigger:

        if (sDeviceSystem.phone || sDeviceSystem.tablet && !sDeviceSystem.combi) {
          sMessageOnPasteButton = oResourceModel.getText("T_OP_CONTROLLER_TABLE_PASTE_BUTTON_ACTION_MESSAGE_TOUCH_DEVICE");
        } else if (sDeviceSystem.desktop) {
          switch (sDeviceOs) {
            case "win":
              sMessageOnPasteButton = oResourceModel.getText("T_OP_CONTROLLER_TABLE_PASTE_BUTTON_ACTION_MESSAGE_WINDOWS_DESKTOP");
              break;

            case "mac":
              sMessageOnPasteButton = oResourceModel.getText("T_OP_CONTROLLER_TABLE_PASTE_BUTTON_ACTION_MESSAGE_IOS_DESKTOP");
              break;
          }
        }

        MessageBox.information(sMessageOnPasteButton, {
          onClose: function () {
            if (_this3.content) {
              var _ref;

              // Set the focus on the inner table to allow paste
              (_ref = _this3.content.getAggregation("_content")) === null || _ref === void 0 ? void 0 : _ref.applyFocusInfo({
                preventScroll: true
              });
            }
          }
        });
      } // This event will allow us to intercept the export before is triggered to cover specific cases
      // that couldn't be addressed on the propertyInfos for each column.
      // e.g. Fixed Target Value for the datapoints

    }, {
      key: "onBeforeExport",
      value: function onBeforeExport(oEvent) {
        var _oEvent$getParameters;

        var isSplitMode = oEvent.getParameters().userExportSettings.splitCells,
            isRLTLanguage = sap.ui.getCore().getConfiguration().getRTL(),
            oTableController = oEvent.getSource(),
            oExportColumns = (_oEvent$getParameters = oEvent.getParameters().exportSettings.workbook) === null || _oEvent$getParameters === void 0 ? void 0 : _oEvent$getParameters.columns,
            oTableColumns = this.tableDefinition.columns;
        TableAPI.updateExportSettings(oExportColumns, oTableColumns, oTableController, isSplitMode, isRLTLanguage);
      }
      /**
       * Handles the DataStateIndicator plugin from MDC on a table.
       * @param oEvent
       * @param oTable
       * @name dataStateFilter
       * @returns {boolean} Whether to render visible the DataStateIndicator
       */

    }, {
      key: "onDataStateChange",

      /**
       * This event handles the DataState of the DataStateIndicator plugin from MDC on a table.
       * It's fired when new error messages are sent from the backend and to recover binding-related messages when changing table context.
       *
       * @name onDataStateChange
       * @param {object} oEvent Event object
       */
      value: function onDataStateChange(oEvent) {
        var oDataStateIndicator = oEvent.getSource();
        var oMDCTable = this.content;
        var aFilteredMessages = oEvent.getParameter("filteredMessages");
        var oTableContexts = oMDCTable.getRowBinding().getCurrentContexts();

        if (oMDCTable.getBindingContext()) {
          if (!aFilteredMessages) {
            //check if there is at least on message on the table
            var bMessageExistsOnCurrentTable = sap.ui.getCore().getMessageManager().getMessageModel().getData().some(function (oMessage) {
              return oTableContexts.some(function (oRowContext) {
                return oRowContext && oMessage.target.indexOf(oRowContext.getPath()) === 0;
              }) || oMDCTable.getBindingContext().getPath() + "/" + oMDCTable.getRowBinding().getPath() === oMessage.target;
            });

            if (!bMessageExistsOnCurrentTable) {
              //hide de datastate indicator in case there is no relevant messages
              // ( a call to the showMessage without input parameter hides the messagestrip )
              oDataStateIndicator.showMessage();
            }
          } else {
            var oInternalModel = oDataStateIndicator.getModel("internal");
            oInternalModel.setProperty("filteredMessages", aFilteredMessages, oDataStateIndicator.getBindingContext("internal"));
          }
        }
      }
    }, {
      key: "onMassEditButtonPressed",
      value: function onMassEditButtonPressed(oEvent, PageController) {
        var oTable = this.content;
        openMassEditDialog(oTable, PageController);
      }
    }], [{
      key: "isDataStateVisible",
      value: function isDataStateVisible(oEvent, oTable) {
        var oTableAPI = oTable.getParent();

        while (!oTableAPI.isA("sap.fe.macros.TableAPI")) {
          oTableAPI = oTableAPI.getParent();
        }

        return oTableAPI.tableDefinition.enableDataStateFilter;
      }
    }, {
      key: "updateExportSettings",
      value: function updateExportSettings(oExportColumns, oColumns, oTableController, isSplitMode, isRLTLanguage) {
        oExportColumns.forEach(function (oColumnExport) {
          var aExportLabels = [];
          oColumns === null || oColumns === void 0 ? void 0 : oColumns.forEach(function (column) {
            var oColumn = column;

            if (isSplitMode) {
              // aExportLabels will contain labels from a FieldGroup, a text annotation and a DataPoint
              // These labels will be used for child properties (simple properties) from complexProperty
              // Unit/currency properties will be dismiss as it could be used in several datafields.
              var isUnit = oColumns.some(function (column) {
                return column.unit === oColumnExport.property;
              }); // Create Exporting labels array

              var FieldGroupLabel = TableAPI._getFieldGroupExportLabel(oColumnExport, oColumn, oTableController);

              if (FieldGroupLabel) {
                aExportLabels.unshift(FieldGroupLabel);
              } // For a text annotation, export label template used is <value> - <description> and for a DataPoint <datapointValue> - <TargetValue>.
              // In both cases internationalization is needed


              var dataFieldDescriptionLabel = TableAPI._getDataFieldDescriptionLabel(oColumnExport, oColumn, oTableController, isUnit);

              if (dataFieldDescriptionLabel) {
                aExportLabels.unshift(dataFieldDescriptionLabel);
              } //Add TargetValue on dummy created property when  exporting on split mode


              if (oColumn.isDataPointFakeTargetProperty && oColumn.relativePath === oColumnExport.property) {
                oColumnExport.property = [oColumnExport.property];
              }
            } //Modify exported value when using Communication.Contact dataFieldForAnnotation
            //contact>fn property should be exported


            if (oColumn.exportContactProperty && column.propertyInfos) {
              var _column$propertyInfos, _column$propertyInfos2, _column$propertyInfos3, _oColumn$propertyInfo;

              if (((_column$propertyInfos = column.propertyInfos) === null || _column$propertyInfos === void 0 ? void 0 : _column$propertyInfos.length) === 1 && ((_column$propertyInfos2 = column.propertyInfos) === null || _column$propertyInfos2 === void 0 ? void 0 : _column$propertyInfos2.toString()) === oColumnExport.property.toString()) {
                oColumnExport.property = oColumn.exportContactProperty;
                oColumnExport.label = oColumn.label;
              } else if (((_column$propertyInfos3 = column.propertyInfos) === null || _column$propertyInfos3 === void 0 ? void 0 : _column$propertyInfos3.length) > 1 && ((_oColumn$propertyInfo = oColumn.propertyInfos) === null || _oColumn$propertyInfo === void 0 ? void 0 : _oColumn$propertyInfo.some(function (prop) {
                return oColumnExport.property.includes(prop);
              })) && Array.isArray(oColumnExport.property)) {
                var _oColumnExport$proper;

                oColumnExport.property = (_oColumnExport$proper = oColumnExport.property) === null || _oColumnExport$proper === void 0 ? void 0 : _oColumnExport$proper.map(function (property) {
                  var _oColumn$propertyInfo2;

                  return ((_oColumn$propertyInfo2 = oColumn.propertyInfos) === null || _oColumn$propertyInfo2 === void 0 ? void 0 : _oColumn$propertyInfo2.some(function (prop) {
                    return prop === property;
                  })) ? oColumn.exportContactProperty : property;
                });
              }
            }
          });
          aExportLabels.push(getLocalizedText(oColumnExport.label, oTableController));

          if (aExportLabels.length > 1) {
            // Remove duplicate labels (e.g. FieldGroup label is the same as the label of one of the properties)
            aExportLabels = aExportLabels.filter(function (label, index) {
              if (aExportLabels.indexOf(label) == index) {
                return label;
              }
            });
          } // Check if a RTL language if used and if so we need to reverse labels


          if (isRLTLanguage) {
            aExportLabels.reverse();
          }

          oColumnExport.label = aExportLabels.join(" - ");
        });
        return oExportColumns;
      }
    }, {
      key: "_getFieldGroupExportLabel",
      value: function _getFieldGroupExportLabel(oColumnExport, oColumn, oTableController) {
        var _oColumn$exportSettin, _oColumn$propertyInfo3, _oColumn$propertyInfo4;

        if ((oColumnExport.columnId.indexOf("::FieldGroup::") !== -1 || ((_oColumn$exportSettin = oColumn.exportSettings) === null || _oColumn$exportSettin === void 0 ? void 0 : _oColumn$exportSettin.fieldLabel) && oColumnExport.columnId.indexOf("__column") !== -1) && (((_oColumn$propertyInfo3 = oColumn.propertyInfos) === null || _oColumn$propertyInfo3 === void 0 ? void 0 : _oColumn$propertyInfo3.includes(oColumnExport.property)) || ((_oColumn$propertyInfo4 = oColumn.propertyInfos) === null || _oColumn$propertyInfo4 === void 0 ? void 0 : _oColumn$propertyInfo4.includes("Property::" + oColumnExport.property)))) {
          var _oColumn$exportSettin2;

          var label = ((_oColumn$exportSettin2 = oColumn.exportSettings) === null || _oColumn$exportSettin2 === void 0 ? void 0 : _oColumn$exportSettin2.fieldLabel) || oColumn.label;
          return getLocalizedText(label, oTableController);
        }
      }
    }, {
      key: "_getDataFieldDescriptionLabel",
      value: function _getDataFieldDescriptionLabel(oColumnExport, oColumn, oTableController, isUnit) {
        var _oColumn$propertyInfo5, _oColumn$propertyInfo6, _oColumn$propertyInfo7, _oColumn$relativePath;

        if (oColumn.propertyInfos && ((_oColumn$propertyInfo5 = oColumn.propertyInfos) === null || _oColumn$propertyInfo5 === void 0 ? void 0 : _oColumn$propertyInfo5.length) > 1 && !isUnit && (((_oColumn$propertyInfo6 = oColumn.propertyInfos) === null || _oColumn$propertyInfo6 === void 0 ? void 0 : _oColumn$propertyInfo6.includes(oColumnExport.property)) || ((_oColumn$propertyInfo7 = oColumn.propertyInfos) === null || _oColumn$propertyInfo7 === void 0 ? void 0 : _oColumn$propertyInfo7.includes("Property::" + oColumnExport.property))) && ((_oColumn$relativePath = oColumn.relativePath) === null || _oColumn$relativePath === void 0 ? void 0 : _oColumn$relativePath.indexOf("@com.sap.vocabularies.UI.v1.FieldGroup")) === -1) {
          return getLocalizedText(oColumn.label, oTableController);
        }
      }
    }]);

    return TableAPI;
  }(MacroAPI), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "tableDefinition", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "readOnly", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "id", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "busy", [_dec5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "type", [_dec6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "enableExport", [_dec7], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "enablePaste", [_dec8], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "enableFullScreen", [_dec9], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "selectionMode", [_dec10], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "header", [_dec11], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "headerVisible", [_dec12], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "rowPress", [Event], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "personalization", [_dec13], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor14 = _applyDecoratedDescriptor(_class2.prototype, "variantManagement", [_dec14], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor15 = _applyDecoratedDescriptor(_class2.prototype, "enableDataStateFilter", [_dec15], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "onTableRowPress", [EventHandler], Object.getOwnPropertyDescriptor(_class2.prototype, "onTableRowPress"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onInternalDataReceived", [EventHandler], Object.getOwnPropertyDescriptor(_class2.prototype, "onInternalDataReceived"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onPaste", [EventHandler], Object.getOwnPropertyDescriptor(_class2.prototype, "onPaste"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onPasteButtonPressed", [EventHandler], Object.getOwnPropertyDescriptor(_class2.prototype, "onPasteButtonPressed"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onBeforeExport", [EventHandler], Object.getOwnPropertyDescriptor(_class2.prototype, "onBeforeExport"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onDataStateChange", [EventHandler], Object.getOwnPropertyDescriptor(_class2.prototype, "onDataStateChange"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onMassEditButtonPressed", [EventHandler], Object.getOwnPropertyDescriptor(_class2.prototype, "onMassEditButtonPressed"), _class2.prototype)), _class2)) || _class);
  return TableAPI;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlRhYmxlQVBJLnRzIl0sIm5hbWVzIjpbIlRhYmxlQVBJIiwiQVBJQ2xhc3MiLCJNYWNyb0NvbnRleHQiLCJQcm9wZXJ0eSIsInR5cGUiLCJkZWZhdWx0VmFsdWUiLCJvRXZlbnQiLCJvQ29udHJvbGxlciIsIm9Db250ZXh0IiwibVBhcmFtZXRlcnMiLCJpc0EiLCJnZXRQcm9wZXJ0eSIsIl9yb3V0aW5nIiwibmF2aWdhdGVGb3J3YXJkVG9Db250ZXh0IiwiZ2V0UGFyYW1ldGVyIiwiZ2V0Q29udHJvbGxlciIsIm1lc3NhZ2VIYW5kbGVyIiwic2hvd01lc3NhZ2VEaWFsb2ciLCJ0YWJsZURlZmluaXRpb24iLCJjb250cm9sIiwiZW5hYmxlUGFzdGUiLCJnZXRNb2RlbCIsImFSYXdQYXN0ZWREYXRhIiwib1RhYmxlIiwiZ2V0U291cmNlIiwiYlBhc3RlRW5hYmxlZCIsImRhdGEiLCJvUmVzb3VyY2VNb2RlbCIsInBhcnNlRGF0YUZvclRhYmxlUGFzdGUiLCJ0aGVuIiwiYVBhcnNlZERhdGEiLCJsZW5ndGgiLCJfZWRpdEZsb3ciLCJjcmVhdGVNdWx0aXBsZURvY3VtZW50cyIsImdldFJvd0JpbmRpbmciLCJjcmVhdGVBdEVuZCIsImNhdGNoIiwib0Vycm9yIiwiTG9nIiwiZXJyb3IiLCJzYXAiLCJ1aSIsImdldENvcmUiLCJnZXRMaWJyYXJ5UmVzb3VyY2VCdW5kbGUiLCJNZXNzYWdlQm94IiwiZ2V0VGV4dCIsInRpdGxlIiwic0RldmljZU9zIiwiRGV2aWNlIiwib3MiLCJuYW1lIiwic0RldmljZVN5c3RlbSIsInN5c3RlbSIsInNNZXNzYWdlT25QYXN0ZUJ1dHRvbiIsInBob25lIiwidGFibGV0IiwiY29tYmkiLCJkZXNrdG9wIiwiaW5mb3JtYXRpb24iLCJvbkNsb3NlIiwiY29udGVudCIsImdldEFnZ3JlZ2F0aW9uIiwiYXBwbHlGb2N1c0luZm8iLCJwcmV2ZW50U2Nyb2xsIiwiaXNTcGxpdE1vZGUiLCJnZXRQYXJhbWV0ZXJzIiwidXNlckV4cG9ydFNldHRpbmdzIiwic3BsaXRDZWxscyIsImlzUkxUTGFuZ3VhZ2UiLCJnZXRDb25maWd1cmF0aW9uIiwiZ2V0UlRMIiwib1RhYmxlQ29udHJvbGxlciIsIm9FeHBvcnRDb2x1bW5zIiwiZXhwb3J0U2V0dGluZ3MiLCJ3b3JrYm9vayIsImNvbHVtbnMiLCJvVGFibGVDb2x1bW5zIiwidXBkYXRlRXhwb3J0U2V0dGluZ3MiLCJvRGF0YVN0YXRlSW5kaWNhdG9yIiwib01EQ1RhYmxlIiwiYUZpbHRlcmVkTWVzc2FnZXMiLCJvVGFibGVDb250ZXh0cyIsImdldEN1cnJlbnRDb250ZXh0cyIsImdldEJpbmRpbmdDb250ZXh0IiwiYk1lc3NhZ2VFeGlzdHNPbkN1cnJlbnRUYWJsZSIsImdldE1lc3NhZ2VNYW5hZ2VyIiwiZ2V0TWVzc2FnZU1vZGVsIiwiZ2V0RGF0YSIsInNvbWUiLCJvTWVzc2FnZSIsIm9Sb3dDb250ZXh0IiwidGFyZ2V0IiwiaW5kZXhPZiIsImdldFBhdGgiLCJzaG93TWVzc2FnZSIsIm9JbnRlcm5hbE1vZGVsIiwic2V0UHJvcGVydHkiLCJQYWdlQ29udHJvbGxlciIsIm9wZW5NYXNzRWRpdERpYWxvZyIsIm9UYWJsZUFQSSIsImdldFBhcmVudCIsImVuYWJsZURhdGFTdGF0ZUZpbHRlciIsIm9Db2x1bW5zIiwiZm9yRWFjaCIsIm9Db2x1bW5FeHBvcnQiLCJhRXhwb3J0TGFiZWxzIiwiY29sdW1uIiwib0NvbHVtbiIsImlzVW5pdCIsInVuaXQiLCJwcm9wZXJ0eSIsIkZpZWxkR3JvdXBMYWJlbCIsIl9nZXRGaWVsZEdyb3VwRXhwb3J0TGFiZWwiLCJ1bnNoaWZ0IiwiZGF0YUZpZWxkRGVzY3JpcHRpb25MYWJlbCIsIl9nZXREYXRhRmllbGREZXNjcmlwdGlvbkxhYmVsIiwiaXNEYXRhUG9pbnRGYWtlVGFyZ2V0UHJvcGVydHkiLCJyZWxhdGl2ZVBhdGgiLCJleHBvcnRDb250YWN0UHJvcGVydHkiLCJwcm9wZXJ0eUluZm9zIiwidG9TdHJpbmciLCJsYWJlbCIsInByb3AiLCJpbmNsdWRlcyIsIkFycmF5IiwiaXNBcnJheSIsIm1hcCIsInB1c2giLCJnZXRMb2NhbGl6ZWRUZXh0IiwiZmlsdGVyIiwiaW5kZXgiLCJyZXZlcnNlIiwiam9pbiIsImNvbHVtbklkIiwiZmllbGRMYWJlbCIsIk1hY3JvQVBJIiwiRXZlbnQiLCJFdmVudEhhbmRsZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0RkE7Ozs7Ozs7Ozs7Ozs7O01BZU1BLFEsV0FETEMsUUFBUSxDQUFDLHdCQUFELEMsVUFFUEMsWUFBWSxFLFVBVVpDLFFBQVEsQ0FBQztBQUFFQyxJQUFBQSxJQUFJLEVBQUU7QUFBUixHQUFELEMsVUFRUkQsUUFBUSxDQUFDO0FBQUVDLElBQUFBLElBQUksRUFBRTtBQUFSLEdBQUQsQyxVQVFSRCxRQUFRLENBQUM7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLFNBQVI7QUFBbUJDLElBQUFBLFlBQVksRUFBRTtBQUFqQyxHQUFELEMsVUFVUkYsUUFBUSxDQUFDO0FBQUVDLElBQUFBLElBQUksRUFBRSxRQUFSO0FBQWtCQyxJQUFBQSxZQUFZLEVBQUU7QUFBaEMsR0FBRCxDLFVBUVJGLFFBQVEsQ0FBQztBQUFFQyxJQUFBQSxJQUFJLEVBQUUsU0FBUjtBQUFtQkMsSUFBQUEsWUFBWSxFQUFFO0FBQWpDLEdBQUQsQyxVQVFSRixRQUFRLENBQUM7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLFNBQVI7QUFBbUJDLElBQUFBLFlBQVksRUFBRTtBQUFqQyxHQUFELEMsVUFRUkYsUUFBUSxDQUFDO0FBQUVDLElBQUFBLElBQUksRUFBRSxTQUFSO0FBQW1CQyxJQUFBQSxZQUFZLEVBQUU7QUFBakMsR0FBRCxDLFdBVVJGLFFBQVEsQ0FBQztBQUFFQyxJQUFBQSxJQUFJLEVBQUU7QUFBUixHQUFELEMsV0FRUkQsUUFBUSxDQUFDO0FBQUVDLElBQUFBLElBQUksRUFBRTtBQUFSLEdBQUQsQyxXQVFSRCxRQUFRLENBQUM7QUFBRUMsSUFBQUEsSUFBSSxFQUFFLFNB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LCBNYWNyb0NvbnRleHQsIFByb3BlcnR5LCBFdmVudCB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0NsYXNzU3VwcG9ydFwiO1xuaW1wb3J0IHsgcGFyc2VEYXRhRm9yVGFibGVQYXN0ZSB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL1Bhc3RlSGVscGVyXCI7XG5pbXBvcnQgeyBNZXNzYWdlQm94IH0gZnJvbSBcInNhcC9tXCI7XG5pbXBvcnQgeyBEZXZpY2UgfSBmcm9tIFwic2FwL3VpXCI7XG5pbXBvcnQgeyBMb2cgfSBmcm9tIFwic2FwL2Jhc2VcIjtcbmltcG9ydCB7IFBhZ2VDb250cm9sbGVyIH0gZnJvbSBcInNhcC9mZS9jb3JlXCI7XG5pbXBvcnQgeyBBbm5vdGF0aW9uVGFibGVDb2x1bW4sIFRhYmxlQ29sdW1uLCBUYWJsZVZpc3VhbGl6YXRpb24gfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9jb250cm9scy9Db21tb24vVGFibGVcIjtcbmltcG9ydCBNYWNyb0FQSSBmcm9tIFwiLi9NYWNyb0FQSVwiO1xuaW1wb3J0IHsgb3Blbk1hc3NFZGl0RGlhbG9nIH0gZnJvbSBcInNhcC9mZS9tYWNyb3MvbWFzc2VkaXQvTWFzc0VkaXRIYW5kbGVyXCI7XG5pbXBvcnQgeyBnZXRMb2NhbGl6ZWRUZXh0IH0gZnJvbSBcInNhcC9mZS9tYWNyb3MvRGVsZWdhdGVVdGlsXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInNhcC91aS9tb2RlbC9vZGF0YS92NFwiO1xuXG4vKipcbiAqIERlZmluaXRpb24gb2YgYSBjdXN0b20gYWN0aW9uIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0YWJsZSB0b29sYmFyXG4gKlxuICogQGFsaWFzIHNhcC5mZS5tYWNyb3MudGFibGUuQWN0aW9uXG4gKiBAcHVibGljXG4gKi9cbmV4cG9ydCB0eXBlIEFjdGlvbiA9IHtcblx0LyoqXG5cdCAqIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBhY3Rpb25cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0a2V5OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgdGV4dCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGZvciB0aGlzIGFjdGlvblxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHR0ZXh0OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBSZWZlcmVuY2UgdG8gdGhlIGtleSBvZiBhbm90aGVyIGFjdGlvbiBhbHJlYWR5IGRpc3BsYXllZCBpbiB0aGUgdG9vbGJhciB0byBwcm9wZXJseSBwbGFjZSB0aGlzIG9uZVxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRhbmNob3I/OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXJlIHRoaXMgYWN0aW9uIHNob3VsZCBiZSBwbGFjZWQgcmVsYXRpdmUgdG8gdGhlIGRlZmluZWQgYW5jaG9yXG5cdCAqXG5cdCAqIEFsbG93ZWQgdmFsdWVzIGFyZSBgQmVmb3JlYCBhbmQgYEFmdGVyYFxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRwbGFjZW1lbnQ/OiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIEV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2hvb3NlcyB0aGUgYWN0aW9uXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdHByZXNzOiBzdHJpbmc7XG59O1xuXG4vKipcbiAqIERlZmluaXRpb24gb2YgYSBjdXN0b20gY29sdW1uIHRvIGJlIHVzZWQgaW5zaWRlIHRoZSB0YWJsZS5cbiAqXG4gKiBUaGUgdGVtcGxhdGUgZm9yIHRoZSBjb2x1bW4gaGFzIHRvIGJlIHByb3ZpZGVkIGFzIHRoZSBkZWZhdWx0IGFnZ3JlZ2F0aW9uXG4gKlxuICogQGFsaWFzIHNhcC5mZS5tYWNyb3MudGFibGUuQ29sdW1uXG4gKiBAcHVibGljXG4gKiBAZXhwZXJpbWVudGFsXG4gKi9cbmV4cG9ydCB0eXBlIENvbHVtbiA9IHtcblx0LyoqXG5cdCAqIFVuaXF1ZSBpZGVudGlmaWVyIG9mIHRoZSBjb2x1bW5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0a2V5OiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBUaGUgdGV4dCB0aGF0IHdpbGwgYmUgZGlzcGxheWVkIGZvciB0aGlzIGNvbHVtbiBoZWFkZXJcblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0aGVhZGVyOiBzdHJpbmc7XG5cdC8qKlxuXHQgKiBSZWZlcmVuY2UgdG8gdGhlIGtleSBvZiBhbm90aGVyIGNvbHVtbiBhbHJlYWR5IGRpc3BsYXllZCBpbiB0aGUgdGFibGUgdG8gcHJvcGVybHkgcGxhY2UgdGhpcyBvbmVcblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0YW5jaG9yPzogc3RyaW5nO1xuXHQvKipcblx0ICogRGVmaW5lcyB3aGVyZSB0aGlzIGNvbHVtbiBzaG91bGQgYmUgcGxhY2VkIHJlbGF0aXZlIHRvIHRoZSBkZWZpbmVkIGFuY2hvclxuXHQgKlxuXHQgKiBBbGxvd2VkIHZhbHVlcyBhcmUgYEJlZm9yZWAgYW5kIGBBZnRlcmBcblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0cGxhY2VtZW50Pzogc3RyaW5nO1xufTtcblxuLyoqXG4gKiBNYWNybyB1c2VkIHRvIGNyZWF0ZSBhIHRhYmxlIGJhc2VkIG9uIHRoZSBtZXRhZGF0YSBwcm92aWRlZCBieSBPRGF0YSBWNC5cbiAqIDxicj5cbiAqIFVzdWFsbHksIGEgTGluZUl0ZW0gb3IgUHJlc2VudGF0aW9uVmFyaWFudCBhbm5vdGF0aW9uIGlzIGV4cGVjdGVkLCBidXQgdGhlIG1hY3JvIFRhYmxlIGNhbiBhbHNvIGJlIHVzZWQgdG8gZGlzcGxheSBhbiBFbnRpdHlTZXQuXG4gKlxuICpcbiAqIFVzYWdlIGV4YW1wbGU6XG4gKiA8cHJlPlxuICogJmx0O21hY3JvOlRhYmxlIGlkPVwiTXlUYWJsZVwiIG1ldGFQYXRoPVwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkxpbmVJdGVtXCIgLyZndDtcbiAqIDwvcHJlPlxuICpcbiAqIEBhbGlhcyBzYXAuZmUubWFjcm9zLlRhYmxlXG4gKiBAcHVibGljXG4gKi9cbkBBUElDbGFzcyhcInNhcC5mZS5tYWNyb3MuVGFibGVBUElcIilcbmNsYXNzIFRhYmxlQVBJIGV4dGVuZHMgTWFjcm9BUEkge1xuXHRATWFjcm9Db250ZXh0KClcblx0dGFibGVEZWZpbml0aW9uITogVGFibGVWaXN1YWxpemF0aW9uO1xuXG5cdC8qKlxuXHQgKiBBbiBleHByZXNzaW9uIHRoYXQgYWxsb3dzIHlvdSB0byBjb250cm9sIHRoZSAncmVhZC1vbmx5JyBzdGF0ZSBvZiB0aGUgdGFibGUuXG5cdCAqXG5cdCAqIElmIHlvdSBkbyBub3Qgc2V0IGFueSBleHByZXNzaW9uLCBTQVAgRmlvcmkgZWxlbWVudHMgaG9va3MgaW50byB0aGUgc3RhbmRhcmQgbGlmZWN5Y2xlIHRvIGRldGVybWluZSB0aGUgY3VycmVudCBzdGF0ZS5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0QFByb3BlcnR5KHsgdHlwZTogXCJib29sZWFuXCIgfSlcblx0cmVhZE9ubHkhOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBUaGUgaWRlbnRpZmllciBvZiB0aGUgdGFibGUgY29udHJvbC5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0QFByb3BlcnR5KHsgdHlwZTogXCJzdHJpbmdcIiB9KVxuXHRpZCE6IHN0cmluZztcblxuXHQvKipcblx0ICogQW4gZXhwcmVzc2lvbiB0aGF0IGFsbG93cyB5b3UgdG8gY29udHJvbCB0aGUgJ2J1c3knIHN0YXRlIG9mIHRoZSB0YWJsZS5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0QFByb3BlcnR5KHsgdHlwZTogXCJib29sZWFuXCIsIGRlZmF1bHRWYWx1ZTogZmFsc2UgfSlcblx0YnVzeSE6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIERlZmluZXMgdGhlIHR5cGUgb2YgdGFibGUgdGhhdCB3aWxsIGJlIHVzZWQgYnkgdGhlIG1hY3JvIHRvIHJlbmRlciB0aGUgZGF0YS5cblx0ICpcblx0ICogQWxsb3dlZCB2YWx1ZXMgYXJlIGBHcmlkVGFibGVgIGFuZCBgUmVzcG9uc2l2ZVRhYmxlYFxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRAUHJvcGVydHkoeyB0eXBlOiBcInN0cmluZ1wiLCBkZWZhdWx0VmFsdWU6IFwiUmVzcG9uc2l2ZVRhYmxlXCIgfSlcblx0dHlwZSE6IHN0cmluZztcblxuXHQvKipcblx0ICogQ29udHJvbHMgaWYgdGhlIGV4cG9ydCBmdW5jdGlvbmFsaXR5IG9mIHRoZSB0YWJsZSBpcyBlbmFibGVkIG9yIG5vdC5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0QFByb3BlcnR5KHsgdHlwZTogXCJib29sZWFuXCIsIGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KVxuXHRlbmFibGVFeHBvcnQhOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBDb250cm9scyBpZiB0aGUgcGFzdGUgZnVuY3Rpb25hbGl0eSBvZiB0aGUgdGFibGUgaXMgZW5hYmxlZCBvciBub3QuXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdEBQcm9wZXJ0eSh7IHR5cGU6IFwiYm9vbGVhblwiLCBkZWZhdWx0VmFsdWU6IGZhbHNlIH0pXG5cdGVuYWJsZVBhc3RlITogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQ29udHJvbHMgd2hldGhlciB0aGUgdGFibGUgY2FuIGJlIG9wZW5lZCBpbiBmdWxsc2NyZWVuIG1vZGUgb3Igbm90LlxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRAUHJvcGVydHkoeyB0eXBlOiBcImJvb2xlYW5cIiwgZGVmYXVsdFZhbHVlOiBmYWxzZSB9KVxuXHRlbmFibGVGdWxsU2NyZWVuITogYm9vbGVhbjtcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgc2VsZWN0aW9uIG1vZGUgdG8gYmUgdXNlZCBieSB0aGUgdGFibGUuXG5cdCAqXG5cdCAqIEFsbG93ZWQgdmFsdWVzIGFyZSBgTm9uZWAsIGBTaW5nbGVgLCBgTXVsdGlgIG9yIGBBdXRvYFxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRAUHJvcGVydHkoeyB0eXBlOiBcInN0cmluZ1wiIH0pXG5cdHNlbGVjdGlvbk1vZGUhOiBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIFNwZWNpZmllcyB0aGUgaGVhZGVyIHRleHQgdGhhdCBpcyBzaG93biBpbiB0aGUgdGFibGUuXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdEBQcm9wZXJ0eSh7IHR5cGU6IFwic3RyaW5nXCIgfSlcblx0aGVhZGVyITogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBDb250cm9scyBpZiB0aGUgaGVhZGVyIHRleHQgc2hvdWxkIGJlIHNob3duIG9yIG5vdC5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0QFByb3BlcnR5KHsgdHlwZTogXCJib29sZWFuXCIsIGRlZmF1bHRWYWx1ZTogdHJ1ZSB9KVxuXHRoZWFkZXJWaXNpYmxlITogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQW4gZXZlbnQgdHJpZ2dlcmVkIHdoZW4gdGhlIHVzZXIgY2hvb3NlcyBhIHJvdzsgdGhlIGV2ZW50IGNvbnRhaW5zIGluZm9ybWF0aW9uIGFib3V0IHdoaWNoIHJvdyB3YXMgY2hvc2VuLlxuXHQgKlxuXHQgKiBZb3UgY2FuIHNldCB0aGlzIGluIG9yZGVyIHRvIGhhbmRsZSB0aGUgbmF2aWdhdGlvbiBtYW51YWxseS5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0QEV2ZW50XG5cdHJvd1ByZXNzITogRnVuY3Rpb247XG5cblx0LyoqXG5cdCAqIENvbnRyb2xzIHdoaWNoIG9wdGlvbnMgc2hvdWxkIGJlIGVuYWJsZWQgZm9yIHRoZSB0YWJsZSBwZXJzb25hbGl6YXRpb24gZGlhbG9nLlxuXHQgKlxuXHQgKiBJZiBpdCBpcyBzZXQgdG8gYHRydWVgLCBhbGwgcG9zc2libGUgb3B0aW9ucyBmb3IgdGhpcyBraW5kIG9mIHRhYmxlIGFyZSBlbmFibGVkLjxici8+XG5cdCAqIElmIGl0IGlzIHNldCB0byBgZmFsc2VgLCBwZXJzb25hbGl6YXRpb24gaXMgZGlzYWJsZWQuPGJyLz5cblx0ICo8YnIvPlxuXHQgKiBZb3UgY2FuIGFsc28gcHJvdmlkZSBhIG1vcmUgZ3JhbnVsYXIgY29udHJvbCBmb3IgdGhlIHBlcnNvbmFsaXphdGlvbiBieSBwcm92aWRpbmcgYSBjb21tYS1zZXBhcmF0ZWQgbGlzdCB3aXRoIHRoZSBvcHRpb25zIHlvdSB3YW50IHRvIGJlIGF2YWlsYWJsZS48YnIvPlxuXHQgKiBBdmFpbGFibGUgb3B0aW9ucyBhcmU6PGJyLz5cblx0ICogIC0gU29ydDxici8+XG5cdCAqICAtIENvbHVtbjxici8+XG5cdCAqICAtIEZpbHRlcjxici8+XG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdEBQcm9wZXJ0eSh7IHR5cGU6IFwiYm9vbGVhbnxzdHJpbmdcIiwgZGVmYXVsdFZhbHVlOiB0cnVlIH0pXG5cdHBlcnNvbmFsaXphdGlvbiE6IGJvb2xlYW4gfCBzdHJpbmc7XG5cblx0LyoqXG5cdCAqIENvbnRyb2xzIHRoZSBraW5kIG9mIHZhcmlhbnQgbWFuYWdlbWVudCB0aGF0IHNob3VsZCBiZSBlbmFibGVkIGZvciB0aGUgdGFibGUuXG5cdCAqXG5cdCAqIEFsbG93ZWQgdmFsdWVzIGFyZSBgUGFnZWAsIGBDb250cm9sYCBhbmQgYE5vbmVgLjxici8+XG5cdCAqIElmIHRoZSB0YWJsZSBpcyB1c2VkIHdpdGhpbiBhIFNBUCBGaW9yaSBlbGVtZW50cyB0ZW1wbGF0ZSwgdGhlIGRlZmF1bHQgdmFsdWUgd2lsbCBiZSB0YWtlbiBmcm9tIHRoZSBjdXJyZW50IHBhZ2UgdmFyaWFudCBtYW5hZ2VtZW50Ljxici8+XG5cdCAqIE90aGVyd2lzZSBpdCdzIGBOb25lYC5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0QFByb3BlcnR5KHsgdHlwZTogXCJzdHJpbmdcIiB9KVxuXHR2YXJpYW50TWFuYWdlbWVudCE6IHN0cmluZztcblxuXHQvKipcblx0ICogQ29udHJvbHMgaWYgdGhlIGRhdGFTdGF0ZUluZGljYXRvciBmdW5jdGlvbmFsaXR5IG9mIHRoZSB0YWJsZSBpcyBlbmFibGVkIG9yIG5vdC5cblx0ICpcblx0ICovXG5cdEBQcm9wZXJ0eSh7IHR5cGU6IFwiYm9vbGVhblwiIH0pXG5cdGVuYWJsZURhdGFTdGF0ZUZpbHRlciE6IGJvb2xlYW47XG5cblx0QEV2ZW50SGFuZGxlclxuXHRvblRhYmxlUm93UHJlc3Mob0V2ZW50OiBVSTVFdmVudCwgb0NvbnRyb2xsZXI6IFBhZ2VDb250cm9sbGVyLCBvQ29udGV4dDogQ29udGV4dCwgbVBhcmFtZXRlcnM6IGFueSkge1xuXHRcdC8vIEluIHRoZSBjYXNlIG9mIGFuIGFuYWx5dGljYWwgdGFibGUsIGlmIHdlJ3JlIHRyeWluZyB0byBuYXZpZ2F0ZSB0byBhIGNvbnRleHQgY29ycmVzcG9uZGluZyB0byBhIHZpc3VhbCBncm91cCBvciBncmFuZCB0b3RhbFxuXHRcdC8vIC0tPiBDYW5jZWwgbmF2aWdhdGlvblxuXHRcdGlmIChcblx0XHRcdG9Db250ZXh0ICYmXG5cdFx0XHRvQ29udGV4dC5pc0EoXCJzYXAudWkubW9kZWwub2RhdGEudjQuQ29udGV4dFwiKSAmJlxuXHRcdFx0dHlwZW9mIG9Db250ZXh0LmdldFByb3BlcnR5KFwiQCR1aTUubm9kZS5pc0V4cGFuZGVkXCIpID09PSBcImJvb2xlYW5cIlxuXHRcdCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRvQ29udHJvbGxlci5fcm91dGluZy5uYXZpZ2F0ZUZvcndhcmRUb0NvbnRleHQob0NvbnRleHQsIG1QYXJhbWV0ZXJzKTtcblx0XHR9XG5cdH1cblxuXHRARXZlbnRIYW5kbGVyXG5cdG9uSW50ZXJuYWxEYXRhUmVjZWl2ZWQob0V2ZW50OiBVSTVFdmVudCkge1xuXHRcdGlmIChvRXZlbnQuZ2V0UGFyYW1ldGVyKFwiZXJyb3JcIikpIHtcblx0XHRcdHRoaXMuZ2V0Q29udHJvbGxlcigpLm1lc3NhZ2VIYW5kbGVyLnNob3dNZXNzYWdlRGlhbG9nKCk7XG5cdFx0fVxuXHR9XG5cdEBFdmVudEhhbmRsZXJcblx0b25QYXN0ZShvRXZlbnQ6IFVJNUV2ZW50LCBvQ29udHJvbGxlcjogUGFnZUNvbnRyb2xsZXIpIHtcblx0XHQvLyBJZiBwYXN0ZSBpcyBkaXNhYmxlIG9yIGlmIHdlJ3JlIG5vdCBpbiBlZGl0IG1vZGUsIHdlIGNhbid0IHBhc3RlIGFueXRoaW5nXG5cdFx0aWYgKCF0aGlzLnRhYmxlRGVmaW5pdGlvbi5jb250cm9sLmVuYWJsZVBhc3RlIHx8ICF0aGlzLmdldE1vZGVsKFwidWlcIikuZ2V0UHJvcGVydHkoXCIvaXNFZGl0YWJsZVwiKSkge1xuXHRcdFx0cmV0dXJuO1xuXHRcdH1cblxuXHRcdGNvbnN0IGFSYXdQYXN0ZWREYXRhID0gb0V2ZW50LmdldFBhcmFtZXRlcihcImRhdGFcIiksXG5cdFx0XHRvVGFibGUgPSBvRXZlbnQuZ2V0U291cmNlKCksXG5cdFx0XHRiUGFzdGVFbmFibGVkID0gb1RhYmxlLmRhdGEoKVtcImVuYWJsZVBhc3RlXCJdO1xuXHRcdGxldCBvUmVzb3VyY2VNb2RlbDtcblxuXHRcdGlmIChiUGFzdGVFbmFibGVkID09PSB0cnVlIHx8IGJQYXN0ZUVuYWJsZWQgPT09IFwidHJ1ZVwiKSB7XG5cdFx0XHRwYXJzZURhdGFGb3JUYWJsZVBhc3RlKGFSYXdQYXN0ZWREYXRhLCBvVGFibGUpXG5cdFx0XHRcdC50aGVuKGFQYXJzZWREYXRhID0+IHtcblx0XHRcdFx0XHRpZiAoYVBhcnNlZERhdGEgJiYgYVBhcnNlZERhdGEubGVuZ3RoID4gMCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG9Db250cm9sbGVyLl9lZGl0Rmxvdy5jcmVhdGVNdWx0aXBsZURvY3VtZW50cyhcblx0XHRcdFx0XHRcdFx0b1RhYmxlLmdldFJvd0JpbmRpbmcoKSxcblx0XHRcdFx0XHRcdFx0YVBhcnNlZERhdGEsXG5cdFx0XHRcdFx0XHRcdHRoaXMudGFibGVEZWZpbml0aW9uLmNvbnRyb2wuY3JlYXRlQXRFbmRcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KVxuXHRcdFx0XHQuY2F0Y2gob0Vycm9yID0+IHtcblx0XHRcdFx0XHRMb2cuZXJyb3IoXCJFcnJvciB3aGlsZSBwYXN0aW5nIGRhdGFcIiwgb0Vycm9yKTtcblx0XHRcdFx0fSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG9SZXNvdXJjZU1vZGVsID0gc2FwLnVpLmdldENvcmUoKS5nZXRMaWJyYXJ5UmVzb3VyY2VCdW5kbGUoXCJzYXAuZmUuY29yZVwiKTtcblx0XHRcdE1lc3NhZ2VCb3guZXJyb3Iob1Jlc291cmNlTW9kZWwuZ2V0VGV4dChcIlRfT1BfQ09OVFJPTExFUl9TQVBGRV9QQVNURV9ESVNBQkxFRF9NRVNTQUdFXCIpLCB7XG5cdFx0XHRcdHRpdGxlOiBvUmVzb3VyY2VNb2RlbC5nZXRUZXh0KFwiQ19DT01NT05fU0FQRkVfRVJST1JcIilcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdEBFdmVudEhhbmRsZXJcblx0b25QYXN0ZUJ1dHRvblByZXNzZWQoKSB7XG5cdFx0Y29uc3Qgb1Jlc291cmNlTW9kZWwgPSBzYXAudWkuZ2V0Q29yZSgpLmdldExpYnJhcnlSZXNvdXJjZUJ1bmRsZShcInNhcC5mZS50ZW1wbGF0ZXNcIiksXG5cdFx0XHRzRGV2aWNlT3MgPSBEZXZpY2Uub3MubmFtZSxcblx0XHRcdHNEZXZpY2VTeXN0ZW0gPSBEZXZpY2Uuc3lzdGVtO1xuXHRcdC8vIFdlIG5lZWQgYSBkZWZhdWx0IGluIGNhc2Ugd2UgZmFsbCB0aHJvdWdoIHRoZSBjcmFja1xuXHRcdGxldCBzTWVzc2FnZU9uUGFzdGVCdXR0b246IHN0cmluZyA9IG9SZXNvdXJjZU1vZGVsLmdldFRleHQoXCJUX09QX0NPTlRST0xMRVJfVEFCTEVfUEFTVEVfQlVUVE9OX0FDVElPTl9NRVNTQUdFX1dJTkRPV1NfREVTS1RPUFwiKTtcblx0XHQvLyBPbiBtb2JpbGUsIHRoZXJlIGlzIG5vIG5hdGl2ZSBwYXN0ZSB0cmlnZ2VyOlxuXHRcdGlmIChzRGV2aWNlU3lzdGVtLnBob25lIHx8IChzRGV2aWNlU3lzdGVtLnRhYmxldCAmJiAhc0RldmljZVN5c3RlbS5jb21iaSkpIHtcblx0XHRcdHNNZXNzYWdlT25QYXN0ZUJ1dHRvbiA9IG9SZXNvdXJjZU1vZGVsLmdldFRleHQoXCJUX09QX0NPTlRST0xMRVJfVEFCTEVfUEFTVEVfQlVUVE9OX0FDVElPTl9NRVNTQUdFX1RPVUNIX0RFVklDRVwiKTtcblx0XHR9IGVsc2UgaWYgKHNEZXZpY2VTeXN0ZW0uZGVza3RvcCkge1xuXHRcdFx0c3dpdGNoIChzRGV2aWNlT3MpIHtcblx0XHRcdFx0Y2FzZSBcIndpblwiOlxuXHRcdFx0XHRcdHNNZXNzYWdlT25QYXN0ZUJ1dHRvbiA9IG9SZXNvdXJjZU1vZGVsLmdldFRleHQoXCJUX09QX0NPTlRST0xMRVJfVEFCTEVfUEFTVEVfQlVUVE9OX0FDVElPTl9NRVNTQUdFX1dJTkRPV1NfREVTS1RPUFwiKTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcIm1hY1wiOlxuXHRcdFx0XHRcdHNNZXNzYWdlT25QYXN0ZUJ1dHRvbiA9IG9SZXNvdXJjZU1vZGVsLmdldFRleHQoXCJUX09QX0NPTlRST0xMRVJfVEFCTEVfUEFTVEVfQlVUVE9OX0FDVElPTl9NRVNTQUdFX0lPU19ERVNLVE9QXCIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH1cblx0XHRNZXNzYWdlQm94LmluZm9ybWF0aW9uKHNNZXNzYWdlT25QYXN0ZUJ1dHRvbiwge1xuXHRcdFx0b25DbG9zZTogKCkgPT4ge1xuXHRcdFx0XHRpZiAodGhpcy5jb250ZW50KSB7XG5cdFx0XHRcdFx0Ly8gU2V0IHRoZSBmb2N1cyBvbiB0aGUgaW5uZXIgdGFibGUgdG8gYWxsb3cgcGFzdGVcblx0XHRcdFx0XHQodGhpcy5jb250ZW50LmdldEFnZ3JlZ2F0aW9uKFwiX2NvbnRlbnRcIikgYXMgYW55KT8uYXBwbHlGb2N1c0luZm8oeyBwcmV2ZW50U2Nyb2xsOiB0cnVlIH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBUaGlzIGV2ZW50IHdpbGwgYWxsb3cgdXMgdG8gaW50ZXJjZXB0IHRoZSBleHBvcnQgYmVmb3JlIGlzIHRyaWdnZXJlZCB0byBjb3ZlciBzcGVjaWZpYyBjYXNlc1xuXHQvLyB0aGF0IGNvdWxkbid0IGJlIGFkZHJlc3NlZCBvbiB0aGUgcHJvcGVydHlJbmZvcyBmb3IgZWFjaCBjb2x1bW4uXG5cdC8vIGUuZy4gRml4ZWQgVGFyZ2V0IFZhbHVlIGZvciB0aGUgZGF0YXBvaW50c1xuXHRARXZlbnRIYW5kbGVyXG5cdG9uQmVmb3JlRXhwb3J0KG9FdmVudDogVUk1RXZlbnQpIHtcblx0XHRjb25zdCBpc1NwbGl0TW9kZSA9IG9FdmVudC5nZXRQYXJhbWV0ZXJzKCkudXNlckV4cG9ydFNldHRpbmdzLnNwbGl0Q2VsbHMsXG5cdFx0XHRpc1JMVExhbmd1YWdlID0gc2FwLnVpXG5cdFx0XHRcdC5nZXRDb3JlKClcblx0XHRcdFx0LmdldENvbmZpZ3VyYXRpb24oKVxuXHRcdFx0XHQuZ2V0UlRMKCksXG5cdFx0XHRvVGFibGVDb250cm9sbGVyID0gb0V2ZW50LmdldFNvdXJjZSgpLFxuXHRcdFx0b0V4cG9ydENvbHVtbnMgPSBvRXZlbnQuZ2V0UGFyYW1ldGVycygpLmV4cG9ydFNldHRpbmdzLndvcmtib29rPy5jb2x1bW5zLFxuXHRcdFx0b1RhYmxlQ29sdW1ucyA9IHRoaXMudGFibGVEZWZpbml0aW9uLmNvbHVtbnM7XG5cblx0XHRUYWJsZUFQSS51cGRhdGVFeHBvcnRTZXR0aW5ncyhvRXhwb3J0Q29sdW1ucywgb1RhYmxlQ29sdW1ucywgb1RhYmxlQ29udHJvbGxlciwgaXNTcGxpdE1vZGUsIGlzUkxUTGFuZ3VhZ2UpO1xuXHR9XG5cblx0LyoqXG5cdCAqIEhhbmRsZXMgdGhlIERhdGFTdGF0ZUluZGljYXRvciBwbHVnaW4gZnJvbSBNREMgb24gYSB0YWJsZS5cblx0ICogQHBhcmFtIG9FdmVudFxuXHQgKiBAcGFyYW0gb1RhYmxlXG5cdCAqIEBuYW1lIGRhdGFTdGF0ZUZpbHRlclxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gV2hldGhlciB0byByZW5kZXIgdmlzaWJsZSB0aGUgRGF0YVN0YXRlSW5kaWNhdG9yXG5cdCAqL1xuXHRzdGF0aWMgaXNEYXRhU3RhdGVWaXNpYmxlKG9FdmVudDogVUk1RXZlbnQsIG9UYWJsZTogYW55KTogYm9vbGVhbiB7XG5cdFx0bGV0IG9UYWJsZUFQSSA9IG9UYWJsZS5nZXRQYXJlbnQoKTtcblx0XHR3aGlsZSAoIW9UYWJsZUFQSS5pc0EoXCJzYXAuZmUubWFjcm9zLlRhYmxlQVBJXCIpKSB7XG5cdFx0XHRvVGFibGVBUEkgPSBvVGFibGVBUEkuZ2V0UGFyZW50KCk7XG5cdFx0fVxuXHRcdHJldHVybiBvVGFibGVBUEkudGFibGVEZWZpbml0aW9uLmVuYWJsZURhdGFTdGF0ZUZpbHRlcjtcblx0fVxuXG5cdC8qKlxuXHQgKiBUaGlzIGV2ZW50IGhhbmRsZXMgdGhlIERhdGFTdGF0ZSBvZiB0aGUgRGF0YVN0YXRlSW5kaWNhdG9yIHBsdWdpbiBmcm9tIE1EQyBvbiBhIHRhYmxlLlxuXHQgKiBJdCdzIGZpcmVkIHdoZW4gbmV3IGVycm9yIG1lc3NhZ2VzIGFyZSBzZW50IGZyb20gdGhlIGJhY2tlbmQgYW5kIHRvIHJlY292ZXIgYmluZGluZy1yZWxhdGVkIG1lc3NhZ2VzIHdoZW4gY2hhbmdpbmcgdGFibGUgY29udGV4dC5cblx0ICpcblx0ICogQG5hbWUgb25EYXRhU3RhdGVDaGFuZ2Vcblx0ICogQHBhcmFtIHtvYmplY3R9IG9FdmVudCBFdmVudCBvYmplY3Rcblx0ICovXG5cdEBFdmVudEhhbmRsZXJcblx0b25EYXRhU3RhdGVDaGFuZ2Uob0V2ZW50OiBVSTVFdmVudCkge1xuXHRcdGNvbnN0IG9EYXRhU3RhdGVJbmRpY2F0b3IgPSBvRXZlbnQuZ2V0U291cmNlKCk7XG5cdFx0Y29uc3Qgb01EQ1RhYmxlID0gdGhpcy5jb250ZW50IGFzIGFueTtcblx0XHRjb25zdCBhRmlsdGVyZWRNZXNzYWdlcyA9IG9FdmVudC5nZXRQYXJhbWV0ZXIoXCJmaWx0ZXJlZE1lc3NhZ2VzXCIpO1xuXHRcdGNvbnN0IG9UYWJsZUNvbnRleHRzID0gb01EQ1RhYmxlLmdldFJvd0JpbmRpbmcoKS5nZXRDdXJyZW50Q29udGV4dHMoKTtcblx0XHRpZiAob01EQ1RhYmxlLmdldEJpbmRpbmdDb250ZXh0KCkpIHtcblx0XHRcdGlmICghYUZpbHRlcmVkTWVzc2FnZXMpIHtcblx0XHRcdFx0Ly9jaGVjayBpZiB0aGVyZSBpcyBhdCBsZWFzdCBvbiBtZXNzYWdlIG9uIHRoZSB0YWJsZVxuXHRcdFx0XHRjb25zdCBiTWVzc2FnZUV4aXN0c09uQ3VycmVudFRhYmxlID0gc2FwLnVpXG5cdFx0XHRcdFx0LmdldENvcmUoKVxuXHRcdFx0XHRcdC5nZXRNZXNzYWdlTWFuYWdlcigpXG5cdFx0XHRcdFx0LmdldE1lc3NhZ2VNb2RlbCgpXG5cdFx0XHRcdFx0LmdldERhdGEoKVxuXHRcdFx0XHRcdC5zb21lKChvTWVzc2FnZTogYW55KSA9PiB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdFx0XHRvVGFibGVDb250ZXh0cy5zb21lKChvUm93Q29udGV4dDogYW55KSA9PiB7XG5cdFx0XHRcdFx0XHRcdFx0cmV0dXJuIG9Sb3dDb250ZXh0ICYmIG9NZXNzYWdlLnRhcmdldC5pbmRleE9mKG9Sb3dDb250ZXh0LmdldFBhdGgoKSkgPT09IDA7XG5cdFx0XHRcdFx0XHRcdH0pIHx8IG9NRENUYWJsZS5nZXRCaW5kaW5nQ29udGV4dCgpLmdldFBhdGgoKSArIFwiL1wiICsgb01EQ1RhYmxlLmdldFJvd0JpbmRpbmcoKS5nZXRQYXRoKCkgPT09IG9NZXNzYWdlLnRhcmdldFxuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0aWYgKCFiTWVzc2FnZUV4aXN0c09uQ3VycmVudFRhYmxlKSB7XG5cdFx0XHRcdFx0Ly9oaWRlIGRlIGRhdGFzdGF0ZSBpbmRpY2F0b3IgaW4gY2FzZSB0aGVyZSBpcyBubyByZWxldmFudCBtZXNzYWdlc1xuXHRcdFx0XHRcdC8vICggYSBjYWxsIHRvIHRoZSBzaG93TWVzc2FnZSB3aXRob3V0IGlucHV0IHBhcmFtZXRlciBoaWRlcyB0aGUgbWVzc2FnZXN0cmlwIClcblx0XHRcdFx0XHRvRGF0YVN0YXRlSW5kaWNhdG9yLnNob3dNZXNzYWdlKCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGNvbnN0IG9JbnRlcm5hbE1vZGVsID0gb0RhdGFTdGF0ZUluZGljYXRvci5nZXRNb2RlbChcImludGVybmFsXCIpO1xuXHRcdFx0XHRvSW50ZXJuYWxNb2RlbC5zZXRQcm9wZXJ0eShcImZpbHRlcmVkTWVzc2FnZXNcIiwgYUZpbHRlcmVkTWVzc2FnZXMsIG9EYXRhU3RhdGVJbmRpY2F0b3IuZ2V0QmluZGluZ0NvbnRleHQoXCJpbnRlcm5hbFwiKSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0c3RhdGljIHVwZGF0ZUV4cG9ydFNldHRpbmdzKFxuXHRcdG9FeHBvcnRDb2x1bW5zOiBhbnksXG5cdFx0b0NvbHVtbnM6IFRhYmxlQ29sdW1uW10sXG5cdFx0b1RhYmxlQ29udHJvbGxlcjogUGFnZUNvbnRyb2xsZXIsXG5cdFx0aXNTcGxpdE1vZGU6IGJvb2xlYW4sXG5cdFx0aXNSTFRMYW5ndWFnZTogYm9vbGVhblxuXHQpOiBhbnkge1xuXHRcdG9FeHBvcnRDb2x1bW5zLmZvckVhY2goKG9Db2x1bW5FeHBvcnQ6IGFueSkgPT4ge1xuXHRcdFx0bGV0IGFFeHBvcnRMYWJlbHM6IHN0cmluZ1tdID0gW107XG5cdFx0XHRvQ29sdW1ucz8uZm9yRWFjaChjb2x1bW4gPT4ge1xuXHRcdFx0XHRjb25zdCBvQ29sdW1uID0gY29sdW1uIGFzIEFubm90YXRpb25UYWJsZUNvbHVtbjtcblx0XHRcdFx0aWYgKGlzU3BsaXRNb2RlKSB7XG5cdFx0XHRcdFx0Ly8gYUV4cG9ydExhYmVscyB3aWxsIGNvbnRhaW4gbGFiZWxzIGZyb20gYSBGaWVsZEdyb3VwLCBhIHRleHQgYW5ub3RhdGlvbiBhbmQgYSBEYXRhUG9pbnRcblx0XHRcdFx0XHQvLyBUaGVzZSBsYWJlbHMgd2lsbCBiZSB1c2VkIGZvciBjaGlsZCBwcm9wZXJ0aWVzIChzaW1wbGUgcHJvcGVydGllcykgZnJvbSBjb21wbGV4UHJvcGVydHlcblx0XHRcdFx0XHQvLyBVbml0L2N1cnJlbmN5IHByb3BlcnRpZXMgd2lsbCBiZSBkaXNtaXNzIGFzIGl0IGNvdWxkIGJlIHVzZWQgaW4gc2V2ZXJhbCBkYXRhZmllbGRzLlxuXHRcdFx0XHRcdGNvbnN0IGlzVW5pdCA9IG9Db2x1bW5zLnNvbWUoY29sdW1uID0+IChjb2x1bW4gYXMgQW5ub3RhdGlvblRhYmxlQ29sdW1uKS51bml0ID09PSBvQ29sdW1uRXhwb3J0LnByb3BlcnR5KTtcblx0XHRcdFx0XHQvLyBDcmVhdGUgRXhwb3J0aW5nIGxhYmVscyBhcnJheVxuXHRcdFx0XHRcdGNvbnN0IEZpZWxkR3JvdXBMYWJlbCA9IFRhYmxlQVBJLl9nZXRGaWVsZEdyb3VwRXhwb3J0TGFiZWwob0NvbHVtbkV4cG9ydCwgb0NvbHVtbiwgb1RhYmxlQ29udHJvbGxlcik7XG5cdFx0XHRcdFx0aWYgKEZpZWxkR3JvdXBMYWJlbCkge1xuXHRcdFx0XHRcdFx0YUV4cG9ydExhYmVscy51bnNoaWZ0KEZpZWxkR3JvdXBMYWJlbCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdC8vIEZvciBhIHRleHQgYW5ub3RhdGlvbiwgZXhwb3J0IGxhYmVsIHRlbXBsYXRlIHVzZWQgaXMgPHZhbHVlPiAtIDxkZXNjcmlwdGlvbj4gYW5kIGZvciBhIERhdGFQb2ludCA8ZGF0YXBvaW50VmFsdWU+IC0gPFRhcmdldFZhbHVlPi5cblx0XHRcdFx0XHQvLyBJbiBib3RoIGNhc2VzIGludGVybmF0aW9uYWxpemF0aW9uIGlzIG5lZWRlZFxuXHRcdFx0XHRcdGNvbnN0IGRhdGFGaWVsZERlc2NyaXB0aW9uTGFiZWwgPSBUYWJsZUFQSS5fZ2V0RGF0YUZpZWxkRGVzY3JpcHRpb25MYWJlbChcblx0XHRcdFx0XHRcdG9Db2x1bW5FeHBvcnQsXG5cdFx0XHRcdFx0XHRvQ29sdW1uLFxuXHRcdFx0XHRcdFx0b1RhYmxlQ29udHJvbGxlcixcblx0XHRcdFx0XHRcdGlzVW5pdFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0aWYgKGRhdGFGaWVsZERlc2NyaXB0aW9uTGFiZWwpIHtcblx0XHRcdFx0XHRcdGFFeHBvcnRMYWJlbHMudW5zaGlmdChkYXRhRmllbGREZXNjcmlwdGlvbkxhYmVsKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHQvL0FkZCBUYXJnZXRWYWx1ZSBvbiBkdW1teSBjcmVhdGVkIHByb3BlcnR5IHdoZW4gIGV4cG9ydGluZyBvbiBzcGxpdCBtb2RlXG5cdFx0XHRcdFx0aWYgKG9Db2x1bW4uaXNEYXRhUG9pbnRGYWtlVGFyZ2V0UHJvcGVydHkgJiYgb0NvbHVtbi5yZWxhdGl2ZVBhdGggPT09IG9Db2x1bW5FeHBvcnQucHJvcGVydHkpIHtcblx0XHRcdFx0XHRcdG9Db2x1bW5FeHBvcnQucHJvcGVydHkgPSBbb0NvbHVtbkV4cG9ydC5wcm9wZXJ0eV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRcdC8vTW9kaWZ5IGV4cG9ydGVkIHZhbHVlIHdoZW4gdXNpbmcgQ29tbXVuaWNhdGlvbi5Db250YWN0IGRhdGFGaWVsZEZvckFubm90YXRpb25cblx0XHRcdFx0Ly9jb250YWN0PmZuIHByb3BlcnR5IHNob3VsZCBiZSBleHBvcnRlZFxuXHRcdFx0XHRpZiAob0NvbHVtbi5leHBvcnRDb250YWN0UHJvcGVydHkgJiYgY29sdW1uLnByb3BlcnR5SW5mb3MpIHtcblx0XHRcdFx0XHRpZiAoY29sdW1uLnByb3BlcnR5SW5mb3M/Lmxlbmd0aCA9PT0gMSAmJiBjb2x1bW4ucHJvcGVydHlJbmZvcz8udG9TdHJpbmcoKSA9PT0gb0NvbHVtbkV4cG9ydC5wcm9wZXJ0eS50b1N0cmluZygpKSB7XG5cdFx0XHRcdFx0XHRvQ29sdW1uRXhwb3J0LnByb3BlcnR5ID0gb0NvbHVtbi5leHBvcnRDb250YWN0UHJvcGVydHk7XG5cdFx0XHRcdFx0XHRvQ29sdW1uRXhwb3J0LmxhYmVsID0gb0NvbHVtbi5sYWJlbDtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKFxuXHRcdFx0XHRcdFx0Y29sdW1uLnByb3BlcnR5SW5mb3M/Lmxlbmd0aCA+IDEgJiZcblx0XHRcdFx0XHRcdG9Db2x1bW4ucHJvcGVydHlJbmZvcz8uc29tZShwcm9wID0+IG9Db2x1bW5FeHBvcnQucHJvcGVydHkuaW5jbHVkZXMocHJvcCkpICYmXG5cdFx0XHRcdFx0XHRBcnJheS5pc0FycmF5KG9Db2x1bW5FeHBvcnQucHJvcGVydHkpXG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRvQ29sdW1uRXhwb3J0LnByb3BlcnR5ID0gb0NvbHVtbkV4cG9ydC5wcm9wZXJ0eT8ubWFwKChwcm9wZXJ0eTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiBvQ29sdW1uLnByb3BlcnR5SW5mb3M/LnNvbWUocHJvcCA9PiBwcm9wID09PSBwcm9wZXJ0eSkgPyBvQ29sdW1uLmV4cG9ydENvbnRhY3RQcm9wZXJ0eSA6IHByb3BlcnR5O1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHRcdGFFeHBvcnRMYWJlbHMucHVzaChnZXRMb2NhbGl6ZWRUZXh0KG9Db2x1bW5FeHBvcnQubGFiZWwsIG9UYWJsZUNvbnRyb2xsZXIpKTtcblx0XHRcdGlmIChhRXhwb3J0TGFiZWxzLmxlbmd0aCA+IDEpIHtcblx0XHRcdFx0Ly8gUmVtb3ZlIGR1cGxpY2F0ZSBsYWJlbHMgKGUuZy4gRmllbGRHcm91cCBsYWJlbCBpcyB0aGUgc2FtZSBhcyB0aGUgbGFiZWwgb2Ygb25lIG9mIHRoZSBwcm9wZXJ0aWVzKVxuXHRcdFx0XHRhRXhwb3J0TGFiZWxzID0gYUV4cG9ydExhYmVscy5maWx0ZXIoZnVuY3Rpb24obGFiZWwsIGluZGV4KSB7XG5cdFx0XHRcdFx0aWYgKGFFeHBvcnRMYWJlbHMuaW5kZXhPZihsYWJlbCkgPT0gaW5kZXgpIHtcblx0XHRcdFx0XHRcdHJldHVybiBsYWJlbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdFx0Ly8gQ2hlY2sgaWYgYSBSVEwgbGFuZ3VhZ2UgaWYgdXNlZCBhbmQgaWYgc28gd2UgbmVlZCB0byByZXZlcnNlIGxhYmVsc1xuXHRcdFx0aWYgKGlzUkxUTGFuZ3VhZ2UpIHtcblx0XHRcdFx0YUV4cG9ydExhYmVscy5yZXZlcnNlKCk7XG5cdFx0XHR9XG5cdFx0XHRvQ29sdW1uRXhwb3J0LmxhYmVsID0gYUV4cG9ydExhYmVscy5qb2luKFwiIC0gXCIpO1xuXHRcdH0pO1xuXHRcdHJldHVybiBvRXhwb3J0Q29sdW1ucztcblx0fVxuXG5cdHN0YXRpYyBfZ2V0RmllbGRHcm91cEV4cG9ydExhYmVsKG9Db2x1bW5FeHBvcnQ6IGFueSwgb0NvbHVtbjogQW5ub3RhdGlvblRhYmxlQ29sdW1uLCBvVGFibGVDb250cm9sbGVyOiBQYWdlQ29udHJvbGxlcikge1xuXHRcdGlmIChcblx0XHRcdChvQ29sdW1uRXhwb3J0LmNvbHVtbklkLmluZGV4T2YoXCI6OkZpZWxkR3JvdXA6OlwiKSAhPT0gLTEgfHxcblx0XHRcdFx0KG9Db2x1bW4uZXhwb3J0U2V0dGluZ3M/LmZpZWxkTGFiZWwgJiYgb0NvbHVtbkV4cG9ydC5jb2x1bW5JZC5pbmRleE9mKFwiX19jb2x1bW5cIikgIT09IC0xKSkgJiZcblx0XHRcdChvQ29sdW1uLnByb3BlcnR5SW5mb3M/LmluY2x1ZGVzKG9Db2x1bW5FeHBvcnQucHJvcGVydHkpIHx8XG5cdFx0XHRcdG9Db2x1bW4ucHJvcGVydHlJbmZvcz8uaW5jbHVkZXMoXCJQcm9wZXJ0eTo6XCIgKyBvQ29sdW1uRXhwb3J0LnByb3BlcnR5KSlcblx0XHQpIHtcblx0XHRcdGNvbnN0IGxhYmVsID0gb0NvbHVtbi5leHBvcnRTZXR0aW5ncz8uZmllbGRMYWJlbCB8fCBvQ29sdW1uLmxhYmVsO1xuXHRcdFx0cmV0dXJuIGdldExvY2FsaXplZFRleHQobGFiZWwsIG9UYWJsZUNvbnRyb2xsZXIpO1xuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBfZ2V0RGF0YUZpZWxkRGVzY3JpcHRpb25MYWJlbChcblx0XHRvQ29sdW1uRXhwb3J0OiBhbnksXG5cdFx0b0NvbHVtbjogQW5ub3RhdGlvblRhYmxlQ29sdW1uLFxuXHRcdG9UYWJsZUNvbnRyb2xsZXI6IFBhZ2VDb250cm9sbGVyLFxuXHRcdGlzVW5pdDogYm9vbGVhblxuXHQpIHtcblx0XHRpZiAoXG5cdFx0XHRvQ29sdW1uLnByb3BlcnR5SW5mb3MgJiZcblx0XHRcdG9Db2x1bW4ucHJvcGVydHlJbmZvcz8ubGVuZ3RoID4gMSAmJlxuXHRcdFx0IWlzVW5pdCAmJlxuXHRcdFx0KG9Db2x1bW4ucHJvcGVydHlJbmZvcz8uaW5jbHVkZXMob0NvbHVtbkV4cG9ydC5wcm9wZXJ0eSkgfHxcblx0XHRcdFx0b0NvbHVtbi5wcm9wZXJ0eUluZm9zPy5pbmNsdWRlcyhcIlByb3BlcnR5OjpcIiArIG9Db2x1bW5FeHBvcnQucHJvcGVydHkpKSAmJlxuXHRcdFx0b0NvbHVtbi5yZWxhdGl2ZVBhdGg/LmluZGV4T2YoXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuRmllbGRHcm91cFwiKSA9PT0gLTFcblx0XHQpIHtcblx0XHRcdHJldHVybiBnZXRMb2NhbGl6ZWRUZXh0KG9Db2x1bW4ubGFiZWwsIG9UYWJsZUNvbnRyb2xsZXIpO1xuXHRcdH1cblx0fVxuXHRARXZlbnRIYW5kbGVyXG5cdG9uTWFzc0VkaXRCdXR0b25QcmVzc2VkKG9FdmVudDogVUk1RXZlbnQsIFBhZ2VDb250cm9sbGVyOiBQYWdlQ29udHJvbGxlcikge1xuXHRcdGNvbnN0IG9UYWJsZSA9IHRoaXMuY29udGVudDtcblx0XHRvcGVuTWFzc0VkaXREaWFsb2cob1RhYmxlLCBQYWdlQ29udHJvbGxlcik7XG5cdH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVGFibGVBUEk7XG4iXX0=