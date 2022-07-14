/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/content/DefaultContent","sap/ui/model/BindingMode"],function(D,B){"use strict";var S=Object.assign({},D,{getEdit:function(){return["sap/m/SearchField"];},getEditMulti:function(){return[null];},getEditMultiLine:function(){return[null];},getUseDefaultEnterHandler:function(){return false;},getUseDefaultFieldHelp:function(){return false;},createEdit:function(c,C,i){var a=C[0];var o=c.getConditionsType();c.setHideOperator(true);c.updateConditionType();var b=new a(i,{value:{path:"$field>/conditions",type:o,mode:B.OneWay},placeholder:"{$field>/placeholder}",width:"100%",tooltip:"{$field>/tooltip}",search:c.getHandleEnter(),change:c.getHandleContentChange(),liveChange:c.getHandleContentLiveChange()});c.setAriaLabelledBy(b);c.setBoundProperty("value");return[b];},createEditMulti:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createEditMulti not defined!");},createEditMultiLine:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createEditMultiLine not defined!");}});return S;});