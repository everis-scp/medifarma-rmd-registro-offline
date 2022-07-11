sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theme-base/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theme-base", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents-fiori", "sap_fiori_3", () => parametersBundle_css);
	var styles = ":host(:not([hidden])){display:block}.ui5-tli-root{display:flex}:host([layout=Horizontal]) .ui5-tli-root{flex-direction:column}:host([layout=Vertical]) .ui5-tli-indicator{position:relative;width:2rem}:host([layout=Horizontal]) .ui5-tli-indicator{position:relative;display:flex;height:2rem;align-items:center}:host([layout=Vertical]) .ui5-tli-indicator:before{content:\"\";display:inline-block;background-color:var(--sapContent_ForegroundBorderColor);width:1px;position:absolute;top:2.125rem;bottom:-1.625rem;left:50%}:host([layout=Horizontal]) .ui5-tli-indicator:before{content:\"\";display:inline-block;background-color:var(--sapContent_ForegroundBorderColor);height:1px;top:50%;position:absolute;left:2.0625rem;right:-1.625rem}:host([layout=Horizontal]) .ui5-tli-indicator.ui5-tli-indicator-large-line:before{right:-1.9375rem}:host([layout=Vertical]:not([icon])) .ui5-tli-indicator:before{bottom:-1.625rem;top:1.875rem}:host([layout=Horizontal]:not([icon])) .ui5-tli-indicator:before{top:50%;right:-1.9375rem;left:1.6875rem}:host([layout=Horizontal]:not([icon])) .ui5-tli-indicator.ui5-tli-indicator-short-line:before{right:-1.625rem}:host(:not([icon])) .ui5-tli-indicator:after{content:\"\";display:inline-block;box-sizing:border-box;border:1px solid var(--sapContent_NonInteractiveIconColor);background-color:var(--sapContent_NonInteractiveIconColor);border-radius:50%;width:.4375rem;height:.4375rem;position:absolute;top:.9375rem;left:50%;transform:translateX(-50%)}:host([layout=Horizontal]:not([icon])) .ui5-tli-indicator:after{top:.78125rem;left:.9625rem}:host(:last-child) .ui5-tli-indicator:before{display:none}.ui5-tli-icon-outer{display:flex;justify-content:center;align-items:center;margin-top:.25rem;height:1.625rem;width:2rem}:host([layout=Horizontal]) .ui5-tli-icon-outer{margin-top:0;height:1.3125rem}.ui5-tli-icon{color:var(--sapContent_NonInteractiveIconColor);height:1.375rem;width:1.375rem}:host([layout=Horizontal]) .ui5-tli-dummy-icon-container{height:1.375rem;width:1.375rem;display:inline-block;outline:none}.ui5-tli-bubble{background:var(--sapGroup_ContentBackground);border:1px solid var(--sapList_BorderColor);box-sizing:border-box;border-radius:.25rem;flex:1;position:relative;margin-left:.5rem;padding:var(--_ui5_tl_bubble_padding)}:host([layout=Horizontal]) .ui5-tli-bubble{margin-top:.5rem;margin-left:0}.ui5-tli-bubble:focus{outline:none}.ui5-tli-bubble:focus:after{content:\"\";border:var(--_ui5_TimelineItem_bubble_outline_width) dotted var(--sapContent_FocusColor);position:absolute;top:var(--_ui5_TimelineItem_bubble_outline_top);right:var(--_ui5_TimelineItem_bubble_outline_right);bottom:var(--_ui5_TimelineItem_bubble_outline_bottom);left:var(--_ui5_TimelineItem_bubble_outline_left);pointer-events:none}:host([layout=Horizontal]) .ui5-tli-bubble:focus:after{top:-.625rem;left:-.125rem}.ui5-tli-bubble-arrow{width:var(--_ui5_TimelineItem_arrow_size);padding-bottom:var(--_ui5_TimelineItem_arrow_size);position:absolute;pointer-events:none;top:0;left:0;overflow:hidden}.ui5-tli-bubble-arrow:before{content:\"\";background:var(--sapGroup_ContentBackground);border:1px solid var(--sapList_BorderColor);position:absolute;top:0;left:0;width:100%;height:100%;transform-origin:0 100%;transform:rotate(45deg)}:host([layout=Horizontal]) .ui5-tli-bubble-arrow:before{transform:rotate(315deg)}.ui5-tli-bubble-arrow--left{left:calc(var(--_ui5_TimelineItem_arrow_size)*-1)}.ui5-tli-bubble-arrow--top{top:calc(var(--_ui5_TimelineItem_arrow_size)*-1)}.ui5-tli-bubble-arrow--left:before{left:50%;width:50%;transform-origin:100% 100%}.ui5-tli-bubble-arrow--top:before{left:42%;width:75%;transform-origin:152% 104%}.ui5-tli-desc,.ui5-tli-title{color:var(--sapTextColor);font-family:\"72override\",var(--sapFontFamily);font-weight:400;font-size:var(--sapFontSize)}.ui5-tli-title span{display:inline-block;vertical-align:top}.ui5-tli-subtitle{color:var(--sapContent_LabelColor);font-family:\"72override\",var(--sapFontFamily);font-weight:400;font-size:var(--sapFontSmallSize);padding-top:.375rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.ui5-tli-desc{padding-top:.75rem}[dir=rtl] .ui5-tli-bubble-arrow--left{right:calc(var(--_ui5_TimelineItem_arrow_size)*-1);left:auto;transform:scaleX(-1)}[dir=rtl] .ui5-tli-bubble-arrow--top{right:0;left:auto;transform:scaleX(-1)}[dir=rtl] .ui5-tli-bubble{margin-left:auto;margin-right:.5rem}:host([layout=Horizontal]) [dir=rtl] .ui5-tli-bubble{margin-right:0}[dir=rtl] .ui5-tli-bubble:focus:after{left:var(--_ui5_TimelineItem_bubble_rtl_left_offset);right:var(--_ui5_TimelineItem_bubble_rtl_right_offset)}:host([layout=Horizontal]) [dir=rtl] .ui5-tli-bubble:focus:after{right:0}:host([layout=Horizontal]:not([icon])) [dir=rtl] .ui5-tli-indicator:after{right:.625rem}:host([layout=Horizontal]:not([icon])) [dir=rtl] .ui5-tli-indicator:before{right:1.9375rem;left:-1.625rem}:host([layout=Horizontal]) [dir=rtl] .ui5-tli-indicator:before{left:-1.625rem;right:2.125rem}";

	return styles;

});
