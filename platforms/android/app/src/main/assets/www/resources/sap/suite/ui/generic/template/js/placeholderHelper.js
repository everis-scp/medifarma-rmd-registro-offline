sap.ui.define(["sap/ui/model/odata/AnnotationHelper","sap/base/util/isEmptyObject","sap/base/util/extend"],function(A,i,e){"use strict";var p={resetPlaceHolders:function(t){var T=t.oComponentUtils.getTemplatePrivateGlobalModel();if(!(i(T.getProperty("/generic/placeholdersShown")))){T.setProperty("/generic/placeholdersShown",{"":true});}},isPlaceHolderInactive:function(t){if(t.getProperty("/generic/placeholdersShown")!==undefined){return i(t.getProperty("/generic/placeholdersShown"));}else{return false;}},setPlaceHolderPreconditions:function(t){t.setProperty("/generic/repeatPlaceholder",true);},setPlaceholder:function(I,f,t,r){var P=Object.create(null);var b=f&&!f.hasIdentityFullscreenLayout(I);var m=t.getProperty("/generic/placeholdersShown");e(P,m);var E=t.getProperty("/generic/enablePlaceholder");for(var T=I.treeNode;T;T=b&&T.fCLLevel&&r[T.parentRoute]){if(T.behaviour.getPlaceholderInfo()&&E){if(!T.componentId){P[T.sRouteName]=true;}else if(t.getProperty("/generic/repeatPlaceholder")===true&&T.sRouteName!=="root"){P[T.sRouteName]=true;}t.setProperty("/generic/repeatPlaceholder",false);}}t.setProperty("/generic/placeholdersShown",P);}};return p;},true);