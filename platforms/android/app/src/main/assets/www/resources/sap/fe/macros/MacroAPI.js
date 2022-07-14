/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/ClassSupport","sap/ui/core/Control","sap/base/util/merge","sap/base/util/uid","sap/fe/macros/PhantomUtil","sap/ui/core/util/XMLPreprocessor","sap/fe/core/converters/ConverterContext"],function(C,a,m,u,P,X,b){"use strict";var _,c,d,f,g,h,j,k,l,n,q;var r=C.Property;var A=C.Aggregation;var s=C.APIClass;function t(e,p,i,o){if(!i)return;Object.defineProperty(e,p,{enumerable:i.enumerable,configurable:i.configurable,writable:i.writable,value:i.initializer?i.initializer.call(o):void 0});}function v(i,e){if(!(i instanceof e)){throw new TypeError("Cannot call a class as a function");}}function w(e,p){for(var i=0;i<p.length;i++){var o=p[i];o.enumerable=o.enumerable||false;o.configurable=true;if("value"in o)o.writable=true;Object.defineProperty(e,o.key,o);}}function x(e,p,i){if(p)w(e.prototype,p);if(i)w(e,i);return e;}function y(e,p,i){if(typeof Reflect!=="undefined"&&Reflect.get){y=Reflect.get;}else{y=function y(e,p,i){var o=z(e,p);if(!o)return;var N=Object.getOwnPropertyDescriptor(o,p);if(N.get){return N.get.call(i);}return N.value;};}return y(e,p,i||e);}function z(o,p){while(!Object.prototype.hasOwnProperty.call(o,p)){o=I(o);if(o===null)break;}return o;}function B(e,i){if(typeof i!=="function"&&i!==null){throw new TypeError("Super expression must either be null or a function");}e.prototype=Object.create(i&&i.prototype,{constructor:{value:e,writable:true,configurable:true}});if(i)D(e,i);}function D(o,p){D=Object.setPrototypeOf||function D(o,p){o.__proto__=p;return o;};return D(o,p);}function E(e){return function(){var S=I(e),i;if(H()){var N=I(this).constructor;i=Reflect.construct(S,arguments,N);}else{i=S.apply(this,arguments);}return F(this,i);};}function F(e,i){if(i&&(typeof i==="object"||typeof i==="function")){return i;}return G(e);}function G(e){if(e===void 0){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return e;}function H(){if(typeof Reflect==="undefined"||!Reflect.construct)return false;if(Reflect.construct.sham)return false;if(typeof Proxy==="function")return true;try{Date.prototype.toString.call(Reflect.construct(Date,[],function(){}));return true;}catch(e){return false;}}function I(o){I=Object.setPrototypeOf?Object.getPrototypeOf:function I(o){return o.__proto__||Object.getPrototypeOf(o);};return I(o);}function J(o,e,i){if(e in o){Object.defineProperty(o,e,{value:i,enumerable:true,configurable:true,writable:true});}else{o[e]=i;}return o;}function K(e,p,i,o,N){var O={};Object.keys(o).forEach(function(Q){O[Q]=o[Q];});O.enumerable=!!O.enumerable;O.configurable=!!O.configurable;if('value'in O||O.initializer){O.writable=true;}O=i.slice().reverse().reduce(function(O,Q){return Q(e,p,O)||O;},O);if(N&&O.initializer!==void 0){O.value=O.initializer?O.initializer.call(N):void 0;O.initializer=undefined;}if(O.initializer===void 0){Object.defineProperty(e,p,O);O=null;}return O;}function L(e,i){throw new Error('Decorating class property failed. Please ensure that '+'proposal-class-properties is enabled and runs after the decorators transform.');}var M=(_=s("sap.fe.macros.MacroAPI"),c=r({type:"string"}),d=r({type:"string"}),f=A({type:"sap.ui.core.Control",multiple:false,isDefault:true}),_(g=(h=(q=n=function(e){B(M,e);var i=E(M);function M(S){var o;v(this,M);for(var p=arguments.length,N=new Array(p>1?p-1:0),O=1;O<p;O++){N[O-1]=arguments[O];}o=i.call.apply(i,[this,S].concat(N));t(G(o),"contextPath",j,G(o));t(G(o),"metaPath",k,G(o));t(G(o),"content",l,G(o));J(G(o),"modelResolved",false);M.registerInstance(G(o));return o;}x(M,[{key:"rerender",value:function o(){this.content.rerender();}},{key:"getDomRef",value:function p(){var o=this.content;return o?o.getDomRef():y(I(M.prototype),"getDomRef",this).call(this);}},{key:"getController",value:function o(){return this.getModel("$view").getObject().getController();}},{key:"propagateProperties",value:function O(N){var o=this;y(I(M.prototype),"propagateProperties",this).call(this,N);if(this.metadata.macroContexts&&!this.modelResolved){var p=this.getModel("_pageModel");if(p){Object.keys(this.metadata.macroContexts).forEach(function(Q){o[Q]=p.getObject(o[Q]);});this.modelResolved=true;}}}}],[{key:"registerInstance",value:function p(o){if(!this.instanceMap.get(o.constructor)){this.instanceMap.set(o.constructor,[]);}this.instanceMap.get(o.constructor).push(o);}},{key:"getAPI",value:function N(o){var S=o.getSource();while(S&&!S.isA("sap.fe.macros.MacroAPI")&&S.getParent){S=S.getParent();}if(!S||!S.isA("sap.fe.macros.MacroAPI")){var p=this.instanceMap.get(this);S=p[p.length-1];}return S&&S.isA("sap.fe.macros.MacroAPI")&&S;}},{key:"setDefaultValue",value:function N(p,o,O){if(p[o]===undefined){p[o]=O;}}},{key:"register",value:function o(){P.register(this);}},{key:"unregister",value:function o(){X.plugIn(null,this.namespace,this.macroName);}}]);return M;}(a),J(n,"namespace","sap.fe.macros"),J(n,"macroName","Macro"),J(n,"fragment","sap.fe.macros.Macro"),J(n,"hasValidation",true),J(n,"instanceMap",new WeakMap()),J(n,"getConverterContext",function(o,e,S){var i=S.appComponent;var p=S.models.viewData&&S.models.viewData.getData();var N=b.createConverterContextForMacro(o.startingEntitySet.name,S.models.metaModel,i&&i.getDiagnostics(),m,o.contextLocation,p);return N;}),J(n,"createBindingContext",function(o,S){var e="/"+u();S.models.converterContext.setProperty(e,o);return S.models.converterContext.createBindingContext(e);}),q),(j=K(h.prototype,"contextPath",[c],{configurable:true,enumerable:true,writable:true,initializer:null}),k=K(h.prototype,"metaPath",[d],{configurable:true,enumerable:true,writable:true,initializer:null}),l=K(h.prototype,"content",[f],{configurable:true,enumerable:true,writable:true,initializer:null})),h))||g);return M;},false);