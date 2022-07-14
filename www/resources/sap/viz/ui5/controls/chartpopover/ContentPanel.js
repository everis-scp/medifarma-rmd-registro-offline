/*!
 * SAPUI5

(c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(['./ShapeMarker','sap/ui/core/Control','sap/ui/layout/form/SimpleForm','sap/ui/layout/Grid','sap/m/Text','sap/m/ObjectNumber','sap/m/Label','sap/ui/core/library','../common/utils/ContentUtil','../common/utils/SelectionDetailUtil','sap/ui/layout/form/ResponsiveGridLayout'],function(S,C,a,G,T,O,L,c,b,d){"use strict";var e=c.TextAlign;var f=C.extend('sap.viz.ui5.controls.chartpopover.ContentPanel',{metadata:{properties:{'showLine':'boolean'},publicMethods:["setContentData"]},renderer:{apiVersion:2,render:function(r,o){r.openStart("div",o).class("viz-controls-chartPopover-contentPanel").attr("aria-labelledby",o._oDimLabel.getId()+" "+o._oForm.getId()).attr('tabindex',-1).openEnd();r.renderControl(o._oShapeLabel);r.renderControl(o._oPanel);r.close("div");}}});f.prototype.init=function(){this._measureItemsLen=0;this._maxMeasureLableLen=15;this._maxMeasureValueLen=12;this._oShapeLabel=new S(this._createId('vizShapeMarker'),{}).addStyleClass('viz-controls-chartPopover-dimension-marker');this._oDimLabel=new T(this._createId('vizDimensionLabel'),{}).addStyleClass('viz-controls-chartPopover-dimension-label');this._oForm=new a({editable:false,maxContainerCols:2,layout:"ResponsiveGridLayout",labelSpanL:6,labelSpanM:6,labelSpanS:6,emptySpanL:0,emptySpanM:0,emptySpanS:0,columnsL:2,columnsM:2,content:[]});this._oPanel=new G({width:'100%',defaultSpan:"L12 M12 S12",content:[this._oDimLabel,this._oForm]}).addStyleClass('viz-controls-chartPopover-Vlt');};f.prototype.setContentData=function(g){this._measureItemsLen=0;var v=g.val,h='';if(v){this._oForm.removeAllContent();var j=false;var r=b.setContent("popover",g);var k=r.items;h=r.dims;j=r.isLongMode;for(var i=0;i<k.length;i++){this._renderLabels(j,k[i],g.isTimeSeries);}var l=function(g){var n=false;if(g.selectByTimeAxisGroup&&g.val){var o=0;for(var i=0;i<g.val.length;i++){if(g.val[i].type==='Measure'){o++;}}if(o>1){n=true;}}return n;};if(!l(g)&&typeof g.color==='string'){var m=this._oDimLabel.$().css('margin-left');if(m){m=parseInt(m.substr(0,m.length-2));this._oShapeLabel.setMarkerSize(m);}this._oShapeLabel.setColor(g.color).setType((g.shape?g.shape:'square'));if(this.getShowLine()){this._oShapeLabel.setShowWithLine(g.type).setLineInfo(g.lineInfo);}else{this._oShapeLabel.setShowWithLine(undefined);}if(g.stroke&&g.stroke.visible){this._oShapeLabel.setStroke(g.stroke);}}else{this._oShapeLabel.setType(null);this._oShapeLabel.setShowWithLine(undefined);}if(g.pattern){this._oShapeLabel.setPattern(g.pattern);}else{this._oShapeLabel.setPattern(null);}if(h&&h.length>0){this._oDimLabel.setVisible(true);this._oDimLabel.setText(h);}else{this._oDimLabel.setVisible(false);}this._measureItemsLen=g.val.length;if(this._oShapeLabel._isShowWithLine()){this._oForm.addStyleClass('viz-controls-chartPopover-measure-simpleForm');}else{this._oForm.removeStyleClass('viz-controls-chartPopover-measure-simpleForm');}if(!this._oDimLabel.getVisible()){this._oForm.addStyleClass('viz-controls-chartPopover-measure-simpleForm-withoutDimensionLabel');}else{this._oForm.removeStyleClass('viz-controls-chartPopover-measure-simpleForm-withoutDimensionLabel');}}};f.prototype._renderLabels=function(i,g,h){var v;if(i){this._oForm.setLabelSpanS(12);if(g.name!==''){this._oForm.addContent(new T({text:g.name}).addStyleClass('viz-controls-chartPopover-measure-labels viz-controls-chartPopover-measure-labels-wrapper-name'));}v=new O({number:g.value,unit:g.unit,textAlign:e.Begin}).addStyleClass('viz-controls-chartPopover-measure-labels viz-controls-chartPopover-measure-labels-wrapper-value');this._oForm.addContent(v);if(h&&(g.name==='')){v.addStyleClass('viz-controls-chartPopover-timeDayDimValue');}}else{this._oForm.setLabelSpanS(6);this._oForm.addContent(new L({text:g.name}).addStyleClass('viz-controls-chartPopover-measure-labels viz-controls-chartPopover-measure-name'));if(g.value!==null){v=new O({number:g.value,unit:g.unit,textAlign:e.End}).addStyleClass('viz-controls-chartPopover-measure-labels viz-controls-chartPopover-measure-value');}else{v=new O({number:this._getNoValueLabel(),textAlign:e.End}).addStyleClass('viz-controls-chartPopover-measure-labels viz-controls-chartPopover-measure-value');}if(h&&(g.name==='')){v.addStyleClass('viz-controls-chartPopover-timeDayValue');}this._oForm.addContent(v);}};f.prototype.isMultiSelected=function(){return this._measureItemsLen===0;};f.prototype._createId=function(i){return this.getId()+"-"+i;};f.prototype._getNoValueLabel=function(){return sap.viz.extapi.env.Language.getResourceString("IDS_ISNOVALUE");};f.prototype.exit=function(i){if(this._oForm){this._oForm.destroy();this._oForm=null;}if(this._oShapeLabel){this._oShapeLabel.destroy();this._oShapeLabel=null;}if(this._oDimLabel){this._oDimLabel.destroy();this._oDimLabel=null;}if(this._oPanel){this._oPanel.destroy();this._oPanel=null;}};return f;});
