/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/library","sap/ui/Device","sap/ui/core/Core","sap/ui/core/Control"],function(l,c,D,C,a){"use strict";var V=c.ValueState;var b=a.extend("sap.m.ValueStateHeader",{metadata:{library:"sap.m",properties:{text:{type:"string",defaultValue:""},valueState:{type:"sap.ui.core.ValueState",defaultValue:V.None}},aggregations:{formattedText:{type:"sap.m.FormattedText",multiple:false}},associations:{popup:{type:"sap.ui.core.Popup",multiple:false}}},renderer:{apiVersion:2,render:function(r,o){var m={None:"",Error:"sapMValueStateHeaderError",Warning:"sapMValueStateHeaderWarning",Success:"sapMValueStateHeaderSuccess",Information:"sapMValueStateHeaderInformation"};r.openStart("div",o).class("sapMValueStateHeaderRoot").class(m[o.getValueState()]).openEnd();r.openStart("span",o.getId()+"-inner").class("sapMValueStateHeaderText").openEnd();if(o.getFormattedText()){r.renderControl(o.getFormattedText());}else{r.text(o.getText());}r.close("span");r.close("div");}}});b.prototype._fnOrientationChange=function(){var p=this._getAssociatedPopupObject(),h=this.getDomRef();if(h&&p&&p.isA("sap.m.Dialog")){h.style.width=p.getDomRef().getBoundingClientRect().width+"px";}};b.prototype.init=function(){D.orientation.attachHandler(this._fnOrientationChange,this);};b.prototype.exit=function(){D.orientation.detachHandler(this._fnOrientationChange,this);};b.prototype.setPopup=function(p){var t=this;var r=false;var P=(typeof p==="string")?C.byId(p):p;this.setAssociation("popup",P);if(P.isA("sap.m.Dialog")){return this;}P._afterAdjustPositionAndArrowHook=function(){var d=t.getDomRef();if(!d){return;}d.style.width=P.getDomRef().getBoundingClientRect().width+"px";d.style.height="auto";if(!r){r=true;setTimeout(function(){P._fnOrientationChange();},0);}};return this;};b.prototype._getAssociatedPopupObject=function(){return C.byId(this.getPopup());};b.prototype.onAfterRendering=function(){var p=this._getAssociatedPopupObject();if(p){if(p.isA("sap.m.Popover")){setTimeout(function(){p._fnOrientationChange();},0);}}};return b;},true);
