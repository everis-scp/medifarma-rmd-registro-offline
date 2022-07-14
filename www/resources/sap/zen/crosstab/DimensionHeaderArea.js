/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
sap.ui.define(["jquery.sap.global","sap/zen/crosstab/BaseArea","sap/zen/crosstab/rendering/RenderingConstants"],function(q,B,R){"use strict";q.sap.declare("sap.zen.crosstab.DimensionHeaderArea");sap.zen.crosstab.DimensionHeaderArea=function(c){B.call(this,c);this.sAreaType=R.TYPE_DIMENSION_HEADER_AREA;};sap.zen.crosstab.DimensionHeaderArea.prototype=q.sap.newObject(B.prototype);sap.zen.crosstab.DimensionHeaderArea.prototype.renderArea=function(r){var c="sapzencrosstab-DimensionHeaderArea";if(this.oCrosstab.getPropertyBag().isMobileMode()){c+=" sapzencrosstab-MobileHeaderSeparator";}this.renderContainerStructure(r,c,false,false);};sap.zen.crosstab.DimensionHeaderArea.prototype.getPageManager=function(){return null;};return sap.zen.crosstab.DimensionHeaderArea;});
