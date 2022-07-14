/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport", "sap/ui/core/Control", "sap/base/util/merge", "sap/base/util/uid", "sap/fe/macros/PhantomUtil", "sap/ui/core/util/XMLPreprocessor", "sap/fe/core/converters/ConverterContext"], function (ClassSupport, Control, merge, uid, PhantomUtil, XMLPreprocessor, ConverterContext) {
  "use strict";

  var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _class3, _temp;

  var Property = ClassSupport.Property;
  var Aggregation = ClassSupport.Aggregation;
  var APIClass = ClassSupport.APIClass;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

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

  var MacroAPI = (_dec = APIClass("sap.fe.macros.MacroAPI"), _dec2 = Property({
    type: "string"
  }), _dec3 = Property({
    type: "string"
  }), _dec4 = Aggregation({
    type: "sap.ui.core.Control",
    multiple: false,
    isDefault: true
  }), _dec(_class = (_class2 = (_temp = _class3 = /*#__PURE__*/function (_Control) {
    _inherits(MacroAPI, _Control);

    var _super = _createSuper(MacroAPI);

    function MacroAPI(mSettings) {
      var _this;

      _classCallCheck(this, MacroAPI);

      for (var _len = arguments.length, others = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        others[_key - 1] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this, mSettings].concat(others));

      _initializerDefineProperty(_assertThisInitialized(_this), "contextPath", _descriptor, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "metaPath", _descriptor2, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "content", _descriptor3, _assertThisInitialized(_this));

      _defineProperty(_assertThisInitialized(_this), "modelResolved", false);

      MacroAPI.registerInstance(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(MacroAPI, [{
      key: "rerender",
      value: function rerender() {
        this.content.rerender();
      }
    }, {
      key: "getDomRef",
      value: function getDomRef() {
        var oContent = this.content;
        return oContent ? oContent.getDomRef() : _get(_getPrototypeOf(MacroAPI.prototype), "getDomRef", this).call(this);
      }
    }, {
      key: "getController",
      value: function getController() {
        return this.getModel("$view").getObject().getController();
      }
    }, {
      key: "propagateProperties",
      value: function propagateProperties(vName) {
        var _this2 = this;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        _get(_getPrototypeOf(MacroAPI.prototype), "propagateProperties", this).call(this, vName);

        if (this.metadata.macroContexts && !this.modelResolved) {
          var oPageModel = this.getModel("_pageModel");

          if (oPageModel) {
            Object.keys(this.metadata.macroContexts).forEach(function (macroKeyName) {
              _this2[macroKeyName] = oPageModel.getObject(_this2[macroKeyName]);
            });
            this.modelResolved = true;
          }
        }
      }
    }], [{
      key: "registerInstance",
      value: function registerInstance(_instance) {
        if (!this.instanceMap.get(_instance.constructor)) {
          this.instanceMap.set(_instance.constructor, []);
        }

        this.instanceMap.get(_instance.constructor).push(_instance);
      }
      /**
       * Defines the path of the context used in the current page or block.
       * This setting is defined by the framework.
       *
       * @public
       */

    }, {
      key: "getAPI",
      value: function getAPI(oEvent) {
        var oSource = oEvent.getSource();

        while (oSource && !oSource.isA("sap.fe.macros.MacroAPI") && oSource.getParent) {
          oSource = oSource.getParent();
        }

        if (!oSource || !oSource.isA("sap.fe.macros.MacroAPI")) {
          var oSourceMap = this.instanceMap.get(this);
          oSource = oSourceMap[oSourceMap.length - 1];
        }

        return oSource && oSource.isA("sap.fe.macros.MacroAPI") && oSource;
      }
    }, {
      key: "setDefaultValue",
      value: function setDefaultValue(oProps, sPropName, oOverrideValue) {
        if (oProps[sPropName] === undefined) {
          oProps[sPropName] = oOverrideValue;
        }
      }
    }, {
      key: "register",
      value: function register() {
        PhantomUtil.register(this);
      }
    }, {
      key: "unregister",
      value: function unregister() {
        XMLPreprocessor.plugIn(null, this.namespace, this.macroName);
      }
    }]);

    return MacroAPI;
  }(Control), _defineProperty(_class3, "namespace", "sap.fe.macros"), _defineProperty(_class3, "macroName", "Macro"), _defineProperty(_class3, "fragment", "sap.fe.macros.Macro"), _defineProperty(_class3, "hasValidation", true), _defineProperty(_class3, "instanceMap", new WeakMap()), _defineProperty(_class3, "getConverterContext", function (oDataModelPath, contextPath, mSettings) {
    var oAppComponent = mSettings.appComponent;
    var viewData = mSettings.models.viewData && mSettings.models.viewData.getData();
    var oConverterContext = ConverterContext.createConverterContextForMacro(oDataModelPath.startingEntitySet.name, mSettings.models.metaModel, oAppComponent && oAppComponent.getDiagnostics(), merge, oDataModelPath.contextLocation, viewData);
    return oConverterContext;
  }), _defineProperty(_class3, "createBindingContext", function (oData, mSettings) {
    var sContextPath = "/" + uid();
    mSettings.models.converterContext.setProperty(sContextPath, oData);
    return mSettings.models.converterContext.createBindingContext(sContextPath);
  }), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "contextPath", [_dec2], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "metaPath", [_dec3], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "content", [_dec4], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  })), _class2)) || _class);
  return MacroAPI;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hY3JvQVBJLnRzIl0sIm5hbWVzIjpbIk1hY3JvQVBJIiwiQVBJQ2xhc3MiLCJQcm9wZXJ0eSIsInR5cGUiLCJBZ2dyZWdhdGlvbiIsIm11bHRpcGxlIiwiaXNEZWZhdWx0IiwibVNldHRpbmdzIiwib3RoZXJzIiwicmVnaXN0ZXJJbnN0YW5jZSIsImNvbnRlbnQiLCJyZXJlbmRlciIsIm9Db250ZW50IiwiZ2V0RG9tUmVmIiwiZ2V0TW9kZWwiLCJnZXRPYmplY3QiLCJnZXRDb250cm9sbGVyIiwidk5hbWUiLCJtZXRhZGF0YSIsIm1hY3JvQ29udGV4dHMiLCJtb2RlbFJlc29sdmVkIiwib1BhZ2VNb2RlbCIsIk9iamVjdCIsImtleXMiLCJmb3JFYWNoIiwibWFjcm9LZXlOYW1lIiwiX2luc3RhbmNlIiwiaW5zdGFuY2VNYXAiLCJnZXQiLCJjb25zdHJ1Y3RvciIsInNldCIsInB1c2giLCJvRXZlbnQiLCJvU291cmNlIiwiZ2V0U291cmNlIiwiaXNBIiwiZ2V0UGFyZW50Iiwib1NvdXJjZU1hcCIsImxlbmd0aCIsIm9Qcm9wcyIsInNQcm9wTmFtZSIsIm9PdmVycmlkZVZhbHVlIiwidW5kZWZpbmVkIiwiUGhhbnRvbVV0aWwiLCJyZWdpc3RlciIsIlhNTFByZXByb2Nlc3NvciIsInBsdWdJbiIsIm5hbWVzcGFjZSIsIm1hY3JvTmFtZSIsIkNvbnRyb2wiLCJXZWFrTWFwIiwib0RhdGFNb2RlbFBhdGgiLCJjb250ZXh0UGF0aCIsIm9BcHBDb21wb25lbnQiLCJhcHBDb21wb25lbnQiLCJ2aWV3RGF0YSIsIm1vZGVscyIsImdldERhdGEiLCJvQ29udmVydGVyQ29udGV4dCIsIkNvbnZlcnRlckNvbnRleHQiLCJjcmVhdGVDb252ZXJ0ZXJDb250ZXh0Rm9yTWFjcm8iLCJzdGFydGluZ0VudGl0eVNldCIsIm5hbWUiLCJtZXRhTW9kZWwiLCJnZXREaWFnbm9zdGljcyIsIm1lcmdlIiwiY29udGV4dExvY2F0aW9uIiwib0RhdGEiLCJzQ29udGV4dFBhdGgiLCJ1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VSxFQU16QlgsUUFOeUIsQ0FBMUI7QUFRQSxXQUFPRyxpQkFBUDtBQUNBLEcsb0RBQzZCLFVBQVNTLEtBQVQsRUFBd0I1RCxTQUF4QixFQUF3QztBQUNyRSxRQUFNNkQsWUFBWSxHQUFHLE1BQU1DLEdBQUcsRUFBOUI7QUFDQTlELElBQUFBLFNBQVMsQ0FBQ2lELE1BQVYsQ0FBaUJjLGdCQUFqQixDQUFrQ0MsV0FBbEMsQ0FBOENILFlBQTlDLEVBQTRERCxLQUE1RDtBQUNBLFdBQU81RCxTQUFTLENBQUNpRCxNQUFWLENBQWlCYyxnQkFBakIsQ0FBa0NFLG9CQUFsQyxDQUF1REosWUFBdkQsQ0FBUDtBQUNBLEc7Ozs7Ozs7Ozs7Ozs7Ozs7U0FTYXBFLFEiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFQSUNsYXNzLCBBZ2dyZWdhdGlvbiwgUHJvcGVydHksIFByb3BlcnRpZXNPZiB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0NsYXNzU3VwcG9ydFwiO1xuaW1wb3J0IHsgQ29udHJvbCB9IGZyb20gXCJzYXAvdWkvY29yZVwiO1xuaW1wb3J0IHsgRGF0YU1vZGVsT2JqZWN0UGF0aCB9IGZyb20gXCJzYXAvZmUvY29yZS90ZW1wbGF0aW5nL0RhdGFNb2RlbFBhdGhIZWxwZXJcIjtcbmltcG9ydCB7IG1lcmdlLCB1aWQgfSBmcm9tIFwic2FwL2Jhc2UvdXRpbFwiO1xuaW1wb3J0IHsgUGhhbnRvbVV0aWwgfSBmcm9tIFwic2FwL2ZlL21hY3Jvc1wiO1xuaW1wb3J0IHsgWE1MUHJlcHJvY2Vzc29yIH0gZnJvbSBcInNhcC91aS9jb3JlL3V0aWxcIjtcbmltcG9ydCBDb252ZXJ0ZXJDb250ZXh0IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL0NvbnZlcnRlckNvbnRleHRcIjtcbmltcG9ydCB7IFBhZ2VDb250cm9sbGVyIH0gZnJvbSBcInNhcC9mZS9jb3JlXCI7XG5cbkBBUElDbGFzcyhcInNhcC5mZS5tYWNyb3MuTWFjcm9BUElcIilcbmNsYXNzIE1hY3JvQVBJIGV4dGVuZHMgQ29udHJvbCB7XG5cdHN0YXRpYyBuYW1lc3BhY2U6IHN0cmluZyA9IFwic2FwLmZlLm1hY3Jvc1wiO1xuXHRzdGF0aWMgbWFjcm9OYW1lOiBzdHJpbmcgPSBcIk1hY3JvXCI7XG5cdHN0YXRpYyBmcmFnbWVudDogc3RyaW5nID0gXCJzYXAuZmUubWFjcm9zLk1hY3JvXCI7XG5cdHN0YXRpYyBoYXNWYWxpZGF0aW9uOiBib29sZWFuID0gdHJ1ZTtcblx0c3RhdGljIGluc3RhbmNlTWFwOiBXZWFrTWFwPG9iamVjdCwgb2JqZWN0W10+ID0gbmV3IFdlYWtNYXA8b2JqZWN0LCBvYmplY3RbXT4oKTtcblxuXHRjb25zdHJ1Y3RvcihtU2V0dGluZ3M/OiBQcm9wZXJ0aWVzT2Y8TWFjcm9BUEk+LCAuLi5vdGhlcnM6IGFueVtdKSB7XG5cdFx0c3VwZXIobVNldHRpbmdzIGFzIGFueSwgLi4ub3RoZXJzKTtcblx0XHRNYWNyb0FQSS5yZWdpc3Rlckluc3RhbmNlKHRoaXMpO1xuXHR9XG5cblx0c3RhdGljIHJlZ2lzdGVySW5zdGFuY2UoX2luc3RhbmNlOiBhbnkpIHtcblx0XHRpZiAoIXRoaXMuaW5zdGFuY2VNYXAuZ2V0KF9pbnN0YW5jZS5jb25zdHJ1Y3RvcikpIHtcblx0XHRcdHRoaXMuaW5zdGFuY2VNYXAuc2V0KF9pbnN0YW5jZS5jb25zdHJ1Y3RvciwgW10pO1xuXHRcdH1cblx0XHQodGhpcy5pbnN0YW5jZU1hcC5nZXQoX2luc3RhbmNlLmNvbnN0cnVjdG9yKSBhcyBvYmplY3RbXSkucHVzaChfaW5zdGFuY2UpO1xuXHR9XG5cdC8qKlxuXHQgKiBEZWZpbmVzIHRoZSBwYXRoIG9mIHRoZSBjb250ZXh0IHVzZWQgaW4gdGhlIGN1cnJlbnQgcGFnZSBvciBibG9jay5cblx0ICogVGhpcyBzZXR0aW5nIGlzIGRlZmluZWQgYnkgdGhlIGZyYW1ld29yay5cblx0ICpcblx0ICogQHB1YmxpY1xuXHQgKi9cblx0QFByb3BlcnR5KHsgdHlwZTogXCJzdHJpbmdcIiB9KVxuXHRjb250ZXh0UGF0aCE6IHN0cmluZztcblxuXHQvKipcblx0ICogRGVmaW5lcyB0aGUgcmVsYXRpdmUgcGF0aCBvZiB0aGUgcHJvcGVydHkgaW4gdGhlIG1ldGFtb2RlbCwgYmFzZWQgb24gdGhlIGN1cnJlbnQgY29udGV4dFBhdGguXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdEBQcm9wZXJ0eSh7IHR5cGU6IFwic3RyaW5nXCIgfSlcblx0bWV0YVBhdGghOiBzdHJpbmc7XG5cblx0QEFnZ3JlZ2F0aW9uKHsgdHlwZTogXCJzYXAudWkuY29yZS5Db250cm9sXCIsIG11bHRpcGxlOiBmYWxzZSwgaXNEZWZhdWx0OiB0cnVlIH0pXG5cdGNvbnRlbnQhOiBDb250cm9sO1xuXG5cdHJlcmVuZGVyKCkge1xuXHRcdHRoaXMuY29udGVudC5yZXJlbmRlcigpO1xuXHR9XG5cblx0Z2V0RG9tUmVmKCkge1xuXHRcdGNvbnN0IG9Db250ZW50ID0gdGhpcy5jb250ZW50O1xuXHRcdHJldHVybiBvQ29udGVudCA/IG9Db250ZW50LmdldERvbVJlZigpIDogc3VwZXIuZ2V0RG9tUmVmKCk7XG5cdH1cblx0Z2V0Q29udHJvbGxlcigpOiBQYWdlQ29udHJvbGxlciB7XG5cdFx0cmV0dXJuICh0aGlzLmdldE1vZGVsKFwiJHZpZXdcIikgYXMgYW55KS5nZXRPYmplY3QoKS5nZXRDb250cm9sbGVyKCk7XG5cdH1cblx0cHJpdmF0ZSBtZXRhZGF0YTogYW55O1xuXHRwcml2YXRlIG1vZGVsUmVzb2x2ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblx0cHJvcGFnYXRlUHJvcGVydGllcyh2TmFtZTogc3RyaW5nIHwgYm9vbGVhbikge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcblx0XHQvLyBAdHMtaWdub3JlXG5cdFx0c3VwZXIucHJvcGFnYXRlUHJvcGVydGllcyh2TmFtZSk7XG5cdFx0aWYgKHRoaXMubWV0YWRhdGEubWFjcm9Db250ZXh0cyAmJiAhdGhpcy5tb2RlbFJlc29sdmVkKSB7XG5cdFx0XHRjb25zdCBvUGFnZU1vZGVsID0gdGhpcy5nZXRNb2RlbChcIl9wYWdlTW9kZWxcIik7XG5cdFx0XHRpZiAob1BhZ2VNb2RlbCkge1xuXHRcdFx0XHRPYmplY3Qua2V5cyh0aGlzLm1ldGFkYXRhLm1hY3JvQ29udGV4dHMpLmZvckVhY2goKG1hY3JvS2V5TmFtZTogc3RyaW5nKSA9PiB7XG5cdFx0XHRcdFx0dGhpc1ttYWNyb0tleU5hbWUgYXMga2V5b2YgTWFjcm9BUEldID0gb1BhZ2VNb2RlbC5nZXRPYmplY3QodGhpc1ttYWNyb0tleU5hbWUgYXMga2V5b2YgTWFjcm9BUEldIGFzIHN0cmluZyk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHR0aGlzLm1vZGVsUmVzb2x2ZWQgPSB0cnVlO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxuXG5cdHN0YXRpYyBnZXRBUEkob0V2ZW50OiBVSTVFdmVudCk6IE1hY3JvQVBJIHtcblx0XHRsZXQgb1NvdXJjZSA9IG9FdmVudC5nZXRTb3VyY2UoKTtcblx0XHR3aGlsZSAob1NvdXJjZSAmJiAhb1NvdXJjZS5pc0EoXCJzYXAuZmUubWFjcm9zLk1hY3JvQVBJXCIpICYmIG9Tb3VyY2UuZ2V0UGFyZW50KSB7XG5cdFx0XHRvU291cmNlID0gb1NvdXJjZS5nZXRQYXJlbnQoKTtcblx0XHR9XG5cdFx0aWYgKCFvU291cmNlIHx8ICFvU291cmNlLmlzQShcInNhcC5mZS5tYWNyb3MuTWFjcm9BUElcIikpIHtcblx0XHRcdGNvbnN0IG9Tb3VyY2VNYXAgPSB0aGlzLmluc3RhbmNlTWFwLmdldCh0aGlzKSBhcyBvYmplY3RbXTtcblx0XHRcdG9Tb3VyY2UgPSBvU291cmNlTWFwW29Tb3VyY2VNYXAubGVuZ3RoIC0gMV07XG5cdFx0fVxuXHRcdHJldHVybiBvU291cmNlICYmIG9Tb3VyY2UuaXNBKFwic2FwLmZlLm1hY3Jvcy5NYWNyb0FQSVwiKSAmJiBvU291cmNlO1xuXHR9XG5cblx0c3RhdGljIHNldERlZmF1bHRWYWx1ZShvUHJvcHM6IGFueSwgc1Byb3BOYW1lOiBzdHJpbmcsIG9PdmVycmlkZVZhbHVlOiBhbnkpIHtcblx0XHRpZiAob1Byb3BzW3NQcm9wTmFtZV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0b1Byb3BzW3NQcm9wTmFtZV0gPSBvT3ZlcnJpZGVWYWx1ZTtcblx0XHR9XG5cdH1cblx0c3RhdGljIGdldENvbnZlcnRlckNvbnRleHQgPSBmdW5jdGlvbihvRGF0YU1vZGVsUGF0aDogRGF0YU1vZGVsT2JqZWN0UGF0aCwgY29udGV4dFBhdGg6IHN0cmluZywgbVNldHRpbmdzOiBhbnkpIHtcblx0XHRjb25zdCBvQXBwQ29tcG9uZW50ID0gbVNldHRpbmdzLmFwcENvbXBvbmVudDtcblx0XHRjb25zdCB2aWV3RGF0YSA9IG1TZXR0aW5ncy5tb2RlbHMudmlld0RhdGEgJiYgbVNldHRpbmdzLm1vZGVscy52aWV3RGF0YS5nZXREYXRhKCk7XG5cdFx0Y29uc3Qgb0NvbnZlcnRlckNvbnRleHQgPSBDb252ZXJ0ZXJDb250ZXh0LmNyZWF0ZUNvbnZlcnRlckNvbnRleHRGb3JNYWNybyhcblx0XHRcdG9EYXRhTW9kZWxQYXRoLnN0YXJ0aW5nRW50aXR5U2V0Lm5hbWUsXG5cdFx0XHRtU2V0dGluZ3MubW9kZWxzLm1ldGFNb2RlbCxcblx0XHRcdG9BcHBDb21wb25lbnQgJiYgb0FwcENvbXBvbmVudC5nZXREaWFnbm9zdGljcygpLFxuXHRcdFx0bWVyZ2UsXG5cdFx0XHRvRGF0YU1vZGVsUGF0aC5jb250ZXh0TG9jYXRpb24sXG5cdFx0XHR2aWV3RGF0YVxuXHRcdCk7XG5cdFx0cmV0dXJuIG9Db252ZXJ0ZXJDb250ZXh0O1xuXHR9O1xuXHRzdGF0aWMgY3JlYXRlQmluZGluZ0NvbnRleHQgPSBmdW5jdGlvbihvRGF0YTogb2JqZWN0LCBtU2V0dGluZ3M6IGFueSkge1xuXHRcdGNvbnN0IHNDb250ZXh0UGF0aCA9IFwiL1wiICsgdWlkKCk7XG5cdFx0bVNldHRpbmdzLm1vZGVscy5jb252ZXJ0ZXJDb250ZXh0LnNldFByb3BlcnR5KHNDb250ZXh0UGF0aCwgb0RhdGEpO1xuXHRcdHJldHVybiBtU2V0dGluZ3MubW9kZWxzLmNvbnZlcnRlckNvbnRleHQuY3JlYXRlQmluZGluZ0NvbnRleHQoc0NvbnRleHRQYXRoKTtcblx0fTtcblx0c3RhdGljIHJlZ2lzdGVyKCkge1xuXHRcdFBoYW50b21VdGlsLnJlZ2lzdGVyKHRoaXMpO1xuXHR9XG5cdHN0YXRpYyB1bnJlZ2lzdGVyKCkge1xuXHRcdChYTUxQcmVwcm9jZXNzb3IgYXMgYW55KS5wbHVnSW4obnVsbCwgdGhpcy5uYW1lc3BhY2UsIHRoaXMubWFjcm9OYW1lKTtcblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBNYWNyb0FQSTtcbiJdfQ==