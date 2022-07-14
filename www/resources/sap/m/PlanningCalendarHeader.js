/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(['sap/ui/core/Element','sap/ui/core/Control','./library','./Toolbar','./AssociativeOverflowToolbar','./Button','./Popover','./Title','./ToolbarSpacer','./SegmentedButton','sap/ui/unified/Calendar','sap/ui/unified/calendar/CalendarDate','sap/ui/unified/calendar/CustomMonthPicker','sap/ui/unified/calendar/CustomYearPicker','sap/ui/unified/calendar/IndexPicker','sap/ui/core/format/DateFormat','sap/ui/core/IconPool','sap/ui/core/InvisibleText','sap/ui/core/library',"./PlanningCalendarHeaderRenderer"],function(E,C,l,T,A,B,P,a,b,S,c,d,e,f,I,D,g,h,j,k){"use strict";var m=l.ToolbarDesign;var n=C.extend("sap.m.PlanningCalendarHeader",{metadata:{library:"sap.m",properties:{title:{type:"string",group:"Appearance",defaultValue:""},startDate:{type:"object",group:"Data"},pickerText:{type:"string",group:"Data"}},aggregations:{actions:{type:"sap.ui.core.Control",multiple:true,singularName:"action"},_actionsToolbar:{type:"sap.m.OverflowToolbar",multiple:false,visibility:"hidden"},_navigationToolbar:{type:"sap.m.Toolbar",multiple:false,visibility:"hidden"},_calendarPicker:{type:"sap.ui.unified.Calendar",multiple:false,visibility:"hidden"},_monthPicker:{type:"sap.ui.unified.internal.CustomMonthPicker",multiple:false,visibility:"hidden"},_yearPicker:{type:"sap.ui.unified.internal.CustomYearPicker",multiple:false,visibility:"hidden"},_indexPicker:{type:"sap.ui.unified.calendar.IndexPicker",multiple:false,visibility:"hidden"}},events:{pressPrevious:{},pressToday:{},pressNext:{},dateSelect:{},cancel:{},viewChange:{}},associations:{currentPicker:{type:"sap.ui.core.Control",multiple:false}}}});var R=3;n.prototype.init=function(){var o=this.getId(),N=o+"-NavToolbar",r=sap.ui.getCore().getLibraryResourceBundle("sap.m"),p,i,M,y;this.setAggregation("_actionsToolbar",new A(o+"-ActionsToolbar",{design:m.Transparent}).addStyleClass("sapMPCHeadActionsToolbar").addContent(this._getOrCreateTitleControl()).addContent(this._getOrCreateToolbarSpacer()).addContent(this._getOrCreateViewSwitch()));this._oPrevBtn=new B(N+"-PrevBtn",{icon:g.getIconURI('slim-arrow-left'),tooltip:r.getText("PCH_NAVIGATE_BACKWARDS"),press:function(){this.firePressPrevious();}.bind(this)});this._oTodayBtn=new B(N+"-TodayBtn",{text:r.getText("PLANNINGCALENDAR_TODAY"),ariaLabelledBy:h.getStaticId("sap.m","PCH_NAVIGATE_TO_TODAY"),press:function(){this.firePressToday();}.bind(this)});this._oNextBtn=new B(N+"-NextBtn",{icon:g.getIconURI('slim-arrow-right'),tooltip:r.getText("PCH_NAVIGATE_FORWARD"),press:function(){this.firePressNext();}.bind(this)});i=new c(o+"-Cal",{ariaLabelledBy:h.getStaticId("sap.m","PCH_RANGE_PICKER")});i.attachEvent("select",this._handlePickerDateSelect,this);i.attachEvent("cancel",this._handlePickerCancelEvent,this);i.setPopupMode(true);this.setAggregation("_calendarPicker",i);this._oCalendarAfterRenderDelegate={onAfterRendering:function(){i.focus();}};i.addDelegate(this._oCalendarAfterRenderDelegate);this._oCalendar=i;this.setAssociation("currentPicker",i);M=new e(o+"-MonthCal",{ariaLabelledBy:h.getStaticId("sap.m","PCH_RANGE_PICKER")});M.attachEvent("select",this._handlePickerDateSelect,this);M.attachEvent("cancel",this._handlePickerCancelEvent,this);M.setPopupMode(true);this.setAggregation("_monthPicker",M);this._oMonthPicker=M;y=new f(o+"-YearCal",{ariaLabelledBy:h.getStaticId("sap.m","PCH_RANGE_PICKER")});y.attachEvent("select",this._handlePickerDateSelect,this);y.attachEvent("cancel",this._handlePickerCancelEvent,this);y.setPopupMode(true);this.setAggregation("_yearPicker",y);this._oYearPicker=y;var q=new I(o+"-IndexPicker");q.attachEvent("select",this._handleIndexPickerSelect,this);this.setAggregation("_indexPicker",q);this._oIndexPicker=q;this._oPickerBtn=new B(N+"-PickerBtn",{text:this.getPickerText(),ariaHasPopup:j.aria.HasPopup.Dialog,ariaLabelledBy:h.getStaticId("sap.m","PCH_SELECT_RANGE"),press:function(){if(this.fireEvent("_pickerButtonPress",{},true)){var s=this.getStartDate()||new Date(),t=this.getAssociation("currentPicker");p=E.registry.get(t);if(p.displayDate){p.displayDate(s);}this._openCalendarPickerPopup(p);}}.bind(this)});this.setAggregation("_navigationToolbar",new T(N,{design:m.Transparent,content:[this._oPrevBtn,this._oTodayBtn,this._oNextBtn,this._oPickerBtn]}).addStyleClass("sapMPCHeadNavToolbar"));};n.prototype.exit=function(){this._getActionsToolbar().removeAllContent();if(this._oTitle){this._oTitle.destroy();this._oTitle=null;}if(this._oToolbarSpacer){this._oToolbarSpacer.destroy();this._oToolbarSpacer=null;}if(this._oViewSwitch){this._oViewSwitch.destroy();this._oViewSwitch=null;}if(this._oPopup){if(this._oCalendarAfterRenderDelegate){this._oCalendar.removeDelegate(this._oCalendarAfterRenderDelegate);}this._oPopup.destroy();this._oPopup=null;}if(this._oPrevBtn){this._oPrevBtn.destroy();this._oPrevBtn=null;}if(this._oNextBtn){this._oNextBtn.destroy();this._oNextBtn=null;}};n.prototype.onBeforeRendering=function(){var v=!!this.getActions().length||!!this.getTitle()||this._getOrCreateViewSwitch().getItems().length>1;this._getActionsToolbar().setProperty("visible",v,true);};n.prototype.setTitle=function(t){this._getOrCreateTitleControl().setText(t).setVisible(!!t);return this.setProperty("title",t);};n.prototype.addAction=function(o){if(!o){return this;}this._getActionsToolbar().addContent(o);return this.addAggregation("actions",o);};n.prototype.insertAction=function(o,i){if(!o){return this;}this._getActionsToolbar().insertContent(o,i+R);return this.insertAggregation("actions",o,i);};n.prototype.removeAction=function(o){if(!o){return this;}this._getActionsToolbar().removeContent(o);return this.removeAggregation("actions",o);};n.prototype.removeAllActions=function(){var o=this._getActionsToolbar(),p=o.getContent();for(var i=R;i<p.length;i++){o.removeContent(p[i]);}return this.removeAllAggregation("actions");};n.prototype.destroyActions=function(){var o=this._getActionsToolbar(),p=o.getContent(),r;for(var i=R;i<p.length;i++){r=o.removeContent(p[i]);r.destroy();}return this;};n.prototype.setPickerText=function(t){this.setProperty("pickerText",t);this._oPickerBtn.setText(t);return this;};n.prototype._getOrCreateTitleControl=function(){if(!this._oTitle){this._oTitle=new a(this.getId()+"-Title",{visible:false});}return this._oTitle;};n.prototype._getOrCreateToolbarSpacer=function(){if(!this._oToolbarSpacer){this._oToolbarSpacer=new b(this.getId()+"-Spacer");}return this._oToolbarSpacer;};n.prototype._getOrCreateViewSwitch=function(){if(!this._oViewSwitch){this._oViewSwitch=new S(this.getId()+"-ViewSwitch",{ariaLabelledBy:h.getStaticId("sap.m","PCH_VIEW_SWITCH")});this._oViewSwitch.attachEvent("selectionChange",this._handleViewSwitchChange,this);this.addDependent(this._oViewSwitch);}return this._oViewSwitch;};n.prototype._convertViewSwitchToSelect=function(){this._oViewSwitch._bForcedSelectMode=true;this._oViewSwitch._toSelectMode();};n.prototype._convertViewSwitchToSegmentedButton=function(){this._oViewSwitch._bForcedSelectMode=false;this._oViewSwitch._toNormalMode();};n.prototype._getTodayButton=function(){return this._oTodayBtn;};n.prototype._handlePickerDateSelect=function(){var s=this.getAssociation("currentPicker"),p=E.registry.get(s),o=p.getSelectedDates()[0].getStartDate();this.setStartDate(o);this._closeCalendarPickerPopup();this.fireDateSelect();};n.prototype._handleIndexPickerSelect=function(o){var s=this._oIndexPicker.getSelectedIndex();var i=new Date(this._oCalendar.getMinDate());var r=this._getRelativeInfo();i.setDate(i.getDate()+s*r.iIntervalSize);this.setStartDate(i);this._closeCalendarPickerPopup();this.fireDateSelect();};n.prototype._handleViewSwitchChange=function(o){this.fireViewChange(o.getParameters());};n.prototype._openCalendarPickerPopup=function(p){var i,o;if(!this._oPopup){this._oPopup=this._createPopup();}i=this._oPopup.getContent();if(i.length){o=this._oPopup.getContent()[0];if(o.isA("sap.ui.unified.internal.CustomYearPicker")){this.setAggregation("_yearPicker",this._oPopup.removeAllContent()[0]);}else if(o.isA("sap.ui.unified.internal.CustomMonthPicker")){this.setAggregation("_monthPicker",this._oPopup.removeAllContent()[0]);}else if(o.isA("sap.ui.unified.calendar.IndexPicker")){this.setAggregation("_indexPicker",this._oPopup.removeAllContent()[0]);}else if(p!==o){this.setAggregation("_calendarPicker",this._oPopup.removeAllContent()[0]);}}this._oPopup.addContent(p);this._oPopup.attachAfterOpen(function(){var $=this._oPopup.$();var O=Math.floor(($.width()-this._oPickerBtn.$().width())/2);this._oPopup.setOffsetX(sap.ui.getCore().getConfiguration().getRTL()?O:-O);var q=this._oPickerBtn.$().height();this._oPopup.setOffsetY(this._oPopup._getCalculatedPlacement()==="Top"?q:-q);this._oPopup.getContent()[0].focus();},this);this._oPopup.openBy(this._oPickerBtn.getDomRef());};n.prototype._createPopup=function(){var p=new P({placement:"VerticalPreferredBottom",showHeader:false,showArrow:false,verticalScrolling:false});p.oPopup.setDurations(0,0);p.addDelegate({onsapescape:this.onsapescape},this);this._oPopup=p;return this._oPopup;};n.prototype.onsapescape=function(){if(this._oPopup){this._closeCalendarPickerPopup();if(this._oPickerBtn.getDomRef()){this._oPickerBtn.getDomRef().focus();}}};n.prototype._closeCalendarPickerPopup=function(){if(this._oPopup&&this._oPopup.isOpen()){this._oPopup.close();}};n.prototype._handlePickerCancelEvent=function(){var p=this._oPickerBtn.getDomRef();this.fireCancel();this._closeCalendarPickerPopup();p&&p.focus();};n.prototype._getActionsToolbar=function(){return this.getAggregation("_actionsToolbar");};n.prototype._getNavigationToolbar=function(){return this.getAggregation("_navigationToolbar");};return n;});
