/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Fragment","sap/ui/rta/Utils","sap/ui/model/json/JSONModel"],function(F,U,J){"use strict";var d;var c;var t=new J({sourceLanguage:"",downloadChangedTexts:false});function r(){t.setProperty("/sourceLanguage","");t.setProperty("/downloadChangedTexts",false);return Promise.resolve(d);}function a(){return F.load({name:"sap.ui.rta.toolbar.translation.DownloadTranslationDialog",id:c.getId()+"_download_translation_fragment",controller:{onDownloadFile:function(){d.close();},onCancelDownloadDialog:function(){d.close();}}}).then(function(o){d=o;d.setModel(t,"translation");d.addStyleClass(U.getRtaStyleClassName());c.addDependent(d);});}var T={};T.showTranslationPopover=function(e,o){var b=e.getSource();if(c!==o){c=o;d=undefined;}if(!c.oTranslationPopoverPromise){c.oTranslationPopoverPromise=F.load({name:"sap.ui.rta.toolbar.translation.TranslationPopover",id:c.getId()+"_translationPopoverDialog",controller:{openDownloadTranslationDialog:T.openDownloadTranslationDialog}}).then(function(f){b.addDependent(f);return f;});}return c.oTranslationPopoverPromise.then(function(f){if(!f.isOpen()){f.openBy(b);}else{f.close();}});};T.openDownloadTranslationDialog=function(){var D;if(d){D=r();}else{D=a();}return D.then(function(){c.addDependent(d);return d.open();});};return T;});