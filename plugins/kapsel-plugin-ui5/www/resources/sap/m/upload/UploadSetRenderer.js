/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/ListItemBaseRenderer'],function(L){"use strict";var U={};U.render=function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapMUC");r.writeClasses();r.write(">");this.renderDragDropOverlay(r,c);this.renderList(r,c);r.write("</div>");};U.renderDragDropOverlay=function(r,c){r.write("<div");r.writeAttribute("id",c.getId()+"-drag-drop-area");r.addClass("sapMUCDragDropOverlay");r.addClass("sapMUCDragDropOverlayHide");r.writeClasses();r.write(">");r.write("<div");r.addClass("sapMUCDragDropIndicator");r.writeClasses();r.write(">");r.write("</div>");r.write("</div>");};U.renderList=function(r,c){var o=c.getList().getRenderer().renderNoData;c.getList().getRenderer().renderNoData=this.renderNoData;r.renderControl(c.getList());c.getList().getRenderer().renderNoData=o;};U.renderNoData=function(r,c){var u=c.getParent();r.write("<li");r.writeAttribute("tabindex",0);r.writeAttribute("id",u.getList().getId("nodata"));r.addClass("sapMLIB sapMUCNoDataPage");L.addFocusableClasses.call(L,r);r.writeClasses();r.write(">");r.renderControl(u._oNoDataIcon);r.write("<div");r.writeAttribute("id",u.getId()+"-no-data-text");r.addClass("sapMUCNoDataText");r.writeClasses();r.write(">");r.writeEscaped(u.getNoDataText());r.write("</div>");if(u.getUploadEnabled()){r.write("<div");r.writeAttribute("id",u.getId()+"-no-data-description");r.addClass("sapMUCNoDataDescription");r.writeClasses();r.write(">");r.writeEscaped(u.getNoDataDescription());r.write("</div>");}r.write("</li>");};return U;});