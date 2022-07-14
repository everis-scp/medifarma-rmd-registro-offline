// Copyright (c) 2009-2020 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/Device","sap/ushell/utils","sap/ushell/resources","sap/m/Text","sap/m/VBox","sap/m/CustomListItem","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/model/json/JSONModel","sap/m/MessageToast","sap/m/library","sap/ui/core/library"],function(D,u,r,T,V,C,q,K,L,J,M,m,c){"use strict";var P=c.Priority;var a=m.ListType;var F=m.FlexAlignItems;sap.ui.controller("sap.ushell.components.shell.Notifications.Notifications",{oPagingConfiguration:{MAX_NOTIFICATION_ITEMS_DESKTOP:400,MAX_NOTIFICATION_ITEMS_MOBILE:100,MIN_NOTIFICATION_ITEMS_PER_BUFFER:15,NOTIFICATION_ITEM_HEIGHT:(D.system.phone||D.system.tablet)?130:100,TAB_BAR_HEIGHT:100},onInit:function(){var i={};if(D.system.desktop){this.iMaxNotificationItemsForDevice=this.oPagingConfiguration.MAX_NOTIFICATION_ITEMS_DESKTOP;}else{this.iMaxNotificationItemsForDevice=this.oPagingConfiguration.MAX_NOTIFICATION_ITEMS_MOBILE;}this.oNotificationsService=sap.ushell.Container.getService("Notifications");this.oSortingType=this.oNotificationsService.getOperationEnum();i[this.oSortingType.NOTIFICATIONS_BY_DATE_DESCENDING]=this.getInitialSortingModelStructure();i[this.oSortingType.NOTIFICATIONS_BY_DATE_ASCENDING]=this.getInitialSortingModelStructure();i[this.oSortingType.NOTIFICATIONS_BY_PRIORITY_DESCENDING]=this.getInitialSortingModelStructure();i[this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING]={};this.sCurrentSorting=this.oSortingType.NOTIFICATIONS_BY_DATE_DESCENDING;this.oPreviousByDateSorting=this.oSortingType.NOTIFICATIONS_BY_DATE_DESCENDING;this.oPreviousTabKey="sapUshellNotificationIconTabByDate";this.sCurrentExpandedType=undefined;var o=new J(i);o.setSizeLimit(1500);this.getView().setModel(o);this.getView().setModel(r.i18nModel,"i18n");this.getNextBuffer();this._oTopNotificationData=undefined;},onAfterRendering:function(){this.removeTabIndexFromList(this.sCurrentSorting);var t=this.getView().byId("notificationIconTabBar--header");if(t){t.getDomRef().classList.remove("sapContrastPlus");}if(this.sCurrentSorting!==this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING){if(this._oTopNotificationData){this.scrollToItem(this._oTopNotificationData);}}this.getView().$("-sapUshellNotificationIconTabByDate-text").attr("aria-label",r.i18n.getText("Notifications.ByDateDescending.AriaLabel"));this.getView().$("-sapUshellNotificationIconTabByType-text").attr("aria-label",r.i18n.getText("Notifications.ByType.AriaLabel"));this.getView().$("-sapUshellNotificationIconTabByPrio-text").attr("aria-label",r.i18n.getText("Notifications.ByPriority.AriaLabel"));},shouldFetchMoreNotifications:function(){var h=this.getView().getModel().getProperty("/"+this.sCurrentSorting+"/hasMoreItemsInBackend"),l=this.getView().getModel().getProperty("/"+this.sCurrentSorting+"/listMaxReached");return h&&!l;},getNextBuffer:function(){var s=this.sCurrentSorting,b=this.getItemsFromModel(s),n,p,N;if(!this.shouldFetchMoreNotifications()){return;}N=this.getNumberOfItemsToFetchOnScroll(s);if(N===0){this.getView().getModel().setProperty("/"+s+"/hasMoreItems",false);return;}if(b!==undefined){n=b.length;}if(n===0){this.addBusyIndicatorToTabFilter(s);}this.getView().getModel().setProperty("/"+s+"/inUpdate",true);p=this.oNotificationsService.getNotificationsBufferBySortingType(s,n,N);p.done(function(R){var d=this.oNotificationsService._getNotificationSettingsAvalability();if(d.state()==="pending"){this.oNotificationsService._userSettingInitialization();}this.addBufferToModel(s,R);}.bind(this));p.fail(function(){if(n===0){this.removeBusyIndicatorToTabFilter(s);this.handleError();}}.bind(this));},getNextBufferForType:function(){var s=this.sCurrentExpandedType,S=this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING,g=this.getGroupFromModel(s),b=g?g.aNotifications:undefined,n=0,p,h=g?g.hasMoreItems:true;if(!h){return;}if(b!==undefined){n=b.length;}this.getView().getModel().setProperty("/"+S+"/inUpdate",true);p=this.oNotificationsService.getNotificationsBufferInGroup(s,n,this.iMaxNotificationItemsForDevice);p.done(function(R){this.addTypeBufferToModel(s,R,false);}.bind(this));p.fail(function(){this.getNextBufferFailHandler(S);}.bind(this));},addBufferToModel:function(s,R){var b=this.getItemsFromModel(s),i=b.length,d,h=R.length>=this.getNumberOfItemsToFetchOnScroll(s);this._oTopNotificationData=undefined;if(!R){this.getView().getModel().setProperty("/"+s+"/hasMoreItemsInBackend",false);return;}this.getView().getModel().setProperty("/"+s+"/hasMoreItemsInBackend",h);d=b.concat(R);this.getView().getModel().setProperty("/"+s+"/aNotifications",d);this.getView().getModel().setProperty("/"+s+"/inUpdate",false);if(d.length>=this.iMaxNotificationItemsForDevice){this.handleMaxReached(s);}if(i===0){this.removeBusyIndicatorToTabFilter(s);}},addTypeBufferToModel:function(t,R,o){var g=this.getGroupFromModel(t),G=this.getGroupIndexFromModel(t),b=this.getView().getModel().getProperty("/"+this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING),d;if(!R){return;}if(R.length<this.getBasicBufferSize()){g.hasMoreItems=false;}if(!g.aNotifications||o){g.aNotifications=[];}d=g.aNotifications.concat(R);b[G].aNotifications=d;b[G].Busy=false;this.getView().getModel().setProperty("/"+this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING,b);this.getView().getModel().setProperty("/"+this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING+"/inUpdate",false);},keydownHandler:function(k){var j,n,b;if(k.keyCode===K.DELETE){j=q(document.activeElement);if(j.hasClass("sapUshellNotificationsListItem")){n=j.next();b=j.find(".sapMNLB-CloseButton")[0];sap.ui.getCore().byId(b.id).firePress();if(n){n.focus();}}}},notificationsUpdateCallback:function(d){var t=this,s=this.sCurrentSorting,b,n,N;if(s===this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING){this.notificationsUpdateCallbackForType();d.resolve();return;}b=this.getItemsFromModel(s);if(b!==undefined){n=b.length;}this.cleanModel();N=this.getNumberOfItemsToFetchOnUpdate(n);this.oNotificationsService.getNotificationsBufferBySortingType(s,0,N).done(function(e){if(!e){return;}d.resolve();t.replaceItemsInModel(s,e,N);}).fail(function(e){L.error("Notifications control - call to notificationsService.getNotificationsBufferBySortingType failed: ",e,"sap.ushell.components.shell.Notifications.Notifications");});},isMoreCircleExist:function(s){var S=this.getNotificationList(s),i=S.getItems().length,l=S.getItems()[i-1];return!!i&&l.getMetadata().getName()==="sap.m.CustomListItem";},handleMaxReached:function(s){var S=this.getNotificationList(s),n=Math.floor(this.oNotificationsService.getNotificationsCount()),i=n-this.iMaxNotificationItemsForDevice,I=this.isMoreCircleExist(s);this.getView().getModel().setProperty("/"+this.sCurrentSorting+"/moreNotificationCount",i);this.getView().getModel().setProperty("/"+this.sCurrentSorting+"/listMaxReached",i>=0);if(i>0&&!I){S.addItem(this.getMoreCircle(this.sCurrentSorting));}else if(i<=0&&I){S.removeItem(this.oMoreListItem);}},reAddFailedGroup:function(g){var o=this.getView().getModel(),G=o.getProperty("/notificationsByTypeDescending");G.splice(g.removedGroupIndex,0,g.oGroup);o.setProperty("/notificationsByTypeDescending",G);},removeGroupFromModel:function(g){var o=this.getView().getModel(),G=o.getProperty("/notificationsByTypeDescending"),R={oGroup:g,removedGroupIndex:undefined};G.some(function(b,i){if(b.Id===g.Id){R.removedGroupIndex=i;G.splice(i,1);o.setProperty("/notificationsByTypeDescending",G);return true;}return false;});this.sCurrentExpandedType=undefined;return R;},updateGroupHeaders:function(){var p=this.oNotificationsService.getNotificationsGroupHeaders(),t=this,g=t.getView().getModel().getProperty("/"+t.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING);p.fail(function(d){L.error("Notifications control - call to notificationsService.updateGroupHeaders failed: ",d,"sap.ushell.components.shell.Notifications.Notifications");});p.done(function(n){var j=JSON.parse(n),b=j.value;b.forEach(function(i){var f=false;g.forEach(function(d,I){if(d.Id===i.Id){g[I].GroupHeaderText=i.GroupHeaderText;g[I].CreatedAt=i.CreatedAt;f=true;}});if(!f){g.unshift(i);}});t.getView().getModel().setProperty("/"+t.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING,g);});},reloadGroupHeaders:function(){var p=this.oNotificationsService.getNotificationsGroupHeaders(),t=this;p.fail(function(d){L.error("Notifications control - call to notificationsService.getNotificationsGroupHeaders failed: ",d,"sap.ushell.components.shell.Notifications.Notifications");t.removeBusyIndicatorToTabFilter(t.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING);});p.done(function(n){var j=JSON.parse(n),b=j.value,d=[];b.forEach(function(i){if(i.IsGroupHeader){i.Collapsed=true;d.push(i);}});t.getView().getModel().setProperty("/"+t.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING,d);t.removeBusyIndicatorToTabFilter(t.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING);});},markRead:function(n){var p=this.oNotificationsService.markRead(n),t=this;p.fail(function(){sap.ushell.Container.getService("Message").error(r.i18n.getText("notificationsFailedMarkRead"));t.setMarkReadOnModel(n,false);});this.setMarkReadOnModel(n,true);},onExit:function(){},onBeforeRendering:function(){if(!this._bDependencyCallbackRegistered){this._bDependencyCallbackRegistered=true;this.oNotificationsService.registerDependencyNotificationsUpdateCallback(this.notificationsUpdateCallback.bind(this),false);}},executeAction:function(n,A){return this.oNotificationsService.executeAction(n,A);},executeBulkAction:function(A,s,g,p){var t=g,o=this.oNotificationsService.executeBulkAction(g.Id,A),b,G=s,n=this.getView().getModel().getProperty(p+"/NotificationTypeDesc"),d=this;if(n===""){n=this.getView().getModel().getProperty(p+"/NotificationTypeKey");}o.fail(function(R){this.getView().getModel().setProperty(p+"/Busy",false);if(R&&R.succededNotifications&&R.succededNotifications.length){R.succededNotifications.forEach(function(N){this.removeNotificationFromModel(N);}.bind(this));d.cleanModel();}if(R.succededNotifications.length===1){b=r.i18n.getText("notificationsPartialSuccessExecuteBulkAction",[G,R.succededNotifications.length,R.failedNotifications.length+R.succededNotifications.length,n,R.failedNotifications.length]);M.show(b,{duration:4000});}else if(R.succededNotifications.length>1){b=r.i18n.getText("notificationsSingleSuccessExecuteBulkAction",[G,R.succededNotifications.length,R.failedNotifications.length+R.succededNotifications.length,n,R.failedNotifications.length]);M.show(b,{duration:4000});}else{b=r.i18n.getText("notificationsFailedExecuteBulkAction");sap.ushell.Container.getService("Message").error(b);}}.bind(this));o.done(function(){b=r.i18n.getText("notificationsSuccessExecuteBulkAction",[G,n]);M.show(b,{duration:4000});this.removeGroupFromModel(t);this.cleanModel();}.bind(this));},dismissNotification:function(n){var t=this,R=this.removeNotificationFromModel(n),p=this.oNotificationsService.dismissNotification(n);this.cleanModel();p.fail(function(){sap.ushell.Container.getService("Message").error(r.i18n.getText("notificationsFailedDismiss"));t.addNotificationToModel(R.obj,R.index);});},dismissBulkNotifications:function(g){var R=this.removeGroupFromModel(g),p=this.oNotificationsService.dismissBulkNotifications(g.Id);this.cleanModel();p.fail(function(){sap.ushell.Container.getService("Message").error(r.i18n.getText("notificationsFailedExecuteBulkAction"));this.reAddFailedGroup(R);}.bind(this));},onListItemPress:function(n,s,A,p){var v=sap.ui.getCore().byId("viewPortContainer");if(v){v.switchState("Center");}u.toExternalWithParameters(s,A,p);this.markRead(n);},scrollToItem:function(t){var j=this._getJqNotificationObjects(),b=j[0],d=j[1],e=j[2],f=j[3],i,n,g,h,k;if(b.length>0&&d.length>0&&e.length>0&&f.length>0){i=f.outerHeight(true)-window.parseInt(f.css("margin-top").replace("px",""));n=this.getIndexInModelByItemId(t.topItemId);n=n||0;g=n*i+window.parseInt(f.css("margin-top").replace("px",""));h=window.parseInt(d.css("padding-top").replace("px",""))+window.parseInt(e.css("padding-top").replace("px",""));k=b.offset().top;b.scrollTop(g+h+k-t.offSetTop);}this._oTopNotificationData=undefined;},_getJqNotificationObjects:function(){var j=q("#notificationIconTabBar-containerContent"),b=j.children(),d=b.children(),e=j.find("li").eq(0);return[j,b,d,e];},getTopOffSet:function(){var t=0,j=this._getJqNotificationObjects()[0];if(j.children().length>0&&j.children().children().length>0){t+=j.children().outerHeight()-j.children().height();t+=j.children().children().outerHeight()-j.children().children().height();}return t;},getTopItemOnTheScreen:function(){var j=this._getJqNotificationObjects()[0],t=0,i,b=0,d=this;t=this.getTopOffSet();j.find("li").each(function(){b=q(this).offset().top;if(b>=t){i=d.getItemNotificationId(this);return false;}});return{topItemId:i,offSetTop:b};},handleError:function(){try{sap.ushell.Container.getService("Message").error(r.i18n.getText("errorOccurredMsg"));}catch(e){L.error("Getting Message service failed.");}},addBusyIndicatorToTabFilter:function(s){var l=this.getNotificationList(s);l.setBusy(true);l.setShowNoData(false);},removeBusyIndicatorToTabFilter:function(s){var l=this.getNotificationList(s);l.setBusy(false);l.setShowNoData(true);},addNotificationToModel:function(n,i){var o=this.getView().getModel(),b=o.getProperty("/"+this.sCurrentSorting+"/aNotifications");b.splice(i,0,n);o.setProperty("/"+this.sCurrentSorting+"/aNotifications",b);},removeNotificationFromModel:function(n){var o=this.getView().getModel(),g,b,N,R={};if(this.sCurrentSorting===this.oSortingType.NOTIFICATIONS_BY_DATE_DESCENDING||this.sCurrentSorting===this.oSortingType.NOTIFICATIONS_BY_DATE_ASCENDING||this.sCurrentSorting===this.oSortingType.NOTIFICATIONS_BY_PRIORITY_DESCENDING){N="/"+this.sCurrentSorting+"/aNotifications";b=o.getProperty(N);b.some(function(d,i,e){if(d.Id&&d.Id===n){R.obj=e.splice(i,1)[0];R.index=i;return true;}return false;});o.setProperty(N,b);return R;}g=o.getProperty("/notificationsByTypeDescending");for(var i=0;i<g.length;i++){b=g[i].aNotifications;if(b){if(b.length===1&&b[0].Id===n){g.splice(i,1);}else{b.some(function(d,i,e){if(d.Id&&d.Id===n){R.obj=e.splice(i,1)[0];R.index=i;return true;}return false;});g[i].aNotifications=b;}}}this.updateGroupHeaders();o.setProperty("/notificationsByTypeDescending",g);return R;},getIndexInModelByItemId:function(n){var N,i;if(this.notificationsByTypeDescending===this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING){N=this.getView().getModel().getProperty("/"+this.sCurrentExpandedType+"/aNotifications");}else{N=this.getView().getModel().getProperty("/"+this.sCurrentSorting+"/aNotifications");}if(N===undefined||N.length===0){return 0;}for(i=0;i<N.length;i++){if(N[i].Id===n){return i;}}},cleanModel:function(){var t=this,s=this.getView().getModel().getProperty("/");Object.keys(s).forEach(function(S){if(S!==t.sCurrentSorting&&S!==t.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING){s[S]=t.getInitialSortingModelStructure();}});this.getView().getModel().setProperty("/",s);},replaceItemsInModel:function(s,R,n){var b=this.getItemsFromModel(s),i=b.length,h=R.length>=n;if(i){this._oTopNotificationData=this.getTopItemOnTheScreen();}this.getView().getModel().setProperty("/"+s+"/hasMoreItemsInBackend",h);this.getView().getModel().setProperty("/"+s+"/aNotifications",R);this.getView().getModel().setProperty("/"+s+"/inUpdate",false);this.handleMaxReached(s);},setMarkReadOnModel:function(n,I){var o=this.getView().getModel(),p="/"+this.sCurrentSorting,N,d,g,i;d=o.getProperty(p);if(this.sCurrentSorting==="notificationsByTypeDescending"){for(i=0;i<d.length;i++){if(d[i].Id===this.sCurrentExpandedType){p=p+"/"+i;g=true;break;}}if(!g){return;}}p=p+"/aNotifications";N=o.getProperty(p);N.some(function(b){if(b.Id===n){b.IsRead=I;return true;}return false;});o.setProperty(p,N);},onTabSelected:function(e){var k=e.getParameter("key");if(k==="sapUshellNotificationIconTabByDate"){var b;if(this.oPreviousTabKey==="sapUshellNotificationIconTabByDate"){b=this.sCurrentSorting===this.oSortingType.NOTIFICATIONS_BY_DATE_DESCENDING?this.oSortingType.NOTIFICATIONS_BY_DATE_ASCENDING:this.oSortingType.NOTIFICATIONS_BY_DATE_DESCENDING;this._changeDateListBinding(b,e.getParameter("item"));this.oPreviousByDateSorting=b;}else{b=this.oPreviousByDateSorting;}this.sCurrentSorting=b;if(this.getItemsFromModel(b).length===0){this.getNextBuffer(b);}}else if(k==="sapUshellNotificationIconTabByType"&&this.oPreviousTabKey!=="sapUshellNotificationIconTabByType"){this.sCurrentSorting=this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING;this.addBusyIndicatorToTabFilter(this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING);this.reloadGroupHeaders();this.getView().byId("notificationIconTabBar").addStyleClass("sapUshellNotificationIconTabByTypeWithBusyIndicator");}else{this.sCurrentSorting=this.oSortingType.NOTIFICATIONS_BY_PRIORITY_DESCENDING;if(this.getItemsFromModel(this.oSortingType.NOTIFICATIONS_BY_PRIORITY_DESCENDING).length===0){this.getNextBuffer(this.oSortingType.NOTIFICATIONS_BY_PRIORITY_DESCENDING);}}this.oPreviousTabKey=k;},_changeDateListBinding:function(s,t){var l=new Promise(function(b,d){sap.ui.require(["sap/ui/core/Fragment"],function(e){e.load({name:"sap.ushell.components.shell.Notifications.NotificationsListItem",type:"XML",controller:this}).then(b).catch(d);}.bind(this),d);}.bind(this));if(s===this.oSortingType.NOTIFICATIONS_BY_DATE_DESCENDING){t.$("text").attr("aria-label",r.i18n.getText("Notifications.ByDateDescending.AriaLabel"));l.then(function(f){this.getView().byId("sapUshellNotificationsListDate").bindItems("/notificationsByDateDescending/aNotifications",f);}.bind(this));}else{t.$("text").attr("aria-label",r.i18n.getText("Notifications.ByDateAscending.AriaLabel"));l.then(function(f){this.getView().byId("sapUshellNotificationsListDate").bindItems("/notificationsByDateAscending/aNotifications",f);}.bind(this));}},onNotificationItemPress:function(e){var o=e.getSource().getBindingContextPath(),b=this.getView().getModel().getProperty(o),s=b.NavigationTargetObject,A=b.NavigationTargetAction,p=b.NavigationTargetParams,n=b.Id;this.onListItemPress(n,s,A,p);},onNotificationItemClose:function(e){this._retainFocus();var n=e.getSource().getBindingContextPath(),N=this.getView().getModel().getProperty(n),s=N.Id;this.dismissNotification(s);},onNotificationItemButtonPress:function(e){this._retainFocus();var n=e.getSource().getBindingContext().getPath(),o=this.getView().getModel(),N=o.getProperty(n),p=n.split("/"),t=this.sCurrentSorting===this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING,s=t?"/"+p[1]+"/"+p[2]+"/"+p[3]+"/"+p[4]:"/"+p[1]+"/"+p[2]+"/"+p[3],b=o.getProperty(s),d=b.Id;o.setProperty(s+"/Busy",true);this.executeAction(d,N.ActionId).done(function(f){if(f&&f.isSucessfull){sap.ui.require(["sap/m/MessageToast"],function(M){if(f.message&&f.message.length){M.show(f.message,{duration:4000});}else{var A=N.ActionText;M.show(r.i18n.getText("ActionAppliedToNotification",A),{duration:4000});}});if(f.DeleteOnReturn!==false){this.removeNotificationFromModel(d);sap.ushell.Container.getService("Notifications")._addDismissNotifications(d);this.cleanModel();}}else if(f){sap.ushell.Container.getService("Message").error(f.message);}else{sap.ushell.Container.getService("Message").error(r.i18n.getText("notificationsFailedExecuteAction"));}o.setProperty(s+"/Busy",false);}.bind(this)).fail(function(){o.setProperty(s+"/Busy",false);sap.ushell.Container.getService("Message").error(r.i18n.getText("notificationsFailedExecuteAction"));});},onNotificationGroupItemClose:function(e){var n=e.getSource().getBindingContext().getPath(),p=n.split("/"),s="/"+p[1]+"/"+p[2],N=this.getView().getModel().getProperty(s);this.dismissBulkNotifications(N);},onNotificationGroupItemCollapse:function(e){var g=e.getSource(),p=g.getBindingContext().getPath();if(!g.getCollapsed()){this.getView().getModel().setProperty(p+"/Busy",true);this.expandedGroupIndex=p.substring(p.lastIndexOf("/")+1);this.onExpandGroup(g);}},onNotificationGroupItemButtonPress:function(e){var o=this.getView().getModel(),n=e.getSource().getBindingContext().getPath(),N=o.getProperty(n),p=n.split("/"),s="/"+p[1]+"/"+p[2],b=o.getProperty(s);this._retainFocus();o.setProperty(s+"/Busy",true);this.executeBulkAction(N.ActionId,e.getSource().getProperty("text"),b,s);},onListUpdateStarted:function(e){if(e.getParameter("reason")==="Growing"){if(!this.getView().getModel().getProperty("/"+this.sCurrentSorting+"/inUpdate")){this.getNextBuffer();}}},getNumberOfItemsInScreen:function(){var i,h=this.getWindowSize();i=(h-this.oPagingConfiguration.TAB_BAR_HEIGHT)/this.oPagingConfiguration.NOTIFICATION_ITEM_HEIGHT;return Math.ceil(i);},getBasicBufferSize:function(){return Math.max(this.getNumberOfItemsInScreen()*3,this.oPagingConfiguration.MIN_NOTIFICATION_ITEMS_PER_BUFFER);},getWindowSize:function(){return q(window).height();},getNumberOfItemsToFetchOnScroll:function(s){var i=this.getItemsFromModel(s).length,b=this.getBasicBufferSize();if(i>=this.iMaxNotificationItemsForDevice){return 0;}if(i+b>this.iMaxNotificationItemsForDevice){return this.iMaxNotificationItemsForDevice-i;}return b;},getNumberOfItemsToFetchOnUpdate:function(n){var b=this.getBasicBufferSize(),N=Math.ceil(n/b),R;R=N>0?N*b:b;return R>this.iMaxNotificationItemsForDevice?this.iMaxNotificationItemsForDevice:R;},getItemsFromModel:function(s){if(s===undefined){s=this.sCurrentSorting;}return this.getView().getModel().getProperty("/"+s+"/aNotifications");},getItemsOfTypeFromModel:function(t){var g=this.getGroupFromModel(t);if(g){return g.aNotifications?g.aNotifications:[];}return[];},getGroupFromModel:function(t){var g=this.getView().getModel().getProperty("/"+this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING);return g.find(function(b){return b.Id===t;});},getGroupIndexFromModel:function(t){var g=this.getView().getModel().getProperty("/"+this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING),i;g.forEach(function(b,d){if(b.Id===t){i=d;return true;}});return i;},getItemNotificationId:function(e){var i,I;i=sap.ui.getCore().byId(e.getAttribute("Id")).getBindingContext().sPath;I=this.getView().getModel().getProperty(i+"/Id");return I;},getInitialSortingModelStructure:function(){return{hasMoreItemsInBackend:true,listMaxReached:false,aNotifications:[],inUpdate:false,moreNotificationCount:""};},onExpandGroup:function(g){var l=this.getView().byId("sapUshellNotificationsListType").getItems(),b=g.getId(),G=this.getView().getModel().getProperty(g.getBindingContextPath()),t=this;t.sCurrentExpandedType=G.Id;t.getView().getModel().setProperty(g.getBindingContextPath()+"/aNotifications",[]);t.getView().getModel().setProperty(g.getBindingContextPath()+"/hasMoreItems",true);l.forEach(function(i,d){if(i.getId()===b){t.getNextBufferForType();}else if(i.getId()!==b&&!i.getCollapsed()){i.setCollapsed(true);t.getView().getModel().setProperty(i.getBindingContextPath()+"/hasMoreItems",true);}});},notificationsUpdateCallbackForType:function(){var s=this.sCurrentExpandedType,S=this.oSortingType.NOTIFICATIONS_BY_TYPE_DESCENDING,g=this.getGroupFromModel(s),b=g?g.aNotifications:undefined,n=0,p;if(b!==undefined){n=b.length;}this.getView().getModel().setProperty("/"+S+"/inUpdate",true);this.updateGroupHeaders();if(s){p=this.oNotificationsService.getNotificationsBufferInGroup(s,0,this.getNumberOfItemsToFetchOnUpdate(n));p.done(function(R){this.addTypeBufferToModel(s,R,true);}.bind(this));p.fail(function(R){this.getNextBufferFailHandler(R);}.bind(this));}},getNotificationList:function(s){var l;if(s===this.oSortingType.NOTIFICATIONS_BY_DATE_DESCENDING||s===this.oSortingType.NOTIFICATIONS_BY_DATE_ASCENDING){l=this.getView().byId("sapUshellNotificationsListDate");}else if(s===this.oSortingType.NOTIFICATIONS_BY_PRIORITY_DESCENDING){l=this.getView().byId("sapUshellNotificationsListPriority");}else{l=this.getView().byId("sapUshellNotificationsListType");}return l;},removeTabIndexFromList:function(s){var l=this.getNotificationList(s);var o=l.$().children().get(1);if(o){o.removeAttribute("tabindex");}},getMoreCircle:function(t){var o=new T({text:r.i18n.getText("moreNotifications")}),n=new T({text:""}).addStyleClass("sapUshellNotificationsMoreCircleCount"),b=new V({items:[n,o],alignItems:F.Center}).addStyleClass("sapUshellNotificationsMoreCircle"),B=new T({text:r.i18n.getText("moreNotificationsAvailable_message"),textAlign:"Center"}).addStyleClass("sapUshellNotificationsMoreHelpingText"),d=new T({text:r.i18n.getText("processNotifications_message"),textAlign:"Center"}).addStyleClass("sapUshellNotificationsMoreHelpingText"),v=new V({items:[b,B,d]}).addStyleClass("sapUshellNotificationsMoreVBox"),l=new C({type:a.Inactive,content:v}).addStyleClass("sapUshellNotificationsMoreListItem");n.setModel(this.getView().getModel());n.bindText("/"+t+"/moreNotificationCount");this.oMoreListItem=l;return l;},_retainFocus:function(){var i=this.getView().byId("notificationIconTabBar"),k=i.getSelectedKey(),I=i.getItems(),s=0;I.forEach(function(o,b){if(o.getKey()===k){s=b;}});I[s].focus();},priorityFormatter:function(p){if(p){p=p.charAt(0)+p.substr(1).toLowerCase();return P[p];}}});});
