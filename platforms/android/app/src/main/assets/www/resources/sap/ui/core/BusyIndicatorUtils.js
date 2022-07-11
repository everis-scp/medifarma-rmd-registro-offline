/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./BlockLayerUtils'],function(B){"use strict";var a=function(){};a.getElement=function(s){var S="sapUiLocalBusyIndicatorSizeMedium";if(s==="Large"){S="sapUiLocalBusyIndicatorSizeBig";}var c=document.createElement("div");c.className="sapUiLocalBusyIndicator "+S+" sapUiLocalBusyIndicatorFade";B.addAriaAttributes(c);b(c);return c;};function b(c,s){s=s||"sapUiLocalBusyIndicatorAnimStandard";var A=document.createElement("div");A.className="sapUiLocalBusyIndicatorAnimation "+s;A.appendChild(document.createElement("div"));A.appendChild(document.createElement("div"));A.appendChild(document.createElement("div"));c.appendChild(A);}function h(o,s){var p=o.$parent.get(0),c=o.$blockLayer.get(0);var A=c.children[0],w=A.offsetWidth;if(p.offsetWidth<w){A.className="sapUiLocalBusyIndicatorAnimation sapUiLocalBusyIndicatorAnimSmall";}}a.addHTML=function(o,s){var c=sap.ui.require("sap/ui/core/library").BusyIndicatorSize,S="sapUiLocalBusyIndicatorSizeMedium",A;switch(s){case c.Small:S="sapUiLocalBusyIndicatorSizeMedium";A="sapUiLocalBusyIndicatorAnimSmall";break;case c.Large:S="sapUiLocalBusyIndicatorSizeBig";A="sapUiLocalBusyIndicatorAnimStandard";break;case c.Auto:S="sapUiLocalBusyIndicatorSizeMedium";A="sapUiLocalBusyIndicatorAnimStandard";break;default:S="sapUiLocalBusyIndicatorSizeMedium";A="sapUiLocalBusyIndicatorAnimStandard";break;}if(!o){return;}var p=o.$parent.get(0),d=o.$blockLayer.get(0);p.className+=" sapUiLocalBusy";d.className+=" sapUiLocalBusyIndicator "+S+" sapUiLocalBusyIndicatorFade";b(d,A);if(s===c.Auto){h(o);}};return a;},true);
