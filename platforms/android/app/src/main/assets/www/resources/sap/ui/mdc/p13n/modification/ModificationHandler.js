/*
* ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/base/Object","sap/base/util/merge","sap/ui/core/util/reflection/JsControlTreeModifier"],function(B,m,J){"use strict";var M;var a=B.extend("sap.ui.mdc.p13n.modification.ModificationHandler");a.prototype.processChanges=function(c,o){return Promise.resolve();};a.prototype.waitForChanges=function(p,o){return Promise.resolve();};a.prototype.reset=function(p,o){return Promise.resolve();};a.prototype.isModificationSupported=function(p,o){return false;};a.prototype.enhanceConfig=function(c,o){var p=o.propertyBag;var b=p?p.modifier:J;var P=o.name;var C=o.controlMeta;var A=C.aggregation;var s=C.property;var v=o.value;var d;var e;var x;return Promise.resolve().then(b.getControlMetadata.bind(b,c)).then(function(r){d=r;e=A?A:d.getDefaultAggregation().name;return b.getAggregation(c,"customData");}).then(function(f){return f.find(function(g){return Promise.resolve().then(b.getProperty.bind(b,g,"key")).then(function(k){return k=="xConfig";});});}).then(function(r){x=r;if(x){return b.getProperty(x,"value");}return{aggregations:{}};}).then(function(f){if(!f.aggregations.hasOwnProperty(e)){if(d.hasAggregation(e)){f.aggregations[e]={};}else{throw new Error("The aggregation "+e+" does not exist for"+c);}}if(!f.aggregations.hasOwnProperty(P)){f.aggregations[e][P]={};}if(v!==null){f.aggregations[e][P][s]=v;}else{delete f.aggregations[e][P][s];if(Object.keys(f.aggregations[e][P]).length===0){delete f.aggregations[e][P];if(Object.keys(f.aggregations[e]).length===0){delete f.aggregations[e];}}}var g=p?p.appComponent:undefined;if(!x){return Promise.resolve().then(b.createAndAddCustomData.bind(b,c,"xConfig",f,g)).then(function(){return f;});}else{b.setProperty(x,"value",f);return f;}});};a.prototype.readConfig=function(c,o){var C,A;if(o){var b=o.propertyBag?o.propertyBag.modifier:J;return Promise.resolve().then(b.getAggregation.bind(b,c,"customData")).then(function(d){return d.find(function(e){return Promise.resolve().then(b.getProperty.bind(b,e,"key")).then(function(k){return k=="xConfig";});});}).then(function(A){if(A){return Promise.resolve().then(b.getProperty.bind(b,A,"value")).then(function(v){return m({},v);});}return null;});}var g=function(p,s){var f=function(c,s){if(c){if(c.getMetadata){var e=c.getMetadata();var h=e.getAllAggregations();if(h){return h[s];}}}return undefined;};var d=f(p,s);if(d){return p[d._sGetter]();}return undefined;};var G=function(c,p){var d=c.getMetadata().getPropertyLikeSetting(p);if(d){var P=d._sGetter;return c[P]();}return undefined;};A=g(c,"customData").find(function(d){return G(d,"key")=="xConfig";});C=A?m({},G(A,"value")):null;return C;};a.getInstance=function(){if(!M){M=new a();}return M;};return a;});