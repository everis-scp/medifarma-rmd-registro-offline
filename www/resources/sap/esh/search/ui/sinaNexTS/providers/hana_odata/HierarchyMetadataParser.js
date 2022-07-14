/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports"],function(r,e){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.HierarchyMetadataParser=void 0;var H=(function(){function H(q){this.jQuery=q;}H.prototype.parse=function(h){var t=this;var a={};t.jQuery(h).find("Collection").each(function(){t.jQuery(this).find("Record").each(function(){var b=t.parseRecord(this);a[b.name]=b;});});return a;};H.prototype.parseRecord=function(a){var h={name:"",parentAttributeName:"",childAttributeName:""};var t=this;t.jQuery(a).find(">PropertyValue").each(function(){switch(t.jQuery(this).attr("Property")){case"Name":h.name=t.jQuery(this).attr("String");break;case"Recurse":Object.assign(h,t.parseRecurse(this));}});return h;};H.prototype.parseRecurse=function(a){var t=this;var b={parentAttributeName:"",childAttributeName:""};t.jQuery(a).find(">PropertyValue").each(function(){switch(t.jQuery(this).attr("Property")){case"Parent":t.jQuery(this).find("Collection").each(function(){b.parentAttributeName=t.parseCollection(this);});break;case"Child":t.jQuery(this).find(">Collection").each(function(){b.childAttributeName=t.parseCollection(this);});}});return b;};H.prototype.parseCollection=function(c){var t=this;var a;t.jQuery(c).find(">PropertyPath").each(function(){a=t.jQuery(this).text();});return a;};return H;}());e.HierarchyMetadataParser=H;});})();
