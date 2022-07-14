/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/service/ServiceFactory", "sap/ui/core/service/Service", "../converters/MetaModelConverter", "sap/ui/VersionInfo"], function (ServiceFactory, Service, MetaModelConverter, VersionInfo) {
  "use strict";

  var DefaultEnvironmentCapabilities = MetaModelConverter.DefaultEnvironmentCapabilities;

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

  var EnvironmentCapabilitiesService = /*#__PURE__*/function (_Service) {
    _inherits(EnvironmentCapabilitiesService, _Service);

    var _super = _createSuper(EnvironmentCapabilitiesService);

    function EnvironmentCapabilitiesService() {
      _classCallCheck(this, EnvironmentCapabilitiesService);

      return _super.apply(this, arguments);
    }

    _createClass(EnvironmentCapabilitiesService, [{
      key: "init",
      // !: means that we know it will be assigned before usage
      value: function init() {
        var _this = this;

        this.initPromise = new Promise(function (resolve, reject) {
          _this.resolveFn = resolve;
          _this.rejectFn = reject;
        });
        var oContext = this.getContext();
        this.environmentCapabilities = Object.assign({}, DefaultEnvironmentCapabilities);
        VersionInfo.load(undefined).then(function (versionInfo) {
          _this.environmentCapabilities.Chart = !!versionInfo.libraries.find(function (lib) {
            return lib.name === "sap.viz";
          });
          _this.environmentCapabilities.MicroChart = !!versionInfo.libraries.find(function (lib) {
            return lib.name === "sap.suite.ui.microchart";
          });
          _this.environmentCapabilities.UShell = !!(sap && sap.ushell && sap.ushell.Container);
          _this.environmentCapabilities.IntentBasedNavigation = !!(sap && sap.ushell && sap.ushell.Container);
          _this.environmentCapabilities = Object.assign(_this.environmentCapabilities, oContext.settings);

          _this.resolveFn(_this);
        }).catch(this.rejectFn);
      }
    }, {
      key: "resolveLibrary",
      value: function resolveLibrary(libraryName) {
        return new Promise(function (resolve) {
          try {
            sap.ui.getCore().loadLibrary("".concat(libraryName.replace(/\./g, "/")), {
              async: true
            }).then(function () {
              resolve(true);
            }).catch(function () {
              resolve(false);
            });
          } catch (e) {
            resolve(false);
          }
        });
      }
    }, {
      key: "setCapabilities",
      value: function setCapabilities(oCapabilities) {
        this.environmentCapabilities = oCapabilities;
      }
    }, {
      key: "getCapabilities",
      value: function getCapabilities() {
        return this.environmentCapabilities;
      }
    }, {
      key: "getInterface",
      value: function getInterface() {
        return this;
      }
    }]);

    return EnvironmentCapabilitiesService;
  }(Service);

  var EnvironmentServiceFactory = /*#__PURE__*/function (_ServiceFactory) {
    _inherits(EnvironmentServiceFactory, _ServiceFactory);

    var _super2 = _createSuper(EnvironmentServiceFactory);

    function EnvironmentServiceFactory() {
      _classCallCheck(this, EnvironmentServiceFactory);

      return _super2.apply(this, arguments);
    }

    _createClass(EnvironmentServiceFactory, [{
      key: "createInstance",
      value: function createInstance(oServiceContext) {
        var environmentCapabilitiesService = new EnvironmentCapabilitiesService(oServiceContext);
        return environmentCapabilitiesService.initPromise;
      }
    }]);

    return EnvironmentServiceFactory;
  }(ServiceFactory);

  return EnvironmentServiceFactory;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkVudmlyb25tZW50U2VydmljZUZhY3RvcnkudHMiXSwibmFtZXMiOlsiRW52aXJvbm1lbnRDYXBhYmlsaXRpZXNTZXJ2aWNlIiwiaW5pdFByb21pc2UiLCJQcm9taXNlIiwicmVzb2x2ZSIsInJlamVjdCIsInJlc29sdmVGbiIsInJlamVjdEZuIiwib0NvbnRleHQiLCJnZXRDb250ZXh0IiwiZW52aXJvbm1lbnRDYXBhYmlsaXRpZXMiLCJPYmplY3QiLCJhc3NpZ24iLCJEZWZhdWx0RW52aXJvbm1lbnRDYXBhYmlsaXRpZXMiLCJWZXJzaW9uSW5mbyIsImxvYWQiLCJ1bmRlZmluZWQiLCJ0aGVuIiwidmVyc2lvbkluZm8iLCJDaGFydCIsImxpYnJhcmllcyIsImZpbmQiLCJsaWIiLCJuYW1lIiwiTWljcm9DaGFydCIsIlVTaGVsbCIsInNhcCIsInVzaGVsbCIsIkNvbnRhaW5lciIsIkludGVudEJhc2VkTmF2aWdhdGlvbiIsInNldHRpbmdzIiwiY2F0Y2giLCJsaWJyYXJ5TmFtZSIsInVpIiwiZ2V0Q29yZSIsImxvYWRMaWJyYXJ5IiwicmVwbGFjZSIsImFzeW5jIiwiZSIsIm9DYXBhYmlsaXRpZXMiLCJTZXJ2aWNlIiwiRW52aXJvbm1lbnRTZXJ2aWNlRmFjdG9yeSIsIm9TZXJ2aWNlQ29udGV4dCIsImVudmlyb25tZW50Q2FwYWJpbGl0aWVzU2VydmljZSIsIlNlcnZpY2VGYWN0b3J5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztNQUlNQSw4Qjs7Ozs7Ozs7Ozs7OztBQUtMOzZCQUVPO0FBQUE7O0FBQ04sYUFBS0MsV0FBTCxHQUFtQixJQUFJQyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVQyxNQUFWLEVBQXFCO0FBQ25ELFVBQUEsS0FBSSxDQUFDQyxTQUFMLEdBQWlCRixPQUFqQjtBQUNBLFVBQUEsS0FBSSxDQUFDRyxRQUFMLEdBQWdCRixNQUFoQjtBQUNBLFNBSGtCLENBQW5CO0FBSUEsWUFBTUcsUUFBUSxHQUFHLEtBQUtDLFVBQUwsRUFBakI7QUFDQSxhQUFLQyx1QkFBTCxHQUErQkMsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQkMsOEJBQWxCLENBQS9CO0FBQ0FDLFFBQUFBLFdBQVcsQ0FBQ0MsSUFBWixDQUFpQkMsU0FBakIsRUFDRUMsSUFERixDQUNPLFVBQUFDLFdBQVcsRUFBSTtBQUNwQixVQUFBLEtBQUksQ0FBQ1IsdUJBQUwsQ0FBNkJTLEtBQTdCLEdBQXFDLENBQUMsQ0FBQ0QsV0FBVyxDQUFDRSxTQUFaLENBQXNCQyxJQUF0QixDQUEyQixVQUFDQyxHQUFEO0FBQUEsbUJBQWNBLEdBQUcsQ0FBQ0MsSUFBSixLQUFhLFNBQTNCO0FBQUEsV0FBM0IsQ0FBdkM7QUFDQSxVQUFBLEtBQUksQ0FBQ2IsdUJBQUwsQ0FBNkJjLFVBQTdCLEdBQTBDLENBQUMsQ0FBQ04sV0FBVyxDQUFDRSxTQUFaLENBQXNCQyxJQUF0QixDQUMzQyxVQUFDQyxHQUFEO0FBQUEsbUJBQWNBLEdBQUcsQ0FBQ0MsSUFBSixLQUFhLHlCQUEzQjtBQUFBLFdBRDJDLENBQTVDO0FBR0EsVUFBQSxLQUFJLENBQUNiLHVCQUFMLENBQTZCZSxNQUE3QixHQUFzQyxDQUFDLEVBQUVDLEdBQUcsSUFBSUEsR0FBRyxDQUFDQyxNQUFYLElBQXFCRCxHQUFHLENBQUNDLE1BQUosQ0FBV0MsU0FBbEMsQ0FBdkM7QUFDQSxVQUFBLEtBQUksQ0FBQ2xCLHVCQUFMLENBQTZCbUIscUJBQTdCLEdBQXFELENBQUMsRUFBRUgsR0FBRyxJQUFJQSxHQUFHLENBQUNDLE1BQVgsSUFBcUJELEdBQUcsQ0FBQ0MsTUFBSixDQUFXQyxTQUFsQyxDQUF0RDtBQUNBLFVBQUEsS0FBSSxDQUFDbEIsdUJBQUwsR0FBK0JDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEtBQUksQ0FBQ0YsdUJBQW5CLEVBQTRDRixRQUFRLENBQUNzQixRQUFyRCxDQUEvQjs7QUFDQSxVQUFBLEtBQUksQ0FBQ3hCLFNBQUwsQ0FBZSxLQUFmO0FBQ0EsU0FWRixFQVdFeUIsS0FYRixDQVdRLEtBQUt4QixRQVhiO0FBWUE7OztxQ0FFY3lCLFcsRUFBdUM7QUFDckQsZUFBTyxJQUFJN0IsT0FBSixDQUFZLFVBQVNDLE9BQVQsRUFBa0I7QUFDcEMsY0FBSTtBQUNIc0IsWUFBQUEsR0FBRyxDQUFDTyxFQUFKLENBQ0VDLE9BREYsR0FFRUMsV0FGRixXQUVpQkgsV0FBVyxDQUFDSSxPQUFaLENBQW9CLEtBQXBCLEVBQTJCLEdBQTNCLENBRmpCLEdBRW9EO0FBQUVDLGNBQUFBLEtBQUssRUFBRTtBQUFULGFBRnBELEVBR0VwQixJQUhGLENBR08sWUFBVztBQUNoQmIsY0FBQUEsT0FBTyxDQUFDLElBQUQsQ0FBUDtBQUNBLGFBTEYsRUFNRTJCLEtBTkYsQ0FNUSxZQUFXO0FBQ2pCM0IsY0FBQUEsT0FBTyxDQUFDLEtBQUQsQ0FBUDtBQUNBLGFBUkY7QUFTQSxXQVZELENBVUUsT0FBT2tDLENBQVAsRUFBVTtBQUNYbEMsWUFBQUEsT0FBTyxDQUFDLEtBQUQsQ0FBUDtBQUNBO0FBQ0QsU0FkTSxDQUFQO0FBZUE7OztzQ0FFc0JtQyxhLEVBQXdDO0FBQzlELGFBQUs3Qix1QkFBTCxHQUErQjZCLGFBQS9CO0FBQ0E7Ozt3Q0FFd0I7QUFDeEIsZUFBTyxLQUFLN0IsdUJBQVo7QUFDQTs7O3FDQUVtQjtBQUNuQixlQUFPLElBQVA7QUFDQTs7OztJQXhEMkM4QixPOztNQTJEdkNDLHlCOzs7Ozs7Ozs7Ozs7O3FDQUNVQyxlLEVBQTBEO0FBQ3hFLFlBQU1DLDhCQUE4QixHQUFHLElBQUkxQyw4QkFBSixDQUFtQ3lDLGVBQW5DLENBQXZDO0FBQ0EsZUFBT0MsOEJBQThCLENBQUN6QyxXQUF0QztBQUNBOzs7O0lBSnNDMEMsYzs7U0FPekJILHlCIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZXJ2aWNlRmFjdG9yeSwgU2VydmljZSwgU2VydmljZUNvbnRleHQgfSBmcm9tIFwic2FwL3VpL2NvcmUvc2VydmljZVwiO1xuaW1wb3J0IHsgRGVmYXVsdEVudmlyb25tZW50Q2FwYWJpbGl0aWVzLCBFbnZpcm9ubWVudENhcGFiaWxpdGllcyB9IGZyb20gXCIuLi9jb252ZXJ0ZXJzL01ldGFNb2RlbENvbnZlcnRlclwiO1xuaW1wb3J0IHsgVmVyc2lvbkluZm8gfSBmcm9tIFwic2FwL3VpXCI7XG5cbmNsYXNzIEVudmlyb25tZW50Q2FwYWJpbGl0aWVzU2VydmljZSBleHRlbmRzIFNlcnZpY2U8RW52aXJvbm1lbnRDYXBhYmlsaXRpZXM+IHtcblx0cmVzb2x2ZUZuOiBhbnk7XG5cdHJlamVjdEZuOiBhbnk7XG5cdGluaXRQcm9taXNlITogUHJvbWlzZTxhbnk+O1xuXHRlbnZpcm9ubWVudENhcGFiaWxpdGllcyE6IEVudmlyb25tZW50Q2FwYWJpbGl0aWVzO1xuXHQvLyAhOiBtZWFucyB0aGF0IHdlIGtub3cgaXQgd2lsbCBiZSBhc3NpZ25lZCBiZWZvcmUgdXNhZ2VcblxuXHRpbml0KCkge1xuXHRcdHRoaXMuaW5pdFByb21pc2UgPSBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR0aGlzLnJlc29sdmVGbiA9IHJlc29sdmU7XG5cdFx0XHR0aGlzLnJlamVjdEZuID0gcmVqZWN0O1xuXHRcdH0pO1xuXHRcdGNvbnN0IG9Db250ZXh0ID0gdGhpcy5nZXRDb250ZXh0KCk7XG5cdFx0dGhpcy5lbnZpcm9ubWVudENhcGFiaWxpdGllcyA9IE9iamVjdC5hc3NpZ24oe30sIERlZmF1bHRFbnZpcm9ubWVudENhcGFiaWxpdGllcyk7XG5cdFx0VmVyc2lvbkluZm8ubG9hZCh1bmRlZmluZWQgYXMgYW55KVxuXHRcdFx0LnRoZW4odmVyc2lvbkluZm8gPT4ge1xuXHRcdFx0XHR0aGlzLmVudmlyb25tZW50Q2FwYWJpbGl0aWVzLkNoYXJ0ID0gISF2ZXJzaW9uSW5mby5saWJyYXJpZXMuZmluZCgobGliOiBhbnkpID0+IGxpYi5uYW1lID09PSBcInNhcC52aXpcIik7XG5cdFx0XHRcdHRoaXMuZW52aXJvbm1lbnRDYXBhYmlsaXRpZXMuTWljcm9DaGFydCA9ICEhdmVyc2lvbkluZm8ubGlicmFyaWVzLmZpbmQoXG5cdFx0XHRcdFx0KGxpYjogYW55KSA9PiBsaWIubmFtZSA9PT0gXCJzYXAuc3VpdGUudWkubWljcm9jaGFydFwiXG5cdFx0XHRcdCk7XG5cdFx0XHRcdHRoaXMuZW52aXJvbm1lbnRDYXBhYmlsaXRpZXMuVVNoZWxsID0gISEoc2FwICYmIHNhcC51c2hlbGwgJiYgc2FwLnVzaGVsbC5Db250YWluZXIpO1xuXHRcdFx0XHR0aGlzLmVudmlyb25tZW50Q2FwYWJpbGl0aWVzLkludGVudEJhc2VkTmF2aWdhdGlvbiA9ICEhKHNhcCAmJiBzYXAudXNoZWxsICYmIHNhcC51c2hlbGwuQ29udGFpbmVyKTtcblx0XHRcdFx0dGhpcy5lbnZpcm9ubWVudENhcGFiaWxpdGllcyA9IE9iamVjdC5hc3NpZ24odGhpcy5lbnZpcm9ubWVudENhcGFiaWxpdGllcywgb0NvbnRleHQuc2V0dGluZ3MpO1xuXHRcdFx0XHR0aGlzLnJlc29sdmVGbih0aGlzKTtcblx0XHRcdH0pXG5cdFx0XHQuY2F0Y2godGhpcy5yZWplY3RGbik7XG5cdH1cblxuXHRyZXNvbHZlTGlicmFyeShsaWJyYXJ5TmFtZTogc3RyaW5nKTogUHJvbWlzZTxib29sZWFuPiB7XG5cdFx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUpIHtcblx0XHRcdHRyeSB7XG5cdFx0XHRcdHNhcC51aVxuXHRcdFx0XHRcdC5nZXRDb3JlKClcblx0XHRcdFx0XHQubG9hZExpYnJhcnkoYCR7bGlicmFyeU5hbWUucmVwbGFjZSgvXFwuL2csIFwiL1wiKX1gLCB7IGFzeW5jOiB0cnVlIH0pXG5cdFx0XHRcdFx0LnRoZW4oZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHRyZXNvbHZlKHRydWUpO1xuXHRcdFx0XHRcdH0pXG5cdFx0XHRcdFx0LmNhdGNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0cmVzb2x2ZShmYWxzZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHR9IGNhdGNoIChlKSB7XG5cdFx0XHRcdHJlc29sdmUoZmFsc2UpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXHR9XG5cblx0cHVibGljIHNldENhcGFiaWxpdGllcyhvQ2FwYWJpbGl0aWVzOiBFbnZpcm9ubWVudENhcGFiaWxpdGllcykge1xuXHRcdHRoaXMuZW52aXJvbm1lbnRDYXBhYmlsaXRpZXMgPSBvQ2FwYWJpbGl0aWVzO1xuXHR9XG5cblx0cHVibGljIGdldENhcGFiaWxpdGllcygpIHtcblx0XHRyZXR1cm4gdGhpcy5lbnZpcm9ubWVudENhcGFiaWxpdGllcztcblx0fVxuXG5cdGdldEludGVyZmFjZSgpOiBhbnkge1xuXHRcdHJldHVybiB0aGlzO1xuXHR9XG59XG5cbmNsYXNzIEVudmlyb25tZW50U2VydmljZUZhY3RvcnkgZXh0ZW5kcyBTZXJ2aWNlRmFjdG9yeTxFbnZpcm9ubWVudENhcGFiaWxpdGllcz4ge1xuXHRjcmVhdGVJbnN0YW5jZShvU2VydmljZUNvbnRleHQ6IFNlcnZpY2VDb250ZXh0PEVudmlyb25tZW50Q2FwYWJpbGl0aWVzPikge1xuXHRcdGNvbnN0IGVudmlyb25tZW50Q2FwYWJpbGl0aWVzU2VydmljZSA9IG5ldyBFbnZpcm9ubWVudENhcGFiaWxpdGllc1NlcnZpY2Uob1NlcnZpY2VDb250ZXh0KTtcblx0XHRyZXR1cm4gZW52aXJvbm1lbnRDYXBhYmlsaXRpZXNTZXJ2aWNlLmluaXRQcm9taXNlO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEVudmlyb25tZW50U2VydmljZUZhY3Rvcnk7XG4iXX0=