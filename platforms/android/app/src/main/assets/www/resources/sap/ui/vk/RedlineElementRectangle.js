/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./RedlineElement","./Redline","sap/base/Log"],function(R,a,L){"use strict";var b=R.extend("sap.ui.vk.RedlineElementRectangle",{metadata:{library:"sap.ui.vk",properties:{width:{type:"float",defaultValue:0.001},height:{type:"float",defaultValue:0.001},fillColor:{type:"sap.ui.core.CSSColor",defaultValue:"rgba(0, 0, 0, 0)"}}}});b.prototype.init=function(){R.prototype.init.apply(this);this._originX=0;this._originY=0;};b.prototype.setOriginX=function(o){this.setProperty("originX",o);this._originX=o;};b.prototype.setOriginY=function(o){this.setProperty("originY",o);this._originY=o;};b.prototype.edit=function(o,c){var p=this.getParent(),t=p._toVirtualSpace(o,c),w=t.x-this._originX,h=t.y-this._originY;this.setProperty("originX",w<0?t.x:this._originX);this.setProperty("originY",h<0?t.y:this._originY);this.setWidth(Math.abs(w));this.setHeight(Math.abs(h));this.rerender();return this;};b.prototype.applyZoom=function(z){this.setProperty("width",this.getWidth()*z,true);this.setProperty("height",this.getHeight()*z,true);return this;};b.prototype.setWidth=function(w){this.setProperty("width",w,true);var d=this.getDomRef();if(d){d.setAttribute("width",this.getParent()._toPixelSpace(w));}};b.prototype.setHeight=function(h){this.setProperty("height",h,true);var d=this.getDomRef();if(d){d.setAttribute("height",this.getParent()._toPixelSpace(h));}};b.prototype.renderElement=function(r,h){var p=this.getParent();r.write("<rect");r.writeElementData(this);var o=p._toPixelSpace(this.getOriginX(),this.getOriginY());r.writeAttribute("x",o.x);r.writeAttribute("y",o.y);r.writeAttribute("width",p._toPixelSpace(this.getWidth()));r.writeAttribute("height",p._toPixelSpace(this.getHeight()));r.writeAttribute("fill",this.getFillColor());r.writeAttribute("stroke",this.getStrokeColor());r.writeAttribute("stroke-width",this.getStrokeWidth());if(this.getStrokeDashArray().length>0){r.writeAttribute("stroke-dasharray",this.getStrokeDashArray().toString());}r.writeAttribute("opacity",this.getOpacity());if(h){var c=this._colorToArray(this.getHaloColor());var d=c.join("");r.writeAttribute("filter","url(#halo"+d+")");}r.write("></rect>");};b.prototype.exportJSON=function(){return jQuery.extend(true,R.prototype.exportJSON.call(this),{type:a.ElementType.Rectangle,version:1,width:this.getWidth(),height:this.getHeight(),fillColor:this.getFillColor()});};b.prototype.importJSON=function(j){if(j.type===a.ElementType.Rectangle){if(j.version===1){R.prototype.importJSON.call(this,j);if(j.hasOwnProperty("width")){this.setWidth(j.width);}if(j.hasOwnProperty("height")){this.setHeight(j.height);}if(j.hasOwnProperty("fillColor")){this.setFillColor(j.fillColor);}}else{L("wrong version number");}}else{L("Redlining JSON import: Wrong element type");}return this;};b.prototype.exportSVG=function(){var e=document.createElementNS(a.svgNamespace,"rect");e.setAttribute("x",this.getOriginX());e.setAttribute("y",this.getOriginY());e.setAttribute("height",this.getHeight());e.setAttribute("width",this.getWidth());e.setAttribute("fill",this.getFillColor());e.setAttribute("stroke",this.getStrokeColor());e.setAttribute("stroke-width",this.getStrokeWidth());if(this.getStrokeDashArray().length>0){e.setAttribute("stroke-dasharray",this.getStrokeDashArray().toString());}if(this.getOpacity()<1){e.setAttribute("opacity",this.getOpacity());}e.setAttribute("data-sap-element-id",this.getElementId());e.setAttribute("data-sap-halo",this.getHalo());return e;};b.prototype.importSVG=function(s){if(s.tagName==="rect"){R.prototype.importSVG.call(this,s);if(s.getAttribute("width")){this.setWidth(parseFloat(s.getAttribute("width")));}if(s.getAttribute("height")){this.setHeight(parseFloat(s.getAttribute("height")));}if(s.getAttribute("fill")){this.setFillColor(s.getAttribute("fill"));}}else{L("Redlining SVG import: Wrong element type");}return this;};return b;});
