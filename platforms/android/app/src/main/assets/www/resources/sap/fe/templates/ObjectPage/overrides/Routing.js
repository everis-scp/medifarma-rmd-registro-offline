/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/core/CommonUtils","sap/fe/navigation/SelectionVariant"],function(C,S){"use strict";return{onBeforeNavigation:function(c){var s=c.oEvent&&c.oEvent.getSource(),p=s&&s.getMetadata().getName();if(!(p==="sap.uxap.ObjectPageHeaderActionButton")){var P=this.getView().getBindingContext();if(P){c.objectPageContext=P.getObject();}}c.oEvent?delete c.oEvent:c;}};});
