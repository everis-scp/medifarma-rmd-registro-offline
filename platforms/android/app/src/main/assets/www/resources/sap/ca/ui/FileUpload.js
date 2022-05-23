/*!
 * SAP UI development toolkit for HTML5 (SAPUI5) (c) Copyright 2009-2014 SAP SE. All rights reserved
 */
jQuery.sap.declare("sap.ca.ui.FileUpload");jQuery.sap.require("sap.ca.ui.library");jQuery.sap.require("sap.ui.core.Control");sap.ui.core.Control.extend("sap.ca.ui.FileUpload",{metadata:{deprecated:true,library:"sap.ca.ui",properties:{uploadUrl:{type:"string",group:"Misc",defaultValue:null},fileName:{type:"string",group:"Misc",defaultValue:null},size:{type:"string",group:"Misc",defaultValue:null},url:{type:"string",group:"Misc",defaultValue:null},uploadedDate:{type:"string",group:"Misc",defaultValue:null},contributor:{type:"string",group:"Misc",defaultValue:null},fileExtension:{type:"string",group:"Misc",defaultValue:null},mimeType:{type:"string",group:"Misc",defaultValue:null},items:{type:"string",group:"Misc",defaultValue:null},uploadEnabled:{type:"boolean",group:"Misc",defaultValue:null},fileId:{type:"string",group:"Misc",defaultValue:null},xsrfToken:{type:"string",group:"Misc",defaultValue:null},useMultipart:{type:"boolean",group:"Misc",defaultValue:false},acceptRequestHeader:{type:"string",group:"Misc",defaultValue:'application/json'},encodeUrl:{type:"string",group:"Misc",defaultValue:null},renameEnabled:{type:"boolean",group:"Misc",defaultValue:null},deleteEnabled:{type:"boolean",group:"Misc",defaultValue:null},multipleSelectionEnabled:{type:"boolean",group:"Misc",defaultValue:true},showNoData:{type:"boolean",group:"Misc",defaultValue:false},sequentialUploadsEnabled:{type:"boolean",group:"Misc",defaultValue:false},showAttachmentsLabel:{type:"boolean",group:"Misc",defaultValue:true},useEditControls:{type:"boolean",group:"Misc",defaultValue:false},showAttachmentsLabelInEditMode:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},editMode:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true}},aggregations:{_fileList:{type:"sap.m.List",multiple:false,visibility:"hidden"},uploadProgressLabel:{type:"sap.m.Label",multiple:false},attachmentNumberLabel:{type:"sap.m.Label",multiple:false,deprecated:true},toolBar:{type:"sap.m.Toolbar",multiple:false}},events:{deleteFile:{},renameFile:{},uploadFile:{},fileUploadFailed:{},beforeUploadFile:{},saveClicked:{deprecated:true},cancelClicked:{deprecated:true}}}});jQuery.sap.require("sap.ca.ui.utils.resourcebundle");jQuery.sap.require("sap.ca.ui.dialog.factory");jQuery.sap.require("sap.ca.ui.model.format.FileSizeFormat");jQuery.sap.require("sap.ca.ui.model.type.Date");
sap.ca.ui.FileUpload.prototype.init=function(){this._isDataBound=false;this._oCustomHeaderArray=[];this._oBundle=sap.ca.ui.utils.resourcebundle;this._sOverallUploadingText=this._oBundle.getText("FileUploader.uploadingOutOf",["{filesUploaded} "," {filesToUpload}"]);this._sDeleteFile=this._oBundle.getText("FileUploader.deleteFile");this._sContinue=this._oBundle.getText("FileUploader.continue");this._sDeleteQuestion=this._oBundle.getText("FileUploader.deleteQuestion");this._oAddButton=new sap.m.Button({icon:"sap-icon://add",type:sap.m.ButtonType.Transparent,press:jQuery.proxy(function(){jQuery.sap.domById(this.getId()+'-upload').click();},this),visible:this.getUploadEnabled()});this._setProgressLabel();this._oNumberOfAttachmentsLabel=new sap.m.Label(this.getId()+"-attachmentLabel",{design:sap.m.LabelDesign.Standard}).addStyleClass("sapCaUiFileUploadAttachmentLabel");this._oToolBar=new sap.m.Toolbar({content:[this._oAddButton,new sap.m.ToolbarSpacer(),this._oNumberOfAttachmentsLabel]}).addStyleClass('sapCaUiFUToolbar');this._oUploadedDateLabel=new sap.m.Label(this.getId()+"-uploadedDate",{visible:"{isUploaded}"});this._oUploadingProgressLabel=new sap.m.Label(this.getId()+"-uploadProgressLabel",{textAlign:sap.ui.core.TextAlign.End,text:this._sOverallUploadingText}).addStyleClass("sapCaUiFileUploadProgressLabel");this._oFileExtensionLabel=new sap.m.Text(this.getId()+"-extension",{text:"{parsedFileExtension}"}).addStyleClass('sapCaUiFUExtension');this._oFileNameLabel=new sap.m.Link(this.getId()+"-filename",{target:"_blank"}).addStyleClass('sapCaUiFileUploadFileLoadedText');this._oFileNameEditBox=new sap.m.Input(this.getId()+"-editFileName",{type:sap.m.Input.Text,placeholder:this._oBundle.getText("FileUploader.inputPlaceholder")}).addStyleClass('sapCaUiFileUploadEditBox');this._oFileNameEditBox.setLayoutData(new sap.m.FlexItemData({growFactor:1}));this._oFileNameEditBox.attachChange(this._nameChanged,this);this._oDateSizeHL=new sap.ui.layout.HorizontalLayout(this.getId()+"-ba-datesizelayout",{content:[this._oUploadedDateLabel,this._oProgressLabel],allowWrapping:true}).addStyleClass('sapCaUiFUInnerHL');this._oInputExtensionHL=new sap.m.HBox({items:[this._oFileNameEditBox,this._oFileExtensionLabel],visible:"{isEditMode}"}).addStyleClass("sapCaUiInnerEditHL");var i=new sap.ui.layout.VerticalLayout(this.getId()+"-ba-inner",{content:[this._oFileNameLabel,this._oInputExtensionHL,this._oDateSizeHL]}).addStyleClass('sapCaUiFUInner');this._oItemIcon=new sap.ui.core.Icon(this.getId()+"-icon",{visible:{parts:[{path:"isPendingFileRename"},{path:"isUploaded"}],formatter:jQuery.proxy(function(c,d){return((!c)&&d);},this)}}).addStyleClass("sapCaUiFileUploadItemIcon");var _=new sap.m.Button({id:this.getId()+"-cancelIcon",icon:"sap-icon://sys-cancel-2",type:sap.m.ButtonType.Transparent,press:jQuery.proxy(function(e){this._handleCancel(e.getSource());},this),visible:{parts:[{path:"/isDeleteEnabled"},{path:"isUploading"}],formatter:jQuery.proxy(function(c,d){return!c&&d;},this)}}).addStyleClass("sapCaUiFileUploadCancelIcon");var a=new sap.m.Button({id:this.getId()+"-saveIcon",icon:"sap-icon://save",type:sap.m.ButtonType.Transparent,press:jQuery.proxy(this._handleSave,this),visible:{parts:[{path:"/isRenameEnabled"},{path:"isUploading"},{path:"isEditMode"}],formatter:jQuery.proxy(function(c,d,e){return c&&(!d)&&e;},this)}}).addStyleClass("sapCaUiFileUploadEditIcon");var b=new sap.m.Button({id:this.getId()+"-editIcon",icon:"sap-icon://edit",type:sap.m.ButtonType.Transparent,press:jQuery.proxy(this._handleEdit,this),visible:{parts:[{path:"/isRenameEnabled"},{path:"isUploading"},{path:"isEditMode"}],formatter:jQuery.proxy(function(c,d,e){return c&&(!d)&&(!e);},this)}}).addStyleClass("sapCaUiFileUploadEditIcon");var h=new sap.ui.layout.HorizontalLayout(this.getId()+"-ba-hl",{content:[new sap.m.BusyIndicator({id:this.getId()+"-indicator",visible:{parts:[{path:"isPendingFileRename"},{path:"isUploading"}],formatter:jQuery.proxy(function(c,d){return(c||d);},this)}}).setSize('2.5rem').addStyleClass('sapCaUiFileUploadloadingIcon'),this._oItemIcon,i,_,b,a],allowWrapping:true}).addStyleClass("sapCaUiFUItemHL");this._oViewPageList=new sap.m.List({"delete":[this._handleDelete,this]});this._oViewPageList.addStyleClass("sapCaFileUploadListBorder");this._oTemplate=new sap.m.CustomListItem({content:[h]});this._oViewPageList.addEventDelegate({onAfterRendering:jQuery.proxy(this._onListAfterRendering,this)});this.setAggregation("_fileList",this._oViewPageList);this.setAggregation("uploadProgressLabel",this._oUploadingProgressLabel);this.setAggregation("toolBar",this._oToolBar);this._editBtnPressedPath=null;};
sap.ca.ui.FileUpload.prototype.onAfterRendering=function(){var u=this.getUploadUrl();this._oViewPageList.setShowNoData(this.getShowNoData());var i=this.getId();i=i.replace(/[#;&,.+*~':"!^$[\]()=>|\/]/g,"\\$&");i='#'+i+'-upload';if(this._isIE9OrBelow()&&!this.getUseMultipart()){if(this.getEncodeUrl()===""){jQuery.sap.log.warning("FileUpload: encodeUrl property is empty (required by IE9 to base64 encode the file before sending it)");}u=this.getEncodeUrl();}if(jQuery(i).fileupload){jQuery(i).fileupload({multipart:this.getUseMultipart(),url:u,sequentialUploads:this.getSequentialUploadsEnabled(),add:jQuery.proxy(function(e,d){this.onAdd(e,d);},this),send:jQuery.proxy(function(e,d){this.sending(e,d);},this),progress:jQuery.proxy(function(e,d){this.calculateProgress(e,d);},this),done:jQuery.proxy(function(e,d){this.uploadDone(e,d);},this),fail:jQuery.proxy(function(e,d){this.handleUploadFailure(e,d);},this),beforeSend:jQuery.proxy(function(x,d){var f=this._findFileIndexByInternalId(d.files[0].internalId);this.getModel().setProperty(this.getItems()+"/"+f+"/abortUplXhr",jQuery.proxy(x.abort,x));if(this._isIE()&&!this.getUseMultipart()&&!d.contentType){var m=this._getMimeTypeFromExtension(this._findFileExtension(d.files[0].name));d.contentType=m;x.setRequestHeader("Content-Type",d.contentType);}this.fireBeforeUploadFile(d.files[0]);this._setRequestHeaders(x);},this)});}jQuery.support.xhrFileUpload=!!(window.ProgressEvent&&window.FileReader);};
sap.ca.ui.FileUpload.prototype.exit=function(){this._oViewPageList.destroy();this._oViewPageList=null;this._oTemplate.destroy();this._oTemplate=null;this._oFileNameLabel.destroy();this._oFileNameLabel=null;this._oUploadedDateLabel.destroy();this._oUploadedDateLabel=null;this._oProgressLabel.destroy();this._oProgressLabel=null;if(this._oInputExtensionHL){this._oInputExtensionHL.destroy();this._oInputExtensionHL=null;}if(this._oDateSizeHL){this._oDateSizeHL.destroy();this._oDateSizeHL=null;}};
sap.ca.ui.FileUpload.prototype.preventEdits=function(l){var a=this.getItems();this.getModel().setProperty(a+"/isEditEnabled",!l);};
sap.ca.ui.FileUpload.prototype.removeFile=function(f){if((f instanceof Array)&&f.length>0){f=f[0];}var n=[];var I=this.getModel().getProperty(this.getItems());for(var i=0;i<I.length;i++){if(I[i][this.getFileId()]!==f){n.push(I[i]);}}n.isUploading=I.isUploading;n.filesToUpload=I.filesToUpload;n.filesUploaded=I.filesUploaded;n.isEditEnabled=I.isEditEnabled;this.getModel().setProperty(this.getItems(),n);this.commitPendingRenames(true);};
sap.ca.ui.FileUpload.prototype.setModel=function(m){this._isDataBound=true;if(this._oProgressLabel){this._oProgressLabel.destroy();}sap.ui.core.Control.prototype.setModel.call(this,m);this._setProgressLabel();jQuery.each(this.getModel().getProperty(this.getItems()),jQuery.proxy(function(i,v){var p=this.getItems()+"/"+i;this.getModel().setProperty(p+"/isUploaded",true);this.getModel().setProperty(p+"/isUploading",false);this.getModel().setProperty(p+"/isEditMode",false);this.getModel().setProperty(p+"/isPending",false);this.getModel().setProperty(p+"/isDeleteVisible",false);this.getModel().setProperty(p+"/isPendingFileRename",false);this.getModel().setProperty(p+"/isFileNameSwapped",false);this.getModel().setProperty(p+"/isHiddenFile",false);var P=this.getModel().getProperty(p+"/"+this.getFileName()).split(".");if(P.length===1){P="";}else if(P[0]===""&&P.length===2){this.getModel().setProperty(p+"/isHiddenFile",true);P="";}else{P="."+P.pop();}this.getModel().setProperty(p+"/parsedFileExtension",P);},this));this._setIsUploading(false);this.getModel().setProperty(this.getItems()+"/filesToUpload",0);this.getModel().setProperty(this.getItems()+"/filesUploaded",1);this.getModel().setProperty(this.getItems()+"/isEditEnabled",true);this.getModel().setProperty("/isRenameEnabled",this.getRenameEnabled());this.getModel().setProperty("/isDeleteEnabled",this.getDeleteEnabled());this._oNumberOfAttachmentsLabel.bindProperty("text",this.getProperty("items")+"/length",function(l){var L=sap.ca.ui.utils.resourcebundle.getText("FileUploader.attachments")+" ("+l+")";return L;});this._oNumberOfAttachmentsLabel.setVisible(this.getShowAttachmentsLabel());this._oUploadingProgressLabel.bindProperty("visible",this.getProperty("items")+'/isUploading');this._oUploadingProgressLabel.bindElement(this.getProperty("items"));this._oNumberOfAttachmentsLabel.bindElement(this.getProperty("items"));this._oViewPageList.bindItems(this.getProperty("items"),this._oTemplate,null,null);this._oViewPageList.bindProperty("mode",{path:"/isDeleteEnabled",formatter:function(b){return(b?sap.m.ListMode.Delete:sap.m.ListMode.None);}});this._oDateSizeHL.addContent(this._oProgressLabel);};
sap.ca.ui.FileUpload.prototype._setProgressLabel=function(){this._oProgressLabel=new sap.m.Label(this.getId()+"-progress",{text:{path:"uploadPercent",formatter:function(v){var b=this.getBindingContext().getPath();var p=b+"/uploadPercent";var a=this.getModel().getProperty(p);var V=sap.ca.ui.utils.resourcebundle.getText("FileUploader.uploading",[a]);return V;}},visible:{path:"isUploading",formatter:jQuery.proxy(function(v){if(this._isIE9OrBelow()){return false;}return v;},this)}});};
sap.ca.ui.FileUpload.prototype.setCustomHeader=function(h,v){if(this._oCustomHeaderArray===[]){this._oCusomHeaderArray.push({key:h,value:v});}else{var n=this._oCustomHeaderArray.length;for(var i=0;i<n;i++){if(this._oCustomHeaderArray[i].key===h){this._oCustomHeaderArray[i].value=v;return;}}this._oCustomHeaderArray.push({key:h,value:v});}};
sap.ca.ui.FileUpload.prototype.removeCustomHeader=function(h){var n=-1;for(var i=0;i<this._oCustomHeaderArray.length;i++){if(this._oCustomHeaderArray[i].key===h){n=i;}}if(n!==-1){this._oCustomHeaderArray.splice(n,1);}};
sap.ca.ui.FileUpload.prototype.commitFileUpload=function(d){var F=sap.ca.ui.model.format.FileSizeFormat.getInstance();var u=decodeURI(d[this.getFileName()]);d.size=F.format(d.size);var a=this.getModel().getProperty(this.getItems()+"/").length;for(var i=0;i<a;i++){var p=this.getItems()+"/"+i;if(this.getModel().getProperty(p+"/"+this.getFileName())===u&&this.getModel().getProperty(p+"/isUploading")){if(this.getFileId()!=undefined&&this.getFileId()!==""){this.getModel().setProperty(p+"/"+this.getFileId(),d[this.getFileId()]);}if(this.getFileExtension()!=undefined&&this.getFileExtension()!==""){this.getModel().setProperty(p+"/"+this.getFileExtension(),d[this.getFileExtension()]);}if(this.getMimeType()!=undefined&&this.getMimeType()!==""){this.getModel().setProperty(p+"/"+this.getMimeType(),d[this.getMimeType()]);}if(this.getContributor()!=undefined&&this.getContributor()!==""){this.getModel().setProperty(p+"/"+this.getContributor(),d[this.getContributor()]);}if(this.getUploadedDate()!=undefined&&this.getUploadedDate()!==""){this.getModel().setProperty(p+"/"+this.getUploadedDate(),d[this.getUploadedDate()]);}if(this.getFileName()!=undefined&&this.getFileName()!==""){this.getModel().setProperty(p+"/"+this.getFileName(),d[this.getFileName()]);}if(this.getUrl()!=undefined&&this.getUrl()!==""){this.getModel().setProperty(p+"/"+this.getUrl(),d[this.getUrl()]);}if(this.getSize()!=undefined&&this.getSize()!==""){this.getModel().setProperty(p+"/"+this.getSize(),d[this.getSize()]);}this.getModel().setProperty(p+"/isHiddenFile",false);var P=u.split(".");if(P.length===1){P="";}else if(P[0]===""&&P.length===2){P="";this.getModel().setProperty(p+"/isHiddenFile",true);}else{P="."+P.pop();}this.getModel().setProperty(p+"/parsedFileExtension",P);this.getModel().setProperty(p+"/isPending",false);this.getModel().setProperty(p+"/isUploading",false);this.getModel().setProperty(p+"/isUploaded",true);this.getModel().setProperty(p+"/abortUpl",undefined);this.getModel().setProperty(this.getItems()+"/filesUploaded",this.getModel().getProperty(this.getItems()+"/filesUploaded")+1);this._maintainUploadingProgress();}}};
sap.ca.ui.FileUpload.prototype.commitPendingRenames=function(){var l=this.getItems();var I=this.getModel().getProperty(l);for(var i=0;i<I.length;i++){if(I[i].newFilename!==undefined&&I[i][this.getFileName()]!==I[i].newFilename){var f=I[i]["isHiddenFile"];var n="";if(I[i].isPendingFileRename){if(f){n="."+I[i].newFilename;}else{n=I[i].newFilename+I[i]["parsedFileExtension"];}}else if(I[i].isFileNameSwapped){if(f){n="."+I[i][this.getFileName()];}else{n=I[i][this.getFileName()]+I[i]["parsedFileExtension"];}}this.getModel().setProperty(l+"/"+i+"/"+this.getFileName(),n);this.getModel().setProperty(l+"/"+i+"/newFilename",undefined);}I[i].isPendingFileRename=false;this.getModel().setProperty(l+"/"+i+"/isPendingFileRename",false);I[i].isFileNameSwapped=false;}};
sap.ca.ui.FileUpload.prototype.commitPendingRename=function(f){var l=this.getItems();var I=this.getModel().getProperty(l);for(var i=0;i<I.length;i++){if(I[i][this.getFileId()]==f&&I[i].newFilename!==undefined&&I[i][this.getFileName()]!==I[i].newFilename){var F=I[i]["isHiddenFile"];var n="";if(I[i].isPendingFileRename){if(F){n="."+I[i].newFilename;}else{n=I[i].newFilename+I[i]["parsedFileExtension"];}}else if(I[i].isFileNameSwapped){if(F){n="."+I[i][this.getFileName()];}else{n=I[i][this.getFileName()]+I[i]["parsedFileExtension"];}}this.getModel().setProperty(l+"/"+i+"/"+this.getFileName(),n);this.getModel().setProperty(l+"/"+i+"/newFilename",undefined);I[i].isPendingFileRename=false;this.getModel().setProperty(l+"/"+i+"/isPendingFileRename",false);I[i].isFileNameSwapped=false;return;}}};
sap.ca.ui.FileUpload.prototype.abandonPendingRenames=function(){var l=this.getItems();var I=this.getModel().getProperty(l);for(var i=0;i<I.length;i++){if(I[i].isFileNameSwapped){I[i][this.getFileName()]=I[i].newFilename;}I[i].isPendingFileRename=false;this.getModel().setProperty(l+"/"+i+"/isPendingFileRename",false);I[i].isFileNameSwapped=false;}};
sap.ca.ui.FileUpload.prototype.abandonPendingRename=function(f){var l=this.getItems();var I=this.getModel().getProperty(l);for(var i=0;i<I.length;i++){if(I[i][this.getFileId()]==f){if(I[i].isFileNameSwapped){I[i][this.getFileName()]=I[i].newFilename;}I[i].isPendingFileRename=false;this.getModel().setProperty(l+"/"+i+"/isPendingFileRename",false);I[i].isFileNameSwapped=false;return;}}};
sap.ca.ui.FileUpload.prototype.abortUpload=function(f){var i=this.getModel().getProperty(this.getItems());var I=[];var a=i.filesToUpload;if(f){jQuery.each(i,jQuery.proxy(function(b,v){if(v&&v.isUploading&&f.internalId===v[this.getFileId()]){v.abortUplXhr&&v.abortUplXhr();v.abortUpl&&v.abortUpl();a--;}else if(v&&(v.isUploaded||v.isUploading)){I.push(v);}},this));}else{jQuery.each(i,jQuery.proxy(function(b,v){if(v&&v.isUploading){v.abortUplXhr&&v.abortUplXhr();v.abortUpl&&v.abortUpl();a--;}else if(v&&v.isUploaded){I.push(v);}},this));}this.getModel().setProperty(this.getItems(),I);this.getModel().setProperty(this.getItems()+"/filesToUpload",a);this.getModel().setProperty(this.getItems()+"/filesUploaded",i.filesUploaded);this.getModel().setProperty(this.getItems()+"/isEditEnabled",i.isEditEnabled);this._setIsUploading(i.isUploading);this._maintainUploadingProgress();};
sap.ca.ui.FileUpload.prototype.isUploading=function(){return this.getModel().getProperty(this.getItems()+"/isUploading");};
sap.ca.ui.FileUpload.prototype._setUploadedDateBinding=function(d,c){if(d==null){d=this.getUploadedDate();}if(c==null){c=this.getContributor();}if(d==null||c==null){return;}var f=function(D,C){if(D==null||C==null){return"";}var o=sap.ca.ui.model.format.DateFormat.getDateInstance({style:'medium'});var s=o.format(D);if(this._isPhone()){return this._oBundle.getText("FileUploader.attached_phone",[s,C]);}else{return this._oBundle.getText("FileUploader.attached",[s,C]);}};this._oUploadedDateLabel.bindProperty("text",{parts:[{path:d},{path:c}],formatter:jQuery.proxy(f,this)});};
sap.ca.ui.FileUpload.prototype.setItems=function(v){var o=this.getItems();if(o!==v){this._oFileNameLabel.bindProperty("visible",{parts:[{path:"isEditMode"},{path:"isUploading"}],formatter:function(e,u){return!e||u;}});this._oInputExtensionHL.bindProperty("visible",{parts:[{path:"isEditMode"},{path:"isUploading"}],formatter:function(e,u){return e&&!u;}});this._oDateSizeHL.bindProperty("visible",{parts:[{path:"isEditMode"},{path:"isUploading"}],formatter:function(e,u){return!(e&&!u);}});this._oFileNameEditBox.bindProperty("enabled",{parts:[{path:"isEditMode"},{path:"/isRenameEnabled"}],formatter:function(e,r){return e&&r;}});this.setProperty("items",v);}};
sap.ca.ui.FileUpload.prototype.setShowAttachmentsLabelInEditMode=function(v){this.setShowAttachmentsLabel(v);jQuery.sap.log.warning("ShowAttachmentsLabelInEditMode is deprecated.");};
sap.ca.ui.FileUpload.prototype.setShowAttachmentsLabel=function(v){this.setProperty("showAttachmentsLabel",v);this._oNumberOfAttachmentsLabel.setVisible(v);};
sap.ca.ui.FileUpload.prototype.setFileName=function(v){var o=this.getFileName();if(o!==v){this._oFileNameLabel.bindProperty("text",v);this._oFileNameEditBox.bindValue(v,function(V){var O=(V&&V.substr(0,V.lastIndexOf('.')))||V;return O;},sap.ui.model.BindingMode.OneWay);this.setProperty("fileName",v);}};
sap.ca.ui.FileUpload.prototype.setEditMode=function(v){jQuery.sap.log.warning("EditMode property is deprecated");};
sap.ca.ui.FileUpload.prototype.setUseEditControls=function(v){this.setProperty("useEditControls",v);this.setRenameEnabled(v);this.setDeleteEnabled(v);};
sap.ca.ui.FileUpload.prototype.setContributor=function(v){var o=this.getContributor();if(o!==v){this._setUploadedDateBinding(null,v);this.setProperty("contributor",v);}};
sap.ca.ui.FileUpload.prototype.setUploadedDate=function(v){var o=this.getUploadedDate();if(o!==v){this._setUploadedDateBinding(v,null);this.setProperty("uploadedDate",v);}};
sap.ca.ui.FileUpload.prototype.setSize=function(v){var s=this.getSize();if(s!==v){this.setProperty("size",v);}};
sap.ca.ui.FileUpload.prototype.setUrl=function(v){var o=this.getUrl();if(o!==v){this._oFileNameLabel.bindProperty("href",{path:v,formatter:this._removeStartingSlash});this.setProperty("url",v);}};
sap.ca.ui.FileUpload.prototype.setUploadEnabled=function(v){this._oAddButton.setVisible(v);this.setProperty("uploadEnabled",v);};
sap.ca.ui.FileUpload.prototype.setDeleteEnabled=function(v){var e=this.getUseEditControls()?v:false;if(this.getModel()){this.getModel().setProperty("/isDeleteEnabled",e);}this.setProperty("deleteEnabled",e);};
sap.ca.ui.FileUpload.prototype.setRenameEnabled=function(v){var e=this.getUseEditControls()?v:false;if(this.getModel()){this.getModel().setProperty("/isRenameEnabled",e);}this.setProperty("renameEnabled",e);};
sap.ca.ui.FileUpload.prototype.setMimeType=function(v){var o=this.getMimeType();if(o!==v){this._oItemIcon.bindProperty("src",{path:v,formatter:this._getIconFromMimeType});this.setProperty("mimeType",v);}};
sap.ca.ui.FileUpload.prototype.setFileExtension=function(v){var o=this.getFileExtension();if(o!==v&&!this.getProperty("mimeType")){this._oItemIcon.bindProperty("src",{path:v,formatter:this._getIconFromExtension});this.setProperty("fileExtension",v);}};
sap.ca.ui.FileUpload.prototype.getAttachmentNumberLabel=function(){jQuery.sap.log.warning("FileUpload getAttachmentNumberLabel is deprecated !");return this._oNumberOfAttachmentsLabel;};
sap.ca.ui.FileUpload.prototype._findFileExtension=function(f){var e=(/[.]/.exec(f))?/[^.]+$/.exec(f):undefined;if(jQuery.isArray(e))return e[0];else return'';};
sap.ca.ui.FileUpload.prototype._getMimeTypeFromExtension=function(e){switch(e){case'pptx':return'application/vnd.openxmlformats-officedocument.presentationml.presentation';case'ppt':return'application/vnd.ms-powerpoint';case'potx':return'application/vnd.openxmlformats-officedocument.presentationml.template';case'doc':return'application/msword';case'docx':return'application/vnd.openxmlformats-officedocument.wordprocessingml.document';case'dotx':return'application/vnd.openxmlformats-officedocument.wordprocessingml.template';case'csv':return'text/csv';case'xls':return'application/vnd.ms-excel';case'xlsx':return'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';case'xltx':return'application/vnd.openxmlformats-officedocument.spreadsheetml.template';case'pdf':return'application/pdf';case'xhtml':return'application/xhtml+xml';case'zip':return'application/zip';case'gzip':return'application/gzip';case'avi':return'video/avi';case'mpeg':return'video/mpeg';case'mp4':return'video/mp4';case'html':return'text/html';case'txt':return'text/plain';case'xml':return'text/xml';case'gif':return'image/gif';case'jpg':return'image/jpeg';case'jpeg':return'image/jpeg';case'pjpeg':return'image/pjpeg';case'png':return'image/png';case'bmp':return'image/bmp';case'tif':return'image/tiff';case'tiff':return'image/tiff';case'mp3':return'audio/mpeg3';case'wmv':return'audio/x-ms-wmv';default:return'application/octet-stream';}};
sap.ca.ui.FileUpload.prototype._getIconFromExtension=function(v){if(v==="pdf"){return"sap-icon://pdf-attachment";}else if(v==="jpg"||v==="png"||v==="bmp"){return"sap-icon://attachment-photo";}else if(v==="txt"){return"sap-icon://document-text";}else if(v==="doc"||v==="docx"||v==="odt"){return"sap-icon://doc-attachment";}else if(v==="xls"||v==="csv"){return"sap-icon://excel-attachment";}else if(v==="ppt"||v==="pptx"){return"sap-icon://ppt-attachment";}else{return"sap-icon://document";}};
sap.ca.ui.FileUpload.prototype._getIconFromMimeType=function(v){var i="";if(!v){return"sap-icon://document";}if(v.indexOf('image')===0){i="sap-icon://attachment-photo";}else if(v.indexOf('video')===0){i="sap-icon://attachment-video";}else if(v.indexOf('text')===0){i="sap-icon://attachment-text-file";}else if(v.indexOf('audio')===0){i="sap-icon://attachment-audio";}else if(v.indexOf('application')===0){switch(v){case'application/vnd.openxmlformats-officedocument.presentationml.presentation':case'application/vnd.ms-powerpoint':case'application/vnd.openxmlformats-officedocument.presentationml.template':i="sap-icon://ppt-attachment";break;case'application/msword':case'application/vnd.openxmlformats-officedocument.wordprocessingml.document':case'application/vnd.openxmlformats-officedocument.wordprocessingml.template':i="sap-icon://doc-attachment";break;case'application/vnd.ms-excel':case'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':case'application/vnd.openxmlformats-officedocument.spreadsheetml.template':i="sap-icon://excel-attachment";break;case'application/pdf':i="sap-icon://pdf-attachment";break;case'application/xhtml+xml':i="sap-icon://attachment-html";break;case'application/zip':case'application/gzip':i="sap-icon://attachment-zip-file";break;default:i="sap-icon://document";}}else{i="sap-icon://document";}return i;};
sap.ca.ui.FileUpload.prototype._removeStartingSlash=function(v){if(v&&v.charAt(0)==='/'){return v.substr(1);}return v;};
sap.ca.ui.FileUpload.prototype._maintainUploadingProgress=function(){if(this.getModel().getProperty(this.getItems()+"/filesUploaded")>this.getModel().getProperty(this.getItems()+"/filesToUpload")){this._setIsUploading(false);this.getModel().setProperty(this.getItems()+"/filesToUpload",0);this.getModel().setProperty(this.getItems()+"/filesUploaded",1);}};
sap.ca.ui.FileUpload.prototype._cancelPendingUpload=function(f){var i=this.getModel().getProperty(this.getItems());var F=this.getModel().getProperty(this.getItems()+"/filesToUpload")-1;var I=[];jQuery.each(i,jQuery.proxy(function(a,v){if(v&&(v[this.getFileId()]!==f)){I.push(v);}},this));this.getModel().setProperty(this.getItems(),I);this.getModel().setProperty(this.getItems()+"/filesToUpload",F);this.getModel().setProperty(this.getItems()+"/filesUploaded",i.filesUploaded);this._setIsUploading(F>0);this.getModel().setProperty(this.getItems()+"/isEditEnabled",i.isEditEnabled);this._maintainUploadingProgress();};
sap.ca.ui.FileUpload.prototype._isPhone=function(){return jQuery.device.is.phone;};
sap.ca.ui.FileUpload.prototype._isIE9OrBelow=function(){return(sap.ui.Device.browser.name===sap.ui.Device.browser.BROWSER.INTERNET_EXPLORER)&&(sap.ui.Device.browser.version<10);};
sap.ca.ui.FileUpload.prototype._isIE=function(){return(sap.ui.Device.browser.name===sap.ui.Device.browser.BROWSER.INTERNET_EXPLORER);};
sap.ca.ui.FileUpload.prototype._setRequestHeaders=function(x){if(this.getAcceptRequestHeader()){x.setRequestHeader("Accept",this.getAcceptRequestHeader());}if(this.getXsrfToken()){x.setRequestHeader('x-csrf-token',this.getXsrfToken());}for(var i=0;i<this._oCustomHeaderArray.length;i++){x.setRequestHeader(this._oCustomHeaderArray[i].key,this._oCustomHeaderArray[i].value);}};
sap.ca.ui.FileUpload.prototype._onListAfterRendering=function(){jQuery("span[id*='-editIcon-']").mousedown(jQuery.proxy(function(q){var i=jQuery(q.currentTarget).attr("id");if(i){var I=sap.ui.getCore().byId(i);if(I){this._editBtnPressedPath=I.oPropagatedProperties.oBindingContexts[undefined].sPath;}}},this));};
sap.ca.ui.FileUpload.prototype._handleCancel=function(l){var p=l.getBindingContext().getPath();var a=l.getModel().getProperty(p+"/abortUplXhr");var A=l.getModel().getProperty(p+"/abortUpl");a&&a();A&&A();var t=p.split('/');var n=t[t.length-1];var i=l.getModel().getProperty(this.getItems());i.splice(n,1);l.getModel().setProperty(this.getItems(),i);l.getModel().setProperty(this.getItems()+"/filesToUpload",l.getModel().getProperty(this.getItems()+"/filesToUpload")-1);this._maintainUploadingProgress();};
sap.ca.ui.FileUpload.prototype._handleDelete=function(e){var l=e.getParameter("listItem");var f=l.getBindingContext().getProperty();var p=l.getBindingContext().getPath();var i=l.getModel().getProperty(p+"/isUploading");if(!i){sap.ca.ui.dialog.confirmation.open({question:this._sDeleteQuestion,showNote:false,title:this._sDeleteFile,confirmButtonLabel:this._sContinue},jQuery.proxy(function(d){if(d.isConfirmed){this.fireDeleteFile(f);}},this));}else{this._handleCancel(l);}};
sap.ca.ui.FileUpload.prototype._handleEdit=function(e){var p=e.getSource().oPropagatedProperties.oBindingContexts[undefined].getPath();var i=this.getModel().getProperty(p+"/isEditMode");if(!i){this.getModel().setProperty(p+"/isEditMode",true);var l=e.getSource().getParent();if(l&&l.getContent()&&(l.getContent().length>=3)){var I=l.getContent()[2];if(I&&I.getContent()&&(I.getContent().length>=2)){var o=I.getContent()[1];if(o&&o.getItems()&&(o.getItems().length>=1)){var a=o.getItems()[0];if(a){jQuery.sap.delayedCall(300,this,this._focusEdit,[l,a]);}}}}}};
sap.ca.ui.FileUpload.prototype._handleSave=function(e){this._nameChanged(e);};
sap.ca.ui.FileUpload.prototype._focusEdit=function(l,i){if(!jQuery.os.iOS){var $=i.$();i.focus();$.one("focusout blur",jQuery.proxy(function(){this._revertToReadState(l.getBindingContext().getPath(),i);},this));}};
sap.ca.ui.FileUpload.prototype._nameChanged=function(e){var f=e.getSource().getBindingContext().getProperty();f.newFilename=e.getSource().getValue();var p=e.getSource().getBindingContext().getPath();this.getModel().setProperty(p+"/newFilename",f.newFilename);this.getModel().setProperty(p+"/isPendingFileRename",true);this.fireRenameFile(f);this._revertToReadState(p,null);this.fireSaveClicked();};
sap.ca.ui.FileUpload.prototype._revertToReadState=function(p,i){var I=this.getModel().getProperty(p+"/isEditMode");if(I){if(i!=null){var e=this.getModel().getProperty(p+"/parsedFileExtension");var n=i.getValue()+e;var f=this.getModel().getProperty(p+"/"+this.getFileName());if(n==f){this.fireCancelClicked();}else{this._nameChanged(new sap.ui.base.Event("",i));}}this.getModel().setProperty(p+"/isEditMode",false);}};
sap.ca.ui.FileUpload.prototype._findFileIndexByInternalId=function(a){var I=this.getModel().getProperty(this.getItems());for(var i=0;i<I.length;i++){if(I[i][this.getFileId()]===a)return i;}return-1;};
sap.ca.ui.FileUpload.prototype.sending=function(e,d){for(var j=0;j<d.files.length;j++){var D=d.files[j];var s=D.internalId;var n=this.getModel().getProperty(this.getItems()).length;for(var i=0;i<n;i++){var p=this.getItems()+"/"+i;if(this.getModel().getProperty(p)[this.getFileId()]===s&&this.getModel().getProperty(p).isPending){this.getModel().setProperty(p+"/isUploading",true);this.getModel().setProperty(p+"/isPending",false);this.getModel().setProperty(p+"/isUploaded",false);}}}};
sap.ca.ui.FileUpload.prototype._setIsUploading=function(i){this.getModel().setProperty(this.getItems()+"/isUploading",i);this.toggleStyleClass("sapCaUiFUIsUploading",i);};
sap.ca.ui.FileUpload.prototype.onAdd=function(e,d){var F=sap.ca.ui.model.format.FileSizeFormat.getInstance();for(var j=0;j<d.files.length;j++){var f=d.files[0];var a=Math.random().toString();d.files[0].internalId=a;var I=this.getModel().getProperty(this.getItems());var n={};n[this.getFileId()]=a;n[this.getFileName()]=f.name;n[this.getSize()]=F.format(f.size);n["isPending"]=false;n["isUploading"]=true;n["isUploaded"]=false;n["uploadPercent"]=0;n["isDeleteVisible"]=false;n["isPendingFileRename"]=false;n["isFileNameSwapped"]=false;n["isEditMode"]=false;I.unshift(n);this.getModel().setProperty(this.getItems(),I);this.getModel().setProperty(this.getItems()+"/0/abortUpl",jQuery.proxy(d.abort,d));this.getModel().setProperty(this.getItems()+"/filesToUpload",this.getModel().getProperty(this.getItems()+"/filesToUpload")+1);this.getModel().setProperty(this.getItems()+"/isUploading",true);var _=d.submit();}var b=this.getModel().getProperty(this.getItems()+"/").length;for(var i=0;i<b;i++){var p=this.getItems()+"/"+i;if(this.getModel().getProperty(p+"/isPendingFileRename")){var t=this.getModel().getProperty(p+"/"+this.getFileName());var N=this.getModel().getProperty(p+"/newFilename");this.getModel().setProperty(p+"/"+this.getFileName(),N);this.getModel().setProperty(p+"/newFilename",t);this.getModel().setProperty(p+"/isFileNameSwapped",true);this.getModel().setProperty(p+"/isPendingFileRename",false);}}};
sap.ca.ui.FileUpload.prototype.calculateProgress=function(e,d){var a=this.getModel().getProperty(this.getItems()).length;for(var i=0;i<a;i++){var p=parseInt(d.loaded/d.total*100,10);var b=this.getItems()+"/"+i;var c=this.getModel().getProperty(b);if(c.isUploading&&c[this.getFileId()]===d.files[0].internalId){this.getModel().setProperty(b+"/uploadPercent",p);this.getModel().setProperty(b+"/isUploaded",false);}}};
sap.ca.ui.FileUpload.prototype.handleUploadFailure=function(e,d){if(d.textStatus!=="abort"&&d.textStatus!=="canceled"){this._cancelPendingUpload(d.files[0].internalId);this.fireFileUploadFailed({exception:new Error(this._oBundle.getText("FileUploader.error.fileUploadFail")),response:d});}};
sap.ca.ui.FileUpload.prototype.uploadDone=function(e,d){try{var f=this._findFileIndexByInternalId(d.files[0].internalId);if(f===-1)return;if(this._isIE9OrBelow()){var E;if(this.getUseMultipart()){E=jQuery('pre',d.result).text();var j=jQuery.parseJSON(E);this.fireUploadFile(j);}else{if(null!==d&&null!==d.result){var F=d.files[0].name;var s=d.files[0];E=jQuery('pre',d.result).text();var J;try{J=jQuery.parseJSON(E);}catch(e){}if(J&&J.error&&J.error.code&&J.error.code==='413'){throw new Error(this._oBundle.getText("FileUploader.error.fileUploadFail"));}var m;try{m=E.match(/^data\:(.*);base64,/)[1];}catch(e){throw new Error(this._oBundle.getText("FileUploader.error.fileUploadFail"));}E=E.replace(/^data\:(.*);base64,/,'');if(null!==E){var x=jQuery.ajax({contentType:m,data:E,type:"POST",url:this.getUploadUrl(),success:jQuery.proxy(function(d,b){var D=d.d?d.d:d;this.fireUploadFile(D);},this),error:function(X,t,b){if(t!=='abort')throw new Error(this._oBundle.getText("FileUploader.error.fileUploadFail")+" "+b);},beforeSend:jQuery.proxy(function(b,d){this.getModel().setProperty(this.getItems()+"/"+f+"/abortUplXhr",jQuery.proxy(b.abort,b));this.fireBeforeUploadFile(s);this._setRequestHeaders(b);b.setRequestHeader("Content-Transfer-Encoding",'Base64');b.setRequestHeader("Content-Disposition",'attachment; filename="'+F+'"');},this)});}else if(null!==d.result[0]&&null!==d.result[0].title){throw new Error(this._oBundle.getText("FileUploader.error.base64Error")+": "+d.result[0].title);}else{throw new Error(this._oBundle.getText("FileUploader.error.base64Error"));}}}}else if(d&&d.result){this.fireUploadFile(d.result);}else{throw new Error(this._oBundle.getText("FileUploader.error.invalidResponse"));}}catch(a){this._cancelPendingUpload(d.files[0].internalId);this.fireFileUploadFailed({exception:a,response:d});}};
sap.ca.ui.FileUpload.prototype.ontouchstart=function(e){if(jQuery.os.ios&&e.target.id===this.getId()+"-upload"){this._oAddButton._activeButton();}};
sap.ca.ui.FileUpload.prototype.ontouchend=function(e){if(jQuery.os.ios){this._oAddButton._inactiveButton();}};
sap.ca.ui.FileUpload.prototype.ontouchcancel=function(e){if(jQuery.os.ios){this._oAddButton._inactiveButton();}};
sap.ca.ui.FileUpload.prototype.ontap=function(e){if(jQuery.os.ios&&e.target.id===this.getId()+"-upload"){this._oAddButton.fireTap();}};