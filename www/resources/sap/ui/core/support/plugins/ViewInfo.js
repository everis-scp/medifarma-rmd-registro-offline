/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/support/Plugin','sap/ui/core/support/controls/TreeViewer','sap/ui/core/support/controls/ObjectViewer','sap/ui/Device',"sap/base/Log","sap/base/security/encodeXML"],function(P,T,O,D,L,e){"use strict";var $=jQuery;var V=P.extend("sap.ui.core.support.plugins.ViewInfo",{constructor:function(s){P.apply(this,["sapUiSupportViewInfo","XML View and Templating Support Tools",s]);this._oStub=s;if(!this.runsAsToolPlugin()){var t=this;sap.ui.getCore().registerPlugin({startPlugin:function(c){t.oCore=c;},stopPlugin:function(){t.oCore=undefined;}});}}});V.prototype.init=function(s){P.prototype.init.apply(this,arguments);if(!this.runsAsToolPlugin()){return;}if(!D.browser.chrome){this.$().get(0).innerHTML="View Info Support Tool is currently only available on Chrome. We are currently working to support all browsers.";return;}try{this.supportInfo=window.opener.sap.ui.core.support.Support.info;}catch(b){this.$().get(0).innerHTML="View Info Support Tool needs access to the opener window. The opener window might not be accessible due to cross domain restrictions.";return;}if(typeof this.supportInfo!=="function"){this.$().get(0).innerHTML="<div class='sapUISupportLabel' style='padding: 5px;'>"+"View Info Support Tool is only available in <b>Support Mode.</b>"+"<br>Turn it on by adding '<b>sap-ui-support=true</b>' to the url or your application."+"</div>";return;}try{this.aViews=this.supportInfo.getAll("view");this.aOdataModels=this.supportInfo.getAll("datajs");}catch(b){this.$().get(0).innerHTML="View Info Support Tool raised an internal error while reading the support informations.";return;}if(!this.aViews){this.$().get(0).innerHTML="View Info Support Tool did not record any information on the current page.<br>"+"Possible reasons:<br>"+"There are no XML Views defined in the current app.<br>"+"Views where not loaded before the Diagnistics tool was started.";}if(this.runsAsToolPlugin()){a.call(this,s);}};function a(s){$(document).on("click",".viewxmlheader",$.proxy(this._onToggleViewInfo,this)).on("click",".viewxmlmain",$.proxy(this._onMainViewInfo,this));this.renderContentAreas();}V.prototype.exit=function(s){P.prototype.exit.apply(this,arguments);if(this.runsAsToolPlugin()){$(document).off("click",".viewxmlheader",$.proxy(this._onToggleViewInfo,this)).off("click",".viewxmlmain",$.proxy(this._onMainViewInfo,this));}};V.prototype.provideNodeInfo=function(v,n,A){if(v.env.type!=="template"){var d=this.getObjectInfo(n);var i=[];if(d){var I=this.getBreakpointInfos(d);if(I.Template){i.push(I.Template);}if(I.Attributes){i.push(I.Attributes);}if(I.Properties){i.push(I.Properties);}if(I.Methods){i.push(I.Methods);}}return i;}};V.prototype.highlightTemplateTreeNode=function(t,d,i){t.clearHighlights();var I=this.getSupportInfos(d);for(var i=0;i<I.length;i++){if(I[i].context){t.expandNode(I[i].context);t.highlightNode(I[i].context);}}};V.prototype.createTree=function(v,i){var t=new T(),b=this,r=v.context;t.viewDebugInfo=v;if(v.env.type==="template"){t.ignoreIds();r=v.env.clone;}var n=r.querySelectorAll("*");for(var j=0;j<n.length;j++){var N=n[j],I=N.getAttribute("support:data"),c=this.supportInfo.getIds(I);if(c.length>0){if(!N.getAttribute("id")){N.setAttribute("id","");}N.setAttribute("__id",c[0]);}else{N.setAttribute("__id",N.getAttribute("id"));}}t.setRootObject(r);t.attachSelectionChange((function(i){return function(d,R){if(v){if(v.env.type!=="template"){b.updateObjectInfo(d,i,R);if(v.env.templateTree){b.highlightTemplateTreeNode(v.env.templateTree,d,i);}}}};})(i));t.attachAttributeInfos(function(N,A){if(v){if(v.env.type!=="template"){if(A.name.indexOf("support:")>-1){return{visible:false};}if(A.name.indexOf("xmlns:support")>-1){return{visible:false};}}}});t.attachNodeInfos(function(N,A){return b.provideNodeInfo(v,N,A);});return t;};V.prototype.renderContentAreas=function(){this._propertyChangeDebugger={};this._methodDebugger={};var r=sap.ui.getCore().createRenderManager();r.write('<style>'+'.viewxmlinfo {width: 620px; height: 300px; position: absolute;margin-top: -310px;margin-left: 810px; box-sizing:border-box;}'+'.viewxmlinfo .content {overflow: auto; box-sizing:border-box;}'+'.viewxmlinfo .toolbar {padding:4px 10px;box-sizing:border-box;height:25px}'+'.viewxmlinfo .title {padding:4px 10px;box-sizing:border-box;height:25px;font-size:17px;}'+'.viewxmlinfo .title a {color: #007dc0; text-decoration: none}'+'.viewxmlinfo .title a:hover {color: #007dc0; text-decoration: underline}'+'.viewxmlheader {cursor:default;font-family:arial; font-size: 14px;}'+'.viewxmlheader .info{margin-left:3px;display:inline-block}'+'.viewxmlheader[collapsed=\'true\'] .settingscontainer {display:none;margin-left: 8px;}'+'.viewxmlheader[collapsed=\'false\'] .settingscontainer {margin-top: 3px; display:block;margin-left: 12px;}'+'.viewxmlmain .settingscontainer {margin-left: 12px;}'+'.viewxmlmain .settings{font-size:14px;margin: 0px 6px;padding:2px 6px;color:#007dc0;cursor:pointer; display:inline-block;width:180px;white-space:nowrap;}'+'.viewxmlmain .settings [selected=\'true\'] {background-color:#007dc0;}'+'.viewxmlmain .settings [selected] {border: 1px solid #007dc0;height: 11px;display: inline-block;width: 11px;box-sizing: border-box;margin-right: 4px;margin-bottom: -1px;}'+'.viewxmlheader .settings {margin: 0px 6px;padding:2px 6px;color:#007dc0;cursor:pointer; display:inline-block;width:180px;white-space:nowrap;}'+'.viewxmlheader .settings [selected=\'true\'] {background-color:#007dc0;}'+'.viewxmlheader .settings [selected] {border: 1px solid #007dc0;height: 11px;display: inline-block;width: 11px;box-sizing: border-box;margin-right: 4px;margin-bottom: -1px;}'+'.viewxmlheader[collapsed=\'true\'] .toggle {border-color: transparent transparent transparent #333;border-radius: 0;border-style: solid;border-width: 4px 3px 4px 8px;height: 0;width: 0;position: relative;margin-top: 0px;margin-left: 10px;display: inline-block;}'+'.viewxmlheader[collapsed=\'false\'] .toggle {border-color: #333 transparent transparent transparent;border-radius: 0;border-style: solid;border-width: 8px 4px 0px 4px;height: 0;width: 0;position: relative;margin-top: 0px;margin-left: 8px;margin-right: 5px;display: inline-block;}'+'.viewxmlsplitter {font-family: consolas, monospace; width: 5px; overflow: auto; height: 300px; position: absolute;margin-top: -310px;margin-left: 810px; padding-left:10px}'+T.getCss()+O.getCss()+'</style>');if(!this.aTrees){this.aTrees=[];this.aDataTrees=[];this.aObjectViewers=[];var i=0;r.write('<div class="viewxmlmain"><div class="settingscontainer"><span class="settings" raise="_onClearAllBreakpoints">Clear all breakpoints</span><span class="settings" raise="_onClearAllXMLModifications">Clear all XML modifications</span></div>');this.aMetamodels=[];if(this.aOdataModels){for(var j=0;j<this.aOdataModels.length;j++){var m=this.aOdataModels[j];if(m&&m.env.type==="metadata"){this.aMetamodels.push(m);var t=this.createTree(m,i);this.aTrees[i]=t;r.write('<div class="viewxmlheader" collapsed="true"><span class="toggle"></span><span class="info">Metadata: '+e(m.env.settings.response.requestUri)+'</span><div class="settingscontainer"><span class="settings"  style="display:none" raise="_onToggleDebugNodes" idx="'+i+'">Expand debugged nodes</span><span class="settings"  style="display:none" raise="_onToggleRealIds" idx="'+i+'" style=\"display:none\"><span selected="false"></span>Show XML View Ids</span><span class="settings" raise="_onToggleNamespace" idx="'+i+'" ><span selected="false"></span>Hide tag namespace</span><span class="settings" raise="_onToggleInactive" idx="'+i+'" ><span selected="false"></span>Hide inactive</span></div></div>');r.write('<div style="display:none"><div id="treecontent_'+i+'"></div>');r.write('<div class="viewxmlsplitter">');r.write('</div>');r.write('<div class="viewxmlinfo"><div class="title" id="objectHeader'+i+'" style="display:none">Header</div><div class="toolbar" id="objectToolbar'+i+'" style="display:none">Toolbar</div><div class="content" id="selectedcontent_'+i+'">');r.write('</div></div></div>');}m.env.tree=t;i++;}}if(this.aViews){for(var j=0;j<this.aViews.length;j++){var v=this.aViews[j];var t=this.createTree(v,i);this.aTrees[i]=t;this.aObjectViewers[i]=null;var I="";if(v.env.type=="template"){I=v.env.viewinfo.id;}else{I=v.env.viewinfo.getId();for(var k=0;k<this.aTrees.length;k++){if(this.aTrees[k]&&this.aTrees[k].viewDebugInfo.env.type==="template"&&this.aTrees[k].viewDebugInfo.env.viewinfo.id===I){v.env.templateTree=this.aTrees[k];}}if(v.env.settings.preprocessors&&v.env.settings.preprocessors.xml&&v.env.settings.preprocessors.xml.models){var M=v.env.settings.preprocessors.xml.models;if(M){for(var n in M){if(M[n].oMetadata){var u=M[n].oMetadata.sUrl;for(var k=0;k<this.aMetamodels.length;k++){var o=this.aMetamodels[k];if(o&&o.env.settings.response.requestUri===u){if(!v.env.metamodels){v.env.metamodels=[];}v.env.metamodels.push({tree:o.env.tree,model:o,data:M[n],metamodel:M[n].oMetaModel,metadata:M[n].oMetadata});}}}}}}}if(v.env.type==="template"){r.write('<div class="viewxmlheader" collapsed="true"><span class="toggle"></span><span class="info">'+I+' ('+v.env.type+')</span><div class="settingscontainer"><span class="settings" raise="_onToggleDebugNodes" idx="'+i+'">Expand debugged nodes</span><span class="settings" raise="_onToggleRealIds" idx="'+i+'" style=\"display:none\"><span selected="false"></span>Show XML View Ids</span><span class="settings" raise="_onToggleNamespace" idx="'+i+'" ><span selected="false"></span>Hide tag namespace</span><span class="settings" raise="_onToggleInactive" idx="'+i+'" ><span selected="false"></span>Hide inactive</span></div></div>');}else{var s="";if(v.env.metamodels){s=":templated by [";for(var x=0;x<v.env.metamodels.length;x++){s+=v.env.metamodels[x].metadata.sUrl;}s+="]";}var c="";if(v.env.settings.cache){c+=" from client cache "+JSON.stringify(v.env.settings.cache);}r.write('<div class="viewxmlheader" collapsed="true"><span class="toggle"></span><span class="info">'+I+' ('+v.env.type+e(String(s))+') '+e(String(c))+'</span><div class="settingscontainer"><span class="settings" raise="_onToggleDebugNodes" idx="'+i+'">Expand debugged nodes</span><span class="settings" raise="_onToggleRealIds" idx="'+i+'" ><span selected="false"></span>Show XML View Ids</span><span class="settings" raise="_onToggleNamespace" idx="'+i+'" ><span selected="false"></span>Hide tag namespace</span></div></div>');}r.write('<div style="display:none"><div id="treecontent_'+i+'"></div>');r.write('<div class="viewxmlsplitter">');r.write('</div>');r.write('<div class="viewxmlinfo"><div class="title" id="objectHeader'+i+'" style="display:none">Header</div><div class="toolbar" id="objectToolbar'+i+'" style="display:none">Toolbar</div><div class="content" id="selectedcontent_'+i+'">');r.write('</div></div></div></div>');i++;}}}r.flush(this.$().get(0));if(this.aTrees){for(var i=0;i<this.aTrees.length;i++){var t=this.aTrees[i];var d=document.getElementById("treecontent_"+i);if(d){t.update(d);}}}r.destroy();};V.prototype._onClearAllBreakpoints=function(){this.supportInfo.removeAllBreakpoints();};V.prototype._onClearAllXMLModifications=function(){this.supportInfo.removeAllXMLModification();};V.prototype.getBreakpointInfos=function(d){var I={},i;function c(d){var b=0;for(var n in d){if(d[n].__enabled){b++;}}return b;}if(d.Template){i=c(d.Template);I["Template"]={selected:i>0,color:"orange",tooltip:"Template Breakpoints ("+i+")"};}if(d.Attributes){i=c(d.Attributes);I["Attributes"]={selected:i>0,color:"blue",tooltip:"Attribute Changes ("+i+")"};}if(d.Properties){i=c(d.Properties);I["Properties"]={selected:i>0,color:"green",tooltip:"Property Change Breakpoints ("+i+")"};}if(d.Methods){i=c(d.Methods);I["Methods"]={selected:i>0,color:"red",tooltip:"Method Breakpoints ("+i+")"};}return I;};V.prototype.getSupportInfos=function(n){var i=n.getAttribute("support:data");return this.supportInfo.getInfos(i);};V.prototype.parseScalarType=function(t,v,n,c){var b=window.opener.sap.ui.base.DataType;var M=window.opener.sap.ui.base.ManagedObject;try{var B=M.bindingParser(v,c,true);if(B&&typeof B==="object"){return{binding:B};}}catch(d){return{error:"Property "+n+" - Invalid Binding:"+d.message};}var f=v=B||v;var o=b.getType(t);if(o){if(o instanceof b){f=o.parseValue(v);}}else{return{error:"Property "+n+" has unknown type "+t};}if(!o.isValid(f)){return{error:"Property "+n+" has invalid value;"};}return{value:f};};V.prototype.getObjectInfo=function(n,I){var t=this;function c(k,f,n){return function(v){var q=t.parseScalarType(k.type,v,k.name,null);for(var i=0;i<f.length;i++){f[i].isBound(k.name);if(k.bindable){f[i][k._sUnbind](q.binding);}else{f[i].unbindProperty(k.name);}if(q.binding){if(k.bindable){f[i][k._sBind](q.binding);}else{f[i].bindProperty(k.name,q.binding);}}else if(q.value!==undefined){f[i][k._sMutator](q.value);}}n.setAttribute("__changed"+k.name,v);return q;};}function C(k,n,d){return function(v){var q=t.parseScalarType(k.type,v,k.name,null);for(var i=0;i<f.length;i++){f[i].isBound(k.name);if(k.bindable){f[i][k._sUnbind](q.binding);}else{f[i].unbindProperty(k.name);}if(q.binding){if(k.bindable){f[i][k._sBind](q.binding);}else{f[i].bindProperty(k.name,q.binding);}}else if(q.value!==undefined){f[i][k._sMutator](q.value);}}if(!q.error){n.getAttribute("_index");var r=n.parentNode,R=null;while(r){R=r;r=r.parentNode;}if(R){var u=R.querySelectorAll("*");for(var i=0;i<u.length;i++){if(u[i]===n){t.supportInfo.addXMLModification(I,i+1,{setAttribute:[k.name,v]});return;}}}}return q;};}var N=n.namespaceURI,s=n.localName,d={};var o=window.opener.jQuery.sap.getObject(N+"."+s);if(o){var b=n.getAttribute("support:data");var A=o.getMetadata().getAllProperties(),m=o.prototype,f=this.supportInfo.getElements(b),g=this.getValidDebugStackIndices(n);if(f.length>0){d.Control={};d.Control[f[0].getMetadata().getName()]={value:f[0].getId(),__highlightid:true,__readonly:true};if(f.length>1){d.Clones={};for(var i=1;i<f.length;i++){d.Clones[f[i].getMetadata().getName()+"("+i+")"]={value:f[i].getId(),__highlightid:true};}}}if(g.length>0){d.Template={};for(var i=0;i<g.length;i++){var h=g[i];d.Template[h.__infokey]={value:h.__infovalue,__idx:g[i]._idx,__enabled:this.supportInfo.hasBreakpointAt(g[i]._idx),__level:h.__level};}}var p=Object.keys(A).sort();if(n.attributes.length>0){d.Attributes={};for(var i=0;i<n.attributes.length;i++){var j=n.attributes[i];if(p.indexOf(j.name)>-1){var k=A[p[p.indexOf(j.name)]];d.Attributes[j.name]={value:j.value,__enabled:false,__docu:V.DemokitUrl+k._oParent.getName()+".html#"+k._sGetter,__original:j.value,__change:C(k,n,I),__add:true};}}}if(p.length>0){d.Properties={};for(var i=0;i<p.length;i++){var k=A[p[i]];var l={value:n.getAttribute("__changed"+k.name)||n.getAttribute(p[i]),value2:f[0]&&f[0][k._sGetter]?f[0]&&f[0][k._sGetter]():null,__controls:f,__enabled:f[0]&&this._propertyChangeDebugger[f[0].getId()+"__"+p[i]]!=null,__docu:V.DemokitUrl+k._oParent.getName()+".html#"+k._sGetter,__original:n.getAttribute(p[i]),__changed:null};l.__change=c(k,f,n);d.Properties[p[i]]=l;}}var M=Object.keys(m).sort();if(M.length>0){d.Methods={};for(var i=0;i<M.length;i++){d.Methods[M[i]]={value:"",__controls:f,__enabled:f[0]&&this._methodDebugger[f[0].getId()+"__"+M[i]]!=null};}}}return d;};V.prototype._makePropFn=function(k){return function(E){if(E.getParameter("name")===k){debugger;}};};V.prototype._makeFn=function(f){return function(){debugger;return f.apply(this,arguments);};};V.prototype.highlightControl=function(d,s,o){try{if(this._highlightControl){this._highlightControl.control.getDomRef().style.outline=this._highlightControl.outline;}if(this._highlightControls){for(var i=0;i<this._highlightControls.length;i++){this._highlightControls[i].control.getDomRef().style.outline=this._highlightControls[i].outline;}}this._highlightControl=null;this._highlightControls=[];if(d.Control&&d.Control[Object.keys(d.Control)[0]].__highlightid){if(s==="Control"&&d.Clones){for(var n in d.Clones){var c=opener.sap.ui.getCore().byId(d.Clones[n].value);if(c&&c.getDomRef()){this._highlightControls.push({control:c,outline:c.getDomRef().style.outline});c.getDomRef().style.outline="solid 1px orange";}}}else{if(!o){o=d.Control[Object.keys(d.Control)[0]];}if(s==="Control"&&o){var C=opener.sap.ui.getCore().byId(o.value);if(C&&C.getDomRef()){this._highlightControl={control:C,outline:C.getDomRef().style.outline};if(C.getDomRef()){C.getDomRef().style.outline="solid 1px orange";}}}}if(s==="Clones"){var C=opener.sap.ui.getCore().byId(o.value);if(C&&C.getDomRef()){this._highlightControl={control:C,outline:C.getDomRef().style.outline};if(C.getDomRef()){C.getDomRef().style.outline="solid 1px orange";}}}}}catch(b){L.debug("Diagnostics: ViewInfo failed to remove highlighting of controls");}};V.DemokitUrl="https://sapui5.hana.ondemand.com/#docs/api/symbols/";V.prototype.updateObjectInfo=function(d,I,r){var o=this.aObjectViewers[I],t=this;if(!o){o=new O();this.aObjectViewers[I]=o;}var h=document.getElementById("objectHeader"+I);h.style.display="none";var b=this.aTrees[I];o.initialExpandedSections=this.oObjectViewer?this.oObjectViewer.expandedSections:[];var c=this.getObjectInfo(d,b.viewDebugInfo.env.viewinfo.getId());var H="";try{if(!c.Control&&d.parentNode){var C=d.parentNode.namespaceURI+"."+d.parentNode.localName;var A="get"+d.localName.substring(0,1).toUpperCase()+d.localName.substring(1);H+="<a target=\"_docu\" href=\""+V.DemokitUrl+C+".html\">"+C+"</a> ("+d.tagName+") ";H+=": <a target=\"_docu\" href=\""+V.DemokitUrl+C+".html#"+A+"\">"+d.localName+" aggregation</a>";}else{var C=d.namespaceURI+"."+d.localName;H+="<a target=\"_docu\" href=\""+V.DemokitUrl+C+".html\">"+C+"</a> ("+d.tagName+") ";var p=window.opener.jQuery.sap.getObject(Object.keys(c.Control)[0]).getMetadata().getParent().getName();H+=": <a target=\"_docu\" href=\""+V.DemokitUrl+p+".html\">"+p+"</a>";}}catch(f){H+="";}h.style.display="block";h.innerHTML=H;t.highlightControl(c,"Control");o.setRootObject(c);o.attachObjectInfos(function(s,S,i,k){if(S==="Template"){if(c[S][k].__enabled){return[{selected:true,color:"orange",tooltip:"Disable breakpoint"}];}else{return[{selected:false,color:"orange",tooltip:"Break if resolved after reload/reprocess"}];}}else if(S==="Attributes"){if(c[S][k].__enabled){return[{selected:true,color:"blue",tooltip:"Disable breakpoint"}];}else{return[{selected:false,color:"blue",tooltip:"Break if changed"}];}}else if(S==="Properties"){if(c[S][k].__enabled){return[{selected:true,color:"green",tooltip:"Disable breakpoint"}];}else{return[{selected:false,color:"green",tooltip:"Break if changed"}];}}else if(S==="Methods"){if(c[S][k].__enabled){return[{selected:true,color:"red",tooltip:"Disable breakpoint"}];}else{return[{selected:false,color:"red",tooltip:"Break if called"}];}}return[];});o.attachSelect(function(i){if(i&&i.__docu){window.open(i.__docu,"_docu");}});o.attachHover(function(i,s,k){t.highlightControl(c,s,i);});o.attachInfoPress(function(s,k,j){var I=c[s][k].__idx,E=c[s][k].__enabled;if(!E){if(s==="Template"){t.supportInfo.addBreakpointAt(I);}else if(s==="Properties"){var l=c[s][k].__controls;if(l){for(var i=0;i<l.length;i++){var m=l[i];t._propertyChangeDebugger[m.getId()+"__"+k]=t.supportInfo._breakAtProperty(k);m.attachEvent("_change",t._propertyChangeDebugger[m.getId()+"__"+k]);}}}else if(s==="Methods"){var l=c[s][k].__controls;if(l){for(var i=0;i<l.length;i++){var m=l[i];var n=m[k];t._methodDebugger[m.getId()+"__"+k+"__fn"]=n;t._methodDebugger[m.getId()+"__"+k]=t.supportInfo._breakAtMethod(n);m[k]=t._methodDebugger[m.getId()+"__"+k];}}}c[s][k].__enabled=true;o.setInfoSelected(s,k,j,true);}else{if(s==="Template"){t.supportInfo.removeBreakpointAt(I);}else if(s==="Properties"){var l=c[s][k].__controls;if(l){for(var i=0;i<l.length;i++){var m=l[i];m.detachEvent("_change",t._propertyChangeDebugger[m.getId()+"__"+k]);delete t._propertyChangeDebugger[m.getId()+"__"+k];}}}else if(s==="Methods"){var l=c[s][k].__controls;if(l){for(var i=0;i<l.length;i++){var m=l[i];m[k]=t._methodDebugger[m.getId()+"__"+k+"__fn"];delete t._methodDebugger[m.getId()+"__"+k];delete t._methodDebugger[m.getId()+"__"+k+"__fn"];}}}c[s][k].__enabled=false;o.setInfoSelected(s,k,j,false);}if(c){var q=t.getBreakpointInfos(c);var i=0;if(q.Template){b.setInfoSelected(b.getSelectedIndex(),i++,q.Template.selected,q.Template.tooltip);}if(q.Attributes){b.setInfoSelected(b.getSelectedIndex(),i++,q.Attributes.selected,q.Attributes.tooltip);}if(q.Properties){b.setInfoSelected(b.getSelectedIndex(),i++,q.Properties.selected,q.Properties.tooltip);}if(q.Methods){b.setInfoSelected(b.getSelectedIndex(),i,q.Methods.selected,q.Methods.tooltip);}}});var g=document.getElementById("selectedcontent_"+I);if(g){o.update(g);}this.oObjectViewer=o;};V.prototype._onToggleRealIds=function(E){var d=E.target;if(d.getAttribute("selected")){d=d.parentNode;}var i=parseInt(d.getAttribute("idx")),t=this.aTrees[i];if(t.toggleIds()){d.innerHTML="<span selected=\"false\"></span>Show XML View Ids";}else{d.innerHTML="<span selected=\"true\"></span>Show Real Ids";}};V.prototype._onToggleInactive=function(E){var d=E.target;if(d.getAttribute("selected")){d=d.parentNode;}var i=parseInt(d.getAttribute("idx")),t=this.aTrees[i];if(t.toggleInactive()){d.innerHTML="<span selected=\"false\"></span>Hide inactive";}else{d.innerHTML="<span selected=\"true\"></span>Show inactive";}E.stopPropagation();};V.prototype._onToggleNamespace=function(E){var d=E.target;if(d.getAttribute("selected")){d=d.parentNode;}var i=parseInt(d.getAttribute("idx")),t=this.aTrees[i];if(t.toggleNS()){d.innerHTML="<span selected=\"false\"></span>Hide tag namespace";}else{d.innerHTML="<span selected=\"true\"></span>Show tag namespace";}E.stopPropagation();};V.prototype._onToggleDebugNodes=function(E){var i=parseInt(E.target.getAttribute("idx")),t=this.aTrees[i];t.expandNodesWithSelectedInfo(0);t.expandNodesWithSelectedInfo(1);t.expandNodesWithSelectedInfo(2);};V.prototype.resizeHandler=function(){var v=document.querySelectorAll(".viewxmlheader");for(var i=0;i<v.length;i++){var d=v[i];var c=d.getAttribute("collapsed")==="true";if(!c){var w=d.offsetWidth-30;var h=d.nextSibling.firstChild.offsetHeight;d._iOldWidth=w;d._iOldHeight=h;d.nextSibling.firstChild.style.width=(w/3*2)+"px";d.nextSibling.lastChild.style.width=(w/3)+"px";d.nextSibling.lastChild.style.height=(h)+"px";d.nextSibling.lastChild.style.marginTop=(-h)+"px";d.nextSibling.lastChild.style.marginLeft=((w/3*2)+20)+"px";d.nextSibling.lastChild.lastChild.height=(h-50)+"px";d.nextSibling.lastChild.lastChild.width="100%";}}if(!this.iInterval){var t=this;this.iInterval=window.setInterval(function(){var v=document.querySelectorAll(".viewxmlheader");var d=v[0];for(var i=0;i<v.length;i++){var d=v[i];var c=d.getAttribute("collapsed")==="true";if(!c){if(d._iOldWidth!==d.offsetWidth-30||d._iOldHeight!==d.nextSibling.firstChild.offsetHeight){t.resizeHandler();}}}},100);}};V.prototype._onMainViewInfo=function(E){var d=E.target,r=d.getAttribute("raise");if(r&&this[r]){this[r](E);E.stopPropagation();return;}};V.prototype._onToggleViewInfo=function(E){var d=E.target,r=d.getAttribute("raise");if(r&&this[r]){this[r](E);E.stopPropagation();return;}r=d.parentNode.getAttribute("raise");if(r&&this[r]){this[r](E);E.stopPropagation();return;}if(!d.getAttribute("collapsed")){d=d.parentNode;}var c=d.getAttribute("collapsed")==="true";if(c){d.setAttribute("collapsed","false");d.nextSibling.style.display="block";this.resizeHandler();}else{d.setAttribute("collapsed","true");d.nextSibling.style.display="none";}};V.prototype.createTemplateTreeNodes=function(r){var t=(new DOMParser()).parseFromString("","application/xml");var I=this.supportInfo.getAll();var c=t;var C="";var s="";var p=[];for(var i=0;i<I.length;i++){var o=I[i];if(o.env.before){if(o.env.caller==="visitNode"){var b=o.context;if(c===b){continue;}t.importNode(b);b.removeAttribute("support:data");b.removeAttribute("xmlns:support");if(t===c){c.replaceChild(b,c.firstChild);p.push(c);}else{c.appendChild(b);p.push(c);}c=b;}else if(o.env.caller==="visitAttributes"){C=o.env.before.name;s=o.env.before.value;c.setAttribute(C,s);}}else if(o.env.after){if(o.env.caller==="visitNode"){c=c.parentNode||o.env.parent;}}}return t.childNodes[0];};V.prototype.getValidDebugStackIndices=function(N){var r=[],I=N.getAttribute("support:data"),b=["xmlns","support:data"];if(I){var c=I.split(","),s=this.supportInfo,l=0;for(var i=0;i<c.length;i++){var d=parseInt(c[i]);var o=s.byIndex(d);if(!o){continue;}o.__debugging=s.hasBreakpointAt(d);if(o.env){if(o.env.caller==="visitAttributes"){for(var n in o.env){if(n==="caller"||n==="info"){continue;}var v=true;for(var j=0;j<b.length;j++){if(o.env[n].name.indexOf(b[j])===0){v=false;break;}}if(v){if(n.indexOf("after")===0){l--;}o.__infokey=n+":"+o.env[n].name;o.__level=l;o.__infovalue=o.env[n].value;if(n.indexOf("before")===0){l++;}r.push(o);}}}else if(o.env.caller==="getMetadata"){for(var n in o.env){if(n==="caller"||n==="info"){continue;}var v=true;for(var j=0;j<b.length;j++){if(o.env[n].name.indexOf(b[j])===0){v=false;break;}}if(v){if(n.indexOf("after")===0){l--;}o.__infokey=n+":"+o.env[n].name;o.__level=l;o.__infovalue=o.env[n].value;r.push(o);if(n.indexOf("before")===0){l++;}}}}else if(o.env.caller==="getProperty"){for(var n in o.env){if(n==="caller"||n==="info"){continue;}var v=true;for(var j=0;j<b.length;j++){if(o.env[n].name.indexOf(b[j])===0){v=false;break;}}if(v){if(n.indexOf("after")===0){l--;}o.__infokey=n+":"+o.env[n].name;o.__level=l;o.__infovalue=o.env[n].value;r.push(o);if(n.indexOf("before")===0){l++;}}}}else if(o.env.caller==="visitNode"){for(var n in o.env){if(n.indexOf("after")===0){l--;}o.__infokey=n+":Node";o.__infovalue=o.env[n].name;r.push(o);if(n.indexOf("before")===0){l++;}}}}}}return r;};return V;});
