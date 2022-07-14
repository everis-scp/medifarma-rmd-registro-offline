/*!
 * (c) Copyright 2010-2019 SAP SE or an SAP affiliate company.
 */
sap.ui.define(["jquery.sap.global","sap/zen/crosstab/TouchHandler","sap/zen/crosstab/SelectionHandler","sap/zen/crosstab/rendering/CrossRequestManager","sap/zen/crosstab/rendering/RenderingConstants","sap/zen/crosstab/utils/Utils","sap/zen/crosstab/keyboard/CrosstabKeyboardNavHandler","sap/zen/crosstab/HeaderResizer","sap/zen/crosstab/ColResizer"],function(q,T,S,C,R,U,a,H,b){"use strict";q.sap.declare("sap.zen.crosstab.EventHandler");sap.zen.crosstab.EventHandler=function(c){var t=this;var r=c.getRenderEngine();var o=r.getCrossRequestManager();var k=new a(c,this);var m=null;var p=false;var d=null;var s="";var I=null;var h=null;var f=null;this.handleHierarchyClick=function(e,i,u){var v=l(i);var w=v.getHierarchyAction();var D=v.getDrillState();if(D!=="L"){o.saveTableDimensions();o.saveHScrollInfo(u);o.saveVScrollInfo(u);n(w);}U.cancelEvent(e);};this.handleSortClick=function(e,i,u){var v=l(i);var w=v.getSortAction();if(w||c.getTestProxy().getTestAction()){o.saveVScrollInfo(u);o.saveHScrollInfo(u);o.saveColWidths();if(!c.getTestProxy().getTestAction()){n(w);}}U.cancelEvent(e);};this.findTargetId=function(D){var e=null;var J;var i;i=q(D).attr("xtabspacer-cellid");if(i&&i.length>0){e=i;}else{J=q(D).closest("div");if(J.length>0){var u=J.attr("id");if(u){var v=u.indexOf("_contentDiv");if(v>-1){e=u.slice(0,v);}}}}return e;};this.executeOnClickAction=function(e){if(p){return;}m=null;p=false;var i=e.target.id;if(!i){i=t.findTargetId(e.target);}if(!i){return;}var u=j(i);if(u==="sort"){t.handleSortClick(e,i,u);}else if(u==="hier"){t.handleHierarchyClick(e,i,u);}else if(u==="__ce"){t.handleClickOnCell(e,i);}else if(u==="vhlp"){t.handleValueHelpClick(i);}U.cancelEvent(e);};this.handleClickOnCell=function(e,i){if(c.hasLoadingPages()){U.cancelEvent(e);return;}if(i){var u=c.getUtils().getCellIdFromContenDivId(i);if(u){var M=sap.ui.getCore().getControl(u);if(M){if(M.isEntryEnabled()){t.handleInputEnabledCell(i,-1,-1);}else{if(c.getSelectionMode()!==undefined&&c.getSelectionMode()!==""){var F="";if(e.ctrlKey){F="CTRL";}else if(e.shiftKey){F="SHIFT";}c.getSelectionHandler().handleCellClick(M,F);}}}}}};this.postPlanningValue=function(){if(c.isPlanningMode()===true&&I&&I.length>0){var J=q(document.activeElement);if(J.is("input")&&I.attr("id")===J.attr("id")){var i=I.val()||"";if(i!==s){I.blur();}}}};this.provideInputEnabledCell=function(M,i,u,v,w){I=u.find("input");if(I.length===0){var x=u.text();var y=u.html();var z=M.getArea().isDataArea();var A=null;var B=function(V){var e=M.getUnit();if(e&&e!==""){var K=V.toUpperCase().indexOf(e.toUpperCase());if(K!==-1){if(K===0){V=V.substring(K+e.length);}else{V=V.substring(0,K);}}}var O=c.calculateOffset(M);V=q.trim(V);var L=c.getTransferDataCommand();L=L.replace("__ROW__",M.getRow()+"");L=L.replace("__COL__",(M.getCol()-O)+"");L=L.replace("__VALUE__",V);L=L.replace("__CTYPE__",M.getPassiveCellType());o.saveVScrollInfo("plan");o.saveHScrollInfo("plan");o.saveColWidths();n(L,true);};var D=function(e){if(I.val()!==x){B(I.val());var K=q("<div></div>").text(x).html();y=y.replace(K,I.val());}F(e);};var E=function(e){var K=true;var i=null;var L=null;var N=null;if(e&&e.relatedTarget&&e.relatedTarget.id&&c.getValueHelpStatus()!==sap.zen.crosstab.VHLP_STATUS_OPENING){i=e.relatedTarget.id;N=q(document.getElementById(i));L=c.getTableDiv();K=N.closest(L).length>0;}return K;};var F=function(e){var K=q(document.getElementById(i+"_contentDiv"));K.html(y);if(A&&z){K.width(A);}if(E(e)===true){K.focus();}else{k.reset();s="";I.off("keydown focusout");I=null;}};var G=function(e){if(e.which===27){F();U.cancelEvent(e);}if(e.which===13){if(I.val()!==x){U.cancelEvent(e);B(I.val());}else{F();if(c.isIE8Mode()){k.keyboardNavKeyHandler(e);}}}if(e.which===38||e.which===40){return true;}if(e.which===37||e.which===39){if(!e.ctrlKey&&!e.altKey&&!e.shiftKey){U.stopEventPropagation(e);}return true;}if(e.which===115&&!z){t.invokeValueHelp(M,"vhlp_"+M.getId());}return null;};var J=0;if(z){J=u.innerWidth();A=U.getWidthFromStyle(u);}u.html("<input id=\""+i+"_input"+"\" type=\"text\" value=\""+x+"\" />");if(z){u.width(J+"px");}I=q(document.getElementById(i+"_input"));if(U.isMainMode()){I.addClass("sapzencrosstab-EntryEnabledInput-MainMode");}else{I.addClass("sapzencrosstab-EntryEnabledInput");}I.on("keydown",G);I.focus();c.getUtils().selectTextInInputField(I,v,w);I.on("focusout",D);}else{c.getUtils().selectTextInInputField(I,v,w);}s=I.val()||"";};this.handleValueHelpClick=function(e){var i=l(e);t.invokeValueHelp(i,e);};this.invokeValueHelp=function(e,i){if(e){k.focusNewCell(e,-1,-1);var u=c.getCallValueHelpCommand();var O=c.calculateOffset(e);o.saveVScrollInfo("plan");o.saveHScrollInfo("plan");o.saveColWidths();u=u.replace("__ROW__",e.getRow());u=u.replace("__COL__",e.getCol()-O);u=u.replace("__DOM_REF_ID__",i);n(u,true);}};this.handleInputEnabledCell=function(e,i,u){if(e){e=c.getUtils().getCellIdFromContenDivId(e);if(e){var M=sap.ui.getCore().getControl(e);if(M){if(M.getArea().isDataArea()||M.getArea().isRowHeaderArea()){k.focusNewCell(M,i,u);}}}}};this.sendSelectCommand=function(e){var i=-1;var u=-1;var A="";if(e){var v=e.getArea();if(v.isRowHeaderArea()){A="ROWS";}else if(v.isColHeaderArea()){A="COLUMNS";}else{A="DATA";}i=e.getRow();u=e.getCol();}var w=c.getOnSelectCommand();w=w.replace("__ROW__",i+"");w=w.replace("__COL__",u+"");w=w.replace("__AXIS__",A);n(w,true);};this.getContextElement=function(e,u){var D=[];var i=0;var J=q(document.elementFromPoint(e,u));var v=J.closest(".zenControl");var w=v.attr("id");w=J.attr("id");while(w&&w.indexOf("droparea")>-1){D.push(J);J.css("display","none");J=q(document.elementFromPoint(e,u));w=J.attr("id");}for(i=0;i<D.length;i++){D[i].css("display","block");}return J;};this.onContextMenuClick=function(e){var J=t.getContextElement(e.clientX,e.clientY);var i=c.createContextMenu();var u=i.getContext(J);if(u){var v=c.getPropertyBag().getContextMenuCommand();v=v.replace("__AXIS__",u.sAxis);v=v.replace("__ROW__",u.iRow);v=v.replace("__COL__",u.iCol);v=v.replace("__ID__","CONTEXT_MENU");v=v.replace("__DOM_REF_ID__",J.attr("id"));if(v.indexOf("__REMOVE_SELECTION__")>=0){v=v.replace("__REMOVE_SELECTION__",u.bRemoveSelection);}var D=sap.bi.framework.getService(null,"zen.rt.components.dynamicmenu");D.showDynamicMenu("ExpandedMenuBuilder",J.context,"",{"command":v},"",["crosstabActions"],"",false);}U.cancelEvent(e);c.enableClick();};this.attachEvents=function(){var A=false;var J=c.getRenderSizeDiv();var i=c.getTableDiv();J.unbind("mousedown");J.bind("mousedown",this.onMouseDown);if(c.getPropertyBag().isMobileMode()||c.getPropertyBag().isTestMobileMode()){J.unbind("click");J.bind("click",function(e){U.cancelEvent(e);});J.unbind("mousedown");J.bind("mousedown",function(e){U.cancelEvent(e);});d=new T(this,c);d.registerTouchEvents(J);k.setEnabled(false);if(c.getPropertyBag().isEnableColResize()===true){var u=new b(c);d.setColResizer(u);}}else{J.unbind("mouseup",this.onMouseUp);J.bind("mouseup",this.onMouseUp);i.unbind("mouseup",this.onMouseUp);i.bind("mouseup",this.onMouseUp);J.unbind("click");J.bind("click",this.executeOnClickAction);if(c.isSelectable()===true&&c.isHoveringEnabled()===true){J.unbind("mouseover");J.bind("mouseover",this.executeOnMouseEnter);J.unbind("mouseout");J.bind("mouseout",this.executeOnMouseOut);}k.setEnabled(c.isPlanningMode());k.attachEvents(J);if(c.getUserHeaderWidthCommand()&&c.getUserHeaderWidthCommand().length>0){h=new H(c);h.initialize();A=true;}if(c.getPropertyBag().isEnableColResize()===true){f=new b(c);f.initialize();A=true;}if(A===true){J.unbind("mousemove",this.onMouseMove);J.bind("mousemove",this.onMouseMove);}}};this.onMouseMove=function(e){if(f&&f.isResizeAction()){f.onMouseMove(e);}else if(h&&h.isResizeAction()){h.onMouseMove(e);}};this.onMouseDown=function(e){var i=e.target.id;m=i;};function g(i,e){var u=false;var D=document.getElementById(i);if(D){var v=D.getBoundingClientRect();var w=(v.left<e.clientX)&&(e.clientX<v.right);var V=(v.bottom>e.clientY)&&(e.clientY>v.top);u=w&&V;}return u;}this.onMouseUp=function(e){if(f&&f.isResizeAction()){f.onMouseUp(e);}else if(h&&h.isResizeAction()){h.onMouseUp(e);}else{p=false;if(m){var i=c.getUtils().getCellIdFromContenDivId(m);if(g(i,e)){var u=sap.ui.getCore().getControl(i);if(u){if(c.isPlanningMode()){var D=document.getElementById(m);var P=null;if(D){P=c.getUtils().getSelectionParams(D);}if(P.iSelectionStartPos>=0||P.iSelectionEndPos>=0){p=true;t.handleInputEnabledCell(e.target.id,P.iSelectionStartPos,P.iSelectionEndPos);}}}}else{if(!c.isDragAction()){U.cancelEvent(e);U.stopEventPropagation(e);}p=true;}}}};this.restoreFocusOnCell=function(){k.restoreFocusOnCell();};function j(i){var A=i.slice(0,4);return A;}function l(i){var e=i.slice(5);return sap.ui.getCore().getControl(e);}function n(A,D){if(A){if(!D){}c.getUtils().executeCommandAction(A);}}this.handleHoverEntry=function(e){if(e){var i=c.getUtils().getCellIdFromContenDivId(e);if(i&&i!==undefined){var M=sap.ui.getCore().getControl(i);if(M&&M!==undefined){c.getSelectionHandler().handleCellHoverEntry(M);}}}};this.executeOnMouseEnter=function(e){var P=null;var i=e.target.id;if(c.hasLoadingPages()){U.cancelEvent(e);return;}if(!i){i=t.findTargetId(e.target);}if(!i){return;}P=j(i);if(P==="__ce"){t.handleHoverEntry(i);}U.cancelEvent(e);};this.executeOnMouseOut=function(e){c.getSelectionHandler().handleCellHoverOut(e);U.cancelEvent(e);};this.enableClick=function(){p=false;m=null;};this.getColResizer=function(){return f;};};return sap.zen.crosstab.EventHandler;});