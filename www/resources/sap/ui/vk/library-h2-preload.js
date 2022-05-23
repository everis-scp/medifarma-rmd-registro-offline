//@ui5-bundle sap/ui/vk/library-h2-preload.js
/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.predefine('sap/ui/vk/library',["sap/base/util/ObjectPath","./BillboardBorderLineStyle","./BillboardCoordinateSpace","./BillboardHorizontalAlignment","./BillboardStyle","./BillboardTextEncoding","./CameraFOVBindingType","./CameraProjectionType","./ContentResourceSourceCategory","./ContentResourceSourceTypeToCategoryMap","./DetailViewShape","./DetailViewType","./DvlException","./LeaderLineMarkStyle","./MapContainerButtonType","./Redline","./RenderMode","./SelectionMode","./TransformationMatrix","./VisibilityMode","./ZoomTo","./abgrToColor","./colorToABGR","./cssColorToColor","./colorToCSSColor","./getResourceBundle","./utf8ArrayBufferToString","./dvl/GraphicsCoreApi","./dvl/checkResult","./dvl/getJSONObject","./dvl/getPointer","./tools/AxisColours","./tools/CoordinateSystem","./tools/HitTestClickType","./tools/HitTestIdMode","./tools/PredefinedView"],function(O){"use strict";sap.ui.getCore().initLibrary({name:"sap.ui.vk",dependencies:["sap.ui.core"],interfaces:["sap.ui.vk.AuthorizationHandler","sap.ui.vk.DecryptionHandler"],types:[],controls:["sap.ui.vk.AnimationTimeSlider","sap.ui.vk.ContainerBase","sap.ui.vk.ContainerContent","sap.ui.vk.DrawerToolbar","sap.ui.vk.FlexibleControl","sap.ui.vk.LegendItem","sap.ui.vk.ListPanel","sap.ui.vk.ListPanelStack","sap.ui.vk.MapContainer","sap.ui.vk.NativeViewport","sap.ui.vk.Notifications","sap.ui.vk.Overlay","sap.ui.vk.ProgressIndicator","sap.ui.vk.RedlineDesign","sap.ui.vk.RedlineSurface","sap.ui.vk.SceneTree","sap.ui.vk.StepNavigation","sap.ui.vk.Toolbar","sap.ui.vk.Viewer","sap.ui.vk.ViewGallery","sap.ui.vk.Viewport","sap.ui.vk.ViewportBase","sap.ui.vk.dvl.Viewport","sap.ui.vk.threejs.Viewport","sap.ui.vk.tools.AnchorPointToolGizmo","sap.ui.vk.tools.CrossSectionToolGizmo","sap.ui.vk.tools.Gizmo","sap.ui.vk.tools.MoveToolGizmo","sap.ui.vk.tools.RotateToolGizmo","sap.ui.vk.tools.ScaleToolGizmo","sap.ui.vk.tools.SceneOrientationToolGizmo","sap.ui.vk.tools.TooltipToolGizmo"],elements:["sap.ui.vk.ContentConnector","sap.ui.vk.FlexibleControlLayoutData","sap.ui.vk.OverlayArea","sap.ui.vk.RedlineElement","sap.ui.vk.RedlineElementEllipse","sap.ui.vk.RedlineElementFreehand","sap.ui.vk.RedlineElementLine","sap.ui.vk.RedlineElementRectangle","sap.ui.vk.RedlineElementText","sap.ui.vk.ViewStateManager","sap.ui.vk.ViewStateManagerBase","sap.ui.vk.dvl.ViewStateManager","sap.ui.vk.threejs.NodesTransitionHelper","sap.ui.vk.threejs.ViewStateManager","sap.ui.vk.tools.AnchorPointTool","sap.ui.vk.tools.CrossSectionTool","sap.ui.vk.tools.HitTestTool","sap.ui.vk.tools.MoveTool","sap.ui.vk.tools.RectSelectTool","sap.ui.vk.tools.RotateOrbitTool","sap.ui.vk.tools.RotateTool","sap.ui.vk.tools.RotateTurntableTool","sap.ui.vk.tools.ScaleTool","sap.ui.vk.tools.SceneOrientationTool","sap.ui.vk.tools.Tool","sap.ui.vk.tools.TooltipTool"],noLibraryCSS:false,version:"1.71.4",designtime:"sap/ui/vk/designtime/library.designtime"});var v=O.get("sap.ui.vk");var s={};s["sap/ui/vk/threejs/thirdparty/three"]={exports:"THREE",amd:true};s["sap/ui/vk/ve/thirdparty/html2canvas"]={exports:"html2canvas",amd:true};s["sap/ui/vk/threejs/thirdparty/totara"]={exports:"Totara",amd:true};sap.ui.loader.config({shim:s});var l=function(a,b){var m="new extend getMetadata";if(b){m+=" "+b;}sap.ui.lazyRequire("sap.ui.vk."+a,m);};l("AnimationPlayback");l("AnimationSequence");l("BaseNodeProxy");l("Camera");l("ContentConnector","registerSourceType");l("ContentManager");l("ContentResource");l("Core");l("DownloadManager");l("ImageContentManager");l("LayerProxy");l("Loco");l("Material");l("NodeHierarchy");l("NodeProxy");l("OrthographicCamera");l("PerspectiveCamera");l("RedlineDesignHandler");l("RedlineGesturesHandler");l("Scene");l("Smart2DHandler");l("Texture");l("View");l("ViewportHandler");l("dvl.BaseNodeProxy");l("dvl.ContentManager","getRuntimeSettings setRuntimeSettings getWebGLContextAttributes setWebGLContextAttributes getDecryptionHandler setDecryptionHandler");l("dvl.GraphicsCore");l("dvl.LayerProxy");l("dvl.NodeHierarchy");l("dvl.NodeProxy");l("dvl.Scene");l("helpers.RotateOrbitHelperDvl");l("helpers.RotateOrbitHelperThree");l("helpers.RotateTurntableHelperDvl");l("helpers.RotateTurntableHelperThree");l("threejs.AnimationSequence");l("threejs.BaseNodeProxy");l("threejs.Billboard");l("threejs.Callout");l("threejs.ContentDeliveryService");l("threejs.ContentManager","registerLoader");l("threejs.DetailView");l("threejs.LayerProxy");l("threejs.Material");l("threejs.NodeHierarchy");l("threejs.NodeProxy");l("threejs.OrthographicCamera");l("threejs.PerspectiveCamera");l("threejs.Scene");l("threejs.Texture");l("threejs.Thrustline");l("threejs.ViewportGestureHandler");l("tools.AnchorPointToolHandler");l("tools.CrossSectionToolHandler");l("tools.HitTestToolHandler");l("tools.MoveToolHandler");l("tools.RectSelectToolHandler");l("tools.RotateToolHandler");l("tools.ScaleToolHandler");l("tools.TooltipToolHandler");return v;});
sap.ui.require.preload({
	"sap/ui/vk/manifest.json":'{"_version":"1.9.0","sap.app":{"id":"sap.ui.vk","type":"library","embeds":[],"applicationVersion":{"version":"1.71.4"},"title":"SAPUI5 Visualization Toolkit.","description":"SAPUI5 Visualization Toolkit.","ach":"CA-UI5-VTK","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_belize","sap_belize_hcb","sap_belize_hcw","sap_belize_plus","sap_bluecrystal","sap_fiori_3","sap_fiori_3_dark","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_hcb"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.71","libs":{"sap.ui.core":{"minVersion":"1.71.22"},"sap.ui.unified":{"minVersion":"1.71.22","lazy":true},"sap.m":{"minVersion":"1.71.22","lazy":true},"sap.ui.layout":{"minVersion":"1.71.22","lazy":true}}},"library":{"i18n":false,"content":{"controls":["sap.ui.vk.AnimationTimeSlider","sap.ui.vk.ContainerBase","sap.ui.vk.ContainerContent","sap.ui.vk.DrawerToolbar","sap.ui.vk.FlexibleControl","sap.ui.vk.LegendItem","sap.ui.vk.ListPanel","sap.ui.vk.ListPanelStack","sap.ui.vk.MapContainer","sap.ui.vk.NativeViewport","sap.ui.vk.Notifications","sap.ui.vk.Overlay","sap.ui.vk.ProgressIndicator","sap.ui.vk.RedlineDesign","sap.ui.vk.RedlineSurface","sap.ui.vk.SceneTree","sap.ui.vk.StepNavigation","sap.ui.vk.Toolbar","sap.ui.vk.Viewer","sap.ui.vk.ViewGallery","sap.ui.vk.Viewport","sap.ui.vk.ViewportBase","sap.ui.vk.dvl.Viewport","sap.ui.vk.threejs.Viewport","sap.ui.vk.tools.AnchorPointToolGizmo","sap.ui.vk.tools.CrossSectionToolGizmo","sap.ui.vk.tools.Gizmo","sap.ui.vk.tools.MoveToolGizmo","sap.ui.vk.tools.RotateToolGizmo","sap.ui.vk.tools.ScaleToolGizmo","sap.ui.vk.tools.SceneOrientationToolGizmo","sap.ui.vk.tools.TooltipToolGizmo"],"elements":["sap.ui.vk.ContentConnector","sap.ui.vk.FlexibleControlLayoutData","sap.ui.vk.OverlayArea","sap.ui.vk.RedlineElement","sap.ui.vk.RedlineElementEllipse","sap.ui.vk.RedlineElementFreehand","sap.ui.vk.RedlineElementLine","sap.ui.vk.RedlineElementRectangle","sap.ui.vk.RedlineElementText","sap.ui.vk.ViewStateManager","sap.ui.vk.ViewStateManagerBase","sap.ui.vk.dvl.ViewStateManager","sap.ui.vk.threejs.NodesTransitionHelper","sap.ui.vk.threejs.ViewStateManager","sap.ui.vk.tools.AnchorPointTool","sap.ui.vk.tools.CrossSectionTool","sap.ui.vk.tools.HitTestTool","sap.ui.vk.tools.MoveTool","sap.ui.vk.tools.RectSelectTool","sap.ui.vk.tools.RotateOrbitTool","sap.ui.vk.tools.RotateTool","sap.ui.vk.tools.RotateTurntableTool","sap.ui.vk.tools.ScaleTool","sap.ui.vk.tools.SceneOrientationTool","sap.ui.vk.tools.Tool","sap.ui.vk.tools.TooltipTool"],"types":[],"interfaces":["sap.ui.vk.AuthorizationHandler","sap.ui.vk.DecryptionHandler"]}}}}'
},"sap/ui/vk/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/ui/vk/AnimationPlayback.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js"],
"sap/ui/vk/AnimationSequence.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js","sap/ui/vk/AnimationInterpolationType.js","sap/ui/vk/AnimationRotateType.js","sap/ui/vk/AnimationTrackType.js"],
"sap/ui/vk/AnimationTimeSlider.js":["sap/m/Slider.js","sap/ui/vk/AnimationTimeSliderRenderer.js"],
"sap/ui/vk/AnimationTimeSliderRenderer.js":["sap/m/SliderRenderer.js"],
"sap/ui/vk/BaseNodeProxy.js":["sap/ui/base/Object.js"],
"sap/ui/vk/Camera.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/vk/ContainerBase.js":["jquery.sap.global.js","sap/m/library.js","sap/ui/Device.js","sap/ui/core/Control.js","sap/ui/core/IconPool.js","sap/ui/core/Popup.js","sap/ui/core/ResizeHandler.js","sap/ui/core/delegate/ScrollEnablement.js","sap/ui/vk/ContainerBaseRenderer.js","sap/ui/vk/MapContainerButtonType.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/ContainerContent.js":["sap/ui/core/Control.js","sap/ui/vk/ContainerContentRenderer.js","sap/ui/vk/library.js"],
"sap/ui/vk/ContentConnector.js":["jquery.sap.global.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/core/Element.js","sap/ui/vk/ContentResource.js","sap/ui/vk/Core.js","sap/ui/vk/Messages.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/ContentManager.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/vk/ContentResource.js":["sap/ui/base/ManagedObject.js","sap/ui/vk/ContentResourceSourceTypeToCategoryMap.js"],
"sap/ui/vk/ContentResourceSourceTypeToCategoryMap.js":["sap/ui/vk/ContentResourceSourceCategory.js"],
"sap/ui/vk/Core.js":["sap/ui/base/ManagedObject.js","sap/ui/vk/library.js"],
"sap/ui/vk/DownloadManager.js":["jquery.sap.global.js","sap/ui/base/EventProvider.js","sap/ui/vk/Messages.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/DrawerToolbar.js":["sap/m/Button.js","sap/m/FlexItemData.js","sap/m/Menu.js","sap/m/MenuButton.js","sap/m/MenuItem.js","sap/m/OverflowToolbar.js","sap/m/ToggleButton.js","sap/m/ToolbarSeparator.js","sap/m/VBox.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/core/Control.js","sap/ui/core/Icon.js","sap/ui/vk/DrawerToolbarButton.js","sap/ui/vk/DrawerToolbarRenderer.js","sap/ui/vk/Viewport.js","sap/ui/vk/ZoomTo.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js","sap/ui/vk/threejs/Viewport.js","sap/ui/vk/tools/CrossSectionTool.js","sap/ui/vk/tools/RectSelectTool.js","sap/ui/vk/tools/RotateOrbitTool.js","sap/ui/vk/tools/RotateTurntableTool.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/DvlException.js":["sap/ui/base/Exception.js"],
"sap/ui/vk/FlexibleControl.js":["sap/ui/core/Control.js","sap/ui/core/EnabledPropagator.js","sap/ui/vk/FlexibleControlRenderer.js","sap/ui/vk/library.js"],
"sap/ui/vk/FlexibleControlLayoutData.js":["sap/ui/core/LayoutData.js"],
"sap/ui/vk/ImageContentManager.js":["jquery.sap.global.js","sap/ui/vk/ContentManager.js","sap/ui/vk/Messages.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/LayerProxy.js":["sap/ui/base/Object.js"],
"sap/ui/vk/LegendItem.js":["sap/m/StandardListItem.js","sap/ui/vk/LegendItemRenderer.js"],
"sap/ui/vk/LegendItemRenderer.js":["sap/m/StandardListItemRenderer.js","sap/ui/core/Renderer.js"],
"sap/ui/vk/ListPanel.js":["sap/m/library.js","sap/ui/core/Control.js","sap/ui/vk/ListPanelRenderer.js","sap/ui/vk/library.js"],
"sap/ui/vk/ListPanelStack.js":["sap/ui/core/Control.js","sap/ui/layout/library.js","sap/ui/vk/ListPanelStackRenderer.js","sap/ui/vk/library.js"],
"sap/ui/vk/Loco.js":["sap/ui/base/EventProvider.js"],
"sap/ui/vk/MapContainer.js":["jquery.sap.global.js","sap/ui/Device.js","sap/ui/core/IconPool.js","sap/ui/vbm/lib/sapvbi.js","sap/ui/vk/ContainerBase.js","sap/ui/vk/MapContainerButtonType.js","sap/ui/vk/MapContainerRenderer.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/MapContainerRenderer.js":["sap/ui/Device.js","sap/ui/core/Renderer.js","sap/ui/vk/ContainerBaseRenderer.js"],
"sap/ui/vk/Material.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/vk/NativeViewport.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/core/ResizeHandler.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/Loco.js","sap/ui/vk/Messages.js","sap/ui/vk/NativeViewportRenderer.js","sap/ui/vk/ViewportHandler.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/NodeHierarchy.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js","sap/ui/vk/Messages.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/NodeProxy.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/vk/Notifications.js":["sap/base/Log.js","sap/m/ToggleButton.js","sap/ui/core/Control.js","sap/ui/vk/Messages.js","sap/ui/vk/NotificationsRenderer.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/OrthographicCamera.js":["sap/ui/vk/Camera.js"],
"sap/ui/vk/Overlay.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/vbm/lib/sapvbi.js","sap/ui/vbm/library.js","sap/ui/vk/Messages.js","sap/ui/vk/OverlayArea.js","sap/ui/vk/OverlayRenderer.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/OverlayArea.js":["sap/ui/core/Element.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/PerspectiveCamera.js":["sap/ui/vk/Camera.js"],
"sap/ui/vk/ProgressIndicator.js":["jquery.sap.global.js","sap/m/ProgressIndicator.js","sap/ui/vk/ProgressIndicatorRenderer.js"],
"sap/ui/vk/ProgressIndicatorRenderer.js":["sap/m/ProgressIndicatorRenderer.js"],
"sap/ui/vk/RedlineDesign.js":["sap/ui/core/Control.js","sap/ui/vk/Loco.js","sap/ui/vk/RedlineDesignHandler.js","sap/ui/vk/RedlineDesignRenderer.js","sap/ui/vk/RedlineElement.js","sap/ui/vk/RedlineGesturesHandler.js","sap/ui/vk/RedlineSurface.js"],
"sap/ui/vk/RedlineDesignHandler.js":["sap/ui/base/EventProvider.js","sap/ui/core/ResizeHandler.js"],
"sap/ui/vk/RedlineDesignRenderer.js":["sap/ui/core/Renderer.js","sap/ui/vk/RedlineSurfaceRenderer.js"],
"sap/ui/vk/RedlineElement.js":["sap/ui/core/Element.js"],
"sap/ui/vk/RedlineElementEllipse.js":["jquery.sap.global.js","sap/ui/vk/Redline.js","sap/ui/vk/RedlineElement.js"],
"sap/ui/vk/RedlineElementFreehand.js":["jquery.sap.global.js","sap/ui/vk/Redline.js","sap/ui/vk/RedlineElement.js"],
"sap/ui/vk/RedlineElementLine.js":["jquery.sap.global.js","sap/ui/vk/Redline.js","sap/ui/vk/RedlineElement.js"],
"sap/ui/vk/RedlineElementRectangle.js":["jquery.sap.global.js","sap/ui/vk/Redline.js","sap/ui/vk/RedlineElement.js"],
"sap/ui/vk/RedlineElementText.js":["jquery.sap.global.js","sap/ui/vk/Redline.js","sap/ui/vk/RedlineElement.js"],
"sap/ui/vk/RedlineGesturesHandler.js":["sap/ui/base/EventProvider.js","sap/ui/core/ResizeHandler.js","sap/ui/vk/NativeViewport.js"],
"sap/ui/vk/RedlineSurface.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/vk/Loco.js","sap/ui/vk/Redline.js","sap/ui/vk/RedlineGesturesHandler.js","sap/ui/vk/RedlineSurfaceRenderer.js","sap/ui/vk/library.js"],
"sap/ui/vk/Scene.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/vk/SceneTree.js":["sap/m/SearchField.js","sap/m/Text.js","sap/m/Title.js","sap/m/Toolbar.js","sap/m/ToolbarLayoutData.js","sap/m/ToolbarSpacer.js","sap/ui/core/Control.js","sap/ui/core/Icon.js","sap/ui/core/ResizeHandler.js","sap/ui/model/json/JSONModel.js","sap/ui/table/Column.js","sap/ui/table/TreeTable.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/SceneTreeRenderer.js","sap/ui/vk/ViewStateManager.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/Smart2DHandler.js":["sap/ui/base/EventProvider.js","sap/ui/core/ResizeHandler.js"],
"sap/ui/vk/StepNavigation.js":["jquery.sap.global.js","sap/ui/core/Control.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/DvlException.js","sap/ui/vk/Messages.js","sap/ui/vk/StepNavigationRenderer.js","sap/ui/vk/dvl/GraphicsCoreApi.js","sap/ui/vk/dvl/Scene.js","sap/ui/vk/dvl/getJSONObject.js","sap/ui/vk/dvl/getPointer.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/Texture.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/vk/Toolbar.js":["sap/ui/core/Control.js","sap/ui/vk/ToolbarRenderer.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/TransformationMatrix.js":["jquery.sap.global.js","sap/ui/base/DataType.js"],
"sap/ui/vk/View.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/vk/ViewGallery.js":["sap/m/Button.js","sap/m/FlexItemData.js","sap/m/FormattedText.js","sap/m/HBox.js","sap/m/Image.js","sap/m/Popover.js","sap/m/ScrollContainer.js","sap/m/SelectList.js","sap/m/Title.js","sap/m/ToggleButton.js","sap/m/Toolbar.js","sap/m/ToolbarSpacer.js","sap/m/VBox.js","sap/ui/core/Control.js","sap/ui/core/dnd/DragInfo.js","sap/ui/core/dnd/DropInfo.js","sap/ui/model/json/JSONModel.js","sap/ui/vk/AnimationTimeSlider.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/ViewGalleryRenderer.js","sap/ui/vk/ViewGalleryThumbnail.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/ViewGalleryThumbnail.js":["jquery.sap.global.js","sap/m/Image.js","sap/ui/core/Control.js"],
"sap/ui/vk/ViewGalleryThumbnailRenderer.js":["sap/ui/Device.js","sap/ui/vk/library.js"],
"sap/ui/vk/ViewStateManager.js":["jquery.sap.global.js","sap/base/util/ObjectPath.js","sap/ui/core/Element.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/Core.js","sap/ui/vk/Scene.js","sap/ui/vk/ViewStateManagerBase.js"],
"sap/ui/vk/ViewStateManagerBase.js":["sap/ui/core/Element.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/Scene.js"],
"sap/ui/vk/Viewer.js":["jquery.sap.global.js","sap/m/FlexItemData.js","sap/m/VBox.js","sap/ui/core/Control.js","sap/ui/layout/Splitter.js","sap/ui/layout/SplitterLayoutData.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/ContentResource.js","sap/ui/vk/DvlException.js","sap/ui/vk/FlexibleControl.js","sap/ui/vk/Messages.js","sap/ui/vk/NativeViewport.js","sap/ui/vk/Notifications.js","sap/ui/vk/ProgressIndicator.js","sap/ui/vk/RedlineDesign.js","sap/ui/vk/Scene.js","sap/ui/vk/SceneTree.js","sap/ui/vk/SelectionMode.js","sap/ui/vk/StepNavigation.js","sap/ui/vk/Toolbar.js","sap/ui/vk/ViewGallery.js","sap/ui/vk/ViewStateManager.js","sap/ui/vk/ViewerRenderer.js","sap/ui/vk/Viewport.js","sap/ui/vk/abgrToColor.js","sap/ui/vk/colorToABGR.js","sap/ui/vk/colorToCSSColor.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/dvl/ContentManager.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/library.js"],
"sap/ui/vk/Viewport.js":["jquery.sap.global.js","sap/base/util/ObjectPath.js","sap/ui/vk/Camera.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/RenderMode.js","sap/ui/vk/Scene.js","sap/ui/vk/ViewStateManager.js","sap/ui/vk/ViewportBase.js","sap/ui/vk/ViewportRenderer.js","sap/ui/vk/VisibilityMode.js"],
"sap/ui/vk/ViewportBase.js":["sap/ui/core/Control.js","sap/ui/vk/RenderMode.js","sap/ui/vk/SelectionMode.js","sap/ui/vk/library.js"],
"sap/ui/vk/ViewportHandler.js":["jquery.sap.global.js","sap/ui/base/EventProvider.js"],
"sap/ui/vk/designtime/Viewport.create.fragment.xml":["sap/ui/core/Fragment.js","sap/ui/vk/Viewport.js"],
"sap/ui/vk/dvl/BaseNodeProxy.js":["sap/ui/vk/BaseNodeProxy.js","sap/ui/vk/dvl/getJSONObject.js"],
"sap/ui/vk/dvl/ContentManager.js":["sap/ui/vk/ContentManager.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/dvl/GraphicsCore.js":["jquery.sap.global.js","sap/ui/base/EventProvider.js","sap/ui/thirdparty/URI.js","sap/ui/vk/ContentResource.js","sap/ui/vk/DownloadManager.js","sap/ui/vk/DvlException.js","sap/ui/vk/Messages.js","sap/ui/vk/dvl/GraphicsCoreApi.js","sap/ui/vk/dvl/Scene.js","sap/ui/vk/dvl/ViewStateManager.js","sap/ui/vk/dvl/checkResult.js","sap/ui/vk/dvl/getJSONObject.js","sap/ui/vk/dvl/getPointer.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/utf8ArrayBufferToString.js","sap/ui/vk/ve/thirdparty/html2canvas.js"],
"sap/ui/vk/dvl/LayerProxy.js":["sap/ui/vk/LayerProxy.js","sap/ui/vk/dvl/getJSONObject.js"],
"sap/ui/vk/dvl/NodeHierarchy.js":["jquery.sap.global.js","sap/ui/base/ObjectPool.js","sap/ui/vk/DvlException.js","sap/ui/vk/Messages.js","sap/ui/vk/NodeHierarchy.js","sap/ui/vk/dvl/BaseNodeProxy.js","sap/ui/vk/dvl/LayerProxy.js","sap/ui/vk/dvl/NodeProxy.js","sap/ui/vk/dvl/checkResult.js","sap/ui/vk/dvl/getJSONObject.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/dvl/NodeProxy.js":["sap/ui/vk/NodeProxy.js","sap/ui/vk/TransformationMatrix.js","sap/ui/vk/abgrToColor.js","sap/ui/vk/colorToABGR.js","sap/ui/vk/colorToCSSColor.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/dvl/getJSONObject.js"],
"sap/ui/vk/dvl/Scene.js":["jquery.sap.global.js","sap/ui/vk/Scene.js","sap/ui/vk/dvl/NodeHierarchy.js"],
"sap/ui/vk/dvl/ViewStateManager.js":["jquery.sap.global.js","sap/ui/core/Element.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/ViewStateManagerBase.js","sap/ui/vk/abgrToColor.js","sap/ui/vk/colorToABGR.js","sap/ui/vk/colorToCSSColor.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/dvl/GraphicsCoreApi.js","sap/ui/vk/dvl/Scene.js"],
"sap/ui/vk/dvl/Viewport.js":["jquery.sap.global.js","sap/ui/core/ResizeHandler.js","sap/ui/vk/CameraFOVBindingType.js","sap/ui/vk/CameraProjectionType.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/Loco.js","sap/ui/vk/Messages.js","sap/ui/vk/SelectionMode.js","sap/ui/vk/Smart2DHandler.js","sap/ui/vk/ViewStateManager.js","sap/ui/vk/ViewportBase.js","sap/ui/vk/ViewportHandler.js","sap/ui/vk/VisibilityMode.js","sap/ui/vk/ZoomTo.js","sap/ui/vk/abgrToColor.js","sap/ui/vk/colorToABGR.js","sap/ui/vk/colorToCSSColor.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/dvl/Scene.js","sap/ui/vk/dvl/ViewportRenderer.js","sap/ui/vk/dvl/getJSONObject.js","sap/ui/vk/getResourceBundle.js"],
"sap/ui/vk/dvl/checkResult.js":["sap/base/Log.js","sap/ui/vk/DvlException.js"],
"sap/ui/vk/dvl/getJSONObject.js":["sap/base/Log.js","sap/ui/vk/DvlException.js"],
"sap/ui/vk/dvl/getPointer.js":["sap/base/Log.js","sap/ui/vk/DvlException.js"],
"sap/ui/vk/getResourceBundle.js":["sap/base/util/ObjectPath.js","sap/ui/core/Core.js"],
"sap/ui/vk/helpers/RotateOrbitHelperDvl.js":["sap/ui/base/EventProvider.js"],
"sap/ui/vk/helpers/RotateOrbitHelperThree.js":["sap/ui/base/EventProvider.js"],
"sap/ui/vk/helpers/RotateTurntableHelperDvl.js":["sap/ui/base/EventProvider.js"],
"sap/ui/vk/helpers/RotateTurntableHelperThree.js":["sap/ui/base/EventProvider.js"],
"sap/ui/vk/library.js":["sap/base/util/ObjectPath.js","sap/ui/vk/BillboardBorderLineStyle.js","sap/ui/vk/BillboardCoordinateSpace.js","sap/ui/vk/BillboardHorizontalAlignment.js","sap/ui/vk/BillboardStyle.js","sap/ui/vk/BillboardTextEncoding.js","sap/ui/vk/CameraFOVBindingType.js","sap/ui/vk/CameraProjectionType.js","sap/ui/vk/ContentResourceSourceCategory.js","sap/ui/vk/ContentResourceSourceTypeToCategoryMap.js","sap/ui/vk/DetailViewShape.js","sap/ui/vk/DetailViewType.js","sap/ui/vk/DvlException.js","sap/ui/vk/LeaderLineMarkStyle.js","sap/ui/vk/MapContainerButtonType.js","sap/ui/vk/Redline.js","sap/ui/vk/RenderMode.js","sap/ui/vk/SelectionMode.js","sap/ui/vk/TransformationMatrix.js","sap/ui/vk/VisibilityMode.js","sap/ui/vk/ZoomTo.js","sap/ui/vk/abgrToColor.js","sap/ui/vk/colorToABGR.js","sap/ui/vk/colorToCSSColor.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/dvl/GraphicsCoreApi.js","sap/ui/vk/dvl/checkResult.js","sap/ui/vk/dvl/getJSONObject.js","sap/ui/vk/dvl/getPointer.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/tools/AxisColours.js","sap/ui/vk/tools/CoordinateSystem.js","sap/ui/vk/tools/HitTestClickType.js","sap/ui/vk/tools/HitTestIdMode.js","sap/ui/vk/tools/PredefinedView.js","sap/ui/vk/utf8ArrayBufferToString.js"],
"sap/ui/vk/threejs/AnimationHelper.js":["sap/ui/vk/AnimationPlayback.js","sap/ui/vk/View.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/AnimationSequence.js":["jquery.sap.global.js","sap/ui/vk/AnimationInterpolationType.js","sap/ui/vk/AnimationRotateType.js","sap/ui/vk/AnimationSequence.js","sap/ui/vk/AnimationTrackType.js"],
"sap/ui/vk/threejs/AnimationTimeController.js":["sap/ui/base/ManagedObject.js"],
"sap/ui/vk/threejs/BaseNodeProxy.js":["sap/ui/vk/BaseNodeProxy.js"],
"sap/ui/vk/threejs/Billboard.js":["sap/ui/base/ManagedObject.js","sap/ui/vk/BillboardBorderLineStyle.js","sap/ui/vk/BillboardCoordinateSpace.js","sap/ui/vk/BillboardHorizontalAlignment.js","sap/ui/vk/BillboardStyle.js","sap/ui/vk/BillboardTextEncoding.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/ve/thirdparty/html2canvas.js"],
"sap/ui/vk/threejs/Callout.js":["sap/ui/base/ManagedObject.js","sap/ui/vk/BillboardStyle.js","sap/ui/vk/LeaderLineMarkStyle.js","sap/ui/vk/threejs/Billboard.js","sap/ui/vk/threejs/PolylineGeometry.js","sap/ui/vk/threejs/PolylineMaterial.js","sap/ui/vk/threejs/PolylineMesh.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/ve/thirdparty/html2canvas.js"],
"sap/ui/vk/threejs/ContentDeliveryService.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js","sap/ui/vk/ObjectType.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/Material.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/totara/TotaraLoader.js"],
"sap/ui/vk/threejs/ContentManager.js":["sap/base/Log.js","sap/ui/vk/ContentManager.js","sap/ui/vk/Messages.js","sap/ui/vk/TransformationMatrix.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/ContentDeliveryService.js","sap/ui/vk/threejs/OrthographicCamera.js","sap/ui/vk/threejs/PerspectiveCamera.js","sap/ui/vk/threejs/Scene.js","sap/ui/vk/threejs/ViewStateManager.js","sap/ui/vk/threejs/Viewport.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/DetailView.js":["sap/ui/base/ManagedObject.js","sap/ui/vk/DetailViewShape.js","sap/ui/vk/DetailViewType.js","sap/ui/vk/threejs/OrthographicCamera.js","sap/ui/vk/threejs/PerspectiveCamera.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/ve/thirdparty/html2canvas.js"],
"sap/ui/vk/threejs/MataiLoader.js":["sap/base/Log.js","sap/ui/vk/threejs/SceneBuilder.js"],
"sap/ui/vk/threejs/Material.js":["sap/ui/vk/Material.js","sap/ui/vk/colorToCSSColor.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/threejs/Texture.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/NodeHierarchy.js":["jquery.sap.global.js","sap/ui/base/ObjectPool.js","sap/ui/vk/Messages.js","sap/ui/vk/NodeHierarchy.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/BaseNodeProxy.js","sap/ui/vk/threejs/NodeProxy.js"],
"sap/ui/vk/threejs/NodeProxy.js":["sap/ui/vk/NodeProxy.js","sap/ui/vk/ObjectType.js","sap/ui/vk/TransformationMatrix.js","sap/ui/vk/abgrToColor.js","sap/ui/vk/colorToABGR.js","sap/ui/vk/colorToCSSColor.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/threejs/Material.js","sap/ui/vk/threejs/ThreeExtensions.js"],
"sap/ui/vk/threejs/NodesTransitionHelper.js":["sap/ui/core/Element.js","sap/ui/vk/TransformationMatrix.js"],
"sap/ui/vk/threejs/OrthographicCamera.js":["sap/ui/vk/OrthographicCamera.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/PerspectiveCamera.js":["sap/ui/vk/PerspectiveCamera.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/PolylineGeometry.js":["sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/PolylineMaterial.js":["sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/PolylineMesh.js":["sap/ui/vk/threejs/PolylineGeometry.js","sap/ui/vk/threejs/PolylineMaterial.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/Scene.js":["jquery.sap.global.js","sap/ui/vk/RenderMode.js","sap/ui/vk/Scene.js","sap/ui/vk/threejs/AnimationSequence.js","sap/ui/vk/threejs/NodeHierarchy.js","sap/ui/vk/threejs/ThreeExtensions.js"],
"sap/ui/vk/threejs/SceneBuilder.js":["jquery.sap.global.js","sap/base/Log.js","sap/ui/vk/AnimationPlayback.js","sap/ui/vk/BillboardBorderLineStyle.js","sap/ui/vk/BillboardCoordinateSpace.js","sap/ui/vk/BillboardHorizontalAlignment.js","sap/ui/vk/BillboardStyle.js","sap/ui/vk/BillboardTextEncoding.js","sap/ui/vk/DetailViewShape.js","sap/ui/vk/DetailViewType.js","sap/ui/vk/LeaderLineMarkStyle.js","sap/ui/vk/ObjectType.js","sap/ui/vk/RenderMode.js","sap/ui/vk/View.js","sap/ui/vk/thirdparty/ie-polyfills.js","sap/ui/vk/threejs/AnimationHelper.js","sap/ui/vk/threejs/AnimationSequence.js","sap/ui/vk/threejs/BBoxSubdivider.js","sap/ui/vk/threejs/Billboard.js","sap/ui/vk/threejs/Callout.js","sap/ui/vk/threejs/DetailView.js","sap/ui/vk/threejs/Material.js","sap/ui/vk/threejs/OrthographicCamera.js","sap/ui/vk/threejs/PerspectiveCamera.js","sap/ui/vk/threejs/Thrustline.js","sap/ui/vk/threejs/UsageCounter.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/totara/TotaraUtils.js"],
"sap/ui/vk/threejs/Texture.js":["sap/ui/vk/Texture.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/ThreeExtensions.js":["sap/ui/vk/ObjectType.js","sap/ui/vk/abgrToColor.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/Thrustline.js":["jquery.sap.global.js","sap/ui/base/ManagedObject.js","sap/ui/vk/LeaderLineMarkStyle.js","sap/ui/vk/threejs/PolylineGeometry.js","sap/ui/vk/threejs/PolylineMaterial.js","sap/ui/vk/threejs/PolylineMesh.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/UsageCounter.js":["sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/ViewStateManager.js":["sap/ui/core/Element.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/ObjectType.js","sap/ui/vk/ViewStateManagerBase.js","sap/ui/vk/abgrToColor.js","sap/ui/vk/colorToABGR.js","sap/ui/vk/colorToCSSColor.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/threejs/Scene.js","sap/ui/vk/threejs/ThreeExtensions.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/Viewport.js":["jquery.sap.global.js","sap/ui/base/ManagedObjectObserver.js","sap/ui/core/ResizeHandler.js","sap/ui/events/KeyCodes.js","sap/ui/vk/AnimationTrackType.js","sap/ui/vk/CameraFOVBindingType.js","sap/ui/vk/CameraProjectionType.js","sap/ui/vk/ContentConnector.js","sap/ui/vk/Loco.js","sap/ui/vk/Messages.js","sap/ui/vk/RenderMode.js","sap/ui/vk/SelectionMode.js","sap/ui/vk/ViewStateManager.js","sap/ui/vk/ViewportBase.js","sap/ui/vk/VisibilityMode.js","sap/ui/vk/ZoomTo.js","sap/ui/vk/cssColorToColor.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/AnimationHelper.js","sap/ui/vk/threejs/AnimationTimeController.js","sap/ui/vk/threejs/ContentDeliveryService.js","sap/ui/vk/threejs/NodesTransitionHelper.js","sap/ui/vk/threejs/OrthographicCamera.js","sap/ui/vk/threejs/PerspectiveCamera.js","sap/ui/vk/threejs/Scene.js","sap/ui/vk/threejs/ViewStateManager.js","sap/ui/vk/threejs/ViewportGestureHandler.js","sap/ui/vk/threejs/ViewportRenderer.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/threejs/ViewportGestureHandler.js":["jquery.sap.global.js","sap/ui/base/EventProvider.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/OrthographicCamera.js","sap/ui/vk/threejs/PerspectiveCamera.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/tools/AnchorPointTool.js":["sap/ui/vk/tools/AnchorPointToolGizmo.js","sap/ui/vk/tools/AnchorPointToolHandler.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/AnchorPointToolGizmo.js":["jquery.sap.global.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/AnchorPointToolGizmoRenderer.js","sap/ui/vk/tools/AxisColours.js","sap/ui/vk/tools/CoordinateSystem.js","sap/ui/vk/tools/Gizmo.js"],
"sap/ui/vk/tools/AnchorPointToolHandler.js":["sap/m/Menu.js","sap/m/MenuItem.js","sap/ui/base/EventProvider.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/thirdparty/three.js"],
"sap/ui/vk/tools/CrossSectionTool.js":["sap/ui/vk/tools/CrossSectionToolGizmo.js","sap/ui/vk/tools/CrossSectionToolHandler.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/CrossSectionToolGizmo.js":["jquery.sap.global.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/AxisColours.js","sap/ui/vk/tools/Gizmo.js"],
"sap/ui/vk/tools/CrossSectionToolHandler.js":["sap/ui/base/EventProvider.js"],
"sap/ui/vk/tools/Gizmo.js":["sap/m/Input.js","sap/m/Label.js","sap/m/library.js","sap/ui/core/Control.js","sap/ui/core/library.js","sap/ui/vk/library.js","sap/ui/vk/tools/AxisColours.js","sap/ui/vk/tools/CoordinateSystem.js"],
"sap/ui/vk/tools/HitTestTool.js":["sap/ui/vk/tools/HitTestIdMode.js","sap/ui/vk/tools/HitTestToolHandler.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/HitTestToolHandler.js":["sap/ui/base/EventProvider.js","sap/ui/vk/tools/HitTestClickType.js"],
"sap/ui/vk/tools/MoveTool.js":["sap/ui/vk/tools/CoordinateSystem.js","sap/ui/vk/tools/MoveToolGizmo.js","sap/ui/vk/tools/MoveToolHandler.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/MoveToolGizmo.js":["jquery.sap.global.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/AxisColours.js","sap/ui/vk/tools/CoordinateSystem.js","sap/ui/vk/tools/Gizmo.js","sap/ui/vk/tools/MoveToolGizmoRenderer.js"],
"sap/ui/vk/tools/MoveToolHandler.js":["sap/m/Menu.js","sap/m/MenuItem.js","sap/ui/base/EventProvider.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/CoordinateSystem.js"],
"sap/ui/vk/tools/RectSelectTool.js":["sap/ui/vk/Loco.js","sap/ui/vk/tools/RectSelectToolHandler.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/RectSelectToolHandler.js":["sap/ui/base/EventProvider.js"],
"sap/ui/vk/tools/RotateOrbitTool.js":["sap/ui/vk/helpers/RotateOrbitHelperDvl.js","sap/ui/vk/helpers/RotateOrbitHelperThree.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/RotateTool.js":["sap/ui/vk/tools/CoordinateSystem.js","sap/ui/vk/tools/RotateToolGizmo.js","sap/ui/vk/tools/RotateToolHandler.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/RotateToolGizmo.js":["jquery.sap.global.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/AxisColours.js","sap/ui/vk/tools/CoordinateSystem.js","sap/ui/vk/tools/Gizmo.js","sap/ui/vk/tools/RotateToolGizmoRenderer.js"],
"sap/ui/vk/tools/RotateToolHandler.js":["sap/m/Menu.js","sap/m/MenuItem.js","sap/ui/base/EventProvider.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/CoordinateSystem.js"],
"sap/ui/vk/tools/RotateTurntableTool.js":["sap/ui/vk/helpers/RotateTurntableHelperDvl.js","sap/ui/vk/helpers/RotateTurntableHelperThree.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/ScaleTool.js":["sap/ui/vk/tools/CoordinateSystem.js","sap/ui/vk/tools/ScaleToolGizmo.js","sap/ui/vk/tools/ScaleToolHandler.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/ScaleToolGizmo.js":["jquery.sap.global.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/AxisColours.js","sap/ui/vk/tools/CoordinateSystem.js","sap/ui/vk/tools/Gizmo.js","sap/ui/vk/tools/ScaleToolGizmoRenderer.js"],
"sap/ui/vk/tools/ScaleToolHandler.js":["sap/m/Menu.js","sap/m/MenuItem.js","sap/ui/base/EventProvider.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/CoordinateSystem.js"],
"sap/ui/vk/tools/SceneOrientationTool.js":["sap/ui/vk/tools/SceneOrientationToolGizmo.js","sap/ui/vk/tools/Tool.js"],
"sap/ui/vk/tools/SceneOrientationToolGizmo.js":["sap/m/Menu.js","sap/m/MenuButton.js","sap/m/MenuItem.js","sap/ui/vk/getResourceBundle.js","sap/ui/vk/threejs/thirdparty/three.js","sap/ui/vk/tools/AxisColours.js","sap/ui/vk/tools/Gizmo.js","sap/ui/vk/tools/PredefinedView.js","sap/ui/vk/tools/SceneOrientationToolGizmoRenderer.js"],
"sap/ui/vk/tools/Tool.js":["sap/ui/core/Element.js"],
"sap/ui/vk/tools/TooltipTool.js":["sap/ui/vk/tools/Tool.js","sap/ui/vk/tools/TooltipToolGizmo.js","sap/ui/vk/tools/TooltipToolHandler.js"],
"sap/ui/vk/tools/TooltipToolGizmo.js":["sap/ui/vk/tools/Gizmo.js","sap/ui/vk/tools/TooltipToolGizmoRenderer.js"],
"sap/ui/vk/tools/TooltipToolHandler.js":["sap/ui/base/EventProvider.js"],
"sap/ui/vk/totara/GeometryFactory.js":["sap/ui/vk/totara/IndexCompressor.js"],
"sap/ui/vk/totara/RequestQueue.js":["sap/ui/vk/totara/Command.js","sap/ui/vk/totara/TotaraUtils.js"],
"sap/ui/vk/totara/SceneContext.js":["sap/base/Log.js","sap/ui/vk/totara/CallbackHandler.js","sap/ui/vk/totara/GeometryFactory.js","sap/ui/vk/totara/ProgressCounter.js","sap/ui/vk/totara/RequestQueue.js","sap/ui/vk/totara/TotaraUtils.js"],
"sap/ui/vk/totara/TotaraLoader.js":["sap/base/Log.js","sap/ui/thirdparty/URI.js","sap/ui/vk/threejs/SceneBuilder.js","sap/ui/vk/totara/CallbackHandler.js","sap/ui/vk/totara/Command.js","sap/ui/vk/totara/SceneContext.js","sap/ui/vk/totara/TotaraUtils.js"],
"sap/ui/vk/totara/TotaraUtils.js":["sap/ui/vk/totara/Command.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map