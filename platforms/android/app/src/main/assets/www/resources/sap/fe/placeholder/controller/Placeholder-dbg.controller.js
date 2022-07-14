/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(
	["sap/ui/core/mvc/Controller", "sap/base/util/LoaderExtensions", "sap/base/Log"],
	function(Controller, LoaderExtensions, Log) {
		"use strict";

		return Controller.extend("sap.fe.placeholder.controller.Placeholder", {
			isPlaceholder: function() {
				return true;
			},
			setPlaceholderOption: function(oOptions) {
				this.oOptions = oOptions;
			},
			getOptions: function(sKeyName) {
				return this.oOptions[sKeyName];
			},
			istargetNavigated: function(oTarget) {
				if (!this.aTargetNavigated) {
					this.aTargetNavigated = [];
				}
				if (this.aTargetNavigated.indexOf(oTarget.id) === -1) {
					this.sCurrentTargetId = oTarget.id;
					return false;
				} else {
					return true;
				}
			},
			currentTargetNavigated: function() {
				if (!this.aTargetNavigated) {
					this.aTargetNavigated = [];
				}
				if (this.aTargetNavigated && this.aTargetNavigated.indexOf(this.sCurrentTargetId) === -1) {
					this.aTargetNavigated.push(this.sCurrentTargetId);
				}
			},
			onInit: function() {
				var oPlaceholderContainer = this.byId("PlaceholderContent");
				if (oPlaceholderContainer) {
					LoaderExtensions.loadResource(oPlaceholderContainer.data("placeholder"), {
						async: true,
						dataType: "text"
					})
						.then(function(sContent) {
							if (!oPlaceholderContainer._bIsBeingDestroyed) {
								oPlaceholderContainer.setContent(sContent);
							}
						})
						.catch(function() {
							Log.error("Unable to initialize Placeholder: " + oPlaceholderContainer.data("placeholder"));
						});
				}
			}
		});
	},
	true
);
