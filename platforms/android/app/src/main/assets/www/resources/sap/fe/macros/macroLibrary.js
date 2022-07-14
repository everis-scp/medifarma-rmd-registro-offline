/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/util/XMLPreprocessor","sap/fe/macros/PhantomUtil","./Chart.metadata","./Field.metadata","./internal/Field.metadata","./FilterField.metadata","./FilterBar.metadata","./Form.metadata","./FormContainer.metadata","./MicroChart.metadata","./Table.metadata","./ValueHelp.metadata","./valuehelp/ValueHelpFilterBar.metadata","./Contact.metadata","./QuickViewForm.metadata","./VisualFilter.metadata","./DraftIndicator.metadata","./internal/DataPoint.metadata","./FormElement.metadata","./FlexibleColumnLayoutActions.metadata","./Share.metadata","./KPITag.metadata"],function(X,P,C,F,I,a,b,c,d,M,T,V,e,f,Q,g,D,h,i,j,S,K){"use strict";var n="sap.fe.macros",k=[T,c,d,F,I,b,a,C,V,e,M,f,Q,g,D,h,i,j,S,K].map(function(E){if(typeof E==="string"){return{name:E,namespace:n,metadata:{metadataContexts:{},properties:{},events:{}}};}return E;});function r(){k.forEach(function(E){P.register(E);});}function l(){k.forEach(function(E){X.plugIn(null,E.namespace,E.name);});}r();return{register:r,deregister:l};});
