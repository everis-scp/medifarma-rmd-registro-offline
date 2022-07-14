/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../ManifestSettings","../../helpers/ID","sap/fe/core/converters/controls/Common/Action","sap/fe/core/converters/helpers/ConfigurableObject","sap/fe/core/converters/annotations/DataField","sap/fe/core/helpers/BindingExpression","sap/fe/core/converters/helpers/BindingHelper","sap/fe/core/converters/helpers/Key","sap/fe/core/formatters/TableFormatter","sap/fe/core/formatters/TableFormatterTypes","sap/fe/core/templating/DataModelPathHelper","sap/fe/core/helpers/StableIdHelper","sap/fe/core/converters/helpers/IssueManager","sap/fe/core/templating/PropertyHelper","../../helpers/Aggregation","sap/fe/core/templating/UIFormatters","./Criticality"],function(M,I,A,C,D,B,a,K,t,T,b,S,c,P,d,U,e){"use strict";var _={};var g=e.getMessageTypeFromCriticalityType;var f=U.getDisplayMode;var h=d.AggregationHelper;var j=P.getTargetValueOnDataPoint;var k=P.isPathExpression;var l=P.getAssociatedCurrencyProperty;var m=P.getAssociatedUnitProperty;var p=P.isProperty;var q=c.IssueType;var r=c.IssueSeverity;var s=c.IssueCategory;var u=S.replaceSpecialChars;var v=b.isPathUpdatable;var w=b.isPathInsertable;var x=b.isPathDeletable;var y=b.getTargetObjectPath;var z=T.MessageType;var E=K.KeyHelper;var F=a.UI;var G=a.singletonPathVisitor;var H=a.Draft;var J=B.resolveBindingString;var L=B.or;var N=B.not;var O=B.isConstant;var Q=B.isBinding;var R=B.ifElse;var V=B.formatResult;var W=B.equal;var X=B.constant;var Y=B.compileBinding;var Z=B.bindingExpression;var $=B.annotationExpression;var a1=B.and;var b1=D.isDataFieldTypes;var c1=D.isDataFieldForActionAbstract;var d1=D.isDataFieldAlwaysHidden;var e1=D.getSemanticObjectPath;var f1=D.collectRelatedPropertiesRecursively;var g1=D.collectRelatedProperties;var h1=C.Placement;var i1=C.insertCustomElements;var j1=A.removeDuplicateActions;var k1=A.isActionNavigable;var l1=A.getActionsFromManifest;var m1=I.TableID;var n1=M.VisualizationType;var o1=M.VariantManagementType;var p1=M.TemplateType;var q1=M.SelectionMode;var r1=M.HorizontalAlign;var s1=M.CreationMode;var t1=M.AvailabilityType;var u1=M.ActionType;function v1(n,i){return y1(n)||x1(n,i)||E1(n,i)||w1();}function w1(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function x1(n,i){if(typeof Symbol==="undefined"||!(Symbol.iterator in Object(n)))return;var o=[];var _n=true;var _d=false;var _e=undefined;try{for(var _i=n[Symbol.iterator](),_s;!(_n=(_s=_i.next()).done);_n=true){o.push(_s.value);if(i&&o.length===i)break;}}catch(F2){_d=true;_e=F2;}finally{try{if(!_n&&_i["return"]!=null)_i["return"]();}finally{if(_d)throw _e;}}return o;}function y1(i){if(Array.isArray(i))return i;}function z1(o,i){var n=Object.keys(o);if(Object.getOwnPropertySymbols){var F2=Object.getOwnPropertySymbols(o);if(i)F2=F2.filter(function(G2){return Object.getOwnPropertyDescriptor(o,G2).enumerable;});n.push.apply(n,F2);}return n;}function A1(n){for(var i=1;i<arguments.length;i++){var o=arguments[i]!=null?arguments[i]:{};if(i%2){z1(Object(o),true).forEach(function(F2){B1(n,F2,o[F2]);});}else if(Object.getOwnPropertyDescriptors){Object.defineProperties(n,Object.getOwnPropertyDescriptors(o));}else{z1(Object(o)).forEach(function(F2){Object.defineProperty(n,F2,Object.getOwnPropertyDescriptor(o,F2));});}}return n;}function B1(o,i,n){if(i in o){Object.defineProperty(o,i,{value:n,enumerable:true,configurable:true,writable:true});}else{o[i]=n;}return o;}function C1(i){return G1(i)||F1(i)||E1(i)||D1();}function D1(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function E1(o,i){if(!o)return;if(typeof o==="string")return H1(o,i);var n=Object.prototype.toString.call(o).slice(8,-1);if(n==="Object"&&o.constructor)n=o.constructor.name;if(n==="Map"||n==="Set")return Array.from(n);if(n==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return H1(o,i);}function F1(i){if(typeof Symbol!=="undefined"&&Symbol.iterator in Object(i))return Array.from(i);}function G1(i){if(Array.isArray(i))return H1(i);}function H1(n,o){if(o==null||o>n.length)o=n.length;for(var i=0,F2=new Array(o);i<o;i++){F2[i]=n[i];}return F2;}var I1;(function(I1){I1["Default"]="Default";I1["Annotation"]="Annotation";I1["Slot"]="Slot";})(I1||(I1={}));function J1(i,n,o,F2){var G2=Z1(i,n,o);var H2=G2.tableActions;var I2=G2.hiddenTableActions;return i1(H2,l1(o.getManifestControlConfiguration(n).actions,o,H2,F2,true,I2),{isNavigable:"overwrite",enableOnSelect:"overwrite",enableAutoScroll:"overwrite",enabled:"overwrite",defaultValuesExtensionFunction:"overwrite"});}_.getTableActions=J1;function K1(i,n,o,F2){var G2=l2(i,n,o);var H2=p2(o.getManifestControlConfiguration(n).columns,G2,o,o.getAnnotationEntityType(i),F2);return i1(G2,H2,{width:"overwrite",isNavigable:"overwrite",availability:"overwrite",settings:"overwrite",horizontalAlign:"overwrite",formatOptions:"overwrite"});}_.getTableColumns=K1;var L1=function(i,n,o){var F2=new h(i,o);function G2(K2){return n.find(function(L2){var M2=L2;return M2.propertyInfos===undefined&&M2.relativePath===K2;});}if(!F2.isAnalyticsSupported()){return undefined;}var H2=new Set();n.forEach(function(K2){var L2=K2;if(L2.unit){H2.add(L2.unit);}});var I2=F2.getCustomAggregateDefinitions();var J2={};n.forEach(function(K2){var L2=K2;if(L2.propertyInfos===undefined&&L2.relativePath){var M2=I2[L2.relativePath];if(M2&&!H2.has(L2.name)&&!L2.isDataPointFakeTargetProperty){J2[L2.name]={defaultAggregate:{},relativePath:L2.relativePath};var N2=[];M2.forEach(function(O2){var K2=G2(O2);if(K2){N2.push(K2.name);}});if(N2.length){J2[L2.name].defaultAggregate.contextDefiningProperties=N2;}}}});return J2;};_.getAggregateDefinitionsFromEntityType=L1;function M1(i,n,o,F2){if(i.control.type==="AnalyticalTable"){var G2=L1(n,i.columns,o);if(G2){i.enableAnalytics=true;i.aggregates=G2;i.annotation.groupConditions=y2(F2,i.columns);i.annotation.aggregateConditions=z2(F2,i.columns);}i.control.type="GridTable";}}function N1(i,n){var o=i.getManifestWrapper();if(n&&o.getNavigationConfiguration(n)){var F2=o.getNavigationConfiguration(n);if(Object.keys(F2).length>0){return n;}}var G2=i.getDataModelObjectPath();var H2=i.getContextPath();var I2=o.getNavigationConfiguration(H2);if(I2&&Object.keys(I2).length>0){return H2;}return G2.targetEntitySet?G2.targetEntitySet.name:G2.startingEntitySet.name;}function O1(i,n){function o(F2){return n.find(function(G2){var H2=G2;return H2.propertyInfos===undefined&&H2.relativePath===F2;});}n.forEach(function(F2){var G2=F2;if(G2.propertyInfos===undefined&&G2.relativePath){var H2=i.entityProperties.find(function(Q2){return Q2.name===G2.relativePath;});if(H2){var I2,J2,K2;var L2=((I2=l(H2))===null||I2===void 0?void 0:I2.name)||((J2=m(H2))===null||J2===void 0?void 0:J2.name);if(L2){var M2=o(L2);G2.unit=M2===null||M2===void 0?void 0:M2.name;}var N2=f(H2),O2=(K2=H2.annotations.Common)===null||K2===void 0?void 0:K2.Text;if(k(O2)&&N2!=="Value"){var P2=o(O2.path);if(P2&&P2.name!==G2.name){G2.textArrangement={textProperty:P2.name,mode:N2};}}}}});}_.updateLinkedProperties=O1;function P1(i,n,o,F2,G2,H2){var I2=E2(i,n,o,G2);var J2=C2(n),K2=J2.navigationPropertyPath;var L2=N1(o,K2);var M2=o.getManifestWrapper().getNavigationConfiguration(L2);var N2=K1(i,n,o,M2);var O2={type:n1.Table,annotation:A2(i,n,o,I2,N2,F2,H2),control:I2,actions:j1(J1(i,n,o,M2)),columns:N2,enableDataStateFilter:o.getTemplateType()==="ObjectPage",operationAvailableMap:R1(i)};O1(o.getAnnotationEntityType(i),N2);M1(O2,o.getAnnotationEntityType(i),o,F2);return O2;}_.createTableVisualization=P1;function Q1(i){var n=E2(undefined,"",i,false);var o=b2({},i.getEntityType(),[],[],i,n.type);var F2={type:n1.Table,annotation:A2(undefined,"",i,n,o),control:n,actions:[],columns:o,enableDataStateFilter:i.getTemplateType()==="ObjectPage",operationAvailableMap:R1(undefined)};O1(i.getEntityType(),o);M1(F2,i.getEntityType(),i);return F2;}_.createDefaultTableVisualization=Q1;function R1(i){var o={};if(i){i.forEach(function(n){if(n.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"){var F2=n.Action;if((F2===null||F2===void 0?void 0:F2.indexOf("/"))<0&&!n.Determining){var G2;var H2=n.ActionTarget;if(H2===null||H2===void 0?void 0:(G2=H2.parameters)===null||G2===void 0?void 0:G2.length){var I2,J2,K2,L2;var M2=H2.parameters[0].fullyQualifiedName,N2=M2.substring(M2.lastIndexOf("/")+1),O2=$(H2===null||H2===void 0?void 0:(I2=H2.annotations)===null||I2===void 0?void 0:(J2=I2.Core)===null||J2===void 0?void 0:J2.OperationAvailable,[],undefined,function(P2){return P2?P2.substring(N2.length+1):"";});if(O2===null||O2===void 0?void 0:O2.path){o[F2]=O2.path;}else if((H2===null||H2===void 0?void 0:(K2=H2.annotations)===null||K2===void 0?void 0:(L2=K2.Core)===null||L2===void 0?void 0:L2.OperationAvailable)!==undefined){o[F2]=O2;}}}}});}return JSON.stringify(o);}function S1(i,n,o,F2){var G2=[];i.forEach(function(H2){var I2,J2;if(H2.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"&&(H2===null||H2===void 0?void 0:(I2=H2.ActionTarget)===null||I2===void 0?void 0:I2.isBound)&&n===(H2===null||H2===void 0?void 0:H2.ActionTarget.sourceEntityType)||H2.$Type==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"&&H2.RequiresContext&&(H2===null||H2===void 0?void 0:(J2=H2.Inline)===null||J2===void 0?void 0:J2.valueOf())!==true){var K2,L2,M2;if(typeof((K2=H2.annotations)===null||K2===void 0?void 0:(L2=K2.UI)===null||L2===void 0?void 0:(M2=L2.Hidden)===null||M2===void 0?void 0:M2.valueOf())==="object"){G2.push(W(T1(H2,o,F2),false));}}});return G2;}function T1(i,n,o){var F2,G2,H2;var I2;if(((F2=i)===null||F2===void 0?void 0:F2.$Type)==="com.sap.vocabularies.UI.v1.DataFieldForAction"||((G2=i)===null||G2===void 0?void 0:G2.$Type)==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"){var J2,K2,L2;I2=(J2=i)===null||J2===void 0?void 0:(K2=J2.annotations)===null||K2===void 0?void 0:(L2=K2.UI)===null||L2===void 0?void 0:L2.Hidden;}else{var M2;I2=(M2=i)===null||M2===void 0?void 0:M2.visible;}var N2;if((H2=I2)===null||H2===void 0?void 0:H2.path){N2=I2.path;}else{N2=I2;}if(N2){var O2;if((O2=i)===null||O2===void 0?void 0:O2.visible){N2=N2.substring(1,N2.length-1);}if(N2.indexOf("/")>0){var P2;var Q2=N2.split("/");var R2=Q2[0];if((n===null||n===void 0?void 0:(P2=n.targetObject)===null||P2===void 0?void 0:P2._type)==="NavigationProperty"&&n.targetObject.partner===R2){return Z(Q2.slice(1).join("/"));}else{return X(true);}}else if(o){return Z(N2);}else{return X(true);}}return X(true);}function U1(i,n){return i.some(function(o){var F2,G2,H2,I2,J2,K2,L2;if((o.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"||o.$Type==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation")&&(o===null||o===void 0?void 0:(F2=o.Inline)===null||F2===void 0?void 0:F2.valueOf())!==true&&(((G2=o.annotations)===null||G2===void 0?void 0:(H2=G2.UI)===null||H2===void 0?void 0:(I2=H2.Hidden)===null||I2===void 0?void 0:I2.valueOf())===false||((J2=o.annotations)===null||J2===void 0?void 0:(K2=J2.UI)===null||K2===void 0?void 0:(L2=K2.Hidden)===null||L2===void 0?void 0:L2.valueOf())===undefined)){if(o.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"){var M2;return(o===null||o===void 0?void 0:(M2=o.ActionTarget)===null||M2===void 0?void 0:M2.isBound)&&n===(o===null||o===void 0?void 0:o.ActionTarget.sourceEntityType);}else if(o.$Type==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"){return o.RequiresContext;}}return false;});}function V1(i){return Object.keys(i).some(function(n){var o;var F2=i[n];if(F2.requiresSelection&&((o=F2.visible)===null||o===void 0?void 0:o.toString())==="true"){return true;}return false;});}function W1(i){var n=[];if(i){Object.keys(i).forEach(function(o){var F2=i[o];if(F2.requiresSelection===true&&F2.visible!==undefined){if(typeof F2.visible==="string"){var G2;n.push(J(F2===null||F2===void 0?void 0:(G2=F2.visible)===null||G2===void 0?void 0:G2.valueOf()));}}});}return n;}function X1(i){var n=x(i.getDataModelObjectPath());var o=v(i.getDataModelObjectPath());return{isDeletable:!(O(n)&&n.value===false),isUpdatable:!(O(o)&&o.value===false)};}_.getCapabilityRestriction=X1;function Y1(i,n,o,F2,G2){var H2;if(!i){return q1.None;}var I2=o.getManifestControlConfiguration(n);var J2=(H2=I2.tableSettings)===null||H2===void 0?void 0:H2.selectionMode;var K2=[],L2=[];var M2=l1(o.getManifestControlConfiguration(n).actions,o,[],undefined,false);var N2,O2;if(o.getTemplateType()===p1.ObjectPage){N2=x(o.getDataModelObjectPath(),undefined);O2=N2?Y(N2,true):N2;}if(J2&&J2===q1.None){if(!F2){if(G2.isDeletable||O2!=="false"){J2=q1.Multi;return Y(R(W(Z("/editMode","ui"),"Editable"),X(J2),X("None")));}else{J2=q1.None;}}else if(F2){if(G2.isDeletable){J2=q1.Multi;return J2;}else{J2=q1.None;}}}else if(!J2||J2===q1.Auto){J2=q1.Multi;}if(U1(i,o.getEntityType())||V1(M2)){return J2;}K2=S1(i,o.getEntityType(),o.getDataModelObjectPath(),F2);L2=W1(M2);if(K2.length===0&&L2.length===0){if(!F2){if(G2.isDeletable||O2!=="false"){return Y(R(W(Z("/editMode","ui"),"Editable"),X(J2),X(q1.None)));}else{return q1.None;}}else if(G2.isDeletable){return J2;}else{return q1.None;}}else if(!F2){if(G2.isDeletable||O2!=="false"){return Y(R(W(Z("/editMode","ui"),"Editable"),X(J2),R(L.apply(void 0,C1(K2.concat(L2))),X(J2),X(q1.None))));}else{return Y(R(L.apply(void 0,C1(K2.concat(L2))),X(J2),X(q1.None)));}}else if(G2.isDeletable){return q1.Multi;}else{return Y(R(L.apply(void 0,C1(K2.concat(L2))),X(J2),X(q1.None)));}}_.getSelectionMode=Y1;function Z1(i,n,o){var F2=[];var G2=[];if(i){i.forEach(function(H2){var I2,J2,K2,L2,M2,N2,O2,P2,Q2,R2;var S2;if(c1(H2)&&!(((I2=H2.annotations)===null||I2===void 0?void 0:(J2=I2.UI)===null||J2===void 0?void 0:(K2=J2.Hidden)===null||K2===void 0?void 0:K2.valueOf())===true)&&!H2.Inline&&!H2.Determining){var T2=E.generateKeyFromDataField(H2);switch(H2.$Type){case"com.sap.vocabularies.UI.v1.DataFieldForAction":S2={type:u1.DataFieldForAction,annotationPath:o.getEntitySetBasedAnnotationPath(H2.fullyQualifiedName),key:T2,visible:Y(N(W($((L2=H2.annotations)===null||L2===void 0?void 0:(M2=L2.UI)===null||M2===void 0?void 0:M2.Hidden,[],undefined,o.getRelativeModelPathFunction()),true))),isNavigable:true};break;case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":S2={type:u1.DataFieldForIntentBasedNavigation,annotationPath:o.getEntitySetBasedAnnotationPath(H2.fullyQualifiedName),key:T2,visible:Y(N(W($((N2=H2.annotations)===null||N2===void 0?void 0:(O2=N2.UI)===null||O2===void 0?void 0:O2.Hidden,[],undefined,o.getRelativeModelPathFunction()),true)))};break;default:break;}}else if(((P2=H2.annotations)===null||P2===void 0?void 0:(Q2=P2.UI)===null||Q2===void 0?void 0:(R2=Q2.Hidden)===null||R2===void 0?void 0:R2.valueOf())===true){G2.push({type:u1.Default,key:E.generateKeyFromDataField(H2)});}if(S2){F2.push(S2);}});}return{tableActions:F2,hiddenTableActions:G2};}function $1(i,n,o){var F2=z.None;if(i){if(typeof i==="object"){F2=$(i);}else{F2=g(i);}}return R(n&&H.IsNewObject,z.Information,V([F2,Z("filteredMessages","internal")],t.rowHighlighting,o));}function _1(i,n,o,F2){var G2;var H2=(F2===null||F2===void 0?void 0:F2.create)||(F2===null||F2===void 0?void 0:F2.detail);if((H2===null||H2===void 0?void 0:H2.outbound)&&H2.outboundDetail&&(F2===null||F2===void 0?void 0:F2.create)){return{mode:"External",outbound:H2.outbound,outboundDetail:H2.outboundDetail,navigationSettings:F2};}var I2;if(i){var J2,K2,L2,M2,N2;var O2=(J2=o.getEntitySet())===null||J2===void 0?void 0:J2.annotations;I2=(O2===null||O2===void 0?void 0:(K2=O2.Common)===null||K2===void 0?void 0:(L2=K2.DraftRoot)===null||L2===void 0?void 0:L2.NewAction)||(O2===null||O2===void 0?void 0:(M2=O2.Session)===null||M2===void 0?void 0:(N2=M2.StickySessionSupported)===null||N2===void 0?void 0:N2.NewAction);if(n.creationMode===s1.CreationRow&&I2){throw Error("Creation mode '".concat(s1.CreationRow,"' can not be used with a custom 'new' action (").concat(I2,")"));}if(H2===null||H2===void 0?void 0:H2.route){var P2;return{mode:n.creationMode,append:n.createAtEnd,newAction:(P2=I2)===null||P2===void 0?void 0:P2.toString(),navigateToTarget:n.creationMode===s1.NewPage?H2.route:undefined};}}if(n.creationMode===s1.NewPage){n.creationMode=s1.Inline;}return{mode:n.creationMode,append:n.createAtEnd,newAction:(G2=I2)===null||G2===void 0?void 0:G2.toString()};}var a2=function(i,n,o,F2,G2){var H2,I2;var J2=z.None;var K2=o.getEntityType();if(F2&&i){var L2,M2;I2=((L2=F2.display)===null||L2===void 0?void 0:L2.target)||((M2=F2.detail)===null||M2===void 0?void 0:M2.outbound);if(I2){H2=".handlers.onChevronPressNavigateOutBound( $controller ,'"+I2+"', ${$parameters>bindingContext})";}else if(K2){var N2;var O2=o.getEntitySet();I2=(N2=F2.detail)===null||N2===void 0?void 0:N2.route;if(I2){var P2,Q2,R2,S2,T2,U2,V2,W2,X2,Y2;J2=$1((P2=i.annotations)===null||P2===void 0?void 0:(Q2=P2.UI)===null||Q2===void 0?void 0:Q2.Criticality,!!(O2===null||O2===void 0?void 0:(R2=O2.annotations)===null||R2===void 0?void 0:(S2=R2.Common)===null||S2===void 0?void 0:S2.DraftRoot)||!!(O2===null||O2===void 0?void 0:(T2=O2.annotations)===null||T2===void 0?void 0:(U2=T2.Common)===null||U2===void 0?void 0:U2.DraftNode),K2);H2="API.onTableRowPress($event, $controller, ${$parameters>bindingContext}, { callExtension: true, targetPath: '"+G2+"', editable : "+((O2===null||O2===void 0?void 0:(V2=O2.annotations)===null||V2===void 0?void 0:(W2=V2.Common)===null||W2===void 0?void 0:W2.DraftRoot)||(O2===null||O2===void 0?void 0:(X2=O2.annotations)===null||X2===void 0?void 0:(Y2=X2.Common)===null||Y2===void 0?void 0:Y2.DraftNode)?"!${$parameters>bindingContext}.getProperty('IsActiveEntity')":"undefined")+"})";}else{var Z2,$2;J2=$1((Z2=i.annotations)===null||Z2===void 0?void 0:($2=Z2.UI)===null||$2===void 0?void 0:$2.Criticality,false,K2);}}}var _2=V([Z("/deepestPath","internal")],t.navigatedRow,K2);return{press:H2,action:H2?"Navigation":undefined,rowHighlighting:Y(J2),rowNavigated:Y(_2)};};var b2=function(i,n){var o=arguments.length>2&&arguments[2]!==undefined?arguments[2]:[];var F2=arguments.length>3?arguments[3]:undefined;var G2=arguments.length>4?arguments[4]:undefined;var H2=arguments.length>5?arguments[5]:undefined;var I2=[];var J2=new h(n,G2);n.entityProperties.forEach(function(K2){var L2=o.some(function(Q2){return Q2.name===K2.name;});if(!K2.targetType&&!L2){var M2=g1(K2.name,K2,G2,true,H2);var N2=Object.keys(M2.properties);var O2=Object.keys(M2.additionalProperties);var P2=c2(K2,G2.getEntitySetBasedAnnotationPath(K2.fullyQualifiedName),K2.name,true,true,F2,J2,G2);if(N2.length>0){P2.propertyInfos=N2;P2.exportSettings=A1({},P2.exportSettings,{template:M2.exportSettingsTemplate,wrap:M2.exportSettingsWrapping});N2.forEach(function(Q2){i[Q2]=M2.properties[Q2];});}if(O2.length>0){P2.additionalPropertyInfos=O2;O2.forEach(function(Q2){i[Q2]=M2.additionalProperties[Q2];});}I2.push(P2);}});return I2;};_.getColumnsFromEntityType=b2;var c2=function(i,n,o,F2,G2,H2,I2,J2){var K2,L2,M2,N2,O2,P2,Q2,R2,S2;var T2=F2?o:"Property::"+o;var U2=(F2?"DataField::":"Property::")+u(o);var V2=e1(J2,i);var W2=((K2=i.annotations)===null||K2===void 0?void 0:(L2=K2.UI)===null||L2===void 0?void 0:(M2=L2.Hidden)===null||M2===void 0?void 0:M2.valueOf())===true;var X2=i.name?i2(i.name,true,false):undefined;var Y2=X2!=i.name;var Z2=T2.indexOf("@com.sap.vocabularies.UI.v1.DataPoint")>-1;var $2=Z2?{template:j(i)}:undefined;return{key:U2,isGroupable:!Z2&&!W2?I2.isPropertyGroupable(i):false,type:I1.Annotation,label:e2(i,Y2),groupLabel:Y2?e2(i):null,group:Y2?X2:null,annotationPath:n,semanticObjectPath:V2,availability:!G2||W2||Z2?t1.Hidden:t1.Adaptation,name:T2,relativePath:Z2?((N2=i.annotations)===null||N2===void 0?void 0:(O2=N2.UI)===null||O2===void 0?void 0:(P2=O2.DataFieldDefault)===null||P2===void 0?void 0:(Q2=P2.Target)===null||Q2===void 0?void 0:(R2=Q2.$target)===null||R2===void 0?void 0:(S2=R2.Value)===null||S2===void 0?void 0:S2.path)||i.Value.path:o,sortable:!W2&&H2.indexOf(o)===-1&&!Z2,isKey:i.isKey,isDataPointFakeTargetProperty:Z2,exportSettings:$2};};var d2=function(i){switch(i.$Type){case"com.sap.vocabularies.UI.v1.DataFieldForAction":case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":return!!i.Inline;case"com.sap.vocabularies.UI.v1.DataFieldWithAction":case"com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation":return false;case"com.sap.vocabularies.UI.v1.DataField":case"com.sap.vocabularies.UI.v1.DataFieldWithUrl":case"com.sap.vocabularies.UI.v1.DataFieldForAnnotation":case"com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":return true;default:}};var e2=function(i){var n=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;if(!i){return undefined;}if(p(i)){var o,F2,G2,H2,I2;var J2=(o=i.annotations)===null||o===void 0?void 0:(F2=o.UI)===null||F2===void 0?void 0:F2.DataFieldDefault;if(J2&&!J2.qualifier&&((G2=J2.Label)===null||G2===void 0?void 0:G2.valueOf())){var K2;return Y($((K2=J2.Label)===null||K2===void 0?void 0:K2.valueOf()));}return Y($(((H2=i.annotations.Common)===null||H2===void 0?void 0:(I2=H2.Label)===null||I2===void 0?void 0:I2.valueOf())||i.name));}else if(b1(i)){var L2,M2,N2,O2,P2,Q2,R2,S2;if(!!n&&i.$Type==="com.sap.vocabularies.UI.v1.DataFieldWithIntentBasedNavigation"){var T2;return Y($((T2=i.Label)===null||T2===void 0?void 0:T2.valueOf()));}return Y($(((L2=i.Label)===null||L2===void 0?void 0:L2.valueOf())||((M2=i.Value)===null||M2===void 0?void 0:(N2=M2.$target)===null||N2===void 0?void 0:(O2=N2.annotations)===null||O2===void 0?void 0:(P2=O2.Common)===null||P2===void 0?void 0:(Q2=P2.Label)===null||Q2===void 0?void 0:Q2.valueOf())||((R2=i.Value)===null||R2===void 0?void 0:(S2=R2.$target)===null||S2===void 0?void 0:S2.name)));}else if(i.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAnnotation"){var U2,V2,W2,X2,Y2,Z2,$2,_2;return Y($(((U2=i.Label)===null||U2===void 0?void 0:U2.valueOf())||((V2=(_2=i.Target)===null||_2===void 0?void 0:_2.$target)===null||V2===void 0?void 0:(W2=V2.Value)===null||W2===void 0?void 0:(X2=W2.$target)===null||X2===void 0?void 0:(Y2=X2.annotations)===null||Y2===void 0?void 0:(Z2=Y2.Common)===null||Z2===void 0?void 0:($2=Z2.Label)===null||$2===void 0?void 0:$2.valueOf())));}else{var a3;return Y($((a3=i.Label)===null||a3===void 0?void 0:a3.valueOf()));}};var f2=function(i,n,o,F2,G2){var H2=[];var I2={};var J2=new h(G2,F2);Object.keys(i).forEach(function(K2){var L2=i[K2],M2=F2.getAbsoluteAnnotationPath(K2),N2=n.find(function(P2){return P2.name===K2;});if(N2===undefined){H2.push(c2(L2,M2,K2,true,false,o,J2,F2));}else if(N2.annotationPath!==M2||N2.propertyInfos&&N2.propertyInfos.indexOf(K2)!==-1){var O2="Property::"+K2;if(!n.some(function(P2){return P2.name===O2;})){H2.push(c2(L2,M2,K2,false,false,o,J2,F2));I2[K2]=O2;}}});n.forEach(function(K2){var L2,M2;K2.propertyInfos=(L2=K2.propertyInfos)===null||L2===void 0?void 0:L2.map(function(N2){var O2;return(O2=I2[N2])!==null&&O2!==void 0?O2:N2;});K2.additionalPropertyInfos=(M2=K2.additionalPropertyInfos)===null||M2===void 0?void 0:M2.map(function(N2){var O2;return(O2=I2[N2])!==null&&O2!==void 0?O2:N2;});});return H2;};var g2=function(i){var n,o,F2;if(b1(i)){var G2;return(G2=i.Value)===null||G2===void 0?void 0:G2.path;}else if(i.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAnnotation"&&((n=(F2=i.Target)===null||F2===void 0?void 0:F2.$target)===null||n===void 0?void 0:(o=n.Value)===null||o===void 0?void 0:o.path)){var H2,I2;return(H2=(I2=i.Target)===null||I2===void 0?void 0:I2.$target)===null||H2===void 0?void 0:H2.Value.path;}else{return E.generateKeyFromDataField(i);}};var h2=function(i){var n,o,F2,G2;var H2="";switch(i.$Type){case"com.sap.vocabularies.UI.v1.DataField":case"com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":case"com.sap.vocabularies.UI.v1.DataFieldWithUrl":H2=(n=i)===null||n===void 0?void 0:(o=n.Value)===null||o===void 0?void 0:o.path;break;case"com.sap.vocabularies.UI.v1.DataFieldForAnnotation":H2=(F2=i)===null||F2===void 0?void 0:(G2=F2.Target)===null||G2===void 0?void 0:G2.value;break;case"com.sap.vocabularies.UI.v1.DataFieldForAction":case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":H2=E.generateKeyFromDataField(i);break;}return H2;};var i2=function(i,n,o){var F2=n?i.lastIndexOf("/"):i.indexOf("/");if(F2===-1){return i;}return o?i.substring(F2+1,i.length):i.substring(0,F2);};var j2=function(i,n,o){var F2=false;if(o.indexOf(n)===-1){switch(i.$Type){case"com.sap.vocabularies.UI.v1.DataField":case"com.sap.vocabularies.UI.v1.DataFieldWithUrl":F2=true;break;case"com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation":case"com.sap.vocabularies.UI.v1.DataFieldForAction":F2=false;break;}}return F2;};function k2(){return{textLinesDisplay:4,textLinesEdit:4};}var l2=function(i,n,o){var F2,G2,H2,I2,J2,K2,L2;var M2=o.getAnnotationEntityType(i),N2=[],O2={},P2=(F2=(G2=(H2=o.getEntitySet())===null||H2===void 0?void 0:(I2=H2.annotations)===null||I2===void 0?void 0:(J2=I2.Capabilities)===null||J2===void 0?void 0:(K2=J2.SortRestrictions)===null||K2===void 0?void 0:K2.NonSortableProperties)===null||G2===void 0?void 0:G2.map(function(U2){return U2.value;}))!==null&&F2!==void 0?F2:[],Q2=o.getManifestControlConfiguration(n),R2=(Q2===null||Q2===void 0?void 0:(L2=Q2.tableSettings)===null||L2===void 0?void 0:L2.type)||"ResponsiveTable";if(i){i.forEach(function(U2){var V2,W2,X2,Y2,Z2;if(!d2(U2)){return;}var $2=b1(U2)&&((V2=U2.Value)===null||V2===void 0?void 0:(W2=V2.$target)===null||W2===void 0?void 0:W2.fullyQualifiedName)?e1(o,U2):undefined;var _2=h2(U2);var a3=f1(U2,o,R2);var b3=Object.keys(a3.properties);var c3=Object.keys(a3.additionalProperties);var d3=i2(_2,true,false);var e3=d3!=_2;var f3=e2(U2,e3);var g3=g2(U2);N2.push({key:E.generateKeyFromDataField(U2),type:I1.Annotation,label:f3,groupLabel:e3?e2(U2):null,group:e3?d3:null,annotationPath:o.getEntitySetBasedAnnotationPath(U2.fullyQualifiedName),semanticObjectPath:$2,availability:d1(U2)?t1.Hidden:t1.Default,name:g3,relativePath:_2,sortable:j2(U2,_2,P2),propertyInfos:b3.length>0?b3:undefined,additionalPropertyInfos:c3.length>0?c3:undefined,exportSettings:{template:a3.exportSettingsTemplate,wrap:a3.exportSettingsWrapping},width:((X2=U2.annotations)===null||X2===void 0?void 0:(Y2=X2.HTML5)===null||Y2===void 0?void 0:(Z2=Y2.CssDefaults)===null||Z2===void 0?void 0:Z2.width)||undefined,isNavigable:true,formatOptions:k2(),exportContactProperty:a3.exportSettingsContactProperty});b3.forEach(function(g3){O2[g3]=a3.properties[g3];});c3.forEach(function(g3){O2[g3]=a3.additionalProperties[g3];});});}var S2=b2(O2,M2,N2,P2,o,R2);S2=S2.concat(N2);var T2=f2(O2,S2,P2,o,M2);S2=S2.concat(T2);return S2;};var m2=function(i,n,o,F2){var G2;if(i){G2=i.map(function(H2){var I2=n.find(function(I2){return I2.relativePath===H2&&I2.propertyInfos===undefined;});if(I2){return I2.name;}else{var J2=f2(B1({},H2,F2.resolvePath(H2)),n,[],o,F2);n.push(J2[0]);return J2[0].name;}});}return G2;};var n2=function(i){return i.map(function(n){return"{".concat(i.indexOf(n),"}");}).join("\n");};var o2=function(i,n,o){if(i===undefined){return o?undefined:n;}return i;};var p2=function(i,n,o,F2,G2){var H2={};var I2=function(J2){var K2;var L2=i[J2];var M2=n.some(function(O2){return O2.key===J2;});E.validateKey(J2);var N2=m2(L2.properties,n,o,F2);H2[J2]={key:J2,id:"CustomColumn::"+J2,name:"CustomColumn::"+J2,header:L2.header,width:L2.width||undefined,horizontalAlign:o2(L2===null||L2===void 0?void 0:L2.horizontalAlign,r1.Begin,M2),type:L2.type==="Slot"?I1.Slot:I1.Default,availability:o2(L2===null||L2===void 0?void 0:L2.availability,t1.Default,M2),template:L2.template||"undefined",position:{anchor:(K2=L2.position)===null||K2===void 0?void 0:K2.anchor,placement:L2.position===undefined?h1.After:L2.position.placement},isNavigable:M2?undefined:k1(L2,G2,true),settings:L2.settings,sortable:false,propertyInfos:N2,formatOptions:A1({},k2(),{},L2.formatOptions),exportSettings:{template:N2?n2(N2):undefined,fieldLabel:N2?L2.header:undefined,wrap:N2&&N2.length>1?true:false}};};for(var J2 in i){I2(J2);}return H2;};function q2(i,n,o){var F2;var G2=n.getManifestWrapper();var H2=n.getManifestControlConfiguration(i);var I2=G2.getVariantManagement();var J2=[];var K2=o.type==="AnalyticalTable";if((H2===null||H2===void 0?void 0:(F2=H2.tableSettings)===null||F2===void 0?void 0:F2.personalization)!==undefined){var L2=H2.tableSettings.personalization;if(L2===true){return K2?"Sort,Column,Filter,Group,Aggregate":"Sort,Column,Filter";}else if(typeof L2==="object"){if(L2.sort){J2.push("Sort");}if(L2.column){J2.push("Column");}if(L2.filter){J2.push("Filter");}if(L2.group&&K2){J2.push("Group");}if(L2.aggregate&&K2){J2.push("Aggregate");}return J2.length>0?J2.join(","):undefined;}}else{J2.push("Sort");J2.push("Column");if(I2===o1.Control){J2.push("Filter");}if(K2){J2.push("Group");J2.push("Aggregate");}return J2.join(",");}return undefined;}_.getP13nMode=q2;function r2(i,n,o,F2){var G2;var H2=i.getEntitySet();var I2=i.getDataModelObjectPath();var J2=I2.navigationProperties.map(function(O2){return O2.name;});var K2=H2?$((H2===null||H2===void 0?void 0:(G2=H2.annotations.UI)===null||G2===void 0?void 0:G2.DeleteHidden)||false,J2,undefined,function(O2){return G(O2,i,J2);}):X(false);var L2=Y(K2);var M2,N2;if(i.getTemplateType()===p1.ObjectPage){M2=x(i.getDataModelObjectPath(),n);N2=M2?Y(M2):M2;}if(N2==="false"){return false;}else if(N2&&L2!=="true"){if(L2&&L2!=="false"){return"{= !$"+L2+" && ${ui>/editMode} === 'Editable'}";}else{return"{= ${ui>/editMode} === 'Editable'}";}}else if(L2==="true"||!o||F2&&i.getManifestWrapper().hasMultipleVisualizations(F2)||i.getTemplateType()===p1.AnalyticalListPage){return false;}else if(i.getTemplateType()!==p1.ListReport){if(L2&&L2==="false"){return"{= !$"+L2+" && ${ui>/editMode} === 'Editable'}";}else{return"{= ${ui>/editMode} === 'Editable'}";}}else if(Q(K2)){return Y(N(K2));}else{return true;}}_.getDeleteVisible=r2;function s2(i,n){if(n){var o=v(i.getDataModelObjectPath(),undefined,true);if(o===null||o===void 0?void 0:o.currentEntityRestriction){return false;}var F2=Y(o);return o?"{= %{internal>numberOfSelectedContexts} >= 2 && "+Y(o,F2)+"}":false;}return false;}_.getEnablementMassEdit=s2;function t2(i,n,o,F2){var G2,H2;var I2=i.getEntitySet(),J2=I2&&(I2===null||I2===void 0?void 0:(G2=I2.annotations.UI)===null||G2===void 0?void 0:(H2=G2.UpdateHidden)===null||H2===void 0?void 0:H2.valueOf()),K2=(n===null||n===void 0?void 0:n.enableMassEdit)||false,L2=n===null||n===void 0?void 0:n.selectionLimit;var M2=true;if(F2&&F2==="Single"||L2&&L2<2){M2=false;}else if(F2&&(F2==="Auto"||F2==="None")){M2=true;}if((o===null||o===void 0?void 0:o.isUpdatable)!==false&&M2&&K2){if(J2&&typeof J2==="boolean"){return!J2&&i.getTemplateType()===p1.ObjectPage?Y(F.IsEditable):false;}else if(J2&&(J2===null||J2===void 0?void 0:J2.path)){return i.getTemplateType()===p1.ObjectPage?Y(a1(W(F.IsEditable,true),W($(J2),false))):false;}return i.getTemplateType()===p1.ObjectPage?Y(F.IsEditable):false;}return false;}_.getVisibilityMassEdit=t2;function u2(i,n,o,F2){var G2,H2,I2,J2,K2,L2,M2;var N2=i.getEntitySet();var O2=i.getDataModelObjectPath();var P2=O2.navigationProperties.map(function(T2){return T2.name;});var Q2=N2?$((N2===null||N2===void 0?void 0:(G2=N2.annotations.UI)===null||G2===void 0?void 0:G2.CreateHidden)||false,P2,undefined,function(T2){return G(T2,i,P2);}):X(false);var R2=N2===null||N2===void 0?void 0:(H2=N2.annotations.Common)===null||H2===void 0?void 0:(I2=H2.DraftRoot)===null||I2===void 0?void 0:(J2=I2.NewAction)===null||J2===void 0?void 0:J2.toString();var S2=R2?$(i===null||i===void 0?void 0:(K2=i.getEntityType().actions[R2].annotations)===null||K2===void 0?void 0:(L2=K2.Core)===null||L2===void 0?void 0:(M2=L2.OperationAvailable)===null||M2===void 0?void 0:M2.valueOf(),[],true):undefined;return R(L(L(W(S2,false),a1(O(o),W(o,false),W(S2,undefined))),O(Q2)&&W(Q2,true),L(F2?i.getManifestWrapper().hasMultipleVisualizations(F2):false,i.getTemplateType()===p1.AnalyticalListPage)),false,R(n==="External",true,R(i.getTemplateType()===p1.ListReport,R(Q(Q2),N(Q2),true),a1(N(Q2),F.IsEditable))));}_.getCreateVisible=u2;function v2(i,n,o,F2,G2){return R(F2&&W(u2(i,n.mode,o,G2),true),i.getTemplateType()===p1.ObjectPage&&o,false);}_.getPasteEnabled=v2;function w2(i,n){var o;if(i===null||i===void 0?void 0:i.SortOrder){var F2=[];var G2={sorters:F2};i.SortOrder.forEach(function(H2){var I2,J2,K2,L2;var M2=(I2=H2.Property)===null||I2===void 0?void 0:(J2=I2.$target)===null||J2===void 0?void 0:J2.name;var N2=n.find(function(O2){return O2.name===M2;});N2===null||N2===void 0?void 0:(K2=N2.propertyInfos)===null||K2===void 0?void 0:K2.forEach(function(O2){G2.sorters.push({name:O2,descending:!!H2.Descending});});if(!(N2===null||N2===void 0?void 0:(L2=N2.propertyInfos)===null||L2===void 0?void 0:L2.length)){G2.sorters.push({name:M2,descending:!!H2.Descending});}});o=G2.sorters.length?JSON.stringify(G2):undefined;}return o;}function x2(i,n){var o=[];i.forEach(function(F2){var G2;if(F2===null||F2===void 0?void 0:(G2=F2.$target)===null||G2===void 0?void 0:G2.name){var H2=n.find(function(I2){var J2;var K2=I2;return!K2.propertyInfos&&K2.relativePath===(F2===null||F2===void 0?void 0:(J2=F2.$target)===null||J2===void 0?void 0:J2.name);});if(H2){o.push(H2.name);}}});return o;}function y2(i,n){var o;if(i===null||i===void 0?void 0:i.GroupBy){var F2=i.GroupBy;var G2=x2(F2,n).map(function(H2){return{name:H2};});o=G2.length?JSON.stringify({groupLevels:G2}):undefined;}return o;}function z2(i,n){var o;if(i===null||i===void 0?void 0:i.Total){var F2=i.Total;var G2={};x2(F2,n).forEach(function(H2){G2[H2]={};});o=JSON.stringify(G2);}return o;}function A2(i,n,o,F2,G2,H2,I2){var J2,K2,L2;var M2=C2(n),N2=M2.navigationPropertyPath;var O2=(J2=o.getDataModelObjectPath().targetEntityType.annotations)===null||J2===void 0?void 0:(K2=J2.UI)===null||K2===void 0?void 0:(L2=K2.HeaderInfo)===null||L2===void 0?void 0:L2.TypeNamePlural;var P2=o.getDataModelObjectPath().targetEntitySet;var Q2=o.getManifestWrapper();var R2=N2.length===0,S2=q2(n,o,F2),id=N2?m1(n):m1(o.getContextPath(),"LineItem");var U2=X1(o);var V2=Y1(i,n,o,R2,U2);var W2=N2?10:30;if(H2===null||H2===void 0?void 0:H2.MaxItems){W2=H2.MaxItems.valueOf();}var X2=N1(o,N2);var Y2=Q2.getNavigationConfiguration(X2);var Z2=_1(i,F2,o,Y2);var $2,_2;if(o.getTemplateType()===p1.ObjectPage){var a3;$2=x(o.getDataModelObjectPath(),undefined,true);if((a3=$2)===null||a3===void 0?void 0:a3.currentEntityRestriction){_2=undefined;}else{_2=$2?Y($2,true):$2;}}var b3=o.getDataModelObjectPath();var c3=w(b3);var d3=Q2.getVariantManagement();var e3=t2(o,F2,U2,V2);return{id:id,entityName:P2?P2.name:"",collection:y(o.getDataModelObjectPath()),navigationPath:N2,row:a2(i,n,o,Y2,X2),p13nMode:S2,show:{"delete":r2(o,N2,U2.isDeletable,I2),create:Y(u2(o,Z2===null||Z2===void 0?void 0:Z2.mode,c3)),paste:Y(v2(o,Z2,c3,F2.enablePaste,I2)),massEdit:{visible:e3,enabled:s2(o,e3)}},displayMode:B2(o,I2),create:Z2,selectionMode:V2,autoBindOnInit:o.getTemplateType()!==p1.ListReport&&o.getTemplateType()!==p1.AnalyticalListPage&&!(I2&&o.getManifestWrapper().hasMultipleVisualizations(I2)),variantManagement:d3==="Control"&&!S2?o1.None:d3,threshold:W2,sortConditions:w2(H2,G2),parentEntityDeleteEnabled:_2,title:O2};}_.getTableAnnotationConfiguration=A2;function B2(i,n){var o=i.getTemplateType();if(o===p1.ListReport||o===p1.AnalyticalListPage||n&&i.getManifestWrapper().hasMultipleVisualizations(n)){return true;}return false;}function C2(i){var n=i.split("@"),o=v1(n,2),F2=o[0],G2=o[1];if(F2.lastIndexOf("/")===F2.length-1){F2=F2.substr(0,F2.length-1);}return{navigationPropertyPath:F2,annotationPath:G2};}function D2(i,n){var o=n.getEntityTypeAnnotation(i);var F2=o.annotation;if(F2){var G2,H2;var I2=[];(G2=F2.SelectOptions)===null||G2===void 0?void 0:G2.forEach(function(J2){var K2=J2.PropertyName;var L2=K2.value;if(I2.indexOf(L2)===-1){I2.push(L2);}});return{text:F2===null||F2===void 0?void 0:(H2=F2.Text)===null||H2===void 0?void 0:H2.toString(),propertyNames:I2};}return undefined;}_.getSelectionVariantConfiguration=D2;function E2(i,n,o){var F2;var G2=arguments.length>3&&arguments[3]!==undefined?arguments[3]:false;var H2=o.getManifestControlConfiguration(n);var I2=H2&&H2.tableSettings||{};var J2;var K2=[];var L2=true;var M2=s1.NewPage;var N2;var O2=true;var P2=false;var Q2;var R2=false;var S2=false;var T2="ResponsiveTable";var U2=false;var V2=200;var W2=o.getTemplateType()==="ObjectPage";var X2=G2&&o.getManifestWrapper().isCondensedLayoutCompliant();var Y2=o.getEntityType();var Z2=new h(Y2,o);if(i){var $2,_2,a3,b3,c3,d3,e3,f3;var g3=o.getAnnotationEntityType(i);I2===null||I2===void 0?void 0:($2=I2.quickVariantSelection)===null||$2===void 0?void 0:(_2=$2.paths)===null||_2===void 0?void 0:_2.forEach(function(h3){var i3;J2=g3.resolvePath("@"+h3.annotationPath);if(J2){K2.push({annotationPath:h3.annotationPath});}N2={quickFilters:{enabled:o.getTemplateType()===p1.ListReport?"{= ${pageInternal>hasPendingFilters} !== true}":true,showCounts:I2===null||I2===void 0?void 0:(i3=I2.quickVariantSelection)===null||i3===void 0?void 0:i3.showCounts,paths:K2}};});M2=((a3=I2.creationMode)===null||a3===void 0?void 0:a3.name)||M2;O2=((b3=I2.creationMode)===null||b3===void 0?void 0:b3.createAtEnd)!==undefined?(c3=I2.creationMode)===null||c3===void 0?void 0:c3.createAtEnd:true;Q2=(d3=I2.creationMode)===null||d3===void 0?void 0:d3.customValidationFunction;P2=!Q2?!!((e3=I2.creationMode)===null||e3===void 0?void 0:e3.disableAddRowButtonForEmptyData):false;R2=I2.condensedTableLayout!==undefined?I2.condensedTableLayout:false;S2=!!((f3=I2.quickVariantSelection)===null||f3===void 0?void 0:f3.hideTableTitle);T2=(I2===null||I2===void 0?void 0:I2.type)||"ResponsiveTable";if(o.getTemplateType()!=="ObjectPage"){if((I2===null||I2===void 0?void 0:I2.type)==="AnalyticalTable"&&!Z2.isAnalyticsSupported()){T2="GridTable";}if(!(I2===null||I2===void 0?void 0:I2.type)){if(o.getManifestWrapper().isDesktop()&&Z2.isAnalyticsSupported()){T2="AnalyticalTable";}else{T2="ResponsiveTable";}}}U2=I2.enableFullScreen||false;if(U2===true&&o.getTemplateType()===p1.ListReport){U2=false;o.getDiagnostics().addIssue(s.Manifest,r.Low,q.FULLSCREENMODE_NOT_ON_LISTREPORT);}V2=I2.selectAll===true||I2.selectionLimit===0?0:I2.selectionLimit||200;W2=o.getTemplateType()==="ObjectPage"&&I2.enablePaste!==false;L2=I2.enableExport!==undefined?I2.enableExport:o.getTemplateType()!=="ObjectPage"||W2;}return{filters:N2,type:T2,enableFullScreen:U2,headerVisible:!(J2&&S2),enableExport:L2,creationMode:M2,createAtEnd:O2,disableAddRowButtonForEmptyData:P2,customValidationFunction:Q2,useCondensedTableLayout:R2&&X2,selectionLimit:V2,enablePaste:W2,showRowCount:!(I2===null||I2===void 0?void 0:(F2=I2.quickVariantSelection)===null||F2===void 0?void 0:F2.showCounts),enableMassEdit:I2===null||I2===void 0?void 0:I2.enableMassEdit};}_.getTableManifestConfiguration=E2;return _;},false);