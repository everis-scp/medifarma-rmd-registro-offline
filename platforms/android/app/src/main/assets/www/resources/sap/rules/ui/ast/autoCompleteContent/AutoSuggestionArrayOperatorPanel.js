sap.ui.define(["sap/ui/thirdparty/jquery","../../library","sap/ui/core/Control","sap/m/List","sap/ui/model/json/JSONModel","sap/m/ListMode","sap/ui/core/CustomData","sap/ui/model/Sorter","sap/rules/ui/parser/infrastructure/util/utilsBase"],function(q,l,C,R,L,J,a,b,S,i){"use strict";var c=C.extend("sap.rules.ui.ast.autoCompleteContent.AutoSuggestionArrayOperatorPanel",{metadata:{library:"sap.rules.ui",properties:{reference:{type:"object",defaultValue:null,},data:{type:"object",defaultValue:null},expand:{type:"boolean",defaultValue:false}},aggregations:{PanelLayout:{type:"sap.m.Panel",multiple:false}},events:{}},init:function(){this.oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.rules.ui.i18n");this.infraUtils=new sap.rules.ui.parser.infrastructure.util.utilsBase.lib.utilsBaseLib();this.needCreateLayout=true;this.AttributeSegmentSelected=true;this.dataObjectName="";},onBeforeRendering:function(){this._reference=this.getReference();if(this.needCreateLayout){var d=this._createLayout();this.setAggregation("PanelLayout",d,true);this.needCreateLayout=false;}},initializeVariables:function(){},_createLayout:function(){var t=this;var v=this.getData();var m=new sap.ui.model.json.JSONModel();m.setData(v);this.arrayOperatorslist=new sap.m.List({growing:true,growingScrollToLoad:true,enableBusyIndicator:true,});this.arrayOperatorslist.bindItems({path:"/array",sorter:new sap.ui.model.Sorter("name"),rememberSelections:false,mode:a.SingleSelectMaster,template:new sap.m.DisplayListItem({label:"{name}",value:"{label}",type:"Active",press:function(e){t._reference(e);}})});this.arrayOperatorslist.setModel(m);var t=this;var d=new sap.m.Panel({headerText:this.oBundle.getText("arrayOperatorsPanelTitle"),expandable:true,expanded:this.getExpand(),content:this.arrayOperatorslist,width:"auto"});return d;},});return c;},true);
