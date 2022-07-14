/*
 * ! SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/base/util/merge',"sap/base/Log"],function(m,L){"use strict";var V={};V.applyChange=function(c,p,P){var C=c.getContent();if(!C){L.error("Change does not contain sufficient information to be applied");return;}var v=p.getVariantManagement?p.getVariantManagement():p;if(v.isA("sap.ui.comp.smartvariants.SmartVariantManagement")){var r={};var o=v._getVariantContent(C.key);if(v.isPageVariant()){r.content=o&&o[C.persistencyKey];}else{r.content=o;}r.key=C.key;r.persistencyKey=C.persistencyKey;c.setRevertData(r);if((v.getSelectionKey()===C.key)){var a={};if(v.isPageVariant()){a[C.persistencyKey]=C.content;v._applyVariantByPersistencyKey(C.persistencyKey,a,"KEY_USER");}else{a=C.content;v._applyVariant(v._getPersoController(),a,"KEY_USER");}v.assignShadowContent(C.key,a);}}};V.completeChangeContent=function(c,s,p){if(!s.hasOwnProperty("content")){throw new Error("oSpecificChangeInfo.content should be filled");}if(!s.content.hasOwnProperty("key")){throw new Error("In oSpecificChangeInfo.content.key attribute is required");}if(!s.content.hasOwnProperty("persistencyKey")){throw new Error("In oSpecificChangeInfo.content.persistencyKey attribute is required");}if(!s.content.hasOwnProperty("content")){throw new Error("In oSpecificChangeInfo.content.content attribute is required");}};V.revertChange=function(c,p,P){var C=c.getRevertData();var v=p.getVariantManagement?p.getVariantManagement():p;if(C&&(v.isA("sap.ui.comp.smartvariants.SmartVariantManagement"))){if((v.getSelectionKey()===C.key)){var o={};if(v.isPageVariant()){o[C.persistencyKey]=C.content;v._applyVariantByPersistencyKey(C.persistencyKey,o,"KEY_USER");}else{o=C.content;v._applyVariant(v._getPersoController(),o,"KEY_USER");}v.assignShadowContent(C.key,o);}c.resetRevertData();}};return V;},true);
