/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/fieldExtensibility/ABAPAccess","sap/ui/fl/write/_internal/fieldExtensibility/cap/CAPAccess","sap/base/util/UriParameters"],function(A,C,U){"use strict";var F={};var _;function g(){if(!_){var u=U.fromQuery(window.location.search);if(u.get("sap-ui-fl-xx-capScenario")==="true"){_=C;}else{_=A;}}return _;}function c(){var a=Array.from(arguments);var f=a.shift();var i=g();return Promise.resolve(i[f].apply(null,a));}F.onControlSelected=function(o){return c("onControlSelected",o);};F.isExtensibilityEnabled=function(o){return c("isExtensibilityEnabled",o);};F.isServiceOutdated=function(s){return c("isServiceOutdated",s);};F.setServiceValid=function(s){return c("setServiceValid",s);};F.getTexts=function(){return c("getTexts");};F.getExtensionData=function(){return c("getExtensionData");};F.onTriggerCreateExtensionData=function(e,r){return c("onTriggerCreateExtensionData",e,r);};F._resetCurrentScenario=function(){_=null;};return F;});
