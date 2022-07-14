/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/macros/ResourceModel","sap/base/Log","sap/fe/core/CommonUtils","sap/ui/util/openWindow","sap/ui/mdc/enum/ConditionValidated","sap/fe/macros/FieldAPI"],function(R,L,C,o,a,F){"use strict";var b={formatDraftOwnerTextInPopover:function(h,d,D,s,c){if(h){var u=s||d||c||D;if(!u){return R.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_UNSAVED_CHANGES_BY_UNKNOWN");}else{return d?R.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_LOCKED_BY_KNOWN",u):R.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_UNSAVED_CHANGES_BY_KNOWN",u);}}else{return R.getText("M_FIELD_RUNTIME_DRAFT_POPOVER_NO_DATA_TEXT");}},onDataFieldWithNavigationPath:function(s,c,S){var B=s.getBindingContext();if(c.routing){c._routing.navigateToTarget(B,S);}else{L.error("FieldRuntime: No routing listener controller extension found. Internal navigation aborted.","sap.fe.macros.field.FieldRuntime","onDataFieldWithNavigationPath");}},hasTargets:function(s,S){return s?s:false;},handleChange:function(c,e){var s=e.getSource(),i=s&&s.getBindingContext().isTransient(),p=e.getParameter("promise")||Promise.resolve(),S=e.getSource(),v=e.getParameter("valid"),f;p.then(function(){e.oSource=S;e.mParameters={valid:v};F.handleChange(e,c);}).catch(function(E){e.oSource=S;e.mParameters={valid:false};F.handleChange(e,c);});if(c.isA("sap.fe.core.ExtensionAPI")){f=c._controller;}else{f=c;}f._editFlow.syncTask(p);if(i){return;}f.sideEffects.handleFieldChange(e,p);},getFieldStateOnChange:function(e){var s=e.getSource(),f={},_=function(B){return B&&B.getDataState()?B.getDataState().getInvalidValue()===undefined:true;};if(s.isA("sap.fe.macros.FieldAPI")){s=s.getContent();}if(s.isA("sap.fe.core.controls.FieldWrapper")&&s.getEditMode()==="Editable"){s=s.getContentEdit()[0];}if(s.isA("sap.ui.mdc.Field")){var i=e.getParameter("valid")||e.getParameter("isValid");if(i===undefined){if(s.getMaxConditions()===1){var v=s.getBindingInfo("value");i=_(v&&v.binding);}if(s.getValue()===""&&!s.getProperty("required")){i=true;}}f={fieldValue:s.getValue(),validity:!!i};}else{var B=s.getBinding("value")||s.getBinding("selected");f={fieldValue:B&&B.getValue(),validity:_(B)};}return{field:s,state:f};},_fnSetFieldWidth:function(f){var _=function(f,A,v){var c=A?A.getDomRef():undefined;var w=0;if(c){w=parseInt(getComputedStyle(c).marginRight,10)+parseInt(getComputedStyle(c).marginLeft,10)+A.getDomRef().offsetWidth;}var V=v.getDomRef().offsetWidth;var i=V-w;f.getModel("internal").setProperty("/QuickViewLinkContainerWidth",i+"px");};var A=f.findElements(true,function(e){return e.isA("sap.m.Avatar");})[0];var v=f.findElements(true,function(e){return e.isA("sap.m.VBox");})[0];if(v.getDomRef().offsetWidth===0){v.onAfterRendering=function(){_(f,A,v);};}else{_(f,A,v);}},popoverAfterOpen:function(e){var l=e.getSource();if(l.getDependents()&&l.getDependents().length>0){var f=l.getDependents()[0];if(f&&f.isA("sap.m.ResponsivePopover")){b._fnSetFieldWidth(f);}}},LinkModelContextChange:function(e){var l=e.getSource();if(!l.getModel()||!l.getBindingContext()){return;}var s,v,p;var S,c,m,M,d,f,g,h,V,I,A,j,k;var _=function(e,q){S=e&&e.getSource();c=l&&l.getBindingPath("text");m=l&&l.getModel();M=m&&m.getMetaModel();d=M&&M.getMetaPath(l.getBindingContext());f=d+"/"+c;g=q||(S&&S.getValue());V=l&&sap.ui.fl.Utils.getViewForControl(l);I=V&&V.getBindingContext("internal");A=V&&C.getAppComponent(V);j=A&&A.getShellServices();p=j&&j.getLinksWithCache([[{semanticObject:g}]]);h=M&&M.getObject(f+"@com.sap.vocabularies.Common.v1.SemanticObjectUnavailableActions");k=j&&j.hrefForExternal();if(k&&k.indexOf("?")!==-1){k=k.split("?")[0];}C.updateSemanticTargets([p],[{semanticObject:g,path:f}],I,k).then(function(r){var t=l.getParent();if(t&&t.isA("sap.fe.core.controls.ConditionalWrapper")){if(r&&r[g]){var u=false,T,w,x=Object.keys(r[g]);for(var P=0;P<x.length;P++){T=x[P];w=r[g]&&r[g][T];if(w&&w.path&&w.path===f){u=w[!h?"HasTargetsNotFiltered":"HasTargets"];t.setCondition(!!u);break;}}}}}).catch(function(E){L.error("LinkModelContextChange: Cannot update Semantic Targets model",E);});};var n=l.getCustomData();if(n&&n.length>0){for(var i=0;i<n.length;i++){s=n[i].getValue();if(!s){v=n[i].getBinding("value");if(v){v.attachEventOnce("change",_);}}_(null,s);}}},pressLink:function(e){var l=e.getSource();if(l.getDependents()&&l.getDependents().length>0){var f=l.getDependents()[0];if(f&&f.isA("sap.ui.mdc.Link")){f.getTriggerHref().then(function(h){if(!h){f.open(l).then(function(){b._fnSetFieldWidth(f);}).catch(function(E){L.error("Cannot retrieve the QuickView Popover dialog",E);});}else{var v=sap.ui.fl.Utils.getViewForControl(l);var A=C.getAppComponent(v);var s=A.getShellServices();var S=s.parseShellHash(h);var n={target:{semanticObject:S.semanticObject,action:S.action},params:S.params};if(C.isStickyEditMode(l)!==true){s.toExternal(n,A);}else{var N=s.hrefForExternal(n,A,false);o(N);}}}).catch(function(E){L.error("Error triggering link Href",E);});}}}};return b;},true);
