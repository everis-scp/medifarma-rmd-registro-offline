/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/semantic/SemanticButton","sap/f/semantic/SemanticConfiguration"],function(M,S){"use strict";var a=M.extend("sap.f.semantic.SemanticButton",{metadata:{library:"sap.f","abstract":true}});a.prototype._getConfiguration=function(){return S.getConfiguration(this.getMetadata().getName());};return a;});
