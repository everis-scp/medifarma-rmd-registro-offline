/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";var U={};U.applyChange=function(c,g,p){var m=p.modifier;var P;var f=[];return Promise.resolve().then(m.getAggregation.bind(m,g,"elements")).then(function(a){f=a;return f.reduce(function(b,F){return b.then(function(v){return v||m.getVisible(F);});},Promise.resolve(false));}).then(function(i){P=i;if(!P){f.forEach(function(F){m.setVisible(F,true);});}return m.getAggregation(g,"label");}).then(function(l){var v=false;if(l&&(typeof l!=="string")){m.setVisible(l,true);v=true;}m.setVisible(g,true);c.setRevertData({partiallyVisible:P,visibleLabel:v});});};U.completeChangeContent=function(c,s){var C=c.getDefinition();if(!C.content){C.content={};}};U.revertChange=function(c,g,p){var m=p.modifier;var r=c.getRevertData();return Promise.resolve().then(m.getAggregation.bind(m,g,"elements")).then(function(f){if(!r.partiallyVisible){f.forEach(function(F){m.setVisible(F,false);});}if(r.visibleLabel){return Promise.resolve().then(m.getAggregation.bind(m,g,"label")).then(function(l){m.setVisible(l,false);});}}).then(function(){m.setVisible(g,false);c.resetRevertData();});};U.getCondenserInfo=function(c){return{affectedControl:c.getSelector(),classification:sap.ui.fl.condenser.Classification.Reverse,uniqueKey:"visible"};};return U;},true);
