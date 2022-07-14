/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils","../library","sap/ui/Device","sap/ui/core/Popup","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/scrollLeftRTL","sap/ui/dom/jquery/control"],function(E,T,l,D,P,L,q){"use strict";var S=l.SelectionMode;var K=["sapMBtnBase","sapMInputBase","sapMLnk","sapMSlt","sapMCb","sapMRI","sapMSegBBtn","sapUiIconPointer","sapMBtnIcon","sapMObjStatusActive"];var a={_getEventPosition:function(e,t){var p;function g(o){if(!t._isTouchEvent(o)){return null;}var f=["touches","targetTouches","changedTouches"];for(var i=0;i<f.length;i++){var s=f[i];if(e[s]&&e[s][0]){return e[s][0];}if(e.originalEvent[s]&&e.originalEvent[s][0]){return e.originalEvent[s][0];}}return null;}p=g(e)||e;return{x:p.pageX,y:p.pageY};},_skipClick:function(e,t,o){if(!o.isOfType(T.CELLTYPE.DATACELL|T.CELLTYPE.ROWACTION)){return false;}if(e.isMarked()){return true;}var f=t.control(0);if(f){var $=f.$();if($.length){for(var i=0;i<K.length;i++){if($.hasClass(K[i])){return typeof f.getEnabled==="function"?f.getEnabled():true;}}}}return false;},_handleClickSelection:function(e,$,t){T.toggleRowSelection(t,$,null,function(r){var s=t._getSelectionPlugin();var o=t.getSelectionMode();if(o===S.Single){if(!s.isIndexSelected(r)){s.setSelectedIndex(r);}else{s.clearSelection();}}else if(e.shiftKey){var i=s.getSelectedIndex();if(i>=0){s.addSelectionInterval(i,r);}else if(s.getSelectedCount()===0){s.setSelectedIndex(r);}}else if(!t._legacyMultiSelection){if(!s.isIndexSelected(r)){s.addSelectionInterval(r,r);}else{s.removeSelectionInterval(r,r);}}else{t._legacyMultiSelection(r,e);}return true;});}};var C={initColumnResizing:function(t,e){if(t._bIsColumnResizerMoving){return;}t._bIsColumnResizerMoving=true;t._bColumnResizerMoved=false;t._iColumnResizeStart=a._getEventPosition(e,t).x;t.$().toggleClass("sapUiTableResizing",true);var $=q(document);var f=t._isTouchEvent(e);t._$colResize=t.$("rsz");$.on((f?"touchend":"mouseup")+".sapUiTableColumnResize",C.exitColumnResizing.bind(t));$.on((f?"touchmove":"mousemove")+".sapUiTableColumnResize",C.onMouseMoveWhileColumnResizing.bind(t));t._disableTextSelection();},exitColumnResizing:function(e){var i=a._getEventPosition(e,this).x;var o=this._getVisibleColumns()[this._iLastHoveredVisibleColumnIndex];var r=this.$().find("th[data-sap-ui-colid=\""+o.getId()+"\"]");var f=r[0].offsetWidth;var g=i-(r.offset().left+(this._bRtlMode?0:f));var h=Math.round(f+g*(this._bRtlMode?-1:1));var n=Math.max(h,T.Column.getMinColumnWidth());C._resizeColumn(this,this._iLastHoveredVisibleColumnIndex,this._bColumnResizerMoved?n:null);},onMouseMoveWhileColumnResizing:function(e){var i=a._getEventPosition(e,this).x;var r=this.$().find(".sapUiTableCnt").offset().left;var f=Math.floor(i-r);if(!this._bColumnResizerMoved&&Math.abs(i-this._iColumnResizeStart)>=5){this._bColumnResizerMoved=true;}this._$colResize.css("left",f+"px");this._$colResize.toggleClass("sapUiTableColRszActive",true);if(this._isTouchEvent(e)){e.stopPropagation();e.preventDefault();}},_cleanupColumResizing:function(t){if(t._$colResize){t._$colResize.toggleClass("sapUiTableColRszActive",false);t._$colResize=null;}t._bIsColumnResizerMoving=false;t.$().toggleClass("sapUiTableResizing",false);t._enableTextSelection();var $=q(document);$.off("touchmove.sapUiTableColumnResize");$.off("touchend.sapUiTableColumnResize");$.off("mousemove.sapUiTableColumnResize");$.off("mouseup.sapUiTableColumnResize");},_resizeColumn:function(t,i,n){var v=t._getVisibleColumns();var o;if(i>=0&&i<v.length){o=v[i];if(n!=null){T.Column.resizeColumn(t,t.indexOfColumn(o),n);}}C._cleanupColumResizing(t);o.focus();},doAutoResizeColumn:function(t,i){var v=t._getVisibleColumns(),o;if(i>=0&&i<v.length){o=v[i];if(!o.getAutoResizable()||!o.getResizable()){return;}var n=C._calculateAutomaticColumnWidth.apply(t,[o,i]);if(n){C._resizeColumn(t,i,n);}}},_calculateAutomaticColumnWidth:function(o,i){o=o||this.getColumns()[i];var $=this.$();var e=q("<div>").addClass("sapUiTableHiddenSizeDetector sapUiTableHeaderDataCell sapUiTableDataCell");$.append(e);var f=$.find("td[data-sap-ui-colid = \""+o.getId()+"\"]:not([colspan])").filter(function(g,h){return h.style.display!="none";}).children().clone();f.removeAttr("id");var w=e.append(f).width()+4;w=Math.min(w,$.find(".sapUiTableCnt").width());w=Math.max(w+4,T.Column.getMinColumnWidth());e.remove();return w;},initColumnTracking:function(t){t.$().find(".sapUiTableCtrlScr, .sapUiTableCtrlScrFixed").on("mousemove",function(e){var o=this.getDomRef();if(!o||this._bIsColumnResizerMoving){return;}var p=e.clientX,f=o.getBoundingClientRect(),g=0,r=this._bRtlMode?10000:-10000;for(var i=0;i<this._aTableHeaders.length;i++){var h=this._aTableHeaders[i].getBoundingClientRect();if(this._bRtlMode){if((p<h.right-5)&&(p>=h.left)){g=i;r=h.left-f.left;break;}}else{if((p>h.left+5)&&(p<=h.right)){g=i;r=h.right-f.left;break;}}}var j=this._getVisibleColumns()[g];if(j&&j.getResizable()){this.$("rsz").css("left",r+"px");this._iLastHoveredVisibleColumnIndex=g;}}.bind(t));}};var R={initReordering:function(t,i,e){var o=t.getColumns()[i],$=o.$(),f=t.$();t._disableTextSelection();f.addClass("sapUiTableDragDrop");var g=$.clone();g.find("*").addBack(g).removeAttr("id").removeAttr("data-sap-ui").removeAttr("tabindex");g.attr("id",t.getId()+"-roghost").addClass("sapUiTableColReorderGhost").css({"left":-10000,"top":-10000,"z-index":P.getNextZIndex()});g.toggleClass(T.getContentDensity(t),true);g.appendTo(document.body);t._$ReorderGhost=t.getDomRef("roghost");f.find("td[data-sap-ui-colid='"+o.getId()+"']").toggleClass("sapUiTableColReorderFade",true);var I=q("<div id='"+t.getId()+"-roind' class='sapUiTableColReorderIndicator'><div class='sapUiTableColReorderIndicatorArrow'></div><div class='sapUiTableColReorderIndicatorInner'></div></div>");I.appendTo(t.getDomRef("sapUiTableCnt"));t._$ReorderIndicator=t.getDomRef("roind");t._iDnDColIndex=i;var h=q(document),j=t._isTouchEvent(e);h.on((j?"touchend":"mouseup")+".sapUiColumnMove",R.exitReordering.bind(t));h.on((j?"touchmove":"mousemove")+".sapUiColumnMove",R.onMouseMoveWhileReordering.bind(t));},onMouseMoveWhileReordering:function(e){var o=a._getEventPosition(e,this),i=o.x,f=o.y,O=this._iNewColPos;this._iNewColPos=this._iDnDColIndex;e.preventDefault();var p=R.findColumnForPosition(this,i);if(!p||!p.id){this._iNewColPos=O;return;}var s=40,g=this.getDomRef("sapUiTableColHdrScr"),$=q(g),h=g.getBoundingClientRect(),j=$.outerWidth(),k=this._bRtlMode?$.scrollLeftRTL():$.scrollLeft();this._bReorderScroll=false;if(i>h.left+j-s&&k+j<g.scrollWidth){this._bReorderScroll=true;R.doScroll(this,!this._bRtlMode);R.adaptReorderMarkerPosition(this,p,false);}else if(i<h.left+s&&k>0){this._bReorderScroll=true;R.doScroll(this,this._bRtlMode);R.adaptReorderMarkerPosition(this,p,false);}q(this._$ReorderGhost).css({"left":i+5,"top":f+5});if(this._bReorderScroll||!p){return;}if(p.before||(p.after&&p.index==this._iDnDColIndex)){this._iNewColPos=p.index;}else if(p.after&&p.index!=this._iDnDColIndex){this._iNewColPos=p.index+1;}if(!T.Column.isColumnMovableTo(this.getColumns()[this._iDnDColIndex],this._iNewColPos)){this._iNewColPos=O;}else{R.adaptReorderMarkerPosition(this,p,true);}},exitReordering:function(e){var o=this._iDnDColIndex;var n=this._iNewColPos;var $=q(document);$.off("touchmove.sapUiColumnMove");$.off("touchend.sapUiColumnMove");$.off("mousemove.sapUiColumnMove");$.off("mouseup.sapUiColumnMove");this._bReorderScroll=false;this.$().removeClass("sapUiTableDragDrop");delete this._iDnDColIndex;delete this._iNewColPos;q(this._$ReorderGhost).remove();delete this._$ReorderGhost;q(this._$ReorderIndicator).remove();delete this._$ReorderIndicator;this.$().find(".sapUiTableColReorderFade").removeClass("sapUiTableColReorderFade");this._enableTextSelection();T.Column.moveColumnTo(this.getColumns()[o],n);if(this._mTimeouts.reApplyFocusTimerId){window.clearTimeout(this._mTimeouts.reApplyFocusTimerId);}var t=this;this._mTimeouts.reApplyFocusTimerId=window.setTimeout(function(){var O=T.getFocusedItemInfo(t).cell;T.focusItem(t,0,e);T.focusItem(t,O,e);},0);},findColumnForPosition:function(t,e){var h,H,r,w,p,B,A;for(var i=0;i<t._aTableHeaders.length;i++){h=t._aTableHeaders[i];H=q(h);r=h.getBoundingClientRect();w=H.outerWidth();p={left:r.left,center:r.left+w/2,right:r.left+w,width:w,index:parseInt(H.attr("data-sap-ui-headcolindex")),id:H.attr("data-sap-ui-colid")};B=e>=p.left&&e<=p.center;A=e>=p.center&&e<=p.right;if(B||A){p.before=t._bRtlMode?A:B;p.after=t._bRtlMode?B:A;return p;}}return null;},doScroll:function(t,f){if(t._mTimeouts.horizontalReorderScrollTimerId){window.clearTimeout(t._mTimeouts.horizontalReorderScrollTimerId);t._mTimeouts.horizontalReorderScrollTimerId=null;}if(t._bReorderScroll){var s=f?30:-30;if(t._bRtlMode){s=(-1)*s;}t._mTimeouts.horizontalReorderScrollTimerId=setTimeout(R.doScroll.bind(t,t,f),60);var $=t.$("sapUiTableColHdrScr");var e=t._bRtlMode?"scrollLeftRTL":"scrollLeft";$[e]($[e]()+s);}},adaptReorderMarkerPosition:function(t,p,s){if(!p||!t._$ReorderIndicator){return;}var i=p.left-t.getDomRef().getBoundingClientRect().left;if(t._bRtlMode&&p.before||!t._bRtlMode&&p.after){i=i+p.width;}q(t._$ReorderIndicator).css({"left":i+"px"}).toggleClass("sapUiTableColReorderIndicatorActive",s);}};var b={ROWAREAS:[".sapUiTableRowSelectionCell",".sapUiTableRowActionCell",".sapUiTableCtrlFixed > tbody > .sapUiTableTr",".sapUiTableCtrlScroll > tbody > .sapUiTableTr"],initRowHovering:function(t){var $=t.$();for(var i=0;i<b.ROWAREAS.length;i++){b._initRowHoveringForArea(t,$,b.ROWAREAS[i]);}},_initRowHoveringForArea:function(t,$,A){$.find(A).on("mouseenter",function(){b._onHover(t,$,A,this);}).on("mouseleave",function(){b._onUnhover(t,$,A,this);});},_onHover:function(t,$,A,e){var i=$.find(A).index(e);var r=t.getRows()[i];if(r){r._setHovered(true);}},_onUnhover:function(t,$,A,e){var i=$.find(A).index(e);var r=t.getRows()[i];if(r){r._setHovered(false);}}};var c={onmousedown:function(e){var p=this._getPointerExtension();var $=T.getCell(this,e.target);var o=T.getCellInfo($);var t=q(e.target);var f;var m;var M;this._getKeyboardExtension().initItemNavigation();if(e.button===0){if(e.target===this.getDomRef("rsz")){e.preventDefault();e.stopPropagation();C.initColumnResizing(this,e);}else if(t.hasClass("sapUiTableColResizer")){var i=t.closest(".sapUiTableHeaderCell").attr("data-sap-ui-colindex");this._iLastHoveredVisibleColumnIndex=this._getVisibleColumns().indexOf(this.getColumns()[i]);C.initColumnResizing(this,e);}else if(o.isOfType(T.CELLTYPE.COLUMNHEADER)){f=this.getColumns()[o.columnIndex];m=f.getAggregation("menu");M=m&&m.bOpen;if(!M){p._bShowMenu=true;this._mTimeouts.delayedMenuTimerId=setTimeout(function(){delete p._bShowMenu;},200);}if(this.getEnableColumnReordering()&&!(this._isTouchEvent(e)&&t.hasClass("sapUiTableColDropDown"))){this._getPointerExtension().doReorderColumn(o.columnIndex,e);}}if((D.browser.firefox&&(e.metaKey||e.ctrlKey))||t.closest(".sapUiTableHSb",this.getDomRef()).length===1||t.closest(".sapUiTableVSb",this.getDomRef()).length===1){e.preventDefault();}}if(e.button===2){if(a._skipClick(e,t,o)){p._bShowDefaultMenu=true;return;}if(o.isOfType(T.CELLTYPE.COLUMNHEADER)){f=this.getColumns()[o.columnIndex];m=f.getAggregation("menu");M=m&&m.bOpen;if(!M){p._bShowMenu=true;}else{p._bHideMenu=true;}}else if(o.isOfType(T.CELLTYPE.ANYCONTENTCELL)){p._bShowMenu=true;}else{p._bShowDefaultMenu=true;}}},onmouseup:function(e){clearTimeout(this._mTimeouts.delayedColumnReorderTimerId);},ondblclick:function(e){if(D.system.desktop&&e.target===this.getDomRef("rsz")){e.preventDefault();C.doAutoResizeColumn(this,this._iLastHoveredVisibleColumnIndex);}},onclick:function(e){clearTimeout(this._mTimeouts.delayedColumnReorderTimerId);if(e.isMarked()){return;}var t=q(e.target);var $=T.getCell(this,e.target);var o=T.getCellInfo($);var r=this.getRows()[o.rowIndex];if(!o.isOfType(T.CELLTYPE.ANY)){return;}if(o.isOfType(T.CELLTYPE.COLUMNHEADER)){var p=this._getPointerExtension();if(p._bShowMenu){T.Menu.openContextMenu(this,e.target);delete p._bShowMenu;}}else if(r&&r.isSummary()){e.preventDefault();}else if(t.hasClass("sapUiTableGroupMenuButton")){T.Menu.openContextMenu(this,e.target,e);}else if(t.hasClass("sapUiTableGroupIcon")||t.hasClass("sapUiTableTreeIcon")){r.toggleExpandedState();}else{if(a._skipClick(e,t,o)){return;}var s=window.getSelection().toString();if(!e.shiftKey&&s.length>0&&s!=="\n"){L.debug("DOM Selection detected -> Click event on table skipped, Target: "+e.target);return;}if(!this._findAndfireCellEvent(this.fireCellClick,e)){if(o.isOfType(T.CELLTYPE.COLUMNROWHEADER)){this._getSelectionPlugin().onHeaderSelectorPress();}else{a._handleClickSelection(e,$,this);}}else{e.preventDefault();}}},oncontextmenu:function(e){var p=this._getPointerExtension();if(p._bShowDefaultMenu){e.setMarked("handledByPointerExtension");delete p._bShowDefaultMenu;}else if(p._bShowMenu){var f=T.Menu.openContextMenu(this,e.target,e);if(f){e.preventDefault();}e.setMarked("handledByPointerExtension");delete p._bShowMenu;}else if(p._bHideMenu){e.setMarked("handledByPointerExtension");e.preventDefault();delete p._bHideMenu;}}};var d=E.extend("sap.ui.table.extensions.Pointer",{_init:function(t,s,m){this._delegate=c;T.addDelegate(t,this._delegate,t);t._iLastHoveredVisibleColumnIndex=0;t._bIsColumnResizerMoving=false;t._iFirstReorderableIndex=s==E.TABLETYPES.TREE?1:0;return"PointerExtension";},_attachEvents:function(){var t=this.getTable();if(t){C.initColumnTracking(t);b.initRowHovering(t);}},_detachEvents:function(){var t=this.getTable();if(t){var $=t.$();$.find(".sapUiTableCtrlScr, .sapUiTableCtrlScrFixed").off();$.find(".sapUiTableCtrl > tbody > tr").off();$.find(".sapUiTableRowSelectionCell").off();}},_debug:function(){this._ExtensionHelper=a;this._ColumnResizeHelper=C;this._ReorderHelper=R;this._ExtensionDelegate=c;this._RowHoverHandler=b;this._KNOWNCLICKABLECONTROLS=K;},doAutoResizeColumn:function(i){var t=this.getTable();if(t){C.doAutoResizeColumn(t,i);}},doReorderColumn:function(i,e){var t=this.getTable();if(t&&T.Column.isColumnMovable(t.getColumns()[i])){t._mTimeouts.delayedColumnReorderTimerId=setTimeout(function(){R.initReordering(this,i,e);}.bind(t),200);}},destroy:function(){var t=this.getTable();if(t){t.removeEventDelegate(this._delegate);}this._delegate=null;E.prototype.destroy.apply(this,arguments);}});return d;});
