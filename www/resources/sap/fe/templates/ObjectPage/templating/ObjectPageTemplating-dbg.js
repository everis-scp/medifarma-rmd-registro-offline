/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingExpression", "sap/fe/core/converters/helpers/BindingHelper", "sap/fe/core/CommonUtils", "sap/fe/macros/field/FieldTemplating", "sap/fe/core/templating/EntitySetHelper"], function (BindingExpression, BindingHelper, CommonUtils, FieldTemplating, EntitySetHelper) {
  "use strict";

  var _exports = {};
  var isStickySessionSupported = EntitySetHelper.isStickySessionSupported;
  var formatValueRecursively = FieldTemplating.formatValueRecursively;
  var addTextArrangementToBindingExpression = FieldTemplating.addTextArrangementToBindingExpression;
  var Draft = BindingHelper.Draft;
  var UI = BindingHelper.UI;
  var compileBinding = BindingExpression.compileBinding;
  var annotationExpression = BindingExpression.annotationExpression;
  var concat = BindingExpression.concat;
  var isEmpty = BindingExpression.isEmpty;
  var ifElse = BindingExpression.ifElse;
  var and = BindingExpression.and;

  //```mermaid
  // graph TD
  // A[Object Page Title] -->|Get DataField Value| C{Evaluate Create Mode}
  // C -->|In Create Mode| D{Is DataField Value empty}
  // D -->|Yes| F{Is there a TypeName}
  // F -->|Yes| G[Is there an custom title]
  // G -->|Yes| G1[Show the custom title + 'TypeName']
  // G -->|No| G2[Display the default title 'New + TypeName']
  // F -->|No| H[Is there a custom title]
  // H -->|Yes| I[Show the custom title]
  // H -->|No| J[Show the default 'Unamned Object']
  // D -->|No| E
  // C -->|Not in create mode| E[Show DataField Value]
  // ```

  /**
   * Compute the title for the object page.
   *
   * @param oHeaderInfo The @UI.HeaderInfo annotation content
   * @param oViewData The view data object we're currently on
   * @param fullContextPath The full context path used to reach that object page
   * @returns The binding expression for the object page title
   */
  var getExpressionForTitle = function (oHeaderInfo, oViewData, fullContextPath) {
    var _ref, _ref2, _ref3, _ref3$Value, _ref3$Value$$target, _ref3$Value$$target$a, _ref3$Value$$target$a2, _ref3$Value$$target$a3, _ref3$Value$$target$a4, _ref3$Value$$target$a5;

    var titleNoHeaderInfo = CommonUtils.getTranslatedText("T_NEW_OBJECT", oViewData.resourceBundle, null, oViewData.entitySet);
    var titleWithHeaderInfo = CommonUtils.getTranslatedText("T_ANNOTATION_HELPER_DEFAULT_OBJECT_PAGE_HEADER_TITLE", oViewData.resourceBundle, null, oViewData.entitySet);
    var oEmptyHeaderInfoTitle = (oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Title) === undefined || (oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Title) === "" || ((_ref = oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Title) === null || _ref === void 0 ? void 0 : _ref.Value) === "";
    var titleForActiveHeaderNoHeaderInfo = !oEmptyHeaderInfoTitle ? CommonUtils.getTranslatedText("T_ANNOTATION_HELPER_DEFAULT_OBJECT_PAGE_HEADER_TITLE_NO_HEADER_INFO", oViewData.resourceBundle) : "";
    var titleValueExpression = annotationExpression((_ref2 = oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Title) === null || _ref2 === void 0 ? void 0 : _ref2.Value);

    if ((_ref3 = oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Title) === null || _ref3 === void 0 ? void 0 : (_ref3$Value = _ref3.Value) === null || _ref3$Value === void 0 ? void 0 : (_ref3$Value$$target = _ref3$Value.$target) === null || _ref3$Value$$target === void 0 ? void 0 : (_ref3$Value$$target$a = _ref3$Value$$target.annotations) === null || _ref3$Value$$target$a === void 0 ? void 0 : (_ref3$Value$$target$a2 = _ref3$Value$$target$a.Common) === null || _ref3$Value$$target$a2 === void 0 ? void 0 : (_ref3$Value$$target$a3 = _ref3$Value$$target$a2.Text) === null || _ref3$Value$$target$a3 === void 0 ? void 0 : (_ref3$Value$$target$a4 = _ref3$Value$$target$a3.annotations) === null || _ref3$Value$$target$a4 === void 0 ? void 0 : (_ref3$Value$$target$a5 = _ref3$Value$$target$a4.UI) === null || _ref3$Value$$target$a5 === void 0 ? void 0 : _ref3$Value$$target$a5.TextArrangement) {
      // In case an explicit text arrangement was set we make use of it in the description as well
      titleValueExpression = addTextArrangementToBindingExpression(titleValueExpression, fullContextPath);
    }

    titleValueExpression = formatValueRecursively(titleValueExpression, fullContextPath); // If there is a TypeName defined, show the default title 'New + TypeName', otherwise show the custom title or the default 'New object'

    var createModeTitle = (oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.TypeName) ? concat(titleWithHeaderInfo, " ", annotationExpression(oHeaderInfo.TypeName.toString())) : titleNoHeaderInfo;
    return compileBinding(ifElse( // If Create Mode && Empty expression
    and(UI.IsCreateMode, titleValueExpression && isEmpty(titleValueExpression)), createModeTitle, // Otherwise show the default expression
    ifElse(titleValueExpression && isEmpty(titleValueExpression), titleForActiveHeaderNoHeaderInfo, titleValueExpression)));
  };
  /**
   * Retrieves the expression for the description of an object page.
   *
   * @param oHeaderInfo The @UI.HeaderInfo annotation content
   * @param fullContextPath The full context path used to reach that object page
   * @returns The binding expression for the object page description
   */


  _exports.getExpressionForTitle = getExpressionForTitle;

  var getExpressionForDescription = function (oHeaderInfo, fullContextPath) {
    var _ref4, _ref5, _ref5$Value, _ref5$Value$$target, _ref5$Value$$target$a, _ref5$Value$$target$a2, _ref5$Value$$target$a3, _ref5$Value$$target$a4, _ref5$Value$$target$a5;

    var bindingExpression = annotationExpression((_ref4 = oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Description) === null || _ref4 === void 0 ? void 0 : _ref4.Value);

    if ((_ref5 = oHeaderInfo === null || oHeaderInfo === void 0 ? void 0 : oHeaderInfo.Description) === null || _ref5 === void 0 ? void 0 : (_ref5$Value = _ref5.Value) === null || _ref5$Value === void 0 ? void 0 : (_ref5$Value$$target = _ref5$Value.$target) === null || _ref5$Value$$target === void 0 ? void 0 : (_ref5$Value$$target$a = _ref5$Value$$target.annotations) === null || _ref5$Value$$target$a === void 0 ? void 0 : (_ref5$Value$$target$a2 = _ref5$Value$$target$a.Common) === null || _ref5$Value$$target$a2 === void 0 ? void 0 : (_ref5$Value$$target$a3 = _ref5$Value$$target$a2.Text) === null || _ref5$Value$$target$a3 === void 0 ? void 0 : (_ref5$Value$$target$a4 = _ref5$Value$$target$a3.annotations) === null || _ref5$Value$$target$a4 === void 0 ? void 0 : (_ref5$Value$$target$a5 = _ref5$Value$$target$a4.UI) === null || _ref5$Value$$target$a5 === void 0 ? void 0 : _ref5$Value$$target$a5.TextArrangement) {
      // In case an explicit text arrangement was set we make use of it in the description as well
      bindingExpression = addTextArrangementToBindingExpression(bindingExpression, fullContextPath);
    }

    return compileBinding(formatValueRecursively(bindingExpression, fullContextPath));
  };
  /**
   * Return the expression for the save button.
   *
   * @param oViewData The current view data
   * @param fullContextPath The path used up until here
   * @returns The binding expression that shows the right save button text
   */


  _exports.getExpressionForDescription = getExpressionForDescription;

  var getExpressionForSaveButton = function (oViewData, fullContextPath) {
    var saveButtonText = CommonUtils.getTranslatedText("T_OP_OBJECT_PAGE_SAVE", oViewData.resourceBundle);
    var createButtonText = CommonUtils.getTranslatedText("T_OP_OBJECT_PAGE_CREATE", oViewData.resourceBundle);
    var saveExpression;

    if (isStickySessionSupported(fullContextPath.startingEntitySet)) {
      // If we're in sticky mode AND the ui is in create mode, show Create, else show Save
      saveExpression = ifElse(UI.IsCreateModeSticky, createButtonText, saveButtonText);
    } else {
      // If we're in draft AND the draft is a new object (!IsActiveEntity && !HasActiveEntity), show create, else show save
      saveExpression = ifElse(Draft.IsNewObject, createButtonText, saveButtonText);
    }

    return compileBinding(saveExpression);
  };

  _exports.getExpressionForSaveButton = getExpressionForSaveButton;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk9iamVjdFBhZ2VUZW1wbGF0aW5nLnRzIl0sIm5hbWVzIjpbImdldEV4cHJlc3Npb25Gb3JUaXRsZSIsIm9IZWFkZXJJbmZvIiwib1ZpZXdEYXRhIiwiZnVsbENvbnRleHRQYXRoIiwidGl0bGVOb0hlYWRlckluZm8iLCJDb21tb25VdGlscyIsImdldFRyYW5zbGF0ZWRUZXh0IiwicmVzb3VyY2VCdW5kbGUiLCJlbnRpdHlTZXQiLCJ0aXRsZVdpdGhIZWFkZXJJbmZvIiwib0VtcHR5SGVhZGVySW5mb1RpdGxlIiwiVGl0bGUiLCJ1bmRlZmluZWQiLCJWYWx1ZSIsInRpdGxlRm9yQWN0aXZlSGVhZGVyTm9IZWFkZXJJbmZvIiwidGl0bGVWYWx1ZUV4cHJlc3Npb24iLCJhbm5vdGF0aW9uRXhwcmVzc2lvbiIsIiR0YXJnZXQiLCJhbm5vdGF0aW9ucyIsIkNvbW1vbiIsIlRleHQiLCJVSSIsIlRleHRBcnJhbmdlbWVudCIsImFkZFRleHRBcnJhbmdlbWVudFRvQmluZGluZ0V4cHJlc3Npb24iLCJmb3JtYXRWYWx1ZVJlY3Vyc2l2ZWx5IiwiY3JlYXRlTW9kZVRpdGxlIiwiVHlwZU5hbWUiLCJjb25jYXQiLCJ0b1N0cmluZyIsImNvbXBpbGVCaW5kaW5nIiwiaWZFbHNlIiwiYW5kIiwiSXNDcmVhdGVNb2RlIiwiaXNFbXB0eSIsImdldEV4cHJlc3Npb25Gb3JEZXNjcmlwdGlvbiIsImJpbmRpbmdFeHByZXNzaW9uIiwiRGVzY3JpcHRpb24iLCJnZXRFeHByZXNzaW9uRm9yU2F2ZUJ1dHRvbiIsInNhdmVCdXR0b25UZXh0IiwiY3JlYXRlQnV0dG9uVGV4dCIsInNhdmVFeHByZXNzaW9uIiwiaXNTdGlja3lTZXNzaW9uU3VwcG9ydGVkIiwic3RhcnRpbmdFbnRpdHlTZXQiLCJJc0NyZWF0ZU1vZGVTdGlja3kiLCJEcmFmdCIsIklzTmV3T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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LENBQXZCO0FBQ0E7O0FBQ0QsV0FBT1QsY0FBYyxDQUFDVyxjQUFELENBQXJCO0FBQ0EsR0FaTSIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiLy8gRm9ybWF0dGVycyBmb3IgdGhlIE9iamVjdCBQYWdlXG5pbXBvcnQge1xuXHRhbmQsXG5cdGlmRWxzZSxcblx0aXNFbXB0eSxcblx0Y29uY2F0LFxuXHRhbm5vdGF0aW9uRXhwcmVzc2lvbixcblx0Y29tcGlsZUJpbmRpbmcsXG5cdEJpbmRpbmdFeHByZXNzaW9uXG59IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzL0JpbmRpbmdFeHByZXNzaW9uXCI7XG5pbXBvcnQgeyBVSSwgRHJhZnQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0JpbmRpbmdIZWxwZXJcIjtcbmltcG9ydCB7IENvbW1vblV0aWxzLCBWaWV3RGF0YSB9IGZyb20gXCJzYXAvZmUvY29yZVwiO1xuaW1wb3J0IHsgSGVhZGVySW5mb1R5cGUgfSBmcm9tIFwiQHNhcC11eC92b2NhYnVsYXJpZXMtdHlwZXNcIjtcbmltcG9ydCB7IERhdGFNb2RlbE9iamVjdFBhdGggfSBmcm9tIFwic2FwL2ZlL2NvcmUvdGVtcGxhdGluZy9EYXRhTW9kZWxQYXRoSGVscGVyXCI7XG5pbXBvcnQgeyBhZGRUZXh0QXJyYW5nZW1lbnRUb0JpbmRpbmdFeHByZXNzaW9uLCBmb3JtYXRWYWx1ZVJlY3Vyc2l2ZWx5IH0gZnJvbSBcInNhcC9mZS9tYWNyb3MvZmllbGQvRmllbGRUZW1wbGF0aW5nXCI7XG5pbXBvcnQgeyBEYXRhRmllbGRUeXBlcyB9IGZyb20gXCJAc2FwLXV4L3ZvY2FidWxhcmllcy10eXBlcy9kaXN0L2dlbmVyYXRlZC9VSVwiO1xuaW1wb3J0IHsgaXNTdGlja3lTZXNzaW9uU3VwcG9ydGVkIH0gZnJvbSBcInNhcC9mZS9jb3JlL3RlbXBsYXRpbmcvRW50aXR5U2V0SGVscGVyXCI7XG5cbi8vYGBgbWVybWFpZFxuLy8gZ3JhcGggVERcbi8vIEFbT2JqZWN0IFBhZ2UgVGl0bGVdIC0tPnxHZXQgRGF0YUZpZWxkIFZhbHVlfCBDe0V2YWx1YXRlIENyZWF0ZSBNb2RlfVxuLy8gQyAtLT58SW4gQ3JlYXRlIE1vZGV8IER7SXMgRGF0YUZpZWxkIFZhbHVlIGVtcHR5fVxuLy8gRCAtLT58WWVzfCBGe0lzIHRoZXJlIGEgVHlwZU5hbWV9XG4vLyBGIC0tPnxZZXN8IEdbSXMgdGhlcmUgYW4gY3VzdG9tIHRpdGxlXVxuLy8gRyAtLT58WWVzfCBHMVtTaG93IHRoZSBjdXN0b20gdGl0bGUgKyAnVHlwZU5hbWUnXVxuLy8gRyAtLT58Tm98IEcyW0Rpc3BsYXkgdGhlIGRlZmF1bHQgdGl0bGUgJ05ldyArIFR5cGVOYW1lJ11cbi8vIEYgLS0+fE5vfCBIW0lzIHRoZXJlIGEgY3VzdG9tIHRpdGxlXVxuLy8gSCAtLT58WWVzfCBJW1Nob3cgdGhlIGN1c3RvbSB0aXRsZV1cbi8vIEggLS0+fE5vfCBKW1Nob3cgdGhlIGRlZmF1bHQgJ1VuYW1uZWQgT2JqZWN0J11cbi8vIEQgLS0+fE5vfCBFXG4vLyBDIC0tPnxOb3QgaW4gY3JlYXRlIG1vZGV8IEVbU2hvdyBEYXRhRmllbGQgVmFsdWVdXG4vLyBgYGBcbi8qKlxuICogQ29tcHV0ZSB0aGUgdGl0bGUgZm9yIHRoZSBvYmplY3QgcGFnZS5cbiAqXG4gKiBAcGFyYW0gb0hlYWRlckluZm8gVGhlIEBVSS5IZWFkZXJJbmZvIGFubm90YXRpb24gY29udGVudFxuICogQHBhcmFtIG9WaWV3RGF0YSBUaGUgdmlldyBkYXRhIG9iamVjdCB3ZSdyZSBjdXJyZW50bHkgb25cbiAqIEBwYXJhbSBmdWxsQ29udGV4dFBhdGggVGhlIGZ1bGwgY29udGV4dCBwYXRoIHVzZWQgdG8gcmVhY2ggdGhhdCBvYmplY3QgcGFnZVxuICogQHJldHVybnMgVGhlIGJpbmRpbmcgZXhwcmVzc2lvbiBmb3IgdGhlIG9iamVjdCBwYWdlIHRpdGxlXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRFeHByZXNzaW9uRm9yVGl0bGUgPSBmdW5jdGlvbihcblx0b0hlYWRlckluZm86IEhlYWRlckluZm9UeXBlIHwgdW5kZWZpbmVkLFxuXHRvVmlld0RhdGE6IFZpZXdEYXRhLFxuXHRmdWxsQ29udGV4dFBhdGg6IERhdGFNb2RlbE9iamVjdFBhdGhcbik6IEJpbmRpbmdFeHByZXNzaW9uPHN0cmluZz4ge1xuXHRjb25zdCB0aXRsZU5vSGVhZGVySW5mbyA9IENvbW1vblV0aWxzLmdldFRyYW5zbGF0ZWRUZXh0KFwiVF9ORVdfT0JKRUNUXCIsIG9WaWV3RGF0YS5yZXNvdXJjZUJ1bmRsZSwgbnVsbCwgb1ZpZXdEYXRhLmVudGl0eVNldCk7XG5cblx0Y29uc3QgdGl0bGVXaXRoSGVhZGVySW5mbyA9IENvbW1vblV0aWxzLmdldFRyYW5zbGF0ZWRUZXh0KFxuXHRcdFwiVF9BTk5PVEFUSU9OX0hFTFBFUl9ERUZBVUxUX09CSkVDVF9QQUdFX0hFQURFUl9USVRMRVwiLFxuXHRcdG9WaWV3RGF0YS5yZXNvdXJjZUJ1bmRsZSxcblx0XHRudWxsLFxuXHRcdG9WaWV3RGF0YS5lbnRpdHlTZXRcblx0KTtcblxuXHRjb25zdCBvRW1wdHlIZWFkZXJJbmZvVGl0bGUgPVxuXHRcdG9IZWFkZXJJbmZvPy5UaXRsZSA9PT0gdW5kZWZpbmVkIHx8IG9IZWFkZXJJbmZvPy5UaXRsZSA9PT0gXCJcIiB8fCAob0hlYWRlckluZm8/LlRpdGxlIGFzIERhdGFGaWVsZFR5cGVzKT8uVmFsdWUgPT09IFwiXCI7XG5cblx0Y29uc3QgdGl0bGVGb3JBY3RpdmVIZWFkZXJOb0hlYWRlckluZm8gPSAhb0VtcHR5SGVhZGVySW5mb1RpdGxlXG5cdFx0PyBDb21tb25VdGlscy5nZXRUcmFuc2xhdGVkVGV4dChcIlRfQU5OT1RBVElPTl9IRUxQRVJfREVGQVVMVF9PQkpFQ1RfUEFHRV9IRUFERVJfVElUTEVfTk9fSEVBREVSX0lORk9cIiwgb1ZpZXdEYXRhLnJlc291cmNlQnVuZGxlKVxuXHRcdDogXCJcIjtcblxuXHRsZXQgdGl0bGVWYWx1ZUV4cHJlc3Npb24gPSBhbm5vdGF0aW9uRXhwcmVzc2lvbigob0hlYWRlckluZm8/LlRpdGxlIGFzIERhdGFGaWVsZFR5cGVzKT8uVmFsdWUpO1xuXHRpZiAoKG9IZWFkZXJJbmZvPy5UaXRsZSBhcyBEYXRhRmllbGRUeXBlcyk/LlZhbHVlPy4kdGFyZ2V0Py5hbm5vdGF0aW9ucz8uQ29tbW9uPy5UZXh0Py5hbm5vdGF0aW9ucz8uVUk/LlRleHRBcnJhbmdlbWVudCkge1xuXHRcdC8vIEluIGNhc2UgYW4gZXhwbGljaXQgdGV4dCBhcnJhbmdlbWVudCB3YXMgc2V0IHdlIG1ha2UgdXNlIG9mIGl0IGluIHRoZSBkZXNjcmlwdGlvbiBhcyB3ZWxsXG5cdFx0dGl0bGVWYWx1ZUV4cHJlc3Npb24gPSBhZGRUZXh0QXJyYW5nZW1lbnRUb0JpbmRpbmdFeHByZXNzaW9uKHRpdGxlVmFsdWVFeHByZXNzaW9uLCBmdWxsQ29udGV4dFBhdGgpO1xuXHR9XG5cblx0dGl0bGVWYWx1ZUV4cHJlc3Npb24gPSBmb3JtYXRWYWx1ZVJlY3Vyc2l2ZWx5KHRpdGxlVmFsdWVFeHByZXNzaW9uLCBmdWxsQ29udGV4dFBhdGgpO1xuXG5cdC8vIElmIHRoZXJlIGlzIGEgVHlwZU5hbWUgZGVmaW5lZCwgc2hvdyB0aGUgZGVmYXVsdCB0aXRsZSAnTmV3ICsgVHlwZU5hbWUnLCBvdGhlcndpc2Ugc2hvdyB0aGUgY3VzdG9tIHRpdGxlIG9yIHRoZSBkZWZhdWx0ICdOZXcgb2JqZWN0J1xuXHRjb25zdCBjcmVhdGVNb2RlVGl0bGUgPSBvSGVhZGVySW5mbz8uVHlwZU5hbWVcblx0XHQ/IGNvbmNhdCh0aXRsZVdpdGhIZWFkZXJJbmZvLCBcIiBcIiwgYW5ub3RhdGlvbkV4cHJlc3Npb24ob0hlYWRlckluZm8uVHlwZU5hbWUudG9TdHJpbmcoKSkpXG5cdFx0OiB0aXRsZU5vSGVhZGVySW5mbztcblxuXHRyZXR1cm4gY29tcGlsZUJpbmRpbmcoXG5cdFx0aWZFbHNlKFxuXHRcdFx0Ly8gSWYgQ3JlYXRlIE1vZGUgJiYgRW1wdHkgZXhwcmVzc2lvblxuXHRcdFx0YW5kKFVJLklzQ3JlYXRlTW9kZSwgdGl0bGVWYWx1ZUV4cHJlc3Npb24gJiYgaXNFbXB0eSh0aXRsZVZhbHVlRXhwcmVzc2lvbikpLFxuXG5cdFx0XHRjcmVhdGVNb2RlVGl0bGUsXG5cdFx0XHQvLyBPdGhlcndpc2Ugc2hvdyB0aGUgZGVmYXVsdCBleHByZXNzaW9uXG5cdFx0XHRpZkVsc2UodGl0bGVWYWx1ZUV4cHJlc3Npb24gJiYgaXNFbXB0eSh0aXRsZVZhbHVlRXhwcmVzc2lvbiksIHRpdGxlRm9yQWN0aXZlSGVhZGVyTm9IZWFkZXJJbmZvLCB0aXRsZVZhbHVlRXhwcmVzc2lvbilcblx0XHQpXG5cdCk7XG59O1xuXG4vKipcbiAqIFJldHJpZXZlcyB0aGUgZXhwcmVzc2lvbiBmb3IgdGhlIGRlc2NyaXB0aW9uIG9mIGFuIG9iamVjdCBwYWdlLlxuICpcbiAqIEBwYXJhbSBvSGVhZGVySW5mbyBUaGUgQFVJLkhlYWRlckluZm8gYW5ub3RhdGlvbiBjb250ZW50XG4gKiBAcGFyYW0gZnVsbENvbnRleHRQYXRoIFRoZSBmdWxsIGNvbnRleHQgcGF0aCB1c2VkIHRvIHJlYWNoIHRoYXQgb2JqZWN0IHBhZ2VcbiAqIEByZXR1cm5zIFRoZSBiaW5kaW5nIGV4cHJlc3Npb24gZm9yIHRoZSBvYmplY3QgcGFnZSBkZXNjcmlwdGlvblxuICovXG5leHBvcnQgY29uc3QgZ2V0RXhwcmVzc2lvbkZvckRlc2NyaXB0aW9uID0gZnVuY3Rpb24oXG5cdG9IZWFkZXJJbmZvOiBIZWFkZXJJbmZvVHlwZSB8IHVuZGVmaW5lZCxcblx0ZnVsbENvbnRleHRQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoXG4pOiBCaW5kaW5nRXhwcmVzc2lvbjxzdHJpbmc+IHtcblx0bGV0IGJpbmRpbmdFeHByZXNzaW9uID0gYW5ub3RhdGlvbkV4cHJlc3Npb24oKG9IZWFkZXJJbmZvPy5EZXNjcmlwdGlvbiBhcyBEYXRhRmllbGRUeXBlcyk/LlZhbHVlKTtcblx0aWYgKChvSGVhZGVySW5mbz8uRGVzY3JpcHRpb24gYXMgRGF0YUZpZWxkVHlwZXMpPy5WYWx1ZT8uJHRhcmdldD8uYW5ub3RhdGlvbnM/LkNvbW1vbj8uVGV4dD8uYW5ub3RhdGlvbnM/LlVJPy5UZXh0QXJyYW5nZW1lbnQpIHtcblx0XHQvLyBJbiBjYXNlIGFuIGV4cGxpY2l0IHRleHQgYXJyYW5nZW1lbnQgd2FzIHNldCB3ZSBtYWtlIHVzZSBvZiBpdCBpbiB0aGUgZGVzY3JpcHRpb24gYXMgd2VsbFxuXHRcdGJpbmRpbmdFeHByZXNzaW9uID0gYWRkVGV4dEFycmFuZ2VtZW50VG9CaW5kaW5nRXhwcmVzc2lvbihiaW5kaW5nRXhwcmVzc2lvbiwgZnVsbENvbnRleHRQYXRoKTtcblx0fVxuXG5cdHJldHVybiBjb21waWxlQmluZGluZyhmb3JtYXRWYWx1ZVJlY3Vyc2l2ZWx5KGJpbmRpbmdFeHByZXNzaW9uLCBmdWxsQ29udGV4dFBhdGgpKTtcbn07XG5cbi8qKlxuICogUmV0dXJuIHRoZSBleHByZXNzaW9uIGZvciB0aGUgc2F2ZSBidXR0b24uXG4gKlxuICogQHBhcmFtIG9WaWV3RGF0YSBUaGUgY3VycmVudCB2aWV3IGRhdGFcbiAqIEBwYXJhbSBmdWxsQ29udGV4dFBhdGggVGhlIHBhdGggdXNlZCB1cCB1bnRpbCBoZXJlXG4gKiBAcmV0dXJucyBUaGUgYmluZGluZyBleHByZXNzaW9uIHRoYXQgc2hvd3MgdGhlIHJpZ2h0IHNhdmUgYnV0dG9uIHRleHRcbiAqL1xuZXhwb3J0IGNvbnN0IGdldEV4cHJlc3Npb25Gb3JTYXZlQnV0dG9uID0gZnVuY3Rpb24ob1ZpZXdEYXRhOiBWaWV3RGF0YSwgZnVsbENvbnRleHRQYXRoOiBEYXRhTW9kZWxPYmplY3RQYXRoKTogQmluZGluZ0V4cHJlc3Npb248c3RyaW5nPiB7XG5cdGNvbnN0IHNhdmVCdXR0b25UZXh0ID0gQ29tbW9uVXRpbHMuZ2V0VHJhbnNsYXRlZFRleHQoXCJUX09QX09CSkVDVF9QQUdFX1NBVkVcIiwgb1ZpZXdEYXRhLnJlc291cmNlQnVuZGxlKTtcblx0Y29uc3QgY3JlYXRlQnV0dG9uVGV4dCA9IENvbW1vblV0aWxzLmdldFRyYW5zbGF0ZWRUZXh0KFwiVF9PUF9PQkpFQ1RfUEFHRV9DUkVBVEVcIiwgb1ZpZXdEYXRhLnJlc291cmNlQnVuZGxlKTtcblx0bGV0IHNhdmVFeHByZXNzaW9uO1xuXHRpZiAoaXNTdGlja3lTZXNzaW9uU3VwcG9ydGVkKGZ1bGxDb250ZXh0UGF0aC5zdGFydGluZ0VudGl0eVNldCkpIHtcblx0XHQvLyBJZiB3ZSdyZSBpbiBzdGlja3kgbW9kZSBBTkQgdGhlIHVpIGlzIGluIGNyZWF0ZSBtb2RlLCBzaG93IENyZWF0ZSwgZWxzZSBzaG93IFNhdmVcblx0XHRzYXZlRXhwcmVzc2lvbiA9IGlmRWxzZShVSS5Jc0NyZWF0ZU1vZGVTdGlja3ksIGNyZWF0ZUJ1dHRvblRleHQsIHNhdmVCdXR0b25UZXh0KTtcblx0fSBlbHNlIHtcblx0XHQvLyBJZiB3ZSdyZSBpbiBkcmFmdCBBTkQgdGhlIGRyYWZ0IGlzIGEgbmV3IG9iamVjdCAoIUlzQWN0aXZlRW50aXR5ICYmICFIYXNBY3RpdmVFbnRpdHkpLCBzaG93IGNyZWF0ZSwgZWxzZSBzaG93IHNhdmVcblx0XHRzYXZlRXhwcmVzc2lvbiA9IGlmRWxzZShEcmFmdC5Jc05ld09iamVjdCwgY3JlYXRlQnV0dG9uVGV4dCwgc2F2ZUJ1dHRvblRleHQpO1xuXHR9XG5cdHJldHVybiBjb21waWxlQmluZGluZyhzYXZlRXhwcmVzc2lvbik7XG59O1xuIl19