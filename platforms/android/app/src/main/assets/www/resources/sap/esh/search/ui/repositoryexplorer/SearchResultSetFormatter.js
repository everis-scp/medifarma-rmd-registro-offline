/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
if(!window.define){window.define=sap.ui.define;window.define.amd=true;}if(!window.require){window.require=sap.ui.require;}sap.ui.define(["../sinaNexTS/core/core","../sinaNexTS/sina/formatters/Formatter","../sinaNexTS/core/util"],function(c,F,u){"use strict";var R=function(){};R.prototype=c.extend(new F.Formatter(),{urlTemplates:{DWC_ERMODEL:"#/databuilder&/db/{{space_name}}/{{name}}",DWC_VIEW:{DWC_CUBE:"#/businessbuilder&/bb/{{space_name}}/{{name}}","*":"#/databuilder&/db/{{space_name}}/{{name}}",},DWC_LOCAL_TABLE:"#/databuilder&/db/{{space_name}}/{{name}}",DWC_REMOTE_TABLE:"#/databuilder&/db/{{space_name}}/{{name}}",DWC_DATAFLOW:"#/databuilder&/db/{{space_name}}/{{name}}",DWC_IDT:"#/databuilder&/db/{{space_name}}/{{name}}",DWC_DAC:"#/authorizations&/auth/{{space_name}}/{{name}}/edit/",},initAsync:function(){},extractAttributes:function(a){var o={};for(var i=0;i<a.attributes.length;++i){var b=a.attributes[i];o[b.id]=b.value;}return o;},getTemplate:function(t,b){var a=this.urlTemplates[t];if(typeof a==="string"){return a;}if(typeof a==="object"){var d=a;a=d[b];if(a){return a;}a=d["*"];if(a){return a;}return null;}return null;},formatAsync:function(r){for(var i=0;i<r.items.length;++i){var a=r.items[i];this.insertAdditionalAttribute(a);this.insertTitleShareIcon(a);var b=this.extractAttributes(a);var d=this.getTemplate(b["technical_type"],b["business_type"]);if(!d){continue;}var e=u.evaluateTemplate(d,b);a.defaultNavigationTarget=r.sina._createNavigationTarget({targetUrl:e,});a.defaultNavigationTarget.parent=a;}return Promise.resolve(r);},findAttribute:function(a,b){var d=null;for(var i=0;i<a.attributes.length;i++){if(b===a.attributes[i].id){d=a.attributes[i];break;}}return d;},insertAdditionalAttribute:function(i){var a=this.findAttribute(i,"id");var f=this.findAttribute(i,"favorites_user_id");var b=this.findAttribute(i,"business_name");var d=this.findAttribute(i,"business_type");var e=this.findAttribute(i,"business_purpose_description");var t=this.findAttribute(i,"name");var g=this.findAttribute(i,"technical_type");var h=this.findAttribute(i,"technical_type_description");var s=this.findAttribute(i,"space_name");i.additionalAttributes={idAttribute:a,favoriteUserId:f,businessName:b,businessType:d,businessPurposeDescription:e,technicalName:t,technicalType:g,technicalTypeDescription:h,spaceName:s,};},insertTitleShareIcon:function(i){var a=this.findAttribute(i,"is_shared");if(a){a.infoIconUrl="";if(a.value==="Shared"){a.infoIconUrl="sap-icon://share-2";}i.titleAttributes.push(a);}},});return R;});