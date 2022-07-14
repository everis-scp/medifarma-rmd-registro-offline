/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define("sap/zen/dsh/AnalyticGrid",["jquery.sap.global","sap/base/Log","sap/ui/core/Control","sap/ui/thirdparty/URI","sap/zen/dsh/library"],function(q,L,C,U){C.extend("sap.zen.dsh.AnalyticGrid",{metadata:{library:"sap.zen.dsh",properties:{width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},selection:{type:"object",group:"Data",defaultValue:null},queryName:{type:"string",group:"Data",defaultValue:null},systemAlias:{type:"string",group:"Data",defaultValue:null},state:{type:"string",group:"Data",defaultValue:null}},events:{stateChange:{parameters:{state:{type:"string"}}},selectionChange:{parameters:{selection:{type:"object"}}}}}});sap.zen.dsh.DSH_deployment=true;var s=s||{};sap.zen.dsh.sapbi_page=sap.zen.dsh.sapbi_page||{};sap.zen.dsh.sapbi_page.getParameter=sap.zen.dsh.sapbi_page.getParameter||function(){return"";};sap.zen.dsh.sapbi_MIMES_PIXEL=sap.zen.dsh.sapbi_MIMES_PIXEL||"";sap.zen.dsh.doReplaceDots=true;sap.zen.dsh.AnalyticGrid.prototype.init=function(){this.parameters={};this.dshBaseUrl=U(sap.ui.resource("sap.zen.dsh","rt/")).absoluteTo(window.location.pathname).toString();sap.zen.dsh.sapbi_page.staticMimeUrlPrefix=this.dshBaseUrl;this.repositoryUrl=U(sap.ui.resource("sap.zen.dsh","applications/")).absoluteTo(window.location.pathname).toString();};sap.zen.dsh.AnalyticGrid.prototype._initializeInternal=function(){if(this.initialized){this.page.forceFullNonDeltaRender();return;}this.initialized=true;this._addParameter("XQUERY",this.getQueryName());if(this.getState()){this._initializeInnerAppState(this.getState());}else{this._initializeSelectionVariant(this.getSelection());}var t=this;setTimeout(function(){t._createPage();},0);};sap.zen.dsh.AnalyticGrid.prototype._createPage=function(){sap.zen.dsh.scriptLoaded=true;var t=this;var c=sap.ui.getCore().getConfiguration();var l=c.getLocale().getSAPLogonLanguage();if(!l){l=window.navigator.userLanguage||window.navigator.language;}var a="";if(window.document.cookie){var m=/(?:sap-usercontext=)*sap-client=(\d{3})/.exec(window.document.cookie);if(m&&m[1]){a=m[1];}}var u=sap.firefly.XHashMapOfStringByString.create();for(var k in this.parameters){u.put(k,this.parameters[k]);}var d=new sap.zen.DesignStudio();d.setHost(window.document.location.hostname);d.setPort(window.document.location.port);d.setProtocol(window.document.location.protocol.split(":")[0]);d.setClient(a);d.setLanguage(l);if(this.repositoryUrl){d.setRepositoryUrl(this.repositoryUrl);}d.setApplicationPath(this.repositoryUrl+"0ANALYTIC_GRID");d.setApplicationName("0ANALYTIC_GRID");d.setUrlParameter(u);d.setSdkLoaderPath("");d.setHanaMode(true);d.setDshControlId(t.getId());d.setStaticMimesRootPath(this.dshBaseUrl);d.setSystemAlias(this.getSystemAlias());d.setNewBW(true);this.page=d.createPage();if(!sap.zen.dsh.wnd){sap.zen.dsh.wnd={};}sap.zen.dsh.wnd[t.getId()+"Buddha"]=this.page;sap.zen.dsh.sapbi_page=sap.zen.dsh.sapbi_page||{};sap.zen.dsh.sapbi_page.staticMimeUrlPrefix=this.dshBaseUrl;sap.zen.dsh.sapbi_page.getParameter=function(){return"";};sap.zen.dsh.sapbi_MIMES_PIXEL="";};sap.zen.dsh.AnalyticGrid.prototype.onAfterRendering=function(){this._initializeInternal();};sap.zen.dsh.AnalyticGrid.prototype._logoff=function(){if(!this.loggedOff){this.loggedOff=true;this._executeScript("APPLICATION.logoff();");}};sap.zen.dsh.AnalyticGrid.prototype.exit=function(){this._logoff();var r=sap.ui.getCore().byId(this.sId+"ROOT_absolutelayout");if(r){r.destroy();}};sap.zen.dsh.AnalyticGrid.prototype._addParameter=function(n,v){this.parameters[n]=v;};sap.zen.dsh.AnalyticGrid.prototype._executeScript=function(a){if(this.page){this.page.getWindow().increaseLock();this.page.exec&&this.page.exec(a);}};sap.zen.dsh.AnalyticGrid.prototype.setSelection=function(S){this.setProperty("selection",S,true);if(this.initialized){var n=this._buildNavParamObject(S);this.page.navigationParamObject=JSON.stringify(n);this._executeScript("GLOBAL_SCRIPT_ACTIONS.ApplyNavigationParameters();");}return this;};sap.zen.dsh.AnalyticGrid.prototype.fireSelectionChange=function(p){this.setProperty("selection",p.selection,true);return this.fireEvent("selectionChange",p);};sap.zen.dsh.AnalyticGrid.prototype._buildNavParamObject=function(S){function a(O,v,V){if(!Object.prototype.hasOwnProperty.call(v,O)){v[O]=V;}}var n={};if(S){var p=S.Parameters;var b=S.SelectOptions;if(p){for(var c=0;c<p.length;c++){var P=p[c];n[P.PropertyName]=P.PropertyValue;}}if(b){for(var i=0;i<b.length;++i){var o=b[i];var r=o.Ranges;var f=[];for(var j=0;j<r.length;++j){var d;var R=r[j];if(["EQ","BT","GE","LE","GT","LT"].indexOf(R.Option)==-1){continue;}if(R.Sign==="I"&&R.Option==="EQ"){d=R.Low;}else{d={exclude:R.Sign==="E"||undefined,operation:R.Option,from:R.Low,to:R.High};}f.push(d);}if(f.length>0){a(o.PropertyName,n,f);}}}}return n;};sap.zen.dsh.AnalyticGrid.prototype._initializeSelectionVariant=function(S){var n=this._buildNavParamObject(S);if(!q.isEmptyObject(n)){this._addParameter("NAV_PARAMS",JSON.stringify(n));}};sap.zen.dsh.AnalyticGrid.prototype._initializeInnerAppState=function(S){if(S){this._addParameter("NAV_INITIAL_STATE",S);}};sap.zen.dsh.AnalyticGrid.prototype.setState=function(S){this.setProperty("state",S,true);if(this.initialized){this.page.getWindow().getContext("BookmarkInternal").applyApplicationState(S,true);this.page.forceFullNonDeltaRender();}return this;};sap.zen.dsh.AnalyticGrid.prototype.fireStateChange=function(p){this.setProperty("state",p.state,true);return this.fireEvent("stateChange",p);};});