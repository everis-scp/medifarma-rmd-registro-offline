/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/EventProvider','./Target','./async/Targets','./sync/Targets',"sap/base/util/UriParameters","sap/base/Log","sap/base/util/deepExtend"],function(E,T,a,s,U,L,d){"use strict";var b=E.extend("sap.ui.core.routing.Targets",{constructor:function(o){var t,c;E.apply(this);this._mTargets={};this._oLastTitleTarget={};this._oConfig=o.config;this._oCache=o.cache||o.views;if(!this._oConfig){this._oConfig={_async:false};}function e(){if(U.fromQuery(window.location.search).get("sap-ui-xx-asyncRouting")==="true"){L.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","Targets");return true;}return false;}if(this._oConfig._async===undefined){this._oConfig._async=(this._oConfig.async===undefined)?e():this._oConfig.async;}var f=this._oConfig._async?a:s;for(var g in f){this[g]=f[g];}for(t in o.targets){if(o.targets.hasOwnProperty(t)){this._createTarget(t,o.targets[t]);}}for(c in this._mTargets){if(this._mTargets.hasOwnProperty(c)){this._addParentTo(this._mTargets[c]);}}},_setRouter:function(r){if(!this._oRouter){this._oRouter=r;}else{L.warning("The Targets is already connected with a router and this call of _setRouter is ignored");}return this;},destroy:function(){var t;E.prototype.destroy.apply(this);for(t in this._mTargets){if(this._mTargets.hasOwnProperty(t)){this._mTargets[t].destroy();}}this._mTargets=null;this._oCache=null;this._oConfig=null;this.bIsDestroyed=true;return this;},getViews:function(){return this._oCache;},getCache:function(){return this._oCache;},getTarget:function(n,S){var t=this,c=this._alignTargetsInfo(n),e;e=c.reduce(function(A,C){var o=t._mTargets[C.name];if(o){A.push(o);}else if(!S){L.error("The target you tried to get \""+C.name+"\" does not exist!",t);}return A;},[]);return e.length<=1?e[0]:e;},addTarget:function(n,t){var o=this.getTarget(n,true),c;if(o){L.error("Target with name "+n+" already exists",this);}else{c=this._createTarget(n,t);this._addParentTo(c);}return this;},suspend:function(t){var c=this._alignTargetsInfo(t);c.forEach(function(o){var e=o.name;var f=this.getTarget(e);if(f){f.suspend();}}.bind(this));return this;},resume:function(t){var c=this._alignTargetsInfo(t);c.forEach(function(o){var e=o.name;var f=this.getTarget(e);if(f){f.resume();}}.bind(this));return this;},attachDisplay:function(D,f,l){return this.attachEvent(this.M_EVENTS.DISPLAY,D,f,l);},detachDisplay:function(f,l){return this.detachEvent(this.M_EVENTS.DISPLAY,f,l);},fireDisplay:function(p){return this.fireEvent(this.M_EVENTS.DISPLAY,p);},attachTitleChanged:function(D,f,l){this.attachEvent(this.M_EVENTS.TITLE_CHANGED,D,f,l);return this;},detachTitleChanged:function(f,l){return this.detachEvent(this.M_EVENTS.TITLE_CHANGED,f,l);},fireTitleChanged:function(p){if(this._oLastTitleTarget.name!==p.name||this._oLastTitleTarget.title!==p.title){this._oLastTitleTarget.name=p.name;this._oLastTitleTarget.title=p.title;this.fireEvent(this.M_EVENTS.TITLE_CHANGED,p);}return this;},M_EVENTS:{DISPLAY:"display",TITLE_CHANGED:"titleChanged"},_alignTargetsInfo:function(t){if(t===undefined){return[];}if(!Array.isArray(t)){return(typeof t==="object")?[t]:[{name:t}];}return t.map(function(v){if(typeof v!=="object"){v={name:v};}return v;});},_createTarget:function(n,t){var o,O;O=d({_name:n},this._oConfig,t);o=this._constructTarget(O);o.attachDisplay(function(e){var p=e.getParameters();this.fireDisplay({name:n,view:p.view,object:p.object,control:p.control,config:p.config,data:p.data,routeRelevant:p.routeRelevant});},this);this._mTargets[n]=o;return o;},_addParentTo:function(t){var p,P=t._oOptions.parent;if(!P){return;}p=this._mTargets[P];if(!p){L.error("The target '"+t._oOptions._name+" has a parent '"+P+"' defined, but it was not found in the other targets",this);return;}t._oParent=p;},_constructTarget:function(o,p){return new T(o,this._oCache,p);},_setRootViewId:function(i){var t,o;for(t in this._mTargets){if(this._mTargets.hasOwnProperty(t)){o=this._mTargets[t]._oOptions;if(o.rootView===undefined){o.rootView=i;}}}},_getTitleTargetName:function(t,p){var o,c;if(p){t=[p];}t=this._alignTargetsInfo(t);t.some(function(e){o=this.getTarget(e);while(o&&!o._oOptions.title){o=o._oParent;}if(o){c=o._oOptions._name;return true;}}.bind(this));return c;},_forwardTitleChanged:function(e){this.fireTitleChanged({name:e.getParameter("name"),title:e.getParameter("title")});},_attachTitleChanged:function(t,c){var o,C;C=this._getTitleTargetName(t,c);if(C){o=this.getTarget(C);}if(this._oLastDisplayedTitleTarget){this._oLastDisplayedTitleTarget.detachTitleChanged(this._forwardTitleChanged,this);this._oLastDisplayedTitleTarget._bIsDisplayed=false;}if(o){o.attachTitleChanged({name:o._oOptions._name},this._forwardTitleChanged,this);this._oLastDisplayedTitleTarget=o;}else if(c){L.error("The target with the name \""+c+"\" where the titleChanged event should be fired does not exist!",this);}}});return b;});
