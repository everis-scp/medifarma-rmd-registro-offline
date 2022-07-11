sap.ui.define(["sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/main/thirdparty/ListItemBase","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/main/thirdparty/types/Priority","sap/ui/webc/common/thirdparty/icons/decline","sap/ui/webc/common/thirdparty/icons/message-success","sap/ui/webc/common/thirdparty/icons/message-error","sap/ui/webc/common/thirdparty/icons/message-warning","sap/ui/webc/common/thirdparty/icons/overflow","./generated/templates/NotifactionOverflowActionsPopoverTemplate.lit","./generated/themes/NotifactionOverflowActionsPopover.css"],function(t,e,i,o,r,s,n,a,c,l,u,p){"use strict";function d(t){return t&&typeof t==="object"&&"default"in t?t["default"]:t}var f=d(i);var h=d(o);var g=d(r);const m={managedSlots:true,properties:{titleText:{type:String},priority:{type:g,defaultValue:g.None},showClose:{type:Boolean},read:{type:Boolean},busy:{type:Boolean},busyDelay:{type:h,defaultValue:1e3}},slots:{actions:{type:HTMLElement}},events:{close:{}}};class y extends f{constructor(){super();this.i18nFioriBundle=e.getI18nBundle("@ui5/webcomponents-fiori")}static get metadata(){return m}static get staticAreaTemplate(){return u}static get staticAreaStyles(){return p}static priorityIconsMappings(){return{High:"message-error",Medium:"message-warning",Low:"message-success"}}get hasTitleText(){return!!this.titleText.length}get hasPriority(){return this.priority!==g.None}get priorityIcon(){return y.priorityIconsMappings()[this.priority]}get overflowButtonDOM(){return this.shadowRoot.querySelector(".ui5-nli-overflow-btn")}get showOverflow(){return!!this.overflowActions.length}get overflowActions(){if(this.actions.length<=1){return[]}return this.actionsInfo}get standardActions(){if(this.actions.length>1){return[]}return this.actionsInfo}get actionsInfo(){return this.actions.map(t=>({icon:t.icon,text:t.text,press:this._onCustomActionClick.bind(this),refItemid:t._id,disabled:t.disabled?true:undefined,design:t.design}))}_onBtnCloseClick(){this.fireEvent("close",{item:this})}_onBtnOverflowClick(){this.openOverflow()}_onCustomActionClick(t){const e=t.target.getAttribute("data-ui5-external-action-item-id");if(e){this.getActionByID(e).fireEvent("click",{targetRef:t.target},true);this.closeOverflow()}}_onkeydown(e){super._onkeydown(e);if(e.isMarked==="button"){return}if(t.isSpace(e)){e.preventDefault()}}getActionByID(t){return this.actions.find(e=>e._id===t)}async openOverflow(){const t=await this.getOverflowPopover();t.showAt(this.overflowButtonDOM)}async closeOverflow(){const t=await this.getOverflowPopover();t.close()}async getOverflowPopover(){const t=await this.getStaticAreaItemDomRef();return t.querySelector(".ui5-notification-overflow-popover")}}return y});