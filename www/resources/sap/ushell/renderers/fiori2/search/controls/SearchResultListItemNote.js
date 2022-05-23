// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(['sap/ushell/renderers/fiori2/search/controls/SearchResultListItem','sap/ushell/renderers/fiori2/search/controls/SearchText','sap/ushell/renderers/fiori2/search/SearchHelper'],function(S,a,b){"use strict";var n='\u2013';return S.extend("sap.ushell.renderers.fiori2.search.controls.SearchResultListItemNote",{renderer:function(r,c){c._renderer(r);},_renderContentContainer:function(r){r.write('<div class="sapUshellSearchResultListItem-Content">');this._renderTitleContainer(r);this._renderAttributesContainer(r);r.write('</div>');},_renderTitleContainer:function(r){var t=this;r.write('<div class="sapUshellSearchResultListItem-TitleAndImageContainer">');r.write('<div class="sapUshellSearchResultListItem-TitleContainer">');t._renderCheckbox(r);var c=t.getTitleUrl();var d=t.getAggregation("_titleLink");d.setHref(c);d.setText(t.getTitle());if(c.length===0){d.setEnabled(false);}r.renderControl(d);var e=t.getAggregation("_typeText");e.setText(t.getType());r.renderControl(e);r.write('</div>');t._renderImageForPhone(r);r.write('</div>');},_renderAttributesContainer:function(r){var t=this;r.write('<div class="sapUshellSearchResultListItemDoc-AttributesExpandContainer');var e=t.getProperty("expanded");if(e){r.write(" sapUshellSearchResultListItem-AttributesExpanded");}r.write('">');r.write('<div class="sapUshellSearchResultListItem-AttributesAndActions">');r.write('<ul class="sapUshellSearchResultListItem-Attributes">');this._renderThumbnailSnippetContainer(r);this._renderDocAttributesContainer(r);r.write('<div class="sapUshellSearchResultListItem-ExpandSpacerAttribute" aria-hidden="true"></div>');r.write('</ul>');t._renderRelatedObjectsToolbar(r);r.write('</div>');r.write('</div>');},_renderImageForPhone:function(r){var t=this;if(t.getImageUrl()&&t.getContainsThumbnail()===true){r.write('<div class="sapUshellSearchResultListItem-TitleImage">');r.write('<div class="sapUshellSearchResultListItem-ImageContainerAlignmentHelper"></div>');r.write('<img class="sapUshellSearchResultListItem-Image" src="');r.write(t.getImageUrl());r.write('">');r.write('</div>');}},_renderDocAttributesContainer:function(r){r.write('<div class="sapUshellSearchResultListItemNote-AttributesContainer">');var i=this.getAttributes();this._renderAllAttributes(r,i);r.write('</div>');},_renderThumbnailSnippetContainer:function(r){r.write('<div class="sapUshellSearchResultListItemNote-ThumbnailSnippetContainer">');this._renderSnippetContainer(r);r.write('</div>');},_renderSnippetContainer:function(r){var c=this.getAttributes();for(var i=0;i<c.length;i++){var d=c[i];if(d.longtext){var v=new a();v.setText(d.value);v.addStyleClass("sapUshellSearchResultListItemDoc-Snippet");r.renderControl(v);}}},_renderAllAttributes:function(r,c){var t=this;var d;var l;var v;var e;var i=0,j=0;var f=4;if(t.getImageUrl()){f--;}t.destroyAggregation("_attributeValues");for(;j<f&&i<c.length;i++){d=c[i];if(d.isTitle||d.longtext){continue;}if(!d.value){continue;}l=d.name;v=d.value;if(l===undefined||v===undefined){continue;}if(!v||v===""){v=n;}e=new a();e.setText(v);e.addStyleClass("sapUshellSearchResultListItemNote-AttributeValue");e.addStyleClass("sapUshellSearchResultListItem-MightOverflow");r.renderControl(e);t.addAggregation("_attributeValues",e,true);j++;}},_getExpandAreaObjectInfo:function(){var t=this;var r=$(t.getDomRef());var c=r.find(".sapUshellSearchResultListItemDoc-AttributesExpandContainer");var d=r.find(".sapUshellSearchResultListItem-RelatedObjectsToolbar");var e=false;if(d.css("display")==="none"){d.css("display","block");e=true;}var f=c.height();var g=r.find(".sapUshellSearchResultListItem-AttributesAndActions").height();if(e){d.css("display","");}var h=[];r.find(".sapUshellSearchResultListItem-GenericAttribute").each(function(){var l=$(this);if(l.css("order")>2){h.push(this);}});var i=200;var j=i/10;var k={resultListItem:r,attributesExpandContainer:c,currentHeight:f,expandedHeight:g,elementsToFadeInOrOut:h,expandAnimationDuration:i,fadeInOrOutAnimationDuration:j,relatedObjectsToolbar:d};return k;},hideDetails:function(c){var t=this;var r=$(t.getDomRef());if(!t.isShowingDetails()){return;}var e=this._getExpandAreaObjectInfo();var d=r.find(".sapUshellSearchResultListItem-Attributes").outerHeight(true);var s=false;var f=e.attributesExpandContainer.animate({"height":d},{"duration":e.expandAnimationDuration,"progress":function(g,p,h){if(!s&&h<=e.fadeInOrOutAnimationDuration){s=true;var i=$(e.elementsToFadeInOrOut).animate({"opacity":0},e.fadeInOrOutAnimationDuration).promise();jQuery.when(f,i).done(function(){t.setProperty("expanded",false,true);e.attributesExpandContainer.removeClass("sapUshellSearchResultListItem-AttributesExpanded");$(e.elementsToFadeInOrOut).css("opacity","");var j=sap.ui.core.IconPool.getIconURI("slim-arrow-down");var k=t.getAggregation("_expandButton");k.setTooltip(sap.ushell.resources.i18n.getText("showDetailBtn_tooltip"));k.setIcon(j);k.rerender();});}}}).promise();}});});
