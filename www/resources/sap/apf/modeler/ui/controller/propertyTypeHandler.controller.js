/*!
 * SAP APF Analysis Path Framework
 * 
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(['sap/apf/modeler/ui/utils/constants','sap/apf/modeler/ui/utils/propertyTypeFactory','sap/apf/modeler/ui/utils/nullObjectChecker','sap/apf/modeler/ui/utils/propertyTypeState',"sap/apf/modeler/ui/utils/propertyTypeOrchestration"],function(M,p,n,P,a){'use strict';function _(o,e){e.attachEvent(M.events.ADDPROPERTY,o.handlePressOfAdd.bind(o));e.attachEvent(M.events.REMOVEPROPERTY,o.handlePressOfRemove.bind(o));e.attachEvent(M.events.SETNEXTPROPERTYINPARENTOBJECT,e.getController().setNextPropertyInParentObject.bind(e.getController()));o.getView().attachEvent(M.events.SETNEXTPROPERTYINPARENTOBJECT,e.getController().setNextPropertyInParentObject.bind(e.getController()));e.attachEvent(M.events.REMOVECURRENTPROPERTYFROMPARENTOBJECT,e.getController().removePropertyFromParentObject.bind(e.getController()));e.attachEvent(M.events.REMOVEPROPERTYFROMPARENTOBJECT,e.getController().removePropertyFromParentObject.bind(e.getController()));e.attachEvent(M.events.UPDATEPROPERTYVALUESTATE,o.updatePropertyValueState.bind(o));e.attachEvent(M.events.FOCUSONREMOVE,o.handleFocusOnRemove.bind(o));e.attachEvent(M.events.SETFOCUSONREMOVEICON,e.getController().setFocusOnAddRemoveIcons.bind(e.getController()));}function b(C,o){var e=[];var f=C.getView().getViewData().aPropertiesToBeCreated;f.forEach(function(g){var v=c(C,g,C.nCounter,o);e.push(v.getController().initPromise);});C.initPromise=jQuery.when.apply(jQuery,e);}function c(C,o,e,f){var v=jQuery.extend(true,{},C.getView().getViewData().oViewDataForPropertyType);v.oPropertyTypeState=C.oPropertyTypeState;v.oPropertyTypeData=o;v.oPropertyOrchestration=f;v.oPropertyTypeHandlerBackLink=C;var V=C.createId("id"+v.sPropertyType+"View"+C.nCounter);C.oPropertyTypeState.addPropertyAt(o.sProperty,e);C.oPropertyTypeState.addPropertyTypeViewIdAt(V,e);var g=p.createPropertyTypeView(v,V);if(f){f.addPropertyTypeReference(V,o,v.sPropertyType,g);}_(C,g);C.byId("idPropertyTypeVBox").insertItem(g,e);C.nCounter++;return g;}var d=sap.ui.controller("sap.apf.modeler.ui.controller.propertyTypeHandler",{_apfName:"propertyTypeHandler",nCounter:0,oPropertyTypeState:{},initPromise:undefined,oPropertyOrchestration:undefined,onInit:function(){var C=this;C.oPropertyOrchestration=C.getView().getViewData().oPropertyOrchestration;C.oPropertyTypeState=new P();b(C,C.oPropertyOrchestration);if(C.oPropertyOrchestration){C.oPropertyOrchestration.updateAllSelectControlsForPropertyType();}},handlePressOfAdd:function(e){var C=this,o={},v;var s=e.getParameter("oSourceView");var f=C.getView().getViewData().oPropertyOrchestration;var g=f.getPropertyTypeRow(s.getId()).sPropertyType;var h=a._mapPropertyType2AggregationRole(g);var i=C.byId("idPropertyTypeVBox").indexOfItem(s)+1;var r=C.getView().getViewData().oViewDataForPropertyType.oParentObject.getId();var S=C.getView().getViewData().oViewDataForPropertyType.oStepPropertyMetadataHandler;var j=S.oStep;var k=j.getType()==="hierarchicalStep";if(k&&g===M.propertyTypes.REPRESENTATIONSORT){h=M.aggregationRoles.MEASURE;}a.getConsumableAndAvailablePropertiesAsPromise(r,h,S).then(function(A){var l=a._relativeComplement(A.available,f.getSelectedProperties());var m=l[0];o.sProperty=m;o.sContext=f.getPropertyTypeRow(s.getId()).propertyRowInformation.sContext;if(n.checkIsNotUndefined(o.sProperty)){v=c(C,o,i,f);v.getController().setNextPropertyInParentObject();}return f.updateAllSelectControlsForPropertyType();});},handleFocusOnRemove:function(e){var C=this;var v=C.byId("idPropertyTypeVBox");var s=e.getSource();var f=v.indexOfItem(s);var F=C.byId(C.oPropertyTypeState.aPropertyTypeViewIds[f-1]);F.fireEvent(M.events.SETFOCUSONREMOVEICON);},handlePressOfRemove:function(e){var C=this;var s=e.oSourceView||e.getSource();var v=C.byId("idPropertyTypeVBox");var f=v.indexOfItem(s);C.oPropertyTypeState.removePropertyAt(f);C.oPropertyTypeState.removePropertyTypeViewIdAt(f);v.removeItem(s);},updatePropertyValueState:function(e){var C=this;var s=e.getSource();var f=e.getParameter("sProperty");var g=C.byId("idPropertyTypeVBox").indexOfItem(s);C.oPropertyTypeState.updatePropertyAt(f,g);},handleRemoveOfProperty:function(){var C=this;var v=C.byId("idPropertyTypeVBox");if(n.checkIsNotUndefined(v)){v.getItems().forEach(function(o){o.fireEvent(M.events.REMOVEPROPERTYFROMPARENTOBJECT);});}},handleSettingTopNProperties:function(){var C=this;C.getView().fireEvent(M.events.SETNEXTPROPERTYINPARENTOBJECT);}});return d;},true);