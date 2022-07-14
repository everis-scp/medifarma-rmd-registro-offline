/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/m/HBox","sap/m/HBoxRenderer","sap/ui/core/StashedControlSupport"],function(H,a,S){"use strict";var b=H.extend("sap.fe.templates.ObjectPage.controls.StashableHBox",{metadata:{properties:{title:{type:"string"}},designtime:"sap/fe/templates/ObjectPage/designtime/StashableHBox.designtime"},renderer:{render:function(r,c){a.render.apply(this,[r,c]);}}});b.prototype.setTitle=function(t){var c=this.getTitleControl();if(c){c.setText(t);}this.title=t;return this;};b.prototype.getTitle=function(){return this.title;};b.prototype.onAfterRendering=function(){if(this.title){this.setTitle(this.title);}else{var c=this.getTitleControl();if(c){this.title=c.getText();}}};b.prototype.getTitleControl=function(){var I=[],i;if(this.getItems&&this.getItems()[0]&&this.getItems()[0].getItems){I=this.getItems()[0].getItems();}else if(this.getItems&&this.getItems()[0]&&this.getItems()[0].getMicroChartTitle){I=this.getItems()[0].getMicroChartTitle();}for(i=0;i<I.length;i++){if(I[i].isA("sap.m.Title")||I[i].isA("sap.m.Link")){return I[i];}}return null;};S.mixInto(b);return b;},true);