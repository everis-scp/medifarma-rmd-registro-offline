sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,s,r)=>e.html`<div class="ui5-radio-root ${e.classMap(i.classes.main)}" role="radio" aria-checked="${e.ifDefined(i.checked)}" aria-readonly="${e.ifDefined(i.ariaReadonly)}" aria-disabled="${e.ifDefined(i.ariaDisabled)}" aria-labelledby="${e.ifDefined(i.ariaLabelledBy)}" aria-describedby="${e.ifDefined(i.ariaDescribedBy)}" tabindex="${e.ifDefined(i.tabIndex)}" dir="${e.ifDefined(i.effectiveDir)}" @click="${i._onclick}" @keydown="${i._onkeydown}" @keyup="${i._onkeyup}"><div class='ui5-radio-inner ${e.classMap(i.classes.inner)}'><svg class="ui5-radio-svg" focusable="false" aria-hidden="true">${n()}</svg><input type='radio' ?checked="${i.checked}" ?readonly="${i.readonly}" ?disabled="${i.disabled}" name="${e.ifDefined(i.name)}" data-sap-no-tab-ref/></div>${i.text?a(i,s,r):undefined}${i.hasValueState?d(i):undefined}</div>`;const a=(i,a,d)=>e.html`<${e.scopeTag("ui5-label",a,d)} id="${e.ifDefined(i._id)}-label" class="ui5-radio-label" for="${e.ifDefined(i._id)}" wrapping-type="${e.ifDefined(i.wrappingType)}">${e.ifDefined(i.text)}</${e.scopeTag("ui5-label",a,d)}>`;const d=(i,a,d)=>e.html`<span id="${e.ifDefined(i._id)}-descr" class="ui5-hidden-text">${e.ifDefined(i.valueStateText)}</span>`;const n=(i,a,d)=>e.svg`<circle class="ui5-radio-svg-outer" cx="50%" cy="50%" r="50%" /><circle class="ui5-radio-svg-inner" cx="50%" cy="50%" r="22%" />`;return i});