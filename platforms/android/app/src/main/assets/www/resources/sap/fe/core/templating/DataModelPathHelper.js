/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/fe/core/helpers/BindingExpression","sap/fe/core/templating/PropertyHelper"],function(B,P){"use strict";var _={};var i=P.isPathExpression;var a=P.isAnnotationPathExpression;var e=B.equal;var c=B.constant;var b=B.annotationExpression;var g=function(p){var v=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];if(!p){return v;}else{if(v.length>=p.navigationProperties.length){var r=[];p.navigationProperties.forEach(function(z,A){if(v[A]!==z){r.push(v[A]);}});r=r.concat(v.slice(p.navigationProperties.length));var q=0;while(r.length>1&&q!=r.length-1){var s=r[q];var t=r[q+1];if(s.partner===t.name){r.splice(0,2);}else{q++;}}return r;}else{var u=[];v.forEach(function(z,A){if(p.navigationProperties[A]!==z){u.push(v[A]);}});u=u.concat(p.navigationProperties.slice(v.length));var w=0;while(u.length>1&&w!=u.length-1){var x=u[w];var y=u[w+1];if(x.partner===y.name){u.splice(0,2);}else{w++;}}u=u.map(function(z){return z.targetType.navigationProperties.find(function(A){return A.name===z.partner;});});return u;}}};_.getPathRelativeLocation=g;var d=function(p,q){var s="";if((i(q)||a(q))&&q.path){s=q.path;}else if(typeof q==="string"){s=q;}var t;if(i(q)||a(q)){t=q.$target;}else if(p.targetEntityType){t=p.targetEntityType.resolvePath(s);}else{t=p.targetObject;}var r=s.split("/");var u=p.targetEntitySet;var v=p.targetEntityType;var w=p.navigationProperties.concat();r.reduce(function(x,y){if(!x){return undefined;}var z=x.navigationProperties.find(function(A){return A.name===y;});if(z){w.push(z);v=z.targetType;if(u&&u.navigationPropertyBinding.hasOwnProperty(y)){u=u.navigationPropertyBinding[y];}return v;}return undefined;},p.targetEntityType);return{startingEntitySet:p.startingEntitySet,navigationProperties:w,contextLocation:p.contextLocation,targetEntitySet:u,targetEntityType:v,targetObject:t};};_.enhanceDataModelPath=d;var f=function(p){var t="/".concat(p.startingEntitySet.name);var q=p.startingEntitySet;var r=[];p.navigationProperties.forEach(function(s){r.push(s.name);if(q&&q.navigationPropertyBinding.hasOwnProperty(r.join("/"))){t+="/$NavigationPropertyBinding/".concat(r.join("/"),"/$");q=q.navigationPropertyBinding[r.join("/")];r=[];}});return t;};_.getTargetEntitySetPath=f;var h=function(p){var r=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var q="";if(!p.startingEntitySet){return"/";}if(!r){q+="/".concat(p.startingEntitySet.name);}if(p.navigationProperties.length>0){if(q.length>0){q+="/";}q+=p.navigationProperties.map(function(s){return s.name;}).join("/");}if(p.targetObject&&p.targetObject.name&&p.targetObject._type!=="NavigationProperty"&&p.targetObject._type!=="EntityType"&&p.targetObject!==p.startingEntitySet){if(!q.endsWith("/")){q+="/";}q+="".concat(p.targetObject.name);}else if(p.targetObject&&p.targetObject.hasOwnProperty("term")){if(q.length>0&&!q.endsWith("/")){q+="/";}q+="@".concat(p.targetObject.term);}return q;};_.getTargetObjectPath=h;var j=function(p){var q=arguments.length>1&&arguments[1]!==undefined?arguments[1]:false;var r=g(p.contextLocation,p.navigationProperties);if(q){if(r.find(function(t){return t.isCollection;})){return undefined;}}var s=r.map(function(t){return t.name;}).join("/");if(p.targetObject&&(p.targetObject.name||p.targetObject.type==="PropertyPath"&&p.targetObject.value)&&p.targetObject._type!=="NavigationProperty"&&p.targetObject!==p.startingEntitySet){if(s.length>0&&!s.endsWith("/")){s+="/";}s+=p.targetObject.type==="PropertyPath"?"".concat(p.targetObject.value):"".concat(p.targetObject.name);}else if(p.targetObject&&p.targetObject.hasOwnProperty("term")){if(s.length>0&&!s.endsWith("/")){s+="/";}s+="@".concat(p.targetObject.term);if(p.targetObject.hasOwnProperty("qualifier")&&!!p.targetObject.qualifier){s+="#".concat(p.targetObject.qualifier);}}else if(!p.targetObject){return undefined;}return s;};_.getContextRelativeTargetObjectPath=j;var k=function(p,q,t){return o(p,function(r){var s;return r===null||r===void 0?void 0:(s=r.UpdateRestrictions)===null||s===void 0?void 0:s.Updatable;},q,t);};_.isPathUpdatable=k;var l=function(p,q,t){return o(p,function(r){var s;return r===null||r===void 0?void 0:(s=r.DeleteRestrictions)===null||s===void 0?void 0:s.Deletable;},q,t);};_.isPathDeletable=l;var m=function(p,q){return o(p,function(r){var s;return r===null||r===void 0?void 0:(s=r.InsertRestrictions)===null||s===void 0?void 0:s.Insertable;},q);};_.isPathInsertable=m;var n=function(p,q){return o(p,function(r){if(r&&"FilterRestrictions"in r){var s;var t=(r===null||r===void 0?void 0:(s=r.FilterRestrictions)===null||s===void 0?void 0:s.FilterExpressionRestrictions)||[];var u=t.find(function(w){return w.Property.$target===p.targetObject;});if(u){var v;return q.indexOf(u===null||u===void 0?void 0:(v=u.AllowedExpressions)===null||v===void 0?void 0:v.toString())!==-1;}else{return false;}}else{return false;}});};_.checkFilterExpressionRestrictions=n;var o=function(p,q,r,t){var s,u,v;if(!p||!p.startingEntitySet){return c(true);}p=d(p,r);var w=p.startingEntitySet;var x=null;var y=[];var z=[];var A=w;var C=p.targetEntityType;var D=false;p.navigationProperties.forEach(function(O){if(D){y=[];}y.push(O.name);z.push(O);if(!O.containsTarget){var Q=y.join("/");if(w&&w.navigationPropertyBinding.hasOwnProperty(Q)){x=w;w=w.navigationPropertyBinding[Q];A=w;D=true;}else{x=w;w=null;D=true;}}else{x=w;A=null;}});var E=y.join("/");var F,G;if(x!==null){var H,I,J;var K=x;(H=K.annotations)===null||H===void 0?void 0:(I=H.Capabilities)===null||I===void 0?void 0:(J=I.NavigationRestrictions)===null||J===void 0?void 0:J.RestrictedProperties.forEach(function(O){var Q;if(((Q=O.NavigationProperty)===null||Q===void 0?void 0:Q.type)==="NavigationPropertyPath"){var S=q(O);if(E===O.NavigationProperty.value&&S!==undefined){var T;var U=z.slice(0,-1);if(A!==null){G=U;}else{if(U.length===0){G=z.slice(0);}else{G=U;}}F=e(b(S,g((T=p)===null||T===void 0?void 0:T.contextLocation,G).map(function(V){return V.name;})),true);}}});}var L;var M=q((s=A)===null||s===void 0?void 0:(u=s.annotations)===null||u===void 0?void 0:u.Capabilities);if(A===null&&M===undefined){var N;M=q(C===null||C===void 0?void 0:(N=C.annotations)===null||N===void 0?void 0:N.Capabilities);}if(M!==undefined){L=e(b(M,g(p.contextLocation,z).map(function(O){return O.name;})),true);}if(t&&!F&&((v=M)===null||v===void 0?void 0:v.path)){var R={"currentEntityRestriction":L};return R;}return F||L||c(true);};_.checkOnPath=o;return _;},false);