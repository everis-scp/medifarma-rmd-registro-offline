/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./MacroMetadata"],function(M){"use strict";var F=M.extend("sap.fe.macros.FilterField",{name:"FilterField",namespace:"sap.fe.macros",fragment:"sap.fe.macros.FilterField",metadata:{stereotype:"xmlmacro",designtime:"sap/fe/macros/FilterField.designtime",properties:{idPrefix:{type:"string",defaultValue:"FilterField"},vhIdPrefix:{type:"string",defaultValue:"FilterFieldValueHelp"},entityType:{type:"sap.ui.model.Context",required:true,$kind:"EntityType"},property:{type:"sap.ui.model.Context",required:true,$kind:"Property"},_valueList:{type:"sap.ui.model.Context",required:false},useSemanticDateRange:{type:"boolean",defaultValue:true},settings:{type:"string",defaultValue:""},navigationPrefix:{type:"string"},visualFilter:{type:"sap.ui.model.Context"},_visualFilter:{type:"boolean"}},events:{}},create:function(p,c,s){if(!p.bHasVisualFilter){p.bHasVisualFilter=p.visualFilter&&p.visualFilter.getObject()?true:false;}return p;}});return F;});
