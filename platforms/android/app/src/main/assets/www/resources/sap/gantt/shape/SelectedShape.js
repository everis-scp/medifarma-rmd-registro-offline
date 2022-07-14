/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/base/Log","sap/gantt/shape/Path","sap/gantt/misc/Format","sap/ui/core/Core"],function(L,P,F,C){"use strict";var S=P.extend("sap.gantt.shape.SelectedShape",{metadata:{properties:{fill:{type:"string",defaultValue:"none"},fillOpacity:{type:"float",defaultValue:0},strokeOpacity:{type:"float",defaultValue:0},height:{type:"int",defaultValue:15}}}});S.prototype.getFillOpacity=function(d){return this._configFirst("fillOpacity",d);};S.prototype.getStrokeOpacity=function(d){return this._configFirst("strokeOpacity",d);};S.prototype.getIsDuration=function(d,r){if(this.mShapeConfig.hasShapeProperty("isDuration")){return this._configFirst("isDuration",d);}return this.getParent().getIsDuration();};S.prototype.getD=function(d,R){var s,x,a,y,b;var p="";var c=this.getParent().getTag();switch(c){case"rect":case"image":s=this.getStrokeWidth(d,R);x=this.getParent().getX(d,R)-s/2;y=this.getParent().getY(d,R)-s/2;a=x+this.getParent().getWidth(d,R)+s;b=y+this.getParent().getHeight(d)+s;p="M "+x+" "+y+" L "+a+" "+y+" L "+a+" "+b+" L "+x+" "+b+" z";break;case"line":s=this.getStrokeWidth(d,R);x=this.getParent().getX1(d,R)-s/2;y=this.getParent().getY1(d,R)-s/2;a=this.getParent().getX2(d,R)+s;b=this.getParent().getY2(d,R)+s;p="M "+x+" "+y+" L "+a+" "+y+" L "+a+" "+b+" L "+x+" "+b+" z";break;case"path":p=this.getParent().getD(d,R);break;case"clippath":p=this.getParent().getPaths()[0].getD(d,R);break;case"polygon":case"polyline":var j=this.getParent().getPoints(d,R);var k=j.split(" ");if(k!==undefined&&k[0]==""){k.splice(0,1);}if(k!==undefined&&k.length>1){p="M ";var l;for(var i in k){l=k[i].split(",");if(k[i]!==""&&l.length>1){if(i==k.length-1){if(c==="polygon"){p=p+l[0]+" "+l[1]+" z";}else{p=p+l[0]+" "+l[1];}}else{p=p+l[0]+" "+l[1]+" L ";}}}}break;case"circle":var m,n,r;m=this.getParent().getCx(d,R);n=this.getParent().getCy(d,R);r=this.getParent().getR(d);p="M "+m+" "+n+" A "+r+" "+r+", 0, 1, 1, "+m+" "+n;break;case"text":break;default:var w;var e=this.getParent().getStrokeWidth(d,R);s=this.getStrokeWidth(d,R);var f=this.getParent().getTime(d,R);var g=this.getParent().getEndTime(d,R);var A=this.getParent().getAxisTime();var h=this.getHeight(d);if(C.getConfiguration().getRTL()){x=A.timeToView(F.abapTimestampToDate(g));a=A.timeToView(F.abapTimestampToDate(f));}else{x=A.timeToView(F.abapTimestampToDate(f));a=A.timeToView(F.abapTimestampToDate(g));}if(this.getParent().mShapeConfig.hasShapeProperty("y")){y=this.getParent()._configFirst("y",d)-s/2;}else{y=this.getParent().getRowYCenter(d,R)-h/2;}if(this.getParent().mShapeConfig.hasShapeProperty("width")){w=this.getParent()._configFirst("width",d)+s;}else{w=a-x-e-1+s;}if(w===0||w<0||!w){w=2;}a=x+w;b=y+h;p="M "+x+" "+y+" L "+a+" "+y+" L "+a+" "+b+" L "+x+" "+b+" z";break;}if(this.isValid(p)){return p;}else{L.warning("SelectedShape generated invalid d: "+p+" from the given data: "+d);return null;}};S.prototype.getStroke=function(d,r){return"red";};S.prototype.getFill=function(d,r){return"none";};S.prototype.getStrokeWidth=function(d,r){var s=this.getParent().getStrokeWidth(d,r);return s?s:2;};S.prototype.getTransform=function(d,r){return this.getParent().getTransform(d,r);};S.prototype.getEnableDnD=function(d,r){return false;};S.prototype.getEnableSelection=function(d,r){return false;};S.prototype.getHeight=function(d){return this._configFirst("height",d,true);};return S;},true);
