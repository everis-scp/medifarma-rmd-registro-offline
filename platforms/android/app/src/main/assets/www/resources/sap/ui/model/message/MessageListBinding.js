/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/strings/hash","sap/base/util/deepEqual","sap/base/util/deepExtend","sap/base/util/each","sap/ui/model/ChangeReason","sap/ui/model/ClientListBinding"],function(h,d,a,e,C,b){"use strict";var M=b.extend("sap.ui.model.message.MessageListBinding");M.prototype.enableExtendedChangeDetection=function(){b.prototype.enableExtendedChangeDetection.apply(this,arguments);this.oExtendedChangeDetectionConfig=this.oExtendedChangeDetectionConfig||{};this.oExtendedChangeDetectionConfig.symbol=function(c){if(typeof c!=="string"){return this.getContextData(c);}return h(c);}.bind(this);};M.prototype.getContexts=function(s,l){this.iLastStartIndex=s;this.iLastLength=l;if(!s){s=0;}if(!l){l=Math.min(this.iLength,this.oModel.iSizeLimit);}var c=this._getContexts(s,l),f=[];if(this.bUseExtendedChangeDetection){for(var i=0;i<c.length;i++){f.push(this.getContextData(c[i]));}if(this.aLastContexts&&s<this.iLastEndIndex){c.diff=this.diffData(this.aLastContextData,c);}this.iLastEndIndex=s+l;this.aLastContexts=c.slice(0);this.aLastContextData=f.slice(0);}return c;};M.prototype.getEntryData=function(c){var o=c.getObject();var p=o.processor;delete o.processor;var j=JSON.stringify(o);o.processor=p;return j;};M.prototype.update=function(){var l=this.oModel._getObject(this.sPath,this.oContext);if(Array.isArray(l)){if(this.bUseExtendedChangeDetection){this.oList=a([],l);}else{this.oList=l.slice(0);}this.updateIndices();this.applyFilter();this.applySort();this.iLength=this._getLength();}else{this.oList=[];this.aIndices=[];this.iLength=0;}};M.prototype.checkUpdate=function(f){if(this.bSuspended&&!this.bIgnoreSuspend){return;}if(!this.bUseExtendedChangeDetection){var l=this.oModel._getObject(this.sPath,this.oContext);if(!d(this.oList,l)||f){this.update();this._fireChange({reason:C.Change});}}else{var c=false;var t=this;var l=this.oModel._getObject(this.sPath,this.oContext);if(!d(this.oList,l)){this.update();}var g=this._getContexts(this.iLastStartIndex,this.iLastLength);if(this.aLastContexts){if(this.aLastContexts.length!=g.length){c=true;}else{e(this.aLastContextData,function(i,L){if(t.getContextData(g[i])!==L){c=true;return false;}});}}else{c=true;}if(c||f){this._fireChange({reason:C.Change});}}};return M;});
