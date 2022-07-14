/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define("sap/zen/dsh/dialogs/NewLines",["sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/base/Log","sap/m/MessageToast","sap/zen/dsh/Axis","sap/zen/dsh/DimensionType","sap/zen/commons/thirdparty/lodash"],function(F,J,L,M,A,D,_){"use strict";var d;function g(c){return c.runAsOwner(function(){return Promise.resolve(F.load({name:"sap.zen.dsh.fragment.NewLines",controller:{onOk:function(){var n=d.getModel("NewLines");var a=d.getModel("om").getDataProvider("0");d.setBusy(true);var C=n.getProperty("/cols");var r=_.filter(n.getProperty("/rows"),function(o){return _.some(o,_.identity);});a.setNewLines({cols:C,rows:r}).then(function(R){d.setBusy(false);if(R&&R.length>0&&_.find(R,function(m){return m.type==="Error";})){return null;}else{d.close();return a.refreshLeaveMsg();}}).catch(function(e){L.error(e);});},onCancel:function(){d.close();},onAddLines:function(){var n=d.getModel("NewLines");n.setProperty("/rows",_.concat(n.getProperty("/rows"),_.range(8).map(function(){return{};})));}}})).then(function(o){d=o;d.setModel(new J(),"NewLines");d.getModel("NewLines").setSizeLimit(1000);var O=d.open;d.open=function(a){var n=d.getModel("NewLines");d.setModel(a,"om");var b=d.getModel("om").getDataProvider("0");var S=_.filter(b.Dimensions,function(e){return e.IsStructure;});var m=_.flatten(_.map(S,function(s){return s.StructureMembers;}));return Promise.all(_.filter(b.Dimensions,function(e){return e.Axis===A.Rows&&!e.IsStructure;}).map(function(e){return e.get();})).then(function(){var C=_.concat(_.orderBy(_.filter(b.Dimensions,function(e){return e.Axis===A.Rows&&!e.IsStructure;}),"Position","asc").map(function(e){return{Name:e.Name,IsDim:true,IsDate:e.DimensionType===D.Date,Description:e.Description||e.Name,type:sap.m.InputType.Text};}),_.map(b.getDataEntryMask().QueryCellNames,function(N){var q=_.find(b.Cube.QueryDataCells,function(e){return e.Name===N;});return{Name:N,IsDim:false,QueryCellId:parseInt(N,10),Description:_.map(q.DimensionMemberReferences,function(s){return _.find(m,function(e){return!!e[s];})[s];}).map(function(e){return e.Description;}).join(" / "),type:sap.m.InputType.Number};}));n.setData({rows:_.range(8).map(function(){return _.reduce(C,function(e){return e;},{});}),cols:C});var t=d.getContent()[0].byId("newLineTable");_.forEach(t.getColumns(),function(e){var f=null;var h=e.data();function i(E){L.error(E.getSource().getId());}function j(){M.show("Not yet implemented");}if(h.isDate){f=new sap.m.DatePicker({change:i,dateValue:"{NewLines>"+h.name+"}"});}else{f=new sap.m.Input({showValueHelp:h.isDim,valueHelpRequest:j,value:"{NewLines>"+h.name+"}"});}e.setTemplate(f);});O.apply(d);});};return o;});});}return g;});