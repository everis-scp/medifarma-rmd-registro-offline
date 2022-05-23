// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/m/List","sap/m/CustomListItem","sap/m/Link","sap/ui/model/Sorter","sap/ui/thirdparty/jquery"],function(L,C,a,S,q){"use strict";sap.ui.jsview("sap.ushell.components.treeview.NavTree",{createContent:function(c){var l=new C({content:new a({text:"{title}",href:"{target}"}).addStyleClass("sapUshellNavTreeLink")}).addEventDelegate({onclick:c.onNavTreeTitleChange.bind(c)}).addStyleClass("sapUshellNavTreeListItem sapUshellNavTreeChild sapUshellNavTreeChildHide sapUshellNavTree_visual_transition");var o=new L({items:{path:"/items",groupHeaderFactory:q.proxy(c.getGroupHeader,c),sorter:new S("groupIndex",false,true),template:l}});var b=o.onAfterRendering;o.onAfterRendering=function(){b.apply(this,arguments);if(this.getItems().length>0){var f=this.getItems()[0];if(f.getMetadata().getName()==="sap.m.GroupHeaderListItem"&&f.getTitle&&!f.getTitle()){f.destroy();}var O=q(".sapUshellNavTreeParent");O.each(function(){var Q=q(this);var i=sap.ui.getCore().byId(Q.attr("id"));var I=i.getContent().length&&i.getContent()[0]&&i.getContent()[0].getSrc()||"";if(I==="slim-arrow-down"){Q.nextUntil(".sapUshellNavTreeSingle, .sapUshellNavTreeParent").removeClass("sapUshellNavTreeChildHide");}});}};return o;},getControllerName:function(){return"sap.ushell.components.treeview.NavTree";}});},true);
