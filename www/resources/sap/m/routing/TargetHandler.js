/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/InstanceManager','sap/m/NavContainer','sap/m/SplitContainer','sap/ui/base/Object','sap/ui/core/routing/History','sap/ui/Device',"sap/base/Log"],function(I,N,S,B,H,D,L){"use strict";var o={"onAfterShow":function(e){this.getParent().hidePlaceholder({});this.removeEventDelegate(o);}};var T=B.extend("sap.m.routing.TargetHandler",{constructor:function(c){this._aQueue=[];this._oNavigationOrderPromise=Promise.resolve();if(c===undefined){this._bCloseDialogs=true;}else{this._bCloseDialogs=!!c;}}});T.prototype.setCloseDialogs=function(c){this._bCloseDialogs=!!c;return this;};T.prototype.getCloseDialogs=function(){return this._bCloseDialogs;};T.prototype.addNavigation=function(p){this._aQueue.push(p);};T.prototype.navigate=function(d){var u=this._groupNavigation(),r=this._createResultingNavigations(d.navigationIdentifier,u),c=false,b=this._getDirection(d),n;while(r.length){n=this._applyNavigationResult(r.shift().oParams,b);c=c||n;}if(c){this._closeDialogs();}};T.prototype._chainNavigation=function(n,s){var p=this._oNavigationOrderPromise.then(n);this._oNavigationOrderPromise=p.catch(function(e){L.error("The following error occurred while displaying routing target with name '"+s+"': "+e);});return p;};T.prototype._getDirection=function(d){var t=d.viewLevel,h=H.getInstance(),b=false;if(d.direction==="Backwards"){b=true;}else if(isNaN(t)||isNaN(this._iCurrentViewLevel)||t===this._iCurrentViewLevel){if(d.askHistory){b=h.getDirection()==="Backwards";}}else{b=t<this._iCurrentViewLevel;}this._iCurrentViewLevel=t;return b;};T.prototype._groupNavigation=function(){var c,C,s,n,u=[],i;while(this._aQueue.length){c=this._aQueue.shift();C=c.targetControl;s=c.aggregationName;if(!c.preservePageInSplitContainer){for(i=0;i<u.length;i++){n=u[i];if(C!==n.targetControl||s!==n.aggregationName){continue;}u.splice(i,1);break;}}u.push(c);}return u;};T.prototype._createResultingNavigations=function(n,u){var i,c,C,a,r=[],v,b,p,R;while(u.length){c=u.shift();C=c.targetControl;b=C instanceof S;v=c.view;a={oContainer:C,oParams:c};if(b){a.bIsMasterPage=!!C.getMasterPage(v.getId());}p=b&&c.preservePageInSplitContainer&&C.getCurrentPage(a.bIsMasterPage)&&n!==c.navigationIdentifier;for(i=0;i<r.length;i++){R=r[i];if(R.oContainer!==C){continue;}if(b){if(D.system.phone){r.splice(i,1);break;}else if(R.bIsMasterPage===a.bIsMasterPage){if(!p){r.splice(i,1);}break;}}}if(!p){r.push(a);}}return r;};T.prototype._applyNavigationResult=function(p,b){var t=p.targetControl,P,a=p.eventData,s=p.placeholderShown?"show":(p.transition||""),c=p.transitionParameters,v=p.view&&p.view.getId(),n=t instanceof S&&!!t.getMasterPage(v),d=(t instanceof S||t instanceof N)&&p.view,e,f;if(p.placeholderConfig){e=p.placeholderConfig.autoClose;f=p.placeholderConfig.container;}if(!d){if(f&&e&&f.hidePlaceholder){f.hidePlaceholder(p.placeholderConfig);}return false;}if(t.getDomRef()&&t.getCurrentPage(n).getId()===v){if(e&&f&&f.hidePlaceholder){f.hidePlaceholder(p.placeholderConfig);}L.info("navigation to view with id: "+v+" is skipped since it already is displayed by its targetControl","sap.m.routing.TargetHandler");return false;}else if(e){p.view.addEventDelegate(o,p.view);}L.info("navigation to view with id: "+v+" the targetControl is "+t.getId()+" backwards is "+b);if(b){P=t.getPreviousPage(n);if(!P||P.getId()!==v){t.insertPreviousPage(v,s,a);}t.backToPage(v,a,c);}else{t.to(v,s,a,c);}return true;};T.prototype._closeDialogs=function(){if(!this._bCloseDialogs){return;}if(I.hasOpenPopover()){I.closeAllPopovers();}if(I.hasOpenDialog()){I.closeAllDialogs();}if(I.hasOpenLightBox()){I.closeAllLightBoxes();}};T.prototype.showPlaceholder=function(s){var c=s.container,n=true,O;if(s.object&&!(s.object instanceof Promise)){O=s.object;}if(s.container&&typeof s.container.needPlaceholder==="function"){n=s.container.needPlaceholder(s.aggregation,O);}if(n){return c.showPlaceholder(s);}else{return Promise.resolve();}};return T;});
