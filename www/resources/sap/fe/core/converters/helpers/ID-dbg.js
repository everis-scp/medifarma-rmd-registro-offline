/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../helpers/StableIdHelper"], function (StableIdHelper) {
  "use strict";

  var _exports = {};
  var generate = StableIdHelper.generate;

  var BASE_ID = ["fe"];
  /**
   * Shortcut to the stableIdHelper providing a "curry" like method where the last parameter is missing.
   *
   * @param sFixedPart
   * @returns {Function} A shortcut function with the fixed ID part
   */

  function IDGenerator() {
    for (var _len = arguments.length, sFixedPart = new Array(_len), _key = 0; _key < _len; _key++) {
      sFixedPart[_key] = arguments[_key];
    }

    return function () {
      for (var _len2 = arguments.length, sIDPart = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        sIDPart[_key2] = arguments[_key2];
      }

      return generate(BASE_ID.concat.apply(BASE_ID, sFixedPart.concat(sIDPart)));
    };
  }
  /**
   * Those are all helpers to centralize ID generation in the code for different elements
   */


  _exports.IDGenerator = IDGenerator;
  var HeaderFacetID = IDGenerator("HeaderFacet");
  _exports.HeaderFacetID = HeaderFacetID;
  var HeaderFacetContainerID = IDGenerator("HeaderFacetContainer");
  _exports.HeaderFacetContainerID = HeaderFacetContainerID;
  var HeaderFacetFormID = IDGenerator("HeaderFacet", "Form");
  _exports.HeaderFacetFormID = HeaderFacetFormID;
  var CustomHeaderFacetID = IDGenerator("HeaderFacetCustomContainer");
  _exports.CustomHeaderFacetID = CustomHeaderFacetID;
  var EditableHeaderSectionID = IDGenerator("EditableHeaderSection");
  _exports.EditableHeaderSectionID = EditableHeaderSectionID;
  var SectionID = IDGenerator("FacetSection");
  _exports.SectionID = SectionID;
  var CustomSectionID = IDGenerator("CustomSection");
  _exports.CustomSectionID = CustomSectionID;
  var SubSectionID = IDGenerator("FacetSubSection");
  _exports.SubSectionID = SubSectionID;
  var CustomSubSectionID = IDGenerator("CustomSubSection");
  _exports.CustomSubSectionID = CustomSubSectionID;
  var SideContentID = IDGenerator("SideContent");
  _exports.SideContentID = SideContentID;

  var SideContentLayoutID = function (sSectionID) {
    return generate(["fe", sSectionID, "SideContentLayout"]);
  };

  _exports.SideContentLayoutID = SideContentLayoutID;
  var FormID = IDGenerator("Form");
  _exports.FormID = FormID;
  var TableID = IDGenerator("table");
  _exports.TableID = TableID;
  var CustomTabID = IDGenerator("CustomTab");
  _exports.CustomTabID = CustomTabID;
  var FilterBarID = IDGenerator("FilterBar");
  _exports.FilterBarID = FilterBarID;

  var FilterVariantManagementID = function (sFilterID) {
    return generate([sFilterID, "VariantManagement"]);
  };

  _exports.FilterVariantManagementID = FilterVariantManagementID;
  var ChartID = IDGenerator("Chart");
  _exports.ChartID = ChartID;

  var CustomActionID = function (sActionID) {
    return generate(["CustomAction", sActionID]);
  };

  _exports.CustomActionID = CustomActionID;
  var VisualFilterID = IDGenerator("VisualFilter");
  _exports.VisualFilterID = VisualFilterID;
  var KPIID = IDGenerator("KPI");
  _exports.KPIID = KPIID;
  return _exports;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIklELnRzIl0sIm5hbWVzIjpbIkJBU0VfSUQiLCJJREdlbmVyYXRvciIsInNGaXhlZFBhcnQiLCJzSURQYXJ0IiwiZ2VuZXJhdGUiLCJjb25jYXQiLCJIZWFkZXJGYWNldElEIiwiSGVhZGVyRmFjZXRDb250YWluZXJJRCIsIkhlYWRlckZhY2V0Rm9ybUlEIiwiQ3VzdG9tSGVhZGVyRmFjZXRJRCIsIkVkaXRhYmxlSGVhZGVyU2VjdGlvbklEIiwiU2VjdGlvbklEIiwiQ3VzdG9tU2VjdGlvbklEIiwiU3ViU2VjdGlvbklEIiwiQ3VzdG9tU3ViU2VjdGlvbklEIiwiU2lkZUNvbnRlbnRJRCIsIlNpZGVDb250ZW50TGF5b3V0SUQiLCJzU2VjdGlvbklEIiwiRm9ybUlEIiwiVGFibGVJRCIsIkN1c3RvbVRhYklEIiwiRmlsdGVyQmFySUQiLCJGaWx0ZXJWYXJpYW50TWFuYWdlbWVudElEIiwic0ZpbHRlcklEIiwiQ2hhcnRJRCIsIkN1c3RvbUFjdGlvbklEIiwic0FjdGlvbklEIiwiVmlzdWFsRmlsdGVySUQiLCJLUElJRCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLE1BQU1BLE9BQWlCLEdBQUcsQ0FBQyxJQUFELENBQTFCO0FBRUE7Ozs7Ozs7QUFNTyxXQUFTQyxXQUFULEdBQThDO0FBQUEsc0NBQXRCQyxVQUFzQjtBQUF0QkEsTUFBQUEsVUFBc0I7QUFBQTs7QUFDcEQsV0FBTyxZQUErQjtBQUFBLHlDQUFuQkMsT0FBbUI7QUFBbkJBLFFBQUFBLE9BQW1CO0FBQUE7O0FBQ3JDLGFBQU9DLFFBQVEsQ0FBQ0osT0FBTyxDQUFDSyxNQUFSLE9BQUFMLE9BQU8sRUFBV0UsVUFBWCxRQUEwQkMsT0FBMUIsRUFBUixDQUFmO0FBQ0EsS0FGRDtBQUdBO0FBRUQ7Ozs7OztBQUdPLE1BQU1HLGFBQWEsR0FBR0wsV0FBVyxDQUFDLGFBQUQsQ0FBakM7O0FBQ0EsTUFBTU0sc0JBQXNCLEdBQUdOLFdBQVcsQ0FBQyxzQkFBRCxDQUExQzs7QUFDQSxNQUFNTyxpQkFBaUIsR0FBR1AsV0FBVyxDQUFDLGFBQUQsRUFBZ0IsTUFBaEIsQ0FBckM7O0FBQ0EsTUFBTVEsbUJBQW1CLEdBQUdSLFdBQVcsQ0FBQyw0QkFBRCxDQUF2Qzs7QUFDQSxNQUFNUyx1QkFBdUIsR0FBR1QsV0FBVyxDQUFDLHVCQUFELENBQTNDOztBQUNBLE1BQU1VLFNBQVMsR0FBR1YsV0FBVyxDQUFDLGNBQUQsQ0FBN0I7O0FBQ0EsTUFBTVcsZUFBZSxHQUFHWCxXQUFXLENBQUMsZUFBRCxDQUFuQzs7QUFDQSxNQUFNWSxZQUFZLEdBQUdaLFdBQVcsQ0FBQyxpQkFBRCxDQUFoQzs7QUFDQSxNQUFNYSxrQkFBa0IsR0FBR2IsV0FBVyxDQUFDLGtCQUFELENBQXRDOztBQUNBLE1BQU1jLGFBQWEsR0FBR2QsV0FBVyxDQUFDLGFBQUQsQ0FBakM7OztBQUNBLE1BQU1lLG1CQUFtQixHQUFHLFVBQVNDLFVBQVQsRUFBNkI7QUFDL0QsV0FBT2IsUUFBUSxDQUFDLENBQUMsSUFBRCxFQUFPYSxVQUFQLEVBQW1CLG1CQUFuQixDQUFELENBQWY7QUFDQSxHQUZNOzs7QUFHQSxNQUFNQyxNQUFNLEdBQUdqQixXQUFXLENBQUMsTUFBRCxDQUExQjs7QUFDQSxNQUFNa0IsT0FBTyxHQUFHbEIsV0FBVyxDQUFDLE9BQUQsQ0FBM0I7O0FBQ0EsTUFBTW1CLFdBQVcsR0FBR25CLFdBQVcsQ0FBQyxXQUFELENBQS9COztBQUNBLE1BQU1vQixXQUFXLEdBQUdwQixXQUFXLENBQUMsV0FBRCxDQUEvQjs7O0FBQ0EsTUFBTXFCLHlCQUF5QixHQUFHLFVBQVNDLFNBQVQsRUFBNEI7QUFDcEUsV0FBT25CLFFBQVEsQ0FBQyxDQUFDbUIsU0FBRCxFQUFZLG1CQUFaLENBQUQsQ0FBZjtBQUNBLEdBRk07OztBQUdBLE1BQU1DLE9BQU8sR0FBR3ZCLFdBQVcsQ0FBQyxPQUFELENBQTNCOzs7QUFDQSxNQUFNd0IsY0FBYyxHQUFHLFVBQVNDLFNBQVQsRUFBNEI7QUFDekQsV0FBT3RCLFFBQVEsQ0FBQyxDQUFDLGNBQUQsRUFBaUJzQixTQUFqQixDQUFELENBQWY7QUFDQSxHQUZNOzs7QUFHQSxNQUFNQyxjQUFjLEdBQUcxQixXQUFXLENBQUMsY0FBRCxDQUFsQzs7QUFDQSxNQUFNMkIsS0FBSyxHQUFHM0IsV0FBVyxDQUFDLEtBQUQsQ0FBekIiLCJzb3VyY2VSb290IjoiLiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IElEUGFydCB9IGZyb20gXCJzYXAvZmUvY29yZS9oZWxwZXJzXCI7XG5pbXBvcnQgeyBnZW5lcmF0ZSB9IGZyb20gXCIuLi8uLi9oZWxwZXJzL1N0YWJsZUlkSGVscGVyXCI7XG5cbmNvbnN0IEJBU0VfSUQ6IElEUGFydFtdID0gW1wiZmVcIl07XG5cbi8qKlxuICogU2hvcnRjdXQgdG8gdGhlIHN0YWJsZUlkSGVscGVyIHByb3ZpZGluZyBhIFwiY3VycnlcIiBsaWtlIG1ldGhvZCB3aGVyZSB0aGUgbGFzdCBwYXJhbWV0ZXIgaXMgbWlzc2luZy5cbiAqXG4gKiBAcGFyYW0gc0ZpeGVkUGFydFxuICogQHJldHVybnMge0Z1bmN0aW9ufSBBIHNob3J0Y3V0IGZ1bmN0aW9uIHdpdGggdGhlIGZpeGVkIElEIHBhcnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIElER2VuZXJhdG9yKC4uLnNGaXhlZFBhcnQ6IElEUGFydFtdKSB7XG5cdHJldHVybiBmdW5jdGlvbiguLi5zSURQYXJ0OiBJRFBhcnRbXSkge1xuXHRcdHJldHVybiBnZW5lcmF0ZShCQVNFX0lELmNvbmNhdCguLi5zRml4ZWRQYXJ0LCAuLi5zSURQYXJ0KSk7XG5cdH07XG59XG5cbi8qKlxuICogVGhvc2UgYXJlIGFsbCBoZWxwZXJzIHRvIGNlbnRyYWxpemUgSUQgZ2VuZXJhdGlvbiBpbiB0aGUgY29kZSBmb3IgZGlmZmVyZW50IGVsZW1lbnRzXG4gKi9cbmV4cG9ydCBjb25zdCBIZWFkZXJGYWNldElEID0gSURHZW5lcmF0b3IoXCJIZWFkZXJGYWNldFwiKTtcbmV4cG9ydCBjb25zdCBIZWFkZXJGYWNldENvbnRhaW5lcklEID0gSURHZW5lcmF0b3IoXCJIZWFkZXJGYWNldENvbnRhaW5lclwiKTtcbmV4cG9ydCBjb25zdCBIZWFkZXJGYWNldEZvcm1JRCA9IElER2VuZXJhdG9yKFwiSGVhZGVyRmFjZXRcIiwgXCJGb3JtXCIpO1xuZXhwb3J0IGNvbnN0IEN1c3RvbUhlYWRlckZhY2V0SUQgPSBJREdlbmVyYXRvcihcIkhlYWRlckZhY2V0Q3VzdG9tQ29udGFpbmVyXCIpO1xuZXhwb3J0IGNvbnN0IEVkaXRhYmxlSGVhZGVyU2VjdGlvbklEID0gSURHZW5lcmF0b3IoXCJFZGl0YWJsZUhlYWRlclNlY3Rpb25cIik7XG5leHBvcnQgY29uc3QgU2VjdGlvbklEID0gSURHZW5lcmF0b3IoXCJGYWNldFNlY3Rpb25cIik7XG5leHBvcnQgY29uc3QgQ3VzdG9tU2VjdGlvbklEID0gSURHZW5lcmF0b3IoXCJDdXN0b21TZWN0aW9uXCIpO1xuZXhwb3J0IGNvbnN0IFN1YlNlY3Rpb25JRCA9IElER2VuZXJhdG9yKFwiRmFjZXRTdWJTZWN0aW9uXCIpO1xuZXhwb3J0IGNvbnN0IEN1c3RvbVN1YlNlY3Rpb25JRCA9IElER2VuZXJhdG9yKFwiQ3VzdG9tU3ViU2VjdGlvblwiKTtcbmV4cG9ydCBjb25zdCBTaWRlQ29udGVudElEID0gSURHZW5lcmF0b3IoXCJTaWRlQ29udGVudFwiKTtcbmV4cG9ydCBjb25zdCBTaWRlQ29udGVudExheW91dElEID0gZnVuY3Rpb24oc1NlY3Rpb25JRDogc3RyaW5nKSB7XG5cdHJldHVybiBnZW5lcmF0ZShbXCJmZVwiLCBzU2VjdGlvbklELCBcIlNpZGVDb250ZW50TGF5b3V0XCJdKTtcbn07XG5leHBvcnQgY29uc3QgRm9ybUlEID0gSURHZW5lcmF0b3IoXCJGb3JtXCIpO1xuZXhwb3J0IGNvbnN0IFRhYmxlSUQgPSBJREdlbmVyYXRvcihcInRhYmxlXCIpO1xuZXhwb3J0IGNvbnN0IEN1c3RvbVRhYklEID0gSURHZW5lcmF0b3IoXCJDdXN0b21UYWJcIik7XG5leHBvcnQgY29uc3QgRmlsdGVyQmFySUQgPSBJREdlbmVyYXRvcihcIkZpbHRlckJhclwiKTtcbmV4cG9ydCBjb25zdCBGaWx0ZXJWYXJpYW50TWFuYWdlbWVudElEID0gZnVuY3Rpb24oc0ZpbHRlcklEOiBzdHJpbmcpIHtcblx0cmV0dXJuIGdlbmVyYXRlKFtzRmlsdGVySUQsIFwiVmFyaWFudE1hbmFnZW1lbnRcIl0pO1xufTtcbmV4cG9ydCBjb25zdCBDaGFydElEID0gSURHZW5lcmF0b3IoXCJDaGFydFwiKTtcbmV4cG9ydCBjb25zdCBDdXN0b21BY3Rpb25JRCA9IGZ1bmN0aW9uKHNBY3Rpb25JRDogc3RyaW5nKSB7XG5cdHJldHVybiBnZW5lcmF0ZShbXCJDdXN0b21BY3Rpb25cIiwgc0FjdGlvbklEXSk7XG59O1xuZXhwb3J0IGNvbnN0IFZpc3VhbEZpbHRlcklEID0gSURHZW5lcmF0b3IoXCJWaXN1YWxGaWx0ZXJcIik7XG5leHBvcnQgY29uc3QgS1BJSUQgPSBJREdlbmVyYXRvcihcIktQSVwiKTtcbiJdfQ==