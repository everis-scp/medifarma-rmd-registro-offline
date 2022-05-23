/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/gantt/misc/Format","sap/gantt/config/TimeHorizon","sap/gantt/drawer/TimePeriodZoomRectangle","sap/ui/core/library","sap/gantt/misc/Utility"],function(q,B,F,T,a,c,U){"use strict";var O=c.Orientation;var b=B.extend("sap.gantt.eventHandler.TimePeriodZoomHandler",{constructor:function(C){B.call(this);this._oSourceChart=C;this._oTimePeriodZoomRectangleDrawer=new a();this._bActive=false;this._bLocked=false;this._bMouseOnSvg=false;this._bEnableSetVisibleHorizon=false;this._sAutoScrollDirection=undefined;this._oLastEvent=undefined;}});b.prototype.activate=function(s){this._bActive=true;var $=q(this._oSourceChart.getDomSelectorById("svg"));$.css("cursor","crosshair");if(!s){this.fireActiveStatusChangeEvent(this._bActive);}};b.prototype.deactivate=function(s){this._bActive=false;var $=q(this._oSourceChart.getDomSelectorById("svg"));$.css("cursor","auto");if(!s){this.fireActiveStatusChangeEvent(this._bActive);}};b.prototype.invertActiveStatus=function(){if(this._bActive){this.deactivate();}else{this.activate();}};b.prototype.fireActiveStatusChangeEvent=function(A){this._oSourceChart.fireEvent("_timePeriodZoomStatusChange",{isActive:A});};b.prototype.isTimePeriodZoomEnabled=function(){var A=this._oSourceChart.getAxisTimeStrategy();return A.isTimePeriodZoomEnabled()&&this._bMouseOnSvg;};b.prototype.isActive=function(){return this._bActive;};b.prototype.handleDragStart=function(e,s){var g=this._oSourceChart;this._bLocked=true;this._bEnableSetVisibleHorizon=true;this.oStartEvent=e;this.oStartTime=this._caculateEventTime(e);this.createRectangle(this.oStartTime);var G=q(g.getDomSelectorById("svg"));G.unbind("mousemove.timePeriodZoomDragDrop");q(document.body).unbind("mouseup.timePeriodZoomDragDrop");g.detachHorizontalScroll(this.handleAutoScroll,this);G.bind("mousemove.timePeriodZoomDragDrop",this.handleDragging.bind(this));q(document.body).bind("mouseup.timePeriodZoomDragDrop",this.handleDragEnd.bind(this));g.attachHorizontalScroll(this.handleAutoScroll,this);if(!s){this._bMouseOnSvg=true;g.fireEvent("_timePeriodZoomOperation",{type:"dragStart",dragStartTime:this.oStartTime,originalEvent:e});}};b.prototype.createRectangle=function(d){var g=this._oSourceChart;var D=g.getAxisTime().timeToView(d);var s=d3.select(g.getDomSelectorById("svg"));this._oTimePeriodZoomRectangleDrawer.drawSvg(s,D);};b.prototype.handleDragging=function(e,s){var g=this._oSourceChart;this._oLastEvent=e;var d=this._caculateEventTime(e);this.updateRectangle(this.oStartTime,d);if(!s){var D=g._handleAutoScroll(e);if(D){this._sAutoScrollDirection=D;}g.fireEvent("_timePeriodZoomOperation",{type:"dragging",dragStartTime:this.oStartTime,draggingTime:d,originalEvent:e});}};b.prototype.updateRectangle=function(d,D){var g=this._oSourceChart;var i=g.getAxisTime().timeToView(d);var e=g.getAxisTime().timeToView(D);var s=d3.select(g.getDomSelectorById("svg"));if(e>i){this._oTimePeriodZoomRectangleDrawer.updateSvg(s,i,e);}else{this._oTimePeriodZoomRectangleDrawer.updateSvg(s,e,i);}};b.prototype.handleDragEnd=function(e,s){var g=this._oSourceChart;g._oAutoScrollHandler.stop();this._bLocked=false;this.deactivate();this._sAutoScrollDirection=undefined;this.destoryRectangle();var d;if(this._bEnableSetVisibleHorizon){var D=g.getAxisTime().timeToView(this.oStartTime);var i=this._caculateXPosition(e);d=this._caculateEventTime(e);var E=d;var o=5;if(Math.abs(i-D)>o){var S=this.oStartTime;if(E.getTime()<S.getTime()){var t=S;S=E;E=t;}var f=new T({startTime:S,endTime:E});g.syncVisibleHorizon(f);}}var G=q(g.getDomSelectorById("svg"));G.unbind("mousemove.timePeriodZoomDragDrop");q(document.body).unbind("mouseup.timePeriodZoomDragDrop");g.detachHorizontalScroll(this.handleAutoScroll,this);if(!s){var v=g.getVisibleWidth();g.fireEvent("_timePeriodZoomOperation",{type:"dragEnd",dragStartTime:this.oStartTime,dragEndTime:d,visibleWidth:v,originalEvent:e});this.fireActiveStatusChangeEvent(this._bActive);}};b.prototype.destoryRectangle=function(){var g=this._oSourceChart;var s=d3.select(g.getDomSelectorById("svg"));this._oTimePeriodZoomRectangleDrawer.destroySvg(s);};b.prototype.handleAutoScroll=function(e){if(this._bMouseOnSvg){var g=this._oSourceChart;var p=e.getParameters();var t;if(this._sAutoScrollDirection==="scrollLeft"){var v=F.abapTimestampToDate(p.startTime);t=v.getTime()-this.oStartTime.getTime();}else if(this._sAutoScrollDirection==="scrollRight"){var V=F.abapTimestampToDate(p.endTime);t=V.getTime()-this.oStartTime.getTime();}g.fireEvent("_timePeriodZoomOperation",{type:"autoScroll",timeBias:t,originalEvent:e});}};b.prototype.attachEvents=function(){var g=q(this._oSourceChart.getDomSelectorById("svg"));g.bind("mouseenter.timePeriodZoomDragDrop",this.handleMouseEnter.bind(this));g.bind("mouseleave.timePeriodZoomDragDrop",this.handleMouseLeave.bind(this));};b.prototype.detachEvents=function(){var g=q(this._oSourceChart.getDomSelectorById("svg"));g.unbind("mouseenter.timePeriodZoomDragDrop");g.unbind("mouseleave.timePeriodZoomDragDrop");};b.prototype.handleMouseEnter=function(e){this._bMouseOnSvg=true;this._bLocked=true;this.setEnableSetVisibleHorizon(true);};b.prototype.handleMouseLeave=function(e){this._bMouseOnSvg=false;this._oSourceChart._oAutoScrollHandler.stop();this._bLocked=false;this.setEnableSetVisibleHorizon(false);};b.prototype.handleAutoScrolling=function(e){if(e.getParameter("direction")==="scrollLeft"||e.getParameter("direction")==="scrollRight"){var g=this._oSourceChart;var d=this._caculateEventTime(this._oLastEvent);this.updateRectangle(this.oStartTime,d);g.fireEvent("_timePeriodZoomOperation",{type:"dragging",dragStartTime:this.oStartTime,draggingTime:d,originalEvent:this._oLastEvent});}};b.prototype.setEnableSetVisibleHorizon=function(e,s){this._bEnableSetVisibleHorizon=e;if(!s){var g=this._oSourceChart;g.fireEvent("_timePeriodZoomOperation",{type:"enableSetVisibleHorizon",enable:e});}};b.prototype.calculateTargetVisibleHorizonByTimeBias=function(t){var o;var d;if(t!==undefined){var g=this._oSourceChart;var e=g.getAxisTimeStrategy().getTotalHorizon();d=new Date();d.setTime(this.oStartTime.getTime()+t);if(t<0){var f=F.abapTimestampToDate(e.getStartTime());if(d.getTime()<f.getTime()){d=f;this.oStartTime.setTime(d.getTime()-t);}o=new T({startTime:d});}else{var h=F.abapTimestampToDate(e.getEndTime());if(d.getTime()>h.getTime()){d=h;this.oStartTime.setTime(d.getTime()-t);}o=new T({startTime:undefined,endTime:d});}}return o;};b.prototype.calculateTargetVisibleHorizon=function(e,s){var t;if(e.dragEndTime){var g=this._oSourceChart;var A=g.getAxisTimeStrategy();var o=A.getVisibleHorizon();var G=g.getVisibleWidth();var d=e.dragStartTime.getTime();var D=e.dragEndTime.getTime();var S;if(s){S=d<D?e.dragStartTime:e.dragEndTime;}else{S=F.abapTimestampToDate(A.getVisibleHorizon().getStartTime());}t=U.calculateHorizonByWidth(o,e.visibleWidth,G,S);}return t;};b.prototype.syncTimePeriodZoomOperation=function(e,t,o){var g=this._oSourceChart;var p=e.getParameters();var d;if(o===O.Vertical){if(p.type==="dragStart"){this.handleDragStart(p.originalEvent,true);}else if(p.type==="dragging"){this.handleDragging(p.originalEvent,true);}else if(p.type==="dragEnd"){this.handleDragEnd(p.originalEvent,true);}else if(p.type==="enableSetVisibleHorizon"){this.setEnableSetVisibleHorizon(p.enable,true);}else if(p.type==="autoScroll"){if(!t){d=this.calculateTargetVisibleHorizonByTimeBias(p.timeBias);if(d){g.syncVisibleHorizon(d);}}}}else if(o===O.Horizontal){if(p.type==="dragStart"&&t){this.createRectangle(p.dragStartTime);}else if(p.type==="dragging"&&t){this.updateRectangle(p.dragStartTime,p.draggingTime);}else if(p.type==="dragEnd"){if(t){this.destoryRectangle();}d=this.calculateTargetVisibleHorizon(p,t);if(d){g.syncVisibleHorizon(d);}}}};b.prototype._caculateXPosition=function(e){var g=this._oSourceChart;var m=g._getMouseXPos(e);var s=q(g.getDomSelectorById("svg"));var x=m;if(s.offset()){x=m-s.offset().left||e.offsetX;}return x;};b.prototype._caculateEventTime=function(e){var g=this._oSourceChart;var x=this._caculateXPosition(e);return g.getAxisTime().viewToTime(x);};return b;},true);
