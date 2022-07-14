sap.ui.define(["jquery.sap.global","sap/ui/core/support/Plugin","sap/ui/core/format/DateFormat","sap/ui/model/json/JSONModel","sap/ovp/support/lib/CommonChecks","sap/ovp/support/lib/CommonMethods"],function(q,P,D,J,C,a){"use strict";var p="sapUiSupportFioriElementsPluginALPLROP";function g(s){var o,A,v=p+"-View",d=[],e=sap.ui.getCore().getEventBus(),m,b,r,M,I,t=10,T;function G(){return p;}function f(i){var d1=D.getDateInstance({source:{pattern:"YYYYMMdd"},style:"short"});return d1.format(d1.parse(String(i).substring(0,8)));}function c(i){var d1=window.location.origin;var e1=window.location.pathname;var f1=i||C.getComponentIDByStructure();if(f1){m=C.getManifestPath(f1);if(m){var g1=C.getManifestURL(d1,e1,m);if(g1){return g1;}}}return"";}function h(i,d1,e1,f1,g1){if(i==="string"){d.push({order:e1,name:d1,type:i,value:f1});return true;}else if(i==="link"){d.push({order:e1,name:d1,type:i,value:f1,target:g1});return true;}else if(i==="group"){d.push({order:e1,name:d1,type:i});return true;}return false;}function j(i,d1,e1){return h("string",i,d1,e1,"");}function k(i,d1,e1,f1){return h("link",i,d1,e1,f1);}function l(i,d1){return h("group",i,d1,"","");}function n(i){if(!(i&&a.hasObjectContent(i))){return undefined;}if(!(i.getMetadata()&&a.hasObjectContent(i.getMetadata()))){return undefined;}var d1=i.getMetadata();if(!(d1.getManifest()&&a.hasObjectContent(d1.getManifest()))){return undefined;}return d1.getManifest();}function u(i){d=[];j("Error",0,i);U();}function w(i){try{var d1=C.getUI5VersionInfo();if(d1&&a.hasObjectContent(d1)){j("OpenUI5 Version",i,d1.version+" (built at "+f(d1.buildTimestamp)+")");return true;}else{j("OpenUI5 Version",i,"ERROR: OpenUI5 version is not available!");return false;}}catch(ex){j("OpenUI5 Version",i,sap.ui.version+", detailed UI5 version info is not available! Possible reason: missing file \"sap-ui-version.json\"");return true;}}function x(i){var d1=a.getApplicationName(window.location.href);if(d1){k("Application URL",i,"#"+d1,window.location.href);return true;}else{j("Application URL",i,"ERROR: Could not extract application name (#semanticObject-action) from URL!");return false;}}function y(i){if(m&&b){var d1=m;if(m.indexOf("./")===0){d1=m.substring(2,m.length);}k("Manifest",i,d1,b);return true;}else{j("Manifest",i,"ERROR: Could not generate link to manifest.json! Possible reason: The application did not finish loading or is not a Fiori Elements application.");return false;}}function z(i){if(!(M)){return false;}var d1=C.getRegistrationIDsByManifest(M);if(d1&&Array.isArray(d1)&&d1.length>0){j((d1.length>1?"Fiori IDs":"Fiori ID"),i,a.concatStrings(d1));return true;}return false;}function B(i){var d1=C.getApplicationComponentByManifest(M);if(d1){j("Application Component (ACH)",i,d1);return true;}else{j("Application Component (ACH)",i,"ERROR: Path /sap.app/ach not found in manifest.json! Possible reason: Invalid manifest.json");return false;}}function E(i){var d1=C.getApplicationIDByManifest(M);if(d1){j("Application ID",i,d1);return true;}else{j("Application ID",i,"ERROR: Path /sap.app/id not found in manifest.json! Possible reason: Invalid manifest.json");return false;}}function F(i){if(M){var d1=C.getFloorplanByManifest(M);}else{d1=C.getFloorplanByStructure();}if(!C.isValidFloorplan(d1)){d1=C.mFloorplans.UNKNOWN;}if(d1===C.mFloorplans.UNKNOWN){j("Floorplan Component (ACH)",i,C.getTicketComponentForFloorplan(d1)+" (ERROR: Unknown floorplan! Possible reason: Invalid manifest.json)");return false;}else{j("Floorplan Component (ACH)",i,C.getTicketComponentForFloorplan(d1)+" ("+d1+")");return true;}}function H(i,d1){if(!(M&&a.hasObjectContent(M))){return false;}if(!(M["sap.app"]&&M["sap.app"].dataSources&&M["sap.app"].dataSources[i])){j("OData Service Metadata",d1,"ERROR: Data source "+i+" not found at /sap.app/dataSources/"+i+" in manifest.json! Possible reason: Invalid manifest.json");return false;}if(!M["sap.app"].dataSources[i].uri){j("OData Service Metadata",d1,"ERROR: Data source URI not found at /sap.app/dataSources/"+i+"/uri in manifest.json! Possible reason: Invalid manifest.json");return false;}var e1=M["sap.app"].dataSources[i].uri;if(e1.lastIndexOf("/")!==e1.length-1){e1+="/";}e1+="$metadata";k("OData Metadata",d1,e1,window.location.origin+e1);return true;}function K(i,d1){if(!(M&&a.hasObjectContent(M)&&r)){return false;}if(!(M["sap.app"]&&M["sap.app"].dataSources&&M["sap.app"].dataSources[i])){j("Annotations",d1,"ERROR: Data source "+i+" not found at /sap.app/dataSources/"+i+" in manifest.json! Possible reason: Invalid manifest.json");return false;}if(!(M["sap.app"].dataSources[i].settings&&M["sap.app"].dataSources[i].settings.annotations&&M["sap.app"].dataSources[i].settings.annotations!==[])){j("Annotations",d1,"ERROR: Data source "+i+" has no annotations at /sap.app/dataSources/"+i+"/settings/annotations in manifest.json! Possible reason: Invalid manifest.json");return false;}var e1=M["sap.app"].dataSources[i].settings.annotations;e1=e1.reverse();for(var f1 in e1){if(!e1.hasOwnProperty(f1)){continue;}var g1=e1[f1];if(M["sap.app"].dataSources[g1]){var h1=M["sap.app"].dataSources[g1].uri;if(!h1){continue;}var i1="";var j1="";if(h1.indexOf("/")===0){j1="Backend Annotation";i1=window.location.origin;}else{j1="Local Annotation";i1=r;if(i1.lastIndexOf("/")!==i1.length-1){i1+="/";}}j1+=" (Prio. "+parseInt(parseInt(f1,10)+1,10)+")";k(j1,d1,M["sap.app"].dataSources[g1].uri,i1+M["sap.app"].dataSources[g1].uri);}}return true;}function L(i){if(!(M)){return;}var d1=0;function e1(m1){d1+=0.01;return m1+d1;}if(!(M["sap.ui5"]&&M["sap.ui5"].models)){j("Data Sources",i,"ERROR: Path /sap.ui5/models not found in manifest.json! Possible reason: Invalid manifest.json");return;}var f1=M["sap.ui5"].models;var g1=[];for(var h1 in f1){if(!f1.hasOwnProperty(h1)){continue;}if(f1[h1]&&f1[h1].dataSource&&f1[h1].dataSource!==""){var i1=false;for(var j1 in g1){if(!g1.hasOwnProperty(j1)){continue;}if(g1[j1].dataSource===f1[h1].dataSource){i1=true;break;}}var k1=(h1===""?"mainService":h1);if(!i1){g1.push({models:[k1],dataSource:f1[h1].dataSource});}else{g1[j1].models.push(k1);}}}if(g1.length===0){j("Data Sources",i,"ERROR: No models with data sources found in manifest.json! Possible reason: Invalid manifest.json");return;}for(var l1 in g1){if(!g1.hasOwnProperty(l1)){continue;}if(!(M["sap.app"]&&M["sap.app"].dataSources)){j("Data Sources",i,"ERROR: No data sources found at /sap.app/dataSources in manifest.json! Possible reason: Invalid manifest.json");return;}if(!M["sap.app"].dataSources[g1[l1].dataSource]){j("Data Sources",i,"ERROR: Data source "+g1[l1].dataSource+" not found at /sap.app/dataSources/"+g1[l1].dataSource+" in manifest.json! Possible reason: Invalid manifest.json");return;}l(a.concatStrings(g1[l1].models),e1(i));H(g1[l1].dataSource,e1(i));K(g1[l1].dataSource,e1(i));}}function N(i){var d1=sap.ui.getCore().byId(i);if(d1){return d1;}else{return sap.ui.core.mvc.XMLView.create({id:i,viewName:"sap.ovp.support.DiagnosticsTool.view.DiagnosticsTool",definition:{plugin:o}}).then(function(e1){return e1;});}}function R(){var i=N(v);i.placeAt(p);var d1=new J();i.setModel(d1,"data");}function O(){o=this;A=window.location.hash.slice(1);if(s.isToolStub()){if(!s.hasListeners(p+"SetData")){s.attachEvent(p+"SetData",Z);}if(!s.hasListeners(p+"UpdateStatus")){s.attachEvent(p+"UpdateStatus",$);}if(!s.hasListeners(p+"ShowDataRefreshed")){s.attachEvent(p+"ShowDataRefreshed",_);}window.fioriElementsPluginID=p;R();}else{if(!s.hasListeners(p+"GetData")){s.attachEvent(p+"GetData",Y);}e.unsubscribe("elements","ViewRendered",b1);e.unsubscribe("elements","ViewRenderingStarted",b1);e.subscribe("elements","ViewRendered",b1);e.subscribe("elements","ViewRenderingStarted",b1);if("onhashchange"in window){window.addEventListener("hashchange",c1);}}Y();}function Q(){if(s.isToolStub()){window.fnFEPluginToolInstanceExit=undefined;s.detachEvent(p+"SetData",Z);s.detachEvent(p+"UpdateStatus",$);s.detachEvent(p+"ShowDataRefreshed",_);N(v).destroy();}else{window.fnFEPluginAppInstanceExit=undefined;s.detachEvent(p+"GetData",Y);e.unsubscribe("elements","ViewRendered",b1);e.unsubscribe("elements","ViewRenderingStarted",b1);if("onhashchange"in window){window.removeEventListener("hashchange",c1);}}}function S(){s.sendEvent(p+"GetData",{});}function U(){var i=new J();d.sort(a.getDynamicComparator("order"));var d1=new Date().toLocaleTimeString([],{hour12:false,hour:"2-digit",minute:"2-digit",second:"2-digit"});var e1=true;if(!d||d.length===0){e1=false;}var f1=a.getApplicationStatus();if(!f1){a.setApplicationStatus(a.mApplicationStatus.UNKNOWN);f1=a.mApplicationStatus.UNKNOWN;}var g1="";if(f1===a.mApplicationStatus.FAILED){g1="The application did not finish loading or is no Fiori Elements application! The shown data below could be collected anyway. If the application finishes loading, the data will be updated automatically.";}i.setData({properties:d,url:window.location.href,origin:window.location.origin,retrieval:d1,copyEnabled:e1,status:f1,statusMessage:g1});s.sendEvent(p+"SetData",JSON.parse(i.getJSON()));}function V(i,d1){s.sendEvent(p+"UpdateStatus",{timeLeft:i,status:d1});}function W(){s.sendEvent(p+"ShowDataRefreshed",{});}function X(i){if(b){r=C.getRootPath(b);}d=[];U();w(1);x(2);y(3);U();if(i&&M&&a.hasObjectContent(M)){z(3);B(4);F(5);L(6);U();W();}else if(b){q.when(a.getFileFromURI(b)).done(function(d1){M=d1;z(3);E(4);B(5);F(6);L(7);}).fail(function(){j("Manifest",3,"ERROR: Could not access manifest.json even though link could be generated! Possible reason: missing permission to access file.");}).always(function(){U();W();});}}function Y(){M=undefined;b=undefined;r=undefined;var i=a.getApplicationStatus();var d1=a.getAppComponent();var e1=false;if(!(i&&a.isValidApplicationStatus(i))){i=a.mApplicationStatus.UNKNOWN;}if(i===a.mApplicationStatus.LOADING){b1();return;}else if(i===a.mApplicationStatus.FAILED){var f1=n(d1);if(f1&&a.hasObjectContent(f1)){M=f1;if(M&&M["sap.app"]&&M["sap.app"].id){b=c(M["sap.app"].id);if(!b){e1=true;}}else{e1=true;}}else{u("Could not load any data because manifest and component of current application are unknown!");W();return;}}else if(i===a.mApplicationStatus.RENDERED){b=c();if(!b){f1=n(d1);if(f1&&a.hasObjectContent(f1)){M=f1;if(M&&M["sap.app"]&&M["sap.app"].id){b=c(M["sap.app"].id);if(!b){e1=true;}}else{e1=true;}}else{u("Could not load any data because manifest and component of current application are unknown!");W();return;}}}else if(i===a.mApplicationStatus.UNKNOWN){if(C.getFloorplanByStructure()!==C.mFloorplans.UNKNOWN){M=C.getManifestByStructure();if(M&&a.hasObjectContent(M)){if(M&&M["sap.app"]&&M["sap.app"].id){b=c(M["sap.app"].id);if(!b){e1=true;}}else{e1=true;}}}else{u("Could not load any data because manifest and component of current application are unknown!");W();return;}}X(e1);}function Z(i){var d1=new J();d1.setJSON(JSON.stringify(i.getParameters()));var e1=N(v);e1.setModel(d1,"data");e1.invalidate();}function $(i){var d1=i.getParameters();N(v).getController().updateStatus(d1.timeLeft,d1.status);}function _(){var i=N(v);i.getController().showDataRefreshed();}function a1(){var i=a.getApplicationStatus();if(T>0){V(T,i);}else{T=t;a.setApplicationStatus(a.mApplicationStatus.FAILED);V(0,a.mApplicationStatus.FAILED);I.removeListener(a1);I=undefined;Y();}T--;}function b1(i,d1){if(d1==="ViewRenderingStarted"||(!d1&&a.getApplicationStatus()===a.mApplicationStatus.LOADING)){a.setApplicationStatus(a.mApplicationStatus.LOADING);if(!I){T=t;I=new sap.ui.core.IntervalTrigger(1000);I.addListener(a1);}}else if(d1==="ViewRendered"){a.setApplicationStatus(a.mApplicationStatus.RENDERED);T=t;if(I){I.removeListener(a1);I=undefined;}Y();}}function c1(d1){function e1(j1){for(var i=0;i<j1.length;i++){if(j1[i]==="/"||j1[i]==="&"||j1[i]==="?"||j1[i]==="~"){return i;}}return j1.length;}function f1(i,j1){if(!i||!j1){return false;}if(i===j1){return true;}var k1=e1(i);var l1=e1(j1);if(k1!==l1){return false;}else if(i.substr(0,k1)===j1.substr(0,l1)){return true;}return false;}var g1,h1,i1=false;if(d1.originalEvent.oldURL&&d1.originalEvent.newURL){g1=d1.originalEvent.oldURL.split("#")[1];h1=d1.originalEvent.newURL.split("#")[1];}else{g1=A;h1=window.location.hash.slice(1);A=h1;}if(g1.length>=h1.length){i1=f1(h1,g1);}else{i1=f1(g1,h1);}if(!i1){a.setApplicationStatus(a.mApplicationStatus.LOADING);a.setAppComponent(undefined);b1();T=(t/2);}}return{init:O,exit:Q,getId:G,onRefresh:S};}return P.extend("sap.ovp.support.DiagnosticsTool.DiagnosticsTool",{constructor:function(s){P.apply(this,[p,"SAP Fiori Elements",s]);Object.assign(this,g(s));}});});
