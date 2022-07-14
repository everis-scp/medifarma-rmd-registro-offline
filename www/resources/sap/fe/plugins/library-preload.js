//@ui5-bundle sap/fe/plugins/library-preload.js
/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
  
 */
sap.ui.predefine('sap/fe/plugins/library',["sap/ui/core/Core","sap/ui/core/library"],function(){"use strict";sap.ui.getCore().initLibrary({name:"sap.fe.plugins",dependencies:["sap.ui.core"],types:[],interfaces:[],controls:[],elements:[],version:"1.93.3",noLibraryCSS:true});return sap.fe.plugins;});
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
  
 */
sap.ui.predefine('sap/fe/plugins/preload/FilePreload',["sap/base/util/LoaderExtensions","sap/base/Log"],function(L,a){"use strict";var F={_isModuleLoaded:function(p){var s=p.split("/"),c=window,i=0;while(i<s.length&&c){c=c[s[i]];i++;}return c!==undefined;},_loadLibraries:function(l){return this._waitUntilHomeIsDisplayed().then(function(){return sap.ui.getCore().loadLibraries(l);}).catch(function(e){a.error("sap.fe.plugins.Preload: Error while preloading libraries - "+e.message);});},_loadModulesByChunks:function(m){var i;for(i=m.length-1;i>=0;i--){var M=m[i];if(this._isModuleLoaded(M)){m.splice(i,1);}}var t=m.length,c=Math.ceil(t/this.iChunkSize);if(c===0){return Promise.resolve();}else{var C=[],b=this;for(i=0;i<c;i++){C.push(m.slice(i*this.iChunkSize,i*this.iChunkSize+this.iChunkSize));}return new Promise(function(r,d){b._processChunk(C,0,r);});}},_processChunk:function(c,C,r){var t=this;if(C>=c.length){r();}else{var b=c[C];t._waitUntilHomeIsDisplayed().then(function(){sap.ui.require(b,function(e){a.debug("sap.fe.plugins.Preload: Chunk ["+C+"] loaded ("+JSON.stringify(b)+")");setTimeout(function(){t._processChunk(c,C+1,r);},t.iChunkInterval);},function(){a.error("sap.fe.plugins.Preload: failed to load library chunk: "+JSON.stringify(b));setTimeout(function(){t._processChunk(c,C+1,r);},t.iChunkInterval);});}).catch(function(){a.error("sap.fe.plugins.Preload: unknown error - Aborting");r();});}},_waitUntilHomeIsDisplayed:function(){var r;function o(){var A=sap.ushell.Container.getService("AppLifeCycle"),i=A.getCurrentApplication().homePage;if(i){A.detachAppLoaded(o);a.info("sap.fe.plugins.Preload: preload resumed");r();}}if(sap.ushell.Container.getService("AppLifeCycle").getCurrentApplication().homePage===false){a.info("sap.fe.plugins.Preload: preload paused");return new Promise(function(b,c){sap.ushell.Container.getService("AppLifeCycle").attachAppLoaded(o);r=b;});}else{return Promise.resolve();}},start:function(c){a.info("sap.fe.plugins.Preload: preload deactivated");}};return F;});
sap.ui.require.preload({
	"sap/fe/plugins/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.fe.plugins","type":"library","embeds":[],"applicationVersion":{"version":"1.93.3"},"title":"UI5 library: sap.fe.plugins","description":"UI5 library: sap.fe.plugins","ach":"CA-UI5-FE","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.93","libs":{"sap.ui.core":{"minVersion":"1.93.3"}}},"library":{"i18n":false,"css":false,"content":{"controls":[],"elements":[],"types":[],"interfaces":[]}}}}'
},"sap/fe/plugins/library-preload"
);
//# sourceMappingURL=library-preload.js.map