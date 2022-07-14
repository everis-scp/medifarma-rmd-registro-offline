/*
 * SAPUI5
  (c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define("sap/zen/commons/GridRenderer",["sap/zen/commons/library","sap/zen/commons/utils/jQuery","sap/zen/commons/Format","sap/zen/commons/thirdparty/lodash"],function(e,q,F,_){"use strict";function G(){var t=this;var f=0;var a=0;var h=null;t.render=function(r,c){h=c.getHash();var C=c.getCellControls();var b=c.getButtonControls();f=c.getFixedColumns();a=c.getFixedRows();var R=[];var d=[];function g(o,n,m,p,s){if(o){if(m<a){if(!n<f){if(d[n]){d[n]=[d[n],o.getId()].join(" ");}else{d.push(o.getId());}}}else if(n<f){if(R[m]){R[m]=[R[m],o.getId()].join(" ");}else{R.push(o.getId());}}}r.openStart("td").attr("data-grid-coord",m+":"+n).attr("data-grid-column",p).attr("data-grid-row",s).class(n<c.getFixedColumns()?"sapUiZenCommonsGridFixCol":"sapUiZenCommonsGridDynCol");if(m===c.getFixedRows()-1){r.class("sapUiZenCommonsGridLastFixedRow");}if(o){switch(o.getCellType()){case e.CellType.Title:r.attr("data-help-id",o.getHelpId());break;}}if(n>=f&&m>=a){r.attr("headers",_.concat(R[m-a],d[n-f]).join(" "));}if(c._ColumnWidth2&&c._ColumnWidth2[n]){var w=c._ColumnWidth2[n]+"px";r.style("width",w);}r.openEnd();var B=b[[m,n].join(":")];r.openStart("span").style("display","inline-block").class("sapUiZenCommonsGridHierIcon").class("sapUiIcon").class("sapUiIconPointer").openEnd();if(B){r.renderControl(B);}r.close("span");r.voidStart("div").attr("data-grid-column",p).attr("data-grid-row",s).attr("data-grid-coord",m+":"+n).class("sapUiZenCommonsGridCellDiv").voidEnd().renderControl(C[[s,p].join(":")]).close("td");}function i(){r.openStart("table").openEnd().openStart("tr").openEnd().openStart("td").attr("colspan",c.getFixedColumns()).class("sapUiZenCommonsGridHsbHTd").openEnd().openStart("div").class("sapUiZenCommonsGridHsbHTdDiv").openEnd().close("div").close("td").openStart("td").attr("colspan",c.getMaxColumns()-c.getFixedColumns()).openEnd().openStart("div",c.getId()+"-hsb").class("sapUiZenCommonsGridHsb").openEnd().openStart("div",c.getId()+"-hsb-i").class("sapUiZenCommonsGridHsbI").openEnd().openStart("span").class("sapUiZenCommonsGridHTooltip").openEnd().close("span").openStart("div",c.getId()+"-hsb-ii").class("sapUiZenCommonsGridHsbII").openEnd().close("div").close("div").close("div").close("td").close("tr").close("table");}function j(){function m(){switch(c.getFormat()){case F.ExcelStyle:return"sapUiZenCommonsGridExcelStyle";case F.BusinessStyle:return"sapUiZenCommonsGridBusinessStyle";case F.BusinessStyleFormular:return"sapUiZenCommonsGridBusinessStyleFormular";default:return"sapUiZenCommonsGridBasicStyle";}}r.openStart("div").class("sapUiZenCommonsGridInnerDiv").openEnd().openStart("table").class("sapUiZenCommonsGridInnerTable").class(m()).openEnd();h.rowRange.forEach(function(n,o){r.openStart("tr").class("sapUiZenCommonsGridRow");if(!n){r.class("sapUiZenCommonsGridFirstRow");}if(n<a){r.class("sapUiZenCommonsGridFixedRow");}r.style("height",c.getRowHeight()+"px").style("max-height",c.getRowHeight()+"px").style("min-height",c.getRowHeight()+"px").openEnd();h.colRange.forEach(function(p,s){var u=h[o+":"+s];g(u,p,n,s,o);});r.close("tr");});r.close("table").close("div");}function k(){r.openStart("div").class("sapUiZenCommonsGridOuterDiv").openEnd();if(c.getCells().length){r.openStart("table").class("sapUiZenCommonsGridOuterTable").openEnd().openStart("tr").openEnd().openStart("td").class("sapUiZenCommonsGridOuterCell11").openEnd();j();r.close("td").openStart("td").class("sapUiZenCommonsGridOuterCell12").openEnd().close("td").close("tr").openStart("tr").openEnd().openStart("td").openEnd();i(r,c);r.close("td").close("tr").close("table");}r.close("div");}function l(){r.openStart("div");r.writeControlData(c);r.openEnd();k();r.close("div");}l(r,c);};}e.GridRenderer=new G();return e.GridRenderer;},true);
