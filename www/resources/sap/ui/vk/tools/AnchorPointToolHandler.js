sap.ui.define(["sap/ui/base/EventProvider","sap/m/Menu","sap/m/MenuItem","../getResourceBundle","../threejs/thirdparty/three"],function(E,M,a,g,t){"use strict";var A=E.extend("sap.ui.vk.tools.AnchorPointToolHandler",{metadata:{},constructor:function(b){this._tool=b;this._gizmo=b.getGizmo();this._rect=null;this._rayCaster=new THREE.Raycaster();this._handleIndex=-1;this._gizmoIndex=-1;this._handleAxis=new THREE.Vector3();this._gizmoOrigin=new THREE.Vector3();this._gizmoScale=1;this._matrixOrigin=new THREE.Matrix4();this._rotationOrigin=new THREE.Matrix4();this._mouse=new THREE.Vector2();this._mouseOrigin=new THREE.Vector2();}});A.prototype._updateMouse=function(e){var s=this.getViewport().getRenderer().getSize();this._mouse.x=((e.x-this._rect.x)/s.width)*2-1;this._mouse.y=((e.y-this._rect.y)/s.height)*-2+1;this._rayCaster.setFromCamera(this._mouse,this.getViewport().getCamera().getCameraRef());};A.prototype._updateHandles=function(e,h){var p=this._handleIndex;this._handleIndex=-1;if(e.n===1||(e.event&&e.event.type==="contextmenu")){for(var i=0,l=this._gizmo.getGizmoCount();i<l;i++){var b=this._gizmo.getTouchObject(i);var c=this._rayCaster.intersectObject(b,true);if(c.length>0){this._handleIndex=b.children.indexOf(c[0].object);if(this._handleIndex>=0){this._gizmoIndex=i;this._gizmoOrigin.setFromMatrixPosition(b.matrixWorld);this._matrixOrigin.copy(b.matrixWorld);this._gizmoScale=b.scale.x;this._rotationOrigin.extractRotation(b.matrixWorld);if(this._handleIndex<3){this._handleAxis.setFromMatrixColumn(b.matrixWorld,this._handleIndex).normalize();}else if(this._handleIndex<6){this._handleAxis.setFromMatrixColumn(b.matrixWorld,this._handleIndex-3).normalize();}else if(this._handleIndex<9){this._handleAxis.setFromMatrixColumn(b.matrixWorld,this._handleIndex-6).normalize();}}}}}this._gizmo.highlightHandle(this._handleIndex,h||this._handleIndex===-1);if(p!==this._handleIndex){this.getViewport().setShouldRenderFrame();}};A.prototype.hover=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,true);e.handled|=this._handleIndex>=0;}};A.prototype.click=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,true);this._gizmo.selectHandle(this._handleIndex);e.handled|=this._handleIndex>=0;}};var d=new THREE.Vector3();A.prototype._getAxisOffset=function(){var r=this._rayCaster.ray;var b=this._handleAxis.clone().cross(r.direction).cross(r.direction).normalize();d.copy(r.origin).sub(this._gizmoOrigin);return b.dot(d)/b.dot(this._handleAxis);};A.prototype._getPlaneOffset=function(){var r=this._rayCaster.ray;d.copy(this._gizmoOrigin).sub(r.origin);var b=this._handleAxis.dot(d)/this._handleAxis.dot(r.direction);return r.direction.clone().multiplyScalar(b).sub(d);};A.prototype.beginGesture=function(e){if(this._inside(e)&&!this._gesture){this._updateMouse(e);this._updateHandles(e,false);if(this._handleIndex>=0){e.handled=true;this._gesture=true;this._mouseOrigin.copy(e);this._gizmo.selectHandle(this._handleIndex);this._gizmo.beginGesture();if(this._handleIndex<3){this._dragOrigin=this._getAxisOffset();}else if(this._handleIndex<6){this._dragOrigin=this._getPlaneOffset();}else if(this._handleIndex<9){this._dragOrigin=this._getPlaneOffset().normalize();}var b=new THREE.Vector3().setFromMatrixColumn(this._matrixOrigin,(this._handleIndex+1)%3).normalize();var c=new THREE.Vector3().setFromMatrixColumn(this._matrixOrigin,(this._handleIndex+2)%3).normalize();var r=new THREE.Vector3().crossVectors(b,c).normalize();var f=new THREE.Vector3().setFromMatrixPosition(this._matrixOrigin);var l=b.clone();var m=2;for(var i=0;i<3;i++){var h=new THREE.Vector3().setComponent(i,1);var j=r.dot(h);if(m>j){m=j;l.copy(h);}}l.sub(r.clone().multiplyScalar(l.dot(r))).normalize();this._levelAngle=Math.atan2(l.dot(c),l.dot(b));var k=this._rayCaster.ray;var d=f.clone().sub(k.origin);var n=r.dot(d)/r.dot(k.direction);var o=k.direction.clone().multiplyScalar(n).sub(d).normalize();this._startAngle=Math.atan2(o.dot(c),o.dot(b));var u=new THREE.Vector3().setFromMatrixColumn(this.getViewport().getCamera().getCameraRef().matrixWorld,1);var p=new THREE.Vector3().crossVectors(o,r);this._rotationDelta=u.dot(p)<0?-0.01:0.01;}}};A.prototype._setOffset=function(o){if(this._tool.getEnableStepping()){var s=Math.pow(10,Math.round(Math.log10(this._gizmoScale)))*0.1;var m=new THREE.Matrix4().getInverse(this._rotationOrigin);var b=this._gizmoOrigin.clone().applyMatrix4(m);var p=this._gizmoOrigin.clone().add(o).applyMatrix4(m);for(var i=0;i<3;i++){var c=p.getComponent(i);if(Math.abs(c-b.getComponent(i))>s*1e-5){var e=Math.round(c/s)*s;d.setFromMatrixColumn(this._rotationOrigin,i).multiplyScalar(e-c);o.add(d);}}}this._gizmo._setOffset(o,this._gizmoIndex);};A.prototype.move=function(e){if(this._gesture){e.handled=true;this._updateMouse(e);if(this._handleIndex<3){if(isFinite(this._dragOrigin)){this._setOffset(this._handleAxis.clone().multiplyScalar(this._getAxisOffset()-this._dragOrigin));}}else if(this._handleIndex<6){if(isFinite(this._dragOrigin.x)&&isFinite(this._dragOrigin.y)&&isFinite(this._dragOrigin.z)){this._setOffset(this._getPlaneOffset().sub(this._dragOrigin));}}else if(this._handleIndex<9){var b=this._startAngle;var c=b+(e.y-this._mouseOrigin.y)*this._rotationDelta;if(this._tool.getEnableStepping()){var s=THREE.Math.degToRad(5);var f=c-b-this._levelAngle;c+=Math.round(f/s)*s-f;}if(isFinite(b)&&isFinite(c)){this._gizmo._setRotationAxisAngle(this._handleIndex-6,b,c);}}}};A.prototype.endGesture=function(e){if(this._gesture){this._gesture=false;e.handled=true;this._updateMouse(e);this._gizmo.endGesture();this._dragOrigin=undefined;this._updateHandles(e,true);this.getViewport().setShouldRenderFrame();}};A.prototype.contextMenu=function(e){if(this._inside(e)){this._updateMouse(e);this._updateHandles(e,true);if(this._handleIndex>=0){e.handled=true;var m=new M({items:[new a({text:g().getText("ANCHOR_POINT_TOOL_MOVE_TO_WORLD_ORIGIN")}),new a({text:g().getText("ANCHOR_POINT_TOOL_MOVE_TO_SELECTION_CENTER")}),new a({text:g().getText("ANCHOR_POINT_TOOL_MOVE_TO_SCENE_CENTER")}),new a({text:g().getText("ANCHOR_POINT_TOOL_MOVE_TO_SELECTED_OBJECTS_ORIGIN")})],itemSelected:function(e){var i=e.getParameters("item").item;var b=e.getSource().indexOfItem(i);var p=new THREE.Vector3();var v=this.getViewport();if(v){var c=new THREE.Box3();switch(b){default:case 0:break;case 1:if(v._viewStateManager){v._viewStateManager.enumerateSelection(function(n){c.expandByObject(n);});c.getCenter(p);}break;case 2:var s=v.getScene()?v.getScene().getSceneRef():null;if(s){s._expandBoundingBox(c,false,true);c.getCenter(p);}break;case 3:if(v._viewStateManager){var f=0;var h=new THREE.Vector3();v._viewStateManager.enumerateSelection(function(n){p.add(h.setFromMatrixPosition(n.matrixWorld));f++;});p.multiplyScalar(1/f);}break;}}this._gizmo.setPosition(p);}.bind(this)});m.openAsContextMenu(e.event,this.getViewport());}}};A.prototype.getViewport=function(){return this._tool._viewport;};A.prototype._getOffset=function(o){var r=o.getBoundingClientRect();var p={x:r.left+window.pageXOffset,y:r.top+window.pageYOffset};return p;};A.prototype._inside=function(e){if(this._rect===null||true){var i=this._tool._viewport.getIdForLabel();var b=document.getElementById(i);if(b===null){return false;}var o=this._getOffset(b);this._rect={x:o.x,y:o.y,w:b.offsetWidth,h:b.offsetHeight};}return(e.x>=this._rect.x&&e.x<=this._rect.x+this._rect.w&&e.y>=this._rect.y&&e.y<=this._rect.y+this._rect.h);};return A;});
