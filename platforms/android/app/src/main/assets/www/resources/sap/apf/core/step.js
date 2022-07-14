sap.ui.define(['sap/apf/utils/trace',"sap/apf/core/utils/filter","sap/apf/core/utils/areRequestOptionsEqual","sap/apf/utils/utils","sap/apf/utils/filter","sap/apf/utils/executeFilterMapping","sap/apf/core/constants","sap/apf/core/metadataProperty","sap/ui/thirdparty/jquery"],function(t,f,a,u,b,e,c,m,q){'use strict';function S(M,s,F,r,C){M.check(s!==undefined,"Step: step configuration is missing");M.check(s.binding!==undefined,"No binding assigned to step "+s.id+" in analytical configuration",sap.apf.core.constants.message.code.errorCheckConfiguration);var l=sap.apf.core.constants.representationMetadata.labelDisplayOptions;var d=this;var B,R,o,g;var h={responseData:[]};var A=q.extend(true,{},s);this.type='step';this.title=q.extend(true,{},s.title);this.longTitle=undefined;if(s.longTitle){this.longTitle=q.extend(true,{},s.longTitle);}this.thumbnail=q.extend(true,{},s.thumbnail);this.categories=s.categories;this.destroy=function(){if(B){B.destroy();}R=undefined;o=undefined;g=undefined;B=undefined;d=undefined;};this.getRequestConfiguration=function(){return F.getConfigurationById(s.request);};this.getAdditionalConfigurationProperties=function(){return A;};this.update=function(k,n){var p;var v=this.getFilter();var w=!k.isEqual(o);var x=B.getRequestOptions(w);var y=!sap.apf.core.utils.areRequestOptionsEqual(g,x);var z=F.getConfigurationById(s.request);t.logCall("Step.update",", bFilterChanged",w,", bRequestOptionsChanged",y);C.getMetadata(z.service).then(function(D){t.log("update  -  in oCoreApi.getMetadata().then()");if(!v.isEmpty()&&!s.topNSettings&&(B.getSelectedRepresentation().type==='TableRepresentation')){var E=v.getProperties()[0];var G=[E];var H=D.getPropertyMetadata(z.entityType,E)["sap:text"];if(H){G.push(H);}p={selectionFilter:v,requiredFilterProperties:G};}if(R&&(w||y)){t.log("update() - before sendGetInBatch");R.sendGetInBatch(k,n,x,p);}else{t.log("update() - no request, before callbackAfterRequest");n({},false);}},function(){t.log("update - then.reject() - before callbackAfterRequest");n({},false);});t.logReturn("update");};this.determineFilter=function(k,n){var p;var v;if(this.adjustCumulativeFilter){p=this.adjustCumulativeFilter(k);}if(j()&&this.getFilter().toUrlParam()){var w=F.getConfigurationById(s.filterMapping.requestForMappedFilter);w.selectProperties=s.filterMapping.target.slice();if(s.filterMapping.targetPropertyDisplayOption===l.TEXT||s.filterMapping.targetPropertyDisplayOption===l.KEY_AND_TEXT){C.getMetadata(w.service).done(function(y){var z=y.getPropertyMetadata(w.entityType,w.selectProperties[0]);if(z.text){w.selectProperties.push(z.text);}e.call(this,w);}.bind(this));}else{e.call(this,w);}}else{h.responseData=[];n(this.getFilter(),p);}function e(w){var y=F.createRequest(w);v=k.addAnd(this.getFilter());if(p){v=p.copy().addAnd(this.getFilter());}if(v.isEqual(h.mergedFilter)){n(h.mappedFilter,p);}else{sap.apf.utils.executeFilterMapping(v,y,s.filterMapping.target,x,M);}}function x(y,z,D){if(!z){if(s.filterMapping.keepSource==='true'){y=d.getFilter().addAnd(y);}h.mergedFilter=v;h.mappedFilter=y;h.responseData=D;n(y,p);}}};this.getBinding=function(){return B;};this.getFilter=function(){return B.getFilter(this.getContextInfo());};this.getContextInfo=function(){var k=F.getConfigurationById(s.request);var n={entityType:k.entityType,service:k.service};return n;};this.setData=function(D,k){var n=!k.isEqual(o);o=k.copy();g=q.extend({},B.getRequestOptions(n));B.setData(D);};this.getRepresentationInfo=function(){return B.getRepresentationInfo();};this.getSelectedRepresentationInfo=function(){return B.getSelectedRepresentationInfo();};this.getSelectedRepresentation=function(){return B.getSelectedRepresentation();};this.setSelectedRepresentation=function(r){B.setSelectedRepresentation(r);};this.getFilterInformation=function(k,n){var p=q.Deferred();var v;if(s.longTitle&&s.longTitle.key){v=C.getTextNotHtmlEncoded(s.longTitle.key);}else{v=C.getTextNotHtmlEncoded(s.title.key);}if(j()&&s.filterMapping.keepSource==="true"){q.when(y(k,v),w(k,v)).then(function(D,E){p.resolve([D,E]);});}else if(j()){q.when(w(k,v)).then(function(D){p.resolve([D]);});}else{q.when(y(k,v)).then(function(D){p.resolve([D]);});}return p;function w(){var D=q.Deferred();var E;if(s.filterMapping.targetPropertyLabelKey){E=C.getTextNotHtmlEncoded(s.filterMapping.targetPropertyLabelKey);}var G=s.filterMapping.target[0];var H=F.getConfigurationById(s.filterMapping.requestForMappedFilter);x(G,H).done(function(I){z(D,G,I,E,H,true);});return D;}function x(D,E){var G=q.Deferred();C.getMetadata(E.service).done(function(H){var I;var J=new sap.apf.core.MetadataProperty(H.getPropertyMetadata(E.entityType,D));if(J.text){I=J.text;}var K=[];var L=s.filterMapping.targetPropertyDisplayOption;var N=false;h.responseData.forEach(function(O){if(L===l.TEXT&&I){K.push({text:O[I]});}else if(L===l.KEY_AND_TEXT&&I){K.push({text:C.getTextNotHtmlEncoded("keyAndTextSelection",[O[I],sap.apf.utils.convertToExternalFormat(O[D],J)])});}else{K.push({text:O[D]});N=true;}});K=sap.apf.utils.sortByProperty(K,"text",J);if(N===true){K.forEach(function(O){O.text=sap.apf.utils.convertToExternalFormat(O.text,J);});}G.resolve(K);});return G;}function y(){var D=q.Deferred();var E;var G;var H=F.getConfigurationById(s.binding);var I=F.getConfigurationById(s.request);if(H.requiredFilters&&H.requiredFilters.length===1){E=H.requiredFilters[0];if(H.requiredFilterOptions&&H.requiredFilterOptions.fieldDesc){G=C.getTextNotHtmlEncoded(H.requiredFilterOptions.fieldDesc.key);}}z(D,E,B.getSortedSelections(),G,I,false);return D;}function z(D,E,G,H,I,J){var K;var L;if(!H){K=C.getMetadata(I.service);}if(E){L=C.getMetadata(k.getRequestConfiguration().service);}q.when(K,L).then(function(N,O){var P=false;var Q;var T=k.getRequestConfiguration().entityType;var U;if(O){U=O.getFilterableProperties(T).concat(O.getParameterEntitySetKeyProperties(T));}if(!H&&N&&E){H=N.getPropertyMetadata(I.entityType,E)["sap:label"];}if(!E){P=true;Q=C.getTextNotHtmlEncoded("noSelectionPossible");}else if(U.indexOf(E)===-1){P=true;Q=C.getTextNotHtmlEncoded("filterNotApplicable");}else if(G.length===0){P=true;Q=C.getTextNotHtmlEncoded("nothingSelected");}D.resolve({text:v,selectablePropertyLabel:H||E,filterValues:G,infoIcon:J,infoText:J?C.getTextNotHtmlEncoded("infoIconfilterMapping"):undefined,warningIcon:P,warningText:Q,stepIndex:n});});}};this.serialize=function(){return{stepId:s.id,binding:B.serialize()};};this.deserialize=function(k){B.deserialize(k.binding);M.check(s.id,k.stepId,"sap.apf.core.step.deserialize inconsistent serialization data - id "+k.stepId);return this;};this.getAssignedNavigationTargets=function(){return s.navigationTargets;};i();function i(){B=F.createBinding(s.binding,undefined,undefined,r);delete A.binding;if(s.request!==undefined&&s.request!==""){R=F.createRequest(s.request);delete A.request;}}function j(){if(s.filterMapping){if(s.filterMapping.requestForMappedFilter&&s.filterMapping.target instanceof Array&&s.filterMapping.keepSource){return true;}M.putMessage(M.createMessageObject({code:"5104"}));}return false;}}sap.apf.core.Step=S;return{constructor:S};},true);
