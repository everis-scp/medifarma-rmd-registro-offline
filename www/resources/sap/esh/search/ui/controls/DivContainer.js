/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";return sap.ui.core.Control.extend("sap.esh.search.ui.controls.DivContainer",{metadata:{properties:{cssClass:"string",},aggregations:{content:{singularName:"content",multiple:true,},},},renderer:function(r,c){r.write("<div");r.writeControlData(c);r.addClass(c.getCssClass());r.writeClasses();r.write(">");var C=c.getContent();for(var i=0;i<C.length;i++){r.renderControl(C[i]);}r.write("</div>");},});});
