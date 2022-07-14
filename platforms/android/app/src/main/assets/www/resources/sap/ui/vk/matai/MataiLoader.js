/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","sap/ui/base/ManagedObject","../getResourceBundle","../threejs/SceneBuilder","../svg/SceneBuilder","../helpers/WorkerScriptLoader","../DownloadManager"],function(L,M,g,S,a,W,D){"use strict";var P={FinishedTree:g().getText("SCENE_CONTEXT_FINISHED_TREE"),LoadingGeometries:g().getText("SCENE_CONTEXT_LOADING_GEOMETRIES"),LoadingTextures:g().getText("SCENE_CONTEXT_LOADING_TEXTURES"),LoadingModelViews:g().getText("SCENE_CONTEXT_LOADING_MODEL_VIEWS")};var b=M.extend("sap.ui.vk.matai.MataiLoader",{metadata:{events:{contentChangesProgress:{parameters:{source:"any",phase:"string",percent:"float"}},contentLoadingFinished:{parameters:{source:"any",node:"any"}}}}});function u(s,p,d){var e=s._progress;e.phase=p;e.count=d;var f=40+60*(e.totalCount?e.count/e.totalCount:1);s._loader.fireContentChangesProgress({source:s._contentResource.getSource(),phase:p,percentage:Math.min(f,100)});}var c=(function(){var p;return function(){return p||(p=new Promise(function(r,d){var m="sap/ui/vk/ve/matai.js";if(sap.ui.Device.browser.internet_explorer){m="sap/ui/vk/ve/matai_asm.js";}var w=W.loadScript("sap/ui/vk/matai/MataiLoaderWorker.js",[m]);w.onmessage=function(h){var i=h.data;if(i.ready){r(this);}else{var s=this._sceneBuilders[i.sceneBuilderId];try{s[i.method].apply(s,i.args);}catch(e){L.error("SceneBuilder."+i.method+"()",e);}switch(i.method){case"setScene":var j=i.args[0];s._progress.totalCount=j.meshCount+j.imageCount+j.modelViewCount;u(s,P.FinishedTree,0);break;case"setGeometry":u(s,P.LoadingGeometries,s._progress.count+1);break;case"createImage":u(s,P.LoadingTextures,s._progress.count+1);break;case"createThumbnail":u(s,P.LoadingModelViews,s._progress.count+1);break;default:break;}}};w.onerror=function(e){d(e);};var f=W.absoluteUri("sap/ui/vk/ve").toString()+"/";w.postMessage({method:"createRuntime",scriptDirectory:f});}));};})();function l(d,e,f,p,h,r,i){c().then(function(w){w.onerror=function(j){L.error("Error in WebWorker",j);i(g().getText("LOADER_ERRORREADINGFILE"));};var s=new(p.isObject3D?S:a)(p,h,r,i);s._loader=d;s._progress={};w._sceneBuilders=w._sceneBuilders||[];s._id=w._sceneBuilders.length;w._sceneBuilders.push(s);w.postMessage({method:"loadSceneFromArrayBuffer",sceneBuilderId:s._id,buffer:e,fileName:f,sourceLocation:"remote"},[e]);},function(j){i(j);});}b.prototype.load=function(p,d){var t=this;return new Promise(function(r,f){if(typeof d.getSource()==="string"){var h=d.getSource();new D([h]).attachItemSucceeded(function(e){var s=e.getParameter("source");var j=e.getParameter("response");l(t,j,s,p,d,r,f);},this).attachItemFailed(function(e){var j=e.getParameter("statusText");if(j==""){j=g().getText("VIEWER_SOURCE_FAILED_TO_DOWNLOAD_CAUSE");}f(j);},this).start();}else if(d.getSource()instanceof File){var i=new FileReader();i.onload=function(e){l(t,e.target.result,d.getSource().name,p,d,r,f);};i.onerror=function(e){f(e);};i.readAsArrayBuffer(d.getSource());}});};return b;});