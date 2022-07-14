/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils"],function(U){"use strict";function a(c){if(c&&c.indexOf(".Component")<0){c+=".Component";}return c;}function g(A){var f;A.requests.some(function(o){if(o.name==="sap.ui.fl.changes"){f=o;}});return f;}var M={getFlexReferenceForControl:function(c){var A=U.getAppComponentForControl(c);return M.getFlexReference({manifest:A.getManifest(),componentData:A.getComponentData()});},getFlexReference:function(p){var m=p.manifest;var c=p.componentData||{};if(c.startupParameters){if(Array.isArray(c.startupParameters["sap-app-id"])){return c.startupParameters["sap-app-id"][0];}}var s=m.getEntry?m.getEntry("sap.ui5"):m["sap.ui5"];if(s){if(s.appVariantId){return s.appVariantId;}if(s.componentName){return a(s.componentName);}}return a(U.getAppIdFromManifest(m));},getCacheKeyFromAsyncHints:function(r,A){if(A&&A.requests&&Array.isArray(A.requests)){var f=g(A);if(f&&f.reference===r){return f.cachebusterToken||"<NO CHANGES>";}}},getChangeManifestFromAsyncHints:function(A){if(A&&A.requests&&Array.isArray(A.requests)){var f=g(A);if(f){return false;}}return true;},getBaseComponentNameFromManifest:function(m){var s=m.getEntry?m.getEntry("sap.ui5"):m["sap.ui5"];return s&&s.componentName||U.getAppIdFromManifest(m);},isFlexExtensionPointHandlingEnabled:function(v){var A=U.getAppComponentForControl(v);return!!(A&&A.getManifestEntry("sap.ui5")&&A.getManifestEntry("sap.ui5").flexExtensionPointEnabled);}};return M;});
