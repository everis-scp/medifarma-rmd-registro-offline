/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/fe/core/library"],function(C){"use strict";var V=C.VariantManagement;return{applyInitialStateOnly:function(){return false;},adaptStateControls:function(s){var v=this.getView(),c=v.getController(),o=v.getViewData(),b=false;switch(o.variantManagement){case V.Control:b=true;break;case V.Page:case V.None:break;default:throw new Error("unhandled variant setting: "+o.getVariantManagement());}c._findTables().forEach(function(t){var q=t.getQuickFilter();if(q){s.push(q);}if(b){s.push(t.getVariant());}});s.push(v.byId("fe::ObjectPage"));}};});
