sap.ui.define(["sap/suite/ui/generic/template/lib/testableHelper"],function(t){"use strict";function a(p,P){var r=["Path","CollectionPath","PropertyPath"];for(var i in r){var s=r[i];if(p[s]){if(p[s].String){if(p[s].String.charAt(0)!=="/"){p[s].String=P+"/"+p[s].String;}}else{if(p[s].charAt(0)!=="/"){p[s]=P+"/"+p[s];}}}}for(var b in p){if(p.hasOwnProperty(b)&&typeof p[b]==="object"){a(p[b],P);}}return p;}function g(m,e,p){function f(e,P){if(P.length===0){return e;}var n=P.shift();return f(m.getODataEntityType(m.getODataAssociationEnd(e,n).type),P);}var P=p.split("/");var s=P.pop();var i=P.join("/");var o=m.getODataProperty(f(e,P),s);if(i&&typeof o!=="string"){o=jQuery.extend(true,{},o);o=a(o,i);}return o;}var a=t.testableStatic(a,"modelHelper_addIndirection");return{getODataProperty:g};});
