/*
 * ! SAPUI5

		(c) Copyright 2009-2019 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/core/Element"],function(E){"use strict";var C=E.extend("sap.ui.mdc.Column",{metadata:{defaultAggregation:"template",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},header:{type:"string"},hAlign:{type:"sap.ui.core.HorizontalAlign",defaultValue:"Begin"},initialIndex:{type:"int",defaultValue:-1},dataProperties:{type:"string[]",defaultValue:[]}},events:{},aggregations:{template:{type:"sap.ui.core.Control",multiple:false},creationTemplate:{type:"sap.ui.core.Control",multiple:false}}}});C.prototype.init=function(){this.mSkipPropagation={template:true,creationTemplate:true};};C.prototype.getTemplate=function(c){var t=this.getAggregation("template");if(c&&this._oTemplateClone&&this._oTemplateClone.bIsDestroyed){this._oTemplateClone=null;}if(!this._oTemplateClone&&t){this._oTemplateClone=t.clone();}return c?this._oTemplateClone:t;};C.prototype.getCreationTemplate=function(c){var o=this.getAggregation("creationTemplate");if(c&&this._oCreationTemplateClone&&this._oCreationTemplateClone.bIsDestroyed){this._oCreationTemplateClone=null;}if(!this._oCreationTemplateClone&&o){this._oCreationTemplateClone=o.clone();}return c?this._oCreationTemplateClone:o;};C.prototype.exit=function(){if(this._oTemplateClone){this._oTemplateClone.destroy();this._oTemplateClone=null;}if(this._oCreationTemplateClone){this._oCreationTemplateClone.destroy();this._oCreationTemplateClone=null;}};return C;},true);