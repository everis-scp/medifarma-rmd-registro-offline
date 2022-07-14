/*
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["jquery.sap.global","sap/base/Log","sap/ui/model/json/JSONModel","sap/zen/commons/HAlign","sap/zen/dsh/utils/BaseHandler","sap/zen/dsh/utils/jq"],function(q,L,J,H,B){"use strict";var N=function(){var t=this;var o;var c;B.apply(this,arguments);this.createSplitter=function(C){var s=new sap.ui.layout.Splitter();s.onAfterRendering=function(){q(s.getDomRef()).find("[tabIndex='-1']").attr("tabIndex","0");};s.oSplitterConfig=C;if(C.splitterOrientation==="Horizontal"){s.setOrientation(sap.ui.core.Orientation.Vertical);}s.addFirstPaneContent=function(b){s.addContentArea(b);b.getLayoutData().setMinSize(s.oSplitterConfig.minSizeFirstPane);b.getLayoutData().setSize(s.oSplitterConfig.splitterPosition);};s.addSecondPaneContent=function(b){s.addContentArea(b);b.getLayoutData().setMinSize(s.oSplitterConfig.minSizeSecondPane);b.getLayoutData().setSize("auto");};return s;};this.updateSplitter=function(s){if(!s){return;}var l=0;if(s.getOrientation()==="Horizontal"){l=s.getDomRef().offsetWidth;}else{l=s.getDomRef().offsetHeight;}if(s.splitterSize&&s.splitterSize!=l){var b=0;var d=0;s.getContentAreas().forEach(function(C){var e=0;if(s.getOrientation()==="Horizontal"){e=C.getDomRef().offsetWidth;}else{e=C.getDomRef().offsetHeight;}d+=e;if(C.getLayoutData().getSize().endsWith("px")){b+=1;}});if(b>1){s.getContentAreas().forEach(function(C){var e=0;if(s.getOrientation()==="Horizontal"){e=C.getDomRef().offsetWidth;}else{e=C.getDomRef().offsetHeight;}var f=(e*100)/d;C.getLayoutData().setSize(f+"%");});}}s.splitterSize=l;};this.createMainPanel=function(i){var m=new sap.m.NavContainer(i,{autoFocus:false}).addStyleClass("zenNavigationPanelM").addStyleClass("sapContrastPlus");var p=this.createPanel({});m.addPage(p);m.setTop=function(C){p.setTop(C);};m.setCenter=function(C){p.setCenter(C);};m.destroyTop=function(){m.getPages()[0].destroySubHeader();};m.destroyCenter=function(){m.getPages()[0].destroyContent();};return m;};this.createPanel=function(C){var p=null;if(q.type(C)==="string"){p=new sap.m.Page(C);}else{p=new sap.m.Page();}p.setShowHeader(false);p.setTop=function(b){p.setSubHeader(b);};p.setCenter=function(b){var d=b.content;if(d){for(var i=0;i<d.length;i++){p.addContent(d[i]);}}};if(C.top){p.setTop(C.top);}if(C.center){p.setCenter(C.center);}p.addEventDelegate({onAfterRendering:function(){var j=p.$();if(j.closest(".sapUiSizeCompact").length===0&&j.children("header").length>0){j.children("section").css("top","3rem");}}});p.onAfterRendering=function(){q(p.getDomRef()).find("[tabIndex='-1']").attr("tabIndex","0");};return p;};this.createTopArea=function(C){var T=new sap.m.Toolbar();var b=C.content;if(C.contentAlign==="right"){T.addContent(new sap.m.ToolbarSpacer());}if(b){for(var i=0;i<b.length;i++){T.addContent(b[i]);}}return T;};this.createCenterArea=function(C){var b={content:C.content?C.content:[],addContent:function(d){this.content.push(d);}};return b;};this.createSearchField=function(C){var s=new sap.m.SearchField();s.setWidth(C.width);s.attachLiveChange(C.suggest);return s;};this.createText=function(C,i){if(C&&C.design){delete C.design;}return new sap.m.Title(i,C);};this.createLabel=function(C,i){var l;if(C&&C.design==="Bold"){delete C.design;delete C.labelFor;l=new sap.m.Title(i,C);}else{l=new sap.m.Label(i,C);}return l;};this.createRowRepeater=function(){var r=new sap.m.List({noDataText:" "});return r;};this.cloneRowRepeater=function(O){var r=O.clone();return r;};this.getRowRepeaterAggregation=function(){return"items";};this.create=function(C,b){var d,n=b.property.navigationpanelmode;var e="M";B.dispatcher.registerUnhandledDropHandler(b.id,this.onUnhandledDrop);B.dispatcher.registerDragDropCancelHandler(b.id,this.onEscKeyPressed);var j=new J();j.setSizeLimit(Number.MAX_VALUE);if(!b.navigationpanel){b.navigationpanel={};}if(!b.navigationpanel.apply){b.navigationpanel.apply={};}if(!b.navigationpanel.measures){b.navigationpanel.measures={};}b.navigationpanel.apply.ready=false;b.navigationpanel.measures.expanded=false;this.rewriteMeasuresPosition(b);j.setData(b);if(C){d=C;d.destroyTop();d.destroyCenter();}else{d=this.createMainPanel(b["id"]);var s=d.exit;d.exit=function(){if(s){s.apply(d,arguments);}new Function(j.getProperty("/command/destroyfiltercomponent"))();};if(!b.visible&&!this.isDesignModeD4LIncluded()){d.addStyleClass("zenHideFilterPanel");}}if(n!=="LIST_ONLY"){d.oHorizontalSplitter={};d.oHorizontalSplitter=this.createSplitter({splitterOrientation:"Vertical",splitterPosition:"50%",minSizeFirstPane:50,minSizeSecondPane:50,showScrollBars:false,width:"100%",height:"100%"});}d.setModel(j);var r=this.createRowRepeater();r.bindAggregation(this.getRowRepeaterAggregation(),{path:"/characteristics",factory:t.getRowFactory(d,"/characteristic/name","/characteristic/text",function(i){return i;},true)});var R=this.getRowFactory(d,"/entry/name","/entry/name",function(M){var i;var O=j.getProperty("/characteristics"),P;for(i=0;i<O.length;i++){P=O[i].characteristic;if(P.name===M){return P.text;}}var Q=j.getProperty("/charnames");if(Q){for(i=0;i<Q.length;i++){P=Q[i];if(P.name===M){return P.text;}}}var U=j.getProperty("/measures");if(U){for(i=0;i<U.length;i++){P=U[i].characteristic;if(P.name===M){return P.text;}}}return M;});var S=this.createSearchField({enableListSuggest:false,width:"100%",enableClear:true,startSuggestion:0,suggest:function(i){var V=i.getParameter("newValue");var M=new sap.ui.model.Filter("characteristic/text",sap.ui.model.FilterOperator.Contains,V);r.getBinding(t.getRowRepeaterAggregation()).filter([M]);}});var D=this.createText({width:"100%",design:"Bold"},d.getId()+"_dimensions_label").bindProperty("text",{path:"/text/dimensions",mode:sap.ui.model.BindingMode.OneWay,formatter:function(i){if(i){return i.toUpperCase();}return"";}});var T=this.createTopArea({size:"30px",overflowX:"hidden",overflowY:"hidden",content:[S]});var f=this.createCenterArea({overflowX:"hidden",overflowY:"hidden"});var g=this.createPanel({top:this.createTopArea({size:"30px",overflowX:"hidden",overflowY:"hidden",content:[D]}).addStyleClass("zenNavigationPanel-SubHeader"),center:this.createCenterArea({content:[r]})});if(b.property&&b.property.showmeasuresseparately){var l=this.createSplitter({splitterOrientation:"Horizontal",splitterPosition:"40%",minSizeFirstPane:50,minSizeSecondPane:50,showScrollBars:false,width:"100%",height:"100%"});var m=new sap.zen.commons.layout.MatrixLayout({widths:["20px","auto"]});var h=this.createRowRepeater();h.bindAggregation(this.getRowRepeaterAggregation(),{path:"/measures",factory:t.getRowFactory(d,"/characteristic/name","/characteristic/text",function(i){if(i){return i.toUpperCase();}return"";},false,function(){m.destroyRows();t.changeTemplate(d,m,{sPath:"/measures/0",oModel:j},true,true);})});var k=this.createPanel({top:this.createTopArea({size:"30px",overflowX:"hidden",overflowY:"hidden",content:[h]}).addStyleClass("zenNavigationPanel-SubHeader"),center:this.createCenterArea({overflowX:"hidden",overflowY:"hidden",content:[m]})}).addStyleClass("zenNavigationPanel-MeasuresPanel");l.addFirstPaneContent(k);l.addSecondPaneContent(g);f.addContent(l);}else{f.addContent(g);}if(n==="LIST_ONLY"){r.onAfterRendering=this.getDimensionsOnAfterRendering(d,r.getId());if(h){h.onAfterRendering=this.getDimensionsOnAfterRendering(d,h.getId());}d.setTop(T);d.setCenter(f);}else{d.setCenter(this.createCenterArea({overflowX:"hidden",overflowY:"hidden",content:[d.oHorizontalSplitter]}));var p=this.cloneRowRepeater(r);var u=this.cloneRowRepeater(r);r.onAfterRendering=this.getDimensionsOnAfterRendering(d,r.getId(),p.getId(),u.getId());if(h){h.onAfterRendering=this.getDimensionsOnAfterRendering(d,h.getId(),p.getId(),u.getId());}var A=function(){var M=d.getModel();var i=t.prepareCommand(M.getProperty("/command/submitonlyfilter"),"__STRING__",JSON.stringify({filters:[],axis:M.getProperty("/axis")}));i=t.prepareCommand(i,"__BOOLEAN__","X");new Function(i)();M.setProperty("/navigationpanel/apply/ready",false);};d.ZEN_submit=A;p.onAfterRendering=this.getAxisOnAfterRendering("rows",u.getId(),d,A);u.onAfterRendering=this.getAxisOnAfterRendering("columns",p.getId(),d,A);p.bindAggregation(this.getRowRepeaterAggregation(),{path:"/axis/rows",factory:R});u.bindAggregation(this.getRowRepeaterAggregation(),{path:"/axis/columns",factory:R});var v=this.createPanel({top:T,center:f}).addStyleClass("zenNavigationPanel"+e+"-BorderLayoutLeft");if(d.oHorizontalSplitter){d.oHorizontalSplitter.addFirstPaneContent(v);}var w=this.createLabel({text:"{/text/ROWS}",design:"Bold"},d.getId()+"_rows_label");var x=this.createTopArea({size:"30px",overflowX:"hidden",overflowY:"hidden"}).addStyleClass("zenNavigationPanel-SubHeader");var y=this.createPanel({width:"100%",height:"100%",top:x,center:this.createCenterArea({content:[p]})});x.addContent(w);var z=this.createLabel({text:"{/text/COLUMNS}",design:"Bold"},d.getId()+"_columns_label");var E=this.createTopArea({size:"32px",overflowX:"hidden",overflowY:"hidden"}).addStyleClass("zenNavigationPanel-SubHeader");var F=this.createPanel({width:"100%",height:"100%",top:E,center:this.createCenterArea({content:[u]})});E.addContent(z);d.oVerticalSplitter={};d.oVerticalSplitter=this.createSplitter({splitterOrientation:"Horizontal",splitterPosition:"50%",minSizeFirstPane:50,minSizeSecondPane:50,showScrollBars:false,width:"100%",height:"100%"}).addStyleClass("zenNavigationPanel"+e+"-SplitterH");d.oVerticalSplitter.addFirstPaneContent(F);d.oVerticalSplitter.addSecondPaneContent(y);var G=d.oVerticalSplitter.resizeSplitterElements;d.oVerticalSplitter.resizeSplitterElements=function(){G.apply(this);y.invalidate();F.invalidate();};var I=this.createCenterArea({overflowX:"hidden",overflowY:"hidden",content:[d.oVerticalSplitter]});var K=this.createPanel({width:"100%",height:"100%",top:this.createTopArea({contentAlign:"right",size:"30px",content:[new sap.m.Button(d.getId()+"_pause_refresh",{press:function(){var M=d.getModel();var i=t.prepareCommand(M.getProperty("/command/pauserefreshcommand"),"__BOOLEAN__",M.getProperty("/property/pauserefresh")?"":"X");new Function(i)();}}).bindProperty("text",{path:"/property/pauserefresh",mode:sap.ui.model.BindingMode.OneWay,formatter:function(P){var M=d.getModel();return P?M.getProperty("/text/refresh"):M.getProperty("/text/pause");}})]}),center:I}).addStyleClass("zenNavigationPanel"+e+"-BorderLayoutRight");if(d.oHorizontalSplitter){d.oHorizontalSplitter.addSecondPaneContent(K);}}d.onAfterRendering=function(){var M=this.$();var O=q(M.children("tbody")).children("tr");var P=O.length-1;for(var i=0;i<P;i++){var Q=O[i];q(Q).css("height","0px");}};return d;};this.rewriteMeasuresPosition=function(C,s){if(C&&C.characteristics&&(s||(C.property&&C.property.showmeasuresseparately))){for(var i=0,l=C.characteristics.length;i<l;i++){var b=C.characteristics[i];if(b.characteristic.measureStructure){C.measures=[b];C.characteristics.splice(i,1);break;}}}};this.getRowFactory=function(C,k,T,f,m,b){return function(r,d){var R=new sap.zen.commons.layout.MatrixLayout({widths:["20px","auto"]});var M=d.oModel;var e=M.getProperty(d.sPath+"/characteristic/measureStructure");var g,h,i,j;var l=C.getId()+"-"+t.createUI5Identifier(M.getProperty(d.sPath+k));if(d.sPath.indexOf("/axis/rows")!==-1){l+="-rows";}if(d.sPath.indexOf("/axis/columns")!==-1){l+="-columns";}R.setWidth("100%");g=new sap.zen.commons.layout.MatrixLayoutRow();if(m){var I=new sap.ui.core.Icon();if(e){I.bindProperty("src",{path:"/navigationpanel/measures/expanded",mode:sap.ui.model.BindingMode.OneWay,formatter:function(E){if(E){return"sap-icon://navigation-down-arrow";}return"sap-icon://navigation-right-arrow";}});I.attachPress(function(){M.setProperty("/navigationpanel/measures/expanded",!M.getProperty("/navigationpanel/measures/expanded"));t.changeTemplate(C,R,d);});I.addStyleClass("sapzenExpandMeasuresIcon");}else{I.setSrc("sap-icon://accept");I.bindProperty("color",{path:d.sPath+"/characteristic/axis",mode:sap.ui.model.BindingMode.OneWay,formatter:function(A){if(A==="FREE"){return"transparent";}return"inherit";}});}h=new sap.zen.commons.layout.MatrixLayoutCell({hAlign:H.Center});h.addContent(I);g.addCell(h);}j=t.createText();j.bindProperty("text",{path:d.sPath+T,mode:sap.ui.model.BindingMode.OneWay,formatter:f});j.onAfterRendering=function(){this.$().css("cursor","move");};i=new sap.zen.commons.layout.MatrixLayoutCell({colSpan:2});i.addContent(j);i.addContent(t.createLabel({width:"0px"}).bindProperty("text",{path:d.sPath+k,mode:sap.ui.model.BindingMode.OneWay}).addStyleClass("zenDimensionId").addStyleClass("zenHideFilterPanel"));g.addCell(i);R.addRow(g);if(e){t.changeTemplate(C,R,d);}if(e){R.addEventDelegate({onAfterRendering:function(){var t=R;q(t.getDomRef()).attr("tabIndex","0");var p=R.$().find("tr");p.not(".zenMeasure").css("cursor","move");p.css("white-space","nowrap");}});}if(b){b();}var n=new sap.m.CustomListItem(l,{content:[R],});n.onAfterRendering=function(){var t=this;q(t.getDomRef()).attr("tabIndex","0");};return n;};};this.changeTemplate=function(C,r,b,e){var m=b.oModel;if(e||m.getProperty("/navigationpanel/measures/expanded")){var M=m.getProperty(b.sPath+"/characteristic/members");var s=m.getProperty(b.sPath+"/characteristic/name");var d=m.getProperty(b.sPath+"/characteristic/axis");for(var i=0;i<M.length;i++){var f=M[i];var g=new sap.ui.core.Icon({src:"sap-icon://accept"});g.bindProperty("color",{path:"/filters/"+s,mode:sap.ui.model.BindingMode.OneWay,formatter:t.getFilterFormatter(f.key,d,f.parents)});var T=new sap.zen.commons.layout.MatrixLayoutCell({content:[this.createText({text:f.text}),this.createLabel({width:"0px",text:s}).addStyleClass("zenDimensionId").addStyleClass("zenHideFilterPanel"),this.createLabel({width:"0px",text:f.key}).addStyleClass("zenMemberId").addStyleClass("zenHideFilterPanel")]});var R=new sap.zen.commons.layout.MatrixLayoutRow(C.getId()+"-MeasureRow-"+(f.key?f.key.replace("!","x"):"x"));R.addCell(new sap.zen.commons.layout.MatrixLayoutCell({content:[this.createText()]}));R.addCell(new sap.zen.commons.layout.MatrixLayoutCell({content:[g]}));R.addCell(T);R.addStyleClass("zenMeasure");r.addRow(R);}r.setWidths(["20px","20px","auto"]);}else{while(r.getRows().length>1){r.removeRow(1).destroy();}r.setWidths(["20px","auto"]);}};this.getFilterFormatter=function(m,C,p){return function(f){var i,j,l;if(C==="FREE"){return"transparent";}if(f){if(f.members&&f.members.length>0){for(j=0,l=f.members.length;j<l;j++){var k=f.members[j].key;if(k===m){return f.exclude?"transparent":"inherit";}if(p){for(i=0;i<p.length;i++){if(p[i].key===k){return f.exclude?"transparent":"inherit";}}}}return f.exclude?"inherit":"transparent";}else if(f.ranges&&f.ranges.length>0){var O=true;for(j=0,l=f.ranges.length;j<l;j++){var r=f.ranges[j];if(r.operation==="EQ"||!r.operation){k=r.from.key;if(k===m){return r.exclude?"transparent":"inherit";}if(p){for(i=0;i<p.length;i++){if(p[i].key===k){return r.exclude?"transparent":"inherit";}}}}if(O&&!r.exclude){O=false;}}return O?"inherit":"transparent";}}return"inherit";};};this.isDropInPanel=function(e,i){L.error("isDropInPanel");L.error(e);var r=document.getElementById(i).getBoundingClientRect();return(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom);};this.onUnhandledDrop=function(e){L.error("onUnhandledDrop");L.error(e);if(!t.isDropInPanel(e,this.getId())){B.dispatcher.setDragDropCanceled(true);}};this.onEscKeyPressed=function(){L.error("onEscKeyPressed");B.dispatcher.setDragDropCanceled(true);if(o){o.draggable().trigger("mouseup");}if(c){c.sortable().trigger("mouseup");}};this.getDimensionsOnAfterRendering=function(C,r,R,s){return function(){var j=q(document.getElementById(r)).children("ul").children("li");var b=q(document.getElementById(r));var d=C.getModel().getProperty("/property/rootcomponentid");if(!d){d="ROOT";}b.find(".sapUiRrNoData").remove();b.find(".sapMListNoData").remove();var D={helper:function(){var e=t.getDimensionNameAndIdForJQElement(q(this)).dimensionName;var p=B.dispatcher.createDragDropPayload(C.getId());p.oDragDropInfo.sDimensionName=e;B.dispatcher.setDragDropPayload(p);o=q(this);return q("<div class='zenDnDHelper'></div>").append(q(q(this).find("span").not(".sapUiIcon")[0]).clone());},appendTo:(function(){var e=B.dispatcher.getRootControlForComponentId(d);if(!e){L.error("Cannot find root control: "+d);return null;}return document.getElementById(B.dispatcher.getRootControlForComponentId(d).getId());}()),revert:function(u){if(B.dispatcher.isDragDropCanceled()){this.context.ZENcancel=function(){var l;if(q(document.getElementById(R)).find(u).length>0||q(document.getElementById(s)).find(u).length>0){l=u.sortable("cancel").find("li");q(l[l.length-1]).remove();}};return true;}var p=B.dispatcher.getDragDropPayload();if(p&&u&&p.oInterComponentAcceptStatus[q(u).attr("id")]===true){return false;}var e=t.getDimensionNameAndIdForJQElement(q(this));if(u){var g=u.children().not(".ui-draggable");var h=function(){var l=u.sortable("cancel").find("li");q(l[l.length-1]).remove();};for(var i=0;i<g.length;i++){var k=t.getDimensionNameAndIdForJQElement(q(g[i]));if(R&&s&&(u.attr("id")===R+"-listUl"||u.attr("id")===s+"-listUl")&&k.dimensionName===e.dimensionName&&k.id!==e.id){this.context.ZENcancel=h;return true;}}}return false;},start:function(e){if(e.isDefaultPrevented&&e.isDefaultPrevented()===true){e.isDefaultPrevented=function(){return false;};}var g=q(e.toElement);if(g.length>0&&(g.hasClass("zenMeasure")||g.parents(".zenMeasure").length>0)){return false;}return null;},stop:function(){if(this.ZENcancel){this.ZENcancel();this.ZENcancel=undefined;}}};if(R&&s){D.connectToSortable="#"+R+" > ul"+", #"+s+" > ul";}j.draggable(D).disableSelection();var f=j.find("tr");f.not(".zenMeasure").css("cursor","move");f.css("white-space","nowrap");j.mousedown(function(e){B.dispatcher.closeContextMenu();if(e&&(!e.target||!q(e.target).hasClass("sapzenExpandMeasuresIcon"))){if(e.preventDefault){e.preventDefault();}if(e.stopPropagation){e.stopPropagation();}if(e.cancelBubble){e.cancelBubble=true;}}});if(sap.ui.Device.support.touch){j.bind(t.touchBindObject);}};};this.isOverParent=function(u){var x=u.offset.left;var y=u.offset.top;var h=u.item.outerHeight();var b=y+h*2;var r=x+h;var p=u.item.parent();if(p.length===0){p=u.item;}var d=p.offset().left;var e=p.offset().top;var f=p.outerHeight();var g=p.outerWidth();var i=e+f;var j=d+g;if(i<y||e>b||j<x||d>r){return false;}return true;};this.getAxisOnAfterRendering=function(A,C,b,f){return function(){var r=this.getId();var d=q(document.getElementById(r)).children("ul");q(document.getElementById(r+"-body")).height("100%");d.height("100%");d.find(".sapUiRrNoData").remove();d.find(".sapMListNoData").remove();var g=q(document.getElementById(r)).find("li");g.css("cursor","move");g.find("tr").css("white-space","nowrap");var R=g.outerHeight()*(g.length+1);var h=this.$();if(R===0){h.height("100%");}else{h.height(R+"px");}if(d.sortable){var O={rows:"columns",columns:"rows"};var s=g.outerHeight()+"px";d.sortable({containment:q(document.getElementById(b.getId())),connectWith:"#"+C+" > ul",tolerance:"pointer",helper:function(e,i){var p=B.dispatcher.createDragDropPayload(b.getId());p.oDragDropInfo.sDimensionName="";B.dispatcher.setDragDropPayload(p);c=q(this);return q("<div class='zenDnDHelper'></div>").append(q(i).find("span").clone());},placeholder:"zenNavDropHighlight",forcePlaceholderSize:true,change:function(e,u){u.placeholder.css("height",s);},stop:function(e,u){if(B.dispatcher.isDragDropCanceled()){q(this).sortable("cancel");return;}if(!t.isOverParent(u)){var j=t.getDimensionNameAndIdForJQElement(u.item).dimensionName;if(j){var m=b.getModel();var k=m.getProperty("/axis/"+A);for(var i=0;i<k.length;i++){var l=k[i].entry.name;if(l===j){k.splice(i,1);m.setProperty("/axis/"+A,k);m.setProperty("/navigationpanel/apply/ready",true);if(!m.getProperty("/property/pauserefresh")){f();}break;}}}}},appendTo:document.getElementById(b.getId()),update:function(e,u){var i,j;t.clearDragGhosts();if(B.dispatcher.isDragDropCanceled()){return;}var E=q(this).find("li");var n=[],k=[];var l=O[A];var m=b.getModel();var p=m.getProperty("/axis/"+l);for(i=0;i<E.length;i++){var D=t.getDimensionNameAndIdForJQElement(q(E[i])).dimensionName;if(D){var P=true;for(j=0;j<n.length;j++){if(D===n[j].entry.name){P=false;break;}}if(P){for(j=0;j<p.length;j++){if(p[j].entry.name===D){p.splice(j,1);break;}}if(u.item[0]!==E[i]||t.isOverParent(u)){n.push({entry:{name:D}});}else{k.push(i);}}}}for(i=0;i<k.length;i++){q(E[k[i]]).remove();}var T=m.getProperty("/navigationpanel/timeout");if(T){clearTimeout(T);}m.setProperty("/navigationpanel/timeout",setTimeout(function(){var m=b.getModel();m.setProperty("/axis/"+A,n);m.setProperty("/axis/"+l,p);m.setProperty("/navigationpanel/apply/ready",true);if(!m.getProperty("/property/pauserefresh")){f();}m.setProperty("/navigationpanel/timeout",undefined);},0));},cursor:"move"}).disableSelection();}d.mousedown(function(e){B.dispatcher.closeContextMenu();if(e){if(e.preventDefault){e.preventDefault();}if(e.stopPropagation){e.stopPropagation();}if(e.cancelBubble){e.cancelBubble=true;}}});if(sap.ui.Device.support.touch){d.bind(t.touchBindObject);}};};if(sap.ui.Device.support.touch){this.getTouchToMouse=function(m){return function(e){var b=e.originalEvent.changedTouches[0];var d=document.createEvent("MouseEvents");e.preventDefault();d.initMouseEvent(m,true,true,window,1,b.screenX,b.screenY,b.clientX,b.clientY);e.target.dispatchEvent(d);};};this.touchBindObject={touchstart:t.getTouchToMouse("mousedown"),touchmove:t.getTouchToMouse("mousemove"),touchend:t.getTouchToMouse("mouseup")};}this.update=function(C,b,d){if(C&&b){var m=C.getModel();if(this.isDesignModeD4LIncluded()||(b.newds&&b.property&&m.getProperty("/property/navigationpanelmode")!==b.property.navigationpanelmode)){return this.create(C,b,d);}if(b.newds||!m.getProperty("/navigationpanel/apply/ready")){if(b.charnames){m.setProperty("/charnames",b.charnames);}if(b.characteristics){this.rewriteMeasuresPosition(b,m.getProperty("/property/showmeasuresseparately"));m.setProperty("/characteristics",b.characteristics);m.setProperty("/measures",b.measures);}if(b.axis&&this.axisArraysNotSame(b.axis,m.getProperty("/axis"))){m.setProperty("/axis",b.axis);}}if(b.filters){m.setProperty("/filters",b.filters);}if(b.changeVisibility){if(b.visible){C.removeStyleClass("zenHideFilterPanel");}else{C.addStyleClass("zenHideFilterPanel");}}if(typeof(sap.zen.dsh.DSH_deployment)!=="undefined"){if(!b.pauserefresh&&C.getModel().getProperty("/property/pauserefresh")){C.ZEN_submit();}C.getModel().setProperty("/property/pauserefresh",b.pauserefresh);}C.getModel().setProperty("/dsName",b.dsName);}t.clearDragGhosts();if(C){this.updateSplitter(C.oHorizontalSplitter);}return C;};this.axisArraysNotSame=function(A,b){var d=["rows","columns"];if(A&&b){for(var n=0;n<2;n++){var s=d[n];if(A[s].length===b[s].length){for(var i=0;i<A[s].length;i++){if(A[s][i].entry.name!==b[s][i].entry.name){return true;}}}else{return true;}}return false;}return true;};this.getContextMenuAction=function(C,b,d){var s=b.getModel().getProperty("/command/createcontextmenu");if(s){var e=d.prop("tagName").toLowerCase();var D;var m;if(e==="label"||e==="span"){D=t.getDimensionNameAndIdForJQElement(d.parent(),false,true).dimensionName;m=t.getDimensionNameAndIdForJQElement(d.parent(),true,true).dimensionName;}else if(e==="td"||e==="li"){D=t.getDimensionNameAndIdForJQElement(d).dimensionName;m=t.getDimensionNameAndIdForJQElement(d.parent(),true).dimensionName;}if(D){var M=t.prepareCommand(s,"__STRING__",C);M=t.prepareCommand(M,"__STRING2__",D);M=t.prepareCommand(M,"__STRING3__",m);M=t.prepareCommand(M,"__STRING4__",d[0].id);return new Function(M);}}return null;};this.isDesignModeD4LIncluded=function(){return sap.zen.designmode;};this.getType=function(){return"navigationpanel";};this.getDecorator=function(){return"DataSourceControlDecorator";};this.clearDragGhosts=function(){q("div.zenDnDHelper").remove();};this.getDimensionNameAndIdForJQElement=function(j,m,s){var d=s?j.siblings(m?".zenMemberId":".zenDimensionId"):j.find(m?".zenMemberId":".zenDimensionId");var b=d.control(0);return{dimensionName:b&&b.getText(),id:d.attr("id")};};this.getType=function(){return"navigationpanel";};};var a=new N();B.dispatcher.addHandlers(a.getType(),a);return a;});
