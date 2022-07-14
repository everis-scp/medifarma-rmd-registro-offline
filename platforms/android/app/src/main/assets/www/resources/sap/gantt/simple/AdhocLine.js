/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Element","sap/m/ResponsivePopover","./GanttUtils","sap/gantt/simple/MarkerType"],function(E,R,G,M){"use strict";var A=E.extend("sap.gantt.simple.AdhocLine",{metadata:{library:"sap.gantt",properties:{stroke:{type:"sap.gantt.ValueSVGPaintServer"},_strokeWidth:{type:"float",defaultValue:1},strokeDasharray:{type:"string"},strokeOpacity:{type:"float",defaultValue:1},timeStamp:{type:"string"},description:{type:"string"},visible:{type:"boolean",defaultValue:true},markerType:{type:"sap.gantt.simple.MarkerType",defaultValue:M.None},markerPopoverDelay:{type:"int",defaultValue:300},_selected:{type:"boolean",defaultValue:false},_level:{type:"int",defaultValue:1},draggable:{type:"boolean",defaultValue:false}},events:{markerPress:{},markerMouseEnter:{},markerMouseLeave:{},adhoclineDrop:{parameters:{newTimeStamp:{type:"string"},oldTimeStamp:{type:"string"}}}},aggregations:{_line:{type:"sap.gantt.simple.BaseLine",multiple:false},_marker:{type:"sap.gantt.simple.AdhocDiamond",multiple:false},_headerLine:{type:"sap.gantt.simple.BaseLine",multiple:false}},designtime:"sap/gantt/designtime/simple/AdhocLine.designtime"}});A.prototype._getStrokeWidth=function(){return this.getProperty("_strokeWidth");};A.prototype._getMarker=function(){return this.getAggregation("_marker");};A.prototype._setMarker=function(v){this.setAggregation("_marker",v,true);};A.prototype._getLine=function(){return this.getAggregation("_line");};A.prototype._setLine=function(v){this.setAggregation("_line",v,true);};A.prototype._getHeaderLine=function(){return this.getAggregation("_headerLine");};A.prototype._setHeaderLine=function(v){this.setAggregation("_headerLine",v,true);};A.prototype._setSelected=function(v){this.setProperty("_selected",v,true);};A.prototype._getSelected=function(){return this.getProperty("_selected");};A.prototype._setLevel=function(v){this.setProperty("_level",v,true);};A.prototype._getLevel=function(){return this.getProperty("_level");};A.prototype.markerPress=function(e){if(this.getMarkerType()!==sap.gantt.simple.MarkerType.None){if(!this._getSelected()){G.resetStrokeDasharray(this.getParent());this._setSelected(true);}var l=this._getLine();var L=document.getElementById(l.sId);L.style.strokeDasharray=0;L.style.strokeWidth=this._getStrokeWidth()+1;var h=this._getHeaderLine();var H=document.getElementById(h.sId);H.style.strokeDasharray=0;H.style.strokeWidth=this._getStrokeWidth()+1;if(this.getDraggable()&&this._getSelected()){var m=document.getElementById(this._getMarker().getId());m.style.cursor="move";}setTimeout(function(){if(this._oPopover){this._oPopover.close();this._oPopover=null;}}.bind(this),this.getMarkerPopoverDelay());}};A.prototype.markerMouseEnter=function(e){if(this.getMarkerType()!==sap.gantt.simple.MarkerType.None){var l=this._getLine();var L=document.getElementById(l.sId);L.style.strokeDasharray=0;L.style.strokeWidth=this._getStrokeWidth()+1;var h=this._getHeaderLine();var H=document.getElementById(h.sId);H.style.strokeDasharray=0;H.style.strokeWidth=this._getStrokeWidth()+1;if(this.getDraggable()&&this._getSelected()){var m=document.getElementById(this._getMarker().getId());m.style.cursor="move";}var s=e.getSource();var d=this.getProperty("description");if(d){setTimeout(function(){if(!this._oPopover){this._oPopover=new R({placement:sap.m.PlacementType.PreferredRightOrFlip,showArrow:false,showHeader:false,offsetX:5,content:[new sap.m.Text({text:d})],afterClose:function(e){e.getSource().destroy();}}).addStyleClass("sapGanntChartMarkerTooltip");this._oPopover.openBy(s);}else{this._oPopover.openBy(s);}}.bind(this),this.getMarkerPopoverDelay());}}};A.prototype.markerMouseLeave=function(e){if(this.getMarkerType()!==sap.gantt.simple.MarkerType.None){var s=this._getSelected();if(!s){var l=this._getLine();var S=document.getElementById(l.sId);var o=this.getStrokeDasharray();var O=this._getStrokeWidth();S.style.strokeDasharray=o;S.style.strokeWidth=O;var h=this._getHeaderLine();var H=document.getElementById(h.sId);H.style.strokeDasharray=o;H.style.strokeWidth=O;}setTimeout(function(){if(this._oPopover){this._oPopover.close();this._oPopover=null;}}.bind(this),this.getMarkerPopoverDelay());}};return A;},true);
