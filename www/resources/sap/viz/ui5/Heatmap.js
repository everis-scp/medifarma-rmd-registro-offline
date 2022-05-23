/*!
 * SAPUI5

(c) Copyright 2009-2019 SAP SE. All rights reserved
 */
sap.ui.define(['sap/viz/library','./core/BaseChart','./HeatmapRenderer'],function(l,B){"use strict";var H=B.extend("sap.viz.ui5.Heatmap",{metadata:{library:"sap.viz",aggregations:{general:{type:"sap.viz.ui5.types.RootContainer",multiple:false},title:{type:"sap.viz.ui5.types.Title",multiple:false},legendGroup:{type:"sap.viz.ui5.types.Legend",multiple:false},legend:{type:"sap.viz.ui5.types.legend.Common",multiple:false},xyContainer:{type:"sap.viz.ui5.types.XYContainer",multiple:false},dataLabel:{type:"sap.viz.ui5.types.Datalabel",multiple:false},xAxis:{type:"sap.viz.ui5.types.Axis",multiple:false},yAxis:{type:"sap.viz.ui5.types.Axis",multiple:false},plotArea:{type:"sap.viz.ui5.types.Heatmap",multiple:false},toolTip:{type:"sap.viz.ui5.types.Tooltip",multiple:false},interaction:{type:"sap.viz.ui5.types.controller.Interaction",multiple:false}},events:{selectData:{},deselectData:{},showTooltip:{deprecated:true},hideTooltip:{deprecated:true},initialized:{}},vizChartType:"viz/heatmap"}});return H;});
