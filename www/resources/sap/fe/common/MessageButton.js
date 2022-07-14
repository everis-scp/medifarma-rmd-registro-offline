/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/m/Button","sap/m/Dialog","sap/m/library","sap/fe/common/MessagePopover","sap/fe/core/CommonUtils","sap/ui/core/MessageType","sap/ui/model/Filter","sap/ui/model/Sorter","sap/ui/model/FilterOperator","sap/uxap/ObjectPageLayout","sap/base/Log"],function(B,D,L,M,C,c,F,S,d,O,f){"use strict";var g=L.ButtonType;var h=B.extend("sap.fe.common.MessageButton",{metadata:{properties:{},events:{messageChange:{}},aggregations:{customFilters:{type:"sap.fe.common.MessageFilter",multiple:true,singularName:"customFilter"}}},renderer:{}});function _(a,i){return a===i.getId();}function m(a,i){return a.some(function(b){if(b===i.getId()){return true;}return false;});}function n(){clearTimeout(this._setMessageDataTimeout);this._setMessageDataTimeout=setTimeout(function(){var I,b=g.Default,a=this.oMessagePopover.getItems(),j=a.length,k={Error:0,Warning:0,Success:0,Information:0},R=sap.ui.getCore().getLibraryResourceBundle("sap.fe.core"),l,T,J;if(j>0){for(var i=0;i<j;i++){if(!a[i].getType()||a[i].getType()==""){++k["Information"];}else{++k[a[i].getType()];}}if(k[c.Error]>0){b=g.Negative;}else if(k[c.Critical]>0||k[c.Warning]>0){b=g.Critical;}else if(k[c.Success]>0){b=g.Success;}else if(k[c.Information]>0){b=g.Neutral;}if(k.Error>0){this.setText(k.Error);}else{this.setText("");}if(k.Error===1){l="C_COMMON_SAPFE_ERROR_MESSAGES_PAGE_TITLE_ERROR";}else if(k.Error>1){l="C_COMMON_SAPFE_ERROR_MESSAGES_PAGE_MULTIPLE_ERROR_TOOLTIP";}else if(!k.Error&&k.Warning){l="C_COMMON_SAPFE_ERROR_MESSAGES_PAGE_WARNING_TOOLTIP";}else if(!k.Error&&!k.Warning&&k.Information){l="C_MESSAGE_HANDLING_SAPFE_ERROR_MESSAGES_PAGE_TITLE_INFO";}else if(!k.Error&&!k.Warning&&!k.Information&&k.Success){l="C_MESSAGE_HANDLING_SAPFE_ERROR_MESSAGES_PAGE_TITLE_SUCCESS";}if(l){J=R.getText(l);T=k.Error?k.Error+" "+J:J;this.setTooltip(T);}this.setIcon(I);this.setType(b);this.setVisible(true);var V=sap.ui.getCore().byId(this.sViewId);if(V){var P=V.getController().pageReady;P.waitPageReady().then(function(){return this._applyGroupingAsync(V);}.bind(this)).finally(function(){this.fireMessageChange({iMessageLength:j});}.bind(this)).catch(function(e){f.error("fail grouping messages");});}}else{this.setVisible(false);this.fireMessageChange({iMessageLength:j});}this.oMessagePopover.navigateBack();}.bind(this),100);}function o(){var a,V,b,e,i,P,j,k,l,U=[],I=null;function J(){var T=function(R){var W=Infinity,X=sap.ui.getCore().byId(R[0]),Y=sap.ui.getCore().byId(R[0]);while(X){var Z=X instanceof D?Y.getParent().findElements(true).indexOf(Y):Infinity;if(X instanceof D){if(W>Z){W=Z;Y.focus();}return false;}X=X.getParent();}return true;};return new F({path:"controlIds",test:T,caseSensitive:true});}function K(){var T=function(R){if(!R.length){return false;}var W=sap.ui.getCore().byId(R[0]);while(W){if(W.getId()===j){return true;}if(W instanceof D){return false;}W=W.getParent();}return false;};return new F({path:"controlIds",test:T,caseSensitive:true});}if(!this.sViewId){this.sViewId=this._getViewId(this.getId());}j=this.sViewId;a=this.getAggregation("customFilters");if(a){a.forEach(function(R){U.push(new F({path:R.getProperty("path"),operator:R.getProperty("operator"),value1:R.getProperty("value1"),value2:R.getProperty("value2")}));});}i=this.getBindingContext();if(!i){this.setVisible(false);return;}else{P=i.getPath();V=new F({filters:[new F({path:"validation",operator:d.EQ,value1:true}),K()],and:true});b=new F({filters:[V,new F({path:"target",operator:d.StartsWith,value1:P})],and:false});l=new F({filters:[J()]});}var N=new F({filters:[b,l],and:true});if(U.length>0){e=new F({filters:[U,N],and:false});}else{e=N;}this.oItemBinding.filter(e);this.oObjectPageLayout=A(this,this.oObjectPageLayout);if(this.oObjectPageLayout){var Q=this;k=new S("",null,null,function(R,T){var W,X;if(!I){I=Q.oObjectPageLayout&&Q.oObjectPageLayout.getSections();}W=p(R,I);X=p(T,I);if(W<X){return-1;}if(W>X){return 1;}return 0;});this.oItemBinding.sort(k);}}function p(a,b){if(b){var e,i,l,j,k,I,J,K;for(j=b.length-1;j>=0;--j){e=b[j];i=e.getSubSections();for(k=i.length-1;k>=0;--k){l=i[k];J=l.findElements(true);I=J.filter(_.bind(this,a.getControlId()));K=j+1;if(I.length>0){a.sectionName=e.getTitle();a.subSectionName=l.getTitle();return K*10+(k+1);}}}if(!a.sectionName&&!a.subSectionName&&a.persistent){return 1;}return 999;}return 999;}function q(a){var i=a.getParameter("item"),b=i.getBindingContext("message").getObject(),I=new RegExp("^/").test(b.getTarget()),j,k,V=sap.ui.getCore().byId(this.sViewId),l=this.oMessagePopover;if(l&&l.isOpen()){l.close();}var J=function(b,T,R,e){var P=V.findElements(true);var Q=b.getControlIds().filter(function($){return P.some(function(a1){return a1.getId()===$;});}).map(function($){return sap.ui.getCore().byId($);});var U=Q.filter(function($){return!$.isA("sap.m.Table")&&!$.isA("sap.ui.Table.table");});if(U.length>0){U[0].focus();}else if(Q.length>0){Q[0].focus();var W=T.findElements(true,function($){return $.isA("sap.m.ColumnListItem");});if(W.length>0&&W[0]){var X=W[R];var Y=K(T,e,X);if(Y){var Z=Y.isA("sap.fe.macros.FieldAPI")?Y.getContent().getContentEdit()[0]:Y.getItems()[0].getContent().getContentEdit()[0];Z.focus();}else{V.getController()._routing.navigateForwardToContext(X.getBindingContext());}}}};function K(T,e,P){var R=e._getTableRefErrorContext(T);var Q=R.getProperty(i.getBindingContext("message").getObject().getId())["targetColProperty"];var U=T.getColumns().findIndex(function(W){return W.getDataProperty()===Q;});return P.getCells()[U];}if(i.getGroupName().indexOf("Table:")!==-1){var T;if(I){T=b.controlIds.map(function(e){var j=sap.ui.getCore().byId(e);var P=j&&j.getParent();return P&&P.isA("sap.ui.mdc.Table")&&P.getHeader()===i.getGroupName().split(", Table: ")[1]?P:null;}).reduce(function(e,P){return P?P:e;});if(T){k=i.getGroupName().split(", ")[0];t(T,this.oObjectPageLayout,k).then(function(){var P;var R=this._getTableRefErrorContext(T);var Q=R.getProperty(i.getBindingContext("message").getObject().getId());var U=function(T,e,W){var X=T.findElements(true,function(a1){return a1.isA("sap.ui.table.Row");});if(X.length>0&&X[0]){var Y=X[0].getParent().getFirstVisibleRow(),Z=X[e-Y],$=K(T,W,Z);if($){P=$.isA("sap.fe.macros.FieldAPI")?$.getContent().getContentEdit()[0]:$.getItems()[0].getContent().getContentEdit()[0];P.focus();}else{V.getController()._routing.navigateForwardToContext(Z.getBindingContext());}}};if(T.data("tableType")==="GridTable"&&Q.rowIndex!==""){T.scrollToIndex(Q.rowIndex).then(function(){U(T,Q.rowIndex,this);}.bind(this)).catch(function(e){f.error("Error while focusing on error");});}else if(T.data("tableType")==="ResponsiveTable"&&Q){J.bind(this)(b,T,Q.rowIndex,this);}else{J.bind(this)(b);}}.bind(this)).catch(function(){f.error("Fail to navigate to Error control");});}}else{j=sap.ui.getCore().byId(b.controlIds[0]);var N=sap.ui.getCore().byId(this.oObjectPageLayout.getSelectedSection());if(N.findElements(true).indexOf(j)===-1){k=i.getGroupName().split(", ")[0];s(this.oObjectPageLayout,k);}j.focus();}}else{k=i.getGroupName().split(", ")[0];s(this.oObjectPageLayout,k);J(b);}}function r(a,b){if(b){var e=a.getSections();var j;for(var i=0;i<e.length;i++){if(e[i].getVisible()&&e[i].getTitle()===b){j=e[i];break;}}return j;}}function s(a,b){var U=a.getUseIconTabBar();if(U){var e=r(a,b);var i=a.getSelectedSection();if(e&&i!==e.getId()){a.setSelectedSection(e.getId());}}}function t(T,a,b){var R=T.getRowBinding();var e=T.getBindingContext();var i=a.getBindingContext();var j=!(e===i);s(a,b);return new Promise(function(k){if(j){R.attachEventOnce("change",function(){k();});}else{k();}});}function u(e){var P=e.getParent();while(P&&!P.isA("sap.ui.mdc.Table")){P=P.getParent();}var a=P&&P.isA("sap.ui.mdc.Table")?P:undefined;return a;}function v(e){var P=e.getParent();while(P&&!P.isA("sap.ui.table.Row")&&!P.isA("sap.m.ColumnListItem")){P=P.getParent();}var T=P&&(P.isA("sap.ui.table.Row")||P.isA("sap.m.ColumnListItem"))?P:undefined;return T;}function w(e){var T=v(e),R;if(T){if(T.isA("sap.ui.table.Row")){R=T.getIndex();}else{R=T.getTable().getItems().findIndex(function(a){return a.getId()===T.getId();});}return R;}else{return undefined;}}function x(e){var a=function(e){var P=e.getParent();while(P&&!P.isA("sap.fe.macros.FieldAPI")){P=P.getParent();}return P;};var T=a(e);var b=function(e){var P=e.getParent();while(P&&!P.isA("sap.m.VBox")){P=P.getParent();}return P;};var i=b(e),j=v(e);var k=j&&j.getCells().find(function(I){return(I.getId()===(T&&T.getId())||I.getId()===(i&&i.getId()));});var l=j&&j.indexOfCell(k);return l;}function y(T,a){var b;var e=T.getColumns().find(function(a,j){return j.getDataProperty()===a;}.bind(this,a));if(!e){var i=T.getControlDelegate().getColumnsFor(T);e=i.find(function(i,a,j){if(j.key.indexOf("::FieldGroup::")!==-1){return j.propertyInfos.find(function(P){return i.find(function(j){return j.relativePath===a;});});}}.bind(this,i,a));if(e&&e.label){var I=T.getColumns().some(function(j){return j.getHeader()===e.label;});}b=I&&e.label;a=I&&e.key;}else{b=e&&e.getHeader();}return{sTableTargetColName:b,sTableTargetColProperty:a};}function z(T,a){var R=function(e){return e.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&");};var b=a.getTarget().replace(new RegExp(R(T.getBindingContext().getPath()+"/"+T.getRowBinding().getPath())+"\\(.*\\)/"),"");return b;}function A(e,a){if(a){return a;}a=e;while(a&&!(a instanceof O)){a=a.getParent();}return a;}function E(a,T,b,e,i,R,j,k){var l=T.length>0?C.getTranslatedText("T_MESSAGE_ITEM_SUBTITLE",R,[b?b.getValue(i):R.getText("T_MESSAGE_ITEM_SUBTITLE_INDICATOR_UNKNOWN"),e?e:R.getText("T_MESSAGE_ITEM_SUBTITLE_INDICATOR_UNKNOWN")]):null;a.setSubtitle(l);var I=Object.keys(k.getModel().getMetaModel().getObject(k.data("entityType")));var J=sap.ui.require("sap/ui/core/Component");var N=k&&J.getOwnerComponentFor(k)&&J.getOwnerComponentFor(k).getNavigation();var K=false;if(N&&Object.keys(N).indexOf(k.getRowBinding().sPath)!=-1){K=N[k.getRowBinding().sPath]&&N[k.getRowBinding().sPath].detail&&N[k.getRowBinding().sPath].detail.route?true:false;}var P=K&&k.getRowAction()&&k.getRowAction().indexOf("Navigation")!=-1&&I.indexOf(j)!=-1?true:false;a.setActiveTitle(!l||P||(!!e?!!b:!!e));return l;}function G(e,a){return!a.some(function(e,b){var P=e.getParent();while(P&&P!==b){P=P.getParent();}return P?true:false;}.bind(this,e));}function H(a){var T=sap.ui.getCore().getMessageManager().getMessageModel().getData();sap.ui.getCore().getMessageManager().removeAllMessages();T.forEach(function(e){if(e!==a){sap.ui.getCore().getMessageManager().addMessages([e]);}});}h.prototype.init=function(){B.prototype.init.apply(this,arguments);this.attachPress(this.handleMessagePopoverPress,this);this.oMessagePopover=new M();this.oItemBinding=this.oMessagePopover.getBinding("items");this.oItemBinding.attachChange(n,this);var a=this.getId();if(a){this.oMessagePopover.addCustomData(new sap.ui.core.CustomData({key:"messageButtonId",value:a}));}this.attachModelContextChange(o.bind(this));this.oMessagePopover.attachActiveTitlePress(q.bind(this));};h.prototype.handleMessagePopoverPress=function(e){this.oMessagePopover.toggle(e.getSource());};h.prototype._applyGroupingAsync=function(V){var W=[];var a=V.getBindingContext();var b=function(V){var R=[];var e=this.oItemBinding.getContexts().map(function(i){return i.getObject();});var j=V.getBindingContext();if(j){var k=V.getContent()[0];this.getVisibleSectionsFromObjectPageLayout(k).forEach(function(l){l.getSubSections().forEach(function(I){I.findElements(true).forEach(function(J){if(J.isA("sap.ui.mdc.Table")){for(var i=0;i<e.length;i++){var K=J.getRowBinding();if(K){var N=j.getPath()+"/"+J.getRowBinding().getPath();if(e[i].target.indexOf(N)===0){R.push({table:J,subsection:I});break;}}}}});});});}return R;};var T=b.bind(this)(V);T.forEach(function(e){var i=e.table,j=e.subsection;if(!i.getBindingContext()||i.getBindingContext().getPath()!==a.getPath()){j.setBindingContext(a);if(!i.getRowBinding().isLengthFinal()){W.push(new Promise(function(k){i.getRowBinding().attachEventOnce("dataReceived",function(){k();});}));}}});return Promise.all(W).then(function(){V.getModel().checkMessages();return new Promise(function(e){setTimeout(function(){this._applyGrouping();e();}.bind(this),0);}.bind(this));}.bind(this)).catch(function(){f.error("Error while grouping the messages in the messagePopOver");});};h.prototype.getVisibleSectionsFromObjectPageLayout=function(a){return a.getSections().filter(function(b){return b.getVisible();});};h.prototype._applyGrouping=function(){var a,b;this.oObjectPageLayout=A(this,this.oObjectPageLayout);if(!this.oObjectPageLayout){return;}a=this.oMessagePopover.getItems();b=this.getVisibleSectionsFromObjectPageLayout(this.oObjectPageLayout);var e=this._checkControlIdInSections(a,false);if(e){this._fnEnableBindings(b);}};h.prototype._getTableRefErrorContext=function(T){var a=T.getModel("internal");if(!T.getBindingContext("internal").getProperty("refError")){a.setProperty("refError",{},T.getBindingContext("internal"));}var R=T.getBindingContext("internal").getPath()+"/refError/"+T.getBindingContext().getPath().replace("/","$")+"$"+T.getRowBinding().getPath().replace("/","$");var b=a.getContext(R);if(!b.getProperty("")){a.setProperty("",{},b);}return b;};h.prototype._getBackendMessageToRemove=function(T,a,e){var b,i=this._getTableRefErrorContext(T),j=Object.keys(i.getProperty()).filter(function(k){return Object.keys(i.getProperty()[k]).every(function(l){return k!==a.getId()&&i.getProperty()[k][l]===e[l];});}),V=sap.ui.getCore().getMessageManager().getMessageModel().getData().map(function(k){return k.id;});if(j.length>0){V.indexOf(j[0]);b=sap.ui.getCore().getMessageManager().getMessageModel().getData()[V.indexOf(j[0])];}return b;};h.prototype._updateInternalModel=function(T,R,a,b,e,i){var j={rowIndex:T?R:"",targetColProperty:a?a:""},k=b.getModel("internal"),l=this._getTableRefErrorContext(b);var V=sap.ui.getCore().getMessageManager().getMessageModel().getData().map(function(J){return J.id;}),I;if(l.getProperty()){I=Object.keys(l.getProperty()).filter(function(J){return V.indexOf(J)===-1;});I.forEach(function(J){delete l.getProperty()[J];});}k.setProperty(e.getId(),Object.assign({},l.getProperty(e.getId())?l.getProperty(e.getId()):{},j),l);};h.prototype._getControlFromMessageRelatingToSubSection=function(e,i){var j=i.getBindingContext("message").getObject();var k=e.findElements(true,function(a){return m(j.getControlIds(),a);}).sort(function(a,b){if(a.isA("sap.ui.mdc.Table")&&!b.isA("sap.ui.mdc.Table")){return-1;}return 1;});return k;};h.prototype._setGroupLabelForTransientMsg=function(a,b){this.sLastActionText=this.sLastActionText?this.sLastActionText:sap.ui.getCore().getLibraryResourceBundle("sap.fe.core").getText("T_MESSAGE_BUTTON_SAPFE_MESSAGE_GROUP_LAST_ACTION");a.setGroupName(this.sLastActionText+": "+b);};h.prototype._computeMessageGroupAndSubTitle=function(a,b,e,i,j,k){this.oItemBinding.detachChange(n,this);var I=a.getBindingContext("message").getObject();var J,T,K,N,P,Q,R,U,V,l,W,X,Y=sap.ui.getCore().getLibraryResourceBundle("sap.fe.core"),Z=new RegExp("^/").test(I.getTarget()),$;if(Z){for(l=0;l<i.length;l++){J=i[l];X=J;if(J.isA("sap.m.Table")||J.isA("sap.ui.table.Table")){T=J.getParent();P=T.getHeader();var a1=T.getRowBinding();if(a1&&a1.isLengthFinal()&&T.getBindingContext()){R=z(T,I);var b1=y(T,R);K=J.isA("sap.ui.table.Table")?a1.getContexts():a1.getCurrentContexts();U=b1.sTableTargetColName;Q=R;R=b1.sTableTargetColProperty;V=T.getColumns()[0].getDataProperty();N=K.find(function(I,f1){return f1&&I.getTarget().indexOf(f1.getPath())===0;}.bind(this,I));E(a,K,N,U,V,Y,Q,T);W=N&&N.getIndex();this._updateInternalModel(N,W,R,T,I,true);}}else{a.setActiveTitle(true);var c1=G(X,i);if(c1){a.setSubtitle("");break;}}}}else{X=i[0];T=u(X);if(T){P=T.getHeader();var d1=x(X);R=d1&&T.getColumns()[d1].getDataProperty();Q=R;U=R&&T.getColumns()[d1].getHeader();W=w(X);K=T.getRowBinding().getCurrentContexts();N=K[W];V=T.getColumns()[0].getDataProperty();E(a,K,N,U,V,Y,Q,T);this._updateInternalModel(N,W,R,T,I,false);if(N){var e1={rowIndex:N?W:"",targetColProperty:R?R:""};$=this._getBackendMessageToRemove(T,I,e1);}}}if(I.persistent&&k){this._setGroupLabelForTransientMsg(a,k);}else{a.setGroupName(b.getTitle()+(e.getTitle()&&j?", "+e.getTitle():"")+(P?", "+Y.getText("T_MESSAGE_GROUP_TITLE_TABLE_DENOMINATOR")+": "+P:""));}this.oItemBinding.attachChange(n,this);if($&&!Z){H($);}return X;};h.prototype._checkControlIdInSections=function(a,e){var b,l,V,I,i,j,k;this.sGeneralGroupText=this.sGeneralGroupText?this.sGeneralGroupText:sap.ui.getCore().getLibraryResourceBundle("sap.fe.core").getText("T_MESSAGE_BUTTON_SAPFE_MESSAGE_GROUP_GENERAL");V=this.getVisibleSectionsFromObjectPageLayout(this.oObjectPageLayout);if(V){var J=this._getViewId(this.getId());var K=sap.ui.getCore().byId(J);var N=K&&K.getBindingContext("internal")&&K.getBindingContext("internal").getProperty("sActionName");if(N){K.getBindingContext("internal").setProperty("sActionName",null);}for(i=a.length-1;i>=0;--i){I=a[i];var P=true;for(j=V.length-1;j>=0;--j){b=V[j];l=b.getSubSections();for(k=l.length-1;k>=0;--k){var Q=l[k];var R=this._getControlFromMessageRelatingToSubSection(Q,I);if(R.length>0){var T=this._computeMessageGroupAndSubTitle(I,b,Q,R,l.length>1,N);if(T&&!T.isA("sap.m.Table")&&!T.isA("sap.ui.table.Table")){j=k=-1;}P=false;}}}if(P){var U=I.getBindingContext("message").getObject();I.setActiveTitle(false);if(U.persistent&&N){this._setGroupLabelForTransientMsg(I,N);}else{I.setGroupName(this.sGeneralGroupText);}}var W;if(this.oObjectPageLayout!==undefined&&this.oObjectPageLayout.getMetadata().getName()==="sap.uxap.ObjectPageLayout"){W=this.oObjectPageLayout.getModel("viewData");}if(!e&&(!T||T.isA("sap.m.Table")||T.isA("sap.ui.table.Table"))&&this._findTargetForMessage(I)&&W&&!W.getProperty("/_disableLazyLoadingForMessages")){return true;}}}};h.prototype._findTargetForMessage=function(a){var b=a.getBindingContext("message")&&a.getBindingContext("message").getObject();if(b&&b.target){var e=this.oObjectPageLayout&&this.oObjectPageLayout.getModel()&&this.oObjectPageLayout.getModel().getMetaModel(),i=e&&e.getMetaPath(b.target),j=e&&e.getObject(i);if(j&&j.$kind=="Property"){return true;}}};h.prototype._fnEnableBindings=function(a){for(var i=0;i<a.length;i++){var b=a[i];var e=b.getSubSections();for(var j=0;j<e.length;j++){var k=e[j];k.setBindingContext(undefined);if(k.getBindingContext()&&this._findMessageGroupAfterRebinding()){k.getBindingContext().getBinding().attachDataReceived(this._findMessageGroupAfterRebinding());}}}};h.prototype._findMessageGroupAfterRebinding=function(){var a=this.oMessagePopover.getItems();this._checkControlIdInSections(a,true);};h.prototype._getViewId=function(a){var V,b=sap.ui.getCore().byId(a);while(b){if(b instanceof sap.ui.core.mvc.View){V=b.getId();break;}b=b.getParent();}return V;};return h;},true);
