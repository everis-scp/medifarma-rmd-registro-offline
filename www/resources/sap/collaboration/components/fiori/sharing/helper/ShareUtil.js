/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

(c) Copyright 2009-2017 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/ui/base/Object","sap/m/SelectDialog"],function(q,B,S){"use strict";var a=B.extend("sap.collaboration.components.fiori.sharing.helper.ShareUtil",{constructor:function(l,o,s,c,j,C){this._bIsOkToRefreshSecurityToken=true;this.iGrowingThreshold=10;this.oLangBundle=l;this.oODataUtil=o;this.oSMIODataModel=s;this.oJamODataModel=j;this.oCollaborationHostRestService=C;this.oCommonUtil=c;this.bShareError=false;this.bShareBusinessObjShared;this.bFileUploaded;this.aUploadAttachmentsUploaded=[];this.IdisplaySuccessMessageIntervalId;},shareBusinessObject:function(s){var t=this;if(s.mappedExternalObject){if(s.feedContent!==undefined&&s.feedContent.uiUrl!==undefined){var p=s.mappedExternalObject;p.Name=s.externalObject.name;p.Groups=[{__metadata:{uri:"Groups('"+s.groupId+"')"}}];p.Permalink=s.feedContent.uiUrl;var P={async:true,success:function(d,r){t._bIsOkToRefreshSecurityToken=true;t._createGroupFeedEntry_SharedExternalObject(s);},error:function(e){if(e.response.statusCode===409){t._createGroupFeedEntry_SharedExternalObject(s);}else if(e.response.statusCode===403&&t._bIsOkToRefreshSecurityToken){t.oJamODataModel.refreshSecurityToken(function(){t._bIsOkToRefreshSecurityToken=false;t.shareBusinessObject(s);},function(e){t._checkAuthorizationAndDisplayErrorMessage(e.response.statusCode);},true);}else{t._bIsOkToRefreshSecurityToken=true;t._checkAuthorizationAndDisplayErrorMessage(e.response.statusCode);}},};this.oJamODataModel.create("/ExternalObjects",p,P);}else{q.sap.log.error("feedContent.uiUrl parameter should not be undefined when sharing an external object","sap.collaboration.components.fiori.sharing.helper.ShareUtil.shareBusinessObject()");this.displayErrorMessage();}}else{this._createFeedEntry_ShareObjectLink(s);}},_createGroupFeedEntry_SharedExternalObject:function(s){var x='<?xml version="1.0" encoding="UTF-8"?>'+'<feed xmlns="http://www.w3.org/2005/Atom" xmlns:activity="http://activitystrea.ms/spec/1.0/">'+'<entry>'+'<title> </title>'+'<content type="html">'+q.sap.encodeXML(s.feedContent.note)+'</content>'+'<author>'+'<email>'+q.sap.encodeXML(s.memberEmail)+'</email>'+'<activity:object-type>http://activitystrea.ms/schema/1.0/person</activity:object-type>'+'</author>'+'<activity:verb>http://activitystrea.ms/schema/1.0/share</activity:verb>'+'<activity:object>'+'<id>'+q.sap.encodeXML(s.mappedExternalObject.Exid)+'</id>'+'<title type="html">'+q.sap.encodeXML(s.externalObject.name)+'</title>'+'<activity:object-type>'+q.sap.encodeXML(s.mappedExternalObject.ObjectType)+'</activity:object-type>'+'<link type="text/html" rel="alternate" href="'+q.sap.encodeXML(s.feedContent.uiUrl)+'"/>'+'<link rel="http://www.odata.org" href="'+q.sap.encodeXML(s.mappedExternalObject.ODataLink)+'"/>'+'<link rel="http://www.odata.org/metadata" href="'+q.sap.encodeXML(s.mappedExternalObject.ODataMetadata)+'"/>'+'<link rel="http://www.odata.org/annotation" href="'+q.sap.encodeXML(s.mappedExternalObject.ODataAnnotations)+'"/>'+'<source>'+'<id>tag:www.cubetree.com,2013:/groups/'+q.sap.encodeXML(s.groupId)+'</id>'+'</source>'+'</activity:object>'+'</entry>'+'</feed>';var t=this;var o=function(){if(this.readyState==4){if(this.status==200){t.bShareBusinessObjShared=true;t.displaySuccessMessage(s.groupName);}else{t._checkAuthorizationAndDisplayErrorMessage(this.status);}}};this._createFeedEntryViaRestAPI(x,o);},_createFeedEntry_ShareObjectLink:function(s){this.bShareBusinessObjShared=false;if(s.feedContent){if(s.feedContent.note!==undefined){var c=s.feedContent.note;if(s.feedContent.uiUrl){c=c+"<br/><a href='"+s.feedContent.uiUrl.replace(/'/g,"&apos;")+"'>"+this.oLangBundle.getText("SHARE_OBJECT_LINK")+'</a>';}var x='<?xml version="1.0" encoding="UTF-8"?>'+'<feed xmlns="http://www.w3.org/2005/Atom" xmlns:activity="http://activitystrea.ms/spec/1.0/">'+'<entry>'+'<title>'+q.sap.encodeXML(this.oLangBundle.getText("SHARE_OBJECT_LINK_TITLE"))+'</title>'+'<content type="html">'+q.sap.encodeXML(c)+'</content>'+'<author>'+'<email>'+q.sap.encodeXML(s.memberEmail)+'</email>'+'<activity:object-type>http://activitystrea.ms/schema/1.0/person</activity:object-type>'+'</author>'+'<activity:verb>http://activitystrea.ms/schema/1.0/share</activity:verb>'+'<activity:object>'+'<source>'+'<id>tag:www.cubetree.com,2013:/groups/'+q.sap.encodeXML(s.groupId)+'</id>'+'</source>'+'</activity:object>'+'</entry>'+'</feed>';var b=this;var o=function(){if(this.readyState==4){if(this.status==200){b.bShareBusinessObjShared=true;b._bIsOkToRefreshSecurityToken=true;b.displaySuccessMessage(s.groupName);}else{if(this.status==403&&b._bIsOkToRefreshSecurityToken){b.oJamODataModel.refreshSecurityToken(function(){b._bIsOkToRefreshSecurityToken=false;b._createFeedEntry_ShareObjectLink(s);},function(e){b._checkAuthorizationAndDisplayErrorMessage(e.response.statusCode);},true);}else{b._bIsOkToRefreshSecurityToken=true;b._checkAuthorizationAndDisplayErrorMessage(this.status);}}}};this._createFeedEntryViaRestAPI(x,o);}else{q.sap.log.error("feedContent.note parameter should not be undefined","sap.collaboration.components.fiori.sharing.helper.ShareUtil._createFeedEntry_ShareObjectLink()");this.displayErrorMessage();}}else{q.sap.log.error("feedContent parameter should not be undefined","sap.collaboration.components.fiori.sharing.helper.ShareUtil._createFeedEntry_ShareObjectLink()");this.displayErrorMessage();}},_createFeedEntryViaRestAPI:function(x,o){var b={'Accept':'application/atom+xml','Content-Type':'application/atom+xml','x-csrf-token':this.oJamODataModel.getSecurityToken()};var f=this.oCollaborationHostRestService.url+"/feed/post";if(this.oCollaborationHostRestService.urlParams!=undefined&&this.oCollaborationHostRestService.urlParams!=""){f=f+"?"+this.oCollaborationHostRestService.urlParams;}var c=new window.XMLHttpRequest();c.open("POST",f,true);for(var h in b){c.setRequestHeader(h,b[h]);}c.onreadystatechange=o;c.send(x);},uploadAttachments:function(s){var b=this;var g=s.groupId;var f=s.folderId;for(var i in s.aFilesToUpload){this.oSMIODataModel.create('/UploadTargetFile',null,{async:true,success:function(d,r){q.sap.log.debug('File was uploaded',"sap.collaboration.components.fiori.sharing.helper.ShareUtil.uploadAttachments()");},error:function(e){q.sap.log.error('Error, file was not uploaded',"sap.collaboration.components.fiori.sharing.helper.ShareUtil.uploadAttachments()");},urlParameters:{FileMimeType:"'"+s.aFilesToUpload[i].mimeType+"'",FileName:"'"+s.aFilesToUpload[i].name+"'",FileURL:"'"+s.aFilesToUpload[i].url+"'",FolderId:"'"+s.folderId+"'",GroupId:"'"+s.groupId+"'"}});}},createGroupSelectionDialog:function(p,i,s,w,h,o){var b=this;var c=function(e){var v=e.getParameter("value");b.oGroupSelectionDialog.bindAggregation("items","/Groups/?$filter=substringof('"+v.replace(/'/g,"''")+"',Name)",i);};this.oGroupSelectionDialog=new S(p+"_GroupSelectionDialog",{multiSelect:false,noDataText:this.oLangBundle.getText("GRP_NO_GROUPS_FOUND_TEXT"),rememberSelections:false,growingThreshold:this.iGrowingThreshold,title:this.oLangBundle.getText("GROUP_SELECTION_DIALOG_TITLE"),confirm:s,search:c,liveChange:c}).addStyleClass("sapUiPopupWithPadding");if(w){this.oGroupSelectionDialog.setContentWidth(w.toString()+"px");}if(h){this.oGroupSelectionDialog.setContentHeight(h.toString()+"px");}this.oGroupSelectionDialog.setModel(o);this.oGroupSelectionDialog.bindAggregation("items","/Groups",i);return this.oGroupSelectionDialog;},displaySuccessMessage:function(g){var b=true;if(!(this.bShareBusinessObjShared===true||this.bShareBusinessObjShared===undefined)){b=false;}var f=true;if(!(this.bFileUploaded===true||this.bFileUploaded===undefined)){b=false;}if(this.bShareError===false){if(b===true&&f===true){this.oCommonUtil.showMessage(this.oLangBundle.getText("SHARING_SUCCESS_MSG",[g]),{width:"20em",autoClose:false});clearInterval(this.IdisplaySuccessMessageIntervalId);}}else{clearInterval(this.IdisplaySuccessMessageIntervalId);}},displayErrorMessage:function(){if(!this.bShareError){var e=this.oLangBundle.getText("SHARING_FAILURE_MSG");this.oCommonUtil.displayError(e);}this.bShareError=true;},_checkAuthorizationAndDisplayErrorMessage:function(s){var b=this;if(s==401||s==403){b.oCommonUtil.displayError(b.oLangBundle.getText("SHARE_AUTHORIZATION_FAILURE_MSG"));}else{b.displayErrorMessage();}}});return a;});
