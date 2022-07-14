/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/base/Log","sap/m/SegmentedButton"],function(q,L,S){"use strict";return S.extend("com.sap.ip.bi.SegmentedButton",{metadata:{properties:{dsControlProperties:{type:"object"},dsComponentProperties:{type:"object"},height:"sap.ui.core.CSSSize",width:"sap.ui.core.CSSSize",cssStyle:"string"}},initDesignStudio:function(){},itemsReference:[],renderer:{},afterDesignStudioUpdate:function(){},setSelectedText:function(t){this.selectedText=t;},setSelectedValue:function(v){if(v){this.selectedValue=v;var b=this.getButtons();for(var i=0;i<b.length;i++){if(b[i].value===this.selectedValue){this.setSelectedButton(b[i]);}}}},getSelectedText:function(){return this.selectedText;},getSelectedValue:function(){return this.selectedValue;},removeAllItems:function(){},setButtonItems:function(a){this.destroyItems();this.removeAllItems();this.removeAllButtons();var t=this;var p=function(e){t.setSelectedText(e.oSource.mProperties.text);t.setSelectedValue(e.oSource.value);t.fireDesignStudioPropertiesChanged(["selectedValue"]);t.fireDesignStudioPropertiesChanged(["selectedText"]);t.fireDesignStudioEvent("onClick");};for(var i=0;i<a.length;i++){var b=a[i];var c=this.createButton(b.text,b.image,!b.disabled);if(b.tooltip){c.setTooltip(b.tooltip);}c.attachPress(p);c.value=b.value;if(this.getSelectedValue()===c.value){this.setSelectedButton(c);}}},getITEMS:function(){return this.ITEMS;},onAfterRendering:function(){var t=this;q(t.getDomRef()).css("transform","scale(0.82) translateY(-5px)");}});});
