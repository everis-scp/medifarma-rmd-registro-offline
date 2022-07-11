sap.ui.define(['sap/ui/webc/common/thirdparty/base/asset-registries/Themes', 'sap/ui/webc/common/thirdparty/theme-base/generated/themes/sap_fiori_3/parameters-bundle.css', './sap_fiori_3/parameters-bundle.css'], function (Themes, defaultThemeBase, parametersBundle_css) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var defaultThemeBase__default = /*#__PURE__*/_interopDefaultLegacy(defaultThemeBase);

	Themes.registerThemePropertiesLoader("@ui5/webcomponents-theme-base", "sap_fiori_3", () => defaultThemeBase__default);
	Themes.registerThemePropertiesLoader("@ui5/webcomponents", "sap_fiori_3", () => parametersBundle_css);
	var ProgressIndicatorCss = ":host(:not([hidden])){display:inline-block;min-height:1rem;min-width:4rem;width:100%;height:1rem;overflow:hidden}.ui5-progress-indicator-root{box-sizing:border-box;display:flex;align-items:center;background:var(--sapField_Background);border-radius:.5rem;overflow:hidden;height:100%;width:100%;font-size:var(--sapFontSmallSize);font-family:\"72override\",var(--sapFontFamily)}.ui5-progress-indicator-bar{background:var(--_ui5_progress_indicator_value_state_none);justify-content:flex-end;height:100%;display:flex;align-items:center;color:var(--_ui5_progress_indicator_bar_color);transition-property:width;transition-timing-function:linear;box-sizing:border-box;border:var(--_ui5_progress_indicator_bar_border_max);border-radius:.5rem 0 0 .5rem}.ui5-progress-indicator-max-value .ui5-progress-indicator-remaining-bar,.ui5-progress-indicator-min-value .ui5-progress-indicator-bar{border:none}.ui5-progress-indicator-max-value .ui5-progress-indicator-bar{border-radius:.5rem}.ui5-progress-indicator-min-value .ui5-progress-indicator-remaining-bar{border-left:var(--_ui5_progress_indicator_border);border-radius:.5rem}.ui5-progress-indicator-remaining-bar{justify-content:flex-start;height:100%;display:flex;align-items:center;flex-grow:1;flex-basis:0;border:var(--_ui5_progress_indicator_border);border-left:none;border-radius:0 .5rem .5rem 0;box-sizing:border-box;color:var(--_ui5_progress_indicator_color)}.ui5-progress-indicator-value{margin:0 .375rem}.ui5-progress-indicator-icon{margin-left:.375rem;width:var(--sapFontSmallSize);height:var(--sapFontSmallSize);display:var(--_ui5_progress_indicator_icon_visibility)}:host([value-state=Error]) .ui5-progress-indicator-bar{background:var(--_ui5_progress_indicator_value_state_error)}:host([value-state=Warning]) .ui5-progress-indicator-bar{background:var(--_ui5_progress_indicator_value_state_warning)}:host([value-state=Success]) .ui5-progress-indicator-bar{background:var(--_ui5_progress_indicator_value_state_success)}:host([value-state=Information]) .ui5-progress-indicator-bar{background:var(--_ui5_progress_indicator_value_state_information)}:host([disabled]) .ui5-progress-indicator-root{opacity:.5}[dir=rtl] .ui5-progress-indicator-bar{border-radius:0 .5rem .5rem 0;flex-direction:row-reverse;justify-content:flex-start}[dir=rtl].ui5-progress-indicator-max-value .ui5-progress-indicator-remaining-bar,[dir=rtl].ui5-progress-indicator-min-value .ui5-progress-indicator-bar{border:none}[dir=rtl].ui5-progress-indicator-max-value .ui5-progress-indicator-bar{border-radius:.5rem}[dir=rtl] .ui5-progress-indicator-remaining-bar{border:var(--_ui5_progress_indicator_border);border-right:none;border-radius:.5rem 0 0 .5rem;flex-direction:row-reverse;justify-content:flex-end}[dir=rtl].ui5-progress-indicator-min-value .ui5-progress-indicator-remaining-bar{border-right:var(--_ui5_progress_indicator_border);border-radius:.5rem}";

	return ProgressIndicatorCss;

});
