sap.ui.define(function(){"use strict";const e=/^(?:a|area)$/i;const t=/^(?:input|select|textarea|button)$/i;const n=n=>{if(n.disabled){return false}const r=n.getAttribute("tabindex");if(r!==null&&r!==undefined){return parseInt(r)>=0}return t.test(n.nodeName)||e.test(n.nodeName)&&n.href};return n});