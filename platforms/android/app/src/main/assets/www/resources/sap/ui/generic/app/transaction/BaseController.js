/*
 * SAPUI5

(c) Copyright 2009-2020 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/ui/generic/app/util/ModelUtil","sap/ui/generic/app/util/DraftUtil","sap/ui/generic/app/util/Queue","sap/base/Log"],function(E,M,D,Q,L){"use strict";var B=E.extend("sap.ui.generic.app.transaction.BaseController",{metadata:{publicMethods:["hasClientMessages","triggerSubmitChanges","attachFatalError","detachFatalError","destroy","updateMultipleEntities"]},constructor:function(m,q){if(!m){throw new Error("No model");}if(m.bUseBatch==false){L.error("sap.ui.generic.app.transaction.BaseController: Only ODataModel with batch mode enabled are supported!");B.prototype.NonBatchEventHandlers={};m.attachRequestCompleted(function(e){var r=e.getParameters().ID;var o=B.prototype.NonBatchEventHandlers[r];if(o&&e.getParameters().success){o.success();delete B.prototype.NonBatchEventHandlers[r];}else if(o&&!e.getParameters().success){o.error();delete B.prototype.NonBatchEventHandlers[r];}});}E.apply(this,arguments);this.sName="sap.ui.generic.app.transaction.BaseController";this._oModel=m;this._oMeta=m.getMetaModel();this._oDraftUtil=new D();this._oModelUtil=new M(m);if(q){this._oQueue=q;}else{this._oQueue=new Q();this._bOwnsQueue=true;}this._initCounts();}});B.prototype.attachFatalError=function(f,l){this.attachEvent("fatalError",f,l);};B.prototype.detachFatalError=function(f,l){this.detachEvent("fatalError",f,l);};B.prototype._prepareCallAction=function(f,c,p){var e,o,a,s,k;if(!f){throw new Error("Invalid Function Import");}p.urlParameters=p.urlParameters||{};p.functionImport=this._oMeta.getODataFunctionImport(f.split("/")[1]);if(!p.functionImport){throw new Error("Unknown Function Import "+f);}if(c){s=M.getEntitySetFromContext(c);e=this._oMeta.getODataEntitySet(s,false);o=this._oMeta.getODataEntityType(e.entityType,false);k=o.key.propertyRef;a=c.getObject();}if(a){this._getActionParameters(a,p,k);this._getAdditionalActionParameters(a,p,k);this._getActionRequestHeaders(c,a,p);}return p;};B.prototype._callAction=function(f,c,p){var t=this;if(!p.urlParameters||!p.functionImport){p=this._prepareCallAction(f,c,p);}return new Promise(function(r,a){var F,C;F="/"+p.functionImport.name;C=t._getRequestCallbacks(r,a);t._oModel.callFunction(F,{method:p.functionImport.httpMethod,urlParameters:p.urlParameters,success:C.success,error:C.error,batchGroupId:p.batchGroupId,changeSetId:p.changeSetId,headers:p.headers,expand:p.expand});});};B.prototype._createFunctionContext=function(c,p){var a={};var C;var h;var t=this;a.result=new Promise(function(r,R){C=t._getRequestCallbacks(r,R);});this._getActionRequestHeaders(c,c.getObject(),p);h=this._oModel.callFunction("/"+p.functionImport.name,{method:p.functionImport.httpMethod,urlParameters:p.urlParameters,success:C.success,error:C.error,batchGroupId:p.batchGroupId,changeSetId:p.changeSetId,headers:p.headers,eTag:t._oModel.getETag(c.getPath())});a.context=h.contextCreated();a.abort=h.abort;return a;};B.prototype._getActionRequestHeaders=function(c,e,p){var s;if(!p.headers){p.headers={};}if(!p.headers["If-Match"]&&p.functionImport["sap:action-for"]){s=this._oModel.getETag(null,c,e);if(s){p.headers["If-Match"]=s;}}};B.prototype._getActionParameters=function(e,p,k){var i,a,l=k.length,A={},s;s=p.functionImport["sap:action-for"];a=function(P){if(p.functionImport.parameter){var j,b=p.functionImport.parameter.length;for(j=0;j<b;j++){if(p.functionImport.parameter[j].name===P){return true;}}}return false;};if(!p.functionImport.parameter&&s){L.error("Action doesn't have any parameters");throw new Error("Action doesn't have any parameters");}for(i=0;i<l;i++){if(a(k[i].name)){p.urlParameters[k[i].name]=e[k[i].name];}else if(s&&(k[i].name!="IsActiveEntity"||k[i].name!="DraftUUID")){L.error("Action does not contain a equally-named parameter for key property: "+k[i].name);throw new Error("Action does not contain a equally-named parameter for key property: "+k[i].name);}}return A;};B.prototype._getAdditionalActionParameters=function(e,p,k){var j,l=0,P;var I=function(s){var i=0,a=k.length;for(i=0;i<a;i++){if(k[i].name===s){return true;}}return false;};if(p.functionImport.parameter){l=p.functionImport.parameter.length;}if(l>k.length){for(j=0;j<l;j++){P=p.functionImport.parameter[j];if(!I(P.name)){var n=(P.nullable==="true")?true:false;if(!p.urlParameters.hasOwnProperty(P.name)&&!n){L.error("Unknown parameter "+P.name);throw new Error("Unknown parameter "+P.name);}}}}};B.prototype._read=function(p,P){var t=this;return new Promise(function(r,a){var c,u;if(P.readParameters){u=P.readParameters;}else if(P.urlParameters){u=P.urlParameters;}c=t._getRequestCallbacks(r,a);t._oModel.read(p,{context:P.context,success:c.success,error:c.error,batchGroupId:P.batchGroupId,changeSetId:P.changeSetId,urlParameters:u});});};B.prototype._remove=function(p,P){var t=this;return new Promise(function(r,a){var c=t._getRequestCallbacks(r,a);t._oModel.remove(p,{success:c.success,error:c.error,eTag:"*",batchGroupId:P.batchGroupId,changeSetId:P.changeSetId,headers:P.headers});});};B.prototype._syncRemove=function(p,P,s,e){var c=this._getRequestCallbacks(s,e);return this._oModel.remove(p,{success:c.success,error:c.error,eTag:"*",batchGroupId:P.batchGroupId,changeSetId:P.changeSetId});};B.prototype._submitChanges=function(p){var t=this;if(!this._checkSubmit(p)){return Promise.resolve({context:p&&p.context});}if(this._oModel.bUseBatch==true){return new Promise(function(r,a){var c=t._getRequestCallbacks(r,a);t._oModel.submitChanges({batchGroupId:p.batchGroupId,success:c.success,error:c.error,eTag:p.eTag});});}else{return new Promise(function(r,a){var c=t._getRequestCallbacks(r,a);if(p.batchGroupId&&this._oModel.mDeferredRequests&&this._oModel.mDeferredRequests[p.batchGroupId]&&this._oModel.mDeferredRequests[p.batchGroupId].changes){var C=this._oModel.mDeferredRequests[p.batchGroupId].changes[p.changeSetId]||[];for(var i=0;i<C.length;i++){if(C[i].request._aborted==undefined||C[i].request._aborted==false){B.prototype.NonBatchEventHandlers[C[i].request.requestID]={"success":c.success,"error":c.error};}}}if(p.batchGroupId&&this._oModel.mDeferredRequests&&this._oModel.mDeferredRequests[p.batchGroupId]&&this._oModel.mDeferredRequests[p.batchGroupId].requests){var R=this._oModel.mDeferredRequests[p.batchGroupId].requests;for(var i=0;i<R.length;i++){if(R[i].request._aborted==undefined||R[i].request._aborted==false){B.prototype.NonBatchEventHandlers[R[i].request.requestID]={"success":c.success,"error":c.error};}}}t._oModel.submitChanges({batchGroupId:p.batchGroupId,eTag:p.eTag});}.bind(this));}};B.prototype._checkSubmit=function(p){if(this._oModel.hasPendingChanges()){p.pendingChanges=true;return true;}if(p.forceSubmit&&p.forceSubmit==true){if(p.batchGroupId&&this._oModel.mDeferredRequests&&this._oModel.mDeferredRequests[p.batchGroupId]&&this._oModel.mDeferredRequests[p.batchGroupId].changes){var c=this._oModel.mDeferredRequests[p.batchGroupId].changes;var C=[];var a=[];var b;for(var k in c){if(c.hasOwnProperty(k)){C.push(k);}}for(var i=0;i<C.length;i++){b=this._oModel.mDeferredRequests[p.batchGroupId].changes[C[i]]||[];a=a.concat(b);}for(var i=0;i<a.length;i++){if(a[i].request._aborted==undefined||a[i].request._aborted==false){return true;}}}if(p.batchGroupId&&this._oModel.mDeferredRequests&&this._oModel.mDeferredRequests[p.batchGroupId]&&this._oModel.mDeferredRequests[p.batchGroupId].requests){var r=this._oModel.mDeferredRequests[p.batchGroupId].requests||[];for(var i=0;i<r.length;i++){if(r[i].request._aborted==undefined||r[i].request._aborted==false){return true;}}}}return false;};B.prototype.triggerSubmitChanges=function(p){var t=this,f,r;p=p||{};p.successMsg=p.successMsg||"Action succeeded";p.failedMsg=p.failedMsg||"Action failed";r=function(e){t.fireEvent("fatalError",{response:e});throw e;};f=function(){return t._submitChanges(p).then(function(R){var _=function(R,p){try{t._checkImplicitError({httpResponse:R,responseData:R.data},p);return t._normalizeResponse({httpResponse:R,responseData:R.data},true);}catch(e){r(e);}};var b;var c;var n=[];if(R&&R.responseData&&R.responseData.__batchResponses){if(R.responseData.__batchResponses.length==1&&R.responseData.__batchResponses[0].__changeResponses&&R.responseData.__batchResponses[0].__changeResponses.length==1){return _(R.responseData.__batchResponses[0].__changeResponses[0],p);}for(var i=0;i<R.responseData.__batchResponses.length;i++){b=R.responseData.__batchResponses[i];if(b.__changeResponses){for(var j=0;j<b.__changeResponses.length;j++){c=b.__changeResponses[j];n.push(_(c,p));}}else{return _(b,p);}}}else{try{t._checkImplicitError(R,p);return t._normalizeResponse(R,true);}catch(e){r(e);}}return n;},function(R){var o=t._normalizeError(R);r(o);});};return this._oQueue.enqueue(f,{draftSave:p.draftSave});};B.prototype._updateEntity=function(c,u){var t=this;return new Promise(function(r,a){var C=t._getRequestCallbacks(r,a);var p={success:C.success,error:C.error};t._oModel.update(c,u,p);});};B.prototype.updateMultipleEntities=function(c){var p=[];for(var i=0;i<c.length;i++){var P=this._updateEntity(c[i].sContextPath,c[i].oUpdateData);p.push(P);}return Promise.all(p);};B.prototype.addOperationToQueue=function(f,e){this._oQueue.enqueue(f,e);};B.prototype.attachBeforeQueueItemProcess=function(f){this._oQueue._attachEvent('beforeQueueItemProcess',f);};B.prototype.detachBeforeQueueItemProcess=function(f){this._oQueue._detachEvent('beforeQueueItemProcess',f);};B.prototype.attachOnQueueCompleted=function(f){this._oQueue._attachEvent('onQueueCompleted',f);};B.prototype.detachOnQueueCompleted=function(f){this._oQueue._detachEvent('onQueueCompleted',f);};B.prototype.attachOnQueueFailed=function(f){this._oQueue._attachEvent('onQueueFailed',f);};B.prototype.detachOnQueueFailed=function(f){this._oQueue._detachEvent('onQueueFailed',f);};B.prototype.hasClientMessages=function(){if(this._oModelUtil.hasClientMessages()){return Promise.reject(new Error("Client messages detected"));}return null;};B.prototype._normalizeResponse=function(r,c){if(r&&(r.httpResponse||r.responseData)){return{data:r.responseData,response:r.httpResponse||null,context:c?this._oModelUtil.getContextFromResponse(r.responseData):null};}return r;};B.prototype._normalizeError=function(r){if(r&&r.message){return{response:r};}return r;};B.prototype._returnPromiseAll=function(p){return Promise.all(p).then(function(r){if(r.length){return r[0];}return r;});};B.prototype._atLeastOnePromiseResolved=function(p,d){var r=[];var R=Promise.resolve(null);var a=false;var P=p.length;var f=function(o){if(!d){r.push(o);a=true;}else if(P-1>r.length&&d){r.push(o);a=true;}};p.forEach(function(o,i){R=R.then(function(){return o;}).then(f,function(e){r.push(e);},this);});return R.then(function(){if(a){return Promise.resolve(r);}else{return Promise.reject(r);}});};B.prototype._checkImplicitError=function(r,p){var P,o,s,c=false;if(this._mCounts.requestSent===1&&this._mCounts.requestCompleted===1){c=true;}this._initCounts();if(p.pendingChanges&&c){if(r&&r.httpResponse){P=r.httpResponse;}if(P&&P.response&&P.response.statusCode){s=parseInt(P.response.statusCode);if(s<200||s>299){o=this._parseError(P);throw this._normalizeError(o);}}}};B.prototype._parseError=function(p){var r={};if(p.message){r.message=p.message;}if(p.response){r.statusCode=p.response.statusCode;r.statusText=p.response.statusText;r.headers=p.response.headers;r.responseText=p.response.body;}return r;};B.prototype._initCounts=function(){this._mCounts={requestSent:0,requestCompleted:0};};B.prototype._getRequestCallbacks=function(r,a){var t=this;this._mCounts.requestSent++;return{success:function(d,R){t._mCounts.requestCompleted++;r({responseData:d,httpResponse:R});},error:function(R){t._mCounts.requestCompleted++;a(R);}};};B.prototype.destroy=function(){if(this._oModelUtil){this._oModelUtil.destroy();}if(this._oQueue&&this._bOwnsQueue){this._oQueue.destroy();}this._oModel=null;this._oMeta=null;this._oDraftUtil=null;this._oModelUtil=null;};return B;},true);
