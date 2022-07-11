sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,r,f)=>e.html`<div class="ui5-list-root" @focusin="${i._onfocusin}" @keydown="${i._onkeydown}"><div class="ui5-list-scroll-container"><!-- header -->${i.header.length?t():undefined}${i.shouldRenderH1?d(i):undefined}${i.hasData?n(i):undefined}<ul id="${e.ifDefined(i._id)}-listUl" class="ui5-list-ul" role="${e.ifDefined(i.accessibleRole)}" aria-label="${e.ifDefined(i.ariaLabelТxt)}" aria-labelledby="${e.ifDefined(i.ariaLabelledBy)}" aria-multiselectable="${e.ifDefined(i.isMultiSelect)}"><slot></slot>${i.showNoDataText?a(i):undefined}</ul>${i.growsWithButton?o(i):undefined}${i.footerText?s(i):undefined}${i.hasData?l(i):undefined}<span tabindex="-1" aria-hidden="true" class="ui5-list-end-marker"></span></div>${i.busy?u(i,r,f):undefined}</div>`;const t=(i,t,d)=>e.html`<slot name="header" />`;const d=(i,t,d)=>e.html`<header id="${e.ifDefined(i.headerID)}" class="ui5-list-header">${e.ifDefined(i.headerText)}</header>`;const n=(i,t,d)=>e.html`<div id="${e.ifDefined(i._id)}-before" tabindex="0" class="ui5-list-focusarea"></div>`;const a=(i,t,d)=>e.html`<li id="${e.ifDefined(i._id)}-nodata" class="ui5-list-nodata" tabindex="${e.ifDefined(i.noDataTabIndex)}" style="list-style-type: none;"><div id="${e.ifDefined(i._id)}-nodata-text" class="ui5-list-nodata-text">${e.ifDefined(i.noDataText)}</div></li>`;const o=(i,t,d)=>e.html`<div growing-button><div tabindex="0" role="button" aria-labelledby="${e.ifDefined(i._id)}-growingButton-text" ?active="${i._loadMoreActive}" @click="${i._onLoadMoreClick}" @keydown="${i._onLoadMoreKeydown}" @keyup="${i._onLoadMoreKeyup}" @mousedown="${i._onLoadMoreMousedown}" @mouseup="${i._onLoadMoreMouseup}" growing-button-inner><span id="${e.ifDefined(i._id)}-growingButton-text" growing-button-text>${e.ifDefined(i._growingButtonText)}</span></div></div>`;const s=(i,t,d)=>e.html`<footer id="${e.ifDefined(i._id)}-footer" class="ui5-list-footer">${e.ifDefined(i.footerText)}</footer>`;const l=(i,t,d)=>e.html`<div id="${e.ifDefined(i._id)}-after" tabindex="0" class="ui5-list-focusarea"></div>`;const u=(i,t,d)=>e.html`<div class="ui5-list-busy-row"><${e.scopeTag("ui5-busy-indicator",t,d)} delay="${e.ifDefined(i.busyDelay)}" active size="Medium" class="ui5-list-busy-ind" style="${e.styleMap(i.styles.busyInd)}"></${e.scopeTag("ui5-busy-indicator",t,d)}></div>`;return i});