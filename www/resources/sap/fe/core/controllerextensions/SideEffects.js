/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/ui/core/mvc/ControllerExtension","sap/fe/core/controllerextensions/ControllerExtensionMetadata","../helpers/ClassSupport","sap/fe/core/CommonUtils","sap/fe/macros/field/FieldRuntime","sap/base/Log"],function(C,a,b,c,F,L){"use strict";var _,d,f,g;var h=F.getFieldStateOnChange;var P=b.Private;var j=b.Final;var k=b.Public;var O=b.Override;var U=b.UI5Class;function l(i,e){if(!(i instanceof e)){throw new TypeError("Cannot call a class as a function");}}function m(e,p){for(var i=0;i<p.length;i++){var o=p[i];o.enumerable=o.enumerable||false;o.configurable=true;if("value"in o)o.writable=true;Object.defineProperty(e,o.key,o);}}function n(e,p,i){if(p)m(e.prototype,p);if(i)m(e,i);return e;}function q(e,i){if(typeof i!=="function"&&i!==null){throw new TypeError("Super expression must either be null or a function");}e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,writable:true,configurable:true}});if(i)r(e,i);}function r(o,p){r=Object.setPrototypeOf||function r(o,p){o.__proto__=p;return o;};return r(o,p);}function s(D){return function(){var e=w(D),i;if(v()){var N=w(this).constructor;i=Reflect.construct(e,arguments,N);}else{i=e.apply(this,arguments);}return t(this,i);};}function t(e,i){if(i&&(typeof i==="object"||typeof i==="function")){return i;}return u(e);}function u(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return e;}function v(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}function w(o){w=Object.setPrototypeOf?Object.getPrototypeOf:function w(o){return o.__proto__||Object.getPrototypeOf(o);};return w(o);}function x(e,p,i,o,y){var z={};Object.keys(o).forEach(function(A){z[A]=o[A];});z.enumerable=!!z.enumerable;z.configurable=!!z.configurable;if('value'in z||z.initializer){z.writable=true;}z=i.slice().reverse().reduce(function(z,A){return A(e,p,z)||z;},z);if(y&&z.initializer!==void 0){z.value=z.initializer?z.initializer.call(y):void 0;z.initializer=undefined;}if(z.initializer===void 0){Object.defineProperty(e,p,z);z=null;}return z;}var S=(_=U("sap.fe.core.controllerextensions.SideEffects",a),d=O(),_(f=(g=function(e){q(S,e);var i=s(S);function S(){l(this,S);return i.apply(this,arguments);}n(S,[{key:"onInit",value:function o(){this._oView=this.base.getView();this._oAppComponent=c.getAppComponent(this._oView);this._oSideEffectsService=this._oAppComponent.getSideEffectsService();this._mFieldGroupQueue={};this._aSourcePropertiesFailure=new Set();this._mFailedSideEffects={};}},{key:"clearPropertiesStatus",value:function o(){this._aSourcePropertiesFailure.clear();}},{key:"getRegisteredFailedRequests",value:function o(){return this._mFailedSideEffects;}},{key:"handleFieldChange",value:function A(E,o){var p=this;var y=this._getFieldProperties(E),I=this._initializeFieldSideEffects(y,o);var z=false;return this._generateImmediatePromise(y).then(function(){z=true;return Promise.all(I.map(function(B){return p.requestSideEffects(B.sideEffects,B.context);})||[]);}).catch(function(B){if(z){L.debug("Error while processing Field SideEffects",B);}else{I.filter(function(D){return D.previouslyFailed===true;}).forEach(function(D){return p._addFailedSideEffects(D.sideEffects,D.context);});}});}},{key:"handleFieldGroupChange",value:function z(E){var o=this,D=[],p=E.getParameter("fieldGroupIds");var y=function(A){var I=false;var B=A.sideEffectProperty;var G=B.context;var H=G.getPath();var J=o._oSideEffectsService.getEntityTypeFromContext(G);var K=o._getEntityTypeFromFQN(J);return Promise.all(A.promises).then(function(){I=true;if(K&&B.sideEffects.SourceProperties.every(function(M){if(M.type==="PropertyPath"){var N=o._generateStatusIndex(K,M.value,G);if(N){return!o._aSourcePropertiesFailure.has(N);}}return true;})){return o.requestSideEffects(B.sideEffects,B.context);}return null;}).catch(function(M){if(I){L.debug("Error while processing FieldGroup SideEffects on context "+H,M);}}).finally(function(){delete o._mFieldGroupQueue[B.name][H];});};p.forEach(function(A){var B;var G=A.replace("$$ImmediateRequest","");var H=(B=o._mFieldGroupQueue)===null||B===void 0?void 0:B[G];if(H){Object.keys(H).forEach(function(I){var J=H[I];if(!J.processStarted){J.processStarted=true;D.push(J);}});}});return Promise.all(D.map(function(A){return y(A);}));}},{key:"addControlSideEffects",value:function p(E,o){this._oSideEffectsService.addControlSideEffects(E,o);}},{key:"removeFailedSideEffects",value:function o(){this._mFailedSideEffects={};}},{key:"requestSideEffects",value:function D(o,p){var y=this;var R,z;var A=new Promise(function(E,G){R=E;z=G;});var T=(o.TargetEntities||[]).concat(o.TargetProperties||[]),B=o.TriggerAction;if(B){this._oSideEffectsService.executeAction(B,p);}this._oSideEffectsService.requestSideEffects(T,p).then(function(){return R();}).catch(function(E){y._addFailedSideEffects(o,p);z(E);});return A;}},{key:"removeControlSideEffects",value:function y(o){var p=o&&o.isA&&o.isA("sap.ui.base.ManagedObject")&&o.getId();if(p){this._oSideEffectsService.removeControlSideEffects(p);}}},{key:"_addFailedSideEffects",value:function z(o,p){var y=p.getPath();this._mFailedSideEffects[y]=this._mFailedSideEffects[y]||[];var I=this._mFailedSideEffects[y].every(function(A){return o.fullyQualifiedName!==A.fullyQualifiedName;});if(I){this._mFailedSideEffects[y].push(o);}}},{key:"_generateFieldGroupPromise",value:function y(E){var o=this;var p=true;return E.promise.then(function(){return p;}).catch(function(){p=false;return p;}).finally(function(){o._saveFieldPropertiesStatus(E.field,p);});}},{key:"_generateImmediatePromise",value:function o(E){var p=E.promise;return p.then(function(){var y=E.field;var z=y.getFieldHelp&&y.getFieldHelp();if(z){var A=sap.ui.getCore().byId(z);if(A){return Promise.all(A.getOutParameters().map(function(B){var D=B.getBinding("value");return D?D.requestValue():Promise.resolve();}));}}return Promise.all([]);});}},{key:"_generateStatusIndex",value:function A(E,p,o){var y=o.getPath();var z=E.resolvePath(p);if(z){if(z&&z._type==="Property"){return[z.fullyQualifiedName,y].join("__");}}return undefined;}},{key:"_getContextForSideEffects",value:function z(o,p){var B=o.getBindingContext();var y=B,E=this._oSideEffectsService.getEntityTypeFromContext(B);if(p!==E){y=B.getBinding().getContext();if(y){E=this._oSideEffectsService.getEntityTypeFromContext(y);if(p!==E){y=y.getBinding().getContext();if(y){E=this._oSideEffectsService.getEntityTypeFromContext(y);if(p!==E){return undefined;}}}}}return y||undefined;}},{key:"_getEntityTypeFromFQN",value:function p(o){var E=this._oSideEffectsService.getConvertedMetaModel().entityTypes.find(function(y){return y.fullyQualifiedName===o;});return E;}},{key:"_getFieldPromise",value:function o(E){var p=E.getParameter("promise")||Promise.resolve();return p.then(function(){var y=new Promise(function(z,A){if(!h(E).state.validity){A();}else{z(true);}});return y;});}},{key:"_getFieldProperties",value:function p(E){var o=E.getSource();return{promise:this._getFieldPromise(E),field:o,sideEffectsMap:this._getFieldSideEffectsMap(o)};}},{key:"_getFieldSideEffectsMap",value:function I(o){var p=this;var y={},z=o.getFieldGroupIds(),V=this._oView.getViewData().entitySet,A=this._oSideEffectsService.getConvertedMetaModel().entitySets.find(function(J){return J.name===V;});z.forEach(function(J){var K;var M=J.indexOf("$$ImmediateRequest")!==-1,N=J.replace("$$ImmediateRequest",""),Q=N.split("#"),R=Q[0],T=R+"@com.sap.vocabularies.Common.v1.SideEffects"+(Q.length===2?"#"+Q[1]:""),W=(K=p._oSideEffectsService.getODataEntitySideEffects(R))===null||K===void 0?void 0:K[T],E=p._getContextForSideEffects(o,R);if(W&&E){y[N]={name:N,immediate:M,sideEffects:W,context:E};}});if(V&&A){var B=A.entityType.fullyQualifiedName,D=o.getAggregation("customData").find(function(J){return J.getKey()==="sourcePath";}),E=this._getContextForSideEffects(o,B);if(D&&E){var G=D.getValue().replace("/"+V+"/",""),H=this._oSideEffectsService.getControlEntitySideEffects(B);Object.keys(H).forEach(function(J){var K=H[J];if(K.SourceProperties.includes(G)){var N=J+"::"+B;y[N]={name:N,immediate:true,sideEffects:K,context:E};}});}}return y;}},{key:"_initializeFieldSideEffects",value:function B(E,o){var p=this;var y=E.sideEffectsMap,z=this._generateFieldGroupPromise(E),A={},I=[];o=o||Promise.resolve();Object.keys(y).forEach(function(D){var G=y[D],H=G.context.getPath(),J=p._mFailedSideEffects[H];if(J){delete p._mFailedSideEffects[H];A[H]={};J.forEach(function(N){A[H][N.fullyQualifiedName]=true;I.push({name:D,previouslyFailed:true,sideEffects:N,context:G.context});});}if(G.immediate){var K;if(!((K=A[H])===null||K===void 0?void 0:K[G.sideEffects.fullyQualifiedName])){I.push({name:D,sideEffects:G.sideEffects,context:G.context});}}else{p._mFieldGroupQueue[D]=p._mFieldGroupQueue[D]||{};var M=p._mFieldGroupQueue[D][H]||{promises:[],sideEffectProperty:G,processStarted:false};M.promises=M.promises.concat([z,o]);p._mFieldGroupQueue[D][H]=M;}});return I;}},{key:"_saveFieldPropertiesStatus",value:function G(o,p){var y=this;var B=o.getBindingContext();var E=this._oSideEffectsService.getEntityTypeFromContext(B);var z=this._getEntityTypeFromFQN(E);if(z){var A=this._getBindingForField(o);var D=A.isA("sap.ui.model.CompositeBinding")?(A.getBindings()||[]).map(function(H){return H.sPath;}):[A.getPath()];D.forEach(function(H){var I=y._generateStatusIndex(z,H,B);if(I){y._aSourcePropertiesFailure[p?"delete":"add"](I);}});}}},{key:"_getBindingForField",value:function p(o){var B;if(o.isA("sap.m.CheckBox")){B=o.getBinding("selected");}else{B=o.getBinding("value");}return B;}}]);return S;}(C),(x(g.prototype,"onInit",[d],Object.getOwnPropertyDescriptor(g.prototype,"onInit"),g.prototype),x(g.prototype,"clearPropertiesStatus",[k,j],Object.getOwnPropertyDescriptor(g.prototype,"clearPropertiesStatus"),g.prototype),x(g.prototype,"getRegisteredFailedRequests",[k,j],Object.getOwnPropertyDescriptor(g.prototype,"getRegisteredFailedRequests"),g.prototype),x(g.prototype,"handleFieldChange",[k,j],Object.getOwnPropertyDescriptor(g.prototype,"handleFieldChange"),g.prototype),x(g.prototype,"handleFieldGroupChange",[k,j],Object.getOwnPropertyDescriptor(g.prototype,"handleFieldGroupChange"),g.prototype),x(g.prototype,"addControlSideEffects",[k,j],Object.getOwnPropertyDescriptor(g.prototype,"addControlSideEffects"),g.prototype),x(g.prototype,"removeFailedSideEffects",[k,j],Object.getOwnPropertyDescriptor(g.prototype,"removeFailedSideEffects"),g.prototype),x(g.prototype,"requestSideEffects",[k,j],Object.getOwnPropertyDescriptor(g.prototype,"requestSideEffects"),g.prototype),x(g.prototype,"removeControlSideEffects",[k,j],Object.getOwnPropertyDescriptor(g.prototype,"removeControlSideEffects"),g.prototype),x(g.prototype,"_addFailedSideEffects",[P,j],Object.getOwnPropertyDescriptor(g.prototype,"_addFailedSideEffects"),g.prototype),x(g.prototype,"_getContextForSideEffects",[P,j],Object.getOwnPropertyDescriptor(g.prototype,"_getContextForSideEffects"),g.prototype)),g))||f);return S;},false);