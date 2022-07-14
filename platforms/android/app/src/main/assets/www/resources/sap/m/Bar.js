/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./BarInPageEnabler','./library','sap/ui/core/Control','sap/ui/core/ResizeHandler','sap/ui/Device','./BarRenderer',"sap/ui/thirdparty/jquery"],function(B,l,C,R,D,a,q){"use strict";var b=l.BarDesign;var T=l.TitleAlignment;var c=C.extend("sap.m.Bar",{metadata:{interfaces:["sap.m.IBar"],library:"sap.m",properties:{enableFlexBox:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},translucent:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},design:{type:"sap.m.BarDesign",group:"Appearance",defaultValue:b.Auto},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:T.None}},aggregations:{contentLeft:{type:"sap.ui.core.Control",multiple:true,singularName:"contentLeft"},contentMiddle:{type:"sap.ui.core.Control",multiple:true,singularName:"contentMiddle"},contentRight:{type:"sap.ui.core.Control",multiple:true,singularName:"contentRight"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/m/designtime/Bar.designtime",dnd:{draggable:false,droppable:true}}});c.prototype.onBeforeRendering=function(){var s=this.getTitleAlignment(),A;this._removeAllListeners();for(A in T){if(A!==s){this.removeStyleClass("sapMBarTitleAlign"+A);}else{this.addStyleClass("sapMBarTitleAlign"+A);}}};c.prototype.onAfterRendering=function(){this._handleResize();};c.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);this._sPrevTitleAlignmentClass="";};c.prototype.exit=function(){this._removeAllListeners();if(this._oflexBox){this._oflexBox.destroy();this._oflexBox=null;}this._$MidBarPlaceHolder=null;this._$RightBar=null;this._$LeftBar=null;};c._aResizeHandlers=["_sResizeListenerId","_sResizeListenerIdMid","_sResizeListenerIdRight","_sResizeListenerIdLeft"];c.prototype._removeAllListeners=function(){var t=this;c._aResizeHandlers.forEach(function(i){t._removeListenerFailsave(i);});};c.prototype._removeListenerFailsave=function(L){if(this[L]){R.deregister(this[L]);this[L]=null;}};c.prototype._handleResize=function(){this._removeAllListeners();var e=!!this.getContentLeft().length,f=!!this.getContentMiddle().length,g=!!this.getContentRight().length;if(!this.getVisible()){return;}if(!e&&!f&&!g){return;}this._$LeftBar=this.$("BarLeft");this._$RightBar=this.$("BarRight");this._$MidBarPlaceHolder=this.$("BarPH");this._updatePosition(e,f,g);this._sResizeListenerId=R.register(this.getDomRef(),q.proxy(this._handleResize,this));if(this.getEnableFlexBox()){return;}if(e){this._sResizeListenerIdLeft=R.register(this._$LeftBar[0],q.proxy(this._handleResize,this));}if(f){this._sResizeListenerIdMid=R.register(this._$MidBarPlaceHolder[0],q.proxy(this._handleResize,this));}if(g){this._sResizeListenerIdRight=R.register(this._$RightBar[0],q.proxy(this._handleResize,this));}};c.prototype._updatePosition=function(e,f,g){if(!e&&!g&&f){return;}if(e&&!f&&!g){return;}if(!e&&!f&&g){return;}var i=this.$().outerWidth(true);this._$RightBar.css({width:""});this._$LeftBar.css({width:""});this._$MidBarPlaceHolder.css({position:"",width:"",visibility:"hidden"});var r=this._$RightBar.outerWidth(true);if(r>i){if(e){this._$LeftBar.css({width:"0px"});}if(f){this._$MidBarPlaceHolder.css({width:"0px"});}this._$RightBar.css({width:i+"px"});return;}var L=this._getBarContainerWidth(this._$LeftBar);if(i<(L+r)){L=i-r;this._$LeftBar.css({width:L+"px"});this._$MidBarPlaceHolder.css({width:"0px"});return;}this._$MidBarPlaceHolder.css(this._getMidBarCss(r,i,L));};c.prototype._getMidBarCss=function(r,i,L){var m=this._$MidBarPlaceHolder.outerWidth(true),e=sap.ui.getCore().getConfiguration().getRTL(),s=e?"right":"left",M={visibility:""};if(this.getEnableFlexBox()){m=i-L-r-parseInt(this._$MidBarPlaceHolder.css('margin-left'))-parseInt(this._$MidBarPlaceHolder.css('margin-right'));M.position="absolute";M.width=m+"px";M[s]=L;return M;}var S=i-L-r,f=(i/2)-(m/2),g=L>f,h=(i/2)+(m/2),j=(i-r)<h,t=this.getTitleAlignment();if((t!==T.None&&t!==T.Center)||(S>0&&(g||j))){M.position="absolute";M.width=S+"px";M.left=e?r:L;}return M;};c.prototype._getBarContainerWidth=function($){var i,e=0,f=$.children(),g=0;if(D.browser.webkit||D.browser.firefox){for(i=0;i<f.length;i++){g+=q(f[i]).outerWidth(true);}e=$.outerWidth(true);}else{var o;for(i=0;i<f.length;i++){o=window.getComputedStyle(f[i]);if(o.width=="auto"){g+=q(f[i]).width()+1;}else{g+=parseFloat(o.width);}g+=parseFloat(o.marginLeft);g+=parseFloat(o.marginRight);g+=parseFloat(o.paddingLeft);g+=parseFloat(o.paddingRight);}var h=window.getComputedStyle($[0]);e+=parseFloat(h.width);e+=parseFloat(h.marginLeft);e+=parseFloat(h.marginRight);e+=parseFloat(h.paddingLeft);e+=parseFloat(h.paddingRight);}if(e<g){e=g;}return e;};var d=B.extend("sap.m.BarInAnyContentEnabler",{});d.mContexts={dialogFooter:{contextClass:"sapMFooter-CTX",tag:"Footer"}};d.prototype.getContext=function(){var p=B.prototype.getContext.call();for(var k in d.mContexts){p[k]=d.mContexts[k];}return p;};c.prototype.getContext=d.prototype.getContext;c.prototype.isContextSensitive=d.prototype.isContextSensitive;c.prototype.setHTMLTag=d.prototype.setHTMLTag;c.prototype.getHTMLTag=d.prototype.getHTMLTag;c.prototype.applyTagAndContextClassFor=d.prototype.applyTagAndContextClassFor;c.prototype._applyContextClassFor=d.prototype._applyContextClassFor;c.prototype._applyTag=d.prototype._applyTag;c.prototype._getContextOptions=d.prototype._getContextOptions;c.prototype._setRootAccessibilityRole=d.prototype._setRootAccessibilityRole;c.prototype._getRootAccessibilityRole=d.prototype._getRootAccessibilityRole;c.prototype._setRootAriaLevel=d.prototype._setRootAriaLevel;c.prototype._getRootAriaLevel=d.prototype._getRootAriaLevel;return c;});
