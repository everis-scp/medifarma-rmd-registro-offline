/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/dateEditor/DateEditor","sap/ui/core/format/DateFormat"],function(B,D){"use strict";var a=B.extend("sap.ui.fl.write._internal.fieldExtensibility.cap.editor.propertyEditor.dateEditor.DateEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.dateEditor.DateEditor",metadata:{library:"sap.ui.fl"},renderer:B.getMetadata().getRenderer().render});a.prototype._parse=function(v){if(v===""){return undefined;}var p=new Date(v);var d=D.getDateInstance({pattern:"yyyy-MM-dd"});return this._isValidDate(p)?d.format(p):v;};return a;});
