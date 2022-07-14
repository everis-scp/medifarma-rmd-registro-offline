/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Core","sap/ui/Device","./RenderUtils","../misc/Utility","sap/gantt/misc/Format","sap/ui/core/theming/Parameters","./BaseRectangle","./AdhocLineRenderer","./GanttUtils","./DeltaLineRenderer","./BaseLine","sap/gantt/simple/GanttExtension"],function(E,C,D,R,U,F,P,B,A,G,a,b,c){"use strict";var e=E.extend("sap.gantt.simple.GanttHeader",{metadata:{library:"sap.gantt",properties:{iHeaderMinheight:{type:"int",defaultValue:33},_iHeaderHeight:{type:"int",defaultValue:0},_iHeaderHeightInitial:{type:"int",defaultValue:0}},renderer:{apiVersion:2}}});e.prototype._setIHeaderHeight=function(v){this.setProperty("_iHeaderHeight",Math.floor(v),true);};e.prototype._getIHeaderHeight=function(){return this.getProperty("_iHeaderHeight");};e.prototype._setIHeaderHeightInitial=function(v){this.setProperty("_iHeaderHeightInitial",Math.floor(v),true);};e.prototype._getIHeaderHeightInitial=function(){return this.getProperty("_iHeaderHeightInitial");};var h=0;e.prototype.renderElement=function(){var r=C.createRenderManager(),g=this.getParent(),t;if(!g.getShowGanttHeader()){return;}var s=g.getId();var H=jQuery("div.sapGanttChartWithTableHeader[data-sap-ui-related="+s.replace(/([:.\[\],=@])/g,"\\$1")+"]");var T=this.getParent().getTable(),d=T.getAggregation("extension");t=d.filter(function(Q){if(Q instanceof sap.m.OverflowToolbar){return Q;}});this.iOverflowToolbarHeight=0;if(g.getEnableChartOverflowToolbar()){this.renderOverflowToolbar(r,g);var o=C.byId(s+"-ganttHeaderOverflowToolbar").getDomRef();if(t[0]){var f=C.byId(t[0].sId).getDomRef();if(f){this.iOverflowToolbarHeight=f.clientHeight;}}else if(o){this.iOverflowToolbarHeight=o.clientHeight;}}h=H[0].offsetHeight;if(this.iOverflowToolbarHeight&&g.getEnableChartOverflowToolbar()){h-=this.iOverflowToolbarHeight;}this._setIHeaderHeight(h);var j=R.getGanttRenderWidth(g);var m=0;var k=g.getSimpleAdhocLines().filter(function(Q){return Q.MarkerType!=sap.gantt.simple.MarkerType.None;});var l=g.getDeltaLines().filter(function(V){return V.getVisible();});var n,p,q;n=this._getIHeaderHeight()/4;p=(this._getIHeaderHeight()/5)*2;q=(this._getIHeaderHeight()/5)*4;if((k.length>0&&g.getEnableAdhocLine()===true)||(l.length>0&&g.getEnableDeltaLine()===true)){l=l.filter(function(V){return V.getVisible();});k=k.filter(function(V){return V;});var u=0;var v=0;var L;if((k.length>0&&g.getEnableAdhocLine()===true)&&(l.length>0&&g.getEnableDeltaLine()===true)){L=G.calculateLevelForMarkers(k,l);v=Math.max.apply(Math,L.adhocLines.map(function(Q){return Q.mProperties._level;}));u=Math.max.apply(Math,L.deltaLines.map(function(Q){return Q.mProperties._level;}));if(v>=u){m=(u*4)+((v-u)*8)+((u)*3)+3;}else{m=(u*4)+(u*3);}}else if(k.length>0&&g.getEnableAdhocLine()===true){L=G.calculateLevelForMarkers(k,[]);v=Math.max.apply(Math,L.adhocLines.map(function(Q){return Q.mProperties._level;}));m=v*8;}else if(l.length>0&&g.getEnableDeltaLine()===true){L=G.calculateLevelForMarkers([],l);u=Math.max.apply(Math,L.deltaLines.map(function(Q){return Q.mProperties._level;}));m=(u*4)+((u+1)*3);}if((this.iOverflowToolbarHeight&&!!t[0]&&g.getEnableChartOverflowToolbar())){g.getTable().setColumnHeaderHeight(this.getIHeaderMinheight()+m);}else if((this.iOverflowToolbarHeight)&&(!t[0]||g.getEnableChartOverflowToolbar())){g.getTable().setColumnHeaderHeight(this.getIHeaderMinheight()+m+this.iOverflowToolbarHeight);}else{g.getTable().setColumnHeaderHeight(this.getIHeaderMinheight()+m);}n=(this._getIHeaderHeight()-m)/4;p=((this._getIHeaderHeight()-m)/5)*2;q=((this._getIHeaderHeight()-m)/5)*4;}else{if((this.iOverflowToolbarHeight&&!!t[0]&&g.getEnableChartOverflowToolbar())){g.getTable().setColumnHeaderHeight(this.getIHeaderMinheight());}else if((this.iOverflowToolbarHeight)&&(!t[0]||g.getEnableChartOverflowToolbar())){g.getTable().setColumnHeaderHeight(this.getIHeaderMinheight()+this.iOverflowToolbarHeight);}else{g.getTable().setColumnHeaderHeight(this.getIHeaderMinheight());}}var w=g.getAxisTimeStrategy(),x=w.getTimeLineOption(),y=g.getAxisTime();var z=y.getTickTimeIntervalLabel(x,null,[0,j]);r.openStart("svg",s+"-header-svg");r.class("sapGanttChartHeaderSvg");r.attr("height",this._getIHeaderHeight()+"px");r.attr("width",j);if(this.iOverflowToolbarHeight&&g.getEnableChartOverflowToolbar()){r.attr("transform","translate(0,"+this.iOverflowToolbarHeight+")");}r.openEnd();r.openStart("g").openEnd();this.renderHeaderLabel(r,z[0],{y:p,className:"sapGanttTimeHeaderSvgText"});this.renderHeaderLabel(r,z[1],{y:q,className:"sapGanttTimeHeaderSvgTextMedium"});if(y.largeIntervalLabel&&!y.largeIntervalPath){for(var i=0;i<z[0].length;i++){if(z[0][i].value===y.firstTickPosition){z[0].splice(i,1);break;}}}this.renderIntervalLine(r,z[0],{start:0,end:n,className:"sapGanttTimeHeaderLargeIntervalSvgPath"});this.renderIntervalLine(r,z[1],{start:q,end:this._getIHeaderHeight(),className:"sapGanttTimeHeaderSvgPath"});r.close("g");if((g.getEnableAdhocLine()===true&&k.length>0)||(g.getEnableDeltaLine()===true&&l.length>0)){r.openStart("svg","inner-header-svg").openEnd();r.openStart("g","inner-header-g");r.style("height",m);r.openEnd();var I=new B({x:0,y:this._getIHeaderHeight()-m,height:"1px",width:"100%",fill:P.get("sapUiListVerticalBorderColor")});var J=this;I.renderElement(r,I);var K=g.getRenderedTimeRange(),M=K[0],N=K[1];k=k.filter(function(V){var Q=F.abapTimestampToDate(V.getTimeStamp());return Q>=M&&Q<=N&&V.getVisible()&&V.getMarkerType()===sap.gantt.simple.MarkerType.Diamond;});if(k.length>0){k.forEach(function(Q){A.renderMarker(r,Q,g,J._getIHeaderHeight(),m);});}if(l.length!==0){l.forEach(function(Q){a.renderDeltaLineHeader(r,Q,g,J._getIHeaderHeight(),m);});}r.close("g");r.close("svg");}var O=y.getNowLabel(g.getNowLineInUTC())[0].value;this.renderNowLineHeader(r,g,{headerHeight:this._getIHeaderHeight(),nowLineX:O,iMarkerArea:m});r.openStart("g");r.class("sapGanttChartHeaderSelection");r.openEnd().close("g");r.close("svg");r.flush(H.get(0));r.destroy();c.attachEvents(g);};e.prototype.renderHeaderLabel=function(r,l,m){var f=C.getConfiguration().getRTL();var i=(D.browser.msie||D.browser.edge)&&f;l.forEach(function(d){r.openStart("text");r.class(m.className);r.attr("text-anchor","start");r.attr("x",d.value+(f?-5:5));r.attr("y",m.y);if(i){var o=U.calculateStringLength(d.label)*(m.fontSize/2);r.attr("transform","translate("+(-o)+")");}r.openEnd();r.text(d.label);if(m.className==="sapGanttTimeHeaderSvgTextMedium"&&d.largeLabel){r.openStart("title").openEnd();r.text(d.largeLabel);r.close("title");}r.close("text");});};e.prototype.renderIntervalLine=function(r,l,m){var p="";for(var i=0;i<l.length;i++){var L=l[i];if(L){p+=" M"+" "+(L.value-1/2)+" "+m.start+" L"+" "+(L.value-1/2)+" "+m.end;}}r.openStart("path");r.attr("d",p);r.class(m.className);r.openEnd();r.close("path");};e.prototype.renderNowLineHeader=function(r,g,m){var d=g.getAdhocLines();var f=g.getDeltaLines();var n=m.headerHeight;var M=m.iMarkerArea;var H=n;if((g.getEnableAdhocLine()===true&&d.length>0)||(g.getEnableDeltaLine()===true&&f.length>0)){H=n-M;}var j=H,N=m.nowLineX;if(g.getEnableNowLine()===false||isNaN(N)){return;}var l=8;var k=l/2,t=Math.sqrt(l*l-k*k);var p=[[N,j],[N-k,j-t],[N+k,j-t],[N,j]].reduce(function(I,o,i){var q=o.join(",");return i===0?"M"+q:I+"L"+q;},"");r.openStart("g");r.class("sapGanttNowLineHeaderSvgPath");r.openEnd();r.openStart("path");r.attr("d",p);r.openEnd();r.close("path");r.close("g");if((g.getEnableAdhocLine()===true&&d.length>0)||(g.getEnableDeltaLine()===true&&f.length>0)){r.openStart("g");r.class("sapGanttNowLineBodySvgLine");r.openEnd();var s=new b({x1:N,y1:H,x2:N,y2:"100%",strokeWidth:1}).setProperty("childElement",true);s.renderElement(r,s);r.close("g");}};e.prototype.renderOverflowToolbar=function(r,g){var H=document.getElementById(g.getId()+"-ganttHeader").offsetWidth,s=g.getId();if(!this._oOverflowToolbar){this._oOverflowToolbar=new sap.m.OverflowToolbar(s+"-ganttHeaderOverflowToolbar",{design:"Solid",width:"100%"});this._oOverflowToolbar.addContent(new sap.m.ToolbarSpacer());}r.openStart("div",s+"-ganttHeaderOverflowToolbarContainer");r.style("width",H+"px");r.style("position","fixed");r.openEnd();r.renderControl(this._oOverflowToolbar);r.close("div");};e.prototype.exit=function(){if(this._oOverflowToolbar){this._oOverflowToolbar.destroy();}};return e;},true);
