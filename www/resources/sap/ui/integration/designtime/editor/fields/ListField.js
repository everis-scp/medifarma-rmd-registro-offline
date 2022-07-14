/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/editor/fields/BaseField","sap/m/Input","sap/m/Text","sap/m/MultiComboBox","sap/ui/core/ListItem","sap/base/util/each","sap/base/util/restricted/_debounce","sap/base/util/ObjectPath","sap/base/util/includes","sap/ui/core/SeparatorItem","sap/ui/core/Core","sap/ui/model/Sorter","sap/base/util/deepClone"],function(B,I,T,M,L,e,_,O,i,S,C,b,d){"use strict";var D="#";var r=C.getLibraryResourceBundle("sap.ui.integration");var c=B.extend("sap.ui.integration.designtime.editor.fields.ListField",{metadata:{library:"sap.ui.integration"},renderer:B.getMetadata().getRenderer()});c.prototype.initVisualization=function(o){var t=this;var v=o.visualization;if(!v){if(o.values){var f=this.formatListItem(o.values.item);v={type:M,settings:{selectedKeys:{path:'currentSettings>value'},busy:{path:'currentSettings>_loading'},editable:o.editable,visible:o.visible,showSecondaryValues:true,width:"100%",items:{path:"",template:f,sorter:[new b({path:'Selected',descending:false,group:true})],groupHeaderFactory:t.getGroupHeader}}};if(this.isFilterBackend()){v.settings.selectedKeys={parts:['currentSettings>value','currentSettings>suggestValue'],formatter:function(V,s){if(s){t.setSuggestValue();}return V;}};}}else{v={type:I,settings:{value:{path:'currentSettings>value',formatter:function(a){a=a||[];return a.join(",");}},change:function(E){var s=E.getSource();s.getBinding("value").setRawValue(s.getValue().split(","));},editable:o.editable,visible:o.visible,placeholder:o.placeholder}};}}this._visualization=v;this.attachAfterInit(this._afterInit);};c.prototype._afterInit=function(){var o=this.getAggregation("_field");if(o instanceof M){var a=this.getConfiguration();this.prepareFieldsInKey(a);if(this.isFilterBackend()){this.onInput=_(this.onInput,500);o.oninput=this.onInput;o.attachSelectionChange(this.onSelectionChangeForFilterBackend);o.attachSelectionFinish(this.onSelectionFinish);var m=this.getModel();m.attachPropertyChange(this.mergeSelectedItems,this);}else{o.attachSelectionChange(this.onSelectionChange);}}};c.prototype.prepareFieldsInKey=function(o){this._sKeySeparator=o.values.keySeparator;if(!this._sKeySeparator){this._sKeySeparator=D;}var k=o.values.item.key;this._aFields=k.split(this._sKeySeparator);for(var n in this._aFields){if(this._aFields[n].startsWith("{")){this._aFields[n]=this._aFields[n].substring(1);}if(this._aFields[n].endsWith("}")){this._aFields[n]=this._aFields[n].substring(0,this._aFields[n].length-1);}}};c.prototype.getKeyFromItem=function(o){var s="";this._aFields.forEach(function(f){s+=o[f].toString()+this._sKeySeparator;}.bind(this));if(s.endsWith(this._sKeySeparator)){s=s.substring(0,s.length-this._sKeySeparator.length);}return s;};c.prototype.mergeSelectedItems=function(E){var o=this.getConfiguration();if(!o.valueItems){o.valueItems=[];}var p=o.values.data.path||"/";var v=this.getModel();var a=v.getData();if(p!=="/"){if(p.startsWith("/")){p=p.substring(1);}if(p.endsWith("/")){p=p.substring(0,p.length-1);}var P=p.split("/");var R=O.get(P,a);if(Array.isArray(R)){var s=o.valueItems.map(function(h){return this.getKeyFromItem(h);}.bind(this));var f=R.filter(function(h){var j=this.getKeyFromItem(h);return!i(s,j);}.bind(this));var g=f.filter(function(h){return h.Selected===r.getText("CARDEDITOR_ITEM_SELECTED");});o.valueItems=o.valueItems.concat(g);var n=f.filter(function(h){return h.Selected!==r.getText("CARDEDITOR_ITEM_SELECTED");});R=o.valueItems.concat(n);}else{R=o.valueItems;}O.set(P,R,a);}else if(Array.isArray(a)){var s=o.valueItems.map(function(h){return this.getKeyFromItem(h);}.bind(this));var f=a.filter(function(h){var j=this.getKeyFromItem(h);return!i(s,j);}.bind(this));var g=f.filter(function(h){return h.Selected===r.getText("CARDEDITOR_ITEM_SELECTED");});o.valueItems=o.valueItems.concat(g);var n=f.filter(function(h){return h.Selected!==r.getText("CARDEDITOR_ITEM_SELECTED");});a=o.valueItems.concat(n);}else{a=o.valueItems;}v.setData(a);this.setSuggestValue();};c.prototype.setSuggestValue=function(){var o=this.getAggregation("_field");var s=this.getBindingContext("currentSettings").sPath;var a=this.getModel("currentSettings");var f=a.getProperty(s+"/suggestValue");if(f&&f!==""){o.setValue(f.replaceAll("\'\'","'"));}};c.prototype.getSuggestValue=function(){var s=this.getBindingContext("currentSettings").sPath;var o=this.getModel("currentSettings");return o.getProperty(s+"/suggestValue");};c.prototype.getGroupHeader=function(g){return new S({text:g.key});};c.prototype.onSelectionChangeForFilterBackend=function(E){var f=E.oSource.getParent();var o=f.getConfiguration();var l=E.getParameter("changedItem");var s=l.getKey();var a=E.getParameter("selected");var g=this.getModel().getData();var p=o.values.data.path||"/";var P,h;if(p!=="/"){if(p.startsWith("/")){p=p.substring(1);}if(p.endsWith("/")){p=p.substring(0,p.length-1);}P=p.split("/");h=O.get(P,g);}else{h=g;}if(h){if(!o.valueItems){o.valueItems=[];}var n=[];h.forEach(function(j){var N=d(j,10);var k=f.getKeyFromItem(N);if(k===s){if(a){N.Selected=r.getText("CARDEDITOR_ITEM_SELECTED");o.valueItems=o.valueItems.concat([N]);}else{N.Selected=r.getText("CARDEDITOR_ITEM_UNSELECTED");o.valueItems=o.valueItems.filter(function(m){var k=f.getKeyFromItem(m);return k!==s;});}}n.push(N);});if(P!==undefined){O.set(P,n,g);this.getModel().checkUpdate(true);}else{this.getModel().setData(n);}}};c.prototype.onSelectionChange=function(E){var f=E.oSource.getParent();var o=f.getConfiguration();var l=E.getParameter("changedItem");var s=l.getKey();var a=E.getParameter("selected");var g=this.getModel().getData();var p=o.values.data.path||"/";if(p!=="/"){if(p.startsWith("/")){p=p.substring(1);}if(p.endsWith("/")){p=p.substring(0,p.length-1);}var P=p.split("/");var R=O.get(P,g);if(Array.isArray(R)){for(var n in R){var h=f.getKeyFromItem(R[n]);if(h===s){if(a){R[n].Selected=r.getText("CARDEDITOR_ITEM_SELECTED");}else{R[n].Selected=r.getText("CARDEDITOR_ITEM_UNSELECTED");}}}O.set(P,R,g);}}else if(Array.isArray(g)){for(var n in g){var h=f.getKeyFromItem(g[n]);if(h===s){if(a){g[n].Selected=r.getText("CARDEDITOR_ITEM_SELECTED");}else{g[n].Selected=r.getText("CARDEDITOR_ITEM_UNSELECTED");}}}}this.getModel().setData(g);this.getModel().checkUpdate(true);};c.prototype.onSelectionFinish=function(E){var f=this.getParent();var o=f.getConfiguration();var s=E.getParameter("selectedItems").map(function(k){return k.getKey();});var a=this.getModel().getData();var p=o.values.data.path||"/";if(p!=="/"){if(p.startsWith("/")){p=p.substring(1);}if(p.endsWith("/")){p=p.substring(0,p.length-1);}var P=p.split("/");a=O.get(P,a);}if(a){o.valueItems=a.filter(function(k){var l=f.getKeyFromItem(k);return i(s,l);});}var g=this.getBindingContext("currentSettings").sPath;var h=this.getModel("currentSettings");h.setProperty(g+"/value",s);var j=f.getSuggestValue();if(j&&j!==""){h.setProperty(g+"/suggestValue","");}};c.prototype.onInput=function(E){var t=E.target.value;var s=this.getBindingContext("currentSettings").sPath;var o=this.getModel("currentSettings");o.setProperty(s+"/suggestValue",t.replaceAll("'","\'\'"));o.setProperty(s+"/_loading",true);E.srcControl.open();E.srcControl._getSuggestionsPopover()._sTypedInValue=t;};return c;});
