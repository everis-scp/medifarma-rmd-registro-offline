/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["jquery.sap.global","./RedlineElement","./Redline"],function(q,R,a){"use strict";var b=R.extend("sap.ui.vk.RedlineElementLine",{metadata:{library:"sap.ui.vk",properties:{deltaX:{type:"float",defaultValue:0},deltaY:{type:"float",defaultValue:0}}}});b.prototype.edit=function(o,c){var p=this.getParent(),t=p._toVirtualSpace(o,c);this.setDeltaX(t.x-this.getOriginX());this.setDeltaY(t.y-this.getOriginY());return this;};b.prototype.applyZoom=function(z){this.setProperty("deltaX",this.getDeltaX()*z);this.setProperty("deltaY",this.getDeltaY()*z);return this;};b.prototype.getP2=function(v){return this.getParent()._toPixelSpace(this.getOriginX()+this.getDeltaX(),this.getOriginY()+this.getDeltaY());};b.prototype.setDeltaX=function(v){this.setProperty("deltaX",v);var d=this.getDomRef();if(d){d.setAttribute("x2",this.getP2().x);}};b.prototype.setDeltaY=function(v){this.setProperty("deltaY",v);var d=this.getDomRef();if(d){d.setAttribute("y2",this.getP2().y);}};b.prototype.renderElement=function(r,h){var p=this.getParent()._toPixelSpace(this.getOriginX(),this.getOriginY());var c=this.getP2();r.write("<line");r.writeElementData(this);r.writeAttribute("x1",p.x);r.writeAttribute("y1",p.y);r.writeAttribute("x2",c.x);r.writeAttribute("y2",c.y);r.writeAttribute("stroke",this.getStrokeColor());r.writeAttribute("stroke-width",this.getStrokeWidth());if(this.getStrokeDashArray().length>0){r.writeAttribute("stroke-dasharray",this.getStrokeDashArray().toString());}r.writeAttribute("opacity",this.getOpacity());if(h){r.writeAttribute("filter","url(#halo)");}r.write("></line>");};b.prototype.exportJSON=function(){return q.extend(true,R.prototype.exportJSON.call(this),{type:a.ElementType.Line,version:1,deltaX:this.getDeltaX(),deltaY:this.getDeltaY()});};b.prototype.importJSON=function(j){if(j.type===a.ElementType.Line){if(j.version===1){R.prototype.importJSON.call(this,j);if(j.hasOwnProperty("deltaX")){this.setDeltaX(j.deltaX);}if(j.hasOwnProperty("deltaY")){this.setDeltaY(j.deltaY);}}else{q.sap.log.error("wrong version number");}}else{q.sap.log.error("Redlining JSON import: Wrong element type");}return this;};b.prototype.exportSVG=function(){var e=document.createElementNS(a.svgNamespace,"line");e.setAttribute("x1",this.getOriginX());e.setAttribute("y1",this.getOriginY());e.setAttribute("x2",this.getOriginX()+this.getDeltaX());e.setAttribute("y2",this.getOriginY()+this.getDeltaY());e.setAttribute("stroke",this.getStrokeColor());e.setAttribute("stroke-width",this.getStrokeWidth());if(this.getStrokeDashArray().length>0){e.setAttribute("stroke-dasharray",this.getStrokeDashArray().toString());}if(this.getOpacity()<1){e.setAttribute("opacity",this.getOpacity());}e.setAttribute("data-sap-element-id",this.getElementId());e.setAttribute("data-sap-halo",this.getHalo());return e;};b.prototype.importSVG=function(s){if(s.tagName==="line"){R.prototype.importSVG.call(this,s);if(s.getAttribute("x1")){this.setOriginX(parseFloat(s.getAttribute("x1")));}if(s.getAttribute("y1")){this.setOriginY(parseFloat(s.getAttribute("y1")));}if(s.getAttribute("x2")){this.setDeltaX(parseFloat(s.getAttribute("x2"))-this.getOriginX());}if(s.getAttribute("y2")){this.setDeltaY(parseFloat(s.getAttribute("y2"))-this.getOriginY());}}else{q.sap.log("Redlining SVG import: Wrong element type");}return this;};return b;});
