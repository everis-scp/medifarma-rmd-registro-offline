/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./DialogAPI","sap/fe/test/Utils"],function(D,U){"use strict";var a=function(d,v,c){return D.call(this,d,v,c);};a.prototype=Object.create(D.prototype);a.prototype.constructor=a;a.prototype.isAction=false;a.prototype.iCheckState=function(d){return this.prepareResult(this.getBuilder().hasState(d).description(U.formatMessage("Checking dialog '{0}' in state '{1}'",this.getIdentifier(),d)).execute());};a.prototype.iCheckConfirm=function(b){return this.prepareResult(this.getBuilder().hasFooterButton(this._getConfirmButtonMatcher(),b).description(U.formatMessage("Checking dialog '{0}' having confirmation button with state '{1}'",this.getIdentifier(),b)).execute());};a.prototype.iCheckCancel=function(b){return this.prepareResult(this.getBuilder().hasFooterButton(this._getCancelButtonMatcher(),b).description(U.formatMessage("Checking dialog '{0}' having cancellation button with state '{1}'",this.getIdentifier(),b)).execute());};return a;});
