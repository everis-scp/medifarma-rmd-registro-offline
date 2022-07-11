/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/base/Log","sap/ui/model/Model","sap/ui/integration/util/BindingHelper","sap/base/util/extend"],function(M,L,a,B,e){"use strict";var S=M.extend("sap.ui.integration.util.SimpleControl",{metadata:{library:"sap.ui.integration",properties:{resolved:{type:"any"}}}});var s=new S();var b={};function p(v,m,P,c,i){if(c===i){L.warning("BindingResolver maximum level processing reached. Please check for circular dependencies.");return v;}if(Array.isArray(v)){return v.map(function(I){return p(I,m,P,c+1,i);});}if(v&&typeof v==="object"&&!b.isBindingInfo(v)){var n={};for(var d in v){n[d]=p(v[d],m,P,c+1,i);}return n;}if(typeof v==="string"||(typeof v==="object"&&b.isBindingInfo(v))){return r(v,m,P);}return v;}function r(v,m,P){if(!v){return v;}var o=typeof v==="string"?M.bindingParser(v):e({},v);if(!o){return v;}if(!P){P="/";}if(m instanceof a){s.setModel(m);}else{B.propagateModels(m,s);}s.bindObject(P);s.bindProperty("resolved",o);var V=s.getResolved();s.unbindProperty("resolved");s.unbindObject();s.setModel(null);return V;}b.resolveValue=function(v,m,P){var c=0,i=30;if(m){return p(v,m,P,c,i);}else{return v;}};b.isBindingInfo=function(o){if(!o){return false;}return o.hasOwnProperty("path")||(o.hasOwnProperty("parts")&&(o.hasOwnProperty("formatter")||o.hasOwnProperty("binding")));};return b;});
