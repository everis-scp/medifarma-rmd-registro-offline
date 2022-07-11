sap.ui.define(["sap/ui/webc/common/thirdparty/localization/dates/CalendarDate","sap/ui/webc/common/thirdparty/base/Render","sap/ui/webc/common/thirdparty/base/Keys","./CalendarDate","./CalendarPart","./CalendarHeader","./DayPicker","./MonthPicker","./YearPicker","./types/CalendarSelectionMode","sap/ui/webc/common/thirdparty/localization/features/calendar/Gregorian","./generated/templates/CalendarTemplate.lit","./generated/themes/Calendar.css"],function(e,t,r,a,s,i,n,c,o,d,u,h,l){"use strict";function m(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var p=m(e);const _={tag:"ui5-calendar",properties:{selectionMode:{type:d,defaultValue:d.Single},hideWeekNumbers:{type:Boolean},_currentPicker:{type:String,defaultValue:"day"},_previousButtonDisabled:{type:Boolean},_nextButtonDisabled:{type:Boolean}},managedSlots:true,slots:{default:{propertyName:"dates",type:HTMLElement,invalidateOnChildChange:true}},events:{"selected-dates-change":{detail:{dates:{type:Array},values:{type:Array}}},"show-month-press":{},"show-year-press":{}}};class P extends s{static get metadata(){return _}static get template(){return h}static get styles(){return l}get _selectedDatesTimestamps(){return this.dates.map(e=>{const t=e.value;return t&&!!this.getFormat().parse(t)?this._getTimeStampFromString(t)/1e3:undefined}).filter(e=>!!e)}_setSelectedDates(e){const t=e.map(e=>this.getFormat().format(new Date(e*1e3),true));const r=[...this.dates].map(e=>e.value);this.dates.filter(e=>!t.includes(e.value)).forEach(e=>{this.removeChild(e)});t.filter(e=>!r.includes(e)).forEach(e=>{const t=document.createElement("ui5-date");t.value=e;this.appendChild(t)})}async onAfterRendering(){await t.renderFinished();this._previousButtonDisabled=!this._currentPickerDOM._hasPreviousPage();this._nextButtonDisabled=!this._currentPickerDOM._hasNextPage()}onHeaderShowMonthPress(e){this._currentPickerDOM._autoFocus=false;this._currentPicker="month";this.fireEvent("show-month-press",e)}onHeaderShowYearPress(e){this._currentPickerDOM._autoFocus=false;this._currentPicker="year";this.fireEvent("show-year-press",e)}get _currentPickerDOM(){return this.shadowRoot.querySelector(`[ui5-${this._currentPicker}picker]`)}onHeaderPreviousPress(){this._currentPickerDOM._showPreviousPage()}onHeaderNextPress(){this._currentPickerDOM._showNextPage()}get _isHeaderMonthButtonHidden(){return this._currentPicker==="month"}get _isDayPickerHidden(){return this._currentPicker!=="day"}get _isMonthPickerHidden(){return this._currentPicker!=="month"}get _isYearPickerHidden(){return this._currentPicker!=="year"}onSelectedDatesChange(e){const t=e.detail.timestamp;const r=e.detail.dates;const a=r.map(e=>{const t=p.fromTimestamp(e*1e3,this._primaryCalendarType);return this.getFormat().format(t.toUTCJSDate(),true)});this.timestamp=t;const s=!this.fireEvent("selected-dates-change",{timestamp:t,dates:[...r],values:a},true);if(!s){this._setSelectedDates(r)}}onSelectedMonthChange(e){this.timestamp=e.detail.timestamp;this._currentPicker="day";this._currentPickerDOM._autoFocus=true}onSelectedYearChange(e){this.timestamp=e.detail.timestamp;this._currentPicker="day";this._currentPickerDOM._autoFocus=true}onNavigate(e){this.timestamp=e.detail.timestamp}_onkeydown(e){if(r.isF4(e)&&this._currentPicker!=="month"){this._currentPicker="month"}if(r.isF4Shift(e)&&this._currentPicker!=="year"){this._currentPicker="year"}}get selectedDates(){return this._selectedDatesTimestamps}set selectedDates(e){this._setSelectedDates(e)}static get dependencies(){return[a,i,n,c,o]}}P.define();return P});