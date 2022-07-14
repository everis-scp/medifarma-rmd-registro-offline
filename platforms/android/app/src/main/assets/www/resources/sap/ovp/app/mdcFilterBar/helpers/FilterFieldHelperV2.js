sap.ui.define([],function(){"use strict";function _(p,P){var t;if(p&&P){for(var i=0;i<P.length;i++){var o=P[i];if(o.name===p){t=o.type||"";break;}}}return t;}var f={resolveFilterFieldLabel:function(p,e){var P=p.PropertyPath||p.Value.Path;var a=e.property;var l;if(P&&a){for(var i=0;i<a.length;i++){var p=a[i];if(p.name===P){l=p["sap:label"];break;}}}return l||P;},resolveFilterFieldConditions:function(p,e){var P=p.PropertyPath||p.Value.Path;return"{$filters>/conditions/"+P+"}";},resolveFilterFieldDataType:function(p,e){var P=p.PropertyPath||p.Value.Path;var a=e.property;return _(P,a);},resolveFilterRequired:function(p){return false;},getFilterFieldId:function(p){var P=p.PropertyPath||p.Value.Path;return"ovpGlobalMDCFilter-"+P;},getContextPath:function(v,i){return i&&i.context&&i.context.getPath();},getFilterFieldHelpId:function(p){var P=p.PropertyPath||p.Value.Path;return'ovpGlobalMDCFilter-'+P+"-FH";},resolveFilterMaxConditions:function(p,e){var P=p.PropertyPath||p.Value.Path;var a=e.property;var t=_(P,a);return(t==='Edm.Boolean')?1:undefined;}};return f;});