/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Element','./library','sap/ui/unified/library'],function(E,l,u){"use strict";var C=u.CalendarIntervalType;var a=u.CalendarAppointmentHeight;var P=E.extend("sap.m.PlanningCalendarView",{metadata:{library:"sap.m",properties:{key:{type:"string",group:"Data",defaultValue:null},intervalType:{type:"sap.ui.unified.CalendarIntervalType",group:"Appearance",defaultValue:C.Hour},description:{type:"string",group:"Data"},intervalsS:{type:"int",group:"Appearance",defaultValue:6},intervalsM:{type:"int",group:"Appearance",defaultValue:8},intervalsL:{type:"int",group:"Appearance",defaultValue:12},showSubIntervals:{type:"boolean",group:"Appearance",defaultValue:false},appointmentHeight:{type:"string",group:"Appearance",defaultValue:a.Regular,visibility:"hidden"}}}});return P;});
