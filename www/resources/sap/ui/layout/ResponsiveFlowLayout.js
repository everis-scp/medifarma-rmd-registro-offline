/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','./ResponsiveFlowLayoutData','./library','sap/ui/core/ResizeHandler','./ResponsiveFlowLayoutRenderer',"sap/ui/thirdparty/jquery",'sap/ui/dom/jquery/rect'],function(C,R,l,a,b,q){"use strict";var c=C.extend("sap.ui.layout.ResponsiveFlowLayout",{metadata:{library:"sap.ui.layout",properties:{responsive:{type:"boolean",group:"Misc",defaultValue:true}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});(function(){c.prototype.init=function(){this._rows=[];this._bIsRegistered=false;this._proxyComputeWidths=f.bind(this);this._iRowCounter=0;};c.prototype.exit=function(){delete this._rows;if(this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined;}if(this._resizeHandlerComputeWidthsID){a.deregister(this._resizeHandlerComputeWidthsID);}delete this._resizeHandlerComputeWidthsID;delete this._proxyComputeWidths;if(this.oRm){this.oRm.destroy();delete this.oRm;}delete this._$DomRef;delete this._oDomRef;delete this._iRowCounter;};var u=function(t){var h=t.getContent();var r=[];var j=-1;var I={},L={};var s="";var o;var m=0,w=0,k=0;var B=false,M=false,n=false;for(var i=0;i<h.length;i++){m=R.MIN_WIDTH;w=R.WEIGHT;B=R.LINEBREAK;M=R.MARGIN;n=R.LINEBREAKABLE;o=_(h[i]);if(o instanceof R){B=o.getLinebreak();m=o.getMinWidth();w=o.getWeight();M=o.getMargin();n=o.getLinebreakable();}if(j<0||B){j++;r.push({height:-1,cont:[]});}k=r[j].cont.length;s=h[i].getId()+"-cont"+j+"_"+k;I={minWidth:m,weight:w,linebreakable:n,padding:M,control:h[i],id:s,breakWith:[]};var p=false;if(!n){for(var v=k;v>0;v--){L=r[j].cont[v-1];if(L.linebreakable){L.breakWith.push(I);p=true;break;}}}if(!p){r[j].cont.push(I);}}t._rows=r;};var g=function(o,$,t){var r=[];var h=10000000;var k=-1;var m=function(j){var n=q(document.getElementById(o.cont[j].id));if(n.length>0){var p=n[0].offsetLeft;if(h>=p){r.push({cont:[]});k++;}h=p;r[k].cont.push(o.cont[j]);}};if(sap.ui.getCore().getConfiguration().getRTL()){for(var i=o.cont.length-1;i>=0;i--){m(i);}}else{for(var i=0;i<o.cont.length;i++){m(i);}}return r;};var d=function(o,w){var r=[];var h=-1;var i=0;var t=0;var m=0;var n=0,p=0;var j=0,k=0;for(j=0;j<o.cont.length;j++){i=0;t=0;for(k=m;k<=j;k++){t=t+o.cont[k].weight;}for(k=m;k<=j;k++){n=w/t*o.cont[k].weight;n=Math.floor(n);p=o.cont[k].minWidth;i+=Math.max(n,p);}if(h==-1||i>w){r.push({cont:[]});if(h!==-1){m=j;}h++;}r[h].cont.push(o.cont[j]);}return r;};var e=function(w,h){if(w.length!=h.length){return true;}for(var i=0;i<w.length;i++){if(w[i].cont.length!=h[i].cont.length){return true;}}return false;};c.prototype.renderContent=function(t,w){var r=t,h=0,W=[],i=0,k=0,j=0,m=0,n=0,p=0,o,s=0,v=0,B=[],x=[],I=this.getId(),H="",y=this._getRenderManager();for(i=0;i<r.length;i++){p=0;W.length=0;h=100;x.length=0;x.push("sapUiRFLRow");if(r[i].cont.length<=1){x.push("sapUiRFLCompleteRow");}var z=I+"-row"+this._iRowCounter;var S={};y.writeHeader(z,S,x);n=0;for(k=0;k<r[i].cont.length;k++){n+=r[i].cont[k].weight;}for(j=0;j<r[i].cont.length;j++){o=r[i].cont[j];s=0;v=0;if(o.breakWith.length>0){s=o.weight;v=o.minWidth;for(var A=0;A<o.breakWith.length;A++){s+=o.breakWith[A].weight;v+=o.breakWith[A].minWidth;}}H=r[i].cont[j].id;x.length=0;S={"min-width":o.breakWith.length>0?v:o.minWidth};p=100/n*o.weight;var P=S["min-width"]/w*100;var D=Math.ceil(P);var E=Math.floor(p);if(E!==100&&D>E){p=D;}else{p=E;}p=h<p?h:p;h-=p;W.push(p);if(h>0&&j===(r[i].cont.length-1)){p+=h;}x.push("sapUiRFLContainer");S["width"]=p+"%";S["min-width"]=S["min-width"]+"px";y.writeHeader(H,S,x);x.length=0;x.push("sapUiRFLContainerContent");if(o.breakWith.length>0){x.push("sapUiRFLMultiContainerContent");}if(o.padding){x.push("sapUiRFLPaddingClass");}var F=this._addContentClass(o.control,j);if(F){x.push(F);}S={};y.writeHeader("",S,x);if(o.breakWith.length>0){H=r[i].cont[j].id+"-multi0";x.length=0;S={"min-width":v+"px"};var G=100/s*o.weight;G=Math.floor(G);B.push(G);x.push("sapUiRFLMultiContent");S["width"]=G+"%";if(r[i].cont[j].padding){x.push("sapUiRFLPaddingClass");}y.writeHeader(H,S,x);var J=G;y.renderControl(o.control);y.close("div");for(m=0;m<o.breakWith.length;m++){H=o.breakWith[m].id+'-multi'+(m+1);x.length=0;S={"min-width":o.breakWith[m].minWidth+"px"};G=100/s*o.breakWith[m].weight;G=Math.floor(G);B.push(G);J+=G;if(J<100&&m===(o.breakWith.length-1)){G+=100-J;}x.push("sapUiRFLMultiContent");S["width"]=G+"%";if(o.breakWith[m].padding){x.push("sapUiRFLPaddingClass");}y.writeHeader(H,S,x);y.renderControl(o.breakWith[m].control);y.close("div");}}else{y.renderControl(o.control);}y.close("div");y.close("div");}y.close("div");this._iRowCounter++;}};var f=function(){this._iRowCounter=0;this._oDomRef=this.getDomRef();if(this._oDomRef){var I=this.getId();var h=q(this._oDomRef).width();var r=false;if(this._rows){for(var i=0;i<this._rows.length;i++){var $=q(document.getElementById(I+"-row"+i));var t=d(this._rows[i],h);var o=g(this._rows[i],$,this);r=e(o,t);var j=this._getElementRect($);var p=this._rows[i].oRect;if(j&&p){r=r||(j.width!==p.width)&&(j.height!==p.height);}if(this._bLayoutDataChanged||r){this._oDomRef.innerHTML="";this._bLayoutDataChanged=false;this.renderContent(t,h);}}if(this._oDomRef.innerHTML===""){this._getRenderManager().flush(this._oDomRef);for(var i=0;i<this._rows.length;i++){var T=this._getElementRect(q(document.getElementById(I+"-row"+i)));this._rows[i].oRect=T;}}if(this._rows.length===0){if(this._resizeHandlerComputeWidthsID){a.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID;}}}}};c.prototype.onBeforeRendering=function(){u(this);if(this._resizeHandlerFullLengthID){a.deregister(this._resizeHandlerFullLengthID);delete this._resizeHandlerFullLengthID;}};c.prototype.onAfterRendering=function(){this._oDomRef=this.getDomRef();this._$DomRef=q(this._oDomRef);this._proxyComputeWidths();if(this.getResponsive()){if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=a.register(this,c.prototype.rerender.bind(this));}}else{if(this._resizeHandlerComputeWidthsID){a.deregister(this._resizeHandlerComputeWidthsID);delete this._resizeHandlerComputeWidthsID;}}};c.prototype.onThemeChanged=function(E){if(E.type==="LayoutDataChange"){this._bLayoutDataChanged=true;}if(!this._resizeHandlerComputeWidthsID){this._resizeHandlerComputeWidthsID=a.register(this,c.prototype.rerender.bind(this));}u(this);this._proxyComputeWidths();};c.prototype.onLayoutDataChange=c.prototype.onThemeChanged;var _=function(o){var L=o.getLayoutData();if(!L){return undefined;}else if(L instanceof R){return L;}else if(L.getMetadata().getName()=="sap.ui.core.VariantLayoutData"){var h=L.getMultipleLayoutData();for(var i=0;i<h.length;i++){var j=h[i];if(j instanceof R){return j;}}}};c.prototype.addContent=function(o){if(o&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined;}this.addAggregation("content",o);return this;};c.prototype.insertContent=function(o,i){if(o&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined;}this.insertAggregation("content",o,i);return this;};c.prototype.removeContent=function(o){if(o&&this._IntervalCall){clearTimeout(this._IntervalCall);this._IntervalCall=undefined;}this.removeAggregation("content",o);};c.prototype._getAccessibleRole=function(){return null;};c.prototype._addContentClass=function(o,i){return null;};c.prototype._getElementRect=function(E){var r=E&&E.rect();if(r){r.height=r.height.toFixed(1);r.width=r.width.toFixed(1);}return r;};c.prototype._getRenderManager=function(){if(!this.oRm){this.oRm=sap.ui.getCore().createRenderManager();this.oRm.writeHeader=function(I,s,h){this.openStart("div",I);if(s){for(var k in s){if(k==="width"&&s[k]==="100%"){this.class("sapUiRFLFullLength");}this.style(k,s[k]);}}for(var i=0;i<h.length;i++){this.class(h[i]);}this.openEnd();};}return this.oRm;};}());return c;});
