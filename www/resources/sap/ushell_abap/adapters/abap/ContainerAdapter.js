// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ushell/System","sap/ushell/User","sap/ushell/utils","sap/ushell_abap/bootstrap/evo/abap.bootstrap.utils","sap/ui2/srvc/ODataWrapper","sap/ui/thirdparty/URI","sap/ui/thirdparty/datajs","sap/base/util/ObjectPath"],function(q,S,U,u,a,O,b,c,d){"use strict";var C=function(s,p,P){var o,e="/sap/public/bc/icf/logoff";this._logoutViaHiddenIFrame=function(D,f){var F=document.createElement("iframe"),g=f.replace(/"/g,"\\\"");window.addEventListener("message",function(E){if(E.data===f){D.resolve();}});F.style.visibility="hidden";F.setAttribute("src",f);function h(){parent.postMessage(g,"*");}F.addEventListener("load",h);F.addEventListener("error",h);document.body.appendChild(F);};this.getSystem=function(){return s;};this.getUser=function(){return o;};this._determineAccessibility=function(f){var A=u.getParameterValueBoolean("sap-accessibility");if(A!==undefined){return A;}A=f.accessibility;if(A!==undefined){return A;}return false;};this._setThemeAccessibilityFlags=function(f){if(f.userProfile&&f.userProfile.length){var g,h;g=f.userProfile.filter(function(i){return i.id&&i.id==="THEME";})[0];if(g&&g.value){f.setThemePermitted=(g.editState===3);}else{f.oUserProfileDataTheme=false;}h=f.userProfile.filter(function(i){return i.id&&i.id==="ACCESSIBILITY";})[0];if(h&&h.id){f.setAccessibilityPermitted=(h.editState===3);}else{f.setAccessibilityPermitted=false;}if(h&&h.value==="true"){f.accessibility=true;}if(h&&h.value==="false"){f.accessibility=false;}f.accessiblity=this._determineAccessibility(f);}};this._setUserProfileFlags=function(f){if(f.userProfile&&f.userProfile.length&&Array.isArray(f.userProfile)){var g={};f.setContentDensityPermitted=false;f.userProfile.forEach(function(h){if((h.id in g)){return;}g[h.id]=h.id;if(h.id==="CONTENT_DENSITY"){f.contentDensity=h.value;f.setContentDensityPermitted=(h&&h.editState===3)||false;}if(h.id==="TRACKING_USAGE_ANALYTICS"){if(typeof h.value==="string"){if(h.value.toLowerCase()==="true"||h.value.toLowerCase()==="false"){h.value=(h.value.toLowerCase()==="true")||false;}else{h.value=undefined;}}if(typeof h.value==="undefined"||typeof h.value==="boolean"){f.trackUsageAnalytics=h.value;}else{f.trackUsageAnalytics=undefined;}}if(h.id==="MYHOME_IMPORT_FROM_CLASSIC"){f.importBookmarks=h.value;}if(h.id==="MYHOME_ENABLEMENT"){switch(h.value){case"false":f.showMyHome=false;break;case"true":f.showMyHome=true;break;default:f.showMyHome=undefined;break;}}});}};this.load=function(){var D=new q.Deferred(),f=P.config,g=f.systemProperties;s=new S({alias:s.getAlias(),platform:s.getPlatform(),baseUrl:f.baseUrl,client:f.client,clientRole:f.clientRole,system:f.system,productName:g&&g.productName,systemName:g&&g.systemName,systemRole:g&&g.systemRole,tenantRole:g&&g.tenantRole,productVersion:f.productVersion,isTrialSystem:f.isTrialSystem});this._setThemeAccessibilityFlags(f);this._setUserProfileFlags(f);o=new U(f);sap.ui2.srvc.ODataWrapper["sap-language"]=f.language;sap.ui2.srvc.ODataWrapper["sap-client"]=f.client;if(f.target){C.startUpApplication={adjustedInitialTarget:f.adjustedInitialTarget,target:f.target};}this._setUserImage(o);return D.resolve().promise();};this.addFurtherRemoteSystems=function(){var D=new q.Deferred(),f;f=sap.ushell.Container.getService("PageBuilding").getFactory().getPageBuildingService();f.readAllCatalogsForUser("type eq 'H' or type eq 'REMOTE'",function(g){var h=g.results,i="/sap/opu/odata/sap/SM_CATALOG_SRV/";if(h){h.forEach(function(j){var I=/^\/sap\/hba\//.test(j.baseUrl);if(j.type==="H"||j.baseUrl===i||I){sap.ushell.Container.addRemoteSystem(new S({alias:j.systemAlias,platform:(I||j.type==="H")?"hana":"abap",baseUrl:j.type==="H"?"":";o="}));}});}D.resolve();},function(E){q.sap.log.error("Reading REMOTE catalogs failed: "+E,null,"sap.ushell_abap.adapters.abap.ContainerAdapter");D.reject();});return D.promise();};this.getCurrentUrl=function(){return window.location.href;};this.sessionKeepAlive=function(){var f="/sap/opu/odata/UI2/PAGE_BUILDER_PERS";var x=a.createAndOpenXHR(f,null,"HEAD");x.onreadystatechange=function(){if(this.readyState===4){q.sap.log.debug("server session was extended");}};x.send();};this.logout=function(l){var D=new q.Deferred(),f;if(l){if(u.hasNativeLogoutCapability()){var F=(new b(e)).absoluteTo(this.getCurrentUrl()).search("").toString();window.external.getPrivateEpcm().doLogOff(F);}else{this.logoutRedirect();}q.sap.log.info("ABAP system logged out: "+s.getAlias(),null,"sap.ushell_abap.adapters.abap.ContainerAdapter");D.resolve();}else{f=s.adjustUrl(e);q.sap.log.info("Logging out from system '"+s.getAlias()+"' via hidden iframe");this._logoutViaHiddenIFrame(D,f);}return D.promise();};this.logoutRedirect=function(){var f=s.adjustUrl(e);this._setDocumentLocation(f);};this._setDocumentLocation=function(l){window.document.location=l;};this._setUserImage=function(o){function i(){var f=window["sap-ushell-config"],v=d.get("renderers.fiori2.componentData.config.enableUserImage",f);return!!v;}if(i()&&o&&o.isJamActive&&o.isJamActive()){c.read("/sap/bc/ui2/smi/rest_tunnel/Jam/api/v1/OData/Self?$format=json",function(r){var j=r.results.Id,J="/sap/bc/ui2/smi/rest_tunnel/Jam/api/v1/OData/Members('"+j+"')/ProfilePhoto/$value";o.setImage(J);},function(){q.sap.log.error("Could not recieve JAM user data");});}};};return C;},true);