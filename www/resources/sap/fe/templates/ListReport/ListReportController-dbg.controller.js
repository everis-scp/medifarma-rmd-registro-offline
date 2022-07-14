/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */

sap.ui.define(
	[
		"sap/fe/core/PageController",
		"sap/fe/core/controllerextensions/SideEffects",
		"sap/fe/core/controllerextensions/EditFlow",
		"sap/fe/macros/field/FieldRuntime",
		"sap/base/Log",
		"sap/base/util/ObjectPath",
		"sap/fe/navigation/SelectionVariant",
		"sap/fe/core/CommonUtils",
		"sap/ui/mdc/p13n/StateUtil",
		"sap/fe/macros/table/Utils",
		"sap/fe/macros/ResourceModel",
		"sap/fe/core/controllerextensions/InternalRouting",
		"sap/ui/Device",
		"sap/fe/core/controllerextensions/IntentBasedNavigation",
		"./overrides/IntentBasedNavigation",
		"sap/fe/core/controllerextensions/InternalIntentBasedNavigation",
		"sap/fe/macros/chart/ChartRuntime",
		"sap/fe/templates/ListReport/ExtensionAPI",
		"sap/fe/macros/filter/FilterUtils",
		"sap/fe/macros/chart/ChartUtils",
		"sap/fe/macros/visualfilters/VisualFilterUtils",
		"sap/fe/macros/DelegateUtil",
		"sap/ui/core/mvc/OverrideExecution",
		"sap/fe/core/controllerextensions/ViewState",
		"./overrides/ViewState",
		"sap/fe/templates/RootContainer/overrides/EditFlow",
		"sap/fe/core/helpers/EditState",
		"sap/ui/model/json/JSONModel",
		"sap/fe/core/library",
		"sap/fe/core/helpers/SemanticDateOperators",
		"sap/fe/core/controllerextensions/Share",
		"./overrides/Share",
		"sap/fe/macros/CommonHelper",
		"sap/fe/core/controllerextensions/KPIManagement"
	],
	function(
		PageController,
		SideEffects,
		EditFlow,
		FieldRuntime,
		Log,
		ObjectPath,
		SelectionVariant,
		CommonUtils,
		StateUtil,
		TableUtils,
		ResourceModel,
		InternalRouting,
		Device,
		IntentBasedNavigation,
		IntentBasedNavigationOverride,
		InternalIntentBasedNavigation,
		ChartRuntime,
		ExtensionAPI,
		FilterUtils,
		ChartUtils,
		VisualFilterUtils,
		DelegateUtil,
		OverrideExecution,
		ViewState,
		ViewStateOverrides,
		EditFlowOverrides,
		EditState,
		JSONModel,
		CoreLibrary,
		SemanticDateOperators,
		Share,
		ShareOverrides,
		CommonHelper,
		KPIManagement
	) {
		"use strict";
		var TemplateContentView = CoreLibrary.TemplateContentView,
			InitialLoadMode = CoreLibrary.InitialLoadMode;

		return PageController.extend("sap.fe.templates.ListReport.ListReportController", {
			metadata: {
				methods: {
					getExtensionAPI: {
						"public": true,
						"final": true
					},
					onPageReady: {
						"public": false,
						"final": false,
						overrideExecution: OverrideExecution.After
					},
					onViewNeedsRefresh: {
						"public": true,
						"final": false,
						overrideExecution: OverrideExecution.After
					},
					onPendingFilters: {
						"public": true,
						"final": false,
						overrideExecution: OverrideExecution.After
					}
				}
			},
			_routing: InternalRouting.override({
				onAfterBinding: function(oContext, mParameters) {
					this.getView()
						.getController()
						._onAfterBinding(oContext, mParameters);
				}
			}),
			_intentBasedNavigation: InternalIntentBasedNavigation.override({
				getEntitySet: function() {
					return this.base.getCurrentEntitySet();
				}
			}),
			sideEffects: SideEffects,

			intentBasedNavigation: IntentBasedNavigation.override(IntentBasedNavigationOverride),
			share: Share.override(ShareOverrides),
			editFlow: EditFlow.override(EditFlowOverrides),
			viewState: ViewState.override(ViewStateOverrides),
			kpiManagement: KPIManagement,

			getExtensionAPI: function() {
				if (!this.extensionAPI) {
					this.extensionAPI = new ExtensionAPI(this);
				}
				return this.extensionAPI;
			},

			onInit: function() {
				PageController.prototype.onInit.apply(this);
				var that = this;
				var aTables = this._getTables();
				var oInternalModelContext = this.getView().getBindingContext("internal");
				if (that._isMultiMode()) {
					var oMultiModeTab = that._getMultiModeControl();
					oInternalModelContext.setProperty("tabs", {
						selected: oMultiModeTab.getSelectedKey() || oMultiModeTab.getItems()[0].getKey()
					});
					aTables.forEach(function(oTable) {
						var oUpdateCounts = function() {
							that._updateCounts();
						};
						TableUtils.addEventToBindingInfo(oTable, "dataRequested", oUpdateCounts);
					});
				}

				oInternalModelContext.setProperty("hasPendingFilters", true);
				oInternalModelContext.setProperty("appliedFilters", "");
				oInternalModelContext.setProperty("uom", {});
				oInternalModelContext.setProperty("scalefactor", {});
				oInternalModelContext.setProperty("scalefactorNumber", {});

				if (this._hasMultiVisualizations()) {
					var alpContentView = this._getDefaultPath();
					if (!Device.system.desktop && alpContentView === TemplateContentView.Hybrid) {
						alpContentView = TemplateContentView.Chart;
					}
					oInternalModelContext.setProperty("alpContentView", alpContentView);
				}

				// Store conditions from filter bar
				// this is later used before navigation to get conditions applied on the filter bar
				this.filterBarConditions = {};

				// As AppStateHandler.applyAppState triggers a navigation we want to make sure it will
				// happen after the routeMatch event has been processed (otherwise the router gets broken)
				this.getAppComponent()
					.getRouterProxy()
					.waitForRouteMatchBeforeNavigation();

				this._updateMultiTableHiddenStatus();

				FilterUtils.attachConditionHandling(this._getFilterBarControl());
			},
			onExit: function() {
				FilterUtils.detachConditionHandling(this._getFilterBarControl());

				delete this._sEntitySet;
				delete this.filterBarConditions;
				delete this._oListReportControl;
				delete this._bMultiMode;
				this.extensionAPI && this.extensionAPI.destroy();
				delete this.extensionAPI;
			},

			_onAfterBinding: function() {
				var aTables = this._getTables();
				var that = this;
				if (EditState.isEditStateDirty()) {
					var oTableBinding = this._getTableBinding();
					if (oTableBinding) {
						if (!this.sUpdateTimer) {
							this.sUpdateTimer = setTimeout(function() {
								oTableBinding.refresh();
								delete that.sUpdateTimer;
							}, 0);
						}

						// Update action enablement and visibility upon table data update.
						var fnUpdateTableActions = function() {
							that._updateTableActions(aTables);
							oTableBinding.detachDataReceived(fnUpdateTableActions);
						};
						oTableBinding.attachDataReceived(fnUpdateTableActions);
					}
					EditState.setEditStateProcessed();
				}

				if (!this.sUpdateTimer) {
					this._updateTableActions(aTables);
				}

				this.pageReady.waitFor(
					this.getAppComponent()
						.getAppStateHandler()
						.applyAppState()
				);
			},

			onAfterRendering: function(oEvent) {
				var that = this;
				this.getView()
					.getModel("sap.fe.i18n")
					.getResourceBundle()
					.then(function(response) {
						that.oResourceBundle = response;
						var aTables = that._getTables();
						var sEntitySet = that.getView().getViewData().entitySet;
						var sText = CommonUtils.getTranslatedText(
							"T_OP_TABLE_AND_CHART_NO_DATA_TEXT",
							that.oResourceBundle,
							undefined,
							sEntitySet
						);
						aTables.forEach(function(oTable) {
							oTable.setNoDataText(sText);
						});
						if (that._hasMultiVisualizations()) {
							var oChart = that.getChartControl();
							oChart.setNoDataText(sText);
						}
					})
					.catch(function(oError) {
						Log.error("Error while retrieving the resource bundle", oError);
					});
			},
			onPageReady: function(mParameters) {
				var oLastFocusedControl = mParameters.lastFocusedControl;
				var oView = this.getView();
				// set the focus to the first action button, or to the first editable input if in editable mode
				if (oLastFocusedControl && oLastFocusedControl.controlId && oLastFocusedControl.focusInfo) {
					var oFocusControl = oView.byId(oLastFocusedControl.controlId);
					if (oFocusControl) {
						oFocusControl.applyFocusInfo(oLastFocusedControl.focusInfo);
					}
				}

				// Enabling mandatory filter fields message dialog and focusing on them
				var oFilterBar = this._getFilterBarControl();
				if (oFilterBar && !oFilterBar.getShowMessages()) {
					oFilterBar.setShowMessages(true);
					oFilterBar._setFocusOnFirstErroneousField();
				}
			},

			/**
			 * Method called when the content of a list report view needs to be refreshed.
			 * This happens either when there is a change on the FilterBar and the search is triggered,
			 * or when a tab with custom content is selected.
			 * This method can be overwritten by the controller extension in case of customization.
			 *
			 * @param {map} mParameters Map containing the filter conditions of the FilterBar, the currentTabID
			 * and the view refresh cause (tabChanged or search).
			 * The map looks like this:
			 * <code><pre>
			 * 	{
			 * 		filterConditions: {
			 * 			Country: [
			 * 				{
			 * 					operator: "EQ"
			 *					validated: "NotValidated"
			 *					values: ["Germany", ...]
			 * 				},
			 * 				...
			 * 			]
			 * 			...
			 * 		},
			 *		currentTabId: "fe::CustomTab::tab1",
			 *		refreshCause: "tabChanged" | "search"
			 *	}
			 * </pre></code>
			 *
			 * @public
			 */
			onViewNeedsRefresh: function(mParameters) {},

			/**
			 * Method called when a filter or search value has been changed in the FilterBar,
			 * but has not been validated yet by the end user (with the 'Go' or 'Search' button).
			 * Typically, the content of the current tab is greyed out until the filters are validated.
			 * This method can be overwritten by the controller extension in case of customization.
			 *
			 * @public
			 */
			onPendingFilters: function() {},
			getCurrentEntitySet: function() {
				if (!this._sEntitySet) {
					var oTable = this._getCurrentTable();
					this._sEntitySet = oTable.data("targetCollectionPath").slice(1);
				}
				return this._sEntitySet;
			},

			/**
			 * This method initiates update of enabled state of DataFieldForAction and visible state of DataFieldForIBN buttons.
			 * @param aTables Array of tables in the List report
			 * @private
			 */
			_updateTableActions: function(aTables) {
				var aIBNActions = [];
				aTables.forEach(
					function(oTable) {
						aIBNActions = CommonUtils.getIBNActions(oTable, aIBNActions);
						TableUtils.getSemanticTargetsFromTable(this, oTable);
						// Update 'enabled' property of DataFieldForAction buttons on table toolbar
						// The same is also performed on Table selectionChange event
						var oInternalModelContext = oTable.getBindingContext("internal"),
							oActionOperationAvailableMap = JSON.parse(
								CommonHelper.parseCustomData(DelegateUtil.getCustomData(oTable, "operationAvailableMap"))
							),
							aSelectedContexts = oTable.getSelectedContexts();

						CommonUtils.setActionEnablement(oInternalModelContext, oActionOperationAvailableMap, aSelectedContexts);
					}.bind(this)
				);
				CommonUtils.updateDataFieldForIBNButtonsVisibility(aIBNActions, this.getView());
			},

			/**
			 * This method scrolls to a specific row on all the available tables.
			 *
			 * @function
			 * @name sap.fe.templates.ListReport.ListReportController.controller#_scrollTablesToRow
			 * @param {string} sRowPath The path of the table row context to be scrolled
			 */
			_scrollTablesToRow: function(sRowPath) {
				var aTables, oTable, oTableRow, oTableRowBinding;
				if (this._getTables && this._getTables().length > 0) {
					aTables = this._getTables();
					for (var i = 0; i < aTables.length; i++) {
						oTable = aTables[i];
						oTableRowBinding = oTable.getRowBinding();
						if (oTableRowBinding) {
							var oTableRowBindingContexts;
							switch (oTable.data().tableType) {
								case "GridTable":
									oTableRowBindingContexts = oTableRowBinding.getContexts(0);
									break;
								case "ResponsiveTable":
									oTableRowBindingContexts = oTableRowBinding.getCurrentContexts();
									break;
								default:
							}
							oTableRow = oTableRowBindingContexts.find(function(item) {
								return item && item.getPath().indexOf(sRowPath) !== -1;
							});
						}
						if (oTableRow) {
							var iPos = oTableRow.iIndex;
							oTable.scrollToIndex(iPos);
						}
					}
				}
			},
			_getPageTitleInformation: function() {
				var that = this;
				return new Promise(function(resolve, reject) {
					var oTitleInfo = { title: "", subtitle: "", intent: "", icon: "" };
					oTitleInfo.title = that
						.getView()
						.getContent()[0]
						.data().ListReportTitle;
					oTitleInfo.subtitle = that
						.getView()
						.getContent()[0]
						.data().ListReportSubtitle;
					resolve(oTitleInfo);
				});
			},
			_getFilterBarControl: function() {
				return this.getView().byId(this._getFilterBarControlId());
			},
			_getSegmentedButton: function(sControl) {
				return this.getView().byId(this._getSegmentedButtonId(sControl));
			},
			_getSegmentedButtonId: function(sControl) {
				if (sControl === "Chart") {
					return this.getChartControl().data("segmentedButtonId");
				} else {
					return this._getCurrentTable().data("segmentedButtonId");
				}
			},
			_getFilterBarControlId: function() {
				return this.getView()
					.getContent()[0]
					.data("filterBarId");
			},
			_getChartControlId: function() {
				return this.getView()
					.getContent()[0]
					.data("singleChartId");
			},

			getChartControl: function() {
				return this.getView().byId(this._getChartControlId());
			},
			_getVisualFilterBarControl: function() {
				return this.getView().byId(this._getVisualFilterBarControlId());
			},
			_getVisualFilterBarControlId: function() {
				return this.getView()
					.getContent()[0]
					.data("visualFilterBarId");
			},
			_getMultiModeControl: function() {
				return this.getView().byId("fe::TabMultipleMode");
			},
			_getTableControlId: function() {
				return this.getView()
					.getContent()[0]
					.data("singleTableId");
			},
			_getCurrentTable: function() {
				if (!this._oListReportControl) {
					var oMultiModeTab = this._getMultiModeControl();
					if (oMultiModeTab) {
						this._oListReportControl = this.getView().byId(
							oMultiModeTab.getSelectedKey() || oMultiModeTab.getItems()[0].getKey()
						);
					} else {
						this._oListReportControl = this.getView().byId(this._getTableControlId());
					}
				}
				return this._oListReportControl;
			},
			_getTableBinding: function(sTableId) {
				var oTableControl = sTableId ? this.getView().byId(sTableId) : this._getCurrentTable(),
					oBinding = oTableControl && oTableControl._getRowBinding();

				return oBinding;
			},
			_getTables: function() {
				var that = this;
				if (this._isMultiMode()) {
					var aTables = [];
					var oTabMultiMode = this._getMultiModeControl();
					oTabMultiMode.getItems().forEach(function(oItem) {
						var oTable = that.getView().byId(oItem.getKey());
						if (oTable) {
							aTables.push(oTable);
						}
					});
					return aTables;
				}
				return [this._getCurrentTable()];
			},
			_getDefaultPath: function() {
				var defaultPath = this.getView()
					.getContent()[0]
					.data("defaultPath");
				switch (defaultPath) {
					case "primary":
						return TemplateContentView.Chart;
					case "secondary":
						return TemplateContentView.Table;
					case "both":
					default:
						return TemplateContentView.Hybrid;
				}
			},
			/**
			 * Method to know if ListReport is configured with Multiple Table mode.
			 *
			 * @function
			 * @name _isMultiMode
			 * @returns {boolean} Is Multiple Table mode set?
			 */
			_isMultiMode: function() {
				if (!this._oListReportControl) {
					this._bMultiMode = !!this._getMultiModeControl();
				}
				return this._bMultiMode;
			},
			/**
			 * Method to know if ListReport is configured with Multiple EntitySets.
			 *
			 * @function
			 * @name _isMultiEntitySets
			 * @returns {boolean} Is Multiple EntitySets configuration?
			 */
			_isMultiEntitySets: function() {
				return (
					this.getView()
						.getContent()[0]
						.data("isMultiEntitySets") === "true"
				);
			},
			_hasMultiVisualizations: function() {
				return (
					this.getView()
						.getContent()[0]
						.data("hasMultiVisualizations") === "true"
				);
			},
			_setShareModel: function() {
				// TODO: deactivated for now - currently there is no _templPriv anymore, to be discussed
				// this method is currently not called anymore from the init method

				var fnGetUser = ObjectPath.get("sap.ushell.Container.getUser");
				//var oManifest = this.getOwnerComponent().getAppComponent().getMetadata().getManifestEntry("sap.ui");
				//var sBookmarkIcon = (oManifest && oManifest.icons && oManifest.icons.icon) || "";

				//shareModel: Holds all the sharing relevant information and info used in XML view
				var oShareInfo = {
					bookmarkTitle: document.title, //To name the bookmark according to the app title.
					bookmarkCustomUrl: function() {
						var sHash = window.hasher.getHash();
						return sHash ? "#" + sHash : window.location.href;
					},
					/*
						To be activated once the FLP shows the count - see comment above
						bookmarkServiceUrl: function() {
							//var oTable = oTable.getInnerTable(); oTable is already the sap.fe table (but not the inner one)
							// we should use table.getListBindingInfo instead of the binding
							var oBinding = oTable.getBinding("rows") || oTable.getBinding("items");
							return oBinding ? fnGetDownloadUrl(oBinding) : "";
						},*/
					isShareInJamActive: !!fnGetUser && fnGetUser().isJamActive()
				};

				var oTemplatePrivateModel = this.getOwnerComponent().getModel("_templPriv");
				oTemplatePrivateModel.setProperty("/listReport/share", oShareInfo);
			},

			/**
			 * Hidden tables must be marked as hidden to avoid sending
			 * requests when FilterBar is changed or LR is initialized
			 * Best workflow would be to suspend table binding but
			 * if the user switch quickly between tabs the batch response of previous
			 * is recevied when previous tab is already disabled (binding is suspended) and
			 * generates error.
			 * A temporary solution (if we find better workflow) is to set a customData and don't trigger
			 * rebindTable if this customData is set to true.
			 */
			_updateMultiTableHiddenStatus: function() {
				var oDisplayedTable = this._getCurrentTable();
				if (this._isMultiMode() && oDisplayedTable) {
					var sDisplayTableId = oDisplayedTable.getId();
					var aTables = this._getTables();
					aTables.forEach(function(oTable) {
						var sTableId = oTable.getId();
						oTable.data("tableHidden", sTableId !== sDisplayTableId);
					});
				}
			},
			/**
			 * Method to update Page local UI Model with Filter Bar not applicable fields (specific to Multi Tables scenario).
			 *
			 * @param {sap.ui.model.context} oInternalModelContext Internal Model Context
			 * @param {sap.ui.mdc.FilterBar} oFilterBar MDC FilterBar
			 */
			_updateMultiNotApplicableFields: function(oInternalModelContext, oFilterBar) {
				var mCache = {};
				var ignoredFields = {},
					aTables = this._getTables();
				aTables.forEach(function(oTable) {
					var sTableEntityPath = oTable.data("targetCollectionPath"),
						sTableEntitySet = sTableEntityPath.slice(1),
						sTabId = oTable
							.getParent()
							.getParent()
							.getKey(),
						sCacheKey = sTableEntitySet + (oTable.data("enableAnalytics") === "true" ? "Analytical" : "Regular");
					if (!mCache[sCacheKey]) {
						mCache[sCacheKey] = FilterUtils.getNotApplicableFiltersForTable(oFilterBar, oTable);
					}
					ignoredFields[sTabId] = mCache[sCacheKey];
				});
				oInternalModelContext.setProperty("tabs/ignoredFields", ignoredFields);
			},
			_updateTableControl: function() {
				this._sEntitySet = undefined;
				this._oListReportControl = undefined;
				this._getCurrentTable();
			},
			_updateCounts: function() {
				this._updateMutliModeCounts();
			},
			/**
			 * Method to determine if a tab from the list report is custom.
			 *
			 * @function
			 * @name _isCustomTab
			 * @returns {boolean} Determines if the tab is custom or not.
			 */
			_isCustomTab: function() {
				var oMultiModeControl = this._getMultiModeControl();
				return oMultiModeControl && oMultiModeControl.getSelectedKey().indexOf("::CustomTab::") > -1;
			},
			_updateMutliModeCounts: function() {
				var that = this;
				var aBindingPromises = [];
				var oMultiModeControl = this._getMultiModeControl();
				if (oMultiModeControl && oMultiModeControl.data("showCounts") === "true" && !this._isCustomTab()) {
					var oDisplayedTable = this._getCurrentTable();
					var sDisplayedTableId = oDisplayedTable.getId();
					var aCompliantTabs = [];
					var aItems = oMultiModeControl.getItems();
					aItems.forEach(function(oItem) {
						var oTable = that.getView().byId(oItem.getKey());
						if (oTable && (oItem.data("outdatedCounts") || oTable.getId() === sDisplayedTableId)) {
							aCompliantTabs.push({
								table: oTable,
								item: oItem
							});
						}
					});

					aBindingPromises = aCompliantTabs.map(function(mTab) {
						mTab.item.setCount("...");
						var oTable = mTab.table;
						var oFilterInfos = TableUtils.getFiltersInfoForSV(oTable, mTab.item.data("selectionVariant"));
						return TableUtils.getListBindingForCount(oTable, that.getView().getBindingContext(), {
							batchGroupId: oTable.getId() === sDisplayedTableId ? oTable.data("batchGroupId") : "$auto",
							additionalFilters: oFilterInfos.filters
						});
					});

					Promise.all(aBindingPromises)
						.then(function(aCounts) {
							for (var k in aCounts) {
								var oItem = aCompliantTabs[k].item;
								oItem.setCount(TableUtils.getCountFormatted(aCounts[k]));
								oItem.data("outdatedCounts", false);
							}
						})
						.catch(function(oError) {
							Log.error("Error while retrieving the values for the icon tab bar", oError);
						});
				}
			},
			_shouldAutoTriggerSearch: function(oVM) {
				if (
					this.getView().getViewData().initialLoad === InitialLoadMode.Auto &&
					(!oVM || oVM.getStandardVariantKey() === oVM.getCurrentVariantKey())
				) {
					var oFilterBar = this._getFilterBarControl(),
						oConditions = oFilterBar.getConditions();
					for (var sKey in oConditions) {
						// ignore filters starting with $ (e.g. $search, $editState)
						if (!sKey.startsWith("$") && Array.isArray(oConditions[sKey]) && oConditions[sKey].length) {
							return true;
						}
					}
				}

				return false;
			},
			_updateTable: function(oTable) {
				if (!oTable.isTableBound() || this.hasPendingChartChanges) {
					oTable.rebindTable();
					this.hasPendingChartChanges = false;
				}
			},
			_updateChart: function(oChart) {
				if (!oChart.isInnerChartBound() || this.hasPendingTableChanges) {
					oChart.getControlDelegate().rebindChart(oChart, oChart.getBindingInfo("data"));
					this.hasPendingTableChanges = false;
				}
			},
			handlers: {
				onTabMultiModeChange: function(oEvent) {
					this._updateTableControl();
					this._updateMultiTableHiddenStatus();
					var oFilterBar = this._getFilterBarControl();
					var oInternalModelContext = this.getView().getBindingContext("internal");
					var oDisplayedTable = this._getCurrentTable();
					var oMultiModeControl = this._getMultiModeControl();
					oInternalModelContext.setProperty("tabs/selected", oMultiModeControl.getSelectedKey());
					if (oFilterBar && oInternalModelContext.getProperty("hasPendingFilters") !== true) {
						// No pending filters into FitlerBar
						if (this._isCustomTab()) {
							var oFilterConditions = oFilterBar.getFilterConditions();
							this.onViewNeedsRefresh({
								filterConditions: oFilterConditions,
								currentTabId: oMultiModeControl.getSelectedKey(),
								refreshCause: "tabChanged"
							});
						} else if (
							!oDisplayedTable.getRowBinding() || // first time the tab/table is displayed
							oDisplayedTable.data("outdatedRows") === true
						) {
							// Search has been triggered on a different tab {}
							oDisplayedTable.rebindTable();
							oDisplayedTable.data("outdatedRows", false);
						}
					}
					this.getExtensionAPI().updateAppState();
				},
				onFiltersChanged: function(oEvent) {
					var oFilterBar = oEvent.getSource(),
						oInternalModelContext = this.getView().getBindingContext("internal");
					// Pending filters into FitlerBar to be used for custom views
					this.onPendingFilters();
					oInternalModelContext.setProperty("appliedFilters", oFilterBar.getAssignedFiltersText().filtersText);
					oInternalModelContext.setProperty("hasPendingFilters", true);
					if (oEvent.getParameter("conditionsBased")) {
						this.getExtensionAPI().updateAppState();
					}
				},
				onVariantSelected: function(oEvent) {
					var that = this,
						oVM = oEvent.getSource();
					// setTimeout cause the variant needs to be applied before judging the auto search or updating the app state
					setTimeout(function() {
						if (that._shouldAutoTriggerSearch(oVM)) {
							// the app state will be updated via onSearch handler
							return that._getFilterBarControl().triggerSearch();
						} else {
							that.getExtensionAPI().updateAppState();
						}
					}, 0);
				},
				onVariantSaved: function(oEvent) {
					var that = this;
					//TODO: Should remove this setTimeOut once Variant Management provides an api to fetch the current variant key on save!!!
					setTimeout(function() {
						that.getExtensionAPI().updateAppState();
					}, 1000);
				},
				onSearch: function(oEvent) {
					var that = this;
					var oFilterBar = oEvent.getSource();
					var oInternalModelContext = this.getView().getBindingContext("internal");
					var oMdcChart = this.getChartControl();
					oInternalModelContext.setProperty("hasPendingFilters", false);
					if (this._isMultiMode()) {
						var aTables = this._getTables(),
							oMultiModeControl = this._getMultiModeControl();
						if (oMultiModeControl && oMultiModeControl.data("showCounts") === "true") {
							var aItems = oMultiModeControl.getItems();
							aItems.forEach(function(oItem) {
								oItem.data("outdatedCounts", true);
							});
						}
						if (!this._isCustomTab()) {
							var sDisplayedTableId = this._getCurrentTable().getId();
							this._updateMultiNotApplicableFields(oInternalModelContext, oFilterBar);
							aTables.forEach(function(oTable) {
								oTable.data("outdatedRows", oTable.getId() !== sDisplayedTableId);
							});
						} else {
							var oFilterConditions = oFilterBar.getFilterConditions();
							this.onViewNeedsRefresh({
								filterConditions: oFilterConditions,
								currentTabId: oMultiModeControl.getSelectedKey(),
								refreshCause: "search"
							});
						}
					}
					if (oMdcChart) {
						// disable bound actions TODO: this clears everything for the chart?
						oMdcChart.getBindingContext("internal").setProperty("", {});

						var oPageInternalModelContext = oMdcChart.getBindingContext("pageInternal");
						var sTemplateContentView = oPageInternalModelContext.getProperty(
							oPageInternalModelContext.getPath() + "/alpContentView"
						);
						if (sTemplateContentView === TemplateContentView.Chart) {
							this.hasPendingChartChanges = true;
						}
						if (sTemplateContentView === TemplateContentView.Table) {
							this.hasPendingTableChanges = true;
						}
					}
					// store filter bar conditions to use later while navigation
					StateUtil.retrieveExternalState(oFilterBar)
						.then(function(oExternalState) {
							that.filterBarConditions = oExternalState.filter;
						})
						.catch(function(oError) {
							Log.error("Error while retrieving the external state", oError);
						});
					if (this.getView().getViewData().liveMode === false) {
						this.getExtensionAPI().updateAppState();
					}
				},
				/**
				 * Triggers an outbound navigation on Chevron Press.
				 *
				 * @param {object} oController
				 * @param {string} sOutboundTarget Name of the outbound target (needs to be defined in the manifest)
				 * @param {sap.ui.model.odata.v4.Context} oContext The context that contain the data for the target app
				 * @returns {Promise} Promise which is resolved once the navigation is triggered (??? maybe only once finished?)
				 * @ui5-restricted
				 * @final
				 */
				onChevronPressNavigateOutBound: function(oController, sOutboundTarget, oContext) {
					// TODO: remove this to directly use the intent based navigation controller in the macro.
					var oOutbounds = oController
							.getAppComponent()
							.getRoutingService()
							.getOutbounds(),
						oDisplayOutbound = oOutbounds[sOutboundTarget];
					if (oDisplayOutbound && oDisplayOutbound.semanticObject && oDisplayOutbound.action) {
						oContext = oContext && oContext.isA && oContext.isA("sap.ui.model.odata.v4.Context") ? [oContext] : oContext;
						oController._intentBasedNavigation.navigate(oDisplayOutbound.semanticObject, oDisplayOutbound.action, {
							navigationContexts: oContext
						});

						//TODO: check why returning a promise is required
						return Promise.resolve();
					} else {
						throw new Error("outbound target " + sOutboundTarget + " not found in cross navigation definition of manifest");
					}
				},
				onChartSelectionChanged: function(oEvent) {
					var oMdcChart = oEvent.getSource(),
						oTable = this._getCurrentTable(),
						oDataContext = oEvent.getParameter("dataContext"),
						oInternalModelContext = this.getView().getBindingContext("internal");
					if (oDataContext && oDataContext.data) {
						// update action buttons enablement / disablement
						ChartRuntime.fnUpdateChart(oEvent);
						// update selections on selection or deselection
						ChartUtils.setChartFilters(oMdcChart);
					}
					var sTemplateContentView = oInternalModelContext.getProperty(oInternalModelContext.getPath() + "/alpContentView");
					if (sTemplateContentView === TemplateContentView.Chart) {
						this.hasPendingChartChanges = true;
					} else {
						oTable && oTable.rebindTable();
						this.hasPendingChartChanges = false;
					}
				},
				onSegmentedButtonPressed: function(oEvent) {
					var sSelectedKey = oEvent.mParameters.key ? oEvent.mParameters.key : null;
					var oInternalModelContext = this.getView().getBindingContext("internal");
					oInternalModelContext.setProperty("alpContentView", sSelectedKey);
					var oSegmentedButton;
					var oChart = this.getChartControl();
					var oTable = this._getCurrentTable();
					var oSegmentedButtonDelegate = {
						onAfterRendering: function() {
							var aItems = oSegmentedButton.getItems();
							aItems.forEach(function(oItem) {
								if (oItem.getKey() === sSelectedKey) {
									oItem.focus();
								}
							});
							oSegmentedButton.removeEventDelegate(oSegmentedButtonDelegate);
						}
					};
					oSegmentedButton =
						sSelectedKey === TemplateContentView.Table ? this._getSegmentedButton("Table") : this._getSegmentedButton("Chart");
					if (oSegmentedButton !== oEvent.getSource()) {
						oSegmentedButton.addEventDelegate(oSegmentedButtonDelegate);
					}
					switch (sSelectedKey) {
						case TemplateContentView.Table:
							this._updateTable(oTable);
							break;
						case TemplateContentView.Chart:
							this._updateChart(oChart);
							break;
						case TemplateContentView.Hybrid:
							this._updateTable(oTable);
							this._updateChart(oChart);
							break;
						default:
							break;
					}
					this.getExtensionAPI().updateAppState();
				},
				onFiltersSegmentedButtonPressed: function(oEvent) {
					if (oEvent.getParameter("key") === "Compact") {
						this._getFilterBarControl().setVisible(true);
						this.getView()
							.byId(
								this.getView()
									.getContent()[0]
									.data("visualFilterBarId")
							)
							.setVisible(false);
					} else {
						this._getFilterBarControl().setVisible(false);
						this.getView()
							.byId(
								this.getView()
									.getContent()[0]
									.data("visualFilterBarId")
							)
							.setVisible(true);
					}
				},
				onVisualFilterDataReceived: function(oEvent) {
					var oVisualFilterBar = this._getFilterBarControl();
					var oVisualFilter = VisualFilterUtils.getVisualFilterControl(oVisualFilterBar, oEvent.getSource());
					var oInternalModelContext = this.getView().getBindingContext("internal");
					var sId = oVisualFilter.getId().split("fe::VisualFilter");
					var sChartId = "fe::VisualFilter" + sId[1];
					var oResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.fe.macros");
					var vUOM = oVisualFilter.data("uom");
					VisualFilterUtils.updateChartScaleFactorTitle(oVisualFilter, this.getView());
					if (oEvent.getParameter("error")) {
						var s18n = oResourceBundle.getText("M_VISUAL_FILTERS_ERROR_DATA_TEXT");
						VisualFilterUtils.applyOverLay(s18n, sChartId, this.getView());
					} else if (oEvent.getParameter("data")) {
						var oData = oEvent.getSource().getCurrentContexts();
						if (oData && oData.length === 0) {
							VisualFilterUtils.setNoDataMessage(sChartId, oResourceBundle, this.getView());
						} else {
							oInternalModelContext.setProperty(sChartId, {});
						}
						VisualFilterUtils.setMultiUOMMessage(oData, oVisualFilter, sChartId, oResourceBundle, this.getView());
					}
					if (vUOM && ((vUOM["ISOCurrency"] && vUOM["ISOCurrency"].$Path) || (vUOM["Unit"] && vUOM["Unit"].$Path))) {
						var oContexts = oEvent.getSource().getContexts();
						var oContextData = oContexts && oContexts[0].getObject();
						VisualFilterUtils.applyUOMToTitle(oVisualFilter, oContextData, this.getView());
					}
				}
			},
			formatters: {
				/**
				 * Method to set the message text for the multi-EntitySet scenario when fields in the FilterBar need to be ignored.
				 *
				 * @param {Array} aIgnoredFields Array of ignored fields in the FilterBar for the current tab (multi EntitySet scenario)
				 * @param {string} sTabTitle Tab title
				 * @returns {string} Message text
				 */
				setTabMessageStrip: function(aIgnoredFields, sTabTitle) {
					var sText = "";
					if (Array.isArray(aIgnoredFields) && aIgnoredFields.length > 0 && sTabTitle) {
						var oFilterBar = this._getFilterBarControl(),
							sFilterBarEntityPath = oFilterBar.data("entityType"),
							oMetaModel = this.getView()
								.getModel()
								.getMetaModel(),
							oResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.fe.templates"),
							aIgnoredLabels = aIgnoredFields.map(function(sProperty) {
								if (sProperty === "$search") {
									var oMacroResourceBundle = sap.ui.getCore().getLibraryResourceBundle("sap.fe.macros");
									return oMacroResourceBundle ? oMacroResourceBundle.getText("M_FILTERBAR_SEARCH") : "";
								}
								var sLabel = oMetaModel.getObject(
									sFilterBarEntityPath + sProperty + "@com.sap.vocabularies.Common.v1.Label"
								);
								return DelegateUtil.getLocalizedText(sLabel, oFilterBar);
							});
						if (oResourceBundle) {
							var sResource =
									"C_LR_MULTITABLES_" +
									(aIgnoredLabels.length === 1 ? "SINGLE" : "MULTI") +
									"_IGNORED_FILTER_" +
									(Device.system.desktop ? "LARGE" : "SMALL"),
								sLocalizedTableTitle = DelegateUtil.getLocalizedText(sTabTitle, oFilterBar);
							sText = oResourceBundle.getText(sResource, [aIgnoredLabels.join(", "), sLocalizedTableTitle]);
						}
					}
					return sText;
				},
				scaleVisualFilterValue: function(oValue, scaleFactor) {
					if (scaleFactor) {
						var nScaledValue = VisualFilterUtils.getFormattedNumber(oValue, scaleFactor);
						return nScaledValue;
					} else {
						return oValue;
					}
				}
			}
		});
	}
);
