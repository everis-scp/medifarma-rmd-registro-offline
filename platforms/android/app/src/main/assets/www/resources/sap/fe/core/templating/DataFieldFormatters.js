/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/templating/UIFormatters","sap/fe/core/templating/DataModelPathHelper","sap/fe/core/converters/MetaModelConverter"],function(U,D,M){"use strict";var _={};var g=M.getInvolvedDataModelObjects;var e=D.enhanceDataModelPath;var a=U.getConverterContext;var b=function(C,I){var p=I.context.getPath();if(!C){throw new Error("Unresolved context path "+p);}var d=false;if(typeof C==="object"&&(C.hasOwnProperty("$Path")||C.hasOwnProperty("$AnnotationPath"))){d=true;}else if(typeof C==="object"&&C.hasOwnProperty("$kind")&&C.$kind!=="Property"){throw new Error("Context does not resolve to a DataField object but to a "+C.$kind);}var o=a(C,I);if(d){o=o.$target;}return o;};_.getDataField=b;var c=function(C,I){var p=I.context.getPath();if(!C){throw new Error("Unresolved context path "+p);}if(typeof C==="object"&&C.hasOwnProperty("$kind")&&C.$kind!=="Property"){throw new Error("Context does not resolve to a Property object but to a "+C.$kind);}var d=g(I.context);if(d.targetObject&&d.targetObject.type==="Path"){d=e(d,d.targetObject.path);}if(d.targetObject&&d.targetObject.type==="AnnotationPath"){d=e(d,d.targetObject);}if(p.endsWith("$Path")||p.endsWith("$AnnotationPath")){d=e(d,C);}return d;};_.getDataFieldObjectPath=c;var i=function(C,I){var d=b(C,I);return d.$Type==="com.sap.vocabularies.UI.v1.ConnectedFieldsType";};_.isSemanticallyConnectedFields=i;return _;},false);
