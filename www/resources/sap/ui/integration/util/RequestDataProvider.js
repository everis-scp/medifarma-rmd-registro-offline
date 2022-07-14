/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/util/DataProvider","jquery.sap.global","sap/base/Log","sap/ui/model/odata/v4/ODataUtils"],function(D,q,L,O){"use strict";var R=[429,503];var m=["no-cors","same-origin","cors"];var M=["GET","POST"];var a=D.extend("sap.ui.integration.util.RequestDataProvider",{metadata:{properties:{allowCustomDataType:{type:"boolean",defaultValue:false}}}});a.prototype.destroy=function(){if(this._iRetryAfterTimeout){clearTimeout(this._iRetryAfterTimeout);}D.prototype.destroy.apply(this,arguments);};a.prototype.getData=function(){var r=this.getSettings().request;if(this._oDestinations){return this._oDestinations.process(r).then(this._fetch.bind(this));}return this._fetch(r);};a.prototype._isValidRequest=function(r){if(!r){return false;}if(m.indexOf(r.mode)===-1){return false;}if(M.indexOf(r.method)===-1){return false;}if(typeof r.url!=="string"){return false;}return true;};a.prototype._fetch=function(r){var s="Invalid request",S=this._oSettings;if(!r||!r.url){L.error(s);return Promise.reject(s);}if(!this.getAllowCustomDataType()&&r.dataType){L.error("To specify dataType property in the Request Configuration, first set allowCustomDataType to 'true'.");}var d=r.parameters,c=this.getCardInstance(),u=r.url,b=(this.getAllowCustomDataType()&&r.dataType)||"json",h=r.headers||{},B=r.batch,o,e;if(c&&!u.startsWith("/")){u=c.getRuntimeUrl(r.url);}if(this._hasHeader(r,"Content-Type","application/json")){d=JSON.stringify(r.parameters);}if(B){o=O.serializeBatchRequest(Object.values(B));b="text";d=o.body;h=Object.assign({},h,o.headers);}h=this._prepareHeaders(h,S);e={"mode":r.mode||"cors","url":u,"method":(r.method&&r.method.toUpperCase())||"GET","dataType":b,"data":d,"headers":h,"timeout":15000,"xhrFields":{"withCredentials":!!r.withCredentials}};if(!this._isValidRequest(e)){L.error(s);return Promise.reject(s);}return this._request(e).then(function(v){var d=v[0],j=v[1];if(B){return this._deserializeBatchResponse(B,d,j);}return d;}.bind(this));};a.prototype._request=function(r,n){return new Promise(function(b,c){q.ajax(r).done(function(d,t,j){if(this.bIsDestroyed){c("RequestDataProvider is already destroyed before the response is received.");return;}b([d,j]);}).fail(function(j,t,e){var E=[e,j];if(this.bIsDestroyed){c("RequestDataProvider is already destroyed while error in the response occurred.");return;}if(n){c(E);return;}this._retryRequest(E,r).then(b,c);}.bind(this));}.bind(this));};a.prototype._retryRequest=function(e,r){var j=e[1],i=this._getRetryAfter(j);if(!R.includes(j.status)){return Promise.reject(e);}if(!i){L.warning("Request could be retried, but Retry-After header or configuration parameter retryAfter are missing.");return Promise.reject(e);}if(this._iRetryAfterTimeout){return Promise.reject("The retry was already scheduled.");}return new Promise(function(b,c){this._iRetryAfterTimeout=setTimeout(function(){this._request(r,true).then(b,c);this._iRetryAfterTimeout=null;}.bind(this),i*1000);}.bind(this));};a.prototype._getRetryAfter=function(j){var r=this.getSettings().request,v=j.getResponseHeader("Retry-After")||r.retryAfter;if(!v){return 0;}if(Number.isInteger(v)){return v;}if(!v.match(/^\d+$/)){L.error("Only number of seconds is supported as value of retry-after. Given '"+v+"'.");return 0;}return parseInt(v);};a.prototype._hasHeader=function(r,h,v){if(!r.headers){return false;}for(var k in r.headers){if(k.toLowerCase()===h.toLowerCase()&&r.headers[k]===v){return true;}}return false;};a.prototype._deserializeBatchResponse=function(b,r,j){return new Promise(function(c,d){var C=j.getResponseHeader("Content-Type"),B=O.deserializeBatchResponse(C,r,false),k=Object.keys(b),e={};k.forEach(function(K,i){var f=B[i],o;if(!f){d("Batch responses do not match the batch requests.");return;}o=new Response(f.responseText,f);if(!o.ok){d("One of batch requests fails with '"+o.status+" "+o.statusText+"'");return;}e[K]=f.responseText?JSON.parse(f.responseText):{};});c(e);});};a.prototype._prepareHeaders=function(h,s){return h;};return a;});
