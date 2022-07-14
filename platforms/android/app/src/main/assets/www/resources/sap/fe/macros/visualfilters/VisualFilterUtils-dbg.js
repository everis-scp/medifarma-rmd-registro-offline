/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

sap.ui.define(["sap/fe/core/templating/FilterHelper", "sap/ui/core/format/NumberFormat", "sap/ui/mdc/condition/Condition", "sap/base/Log"],function(FilterHelper, NumberFormat, Condition, Log) {
	"use strict";
	var oVisualFilterUtils = {
		/**
		 * Applies median scale to the chart data.
		 *
		 * @param {object} oVisualFilter VisualFilter control
		 * @param {object} oView Instance of View
		 * @param {string} sVFId Id of Visual Filter control
		 */
		applyMedianScaleToChartData: function(oVisualFilter, oView, sVFId) {
			var aAggregation;
			var oData = [];
			var sMeasure = oVisualFilter.data("measure");
			var oInternalModelContext = oView.getBindingContext("internal");
			aAggregation =
				(oVisualFilter.getPoints && oVisualFilter.getPoints()) ||
				(oVisualFilter.getBars && oVisualFilter.getBars()) ||
				(oVisualFilter.getSegments && oVisualFilter.getSegments());
			for (var i = 0; i < aAggregation.length; i++) {
				oData.push(aAggregation[i].getBindingContext().getObject());
			}
			var scaleFactor = this._getMedianScaleFactor(oData, sMeasure);
			if (scaleFactor && scaleFactor.iShortRefNumber && scaleFactor.scale) {
				oInternalModelContext.setProperty("scalefactor/" + sVFId, scaleFactor.scale);
				oInternalModelContext.setProperty("scalefactorNumber/" + sVFId, scaleFactor.iShortRefNumber);
			} else {
				oInternalModelContext.setProperty("scalefactor/" + sVFId, "");
				oInternalModelContext.setProperty("scalefactorNumber/" + sVFId, "");
				var oScaleTitle = oView.byId(sVFId + "::ScaleUoMTitle");
				var oMeasureDimensionTitle = oView.byId(sVFId + "::MeasureDimensionTitle");
				var sText = oScaleTitle.getText();
				if (sText === " | ") {
					oScaleTitle.setVisible(false);
					oMeasureDimensionTitle.setTooltip(oMeasureDimensionTitle.getText());
				}
			}
		},
		/**
		 * Returns the median scale factor.
		 *
		 * @param {object} oData VisualFilter Data
		 * @param {string} sMeasureField Path of the Measure
		 * @returns {object} Object containing scale and iShortRefNumber
		 */
		_getMedianScaleFactor: function(oData, sMeasureField) {
			oData.sort(function(a, b) {
				if (Number(a[sMeasureField]) < Number(b[sMeasureField])) {
					return -1;
				}
				if (Number(a[sMeasureField]) > Number(b[sMeasureField])) {
					return 1;
				}
				return 0;
			});
			if (oData.length > 0) {
				// get median index
				var iMid = oData.length / 2, // get mid of array
					// if iMid is whole number, array length is even, calculate median
					// if iMid is not whole number, array length is odd, take median as iMid - 1
					iMedian =
						iMid % 1 === 0
							? (parseFloat(oData[iMid - 1][sMeasureField]) + parseFloat(oData[iMid][sMeasureField])) / 2
							: parseFloat(oData[Math.floor(iMid)][sMeasureField]),
					// get scale factor on median
					val = iMedian,
					scaleFactor;
				for (var i = 0; i < 14; i++) {
					scaleFactor = Math.pow(10, i);
					if (Math.round(Math.abs(val) / scaleFactor) < 10) {
						break;
					}
				}
			}

			var fixedInteger = NumberFormat.getIntegerInstance({
				style: "short",
				showScale: false,
				shortRefNumber: scaleFactor
			});

			// apply scale factor to other values and check
			for (var i = 0; i < oData.length; i++) {
				var aData = oData[i],
					sScaledValue = fixedInteger.format(aData[sMeasureField]),
					aScaledValueParts = sScaledValue.split(".");
				// if scaled value has only 0 before decimal or 0 after decimal (example: 0.02)
				// then ignore this scale factor else proceed with this scale factor
				// if scaled value divided by 1000 is >= 1000 then also ignore scale factor
				if (
					(!aScaledValueParts[1] && parseInt(aScaledValueParts[0], 10) === 0) ||
					(aScaledValueParts[1] && parseInt(aScaledValueParts[0], 10) === 0 && aScaledValueParts[1].indexOf("0") === 0) ||
					sScaledValue / 1000 >= 1000
				) {
					scaleFactor = undefined;
					break;
				}
			}
			return {
				iShortRefNumber: scaleFactor,
				scale: scaleFactor ? fixedInteger.getScale() : ""
			};
		},
		/**
		 * Returns the Formmated Number.
		 *
		 * @param {string | number} value Value which needs to be formatted
		 * @param {string} scaleFactor ScaleFactor to which the value needs to be scaled
		 * @returns {number} Formatted Number
		 */
		getFormattedNumber: function(value, scaleFactor) {
			value = typeof value === "string" ? Number(value.replace(/,/g, "")) : value;
			var fixedInteger = NumberFormat.getFloatInstance({
				style: "short",
				showScale: false,
				shortRefNumber: scaleFactor
			});
			// parseFloat(value) is required otherwise -ve value are worngly rounded off
			// Example: "-1.9" rounds off to -1 instead of -2. however -1.9 rounds off to -2
			return fixedInteger.format(parseFloat(value));
		},
		/**
		 * Returns the VisualFilter Control based on the event binding.
		 *
		 * @param {object} oFilterBar Instance of FilterBar
		 * @param {object} oSourceBinding Binding of the Event
		 * @returns {object | undefined} Visual Filter Control
		 */
		getVisualFilterControl: function(oFilterBar, oSourceBinding) {
			var aVFs = oFilterBar._oFilterBarLayout.getFilterFields(),
				oBinding;
			for (var i = 0; i <= aVFs.length; i++) {
				var oVisualFilter = aVFs[i]
					.getContent()[0]
					.getContent()
					.getItems()[1]
					.getItems()[0];
				oBinding = oVisualFilter.getBinding("points") || oVisualFilter.getBinding("bars") || oVisualFilter.getBinding("segments");
				if (oSourceBinding === oBinding) {
					return oVisualFilter;
				}
			}
			return undefined;
		},
		/**
		 * Applies the UOM to the Visual Filter Control Title.
		 *
		 * @param {object} oVisualFilter Instance of VisualFilter
		 * @param {object} oContextData Data of the VisualFilter
		 * @param {object} oView Instance of the View
		 */
		applyUOMToTitle: function(oVisualFilter, oContextData, oView) {
			var sId = oVisualFilter.getId().split("fe::VisualFilter");
			var vUOM = oVisualFilter.data("uom"),
				sUOM;
			if (vUOM && vUOM["ISOCurrency"]) {
				sUOM = vUOM["ISOCurrency"];
			} else if (vUOM && vUOM["Unit"]) {
				sUOM = vUOM["Unit"];
			}
			if (sUOM) {
				var sUOMValue = sUOM.$Path ? oContextData[sUOM.$Path] : sUOM;
				var sVFId = "fe::VisualFilter" + sId[1];
				var oInternalModelContext = oView.getBindingContext("internal");
				oInternalModelContext.setProperty("uom/" + sVFId, sUOMValue);
			}
		},
		/**
		 * Updates the Scale Factor in the title of the Visual Filter.
		 *
		 * @param {object} oVisualFilter Instance of VisualFilter
		 * @param {object} oView Instance of the View
		 */
		updateChartScaleFactorTitle: function(oVisualFilter, oView) {
			var sId = oVisualFilter.getId().split("fe::VisualFilter");
			var sVFId = "fe::VisualFilter" + sId[1];
			if (!oVisualFilter.data("scalefactor")) {
				this.applyMedianScaleToChartData(oVisualFilter, oView, sVFId);
			} else {
				var fixedInteger = NumberFormat.getIntegerInstance({
					style: "short",
					showScale: false,
					shortRefNumber: oVisualFilter.data("scalefactor")
				});
				var oInternalModelContext = oView.getBindingContext("internal");
				oInternalModelContext.setProperty("scalefactor/" + sVFId, fixedInteger.getScale());
			}
		},
		/**
		 * Applies overlay on the VisualFilter if there is an error.
		 *
		 * @param {string} sI18n Text of the overlay message
		 * @param {string} sChartId ID of the Visual Filter
		 * @param {object} oView Instance of the View
		 */
		applyOverLay: function(sI18n, sChartId, oView) {
			var oInternalModelContext = oView.getBindingContext("internal");
			oInternalModelContext.setProperty(sChartId, {});
			oInternalModelContext.setProperty(sChartId, { "VFOverLayMessage": sI18n, "showOverLayForVF": true });
		},
		/**
		 * Checks if Multiple Units are present.
		 *
		 * @param {object} oContexts Contexts of the VisualFilter
		 * @param {object} sUnitfield Unit Field path
		 * @returns {boolean} Returns if multiple units are configured or not
		 */
		checkMulitUnit: function(oContexts, sUnitfield) {
			var aData = [];
			if (oContexts && sUnitfield) {
				for (var i = 0; i < oContexts.length; i++) {
					var aContextData = oContexts[i] && oContexts[i].getObject();
					aData.push(aContextData[sUnitfield]);
				}
			}
			return !!aData.reduce(function(data, key) {
				return data === key ? data : NaN;
			});
		},
		/**
		 * Sets an error message if Multiple UOM are present.
		 *
		 * @param {object} oData Data of the VisualFilter control
		 * @param {object} oVisualFilter Instance of Visual Filter
		 * @param {string} sChartId Id of Visual Filter control
		 * @param {string} oResourceBundle Resource Bundle
		 * @param {string} oView Instance of View
		 */
		setMultiUOMMessage: function(oData, oVisualFilter, sChartId, oResourceBundle, oView) {
			var vUOM = oVisualFilter.data("uom");
			var sIsCurrency = vUOM && vUOM["ISOCurrency"] && vUOM["ISOCurrency"].$Path;
			var sIsUnit = vUOM && vUOM["Unit"] && vUOM["Unit"].$Path;
			var sUnitfield = sIsCurrency || sIsUnit;
			var s18n;
			if (sUnitfield) {
				if (!this.checkMulitUnit(oData, sUnitfield)) {
					if (sIsCurrency) {
						s18n = oResourceBundle.getText("M_VISUAL_FILTERS_MULTIPLE_CURRENCY", sUnitfield);
						this.applyOverLay(s18n, sChartId, oView);
						Log.warning("Filter is set for multiple Currency for" + sUnitfield);
					} else if (sIsUnit) {
						s18n = oResourceBundle.getText("M_VISUAL_FILTERS_MULTIPLE_UNIT", sUnitfield);
						this.applyOverLay(s18n, sChartId, oView);
						Log.warning("Filter is set for multiple UOMs for" + sUnitfield);
					}
				}
			}
		},
		/**
		 * Sets an error message if Response data is empty.
		 * @param {string} sChartId Id of Visual Filter control
		 * @param {string} oResourceBundle Resource Bundle
		 * @param {string} oView Instance of View
		 */
		setNoDataMessage: function(sChartId, oResourceBundle, oView) {
			var s18n = oResourceBundle.getText("M_VISUAL_FILTER_NO_DATA_TEXT");
			this.applyOverLay(s18n, sChartId, oView);
		},
		convertFilterCondions: function(oFilterConditions) {
			var oConvertedConditions = {};
			Object.keys(oFilterConditions).forEach(function(sKey) {
				var aConvertedConditions = [];
				var aConditions = oFilterConditions[sKey];
				for (var i = 0; i < aConditions.length; i++) {
					var values = aConditions[i].value2 ? [aConditions[i].value1, aConditions[i].value2] : [aConditions[i].value1];
					aConvertedConditions.push(Condition.createCondition(aConditions[i].operator, values, null, null, "Validated"));
				}
				if (aConvertedConditions.length) {
					oConvertedConditions[sKey] = aConvertedConditions;
				}
			});
			return oConvertedConditions;
		},
		getCustomConditions: function(Range, oValidProperty, sPropertyName) {
			var value1, value2;
			if (oValidProperty.$Type === "Edm.DateTimeOffset") {
				value1 = this._parseDateTime(FilterHelper.getTypeCompliantValue(this._formatDateTime(Range.Low), oValidProperty.$Type));
				value2 = Range.High
					? this._parseDateTime(FilterHelper.getTypeCompliantValue(this._formatDateTime(Range.High), oValidProperty.$Type))
					: null;
			} else {
				value1 = Range.Low;
				value2 = Range.High ? Range.High : null;
			}
			return {
				operator: Range.Option ? FilterHelper.getOperator(Range.Option.$EnumMember || Range.Option) : null,
				value1: value1,
				value2: value2,
				path: sPropertyName
			};
		},
		_parseDateTime: function(sValue) {
			return this._getDateTimeTypeInstance().parseValue(sValue, "string");
		},
		_formatDateTime: function(sValue) {
			return this._getDateTimeTypeInstance().formatValue(sValue, "string");
		},
		_getDateTimeTypeInstance: function() {
			return new sap.ui.model.odata.type.DateTimeOffset(
				{ pattern: "yyyy-MM-ddTHH:mm:ssZ", calendarType: "Gregorian" },
				{ V4: true }
			);
		}
	};

	return oVisualFilterUtils;
});
