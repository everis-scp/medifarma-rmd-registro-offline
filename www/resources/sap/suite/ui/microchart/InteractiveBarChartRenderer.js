/*!
 * SAPUI5

(c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/m/library"],function(M){"use strict";var I={apiVersion:2};I.BAR_DIRECTION_POSITIVE={NAME:"positive",WRAPPER_CSSCLASS:"sapSuiteIBCBarWrapperPositive",CSSCLASS:"sapSuiteIBCBarPositive"};I.BAR_DIRECTION_NEGATIVE={NAME:"negative",WRAPPER_CSSCLASS:"sapSuiteIBCBarWrapperNegative",CSSCLASS:"sapSuiteIBCBarNegative"};I.render=function(r,c){if(!c._bThemeApplied){return;}if(c.getShowError()){r.openStart("div",c);r.class("sapSuiteUiMicroChartNoData");r.openEnd();r.renderControl(c._oIllustratedMessageControl);r.close("div");return;}var b=c.getBars(),B=Math.min(c.getDisplayedBars(),b.length);r.openStart("div",c);r.class("sapSuiteIBC");if(!c._isChartEnabled()){var a=c.getTooltip_AsString();if(typeof a==="string"||a instanceof String){r.attr("title",a);}}var A={};A.role="listbox";A.roledescription=c._oRb.getText("INTERACTIVEBARCHART");A.multiselectable=true;A.disabled=!c._isChartEnabled();A.labelledby=c.getAriaLabelledBy();r.accessibilityState(c,A);r.openEnd();if(!c.getSelectionEnabled()){this.renderDisabledOverlay(r,c);}for(var i=0;i<B;i++){this._renderBar(r,c,b[i],i,B);}r.close("div");};I._renderBar=function(r,c,b,a,d){var v,l,t,A,C,L;r.openStart("div",c.getId()+"-interactionArea-"+a);r.attr("data-sap-ui-ibc-selection-index",a);r.class("sapSuiteIBCBarInteractionArea");if(b.getSelected()){r.class("sapSuiteIBCBarSelected");}if(a===0&&c._isChartEnabled()){r.attr("tabindex","0");}l=b.getLabel();A=l;if(c._bMinMaxValid){v=this._getDisplayValue(b,c);t=b.getTooltip_Text();if(t&&t.trim()){A=t;}else{if(A){A=A+" "+v;}else{A=v;}if(c._bUseSemanticTooltip){C=b.getColor();L=c._oRb.getText(("SEMANTIC_COLOR_"+C.toUpperCase()));A+=" "+L;}}}var o={};o.role="option";o.label=A;o.selected=b.getSelected();o.posinset=a+1;o.setsize=d;r.accessibilityState(b,o);r.openEnd();l=b.getLabel();if(b.getColor()!==M.ValueColor.Neutral){r.openStart("div");r.class("sapSuiteIBCSemanticMarker");r.class("sapSuiteIBCSemantic"+b.getColor());r.openEnd();r.close("div");}r.openStart("div",c.getId()+"-label-"+a);r.class("sapSuiteIBCBarLabel");r.openEnd();r.openStart("div");r.class("sapSuiteIBCBarLabelText");r.openEnd();r.text(l);r.close("div");r.close("div");if(c._bMinMaxValid){r.openStart("div");r.class("sapSuiteIBCBarWrapper");r.openEnd();this._renderBarDirection(r,c,b,a,v,I.BAR_DIRECTION_NEGATIVE);r.openStart("div");r.class("sapSuiteIBCDivider");r.openEnd();r.close("div");this._renderBarDirection(r,c,b,a,v,I.BAR_DIRECTION_POSITIVE);r.close("div");}r.close("div");};I._renderBarDirection=function(r,c,b,a,d,e){var v=b.getValue();r.openStart("div");r.class(e.WRAPPER_CSSCLASS);r.openEnd();r.openStart("div",c.getId()+"-bar-"+e.NAME+"-"+a);r.class("sapSuiteIBCBar");r.class(e.CSSCLASS);if(v>0){r.class("sapSuiteIBCValuePositive");}else if(v===0||b._bNullValue){r.class("sapSuiteIBCBarValueNull");}else{r.class("sapSuiteIBCValueNegative");}r.openEnd();this._renderDisplayedValue(r,c,b,c.getId(),a,d,e);r.close("div");r.close("div");};I._renderDisplayedValue=function(r,c,b,a,d,e,f){var i=b.getValue()===0,p;if(b._bNullValue||i){if(c._fMin<0&&c._fMax>0){p=Math.abs(c._fMax)>=Math.abs(c._fMin);}else{p=c._fMin>=0;}}else{p=b.getValue()>=0;}if(f===I.BAR_DIRECTION_POSITIVE&&p||f===I.BAR_DIRECTION_NEGATIVE&&!p){r.openStart("span",a+"-displayedValue-"+d);r.class("sapSuiteIBCBarValue");if(b._bNullValue||i){r.class("sapSuiteIBCBarValueAutoAlignment");r.class("sapSuiteIBCBarValueOutside");}r.openEnd();r.text(e);r.close("span");}};I.renderDisabledOverlay=function(r,c){r.openStart("div");r.class("sapSuiteIBCDisabledOverlay");r.openEnd();r.close("div");};I._getDisplayValue=function(b,c){var v,V;v=b.getDisplayedValue();V=b.getValue();if(b._bNullValue){v=c._oRb.getText("INTERACTIVECHART_NA");}else if(!v){v=V.toString();}return v;};I._getAriaDescribedBy=function(c,b){var a=[];for(var i=0;i<b;i++){a.push(c.getId()+"-interactionArea-"+i);}return a.join(",");};return I;},true);
