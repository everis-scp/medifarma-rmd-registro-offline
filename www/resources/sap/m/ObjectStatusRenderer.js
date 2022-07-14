/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/ValueStateSupport','sap/ui/core/IndicationColorSupport','sap/ui/core/InvisibleText','sap/ui/core/library','./library','sap/ui/core/Core'],function(V,I,a,c,l,C){"use strict";var T=c.TextDirection;var E=l.EmptyIndicatorMode;var r=C.getLibraryResourceBundle("sap.m");var O={apiVersion:2};O.render=function(R,o){R.openStart("div",o);if(o._isEmpty()&&o.getEmptyIndicatorMode()===E.Off){R.style("display","none");R.openEnd();}else{var s=o.getState(),S=o._getStateText(s),i=o.getInverted(),t=o.getTextDirection(),b=sap.ui.getCore(),p=b.getConfiguration().getRTL(),A={roledescription:b.getLibraryResourceBundle("sap.m").getText("OBJECT_STATUS")},d=o.getTooltip_AsString();if(t===T.Inherit){t=p?T.RTL:T.LTR;}if(d){R.attr("title",d);}R.class("sapMObjStatus");R.class("sapMObjStatus"+s);if(i){R.class("sapMObjStatusInverted");}if(o._isActive()){R.class("sapMObjStatusActive");R.attr("tabindex","0");A.role="button";}else{A.role="group";}var e=d&&o.getAriaDescribedBy().length,f;if(e){f=o.getId()+"-tooltip";A["describedby"]={value:f,append:true};}R.accessibilityState(o,A);R.openEnd();if(e){R.openStart("span",f);R.class("sapUiInvisibleText");R.openEnd();R.text(d);R.close("span");}if(o.getTitle()){R.openStart("span",o.getId()+"-title");R.class("sapMObjStatusTitle");if(t){R.attr("dir",t.toLowerCase());}R.openEnd();R.text(o.getTitle()+":");R.close("span");}if(o._isActive()){R.openStart("span",o.getId()+"-link");R.class("sapMObjStatusLink");R.openEnd();}if(o.getIcon()){R.openStart("span",o.getId()+"-statusIcon");R.class("sapMObjStatusIcon");if(!o.getText()){R.class("sapMObjStatusIconOnly");}R.openEnd();R.renderControl(o._getImageControl());R.close("span");}if(o.getText()){R.openStart("span",o.getId()+"-text");R.class("sapMObjStatusText");if(t){R.attr("dir",t.toLowerCase());}R.openEnd();R.text(o.getText());R.close("span");}else if(o.getEmptyIndicatorMode()!==E.Off&&!o.getText()){this.renderEmptyIndicator(R,o);}if(o._isActive()){R.close("span");}if(S){R.openStart("span",o.getId()+"-state");R.class("sapUiPseudoInvisibleText");R.openEnd();R.text(S);R.close("span");}}R.close("div");};O.renderEmptyIndicator=function(R,o){R.openStart("span");R.class("sapMEmptyIndicator");if(o.getEmptyIndicatorMode()===E.Auto){R.class("sapMEmptyIndicatorAuto");}R.openEnd();R.openStart("span");R.attr("aria-hidden",true);R.openEnd();R.text(r.getText("EMPTY_INDICATOR"));R.close("span");R.openStart("span");R.class("sapUiPseudoInvisibleText");R.openEnd();R.text(r.getText("EMPTY_INDICATOR_TEXT"));R.close("span");R.close("span");};return O;},true);
