import { ControllerExtension } from "sap/ui/core/mvc";
import { ControllerExtensionMetadata } from "sap/fe/core/controllerextensions";
import { UI5Class, Override } from "../helpers/ClassSupport";
import { JSONModel } from "sap/ui/model/json";
import { Log } from "sap/base";
import { KPIDefinition } from "sap/fe/core/converters/controls/Common/KPI";
import { CommonUtils } from "sap/fe/core";
import { Context } from "sap/ui/model/odata/v4";
import { MessageType } from "sap/fe/core/formatters/TableFormatterTypes";
import { FilterDefinition } from "sap/fe/core/converters/helpers/SelectionVariantHelper";
import { NumberFormat } from "sap/ui/core/format";
import { Locale } from "sap/ui/core";
import { Filter, FilterOperator } from "sap/ui/model";

/**
 * Function to calculate a message state from a criticality value.
 *
 * @param {number|string} criticalityValue The criticality values.
 * @returns {MessageType} Returns the corresponding MessageType
 */
function messageTypeFromCriticality(criticalityValue: number | string): MessageType {
	let criticalityProperty: MessageType;

	switch (criticalityValue) {
		case 1:
			criticalityProperty = MessageType.Error;
			break;
		case 2:
			criticalityProperty = MessageType.Warning;
			break;
		case 3:
			criticalityProperty = MessageType.Success;
			break;
		case 5:
			criticalityProperty = MessageType.Information;
			break;
		default:
			criticalityProperty = MessageType.None;
	}

	return criticalityProperty;
}

/**
 * Function to calculate the message state for a criticality calculation of type 'Target'.
 *
 * @param {number} kpiValue The value of the KPI to be tested against.
 * @param {number[]} aThresholds Thresholds to be used [DeviationRangeLowValue,ToleranceRangeLowValue,AcceptanceRangeLowValue,AcceptanceRangeHighValue,ToleranceRangeHighValue,DeviationRangeHighValue].
 * @returns {MessageType} Returns the corresponding MessageType
 */
function messageTypeFromTargetCalculation(kpiValue: number, aThresholds: (number | undefined | null)[]): MessageType {
	let criticalityProperty: MessageType;

	if (aThresholds[0] !== undefined && aThresholds[0] !== null && kpiValue < aThresholds[0]) {
		criticalityProperty = MessageType.Error;
	} else if (aThresholds[1] !== undefined && aThresholds[1] !== null && kpiValue < aThresholds[1]) {
		criticalityProperty = MessageType.Warning;
	} else if (aThresholds[2] !== undefined && aThresholds[2] !== null && kpiValue < aThresholds[2]) {
		criticalityProperty = MessageType.None;
	} else if (aThresholds[5] !== undefined && aThresholds[5] !== null && kpiValue > aThresholds[5]) {
		criticalityProperty = MessageType.Error;
	} else if (aThresholds[4] !== undefined && aThresholds[4] !== null && kpiValue > aThresholds[4]) {
		criticalityProperty = MessageType.Warning;
	} else if (aThresholds[3] !== undefined && aThresholds[3] !== null && kpiValue > aThresholds[3]) {
		criticalityProperty = MessageType.None;
	} else {
		criticalityProperty = MessageType.Success;
	}

	return criticalityProperty;
}

/**
 * Function to calculate the message state for a criticality calculation of type 'Minimize'.
 *
 * @param {number} kpiValue The value of the KPI to be tested against.
 * @param {number[]} aThresholds Thresholds to be used [AcceptanceRangeHighValue,ToleranceRangeHighValue,DeviationRangeHighValue].
 * @returns {MessageType} Returns the corresponding MessageType
 */
function messageTypeFromMinimizeCalculation(kpiValue: number, aThresholds: (number | undefined | null)[]): MessageType {
	let criticalityProperty: MessageType;

	if (aThresholds[2] !== undefined && aThresholds[2] !== null && kpiValue > aThresholds[2]) {
		criticalityProperty = MessageType.Error;
	} else if (aThresholds[1] !== undefined && aThresholds[1] !== null && kpiValue > aThresholds[1]) {
		criticalityProperty = MessageType.Warning;
	} else if (aThresholds[0] !== undefined && aThresholds[0] !== null && kpiValue > aThresholds[0]) {
		criticalityProperty = MessageType.None;
	} else {
		criticalityProperty = MessageType.Success;
	}

	return criticalityProperty;
}

/**
 * Function to calculate the message state for a criticality calculation of type 'Maximize'.
 *
 * @param {number} kpiValue The value of the KPI to be tested against.
 * @param {number[]} aThresholds Thresholds to be used [DeviationRangeLowValue,ToleranceRangeLowValue,AcceptanceRangeLowValue].
 * @returns {MessageType} Returns the corresponding MessageType
 */
function messageTypeFromMaximizeCalculation(kpiValue: number, aThresholds: (number | undefined | null)[]): MessageType {
	let criticalityProperty: MessageType;

	if (aThresholds[0] !== undefined && aThresholds[0] !== null && kpiValue < aThresholds[0]) {
		criticalityProperty = MessageType.Error;
	} else if (aThresholds[1] !== undefined && aThresholds[1] !== null && kpiValue < aThresholds[1]) {
		criticalityProperty = MessageType.Warning;
	} else if (aThresholds[2] !== undefined && aThresholds[2] !== null && kpiValue < aThresholds[2]) {
		criticalityProperty = MessageType.None;
	} else {
		criticalityProperty = MessageType.Success;
	}

	return criticalityProperty;
}

/**
 * Creates a sap.ui.model.Filter from a filter definition.
 *
 * @param filterDefinition The filter definition
 * @returns Returns a sap.ui.model.Filter from the definition, or undefined if the definition is empty (no ranges)
 */
export function createFilterFromDefinition(filterDefinition: FilterDefinition): Filter | undefined {
	if (filterDefinition.ranges.length === 0) {
		return undefined;
	} else if (filterDefinition.ranges.length === 1) {
		return new Filter(
			filterDefinition.propertyPath,
			filterDefinition.ranges[0].operator as FilterOperator,
			filterDefinition.ranges[0].rangeLow,
			filterDefinition.ranges[0].rangeHigh
		);
	} else {
		const aRangeFilters = filterDefinition.ranges.map(range => {
			return new Filter(filterDefinition.propertyPath, range.operator as FilterOperator, range.rangeLow, range.rangeHigh);
		});
		return new Filter({
			filters: aRangeFilters,
			and: false
		});
	}
}

/**
 * @class A controller extension for managing KPI in an AnalyticalListPage
 *
 * @name sap.fe.core.controllerextensions.KPIManagement
 * @hideconstructor
 *
 * @private
 * @since 1.93.0
 */
@UI5Class("sap.fe.core.controllerextensions.KPIManagement", ControllerExtensionMetadata)
class KPIManagementControllerExtension extends ControllerExtension {
	protected aKPIDefinitions?: KPIDefinition[];
	protected oAppComponent!: any;

	@Override()
	public onInit(): void {
		this.aKPIDefinitions = this.getKPIData();

		if (this.aKPIDefinitions && this.aKPIDefinitions.length) {
			const oView = this.getView();
			this.oAppComponent = CommonUtils.getAppComponent(oView);

			// Create a JSON model to store KPI data
			const oKPIModel = new JSONModel();
			oView.setModel(oKPIModel, "kpiModel");

			this.aKPIDefinitions.forEach(kpiDefinition => {
				// Create the manifest for the KPI card and store it in the KPI model
				const oCardManifest = {
					"sap.app": {
						id: "sap.fe",
						type: "card"
					},
					"sap.ui": {
						technology: "UI5"
					},
					"sap.card": {
						type: "Analytical",
						data: {
							json: {}
						},
						header: {
							type: "Numeric",
							mainIndicator: {
								number: "{mainValue}",
								unit: "{mainUnit}"
							},
							title: "{cardTitle}"
						},
						content: {
							plotArea: {
								"dataLabel": {
									"visible": false
								},
								"categoryAxisText": {
									"visible": false
								},
								"valueAxisText": {
									"visible": false
								}
							},
							title: {
								text: "{chartTitle}",
								visible: true,
								alignment: "Left"
							},
							measureAxis: "valueAxis",
							dimensionAxis: "categoryAxis",
							data: {
								path: "/chartData"
							}
						}
					}
				};

				oKPIModel.setProperty("/" + kpiDefinition.id, {
					manifest: oCardManifest
				});

				// Load tag data for the KPI
				this.loadKPITagData(kpiDefinition).catch(function(err: any) {
					Log.error(err);
				});
			});
		}
	}

	@Override()
	public onExit(): void {
		const oKPIModel = this.getView().getModel("kpiModel") as JSONModel;

		if (oKPIModel) {
			oKPIModel.destroy();
		}
	}

	private getKPIData(): KPIDefinition[] | undefined {
		const oView = this.getView(),
			sCustomData = oView.getContent()[0].data("KPIData");

		if (sCustomData) {
			const vData = typeof sCustomData === "string" ? JSON.parse(sCustomData) : sCustomData;
			if ("customData" in vData) {
				return vData["customData"];
			} else {
				return vData;
			}
		} else {
			return undefined;
		}
	}

	/**
	 * Loads tag data for a KPI.
	 *
	 * @param {KPIDefinition} kpiDefinition The definition of the KPI.
	 * @returns {Promise} Returns the Promise that is resolved when data is loaded.
	 */
	protected loadKPITagData(kpiDefinition: KPIDefinition): any {
		const oModel = this.oAppComponent.getModel();
		const oKPIModel = this.getView().getModel("kpiModel") as JSONModel;
		const oListBinding = oModel.bindList("/" + kpiDefinition.entitySet);
		const oAggregate: Record<string, { unit?: string }> = {};

		// Main value + currency/unit
		if (kpiDefinition.datapoint.unit?.isPath) {
			oAggregate[kpiDefinition.datapoint.propertyPath] = { unit: kpiDefinition.datapoint.unit.value };
		} else {
			oAggregate[kpiDefinition.datapoint.propertyPath] = {};
		}

		// Property for criticality
		if (kpiDefinition.datapoint.criticalityPath) {
			oAggregate[kpiDefinition.datapoint.criticalityPath] = {};
		}
		oListBinding.setAggregation({ aggregate: oAggregate });

		// Manage SelectionVariant filters
		if (kpiDefinition.selectionVariantFilterDefinitions?.length) {
			const aFilters = kpiDefinition.selectionVariantFilterDefinitions.map(createFilterFromDefinition);
			oListBinding.filter(aFilters);
		}

		return oListBinding.requestContexts(0, 1).then((aContexts: Context[]) => {
			if (aContexts.length) {
				const currentLocale = new Locale(
					sap.ui
						.getCore()
						.getConfiguration()
						.getLanguage()
				);
				const rawUnit = kpiDefinition.datapoint.unit?.isPath
					? aContexts[0].getProperty(kpiDefinition.datapoint.unit.value)
					: kpiDefinition.datapoint.unit?.value;

				if (kpiDefinition.datapoint.unit && !rawUnit) {
					// A unit/currency is defined, but its value is undefined --> multi-unit situation
					oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainValue", "*");
					oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainValueUnscaled", "*");
					oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainUnit", undefined);
					oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality", MessageType.None);
				} else {
					const isPercentage = kpiDefinition.datapoint.unit?.isCurrency === false && rawUnit === "%";

					// Main KPI value
					const rawValue = Number.parseFloat(aContexts[0].getProperty(kpiDefinition.datapoint.propertyPath));
					const kpiValue = NumberFormat.getFloatInstance(
						{
							style: isPercentage ? undefined : "short",
							minFractionDigits: 0,
							maxFractionDigits: 1,
							showScale: !isPercentage
						},
						currentLocale
					).format(rawValue);
					oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainValue", kpiValue);
					const kpiValueUnscaled = NumberFormat.getFloatInstance(
						{
							maxFractionDigits: 2,
							showScale: false,
							groupingEnabled: true
						},
						currentLocale
					).format(rawValue);
					oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainValueUnscaled", kpiValueUnscaled);

					// Unit or currency
					if (kpiDefinition.datapoint.unit && rawUnit) {
						if (kpiDefinition.datapoint.unit.isCurrency) {
							oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainUnit", rawUnit);
						} else {
							// In case of unit of measure, we have to format it properly
							const kpiUnit = NumberFormat.getUnitInstance({ showNumber: false }, currentLocale).format(rawValue, rawUnit);
							oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainUnit", kpiUnit);
						}
					}

					// Criticality
					if (kpiDefinition.datapoint.criticalityValue) {
						// Criticality is a fixed value
						oKPIModel.setProperty(
							"/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality",
							kpiDefinition.datapoint.criticalityValue
						);
					} else if (kpiDefinition.datapoint.criticalityPath) {
						// Criticality comes from another property (via a path)
						const criticalityValue = messageTypeFromCriticality(
							aContexts[0].getProperty(kpiDefinition.datapoint.criticalityPath)
						);
						oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality", criticalityValue);
					} else if (
						kpiDefinition.datapoint.criticalityCalculationThresholds &&
						kpiDefinition.datapoint.criticalityCalculationMode
					) {
						// Criticality calculation
						let calculatedCriticality: MessageType;
						switch (kpiDefinition.datapoint.criticalityCalculationMode) {
							case "UI.ImprovementDirectionType/Target":
								calculatedCriticality = messageTypeFromTargetCalculation(
									rawValue,
									kpiDefinition.datapoint.criticalityCalculationThresholds
								);
								break;

							case "UI.ImprovementDirectionType/Minimize":
								calculatedCriticality = messageTypeFromMinimizeCalculation(
									rawValue,
									kpiDefinition.datapoint.criticalityCalculationThresholds
								);
								break;

							case "UI.ImprovementDirectionType/Maximize":
							default:
								calculatedCriticality = messageTypeFromMaximizeCalculation(
									rawValue,
									kpiDefinition.datapoint.criticalityCalculationThresholds
								);
								break;
						}
						oKPIModel.setProperty(
							"/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality",
							calculatedCriticality
						);
					} else {
						// No criticality
						oKPIModel.setProperty("/" + kpiDefinition.id + "/manifest/sap.card/data/json/mainCriticality", MessageType.None);
					}
				}
			}
		});
	}
}

export default KPIManagementControllerExtension;
