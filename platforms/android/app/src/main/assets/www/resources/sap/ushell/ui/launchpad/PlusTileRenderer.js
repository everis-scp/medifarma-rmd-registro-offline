// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/resources","sap/ushell/Config"],function(r,C){"use strict";var P={apiVersion:2,render:function(a,p){a.openStart("li",p);a.attr("tabindex","-1");a.class("sapUshellTile");a.class("sapUshellPlusTile");a.class("sapContrastPlus");a.class("sapMGT");if(C.last("/core/home/sizeBehavior")==="Small"){a.class("sapUshellSmall");}if(p.getEnableHelp()){a.class("help-id-plusTile");}a.attr("aria-label",r.i18n.getText("TilePlus_label"));a.openEnd();a.renderControl(p.oIcon);a.close("li");}};return P;},true);
