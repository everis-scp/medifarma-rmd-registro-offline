/*
 * Copyright (C) 2009-2014 SAP SE or an SAP affiliate company. All rights reserved
 */
jQuery.sap.declare("sap.ca.scfld.md.ApplicationFacade");sap.ui.base.Object.extend("sap.ca.scfld.md.ApplicationFacade",{constructor:function(a){this.oApplicationImplementation=a;},getResourceBundle:function(){return this.oApplicationImplementation.getResourceBundle();},getODataModel:function(n){return this.oApplicationImplementation.getODataModel(n);},isMock:function(){return this.oApplicationImplementation.isMock();},setApplicationModel:function(n,m){this.oApplicationImplementation.setApplicationModel(n,m);},getApplicationModel:function(n){return this.oApplicationImplementation.getApplicationModel(n);},getUiLibResourceModel:function(){return this.oApplicationImplementation.getUiLibResourceBundle();},registerOnMasterListRefresh:function(h,l){return this.oApplicationImplementation.attachEvent("_scfldOnMasterListRefresh",h,l);},deRegisterOnMasterListRefresh:function(h,l){return this.oApplicationImplementation.detachEvent("_scfldOnMasterListRefresh",h,l);}});
