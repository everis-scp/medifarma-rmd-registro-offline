// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sinaDefine(['../../../core/core','../../../core/util','../../../sina/SinaObject','./JoinConditions'],function(c,u,S,J){"use strict";return S.derive({_init:function(p){this.active=this.checkActive();this.getPropertyMetadata=p.getPropertyMetadata;this.urlPrefix=p.urlPrefix;this.navigationTargetTemplatesInitialized=false;this.navigationTargetTemplatesMap={};this.objectTypeMap={};this.ignoredSemanticObjectTypes={LastChangedByUser:true,CreationDate:true,CreatedByUser:true};},checkActive:function(){var s=u.getUrlParameter('sors');if(s==='true'){return true;}return false;},cleanup:function(){this.objectTypeMap=null;},registerObjectType:function(o){if(!this.active){return;}var m={type:o.type,label:o.label,propertyMap:{}};this.objectTypeMap[o.type]=m;for(var i=0;i<o.properties.length;++i){var p=o.properties[i];var a=this.getPropertyMetadata(p);this.filterSemanticObjectType(a);m.propertyMap[a.name]=a;}},filterSemanticObjectType:function(p){if(this.ignoredSemanticObjectTypes[p.semanticObjectType]){delete p.semanticObjectType;}},finishRegistration:function(){if(!this.active){return;}this.calculateNavigationTargetTemplates();},calculateNavigationTargetTemplates:function(){if(this.navigationTargetTemplatesInitialized){return;}var j=this.collectJoinConditions();this.navigationTargetTemplatesMap=this.createNavTargetTemplatesFromJoinConditions(j);this.cleanup();this.navigationTargetTemplatesInitialized=true;},createNavTargetTemplatesFromJoinConditions:function(j){var n={};for(var s in j){var o=j[s];var a=[];for(var t in o){var b=o[t];if(!b){continue;}a.push.apply(a,b.generateNavigationTargetTemplates());}if(a.length!==0){n[s]=a;}}return n;},collectJoinConditions:function(){var s=this.createIndex();var j={};for(var o in this.objectTypeMap){var a=this.collectJoinConditionsForObjectType(s,o);if(!c.isEmptyObject(a)){j[o]=a;}}return j;},collectJoinConditionsForObjectType:function(s,o){var a={};var b=this.objectTypeMap[o];var g=function(f){var l=a[f];if(!l){l=new J({sina:this.sina,navigationTargetGenerator:this,sourceObjectType:o,targetObjectType:f});a[f]=l;}return l;}.bind(this);for(var p in b.propertyMap){var d=b.propertyMap[p];var e=d.semanticObjectType;if(!d.response){continue;}if(!e){continue;}var t=s[e];for(var f in t){if(f===b.type){continue;}var h=this.objectTypeMap[f];var i=t[f];for(var j in i){var k=h.propertyMap[j];if(!k.request){continue;}var l=g(f);l.add({sourcePropertyName:p,targetPropertyName:j,semanticObjectType:e});}}}return a;},createIndex:function(){var s={};for(var o in this.objectTypeMap){this.createIndexForObjectType(s,o);}return s;},createIndexForObjectType:function(s,o){var a=this.objectTypeMap[o];for(var p in a.propertyMap){var b=a.propertyMap[p];var d=b.semanticObjectType;if(!d){continue;}var e=s[d];if(!e){e={};s[d]=e;}var f=e[a.type];if(!f){f={};e[a.type]=f;}var g=f[p];if(!g){g=true;f[p]=true;}}},formatItem:function(a){var b=function(d,e){for(var i=0;i<e.length;++i){var f=e[i];d[f.id]=f;}};var d={};b(d,a.detailAttributes);b(d,a.titleAttributes);return d;},generateNavigationTargetsForItem:function(a){var n=this.navigationTargetTemplatesMap[a.dataSource.id];if(!n){return undefined;}var f=this.formatItem(a);var b=[];for(var i=0;i<n.length;++i){var d=n[i];var e=d.generate(f);if(!e){continue;}b.push(e);}return b;},generateNavigationTargets:function(s){if(!this.active){return;}for(var i=0;i<s.items.length;++i){var a=s.items[i];var n=this.generateNavigationTargetsForItem(a);a.navigationTargets=a.navigationTargets||[];a.navigationTargets.push.apply(a.navigationTargets,n);}}});});
