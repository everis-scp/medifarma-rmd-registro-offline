/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/ValueStateSupport','sap/ui/core/library'],function(V,c){"use strict";var T=c.TextDirection;var a=c.ValueState;var R={};R.render=function(r,o){var i=o.getId();var t=o.getTooltip_AsString();r.addClass("sapUiRb");r.write("<span");r.writeControlData(o);r.writeAccessibilityState(o,{role:"radio",checked:o.getSelected()===true,invalid:o.getValueState()==a.Error,disabled:!o.getEditable(),labelledby:i+"-label",describedby:t?i+"-Descr":undefined});var e=o.getEnabled()!=null&&o.getEnabled();var b=o.getEditable()!=null&&o.getEditable();var d=false;var f=false;if(o.getValueState()!=null){d=a.Error==o.getValueState();f=a.Warning==o.getValueState();}if(o.getSelected()){r.addClass("sapUiRbSel");}var m=0;var g=false;if(!e){m=-1;g=true;r.addClass("sapUiRbDis");}if(!b){g=true;r.addClass("sapUiRbRo");}if(d){r.addClass("sapUiRbErr");}else if(f){r.addClass("sapUiRbWarn");}if(e&&b&&!d&&!f){r.addClass("sapUiRbStd");}if(e&&b){r.addClass("sapUiRbInteractive");}r.writeClasses();if(o.getWidth()&&o.getWidth()!=''){r.writeAttribute("style","width:"+o.getWidth()+";");}r.writeAttribute("tabindex",m);var h=V.enrichTooltip(o,t?t:o.getText());if(h){r.writeAttributeEscaped("title",h);}r.write(">");r.write("<input type='radio' tabindex='-1' id='");r.write(i);r.write("-RB' name=\"");r.writeEscaped(o.getGroupName());r.write("\" ");if(o.getSelected()){r.write(" checked='checked'");}if(!e){r.write(" disabled='disabled'");}if(g){r.write(" readonly='readonly'");r.write(" disabled='disabled'");}if(o.getKey()){r.writeAttributeEscaped("value",o.getKey());}r.write(">");r.write("<label id=\""+i+"-label\"");r.writeAttribute("for",i+"-RB");if(!o.getText()){r.write(" class=\"sapUiRbNoText\"");}r.write(">");if(o.getText()){this.renderText(r,o.getText(),o.getTextDirection());}r.write("</label>");if(t){r.write("<span id=\""+i+"-Descr\" style=\"visibility: hidden; display: none;\">");r.writeEscaped(t);r.write("</span>");}r.write("</span>");};R.renderText=function(r,t,e){if(!e||e==T.Inherit){r.writeEscaped(t);}else{r.write("<span style=\"direction:"+e.toLowerCase()+";\">");r.writeEscaped(t);r.write("</span>");}};R.setSelected=function(r,s){r.$().toggleClass('sapUiRbSel',s).attr('aria-checked',s);var d=r.getDomRef("RB");if(s){d.checked=true;d.setAttribute('checked','checked');}else{d.checked=false;d.removeAttribute('checked');}};return R;},true);
