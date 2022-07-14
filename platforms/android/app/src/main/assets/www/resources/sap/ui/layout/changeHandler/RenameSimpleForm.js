/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/Base","sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(B,J,L){"use strict";var R={};R.applyChange=function(c,C,p){var m=p.modifier;var v=p.view;var a=p.appComponent;var o=c.getDefinition();var s=o.content.elementSelector||o.content.sRenameId;var r=m.bySelector(s,a,v);if(o.texts&&o.texts.formText&&this._isProvided(o.texts.formText.value)){if(!C){return Promise.reject(new Error("no Control provided for renaming"));}return Promise.resolve().then(function(){return m.getProperty(r,"text");}).then(function(P){c.setRevertData(P);var V=o.texts.formText.value;m.setProperty(r,"text",V);});}else{L.error("Change does not contain sufficient information to be applied: ["+o.layer+"]"+o.namespace+"/"+o.fileName+"."+o.fileType);return Promise.resolve();}};R.revertChange=function(c,C,p){var o=c.getRevertData();var a=p.appComponent;var b=c.getDefinition();var v=p.view;var m=p.modifier;var s=b.content.elementSelector||b.content.sRenameId;var r=m.bySelector(s,a,v);if(o||o===""){m.setProperty(r,"text",o);r.getParent().invalidate();c.resetRevertData();}else{L.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.");}};R.completeChangeContent=function(c,s,p){var C=c.getDefinition();if(!s.changeType){throw new Error("oSpecificChangeInfo.changeType attribute required");}if(s.renamedElement&&s.renamedElement.id){var r=sap.ui.getCore().byId(s.renamedElement.id);var S;if(s.changeType==="renameLabel"){S=r.getLabel();}else if(s.changeType==="renameTitle"){S=r.getTitle();}C.content.elementSelector=J.getSelector(S,p.appComponent);c.addDependentControl(S,"elementSelector",p);}else{throw new Error("oSpecificChangeInfo.renamedElement attribute required");}if(this._isProvided(s.value)){B.setTextInChange(C,"formText",s.value,"XFLD");}else{throw new Error("oSpecificChangeInfo.value attribute required");}};R._isProvided=function(s){return typeof(s)==="string";};R.getChangeVisualizationInfo=function(c,a){var e=c.getDefinition().content.elementSelector;var A=c.getChangeType()==="renameTitle"?J.bySelector(e,a).getParent().getId():e;return{affectedControls:[A]};};return R;},true);
