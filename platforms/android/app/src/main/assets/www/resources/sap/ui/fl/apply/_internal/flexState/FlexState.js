/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/base/util/merge","sap/base/util/ObjectPath","sap/base/Log","sap/ui/core/Component","sap/ui/fl/apply/_internal/flexState/appDescriptorChanges/prepareAppDescriptorMap","sap/ui/fl/apply/_internal/flexState/changes/prepareChangesMap","sap/ui/fl/apply/_internal/flexState/compVariants/prepareCompVariantsMap","sap/ui/fl/apply/_internal/flexState/controlVariants/prepareVariantsMap","sap/ui/fl/apply/_internal/flexState/Loader","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/LayerUtils","sap/ui/fl/Utils"],function(e,m,O,L,C,p,a,b,c,d,M,S,f,U){"use strict";var F={};var _={};var g={};var h={};var i={appDescriptorChanges:{prepareFunction:p,pathInResponse:[]},changes:{prepareFunction:a,pathInResponse:["changes"]},variants:{prepareFunction:c,pathInResponse:["variants","variantChanges","variantDependentControlChanges","variantManagementChanges"]},compVariants:{prepareFunction:b,pathInResponse:["comp.variants","comp.standardVariants","comp.defaultVariants","comp.changes"]}};var j={};function u(P){var D=C.get(P.componentId);_[P.reference].componentData=D?D.getComponentData():P.componentData;}function k(P){var D=C.get(P.componentId);P.componentData=P.componentData||D.getComponentData()||{};P.manifest=P.manifest||P.rawManifest||D.getManifestObject();P.reference=P.reference||M.getFlexReference(P);}function l(R,D){if(!_[R]){throw new Error("State is not yet initialized");}if(!_[R].preparedMaps[D]){var P={unfilteredStorageResponse:_[R].unfilteredStorageResponse,storageResponse:_[R].storageResponse,componentId:_[R].componentId,componentData:_[R].componentData};_[R].preparedMaps[D]=F.callPrepareFunction(D,P);}return _[R].preparedMaps[D];}function n(R){return l(R,"appDescriptorChanges");}function o(R){return l(R,"changes");}function q(R){return l(R,"variants");}function r(R){return l(R,"compVariants");}function s(P){if(P.reference.endsWith(".Component")){var D=P.reference.split(".");D.pop();var R=D.join(".");_[R]=m({},{storageResponse:{changes:S.getEmptyFlexDataResponse()},unfilteredStorageResponse:{changes:S.getEmptyFlexDataResponse()},preparedMaps:{},componentId:P.componentId,partialFlexState:P.partialFlexState});h[R]=h[P.reference];}}function t(R){var D=m({},R);var E=D.changes;if(f.isLayerFilteringRequired()){e(i,function(I,G){G.pathInResponse.forEach(function(P){O.set(P,f.filterChangeDefinitionsByMaxLayer(O.get(P,E)),E);});});}return D;}function v(P){h[P.reference]=d.loadFlexData(P).then(function(R){_[P.reference]=m({},{unfilteredStorageResponse:R,preparedMaps:{},componentId:P.componentId,componentData:P.componentData,partialFlexState:P.partialFlexState});s(P);w(P.reference);return R;});return h[P.reference];}function w(R){U.ifUShellContainerThen(function(D){g[R]=y.bind(null,R);D[0].registerNavigationFilter(g[R]);},["ShellNavigation"]);}function x(R){U.ifUShellContainerThen(function(D){if(g[R]){D[0].unregisterNavigationFilter(g[R]);delete g[R];}},["ShellNavigation"]);}function y(R,N,D){return U.ifUShellContainerThen(function(E){try{var G=f.getMaxLayerTechnicalParameter(N);var P=f.getMaxLayerTechnicalParameter(D);if(G!==P){F.clearFilteredResponse(R);}}catch(H){L.error(H.message);}return E[0].NavigationFilterStatus.Continue;},["ShellNavigation"]);}function z(R){_[R].preparedMaps={};}function A(I){var D=_[I.reference];if(D.partialFlexState===true&&I.partialFlexState!==true){D.partialFlexState=false;I.partialFlexData=m({},D.unfilteredStorageResponse.changes);I.reInitialize=true;}return I;}function B(I){var D=_[I.reference].componentId;if(!I.reInitialize&&D!==I.componentId){I.reInitialize=true;}return I;}F.initialize=function(P){return Promise.resolve(P).then(function(I){k(I);var D=I.reference;if(h[D]){return h[D].then(A.bind(null,I)).then(B).then(function(E){return E.reInitialize?v(E):_[D].unfilteredStorageResponse;});}return v(I);}).then(function(P,R){if(!_[P.reference].storageResponse){_[P.reference].storageResponse=t(R);u(P);}}.bind(null,P));};F.clearAndInitialize=function(P){k(P);F.clearState(P.reference);F.clearState(U.normalizeReference(P.reference));return F.initialize(P);};F.clearState=function(R){if(R){x(R);delete _[R];delete h[R];}else{Object.keys(_).forEach(function(R){x(R);});_={};h={};}};F.setInitialNonFlCompVariantData=function(R,P,D,V){j[R]={};j[R][P]={};j[R][P].standardVariant=D;j[R][P].variants=V;};F.getInitialNonFlCompVariantData=function(R){return j[R];};F.clearFilteredResponse=function(R){if(_[R]){z(R);delete _[R].storageResponse;}};F.getUIChanges=function(R){return o(R).changes;};F.getAppDescriptorChanges=function(R){return n(R).appDescriptorChanges;};F.getVariantsState=function(R){return q(R);};F.getUI2Personalization=function(R){return _[R].unfilteredStorageResponse.changes.ui2personalization;};F.getCompVariantsMap=function(R){return r(R);};F.callPrepareFunction=function(D,P){return i[D].prepareFunction(P);};F.getStorageResponse=function(R){if(h[R]){return h[R].then(function(){return _[R].unfilteredStorageResponse;});}};F.getFlexObjectsFromStorageResponse=function(R){return _[R]&&_[R].unfilteredStorageResponse.changes;};return F;},true);
