sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theme-base/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(e,i,r){"use strict";function o(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var t=o(i);e.registerThemePropertiesLoader("@ui5/webcomponents-theme-base","sap_fiori_3",()=>t);e.registerThemePropertiesLoader("@ui5/webcomponents-fiori","sap_fiori_3",()=>r);var l='.ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none}:host(:not([hidden])){display:block;background:var(--_ui5_fcl_solid_bg)}.ui5-fcl-root{height:100%;display:flex;flex-direction:row}.ui5-fcl-column{background:inherit;box-sizing:border-box;will-change:width;overflow-y:auto}.ui5-fcl-column-animation{transition:width .56s cubic-bezier(.1,0,.05,1),visibility .56s ease-in}:host([_visible-columns="2"]) .ui5-fcl-column--start{border-right:var(--_ui5_fcl_column_border)}:host([_visible-columns="3"]) .ui5-fcl-column--start{border-right:var(--_ui5_fcl_column_border)}:host([_visible-columns="2"]) .ui5-fcl-column--middle{border-left:var(--_ui5_fcl_column_border)}:host([_visible-columns="3"]) .ui5-fcl-column--middle{border-left:var(--_ui5_fcl_column_border)}:host([_visible-columns="3"]) .ui5-fcl-column--middle{border-right:var(--_ui5_fcl_column_border)}:host([_visible-columns="3"]) .ui5-fcl-column--end{border-left:var(--_ui5_fcl_column_border)}.ui5-fcl-column--hidden{display:none}.ui5-fcl-arrow-container{display:flex;align-items:center;justify-content:center;width:1rem;background-color:var(--sapShell_Background)}.ui5-fcl-arrow{position:relative;width:1.5rem;height:1.5rem;min-width:1.5rem;will-change:transform;overflow:visible;z-index:1}.ui5-fcl-arrow:before{background-image:var(--_ui5_fcl_decoration_top);background-position-y:-.3125rem;bottom:100%}.ui5-fcl-arrow:after{background-image:var(--_ui5_fcl_decoration_bottom);background-position-y:.3125rem;top:100%}.ui5-fcl-arrow:after,.ui5-fcl-arrow:before{content:"";position:absolute;left:0;height:4rem;width:100%;transition:all .1s ease-in;background-repeat:no-repeat;background-size:.0625rem 100%;background-position-x:calc(50% - .03125rem)}.ui5-fcl-arrow:hover:after,.ui5-fcl-arrow:hover:before{height:7rem}.ui5-fcl--ie .ui5-fcl-arrow{margin:0 -.75rem}';return l});