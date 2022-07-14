/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/m/Dialog","sap/ui/core/XMLTemplateProcessor","sap/ui/model/json/JSONModel","sap/ui/core/Fragment","sap/ui/core/util/XMLPreprocessor","sap/fe/core/templating/UIFormatters","sap/fe/core/converters/MetaModelConverter","sap/fe/macros/field/FieldHelper","sap/fe/macros/field/FieldTemplating","sap/fe/core/helpers/BindingExpression","sap/fe/core/CommonUtils","sap/fe/core/templating/FieldControlHelper"],function(D,X,J,F,a,U,M,b,c,B,C,d){"use strict";function g(v,i,q){if(v){return q.indexOf(v)===i;}}function e(i,v){if(i&&i.indexOf("/")>0){var P=i.split("/"),R;P.forEach(function(q){R=v&&v[q]?v[q]:R&&R[q];});return R;}}function f(t,i){if(i&&t){var S=t.getSelectedContexts(),P=[];S.forEach(function(q){var r=q.getObject();var v=i.indexOf("/")>-1&&r.hasOwnProperty(i.split("/")[0]);if(q&&(r.hasOwnProperty(i)||v)){P.push(q.getObject(i));}});var u=P.filter(g);if(u.length>1){return"Default/"+i;}else if(u.length===0){return"Empty/"+i;}else if(u.length===1){return i;}}}function h(t,P){var i=t&&t.getColumns().filter(function(q){return q.getDataProperty()===P;}),r="Values";if(i.length){var q=i[0],I=q.getTemplate().getContent&&q.getTemplate().getContent().getContentEdit&&q.getTemplate().getContent().getContentEdit()&&q.getTemplate().getContent().getContentEdit()[0]&&q.getTemplate().getContent().getContentEdit()[0].getMetadata().getName();switch(I){case"sap.m.DatePicker":r="Dates";break;case"sap.m.CheckBox":r="Settings";break;}}return r;}function s(v,t,P,i,q){var S=h(t,P);var V=t.getSelectedContexts().some(function(r){return r.getObject(P);});if(V){if(q){v.unshift({text:i.clearFieldValue,key:"ClearFieldValue/"+P});}}else{v.unshift({text:i.leaveBlankValue,key:"Empty/"+P});}v.unshift({text:i.keepExistingPrefix+" "+S+" >",key:"Default/"+P});}function j(P,v){var i,q=0,r=P.split("/"),t="";r.forEach(function(u){if(!v[u]&&q===0){v[u]={};i=v[u];t=t+u;q++;}else if(!i[u]){t=t+"/"+u;if(t!==P){i[u]={};i=i[u];}else{i[u]=[];}}});return i;}function k(i,t){if(i&&i.$Path){return!(t&&t.getSelectedContexts().some(function(S){return S.getObject(i.$Path)===false;}));}return i;}function l(P,t,T,i,S){var q=T.getModel().getMetaModel();var r=C.computeDisplayMode(q.getObject(i+"/"+P+"@"));var u,v,w,x;if(t&&(t.path||(t.parameters&&t.parameters.length))&&P){if(t.path){if(r==="Description"){v=S.getObject(P);w=S.getObject(t.path);x=w;}else if(r==="Value"){v=S.getObject(P);x=v;}}else if(t.parameters){t.parameters.forEach(function(y){if(y.path&&y.path!==P){u=y.path;}});v=S.getObject(P);w=S.getObject(u);if(r==="ValueDescription"&&v&&w){x=v+" ("+w+")";}else if(r==="DescriptionValue"&&w&&v){x=w+" ("+v+")";}}return{"textArrangement":r,"valuePath":P,"descriptionPath":u,"value":v,"description":w,"fullText":x};}return false;}function p(i,t,q,r,T,u){var v=new J(),w,R,L,P,V,x,y,P,z;T.forEach(function(A){w=A.dataProperty;if(w){P=w&&q.getObject(r+"/"+w+"@");V=w&&q.getObject(r+"/"+w+"@")&&q.getObject(r+"/"+w+"@")["@com.sap.vocabularies.Common.v1.ValueList"];x=(P&&P["@Org.OData.Measures.V1.Unit"]&&P["@Org.OData.Measures.V1.Unit"].$Path)||(P&&P["@Org.OData.Measures.V1.ISOCurrency"]&&P["@Org.OData.Measures.V1.ISOCurrency"].$Path);L=A.label||(P&&P["@com.sap.vocabularies.Common.v1.Label"]);y=x&&q.getObject(r+"/"+x+"@")&&q.getObject(r+"/"+x+"@")["@com.sap.vocabularies.Common.v1.ValueList"];if(i){i.targetObject=i.targetEntityType.entityProperties.filter(function(Q){return Q.name===w;});}i.targetObject=i.targetObject[0]||{};z=c.getTextBinding(i,undefined,true)||{};var E=q.getContext(A.annotationPath),G=M.convertMetaModelContext(E),H=q.getContext(r+"/"+w+"@"),I=H&&H.getInterface();var K=k(E&&E.getObject()["@com.sap.vocabularies.UI.v1.Hidden"],t)||false;I.context={getModel:function(){return I.getModel();},getPath:function(){return r+"/"+w;}};var N=b.fieldControl(w,I);P=(G&&G.Value&&G.Value.$target)||(G&&G.Target&&G.Target.$target);var O=d.isReadOnlyExpression(P);if(w&&!K&&U.getEditableExpression(P,G,i)!=="false"){R={"label":L+":","visible":w&&!K&&U.getEditableExpression(P,G,i),"dataProperty":w,"isValueHelpEnabled":V?V:false,"unitProperty":x?x:false,"isValueHelpEnabledForUnit":y?y:false,"propertyPathForValueHelp":r+"/"+w,"propertyPathForValueHelpUnit":r+"/"+x,"isFieldRequired":b.getRequiredForDataField(N,"Editable"),"defaultSelectionPath":w?f(t,w):false,"defaultSelectionUnitPath":x?f(t,x):false,"entitySet":r,"textBinding":z,"nullable":P.nullable!==undefined?P.nullable:true,"isPropertyReadOnly":O!==undefined?O:false};u.push(R);}}});v.setData(u);return v;}function m(t,q,r){var v=[],u=[],R=[],w=[],S=t.getSelectedContexts(),x={},P;q.forEach(function(y){if(y.dataProperty&&y.dataProperty.indexOf("/")>-1){var A=j(y.dataProperty,v),E=y.dataProperty.split("/"),G;for(var i=0;i<S.length;i++){var H=S[i].getObject(y.dataProperty);G=y.dataProperty+"/"+H;if(!x[G]&&A[E[E.length-1]]){var T=l(y.dataProperty,y.textBinding,t,y.entitySet,S[i]);A[E[E.length-1]].push({"text":(T&&T.fullText)||H,"key":y.dataProperty,"textInfo":T,"fieldRequiredInfo":{"isFieldRequired":y.isFieldRequired,"relatedUnitField":y.unitProperty}});x[G]=H;}}}else{v[y.dataProperty]=v[y.dataProperty]||[];if(y.unitProperty){u[y.unitProperty]=u[y.unitProperty]||[];}for(var i=0;i<S.length;i++){var I=S[i].getObject();P=y.dataProperty+"/"+I[y.dataProperty];if(y.dataProperty&&I[y.dataProperty]&&!x[P]){var T=l(y.dataProperty,y.textBinding,t,y.entitySet,S[i]);v[y.dataProperty].push({"text":(T&&T.fullText)||I[y.dataProperty],"key":y.dataProperty,"textInfo":T,"fieldRequiredInfo":{"isFieldRequired":y.isFieldRequired,"relatedUnitField":y.unitProperty}});x[P]=I[y.dataProperty];}if(y.unitProperty&&I[y.unitProperty]){P=y.unitProperty+"/"+I[y.unitProperty];if(!x[P]){var T=l(y.unitProperty,y.textBinding,t,y.entitySet,S[i]);u[y.unitProperty].push({"text":(T&&T.fullText)||I[y.unitProperty],"key":y.unitProperty,"textInfo":T,"fieldRequiredInfo":{"isFieldRequired":y.isFieldRequired,"relatedUnitField":false}});x[P]=I[y.unitProperty];}}}}});q.forEach(function(y){if(y.dataProperty.indexOf("/")>-1){var i=e(y.dataProperty,v);if(!i){i.push({text:r.leaveBlankValue,key:"Empty/"+y.dataProperty});}else{s(i,t,y.dataProperty,r,y.nullable);}}else if(v[y.dataProperty]&&v[y.dataProperty].length){s(v[y.dataProperty],t,y.dataProperty,r,y.nullable);}if(u[y.unitProperty]&&u[y.unitProperty].length){s(u[y.unitProperty],t,y.unitProperty,r,y.nullable);}else if((y.dataProperty&&v[y.dataProperty]&&!v[y.dataProperty].length)||(y.unitProperty&&u[y.unitProperty]&&!u[y.unitProperty].length)){if(y.dataProperty){v[y.dataProperty].push({text:r.leaveBlankValue,key:"Empty/"+y.dataProperty});}if(y.unitProperty){u[y.unitProperty].push({text:r.leaveBlankValue,key:"Empty/"+y.dataProperty});}}if(y.isPropertyReadOnly&&typeof y.isPropertyReadOnly==="boolean"){w.push({"property":y.dataProperty,value:y.isPropertyReadOnly,type:"Default"});}else if(y.isPropertyReadOnly&&y.isPropertyReadOnly.operand1&&y.isPropertyReadOnly.operand2){w.push({"property":y.dataProperty,propertyPath:y.isPropertyReadOnly.operand1.path,propertyValue:y.isPropertyReadOnly.operand2.value,type:"Path"});}});var y={"values":v,"unitData":u,"results":R,"readablePropertyData":w};var z=new J(y);return z;}function o(t,i){var q="sap/fe/macros/massedit/MassEditDialog",r=t&&t.getModel().getMetaModel(),u=[],v=t.data("metaPath"),R=sap.ui.getCore().getLibraryResourceBundle("sap.fe.macros"),w={"keepExistingPrefix":"< Keep","leaveBlankValue":"< Leave Blank >","clearFieldValue":"< Clear Values >","massEditTitle":R.getText("C_MASS_EDIT_DIALOG_TITLE"),"saveButtonText":R.getText("C_MASS_EDIT_SAVE_BUTTON_TEXT"),"cancelButtonText":R.getText("C_MASS_EDIT_CANCEL_BUTTON_TEXT")},T=[];t&&t.getColumns().forEach(function(A){var G=A&&A.getDataProperty(),H=t.data("columns")&&t.data("columns").customData.filter(function(I){return I.name===G;});T.push({"dataProperty":G,"label":A.getHeader(),"annotationPath":H&&H[0]&&H[0].annotationPath});});var E=r.getContext(v+"/@"),x=M.getInvolvedDataModelObjects(E),y=p(x,t,r,v,T,u,y),z=m(t,u,w);return new Promise(function(A,G){var H=X.loadTemplate(q,"fragment");return Promise.resolve(a.process(H,{name:q},{bindingContexts:{dataFieldModel:y.createBindingContext("/")},models:{dataFieldModel:y}})).then(function(H){return F.load({definition:H}).then(function(I){var K=new D({title:w.massEditTitle,content:[I],beginButton:{text:w.saveButtonText,type:"Emphasized",press:function(L){var K=L.getSource().getParent(),N=K.getModel("fieldsInfo"),O=N.getProperty("/results"),P=N.getProperty("/readablePropertyData"),Q=[],S=false,V=false;t.getSelectedContexts().forEach(function(W){O.forEach(function(Y){if(Y&&Y.validationError){Y.control.focus();V=true;return;}if(P){S=P.some(function(Z){if(Y.keyValue===Z.property){if(Z.type==="Default"){return Z.value===true;}else if(Z.type==="Path"&&Z.propertyValue&&Z.propertyPath){return(W.getObject(Z.propertyPath)===Z.propertyValue);}}});}if(Y.keyValue&&Y.value!=="Default"&&!S&&!V){Q.push(W.setProperty(Y.keyValue,Y.value));}});});if(!V){return Promise.all(Q).then(function(W){K.close();K.destroy();return W;}).catch(function(W){throw new Error(W);});}}},endButton:{text:w.cancelButtonText,press:function(L){var K=L.getSource().getParent();K.close();K.destroy();}}});K.open();K.setModel(z,"fieldsInfo");});}).catch(G);});}var n={openMassEditDialog:o};return n;});
