/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/converters/ManifestSettings"], function (ManifestSettings) {
  "use strict";

  var VariantManagementType = ManifestSettings.VariantManagementType;

  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  /**
   *
   */
  var ManifestWrapper = /*#__PURE__*/function () {
    /**
     * Creates a wrapper object to ensure the data returned from the manifest is consistent and everything is merged correctly.
     *
     * @param {BaseManifestSettings} oManifestSettings The manifest settings for the current page
     * @param {Function} mergeFn A function that will be used to perform the merge
     * @returns {ManifestWrapper} The manifest wrapper object
     */
    function ManifestWrapper(oManifestSettings, mergeFn) {
      _classCallCheck(this, ManifestWrapper);

      this.oManifestSettings = oManifestSettings;
      this.mergeFn = mergeFn;
    }
    /**
     * Returns the current template type.
     *
     * @returns The type of the current template
     */


    _createClass(ManifestWrapper, [{
      key: "getTemplateType",
      value: function getTemplateType() {
        return this.oManifestSettings.converterType;
      }
      /**
       * Checks whether the current environment is a desktop or not.
       *
       * @returns {boolean} `true` if we are on a desktop
       */

    }, {
      key: "isDesktop",
      value: function isDesktop() {
        return !!this.oManifestSettings.isDesktop;
      }
      /**
       * Retrieves the form containers (field groups/identification) defined in the manifest.
       *
       * @param {string} facetTarget The target annotation path for this form
       * @returns {FormManifestConfiguration} A set of manifest header facets indexed by an iterable key
       */

    }, {
      key: "getFormContainer",
      value: function getFormContainer(facetTarget) {
        var _this$oManifestSettin;

        return (_this$oManifestSettin = this.oManifestSettings.controlConfiguration) === null || _this$oManifestSettin === void 0 ? void 0 : _this$oManifestSettin[facetTarget];
      }
      /**
       * Retrieves the headerFacets defined in the manifest.
       *
       * @returns {ConfigurableRecord<ManifestHeaderFacet>} A set of manifest header facets indexed by an iterable key
       */

    }, {
      key: "getHeaderFacets",
      value: function getHeaderFacets() {
        var _this$oManifestSettin2, _this$oManifestSettin3, _content, _content$header;

        return this.mergeFn({}, (_this$oManifestSettin2 = this.oManifestSettings.controlConfiguration) === null || _this$oManifestSettin2 === void 0 ? void 0 : (_this$oManifestSettin3 = _this$oManifestSettin2["@com.sap.vocabularies.UI.v1.HeaderFacets"]) === null || _this$oManifestSettin3 === void 0 ? void 0 : _this$oManifestSettin3.facets, (_content = this.oManifestSettings.content) === null || _content === void 0 ? void 0 : (_content$header = _content.header) === null || _content$header === void 0 ? void 0 : _content$header.facets);
      }
      /**
       * Retrieves the header actions defined in the manifest.
       *
       * @returns {ConfigurableRecord<ManifestAction>} A set of manifest actions indexed by an iterable key
       */

    }, {
      key: "getHeaderActions",
      value: function getHeaderActions() {
        var _this$oManifestSettin4, _this$oManifestSettin5;

        return ((_this$oManifestSettin4 = this.oManifestSettings.content) === null || _this$oManifestSettin4 === void 0 ? void 0 : (_this$oManifestSettin5 = _this$oManifestSettin4.header) === null || _this$oManifestSettin5 === void 0 ? void 0 : _this$oManifestSettin5.actions) || {};
      }
      /**
       * Retrieves the footer actions defined in the manifest.
       *
       * @returns {ConfigurableRecord<ManifestAction>} A set of manifest actions indexed by an iterable key
       */

    }, {
      key: "getFooterActions",
      value: function getFooterActions() {
        var _this$oManifestSettin6, _this$oManifestSettin7;

        return ((_this$oManifestSettin6 = this.oManifestSettings.content) === null || _this$oManifestSettin6 === void 0 ? void 0 : (_this$oManifestSettin7 = _this$oManifestSettin6.footer) === null || _this$oManifestSettin7 === void 0 ? void 0 : _this$oManifestSettin7.actions) || {};
      }
      /**
       * Retrieves the variant management as defined in the manifest.
       *
       * @returns {VariantManagementType} A type of variant management
       */

    }, {
      key: "getVariantManagement",
      value: function getVariantManagement() {
        return this.oManifestSettings.variantManagement || VariantManagementType.None;
      }
      /**
       * Retrieves the annotation Path for the SPV in the manifest.
       *
       * @returns {string|undefined} The annotation path for the default SPV or undefined.
       */

    }, {
      key: "getDefaultTemplateAnnotationPath",
      value: function getDefaultTemplateAnnotationPath() {
        return this.oManifestSettings.defaultTemplateAnnotationPath;
      }
      /**
       * Retrieves the control configuration as defined in the manifest for a specific annotation path.
       *
       * @param {string} sAnnotationPath The relative annotation path
       * @private
       * @returns {object} The control configuration
       */

    }, {
      key: "getControlConfiguration",
      value: function getControlConfiguration(sAnnotationPath) {
        var _this$oManifestSettin8, _this$oManifestSettin9;

        return ((_this$oManifestSettin8 = this.oManifestSettings) === null || _this$oManifestSettin8 === void 0 ? void 0 : (_this$oManifestSettin9 = _this$oManifestSettin8.controlConfiguration) === null || _this$oManifestSettin9 === void 0 ? void 0 : _this$oManifestSettin9[sAnnotationPath]) || {};
      }
      /**
       * Retrieves the configured settings for a given navigation target.
       *
       * @param {string} navigationOrCollectionName The name of the navigation to check
       * @returns {NavigationSettingsConfiguration} The navigation settings configuration
       */

    }, {
      key: "getNavigationConfiguration",
      value: function getNavigationConfiguration(navigationOrCollectionName) {
        var _this$oManifestSettin10, _this$oManifestSettin11;

        return ((_this$oManifestSettin10 = this.oManifestSettings) === null || _this$oManifestSettin10 === void 0 ? void 0 : (_this$oManifestSettin11 = _this$oManifestSettin10.navigation) === null || _this$oManifestSettin11 === void 0 ? void 0 : _this$oManifestSettin11[navigationOrCollectionName]) || {};
      }
      /**
       * Retrieves the view level.
       *
       * @returns {number} The current view level
       */

    }, {
      key: "getViewLevel",
      value: function getViewLevel() {
        var _this$oManifestSettin12;

        return ((_this$oManifestSettin12 = this.oManifestSettings) === null || _this$oManifestSettin12 === void 0 ? void 0 : _this$oManifestSettin12.viewLevel) || -1;
      }
      /**
       * Retrieves the contentDensities setting of the application.
       *
       * @returns {ContentDensitiesType} The current content density
       */

    }, {
      key: "getContentDensities",
      value: function getContentDensities() {
        var _this$oManifestSettin13;

        return ((_this$oManifestSettin13 = this.oManifestSettings) === null || _this$oManifestSettin13 === void 0 ? void 0 : _this$oManifestSettin13.contentDensities) || {
          cozy: false,
          compact: false
        };
      }
      /**
       * Checks whether we are in FCL mode or not.
       *
       * @returns {boolean} `true` if we are in FCL
       */

    }, {
      key: "isFclEnabled",
      value: function isFclEnabled() {
        var _this$oManifestSettin14;

        return !!((_this$oManifestSettin14 = this.oManifestSettings) === null || _this$oManifestSettin14 === void 0 ? void 0 : _this$oManifestSettin14.fclEnabled);
      }
      /**
       * Checks whether the current settings (application / shell) allows us to use condensed layout.
       *
       * @returns {boolean} `true` if we can use the condensed layout, false otherwise
       */

    }, {
      key: "isCondensedLayoutCompliant",
      value: function isCondensedLayoutCompliant() {
        var _this$oManifestSettin15, _this$oManifestSettin16;

        var manifestContentDensity = ((_this$oManifestSettin15 = this.oManifestSettings) === null || _this$oManifestSettin15 === void 0 ? void 0 : _this$oManifestSettin15.contentDensities) || {
          cozy: false,
          compact: false
        };
        var shellContentDensity = ((_this$oManifestSettin16 = this.oManifestSettings) === null || _this$oManifestSettin16 === void 0 ? void 0 : _this$oManifestSettin16.shellContentDensity) || "compact";
        var isCondensedLayoutCompliant = true;

        if ((manifestContentDensity === null || manifestContentDensity === void 0 ? void 0 : manifestContentDensity.cozy) === true && (manifestContentDensity === null || manifestContentDensity === void 0 ? void 0 : manifestContentDensity.compact) !== true || shellContentDensity === "cozy") {
          isCondensedLayoutCompliant = false;
        }

        return isCondensedLayoutCompliant;
      } //region OP Specific

      /**
       * Retrieves the sections defined in the manifest.
       *
       * @returns {ConfigurableRecord<ManifestSection>} A set of manifest sections indexed by an iterable key
       */

    }, {
      key: "getSections",
      value: function getSections() {
        var _this$oManifestSettin17, _this$oManifestSettin18, _content2, _content2$body;

        return this.mergeFn({}, (_this$oManifestSettin17 = this.oManifestSettings.controlConfiguration) === null || _this$oManifestSettin17 === void 0 ? void 0 : (_this$oManifestSettin18 = _this$oManifestSettin17["@com.sap.vocabularies.UI.v1.Facets"]) === null || _this$oManifestSettin18 === void 0 ? void 0 : _this$oManifestSettin18.sections, (_content2 = this.oManifestSettings.content) === null || _content2 === void 0 ? void 0 : (_content2$body = _content2.body) === null || _content2$body === void 0 ? void 0 : _content2$body.sections);
      }
      /**
       * Returns true of the header of the application is editable and should appear in the facets.
       *
       * @returns {boolean} `true` if the header if editable
       */

    }, {
      key: "isHeaderEditable",
      value: function isHeaderEditable() {
        return this.getShowObjectPageHeader() && this.oManifestSettings.editableHeaderContent;
      }
      /**
       * Returns true if we should show the object page header.
       *
       * @returns {boolean} `true` if the header should be displayed
       */

    }, {
      key: "getShowAnchorBar",
      value: function getShowAnchorBar() {
        var _content3, _content3$header, _content4, _content4$header;

        return ((_content3 = this.oManifestSettings.content) === null || _content3 === void 0 ? void 0 : (_content3$header = _content3.header) === null || _content3$header === void 0 ? void 0 : _content3$header.anchorBarVisible) !== undefined ? !!((_content4 = this.oManifestSettings.content) === null || _content4 === void 0 ? void 0 : (_content4$header = _content4.header) === null || _content4$header === void 0 ? void 0 : _content4$header.anchorBarVisible) : true;
      }
      /**
       * Defines whether or not the section will be displayed in different tabs.
       *
       * @returns {boolean} `true` if the icon tab bar should be used instead of scrolling
       */

    }, {
      key: "useIconTabBar",
      value: function useIconTabBar() {
        return this.getShowAnchorBar() && this.oManifestSettings.sectionLayout === "Tabs";
      }
      /**
       * Returns true if the object page header is to be shown.
       *
       * @returns {boolean} `true` if the object page header is to be displayed
       */

    }, {
      key: "getShowObjectPageHeader",
      value: function getShowObjectPageHeader() {
        var _content5, _content5$header, _content6, _content6$header;

        return ((_content5 = this.oManifestSettings.content) === null || _content5 === void 0 ? void 0 : (_content5$header = _content5.header) === null || _content5$header === void 0 ? void 0 : _content5$header.visible) !== undefined ? !!((_content6 = this.oManifestSettings.content) === null || _content6 === void 0 ? void 0 : (_content6$header = _content6.header) === null || _content6$header === void 0 ? void 0 : _content6$header.visible) : true;
      } //endregion OP Specific
      //region LR Specific

      /**
       * Retrieves the multiple view configuration from the manifest.
       *
       * @returns {MultipleViewsConfiguration} The views that represent the manifest object
       */

    }, {
      key: "getViewConfiguration",
      value: function getViewConfiguration() {
        return this.oManifestSettings.views;
      }
      /**
       * Retrieves the KPI configuration from the manifest.
       *
       * @returns {object} Returns a map between KPI names and their respective configuration
       */

    }, {
      key: "getKPIConfiguration",
      value: function getKPIConfiguration() {
        return this.oManifestSettings.keyPerformanceIndicators || {};
      }
      /**
       * Retrieves the filter configuration from the manifest.
       *
       * @returns {FilterManifestConfiguration} The filter configuration from the manifest
       */

    }, {
      key: "getFilterConfiguration",
      value: function getFilterConfiguration() {
        return this.getControlConfiguration("@com.sap.vocabularies.UI.v1.SelectionFields");
      }
      /**
       * Returns true if there are multiple entity sets to be displayed.
       *
       * @returns {boolean} `true` if there are multiple entity sets
       */

    }, {
      key: "hasMultipleEntitySets",
      value: function hasMultipleEntitySets() {
        var _this = this;

        var viewConfig = this.getViewConfiguration() || {
          paths: []
        };
        var manifestEntitySet = this.oManifestSettings.entitySet;
        return viewConfig.paths.find(function (path) {
          var _ref;

          if ((_ref = path) === null || _ref === void 0 ? void 0 : _ref.template) {
            return undefined;
          } else if (_this.hasMultipleVisualizations(path)) {
            var _ref2 = path,
                primary = _ref2.primary,
                secondary = _ref2.secondary;
            return primary.some(function (path) {
              return path.entitySet && path.entitySet !== manifestEntitySet;
            }) || secondary.some(function (path) {
              return path.entitySet && path.entitySet !== manifestEntitySet;
            });
          } else {
            path = path;
            return path.entitySet && path.entitySet !== manifestEntitySet;
          }
        }) !== undefined;
      }
      /**
       * Returns the context path for the template if it is specified in the manifest.
       *
       * @returns {string} The context path for the template
       */

    }, {
      key: "getContextPath",
      value: function getContextPath() {
        var _this$oManifestSettin19;

        return (_this$oManifestSettin19 = this.oManifestSettings) === null || _this$oManifestSettin19 === void 0 ? void 0 : _this$oManifestSettin19.contextPath;
      }
      /**
       * Returns true if there are multiple visualizations.
       *
       * @param {ViewPathConfiguration} path The path from the view
       * @returns {boolean} `true` if there are multiple visualizations
       */

    }, {
      key: "hasMultipleVisualizations",
      value: function hasMultipleVisualizations(path) {
        var _primary2, _secondary2;

        if (!path) {
          var viewConfig = this.getViewConfiguration() || {
            paths: []
          };
          return viewConfig.paths.some(function (path) {
            var _primary, _secondary;

            return ((_primary = path.primary) === null || _primary === void 0 ? void 0 : _primary.length) > 0 && ((_secondary = path.secondary) === null || _secondary === void 0 ? void 0 : _secondary.length) > 0;
          });
        }

        return ((_primary2 = path.primary) === null || _primary2 === void 0 ? void 0 : _primary2.length) > 0 && ((_secondary2 = path.secondary) === null || _secondary2 === void 0 ? void 0 : _secondary2.length) > 0;
      } //end region LR Specific

    }]);

    return ManifestWrapper;
  }();

  return ManifestWrapper;
}, false);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIk1hbmlmZXN0V3JhcHBlci50cyJdLCJuYW1lcyI6WyJNYW5pZmVzdFdyYXBwZXIiLCJvTWFuaWZlc3RTZXR0aW5ncyIsIm1lcmdlRm4iLCJjb252ZXJ0ZXJUeXBlIiwiaXNEZXNrdG9wIiwiZmFjZXRUYXJnZXQiLCJjb250cm9sQ29uZmlndXJhdGlvbiIsImZhY2V0cyIsImNvbnRlbnQiLCJoZWFkZXIiLCJhY3Rpb25zIiwiZm9vdGVyIiwidmFyaWFudE1hbmFnZW1lbnQiLCJWYXJpYW50TWFuYWdlbWVudFR5cGUiLCJOb25lIiwiZGVmYXVsdFRlbXBsYXRlQW5ub3RhdGlvblBhdGgiLCJzQW5ub3RhdGlvblBhdGgiLCJuYXZpZ2F0aW9uT3JDb2xsZWN0aW9uTmFtZSIsIm5hdmlnYXRpb24iLCJ2aWV3TGV2ZWwiLCJjb250ZW50RGVuc2l0aWVzIiwiY296eSIsImNvbXBhY3QiLCJmY2xFbmFibGVkIiwibWFuaWZlc3RDb250ZW50RGVuc2l0eSIsInNoZWxsQ29udGVudERlbnNpdHkiLCJpc0NvbmRlbnNlZExheW91dENvbXBsaWFudCIsInNlY3Rpb25zIiwiYm9keSIsImdldFNob3dPYmplY3RQYWdlSGVhZGVyIiwiZWRpdGFibGVIZWFkZXJDb250ZW50IiwiYW5jaG9yQmFyVmlzaWJsZSIsInVuZGVmaW5lZCIsImdldFNob3dBbmNob3JCYXIiLCJzZWN0aW9uTGF5b3V0IiwidmlzaWJsZSIsInZpZXdzIiwia2V5UGVyZm9ybWFuY2VJbmRpY2F0b3JzIiwiZ2V0Q29udHJvbENvbmZpZ3VyYXRpb24iLCJ2aWV3Q29uZmlnIiwiZ2V0Vmlld0NvbmZpZ3VyYXRpb24iLCJwYXRocyIsIm1hbmlmZXN0RW50aXR5U2V0IiwiZW50aXR5U2V0IiwiZmluZCIsInBhdGgiLCJ0ZW1wbGF0ZSIsImhhc011bHRpcGxlVmlzdWFsaXphdGlvbnMiLCJwcmltYXJ5Iiwic2Vjb25kYXJ5Iiwic29tZSIsImNvbnRleHRQYXRoIiwibGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7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QUwsSUFBSTtBQUFBLHFCQUFJQSxJQUFJLENBQUNGLFNBQUwsSUFBa0JFLElBQUksQ0FBQ0YsU0FBTCxLQUFtQkQsaUJBQXpDO0FBQUEsYUFBbkIsQ0FGRDtBQUlBLFdBTk0sTUFNQTtBQUNORyxZQUFBQSxJQUFJLEdBQUdBLElBQVA7QUFDQSxtQkFBT0EsSUFBSSxDQUFDRixTQUFMLElBQWtCRSxJQUFJLENBQUNGLFNBQUwsS0FBbUJELGlCQUE1QztBQUNBO0FBQ0QsU0FiRCxNQWFPVixTQWRSO0FBZ0JBO0FBRUQ7Ozs7Ozs7O3VDQUtxQztBQUFBOztBQUNwQywwQ0FBTyxLQUFLL0IsaUJBQVosNERBQU8sd0JBQXdCa0QsV0FBL0I7QUFDQTtBQUVEOzs7Ozs7Ozs7Z0RBTTBCTixJLEVBQXVDO0FBQUE7O0FBQ2hFLFlBQUksQ0FBQ0EsSUFBTCxFQUFXO0FBQ1YsY0FBTU4sVUFBVSxHQUFHLEtBQUtDLG9CQUFMLE1BQStCO0FBQUVDLFlBQUFBLEtBQUssRUFBRTtBQUFULFdBQWxEO0FBQ0EsaUJBQU9GLFVBQVUsQ0FBQ0UsS0FBWCxDQUFpQlMsSUFBakIsQ0FBc0IsVUFBQUwsSUFBSSxFQUFJO0FBQUE7O0FBQ3BDLG1CQUNDLGFBQUNBLElBQUQsQ0FBd0NHLE9BQXhDLHNEQUFpREksTUFBakQsSUFBMEQsQ0FBMUQsSUFDQSxlQUFDUCxJQUFELENBQXdDSSxTQUF4QywwREFBbURHLE1BQW5ELElBQTRELENBRjdEO0FBSUEsV0FMTSxDQUFQO0FBTUE7O0FBQ0QsZUFBTyxjQUFDUCxJQUFELENBQXdDRyxPQUF4Qyx3REFBaURJLE1BQWpELElBQTBELENBQTFELElBQStELGdCQUFDUCxJQUFELENBQXdDSSxTQUF4Qyw0REFBbURHLE1BQW5ELElBQTRELENBQWxJO0FBQ0EsTyxDQUVEOzs7Ozs7O1NBR2NwRCxlIiwic291cmNlUm9vdCI6Ii4iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25maWd1cmFibGVSZWNvcmQgfSBmcm9tIFwic2FwL2ZlL2NvcmUvY29udmVydGVycy9oZWxwZXJzL0NvbmZpZ3VyYWJsZU9iamVjdFwiO1xuaW1wb3J0IHtcblx0QmFzZU1hbmlmZXN0U2V0dGluZ3MsXG5cdENvbWJpbmVkVmlld1BhdGhDb25maWd1cmF0aW9uLFxuXHRDb250ZW50RGVuc2l0aWVzVHlwZSxcblx0RmlsdGVyTWFuaWZlc3RDb25maWd1cmF0aW9uLFxuXHRGb3JtTWFuaWZlc3RDb25maWd1cmF0aW9uLFxuXHRMaXN0UmVwb3J0TWFuaWZlc3RTZXR0aW5ncyxcblx0TWFuaWZlc3RBY3Rpb24sXG5cdE1hbmlmZXN0SGVhZGVyRmFjZXQsXG5cdE1hbmlmZXN0U2VjdGlvbixcblx0TXVsdGlwbGVWaWV3c0NvbmZpZ3VyYXRpb24sXG5cdE5hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb24sXG5cdE9iamVjdFBhZ2VNYW5pZmVzdFNldHRpbmdzLFxuXHRTaW5nbGVWaWV3UGF0aENvbmZpZ3VyYXRpb24sXG5cdFZpZXdQYXRoQ29uZmlndXJhdGlvbixcblx0VGVtcGxhdGVUeXBlLFxuXHRWYXJpYW50TWFuYWdlbWVudFR5cGUsXG5cdEN1c3RvbVZpZXdUZW1wbGF0ZUNvbmZpZ3VyYXRpb24sXG5cdFZpZXdDb25maWd1cmF0aW9uLFxuXHRLUElDb25maWd1cmF0aW9uXG59IGZyb20gXCJzYXAvZmUvY29yZS9jb252ZXJ0ZXJzL01hbmlmZXN0U2V0dGluZ3NcIjtcblxuLyoqXG4gKlxuICovXG5jbGFzcyBNYW5pZmVzdFdyYXBwZXIge1xuXHQvKipcblx0ICogQ3JlYXRlcyBhIHdyYXBwZXIgb2JqZWN0IHRvIGVuc3VyZSB0aGUgZGF0YSByZXR1cm5lZCBmcm9tIHRoZSBtYW5pZmVzdCBpcyBjb25zaXN0ZW50IGFuZCBldmVyeXRoaW5nIGlzIG1lcmdlZCBjb3JyZWN0bHkuXG5cdCAqXG5cdCAqIEBwYXJhbSB7QmFzZU1hbmlmZXN0U2V0dGluZ3N9IG9NYW5pZmVzdFNldHRpbmdzIFRoZSBtYW5pZmVzdCBzZXR0aW5ncyBmb3IgdGhlIGN1cnJlbnQgcGFnZVxuXHQgKiBAcGFyYW0ge0Z1bmN0aW9ufSBtZXJnZUZuIEEgZnVuY3Rpb24gdGhhdCB3aWxsIGJlIHVzZWQgdG8gcGVyZm9ybSB0aGUgbWVyZ2Vcblx0ICogQHJldHVybnMge01hbmlmZXN0V3JhcHBlcn0gVGhlIG1hbmlmZXN0IHdyYXBwZXIgb2JqZWN0XG5cdCAqL1xuXHRjb25zdHJ1Y3Rvcihwcml2YXRlIG9NYW5pZmVzdFNldHRpbmdzOiBCYXNlTWFuaWZlc3RTZXR0aW5ncywgcHJpdmF0ZSBtZXJnZUZuOiBGdW5jdGlvbikge31cblxuXHQvKipcblx0ICogUmV0dXJucyB0aGUgY3VycmVudCB0ZW1wbGF0ZSB0eXBlLlxuXHQgKlxuXHQgKiBAcmV0dXJucyBUaGUgdHlwZSBvZiB0aGUgY3VycmVudCB0ZW1wbGF0ZVxuXHQgKi9cblx0Z2V0VGVtcGxhdGVUeXBlKCk6IFRlbXBsYXRlVHlwZSB7XG5cdFx0cmV0dXJuIHRoaXMub01hbmlmZXN0U2V0dGluZ3MuY29udmVydGVyVHlwZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBDaGVja3Mgd2hldGhlciB0aGUgY3VycmVudCBlbnZpcm9ubWVudCBpcyBhIGRlc2t0b3Agb3Igbm90LlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHdlIGFyZSBvbiBhIGRlc2t0b3Bcblx0ICovXG5cdGlzRGVza3RvcCgpOiBib29sZWFuIHtcblx0XHRyZXR1cm4gISF0aGlzLm9NYW5pZmVzdFNldHRpbmdzLmlzRGVza3RvcDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIGZvcm0gY29udGFpbmVycyAoZmllbGQgZ3JvdXBzL2lkZW50aWZpY2F0aW9uKSBkZWZpbmVkIGluIHRoZSBtYW5pZmVzdC5cblx0ICpcblx0ICogQHBhcmFtIHtzdHJpbmd9IGZhY2V0VGFyZ2V0IFRoZSB0YXJnZXQgYW5ub3RhdGlvbiBwYXRoIGZvciB0aGlzIGZvcm1cblx0ICogQHJldHVybnMge0Zvcm1NYW5pZmVzdENvbmZpZ3VyYXRpb259IEEgc2V0IG9mIG1hbmlmZXN0IGhlYWRlciBmYWNldHMgaW5kZXhlZCBieSBhbiBpdGVyYWJsZSBrZXlcblx0ICovXG5cdGdldEZvcm1Db250YWluZXIoZmFjZXRUYXJnZXQ6IHN0cmluZyk6IEZvcm1NYW5pZmVzdENvbmZpZ3VyYXRpb24ge1xuXHRcdHJldHVybiB0aGlzLm9NYW5pZmVzdFNldHRpbmdzLmNvbnRyb2xDb25maWd1cmF0aW9uPy5bZmFjZXRUYXJnZXRdIGFzIEZvcm1NYW5pZmVzdENvbmZpZ3VyYXRpb247XG5cdH1cblx0LyoqXG5cdCAqIFJldHJpZXZlcyB0aGUgaGVhZGVyRmFjZXRzIGRlZmluZWQgaW4gdGhlIG1hbmlmZXN0LlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Q29uZmlndXJhYmxlUmVjb3JkPE1hbmlmZXN0SGVhZGVyRmFjZXQ+fSBBIHNldCBvZiBtYW5pZmVzdCBoZWFkZXIgZmFjZXRzIGluZGV4ZWQgYnkgYW4gaXRlcmFibGUga2V5XG5cdCAqL1xuXHRnZXRIZWFkZXJGYWNldHMoKTogQ29uZmlndXJhYmxlUmVjb3JkPE1hbmlmZXN0SGVhZGVyRmFjZXQ+IHtcblx0XHRyZXR1cm4gdGhpcy5tZXJnZUZuKFxuXHRcdFx0e30sXG5cdFx0XHR0aGlzLm9NYW5pZmVzdFNldHRpbmdzLmNvbnRyb2xDb25maWd1cmF0aW9uPy5bXCJAY29tLnNhcC52b2NhYnVsYXJpZXMuVUkudjEuSGVhZGVyRmFjZXRzXCJdPy5mYWNldHMsXG5cdFx0XHQodGhpcy5vTWFuaWZlc3RTZXR0aW5ncyBhcyBPYmplY3RQYWdlTWFuaWZlc3RTZXR0aW5ncykuY29udGVudD8uaGVhZGVyPy5mYWNldHNcblx0XHQpO1xuXHR9XG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIGhlYWRlciBhY3Rpb25zIGRlZmluZWQgaW4gdGhlIG1hbmlmZXN0LlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Q29uZmlndXJhYmxlUmVjb3JkPE1hbmlmZXN0QWN0aW9uPn0gQSBzZXQgb2YgbWFuaWZlc3QgYWN0aW9ucyBpbmRleGVkIGJ5IGFuIGl0ZXJhYmxlIGtleVxuXHQgKi9cblx0Z2V0SGVhZGVyQWN0aW9ucygpOiBDb25maWd1cmFibGVSZWNvcmQ8TWFuaWZlc3RBY3Rpb24+IHtcblx0XHRyZXR1cm4gdGhpcy5vTWFuaWZlc3RTZXR0aW5ncy5jb250ZW50Py5oZWFkZXI/LmFjdGlvbnMgfHwge307XG5cdH1cblx0LyoqXG5cdCAqIFJldHJpZXZlcyB0aGUgZm9vdGVyIGFjdGlvbnMgZGVmaW5lZCBpbiB0aGUgbWFuaWZlc3QuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtDb25maWd1cmFibGVSZWNvcmQ8TWFuaWZlc3RBY3Rpb24+fSBBIHNldCBvZiBtYW5pZmVzdCBhY3Rpb25zIGluZGV4ZWQgYnkgYW4gaXRlcmFibGUga2V5XG5cdCAqL1xuXHRnZXRGb290ZXJBY3Rpb25zKCk6IENvbmZpZ3VyYWJsZVJlY29yZDxNYW5pZmVzdEFjdGlvbj4ge1xuXHRcdHJldHVybiB0aGlzLm9NYW5pZmVzdFNldHRpbmdzLmNvbnRlbnQ/LmZvb3Rlcj8uYWN0aW9ucyB8fCB7fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIHZhcmlhbnQgbWFuYWdlbWVudCBhcyBkZWZpbmVkIGluIHRoZSBtYW5pZmVzdC5cblx0ICpcblx0ICogQHJldHVybnMge1ZhcmlhbnRNYW5hZ2VtZW50VHlwZX0gQSB0eXBlIG9mIHZhcmlhbnQgbWFuYWdlbWVudFxuXHQgKi9cblx0Z2V0VmFyaWFudE1hbmFnZW1lbnQoKTogVmFyaWFudE1hbmFnZW1lbnRUeXBlIHtcblx0XHRyZXR1cm4gdGhpcy5vTWFuaWZlc3RTZXR0aW5ncy52YXJpYW50TWFuYWdlbWVudCB8fCBWYXJpYW50TWFuYWdlbWVudFR5cGUuTm9uZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIGFubm90YXRpb24gUGF0aCBmb3IgdGhlIFNQViBpbiB0aGUgbWFuaWZlc3QuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd8dW5kZWZpbmVkfSBUaGUgYW5ub3RhdGlvbiBwYXRoIGZvciB0aGUgZGVmYXVsdCBTUFYgb3IgdW5kZWZpbmVkLlxuXHQgKi9cblx0Z2V0RGVmYXVsdFRlbXBsYXRlQW5ub3RhdGlvblBhdGgoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gdGhpcy5vTWFuaWZlc3RTZXR0aW5ncy5kZWZhdWx0VGVtcGxhdGVBbm5vdGF0aW9uUGF0aDtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIGNvbnRyb2wgY29uZmlndXJhdGlvbiBhcyBkZWZpbmVkIGluIHRoZSBtYW5pZmVzdCBmb3IgYSBzcGVjaWZpYyBhbm5vdGF0aW9uIHBhdGguXG5cdCAqXG5cdCAqIEBwYXJhbSB7c3RyaW5nfSBzQW5ub3RhdGlvblBhdGggVGhlIHJlbGF0aXZlIGFubm90YXRpb24gcGF0aFxuXHQgKiBAcHJpdmF0ZVxuXHQgKiBAcmV0dXJucyB7b2JqZWN0fSBUaGUgY29udHJvbCBjb25maWd1cmF0aW9uXG5cdCAqL1xuXHRnZXRDb250cm9sQ29uZmlndXJhdGlvbihzQW5ub3RhdGlvblBhdGg6IHN0cmluZyk6IGFueSB7XG5cdFx0cmV0dXJuIHRoaXMub01hbmlmZXN0U2V0dGluZ3M/LmNvbnRyb2xDb25maWd1cmF0aW9uPy5bc0Fubm90YXRpb25QYXRoXSB8fCB7fTtcblx0fVxuXHQvKipcblx0ICogUmV0cmlldmVzIHRoZSBjb25maWd1cmVkIHNldHRpbmdzIGZvciBhIGdpdmVuIG5hdmlnYXRpb24gdGFyZ2V0LlxuXHQgKlxuXHQgKiBAcGFyYW0ge3N0cmluZ30gbmF2aWdhdGlvbk9yQ29sbGVjdGlvbk5hbWUgVGhlIG5hbWUgb2YgdGhlIG5hdmlnYXRpb24gdG8gY2hlY2tcblx0ICogQHJldHVybnMge05hdmlnYXRpb25TZXR0aW5nc0NvbmZpZ3VyYXRpb259IFRoZSBuYXZpZ2F0aW9uIHNldHRpbmdzIGNvbmZpZ3VyYXRpb25cblx0ICovXG5cdGdldE5hdmlnYXRpb25Db25maWd1cmF0aW9uKG5hdmlnYXRpb25PckNvbGxlY3Rpb25OYW1lOiBzdHJpbmcpOiBOYXZpZ2F0aW9uU2V0dGluZ3NDb25maWd1cmF0aW9uIHtcblx0XHRyZXR1cm4gdGhpcy5vTWFuaWZlc3RTZXR0aW5ncz8ubmF2aWdhdGlvbj8uW25hdmlnYXRpb25PckNvbGxlY3Rpb25OYW1lXSB8fCB7fTtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIHZpZXcgbGV2ZWwuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtudW1iZXJ9IFRoZSBjdXJyZW50IHZpZXcgbGV2ZWxcblx0ICovXG5cdGdldFZpZXdMZXZlbCgpOiBudW1iZXIge1xuXHRcdHJldHVybiB0aGlzLm9NYW5pZmVzdFNldHRpbmdzPy52aWV3TGV2ZWwgfHwgLTE7XG5cdH1cblxuXHQvKipcblx0ICogUmV0cmlldmVzIHRoZSBjb250ZW50RGVuc2l0aWVzIHNldHRpbmcgb2YgdGhlIGFwcGxpY2F0aW9uLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Q29udGVudERlbnNpdGllc1R5cGV9IFRoZSBjdXJyZW50IGNvbnRlbnQgZGVuc2l0eVxuXHQgKi9cblx0Z2V0Q29udGVudERlbnNpdGllcygpOiBDb250ZW50RGVuc2l0aWVzVHlwZSB7XG5cdFx0cmV0dXJuIChcblx0XHRcdHRoaXMub01hbmlmZXN0U2V0dGluZ3M/LmNvbnRlbnREZW5zaXRpZXMgfHwge1xuXHRcdFx0XHRjb3p5OiBmYWxzZSxcblx0XHRcdFx0Y29tcGFjdDogZmFsc2Vcblx0XHRcdH1cblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIENoZWNrcyB3aGV0aGVyIHdlIGFyZSBpbiBGQ0wgbW9kZSBvciBub3QuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgd2UgYXJlIGluIEZDTFxuXHQgKi9cblx0aXNGY2xFbmFibGVkKCk6IGJvb2xlYW4ge1xuXHRcdHJldHVybiAhIXRoaXMub01hbmlmZXN0U2V0dGluZ3M/LmZjbEVuYWJsZWQ7XG5cdH1cblxuXHQvKipcblx0ICogQ2hlY2tzIHdoZXRoZXIgdGhlIGN1cnJlbnQgc2V0dGluZ3MgKGFwcGxpY2F0aW9uIC8gc2hlbGwpIGFsbG93cyB1cyB0byB1c2UgY29uZGVuc2VkIGxheW91dC5cblx0ICpcblx0ICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB3ZSBjYW4gdXNlIHRoZSBjb25kZW5zZWQgbGF5b3V0LCBmYWxzZSBvdGhlcndpc2Vcblx0ICovXG5cdGlzQ29uZGVuc2VkTGF5b3V0Q29tcGxpYW50KCk6IGJvb2xlYW4ge1xuXHRcdGNvbnN0IG1hbmlmZXN0Q29udGVudERlbnNpdHkgPSB0aGlzLm9NYW5pZmVzdFNldHRpbmdzPy5jb250ZW50RGVuc2l0aWVzIHx8IHtcblx0XHRcdGNvenk6IGZhbHNlLFxuXHRcdFx0Y29tcGFjdDogZmFsc2Vcblx0XHR9O1xuXHRcdGNvbnN0IHNoZWxsQ29udGVudERlbnNpdHkgPSB0aGlzLm9NYW5pZmVzdFNldHRpbmdzPy5zaGVsbENvbnRlbnREZW5zaXR5IHx8IFwiY29tcGFjdFwiO1xuXHRcdGxldCBpc0NvbmRlbnNlZExheW91dENvbXBsaWFudCA9IHRydWU7XG5cdFx0aWYgKChtYW5pZmVzdENvbnRlbnREZW5zaXR5Py5jb3p5ID09PSB0cnVlICYmIG1hbmlmZXN0Q29udGVudERlbnNpdHk/LmNvbXBhY3QgIT09IHRydWUpIHx8IHNoZWxsQ29udGVudERlbnNpdHkgPT09IFwiY296eVwiKSB7XG5cdFx0XHRpc0NvbmRlbnNlZExheW91dENvbXBsaWFudCA9IGZhbHNlO1xuXHRcdH1cblx0XHRyZXR1cm4gaXNDb25kZW5zZWRMYXlvdXRDb21wbGlhbnQ7XG5cdH1cblxuXHQvL3JlZ2lvbiBPUCBTcGVjaWZpY1xuXG5cdC8qKlxuXHQgKiBSZXRyaWV2ZXMgdGhlIHNlY3Rpb25zIGRlZmluZWQgaW4gdGhlIG1hbmlmZXN0LlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Q29uZmlndXJhYmxlUmVjb3JkPE1hbmlmZXN0U2VjdGlvbj59IEEgc2V0IG9mIG1hbmlmZXN0IHNlY3Rpb25zIGluZGV4ZWQgYnkgYW4gaXRlcmFibGUga2V5XG5cdCAqL1xuXHRnZXRTZWN0aW9ucygpOiBDb25maWd1cmFibGVSZWNvcmQ8TWFuaWZlc3RTZWN0aW9uPiB7XG5cdFx0cmV0dXJuIHRoaXMubWVyZ2VGbihcblx0XHRcdHt9LFxuXHRcdFx0dGhpcy5vTWFuaWZlc3RTZXR0aW5ncy5jb250cm9sQ29uZmlndXJhdGlvbj8uW1wiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLkZhY2V0c1wiXT8uc2VjdGlvbnMsXG5cdFx0XHQodGhpcy5vTWFuaWZlc3RTZXR0aW5ncyBhcyBPYmplY3RQYWdlTWFuaWZlc3RTZXR0aW5ncykuY29udGVudD8uYm9keT8uc2VjdGlvbnNcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdHJ1ZSBvZiB0aGUgaGVhZGVyIG9mIHRoZSBhcHBsaWNhdGlvbiBpcyBlZGl0YWJsZSBhbmQgc2hvdWxkIGFwcGVhciBpbiB0aGUgZmFjZXRzLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBoZWFkZXIgaWYgZWRpdGFibGVcblx0ICovXG5cdGlzSGVhZGVyRWRpdGFibGUoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0U2hvd09iamVjdFBhZ2VIZWFkZXIoKSAmJiAodGhpcy5vTWFuaWZlc3RTZXR0aW5ncyBhcyBPYmplY3RQYWdlTWFuaWZlc3RTZXR0aW5ncykuZWRpdGFibGVIZWFkZXJDb250ZW50O1xuXHR9XG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgd2Ugc2hvdWxkIHNob3cgdGhlIG9iamVjdCBwYWdlIGhlYWRlci5cblx0ICpcblx0ICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgaGVhZGVyIHNob3VsZCBiZSBkaXNwbGF5ZWRcblx0ICovXG5cdGdldFNob3dBbmNob3JCYXIoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICh0aGlzLm9NYW5pZmVzdFNldHRpbmdzIGFzIE9iamVjdFBhZ2VNYW5pZmVzdFNldHRpbmdzKS5jb250ZW50Py5oZWFkZXI/LmFuY2hvckJhclZpc2libGUgIT09IHVuZGVmaW5lZFxuXHRcdFx0PyAhISh0aGlzLm9NYW5pZmVzdFNldHRpbmdzIGFzIE9iamVjdFBhZ2VNYW5pZmVzdFNldHRpbmdzKS5jb250ZW50Py5oZWFkZXI/LmFuY2hvckJhclZpc2libGVcblx0XHRcdDogdHJ1ZTtcblx0fVxuXG5cdC8qKlxuXHQgKiBEZWZpbmVzIHdoZXRoZXIgb3Igbm90IHRoZSBzZWN0aW9uIHdpbGwgYmUgZGlzcGxheWVkIGluIGRpZmZlcmVudCB0YWJzLlxuXHQgKlxuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZSBpY29uIHRhYiBiYXIgc2hvdWxkIGJlIHVzZWQgaW5zdGVhZCBvZiBzY3JvbGxpbmdcblx0ICovXG5cdHVzZUljb25UYWJCYXIoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuIHRoaXMuZ2V0U2hvd0FuY2hvckJhcigpICYmICh0aGlzLm9NYW5pZmVzdFNldHRpbmdzIGFzIE9iamVjdFBhZ2VNYW5pZmVzdFNldHRpbmdzKS5zZWN0aW9uTGF5b3V0ID09PSBcIlRhYnNcIjtcblx0fVxuXG5cdC8qKlxuXHQgKiBSZXR1cm5zIHRydWUgaWYgdGhlIG9iamVjdCBwYWdlIGhlYWRlciBpcyB0byBiZSBzaG93bi5cblx0ICpcblx0ICogQHJldHVybnMge2Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgb2JqZWN0IHBhZ2UgaGVhZGVyIGlzIHRvIGJlIGRpc3BsYXllZFxuXHQgKi9cblx0Z2V0U2hvd09iamVjdFBhZ2VIZWFkZXIoKTogYm9vbGVhbiB7XG5cdFx0cmV0dXJuICh0aGlzLm9NYW5pZmVzdFNldHRpbmdzIGFzIE9iamVjdFBhZ2VNYW5pZmVzdFNldHRpbmdzKS5jb250ZW50Py5oZWFkZXI/LnZpc2libGUgIT09IHVuZGVmaW5lZFxuXHRcdFx0PyAhISh0aGlzLm9NYW5pZmVzdFNldHRpbmdzIGFzIE9iamVjdFBhZ2VNYW5pZmVzdFNldHRpbmdzKS5jb250ZW50Py5oZWFkZXI/LnZpc2libGVcblx0XHRcdDogdHJ1ZTtcblx0fVxuXG5cdC8vZW5kcmVnaW9uIE9QIFNwZWNpZmljXG5cblx0Ly9yZWdpb24gTFIgU3BlY2lmaWNcblxuXHQvKipcblx0ICogUmV0cmlldmVzIHRoZSBtdWx0aXBsZSB2aWV3IGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgbWFuaWZlc3QuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtNdWx0aXBsZVZpZXdzQ29uZmlndXJhdGlvbn0gVGhlIHZpZXdzIHRoYXQgcmVwcmVzZW50IHRoZSBtYW5pZmVzdCBvYmplY3Rcblx0ICovXG5cdGdldFZpZXdDb25maWd1cmF0aW9uKCk6IE11bHRpcGxlVmlld3NDb25maWd1cmF0aW9uIHwgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gKHRoaXMub01hbmlmZXN0U2V0dGluZ3MgYXMgTGlzdFJlcG9ydE1hbmlmZXN0U2V0dGluZ3MpLnZpZXdzO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHJpZXZlcyB0aGUgS1BJIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgbWFuaWZlc3QuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtvYmplY3R9IFJldHVybnMgYSBtYXAgYmV0d2VlbiBLUEkgbmFtZXMgYW5kIHRoZWlyIHJlc3BlY3RpdmUgY29uZmlndXJhdGlvblxuXHQgKi9cblx0Z2V0S1BJQ29uZmlndXJhdGlvbigpOiB7IFtrcGlOYW1lOiBzdHJpbmddOiBLUElDb25maWd1cmF0aW9uIH0ge1xuXHRcdHJldHVybiAodGhpcy5vTWFuaWZlc3RTZXR0aW5ncyBhcyBMaXN0UmVwb3J0TWFuaWZlc3RTZXR0aW5ncykua2V5UGVyZm9ybWFuY2VJbmRpY2F0b3JzIHx8IHt9O1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHJpZXZlcyB0aGUgZmlsdGVyIGNvbmZpZ3VyYXRpb24gZnJvbSB0aGUgbWFuaWZlc3QuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtGaWx0ZXJNYW5pZmVzdENvbmZpZ3VyYXRpb259IFRoZSBmaWx0ZXIgY29uZmlndXJhdGlvbiBmcm9tIHRoZSBtYW5pZmVzdFxuXHQgKi9cblx0Z2V0RmlsdGVyQ29uZmlndXJhdGlvbigpOiBGaWx0ZXJNYW5pZmVzdENvbmZpZ3VyYXRpb24ge1xuXHRcdHJldHVybiB0aGlzLmdldENvbnRyb2xDb25maWd1cmF0aW9uKFwiQGNvbS5zYXAudm9jYWJ1bGFyaWVzLlVJLnYxLlNlbGVjdGlvbkZpZWxkc1wiKTtcblx0fVxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSBlbnRpdHkgc2V0cyB0byBiZSBkaXNwbGF5ZWQuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtib29sZWFufSBgdHJ1ZWAgaWYgdGhlcmUgYXJlIG11bHRpcGxlIGVudGl0eSBzZXRzXG5cdCAqL1xuXHRoYXNNdWx0aXBsZUVudGl0eVNldHMoKTogYm9vbGVhbiB7XG5cdFx0Y29uc3Qgdmlld0NvbmZpZyA9IHRoaXMuZ2V0Vmlld0NvbmZpZ3VyYXRpb24oKSB8fCB7IHBhdGhzOiBbXSB9O1xuXHRcdGNvbnN0IG1hbmlmZXN0RW50aXR5U2V0ID0gdGhpcy5vTWFuaWZlc3RTZXR0aW5ncy5lbnRpdHlTZXQ7XG5cdFx0cmV0dXJuIChcblx0XHRcdHZpZXdDb25maWcucGF0aHMuZmluZCgocGF0aDogVmlld0NvbmZpZ3VyYXRpb24pID0+IHtcblx0XHRcdFx0aWYgKChwYXRoIGFzIEN1c3RvbVZpZXdUZW1wbGF0ZUNvbmZpZ3VyYXRpb24pPy50ZW1wbGF0ZSkge1xuXHRcdFx0XHRcdHJldHVybiB1bmRlZmluZWQ7XG5cdFx0XHRcdH0gZWxzZSBpZiAodGhpcy5oYXNNdWx0aXBsZVZpc3VhbGl6YXRpb25zKHBhdGggYXMgQ29tYmluZWRWaWV3UGF0aENvbmZpZ3VyYXRpb24pKSB7XG5cdFx0XHRcdFx0Y29uc3QgeyBwcmltYXJ5LCBzZWNvbmRhcnkgfSA9IHBhdGggYXMgQ29tYmluZWRWaWV3UGF0aENvbmZpZ3VyYXRpb247XG5cdFx0XHRcdFx0cmV0dXJuIChcblx0XHRcdFx0XHRcdHByaW1hcnkuc29tZShwYXRoID0+IHBhdGguZW50aXR5U2V0ICYmIHBhdGguZW50aXR5U2V0ICE9PSBtYW5pZmVzdEVudGl0eVNldCkgfHxcblx0XHRcdFx0XHRcdHNlY29uZGFyeS5zb21lKHBhdGggPT4gcGF0aC5lbnRpdHlTZXQgJiYgcGF0aC5lbnRpdHlTZXQgIT09IG1hbmlmZXN0RW50aXR5U2V0KVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0cGF0aCA9IHBhdGggYXMgU2luZ2xlVmlld1BhdGhDb25maWd1cmF0aW9uO1xuXHRcdFx0XHRcdHJldHVybiBwYXRoLmVudGl0eVNldCAmJiBwYXRoLmVudGl0eVNldCAhPT0gbWFuaWZlc3RFbnRpdHlTZXQ7XG5cdFx0XHRcdH1cblx0XHRcdH0pICE9PSB1bmRlZmluZWRcblx0XHQpO1xuXHR9XG5cblx0LyoqXG5cdCAqIFJldHVybnMgdGhlIGNvbnRleHQgcGF0aCBmb3IgdGhlIHRlbXBsYXRlIGlmIGl0IGlzIHNwZWNpZmllZCBpbiB0aGUgbWFuaWZlc3QuXG5cdCAqXG5cdCAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb250ZXh0IHBhdGggZm9yIHRoZSB0ZW1wbGF0ZVxuXHQgKi9cblx0Z2V0Q29udGV4dFBhdGgoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcblx0XHRyZXR1cm4gdGhpcy5vTWFuaWZlc3RTZXR0aW5ncz8uY29udGV4dFBhdGg7XG5cdH1cblxuXHQvKipcblx0ICogUmV0dXJucyB0cnVlIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSB2aXN1YWxpemF0aW9ucy5cblx0ICpcblx0ICogQHBhcmFtIHtWaWV3UGF0aENvbmZpZ3VyYXRpb259IHBhdGggVGhlIHBhdGggZnJvbSB0aGUgdmlld1xuXHQgKiBAcmV0dXJucyB7Ym9vbGVhbn0gYHRydWVgIGlmIHRoZXJlIGFyZSBtdWx0aXBsZSB2aXN1YWxpemF0aW9uc1xuXHQgKi9cblx0aGFzTXVsdGlwbGVWaXN1YWxpemF0aW9ucyhwYXRoPzogVmlld1BhdGhDb25maWd1cmF0aW9uKTogYm9vbGVhbiB7XG5cdFx0aWYgKCFwYXRoKSB7XG5cdFx0XHRjb25zdCB2aWV3Q29uZmlnID0gdGhpcy5nZXRWaWV3Q29uZmlndXJhdGlvbigpIHx8IHsgcGF0aHM6IFtdIH07XG5cdFx0XHRyZXR1cm4gdmlld0NvbmZpZy5wYXRocy5zb21lKHBhdGggPT4ge1xuXHRcdFx0XHRyZXR1cm4gKFxuXHRcdFx0XHRcdChwYXRoIGFzIENvbWJpbmVkVmlld1BhdGhDb25maWd1cmF0aW9uKS5wcmltYXJ5Py5sZW5ndGggPiAwICYmXG5cdFx0XHRcdFx0KHBhdGggYXMgQ29tYmluZWRWaWV3UGF0aENvbmZpZ3VyYXRpb24pLnNlY29uZGFyeT8ubGVuZ3RoID4gMFxuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXHRcdHJldHVybiAocGF0aCBhcyBDb21iaW5lZFZpZXdQYXRoQ29uZmlndXJhdGlvbikucHJpbWFyeT8ubGVuZ3RoID4gMCAmJiAocGF0aCBhcyBDb21iaW5lZFZpZXdQYXRoQ29uZmlndXJhdGlvbikuc2Vjb25kYXJ5Py5sZW5ndGggPiAwO1xuXHR9XG5cblx0Ly9lbmQgcmVnaW9uIExSIFNwZWNpZmljXG59XG5cbmV4cG9ydCBkZWZhdWx0IE1hbmlmZXN0V3JhcHBlcjtcbiJdfQ==