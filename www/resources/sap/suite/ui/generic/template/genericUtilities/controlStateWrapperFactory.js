sap.ui.define(["sap/suite/ui/generic/template/genericUtilities/controlHelper","sap/suite/ui/generic/template/genericUtilities/controlStateWrapperFactory/SmartTableWrapper","sap/suite/ui/generic/template/genericUtilities/controlStateWrapperFactory/SmartChartWrapper","sap/suite/ui/generic/template/genericUtilities/controlStateWrapperFactory/DynamicPageWrapper"],function(c,S,a,D){"use strict";var C={getControlStateWrapper:function(o){switch(true){case c.isSmartTable(o):return new S(o);case c.isSmartChart(o):return new a(o);case c.isDynamicPage(o):return new D(o);default:throw"Provided control not supported";}}};return C;});
