/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(["sap/esh/search/ui/SearchShellHelper","sap/m/Link","sap/ui/core/IconPool"],function(S,L,I){"use strict";return sap.ui.core.Control.extend("sap.esh.search.ui.controls.SearchNoResultScreen",{metadata:{properties:{searchBoxTerm:"string",},aggregations:{toolbar:{type:"sap.ui.core.Control",multiple:true,},},},renderer:function(r,c){var s=S.getSearchInput();var a;if(s){a=s.getAriaDescriptionIdForNoResults();}var e=$("<div>").text(c.getSearchBoxTerm()).html();r.write('<div class="sapUshellSearch-no-result"');r.writeControlData(c);r.write(">");r.write('<div class="sapUshellSearch-no-result-icon">');r.writeIcon(I.getIconURI("travel-request"));r.write('</div><div class="sapUshellSearch-no-result-text" role="alert">');r.write("<div ");if(a){r.write('id="'+a+'" ');}var b=e===""?"*":e;r.write('class="sapUshellSearch-no-result-info">'+sap.esh.search.ui.resources.i18n.getText("no_results_info",[b]).replace('<b>"&1"</b>','<b>"'+b+'"</b>'));r.write("</div>");c.renderAppFinderLink(r,c);r.write('<div class="sapUshellSearch-no-result-tips">'+sap.esh.search.ui.resources.i18n.getText("no_results_tips")+"</div> ");c.renderToolbar(r,c);r.write("</div></div>");},renderAppFinderLink:function(r,c){var m=c.getModel();if(!m.config.isUshell){return;}if(m.getDataSource()!==m.appDataSource){return;}var l=sap.esh.search.ui.resources.i18n.getText("no_results_link_appfinder",["xxxx",]);var i=l.indexOf("xxxx");var p=l.slice(0,i);var s=l.slice(i+4);r.write('<div class="sapUshellSearch-no-result-info">');r.write(p);var a=new L({text:sap.esh.search.ui.resources.i18n.getText("appFinderTitle"),press:function(){var C=sap.ushell&&sap.ushell.Container&&(sap.ushell.Container.getService("SmartNavigation")||sap.ushell.Container.getService("CrossApplicationNavigation"));C.toExternal({target:{shellHash:"#Shell-home&/appFinder/catalog",},});},});r.renderControl(a);r.write(s);r.write("</div>");},renderToolbar:function(r,c){var t=c.getToolbar();for(var i=0;i<t.length;++i){var a=t[i];r.renderControl(a);}},});});