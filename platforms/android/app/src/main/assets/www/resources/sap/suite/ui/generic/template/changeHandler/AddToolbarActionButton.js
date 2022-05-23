/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

		(c) Copyright 2009-2015 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/suite/ui/generic/template/changeHandler/util/ChangeHandlerUtils","sap/suite/ui/generic/template/changeHandler/util/AnnotationChangeUtilsV2"],function(U,A){"use strict";var a={};var L="com.sap.vocabularies.UI.v1.LineItem";var D="com.sap.vocabularies.UI.v1.DataFieldForAction";var I="com.sap.vocabularies.UI.v1.Importance";var b="com.sap.vocabularies.UI.v1.ImportanceType/High";a.applyChange=function(c,C,p){var d=c.getDefinition();if(!d.transferred){var P=c.getContent().customChanges[0].parentElementId;var o=c.getContent().customChanges[0].oParentSelector;var e=p.modifier.bySelector(o);var n=c.getContent().newFunctionImport;var N="action::"+n.replace("/","::");var s=P.substring(0,P.lastIndexOf("--"));N=s+N;var f=new sap.m.Button(N,{text:'New Action'});f.addCustomData(new sap.ui.core.CustomData({"key":"Action","value":n}));if(P.indexOf("--template::ListReport::TableToolbar")>-1){e.insertContent(f,c.getContent().customChanges[0].targetIndex);}else{e.getHeaderToolbar().insertContent(f,c.getContent().customChanges[0].targetIndex);}}};a.revertChange=function(c,C,p){};a.completeChangeContent=function(c,s,p){var m=U.getMetaModel(s,p);var S=p.modifier.bySelector(s.selector.id,p.appComponent);var P=S.getParent();var o=p.modifier.getSelector(P.getId(),p.appComponent);var C=U.getComponent(S);var e=U.getODataEntitySet(C).entityType;var E=m.getODataEntityType(e);var l=E[L];var d=l.slice();var B=[];if(S.getParent().getId().indexOf("--template::ListReport::TableToolbar")>-1){B=S.getParent().getContent();}else{B=S.getContent();}var f=-1;B.some(function(k,i){if(k.getId&&k.getId()===s.selector.id){f=i;return true;}});var g=-1;for(var i=f+1;i<B.length;i++){g=U.getLineItemRecordIndexForButton(B[i],l);if(g>=0){break;}}if(g===-1){g=l.length;}var n={Label:{String:"My new Action"},Action:{String:s.content.newFunctionImport},RecordType:D};n[I]={EnumMember:b};l.splice(g,0,n);var h=A.createCustomAnnotationTermChange(e,l,d,L);h.targetIndex=f+1;h.parentElementId=P.getId();h.oParentSelector=o;var j=A.createCustomChanges(h);jQuery.extend(true,c.getContent(),j);};return a;},true);
