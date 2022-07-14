// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sinaDefine(['../../core/core','../../core/util','./typeConverter','../../sina/AttributeType'],function(c,u,T,A){"use strict";return c.defineClass({_init:function(p){this.provider=p;this.sina=p.sina;this.intentsResolver=this.sina._createFioriIntentsResolver();this.suvNavTargetResolver=this.sina._createSuvNavTargetResolver();this.Exception=c.Exception.derive({_init:function(a){c.Exception.prototype._init.apply(this,[a]);}});},parse:function(s,d,l){if(d.error&&!d.value){return c.Promise.reject(new this.Exception({message:d.error.message,description:'Server-side Error',previous:d.error}));}if(!d.value){return Promise.resolve([]);}if(d.error){l.addMessage(l.WARNING,'Server-side Warning: '+d.error.message);}var a=d.value;var b=[];for(var i=0;i<a.length;++i){var f=a[i];var g;try{g=this.parseItem(f);b.push(g);}catch(e){l.addMessage(l.WARNING,'Error occurred by parsing result item number '+i+': '+e.message);}}return Promise.all(b);},parseItem:function(i){var t=[];var d=[];var a=[];var b;var e={};var s={};var f=i['@odata.context'];var p=f.lastIndexOf('#');if(p>-1){f=f.slice(p+1);}var g=this.sina.getDataSource(f);var w=i['@com.sap.vocabularies.Search.v1.WhyFound']||{};var m={};var h='';var j={};var k,l,n,o;var q=[];var r;var v=i["@com.sap.vocabularies.Search.v1.Ranking"];var x=this.preParseItem(i);for(var y in x){var z=x[y];m=g.getAttributeMetadata(y);if(!m){throw'unknown attribute '+y;}if(m.id=="LOC_4326"){m.usage={Detail:{displayOrder:-1}};}var B=T.odata2Sina(m.type,z.value);var C;C=undefined;for(var D in w){if(D===y&&w[D][0]){C=w[D][0];delete w[D];}}C=this.calculateValueHighlighted(z,m,C);var _=function(C){if(typeof C==='string'&&C.length>0){return true;}if(Array.isArray(C)&&C.length>0){return true;}return false;};var E=typeof(B)==="string"?B:JSON.stringify(B);var F=C;b=this.sina._createSearchResultSetItemAttribute({id:m.id,label:m.label,value:B,valueFormatted:E,valueHighlighted:F,isHighlighted:_(C),metadata:m,groups:[]});u.appendRemovingDuplicates(q,u.extractHighlightedTerms(b.valueHighlighted));if(m.suvUrlAttribute&&m.suvMimeTypeAttribute){n=e[m.suvUrlAttribute]||m.suvUrlAttribute.id;o=e[m.suvMimeTypeAttribute]||m.suvMimeTypeAttribute.id;j[m.id]={suvThumbnailAttribute:b,suvTargetUrlAttribute:n,suvTargetMimeTypeAttribute:o};}if(m.usage.Title){t.push(b);}if(m.usage.TitleDescription){a.push(b);}if(m.usage.Detail){d.push(b);}if(m.usage.Navigation){if(m.usage.Navigation.mainNavigation){r=this.sina._createNavigationTarget({label:b.value,targetUrl:b.value,target:"_blank"});}}e[b.id]=b;h=g.attributeMetadataMap[m.id]._private.semanticObjectType||'';if(h.length>0){s[h]=B;}}for(l in j){k=j[l];if(typeof k.suvTargetUrlAttribute==="string"){k.suvTargetUrlAttribute=e[k.suvTargetUrlAttribute];}if(typeof k.suvTargetMimeTypeAttribute==="string"){k.suvTargetMimeTypeAttribute=e[k.suvTargetMimeTypeAttribute];}if(!(k.suvTargetUrlAttribute||k.suvTargetMimeTypeAttribute)){delete j[l];}}t.sort(function(L,M){return L.metadata.usage.Title.displayOrder-M.metadata.usage.Title.displayOrder;});d.sort(function(L,M){return L.metadata.usage.Detail.displayOrder-M.metadata.usage.Detail.displayOrder;});for(var G in w){if(w[G][0]){m=g.getAttributeMetadata(G);var H=w[G][0];var I=typeof(H)==="string"?H:JSON.stringify(H);b=this.sina._createSearchResultSetItemAttribute({id:m.id||G,label:m.label||G,value:null,valueFormatted:I,valueHighlighted:I,isHighlighted:true,metadata:m});d.push(b);delete w[G];}}this.suvNavTargetResolver.resolveSuvNavTargets(g,j,q);var J=this.sina._createSearchResultSetItem({dataSource:g,titleAttributes:t,titleDescriptionAttributes:a,detailAttributes:d,defaultNavigationTarget:r,navigationTargets:[],score:v});J._private.allAttributesMap=e;J._private.semanticObjectTypeAttributes=s;var K=this.sina._createItemPostParser({searchResultSetItem:J});return K.postParseResultSetItem();},preParseItem:function(i){var a={};for(var o in i){if(o[0]==='@'||o[0]==='_'){continue;}var v=i[o];var p;var s=o.split('@');p=s[0];var b=a[p];if(!b){b={};a[p]=b;}if(s.length===1){b.value=v;continue;}if(s.length===2){b[s[1]]=v;continue;}throw'more than two @ in property name';}return a;},_getFirstItemIfArray:function(v){if(Array.isArray(v)){v=v[0];}return v;},calculateValueHighlighted:function(s,m,a){var i='com.sap.vocabularies.Search.v1.Highlighted';var b='com.sap.vocabularies.Search.v1.Snippets';var v='';if(m.format==='MultilineText'){v=s[i];if(v){return this._getFirstItemIfArray(v);}v=s[b];if(v){return this._getFirstItemIfArray(v);}return a;}v=s[b];if(v){return this._getFirstItemIfArray(v);}v=s[i];if(v){return this._getFirstItemIfArray(v);}return this._getFirstItemIfArray(a);}});});
