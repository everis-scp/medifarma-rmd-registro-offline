/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ChangeReason','./Filter','./FilterType','./ListBinding','./FilterProcessor','./Sorter','./SorterProcessor',"sap/base/util/each"],function(C,F,a,L,b,S,c,e){"use strict";var d=L.extend("sap.ui.model.ClientListBinding",{constructor:function(m,p,o,s,f,P){L.apply(this,arguments);this.mNormalizeCache={};this.oModel.checkFilterOperation(this.aApplicationFilters);this.oCombinedFilter=b.combineFilters(this.aFilters,this.aApplicationFilters);this.bIgnoreSuspend=false;this.update();},metadata:{publicMethods:["getLength"]}});d.prototype._getContexts=function(s,l){if(!s){s=0;}if(!l){l=Math.min(this.iLength,this.oModel.iSizeLimit);}var E=Math.min(s+l,this.aIndices.length),o,f=[],p=this.oModel.resolve(this.sPath,this.oContext);if(p&&!p.endsWith("/")){p+="/";}for(var i=s;i<E;i++){o=this.oModel.getContext(p+this.aIndices[i]);f.push(o);}return f;};d.prototype.setContext=function(o){if(this.oContext!=o){this.oContext=o;if(this.isRelative()){this.update();this._fireChange({reason:C.Context});}}};d.prototype.getLength=function(){return this.iLength;};d.prototype._getLength=function(){return this.aIndices.length;};d.prototype.updateIndices=function(){this.aIndices=[];for(var i=0;i<this.oList.length;i++){this.aIndices.push(i);}};d.prototype.sort=function(s){if(this.bSuspended){this.checkUpdate(true);}if(!s){this.aSorters=null;this.updateIndices();this.applyFilter();}else{if(s instanceof S){s=[s];}this.aSorters=s;this.applySort();}this.bIgnoreSuspend=true;this._fireChange({reason:C.Sort});this._fireSort({sorter:s});this.bIgnoreSuspend=false;return this;};d.prototype.applySort=function(){var t=this;if(!this.aSorters||this.aSorters.length==0){return;}this.aIndices=c.apply(this.aIndices,this.aSorters,function(r,p){return t.oModel.getProperty(p,t.oList[r]);});};d.prototype.filter=function(f,s){this.oModel.checkFilterOperation(f);if(this.bSuspended){this.checkUpdate(true);}this.updateIndices();if(f instanceof F){f=[f];}if(s==a.Application){this.aApplicationFilters=f||[];}else if(s==a.Control){this.aFilters=f||[];}else{this.aFilters=f||[];this.aApplicationFilters=[];}this.oCombinedFilter=b.combineFilters(this.aFilters,this.aApplicationFilters);if(this.aFilters.length===0&&this.aApplicationFilters.length===0){this.iLength=this._getLength();}else{this.applyFilter();}this.applySort();this.bIgnoreSuspend=true;this._fireChange({reason:C.Filter});if(s==a.Application){this._fireFilter({filters:this.aApplicationFilters});}else{this._fireFilter({filters:this.aFilters});}this.bIgnoreSuspend=false;return this;};d.prototype.applyFilter=function(){var t=this;this.aIndices=b.apply(this.aIndices,this.oCombinedFilter,function(r,p){return t.oModel.getProperty(p,t.oList[r]);},this.mNormalizeCache);this.iLength=this.aIndices.length;};d.prototype.getDistinctValues=function(p){var r=[],m={},v,t=this;e(this.oList,function(i,o){v=t.oModel.getProperty(p,o);if(!m[v]){m[v]=true;r.push(v);}});return r;};return d;});
