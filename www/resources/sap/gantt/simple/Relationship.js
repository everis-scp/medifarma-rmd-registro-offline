/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/Device","sap/ui/core/Core","sap/ui/core/IconPool","./GanttUtils","./RenderUtils","./BasePath","sap/ui/core/theming/Parameters","sap/gantt/library"],function(D,C,I,G,R,B,P,l){"use strict";var a=l.simple.connectorType;var A=6,L=20,b=15,c={"FinishToFinish":0,"FinishToStart":1,"StartToFinish":2,"StartToStart":3};var S=l.simple.shapes.ShapeAlignment;var d=B.extend("sap.gantt.simple.Relationship",{metadata:{library:"sap.gantt",properties:{type:{type:"sap.gantt.simple.RelationshipType",group:"Appearance"},predecessor:{type:"string",group:"Data"},successor:{type:"string",group:"Data"},selectedStroke:{type:"sap.gantt.ValueSVGPaintServer",defaultValue:"#FF0000"},selectedStrokeWidth:{type:"sap.gantt.SVGLength",defaultValue:2},lShapeForTypeFS:{type:"boolean",defaultValue:true},lShapeForTypeSF:{type:"boolean",defaultValue:true},shapeTypeStart:{type:"sap.gantt.simple.connectorType",defaultValue:a.None},shapeTypeEnd:{type:"sap.gantt.simple.connectorType",defaultValue:a.Arrow},startShapeColor:{type:"sap.gantt.ValueSVGPaintServer",group:"Appearance"},endShapeColor:{type:"sap.gantt.ValueSVGPaintServer",group:"Appearance"},selectedStartShapeColor:{type:"sap.gantt.ValueSVGPaintServer",group:"Appearance"},selectedEndShapeColor:{type:"sap.gantt.ValueSVGPaintServer",group:"Appearance"},enableCurvedEdge:{type:"boolean",defaultValue:false},_lMarker:{type:"string"}}},renderer:{apiVersion:2}});d.prototype.applySettings=function(s){s=s||{};B.prototype.applySettings.apply(this,arguments);};d.prototype._getLMarker=function(){return this.getProperty("_lMarker");};d.prototype.renderElement=function(r,e,g){if(!e.getVisible()){return;}var m=this.getRelatedInRowShapes(g);if(!m.predecessor&&!m.successor){return;}var t=this.getProcessedType();var f=this.getRlsAnchors(t,m);var h=function(o){return jQuery.isNumeric(o.x)&&jQuery.isNumeric(o.y);};if(!h(f.predecessor)||!h(f.successor)){return;}this.mRelatedShapes=m;this.oGantt=sap.ui.getCore().byId(g);var n=this.getBaseRowHeight(g);this.calcLinePathD(f,n,t);this.renderRelationship(r,f,t,g);};d.prototype.getRlsAnchors=function(t,r){var p,s,o;var m=this.getShapeAnchors(r);if(r.predecessor&&r.successor){if(t===c.FinishToFinish){p=m.predecessor.tail;s=m.successor.tail;}else if(t===c.FinishToStart){p=m.predecessor.tail;s=m.successor.head;}else if(t===c.StartToFinish){p=m.predecessor.head;s=m.successor.tail;}else if(t===c.StartToStart){p=m.predecessor.head;s=m.successor.head;}}else if(r.predecessor&&!r.successor){if(t===c.FinishToFinish||t===c.FinishToStart){p=m.predecessor.tail;s={x:p.x+L,y:p.y};o={x:s.x,y:s.y+b/2};}else if(t===c.StartToFinish||t===c.StartToStart){p=m.predecessor.head;s={x:p.x-L,y:p.y};o={x:s.x-b,y:s.y+b/2};}}else if(!r.predecessor&&r.successor){if(t===c.FinishToFinish||t===c.StartToFinish){s=m.successor.tail;p={x:s.x+L,y:s.y};o={x:p.x,y:p.y+b/2};}else if(t===c.FinishToStart||t===c.StartToStart){s=m.successor.head;p={x:s.x-L,y:s.y};o={x:p.x-b,y:p.y+b/2};}}return{predecessor:p,successor:s,prompter:o};};d.prototype.calcLinePathD=function(m,n,t){var x=m.predecessor.x,y=m.predecessor.y;var e=m.successor.x,f=m.successor.y;var g,h=[x,y,e,f];this.setProperty("_lMarker","",true);var i=G.getEdgePoint(this.oGantt);if(y===f){g=this.calcIRlsPathD;}else if(y!==f){if(t===c.FinishToFinish){g=this.calcURlsPathD;h.push(false,i);}else if(t===c.FinishToStart){if(x<=e){if(C.getConfiguration().getRTL()?this.getLShapeForTypeSF():this.getLShapeForTypeFS()){if((i==2&&this.getShapeTypeStart()=='None')||(i==3&&Math.abs(x-e)>=i*A)){if(y>f){this.setProperty("_lMarker","rightUp",true);}else{this.setProperty("_lMarker","rightDown",true);}g=this.calcLRlsPathD;}else{g=this.calcSRlsPathD;h.push(n,t,i);}}else{if(Math.abs(x-e)>=2*i*A){g=this.calcZRlsPathD;h.push(i);}else{g=this.calcSRlsPathD;h.push(n,t,i);}}}else if(x>e){g=this.calcSRlsPathD;h.push(n,t,i);}}else if(t===c.StartToFinish){if(x<e){g=this.calcSRlsPathD;h.push(n,t,i);}else if(x>=e){if(C.getConfiguration().getRTL()?this.getLShapeForTypeFS():this.getLShapeForTypeSF()){if((i==2&&this.getShapeTypeStart()=='None')||(i==3&&Math.abs(x-e)>=i*A)){if(y>f){this.setProperty("_lMarker","leftUp",true);}else{this.setProperty("_lMarker","leftDown",true);}g=this.calcLRlsPathD;}else{g=this.calcSRlsPathD;h.push(n,t,i);}}else{if(Math.abs(x-e)>=2*i*A){g=this.calcZRlsPathD;h.push(i);}else{g=this.calcSRlsPathD;h.push(n,t,i);}}}}else if(t===c.StartToStart){g=this.calcURlsPathD;h.push(true,i);}}if(g===this.calcLRlsPathD){var j=m.successor.dyTop?m.successor.dyTop:m.successor.dy;var k=m.successor.dyBottom?m.successor.dyBottom:m.successor.dy;h[2]=(x<e)?e+m.successor.dx:e-m.successor.dx;h[3]=(y<f)?f-j:f+k;}this.setProperty("d",g.apply(this,h),true);};d.prototype.calcIRlsPathD=function(x,y,e,f){return this.getLinePathD([[x,y],[e,f]]);};d.prototype.calcLRlsPathD=function(x,y,e,f){return this.getLinePathD([[x,y],[e,y],[e,f]]);};d.prototype.calcURlsPathD=function(x,y,e,f,Y,g){var h=(x<e)?e+g*A:x+g*A;var i=(x<e)?x-g*A:e-g*A;var j=(!Y)?h:i;return this.getLinePathD([[x,y],[j,y],[j,f],[e,f]]);};d.prototype.calcSRlsPathD=function(x,y,e,f,n,t,g){var h=t==1?x+g*A:x-g*A;var i;switch(this.mRelatedShapes.predecessor.getAlignShape()){case S.Top:if(y<f){i=y+n-this.mRelatedShapes.predecessor.getDomRef().getBBox().height/2-1;}else{i=y-this.mRelatedShapes.predecessor.getDomRef().getBBox().height/2-1;}break;case S.Bottom:if(y<f){i=y+this.mRelatedShapes.predecessor.getDomRef().getBBox().height/2+1;}else{i=y-n+this.mRelatedShapes.predecessor.getDomRef().getBBox().height/2+1;}break;case S.Middle:default:if(y<f){i=y+n/2;}else{i=y-n/2;}break;}if(this.mRelatedShapes.predecessor.getDomRef("nonLabelGroup")){i=i-this.mRelatedShapes.predecessor.getDomRef().getBBox().height/4;}var j=t==1?e-g*A:e+g*A;return this.getLinePathD([[x,y],[h,y],[h,i],[j,i],[j,f],[e,f]]);};d.prototype.calcZRlsPathD=function(x,y,e,f,g){var h=(x<e)?x+g*A:x-g*A;return this.getLinePathD([[x,y],[h,y],[h,f],[e,f]]);};d.prototype.getConnectorEndPath=function(p,g,t){var T=function(v){return Number(v);};var e=p.match(/-?\d+(\.\d+)?/g).map(T);var f=[];var h;var x=this.getEnableCurvedEdge()?e[e.length-4]:e[e.length/2-2];var y=this.getEnableCurvedEdge()?e[e.length-3]:e[e.length/2-1];var i=this.getEnableCurvedEdge()?e[e.length-2]:e[e.length/2+0];var j=this.getEnableCurvedEdge()?e[e.length-1]:e[e.length/2+1];if(x==i){if(y>j){f=this.getCoordinateUpDown(i,j,"up");h=e[0]<i?"rightUp":"leftUp";}else{f=this.getCoordinateUpDown(i,j,"down");h=e[0]<i?"rightDown":"leftDown";}}else if(x!=i){f=x<i?this.getCoordinate(i,j,"rightEnd"):this.getCoordinate(i,j,"leftEnd");}return this.renderSvg(f,"end",g,t,h);};d.prototype.getConnectorStartPath=function(p,g,t){var T=function(v){return Number(v);};var e=p.match(/-?\d+(\.\d+)?/g).map(T);var x=e[0],y=e[1];var f=t==0||t==1?this.getCoordinate(x,y,"rightStart"):this.getCoordinate(x,y,"leftStart");return this.renderSvg(f,"start",g,t);};d.prototype.renderSvg=function(e,p,g,t,u){var f=[];var s=this._checkConnectorOverlap(g,t,p,u);if(s==a.Arrow){if(p=="start"){f.push(e[0],e[1],e[4],e[7]);}else{f.push(e[0],e[3],e[5]);}return d3.svg.line().interpolate("linear-closed")(f);}else if(s==a.Square){f.push(e[0],e[1],e[3],e[5],e[7]);return d3.svg.line().interpolate("linear-closed")(f);}else if(s==a.Diamond){f.push(e[0],e[2],e[4],e[6]);return d3.svg.line().interpolate("linear-closed")(f);}else if(s==a.Circle){f.push(e[0],e[1],e[3],e[5],e[7]);return d3.svg.line().interpolate("basis-closed")(f);}else if(s===a.HorizontalRectangle){f.push(e[0],e[1],e[9],e[10],e[7]);return d3.svg.line().interpolate("linear-closed")(f);}else if(s==a.VerticalRectangle){f.push(e[0],e[11],e[12],e[13],e[14]);return d3.svg.line().interpolate("linear-closed")(f);}else if(s==a.None){f.push(e[0]);return d3.svg.line().interpolate("linear")(f);}};d.prototype._checkConnectorOverlap=function(g,t,p,u){var o=sap.ui.getCore().byId(g);var v=G._getVisibleRelationships(o);var r=this.getRelatedInRowShapes(g);var i=C.getConfiguration().getRTL();var s,e,f,h=[];var j=function(m){e=[1,2];if(r.predecessor&&r.successor){v.forEach(function(x){if(x.mProperties.successor&&x.mProperties.predecessor){if(r.successor.mProperties.shapeId===x.getSuccessor()&&(e.indexOf(c[x.getType()])!==-1)&&x._getLMarker()===m){h.push(x.getShapeTypeEnd());}}});}h=G.getFilteredShapeType(h);var s=h.length>1?a.HorizontalRectangle:this.getShapeTypeEnd();if(s==a.VerticalRectangle||s==a.HorizontalRectangle){s=s==a.VerticalRectangle?a.HorizontalRectangle:a.VerticalRectangle;}return s;}.bind(this);var k=function(s,m){return s===a.Arrow?m:s;};if(p=="start"){if(i){e=t==0||t==1?[2,3]:[0,1];f=t==0||t==1?[1,3]:[0,2];}else{e=t==0||t==1?[0,1]:[2,3];f=t==0||t==1?[0,2]:[1,3];}if(r.predecessor&&r.successor){v.forEach(function(x){if(x.mProperties.successor&&x.mProperties.predecessor){if(r.predecessor.mProperties.shapeId==x.getPredecessor()&&(e.indexOf(c[x.getType()])!==-1)){h.push(k(x.getShapeTypeStart(),"ArrowStart"));}if(r.predecessor.mProperties.shapeId==x.getSuccessor()&&(f.indexOf(c[x.getType()])!==-1)&&x._getLMarker()==""){h.push(k(x.getShapeTypeEnd(),"ArrowEnd"));}}});}h=G.getFilteredShapeType(h);s=h.length>1?a.HorizontalRectangle:this.getShapeTypeStart();}else{if(u=="rightUp"||u=="rightDown"||u=="leftUp"||u=="leftDown"){s=j(u);}else{if(i){e=(t==1||t==3)?[0,2]:[1,3];f=(t==1||t==3)?[0,1]:[2,3];}else{e=(t==1||t==3)?[1,3]:[0,2];f=(t==1||t==3)?[2,3]:[0,1];}if(r.predecessor&&r.successor){v.forEach(function(x){if(x.mProperties.successor&&x.mProperties.predecessor){if(r.successor.mProperties.shapeId==x.getSuccessor()&&(e.indexOf(c[x.getType()])!==-1)&&x._getLMarker()==""){h.push(k(x.getShapeTypeEnd(),"ArrowEnd"));}if(r.successor.mProperties.shapeId==x.getPredecessor()&&(f.indexOf(c[x.getType()]))!==-1){h.push(k(x.getShapeTypeStart(),"ArrowStart"));}}});}h=G.getFilteredShapeType(h);s=h.length>1?a.HorizontalRectangle:this.getShapeTypeEnd();}}return s;};d.prototype.getCoordinate=function(x,y,f){var e=(f=="rightStart"||f=="leftEnd")?x+A/2:x-A/2;var g=(f=="rightStart"||f=="leftEnd")?x+A:x-A;var h=(f=="rightStart"||f=="leftEnd")?x+2*A:x-2*A;var t=[[x,y],[x,y-A/2],[e,y-A/2],[g,y-A/2],[g,y],[g,y+A/2],[e,y+A/2],[x,y+A/2],[e,y],[h,y-A/2],[h,y+A/2],[x,y-A],[g,y-A],[g,y+A],[x,y+A]];return t;};d.prototype.getCoordinateUpDown=function(x,y,f){var e=f=="up"?y+A/2:y-A/2;var g=f=="up"?y+A:y-A;var h=f=="up"?y+2*A:y-2*A;var t=[[x,y],[x+A/2,y],[x+A/2,e],[x+A/2,g],[x,g],[x-A/2,g],[x-A/2,e],[x-A/2,y],[x,e],[x+A/2,h],[x-A/2,h],[x+A,y],[x+A,g],[x-A,g],[x-A,y]];return t;};d.prototype.getShapeAnchors=function(r){var m={predecessor:null,successor:null};Object.keys(r).forEach(function(k){var s=r[k];if(s==null){return;}if(s.getShapeAnchors){m[k]=s.getShapeAnchors();}else{var o,h,e;if(s.getDomRef("nonLabelGroup")){o=s.getDomRef("nonLabelGroup").getBBox();h=3/4;e=1/4;}else{o=s.getDomRef().getBBox();h=1/2;e=1/2;}var t,T=0;t=window.getComputedStyle(s.getDomRef()).transform.match(/matrix.*\((.+)\)/);if(t){T=t[1].split(', ')[5];}m[k]={head:{x:o.x,y:o.y+o.height*h+(parseFloat(T)),dx:0,dyTop:o.height*h,dyBottom:o.height*e},tail:{x:o.x+o.width,y:o.y+o.height*h+(parseFloat(T)),dx:0,dyTop:o.height*h,dyBottom:o.height*e}};}});return m;};d.prototype.renderRelationship=function(r,m,t,g){this.writeElementData(r,"g",true);R.renderAttributes(r,this,["style"]);r.openEnd();R.renderTooltip(r,this);r.openStart("path");if(!this.getEnableCurvedEdge()||m.prompter){r.attr("d",this.getD());}else{r.style("fill","none");r.attr("d",G.getPathCorners(this.getD(),5));}r.openEnd().close("path");r.openStart("path");r.style("fill",this.getStartShapeColor());r.style("stroke-dasharray","none");r.attr("d",this.getConnectorStartPath(this.getD(),g,t));r.openEnd().close("path");r.openStart("path");r.style("fill",this.getEndShapeColor());r.style("stroke-dasharray","none");r.attr("d",this.getConnectorEndPath(this.getD(),g,t));r.openEnd().close("path");if(m.prompter){r.openStart("text");r.attr("x",m.prompter.x);r.attr("y",m.prompter.y);r.attr("font-size",b);r.attr("font-family","SAP-icons");r.attr("text-anchor",(C.getConfiguration().getRTL()&&!D.browser.msie&&!D.browser.edge)?"end":"start");r.attr("stroke-width",0);r.openEnd();r.text(I.getIconInfo("chain-link").content);r.close("text");}r.close("g");};d.prototype.getStyle=function(){return this.getInlineStyle({"fill":this.getStroke()||P.get("sapUiBaseText"),"stroke":this.getStroke()||P.get("sapUiBaseText"),"stroke-width":this.getStrokeWidth()||1,"stroke-dasharray":this.getStrokeDasharray(),"opacity":this.getStrokeOpacity()});};d.prototype.getLinePathD=function(p){if(this.getEnableCurvedEdge()){return d3.svg.line().interpolate("linear")(p);}else{p=p.concat(p.slice(1,-1).reverse());return d3.svg.line().interpolate("linear-closed")(p);}};d.prototype.getSelectedStyle=function(){return this.getInlineStyle({"fill":this.getSelectedStroke(),"stroke":this.getSelectedStroke(),"stroke-width":this.getSelectedStrokeWidth(),"stroke-dasharray":this.getStrokeDasharray(),"pointer-events":"none"});};d.prototype.getBaseRowHeight=function(g){return C.byId(g).getTable()._getDefaultRowHeight();};d.prototype.getProcessedType=function(){var t=this.getProperty("type");var i=C.getConfiguration().getRTL();return i?3-c[t]:c[t];};d.prototype.getRelatedInRowShapes=function(g){return{predecessor:G.shapeElementById(this.getPredecessor(),g+"-svg"),successor:G.shapeElementById(this.getSuccessor(),g+"-svg")};};return d;},true);
