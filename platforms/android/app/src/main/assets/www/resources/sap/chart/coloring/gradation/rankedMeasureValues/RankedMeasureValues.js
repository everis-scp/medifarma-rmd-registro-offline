/*!
 * SAPUI5

(c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(['sap/chart/coloring/ColoringUtils','sap/chart/coloring/gradation/rankedMeasureValues/RankedMeasureUtils','sap/chart/ChartLog',"sap/ui/thirdparty/jquery"],function(C,R,a,q){"use strict";var b={};var S=["SingleColorScheme","DivergingColorScheme","TargetColorScheme"];var v=function(r,A,d,o){if(!o.bMBC){throw new a('error','colorings.Gradation','"RankedMeasureValues" only applys to Heatmap.');}C.checkColoringMeasure(A,d.aMsr,r);A.forEach(function(m){var V=Object.keys(r[m]).filter(function(k){return S.indexOf(k)>-1;});if(V.length>1){throw new a('error','colorings.Gradation.RankedMeasureValues','One and only one of "'+S.join('" or "')+'" can be applied to the measure, '+m+'.');}else{var t=V[0]||S[0];if(R[t].validate){R[t].validate(r,m);}}});};b.qualify=function(r,A,d,o){v(r,A,d,o);var c=[],s=d.aDim.map(function(D){return D.getName();}).sort();q.each(r,function(m,e){if(A.length&&A.indexOf(m)===-1){return;}var M=C.find(m,d.aMsr);if(Object.keys(e).length===0){e['SingleColorScheme']={};}Object.keys(e).forEach(function(k){if(S.indexOf(k)===-1){return;}c.sMethod=k;var f=null,g=null;var h=Array.isArray(e[k].RankingPerAggregationLevel)?e[k].RankingPerAggregationLevel:[];h.forEach(function(i){if(i&&i.VisibleDimensions){if(Array.isArray(i.VisibleDimensions)&&i.VisibleDimensions.sort().join(",")===s.join(",")){f=i;}}else{g=i;}});f=f||g;if(f||(h.length===0&&k==='SingleColorScheme')){if(R[k].levels){R[k].levels(r,m,f);}c.push({type:k,msr:M,settings:e,byAggregation:o.bFiltered?null:f});}else{throw new a("error",'colorings.Gradation.RankedMeasureValues','No aggregation level in "'+k+'" of the measure, '+m+',  matched with current visible dimensions.');}});});return c;};b.parse=function(c){var p={msr:c.msr,legend:{}};R[c.type].parse(c,p);return p;};b.createScales=function(c){return R[c.sMethod].createScales(c);};b.getContextHandler=function(c){var o=c[0];var m=o.msr.getName();var l=o.parsed.legend;return function(d){var V=d.getProperty(m);l.min=Math.min(l.min,V);l.max=Math.max(l.max,V);};};return b;});
