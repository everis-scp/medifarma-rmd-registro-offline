/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/SearchHelper","sap/m/Button","sap/ui/core/IconPool"],function(S,B,I){"use strict";B.extend("sap.esh.search.ui.controls.SearchButton",{constructor:function(i,o){o=jQuery.extend({},{icon:I.getIconURI("search"),tooltip:sap.esh.search.ui.resources.i18n.getText("search"),enabled:{parts:[{path:"/initializingObjSearch",},],formatter:function(a){return!S.isSearchAppActive()||!a;},},},o);B.prototype.constructor.apply(this,[i,o]);this.addStyleClass("searchBtn");},renderer:"sap.m.ButtonRenderer",});});
