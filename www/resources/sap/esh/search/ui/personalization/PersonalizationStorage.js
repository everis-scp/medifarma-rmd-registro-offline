/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/personalization/FLPPersonalizationStorage","sap/esh/search/ui/personalization/BrowserPersonalizationStorage","sap/esh/search/ui/personalization/MemoryPersonalizationStorage","sap/esh/search/ui/SearchConfiguration",],function(F,B,M){"use strict";var P={instance:null,isLaunchpad:function(){try{return!!sap.ushell.Container.getService("Personalization");}catch(e){return false;}},create:function(p){switch(p){case"auto":if(this.isLaunchpad()){return F.create();}else{return B.create();}case"browser":return B.create();case"flp":return F.create();case"memory":return M.create();default:}},};return P;});
