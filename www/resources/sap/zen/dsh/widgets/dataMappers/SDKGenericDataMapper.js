/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/base/Log","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/utils/BaseHandler","sap/zen/dsh/widgets/dataMappers/SDKChartDataMapper","sap/zen/dsh/widgets/charts/ChartException"],function(q,L,_,B,S,C){"use strict";L.info("Loaded SDKGenericDataMapper");function a(){S.apply(this,arguments);this.createAnalysisAxis=function(d){var e=new E(this,d,false);var b=new E(this,d,true);var r=e.toAnalysisAxisData();var f=b.toAnalysisAxisData();var h=[{"name":"","type":"Dimension","values":[""]}];var i=[];var j=g(this,d);if(!j.isAa1DimensionRequired){i=[];if(r.length){i.push({index:1,data:r});}if(f.length){i.push({index:i.length+1,data:f});}if(i.length===0){i=[{index:1,data:h}];}}else if(f.length===0&&this.getMeasureAxis()==="COLUMNS"){i=[{index:1,data:r.length?r:h}];}else{i=[{index:1,data:f.length?f:h}];if(r.length){i.push({index:2,data:r});}else if(j.isAa2DimensionRequired){i.push({index:2,data:h});}}return i;};this.createMeasureValues=function(d,b){var m=[];var u=this.getUtilsHelper();var e=this.indexOfMeasuresDimension(d.dimensions);var f=d.dimensions[e];var n=d.newChartOptionsProperties;var h=this;if(d.externalDimensions!==undefined&&this.indexOfMeasuresDimension(d.externalDimensions)!==-1){var j=d.externalDimensions[this.indexOfMeasuresDimension(d.externalDimensions)];m.push({type:"Measure",name:j.members[0].text,values:t(d.data.slice(0),b[0].data[0].values.length),key:j.members[0].key});}else if(d.data&&d.data.length>0&&f.isFake){m.push({type:"Measure",name:"",values:t(d.data.slice(0),b[0].data[0].values.length),key:""});}else{var k=c(d,f,e);var l=k.map(function(I){return I.key;});var o=u.allChartOptionsMeasures(n);for(var i=0;i<o.length;i++){if((q.inArray(o[i],l)<=-1)){throw new C(d.messages.feedingerror,"");}}k.forEach(function(I){m.push({type:"Measure",name:I.text,values:[],key:I.key,initialIndex:I.initialIndex});});var p=new E(this,d,false);var r=new E(this,d,true);var s=g(this,d);var v=0;d.data.forEach(function(I,i){var J=d.tuples[i];var K=p.getIndexOnAxis(J);var M=r.getIndexOnAxis(J);var N=J[e];var O=_.find(m,{"initialIndex":N});var P;if(r.isEmpty()&&h.getMeasureAxis()==="COLUMNS"){M=K;K=0;}else if(!s.isAa1DimensionRequired&&!p.isEmpty()){P=K;K=M;M=P;}O.values[K]=O.values[K]||[];O.values[K][M]=I;v=Math.max(v,O.values[K].length);});_.forEach(m,function(I){I.values=_.map(I.values,function(J){var K=J||[];for(var i=0;i<v;i++){if(K.length<=i){K.push(null);}else if(K[i]===undefined){K[i]=null;}}return K;});});}var w=u.getMetadataFeedsArray(d.cvomType,"Measure");var x=[];if(o&&!u.isChartFeedsEmpty(n)){for(i=0;i<o.length;i++){var y=q.inArray(o[i],l);x.push(m[y]);}if(x.length>0){m=x;}}var z=this.getMeasureAxis();var A=this.getMessages().chart_mapping_error+".";if(d.cvomType==="viz/scatter"&&m.length<2){if(z==="COLUMNS")throw new C(A,this.getMessages().scatter_datamapping_cmd);else throw new C(A,this.getMessages().scatter_datamapping_rmd);}if(d.cvomType==="viz/bubble"&&m.length<3){if(z==="COLUMNS")throw new C(A,this.getMessages().bubble_datamapping_cmd);else throw new C(A,this.getMessages().bubble_datamapping_rmd);}var D;if(d.dualAxis){var F;if(this.getMeasureAxis()=="COLUMNS"){var G=d.cvomType;if(G=="viz/dual_line")F=this.getMessages().dualline_datamapping_tmd;if(G=="viz/dual_column"||G=="viz/dual_combination")F=this.getMessages().dualcolumn_datamapping_tmd;if(G=="viz/dual_horizontal_combination")F=this.getMessages().dualhorizontal_datamapping_tmd;if(G=="viz/dual_bar")F=this.getMessages().dualbar_datamapping_tmd;}if((F!==undefined)&&(!d.newChartOptionsProperties||!d.newChartOptionsProperties.feeds)){throw new C(A,F);}D=d.dualAxis;}else if(d.newChartOptionsProperties&&d.newChartOptionsProperties.feeds){D=this.generateAxisMapping(d.newChartOptionsProperties.feeds,w);}var H=_.partial(_.omit,_,"initialIndex");m=_.map(m,H);if(D){return this.groupMeasureObjectsByAxisMapping(m,D,w);}else{return this.groupMeasureObjectsAutomatically(m,w);}};this.groupMeasureObjectsAutomatically=function(m,f){var b=[];for(var i=0;i<f.length;i++){var d=[];if(f.length!==i+1){while(m.length&&d.length<(f[i].min||1)){d.push(m.shift());}}else{while(m.length&&d.length<(f[i].max)){d.push(m.shift());}}b.push({index:i+1,data:d});}return b;};this.groupMeasureObjectsByAxisMapping=function(m,b,f){var d=[];for(var x=0;x<f.length;x++){d[f[x].mgIndex-1]={index:f[x].mgIndex,data:[]};}for(var i=0;i<b.length&&i<m.length;i++){var e=m[i];var h=b[i];if(typeof h!=="string"){h=h[1];}var j=h.slice(h.length-1);j=j-1;d[j].data.push({name:e.name,type:e.type,values:e.values});}return d;};this.indexOfMeasuresDimension=function(d){for(var i=0;i<d.length;i++){var b=d[i];if(b.containsMeasures===true){return i;}}return-1;};this.generateAxisMapping=function(b,f){var d=[];var e=[];for(var h in b){for(var i=0;i<b[h].length;i++){for(var j=0;j<f.length;j++){if(f[j].id==h||f[j].id==h.replace(/_/g,".")){e.push({index:f[j].mgIndex,axisArray:["stub","axis"+f[j].mgIndex,b[h][i]]});}}}}e=_.sortBy(e,"index");_.forEach(e,function(k){d.push(k.axisArray);});return d;};function c(d,m,b){var e=[];var f={},h;if(m.axis==="ROWS"){h=d.axis_rows;}else{h=d.axis_columns;}h.forEach(function(i){var j=m.members[i[b]];var k;if(!f[j.key]){k=_.clone(j);k.initialIndex=i[b];e.push(k);f[j.key]=true;}});return e;}function t(b,w){var s=[];while(b.length){s.push(b.splice(0,w));}return s;}function g(m,d){var b=m.getUtilsHelper().getMetadataFeedsArray(d.cvomType,"Dimension");var e;var f;for(var i=0;i<b.length;i++){if(b[i].aaIndex===1){e=b[i];}if(b[i].aaIndex===2){f=b[i];}if(e!==undefined&&f!==undefined){break;}}return{"isAa1DimensionRequired":!(e&&e.min===0),"isAa2DimensionRequired":f&&f.min>0};}function E(m,d,u){var b=u?d.axis_columns:d.axis_rows;var e=d.dimensions;var f=m.indexOfMeasuresDimension(e);var h=[];var j=[];if(b.length){_.forEach(b[0],function(v,i){if(v!=-1&&i!=f){j.push(i);}});}var r=_.map(b,s);h=_.uniq(h);if(h.length&&r.length&&r[0].length){var k={};_.forEach(r,function(i){var v=_.map(i,"dimensionIndex");k[v]=k[v]||[];k[v].push(i[0].measureIndex);});_.forEach(k,function(i,v){var w=_.difference(h,i);_.forEach(w,function(x){l(v,x);});});}r=_.uniq(r,false,function(i){var v=_.map(i,"value");return v.toString();});this.toAnalysisAxisData=function(){var d=[];_.forEach(r,function(v){_.forEach(v,function(w,i){d[i]=d[i]||{"type":"Dimension","name":w.name,"values":[]};d[i].values.push(w.dimensionValue.text);});});return d;};this.getIndexOnAxis=function(v){var w=s(v);var x=-1;for(var i=0;i<r.length&&x===-1;i++){if(o(w,r[i])){x=i;}}return x;};this.isEmpty=function(){return!r.length||!r[0].length;};function l(i,v){var w=[];_.forEach(i,function(x){w.push(n(null,x,v));});}function n(i,v,w){return{"dimensionIndex":v,"dimensionValue":e[v].members[i],"measureIndex":w,"name":e[v].text,"value":i};}function o(i,v){return i&&v&&p(i,v)===0;}function p(v,w){var x=0;for(var i=0;i<v.length&&x===0;i++){if(v[i].value<w[i].value){x=-1;}else if(v[i].value>w[i].value){x=1;}}return x;}function s(v){var w=v[f];if(w>=0){h.push(w);}return _.chain(v).map(function(x,i){return n(x,i,w);}).filter(function(x,i){return _.includes(j,i);}).value();}}}return a;});
