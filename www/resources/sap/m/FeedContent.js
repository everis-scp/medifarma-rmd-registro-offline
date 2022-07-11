/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/m/Text','sap/ui/Device','./FeedContentRenderer',"sap/ui/events/KeyCodes"],function(l,C,T,D,F,K){"use strict";var S=l.Size;var a=C.extend("sap.m.FeedContent",{metadata:{library:"sap.m",properties:{"size":{type:"sap.m.Size",group:"Misc",defaultValue:S.Auto,deprecated:true},"contentText":{type:"string",group:"Misc",defaultValue:null},"subheader":{type:"string",group:"Misc",defaultValue:null},"value":{type:"string",group:"Misc",defaultValue:null},"valueColor":{type:"sap.m.ValueColor",group:"Misc",defaultValue:null},"truncateValueTo":{type:"int",group:"Misc",defaultValue:4}},defaultAggregation:"_contentTextAgr",aggregations:{"_contentTextAgr":{type:"sap.m.Text",multiple:false,visibility:"hidden"}},events:{"press":{}}}});a.prototype.init=function(){this._oContentText=new T(this.getId()+"-content-text",{maxLines:2});this._oContentText.cacheLineHeight=false;this.setAggregation("_contentTextAgr",this._oContentText,true);this.setTooltip("{AltText}");};a.prototype.onBeforeRendering=function(){this.$().off("mouseenter");this.$().off("mouseleave");};a.prototype.onAfterRendering=function(){this.$().on("mouseenter",this._addTooltip.bind(this));this.$().on("mouseleave",this._removeTooltip.bind(this));};a.prototype.exit=function(){this._oContentText=null;};a.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString());};a.prototype._removeTooltip=function(){this.$().attr("title",null);};a.prototype.getAltText=function(){var A="";var i=true;if(this.getAggregation("_contentTextAgr").getText()){A+=this.getAggregation("_contentTextAgr").getText();i=false;}if(this.getSubheader()){if(i){A+=""+this.getSubheader();}else{A+="\n"+this.getSubheader();}i=false;}if(this.getValue()){if(i){A+=""+this.getValue();}else{A+="\n"+this.getValue();}}return A;};a.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var s=this.getAltText();if(typeof t==="string"||t instanceof String){s=t.split("{AltText}").join(s).split("((AltText))").join(s);return s;}if(t){return t;}else{return"";}};a.prototype.setContentText=function(t){this._oContentText.setText(t);return this;};a.prototype.ontap=function(e){if(D.browser.msie){this.$().trigger("focus");}this.firePress();};a.prototype.onkeydown=function(e){if(e.which===K.ENTER||e.which===K.SPACE){this.firePress();e.preventDefault();}};a.prototype.attachEvent=function(e,d,f,b){C.prototype.attachEvent.call(this,e,d,f,b);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");}return this;};a.prototype.detachEvent=function(e,f,b){C.prototype.detachEvent.call(this,e,f,b);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");}return this;};return a;});
