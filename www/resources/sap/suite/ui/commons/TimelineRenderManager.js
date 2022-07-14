/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define("sap/suite/ui/commons/TimelineRenderManager",["sap/ui/thirdparty/jquery","./library","sap/m/Text","sap/ui/core/Icon","sap/m/ViewSettingsDialog","sap/ui/core/ResizeHandler","sap/ui/core/Item","sap/m/ToolbarSpacer","sap/m/SearchField","sap/m/OverflowToolbar","sap/m/Select","sap/m/RangeSlider","sap/m/Label","sap/m/Panel","sap/m/FlexBox","sap/m/OverflowToolbarButton","sap/m/MessageStrip","sap/m/ViewSettingsFilterItem","sap/m/ViewSettingsCustomItem","sap/m/OverflowToolbarLayoutData","sap/m/library","sap/m/MessageToast","sap/ui/core/InvisibleText","sap/m/SliderTooltip","sap/suite/ui/commons/TimelineRenderManagerTimestamp","sap/suite/ui/commons/util/StringSliderTooltip","sap/m/ResponsiveScale","sap/ui/core/library"],function(q,l,T,I,V,R,a,b,S,O,c,d,L,P,F,e,M,f,g,h,m,k,n,o,p,r,s,t){"use strict";var C=t.CSSSize;var B=m.ButtonType;var u=m.OverflowToolbarPriority;var v=l.TimelineGroupType;var w=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");var x=680;var D=Object.freeze({UP:"UP",DOWN:"DOWN",NONE:"NONE"});function y($,i,j){$.removeClass(i).addClass(j);}function _($,A){return parseInt($.css(A).replace("px",""),10);}var z={extendTimeline:function(A){A.prototype._initControls=function(){this._setupMessageStrip();this._setupFilterDialog();this._setupHeaderToolbar();this._setupAccessibilityItems();};A.prototype._registerResizeListener=function(){var i=this.$().parent().get(0);if(i){this.oResizeListener=R.register(i,q.proxy(this._performResizeChanges,this));}};A.prototype._deregisterResizeListener=function(){if(this.oResizeListener){R.deregister(this.oResizeListener);}};A.prototype._performUiChanges=function(i){this._deregisterResizeListener();if(!this.getDomRef()){return;}if(this._isVertical()){this._performUiChangesV(i);}else{this._performUiChangesH();}this._setupScrollers();this._startItemNavigation();this._registerResizeListener();};A.prototype._performDoubleSidedChangesLi=function($,i){var j=$.children().first(),E=this._isLeftAlignment()?"sapSuiteUiCommonsTimelineItemWrapperVLeft":"sapSuiteUiCommonsTimelineItemWrapperVRight";if(this._renderDblSided){if($.hasClass('sapSuiteUiCommonsTimelineItem')){$.removeClass('sapSuiteUiCommonsTimelineItem').addClass(i?"sapSuiteUiCommonsTimelineItemOdd":"sapSuiteUiCommonsTimelineItemEven");if(!i){y(j,"sapSuiteUiCommonsTimelineItemWrapperVLeft","sapSuiteUiCommonsTimelineItemWrapperVRight");}else{y(j,"sapSuiteUiCommonsTimelineItemWrapperVRight","sapSuiteUiCommonsTimelineItemWrapperVLeft");}}}else{$.removeClass("sapSuiteUiCommonsTimelineItemOdd").removeClass("sapSuiteUiCommonsTimelineItemEven").addClass("sapSuiteUiCommonsTimelineItem");j.removeClass("sapSuiteUiCommonsTimelineItemWrapperVLeft").removeClass("sapSuiteUiCommonsTimelineItemWrapperVRight").addClass(E);}};A.prototype._performDoubleSidedChanges=function(){var $=this.$(),E=$.find('.sapSuiteUiCommonsTimelineItemUlWrapper').not(".sapSuiteUiCommonsTimelineShowMoreWrapper"),G=$.find(".sapSuiteUiCommonsTimelineScrollV .sapSuiteUiCommonsTimelineGroupHeader"),H;if(this._renderDblSided){this._$content.addClass("sapSuiteUiCommonsTimelineDblSided");G.addClass("sapSuiteUiCommonsTimelineGroupHeaderDblSided");G.addClass("sapSuiteUiCommonsTimelineItemWrapperVLeft").removeClass("sapSuiteUiCommonsTimelineItemWrapperVRight");}else{this._$content.removeClass("sapSuiteUiCommonsTimelineDblSided");G.removeClass("sapSuiteUiCommonsTimelineGroupHeaderDblSided sapSuiteUiCommonsTimelineItemWrapperVLeft");G.addClass(this._isLeftAlignment()?"sapSuiteUiCommonsTimelineItemWrapperVLeft":"sapSuiteUiCommonsTimelineItemWrapperVRight");}for(var j=0;j<E.length;j++){var J=q(E[j]),K=J.find('> li').not(".sapSuiteUiCommonsTimelineGroupHeader");K.eq(1).css("margin-top",this._renderDblSided?"40px":"auto");for(var i=0;i<K.length;i++){H=q(K[i]);this._performDoubleSidedChangesLi(H,(i%2)===0);}}$.find(".sapSuiteUiCommonsTimelineItemBarV").css("height","");$.find(".sapSuiteUiCommonsTimelineItem").css("margin-bottom","");};A.prototype._performUiChangesH=function(){var $=this.$(),i,j;var E=function(G){return($.width()-(G.position().left+G.outerWidth()));};if(this.getEnableDoubleSided()&&this._isGrouped()){j=$.find(".sapSuiteUiCommonsTimelineHorizontalBottomLine ul");$.find("[firstgroupevenitem = true]:visible").each(function(G,H){var J=function(Z){return Z+"-"+(this._bRtlMode?"right":"left");}.bind(this),K=q("#"+H.id+"-line"),N=this._bRtlMode?E(K):K.position().left,Q=30,U=q(H),W=_(j,J("padding")),X,Y;if(G===0){X=N-Q-W;}else{i=U.prevAll(".sapSuiteUiCommonsTimelineItemLiWrapperV:visible:first");Y=this._bRtlMode?E(i):(i.position().left+_(i,J("margin")));X=(N-Q)-(Y+i.outerWidth());}U.css(J("margin"),X+"px");}.bind(this));}if(!this.getEnableScroll()){$.find(".sapSuiteUiCommonsTimelineContentsH").css("overflow-x","hidden");}this._calculateTextHeight();};A.prototype._performUiChangesV=function(i){var $=this.$(),j=$.outerWidth()+50;if(this.getEnableDoubleSided()){this._renderDblSided=j>=x;if(this._renderDblSided!==this._lastStateDblSided||i){this._performDoubleSidedChanges();}this._lastStateDblSided=this._renderDblSided;}this._calculateTextHeight();this._calculateHeightV();};A.prototype._calculateHeightV=function(){var $=this.$(),j=this.$("headerBar").outerHeight()||0,E=this.$("filterMessage").outerHeight()||0,G=this.$("messageStrip").outerHeight()||0,H=G+E+j,J=function(X,W){var Y,Z,a1,b1,c1,d1,e1,f1=X.length,g1=this.getShowIcons()?".sapSuiteUiCommonsTimelineItemBarIconWrapperV:visible":".sapSuiteUiCommonsTimelineItemNoIcon:visible",h1=W.length>0?W.find(g1+", .sapSuiteUiCommonsTimelineItemBarIconWrapperV:visible").eq(0):q(),i1=8;for(var i=0;i<f1;i++){Y=q(X[i+1]);Z=q(X[i]);a1=i<f1-1?Y.find(g1):h1;c1=Z.find(g1);if(a1.length>0&&c1.length>0){d1=a1.offset().top;e1=c1.offset().top+c1.height();b1=Z.find(".sapSuiteUiCommonsTimelineItemBarV");i1=8;b1.height(d1-e1-i1);}}},K=function(X){var Y,Z,a1,b1,c1,d1=40,e1=100,f1=function(){var g1=_(a1,"margin-top")+a1.position().top+a1.height()-Y.position().top;Z.css("margin-bottom",g1+d1+"px");};for(var i=2;i<X.length;i++){Y=q(X[i]);Z=q(X[i-1]);a1=q(X[i-2]);b1=this._bRtlMode?!Y.hasClass("sapSuiteUiCommonsTimelineItemOdd"):Y.hasClass("sapSuiteUiCommonsTimelineItemOdd");c1=Y.position().left;if(!b1&&c1<e1||b1&&c1>e1){f1();}else{var g1=Y.position().top-Z.position().top,h1=_(a1,"margin-bottom");if(g1<d1){a1.css("margin-bottom",(h1+d1-g1)+"px");}}}},N=function(){var Y=5,Z=$.position().top,a1=$.parent().height(),b1=_(this._$content,"padding-bottom"),c1=_(this._$content,"padding-top"),d1=a1-Z-H-c1-b1-Y;this._$content.height(d1);}.bind(this),U,Q,W,X;if(this.getEnableScroll()){N();}if(this._renderDblSided){U=$.find(".sapSuiteUiCommonsTimelineItemUlWrapper");for(var i=0;i<U.length;i++){Q=q(U[i]);W=q(U[i+1]);X=Q.find(" > li:not(.sapSuiteUiCommonsTimelineGroupHeader):visible");X.css("margin-bottom","");K.call(this,X,Q);J.call(this,X,W);}}};A.prototype._performResizeChanges=function(){this._performUiChanges();};A.prototype._calculateTextHeight=function(){var $=this.$(),E=this.getTextHeight(),G,H,J=function(U,W){$.find(".sapSuiteUiCommonsTimelineItemTextWrapper:visible").each(function(X,Y){var Z=q(Y),a1=Z.children().first(),b1=a1.get(0).getClientRects(),c1=0,d1=0,e1,f1=-100000,g1=0,h1=w.getText("TIMELINE_TEXT_SHOW_MORE"),i1=Z.attr("expanded");i1=(i1=="true");Z.height("auto");Z.css("-webkit-line-clamp","");if(b1&&b1.length>0){e1=b1[0].top;g1=0;for(var i=0;i<b1.length-1;i++){if(f1!==b1[i].bottom){f1=b1[i].bottom;g1++;}if(U>0&&(b1[i+1].bottom-e1>U)){d1=g1;c1=b1[i].bottom-e1;break;}if(W>0&&g1===W){c1=b1[i].bottom-b1[0].top;d1=W;break;}}}if(!i1){if(c1>0){Z.height(c1);Z.css("-webkit-line-clamp",d1.toString());Z.next().show();}else if(!Z.attr("expandable")){Z.next().hide();}}else{for(var j=i;j<b1.length-1;j++){if(f1!==b1[j].bottom){f1=b1[j].bottom;g1++;}}if(W>0&&g1<=W){Z.attr("expanded",false);Z.next().children()[0].text=h1;Z.next().hide();}}});},K=function(i){J(0,parseInt(i,10));},N=function(i){J(i,0);},Q=function(){var i=$.find(".sapSuiteUiCommonsTimelineItemTextWrapper");i.css("height","");i.css("-webkit-line-clamp","");$.css("height","100%");var j=this._$content.height(),U=_(this._$content,"padding-bottom"),W=this._$content.get(0).scrollHeight,X=W-j-U,Y={height:0},Z,a1=20;$.find(".sapSuiteUiCommonsTimelineItemTextWrapper").each(function(b1,c1){var d1=q(c1).height();if(d1>Y.height){Y.height=d1;Y.item=q(this);}});if(Y.item){Z=Y.item.parent().find(".sapSuiteUiCommonsTimelineItemShowMore:hidden").height();return Y.height-X-Z-a1;}return 1;};if(E){if(this._useAutomaticHeight()){N(Q.call(this));}else if(q.isNumeric(E)){K(E);}else{G=/([0-9]*\.?[0-9]+)(px)+/i;H=G.exec(E);if(H&&H.length>1){N(H[1]);}else if(C.isValid(E)){$.find(".sapSuiteUiCommonsTimelineItemTextWrapper").height(E);}}}};A.prototype._fixScrollerPositionH=function(){var $=this.$(),i=$.find(".sapSuiteUiCommonsTimelineHorizontalMiddleLine"),j=$.find(".sapSuiteUiCommonsTimelineHorizontalScroller"),E,G=this._$content.position().top;if(i.get(0)){E=i.position().top;$.find(".sapSuiteUiCommonsTimelineScrollerIconWrapper").css("top",(E-5)+"px");j.css("top",G+"px");j.height(this._$content.outerHeight()-15);}};A.prototype._setupScrollers=function(){var $=this.$(),i=450,N='rgba(0, 0, 0, 0)',j,E,G,H,J,K,Q,U,W,X,Y,Z,a1,b1=function(c1){var d1=N;c1.parents().each(function(e1,f1){var E=q(f1).css("background-color"),g1=q(f1).css("background-image");if(g1!=="none"){d1=N;return;}if(E!==N&&E!=="transparent"){d1=E;}});return d1;};if(this._scrollingFadeout()){j=this._isVertical()?$.height():$.width();if(j<i){$.find(".sapSuiteUiCommonsTimelineVerticalScroller",".sapSuiteUiCommonsTimelineHorizontalScroller").hide();this._scrollersSet=false;return;}if(!this._scrollersSet){E=b1(this.$());if(E&&E!==N){G=E.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);if(G&&G.length>=4){H=parseInt(G[1],10);J=parseInt(G[2],10);K=parseInt(G[3],10);Q="rgba("+H+","+J+","+K+", 0)";W="rgba("+H+","+J+","+K+", 0.7)";U="rgba("+H+","+J+","+K+", 1)";X=$.find(".sapSuiteUiCommonsTimelineHorizontalLeftScroller, .sapSuiteUiCommonsTimelineTopScroller ");Y=$.find(".sapSuiteUiCommonsTimelineHorizontalRightScroller, .sapSuiteUiCommonsTimelineBottomScroller");Z=this._isVertical()?"top":"left";a1=this._isVertical()?"bottom":"right";X.css("background-image","linear-gradient(to "+Z+", "+Q+", "+U+")");Y.css("background-image","linear-gradient(to "+a1+", "+Q+", "+U+")");X.css("background-image","-webkit-linear-gradient("+a1+", "+Q+", "+W+" 30%,"+U+")");Y.css("background-image","-webkit-linear-gradient("+Z+", "+Q+", "+W+" 30%,"+U+")");this._scrollersSet=true;if(this.getContent().length>0){if((!this._isVertical()&&this._$content.get(0).scrollWidth>this._$content.outerWidth())||(this._isVertical()&&this._$content.get(0).scrollHeight>this._$content.outerHeight())){Y.show();}}}}else{$.find(".sapSuiteUiCommonsTimelineHorizontalScroller").hide();}}if(!this._isVertical()){this._fixScrollerPositionH();}}};A.prototype._setupScrollEvent=function(){var $=this.$(),i=$.find(".sapSuiteUiCommonsTimelineHorizontalLeftScroller .sapSuiteUiCommonsTimelineScrollerIconWrapper, .sapSuiteUiCommonsTimelineTopScroller .sapSuiteUiCommonsTimelineScrollerIconWrapper"),j=$.find(".sapSuiteUiCommonsTimelineHorizontalRightScroller .sapSuiteUiCommonsTimelineScrollerIconWrapper, .sapSuiteUiCommonsTimelineBottomScroller .sapSuiteUiCommonsTimelineScrollerIconWrapper"),E=$.find(".sapSuiteUiCommonsTimelineHorizontalLeftScroller, .sapSuiteUiCommonsTimelineTopScroller"),G=$.find(".sapSuiteUiCommonsTimelineHorizontalRightScroller, .sapSuiteUiCommonsTimelineBottomScroller"),H=this._$content,J=this;if(J._lazyLoading()||J._scrollingFadeout()){H.on("scroll",function(K){var N=q(K.currentTarget),Q=N.get(0).scrollLeft,U=N.get(0).scrollTop,W=false,X=200,Y=5,Z=false,a1,b1,c1,d1,H;if(J._isVertical()){a1=N.outerHeight();b1=N.get(0).scrollHeight;Z=U+a1>b1-X;W=U+a1>=b1-Y;}else{c1=N.width();d1=N.get(0).scrollWidth;Z=Q+c1>d1-X;W=Q+c1>=d1-Y-185;}if(J._lazyLoading()&&J._scrollMoreEvent){if(Z&&!J._isMaxed()){J._scrollMoreEvent=false;J._loadMore();}}if(J._scrollersSet){if(Q>50||U>50){E.show();}else{E.hide();J._manualScrolling=false;}if(W){G.hide();}else{G.show();}var e1;if(J._isVertical()){e1=N.get(0).scrollTop;H=e1>J._lastScrollPosition.y?j:i;J._lastScrollPosition.y=e1;}else{e1=N.get(0).scrollLeft;H=e1>J._lastScrollPosition.x?j:i;J._lastScrollPosition.x=e1;}H.addClass("sapSuiteUiCommonsTimelineScrolling");clearTimeout(q.data(this,'scrollTimer'));q.data(this,'scrollTimer',setTimeout(function(){i.removeClass("sapSuiteUiCommonsTimelineScrolling");j.removeClass("sapSuiteUiCommonsTimelineScrolling");},350));}});this.$().find(".sapSuiteUiCommonsTimelineScrollerIconWrapper").on("mousedown",function(K){var N=90,Q=(q(this).hasClass("sapSuiteUiCommonsTimelineScrollerIconWrapperLeft")||q(this).hasClass("sapSuiteUiCommonsTimelineScrollerIconWrapperTop"))?-N:N;J._manualScrolling=true;J._performScroll(Q);});this.$().find(".sapSuiteUiCommonsTimelineScrollerIconWrapper").on("mouseup",function(){J._manualScrolling=false;}).on("mouseout",function(){J._manualScrolling=false;});}if(this.getEnableScroll()&&!J._isVertical()){this._$content.on("wheel",function(K){if(K.originalEvent.deltaX){return;}var N=K.originalEvent.deltaY,Q=30;if(N<Q&&N>Q*-1){N=N>0?Q:Q*-1;}this.scrollLeft+=N*2;});$.find(".sapSuiteUiCommonsTimelineHorizontalScroller, .sapSuiteUiCommonsTimelineVerticalScroller").on("wheel",function(K){var N=K.originalEvent.deltaY;if(J._isVertical()){J._$content.get(0).scrollTop+=N*2;}else{J._$content.get(0).scrollLeft+=N*2;}});}};A.prototype._setupMessageStrip=function(){var i=this;this._objects.register("messageStrip",function(){return new M(i.getId()+"-messageStrip",{close:function(){i.setCustomMessage("");i.fireCustomMessageClosed();},showCloseButton:true});});this._objects.register("filterMessageText",function(){return new T(i.getId()+"-filterMessageText",{});});this._objects.register("filterMessage",function(){var j=i._objects.getFilterMessageText(),E,G;G=new I(i.getId()+"filterMessageIcon",{src:"sap-icon://decline",press:[i._clearFilter,i]});G.setTooltip(w.getText('TIMELINE_CLEAR_ICN_TOOLTIP'));E=new O(i.getId()+"-filterMessage",{design:"Info",content:[j,new b(),G]});E.addStyleClass("sapSuiteUiCommonsTimelineFilterInfoBar");E.setHeight("auto");return E;});};A.prototype._setMessageBars=function(i){var j=this._getFilterMessage();if(j){i.addChild(this._objects.getFilterMessage());this._objects.getFilterMessageText().setText(j);}};A.prototype._setupRangeFilterPage=function(){var i=this;this._rangeFilterType=null;this._objects.register("timestampFilterPicker",function(){return new p(i.getId(),{dateChanged:function(E){var j=E.getSource(),G=j.getStartDate()||i._minDate,H=j.getEndDate()||i._maxDate;i._filterDialogRangePage.setFilterCount(+(G!==i._minDate||H!==i._maxDate));}},undefined,w);});this._objects.register("timeFilterSelect",function(){var j=new c(i.getId()+"-timeFilterSelect",{ariaLabelledBy:i._objects.getRangeTypeLbl().getId(),change:function(E){i._rangeFilterType=E.getParameter("selectedItem").getProperty("key");i.toggleGroupTypeSelector(i._rangeFilterType);i._setRangeFilter();},items:[new a({text:w.getText("TIMELINE_YEAR"),key:v.Year}),new a({text:w.getText("TIMELINE_QUARTER"),key:v.Quarter}),new a({text:w.getText("TIMELINE_MONTH"),key:v.Month}),new a({text:w.getText("TIMELINE_DAY"),key:v.Day}),new a({text:w.getText("TIMELINE_CUSTOM_RANGE"),key:v.None})]});j.addStyleClass("sapSuiteUiCommonsTimelineRangeSelect");return j;});this._objects.register("timeRangeSlider",function(){var j=function(H){if(typeof H==="string"){H=Number(H);}var J=i._fnAddDate(H);return i._formatGroupBy(J,i._rangeFilterType).title;};var E=new s();E.getLabel=j;var G=new d(i.getId()+"-timeRangeSlider",{enableTickmarks:true,visible:false,showAdvancedTooltip:true,step:1,change:function(H){var J=G.getMin(),K=G.getMax(),N=G.getRange();i._filterDialogRangePage.setFilterCount(+(N[0]!==J||N[1]!==K));},customTooltips:[new r({mapFunction:j}),new r({mapFunction:j,fetchValue2:true})],scale:E});G.addStyleClass("sapSuiteUiCommonsTimelineRangeFilter");return G;});this._objects.register("rangeTypeLbl",function(){return new L(i.getId()+"-rangeTypeLbl",{text:w.getText("TIMELINE_GROUP_BY_PERIOD")+":"});});this._objects.register("rangeTypePanel",function(){var j=new P(i.getId()+"-rangeTypePanel",{content:[i._objects.getRangeTypeLbl(),i._objects.getTimeFilterSelect()]});j.addStyleClass("sapSuiteUiCommonsTimelineRangeFilterPanel");j.addStyleClass("sapSuiteUiCommonsTimelineRangeFilterPanelShadowed");return j;});this._objects.register("rangePanel",function(){return new F(i.getId()+"rangePanel",{direction:"Column",items:[i._objects.getRangeTypePanel(),i._objects.getTimeRangeSlider(),i._objects.getTimestampFilterPicker().getTimestampPanelRadio(),i._objects.getTimestampFilterPicker().getTimestampPanelPicker()]});});};A.prototype._setupFilterFirstPage=function(i){if(i){i.removeAllAggregation("filterItems");if(this.getShowItemFilter()){i.addAggregation("filterItems",new f({key:"items",text:this._getFilterTitle()}));}if(this.getShowTimeFilter()){this._filterDialogRangePage=new g({key:"range",text:w.getText("TIMELINE_RANGE_SELECTION"),customControl:[this._objects.getRangePanel()]});i.addAggregation("filterItems",this._filterDialogRangePage);}}};A.prototype._setupFilterDialog=function(){var i=this;this._setupRangeFilterPage();this._objects.register("filterContent",function(){var j,E,G=function(N){if(!i._filterState.data){i._setFilterList();N.removeAllItems();i._aFilterList.forEach(function(Q){var U=q.grep(i._currentFilterKeys,function(W){return Q.key===W.key;}).length>0;N.addItem(new f({key:Q.key,text:Q.text,selected:U}));});}i._filterState.data=true;},H=function(){k.show(w.getText("TIMELINE_NO_LIMIT_DATA"));},J=function(){if(!i._filterState.range){K.setBusy(true);i._getTimeFilterData().then(function(){K.setBusy(false);if((!i._minDate||!i._maxDate)||(!(i._minDate instanceof Date)||!(i._maxDate instanceof Date))){H();return;}if(!i._rangeFilterType){i._rangeFilterType=i._calculateRangeTypeFilter();}if(!i._startDate&&!i._endDate){i._setRangeFilter();}else{var N=i._objects.getTimeRangeSlider(),Q=i._fnDateDiff(i._rangeFilterType),U=N.getMin(),W=N.getMax();if(W-U!==Q){i._setRangeFilter();}j=i._fnDateDiff(i._rangeFilterType,i._minDate,i._startDate);E=i._fnDateDiff(i._rangeFilterType,i._minDate,i._endDate);N.setRange([j,E]);}i.toggleGroupTypeSelector(i._rangeFilterType);i._objects.getTimeFilterSelect().setSelectedKey(i._rangeFilterType);}).catch(function(){K.setBusy(false);H();});i._filterState.range=true;}},K=new V(i.getId()+"-filterContent",{confirm:function(N){var Q=N.getParameter("filterItems"),U,W,X,Y,Z;i._currentFilterKeys=Q.map(function(b1){return{key:b1.getProperty("key"),text:b1.getProperty("text")};});i._startDate=null;i._endDate=null;if(i._objects.getTimestampFilterPicker().getVisible()){var $=i._objects.getTimestampFilterPicker().getStartDate()||i._minDate,a1=i._objects.getTimestampFilterPicker().getEndDate()||i._maxDate;if($!==i._minDate||a1!==i._maxDate){i._startDate=$;i._endDate=a1;Z=true;}}else{U=i._objects.getTimeRangeSlider();Y=U.getRange();W=U.getMin();X=U.getMax();if(Y[0]!==W||Y[1]!==X){i._startDate=i._fnAddDate(Math.min.apply(null,Y),D.DOWN);i._endDate=i._fnAddDate(Math.max.apply(null,Y),D.UP);Z=true;}}i._filterData(Z);},resetFilters:function(N){var Q=i._objects.getTimeRangeSlider();Q.setValue(Q.getMin());Q.setValue2(Q.getMax());i._filterDialogRangePage.setFilterCount(0);i._objects.getTimestampFilterPicker().clearDates();},filterDetailPageOpened:function(N){var Q=N.getParameter("parentFilterItem").getProperty("key");if(Q==="items"){G(N.getParameter("parentFilterItem"));}if(Q==="range"){J();}}});i._setupFilterFirstPage(K);return K;});};A.prototype._setupHeaderToolbar=function(){var i=this,j=function(G){i._objects.register(G.name,function(){var H=new e(i.getId()+"-"+G.name,{type:B.Transparent,icon:G.icon,tooltip:G.tooltip,press:G.fnPress});H.setLayoutData(new h({priority:G.priority}));return H;});};j({name:"filterIcon",icon:"sap-icon://add-filter",tooltip:w.getText("TIMELINE_FILTER_BY"),fnPress:[i._openFilterDialog,i],priority:u.NeverOverflow,visible:i.getShowItemFilter()||i.getShowTimeFilter()});j({name:"sortIcon",icon:"sap-icon://arrow-bottom",tooltip:w.getText("TIMELINE_SORT"),fnPress:[i._sortClick,i],priority:u.High,visible:i.getSort()&&i.getShowSort()});var E=new b();this._objects.register("searchFieldLabel",function(){return new n(i.getId()+"-searchFieldLabel",{text:w.getText("TIMELINE_ACCESSIBILITY_SEARCH")});});this._objects.register("searchField",function(){var G=new S(i.getId()+"-searchField",{width:"14rem",ariaLabelledBy:i._objects.getSearchFieldLabel().getId(),search:function(H){i._search(H.getSource().getValue());},visible:i.getShowSearch()});G.setLayoutData(new h({priority:u.Low}));return G;});this._objects.register("headerBar",function(){var G=[E,i._objects.getSearchFieldLabel(),i._objects.getSearchField(),i._objects.getSortIcon(),i._objects.getFilterIcon()];var H=new O(i.getId()+"-headerBar",{content:G,visible:i.getShowHeaderBar()});H.addStyleClass("sapSuiteUiCommonsTimelineHeaderBar");H.setParent(i);return H;});};A.prototype._setupAccessibilityItems=function(){var i=this;this._objects.register("accessibilityTitle",function(){return new n(i.getId()+"-accessibilityTitle",{text:w.getText("TIMELINE_ACCESSIBILITY_TITLE")});});};A.prototype.toggleGroupTypeSelector=function(i){var j=i!==v.None;this._objects.getTimestampFilterPicker().setVisible(!j);this._objects.getTimeRangeSlider().setVisible(j);};}};return z;},true);
