/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/mvc/ControllerExtension", "sap/ui/core/mvc/OverrideExecution", "sap/fe/core/controllerextensions/ControllerExtensionMetadata", "sap/ui/core/Component", "sap/fe/core/CommonUtils", "sap/ui/base/EventProvider", "sap/base/Log", "../helpers/ClassSupport"], function (ControllerExtension, OverrideExecution, ControllerExtensionMetadata, Component, CommonUtils, EventProvider, Log, ClassSupport) {
  "use strict";

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class, _class2;

  var Private = ClassSupport.Private;
  var Extensible = ClassSupport.Extensible;
  var Final = ClassSupport.Final;
  var Public = ClassSupport.Public;
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

  var PageReadyControllerExtension = (_dec = UI5Class("sap.fe.core.controllerextensions.PageReady", ControllerExtensionMetadata), _dec2 = Override(), _dec3 = Override(), _dec4 = Override("_routing"), _dec5 = Override("_routing"), _dec6 = Override("_routing"), _dec7 = Extensible(OverrideExecution.Instead), _dec(_class = (_class2 = /*#__PURE__*/function (_ControllerExtension) {
    _inherits(PageReadyControllerExtension, _ControllerExtension);

    var _super = _createSuper(PageReadyControllerExtension);

    function PageReadyControllerExtension() {
      _classCallCheck(this, PageReadyControllerExtension);

      return _super.apply(this, arguments);
    }

    _createClass(PageReadyControllerExtension, [{
      key: "onInit",
      value: function onInit() {
        var _this = this;

        this._nbWaits = 0;
        this._oEventProvider = new EventProvider();
        this._oView = this.base.getView();
        this._oAppComponent = CommonUtils.getAppComponent(this._oView);
        this._oPageComponent = Component.getOwnerComponentFor(this._oView);

        if (this._oPageComponent && this._oPageComponent.attachContainerDefined) {
          this._oPageComponent.attachContainerDefined(function (oEvent) {
            return _this.registerContainer(oEvent.getParameter("container"));
          });
        } else {
          this.registerContainer(this._oView);
        }
      }
    }, {
      key: "onExit",
      value: function onExit() {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        delete this._oAppComponent;
        this._oContainer && this._oContainer.removeEventDelegate(this._fnContainerDelegate);
      }
    }, {
      key: "waitFor",
      value: function waitFor(oPromise) {
        var _this2 = this;

        this._nbWaits++;
        oPromise.finally(function () {
          setTimeout(function () {
            _this2._nbWaits--;
          }, 0);
        }).catch(null);
      }
    }, {
      key: "onRouteMatched",
      value: function onRouteMatched() {
        this._bIsPageReady = false;
      }
    }, {
      key: "onRouteMatchedFinished",
      value: function onRouteMatchedFinished() {
        this.checkPageReadyDebounced();
      }
    }, {
      key: "onAfterBinding",
      value: function onAfterBinding(oBindingContext) {
        var _this3 = this;

        if (!this._bAfterBindingAlreadyApplied) {
          this._bAfterBindingAlreadyApplied = true;
          var aBoundElements = [];
          var aNotBoundMDCTables = [];
          var iRequested = 0;
          var iReceived = 0;

          var fnRequested = function (oEvent) {
            oEvent.getSource().detachDataRequested(fnRequested);
            iRequested++;
            _this3.bDataReceived = false;
          };

          var fnReceived = function (oEvent) {
            switch (oEvent.getSource().sGroupId) {
              case "$auto.Workers":
                _this3._oEventProvider.fireEvent("workersBatchReceived");

                break;

              case "$auto.Heroes":
                _this3._oEventProvider.fireEvent("heroesBatchReceived");

                break;

              default:
            }

            oEvent.getSource().detachDataReceived(fnReceived);
            iReceived++;

            if (iReceived === iRequested && iRequested !== 0) {
              iRequested = 0;
              iReceived = 0;
              _this3.bDataReceived = true;

              _this3.checkPageReadyDebounced();
            }
          };

          var fnSearch = function (oEvent) {
            var aMDCTables = aNotBoundMDCTables.filter(function (oElem) {
              if (oEvent.getSource().sId === oElem.getFilter()) {
                return true;
              }

              return false;
            });
            aMDCTables.forEach(function (oMDCTable) {
              var oRowBinding = oMDCTable.getRowBinding();

              var fnAttachDataEvents = function () {
                oRowBinding.attachDataRequested(fnRequested);
                oRowBinding.attachDataReceived(fnReceived);
                aBoundElements.push(oRowBinding);
              };

              if (oRowBinding) {
                fnAttachDataEvents();
              } else {
                setTimeout(function () {
                  oRowBinding = oMDCTable.getRowBinding();

                  if (oRowBinding) {
                    fnAttachDataEvents();
                  } else {
                    Log.error("Cannot attach events to unbound table");
                  }
                }, 0);
              }
            });
          };

          if (this.isContextExpected() && oBindingContext === undefined) {
            // Force to mention we are expecting data
            this.bHasContext = false;
            return;
          } else {
            this.bHasContext = true;
          }

          this.attachEventOnce("pageReady", null, function () {
            aBoundElements.forEach(function (oElement) {
              oElement.detachEvent("dataRequested", fnRequested);
              oElement.detachEvent("dataReceived", fnReceived);
              oElement.detachEvent("search", fnSearch);
            });
            _this3._bAfterBindingAlreadyApplied = false;
            aBoundElements = [];
          }, null);

          if (oBindingContext) {
            var mainObjectBinding = oBindingContext.getBinding();
            mainObjectBinding.attachDataRequested(fnRequested);
            mainObjectBinding.attachDataReceived(fnReceived);
            aBoundElements.push(mainObjectBinding);
          }

          var aTableInitializedPromises = [];

          this._oView.findAggregatedObjects(true, function (oElement) {
            var oObjectBinding = oElement.getObjectBinding();

            if (oObjectBinding) {
              // Register on all object binding (mostly used on object pages)
              oObjectBinding.attachDataRequested(fnRequested);
              oObjectBinding.attachDataReceived(fnReceived);
              aBoundElements.push(oObjectBinding);
            } else {
              var aBindingKeys = Object.keys(oElement.mBindingInfos);

              if (aBindingKeys.length > 0) {
                aBindingKeys.forEach(function (sPropertyName) {
                  var oListBinding = oElement.mBindingInfos[sPropertyName].binding; // Register on all list binding, good for basic tables, problematic for MDC, see above

                  if (oListBinding && oListBinding.isA("sap.ui.model.odata.v4.ODataListBinding")) {
                    oListBinding.attachDataRequested(fnRequested);
                    oListBinding.attachDataReceived(fnReceived);
                    aBoundElements.push(oListBinding);
                  }
                });
              }
            } // This is dirty but MDC Table has a weird loading lifecycle


            if (oElement.isA("sap.ui.mdc.Table")) {
              _this3.bTablesLoaded = false; // access binding only after table is bound

              aTableInitializedPromises.push(oElement.initialized().then(function () {
                var oRowBinding = oElement.getRowBinding();

                if (oRowBinding) {
                  oRowBinding.attachDataRequested(fnRequested);
                  oRowBinding.attachDataReceived(fnReceived);
                  aBoundElements.push(oRowBinding);
                } else {
                  aNotBoundMDCTables.push(oElement);
                }
              }).catch(function (oError) {
                Log.error("Cannot find a bound table", oError);
              }));
            } else if (oElement.isA("sap.fe.core.controls.FilterBar")) {
              oElement.attachEvent("search", fnSearch);
              aBoundElements.push(oElement);
            }
          });

          if (aTableInitializedPromises.length > 0) {
            Promise.all(aTableInitializedPromises).then(function () {
              _this3.bTablesLoaded = true;

              _this3.checkPageReadyDebounced();
            }).catch(function (oError) {
              Log.info("There was an error with one or multiple table", oError);
              _this3.bTablesLoaded = true;

              _this3.checkPageReadyDebounced();
            });
          }
        }
      }
    }, {
      key: "isPageReady",
      value: function isPageReady() {
        return this._bIsPageReady;
      }
    }, {
      key: "waitPageReady",
      value: function waitPageReady() {
        var _this4 = this;

        return new Promise(function (resolve) {
          if (_this4.isPageReady()) {
            resolve();
          } else {
            _this4.attachEventOnce("pageReady", null, function () {
              resolve();
            }, _this4);
          }
        });
      }
    }, {
      key: "attachEventOnce",
      value: function attachEventOnce(sEventId, oData, fnFunction, oListener) {
        // eslint-disable-next-line prefer-rest-params
        return this._oEventProvider.attachEventOnce(sEventId, oData, fnFunction, oListener);
      }
    }, {
      key: "attachEvent",
      value: function attachEvent(sEventId, oData, fnFunction, oListener) {
        // eslint-disable-next-line prefer-rest-params
        return this._oEventProvider.attachEvent(sEventId, oData, fnFunction, oListener);
      }
    }, {
      key: "detachEvent",
      value: function detachEvent(sEventId, fnFunction) {
        // eslint-disable-next-line prefer-rest-params
        return this._oEventProvider.detachEvent(sEventId, fnFunction);
      }
    }, {
      key: "registerContainer",
      value: function registerContainer(oContainer) {
        var _this5 = this;

        this._oContainer = oContainer;
        this._fnContainerDelegate = {
          onBeforeShow: function () {
            _this5.bShown = false;
            _this5._bIsPageReady = false;
          },
          onBeforeHide: function () {
            _this5.bShown = false;
            _this5._bIsPageReady = false;
          },
          onAfterShow: function () {
            _this5.bShown = true;

            _this5._checkPageReady(true);
          }
        };

        this._oContainer.addEventDelegate(this._fnContainerDelegate);
      }
    }, {
      key: "isContextExpected",
      value: function isContextExpected() {
        return false;
      }
    }, {
      key: "checkPageReadyDebounced",
      value: function checkPageReadyDebounced() {
        var _this6 = this;

        if (this.pageReadyTimer) {
          clearTimeout(this.pageReadyTimer);
        }

        this.pageReadyTimer = setTimeout(function () {
          _this6._checkPageReady();
        }, 200);
      }
    }, {
      key: "_checkPageReady",
      value: function _checkPageReady() {
        var _this7 = this;

        var bFromNav = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        var fnUIUpdated = function () {
          // Wait until the UI is no longer dirty
          if (!sap.ui.getCore().getUIDirty()) {
            sap.ui.getCore().detachEvent("UIUpdated", fnUIUpdated);
            _this7._bWaitingForRefresh = false;
            setTimeout(function () {
              _this7._checkPageReady();
            }, 20);
          }
        }; // In case UIUpdate does not get called, check if UI is not dirty and then call _checkPageReady


        var checkUIUpdated = function () {
          if (sap.ui.getCore().getUIDirty()) {
            setTimeout(checkUIUpdated, 500);
          } else if (_this7._bWaitingForRefresh) {
            _this7._bWaitingForRefresh = false;
            sap.ui.getCore().detachEvent("UIUpdated", fnUIUpdated);

            _this7._checkPageReady();
          }
        };

        if (this.bShown && this.bDataReceived !== false && this.bTablesLoaded !== false && (!this.isContextExpected() || this.bHasContext) // Either no context is expected or there is one
        ) {
            if (this.bDataReceived === true && !bFromNav && !this._bWaitingForRefresh && sap.ui.getCore().getUIDirty()) {
              // If we requested data we get notified as soon as the data arrived, so before the next rendering tick
              this.bDataReceived = undefined;
              this._bWaitingForRefresh = true;
              sap.ui.getCore().attachEvent("UIUpdated", fnUIUpdated);
              setTimeout(checkUIUpdated, 500);
            } else if (!this._bWaitingForRefresh && sap.ui.getCore().getUIDirty() || this._nbWaits !== 0) {
              this._bWaitingForRefresh = true;
              sap.ui.getCore().attachEvent("UIUpdated", fnUIUpdated);
              setTimeout(checkUIUpdated, 500);
            } else if (!this._bWaitingForRefresh) {
              // In the case we're not waiting for any data (navigating back to a page we already have loaded)
              // just wait for a frame to fire the event.
              this._bIsPageReady = true;

              this._oEventProvider.fireEvent("pageReady");
            }
          }
      }
    }]);

    return PageReadyControllerExtension;
  }(ControllerExtension), (_applyDecoratedDescriptor(_class2.prototype, "onInit", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "onInit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onExit", [_dec3], Object.getOwnPropertyDescriptor(_class2.prototype, "onExit"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "waitFor", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "waitFor"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRouteMatched", [_dec4], Object.getOwnPropertyDescriptor(_class2.prototype, "onRouteMatched"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onRouteMatchedFinished", [_dec5], Object.getOwnPropertyDescriptor(_class2.prototype, "onRouteMatchedFinished"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "onAfterBinding", [_dec6], Object.getOwnPropertyDescriptor(_class2.prototype, "onAfterBinding"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isPageReady", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "isPageReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "waitPageReady", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "waitPageReady"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "attachEventOnce", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "attachEventOnce"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "attachEvent", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "attachEvent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "detachEvent", [Public, Final], Object.getOwnPropertyDescriptor(_class2.prototype, "detachEvent"), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, "isContextExpected", [Private, _dec7], Object.getOwnPropertyDescriptor(_class2.prototype, "isContextExpected"), _class2.prototype)), _class2)) || _class);
  return PageReadyControllerExtension;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIlBhZ2VSZWFkeS50cyJdLCJuYW1lcyI6WyJQYWdlUmVhZHlDb250cm9sbGVyRXh0ZW5zaW9uIiwiVUk1Q2xhc3MiLCJDb250cm9sbGVyRXh0ZW5zaW9uTWV0YWRhdGEiLCJPdmVycmlkZSIsIkV4dGVuc2libGUiLCJPdmVycmlkZUV4ZWN1dGlvbiIsIkluc3RlYWQiLCJfbmJXYWl0cyIsIl9vRXZlbnRQcm92aWRlciIsIkV2ZW50UHJvdmlkZXIiLCJfb1ZpZXciLCJiYXNlIiwiZ2V0VmlldyIsIl9vQXBwQ29tcG9uZW50IiwiQ29tbW9uVXRpbHMiLCJnZXRBcHBDb21wb25lbnQiLCJfb1BhZ2VDb21wb25lbnQiLCJDb21wb25lbnQiLCJnZXRPd25lckNvbXBvbmVudEZvciIsImF0dGFjaENvbnRhaW5lckRlZmluZWQiLCJvRXZlbnQiLCJyZWdpc3RlckNvbnRhaW5lciIsImdldFBhcmFtZXRlciIsIl9vQ29udGFpbmVyIiwicmVtb3ZlRXZlbnREZWxlZ2F0ZSIsIl9mbkNvbnRhaW5lckRlbGVnYXRlIiwib1Byb21pc2UiLCJmaW5hbGx5Iiwic2V0VGltZW91dCIsImNhdGNoIiwiX2JJc1BhZ2VSZWFkeSIsImNoZWNrUGFnZVJlYWR5RGVib3VuY2VkIiwib0JpbmRpbmdDb250ZXh0IiwiX2JBZnRlckJpbmRpbmdBbHJlYWR5QXBwbGllZCIsImFCb3VuZEVsZW1lbnRzIiwiYU5vdEJvdW5kTURDVGFibGVzIiwiaVJlcXVlc3RlZCIsImlSZWNlaXZlZCIsImZuUmVxdWVzdGVkIiwiZ2V0U291cmNlIiwiZGV0YWNoRGF0YVJlcXVlc3RlZCIsImJEYXRhUmVjZWl2ZWQiLCJmblJlY2VpdmVkIiwic0dyb3VwSWQiLCJmaXJlRXZlbnQiLCJkZXRhY2hEYXRhUmVjZWl2ZWQiLCJmblNlYXJjaCIsImFNRENUYWJsZXMiLCJmaWx0ZXIiLCJvRWxlbSIsInNJZCIsImdldEZpbHRlciIsImZvckVhY2giLCJvTURDVGFibGUiLCJvUm93QmluZGluZyIsImdldFJvd0JpbmRpbmciLCJmbkF0dGFjaERhdGFFdmVudHMiLCJhdHRhY2hEYXRhUmVxdWVzdGVkIiwiYXR0YWNoRGF0YVJlY2VpdmVkIiwicHVzaCIsIkxvZyIsImVycm9yIiwiaXNDb250ZXh0RXhwZWN0ZWQiLCJ1bmRlZmluZWQiLCJiSGFzQ29udGV4dCIsImF0dGFjaEV2ZW50T25jZSIsIm9FbGVtZW50IiwiZGV0YWNoRXZlbnQiLCJtYWluT2JqZWN0QmluZGluZyIsImdldEJpbmRpbmciLCJhVGFibGVJbml0aWFsaXplZFByb21pc2VzIiwiZmluZEFnZ3JlZ2F0ZWRPYmplY3RzIiwib09iamVjdEJpbmRpbmciLCJnZXRPYmplY3RCaW5kaW5nIiwiYUJpbmRpbmdLZXlzIiwiT2JqZWN0Iiwia2V5cyIsIm1CaW5kaW5nSW5mb3MiLCJsZW5ndGgiLCJzUHJvcGVydHlOYW1lIiwib0xpc3RCaW5kaW5nIiwiYmluZGluZyIsImlzQSIsImJUYWJsZXNMb2FkZWQiLCJpbml0aWFsaXplZCIsInRoZW4iLCJvRXJyb3IiLCJhdHRhY2hFdmVudCIsIlByb21pc2UiLCJhbGwiLCJpbmZvIiwicmVzb2x2ZSIsImlzUGFnZVJlYWR5Iiwic0V2ZW50SWQiLCJvRGF0YSIsImZuRnVuY3Rpb24iLCJvTGlzdGVuZXIiLCJvQ29udGFpbmVyIiwib25CZWZvcmVTaG93IiwiYlNob3duIiwib25CZWZvcmVIaWRlIiwib25BZnRlclNob3ciLCJfY2hlY2tQYWdlUmVhZHkiLCJhZGRFdmVudERlbGVnYXRlIiwicGFnZVJlYWR5VGltZXIiLCJjbGVhclRpbWVvdXQiLCJiRnJvbU5hdiIsImZuVUlVcGRhdGVkIiwic2FwIiwidWkiLCJnZXRDb3JlIiwiZ2V0VUlEaXJ0eSIsIl9iV2FpdGluZ0ZvclJlZnJlc2giLCJjaGVja1VJVXBkYXRlZCIsIkNvbnRyb2xsZXJFeHRlbnNpb24iLCJQdWJsaWMiLCJGaW5hbCIsIlByaXZhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BVU1BLDRCLFdBRExD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QTlCLElBQWdFLEtBQUt4RyxRQUFMLEtBQWtCLENBQXRGLEVBQXlGO0FBQy9GLG1CQUFLeUcsbUJBQUwsR0FBMkIsSUFBM0I7QUFDQUosY0FBQUEsR0FBRyxDQUFDQyxFQUFKLENBQU9DLE9BQVAsR0FBaUJ2QixXQUFqQixDQUE2QixXQUE3QixFQUEwQ29CLFdBQTFDO0FBQ0EvRSxjQUFBQSxVQUFVLENBQUNxRixjQUFELEVBQWlCLEdBQWpCLENBQVY7QUFDQSxhQUpNLE1BSUEsSUFBSSxDQUFDLEtBQUtELG1CQUFWLEVBQStCO0FBQ3JDO0FBQ0E7QUFDQSxtQkFBS2xGLGFBQUwsR0FBcUIsSUFBckI7O0FBQ0EsbUJBQUt0QixlQUFMLENBQXFCb0MsU0FBckIsQ0FBK0IsV0FBL0I7QUFDQTtBQUNEO0FBQ0Q7Ozs7SUFoVnlDc0UsbUIsaVdBd0N6Q0MsTSxFQUNBQyxLLHlvQkE0S0FELE0sRUFDQUMsSyx5SkFLQUQsTSxFQUNBQyxLLDZKQWtCQUQsTSxFQUNBQyxLLDJKQUtBRCxNLEVBQ0FDLEssdUpBS0FELE0sRUFDQUMsSyw2SkF3QkFDLE87U0FnRWFySCw0QiIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udHJvbGxlckV4dGVuc2lvbiwgT3ZlcnJpZGVFeGVjdXRpb24gfSBmcm9tIFwic2FwL3VpL2NvcmUvbXZjXCI7XG5pbXBvcnQgeyBDb250cm9sbGVyRXh0ZW5zaW9uTWV0YWRhdGEgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udHJvbGxlcmV4dGVuc2lvbnNcIjtcbmltcG9ydCB7IENvbXBvbmVudCB9IGZyb20gXCJzYXAvdWkvY29yZVwiO1xuaW1wb3J0IHsgQXBwQ29tcG9uZW50LCBDb21tb25VdGlscyB9IGZyb20gXCJzYXAvZmUvY29yZVwiO1xuaW1wb3J0IHsgTWFuYWdlZE9iamVjdCwgRXZlbnRQcm92aWRlciB9IGZyb20gXCJzYXAvdWkvYmFzZVwiO1xuaW1wb3J0IHsgTG9nIH0gZnJvbSBcInNhcC9iYXNlXCI7XG5pbXBvcnQgeyBDb250ZXh0IH0gZnJvbSBcInNhcC91aS9tb2RlbFwiO1xuaW1wb3J0IHsgVUk1Q2xhc3MsIE92ZXJyaWRlLCBQdWJsaWMsIEZpbmFsLCBFeHRlbnNpYmxlLCBQcml2YXRlIH0gZnJvbSBcIi4uL2hlbHBlcnMvQ2xhc3NTdXBwb3J0XCI7XG5cbkBVSTVDbGFzcyhcInNhcC5mZS5jb3JlLmNvbnRyb2xsZXJleHRlbnNpb25zLlBhZ2VSZWFkeVwiLCBDb250cm9sbGVyRXh0ZW5zaW9uTWV0YWRhdGEpXG5jbGFzcyBQYWdlUmVhZHlDb250cm9sbGVyRXh0ZW5zaW9uIGV4dGVuZHMgQ29udHJvbGxlckV4dGVuc2lvbiB7XG5cdHByaXZhdGUgX29FdmVudFByb3ZpZGVyITogRXZlbnRQcm92aWRlcjtcblx0cHJpdmF0ZSBfb1ZpZXc6IGFueTtcblx0cHJpdmF0ZSBfb0FwcENvbXBvbmVudCE6IEFwcENvbXBvbmVudDtcblx0cHJpdmF0ZSBfb1BhZ2VDb21wb25lbnQhOiBhbnk7XG5cdHByaXZhdGUgX29Db250YWluZXIhOiBhbnk7XG5cdHByaXZhdGUgX2JBZnRlckJpbmRpbmdBbHJlYWR5QXBwbGllZCE6IGJvb2xlYW47XG5cdHByaXZhdGUgX2ZuQ29udGFpbmVyRGVsZWdhdGU6IGFueTtcblx0cHJpdmF0ZSBfbmJXYWl0cyE6IG51bWJlcjtcblx0cHJpdmF0ZSBfYklzUGFnZVJlYWR5ITogYm9vbGVhbjtcblx0cHJpdmF0ZSBfYldhaXRpbmdGb3JSZWZyZXNoITogYm9vbGVhbjtcblx0cHJpdmF0ZSBiU2hvd24hOiBib29sZWFuO1xuXHRwcml2YXRlIGJIYXNDb250ZXh0ITogYm9vbGVhbjtcblx0cHJpdmF0ZSBiRGF0YVJlY2VpdmVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXHRwcml2YXRlIGJUYWJsZXNMb2FkZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cdHByaXZhdGUgcGFnZVJlYWR5VGltZXI6IE5vZGVKUy5UaW1lb3V0IHwgdW5kZWZpbmVkO1xuXG5cdEBPdmVycmlkZSgpXG5cdHB1YmxpYyBvbkluaXQoKSB7XG5cdFx0dGhpcy5fbmJXYWl0cyA9IDA7XG5cdFx0dGhpcy5fb0V2ZW50UHJvdmlkZXIgPSBuZXcgRXZlbnRQcm92aWRlcigpO1xuXHRcdHRoaXMuX29WaWV3ID0gKHRoaXMgYXMgYW55KS5iYXNlLmdldFZpZXcoKTtcblx0XHR0aGlzLl9vQXBwQ29tcG9uZW50ID0gQ29tbW9uVXRpbHMuZ2V0QXBwQ29tcG9uZW50KHRoaXMuX29WaWV3KTtcblx0XHR0aGlzLl9vUGFnZUNvbXBvbmVudCA9IENvbXBvbmVudC5nZXRPd25lckNvbXBvbmVudEZvcih0aGlzLl9vVmlldyk7XG5cblx0XHRpZiAodGhpcy5fb1BhZ2VDb21wb25lbnQgJiYgdGhpcy5fb1BhZ2VDb21wb25lbnQuYXR0YWNoQ29udGFpbmVyRGVmaW5lZCkge1xuXHRcdFx0dGhpcy5fb1BhZ2VDb21wb25lbnQuYXR0YWNoQ29udGFpbmVyRGVmaW5lZCgob0V2ZW50OiBVSTVFdmVudCkgPT4gdGhpcy5yZWdpc3RlckNvbnRhaW5lcihvRXZlbnQuZ2V0UGFyYW1ldGVyKFwiY29udGFpbmVyXCIpKSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRoaXMucmVnaXN0ZXJDb250YWluZXIodGhpcy5fb1ZpZXcpO1xuXHRcdH1cblx0fVxuXG5cdEBPdmVycmlkZSgpXG5cdHB1YmxpYyBvbkV4aXQoKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuXHRcdC8vIEB0cy1pZ25vcmVcblx0XHRkZWxldGUgdGhpcy5fb0FwcENvbXBvbmVudDtcblx0XHR0aGlzLl9vQ29udGFpbmVyICYmIHRoaXMuX29Db250YWluZXIucmVtb3ZlRXZlbnREZWxlZ2F0ZSh0aGlzLl9mbkNvbnRhaW5lckRlbGVnYXRlKTtcblx0fVxuXG5cdEBQdWJsaWNcblx0QEZpbmFsXG5cdHB1YmxpYyB3YWl0Rm9yKG9Qcm9taXNlOiBhbnkpIHtcblx0XHR0aGlzLl9uYldhaXRzKys7XG5cdFx0b1Byb21pc2Vcblx0XHRcdC5maW5hbGx5KCgpID0+IHtcblx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0dGhpcy5fbmJXYWl0cy0tO1xuXHRcdFx0XHR9LCAwKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2gobnVsbCk7XG5cdH1cblx0QE92ZXJyaWRlKFwiX3JvdXRpbmdcIilcblx0b25Sb3V0ZU1hdGNoZWQoKSB7XG5cdFx0dGhpcy5fYklzUGFnZVJlYWR5ID0gZmFsc2U7XG5cdH1cblx0QE92ZXJyaWRlKFwiX3JvdXRpbmdcIilcblx0b25Sb3V0ZU1hdGNoZWRGaW5pc2hlZCgpIHtcblx0XHR0aGlzLmNoZWNrUGFnZVJlYWR5RGVib3VuY2VkKCk7XG5cdH1cblxuXHRAT3ZlcnJpZGUoXCJfcm91dGluZ1wiKVxuXHRvbkFmdGVyQmluZGluZyhvQmluZGluZ0NvbnRleHQ6IENvbnRleHQpIHtcblx0XHRpZiAoIXRoaXMuX2JBZnRlckJpbmRpbmdBbHJlYWR5QXBwbGllZCkge1xuXHRcdFx0dGhpcy5fYkFmdGVyQmluZGluZ0FscmVhZHlBcHBsaWVkID0gdHJ1ZTtcblx0XHRcdGxldCBhQm91bmRFbGVtZW50czogYW55W10gPSBbXTtcblx0XHRcdGNvbnN0IGFOb3RCb3VuZE1EQ1RhYmxlczogYW55W10gPSBbXTtcblx0XHRcdGxldCBpUmVxdWVzdGVkID0gMDtcblx0XHRcdGxldCBpUmVjZWl2ZWQgPSAwO1xuXHRcdFx0Y29uc3QgZm5SZXF1ZXN0ZWQgPSAob0V2ZW50OiBVSTVFdmVudCkgPT4ge1xuXHRcdFx0XHRvRXZlbnQuZ2V0U291cmNlKCkuZGV0YWNoRGF0YVJlcXVlc3RlZChmblJlcXVlc3RlZCk7XG5cdFx0XHRcdGlSZXF1ZXN0ZWQrKztcblx0XHRcdFx0dGhpcy5iRGF0YVJlY2VpdmVkID0gZmFsc2U7XG5cdFx0XHR9O1xuXHRcdFx0Y29uc3QgZm5SZWNlaXZlZCA9IChvRXZlbnQ6IFVJNUV2ZW50KSA9PiB7XG5cdFx0XHRcdHN3aXRjaCAob0V2ZW50LmdldFNvdXJjZSgpLnNHcm91cElkKSB7XG5cdFx0XHRcdFx0Y2FzZSBcIiRhdXRvLldvcmtlcnNcIjpcblx0XHRcdFx0XHRcdHRoaXMuX29FdmVudFByb3ZpZGVyLmZpcmVFdmVudChcIndvcmtlcnNCYXRjaFJlY2VpdmVkXCIpO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSBcIiRhdXRvLkhlcm9lc1wiOlxuXHRcdFx0XHRcdFx0dGhpcy5fb0V2ZW50UHJvdmlkZXIuZmlyZUV2ZW50KFwiaGVyb2VzQmF0Y2hSZWNlaXZlZFwiKTtcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdH1cblx0XHRcdFx0b0V2ZW50LmdldFNvdXJjZSgpLmRldGFjaERhdGFSZWNlaXZlZChmblJlY2VpdmVkKTtcblx0XHRcdFx0aVJlY2VpdmVkKys7XG5cdFx0XHRcdGlmIChpUmVjZWl2ZWQgPT09IGlSZXF1ZXN0ZWQgJiYgaVJlcXVlc3RlZCAhPT0gMCkge1xuXHRcdFx0XHRcdGlSZXF1ZXN0ZWQgPSAwO1xuXHRcdFx0XHRcdGlSZWNlaXZlZCA9IDA7XG5cdFx0XHRcdFx0dGhpcy5iRGF0YVJlY2VpdmVkID0gdHJ1ZTtcblx0XHRcdFx0XHR0aGlzLmNoZWNrUGFnZVJlYWR5RGVib3VuY2VkKCk7XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cdFx0XHRjb25zdCBmblNlYXJjaCA9IChvRXZlbnQ6IFVJNUV2ZW50KSA9PiB7XG5cdFx0XHRcdGNvbnN0IGFNRENUYWJsZXMgPSBhTm90Qm91bmRNRENUYWJsZXMuZmlsdGVyKG9FbGVtID0+IHtcblx0XHRcdFx0XHRpZiAob0V2ZW50LmdldFNvdXJjZSgpLnNJZCA9PT0gb0VsZW0uZ2V0RmlsdGVyKCkpIHtcblx0XHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdFx0XHRhTURDVGFibGVzLmZvckVhY2goKG9NRENUYWJsZTogYW55KSA9PiB7XG5cdFx0XHRcdFx0bGV0IG9Sb3dCaW5kaW5nID0gb01EQ1RhYmxlLmdldFJvd0JpbmRpbmcoKTtcblx0XHRcdFx0XHRjb25zdCBmbkF0dGFjaERhdGFFdmVudHMgPSAoKSA9PiB7XG5cdFx0XHRcdFx0XHRvUm93QmluZGluZy5hdHRhY2hEYXRhUmVxdWVzdGVkKGZuUmVxdWVzdGVkKTtcblx0XHRcdFx0XHRcdG9Sb3dCaW5kaW5nLmF0dGFjaERhdGFSZWNlaXZlZChmblJlY2VpdmVkKTtcblx0XHRcdFx0XHRcdGFCb3VuZEVsZW1lbnRzLnB1c2gob1Jvd0JpbmRpbmcpO1xuXHRcdFx0XHRcdH07XG5cdFx0XHRcdFx0aWYgKG9Sb3dCaW5kaW5nKSB7XG5cdFx0XHRcdFx0XHRmbkF0dGFjaERhdGFFdmVudHMoKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0c2V0VGltZW91dCgoKSA9PiB7XG5cdFx0XHRcdFx0XHRcdG9Sb3dCaW5kaW5nID0gb01EQ1RhYmxlLmdldFJvd0JpbmRpbmcoKTtcblx0XHRcdFx0XHRcdFx0aWYgKG9Sb3dCaW5kaW5nKSB7XG5cdFx0XHRcdFx0XHRcdFx0Zm5BdHRhY2hEYXRhRXZlbnRzKCk7XG5cdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0TG9nLmVycm9yKFwiQ2Fubm90IGF0dGFjaCBldmVudHMgdG8gdW5ib3VuZCB0YWJsZVwiKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSwgMCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblx0XHRcdH07XG5cdFx0XHRpZiAodGhpcy5pc0NvbnRleHRFeHBlY3RlZCgpICYmIG9CaW5kaW5nQ29udGV4dCA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdC8vIEZvcmNlIHRvIG1lbnRpb24gd2UgYXJlIGV4cGVjdGluZyBkYXRhXG5cdFx0XHRcdHRoaXMuYkhhc0NvbnRleHQgPSBmYWxzZTtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhpcy5iSGFzQ29udGV4dCA9IHRydWU7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuYXR0YWNoRXZlbnRPbmNlKFxuXHRcdFx0XHRcInBhZ2VSZWFkeVwiLFxuXHRcdFx0XHRudWxsLFxuXHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0YUJvdW5kRWxlbWVudHMuZm9yRWFjaCgob0VsZW1lbnQ6IGFueSkgPT4ge1xuXHRcdFx0XHRcdFx0b0VsZW1lbnQuZGV0YWNoRXZlbnQoXCJkYXRhUmVxdWVzdGVkXCIsIGZuUmVxdWVzdGVkKTtcblx0XHRcdFx0XHRcdG9FbGVtZW50LmRldGFjaEV2ZW50KFwiZGF0YVJlY2VpdmVkXCIsIGZuUmVjZWl2ZWQpO1xuXHRcdFx0XHRcdFx0b0VsZW1lbnQuZGV0YWNoRXZlbnQoXCJzZWFyY2hcIiwgZm5TZWFyY2gpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHRoaXMuX2JBZnRlckJpbmRpbmdBbHJlYWR5QXBwbGllZCA9IGZhbHNlO1xuXHRcdFx0XHRcdGFCb3VuZEVsZW1lbnRzID0gW107XG5cdFx0XHRcdH0sXG5cdFx0XHRcdG51bGxcblx0XHRcdCk7XG5cdFx0XHRpZiAob0JpbmRpbmdDb250ZXh0KSB7XG5cdFx0XHRcdGNvbnN0IG1haW5PYmplY3RCaW5kaW5nID0gKG9CaW5kaW5nQ29udGV4dCBhcyBhbnkpLmdldEJpbmRpbmcoKTtcblx0XHRcdFx0bWFpbk9iamVjdEJpbmRpbmcuYXR0YWNoRGF0YVJlcXVlc3RlZChmblJlcXVlc3RlZCk7XG5cdFx0XHRcdG1haW5PYmplY3RCaW5kaW5nLmF0dGFjaERhdGFSZWNlaXZlZChmblJlY2VpdmVkKTtcblx0XHRcdFx0YUJvdW5kRWxlbWVudHMucHVzaChtYWluT2JqZWN0QmluZGluZyk7XG5cdFx0XHR9XG5cblx0XHRcdGNvbnN0IGFUYWJsZUluaXRpYWxpemVkUHJvbWlzZXM6IFByb21pc2U8YW55PltdID0gW107XG5cdFx0XHR0aGlzLl9vVmlldy5maW5kQWdncmVnYXRlZE9iamVjdHModHJ1ZSwgKG9FbGVtZW50OiBhbnkpID0+IHtcblx0XHRcdFx0Y29uc3Qgb09iamVjdEJpbmRpbmcgPSBvRWxlbWVudC5nZXRPYmplY3RCaW5kaW5nKCk7XG5cdFx0XHRcdGlmIChvT2JqZWN0QmluZGluZykge1xuXHRcdFx0XHRcdC8vIFJlZ2lzdGVyIG9uIGFsbCBvYmplY3QgYmluZGluZyAobW9zdGx5IHVzZWQgb24gb2JqZWN0IHBhZ2VzKVxuXHRcdFx0XHRcdG9PYmplY3RCaW5kaW5nLmF0dGFjaERhdGFSZXF1ZXN0ZWQoZm5SZXF1ZXN0ZWQpO1xuXHRcdFx0XHRcdG9PYmplY3RCaW5kaW5nLmF0dGFjaERhdGFSZWNlaXZlZChmblJlY2VpdmVkKTtcblx0XHRcdFx0XHRhQm91bmRFbGVtZW50cy5wdXNoKG9PYmplY3RCaW5kaW5nKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRjb25zdCBhQmluZGluZ0tleXMgPSBPYmplY3Qua2V5cyhvRWxlbWVudC5tQmluZGluZ0luZm9zKTtcblx0XHRcdFx0XHRpZiAoYUJpbmRpbmdLZXlzLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0XHRcdGFCaW5kaW5nS2V5cy5mb3JFYWNoKHNQcm9wZXJ0eU5hbWUgPT4ge1xuXHRcdFx0XHRcdFx0XHRjb25zdCBvTGlzdEJpbmRpbmcgPSBvRWxlbWVudC5tQmluZGluZ0luZm9zW3NQcm9wZXJ0eU5hbWVdLmJpbmRpbmc7XG5cdFx0XHRcdFx0XHRcdC8vIFJlZ2lzdGVyIG9uIGFsbCBsaXN0IGJpbmRpbmcsIGdvb2QgZm9yIGJhc2ljIHRhYmxlcywgcHJvYmxlbWF0aWMgZm9yIE1EQywgc2VlIGFib3ZlXG5cdFx0XHRcdFx0XHRcdGlmIChvTGlzdEJpbmRpbmcgJiYgb0xpc3RCaW5kaW5nLmlzQShcInNhcC51aS5tb2RlbC5vZGF0YS52NC5PRGF0YUxpc3RCaW5kaW5nXCIpKSB7XG5cdFx0XHRcdFx0XHRcdFx0b0xpc3RCaW5kaW5nLmF0dGFjaERhdGFSZXF1ZXN0ZWQoZm5SZXF1ZXN0ZWQpO1xuXHRcdFx0XHRcdFx0XHRcdG9MaXN0QmluZGluZy5hdHRhY2hEYXRhUmVjZWl2ZWQoZm5SZWNlaXZlZCk7XG5cdFx0XHRcdFx0XHRcdFx0YUJvdW5kRWxlbWVudHMucHVzaChvTGlzdEJpbmRpbmcpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdFx0Ly8gVGhpcyBpcyBkaXJ0eSBidXQgTURDIFRhYmxlIGhhcyBhIHdlaXJkIGxvYWRpbmcgbGlmZWN5Y2xlXG5cdFx0XHRcdGlmIChvRWxlbWVudC5pc0EoXCJzYXAudWkubWRjLlRhYmxlXCIpKSB7XG5cdFx0XHRcdFx0dGhpcy5iVGFibGVzTG9hZGVkID0gZmFsc2U7XG5cdFx0XHRcdFx0Ly8gYWNjZXNzIGJpbmRpbmcgb25seSBhZnRlciB0YWJsZSBpcyBib3VuZFxuXHRcdFx0XHRcdGFUYWJsZUluaXRpYWxpemVkUHJvbWlzZXMucHVzaChcblx0XHRcdFx0XHRcdG9FbGVtZW50XG5cdFx0XHRcdFx0XHRcdC5pbml0aWFsaXplZCgpXG5cdFx0XHRcdFx0XHRcdC50aGVuKCgpID0+IHtcblx0XHRcdFx0XHRcdFx0XHRjb25zdCBvUm93QmluZGluZyA9IG9FbGVtZW50LmdldFJvd0JpbmRpbmcoKTtcblx0XHRcdFx0XHRcdFx0XHRpZiAob1Jvd0JpbmRpbmcpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG9Sb3dCaW5kaW5nLmF0dGFjaERhdGFSZXF1ZXN0ZWQoZm5SZXF1ZXN0ZWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0b1Jvd0JpbmRpbmcuYXR0YWNoRGF0YVJlY2VpdmVkKGZuUmVjZWl2ZWQpO1xuXHRcdFx0XHRcdFx0XHRcdFx0YUJvdW5kRWxlbWVudHMucHVzaChvUm93QmluZGluZyk7XG5cdFx0XHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0XHRcdGFOb3RCb3VuZE1EQ1RhYmxlcy5wdXNoKG9FbGVtZW50KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0XHRcdC5jYXRjaChmdW5jdGlvbihvRXJyb3I6IEVycm9yKSB7XG5cdFx0XHRcdFx0XHRcdFx0TG9nLmVycm9yKFwiQ2Fubm90IGZpbmQgYSBib3VuZCB0YWJsZVwiLCBvRXJyb3IgYXMgYW55KTtcblx0XHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9IGVsc2UgaWYgKG9FbGVtZW50LmlzQShcInNhcC5mZS5jb3JlLmNvbnRyb2xzLkZpbHRlckJhclwiKSkge1xuXHRcdFx0XHRcdG9FbGVtZW50LmF0dGFjaEV2ZW50KFwic2VhcmNoXCIsIGZuU2VhcmNoKTtcblx0XHRcdFx0XHRhQm91bmRFbGVtZW50cy5wdXNoKG9FbGVtZW50KTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0XHRpZiAoYVRhYmxlSW5pdGlhbGl6ZWRQcm9taXNlcy5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdFByb21pc2UuYWxsKGFUYWJsZUluaXRpYWxpemVkUHJvbWlzZXMpXG5cdFx0XHRcdFx0LnRoZW4oKCkgPT4ge1xuXHRcdFx0XHRcdFx0dGhpcy5iVGFibGVzTG9hZGVkID0gdHJ1ZTtcblx0XHRcdFx0XHRcdHRoaXMuY2hlY2tQYWdlUmVhZHlEZWJvdW5jZWQoKTtcblx0XHRcdFx0XHR9KVxuXHRcdFx0XHRcdC5jYXRjaChvRXJyb3IgPT4ge1xuXHRcdFx0XHRcdFx0TG9nLmluZm8oXCJUaGVyZSB3YXMgYW4gZXJyb3Igd2l0aCBvbmUgb3IgbXVsdGlwbGUgdGFibGVcIiwgb0Vycm9yKTtcblx0XHRcdFx0XHRcdHRoaXMuYlRhYmxlc0xvYWRlZCA9IHRydWU7XG5cdFx0XHRcdFx0XHR0aGlzLmNoZWNrUGFnZVJlYWR5RGVib3VuY2VkKCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0QFB1YmxpY1xuXHRARmluYWxcblx0cHVibGljIGlzUGFnZVJlYWR5KCkge1xuXHRcdHJldHVybiB0aGlzLl9iSXNQYWdlUmVhZHk7XG5cdH1cblxuXHRAUHVibGljXG5cdEBGaW5hbFxuXHRwdWJsaWMgd2FpdFBhZ2VSZWFkeSgpOiBQcm9taXNlPHZvaWQ+IHtcblx0XHRyZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG5cdFx0XHRpZiAodGhpcy5pc1BhZ2VSZWFkeSgpKSB7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHRoaXMuYXR0YWNoRXZlbnRPbmNlKFxuXHRcdFx0XHRcdFwicGFnZVJlYWR5XCIsXG5cdFx0XHRcdFx0bnVsbCxcblx0XHRcdFx0XHQoKSA9PiB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHRcdFx0fSxcblx0XHRcdFx0XHR0aGlzXG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cblxuXHRAUHVibGljXG5cdEBGaW5hbFxuXHRwdWJsaWMgYXR0YWNoRXZlbnRPbmNlKHNFdmVudElkOiBzdHJpbmcsIG9EYXRhOiBhbnksIGZuRnVuY3Rpb246IEZ1bmN0aW9uLCBvTGlzdGVuZXI6IGFueSkge1xuXHRcdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBwcmVmZXItcmVzdC1wYXJhbXNcblx0XHRyZXR1cm4gdGhpcy5fb0V2ZW50UHJvdmlkZXIuYXR0YWNoRXZlbnRPbmNlKHNFdmVudElkLCBvRGF0YSwgZm5GdW5jdGlvbiwgb0xpc3RlbmVyKTtcblx0fVxuXHRAUHVibGljXG5cdEBGaW5hbFxuXHRwdWJsaWMgYXR0YWNoRXZlbnQoc0V2ZW50SWQ6IHN0cmluZywgb0RhdGE6IGFueSwgZm5GdW5jdGlvbjogRnVuY3Rpb24sIG9MaXN0ZW5lcjogYW55KSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuXHRcdHJldHVybiB0aGlzLl9vRXZlbnRQcm92aWRlci5hdHRhY2hFdmVudChzRXZlbnRJZCwgb0RhdGEsIGZuRnVuY3Rpb24sIG9MaXN0ZW5lcik7XG5cdH1cblx0QFB1YmxpY1xuXHRARmluYWxcblx0cHVibGljIGRldGFjaEV2ZW50KHNFdmVudElkOiBzdHJpbmcsIGZuRnVuY3Rpb246IEZ1bmN0aW9uKSB7XG5cdFx0Ly8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHByZWZlci1yZXN0LXBhcmFtc1xuXHRcdHJldHVybiB0aGlzLl9vRXZlbnRQcm92aWRlci5kZXRhY2hFdmVudChzRXZlbnRJZCwgZm5GdW5jdGlvbik7XG5cdH1cblx0cHJpdmF0ZSByZWdpc3RlckNvbnRhaW5lcihvQ29udGFpbmVyOiBNYW5hZ2VkT2JqZWN0KSB7XG5cdFx0dGhpcy5fb0NvbnRhaW5lciA9IG9Db250YWluZXI7XG5cdFx0dGhpcy5fZm5Db250YWluZXJEZWxlZ2F0ZSA9IHtcblx0XHRcdG9uQmVmb3JlU2hvdzogKCkgPT4ge1xuXHRcdFx0XHR0aGlzLmJTaG93biA9IGZhbHNlO1xuXHRcdFx0XHR0aGlzLl9iSXNQYWdlUmVhZHkgPSBmYWxzZTtcblx0XHRcdH0sXG5cdFx0XHRvbkJlZm9yZUhpZGU6ICgpID0+IHtcblx0XHRcdFx0dGhpcy5iU2hvd24gPSBmYWxzZTtcblx0XHRcdFx0dGhpcy5fYklzUGFnZVJlYWR5ID0gZmFsc2U7XG5cdFx0XHR9LFxuXHRcdFx0b25BZnRlclNob3c6ICgpID0+IHtcblx0XHRcdFx0dGhpcy5iU2hvd24gPSB0cnVlO1xuXHRcdFx0XHR0aGlzLl9jaGVja1BhZ2VSZWFkeSh0cnVlKTtcblx0XHRcdH1cblx0XHR9O1xuXHRcdHRoaXMuX29Db250YWluZXIuYWRkRXZlbnREZWxlZ2F0ZSh0aGlzLl9mbkNvbnRhaW5lckRlbGVnYXRlKTtcblx0fVxuXG5cdEBQcml2YXRlXG5cdEBFeHRlbnNpYmxlKE92ZXJyaWRlRXhlY3V0aW9uLkluc3RlYWQpXG5cdHB1YmxpYyBpc0NvbnRleHRFeHBlY3RlZCgpIHtcblx0XHRyZXR1cm4gZmFsc2U7XG5cdH1cblxuXHRwdWJsaWMgY2hlY2tQYWdlUmVhZHlEZWJvdW5jZWQoKSB7XG5cdFx0aWYgKHRoaXMucGFnZVJlYWR5VGltZXIpIHtcblx0XHRcdGNsZWFyVGltZW91dCh0aGlzLnBhZ2VSZWFkeVRpbWVyKTtcblx0XHR9XG5cdFx0dGhpcy5wYWdlUmVhZHlUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuXHRcdFx0dGhpcy5fY2hlY2tQYWdlUmVhZHkoKTtcblx0XHR9LCAyMDApO1xuXHR9XG5cblx0cHVibGljIF9jaGVja1BhZ2VSZWFkeShiRnJvbU5hdjogYm9vbGVhbiA9IGZhbHNlKSB7XG5cdFx0Y29uc3QgZm5VSVVwZGF0ZWQgPSAoKSA9PiB7XG5cdFx0XHQvLyBXYWl0IHVudGlsIHRoZSBVSSBpcyBubyBsb25nZXIgZGlydHlcblx0XHRcdGlmICghc2FwLnVpLmdldENvcmUoKS5nZXRVSURpcnR5KCkpIHtcblx0XHRcdFx0c2FwLnVpLmdldENvcmUoKS5kZXRhY2hFdmVudChcIlVJVXBkYXRlZFwiLCBmblVJVXBkYXRlZCk7XG5cdFx0XHRcdHRoaXMuX2JXYWl0aW5nRm9yUmVmcmVzaCA9IGZhbHNlO1xuXHRcdFx0XHRzZXRUaW1lb3V0KCgpID0+IHtcblx0XHRcdFx0XHR0aGlzLl9jaGVja1BhZ2VSZWFkeSgpO1xuXHRcdFx0XHR9LCAyMCk7XG5cdFx0XHR9XG5cdFx0fTtcblxuXHRcdC8vIEluIGNhc2UgVUlVcGRhdGUgZG9lcyBub3QgZ2V0IGNhbGxlZCwgY2hlY2sgaWYgVUkgaXMgbm90IGRpcnR5IGFuZCB0aGVuIGNhbGwgX2NoZWNrUGFnZVJlYWR5XG5cdFx0Y29uc3QgY2hlY2tVSVVwZGF0ZWQgPSAoKSA9PiB7XG5cdFx0XHRpZiAoc2FwLnVpLmdldENvcmUoKS5nZXRVSURpcnR5KCkpIHtcblx0XHRcdFx0c2V0VGltZW91dChjaGVja1VJVXBkYXRlZCwgNTAwKTtcblx0XHRcdH0gZWxzZSBpZiAodGhpcy5fYldhaXRpbmdGb3JSZWZyZXNoKSB7XG5cdFx0XHRcdHRoaXMuX2JXYWl0aW5nRm9yUmVmcmVzaCA9IGZhbHNlO1xuXHRcdFx0XHRzYXAudWkuZ2V0Q29yZSgpLmRldGFjaEV2ZW50KFwiVUlVcGRhdGVkXCIsIGZuVUlVcGRhdGVkKTtcblx0XHRcdFx0dGhpcy5fY2hlY2tQYWdlUmVhZHkoKTtcblx0XHRcdH1cblx0XHR9O1xuXG5cdFx0aWYgKFxuXHRcdFx0dGhpcy5iU2hvd24gJiZcblx0XHRcdHRoaXMuYkRhdGFSZWNlaXZlZCAhPT0gZmFsc2UgJiZcblx0XHRcdHRoaXMuYlRhYmxlc0xvYWRlZCAhPT0gZmFsc2UgJiZcblx0XHRcdCghdGhpcy5pc0NvbnRleHRFeHBlY3RlZCgpIHx8IHRoaXMuYkhhc0NvbnRleHQpIC8vIEVpdGhlciBubyBjb250ZXh0IGlzIGV4cGVjdGVkIG9yIHRoZXJlIGlzIG9uZVxuXHRcdCkge1xuXHRcdFx0aWYgKHRoaXMuYkRhdGFSZWNlaXZlZCA9PT0gdHJ1ZSAmJiAhYkZyb21OYXYgJiYgIXRoaXMuX2JXYWl0aW5nRm9yUmVmcmVzaCAmJiBzYXAudWkuZ2V0Q29yZSgpLmdldFVJRGlydHkoKSkge1xuXHRcdFx0XHQvLyBJZiB3ZSByZXF1ZXN0ZWQgZGF0YSB3ZSBnZXQgbm90aWZpZWQgYXMgc29vbiBhcyB0aGUgZGF0YSBhcnJpdmVkLCBzbyBiZWZvcmUgdGhlIG5leHQgcmVuZGVyaW5nIHRpY2tcblx0XHRcdFx0dGhpcy5iRGF0YVJlY2VpdmVkID0gdW5kZWZpbmVkO1xuXHRcdFx0XHR0aGlzLl9iV2FpdGluZ0ZvclJlZnJlc2ggPSB0cnVlO1xuXHRcdFx0XHRzYXAudWkuZ2V0Q29yZSgpLmF0dGFjaEV2ZW50KFwiVUlVcGRhdGVkXCIsIGZuVUlVcGRhdGVkKTtcblx0XHRcdFx0c2V0VGltZW91dChjaGVja1VJVXBkYXRlZCwgNTAwKTtcblx0XHRcdH0gZWxzZSBpZiAoKCF0aGlzLl9iV2FpdGluZ0ZvclJlZnJlc2ggJiYgc2FwLnVpLmdldENvcmUoKS5nZXRVSURpcnR5KCkpIHx8IHRoaXMuX25iV2FpdHMgIT09IDApIHtcblx0XHRcdFx0dGhpcy5fYldhaXRpbmdGb3JSZWZyZXNoID0gdHJ1ZTtcblx0XHRcdFx0c2FwLnVpLmdldENvcmUoKS5hdHRhY2hFdmVudChcIlVJVXBkYXRlZFwiLCBmblVJVXBkYXRlZCk7XG5cdFx0XHRcdHNldFRpbWVvdXQoY2hlY2tVSVVwZGF0ZWQsIDUwMCk7XG5cdFx0XHR9IGVsc2UgaWYgKCF0aGlzLl9iV2FpdGluZ0ZvclJlZnJlc2gpIHtcblx0XHRcdFx0Ly8gSW4gdGhlIGNhc2Ugd2UncmUgbm90IHdhaXRpbmcgZm9yIGFueSBkYXRhIChuYXZpZ2F0aW5nIGJhY2sgdG8gYSBwYWdlIHdlIGFscmVhZHkgaGF2ZSBsb2FkZWQpXG5cdFx0XHRcdC8vIGp1c3Qgd2FpdCBmb3IgYSBmcmFtZSB0byBmaXJlIHRoZSBldmVudC5cblx0XHRcdFx0dGhpcy5fYklzUGFnZVJlYWR5ID0gdHJ1ZTtcblx0XHRcdFx0dGhpcy5fb0V2ZW50UHJvdmlkZXIuZmlyZUV2ZW50KFwicGFnZVJlYWR5XCIpO1xuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuXG5leHBvcnQgZGVmYXVsdCBQYWdlUmVhZHlDb250cm9sbGVyRXh0ZW5zaW9uO1xuIl19