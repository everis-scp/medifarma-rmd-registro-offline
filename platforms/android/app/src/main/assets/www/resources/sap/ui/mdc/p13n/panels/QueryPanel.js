/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/layout/Grid","./BasePanel","sap/ui/core/Item","sap/m/CustomListItem","sap/m/Select","sap/m/List","sap/m/HBox","sap/m/library","sap/m/Button"],function(G,B,I,C,S,L,H,l,a){"use strict";var Q=B.extend("sap.ui.mdc.p13n.panels.QueryPanel",{metadata:{library:"sap.ui.mdc",properties:{queryLimit:{type:"int",defaultValue:-1}}},renderer:{}});var b=l.ListType;var F=l.FlexJustifyContent;var c=l.ButtonType;Q.prototype.NONE_KEY="$_none";Q.prototype.init=function(){B.prototype.init.apply(this,arguments);this.setEnableReorder(true);this.addStyleClass("sapUiMDCP13nQueryPanel");};Q.prototype.setP13nModel=function(m){B.prototype.setP13nModel.apply(this,arguments);this._oListControl.removeAllItems();m.getProperty("/items").forEach(function(i){if(i[this._getPresenceAttribute()]){this._addQueryRow(i);}}.bind(this));this._addQueryRow();};Q.prototype._moveTableItem=function(i,n){this._oListControl.removeItem(i);this._oListControl.insertItem(i,n);this._updateEnableOfMoveButtons(i,false);this.fireChange({reason:"Move",item:this._getModelEntryForRow(i)});};Q.prototype._updateEnableOfMoveButtons=function(t,f){B.prototype._updateEnableOfMoveButtons.apply(this,arguments);if(this._oListControl.getItems().indexOf(t)===(this._oListControl.getItems().length-2)){this._getMoveDownButton().setEnabled(false);}};Q.prototype._createInnerListControl=function(){return new L(this.getId()+"-innerP13nList",{itemPress:[this._onItemPressed,this],dragDropConfig:this._getDragDropConfig()});};Q.prototype._getModelEntryForRow=function(r){var k=r.getContent()[0].getContent()[0]._key;var f=this.getP13nModel().getProperty("/items").find(function(o){return o.name==k;});return f;};Q.prototype._getAvailableItems=function(k){var i=this.getP13nModel().getProperty("/items");var A=[new I({key:this.NONE_KEY,text:this.getResourceText("sort.PERSONALIZATION_DIALOG_OPTION_NONE"),enabled:!k})];i.forEach(function(n,d){A.push(new I({key:n.name,text:n.label,enabled:{path:this.P13N_MODEL+">/items/"+d+"/"+this._getPresenceAttribute(),formatter:function(q){return!q;}}}));}.bind(this));return A;};Q.prototype._getMoveDownButton=function(){var m=B.prototype._getMoveDownButton.apply(this,arguments);m.setIcon("sap-icon://navigation-down-arrow");return m;};Q.prototype._getMoveUpButton=function(){var m=B.prototype._getMoveUpButton.apply(this,arguments);m.setIcon("sap-icon://navigation-up-arrow");return m;};Q.prototype.getP13nState=function(){var i=[];this._oListControl.getItems().forEach(function(d){var k=d.getContent()[0].getContent()[0]._key;if(k){var f=this.getP13nModel().getProperty("/items").find(function(o){return o.name==k;});i.push(Object.assign({},f));}}.bind(this));return i;};Q.prototype._addQueryRow=function(i){if(this.getQueryLimit()>-1&&this.getQueryLimit()===this._oListControl.getItems().length){return;}i=i?i:{name:null,descending:null};var q=this._createQueryRowGrid(i);var r=new C({type:b.Active,content:[q]});if(this.getEnableReorder()&&(this.getQueryLimit()===-1||this.getQueryLimit()>1)){this._addHover(r);}r.getContent()[0].getContent()[0]._key=i.name;this._oListControl.addItem(r);var s=!!i.name;var R=this._createRemoveButton(s);r.getContent()[0].addContent(R);return r;};Q.prototype._createQueryRowGrid=function(i){var s=this._createKeySelect(i.name);return new G({containerQuery:true,defaultSpan:"XL6 L6 M6 S6",content:[s]}).addStyleClass("sapUiTinyMargin");};Q.prototype._handleActivated=function(h){var q=h.getContent()[0];var i=q.getContent().length-1;var o=h.getContent()[0].getContent()[i];if(h&&o.getItems().length<2){o.insertItem(this._getMoveUpButton(),0);o.insertItem(this._getMoveDownButton(),1);this._updateEnableOfMoveButtons(h,false);}};Q.prototype._createKeySelect=function(k){var K=new S({width:"14rem",items:this._getAvailableItems(k),selectedKey:k,change:this._selectKey.bind(this)});return K;};Q.prototype._selectKey=function(e){var o=e.getSource().getParent().getParent();var i=this._oListControl.getItems().length-1==this._oListControl.getItems().indexOf(o);var n=e.getParameter("selectedItem").getKey();var O=e.getSource()._key;var d=o.getContent()[0].getContent()[o.getContent()[0].getContent().length-1];d.setVisible(n!==this.NONE_KEY);if(O){this._updatePresence(O,false);}e.getSource()._key=n;this._updatePresence(n,true);if(n!==this.NONE_KEY&&i){this._addQueryRow();var s=e.getSource();var N=s.getItemByKey(this.NONE_KEY);N.setEnabled(false);}};Q.prototype._createRemoveButton=function(v){var r=new H({justifyContent:F.End,width:"100%",visible:v,items:[new a({type:c.Transparent,icon:"sap-icon://decline",press:function(e){var R=e.getSource().getParent().getParent().getParent();this._oListControl.removeItem(R);this._updatePresence(R.getContent()[0].getContent()[0]._key,false);if(this._oListControl.getItems().length===0){this._addQueryRow();}}.bind(this)})]});return r;};Q.prototype._moveSelectedItem=function(){this._oSelectedItem=this._getMoveUpButton().getParent().getParent().getParent();B.prototype._moveSelectedItem.apply(this,arguments);};Q.prototype._updatePresence=function(k,A,o){var i=this.getP13nModel().getProperty("/items");var r=i.filter(function(d){return d.name===k;});if(r[0]){r[0][this._getPresenceAttribute()]=A;}this.getP13nModel().setProperty("/items",i);this.fireChange({reason:A?"Add":"Remove",item:r[0]});};return Q;});
