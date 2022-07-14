/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/controls/SearchResultListItem","sap/esh/search/ui/controls/SearchText","sap/esh/search/ui/SearchHelper","sap/ui/core/Icon","sap/ui/core/IconPool","sap/ui/core/format/DateFormat",],function(S,a,b,I,c,D){"use strict";var n="\u2013";return S.extend("sap.esh.search.ui.controls.SearchResultListItemDocument",{renderer:function(r,C){C._renderer(r);},_renderContentContainer:function(r){r.write('<div class="sapUshellSearchResultListItem-Content">');this._renderTitleContainer(r);this._renderAttributesContainer(r);r.write("</div>");},_renderTitleContainer:function(r){var t=this;r.write('<div class="sapUshellSearchResultListItem-TitleAndImageContainer">');r.write('<div class="sapUshellSearchResultListItem-TitleContainer">');t._renderCheckbox(r);var d=t.getAdditionalParameters().titleUrl;var e=t.getAggregation("_titleLink");e.setHref(d);e.setText(t.getTitle());if(d.length===0){e.setEnabled(false);}r.renderControl(e);var f=t.getAggregation("_typeText");f.setText(t.getType());r.renderControl(f);r.write("</div>");t._renderImageForPhone(r);r.write("</div>");},_renderAttributesContainer:function(r){var t=this;r.write('<div class="sapUshellSearchResultListItemDoc-AttributesExpandContainer');var e=t.getProperty("expanded");if(e){r.write(" sapUshellSearchResultListItem-AttributesExpanded");}r.write('">');r.write('<div class="sapUshellSearchResultListItem-AttributesAndActions">');r.write('<ul class="sapUshellSearchResultListItem-Attributes">');this._renderThumbnailSnippetContainer(r);this._renderDocAttributesContainer(r);r.write('<div class="sapUshellSearchResultListItem-ExpandSpacerAttribute" aria-hidden="true"></div>');r.write("</ul>");t._renderRelatedObjectsToolbar(r);r.write("</div>");r.write("</div>");},_renderThumbnailContainer:function(r){var t=this;if(!t.getImageUrl()){return;}if(t.getContainsThumbnail()===true){r.write('<div class="sapUshellSearchResultListItemDoc-ThumbnailContainer">');r.write('<div class="sapUshellSearchResultListItemDoc-ThumbnailContainerInner">');var z=new I({src:c.getIconURI("search"),useIconTooltip:false,});if(t.getContainsSuvFile()===true){var p=function(){window.open(t.getSuvlink(),"_blank","noopener,noreferrer");};z.attachPress(p);}z.addStyleClass("sapUshellSearchResultListItemDoc-ThumbnailZoomIcon");r.renderControl(z);if(t.getContainsSuvFile()===true){r.write('<a target="_blank" href="'+t.getSuvlink()+'" rel="noopener noreferrer">');}else{r.write('<a target="_blank" rel="noopener noreferrer">');}r.write('<img class="sapUshellSearchResultListItemDoc-Thumbnail" src="');r.write(t.getImageUrl());r.write("</a>");r.write("</div>");r.write("</div>");}else{r.write('<div class="sapUshellSearchResultListItemDoc-ThumbnailContainer-hidden">');r.write("</div>");}},_renderImageForPhone:function(r){var t=this;if(t.getImageUrl()&&t.getContainsThumbnail()===true){r.write('<div class="sapUshellSearchResultListItem-TitleImage">');r.write('<div class="sapUshellSearchResultListItem-ImageContainerAlignmentHelper"></div>');r.write('<img class="sapUshellSearchResultListItem-Image" src="');r.write(t.getImageUrl());r.write('">');r.write("</div>");}},_renderDocAttributesContainer:function(r){r.write('<div class="sapUshellSearchResultListItemDoc-AttributesContainer">');var i=this.getAttributes();this._renderAllAttributes(r,i);r.write("</div>");},_renderThumbnailSnippetContainer:function(r){r.write('<div class="sapUshellSearchResultListItemDoc-ThumbnailSnippetContainer">');this._renderThumbnailContainer(r);this._renderSnippetContainer(r);r.write("</div>");},_renderSnippetContainer:function(r){var d=this.getAttributes();for(var i=0;i<d.length;i++){var e=d[i];if(e.longtext){var v=new a();v.setText(e.value);v.addStyleClass("sapUshellSearchResultListItemDoc-Snippet");r.renderControl(v);}}},_renderAllAttributes:function(r,d){var t=this;var e;var l;var v;var f;var p;var i=0,j=0,k=0;var g=8;if(t.getImageUrl()){g--;}var h=function(q){var s;for(var i=0;i<q.length;i++){s=q[i];if(s.key==="FILE_PROPERTY"&&s.value){return true;}}return false;};var C=h(d);t.destroyAggregation("_attributeValues");for(;j<g&&i<d.length;i++){e=d[i];if(e.isTitle||e.longtext){continue;}if(C===true&&e.key!=="FILE_PROPERTY"){continue;}if(!e.value){continue;}if(C===true){var F=JSON.parse(e.value);for(;k<F.length&&k<10;k++){p=F[k];switch(p.type){case"date-time":var o=new Date(p.value);var m=D.getDateTimeInstance({style:"medium",},sap.ui.getCore().getConfiguration().getLocale());v=m.format(o);break;case"byte":v=b.formatFileSize(Number(p.value));break;case"integer":v=b.formatInteger(Number(p.value));break;default:v=p.value;}l=p.category+": "+p.name;if(v===undefined){continue;}if(!v||v===""){v=n;}f=new a();f.setText(v);f.addStyleClass("sapUshellSearchResultListItemDoc-AttributeValue");f.addStyleClass("sapUshellSearchResultListItem-MightOverflow");r.renderControl(f);t.addAggregation("_attributeValues",f,true);}}else{l=e.name;v=e.value;if(l===undefined||v===undefined){continue;}if(!v||v===""){v=n;}f=new a();f.setText(v);f.addStyleClass("sapUshellSearchResultListItemDoc-AttributeValue");f.addStyleClass("sapUshellSearchResultListItem-MightOverflow");r.renderControl(f);t.addAggregation("_attributeValues",f,true);}j++;}},_getExpandAreaObjectInfo:function(){var t=this;var r=$(t.getDomRef());var d=r.find(".sapUshellSearchResultListItemDoc-AttributesExpandContainer");var e=r.find(".sapUshellSearchResultListItem-RelatedObjectsToolbar");var f=false;if(e.css("display")==="none"){e.css("display","block");f=true;}var g=d.height();var h=r.find(".sapUshellSearchResultListItem-AttributesAndActions").height();if(f){e.css("display","");}var i=[];r.find(".sapUshellSearchResultListItem-GenericAttribute").each(function(){var m=$(this);if(m.css("order")>2){i.push(this);}});var j=200;var k=j/10;var l={resultListItem:r,attributesExpandContainer:d,currentHeight:g,expandedHeight:h,elementsToFadeInOrOut:i,expandAnimationDuration:j,fadeInOrOutAnimationDuration:k,relatedObjectsToolbar:e,};return l;},hideDetails:function(){var t=this;var r=$(t.getDomRef());if(!t.isShowingDetails()){return;}var e=this._getExpandAreaObjectInfo();var d=r.find(".sapUshellSearchResultListItem-Attributes").outerHeight(true);var s=false;var f=e.attributesExpandContainer.animate({height:d,},{duration:e.expandAnimationDuration,progress:function(g,p,h){if(!s&&h<=e.fadeInOrOutAnimationDuration){s=true;var i=$(e.elementsToFadeInOrOut).animate({opacity:0,},e.fadeInOrOutAnimationDuration).promise();jQuery.when(f,i).done(function(){t.setProperty("expanded",false,true);e.attributesExpandContainer.removeClass("sapUshellSearchResultListItem-AttributesExpanded");$(e.elementsToFadeInOrOut).css("opacity","");var j=c.getIconURI("slim-arrow-down");var k=t.getAggregation("_expandButton");k.setTooltip(sap.esh.search.ui.resources.i18n.getText("showDetailBtn_tooltip"));k.setIcon(j);k.rerender();});}},}).promise();},});});