/*
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/thirdparty/jquery",'./ProcessFlowLaneHeader','./ProcessFlowZoomLevel','./AriaProperties','sap/ui/Device',"sap/base/security/encodeXML"],function(q,P,a,A,D,e){"use strict";var b={};b.render=function(r,c){var s=this._getZoomStyleClass(c),C,l,L,p=b,d,o;o=p._renderBasicStructure(r,c);if(o){return;}try{C=c._getOrCreateProcessFlow();l=c._getOrCreateLaneMap();d=c._getConnectionsMap();}catch(f){c._handleException(f);return;}r.write("<table");r.writeAttribute("id",c.getId()+"-table");r.writeAttributeEscaped("aria-label",c._getAriaText());r.addClass("sapSuiteUiCommonsPF");r.addClass(e(s));r.writeClasses();r.write(">");L=Object.keys(l).length;p._renderTableHeader(r,c,l,L);p._renderTableBody(r,c,L,C,d);r.write("</table>");r.write("</div>");r.write("</div>");this._writeCounter(r,c,"Right");r.renderControl(c._getScrollingArrow("right"));r.write("</div>");};b._renderNormalNodeHeader=function(r,c,n,d,l){r.write("<th colspan=\"3\">");r.renderControl(n);r.write("</th>");if(d<l-1){r.write("<th colspan=\"2\">");var L=P.createNewProcessSymbol(c._isHeaderMode());L.attachPress(q.proxy(c.ontouchend,c));r.renderControl(L);r.write("</th>");}};b._renderMergedNodeHeader=function(r,c,n,d,l,f){var N=c._mergeLaneIdNodeStates(l);n.setState(N);d++;var g=d*3+(d-1)*2;r.write("<th colspan=\""+g+"\">");r.renderControl(n);r.write("</th>");if(f){r.write("<th colspan=\"2\">");var L=P.createNewProcessSymbol(c._isHeaderMode());L.attachPress(q.proxy(c.ontouchend,c));r.renderControl(L);r.write("</th>");}};b._renderNode=function(r,c,n,i){if(i){var N=n.getId()+"-node";var C=n._getCurrentZoomLevelContent();r.writeAttribute("id",N);r.writeAttribute("tabindex",0);var o={};o.label=n._getAriaText();if(C){o.labelledBy=N+" "+C.getId();}A.writeAriaProperties(r,o,n.getAriaProperties());r.write(">");i=false;}n._setParentFlow(c);n._setZoomLevel(c.getZoomLevel());n._setFoldedCorner(c.getFoldedCorners());r.renderControl(n);return i;};b._renderConnection=function(r,c,d,i){if(i){if(d.getAggregation("_labels")&&d.getAggregation("_labels").length>0){r.writeAttribute("tabindex",0);}r.write(">");i=false;}d.setZoomLevel(c.getZoomLevel());c.addAggregation("_connections",d);r.renderControl(d);return i;};b._renderTableHeader=function(r,c,l,d){var L,n=null,N=null,o,f;r.write("<thead");r.writeAttribute("id",c.getId()+"-thead");r.write(">");r.write("<tr");r.addClass("sapSuiteUiCommonsPFHeader");r.addClass("sapSuiteUiCommonsPFHeaderHidden");if(c.getShowLabels()){r.addClass("sapSuiteUiPFWithLabel");}r.writeClasses();r.write(">");r.write("<th></th>");L=0;while(L<d-1){r.write("<th></th><th></th><th></th><th></th><th></th>");L++;}r.write("<th></th><th></th><th></th>");r.write("<th></th>");r.write("</tr>");r.write("<tr");r.addClass("sapSuiteUiCommonsPFHeaderRow");r.writeClasses();r.write(">");r.write("<th>");o=P.createNewStartSymbol(c._isHeaderMode());r.renderControl(o);r.write("</th>");L=0;var i=0;var g=[];var s="1";f=false;while(L<(d-1)){n=l[L];N=l[L+1];if(n.getLaneId()+s===N.getLaneId()){i=i+1;g.push(n.getState());}else if(i===0){this._renderNormalNodeHeader(r,c,n,L,d);}else{g.push(n.getState());f=true;this._renderMergedNodeHeader(r,c,n,i,g,f);g=[];i=0;}L++;}if(i===0){if(!N){N=l[0];}this._renderNormalNodeHeader(r,c,N,L,d);}else{g.push(N.getState());f=false;this._renderMergedNodeHeader(r,c,n,i,g,f);i=0;}r.write("<th>");o=P.createNewEndSymbol(c._isHeaderMode());r.renderControl(o);r.write("</th>");r.write("</tr>");r.write("</thead>");};b._renderTableBody=function(r,c,l,d,f){var i,j,m,M,n;var s=b._checkIfHighlightedOrSelectedNodesExists(f);r.write("<tbody>");m=d.length;if(m>0){r.write("<tr>");r.write("<td");r.writeAttributeEscaped("colspan",(l*5).toString());r.write(">");r.write("</tr>");}i=0;while(i<m){r.write("<tr>");r.write("<td></td>");M=d[i].length;j=0;while(j<M-1){n=d[i][j];var g=true;if((j==0)||(j%2)){r.write("<td");}else{r.write("<td colspan=\"4\"");if(D.browser.chrome){r.addClass("sapSuiteUiCommonsProcessFlowZIndexForConnectors");r.writeClasses();}}if(n){if(n.getMetadata().getName()==="sap.suite.ui.commons.ProcessFlowNode"){g=b._renderNode(r,c,n,g);}else{n._setShowLabels(c.getShowLabels());b._setLabelsInConnection(d,f,n,{row:i,column:j},c,s);g=b._renderConnection(r,c,n,g);}}if(g){r.write(">");}r.write("</td>");j++;}r.write("<td></td>");r.write("<td></td>");r.write("</tr>");i++;}r.write("</tbody>");};b._renderBasicStructure=function(r,c){r.write("<div");var o={};o.label=c._getAriaText();A.writeAriaProperties(r,o,c.getAriaProperties());r.writeControlData(c);r.addClass("sapSuiteUiPFContainer");if(c._arrowScrollable){r.addClass("sapPFHScrollable");if(c._bPreviousScrollForward){r.addClass("sapPFHScrollForward");}else{r.addClass("sapPFHNoScrollForward");}if(c._bPreviousScrollBack){r.addClass("sapPFHScrollBack");}else{r.addClass("sapPFHNoScrollBack");}}else{r.addClass("sapPFHNotScrollable");}r.writeClasses();r.write(">");this._writeCounter(r,c,"Left");r.renderControl(c._getScrollingArrow("left"));r.write("<div");r.writeAttribute("id",c.getId()+"-scrollContainer");r.addClass("sapSuiteUiScrollContainerPF");r.addClass("sapSuiteUiDefaultCursorPF");r.writeClasses();r.write(">");r.write("<div");r.writeAttribute("id",c.getId()+"-scroll-content");r.writeAttribute("tabindex",0);r.write(">");if(!c.getLanes()||c.getLanes().length==0){r.write("</div>");r.write("</div>");r.write("</div>");return true;}return false;};b._getZoomStyleClass=function(c){switch(c.getZoomLevel()){case a.One:return"sapSuiteUiCommonsPFZoomLevel1";case a.Two:return"sapSuiteUiCommonsPFZoomLevel2";case a.Three:return"sapSuiteUiCommonsPFZoomLevel3";case a.Four:return"sapSuiteUiCommonsPFZoomLevel4";default:break;}};b._setLabelsInConnection=function(c,d,f,p,C,s){for(var i=0;i<d.length;i++){var o=d[i];if(o&&o.label){for(var j=0;j<o.connectionParts.length;j++){var g=o.connectionParts[j];if(g.x===p.column&&g.y===p.row){if(c[p.row][p.column+1]&&c[p.row][p.column+1].getMetadata().getName()==="sap.suite.ui.commons.ProcessFlowNode"&&c[p.row][p.column+1].getNodeId()===o.targetNode.getNodeId()){b._setLineTypeInLabel(o,s);if(C._bHighlightedMode&&!o.label._getHighlighted()){o.label.setEnabled(false);}if(o.label.getEnabled()){if(o.label.hasListeners("press")){o.label.detachEvent("press",C._handleLabelClick,C);}o.label.attachPress(C._handleLabelClick,C);}f.addAggregation("_labels",o.label,true);}}}}}};b._setLineTypeInLabel=function(c,s){var C=false,t,l=false,d=false;if(c.sourceNode.getSelected()&&c.targetNode.getSelected()){C=true;c.label._setSelected(true);}else{c.label._setSelected(false);}t=c.targetNode;if(t.getHighlighted()){var p=t.getParents(),S;for(var i=0;i<p.length;i++){S=sap.ui.getCore().byId(p[i]);if(S.getHighlighted()){l=true;break;}}}if(l){d=true;c.label._setHighlighted(true);}else{c.label._setHighlighted(false);}if(s&&!C&&!d){c.label._setDimmed(true);}else{c.label._setDimmed(false);}};b._checkIfHighlightedOrSelectedNodesExists=function(c){var s=false;for(var i=0;i<c.length;i++){var C=c[i];if(C.label){if(C.sourceNode.getSelected()&&C.targetNode.getSelected()||C.sourceNode.getHighlighted()&&C.targetNode.getHighlighted()){s=true;}}}return s;};b._writeCounter=function(r,c,d){r.write("<span");r.writeAttributeEscaped("id",c.getId()+"-counter"+d);r.addClass("suiteUiPFHCounter");r.addClass(e("suiteUiPFHCounter"+d));r.writeClasses();r.write(">");r.writeEscaped("0");r.write("</span>");};return b;},true);
