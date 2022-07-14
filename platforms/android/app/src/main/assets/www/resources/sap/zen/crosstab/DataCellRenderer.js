/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
sap.ui.define(["jquery.sap.global","sap/zen/crosstab/rendering/RenderingConstants","sap/zen/crosstab/IDataCell"],function(q,R,I){"use strict";q.sap.declare("sap.zen.crosstab.DataCellRenderer");sap.zen.crosstab.DataCellRenderer={};sap.zen.crosstab.DataCellRenderer.render=function(r,c){"use strict";var a=c.getArea();var C=a.getCrosstab();var f=a.getRenderCellCallback();var s=c.getText();var A=null;if(f){var o=f(new I(c));A=o.additionalStyles;s=o.renderText;}var b=r;b.write("<td");b.writeControlData(c);var d=c.getCssClassNames(C.isIE8Mode(),C.getPropertyBag().isRtl(),C.getUtils().isMsIE());b.writeAttributeEscaped("class",d);b.writeAttributeEscaped("tabindex",R.TABINDEX);b.write(">");b.write("<div");b.writeAttributeEscaped("id",c.getId()+"_contentDiv");b.writeAttributeEscaped("tabindex",R.TABINDEX);var e="sapzencrosstab-DataCellContentDiv";if(c.isLoading()){e+=" sapzencrosstab-LoadingCellContentDiv";}b.writeAttributeEscaped("class",e);if(A){for(var S in A){b.addStyle(S,A[S]);}}b.writeStyles();b.write(">");b.writeEscaped(s);b.write("</div>");b.write("</td>");};return sap.zen.crosstab.DataCellRenderer;});