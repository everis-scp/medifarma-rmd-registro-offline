/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/core/step","sap/apf/core/hierarchicalStep","sap/apf/core/request","sap/apf/utils/hashtable","sap/apf/core/binding","sap/apf/core/representationTypes","sap/apf/core/constants","sap/apf/utils/utils","sap/ui/thirdparty/jquery"],function(s,h,r,a,b,c,d,u,q){'use strict';sap.apf.core.ConfigurationFactory=function(I){var t=this;var m;var e=false;var f=q.Deferred();var g=new sap.apf.utils.Hashtable(I.instances.messageHandler);var j=function(i){I.instances.messageHandler.check(i!==undefined&&i.hasOwnProperty("id")!==false,"oItem is undefined or property 'id' is missing",sap.apf.core.constants.message.code.errorCheckConfiguration);if(!g){g=new sap.apf.utils.Hashtable(I.instances.messageHandler);}var P=g.setItem(i.id,i);I.instances.messageHandler.check((P===undefined),"Configuration includes duplicated identifiers (IDs): "+i.id+"",sap.apf.core.constants.message.code.errorCheckConfigurationWarning);};var k=function(i){var R=[];if(!e&&f.state()==='pending'){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:"5020"}));}if(g.getNumberOfItems()!==0){g.each(function(P,Q){if(Q.type===i){R.push(Q);}});return R;}return R;};function l(i){if(!sap.apf.core.constants.configurationObjectTypes.hasOwnProperty(i.type)){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:"5033",aParams:[i.type]}));}if(i.type===sap.apf.core.constants.configurationObjectTypes.facetFilter&&!(i.property)){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:"5034"}));}g.setItem(i.id,i);}function n(i){if(i.type===undefined){i.type="step";}j(i);}function o(i){I.instances.messageHandler.check(i!==undefined&&i instanceof Array!==false,"aSteps is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);i.forEach(function(s){n(s);});}function p(R){if(R.type===undefined){R.type="request";}if(R.entitySet){R.entityType=R.entitySet;delete R.entitySet;}j(R);}function v(i){if(i.type===undefined){i.type="navigationTarget";}j(i);}function w(R){I.instances.messageHandler.check(R!==undefined&&R instanceof Array!==false,"aRequests is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);R.forEach(function(r){p(r);});}function x(i){function P(){var Q=new sap.apf.utils.Hashtable(I.instances.messageHandler);i.representations.forEach(function(R){if(!(R.id&&typeof R.id==="string")){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:"5028",aParameters:[i.id]}));}if(Q.setItem(R.id,R.id)){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:"5029",aParameters:[i.id]}));}});}if(i.type===undefined){i.type="binding";}I.instances.messageHandler.check(i.id!==undefined,"binding has no id");I.instances.messageHandler.check(i.representations!==undefined&&i.representations instanceof Array!==false,"representations for binding "+i.id+" not defined",sap.apf.core.constants.message.code.errorCheckConfiguration);P();j(i);}function y(i){I.instances.messageHandler.check(i!==undefined&&i instanceof Array!==false,"aBindings is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);i.forEach(function(b){x(b);});}function z(i){I.instances.messageHandler.check(i!==undefined&&i instanceof Array!==false,"navigationTarget is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);i.forEach(function(P){v(P);});}function A(i){g.setItem("configHeader",i);}function B(i){if(i.type===undefined){i.type="category";}j(i);}function C(i){I.instances.messageHandler.check(i!==undefined&&i instanceof Array!==false,"aCategories is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);i.forEach(function(P){var Q=P.steps;I.instances.messageHandler.check(Q!==undefined&&Q instanceof Array!==false,"steps for category "+P.id+" are missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);Q.forEach(function(s){I.instances.messageHandler.check(s.type&&(s.type==="step"||s.type==="hierarchicalStep")&&s.id,"step with wrong format assigned to category '"+P.id+"'");I.instances.messageHandler.check(t.existsConfiguration(s.id),"step with id '"+s.id+"' which is assigned to category '"+P.id+"' does not exist");});B(P);});}function D(i){var P=false;var R=sap.apf.core.representationTypes();R.forEach(function(Q){if(i===Q.id){P=true;}});return P;}function E(R){var i;if(R.type===undefined){R.type="representationType";}if(!D(R.id)){i=sap.apf.utils.extractFunctionFromModulePathString(R.constructor);if(!q.isFunction(i)){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:'5030',parameters:[R.id]}));}}j(R);}function F(R){I.instances.messageHandler.check(R!==undefined&&R instanceof Array!==false,"aRepresentationInfo is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);R.forEach(function(i){E(i);});}function G(i){if(i.type===undefined){i.type='smartFilterBar';}l(i);}function H(i){if(i.type===undefined){i.type="facetFilter";}l(i);}function J(i){I.instances.messageHandler.check(i!==undefined&&i instanceof Array!==false,"Facet filter configuration is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);if(i.length===0){g.setItem(sap.apf.core.constants.existsEmptyFacetFilterArray,true);return;}i.forEach(H);}function K(i,P,Q,R){var U,V,W;function X(a1){return a1.alias||a1.property;}function Y(a1){var b1=(a1.preselectionDefaults&&a1.preselectionDefaults.length>0);var c1=(a1.valueList&&a1.valueList.length>0);return b1||c1;}function Z(V,a1,i,P,R){V.metadataProperty=a1;H(V);K(i,P,Q,R);}function $(V,a1){if(sap.apf.utils.isPropertyTypeWithDateSemantics(a1)){V.preselectionDefaults=sap.apf.utils.convertDateListToInternalFormat(V.preselectionDefaults,a1);V.valueList=sap.apf.utils.convertDateListToInternalFormat(V.valueList,a1);}}if(P===i.length){Q.resolve();e=false;return;}V=i[P];P++;W=X(V);m=m||I.instances.coreApi.getMetadataFacade();var _=R&&Array.prototype.indexOf.call(R,W)>-1;if(_&&Y(V)){if(V.valueHelpRequest||V.filterResolutionRequest){if(V.valueHelpRequest){U=g.getItem(V.valueHelpRequest);}else if(V.filterResolutionRequest){U=g.getItem(V.filterResolutionRequest);}m.getPropertyMetadataByEntitySet(U.service,U.entityType,W).done(function(a1){$(V,a1);Z(V,a1,i,P,R);});}else{m.getProperty(W).done(function(a1){$(V,a1);Z(V,a1,i,P,R);});}}else if(_){if(V.valueHelpRequest||V.filterResolutionRequest){if(V.valueHelpRequest){U=g.getItem(V.valueHelpRequest);}else if(V.filterResolutionRequest){U=g.getItem(V.filterResolutionRequest);}m.getPropertyMetadataByEntitySet(U.service,U.entityType,W).done(function(a1){Z(V,a1,i,P,R);});}else{m.getProperty(W).done(function(a1){Z(V,a1,i,P,R);});}}else{Z(V,{},i,P,R);}}function L(i){var P=q.Deferred();m=m||I.instances.coreApi.getMetadataFacade();I.instances.messageHandler.check(i!==undefined&&i instanceof Array!==false,"Facet filter configuration is missing or not an Array",sap.apf.core.constants.message.code.errorCheckConfiguration);if(i.length===0){g.setItem(sap.apf.core.constants.existsEmptyFacetFilterArray,true);P.resolve();return P.promise();}e=true;m.getAllProperties(function(Q){K(i,0,P,Q);});return P.promise();}function M(R){F(R);}function S(i,P){function Q(i,W){var X=W.getConfigurationById(i.binding).representations;if(X){return X;}I.instances.messageHandler.check(false,'Binding of step with ID "'+i.id+'" does not contain any representations.',sap.apf.core.constants.message.code.errorCheckConfigurationWarning);}function R(i,W){var X;var Y=[];if(i.binding){X=Q(i,W);X.forEach(function(Z){var $=q.extend(true,{},W.getConfigurationById(Z.representationTypeId));$.representationId=Z.id;$.representationLabel=Z.label;$.parameter=q.extend(true,{},Z.parameter);Y.push($);});return Y;}I.instances.messageHandler.check(false,'Step with ID "'+i.id+'" does not contain any binding references.',sap.apf.core.constants.message.code.errorCheckConfigurationWarning);}var U=q.extend(true,{},i);var V=R(i,P);delete U.request;delete U.binding;delete U.thumbnail;delete U.longTitle;U.type="stepTemplate";U.getRepresentationInfo=function(){var W=q.extend(true,[],V);W.forEach(function(X){delete X.id;delete X.type;delete X.constructor;});return W;};return U;}var N=function(i,P){var t=this;this.type=i.type;this.id=i.id;this.label=i.label;this.stepTemplates=[];i.steps.forEach(function(Q){var s=P.getConfigurationById(Q.id);t.stepTemplates.push(new S(s,P));});return this;};var T=function(i,P){this.type="thumbnail";if(i===undefined){return this;}this.leftUpper=P.createLabel(i.leftUpper);this.rightUpper=P.createLabel(i.rightUpper);this.leftLower=P.createLabel(i.leftLower);this.rightLower=P.createLabel(i.rightLower);this.altTitle=P.createLabel(i.altTitle);return this;};this.createThumbnail=function(i){return new T(i,this);};function O(i){this.type="label";this.kind=i.kind;if(this.kind==="text"){this.file=i.file;this.key=i.key;}else if(this.kind==="property"){this.property=i.property;}else if(this.kind==="sapLabel"){this.labelOf=i.labelOf;}}this.createLabel=function(i){return new O(i,this);};this.loadConfig=function(i,P){g=new sap.apf.utils.Hashtable(I.instances.messageHandler);if(i.applicationTitle){g.setItem('applicationTitle',i.applicationTitle);}var Q={constructors:{Hashtable:sap.apf.utils.Hashtable},instances:{messageHandler:I.instances.messageHandler}};sap.apf.utils.migrateConfigToCategoryStepAssignment(i,Q);var R=sap.apf.core.representationTypes();M(R);o(i.steps);C(i.categories);w(i.requests);y(i.bindings);if(i.representationTypes){F(i.representationTypes);}if(i.smartFilterBar){G(i.smartFilterBar);}if(i.facetFilters){if(P){J(i.facetFilters);f.resolve();}else{L(i.facetFilters).done(function(){f.resolve();});}}else{f.resolve();}if(i.navigationTargets){z(i.navigationTargets);}if(i.configHeader){A(i.configHeader);}return f;};this.getConfigurationById=function(i){return g.getItem(i);};this.existsConfiguration=function(i){return g.hasItem(i);};this.getServiceDocuments=function(){var R=k("request");var i=[];R.forEach(function(P){i.push(P.service);});return sap.apf.utils.eliminateDuplicatesInArray(I.instances.messageHandler,i);};this.getNavigationTargets=function(){var i=k("navigationTarget");return q.extend(true,[],i);};this.getStepTemplates=function(){var i=[];var P=k("step");P=q.merge(P,k("hierarchicalStep"));P.forEach(function(Q,R){i[R]=new S(Q,t);});return i;};this.getSmartFilterBarConfiguration=function(){var i=q.Deferred();var P;f.done(function(){P=k('smartFilterBar')[0];if(typeof P==='object'&&P.service&&(P.entityType||P.entitySet)){i.resolve(q.extend(true,{},P));}else{i.resolve();}});return i.promise();};this.getFacetFilterConfigurations=function(){var P=k("facetFilter");var Q,R,i;var U=q.extend(true,[],P);for(i=0;i<U.length;i++){R=U[i];if(P[i].metadataProperty&&P[i].metadataProperty.clone){R.metadataProperty=P[i].metadataProperty.clone();}if(R.preselectionFunction){Q=sap.apf.utils.extractFunctionFromModulePathString(R.preselectionFunction);if(!q.isFunction(Q)){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:'5035',parameters:[R.id]}));R.preselectionFunction=undefined;}else{R.preselectionFunction=Q;}}}return U;};this.getCategories=function(){var i=k("category");var P=[];i.forEach(function(Q,R){P[R]=new N(Q,t);});return P;};this.getConfigHeader=function(){return g.getItem("configHeader");};this.createStep=function(i,R){var P=this.getConfigurationById(i);I.instances.messageHandler.check((P!==undefined&&(P.type==="step"||P.type==="hierarchicalStep")),"Error - referenced object is undefined or has not type step",sap.apf.core.constants.message.code.errorCheckConfiguration);I.instances.messageHandler.check(sap.apf.core.Step!==undefined,"Step must be defined ",sap.apf.core.constants.message.code.errorCheckConfiguration);I.instances.messageHandler.check(typeof sap.apf.core.Step==="function","Step must be constructor function");if(P.type==='hierarchicalStep'){I.instances.messageHandler.check(typeof sap.apf.core.HierarchicalStep==="function","HierarchicalStep must be constructor function");return new sap.apf.core.HierarchicalStep(I.instances.messageHandler,P,this,R,I.instances.coreApi);}return new sap.apf.core.Step(I.instances.messageHandler,P,this,R,I.instances.coreApi);};this.createBinding=function(i,P,Q,R){var U=this.getConfigurationById(i);I.instances.messageHandler.check((U!==undefined&&U.type==="binding"),"Error - oBindingConfig is undefined or has not type binding",sap.apf.core.constants.message.code.errorCheckConfiguration);U.oTitle=P;U.oLongTitle=Q;return new sap.apf.core.Binding(I,U,this,R);};this.createRequest=function(r){if(r.entitySet){r.entityType=r.entitySet;delete r.entitySet;}var i;var R;if(typeof r==="string"){R=t.getConfigurationById(r);if(!(R!==undefined&&R.type==="request")){i=I.instances.messageHandler.createMessageObject({code:"5004",aParameters:[r]});I.instances.messageHandler.putMessage(i);return undefined;}}else{R=r;I.instances.messageHandler.check(R.type&&R.type==="request"&&R.service&&R.entityType,'Wrong request configuration when creating a new request');if(!R.id){i=I.instances.messageHandler.createMessageObject({code:"5004",aParameters:[r]});I.instances.messageHandler.putMessage(i);return undefined;}}return new((I&&I.constructors&&I.constructors.Request)||sap.apf.core.Request)(I,R);};if(I.constructors&&I.constructors.RegistryProbe){this.getRegistry=function(){return new I.constructors.RegistryProbe(g);};}};});