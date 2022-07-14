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

  var oCollectionFacetMissingIDIssue = {
    id: "collectionFacetMissingId",
    title: "CollectionFacet: Missing IDs",
    minversion: "1.85",
    audiences: [Audiences.Application],
    categories: [Categories.Usage],
    description: "A collection facet requires an ID in the annotation file to derive a control ID from it.",
    resolution: "Always provide a unique ID to a collection facet.",
    resolutionurls: [{
      "text": "CollectionFacets",
      "href": "https://ui5.sap.com/#/topic/facfea09018d4376acaceddb7e3f03b6"
    }],
    check: function (oIssueManager, oCoreFacade)
    /*oScope: any*/
    {
      getIssueByCategory(oIssueManager, oCoreFacade, IssueCategory.Facets, "MissingID");
    }
  };

  function getRules() {
    return [oCollectionFacetMissingIDIssue];
  }

  _exports.getRules = getRules;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkNvbGxlY3Rpb25GYWNldE1pc3NpbmdJRC5zdXBwb3J0LnRzIl0sIm5hbWVzIjpbIm9Db2xsZWN0aW9uRmFjZXRNaXNzaW5nSURJc3N1ZSIsImlkIiwidGl0bGUiLCJtaW52ZXJzaW9uIiwiYXVkaWVuY2VzIiwiQXVkaWVuY2VzIiwiQXBwbGljYXRpb24iLCJjYXRlZ29yaWVzIiwiQ2F0ZWdvcmllcyIsIlVzYWdlIiwiZGVzY3JpcHRpb24iLCJyZXNvbHV0aW9uIiwicmVzb2x1dGlvbnVybHMiLCJjaGVjayIsIm9Jc3N1ZU1hbmFnZXIiLCJvQ29yZUZhY2FkZSIsImdldElzc3VlQnlDYXRlZ29yeSIsIklzc3VlQ2F0ZWdvcnkiLCJGYWNldHMiLCJnZXRSdWxlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUVBLE1BQU1BLDhCQUE4QixHQUFHO0FBQ3RDQyxJQUFBQSxFQUFFLEVBQUUsMEJBRGtDO0FBRXRDQyxJQUFBQSxLQUFLLEVBQUUsOEJBRitCO0FBR3RDQyxJQUFBQSxVQUFVLEVBQUUsTUFIMEI7QUFJdENDLElBQUFBLFNBQVMsRUFBRSxDQUFDQyxTQUFTLENBQUNDLFdBQVgsQ0FKMkI7QUFLdENDLElBQUFBLFVBQVUsRUFBRSxDQUFDQyxVQUFVLENBQUNDLEtBQVosQ0FMMEI7QUFNdENDLElBQUFBLFdBQVcsRUFBRSwwRkFOeUI7QUFPdENDLElBQUFBLFVBQVUsRUFBRSxtREFQMEI7QUFRdENDLElBQUFBLGNBQWMsRUFBRSxDQUFDO0FBQUUsY0FBUSxrQkFBVjtBQUE4QixjQUFRO0FBQXRDLEtBQUQsQ0FSc0I7QUFTdENDLElBQUFBLEtBQUssRUFBRSxVQUFTQyxhQUFULEVBQTZCQyxXQUE3QjtBQUE4QztBQUFpQjtBQUNyRUMsTUFBQUEsa0JBQWtCLENBQUNGLGFBQUQsRUFBZ0JDLFdBQWhCLEVBQTZCRSxhQUFhLENBQUNDLE1BQTNDLEVBQW1ELFdBQW5ELENBQWxCO0FBQ0E7QUFYcUMsR0FBdkM7O0FBYU8sV0FBU0MsUUFBVCxHQUFvQjtBQUMxQixXQUFPLENBQUNuQiw4QkFBRCxDQUFQO0FBQ0EiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENhdGVnb3JpZXMsIGdldElzc3VlQnlDYXRlZ29yeSwgQXVkaWVuY2VzIH0gZnJvbSBcInNhcC9mZS9jb3JlL3N1cHBvcnQvQ29tbW9uSGVscGVyXCI7XG5pbXBvcnQgeyBJc3N1ZUNhdGVnb3J5IH0gZnJvbSBcInNhcC9mZS9jb3JlL2NvbnZlcnRlcnMvaGVscGVycy9Jc3N1ZU1hbmFnZXJcIjtcbmNvbnN0IG9Db2xsZWN0aW9uRmFjZXRNaXNzaW5nSURJc3N1ZSA9IHtcblx0aWQ6IFwiY29sbGVjdGlvbkZhY2V0TWlzc2luZ0lkXCIsXG5cdHRpdGxlOiBcIkNvbGxlY3Rpb25GYWNldDogTWlzc2luZyBJRHNcIixcblx0bWludmVyc2lvbjogXCIxLjg1XCIsXG5cdGF1ZGllbmNlczogW0F1ZGllbmNlcy5BcHBsaWNhdGlvbl0sXG5cdGNhdGVnb3JpZXM6IFtDYXRlZ29yaWVzLlVzYWdlXSxcblx0ZGVzY3JpcHRpb246IFwiQSBjb2xsZWN0aW9uIGZhY2V0IHJlcXVpcmVzIGFuIElEIGluIHRoZSBhbm5vdGF0aW9uIGZpbGUgdG8gZGVyaXZlIGEgY29udHJvbCBJRCBmcm9tIGl0LlwiLFxuXHRyZXNvbHV0aW9uOiBcIkFsd2F5cyBwcm92aWRlIGEgdW5pcXVlIElEIHRvIGEgY29sbGVjdGlvbiBmYWNldC5cIixcblx0cmVzb2x1dGlvbnVybHM6IFt7IFwidGV4dFwiOiBcIkNvbGxlY3Rpb25GYWNldHNcIiwgXCJocmVmXCI6IFwiaHR0cHM6Ly91aTUuc2FwLmNvbS8jL3RvcGljL2ZhY2ZlYTA5MDE4ZDQzNzZhY2FjZWRkYjdlM2YwM2I2XCIgfV0sXG5cdGNoZWNrOiBmdW5jdGlvbihvSXNzdWVNYW5hZ2VyOiBhbnksIG9Db3JlRmFjYWRlOiBhbnkgLypvU2NvcGU6IGFueSovKSB7XG5cdFx0Z2V0SXNzdWVCeUNhdGVnb3J5KG9Jc3N1ZU1hbmFnZXIsIG9Db3JlRmFjYWRlLCBJc3N1ZUNhdGVnb3J5LkZhY2V0cywgXCJNaXNzaW5nSURcIik7XG5cdH1cbn07XG5leHBvcnQgZnVuY3Rpb24gZ2V0UnVsZXMoKSB7XG5cdHJldHVybiBbb0NvbGxlY3Rpb25GYWNldE1pc3NpbmdJRElzc3VlXTtcbn1cbiJdfQ==