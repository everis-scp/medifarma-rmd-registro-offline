/*
 * ! SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/comp/library','sap/m/library','sap/m/List','sap/m/ResponsivePopover','sap/m/StandardListItem','sap/m/Token','sap/m/Table','sap/m/ColumnListItem','sap/m/Label','./BaseValueListProvider','sap/ui/comp/util/FormatUtil','sap/ui/comp/util/DateTimeUtil','sap/ui/model/json/JSONModel','sap/ui/core/format/DateFormat','sap/ui/Device','sap/ui/comp/smartfilterbar/SmartFilterBar','sap/ui/model/Sorter','sap/base/util/merge','sap/ui/model/Filter','sap/ui/model/FilterOperator','sap/base/strings/capitalize'],function(q,l,L,a,R,S,T,b,C,c,B,F,D,J,d,e,f,g,m,h,j){"use strict";var P=L.PlacementType;var V=l.valuehelpdialog.ValueHelpRangeOperation;var k={DeprecatedCode:"W",RevokedCode:"E",ValidCode:""};var n=L.ListMode;var o;var p=B.extend("sap.ui.comp.providers.ValueHelpProvider",{constructor:function(i){if(!f){f=sap.ui.require("sap/ui/comp/smartfilterbar/SmartFilterBar");}if(i){this.preventInitialDataFetchInValueHelpDialog=!!i.preventInitialDataFetchInValueHelpDialog;this.sTitle=i.title;this.bSupportMultiselect=!!i.supportMultiSelect;this.bSupportRanges=!!i.supportRanges;this.bIsSingleIntervalRange=!!i.isSingleIntervalRange;this.bIsUnrestrictedFilter=!!i.isUnrestrictedFilter;this.bTakeOverInputValue=(i.takeOverInputValue===false)?false:true;this._sScale=i.scale;this._sPrecision=i.precision;if(this.bIsSingleIntervalRange){this.bSupportRanges=true;}}B.apply(this,arguments);this._onInitialise();}});p.prototype._onInitialise=function(){if(this.oControl.attachValueHelpRequest){this._fVHRequested=function(E){if(!this.bInitialised){return;}var s=E.getParameter("_userInputValue");this.oControl=E.getSource();this.bForceTriggerDataRetreival=E.getParameter("fromSuggestions");if(this.bSupportBasicSearch&&(this.bTakeOverInputValue||this.bForceTriggerDataRetreival)&&(s||s==="")){this.sBasicSearchText=s;}this._createValueHelpDialog();}.bind(this);this.oControl.attachValueHelpRequest(this._fVHRequested);}};p.prototype._createValueHelpDialog=function(){if(!this.bCreated){this.bCreated=true;if(!this._oValueHelpDialogClass){sap.ui.require(['sap/ui/comp/valuehelpdialog/ValueHelpDialog'],this._onValueHelpDialogRequired.bind(this));}else{this._onValueHelpDialogRequired(this._oValueHelpDialogClass);}}};p.prototype._getTitle=function(){if(this.sTitle){return this.sTitle;}else if(this.oFilterProvider){return this.oFilterProvider._determineFieldLabel(this._fieldViewMetadata);}return"";};p.prototype._onValueHelpDialogRequired=function(i){this._oValueHelpDialogClass=i;var v=this.oControl.getId()+"-valueHelpDialog";this.oValueHelpDialog=new i(v,{stretch:e.system.phone,basicSearchText:this.sBasicSearchText,supportRangesOnly:this.bIsSingleIntervalRange||!this.oPrimaryValueListAnnotation,supportMultiselect:this.bSupportMultiselect,title:this._getTitle(),supportRanges:this.bSupportRanges,displayFormat:this.sDisplayFormat,ok:this._onOK.bind(this),cancel:this._onCancel.bind(this),afterClose:function(){if(this.oPrimaryValueListAnnotation){this._resolveAnnotationData(this.oPrimaryValueListAnnotation);}this.oValueHelpDialog.destroy();this.bCreated=false;if(this.oControl&&this.oControl.focus&&!e.system.phone){this.oControl.focus();}}.bind(this)});this.oValueHelpDialog.setProperty("_enhancedExcludeOperations",true);this.oControl.addDependent(this.oValueHelpDialog);this.oValueHelpDialog.suggest(function(r,s){if(this.oPrimaryValueListAnnotation){var u=function(o){r.setShowSuggestion(true);r.setFilterSuggests(false);r._oSuggestProvider=new o({fieldName:s,control:r,model:this.oODataModel,displayFormat:this.sDisplayFormat,resolveInOutParams:false,displayBehaviour:this.sTokenDisplayBehaviour,annotation:this.oPrimaryValueListAnnotation,fieldViewMetadata:this._fieldViewMetadata,maxLength:this._sMaxLength,filterModel:this.oFilterModel,aggregation:"suggestionRows",typeAheadEnabled:true,enableShowTableSuggestionValueHelp:false});}.bind(this);o=sap.ui.require('sap/ui/comp/providers/ValueListProvider');if(!o){sap.ui.require(['sap/ui/comp/providers/ValueListProvider'],u);}else{u(o);return r._oSuggestProvider;}return null;}}.bind(this));if(this.bIsSingleIntervalRange){this.oValueHelpDialog.setIncludeRangeOperations([V.BT,V.EQ],this._sType);this.oValueHelpDialog.setMaxIncludeRanges(1);this.oValueHelpDialog.setMaxExcludeRanges(0);this.oValueHelpDialog.bIsSingleIntervalRange=this.bIsSingleIntervalRange;this._updateInitialInterval();}else if((this._sType==="date"||this._sType==="time"||this._sType==="datetime")&&!this.bIsUnrestrictedFilter){this.oValueHelpDialog.setIncludeRangeOperations([V.EQ],this._sType);this.oValueHelpDialog.setMaxExcludeRanges(0);}if(this.oControl.$()&&this.oControl.$().closest(".sapUiSizeCompact").length>0){this.oValueHelpDialog.addStyleClass("sapUiSizeCompact");}else if(this.oControl.$()&&this.oControl.$().closest(".sapUiSizeCozy").length>0){this.oValueHelpDialog.addStyleClass("sapUiSizeCozy");}else if(q("body").hasClass("sapUiSizeCompact")){this.oValueHelpDialog.addStyleClass("sapUiSizeCompact");}else{this.oValueHelpDialog.addStyleClass("sapUiSizeCozy");}if(this.bSupportRanges){this.oValueHelpDialog.setRangeKeyFields([{label:this._getTitle(),key:this.sFieldName,typeInstance:this._fieldViewMetadata?this._fieldViewMetadata.ui5Type:null,type:this._sType,formatSettings:this._sType==="numc"?{isDigitSequence:true,maxLength:this._sMaxLength}:Object.assign({},this._oDateFormatSettings,{UTC:false}),scale:this._sScale,precision:this._sPrecision,maxLength:this._sMaxLength,nullable:this._fieldViewMetadata?this._fieldViewMetadata.nullable:false}]);}if(!(this.bIsSingleIntervalRange||!this.oPrimaryValueListAnnotation)){this.oValueHelpDialog.setModel(this.oODataModel);this._createAdditionalValueHelpControls();this._createCollectiveSearchControls();}if(this.oControl.getTokens){var t=this.oControl.getTokens();if(t){t=this._adaptTokensFromFilterBar(t);this.oValueHelpDialog.setTokens(t);}}return Promise.resolve().then(this.oValueHelpDialog.open.bind(this.oValueHelpDialog));};p.prototype._adaptTokensFromFilterBar=function(t){var r,s,u,v=t;if(this.oFilterProvider&&t&&this._sType==="time"){v=[];for(var i=0;i<t.length;i++){r=m({},t[i]);s=r.data("range");if(s){s=m({},s);if(s.value1 instanceof Date){u=D.localToUtc(s.value1);s.value1={__edmType:"Edm.Time",ms:u.getTime()};}if(s.value2 instanceof Date){u=D.localToUtc(s.value2);s.value2={__edmType:"Edm.Time",ms:u.getTime()};}r.data("range",s);v.push(r);}}}return v;};p.prototype._updateInitialInterval=function(){var i=this.oControl.getValue(),t,r,v,s,u;if(i){t=new T();r={exclude:false,keyField:this.sFieldName};if(this._sType==="numeric"){v=F.parseFilterNumericIntervalData(i);if(v.length==0){v.push(i);}}else if(this._sType==="datetime"){v=F.parseDateTimeOffsetInterval(i);s=d.getDateTimeInstance(Object.assign({},this._oDateFormatSettings,{UTC:false}));u=s.parse(v[0]);v[0]=u?u:new Date(v[0]);if(v.length===2){u=s.parse(v[1]);v[1]=u?u:new Date(v[1]);}}else{v=i.split("-");}if(v&&v.length===2){r.operation="BT";r.value1=v[0];r.value2=v[1];}else{r.operation="EQ";r.value1=v[0];}t.data("range",r);}if(t){this.oValueHelpDialog.setTokens([t]);}};p.prototype._createCollectiveSearchControls=function(){var r,s,I,i=0,t=0,O,A,u;if(this.additionalAnnotations&&this.additionalAnnotations.length){O=function(E){var v=E.getParameter("listItem"),w;r.close();if(v){w=v.data("_annotation");if(w){this._triggerAnnotationChange(w);}}}.bind(this);s=new a({mode:n.SingleSelectMaster,selectionChange:O});u=sap.ui.getCore().getLibraryResourceBundle("sap.ui.comp");r=new R({placement:P.Bottom,showHeader:true,contentHeight:"30rem",title:u.getText("COLLECTIVE_SEARCH_SELECTION_TITLE"),content:[s],afterClose:function(){this.oValueHelpDialog._rotateSelectionButtonIcon(false);}.bind(this)});I=new S({title:this.oPrimaryValueListAnnotation.valueListTitle});I.data("_annotation",this.oPrimaryValueListAnnotation);s.addItem(I);s.setSelectedItem(I);this.oValueHelpDialog.oSelectionTitle.applySettings({text:this.oPrimaryValueListAnnotation.valueListTitle,tooltip:this.oPrimaryValueListAnnotation.valueListTitle});t=this.additionalAnnotations.length;for(i=0;i<t;i++){A=this.additionalAnnotations[i];I=new S({title:A.valueListTitle});I.data("_annotation",A);s.addItem(I);}this.oValueHelpDialog.oSelectionButton.setVisible(true);this.oValueHelpDialog.oSelectionTitle.setVisible(true);this.oValueHelpDialog.oSelectionButton.attachPress(function(){if(!r.isOpen()){this.oValueHelpDialog._rotateSelectionButtonIcon(true);r.openBy(this.oValueHelpDialog.oSelectionButton);}else{r.close();}}.bind(this));}};p.prototype._triggerAnnotationChange=function(A){this.oValueHelpDialog.oSelectionTitle.applySettings({text:A.valueListTitle,tooltip:A.valueListTitle});this.oValueHelpDialog.resetTableState();this._resolveAnnotationData(A);this._createAdditionalValueHelpControls();};p.prototype._createAdditionalValueHelpControls=function(){var s=null;this.oValueHelpDialog.setKey(this.sKey);this.oValueHelpDialog.setKeys(this._aKeys);this.oValueHelpDialog.setDescriptionKey(this.sDescription);this.oValueHelpDialog.setTokenDisplayBehaviour(this.sTokenDisplayBehaviour);var i=new J();i.setData({cols:this._aCols});this.oValueHelpDialog.setModel(i,"columns");if(this.bSupportBasicSearch){s=this.sKey;}if(this.oSmartFilterBar){this.oSmartFilterBar._setCollectiveSearch(null);this.oSmartFilterBar.destroy();}this.oSmartFilterBar=new f(this.oValueHelpDialog.getId()+"-smartFilterBar",{entitySet:this.sValueListEntitySetName,basicSearchFieldName:s,enableBasicSearch:this.bSupportBasicSearch,isRunningInValueHelpDialog:true,advancedMode:true,showGoOnFB:!e.system.phone,filterBarExpanded:false,search:this._onFilterBarSearchPressed.bind(this),reset:this._onFilterBarResetPressed.bind(this),filterChange:this._onFilterBarFilterChange.bind(this),initialise:this._onFilterBarInitialise.bind(this)});if(this._oDateFormatSettings){this.oSmartFilterBar.data("dateFormatSettings",this._oDateFormatSettings);}if(this.oPrimaryValueListAnnotation&&this.oPrimaryValueListAnnotation.constParams){this.oSmartFilterBar.data("hiddenFields",Object.keys(this.oPrimaryValueListAnnotation.constParams));}this.oValueHelpDialog.setFilterBar(this.oSmartFilterBar);};p.prototype._onFilterBarFilterChange=function(){if(!this._bIgnoreFilterChange){this.oValueHelpDialog.getTableAsync().then(function(t){t.setShowOverlay(true);this.oValueHelpDialog.TableStateSearchData();}.bind(this));}};p.prototype._expandFilterBar=function(){var A=this.oFilterProvider&&this.oFilterProvider._oAdditionalConfiguration,i=A?A.getControlConfigurationByKey(this._fieldViewMetadata.fieldName):null;if(this.oSmartFilterBar._hasMandatoryFields()){this.oSmartFilterBar.setFilterBarExpanded(true);this.oSmartFilterBar._bShowAllFilters=true;this.oSmartFilterBar.rerenderFilters();}else if(!this.bSupportBasicSearch||(this.oFilterProvider&&this.oFilterProvider._getPreventInitialDataFetchInValueHelpDialog(this._fieldViewMetadata,i))){this.oSmartFilterBar.setFilterBarExpanded(true);}};p.prototype._onFilterBarSearchPressed=function(){this._rebindTable();};p.prototype._rebindTable=function(){var r,s,t,u;r=this.oSmartFilterBar.getFilters();u=this.oPrimaryValueListAnnotation.deprecationCodeField;if(u){if((r.length===0)||(r.length>0&&!this._checkForExistingRevokedFilters(r[0],u))){r.push(new h(u,j.NE,k.RevokedCode));}}s=this.oSmartFilterBar.getParameters()||{};if(this.aSelect&&this.aSelect.length){s["select"]=this.aSelect.toString();}t={path:"/"+this.sValueListEntitySetName,filters:r,parameters:s,events:{dataReceived:function(E){this.oValueHelpDialog.TableStateDataFilled();var i=E.getSource();this.oValueHelpDialog.getTableAsync().then(function(v){if(i&&this.oValueHelpDialog&&this.oValueHelpDialog.isOpen()){var w=i.getLength();if(w){this.oValueHelpDialog.update();}else{this.oValueHelpDialog._updateTitles();}}}.bind(this));}.bind(this)}};this.oValueHelpDialog.getTableAsync().then(function(v){v.setShowOverlay(false);this.oValueHelpDialog.TableStateDataSearching();v.setEnableBusyIndicator(true);if(v instanceof b){var E;if(this.sKey&&this._oMetadataAnalyser){E=this._oMetadataAnalyser.getFieldsByEntitySetName(this.sValueListEntitySetName);for(var i=0;i<E.length;i++){if(E[i].name===this.sKey&&E[i].sortable!==false){t.sorter=new g(this.sKey);break;}}}t.factory=function(I,y){var z=v.getModel("columns").getData().cols;return new C({cells:z.map(function(A){var G=A.template;return new c({text:"{"+G+"}"});})});};v.bindItems(t);}else{var w=v.getColumns();for(var i=0;i<w.length;i++){var x=w[i];x._appDefaults=null;}w=v.getSortedColumns();if(!w||w.length==0){w=v.getColumns();}for(var i=0;i<w.length;i++){var x=w[i];if(x.getSorted()){if(!t.sorter){t.sorter=[];}t.sorter.push(new g(x.getSortProperty(),x.getSortOrder()==="Descending"));}}v.bindRows(t);}}.bind(this));};p.prototype._checkForExistingRevokedFilters=function(i,s){var E=false;if(i.sPath===s&&i.sOperator===V.EQ&&i.oValue1===k.RevokedCode){E=true;}else if(Array.isArray(i.aFilters)){for(var r=0;r<i.aFilters.length;r++){E=this._checkForExistingRevokedFilters(i.aFilters[r],s);if(E){break;}}}return E;};p.prototype._onFilterBarResetPressed=function(){this._calculateFilterInputData();if(this.oSmartFilterBar){this.oSmartFilterBar.setFilterData(this.mFilterInputData);}};p.prototype._onFilterBarInitialise=function(){var i=null;this._bIgnoreFilterChange=true;this._onFilterBarResetPressed();delete this._bIgnoreFilterChange;if(this.oSmartFilterBar&&this.oSmartFilterBar.getBasicSearchControl){i=this.oSmartFilterBar.getBasicSearchControl();if(i){i.setValue(this.sBasicSearchText);if(e.system.phone&&i.isA("sap.m.SearchField")){i.setShowSearchButton(true);}}}if(!this.preventInitialDataFetchInValueHelpDialog||this.bForceTriggerDataRetreival){this._rebindTable();this.bForceTriggerDataRetreival=false;}if(e.system.desktop){this._expandFilterBar();}};p.prototype._onOK=function(r){var _=r.getParameter("_tokensHaveChanged"),t=r.getParameter("tokens"),s,K,i=0,u=[],v=null,w,x={};this._onCancel();if(!_){return;}if(this.oControl.isA("sap.m.MultiInput")){this.oControl.setValue("");this.oControl.destroyTokens();this.oControl.setTokens(t);i=t.length;if(i>0){x.type="added";x.addedTokens=t;}this.oControl.fireTokenUpdate(x);while(i--){v=t[i].data("row");if(v){u.push(v);}}}else{if(t[0]){if(this.bIsSingleIntervalRange){s=t[0].data("range");if(s){if(this._sType==="datetime"){w=d.getDateTimeInstance(Object.assign({},this._oDateFormatSettings,{UTC:false}));if(typeof s.value1==="string"){s.value1=new Date(s.value1);}if(s.operation==="BT"){if(typeof s.value2==="string"){s.value2=new Date(s.value2);}K=w.format(s.value1)+"-"+w.format(s.value2);}else{K=w.format(s.value1);}}else{if(s.operation==="BT"){K=s.value1+"-"+s.value2;}else{K=s.value1;}}}}else{K=t[0].getKey();}v=t[0].data("row");if(v){u.push(v);}t[0].destroy();}if(this.sContext==="SmartField"&&this._selectedODataRowHandler){this._selectedODataRowHandler(K,u[0]);}this.oControl.setValue(K);this.oControl.fireChange({value:K,validated:true});}this._calculateAndSetFilterOutputData(u);};p.prototype._onCancel=function(){this.oValueHelpDialog.close();this.oValueHelpDialog.setModel(null);};p.prototype.destroy=function(){if(this.oControl&&this.oControl.detachValueHelpRequest){this.oControl.detachValueHelpRequest(this._fVHRequested);this._fVHRequested=null;}B.prototype.destroy.apply(this,arguments);if(this.oValueHelpDialog){this.oValueHelpDialog.destroy();this.oValueHelpDialog=null;}if(this.oSmartFilterBar){this.oSmartFilterBar.destroy();this.oSmartFilterBar=null;}this.sTitle=null;this._oValueHelpDialogClass=null;};return p;});
