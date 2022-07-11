/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/ResponsivePopover","sap/ui/model/json/JSONModel","sap/m/Button","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/m/VBox","sap/m/HBox","sap/m/Select","sap/ui/core/ListItem","sap/m/Label","sap/m/Text","sap/m/Title","sap/m/CheckBox","sap/m/Menu","sap/m/MenuItem","sap/m/Input","sap/ui/integration/util/ParameterMap","sap/base/util/merge","sap/ui/core/Core","sap/m/Table","sap/m/Column","sap/m/ColumnListItem","sap/m/ScrollContainer","sap/base/util/ObjectPath","sap/ui/integration/util/BindingHelper"],function(C,P,J,B,S,b,V,H,c,L,d,T,e,f,M,g,I,h,m,k,l,p,q,r,O,s){"use strict";var t=C.extend("sap.ui.integration.editor.Settings",{metadata:{library:"sap.ui.integration"},renderer:null});var R=k.getLibraryResourceBundle("sap.ui.integration"),u,w,x=null,D,y,z,A,E,F,G,K,N,Q,U,W;t.prototype.setConfiguration=function(o){this._originalConfig=o;o=m({},o);var a=new J(o);this.setModel(a,"currentSettings");this.bindElement({path:"currentSettings>/"});};t.prototype.open=function(o,a,i,j,n,v,o1){var p1=this.getModel("currentSettings").getData();if(p1.values){this.prepareFieldsInKey(p1);}x=this;W=X(p1,n);this.addDependent(W);this.oHost=j;this.fnApply=v;this.fnCancel=o1;this._oOpener=n;w=true;o.addDependent(this);if(!p1.allowDynamicValues&&p1.values){k.byId("settings_scroll_container").setHeight("155px");}this.getModel("currentSettings").checkUpdate(true,true);l1(R.getText("EDITOR_SELECT_FROM_LIST"),[]);if(a){var q1=(!i||i.getDomRef()===null||i.getDomRef().offsetWidth===0)?270:i.getDomRef().offsetWidth;var r1=(!i||i.getDomRef()===null||i.getDomRef().offsetHeight===0)?350:i.getDomRef().offsetHeight;W.setContentWidth(q1+"px");W.setContentHeight((r1-50)+"px");if(i&&i.getSettings().preview.position==="right"){W.setPlacement("Right");}else{W.setPlacement("Left");}A.setValue(o._label);W.openBy(o);}else{W.open();}u=this.getModel("currentSettings");if(u.getProperty("/_hasDynamicValue")){b1();}else if(u.getProperty("/_hasSettings")){a1();}else if(u.getProperty("/allowDynamicValues")){b1();}else if(u.getProperty("/allowSettings")){a1();}};t.prototype._applyCurrentSettings=function(){this.fnApply(u.getData());};t.prototype._cancelCurrentSettings=function(){this.fnCancel(this._originalConfig);};t.prototype.destroy=function(){this.removeDependent(W);return C.prototype.destroy.apply(this,arguments);};function X(o,a){var n=$(),U=_(o),D=f1(),v=g1(),y=h1(o,a),W=new P({id:"settings_popover",showArrow:true,contentWidth:"400px",showHeader:false,horizontalScrolling:false,verticalScrolling:false,modal:false,endButton:new B({text:R.getText("EDITOR_MORE_CANCEL"),press:function(){W.close();}}),beginButton:new B({text:R.getText("EDITOR_MORE_OK"),type:"Emphasized",press:function(){if(o.values){var j=k.byId("settings_pav_table"),o1=j.getSelectedContexts(),p1=[];if(u.getProperty("/selectedValues")==="Partion"){for(var i=0;i<o1.length;i++){var q1=x.getKeyFromItem(o1[i].getObject());p1.push(q1);}c1("pageAdminValues",p1);}else{c1("pageAdminValues",[]);}}x._applyCurrentSettings();w=false;W.close();}}),afterClose:function(){if(w){x._cancelCurrentSettings();}w=true;W.destroy();},afterOpen:function(){var o1=this.getDomRef().querySelector("footer");var p1=U.getDomRef(),q1=o1.querySelector("button").parentNode;if(p1){q1.insertBefore(p1,q1.firstChild);}window.requestAnimationFrame(function(){W.getDomRef()&&(W.getDomRef().style.opacity="1");});if(o.values){var r1=k.byId("settings_pav_table"),s1=u.getProperty("/_next/pageAdminValues");if(s1!==undefined&&s1.length>0){r1.removeSelections();u.setProperty("/selectedValues","None");var t1=u.getProperty("/_next/pageAdminValues"),u1=r1.getItems();for(var i=0;i<t1.length;i++){for(var j=0;j<u1.length;j++){var v1=x.getKeyFromItem(u1[j].getBindingContext().getObject());if(t1[i]===v1){r1.setSelectedItem(u1[j]);}}}u.setProperty("/selectedValues","Partion");}else{r1.selectAll();u.setProperty("/selectedValues","All");}}}});W.setCustomHeader(n);W.addContent(U);W.addContent(D);W.addContent(v);W.addContent(y);W.addStyleClass("sapUiIntegrationFieldSettings");return W;}function Y(){N=new b({text:R.getText("EDITOR_MORE_SETTINGS"),key:"settings",icon:"sap-icon://action-settings",width:"50%",press:a1}).addStyleClass("setbtn");return N;}function Z(){N=Y();Q=new S("settings_Segment_btn",{width:"100%",visible:"{= ${currentSettings>allowDynamicValues} && ${currentSettings>allowSettings}}",items:[new b({text:R.getText("EDITOR_MORE_DYNAMICVALUES"),key:"dynamic",icon:"{= ${currentSettings>_hasDynamicValue} ? 'sap-icon://display-more' : 'sap-icon://enter-more'}",width:"50%",press:b1}).addStyleClass("dynbtn sel"),N]});return Q;}function $(){Q=Z();var o=new T({text:R.getText("EDITOR_MORE_DYNAMICVALUES"),visible:"{= ${currentSettings>allowDynamicValues} && !${currentSettings>allowSettings}}"}).addStyleClass("sapUiTinyMagin");var a=new T({text:R.getText("EDITOR_MORE_SETTINGS"),visible:"{= !${currentSettings>allowDynamicValues} && ${currentSettings>allowSettings}}"}).addStyleClass("sapUiTinyMagin");var i=new H({width:"100%",items:[Q,o,a]}).addStyleClass("headertitle");return i;}function _(o){U=new B("settings_reset_to_default_btn",{type:"Transparent",text:R.getText("EDITOR_MORE_RESET"),enabled:"{= ${currentSettings>_next/visible} === (typeof(${currentSettings>visibleToUser}) === 'undefined' ? false : !${currentSettings>visibleToUser}) || ${currentSettings>_next/editable} === (typeof(${currentSettings>editableToUser}) === 'undefined' ? false : !${currentSettings>editableToUser}) || ${currentSettings>_next/allowDynamicValues} === (typeof(${currentSettings>allowDynamicValues}) === 'undefined' ? false : !${currentSettings>allowDynamicValues}) || ${currentSettings>_beforeValue} !== ${currentSettings>value}}",tooltip:R.getText("EDITOR_MORE_SETTINGS_P_ADMIN_RESET"),press:function(){var v=typeof(u.getProperty("/visibleToUser"))==='undefined'?true:u.getProperty("/visibleToUser");var a=typeof(u.getProperty("/editableToUser"))==='undefined'?true:u.getProperty("/editableToUser");var n=typeof(u.getProperty("/allowDynamicValues"))==='undefined'?true:u.getProperty("/allowDynamicValues");var W=k.byId("settings_popover");c1("visible",v);c1("editable",a);c1("allowDynamicValues",n);if(u.getProperty("/translatable")){if(u.getProperty("/_translatedDefaultValue")&&u.getProperty("/_translatedDefaultValue")!==""){u.setProperty("/value",u.getProperty("/_translatedDefaultValue"));}else if(u.getProperty("/_translatedDefaultPlaceholder")&&u.getProperty("/_translatedDefaultPlaceholder")!==""){u.setProperty("/value",u.getProperty("/_translatedDefaultPlaceholder"));}u.setProperty("/_changed",false);}else{u.setProperty("/value",u.getProperty("/_beforeValue"));}if(o.values){var o1=k.byId("settings_pav_table"),p1=u.getProperty("/_next/pageAdminValues"),q1=o1.getItems();if(p1!==undefined&&p1.length>0&&p1.length<q1.length){o1.removeSelections();for(var i=0;i<p1.length;i++){for(var j=0;j<q1.length;j++){var r1=x.getKeyFromItem(q1[j].getBindingContext().getObject());if(p1[i]===r1){o1.setSelectedItem(q1[j]);}}}u.setProperty("/selectedValues","Partion");}else{o1.selectAll();u.setProperty("/selectedValues","All");}}W.getBeginButton().firePress();}}).addStyleClass("resetbutton");return U;}function a1(){y.setVisible(true);D.setVisible(false);k.byId("settings_Segment_btn").setSelectedKey("settings");var o=k.byId("settings_current_value");o.setVisible(false);}function b1(){y.setVisible(false);D.setVisible(true);k.byId("settings_Segment_btn").setSelectedKey("dynamic");var a=x.getModel("contextflat"),o=a._getValueObject(u.getProperty("/value"));if(o&&o.object.label){A.setValue(o.object.label);l1(o.object.description,o.object.tags);if(o.path==="empty"){A.setValue(o.object.label);}n1(o);}var i=k.byId("settings_current_value");i.setVisible(true);}function c1(a,v){if(!u.getProperty("/_next")){u.setProperty("/_next",{});}u.setProperty("/_next/"+a,v);}function d1(o,j){var a=[];for(var n in o){if(o[n]&&o[n].label){var v=new g({text:o[n].label});v.__data=o[n];o[n].pathvalue=(j+"/"+n).substring(1);a.push(v);var o1=d1(o[n],j+"/"+n);for(var i=0;i<o1.length;i++){v.addItem(o1[i]);}}}return a;}var e1=[{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Relative date/datetime text of the value",description:"Should be applied to dynamic values of type date or datetime or string values that represent a datetime in the format 'yyyy-MM-ddZhh:mm:ss'",example:"4 weeks ago",syntax:"handlebars",binding:"{= format.dateTime('__|VALUE|__',{relative:true})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Short date/datetime text of the value",description:"Should be applied to dynamic values of type date, date-time or text values that represent a datetime in the format 'yyyy-MM-ddZhh:mm:ss.sss'",example:"9/18/20, 2:09 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'short'})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Medium date/datetime text of the value",description:"Should be applied to dynamic values of type date, date-time or text values that represent a datetime in the format 'yyyy-MM-ddThh:mm:ss.sssZ'",example:"Sep 18, 2020, 2:09:04 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'medium'})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Long date, date-time text of the value",description:"Should be applied to dynamic values of type date or date-time or string values that represent a datetime in the format 'yyyy-MM-ddThh:mm:ss.sssZ'",example:"Sep 18, 2020, 2:09:04 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'long'})}"}];function f1(){D=new V({visible:true});D.addStyleClass("sapUiSmallMargin");A=new I({width:"100%",showValueHelp:true,valueHelpOnly:true,valueHelpRequest:function(){if(E){E.destroy();}E=new M({});F=d1(D.getModel("context").getData(),"");for(var i=0;i<F.length;i++){E.addItem(F[i]);}E.attachItemSelected(function(o){var a=o.getParameter("item").__data;l1(a.description||"",a.tags||[]);A.setValue(a.placeholder||a.label);var j=x.getModel("contextflat");n1(j._getPathObject(a.pathvalue));});A.addDependent(E);E.addStyleClass("sapUiIntegrationFieldSettingsMenu");E.openBy(A,false,null,null,"1 0");}});A.addStyleClass("selectvariable");var v=new V({items:[new d({text:"Select a dynamic value"}),A]});D.addItem(v);z=new T({text:"",maxLines:6,renderWhitespace:true});v=new V({width:"100%",items:[z]});z.addStyleClass("description");D.addItem(v);if(e1.length===-1){G=new c({width:"100%",enabled:true,change:function(){K.setText(G.getSelectedItem()._data.description);}});v=new V({visible:false,items:[new d({text:"Customize the value..."}),G]});D.addItem(v);K=new T({text:"",maxLines:4,renderWhitespace:true});K.addStyleClass("description");v=new V({width:"100%",items:[K]});D.addItem(v);D.getItems()[2].getItems()[0].addStyleClass("sapUiTinyMarginTop");}D.getItems()[0].getItems()[0].addStyleClass("sapUiTinyMarginTop");return D;}function g1(){var o=new V("settings_current_value",{width:"100%",items:[new T({text:R.getText("EDITOR_ACTUAL_VALUE")}),new I({value:{path:"currentSettings>_currentContextValue"},editable:false})]});o.addStyleClass("currentval");return o;}function h1(o,a){y=new V({visible:false});var j=new V().addStyleClass("commonSettings");y.addItem(j);j.addItem(new e({text:R.getText("EDITOR_MORE_SETTINGS_P_ADMIN")}).addStyleClass("stitle"));j.addItem(new H({items:[new d({text:R.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VISIBLE")}),new f({selected:"{= ${currentSettings>_next/visible} !== false}",select:function(v1){c1("visible",v1.getParameter("selected"));}})]}).addStyleClass("cbrow"));j.addItem(new H({items:[new d({text:R.getText("EDITOR_MORE_SETTINGS_P_ADMIN_EDIT")}),new f({selected:"{= ${currentSettings>_next/editable} !== false}",enabled:"{= ${currentSettings>_next/visible} !== false}",select:function(v1){c1("editable",v1.getParameter("selected"));}})]}).addStyleClass("cbrow"));j.addItem(new H({visible:"{= ${currentSettings>allowDynamicValues}!== false}",items:[new d({text:R.getText("EDITOR_MORE_SETTINGS_P_ADMIN_DYN")}),new f({selected:"{= ${currentSettings>_next/allowDynamicValues} !== false}",enabled:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",select:function(v1){c1("allowDynamicValues",v1.getParameter("selected"));}})]}).addStyleClass("cbrow"));if(o.values){var v;if(o.values.data){var n=o.values.data.path,o1;if(n&&n!=="/"){if(n.startsWith("/")){n=n.substring(1);}if(n.endsWith("/")){n=n.substring(0,n.length-1);}o1=n.split("/");v=O.get(["_values",o1],o);}else{v=O.get(["_values"],o);}}else if(a.getParent().getParent().getAggregation("_extension")){var p1=o.values.path;if(p1.length>1){p1=p1.substring(1);}v=O.get([p1],a.getModel().getData());}j.addItem(new H({visible:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",items:[new d({text:R.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VALUES_LIST"),tooltip:R.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VALUES_LIST_TOOLTIPS"),wrapping:false}),new B({type:"Transparent",enabled:v!==undefined,icon:{path:"currentSettings>selectedValues",formatter:function(v1){if(v1==="All"){return"sap-icon://multiselect-all";}else if(v1==="Partion"){return"sap-icon://multi-select";}else if(v1==="None"){return"sap-icon://multiselect-none";}}},tooltip:{path:"currentSettings>selectedValues",formatter:function(v1){if(v1==="All"){return R.getText("EDITOR_MORE_SETTINGS_P_ADMIN_DESELECT_ALL");}else{return R.getText("EDITOR_MORE_SETTINGS_P_ADMIN_SELECT_ALL");}}},press:i1})]}).addStyleClass("cbrow"));var q1=new l({id:"settings_pav_table",mode:"MultiSelect",width:"84%",select:j1,columns:[new p()]}).addStyleClass("tableHdr");var r1=o.values.item.text,s1=new J(v);q1.setModel(s1);var t1=new q().addStyleClass("pavlistItem");if(v){for(var i=0;i<v.length;i++){t1.addCell(new H({items:[new T({text:s.createBindingInfos(r1)}).addStyleClass("pavTblCellText")]})).addStyleClass("pavlistItem");}}q1.bindItems("/",t1);var u1=new r({id:"settings_scroll_container",height:"125px",width:"94%",vertical:true,horizontal:false,visible:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",content:[q1]}).addStyleClass("SettingsPAVTable");y.addItem(u1);}return y;}function i1(){var o=k.byId("settings_pav_table"),a=k.byId("settings_reset_to_default_btn"),i=u.getProperty("/selectedValues");if(i==="All"){o.removeSelections();u.setProperty("/selectedValues","None");}else{o.selectAll();u.setProperty("/selectedValues","All");}if(!a.getEnabled()){a.setEnabled(true);}}function j1(o){var a=o.getSource(),i=a.getSelectedItems(),j=a.getItems(),n=k.byId("settings_reset_to_default_btn");if(i.length===j.length){u.setProperty("/selectedValues","All");}else if(i.length<j.length&&i.length>0){u.setProperty("/selectedValues","Partion");}else{u.setProperty("/selectedValues","None");}if(!n.getEnabled()){n.setEnabled(true);}}function k1(a,j){a=a||[];G.removeAllItems();var n=[];G.addItem(new L({text:"No customizing needed",key:""}));for(var i=0;i<e1.length;i++){var o=e1[i],v=new L({text:o.label,key:"key"+i});v._data=o;if(o.sourceTypes.indexOf(j)>-1||a.indexOf(o.formatMethod)>-1){G.addItem(v);}else{n.push(v);}}for(var i=0;i<n.length;i++){G.addItem(n[i]);}}function l1(a,i){i=i||[];if(i.indexOf("technical")>-1){a=a+"\n"+R.getText("EDITOR_MORE_DYNAMICVALUES_TECHHINT");}z.setText(a);}function m1(o){if(e1.length===-1){if(!o){G.removeAllItems();G.addItem(new L({text:"No customizing available for this value"}));K.setText("");G.setEnabled(false);}else{k1(o.customize,o.type);G.setEnabled(true);}}}function n1(o){if(o){u.setProperty("/_hasDynamicValue",true);var a=o.value;u.setProperty("/value",a);u.setProperty("/_contextpath",o.path);if(o.object&&o.object.value&&o.object.value.indexOf("{{")===0){u.setProperty("/_currentContextValue",h.processPredefinedParameter(o.object.value));m1(o.object);}else{if(o.path==="empty"){u.setProperty("/value","");u.setProperty("/_currentContextValue","");u.setProperty("/_hasDynamicValue",false);m1();}else{m1(o.object);if(o.object&&o.object.hasOwnProperty("value")){u.setProperty("/_currentContextValue",o.object.value);}else{x.oHost.getContextValue(o.path+"/value").then(function(v){if(v===null){u.setProperty("/_currentContextValue","(not available)");}else{u.setProperty("/_currentContextValue",v);}o.object&&(o.object.value=v);});}}}}}t._private=function(){return{oPopover:W,oSegmentedButton:Q,oSettingsButton:N,oDynamicPanel:D,oSettingsPanel:y,oCurrentModel:u,updateCurrentValue:n1,oCurrentInstance:x,oDynamicValueField:A,oResetToDefaultButton:U,getMenuItems:function(){return F;},getMenu:function(){return E;}};};t.prototype.prepareFieldsInKey=function(o){this._sKeySeparator=o.values.keySeparator;if(!this._sKeySeparator){this._sKeySeparator="#";}var a=o.values.item.key;this._aFields=a.split(this._sKeySeparator);for(var n in this._aFields){if(this._aFields[n].startsWith("{")){this._aFields[n]=this._aFields[n].substring(1);}if(this._aFields[n].endsWith("}")){this._aFields[n]=this._aFields[n].substring(0,this._aFields[n].length-1);}}};t.prototype.getKeyFromItem=function(i){var a="";this._aFields.forEach(function(j){a+=i[j].toString()+this._sKeySeparator;}.bind(this));if(a.endsWith(this._sKeySeparator)){a=a.substring(0,a.length-this._sKeySeparator.length);}return a;};return t;});
