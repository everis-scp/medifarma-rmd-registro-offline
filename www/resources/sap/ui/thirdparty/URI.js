/*!
 * URI.js - Mutating URLs
 *
 * Version: 1.19.10
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function(r,f){'use strict';if(typeof module==='object'&&module.exports){module.exports=f(require('./punycode'),require('./IPv6'),require('./SecondLevelDomains'));}else if(typeof define==='function'&&define.amd){r.URI=f(r.punycode,r.IPv6,r.SecondLevelDomains,r);define('sap/ui/thirdparty/URI',[],function(){return r.URI;});}else{r.URI=f(r.punycode,r.IPv6,r.SecondLevelDomains,r);}}(this,function(a,I,S,r){'use strict';var _=r&&r.URI;function U(c,d){var e=arguments.length>=1;var i=arguments.length>=2;if(!(this instanceof U)){if(e){if(i){return new U(c,d);}return new U(c);}return new U();}if(c===undefined){if(e){throw new TypeError('undefined is not a valid argument for URI');}if(typeof location!=='undefined'){c=location.href+'';}else{c='';}}if(c===null){if(e){throw new TypeError('null is not a valid argument for URI');}}this.href(c);if(d!==undefined){return this.absoluteTo(d);}return this;}function b(v){return/^[0-9]+$/.test(v);}U.version='1.19.10';var p=U.prototype;var h=Object.prototype.hasOwnProperty;function f(s){return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g,'\\$1');}function g(v){if(v===undefined){return'Undefined';}return String(Object.prototype.toString.call(v)).slice(8,-1);}function j(c){return g(c)==='Array';}function k(d,v){var l={};var i,c;if(g(v)==='RegExp'){l=null;}else if(j(v)){for(i=0,c=v.length;i<c;i++){l[v[i]]=true;}}else{l[v]=true;}for(i=0,c=d.length;i<c;i++){var e=l&&l[d[i]]!==undefined||!l&&v.test(d[i]);if(e){d.splice(i,1);c--;i--;}}return d;}function m(l,v){var i,c;if(j(v)){for(i=0,c=v.length;i<c;i++){if(!m(l,v[i])){return false;}}return true;}var d=g(v);for(i=0,c=l.length;i<c;i++){if(d==='RegExp'){if(typeof l[i]==='string'&&l[i].match(v)){return true;}}else if(l[i]===v){return true;}}return false;}function n(c,t){if(!j(c)||!j(t)){return false;}if(c.length!==t.length){return false;}c.sort();t.sort();for(var i=0,l=c.length;i<l;i++){if(c[i]!==t[i]){return false;}}return true;}function o(t){var c=/^\/+|\/+$/g;return t.replace(c,'');}U._parts=function(){return{protocol:null,username:null,password:null,hostname:null,urn:null,port:null,path:null,query:null,fragment:null,preventInvalidHostname:U.preventInvalidHostname,duplicateQueryParameters:U.duplicateQueryParameters,escapeQuerySpace:U.escapeQuerySpace};};U.preventInvalidHostname=false;U.duplicateQueryParameters=false;U.escapeQuerySpace=true;U.protocol_expression=/^[a-z][a-z0-9.+-]*$/i;U.idn_expression=/[^a-z0-9\._-]/i;U.punycode_expression=/(xn--)/i;U.ip4_expression=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;U.ip6_expression=/^\s*((([0-9A-Fa-f]{1,4}:){7}([0-9A-Fa-f]{1,4}|:))|(([0-9A-Fa-f]{1,4}:){6}(:[0-9A-Fa-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){5}(((:[0-9A-Fa-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9A-Fa-f]{1,4}:){4}(((:[0-9A-Fa-f]{1,4}){1,3})|((:[0-9A-Fa-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){3}(((:[0-9A-Fa-f]{1,4}){1,4})|((:[0-9A-Fa-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){2}(((:[0-9A-Fa-f]{1,4}){1,5})|((:[0-9A-Fa-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9A-Fa-f]{1,4}:){1}(((:[0-9A-Fa-f]{1,4}){1,6})|((:[0-9A-Fa-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9A-Fa-f]{1,4}){1,7})|((:[0-9A-Fa-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))(%.+)?\s*$/;U.find_uri_expression=/\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;U.findUri={start:/\b(?:([a-z][a-z0-9.+-]*:\/\/)|www\.)/gi,end:/[\s\r\n]|$/,trim:/[`!()\[\]{};:'".,<>?«»“”„‘’]+$/,parens:/(\([^\)]*\)|\[[^\]]*\]|\{[^}]*\}|<[^>]*>)/g,};U.leading_whitespace_expression=/^[\x00-\x20\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+/;U.defaultPorts={http:'80',https:'443',ftp:'21',gopher:'70',ws:'80',wss:'443'};U.hostProtocols=['http','https'];U.invalid_hostname_characters=/[^a-zA-Z0-9\.\-:_]/;U.domAttributes={'a':'href','blockquote':'cite','link':'href','base':'href','script':'src','form':'action','img':'src','area':'href','iframe':'src','embed':'src','source':'src','track':'src','input':'src','audio':'src','video':'src'};U.getDomAttribute=function(c){if(!c||!c.nodeName){return undefined;}var d=c.nodeName.toLowerCase();if(d==='input'&&c.type!=='image'){return undefined;}return U.domAttributes[d];};function u(v){return escape(v);}function w(s){return encodeURIComponent(s).replace(/[!'()*]/g,u).replace(/\*/g,'%2A');}U.encode=w;U.decode=decodeURIComponent;U.iso8859=function(){U.encode=escape;U.decode=unescape;};U.unicode=function(){U.encode=w;U.decode=decodeURIComponent;};U.characters={pathname:{encode:{expression:/%(24|26|2B|2C|3B|3D|3A|40)/ig,map:{'%24':'$','%26':'&','%2B':'+','%2C':',','%3B':';','%3D':'=','%3A':':','%40':'@'}},decode:{expression:/[\/\?#]/g,map:{'/':'%2F','?':'%3F','#':'%23'}}},reserved:{encode:{expression:/%(21|23|24|26|27|28|29|2A|2B|2C|2F|3A|3B|3D|3F|40|5B|5D)/ig,map:{'%3A':':','%2F':'/','%3F':'?','%23':'#','%5B':'[','%5D':']','%40':'@','%21':'!','%24':'$','%26':'&','%27':'\'','%28':'(','%29':')','%2A':'*','%2B':'+','%2C':',','%3B':';','%3D':'='}}},urnpath:{encode:{expression:/%(21|24|27|28|29|2A|2B|2C|3B|3D|40)/ig,map:{'%21':'!','%24':'$','%27':'\'','%28':'(','%29':')','%2A':'*','%2B':'+','%2C':',','%3B':';','%3D':'=','%40':'@'}},decode:{expression:/[\/\?#:]/g,map:{'/':'%2F','?':'%3F','#':'%23',':':'%3A'}}}};U.encodeQuery=function(s,e){var c=U.encode(s+'');if(e===undefined){e=U.escapeQuerySpace;}return e?c.replace(/%20/g,'+'):c;};U.decodeQuery=function(s,c){s+='';if(c===undefined){c=U.escapeQuerySpace;}try{return U.decode(c?s.replace(/\+/g,'%20'):s);}catch(e){return s;}};var y={'encode':'encode','decode':'decode'};var z;var A=function(d,z){return function(s){try{return U[z](s+'').replace(U.characters[d][z].expression,function(c){return U.characters[d][z].map[c];});}catch(e){return s;}};};for(z in y){U[z+'PathSegment']=A('pathname',y[z]);U[z+'UrnPathSegment']=A('urnpath',y[z]);}var B=function(c,d,e){return function(s){var l;if(!e){l=U[d];}else{l=function(s){return U[d](U[e](s));};}var t=(s+'').split(c);for(var i=0,v=t.length;i<v;i++){t[i]=l(t[i]);}return t.join(c);};};U.decodePath=B('/','decodePathSegment');U.decodeUrnPath=B(':','decodeUrnPathSegment');U.recodePath=B('/','encodePathSegment','decode');U.recodeUrnPath=B(':','encodeUrnPathSegment','decode');U.encodeReserved=A('reserved','encode');U.parse=function(s,c){var d;if(!c){c={preventInvalidHostname:U.preventInvalidHostname};}s=s.replace(U.leading_whitespace_expression,'');d=s.indexOf('#');if(d>-1){c.fragment=s.substring(d+1)||null;s=s.substring(0,d);}d=s.indexOf('?');if(d>-1){c.query=s.substring(d+1)||null;s=s.substring(0,d);}s=s.replace(/^(https?|ftp|wss?)?:+[/\\]*/i,'$1://');if(s.substring(0,2)==='//'){c.protocol=null;s=s.substring(2);s=U.parseAuthority(s,c);}else{d=s.indexOf(':');if(d>-1){c.protocol=s.substring(0,d)||null;if(c.protocol&&!c.protocol.match(U.protocol_expression)){c.protocol=undefined;}else if(s.substring(d+1,d+3).replace(/\\/g,'/')==='//'){s=s.substring(d+3);s=U.parseAuthority(s,c);}else{s=s.substring(d+1);c.urn=true;}}}c.path=s;return c;};U.parseHost=function(s,c){if(!s){s='';}s=s.replace(/\\/g,'/');var d=s.indexOf('/');var e;var t;if(d===-1){d=s.length;}if(s.charAt(0)==='['){e=s.indexOf(']');c.hostname=s.substring(1,e)||null;c.port=s.substring(e+2,d)||null;if(c.port==='/'){c.port=null;}}else{var i=s.indexOf(':');var l=s.indexOf('/');var v=s.indexOf(':',i+1);if(v!==-1&&(l===-1||v<l)){c.hostname=s.substring(0,d)||null;c.port=null;}else{t=s.substring(0,d).split(':');c.hostname=t[0]||null;c.port=t[1]||null;}}if(c.hostname&&s.substring(d).charAt(0)!=='/'){d++;s='/'+s;}if(c.preventInvalidHostname){U.ensureValidHostname(c.hostname,c.protocol);}if(c.port){U.ensureValidPort(c.port);}return s.substring(d)||'/';};U.parseAuthority=function(s,c){s=U.parseUserinfo(s,c);return U.parseHost(s,c);};U.parseUserinfo=function(s,c){var d=s;var e=s.indexOf('\\');if(e!==-1){s=s.replace(/\\/g,'/')}var i=s.indexOf('/');var l=s.lastIndexOf('@',i>-1?i:s.length-1);var t;if(l>-1&&(i===-1||l<i)){t=s.substring(0,l).split(':');c.username=t[0]?U.decode(t[0]):null;t.shift();c.password=t[0]?U.decode(t.join(':')):null;s=d.substring(l+1);}else{c.username=null;c.password=null;}return s;};U.parseQuery=function(s,e){if(!s){return{};}s=s.replace(/&+/g,'&').replace(/^\?*&*|&+$/g,'');if(!s){return{};}var c={};var d=s.split('&');var l=d.length;var v,t,x;for(var i=0;i<l;i++){v=d[i].split('=');t=U.decodeQuery(v.shift(),e);x=v.length?U.decodeQuery(v.join('='),e):null;if(t==='__proto__'){continue;}else if(h.call(c,t)){if(typeof c[t]==='string'||c[t]===null){c[t]=[c[t]];}c[t].push(x);}else{c[t]=x;}}return c;};U.build=function(c){var t='';var d=false;if(c.protocol){t+=c.protocol+':';}if(!c.urn&&(t||c.hostname)){t+='//';d=true}t+=(U.buildAuthority(c)||'');if(typeof c.path==='string'){if(c.path.charAt(0)!=='/'&&d){t+='/';}t+=c.path;}if(typeof c.query==='string'&&c.query){t+='?'+c.query;}if(typeof c.fragment==='string'&&c.fragment){t+='#'+c.fragment;}return t;};U.buildHost=function(c){var t='';if(!c.hostname){return'';}else if(U.ip6_expression.test(c.hostname)){t+='['+c.hostname+']';}else{t+=c.hostname;}if(c.port){t+=':'+c.port;}return t;};U.buildAuthority=function(c){return U.buildUserinfo(c)+U.buildHost(c);};U.buildUserinfo=function(c){var t='';if(c.username){t+=U.encode(c.username);}if(c.password){t+=':'+U.encode(c.password);}if(t){t+='@';}return t;};U.buildQuery=function(d,c,e){var t='';var l,s,i,v;for(s in d){if(s==='__proto__'){continue;}else if(h.call(d,s)){if(j(d[s])){l={};for(i=0,v=d[s].length;i<v;i++){if(d[s][i]!==undefined&&l[d[s][i]+'']===undefined){t+='&'+U.buildQueryParameter(s,d[s][i],e);if(c!==true){l[d[s][i]+'']=true;}}}}else if(d[s]!==undefined){t+='&'+U.buildQueryParameter(s,d[s],e);}}}return t.substring(1);};U.buildQueryParameter=function(c,v,e){return U.encodeQuery(c,e)+(v!==null?'='+U.encodeQuery(v,e):'');};U.addQuery=function(d,c,v){if(typeof c==='object'){for(var e in c){if(h.call(c,e)){U.addQuery(d,e,c[e]);}}}else if(typeof c==='string'){if(d[c]===undefined){d[c]=v;return;}else if(typeof d[c]==='string'){d[c]=[d[c]];}if(!j(v)){v=[v];}d[c]=(d[c]||[]).concat(v);}else{throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');}};U.setQuery=function(d,c,v){if(typeof c==='object'){for(var e in c){if(h.call(c,e)){U.setQuery(d,e,c[e]);}}}else if(typeof c==='string'){d[c]=v===undefined?null:v;}else{throw new TypeError('URI.setQuery() accepts an object, string as the name parameter');}};U.removeQuery=function(d,c,v){var i,l,e;if(j(c)){for(i=0,l=c.length;i<l;i++){d[c[i]]=undefined;}}else if(g(c)==='RegExp'){for(e in d){if(c.test(e)){d[e]=undefined;}}}else if(typeof c==='object'){for(e in c){if(h.call(c,e)){U.removeQuery(d,e,c[e]);}}}else if(typeof c==='string'){if(v!==undefined){if(g(v)==='RegExp'){if(!j(d[c])&&v.test(d[c])){d[c]=undefined;}else{d[c]=k(d[c],v);}}else if(d[c]===String(v)&&(!j(v)||v.length===1)){d[c]=undefined;}else if(j(d[c])){d[c]=k(d[c],v);}}else{d[c]=undefined;}}else{throw new TypeError('URI.removeQuery() accepts an object, string, RegExp as the first parameter');}};U.hasQuery=function(d,c,v,e){switch(g(c)){case'String':break;case'RegExp':for(var i in d){if(h.call(d,i)){if(c.test(i)&&(v===undefined||U.hasQuery(d,i,v))){return true;}}}return false;case'Object':for(var l in c){if(h.call(c,l)){if(!U.hasQuery(d,l,c[l])){return false;}}}return true;default:throw new TypeError('URI.hasQuery() accepts a string, regular expression or object as the name parameter');}switch(g(v)){case'Undefined':return c in d;case'Boolean':var s=Boolean(j(d[c])?d[c].length:d[c]);return v===s;case'Function':return!!v(d[c],c,d);case'Array':if(!j(d[c])){return false;}var t=e?m:n;return t(d[c],v);case'RegExp':if(!j(d[c])){return Boolean(d[c]&&d[c].match(v));}if(!e){return false;}return m(d[c],v);case'Number':v=String(v);case'String':if(!j(d[c])){return d[c]===v;}if(!e){return false;}return m(d[c],v);default:throw new TypeError('URI.hasQuery() accepts undefined, boolean, string, number, RegExp, Function as the value parameter');}};U.joinPaths=function(){var c=[];var d=[];var e=0;for(var i=0;i<arguments.length;i++){var l=new U(arguments[i]);c.push(l);var t=l.segment();for(var s=0;s<t.length;s++){if(typeof t[s]==='string'){d.push(t[s]);}if(t[s]){e++;}}}if(!d.length||!e){return new U('');}var v=new U('').segment(d);if(c[0].path()===''||c[0].path().slice(0,1)==='/'){v.path('/'+v.path());}return v.normalize();};U.commonPath=function(c,t){var l=Math.min(c.length,t.length);var d;for(d=0;d<l;d++){if(c.charAt(d)!==t.charAt(d)){d--;break;}}if(d<1){return c.charAt(0)===t.charAt(0)&&c.charAt(0)==='/'?'/':'';}if(c.charAt(d)!=='/'||t.charAt(d)!=='/'){d=c.substring(0,d).lastIndexOf('/');}return c.substring(0,d+1);};U.withinString=function(s,c,d){d||(d={});var e=d.start||U.findUri.start;var i=d.end||U.findUri.end;var l=d.trim||U.findUri.trim;var t=d.parens||U.findUri.parens;var v=/[a-z0-9-]=["']?$/i;e.lastIndex=0;while(true){var x=e.exec(s);if(!x){break;}var H=x.index;if(d.ignoreHtml){var J=s.slice(Math.max(H-3,0),H);if(J&&v.test(J)){continue;}}var K=H+s.slice(H).search(i);var L=s.slice(H,K);var M=-1;while(true){var N=t.exec(L);if(!N){break;}var O=N.index+N[0].length;M=Math.max(M,O);}if(M>-1){L=L.slice(0,M)+L.slice(M).replace(l,'');}else{L=L.replace(l,'');}if(L.length<=x[0].length){continue;}if(d.ignore&&d.ignore.test(L)){continue;}K=H+L.length;var P=c(L,H,K,s);if(P===undefined){e.lastIndex=K;continue;}P=String(P);s=s.slice(0,H)+P+s.slice(K);e.lastIndex=H+P.length;}e.lastIndex=0;return s;};U.ensureValidHostname=function(v,c){var d=!!v;var e=!!c;var i=false;if(e){i=m(U.hostProtocols,c);}if(i&&!d){throw new TypeError('Hostname cannot be empty, if protocol is '+c);}else if(v&&v.match(U.invalid_hostname_characters)){if(!a){throw new TypeError('Hostname "'+v+'" contains characters other than [A-Z0-9.-:_] and Punycode.js is not available');}if(a.toASCII(v).match(U.invalid_hostname_characters)){throw new TypeError('Hostname "'+v+'" contains characters other than [A-Z0-9.-:_]');}}};U.ensureValidPort=function(v){if(!v){return;}var c=Number(v);if(b(c)&&(c>0)&&(c<65536)){return;}throw new TypeError('Port "'+v+'" is not a valid port');};U.noConflict=function(c){if(c){var d={URI:this.noConflict()};if(r.URITemplate&&typeof r.URITemplate.noConflict==='function'){d.URITemplate=r.URITemplate.noConflict();}if(r.IPv6&&typeof r.IPv6.noConflict==='function'){d.IPv6=r.IPv6.noConflict();}if(r.SecondLevelDomains&&typeof r.SecondLevelDomains.noConflict==='function'){d.SecondLevelDomains=r.SecondLevelDomains.noConflict();}return d;}else if(r.URI===this){r.URI=_;}return this;};p.build=function(d){if(d===true){this._deferred_build=true;}else if(d===undefined||this._deferred_build){this._string=U.build(this._parts);this._deferred_build=false;}return this;};p.clone=function(){return new U(this);};p.valueOf=p.toString=function(){return this.build(false)._string;};function C(z){return function(v,c){if(v===undefined){return this._parts[z]||'';}else{this._parts[z]=v||null;this.build(!c);return this;}};}function D(z,c){return function(v,d){if(v===undefined){return this._parts[z]||'';}else{if(v!==null){v=v+'';if(v.charAt(0)===c){v=v.substring(1);}}this._parts[z]=v;this.build(!d);return this;}};}p.protocol=C('protocol');p.username=C('username');p.password=C('password');p.hostname=C('hostname');p.port=C('port');p.query=D('query','?');p.fragment=D('fragment','#');p.search=function(v,c){var t=this.query(v,c);return typeof t==='string'&&t.length?('?'+t):t;};p.hash=function(v,c){var t=this.fragment(v,c);return typeof t==='string'&&t.length?('#'+t):t;};p.pathname=function(v,c){if(v===undefined||v===true){var d=this._parts.path||(this._parts.hostname?'/':'');return v?(this._parts.urn?U.decodeUrnPath:U.decodePath)(d):d;}else{if(this._parts.urn){this._parts.path=v?U.recodeUrnPath(v):'';}else{this._parts.path=v?U.recodePath(v):'/';}this.build(!c);return this;}};p.path=p.pathname;p.href=function(c,d){var e;if(c===undefined){return this.toString();}this._string='';this._parts=U._parts();var _=c instanceof U;var i=typeof c==='object'&&(c.hostname||c.path||c.pathname);if(c.nodeName){var l=U.getDomAttribute(c);c=c[l]||'';i=false;}if(!_&&i&&c.pathname!==undefined){c=c.toString();}if(typeof c==='string'||c instanceof String){this._parts=U.parse(String(c),this._parts);}else if(_||i){var s=_?c._parts:c;for(e in s){if(e==='query'){continue;}if(h.call(this._parts,e)){this._parts[e]=s[e];}}if(s.query){this.query(s.query,false);}}else{throw new TypeError('invalid input');}this.build(!d);return this;};p.is=function(c){var i=false;var d=false;var e=false;var l=false;var s=false;var t=false;var a=false;var v=!this._parts.urn;if(this._parts.hostname){v=false;d=U.ip4_expression.test(this._parts.hostname);e=U.ip6_expression.test(this._parts.hostname);i=d||e;l=!i;s=l&&S&&S.has(this._parts.hostname);t=l&&U.idn_expression.test(this._parts.hostname);a=l&&U.punycode_expression.test(this._parts.hostname);}switch(c.toLowerCase()){case'relative':return v;case'absolute':return!v;case'domain':case'name':return l;case'sld':return s;case'ip':return i;case'ip4':case'ipv4':case'inet4':return d;case'ip6':case'ipv6':case'inet6':return e;case'idn':return t;case'url':return!this._parts.urn;case'urn':return!!this._parts.urn;case'punycode':return a;}return null;};var E=p.protocol;var F=p.port;var G=p.hostname;p.protocol=function(v,c){if(v){v=v.replace(/:(\/\/)?$/,'');if(!v.match(U.protocol_expression)){throw new TypeError('Protocol "'+v+'" contains characters other than [A-Z0-9.+-] or doesn\'t start with [A-Z]');}}return E.call(this,v,c);};p.scheme=p.protocol;p.port=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v!==undefined){if(v===0){v=null;}if(v){v+='';if(v.charAt(0)===':'){v=v.substring(1);}U.ensureValidPort(v);}}return F.call(this,v,c);};p.hostname=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v!==undefined){var x={preventInvalidHostname:this._parts.preventInvalidHostname};var d=U.parseHost(v,x);if(d!=='/'){throw new TypeError('Hostname "'+v+'" contains characters other than [A-Z0-9.-]');}v=x.hostname;if(this._parts.preventInvalidHostname){U.ensureValidHostname(v,this._parts.protocol);}}return G.call(this,v,c);};p.origin=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v===undefined){var d=this.protocol();var e=this.authority();if(!e){return'';}return(d?d+'://':'')+this.authority();}else{var i=U(v);this.protocol(i.protocol()).authority(i.authority()).build(!c);return this;}};p.host=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v===undefined){return this._parts.hostname?U.buildHost(this._parts):'';}else{var d=U.parseHost(v,this._parts);if(d!=='/'){throw new TypeError('Hostname "'+v+'" contains characters other than [A-Z0-9.-]');}this.build(!c);return this;}};p.authority=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v===undefined){return this._parts.hostname?U.buildAuthority(this._parts):'';}else{var d=U.parseAuthority(v,this._parts);if(d!=='/'){throw new TypeError('Hostname "'+v+'" contains characters other than [A-Z0-9.-]');}this.build(!c);return this;}};p.userinfo=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v===undefined){var t=U.buildUserinfo(this._parts);return t?t.substring(0,t.length-1):t;}else{if(v[v.length-1]!=='@'){v+='@';}U.parseUserinfo(v,this._parts);this.build(!c);return this;}};p.resource=function(v,c){var d;if(v===undefined){return this.path()+this.search()+this.hash();}d=U.parse(v);this._parts.path=d.path;this._parts.query=d.query;this._parts.fragment=d.fragment;this.build(!c);return this;};p.subdomain=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v===undefined){if(!this._parts.hostname||this.is('IP')){return'';}var d=this._parts.hostname.length-this.domain().length-1;return this._parts.hostname.substring(0,d)||'';}else{var e=this._parts.hostname.length-this.domain().length;var s=this._parts.hostname.substring(0,e);var i=new RegExp('^'+f(s));if(v&&v.charAt(v.length-1)!=='.'){v+='.';}if(v.indexOf(':')!==-1){throw new TypeError('Domains cannot contain colons');}if(v){U.ensureValidHostname(v,this._parts.protocol);}this._parts.hostname=this._parts.hostname.replace(i,v);this.build(!c);return this;}};p.domain=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(typeof v==='boolean'){c=v;v=undefined;}if(v===undefined){if(!this._parts.hostname||this.is('IP')){return'';}var t=this._parts.hostname.match(/\./g);if(t&&t.length<2){return this._parts.hostname;}var e=this._parts.hostname.length-this.tld(c).length-1;e=this._parts.hostname.lastIndexOf('.',e-1)+1;return this._parts.hostname.substring(e)||'';}else{if(!v){throw new TypeError('cannot set domain empty');}if(v.indexOf(':')!==-1){throw new TypeError('Domains cannot contain colons');}U.ensureValidHostname(v,this._parts.protocol);if(!this._parts.hostname||this.is('IP')){this._parts.hostname=v;}else{var d=new RegExp(f(this.domain())+'$');this._parts.hostname=this._parts.hostname.replace(d,v);}this.build(!c);return this;}};p.tld=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(typeof v==='boolean'){c=v;v=undefined;}if(v===undefined){if(!this._parts.hostname||this.is('IP')){return'';}var d=this._parts.hostname.lastIndexOf('.');var t=this._parts.hostname.substring(d+1);if(c!==true&&S&&S.list[t.toLowerCase()]){return S.get(this._parts.hostname)||t;}return t;}else{var e;if(!v){throw new TypeError('cannot set TLD empty');}else if(v.match(/[^a-zA-Z0-9-]/)){if(S&&S.is(v)){e=new RegExp(f(this.tld())+'$');this._parts.hostname=this._parts.hostname.replace(e,v);}else{throw new TypeError('TLD "'+v+'" contains characters other than [A-Z0-9]');}}else if(!this._parts.hostname||this.is('IP')){throw new ReferenceError('cannot set TLD on non-domain host');}else{e=new RegExp(f(this.tld())+'$');this._parts.hostname=this._parts.hostname.replace(e,v);}this.build(!c);return this;}};p.directory=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v===undefined||v===true){if(!this._parts.path&&!this._parts.hostname){return'';}if(this._parts.path==='/'){return'/';}var d=this._parts.path.length-this.filename().length-1;var i=this._parts.path.substring(0,d)||(this._parts.hostname?'/':'');return v?U.decodePath(i):i;}else{var e=this._parts.path.length-this.filename().length;var l=this._parts.path.substring(0,e);var s=new RegExp('^'+f(l));if(!this.is('relative')){if(!v){v='/';}if(v.charAt(0)!=='/'){v='/'+v;}}if(v&&v.charAt(v.length-1)!=='/'){v+='/';}v=U.recodePath(v);this._parts.path=this._parts.path.replace(s,v);this.build(!c);return this;}};p.filename=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(typeof v!=='string'){if(!this._parts.path||this._parts.path==='/'){return'';}var d=this._parts.path.lastIndexOf('/');var e=this._parts.path.substring(d+1);return v?U.decodePathSegment(e):e;}else{var i=false;if(v.charAt(0)==='/'){v=v.substring(1);}if(v.match(/\.?\//)){i=true;}var l=new RegExp(f(this.filename())+'$');v=U.recodePath(v);this._parts.path=this._parts.path.replace(l,v);if(i){this.normalizePath(c);}else{this.build(!c);}return this;}};p.suffix=function(v,c){if(this._parts.urn){return v===undefined?'':this;}if(v===undefined||v===true){if(!this._parts.path||this._parts.path==='/'){return'';}var d=this.filename();var e=d.lastIndexOf('.');var s,i;if(e===-1){return'';}s=d.substring(e+1);i=(/^[a-z0-9%]+$/i).test(s)?s:'';return v?U.decodePathSegment(i):i;}else{if(v.charAt(0)==='.'){v=v.substring(1);}var l=this.suffix();var t;if(!l){if(!v){return this;}this._parts.path+='.'+U.recodePath(v);}else if(!v){t=new RegExp(f('.'+l)+'$');}else{t=new RegExp(f(l)+'$');}if(t){v=U.recodePath(v);this._parts.path=this._parts.path.replace(t,v);}this.build(!c);return this;}};p.segment=function(s,v,c){var d=this._parts.urn?':':'/';var e=this.path();var t=e.substring(0,1)==='/';var x=e.split(d);if(s!==undefined&&typeof s!=='number'){c=v;v=s;s=undefined;}if(s!==undefined&&typeof s!=='number'){throw new Error('Bad segment "'+s+'", must be 0-based integer');}if(t){x.shift();}if(s<0){s=Math.max(x.length+s,0);}if(v===undefined){return s===undefined?x:x[s];}else if(s===null||x[s]===undefined){if(j(v)){x=[];for(var i=0,l=v.length;i<l;i++){if(!v[i].length&&(!x.length||!x[x.length-1].length)){continue;}if(x.length&&!x[x.length-1].length){x.pop();}x.push(o(v[i]));}}else if(v||typeof v==='string'){v=o(v);if(x[x.length-1]===''){x[x.length-1]=v;}else{x.push(v);}}}else{if(v){x[s]=o(v);}else{x.splice(s,1);}}if(t){x.unshift('');}return this.path(x.join(d),c);};p.segmentCoded=function(s,v,c){var d,i,l;if(typeof s!=='number'){c=v;v=s;s=undefined;}if(v===undefined){d=this.segment(s,v,c);if(!j(d)){d=d!==undefined?U.decode(d):undefined;}else{for(i=0,l=d.length;i<l;i++){d[i]=U.decode(d[i]);}}return d;}if(!j(v)){v=(typeof v==='string'||v instanceof String)?U.encode(v):v;}else{for(i=0,l=v.length;i<l;i++){v[i]=U.encode(v[i]);}}return this.segment(s,v,c);};var q=p.query;p.query=function(v,c){if(v===true){return U.parseQuery(this._parts.query,this._parts.escapeQuerySpace);}else if(typeof v==='function'){var d=U.parseQuery(this._parts.query,this._parts.escapeQuerySpace);var e=v.call(this,d);this._parts.query=U.buildQuery(e||d,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);this.build(!c);return this;}else if(v!==undefined&&typeof v!=='string'){this._parts.query=U.buildQuery(v,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);this.build(!c);return this;}else{return q.call(this,v,c);}};p.setQuery=function(c,v,d){var e=U.parseQuery(this._parts.query,this._parts.escapeQuerySpace);if(typeof c==='string'||c instanceof String){e[c]=v!==undefined?v:null;}else if(typeof c==='object'){for(var i in c){if(h.call(c,i)){e[i]=c[i];}}}else{throw new TypeError('URI.addQuery() accepts an object, string as the name parameter');}this._parts.query=U.buildQuery(e,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof c!=='string'){d=v;}this.build(!d);return this;};p.addQuery=function(c,v,d){var e=U.parseQuery(this._parts.query,this._parts.escapeQuerySpace);U.addQuery(e,c,v===undefined?null:v);this._parts.query=U.buildQuery(e,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof c!=='string'){d=v;}this.build(!d);return this;};p.removeQuery=function(c,v,d){var e=U.parseQuery(this._parts.query,this._parts.escapeQuerySpace);U.removeQuery(e,c,v);this._parts.query=U.buildQuery(e,this._parts.duplicateQueryParameters,this._parts.escapeQuerySpace);if(typeof c!=='string'){d=v;}this.build(!d);return this;};p.hasQuery=function(c,v,d){var e=U.parseQuery(this._parts.query,this._parts.escapeQuerySpace);return U.hasQuery(e,c,v,d);};p.setSearch=p.setQuery;p.addSearch=p.addQuery;p.removeSearch=p.removeQuery;p.hasSearch=p.hasQuery;p.normalize=function(){if(this._parts.urn){return this.normalizeProtocol(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();}return this.normalizeProtocol(false).normalizeHostname(false).normalizePort(false).normalizePath(false).normalizeQuery(false).normalizeFragment(false).build();};p.normalizeProtocol=function(c){if(typeof this._parts.protocol==='string'){this._parts.protocol=this._parts.protocol.toLowerCase();this.build(!c);}return this;};p.normalizeHostname=function(c){if(this._parts.hostname){if(this.is('IDN')&&a){this._parts.hostname=a.toASCII(this._parts.hostname);}else if(this.is('IPv6')&&I){this._parts.hostname=I.best(this._parts.hostname);}this._parts.hostname=this._parts.hostname.toLowerCase();this.build(!c);}return this;};p.normalizePort=function(c){if(typeof this._parts.protocol==='string'&&this._parts.port===U.defaultPorts[this._parts.protocol]){this._parts.port=null;this.build(!c);}return this;};p.normalizePath=function(c){var d=this._parts.path;if(!d){return this;}if(this._parts.urn){this._parts.path=U.recodeUrnPath(this._parts.path);this.build(!c);return this;}if(this._parts.path==='/'){return this;}d=U.recodePath(d);var e;var i='';var l,s;if(d.charAt(0)!=='/'){e=true;d='/'+d;}if(d.slice(-3)==='/..'||d.slice(-2)==='/.'){d+='/';}d=d.replace(/(\/(\.\/)+)|(\/\.$)/g,'/').replace(/\/{2,}/g,'/');if(e){i=d.substring(1).match(/^(\.\.\/)+/)||'';if(i){i=i[0];}}while(true){l=d.search(/\/\.\.(\/|$)/);if(l===-1){break;}else if(l===0){d=d.substring(3);continue;}s=d.substring(0,l).lastIndexOf('/');if(s===-1){s=l;}d=d.substring(0,s)+d.substring(l+3);}if(e&&this.is('relative')){d=i+d.substring(1);}this._parts.path=d;this.build(!c);return this;};p.normalizePathname=p.normalizePath;p.normalizeQuery=function(c){if(typeof this._parts.query==='string'){if(!this._parts.query.length){this._parts.query=null;}else{this.query(U.parseQuery(this._parts.query,this._parts.escapeQuerySpace));}this.build(!c);}return this;};p.normalizeFragment=function(c){if(!this._parts.fragment){this._parts.fragment=null;this.build(!c);}return this;};p.normalizeSearch=p.normalizeQuery;p.normalizeHash=p.normalizeFragment;p.iso8859=function(){var e=U.encode;var d=U.decode;U.encode=escape;U.decode=decodeURIComponent;try{this.normalize();}finally{U.encode=e;U.decode=d;}return this;};p.unicode=function(){var e=U.encode;var d=U.decode;U.encode=w;U.decode=unescape;try{this.normalize();}finally{U.encode=e;U.decode=d;}return this;};p.readable=function(){var c=this.clone();c.username('').password('').normalize();var t='';if(c._parts.protocol){t+=c._parts.protocol+'://';}if(c._parts.hostname){if(c.is('punycode')&&a){t+=a.toUnicode(c._parts.hostname);if(c._parts.port){t+=':'+c._parts.port;}}else{t+=c.host();}}if(c._parts.hostname&&c._parts.path&&c._parts.path.charAt(0)!=='/'){t+='/';}t+=c.path(true);if(c._parts.query){var q='';for(var i=0,d=c._parts.query.split('&'),l=d.length;i<l;i++){var e=(d[i]||'').split('=');q+='&'+U.decodeQuery(e[0],this._parts.escapeQuerySpace).replace(/&/g,'%26');if(e[1]!==undefined){q+='='+U.decodeQuery(e[1],this._parts.escapeQuerySpace).replace(/&/g,'%26');}}t+='?'+q.substring(1);}t+=U.decodeQuery(c.hash(),true);return t;};p.absoluteTo=function(c){var d=this.clone();var e=['protocol','username','password','hostname','port'];var l,i,p;if(this._parts.urn){throw new Error('URNs do not have any generally defined hierarchical components');}if(!(c instanceof U)){c=new U(c);}if(d._parts.protocol){return d;}else{d._parts.protocol=c._parts.protocol;}if(this._parts.hostname){return d;}for(i=0;(p=e[i]);i++){d._parts[p]=c._parts[p];}if(!d._parts.path){d._parts.path=c._parts.path;if(!d._parts.query){d._parts.query=c._parts.query;}}else{if(d._parts.path.substring(-2)==='..'){d._parts.path+='/';}if(d.path().charAt(0)!=='/'){l=c.directory();l=l?l:c.path().indexOf('/')===0?'/':'';d._parts.path=(l?(l+'/'):'')+d._parts.path;d.normalizePath();}}d.build();return d;};p.relativeTo=function(c){var d=this.clone().normalize();var e,i,l,s,t;if(d._parts.urn){throw new Error('URNs do not have any generally defined hierarchical components');}c=new U(c).normalize();e=d._parts;i=c._parts;s=d.path();t=c.path();if(s.charAt(0)!=='/'){throw new Error('URI is already relative');}if(t.charAt(0)!=='/'){throw new Error('Cannot calculate a URI relative to another relative URI');}if(e.protocol===i.protocol){e.protocol=null;}if(e.username!==i.username||e.password!==i.password){return d.build();}if(e.protocol!==null||e.username!==null||e.password!==null){return d.build();}if(e.hostname===i.hostname&&e.port===i.port){e.hostname=null;e.port=null;}else{return d.build();}if(s===t){e.path='';return d.build();}l=U.commonPath(s,t);if(!l){return d.build();}var v=i.path.substring(l.length).replace(/[^\/]*$/,'').replace(/.*?\//g,'../');e.path=(v+e.path.substring(l.length))||'./';return d.build();};p.equals=function(c){var d=this.clone();var t=new U(c);var e={};var i={};var l={};var s,v,x;d.normalize();t.normalize();if(d.toString()===t.toString()){return true;}s=d.query();v=t.query();d.query('');t.query('');if(d.toString()!==t.toString()){return false;}if(s.length!==v.length){return false;}e=U.parseQuery(s,this._parts.escapeQuerySpace);i=U.parseQuery(v,this._parts.escapeQuerySpace);for(x in e){if(h.call(e,x)){if(!j(e[x])){if(e[x]!==i[x]){return false;}}else if(!n(e[x],i[x])){return false;}l[x]=true;}}for(x in i){if(h.call(i,x)){if(!l[x]){return false;}}}return true;};p.preventInvalidHostname=function(v){this._parts.preventInvalidHostname=!!v;return this;};p.duplicateQueryParameters=function(v){this._parts.duplicateQueryParameters=!!v;return this;};p.escapeQuerySpace=function(v){this._parts.escapeQuerySpace=!!v;return this;};return U;}));
