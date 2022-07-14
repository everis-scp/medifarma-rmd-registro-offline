/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../ManifestSettings","../controls/Common/DataVisualization","../helpers/ID","sap/fe/core/converters/controls/Common/Table","sap/fe/core/converters/controls/Common/Action","sap/fe/core/converters/helpers/ConfigurableObject","sap/fe/core/converters/helpers/Key","sap/fe/core/helpers/BindingExpression","sap/fe/core/converters/helpers/IssueManager","sap/fe/core/templating/FilterTemplating","sap/fe/core/templating/DataModelPathHelper","../helpers/Aggregation","../controls/Common/KPI"],function(M,D,I,T,A,C,K,B,a,b,c,d,f){"use strict";var _={};var g=f.getKPIDefinitions;var h=d.AggregationHelper;var j=c.checkFilterExpressionRestrictions;var k=b.getIsRequired;var l=b.isPropertyFilterable;var m=a.IssueCategory;var p=a.IssueSeverity;var q=a.IssueType;var r=B.compileBinding;var s=B.annotationExpression;var t=K.KeyHelper;var P=C.Placement;var u=C.insertCustomElements;var v=A.getActionsFromManifest;var w=T.getSelectionVariantConfiguration;var V=I.VisualFilterID;var x=I.TableID;var y=I.FilterVariantManagementID;var z=I.FilterBarID;var E=I.CustomTabID;var G=D.isSelectionPresentationCompliant;var H=D.getSelectionVariant;var J=D.isPresentationCompliant;var L=D.getSelectionPresentationVariant;var N=D.getDefaultPresentationVariant;var O=D.getDefaultLineItem;var Q=D.getDefaultChart;var R=D.getDataVisualizationConfiguration;var S=M.TemplateType;var U=M.VisualizationType;var W=M.AvailabilityType;function X(o){if(typeof Symbol==="undefined"||o[Symbol.iterator]==null){if(Array.isArray(o)||(o=Y(o))){var i=0;var F=function(){};return{s:F,n:function(){if(i>=o.length)return{done:true};return{done:false,value:o[i++]};},e:function(e){throw e;},f:F};}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}var n,C1=true,D1=false,E1;return{s:function(){n=o[Symbol.iterator]();},n:function(){var e=n.next();C1=e.done;return e;},e:function(e){D1=true;E1=e;},f:function(){try{if(!C1&&n.return!=null)n.return();}finally{if(D1)throw E1;}}};}function Y(o,e){if(!o)return;if(typeof o==="string")return Z(o,e);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return Z(o,e);}function Z(e,n){if(n==null||n>e.length)n=e.length;for(var i=0,o=new Array(n);i<n;i++){o[i]=e[i];}return o;}function $(o,e){var i=Object.keys(o);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(o);if(e)n=n.filter(function(F){return Object.getOwnPropertyDescriptor(o,F).enumerable;});i.push.apply(i,n);}return i;}function a1(e){for(var i=1;i<arguments.length;i++){var n=arguments[i]!=null?arguments[i]:{};if(i%2){$(Object(n),true).forEach(function(o){b1(e,o,n[o]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(e,Object.getOwnPropertyDescriptors(n));}else{$(Object(n)).forEach(function(o){Object.defineProperty(e,o,Object.getOwnPropertyDescriptor(n,o));});}}return e;}function b1(o,e,i){if(e in o){Object.defineProperty(o,e,{value:i,enumerable:true,configurable:true,writable:true});}else{o[e]=i;}return o;}var c1=function(e,i){var n=i.split("/");var o;var F="";while(n.length){var C1=n.shift();o=o?o+"/"+C1:C1;var D1=e.resolvePath(o);if(D1._type==="NavigationProperty"&&D1.isCollection){C1+="*";}F=F?F+"/"+C1:C1;}return F;};var d1=function(e,i,n,o,F){var C1,D1,E1;if(i!==undefined&&i.targetType===undefined&&(o||((C1=i.annotations)===null||C1===void 0?void 0:(D1=C1.UI)===null||D1===void 0?void 0:(E1=D1.Hidden)===null||E1===void 0?void 0:E1.valueOf())!==true)){var F1,G1,H1,I1,J1,K1,L1,M1;var N1=F.getAnnotationEntityType(i);return{key:t.getSelectionFieldKeyFromPath(n),annotationPath:F.getAbsoluteAnnotationPath(n),conditionPath:c1(e,n),availability:((F1=i.annotations)===null||F1===void 0?void 0:(G1=F1.UI)===null||G1===void 0?void 0:(H1=G1.HiddenFilter)===null||H1===void 0?void 0:H1.valueOf())===true?W.Hidden:W.Adaptation,label:r(s(((I1=i.annotations.Common)===null||I1===void 0?void 0:(J1=I1.Label)===null||J1===void 0?void 0:J1.valueOf())||i.name)),group:N1.name,groupLabel:r(s((N1===null||N1===void 0?void 0:(K1=N1.annotations)===null||K1===void 0?void 0:(L1=K1.Common)===null||L1===void 0?void 0:(M1=L1.Label)===null||M1===void 0?void 0:M1.valueOf())||N1.name))};}return undefined;};var e1=function(e,n,i,o,F){var C1={};if(i){i.forEach(function(D1){var E1=D1.name;var F1=(n?n+"/":"")+E1;var G1=d1(e,D1,F1,o,F);if(G1){C1[F1]=G1;}});}return C1;};var f1=function(e,i,n,o){var F={};if(i){i.forEach(function(C1){var D1;var E1=e.resolvePath(C1);if(E1===undefined){return;}if(E1._type==="NavigationProperty"){D1=e1(e,C1,E1.targetType.entityProperties,n,o);}else if(E1.targetType!==undefined){D1=e1(e,C1,E1.targetType.properties,n,o);}else{var F1=C1.includes("/")?C1.split("/").splice(0,1).join("/"):"";D1=e1(e,F1,[E1],n,o);}F=a1({},F,{},D1);});}return F;};function g1(e){var i={};e.Data.forEach(function(n){if(n.$Type==="com.sap.vocabularies.UI.v1.DataField"){var o,F;i[n.Value.path]={group:e.fullyQualifiedName,groupLabel:r(s(e.Label||((o=e.annotations)===null||o===void 0?void 0:(F=o.Common)===null||F===void 0?void 0:F.Label)||e.qualifier))||e.qualifier};}});return i;}function h1(e){var i=[];e.forEach(function(n){if(!n.type){var o=n.secondaryVisualization?n.secondaryVisualization.visualizations:n.presentation.visualizations;o.forEach(function(F){if(F.type===U.Table){i.push(F);}});}});return i;}function i1(e,i){if(i.getManifestWrapper().hasMultipleVisualizations()||i.getTemplateType()===S.AnalyticalListPage){return true;}var n=i.getContextPath();return j1(e,n);}function j1(e,i){if(i&&e.length>0){return e.every(function(n){return n.enableAnalytics&&i===n.annotation.collection;});}return false;}function k1(e){var i,n;var o=e.getDataModelObjectPath();var F=o.startingEntitySet.entityType;var C1=!!((i=F.annotations)===null||i===void 0?void 0:(n=i.Common)===null||n===void 0?void 0:n.ResultContext);var D1=C1&&e.getConverterContextFor("/"+o.startingEntitySet.name);var E1=D1?F.entityProperties.map(function(F1){return p1({},F1.name,D1,F);}):[];return E1;}var l1=function(e){var n,o,F,C1;var D1=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var E1=z1(D1,e);var F1=A1(E1);var G1=e.getEntityType();var H1=(n=G1.annotations.UI)===null||n===void 0?void 0:n.FilterFacets;var I1={};var J1=e.getAnnotationsByTerm("UI","com.sap.vocabularies.UI.v1.FieldGroup");if(H1===undefined||H1.length<0){for(var i in J1){I1=a1({},I1,{},g1(J1[i]));}}else{I1=H1.reduce(function(U1,V1){for(var _i=0;_i<V1.Target.$target.Data.length;_i++){var X1,Y1;U1[V1.Target.$target.Data[_i].Value.path]={group:V1===null||V1===void 0?void 0:(X1=V1.ID)===null||X1===void 0?void 0:X1.toString(),groupLabel:V1===null||V1===void 0?void 0:(Y1=V1.Label)===null||Y1===void 0?void 0:Y1.toString()};}return U1;},{});}var K1=[];var L1=H(G1,e);if(L1){K1=L1.SelectOptions;}var M1=a1({},e1(G1,"",G1.entityProperties,false,e),{},f1(G1,e.getManifestWrapper().getFilterConfiguration().navigationProperties,false,e));var N1=o1(M1,K1,G1,e,F1);var O1=k1(e);var P1=O1.concat(((o=G1.annotations)===null||o===void 0?void 0:(F=o.UI)===null||F===void 0?void 0:(C1=F.SelectionFields)===null||C1===void 0?void 0:C1.reduce(function(T1,U1){var V1=U1.value;if(!(V1 in F1)){var W1=p1(M1,V1,e,G1);if(W1){W1.group="";W1.groupLabel="";T1.push(W1);}}return T1;},[]))||[]).concat(N1||[]).concat(Object.keys(M1).filter(function(U1){return!(U1 in F1);}).map(function(U1){return Object.assign(M1[U1],I1[U1]);}));var Q1=e.getContextPath();if(j1(D1,Q1)){var R1=D1[0].aggregates;if(R1){var S1=Object.keys(R1).map(function(U1){return R1[U1].relativePath;});P1=P1.filter(function(U1){return S1.indexOf(U1.key)===-1;});}}var T1=u(P1,s1(G1,e),{"availability":"overwrite",label:"overwrite",position:"overwrite",template:"overwrite",settings:"overwrite",visualFilter:"overwrite"});return T1;};_.getSelectionFields=l1;var m1=function(e,n,o,F){var C1,D1,E1;var F1={};(C1=e.annotations)===null||C1===void 0?void 0:(D1=C1.UI)===null||D1===void 0?void 0:(E1=D1.SelectionFields)===null||E1===void 0?void 0:E1.map(function(G1){if(o===(G1===null||G1===void 0?void 0:G1.value)){var H1;var I1=F[o];if(I1&&(I1===null||I1===void 0?void 0:I1.visualFilter)&&(I1===null||I1===void 0?void 0:(H1=I1.visualFilter)===null||H1===void 0?void 0:H1.valueList)){var J1,K1,L1;var M1=I1===null||I1===void 0?void 0:(J1=I1.visualFilter)===null||J1===void 0?void 0:J1.valueList;var N1=M1.split("#");var O1=N1.length>1?"ValueList#"+N1[1]:N1[0];var P1=(K1=G1.$target)===null||K1===void 0?void 0:(L1=K1.annotations)===null||L1===void 0?void 0:L1.Common[O1];if(P1){var Q1,R1;var S1=P1===null||P1===void 0?void 0:P1.CollectionPath;var T1=n.getConverterContextFor("/"+(S1||((Q1=n.getEntitySet())===null||Q1===void 0?void 0:Q1.name)));var U1=P1===null||P1===void 0?void 0:P1.Parameters;var V1;var W1=[];if(U1){for(var i=0;i<U1.length;i++){var X1,Y1,Z1,$1,_1;var a2=(X1=U1[i].LocalDataProperty)===null||X1===void 0?void 0:X1.value;var b2=U1[i].ValueListProperty;if((((Y1=U1[i])===null||Y1===void 0?void 0:Y1.$Type)==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"||((Z1=U1[i])===null||Z1===void 0?void 0:Z1.$Type)==="com.sap.vocabularies.Common.v1.ValueListParameterOut")&&o===a2){V1=U1[i];}if(((($1=U1[i])===null||$1===void 0?void 0:$1.$Type)==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"||((_1=U1[i])===null||_1===void 0?void 0:_1.$Type)==="com.sap.vocabularies.Common.v1.ValueListParameterIn")&&o!==a2){var c2=l(T1,b2);if(!c2){W1.push({localDataProperty:a2,valueListProperty:b2});}}}}if(W1&&W1.length){W1.forEach(function(W2){var X2=r(j(n.getConverterContextFor(n.getAbsoluteAnnotationPath(W2===null||W2===void 0?void 0:W2.localDataProperty)).getDataModelObjectPath(),["SingleValue"]));var Y2=r(j(T1.getConverterContextFor(T1.getAbsoluteAnnotationPath(W2===null||W2===void 0?void 0:W2.valueListProperty)).getDataModelObjectPath(),["SingleValue"]));if(Y2==="true"&&X2==="false"){throw new Error("FilterRestrictions of "+o+" in MainEntitySet and ValueListEntitySet are different");}});}var d2=P1===null||P1===void 0?void 0:P1.PresentationVariantQualifier;var e2=P1===null||P1===void 0?void 0:P1.SelectionVariantQualifier;var f2=T1===null||T1===void 0?void 0:(R1=T1.getEntityTypeAnnotation("@UI.PresentationVariant#"+d2))===null||R1===void 0?void 0:R1.annotation;var g2=new h(T1.getEntityType(),T1);if(!g2.isAnalyticsSupported()){return;}if(f2){var h2;var i2=f2===null||f2===void 0?void 0:f2.Visualizations;var j2="/"+(T1===null||T1===void 0?void 0:(h2=T1.getEntitySet())===null||h2===void 0?void 0:h2.name);F1.contextPath=j2;var k2;for(var l2=0;l2<i2.length;l2++){var m2;if(((m2=i2[l2].$target)===null||m2===void 0?void 0:m2.term)==="com.sap.vocabularies.UI.v1.Chart"){k2=i2[l2];break;}}if(k2){var n2,o2,p2,q2,r2,s2,t2,u2,v2,w2,x2,y2,z2,A2;var B2=n1(T1,k2,g2);if(!B2){return;}var C2=(n2=k2)===null||n2===void 0?void 0:(o2=n2.$target)===null||o2===void 0?void 0:(p2=o2.Dimensions[0])===null||p2===void 0?void 0:(q2=p2.$target)===null||q2===void 0?void 0:(r2=q2.annotations)===null||r2===void 0?void 0:(s2=r2.UI)===null||s2===void 0?void 0:(t2=s2.Hidden)===null||t2===void 0?void 0:t2.valueOf();var D2=(u2=k2)===null||u2===void 0?void 0:(v2=u2.$target)===null||v2===void 0?void 0:(w2=v2.Dimensions[0])===null||w2===void 0?void 0:(x2=w2.$target)===null||x2===void 0?void 0:(y2=x2.annotations)===null||y2===void 0?void 0:(z2=y2.UI)===null||z2===void 0?void 0:(A2=z2.HiddenFilter)===null||A2===void 0?void 0:A2.valueOf();if(C2===true||D2===true){return;}else{if(i2&&i2.length){var E2,F2,G2,H2,I2,J2,K2,L2,M2;F1.chartAnnotation=k2?T1===null||T1===void 0?void 0:T1.getAbsoluteAnnotationPath(k2.fullyQualifiedName+"/$AnnotationPath/"):undefined;F1.presentationAnnotation=f2?T1===null||T1===void 0?void 0:T1.getAbsoluteAnnotationPath(f2.fullyQualifiedName+"/"):undefined;F1.visualFilterId=V((E2=k2)===null||E2===void 0?void 0:(F2=E2.$target)===null||F2===void 0?void 0:(G2=F2.Dimensions[0])===null||G2===void 0?void 0:G2.value);F1.outParameter=(H2=V1)===null||H2===void 0?void 0:(I2=H2.LocalDataProperty)===null||I2===void 0?void 0:I2.value;F1.inParameters=W1;var N2=j(n.getConverterContextFor(n.getAbsoluteAnnotationPath(o)).getDataModelObjectPath(),["SingleRange","MultiRange"]);if(r(N2)==="true"){throw new Error("Range AllowedExpression is not supported for visual filters");}var O2=j(n.getConverterContextFor(n.getAbsoluteAnnotationPath(o)).getDataModelObjectPath(),["SingleValue"]);F1.multipleSelectionAllowed=r(!O2.value);F1.required=k(n,o);var P2;if(e2){var Q2;P2=T1===null||T1===void 0?void 0:(Q2=T1.getEntityTypeAnnotation("@UI.SelectionVariant#"+e2))===null||Q2===void 0?void 0:Q2.annotation;F1.selectionVariantAnnotation=P2?T1===null||T1===void 0?void 0:T1.getAbsoluteAnnotationPath(P2.fullyQualifiedName+"/"):undefined;}var R2=(J2=T1.getEntitySet())===null||J2===void 0?void 0:J2.annotations;var S2=[];var T2=R2===null||R2===void 0?void 0:(K2=R2.Capabilities)===null||K2===void 0?void 0:(L2=K2.FilterRestrictions)===null||L2===void 0?void 0:L2.RequiredProperties;if(T2===null||T2===void 0?void 0:T2.length){T2.forEach(function(W2){S2.push(W2.value);});}F1.requiredProperties=S2;if((M2=F1.requiredProperties)===null||M2===void 0?void 0:M2.length){if(!F1.inParameters||!F1.inParameters.length){if(!F1.selectionVariantAnnotation){F1.showOverlayInitially=true;}else{var U2;var V2=[];(U2=P2)===null||U2===void 0?void 0:U2.SelectOptions.forEach(function(W2){V2.push(W2.PropertyName.value);});S2=S2.sort();V2=V2.sort();F1.showOverlayInitially=S2.some(function(W2){return V2.indexOf(W2)===-1;});}}else{F1.showOverlayInitially=false;}}else{F1.showOverlayInitially=false;}}}}else{n.getDiagnostics().addIssue(m.Annotation,p.High,q.MALFORMED_VISUALFILTERS.CHART);}}else{n.getDiagnostics().addIssue(m.Annotation,p.High,q.MALFORMED_VISUALFILTERS.PRESENTATIONVARIANT);}}else{n.getDiagnostics().addIssue(m.Annotation,p.High,q.MALFORMED_VISUALFILTERS.VALUELIST);}}else{n.getDiagnostics().addIssue(m.Manifest,p.High,q.MALFORMED_VISUALFILTERS.VALUELIST);}}});if(Object.keys(F1).length>1){return F1;}};var n1=function(e,n,o){var F,C1,D1,E1,F1,G1,H1,I1,J1,K1,L1,M1;var N1,O1,P1;var Q1=n===null||n===void 0?void 0:(F=n.$target)===null||F===void 0?void 0:(C1=F.Measures[0])===null||C1===void 0?void 0:C1.value;var R1=n===null||n===void 0?void 0:(D1=n.$target)===null||D1===void 0?void 0:(E1=D1.Dimensions[0])===null||E1===void 0?void 0:E1.value;var S1=o.getCustomAggregateDefinitions();var T1=e.getAnnotationsByTerm("Analytics","com.sap.vocabularies.Analytics.v1.AggregatedProperties",[e.getEntityContainer(),e.getEntityType()]);if(S1[Q1]){N1=Q1;}else if(T1&&T1[0]){var U1=T1[0];U1.some(function(_1){if(_1.Name===Q1){N1=_1===null||_1===void 0?void 0:_1.AggregatableProperty.value;}});}var V1=((F1=e.getEntitySet())===null||F1===void 0?void 0:(G1=F1.annotations)===null||G1===void 0?void 0:(H1=G1.Aggregation)===null||H1===void 0?void 0:(I1=H1.ApplySupported)===null||I1===void 0?void 0:I1.AggregatableProperties)||[];var W1=((J1=e.getEntitySet())===null||J1===void 0?void 0:(K1=J1.annotations)===null||K1===void 0?void 0:(L1=K1.Aggregation)===null||L1===void 0?void 0:(M1=L1.ApplySupported)===null||M1===void 0?void 0:M1.GroupableProperties)||[];if(V1&&V1.length){for(var i=0;i<V1.length;i++){var X1,Y1;if(((X1=V1[i])===null||X1===void 0?void 0:(Y1=X1.Property)===null||Y1===void 0?void 0:Y1.value)===N1){P1=true;}}}if(W1&&W1.length){for(var Z1=0;Z1<W1.length;Z1++){var $1;if((($1=W1[Z1])===null||$1===void 0?void 0:$1.value)===R1){O1=true;}}}return P1&&O1;};var o1=function(e,i,n,o,F){var C1,D1,E1;var F1=[];var G1={};var H1=n.entityProperties;(C1=n.annotations)===null||C1===void 0?void 0:(D1=C1.UI)===null||D1===void 0?void 0:(E1=D1.SelectionFields)===null||E1===void 0?void 0:E1.forEach(function(I1){G1[I1.value]=true;});if(i&&i.length>0){i===null||i===void 0?void 0:i.forEach(function(I1){var J1,K1,L1;var M1=I1.PropertyName;var N1=M1.value;var G1={};(J1=n.annotations)===null||J1===void 0?void 0:(K1=J1.UI)===null||K1===void 0?void 0:(L1=K1.SelectionFields)===null||L1===void 0?void 0:L1.forEach(function(P1){G1[P1.value]=true;});if(!(N1 in F)){if(!(N1 in G1)){var O1=p1(e,N1,o,n);if(O1){F1.push(O1);}}}});}else if(H1){H1.forEach(function(I1){var J1,K1;var L1=(J1=I1.annotations)===null||J1===void 0?void 0:(K1=J1.Common)===null||K1===void 0?void 0:K1.FilterDefaultValue;var M1=I1.name;if(!(M1 in F)){if(L1&&!(M1 in G1)){var N1=p1(e,M1,o,n);if(N1){F1.push(N1);}}}});}return F1;};var p1=function(e,i,n,o){var F=e[i];if(F){delete e[i];}else{F=d1(o,o.resolvePath(i),i,true,n);}if(!F){n.getDiagnostics().addIssue(m.Annotation,p.High,q.MISSING_SELECTIONFIELD);}if(F){var C1,D1;F.availability=W.Default;F.isParameter=!!((C1=o.annotations)===null||C1===void 0?void 0:(D1=C1.Common)===null||D1===void 0?void 0:D1.ResultContext);}return F;};var q1=function(e){var i={};for(var n in e){var o,F,C1;if((o=e[n])===null||o===void 0?void 0:(F=o.settings)===null||F===void 0?void 0:(C1=F.defaultValues)===null||C1===void 0?void 0:C1.length){var D1,E1;i[n]=(D1=e[n])===null||D1===void 0?void 0:(E1=D1.settings)===null||E1===void 0?void 0:E1.defaultValues;}}return i;};var r1=function(e,i,n){return p1({},e,i,n);};_.getFilterField=r1;var s1=function(e,i){var n=i.getManifestWrapper().getFilterConfiguration();var o=(n===null||n===void 0?void 0:n.filterFields)||{};var F=f1(e,Object.keys(o).map(function(I1){return t.getPathFromSelectionFieldKey(I1);}),true,i);var C1={};for(var D1 in o){var E1=o[D1];var F1=t.getPathFromSelectionFieldKey(D1);var G1=F[F1];var H1=m1(e,i,D1,o);C1[D1]={key:D1,annotationPath:G1===null||G1===void 0?void 0:G1.annotationPath,conditionPath:(G1===null||G1===void 0?void 0:G1.conditionPath)||F1,template:E1.template,label:E1.label,position:E1.position||{placement:P.After},availability:E1.availability||W.Default,settings:E1.settings,visualFilter:H1};}return C1;};function t1(e,i,n){var o=i.getManifestWrapper().getDefaultTemplateAnnotationPath();var F=L(e,o,i);if(o&&F){var C1=F.PresentationVariant;if(!C1){throw new Error("Presentation Variant is not configured in the SPV mentioned in the manifest");}var D1=J(F.PresentationVariant);if(!D1){return undefined;}if(G(F,n)){return F;}}if(F){if(G(F,n)){return F;}}var E1=N(e);if(E1){if(J(E1,n)){return E1;}}if(!n){var F1=O(e);if(F1){return F1;}}return undefined;}var u1=function(e){var i=e;if(i.converterContext){var n,o;var F=i.converterContext;i=i;var C1=R(i.annotation?F.getRelativeAnnotationPath(i.annotation.fullyQualifiedName,F.getEntityType()):"",true,F,i);var D1="";var E1="";var F1="";var G1="";var H1=function(i){return i.key!==undefined;};var I1=function(C1,W1){var X1;var Y1=X(C1.visualizations),Z1;try{for(Y1.s();!(Z1=Y1.n()).done;){var $1=Z1.value;if(W1&&$1.type===U.Chart){X1=$1;break;}if(!W1&&$1.type===U.Table){X1=$1;break;}}}catch(_1){Y1.e(_1);}finally{Y1.f();}var a2=Object.assign({},C1);if(X1){a2.visualizations=[X1];}return a2;};var J1=function(W1){var Q1=F.getEntityTypeAnnotation(W1.annotationPath);var X1=Q1.annotation;F=Q1.converterContext;var Y1=X1;C1=R(Y1?F.getRelativeAnnotationPath(Y1.fullyQualifiedName,F.getEntityType()):"",true,F,i);return C1;};var K1=function(W1,X1){var Y1=I1(W1[0],true);E1=(Y1===null||Y1===void 0?void 0:Y1.visualizations[0]).id;var Z1=I1(W1[1]?W1[1]:W1[0]);D1=(Z1===null||Z1===void 0?void 0:Z1.visualizations[0]).annotation.id;if(Y1&&Z1){var L1={primaryVisualization:Y1,secondaryVisualization:Z1,tableControlId:D1,chartControlId:E1,defaultPath:X1};return L1;}};if(((n=C1)===null||n===void 0?void 0:(o=n.visualizations)===null||o===void 0?void 0:o.length)===2&&F.getTemplateType()===S.AnalyticalListPage){var L1=K1([C1],"both");if(L1){return L1;}}else if(F.getManifestWrapper().hasMultipleVisualizations(i)||F.getTemplateType()===S.AnalyticalListPage){var M1=i,N1=M1.primary,O1=M1.secondary;if(N1&&N1.length&&O1&&O1.length){var P1=K1([J1(N1[0]),J1(O1[0])],i.defaultPath);if(P1){return P1;}}else{throw new Error("SecondaryItems in the Views is not present");}}else if(H1(i)){var Q1=F.getEntityTypeAnnotation(i.annotationPath);var R1=Q1.annotation;F=Q1.converterContext;F1=r(s(R1.Text));C1.visualizations.forEach(function(W1,X1){switch(W1.type){case U.Table:var Y1=C1.visualizations[X1];var Z1=Y1.control.filters||{};Z1.hiddenFilters=Z1.hiddenFilters||{paths:[]};if(!i.keepPreviousPresonalization){Y1.annotation.id=x(i.key||"","LineItem");}i=i;if(i&&i.annotation&&i.annotation.term==="com.sap.vocabularies.UI.v1.SelectionPresentationVariant"){G1=i.annotation.SelectionVariant.fullyQualifiedName.split("@")[1];}else{G1=i.annotationPath;}Z1.hiddenFilters.paths.push({annotationPath:G1});Y1.control.filters=Z1;break;case U.Chart:break;default:break;}});}C1.visualizations.forEach(function(W1){if(W1.type===U.Table){D1=W1.annotation.id;}else if(W1.type===U.Chart){E1=W1.id;}});return{presentation:C1,tableControlId:D1,chartControlId:E1,title:F1,selectionVariantPath:G1};}else{i=i;var S1=i.label,T1=i.template,U1=i.type,V1=E(i.key||"");return{title:S1,fragment:T1,type:U1,customTabId:V1};}};var v1=function(e,i){var n=[];if(i){i.paths.forEach(function(F){if(e.getManifestWrapper().hasMultipleVisualizations(F)){if(i.paths.length>1){throw new Error("ALP flavor cannot have multiple views");}else{F=F;n.push({converterContext:e,primary:F.primary,secondary:F.secondary,defaultPath:F.defaultPath});}}else if(F.template){F=F;n.push({key:F.key,label:F.label,template:F.template,type:"Custom"});}else{F=F;var C1=e.getManifestWrapper(),D1=e.getConverterContextFor(F.contextPath||F.entitySet&&"/"+F.entitySet||e.getContextPath()),o=D1.getEntityType();if(o&&D1){var E1=C1.getDefaultTemplateAnnotationPath();var F1;var G1=D1.getEntityTypeAnnotation(F.annotationPath);var H1=G1.annotation;e=G1.converterContext;if(H1){if(H1.term==="com.sap.vocabularies.UI.v1.SelectionVariant"){if(E1){F1=L(D1.getEntityType(),E1,e);}else{F1=O(D1.getEntityType());}}else{F1=H1;}n.push({converterContext:D1,annotation:F1,annotationPath:F.annotationPath,keepPreviousPresonalization:F.keepPreviousPresonalization,key:F.key});}}else{}}});}else{var o=e.getEntityType();if(e.getTemplateType()===S.AnalyticalListPage){n=w1(e,n);}else{n.push({annotation:t1(o,e,false),converterContext:e});}}return n.map(function(F){return u1(F);});};function w1(e,i){var n=e.getEntityType();var o=t1(n,e,true);var F,C1;if(o){i.push({annotation:o,converterContext:e});}else{F=Q(n);C1=O(n);if(F&&C1){var D1=[{annotationPath:F.term}];var E1=[{annotationPath:C1.term}];i.push({converterContext:e,primary:D1,secondary:E1,defaultPath:"both"});}}return i;}var x1=function(e){var i=e.getManifestWrapper();return u([],v(i.getHeaderActions(),e));};_.getHeaderActions=x1;var y1=function(e){var i=e.getEntityType();var n=e.getContextPath();if(!n){throw new Error("An EntitySet is required to be able to display a ListReport, please adjust your `entitySet` property to point to one.");}var o=e.getManifestWrapper();var F=o.getViewConfiguration();var C1=o.hasMultipleEntitySets();var D1=v1(e,F);var E1=F?(F===null||F===void 0?void 0:F.showCounts)||C1:undefined;var F1=h1(D1);var G1=F1.some(function(X1){return X1.control.type==="ResponsiveTable";});var H1="";var I1="";var J1=z(n);var K1=y(J1);var L1=[J1].concat(F1.map(function(X1){return X1.annotation.id;}));var M1=o.getFilterConfiguration();var N1=(M1===null||M1===void 0?void 0:M1.initialLayout)!==undefined?M1===null||M1===void 0?void 0:M1.initialLayout.toLowerCase():"compact";var O1=(M1===null||M1===void 0?void 0:M1.layout)!==undefined?M1===null||M1===void 0?void 0:M1.layout.toLowerCase():"compact";var P1=M1.useSemanticDateRange!==undefined?M1.useSemanticDateRange:true;var Q1=B1(e,D1);if(Q1){I1=Q1.chartId;H1=Q1.tableId;}var R1=l1(e,F1);var S1=i1(F1,e);var T1=H(i,e);var U1=P1?q1(s1(i,e)):{};var V1=x1(e);var W1=o.hasMultipleVisualizations()||e.getTemplateType()===S.AnalyticalListPage;return{mainEntitySet:n,mainEntityType:n+"/",singleTableId:H1,singleChartId:I1,showTabCounts:E1,headerActions:V1,showPinnableToggle:G1,filterBar:{selectionFields:R1,hideBasicSearch:S1},views:D1,filterBarId:J1,filterConditions:{selectionVariant:T1,defaultSemanticDates:U1},variantManagement:{id:K1,targetControlIds:L1.join(",")},isMultiEntitySets:C1,hasMultiVisualizations:W1,useSemanticDateRange:P1,filterInitialLayout:N1,filterLayout:O1,kpiDefinitions:g(e)};};_.convertPage=y1;function z1(e,i){var n=[];return e.map(function(o){var F=o.control.filters;var C1=[];for(var D1 in F){if(Array.isArray(F[D1].paths)){var E1=F[D1].paths;E1.forEach(function(F1){if(F1&&F1.annotationPath&&n.indexOf(F1.annotationPath)===-1){n.push(F1.annotationPath);var G1=w(F1.annotationPath,i);if(G1){C1.push(G1);}}});}}return C1;}).reduce(function(o,F){return o.concat(F);},[]);}function A1(e){return e.reduce(function(i,n){n.propertyNames.forEach(function(o){i[o]=true;});return i;},{});}function B1(e,i){var n="",o="";if(e.getManifestWrapper().hasMultipleVisualizations()||e.getTemplateType()===S.AnalyticalListPage){var F=X(i),C1;try{for(F.s();!(C1=F.n()).done;){var D1=C1.value;D1=D1;if(D1.chartControlId&&D1.tableControlId){o=D1.chartControlId;n=D1.tableControlId;break;}}}catch(E1){F.e(E1);}finally{F.f();}}else{n=i[0].tableControlId;}if(n||o){return{chartId:o,tableId:n};}return undefined;}return _;},false);
