/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define([],function(){"use strict";var _={};var i=function(d){return d&&d.hasOwnProperty("_type")&&d._type==="EntitySet";};_.isEntitySet=i;var g=function(e){var b,c,d;return((b=e.annotations)===null||b===void 0?void 0:(c=b.Capabilities)===null||c===void 0?void 0:(d=c.FilterRestrictions)===null||d===void 0?void 0:d.FilterExpressionRestrictions)||[];};_.getFilterExpressionRestrictions=g;var a=function(e){var b;return!!((b=e.annotations.Session)===null||b===void 0?void 0:b.StickySessionSupported);};_.isStickySessionSupported=a;return _;},false);
