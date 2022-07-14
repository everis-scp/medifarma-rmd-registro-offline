/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./FEBuilder","sap/ui/test/OpaBuilder","sap/fe/test/Utils"],function(F,O,U){"use strict";var K=function(){return F.apply(this,arguments);};K.create=function(o){return new K(o);};K.prototype=Object.create(F.prototype);K.prototype.constructor=K;K.prototype.checkKPI=function(k,o){var t={text:k};if(o&&o.status){t.status=o.status;}var r=this.hasType("sap.m.GenericTag").hasProperties(t);if(o&&(o.number||o.unit)){var n={};if(o.number){n.number=o.number;}if(o.unit){n.unit=o.unit;}r=r.hasChildren(F.create(this).hasType("sap.m.ObjectNumber").hasProperties(n));}return r;};return K;});
