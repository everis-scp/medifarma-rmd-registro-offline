/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

/**
 * Filter Bar helper
 */
sap.ui.define(
	["sap/fe/macros/CommonHelper", "sap/fe/core/CommonUtils", "sap/fe/core/helpers/ModelHelper"],
	function(CommonHelper, CommonUtils, ModelHelper) {
		"use strict";

		var FilterBarHelper = {
			/*
			 * Method to check if the Basic Serch Field in FilterBar is visible.
			 * @function
			 * @name checkIfBasicSearchIsVisible
			 * @memberof sap.fe.macros.FilterBarHelper.js
			 * @param {object} - oContext: Interface to the arguemnts of the function
			 * @param {boolean} - hideBasicSearch: visibility of Basic Search Field
			 * @param {object} - oEntityType: entityType
			 * @return : {boolean} True, if property hideBasisSearch is not equal "true" and
			 * 					   either there are no SearchRestrictions or property SearchRestrictions.Searchable is equal true.
			 */
			checkIfBasicSearchIsVisible: function(oContext, hideBasicSearch, oEntityType) {
				var searchRestrictionAnnotation;
				if (hideBasicSearch !== "true") {
					var oInterface = oEntityType && oContext.getInterface(1);
					var sEntityTypePath = oInterface.getPath();
					var sEntitySetPath = ModelHelper.getEntitySetPath(sEntityTypePath);

					searchRestrictionAnnotation = CommonUtils.getSearchRestrictions(sEntitySetPath, oInterface.getModel());
					return !searchRestrictionAnnotation || searchRestrictionAnnotation.Searchable;
				}
				return false;
			}
		};

		FilterBarHelper.checkIfBasicSearchIsVisible.requiresIContext = true;

		return FilterBarHelper;
	},
	/* bExport= */ true
);
