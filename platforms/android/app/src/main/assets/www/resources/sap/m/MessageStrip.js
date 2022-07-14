/*!
* OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./library","sap/ui/core/Control","./MessageStripUtilities","./Text","./Link","./FormattedText","sap/ui/core/library","./MessageStripRenderer","sap/base/Log","sap/m/Button","sap/ui/core/Core","sap/ui/core/InvisibleText"],function(l,C,M,T,L,F,c,a,b,B,d,I){"use strict";var e=c.MessageType;var f=l.ButtonType;var g=C.extend("sap.m.MessageStrip",{metadata:{library:"sap.m",designtime:"sap/m/designtime/MessageStrip.designtime",properties:{text:{type:"string",group:"Appearance",defaultValue:""},type:{type:"sap.ui.core.MessageType",group:"Appearance",defaultValue:e.Information},customIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},showIcon:{type:"boolean",group:"Appearance",defaultValue:false},showCloseButton:{type:"boolean",group:"Appearance",defaultValue:false},enableFormattedText:{type:"boolean",group:"Appearance",defaultValue:false}},defaultAggregation:"link",aggregations:{link:{type:"sap.m.Link",multiple:false,singularName:"link"},_formattedText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_text:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_closeButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{close:{}},dnd:{draggable:true,droppable:false}}});g.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);this.setAggregation("_text",new T());this._initCloseButton();};g.prototype.onBeforeRendering=function(){this._normalizeType(this.getType());this._setButtonAriaLabelledBy(this.getType());};g.prototype.setText=function(t){var o=this.getAggregation("_formattedText");if(o){o.setHtmlText(t);}this.getAggregation("_text").setText(t);return this.setProperty("text",t);};g.prototype.close=function(){var h=function(){this.setVisible(false);this.fireClose();}.bind(this);if(!d.getConfiguration().getAnimation()){h();return;}M.closeTransitionWithCSS.call(this,h);};g.prototype.setEnableFormattedText=function(E){var o=this.getAggregation("_formattedText");if(E){if(!o){o=new F();o._setUseLimitedRenderingRules(true);this.setAggregation("_formattedText",o);}o.setHtmlText(this.getText());}return this.setProperty("enableFormattedText",E);};g.prototype.setAggregation=function(n,o,s){if(n==="link"&&o instanceof L){var i=this.getId()+"-info"+" "+this.getId()+"-content";o.addAriaDescribedBy(i);}C.prototype.setAggregation.call(this,n,o,s);return this;};a.getAccessibilityState=function(){var A=M.getAccessibilityState.call(this),o=this.getLink(),r=d.getLibraryResourceBundle("sap.m");if(!o){A.labelledby=this.getId();}A.roledescription=r.getText("MESSAGE_STRIP_ARIA_ROLE_DESCRIPTION");return A;};g.prototype.ontouchmove=function(E){E.setMarked();};g.prototype._normalizeType=function(t){if(t===e.None){b.warning(M.MESSAGES.TYPE_NOT_SUPPORTED);this.setProperty("type",e.Information,true);}};g.prototype._initCloseButton=function(){var r=d.getLibraryResourceBundle("sap.m"),o=this.getAggregation("_closeButton");if(!o){var h=new B({type:f.Transparent,tooltip:r.getText("MESSAGE_STRIP_TITLE"),icon:"sap-icon://decline",press:this.close.bind(this)}).addStyleClass(M.CLASSES.CLOSE_BUTTON).addStyleClass("sapUiSizeCompact");this.setAggregation("_closeButton",h);this._setButtonAriaLabelledBy(this.getType());}};g.prototype._setButtonAriaLabelledBy=function(t){var o=this.getAggregation("_closeButton"),r=d.getLibraryResourceBundle("sap.m"),s=r.getText("MESSAGE_STRIP_"+t.toUpperCase()+"_CLOSE_BUTTON");if(!this._oInvisibleText){this._oInvisibleText=new I({text:s}).toStatic();}else{this._oInvisibleText.setText(s);}if(o){o.removeAllAssociation("ariaLabelledBy",true);o.addAssociation("ariaLabelledBy",this._oInvisibleText.getId(),true);}};g.prototype.exit=function(){if(this._oInvisibleText){this._oInvisibleText.destroy();this._oInvisibleText=null;}};return g;});
