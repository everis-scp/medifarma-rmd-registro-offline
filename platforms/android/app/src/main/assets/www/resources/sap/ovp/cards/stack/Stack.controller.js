sap.ui.define(["sap/ovp/cards/generic/Card.controller","sap/m/library","sap/ui/thirdparty/jquery","sap/ovp/ui/ObjectStream","sap/ovp/cards/AnnotationHelper","sap/ui/Device","sap/ui/base/BindingParser","sap/ui/core/ComponentContainer","sap/m/Link","sap/ovp/ui/CustomData","sap/ui/core/Icon","sap/m/FlexItemData","sap/m/Text","sap/m/VBox","sap/ovp/app/resources","sap/base/Log","sap/base/util/merge"],function(C,S,q,O,A,D,B,a,L,b,I,F,T,V,c,d,m){"use strict";var s=0;return C.extend("sap.ovp.cards.stack.Stack",{onInit:function(){C.prototype.onInit.apply(this,arguments);var v=this._oCard=this.getView().byId("stackContent");v.addEventDelegate({onclick:this.openStack.bind(this),onkeydown:function(e){if(!e.shiftKey&&(e.keyCode==13||e.keyCode==32)){e.preventDefault();this.openStack();}}.bind(this)});if(D.system.phone){this.bAfterColumnUpdateAttached=false;this.bDeviceOrientationAttached=false;}this.quickViewCardContextArray=[];this.bQuickViewCardRendered=false;this._createObjectStream();},onExit:function(){if(this.oObjectStream){this.oObjectStream.destroy();}},addPlaceHolder:function(n){var v=this.getView();var o=v.getModel("ovpCardProperties");var e=o.getProperty("/objectStreamCardsNavigationProperty");var f=e?true:false;if(!f){var N=this.getEntityNavigationEntries();if(N.length>0){var g=N[0].label;if(this.sPlaceHolderText==undefined){this.sPlaceHolderText=c.getText("PlaceHolder_default");}var p=this._createPlaceHolder(n,this.sPlaceHolderText,g);var t=this;p.addEventDelegate({onclick:function(){t.doNavigation(null);}});this.oObjectStream.setPlaceHolder(p);}}},onAfterRendering:function(){C.prototype.onAfterRendering.apply(this,arguments);this.ovpLayout=sap.ui.getCore().byId("mainView--ovpLayout");if(D.system.phone){this._cardWidth=this.getView().$().width();if(!this.bAfterColumnUpdateAttached){var o=this.getOwnerComponent().getComponentData();if(o&&o.mainComponent&&o.appComponent.oOvpConfig&&o.appComponent.oOvpConfig.containerLayout!=="resizable"){var M=o.mainComponent,l=M.byId("ovpLayout");l.attachAfterColumnUpdate(function(E){this._setObjectStreamCardsSize(false);}.bind(this));this.bAfterColumnUpdateAttached=true;}}if(!this.bDeviceOrientationAttached){D.orientation.attachHandler(function(E){this._setObjectStreamCardsSize(true);}.bind(this));}}if(this.bSetErrorState&&this.bSetErrorState===true){this.setErrorState();return;}var v=this.getView();if(this.oObjectStream){var e=this.oObjectStream.getBinding("content");e.attachDataRequested(function(){if(this.getView().byId('stackSize')!==undefined&&this.getView().byId('stackTotalSize')!==undefined){q(this.getView().byId('stackSize').getDomRef()).css('visibility','hidden');q(this.getView().byId('stackTotalSize').getDomRef()).css('visibility','hidden');}},this);e.attachDataReceived(function(){var f=this.getView().getModel("ovpCardProperties").getObject("/category"),n=e.getCurrentContexts().length,g=e.getLength();v.byId("stackSize").setText(n);v.byId("stackTotalSize").setText(c.getText("Total_Size_Stack_Card",[g]));var h=this.getView().byId("stackContent").getDomRef();q(h).attr("aria-label",c.getText("stackCardContent",[n,g,f]));var i=this.getView().byId("stackSize").getDomRef();q(i).attr("aria-label",c.getText("stackCard",[n]));this.addPlaceHolder(g);if(this.getView().byId('stackSize')!==undefined&&this.getView().byId('stackTotalSize')!==undefined){q(this.getView().byId('stackSize').getDomRef()).css('visibility','visible');q(this.getView().byId('stackTotalSize').getDomRef()).css('visibility','visible');}var j=this.getView().getDomRef();var k=q(j).find('.sapOvpCardContentContainer');if(g!==0){if(k.length!==0){k.addClass('sapOvpCardNavigable');}}else{if(k.length!==0){var p=k.find("[role='button']");if(p.length!==0){p.removeAttr("role");}}}},this);this.addPlaceHolder("");if(e.bPendingRequest===false){e.fireDataReceived();}if(this.checkNavigation()){this.oObjectStream.getTitle().addStyleClass('sapOvpCardNavigable');}}},getCardItemsBinding:function(){return this.oObjectStream.getBinding("content");},_setObjectStreamCardsSize:function(i){var e=this.getView().$().width();if(this._cardWidth!=e||i){this.oObjectStream.setCardsSize(e);this._cardWidth=e;}},_createObjectStream:function(){if(this.oObjectStream instanceof O){return;}var o=this.getOwnerComponent();var e=o.getComponentData&&o.getComponentData();var p;var P;if(e.i18n){this.oi18n=e.i18n;}if(e&&e.mainComponent){p=e.mainComponent._getOvplibResourceBundle();}else{p=o.getOvplibResourceBundle();}P=o.getPreprocessors(p);this.oModel=e.model;this.oCardPropsModel=P.xml.ovpCardProperties;var E=this.oCardPropsModel.getProperty("/entitySet");var f=this.oCardPropsModel.getProperty("/objectStreamCardsSettings");this.oObjectStreamCardsSettings=f;var M=this.oModel.getMetaModel();var g=M.getODataEntitySet(E);var h=M.getODataEntityType(g.entityType);var i=this.oCardPropsModel.getProperty("/annotationPath");var j=(i)?i.split(","):[];if(e){this.oAppComponent=e.appComponent;this.oOwner=e.mainComponent;}if(this.oOwner){this.oGlobalFilter=this.oOwner.getView().byId("ovpGlobalFilter");}function k(K){if(K==="ovpCardProperties"){return this.oCardPropsModel;}else if(K==="dataModel"){return this.oModel;}else if(K==="_ovpCache"){return{};}}var l=[{getSetting:k.bind(this),bDummyContext:true},g].concat(j);var n=A.formatItems.apply(this,l);var r=B.complexParser(n);var t=this.oCardPropsModel.getProperty("/objectStreamCardsNavigationProperty");this.bStackFlavorAssociation=t?true:false;this.oStackFilterMapping;var u=this.oCardPropsModel.getProperty("/objectStreamCardsTemplate");if(this.bStackFlavorAssociation){if(u==="sap.ovp.cards.quickview"){d.error("objectStreamCardsTemplate cannot be 'sap.ovp.cards.quickview' when objectStreamCardsNavigationProperty is provided");this.bSetErrorState=true;return;}this.oStackFilterMapping=this._determineFilterPropertyId(this.oModel,g,h,t);f.entitySet=this.oModel.getMetaModel().getODataAssociationSetEnd(h,t).entitySet;}else{if(u!=="sap.ovp.cards.quickview"){d.error("objectStreamCardsTemplate must be 'sap.ovp.cards.quickview' when objectStreamCardsNavigationProperty is not provided");this.bSetErrorState=true;return;}var v=null;var w=this.oCardPropsModel.getProperty("/identificationAnnotationPath");var x=(w)?w.split(","):[];if(x&&x.length>1){v=x[1];}if(v){f.identificationAnnotationPath=v;}if(h["com.sap.vocabularies.UI.v1.HeaderInfo"]&&h["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName&&h["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String){f.title=h["com.sap.vocabularies.UI.v1.HeaderInfo"].TypeName.String;}else{f.title=h.name;}f.entitySet=E;}f.isObjectStream=true;r.factory=function(G,H){var J=new a();this.quickViewCardContextArray.push({sId:G,oContext:H,oComponentContainer:J});return J;}.bind(this);var y=this.oCardPropsModel.getObject("/title");this.sPlaceHolderText=this.oCardPropsModel.getObject("/itemText");var z=new L({text:y,subtle:true,press:this.handleObjectStreamTitlePressed.bind(this)}).addStyleClass("sapOvpObjectStreamHeader");z.addCustomData(new b({key:"tabindex",value:"0",writeToDom:true}));z.addCustomData(new b({key:"aria-label",value:y,writeToDom:true}));this.oObjectStream=new O(this.getView().getId()+"_ObjectStream",{title:z,content:r});this.oObjectStream.setModel(this.oModel);},_renderQuickViewCards:function(i,o,e){return new Promise(function(r,f){var g=this.oCardPropsModel.getProperty("/objectStreamCardsSettings"),h;if(this.bStackFlavorAssociation){h={filters:[{path:this.oStackFilterMapping.foreignKey,operator:"EQ",value1:o.getProperty(this.oStackFilterMapping.key)}]};g=q.extend(true,{},h,this.oObjectStreamCardsSettings);}var j={name:this.oCardPropsModel.getProperty("/objectStreamCardsTemplate"),async:true,componentData:{cardId:i,model:this.oModel,settings:g,appComponent:this.oAppComponent,mainComponent:this.oOwner}};if(this.oGlobalFilter){j.componentData.globalFilter={getUiState:this.oGlobalFilter.getUiState.bind(this.oGlobalFilter)};}var k=this.oi18n;sap.ui.component(j).then(function(l){l.setBindingContext(o);if(k){l.setModel(k,"@i18n");}e.setComponent(l);r();e.setBindingContext=function(o){l.setBindingContext(o);};});}.bind(this));},_determineFilterPropertyId:function(M,e,E,n){var N,f=E.namespace,r,o;for(var i=0;i<E.navigationProperty.length;i++){if(E.navigationProperty[i].name===n){N=E.navigationProperty[i];break;}}r=N.relationship;o=A.getAssociationObject(M,r,f);var R=o.referentialConstraint,g={};if(R){g.foreignKey=R.dependent.propertyRef[0].name;g.key=R.principal.propertyRef[0].name;return g;}},_createPlaceHolder:function(n,p,e){var i=new I({src:"sap-icon://display-more",useIconTooltip:false,layoutData:new F({alignSelf:S.FlexAlignSelf.Center,styleClass:"sapOvpStackPlaceHolderIconContainer"})});i.addStyleClass("sapOvpStackPlaceHolderIcon");var f=n+" "+p;var g=c.getText("SeeMoreContentAppName",[f,e]);var t=new T({text:g,textAlign:"Center",layoutData:new F({alignSelf:S.FlexAlignSelf.Center,maxWidth:"14rem"})});t.addCustomData(new b({key:"role",value:"heading",writeToDom:true}));t.addCustomData(new b({key:"aria-label",value:g,writeToDom:true}));t.addStyleClass("sapOvpStackPlaceHolderTextLine");var o=new V({items:[t]});o.addStyleClass("sapOvpStackPlaceHolderLabelsContainer");o.addCustomData(new b({key:"tabindex",value:"0",writeToDom:true}));o.addCustomData(new b({key:"role",value:"button",writeToDom:true}));var v=new V({items:[i,o]});v.addStyleClass("sapOvpStackPlaceHolder");v.addEventDelegate({onkeydown:function(E){if(!E.shiftKey&&(E.keyCode==13||E.keyCode==32)){E.preventDefault();E.srcControl.$().click();}}});return v;},_openStack:function(){if(this.oObjectStream){var l=this.oObjectStream.getBinding("content");if(l.getCurrentContexts().length>0){var e=this.getView().$().width();this.getView().addDependent(this.oObjectStream);this.oObjectStream.setModel(this.getView().getModel("@i18n"),"@i18n");this.oObjectStream.open(e,this._oCard);}}this.ovpLayout.setActive(true);},openStack:function(){this.ovpLayout.setActive(false);if(this.oObjectStream.getNewContentAvailable()){var e=[];for(var i=s;i<this.quickViewCardContextArray.length;i++){e.push(this._renderQuickViewCards(this.quickViewCardContextArray[i].sId,this.quickViewCardContextArray[i].oContext,this.quickViewCardContextArray[i].oComponentContainer));}this.oObjectStream.setNewContentAvailable(false);s=this.quickViewCardContextArray.length;Promise.all(e).then(function(){this.bQuickViewCardRendered=true;this._openStack();}.bind(this));}else{this._openStack();}},handleObjectStreamTitlePressed:function(e){this.doNavigation(null);}});});