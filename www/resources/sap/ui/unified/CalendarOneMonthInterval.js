/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/calendar/CustomMonthPicker','sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/Calendar','./library','sap/ui/unified/CalendarDateInterval','sap/ui/unified/calendar/OneMonthDatesRow',"sap/ui/unified/DateRange","./CalendarOneMonthIntervalRenderer"],function(C,a,b,c,l,d,O,D,e){"use strict";var f=d.extend("sap.ui.unified.CalendarOneMonthInterval",{});f.prototype.init=function(){d.prototype.init.apply(this,arguments);this._bShowOneMonth=true;};f.prototype._getCalendar=function(){var o;if(!this._oCalendar){o=new C(this.getId()+"--Cal");o.setPopupMode(true);o.attachEvent("select",function(){var g=this._getCalendar(),h=g._getFocusedDate(),n=a._getFirstDateOfMonth(h);var i=this.getAggregation("month")[0];this._setStartDate(n);if(i.getMode()<2){n=this._getStartDate();}this._adjustSelectedDate(n);this._oFocusDateOneMonth=n;this._closeCalendarPicker(true);this._focusDate(h,false,true);},this);o.attachEvent("cancel",function(E){var g=this._getCalendar(),h=g._getFocusedDate();this._closeCalendarPicker(true);this._oFocusDateOneMonth=h;this._focusDate(h,true);var i=this.getAggregation("header").getDomRef("B1");if(i){i.focus();}},this);this._oCalendar=o;}return this._oCalendar;};f.prototype._createMonth=function(i){return new O(i);};f.prototype._handleFocus=function(E){var o=!!E.getParameter("_outsideBorder"),g=E.getParameter("date"),h=b.fromLocalJSDate(g),i=b.fromLocalJSDate(this.getStartDate()),I=!a._isSameMonthAndYear(h,i),j,F,s;if(o||I){if(a._isLastDateInMonth(h)){this._oFocusDateOneMonth=h;}else{this._oFocusDateOneMonth=a._getFirstDateOfMonth(h);}j=h.isBefore(i)?-1:1;F=new b(this._getFocusedDate(),this.getPrimaryCalendarType());s=new b(this._getStartDate(),this.getPrimaryCalendarType());d.prototype._shiftStartFocusDates.call(this,F,s,j);}return d.prototype._handleFocus.apply(this,arguments);};f.prototype._focusDateExtend=function(o,g,n){var h,L;if(!this._oFocusDateOneMonth){return d.prototype._focusDateExtend.apply(this,arguments);}h=this.getAggregation("month")[0];L=this._oFocusDateOneMonth.toLocalJSDate();this._setFocusedDate(this._oFocusDateOneMonth);h._bNoRangeCheck=true;h.setDate(L);h._bNoRangeCheck=false;this._oFocusDateOneMonth=null;return!n;};f.prototype._setDisplayMode=function(m){this.getAggregation("month")[0].setMode(m);};f.prototype._shiftStartFocusDates=function(s,F,i){var S=i,o=this.getAggregation("month")[0],L,g;if(S!==0){S=S>0?1:-1;}s.setMonth(s.getMonth()+S);F.setYear(s.getYear());F.setMonth(s.getMonth(),s.getDate());this._setFocusedDate(F);this._setStartDate(s,true);L=this.getStartDate();g=b.fromLocalJSDate(L,this.getPrimaryCalendarType());if(this.getMinDate()&&this.getMinDate().getTime()>L.getTime()){g=b.fromLocalJSDate(this.getMinDate(),this.getPrimaryCalendarType());}if(this.getMaxDate()&&this.getMaxDate().getTime()<L.getTime()){g=b.fromLocalJSDate(this.getMaxDate(),this.getPrimaryCalendarType());}o.selectDate(g.toLocalJSDate());if(o.getMode()<2){this.fireSelect();}};f.prototype._adjustSelectedDate=function(s){var m=this.getAggregation("month")[0];if(m.getMode&&m.getMode()<2){this._selectDate(s);}};f.prototype._selectDate=function(o){var m=this.getAggregation("month")[0],L=o.toLocalJSDate();this.removeAllSelectedDates();this.addSelectedDate(new D({startDate:L}));m.selectDate(L);this._bDateRangeChanged=undefined;};f.prototype._dateMatchesVisibleRange=function(o){return a._isSameMonthAndYear(b.fromLocalJSDate(this.getStartDate()),b.fromLocalJSDate(o));};f.prototype._togglePrevNext=function(o,g){var h=this.getAggregation("header");var y=this._oMaxDate.getYear();var Y=this._oMinDate.getYear();var m=this._oMaxDate.getMonth();var M=this._oMinDate.getMonth();var F=a._getFirstDateOfMonth(o);var i=new b(F),j,k;i.setMonth(i.getMonth()+1);j=F.getYear();k=F.getMonth();if(j<Y||(j==Y&&(!g||k<=M))){h.setEnabledPrevious(false);}else{h.setEnabledPrevious(true);}j=i.getYear();k=i.getMonth();if(j>y||(j==y&&(!g||k>m))){h.setEnabledNext(false);}else{h.setEnabledNext(true);}};f.prototype._setMinMaxDateExtend=function(o){return c.prototype._setMinMaxDateExtend.apply(this,arguments);};return f;});
