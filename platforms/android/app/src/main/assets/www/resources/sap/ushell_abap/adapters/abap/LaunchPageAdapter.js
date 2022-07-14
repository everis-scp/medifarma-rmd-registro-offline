// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/URI","sap/ushell/components/cards/ManifestPropertyHelper","sap/ui/thirdparty/jquery","sap/base/util/ObjectPath","sap/base/util/isEmptyObject","sap/m/GenericTile","sap/ushell/Config","sap/base/util/deepExtend","sap/ushell/utils/chipsUtils","sap/ui2/srvc/chipinstance","sap/ui2/srvc/catalog","sap/ui2/srvc/chipdefinition"],function(U,M,q,O,a,G,C,d,c){"use strict";var b="sap.ushell_abap.adapters.abap.LaunchPageAdapter",D="/UI2/Fiori2LaunchpadHome",f="/UI2/FLPD_CATALOG",g="X-SAP-UI2-CHIP:/UI2/DYNAMIC_APPLAUNCHER",S="X-SAP-UI2-CHIP:/UI2/STATIC_APPLAUNCHER",h="X-SAP-UI2-CHIP:/UI2/CARD",j={catalogTileNotFound:"catalogTileNotFound",referenceTileNotFound:"referenceTileNotFound",noTargetMapping:"noTargetMapping",emptyConfiguration:"emptyConfiguration",tileIntentSupportException:"tileIntentSupportException"};var P="/UI2/FLPNoActionChip";var L=function(u,p,A){var k,o,l,t=new sap.ui2.srvc.Map(),m=(A&&A.config)||{},T=m.services&&m.services.targetMappings,r=m.services&&m.services.launchPage,E={},v=this;this._oCurrentPageSet=null;this._bPageSetFullyLoaded=false;if(!T){throw new Error("Configuration for target mappings service not passed");}if(!T.baseUrl){throw new Error("baseUrl was not passed in Configuration for target mappings service");}if(!T.relativeUrl){throw new Error("relativeUrl was not passed in Configuration for target mappings service");}if(sap.ui2.srvc.contracts.preview.setEnvironmentType){sap.ui2.srvc.contracts.preview.setEnvironmentType("runtime");}function w(e,s,i){try{return e.getImplementationAsSapui5();}catch(n){q.sap.log.error(i+": "+(n.message||n),n.stack,b);return new sap.ushell.ui.tile.StaticTile({icon:"sap-icon://error",info:"",infoState:"Critical",subtitle:n.message||n,title:s}).addStyleClass("sapUshellTileError");}}L.prototype._getBagText=function(e,s,i){if(e.getBagIds().indexOf(s)>-1&&e.getBag(s).getTextNames().indexOf(i)>-1){return e.getBag(s).getText(i);}return undefined;};L.prototype._getConfigurationProperty=function(i,s,n){var X,Y;try{X=i.getConfigurationParameter(s);Y=JSON.parse(X);}catch(e){return undefined;}if(Y[n]!==undefined){return Y[n];}return undefined;};L.prototype._orderBasedOnConfiguration=function(e,s){var X=(e&&sap.ui2.srvc.isArray(e.order)?e.order:[]),Y={},Z=[],$,_,i,n;X=X.concat(e&&sap.ui2.srvc.isArray(e.linkOrder)?e.linkOrder:[]);for(i=0,n=s.length;i<n;i+=1){$=s[i];Y[$.getId()]=$;}for(i=0,n=X.length;i<n;i+=1){_=X[i];if(Object.prototype.hasOwnProperty.call(Y,_)){Z.push(Y[_]);delete Y[_];}}for(i=0,n=s.length;i<n;i+=1){$=s[i];if(Object.prototype.hasOwnProperty.call(Y,$.getId())){Z.push($);}}return Z;};function x(e,i,s){if(s==="link"){return y(e.linkOrder,i.getId());}return y(e.order,i.getId());}function y(e,i){var s=e.indexOf(i);if(s<0){return s;}e.splice(s,1);return s;}function z(e,s,i,n){if(n==="link"){i=i-e.order.length;e.linkOrder.splice(i,0,s);}else{e.order.splice(i,0,s);}}function B(e,i){var n=i.getGroupTiles(e),s={order:[],linkOrder:[]};n.forEach(function(X){var Y=i.getTileType(X);if(Y==="link"){s.linkOrder.push(X.getId());}else{s.order.push(X.getId());}});return s;}function F(){var i;try{i=JSON.parse(v._oCurrentPageSet.getConfiguration());i.order.splice(0,0,v._oCurrentPageSet.getDefaultPage().getId());}catch(e){i={order:[v._oCurrentPageSet.getDefaultPage().getId()]};}return L.prototype._orderBasedOnConfiguration(i,v._oCurrentPageSet.getPages());}this.hideGroups=function(e){var i,n=new q.Deferred();if(!e||!(e instanceof Array)){n.reject("Input parameter must be of type Array.");}else{i=JSON.parse(v._oCurrentPageSet.getConfiguration()||"{}");i.hiddenGroups=e;v._oCurrentPageSet.setConfiguration(JSON.stringify(i),n.resolve.bind(n),n.reject.bind(n));}return n.promise();};this.isGroupVisible=function(e){var s=v._oCurrentPageSet.getConfiguration(),n,X,i;if(!s){return true;}n=JSON.parse(s);if(!n||!n.hiddenGroups){return true;}X=n.hiddenGroups;for(i=0;i<X.length;i+=1){if(X[i]===e.getId()){return false;}}return true;};L.prototype._triggerChipInstanceLoad=function(e){function s(){if(e._loadingDeferred){e._loadingDeferred.resolve();}delete e._loadingDeferred;delete e.$loadingPromise;}function i(n){q.sap.log.error("Failed to load tile: "+n,e.toString(),b);if(e._loadingDeferred){e._loadingDeferred.reject();}delete e._loadingDeferred;delete e.$loadingPromise;}e.load(s,i);};this._loadApplaunchersAndDelayLoadingOfOtherChips=function(e,i){var n=0,s=[],X=[];function Y(){if(n<=0){i();}}function Z(_){_._loadingDeferred=new q.Deferred();_.$loadingPromise=_._loadingDeferred.promise();if(window["sap-ui-debug"]===true){L.prototype._triggerChipInstanceLoad(_);}else{sap.ui.require(["sap/ushell/EventHub"],function(a1){var b1=a1.on("CoreResourcesComplementLoaded");b1.do(function(c1){if(c1.status==="success"){L.prototype._triggerChipInstanceLoad(_);b1.off();}else{q.sap.log.error("Did not load custom tile as core resources where not loaded",null,b);}});});}}function $(_){function a1(){n-=1;Y();}n+=1;_.load(a1,function(b1){q.sap.log.error("Failed to load tile: "+b1,_.toString(),b);a1();});}e.forEach(function(_){_.getChipInstances().forEach(function(a1){if(N(a1)){X.push(a1);}else if(Q(a1)){}else if(J(a1)||K(a1)){$(a1);}else{s.push(a1);}});});s.forEach(function(_){Z(_);});X.forEach(function(_){Z(_);});Y();};L.prototype._readTargetMappings=function(){var e=new q.Deferred(),i,s,n;function X(Z){var $=[];var _=Z.targetMappings||Z||{};Object.keys(_).forEach(function(a1){var b1={};["semanticObject","semanticAction","formFactors"].forEach(function(c1){b1[c1]=_[a1][c1];});$.push(b1);});return $;}if(O.get("compactTMPromise",m)){m.compactTMPromise.then(function(Z){var $=X(Z||{});e.resolve({results:$});},function(Z){e.reject(Z);});return e.promise();}i=O.create("services.targetMappings",m);s=i.cacheId||"";n="/sap/bc/ui2/start_up?so=%2A&action=%2A&tm-compact=true&shellType="+v._getShellType()+"&depth=0";if(s){n+=(n.indexOf("?")<0?"?":"&")+"sap-cache-id="+s;}var Y=i.sUI2CacheDisable;if(Y){n+=(n.indexOf("?")<0?"?":"&")+"sap-ui2-cache-disable="+Y;}sap.ui2.srvc.get(n,false,function(Z){var $=JSON.parse(Z),_=$.targetMappings||{},a1=X(_);e.resolve({results:a1});},function(Z){e.reject(Z);});return e.promise();};L.prototype._makeTargetMappingSupportKey=function(s,e){return s+"-"+e;};L.prototype._isWrapperOnly=function(e){return!e.getConfiguration();};function H(e){var i=[],n=sap.ushell.Container.getService("PageBuilding").getFactory();e.forEach(function(s){var X=s.getRemoteCatalog(),Y;if(s.getBaseChipId()==="X-SAP-UI2-CHIP:/UI2/ACTION"){return;}Y=n.createChipInstance({chipId:s.getId(),remoteCatalogId:X&&X.getId()});i.push(Y);});return i;}function I(){var e=v._oCurrentPageSet.getDefaultPage().getAllCatalogs(),n,s=e.getCatalogs(),X=[],i;for(i=0;i<s.length;i+=1){n=s[i];X.push({data:{},errorMessage:undefined,id:n.getId(),title:n.isStub()?n.getId():n.getTitle(),tiles:n.isStub()?[]:H(n.getChips()),ui2catalog:n});}return X;}function J(e){var s=e.getChip().getBaseChipId();return s===g||s===S;}function K(e){var s=e.getChip().getBaseChipId();return h===s;}function N(e){return!!e.getChip().getRemoteCatalog();}function Q(e){return!N(e)&&e.getChip().getBaseChipId()===undefined;}function R(e){var i,s=e.getConfigurationParameter("tileConfiguration");try{i=JSON.parse(s||"{}");}catch(n){q.sap.log.error("Tile with ID '"+e.getId()+"' has a corrupt configuration containing a 'tileConfiguration' value '"+s+"' which could not be parsed. If present, a (stringified) JSON is expected as value.",n.message,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");return{};}return i;}function V(e){var i={},n,s,X;try{n=JSON.parse(e.getChip()._getChipRawConfigurationString());s=JSON.parse(n&&n.tileConfiguration||"{}");X=JSON.parse(s&&s.TILE_PROPERTIES||"{}");if(X.semanticObject&&X.semanticAction){i.navigation_use_semantic_object=true;i.navigation_semantic_object=X.semanticObject;i.navigation_semantic_action=X.semanticAction;}}catch(Y){return{};}return i;}function W(e){var s,i,n;if(e.getChip().getBaseChipId()==="X-SAP-UI2-CHIP:/UI2/AR_SRVC_NEWS"){return{navigation_use_semantic_object:true,navigation_semantic_object:"NewsFeed",navigation_semantic_action:"displayNewsList",navigation_semantic_parameters:"",navigation_target_url:"#NewsFeed-displayNewsList"};}s=V(e);if(s.navigation_use_semantic_object){return s;}try{n=JSON.parse(e.getChip()._getChipRawConfigurationString());i=JSON.parse(n&&n.tileConfiguration||"{}");}catch(X){return{};}return i;}this._parseFullChipId=function(s){var e=s.split(":"),i=e.pop(),n=null;if(e.length>2){n=e.shift();}return{id:i,prefix:n,catalog:e.join(":")};};this.getTargetMappingSupport=function(){return t;};this._parseReferenceLost=function(s){var e,i=s||Object.prototype.toString.apply(i);if(!i.match(/^Reference lost: Note \d+ Page.+\s,\sInstance ID.+$/)){q.sap.log.warning("The string that describes a lost reference is in an unexpected format","This is expected to be a string exactly like 'Reference lost: Note <#> Page <CATALOG_ID> , Instance ID <CHIP_ID>' instead of the given '"+s+"'","sap.ushell_abap.adapters.abap.LaunchPageAdapter");return{id:"Unknown",catalog:"Unknown"};}e=i.split(" , ").map(function(n){return n.split(" ").pop();});return{id:e[1],catalog:e[0]};};this._flattenArray=function(i){var v=this;if(Object.prototype.toString.apply(i)!=="[object Array]"){return i;}return i.reduce(function(e,n){return e.concat(v._flattenArray(n));},[]);};this._findAndReportTileErrors=function(e,t){var i=this._getPossibleTileErrors(e,t);if(i.length>0){this._reportTileErrors(i);}};this._getPossibleTileErrors=function(e,t){var v=this;return e.map(function(i){return{group:{id:i.getId(),title:i.getTitle()},errors:v._getPossibleTileErrorsFromOnePage(i,t)};});};this._getPossibleTileErrorsFromOnePage=function(e,t){var v=this;var i=e.getChipInstances().reduce(function(n,s){var X,Y,Z,$,_,a1,b1,c1;c1=s.getChip();Y=v._parseFullChipId(c1.getId());if(!c1.isInitiallyDefined()){n.push({type:j.catalogTileNotFound,chipInstanceId:s.getId(),chipId:Y.id,chipCatalogId:Y.catalog});}else if(c1.isReference()&&c1.isBrokenReference()){_=v._parseReferenceLost(c1.getTitle());n.push({type:j.referenceTileNotFound,chipInstanceId:s.getId(),referenceChipId:Y.id,referenceChipCatalogId:Y.catalog,missingReferredChipId:_.id,missingReferredCatalogId:_.catalog});}else{try{X=v._checkTileIntentSupport(s,t);}catch(d1){X={isSupported:false,reason:j.tileIntentSupportException,exception:d1};}if(!X.isSupported){$=v._getBagText(s,"tileProperties","display_title_text");Z=v._getBagText(s,"tileProperties","display_subtitle_text");switch(X.reason){case j.noTargetMapping:if(J(s)){a1=R(s);}else{a1=W(s);}n.push({type:j.noTargetMapping,chipInstanceId:s.getId(),chipInstanceTitle:$||a1.display_title_text||s.getTitle(),chipInstanceSubtitle:Z||a1.display_subtitle_text,tileURL:a1.navigation_target_url||"#"+a1.navigation_semantic_object+"-"+a1.navigation_semantic_action+(a1.navigation_semantic_parameters?"?"+a1.navigation_semantic_parameters:"")});break;case j.emptyConfiguration:b1=s.getConfigurationParameter("tileConfiguration");n.push({type:j.emptyConfiguration,chipInstanceId:s.getId(),chipInstanceTitle:$||s.getTitle(),chipInstanceSubtitle:Z||null,tileConfiguration:b1});break;case j.tileIntentSupportException:n.push({type:j.tileIntentSupportException,exception:X.exception,chipInstanceId:s.getId()});break;case j.referenceTileNotFound:break;default:}}}return n;},[]);return i;};this._formatTileError=function(e){switch(e.type){case j.catalogTileNotFound:return"comes from catalog tile with ID '"+e.chipId+"' but this cannot be found in catalog '"+e.chipCatalogId+"' (CATALOG TILE NOT FOUND).";case j.referenceTileNotFound:return"comes from reference tile '"+e.referenceChipId+"'"+" in catalog '"+e.referenceChipCatalogId+"'"+" which in turn refers to the tile '"+e.missingReferredChipId+"'"+" from catalog '"+e.missingReferredCatalogId+"', but this is missing (REFERENCED TILE NOT FOUND).";case j.noTargetMapping:return"was hidden because a target mapping for the tile URL '"+e.tileURL+"' was not found (TARGET MAPPING NOT FOUND).";case j.emptyConfiguration:return"the tile configuration '"+e.tileConfiguration+"' is empty or invalid (BAD CONFIGURATION).";case j.tileIntentSupportException:return"exception occurred while checking tile intent support: "+e.exception+" (EXCEPTION RAISED).";default:return"unknown error type '"+e.type+"' (UNKNOWN ERROR). Error data: "+JSON.stringify(e,null,3);}};this._reportTileErrors=function(e){var v=this;var n=[];var X=[];function Y(Z,$){var _=[Z,$].map(function(s,i){return i===1&&s?"("+s+")":s;}).filter(function(s){return typeof s==="string"&&s.length>0;}).join(" ");return(_.length>0)?"'"+_+"'":"";}e.forEach(function(i){var Z="  in Group '"+i.group.title+"' with Group ID '"+i.group.id+"'",$=[],_=[];i.errors.forEach(function(a1){var b1=["  - tile instance",Y(a1.chipInstanceTitle,a1.chipInstanceSubtitle),"with ID '"+a1.chipInstanceId+"'"].filter(function(s){return s.length>0;}).join(" ");if(a1.type===j.noTargetMapping){_.push([b1,"    "+v._formatTileError(a1)].join("\n"));}else{$.push([b1,"    "+v._formatTileError(a1)].join("\n"));}});if($.length>0){X.push([Z,$.join("\n")].join("\n"));}if(_.length>0){n.push([Z,_.join("\n")].join("\n"));}});if(X.length>0){X.unshift("Tile error(s) were detected:");q.sap.log.error(X.join("\n"),null,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");}if(n.length>0){n.unshift("Tile warning(s) were detected:");q.sap.log.warning(n.join("\n"),null,"sap.ushell_abap.adapters.abap.LaunchPageAdapter");}};this.getGroups=function(){var v=this,e,i,n;if(v._bPageSetFullyLoaded){return(new q.Deferred()).resolve(F()).promise();}if(!o){o=new q.Deferred();e=new q.Deferred();n=sap.ushell.Container.getService("PageBuilding");if(r&&r.cacheId){n.getFactory().getPageBuildingService().readPageSet.cacheBusterTokens.put(D,r.cacheId);}if(r&&r["sap-ui2-cache-disable"]&&n.getFactory().getPageBuildingService().readPageSet){var s=n.getFactory().getPageBuildingService().readPageSet.appendedParameters||{};s["sap-ui2-cache-disable"]=r["sap-ui2-cache-disable"];n.getFactory().getPageBuildingService().readPageSet.appendedParameters=s;}i=this._readTargetMappings().done(function(Y){var Z=sap.ui2.srvc.getFormFactor();Y.results.forEach(function($){var _=L.prototype._makeTargetMappingSupportKey($.semanticObject,$.semanticAction);t.put(_,t.get(_)||!!($.formFactors&&$.formFactors[Z]));});});if(C.last("/core/spaces/enabled")){sap.ushell.Container.getServiceAsync("PageBuilding").then(function(Y){var Z=Y.getFactory();var $=new sap.ui2.srvc.Page(Z,{id:P});var _={getDefaultPage:function(){return $;},getPages:function(){return[$];},appendPage:function(){throw new Error("Not implemented in Pages Runtime");},isPageRemovable:function(){return false;},removePage:function(){throw new Error("Not implemented in Pages Runtime");},isPageResettable:function(){return true;},resetPage:function(){},getConfiguration:function(){return"{}";},setConfiguration:function(){},filter:function(){}};v._oCurrentPageSet=_;o.resolve([]);});}else{var X=n.getPageSet(D);X.fail(e.reject.bind(e)).done(function(Y){v._oCurrentPageSet=Y;v._oCurrentPageSet.filter([D],[f]);v._loadApplaunchersAndDelayLoadingOfOtherChips(Y.getPages(),e.resolve.bind(e,Y));});q.when(i,e).done(function(Y,Z){v._bPageSetFullyLoaded=true;if(q.sap.log.getLevel()>=q.sap.log.Level.DEBUG){v._findAndReportTileErrors(Z.getPages(),t);}o.resolve(F());}).fail(o.reject.bind(o));}}return o.promise();};this.getDefaultGroup=function(){var e=new q.Deferred();this.getGroups().done(function(){e.resolve(v._oCurrentPageSet.getDefaultPage());}).fail(e.reject.bind(e));return e.promise();};this.getGroupTitle=function(e){return e.getTitle();};this.getGroupId=function(e){return e.getId();};this.getGroupTiles=function(i){var n;try{n=JSON.parse(i.getLayout());}catch(e){q.sap.log.warning("Group "+i.getId()+": invalid layout: "+i.getLayout(),null,b);}return this._orderBasedOnConfiguration(n,i.getChipInstances());};this.addGroup=function(s){var e=new q.Deferred();v._oCurrentPageSet.appendPage(s,f,e.resolve.bind(e),e.reject.bind(e,F()));return e.promise();};this.removeGroup=function(e){var i=new q.Deferred();if(v._oCurrentPageSet.isPageRemovable(e)){v._oCurrentPageSet.removePage(e,i.resolve.bind(i),i.reject.bind(i,F()));}else{i.reject(F());}return i.promise();};this.resetGroup=function(e){var i=new q.Deferred(),v=this;if(v._oCurrentPageSet.isPageRemovable(e)){i.reject(F());}else if(v._oCurrentPageSet.isPageResettable(e)){v._oCurrentPageSet.resetPage(e,function(){v._loadApplaunchersAndDelayLoadingOfOtherChips([e],i.resolve.bind(i,e));},i.reject.bind(i,F()));}else{i.resolve(e);}return i.promise();};this.isGroupRemovable=function(e){return v._oCurrentPageSet.isPageRemovable(e);};this.isGroupLocked=function(e){return e.isPersonalizationLocked();};this.isLinkPersonalizationSupported=function(e){if(!e){return true;}if(!e.isStub()){var i=e.getContract&&e.getContract("types"),n=i&&i.getAvailableTypes()||[];return n.indexOf("link")!==-1;}return false;};this.isTileIntentSupported=function(e){var i,s,n,X,Y=this._checkTileIntentSupport(e,t);if(!Y.isSupported&&Y.reason===j.noTargetMapping){if(J(e)){i=R(e);}else{i=W(e);}X=this._getBagText(e,"tileProperties","display_title_text")||i.display_title_text;n=this._getBagText(e,"tileProperties","display_subtitle_text")||i.display_subtitle_text;s=i.navigation_target_url;q.sap.log.warning("Group tile with ID '"+e.getId()+"' is filtered out as the current user has no target mapping assigned for the intent '"+s+"'","\nGroup Tile ID: '"+e.getId()+"'\n"+"Title: '"+X+"'\n"+"Subtitle: '"+n+"'\n"+"Intent: '"+s+"' - ","sap.ushell_abap.adapters.abap.LaunchPageAdapter");}return Y.isSupported;};this._checkTileIntentSupport=function(e,t){var i,n;var s=L.prototype._makeTargetMappingSupportKey;if(!J(e)){i=W(e);if(!i.navigation_use_semantic_object||!i.navigation_semantic_object||!i.navigation_semantic_action){return{isSupported:true};}n=t.get(s(i.navigation_semantic_object,i.navigation_semantic_action));if(!n){n=t.get(s("*",i.navigation_semantic_action));}if(!n){return{isSupported:false,reason:j.noTargetMapping};}return{isSupported:true};}if(e.isStub()){throw new sap.ui2.srvc.Error("Applauncher Tile not loaded completely","sap.ushell_abap.adapters.abap.LaunchPageAdapter");}if(e.getChip()&&typeof e.getChip().isBrokenReference==="function"&&e.getChip().isBrokenReference()){return{isSupported:false,reason:j.referenceTileNotFound};}i=R(e);if(a(i)){return{isSupported:false,reason:j.emptyConfiguration};}if(!i.navigation_use_semantic_object){return{isSupported:true};}n=t.get(s(i.navigation_semantic_object,i.navigation_semantic_action));if(n){return{isSupported:true};}return{isSupported:false,reason:j.noTargetMapping};};this.moveGroup=function(e,n){var i=new q.Deferred();function s(X){var Y,Z=[];X.forEach(function($){Z.push($.getId());});Y=JSON.parse(v._oCurrentPageSet.getConfiguration()||"{}");Y.order=Z;v._oCurrentPageSet.setConfiguration(JSON.stringify(Y),i.resolve.bind(i),i.reject.bind(i,F()));}this.getGroups().done(function(X){var Y=X.indexOf(e);X.splice(Y,1);X.splice(n,0,e);s(X);});return i.promise();};this.setGroupTitle=function(e,n){var i=new q.Deferred();e.setTitle(n,i.resolve.bind(i),function(){i.reject(e.getTitle());});return i.promise();};this.addTile=function(e,i){var n=new q.Deferred(),s=e.getChip();if(e.isStub()){n.reject(F(),"Tile was not added to the group as the tile failed loading");}else{if(!i){i=v._oCurrentPageSet.getDefaultPage();}i.addChipInstance(s,n.resolve.bind(n),n.reject.bind(n,F()));}return n.promise();};this.removeTile=function(e,i){var n=q.Deferred();e.removeChipInstance(i,n.resolve.bind(n),n.reject.bind(n,F()));return n.promise();};this.moveTile=function(e,s,i,n,X,Y){var Z=new q.Deferred(),$=this._isWrapperOnly(e),_,a1=new sap.ui2.srvc.Map(),b1,c1,d1,e1,f1,g1=Z.reject.bind(Z,F()),h1=2,i1;function j1(k1){h1-=1;b1=b1||k1;if(h1<=0){Z.resolve(b1);}}if(!X){X=n;}d1=B(n,this);e1=B(X,this);i1=this.getTileType(e);s=x(d1,e,i1);if(s<0){q.sap.log.error("moveTile: tile not found in source group",null,b);g1();return Z.promise();}if(n===X){z(d1,e.getId(),i,Y);n.setLayout(JSON.stringify(d1),Z.resolve.bind(Z,e),g1);}else{_=sap.ushell.Container.getService("PageBuilding").getFactory().getPageBuildingService();c1=e.getBagIds();c1.forEach(function(k1){var l1={texts:[],properties:[]},m1=e.getBag(k1);m1.getOwnTextNames().forEach(function(n1){l1.texts.push({name:n1,value:m1.getText(n1)});});m1.getOwnPropertyNames().forEach(function(n1){l1.properties.push({name:n1,value:m1.getProperty(n1)});});if(l1.texts.length>0||l1.properties.length>0){a1.put(k1,l1);}});_.openBatchQueue();f1=this.getGroupTiles(X);X.addChipInstance($?e.getChip():e,function(k1){var l1,m1;f1.splice(i,0,k1);c1.forEach(function(n1){m1=a1.get(n1);if(m1){l1=k1.getBag(n1);m1.texts.forEach(function(o1){l1.setText(o1.name,o1.value);});m1.properties.forEach(function(o1){l1.setProperty(o1.name,o1.value);});l1.save(function(){},function(){q.sap.log.error("Bag "+n1+": could not be saved",null,b);});}});z(e1,k1.getId(),i,Y);X.setLayout(JSON.stringify(e1),j1.bind(this,k1),g1);},g1,e.isStub());n.removeChipInstance(e,j1,g1);n.setLayout(JSON.stringify(d1),undefined,g1);_.submitBatchQueue(undefined,g1);}return Z.promise();};this.getTileId=function(e){return e.getId();};this.getTileType=function(i){var n=i.getPage(),s;try{s=JSON.parse(n.getLayout());if(s.linkOrder&&s.linkOrder.indexOf(i.getId())>-1){return"link";}}catch(e){q.sap.log.warning("Group "+n.getId()+": invalid layout: "+n.getLayout(),null,b);}if(i.isStub()===false){var X=i.getContract("types");if(X&&X.getAvailableTypes().indexOf("card")>-1){return"card";}}return"tile";};this.getCardManifest=function(e){var s,i,n;try{s=e.getConfigurationParameter("cardManifest");i=JSON.parse(s);n=M.getCardData(e);i=M.mergeCardData(i,n);return i;}catch(X){q.sap.log.error("Manifest of card with id '"+e.getId()+"' could not be read. "+X.message);}};this.getTileTitle=function(e){return e.getTitle();};this.getTileView=function(e){var v=this,i=new q.Deferred(),n;function s(){var Y,Z;n=e.getContract("types");if(n){Y=v.getTileType(e);n.setType(Y);}Z=e.getImplementationAsSapui5();if(Y==="link"){var $,_,a1,b1;if(!Z.hasModel()){Z=Z.getComponentInstance().getRootControl();}$=Z.getModel();_=Z.getController();a1=$&&$.getProperty?$.getProperty("/nav/navigation_target_url"):undefined;b1=new G({mode:"{view>/mode}",header:"{view>/config/display_title_text}",subheader:"{view>/config/display_subtitle_text}",sizeBehavior:"{view>/sizeBehavior}",size:"Auto",url:_.formatters&&_.formatters.leanURL(a1),press:[_.onPress,_]});b1.setModel($,"view");i.resolve(b1);return;}i.resolve(Z);}function X(Y){i.reject("Tile not successfully loaded"+(Y?(": "+Y):""));}if(!e.$loadingPromise){if(!e.isStub()){sap.ui2.srvc.call(s,X,!J(e));}else{X();}}else{e.$loadingPromise.fail(X).done(function(){try{s();}catch(Y){X((Y.message||Y));}});}return i.promise();};this.getTileSize=function(e){var i=(!e.isStub()&&e.getConfigurationParameter("row"))||"1",n=(!e.isStub()&&e.getConfigurationParameter("col"))||"1";return i+"x"+n;};this.refreshTile=function(e){e.refresh();};this.setTileVisible=function(e,n){var i=!e.isStub()&&e.getContract("visible"),s,X;if(i){i.setVisible(n);return;}if(e.isStub()&&e.$loadingPromise){s=this.getTileId(e);X=E[s];E[s]=n;if(X===undefined){e.$loadingPromise.done(function(){var i=e.getContract("visible");if(i){i.setVisible(E[s]);}});}return;}};this.getTileActions=function(e){var i=!e.isStub()&&e.getContract("actions");if(i){return i.getActions();}return[];};this.getTileTarget=function(){return null;};this.getTileDebugInfo=function(e){var s,i=e.getChip(),n=i.getCatalog(),X={chipId:i.getId(),chipInstanceId:e.getId(),chipTitle:i.getTitle(),chipDescription:i.getDescription(),completelyLoaded:!e.isStub()};if(n){X.catalogId=n.getId();}s=JSON.stringify(X);return s;};this.getCatalogs=function(){var e,i=l,n=k===false;function s(){var $=0,_=I();_.forEach(function(a1){var b1=a1.ui2catalog;if(b1.isStub()||b1.getType()==="H"||b1.getType()==="REMOTE"){$+=1;b1.refresh(function(){a1.title=b1.getTitle();a1.tiles=H(b1.getChips());e.notify(a1);$-=1;if($<=0){e.resolve(_);}},function(c1){q.sap.log.error("Failed to load catalog: "+c1,b1.toString(),b);a1.errorMessage=c1||"Error";e.notify(a1);$-=1;if($<=0){e.resolve(_);}});}else{e.notify(a1);e.$notified=true;}});if($<=0){e.resolve(_);}}function X(){var $=I();$.forEach(function(_){e.notify(_);});e.resolve($);}function Y($){var _=v._oCurrentPageSet.getDefaultPage().getAllCatalogs();if(_.isStub()){_.load(s,e.reject.bind(e),"type eq 'CATALOG_PAGE' or type eq 'H' or type eq 'SM_CATALOG'"+" or type eq 'REMOTE'",true,"title",true);}else{sap.ui2.srvc.call(n?s:X,e.reject.bind(e),$);}}function Z($){if(T&&T.cacheId){var _=sap.ushell.Container.getService("PageBuilding").getFactory().getPageBuildingService().readAllCatalogs.cacheBusterTokens;_.put(D,T.cacheId);if(C.last("/core/spaces/enabled")){_.put(P,T.cacheId);}}if(v._bPageSetFullyLoaded){Y($);}else{v.getGroups().done(Y).fail(e.reject.bind(e));}}if(l&&!l.$notified&&!n){e=l;}else{e=l=new q.Deferred();e.done(function(){if(e===l){k=true;}}).always(function(){if(e===l){l=null;}});if(i){if(n){k=undefined;}i.always(Z);}else{Z(true);}}return e.promise();};this.isCatalogsValid=function(){return!!k;};this.getCatalogData=function(e){return e.ui2catalog.getCatalogData();};this.getCatalogError=function(e){return e.errorMessage;};this.getCatalogId=function(e){return e.id;};this.getCatalogTitle=function(e){return e.title;};this.getCatalogTiles=function(e){var i,n,s=new q.Deferred(),X=0;function Y(){X-=1;if(X===0){s.resolve(e.tiles);}}function Z($,_){q.sap.log.error("Failed to load catalog tile: "+_,$.toString(),b);Y();}for(i=0;i<e.tiles.length;i+=1){n=e.tiles[i];if(n.isStub()){X+=1;n.load(Y,Z.bind(null,n));}}if(X===0){s.resolve(e.tiles);}return s.promise();};this.getCatalogTileNumberUnit=c.getCatalogTileNumberUnit;this.getCatalogTileId=function(e){var i=e.getChip(),s=i.getId();if(i.getCatalog()&&i.getCatalog().getCatalogData()&&i.getCatalog().getCatalogData().systemAlias){s+="_"+i.getCatalog().getCatalogData().systemAlias;}return s;};this.getCatalogTileTitle=function(e){return e.getChip().getTitle();};this.getCatalogTileSize=c.getCatalogTileSize;this.getCatalogTileView=function(e,i){i=typeof i!=="undefined"?i:true;var s=this.getCatalogTileTitle(e);if(e.isStub()){q.sap.log.warning("CHIP (instance) is just a stub!",e.toString(true),b);return new sap.ushell.ui.tile.StaticTile({icon:"sap-icon://hide",info:"",infoState:"Critical",subtitle:"",title:s}).addStyleClass("sapUshellTileError");}if(i){var n=e.getContract("preview");if(n){n.setEnabled(true);}else{return new sap.ushell.ui.tile.StaticTile({title:s,subtitle:"",info:"",infoState:"Neutral",icon:"sap-icon://folder-full"});}}return w(e,s,"Cannot get catalog tile view as SAPUI5");};this.getCatalogTileTargetURL=c.getCatalogTileTargetURL;this.getCatalogTilePreviewSubtitle=c.getCatalogTilePreviewSubtitle;this.getCatalogTilePreviewTitle=c.getCatalogTilePreviewTitle;this.getCatalogTilePreviewInfo=c.getCatalogTilePreviewInfo;this.getCatalogTilePreviewIndicatorDataSource=c.getCatalogTilePreviewIndicatorDataSource;this.getCatalogTilePreviewIcon=c.getCatalogTilePreviewIcon;this.getCatalogTileKeywords=function(e){var i={},s=e.getTitle(),n=this.getCatalogTilePreviewSubtitle(e),X=e.getChip().getDescription();function Y(i,b1){if(sap.ui2.srvc.isArray(b1)){b1.forEach(function(c1){if(i.hasOwnProperty(c1)){return;}i[c1]=null;});}}function Z(e){var b1=L.prototype._getBagText(e,"tileProperties","display_search_keywords");if(!sap.ui2.srvc.isString(b1)||b1===""){return[];}return b1.trim().split(/\s*,\s*/g);}function $(e){var b1=L.prototype._getBagText(e,"tileProperties","display_info_text");if(b1){return[b1];}return[];}function _(e){var b1=L.prototype._getConfigurationProperty(e,"tileConfiguration","display_number_unit");if(b1){return[b1];}return[];}function a1(e){var b1;if(e.isStub()){return[];}b1=e.getContract("search");if(b1){return b1.getKeywords();}return[];}Y(i,Z(e));Y(i,$(e));Y(i,_(e));Y(i,a1(e));if(s){Y(i,[s]);}if(n){Y(i,[n]);}if(X){Y(i,[X]);}return Object.keys(i);};this.addBookmark=function(e,i){var s=S,n={display_icon_url:e.icon||"",display_info_text:e.info||"",display_subtitle_text:e.subtitle||"",display_title_text:e.title},X=new q.Deferred();var Y={tileProperties:{texts:{display_title_text:n.display_title_text,display_subtitle_text:n.display_subtitle_text,display_info_text:n.display_info_text}}};if(e.serviceUrl){s=g;n.display_number_unit=e.numberUnit;n.service_refresh_interval=e.serviceRefreshInterval||0;n.service_url=e.serviceUrl;}if(i&&!(i instanceof sap.ui2.srvc.Page)){X.reject("The given object is not a group");return X.promise();}n={tileConfiguration:JSON.stringify(n)};this._createBookmarkTile(s,e.url,n,Y,e.title,i).then(function(){X.resolve();}).catch(function(Z){X.reject(Z.toString());});return X.promise();};this.addCustomBookmark=function(e,i){var n=e.vizConfig["sap.flp"].chipConfig;var s=new q.Deferred();if(i&&!(i instanceof sap.ui2.srvc.Page)){s.reject("The given object is not a group");return s.promise();}this._createBookmarkTile(n.chipId,e.url,n.configuration,n.bags,e.title,i).then(function(){s.resolve();}).catch(function(X){s.reject(X.toString());});return s.promise();};this._getTileTargetConfiguration=function(s){return sap.ushell.Container.getServiceAsync("URLParsing").then(function(e){var i={navigation_target_url:s,navigation_use_semantic_object:false};var n=new U();var X=new U(s);var Y=X.host()+X.path()===n.host()+n.path();var Z=L.prototype._makeTargetMappingSupportKey;if(s[0]==="#"||Y){var $=e.parseShellHash(e.getShellHash(s));if($&&t.get(Z($.semanticObject,$.action))!==undefined){i.navigation_use_semantic_object=true;i.navigation_semantic_object=$.semanticObject;i.navigation_semantic_action=$.action;i.navigation_semantic_parameters=e.paramsToString($.params);}}return i;});};this._updateBags=function(e,i){var n=[];var s=[];if(!i){i={};n.push(Promise.resolve([]));}Object.keys(i).forEach(function(X){var Y;var Z=false;var $=i[X];var _=e.getBag(X);try{for(Y in $.properties){_.setProperty(Y,$.properties[Y]);Z=true;}for(Y in $.texts){_.setText(Y,$.texts[Y]);Z=true;}n.push(new Promise(function(b1,c1){if(Z){s.push(X);_.save(b1,c1);}else{b1();}}));}catch(a1){n.push(Promise.reject(a1));}});return Promise.all(n).then(function(){return s;});};this._checkBookmarkConfiguration=function(e){return new Promise(function(i,n){try{var s=R(e);if(!s.navigation_target_url){throw new Error("tileConfiguration.navigation_target_url was not set");}this.getTileSize(e);i();}catch(X){var Y="Chip configuration check failed: "+X.toString();q.sap.log.error(Y,e.getId(),b);n(Y);}}.bind(this));};this._createBookmarkTile=function(s,e,i,n,X,Y){return Promise.all([sap.ushell.Container.getServiceAsync("PageBuilding"),this._getTileTargetConfiguration(e)]).then(function(Z){var $=Z[0];var _=Z[1];if(!i.tileConfiguration){i.tileConfiguration=JSON.stringify(_);}else{var a1=JSON.parse(i.tileConfiguration);a1=d({},a1,_);i.tileConfiguration=JSON.stringify(a1);}var b1=$.getFactory();var c1=b1.getPageBuildingService();return new Promise(function(d1,e1){if(this._bPageSetFullyLoaded){Y=Y||this._oCurrentPageSet.getDefaultPage();var f1=b1.createChipInstance({chipId:s,pageId:Y.getId(),title:X,configuration:JSON.stringify(i),layoutData:""});Y.addChipInstance(f1,d1,e1,undefined);}else{try{c1.createPageChipInstanceFromRawData({chipId:s,configuration:JSON.stringify(i),pageId:"/UI2/Fiori2LaunchpadHome",title:X},function(h1){b1.createChipInstance(h1,d1,e1,undefined);},e1);}catch(g1){e1(g1);}}}.bind(this));}.bind(this)).then(function(Z){return this._updateBags(Z,n).then(function(){return this._checkBookmarkConfiguration(Z);}.bind(this)).catch(function($){return new Promise(function(_,a1){Z.remove(a1.bind(undefined,$),a1.bind(undefined,$));});});}.bind(this));};L.prototype._isBookmarkFor=function(e,i){var s=e.getChip().getBaseChipId();if(s!==undefined){var n=R(e).navigation_target_url;if(typeof i==="string"){return J(e)&&n===i;}return i.chipId===s&&i.url===n;}return false;};L.prototype._visitBookmarks=function(s,e){var i=[],n=new q.Deferred();v.getGroups().fail(n.reject.bind(n)).done(function(X){var Y=0;X.forEach(function(Z){Z.getChipInstances().forEach(function($){if(v._isBookmarkFor($,s)){Y+=1;if(e){i.push(e($));}}});});if(i.length===0){n.resolve(Y);}else{q.when.apply(q,i).fail(function(Z){n.reject(Z);}).done(function(){n.resolve(Y);});}});return n.promise();};this._visitCustomBookmarks=function(i,e){if(!i.chipId){return Promise.reject("_visitCustomBookmarks: Required parameter is missing: oIdentifier.chipId");}return new Promise(function(n,s){this.getGroups().fail(s).done(function(X){var Y=[];var Z=0;X.forEach(function($){$.getChipInstances().forEach(function(_){if(L.prototype._isBookmarkFor(_,i)){Z+=1;if(e){Y.push(e(_));}}});});Promise.all(Y).then(function(){n(Z);}).catch(s);});}.bind(this));};this.countBookmarks=function(s){return L.prototype._visitBookmarks(s);};this.countCustomBookmarks=function(i){return this._visitCustomBookmarks(i);};this.deleteBookmarks=function(s){return L.prototype._visitBookmarks(s,function(e){var i=new q.Deferred();e.remove(i.resolve.bind(i),i.reject.bind(i));return i.promise();});};this.deleteCustomBookmarks=function(i){return this._visitCustomBookmarks(i,function(e){return new Promise(function(n,s){e.remove(n,s);});});};this.updateBookmarks=function(s,e){return L.prototype._visitBookmarks(s,function(i){var n=R(i),X=new q.Deferred();var Y={tileProperties:{texts:{}}};if(e.title){Y.tileProperties.texts.display_title_text=e.title;}if(typeof e.subtitle==="string"){Y.tileProperties.texts.display_subtitle_text=e.subtitle;}if(typeof e.info==="string"){Y.tileProperties.texts.display_info_text=e.info;}var Z={display_icon_url:typeof e.icon==="string"?e.icon:n.display_icon_url,display_info_text:typeof e.info==="string"?e.info:n.display_info_text,display_subtitle_text:typeof e.subtitle==="string"?e.subtitle:n.display_subtitle_text,display_title_text:e.title||n.display_title_text,display_number_unit:typeof e.numberUnit==="string"?e.numberUnit:n.display_number_unit,service_refresh_interval:e.serviceRefreshInterval||n.service_refresh_interval,service_url:e.serviceUrl||n.service_url};var $={};this._getTileTargetConfiguration(e.url||n.navigation_target_url).then(function(_){Z=d({},Z,_);$.tileConfiguration=JSON.stringify(Z);}).then(function(){return new Promise(function(_,a1){i.updateConfiguration($,_,a1);});}).then(function(){i.getContract("configuration").fireConfigurationUpdated(Object.keys($));return this._updateBags(i,Y);}.bind(this)).then(function(_){if(_.length){i.getContract("bag").fireBagsUpdated(_);}X.resolve();}).catch(function(_){X.reject(_.toString());});return X.promise();}.bind(this));};this.updateCustomBookmarks=function(i,e){var n=O.get(["vizConfig","sap.flp","chipConfig"],e)||{};var s=n.configuration||{};var X=n.bags||{};var Y=e.url;return this._visitCustomBookmarks(i,function(Z){return this._getTileTargetConfiguration(Y).then(function($){var _;if(!s.tileConfiguration){_=R(Z);_=d({},_,$);s.tileConfiguration=JSON.stringify(_);}else{_=JSON.parse(s.tileConfiguration);_=d({},_,$);s.tileConfiguration=JSON.stringify(_);}return new Promise(function(a1,b1){try{Z.updateConfiguration(s,a1,b1);}catch(c1){b1(c1);}});}).then(function(){Z.getContract("configuration").fireConfigurationUpdated(Object.keys(s));return this._checkBookmarkConfiguration(Z);}.bind(this)).then(function(){return this._updateBags(Z,X);}.bind(this)).then(function($){if($.length){Z.getContract("bag").fireBagsUpdated($);}return new Promise(function(_,a1){if(e.title){Z.setTitle(e.title,true,_,a1);}else{_();}});});}.bind(this));};this.onCatalogTileAdded=function(){k=false;};this.isCustomTile=function(e){return!J(e);};};L.prototype._getShellType=function(){if(sap&&sap.ushell_abap&&typeof sap.ushell_abap.getShellType==="function"){return sap.ushell_abap.getShellType();}return"FLP";};L.prototype._getCatalogTileIndex=function(){this._oCatalogTileIndexPromise=sap.ushell.Container.getServiceAsync("PageBuilding").then(function(p){var u=p.getFactory().getPageBuildingService();return new Promise(function(r,e){u.readAllCatalogs(P,r,e,"type eq 'CATALOG_PAGE' or type eq 'H' or type eq 'SM_CATALOG' or type eq 'REMOTE'","title",true);});}).then(function(r){var o={};r.results.forEach(function(e){e.Chips.results.forEach(function(i){if(!o[i.id]){o[i.id]=i;}});});return o;}).catch(function(){return{};});return this._oCatalogTileIndexPromise;};return L;},true);