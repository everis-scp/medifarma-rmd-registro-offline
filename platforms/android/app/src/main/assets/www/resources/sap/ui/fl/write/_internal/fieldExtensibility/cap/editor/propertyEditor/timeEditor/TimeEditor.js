/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/ui/integration/designtime/baseEditor/propertyEditor/dateEditor/DateEditor","sap/ui/core/format/DateFormat"],function(B,D,a){"use strict";var T=D.extend("sap.ui.fl.write._internal.fieldExtensibility.cap.editor.propertyEditor.timeEditor.TimeEditor",{xmlFragment:"sap.ui.fl.write._internal.fieldExtensibility.cap.editor.propertyEditor.timeEditor.TimeEditor",metadata:{library:"sap.ui.fl"},renderer:B.getMetadata().getRenderer().render});T.prototype.getDefaultValidators=function(){return Object.assign({},B.prototype.getDefaultValidators.call(this));};T.prototype.formatValue=function(v){return v;};T.prototype._parse=function(v){if(v===""){return undefined;}var t=a.getTimeInstance({pattern:"HH:mm:ss"});var p=t.parse(v);return this._isValidDate(p)?t.format(p):v;};T.prototype.getFormatterInstance=function(){return a.getTimeInstance();};return T;});
