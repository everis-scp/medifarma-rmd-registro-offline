sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/delegate/ItemNavigation","sap/ui/webc/common/thirdparty/base/delegate/ScrollEnablement","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/types/ValueState","./ResponsivePopover","./List","./StandardListItem","./generated/templates/TokenizerTemplate.lit","./generated/templates/TokenizerPopoverTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/Tokenizer.css","./generated/themes/ResponsivePopoverCommon.css","./generated/themes/ValueStateMessage.css"],function(e,t,n,s,o,i,r,a,l,h,u,c,p,d,g,m,v,_,f){"use strict";function T(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var k=T(e);var w=T(t);var y=T(n);var S=T(s);var b=T(o);var E=T(i);var N=T(h);const M={tag:"ui5-tokenizer",languageAware:true,managedSlots:true,slots:{default:{propertyName:"tokens",type:HTMLElement,individualSlots:true},valueStateMessage:{propertyName:"valueStateMessage",type:HTMLElement}},properties:{showMore:{type:Boolean},disabled:{type:Boolean},expanded:{type:Boolean},morePopoverOpener:{type:Object},popoverMinWidth:{type:E},valueState:{type:N,defaultValue:N.None},_nMoreCount:{type:E}},events:{"token-delete":{detail:{ref:{type:HTMLElement}}},"show-more-items-press":{detail:{ref:{type:HTMLElement}}}}};class R extends k{static get metadata(){return M}static get render(){return w}static get template(){return d}static get styles(){return v}static get staticAreaStyles(){return[_,f]}static get staticAreaTemplate(){return g}_handleResize(){this._nMoreCount=this.overflownTokens.length}constructor(){super();this._resizeHandler=this._handleResize.bind(this);this._itemNav=new S(this,{currentIndex:"-1",getItemsCallback:this._getVisibleTokens.bind(this)});this._scrollEnablement=new b(this);this.i18nBundle=r.getI18nBundle("@ui5/webcomponents")}async onBeforeRendering(){if(this.showPopover&&!this._getTokens().length){const e=await this.getPopover();e.close()}}onEnterDOM(){y.register(this.shadowRoot.querySelector(".ui5-tokenizer--content"),this._resizeHandler)}onExitDOM(){y.deregister(this.shadowRoot.querySelector(".ui5-tokenizer--content"),this._resizeHandler)}async _openOverflowPopover(){if(this.showPopover){const e=await this.getPopover();e.showAt(this.morePopoverOpener||this)}this.fireEvent("show-more-items-press")}_getTokens(){return this.getSlottedNodes("tokens")}get _tokens(){return this.getSlottedNodes("tokens")}get showPopover(){return Object.keys(this.morePopoverOpener).length}_getVisibleTokens(){if(this.disabled){return[]}return this._tokens.filter((e,t)=>t<this._tokens.length-this._nMoreCount)}onAfterRendering(){this._nMoreCount=this.overflownTokens.length;this._scrollEnablement.scrollContainer=this.expanded?this.contentDom:this}_tokenDelete(e){let t;const n=this._getVisibleTokens().indexOf(e.target);if(e.detail&&e.detail.backSpace){t=n===0?n+1:n-1}else{t=n===this._getVisibleTokens().length-1?n-1:n+1}const s=this._getVisibleTokens()[t];this._itemNav.setCurrentItem(s);if(s){setTimeout(()=>{s.focus()},0)}this.fireEvent("token-delete",{ref:e.target})}itemDelete(e){const t=e.detail.item.tokenRef;this.fireEvent("token-delete",{ref:t})}_onkeydown(e){if(a.isSpace(e)){e.preventDefault();this._handleTokenSelection(e)}}_click(e){this._handleTokenSelection(e)}_onmousedown(e){this._itemNav.setCurrentItem(e.target)}_handleTokenSelection(e){if(e.target.localName==="ui5-token"){this._tokens.forEach(t=>{if(t!==e.target){t.selected=false}})}}scrollToStart(){this.contentDom.scrollLeft=0}async closeMorePopover(){const e=await this.getPopover();e.close()}get _nMoreText(){return this.i18nBundle.getText(m.MULTIINPUT_SHOW_MORE_TOKENS,[this._nMoreCount])}get showNMore(){return!this.expanded&&this.showMore&&this.overflownTokens.length}get contentDom(){return this.shadowRoot.querySelector(".ui5-tokenizer--content")}get tokenizerLabel(){return this.i18nBundle.getText(m.TOKENIZER_ARIA_LABEL)}get morePopoverTitle(){return this.i18nBundle.getText(m.TOKENIZER_POPOVER_REMOVE)}get overflownTokens(){if(!this.contentDom){return[]}return this._getTokens().filter(e=>{const t=this.effectiveDir==="rtl";const n=t?"left":"right";const s=this.contentDom.getBoundingClientRect();const o=e.getBoundingClientRect();const i=o[n];const r=s[n];e.overflows=t?i<r&&!this.expanded:i>r&&!this.expanded;return e.overflows})}get hasValueState(){return this.valueState===N.None||this.valueState===N.Success}get valueStateMessageText(){return this.getSlottedNodes("valueStateMessage").map(e=>e.cloneNode(true))}get _isPhone(){return l.isPhone()}get classes(){return{wrapper:{"ui5-tokenizer-root":true,"ui5-tokenizer-nmore--wrapper":this.showMore,"ui5-tokenizer-no-padding":!this._getTokens().length},content:{"ui5-tokenizer--content":true,"ui5-tokenizer-nmore--content":this.showMore},popoverValueState:{"ui5-valuestatemessage-root":true,"ui5-responsive-popover-header":this.showPopover,"ui5-valuestatemessage--success":this.valueState===N.Success,"ui5-valuestatemessage--error":this.valueState===N.Error,"ui5-valuestatemessage--warning":this.valueState===N.Warning,"ui5-valuestatemessage--information":this.valueState===N.Information}}}get styles(){return{popover:{"min-width":`${this.popoverMinWidth}px`},popoverValueStateMessage:{width:l.isPhone()?"100%":`${this.popoverMinWidth}px`,"min-height":"2rem",padding:l.isPhone()?"0.25rem 1rem":"0.3rem 0.625rem"},popoverHeader:{"min-height":"2rem"},popoverHeaderTitle:{"justify-content":"left"}}}_tokensCountText(){const e=this._getTokens().length;if(e===0){return this.i18nBundle.getText(m.TOKENIZER_ARIA_CONTAIN_TOKEN)}if(e===1){return this.i18nBundle.getText(m.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN)}return this.i18nBundle.getText(m.TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS,e)}_focusLastToken(){if(this.tokens.length===0){return}const e=this.tokens[this.tokens.length-1];e.focus();this._itemNav.setCurrentItem(e)}static get dependencies(){return[u,c,p]}static async onDefine(){await r.fetchI18nBundle("@ui5/webcomponents")}async getPopover(){return(await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]")}}R.define();return R});