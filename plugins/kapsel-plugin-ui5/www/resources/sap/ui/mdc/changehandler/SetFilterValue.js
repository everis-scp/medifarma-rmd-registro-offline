/*!
 * SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/fl/changeHandler/Base','sap/ui/core/CustomData'],function(B,C){"use strict";var S={};S.createChange=function(p){if(!p.control){throw new Error("Invalid control. The existing control object is mandatory.");}return{selectorElement:p.control,changeSpecificData:{changeType:"setFilterValue",content:{path:p.key,conditions:p.conditions}}};};S.completeChangeContent=function(c,s,p){};S.applyChange=function(c,o,p){if(!o.getUiState){return B.markAsNotApplicable("We can apply the 'setFilterValue' change only during runtime, therefore the change can not be applied during XML processing.",true);}var u=p.modifier.getAggregation(o,"uiState");if(!u){u=p.modifier.createControl("sap.ui.mdc.base.state.UiState",p.appComponent,p.view,undefined);p.modifier.insertAggregation(o,"uiState",u);}var s=p.modifier.getAggregation(u,"selectOptions").filter(function(a){return a.getPropertyName()===c.getContent().path;});c.setRevertData({conditions:s[0]?s[0].getCustomData("conditions")[0].getValue().conditions:[]});s.forEach(function(a){p.modifier.removeAggregation(u,"selectOptions",a);});var a=p.modifier.createControl("sap.ui.mdc.base.state.SelectOption",p.appComponent,p.view,undefined,{propertyName:c.getContent().path,customData:new C({key:"conditions",value:{conditions:c.getContent().conditions}})});p.modifier.insertAggregation(u,"selectOptions",a);if(o.applyFiltersAfterChangesApplied){o.applyFiltersAfterChangesApplied();}};S.revertChange=function(c,o,p){if(!o.getUiState){return B.markAsNotApplicable("We can apply the 'setFilterValue' change only during runtime, therefore the change can not be applied during XML processing.",true);}var u=p.modifier.getAggregation(o,"uiState");if(!u){u=p.modifier.createControl("sap.ui.mdc.base.state.UiState",p.appComponent,p.view,undefined);p.modifier.insertAggregation(o,"uiState",u);}p.modifier.getAggregation(u,"selectOptions").filter(function(s){return s.getPropertyName()===c.getContent().path;}).forEach(function(s){p.modifier.removeAggregation(u,"selectOptions",s);});var s=p.modifier.createControl("sap.ui.mdc.base.state.SelectOption",p.appComponent,p.view,undefined,{propertyName:c.getContent().path,customData:new C({key:"conditions",value:{conditions:c.getRevertData().conditions}})});p.modifier.insertAggregation(u,"selectOptions",s);c.resetRevertData();if(o.applyFiltersAfterChangesApplied){o.applyFiltersAfterChangesApplied();}};return S;},true);