/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/model/Context"],function(B){"use strict";var C=B.extend("sap.ui.model.odata.v2.Context",{constructor:function(m,p,d){B.call(this,m,p);this.bCreated=false;this.sDeepPath=d||p;this.bForceRefresh=false;this.bPreliminary=false;this.bUpdated=false;}});C.prototype.getDeepPath=function(){return this.sDeepPath;};C.prototype.hasChanged=function(){return this.bUpdated||this.bForceRefresh;};C.prototype.isPreliminary=function(){return this.bPreliminary;};C.prototype.isRefreshForced=function(){return this.bForceRefresh;};C.prototype.isUpdated=function(){return this.bUpdated;};C.prototype.setDeepPath=function(d){this.sDeepPath=d;};C.prototype.setForceRefresh=function(f){this.bForceRefresh=f;};C.prototype.setPreliminary=function(p){this.bPreliminary=p;};C.prototype.setUpdated=function(u){this.bUpdated=u;};return C;},false);
