// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ushell/resources","sap/m/Text","sap/base/Log"],function(r,T,L){"use strict";var a={};a.render=function(R,c){var t=null;var m=c.getModel();try{t=c.getTileViews()[0];}catch(e){L.warning("Failed to load tile view: ",e.message);t=new T({text:r.i18n.getText("cannotLoadTile")});}R.write("<div");if(m&&m.getProperty("/enableHelp")){R.writeAttribute("data-help-id",c.getTileCatalogId());}R.writeControlData(c);R.addClass("sapUshellLinkTile");if(!c.getVisible()){R.addClass("sapUshellHidden");}if(c.getIsLocked()){R.addClass("sapUshellLockedTile");}R.writeClasses();R.writeAttributeEscaped("tabindex","-1");R.write(">");R.renderControl(t);R.write("</div>");};return a;},true);
