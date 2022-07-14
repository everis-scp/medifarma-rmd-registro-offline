// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define([
    "sap/m/Image",
    "sap/ushell/library" // css style dependency
], function (Image) {
    "use strict";

    return Image.extend("sap.ushell.renderers.fiori2.search.controls.SearchObjectSuggestionImage", {

        metadata: {
            properties: {
                isCircular: "boolean"
            }
        },

        constructor: function () {
            Image.prototype.constructor.apply(this, arguments);

            this.attachBrowserEvent("load", function () {
                this.wrapImage();
            }.bind(this));

            this.attachBrowserEvent("error", function () {
                this.wrapImage(true);
            }.bind(this));

            this.addStyleClass("sapUshellSearchObjectSuggestionImage-Initial");
        },

        wrapImage: function (isError) {
            var imageNode = this.getDomRef();
            if (jQuery(imageNode.parentNode).hasClass("sapUshellSearchObjectSuggestionImage-Wrapper-Portrait") ||
                jQuery(imageNode.parentNode).hasClass("sapUshellSearchObjectSuggestionImage-Wrapper-Landscape")) {
                this.adaptContainer(isError);
                // adapt necessary because UI5 tries to load image with correct content density (see @2 in url)
                // if desired content density is not available the fallback "normal" image is loaded
                // -> wrap image triggered twice
            } else {
                this.createContainer(isError);
            }
        },

        createContainer: function (isError) {

            // assemble image wrapper container node
            var containerNode = document.createElement("div");
            var imageNode = this.getDomRef();
            jQuery(containerNode).addClass("sapUshellSearchObjectSuggestionImage-Wrapper");
            if (imageNode.offsetHeight > imageNode.offsetWidth) {
                jQuery(containerNode).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Portrait");
            } else {
                jQuery(containerNode).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Landscape");
            }

            // make circular
            if (this.getIsCircular()) {
                containerNode.style.borderRadius = "50%";
            }

            // put image into container
            imageNode.parentNode.insertBefore(containerNode, imageNode);
            imageNode.parentNode.removeChild(imageNode);
            containerNode.appendChild(imageNode);
            jQuery(imageNode).removeClass("sapUshellSearchObjectSuggestionImage-Initial");

            // add error marker
            if (isError) {
                jQuery(containerNode).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Error");
            }

        },

        adaptContainer: function (isError) {

            var imageNode = this.getDomRef();
            var containerNode = imageNode.parentNode;
            if (imageNode.offsetHeight > imageNode.offsetWidth) {
                jQuery(containerNode).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Portrait");
                jQuery(containerNode).removeClass("sapUshellSearchObjectSuggestionImage-Wrapper-Landscape");
            } else {
                jQuery(containerNode).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Landscape");
                jQuery(containerNode).removeClass("sapUshellSearchObjectSuggestionImage-Wrapper-Protrait");
            }

            if (isError) {
                jQuery(containerNode).addClass("sapUshellSearchObjectSuggestionImage-Wrapper-Error");
            } else {
                jQuery(containerNode).removeClass("sapUshellSearchObjectSuggestionImage-Wrapper-Error");
            }

        },

        renderer: "sap.m.ImageRenderer"

    });



});
