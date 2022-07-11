/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataParentBinding","./lib/_Cache","./lib/_GroupLock","./lib/_Helper","sap/ui/base/SyncPromise","sap/ui/model/Binding","sap/ui/model/ChangeReason","sap/ui/model/ContextBinding"],function(C,a,_,b,c,S,B,d,f){"use strict";var s="sap.ui.model.odata.v4.ODataContextBinding",m={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true,patchCompleted:true,patchSent:true};function g(p,r){var e=p.slice(0,p.lastIndexOf("/")),i=e.indexOf("(");return(i<0?e:p.slice(0,i))+r;}var O=f.extend("sap.ui.model.odata.v4.ODataContextBinding",{constructor:function(M,p,o,P){var i=p.indexOf("(...)"),t=this;f.call(this,M,p);a.call(this);if(p.endsWith("/")){throw new Error("Invalid path: "+p);}this.oOperation=undefined;this.oParameterContext=null;this.oReturnValueContext=null;if(i>=0){if(i!==this.sPath.length-5){throw new Error("The path must not continue after a deferred operation: "+this.sPath);}this.oOperation={bAction:undefined,mChangeListeners:{},mParameters:{},sResourcePath:undefined};if(!this.bRelative){this.oParameterContext=C.create(this.oModel,this,this.sPath+"/$Parameter");}}P=c.clone(P)||{};this.checkBindingParameters(P,["$$canonicalPath","$$groupId","$$inheritExpandSelect","$$ownRequest","$$patchWithoutSideEffects","$$updateGroupId"]);this.sGroupId=P.$$groupId;this.bInheritExpandSelect=P.$$inheritExpandSelect;this.sUpdateGroupId=P.$$updateGroupId;this.applyParameters(P);this.oElementContext=this.bRelative?null:C.createNewContext(this.oModel,this,p);if(!this.oOperation&&(!this.bRelative||o&&!o.fetchValue)){this.createReadGroupLock(this.getGroupId(),true);}this.setContext(o);M.bindingCreated(this);Promise.resolve().then(function(){t.bInitial=false;});},metadata:{publicMethods:[]}});a(O.prototype);O.prototype._delete=function(G,e){var E=this._findEmptyPathParentContext(this.oElementContext),o=E.getBinding();if(!o.execute){return this.fetchValue("",undefined,true).then(function(h){return E._delete(G,h);});}return this.deleteFromCache(G,e,"",undefined,function(){o._destroyContextAfterDelete();});};O.prototype._destroyContextAfterDelete=function(){this.oElementContext.destroy();this.oElementContext=null;if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=null;}this._fireChange({reason:d.Remove});};O.prototype._execute=function(G,p,i,o){var M=this.oModel.getMetaModel(),e,P,r=this.getResolvedPathWithReplacedTransientPredicates(),t=this;function h(){t._fireChange({reason:d.Change});return t.refreshDependentBindings("",G.getGroupId(),true);}P=M.fetchObject(c.getMetaPath(r)+"/@$ui5.overload").then(function(j){var k,I,l;if(!j){throw new Error("Unknown operation: "+r);}if(j.length!==1){throw new Error("Expected a single overload, but found "+j.length+" for "+r);}if(t.bRelative&&t.oContext.getBinding){I=t.sPath.lastIndexOf("/");l=I>=0?t.sPath.slice(0,I):"";k=t.oContext.getValue.bind(t.oContext,l);}e=j[0];return t.createCacheAndRequest(G,r,e,p,k,i,o);}).then(function(R){var j,k,l;return h().then(function(){if(t.isReturnValueLikeBindingParameter(e)){k=t.oContext.getValue();j=k&&c.getPrivateAnnotation(k,"predicate");l=c.getPrivateAnnotation(R,"predicate");if(j===l){t.oContext.patch(R);}}if(t.hasReturnValueContext(e)){if(t.oReturnValueContext){t.oReturnValueContext.destroy();}t.oReturnValueContext=C.createNewContext(t.oModel,t,g(r,l));t.oCache.setResourcePath(t.oReturnValueContext.getPath().slice(1));return t.oReturnValueContext;}});},function(E){c.adjustTargetsInError(E,e,t.oParameterContext.getPath(),t.bRelative?t.oContext.getPath():undefined);return h().then(function(){throw E;});}).catch(function(E){G.unlock(true);if(t.oReturnValueContext){t.oReturnValueContext.destroy();t.oReturnValueContext=null;}t.oModel.reportError("Failed to execute "+r,s,E);throw E;});return Promise.resolve(P);};O.prototype.adjustPredicate=function(t,p){a.prototype.adjustPredicate.apply(this,arguments);if(this.mCacheQueryOptions){this.fetchCache(this.oContext,true);}if(this.oElementContext){this.oElementContext.adjustPredicate(t,p);}};O.prototype.applyParameters=function(p,e){this.mQueryOptions=this.oModel.buildQueryOptions(p,true);this.mParameters=p;if(this.isRootBindingSuspended()){if(!this.oOperation){this.sResumeChangeReason=d.Change;}}else if(!this.oOperation){this.fetchCache(this.oContext);if(e){this.refreshInternal("",undefined,true).catch(this.oModel.getReporter());}}else if(this.oOperation.bAction===false){this.execute().catch(this.oModel.getReporter());}};O.prototype.attachEvent=function(e,h,i,j){if(!(e in m)){throw new Error("Unsupported event '"+e+"': v4.ODataContextBinding#attachEvent");}return f.prototype.attachEvent.apply(this,arguments);};O.prototype.computeOperationQueryOptions=function(){return Object.assign({},this.oModel.mUriParameters,this.getQueryOptionsFromParameters());};O.prototype.checkKeepAlive=function(){throw new Error("Unsupported "+this);};O.prototype.createCacheAndRequest=function(G,p,o,P,e,i,h){var A=o.$kind==="Action",j,E=e,M=this.oModel,k=c.getMetaPath(p)+"/@$ui5.overload/0/$ReturnType",l=p.slice(1),r=M.oRequestor,t=this;function n(R){if(t.hasReturnValueContext(o)){return g(l,c.getPrivateAnnotation(R,"predicate"));}if(t.isReturnValueLikeBindingParameter(o)&&c.getPrivateAnnotation(E,"predicate")===c.getPrivateAnnotation(R,"predicate")){return l.slice(0,l.lastIndexOf("/"));}return l;}function q(u){var R;c.adjustTargetsInError(u,o,t.oParameterContext.getPath(),t.bRelative?t.oContext.getPath():undefined);u.error.$ignoreTopLevel=true;R=h(c.extractMessages(u).map(function(v){return t.oModel.createUI5Message(v);}));if(!(R instanceof Promise)){throw new Error("Not a promise: "+R);}return R;}if(h&&o.$kind!=="Action"){throw new Error("Not an action: "+p);}if(!A&&o.$kind!=="Function"){throw new Error("Not an operation: "+p);}if(A&&e){E=e();}if(i&&!(A&&o.$IsBound&&E)){throw new Error("Not a bound action: "+p);}if(this.bInheritExpandSelect&&!this.isReturnValueLikeBindingParameter(o)){throw new Error("Must not set parameter $$inheritExpandSelect on this binding");}this.oOperation.bAction=A;this.oOperation.mRefreshParameters=P;P=Object.assign({},P);this.mCacheQueryOptions=this.computeOperationQueryOptions();p=r.getPathAndAddQueryOptions(p,o,P,this.mCacheQueryOptions,E);if(o.$ReturnType&&!o.$ReturnType.$Type.startsWith("Edm.")){k+="/$Type";}j=_.createSingle(r,p,this.mCacheQueryOptions,M.bAutoExpandSelect,M.bSharedRequests,n,A,k);this.oCache=j;this.oCachePromise=S.resolve(j);return A?j.post(G,P,E,i,h&&q):j.fetchValue(G);};O.prototype.destroy=function(){if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=undefined;}if(this.oParameterContext){this.oParameterContext.destroy();this.oParameterContext=undefined;}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=undefined;}this.oModel.bindingDestroyed(this);this.oOperation=undefined;this.mParameters=undefined;this.mQueryOptions=undefined;a.prototype.destroy.call(this);f.prototype.destroy.call(this);};O.prototype.doCreateCache=function(r,q,e,D){return _.createSingle(this.oModel.oRequestor,r,q,this.oModel.bAutoExpandSelect,this.oModel.bSharedRequests,function(){return D;});};O.prototype.doDeregisterChangeListener=function(p,l){if(this.oOperation&&(p==="$Parameter"||p.startsWith("$Parameter/"))){c.removeByPath(this.oOperation.mChangeListeners,p.slice(11),l);return;}a.prototype.doDeregisterChangeListener.apply(this,arguments);};O.prototype.doFetchQueryOptions=function(o){return this.fetchResolvedQueryOptions(o);};O.prototype.doSetProperty=function(p,v,G){if(this.oOperation&&(p==="$Parameter"||p.startsWith("$Parameter/"))){c.updateAll(this.oOperation.mChangeListeners,"",this.oOperation.mParameters,_.makeUpdateData(p.split("/").slice(1),v));this.oOperation.bAction=undefined;if(G){G.unlock();}return S.resolve();}};O.prototype.doSuspend=function(){if(this.bInitial&&!this.oOperation){this.sResumeChangeReason=d.Change;}};O.prototype.execute=function(G,i,o){var r=this.getResolvedPath();this.checkSuspended();this.oModel.checkGroupId(G);if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath);}if(this.bRelative){if(!r){throw new Error("Unresolved binding: "+this.sPath);}if(this.oContext.isTransient&&this.oContext.isTransient()){throw new Error("Execute for transient context not allowed: "+r);}if(this.oContext.getPath().includes("(...)")){throw new Error("Nested deferred operation bindings not supported: "+r);}}return this._execute(this.lockGroup(G,true),c.publicClone(this.oOperation.mParameters,true),i,o);};O.prototype.fetchValue=function(p,l,e){var o=e&&this.oCache!==undefined?S.resolve(this.oCache):this.oCachePromise,E,r=this.getRootBinding(),t=this;if(r&&r.isSuspended()){E=new Error("Suspended binding provides no value");E.canceled="noDebugLog";throw E;}return o.then(function(h){var D=false,G,R=t.getResolvedPath(),i=h||t.oOperation?t.getRelativePath(p):undefined,j,v;if(t.oOperation){if(i===undefined){return t.oContext.fetchValue(p,l,e);}j=i.split("/");if(j[0]==="$Parameter"){if(j.length===1){return undefined;}c.addByPath(t.oOperation.mChangeListeners,i.slice(11),l);v=c.drillDown(t.oOperation.mParameters,j.slice(1));return v===undefined?null:v;}}if(h&&i!==undefined){if(e){G=b.$cached;}else{G=t.oReadGroupLock||t.lockGroup();t.oReadGroupLock=undefined;}return t.resolveRefreshPromise(h.fetchValue(G,i,function(){D=true;t.fireDataRequested();},l)).then(function(v){t.assertSameCache(h);return v;}).then(function(v){if(D){t.fireDataReceived({data:{}});}return v;},function(E){G.unlock(true);if(D){t.oModel.reportError("Failed to read path "+R,s,E);t.fireDataReceived(E.canceled?{data:{}}:{error:E});}throw E;});}if(!t.oOperation&&t.oContext){return t.oContext.fetchValue(p,l,e);}});};O.prototype.getDependentBindings=function(){return this.oModel.getDependentBindings(this);};O.prototype.getParameterContext=function(){if(!this.oOperation){throw new Error("Not a deferred operation binding: "+this);}return this.oParameterContext;};O.prototype.getQueryOptionsFromParameters=function(){var i,q=this.mQueryOptions;if(this.bInheritExpandSelect){i=this.oContext.getBinding().getInheritableQueryOptions();q=Object.assign({},q);if("$select"in i){q.$select=q.$select&&q.$select.slice();c.addToSelect(q,i.$select);}if("$expand"in i){q.$expand=i.$expand;}}return q;};O.prototype.getResolvedPathWithReplacedTransientPredicates=function(){var p="",r=this.getResolvedPath(),e,t=this;if(r&&r.includes("($uid=")){e=r.slice(1).split("/");r="";e.forEach(function(h){var E,P,T;p+="/"+h;T=h.indexOf("($uid=");if(T>=0){E=t.oContext.getValue(p);P=E&&c.getPrivateAnnotation(E,"predicate");if(!P){throw new Error("No key predicate known at "+p);}r+="/"+h.slice(0,T)+P;}else{r+="/"+h;}});}return r;};O.prototype.hasReturnValueContext=function(M){var e;if(!this.isReturnValueLikeBindingParameter(M)){return false;}e=c.getMetaPath(this.getResolvedPath()).split("/");return e.length===3&&this.oModel.getMetaModel().getObject("/"+e[1]).$kind==="EntitySet";};O.prototype.initialize=function(){this.bInitial=false;if(this.isResolved()&&!this.getRootBinding().isSuspended()){this._fireChange({reason:d.Change});}};O.prototype.isReturnValueLikeBindingParameter=function(M){if(!(this.bRelative&&this.oContext&&this.oContext.getBinding)){return false;}return M.$IsBound&&M.$ReturnType&&!M.$ReturnType.$isCollection&&M.$EntitySetPath&&!M.$EntitySetPath.includes("/");};O.prototype.moveEntityTo=function(l){if(!this.isRoot()){throw new Error(this+": must be a root binding");}if(this.oOperation){throw new Error(this+": must not be an operation binding");}if(this.hasPendingChanges()){throw new Error(this+": has pending changes");}l.moveEntityHere(this.oElementContext);this.oElementContext=null;};O.prototype.refreshInternal=function(r,G,e,k){var t=this;if(this.oOperation&&this.oOperation.bAction!==false){return S.resolve();}if(this.isRootBindingSuspended()){this.refreshSuspended(G);return this.refreshDependentBindings(r,G,e,k);}this.createReadGroupLock(G,this.isRoot());return this.oCachePromise.then(function(o){var h,p=t.oRefreshPromise,R=t.oReadGroupLock;if(!t.oElementContext){t.oElementContext=C.create(t.oModel,t,t.getResolvedPath());if(!o){t._fireChange({reason:d.Refresh});}}if(t.oOperation){t.oReadGroupLock=undefined;return t._execute(R,t.oOperation.mRefreshParameters);}if(o&&!p){h=o.hasChangeListeners();t.removeCachesAndMessages(r);t.fetchCache(t.oContext);p=h?t.createRefreshPromise():undefined;if(k&&p){p=p.catch(function(E){return t.fetchResourcePath(t.oContext).then(function(i){if(!t.bRelative||o.getResourcePath()===i){t.oCache=o;t.oCachePromise=S.resolve(o);o.setActive(true);return t.checkUpdateInternal();}}).then(function(){throw E;});});}if(!e){t.fetchValue("").catch(t.oModel.getReporter());}}return S.all([p,t.refreshDependentBindings(r,G,e,k)]);});};O.prototype.refreshReturnValueContext=function(o,G){var e,M=this.oModel;if(this.oReturnValueContext!==o){return null;}this.mCacheQueryOptions=this.computeOperationQueryOptions();if(this.mLateQueryOptions){c.aggregateExpandSelect(this.mCacheQueryOptions,this.mLateQueryOptions);}e=_.createSingle(M.oRequestor,o.getPath().slice(1),this.mCacheQueryOptions,true,M.bSharedRequests);this.oCache=e;this.oCachePromise=S.resolve(e);this.createReadGroupLock(G,true);return o.refreshDependentBindings("",G,true);};O.prototype.requestSideEffects=function(G,p,o){var M=this.oModel,n={},P=[],t=this;function r(h){return h.catch(function(E){M.reportError("Failed to request side effects",s,E);if(!E.canceled){throw E;}});}if(p.indexOf("")<0){try{P.push(this.oCache.requestSideEffects(this.lockGroup(G),p,n,o&&o.getPath().slice(1)));this.visitSideEffects(G,p,o,n,P);return S.all(P.map(r)).then(function(){return t.refreshDependentListBindingsWithoutCache();});}catch(e){if(!e.message.startsWith("Unsupported collection-valued navigation property ")){throw e;}}}return o&&this.refreshReturnValueContext(o,G)||this.refreshInternal("",G,true,true);};O.prototype.requestObject=function(p){return this.oElementContext?this.oElementContext.requestObject(p):Promise.resolve();};O.prototype.resumeInternal=function(e,p){var r=this.sResumeChangeReason,t=this;function h(){t.getDependentBindings().forEach(function(D){D.resumeInternal(e,!!r);});}this.sResumeChangeReason=undefined;if(this.oOperation){h();return;}if(p||r){this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.removeCachesAndMessages("");this.fetchCache(this.oContext);}h();if(r){this._fireChange({reason:r});}};O.prototype.setContext=function(o){if(this.oContext!==o){if(this.bRelative&&(this.oContext||o)){this.checkSuspended(true);if(this.oElementContext){this.oElementContext.destroy();this.oElementContext=null;}if(this.oReturnValueContext){this.oReturnValueContext.destroy();this.oReturnValueContext=null;}if(this.oParameterContext){this.oParameterContext.destroy();this.oParameterContext=null;}this.fetchCache(o);if(o){this.oElementContext=C.create(this.oModel,this,this.oModel.resolve(this.sPath,o));if(this.oOperation){this.oParameterContext=C.create(this.oModel,this,this.oModel.resolve(this.sPath+"/$Parameter",o));}}B.prototype.setContext.call(this,o);}else{this.oContext=o;}}};O.prototype.setParameter=function(p,v){var o;if(!this.oOperation){throw new Error("The binding must be deferred: "+this.sPath);}if(!p){throw new Error("Missing parameter name");}if(v===undefined){throw new Error("Missing value for parameter: "+p);}o=this.oOperation.mParameters[p];this.oOperation.mParameters[p]=v;c.informAll(this.oOperation.mChangeListeners,p,o,v);this.oOperation.bAction=undefined;return this;};return O;});
