/*
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";var O=function(m,p,t){this._oMetaData=m;this._oParent=p;this._oTypes=t;};O.prototype.checkComboBox=function(c){var r={},d=this._oParent.getMode();if(d==="display"||d==="display_uom"){r.combobox=false;return r;}return this._checkComboBox(c);};O.prototype._checkComboBox=function(c){var r={};if(this._oMetaData.annotations.valuelist){r.valuelistType=this._oMetaData.annotations.valuelistType;r.annotation=this._oMetaData.annotations.valuelist;}if(!r.annotation){return r;}if((r.valuelistType==="fixed-values")&&!c){r.combobox=true;}if(!r.combobox){r.annotation=this._oMetaData.annotations.valuelist;r.combobox=this._checkConfig("dropDownList");}return r;};O.prototype.checkSelection=function(){var r={};if(this._oMetaData.annotations.valuelist){r.annotation=this._oMetaData.annotations.valuelist;r.selection=this._checkConfig("selection");}return r;};O.prototype.checkCheckBox=function(){var b,m;if(this._oMetaData.property&&this._oMetaData.property.property&&this._oMetaData.property.property.type==="Edm.String"){b=this._oParent.getBindingInfo("value");m=this._oTypes.getMaxLength(this._oMetaData.property,b);if(m===1){if(this._checkConfig("checkBox")){return true;}}}return false;};O.prototype.checkDatePicker=function(){if(this._oMetaData.property&&this._oMetaData.property.property&&(this._oMetaData.property.property["sap:display-format"]==="Date"||this._oTypes.isCalendarDate(this._oMetaData.property))){return true;}return this._checkConfig("datePicker");};O.prototype._checkConfig=function(t){var c=this._oParent.getConfiguration();if(c){return c.getControlType()===t;}return false;};O.prototype.getCreator=function(b){var c=true,C;var m={"Edm.Decimal":"_createEdmNumeric","Edm.Double":"_createEdmNumeric","Edm.Float":"_createEdmNumeric","Edm.Single":"_createEdmNumeric","Edm.Int16":"_createEdmNumeric","Edm.Int32":"_createEdmNumeric","Edm.Int64":"_createEdmNumeric","Edm.Byte":"_createEdmNumeric","Edm.DateTimeOffset":"_createEdmDateTimeOffset","Edm.DateTime":"_createEdmDateTime","Edm.Boolean":"_createEdmBoolean","Edm.String":"_createEdmString","Edm.Time":"_createEdmTime"};if(this._isUOMDisplayObjectStatus()){return"_createEdmUOMObjectStatus";}if(this._isUOMDisplay()){return"_createEdmUOMObjectNumber";}C=this._oParent.data("configdata");if(C&&C.configdata&&C.configdata.isUOM){if(C.configdata.getContextEditable){c=C.configdata.getContextEditable();}}if(!this._oParent.getEditable()||!this._oParent.getEnabled()||!this._oParent.getContextEditable()||!c){if(this._oMetaData.annotations){if(this.useObjectIdentifier(this.checkDatePicker())&&this._oMetaData.annotations.text&&this._oMetaData.annotations.semanticKeys&&this._oMetaData.annotations.semanticKeys.semanticKeyFields&&this._oMetaData.annotations.semanticKeys.semanticKeyFields.indexOf(this._oMetaData.path)>-1){return"_createEdmDisplay";}if(this._oMetaData.annotations.semantic&&!b){return"_createEdmSemantic";}if(this._oMetaData.annotations.uom){return"_createEdmUOMDisplay";}if(this._isObjectStatusProposed()){return"_createObjectStatus";}return(this._oMetaData.property&&this._oMetaData.property.property&&this._oMetaData.property.property.type==="Edm.Boolean")?"_createEdmBoolean":"_createEdmDisplay";}}if(this._oMetaData.annotations&&this._oMetaData.annotations.uom){return"_createEdmUOM";}if(this._oMetaData.property&&this._oMetaData.property.property){if(this._oTypes.isCalendarDate(this._oMetaData.property)){return"_createEdmDateTime";}return m[this._oMetaData.property.property.type]||"_createEdmString";}return null;};O.prototype._isUOMDisplay=function(){if(this._oMetaData.annotations.uom){if(this._isObjectNumberProposed()){if(!this._oParent.getContextEditable()||(!this._oParent.getEditable()&&!this._oParent.getUomEditable())||(!this._oParent.getEnabled()&&!this._oParent.getUomEnabled())){return true;}if(this._oParent.getProperty("uomEditState")===0){return true;}}}return false;};O.prototype._isUOMDisplayObjectStatus=function(){if(this._oMetaData.annotations.uom){if(this._isObjectStatusProposed()){if(!this._oParent.getContextEditable()||(!this._oParent.getEditable()&&!this._oParent.getUomEditable())||(!this._oParent.getEnabled()&&!this._oParent.getUomEnabled())){return true;}if(this._oParent.getProperty("uomEditState")===0){return true;}}}return false;};O.prototype._isObjectStatusProposed=function(){var p=this._oParent.getControlProposal(),s;if(p){s=p.getObjectStatus();if(s){return true;}}return false;};O.prototype._isObjectNumberProposed=function(){var p;if(this._oParent.data("suppressUnit")!=="true"){p=this._oParent.getControlProposal();if(p&&p.getControlType()==="ObjectNumber"){return true;}if(this._oParent.getProposedControl()==="ObjectNumber"){return true;}}return false;};O.prototype.useObjectIdentifier=function(d,m){var p;if(this._oMetaData&&this._oMetaData.property&&this._oMetaData.property.property&&this._oMetaData.property.property.type==="Edm.String"){if(!d&&!m){p=this._oParent.getControlProposal();if(p&&p.getControlType()==="ObjectIdentifier"){return true;}if(this._oParent.getProposedControl()==="ObjectIdentifier"){return true;}}}return false;};O.prototype.destroy=function(){this._oParent=null;this._oMetaData=null;this._oTypes=null;};return O;},true);
