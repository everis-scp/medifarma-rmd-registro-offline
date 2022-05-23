/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/commons/library','sap/ui/core/IconPool','sap/ui/Device','sap/base/security/encodeXML'],function(l,I,D,e){"use strict";var B=l.ButtonStyle;var a={};a.render=function(r,o){r.addClass("sapUiBtn");r.write("<button type=\"button\"");r.writeControlData(o);if(o.getTooltip_AsString()){r.writeAttributeEscaped("title",o.getTooltip_AsString());}if(o.getStyled()){r.addClass("sapUiBtnS");}if(o.getLite()){r.addClass("sapUiBtnLite");}else{r.addClass("sapUiBtnNorm");}var s=o.getStyle();if(s!=""&&s!=B.Default){r.addClass("sapUiBtn"+e(s));}r.writeAccessibilityState(o,{role:'button',disabled:!o.getEnabled()});if(!o.getEnabled()){r.write(" tabindex=\"-1\"");r.addClass("sapUiBtnDsbl");}else{r.write(" tabindex=\"0\"");r.addClass("sapUiBtnStd");}var i=false;if(!o.getText()&&o.getIcon()){r.addClass("sapUiBtnIconOnly");i=true;var c=I.getIconInfo(o.getIcon()),t=o.getTooltip_AsString();if(t||(c&&c.name)){r.writeAttributeEscaped("title",t||c.name);}}if(o.getIcon()&&o.getText()){r.addClass("sapUiBtnIconAndText");}if(o.getWidth()&&o.getWidth()!=''){r.addStyle("width",o.getWidth());r.addClass("sapUiBtnFixedWidth");}if(o.getHeight()&&o.getHeight()!=''){r.addStyle("height",o.getHeight());}r.writeStyles();if(this.renderButtonAttributes){this.renderButtonAttributes(r,o);}if(D.browser.msie&&(!document.documentMode||document.documentMode<10)){r.addClass("sapUiBtnNoGradient");}r.writeClasses();r.write(">");if(this.renderButtonContentBefore){this.renderButtonContentBefore(r,o);}var u=false;if(I.isIconURI(o.getIcon())){u=true;}if(o.getIconFirst()){if(u){this.writeIconHtml(r,o);}else if(this._getIconForState(o,"base")){this.writeImgHtml(r,o,i);}}if(o.getText()){if(!o.getIcon()&&!this.renderButtonContentBefore&&!this.renderButtonContentAfter){r.writeEscaped(o.getText());}else{r.write("<span class=\"sapUiBtnTxt\">");r.writeEscaped(o.getText());r.write("</span>");}}if(!o.getIconFirst()){if(u){this.writeIconHtml(r,o);}else if(this._getIconForState(o,"base")){this.writeImgHtml(r,o,i);}}if(this.renderButtonContentAfter){this.renderButtonContentAfter(r,o);}r.write("</button>");};a.onactive=function(o){o.$().addClass("sapUiBtnAct").removeClass("sapUiBtnStd");o.$("img").attr("src",this._getIconForState(o,"active"));};a.ondeactive=function(o){o.$().addClass("sapUiBtnStd").removeClass("sapUiBtnAct");o.$("img").attr("src",this._getIconForState(o,"deactive"));};a.onblur=function(o){o.$().removeClass("sapUiBtnFoc");o.$("img").attr("src",this._getIconForState(o,"blur"));if(D.browser.msie){a.onmouseout(o);}};a.onfocus=function(o){o.$().addClass("sapUiBtnFoc");o.$("img").attr("src",this._getIconForState(o,"focus"));};a.onmouseout=function(o){o.$().removeClass("sapUiBtnAct");o.$().addClass("sapUiBtnStd");o.$("img").attr("src",this._getIconForState(o,"mouseout"));};a.onmouseover=function(o){o.$("img").attr("src",this._getIconForState(o,"mouseover"));};a._getIconForState=function(o,s){if(!o.getEnabled()){s="disabled";}switch(s){case"focus":case"blur":case"base":if(o.$().hasClass("sapUiBtnAct")){var i=o.getIconSelected()||o.getIconHovered();return i?i:o.getIcon();}else if(o.$().hasClass("sapUiBtnFoc")){return o.getIcon();}return o.getIcon();case"mouseout":if(o.$().hasClass("sapUiBtnFoc")){return o.getIcon();}return o.getIcon();case"active":var i=o.getIconSelected()||o.getIconHovered();return i?i:o.getIcon();case"mouseover":case"deactive":var i=o.getIconHovered();return i?i:o.getIcon();}return o.getIcon();};a.writeImgHtml=function(r,o,i){var c=this._getIconForState(o,"base");r.write("<img");r.writeAttribute("id",o.getId()+"-img");r.writeAttributeEscaped("src",c);if(o.getTooltip_AsString()&&!o.getText()){r.writeAttributeEscaped("alt",o.getTooltip_AsString());}else{r.writeAttribute("alt","");}if(!i){r.writeAttribute("role","presentation");}r.addClass("sapUiBtnIco");if(o.getText()){r.addClass(o.getIconFirst()?"sapUiBtnIcoL":"sapUiBtnIcoR");}r.writeClasses();r.write(">");};a.writeIconHtml=function(r,o){var c=[];var A=b(o);c.push("sapUiBtnIco");if(o.getText()){c.push(o.getIconFirst()?"sapUiBtnIcoL":"sapUiBtnIcoR");}r.writeIcon(o.getIcon(),c,A);};a.changeIcon=function(o){if(I.isIconURI(o.getIcon())){var i=I.getIconInfo(o.getIcon());var c=o.$("icon");c.attr("data-sap-ui-icon-content",i.content);if(!i.skipMirroring){c.addClass("sapUiIconMirrorInRTL");}else{c.removeClass("sapUiIconMirrorInRTL");}}else if(o.$().hasClass("sapUiBtnAct")){o.$("img").attr("src",this._getIconForState(o,"active"));}else if(o.$().hasClass("sapUiBtnFoc")){o.$("img").attr("src",this._getIconForState(o,"focus"));}else if(o.$().hasClass("sapUiBtnStd")){o.$("img").attr("src",this._getIconForState(o,"base"));}};function b(o){var A={},t=o.getTooltip_AsString();A["id"]=o.getId()+"-icon";if(t){A["title"]=null;A["aria-label"]=null;A["aria-hidden"]=true;}return A;}return a;},true);
