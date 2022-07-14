/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/mapEditor/MapEditor"],function(M){"use strict";var A=M.extend("sap.ui.fl.write._internal.fieldExtensibility.cap.editor.propertyEditor.annotationsEditor.AnnotationsEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.mapEditor.MapEditor",metadata:{library:"sap.ui.fl"},renderer:M.getMetadata().getRenderer().render});A.prototype.processInputValue=function(v){return{value:v,type:"json"};};A.prototype._isValidItem=function(){return true;};return A;});
