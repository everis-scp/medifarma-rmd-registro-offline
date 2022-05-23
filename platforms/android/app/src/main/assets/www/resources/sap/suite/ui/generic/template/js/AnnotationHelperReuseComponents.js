sap.ui.define(["sap/suite/ui/generic/template/extensionAPI/UIMode"],function(U){"use strict";function f(r,S){return(r.componentName||r.componentUsage)+"::"+r.id+"::"+S;}function g(r){return"!${_templPriv>/generic/embeddedComponents/"+r.id+"/hidden}";}function a(i,E,r,R,A){var t=i.getInterface(0),m=t.getModel(),o=E.entityType?m.getODataEntityType(E.entityType):R.oEntityType;var n=r.binding;if(n){var j=m.getODataAssociationSetEnd(o,n);if(j&&j.entitySet){E=m.getODataEntitySet(j.entitySet);o=m.getODataEntityType(E.entityType);}}var S=E?sap.ui.model.odata.AnnotationHelper.format(t,E["com.sap.vocabularies.Common.v1.SemanticObject"]):R.semanticObject;var O="";if(o&&o.key){o.key.propertyRef.forEach(function(l){O+="{"+l.name+"}::";});O=O.replace(/::$/,"");}var k={"uiMode":"{= ${ui>/createMode} ? '"+U.Create+"' : ( ${ui>/editable} ? '"+U.Edit+"' : '"+U.Display+"') }","semanticObject":S||"","stIsAreaVisible":A?"{= ${_templPriv>/generic/isActive} && !!${_templPriv>/generic/embeddedComponents/"+r.id+"/isInVisibleArea} && "+g(r)+" }":"{_templPriv>/generic/isActive}"};if(r){Object.assign(k,r.settings);var v=JSON.stringify(k);v=v.replace(/\}/g,"\\}").replace(/\{/g,"\\{");return v;}}function b(i,E,r,R){return a(i,E,r,R,true);}b.requiresIContext=true;function c(i,E,r,R){return a(i,E,r,R,false);}c.requiresIContext=true;function d(C,F){if(F){if(F.ID&&F.RecordType==="com.sap.vocabularies.UI.v1.CollectionFacet"){return F.ID.String===C.leadingSectionIdOrPath;}else if(!F.ID&&F.RecordType==="com.sap.vocabularies.UI.v1.ReferenceFacet"){return F.Target.AnnotationPath===C.leadingSectionIdOrPath;}}return false;}function e(r){if(r){var m=r.getModel();var l={};var R=r.getObject();l.componentId=R.id;l.isGroupedComponent=R.leadingSectionIdOrPath?true:false;m.setProperty("/leadingComponentContext",l);return"/leadingComponentContext";}}function s(r){if(!r.leadingSectionIdOrPath){return r.groupTitle?r.groupTitle:r.title;}else{return r.title;}}function h(r,C){if(!C.leadingSectionIdOrPath){return true;}else{for(var i=0;i<Object.keys(r).length;i++){if(r[Object.keys(r)[i]].id===C.leadingSectionIdOrPath){return r[Object.keys(r)[i]].leadingSectionIdOrPath?true:false;}}}}return{formatIdComponentSection:function(r){return f(r,"ComponentSection");},formatIdComponentSubSection:function(r){return f(r,"ComponentSubSection");},formatIdComponentContainer:function(r){return f(r,"ComponentContainer");},formatVisibleComponentSection:function(r){return"{= "+g(r)+" }";},formatComponentSettingsSubSection:b,formatComponentSettingsCanvas:c,checkEmbeddedSubSectionExists:d,checkParentExsists:e,checkEmbeddedSectionisLeading:h,setComponentSectionTitle:s};},true);
