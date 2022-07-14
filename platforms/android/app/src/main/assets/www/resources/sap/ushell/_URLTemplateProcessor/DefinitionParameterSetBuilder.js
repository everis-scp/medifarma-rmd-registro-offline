// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/_URLTemplateProcessor/TemplateParameterParser","sap/ushell/_URLTemplateProcessor/Resolvers","sap/ushell/_URLTemplateProcessor/utils","sap/ushell/utils/type"],function(t,r,u,T){"use strict";var S="/payload/parameters/names";function b(p,s,d){if(!p||!p.names){return{};}if(!p.hasOwnProperty("mergeWith")){return p.names;}var m=p&&p.mergeWith;if(Array.isArray(m)===false&&typeof m!=="string"){throw new Error("The value of 'mergeWith' can only be a string or an array");}var P=p&&p.names;var D=f(p.mergeWith,s,d,{});var M=D.map(function(a){var o=t.parsePath(d,a);v(o);var c=r.resolvePath(o,{},s,{},{});if(!T.isPlainObject(c)){throw new Error("Cannot merge parameters from '"+a+"'. The path must point to an object");}return c;}).reduce(function(o,a){o=u.mergeObject(o,a);return o;},{});return u.mergeObject(M,P);}function v(p){if(p.pathType==="relative"){throw new Error("Please only specify absolute paths via mergeWith");}p.value.forEach(function(P){if(P.type!=="literal"){throw new Error("Please do not specify references in mergeWith paths");}});}function f(m,s,d,V){if(Array.isArray(m)){return m.slice().reverse();}if(typeof m==="string"){if(V[m]){throw new Error("Detected circular dependency of templates caused by mergeWith statements: ensure the template merges its parameters with a base template.");}V[m]=true;var p=t.parsePath(d,m);v(p);var a=r.resolvePath(p,{},s,{},{});if(!a){throw new Error("The specified mergeWith path does cannot be resolved: '"+m+"'");}var h=S.split("/").slice(1).reduce(function(o,c){if(o.result&&o.obj&&o.obj.hasOwnProperty(c)){o.obj=o.obj[c];}else{o.result=false;}return o;},{obj:a,result:true}).result;if(!h){throw new Error(m+" does not contain "+S+". Please make sure "+m+" points to the root of a URL template.");}return f(a.payload.parameters.mergeWith,s,d,V).concat([m+S]);}return[];}return{buildDefinitionParameterSet:b};},false);