/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/m/MessageToast","sap/esh/search/ui/SearchShellHelper"],function(M,S){"use strict";return sap.ui.controller("sap.esh.search.ui.flp.App",{onInit:function(){this.oShellNavigation=sap.ushell.Container.getService("ShellNavigation");this.oShellNavigation.hashChanger.attachEvent("hashChanged",this.hashChanged);if(S.oSearchFieldGroup===undefined){S.init();}S.setSearchState("EXP_S");},hashChanged:function(){var m=sap.esh.search.ui.getModelSingleton({},"flp");m.parseURL();},onExit:function(){this.oShellNavigation.hashChanger.detachEvent("hashChanged",this.hashChanged);var s=document.querySelectorAll('[id$="-searchContainerResultsView"]')[0].id;if(sap.ui.getCore().byId(s)&&sap.ui.getCore().byId(s).oTablePersoController&&sap.ui.getCore().byId(s).oTablePersoController.getTablePersoDialog()){sap.ui.getCore().byId(s).oTablePersoController.getTablePersoDialog().destroy();}if(S.getDefaultOpen()!==true){S.setSearchStateSync("COL");}else{S.setSearchState("EXP");}if(this.oView.getContent()[0].oSearchPage.oFacetDialog){this.oView.getContent()[0].oSearchPage.oFacetDialog.destroy();}},});});
