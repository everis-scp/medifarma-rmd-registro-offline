/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([],function(){"use strict";var g;if(Object.prototype.toString.call(typeof process!=="undefined"?process:0)==="[object process]"){g=module.exports;}else if(typeof window!=="undefined"){g=this;}else{g=g||{};}var s=s||g.sap||{};if(!s.firefly){s["firefly"]={};}var U=U||undefined;if(typeof U!=="undefined"){s.firefly["GoogleUrlFetchApp"]=U;}g.sap=s;s.firefly.isNull=function(o){return o===null||o===undefined;};s.firefly.notNull=function(o){return o!==undefined&&o!==null;};s.firefly.noSupport=function(){throw new Error("Unsupported Operation Exception");};s.firefly.XObject=function(){};s.firefly.XObject.prototype={_ff_c:"XObject",m_isReleased:false,setup:function(){this.m_isReleased=false;},releaseObject:function(){this.m_isReleased=true;},destructor:function(){},isReleaseLocked:function(){return false;},isReleased:function(){return this.m_isReleased;},addOwnership:function(){},isEqualTo:function(o){return this===o;},copyFrom:function(o,f){},getObjectId:function(){return null;},getClassName:function(){return this._ff_c;},compareTo:s.firefly.noSupport,cloneExt:function(f){},clone:function(){return this.cloneExt(null);},toString:function(){return"[???]";}};s.firefly.XObject.castFromNative=function(n){return n;};s.firefly.XWeakReference=function(r){this.m_reference=r;this._ff_c="XWeakReference";};s.firefly.XWeakReference.prototype=new s.firefly.XObject();s.firefly.XWeakReference.create=function(r){return new s.firefly.XWeakReference(r);};s.firefly.XWeakReference.prototype.releaseObject=function(){this.m_reference=null;s.firefly.XObject.prototype.releaseObject.call(this);};s.firefly.XWeakReference.prototype.getReference=function(){return this.m_reference;};s.firefly.XWeakReference.prototype.toString=function(){return this.m_reference&&this.m_reference.toString();};s.firefly.XException={createInitializationException:function(){return new Error("Initialization Exception");},createUnsupportedOperationException:s.firefly.noSupport,createRuntimeException:function(m){return new Error("Runtime Exception: "+m);},createIllegalStateException:function(m){return new Error("Illegal State: "+m);},createIllegalArgumentException:function(m){return new Error("Illegal Argument: "+m);},supportsStackTrace:function(){return true;},getStackTrace:function(e){if(e.stack===undefined){return e.message+"\r\n(No call stack available; please search source code for exception message)";}return e.stack;}};s.firefly.XString={isEqual:function(f,a){return f===a;},getCharAt:function(v,i){return v.charCodeAt(i);},replace:function(v,a,r){return v&&v.split(a).join(r);},containsString:function(a,b){if(a===null&&b===null){return true;}if(a===null){return false;}if(b===null){return true;}return a.indexOf(b)!==-1;},startsWith:function(v,a){return v.indexOf(a)===0;},endsWith:function(v,e){var l=v.lastIndexOf(e);if(l===-1){return false;}if(l+e.length===v.length){return true;}return false;},size:function(v){return v.length;},compare:function(v,c){if(v===c){return 0;}if(v===null){return-1;}if(c===null){return 1;}return(v>c)?1:-1;},indexOf:function(t,p){return t.indexOf(p);},indexOfFrom:function(t,p,f){return t.indexOf(p,f);},lastIndexOf:function(t,p){return t.lastIndexOf(p);},lastIndexOfFrom:function(t,p,i){return t.lastIndexOf(p,i);},substring:function(t,b,e){if(e===-1){return t.substring(b);}return t.substring(b,e);},toLowerCase:function(v){return v&&v.toLowerCase();},toUpperCase:function(v){return v&&v.toUpperCase();},trim:function(v){return v&&v.trim();},match:function(v,p){if(v&&p){var r=new RegExp(p);return r.test(v);}return false;},getStringResource:function(){return null;},utf8Encode:function(v){return unescape(encodeURIComponent(v));},utf8Decode:function(v){return decodeURIComponent(escape(v));},asString:function(v){if(v===null||v===undefined){return v;}return v.toString();}};s.firefly.XBoolean={TRUE:"true",FALSE:"false",convertToString:function(v){if(v===true){return this.TRUE;}return this.FALSE;},convertFromString:function(v){if(this.TRUE===v){return true;}if(this.FALSE===v){return false;}throw new Error("Illegal Argument:"+v);},convertFromStringWithDefault:function(v,d){if(this.TRUE===v){return true;}if(this.FALSE===v){return false;}return d;},};s.firefly.XInteger={convertToString:function(v){if(v===null||v===undefined){return null;}return v.toString();},convertFromString:function(v){return s.firefly.XInteger.convertFromStringWithRadix(v,10);},convertFromStringWithRadix:function(a,r,d){if(typeof a==="number"){return parseInt(a,r);}var h=typeof d!=="undefined";var v=s.firefly.isNull(a)?"":a.trim();if(""===v||!/(^[\-+]?\d*\.?\d*$)|(^[0-9a-fA-F]*$)/.test(v)){if(h){return d;}throw new Error("Value is not a number");}var i=parseInt(v,r);if(isNaN(i)){if(h){return d;}throw new Error("Value is not a number: "+a);}return i;},convertFromStringWithDefault:function(v,d){return s.firefly.XInteger.convertFromStringWithRadix(v,10,d);},convertToDouble:function(v){return v;},convertToInt:function(v){return v;},convertToHexString:function(v){var h=Number(v).toString(16).toUpperCase();return h.length===1?"0"+h:h;},getNthLeastSignificantByte:function(i,b){return(i>>(b*8))&0x000000FF;}};s.firefly.XLong=s.firefly.XInteger;s.firefly.XDouble={convertToString:function(v){if(v===null||v===undefined){return null;}return v.toString();},convertFromString:function(v){if(v===null||v.length===0||isNaN(v)){throw new Error("Illegal Argument: Value is not a number: "+v);}var n=parseFloat(v);if(isNaN(n)){throw new Error("Illegal Argument: Value is not a number: "+v);}return n;},convertFromStringWithDefault:function(v,d){if(v===null||v.length===0||isNaN(v)){return d;}var n=parseFloat(v);if(isNaN(n)){return d;}return n;},convertToLong:function(v){return v>0?Math.floor(v):Math.ceil(v);},convertToInt:function(v){return parseInt(v,10);}};s.firefly.XStringBuffer=function(){this._ff_c="XStringBuffer";this.m_stringBuffer=[];};s.firefly.XStringBuffer.prototype=new s.firefly.XObject();s.firefly.XStringBuffer.create=function(){return new s.firefly.XStringBuffer();};s.firefly.XStringBuffer.prototype.releaseObject=function(){this.m_stringBuffer=null;s.firefly.XObject.prototype.releaseObject.call(this);};s.firefly.XStringBuffer.prototype.appendLine=function(v){if(v!==null){this.m_stringBuffer.push(v);}this.m_stringBuffer.push("\n");return this;};s.firefly.XStringBuffer.prototype.append=function(v){if(v!==null){this.m_stringBuffer.push(v);}return this;};s.firefly.XStringBuffer.prototype.appendChar=function(v){return this.append(String.fromCharCode(v));};s.firefly.XStringBuffer.prototype.appendInt=s.firefly.XStringBuffer.prototype.append;s.firefly.XStringBuffer.prototype.appendDouble=s.firefly.XStringBuffer.prototype.append;s.firefly.XStringBuffer.prototype.appendLong=s.firefly.XStringBuffer.prototype.append;s.firefly.XStringBuffer.prototype.appendBoolean=function(v){return this.append(s.firefly.XBoolean.convertToString(v));};s.firefly.XStringBuffer.prototype.appendObject=function(v){if(v!==null){this.append(v.toString());}else{this.append("null");}};s.firefly.XStringBuffer.prototype.appendNewLine=function(){this.m_stringBuffer.push("\n");return this;};s.firefly.XStringBuffer.prototype.toString=function(){return this.m_stringBuffer.join("");};s.firefly.XStringBuffer.prototype.length=function(){return this.toString().length;};s.firefly.XStringBuffer.prototype.clear=function(){this.m_stringBuffer.length=0;};s.firefly.XStringBuffer.prototype.flush=function(){};s.firefly.XClass=function(c){this.m_clazzDefinition=c;this._ff_c="XClass";};s.firefly.XClass.prototype=new s.firefly.XObject();s.firefly.XClass.create=function(c){return new s.firefly.XClass(c);};s.firefly.XClass.createByName=function(c){var t=null;if(c!==null&&c!==undefined){var m=s.firefly[c];if(m!==null&&m!==undefined){t=this.create(m);}}return t;};s.firefly.XClass.getCanonicalClassName=function(o){if(o===undefined||o._ff_c===undefined){return"[unknown class]";}return o._ff_c;};s.firefly.XClass.isXObjectReleased=function(t){if(t===null){return true;}return t.isReleased?t.isReleased():false;};s.firefly.XClass.callFunction=function(f,p,a,b){var c={};var i=f&&c.toString.call(f)==="[object Function]";if(i){if(p===null&&a===null&&b===null){f();}else{f(p,a,b);}return true;}return false;};s.firefly.XClass.initializeClass=function(){};s.firefly.XClass.prototype.releaseObject=function(){this.m_clazzDefinition=null;s.firefly.XObject.prototype.releaseObject.call(this);};s.firefly.XClass.prototype.getNativeName=function(){return"Prototype";};s.firefly.XClass.prototype.getNativeElement=function(){return this.m_clazzDefinition;};s.firefly.XClass.prototype.newInstance=function(){var F=function(){};F.prototype=this.m_clazzDefinition.prototype;return new F();};s.firefly.XClass.prototype.toString=function(){return"Prototype";};s.firefly.XCharset={USASCII:0,_USASCII:"US-ASCII",UTF8:1,_UTF8:"UTF-8",lookupCharsetName:function(t){if(t===this.UTF8){return this._UTF8;}return this._USASCII;}};s.firefly.XByteArray=function(n){this.m_nativeByteArray=n;this._ff_c="XByteArray";};s.firefly.XByteArray.prototype=new s.firefly.XObject();s.firefly.XByteArray.create=function(n,a){if(n===null){var b=new Array(a);for(var i=0;i<a;i++){b[i]=0;}return new s.firefly.XByteArray(b);}return new s.firefly.XByteArray(n);};s.firefly.XByteArray.copy=function(a,b,d,c,l){var e=a.getNative();var f=d.getNative();var h=b;var i=c;var j=0;while(j++<l){f[i++]=e[h++];}};s.firefly.XByteArray.convertFromString=function(v){return s.firefly.XByteArray.convertFromStringWithCharset(v,s.firefly.XCharset.UTF8);};s.firefly.XByteArray.convertFromStringWithCharset=function(v,a){var b=[];if(a===s.firefly.XCharset.UTF8){if(typeof Buffer!=="undefined"&&typeof module!=="undefined"&&this.module!==module&&module.exports){b=new Buffer(v,"utf8");}else{var c;for(var n=0;n<v.length;n++){c=v.charCodeAt(n);if(c<128){b.push(c);}else if(c>127&&c<2048){b.push((c>>6)|192);b.push((c&63)|128);}else{b.push((c>>12)|224);b.push(((c>>6)&63)|128);b.push((c&63)|128);}}}}return new s.firefly.XByteArray(b);};s.firefly.XByteArray.convertToString=function(b){return s.firefly.XByteArray.convertToStringWithCharset(b,s.firefly.XCharset.UTF8);};s.firefly.XByteArray.convertToStringWithCharset=function(b,c){if(s.firefly.XCharset.UTF8!==c){throw new Error("Runtime Exception: Unsupported charset");}var a=b.getNative();if(typeof Buffer!=="undefined"&&typeof module!=="undefined"&&this.module!==module&&module.exports){return new Buffer(a,"binary").toString("utf8");}var d=new s.firefly.XStringBuffer();var i=0;var e=0;var f=0;var h=0;while(i<a.length){e=a[i];if(e<128){d.append(String.fromCharCode(e));++i;}else if(e>191&&e<224){f=a[i+1];d.append(String.fromCharCode(((e&31)<<6)|(f&63)));i+=2;}else{f=a[i+1];h=a[i+2];d.append(String.fromCharCode(((e&15)<<12)|((f&63)<<6)|(h&63)));i+=3;}}return d.toString();};s.firefly.XByteArray.isEqual=function(f,a){return f===a;};s.firefly.XByteArray.prototype.releaseObject=function(){this.m_nativeByteArray=null;s.firefly.XObject.prototype.releaseObject.call(this);};s.firefly.XByteArray.prototype.size=function(){if(this.m_nativeByteArray===null){return 0;}return this.m_nativeByteArray.length;};s.firefly.XByteArray.prototype.getByteAt=function(i){return this.m_nativeByteArray[i];};s.firefly.XByteArray.prototype.setByteAt=function(i,v){this.m_nativeByteArray[i]=v;};s.firefly.XByteArray.prototype.getNative=function(){return this.m_nativeByteArray;};s.firefly.XByteArray.prototype.setNative=function(n){this.m_nativeByteArray=n;};s.firefly.XByteArray.prototype.resetValue=s.firefly.XObject.noSupport;s.firefly.XByteArray.prototype.toString=s.firefly.XObject.noSupport;s.firefly.XMath={isNaN:function(v){if(v===null||v===undefined){return true;}return isNaN(v);},abs:function(v){return Math.abs(v);},mod:function(i,a){if(a===0){throw new Error("Illegal Argument: division by 0");}if(i===0){return 0;}return i%a;},longMod:function(l,a){if(a===0){throw new Error("Illegal Argument: division by 0");}if(l===0){return 0;}return l%a;},div:function(i,a){if(a===0){throw new Error("Illegal Argument: division by 0");}if(i===0){return 0;}if(i<0!==a<0){return Math.ceil(i/a);}return Math.floor(i/a);},longDiv:function(i,a){if(a===0){throw new Error("Illegal Argument: division by 0");}if(i===0){return 0;}if(i<0!==a<0){return Math.ceil(i/a);}return Math.floor(i/a);},binaryAnd:function(v,a){return v&a;},binaryOr:function(v,a){return v|a;},binaryXOr:function(v,a){return v^a;},min:function(f,a){if(f>a){return a;}return f;},max:function(f,a){if(f>a){return f;}return a;},clamp:function(l,u,v){var x=s.firefly.XMath;var a=x.min(l,u);var b=x.max(l,u);return x.max(a,x.min(v,b));},pow:function(a,b){return Math.pow(a,b);},random:function(u){return Math.floor(Math.random()*u);}};return s.firefly;});