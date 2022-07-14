/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define([],function(){"use strict";var m={};m.Node=function(){this.init.apply(this,arguments);};m.Node.prototype={init:function(d,c){this.dataSource=d;this.children=[];this.parent=null;this.count=c;},equals:function(o){return this===o;},setCount:function(c){this.count=c;},getAncestors:function(){var a=[],c=this;while(c.parent){a.push(c.parent);c=c.parent;}return a;},getChildren:function(){var c=[];for(var i=0;i<this.children.length;++i){var a=this.children[i];if(a.unsureWhetherNodeisBelowRoot){continue;}c.push(a);}return c;},getChildrenSortedByCount:function(){var c=this.getChildren();c.sort(function(a,b){return b.count-a.count;});return c;},clearChildren:function(){for(var i=0;i<this.children.length;++i){var c=this.children[i];c.parent=null;}this.children=[];},appendNode:function(n){n.parent=this;this.children.push(n);},appendNodeAtIndex:function(n,i){n.parent=this;this.children.splice(i,0,n);},removeChildNode:function(n){var i=this.children.indexOf(n);if(i<0){return;}this.children.splice(i,1);n.parent=null;},hasChild:function(n){return this.children.indexOf(n)>-1;},hasSibling:function(n){if(this.equals(n)){return false;}var p=this.parent;if(!p){return false;}if(p.hasChild(n)){return true;}return false;},_findNode:function(d,r){if(this.dataSource===d){r.push(this);return;}for(var i=0;i<this.children.length;++i){var c=this.children[i];c._findNode(d,r);if(r.length>0){return;}}},};m.Tree=function(){this.init.apply(this,arguments);};m.Tree.prototype={init:function(r){this.rootNode=new m.Node(r,null);},reset:function(){this.rootNode=null;},invalidate:function(d){var n=this.findNode(d);if(!n){this.rootNode.children=[];this.rootNode.count=0;return;}var c=null;while(n){n.children=c?[c]:[];n.count=null;if(c){c.count=null;}c=n;n=n.parent;}},findNode:function(d){if(!this.rootNode){return null;}var r=[];this.rootNode._findNode(d,r);return r.length>0?r[0]:null;},hasChild:function(d,a){if(a.equals(this.rootNode.dataSource)){return false;}var n=this.findNode(d);if(!n){return false;}var b=this.findNode(a);if(!b){return false;}return n.hasChild(b);},hasSibling:function(d,a){if(a.equals(this.rootNode.dataSource)){return false;}var n=this.findNode(d);if(!n){return false;}var b=this.findNode(a);if(!b){return false;}return n.hasSibling(b);},updateFromPerspective:function(d,p,a){var c;if(p){c=p.totalCount;}var b=this.findNode(d);if(!b){b=new m.Node(d,c);b.unsureWhetherNodeisBelowRoot=true;this.rootNode.appendNode(b);}b.setCount(c);if(d===a.allDataSource){b.setCount(b.count+a.getProperty("/appCount"));}this.updateFromPerspectiveChildDataSources(b,p,a);this.updateAppTreeNode(d,a);},updateAppTreeNode:function(d,a){if(d!==a.allDataSource&&d!==a.appDataSource){return;}var b=this.findNode(a.appDataSource);if(b){this.rootNode.removeChildNode(b);}var c=a.getProperty("/appCount");if(c===0&&d!==a.appDataSource){return;}b=new m.Node(a.appDataSource,c);this.rootNode.appendNodeAtIndex(b,0);},updateFromPerspectiveChildDataSources:function(c,p,a){if(!p||c.dataSource===a.appDataSource){return;}var f=p.facets;if(f.length===0){c.clearChildren();return;}var d=f[0];if(d.type!==a.sinaNext.FacetType.DataSource){return;}var b=d.items;c.clearChildren();if(a.favDataSource&&c.dataSource===a.allDataSource){var e={dataSource:a.favDataSource,dimensionValueFormatted:a.favDataSource.labelPlural,measureValue:0,measureValueFormatted:"",};b.splice(0,0,e);}for(var i=0;i<b.length;++i){var g=b[i];var h=g.dataSource;var j=this.findNode(h);if(!j){j=new m.Node(h,g.measureValue);}if(j.unsureWhetherNodeisBelowRoot){j.unsureWhetherNodeisBelowRoot=false;this.rootNode.removeChildNode(j);}if(j.parent){j.parent.removeChildNode(j);}j.setCount(g.measureValue);c.appendNode(j);}},};m.Formatter=function(){this.init.apply(this,arguments);};m.Formatter.prototype={init:function(r){this.tree=new m.Tree(r);},format:function(d,p,a){this.tree.updateFromPerspective(d,p,a);var t=this.generateTabStrips(d,a);return t;},invalidate:function(d){if(this.tree){this.tree.invalidate(d);}},generateTabStrips:function(d,a){var t=9999;var i,c,b;var e={strips:[],selected:null,};var n=this.tree.findNode(d);if(!n){if(d!==a.allDataSource){e.strips.push(a.allDataSource);}e.strips.push(d);e.selected=d;return e;}if(n.dataSource===a.allDataSource){e.strips.push(a.allDataSource);b=n.getChildrenSortedByCount();for(i=0;i<b.length&&e.strips.length<t;++i){c=b[i];e.strips.push(c.dataSource);}e.selected=a.allDataSource;return e;}if(n.parent===this.tree.rootNode&&!n.unsureWhetherNodeisBelowRoot){e.strips.push(a.allDataSource);var f=false;b=this.tree.rootNode.getChildrenSortedByCount();for(i=0;i<b.length;++i){c=b[i];if(f){if(e.strips.length>=t){break;}e.strips.push(c.dataSource);}else{if(e.strips.length<t-1||n===c){e.strips.push(c.dataSource);if(n===c){f=true;}}}}if(b.length===0){e.strips.push(n.dataSource);}e.selected=n.dataSource;return e;}e.strips.push(a.allDataSource);e.strips.push(n.dataSource);e.selected=n.dataSource;return e;},};return m;});
