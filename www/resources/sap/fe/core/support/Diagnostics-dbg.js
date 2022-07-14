/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([], function () {
  "use strict";

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  var Diagnostics = /*#__PURE__*/function () {
    function Diagnostics() {
      _classCallCheck(this, Diagnostics);

      this._issues = [];
    }

    _createClass(Diagnostics, [{
      key: "addIssue",
      value: function addIssue(issueCategory, issueSeverity, details, issueCategoryType, subCategory) {
        var checkIfIssueExists = this.checkIfIssueExists(issueCategory, issueSeverity, details, issueCategoryType, subCategory);

        if (!checkIfIssueExists) {
          this._issues.push({
            category: issueCategory,
            severity: issueSeverity,
            details: details,
            subCategory: subCategory
          });
        }
      }
    }, {
      key: "getIssues",
      value: function getIssues() {
        return this._issues;
      }
    }, {
      key: "getIssuesByCategory",
      value: function getIssuesByCategory(inCategory, subCategory) {
        if (subCategory) {
          return this._issues.filter(function (issue) {
            return issue.category === inCategory && issue.subCategory === subCategory;
          });
        } else {
          return this._issues.filter(function (issue) {
            return issue.category === inCategory;
          });
        }
      }
    }, {
      key: "checkIfIssueExists",
      value: function checkIfIssueExists(inCategory, severity, details, issueCategoryType, issueSubCategory) {
        if (issueCategoryType && issueCategoryType[inCategory] && issueSubCategory) {
          return this._issues.some(function (issue) {
            return issue.category === inCategory && issue.severity === severity && issue.details.replace(/\n/g, "") === details.replace(/\n/g, "") && issue.subCategory === issueSubCategory;
          });
        }

        return this._issues.some(function (issue) {
          return issue.category === inCategory && issue.severity === severity && issue.details.replace(/\n/g, "") === details.replace(/\n/g, "");
        });
      }
    }]);

    return Diagnostics;
  }();

  return Diagnostics;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkRpYWdub3N0aWNzLnRzIl0sIm5hbWVzIjpbIkRpYWdub3N0aWNzIiwiX2lzc3VlcyIsImlzc3VlQ2F0ZWdvcnkiLCJpc3N1ZVNldmVyaXR5IiwiZGV0YWlscyIsImlzc3VlQ2F0ZWdvcnlUeXBlIiwic3ViQ2F0ZWdvcnkiLCJjaGVja0lmSXNzdWVFeGlzdHMiLCJwdXNoIiwiY2F0ZWdvcnkiLCJzZXZlcml0eSIsImluQ2F0ZWdvcnkiLCJmaWx0ZXIiLCJpc3N1ZSIsImlzc3VlU3ViQ2F0ZWdvcnkiLCJzb21lIiwicmVwbGFjZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztNQVFNQSxXO0FBRUwsMkJBQWM7QUFBQTs7QUFDYixXQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBOzs7OytCQUVBQyxhLEVBQ0FDLGEsRUFDQUMsTyxFQUNBQyxpQixFQUNBQyxXLEVBQ087QUFDUCxZQUFNQyxrQkFBa0IsR0FBRyxLQUFLQSxrQkFBTCxDQUF3QkwsYUFBeEIsRUFBdUNDLGFBQXZDLEVBQXNEQyxPQUF0RCxFQUErREMsaUJBQS9ELEVBQWtGQyxXQUFsRixDQUEzQjs7QUFDQSxZQUFJLENBQUNDLGtCQUFMLEVBQXlCO0FBQ3hCLGVBQUtOLE9BQUwsQ0FBYU8sSUFBYixDQUFrQjtBQUNqQkMsWUFBQUEsUUFBUSxFQUFFUCxhQURPO0FBRWpCUSxZQUFBQSxRQUFRLEVBQUVQLGFBRk87QUFHakJDLFlBQUFBLE9BQU8sRUFBRUEsT0FIUTtBQUlqQkUsWUFBQUEsV0FBVyxFQUFFQTtBQUpJLFdBQWxCO0FBTUE7QUFDRDs7O2tDQUM4QjtBQUM5QixlQUFPLEtBQUtMLE9BQVo7QUFDQTs7OzBDQUNtQlUsVSxFQUEyQkwsVyxFQUF5QztBQUN2RixZQUFJQSxXQUFKLEVBQWlCO0FBQ2hCLGlCQUFPLEtBQUtMLE9BQUwsQ0FBYVcsTUFBYixDQUFvQixVQUFBQyxLQUFLO0FBQUEsbUJBQUlBLEtBQUssQ0FBQ0osUUFBTixLQUFtQkUsVUFBbkIsSUFBaUNFLEtBQUssQ0FBQ1AsV0FBTixLQUFzQkEsV0FBM0Q7QUFBQSxXQUF6QixDQUFQO0FBQ0EsU0FGRCxNQUVPO0FBQ04saUJBQU8sS0FBS0wsT0FBTCxDQUFhVyxNQUFiLENBQW9CLFVBQUFDLEtBQUs7QUFBQSxtQkFBSUEsS0FBSyxDQUFDSixRQUFOLEtBQW1CRSxVQUF2QjtBQUFBLFdBQXpCLENBQVA7QUFDQTtBQUNEOzs7eUNBRUFBLFUsRUFDQUQsUSxFQUNBTixPLEVBQ0FDLGlCLEVBQ0FTLGdCLEVBQ1U7QUFDVixZQUFJVCxpQkFBaUIsSUFBSUEsaUJBQWlCLENBQUNNLFVBQUQsQ0FBdEMsSUFBc0RHLGdCQUExRCxFQUE0RTtBQUMzRSxpQkFBTyxLQUFLYixPQUFMLENBQWFjLElBQWIsQ0FDTixVQUFBRixLQUFLO0FBQUEsbUJBQ0pBLEtBQUssQ0FBQ0osUUFBTixLQUFtQkUsVUFBbkIsSUFDQUUsS0FBSyxDQUFDSCxRQUFOLEtBQW1CQSxRQURuQixJQUVBRyxLQUFLLENBQUNULE9BQU4sQ0FBY1ksT0FBZCxDQUFzQixLQUF0QixFQUE2QixFQUE3QixNQUFxQ1osT0FBTyxDQUFDWSxPQUFSLENBQWdCLEtBQWhCLEVBQXVCLEVBQXZCLENBRnJDLElBR0FILEtBQUssQ0FBQ1AsV0FBTixLQUFzQlEsZ0JBSmxCO0FBQUEsV0FEQyxDQUFQO0FBT0E7O0FBQ0QsZUFBTyxLQUFLYixPQUFMLENBQWFjLElBQWIsQ0FDTixVQUFBRixLQUFLO0FBQUEsaUJBQ0pBLEtBQUssQ0FBQ0osUUFBTixLQUFtQkUsVUFBbkIsSUFDQUUsS0FBSyxDQUFDSCxRQUFOLEtBQW1CQSxRQURuQixJQUVBRyxLQUFLLENBQUNULE9BQU4sQ0FBY1ksT0FBZCxDQUFzQixLQUF0QixFQUE2QixFQUE3QixNQUFxQ1osT0FBTyxDQUFDWSxPQUFSLENBQWdCLEtBQWhCLEVBQXVCLEVBQXZCLENBSGpDO0FBQUEsU0FEQyxDQUFQO0FBTUE7Ozs7OztTQUdhaEIsVyIsInNvdXJjZVJvb3QiOiIuIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSXNzdWVDYXRlZ29yeSwgSXNzdWVTZXZlcml0eSB9IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL2hlbHBlcnMvSXNzdWVNYW5hZ2VyXCI7XG5cbmV4cG9ydCB0eXBlIElzc3VlRGVmaW5pdGlvbiA9IHtcblx0Y2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnk7XG5cdHNldmVyaXR5OiBJc3N1ZVNldmVyaXR5O1xuXHRkZXRhaWxzOiBzdHJpbmc7XG5cdHN1YkNhdGVnb3J5Pzogc3RyaW5nIHwgdW5kZWZpbmVkO1xufTtcbmNsYXNzIERpYWdub3N0aWNzIHtcblx0X2lzc3VlczogSXNzdWVEZWZpbml0aW9uW107XG5cdGNvbnN0cnVjdG9yKCkge1xuXHRcdHRoaXMuX2lzc3VlcyA9IFtdO1xuXHR9XG5cdGFkZElzc3VlKFxuXHRcdGlzc3VlQ2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnksXG5cdFx0aXNzdWVTZXZlcml0eTogSXNzdWVTZXZlcml0eSxcblx0XHRkZXRhaWxzOiBzdHJpbmcsXG5cdFx0aXNzdWVDYXRlZ29yeVR5cGU/OiBhbnkgfCB1bmRlZmluZWQsXG5cdFx0c3ViQ2F0ZWdvcnk/OiBzdHJpbmcgfCB1bmRlZmluZWRcblx0KTogdm9pZCB7XG5cdFx0Y29uc3QgY2hlY2tJZklzc3VlRXhpc3RzID0gdGhpcy5jaGVja0lmSXNzdWVFeGlzdHMoaXNzdWVDYXRlZ29yeSwgaXNzdWVTZXZlcml0eSwgZGV0YWlscywgaXNzdWVDYXRlZ29yeVR5cGUsIHN1YkNhdGVnb3J5KTtcblx0XHRpZiAoIWNoZWNrSWZJc3N1ZUV4aXN0cykge1xuXHRcdFx0dGhpcy5faXNzdWVzLnB1c2goe1xuXHRcdFx0XHRjYXRlZ29yeTogaXNzdWVDYXRlZ29yeSxcblx0XHRcdFx0c2V2ZXJpdHk6IGlzc3VlU2V2ZXJpdHksXG5cdFx0XHRcdGRldGFpbHM6IGRldGFpbHMsXG5cdFx0XHRcdHN1YkNhdGVnb3J5OiBzdWJDYXRlZ29yeVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cdGdldElzc3VlcygpOiBJc3N1ZURlZmluaXRpb25bXSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lzc3Vlcztcblx0fVxuXHRnZXRJc3N1ZXNCeUNhdGVnb3J5KGluQ2F0ZWdvcnk6IElzc3VlQ2F0ZWdvcnksIHN1YkNhdGVnb3J5Pzogc3RyaW5nKTogSXNzdWVEZWZpbml0aW9uW10ge1xuXHRcdGlmIChzdWJDYXRlZ29yeSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2lzc3Vlcy5maWx0ZXIoaXNzdWUgPT4gaXNzdWUuY2F0ZWdvcnkgPT09IGluQ2F0ZWdvcnkgJiYgaXNzdWUuc3ViQ2F0ZWdvcnkgPT09IHN1YkNhdGVnb3J5KTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2lzc3Vlcy5maWx0ZXIoaXNzdWUgPT4gaXNzdWUuY2F0ZWdvcnkgPT09IGluQ2F0ZWdvcnkpO1xuXHRcdH1cblx0fVxuXHRjaGVja0lmSXNzdWVFeGlzdHMoXG5cdFx0aW5DYXRlZ29yeTogSXNzdWVDYXRlZ29yeSxcblx0XHRzZXZlcml0eTogSXNzdWVTZXZlcml0eSxcblx0XHRkZXRhaWxzOiBzdHJpbmcsXG5cdFx0aXNzdWVDYXRlZ29yeVR5cGU/OiBhbnksXG5cdFx0aXNzdWVTdWJDYXRlZ29yeT86IHN0cmluZ1xuXHQpOiBib29sZWFuIHtcblx0XHRpZiAoaXNzdWVDYXRlZ29yeVR5cGUgJiYgaXNzdWVDYXRlZ29yeVR5cGVbaW5DYXRlZ29yeV0gJiYgaXNzdWVTdWJDYXRlZ29yeSkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX2lzc3Vlcy5zb21lKFxuXHRcdFx0XHRpc3N1ZSA9PlxuXHRcdFx0XHRcdGlzc3VlLmNhdGVnb3J5ID09PSBpbkNhdGVnb3J5ICYmXG5cdFx0XHRcdFx0aXNzdWUuc2V2ZXJpdHkgPT09IHNldmVyaXR5ICYmXG5cdFx0XHRcdFx0aXNzdWUuZGV0YWlscy5yZXBsYWNlKC9cXG4vZywgXCJcIikgPT09IGRldGFpbHMucmVwbGFjZSgvXFxuL2csIFwiXCIpICYmXG5cdFx0XHRcdFx0aXNzdWUuc3ViQ2F0ZWdvcnkgPT09IGlzc3VlU3ViQ2F0ZWdvcnlcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzLl9pc3N1ZXMuc29tZShcblx0XHRcdGlzc3VlID0+XG5cdFx0XHRcdGlzc3VlLmNhdGVnb3J5ID09PSBpbkNhdGVnb3J5ICYmXG5cdFx0XHRcdGlzc3VlLnNldmVyaXR5ID09PSBzZXZlcml0eSAmJlxuXHRcdFx0XHRpc3N1ZS5kZXRhaWxzLnJlcGxhY2UoL1xcbi9nLCBcIlwiKSA9PT0gZGV0YWlscy5yZXBsYWNlKC9cXG4vZywgXCJcIilcblx0XHQpO1xuXHR9XG59XG5cbmV4cG9ydCBkZWZhdWx0IERpYWdub3N0aWNzO1xuIl19