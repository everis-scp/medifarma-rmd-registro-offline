/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/zen/dsh/utils/BaseHandler","sap/zen/commons/layout/MatrixLayout","sap/zen/commons/Padding"],function(B,M,P){"use strict";var d=B.dispatcher;var G=function(){B.apply(this,arguments);var t=this;this.createAndAdd=function(C,o,i,A,j){var k=h();g(k,o);A(k,j);return k;};this.updateComponent=function(C,o){if(o){g(C,o);}return C;};this.doD4LStuff0=function(){};this.doD4LStuff1=function(){};function g(C,o){if(o){var A=C.getContent()[0];var i=o.content;if(i){t.updateChildren(i,C,function(n,I){t.doD4LStuff0(A,n);d.insertIntoAbsoluteLayoutContainer(A,n,I);},function(j){A.removeContent(j);});}}}this.applyForChildren=function(C,j){var r={};var k=C.getContent()[0];var l=k.getContent();for(var i=0;i<l.length;i++){var o=l[i];if(o){j(o,i);}}return r;};var h=function(){var C=new sap.zen.commons.layout.MatrixLayoutCell();t.doD4LStuff1(C);C.setVAlign("Top");C.setPadding(P.None);var A=t.createAbsoluteLayout();A.addStyleClass("zenborder");C.addContent(A);return C;};this.getType=function(){return"gridcell";};this.getDecorator=function(){return"GridCellDecorator";};};var a=new G();B.dispatcher.addHandlers(a.getType(),a);var b=function(){B.apply(this,arguments);var t=this;this.createAndAdd=function(C,o,h,A,i){var j=new sap.zen.commons.layout.MatrixLayoutCell();g(j,o);A(j,i);return j;};this.updateComponent=function(C,o){if(o){g(C,o);}return C;};this.doD4LStuff=function(){};this.doD4LStuff1=function(){};function g(C,o){if(o){var h=o.content;if(h){t.updateChildren(h,C,function(n){t.doD4LStuff(n);C.addContent(n);},function(i){C.removeContent(i);});}}}this.applyForChildren=function(C,h){var r={};var j=C.getContent();for(var i=0;i<j.length;i++){var o=j[i];if(o){h(o,i);}}return r;};this.getType=function(){return"gridcellsimple";};this.getDecorator=function(){return"GridCellDecorator";};};var c=new b();B.dispatcher.addHandlers(c.getType(),c);sap.zen.dsh.sapbi_registerHandlers([a,c]);var e=function(){B.apply(this,arguments);var t=this;var r=function(C){C.getParent().removeCell(C);};this.doD4LStuff0=function(){return false;};this.doD4LStuff1=function(){};function g(o,C,i,m){t.updateChildren(C.content,o,function(n,I){var R=Math.floor(I/m);var p=o.getRows()[R];if(!t.doD4LStuff0(n,o,p,I)){p.addCell(n);}},r);t.doD4LStuff1(o);}this.addD4LStyleClassToRow=function(){};this.addD4LStyleClassToTable=function(){};this.createAndAdd=function(C,o,m,A,I){var n=o.rows;var p=o.cols;var q=-1;var u=-1;var v=h(n);var w=j(p);var i;if(n!=null){q=n.length;}if(p!=null){u=p.length;}var x=o["id"];var T=new M({id:x,layoutFixed:false,width:"100%",height:"100%"});this.addD4LStyleClassToTable(T);T.newGrid=true;A(T,I);B.dispatcher.updateComponentProperties(T,m);for(i=0;i<q;i++){var R=new sap.zen.commons.layout.MatrixLayoutRow();this.addD4LStyleClassToRow(R);s(R,v[i]);T.addRow(R);}if(u!==-1){T.setColumns(u);var y=[];for(i=0;i<u;i++){y[i]=w[i]+"%";}T.setWidths(y);}g(T,o,m,u);return T;};this.update=function(C,o,i){if(!C){return;}if(!o){return;}var T=C;var R;var m=o.rows;var n=o.cols;if(m||n){var p=T.getRows().length;var q=m.length;var u=n.length;var v=h(m);for(var w=0;w<p;w++){R=T.getRows()[w];s(R,v[w]);}for(w=p;w<q;w++){R=new sap.zen.commons.layout.MatrixLayoutRow();this.addD4LStyleClassToRow(R);T.addRow(R);s(R,v[w]);}for(w=p-1;w>=q;w--){var x=T.getRows()[w].getCells();for(var y=0;y<x.length;y++){d.addTransferControl(x[y],r);}T.removeRow(w);}var z=j(n);var A=[];for(var D=0;D<n.length;D++){A[D]=z[D]+"%";}T.setWidths(A);T.setColumns(n.length);g(C,o,i,u);}};this.applyForChildren=function(o,i){var m=o.getRows();var n;var p;for(n=0;n<m.length;n++){var q=m[n].getCells();for(p=0;p<q.length;p++){var u=q[p];i(u);}}};var h=function(m){var n=null;if(m!=null){var o=m.length;var p=[];for(var i=0;i<o;i++){p[i]=parseInt(m[i].row.height,10);}n=l(p);}return n;};var j=function(m){var n=null;if(m!=null){var o=m.length;var p=[];for(var i=0;i<o;i++){p[i]=parseInt(m[i].col.width,10);}n=l(p);}return n;};var s=function(R,i){if(i){R.setHeight(i+"%");}else{R.setHeight("100%");}};function k(n){if(n>=0){return Math.floor(n);}else{return-1*Math.floor(-1*n);}}var l=function(m){var p=[];var n=0.;var i;var o=0.;for(i=0;i<m.length;i++){n+=m[i];}var q=100./n;n=0;for(i=0;i<m.length-1;i++){var u=m[i]*q;var v=Math.round(u);o+=(u-v);var w=k(o);p[i]=v+w;n+=p[i];o=o-w;}p[m.length-1]=100-n;return p;};this.testAccessor={getRowHeightsInPercent:h,getColumnWidthsInPercent:j,convertRelativeGridSizesToPercentages:l};this.getDecorator=function(){return"GridDecorator";};this.getType=function(){return"gridlayout";};};var f=new e();B.dispatcher.addHandlers(f.getType(),f);return f;});
