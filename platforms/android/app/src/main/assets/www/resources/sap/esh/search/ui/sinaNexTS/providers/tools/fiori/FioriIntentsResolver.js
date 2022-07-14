/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var _=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function a(){this.constructor=d;}d.prototype=b===null?Object.create(b):(a.prototype=b.prototype,new a());};})();sap.ui.define(["require","exports","../../../sina/SinaObject","../../../sina/AttributeType"],function(r,e,S,A){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.FioriIntentsResolver=void 0;var F=(function(a){_(F,a);function F(p){var b=a.call(this,p)||this;if(typeof window!=="undefined"&&window.sap&&window.sap.ushell&&window.sap.ushell.Container&&window.sap.ushell.Container.getService){b._launchpadNavigation=window.sap.ushell.Container.getService("SmartNavigation")||window.sap.ushell.Container.getService("CrossApplicationNavigation");b._fioriFrontendSystemInfo={systemId:window.sap.ushell.Container.getLogonSystem().getName(),client:window.sap.ushell.Container.getLogonSystem().getClient(),};b._primaryIntentAction="-displayFactSheet";b._suppressInSearchTag="suppressInEnterpriseSearch".toLowerCase();}return b;}F.prototype.resolveIntents=function(v){var t=this;if(!t._launchpadNavigation||!v){return Promise.resolve({defaultNavigationTarget:v.fallbackDefaultNavigationTarget,});}if(Array.isArray(v)){var p=[];for(var k=0;k<v.length;k++){var b=t._doResolveIntents(v[k]);p.push(b);}return Promise.all(p);}return t._doResolveIntents(v);};F.prototype._doResolveIntents=function(v){var t=this;var s=v.semanticObjectType;var b=v.semanticObjectTypeAttributes;var c=v.systemId;var d=v.client;var f=v.fallbackDefaultNavigationTarget;if(!s||s.length===0){return Promise.resolve({defaultNavigationTarget:f,});}if(!b||b.length===0){return Promise.resolve();}var g={};var h;for(var i=0;i<b.length;i++){h=this.convertAttributeValueToUI5DataTypeFormats(b[i].value,b[i].type);g[b[i].name]=h;}var j={systemId:c||(t._fioriFrontendSystemInfo&&t._fioriFrontendSystemInfo.systemId),client:d||(t._fioriFrontendSystemInfo.client&&t._fioriFrontendSystemInfo.client),};if(c&&c.trim().length>0&&d&&d.trim().length>0&&(!t._fioriFrontendSystemInfo||!(t._fioriFrontendSystemInfo.systemId===c&&t._fioriFrontendSystemInfo.client===d))){j.urlParameter="sap-system=sid("+c+"."+d+")";}var p=new Promise(function(l,m){if(t._launchpadNavigation.getPrimaryIntent){t._launchpadNavigation.getPrimaryIntent(s,g).done(function(n){l(n);}).fail(function(){l();});}else{l();}});var k=new Promise(function(l,m){var n;if(t._launchpadNavigation.getLinks){n=t._launchpadNavigation.getLinks({semanticObject:s,params:g,withAtLeastOneUsedParam:true,sortResultOnTexts:true,});}else{n=t._launchpadNavigation.getSemanticObjectLinks(s,g);}n.done(function(o){l(o);}).fail(function(){l();});});return Promise.all([p,k]).then(function(l){var i;var m=l[0];var n;var o=l[1];var q;var u={navigationTargets:[],};var w;if(m&&!t._shallIntentBeSuppressed(m)){w=t._getNavigationTargetForIntent(m,j);u.defaultNavigationTarget=w;}var x=u.defaultNavigationTarget!==undefined;u.navigationTargets=[];if(o){for(i=0;i<o.length;i++){n=o[i];if(t._shallIntentBeSuppressed(n)){continue;}q=t._getNavigationTargetForIntent(n,j);if(!x&&n.intent.substring(n.intent.indexOf("-"),n.intent.indexOf("?"))===t._primaryIntentAction){u.defaultNavigationTarget=q;x=true;}else if(!w||!q.isEqualTo(w)){u.navigationTargets.push(q);}}}return u;});};F.prototype._shallIntentBeSuppressed=function(b){if(b.tags){for(var i=0;i<b.tags.length;i++){if(b.tags[i].toLowerCase()===this._suppressInSearchTag){return true;}}}return false;};F.prototype._getNavigationTargetForIntent=function(i,s){var t=this;var b=i.intent;if(s.urlParameter){if(b.indexOf("?")===-1){b+="?";}else{b+="&";}b+=s.urlParameter;}var c={target:{shellHash:b,},};var d=t._launchpadNavigation.hrefForExternal(c);var n=t.sina._createNavigationTargetForIntent({label:i.text,targetUrl:d,externalTarget:c,systemId:s.systemId,client:s.client,});return n;};F.prototype.convertAttributeValueToUI5DataTypeFormats=function(v,s){var y,m,d,h,b,c,f;switch(s){case A.AttributeType.Timestamp:y=v.getUTCFullYear();m=v.getUTCMonth()+1;d=v.getUTCDate();h=v.getUTCHours();b=v.getUTCMinutes();c=v.getUTCSeconds();f=v.getUTCMilliseconds()*1000;v=this.addLeadingZeros(y.toString(),4)+"-"+this.addLeadingZeros(m.toString(),2)+"-"+this.addLeadingZeros(d.toString(),2)+"T"+this.addLeadingZeros(h.toString(),2)+":"+this.addLeadingZeros(b.toString(),2)+":"+this.addLeadingZeros(c.toString(),2)+"."+this.addLeadingZeros(f.toString(),3);break;case A.AttributeType.Date:v=v.slice(0,4)+"-"+v.slice(5,7)+"-"+v.slice(8,10);break;}return v;};F.prototype.addLeadingZeros=function(v,l){return"00000000000000".slice(0,l-v.length)+v;};return F;}(S.SinaObject));e.FioriIntentsResolver=F;});})();