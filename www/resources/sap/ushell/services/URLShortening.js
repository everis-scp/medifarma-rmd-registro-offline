// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/base/Log"],function(L){"use strict";function U(){var t=this;this.ABBREV_PARAM_NAME="sap-intent-param";this.URL_LENGTH_LIMIT=1023;this.URL_PARAMS_LENGTH_LIMIT=512;this._replaceSapXAppStateRawWithKeyIfRequired=function(v,s){var V,k;if(typeof v!=="string"||/^[A-Z0-9]{40,41}$/.test(v)){return v;}try{V=JSON.parse(v);}catch(e){L.error("This cannot happen: sap-xapp-state parameter value is neither key nor JSON parseable");return v;}k=s&&s.getNextKey();this._storeValue(k,V,s);return k;};this.compactHash=function(u,r,s){var S,k,R,p,o,a,b=[this.ABBREV_PARAM_NAME,"sap-system","sap-xapp-state"];if(r){r.forEach(function(A){b.push(A);});}o=sap.ushell.Container.getService("URLParsing");S=o.parseShellHash(u);if(!S){L.error("the URL "+u+" is not compliant. It may break the product and cause unwanted navigation behavior.");return{hash:u};}p="";if(u.charAt(0)==="#"){p="#";}var v=S&&S.params&&S.params["sap-xapp-state"]&&S.params["sap-xapp-state"][0];if(v){S.params["sap-xapp-state"]=[this._replaceSapXAppStateRawWithKeyIfRequired(v,s)];u=p+o.constructShellHash({target:{semanticObject:S.semanticObject,action:S.action,contextRaw:S.contextRaw},params:S.params,appSpecificRoute:S.appSpecificRoute});}if(typeof u!=="string"||u.length<t.URL_LENGTH_LIMIT){return{hash:u};}if(S&&((S.params&&S.params[t.ABBREV_PARAM_NAME]))){return{hash:u};}k=s&&s.getNextKey();R=this._splitParameters(S.params,b,k);if(!R.key){return{hash:u};}a=o.paramsToString(R.tailParams);this._storeValue(R.key,a,s);return{hash:p+o.constructShellHash({target:{semanticObject:S.semanticObject,action:S.action,contextRaw:S.contextRaw},params:R.headParams,appSpecificRoute:S.appSpecificRoute}),params:R.headParams,skippedParams:R.tailParams};};this.checkHashLength=function(u){var s,r,p,o;if(typeof u!=="string"||u.length<t.URL_LENGTH_LIMIT){return{hash:u};}o=sap.ushell.Container.getService("URLParsing");s=o.parseShellHash(u);p="";if(u.charAt(0)==="#"){p="#";}r=this._splitParameters(s.params,[],"DummyKey");if(r.key){L.error("Application startup parameter length exceeds "+t.URL_PARAMS_LENGTH_LIMIT+" characters, truncation occured!");delete r.headParams[this.ABBREV_PARAM_NAME];return{hash:p+o.constructShellHash({target:{semanticObject:s.semanticObject,action:s.action,contextRaw:s.contextRaw},params:r.headParams,appSpecificRoute:s.appSpecificRoute}),params:r.headParams,skippedParams:r.tailParams};}L.error("URL exceeds dangerous limits, arbitrary shortening or worse may occur!");return{hash:u};};this._findIndex=function(a,T){var r=a.indexOf(T);if(r>=0){return r;}r=-1;a.every(function(A,i){if(A.length>0&&A[A.length-1]==="*"&&A.substring(0,A.length-1)===T.substring(0,A.length-1)){r=i;return false;}return true;});return r;};this._cmpByList=function(a,A,b){var i,c;a=a||[];if(A===b){return 0;}i=this._findIndex(a,A);c=this._findIndex(a,b);if(i>=0&&c>=0){if((i-c)!==0){return i-c;}if(A<b){return-1;}if(A>b){return+1;}return 0;}if(i>=0){return-1;}if(c>=0){return+1;}if(A<b){return-1;}return+1;};this._sortByPriority=function(l,r){return l.sort(this._cmpByList.bind(this,r));};this._splitParameters=function(p,r,K){var a,i,k,h={},b={},c=false,o,d,e=0,f,l=[];if(!K||typeof K!=="string"){throw new Error("sap.ushell.services.URLShortening._splitParameters: key must be supplied!");}for(a in p){if(Object.prototype.hasOwnProperty.call(p,a)){l.push(a);}}l.sort();l=this._sortByPriority(l,r);for(k=0;k<l.length;k=k+1){a=l[k];o=p[a];if(o.length>1){L.error("Array startup parameters violate the designed intent of the Unified Shell Intent, use only single-valued parameters!");}for(i=0;i<o.length;i=i+1){d=p[a][i];f=a.length+d.length;if(f+e>this.URL_PARAMS_LENGTH_LIMIT){if(b[a]){b[a].push(d);}else{b[a]=[d];}c=true;}else if(h[a]){h[a].push(d);}else{h[a]=[d];}e=e+f+1;}}if(c){h[this.ABBREV_PARAM_NAME]=[K];}return{key:K,tailParams:b,headParams:h};};this.expandHash=function(u){var r=function(k){return t._retrieveValue(k);};return this.expandParamGivenRetrievalFunction(u,this.ABBREV_PARAM_NAME,r);};this.expandParamGivenRetrievalFunction=function(u,p,r){var s,v,k,a,b;if(typeof u!=="string"){return u;}s=sap.ushell.Container.getService("URLParsing").parseShellHash(u);k=s&&s.params&&s.params[p]&&s.params[p][0];if(!k){return u;}a="";if(u.charAt(0)==="#"){a="#";}v=r(k);if(!v){return u;}b=this._blendParameters(s.params,p,v);return a+sap.ushell.Container.getService("URLParsing").constructShellHash({target:{semanticObject:s.semanticObject,action:s.action,contextRaw:s.contextRaw},params:b,appSpecificRoute:s.appSpecificRoute});};this._retrieveValue=function(){return undefined;};this._storeValue=function(k,v,s){if(s&&typeof s.store==="function"){s.store(v);}};this._blendParameters=function(p,P,v){var n=sap.ushell.Container.getService("URLParsing").parseParameters("?"+v),a;delete p[P];for(a in n){if(Object.prototype.hasOwnProperty.call(n,a)){if(p[a]){p[a]=p[a].concat(n[a]);}else{p[a]=n[a];}}}return p;};}U.hasNoAdapter=true;return U;},true);
