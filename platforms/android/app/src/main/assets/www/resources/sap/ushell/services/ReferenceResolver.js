// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/User","sap/ui/model/odata/ODataUtils","sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject","sap/base/Log"],function(U,O,q,i,L){"use strict";function a(){this.getValue=function(r){var d=new q.Deferred();var v;if(r==="User.env.sap-ui-legacy-date-format"){v=sap.ui.getCore().getConfiguration().getFormatSettings().getLegacyDateFormat();}if(r==="User.env.sap-ui-legacy-number-format"){v=sap.ui.getCore().getConfiguration().getFormatSettings().getLegacyNumberFormat();}if(r==="User.env.sap-ui-legacy-time-format"){v=sap.ui.getCore().getConfiguration().getFormatSettings().getLegacyTimeFormat();}if(r==="User.env.sap-language"){v=sap.ushell.Container.getUser().getLanguage();}if(r==="User.env.sap-languagebcp47"){v=sap.ushell.Container.getUser().getLanguageBcp47();}if(r==="User.env.sap-accessibility"){v=(sap.ushell.Container.getUser().getAccessibilityMode())?"X":undefined;}if(r==="User.env.sap-statistics"){v=(sap.ui.getCore().getConfiguration().getStatistics())?"true":undefined;}if(r==="User.env.sap-theme"){v=sap.ushell.Container.getUser().getTheme(U.prototype.constants.themeFormat.THEME_NAME_PLUS_URL);}if(r==="User.env.sap-theme-name"){v=sap.ushell.Container.getUser().getTheme();}if(r==="User.env.sap-theme-NWBC"){v=sap.ushell.Container.getUser().getTheme(U.prototype.constants.themeFormat.NWBC);}d.resolve({value:v});return d.promise();};}function R(c,p,C){this._getUserEnvReferenceResolver=function(){if(!this.oUserEnvReferenceResolver){this.oUserEnvReferenceResolver=new a();}return this.oUserEnvReferenceResolver;};this.resolveReferences=function(r,s){var t=this,d=new q.Deferred(),u,b=[],A=true,D={},o={},e,S;if(!s){S=sap.ushell.Container.getServiceAsync("ClientSideTargetResolution").then(function(h){return h.getSystemContext();});}else{S=Promise.resolve(s);}var g=r.map(function(h){var j;if(h.indexOf("User.env.")===0){j=h;o[j]=1;}if(h.indexOf("UserDefault.")===0){j=t._extractAnyUserDefaultReferenceName(h);D[j]=1;}if(typeof j!=="string"){A=false;L.error("'"+h+"' is not a legal reference name",null,"sap.ushell.services.ReferenceResolver");}return{full:h,name:j};});if(!A){return d.reject("One or more references could not be resolved").promise();}S.then(function(h){Object.keys(D).forEach(function(n){u=u||sap.ushell.Container.getService("UserDefaultParameters");b.push(u.getValue(n,h));});Object.keys(o).forEach(function(n){e=e||t._getUserEnvReferenceResolver();b.push(e.getValue(n));});q.when.apply(q,b).done(function(){var k={};var I=0,j=arguments;Object.keys(D).forEach(function(n){D[n]=j[I];I=I+1;});Object.keys(o).forEach(function(n){o[n]=j[I];I=I+1;});g.forEach(function(l){var m;if(l.full.indexOf("UserDefault.extended.")===0){m=t.mergeSimpleAndExtended(D[l.name]);if(!i(m)){k[l.full]=m;}else{k[l.full]=undefined;}}else if(l.full.indexOf("UserDefault.")===0){k[l.full]=D[l.name].value;}else if(l.full.indexOf("User.env.")===0){k[l.full]=o[l.name].value;}});d.resolve(k);});});return d.promise();};this._extractAnyUserDefaultReferenceName=function(r){var P=this.extractExtendedUserDefaultReferenceName(r);if(typeof P==="string"){return P;}return this.extractUserDefaultReferenceName(r);};this.extractExtendedUserDefaultReferenceName=function(r){if(typeof r!=="string"||r.indexOf("UserDefault.extended.")!==0){return undefined;}return r.replace(/^UserDefault[.]extended[.]/,"");};this.extractUserDefaultReferenceName=function(r){if(typeof r!=="string"||r.indexOf("UserDefault.")!==0||r.indexOf("UserDefault.extended.")===0){return undefined;}return r.replace(/^UserDefault[.]/,"");};this.mergeSimpleAndExtended=function(v){var m=q.extend(true,{},v.extendedValue);if(typeof v.value==="string"){if(!Array.isArray(m.Ranges)){m.Ranges=[];}m.Ranges.push({Sign:"I",Option:"EQ",Low:v.value,High:null});}return m;};function f(u){var r=/{([^}%]*%%[^%]+%%)}?/g,b=/([^%]*)%%/,d=/%%([^%]+)%%/,o,e,g,F=[];o=r.exec(u);while(o){e=b.exec(o[1]);g=d.exec(o[1]);F.push({edmType:e[1],name:g[1]});o=r.exec(u);}return F;}this.resolveUserDefaultParameters=function(u,s){var d=new q.Deferred(),r,S,I=[],o;o=/[^(?]*/.exec(u);r=(o===null)?[]:f(o[0]);r.forEach(function(g){I.push(g.name);});o=/[(?][^]*/.exec(u);r=(o===null)?[]:f(o[0]);var b=[],e={};r.forEach(function(g){b.push(g.name);e[g.name]=g.edmType;});S=b.filter(function(g){if(/^UserDefault\.(?!extended\.).+/.test(g)){return true;}I.push(g);return false;});if(S.length>0){this.resolveReferences(S,s).done(function(g){var h=u,D=[];Object.keys(g).forEach(function(j){var k,l=false;while(k!=h){k=h;if(g[j]!==undefined){var F=O.formatValue(g[j],e[j]);h=h.replace("{"+e[j]+"%%"+j+"%%}",window.encodeURIComponent(F));}else{l=true;h=h.replace("{"+e[j]+"%%"+j+"%%}","");}}if(l){D.push(j);}});d.resolve({url:h,defaultsWithoutValue:D,ignoredReferences:I});});}else{d.resolve({url:u,defaultsWithoutValue:[],ignoredReferences:I});}return d.promise();};}R.hasNoAdapter=true;return R;},true);
