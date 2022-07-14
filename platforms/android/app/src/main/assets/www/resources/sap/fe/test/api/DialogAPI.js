/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./BaseAPI","sap/fe/test/Utils","sap/fe/test/builder/DialogBuilder"],function(B,U,D){"use strict";var a=function(d,v,c){if(!U.isOfType(d,D)){throw new Error("oDialogBuilder parameter must be a DialogBuilder instance");}this._iConfirmButtonIndex=c||0;return B.call(this,d,v);};a.prototype=Object.create(B.prototype);a.prototype.constructor=a;a.prototype._getConfirmButtonMatcher=function(){var c=this._iConfirmButtonIndex;return function(b){var d=b.getParent().getButtons();return d.indexOf(b)===Math.min(d.length-1,c);};};a.prototype._getCancelButtonMatcher=function(){var c=this._iConfirmButtonIndex;return function(b){var d=b.getParent().getButtons();return d.indexOf(b)===Math.min(d.length-1,c+1);};};return a;});
