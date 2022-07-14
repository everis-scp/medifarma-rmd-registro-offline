/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./DialogAPI","sap/fe/test/Utils","sap/ui/test/OpaBuilder"],function(D,U,O){"use strict";var a=function(d,v,c){return D.call(this,d,v,c);};a.prototype=Object.create(D.prototype);a.prototype.constructor=a;a.prototype.isAction=true;a.prototype.iConfirm=function(){return this.prepareResult(this.getBuilder().doPressFooterButton(this._getConfirmButtonMatcher()).description(U.formatMessage("Confirming dialog '{0}'",this.getIdentifier())).execute());};a.prototype.iCancel=function(){return this.prepareResult(this.getBuilder().doPressFooterButton(this._getCancelButtonMatcher()).description(U.formatMessage("Cancelling dialog '{0}'",this.getIdentifier())).execute());};a.prototype.iClose=function(){return this.prepareResult(this.getBuilder().doPressKeyboardShortcut("Escape").description(U.formatMessage("Closing dialog '{0}'",this.getIdentifier())).execute());};return a;});
