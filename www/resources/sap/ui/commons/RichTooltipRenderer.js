/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/ValueStateSupport','sap/ui/core/library'],function(V,c){"use strict";var a=c.ValueState;var R={};R.render=function(r,o){var i=o.getId();r.write("<div ");r.writeControlData(o);r.addClass("sapUiRtt");r.writeClasses();r.write(" ><div><div>");r.write("<div class='sapUiRttTopL'></div><div class='sapUiRttTopR'></div>");r.write("<div class='sapUiRttCL'>");r.write("<div class='sapUiRttCR'>");r.write("<div class='sapUiRttContent'>");var t=o.getTitle();if(t){r.write("<div id='"+i+"-title' role='tooltip' class='sapUiRttTitle'>");r.writeEscaped(t);r.write("</div>");r.write("<div class='sapUiRttSep'></div>");}var v=V.getAdditionalText(o.getParent());var I=o.getAggregation("individualStateText");if(v||I){r.write('<div class="sapUiRttValueStateContainer">');if(v){var s=o.getParent().getValueState();var b=s!==a.None?"ValueState_"+s+".png":"";if(b!==""){b=sap.ui.require.toUrl("sap/ui/commons/themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/richtooltip/"+b);r.write('<img id="'+i+'-valueStateImage" class="sapUiRttValueStateImage" src="');r.writeEscaped(b);r.write('">');}}if(I){r.renderControl(I);}else{r.write('<div id="'+i+'-valueStateText" class="sapUiRttValueStateText">');r.writeEscaped(v);r.write('</div>');}r.write('</div>');r.write("<div class='sapUiRttSep'></div>");}r.write('<div class="sapUiRttContentContainer">');var d=o.getImageSrc();if(d){var A=o.getImageAltText();r.write('<img id="'+i+'-image" class="sapUiRttImage"');r.writeAttributeEscaped('alt',A);r.writeAttributeEscaped('src',d);r.write('>');}var T=o.getAggregation("formattedText");if(T){r.renderControl(T);}r.write('</div>');r.write("</div></div></div>");r.write("<div class='sapUiRttBotL'></div>");r.write("<div class='sapUiRttBotR'></div>");r.write("</div></div></div>");};return R;},true);
