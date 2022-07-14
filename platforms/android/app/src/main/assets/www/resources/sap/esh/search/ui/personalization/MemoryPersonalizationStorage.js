/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/personalization/Personalizer"],function(P){"use strict";var m=function(){this.init.apply(this,arguments);};var M=m;m.prototype={init:function(){this.dataMap={};},saveNotDelayed:function(){return jQuery.when();},save:function(){},getItem:function(k){if(!this._isStorageSupported()){throw"not supported storage";}return this._getStorage(k);},setItem:function(k,d){if(!this._isStorageSupported()){throw"not supported storage";}this._putStorage(k,d);},getPersonalizer:function(k){return new P(k,this);},_isStorageSupported:function(){return true;},_getStorage:function(k){return this.dataMap[k];},_putStorage:function(k,s){this.dataMap[k]=s;},};m.create=function(){return new jQuery.Deferred().resolve(new M());};return m;});
