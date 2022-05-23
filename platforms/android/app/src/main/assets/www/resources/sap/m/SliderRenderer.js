/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./SliderUtilities',"sap/ui/core/InvisibleText"],function(S,I){"use strict";var a={};a.CSS_CLASS="sapMSlider";a.render=function(r,s){var e=s.getEnabled(),t=s.getTooltip_AsString(),C=a.CSS_CLASS,b=s.getAriaLabelledBy().reduce(function(A,i){return A+" "+i;},"");r.write("<div");this.addClass(r,s);if(!e){r.addClass(C+"Disabled");}r.addStyle("width",s.getWidth());r.writeClasses();r.writeStyles();r.writeControlData(s);if(t&&s.getShowHandleTooltip()){r.writeAttributeEscaped("title",s._formatValueByCustomElement(t));}r.write(">");r.write('<div');r.writeAttribute("id",s.getId()+"-inner");this.addInnerClass(r,s);if(!e){r.addClass(C+"InnerDisabled");}r.writeClasses();r.writeStyles();r.write(">");if(s.getProgress()){this.renderProgressIndicator(r,s,b);}this.renderHandles(r,s,b);r.write("</div>");if(s.getEnableTickmarks()){this.renderTickmarks(r,s);}else{this.renderLabels(r,s);}if(s.getName()){this.renderInput(r,s);}s.getAggregation("_handlesLabels").forEach(r.renderControl,r);r.write("</div>");};a.renderProgressIndicator=function(r,s){r.write("<div");r.writeAttribute("id",s.getId()+"-progress");this.addProgressIndicatorClass(r,s);r.addStyle("width",s._sProgressValue);r.writeClasses();r.writeStyles();r.write(' aria-hidden="true"></div>');};a.renderHandles=function(r,s,f){this.renderHandle(r,s,{id:s.getId()+"-handle",forwardedLabels:f});};a.renderHandle=function(r,s,o){var e=s.getEnabled();r.write("<span");if(o&&(o.id!==undefined)){r.writeAttributeEscaped("id",o.id);}if(s.getShowHandleTooltip()&&!s.getShowAdvancedTooltip()){this.writeHandleTooltip(r,s);}if(s.getInputsAsTooltips()){r.writeAttribute("aria-describedby",I.getStaticId("sap.m","SLIDER_INPUT_TOOLTIP"));}this.addHandleClass(r,s);r.addStyle(sap.ui.getCore().getConfiguration().getRTL()?"right":"left",s._sProgressValue);this.writeAccessibilityState(r,s,o);r.writeClasses();r.writeStyles();if(e){r.writeAttribute("tabindex","0");}r.write("></span>");};a.writeHandleTooltip=function(r,s){r.writeAttribute("title",s._formatValueByCustomElement(s.toFixed(s.getValue())));};a.renderInput=function(r,s){r.write('<input type="text"');r.writeAttribute("id",s.getId()+"-input");r.addClass(a.CSS_CLASS+"Input");if(!s.getEnabled()){r.write("disabled");}r.writeClasses();r.writeAttributeEscaped("name",s.getName());r.writeAttribute("value",s._formatValueByCustomElement(s.toFixed(s.getValue())));r.write(">");};a.writeAccessibilityState=function(r,s,o){var f=s.getValue(),n=s._isElementsFormatterNotNumerical(f),b=s._formatValueByCustomElement(f),v;if(s._getUsedScale()&&!n){v=b;}else{v=s.toFixed(f);}r.writeAccessibilityState(s,{role:"slider",orientation:"horizontal",valuemin:s.toFixed(s.getMin()),valuemax:s.toFixed(s.getMax()),valuenow:v,labelledby:{value:(o.forwardedLabels+" "+s.getAggregation("_handlesLabels")[0].getId()).trim()}});if(n){r.writeAccessibilityState(s,{valuetext:b});}};a.renderTickmarks=function(r,s){var i,t,T,l,f,b,c,o=s._getUsedScale();if(!s.getEnableTickmarks()||!o){return;}b=Math.abs(s.getMin()-s.getMax());c=s.getStep();l=o.getTickmarksBetweenLabels();t=o.calcNumberOfTickmarks(b,c,S.CONSTANTS.TICKMARKS.MAX_POSSIBLE);T=s._getPercentOfValue(this._calcTickmarksDistance(t,s.getMin(),s.getMax(),c));r.write("<ul class=\""+a.CSS_CLASS+"Tickmarks\">");this.renderTickmarksLabel(r,s,s.getMin());r.write("<li class=\""+a.CSS_CLASS+"Tick\" style=\"width: "+T+"%;\"></li>");for(i=1;i<t-1;i++){if(l&&(i%l===0)){f=i*T;this.renderTickmarksLabel(r,s,s._getValueOfPercent(f));}r.write("<li class=\""+a.CSS_CLASS+"Tick\" style=\"width: "+T+"%;\"></li>");}this.renderTickmarksLabel(r,s,s.getMax());r.write("<li class=\""+a.CSS_CLASS+"Tick\" style=\"width: 0;\"></li>");r.write("</ul>");};a.renderTickmarksLabel=function(r,s,v){var o=s._getPercentOfValue(v);var l=sap.ui.getCore().getConfiguration().getRTL()?"right":"left";var V;v=s.toFixed(v,s.getDecimalPrecisionOfNumber(s.getStep()));V=s._formatValueByCustomElement(v,'scale');r.write("<li class=\""+a.CSS_CLASS+"TickLabel\"");r.addStyle(l,(o+"%"));r.writeStyles();r.write(">");r.write("<div class=\""+a.CSS_CLASS+"Label\">");r.writeEscaped(V);r.write("</div>");r.write("</li>");};a._calcTickmarksDistance=function(t,s,e,f){var b=Math.abs(s-e),m=Math.floor(b/f),i=Math.ceil(m/t);return s+(i*f);};a.addClass=function(r,s){r.addClass(a.CSS_CLASS);};a.addInnerClass=function(r,s){r.addClass(a.CSS_CLASS+"Inner");};a.addProgressIndicatorClass=function(r,s){r.addClass(a.CSS_CLASS+"Progress");};a.addHandleClass=function(r,s){r.addClass(a.CSS_CLASS+"Handle");};a.renderLabels=function(r,s){s.getAggregation("_handlesLabels").forEach(r.renderControl,r);};return a;},true);
