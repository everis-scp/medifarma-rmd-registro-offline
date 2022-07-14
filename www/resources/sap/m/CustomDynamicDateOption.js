/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/DynamicDateOption'],function(D){"use strict";var C=D.extend("sap.m.CustomDynamicDateOption",{metadata:{library:"sap.m",properties:{getText:{type:"function"},getValueHelpUITypes:{type:"function"},createValueHelpUI:{type:"function"},getValueHelpOutput:{type:"function"},getGroup:{type:"function"},getGroupHeader:{type:"function"},format:{type:"function"},parse:{type:"function"},toDates:{type:"function"},enhanceFormattedValue:{type:"function"}}}});function c(s){return s.charAt(0).toUpperCase()+s.slice(1);}["getText","getValueHelpUITypes","createValueHelpUI","getValueHelpOutput","getGroup","getGroupHeader","format","parse","toDates","enhanceFormattedValue"].forEach(function(f){C.prototype[f]=function(){var g="get"+c(f);var a=this[g]();return a?a.apply(this,arguments):D.prototype[f].apply(this,arguments);};});return C;});
