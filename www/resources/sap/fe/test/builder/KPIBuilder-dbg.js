/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./FEBuilder", "sap/ui/test/OpaBuilder", "sap/fe/test/Utils"], function(FEBuilder, OpaBuilder, Utils) {
	"use strict";

	var KPIBuilder = function() {
		return FEBuilder.apply(this, arguments);
	};

	KPIBuilder.create = function(oOpaInstance) {
		return new KPIBuilder(oOpaInstance);
	};

	KPIBuilder.prototype = Object.create(FEBuilder.prototype);
	KPIBuilder.prototype.constructor = KPIBuilder;

	/**
	 * Checks if a KPI exists with a given label and other optional properties.
	 *
	 * @param {string} sKPILabel The label of the new variant
	 * @param {object} oKPIProperties Additional optional properties on the KPI (status, number, or unit)
	 * @returns {sap.fe.test.builder.KPIBuilder} This instance
	 * @public
	 * @ui5-restricted
	 */
	KPIBuilder.prototype.checkKPI = function(sKPILabel, oKPIProperties) {
		var oTagProperties = { text: sKPILabel };

		if (oKPIProperties && oKPIProperties.status) {
			oTagProperties.status = oKPIProperties.status;
		}

		var retValue = this.hasType("sap.m.GenericTag").hasProperties(oTagProperties);

		if (oKPIProperties && (oKPIProperties.number || oKPIProperties.unit)) {
			var oNumberProperties = {};
			if (oKPIProperties.number) {
				oNumberProperties.number = oKPIProperties.number;
			}
			if (oKPIProperties.unit) {
				oNumberProperties.unit = oKPIProperties.unit;
			}
			retValue = retValue.hasChildren(
				FEBuilder.create(this)
					.hasType("sap.m.ObjectNumber")
					.hasProperties(oNumberProperties)
			);
		}
		return retValue;
	};

	return KPIBuilder;
});
