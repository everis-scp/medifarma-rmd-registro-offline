/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/utils/BaseHandler","sap/zen/dsh/widgets/datasource","sap/zen/dsh/widgets/component"],function(q,_,B,D,C){"use strict";var c=function(p,d){D.call(this,p);var e={data:[],formattedData:[],tuples:[],axis_columns:[],axis_rows:[],dimensions:[]};var t=this;if(d){this.buffer=d;this.buffer.formattedData=this.buffer.formattedData||this.buffer.data;}else{this.buffer=q.extend({},e);}this.projectData=function(S,O){var a,b,x,i;if(Array.isArray(S)){a=S;}else{a=this.getIndexSelection(S);}var j={};O=O||{};if(O.allDataOnEmptySelection===false&&h(a)){return undefined;}if(O.selectionShape!==undefined){var m=g(a);if(m>O.selectionShape){return undefined;}}if(O.includeData||O.includeFormattedData||O.includeTuples||O.includeAxesTuples||O.includeConditionalFormats){j.selection=n(a);if(O.includeData){j.data=[];}if(O.includeFormattedData&&this.buffer.formattedData){j.formattedData=[];}if(O.includeTuples){j.tuples=[];}if(O.includeAxesTuples){j.axis_columns=[];j.axis_rows=[];}if(O.includeConditionalFormats&&this.buffer.conditionalFormatValues){j.conditionalFormatValues=[];}var N=this.fillIndex(this.buffer.axis_columns,a,O);var P=this.fillIndex(this.buffer.axis_rows,a,O);j.columnCount=N.length;j.rowCount=P.length;for(var Q=0;Q<P.length;Q++){var y=P[Q];var R=this.buffer.axis_rows[y];if(j.axis_rows){j.axis_rows.push(R);}for(b=0;b<N.length;b++){x=N[b];i=this.buffer.axis_columns[x];var T=this.buffer.axis_columns.length*y+x;var U=E(i,R);this.addResult(j,T,U);}}if(j.axis_columns){for(b=0;b<N.length;b++){x=N[b];i=this.buffer.axis_columns[x];j.axis_columns.push(i);}}}j.dimensions=this.buffer.dimensions;if(this.buffer.externalDimensions){j.externalDimensions=this.buffer.externalDimensions;}j.locale="en";return j;};this.addResult=function(a,i,b){if(a.data){a.data.push(this.buffer.data[i]);}if(a.formattedData){a.formattedData.push(this.buffer.formattedData[i]);}if(a.tuples){a.tuples.push(b);}if(a.conditionalFormatValues){a.conditionalFormatValues.push(this.buffer.conditionalFormatValues[i]);}};this.fillIndex=function(a,S,O){var b=[];var j=null;var m=o(t.buffer.dimensions.length,0);a.forEach(function(x,i){j=u(m,j,x);if(t.tupleMatches(x,S,O,m)){b.push(i);}});return b;};this.tupleMatches=function(T,S,O,a){a=a||[];for(var i=0;i<T.length;i++){var b=S[i];var m=T[i];if(b&&m!==-1){if(!f(b,m,a[i])){return false;}}if((m!==-1&&this.buffer.dimensions[i].members[m].type==="RESULT")&&((b===false)||(O&&!O.includeResults))){return false;}}return true;};function f(a,m,i){for(var j=0;j<a.length;j++){var b=a[j];if(b<0){if(i===(b+1)*-1)return true;}else{if(b===m){return true;}}}return false;}function u(a,b,j){if(b){for(var i=0;i<j.length;i++){if(b[i]!==j[i]){r(a,0,i+1);a[i]=a[i]+1;break;}}}return j;}function g(i){var a={};var b={};t.buffer.dimensions.forEach(function(j,m){if(i[m]!=null){a[j.axis]=j.axis;}else{b[j.axis]=j.axis;}});return Object.keys(b).length;}this.getIndexSelection=function(S){var a=o(t.buffer.dimensions.length,undefined);k(S,a);k(this.filters(),a);return a;};function h(a){for(var i=0;i<a.length;i++){if(a[i]!==undefined)return false;}return true;}function k(S,a){for(var b in S){if(Object.prototype.hasOwnProperty.call(S,b)){var i=s(b);if(i>=0){if(S[b]==="*")a[i]=null;else if(S[b]==="?")a[i]=false;else{var j=v(t.buffer.dimensions[i],S[b]);if(j.length>0){a[i]=l(j,a[i]);}}}}}}function l(a,b){if(b){var i=[];while(a.length>0&&b.length>0){if(a[0]<b[0]){a.shift();}else if(a[0]>b[0]){b.shift();}else{i.push(a.shift());b.shift();}}return i;}return a;}function n(a){var R=[];for(var i=0;i<a.length;i++){var b=a[i];if(b&&b.length===1){R.push(b[0]);}else{R.push(-1);}}return R;}function o(a,b){var R=[];for(var i=0;i<a;i++){R.push(b);}return R;}function r(a,b,S){for(var i=S;i<a.length;i++){a[i]=b;}}function s(a){var b=t.buffer.dimensions;for(var i=0;i<t.buffer.dimensions.length;i++){if(a===b[i].key){return i;}if((a==="(MEASURES_DIMENSION)")&&b[i].containsMeasures){return i;}}return-1;}function v(a,b){var j=[];if(typeof(b)==="number"){return[0-b-1];}else if(b instanceof Array){for(var i=0;i<b.length;i++){j=j.concat(v(a,b[i]));}}else if(typeof(b)==="string"){var m=w(a,b);if(m>=0){j.push(m);}}return j;}function w(a,m){var b=a.members;for(var i=0;i<b.length;i++){if(m===b[i].key){return i;}if(m==="(RESULT_MEMBER)"&&b[i].type==="RESULT"){return i;}}return-1;}this.fetchData=function(S,O){return this.projectData(S,O);};this.metadata=function(a){if(a===undefined){return JSON.stringify({dimensions:t.buffer.dimensions,externalDimensions:t.buffer.externalDimensions});}};this.getBuffer=function(){return t.buffer;};this.defineDimensions=function(a,b){a.forEach(function(i){if(i.members===undefined){i.members=[];}});t.buffer.dimensions=a;if(b){t.buffer.externalDimensions=[b];}};this.clear=function(b){t.buffer.data=[];t.buffer.formattedData=[];t.buffer.tuples=[];t.buffer.axis_columns=[];t.buffer.axis_rows=[];if(b){t.buffer.dimensions.forEach(function(a){a.members=[];});}};this.setDataCell=function(a,b){if(a.length!==t.buffer.dimensions.length){throw"setDataCell call with "+a.length+" coodinates, but expected "+t.buffer.dimensions.length;}var j=[];for(var i=0;i<a.length;i++){var m=a[i];if(typeof(m)!=="number"){m=G(i,m);}j.push(m);}var x=A(j);var y=z(t.buffer.axis_columns,x.col_tuple);var R=z(t.buffer.axis_rows,x.row_tuple);var N=R*t.buffer.axis_columns.length+y;if(N>t.buffer.data.length){throw"Can only change existing cells or append and the end of last line.";}t.buffer.axis_columns[y]=x.col_tuple;t.buffer.axis_rows[R]=x.row_tuple;var O=t.buffer.data[N]===undefined;if(O){H(a,j);var P=0.0;var Q="";if(b===null){Q=null;P=null;}else if(typeof(b)==="string"){Q=F(b);P=parseFloat(b);}else if(typeof(b)==="number"){Q=b+"";P=b;}t.buffer.data[N]=P;t.buffer.formattedData[N]=Q;}else{if(typeof(b)==="number"){t.buffer.data[N]=b;}else{t.buffer.formattedData[N]=b;}}};function z(a,b){for(var i=0;i<a.length;i++){if(_.isEqual(a[i],b)){return i;}}return i;}function A(a){var b=a.slice();var j=a.slice();for(var i=0;i<t.buffer.dimensions.length;i++){var m=t.buffer.dimensions[i];if(m.axis==="COLUMNS"){b[i]=-1;}else{j[i]=-1;}}return{row_tuple:b,col_tuple:j};}function E(a,b){var j=[];for(var i=0;i<a.length;i++){if(a[i]>-1){j.push(a[i]);}else{j.push(b[i]);}}return j;}function F(a){return String(a).replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/"/g,"&#39;").replace(/</g,"&lt;").replace(/>/g,"&gt;");}function G(a,b){var j=t.buffer.dimensions[a];var x=j.members;for(var i=0;i<x.length;i++){var m=x[i];if(m.key===b){return i;}}return x.length;}function H(a,T){for(var i=0;i<a.length;i++){var m=t.buffer.dimensions[i].members;var b=T[i];if(m[b]===undefined){var j=a[i]+"";m[b]={key:j,text:F(j)};}}}this.fillWithArray=function(a,b,i){this.clear(true);var m=0;var j=0;var N=a[0].length;var R=a.length;var O;var P;if(b){j=1;}if(i){m=1;}if(b){O=L(a,m);}else{O=J(N);}if(i){P=M(a,j);}else{P=I(R);}for(var y=j;y<R;y++){for(var x=m;x<N;x++){this.setDataCell([O[x],P[y]],a[y][x]);}}};function I(a){var b=[];for(var i=0;i<a;i++){b.push(""+(i+1));}return b;}function J(a){var b=[];for(var i=0;i<a;i++){b.push(K(i));}return b;}function K(V){var a="0".charCodeAt(0);var b="A".charCodeAt(0);var j=V.toString(26).toUpperCase();var m="";for(var i=0;i<j.length;i++){var x=j.charCodeAt(i);var y=((j.length>1)&&(i==0))?-1:0;var N;if(x<b){N=x-a+b+y;}else{N=x-b+b+10+y;}m+=String.fromCharCode(N);}return m;}function L(a,m){var b=[];for(var i=0;i<a[0].length;i++){if(i<m){b.push("");}else{b.push(a[0][i]);}}return b;}function M(a,m){var b=[];for(var i=0;i<a.length;i++){if(i<m){b.push("");}else{b.push(a[i][0]);}}return b;}this.testaccess={getDimIndex:s,getSelectionShape:g,intersectArray:l,createAxisTuples:A,findAxisTuple:z,tupleMatches:this.tupleMatches.bind(this),fillIndex:this.fillIndex,mergeAxisTuples:E,isIndexSelectionEmpty:h,updateIndexeForIndexAccess:u};};c.subclass=C.makeSubClass(c);return c;});