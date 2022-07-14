/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
sap.ui.define("sap/zen/crosstab/CellStyleHandler",["sap/zen/crosstab/rendering/RenderingConstants","sap/zen/crosstab/utils/Utils"],function(R,U){"use strict";sap.zen.crosstab.CellStyleHandler={};sap.zen.crosstab.CellStyleHandler.aStyles=[];sap.zen.crosstab.CellStyleHandler.iDataCellAlternatingIndex=-1;sap.zen.crosstab.CellStyleHandler.iHeaderCellAlternatingIndex=-1;sap.zen.crosstab.CellStyleHandler.oExceptionVisualizationMapping={};sap.zen.crosstab.CellStyleHandler.oExceptionVisualizationMapping[R.ALERT_TYPE_BACKGROUND]="Background";sap.zen.crosstab.CellStyleHandler.oExceptionVisualizationMapping[R.ALERT_TYPE_FONT_COLOR]="FontColor";sap.zen.crosstab.CellStyleHandler.oExceptionVisualizationMapping[R.ALERT_TYPE_STATUS_SYMBOL]="StatusSymbol";sap.zen.crosstab.CellStyleHandler.oExceptionVisualizationMapping[R.ALERT_TYPE_TREND_ASCENDING_SYMBOL]="TrendAscendingSymbol";sap.zen.crosstab.CellStyleHandler.oExceptionVisualizationMapping[R.ALERT_TYPE_TREND_DESCENDING_SYMBOL]="TrendDescendingSymbol";sap.zen.crosstab.CellStyleHandler.oExceptionVisualizationMapping[R.ALERT_TYPE_TREND_GREY_SYMBOL]="TrendGreySymbol";sap.zen.crosstab.CellStyleHandler.getCompleteStyleName=function(s,c){var C="";if(c===R.TYPE_DATA_CELL){C=R.STYLE_PREFIX_DATA_CELL+s;}else{C=R.STYLE_PREFIX_HEADER_CELL+s;}return C;};sap.zen.crosstab.CellStyleHandler.pushStyle=function(c){var i=sap.zen.crosstab.CellStyleHandler.aStyles.push(c);i--;return i;};sap.zen.crosstab.CellStyleHandler.getStyleId=function(s,c){var C=sap.zen.crosstab.CellStyleHandler.getCompleteStyleName(s,c);var i=sap.zen.crosstab.CellStyleHandler.aStyles.indexOf(C);if(i===-1){i=sap.zen.crosstab.CellStyleHandler.pushStyle(C);}return i;};sap.zen.crosstab.CellStyleHandler.pushPresetStyle=function(s,c){var C=sap.zen.crosstab.CellStyleHandler.getCompleteStyleName(s,c);var i=sap.zen.crosstab.CellStyleHandler.pushStyle(C);return i;};sap.zen.crosstab.CellStyleHandler.translateStyleForMainMode=function(s){if(s.indexOf("CellEntryEnabled")>-1){s=s+"-MainMode";}return s;};sap.zen.crosstab.CellStyleHandler.addTextAlignmentStyleForIE=function(s,i){if(i){s=s+" sapzencrosstab-TextAlignmentIE_RTL";}else{s=s+" sapzencrosstab-TextAlignmentIE";}return s;};sap.zen.crosstab.CellStyleHandler.iDataCellAlternatingIndex=sap.zen.crosstab.CellStyleHandler.pushPresetStyle(R.STYLE_ALTERNATING,R.TYPE_DATA_CELL);sap.zen.crosstab.CellStyleHandler.iHeaderCellAlternatingIndex=sap.zen.crosstab.CellStyleHandler.pushPresetStyle(R.STYLE_ALTERNATING,R.TYPE_HEADER_CELL);sap.zen.crosstab.CellStyleHandler.getCssClasses=function(c,I,b,a){var C="";var s=c.length;for(var i=0;i<s;i++){var S=c[i];if(S!==-1){if(!(I&&(S===sap.zen.crosstab.CellStyleHandler.iDataCellAlternatingIndex||S===sap.zen.crosstab.CellStyleHandler.iHeaderCellAlternatingIndex))){var d=sap.zen.crosstab.CellStyleHandler.aStyles[S];if(d){if(U.isMainMode()){d=sap.zen.crosstab.CellStyleHandler.translateStyleForMainMode(d);}if(a){d=sap.zen.crosstab.CellStyleHandler.addTextAlignmentStyleForIE(d,b);}C+=d;C+=" ";}}}}return C;};sap.zen.crosstab.CellStyleHandler.getStyleForExceptionViz=function(f,a){var s="Alert"+a+sap.zen.crosstab.CellStyleHandler.oExceptionVisualizationMapping[f];return s;};sap.zen.crosstab.CellStyleHandler.setExceptionStylesOnCell=function(c,f,a){if(f>4){c.getArea().columnHasSymbolException(c.getCol());c.addStyle("SymbolAlertBackground");}var s=sap.zen.crosstab.CellStyleHandler.getStyleForExceptionViz(f,a);if(s){c.addStyle(s);}};return sap.zen.crosstab.CellStyleHandler;});
