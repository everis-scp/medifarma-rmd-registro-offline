sap.ui.define([
	"sap/suite/ui/generic/template/genericUtilities/controlHelper",
	"sap/suite/ui/generic/template/genericUtilities/controlStateWrapperFactory/SmartTableWrapper",
	"sap/suite/ui/generic/template/genericUtilities/controlStateWrapperFactory/SmartChartWrapper",
	"sap/suite/ui/generic/template/genericUtilities/controlStateWrapperFactory/DynamicPageWrapper"	
	], function(controlHelper, SmartTableWrapper, SmartChartWrapper, DynamicPageWrapper) {
	"use strict";
	/**
	 * This class provides an interface which all the wrapper classes need to adhere to.
	 * This class also provides documentation for the wrapper classes in general.
     function GenericWrapper(oWrappedControl) {
		var oGenericWrapper = {
				getState: Function.prototype,
				setState: function(oState){},
				attachStateChanged: function(fnHandler){},
				detachStateChanged: Function.prototype
		};
		return oGenericWrapper;
	}
	*/

	var oControlStateWrapperFactory = {
			/** 
			 * Factory funtion to generate control wrapper object based on control type
			 * @param {object} oControl - control object
			 * @return {object} wrapper object for the control
			 */
			getControlStateWrapper: function(oControl) {
				switch (true) {
				case controlHelper.isSmartTable(oControl):
					return new SmartTableWrapper(oControl);
				case controlHelper.isSmartChart(oControl):
					return new SmartChartWrapper(oControl);
				case controlHelper.isDynamicPage(oControl):
					return new DynamicPageWrapper(oControl);
				default:
					throw "Provided control not supported";
				}
			}      
	};
	return oControlStateWrapperFactory;
});
