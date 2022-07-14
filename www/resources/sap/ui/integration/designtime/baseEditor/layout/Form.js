/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/util/hasTag","sap/base/util/restricted/_omit"],function(h,_){"use strict";var d={labelSpanXL:4,labelSpanL:4,labelSpanM:4,labelSpanS:12,adjustLabelSpan:false,columnsXL:1,columnsL:1,columnsM:1,singleContainerFullSize:false};function c(P){return{label:P.label,value:P.value,config:_(P,["label","value"])};}function g(C,t){var r=[];var i=0;while(i<C.length){var m=C[i];if(h(m,t)){r.push(m);C.splice(i,1);}else{i++;}}return r;}function a(C,P){var i=C.findIndex(function(m){return m.__propertyName===P;});if(i>-1){return C.splice(i,1)[0];}}function b(C){return C.some(function(G){return typeof G.config.visible==="boolean"?G.config.visible:true;});}function p(P,l){l=l||{};var C=P.slice();var G=l.groups||[];var r=l.responsiveGridLayout||d;var R=l.renderLabels!==false;var v={responsiveGridLayout:r};if(!R){C=C.map(function(m){return _(m,"label");});}if(G.length>0){v.groups=G.map(function(m){var i=[];m.items.forEach(function(I){switch(I.type){case"tag":i=i.concat(g(C,I.value).map(function(f){return c(f);}));break;case"propertyName":var e=a(C,I.value);if(e){i=i.concat(c(e));}break;}});return{label:m.label,items:i,visible:b(i)};});}else{var i=C.splice(0,C.length).map(c);v.groups=[{items:i,visible:b(i)}];}v.groups=v.groups.filter(function(m){return m.items.length>0;});v.count=P.length-C.length;return v;}return{prepareData:p,updateDependencies:["visible","tags"]};});