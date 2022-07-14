/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/apf/core/constants","sap/apf/core/utils/filter","sap/apf/core/utils/filterTerm","sap/ui/thirdparty/jquery"],function(c,f,a,q){"use strict";sap.apf.core.Binding=function(I,b,F,r){var t=this;this.type="binding";var n=0;var R=[];var d=[];var C=[];var o;this.oTitle=b.oTitle;this.oLongTitle=b.oLongTitle;var e=b.requiredFilters;var g=b.requiredFilterOptions;this.destroy=function(){R.forEach(function(i){if(i&&i.destroy){i.destroy();}});R=[];d=[];C=[];o=undefined;};function h(i,k){if(I.exits&&I.exits.binding&&I.exits.binding.afterGetFilter){return I.exits.binding.afterGetFilter(i,t.getSelectedRepresentation(),I.instances.coreApi,b,k);}return i;}this.getFilter=function(i){var s=this.getSelectedRepresentation();var m=sap.apf.core.constants.filterMethodTypes;var k=[];var l;if(s.getFilterMethodType()===m.filter){var p=s.getFilter().getInternalFilter();return h(p,i);}if(s.getSelectionAsArray){k=s.getSelectionAsArray();}else{return h(new sap.apf.core.utils.Filter(I.instances.messageHandler),i);}if(k===undefined){l=sap.apf.core.utils.Filter.createEmptyFilter(I.instances.messageHandler,e);return h(l,i);}if(k.length===C.length||k.length===0){return h(new sap.apf.core.utils.Filter(I.instances.messageHandler),i);}l=sap.apf.core.utils.Filter.createFromArray(I.instances.messageHandler,e,C,k);return h(l,i);};this.getRequiredFilters=function(){return e;};this.getRequiredFilterOptions=function(){return g;};this.getRequestOptions=function(i){if(q.isFunction(this.getSelectedRepresentation().getRequestOptions)){return this.getSelectedRepresentation().getRequestOptions(i);}return{};};this.setFilterValues=function(v){var i=this.getSelectedRepresentation();i.setFilterValues(v);};this.setData=function(D){I.instances.messageHandler.check(D!==undefined,"aDataResponse is undefined (binding function setData)");C=D.data;o=D.metadata;this.getSelectedRepresentation().setData(D.data,D.metadata,D.count,D.selectionValidation);};this.updateTreetable=function(i,m,k,l){this.getSelectedRepresentation().updateTreetable(i,m,k,l);};this.getSortedSelections=function(){return this.getSelectedRepresentation().getSortedSelections();};this.getRepresentationInfo=function(){var k=q.extend(true,[],d);for(var i=0;i<k.length;i++){delete k[i].id;delete k[i].type;delete k[i].constructor;}return k;};this.getSelectedRepresentationInfo=function(){I.instances.messageHandler.check(n>=0&&n<d.length,"index in array boundaries");var i=q.extend(true,{},d[n]);delete i.id;delete i.type;delete i.constructor;return i;};this.getSelectedRepresentation=function(){I.instances.messageHandler.check(n>=0&&n<R.length,"selectedRepresentation in array boundaries");return R[n];};this.setSelectedRepresentation=function(r){I.instances.messageHandler.check(typeof r==="string","setSelectedRepresentation() - sRepresentationId missing");var t=this;var k=this.getSelectedRepresentation();var s=l(r,b.representations);var N=m(s);n=s.index;if(C!==undefined&&o!==undefined){N.setData(C,o);}if(N.adoptSelection){N.adoptSelection(k);}if(k&&k.onChartSwitch){k.onChartSwitch();}function l(r,p){for(var i=0;i<p.length;i++){if(r===p[i].id){return{config:p[i],constructor:F.getConfigurationById(p[i].representationTypeId).constructor,index:i};}}I.instances.messageHandler.check(false,"Representation config not found");}function m(S){var i;if(R[S.index]===undefined){if(S.config.parameter&&S.config.parameter.alternateRepresentationTypeId){S.config.parameter.alternateRepresentationType=F.getConfigurationById(S.config.parameter.alternateRepresentationTypeId);}S.config.parameter.requiredFilters=b.requiredFilters;S.config.parameter.requiredFilterOptions=b.requiredFilterOptions;i=t.convertSortToOrderBy(S.config.parameter);R[S.index]=I.instances.coreApi.createRepresentation(S.constructor,i);return R[S.index];}return R[S.index];}};this.serialize=function(){return{selectedRepresentation:t.getSelectedRepresentation().serialize(),selectedRepresentationId:t.getSelectedRepresentationInfo().representationId};};this.deserialize=function(s){t.setSelectedRepresentation(s.selectedRepresentationId);t.getSelectedRepresentation().deserialize(s.selectedRepresentation);return t;};this.convertSortToOrderBy=function(p){var i;if(p.sort&&!p.orderby){i=q.extend(true,{},p);if(p.alternateRepresentationType){i.alternateRepresentationType=p.alternateRepresentationType;}i.orderby=[{property:p.sort.sortField,ascending:!p.sort.descending}];delete i.sort;return i;}i=p;return i;};R[0]=undefined;var j=false;b.representations.forEach(function(i,k){var s=i.representationTypeId;d[k]=q.extend(true,{},F.getConfigurationById(s));d[k].representationId=i.id;if(r===d[k].representationId){j=true;}d[k].representationLabel=i.label;d[k].thumbnail=i.thumbnail;d[k].parameter=q.extend(true,{},i.parameter);});if(j){this.setSelectedRepresentation(r);}else if(d.length>0){this.setSelectedRepresentation(d[0].representationId);}if(!j&&r){I.instances.messageHandler.putMessage(I.instances.messageHandler.createMessageObject({code:'5037',aParameters:[r]}));}};});