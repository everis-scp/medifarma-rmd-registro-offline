/*!
 * 
		SAP UI development toolkit for HTML5 (SAPUI5)
		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["./library","sap/suite/ui/commons/util/HtmlElement","sap/ui/core/Icon","sap/m/Button","sap/base/security/encodeXML"],function(l,H,I,B,e){"use strict";var T=l.TimelineAxisOrientation,S=l.TimelineScrollingFadeout;var a={},r=sap.ui.getCore().getLibraryResourceBundle("sap.suite.ui.commons");a.render=function(R,t){var m=this._getHtmlModel(t);m.getRenderer().render(R);};a._getHtmlModel=function(t){if(t.getAxisOrientation()===T.Horizontal){return this._getHorizontalTimelineElement(t);}else{return this._getVerticalTimelineElement(t);}};a._getScrollerIcon=function(t,i,d){var b=new H("div"),n="scrollerIcon"+d,g="getScrollerIcon"+d;b.addClass(e("sapSuiteUiCommonsTimelineScrollerIconWrapper sapSuiteUiCommonsTimelineScrollerIconWrapper"+d));t._objects.register(n,function(){return new I({src:"sap-icon://step"});});b.addChild(t._objects[g]());return b;};a._setWidthAndHeight=function(t,b){var h=t.getHeight(),w=t.getWidth();if(h&&!t._isVertical()){b.addStyle("height",h);}if(w&&(t._isVertical()||t.getEnableScroll())){b.addStyle("width",w);}};a._getHorizontalTimelineElement=function(t){var b=t.getEnableDoubleSided(),c=t._isLeftAlignment(),C=t._outputItem,g=0,d=true,o,p,f,h,n,j,m=t._isMaxed(),L,q=function(){var N=new H("ul");N.setAttribute("role","listbox");return N;};var s=new H("div"),u=new H("div"),v=new H("div"),w=new H("div"),x=new H("div"),y=q(),z=new H("div"),A=q(),D=new H("div"),E=q(),F=new H("div"),G=new H("div"),J=new H("div"),K=new H("div");s.addControlData(t);s.addClass("sapSuiteUiCommonsTimelineH");if(!t.getEnableScroll()){s.addClass("sapSuiteUiCommonsTimelineNoScroll");}if(t._useAutomaticHeight()){s.addClass("sapSuiteUiCommonsTimelineAutomaticLineHeight");}this._addAccessibilityTags(s,t);this._setWidthAndHeight(t,s);if(b){s.addClass("sapSuiteUiCommonsTimelineDblSidedH");}else{s.addClass(c?"sapSuiteUiCommonsTimelineRight":"sapSuiteUiCommonsTimelineLeft");}if(t._isGrouped()){s.addClass("sapSuiteUiCommonsTimelineGrouped");}s.addChild(t._objects.getHeaderBar());t._setMessageBars(s);J.setId(t.getId()+"-contentH-before");s.addChild(J);u.setId(t.getId()+"-contentH");u.addClass("sapSuiteUiCommonsTimelineContentsH");s.addChild(u);K.setId(t.getId()+"-contentH-after");s.addChild(K);v.setId(t.getId()+"-scrollH");v.addClass("sapSuiteUiCommonsTimelineScrollH");u.addChild(v);x.addClass("sapSuiteUiCommonsTimelineHorizontalTopLine");z.addClass("sapSuiteUiCommonsTimelineHorizontalMiddleLine");z.addChild(A);D.addClass("sapSuiteUiCommonsTimelineHorizontalBottomLine");if(b||c){x.addChild(y);}if(b||!c){D.addChild(E);}y.addClass("sapSuiteUiCommonsTimelineHorizontalScrollingLine");E.addClass("sapSuiteUiCommonsTimelineHorizontalScrollingLine");A.addClass("sapSuiteUiCommonsTimelineHorizontalScrollingLine");if(C.length>0){if(t._scrollingFadeout()){s.addChild(F);s.addChild(G);F.addClass("sapSuiteUiCommonsTimelineHorizontalLeftScroller sapSuiteUiCommonsTimelineHorizontalScroller");G.addClass("sapSuiteUiCommonsTimelineHorizontalRightScroller sapSuiteUiCommonsTimelineHorizontalScroller");if(t.getScrollingFadeout()===S.AreaWithButtons){F.addChild(this._getScrollerIcon(t,"_scollerIconLeft","Left"));G.addChild(this._getScrollerIcon(t,"_scollerIconRight","Right"));}}w.addClass("sapSuiteUiCommonsTimelineHorizontalScrollContainer");v.addChild(w);w.addChild(x);w.addChild(z);w.addChild(D);A.addChild(this._getFirstHorizontalDelimiterLine(C[0]));for(var i=0;i<C.length;i++){L=m;o=C[i];p=c?"top":"bottom";f=(g%2);h=o.getText()==="GroupHeader";n=C[i+1];j=c?y:E;if(b){j=y;if(!h){j=f?E:y;}p=f?"bottom":"top";}if(h){g=0;d=true;p="top";if(L){for(var k=i+1;k<C.length;k++){if(C[k]._isGroupHeader){L=false;break;}}}}else if(f){o._isFirstGroupEvenItem=d;d=false;}o._index=i;o._orientation="H";o._placementLine=p;j.addChild(o);var M=this._getHorizontalDelimiterLine(t,o,g,n,m&&!n,L);if(M){A.addChild(M);}if(!h){g++;}}}else{v.addChild(this._getEmptyTimelineElement(t));}if(t._showMore){A.addChild(this._getShowMoreElement(t));}return s;};a._getFirstHorizontalDelimiterLine=function(t){var b=new H("li"),c=new H("div"),d=new H("div"),f=new H("div"),i=t._isGroupHeader;f.addClass("sapSuiteUiCommonsTimelineItemBarH");d.addClass("sapSuiteUiCommonsTimelineItemBarWrapper");d.addChild(f);c.addChild(d);c.addClass("sapSuiteUiCommonsTimelineItemBarDivWrapper");b.addChild(c);b.addClass("sapSuiteUiCommonsTimelineItemFirstBar");if(i){b.addClass(t._isGroupCollapsed()?"sapSuiteUiCommonsTimelineGroupCollapsed":"sapSuiteUiCommonsTimelineGroupExpanded");}return b;};a._getHorizontalDelimiterLine=function(t,o,i,n,L,b){var c=(i%2),d=o.getText()==="GroupHeader",s=d?"sapSuiteUiCommonsTimelineItemGroupHeaderH":"sapSuiteUiCommonsTimelineItemBaseLength",f="sapSuiteUiCommonsTimelineItemBarH",g=n!=null&&n._isGroupHeader,h=n===null,j=o._getStatusColorClass(),k=new H("li"),m=new H("div"),p=new H("div"),q=new H("div"),u=new H("div"),v=new H("div"),w=new H("div");k.setId(o.getId()+"-line");if(d&&!o._isGroupCollapsed()){k.addStyle("display","none");}if(o._groupID){k.setAttribute("groupid",o._groupID,true);}if(d){f="sapSuiteUiCommonsTimelineItemGroupHeaderBar";k.setAttribute("nodeType","GroupHeaderBar");}else if(t.getEnableDoubleSided()){if((!g||c)&&!h){s=c?"sapSuiteUiCommonsTimelineItemHOdd":"sapSuiteUiCommonsTimelineItemHEven";}}if((!d&&L)||(d&&b)){k.addClass("sapSuiteUiCommonsTimelineLastItem");}k.addClass(e(s));q.addClass("sapSuiteUiCommonsTimelineItemBarWrapper");p.addClass("sapSuiteUiCommonsTimelineItemBarH");p.addClass(e(f));m.addStyle("display","flex");m.addStyle("height","100%");if(t.getShowIcons()||d){m.addChild(u);if(!d){if(j){u.addClass(e(j));}else{u.addClass("sapSuiteUiCommonsTimelineNoStatus");}u.addClass("sapSuiteUiCommonsTimelineItemIconWrapper");}else{u.addClass("sapSuiteUiCommonsTimelineItemGroupBarIconWrapper");}u.addChild(o._getLineIcon());}else{w.addChild(v);w.addClass("sapSuiteUiCommonsTimelineItemNoIconWrapper");v.addClass("sapSuiteUiCommonsTimelineItemNoIcon");if(j){v.addClass(e(j));}else{v.addClass("sapSuiteUiCommonsTimelineNoStatus");}m.addClass("sapSuiteUiCommonsTimelineItemWrapper");m.addChild(w);}m.addChild(q);q.addChild(p);if(t._collapsedGroups[o._groupID]){if(d){k.addClass("sapSuiteUiCommonsTimelineItemGroupCollapsedBar");}else{k.addStyle("display","none");}}k.addChild(m);return k;};a._getVerticalTimelineElement=function(t){var b=new H("div"),c=new H("div"),d=new H("div"),f=new H("div"),g=new H("div"),h=new H("div"),j=new H("div"),m=new H("div"),n=new H("div"),o,p,N,q,s,L,C=function(){var o=new H("ul");o.addClass("sapSuiteUiCommonsTimelineItemUlWrapper");o.setAttribute("role","listbox");return o;};b.addControlData(t);b.addClass("sapSuiteUiCommonsTimeline");this._addAccessibilityTags(b,t);h.addClass("sapSuiteUiCommonsTimelineContentWrapper");if(t._isGrouped()){b.addClass("sapSuiteUiCommonsTimelineGrouped");}if(t._scrollingFadeout()){h.addChild(c);h.addChild(d);c.addClass("sapSuiteUiCommonsTimelineTopScroller sapSuiteUiCommonsTimelineVerticalScroller");d.addClass("sapSuiteUiCommonsTimelineBottomScroller sapSuiteUiCommonsTimelineVerticalScroller");if(t.getScrollingFadeout()===S.AreaWithButtons){c.addChild(this._getScrollerIcon(t,"_scollerIconTop","Top"));d.addChild(this._getScrollerIcon(t,"_scrollerIconBottom","Bottom"));}}this._setWidthAndHeight(t,b);b.addChild(t._objects.getHeaderBar());t._setMessageBars(b);if((t.getMessageStrip()!==null)&&(t.getMessageStrip()!==undefined)&&t.getMessageStrip().getText()!==""){b.addChild(t._objects.getMessageStrip());}m.setId(t.getId()+"-content-before");m.setAttribute("tabindex",0);b.addChild(m);b.addChild(h);h.addChild(f);f.setId(t.getId()+"-content");f.setAttribute("data-sap-ui-fastnavgroup","true");f.addClass("sapSuiteUiCommonsTimelineContents");f.addClass("sapSuiteUiCommonsTimelineScrollV");f.addClass("sapSuiteUiCommonsTimelineScroll");n.setId(t.getId()+"-content-after");n.setAttribute("tabindex",0);b.addChild(n);f.addChild(g);g.setId(t.getId()+"-scroll");g.addClass("sapSuiteUiCommonsTimelineScroll");o=C();var u=t._outputItem,v=t._isMaxed();if(u.length>0){g.addChild(o);for(var i=0;i<u.length;i++){L=v;p=u[i];N=u[i+1];q=p._isGroupHeader;p._orientation="V";p._position=t.getAlignment();p._additionalBarClass="";p._index=i;p._isLast=v&&u.length-1===i;if(q){o.setAttribute("groupId",p._groupID,true);}if(q){for(var k=i+1;k<u.length;k++){s=u[k];if(s._isGroupHeader){if(!s._isGroupCollapsed()&&p._isGroupCollapsed()){p._additionalBarClass="sapSuiteUiCommonsTimelineGroupNextExpanded";}L=false;break;}}}p._isLastGroup=L;if(N&&N._isGroupHeader&&!N._isGroupCollapsed()){p._additionalBarClass="sapSuiteUiCommonsTimelineGroupNextExpanded";}if(q&&(i!=0)){o=C();g.addChild(o);}o.addChild(p);}}else{g.addChild(this._getEmptyTimelineElement(t));}if(t._showMore){j.addClass("sapSuiteUiCommonsTimelineShowMoreWrapper");j.addChild(this._getShowMoreElement(t));g.addChild(j);}return b;};a._getEmptyTimelineElement=function(t){var b=new H("div"),c=new H("span");b.addClass("sapSuiteUiCommonsTimelineNoTextWrapper");b.addChild(c);c.addChildEscaped(t.getNoDataText());return b;};a._getShowMoreElement=function(t){var b=t._isVertical()?new H("div"):new H("li"),c="sapSuiteUiCommonsTimelineItemGetMoreButtonV",i="sap-icon://drill-down";if(t.getAxisOrientation()===T.Horizontal){i="sap-icon://process";c="sapSuiteUiCommonsTimelineItemGetMoreButtonH";}t._objects.register("moreButton",function(){var m=new B({icon:i,tooltip:r.getText("TIMELINE_MORE"),press:function(){t._loadMore();}});m.addEventDelegate({onAfterRendering:function(){this.$().attr("tabindex",0);}},m);return m;});b.addClass("sapSuiteUiCommonsTimelineItemGetMoreButton");b.addClass(e(c));b.addChild(t._objects.getMoreButton());return b;};a._addAccessibilityTags=function(b,t){var L=[t._objects.getAccessibilityTitle().getId()];if(t._getFilterMessage()){L.push(t._objects.getFilterMessageText().getId());}b.setAttribute("role","presentation");b.addChild(t._objects.getAccessibilityTitle());b.setAttribute("aria-labelledby",L.join(" "),true);b.setAttribute("aria-live","assertive");};return a;},true);
