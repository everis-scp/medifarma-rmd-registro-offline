/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/m/ResponsivePopover","sap/m/List","sap/m/Bar","sap/m/SearchField","sap/m/StandardListItem","sap/ui/core/InvisibleText","sap/m/library","sap/ui/Device","sap/ui/mdc/chart/DimensionItem","sap/ui/mdc/chart/ChartSettings","sap/base/Log"],function(C,R,L,B,S,a,I,M,D,b,c,d){"use strict";var P=M.PlacementType;var e=M.ListType;var f=M.ListMode;function _(m){var h=m.getControlDelegate().getDrillStack();var s=[];h.forEach(function(o){o.dimension.forEach(function(i){if(i!=null&&i!=""&&s.indexOf(i)==-1){s.push(i);}});});return s;}var g=function(){};g.createDrillDownPopover=function(m){var l=new L({mode:f.SingleSelectMaster,selectionChange:function(o){var h=o.getParameter("listItem");if(h){m.getEngine().createChanges({control:m,key:"Item",state:[{name:h.data("dim").name,position:m.getItems().length}]});}p.close();}});var s=new B();var p=new R({id:m.getId()+"-drilldownPopover",contentWidth:"25rem",contentHeight:"20rem",placement:P.Bottom,subHeader:s});var r=C.getLibraryResourceBundle("sap.ui.mdc");if(D.system.desktop){var i=new I({text:r.getText("chart.CHART_DRILLDOWN_TITLE")});p.setShowHeader(false);p.addContent(i);p.addAriaLabelledBy(i);}else{p.setTitle(r.getText("chart.CHART_DRILLDOWN_TITLE"));}p.addContent(l);m._oDrillDownPopover=p;return p;};g.showDrillDownPopover=function(m,o){var p=m.getControlDelegate().getSortedDimensions(m);return p.then(function(s){var h=m._oDrillDownPopover;var j,k,l;var F=h.getContent().filter(function(E){return E.getMetadata().getClass()==L;});var n=F.length>0?F[0]:null;if(!n){d.error("MDC Chart: Could not determine list to show drilldown. This should not happen. Did the application modify the drill-down popover?");return;}n.destroyItems();j=_(m);for(var i=0;i<s.length;i++){k=s[i];if(j.indexOf(k.name)>-1){continue;}l=new a({title:k.label,type:e.Active});l.data("dim",k);n.addItem(l);}return new Promise(function(r,q){h.attachEventOnce("afterOpen",function u(t){r(h);});h.openBy(o);});});};return g;});