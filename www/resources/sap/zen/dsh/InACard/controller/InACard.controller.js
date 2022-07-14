/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/zen/commons/utils/jQuery","sap/base/Log","sap/ui/core/mvc/Controller","sap/zen/commons/thirdparty/lodash"],function(q,L,C,_){"use strict";C.extend("sap.zen.dsh.InACard.controller.InACard",{onInit:function(){var t=this;var v=t.getView();v.getModel("om").attachRequestCompleted(function(){_.forEach(v.byId("flatDS").getDimensions(),function(d){d.bindProperty("value","om>"+d.getIdentity());});_.forEach(v.byId("flatDS").getMeasures(),function(m){m.bindProperty("value","om>"+m.getIdentity());});v.byId("idVizFrame").setVizProperties(_.clone(v.byId("idVizFrame").getVizProperties()));});},resizeCard:function(s){var v=this.getView();var o=q(v.byId("ovpCardContentContainer").getDomRef());if(s.showOnlyHeader){o.addClass("sapOvpContentHidden");}else{o.removeClass("sapOvpContentHidden");}o.height((s.rowSpan*s.iRowHeightPx)-(2*s.iCardBorderPx));},onPress:function(e){var t=this;t.getView().setBusy(e.getParameter("navigationCmdType")!=="CellClick");var o=t.getView().getModel("om");o.clearMessages();return Promise.resolve(null).then(e.getParameter("cmd")).then(function(){if(sap.ushell&&sap.ushell.Container){sap.ushell.Container.setDirtyFlag(false);}}).catch(function(E){L.error(E);}).then(function(){t.getView().setBusy(false);});},onAfterRendering:function(){this.adjustHeight();},adjustHeight:function(){var d=this.getView().getDomRef();if(d){q(d).height(q(this.getOwnerComponent().getRootControl().byId("vb1").getDomRef()).height());q(this.getOwnerComponent().getRootControl().byId("vb1").getDomRef()).children().css("height","100%");}},getItemHeight:function(){try{return q(this.getView().byId(this.getView().getId()+"--ovpCardControl").getInnerCard().getItems()[1].getDomRef()).height();}catch(e){L.error(e);return 0;}}});});