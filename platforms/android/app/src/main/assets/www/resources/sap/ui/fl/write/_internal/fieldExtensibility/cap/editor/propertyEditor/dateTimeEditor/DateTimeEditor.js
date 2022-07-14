/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/dateTimeEditor/DateTimeEditor"],function(B){"use strict";var D=B.extend("sap.ui.fl.write._internal.fieldExtensibility.cap.editor.propertyEditor.dateTimeEditor.DateTimeEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.dateTimeEditor.DateTimeEditor",metadata:{library:"sap.ui.fl"},renderer:B.getMetadata().getRenderer().render});D.prototype._parse=function(v){if(v===""){return undefined;}var p=new Date(v);return this._isValidDate(p)?p.toISOString().split(".")[0]+"Z":v;};return D;});
