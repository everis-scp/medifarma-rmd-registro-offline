sap.ui.define([
	
], function() {
		"use strict";
		
		/**
		 * This class contains all extension functions that can be implemented by Application 
		 * developers in their extension code. Application developers should not override any methods
		 * outside this documentation.
		 * @namespace sap.suite.ui.generic.template.ListReport.controllerFrameworkExtensions
		 * @public
		 */
		
		return /** @lends sap.suite.ui.generic.template.ListReport.controllerFrameworkExtensions */ {

			/**
			 * This method is called by SAP Fiori elements on the initialization of View. Application 
			 * developers can override this method & perform internal setup in this hook, It is only 
			 * called once per View instance. 
			 * 
			 * @protected
			 */
			 onInit: function() {},

			/**
			 * This method is called in the AppState creation lifecycle. Application developers can override this method,
			 * return an array of all selection fields set on SmartFilterBar using custom code as default and doesn't 
			 * really want to store as part of the AppState. SAP Fiori elements framework will remove these filter 
			 * properties from the selection variant.
			 * 
			 * @returns {Array} - Properties which are visible and should not be stored as part of the
			 * selection variant in the AppState
			 * @protected
			 */
			getVisibleSelectionsWithDefaults: function() {
				return [];
			},
			
			/**
			 * This method is called by SAP Fiori elements once the smart filter bar is initialized with a   
			 * variant. Application developers can override this method when there is a custom filter field 
			 * bound outside the standard model.
			 * 
			 * @param {sap.ui.base.Event} oEvent - The 
			 * {@link sap.ui.comp.filterbar.FilterBar.prototype.event:initialise initialise} event
			 * @protected
			 * 
			 */
			onInitSmartFilterBarExtension: function(oEvent) {},
			
			/**
			 * This method is called by SAP Fiori elements before persisting the AppState. Application developers can
			 * override this method for persisting the state of custom controls. State of the custom control (controls) 
			 * should be stored in the oCustomData passed as a parameter to this method. To make a complete functionality,  
			 * this method should be overridden with <code>restoreCustomAppStateDataExtension</code>.
			 * 
			 * @param {object} oCustomData - Object to be enriched with the custom control state
			 * @protected
			 */			
			getCustomAppStateDataExtension: function(oCustomData) {},
			
			/**
			 * This method is called by SAP Fiori elements while applying the AppState. This method should be overridden
			 * with <code>getCustomAppStateDataExtension</code>. The custom data retrieved from the AppState will be 
			 * passed as a parameter to this method. Application developers can use this custom data to restore the state 
			 * of the custom control.
			 *
			 * @param {object} oCustomData - Custom data containing the information
			 * @protected
			 */
			restoreCustomAppStateDataExtension: function(oCustomData) {},
			
			/**
			 * This method is called by SAP Fiori elements before binding a table. Application developers can
			 * override this method and programmatically modify parameters or filters before the table triggers  
			 * a query to retrieve data.
			 * 
			 * <b>Note: </b>This method is called only when a table is rebound, and not when it is refreshed.
			 *
			 * @param {sap.ui.base.Event} oEvent - The 
			 * {@link sap.ui.comp.smarttable.SmartTable.prototype.event:beforeRebindTable beforeRebindTable} event
			 * @protected
			 */	
			onBeforeRebindTableExtension: function(oEvent) {},
			
			/**
			 * This method is called by SAP Fiori elements before binding a chart. Application developers can
			 * override this method and programmatically modify parameters or filters before chart triggers 
			 * a query to retrieve data. 
			 * 
			 * <b>Note: </b>This method is called only when a chart is rebound, and not when it is refreshed.
			 *
			 * @param {sap.ui.base.Event} oEvent - The 
			 * {@link sap.ui.comp.smartchart.SmartChart.prototype.event:beforeRebindChart beforeRebindChart} event
			 * @protected
			 */
			onBeforeRebindChartExtension: function(oEvent) {},
			
			/**
			 * This method is called by SAP Fiori elements before triggering an external navigation. Application developers 
			 * can override this method and programmatically adapt the parameters which are passed to the target application.
			 * Application developers can use the oObjectInfo parameter to identify the navigation context and
			 * modify the oSelectionVariant which contains the navigation parameters.
			 * 
			 * @param {sap.ui.generic.app.navigation.service.SelectionVariant} oSelectionVariant - Selection variant object 
			 * containing the information which needs to be passed to the target application
			 * @param {object} oObjectInfo - Context object based on which the intent based navigation is triggered
			 * @param {string} oObjectInfo.semanticObject - Semantic object used for the intend based navigation
			 * @param {string} oObjectInfo.action - Action on the context for which the navigation is triggered
			 * @protected
			 */
			adaptNavigationParameterExtension: function(oSelectionVariant, oObjectInfo) {},
			
			/**
			 * This method is called by SAP Fiori elements when a chevron navigation is triggered from a table. Application 
			 * developers can override this method and perform conditional (internal or external) navigation from different 
			 * rows of a table. Such custom navigation should be triggered via corresponding methods of 
			 * {@link sap.suite.ui.generic.template.extensionAPI.NavigationController NavigationController}.
			 * 
			 * @param {sap.ui.base.Event} oEvent - The press event fired when navigating from a row in the SmartTable. It 
			 * is recommended to ignore this parameter and use <code>oBindingContext</code> instead
			 * @param {sap.ui.model.Context} oBindingContext - The context of the corresponding table row
			 * @param {boolean} bReplaceInHistory - This parameter should be considered if the method triggers an internal 
			 * navigation. Pass this parameter to <code>oNavigationData.replaceInHistory</code> in this case
			 * 
			 * @returns {boolean} Method should return <code>true</code> if framework navigation should be suppressed 
			 * (that means: extension code has taken over navigation)
			 * @protected
			 */
			onListNavigationExtension: function(oEvent, oBindingContext, bReplaceInHistory) {
				return false;
			},
			
			/**
			 * This method is called by SAP Fiori elements when the Create with Filters is executed. Application developers
			 * can enable this feature in the LR component by adding createWithFilters in the settings object of the 
			 * List Report component & strategy needs to be set as <code>extension</code>. SmartFilterBar instance will be 
			 * passed as a parameter to the method. Application developers can access the properties, values and add it to 
			 * the returning object map. Application developers will have complete control on properties passed to the new
			 * instance creation.
			 * 
			 * @param {sap.ui.comp.smartfilterbar.SmartFilterBar} oSmartFilterBar - SmartFilterBar of the ListReport
			 * @returns {Map} Key/Value map of the properties
			 * @protected
			 */
			getPredefinedValuesForCreateExtension: function(oSmartFilterBar){
				return {};
			},
			
			/**
			 * This method is called by SAP Fiori elements whenever the busy state is switched off. Application developers can
			 * override this method, access the message model and adapt the transient messages related to the component.
			 * 
			 * @protected
			 */
			adaptTransientMessageExtension: function(){},
			
			/**
			 * This method is called by SAP Fiori elements when the Share functionality is triggered. Application  
			 * developers can adapt the service URL passed as a parameter to this method. Adapted service URL will 
			 * be used in the 'Send Email' or 'Save as Tile' options.
			 * 
			 * @param {object} oShareInfo - Object containing the serviceURL
			 * @param {string} oShareInfo.serviceUrl - Service URL which is derived by SAP Fiori elements
			 * @protected
			 */
			onSaveAsTileExtension: function(oShareInfo) {},
			
			/**
			 * This method is called by SAP Fiori elements when the delete operation is triggered. Application developers 
			 * can override this method in controller extension & perform additional checks before executing the delete 
			 * operation. Method is expected to return a Promise. To veto the delete operation, promise needs to be rejected 
			 * else resolved.
			 * 
			 * @param {object} oBeforeDeleteProperties - Object containing the selected context for delete
			 * @param {Array} oBeforeDeleteProperties.aContexts - Array of the selected contexts
			 * @returns {Promise} - Promise object created by the extension, used for Delete operation chaining
			 * @protected
			 */
			beforeDeleteExtension: function(oBeforeDeleteProperties) {},
			
			/**
			 * This method is called by SAP Fiori elements in the startup life cycle of a component. Application 
			 * developers can override this method and modify the startup object. For an example, when the 
			 * application is started, the selection variant might contain some properties that are not required   
			 * for this app. Such properties can be removed from the selection variant. The reverse use case is 
			 * also true, where some additional properties needs to be added with certain fixed values. This
			 * can be achieved by adding these values to the selection variant. 
			 * 
			 * @param {object} oStartupObject - Startup Object containing the initial contexts
			 * @param {sap.ui.generic.app.navigation.service.SelectionVariant} oStartupObject.selectionVariant - Selection 
			 * Variant containing the values which needs to be applied to the smart filter bar
			 * @param {object} oStartupObject.semanticDates - Semantic dates configuration in the manifest is read an assigned 
			 * in this object
			 * @protected
			 */
			modifyStartupExtension: function(oStartupObject) {},
			
			/**
			 * This method is called when the user leaves the app and this page has been displayed within the same app 
			 * session (this is the time since last opening the app) at least once.
			 * Moreover, it is called for all pages that have been displayed within some app session when the app is finally destroyed.
			 * @param {boolean} bIsDestroyed - If this parameter is true this app instance is destroyed. Otherwise it might
			 * be rewoken if the user navigates again to this app within the same FLP session
			 * @return {function} - Only relevant in case that <code>isDestroyed</code> is false. In this case Application
			 * developers can provide a function to be called when the same page is opened again (after the user has navigated back to the app).
			 * @protected
			 */
			onLeaveAppExtension: function(bIsDestroyed){ },

			/**
			 * This method should be implemented whenever application uses onListNaviagtionExtension for internal navigation. In this case the implementation of
			 * this method should provide an 'inverse' mapping to the transformation implemented within onListNaviagtionExtension.
			 * More precisely, the identification of a child page instance is passed to this function. The implementation of this function should provide information
			 * about the list item which has triggered the opening of the child page.
			 * @param {object} oSelectionInfo - Information about the child page instance opened last
			 * @param {string} [oSelectionInfo.pageEntitySet] The entity set identifying the child page which was opened last. 
			 * Note: In case the child page has been defined without reference to OData this will be the routeName taken from the routingSpec.   
			 * @param {string} [oSelectionInfo.path] The context path that was used for the last opened child page
			 * @param {string[]} [oSelectionInfo.keys] The array of keys (one on each hiearchy level) used for the last opened child page
			 * @param {function} fnSetPath - pass the binding path of the corresponding list item to this function if it is not identical to <code>oSelectionInfo.path</code>
			 * @protected
			 */
			onChildOpenedExtension: function(oSelectionInfo, fnSetPath) {}
		};
	});