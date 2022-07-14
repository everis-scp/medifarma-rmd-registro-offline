sap.ui.define(["sap/ui/base/Object","sap/base/util/extend"],function(B,e){"use strict";function g(t){var s=t.oAppComponent.suppressDataLossPopup();var o;var O;function d(a,b,c,m,i){var D,h;o=a;O=b;var F=i?"sap.suite.ui.generic.template.fragments.DataLossTechnicalError":"sap.suite.ui.generic.template.fragments.DataLoss";c.getDialogFragmentAsync(F,{onDataLossOK:function(){h.close();o();},onDataLossCancel:function(){h.close();O();}},"dataLoss").then(function(j){h=j;D=h.getModel("dataLoss");D.setProperty("/mode",m);h.open();});}function G(){var a=t.oNavigationControllerProxy.getActiveComponents();var F,b,c;a.forEach(function(C){var r=t.componentRegistry[C];if(r.utils.isDraftEnabled()){return;}c=c||r;var u=r.oComponent.getModel("ui");if(u.getProperty("/editable")){F=F||r;}if(r.aUnsavedDataCheckFunctions&&r.aUnsavedDataCheckFunctions.some(function(U){return U();})){b=b||r;}});return{relevantRegistryEntry:b||F||c,hasExternalChanges:!!b};}function p(a,n,m,i){var r=G();var h=r.relevantRegistryEntry&&(r.hasExternalChanges||t.oAppComponent.getModel().hasPendingChanges());var b=r.relevantRegistryEntry?function(){r.relevantRegistryEntry.utils.cancelEdit(null,h);if(m==="LeavePage"){t.oNavigationControllerProxy.userHasAcceptedDataLoss();}a();}:a;var N=!s&&h;if(N){d(b,n,r.relevantRegistryEntry.oControllerUtils.oCommonUtils,m,i);}else{b();}}function P(a,c,m,n,i){m=m||"LeavePage";var r=new Promise(function(R,b){var h=function(){var r=a();R(r);};var N=function(){c();b();};if(n){p(h,N,m,i);}else{t.oApplicationProxy.performAfterSideEffectExecution(p.bind(null,h,N,m,i),true);}});return r;}function f(S){var n=t.oNavigationControllerProxy.unwantedDataLossPossible(S);if(n){var r=G();var h=r.relevantRegistryEntry&&(r.hasExternalChanges||t.oAppComponent.getModel().hasPendingChanges());return n&&h;}}return{performIfNoDataLoss:P,getShellDataLossPopup:f};}return B.extend("sap.suite.ui.generic.template.lib.DataLossHandler",{constructor:function(t){e(this,g(t));}});});
