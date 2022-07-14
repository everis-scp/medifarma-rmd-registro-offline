/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Element"],function(E){"use strict";var I=function(p){p=p||{};E.call(this,p);this.type="Image";this.x=p.x||0;this.y=p.y||0;this.width=p.width||0;this.height=p.height||0;this.data=p.data||null;this.setMaterial(p.material);};I.prototype=Object.assign(Object.create(E.prototype),{constructor:I});I.prototype.tagName=function(){return"image";};I.prototype.setMaterial=function(m,i){if(m&&this.materialId===m.materialId){var a=m.textureWidth;var b=m.textureHeight;if(a&&b){this.width=a;this.height=b;}if(m.texture){this.data=m.texture;}if(i){this.invalidate();}}};I.prototype._setSpecificAttributes=function(s,d){if(this.x){s("x",this.x);}if(this.y){s("y",this.y);}if(this.width>0&&this.height>0&&this.data){s("width",this.width);s("height",this.height);if(d){d.setAttributeNS("http://www.w3.org/1999/xlink","href",this.data);}else{s("xlink:href",this.data);}}};I.prototype._expandBoundingBox=function(b,m){var h=this.width*0.5;var a=this.height*0.5;this._expandBoundingBoxCE(b,m,this.x+h,this.y+a,h,a);};I.prototype.copy=function(s,r){E.prototype.copy.call(this,s,r);this.x=s.x;this.y=s.y;this.width=s.width;this.height=s.height;this.data=s.data;return this;};return I;});
