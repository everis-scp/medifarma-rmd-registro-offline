/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/core/Core","sap/ui/Device","sap/m/StandardListItemRenderer"],function(R,C,D,S){"use strict";var L=R.extend(S);L.apiVersion=2;L.renderLIAttributes=function(r,l){S.renderLIAttributes.apply(this,arguments);r.class("sapUiIntLCI");if(l.getIcon()){r.class("sapUiIntLCIIconSize"+l.getIconSize());}if(l.getMicrochart()){r.class("sapUiIntLCIWithChart");}};L.renderLIContent=function(r,l){var i=l.getInfo(),t=l.getTitle(),d=l.getDescription(),a=l.getAdaptTitleSize(),s=!t&&i;if(l.getIcon()||l.getIconInitials()){r.renderControl(l._getAvatar());}r.openStart("div").class("sapMSLIDiv");if((!d&&a&&i)||s){r.class("sapMSLIInfoMiddle");}r.openEnd();this.renderTitleWrapper(r,l);if(t&&d){this.renderDescription(r,l);}if(s&&!l.getWrapping()){this.renderInfo(r,l);}r.close("div");};L.render=function(r,l){if(!l.getVisible()){this.renderInvisible(r,l);return;}this.openItemTag(r,l);r.class("sapMLIB");r.class("sapMLIB-CTX");r.class("sapMLIBShowSeparator");r.class("sapMLIBType"+l.getType());r.class("sapMLIB");if(D.system.desktop&&l.isActionable()){r.class("sapMLIBActionable");r.class("sapMLIBHoverable");}if(l.getSelected()){r.class("sapMLIBSelected");}if(l.getListProperty("showUnread")&&l.getUnread()){r.class("sapMLIBUnread");}this.addFocusableClasses(r,l);this.renderTooltip(r,l);this.renderTabIndex(r,l);if(C.getConfiguration().getAccessibility()){r.accessibilityState(l,this.getAccessibilityState(l));}this.renderLIAttributes(r,l);r.openEnd();this.renderContentFormer(r,l);this.renderLIContentWrapper(r,l);this.renderContentLatter(r,l);this.renderFooter(r,l);this.closeItemTag(r,l);};L.renderFooter=function(r,l){var m=l.getMicrochart(),a=l.getActionsStrip();if(!m&&!a){return;}r.openStart("div").class("sapUiIntLCIFooter").openEnd();if(m){r.renderControl(m);}if(a){r.renderControl(a);}r.close("div");};return L;},true);