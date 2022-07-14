/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","./Element","./Ellipse","./Rectangle","./Line","./Polyline","./Path","./Text","./Image","./LinearGradient","./OrthographicCamera","../View","../NodeContentType","../TransformationMatrix","../getResourceBundle","../totara/TotaraUtils"],function(L,E,a,R,b,P,c,T,I,d,O,V,N,f,g,h){"use strict";var S=function(r,e,i,j){this._rootNode=r;this._contentResource=e;this._resolve=i;this._reject=j;this._cameras=new Map();this._sceneIdTreeNodesMap=new Map();this._sceneIdRootNodeMap=new Map();this._materialMap=new Map();this._annotationsMap=new Map();this._annotationNodesMap=new Map();this._materialNodesMap=new Map();this._nodes=new Map();this._viewGroups=new Map();this._views=new Map();this._viewThumbnails=new Map();this._parametrics=new Map();this._geometries=new Map();this._geometryMeshes=new Map();this._meshNodes=new Map();this._meshSubmeshes=new Map();this._images=new Map();this._imageTextures=new Map();this._fillStyles=new Map();this._lineStyles=new Map();this._textStyles=new Map();this._joints=new Map();this._yIndex=1;this._detailsByImageId=new Map();this._materialsByTextureImageId=new Map();if(e){var l=e.getNodeProxy();var m=l.getNodeHierarchy();this._vkScene=m.getScene();var s=e.getSource();if(s&&s.name){this._sceneIdTreeNodesMap.set(s.name,this._nodes);this._sceneIdRootNodeMap.set(s.name,r);this._currentSceneId=s.name;}if(this._rootNode){this._rootNode.userData.skipIt=!e.name;}}};S.prototype.setScene=function(i){if(i.result!==1){var e={status:i.result};switch(i.result){case-1:e.errorText=g().getText("LOADER_FILENOTFOUND");break;case-2:e.errorText=g().getText("LOADER_WRONGFILEFORMAT");break;case-3:e.errorText=g().getText("LOADER_WRONGPASSWORD");break;case-4:e.errorText=g().getText("LOADER_ERRORREADINGFILE");break;case-5:e.errorText=g().getText("LOADER_FILECONTENT");break;default:e.errorText=g().getText("LOADER_UNKNOWNERROR");}this._reject(e);}else{this._yIndex=1;this._rootNode.matrix[3]=i.upAxis===2?-1:1;var j=this._cameras.get(i.cameraId);L.info("setScene",JSON.stringify(i),j);this._resolve({node:this._rootNode,camera:j,backgroundTopColor:i.backgroundTopColor,backgroundBottomColor:i.backgroundBottomColor,contentResource:this._contentResource,builder:this});}};S.prototype.setRootNode=function(r,e,s,v){this._rootNode=r;r.sid=e;this._nodes.set(e,r);this._viewGroups=new Map();this._views=new Map();if(s){this._sceneIdTreeNodesMap.set(s,this._nodes);this._sceneIdRootNodeMap.set(s,r);this._currentSceneId=s;}if(v){this._vkScene=v;}return this;};S.prototype.setNodePersistentId=function(e,i,s){this._resetCurrentScene(s);e.sid=i;this._nodes.set(i,e);return true;};S.prototype.cleanup=function(){this._rootNode=null;this._currentSceneId=null;if(this._nodes){this._nodes.clear();}if(this._viewGroups){this._viewGroups.clear();}if(this._views){this._views.clear();}this._materialMap.clear();this._annotationsMap.clear();this._annotationNodesMap.clear();this._materialNodesMap.clear();this._sceneIdTreeNodesMap.clear();this._sceneIdRootNodeMap.clear();this._detailsByImageId.clear();this._materialsByTextureImageId.clear();this._fillStyles.clear();this._lineStyles.clear();this._textStyles.clear();};S.prototype.getNode=function(e,s){if(s){this._resetCurrentScene(s);if(this._nodes){return this._nodes.get(e);}}else{var i=this._sceneIdTreeNodesMap.values();var j=i.next();while(!j.done){var l=j.value.get(e);if(l){return l;}j=i.next();}}return null;};S.prototype._resetCurrentScene=function(s){if(s&&s!==this._currentSceneId){var e=this._sceneIdTreeNodesMap.get(s);if(e){this._nodes=e;}else{this._nodes=new Map();}var i=this._sceneIdRootNodeMap.get(s);if(i){this._rootNode=i;}else{this._rootNode=null;}this._currentSceneId=s;}};S.prototype.createCamera=function(e,s){this._resetCurrentScene(s);var i=new O();i.setUpDirection(Array.isArray(e.up)?e.up:[0,1,0]);i.setZoomFactor(e.zoom);i.setPosition(e.origin);this._cameras.set(e.id,i);return i;};S.prototype.getCamera=function(e){return this._cameras.get(e);};S.prototype.hasMesh=function(m){return this._meshSubmeshes.has(m);};S.prototype.hasImage=function(i){return this._images.has(i);};function k(l){if(Array.isArray(l)){for(var i=0;i<l.length;i++){if(l[i].type===undefined||l[i].type==="mesh"||l[i].type==="line"){return l[i];}}}return null;}S.prototype.setMeshNode=function(e,m){this._setMeshNode(this._nodes.get(e),m);};S.prototype.setModelViewVisibilitySet=function(){};S.prototype.setAnimationPlaybacks=function(){};S.prototype.loadingFinished=function(i){L.info("loadingFinished",JSON.stringify(i));this._loader.fireContentLoadingFinished({source:this._contentResource,node:this._rootNode});};S.prototype.createThumbnail=function(i){var v=this._viewThumbnails.get(i.imageId);if(v){v.thumbnailData="data:image/"+"jpeg"+";base64,"+window.btoa(String.fromCharCode.apply(null,i.data));if(this._fireThumbnailLoaded){this._fireThumbnailLoaded({modelView:v});}}};S.prototype.insertSubmesh=function(s){if(!s.lods){return false;}var l=k(s.lods);if(!l){return false;}s.boundingBox=l.boundingBox;var e=this._geometries.get(l.id);if(e){var i=this._meshNodes.get(s.meshId);if(i){for(var j=0;j<i.length;j++){this._addGeometryToNode(i[j],e,s);}}}else{h.pushElementIntoMapArray(this._geometryMeshes,l.id,s);}h.pushElementIntoMapArray(this._meshSubmeshes,s.meshId,s);};S.prototype.getViewGroup=function(v,s){this._resetCurrentScene(s);var e=this._viewGroups.get(v);var i=[];if(e&&e.views){for(var j=0;j<e.views.length;j++){var l=e.views[j].id;var m=this._views.get(l);if(m){i.push(m);}}}return i;};S.prototype.insertViewGroup=function(i,s){this._resetCurrentScene(s);var v=this._viewGroups.get(i.id);if(!v){v=this._vkScene.createViewGroup({viewGroupId:i.id,name:i.name,description:i.description});this._viewGroups.set(i.id,v);}else{v.setViewGroupId(i.id);v.setName(i.name);v.setDescription(i.description);}v.type=i.type;v.metadata=i.metadata;v.veids=i.veids;v.views=i.views;v.sceneId=i.sceneId;return this;};S.prototype.insertView=function(v,s){this._resetCurrentScene(s);var e=this._vkScene.createView({viewId:v.viewId,name:v.name,description:v.description?"<pre style=\"white-space: pre-wrap;\">"+v.description+"</pre>":v.description,aspectRatio:v.safeAreaAspectRatio});e.userData={viewInfo:v};if(v.thumbnailId){var i=this._images.get(v.thumbnailId);if(i){e.thumbnailData=i;}else{this._viewThumbnails.set(v.thumbnailId,e);}}if(v.cameraId){e.setCamera(this._cameras.get(v.cameraId));}e.type=v.type;e.flyToTime=v.flyToTime;e.preDelay=v.preDelay;e.postDelay=v.postDelay;e.navigationMode=v.navigationMode;e.topColor=v.topColour;e.bottomColor=v.bottomColour;e.dimension=v.dimension;e.query=v.query;e.metadata=v.metadata;e.veids=v.veids;e.viewGroupId=v.viewGroupId;e.id=v.viewId;this._views.set(v.viewId,e);if(e.viewGroupId){var j=this._viewGroups.get(e.viewGroupId);if(j){j.addView(e);}}return this;};S.prototype.getView=function(v,s){this._resetCurrentScene(s);return this._views.get(v);};S.prototype.setViewCamera=function(e,v,s){this._resetCurrentScene(s);var i=this._cameras.get(e);var j=this._views.get(v);if(i&&j){j.setCamera(i);}return this;};S.prototype.getChildNodeIds=function(e,s,j){this._resetCurrentScene(s);var l=this._nodes.get(e);var m=[];if(!l){return m;}if(l&&l.children){for(var i=0;i<l.children.length;i++){var p=l.children[i];if(p.userData.treeNode&&p.userData.treeNode.sid){m.push(p.userData.treeNode.sid);}else if(j&&p.userData.submeshInfo&&p.userData.submeshInfo.id){m.push(p.userData.submeshInfo.id);}}}return m;};S.prototype.setViewNodeInfos=function(e,v,s){this._resetCurrentScene(s);var i=this._views.get(v);i.setNodeInfos(e);return this;};S.prototype.finalizeViewGroups=function(s){this._resetCurrentScene(s);var e=this._viewGroups.entries();var i=e.next();while(!i.done){var v=i.value[1];var j=i.value[0];if(!v||!v.views||!v.views.length){i=e.next();continue;}v.removeViews();for(var l=0;l<v.views.length;l++){var m=v.views[l].id;var p=this._views.get(m);if(p&&p.userData.viewInfo.thumbnailId&&!p.thumbnailData){var q=this._images.get(p.userData.viewInfo.thumbnailId);if(q){p.thumbnailData=q;}}if(p){p.viewGroupId=j;v.addView(p);}}i=e.next();}return this;};S.prototype.setVoxelThreshold=function(v){return this;};S.prototype.getVoxelThreshold=function(){return 0.0;};S.prototype.createNode=function(e,s){this._resetCurrentScene(s);var t=e.transform;var i=new E({sid:e.sid,name:e.name,matrix:f.convertTo3x2(t)});this._nodes.set(e.sid,i);var j=i.userData;if(e.metadata){j.metadata=e.metadata;}if(e.veids){j.veids=e.veids;}if(e.parametricId){j.parametricId=e.parametricId;var p=this._parametrics.get(e.parametricId);if(p){this.setParametricContent(e.sid,p,s);}}else if(e.meshId){this._setMeshNode(i,e.meshId);}j.treeNode=e;i.setVisible(1,e.visible?e.visible:true);if(e.visualisable===false){j.skipIt=true;}if(e.joints){e.joints.forEach(function(q){var m=this._nodes.get(q.parentSid);if(m){m.userData.jointNodes=m.userData.jointNodes||[];m.userData.jointNodes.push(i);}else{h.pushElementIntoMapArray(this._joints,q.parentSid,i);}},this);}var l=this._joints.get(e.sid);if(l){j.jointNodes=j.jointNodes?j.jointNodes.concat(l):l;}if(e.viewBox){j.viewBox=e.viewBox;}var m=this._nodes.get(e.parentId);(m||this._rootNode).add(i);if(e.contentType==="HOTSPOT"){i._vkSetNodeContentType(N.Hotspot);}else if(e.contentType==="ANNOTATION"){i._vkSetNodeContentType(N.Annotation);}return i;};S.prototype.preferMeshes=function(){return false;};S.prototype.createAnnotation=function(e,s){h.pushElementIntoMapArray(this._annotationNodesMap,e.annotationId,e.nodeId);var i=this.getAnnotation(e.annotationId);if(i){this.createImageNote(i,s);}};S.prototype.remove=function(e,s){this._resetCurrentScene(s);var t=this;e=[].concat(e);e.forEach(function(j){var l=t._nodes.get(j);if(l){t._nodes.delete(j);for(var i=0;i<l.children.length;i++){var m=l.children[i];if(m.userData&&m.userData.treeNode&&m.userData.treeNode.sid){t.remove(m.userData.treeNode.sid,s);}}}});return this;};S.prototype._addPolylineSegment=function(s,e,p){var j=e.length;if(j<2){return;}var m=[];var q=e[0]===e[j-1];if(q){j--;}for(var i=0,l=e.length;i<l;i++){var r=e[i]*3;m.push(p[r],p[r+this._yIndex]);}s.push({type:"polyline",points:m,closed:q});};S.prototype._addGeometryToNode=function(e,j,s){var m=s.materialId;var p=this._getMaterial(m);var q=j.data;var r=q.indices;var t=q.points;var v=new Float32Array([1,0,0,1,0,0]);if(j.isPositionQuantized&&s.boundingBox){}if(s.transform){}var i,w,x,y;var l=r.length;var z=[];if(j.isPolyline){p=Object.assign(Object.assign({},p),{color:[0,0,0,0]});var A=[];for(i=0,w=-1;i<l;i+=2,w=y){x=r[i];y=r[i+1];if(x!==w){this._addPolylineSegment(z,A,t);A.length=0;A.push(x);}A.push(y);}this._addPolylineSegment(z,A,t);}else{p=Object.assign(Object.assign({},p),{lineColor:[0,0,0,0],lineWidth:0});var B=[];for(i=0;i<l;i+=3){w=r[i]*3;x=r[i+1]*3;y=r[i+2]*3;B.push(t[w],t[w+this._yIndex],t[x],t[x+this._yIndex],t[y],t[y+this._yIndex]);}z.push({type:"mesh",points:B});}var C=new c({segments:z,isTriangleMesh:!j.isPolyline,matrix:v,material:p,materialID:m,fillStyle:j.isPolyline?null:{colour:p.color},subelement:true});C.uid+="-g";e.add(C);h.pushElementIntoMapArray(this._materialNodesMap,m,C);};S.prototype.setGeometry=function(e){this._geometries.set(e.id,e);var i=this._geometryMeshes.get(e.id);if(i){for(var m=0;m<i.length;m++){var s=i[m];var j=this._meshNodes.get(s.meshId);if(j){for(var l=0;l<j.length;l++){this._addGeometryToNode(j[l],e,s);}}}}if(this._fireSceneUpdated){this._fireSceneUpdated();}return this;};S.prototype._setMeshNode=function(e,m){h.pushElementIntoMapArray(this._meshNodes,m,e);var s=this._meshSubmeshes.get(m);if(s){for(var i=0;i<s.length;i++){var j=s[i];var l=k(j.lods);if(l){var p=this._geometries.get(l.id);if(p){this._addGeometryToNode(e,p,j);}}}}};function n(s){var m=new Float32Array([1,0,0,1,0,0]);if(s.t){m[4]=s.t[0];m[5]=s.t[1];}if(s.r){var x=s.r[0],y=s.r[1],z=s.r[2],w=s.r[3];var e=x*y;var i=z*z;var j=w*z;m[0]=1-(y*y+i)*2;m[1]=(e+j)*2;m[2]=(e-j)*2;m[3]=1-(x*x+i)*2;}if(s.s){m[0]*=s.s[0];m[1]*=s.s[0];m[2]*=s.s[1];m[3]*=s.s[1];}return m;}function o(s){var e=[];var m;function j(){if(e.length>0){e.forEach(function(v){var t=v.points;if(t&&t.length>=4&&t[0]===t[t.length-2]&&t[1]===t[t.length-1]){v.closed=true;t.length-=2;}});s.push({type:"path",segments:e,materialID:m});e=[];}}var l;var i=0;while(i<s.length){var p=s[i];if(p.type==="line"){if(m!==p.materialID){j();m=p.materialID;}l=n(p);var x=p.x1*l[0]+p.y1*l[2]+l[4];var y=p.x1*l[1]+p.y1*l[3]+l[5];var q=p.x2*l[0]+p.y2*l[2]+l[4];var r=p.x2*l[1]+p.y2*l[3]+l[5];var t=e.length>0?e[e.length-1].points:null;if(t&&t[t.length-2]===x&&t[t.length-1]===y){t.push(q,r);}else{e.push({type:"polyline",points:[x,y,q,r]});}s.shift();}else{i++;}}j();}S.prototype.setParametricContent=function(e,p,s){if(p==null){L.warning("Empty parametric content for node "+e);return;}this._parametrics.set(p.id,p);this._resetCurrentScene(s);var j=this._nodes.get(e);j.uid+="-p";var l=p.shapes;if(l){o(l);for(var i=0;i<l.length;i++){this._createObject(l[i],j);}}else{this._createObject(p,j);}};S.prototype._createObject=function(p,e){p.matrix=n(p);p.subelement=true;if(p.materialID){p.material=this._getMaterial(p.materialID);}if(this._lineStyles&&p.stroke_id!==undefined){p.lineStyle=this._lineStyles.get(p.stroke_id);}if(this._fillStyles&&p.fill_id!==undefined){p.fillStyle=this._fillStyles.get(p.fill_id);if(p.fillStyle.gradient){var i=new d(p.fillStyle);p.fillStyle.fillURL="url(#"+i.uid+")";e.add(i);}}if(this._textStyles&&p.style_id!==undefined){p.style=this._textStyles.get(p.style_id);p.textStyles=this._textStyles;}var s;switch(p.type){case"arc":case"ellipticalArc":p.segments=[{type:"arc",cx:p.cx||0,cy:p.cy||0,rx:p.major||p.radius,ry:p.minor||p.radius,start:p.start>p.end?p.start-Math.PI*2:p.start,end:p.end}];s=new c(p);break;case"rectangle":s=new R(p);break;case"line":s=new b(p);break;case"polyline":s=new P(p);break;case"ellipse":case"circle":s=new a(p);break;case"text":if(this._rootNode.matrix[3]<0){p.matrix[2]*=-1;p.matrix[3]*=-1;}s=new T(p);break;case"path":s=new c(p);break;default:L.warning("Unsupported parametric type",p.type);s=null;break;}if(s){s.userData.po=p;s.uid+="-s";if(p.materialID){h.pushElementIntoMapArray(this._materialNodesMap,p.materialID,s);}e.add(s);}};S.prototype.createImageNote=function(e,s){this._resetCurrentScene(s);if(e.type==="image"){var m=e.label.materialId;if(!m){return;}var i=this._getMaterial(m);this._annotationsMap.set(e.id,e);var l=this._annotationNodesMap.get(e.id)||[];this._annotationNodesMap.delete(e.id);if(e.nodeId){l.push(e.nodeId);}for(var j=0;j<l.length;j++){var p=this._nodes.get(l[j]);if(p){var q=new I({materialID:m,material:i,subelement:true,matrix:[1,0,0,-1,0,0]});p.add(q);h.pushElementIntoMapArray(this._materialNodesMap,m,q);}}}};S.prototype.removeNode=function(e){this._nodes.delete(e.sid);};S.prototype.createMaterial=function(m){var t=[];var e=m.id;var i=this._getMaterial(e);i.lineColor=m.lineColour;i.lineWidth=m.lineWidth||1;i.lineStyle={width:m.lineWidth||1,haloWidth:m.lineHaloWidth||0,endCapStyle:m.lineEndRound?1:0,dashPattern:m.lineDashPattern||[],dashPatternScale:m.lineDashPatternScale,widthCoordinateSpace:m.lineWidthCoordinateSpace};if(m.emissiveColour){i.color=m.emissiveColour;}if(m.opacity!==undefined){i.opacity=m.opacity;}if(m.textureEmissive&&m.textureEmissive.length&&m.textureEmissive[0].imageId){var l=m.textureEmissive[0].imageId;if(this._images.has(l)){i.texture=this._images.get(l);}else{var p={imageId:m.textureEmissive[0].imageId};t.push(p);h.pushElementIntoMapArray(this._imageTextures,l,{materialId:e});if(!i.userData){i.userData={};}i.userData.imageIdsToLoad=new Set();i.userData.imageIdsToLoad.add(p.imageId);}if(this._detailsByImageId.has(l)){var q=this._images.get(l);i.textureHeight=q.height;i.textureWidth=q.width;}else{if(!i.userData){i.userData={};}i.userData.imageDetailsToLoad=new Set();i.userData.imageDetailsToLoad.add(l);}h.pushElementIntoMapArray(this._materialsByTextureImageId,l,{materialId:e});}var r=this._materialNodesMap.get(e);if(r){for(var j=0;j<r.length;j++){r[j].setMaterial(i,true);}}return t;};S.prototype._getMaterial=function(m){return this._materialMap.get(m)||this._createTemporaryMaterial(m);};S.prototype._createTemporaryMaterial=function(m){var e={materialId:m,lineColor:[0,0,0,1],lineWidth:1};this._materialMap.set(m,e);return e;};S.prototype.checkMaterialExists=function(m,t){if(!this._materialMap.get(m)){if(t){this._createTemporaryMaterial(m);}return false;}return true;};S.prototype.materialNeeded=function(e){return false;};S.prototype.getAnnotation=function(e){return this._annotationsMap.get(e);};S.prototype.updateViewsForReplacedNodes=function(e){};S.prototype.insertFillStyle=function(e){this._fillStyles.set(e.veid,e);};S.prototype.insertLineStyle=function(l){this._lineStyles.set(l.veid,l);};S.prototype.insertTextStyle=function(t){this._textStyles.set(t.veid,t);};var u=function(i){var j="";try{var C=0x8000;var l=0;var m=i.length;var s;while(l<m){s=i.slice(l,Math.min(l+C,m));j+=String.fromCharCode.apply(null,s);l+=C;}}catch(e){j="";}return j;};S.prototype.createImage=function(i){if(i.binaryData.length<32){L.warning("SceneBuilder.createImage()","Can't create image from empty data");return this;}var e=new DataView(i.binaryData.buffer);var l=true;if(e.getUint8(0,true)===parseInt("0xFF",16)&&e.getUint8(1,true)===parseInt("0xD8",16)){l=false;}var p=u(i.binaryData);var q="data:image/"+(l?"png":"jpeg")+";base64,"+btoa(p);this._images.set(i.id,q);var r=this._imageTextures.get(i.id);if(r&&r.length){this._imageTextures.delete(i.id);r.forEach(function(m){var s=this._getMaterial(m.materialId);s.texture=q;if(s.userData&&s.userData.imageIdsToLoad&&s.userData.imageIdsToLoad.size){s.userData.imageIdsToLoad.delete(i.id);}var t=this._materialNodesMap.get(m.materialId);if(t){for(var j=0;j<t.length;j++){t[j].setMaterial(s,true);}}}.bind(this));}return this;};S.prototype.setViewThumbnail=function(i,v,s,t){this._resetCurrentScene(s);var e=this._views.get(v);var j=this._images.get(i);if(e&&j){if(e.userData!==undefined){if(e.userData.viewInfo.thumbnailId===i){e.thumbnailData=j;}}}return this;};S.prototype.setImageDetails=function(e){this._detailsByImageId.set(e.id,e);var m=this._materialsByTextureImageId.get(e.id);if(m){for(var i=0;i<m.length;i++){var l=this._materialMap.get(m[i].materialId);if(l.userData&&l.userData.imageDetailsToLoad&&l.userData.imageDetailsToLoad.size){l.userData.imageDetailsToLoad.delete(e.id);}l.textureHeight=e.height;l.textureWidth=e.width;var p=this._materialNodesMap.get(m[i].materialId);if(p){for(var j=0;j<p.length;j++){p[j].setMaterial(l,true);}}}}return this;};return S;});
