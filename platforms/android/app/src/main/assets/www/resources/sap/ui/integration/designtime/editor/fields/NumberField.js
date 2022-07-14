/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/editor/fields/BaseField","sap/m/Input"],function(B,I){"use strict";var N=B.extend("sap.ui.integration.designtime.editor.fields.NumberField",{metadata:{library:"sap.ui.integration"},renderer:B.getMetadata().getRenderer()});N.prototype.initVisualization=function(c){var v=c.visualization;var f=c.formatter;if(!v){v={type:I,settings:{value:{path:'currentSettings>value',type:'sap.ui.model.type.Float',formatOptions:f},change:function(e){var s=e.getSource();s.getBinding("value").setValue(s.getValue());s.getBinding("value").checkUpdate();},editable:c.editable,type:"Number"}};}this._visualization=v;};return N;});
