/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["./GeoJsonLayer","jquery.sap.global","sap/base/Log","./library"],function(G,q,L,l){"use strict";var F=G.extend("sap.ui.vbm.FeatureCollection",{metadata:{library:"sap.ui.vbm",properties:{},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.vbm.Feature",multiple:true,singularName:"item"}},events:{click:{parameters:{featureId:{type:"string"}}},contextMenu:{parameters:{featureId:{type:"string"}}}}}});F.prototype.getDataObjects=function(){if(this.mbGeoJSONDirty){this._triggerFeatureCreation();}var e=[],p=[],a=[],P=[];q.extend(e,this.mFeatureColl);var o={};if(e.length){var O=this.getItems();for(var n=0,b=O?O.length:0,i;n<b;++n){i=O[n];o[i.getFeatureId()]=i;}}for(var c=0,E,d,t;c<e.length;++c){E=e[c];if((d=o[E.K])){var C={};q.extend(C,E);E=e[c]=C;E.C=d.getColor();if((t=d.getTooltip())){E.TT=t;}}switch(E.type){case"Polygon":case"MultiPolygon":p.push(E);break;case"LineString":case"MultiLineString":a.push(E);break;case"Point":case"MultiPoint":P.push(E);break;default:L.error("Unknown feature type",E.type,"sap.ui.vbm.FeatureCollection");}}return[{"name":this.getId()+"_Polys","type":"N","E":p},{"name":this.getId()+"_Lines","type":"N","E":a},{"name":this.getId()+"_Points","type":"N","E":P}];};F.prototype.getDataRemoveObjects=function(){return[{"name":this.getId()+"_Polys","type":"N"},{"name":this.getId()+"_Lines","type":"N"},{"name":this.getId()+"_Points","type":"N"}];};F.prototype.getFeaturesInfo=function(f){var r=[];for(var n=0,a=f.length,b;n<a;++n){b=f[n];r[b]={};r[b].BBox=this.mFeatureBBox[b];r[b].Midpoint=[(this.mFeatureBBox[b][0]+this.mFeatureBBox[b][1])/2,(this.mFeatureBBox[b][2]+this.mFeatureBBox[b][3])/2];r[b].Name=this.mNames[b];r[b].Properties=this.mFeatureProps[b];}return r;};return F;});
