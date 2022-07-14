//@ui5-bundle sap/fiori/library-preload.js
/*!
 * SAPUI5
 *
 * (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.predefine('sap/fiori/library',["sap/base/i18n/ResourceBundle","sap/ui/core/Core","sap/ui/core/library"],function(R,c,l){"use strict";sap.ui.getCore().initLibrary({name:"sap.fiori",dependencies:["sap.ui.core"],types:[],interfaces:[],controls:[],elements:[],version:"1.93.7"});var C=sap.ui.getCore().getConfiguration(),L=C.getLanguage(),d=C.getLanguagesDeliveredWithCore(),a=R._getFallbackLocales(L,d);L=a[0];if(L&&!window["sap-ui-debug"]&&!sap.ui.loader.config().async){sap.ui.requireSync("sap/fiori/messagebundle-preload_"+L);}return sap.fiori;});
sap.ui.require.preload({
	"sap/fiori/manifest.json":'{"_version":"1.21.0","sap.app":{"id":"sap.fiori","type":"library","embeds":[],"applicationVersion":{"version":"1.93.7"},"title":"A hybrid UILibrary merged from the most common UILibraries that are used in Fiori apps","description":"A hybrid UILibrary merged from the most common UILibraries that are used in Fiori apps","resources":"resources.json","offline":true},"sap.ui":{"technology":"UI5","supportedThemes":["base","sap_belize","sap_belize_hcb","sap_belize_hcw","sap_belize_plus","sap_bluecrystal","sap_fiori_3","sap_fiori_3_dark","sap_fiori_3_hcb","sap_fiori_3_hcw","sap_hcb","sap_horizon"]},"sap.ui5":{"dependencies":{"minUI5Version":"1.93","libs":{"sap.ui.core":{"minVersion":"1.93.4"}}},"library":{"i18n":false,"content":{"controls":[],"elements":[],"types":[],"interfaces":[]}}}}',
	"sap/fiori/flp-controls-dbg.js":function(){
}
},"sap/fiori/library-preload"
);
//# sourceMappingURL=library-preload.js.map