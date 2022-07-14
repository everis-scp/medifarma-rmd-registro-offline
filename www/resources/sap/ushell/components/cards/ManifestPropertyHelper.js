// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/util/ObjectPath","sap/ushell/utils"],function(O,u){"use strict";var M={PLACEHOLDERS:{TITLE:"<title>",SUBTITLE:"<subtitle>",ICON:"<icon>",SEARCH_KEYWORDS:"<keywords>",SEMANTIC_OBJECT:"<semantic object>",ACTION:"<action>",PARAMETERS:"<parameters>",TARGET_URL:"<target URL>"},extractCardData:function(m){var a=this._getNavigationAction(m),t,s,S,b,c,T,U,d=O.get(["sap.app","tags","keywords"],m),e;if(a){b=O.get(["parameters","intentSemanticObject"],a);c=O.get(["parameters","intentAction"],a);T=O.get(["parameters","url"],a);s=O.get(["parameters","intentParameters"],a);}if(s){S=u.urlParametersToString(s);}if(T){U=false;}else if(b&&c){U=true;T="#"+b+"-"+c;if(S){T+="?"+S;}}t=JSON.stringify({display_icon_url:O.get(["sap.card","header","icon","src"],m),navigation_semantic_object:b,navigation_semantic_action:c,navigation_semantic_parameters:S,navigation_use_semantic_object:U,navigation_target_url:T});if(t==="{}"){t=undefined;}if(d){e=d.join(",");}return{bagProperties:{display_title_text:O.get(["sap.card","header","title"],m),display_subtitle_text:O.get(["sap.card","header","subTitle"],m),display_search_keywords:e},tileConfiguration:t,manifest:this._replaceDataWithPlaceholders(m)};},mergeCardData:function(m,c){var o=JSON.parse(JSON.stringify(m)),n=this._getNavigationAction(o),s;if(c.display_title_text){O.set(["sap.card","header","title"],c.display_title_text,o);}if(c.display_subtitle_text){O.set(["sap.card","header","subTitle"],c.display_subtitle_text,o);}if(c.display_search_keywords){s=c.display_search_keywords.split(",");O.set(["sap.app","tags","keywords"],s,o);}if(c.display_icon_url){O.set(["sap.card","header","icon","src"],c.display_icon_url,o);}if(c.navigation_semantic_object){O.set(["parameters","intentSemanticObject"],c.navigation_semantic_object,n);}else if(c.navigation_target_url){O.set(["parameters","url"],c.navigation_target_url,n);}if(c.navigation_semantic_action){O.set(["parameters","intentAction"],c.navigation_semantic_action,n);}if(c.navigation_semantic_parameters_as_object){O.set(["parameters","intentParameters"],c.navigation_semantic_parameters_as_object,n);}return o;},getTranslatablePropertiesFromBag:function(b){var t={},T;if(b&&b.getText&&b.getTextNames){T=b.getTextNames();T.forEach(function(p){t[p]=b.getText(p);});}return t;},getCardData:function(c){var t,b,T,C;if(c.bag){t=c.bag.getBag("tileProperties");}else{t=c.getBag("tileProperties");}if(c.configuration){T=c.configuration.getParameterValueAsString("tileConfiguration");}else{T=c.getConfigurationParameter("tileConfiguration");}b=this.getTranslatablePropertiesFromBag(t);C=JSON.parse(T||"{}");if(C.navigation_semantic_parameters){C.navigation_semantic_parameters_as_object=this._parseParameters(C.navigation_semantic_parameters);}Object.keys(b).forEach(function(k){C[k]=b[k];});return C;},_parseParameters:function(p){var U=sap.ushell.Container.getService("URLParsing"),P=U.parseParameters("?"+p);Object.keys(P).forEach(function(k){P[k]=P[k][0];});return P;},_replaceDataWithPlaceholders:function(m){var o=JSON.parse(JSON.stringify(m)),n=this._getNavigationAction(o);if(O.get(["sap.card","header","title"],o)){O.set(["sap.card","header","title"],this.PLACEHOLDERS.TITLE,o);}if(O.get(["sap.card","header","subTitle"],o)){O.set(["sap.card","header","subTitle"],this.PLACEHOLDERS.SUBTITLE,o);}if(O.get(["sap.app","tags","keywords"],o)){O.set(["sap.app","tags","keywords"],this.PLACEHOLDERS.SEARCH_KEYWORDS,o);}if(O.get(["sap.card","header","icon","src"],o)){O.set(["sap.card","header","icon","src"],this.PLACEHOLDERS.ICON,o);}if(O.get(["parameters","intentSemanticObject"],n)){O.set(["parameters","intentSemanticObject"],this.PLACEHOLDERS.SEMANTIC_OBJECT,n);}if(O.get(["parameters","intentAction"],n)){O.set(["parameters","intentAction"],this.PLACEHOLDERS.ACTION,n);}if(O.get(["parameters","url"],n)){O.set(["parameters","url"],this.PLACEHOLDERS.TARGET_URL,n);}if(O.get(["parameters","intentParameters"],n)){O.set(["parameters","intentParameters"],this.PLACEHOLDERS.PARAMETERS,n);}return o;},_getNavigationAction:function(m){var a=O.get(["sap.card","header","actions"],m),A;if(a){for(var i=0;i<a.length;i++){A=a[i];if(A.type==="Navigation"){return A;}}}return null;}};return M;});
