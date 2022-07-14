// Copyright (c) 2009-2020 SAP SE, All Rights Reserved

sap.ui.define(["sap/base/security/encodeXML"], function (encodeXML) {
    "use strict";

    return sap.ui.core.Control.extend("sap.ushell.renderers.fiori2.search.controls.DivContainer", {

        metadata: {
            properties: {
                "cssClass": "string"
            },
            aggregations: {
                "content": {
                    singularName: "content",
                    multiple: true
                }
            }
        },

        renderer: function (oRm, oControl) {
            oRm.write('<div');
            oRm.writeControlData(oControl);
            var cssClass = oControl.getCssClass();
            if (cssClass) {
                oRm.addClass(encodeXML(cssClass));
            }
            oRm.writeClasses();
            oRm.write('>');
            var aChildren = oControl.getContent();
            for (var i = 0; i < aChildren.length; i++) {
                oRm.renderControl(aChildren[i]);
            }
            oRm.write('</div>');
        }
    });
});
