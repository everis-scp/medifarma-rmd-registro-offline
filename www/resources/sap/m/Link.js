/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/InvisibleText','sap/ui/core/EnabledPropagator','sap/ui/core/LabelEnablement','sap/ui/core/library','sap/ui/Device','./LinkRenderer',"sap/ui/events/KeyCodes","sap/base/Log","sap/base/security/URLWhitelist"],function(l,C,I,E,L,c,D,a,K,b,U){"use strict";var T=c.TextDirection;var d=c.TextAlign;var e=C.extend("sap.m.Link",{metadata:{interfaces:["sap.ui.core.IShrinkable","sap.ui.core.IFormContent"],library:"sap.m",designtime:"sap/m/designtime/Link.designtime",properties:{text:{type:"string",group:"Data",defaultValue:''},enabled:{type:"boolean",group:"Behavior",defaultValue:true},target:{type:"string",group:"Behavior",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},href:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},validateUrl:{type:"boolean",group:"Data",defaultValue:false},wrapping:{type:"boolean",group:"Appearance",defaultValue:false},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:d.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit},subtle:{type:"boolean",group:"Behavior",defaultValue:false},emphasized:{type:"boolean",group:"Behavior",defaultValue:false}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{allowPreventDefault:true,parameters:{ctrlKey:{type:"boolean"},metaKey:{type:"boolean"}}}},dnd:{draggable:true,droppable:false}}});E.call(e.prototype);e.prototype.onBeforeRendering=function(){};e.prototype.onkeydown=function(o){if(o.which===K.SPACE||o.which===K.SHIFT||o.which===K.ESCAPE){if(o.which===K.SPACE){if(this.getEnabled()||this.getHref()){o.setMarked();o.preventDefault();this._bPressedSpace=true;}}if(this._bPressedSpace&&(o.which===K.ESCAPE||o.which===K.SHIFT)){this._bPressedEscapeOrShift=true;}}else{if(this._bPressedSpace){o.preventDefault();}}};e.prototype.onkeyup=function(o){if(o.which===K.SPACE){if(!this._bPressedEscapeOrShift){this._handlePress(o);if(this.getHref()&&!o.isDefaultPrevented()){o.preventDefault();o.setMarked();var f=document.createEvent('MouseEvents');f.initEvent('click',false,true);this.getDomRef().dispatchEvent(f);}}else{this._bPressedEscapeOrShift=false;}this._bPressedSpace=false;}};e.prototype._handlePress=function(o){if(this.getEnabled()){o.setMarked();if(!this.firePress({ctrlKey:!!o.ctrlKey,metaKey:!!o.metaKey})||!this.getHref()){o.preventDefault();}}else{o.preventDefault();}};e.prototype.onsapenter=e.prototype._handlePress;if(D.support.touch){e.prototype.ontap=e.prototype._handlePress;}else{e.prototype.onclick=e.prototype._handlePress;}e.prototype.ontouchstart=function(o){if(this.getEnabled()){o.setMarked();}};e.prototype.setSubtle=function(s){this.setProperty("subtle",s);if(s&&!e.prototype._sAriaLinkSubtleId){e.prototype._sAriaLinkSubtleId=I.getStaticId("sap.m","LINK_SUBTLE");}return this;};e.prototype.setEmphasized=function(f){this.setProperty("emphasized",f);if(f&&!e.prototype._sAriaLinkEmphasizedId){e.prototype._sAriaLinkEmphasizedId=I.getStaticId("sap.m","LINK_EMPHASIZED");}return this;};e.prototype._isHrefValid=function(u){return this.getValidateUrl()?U.validate(u):true;};e.prototype.getAccessibilityInfo=function(){return{role:"link",type:this.getText()?sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_LINK"):undefined,description:this.getText()||this.getHref()||"",focusable:this.getEnabled(),enabled:this.getEnabled()};};e.prototype.getFormDoNotAdjustWidth=function(){return true;};e.prototype._getTabindex=function(){return this.getText()?"0":"-1";};e.prototype._determineSelfReferencePresence=function(){var A=this.getAriaLabelledBy(),B=D.browser.msie,f=A.indexOf(this.getId())!==-1,h=L.getReferencingLabels(this).length>0,p=this.getParent(),g=!!(p&&p.enhanceAccessibilityState);return!B&&!f&&(A.length>0||h||g);};return e;});
