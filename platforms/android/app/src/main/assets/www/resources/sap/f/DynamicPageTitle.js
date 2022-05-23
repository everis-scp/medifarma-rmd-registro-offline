/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/base/ManagedObjectObserver","sap/m/library","sap/m/Toolbar","sap/m/ToolbarSeparator","sap/m/OverflowToolbar","sap/m/Button","sap/ui/core/InvisibleText","./DynamicPageTitleRenderer","sap/base/Log","sap/ui/core/HTML","sap/ui/core/Icon","sap/ui/Device","sap/ui/events/KeyCodes"],function(l,C,M,m,T,a,O,B,I,D,L,H,b,c,K){"use strict";var d=l.DynamicPageTitleArea,e=m.ToolbarStyle;var o=sap.ui.getCore();var f=C.extend("sap.f.DynamicPageTitle",{metadata:{library:"sap.f",properties:{primaryArea:{type:"sap.f.DynamicPageTitleArea",group:"Appearance",defaultValue:d.Begin},areaShrinkRatio:{type:"sap.f.DynamicPageTitleShrinkRatio",group:"Appearance",defaultValue:"1:1.6:1.6"},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance"}},aggregations:{heading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null},snappedHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null},expandedHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null},actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},navigationActions:{type:"sap.m.Button",multiple:true,singularName:"navigationAction"},content:{type:"sap.ui.core.Control",multiple:true},snappedContent:{type:"sap.ui.core.Control",multiple:true},expandedContent:{type:"sap.ui.core.Control",multiple:true},snappedTitleOnMobile:{type:"sap.m.Title",multiple:false},breadcrumbs:{type:"sap.m.IBreadcrumbs",multiple:false},_actionsToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_navActionsToolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"},_navActionsToolbarSeparator:{type:"sap.m.ToolbarSeparator",multiple:false,visibility:"hidden"},_expandButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_snappedTitleOnMobileIcon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_focusSpan:{type:"sap.ui.core.HTML",multiple:false,visibility:"hidden"}},events:{stateChange:{parameters:{isExpanded:{type:"boolean"}}}},designtime:"sap/f/designtime/DynamicPageTitle.designtime"}});function g(v){if(arguments.length===1){return v&&("length"in v)?v.length>0:!!v;}return Array.prototype.slice.call(arguments).every(function(h){return g(h);});}f.NAV_ACTIONS_PLACEMENT_BREAK_POINT=1280;f.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS={headingAreaShrinkFactor:1.6,contentAreaShrinkFactor:1,actionsAreaShrinkFactor:1.6};f.TOGGLE_HEADER_TEXT_ID=I.getStaticId("sap.f","TOGGLE_HEADER");f.DEFAULT_HEADER_TEXT_ID=I.getStaticId("sap.f","DEFAULT_HEADER_TEXT");f._renderControl=function(h,j){var r;if(!j||!h){return;}r=o.createRenderManager();r.renderControl(j);r.flush(h);r.destroy();};function i(h){return typeof h==="function";}f.prototype.init=function(){this._bExpandedState=true;this._bShowExpandButton=false;this._bIsFocusable=true;this._fnActionSubstituteParentFunction=function(){return this;}.bind(this);this._bNavigationActionsInTopArea=false;this._oRB=o.getLibraryResourceBundle("sap.f");this._oObserver=new M(f.prototype._observeChanges.bind(this));this._oObserver.observe(this,{aggregations:["content","_actionsToolbar"]});this._oRB=sap.ui.getCore().getLibraryResourceBundle("sap.f");};f.prototype.onBeforeRendering=function(){this._getActionsToolbar();this._observeControl(this.getBreadcrumbs());};f.prototype.onAfterRendering=function(){this._cacheDomElements();this._toggleState(this._bExpandedState);this._doNavigationActionsLayout();};f.prototype.exit=function(){if(this._oObserver){this._oObserver.disconnect();this._oObserver=null;}};f.prototype.setPrimaryArea=function(A){var s=this.getAreaShrinkRatio(),S=this._getShrinkFactorsObject(),h=this.getMetadata().getProperty("areaShrinkRatio").getDefaultValue();if(!this.getDomRef()){return this.setProperty("primaryArea",A,true);}if(s!==h){return this.setProperty("primaryArea",A,true);}if(A===d.Begin){this._setShrinkFactors(S.headingAreaShrinkFactor,S.contentAreaShrinkFactor,S.actionsAreaShrinkFactor);}else{this._setShrinkFactors(f.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.headingAreaShrinkFactor,f.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.contentAreaShrinkFactor,f.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.actionsAreaShrinkFactor);}return this.setProperty("primaryArea",A,true);};f.prototype.setAreaShrinkRatio=function(A){A=this.validateProperty("areaShrinkRatio",A);this.setProperty("areaShrinkRatio",A,true);var s=this._getShrinkFactorsObject();if(this.getPrimaryArea()===d.Middle){L.warning("DynamicPageTitle :: Property primaryArea is disregarded when areaShrinkRatio is set.",this);}if(s.headingAreaShrinkFactor>1&&s.contentAreaShrinkFactor>1&&s.actionsAreaShrinkFactor>1){L.warning("DynamicPageTitle :: One of the shrink factors should be set to 1.",this);}this._setShrinkFactors(s.headingAreaShrinkFactor,s.contentAreaShrinkFactor,s.actionsAreaShrinkFactor);return this;};f.prototype.ontap=function(E){var s=E.srcControl;if(s===this||s===this.getAggregation("_actionsToolbar")||s===this.getAggregation("breadcrumbs")||s===this.getAggregation("snappedTitleOnMobile")){this.fireEvent("_titlePress");}};f.prototype.onmouseover=function(){if(this._bTitleMouseOverFired){return;}this.fireEvent("_titleMouseOver");this._bTitleMouseOverFired=true;};f.prototype.onmouseout=function(E){if(E&&this.getDomRef().contains(E.relatedTarget)){return;}this.fireEvent("_titleMouseOut");this._bTitleMouseOverFired=false;};f.prototype.onkeyup=function(E){if(E&&E.which===K.SPACE&&!E.shiftKey){this.onsapenter(E);}};f.prototype.onsapspace=function(E){if(E.srcControl===this){E.preventDefault();}};f.prototype.onsapenter=function(E){if(E.srcControl===this){this.fireEvent("_titlePress");}};["addAction","insertAction","removeAction","indexOfAction","removeAllActions","destroyActions","getActions"].forEach(function(s){f.prototype[s]=function(h){var t=this._getActionsToolbar(),j=s.replace(/Actions?/,"Content"),S=true,r;if(s==="addAction"||s==="insertAction"){if(!this._actionExists(h,"actions")){t[j].apply(t,arguments);this._preProcessAction(h,"actions");}r=this;}else if(s==="removeAction"){this._postProcessAction(h);}else if(s==="removeAllActions"){this.getActions().forEach(this._postProcessAction,this);}else if(s==="destroyActions"){this.getActions().forEach(this._postProcessAction,this);t[j].apply(t,arguments);r=this;}else if(s==="getActions"){S=false;}r=r||t[j].apply(t,arguments);S&&this._updateSeparatorVisibility();return r;};});["addNavigationAction","insertNavigationAction","removeNavigationAction","indexOfNavigationAction","removeAllNavigationActions","destroyNavigationActions","getNavigationActions"].forEach(function(s){f.prototype[s]=function(h){var t=this._getNavigationActionsToolbar(),j=s.replace(/NavigationActions?/,"Content"),k=true,r;if(s==="addNavigationAction"||s==="insertNavigationAction"){if(!this._actionExists(h,"navigationActions")){t[j].apply(t,arguments);this._preProcessAction(h,"navigationActions");}r=this;}else if(s==="removeNavigationAction"){this._postProcessAction(h);}else if(s==="removeAllNavigationActions"){this.getNavigationActions().forEach(this._postProcessAction,this);}else if(s==="destroyNavigationActions"){this.getNavigationActions().forEach(this._postProcessAction,this);t[j].apply(t,arguments);r=this;}else if(s==="getNavigationActions"){k=false;}r=r||t[j].apply(t,arguments);k&&this._updateTopAreaVisibility();return r;};});f.prototype.clone=function(s,h,j){var t=C.prototype.clone.apply(this,arguments),k=true;if(j){k=!!j.cloneChildren;}if(!k){return t;}var n=function(A){if(!this.isBound(A)){var p=this.getMetadata().getAggregation(A);p.get(this).forEach(function(q){p.add(t,q.clone());},this);}}.bind(this);n("actions");n("navigationActions");return t;};f.prototype._actionExists=function(A,s){return this.getMetadata().getAggregation(s).get(this).indexOf(A)>-1;};f.prototype._cacheDomElements=function(){this.$topNavigationActionsArea=this.$("topNavigationArea");this.$mainNavigationActionsArea=this.$("mainNavigationArea");this.$beginArea=this.$("left-inner");this.$topArea=this.$("top");this.$mainArea=this.$("main");this.$middleArea=this.$("content");this.$snappedTitleOnMobileWrapper=this.$("snapped-title-on-mobile-wrapper");this.$snappedHeadingWrapper=this.$("snapped-heading-wrapper");this.$expandHeadingWrapper=this.$("expand-heading-wrapper");this.$snappedWrapper=this.$("snapped-wrapper");this.$expandWrapper=this.$("expand-wrapper");};f.prototype._getActionsToolbar=function(){if(!this.getAggregation("_actionsToolbar")){this.setAggregation("_actionsToolbar",new O({id:this.getId()+"-_actionsToolbar",style:e.Clear}).addStyleClass("sapFDynamicPageTitleActionsBar"),true);}return this.getAggregation("_actionsToolbar");};f.prototype._getNavigationActionsToolbar=function(){if(!this.getAggregation("_navActionsToolbar")){this.setAggregation("_navActionsToolbar",new T({id:this.getId()+"-navActionsToolbar",style:e.Clear}).addStyleClass("sapFDynamicPageTitleActionsBar"),true);}return this.getAggregation("_navActionsToolbar");};f.prototype._getToolbarSeparator=function(){if(!this.getAggregation("_navActionsToolbarSeparator")){this.setAggregation("_navActionsToolbarSeparator",new a({id:this.getId()+"-separator"}),true);}return this.getAggregation("_navActionsToolbarSeparator");};f.prototype._toggleFocusableState=function(F){var $;this._bIsFocusable=F;$=this._getFocusSpan().$();F?$.attr("tabindex",0):$.removeAttr("tabindex");};f.prototype._preProcessAction=function(A,p){if(i(A._fnOriginalGetParent)){return;}this._observeControl(A);A._fnOriginalGetParent=A.getParent;A.getParent=this._fnActionSubstituteParentFunction;A._sOriginalParentAggregationName=A.sParentAggregationName;A.sParentAggregationName=p;};f.prototype._postProcessAction=function(A){if(!i(A._fnOriginalGetParent)){return;}this._unobserveControl(A);A.getParent=A._fnOriginalGetParent;A._fnOriginalGetParent=null;A.sParentAggregationName=A._sOriginalParentAggregationName;A._sOriginalParentAggregationName=null;};f.prototype._observeControl=function(h){this._oObserver.observe(h,{properties:["visible"]});};f.prototype._unobserveControl=function(h){this._oObserver.unobserve(h,{properties:["visible"]});};f.prototype._doNavigationActionsLayout=function(){var r,n,N;if(this.getNavigationActions().length===0){return;}N=this._getNavigationActionsToolbar();r=this._shouldRenderNavigationActionsInTopArea();if(r){n=this.$topNavigationActionsArea[0];}else{n=this.$mainNavigationActionsArea[0];}this._bNavigationActionsInTopArea=r;f._renderControl(n,N);this._updateSeparatorVisibility();};f.prototype._updateTopAreaVisibility=function(h){var n=this._areNavigationActionsInTopArea(),N=this._shouldRenderNavigationActionsInTopArea(h),j=this.getBreadcrumbs()&&this.getBreadcrumbs().getVisible(),k=c.system.phone&&this.getSnappedTitleOnMobile()&&!this._bExpandedState,s=(j||N)&&!k,S=this.getNavigationActions().length>0&&(N^n);this._toggleTopAreaVisibility(s);if(S){this._toggleNavigationActionsPlacement(N);}else{this._updateSeparatorVisibility();}};f.prototype._onResize=function(h){this._updateTopAreaVisibility(h);};f.prototype._toggleNavigationActionsPlacement=function(s){this["_showNavigationActionsIn"+(s?"Top":"Main")+"Area"]();this._updateSeparatorVisibility();};f.prototype._showNavigationActionsInTopArea=function(){var n=this._getNavigationActionsToolbar();if(this.$topNavigationActionsArea&&this.$topNavigationActionsArea.length>0){this.$topNavigationActionsArea.html(n.$());}this._bNavigationActionsInTopArea=true;};f.prototype._showNavigationActionsInMainArea=function(){var n=this._getNavigationActionsToolbar();if(this.$mainNavigationActionsArea&&this.$mainNavigationActionsArea.length>0){this.$mainNavigationActionsArea.html(n.$());}this._bNavigationActionsInTopArea=false;};f.prototype._areNavigationActionsInTopArea=function(){return this._bNavigationActionsInTopArea;};f.prototype._updateSeparatorVisibility=function(){if(this.getDomRef()){this._getToolbarSeparator().toggleStyleClass("sapUiHidden",!this._shouldShowSeparator());}};f.prototype._toggleTopAreaVisibility=function(s){if(this.getDomRef()){this.$("top").toggleClass("sapUiHidden",!s);}};f.prototype._shouldShowSeparator=function(){var h,j;if(this._bNavigationActionsInTopArea){return false;}h=this._getVisibleActions().length>0;j=this._getVisibleNavigationActions().length>0;return h&&j;};f.prototype._getVisibleActions=function(){return this.getActions().filter(function(A){return A.getVisible();});};f.prototype._getVisibleNavigationActions=function(){return this.getNavigationActions().filter(function(A){return A.getVisible();});};f.prototype._setShrinkFactors=function(h,j,A){this.$("left-inner").css("flex-shrink",h);this.$("content").css("flex-shrink",j);this.$("mainActions").css("flex-shrink",A);};f.prototype._shouldRenderNavigationActionsInTopArea=function(h){var w,j,k;if(this._getVisibleNavigationActions().length===0){return false;}w=h?h:this._getWidth();j=this._getVisibleActions().length>0;k=this.getBreadcrumbs()&&this.getBreadcrumbs().getVisible();return w<f.NAV_ACTIONS_PLACEMENT_BREAK_POINT&&(k||j);};f.prototype._toggleState=function(E,u){var h=this._bExpandedState;this._bExpandedState=E;if(c.system.phone&&this.getSnappedTitleOnMobile()){this.$snappedTitleOnMobileWrapper.toggleClass("sapUiHidden",E);this.$topArea.toggleClass("sapUiHidden",!E);this.$mainArea.toggleClass("sapUiHidden",!E);this.$().toggleClass("sapContrast",!E);}else{if(g(this.getSnappedHeading())){this.$snappedHeadingWrapper.toggleClass("sapUiHidden",E);}if(g(this.getExpandedHeading())){this.$expandHeadingWrapper.toggleClass("sapUiHidden",!E);}if(u&&h!==E){this.fireEvent("stateChange",{isExpanded:E});}}if(g(this.getSnappedContent())){this.$snappedWrapper.toggleClass("sapUiHidden",E);this.$snappedWrapper.parent().toggleClass("sapFDynamicPageTitleMainSnapContentVisible",!E);}if(g(this.getExpandedContent())){this.$expandWrapper.toggleClass("sapUiHidden",!E);this.$expandWrapper.parent().toggleClass("sapFDynamicPageTitleMainExpandContentVisible",E);}};f.prototype._getExpandButton=function(){if(!this.getAggregation("_expandButton")){var E=new B({id:this.getId()+"-expandBtn",icon:"sap-icon://slim-arrow-down",press:this._onExpandButtonPress.bind(this),tooltip:this._oRB.getText("EXPAND_HEADER_BUTTON_TOOLTIP")}).addStyleClass("sapFDynamicPageToggleHeaderIndicator sapUiHidden");this.setAggregation("_expandButton",E,true);}return this.getAggregation("_expandButton");};f.prototype._getSnappedTitleOnMobileIcon=function(){if(!this.getAggregation("_snappedTitleOnMobileIcon")){var h=new b({id:this.getId()+"-snappedTitleOnMobileIcon",src:"sap-icon://slim-arrow-down",press:this._onExpandButtonPress.bind(this)});this.setAggregation("_snappedTitleOnMobileIcon",h,true);}return this.getAggregation("_snappedTitleOnMobileIcon");};f.prototype._onExpandButtonPress=function(){this.fireEvent("_titleVisualIndicatorPress");};f.prototype._toggleExpandButton=function(t){this._setShowExpandButton(t);this._getExpandButton().$().toggleClass("sapUiHidden",!t);};f.prototype._getShowExpandButton=function(){return this._bShowExpandButton;};f.prototype._setShowExpandButton=function(v){this._bShowExpandButton=!!v;};f.prototype._focusExpandButton=function(){this._getExpandButton().$().focus();};f.prototype._getWidth=function(){return this.$().outerWidth();};f.prototype._getState=function(){var h=this.getActions().length>0,j=this.getNavigationActions().length>0,k=this.getContent(),s=this.getSnappedContent(),E=this.getExpandedContent(),n=E.length>0,p=s.length>0,S=this._getShrinkFactorsObject(),q=this._getExpandButton(),F=this._getFocusSpan(),r=this.getBreadcrumbs(),t=this.getSnappedTitleOnMobile(),u=this._getSnappedTitleOnMobileIcon(),v=t&&c.system.phone,w=r||j,x=!!(r&&!j),y=j&&!r,A=this.getMetadata().getProperty("areaShrinkRatio").getDefaultValue();if(this.getAreaShrinkRatio()===A&&this.getPrimaryArea()===d.Middle){S.headingAreaShrinkFactor=f.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.headingAreaShrinkFactor;S.contentAreaShrinkFactor=f.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.contentAreaShrinkFactor;S.actionsAreaShrinkFactor=f.PRIMARY_AREA_MIDDLE_SHRINK_FACTORS.actionsAreaShrinkFactor;}q.toggleStyleClass("sapUiHidden",!this._getShowExpandButton());return{id:this.getId(),actionBar:this._getActionsToolbar(),navigationBar:this._getNavigationActionsToolbar(),hasActions:h,hasNavigationActions:j,content:k,hasContent:k.length>0,heading:this.getHeading(),snappedHeading:this.getSnappedHeading(),expandedHeading:this.getExpandedHeading(),expandButton:q,focusSpan:F,snappedTitleOnMobileContext:t,snappedTitleOnMobileIcon:u,snappedContent:s,expandedContent:E,hasSnappedContent:p,hasExpandedContent:n,hasSnappedTitleOnMobile:v,hasAdditionalContent:n||(p&&!v),isSnapped:!this._bExpandedState,headingAreaShrinkFactor:S.headingAreaShrinkFactor,contentAreaShrinkFactor:S.contentAreaShrinkFactor,actionsAreaShrinkFactor:S.actionsAreaShrinkFactor,breadcrumbs:this.getBreadcrumbs(),separator:this._getToolbarSeparator(),hasTopContent:w,hasOnlyBreadcrumbs:x,hasOnlyNavigationActions:y,contentAreaFlexBasis:this._sContentAreaFlexBasis,actionsAreaFlexBasis:this._sActionsAreaFlexBasis,isFocusable:this._bIsFocusable};};f.prototype._getShrinkFactorsObject=function(){var r={},A=this.getAreaShrinkRatio().split(":");r.headingAreaShrinkFactor=parseFloat(A[0]);r.contentAreaShrinkFactor=parseFloat(A[1]);r.actionsAreaShrinkFactor=parseFloat(A[2]);return r;};f.prototype._observeChanges=function(h){var j=h.object,s=h.name;if(j===this){if(s==="content"||s==="_actionsToolbar"){this._observeContentChanges(h);}}else if(s==="visible"){this._updateTopAreaVisibility();}};f.prototype._observeContentChanges=function(h){var j=h.child,s=h.mutation;if(!(j instanceof O)){return;}if(s==="insert"){j.attachEvent("_contentSizeChange",this._onContentSizeChange,this);}else if(s==="remove"){j.detachEvent("_contentSizeChange",this._onContentSizeChange,this);this._setContentAreaFlexBasis(0,j.$().parent());}};f.prototype._onContentSizeChange=function(E){var h=E.getParameter("contentSize"),n=E.getParameter("invalidate");if(n){this.invalidate();}else{this._setContentAreaFlexBasis(h,E.getSource().$().parent());}};f.prototype._setContentAreaFlexBasis=function(h,$){var F,s;h=parseInt(h);F=h?h+"px":"auto";s=F!=="auto"?F:undefined;$.css({"flex-basis":F});if($.hasClass("sapFDynamicPageTitleMainContent")){this._sContentAreaFlexBasis=s;}else if($.hasClass("sapFDynamicPageTitleMainActions")){this._sActionsAreaFlexBasis=s;}};f.prototype._updateARIAState=function(E){var A=this._getARIALabelReferences(E)||f.DEFAULT_HEADER_TEXT_ID,$=this._getFocusSpan().$();$.attr("aria-labelledby",A);$.attr("aria-expanded",E);return this;};f.prototype._getARIALabelReferences=function(E){var r="",h=this.getHeading()||(E?this.getExpandedHeading():this.getSnappedHeading());if(h){r+=h.getId();}return r;};f.prototype._focus=function(){this._getFocusSpan().$().focus();};f.prototype._getFocusSpan=function(){if(!this.getAggregation("_focusSpan")){var t=this._bIsFocusable?'tabindex="0"':'',s=this._getARIALabelReferences(this._bExpandedState)||f.DEFAULT_HEADER_TEXT_ID,F=new H({id:this.getId()+"-focusSpan",preferDOM:false,content:'<span class="sapFDynamicPageTitleFocusSpan" role="button" '+t+'data-sap-ui="'+this.getId()+'-focusSpan"'+' aria-expanded="'+this._bExpandedState+'" aria-labelledby="'+s+'" aria-describedby="'+f.TOGGLE_HEADER_TEXT_ID+'"></span>'});F.onfocusin=this._addFocusClass.bind(this);F.onfocusout=this._removeFocusClass.bind(this);F.onsapenter=function(){this.fireEvent("_titlePress");}.bind(this);F.onkeyup=function(E){if(E&&E.which===K.SPACE&&!E.shiftKey){this.fireEvent("_titlePress");}}.bind(this);this.setAggregation("_focusSpan",F,true);}return this.getAggregation("_focusSpan");};f.prototype._addFocusClass=function(){this.$().addClass("sapFDynamicPageTitleFocus");};f.prototype._removeFocusClass=function(){this.$().removeClass("sapFDynamicPageTitleFocus");};return f;});