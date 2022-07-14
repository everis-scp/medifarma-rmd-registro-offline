/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnalyticalContentRenderer","./BaseContent","sap/ui/integration/library","sap/ui/integration/util/BindingResolver","sap/base/Log","sap/ui/core/Core"],function(A,B,l,a,L,C){"use strict";var b=l.CardActionArea;var V,F,c,P;var d={"Top":"top","Bottom":"bottom","Left":"left","Right":"right"};var e={"TopLeft":"topLeft","Center":"center"};var T={"Left":"left","Center":"center","Right":"right"};var f={"Line":"line","StackedColumn":"stacked_column","StackedBar":"stacked_bar","Donut":"donut"};var g={"Chart":"Chart","Full":"Full"};var h=B.extend("sap.ui.integration.cards.AnalyticalContent",{metadata:{library:"sap.ui.integration"},renderer:A});h.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._oPopover){this._oPopover.destroy();}};h.prototype.loadDependencies=function(o){return new Promise(function(r,i){C.loadLibrary("sap.viz",{async:true}).then(function(){sap.ui.require(["sap/viz/ui5/controls/VizFrame","sap/viz/ui5/controls/common/feeds/FeedItem","sap/viz/ui5/controls/Popover","sap/viz/ui5/data/FlattenedDataset"],function(_,j,k,m){V=_;F=j;P=k;c=m;r();},function(E){i(E);});}).catch(function(){i("Analytical content type is not available with this distribution.");});});};h.prototype._getVizPropertiesObject=function(o){if(!o){return null;}var t=o.title,i=o.legend,p=o.plotArea;var v={"title":{"style":{"fontWeight":"normal"},"layout":{"respectPlotPosition":false}},"legend":{},"legendGroup":{"layout":{}},"plotArea":{"window":{"start":"firstDataPoint","end":"lastDataPoint"}},"categoryAxis":{"title":{}},"valueAxis":{"title":{}},"interaction":{}};if(t){v.title.text=t.text;v.title.visible=t.visible;v.title.alignment=T[t.alignment];}if(i){v.legend.visible=i.visible;v.legendGroup.layout.position=d[i.position];v.legendGroup.layout.alignment=e[i.alignment];}if(p){if(p.dataLabel){v.plotArea.dataLabel=p.dataLabel;}if(p.categoryAxisText){v.categoryAxis.title.visible=p.categoryAxisText.visible;}if(p.valueAxisText){v.valueAxis.title.visible=p.valueAxisText.visible;}}if(o.actions||o.popover){var j=o.actionableArea===g.Chart||o.popover&&o.popover.active;v.interaction.noninteractiveMode=!j;}else{v.interaction.noninteractiveMode=true;}return v;};h.prototype.onDataChanged=function(){this._createChart();};h.prototype._createChart=function(){var o=this.getConfiguration(),m,D;if(!o.chartType){L.error("ChartType is a mandatory property");return;}var r=a.resolveValue(o,this,"/");var j=[];if(o.dimensions){D=[];for(var i=0;i<o.dimensions.length;i++){var k=o.dimensions[i];var n=r.dimensions[i].label;j.push(n);var p={name:n,value:k.value};D.push(p);}}var M=[];if(o.measures){m=[];for(var i=0;i<o.measures.length;i++){var q=o.measures[i];var n=r.measures[i].label;M.push(n);var s={name:n,value:q.value};m.push(s);}}var t=new c({measures:m,dimensions:D,data:{path:this.getBindingContext().getPath()}});var u=new V({uiConfig:{applicationSet:'fiori'},height:"100%",width:"100%",vizType:f[o.chartType],dataset:t,legendVisible:o.legend,feeds:[new F({uid:o.measureAxis,type:'Measure',values:M}),new F({uid:o.dimensionAxis,type:'Dimension',values:j})]});var v=this._getVizPropertiesObject(r);u.setVizProperties(v);this.setAggregation("_content",u);this._attachActions();if(r.popover&&r.popover.active){this._attachPopover();}};h.prototype._attachActions=function(){var o=this.getConfiguration();var i={area:b.Content,actions:o.actions,control:this};if(o.actionableArea===g.Chart){i.eventName="selectData";i.actionControl=this.getAggregation("_content");this._oActions.setBindingPathResolver(function(E){var I=E.getParameter("data")[0].data._context_row_number;return this.getBindingContext().getPath()+"/"+I;}.bind(this));}else{i.eventName="press";}this._oActions.attach(i);};h.prototype._attachPopover=function(){if(this._oPopover){this._oPopover.destroy();}this._oPopover=new P();this._oPopover.connect(this.getAggregation("_content").getVizUid());};return h;});