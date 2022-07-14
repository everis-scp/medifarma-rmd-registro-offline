/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/descriptorRelated/internal/Utils","sap/ui/fl/write/_internal/appVariant/AppVariantInlineChange"],function(U,A){"use strict";function _(p){if(!p.texts){p.texts={"":p.content};p.content={};}}function a(p){var o=new A(p);return Promise.resolve(o);}var b={};b.createNew=function(p){var o=new A(p);return Promise.resolve(o);};b.createDescriptorInlineChange=function(p){var t=p.changeType.replace("appdescr","create");return this[t](p);};b.create_ovp_addNewCard=function(p){U.checkParameterAndType(p.content,"card","object");return a(p);};b.create_ovp_removeCard=function(p){U.checkParameterAndType(p.content,"cardId","string");return a(p);};b.create_ovp_changeCard=function(p){U.checkParameterAndType(p.content,"cardId","string");U.checkEntityPropertyChange(p.content);return a(p);};b.create_app_addNewInbound=function(p){U.checkParameterAndType(p.content,"inbound","object");return a(p);};b.create_app_removeInbound=function(p){U.checkParameterAndType(p.content,"inboundId","string");return a(p);};b.create_app_removeAllInboundsExceptOne=function(p){U.checkParameterAndType(p.content,"inboundId","string");return a(p);};b.create_app_changeInbound=function(p){U.checkParameterAndType(p.content,"inboundId","string");U.checkEntityPropertyChange(p.content);return a(p);};b.create_app_addNewOutbound=function(p){U.checkParameterAndType(p.content,"outbound","object");return a(p);};b.create_app_removeOutbound=function(p){U.checkParameterAndType(p.content,"outboundId","string");return a(p);};b.create_app_changeOutbound=function(p){U.checkParameterAndType(p.content,"outboundId","string");U.checkEntityPropertyChange(p.content);return a(p);};b.create_app_addNewDataSource=function(p){U.checkParameterAndType(p.content,"dataSource","object");return a(p);};b.create_app_removeDataSource=function(p){U.checkParameterAndType(p.content,"dataSourceId","string");return a(p);};b.create_app_changeDataSource=function(p){U.checkParameterAndType(p.content,"dataSourceId","string");U.checkEntityPropertyChange(p.content);return a(p);};var T={BEGINNING:"BEGINNING",END:"END"};b.create_app_addAnnotationsToOData=function(p){U.checkParameterAndType(p.content,"dataSourceId","string");U.checkParameterAndType(p.content,"annotations","array");U.checkParameterAndType(p.content,"dataSource","object");return a(p);};b.create_app_setTitle=function(p){_(p);return a(p).then(function(d){d.setHostingIdSuffix("_sap.app.title");return d;});};b.create_app_setSubTitle=function(p){_(p);return a(p).then(function(d){d.setHostingIdSuffix("_sap.app.subTitle");return d;});};b.create_app_setShortTitle=function(p){_(p);return a(p).then(function(d){d.setHostingIdSuffix("_sap.app.shortTitle");return d;});};b.create_app_setDescription=function(p){_(p);return a(p).then(function(d){d.setHostingIdSuffix("_sap.app.description");return d;});};b.create_app_setInfo=function(p){_(p);return a(p).then(function(d){d.setHostingIdSuffix("_sap.app.info");return d;});};b.create_app_setAch=function(p){U.checkParameterAndType(p.content,"ach","string");return a(p);};b.create_app_setDestination=function(p){U.checkParameterAndType(p.content,"destination","object");return a(p);};b.create_app_setKeywords=function(p){U.checkParameterAndType(p.content,"keywords","array");return a(p);};b.create_app_addTechnicalAttributes=function(p){U.checkParameterAndType(p.content,"technicalAttributes","array");return a(p);};b.create_app_removeTechnicalAttributes=function(p){U.checkParameterAndType(p.content,"technicalAttributes","array");return a(p);};b.create_app_addCdsViews=function(p){U.checkParameterAndType(p.content,"cdsViews","array");return a(p);};b.create_app_removeCdsViews=function(p){U.checkParameterAndType(p.content,"cdsViews","array");return a(p);};b.create_flp_setConfig=function(p){U.checkParameterAndType(p.content,"config","object");return a(p);};b.create_ui5_addNewModel=function(p){U.checkParameterAndType(p.content,"model","object");return a(p);};b.create_ui5_removeModel=function(p){U.checkParameterAndType(p.content,"modelId","string");return a(p);};b.create_ui5_addNewModelEnhanceWith=function(p){U.checkParameterAndType(p.content,"modelId","string");return a(p);};b.create_ui5_replaceComponentUsage=function(p){U.checkParameterAndType(p.content,"componentUsageId","string");U.checkParameterAndType(p.content,"componentUsage","object");return a(p);};b.create_ui5_addLibraries=function(p){U.checkParameterAndType(p.content,"libraries","object");return a(p);};b.create_ui5_addComponentUsages=function(p){U.checkParameterAndType(p.content,"componentUsages","object");return a(p);};b.create_ui5_setMinUI5Version=function(p){U.checkParameterAndType(p.content,"minUI5Version","string");return a(p);};b.create_smb_addNamespace=function(p){U.checkParameterAndType(p.content,"smartBusinessApp","object");return a(p);};b.create_smb_changeNamespace=function(p){U.checkParameterAndType(p.content,"smartBusinessApp","object");return a(p);};b.create_ui_generic_app_setMainPage=function(p){U.checkParameterAndType(p.content,"page","object");return a(p);};b.create_ui_setIcon=function(p){U.checkParameterAndType(p.content,"icon","string");return a(p);};b.create_ui_setDeviceTypes=function(p){U.checkParameterAndType(p.content,"deviceTypes","object");return a(p);};b.create_url_setUri=function(p){U.checkParameterAndType(p.content,"uri","string");return a(p);};b.create_fiori_setRegistrationIds=function(p){U.checkParameterAndType(p.content,"registrationIds","array");return a(p);};b.create_ui5_setFlexExtensionPointEnabled=function(p){U.checkParameterAndType(p.content,"flexExtensionPointEnabled","boolean");U.checkParameterAndType(p,"changeType","string");return a(p);};return b;});
