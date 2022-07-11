//@ui5-bundle sap/ui/suite/library-preload.js
/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.predefine('sap/ui/suite/QuickViewUtils',["sap/ui/thirdparty/jquery",'sap/ui/core/Control','sap/ui/core/Element'],function(q,C,E){"use strict";var Q={createQuickView:function(s,a,t,f){var m=new sap.ui.model.odata.ODataModel(s,false);var o=new sap.ui.ux3.QuickView({firstTitle:"{title}",firstTitleHref:"{titleLinkURL}",type:"{Thing/text}",icon:"{imageURL}"});o.setModel(m);o.bindObject("/QuickviewConfigs(name='"+a+"',thingKey='"+t+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var M=new d();M.bindAggregation("items",{path:"QVAttributes",factory:function(i,b){var e=new c(i,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});e.bindProperty("value","value",f&&f[b.getProperty("Attribute/name")]);return e;}});o.addContent(M);return o;},createQuickViewData:function(o,s,a,t,f){var m=new sap.ui.model.odata.ODataModel(s,false);o.removeAllContent();o.setModel(m);o.bindProperty("firstTitle","title");o.bindProperty("firstTitleHref","titleLinkURL");o.bindProperty("type","Thing/text");o.bindProperty("icon","imageURL");o.bindObject("/QuickviewConfigs(name='"+a+"',thingKey='"+t+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var M=new d();M.bindAggregation("items",{path:"QVAttributes",factory:function(i,b){var e=new c(i,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});e.bindProperty("value","value",f&&f[b.getProperty("Attribute/name")]);return e;}});o.addContent(M);},createDataSetQuickView:function(s,a,t,p,S){var m=new sap.ui.model.odata.ODataModel(s,false);if(S){m.setSizeLimit(S);}var o=new sap.ui.ux3.QuickView({type:t,showActionBar:false});o.setModel(m);o.addContent(this._createDSContent(o,a,p));return o;},createDataSetQuickViewData:function(o,s,a,t,p,S){var m=new sap.ui.model.odata.ODataModel(s,false);if(S){m.setSizeLimit(S);}o.removeAllContent();o.setType(t);o.setShowActionBar(false);o.setModel(m);o.addContent(this._createDSContent(o,a,p));},_createDSContent:function(o,s,p){var a=new sap.ui.commons.layout.MatrixLayout();var r=new sap.ui.commons.layout.MatrixLayoutRow();q.each(p,function(i,P){var b;if(P.href){b=new sap.ui.commons.Link({text:P.value,href:P.href});}else{b=new sap.ui.commons.TextView({text:P.value});}var e=new sap.ui.commons.layout.MatrixLayoutCell({content:[b]});e.addStyleClass("quickViewDS");r.addCell(e);});a.bindAggregation("rows",s,r);return a;}};
var c=E.extend("sap.ui.suite.hcm.QvItem",{metadata:{properties:{label:"string",value:"string",link:"string",order:"string",type:"string"}}});
var d=C.extend("sap.ui.suite.hcm.QvContent",{
metadata:{aggregations:{"items":{type:"sap.ui.suite.hcm.QvItem",multiple:true}}},
init:function(){this._sorted=false;},
exit:function(){if(this._oML){this._oML.destroy();}},
renderer:function(r,o){r.write("<div");r.writeControlData(o);r.write(">");r.renderControl(o._createQVContent(o));r.write("</div>");},
_createQVContent:function(o){var m=new sap.ui.commons.layout.MatrixLayout({widths:["75px"]}),I=o.getItems(),M,a,l,t,L;if(this._oML){this._oML.destroy();}o._sortItems(o);for(var i=0;i<I.length;i++){M=new sap.ui.commons.layout.MatrixLayoutRow();a=new sap.ui.commons.layout.MatrixLayoutCell({vAlign:'Top'});l=new sap.ui.commons.Label({text:I[i].getLabel()+':'});a.addContent(l);M.addCell(a);a=new sap.ui.commons.layout.MatrixLayoutCell();if(I[i].getLink()){L=new sap.ui.commons.Link({text:I[i].getValue(),href:I[i].getLink()});a.addContent(L);}else{t=new sap.ui.commons.TextView({text:I[i].getValue()});a.addContent(t);}M.addCell(a);m.addRow(M);}this._oML=m;return m;},
_sortItems:function(o){if(!o._sorted){var I=o.removeAllAggregation("items",true);I.sort(function(a,b){return(parseInt(a.getOrder())-parseInt(b.getOrder()));});q.each(I,function(i,a){o.addAggregation("items",a,false);});o._sorted=true;}}
});
return Q;},true);
sap.ui.predefine('sap/ui/suite/TaskCircle',['sap/ui/core/Control','sap/ui/core/EnabledPropagator','./library',"./TaskCircleRenderer"],function(C,E,l,T){"use strict";var a=l.TaskCircleColor;
var b=C.extend("sap.ui.suite.TaskCircle",{metadata:{library:"sap.ui.suite",properties:{value:{type:"int",group:"Misc",defaultValue:0},maxValue:{type:"int",group:"Misc",defaultValue:100},minValue:{type:"int",group:"Misc",defaultValue:0},color:{type:"sap.ui.suite.TaskCircleColor",group:"Misc",defaultValue:a.Gray}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{press:{}}}});
E.call(b.prototype);
b.prototype.init=function(){};
b.prototype.onclick=function(e){this.firePress({});e.preventDefault();e.stopPropagation();};
b.prototype.focus=function(){var d=this.getDomRef();if(d){d.focus();}};
return b;});
sap.ui.predefine('sap/ui/suite/TaskCircleRenderer',['sap/ui/core/Core','./library'],function(C,l){"use strict";var T=l.TaskCircleColor;var a=function(){};
a.render=function(r,c){var b=r;var m=c.getMinValue();var d=c.getMaxValue();var v=c.getValue();if(m<0){m=0;}if(d<0){d=1;}if(v<0){v=0;}var e=v.toString();var f=c.getColor();var s='sapUiTaskCircleColorGray';switch(f){case T.Red:s='sapUiTaskCircleColorRed';break;case T.Yellow:s='sapUiTaskCircleColorYellow';break;case T.Green:s='sapUiTaskCircleColorGreen';break;case T.Gray:s='sapUiTaskCircleColorGray';break;}if(v<m){m=v;}if(v>d){d=v;}var p=24;if(m>10){p=32;}if(m>100){p=46;}var g=62;var h=parseInt(Math.sqrt((v-m)/(d-m)*(g*g-p*p)+p*p));var i=(v+'').length;var j=h*0.55;if(i>1){j=h/i;}b.write("<div");b.writeControlData(c);b.writeAttribute('tabindex','0');if(c.getTooltip_AsString()){b.writeAttributeEscaped("title",c.getTooltip_AsString());}else{b.writeAttributeEscaped("title",e);}if(sap.ui.getCore().getConfiguration().getAccessibility()){b.writeAttribute('role','progressbar');b.writeAccessibilityState(c,{valuemin:m});b.writeAccessibilityState(c,{valuemax:d});b.writeAccessibilityState(c,{valuenow:v});}b.writeAttribute("class","sapUiTaskCircle "+s);b.addStyle("width",h+"px");b.addStyle("height",h+"px");b.addStyle("line-height",h+"px");b.addStyle("font-size",parseInt(j)+"px");b.addStyle("border-radius",h+"px");b.addStyle("-moz-border-radius",h+"px");b.writeClasses();b.writeStyles();b.write(">");b.write(v);b.write("</div>");};
return a;},true);
sap.ui.predefine('sap/ui/suite/VerticalProgressIndicator',["sap/ui/thirdparty/jquery",'sap/ui/core/Control','sap/ui/core/EnabledPropagator','./library',"./VerticalProgressIndicatorRenderer"],function(q,C,E,l,V){"use strict";
var a=C.extend("sap.ui.suite.VerticalProgressIndicator",{metadata:{library:"sap.ui.suite",properties:{percentage:{type:"int",group:"Misc",defaultValue:null}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{press:{}}}});
E.call(a.prototype);
a.prototype.setPercentage=function(p){var b=this.getPercentage();if(b==p){return this;}this.oBar=this.getDomRef('bar');b=p;if(b<0){b=0;}if(b>100){b=100;}var P=Math.round(b*58/100);var c=58-P;this.setProperty('percentage',p,true);q(this.oBar).css("top",c);q(this.oBar).css("height",P);if(!this.oThis){this.oThis=this.$();}this.oThis.attr('aria-valuenow',p+'%');return this;};
a.prototype.onclick=function(e){this.firePress({});e.preventDefault();e.stopPropagation();};
a.prototype.focus=function(){var d=this.getDomRef();if(d){d.focus();}};
return a;});
sap.ui.predefine('sap/ui/suite/VerticalProgressIndicatorRenderer',function(){"use strict";var V={};
V.render=function(r,c){var a=r;var b=c.getPercentage();if(b<0){b=0;}if(b>100){b=100;}var P=Math.round(b*58/100);var d=58-P;var e=b.toString();a.write("<div");a.writeControlData(c);a.writeAttribute('tabindex','0');if(c.getTooltip_AsString()){a.writeAttributeEscaped("title",c.getTooltip_AsString());}else{a.writeAttributeEscaped("title",e);}if(sap.ui.getCore().getConfiguration().getAccessibility()){a.writeAttribute('role','progressbar');a.writeAccessibilityState(c,{valuemin:'0%'});a.writeAccessibilityState(c,{valuemax:'100%'});a.writeAccessibilityState(c,{valuenow:b+'%'});}a.writeAttribute("class","sapUiVerticalProgressOuterContainer");a.write(">");a.write("<div");a.writeAttribute('id',c.getId()+'-bar');a.writeAttribute("class","sapUiVerticalProgressInnerContainer");a.addStyle("top",d+"px");a.addStyle("height",P+"px");a.writeClasses();a.writeStyles();a.write(">");a.write("</div>");a.write("</div>");};
return V;},true);
sap.ui.predefine('sap/ui/suite/library',['sap/ui/core/Core','sap/ui/core/library'],function(C){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.suite",version:"1.96.9",dependencies:["sap.ui.core"],types:["sap.ui.suite.TaskCircleColor"],interfaces:[],controls:["sap.ui.suite.TaskCircle","sap.ui.suite.VerticalProgressIndicator"],elements:[]});var t=sap.ui.suite;t.TaskCircleColor={Red:"Red",Yellow:"Yellow",Green:"Green",Gray:"Gray"};return t;});
sap.ui.require.preload({
	"sap/ui/suite/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.ui.suite","type":"library","embeds":[],"applicationVersion":{"version":"1.96.9"},"title":"SAP UI library: sap.ui.suite (by SAP, Author)","description":"SAP UI library: sap.ui.suite (by SAP, Author)","ach":"CA-UI5-CTR","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.96","libs":{"sap.ui.core":{"minVersion":"1.96.9"}}},"library":{"i18n":false,"content":{"controls":["sap.ui.suite.TaskCircle","sap.ui.suite.VerticalProgressIndicator"],"elements":[],"types":["sap.ui.suite.TaskCircleColor"],"interfaces":[]}}}}'
},"sap/ui/suite/library-preload"
);
//# sourceMappingURL=library-preload.js.map