// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/_URLTemplateProcessor/Functions"],function(_){"use strict";function p(D,E){var s=k();var t=s.exec(E);if(t===null){throw new Error("Cannot parse expression: '"+E+"'");}var S=r(E);if(S.indexOf("*")===0){return a(D,S);}var A="^("+_.getPossibleFunctionsRegExpString()+")[^a-z]";var u=new RegExp(A);if(u.exec(S)){return g(D,S);}return d(D,S);}function a(D,P){var s=h(D,P,"|");var w=s.shift();return{type:"pipe",value:[{type:"wildcard",value:w}].concat(s.map(g.bind(null,D)))};}function b(R){var s=R.substr(1);var N;if(s.indexOf(":")>=0){var t=s.split(":");N=t[0];s=t[1];}var u={type:"reference",value:s};if(N){u.namespace=N;}return u;}function c(D,P){var s=P.split("/");var t="relative";if(s[0]===""){t="absolute";s.shift();}if(s[0]==="."){s.shift();}return{type:"path",pathType:t,value:s.map(e.bind(null,D))};}function d(D,L){if(L.charAt(0)==="{"&&L.charAt(L.length-1)==="}"){return d(D,r(L));}if(L.indexOf(".")===0||L.indexOf("/")===0){return c(D,L);}if(L.charAt(0)==="'"&&L.charAt(L.length-1)==="'"){return f(r(L));}if(L.charAt(0)==="&"){return b(L);}return{type:"reference",value:L,namespace:D};}function e(D,P){if(P.charAt(0)==="{"&&P.charAt(P.length-1)==="}"){return d(D,r(P));}return{type:"literal",value:P};}function f(L){return{type:"literal",value:L};}function g(D,F){var t=F.split(/[(\s]/)[0];var R=m(F,t);R=R.replace(/^\s+/,"");var u="";if(R.charAt(0)==="("){var v=R.search(/([)]\s)|([)]$)/);if(v===-1){throw new Error("Cannot find termination of function '"+R+"' in '"+F+"'");}u=R.substr(1,v-1);R=m(R,"("+u+")");R=R.replace(/^\s+/,"");}var w=R;return{type:"function",name:t,args:h(D,u,",").map(function(s){return s.charAt(0)==="{"?r(s):"'"+s+"'";}).map(d.bind(null,D)),params:h(D,w,",").map(d.bind(null,D))};}function h(D,L,s){if(!L){return[];}var S=L.split(s).reduce(function(A,N,I){if(I===0){A.push(N);return A;}var t=A.length-1;var P=A[t];var M=P.length>0&&P.charAt(P.length-1)==="\\";var u="";if(M){u=A.pop();u=u.substr(0,u.length-1)+s;}A.push(u+N);return A;},[]);return S;}function i(D,P){var s=P;var R=null;if(Object.prototype.toString.apply(P)==="[object Object]"){s=P.value;R=P.renameTo;}var I=n(s);if(I){return f(s);}var t="expression";var u=p(D,s);var v={type:t,value:u};if(R){u.renameTo=R;}return v;}function j(s){var E=s.indexOf("{")===0;var t=k();var G=t.exec(s);if(!G){if(E){throw new Error("Expression was expected. But "+s+" does not look like a valid expression");}return null;}return G[1];}function k(){var O="[a-zA-Z0-9]+?:";var v="((&("+O+")?)?[.a-zA-Z0-9_-]+?)";var Q="('(.*?)')";var u="([^' ]*?)";var V="{("+v+")}";var P="("+"[.]?([/]("+v+"|"+V+"))+"+")";var L="("+P+"|"+Q+"|"+v+"|"+V+")";var s="("+L+"(,"+L+")*)";var F="("+u+"|"+V+")";var t="("+F+"(,"+F+")*)";var w="("+"[(]"+t+"[)]"+")?";var A=_.getPossibleFunctionsRegExpString();var x="("+"("+A+")"+"("+w+")"+")";var W="([*]([|]"+x+")*)";var E="^{("+W+"|"+"(("+x+")([ ]("+s+"))?)"+"|"+"("+L+")"+")}$";var y=new RegExp(E);return y;}function l(s){return j(s)!==null;}function r(s){var C=s.split("");C.shift();C.pop();return C.join("");}function m(t,P){if(t.indexOf(P)===0){return t.substr(P.length);}throw new Error("Given string does not start with prefix '"+P+"'");}function n(s){return typeof s==="string"&&!l(s);}function o(P,D){return Object.keys(P).reduce(function(s,N){var v=P[N];s[N]=i(D,v);return s;},{});}function q(P,D){return Object.keys(P).reduce(function(s,N){var v=P[N];s[N]=f(v);return s;},{});}return{parseTemplateParameterSet:o,parseTemplateParameterSetAsLiterals:q,parsePath:c,_isExpression:l,_parseList:h,_parseParameterValue:i};});
