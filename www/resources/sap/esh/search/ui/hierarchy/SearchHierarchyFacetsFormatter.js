/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["./SearchHierarchyFacet"],function(S){"use strict";var m=function(){this.init.apply(this,arguments);this.testCounter=0;this.facetMap={};};m.prototype={init:function(a){this.model=a;},getFacetAttributes:function(r){var f=[];for(var i=0;i<r.facets.length;++i){var a=r.facets[i];if(a.type!==r.sina.FacetType.Hierarchy){continue;}if(!a.node){continue;}var b=a.query.attributeId;if(f.indexOf(b)>=0){continue;}f.push(b);}var c=r.query.filter.rootCondition.collectAttributes();for(var j=0;j<c.length;++j){var d=c[j];var e=r.query.filter.dataSource.getAttributeMetadata(d);if(!e.isHierarchy){continue;}if(f.indexOf(d)>=0){continue;}f.push(d);}return f;},getFacetFromResultSet:function(r,a){for(var i=0;i<r.facets.length;++i){var f=r.facets[i];if(a===f.query.attributeId){return f;}}},getFacet:function(r,s,a){var b=r.query.filter.dataSource.getAttributeMetadata(a);var f=this.facetMap[a];if(!f){f=new S({model:s,sina:r.sina,attributeId:a,title:b.label,dataSource:r.query.filter.dataSource,filter:r.query.filter,});this.facetMap[a]=f;}f.filter=r.query.filter;var c=r.query.filter.rootCondition.containsAttribute(a);var h=f.node&&f.node.hasExpandedChildNode();var d;if(c||h){d=f.updateFromServer();}else{var e=this.getFacetFromResultSet(r,a);d=f.updateFromResultSet(e);}d=d.then(function(f){f.mixinFilterNodes();return f;});return d;},getFacets:function(r,s){var f=this.getFacetAttributes(r);var a=[];for(var i=0;i<f.length;++i){var b=f[i];var c=this.getFacet(r,s,b);a.push(c);}return jQuery.when.apply(jQuery,a).then(function(){return Array.from(arguments);});},handleDataSourceChanged:function(){this.facetMap={};},};return m;});
