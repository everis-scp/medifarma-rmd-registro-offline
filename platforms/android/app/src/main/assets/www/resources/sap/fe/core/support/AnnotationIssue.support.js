/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/support/CommonHelper", "sap/fe/core/converters/helpers/IssueManager"], function (CommonHelper, IssueManager) {
  "use strict";

  var _exports = {};
  var IssueCategory = IssueManager.IssueCategory;
  var Audiences = CommonHelper.Audiences;
  var getIssueByCategory = CommonHelper.getIssueByCategory;
  var Categories = CommonHelper.Categories;

  var oAnnotationIssue = {
    id: "annotationIssue",
    title: "Annotations: Incorrect path or target",
    minversion: "1.85",
    audiences: [Audiences.Application],
    categories: [Categories.Usage],
    description: "This rule identifies the incorrect path or targets defined in the metadata of the annotation.xml file or CDS annotations.",
    resolution: "Please review the message details for more information.",
    resolutionurls: [{
      "text": "CDS Annotations reference",
      "href": "https://cap.cloud.sap/docs/cds/common"
    }],
    check: function (oIssueManager, oCoreFacade)
    /*oScope: any*/
    {
      getIssueByCategory(oIssueManager, oCoreFacade, IssueCategory.Annotation);
    }
  };

  function getRules() {
    return [oAnnotationIssue];
  }

  _exports.getRules = getRules;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFubm90YXRpb25Jc3N1ZS5zdXBwb3J0LnRzIl0sIm5hbWVzIjpbIm9Bbm5vdGF0aW9uSXNzdWUiLCJpZCIsInRpdGxlIiwibWludmVyc2lvbiIsImF1ZGllbmNlcyIsIkF1ZGllbmNlcyIsIkFwcGxpY2F0aW9uIiwiY2F0ZWdvcmllcyIsIkNhdGVnb3JpZXMiLCJVc2FnZSIsImRlc2NyaXB0aW9uIiwicmVzb2x1dGlvbiIsInJlc29sdXRpb251cmxzIiwiY2hlY2siLCJvSXNzdWVNYW5hZ2VyIiwib0NvcmVGYWNhZGUiLCJnZXRJc3N1ZUJ5Q2F0ZWdvcnkiLCJJc3N1ZUNhdGVnb3J5IiwiQW5ub3RhdGlvbiIsImdldFJ1bGVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0EsTUFBTUEsZ0JBQWdCLEdBQUc7QUFDeEJDLElBQUFBLEVBQUUsRUFBRSxpQkFEb0I7QUFFeEJDLElBQUFBLEtBQUssRUFBRSx1Q0FGaUI7QUFHeEJDLElBQUFBLFVBQVUsRUFBRSxNQUhZO0FBSXhCQyxJQUFBQSxTQUFTLEVBQUUsQ0FBQ0MsU0FBUyxDQUFDQyxXQUFYLENBSmE7QUFLeEJDLElBQUFBLFVBQVUsRUFBRSxDQUFDQyxVQUFVLENBQUNDLEtBQVosQ0FMWTtBQU14QkMsSUFBQUEsV0FBVyxFQUNWLDJIQVB1QjtBQVF4QkMsSUFBQUEsVUFBVSxFQUFFLHlEQVJZO0FBU3hCQyxJQUFBQSxjQUFjLEVBQUUsQ0FBQztBQUFFLGNBQVEsMkJBQVY7QUFBdUMsY0FBUTtBQUEvQyxLQUFELENBVFE7QUFVeEJDLElBQUFBLEtBQUssRUFBRSxVQUFTQyxhQUFULEVBQTZCQyxXQUE3QjtBQUE4QztBQUFpQjtBQUNyRUMsTUFBQUEsa0JBQWtCLENBQUNGLGFBQUQsRUFBZ0JDLFdBQWhCLEVBQTZCRSxhQUFhLENBQUNDLFVBQTNDLENBQWxCO0FBQ0E7QUFadUIsR0FBekI7O0FBY08sV0FBU0MsUUFBVCxHQUFvQjtBQUMxQixXQUFPLENBQUNuQixnQkFBRCxDQUFQO0FBQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhdGVnb3JpZXMsIGdldElzc3VlQnlDYXRlZ29yeSwgQXVkaWVuY2VzIH0gZnJvbSBcInNhcC9mZS9jb3JlL3N1cHBvcnQvQ29tbW9uSGVscGVyXCI7XG5pbXBvcnQgeyBJc3N1ZUNhdGVnb3J5IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Jc3N1ZU1hbmFnZXJcIjtcblxuY29uc3Qgb0Fubm90YXRpb25Jc3N1ZSA9IHtcblx0aWQ6IFwiYW5ub3RhdGlvbklzc3VlXCIsXG5cdHRpdGxlOiBcIkFubm90YXRpb25zOiBJbmNvcnJlY3QgcGF0aCBvciB0YXJnZXRcIixcblx0bWludmVyc2lvbjogXCIxLjg1XCIsXG5cdGF1ZGllbmNlczogW0F1ZGllbmNlcy5BcHBsaWNhdGlvbl0sXG5cdGNhdGVnb3JpZXM6IFtDYXRlZ29yaWVzLlVzYWdlXSxcblx0ZGVzY3JpcHRpb246XG5cdFx0XCJUaGlzIHJ1bGUgaWRlbnRpZmllcyB0aGUgaW5jb3JyZWN0IHBhdGggb3IgdGFyZ2V0cyBkZWZpbmVkIGluIHRoZSBtZXRhZGF0YSBvZiB0aGUgYW5ub3RhdGlvbi54bWwgZmlsZSBvciBDRFMgYW5ub3RhdGlvbnMuXCIsXG5cdHJlc29sdXRpb246IFwiUGxlYXNlIHJldmlldyB0aGUgbWVzc2FnZSBkZXRhaWxzIGZvciBtb3JlIGluZm9ybWF0aW9uLlwiLFxuXHRyZXNvbHV0aW9udXJsczogW3sgXCJ0ZXh0XCI6IFwiQ0RTIEFubm90YXRpb25zIHJlZmVyZW5jZVwiLCBcImhyZWZcIjogXCJodHRwczovL2NhcC5jbG91ZC5zYXAvZG9jcy9jZHMvY29tbW9uXCIgfV0sXG5cdGNoZWNrOiBmdW5jdGlvbihvSXNzdWVNYW5hZ2VyOiBhbnksIG9Db3JlRmFjYWRlOiBhbnkgLypvU2NvcGU6IGFueSovKSB7XG5cdFx0Z2V0SXNzdWVCeUNhdGVnb3J5KG9Jc3N1ZU1hbmFnZXIsIG9Db3JlRmFjYWRlLCBJc3N1ZUNhdGVnb3J5LkFubm90YXRpb24pO1xuXHR9XG59O1xuZXhwb3J0IGZ1bmN0aW9uIGdldFJ1bGVzKCkge1xuXHRyZXR1cm4gW29Bbm5vdGF0aW9uSXNzdWVdO1xufVxuIl19