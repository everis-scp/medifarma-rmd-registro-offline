/*!
 * jQuery Migrate - v3.3.1 - 2020-06-25T01:07Z
 * Copyright OpenJS Foundation and other contributors
 */
(function(f){"use strict";var b=document.querySelector('SCRIPT[src][id=sap-ui-bootstrap]');var c=window['sap-ui-config']||{};if(/sap-ui-excludeJQueryCompat=(true|x)/.test(location.search)||(b&&b.getAttribute("data-sap-ui-excludejquerycompat")==="true")||c["excludejquerycompat"]===true||c["excludeJQueryCompat"]===true){return;}if(typeof window.sap!=="object"&&typeof window.sap!=="function"){window.sap={};}if(typeof window.sap.ui!=="object"){window.sap.ui={};}sap.ui._jQuery3Compat={_factory:f};if(window.jQuery){f(jQuery,window);}})(function(q,w){"use strict";q.migrateVersion="3.3.1";function c(v,n){var i,F=/^(\d+)\.(\d+)\.(\d+)/,G=F.exec(v)||[],H=F.exec(n)||[];for(i=1;i<=3;i++){if(+G[i]>+H[i]){return 1;}if(+G[i]<+H[i]){return-1;}}return 0;}function Q(v){return c(q.fn.jquery,v)>=0;}if(Q("3.0.0")&&!Q("4.0.0")){if(q.fn.jquery!=="3.6.0"&&console){console.warn("The current jQuery version "+q.fn.jquery+" is different than the version 3.6.0 that is used for testing jquery-compat.js. jquery-compat.js is applied but it may not work properly.");}}else{if(console){console.error("The current jQuery version "+q.fn.jquery+" differs at the major version than the version 3.6.0 that is used for testing jquery-compat.js. jquery-compat.js shouldn't be applied in this case!");}return;}var a={};q.migrateDeduplicateWarnings=false;q.migrateWarnings=[];function m(i){var n;i=i.replace(" and removed","");if(!q.migrateDeduplicateWarnings||!a[i]){n=(sap&&sap.ui&&sap.ui.require)?sap.ui.require("sap/base/Log"):false;a[i]=true;q.migrateWarnings.push(i);if(!q.migrateMute){i="JQMIGRATE: "+i;if(n){if(q.migrateTrace){n.setLevel(5);}n[q.migrateTrace?"trace":"warning"](i,"jQueryThreeDeprecation",null,function(){return{type:"jQueryThreeDeprecation",name:"jquery-compat"};});}else if(console&&console.warn){console.warn(i);if(q.migrateTrace&&console.trace){console.trace();}}}}}sap.ui._jQuery3Compat._migrateWarn=m;function b(i,n,v,F){Object.defineProperty(i,n,{configurable:true,enumerable:true,get:function(){m(F);return v;},set:function(G){m(F);v=G;}});}function d(i,n,v,F){i[n]=function(){m(F);return v.apply(this,arguments);};}var e={},o=q.fn.init,r=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;q.fn.init=function(i){var n=Array.prototype.slice.call(arguments);if(typeof i==="string"&&i==="#"){m("jQuery( '#' ) is not a valid selector");n[0]=[];}var R=o.apply(this,n);if(n[0]){if(n[0].nodeType){R.context=n[0];}else if(typeof n[0]==="string"&&!(n[0][0]==="<"&&n[0][n[0].length-1]===">"&&n[0].length>=3)){R.context=w.document;}}return R;};q.fn.init.prototype=q.fn;d(q.fn,"size",function(){return this.length;},"jQuery.fn.size() is deprecated and removed; use the .length property");d(q,"parseJSON",function(){return JSON.parse.apply(null,arguments);},"jQuery.parseJSON is deprecated; use JSON.parse");d(q,"holdReady",q.holdReady,"jQuery.holdReady is deprecated");d(q,"unique",q.uniqueSort,"jQuery.unique is deprecated; use jQuery.uniqueSort");b(q.expr,"filters",q.expr.pseudos,"jQuery.expr.filters is deprecated; use jQuery.expr.pseudos");b(q.expr,":",q.expr.pseudos,"jQuery.expr[':'] is deprecated; use jQuery.expr.pseudos");if(Q("3.1.1")){d(q,"trim",function(i){return i==null?"":(i+"").replace(r,"");},"jQuery.trim is deprecated; use String.prototype.trim");}if(Q("3.2.0")){d(q,"nodeName",function(i,n){return i.nodeName&&i.nodeName.toLowerCase()===n.toLowerCase();},"jQuery.nodeName is deprecated");}if(Q("3.3.0")){d(q,"isNumeric",function(i){var n=typeof i;return(n==="number"||n==="string")&&!isNaN(i-parseFloat(i));},"jQuery.isNumeric() is deprecated");q.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(_,n){e["[object "+n+"]"]=n.toLowerCase();});d(q,"type",function(i){if(i==null){return i+"";}return typeof i==="object"||typeof i==="function"?e[Object.prototype.toString.call(i)]||"object":typeof i;},"jQuery.type is deprecated");d(q,"isFunction",function(i){return typeof i==="function";},"jQuery.isFunction() is deprecated");d(q,"isWindow",function(i){return i!=null&&i===i.window;},"jQuery.isWindow() is deprecated");d(q,"isArray",Array.isArray,"jQuery.isArray is deprecated; use Array.isArray");}if(q.ajax){var f=q.ajax;q.ajax=function(){var i=f.apply(this,arguments);if(i.promise){d(i,"success",i.done,"jQXHR.success is deprecated and removed");d(i,"error",i.fail,"jQXHR.error is deprecated and removed");d(i,"complete",i.always,"jQXHR.complete is deprecated and removed");}return i;};}var g=q.fn.removeAttr,h=q.fn.toggleClass,j=/\S+/g;q.fn.removeAttr=function(n){var i=this;q.each(n.match(j),function(_,v){if(q.expr.match.bool.test(v)){m("jQuery.fn.removeAttr no longer sets boolean properties: "+v);i.prop(v,false);}});return g.apply(this,arguments);};q.fn.toggleClass=function(i){if(i!==undefined&&typeof i!=="boolean"){return h.apply(this,arguments);}m("jQuery.fn.toggleClass( boolean ) is deprecated");return this.each(function(){var n=this.getAttribute&&this.getAttribute("class")||"";if(n){q.data(this,"__className__",n);}if(this.setAttribute){this.setAttribute("class",n||i===false?"":q.data(this,"__className__")||"");}});};function k(i){return i.replace(/-([a-z])/g,function(_,n){return n.toUpperCase();});}var l,p=/^[a-z]/,s=/^(?:Border(?:Top|Right|Bottom|Left)?(?:Width|)|(?:Margin|Padding)?(?:Top|Right|Bottom|Left)?|(?:Min|Max)?(?:Width|Height))$/;if(typeof Proxy!=="undefined"){q.cssProps=new Proxy(q.cssProps||{},{set:function(){m("jQuery.cssProps is deprecated");return Reflect.set.apply(this,arguments);}});}function t(i){return p.test(i)&&s.test(i[0].toUpperCase()+i.slice(1));}l=q.fn.css;q.fn.css=function(i,F){var G,H=this;if(i&&typeof i==="object"&&!Array.isArray(i)){q.each(i,function(n,v){q.fn.css.call(H,n,v);});}if(typeof F==="number"){G=k(i);if(!t(G)&&!q.cssNumber[G]){m("Number-typed values are deprecated for jQuery.fn.css( \""+i+"\", value )");}}return l.apply(this,arguments);};if(q.fx){var u,x;u=q.fx.interval||13;x="jQuery.fx.interval is deprecated";if(w.requestAnimationFrame){Object.defineProperty(q.fx,"interval",{configurable:true,enumerable:true,get:function(){if(!w.document.hidden){m(x);}return u;},set:function(n){m(x);u=n;}});}}var y=q.fn.load,z=q.event.add,A=q.event.fix;q.event.props=[];q.event.fixHooks={};b(q.event.props,"concat",q.event.props.concat,"jQuery.event.props.concat() is deprecated and removed");q.event.fix=function(i){var n,v=i.type,F=this.fixHooks[v],G=q.event.props;if(G.length){m("jQuery.event.props are deprecated and removed: "+G.join());while(G.length){q.event.addProp(G.pop());}}if(F&&!F._migrated_){F._migrated_=true;m("jQuery.event.fixHooks are deprecated and removed: "+v);if((G=F.props)&&G.length){while(G.length){q.event.addProp(G.pop());}}}n=A.call(this,i);return F&&F.filter?F.filter(n,i):n;};q.event.add=function(i,n){if(i===w&&n==="load"&&w.document.readyState==="complete"){m("jQuery(window).on('load'...) called after load event occurred");}return z.apply(this,arguments);};q.each(["load","unload","error"],function(_,n){q.fn[n]=function(){var i=Array.prototype.slice.call(arguments,0);if(n==="load"&&typeof i[0]==="string"){return y.apply(this,i);}m("jQuery.fn."+n+"() is deprecated");i.splice(0,0,n);if(arguments.length){return this.on.apply(this,i);}this.triggerHandler.apply(this,i);return this;};});q.each(("blur focus focusin focusout resize scroll click dblclick "+"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave "+"change select submit keydown keypress keyup contextmenu").split(" "),function(_,n){q.fn[n]=function(i,v){m("jQuery.fn."+n+"() event shorthand is deprecated");return arguments.length>0?this.on(n,null,i,v):this.trigger(n);};});q(function(){q(w.document).triggerHandler("ready");});q.event.special.ready={setup:function(){if(this===w.document){m("'ready' event is deprecated");}}};q.fn.extend({bind:function(i,n,v){m("jQuery.fn.bind() is deprecated");return this.on(i,null,n,v);},unbind:function(i,n){m("jQuery.fn.unbind() is deprecated");return this.off(i,null,n);},delegate:function(i,n,v,F){m("jQuery.fn.delegate() is deprecated");return this.on(n,i,v,F);},undelegate:function(i,n,v){m("jQuery.fn.undelegate() is deprecated");return arguments.length===1?this.off(i,"**"):this.off(n,i||"**",v);},hover:function(i,n){m("jQuery.fn.hover() is deprecated");return this.on("mouseenter",i).on("mouseleave",n||i);}});var B=q.fn.offset;q.fn.offset=function(){var i=this[0];if(i&&(!i.nodeType||!i.getBoundingClientRect)){m("jQuery.fn.offset() requires a valid DOM element");return arguments.length?this:undefined;}return B.apply(this,arguments);};var C=q.fn.andSelf||q.fn.addBack;q.fn.andSelf=function(){m("jQuery.fn.andSelf() is deprecated and removed, use jQuery.fn.addBack()");return C.apply(this,arguments);};var D=q.Deferred,E=[["resolve","done",q.Callbacks("once memory"),q.Callbacks("once memory"),"resolved"],["reject","fail",q.Callbacks("once memory"),q.Callbacks("once memory"),"rejected"],["notify","progress",q.Callbacks("memory"),q.Callbacks("memory")]];q.Deferred=function(n){var v=D(),F=v.promise();v.pipe=F.pipe=function(){var G=arguments;if(typeof arguments[2]!=="boolean"||!arguments[2]){m("deferred.pipe() is deprecated");}return q.Deferred(function(H){q.each(E,function(i,I){var J=typeof G[i]==="function"&&G[i];v[I[1]](function(){var K=J&&J.apply(this,arguments);if(K&&typeof K.promise==="function"){K.promise().done(H.resolve).fail(H.reject).progress(H.notify);}else{H[I[0]+"With"](this===F?H.promise():this,J?[K]:arguments);}});});G=null;}).promise();};v.then=F.then=function(){return v.pipe(arguments[0],arguments[1],true);};v.notify=function(){v.notifyWith(this===v?F:this,arguments);return this;};v.resolve=function(){v.resolveWith(this===v?F:this,arguments);return this;};v.reject=function(){v.rejectWith(this===v?F:this,arguments);return this;};if(n){n.call(v,v);}return v;};q.Deferred.exceptionHook=D.exceptionHook;var O={},M=["innerHeight","height","outerHeight","innerWidth","width","outerWidth"];M.forEach(function(n){O[n]=q.fn[n];q.fn[n]=function(){var R=O[n].apply(this,arguments);if(R===undefined&&this.length===0){return null;}else{if(typeof R==="number"){R=Math.round(R);}return R;}};});});
