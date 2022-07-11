sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theme-base/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(e,o,t){"use strict";function r(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var a=r(o);e.registerThemePropertiesLoader("@ui5/webcomponents-theme-base","sap_fiori_3",()=>a);e.registerThemePropertiesLoader("@ui5/webcomponents","sap_fiori_3",()=>t);var i=":host(:not([hidden])){display:inline-block;box-sizing:border-box}:host(:not([hidden]).ui5_hovered){opacity:.7}:host([focused]){outline:var(--_ui5_avatar_outline);outline-offset:var(--_ui5_avatar_focus_offset)}:host([interactive]){cursor:pointer}:host{height:3rem;width:3rem;border-radius:50%;border:var(--ui5-avatar-initials-border);outline:none;color:var(--ui5-avatar-initials-color)}:host([shape=Square]),:host([shape=Square]) ::slotted(*){border-radius:.25rem}:host([shape=Square]) .ui5-avatar-root{border-radius:inherit}:host([shape=Square]) .ui5-avatar-img{border-radius:inherit}:host([_size=XS]),:host([size=XS]){height:2rem;width:2rem;min-height:2rem;min-width:2rem;font-size:.75rem}:host([_size=S]),:host([size=S]){min-height:3rem;min-width:3rem;font-size:1.125rem}:host([_size=M]),:host([size=M]){min-height:4rem;min-width:4rem;font-size:1.625rem}:host([_size=L]),:host([size=L]){min-height:5rem;min-width:5rem;font-size:2rem}:host([_size=XL]),:host([size=XL]){min-height:7rem;min-width:7rem;font-size:2.75rem}:host .ui5-avatar-icon{height:1.5rem;width:1.5rem;color:inherit}:host([_size=XS]) .ui5-avatar-icon,:host([size=XS]) .ui5-avatar-icon{height:1rem;width:1rem}:host([_size=S]) .ui5-avatar-icon,:host([size=S]) .ui5-avatar-icon{height:1.5rem;width:1.5rem}:host([_size=M]) .ui5-avatar-icon,:host([size=M]) .ui5-avatar-icon{height:2rem;width:2rem}:host([_size=L]) .ui5-avatar-icon,:host([size=L]) .ui5-avatar-icon{height:2.5rem;width:2.5rem}:host([_size=XL]) .ui5-avatar-icon,:host([size=XL]) .ui5-avatar-icon{height:3rem;width:3rem}::slotted(*){border-radius:50%;width:100%;height:100%}:host([_color-scheme=Accent1]),:host([color-scheme=Accent1]){background-color:var(--ui5-avatar-accent1)}:host([_color-scheme=Accent2]),:host([color-scheme=Accent2]){background-color:var(--ui5-avatar-accent2)}:host([_color-scheme=Accent3]),:host([color-scheme=Accent3]){background-color:var(--ui5-avatar-accent3)}:host([_color-scheme=Accent4]),:host([color-scheme=Accent4]){background-color:var(--ui5-avatar-accent4)}:host([_color-scheme=Accent5]),:host([color-scheme=Accent5]){background-color:var(--ui5-avatar-accent5)}:host(:not([color-scheme]):not([_has-image])),:host([_color-scheme=Accent6]),:host([color-scheme=Accent6]){background-color:var(--ui5-avatar-accent6)}:host([_color-scheme=Accent7]),:host([color-scheme=Accent7]){background-color:var(--ui5-avatar-accent7)}:host([_color-scheme=Accent8]),:host([color-scheme=Accent8]){background-color:var(--ui5-avatar-accent8)}:host([_color-scheme=Accent9]),:host([color-scheme=Accent9]){background-color:var(--ui5-avatar-accent9)}:host([_color-scheme=Accent10]),:host([color-scheme=Accent10]){background-color:var(--ui5-avatar-accent10)}:host([_color-scheme=Placeholder]),:host([color-scheme=Placeholder]){background-color:var(--ui5-avatar-placeholder)}:host([image-fit-type=Contain]) .ui5-avatar-img{background-size:contain}.ui5-avatar-root{display:flex;align-items:center;justify-content:center;outline:none}.ui5-avatar-img,.ui5-avatar-root{height:100%;width:100%;border-radius:50%}.ui5-avatar-img{background-repeat:no-repeat;background-position:50%;background-size:cover}.ui5-avatar-initials{color:inherit}";return i});