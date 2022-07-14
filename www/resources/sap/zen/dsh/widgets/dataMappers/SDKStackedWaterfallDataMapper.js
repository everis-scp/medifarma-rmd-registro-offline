/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/utils/BaseHandler","sap/zen/dsh/widgets/dataMappers/SDKChartDataMapper","sap/zen/dsh/widgets/charts/ChartException"],function(q,_,B,S,C){"use strict";function a(){S.apply(this,arguments);var m=true;var d=0;var b=false;this.getAnalysisAxisValue=function(){return this.analysisAxisValue;};this.createAnalysisAxis=function(c,r,e,f,g){var h=[];var i=this.getDataMapperHelper();if(this.getMeasureAxis()=="COLUMNS")g++;f++;if(this.isMeasuresOnlyCheck(c)){if(this.getMeasureAxis()=="ROWS"){i.setMeasuresOnAxis(2,c,h,true);i.setMeasuresOnAxis(1,c,h,false);d=1;}else{i.setMeasuresOnAxis(1,c,h,false);i.setMeasuresOnAxis(2,c,h,true);d=1;}}else if(this.getMeasureAxis()=="ROWS"&&f>0&&g>0){this.setDimensionsOnAxis(2,c,h,"ROWS",f,c.axis_rows,true);this.setDimensionsOnAxis(1,c,h,"COLUMNS",g,c.axis_columns,true);d=this.getIDimensionOnCols(c,h,1);b=true;}else if(this.getMeasureAxis()=="COLUMNS"&&f>0&&g>0){this.setDimensionsOnAxis(1,c,h,"ROWS",f,c.axis_rows,true);this.setDimensionsOnAxis(2,c,h,"COLUMNS",g,c.axis_columns,true);d=this.getIDimensionOnCols(c,h,0);b=true;}else{if(this.getMeasureAxis()=="ROWS"){this.setDimensionsOnAxis(2,c,h,"ROWS",f,c.axis_rows,false);this.setDimensionsOnAxis(1,c,h,"COLUMNS",g,c.axis_columns,true);}else{this.setDimensionsOnAxis(1,c,h,"ROWS",f,c.axis_rows,true);this.setDimensionsOnAxis(2,c,h,"COLUMNS",g,c.axis_columns,false);}}if(this.getMeasureAxis()=="COLUMNS"&&c.dimensions[0].containsMeasures){m=false;if(h[0].data[0]!=undefined)d=h[0].data[0].values.length;else d=1;}return h;};this.getIDimensionOnCols=function(c,e,t){var D=0;for(var i=0;i<c.dimensions.length;i++){var f=c.dimensions[i];if(f.containsMeasures==true){D=e[t].data[0].values.length;}}return D;};this.setDimensionsOnAxis=function(c,e,f,k,g,h,l){var n={};var o=[];n.index=c;n.data=[];var p=-1;var s=0;var t=-1;q.each(h,function(i,w){if(t==-1||w[s]==t){q.each(w,function(j,x){if(x!=-1&&(!e.dimensions[j].containsMeasures&&l)){if(t!=-1&&t)if(p==-1)p=j;if(o[j-p]==undefined)o[j-p]=[];o[j-p].push(e.dimensions[j].members[x].text);}else if(e.dimensions[j].containsMeasures&&t==-1){s=j;t=x;}});}});for(var r=0;r<e.dimensions.length;r++){var u=e.dimensions[r];if((u.containsMeasures&&!l)||u.axis!=k){continue;}if(!u.containsMeasures){var v={};v.name=u.text;v.type="Dimension";v.values=o[r-p];n.data.push(v);}}this.setEmptyDimension(c,k,n);f.push(n);};this.isMeasuresOnlyCheck=function(c){if(c.dimensions.length==1){if(c.dimensions[0].containsMeasures==true){return true;}}return false;};this.createMeasureValues=function(c,e,f,g){var h=[];var j={};j.index=1;j.data=[];var k={};var l=0;var v=[];v=this.getValues(c.data,f,l,false,d,m,b,g);k.type="Measure";for(var i=0;i<c.dimensions.length;i++){var n=c.dimensions[i];if(n.containsMeasures){if(c.dimensions.length===1&&c.dimensions[0].containsMeasures){k.name="";}else{k.name=c.dimensions[i].members[0].text;}}}k.values=v;j.data.push(k);h.push(j);return h;};this.setEmptyDimension=function(i,k,c){if(k=="COLUMNS"&&this._getColDimensionCounter()==0){var e={};e.name="";e.type="Dimension";e.values=[""];c.data.push(e);}else if(k=="ROWS"&&this._getRowDimensionCounter()==0){e={};e.name="";e.type="Dimension";e.values=[""];c.data.push(e);}};this.getValues=function(c,e,i,o,d,m,b,f){var v=[];if(e=="ROWS"){if(b){v=this.getAllRowValuesInArray(c,i,d,o,m,f);}else{v.push(c);}}else if(e=="COLUMNS"){if(o)v=this.getFirstMeasureColValuesInArray(c,i,d);else if(b){v=this.getAllColValuesInArray(c,i,d,o,m,f);}else{v.push(c);}}return v;};this.getAllRowValuesInArray=function(e,i,d,o,m,f){var v=[];var g=[];var s=e.length/this.getMeasureCounter()*i;var h=d;var j=d*i;if(!o)h=e.length;var k=0;if(!m){for(var c=s;c<h;++c){k++;var l=e[c]+"";g.push(parseFloat(l.replace(/,/g,"")));if(d==0||k==d){v.push(g);k=0;g=[];}}}else{var n=f>1?this.getMeasureCounter():1;var p=0;for(c=s;c<h/this.getMeasureCounter();++c){k++;l=e[j+((n*d)*p)]+"";g.push(parseFloat(l.replace(/,/g,"")));if(d==0||k==d){v.push(g);k=0;g=[];p++;j=0;}else{j++;}}}return v;};this.getFirstMeasureColValuesInArray=function(c,i,d){var v=[];var e=[];var f=0;for(var r=0;r<d;++r){f++;var g=c[i]+"";e.push(parseFloat(g.replace(/,/g,"")));i+=c.length/d;if(d==0||f==d){v.push(e);f=0;e=[];}}return v;};this.getAllColValuesInArray=function(c,i,d,m,e){var v=[];var f=[];var g=0;var h=this.getMeasureCounter();if(m){for(var r=0;r<c.length/this.getMeasureCounter();++r){g++;var j=c[i]+"";f.push(parseFloat(j.replace(/,/g,"")));i+=this.getMeasureCounter();if(d==0||g==d){v.push(f);g=0;f=[];}}}else{h=e==1?this.getMeasureCounter():1;var s=d*i;var k=0;for(r=0;r<c.length/this.getMeasureCounter();++r){g++;j=c[s+(k*h)]+"";f.push(parseFloat(j.replace(/,/g,"")));if(d==0||g==d){v.push(f);g=0;f=[];k++;s=0;}else{s=s+Math.round(c.length/d);}}}return v;};this.validateData=function(){var c=this._getColDimensionCounter();var r=this._getRowDimensionCounter();var e=this.getMeasureCounter();var f=this.getMeasureAxis();var s=this.getMessages().chart_mapping_error;var l=null;if(e>0&&r>=1&&c==0&&f=="ROWS"){l=this.getMessages().waterfall_datamapping_rmd;}else if(e>0&&r==0&&c>=1&&f=="COLUMNS"){l=this.getMessages().waterfall_datamapping_cmd;}else if(r>1&&f=="COLUMNS"){l=this.getMessages().waterfall_datamapping_rnd_cm;}else if(c>1&&f=="ROWS"){l=this.getMessages().waterfall_datamapping_rm_cnd;}else return;throw new C(s,l);};}return a;});