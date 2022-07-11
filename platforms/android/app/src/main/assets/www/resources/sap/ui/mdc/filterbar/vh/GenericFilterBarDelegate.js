/*
 * ! OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/odata/v4/FilterBarDelegate",'sap/ui/base/ManagedObjectObserver'],function(F,M){"use strict";var G=Object.assign({},F);G.fetchProperties=function(f){if(!f.__oObserver){f.__oObserver=new M(_);f.__oObserver.observe(f,{aggregations:["filterItems"]});}return new Promise(function(R){var b=f.getFilterItems();f.__aProperties=[];b.forEach(function(o){a(o,f.__aProperties);});R(f.__aProperties);});};function a(f,p){var P=f.getBindingPath("conditions");if(!P){return;}var b=P.split("/");var s=b[b.length-1];p.push({name:s,label:f.getLabel()||s,type:f.getDataType(),formatOptions:f.getDataTypeFormatOptions(),constraints:f.getDataTypeConstraints(),typeConfig:f._getFormatOptions().delegate.getTypeUtil().getTypeConfig(f.getDataType(),f.getDataTypeFormatOptions(),f.getDataTypeConstraints()),required:f.getRequired(),hiddenFilter:false,visible:f.getVisible(),maxConditions:f.getMaxConditions(),fieldHelp:f.getFieldHelp()});}function r(f,p){var P=f.getBindingPath("conditions");if(!P){return;}function b(n){var N=null;p.some(function(o){if(o.name===n){N=o;}return N!==null;});return N;}function c(n){var e=-1;p.some(function(o,i){if(o.name===n){e=i;}return e!==-1;});if(e>=0){p.splice(e,1);}return e;}var d=P.split("/");var s=d[d.length-1];if(b(s)){c(s);}}function _(c){var f,p;if(c.name==="filterItems"){if(c.mutation==="insert"){var n=c.child;f=n.getParent();p=f.__aProperties;a(n,p);return;}if(c.mutation==="remove"){var R=c.child;f=R.getParent();p=f.__aProperties;r(R,p);return;}}}G.cleanup=function(f){if(f.__oObserver){f.__oObserver.disconnect();delete f.__oObserver;delete f.__aProperties;}};return G;});
