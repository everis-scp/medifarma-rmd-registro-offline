/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/date/UniversalDate','sap/ui/unified/CalendarAppointment','sap/ui/unified/CalendarLegendRenderer','sap/ui/Device','sap/ui/unified/library','sap/ui/core/InvisibleText',"sap/base/Log"],function(U,C,a,D,l,I,L){"use strict";var b=l.CalendarDayType;var c=l.CalendarIntervalType;var d=l.CalendarAppointmentVisualization;var e=l.CalendarAppointmentHeight;var f={};f.render=function(r,R){var t=R.getTooltip_AsString();var v=R.getAppointmentsVisualization();var T=this.getLegendItems(R);r.write("<div");r.writeControlData(R);r.addClass("sapUiCalendarRow");if(!D.system.phone&&R.getAppointmentsReducedHeight()){r.addClass("sapUiCalendarRowAppsRedHeight");}if(v!=d.Standard){r.addClass("sapUiCalendarRowVis"+v);}if(t){r.writeAttributeEscaped("title",t);}var w=R.getWidth();if(w){r.addStyle("width",w);}var h=R.getHeight();if(h){r.addStyle("height",h);}r.writeAccessibilityState(R);r.writeClasses();r.writeStyles();r.write(">");this.renderAppointmentsRow(r,R,T);r.write("</div>");};f.renderAppointmentsRow=function(r,R,t){var i=R.getId();r.write("<div id=\""+i+"-Apps\" class=\"sapUiCalendarRowApps\">");this.renderBeforeAppointments(r,R);this.renderAppointments(r,R,t);this.renderAfterAppointments(r,R);r.write("</div>");};f.renderBeforeAppointments=function(r,R){};f.renderAfterAppointments=function(r,R){};f.renderResizeHandle=function(r,R,A){};f.renderAppointments=function(r,R,t){var A=R._getVisibleAppointments();var g=R._getVisibleIntervalHeaders();var s=R._getStartDate();var n=[];var S=0;var N=0;var h=[];var j=0;var k=0;var m=R.getIntervals();var o=R.getIntervalType();var w=100/m;var i=0;var p=new U(s);var F=false;var q=false;switch(o){case c.Hour:n=R.getNonWorkingHours()||[];S=s.getUTCHours();N=24;break;case c.Day:case c.Week:case c.OneMonth:n=R._getNonWorkingDays();S=s.getUTCDay();N=7;h=R.getNonWorkingHours()||[];j=s.getUTCHours();k=24;break;case c.Month:h=R._getNonWorkingDays();j=s.getUTCDay();k=7;break;default:break;}if(R._isOneMonthsRowOnSmallSizes()){this.renderSingleDayInterval(r,R,A,t,g,n,S,N,h,j,k,true,true);}else{for(i=0;i<m;i++){if(q){F=true;}else{F=false;}q=false;switch(o){case c.Hour:p.setUTCHours(p.getUTCHours()+1);if(p.getUTCHours()==0){q=true;}break;case c.Day:case c.Week:case c.OneMonth:p.setUTCDate(p.getUTCDate()+1);if(p.getUTCDate()==1){q=true;}break;case c.Month:p.setUTCMonth(p.getUTCMonth()+1);if(p.getUTCMonth()==0){q=true;}break;default:break;}this.renderInterval(r,R,i,w,g,n,S,N,h,j,k,F,q);}this.renderIntervalHeaders(r,R,w,g,m);r.write("<div id=\""+R.getId()+"-Now\" class=\"sapUiCalendarRowNow\"></div>");for(i=0;i<A.length;i++){var u=A[i];this.renderAppointment(r,R,u,t);}r.write("<div id=\""+R.getId()+"-DummyApp\" class=\"sapUiCalendarApp sapUiCalendarAppTitleOnly sapUiCalendarAppDummy sapUiCalendarAppHeight1\"></div>");}};f.writeCustomAttributes=function(r,R){};f.renderInterval=function(r,R,g,w,h,n,s,N,k,S,m,F,o){var p=R.getId()+"-AppsInt"+g;var i;var q=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||h.length>0);var M=R.getStartDate().getMonth();var t=new Date(R.getStartDate().getFullYear(),M+1,0).getDate();r.write("<div id=\""+p+"\"");r.addClass("sapUiCalendarRowAppsInt");r.addStyle("width",w+"%");if(g>=t&&R.getIntervalType()===c.OneMonth){r.addClass("sapUiCalItemOtherMonth");}for(i=0;i<n.length;i++){if((g+s)%N==n[i]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}if(!q){r.addClass("sapUiCalendarRowAppsIntNoHead");}if(F){r.addClass("sapUiCalendarRowAppsIntFirst");}if(o){r.addClass("sapUiCalendarRowAppsIntLast");}r.writeClasses();r.writeStyles();this.writeCustomAttributes(r,R);r.write(">");if(q){r.write("<div");r.addClass("sapUiCalendarRowAppsIntHead");r.writeClasses();r.write(">");r.write("</div>");}if(R.getShowSubIntervals()){var u=R.getIntervalType();var v=0;switch(u){case c.Hour:v=4;break;case c.Day:case c.Week:case c.OneMonth:v=24;break;case c.Month:var x=R._getStartDate();var y=new U(x);y.setUTCMonth(y.getUTCMonth()+g+1,0);v=y.getUTCDate();y.setUTCDate(1);s=y.getUTCDay();break;default:break;}var z=100/v;for(i=0;i<v;i++){r.write("<div");r.addClass("sapUiCalendarRowAppsSubInt");r.addStyle("width",z+"%");for(var j=0;j<k.length;j++){if((i+S)%m==k[j]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}r.writeStyles();r.writeClasses();r.write(">");r.write("</div>");}}r.write("</div>");};f.renderIntervalHeaders=function(r,R,w,g,h){var s=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||g.length>0);if(s){for(var i=0;i<g.length;i++){var o=g[i],j,k;if(R._bRTL){k=w*o.interval;j=w*(h-o.last-1);}else{j=w*o.interval;k=w*(h-o.last-1);}this.renderIntervalHeader(r,R,o,R._bRTL,j,k);}}};f.renderIntervalHeader=function(r,R,i,g,h,j){var s=i.appointment.getId();var A=R._calculateAppoitnmentVisualCue(i.appointment);r.write("<div");r.addClass("sapUiCalendarRowAppsIntHead");if(h!==undefined){r.addStyle("left",h+"%");}if(j!==undefined){r.addStyle("right",j+"%");}r.writeElementData(i.appointment);r.addClass("sapUiCalendarRowAppsIntHeadFirst");if(i.appointment.getSelected()){r.addClass("sapUiCalendarRowAppsIntHeadSel");}if(i.appointment.getTentative()){r.addClass("sapUiCalendarRowAppsIntHeadTent");}var t=i.appointment.getTooltip_AsString();if(t){r.writeAttributeEscaped("title",t);}var T=i.appointment.getType();var k=i.appointment.getColor();if(!k&&T&&T!=b.None){r.addClass("sapUiCalendarRowAppsIntHead"+T);}if(k){if(g){r.addStyle("border-right-color",k);}else{r.addStyle("border-left-color",k);}}r.writeStyles();r.writeClasses();r.write(">");r.write("<div");r.addClass("sapUiCalendarIntervalHeaderCont");r.writeClasses();if(k){r.addStyle("background-color",i.appointment._getCSSColorForBackground(k));r.writeStyles();}r.write(">");if(A.appTimeUnitsDifRowStart>0){r.writeIcon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null});}var m=i.appointment.getIcon();if(m){var n=["sapUiCalendarRowAppsIntHeadIcon"];var o={};o["id"]=s+"-Icon";o["title"]=null;r.writeIcon(m,n,o);}var p=i.appointment.getTitle();if(p){r.write("<span");r.writeAttribute("id",s+"-Title");r.addClass("sapUiCalendarRowAppsIntHeadTitle");r.writeClasses();r.write(">");r.writeEscaped(p,true);r.write("</span>");}var q=i.appointment.getText();if(q){r.write("<span");r.writeAttribute("id",s+"-Text");r.addClass("sapUiCalendarRowAppsIntHeadText");r.writeClasses();r.write(">");r.writeEscaped(q,true);r.write("</span>");}if(A.appTimeUnitsDifRowEnd>0){r.writeIcon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null});}r.write("</div>");r.write("</div>");};f.renderAppointment=function(r,R,A,t,g){var o=A.appointment;var T=o.getTooltip_AsString();var s=o.getType();var h=o.getColor();var i=o.getTitle();var j=o.getProperty("description");var k=o.getText();var m=o.getIcon();var n=o.getId();var p=R._getAppointmentReducedHeight(A);var q={labelledby:{value:I.getStaticId("sap.ui.unified","APPOINTMENT")+" "+n+"-Descr",append:true},selected:null};var u=R._getAppointmentRowCount(A,p);var v=R.getAriaLabelledBy();var w=R._calculateAppoitnmentVisualCue(o);if(v.length>0){q["labelledby"].value=q["labelledby"].value+" "+v.join(" ");}if(i){q["labelledby"].value=q["labelledby"].value+" "+n+"-Title";}if(k){q["labelledby"].value=q["labelledby"].value+" "+n+"-Text";}r.write("<div");r.writeElementData(o);r.addClass("sapUiCalendarApp");r.addClass("sapUiCalendarAppHeight"+u);if(o.getSelected()){r.addClass("sapUiCalendarAppSel");q["labelledby"].value=q["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");}if(o.getTentative()){r.addClass("sapUiCalendarAppTent");q["labelledby"].value=q["labelledby"].value+" "+I.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE");}if(u===1){r.addClass("sapUiCalendarAppTitleOnly");}if(m){r.addClass("sapUiCalendarAppWithIcon");}if(!g){if(R._bRTL){r.addStyle("right",A.begin+"%");r.addStyle("left",A.end+"%");}else{r.addStyle("left",A.begin+"%");r.addStyle("right",A.end+"%");}}r.writeAttribute("data-sap-level",A.level);if(R._sFocusedAppointmentId==n){r.writeAttribute("tabindex","0");}else{r.writeAttribute("tabindex","-1");}if(T){r.writeAttributeEscaped("title",T);}if(!h&&s&&s!=b.None){r.addClass("sapUiCalendarApp"+s);}if(h){if(R._bRTL){r.addStyle("border-right-color",h);}else{r.addStyle("border-left-color",h);}}r.writeAccessibilityState(o,q);r.writeClasses();r.writeStyles();r.write(">");r.write("<div");r.addClass("sapUiCalendarAppCont");if(h&&R.getAppointmentsVisualization()===d.Filled){r.addStyle("background-color",o._getCSSColorForBackground(h));r.writeStyles();}r.writeClasses();r.write(">");if(w.appTimeUnitsDifRowStart>0){r.writeIcon("sap-icon://arrow-left",["sapUiCalendarAppArrowIconLeft"],{title:null});}if(m){var x=["sapUiCalendarAppIcon"];var y={};y["id"]=n+"-Icon";y["title"]=null;r.writeIcon(m,x,y);}r.write("<div");r.addClass("sapUiCalendarAppTitleWrapper");r.writeClasses();r.write(">");if(i){r.write("<span");r.writeAttribute("id",n+"-Title");r.addClass("sapUiCalendarAppTitle");r.writeClasses();r.write(">");r.writeEscaped(i,true);r.write("</span>");}if(k&&A.size!==e.HalfSize){r.write("<span");r.writeAttribute("id",n+"-Text");r.addClass("sapUiCalendarAppText");r.writeClasses();r.write(">");r.writeEscaped(k,true);r.write("</span>");}if(j&&A.size!==e.HalfSize&&(A.size!==e.Regular||!k)){r.write("<span");r.writeAttribute("id",n+"-Info");r.addClass("sapUiCalendarAppDescription");r.writeClasses();r.write(">");r.writeEscaped(j,true);r.write("</span>");}r.write("</div>");if(w.appTimeUnitsDifRowEnd>0){r.writeIcon("sap-icon://arrow-right",["sapUiCalendarAppArrowIconRight"],{title:null});}var z=R._oRb.getText("CALENDAR_START_TIME")+": "+R._oFormatAria.format(o.getStartDate());z=z+"; "+R._oRb.getText("CALENDAR_END_TIME")+": "+R._oFormatAria.format(o.getEndDate());if(s&&s!=b.None){z=z+"; "+this.getAriaTextForType(s,t);}r.write("<span id=\""+n+"-Descr\" class=\"sapUiInvisibleText\">"+z+"</span>");r.write("</div>");this.renderResizeHandle(r,R,o);r.write("</div>");};f.renderSingleDayInterval=function(r,R,A,t,g,n,s,N,h,S,k,F,m){var o=1,w=100,p=R.getId()+"-AppsInt"+o,i,q=R.getShowIntervalHeaders()&&(R.getShowEmptyIntervalHeaders()||g.length>0),u=R.getStartDate(),M=u.getMonth(),v=new Date(u.getFullYear(),M+1,0).getDate(),x,P=R._getPlanningCalendar(),y=A.concat(R.getIntervalHeaders().filter(function(K){var O=K.getStartDate().getTime(),Q=K.getEndDate().getTime(),T=u.getTime(),V=T+1000*60*60*24;return!(O>=V||Q<=T);}).map(function(K){return{appointment:K,isHeader:true};})).sort(C._getComparer(u)),z,B=[];if(P){B=P._getSelectedDates();}r.write("<div id=\""+p+"\"");r.addClass("sapUiCalendarRowAppsInt");r.addClass("sapUiCalendarMonthRowAppsS");r.addStyle("width",w+"%");if(o>=v&&R.getIntervalType()===c.OneMonth){r.addClass("sapUiCalItemOtherMonth");}for(i=0;i<n.length;i++){if((o+s)%N==n[i]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}if(!q){r.addClass("sapUiCalendarRowAppsIntNoHead");}if(F){r.addClass("sapUiCalendarRowAppsIntFirst");}if(m){r.addClass("sapUiCalendarRowAppsIntLast");}r.writeClasses();r.writeStyles();r.write(">");if(q){r.write("<div");r.addClass("sapUiCalendarRowAppsIntHead");r.writeClasses();r.write(">");r.write("</div>");}if(B.length>0){for(i=0;i<y.length;i++){z=y[i];r.write("<div class=\"sapUiCalendarAppContainer\">");r.write("<div class=\"sapUiCalendarAppContainerLeft\">");r.write("<div>"+z.appointment._getDateRangeIntersectionText(u)+"</div>");r.write("</div>");r.write("<div class=\"sapUiCalendarAppContainerRight\">");if(z.isHeader){this.renderIntervalHeader(r,R,z);}else{this.renderAppointment(r,R,z,t,true);}r.write("</div>");r.write("</div>");}}if(A.length===0||B.length===0){r.write("<div class=\"sapUiCalendarNoApps\">");x=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("PLANNINGCALENDAR_ROW_NO_APPOINTMENTS");r.write(x);r.write("</div>");}r.write("<div id=\""+R.getId()+"-Now\" class=\"sapUiCalendarRowNow\"></div>");r.write("<div id=\""+R.getId()+"-DummyApp\" class=\"sapUiCalendarApp sapUiCalendarAppTitleOnly sapUiCalendarAppDummy\" style='margin:0; height:0px;'></div>");if(R.getShowSubIntervals()){var E=R.getIntervalType();var G=0;switch(E){case c.Hour:G=4;break;case c.Day:case c.Week:case c.OneMonth:G=24;break;case c.Month:var H=new U(u);H.setUTCMonth(H.getUTCMonth()+o+1,0);G=H.getUTCDate();H.setUTCDate(1);s=H.getUTCDay();break;default:break;}var J=100/G;for(i=0;i<G;i++){r.write("<div");r.addClass("sapUiCalendarRowAppsSubInt");r.addStyle("width",J+"%");for(var j=0;j<h.length;j++){if((i+S)%k==h[j]){r.addClass("sapUiCalendarRowAppsNoWork");break;}}r.writeStyles();r.writeClasses();r.write(">");r.write("</div>");}}r.write("</div>");};f.getLegendItems=function(o){var r=[],g,s=o.getLegend();if(s){g=sap.ui.getCore().byId(s);if(g){r=g.getItems();}else{L.error("CalendarLegend with id '"+s+"' does not exist!",o);}}return r;};f.getAriaTextForType=function(t,g){var T,s,o,i;if(g&&g.length){for(var i=0;i<g.length;i++){o=g[i];if(o.getType()===t){T=o.getText();break;}}}if(!T){s=a.getTypeAriaText(t);if(s){T=s.getText();}}return T;};return f;},true);