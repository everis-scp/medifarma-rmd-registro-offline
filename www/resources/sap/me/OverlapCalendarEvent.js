/*!
 * SAPUI5

        (c) Copyright 2009-2019 SAP SE. All rights reserved
    
 */
sap.ui.define(['./library','sap/ui/core/Element'],function(l,E){"use strict";var O=E.extend("sap.me.OverlapCalendarEvent",{metadata:{library:"sap.me",properties:{startDay:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},endDay:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},relevant:{type:"boolean",group:"Misc",defaultValue:null,bindable:"bindable"},type:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},typeName:{type:"string",group:"Appearance",defaultValue:null,bindable:"bindable"},halfDay:{type:"boolean",group:"Data",defaultValue:false,bindable:"bindable"},row:{type:"int",group:"Data",defaultValue:-1,bindable:"bindable"},name:{type:"string",group:"Misc",defaultValue:null,bindable:"bindable"}}}});return O;});
