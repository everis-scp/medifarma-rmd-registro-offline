/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var _=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function a(){this.constructor=d;}d.prototype=b===null?Object.create(b):(a.prototype=b.prototype,new a());};})();sap.ui.define(["require","exports","./SinaObject","./DataSourceType","../core/errors"],function(r,e,S,D,a){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.DataSource=void 0;var b=(function(c){_(b,c);function b(p){var d,f,g,h,i,j,k,l,m,n,o;var q=c.call(this,{sina:p.sina})||this;q.hidden=false;q.usage={};q.attributesMetadata=[];q.attributeMetadataMap={};q.attributeGroupsMetadata=[];q.attributeGroupMetadataMap={};q.annotations=(d=p.annotations)!==null&&d!==void 0?d:q.annotations;q.type=(f=p.type)!==null&&f!==void 0?f:q.type;q.subType=p.subType;q.id=(g=p.id)!==null&&g!==void 0?g:q.id;q.label=(h=p.label)!==null&&h!==void 0?h:q.label;q.labelPlural=(i=p.labelPlural)!==null&&i!==void 0?i:q.labelPlural;q.icon=p.icon;q.hidden=(j=p.hidden)!==null&&j!==void 0?j:q.hidden;q.usage=(k=p.usage)!==null&&k!==void 0?k:q.usage;q.attributesMetadata=(l=p.attributesMetadata)!==null&&l!==void 0?l:q.attributesMetadata;q.attributeMetadataMap=(m=p.attributeMetadataMap)!==null&&m!==void 0?m:q.attributeMetadataMap;q.attributeGroupsMetadata=(n=p.attributeGroupsMetadata)!==null&&n!==void 0?n:q.attributeGroupsMetadata;q.attributeGroupMetadataMap=(o=p.attributeGroupMetadataMap)!==null&&o!==void 0?o:q.attributeGroupMetadataMap;if(!q.labelPlural||q.labelPlural.length===0){q.labelPlural=q.label;}if(q.type===D.DataSourceType.BusinessObject&&q.attributesMetadata.length===0){}q.attributeMetadataMap=q.createAttributeMetadataMap(q.attributesMetadata);return q;}b.getAllDataSource=function(){return new b({id:"All",label:"All",type:D.DataSourceType.Category,});};b.prototype._configure=function(){var f=this.sina.metadataFormatters;if(!f){return;}for(var i=0;i<f.length;++i){var d=f[i];d.format({dataSources:[this],});}};b.prototype.createAttributeMetadataMap=function(d){if(d===void 0){d=[];}var m={};for(var i=0;i<d.length;++i){var f=d[i];m[f.id]=f;}return m;};b.prototype.getAttributeMetadata=function(i){if(typeof this.attributeMetadataMap[i]==="undefined"){throw new a.DataSourceAttributeMetadataNotFoundError("Could not find metadata for attribute "+i+" in data source "+this.id+". ");}return this.attributeMetadataMap[i];};b.prototype.toJson=function(){return{type:this.type,id:this.id,label:this.label,labelPlural:this.labelPlural,};};return b;}(S.SinaObject));e.DataSource=b;});})();