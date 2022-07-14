/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports","../sina/AttributeSemanticsType","./errors"],function(r,e,A,a){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.escapeFilterCondition=e.escapeQuery=e.appendRemovingDuplicates=e.extractHighlightedTerms=e.extractRegExp=e.evaluateTemplate=e.escapeRegExp=e.cacheDecorator=e.addGeoDataIfAvailable=e.isMapsAttribute=e.removePureAdvancedSearchFacets=e.addPotentialNavTargetsToAttribute=e.dateFromJson=e.dateToJson=e.DelayedConsumer=e.generateTimestamp=e.filterString=e.getUrlParameter=e.refuseOutdatedResponsesDecorator=e.timeoutDecorator=e.sampleProviderInstanceCounter=void 0;e.sampleProviderInstanceCounter=0;function t(d,i){var j=function(){var s=this;var F=arguments;return new Promise(function(G,H){var I=false;var J=setTimeout(function(){I=true;H(new a.TimeOutError());},i);return d.apply(s,F).then(function(K){if(I){return;}clearTimeout(J);G(K);},function(K){if(I){return;}clearTimeout(J);H(K);});});};return j;}e.timeoutDecorator=t;function b(d){var i=0;var j=function(){var s=++i;return d.apply(this,arguments).then(function(F){return new Promise(function(G){if(s!==i){return;}G(F);});},function(F){return new Promise(function(G,H){if(s!==i){return;}H(F);});});};j.abort=function(){++i;};return j;}e.refuseOutdatedResponsesDecorator=b;function g(d,i){if(typeof window==="undefined"){return null;}if(!i){i=window.location.href;}d=d.replace(/[\[\]]/g,"\\$&");var j=new RegExp("[?&]"+d+"(=([^&#]*)|&|#|$)"),s=j.exec(i);if(!s){return null;}if(!s[2]){return"";}return decodeURIComponent(s[2].replace(/\+/g," "));}e.getUrlParameter=g;function f(d,j){for(var i=0;i<j.length;++i){var s=j[i];var F=0;while(F>=0){F=d.indexOf(s);if(F>=0){d=d.slice(0,F)+d.slice(F+s.length);}}}return d;}e.filterString=f;function c(){var i=function(j,F){var s="000000000"+j;return s.substr(s.length-F);};var d=new Date();return(""+d.getUTCFullYear()+i(d.getUTCMonth()+1,2)+i(d.getUTCDate(),2)+i(d.getUTCHours(),2)+i(d.getUTCMinutes(),2)+i(d.getUTCSeconds(),2)+i(d.getUTCMilliseconds(),3));}e.generateTimestamp=c;var D=(function(){function D(d){d=d||{};this.timeDelay=d.timeDelay||1000;this.consumer=d.consumer||function(){};this.consumerContext=d.consumerContext||null;this.objects=[];}D.prototype.add=function(d){this.objects.push(d);if(this.objects.length===1){setTimeout(this.consume.bind(this),this.timeDelay);}};D.prototype.consume=function(){this.consumer.apply(this.consumerContext,[this.objects]);this.objects=[];};return D;}());e.DelayedConsumer=D;function h(d){return{type:"Timestamp",value:d.toJSON(),};}e.dateToJson=h;function k(j){if(j.type!=="Timestamp"){throw new a.NoJSONDateError("Not a timestampe "+j);}return new Date(j.value);}e.dateFromJson=k;function l(d){if(d.items){var s=d.items;for(var i=0;i<s.length;i++){var F=s[i];F=this.addGeoDataIfAvailable(F);var G=F.detailAttributes;for(var j=0;j<G.length;j++){var H=G[j];var I=H.sina;var J=H.value;var K=H.metadata;if(typeof J==="string"&&H.metadata.type!=="ImageUrl"){var L=J.match(/^[^\0-\x20,:;<>@\[\\\]^_`]+@[^\0-,.-@\[\\\]^_`\{\|\}~]+\.[^\0-,.-@\[\\\]^_`\{\|\}~]+$/g);var M=J.match(/^(?!\d*$)(?=(?:[()\[\]+\-\/ ]*\d[()\[\]+\-\/ ]*){9,15}$)\+?(?:\d+|\(\d+(?: \d+)*\)|\[\d+\]|[\/ ]|\d-\d)+$/g);var N=J.match(/^https?:\/\/(?=[^\/])\S+$/gi);if(K.semantics==A.AttributeSemanticsType.EmailAddress){H.defaultNavigationTarget=I._createNavigationTarget({label:J,targetUrl:"mailto:"+J,});}else if(K.semantics==A.AttributeSemanticsType.PhoneNr){H.defaultNavigationTarget=I._createNavigationTarget({label:J,targetUrl:"tel:"+J,});}else if(K.semantics==A.AttributeSemanticsType.HTTPURL){H.defaultNavigationTarget=I._createNavigationTarget({label:J,targetUrl:J,target:"_blank",});}else if(L!==null&&L.length===1){H.defaultNavigationTarget=I._createNavigationTarget({label:L[0],targetUrl:"mailto:"+L[0],});}else if(M!==null&&M[0].match(/\d\d\d/)!==null){H.defaultNavigationTarget=I._createNavigationTarget({label:M[0],targetUrl:"tel:"+M[0],});}else if(N!==null&&N[0].match(/\w\w\w/)!==null){H.defaultNavigationTarget=I._createNavigationTarget({label:N[0],targetUrl:N[0],target:"_blank",});}}}}}return d;}e.addPotentialNavTargetsToAttribute=l;function m(d){var j=d.sina.getDataSource(d.query.filter.dataSource.id);for(var i=0;i<d.facets.length;i++){var s=d.facets[i].query.dimension;var F=j.attributeMetadataMap[s];if(F&&F.usage.AdvancedSearch&&F.usage.Facet===undefined){d.facets.splice(i,1);i=i-1;}}return d;}e.removePureAdvancedSearchFacets=m;function n(d,j,i){var s=false;var F,G,H,I,J,K;var L=d.id;var M=d.value;if(L.match(/latitude/i)!==null){if(!isNaN(M)){J=L;F=M;H=i;}s=true;}else if(L.match(/longitude/i)!==null){if(!isNaN(M)){K=L;G=M;I=i;}s=true;}else if(L.match(/LOC_4326/)){I=i;H=i;var N=JSON.parse(M);var O=N.coordinates;if(O&&O.length>1){G=O[0];F=O[1];}s=true;}if(j===undefined||j===true){return s;}return{lat:F,lon:G,latAttribName:J,lonAttribName:K,latIndex:H,lonIndex:I,};}e.isMapsAttribute=n;function o(d){var j,s,F,G,H,I;var J=d.detailAttributes;for(var i=0;i<J.length;i++){j=this.isMapsAttribute(J[i],false,i);s=j.lat?j.lat:s;F=j.lon?j.lon:F;H=j.latIndex?j.latIndex:H;I=j.lonIndex?j.lonIndex:I;if(s&&F){break;}}if(s&&F){if(H===I){J.splice(H,1);}else if(H>I){J.splice(H,1);J.splice(I,1);}else{J.splice(I,1);J.splice(H,1);}var K={sina:d.sina,type:"GeoJson",id:"LOC_4326",label:"LOC_4326",isCurrency:false,IsBoolean:false,IsKey:false,IsSortable:true,isUnitOfMeasure:false,semanticObjectType:[],isQuantity:"",usage:{Map:"coordinates",},};var L='{ "type": "Point", "coordinates": ['+F+", "+s+", 0] }";var M={id:"LOC_4326",label:"LOC_4326",isHighlighted:false,value:L,valueFormatted:L,valueHighlighted:d.sina,metadata:K,sina:d.sina,};J.push(M);G=d.sina.getDataSource(d.dataSource.id);if(!G.attributeMetadataMap.LOC_4326){G.attributesMetadata.push(K);G.attributeMetadataMap.LOC_4326=K;}else{G.attributeMetadataMap.LOC_4326.type="GeoJson";G.attributeMetadataMap.LOC_4326.usage={Map:"coordinates",};}}return d;}e.addGeoDataIfAvailable=o;function p(d){var i={};return function(j){if(Object.prototype.hasOwnProperty.call(i,j)){return i[j];}var s=d.apply(this,[j]);i[j]=s;return s;};}e.cacheDecorator=p;function q(s){return s.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&");}e.escapeRegExp=q;function u(d,i){var j=new RegExp("{{([^{}]*)}}");var s=function(d){var H=j.exec(d);if(!H){return null;}return H[1];};var F=function(d,H,I){var J=new RegExp("{{"+q(H)+"}}","g");d=d.replace(J,I);return d;};var G=function(d){var H=s(d);if(!H){return d;}d=F(d,H,i[H]);return G(d);};return G(d);}e.evaluateTemplate=u;e.extractRegExp=new RegExp("<b>(.*?)<\\/b>","g");function v(d){var i;var j=[];do{i=e.extractRegExp.exec(d);if(i){j.push(i[1]);}}while(i);return j;}e.extractHighlightedTerms=v;function w(d,j){for(var i=0;i<j.length;++i){var s=j[i];if(d.indexOf(s)<0){d.push(s);}}}e.appendRemovingDuplicates=w;var x=["\\","-","(",")","~","^","?",'"',":","'","[","]"];var y=["AND","OR","NOT"];var z=["\\",'"',"*","?","'"];function B(d,s,i){return d.split(s).join(i);}function C(d){var i=d.trim();for(var _=0,j=x;_<j.length;_++){var s=j[_];if(s==="'"){i=B(i,s,"''");}else{i=B(i,s,"\\"+s);}}for(var F=0,G=y;F<G.length;F++){var H=G[F];if(i===H){i='"'+H+'"';}if(i.startsWith(H+" ")){i='"'+H+'" '+i.substring(H.length+1);}if(i.endsWith(" "+H)){i=i.substring(0,i.length-(H.length+1))+' "'+H+'"';}i=B(i," "+H+" ",' "'+H+'" ');}if(i===""){i="*";}return i;}e.escapeQuery=C;function E(d){var i=d.trim();for(var _=0,j=z;_<j.length;_++){var s=j[_];if(s==="'"){i=B(i,s,"''");}else{i=B(i,s,"\\"+s);}}if(i===""){i="*";}return i;}e.escapeFilterCondition=E;});})();