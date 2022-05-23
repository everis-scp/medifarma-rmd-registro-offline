/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/comp/library','sap/ui/core/Element','sap/ui/layout/form/SimpleForm','sap/m/Title','sap/m/Label','sap/m/Text','sap/m/Image','sap/m/Link','sap/ui/base/ManagedObjectObserver','sap/ui/comp/odata/MetadataAnalyser','sap/base/Log',"sap/ui/layout/library","sap/ui/core/library","sap/base/util/merge"],function(C,E,S,T,L,c,I,d,M,e,f,l,g,m){"use strict";var h=g.TitleLevel;var i=l.form.SimpleFormLayout;var j=E.extend("sap.ui.comp.navpopover.ContactDetailsController",{metadata:{library:"sap.ui.comp"}});j.prototype.init=function(){this._oObserver=null;};j.prototype.exit=function(){if(this._oObserver){this._oObserver.disconnect();this._oObserver=null;}};j.prototype.getBindingPath4ContactAnnotation=function(b,s,k){if(s===undefined||s===null||!b){return Promise.resolve(null);}if(!this.getModel()){return Promise.resolve(null);}if(!this.getModel().getMetaModel()){return Promise.resolve(null);}var o=this.getModel().getMetaModel();return o.loaded().then(function(){var p;try{o.getMetaContext(b);}catch(a){f.error("sap.ui.comp.navpopover.ContactDetailsController.getBindingPath4ContactAnnotation: binding path '"+b+"' is not valid. Error has been caught: "+a);return null;}try{p="/"+s+"('"+k+"')";o.getMetaContext(p);return p;}catch(a){}try{p=s?b+"/"+s:b;o.getMetaContext(p);return p;}catch(a){f.error("sap.ui.comp.navpopover.ContactDetailsController.getBindingPath4ContactAnnotation: the path of sContactAnnotationPath '"+b+"/"+s+"' is not valid. Error has been caught: "+a);return null;}});};j.prototype.getContactDetailsAnnotation=function(b){if(!b){return null;}var o=new e(this.getModel());var a=o.getContactAnnotation(b);if(!a){return null;}return a;};j.prototype.getContactDetailsContainers=function(b){var o=this.getContactDetailsAnnotation(b);if(!o){return[];}var a=[];var k=[];var s=[];var n;this._oObserver=new M(function(p){if(p.type==="property"&&p.name==="visible"){var v=false;for(var q=1;q<n.getContent().length;q++){if(n.getContent()[q].getLabelFor&&n.getContent()[q].getLabelFor()){continue;}if(n.getContent()[q].getVisible()){v=true;}}n.setVisible(v);}});var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");this.addProperty2ExpandAndSelect("photo",o,b,k,s);this._addPhoto("photo",o,b,a,this._oObserver);this.addProperty2ExpandAndSelect("fn",o,b,k,s);this._addLabeledText("fn",r.getText("POPOVER_CONTACT_SECTION_NAME"),o,b,a,this._oObserver);this.addProperty2ExpandAndSelect("role",o,b,k,s);this._addLabeledText("role",r.getText("POPOVER_CONTACT_SECTION_ROLE"),o,b,a,this._oObserver);this.addProperty2ExpandAndSelect("title",o,b,k,s);this._addLabeledText("title",r.getText("POPOVER_CONTACT_SECTION_JOBTITLE"),o,b,a,this._oObserver);this.addProperty2ExpandAndSelect("org",o,b,k,s);this._addLabeledText("org",r.getText("POPOVER_CONTACT_SECTION_DEPARTMENT"),o,b,a,this._oObserver);this._addEmails(o,b,k,s,a,this._oObserver);this._addTels(o,b,k,s,a,this._oObserver);this._addAddresses(o,b,k,s,a,this._oObserver);if(!a.length){return[];}a.splice(0,0,new T({text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp").getText("POPOVER_CONTACT_SECTION_TITLE"),level:h.H2}));n=new S({maxContainerCols:1,editable:false,layout:i.ResponsiveGridLayout,content:a});this._requestData(n,b,k,s);return[n];};j.prototype._addPhoto=function(a,o,b,k,O){if(!o[a]){return;}var B=b+"/"+o[a].Path;if(this.isPropertyHidden(B)){return;}var n=new I({src:{path:B},visible:{path:B,formatter:function(v){return!!v;}},decorative:false});n.addStyleClass("sapUiIcon");n.addStyleClass("navigationPopoverThumbnail");O.observe(n,{properties:["visible"]});k.push(n);};j.prototype._addLabeledText=function(a,s,o,b,k,O){if(!o[a]){return;}var B=b+"/"+o[a].Path;if(this.isPropertyHidden(B)){return;}var n=new c({text:{path:B},visible:{path:B,formatter:function(v){return!!v;}}});var p=new L({text:s,labelFor:n.getId()});O.observe(n,{properties:["visible"]});k.push(p);k.push(n);};j.prototype._addEmails=function(o,B,k,s,n,O){if(!o.email||!o.email.length){return;}var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");var p=m([],o.email);p.filter(function(a){return!a.processed&&a.type&&(a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")>-1||a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/work")>-1);}).sort(function(a,b){if(a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")>-1&&b.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")<0){return-1;}if(b.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")>-1&&a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")<0){return 1;}return 0;}).forEach(function(a){this.addProperty2ExpandAndSelect("address",a,B,k,s);this._addLabeledEmail("address",r.getText("POPOVER_CONTACT_SECTION_EMAIL"),a,B,n,O);a.processed=true;},this);};j.prototype._addTels=function(o,B,k,s,n,O){if(!o.tel||!o.tel.length){return;}var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");var t=m([],o.tel);t.filter(function(a){return!a.processed&&a.type&&a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/work")>-1;}).sort(function(a,b){if(a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/preferred")>-1){return-1;}if(b.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/preferred")>-1){return 1;}return 0;}).forEach(function(a){this.addProperty2ExpandAndSelect("uri",a,B,k,s);this._addLabeledTel("uri",r.getText("POPOVER_CONTACT_SECTION_PHONE"),a,B,n,O);a.processed=true;},this);t.filter(function(a){return!a.processed&&a.type&&a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/cell")>-1;}).sort(function(a,b){if(a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/preferred")>-1){return-1;}if(b.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/preferred")>-1){return 1;}return 0;}).forEach(function(a){this.addProperty2ExpandAndSelect("uri",a,B,k,s);this._addLabeledTel("uri",r.getText("POPOVER_CONTACT_SECTION_MOBILE"),a,B,n,O);a.processed=true;},this);t.filter(function(a){return!a.processed&&a.type&&a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/fax")>-1;}).sort(function(a,b){if(a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/preferred")>-1){return-1;}if(b.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/preferred")>-1){return 1;}return 0;}).forEach(function(a){this.addProperty2ExpandAndSelect("uri",a,B,k,s);this._addLabeledTel("uri",r.getText("POPOVER_CONTACT_SECTION_FAX"),a,B,n,O);a.processed=true;},this);t.filter(function(a){return!a.processed&&a.type&&a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.PhoneType/preferred")>-1;}).forEach(function(a){this.addProperty2ExpandAndSelect("uri",a,B,k,s);this._addLabeledTel("uri",r.getText("POPOVER_CONTACT_SECTION_PHONE"),a,B,n,O);a.processed=true;},this);};j.prototype._addAddresses=function(o,B,k,s,n,O){if(!o.adr||!o.adr.length){return;}var r=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");var A=m([],o.adr);A.filter(function(a){return!a.processed&&a.type&&(a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")>-1||a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/work")>-1);}).sort(function(a,b){if(a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")>-1&&b.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")<0){return-1;}if(b.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")>-1&&a.type.EnumMember.indexOf("com.sap.vocabularies.Communication.v1.ContactInformationType/preferred")<0){return 1;}return 0;}).forEach(function(a){this._addLabeledAddress(r.getText("POPOVER_CONTACT_SECTION_ADR"),a,B,k,s,n,O);a.processed=true;},this);};j.prototype._addLabeledAddress=function(s,a,b,k,n,o,O){var p=[];["street","code","locality","region","country"].forEach(function(A){this.addProperty2ExpandAndSelect(A,a,b,k,n);var B;if(a[A]){B=b+"/"+a[A].Path;}p.push(B&&!this.isPropertyHidden(B)?{path:B}:{path:"$notExisting"});},this);if(!p.length){return;}var q=new c({text:{parts:p,formatter:function(t,u,v,R,w){var V=[];if(t){V.push(t);}if(u&&v){V.push(u+" "+v);}else{if(u){V.push(u);}if(v){V.push(v);}}if(R){V.push(R);}if(w){V.push(w);}return V.join(', ');}},visible:{parts:p,formatter:function(t,u,v,R,w){return!!(t||u||v||R||w);}}});var r=new L({text:s,labelFor:q.getId()});O.observe(q,{properties:["visible"]});o.push(r);o.push(q);};j.prototype._addLabeledTel=function(a,s,t,b,k,o){if(!t[a]||!b){return;}var B=b+"/"+t[a].Path;if(this.isPropertyHidden(B)){return;}var n=new d({href:{path:B,formatter:function(v){return v?"tel:"+v:v;}},text:{path:B},visible:{path:B,formatter:function(v){return!!v;}}});var p=new L({text:s,labelFor:n.getId()});o.observe(n,{properties:["visible"]});k.push(p);k.push(n);};j.prototype._addLabeledEmail=function(a,s,o,b,k,O){if(!o[a]||!b){return;}var B=b+"/"+o[a].Path;if(this.isPropertyHidden(B)){return;}var n=new d({href:{path:B,formatter:function(v){return v?"mailto:"+v:v;}},text:{path:B},visible:{path:B,formatter:function(v){return!!v;}}});var p=new L({text:s,labelFor:n.getId()});O.observe(n,{properties:["visible"]});k.push(p);k.push(n);};j.prototype.addProperty2ExpandAndSelect=function(a,A,b,k,s){if(!A[a]||!b){return;}var B=b+"/"+A[a].Path;if(!B){return;}if(B.indexOf("/")!==0){throw("sap.ui.comp.navpopover.ContactDetailsController.addProperty2ExpandAndSelect: the path of sBindingPathOfProperty '"+B+"' is not valid.");}var p=B.split("/");p.shift();p.shift();var n=p.join("/");if(n){s.push(n);}p.pop();var o=p.join("/");if(!o){return;}var q=k.filter(function(P){return P===o;});if(!q.length){k.push(o);}};j.prototype.isPropertyHidden=function(p){var o;if(!this.getModel()){f.error("sap.ui.comp.navpopover.ContactDetailsController.isPropertyHidden: the model does not exist");return false;}if(!this.getModel().getMetaModel()){f.error("sap.ui.comp.navpopover.ContactDetailsController.isPropertyHidden: the model should be the ODataModel");return false;}try{o=this.getModel().getMetaModel().getMetaContext(p);}catch(a){f.error("sap.ui.comp.navpopover.ContactDetailsController.isPropertyHidden: the path of property path '"+p+"' is not valid. Error has been caught: "+a);return false;}var P=o.getProperty(o.getPath());return e.isHidden(P);};j.prototype._requestData=function(s,b,a,k){var p={};if(a.length){p.expand=a.join(",");}if(k.length){p.select=k.join(",");}var B="/"+b.split("/")[1];s.bindContext({path:B,parameters:p,events:{change:function(){s.invalidate();}}});};return j;},true);
