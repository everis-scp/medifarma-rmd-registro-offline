/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/CalendarLegendRenderer','sap/ui/core/Renderer'],function(C,R){"use strict";var P=R.extend(C);P.apiVersion=2;P.renderItemsHeader=function(r,l){var i=l.getItemsHeader();if(i&&(l.getItems().length||l.getStandardItems().length)){this._renderItemsHeader(r,i);}};P.renderAppointmentsItemsHeader=function(r,l){var a=l.getAppointmentItemsHeader();if(a&&l.getAppointmentItems().length){this._renderItemsHeader(r,a);}else if(l.getAppointmentItems().length&&(l.getItems().length||l.getStandardItems().length)){r.voidStart("hr");r.voidEnd();}};P._renderItemsHeader=function(r,h){r.openStart("div");r.class("sapMPlanCalLegendHeader");r.attr("role","heading");r.attr("aria-level","3");r.openEnd();r.text(h);r.close("div");r.voidStart("hr");r.voidEnd();};P.renderAdditionalContent=function(r,l){var a=l.getAppointmentItems(),i,c;this.renderAppointmentsItemsHeader(r,l);r.openStart("div");r.class("sapUiUnifiedLegendItems");c=l.getColumnWidth();r.style("column-width",c);r.style("-moz-column-width",c);r.style("-webkit-column-width",c);r.openEnd();for(i=0;i<a.length;i++){this.renderLegendItem(r,"sapUiCalLegDayType"+l._getItemType(a[i],a).slice(4),a[i],["sapUiUnifiedLegendSquareColor","sapMPlanCalLegendAppCircle"]);}r.close("div");};return P;},true);
