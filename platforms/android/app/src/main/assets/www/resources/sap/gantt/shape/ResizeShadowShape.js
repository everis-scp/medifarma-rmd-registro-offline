/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/base/Log","sap/gantt/shape/Path","sap/gantt/misc/Format","sap/ui/core/Core"],function(L,P,F,C){"use strict";var R=P.extend("sap.gantt.shape.ResizeShadowShape",{metadata:{properties:{height:{type:"int",defaultValue:15}}}});R.prototype.getIsDuration=function(d,r){if(this.mShapeConfig.hasShapeProperty("isDuration")){return this._configFirst("isDuration",d);}return this.getParent().getIsDuration();};R.prototype.getD=function(d,o){var s,x,a,y,b;var p="";var c=this.getParent().getTag();switch(c){case"rect":case"image":s=this.getStrokeWidth(d,o);x=this.getParent().getX(d,o)-s/2;y=this.getParent().getY(d,o)-s/2;a=x+this.getParent().getWidth(d,o)+s;b=y+this.getParent().getHeight(d)+s;p="M "+x+" "+y+" L "+a+" "+y+" L "+a+" "+b+" L "+x+" "+b+" z";break;case"line":s=this.getStrokeWidth(d,o);x=this.getParent().getX1(d,o)-s/2;y=this.getParent().getY1(d,o)-s/2;a=this.getParent().getX2(d,o)+s;b=this.getParent().getY2(d,o)+s;p="M "+x+" "+y+" L "+a+" "+y+" L "+a+" "+b+" L "+x+" "+b+" z";break;case"path":p=this.getParent().getD(d,o);break;case"clippath":p=this.getParent().getPaths()[0].getD(d,o);break;case"polygon":case"polyline":var j=this.getParent().getPoints(d,o);var k=j.split(" ");if(k!==undefined&&k[0]==""){k.splice(0,1);}if(k!==undefined&&k.length>1){p="M ";var l;for(var i in k){l=k[i].split(",");if(k[i]!==""&&l.length>1){if(i==k.length-1){if(c==="polygon"){p=p+l[0]+" "+l[1]+" z";}else{p=p+l[0]+" "+l[1];}}else{p=p+l[0]+" "+l[1]+" L ";}}}}break;case"circle":var m,n,r;m=this.getParent().getCx(d,o);n=this.getParent().getCy(d,o);r=this.getParent().getR(d);p="M "+m+" "+n+" A "+r+" "+r+", 0, 1, 1, "+m+" "+n;break;case"text":break;default:var w;var e=this.getParent().getStrokeWidth(d,o);s=this.getStrokeWidth(d,o);var f=this.getParent().getTime(d,o);var g=this.getParent().getEndTime(d,o);var A=this.getParent().getAxisTime();var h=this.getHeight(d)+e;if(C.getConfiguration().getRTL()){x=A.timeToView(F.abapTimestampToDate(g));a=A.timeToView(F.abapTimestampToDate(f));}else{x=A.timeToView(F.abapTimestampToDate(f));a=A.timeToView(F.abapTimestampToDate(g));}if(this.getParent().mShapeConfig.hasShapeProperty("y")){y=this.getParent()._configFirst("y",d)-s/2;}else{y=this.getParent().getRowYCenter(d,o)-h/2-s/2;}if(this.getParent().mShapeConfig.hasShapeProperty("width")){w=this.getParent()._configFirst("width",d)+s;}else{w=a-x-e-1+s;}if(w===0||w<0||!w){w=2;}a=x+w;b=y+h;p="M "+x+" "+y+" L "+a+" "+y+" L "+a+" "+b+" L "+x+" "+b+" z";break;}if(this.isValid(p)){return p;}else{L.warning("ResizeShadowShape generated invalid d: "+p+" from the given data: "+d);return null;}};R.prototype.getStrokeWidth=function(d,r){var s=this.getParent().getStrokeWidth(d,r);return s?s:2;};R.prototype.getTransform=function(d,r){return this.getParent().getTransform(d,r);};R.prototype.getEnableSelection=function(d,r){return false;};R.prototype.getStroke=function(d,r){return"red";};R.prototype.getFill=function(d,r){return"none";};R.prototype.getHeight=function(d){return this._configFirst("height",d,true);};return R;},true);
