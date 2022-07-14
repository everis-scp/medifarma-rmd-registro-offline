/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2012 SAP AG. All rights reserved
 */
sap.ui.define(["sap/ui/base/Object","./Utilities","./thirdparty/three","./thirdparty/ColladaLoader","sap/base/Log"],function(B,U,T,C,L){"use strict";var t="sap.ui.vbm.ModelHandler";var a=T.Box3;var M=T.Matrix4;var p=U.propertyAdded;var b=U.propertyChanged;var u=U.updateProperty;var c=U.addRef;var s=U.subRef;var d=B.extend("sap.ui.vbm.adapter3d.ModelHandler",{constructor:function(r,f,g,h){B.call(this);this._resources=r;this._textures=f;this._scene=g;this._root=h;this._root.updateWorldMatrix(false,false);this._hotInstance=null;this._instances=new Map();this._models=new Map();this._meshes=new Map();this._colladaLoader=null;this._glTFLoader=null;}});var e=4000;d.prototype.destroy=function(){this._resources=null;this._textures=null;this._scene=null;this._root=null;this._meshes.forEach(function(m){m.objects3D.forEach(function(o){this._deleteObject3D(o);},this);},this);this._instances.forEach(function(i){if(i.texture){s(i.texture);}});this._models.forEach(function(m,r){this._deleteModel(m);},this);this._meshes.clear();this._instances.clear();this._models.clear();B.prototype.destroy.call(this);};d.prototype.addInstance=function(i){this._instances.set(i,{instance:i,world:new M(),matrices:[],model:null,texture:null,key:null,mesh:null});this.updateInstance(i);};d.prototype.updateInstance=function(i){var f=this._instances.get(i),g=false,h=this._hotInstance&&this._hotInstance===i;if(f){var n=U.toBoolean(i.normalize);if(b(i,"model")){if(!p(i,"model")){this._removeInstanceFromMesh(f);s(f.model);}f.model=this._models.get(i.model);if(!f.model){L.error("Removing broken instance with unknown model",i.model,t);this.removeInstance(i);return;}c(f.model);f.matrices.length=0;g=true;}if(b(i,"texture")){if(!p(i,"texture")){if(f.texture){s(f.texture);f.texture=null;}}if(i.texture){f.texture=this._textures.get(i.texture)||null;if(f.texture){c(f.texture);}else{L.error("Failed to apply texture on model, texture not found",i.texture,t);}}g=true;}if(b(i,["normalize","model"])){this._updateModel(f.model,n);f.matrices.length=0;g=true;}if(b(i,["pos","rot","scale"])){U.getInstanceMatrix(i,f.world,n?f.model.normalized.bbox:f.model.bbox);f.matrices.length=0;g=true;}var k=this._getInstanceKey(i,h);if(!f.key||k!==f.key){this._removeInstanceFromMesh(f);f.key=k;g=true;}u(i,["model","normalize","pos","rot","scale","texture","color","selectColor","hotDeltaColor","VB:s"]);if(f.matrices.length===0){var w=this._root.matrixWorld.clone();w.multiply(f.world);if(n){w.multiply(f.model.normalized.world);}f.model.root.children.forEach(function(j){f.matrices.push(new M().multiplyMatrices(w,j.matrixWorld));});}if(g){this._requestUpdate(f);}}else{L.error("Unable to find model instance data","",t);}};d.prototype.removeInstance=function(i){var f=this._instances.get(i);if(f){if(this._hotInstance===i){this._hotInstance=null;}this._instances.delete(i);this._removeInstanceFromMesh(f);i._last={};if(f.model){s(f.model);}if(f.texture){s(f.texture);}}else{L.error("Unable to find model instance data","",t);}};d.prototype.update=function(){var f=[];this._meshes.forEach(function(g,k){for(var i=0;i<g.length;){if(g[i].dirty){var j,h,l=0,m=g[i];m.objects3D.forEach(function(o){this._deleteObject3D(o);},this);m.objects3D.length=m.hitInfo.length=0;if(m.instances.size){m.model.root.children.forEach(function(n){var o=new T.InstancedMesh(n.geometry,U.cloneMaterials(n.material),m.instances.size);o.matrixAutoUpdate=false;o.layers.set(0);o._instanceHitTest=this._instanceHitTest.bind(m);this._scene.add(o);m.objects3D.push(o);},this);m.instances.forEach(function(v){h=v;m.hitInfo.push(h);for(j=0;j<m.objects3D.length;++j){m.objects3D[j].setMatrixAt(l,h.matrices[j]);}l++;});U.applyColor(h.instance,h.instance.color,m.objects3D,this._hotInstance===h.instance,h.texture);}m.dirty=false;}if(g[i].objects3D.length!==0){i++;}else{g.splice(i,1);}}if(!g.length){f.push(k);}},this);f.forEach(function(k){this._meshes.delete(k);},this);this._models.forEach(function(m,r){if(U.refCountableDispose(m)){this._deleteModel(m);this._models.delete(r);}},this);};d.prototype.updateHotInstance=function(i){var f;if(this._hotInstance){f=this._instances.get(this._hotInstance);f.key=this._getInstanceKey(this._hotInstance,false);this._removeInstanceFromMesh(f);this._requestUpdate(f);}if(i&&i.isModel){f=this._instances.get(i);f.key=this._getInstanceKey(i,true);this._removeInstanceFromMesh(f);this._requestUpdate(f);}this._hotInstance=(i&&i.isModel)?i:null;};d.prototype.addModel=function(i){if(i.isModel&&i.model&&!this._models.has(i.model)){this._models.set(i.model,{root:null,bbox:null,normalized:null});}};d.prototype.loadModels=function(){var f=[];this._models.forEach(function(g,r){if(!g.root){f.push(this._loadModel(r,g));}},this);return Promise.all(f);};d.prototype._loadModel=function(r,f){var g=this;var h=this._resources.get(r);if(!h){L.error("Failed to get model from context",r,t);this._models.delete(r);return Promise.resolve();}return new Promise(function(i,j){if(atob(h.slice(0,6)).startsWith("glTF")){try{g._getGlTFLoader().parse(U.base64ToArrayBuffer(h),"",function(m){g._postprocess(m,f);i();});}catch(k){g._models.delete(r);L.error("Failed to load glb model",r,t);i();}}else{try{g._postprocess(g._getColladaLoader().parse(atob(h)),f);i();}catch(k){try{g._getGlTFLoader().parse(atob(h),"",function(m){g._postprocess(m,f);i();});}catch(k){g._models.delete(r);L.error("Failed to load collada/gltf model",r,t);i();}}}});};d.prototype._postprocess=function(m,f){m.scene.scale.set(1,1,-1);var g=[],h=new Set(),i="_sapUsed";m.scene.traverse(function(o){o.updateWorldMatrix(false,false);var j=o.isMesh&&o.visible;if(j){g.push(o);}else if(o.geometry){o.geometry.dispose();}U.toArray(o.material).forEach(function(k){if(j||!k[i]){k[i]=j;}h.add(k);});});h.forEach(function(j){if(!j[i]){for(var k in j){if(k instanceof T.Texture){k.dispose();}}j.dispose();}});f.root=new T.Group();g.forEach(function(j){j.remove(j.children);f.root.add(j);j.matrixWorld.decompose(j.position,j.quaternion,j.scale);});};d.prototype._requestUpdate=function(f){if(f.mesh){f.mesh.dirty=true;}else{var m=this._meshes.get(f.key);if(!m){m=[];this._meshes.set(f.key,m);}for(var i=0;i<m.length;++i){if(m[i].instances.size<e){f.mesh=m[i];break;}}if(!f.mesh){f.mesh={dirty:true,model:f.model,hitInfo:[],objects3D:[],instances:new Set()};m.push(f.mesh);}f.mesh.instances.add(f);f.mesh.dirty=true;}};d.prototype._updateModel=function(m,n){if(n){if(!m.normalized){m.normalized={bbox:new a(),world:new M()};U.normalizeObject3D(m.root,m.normalized.world,m.normalized.bbox);}}else if(!m.bbox){m.bbox=new a().setFromObject(m.root);}};d.prototype._deleteModel=function(m){m.root.children.forEach(function(f){f.geometry.dispose();U.toArray(f.material).forEach(function(g){for(var h in g){if(h instanceof T.Texture){h.dispose();}}g.dispose();});},this);};d.prototype._removeInstanceFromMesh=function(f){if(f.mesh){if(f.mesh.instances.delete(f)){f.mesh.dirty=true;f.mesh=null;}else{L.error("Unable to find instance data in polygon mesh data","",t);}}};d.prototype._deleteObject3D=function(o){if(o){if(o.parent){o.parent.remove(o);}U.toArray(o.material).forEach(function(m){m.dispose();});}};d.prototype._getInstanceKey=function(i,h){var f=U.toBoolean(i["VB:s"]);var k=i.texture?"_texture_"+i.texture:"";var g="_color_"+i.color.toLowerCase();var j=f?"_selected_"+i.selectColor.toLowerCase():"";var l=h?"_hot_"+i.hotDeltaColor.toLowerCase():"";return i.model+k+g+j+l;};d.prototype.getTarget=function(i){var f=this._instances.get(i);if(f){var m=new T.Mesh(f.model.root.children[0].geometry.clone());var w=f.world.clone();if(f.model.normalized){w.multiply(f.model.normalized.world);}w.multiply(f.model.root.children[0].matrixWorld);w.decompose(m.position,m.quaternion,m.scale);m.updateMatrix();this._root.add(m);return m;}return null;};d.prototype._instanceHitTest=function(h){if(h.instanceId>=0){var f=this.hitInfo[h.instanceId];h.world=f.matrices[h.instanceId];return f.instance;}return null;};d.prototype._getColladaLoader=function(){return this._colladaLoader||(this._colladaLoader=new T.ColladaLoader());};d.prototype._getGlTFLoader=function(){return this._glTFLoader||(this._glTFLoader=new T.GLTFLoader());};return d;});