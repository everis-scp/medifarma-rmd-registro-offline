/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/SearchModel","sap/m/Toolbar","sap/m/ToolbarDesign","sap/m/Button","sap/m/Link","sap/m/ToolbarLayoutData","sap/m/ToolbarSpacer","sap/m/ActionSheet","sap/m/PlacementType","sap/ui/core/InvisibleText","sap/ui/core/IconPool","sap/ui/core/delegate/ItemNavigation",],function(S,T,a,B,L,b,c,A,P,I,d,e){"use strict";var m=sap.ui.core.Control.extend("sap.esh.search.ui.controls.SearchRelatedObjectsToolbar",{metadata:{properties:{itemId:"string",navigationObjects:{type:"object",multiple:true,},positionInList:"int",},aggregations:{_relatedObjectActionsToolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden",},_ariaDescriptionForLinks:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden",},},},init:function(){var t=this;if(sap.ui.core.Control.prototype.init){sap.ui.core.Control.prototype.init.apply(t,arguments);}sap.esh.search.ui.controls.SearchRelatedObjectsToolbar._allOfMyCurrentInstances.push(t);t.setAggregation("_relatedObjectActionsToolbar",new T({design:a.Solid,}).data("sap-ui-fastnavgroup","false",true).addStyleClass("sapUshellSearchResultListItem-RelatedObjectsToolbar-Toolbar"));t.setAggregation("_ariaDescriptionForLinks",new I({text:sap.esh.search.ui.resources.i18n.getText("result_list_item_aria_has_more_links"),}));},exit:function(){var t=this;if(sap.ui.core.Control.prototype.exit){sap.ui.core.Control.prototype.exit.apply(t,arguments);}var f=sap.esh.search.ui.controls.SearchRelatedObjectsToolbar._allOfMyCurrentInstances;for(var i=0;i<f.length;i++){if(f[i]===t){f.splice(i,1);break;}}if(t.searchLayoutChangedIsSubscribed){t.searchLayoutChangedIsSubscribed=false;t.getModel().unsubscribe("searchLayoutChanged",t._layoutToolbarElements,t);}},renderer:function(r,C){r.write("<div");r.writeControlData(C);r.addClass("sapUshellSearchResultListItem-RelatedObjectsToolbar");r.writeClasses();r.write(">");r.renderControl(C.getAggregation("_ariaDescriptionForLinks"));C._renderToolbar(r);r.write("</div>");},_renderToolbar:function(r){var t=this;var i;var _=t.getAggregation("_relatedObjectActionsToolbar");_.destroyContent();var f=function(h){return function(){t._performNavigation(h,{trackingOnly:true,});};};var n=t.getNavigationObjects();if(n.length>0){var g=[];for(i=0;i<n.length;i++){var h=n[i];var l=new L({text:h.getText(),href:h.getHref(),layoutData:new b({shrinkable:false,}),press:f(h),});var j=h.getTarget();if(j){l.setTarget(j);}l.addStyleClass("sapUshellSearchResultListItem-RelatedObjectsToolbar-Element");g.push(l);}var k=new c();k.addStyleClass("sapUshellSearchResultListItem-RelatedObjectsToolbar-Spacer");_.addContent(k);for(i=0;i<g.length;i++){_.addContent(g[i]);}t._overFlowButton=new B({icon:d.getIconURI("overflow"),});t._overFlowButton.addStyleClass("sapUshellSearchResultListItem-RelatedObjectsToolbar-OverFlowButton");_.addContent(t._overFlowButton);t._overFlowSheet=new A({placement:P.Top,});t._overFlowButton.attachPress(function(){t._overFlowSheet.openBy(t._overFlowButton);});r.renderControl(_);}},onAfterRendering:function(){var t=this;if(t.getAggregation("_relatedObjectActionsToolbar")){t._layoutToolbarElements();t._addAriaInformation();}if(!t.searchLayoutChangedIsSubscribed){t.getModel().subscribe("searchLayoutChanged",t._layoutToolbarElements,t);t.searchLayoutChangedIsSubscribed=true;}},_layoutToolbarElements:function(){var t=this;var _=t.getAggregation("_relatedObjectActionsToolbar");if(!(t.getDomRef()&&_.getDomRef())){return;}var f=$(_.getDomRef());var g=f.width();if($(t.getDomRef()).css("display")==="none"||f.css("display")==="none"){return;}t.toolbarWidth=g;var h=$(t._overFlowButton.getDomRef());h.css("display","none");var j=0;var p=function(u,v){t._performNavigation(v);};var k=f.find(".sapUshellSearchResultListItem-RelatedObjectsToolbar-Element");for(var i=0;i<k.length;i++){var l=$(k[i]);l.css("display","");var n=j+l.outerWidth(true);if(n>g){if(i<k.length){h.css("display","");var o=h.outerWidth(true);for(;i>=0;i--){l=$(k[i]);n-=l.outerWidth(true);if(n+o<=g){break;}}}var q=t.getNavigationObjects();t._overFlowSheet.destroyButtons();i=i>=0?i:0;for(;i<k.length;i++){l=$(k[i]);l.css("display","none");var r=q[i];var s=new B({text:r.getText(),});s.attachPress(r,p);t._overFlowSheet.addButton(s);}break;}j=n;}t._setupItemNavigation();},_setupItemNavigation:function(){var t=this;if(!t.theItemNavigation){t.theItemNavigation=new e();t.addDelegate(t.theItemNavigation);}t.theItemNavigation.setCycling(false);t.theItemNavigation.setRootDomRef(t.getDomRef());var f=[];var _=t.getAggregation("_relatedObjectActionsToolbar");var g=_.getContent();for(var i=0;i<g.length;i++){if(!g[i].hasStyleClass("sapUshellSearchResultListItem-RelatedObjectsToolbar-Element")){continue;}if(!$(g[i].getDomRef()).attr("tabindex")){var h="-1";if(g[i].getPressed&&g[i].getPressed()){h="0";}$(g[i].getDomRef()).attr("tabindex",h);}f.push(g[i].getDomRef());}var j=t._overFlowButton.getDomRef();f.push(j);$(j).attr("tabindex","-1");t.theItemNavigation.setItemDomRefs(f);},_addAriaInformation:function(){var t=this;var f=$(this.getAggregation("_relatedObjectActionsToolbar").getDomRef());var g=f.find(".sapUshellSearchResultListItem-RelatedObjectsToolbar-Element");var h=$(t._overFlowButton.getDomRef());if(g.length>0||h.is(":visible")){var i=t.getAggregation("_ariaDescriptionForLinks").getId();g.each(function(){var k=$(this);var j=k.attr("aria-describedby")||"";j+=" "+i;k.attr("aria-describedby",j);});if(h.is(":visible")){var j=h.attr("aria-describedby")||"";j+=" "+i;h.attr("aria-describedby",j);}}},_performNavigation:function(n,p){var t=(p&&p.trackingOnly)||false;n.performNavigation({trackingOnly:t,});},});m._allOfMyCurrentInstances=[];$(window).on("resize",function(){for(var i=0;i<this._allOfMyCurrentInstances.length;i++){this._allOfMyCurrentInstances[i]._layoutToolbarElements();}}.bind(m));return m;});
