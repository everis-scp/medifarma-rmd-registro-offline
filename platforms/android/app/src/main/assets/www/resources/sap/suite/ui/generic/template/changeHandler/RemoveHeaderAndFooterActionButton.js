/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils","sap/suite/ui/generic/template/changeHandler/generic/RemoveElement"],function(U,R){"use strict";var a={};var I="com.sap.vocabularies.UI.v1.Identification";a.applyChange=function(c,C,p){R.applyChange(c,C,p);};a.revertChange=function(c,C,p){};a.completeChangeContent=function(c,s,p){s.custom={};s.custom.annotation=I;s.custom.fnGetAnnotationIndex=U.getIndexFromInstanceMetadataPath;R.completeChangeContent(c,s,p);};return a;},true);
