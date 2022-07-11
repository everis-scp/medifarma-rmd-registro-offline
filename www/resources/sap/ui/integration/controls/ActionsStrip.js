/*!
* OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["../library","sap/m/library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/integration/util/CardActions","sap/ui/integration/util/BindingHelper","sap/m/Button","sap/m/OverflowToolbarButton","sap/m/OverflowToolbar","sap/m/OverflowToolbarLayoutData","sap/m/ToolbarSpacer"],function(l,L,C,a,b,B,c,O,d,e,T){"use strict";var f=L.ToolbarStyle;var A=l.CardActionArea;var g=a.extend("sap.ui.integration.controls.ActionsStrip",{metadata:{library:"sap.ui.integration",properties:{},aggregations:{_toolbar:{type:"sap.m.OverflowToolbar",multiple:false}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:{apiVersion:2,render:function(r,o){r.openStart("div",o).class("sapUiIntActionsStrip").openEnd();r.renderControl(o._getToolbar());r.close("div");}}});g.prototype._getToolbar=function(){var t=this.getAggregation("_toolbar");if(!t){t=new d({style:f.Clear});this.setAggregation("_toolbar",t);}return t;};g.prototype._initButtons=function(h){if(!h||!h.length){return null;}var t=this._getToolbar(),o=C.byId(this.getCard()),i=new b({card:o}),H=false;h=B.createBindingInfos(h,o.getBindingNamespaces());h.forEach(function(m){if(m.type==="ToolbarSpacer"){H=true;t.addContent(new T());return;}var j=m.actions,k=new e({group:m.overflowGroup,priority:m.overflowPriority}),n;if(m.icon){n=new O({icon:m.icon,text:m.text||m.tooltip,tooltip:m.tooltip||m.text,type:m.buttonType,ariaHasPopup:m.ariaHasPopup,visible:m.visible});}else{n=new c({text:m.text,tooltip:m.tooltip,type:m.buttonType,ariaHasPopup:m.ariaHasPopup,visible:m.visible});}n.setLayoutData(k);i.attach({area:A.ActionsStrip,control:n,actions:j,enabledPropertyName:"enabled"});t.addContent(n);});if(!H){t.insertContent(new T(),0);}};g.create=function(o,h){var i=new g({card:o});i._initButtons(h);return i;};return g;});
