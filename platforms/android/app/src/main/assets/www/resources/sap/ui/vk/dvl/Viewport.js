/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/ResizeHandler","../abgrToColor","../CameraFOVBindingType","../CameraProjectionType","../colorToABGR","../colorToCSSColor","../Core","../cssColorToColor","../getResourceBundle","../Loco","../Messages","../SelectionMode","../Smart2DHandler","../ViewportBase","../ViewportHandler","../VisibilityMode","../ZoomTo","../OutputSettings","./getJSONObject","./Scene","./ViewportRenderer","sap/base/Log"],function(R,a,C,b,c,d,v,e,g,L,M,S,h,V,k,l,Z,O,n,o,p,q){"use strict";var r;var s=function(){if(r){return;}r={encodedProjectionType:{},decodedProjectionType:{},encodedBindingType:{},decodedBindingType:{},decodedZoomTo:{}};r.decodedProjectionType[b.Perspective]=sap.ve.dvl.DVLCAMERAPROJECTION.PERSPECTIVE;r.decodedProjectionType[b.Orthographic]=sap.ve.dvl.DVLCAMERAPROJECTION.ORTHOGRAPHIC;r.encodedProjectionType[sap.ve.dvl.DVLCAMERAPROJECTION.PERSPECTIVE]=b.Perspective;r.encodedProjectionType[sap.ve.dvl.DVLCAMERAPROJECTION.ORTHOGRAPHIC]=b.Orthographic;r.decodedBindingType[C.Minimum]=sap.ve.dvl.DVLCAMERAFOVBINDING.MIN;r.decodedBindingType[C.Maximum]=sap.ve.dvl.DVLCAMERAFOVBINDING.Max;r.decodedBindingType[C.Horizontal]=sap.ve.dvl.DVLCAMERAFOVBINDING.HORZ;r.decodedBindingType[C.Vertical]=sap.ve.dvl.DVLCAMERAFOVBINDING.VERT;r.encodedBindingType[sap.ve.dvl.DVLCAMERAFOVBINDING.MIN]=C.Minimum;r.encodedBindingType[sap.ve.dvl.DVLCAMERAFOVBINDING.MAX]=C.Maximum;r.encodedBindingType[sap.ve.dvl.DVLCAMERAFOVBINDING.HORZ]=C.Horizontal;r.encodedBindingType[sap.ve.dvl.DVLCAMERAFOVBINDING.VERT]=C.Vertical;r.decodedZoomTo[Z.All]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_ALL;r.decodedZoomTo[Z.Visible]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_VISIBLE;r.decodedZoomTo[Z.Selected]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_SELECTED;r.decodedZoomTo[Z.Node]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_NODE;r.decodedZoomTo[Z.NodeSetIsolation]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_NODE_SETISOLATION;r.decodedZoomTo[Z.Restore]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_RESTORE;r.decodedZoomTo[Z.RestoreRemoveIsolation]=sap.ve.dvl.DVLZOOMTO.DVLZOOMTO_RESTORE_REMOVEISOLATION;r.decodedZoomTo[Z.ViewLeft]=sap.ve.dvl.DVLZOOMTO.VIEW_LEFT;r.decodedZoomTo[Z.ViewRight]=sap.ve.dvl.DVLZOOMTO.VIEW_RIGHT;r.decodedZoomTo[Z.ViewTop]=sap.ve.dvl.DVLZOOMTO.VIEW_TOP;r.decodedZoomTo[Z.ViewBottom]=sap.ve.dvl.DVLZOOMTO.VIEW_BOTTOM;r.decodedZoomTo[Z.ViewBack]=sap.ve.dvl.DVLZOOMTO.VIEW_BACK;r.decodedZoomTo[Z.ViewFront]=sap.ve.dvl.DVLZOOMTO.VIEW_FRONT;};var t=V.extend("sap.ui.vk.dvl.Viewport",{metadata:{library:"sap.ui.vk",properties:{backgroundColorTopABGR:{type:"int",defaultValue:0xff000000},backgroundColorBottomABGR:{type:"int",defaultValue:0xffffffff}},events:{pan:{parameters:{dx:"int",dy:"int"}},zoom:{parameters:{zoomFactor:"float"}},rotate:{parameters:{dx:"int",dy:"int"}},frameRenderingFinished:{}}}});var u=t.getMetadata().getParent().getClass().prototype;t.prototype.init=function(){if(u.init){u.init.call(this);}this._eventBus=v.getEventBus();this._graphicsCore=null;this._dvl=null;this._dvlRendererId=null;this._viewStateManager=null;this._canvas=null;this._resizeListenerId=null;this._is2D=false;this._viewportHandler=new k(this);this._loco=new L(this);this._loco.addHandler(this._viewportHandler,-1);this._smart2DHandler=null;this._lastPlayedStep=null;this._contentConnector=null;};t.prototype.exit=function(){this._loco.removeHandler(this._viewportHandler);this._viewportHandler.destroy();if(this._resizeListenerId){R.deregister(this._resizeListenerId);this._resizeListenerId=null;}this.setViewStateManager(null);this.setScene(null);this.setGraphicsCore(null);if(u.exit){u.exit.call(this);}};t.prototype.setGraphicsCore=function(f){s();if(f!=this._graphicsCore){if(this._graphicsCore){this._dvl.Client.detachFrameFinished(this._handleFrameFinished,this);this._dvl.Client.detachStepEvent(this._updateLastPlayedStep,this);this._dvl.Renderer.SetViewStateManager(null,this._dvlRendererId);this._graphicsCore._deregisterViewport(this);this._dvl=null;}this._graphicsCore=f;if(this._graphicsCore){this._dvl=this._graphicsCore._getDvl();this._graphicsCore._registerViewport(this);this.setShowDebugInfo(this.getShowDebugInfo());this._dvl.Client.attachStepEvent(this._updateLastPlayedStep,this);this._dvl.Client.attachFrameFinished(this._handleFrameFinished,this);this._dvl.Renderer.SetViewStateManager(this._viewStateManager,this._dvlRendererId);}}return this;};t.prototype.getGraphicsCore=function(){return this._graphicsCore;};t.prototype._setCanvas=function(f){var i=this.getDomRef()&&this._canvas!==f;this._canvas=f;if(i){this.invalidate();}return this;};t.prototype._setRenderer=function(f){this._dvlRendererId=f;return this;};t.prototype._updateLastPlayedStep=function(f){if(f.type===sap.ve.dvl.DVLSTEPEVENT.DVLSTEPEVENT_STARTED){this._lastPlayedStep=f.stepId;this._updateOutputSettings();}};t.prototype.setScene=function(f){if(this._dvlRendererId){this._dvl.Renderer.AttachScene(f&&f.getSceneRef()||null,this._dvlRendererId);this._dvlSceneRef=f?f.getSceneRef():null;if(f){this._dvl.Client.attachUrlClicked(this._fireUrlClicked,this);var i=this._isSmart2DContent()||this._isSmart2DContentLegacy();if(i){this._dvl.Renderer.SetBackgroundColor(1,1,1,1,1,1,1,1,this._dvlRendererId);}else{var j=this._getDecomposedABGR(this.getBackgroundColorTopABGR());var m=this._getDecomposedABGR(this.getBackgroundColorBottomABGR());this._dvl.Renderer.SetBackgroundColor(j.red,j.green,j.blue,j.alpha,m.red,m.green,m.blue,m.alpha,this._dvlRendererId);}this._updateOutputSettings();this.fireViewActivated({type:i?"2D":"3D"});}else{this._dvl.Client.detachUrlClicked(this._fireUrlClicked,this);if(this._smart2DHandler){this._loco.removeHandler(this._smart2DHandler);}this.invalidate();}}return this;};t.prototype._updateOutputSettings=function(){var f=this._dvl.Scene.RetrieveSceneInfo(this._dvlSceneRef,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_STEP_INFO);var i=this._dvl.Scene.RetrieveOutputSettings(this._dvlSceneRef,f.StepId);var j=new O({width:i.width,height:i.height,dpi:i.dpi});this.setOutputSettings(j);};t.prototype._isSmart2DContent=function(){var f=n(this._dvl.Scene.RetrieveSceneInfo(this._dvlSceneRef,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_HOTSPOTS).ChildNodes);return f&&f.length>0;};t.prototype._isSmart2DContentLegacy=function(){var f=this._dvl.Scene.GetCurrentCamera(this._dvlSceneRef),i=this._dvl.Camera.GetRotation(f),j=this._dvl.Camera.GetProjection(f);return i[0]===90&&i[1]===-90&&i[2]===0&&j===sap.ve.dvl.DVLCAMERAPROJECTION.ORTHOGRAPHIC;};t.prototype._initializeSmart2DHandler=function(){if(this._viewStateManager){if(this._smart2DHandler){this._loco.removeHandler(this._smart2DHandler);}this._smart2DHandler=new h(this,this._viewStateManager);this._loco.addHandler(this._smart2DHandler,0);}if(this.getShowAllHotspots()){var f=this._viewStateManager.getNodeHierarchy(),i=f.getHotspotNodeIds();this.showHotspots(i,true);}};t.prototype._fireUrlClicked=function(f){this.fireUrlClicked({url:f.url,nodeRef:f.nodeId});};t.prototype.setHotspotColorABGR=function(f){this.setProperty("hotspotColorABGR",f,true);this.setProperty("hotspotColor",d(a(this.getProperty("hotspotColorABGR"))),true);return this;};t.prototype.setHotspotColor=function(f){this.setProperty("hotspotColor",f,true);this.setProperty("hotspotColorABGR",c(e(this.getProperty("hotspotColor"))),true);return this;};t.prototype._getStepAndProcedureIndexes=function(f,m){var x=-1,y=-1,K=false;for(var i=0;i<f.length;i++){if(!K){for(var j=0;j<f[i].steps.length;j++){if(f[i].steps[j].id===m){y=j;x=i;K=true;break;}}}else{break;}}return{stepIndex:y,procedureIndex:x};};t.prototype._getStepVeIdById=function(f){if(f){var i=this._dvl.Scene.RetrieveVEIDs(this._dvlSceneRef,f);if(Array.isArray(i)){for(var j=0,m=i.length;j<m;++j){var x=i[j];if(x.source==="SAP"&&x.type==="VE_VIEWPORT"&&Array.isArray(x.fields)){for(var y=0,K=x.fields.length;y<K;++y){var N=x.fields[y];if(N.name==="ID"){return N.value;}}}}}}return null;};t.prototype._getStepIdByVeId=function(f,i){for(var j=0,m=f.length;j<m;++j){var x=f[j].steps;for(var y=0,K=x.length;y<K;++y){var N=x[y].id;if(this._getStepVeIdById(N)===i){return N;}}}return null;};var w=function(f){f.camera={};};var z=function(f){if(typeof f.camera==="object"&&f.camera!==null){f.camera.matrices=false;}};var A=function(f){if(typeof f.camera==="object"&&f.camera!==null){f.camera.useTransitionCamera=false;}};var B=function(f){f.animation=true;};var D=function(f){f.visibility=false;};var E=function(f){if(typeof f.visibility==="object"&&f.visibility!==null){f.visibility.mode=l.Complete;}};t.prototype.getViewInfo=function(f){if(!this._dvlSceneRef){return null;}var i={};if(typeof f!=="object"||f===null){w(i);z(i);A(i);B(i);D(i);E(i);}else{if(typeof f.camera==="object"&&f.camera!==null){i.camera={};if(typeof f.camera.matrices==="boolean"){i.camera.matrices=f.camera.matrices;}else if("matrices"in f.camera){i.camera.matrices=false;}else{z(i);}if(typeof f.camera.useTransitionCamera==="boolean"){i.camera.useTransitionCamera=f.camera.useTransitionCamera;}else if("useTransitionCamera"in f.camera){i.camera.useTransitionCamera=false;}else{A(i);}}else if(typeof f.camera==="boolean"){if(f.camera===true){i.camera={};z(i);A(i);}else{i.camera=false;}}else if("camera"in f){i.camera=false;}else{w(i);z(i);A(i);}if(typeof f.animation==="boolean"){i.animation=f.animation;}else if("animation"in f){i.animation=false;}else{B(i);}if(typeof f.visibility==="object"&&f.visibility!==null){i.visibility={};if(f.visibility.mode===l.Complete||f.visibility.mode===l.Differences){i.visibility.mode=f.visibility.mode;}else{E(i);}}else if(typeof f.visibility==="boolean"){if(f.visibility===true){i.visibility={};E(i);}else{i.visibility=false;}}else if("visibility"in f){i.visibility=false;}else{D(i);E(i);}}var j={};if(i.camera){var m=null;if(i.camera.useTransitionCamera){m=this._dvl.Renderer.GetTransitionCamera(this._dvlRendererId);if(m===sap.ve.dvl.DVLID_INVALID){m=null;}}if(m===null){m=this._dvl.Renderer.GetCurrentCamera(this._dvlRendererId);}var x=this._dvl.Camera.GetRotation(m),y=this._dvl.Camera.GetOrigin(m);j.camera={rotation:{yaw:x[0],pitch:x[1],roll:x[2]},position:{x:y[0],y:y[1],z:y[2]},projectionType:r.encodedProjectionType[this._dvl.Camera.GetProjection(m)],bindingType:r.encodedBindingType[this._dvl.Camera.GetFOVBinding(m)]};if(this._matView){j.viewMatrix=this._matView.slice();}if(this._matProj){j.projectionMatrix=this._matProj.slice();}if(j.camera.projectionType===b.Perspective){j.camera.fieldOfView=this._dvl.Camera.GetFOV(m);}else if(j.camera.projectionType===b.Orthographic){j.camera.zoomFactor=this._dvl.Camera.GetOrthoZoomFactor(m);}if(i.camera.matrices){var K=this._dvl.Renderer.GetCameraMatrices(this._dvlRendererId);j.camera.matrices={view:K.view,projection:K.projection};}}if(i.animation){var N=this._dvl.Scene.RetrieveSceneInfo(this._dvlSceneRef,sap.ve.dvl.DVLSCENEINFO.DVLSCENEINFO_STEP_INFO),P=N.StepId!==sap.ve.dvl.DVLID_INVALID;var Q=P?N.StepId:this._lastPlayedStep,T=P?N.StepTime:0,U=this._dvl.Scene.RetrieveProcedures(this._dvlSceneRef),W=this._getStepAndProcedureIndexes(U.procedures,Q),X=this._getStepVeIdById(Q);j.animation={animationTime:T,stepIndex:W.stepIndex,procedureIndex:W.procedureIndex};if(X){j.animation.stepVeId=X;}}if(i.visibility&&this._viewStateManager){j.visibility={mode:i.visibility.mode};if(i.visibility.mode===l.Complete){var Y=this._viewStateManager.getVisibilityComplete();j.visibility.visible=Y.visible;j.visibility.hidden=Y.hidden;}else if(this._viewStateManager.getShouldTrackVisibilityChanges()){j.visibility.changes=this._viewStateManager.getVisibilityChanges();}else{q.warning(g().getText(M.VIT32.summary),M.VIT32.code,"sap.ui.vk.dvl.Viewport");}}return j;};t.prototype.setViewInfo=function(f,i){var j=false;if(f.animation){var m=this._dvl.Scene.RetrieveProcedures(this._dvlSceneRef),x=f.animation.procedureIndex,y=f.animation.stepIndex,K=f.animation.stepVeId,N,P=f.animation.animationTime||0;if(K||y>=0&&x>=0){if(K){N=this._getStepIdByVeId(m.procedures,f.animation.stepVeId);}else if(x>=0&&x<m.procedures.length){if(y>=0&&y<m.procedures[x].steps.length){N=m.procedures[x].steps[y].id;}else{q.error(g().getText(M.VIT26.summary),M.VIT26.code,"sap.ui.vk.dvl.Viewport");}}else{q.error(g().getText(M.VIT27.summary),M.VIT27.code,"sap.ui.vk.dvl.Viewport");}if(N){this._dvl.Renderer.ActivateStep(this._dvlRendererId,N,false,false,P);this._dvl.Renderer.PauseCurrentStep(this._dvlRendererId);}}else{j=true;}}if(f.camera){var Q;if(f.camera.projectionType===b.Perspective||f.camera.projectionType===b.Orthographic){Q=r.decodedProjectionType[f.camera.projectionType];}else{q.error(g().getText(M.VIT19.summary),M.VIT19.code,"sap.ui.vk.dvl.Viewport");Q=sap.ve.dvl.DVLCAMERAPROJECTION.PERSPECTIVE;}var T=this._dvl.Scene.CreateCamera(this._dvlSceneRef,Q,sap.ve.dvl.DVLID_INVALID);if(Q===sap.ve.dvl.DVLCAMERAPROJECTION.PERSPECTIVE){this._dvl.Camera.SetFOV(T,f.camera.fieldOfView);}else if(Q===sap.ve.dvl.DVLCAMERAPROJECTION.ORTHOGRAPHIC){this._dvl.Camera.SetOrthoZoomFactor(T,f.camera.zoomFactor);}if(f.camera.position){this._dvl.Camera.SetOrigin(T,f.camera.position.x,f.camera.position.y,f.camera.position.z);}if(f.camera.rotation){this._dvl.Camera.SetRotation(T,f.camera.rotation.yaw,f.camera.rotation.pitch,f.camera.rotation.roll);}if(f.camera.bindingType){var U=r.decodedBindingType[f.camera.bindingType]||sap.ve.dvl.DVLCAMERAFOVBINDING.MIN;this._dvl.Camera.SetFOVBinding(T,U);}i=i||0;this._dvl.Renderer.ActivateCamera(this._dvlRendererId,T,i);this._dvl.Scene.DeleteNode(this._dvlSceneRef,T);}if(f.viewMatrix){this._matView=f.viewMatrix.slice();}if(f.projectionMatrix){this._matProj=f.projectionMatrix.slice();}if(f.visibility){var W=this._viewStateManager.getNodeHierarchy(),X=new Map(),Y=W.findNodesByName();Y.forEach(function(a1){var b1=W.createNodeProxy(a1),c1=jQuery.grep(b1.getVeIds(),function(c1){return c1.type==="VE_LOCATOR";});c1=Array.isArray(c1)&&c1.length>0?c1[0].fields[0].value:null;W.destroyNodeProxy(b1);if(c1){X.set(c1,a1);}});switch(f.visibility.mode){case l.Complete:var $=f.visibility.visible,_=f.visibility.hidden;$.forEach(function(a1){this._viewStateManager.setVisibilityState(X.get(a1),true,false);},this);_.forEach(function(a1){this._viewStateManager.setVisibilityState(X.get(a1),false,false);},this);break;case l.Differences:if(j){this.resetView({camera:false,visibility:true,transition:false});}f.visibility.changes.forEach(function(a1){var b1=X.get(a1);if(b1){this._viewStateManager.setVisibilityState(b1,!this._viewStateManager.getVisibilityState(b1),false);}},this);break;default:q.error(g().getText(M.VIT28.summary),M.VIT28.code,"sap.ui.vk.dvl.Viewport");break;}}return this;};t.prototype.setSelectionRect=function(f){if(!f){this._dvl.Renderer.DrawSelectionRect(0,0,0,0,this._dvlRendererId);}else{this._dvl.Renderer.DrawSelectionRect(f.x1,f.y1,f.x2,f.y2,this._dvlRendererId);}};t.prototype.getOutputSize=function(){var f=this.getViewInfo().camera.bindingType,i=this.getDomRef().getBoundingClientRect(),j=i.width,m=i.height,x;switch(r.decodedBindingType[f]){case sap.ve.dvl.DVLCAMERAFOVBINDING.MIN:x=Math.min(j,m);break;case sap.ve.dvl.DVLCAMERAFOVBINDING.MAX:x=Math.max(j,m);break;case sap.ve.dvl.DVLCAMERAFOVBINDING.HORZ:x=j;break;case sap.ve.dvl.DVLCAMERAFOVBINDING.VERT:x=m;break;default:break;}return{left:(j-x)/2,top:(m-x)/2,sideLength:x};};t.prototype.onBeforeRendering=function(){if(this._resizeListenerId){R.deregister(this._resizeListenerId);this._resizeListenerId=null;}};t.prototype.onAfterRendering=function(){var f=this.getDomRef();if(this._canvas){f.appendChild(this._canvas);}this._resizeListenerId=R.register(this,this._handleResize.bind(this));this._handleResize({size:{width:f.clientWidth,height:f.clientHeight}});};t.prototype._handleResize=function(f){if(this._dvlRendererId&&this._canvas){var i=f.size.width*window.devicePixelRatio;var j=f.size.height*window.devicePixelRatio;if(this._matProj){var m=this._matProj[0];var x=this._matProj[5];var y=Math.max(m,x);if(i>j){m=y*j/i;x=y;}else{m=y;x=y*i/j;}this._matProj[8]*=m/this._matProj[0];this._matProj[9]*=x/this._matProj[5];this._matProj[0]=m;this._matProj[5]=x;}var K=96*window.devicePixelRatio;var N=this.getAggregation("outputSettings");this._gestureRatio=1.0;if(this.getKeepOutputSize()&&N&&N.getDpi()>0){var P=N.getWidth()/25.4*K;var Q=N.getHeight()/25.4*K;var T=P/i;var U=Q/j;var W=(T>U)?T:U;i*=W;j*=W;this._gestureRatio=W;}this._dvl.Renderer.SetDimensions(i,j,this._dvlRendererId);this._dvl.Renderer.SetOptionF(sap.ve.dvl.DVLRENDEROPTIONF.DVLRENDEROPTIONF_DPI,K,this._dvlRendererId);this._dvl.Renderer.SetOptionF(sap.ve.dvl.DVLRENDEROPTIONF.DVLRENDEROPTIONF_MIN_VISIBLE_OBJECT_SIZE,1,this._dvlRendererId);this._canvas.width=i;this._canvas.height=j;this._canvas.style.width=f.size.width+"px";this._canvas.style.height=f.size.height+"px";this.fireResize({size:{width:f.size.width,height:f.size.height}});return true;}};t.prototype._onVisibilityChanged=t.prototype._onSelectionChanged=t.prototype._onOpacityChanged=t.prototype._onTintColorChanged=function(f){if(this._dvlRendererId){this._dvl.Renderer.ForceRenderFrame(this._dvlRendererId);}};t.prototype.showHotspots=function(f,i,j){var m=sap.ui.vk.dvl.NodeProxy.prototype[typeof j==="string"?"setTintColor":"setTintColorABGR"];var x=function(K,j,T){var U=K.createNodeProxy(T);m.call(U,j);K.destroyNodeProxy(U);};if(!Array.isArray(f)){f=[f];}var y=j===undefined?this.getHotspotColorABGR():j;if(!i){y=0;}var K=this._viewStateManager.getNodeHierarchy();if(this._isSmart2DContent()){var N=[];f.forEach(function(T){var U=n(this._dvl.Scene.RetrieveNodeInfo(this._dvlSceneRef,T,sap.ve.dvl.DVLNODEINFO.DVLNODEINFO_CHILDREN).ChildNodes);Array.prototype.push.apply(N,U);}.bind(this));Array.prototype.push.apply(N,f);N.forEach(x.bind(null,K,y));}else{var P=[];var Q=function(T){var N=K.getChildren(T);Array.prototype.push.apply(P,N);N.forEach(Q);};f.forEach(Q);Array.prototype.push.apply(P,f);P.forEach(x.bind(null,K,y));}return this;};t.prototype._getDecomposedABGR=function(i){return{red:(i>>>0&0xff)/255,green:(i>>>8&0xff)/255,blue:(i>>>16&0xff)/255,alpha:(i>>>24&0xff)/255};};t.prototype._setBackgroundColor=function(){if(this._dvl){var f=this._getDecomposedABGR(this.getBackgroundColorTopABGR()),i=this._getDecomposedABGR(this.getBackgroundColorBottomABGR());this._dvl.Renderer.SetBackgroundColor(f.red,f.green,f.blue,f.alpha,i.red,i.green,i.blue,i.alpha,this._dvlRendererId);}};t.prototype.setBackgroundColorTopABGR=function(i){this.setProperty("backgroundColorTopABGR",i,true);this._setBackgroundColor();return this;};t.prototype.setBackgroundColorTop=function(f){this.setProperty("backgroundColorTop",f,true);return this.setBackgroundColorTopABGR(c(e(f)));};t.prototype.setBackgroundColorBottomABGR=function(i){this.setProperty("backgroundColorBottomABGR",i,true);this._setBackgroundColor();return this;};t.prototype.setBackgroundColorBottom=function(f){this.setProperty("backgroundColorBottom",f,true);return this.setBackgroundColorBottomABGR(c(e(f)));};t.prototype.setKeepOutputSize=function(f){this.setProperty("keepOutputSize",f);this._updateViewportSize();};t.prototype.setOutputSettings=function(f){this.setAggregation("outputSettings",f);this._updateViewportSize();};t.prototype._updateViewportSize=function(){var f=this.getDomRef();if(f){this._handleResize({size:{width:f.clientWidth,height:f.clientHeight}});}};t.prototype.setShouldRenderFrame=function(){if(this._dvlRendererId){this._dvl.Renderer.ForceRenderFrame(this._dvlRendererId);}return this;};t.prototype.shouldRenderFrame=function(){return this._dvlRendererId&&this._dvl.Renderer.ShouldRenderFrame(this._dvlRendererId);};t.prototype.renderFrame=function(){if(this._dvlRendererId){if(this._matView&&this._matProj){this.renderFrameEx(this._matView,this._matProj,this._dvlRendererId);}else{this._dvl.Renderer.RenderFrame(this._dvlRendererId);}}return this;};t.prototype.renderFrameEx=function(f,i){if(this._dvlRendererId){this._dvl.Renderer.RenderFrameEx.apply(this,[].concat(f,i),this._dvlRendererId);}return this;};t.prototype.resetView=function(f){if(f!==undefined&&!jQuery.isPlainObject(f)){q.error(g().getText(M.VIT31.summary),M.VIT31.code,"sap.ui.vk.dvl.Viewport");}var i={camera:true,transition:true,visibility:false};jQuery.extend(i,f);if(i.camera||i.visibility){var j=(i.camera?sap.ve.dvl.DVLRESETVIEWFLAG.CAMERA:0)|(i.transition?sap.ve.dvl.DVLRESETVIEWFLAG.SMOOTHTRANSITION:0)|(i.visibility?sap.ve.dvl.DVLRESETVIEWFLAG.VISIBILITY:0);if(this._dvlRendererId){this._dvl.Renderer.ResetView(j,this._dvlRendererId);this._lastPlayedStep=null;}}return this;};t.prototype.canIsolateNode=function(f){if(this._dvlRendererId){return this._dvl.Renderer.CanIsolateNode(f,this._dvlRendererId);}else{return false;}};t.prototype.setIsolatedNode=function(f){if(this._dvlRendererId){this._dvl.Renderer.SetIsolatedNode(f,this._dvlRendererId);}return this;};t.prototype.getIsolatedNode=function(){if(this._dvlRendererId){return this._dvl.Renderer.GetIsolatedNode(this._dvlRendererId);}else{return sap.ve.dvl.DVLID_INVALID;}};t.prototype.hitTest=function(x,y){if(this._dvlRendererId){var f=this._dvl.Renderer.HitTest(x*window.devicePixelRatio*this._gestureRatio,y*window.devicePixelRatio*this._gestureRatio,this._dvlRendererId).id;this.setShouldRenderFrame();return f;}else{return null;}};t.prototype.setShowDebugInfo=function(f){this.setProperty("showDebugInfo",f,true);if(this._dvlRendererId){this._dvl.Renderer.SetOption(sap.ve.dvl.DVLRENDEROPTION.DVLRENDEROPTION_SHOW_DEBUG_INFO,f,this._dvlRendererId);}return this;};t.prototype._handleFrameFinished=function(f){if(f.rendererId===this._dvlRendererId){this.fireFrameRenderingFinished();}};t.prototype.beginGesture=function(x,y){if(this._dvlRendererId){this._gesturePoint={x:x,y:y};this._dvl.Renderer.BeginGesture(x*window.devicePixelRatio*this._gestureRatio,y*window.devicePixelRatio*this._gestureRatio,this._dvlRendererId);}return this;};t.prototype.endGesture=function(){if(this._dvlRendererId){this._dvl.Renderer.EndGesture(this._dvlRendererId);}return this;};t.prototype._activateRedline=function(){this.renderFrame();var m=this._dvl.Renderer.GetCameraMatrices();this._matView=m.view;this._matProj=m.projection;};t.prototype._deactivateRedline=function(){this._matView=null;this._matProj=null;};t.prototype.pan=function(f,i){if(this._dvlRendererId&&!this.getFreezeCamera()){if(this._matProj){var j=this.getDomRef();this._matProj[8]-=f*2/j.clientWidth;this._matProj[9]+=i*2/j.clientHeight;this.setShouldRenderFrame();}else{this._dvl.Renderer.Pan(f*window.devicePixelRatio*this._gestureRatio,i*window.devicePixelRatio*this._gestureRatio,this._dvlRendererId);}this.firePan({dx:f,dy:i});}return this;};t.prototype.rotate=function(f,i){if(this._dvlRendererId&&!this.getFreezeCamera()){this._dvl.Renderer.Rotate(f*window.devicePixelRatio*this._gestureRatio,i*window.devicePixelRatio*this._gestureRatio,this._dvlRendererId);this.fireRotate({dx:f,dy:i});}return this;};function F(f){var m=f;var i=m[15]===1;var j=2/m[0];var x=2/m[5];var y,K;if(i){y=-m[12]*j;K=-m[13]*x;}else{y=m[8]*j;K=m[9]*x;}var N=(j+y)*0.5;var P=y-N;var Q=(x+K)*0.5;var T=K-Q;return{left:P,top:Q,right:N,bottom:T};}function G(f,i){var m=f;var j=m[15]===1;m[0]=2/(i.right-i.left);m[5]=2/(i.top-i.bottom);if(j){m[12]=-(i.right+i.left)/(i.right-i.left);m[13]=-(i.top+i.bottom)/(i.top-i.bottom);}else{m[8]=(i.right+i.left)/(i.right-i.left);m[9]=(i.top+i.bottom)/(i.top-i.bottom);}}t.prototype.zoom=function(i){if(this._dvlRendererId&&!this.getFreezeCamera()){if(this._matProj){var j=this.getDomRef();var m=F(this._matProj);var x=m.left+(m.right-m.left)*this._gesturePoint.x/j.clientWidth;var y=m.top+(m.bottom-m.top)*this._gesturePoint.y/j.clientHeight;var f=1/i;m.left=x+(m.left-x)*f;m.right=x+(m.right-x)*f;m.top=y+(m.top-y)*f;m.bottom=y+(m.bottom-y)*f;G(this._matProj,m);this.setShouldRenderFrame();}else{this._dvl.Renderer.Zoom(i,this._dvlRendererId);}this.fireZoom({zoomFactor:i});}return this;};t.prototype.zoomTo=function(f,j,m,x){if(this._dvlRendererId){var y=0;if(Array.isArray(f)){for(var i in f){y|=r.decodedZoomTo[f[i]];}}else{y=r.decodedZoomTo[f];}this._dvl.Renderer.ZoomTo(y,j,m,x,this._dvlRendererId);}return this;};t.prototype.tap=function(x,y,i){if(this._dvlRendererId){var f=x*window.devicePixelRatio*this._gestureRatio,j=y*window.devicePixelRatio*this._gestureRatio;if(!i){var m=this.hitTest(x,y);var K={picked:m===sap.ve.dvl.DVLID_INVALID||m==null?[]:[m]};this.fireNodesPicked(K);if(this.getSelectionMode()===S.Exclusive){this.exclusiveSelectionHandler(K.picked);}else if(this.getSelectionMode()===S.Sticky){this.stickySelectionHandler(K.picked);}if(m!==sap.ve.dvl.DVLID_INVALID){this.fireNodeClicked({nodeRef:m,nodeId:m,x:x,y:y},true,true);}this._dvl.Renderer.Tap(f,j,false,false,this._dvlRendererId);}else if(!this.getFreezeCamera()){this._dvl.Renderer.Tap(f,j,true,false,this._dvlRendererId);}}return this;};t.prototype.rectSelect=function(x,y,f,i){var j=[];if(this._dvlRendererId){var m=n(this._dvl.Renderer.RectSelect(x,y,f,i,this._dvlRendererId));if(m.SelectedNodes){j=m.SelectedNodes;}}return j;};t.prototype.queueCommand=function(f){if(this._dvlRendererId){this._dvl.Renderer._queueCommand(f,this._dvlRendererId);}return this;};t.prototype._setContent=function(f){var i=null;if(f&&f instanceof o){i=f;}this._setScene(i);return this;};t.prototype._setScene=function(f){var i=f&&f.getGraphicsCore();this.setGraphicsCore(i);this.setScene(f);if(f&&(this._isSmart2DContent()||this._isSmart2DContentLegacy())){this._initializeSmart2DHandler();}};t.prototype.onSetContentConnector=function(f){V.prototype.onSetContentConnector.call(this,f);f.attachContentChangesFinished(this._onContentChangesFinished,this);};t.prototype.onUnsetContentConnector=function(f){f.detachContentChangesFinished(this._onContentChangesFinished,this);V.prototype.onUnsetContentConnector.call(this,f);};t.prototype._onContentChangesFinished=function(f){if(f.getSource().getContentResources().length>1){this.zoomTo(Z.Visible,sap.ve.dvl.DVLID_INVALID,0,0);}this.setShouldRenderFrame();};t.prototype.onSetViewStateManager=function(f){this._viewStateManager=f;f.attachOpacityChanged(this._onOpacityChanged,this);f.attachSelectionChanged(this._onSelectionChanged,this);f.attachTintColorChanged(this._onTintColorChanged,this);f.attachVisibilityChanged(this._onVisibilityChanged,this);if(this._dvl){this._dvl.Renderer.SetViewStateManager(f,this._dvlRendererId);if(this._isSmart2DContent()||this._isSmart2DContentLegacy()){this._initializeSmart2DHandler();}}};t.prototype.onUnsetViewStateManager=function(f){if(this._dvl){this._dvl.Renderer.SetViewStateManager(null,this._dvlRendererId);}f.detachOpacityChanged(this._onOpacityChanged,this);f.detachSelectionChanged(this._onSelectionChanged,this);f.detachTintColorChanged(this._onTintColorChanged,this);f.detachVisibilityChanged(this._onVisibilityChanged,this);this._viewStateManager=null;};var H={x:-2,y:-2};var I=2;var J=5;[{key:"left",dx:-I,dy:0},{key:"right",dx:+I,dy:0},{key:"up",dx:0,dy:-I},{key:"down",dx:0,dy:+I}].forEach(function(i){t.prototype["onsap"+i.key]=function(f){this.beginGesture(H.x,H.y);this.rotate(i.dx,i.dy);this.endGesture();this.setShouldRenderFrame();f.preventDefault();f.stopPropagation();};});[{key:"left",dx:-J,dy:0},{key:"right",dx:+J,dy:0},{key:"up",dx:0,dy:-J},{key:"down",dx:0,dy:+J}].forEach(function(i){t.prototype["onsap"+i.key+"modifiers"]=function(f){if(f.shiftKey&&!(f.ctrlKey||f.altKey||f.metaKey)){this.beginGesture(H.x,H.y);this.pan(i.dx,i.dy);this.endGesture();this.setShouldRenderFrame();f.preventDefault();f.stopPropagation();}};});[{key:"minus",d:0.98},{key:"plus",d:1.02}].forEach(function(i){t.prototype["onsap"+i.key]=function(f){this.beginGesture(this.$().width()/2,this.$().height()/2);this.zoom(i.d);this.endGesture();this.setShouldRenderFrame();f.preventDefault();f.stopPropagation();};});return t;});
