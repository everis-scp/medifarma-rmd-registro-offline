/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/microchart/ComparisonMicroChart","sap/suite/ui/microchart/ComparisonMicroChartData","sap/m/ValueColor","sap/ui/core/Control",],function(C,a,V,b){"use strict";return b.extend("sap.ushell.renderers.fiori2.search.controls.SearchFacetBarChart",{metadata:{properties:{lastUpdated:{type:"string",},aItems:{type:"object",},},aggregations:{items:{type:"sap.suite.ui.microchart.ComparisonMicroChartData",multiple:true,},},},constructor:function(o){var t=this;t.options=o;b.prototype.constructor.apply(this);this.bindAggregation("items","items",function(){var c=new a({title:"{label}",value:"{value}",color:{path:"selected",formatter:function(v){var r=V.Good;if(!v){r=V.Neutral;}return r;},},displayValue:"{valueLabel}",press:function(e){var d=e.getSource().getBindingContext();var m=d.getModel();var f=d.getObject();var i=f.selected;var g=f.filterCondition;if(i){if(t.options.oSearchFacetDialog){t.options.oSearchFacetDialog.onDetailPageSelectionChangeCharts(e);}else{m.removeFilterCondition(g,true);}}else if(t.options.oSearchFacetDialog){t.options.oSearchFacetDialog.onDetailPageSelectionChangeCharts(e);}else{m.addFilterCondition(g,true);}},});return c;});},renderer:function(r,c){r.write("<div");r.writeControlData(c);r.writeClasses();r.write(">");var o=new C({width:"90%",colorPalette:"",press:function(){},tooltip:"",shrinkable:true,});if(c.options.oSearchFacetDialog){o.setWidth("95%");o.addStyleClass("sapUshellSearchFacetBarChartLarge");}else{o.addStyleClass("sapUshellSearchFacetBarChart");}o.addEventDelegate({onAfterRendering:function(){$("#"+this.sId).has(".Good").addClass("sapUshellSearchFacetBarChartSelected");},});var d=c.getItems();var e=c.getAItems();if(d.length===0&&e){d=e;}var m=0;for(var i=0;i<d.length;++i){var f=d[i];if(!c.options.oSearchFacetDialog){if(f.mProperties&&f.mProperties.value){o.addData(f);}else if(f.mProperties&&!f.mProperties.value){m++;}}else{o.addData(f);}}c.iMissingCnt=m;r.renderControl(o);r.write("</div>");},onAfterRendering:function(){var t=this;var c=$(this.getDomRef()).closest(".sapUshellSearchFacetIconTabBar").find(".sapUshellSearchFacetInfoZeile")[0];var I=sap.ui.getCore().byId(c.id);if(t.iMissingCnt>0){I.setVisible(true);var m=sap.esh.search.ui.resources.i18n.getText("infoZeileNumberMoreSelected",[t.iMissingCnt,]);I.setText(m);I.rerender();}else{I.setVisible(false);}var A=$(".sapSuiteUiMicroChartPointer");for(var i=0;i<A.length;i++){var d=A[i];var s=d.title;if(s&&s.indexOf(":")===-1){d.title=s.replace(/( \d+) *$/,":$1");}}},setEshRole:function(){},});});