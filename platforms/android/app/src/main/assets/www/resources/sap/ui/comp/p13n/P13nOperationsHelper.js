/*
 * ! SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/m/P13nOperationsHelper","sap/m/library"],function(P,l){"use strict";var O=l.P13nConditionOperation;var e="Not";var a=function(){P.apply(this,arguments);this.init();this.oIncludeOperations.numcFiscal=[O.EQ,O.BT,O.LT,O.LE,O.GT,O.GE];};a.prototype=Object.create(P.prototype);a.prototype.oIncludeOperationsOptinal={"optinal":[O.Empty]};a.prototype.oExcludeOperationsDefault={"default":[O.NotEQ]};a.prototype.oExcludeOperationsExtended={"default":[O.NotEQ,O.NotBT,O.NotLT,O.NotLE,O.NotGT,O.NotGE],"string":[O.NotContains,O.NotEQ,O.NotBT,O.NotStartsWith,O.NotEndsWith,O.NotLT,O.NotLE,O.NotGT,O.NotGE],"date":[O.NotEQ,O.NotBT,O.NotLT,O.NotLE,O.NotGT,O.NotGE],"time":[O.NotEQ,O.NotBT,O.NotLT,O.NotLE,O.NotGT,O.NotGE],"datetime":[O.NotEQ,O.NotBT,O.NotLT,O.NotLE,O.NotGT,O.NotGE],"numeric":[O.NotEQ,O.NotBT,O.NotLT,O.NotLE,O.NotGT,O.NotGE],"numc":[O.NotContains,O.NotEQ,O.NotBT,O.NotEndsWith,O.NotLT,O.NotLE,O.NotGT,O.NotGE],"numcFiscal":[O.NotEQ,O.NotBT,O.NotLT,O.NotLE,O.NotGT,O.NotGE],"boolean":[O.NotEQ]};a.prototype.oExcludeOperationsOptional={"optinal":[O.NotEmpty]};a.prototype.isExcludeType=function(o){return c(o,this.oExcludeOperationsExtended)||c(o,this.oExcludeOperationsOptional);};a.prototype.getCorrespondingExcludeOperation=function(o){return e+o;};a.prototype.getCorrespondingIncludeOperation=function(o){return o.slice(e.length);};function c(s,o){var i,t,b,d,r=false;for(t in o){b=o[t];for(i=0;i<b.length;i++){d=b[i];if(d===s){r=true;break;}}if(r){break;}}return r;}return a;},true);
