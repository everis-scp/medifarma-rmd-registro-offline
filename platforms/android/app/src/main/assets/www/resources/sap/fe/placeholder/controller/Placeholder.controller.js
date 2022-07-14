/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/base/util/LoaderExtensions","sap/base/Log"],function(C,L,a){"use strict";return C.extend("sap.fe.placeholder.controller.Placeholder",{isPlaceholder:function(){return true;},setPlaceholderOption:function(o){this.oOptions=o;},getOptions:function(k){return this.oOptions[k];},istargetNavigated:function(t){if(!this.aTargetNavigated){this.aTargetNavigated=[];}if(this.aTargetNavigated.indexOf(t.id)===-1){this.sCurrentTargetId=t.id;return false;}else{return true;}},currentTargetNavigated:function(){if(!this.aTargetNavigated){this.aTargetNavigated=[];}if(this.aTargetNavigated&&this.aTargetNavigated.indexOf(this.sCurrentTargetId)===-1){this.aTargetNavigated.push(this.sCurrentTargetId);}},onInit:function(){var p=this.byId("PlaceholderContent");if(p){L.loadResource(p.data("placeholder"),{async:true,dataType:"text"}).then(function(c){if(!p._bIsBeingDestroyed){p.setContent(c);}}).catch(function(){a.error("Unable to initialize Placeholder: "+p.data("placeholder"));});}}});},true);
