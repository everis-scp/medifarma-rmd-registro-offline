/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/ui/core/Control"],function(C){"use strict";return C.extend("sap.fe.core.controls.ConditionalWrapper",{metadata:{interfaces:["sap.ui.core.IFormContent"],properties:{width:{type:"sap.ui.core.CSSSize",defaultValue:null},formDoNotAdjustWidth:{type:"boolean",defaultValue:false},condition:{type:"boolean",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},defaultAggregation:"contentTrue",aggregations:{contentTrue:{type:"sap.ui.core.Control",multiple:false},contentFalse:{type:"sap.ui.core.Control",multiple:false}}},enhanceAccessibilityState:function(e,a){var p=this.getParent();if(p&&p.enhanceAccessibilityState){p.enhanceAccessibilityState(this,a);}return a;},_setAriaLabelledBy:function(c){if(c&&c.addAriaLabelledBy){var a=this.getAriaLabelledBy();for(var i=0;i<a.length;i++){var I=a[i];var A=c.getAriaLabelledBy()||[];if(A.indexOf(I)===-1){c.addAriaLabelledBy(I);}}}},onBeforeRendering:function(){this._setAriaLabelledBy(this.getContentTrue());this._setAriaLabelledBy(this.getContentFalse());},renderer:{apiVersion:2,render:function(r,c){r.openStart("div",c);r.style("width",c.getWidth());r.style("display","inline-block");r.openEnd();if(c.getCondition()){r.renderControl(c.getContentTrue());}else{r.renderControl(c.getContentFalse());}r.close("div");}}});});
