/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Control','./library','sap/ui/layout/BlockLayoutCellData',"./BlockLayoutRowRenderer","sap/base/Log"],function(C,l,B,a,L){"use strict";var b=l.BlockBackgroundType;var c=l.BlockRowColorSets;var d=C.extend("sap.ui.layout.BlockLayoutRow",{metadata:{library:"sap.ui.layout",properties:{scrollable:{type:"boolean",group:"Appearance",defaultValue:false},rowColorSet:{type:"sap.ui.layout.BlockRowColorSets",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.layout.BlockLayoutCell",multiple:true,singularName:"content"}},associations:{accentCells:{type:"sap.ui.layout.BlockLayoutCell",multiple:true,singularName:"accentCell"}},designtime:"sap/ui/layout/designtime/BlockLayoutRow.designtime"}});d.prototype.init=function(){this._applyLayoutData={};};d.prototype.addContent=function(o){this._ensureLayoutData(o);return this.addAggregation("content",o);};d.prototype.insertContent=function(o,i){this._ensureLayoutData(o);return this.insertAggregation("content",o,i);};d.prototype.onBeforeRendering=function(){var e=this.getContent(),t=this;e.forEach(function(o,i){t._ensureLayoutData(o);o._setParentRowScrollable(t.getScrollable());});this._calculateBreakpointRendering();};d.prototype.setRowColorSet=function(t){var A=Array.prototype.slice.call(arguments),o=C.prototype.setProperty.apply(this,["rowColorSet"].concat(A)),s="sapUiBlockLayoutBackground"+t,e=this.getParent(),f=e&&e.getBackground(),T=e&&e.indexOfAggregation("content",this),p=e&&e.getContent(),P=(T&&p[T-1])||null,n=(p&&p[T+1])||null,g=Object.keys(c).map(function(k){return c[k];}),i=false;if(P&&P._hasStyleClass(s,f,i,t)){s+="Inverted";i=true;}g.forEach(function(h){var j="sapUiBlockLayoutBackground"+h,I=j+"Inverted";if(this._hasStyleClass(j,f,false,h)){this.removeStyleClass(j,true);}else if(this._hasStyleClass(I,f,true,h)){this.removeStyleClass(I,true);}},this);this.addStyleClass(s,true);if(n&&n._hasStyleClass(s,f,i,t)){n.setRowColorSet(t);}this.invalidate();return o;};d.prototype.addAccentCell=function(i){var o,I=i&&i.getId?i.getId():i,e=this.getParent(),s=e&&(e.getBackground()||"");o=this.addAssociation("accentCells",i);if(!e){return this;}if([b.Accent,b.Mixed].indexOf(s)===-1){L.warning(I+" was not set as accent cell. Accent cells could be set only for 'Accent' and 'Mixed' layout backgrounds.");return this;}return o;};d.prototype._ensureLayoutData=function(o){var O=o.getLayoutData();if(!O||!(O instanceof B)){o.setLayoutData(new B());}};d.prototype._onParentSizeChange=function(e){this._currentSize=e;this._calculateBreakpointRendering();this.invalidate();};d.prototype._getCellArangementForCurrentSize=function(){if(!this._arrangements||!this._currentSize){return null;}return this._arrangements[this._currentSize];};d.prototype._calculateBreakpointRendering=function(){if(!this._currentSize){return;}this._arrangements={"S":this._calcArrangementForSize("S"),"M":this._calcArrangementForSize("M"),"L":this._calcArrangementForSize("L"),"XL":this._calcArrangementForSize("Xl")};};d.prototype._calcArrangementForSize=function(s){var e=this.getContent();if(e.length>=3&&s==="M"&&e.length<5){return this._generateArrangementForMCase();}else{return this._generateArrangement(s);}};d.prototype._generateArrangement=function(s){var o,I=0,f=[],e=[],A=[[]],g=this.getContent();g.forEach(function(h){o=h.getLayoutData();e.push(o["breakRowOn"+s+"Size"]);f.push(o["get"+s+"Size"]());});f.forEach(function(D,i){A[I].push(D);if(e[i+1]){I++;A[I]=[];}});return A;};d.prototype._generateArrangementForMCase=function(){var e=this.getContent();if(e.length===3&&this._isAllCellsHasSameWidth("M")){return[[1,1,1]];}else if(e.length===3){return[[1,1],[1]];}else if(e.length===4){return[[1,1],[1,1]];}};d.prototype._isAllCellsHasSameWidth=function(s){var e,f=this.getContent(),F=f[0].getLayoutData()["get"+s+"Size"]();for(var i=1;i<f.length;i++){e=f[i].getLayoutData()["get"+s+"Size"]();if(e!==F){return false;}}return true;};d.prototype._processMixedCellStyles=function(i,e){var o,p;if(!e||!e.length){return this;}o=this.getParent();p=o&&(o.hasStyleClass("sapUiBlockLayoutSizeL")||o.hasStyleClass("sapUiBlockLayoutSizeXL"));e.forEach(function(f){var g,u;if(p&&f.getId()===i&&f.getWidth()===1){f.addStyleClass("sapContrast").addStyleClass("sapContrastPlus");g=c;u=this._hasStyleClass("sapUiBlockLayoutBackground"+g.ColorSet1,b.Mixed,false,g.ColorSet1)||this._hasStyleClass("sapUiBlockLayoutBackground"+g.ColorSet1,b.Mixed,true,g.ColorSet1);if(u){f.addStyleClass("sapUiBlockLayoutBackgroundContrast2");}}else if((!p||f.getId()!==i)&&(f.hasStyleClass("sapContrast")||f.hasStyleClass("sapContrastPlus"))){f.removeStyleClass("sapContrast").removeStyleClass("sapContrastPlus").removeStyleClass("sapUiBlockLayoutBackgroundContrast2");this.removeAssociation("accentCells",f);L.warning(i+" was removed as accent cell. Only one cell at a time could be accented for Mixed layout background");}},this);return this;};d.prototype._processAccentCellStyles=function(A,r){var o,s,e,i=0,I=0,f=Array.prototype.slice.call(A);if(!A||!A.length){return this;}for(i=0;i<r.length;i++){o=r[i];s=o.getId();if(!f.length){break;}if(f.indexOf(s)>-1){I++;e="sapUiBlockLayoutBackgroundColorSetGray"+((I%2)+1);if(o.hasStyleClass(e)){continue;}f.splice(f.indexOf(s),1);o.removeStyleClass("sapUiBlockLayoutBackgroundColorSetGray1").removeStyleClass("sapUiBlockLayoutBackgroundColorSetGray2").addStyleClass(e);}}return this;};d.prototype._hasStyleClass=function(s,e,I,t){var o=b,f=c,i,S,E;if([o.Light,o.Mixed].indexOf(e)===-1){return this.hasStyleClass(s);}else if(this.hasStyleClass(s)){return true;}E=[[f.ColorSet1,f.ColorSet3],[f.ColorSet2,f.ColorSet4]];for(i=0;i<=E.length;i++){if(E[i]&&E[i].indexOf(t)>-1){break;}}if(!E[i]){return false;}S=E[i].map(function(g){return"sapUiBlockLayoutBackground"+g+(I?"Inverted":"");});return S.some(this.hasStyleClass,this);};return d;});
