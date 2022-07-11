/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Configuration","./TimePickerClockRenderer","sap/ui/Device","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(C,a,T,D,K,q){"use strict";var A=200,b=100,L=1000;var c=C.extend("sap.m.TimePickerClock",{metadata:{library:"sap.m",properties:{enabled:{type:"boolean",group:"Misc",defaultValue:true},itemMin:{type:"int",group:"Data",defaultValue:-1},itemMax:{type:"int",group:"Data",defaultValue:-1},innerItems:{type:"boolean",group:"Appearance",defaultValue:false},label:{type:"string",group:"Appearance",defaultValue:null},fractions:{type:"boolean",group:"Appearance",defaultValue:true},lastItemReplacement:{type:"int",group:"Data",defaultValue:-1},prependZero:{type:"boolean",group:"Appearance",defaultValue:false},selectedValue:{type:"int",group:"Data",defaultValue:-1},displayStep:{type:"int",group:"Data",defaultValue:5},valueStep:{type:"int",group:"Data",defaultValue:1},support2400:{type:"boolean",group:"Misc",defaultValue:false}},events:{change:{parameters:{value:{type:"int"},stringValue:{type:"string"},finalChange:{type:"boolean"}}}}},renderer:T});c.prototype.init=function(){this._onMouseWheel=this._onMouseWheel.bind(this);this._iHoveredValue=-1;this._iPrevHoveredValue=-1;};c.prototype.onBeforeRendering=function(){var d=this.getDomRef();if(d){this._bFocused=d.contains(document.activeElement);this._detachEvents();}if(this.getSupport2400()&&this._get24HoursVisible()===undefined){this._save2400State();}};c.prototype.onAfterRendering=function(){this._attachEvents();};c.prototype.exit=function(){this._detachEvents();};c.prototype.onThemeChanged=function(e){this.invalidate();};c.prototype.setSelectedValue=function(v){var r=this.getLastItemReplacement(),m=this.getItemMax()*(this.getInnerItems()?2:1);if(!this.getSupport2400()){if(v===0){v=m;}if(v===m&&r!==-1){v=r;}}this.setProperty("selectedValue",v);this.fireChange({value:v,stringValue:this._getStringValue(v),finalChange:false});return this;};c.prototype.getSelectedValue=function(){var v=this.getProperty("selectedValue"),r=this.getLastItemReplacement(),m=this.getItemMax()*(this.getInnerItems()?2:1);if(this.getSupport2400()&&this._get24HoursVisible()&&v===m&&r!==-1){v=r;}return parseInt(v);};c.prototype._getStringValue=function(v){var V=v.toString();if(this.getPrependZero()){V=V.padStart(2,"0");}return V;};c.prototype._save2400State=function(){this._set24HoursVisible(this.getSupport2400()&&this.getSelectedValue()===0?false:true);};c.prototype._set24HoursVisible=function(i){if(this.getSupport2400()){this._is24HoursVisible=i;this.setLastItemReplacement(i?24:0);}else{this._is24HoursVisible=false;}};c.prototype._get24HoursVisible=function(){return this.getSupport2400()?this._is24HoursVisible:false;};c.prototype._markToggleAsSelected=function(i){this._selectToggledElement=i;return this;};c.prototype._attachEvents=function(){var e=this._getClockCoverContainerDomRef();this.$().on(D.browser.firefox?"DOMMouseScroll":"mousewheel",this._onMouseWheel);document.addEventListener("mouseup",q.proxy(this._onMouseOutUp,this),false);if(e){if(D.system.combi||D.system.phone||D.system.tablet){e.addEventListener("touchstart",q.proxy(this._onTouchStart,this),false);e.addEventListener("touchmove",q.proxy(this._onTouchMove,this),false);e.addEventListener("touchend",q.proxy(this._onTouchEnd,this),false);}if(D.system.desktop||D.system.combi){e.addEventListener("mousedown",q.proxy(this._onTouchStart,this),false);e.addEventListener("mousemove",q.proxy(this._onTouchMove,this),false);e.addEventListener("mouseup",q.proxy(this._onTouchEnd,this),false);e.addEventListener("mouseout",q.proxy(this._onMouseOut,this),false);}}};c.prototype._detachEvents=function(){var e=this._getClockCoverContainerDomRef();this.$().off(D.browser.firefox?"DOMMouseScroll":"mousewheel",this._onMouseWheel);document.removeEventListener("mouseup",q.proxy(this._onMouseOutUp,this),false);if(e){if(D.system.combi||D.system.phone||D.system.tablet){e.removeEventListener("touchstart",q.proxy(this._onTouchStart,this),false);e.removeEventListener("touchmove",q.proxy(this._onTouchMove,this),false);e.removeEventListener("touchend",q.proxy(this._onTouchEnd,this),false);}if(D.system.desktop||D.system.combi){e.removeEventListener("mousedown",q.proxy(this._onTouchStart,this),false);e.removeEventListener("mousemove",q.proxy(this._onTouchMove,this),false);e.removeEventListener("mouseup",q.proxy(this._onTouchEnd,this),false);e.removeEventListener("mouseout",q.proxy(this._onMouseOut,this),false);}}};c.prototype._getClockCoverContainerDomRef=function(){return this.getDomRef("cover");};c.prototype._onMouseOutUp=function(e){this._mouseOrTouchDown=false;};c.prototype._onMouseOut=function(e){var i=this.getId(),n=document.getElementById(i+"-"+this._iHoveredValue);n&&n.classList.remove("sapMTPCNumberHover");this._iHoveredValue=-1;this._iPrevHoveredValue=-1;};c.prototype.modifyValue=function(i){var s=this.getSelectedValue(),r=this.getLastItemReplacement(),I=this.getInnerItems(),m=this.getItemMin(),M=this.getItemMax()*(I?2:1),S=this.getValueStep(),n;if(s%S!==0){n=i?Math.ceil(s/S)*S:Math.floor(s/S)*S;S=Math.abs(s-n);}if(this.getSupport2400()&&!this._get24HoursVisible()){m=0;M=23;r=-1;}if(s===r){s=M;}if(i){s+=S;if(s>M){s=this.getSupport2400()?m:s-M;}}else{s-=S;if(s<m){s=M;}}this.setSelectedValue(s);};c.prototype._onMouseWheel=function(e){var o=e.originalEvent,i=o.detail?(-o.detail>0):(o.wheelDelta>0);e.preventDefault();if(!this._mouseOrTouchDown){this.modifyValue(i);}};c.prototype._onTouchStart=function(e){this._cancelTouchOut=false;if(!this.getEnabled()){return;}this._iMovSelectedValue=this.getSelectedValue();this._calculateDimensions();this._x=e.type==="touchstart"?e.touches[0].pageX:e.pageX;this._y=e.type==="touchstart"?e.touches[0].pageY:e.pageY;this._calculatePosition(this._x,this._y);if(this.getSupport2400()&&e.type==="touchstart"&&(this._iSelectedValue===24||this._iSelectedValue===0)){this._resetLongTouch();this._startLongTouch();}this._mouseOrTouchDown=true;};c.prototype._onTouchMove=function(e){var i,d,n;e.preventDefault();if(this._mouseOrTouchDown){this._x=e.type==="touchmove"?e.touches[0].pageX:e.pageX;this._y=e.type==="touchmove"?e.touches[0].pageY:e.pageY;this._calculatePosition(this._x,this._y);if(this.getEnabled()&&this._iSelectedValue!==-1&&this._iSelectedValue!==this._iMovSelectedValue){this.setSelectedValue(this._iSelectedValue);this._iMovSelectedValue=this._iSelectedValue;if(this.getSupport2400()&&e.type==="touchmove"&&(this._iSelectedValue===24||this._iSelectedValue===0)){this._resetLongTouch();this._startLongTouch();}}}else if(e.type==="mousemove"){if(!this._dimensionParameters){this._calculateDimensions();}this._x=e.pageX;this._y=e.pageY;this._calculatePosition(this._x,this._y);d=this.getDisplayStep();if(d>1){this._iHoveredValue=Math.round(this._iHoveredValue/d)*d;}if(this.getEnabled()&&this._iHoveredValue!==this._iPrevHoveredValue){i=this.getId();n=document.getElementById(i+"-"+this._iPrevHoveredValue);n&&n.classList.remove("sapMTPCNumberHover");this._iPrevHoveredValue=this._iHoveredValue;n=document.getElementById(i+"-"+this._iPrevHoveredValue);n&&n.classList.add("sapMTPCNumberHover");}}};c.prototype._onTouchEnd=function(e){var o=sap.ui.getCore().getConfiguration().getAnimationMode(),s=o===a.AnimationMode.none||o===a.AnimationMode.minimal;if(!this._mouseOrTouchDown){return;}this._mouseOrTouchDown=false;e.preventDefault();if(!this.getEnabled()||this._iSelectedValue===-1){return;}if(e.type==="touchend"){this._resetLongTouch();}if(!this._cancelTouchOut){this._changeValueAnimation(this._iSelectedValue,s);}};c.prototype._resetLongTouch=function(){if(this._longTouchId){clearTimeout(this._longTouchId);}};c.prototype._startLongTouch=function(){this._longTouchId=setTimeout(function(){var v=this._iSelectedValue;this._longTouchId=null;if(v===0||v===24){this._toggle2400();}}.bind(this),L);};c.prototype._getMaxValue=function(){var i=this.getItemMax();return this.getInnerItems()?i*2:i;};c.prototype._toggle2400=function(s){var i=this._get24HoursVisible(),v=i?0:24;this._cancelTouchOut=true;this._set24HoursVisible(!i);this.setLastItemReplacement(v);if(!s){this._iMovSelectedValue=v;this.setSelectedValue(v);}return this;};c.prototype._changeValueAnimation=function(n,s){var o=this._iMovSelectedValue,i=this.getInnerItems(),m=this.getItemMax()*(i?2:1),p,P,d,f=o,l=n,e=1;if(!s){if(f<l){p=l-f;P=m-p;if(P<p){f+=m;e=-1;}}else{p=f-l;P=m-p;if(P<p){l+=m;}else{e=-1;}}if(f===l){d=0;}else{d=Math.ceil(A/Math.abs(f-l));}this._animationInProgress=true;_(this,f,l,e,m,n,d,this.getSupport2400(),this._get24HoursVisible());}else{this.setSelectedValue(n);this.fireChange({value:n,stringValue:this._getStringValue(n),finalChange:true});}};c.prototype._calculateDimensions=function(){var o=this._getClockCoverContainerDomRef(),r=Math.round(o.offsetHeight/2),d=q('.sapMTPCDot').first().outerHeight(true),n=q('.sapMTPCNumber').first().outerHeight(true),O=o.getBoundingClientRect();this._dimensionParameters={'radius':r,'centerX':r,'centerY':r,'dotHeight':d,'numberHeight':n,'outerMax':r,'outerMin':r-n,'innerMax':r-n-1,'innerMin':r-n*2-1,'offsetX':O.left,'offsetY':O.top};};c.prototype._calculatePosition=function(x,y){var i=this.getItemMax(),r=this.getLastItemReplacement(),s=this.getValueStep(),d=x-this._dimensionParameters.offsetX+1-this._dimensionParameters.radius,e=y-this._dimensionParameters.offsetY+1-this._dimensionParameters.radius,m=d>=0?0:180,f=(Math.atan(e/d)*180/Math.PI)+90+m,g=360/i*s,I=this.getInnerItems(),R=Math.sqrt(d*d+e*e),F=Math.round((f===0?360:f)/g)*g,h=R<=this._dimensionParameters.outerMax&&R>(I?this._dimensionParameters.outerMin:this._dimensionParameters.innerMin),j=I&&R<=this._dimensionParameters.innerMax&&R>this._dimensionParameters.innerMin,k=R<=this._dimensionParameters.outerMax&&R>this._dimensionParameters.outerMin,l=j,S=this.getSupport2400(),n=this._get24HoursVisible();if(F===0){F=360;}if(j||h){this._iSelectedValue=(F/g)*s;if(j){this._iSelectedValue+=i;}if(S&&!n&&this._iSelectedValue===24){this._iSelectedValue=0;}}else{this._iSelectedValue=-1;}if(l||k){this._iHoveredValue=S&&!n&&this._iSelectedValue===0?24:this._iSelectedValue;}else{this._iHoveredValue=-1;}if(this._iSelectedValue===this._getMaxValue()&&r!==-1){this._iSelectedValue=r;}};c.prototype._setEnabled=function(e){this.setEnabled(e);if(e){this.$().removeClass("sapMTPDisabled");}else{this.$().addClass("sapMTPDisabled");}return this;};function _(o,f,l,d,m,n,i,s,I){var e;if(f===l){o._animationInProgress=false;}e=f>m?f-m:f;if(s){if(e===24&&!I){e=0;}else if(e===0&&I){e=24;}}o.setSelectedValue(e);if(f!==l){f+=d;setTimeout(function(){_(o,f,l,d,m,n,i,s,I);},i);}else{setTimeout(function(){o.fireChange({value:n,stringValue:o._getStringValue(n),finalChange:true});},b);}}return c;});
