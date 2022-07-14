/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/base/Log","sap/zen/dsh/utils/request","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/utils/BaseHandler","sap/viz/library"],function(q,L,R,_){"use strict";function V(){}V.prototype.create=function(c,m,i){this._oldData={};this.info_ctrl=i;try{this._vizframe=new sap.viz.vizframe.VizFrame({type:m.type,data:m.data,container:c,bindings:m.bindings,properties:m.properties,template:m.template},{controls:{morpher:{enabled:false}}});c.on("mousedown",function(e){e.stopPropagation();}).on("touchstart",function(e){e.stopPropagation();}).on("touchend",function(e){e.stopPropagation();});var t=this;this._metadata=m;this._doSelectActions=true;if(this._metadata.selection){this.selection(this._metadata.selection);}this._vizframe.on("selectData",function(){t.selectDeselect();});this._vizframe.on("deselectData",function(){t.selectDeselect();});this._vizframe.on("contextualData",function(e){if(e.type==="legend"){return;}var a=t.info_ctrl.sId;var b=a.substring(0,a.lastIndexOf("_"));var d=t.getCharacteristic(e.data,e.type);var f=[["BI_COMMAND_TYPE","CREATE_CONTEXT_MENU",0],["ID","CONTEXT_MENU",0],["DOM_REF_ID",a,0],["TARGET_ITEM_REF",b,0],["CHARACTERISTIC_NAME",d.name,0],["CHARACTERISTIC_MEMBER_NAME",d.memberName,0]];var C=R.zenSendCommandArrayWoEventWZenPVT(f);var A=new Function(C);A();});}catch(e){L.error(e);}};V.prototype.getCharacteristic=function(d,t){var c={name:"",memberName:""};if((d.length!==0)&&(t==="axisLabel")){var s=q(".v-axis-item").find(".v-hovershadow").parent();if(!s||!s.attr("class")){return c;}var f=s.attr("class").slice(-1);var m=s.text();var a=this._metadata.bindings;var b=_.find(a,{feed:"categoryAxis"});if(b&&_.isArray(b.source)){var i=(b.source.length-1)-f;var e=b.source[i];c.name=e;var g=_.find(d,function(h){return h.data[e+".d"]===m;});if(!g){return c;}if(g.data[e].indexOf("HIERARCHY_NODE/")===0){c.memberName=g.data[e];}else{c.memberName="MEMBER/"+e+"/"+g.data[e];}}}return c;};V.prototype.selectDeselect=function(){if(!this._doSelectActions){this._doSelectActions=true;return;}var s=this._vizframe.selection();if(!_.isEqual(this._oldData,s)){this.info_ctrl.fireDesignStudioPropertiesChangedAndEvent(["chartSelection","dataSelected"],"onSelect");this._oldData=s;}};V.prototype.update=function(m){this._vizframe.update({type:m.type,data:m.data,bindings:m.bindings,properties:m.properties});this._metadata=m;};V.prototype.destroy=function(){if(this._vizframe){this._vizframe.destroy();}};V.prototype.selection=function(v){if(v===undefined){return this._vizframe&&this._vizframe.selection();}else{this._doSelectActions=false;if(v==="CLEAR"){this._vizframe.selection([],{"clearSelection":true});this._oldData={};this._doSelectActions=true;}else{var a=this._vizframe.selection(v);if(!a){this._doSelectActions=true;}}}return null;};return V;});