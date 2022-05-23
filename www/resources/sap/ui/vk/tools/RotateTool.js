/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Tool","./CoordinateSystem","./RotateToolHandler","./RotateToolGizmo"],function(T,C,R,a){"use strict";var b=T.extend("sap.ui.vk.tools.RotateTool",{metadata:{properties:{coordinateSystem:{type:"sap.ui.vk.tools.CoordinateSystem",defaultValue:C.World},enableStepping:{type:"boolean",defaultValue:false},showEditingUI:{type:"boolean",defaultValue:false}},events:{rotating:{parameters:{x:"float",y:"float",z:"float"}},rotated:{parameters:{x:"float",y:"float",z:"float"}},coordinateSystemChanged:{parameters:{coordinateSystem:"sap.ui.vk.tools.CoordinateSystem"}}}},constructor:function(i,s){T.apply(this,arguments);this._viewport=null;this._handler=new R(this);this._gizmo=null;}});b.prototype.init=function(){if(T.prototype.init){T.prototype.init.call(this);}this.setFootprint(["sap.ui.vk.threejs.Viewport"]);this.setAggregation("gizmo",new a());};b.prototype.isViewportType=function(t){if(this._viewport&&this._viewport.getMetadata().getName()===t){return true;}return false;};b.prototype.setActive=function(v,c,g){if(T.prototype.setActive){T.prototype.setActive.call(this,v,c,g);}if(v){this._activateTool(c);}else{this._deactivateTool();}if(c){c.setShouldRenderFrame();}return this;};b.prototype._activateTool=function(c){this._viewport=this.getViewportImplementation(c);this._gizmo=this.getGizmo();this._gizmo.setCoordinateSystem(this.getCoordinateSystem());this._gizmo.show(this._viewport,this);this._prepare();};b.prototype._deactivateTool=function(){if(this._viewport&&this._viewport._loco){this._viewport._loco.removeHandler(this._handler);}if(this._gizmo){this._gizmo.hide();this._gizmo=null;}};b.prototype._prepare=function(){var o=false;if(this._viewport._loco){this._viewport._loco.addHandler(this._handler,12);o=true;}return o;};b.prototype.queueCommand=function(c){if(this._prepare()){if(this.isViewportType("sap.ui.vk.threejs.Viewport")){c();}}return this;};b.prototype.setCoordinateSystem=function(v){var c=this.getCoordinateSystem();if(c!==v){this.setProperty("coordinateSystem",v,true);this.getGizmo().setCoordinateSystem(v);if(this._viewport){this._viewport.setShouldRenderFrame();}this.fireCoordinateSystemChanged({coordinateSystem:v});}return this;};b.prototype.setShowEditingUI=function(v){this.setProperty("showEditingUI",v,true);if(this._viewport){this._viewport.setShouldRenderFrame();}return this;};b.prototype.rotate=function(x,y,z){if(this._gizmo){this._gizmo.rotate(x,y,z);}if(this._viewport){this._viewport.setShouldRenderFrame();}return this;};return b;});
