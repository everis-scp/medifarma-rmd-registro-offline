/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/service/ServiceFactory", "sap/ui/core/service/Service"], function (ServiceFactory, Service) {
  "use strict";

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

  var AsyncComponentService = /*#__PURE__*/function (_Service) {
    _inherits(AsyncComponentService, _Service);

    var _super = _createSuper(AsyncComponentService);

    function AsyncComponentService() {
      _classCallCheck(this, AsyncComponentService);

      return _super.apply(this, arguments);
    }

    _createClass(AsyncComponentService, [{
      key: "init",
      // !: means that we know it will be assigned before usage
      value: function init() {
        var _this = this;

        this.initPromise = new Promise(function (resolve, reject) {
          _this.resolveFn = resolve;
          _this.rejectFn = reject;
        });
        var oContext = this.getContext();
        var oComponent = oContext.scopeObject;

        var oServices = oComponent._getManifestEntry("/sap.ui5/services", true);

        Promise.all(Object.keys(oServices).filter(function (sServiceKey) {
          return oServices[sServiceKey].startup === "waitFor" && oServices[sServiceKey].factoryName !== "sap.fe.core.services.AsyncComponentService";
        }).map(function (sServiceKey) {
          return oComponent.getService(sServiceKey).then(function (oServiceInstance) {
            var sMethodName = "get".concat(sServiceKey[0].toUpperCase()).concat(sServiceKey.substr(1));

            if (!oComponent.hasOwnProperty(sMethodName)) {
              oComponent[sMethodName] = function () {
                return oServiceInstance;
              };
            }
          });
        })).then(function () {
          return oComponent.pRootControlLoaded || Promise.resolve();
        }).then(function () {
          // notifiy the component
          if (oComponent.onServicesStarted) {
            oComponent.onServicesStarted();
          }

          _this.resolveFn(_this);
        }).catch(this.rejectFn);
      }
    }]);

    return AsyncComponentService;
  }(Service);

  var AsyncComponentServiceFactory = /*#__PURE__*/function (_ServiceFactory) {
    _inherits(AsyncComponentServiceFactory, _ServiceFactory);

    var _super2 = _createSuper(AsyncComponentServiceFactory);

    function AsyncComponentServiceFactory() {
      _classCallCheck(this, AsyncComponentServiceFactory);

      return _super2.apply(this, arguments);
    }

    _createClass(AsyncComponentServiceFactory, [{
      key: "createInstance",
      value: function createInstance(oServiceContext) {
        var asyncComponentService = new AsyncComponentService(oServiceContext);
        return asyncComponentService.initPromise;
      }
    }]);

    return AsyncComponentServiceFactory;
  }(ServiceFactory);

  return AsyncComponentServiceFactory;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFzeW5jQ29tcG9uZW50U2VydmljZUZhY3RvcnkudHMiXSwibmFtZXMiOlsiQXN5bmNDb21wb25lbnRTZXJ2aWNlIiwiaW5pdFByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc29sdmVGbiIsInJlamVjdEZuIiwib0NvbnRleHQiLCJnZXRDb250ZXh0Iiwib0NvbXBvbmVudCIsInNjb3BlT2JqZWN0Iiwib1NlcnZpY2VzIiwiX2dldE1hbmlmZXN0RW50cnkiLCJhbGwiLCJPYmplY3QiLCJrZXlzIiwiZmlsdGVyIiwic1NlcnZpY2VLZXkiLCJzdGFydHVwIiwiZmFjdG9yeU5hbWUiLCJtYXAiLCJnZXRTZXJ2aWNlIiwidGhlbiIsIm9TZXJ2aWNlSW5zdGFuY2UiLCJzTWV0aG9kTmFtZSIsInRvVXBwZXJDYXNlIiwic3Vic3RyIiwiaGFzT3duUHJvcGVydHkiLCJwUm9vdENvbnRyb2xMb2FkZWQiLCJvblNlcnZpY2VzU3RhcnRlZCIsImNhdGNoIiwiU2VydmljZSIsIkFzeW5jQ29tcG9uZW50U2VydmljZUZhY3RvcnkiLCJvU2VydmljZUNvbnRleHQiLCJhc3luY0NvbXBvbmVudFNlcnZpY2UiLCJTZXJ2aWNlRmFjdG9yeSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O01BSU1BLHFCOzs7Ozs7Ozs7Ozs7O0FBSUw7NkJBRU87QUFBQTs7QUFDTixhQUFLQyxXQUFMLEdBQW1CLElBQUlDLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVDLE1BQVYsRUFBcUI7QUFDbkQsVUFBQSxLQUFJLENBQUNDLFNBQUwsR0FBaUJGLE9BQWpCO0FBQ0EsVUFBQSxLQUFJLENBQUNHLFFBQUwsR0FBZ0JGLE1BQWhCO0FBQ0EsU0FIa0IsQ0FBbkI7QUFJQSxZQUFNRyxRQUFRLEdBQUcsS0FBS0MsVUFBTCxFQUFqQjtBQUNBLFlBQU1DLFVBQVUsR0FBR0YsUUFBUSxDQUFDRyxXQUE1Qjs7QUFDQSxZQUFNQyxTQUFTLEdBQUdGLFVBQVUsQ0FBQ0csaUJBQVgsQ0FBNkIsbUJBQTdCLEVBQWtELElBQWxELENBQWxCOztBQUNBVixRQUFBQSxPQUFPLENBQUNXLEdBQVIsQ0FDQ0MsTUFBTSxDQUFDQyxJQUFQLENBQVlKLFNBQVosRUFDRUssTUFERixDQUVFLFVBQUFDLFdBQVc7QUFBQSxpQkFDVk4sU0FBUyxDQUFDTSxXQUFELENBQVQsQ0FBdUJDLE9BQXZCLEtBQW1DLFNBQW5DLElBQ0FQLFNBQVMsQ0FBQ00sV0FBRCxDQUFULENBQXVCRSxXQUF2QixLQUF1Qyw0Q0FGN0I7QUFBQSxTQUZiLEVBTUVDLEdBTkYsQ0FNTSxVQUFBSCxXQUFXLEVBQUk7QUFDbkIsaUJBQU9SLFVBQVUsQ0FBQ1ksVUFBWCxDQUFzQkosV0FBdEIsRUFBbUNLLElBQW5DLENBQXdDLFVBQUNDLGdCQUFELEVBQW9DO0FBQ2xGLGdCQUFNQyxXQUFXLGdCQUFTUCxXQUFXLENBQUMsQ0FBRCxDQUFYLENBQWVRLFdBQWYsRUFBVCxTQUF3Q1IsV0FBVyxDQUFDUyxNQUFaLENBQW1CLENBQW5CLENBQXhDLENBQWpCOztBQUNBLGdCQUFJLENBQUNqQixVQUFVLENBQUNrQixjQUFYLENBQTBCSCxXQUExQixDQUFMLEVBQTZDO0FBQzVDZixjQUFBQSxVQUFVLENBQUNlLFdBQUQsQ0FBVixHQUEwQixZQUFXO0FBQ3BDLHVCQUFPRCxnQkFBUDtBQUNBLGVBRkQ7QUFHQTtBQUNELFdBUE0sQ0FBUDtBQVFBLFNBZkYsQ0FERCxFQWtCRUQsSUFsQkYsQ0FrQk8sWUFBTTtBQUNYLGlCQUFPYixVQUFVLENBQUNtQixrQkFBWCxJQUFpQzFCLE9BQU8sQ0FBQ0MsT0FBUixFQUF4QztBQUNBLFNBcEJGLEVBcUJFbUIsSUFyQkYsQ0FxQk8sWUFBTTtBQUNYO0FBQ0EsY0FBSWIsVUFBVSxDQUFDb0IsaUJBQWYsRUFBa0M7QUFDakNwQixZQUFBQSxVQUFVLENBQUNvQixpQkFBWDtBQUNBOztBQUNELFVBQUEsS0FBSSxDQUFDeEIsU0FBTCxDQUFlLEtBQWY7QUFDQSxTQTNCRixFQTRCRXlCLEtBNUJGLENBNEJRLEtBQUt4QixRQTVCYjtBQTZCQTs7OztJQTNDa0N5QixPOztNQThDOUJDLDRCOzs7Ozs7Ozs7Ozs7O3FDQUNVQyxlLEVBQXlEO0FBQ3ZFLFlBQU1DLHFCQUFxQixHQUFHLElBQUlsQyxxQkFBSixDQUEwQmlDLGVBQTFCLENBQTlCO0FBQ0EsZUFBT0MscUJBQXFCLENBQUNqQyxXQUE3QjtBQUNBOzs7O0lBSnlDa0MsYzs7U0FPNUJILDRCIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlRmFjdG9yeSwgU2VydmljZSwgU2VydmljZUNvbnRleHQgfSBmcm9tIFwic2FwL3VpL2NvcmUvc2VydmljZVwiO1xuXG50eXBlIEFzeW5jQ29tcG9uZW50U2V0dGluZ3MgPSB7fTtcblxuY2xhc3MgQXN5bmNDb21wb25lbnRTZXJ2aWNlIGV4dGVuZHMgU2VydmljZTxBc3luY0NvbXBvbmVudFNldHRpbmdzPiB7XG5cdHJlc29sdmVGbjogYW55O1xuXHRyZWplY3RGbjogYW55O1xuXHRpbml0UHJvbWlzZSE6IFByb21pc2U8YW55Pjtcblx0Ly8gITogbWVhbnMgdGhhdCB3ZSBrbm93IGl0IHdpbGwgYmUgYXNzaWduZWQgYmVmb3JlIHVzYWdlXG5cblx0aW5pdCgpIHtcblx0XHR0aGlzLmluaXRQcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdFx0dGhpcy5yZXNvbHZlRm4gPSByZXNvbHZlO1xuXHRcdFx0dGhpcy5yZWplY3RGbiA9IHJlamVjdDtcblx0XHR9KTtcblx0XHRjb25zdCBvQ29udGV4dCA9IHRoaXMuZ2V0Q29udGV4dCgpO1xuXHRcdGNvbnN0IG9Db21wb25lbnQgPSBvQ29udGV4dC5zY29wZU9iamVjdCBhcyBhbnk7XG5cdFx0Y29uc3Qgb1NlcnZpY2VzID0gb0NvbXBvbmVudC5fZ2V0TWFuaWZlc3RFbnRyeShcIi9zYXAudWk1L3NlcnZpY2VzXCIsIHRydWUpO1xuXHRcdFByb21pc2UuYWxsKFxuXHRcdFx0T2JqZWN0LmtleXMob1NlcnZpY2VzKVxuXHRcdFx0XHQuZmlsdGVyKFxuXHRcdFx0XHRcdHNTZXJ2aWNlS2V5ID0+XG5cdFx0XHRcdFx0XHRvU2VydmljZXNbc1NlcnZpY2VLZXldLnN0YXJ0dXAgPT09IFwid2FpdEZvclwiICYmXG5cdFx0XHRcdFx0XHRvU2VydmljZXNbc1NlcnZpY2VLZXldLmZhY3RvcnlOYW1lICE9PSBcInNhcC5mZS5jb3JlLnNlcnZpY2VzLkFzeW5jQ29tcG9uZW50U2VydmljZVwiXG5cdFx0XHRcdClcblx0XHRcdFx0Lm1hcChzU2VydmljZUtleSA9PiB7XG5cdFx0XHRcdFx0cmV0dXJuIG9Db21wb25lbnQuZ2V0U2VydmljZShzU2VydmljZUtleSkudGhlbigob1NlcnZpY2VJbnN0YW5jZTogU2VydmljZTxhbnk+KSA9PiB7XG5cdFx0XHRcdFx0XHRjb25zdCBzTWV0aG9kTmFtZSA9IGBnZXQke3NTZXJ2aWNlS2V5WzBdLnRvVXBwZXJDYXNlKCl9JHtzU2VydmljZUtleS5zdWJzdHIoMSl9YDtcblx0XHRcdFx0XHRcdGlmICghb0NvbXBvbmVudC5oYXNPd25Qcm9wZXJ0eShzTWV0aG9kTmFtZSkpIHtcblx0XHRcdFx0XHRcdFx0b0NvbXBvbmVudFtzTWV0aG9kTmFtZV0gPSBmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdFx0XHRyZXR1cm4gb1NlcnZpY2VJbnN0YW5jZTtcblx0XHRcdFx0XHRcdFx0fTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0fSlcblx0XHQpXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdHJldHVybiBvQ29tcG9uZW50LnBSb290Q29udHJvbExvYWRlZCB8fCBQcm9taXNlLnJlc29sdmUoKTtcblx0XHRcdH0pXG5cdFx0XHQudGhlbigoKSA9PiB7XG5cdFx0XHRcdC8vIG5vdGlmaXkgdGhlIGNvbXBvbmVudFxuXHRcdFx0XHRpZiAob0NvbXBvbmVudC5vblNlcnZpY2VzU3RhcnRlZCkge1xuXHRcdFx0XHRcdG9Db21wb25lbnQub25TZXJ2aWNlc1N0YXJ0ZWQoKTtcblx0XHRcdFx0fVxuXHRcdFx0XHR0aGlzLnJlc29sdmVGbih0aGlzKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2godGhpcy5yZWplY3RGbik7XG5cdH1cbn1cblxuY2xhc3MgQXN5bmNDb21wb25lbnRTZXJ2aWNlRmFjdG9yeSBleHRlbmRzIFNlcnZpY2VGYWN0b3J5PEFzeW5jQ29tcG9uZW50U2V0dGluZ3M+IHtcblx0Y3JlYXRlSW5zdGFuY2Uob1NlcnZpY2VDb250ZXh0OiBTZXJ2aWNlQ29udGV4dDxBc3luY0NvbXBvbmVudFNldHRpbmdzPikge1xuXHRcdGNvbnN0IGFzeW5jQ29tcG9uZW50U2VydmljZSA9IG5ldyBBc3luY0NvbXBvbmVudFNlcnZpY2Uob1NlcnZpY2VDb250ZXh0KTtcblx0XHRyZXR1cm4gYXN5bmNDb21wb25lbnRTZXJ2aWNlLmluaXRQcm9taXNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFzeW5jQ29tcG9uZW50U2VydmljZUZhY3Rvcnk7XG4iXX0=