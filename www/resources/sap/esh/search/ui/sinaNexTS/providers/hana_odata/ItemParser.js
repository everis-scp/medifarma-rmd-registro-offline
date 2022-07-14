/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var a=(this&&this.__awaiter)||function(t,_,P,g){function c(v){return v instanceof P?v:new P(function(r){r(v);});}return new(P||(P=Promise))(function(r,d){function f(v){try{s(g.next(v));}catch(e){d(e);}}function h(v){try{s(g["throw"](v));}catch(e){d(e);}}function s(e){e.done?r(e.value):c(e.value).then(f,h);}s((g=g.apply(t,_||[])).next());});};var b=(this&&this.__generator)||function(c,d){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:h(0),"throw":h(1),"return":h(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function h(n){return function(v){return s([n,v]);};}function s(o){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=o[0]&2?y["return"]:o[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,o[1])).done)return t;if(y=0,t)o=[o[0]&2,t.value];switch(o[0]){case 0:case 1:t=o;break;case 4:_.label++;return{value:o[1],done:false};case 5:_.label++;y=o[1];o=[0];continue;case 7:o=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(o[0]===6||o[0]===2)){_=0;continue;}if(o[0]===3&&(!t||(o[1]>t[0]&&o[1]<t[3]))){_.label=o[1];break;}if(o[0]===6&&_.label<t[1]){_.label=t[1];t=o;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(o);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}o=d.call(c,_);}catch(e){o=[6,e];y=0;}finally{f=t=0;}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true};}};sap.ui.define(["require","exports","../../core/util","./typeConverter","../../core/Log","../../core/errors"],function(r,c,u,t,L,d){"use strict";Object.defineProperty(c,"__esModule",{value:true});c.ItemParser=void 0;var I=(function(){function I(p){this.log=new L.Log("hana_odata item parser");this.provider=p;this.sina=p.sina;this.intentsResolver=this.sina._createFioriIntentsResolver({sina:this.sina,});this.suvNavTargetResolver=this.sina._createSuvNavTargetResolver({sina:this.sina,});}I.prototype.parse=function(s,f){return a(this,void 0,void 0,function(){var g,h,i,j,k;return b(this,function(_){if(f.error&&!f.value){return[2,Promise.reject(new d.InternalServerError(f.error.message))];}if(!f.value){return[2,Promise.resolve([])];}if(f.error){this.log.warn("Server-side Warning: "+f.error.message);}g=f.value;h=[];for(i=0;i<g.length;++i){j=g[i];k=void 0;try{k=this.parseItem(j,s);h.push(k);}catch(e){this.log.warn("Error occurred by parsing result item number "+i+": "+e.message);}}return[2,Promise.all(h)];});});};I.prototype.parseItem=function(i,q){var _;return a(this,void 0,void 0,function(){var e,f,g,h,j,s,k,p,l,w,m,n,o,v,x,y,z,A,B,C,D,E,F,G,H,J,K,M,N,O,P,Q,R,S;return b(this,function(T){e=[];f=[];g=[];h=[];j={};s={};k=i["@odata.context"]||"";p=k.lastIndexOf("#");if(p>-1){k=k.slice(p+1);}l=(_=this.sina.getDataSource(k))!==null&&_!==void 0?_:q.getDataSource();w=i["@com.sap.vocabularies.Search.v1.WhyFound"]||{};n="";o={};y=[];A=i["@com.sap.vocabularies.Search.v1.Ranking"];B=this.preParseItem(i);for(C in B){if(q.groupBy&&q.groupBy.aggregateCountAlias&&q.groupBy.aggregateCountAlias===C){continue;}D=B[C];m=l.getAttributeMetadata(C);if(typeof m==="undefined"){throw new d.DataSourceAttributeMetadataNotFoundError("unknown attribute "+C);}if(m.id=="LOC_4326"){m.usage.Detail.displayOrder=-1;}E=t.odata2Sina(m.type,D.value);F=void 0;F=undefined;for(G in w){if(G===C&&w[G][0]){F=w[G][0];if(m.usage.Title||m.usage.TitleDescription||m.usage.Detail){delete w[G];}}}F=this.calculateValueHighlighted(D,m,F);H=function(F){if(typeof F==="string"&&F.length>0){return true;}if(Array.isArray(F)&&F.length>0){return true;}return false;};J="";if(typeof E==="string"){J=E;}else if(E!==null&&E!==undefined){J=JSON.stringify(E);}K=F;M=this.sina._createSearchResultSetItemAttribute({id:m.id,label:m.label,value:E,valueFormatted:J,valueHighlighted:K,isHighlighted:H(F),metadata:m,groups:[],});u.appendRemovingDuplicates(y,u.extractHighlightedTerms(M.valueHighlighted));if(m.usage.Title){f.push(M);}if(m.usage.TitleDescription){h.push(M);}if(m.usage.Detail){g.push(M);}e.push(M);if(m.usage.Navigation){if(m.usage.Navigation.mainNavigation){z=this.sina._createNavigationTarget({label:M.value,targetUrl:M.value,target:"_blank",});}}j[M.id]=M;n=l.attributeMetadataMap[m.id]._private.semanticObjectType||"";if(n.length>0){s[n]=E;}}for(x in o){v=o[x];if(typeof v.suvTargetUrlAttribute==="string"){v.suvTargetUrlAttribute=j[v.suvTargetUrlAttribute];}if(typeof v.suvTargetMimeTypeAttribute==="string"){v.suvTargetMimeTypeAttribute=j[v.suvTargetMimeTypeAttribute];}if(!(v.suvTargetUrlAttribute||v.suvTargetMimeTypeAttribute)){delete o[x];}}f.sort(function(U,V){return U.metadata.usage.Title.displayOrder-V.metadata.usage.Title.displayOrder;});g.sort(function(U,V){return U.metadata.usage.Detail.displayOrder-V.metadata.usage.Detail.displayOrder;});for(N in w){if(w[N][0]){m=l.getAttributeMetadata(N);O=w[N][0];P=typeof O==="string"?O:JSON.stringify(O);Q=this.sina._createSearchResultSetItemAttribute({id:m.id||N,label:m.label||N,value:null,valueFormatted:P,valueHighlighted:P,isHighlighted:true,metadata:m,});g.push(Q);delete w[N];}}this.suvNavTargetResolver.resolveSuvNavTargets(l,o,y);R=this.sina._createSearchResultSetItem({dataSource:l,attributes:e,titleAttributes:f,titleDescriptionAttributes:h,detailAttributes:g,defaultNavigationTarget:z,navigationTargets:[],score:A,});R._private.allAttributesMap=j;R._private.semanticObjectTypeAttributes=s;S=this.sina._createItemPostParser({searchResultSetItem:R,});return[2,S.postParseResultSetItem()];});});};I.prototype.preParseItem=function(i){var e={};for(var o in i){if(o[0]==="@"||o[0]==="_"){continue;}var v=i[o];var s=o.split("@");var p=s[0];var f=e[p];if(!f){f={};e[p]=f;}if(s.length===1){f.value=v;continue;}if(s.length===2){f[s[1]]=v;continue;}throw"more than two @ in property name";}return e;};I.prototype._getFirstItemIfArray=function(v){if(Array.isArray(v)){v=v[0];}return v;};I.prototype.calculateValueHighlighted=function(s,m,e){var i="com.sap.vocabularies.Search.v1.Highlighted";var f="com.sap.vocabularies.Search.v1.Snippets";var v="";if(m.format==="MultilineText"){v=s[i];if(v){return this._getFirstItemIfArray(v);}v=s[f];if(v){return this._getFirstItemIfArray(v);}return e;}v=s[f];if(v){return this._getFirstItemIfArray(v);}v=s[i];if(v){return this._getFirstItemIfArray(v);}return this._getFirstItemIfArray(e);};return I;}());c.ItemParser=I;});})();