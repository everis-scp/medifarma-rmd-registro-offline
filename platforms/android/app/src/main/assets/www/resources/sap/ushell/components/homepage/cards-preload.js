sap.ui.require.preload({"sap/ushell/adapters/cdm/_LaunchPage/uri.transform.js":function(){
// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/URI"],function(U){"use strict";function t(u,s,f,g){var o=(e(u))?new U(u):null;if(!o){return{error:'Error: Parameter sUri is empty or not a string, use case not supported.'};}if(!b(o)){return r(u,null,null,null,u);}var h=(e(s))?new U(s):null;if(h&&!b(h)){return r(u,s,null,null,o.absoluteTo(h));}var i=new U().search("");if(i.toString()==""){i=new U('https://x.y.z:8443/sap/bc/ui5_ui5/ui2/ushell/test-resources/sap/ushell/shells/cdm/fioriCDM.html?params');}var k=(e(f))?new U(m(f)):i;if(!b(k)&&!g){return r(u,s,U.joinPaths(h,o),c(k),U.joinPaths(h,o).absoluteTo(k));}var l=(e(g))?new U(g):i;if(!k||!l.toString()){return{error:'Error: Parameter sUriNewBase is empty or not a string, use case not supported.'};}if(b(l)){return{error:'Error: Parameter sUriNewBase is a relative uri, but must be absolute.'};}if(b(k)&&!b(l)){k=k.absoluteTo(l);}if(!b(k)&&!b(l)){if(k.host()&&l.host()&&k.host()!=l.host()){return{error:'Error: Hosts of the parameters sUriBase and sUriNewBase are given but do not match.'};}var n=d(k).relativeTo(d(l));var p;if(e(s)){p=o.absoluteTo(h.absoluteTo(n.absoluteTo(l)));var q=j(n,h);var v=j(q,o);return r(o,q,v,c(l),p);}else{p=o.absoluteTo(n.absoluteTo(l));var w=j(n,o);w.query(o.query());return r(w,null,w,c(l),p);}}return{error:'Error: Parameter combination not supported.'};}function r(u,o,f,g,h){var r={};if(u){r.uri=u.toString();}if(o){r.uriParent=o.toString();}if(f){r.uriRelative=f.toString();}if(g){r.uriBase=g.toString();}if(h){r.uriAbsolute=h.toString();}return r;}function a(u){if(!u.is("relative")){return false;}return u.toString()[0]=='/';}function b(u){return!u.is("absolute")&&!a(u);}function c(u){return u.filename("").search("").fragment("");}function j(){var l=new U("/1/2/3/4/5/6/7/8/9/");var r=l;for(var i=0;i<arguments.length;i++){r=U.joinPaths(r,arguments[i]);}return r.relativeTo(l);}function d(u){return U.joinPaths(u.directory(),'/');}function m(u){var s=u;if(u){var o=new U(u);if(o.filename()&&o.filename().indexOf(".")==-1&&o.filename().slice(-1)!='/'){s+='/';}}return s;}function e(f){return(f&&typeof f==='string');}return t;},true);},"sap/ushell/adapters/cdm/v3/AdapterBase.js":function(){sap.ui.define(["sap/ushell/adapters/cdm/v3/_LaunchPage/readHome","sap/ushell/adapters/cdm/v3/_LaunchPage/readVisualizations","sap/ushell/adapters/cdm/v3/_LaunchPage/readUtils","sap/m/GenericTile","sap/ui/core/ComponentContainer","sap/ushell/adapters/cdm/_LaunchPage/uri.transform","sap/ushell/Config","sap/ushell/EventHub","sap/ushell/navigationMode","sap/ushell/resources","sap/ushell/utils","sap/ushell/adapters/cdm/v3/utilsCdm","sap/base/util/Version","sap/ui/thirdparty/jquery","sap/base/util/isPlainObject","sap/base/util/isEmptyObject","sap/base/util/ObjectPath","sap/base/util/deepExtend","sap/base/util/deepClone","sap/base/Log","sap/ushell/library"],function(r,R,a,G,C,u,b,e,n,o,U,c,V,q,i,d,O,f,g,L,h){"use strict";var l=L.getLogger("sap/ushell/adapters/cdm/LaunchPageAdapter");var j=L.Level;var S="sap.ushell.components.tiles.cdm.applauncher";var D="sap.ushell.components.tiles.cdm.applauncherdynamic";var k=h.UI5ComponentType;function A(m,p,s){this.oAdapterConfiguration=s;this._mResolvedTiles={};this._mCatalogTilePromises={};this._mFailedResolvedCatalogTiles={};this._mFailedResolvedTiles={};this._mContentProviders={};this.TileType={Tile:"tile",Link:"link",Card:"card"};}A.prototype.getGroups=function(){var m=new q.Deferred();this._ensureLoaded().done(function(p){U.setPerformanceMark("FLP - homepage groups processed");m.resolve(p);}).fail(function(){m.resolve([]);});return m.promise();};A.prototype._ensureLoaded=function(){var t=this,m;if(this._ensureLoadedDeferred){return this._ensureLoadedDeferred.promise();}m=new q.Deferred();this._ensureLoadedDeferred=m;this._getSiteData().done(function(s){if(!t.isSiteSupported(s)){throw new Error("Invalid CDM site version: Check the configuration of the launchpage adapter and the version of the FLP site");}var I=[];var p=r.getGroupsArrayFromSite(s);p=t._addDefaultGroup(p,s);p.forEach(function(v){I=t._ensureGroupItemsResolved(v,s).concat(I);});t._allPromisesDone(I).done(function(){t._ensureLoadedDeferred.resolve(p);delete t._ensureLoadedDeferred;t._logTileResolutionFailures(t._mFailedResolvedTiles);});}).fail(function(E){l.error("Delivering hompage groups failed - "+E);t._ensureLoadedDeferred.resolve([]);delete t._ensureLoadedDeferred;});return m.promise();};A.prototype._ensureGroupItemsResolved=function(m,s){var p=[],t,v;if(m.payload&&m.payload.tiles){t=this._ensureGroupTilesResolved(m.payload.tiles,s);Array.prototype.push.apply(p,t);}if(m.payload&&m.payload.links){v=this._ensureGroupLinksResolved(m.payload.links,s);Array.prototype.push.apply(p,v);}return p;};A.prototype._ensureGroupTilesResolved=function(m,s){return(m||[]).map(function(t,I){return this._resolveGroupTile(t,s).then(function(p){p.isLink=false;return p;});},this);};A.prototype._ensureGroupLinksResolved=function(m,s){return(m||[]).map(function(p){return this._resolveGroupTile(p,s).then(function(t){t.isLink=true;return t;});},this);};A.prototype._resolveGroupTile=function(t,s){var m=this._mResolvedTiles;var F=this._mFailedResolvedTiles;var p;function v(y){m[t.id]=y;if(F[t.id]){delete F[t.id];}return y;}function w(t){var T=t.target;return T&&T.semanticObject==="Shell"&&T.action==="launchURL";}if(m[t.id]){return(new q.Deferred()).resolve(m[t.id]).promise();}if(t.target&&t.target.url){p=q.when(this._getTileForUrl(t));}else if(t.isBookmark&&t.vizType===undefined){p=this._resolveTileByIntent(t,s);}else if(w(t)){p=this._resolveTileByIntent(t,s);}else{p=this._resolveTileByVizId(t,s);}var x=new q.Deferred();p.done(function(y){x.resolve(v(y));}).fail(function(y){F[t.id]=y;x.reject(y);});return x.promise();};A.prototype._resolveTileByVizId=function(t,s){var v,m,p,w,x,y,I,M,N,z,H,B,E;function F(W,X){return new q.Deferred().reject({logLevel:W,message:X}).promise();}var J=new q.Deferred();if(!i(s)){return F(j.ERROR,"Cannot resolve tile: oSite must be an object");}if(!i(t)){return F(j.ERROR,"Cannot resolve tile: oTile must be an object");}m=t.vizId;v=g(R.get(s,m||"")||{});w=t.vizType||R.getTypeId(v);p=R.getType(s,w);if(!p){return F(j.ERROR,"Cannot resolve tile '"+t.id+"': no visualization type found for vizTypeId '"+w+"'");}x=R.getAppId(v);if(x){y=R.getAppDescriptor(s,x);if(!y){return F(j.INFO,"Tile '"+t.id+"' filtered from result: no app descriptor found for appId '"+x+"' (dangling app reference)");}I=r.getInbound(y,R.getTarget(v).inboundId);if(!I){return F(j.ERROR,"Cannot resolve tile '"+t.id+"': app '"+x+"' has no navigation inbound");}M=c.mapOne(I.key,I.inbound,y,v,p,s);var K=M.resolutionResult.applicationType,P=M.resolutionResult.additionalInformation,Q=b.last("/core/navigation/enableInPlaceForClassicUIs"),T=Q?Q[K]:false;N=n.computeNavigationModeForHomepageTiles(K,P,T);B=R.getOutbound(v,I.inbound);H=this._toHashFromOutbound(B);}else{v.vizConfig=f({},v.vizConfig,t.vizConfig);M=c.mapOne(undefined,undefined,undefined,v,p,s);if(R.startsExternalUrl(v)){E=U.getMember(v.vizConfig,"sap|flp.target.url");}}z=M.tileResolutionResult;z.navigationMode=N;z.isLink=false;if(!this._isFormFactorSupported(z)){return F(j.INFO,"Tile '"+t.id+"' filtered from result: form factor not supported");}if(E||H){J.resolve({tileResolutionResult:z,tileIntent:E||H});}else{if(!this._oUrlParsingPromise){this._oUrlParsingPromise=sap.ushell.Container.getServiceAsync("URLParsing");}this._oUrlParsingPromise.then(function(W){if(t.target){var X=g(t.target);H=c.toHashFromTarget(a.harmonizeTarget(X),W);}J.resolve({tileResolutionResult:z,tileIntent:H});});}return J.promise();};A.prototype._isFormFactorSupported=function(m){var s=U.getFormFactor();return r.supportsFormFactor(m,s);};A.prototype._getFirstInbound=function(m){var F=Object.keys(m["sap.app"].crossNavigation.inbounds).shift(),I=m["sap.app"].crossNavigation.inbounds[F];return{key:F,inbound:I};};A.prototype._resolveTileByIntent=function(t){var H=this._prepareTileHash(t);return this._getTileFromHash(H);};A.prototype._allPromisesDone=function(p){var m=new q.Deferred(),s;if(p.length===0){m.resolve([]);}else{var N=p.map(function(P){s=new q.Deferred();P.always(s.resolve.bind(s));return s.promise();});q.when.apply(this,N).done(function(){var t=Array.prototype.slice.call(arguments);m.resolve(t);});}return m.promise();};A.prototype._logTileResolutionFailures=function(F){var m={};if(!F){return;}Object.keys(j).filter(function(s){var p=j[s];return p>=j.FATAL&&p<=j.ALL;}).forEach(function(s){m[j[s]]="";});Object.keys(F).forEach(function(s){var p=F[s];if(p.logLevel){m[p.logLevel]=m[p.logLevel].concat(p.message).concat("\n");}});if(m[j.FATAL]){l.fatal(m[j.FATAL]);}if(m[j.ERROR]){l.error(m[j.ERROR]);}if(m[j.WARNING]){l.warning(m[j.WARNING]);}if(m[j.INFO]){l.info(m[j.INFO]);}if(m[j.DEBUG]){l.debug(m[j.DEBUG]);}if(m[j.TRACE]){l.trace(m[j.TRACE]);}};A.prototype._isValidTitle=function(t){return typeof t==="string"&&t;};A.prototype._isGroupPreset=function(m){return r.isGroupPreset(m);};A.prototype._isGroupLocked=function(m){return r.isGroupLocked(m);};A.prototype.getGroupTitle=function(m){return r.getGroupTitle(m);};A.prototype.getGroupId=function(m){return r.getGroupId(m);};A.prototype.isGroupVisible=function(m){return r.isGroupVisible(m);};A.prototype.getTileTitle=function(t){return r.getTileTitle(this._mResolvedTiles,t);};A.prototype.getTileContentProviderId=function(t){return r.getContentProviderId(t);};A.prototype.getTileSubtitle=function(t){return r.getTileSubtitle(this._mResolvedTiles,t);};A.prototype.getTileIcon=function(t){return r.getTileIcon(this._mResolvedTiles,t);};A.prototype.getTileInfo=function(t){return r.getTileInfo(this._mResolvedTiles,t);};A.prototype.getTileIndicatorDataSource=function(t){var m=this._mResolvedTiles[t.id],p={},s;if(t.indicatorDataSource){p.indicatorDataSource=f({},t.indicatorDataSource);if(t.dataSource){p.dataSource=f({},t.dataSource);}return p;}if(!m){return p;}s=m.tileResolutionResult;if(s.indicatorDataSource){p.indicatorDataSource=f({},s.indicatorDataSource);if(s.indicatorDataSource.hasOwnProperty("dataSource")){var v=s.indicatorDataSource.dataSource,w=s.dataSources;if(w&&w.hasOwnProperty(v)){p.dataSource=f({},w[v]);}else{L.warning("datasource referenced but not found for tile: "+m.tileIntent);}}if(U.getMember(s,"runtimeInformation.componentProperties.url")){var P=U.getMember(p,"indicatorDataSource.path");var x=U.getMember(p,"dataSource.uri");var y=U.getMember(s,"runtimeInformation.componentProperties.url");var T=u(P,x,y,this.getWindowLocationHref());if(!T.error){if(P){p.indicatorDataSource.path=T.uri;}if(x){p.dataSource.uri=T.uriParent;}}}}return p;};A.prototype.getWindowLocationHref=function(){return window.location.href;};A.prototype.isGroupRemovable=function(m){return!this._isGroupPreset(m);};A.prototype.isGroupLocked=function(m){return this._isGroupLocked(m);};A.prototype.getGroupTiles=function(m){return r.getGroupTiles(m).concat(r.getGroupLinks(m));};A.prototype.getTileType=function(I){if(r.isLink(this._mResolvedTiles,I)){return this.TileType.Link;}if(r.isCard(this._mResolvedTiles,I)){return this.TileType.Card;}return this.TileType.Tile;};A.prototype.getTileId=function(t){return r.getTileId(t);};A.prototype.getTileSize=function(t){return r.getTileSize(this._mResolvedTiles,t)||"1x1";};A.prototype.getTileTarget=function(t){var T=r.getTileId(t),m=this._mResolvedTiles[T];if(t.target&&t.target.url){return t.target.url;}if(m){return m.tileIntent;}L.warning("Could not find a target for Tile with id '"+T+"'","sap.ushell.adapters.cdm.LaunchPageAdapter");return"";};A.prototype.isTileIntentSupported=function(t){return(this._mFailedResolvedTiles[t.id]===undefined);};A.prototype.setTileVisible=function(t,N){var m=this._mResolvedTiles[t.id];if(m){if(m.tileComponent){this._notifyTileAboutVisibility(m.tileComponent,N,m.visibility);}m.visibility=N;}};A.prototype.getCardManifest=function(m){var p,s=this._mResolvedTiles[m.id];p=s.tileResolutionResult;return p.tileComponentLoadInfo;};A.prototype._getTileUiComponentContainerSync=function(t,m,I){var p=this,s,T,N,v,w={};T=p._createTileComponentData(t,I,m);s=m.tileResolutionResult;if(m.isLink){N=s.navigationMode;return p._createLinkInstance(t,I,N,G,o);}if(typeof s.tileComponentLoadInfo==="object"&&s.tileComponentLoadInfo!==null){w=s.tileComponentLoadInfo.componentProperties||{};w.name=s.tileComponentLoadInfo.componentName;}w.componentData=T;if(w.manifest){w.componentData.properties=w.componentData.properties||{};w.componentData.properties.manifest=w.manifest;}if(w.name){w.async=false;var x;try{v=sap.ui.component(w);}catch(E){L.error(E.message+"\n-- An error occurred while instantiating "+"the tile component for "+w.name,E.stack?E.stack:"","sap.ushell.adapters.cdm.LaunchPageAdapter");return null;}x=new sap.ui.core.ComponentContainer({component:v,height:"100%"});if(!I){p._mResolvedTiles[t.id].tileComponent=v;}return x;}return null;};A.prototype._getTileUiComponentContainer=function(t,m,I){var p=this,s,v,N,T,w,x,y=new q.Deferred();sap.ushell.Container.getServiceAsync("Ui5ComponentLoader").then(function(z){v=z;var B=this._createTileComponentData(t,I,m);return B;}.bind(this)).then(function(z){return this._enhanceTileComponentData(t,z);}.bind(this)).then(function(z){s=m.tileResolutionResult;if(m.isLink){N=s.navigationMode;y.resolve(p._createLinkInstance(t,I,N,G,o));return;}var B=this._createTileComponentProperties(z,s.tileComponentLoadInfo);if(!B.name){return Promise.reject("Cannot find name of tile component for tile with id: '"+t.id+"'");}if(B.manifest){z.properties=z.properties||{};z.properties.manifest=B.manifest;}x=this._isCustomTileComponent(B.name);var E=function(F){var m;T=F.componentHandle.getInstance();w=new C({component:T,height:"100%"});if(!I){m=p._mResolvedTiles[t.id];m.tileComponent=T;if(typeof m.visibility==="boolean"){p._notifyTileAboutVisibility(T,m.visibility);}}return w;};var _=function(){return v.createComponent({loadCoreExt:x,loadDefaultDependencies:false,componentData:z,url:B.url,applicationConfiguration:{},reservedParameters:{},applicationDependencies:B,ui5ComponentName:B.name},{},[],k.Visualization).then(E);};if(x){e.once("CoreResourcesComplementLoaded").do(function(){_().then(function(w){y.resolve(w);}).fail(function(F){y.reject(F);});});}else{_().then(function(w){y.resolve(w);}).fail(function(F){y.reject(F);});}}.bind(this)).catch(function(E){y.reject(E);});return y.promise();};A.prototype._createTileComponentProperties=function(t,T){var m={};if(!T||d(T)){if(t.properties.indicatorDataSource&&t.properties.indicatorDataSource.path){m.name=D;}else{m.name=S;}}else{m=T.componentProperties||{};m.name=T.componentName;}return m;};A.prototype.getTileView=function(m){var t=this;return new q.Deferred(function(p){return t._getTileView(m,false).then(function(T){p.resolve(T);},function(s){var E="Tile with ID '"+m.id+"' could not be initialized"+(s?":\n"+s:".");L.error(E,null,m.tileType);p.reject(E);});}).promise();};A.prototype._getTileView=function(m){var p,E,s=new q.Deferred();if(typeof m!=="object"||!m.id){E="Invalid input parameter passed to _getTileView: "+m;L.error(E);return s.reject(E).promise();}p=this._mResolvedTiles[m.id];if(!p){E="No resolved tile found for tile ID: "+m.id;L.error(E);return s.reject(E).promise();}return this._getTileUiComponentContainer(m,p,false);};A.prototype._createTileComponentData=function(t,I,m){var T=I?this.getCatalogTileTitle(t):this.getTileTitle(t),s=I?this.getCatalogTilePreviewSubtitle(t):this.getTileSubtitle(t),p=I?this.getCatalogTilePreviewIcon(t):this.getTileIcon(t),v=I?this.getCatalogTilePreviewInfo(t):this.getTileInfo(t),w=I?this.getCatalogTileTargetURL(t):this.getTileTarget(t),x=this.getTileIndicatorDataSource(t),N=t.numberUnit||m.tileResolutionResult.numberUnit,y={properties:{},startupParameters:{}};if(m.tileResolutionResult.isCustomTile===true&&m.tileResolutionResult.startupParameters){y.startupParameters=m.tileResolutionResult.startupParameters;}if(T){y.properties.title=T;}if(v){y.properties.info=v;}if(s){y.properties.subtitle=s;}if(p){y.properties.icon=p;}if(w){y.properties.targetURL=w;}if(N){y.properties.numberUnit=N;}if(x.indicatorDataSource){y.properties.indicatorDataSource=x.indicatorDataSource;if(x.dataSource){y.properties.dataSource=x.dataSource;}}if(m.tileResolutionResult){y.properties.navigationMode=m.tileResolutionResult.navigationMode;y.properties.contentProviderId=m.tileResolutionResult.contentProviderId||"";}return y;};A.prototype._enhanceTileComponentData=function(t,m){var p=Promise.resolve();var s=this.getTileContentProviderId(t);if(s){p=sap.ushell.Container.getServiceAsync("ClientSideTargetResolution").then(function(v){return v.getSystemContext(s);}).then(function(v){m.properties.indicatorDataSource.path=v.getFullyQualifiedXhrUrl(m.properties.indicatorDataSource.path);}).catch(function(){L.error("System Context not available");});}return p.then(function(){return m;});};A.prototype._isGroupTile=function(t){return r.isGroupTile(t);};A.prototype._isCatalogTile=function(t){return!!(t&&t.isCatalogTile);};A.prototype._isFailedGroupTile=function(t){return!!(t&&this._mFailedResolvedTiles&&this._mFailedResolvedTiles[r.getTileId(t)]);};A.prototype.getCatalogTileId=function(m){if(this._isGroupTile(m)){if(this._isFailedGroupTile(m)){return undefined;}if(m.isBookmark&&O.get("target.url",m)){return m.target.url;}return m.vizId||(m.target&&m.target.url);}if(this._isCatalogTile(m)){return m.id;}return undefined;};A.prototype.getCatalogTilePreviewTitle=function(m){if(this._isGroupTile(m)){return this.getTileTitle(m);}return(m.tileResolutionResult&&m.tileResolutionResult.title)||"";};A.prototype.getCatalogTileTargetURL=function(m){if(!m){throw new Error("The given tile is falsy");}if(this._isCatalogTile(m)){if(m.tileResolutionResult&&m.tileResolutionResult.isCustomTile){if(!m.tileResolutionResult.targetOutbound){return"";}return this._toHashFromOutbound(m.tileResolutionResult.targetOutbound);}return m.tileIntent||"";}return this.getTileTarget(m);};A.prototype.isGroupFeatured=function(m){return!!m.isFeatured;};A.prototype._getMember=function(m,s){return U.getMember(m,s);};A.prototype.getCdmVersionsSupported=function(){return{min:V("3.0.0"),max:V("3.1.0")};};A.prototype.isSiteSupported=function(s){if(!s._version||V(s._version).compareTo(this.getCdmVersionsSupported().min)<0||V(s._version).compareTo(this.getCdmVersionsSupported().max)>0){L.fatal("Invalid CDM site version: Only version 3.0.0 is supported");return false;}return true;};A.prototype._isCustomTileComponent=function(s){return!(s===S||s===D);};return A;},true);},"sap/ushell/adapters/cdm/v3/StaticGroupsAdapter.js":function(){sap.ui.define(["sap/ushell/adapters/cdm/v3/AdapterBase","sap/ui/thirdparty/jquery"],function(A,q){"use strict";function S(s,p,a){A.call(this,s,p,a);}S.prototype=A.prototype;S.prototype._addDefaultGroup=function(g,s){return g;};S.prototype._getSiteData=function(){var d=new q.Deferred();return d.resolve(this.oAdapterConfiguration.config);};return S;},true);},"sap/ushell/adapters/cdm/v3/_LaunchPage/readHome.js":function(){sap.ui.define(["sap/ushell/utils/type","sap/ushell/adapters/cdm/v3/_LaunchPage/readApplications"],function(t,r){"use strict";var a={};a.getGroupsArrayFromSite=function(s){var l=[];s.site.payload.groupsOrder.forEach(function(g,i){var G=s.groups[g];if(G){G.payload=G.payload||{};l.push(G);}});return l;};a.getGroupsMapFromSite=function(s){return s.groups;};a.getGroupIdsFromSite=function(s){return s.site.payload.groupsOrder;};a.getGroupFromSite=function(s,g){return s.groups[g];};a.getDefaultGroup=function(g){var d=g.filter(function(G){return G.payload.hasOwnProperty("isDefaultGroup");});if(d.length>0){return d[0];}};a.getGroupId=function(g){return g.identification&&g.identification.id;};a.getGroupTitle=function(g){return g.identification.title;};a.isGroupPreset=function(g){if(!g.payload.hasOwnProperty("isPreset")){return true;}return!!g.payload.isPreset;};a.isGroupLocked=function(g){return!!g.payload.locked;};a.isGroupVisible=function(g){return!!(g.identification.isVisible===undefined||g.identification.isVisible===true);};a.getGroupTiles=function(g){if(g.payload.tiles&&t.isArray(g.payload.tiles)&&g.payload.tiles.length>0){return g.payload.tiles;}return[];};a.getGroupLinks=function(g){if(g.payload.links&&t.isArray(g.payload.links)&&g.payload.links.length>0){return g.payload.links;}return[];};a.getTileId=function(T){return T.id;};a.getTileVizId=function(T){return T.vizId;};a.getTileTitle=function(R,T){var o;if(T&&T.isBookmark){return T.title;}o=R[T.id];if(o){return T.title||o.tileResolutionResult.title;}};a.getContentProviderId=function(T){return T.contentProvider||undefined;};a.getTileSubtitle=function(R,T){var o;if(T.isBookmark){return T.subTitle;}o=R[T.id];if(o){return T.subTitle||o.tileResolutionResult.subTitle;}};a.getTileInfo=function(R,T){var o;if(T.isBookmark){return T.info;}o=R[T.id];if(o){return T.info||o.tileResolutionResult.info;}};a.getTileIcon=function(R,T){var o;if(T.isBookmark){return T.icon;}o=R[T.id];if(o){return T.icon||o.tileResolutionResult.icon;}};a.getTileIndicatorDataSource=function(R,T){var o;if(T.isBookmark){return T.icon;}o=R[T.id];if(o){return T.icon||o.tileResolutionResult.icon;}};a.getTileSize=function(R,T){var o=R[T.id];if(o&&o.tileResolutionResult&&o.tileResolutionResult.size){return o.tileResolutionResult.size;}};a.isLink=function(R,T){var o=R[T.id];if(o){return!!o.isLink;}return false;};a.isCard=function(R,i){var o=R[i.id];if(o){return!!o.tileResolutionResult.isCard;}return false;};a.isGroupTile=function(T){return!!(T&&T.id&&!T.isCatalogTile);};a.supportsFormFactor=function(A,f){return A.deviceTypes&&A.deviceTypes[f];};a.getInbound=function(A,i){var I=r.getInbound(A,i);return I&&{key:i,inbound:I};};return a;},true);},"sap/ushell/adapters/cdm/v3/_LaunchPage/readVisualizations.js":function(){sap.ui.define(["sap/ushell/utils","sap/base/util/ObjectPath"],function(u,O){"use strict";var r={};r.getMap=function(s){return s.visualizations;};r.get=function(s,i){return O.get(["visualizations",i],s);};r.getTypeMap=function(s){return s.vizTypes;};r.getType=function(s,i){return O.get(["vizTypes",i],s);};r.getTypeId=function(v){return O.get("vizType",v||{});};r.isStandardVizType=function(v){return v==="sap.ushell.StaticAppLauncher"||v==="sap.ushell.DynamicAppLauncher";};r.getSupportedDisplayFormats=function(v){return O.get(["sap.flp","vizOptions","displayFormats","supported"],v||{});};r.getDefaultDisplayFormat=function(v){return O.get(["sap.flp","vizOptions","displayFormats","default"],v||{});};r.getTileSize=function(v){return O.get(["sap.flp","tileSize"],v||{});};r.getConfig=function(v){return O.get("vizConfig",v||{});};r.getTarget=function(v){var V=this.getConfig(v);return O.get(["sap.flp","target"],V||{});};r.getAppId=function(v){var t=this.getTarget(v);return O.get("appId",t||{});};r.getInboundId=function(v){var t=this.getTarget(v);return O.get("inboundId",t||{});};r.getOutbound=function(v,i){var o={semanticObject:i.semanticObject,action:i.action,parameters:this.getTarget(v).parameters||{}};o.parameters["sap-ui-app-id-hint"]={value:{format:"plain",value:this.getAppId(v)}};return o;};r.startsExternalUrl=function(v){var t=this.getTarget(v);return t&&t.type==="URL";};r.getAppDescriptor=function(s,i){return O.get(["applications",i],s);};r.getKeywords=function(c){var C=u.clone(c);C.splice(2,1);C.splice(0,1);return u.getNestedObjectProperty(C,["sap|app.tags.keywords","sap|app.tags.keywords"]);};r.getTitle=function(c){return u.getNestedObjectProperty(c,["title","sap|app.title","title","sap|app.title"]);};r.getSubTitle=function(c){return u.getNestedObjectProperty(c,["subTitle","sap|app.subTitle","subTitle","sap|app.subTitle"]);};r.getIcon=function(c){return u.getNestedObjectProperty(c,["icon","sap|ui.icons.icon","icon","sap|ui.icons.icon"]);};r.getNumberUnit=function(c){var C=u.clone(c);C.splice(2,2);return u.getNestedObjectProperty(C,["numberUnit","sap|flp.numberUnit"]);};r.getInfo=function(c){return u.getNestedObjectProperty(c,["info","sap|app.info","info","sap|app.info"]);};r.getShortTitle=function(c){var C=u.clone(c);C.splice(0,1);return u.getNestedObjectProperty(C,["sap|app.shortTitle","shortTitle","sap|app.shortTitle"]);};r.getInstantiationData=function(v){return O.get(["vizConfig","sap.flp","_instantiationData"],v);};r.getIndicatorDataSource=function(v){return O.get(["vizConfig","sap.flp","indicatorDataSource"],v);};r.getDataSource=function(c,d){var C=u.clone(c);C.splice(2,1);C.splice(0,1);var D=u.getNestedObjectProperty(C,["sap|app.dataSources","sap|app.dataSources"])||{};return D[d];};r.getChipConfigFromVizReference=function(v){return O.get(["vizConfig","sap.flp","chipConfig"],v);};return r;},true);},"sap/ushell/adapters/cdm/v3/utilsCdm.js":function(){sap.ui.define(["sap/ushell/utils","sap/ushell/adapters/cdm/v3/_LaunchPage/readVisualizations","sap/ui/thirdparty/jquery","sap/base/util/deepExtend","sap/base/util/isEmptyObject","sap/base/util/ObjectPath","sap/base/util/merge","sap/base/util/deepEqual","sap/ushell/adapters/cdm/v3/_LaunchPage/readApplications","sap/base/Log"],function(u,r,q,d,i,O,m,a,b,L){"use strict";var c={};c.getMember=function(o,A){return u.getMember(o,A);};c.getNestedObjectProperty=function(o,A,D){return u.getNestedObjectProperty(o,A,D);};c.mapOne=function(k,s,A,v,V,S){var I=false;s=d({},s);A=d({},A);v=d({},v);V=d({},V);v=v||{};V=V||{};var o={};o.semanticObject=this.getMember(s,"semanticObject");o.action=this.getMember(s,"action");var e=r.getConfig(v);o.title=r.getTitle([undefined,e,s,A]);o.info=r.getInfo([undefined,e,s,A]);o.icon=r.getIcon([undefined,e,s,A]);o.subTitle=r.getSubTitle([undefined,e,s,A]);o.shortTitle=r.getShortTitle([undefined,e,s,A]);o.keywords=r.getKeywords([undefined,e,s,A]);o.numberUnit=r.getNumberUnit([undefined,e,undefined,undefined]);o.deviceTypes=this.getMember(A,"sap|ui.deviceTypes")||{};["desktop","tablet","phone"].forEach(function(M){if(Object.prototype.hasOwnProperty.call(this.getMember(s,"deviceTypes")||{},M)){o.deviceTypes[M]=s.deviceTypes[M];}if(!Object.prototype.hasOwnProperty.call(o.deviceTypes,M)){o.deviceTypes[M]=true;}o.deviceTypes[M]=!!o.deviceTypes[M];}.bind(this));o.signature=this.getMember(s,"signature")||{};o.signature.parameters=this.getMember(o,"signature.parameters")||{};o.signature.additionalParameters=this.getMember(s,"signature.additionalParameters")||"allowed";var f=this.getMember(A,"sap|platform|runtime");o.resolutionResult=q.extend(true,{},f);if(f){o.resolutionResult["sap.platform.runtime"]=q.extend(true,{},f);}if(this.getMember(A,"sap|ui.technology")==="GUI"){o.resolutionResult["sap.gui"]=this.getMember(A,"sap|gui");}if(this.getMember(A,"sap|ui.technology")==="WDA"){o.resolutionResult["sap.wda"]=this.getMember(A,"sap|wda");}if(this.getMember(A,"sap|ui.technology")==="URL"){if(A["sap.url"]){o.resolutionResult["sap.platform.runtime"]=o.resolutionResult["sap.platform.runtime"]||{};o.resolutionResult.url=A["sap.url"].uri;o.resolutionResult["sap.platform.runtime"].url=A["sap.url"].uri;}else if(f&&f.uri){o.resolutionResult["sap.platform.runtime"].url=f.uri;o.resolutionResult.url=f.uri;}}if(!o.resolutionResult["sap.ui"]){o.resolutionResult["sap.ui"]={};}o.resolutionResult["sap.ui"].technology=this.getMember(A,"sap|ui.technology");o.resolutionResult.applicationType=this._formatApplicationType(o.resolutionResult,A);o.resolutionResult.systemAlias=o.resolutionResult.systemAlias||this.getMember(s,"systemAlias");o.resolutionResult.systemAliasSemantics="apply";o.resolutionResult.text=o.title;o.resolutionResult.appId=this.getMember(A,"sap|app.id");var t,g;var h=this.getMember(v,"vizConfig.sap|flp.indicatorDataSource");var T={};if(!i(V)){var j=this.getMember(V,"sap|app.type");if(j==="card"){I=true;T=m({},V,v.vizConfig);}else{T.componentName=this.getMember(V,"sap|ui5.componentName");var C=this.getMember(V,"sap|platform|runtime.componentProperties");if(C){T.componentProperties=C;}if(this.getMember(V,"sap|platform|runtime.includeManifest")){T.componentProperties=T.componentProperties||{};T.componentProperties.manifest=m({},V,v.vizConfig);delete T.componentProperties.manifest["sap.platform.runtime"];}}}if(this.getMember(A,"sap|app.type")==="plugin"||this.getMember(A,"sap|flp.type")==="plugin"){return undefined;}var l=this.getNestedObjectProperty([e,A,V],"sap|flp.tileSize");var n=this.getNestedObjectProperty([e,A,V],"sap|app.description");if(this.getMember(A,"sap|ui.technology")==="GUI"&&this.getMember(A,"sap|gui.transaction")){t=this.getMember(A,"sap|gui.transaction");}if(this.getMember(A,"sap|ui.technology")==="WDA"&&this.getMember(A,"sap|wda.applicationId")){t=this.getMember(A,"sap|wda.applicationId");}var D=this.getNestedObjectProperty([e,A,V],"sap|app.dataSources");if(this.getMember(A,"sap|app.id")){g=this.getMember(A,"sap|app.id");}var p=b.getContentProviderId(A)||"";o.tileResolutionResult={appId:g,title:o.title,subTitle:o.subTitle,icon:o.icon,size:l,info:o.info,keywords:o.keywords,tileComponentLoadInfo:T,indicatorDataSource:h,dataSources:D,description:n,runtimeInformation:f,technicalInformation:t,deviceTypes:o.deviceTypes,isCard:I,contentProviderId:p,numberUnit:o.numberUnit};var w=this.getMember(A,"sap|integration.urlTemplateId");var x=this.getTemplatePayloadFromSite(w,S);if(x){o.templateContext={payload:x,site:S,siteAppSection:A};}return o;};c.getTemplatePayloadFromSite=function(t,s){if(!s||typeof t!=="string"){return null;}var T=t.replace(/[.]/g,"|");return this.getMember(s.urlTemplates,T+".payload");};c._formatApplicationType=function(R,A){var s=R.applicationType;if(s){return s;}var C=this.getMember(A,"sap|platform|runtime.componentProperties.self.name")||this.getMember(A,"sap|ui5.componentName");if(this.getMember(A,"sap|flp.appType")==="UI5"||this.getMember(A,"sap|ui.technology")==="UI5"){R.applicationType="SAPUI5";R.additionalInformation="SAPUI5.Component="+C;R.url=this.getMember(A,"sap|platform|runtime.componentProperties.url");R.applicationDependencies=this.getMember(A,"sap|platform|runtime.componentProperties");return"SAPUI5";}if(this.getMember(A,"sap|ui.technology")==="GUI"){R.applicationType="TR";R["sap.gui"]=this.getMember(A,"sap|gui");R.systemAlias=this.getMember(A,"sap|app.destination.name");return"TR";}if(this.getMember(A,"sap|ui.technology")==="WDA"){R.applicationType="WDA";R["sap.wda"]=this.getMember(A,"sap|wda");R.systemAlias=this.getMember(A,"sap|app.destination.name");return"WDA";}if(this.getMember(A,"sap|ui.technology")==="URL"){R.applicationType="URL";R.systemAlias=this.getMember(A,"sap|app.destination.name");}return"URL";};c.formatSite=function(s){var t=this;if(!s){return[];}var I=[];try{var S=Object.keys(s.applications||{}).sort();S.forEach(function(A){try{var o=s.applications[A];var f=this.getMember(o,"sap|app.crossNavigation.inbounds");if(f){var l=Object.keys(f).sort();l.forEach(function(g){var h=f[g];var R=t.mapOne(g,h,o,undefined,undefined,s);if(R){R.contentProviderId=b.getContentProviderId(o)||"";I.push(R);}});}}catch(E){L.error("Error in application "+A+": "+E,E.stack);}}.bind(this));}catch(e){L.error(e);L.error(e.stack);return[];}return I;};c.toHashFromInbound=function(I){var s,p,C;s={target:{semanticObject:I.semanticObject,action:I.action},params:{}};p=O.get("signature.parameters",I)||{};Object.keys(p).forEach(function(k){if(p[k].filter&&Object.prototype.hasOwnProperty.call(p[k].filter,"value")&&(p[k].filter.format===undefined||p[k].filter.format==="plain")){s.params[k]=[p[k].filter.value];}if(p[k].launcherValue&&Object.prototype.hasOwnProperty.call(p[k].launcherValue,"value")&&(p[k].launcherValue.format===undefined||p[k].launcherValue.format==="plain")){s.params[k]=[p[k].launcherValue.value];}});C=sap.ushell.Container.getService("URLParsing").constructShellHash(s);if(!C){return undefined;}return C;};c.toHashFromOutbound=function(o){var s,p,C;s={target:{semanticObject:o.semanticObject,action:o.action},params:{}};p=o.parameters||{};Object.keys(p).forEach(function(k){if(p.hasOwnProperty(k)&&typeof p[k].value==="object"){s.params[k]=[p[k].value.value];}});C=sap.ushell.Container.getService("URLParsing").constructShellHash(s);if(!C){return undefined;}return C;};c.toHashFromVizData=function(v,A,U){var V,t;if(!v.target){return undefined;}V=v.target;if(V.type==="URL"){return V.url;}var s=V.appId;var I=V.inboundId;if(s&&I){var o=b.getInboundTarget(A,s,I);t={};if(o){t.semanticObject=o.semanticObject;t.action=o.action;t.parameters=V.parameters||{};t.parameters["sap-ui-app-id-hint"]={value:{value:s,format:"plain"}};t.appSpecificRoute=V.appSpecificRoute||"";}}else if(V.semanticObject&&V.action){t=V;}return c.toHashFromTarget(t,U);};c.toHashFromTarget=function(t,U){try{var p={};var R=O.get("parameters",t)||{};Object.keys(R).forEach(function(k){p[k]=Array.isArray(R[k].value.value)?R[k].value.value:[R[k].value.value];});var h={target:{semanticObject:t.semanticObject,action:t.action},params:p,appSpecificRoute:t.appSpecificRoute};return"#"+U.constructShellHash(h);}catch(e){return undefined;}};c.toTargetFromHash=function(h,U){var t=U.parseShellHash(h);if(t!==undefined){var p=t.params||{};if(Object.keys(p).length>0){t.parameters=[];Object.keys(p).forEach(function(k){var v=Array.isArray(p[k])?p[k]:[p[k]];v.forEach(function(V){var P={name:k,value:V};t.parameters.push(P);});});}delete t.params;}else{t={type:"URL",url:h};}return t;};c.isSameTarget=function(t,T){var R;if(t.type!==T.type){return false;}if(t.type==="URL"){R=t.url===T.url;}else{R=t.semanticObject===T.semanticObject&&t.action===T.action&&t.appSpecificRoute===T.appSpecificRoute&&a(t.parameters,T.parameters);}return R;};return c;},true);}},"sap/ui/core/library-preload");
