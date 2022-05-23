/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Change","sap/ui/fl/Variant","sap/ui/fl/Utils","sap/ui/fl/LayerUtils","sap/ui/fl/LrepConnector","sap/ui/fl/Cache","sap/ui/fl/context/ContextManager","sap/ui/fl/registry/Settings","sap/ui/fl/transport/TransportSelection","sap/ui/fl/variants/VariantController","sap/ui/core/BusyIndicator","sap/ui/core/Component","sap/m/MessageBox","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/base/util/merge","sap/base/util/isEmptyObject","sap/base/Log"],function(C,V,U,L,a,b,c,S,T,d,B,e,M,J,q,m,i,f){"use strict";var g=function(j){this._mComponent=j;this._mChanges=h();this._mChangesInitial=m({},this._mChanges);this._mVariantsChanges={};if(!this._mComponent||!this._mComponent.name){f.error("The Control does not belong to an SAPUI5 component. Personalization and changes for this control might not work as expected.");throw new Error("Missing component name.");}this._oVariantController=new d(this._mComponent.name,this._mComponent.appVersion,{});this._oTransportSelection=new T();this._oConnector=this._createLrepConnector();this._aDirtyChanges=[];this._oMessagebundle=undefined;this._mChangesEntries={};this._bHasChangesOverMaxLayer=false;this.HIGHER_LAYER_CHANGES_EXIST="higher_layer_changes_exist";};function h(){return{mChanges:{},mDependencies:{},mDependentChangesOnMe:{},mControlsWithDependencies:{},aChanges:[]};}g.prototype.getComponentName=function(){return this._mComponent.name;};g.prototype._createLrepConnector=function(){return a.createConnector();};g.prototype.getCacheKey=function(A){return b.getCacheKey(this._mComponent,A);};g.prototype._preconditionsFulfilled=function(A,I,o){var j=o instanceof C?o.getDefinition():o;if(!j.fileName){f.warning("A change without fileName is detected and excluded from component: "+this._mComponent.name);return false;}function k(){if(I){return(j.fileType==="change")||(j.fileType==="variant");}return(j.fileType==="change")&&(j.changeType!=="defaultVariant");}function l(){if(I){if((j.fileType==="variant")||(j.changeType==="defaultVariant")){return j.selector&&j.selector.persistencyKey;}}return true;}function n(){return c.doesContextMatch(j,A);}function p(){if((j.fileType==="ctrl_variant")||(j.fileType==="ctrl_variant_change")||(j.fileType==="ctrl_variant_management_change")){return j.variantManagementReference||j.variantReference||(j.selector&&j.selector.id);}}if((k()&&l()&&n())||p()){return true;}return false;};g.prototype.getChangesForComponent=function(p,I){return b.getChangesFillingCache(this._oConnector,this._mComponent,p,I).then(function(w){var o=m({},w);var A=p&&p.component&&U.getAppComponentForControl(p.component);if(o.changes&&o.changes.settings){S._storeInstance(o.changes.settings);}var F=o.changes&&Array.isArray(o.changes.changes)&&o.changes.changes.length!==0;var v=o.changes&&o.changes.variantSection&&!i(o.changes.variantSection);if(!F&&!v){return[];}var l=A?A.getComponentData():(p&&p.componentData||{});var n=o.changes.changes;if(!this._oMessagebundle&&o.messagebundle&&A){if(!A.getModel("i18nFlexVendor")){if(n.some(function(G){return G.layer==="VENDOR";})){this._oMessagebundle=o.messagebundle;var s=new J(this._oMessagebundle);A.setModel(s,"i18nFlexVendor");}}}var t=p&&p.includeCtrlVariants;var u=p&&p.currentLayer;var x=!(p&&p.ignoreMaxLayerParameter);var y=[o.changes.variantSection];if(u){n=n.filter(this._filterChangeForCurrentLayer.bind(this,u));y.push(false,u);}else if(L.isLayerFilteringRequired()&&x){n=n.filter(this._filterChangeForMaxLayer.bind(this));y.push(true);}else if(this._bHasChangesOverMaxLayer&&!x){this._bHasChangesOverMaxLayer=false;return this.HIGHER_LAYER_CHANGES_EXIST;}if(v){if(t||y.length>1){var z=this._getAllCtrlVariantChanges.apply(this,y);n=t?n.concat(z):n;}this._oVariantController.checkAndSetVariantContent(o,l&&l.technicalParameters);}if(!t&&!i(this._oVariantController.getChangeFileContent())){n=n.concat(this._oVariantController.loadInitialChanges());}var D=p&&p.includeVariants;var E=o.changes.contexts||[];return new Promise(function(G){c.getActiveContexts(E).then(function(H){G(n.filter(this._preconditionsFulfilled.bind(this,H,D)).map(k.bind(this,o)));}.bind(this));}.bind(this));}.bind(this));function j(v,o){var F;Object.keys(v).some(function(s){return v[s].variants.some(function(l){if(l.content.fileName===o.getDefinition().variantReference){F=l;return true;}});});return F;}function r(v,o){return v.controlChanges.some(function(l,n){if(l.fileName===o.getDefinition().fileName){v.controlChanges.splice(n,1,o);return true;}});}function k(F,o){var l;if(o instanceof C){l=o;this._mChangesEntries[l.getFileName()]=l;}else{if(!this._mChangesEntries[o.fileName]){this._mChangesEntries[o.fileName]=new C(o);}l=this._mChangesEntries[o.fileName];l.setState(C.states.PERSISTED);if(l.getVariantReference()){var v=this._oVariantController.getChangeFileContent();var n=j.call(this,v,l);if(n&&r(n,l)){b.setVariantManagementSection(this._mComponent,v);}}}return l;}};g.prototype._filterChangeForMaxLayer=function(o){if(L.isOverMaxLayer(this._getLayerFromChangeOrChangeContent(o))){if(!this._bHasChangesOverMaxLayer){this._bHasChangesOverMaxLayer=true;}return false;}return true;};g.prototype._filterChangeForCurrentLayer=function(l,o){return l===this._getLayerFromChangeOrChangeContent(o);};g.prototype._getLayerFromChangeOrChangeContent=function(o){var s;if(o instanceof V||o instanceof C){s=o.getLayer();}else{s=o.layer;}return s;};g.prototype._getAllCtrlVariantChanges=function(v,F,s){var j=[];var k=function(){return true;};if(F){k=this._filterChangeForMaxLayer.bind(this);}else if(typeof s==="string"&&s!==""){k=this._filterChangeForCurrentLayer.bind(this,s);}Object.keys(v).forEach(function(l){var o=v[l];o.variants=o.variants.filter(function(n){return!n.content.layer||k(n.content);});o.variants.forEach(function(n){if(Array.isArray(n.variantChanges.setVisible)){n.variantChanges.setVisible=n.variantChanges.setVisible.filter(k);var A=n.variantChanges.setVisible.slice(-1)[0];if(A&&!A.content.visible&&A.content.createdByReset){return;}j=j.concat(n.variantChanges.setVisible);}Object.keys(n.variantChanges).forEach(function(p){if(p!=="setVisible"){n.variantChanges[p]=n.variantChanges[p].filter(k);j=n.variantChanges[p].length>0?j.concat(n.variantChanges[p].slice(-1)[0]):j;}});j=(n.content.fileName!==l)?j.concat([n.content]):j;n.controlChanges=n.controlChanges.filter(k);j=j.concat(n.controlChanges);});Object.keys(o.variantManagementChanges).forEach(function(n){o.variantManagementChanges[n]=o.variantManagementChanges[n].filter(k);j=o.variantManagementChanges[n].length>0?j.concat(o.variantManagementChanges[n].slice(-1)[0]):j;});});return j;};g.prototype.getSmartVariantManagementChangeMap=function(){return this._mVariantsChanges;};g.prototype.getChangesForVariant=function(s,j,p){if(this._mVariantsChanges[j]){return Promise.resolve(this._mVariantsChanges[j]);}var k=function(o){var n=false;var r=o._oDefinition.selector;q.each(r,function(t,v){if(t===s&&v===j){n=true;}});return n;};var l=function(n,t){f.error("key : "+n+" and text : "+t.value);};return this.getChangesForComponent(p).then(function(n){return n.filter(k);}).then(function(n){if(!this._mVariantsChanges[j]){this._mVariantsChanges[j]={};}var I;n.forEach(function(o){I=o.getId();if(o.isValid()){if(this._mVariantsChanges[j][I]&&o.isVariant()){f.error("Id collision - two or more variant files having the same id detected: "+I);q.each(o.getDefinition().texts,l);f.error("already exists in variant : ");q.each(this._mVariantsChanges[j][I].getDefinition().texts,l);}this._mVariantsChanges[j][I]=o;}}.bind(this));return this._mVariantsChanges[j];}.bind(this));};g.prototype.addChangeForVariant=function(s,j,p){var F;var I;var k;var o;var l;if(!p){return undefined;}if(!p.type){f.error("sap.ui.fl.Persistence.addChange : type is not defined");}var n=q.type(p.content);if(n!=='object'&&n!=='array'){f.error("mParameters.content is not of expected type object or array, but is: "+n,"sap.ui.fl.Persistence#addChange");}k={};if(typeof(p.texts)==="object"){q.each(p.texts,function(r,t){k[r]={value:t,type:"XFLD"};});}var v={creation:this._mComponent.appVersion,from:this._mComponent.appVersion};if(this._mComponent.appVersion&&p.developerMode){v.to=this._mComponent.appVersion;}I={changeType:p.type,service:p.ODataService,texts:k,content:p.content,reference:this._mComponent.name,isVariant:p.isVariant,packageName:p.packageName,isUserDependent:p.isUserDependent,validAppVersions:v};I.selector={};I.selector[s]=j;F=C.createInitialFileContent(I);if(p.id){F.fileName=p.id;}o=new C(F);l=o.getId();if(!this._mVariantsChanges[j]){this._mVariantsChanges[j]={};}this._mVariantsChanges[j][l]=o;return o.getId();};g.prototype.saveAllChangesForVariant=function(s){var p=[];var t=this;q.each(this._mVariantsChanges[s],function(j,o){var k=o.getId();switch(o.getPendingAction()){case"NEW":p.push(t._oConnector.create(o.getDefinition(),o.getRequest(),o.isVariant()).then(function(r){o.setResponse(r.response);if(b.isActive()){b.addChange({name:t._mComponent.name,appVersion:t._mComponent.appVersion},r.response);}return r;}));break;case"UPDATE":p.push(t._oConnector.update(o.getDefinition(),o.getRequest()).then(function(r){o.setResponse(r.response);if(b.isActive()){b.updateChange({name:t._mComponent.name,appVersion:t._mComponent.appVersion},r.response);}return r;}));break;case"DELETE":p.push(t._oConnector.deleteChange(o.getDefinition(),o.getRequest()).then(function(r){var o=t._mVariantsChanges[s][k];if(o.getPendingAction()==="DELETE"){delete t._mVariantsChanges[s][k];}if(b.isActive()){b.deleteChange({name:t._mComponent.name,appVersion:t._mComponent.appVersion},o.getDefinition());}return r;}));break;default:break;}});return Promise.all(p);};function _(s,A){return s.idIsLocal?A.createId(s.id):s.id;}g.prototype._addChangeIntoMap=function(A,o){var s=o.getSelector();if(s&&s.id){var j=_(s,A);this._addMapEntry(j,o);if(s.idIsLocal===undefined&&j.indexOf("---")!==-1){var k=j.split("---")[0];if(k!==A.getId()){j=j.split("---")[1];j=A.createId(j);this._addMapEntry(j,o);}}}return this._mChanges;};g.prototype._addMapEntry=function(s,o){if(!this._mChanges.mChanges[s]){this._mChanges.mChanges[s]=[];}if(this._mChanges.mChanges[s].indexOf(o)===-1){this._mChanges.mChanges[s].push(o);}if(this._mChanges.aChanges.indexOf(o)===-1){this._mChanges.aChanges.push(o);}};g.prototype._addDependency=function(D,o,r){var j=r?this._mChangesInitial:this._mChanges;if(!j.mDependencies[D.getId()]){j.mDependencies[D.getId()]={changeObject:D,dependencies:[]};}j.mDependencies[D.getId()].dependencies.push(o.getId());if(!j.mDependentChangesOnMe[o.getId()]){j.mDependentChangesOnMe[o.getId()]=[];}j.mDependentChangesOnMe[o.getId()].push(D.getId());};g.prototype._addControlsDependencies=function(D,A,j,r){var k=r?this._mChangesInitial:this._mChanges;if(j.length>0){if(!k.mDependencies[D.getId()]){k.mDependencies[D.getId()]={changeObject:D,dependencies:[],controlsDependencies:[]};}k.mDependencies[D.getId()].controlsDependencies=j;var s;j.forEach(function(o){s=_(o,A);k.mControlsWithDependencies[s]=true;});}};g.prototype.loadChangesMapForComponent=function(A,p){p.component=!i(A)&&A;return this.getChangesForComponent(p).then(j.bind(this));function j(k){this._mChanges=h();k.forEach(this._addChangeAndUpdateDependencies.bind(this,A));this._mChangesInitial=m({},this._mChanges);return this.getChangesMapForComponent.bind(this);}};g.prototype.checkForOpenDependenciesForControl=function(s,o,A){return Object.keys(this._mChanges.mDependencies).some(function(k){return this._mChanges.mDependencies[k].changeObject.getDependentSelectorList().some(function(D){return D===o.getControlIdBySelector(s,A);});},this);};g.prototype.copyDependenciesFromInitialChangesMap=function(o,D,A){var I=m({},this._mChangesInitial.mDependencies);var j=I[o.getId()];if(j){var n=[];j.dependencies.forEach(function(s){if(D(s)){this._mChanges.mDependentChangesOnMe[s]=this._mChanges.mDependentChangesOnMe[s]||[];this._mChanges.mDependentChangesOnMe[s].push(o.getId());n.push(s);}}.bind(this));o.getDependentControlSelectorList().forEach(function(s){this._mChanges.mControlsWithDependencies[_(s,A)]=true;}.bind(this));j.dependencies=n;this._mChanges.mDependencies[o.getId()]=j;}return this._mChanges;};g.prototype._addChangeAndUpdateDependencies=function(A,o){o.setInitialApplyState();this._addChangeIntoMap(A,o);this._updateDependencies(o,A,false);};g.prototype._addRunTimeCreatedChangeAndUpdateDependencies=function(A,o){this._addChangeIntoMap(A,o);this._updateDependencies(o,A,true);};g.prototype._updateDependencies=function(o,A,r){var j=this.getChangesMapForComponent().aChanges;var D=o.getDependentSelectorList();var k=o.getDependentControlSelectorList();this._addControlsDependencies(o,A,k,r);j.slice(0,j.length-1).reverse().forEach(function(E){var l=E.getDependentSelectorList();D.some(function(n){var p=U.indexOfObject(l,n);if(p>-1){this._addDependency(o,E,r);return true;}}.bind(this));}.bind(this));};g.prototype.getChangesMapForComponent=function(){return this._mChanges;};g.prototype.getChangesForView=function(v,p){var t=this;return this.getChangesForComponent(p).then(function(k){return k.filter(j.bind(t));});function j(o){var s=o.getSelector();if(!s){return false;}var k=s.id;if(!k||!p){return false;}var l=k.slice(0,k.lastIndexOf("--"));var v;if(o.getSelector().idIsLocal){var n=p.appComponent;if(n){v=n.getLocalId(p.viewId);}}else{v=p.viewId;}return l===v;}};g.prototype.addChange=function(v,A){var o=this.addDirtyChange(v);this._addRunTimeCreatedChangeAndUpdateDependencies(A,o);this._addPropagationListener(A);return o;};g.prototype.addDirtyChange=function(v){var n;if(v instanceof C||v instanceof V){n=v;}else{n=new C(v);}if(this._aDirtyChanges.indexOf(n)===-1){this._aDirtyChanges.push(n);}return n;};g.prototype._addPropagationListener=function(o){var A=U.getAppComponentForControl(o);if(A instanceof e){var j=function(p){return!p._bIsSapUiFlFlexControllerApplyChangesOnControl;};var n=A.getPropagationListeners().every(j);if(n){var k=A.getManifestObject();var v=U.getAppVersionFromManifest(k);var F=sap.ui.require("sap/ui/fl/FlexControllerFactory");var l=F.create(this.getComponentName(),v);var p=l.getBoundApplyChangesOnControl(this.getChangesMapForComponent.bind(this),A);A.addPropagationListener(p);}}};g.prototype.saveDirtyChanges=function(s){var D=this._aDirtyChanges.slice(0);var j=this._aDirtyChanges;var r=this._getRequests(D);var p=this._getPendingActions(D);if(p.length===1&&r.length===1&&p[0]==="NEW"){var R=r[0];var P=this._prepareDirtyChanges(j);return this._oConnector.create(P,R).then(function(o){this._massUpdateCacheAndDirtyState(j,D,s);return o;}.bind(this));}return this.saveSequenceOfDirtyChanges(D,s);};g.prototype.saveSequenceOfDirtyChanges=function(D,s){var A=this.getDirtyChanges();return D.reduce(function(p,o){return p.then(this._performSingleSaveAction(o)).then(this._updateCacheAndDirtyState.bind(this,A,o,s));}.bind(this),Promise.resolve());};g.prototype._performSingleSaveAction=function(D){return function(){if(D.getPendingAction()==="NEW"){return this._oConnector.create(D.getDefinition(),D.getRequest());}if(D.getPendingAction()==="DELETE"){return this._oConnector.deleteChange(D.getDefinition(),D.getRequest());}}.bind(this);};g.prototype._updateCacheAndDirtyState=function(D,o,s){if(!s){if(o.getPendingAction()==="NEW"){U.isChangeRelatedToVariants(o)?b.setVariantManagementSection(this._mComponent,m({},this._oVariantController.getChangeFileContent())):b.addChange(this._mComponent,o.getDefinition());}else if(o.getPendingAction()==="DELETE"){U.isChangeRelatedToVariants(o)?b.setVariantManagementSection(this._mComponent,m({},this._oVariantController.getChangeFileContent())):b.deleteChange(this._mComponent,o.getDefinition());}}var I=D.indexOf(o);if(I>-1){D.splice(I,1);}};g.prototype._massUpdateCacheAndDirtyState=function(D,j,s){j.forEach(function(o){this._updateCacheAndDirtyState(D,o,s);},this);};g.prototype._getRequests=function(D){var r=[];D.forEach(function(o){var R=o.getRequest();if(r.indexOf(R)===-1){r.push(R);}});return r;};g.prototype._getPendingActions=function(D){var p=[];D.forEach(function(o){var P=o.getPendingAction();if(p.indexOf(P)===-1){p.push(P);}});return p;};g.prototype._prepareDirtyChanges=function(D){var j=[];D.forEach(function(o){j.push(o.getDefinition());});return j;};g.prototype.getDirtyChanges=function(){return this._aDirtyChanges;};g.prototype.deleteChange=function(o,r){var n=this._aDirtyChanges.indexOf(o);if(n>-1){if(o.getPendingAction()==="DELETE"){return;}this._aDirtyChanges.splice(n,1);this._deleteChangeInMap(o,r);return;}o.markForDeletion();this.addDirtyChange(o);this._deleteChangeInMap(o,r);};g.prototype._deleteChangeInMap=function(o,r){var s=o.getId();var j=this._mChanges.mChanges;var k=r?this._mChangesInitial:this._mChanges;var D=k.mDependencies;var l=k.mDependentChangesOnMe;Object.keys(j).some(function(n){var p=j[n];var t=p.map(function(E){return E.getId();}).indexOf(o.getId());if(t!==-1){p.splice(t,1);return true;}});Object.keys(D).forEach(function(n){if(n===s){delete D[n];}else if(D[n].dependencies&&Array.isArray(D[n].dependencies)&&D[n].dependencies.indexOf(s)!==-1){D[n].dependencies.splice(D[n].dependencies.indexOf(s),1);if(D[n].dependencies.length===0){delete D[n];}}});Object.keys(l).forEach(function(n){if(n===s){delete l[n];}else if(Array.isArray(l[n])&&l[n].indexOf(s)!==-1){l[n].splice(l[n].indexOf(s),1);if(l[n].length===0){delete l[n];}}});var I=this._mChanges.aChanges.indexOf(o);if(I!==-1){this._mChanges.aChanges.splice(I,1);}};g.prototype.loadSwitchChangesMapForComponent=function(p){p.changesMap=this._mChanges.mChanges;return this._oVariantController.getChangesForVariantSwitch(p);};g.prototype.transportAllUIChanges=function(r,s,l,A){var H=function(E){B.hide();var R=sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl");var j=R.getText("MSG_TRANSPORT_ERROR",E?[E.message||E]:undefined);var t=R.getText("HEADER_TRANSPORT_ERROR");f.error("transport error"+E);M.show(j,{icon:M.Icon.ERROR,title:t,styleClass:s});return"Error";};return this._oTransportSelection.openTransportSelection(null,r,s).then(function(t){if(this._oTransportSelection.checkTransportInfo(t)){B.show(0);return this.getChangesForComponent({currentLayer:l,includeCtrlVariants:true}).then(function(j){var o={reference:this.getComponentName(),appVersion:this._mComponent.appVersion,layer:l};return this._oTransportSelection._prepareChangesForTransport(t,j,A,o).then(function(){B.hide();});}.bind(this));}return"Cancel";}.bind(this))['catch'](H);};g.prototype._getChangesFromMapByNames=function(n){return this._mChanges.aChanges.filter(function(o){return n.indexOf(o.getFileName())!==-1;});};g.prototype.resetChanges=function(l,G,s,j){var k=[];var t;var n=s&&s.length>0;var o=j&&j.length>0;if(!G&&!n&&!o){f.error("Of the generator, selector IDs and change types parameters at least one has to filled");return Promise.reject("Of the generator, selector IDs and change types parameters at least one has to filled");}if(l==="USER"){t=Promise.resolve();}else{t=this.getChangesForComponent({currentLayer:l,includeCtrlVariants:true}).then(function(p){k=p;return S.getInstance(this.getComponentName());}.bind(this)).then(function(p){if(!p.isProductiveSystem()){return this._oTransportSelection.setTransports(k,e.get(this.getComponentName()));}}.bind(this));}return t.then(function(){var p="";k.some(function(r){if(r.getRequest()){p=r.getRequest();return true;}return false;});var P={sReference:this.getComponentName(),sAppVersion:this._mComponent.appVersion,sLayer:l,sChangelist:p};if(G){P.sGenerator=G;}if(n){P.aSelectorIds=s;}if(o){P.aChangeTypes=j;}return this._oConnector.resetChanges(P);}.bind(this)).then(function(r){var p=[];if(s||j){var N=[];if(r&&r.response&&r.response.length>0){r.response.forEach(function(u){N.push(u.name);});}b.removeChanges(this._mComponent,N);p=this._getChangesFromMapByNames(N);}return p;}.bind(this));};g.prototype.resetVariantMap=function(r){return this._oVariantController.resetMap(r);};return g;},true);