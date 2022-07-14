// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/adapters/cdm/v3/_LaunchPage/readHome","sap/ushell/adapters/cdm/_LaunchPage/modifyHome","sap/ushell/adapters/cdm/v3/_LaunchPage/readCatalogs","sap/m/library","sap/ushell/utils","sap/ushell/utils/WindowUtils","sap/ushell/adapters/cdm/v3/utilsCdm","sap/ushell/components/tiles/utilsRT","sap/ushell/adapters/cdm/v3/AdapterBase","sap/ushell/adapters/cdm/v3/_LaunchPage/readVisualizations","sap/ushell/navigationMode","sap/ushell/Config","sap/ui/model/json/JSONModel","sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject","sap/base/util/ObjectPath","sap/base/Log"],function(r,m,R,M,u,W,U,o,A,a,n,C,J,q,i,O,L){"use strict";var g=M.GenericTileMode;var S="sap.ushell.components.tiles.cdm.applauncher";var D="sap.ushell.components.tiles.cdm.applauncherdynamic";function b(c,p,d){A.call(this,c,p,d);Promise.all([sap.ushell.Container.getServiceAsync("URLParsing"),sap.ushell.Container.getServiceAsync("CommonDataModel")]).then(function(e){this.oURLParsingService=e[0];this.oCDMService=e[1];}.bind(this));this._getTileFromHashInContextOfSite=function(e,y,I){var z=new q.Deferred(),B=y[I];if(!B){B=e(I);y[I]=B;}B.done(function(T){var E={tileIntent:I,tileResolutionResult:T};z.resolve(E);}).fail(function(E){z.reject("Hash '"+I+"' could not be resolved to a tile. "+E);});return z.promise();};this._getTileFromHash=function(I){var e=new q.Deferred();sap.ushell.Container.getServiceAsync("ClientSideTargetResolution").then(function(y){var z=y.resolveTileIntent.bind(y);this._getTileFromHashInContextOfSite(z,this._mCatalogTilePromises,I).done(e.resolve).fail(e.reject);}.bind(this));return e.promise();};this._getTileForUrl=function(T){var e={componentName:T.indicatorDataSource?D:S};return{tileIntent:"#",tileResolutionResult:{tileComponentLoadInfo:e,isCustomTile:false}};};this._prepareTileHash=function(T){var P={},e,y;if(this._isCatalogTile(T)){return T.tileIntent;}if(this._isGroupTile(T)&&T.target){y=T.target.parameters||[];y.forEach(function(z){if(z.name&&z.value){P[z.name]=[z.value];}});e={target:{semanticObject:T.target.semanticObject,action:T.target.action},params:P,appSpecificRoute:T.target.appSpecificRoute};return"#"+this.oURLParsingService.constructShellHash(e);}return undefined;};this.getDefaultGroup=function(){var e=new q.Deferred(),y;var z=this;if(!this._oDefaultGroup){y=this._ensureLoaded();}if(y){y.done(function(){e.resolve(z._oDefaultGroup);}).fail(function(B){e.reject("Failed to access default group. "+B);});}else{e.resolve(z._oDefaultGroup);}return e.promise();};this.addGroup=function(T){var e=new q.Deferred(),G,y,z=this;if(!this._isValidTitle(T)){return e.reject("No valid group title").promise();}y="Failed to add the group with title '"+T+"' to the homepage. ";this.oCDMService.getSite().done(function(B){G=u.generateUniqueId(r.getGroupIdsFromSite(B));m.addGroupToSite(B,m.createEmptyGroup(G,T));z.oCDMService.save().done(function(){delete z._ensureLoadedDeferred;e.resolve(B.groups[G],G);}).fail(function(E){e.reject(E);});}).fail(function(E){e.reject(y+E);});return e.promise();};this.setGroupTitle=function(G,N){var e=this,y=new q.Deferred(),z,B;if(typeof G!=="object"||!r.getGroupId(G)){return y.reject("Unexpected group value").promise();}if(!e._isValidTitle(N)){return y.reject("Unexpected oGroup title value").promise();}B="Failed to set new title for group with id '"+r.getGroupId(G)+"'. ";z=r.getGroupTitle(G);this.oCDMService.getSite().done(function(E){if(G){m.setGroupTitle(G,N);}e.oCDMService.save().done(function(){y.resolve();}).fail(function(F){L.error(F);y.reject(z);});}).fail(function(E){y.reject(z,B+E);});return y.promise();};this.hideGroups=function(H){var e=new q.Deferred(),y=this.oCDMService,G;if(H&&Array.isArray(H)){G="Failed to hide group. ";y.getSite().done(function(z){r.getGroupsArrayFromSite(z).forEach(function(B){var I=Array.prototype.indexOf.call(H,r.getGroupId(B))===-1;m.setGroupVisibility(B,I);});y.save().done(function(){e.resolve();}).fail(function(E){e.reject("Hiding of groups did not work as expected - "+E);});}).fail(function(E){e.reject(G+E);});}else{e.reject("Invalid input parameter aHiddenGroupIds. Please pass a valid input parameter.");}return e.promise();};this.moveGroup=function(G,e){var y=new q.Deferred(),z=this.oCDMService,B,E;if(!G||!r.getGroupId(G)||e<0){return y.reject("Unable to move groups - invalid parameters").promise();}E="Failed to move group with id '"+G.identification.id+"'. ";z.getSite().done(function(F){var H=r.getGroupIdsFromSite(F),I=r.getGroupId(G);if(!H){return y.reject("groupsOrder not found - abort operation of adding a group.");}else if(H.indexOf(I)===e){return y.resolve();}B=u.moveElementInsideOfArray(H,H.indexOf(I),e);if(!B){return y.reject("invalid move group operation - abort.");}m.setGroupsOrder(F,B);z.save().done(function(){y.resolve();}).fail(function(K){y.reject(K);});return undefined;}).fail(function(F){y.reject(E+F);});return y.promise();};this.removeGroup=function(G){var e=new q.Deferred(),y=this.oCDMService,z,B;if(typeof G!=="object"){return e.reject("invalid group parameter").promise();}B=r.getGroupId(G);if(!B){return e.reject("group without id given").promise();}z="Failed to remove group with id '"+B+"'. ";y.getSite().done(function(E){m.removeGroupFromSite(E,G);y.save().done(function(){e.resolve();}).fail(function(F){e.reject(F);});}).fail(function(E){e.reject(z+E);});return e.promise();};this.resetGroup=function(G){var e=new q.Deferred(),y=this.oCDMService,z=[],B=this,E,F;if(typeof G==="object"&&r.getGroupId(G)){F=r.getGroupId(G);E="Failed to reset group with id '"+F+"'. ";y.getSite().done(function(H){q.extend(true,z,r.getGroupsArrayFromSite(H));if(B.isGroupRemovable(G)===false){y.getGroupFromOriginalSite(F).done(function(I){if(typeof H==="object"&&r.getGroupFromSite(H,F)){m.overwriteGroup(H,I,F);}y.save().done(function(){e.resolve(I);}).fail(function(K){e.reject("Group could not be reset - "+K,z);});}).fail(function(I){e.reject("Group could not be reset - "+I,z);});}else{e.reject("Group could not be reset as it was created by the user",z);}}).fail(function(H){e.reject(E+H,[]);});}return e.promise();};this.getLinkTiles=function(G){return r.getGroupLinks(G);};this.isLinkPersonalizationSupported=function(){return true;};this._notifyTileAboutRefresh=function(T){if(typeof T.tileRefresh==="function"){T.tileRefresh();}};this.refreshTile=function(T){var e=this._mResolvedTiles[T.id];if(e){if(e.tileComponent){this._notifyTileAboutRefresh(e.tileComponent);}}};this._notifyTileAboutVisibility=function(T,N,e){if(typeof T.tileSetVisible==="function"&&e!==N){T.tileSetVisible(N);}};this.getTileView=function(G){var e=this;return new q.Deferred(function(y){return e._getTileView(G,false).then(function(T){y.resolve(T);},function(z){var E="Tile with ID '"+G.id+"' could not be initialized"+(z?":\n"+z:".");L.error(E,null,G.tileType);y.reject(E);});}).promise();};this._getCatalogTileView=function(e){if(typeof e!=="object"){throw new Error(e);}var y;if(typeof e.tileResolutionResult!=="object"){y=this._mResolvedTiles[e.id];}else{y=e;}return this._getTileUiComponentContainerSync(e,y,true);};this._getCatalogTileViewControl=function(e){var y=new q.Deferred();if(typeof e!=="object"){var E="Invalid input parameter passed to _getCatalogTileView: "+e;L.error(E);return y.reject(E).promise();}return this._getTileUiComponentContainer(e,e,true);};this._createLinkInstance=function(T,I,N,G,e){var y,z,B,E=this.getTileSubtitle(T);var F=G;if(I===true){y=this.getCatalogTileTitle(T);}else{y=this.getTileTitle(T);}z=new F({mode:g.LineMode,subheader:E,header:y,url:W.getLeanURL(this.getTileTarget(T)),press:function(H){this._genericTilePressHandler(T,H);}.bind(this)});if(N){B=e.i18n.getText(N+"NavigationMode");z.setAriaLabel(B+" "+y+" "+E);}this._mResolvedTiles[T.id].linkTileControl=z;return z;};this._genericTilePressHandler=function(T,e){var y;if(e.getSource().getScope&&e.getSource().getScope()==="Display"){y=this.getTileTarget(T);if(y){if(y[0]==="#"){hasher.setHash(y);}else{W.openURL(y,"_blank");}}}};this.addTile=function(e,G){var y=new q.Deferred(),z,B=this.oCDMService,E;if(!G){G=this._oDefaultGroup;}if(e.contentProviderId){if(e.externalUrl){return this.addBookmark(this._getBookmarkDataForExtensionCatalogTile(e),G);}return y.reject("Extension Tile without URL").promise();}E=j();E.vizId=e.vizId;this._mResolvedTiles[E.id]={tileIntent:e.tileIntent,tileResolutionResult:e.tileResolutionResult,isLink:false};B.getSite().done(function(F){F.groups[G.identification.id].payload.tiles.push(E);B.save().done(function(){y.resolve(E);}).fail(function(H){y.reject(H);});}).fail(function(F){z="Failed to add tile with id '"+E.id+"' to group with id '"+G.identification.id+"'. ";y.reject(z+F);});return y.promise();};this._getBookmarkDataForExtensionCatalogTile=function(e){var B={title:e.tileResolutionResult.title,subtitle:e.tileResolutionResult.subTitle,icon:e.tileResolutionResult.icon,info:e.tileResolutionResult.info,url:e.externalUrl};if(e.tileResolutionResult.indicatorDataSource&&e.tileResolutionResult.indicatorDataSource.path){B.serviceUrl=e.tileResolutionResult.indicatorDataSource.path;B.serviceRefreshInterval=e.tileResolutionResult.indicatorDataSource.refresh;}return B;};this.removeTile=function(G,T,I){var y=this.oCDMService,z,B=new q.Deferred(),E=this;if(!G||typeof G!=="object"||!G.identification||!G.identification.id||!T||typeof T!=="object"||!T.id){return B.reject({},"Failed to remove tile. No valid input parameters passed to removeTile method.").promise();}z="Failed to remove tile with id '"+T.id+"' from group with id '"+G.identification.id+"'. ";y.getSite().done(function(F){var P,H;I=+I;try{P=F.groups[G.identification.id].payload;}catch(e){B.reject(F.groups[G.identification.id],z);}H=E.getTileType(T)===E.TileType.Link?"links":"tiles";if(E.getTileType(T)===E.TileType.Link){I-=P.tiles.length;}if(I>=0){P[H].splice(I,1);}else{P[H]=P[H].filter(function(K){return K.id!==T.id;});}y.save().done(function(){B.resolve();}).fail(function(K){L.error(K);B.reject(F.groups[G.identification.id],K);});}).fail(function(e){B.reject({},z+e);});return B.promise();};this.moveTile=function(T,e,y,z,B,E){var F=new q.Deferred(),G=this.oCDMService,H=this,I;if(!T||i(T)||e===undefined||e<0||y===undefined||y<0||!z||!z.identification||!z.identification.id||!B||!B.identification||!B.identification.id){return F.reject("Invalid input parameters").promise();}I="Failed to move tile with id '"+T.id+"'. ";G.getSite().done(function(K){var N,P,Q=H.getTileType(T)===H.TileType.Link?"links":"tiles";if(!E){E=H._mResolvedTiles[T.id].isLink?"link":"tile";}N=E==="link"?"links":"tiles";if(Q!==N&&H._mResolvedTiles[T.id]){H._mResolvedTiles[T.id].isLink=E==="link";}if(N==="links"){y-=K.groups[B.identification.id].payload.tiles.length;}if(Q==="links"){e-=K.groups[z.identification.id].payload.tiles.length;}if(z.identification.id===B.identification.id){if(e!==y||Q!==N){P=K.groups[B.identification.id].payload;P[Q].splice(e,1);P[N].splice(y,0,T);}else{return F.resolve(T).promise();}}else{K.groups[z.identification.id].payload[Q].splice(e,1);K.groups[B.identification.id].payload[N].splice(y,0,T);}G.save().done(function(){F.resolve(T);}).fail(function(V){L.error(I+V);F.reject(I+V);});return undefined;}).fail(function(K){L.error(I+K);F.reject(I+K);});return F.promise();};this._compareCatalogs=function(e,B){return(e.identification.title||"").toLowerCase()>(B.identification.title||"").toLowerCase()?1:-1;};this.getCatalogs=function(){var e=this,y=new q.Deferred(),z=[];function B(E,F,z,G,P,H){var I=E.catalogs[F];if(P&&H){I.contentProviderId=P;H.catalogsMap[F]=I;}z.push(I);G.notify(I);}sap.ushell.Container.getServiceAsync("CommonDataModel").then(function(E){E.getSite().done(function(F){Object.keys(F.catalogs).forEach(function(G){B(F,G,z,y);});E.getExtensionSites().progress(function(G){var P=G.providerId;var H=G.site;var I=Promise.resolve(H);var K={sitePromise:I,site:H,catalogsMap:{}};Object.keys(H.catalogs).forEach(function(N){e._mContentProviders[P]=K;B(H,N,z,y,P,K);});}).done(function(G){G.filter(function(H){return!H.success;}).forEach(function(H){z.push({identification:{id:H.providerId},contentProviderId:H.providerId,error:"The following content providers could not provide catalogs: "+H.providerId+(H.error?" -> "+H.error:"")});});y.resolve(z.sort(e._compareCatalogs));});});});return y.promise();};this._isStartableInbound=function(I){if(!I.semanticObject||!I.action){return false;}var N=["Shell-plugin","Shell-bootConfig"];if(N.indexOf(I.semanticObject+"-"+I.action)>-1){return false;}return true;};this._isStartableVisualization=function(V,I){var e=O.get("signature.parameters",I);if(!e){return true;}var y=O.get("parameters",a.getTarget(V));return Object.keys(e).every(function(z){var B=e[z];if(z==="sap-external-url"){return true;}if(!B.filter||B.filter.format!=="plain"){return true;}var E=B.filter.value;var F=O.get([z,"value","value"],y);if(E!==F){return false;}return true;});};this._isHiddenInbound=function(I){return!!I.hideLauncher;};this._toHashFromInbound=function(I){var e=U.toHashFromInbound(I);if(!e){return undefined;}return"#"+e;};this._getExternalUrlFromInbound=function(I){return O.get("signature.parameters.sap-external-url.launcherValue.value",I)||null;};this._toHashFromOutbound=function(e){var y=U.toHashFromOutbound(e);if(!y){return undefined;}return"#"+y;};this.getCatalogTiles=function(e){var y=this,z=new q.Deferred();if(typeof e!=="object"||e===null){return z.reject("Invalid input parameter '"+e+"' passed to getCatalogTiles.").promise();}if(e.contentProviderId&&this._mContentProviders[e.contentProviderId]){this._mContentProviders[e.contentProviderId].sitePromise.then(function(B){f.call(y,e,B).done(z.resolve).fail(z.reject);},function(E){z.reject("Failed to get site: "+E);});}else{this.oCDMService.getSite().done(function(B){f.call(y,e,B).done(z.resolve).fail(z.reject);}).fail(function(E){z.reject("Failed to get site: "+E);});}return z.promise();};function f(e,y){var z=this,B=new q.Deferred();setTimeout(function(){var E=((e.payload&&e.payload.viz)||[]).reduce(function(F,V){var G,H,I,K,N,P,Q,T,X,Y,Z,$,_,a1,b1,c1,d1;if(!V){return F;}H=a.get(y,V);if(!H){return F;}I=a.getTypeId(H);K=a.getType(y,I);G=a.getAppId(H);if(G){N=a.getAppDescriptor(y,G);if(!N){return F;}P=r.getInbound(N,a.getTarget(H).inboundId);if(!P){return F;}if(!z._isStartableInbound(P.inbound)||!z._isStartableVisualization(H,P.inbound)||z._isHiddenInbound(P.inbound)){return F;}T=U.mapOne(P.key,P.inbound,N,H,K,y);if(!T||!T.tileResolutionResult){return F;}a1=T.resolutionResult.applicationType;b1=T.resolutionResult.additionalInformation;d1=C.last("/core/navigation/enableInPlaceForClassicUIs");c1=d1?d1[a1]:false;X=n.computeNavigationModeForHomepageTiles(a1,b1,c1);Y=a.getOutbound(H,P.inbound);Q=z._toHashFromOutbound(Y);}else{var e1=a.getConfig(H);if(e1===undefined){return F;}T=U.mapOne(undefined,undefined,undefined,H,K,y);if(u.getMember(e1,"sap|flp.target.type")==="URL"){_=u.getMember(e1,"sap|flp.target.url");}}Z=T.tileResolutionResult;Z.navigationMode=X;if(!z._isFormFactorSupported(Z)){return F;}if(e.contentProviderId){_=z._getMember(N,"sap|app.crossNavigation.inbounds.Shell-launchURL.signature.parameters.sap-external-url.launcherValue.value");}$={id:V,vizId:V,tileIntent:_||Q,tileResolutionResult:Z,isCatalogTile:true};if(e.contentProviderId&&_){$.contentProviderId=e.contentProviderId;$.externalUrl=_;}F.push($);return F;},[]);B.resolve(E);},0);return B.promise();}this.getCatalogError=function(e){if(e.error){return e.error;}return undefined;};this.getCatalogId=function(e){return R.getId(e);};this.getCatalogTitle=function(e){return R.getTitle(e);};this._isFailedCatalogTile=function(T){return!!(T&&this._mFailedResolvedCatalogTiles&&this._mFailedResolvedCatalogTiles[r.getTileId(T)]);};this.getCatalogTileTitle=function(G){if(this._isGroupTile(G)){if(this._isFailedGroupTile(G)){return"";}return this._mResolvedTiles[G.id].tileResolutionResult.title;}if(this._isCatalogTile(G)){if(this._isFailedCatalogTile(G)){return undefined;}return G.tileResolutionResult.title;}return undefined;};this.getCatalogTileSize=function(e){return e.tileResolutionResult.size||"1x1";};this.getCatalogTileView=function(e){return this._getCatalogTileView(e);};this.getCatalogTileViewControl=function(e){return this._getCatalogTileViewControl(e);};this.getCatalogTilePreviewSubtitle=function(G){if(this._isGroupTile(G)){return this.getTileSubtitle(G);}return(G.tileResolutionResult&&G.tileResolutionResult.subTitle)||"";};this.getCatalogTilePreviewIcon=function(G){if(this._isGroupTile(G)){return this.getTileIcon(G);}return(G.tileResolutionResult&&G.tileResolutionResult.icon)||"";};this.getCatalogTilePreviewInfo=function(G){if(this._isGroupTile(G)){return this.getTileInfo(G);}return(G.tileResolutionResult&&G.tileResolutionResult.info)||"";};this.getCatalogTilePreviewIndicatorDataSource=function(G){return G.tileResolutionResult&&G.tileResolutionResult.indicatorDataSource;};this.getCatalogTileKeywords=function(G){var K=[],e=G;if(!e){L.error("Could not find the Tile","sap.ushell.adapters.cdm.LaunchPageAdapter");return K;}if(this._mResolvedTiles&&this._mResolvedTiles[G.id]){e=this._mResolvedTiles[G.id];}if(e&&e.tileResolutionResult&&Array.isArray(e.tileResolutionResult.keywords)){Array.prototype.push.apply(K,e.tileResolutionResult.keywords);}if(e&&e.tileResolutionResult&&e.tileResolutionResult.title){K.push(e.tileResolutionResult.title);}if(e&&e.tileResolutionResult&&e.tileResolutionResult.subTitle){K.push(e.tileResolutionResult.subTitle);}return K;};this._visitBookmarks=function(e,V,y,z){var B;var I=this.oURLParsingService.parseShellHash(e);if(I){B=w(I);}else{B=v(e);}return this.oCDMService.getSite().then(function(E){var G=E.groups;var T=Object.keys(G).filter(function(K){return!G[K].payload.locked;}).map(function(K){return G[K].payload.tiles.filter(function(F){return F.isBookmark&&F.vizType===y&&(F.contentProvider||"")===(z||"")&&l(B,F.target);});}).reduce(function(F,H){Array.prototype.push.apply(F,H);return F;},[]);if(!V){return T.length;}return q.when(T.map(V)).then(function(){return T.length;});});};this.addBookmark=function(P,G,e){var y=this;return new q.Deferred(function(z){var B=y.oCDMService;q.when(G||y.getDefaultGroup(),B.getSite()).done(function(G,E){var T,F,I=y.oURLParsingService.parseShellHash(P.url),H,K=false;if(!I){F=v(P.url);K=true;}else{F=w(I);}T=h(P,F,e);if(K){H=new q.Deferred();H.resolve(y._getTileForUrl(T));}else{H=y._getTileFromHash(P.url);}H.done(function(N){N.isLink=false;y._mResolvedTiles[T.id]=N;E.groups[G.identification.id].payload.tiles.push(T);B.save().done(function(){z.resolve(T);}).fail(function(Q){z.reject(Q);});}).fail(function(N){z.reject("Bookmark creation failed because: "+N);});}).fail(function(E){z.reject(E);});}).promise();};this.addCustomBookmark=function(B,T,e){var y=new q.Deferred();Promise.all([sap.ushell.Container.getServiceAsync("URLParsing"),sap.ushell.Container.getServiceAsync("CommonDataModel")]).then(function(z){var E=z[0];var F=z[1];q.when(T||this.getDefaultGroup(),F.getSite()).done(function(G,H){var I,K=E.parseShellHash(B.url),N=(K===undefined);I=N?v(B.url):w(K);var P={id:u.generateUniqueId([]),vizType:B.vizType,title:B.title,subTitle:B.subtitle,icon:B.icon,info:B.info,target:I,indicatorDataSource:{path:B.serviceUrl,refresh:B.serviceRefreshInterval},vizConfig:B.vizConfig,isBookmark:true};if(e){P.contentProvider=e;}this._resolveTileByVizId(P,H).done(function(Q){Q.isLink=false;this._mResolvedTiles[P.id]=Q;H.groups[G.identification.id].payload.tiles.push(P);F.save().done(function(){y.resolve(P);}).fail(y.reject);}.bind(this)).fail(function(Q){y.reject("Bookmark creation failed because: "+Q);});}.bind(this)).fail(y.reject);}.bind(this));return y.promise();};this.countBookmarks=function(e,y){return this._visitBookmarks(e,undefined,undefined,y);};this.countCustomBookmarks=function(I){if(!I.vizType){return Promise.reject("countCustomBookmarks: Required parameter is missing: oIdentifier.vizType");}return new Promise(function(e,y){this._visitBookmarks(I.url,undefined,I.vizType,I.contentProviderId).done(e).fail(y);}.bind(this));};this.updateBookmarks=function(e,P,V,y){var z=this.oURLParsingService;var B=this.oCDMService;var E=this._mResolvedTiles;function F(T){return new q.Deferred(function(G){var I,N;var H;var K=false;var Q={};if(P.url||P.url===""){I=z.parseShellHash(P.url);if(!I){N=v(P.url);}else{N=w(I);}}if(T.icon!==P.icon){Q.icon=P.icon;K=true;}if(T.title!==P.title){Q.title=P.title;K=true;}if(T.subTitle!==P.subtitle){Q.subtitle=P.subtitle;K=true;}if(P.url&&e!==P.url){Q.targetURL=P.url;K=true;}if(T.info!==P.info){Q.info=P.info;K=true;}k(T,P,N);if(K&&E[T.id]){H=E[T.id].tileComponent;if(H){H.tileSetVisualProperties(Q);}}G.resolve(T);}).promise();}return this._visitBookmarks(e,F,V,y).then(function(G){return B.save().then(function(){return G;});});};this.updateCustomBookmarks=function(I,B){if(!I.vizType){return Promise.reject("updateCustomBookmarks: Required parameter is missing: oIdentifier.vizType");}if(B.title===""){return Promise.reject("updateCustomBookmarks: The bookmark title cannot be an empty string");}if(B.url===""){return Promise.reject("updateCustomBookmarks: The bookmark url cannot be an empty string");}return new Promise(function(e,y){this.updateBookmarks(I.url,B,I.vizType,I.contentProviderId).done(e).fail(y);}.bind(this));};this.deleteBookmarks=function(e,V,y){var z=this.oCDMService;var I=this.oURLParsingService.parseShellHash(e);var B;if(I){B=w(I);}else{B=v(e);}return z.getSite().then(function(E){var G=E.groups;var F=Object.keys(G).map(function(K){var P=G[K].payload;var H=0;P.tiles=P.tiles.filter(function(T){if(T.isBookmark&&T.vizType===V&&(T.contentProvider||"")===(y||"")&&l(B,T.target)){++H;return false;}return true;});return H;}).reduce(function(H,K){H+=K;return H;},0);return z.save().then(function(){return F;});});};this.deleteCustomBookmarks=function(I){if(!I.vizType){return Promise.reject("deleteCustomBookmarks: Required parameter is missing: oIdentifier.vizType");}return new Promise(function(e,y){this.deleteBookmarks(I.url,I.vizType,I.contentProviderId).done(e).fail(y);}.bind(this));};this.onCatalogTileAdded=function(T){};this._onTileSettingsSave=function(T,e){var y=new q.Deferred(),z,N,B,E,F,G,H;if(!T||!T.id||!e){return y.reject().promise();}N=e.oTitleInput.getValue();E=e.oSubTitleInput.getValue();B=e.oInfoInput.getValue();F=this.getTileTitle(T);G=this.getTileInfo(T);H=this.getTileSubtitle(T);if(F===N&&H===E&&G===B){return y.resolve().promise();}z={};if(F!==N){z.title=N;T.title=N;}if(H!==E){z.subtitle=E;T.subTitle=E;}if(G!==B){z.info=B;T.info=B;}if(this._mResolvedTiles[T.id].tileComponent){this._mResolvedTiles[T.id].tileComponent.tileSetVisualProperties(z);}else if(this._mResolvedTiles[T.id].linkTileControl){if(z.title){this._mResolvedTiles[T.id].linkTileControl.setHeader(z.title);}if(z.subtitle){this._mResolvedTiles[T.id].linkTileControl.setSubheader(z.subtitle);}if((z.title)||(z.subtitle)){this._mResolvedTiles[T.id].linkTileControl.rerender();}}sap.ushell.Container.getServiceAsync("CommonDataModel").then(function(I){I.save().fail(function(K){L.error(K);y.reject("Could not save personalization changes: "+K);}).done(function(){y.resolve();});});return y.promise();};this.getTileActions=function(T){var e=[],y,z;if(this._isGroupTile(T)&&!this._isFailedGroupTile(T)){z=new J({config:{display_title_text:this.getTileTitle(T),display_subtitle_text:this.getTileSubtitle(T),display_info_text:this.getTileInfo(T)}});y=o.getTileSettingsAction(z,this._onTileSettingsSave.bind(this,T),this.getTileType(T));e.push(y);}return e;};function h(P,T,e){var y=j(P,T);y.isBookmark=true;if(e){y.contentProvider=e;}return y;}function j(P,T){var e={id:u.generateUniqueId([])};k(e,P,T);return e;}function k(T,P,e){P=q.extend(true,{},P);if(e){T.target=e;}if(P.title||P.title===""){T.title=P.title;}if(P.icon||P.icon===""){T.icon=P.icon;}if(P.subtitle||P.subtitle===""){T.subTitle=P.subtitle;}if(P.info||P.info===""){T.info=P.info;}if(P.dataSource){T.dataSource={};q.extend(true,T.dataSource,P.dataSource);delete P.serviceUrl;}else if(P.dataSource===null){delete T.dataSource;delete T.indicatorDataSource;delete P.serviceUrl;}if((P.dataSource||T.dataSource)&&P.serviceUrlPath){T.indicatorDataSource={path:P.serviceUrlPath};}if(P.serviceUrl||P.serviceUrl===""){if(T.dataSource){L.warning("`serviceUrl` is marked for deprecation in the future."+"It is not the preferred means for defining a dynamic "+"tile's data source. Please use `oParameter.dataSource`");delete T.dataSource;}T.indicatorDataSource={path:P.serviceUrl};}else if(P.serviceUrl===null&&!T.dataSource){delete T.indicatorDataSource;}if(P.serviceRefreshInterval||P.serviceRefreshInterval===0){T.indicatorDataSource.refresh=P.serviceRefreshInterval;}if(P.vizConfig){T.vizConfig=P.vizConfig;}}function l(T,e){if(T&&e){if(T.url){return T.url===e.url;}return T.semanticObject===e.semanticObject&&T.action===e.action&&s(T.parameters,e.parameters)&&T.appSpecificRoute===e.appSpecificRoute;}return T===e;}function s(P,e){var F,y;P=P||[];e=e||[];if(P.length===e.length){F=t(P);y=t(e);return F===y;}return false;}function t(e){return e.map(function(P){return P.name+P.value;}).sort().join();}function v(e){return{url:e};}function w(I){var T={semanticObject:I.semanticObject,action:I.action,parameters:x(I.params)};if(I.appSpecificRoute){T.appSpecificRoute=I.appSpecificRoute;}return T;}function x(I){return Object.keys(I).map(function(K){var V=I[K]&&I[K][0];return{name:K,value:V||""};});}this._getSiteData=function(){var e=new q.Deferred();sap.ushell.Container.getServiceAsync("CommonDataModel").then(function(y){y.getSite().done(e.resolve).fail(e.reject);});return e.promise();};this._addDefaultGroup=function(G,e){var y=r.getDefaultGroup(G);if(!y){y=m.createDefaultGroup(u.generateUniqueId(r.getGroupIdsFromSite(e)));e=m.addGroupToSite(e,y,0);G=r.getGroupsArrayFromSite(e);}this._oDefaultGroup=y;return G;};}b.prototype=A.prototype;return b;},true);
