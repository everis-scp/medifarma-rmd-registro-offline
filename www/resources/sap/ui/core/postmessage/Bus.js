/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/EventBus","sap/base/util/includes","sap/base/util/isPlainObject","sap/base/Log"],function(E,i,a,L){"use strict";var I;var s='______UI5______';var P=E.extend("sap.ui.core.postmessage.Bus",{constructor:function(){if(I){return I;}I=this;E.apply(this,arguments);this._aAcceptedOrigins=[window.location.origin];this._aDeclinedOrigins=[];this._oPendingProcess=null;this._aEventQueue=[];this._receiver=this._receiver.bind(this);window.addEventListener('message',this._receiver);}});P.event={CONNECT:'______CONNECT______',READY:'______READY______',ACCEPTED:'______ACCEPTED______',DECLINED:'______DECLINED______'};P.prototype.destroy=function(){window.removeEventListener('message',this._receiver);this._aEventQueue=[];E.prototype.destroy.apply(this,arguments);I=undefined;this.bIsDestroyed=true;};P.getInstance=function(){if(!I){I=new P();}return I;};P.prototype.publish=function(p){var t=p.target;var o=p.origin;var c=p.channelId;var e=p.eventId;var d=p.data;if(e===P.event.READY){if(!t){if(window.opener&&window.opener!==window){t=window.opener;}else if(window.parent!==window){t=window.parent;}else{return;}}if(!o){o='*';}}if((typeof window==="undefined")||!(t!=null&&t===t.window)||t===window){throw TypeError("Target must be a window object and has to differ from current window");}if(typeof o!=="string"){throw TypeError("Origin must be a string");}if(typeof c!=="string"){throw TypeError("ChannelId must be a string");}if(typeof e!=="string"){throw TypeError("EventId must be a string");}if(!i([P.event.READY,P.event.ACCEPTED,P.event.DECLINED],e)&&o!=='*'&&!i(this._aAcceptedOrigins,o)){this._aAcceptedOrigins.push(o);}var m={origin:o,channelId:c,eventId:e,data:d};m[s]=true;t.postMessage(m,o);};P.prototype._callListener=function(c,l,C,e,d){c.call(l,d);};P.prototype._getText=function(k,p){return sap.ui.getCore().getLibraryResourceBundle(true).then(function(l){return l.getText(k,p);});};P.prototype._receiver=function(e){var d=e.data;if(!a(d)||!d.hasOwnProperty(s)){return;}if(this._oPendingProcess){this._aEventQueue.push(e);}else{this._oPendingProcess=this._processEvent(e);}};P.prototype._processEvent=function(e){return new Promise(function(r,R){var d=e.data;var o=e.origin;if(i(this._aDeclinedOrigins,o)){r();return;}switch(d.eventId){case P.event.CONNECT:{if(typeof d.data!=="string"){this.publish({target:e.source,origin:e.origin,channelId:d.channelId,eventId:P.event.DECLINED});r();}else if(i(this._aAcceptedOrigins,o)){this.publish({target:e.source,origin:e.origin,channelId:d.channelId,eventId:P.event.ACCEPTED});r();}else{sap.ui.require(["sap/ui/core/postmessage/confirmationDialog"],function(c){this._getText('PostMessage.Message',[d.data,o]).then(function(t){return c(t);}).then(function(){this.addAcceptedOrigin(o);this.publish({target:e.source,origin:e.origin,channelId:d.channelId,eventId:P.event.ACCEPTED});}.bind(this),function(){this.addDeclinedOrigin(o);this.publish({target:e.source,origin:e.origin,channelId:d.channelId,eventId:P.event.DECLINED});}.bind(this)).then(r);}.bind(this),R);}break;}case P.event.ACCEPTED:case P.event.DECLINED:case P.event.READY:{e.data.data=undefined;this._emitMessage(e);r();break;}default:{if(i(this._aAcceptedOrigins,o)){this._emitMessage(e);}r();}}}.bind(this)).catch(function(v){var m;var d;if(typeof v==='string'){m=v;}else if(v instanceof Error){m=v.message;d=v.stack;}else{m='Some unexpected error happened during post message processing';}L.error(m,d,'sap.ui.core.postmessage.Bus');}).then(function(){this._oPendingProcess=(this._aEventQueue.length>0?this._processEvent(this._aEventQueue.shift()):null);}.bind(this));};P.prototype._emitMessage=function(e){var c=e.data.channelId;var b=e.data.eventId;E.prototype.publish.call(this,c,b,{originalEvent:e,channelId:c,eventId:b,source:e.source,origin:e.origin,data:e.data.data});};P.prototype.getAcceptedOrigins=function(){return this._aAcceptedOrigins.slice();};P.prototype.setAcceptedOrigins=function(o){if(!Array.isArray(o)){throw new TypeError('Expected an array, but got '+typeof o);}this._aAcceptedOrigins=o.slice();};P.prototype.addAcceptedOrigin=function(o){if(typeof o!=='string'){throw new TypeError('Expected a string, but got '+typeof o);}if(!i(this._aAcceptedOrigins,o)){this._aAcceptedOrigins.push(o);}};P.prototype.resetAcceptedOrigins=function(){this.setAcceptedOrigins([]);};P.prototype.getDeclinedOrigins=function(){return this._aDeclinedOrigins.slice();};P.prototype.setDeclinedOrigins=function(o){if(!Array.isArray(o)){throw new TypeError('Expected an array, but got '+typeof o);}this._aDeclinedOrigins=o.slice();};P.prototype.addDeclinedOrigin=function(o){if(typeof o!=='string'){throw new TypeError('Expected a string, but got '+typeof o);}if(!i(this._aDeclinedOrigins,o)){this._aDeclinedOrigins.push(o);}};P.prototype.resetDeclinedOrigins=function(){this.setDeclinedOrigins([]);};return P;});
