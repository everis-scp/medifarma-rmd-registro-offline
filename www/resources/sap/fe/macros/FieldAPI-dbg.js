/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport", "./MacroAPI"], function (ClassSupport, MacroAPI) {
  "use strict";

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _temp;

  var Association = ClassSupport.Association;
  var Property = ClassSupport.Property;
  var Event = ClassSupport.Event;
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
   * Building block for creating a field based on the metadata provided by OData V4.
   * <br>
   * Usually, a DataField or DataPoint annotation is expected, but the field can also be used to display a property from the entity type.
   *
   *
   * Usage example:
   * <pre>
   * &lt;macro:Field id="MyField" metaPath="MyProperty" /&gt;
   * </pre>
   *
   * @alias sap.fe.macros.Field
   * @public
   */
  var FieldAPI = (_dec = APIClass("sap.fe.macros.FieldAPI"), _dec2 = Property({
    type: "boolean"
  }), _dec3 = Property({
    type: "boolean"
  }), _dec4 = Property({
    type: "string"
  }), _dec5 = Association({
    type: "sap.ui.core.Control",
    multiple: true,
    singularName: "ariaLabelledBy"
  }), _dec6 = Property({
    type: "boolean"
  }), _dec7 = Property({
    type: "sap.fe.macros.FieldFormatOptions"
  }), _dec8 = Property({
    type: "string"
  }), _dec(_class = (_class2 = (_temp = /*#__PURE__*/function (_MacroAPI) {
    _inherits(FieldAPI, _MacroAPI);

    var _super = _createSuper(FieldAPI);

    function FieldAPI() {
      var _this;

      _classCallCheck(this, FieldAPI);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super.call.apply(_super, [this].concat(args));

      _initializerDefineProperty(_assertThisInitialized(_this), "editable", _descriptor, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "readOnly", _descriptor2, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "id", _descriptor3, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "change", _descriptor4, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "ariaLabelledBy", _descriptor5, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "required", _descriptor6, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "formatOptions", _descriptor7, _assertThisInitialized(_this));

      _initializerDefineProperty(_assertThisInitialized(_this), "semanticObject", _descriptor8, _assertThisInitialized(_this));

      return _this;
    }

    _createClass(FieldAPI, [{
      key: "handleChange",
      value: function handleChange(oEvent) {
        this.fireChange({
          value: this.getValue(),
          isValid: oEvent.getParameter("valid")
        });
      }
    }, {
      key: "onBeforeRendering",
      value: function onBeforeRendering() {
        var oContent = this.getContent();

        if (oContent && oContent.addAriaLabelledBy) {
          var aAriaLabelledBy = this.getAriaLabelledBy();

          for (var i = 0; i < aAriaLabelledBy.length; i++) {
            var sId = aAriaLabelledBy[i];
            var aAriaLabelledBys = oContent.getAriaLabelledBy() || [];

            if (aAriaLabelledBys.indexOf(sId) === -1) {
              oContent.addAriaLabelledBy(sId);
            }
          }
        }
      }
    }, {
      key: "enhanceAccessibilityState",
      value: function enhanceAccessibilityState(_oElement, mAriaProps) {
        var oParent = this.getParent();

        if (oParent && oParent.enhanceAccessibilityState) {
          // use FieldWrapper as control, but aria properties of rendered inner control.
          oParent.enhanceAccessibilityState(this, mAriaProps);
        }

        return mAriaProps;
      }
    }, {
      key: "getAccessibilityInfo",
      value: function getAccessibilityInfo() {
        var oContent = this.content;
        return oContent && oContent.getAccessibilityInfo ? oContent.getAccessibilityInfo() : {};
      }
      /**
       * Retrieves the current value of the Field.
       *
       * @public
       * @returns The current value of the field
       */

    }, {
      key: "getValue",
      value: function getValue() {
        var oControl = this.content,
            aControls;

        if (oControl.isA("sap.fe.core.controls.FieldWrapper")) {
          aControls = oControl.getContentEdit() || [oControl.getContentDisplay()] || [];

          if (aControls.length === 1) {
            oControl = aControls[0];
          } else {
            throw "getting value not yet implemented for this field type";
          }
        }

        if (oControl.isA("sap.m.CheckBox")) {
          return oControl.getSelected();
        } else if (oControl.isA("sap.m.Input")) {
          return oControl.getValue();
        } else if (oControl.isA("sap.ui.mdc.Field")) {
          return oControl.getValue();
        } else if (oControl.isA("sap.m.TextArea")) {
          return oControl.getValue();
        } else {
          throw "getting value not yet implemented for this field type";
        }
      }
    }]);

    return FieldAPI;
  }(MacroAPI), _temp), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "editable", [_dec2], {
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
  }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "change", [Event], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "ariaLabelledBy", [_dec5], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "required", [_dec6], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "formatOptions", [_dec7], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "semanticObject", [_dec8], {
    configurable: true,
    enumerable: true,
    writable: true,
    initializer: null
  }), _applyDecoratedDescriptor(_class2.prototype, "handleChange", [EventHandler], Object.getOwnPropertyDescriptor(_class2.prototype, "handleChange"), _class2.prototype)), _class2)) || _class);
  return FieldAPI;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkZpZWxkQVBJLnRzIl0sIm5hbWVzIjpbIkZpZWxkQVBJIiwiQVBJQ2xhc3MiLCJQcm9wZXJ0eSIsInR5cGUiLCJBc3NvY2lhdGlvbiIsIm11bHRpcGxlIiwic2luZ3VsYXJOYW1lIiwib0V2ZW50IiwiZmlyZUNoYW5nZSIsInZhbHVlIiwiZ2V0VmFsdWUiLCJpc1ZhbGlkIiwiZ2V0UGFyYW1ldGVyIiwib0NvbnRlbnQiLCJnZXRDb250ZW50IiwiYWRkQXJpYUxhYmVsbGVkQnkiLCJhQXJpYUxhYmVsbGVkQnkiLCJnZXRBcmlhTGFiZWxsZWRCeSIsImkiLCJsZW5ndGgiLCJzSWQiLCJhQXJpYUxhYmVsbGVkQnlzIiwiaW5kZXhPZiIsIl9vRWxlbWVudCIsIm1BcmlhUHJvcHMiLCJvUGFyZW50IiwiZ2V0UGFyZW50IiwiZW5oYW5jZUFjY2Vzc2liaWxpdHlTdGF0ZSIsImNvbnRlbnQiLCJnZXRBY2Nlc3NpYmlsaXR5SW5mbyIsIm9Db250cm9sIiwiYUNvbnRyb2xzIiwiaXNBIiwiZ2V0Q29udGVudEVkaXQiLCJnZXRDb250ZW50RGlzcGxheSIsImdldFNlbGVjdGVkIiwiTWFjcm9BUEkiLCJFdmVudCIsIkV2ZW50SGFuZGxlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQStCQTs7Ozs7Ozs7Ozs7Ozs7TUFlTUEsUSxXQURMQyxRQUFRLENBQUMsd0JBQUQsQyxVQVdQQyxRQUFRLENBQUM7QUFBRUMsSUFBQUEsSUFBSSxFQUFFO0FBQVIsR0FBRCxDLFVBVVJELFFBQVEsQ0FBQztBQUFFQyxJQUFBQSxJQUFJLEVBQUU7QUFBUixHQUFELEMsVUFRUkQsUUFBUSxDQUFDO0FBQUVDLElBQUFBLElBQUksRUFBRTtBQUFSLEdBQUQsQyxVQVdSQyxXQUFXLENBQUM7QUFBRUQsSUFBQUEsSUFBSSxFQUFFLHFCQUFSO0FBQStCRSxJQUFBQSxRQUFRLEVBQUUsSUFBekM7QUFBK0NDLElBQUFBLFlBQVksRUFBRTtB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UUFBUSxDQUFDRSxHQUFULENBQWEsZ0JBQWIsQ0FBSixFQUFvQztBQUMxQyxpQkFBUUYsUUFBRCxDQUFvQnBCLFFBQXBCLEVBQVA7QUFDQSxTQUZNLE1BRUE7QUFDTixnQkFBTSx1REFBTjtBQUNBO0FBQ0Q7Ozs7SUEvSHFCMEIsUTs7Ozs7Ozs7Ozs7Ozs7OzZFQW9DckJDLEs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7b0VBMkJBQyxZO1NBbUVhdEMsUSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQVBJQ2xhc3MsIEV2ZW50SGFuZGxlciwgRXZlbnQsIFByb3BlcnR5LCBBc3NvY2lhdGlvbiB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0NsYXNzU3VwcG9ydFwiO1xuaW1wb3J0IE1hY3JvQVBJIGZyb20gXCIuL01hY3JvQVBJXCI7XG5pbXBvcnQgeyBJbnB1dCwgQ2hlY2tCb3ggfSBmcm9tIFwic2FwL21cIjtcbmltcG9ydCB7IEZpZWxkIGFzIG1kY0ZpZWxkIH0gZnJvbSBcInNhcC91aS9tZGNcIjtcbmltcG9ydCB7IEZpZWxkV3JhcHBlciB9IGZyb20gXCJzYXAvZmUvY29yZS9jb250cm9sc1wiO1xuaW1wb3J0IHsgQ29udHJvbCB9IGZyb20gXCJzYXAvdWkvY29yZVwiO1xuXG4vKipcbiAqIEFkZGl0aW9uYWwgZm9ybWF0IG9wdGlvbnMgZm9yIHRoZSBmaWVsZC5cbiAqXG4gKiBAYWxpYXMgc2FwLmZlLm1hY3Jvcy5GaWVsZEZvcm1hdE9wdGlvbnNcbiAqIEBwdWJsaWNcbiAqL1xuZXhwb3J0IHR5cGUgRmllbGRGb3JtYXRPcHRpb25zID0ge1xuXHQvKipcblx0ICogIERlZmluZXMgaG93IHRoZSBmaWVsZCB2YWx1ZSBhbmQgYXNzb2NpYXRlZCB0ZXh0IHdpbGwgYmUgZGlzcGxheWVkIHRvZ2V0aGVyLjxici8+XG5cdCAqXG5cdCAqICBBbGxvd2VkIHZhbHVlcyBhcmUgXCJWYWx1ZVwiLCBcIkRlc2NyaXB0aW9uXCIsIFwiVmFsdWVEZXNjcmlwdGlvblwiIGFuZCBcIkRlc2NyaXB0aW9uVmFsdWVcIlxuXHQgKlxuXHQgKiAgQHB1YmxpY1xuXHQgKi9cblx0ZGlzcGxheU1vZGU6IHN0cmluZztcblx0LyoqXG5cdCAqIERlZmluZXMgaWYgYW5kIGhvdyB0aGUgZmllbGQgbWVhc3VyZSB3aWxsIGJlIGRpc3BsYXllZC48YnIvPlxuXHQgKlxuXHQgKiBBbGxvd2VkIHZhbHVlcyBhcmUgXCJIaWRkZW5cIiBhbmQgXCJSZWFkT25seVwiXG5cdCAqXG5cdCAqICBAcHVibGljXG5cdCAqL1xuXHRtZWFzdXJlRGlzcGxheU1vZGU6IHN0cmluZztcbn07XG4vKipcbiAqIEJ1aWxkaW5nIGJsb2NrIGZvciBjcmVhdGluZyBhIGZpZWxkIGJhc2VkIG9uIHRoZSBtZXRhZGF0YSBwcm92aWRlZCBieSBPRGF0YSBWNC5cbiAqIDxicj5cbiAqIFVzdWFsbHksIGEgRGF0YUZpZWxkIG9yIERhdGFQb2ludCBhbm5vdGF0aW9uIGlzIGV4cGVjdGVkLCBidXQgdGhlIGZpZWxkIGNhbiBhbHNvIGJlIHVzZWQgdG8gZGlzcGxheSBhIHByb3BlcnR5IGZyb20gdGhlIGVudGl0eSB0eXBlLlxuICpcbiAqXG4gKiBVc2FnZSBleGFtcGxlOlxuICogPHByZT5cbiAqICZsdDttYWNybzpGaWVsZCBpZD1cIk15RmllbGRcIiBtZXRhUGF0aD1cIk15UHJvcGVydHlcIiAvJmd0O1xuICogPC9wcmU+XG4gKlxuICogQGFsaWFzIHNhcC5mZS5tYWNyb3MuRmllbGRcbiAqIEBwdWJsaWNcbiAqL1xuQEFQSUNsYXNzKFwic2FwLmZlLm1hY3Jvcy5GaWVsZEFQSVwiKVxuY2xhc3MgRmllbGRBUEkgZXh0ZW5kcyBNYWNyb0FQSSB7XG5cdC8qKlxuXHQgKiBBbiBleHByZXNzaW9uIHRoYXQgYWxsb3dzIHlvdSB0byBjb250cm9sIHRoZSBlZGl0YWJsZSBzdGF0ZSBvZiB0aGUgZmllbGQuXG5cdCAqXG5cdCAqIElmIHlvdSBkbyBub3Qgc2V0IGFueSBleHByZXNzaW9uLCBTQVAgRmlvcmkgZWxlbWVudHMgaG9va3MgaW50byB0aGUgc3RhbmRhcmQgbGlmZWN5Y2xlIHRvIGRldGVybWluZSBpZiB0aGUgcGFnZSBpcyBjdXJyZW50bHkgZWRpdGFibGUuXG5cdCAqIFBsZWFzZSBub3RlIHRoYXQgeW91IGNhbm5vdCBzZXQgYSBmaWVsZCB0byBlZGl0YWJsZSBpZiBpdCBoYXMgYmVlbiBkZWZpbmVkIGluIHRoZSBhbm5vdGF0aW9uIGFzIG5vdCBlZGl0YWJsZS5cblx0ICpcblx0ICogQHByaXZhdGVcblx0ICogQGRlcHJlY2F0ZWRcblx0ICovXG5cdEBQcm9wZXJ0eSh7IHR5cGU6IFwiYm9vbGVhblwiIH0pXG5cdGVkaXRhYmxlITogYm9vbGVhbjtcblxuXHQvKipcblx0ICogQW4gZXhwcmVzc2lvbiB0aGF0IGFsbG93cyB5b3UgdG8gY29udHJvbCB0aGUgcmVhZC1vbmx5IHN0YXRlIG9mIHRoZSBmaWVsZC5cblx0ICpcblx0ICogSWYgeW91IGRvIG5vdCBzZXQgYW55IGV4cHJlc3Npb24sIFNBUCBGaW9yaSBlbGVtZW50cyBob29rcyBpbnRvIHRoZSBzdGFuZGFyZCBsaWZlY3ljbGUgdG8gZGV0ZXJtaW5lIHRoZSBjdXJyZW50IHN0YXRlLlxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRAUHJvcGVydHkoeyB0eXBlOiBcImJvb2xlYW5cIiB9KVxuXHRyZWFkT25seSE6IGJvb2xlYW47XG5cblx0LyoqXG5cdCAqIFRoZSBpZGVudGlmaWVyIG9mIHRoZSBGaWVsZCBjb250cm9sLlxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRAUHJvcGVydHkoeyB0eXBlOiBcInN0cmluZ1wiIH0pXG5cdGlkITogc3RyaW5nO1xuXG5cdC8qKlxuXHQgKiBBbiBldmVudCBjb250YWluaW5nIGRldGFpbHMgaXMgdHJpZ2dlcmVkIHdoZW4gdGhlIHZhbHVlIG9mIHRoZSBmaWVsZCBpcyBjaGFuZ2VkLlxuXHQgKlxuXHQgKiBAcHVibGljXG5cdCAqL1xuXHRARXZlbnRcblx0Y2hhbmdlITogRnVuY3Rpb247XG5cblx0QEFzc29jaWF0aW9uKHsgdHlwZTogXCJzYXAudWkuY29yZS5Db250cm9sXCIsIG11bHRpcGxlOiB0cnVlLCBzaW5ndWxhck5hbWU6IFwiYXJpYUxhYmVsbGVkQnlcIiB9KVxuXHRhcmlhTGFiZWxsZWRCeSE6IENvbnRyb2w7XG5cblx0QFByb3BlcnR5KHsgdHlwZTogXCJib29sZWFuXCIgfSlcblx0cmVxdWlyZWQhOiBib29sZWFuO1xuXG5cdC8qKlxuXHQgKiBBIHNldCBvZiBvcHRpb25zIHRoYXQgY2FuIGJlIGNvbmZpZ3VyZWQuXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdEBQcm9wZXJ0eSh7IHR5cGU6IFwic2FwLmZlLm1hY3Jvcy5GaWVsZEZvcm1hdE9wdGlvbnNcIiB9KVxuXHRmb3JtYXRPcHRpb25zITogRmllbGRGb3JtYXRPcHRpb25zO1xuXG5cdC8qKlxuXHQgKiBPcHRpb24gdG8gYWRkIHNlbWFudGljIG9iamVjdHMgdG8gYSBmaWVsZC5cblx0ICogVmFsaWQgb3B0aW9ucyBhcmUgZWl0aGVyIGEgc2luZ2xlIHNlbWFudGljIG9iamVjdCwgYSBzdHJpbmdpZmllZCBhcnJheSBvZiBzZW1hbnRpYyBvYmplY3RzXG5cdCAqIG9yIGEgc2luZ2xlIGJpbmRpbmcgZXhwcmVzc2lvbiByZXR1cm5pbmcgZWl0aGVyIGEgc2luZ2xlIHNlbWFudGljIG9iamVjdCBvciBhbiBhcnJheSBvZiBzZW1hbnRpYyBvYmplY3RzXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICovXG5cdEBQcm9wZXJ0eSh7IHR5cGU6IFwic3RyaW5nXCIgfSlcblx0c2VtYW50aWNPYmplY3QhOiBzdHJpbmc7XG5cblx0QEV2ZW50SGFuZGxlclxuXHRoYW5kbGVDaGFuZ2Uob0V2ZW50OiBVSTVFdmVudCkge1xuXHRcdCh0aGlzIGFzIGFueSkuZmlyZUNoYW5nZSh7IHZhbHVlOiB0aGlzLmdldFZhbHVlKCksIGlzVmFsaWQ6IG9FdmVudC5nZXRQYXJhbWV0ZXIoXCJ2YWxpZFwiKSB9KTtcblx0fVxuXG5cdG9uQmVmb3JlUmVuZGVyaW5nKCkge1xuXHRcdGNvbnN0IG9Db250ZW50ID0gKHRoaXMgYXMgYW55KS5nZXRDb250ZW50KCk7XG5cdFx0aWYgKG9Db250ZW50ICYmIG9Db250ZW50LmFkZEFyaWFMYWJlbGxlZEJ5KSB7XG5cdFx0XHRjb25zdCBhQXJpYUxhYmVsbGVkQnkgPSAodGhpcyBhcyBhbnkpLmdldEFyaWFMYWJlbGxlZEJ5KCk7XG5cblx0XHRcdGZvciAobGV0IGkgPSAwOyBpIDwgYUFyaWFMYWJlbGxlZEJ5Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGNvbnN0IHNJZCA9IGFBcmlhTGFiZWxsZWRCeVtpXTtcblx0XHRcdFx0Y29uc3QgYUFyaWFMYWJlbGxlZEJ5cyA9IG9Db250ZW50LmdldEFyaWFMYWJlbGxlZEJ5KCkgfHwgW107XG5cdFx0XHRcdGlmIChhQXJpYUxhYmVsbGVkQnlzLmluZGV4T2Yoc0lkKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRvQ29udGVudC5hZGRBcmlhTGFiZWxsZWRCeShzSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0ZW5oYW5jZUFjY2Vzc2liaWxpdHlTdGF0ZShfb0VsZW1lbnQ6IG9iamVjdCwgbUFyaWFQcm9wczogb2JqZWN0KTogb2JqZWN0IHtcblx0XHRjb25zdCBvUGFyZW50ID0gdGhpcy5nZXRQYXJlbnQoKTtcblxuXHRcdGlmIChvUGFyZW50ICYmIChvUGFyZW50IGFzIGFueSkuZW5oYW5jZUFjY2Vzc2liaWxpdHlTdGF0ZSkge1xuXHRcdFx0Ly8gdXNlIEZpZWxkV3JhcHBlciBhcyBjb250cm9sLCBidXQgYXJpYSBwcm9wZXJ0aWVzIG9mIHJlbmRlcmVkIGlubmVyIGNvbnRyb2wuXG5cdFx0XHQob1BhcmVudCBhcyBhbnkpLmVuaGFuY2VBY2Nlc3NpYmlsaXR5U3RhdGUodGhpcywgbUFyaWFQcm9wcyk7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIG1BcmlhUHJvcHM7XG5cdH1cblx0Z2V0QWNjZXNzaWJpbGl0eUluZm8oKTogT2JqZWN0IHtcblx0XHRjb25zdCBvQ29udGVudCA9IHRoaXMuY29udGVudDtcblx0XHRyZXR1cm4gb0NvbnRlbnQgJiYgb0NvbnRlbnQuZ2V0QWNjZXNzaWJpbGl0eUluZm8gPyBvQ29udGVudC5nZXRBY2Nlc3NpYmlsaXR5SW5mbygpIDoge307XG5cdH1cblx0LyoqXG5cdCAqIFJldHJpZXZlcyB0aGUgY3VycmVudCB2YWx1ZSBvZiB0aGUgRmllbGQuXG5cdCAqXG5cdCAqIEBwdWJsaWNcblx0ICogQHJldHVybnMgVGhlIGN1cnJlbnQgdmFsdWUgb2YgdGhlIGZpZWxkXG5cdCAqL1xuXHRnZXRWYWx1ZSgpOiBib29sZWFuIHwgc3RyaW5nIHtcblx0XHRsZXQgb0NvbnRyb2wgPSB0aGlzLmNvbnRlbnQsXG5cdFx0XHRhQ29udHJvbHM7XG5cblx0XHRpZiAob0NvbnRyb2wuaXNBKFwic2FwLmZlLmNvcmUuY29udHJvbHMuRmllbGRXcmFwcGVyXCIpKSB7XG5cdFx0XHRhQ29udHJvbHMgPSAob0NvbnRyb2wgYXMgRmllbGRXcmFwcGVyKS5nZXRDb250ZW50RWRpdCgpIHx8IFsob0NvbnRyb2wgYXMgRmllbGRXcmFwcGVyKS5nZXRDb250ZW50RGlzcGxheSgpXSB8fCBbXTtcblx0XHRcdGlmIChhQ29udHJvbHMubGVuZ3RoID09PSAxKSB7XG5cdFx0XHRcdG9Db250cm9sID0gYUNvbnRyb2xzWzBdO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0dGhyb3cgXCJnZXR0aW5nIHZhbHVlIG5vdCB5ZXQgaW1wbGVtZW50ZWQgZm9yIHRoaXMgZmllbGQgdHlwZVwiO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIChvQ29udHJvbC5pc0EoXCJzYXAubS5DaGVja0JveFwiKSkge1xuXHRcdFx0cmV0dXJuIChvQ29udHJvbCBhcyBDaGVja0JveCkuZ2V0U2VsZWN0ZWQoKTtcblx0XHR9IGVsc2UgaWYgKG9Db250cm9sLmlzQShcInNhcC5tLklucHV0XCIpKSB7XG5cdFx0XHRyZXR1cm4gKG9Db250cm9sIGFzIElucHV0KS5nZXRWYWx1ZSgpO1xuXHRcdH0gZWxzZSBpZiAob0NvbnRyb2wuaXNBKFwic2FwLnVpLm1kYy5GaWVsZFwiKSkge1xuXHRcdFx0cmV0dXJuICgob0NvbnRyb2wgYXMgYW55KSBhcyBtZGNGaWVsZCkuZ2V0VmFsdWUoKTtcblx0XHR9IGVsc2UgaWYgKG9Db250cm9sLmlzQShcInNhcC5tLlRleHRBcmVhXCIpKSB7XG5cdFx0XHRyZXR1cm4gKG9Db250cm9sIGFzIElucHV0KS5nZXRWYWx1ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR0aHJvdyBcImdldHRpbmcgdmFsdWUgbm90IHlldCBpbXBsZW1lbnRlZCBmb3IgdGhpcyBmaWVsZCB0eXBlXCI7XG5cdFx0fVxuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEZpZWxkQVBJO1xuIl19