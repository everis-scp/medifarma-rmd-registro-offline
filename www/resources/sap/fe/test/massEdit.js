/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define([],function(){"use strict";var M={handleMassEditChange:function(s,v,V){var d=s&&s.getParent().getParent().getParent();var f=d&&d.getModel("fieldsInfo").getData();var D={keyValue:s.getId().substring(s.getId().lastIndexOf(":")+1),value:v};if(!v&&V){s.setValueState("Error");s.setValueStateText("Please enter a value");D={control:s,valueState:"Error",valueStateText:"Please enter a value",validationError:true};}else{s.setValueState("None");s.setValueStateText(null);}f.results.push(D);}};return M;},true);
