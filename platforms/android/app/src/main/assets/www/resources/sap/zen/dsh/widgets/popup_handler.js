/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/zen/commons/thirdparty/lodash","sap/zen/dsh/utils/BaseHandler","sap/zen/dsh/widgets/transitionhandler","sap/zen/commons/layout/AbsoluteLayout","sap/ui/core/Popup"],function(jQuery,_,BaseHandler,transitions){"use strict";var PopupHandler=function(){BaseHandler.apply(this,arguments);var dispatcher=BaseHandler.dispatcher;var baseDuration=600,that=this;function init(a,c){var C=c.content;if(C){that.updateChildren(C,a,function(n,I){dispatcher.insertIntoAbsoluteLayoutContainer(a,n,I);},function(o){a.removeContent(o);});}}function isAuto(p){return p===undefined||p==="auto";}this.createAndAdd=function(c,C,o,a,I){var s=null,p={},A,t;if(sap.zen.designmode){A=this.createAbsoluteLayout(C["id"]);p.isAbsLayout=true;A.oPopupProperties=p;a(A,I);BaseHandler.dispatcher.updateComponentProperties(A,o);init(A,C);A.addStyleClass("popup");return A;}else{A=this.createAbsoluteLayout(C["id"]+"_abs");A.zenControlType=C.type;A.zenPopupHackId=C["id"];t=this.createDefaultProxy(C["id"]);t.oCommand=C.command;t.zenPopupHackId=C["id"]+"_abs";p.oAbsLayout=A;p.isAbsLayout=false;s=jQuery.extend({},o);p.positioner=new Positioning(s);t.oPopupProperties=p;p.positioner.calculateDimensions(o);p.positioner.setInvisible(o);a(A,I);BaseHandler.dispatcher.updateComponentProperties(A,o);init(A,C);if(C.show){setTimeout(function(){o.leftmargin=s.leftmargin;o.rightmargin=s.rightmargin;that.update(t,C,o,a,I);},50);}return t;}};this.update=function(c,C,o){var p=c.oPopupProperties;var a=p.isAbsLayout?c:p.oAbsLayout;C=C||{};init(a,C);if(!sap.zen.designmode&&Object.prototype.hasOwnProperty.call(C,"show")){if(C.show){p.positioner.calculateDimensions(o);if(o.width>0&&o.height>0){var n=null;if(C.cid){n=dispatcher.getRootControlForComponentId(C.cid);}this.show(c,C,o,n,a);}}else{if(c.oPopup&&c.oPopup.isOpen()){if(C.animation.toLowerCase()==="slidevertical"&&!isAuto(o.bottommargin)&&isAuto(o.topmargin)&&c.oPopup.getOpenState()==="OPENING"){setTimeout(function(){that.hide(c);},baseDuration*1.5);}else{this.hide(c);}}else if(!Object.prototype.hasOwnProperty.call(c,"oPopup")&&!sap.zen.designmode){p.positioner.setInvisible(o);}}c.setVisible(false);}return c;};var super_remove=this.remove;this.remove=function(c){super_remove.call(this,c);if(c.zenPopupHackId){var p=sap.ui.getCore().byId(c.zenPopupHackId);if(p){BaseHandler.dispatcher.dispatchRemove(p);}}};this.show=function(c,C,o,n,a){var b;n=n||null;if(!c.oPopup){this.createPopup(c,C,a);}else if(c.oPopup.isOpen()){return;}b=this.configureTransitions(c,C);b&&b.preOperations({oComponentProperties:o,oAbsLayout:c});c.oPopupProperties["duration"]=b.getDuration()||baseDuration;c.oPopup.open(c.oPopupProperties["duration"]);b&&b.postOperations({oComponentProperties:o,oAbsLayout:c});};this.hide=function(c){c&&c.oPopup&&c.oPopup.close(c.oPopupProperties["duration"]);};this.createPopup=function(C,o,a){if(o.modal){o.autoclose=false;}C.oPopup=new sap.ui.core.Popup(a,!!o.modal,true,!!o.autoclose);var A=a.destroy;a.destroy=function(s){if(this.zenPopupHackId){var c=sap.ui.getCore().byId(this.zenPopupHackId);if(c){var p=c.oPopup;if(p&&p.destroy){p.destroy(s);}}}if(A){A.call(a,s);}};C.oPopup.attachClosed(function(){that.freeResources(C);});};this.freeResources=function(oControl){if(oControl.oCommand){var command=that.prepareCommand(oControl.oCommand,"__VALUE__","false");eval(command);}if(oControl&&oControl.oPopup){oControl.oPopup.destroy();oControl.oPopup=null;}};var transitionHandler={};this.registerTransitionHandler=function(t,T){transitionHandler[t]=T;};this.getTransitionHandler=function(t,p){if(t!=="none"&&(jQuery.browser.msie||!document.getElementById("ROOT_absolutelayout"))){return new transitionHandler["fade"](p);}return new transitionHandler[t](p);};this.configureTransitions=function(c,C){var h=this.getTransitionHandler(C.animation.toLowerCase(),c.oPopupProperties.positioner);c.oPopup.setAnimations(h.open,h.close);return h;};this.applyForChildren=function(a,f){if(!a.getPositions){return null;}var p=a.getPositions();for(var i=0;i<p.length;i++){var c=p[i].getControl();if(c){var r=f(c);if(r)return r;}}return null;};this.getDefaultProxyClass=function(){return["sap.m.Text","sap.ui.commons.TextView"];};this.getDecorator=function(){return"PopupDecorator";};this.getType=function(){return"popup";};};var Positioning=function(){var d="13 -10",s=1000;this.store=arguments[0]||{};this.dockingPosition=null;function a(p){return p===undefined||p==="auto";}this.getComponentProperties=function(){return this.store;};this.calculateRedocking=function(r){var b=Math.round(r.outerWidth()-r.width());var c=Math.round(r.outerHeight()-r.height());var e={top:"auto",bottom:"auto",left:"auto",right:"auto"};if(!a(this.store.bottommargin)){if(!a(this.store.topmargin)){e.bottom=(this.store.bottommargin-c)+"px";}else{e.bottom=this.store.bottommargin+"px";}}if(!a(this.store.topmargin)){e.top=this.store.topmargin+"px";}if(!a(this.store.leftmargin)){e.left=this.store.leftmargin+"px";}if(!a(this.store.rightmargin)){if(!a(this.store.leftmargin)){e.right=(this.store.rightmargin-b)+"px";}else{e.right=this.store.rightmargin+"px";}}return this.dockingPosition=e;};this.getDockingPosition=function(){return this.dockingPosition;};this.calculateDimensions=function(c){var j=jQuery("body");var v=j.width(),b=j.height();if(a(c.width)){c.width=v-parseInt(c.leftmargin)-parseInt(c.rightmargin);c.rightmargin="auto";}if(a(c.height)){c.height=b-parseInt(c.topmargin)-parseInt(c.bottommargin);c.bottommargin="auto";}};this.calculatePosition=function(c,n){var p,v,h,b;if(!a(c.leftmargin)){h=parseInt(c.leftmargin);if(!a(c.topmargin)){b=parseInt(c.topmargin);p=v=sap.ui.core.Popup.Dock.LeftTop;}else{b=parseInt(c.bottommargin)*-1;p=v=sap.ui.core.Popup.Dock.LeftBottom;}}else if(!a(c.rightmargin)){h=parseInt(c.rightmargin)*-1;if(!a(c.bottommargin)){b=parseInt(c.bottommargin)*-1;p=v=sap.ui.core.Popup.Dock.RightBottom;}else{b=parseInt(c.topmargin);p=v=sap.ui.core.Popup.Dock.RightTop;}}return{my:n?sap.ui.core.Popup.Dock.LeftTop:p,at:n?sap.ui.core.Popup.Dock.RightTop:v,of:document,offset:n?d:h+" "+b,collision:"none"};};this.setInvisible=function(c){if(!a(c.leftmargin)){c.leftmargin="-5000";}else if(!a(c.rightmargin)){c.rightmargin="5000";}};this.getHorizontalOffset=function(c){var o;if(!a(c.leftmargin)){o=parseInt(c.width)?(-parseInt(c.width)-10):-s;if(!a(c.topmargin)){o+=" "+parseInt(c.topmargin);}else{o+=" "+(parseInt(c.bottommargin)*-1);}}else if(!a(c.rightmargin)){o=parseInt(c.width)?(parseInt(c.width)+10):s;if(!a(c.topmargin)){o+=" "+parseInt(c.topmargin);}else{o+=" "+(parseInt(c.bottommargin)*-1);}}return o;};this.getVerticalOffset=function(c){var o;if(!a(c.topmargin)){o=parseInt(c.height)?(-parseInt(c.height)-10):-s;if(!a(c.leftmargin)){o=parseInt(c.leftmargin)+" "+o;}else{o=(parseInt(c.rightmargin)*-1)+" "+o;}}else if(!a(c.bottommargin)){o=parseInt(c.height)?(parseInt(c.height)+10):s;if(!a(c.leftmargin)){o=parseInt(c.leftmargin)+" "+o;}else{o=(parseInt(c.rightmargin)*-1)+" "+o;}}return o;};};var handler=new PopupHandler();for(var i=0;i<transitions.length;i++){var transition=transitions[i];handler.registerTransitionHandler(new transition().getType(),transition);}return handler;});