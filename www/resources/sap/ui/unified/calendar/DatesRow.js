/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/calendar/CalendarUtils','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/calendar/Month','sap/ui/unified/library',"./DatesRowRenderer","sap/ui/thirdparty/jquery"],function(C,a,M,l,D,q){"use strict";var b=M.extend("sap.ui.unified.calendar.DatesRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},days:{type:"int",group:"Appearance",defaultValue:7},showDayNamesLine:{type:"boolean",group:"Appearance",defaultValue:true}}}});b.prototype.init=function(){M.prototype.init.apply(this,arguments);this._iColumns=1;this._aWeekNumbers=[];};b.prototype._setAriaRole=function(r){this._ariaRole=r;return this;};b.prototype._getAriaRole=function(){return this._ariaRole?this._ariaRole:"gridcell";};b.prototype.setStartDate=function(s){C._checkJSDateObject(s);var y=s.getFullYear();C._checkYearInValidRange(y);this.setProperty("startDate",s);this._oStartDate=a.fromLocalJSDate(s,this.getPrimaryCalendarType());if(this.getDomRef()){var o=this._getDate().toLocalJSDate();this._bNoRangeCheck=true;this.displayDate(s);this._bNoRangeCheck=false;if(o&&this.checkDateFocusable(o)){this.displayDate(o);}}return this;};b.prototype._getStartDate=function(){if(!this._oStartDate){this._oStartDate=a.fromLocalJSDate(new Date(),this.getPrimaryCalendarType());}return this._oStartDate;};b.prototype.setDate=function(d){if(!this._bNoRangeCheck&&!this.checkDateFocusable(d)){throw new Error("Date must be in visible date range; "+this);}M.prototype.setDate.apply(this,arguments);return this;};b.prototype.displayDate=function(d){if(!this._bNoRangeCheck&&!this.checkDateFocusable(d)){throw new Error("Date must be in visible date range; "+this);}M.prototype.displayDate.apply(this,arguments);return this;};b.prototype._setTopPosition=function(t){this._iTopPosition=t;};b.prototype.setPrimaryCalendarType=function(c){M.prototype.setPrimaryCalendarType.apply(this,arguments);if(this._oStartDate){this._oStartDate=new a(this._oStartDate,c);}return this;};b.prototype.setFirstDayOfWeek=function(f){if(f==-1){return this.setProperty("firstDayOfWeek",f,false);}else{throw new Error("Property firstDayOfWeek not supported "+this);}};b.prototype._handleBorderReached=function(c){var e=c.getParameter("event");var d=this._getRelativeInfo?this.getDays()*this._getRelativeInfo().iIntervalSize:this.getDays();var s=this._getRelativeInfo?this._getRelativeInfo().iIntervalSize:1;var o=this._getDate();var f=new a(o,this.getPrimaryCalendarType());if(e.type){switch(e.type){case"sapnext":case"sapnextmodifiers":f.setDate(f.getDate()+s);break;case"sapprevious":case"sappreviousmodifiers":f.setDate(f.getDate()-s);break;case"sappagedown":f.setDate(f.getDate()+d);break;case"sappageup":f.setDate(f.getDate()-d);break;default:break;}this.fireFocus({date:f.toLocalJSDate(),otherMonth:true,_outsideBorder:true});}};b.prototype.checkDateFocusable=function(d){C._checkJSDateObject(d);if(this._bNoRangeCheck){return false;}var s=this._getStartDate();var e=new a(s,this.getPrimaryCalendarType());var A=this.getDays();if(this._getRelativeInfo&&this._getRelativeInfo().bIsRelative){A=this.getDays()*this._getRelativeInfo().iIntervalSize;}e.setDate(e.getDate()+A);var c=a.fromLocalJSDate(d,this.getPrimaryCalendarType());return c.isSameOrAfter(s)&&c.isBefore(e);};b.prototype._renderHeader=function(){var s=this._getStartDate();var S=s.getDay();var L=this._getLocaleData();var w=this.$("Names").children();var W=[];if(this._bLongWeekDays||!this._bNamesLengthChecked){W=L.getDaysStandAlone("abbreviated");}else{W=L.getDaysStandAlone("narrow");}var c=L.getDaysStandAlone("wide");var i=0;for(i=0;i<w.length;i++){var $=q(w[i]);$.text(W[(i+S)%7]);$.attr("aria-label",c[(i+S)%7]);}if(this._getShowHeader()){var d=this.$("Head");if(d.length>0){var r=sap.ui.getCore().createRenderManager();this.getRenderer().renderHeaderLine(r,this,L,s);r.flush(d[0]);r.destroy();}}};b.prototype._getFirstWeekDay=function(){return this._getStartDate().getDay();};b.prototype.getWeekNumbers=function(){var d=this.getDays(),L=this._getLocale(),o=this._getLocaleData(),c=this.getPrimaryCalendarType(),s=this._getStartDate(),e=new a(s,c),E=new a(s,c).setDate(e.getDate()+d),f=[];while(e.isBefore(E)){f.push(new a(e,c));e.setDate(e.getDate()+1);}this._aWeekNumbers=f.reduce(function(w,g){var W=C.calculateWeekNumber(g.toUTCJSDate(),g.getYear(),L,o);if(!w.length||w[w.length-1].number!==W){w.push({len:0,number:W});}w[w.length-1].len++;return w;},[]);return this._aWeekNumbers;};b.prototype._getCachedWeekNumbers=function(){return this._aWeekNumbers;};return b;});
