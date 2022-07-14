//@ui5-bundle sap/fe/templates/library-h2-preload.js
/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.predefine('sap/fe/templates/library',["sap/ui/core/Core","sap/ui/core/library","sap/fe/core/library","sap/f/library","sap/fe/macros/library","sap/fe/common/library"],function(){"use strict";sap.ui.getCore().initLibrary({name:"sap.fe.templates",dependencies:["sap.ui.core","sap.fe.core","sap.fe.macros","sap.fe.common","sap.f"],types:["sap.fe.templates.ObjectPage.SectionLayout"],interfaces:[],controls:[],elements:[],version:"1.93.3",noLibraryCSS:true});if(!sap.fe.templates.ObjectPage){sap.fe.templates.ObjectPage={};}sap.fe.templates.ObjectPage.SectionLayout={Page:"Page",Tabs:"Tabs"};return sap.fe.templates;});
sap.ui.require.preload({
	"sap/fe/templates/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.fe.templates","type":"library","embeds":["ObjectPage","ListReport","AnalyticalListPage"],"applicationVersion":{"version":"1.93.3"},"title":"UI5 library: sap.fe.templates","description":"UI5 library: sap.fe.templates","ach":"CA-UI5-FE","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":[]},"sap.ui5":{"dependencies":{"minUI5Version":"1.93","libs":{"sap.f":{"minVersion":"1.93.3"},"sap.fe.core":{"minVersion":"1.93.3"},"sap.m":{"minVersion":"1.93.3"},"sap.fe.macros":{"minVersion":"1.93.3"},"sap.suite.ui.microchart":{"minVersion":"1.93.3","lazy":true},"sap.ui.core":{"minVersion":"1.93.3"},"sap.ui.layout":{"minVersion":"1.93.3","lazy":true},"sap.ui.mdc":{"minVersion":"1.93.3","lazy":false},"sap.uxap":{"minVersion":"1.93.3","lazy":true},"sap.ui.fl":{"minVersion":"1.93.3"},"sap.collaboration":{"minVersion":"@version@"},"sap.fe.common":{"minVersion":"1.93.3"}}},"library":{"i18n":{"bundleUrl":"messagebundle.properties","supportedLocales":["","ar","bg","ca","cs","cy","da","de","el","en","en-GB","en-US-sappsd","en-US-saprigi","en-US-saptrc","es","es-MX","et","fi","fr","fr-CA","hi","hr","hu","id","it","iw","ja","kk","ko","lt","lv","ms","nl","no","pl","pt","pt-PT","ro","ru","sh","sk","sl","sv","th","tr","uk","vi","zh-CN","zh-TW"]},"css":false,"content":{"controls":[],"elements":[],"types":["sap.fe.templates.ObjectPage.SectionLayout"],"interfaces":[]}}}}'
},"sap/fe/templates/library-h2-preload"
);
sap.ui.loader.config({depCacheUI5:{
"sap/fe/templates/AnalyticalListPage/Component.js":["sap/fe/templates/ListComponent.js"],
"sap/fe/templates/AnalyticalListPage/chart/FEChartDelegate.js":["sap/fe/macros/ChartDelegate.js"],
"sap/fe/templates/ListComponent.js":["sap/fe/core/TemplateComponent.js","sap/fe/core/library.js"],
"sap/fe/templates/ListReport/Component.js":["sap/fe/templates/ListComponent.js"],
"sap/fe/templates/ListReport/ExtensionAPI.js":["sap/fe/core/ExtensionAPI.js","sap/fe/macros/filter/FilterUtils.js"],
"sap/fe/templates/ListReport/ListReport.view.xml":["sap/f/DynamicPage.js","sap/f/DynamicPageHeader.js","sap/f/DynamicPageTitle.js","sap/fe/templates/ListReport/ListReportController.controller.js","sap/m/Text.js","sap/m/ToolbarSpacer.js","sap/m/VBox.js","sap/ui/core/mvc/XMLView.js"],
"sap/fe/templates/ListReport/ListReportController.controller.js":["sap/base/Log.js","sap/base/util/ObjectPath.js","sap/fe/core/CommonUtils.js","sap/fe/core/PageController.js","sap/fe/core/controllerextensions/EditFlow.js","sap/fe/core/controllerextensions/IntentBasedNavigation.js","sap/fe/core/controllerextensions/InternalIntentBasedNavigation.js","sap/fe/core/controllerextensions/InternalRouting.js","sap/fe/core/controllerextensions/KPIManagement.js","sap/fe/core/controllerextensions/Share.js","sap/fe/core/controllerextensions/SideEffects.js","sap/fe/core/controllerextensions/ViewState.js","sap/fe/core/helpers/EditState.js","sap/fe/core/helpers/SemanticDateOperators.js","sap/fe/core/library.js","sap/fe/macros/CommonHelper.js","sap/fe/macros/DelegateUtil.js","sap/fe/macros/ResourceModel.js","sap/fe/macros/chart/ChartRuntime.js","sap/fe/macros/chart/ChartUtils.js","sap/fe/macros/field/FieldRuntime.js","sap/fe/macros/filter/FilterUtils.js","sap/fe/macros/table/Utils.js","sap/fe/macros/visualfilters/VisualFilterUtils.js","sap/fe/navigation/SelectionVariant.js","sap/fe/templates/ListReport/ExtensionAPI.js","sap/fe/templates/ListReport/overrides/IntentBasedNavigation.js","sap/fe/templates/ListReport/overrides/Share.js","sap/fe/templates/ListReport/overrides/ViewState.js","sap/fe/templates/RootContainer/overrides/EditFlow.js","sap/ui/Device.js","sap/ui/core/mvc/OverrideExecution.js","sap/ui/mdc/p13n/StateUtil.js","sap/ui/model/json/JSONModel.js"],
"sap/fe/templates/ListReport/overrides/IntentBasedNavigation.js":["sap/fe/core/CommonUtils.js","sap/fe/macros/filter/FilterUtils.js"],
"sap/fe/templates/ListReport/overrides/Share.js":["sap/base/Log.js","sap/fe/core/CommonUtils.js","sap/fe/core/helpers/SemanticDateOperators.js","sap/ui/core/routing/HashChanger.js"],
"sap/fe/templates/ListReport/overrides/ViewState.js":["sap/fe/core/CommonUtils.js","sap/fe/core/library.js","sap/fe/navigation/library.js","sap/ui/Device.js","sap/ui/fl/apply/api/ControlVariantApplyAPI.js","sap/ui/mdc/enum/ConditionValidated.js","sap/ui/mdc/p13n/StateUtil.js"],
"sap/fe/templates/ListReport/view/fragments/CollectionVisualization.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ListReport/view/fragments/CustomView.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ListReport/view/fragments/MultipleMode.fragment.xml":["sap/m/IconTabBar.js","sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/AnnotationHelper.js":["sap/fe/macros/CommonHelper.js","sap/ui/base/ManagedObject.js","sap/ui/model/odata/v4/AnnotationHelper.js"],
"sap/fe/templates/ObjectPage/Component.js":["sap/base/Log.js","sap/fe/core/CommonUtils.js","sap/fe/core/TemplateComponent.js","sap/fe/core/library.js","sap/fe/templates/ObjectPage/SectionLayout.js","sap/ui/model/odata/v4/ODataListBinding.js"],
"sap/fe/templates/ObjectPage/ExtensionAPI.js":["sap/fe/core/CommonUtils.js","sap/fe/core/ExtensionAPI.js","sap/fe/core/converters/helpers/ID.js"],
"sap/fe/templates/ObjectPage/ObjectPage.view.xml":["sap/fe/core/controls/CommandExecution.js","sap/fe/templates/ObjectPage/ObjectPageController.controller.js","sap/fe/templates/ObjectPage/view/fragments/FooterContent.fragment.xml","sap/fe/templates/ObjectPage/view/fragments/Section.fragment.xml","sap/ui/core/mvc/XMLView.js","sap/uxap/ObjectPageLayout.js"],
"sap/fe/templates/ObjectPage/ObjectPageController.controller.js":["sap/base/Log.js","sap/base/util/merge.js","sap/fe/core/BusyLocker.js","sap/fe/core/CommonUtils.js","sap/fe/core/PageController.js","sap/fe/core/controllerextensions/EditFlow.js","sap/fe/core/controllerextensions/IntentBasedNavigation.js","sap/fe/core/controllerextensions/InternalEditFlow.js","sap/fe/core/controllerextensions/InternalIntentBasedNavigation.js","sap/fe/core/controllerextensions/InternalRouting.js","sap/fe/core/controllerextensions/MessageHandler.js","sap/fe/core/controllerextensions/PageReady.js","sap/fe/core/controllerextensions/Routing.js","sap/fe/core/controllerextensions/Share.js","sap/fe/core/controllerextensions/SideEffects.js","sap/fe/core/controllerextensions/ViewState.js","sap/fe/core/helpers/ModelHelper.js","sap/fe/macros/CommonHelper.js","sap/fe/macros/DelegateUtil.js","sap/fe/macros/chart/ChartRuntime.js","sap/fe/macros/table/Utils.js","sap/fe/navigation/SelectionVariant.js","sap/fe/templates/ObjectPage/ExtensionAPI.js","sap/fe/templates/ObjectPage/overrides/IntentBasedNavigation.js","sap/fe/templates/ObjectPage/overrides/InternalRouting.js","sap/fe/templates/ObjectPage/overrides/MessageHandler.js","sap/fe/templates/ObjectPage/overrides/Routing.js","sap/fe/templates/ObjectPage/overrides/Share.js","sap/fe/templates/ObjectPage/overrides/ViewState.js","sap/fe/templates/RootContainer/overrides/EditFlow.js","sap/m/InstanceManager.js","sap/m/Link.js","sap/m/MessageBox.js","sap/ui/core/mvc/OverrideExecution.js"],
"sap/fe/templates/ObjectPage/controls/StashableHBox.js":["sap/m/HBox.js","sap/m/HBoxRenderer.js","sap/ui/core/StashedControlSupport.js"],
"sap/fe/templates/ObjectPage/controls/StashableVBox.js":["sap/m/VBox.js","sap/m/VBoxRenderer.js","sap/ui/core/StashedControlSupport.js"],
"sap/fe/templates/ObjectPage/controls/SubSectionBlock.js":["sap/uxap/BlockBase.js"],
"sap/fe/templates/ObjectPage/flexibility/StashableHBox.flexibility.js":["sap/ui/fl/changeHandler/BaseRename.js"],
"sap/fe/templates/ObjectPage/overrides/IntentBasedNavigation.js":["sap/fe/core/CommonUtils.js","sap/fe/navigation/SelectionVariant.js"],
"sap/fe/templates/ObjectPage/overrides/InternalRouting.js":["sap/fe/core/CommonUtils.js","sap/fe/navigation/SelectionVariant.js"],
"sap/fe/templates/ObjectPage/overrides/Routing.js":["sap/fe/core/CommonUtils.js","sap/fe/navigation/SelectionVariant.js"],
"sap/fe/templates/ObjectPage/overrides/Share.js":["sap/base/Log.js","sap/fe/core/helpers/ModelHelper.js","sap/fe/core/helpers/SemanticKeyHelper.js","sap/ui/core/routing/HashChanger.js","sap/ui/model/Filter.js","sap/ui/model/FilterOperator.js"],
"sap/fe/templates/ObjectPage/overrides/ViewState.js":["sap/fe/core/library.js"],
"sap/fe/templates/ObjectPage/templating/ObjectPageTemplating.js":["sap/fe/core/CommonUtils.js","sap/fe/core/converters/helpers/BindingHelper.js","sap/fe/core/helpers/BindingExpression.js","sap/fe/core/templating/EntitySetHelper.js","sap/fe/macros/field/FieldTemplating.js"],
"sap/fe/templates/ObjectPage/view/fragments/Actions.fragment.xml":["sap/fe/templates/ObjectPage/view/fragments/RelatedApps.fragment.xml","sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/EditableHeaderFacet.fragment.xml":["sap/m/Label.js","sap/ui/core/Fragment.js","sap/ui/layout/form/ColumnElementData.js","sap/ui/layout/form/ColumnLayout.js","sap/ui/layout/form/Form.js","sap/ui/layout/form/FormContainer.js","sap/ui/layout/form/FormElement.js"],
"sap/fe/templates/ObjectPage/view/fragments/FooterContent.fragment.xml":["sap/fe/common/MessageButton.js","sap/m/OverflowToolbar.js","sap/m/ToolbarSpacer.js","sap/ui/core/Fragment.js","sap/ui/core/InvisibleText.js"],
"sap/fe/templates/ObjectPage/view/fragments/FormActionButtons.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/FormActions.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/HeaderContent.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/HeaderDataPoint.fragment.xml":["sap/fe/templates/ObjectPage/view/fragments/HeaderDataPointTitle.fragment.xml","sap/m/VBox.js","sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/HeaderDataPointTitle.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/HeaderFacet.fragment.xml":["sap/fe/templates/ObjectPage/controls/StashableHBox.js","sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/HeaderFacetCustomContainer.fragment.xml":["sap/fe/templates/ObjectPage/controls/StashableHBox.js","sap/m/VBox.js","sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/HeaderImage.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/ObjectPageHeaderAddress.fragment.xml":["sap/m/Text.js","sap/m/Title.js","sap/m/VBox.js","sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/ObjectPageHeaderForm.fragment.xml":["sap/m/VBox.js","sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/RelatedApps.fragment.xml":["sap/m/Menu.js","sap/m/MenuButton.js","sap/m/MenuItem.js","sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/Section.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/SectionContent.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/SectionCustomSection.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/SectionFormContent.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/SectionMoreFormContent.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/SectionPresentationVisualization.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/SideContentCustomContainer.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/ObjectPage/view/fragments/TitleAndSubtitle.fragment.xml":["sap/m/Title.js","sap/m/VBox.js","sap/ui/core/Fragment.js"],
"sap/fe/templates/RootContainer/controller/Fcl.controller.js":["sap/base/Log.js","sap/f/FlexibleColumnLayoutSemanticHelper.js","sap/fe/core/controllerextensions/ViewState.js","sap/fe/templates/RootContainer/controller/RootContainerBaseController.js","sap/m/Link.js","sap/m/MessageBox.js","sap/m/MessagePage.js","sap/ui/core/Component.js","sap/ui/model/json/JSONModel.js"],
"sap/fe/templates/RootContainer/controller/NavContainer.controller.js":["sap/fe/core/CommonUtils.js","sap/fe/core/controllerextensions/ViewState.js","sap/fe/templates/RootContainer/controller/RootContainerBaseController.js","sap/m/Link.js","sap/m/MessageBox.js","sap/m/MessagePage.js","sap/ui/model/json/JSONModel.js"],
"sap/fe/templates/RootContainer/controller/RootContainerBaseController.js":["sap/base/Log.js","sap/fe/core/BaseController.js","sap/fe/core/CommonUtils.js","sap/fe/core/controllerextensions/Placeholder.js","sap/fe/macros/SizeHelper.js","sap/ui/base/BindingParser.js","sap/ui/core/Component.js","sap/ui/core/routing/HashChanger.js","sap/ui/model/json/JSONModel.js","sap/ui/model/odata/v4/AnnotationHelper.js"],
"sap/fe/templates/RootContainer/view/Fcl.view.xml":["sap/f/FlexibleColumnLayout.js","sap/fe/templates/RootContainer/controller/Fcl.controller.js","sap/ui/core/mvc/XMLView.js"],
"sap/fe/templates/RootContainer/view/NavContainer.view.xml":["sap/fe/templates/RootContainer/controller/NavContainer.controller.js","sap/m/NavContainer.js","sap/ui/core/mvc/XMLView.js"],
"sap/fe/templates/RootContainer/view/PlaceholderLR.view.xml":["sap/fe/templates/RootContainer/controller/Placeholder.controller.js","sap/ui/core/mvc/XMLView.js"],
"sap/fe/templates/RootContainer/view/PlaceholderOP.view.xml":["sap/fe/templates/RootContainer/controller/Placeholder.controller.js","sap/ui/core/mvc/XMLView.js"],
"sap/fe/templates/controls/Chart.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/controls/OverflowToolbarButtonHover.js":["sap/m/OverflowToolbarButton.js"],
"sap/fe/templates/controls/Paginator.control.xml":["sap/m/HBox.js","sap/ui/core/XMLComposite.js","sap/uxap/ObjectPageHeaderActionButton.js"],
"sap/fe/templates/controls/Paginator.js":["sap/ui/base/ManagedObjectObserver.js","sap/ui/core/XMLComposite.js","sap/ui/model/json/JSONModel.js","sap/ui/model/resource/ResourceModel.js"],
"sap/fe/templates/controls/Table.fragment.xml":["sap/ui/core/Fragment.js"],
"sap/fe/templates/library.js":["sap/f/library.js","sap/fe/common/library.js","sap/fe/core/library.js","sap/fe/macros/library.js","sap/ui/core/Core.js","sap/ui/core/library.js"]
}});
//# sourceMappingURL=library-h2-preload.js.map