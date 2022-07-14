/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/mdc/FilterBarDelegate","sap/ui/model/json/JSONModel","sap/fe/core/TemplateModel","sap/fe/macros/CommonHelper","sap/fe/core/CommonUtils","sap/fe/core/helpers/ModelHelper","sap/fe/core/helpers/StableIdHelper","sap/fe/macros/field/FieldHelper","sap/fe/macros/filter/FilterFieldHelper","sap/fe/macros/filter/FilterUtils","sap/ui/mdc/odata/v4/TypeUtil","sap/fe/macros/ResourceModel","sap/base/util/merge","sap/fe/macros/DelegateUtil","sap/fe/macros/FilterBarHelper","sap/base/Log","sap/base/util/JSTokenizer","sap/fe/core/templating/PropertyFormatters"],function(F,J,T,C,c,M,S,d,e,f,g,R,m,D,h,L,i,P){"use strict";var O=Object.assign({},F),E="$editState",j="$search",V="FilterFieldValueHelp",k="sap_fe_FilterBarDelegate_propertyInfoMap",l=/\+|\*/g;var n=c.FilterRestrictions;function _(){return{name:j,path:j,typeConfig:g.getTypeConfig("sap.ui.model.odata.type.String"),maxConditions:1};}function o(){return{name:E,path:E,groupLabel:"",group:"",label:R.getText("M_COMMON_FILTERBAR_EDITING_STATUS"),tooltip:null,hiddenFilter:false,typeConfig:g.getTypeConfig("sap.ui.model.odata.type.String")};}function p(I,a){var b=new J({id:I}),B={bindingContexts:{"this":b.createBindingContext("/")},models:{"this.i18n":R.getModel(),"this":b}};return D.templateControlFragment("sap.fe.macros.filter.DraftEditState",B,undefined,a).finally(function(){b.destroy();});}function q(a,I,b,B,G){var H=new J({id:I}),K=new T(b,B),N={bindingContexts:{"this":H.createBindingContext("/"),"item":K.createBindingContext("/")},models:{"this":H,"item":K}};return D.templateControlFragment("sap.fe.macros.filter.CustomFilter",N,undefined,G).finally(function(){H.destroy();K.destroy();});}function r(a){return a.replace(l,"");}function s(a,b){return a.find(function(B){return B.conditionPath===b&&B.availability!=="Hidden";});}function t(a){return{name:a.conditionPath,path:a.conditionPath,groupLabel:a.groupLabel,group:a.group,label:a.label,tooltip:null,hiddenFilter:a.availability==="Hidden",removeFromAppState:false,hasValueHelp:false,display:"Value",typeConfig:g.getTypeConfig("String"),isParameter:a.isParameter};}function u(a,b){var B=t(b),G=b.annotationPath;if(!G){return B;}var H=G.substr(0,G.lastIndexOf("/")),I=a.getObject(G),K=a.getObject(G+"@"),N=a.getObject(H+"/@"),Q,U,W=a.createBindingContext(G),X=i.parseJS(e.formatOptions(I,{context:W})||"{}"),Y=i.parseJS(e.constraints(I,{context:W})||"{}"),Z=K["@com.sap.vocabularies.PersonalData.v1.IsPotentiallySensitive"]||K["@com.sap.vocabularies.UI.v1.ExcludeFromNavigationContext"]||K["@com.sap.vocabularies.Analytics.v1.Measure"];var $=C.getLocationForPropertyPath(a,b.annotationPath);var a1=b.annotationPath.replace($+"/","");if(!c.isPropertyFilterable(a,$,r(a1),true)){return null;}U=K["@com.sap.vocabularies.Common.v1.FilterDefaultValue"];if(U){Q=U["$"+D.getModelType(I.$Type)];}B=Object.assign(B,{tooltip:K["@com.sap.vocabularies.Common.v1.QuickInfo"]||undefined,removeFromAppState:Z,hasValueHelp:P.hasValueHelp(W.getObject(),{context:W}),formatOptions:X,constraints:Y,typeConfig:g.getTypeConfig(I.$Type,X,Y),display:d.displayMode(K,N),defaultFilterConditions:Q?[{fieldPath:b.conditionPath,operator:"EQ",values:[Q]}]:undefined});return B;}function v(a,b,N){return N?S.generate([a,b,N]):S.generate([a,b]);}function w(a,b){return Promise.resolve().then(function(){var B=new J({idPrefix:b.sVhIdPrefix,conditionModel:"$filters",navigationPrefix:b.sNavigationPrefix?"/"+b.sNavigationPrefix:"",filterFieldValueHelp:true,useSemanticDateRange:b.bUseSemanticDateRange}),G=m({},a,{bindingContexts:{"this":B.createBindingContext("/")},models:{"this":B}});return D.templateControlFragment("sap.fe.macros.internal.valuehelp.ValueHelp",G,{isXML:a.isXML}).then(function(H){if(H){var I="dependents";if(H.length){H.forEach(function(K){if(b.oModifier){b.oModifier.insertAggregation(b.oControl,I,K,0);}else{b.oControl.insertAggregation(I,K,0,false);}});}else if(b.oModifier){b.oModifier.insertAggregation(b.oControl,I,H,0);}else{b.oControl.insertAggregation(I,H,0,false);}}}).finally(function(){B.destroy();});}).catch(function(B){L.error("Error while evaluating DelegateUtil.isValueHelpRequired",B);});}function x(a,b){var B=new J({idPrefix:b.sIdPrefix,vhIdPrefix:b.sVhIdPrefix,propertyPath:b.sPropertyName,navigationPrefix:b.sNavigationPrefix?"/"+b.sNavigationPrefix:"",useSemanticDateRange:b.bUseSemanticDateRange,settings:b.oSettings,bHasVisualFilter:b.visualFilter?true:undefined});var G=m({},a,{bindingContexts:{"this":B.createBindingContext("/")},models:{"this":B}});return D.templateControlFragment("sap.fe.macros.FilterField",G,{isXML:a.isXML}).finally(function(){B.destroy();});}O.addItem=function(a,b,B){if(!B){return O._addP13nItem(a,b);}var G=B.appComponent&&B.appComponent.getModel().getMetaModel();if(!G){return Promise.resolve(null);}return O._addFlexItem(a,b,G,B.modifier);};O._addP13nItem=function(a,b){return D.fetchModel(b).then(function(B){return O._addFlexItem(a,b,B.getMetaModel(),undefined);}).catch(function(B){L.error("Model could not be resolved",B);return null;});};O.fetchPropertiesForEntity=function(a,b,B){var G=b.getObject(a);if(!B||!G){return[];}var H=M.getEntitySetPath(a),I=f.getConvertedFilterFields(B,a),K,N=[],Q=[],U=c.getFilterRestrictionsByPath(H,b),W=U[n.REQUIRED_PROPERTIES],X=U[n.NON_FILTERABLE_PROPERTIES],Y=U[n.ALLOWED_EXPRESSIONS];Object.keys(I).forEach(function($){var a1=I[$];var b1=r(a1.conditionPath);if(X.indexOf(b1)===-1){K=u(b,a1);if(K){if(Y[b1]&&Y[b1].length>0){K.filterExpression=c.getSpecificAllowedExpression(Y[b1]);}else{K.filterExpression="auto";}K.maxConditions=!K.isParameter&&D.isMultiValue(K)?-1:1;K.required=K.isParameter||W.indexOf(b1)>=0;K.visible=a1.availability==="Default";K.label=D.getLocalizedText(a1.label,B);N.push(K);if(K.isParameter){Q.push(b1);}}}});if(B.data("showDraftEditState")){N.push(o());}if(H&&B.data("hideBasicSearch")!=="true"){var Z=c.getSearchRestrictions(H,b);if(!Z||Z.Searchable){N.push(_());}}D.setCustomData(B,"parameters",Q);return N;};O._addFlexItem=function(a,b,B,G){var H=G?G.getId(b):b.getId(),I=G?"":"Adaptation",K=f.getConvertedFilterFields(b),N=s(K,a),Q=r(a),U=!!G&&G.targets==="xmlTree";if(a===E){return p(H,G);}else if(a===j){return Promise.resolve(null);}else if(N&&N.template){return q(b,v(H,I+"FilterField"),N,B,G);}var W=C.getNavigationPath(Q),X=N.annotationPath,Y=N.isParameter?X.substr(0,X.lastIndexOf("/")+1):D.getCustomData(b,"entityType",G),Z=B.createBindingContext(Y+Q),H=G?G.getId(b):b.getId(),$={bindingContexts:{"entityType":B.createBindingContext(Y),"property":Z},models:{"entityType":B,"property":B},isXML:U},a1="/"+M.getEntitySetPath(Y).split("/").filter(M.filterOutNavPropBinding).join("/"),b1={sPropertyName:Q,sBindingPath:a1,sValueHelpType:I+V,oControl:b,oMetaModel:B,oModifier:G,sIdPrefix:v(H,I+"FilterField",W),sVhIdPrefix:v(H,I+V),sNavigationPrefix:W,bUseSemanticDateRange:D.getCustomData(b,"useSemanticDateRange",G),oSettings:N?N.settings:{},visualFilter:N?N.visualFilter:undefined};return D.doesValueHelpExist(b1).then(function(c1){if(!c1){return w($,b1);}return Promise.resolve();}).then(x.bind(undefined,$,b1));};function y(a){if(a instanceof window.Element){return null;}return D.getCustomData(a,k);}function z(a,b){if(a instanceof window.Element){return;}D.setCustomData(a,k,b);}function A(B,G,H){var I=y(H);var K;if(!I){I=O.fetchPropertiesForEntity(B,G,H);I.forEach(function(a){K=null;if(a.groupLabel){K=D.getLocalizedText(a.groupLabel,H);a.groupLabel=K===null?a.groupLabel:K;}});I.sort(function(a,b){if(a.groupLabel===undefined||a.groupLabel===null){return-1;}if(b.groupLabel===undefined||b.groupLabel===null){return 1;}return a.groupLabel.localeCompare(b.groupLabel);});z(H,I);}return I;}O.fetchProperties=function(a){var b=D.getCustomData(a,"entityType");return D.fetchModel(a).then(function(B){if(!B){return[];}return A(b,B.getMetaModel(),a);});};O.getTypeUtil=function(a){return g;};return O;},false);
