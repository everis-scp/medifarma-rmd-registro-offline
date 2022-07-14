/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','sap/ui/core/theming/Parameters','sap/ui/events/KeyCodes','./SwitchRenderer',"sap/base/assert"],function(l,C,E,I,P,K,S,a){"use strict";var t=l.touch;var c=l.SwitchType;var d=C.extend("sap.m.Switch",{metadata:{interfaces:["sap.ui.core.IFormContent","sap.m.IOverflowToolbarContent"],library:"sap.m",properties:{state:{type:"boolean",group:"Misc",defaultValue:false},customTextOn:{type:"string",group:"Misc",defaultValue:""},customTextOff:{type:"string",group:"Misc",defaultValue:""},enabled:{type:"boolean",group:"Data",defaultValue:true},name:{type:"string",group:"Misc",defaultValue:""},type:{type:"sap.m.SwitchType",group:"Appearance",defaultValue:c.Default}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{state:{type:"boolean"}}}},designtime:"sap/m/designtime/Switch.designtime"}});I.insertFontFaceStyle();E.apply(d.prototype,[true]);d.prototype._slide=function(p){if(p>d._OFFPOSITION){p=d._OFFPOSITION;}else if(p<d._ONPOSITION){p=d._ONPOSITION;}if(p>this._iNoLabelFix){p=this._iNoLabelFix;}if(this._iCurrentPosition===p){return;}this._iCurrentPosition=p;this.getDomRef("inner").style[sap.ui.getCore().getConfiguration().getRTL()?"right":"left"]=p+"px";this._setTempState(Math.abs(p)<d._SWAPPOINT);};d.prototype._resetSlide=function(){this.getDomRef("inner").style.cssText="";};d.prototype._setTempState=function(b){if(this._bTempState===b){return;}this._bTempState=b;this.getDomRef("handle").setAttribute("data-sap-ui-swt",b?this._sOn:this._sOff);};d.prototype._getInvisibleElement=function(){return this.$("invisible");};d.prototype.getInvisibleElementId=function(){return this.getId()+"-invisible";};d.prototype.getInvisibleElementText=function(s){var b=sap.ui.getCore().getLibraryResourceBundle("sap.m");var T="";switch(this.getType()){case c.Default:if(s){T=this.getCustomTextOn().trim()||b.getText("SWITCH_ON");}else{T=this.getCustomTextOff().trim()||b.getText("SWITCH_OFF");}break;case c.AcceptReject:if(s){T=b.getText("SWITCH_ARIA_ACCEPT");}else{T=b.getText("SWITCH_ARIA_REJECT");}break;}return T;};d._ONPOSITION=Number(P.get("_sap_m_Switch_OnPosition"));d._OFFPOSITION=Number(P.get("_sap_m_Switch_OffPosition"));d._SWAPPOINT=Math.abs((d._ONPOSITION-d._OFFPOSITION)/2);d.prototype.onBeforeRendering=function(){var r=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._sOn=this.getCustomTextOn()||r.getText("SWITCH_ON");this._sOff=this.getCustomTextOff()||r.getText("SWITCH_OFF");};d.prototype.ontouchstart=function(e){var T=e.targetTouches[0],b=this.getRenderer().CSS_CLASS,s=this.$("inner");e.setMarked();if(t.countContained(e.touches,this.getId())>1||!this.getEnabled()||e.button){return;}this._iActiveTouchId=T.identifier;this._bTempState=this.getState();this._iStartPressPosX=T.pageX;this._iPosition=s.position().left;this._bDragging=false;setTimeout(this["focus"].bind(this),0);this.$("switch").addClass(b+"Pressed");this._iNoLabelFix=parseInt(window.getComputedStyle(this.getDomRef("switch")).outlineOffset);};d.prototype.ontouchmove=function(e){e.setMarked();e.preventDefault();var T,p,f=t;if(!this.getEnabled()||e.button){return;}a(f.find(e.touches,this._iActiveTouchId),"missing touchend");T=f.find(e.changedTouches,this._iActiveTouchId);if(!T||Math.abs(T.pageX-this._iStartPressPosX)<6){return;}this._bDragging=true;p=((this._iStartPressPosX-T.pageX)*-1)+this._iPosition;if(sap.ui.getCore().getConfiguration().getRTL()){p=-p;}this._slide(p);};d.prototype.ontouchend=function(e){e.setMarked();var T,f=t;if(!this.getEnabled()||e.button){return;}a(this._iActiveTouchId!==undefined,"expect to already be touching");T=f.find(e.changedTouches,this._iActiveTouchId);if(T){a(!f.find(e.touches,this._iActiveTouchId),"touchend still active");if(!this._updateStateAndNotify()){this.$("switch").removeClass(this.getRenderer().CSS_CLASS+"Pressed");this._resetSlide();}}};d.prototype.ontouchcancel=d.prototype.ontouchend;d.prototype._handleSpaceOrEnter=function(e){if(this.getEnabled()){e.setMarked();if(!this._bDragging){this._updateStateAndNotify();}}};d.prototype.onsapspace=function(e){e.preventDefault();};d.prototype.onkeyup=function(e){if(e.which===K.SPACE){this._handleSpaceOrEnter(e);}};d.prototype.onsapenter=d.prototype._handleSpaceOrEnter;d.prototype._updateStateAndNotify=function(){var s=this.getState(),b;this.setState(this._bDragging?this._bTempState:!s);b=s!==this.getState();if(b){this.fireChange({state:this.getState()});}this._bDragging=false;return b;};d.prototype.getAccessibilityInfo=function(){var b=sap.ui.getCore().getLibraryResourceBundle("sap.m"),s=this.getState(),D=this.getInvisibleElementText(s);return{role:"switch",type:b.getText("ACC_CTR_TYPE_SWITCH"),description:D,focusable:this.getEnabled(),enabled:this.getEnabled()};};d.prototype.getOverflowToolbarConfig=function(){return{propsUnrelatedToSize:["enabled","state"]};};return d;});
