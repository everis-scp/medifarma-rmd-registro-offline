/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseRename","sap/base/Log"],function(B,L){"use strict";var P="label";var C="groupLabel";var T="XFLD";var R=B.createRenameChangeHandler({propertyName:P,changePropertyName:C,translationTextType:T});R.applyChange=function(c,o,p){var a=c.getDefinition();var t=a.texts[C];var v=t.value;if(a.texts&&t&&typeof(v)==="string"){return this.setLabelOrTitleOnControl(o,v,p.modifier,P).then(function(O){c.setRevertData(O);});}L.error("Change does not contain sufficient information to be applied: ["+a.layer+"]"+a.namespace+"/"+a.fileName+"."+a.fileType);return Promise.resolve();};R.revertChange=function(c,o,p){var O=c.getRevertData();if(O||O===""){return this.setLabelOrTitleOnControl(o,O,p.modifier,P).then(c.resetRevertData());}L.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.");return Promise.resolve();};R.setLabelOrTitleOnControl=function(c,v,m,p){return Promise.all([m.getProperty(c,p),m.getAggregation(c,"title")]).then(function(V){var l=V[0];var t=V[1];if(!l&&t){if(typeof t==="string"){p="title";}else{p="text";c=t;}}return m.getPropertyBindingOrProperty(c,p);}).then(function(o){m.setPropertyBindingOrProperty(c,p,v);return o;});};return R;},true);
