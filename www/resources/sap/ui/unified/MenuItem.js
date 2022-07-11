/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/IconPool','./MenuItemBase','./library','sap/ui/core/library'],function(I,M,l,c){"use strict";var a=M.extend("sap.ui.unified.MenuItem",{metadata:{library:"sap.ui.unified",properties:{text:{type:"string",group:"Appearance",defaultValue:''},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:''}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}}}});I.insertFontFaceStyle();a.prototype.render=function(r,i,m,o){var b=r,s=i.getSubmenu(),d=i.getEnabled();b.openStart("li",i);if(i.getVisible()&&d){b.attr("tabindex","0");}b.class("sapUiMnuItm");if(o.iItemNo==1){b.class("sapUiMnuItmFirst");}else if(o.iItemNo==o.iTotalItems){b.class("sapUiMnuItmLast");}if(!m.checkEnabled(i)){b.class("sapUiMnuItmDsbl");}if(i.getStartsSection()){b.class("sapUiMnuItmSepBefore");}if(!d){b.attr("disabled","disabled");}if(i.getTooltip_AsString()){b.attr("title",i.getTooltip_AsString());}if(o.bAccessible){b.accessibilityState(i,{role:"menuitem",disabled:null,posinset:o.iItemNo,setsize:o.iTotalItems,labelledby:{value:this.getId()+"-txt",append:true}});if(s){b.attr("aria-haspopup",c.aria.HasPopup.Menu.toLowerCase());b.attr("aria-owns",s.getId());}}b.openEnd();b.openStart("div");b.class("sapUiMnuItmL");b.openEnd();b.close("div");if(i.getIcon()){b.openStart("div");b.class("sapUiMnuItmIco");b.openEnd();b.icon(i.getIcon(),null,{title:null});b.close("div");}b.openStart("div",this.getId()+"-txt");b.class("sapUiMnuItmTxt");b.openEnd();b.text(i.getText());b.close("div");b.openStart("div",this.getId()+"-scuttxt");b.class("sapUiMnuItmSCut");b.openEnd();b.close("div");b.openStart("div");b.class("sapUiMnuItmSbMnu");b.openEnd();if(s){b.openStart("div");b.class("sapUiIconMirrorInRTL");b.openEnd();b.close("div");}b.close("div");b.openStart("div");b.class("sapUiMnuItmR");b.openEnd();b.close("div");b.close("li");};a.prototype.hover=function(h,m){this.$().toggleClass("sapUiMnuItmHov",h);};a.prototype.focus=function(m){if(this.getEnabled()&&this.getVisible()){this.$().trigger("focus");}else{m.focus();}};return a;});
