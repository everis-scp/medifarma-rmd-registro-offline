/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";return sap.ui.core.Control.extend("sap.esh.search.ui.controls.SearchResultListContainer",{init:function(){this.data("sap-ui-fastnavgroup","true",true);},metadata:{aggregations:{filterBar:{type:"sap.ui.core.Control",multiple:false,},centerArea:{singularName:"content",},totalCountBar:{type:"sap.ui.core.Control",multiple:false,},didYouMeanBar:{type:"sap.ui.core.Control",multiple:false,},noResultScreen:{type:"sap.ui.core.Control",multiple:false,},totalCountHiddenElement:{type:"sap.ui.core.InvisibleText",multiple:false,},},},renderer:function(r,c){r.write("<div");r.writeControlData(c);r.addClass("sapUshellSearchResultListsContainer");r.addClass("sapUiResponsiveMargin");if(c.getModel()&&c.getModel().getFacetVisibility()===true){if(c.getModel().config.layoutWithoutPage){if(c.getModel().getProperty("/errors/length")>0){r.addClass("sapElisaSearchPageFloorplanWithMessageToolbarFacetPanelOpen");}else{r.addClass("sapElisaSearchPageFloorplanFacetPanelOpen");}}else{if(c.getModel().getProperty("/errors/length")>0){r.addClass("sapUshellSearchFacetPanelOpen");}else{r.addClass("sapUshellSearchFacetPanelOpen");}}}r.writeClasses();r.write(">");r.renderControl(c.getNoResultScreen());r.renderControl(c.getDidYouMeanBar());r.write('<div class="sapUshellSearchTotalCountBar">');r.renderControl(c.getTotalCountBar());r.write("</div>");for(var i=0;i<c.getCenterArea().length;i++){r.renderControl(c.getCenterArea()[i]);}r.renderControl(c.getTotalCountHiddenElement());r.write("</div>");},});});
