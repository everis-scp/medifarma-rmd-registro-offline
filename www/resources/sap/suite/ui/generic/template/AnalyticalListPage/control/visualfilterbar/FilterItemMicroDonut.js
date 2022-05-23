sap.ui.define(["sap/suite/ui/microchart/InteractiveDonutChart","sap/suite/ui/microchart/InteractiveDonutChartSegment","sap/ui/model/json/JSONModel","sap/suite/ui/generic/template/AnalyticalListPage/control/visualfilterbar/FilterItemMicroChart","sap/suite/ui/generic/template/AnalyticalListPage/util/CriticalityUtil","sap/suite/ui/generic/template/AnalyticalListPage/util/FilterUtil","sap/suite/ui/generic/template/js/StableIdHelper"],function(I,a,J,F,C,b,S){"use strict";var c="__IS_OTHER__";var d=F.extend("sap.suite.ui.generic.template.AnalyticalListPage.control.visualfilterbar.FilterItemMicroDonut",{metadata:{properties:{labelWidthPercent:{type:"float",group:"Misc",defaultValue:1/2}},aggregations:{control:{type:"sap.suite.ui.microchart.InteractiveDonutChart",multiple:false}}},renderer:{}});d.prototype.init=function(){var i=S.getStableId({type:"VisualFilter",subType:"InteractiveChart",sMicroChartId:this.getId()});this._chart=new I({id:i,selectionEnabled:true,segments:[]});this.setControl(this._chart);this.setModel(new J(),'__alp_chartJSONModel');this._otherField="__IS_OTHER__";this._sorters=[];F.prototype.init.apply(this,arguments);};d.prototype._applyDonutChartSelections=function(o,D){var s=this._chart.getSegments(),p=this.getParentProperty(),e=[],f,r;if(o.dimValue===c){s.forEach(function(g){f=g.getCustomData()[0].getValue();if(f!==c){if(g.getSelected()){e.push(f);}r={"exclude":true,"operation":"EQ"};r.keyField=p;r.value1=f;D.ranges.push(r);}});if(e.length>0){D.items=D.items.filter(function(g){return e.indexOf(g.key)===-1;});D.ranges=D.ranges.filter(function(r){return!(r.exclude===false&&r.operation==="EQ"&&r.keyField===p&&e.indexOf(r.value1)>-1);});}}else{if(o.dimValue instanceof Date){D.ranges.push({exclude:false,keyField:this.getDimensionField(),operation:"EQ",value1:o.dimValue,value2:null});}else{D.items.push({key:o.dimValue,text:o.dimValueDisplay});}var i=false;s.forEach(function(g){f=g.getCustomData()[0].getValue();if(f===c&&g.getSelected()){i=true;}if(f!==c){e.push(f);}});if(i){D.ranges=D.ranges.filter(function(r){return!(r.exclude===true&&r.operation==="EQ"&&r.keyField===p&&e.indexOf(r.value1)>-1);});}}return D;};d.prototype._onDataReceived=function(t,T){var r=[],D=this.getDimensionFieldDisplay(),m=this.getMeasureField(),s=this.getDimensionField(),n=b.IsNavigationProperty(this.getModel(),this.getEntitySet(),D)?D.split("/"):null;if(!T){t.results.forEach(function(h,i){h['dimensionValue']=h[s];r.push(h);});}else{var f=0,o=0;t.results.forEach(function(h,i){if(i<2){h['dimensionValue']=h[s];r.push(h);f+=parseFloat(h[m]);}});if(T){T.results.forEach(function(h){var i=this.getModel("i18n"),j=jQuery.extend(true,{},h);j['dimensionValue']=this._otherField;j[s]=this._otherField;if(this.getUnitField()){j[this.getUnitField()]=t.results.length>1?t.results[0][this.getUnitField()]:"";}if(n&&n.length>0){j[n[0]]={};j[n[0]][n[1]]=i?i.getResourceBundle().getText("VIS_FILTER_DONUT_OTHER"):"";}else{j[D]=i?i.getResourceBundle().getText("VIS_FILTER_DONUT_OTHER"):"";}if(f<0){o=parseFloat(h[m])+f;}else{o=parseFloat(h[m])-f;}j[m]=o;r.push(j);}.bind(this));}}F.prototype._onDataReceived.call(this,r);this.getModel('__alp_chartJSONModel').setData(r);this._chart.setModel(this.getModel('__alp_chartJSONModel'));var e=3,g={path:'/',template:new a(this._getChartAggregationSettings(true)),startIndex:0,length:e};this._chart.bindSegments(g);this._chart.setBusy(false);};return d;},true);
