/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  var customIsEnabledCheck = function (oView, modulePath, aSelectedContexts) {
    var _this = this;

    var oExtensionAPI = oView.getController().getExtensionAPI();
    var parts = modulePath.split(".");
    var methodName = parts.pop();
    var moduleName = parts.join("/");
    return new Promise(function (resolve) {
      sap.ui.require([moduleName], function (module) {
        resolve(module[methodName].bind(oExtensionAPI)(_this.getBindingContext(), aSelectedContexts || []));
      });
    });
  };

  customIsEnabledCheck.__functionName = "sap.fe.core.formatters.FPMFormatter#customIsEnabledCheck";
  /**
   * Collection of table formatters.
   *
   * @param {object} this The context
   * @param {string} sName The inner function name
   * @param {object[]} oArgs The inner function parameters
   * @returns {object} The value from the inner function
   */

  var fpmFormatter = function (sName) {
    if (fpmFormatter.hasOwnProperty(sName)) {
      for (var _len = arguments.length, oArgs = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        oArgs[_key - 1] = arguments[_key];
      }

      return fpmFormatter[sName].apply(this, oArgs);
    } else {
      return "";
    }
  };

  fpmFormatter.customIsEnabledCheck = customIsEnabledCheck;
  /**
   * @global
   */

  return fpmFormatter;
}, true);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZQTUZvcm1hdHRlci50cyJdLCJuYW1lcyI6WyJjdXN0b21Jc0VuYWJsZWRDaGVjayIsIm9WaWV3IiwibW9kdWxlUGF0aCIsImFTZWxlY3RlZENvbnRleHRzIiwib0V4dGVuc2lvbkFQSSIsImdldENvbnRyb2xsZXIiLCJnZXRFeHRlbnNpb25BUEkiLCJwYXJ0cyIsInNwbGl0IiwibWV0aG9kTmFtZSIsInBvcCIsIm1vZHVsZU5hbWUiLCJqb2luIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzYXAiLCJ1aSIsInJlcXVpcmUiLCJtb2R1bGUiLCJiaW5kIiwiZ2V0QmluZGluZ0NvbnRleHQiLCJfX2Z1bmN0aW9uTmFtZSIsImZwbUZvcm1hdHRlciIsInNOYW1lIiwiaGFzT3duUHJvcGVydHkiLCJvQXJncyIsImFwcGx5Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBS0EsTUFBTUEsb0JBQW9CLEdBQUcsVUFBOEJDLEtBQTlCLEVBQTJDQyxVQUEzQyxFQUErREMsaUJBQS9ELEVBQTRHO0FBQUE7O0FBQ3hJLFFBQU1DLGFBQWEsR0FBS0gsS0FBSyxDQUFDSSxhQUFOLEVBQUYsQ0FBbURDLGVBQW5ELEVBQXRCO0FBQ0EsUUFBTUMsS0FBSyxHQUFHTCxVQUFVLENBQUNNLEtBQVgsQ0FBaUIsR0FBakIsQ0FBZDtBQUNBLFFBQU1DLFVBQVUsR0FBR0YsS0FBSyxDQUFDRyxHQUFOLEVBQW5CO0FBQ0EsUUFBTUMsVUFBVSxHQUFHSixLQUFLLENBQUNLLElBQU4sQ0FBVyxHQUFYLENBQW5CO0FBRUEsV0FBTyxJQUFJQyxPQUFKLENBQVksVUFBQUMsT0FBTyxFQUFJO0FBQzdCQyxNQUFBQSxHQUFHLENBQUNDLEVBQUosQ0FBT0MsT0FBUCxDQUFlLENBQUNOLFVBQUQsQ0FBZixFQUE2QixVQUFDTyxNQUFELEVBQWlCO0FBQzdDSixRQUFBQSxPQUFPLENBQUNJLE1BQU0sQ0FBQ1QsVUFBRCxDQUFOLENBQW1CVSxJQUFuQixDQUF3QmYsYUFBeEIsRUFBdUMsS0FBSSxDQUFDZ0IsaUJBQUwsRUFBdkMsRUFBaUVqQixpQkFBaUIsSUFBSSxFQUF0RixDQUFELENBQVA7QUFDQSxPQUZEO0FBR0EsS0FKTSxDQUFQO0FBS0EsR0FYRDs7QUFZQUgsRUFBQUEsb0JBQW9CLENBQUNxQixjQUFyQixHQUFzQywwREFBdEM7QUFFQTs7Ozs7Ozs7O0FBUUEsTUFBTUMsWUFBWSxHQUFHLFVBQXVCQyxLQUF2QixFQUE0RDtBQUNoRixRQUFJRCxZQUFZLENBQUNFLGNBQWIsQ0FBNEJELEtBQTVCLENBQUosRUFBd0M7QUFBQSx3Q0FEcUJFLEtBQ3JCO0FBRHFCQSxRQUFBQSxLQUNyQjtBQUFBOztBQUN2QyxhQUFRSCxZQUFELENBQXNCQyxLQUF0QixFQUE2QkcsS0FBN0IsQ0FBbUMsSUFBbkMsRUFBeUNELEtBQXpDLENBQVA7QUFDQSxLQUZELE1BRU87QUFDTixhQUFPLEVBQVA7QUFDQTtBQUNELEdBTkQ7O0FBUUFILEVBQUFBLFlBQVksQ0FBQ3RCLG9CQUFiLEdBQW9DQSxvQkFBcEM7QUFFQTs7OztTQUdlc0IsWSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29udGV4dCB9IGZyb20gXCJzYXAvdWkvbW9kZWxcIjtcbmltcG9ydCB7IE1hbmFnZWRPYmplY3QgfSBmcm9tIFwic2FwL3VpL2Jhc2VcIjtcbmltcG9ydCB7IFZpZXcgfSBmcm9tIFwic2FwL3VpL2NvcmUvbXZjXCI7XG5pbXBvcnQgeyBQYWdlQ29udHJvbGxlciB9IGZyb20gXCJzYXAvZmUvY29yZVwiO1xuXG5jb25zdCBjdXN0b21Jc0VuYWJsZWRDaGVjayA9IGZ1bmN0aW9uKHRoaXM6IE1hbmFnZWRPYmplY3QsIG9WaWV3OiBWaWV3LCBtb2R1bGVQYXRoOiBzdHJpbmcsIGFTZWxlY3RlZENvbnRleHRzOiBDb250ZXh0W10pOiBQcm9taXNlPHZvaWQ+IHtcblx0Y29uc3Qgb0V4dGVuc2lvbkFQSSA9ICgob1ZpZXcuZ2V0Q29udHJvbGxlcigpIGFzIGFueSkgYXMgUGFnZUNvbnRyb2xsZXIpLmdldEV4dGVuc2lvbkFQSSgpO1xuXHRjb25zdCBwYXJ0cyA9IG1vZHVsZVBhdGguc3BsaXQoXCIuXCIpO1xuXHRjb25zdCBtZXRob2ROYW1lID0gcGFydHMucG9wKCkgYXMgc3RyaW5nO1xuXHRjb25zdCBtb2R1bGVOYW1lID0gcGFydHMuam9pbihcIi9cIik7XG5cblx0cmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuXHRcdHNhcC51aS5yZXF1aXJlKFttb2R1bGVOYW1lXSwgKG1vZHVsZTogYW55KSA9PiB7XG5cdFx0XHRyZXNvbHZlKG1vZHVsZVttZXRob2ROYW1lXS5iaW5kKG9FeHRlbnNpb25BUEkpKHRoaXMuZ2V0QmluZGluZ0NvbnRleHQoKSwgYVNlbGVjdGVkQ29udGV4dHMgfHwgW10pKTtcblx0XHR9KTtcblx0fSk7XG59O1xuY3VzdG9tSXNFbmFibGVkQ2hlY2suX19mdW5jdGlvbk5hbWUgPSBcInNhcC5mZS5jb3JlLmZvcm1hdHRlcnMuRlBNRm9ybWF0dGVyI2N1c3RvbUlzRW5hYmxlZENoZWNrXCI7XG5cbi8qKlxuICogQ29sbGVjdGlvbiBvZiB0YWJsZSBmb3JtYXR0ZXJzLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSB0aGlzIFRoZSBjb250ZXh0XG4gKiBAcGFyYW0ge3N0cmluZ30gc05hbWUgVGhlIGlubmVyIGZ1bmN0aW9uIG5hbWVcbiAqIEBwYXJhbSB7b2JqZWN0W119IG9BcmdzIFRoZSBpbm5lciBmdW5jdGlvbiBwYXJhbWV0ZXJzXG4gKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgdmFsdWUgZnJvbSB0aGUgaW5uZXIgZnVuY3Rpb25cbiAqL1xuY29uc3QgZnBtRm9ybWF0dGVyID0gZnVuY3Rpb24odGhpczogb2JqZWN0LCBzTmFtZTogc3RyaW5nLCAuLi5vQXJnczogYW55W10pOiBhbnkge1xuXHRpZiAoZnBtRm9ybWF0dGVyLmhhc093blByb3BlcnR5KHNOYW1lKSkge1xuXHRcdHJldHVybiAoZnBtRm9ybWF0dGVyIGFzIGFueSlbc05hbWVdLmFwcGx5KHRoaXMsIG9BcmdzKTtcblx0fSBlbHNlIHtcblx0XHRyZXR1cm4gXCJcIjtcblx0fVxufTtcblxuZnBtRm9ybWF0dGVyLmN1c3RvbUlzRW5hYmxlZENoZWNrID0gY3VzdG9tSXNFbmFibGVkQ2hlY2s7XG5cbi8qKlxuICogQGdsb2JhbFxuICovXG5leHBvcnQgZGVmYXVsdCBmcG1Gb3JtYXR0ZXI7XG4iXX0=