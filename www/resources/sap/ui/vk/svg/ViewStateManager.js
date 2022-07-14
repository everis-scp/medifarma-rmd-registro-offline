/*!
* SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
*/
sap.ui.define(["sap/base/Log","../Core","../ViewStateManagerBase","../cssColorToColor","../colorToCSSColor","../abgrToColor","../colorToABGR","../AnimationTrackType","./Scene","./Element"],function(L,v,V,c,a,b,d,A,S,E){"use strict";var e;var f=V.extend("sap.ui.vk.svg.ViewStateManager",{metadata:{}});var g=f.getMetadata().getParent().getClass().prototype;f.prototype.init=function(){if(g.init){g.init.call(this);}this._mask=(1|0);this._nodeHierarchy=null;this._selectedNodes=new Set();this._visibilityTracker=new e();this.setHighlightColor(0xBF0000BB);v.getEventBus().subscribe("sap.ui.vk","activateView",this._onActivateView,this);};f.prototype.exit=function(){v.getEventBus().unsubscribe("sap.ui.vk","activateView",this._onActivateView,this);};f.prototype._setContent=function(i){var s=null;if(i&&i instanceof S){s=i;}this._setScene(s);if(s){var k=s.getInitialView();if(k){this._currentView=k;this._resetNodesStatusByCurrenView(this._currentView);}}return this;};f.prototype._setScene=function(s){this._setNodeHierarchy(s?s.getDefaultNodeHierarchy():null);if(s){s.setViewStateManager(this);}this._scene=s;return this;};f.prototype._setNodeHierarchy=function(n){var o=this._nodeHierarchy;if(this._nodeHierarchy){this._nodeHierarchy=null;this._selectedNodes.clear();this._visibilityTracker.clear();}if(n){this._nodeHierarchy=n;this._nodeHierarchy.attachNodeReplaced(this._handleNodeReplaced,this);this._nodeHierarchy.attachNodeUpdated(this._handleNodeUpdated,this);this._nodeHierarchy.attachNodeRemoving(this._handleNodeRemoving,this);this._initialState={visible:[],hidden:[]};var t=this;var i=n.findNodesByName();i.forEach(function(k){(k.isVisible(t._mask)?t._initialState.visible:t._initialState.hidden).push(k);});this.fireVisibilityChanged({visible:this._initialState.visible,hidden:this._initialState.hidden});}if(n!==o){this.fireNodeHierarchyReplaced({oldNodeHierarchy:o,newNodeHierarchy:n});}return this;};f.prototype._handleNodeReplaced=function(i){var r=i.getParameter("ReplacedNodeRef");var k=i.getParameter("ReplacementNodeRef");if(this.getSelectionState(r)){this.setSelectionState(k,true);this.setSelectionState(r,false);}};f.prototype._handleNodeUpdated=function(i){var n=i.getParameter("nodeRef");if(this.getSelectionState(n)){this.setSelectionState(n,false);this.setSelectionState(n,true);}};f.prototype._handleNodeRemoving=function(i){var n=i.getParameter("nodeRef");if(this.getSelectionState(n)){this.setSelectionState(n,false,true,true);}};f.prototype.getNodeHierarchy=function(){return this._nodeHierarchy;};f.prototype.getVisibilityChanges=function(){return this.getShouldTrackVisibilityChanges()?this._visibilityTracker.getInfo(this.getNodeHierarchy()):null;};f.prototype.getCurrentView=function(){var i=sap.ui.getCore().byId(this.getViewManager());if(!i){return null;}var k=i.getActiveView();return k;};f.prototype.getVisibilityComplete=function(){var n=this.getNodeHierarchy(),i=n.findNodesByName(),k=[],l=[];i.forEach(function(m){var o=n.createNodeProxy(m);var p=o.getVeId();n.destroyNodeProxy(o);if(p){if(this.getVisibilityState(m)){k.push(p);}else{l.push(p);}}},this);return{visible:k,hidden:l};};f.prototype.resetVisibility=function(){this.setVisibilityState(this._initialState.visible,true,false);this.setVisibilityState(this._initialState.hidden,false,false);this._visibilityTracker.clear();};f.prototype.getVisibilityState=function(n){var m=this._mask;if(Array.isArray(n)){return n.map(function(i){return i?i.isVisible(m):false;});}return n?n.isVisible(m):false;};f.prototype.setVisibilityState=function(n,i,r,k){if(!Array.isArray(n)){n=[n];}var l=Array.isArray(i);var m=[];var o=n;if(r){o=[];n.forEach(function(w,x){var y=this._collectNodesRecursively(w);o=o.concat(y);var z=m.length;m.length=z+y.length;m.fill(l?i[x]:i,z);},this);}else if(!l){m.length=o.length;m.fill(i);}else{m=i;}var p=[];var u=new Set();var q=this._mask;var s=o.filter(function(w,x){if(u.has(w)){return false;}u.add(w);var s=w?w.isVisible(q)!=m[x]:false;if(s){p.push(m[x]);}return s;},this);if(s.length>0){var t={visible:[],hidden:[]};s.forEach(function(w,x){if(p[x]){w.setVisible(q,true);t.visible.push(w);if(k){var y=w.parent;while(y){y.visible=true;y=y.parent;}}}else{w.setVisible(q,false);t.hidden.push(w);}},this);if(this.getShouldTrackVisibilityChanges()){s.forEach(this._visibilityTracker.trackNodeRef,this._visibilityTracker);}this.fireVisibilityChanged(t);}return this;};f.prototype.enumerateSelection=function(i){this._selectedNodes.forEach(i);return this;};f.prototype.getSelectionState=function(n){var s=this._selectedNodes;function i(k){return s.has(k);}return Array.isArray(n)?n.map(i):i(n);};f.prototype._getSelectionComplete=function(){var n=this.getNodeHierarchy(),s=[];function i(k){var l=n.createNodeProxy(k);var m=l.getVeId();n.destroyNodeProxy(l);return m;}this._selectedNodes.forEach(function(k){var l=i(k);if(l){s.push(l);}});return{selected:s};};f.prototype._isAncestorSelected=function(n){n=n.parent;while(n){if(this._selectedNodes.has(n)){return true;}n=n.parent;}return false;};f.prototype._updateHighlightColor=function(n,p){var s=p||this._selectedNodes.has(n);n.setSelected(this._mask,s,this._highlightColorABGR);var k=n.children;for(var i=0,l=k.length;i<l;i++){this._updateHighlightColor(k[i],s);}};f.prototype.setSelectionState=function(n,s,r,i){if(!Array.isArray(n)){n=[n];}n=(r||this.getRecursiveSelection()?this._collectNodesRecursively(n):n).filter(function(l,m,o){return o.indexOf(l)===m;});if(this.getRecursiveSelection()&&!s){n=this._nodeHierarchy._appendAncestors(n);}var k=n.filter(function(l){return this._selectedNodes.has(l)!==s;},this);if(k.length>0){k.forEach(function(l){if(l){this._selectedNodes[s?"add":"delete"](l);}},this);k.forEach(function(l){if(l){this._updateHighlightColor(l,s||this._isAncestorSelected(l));}},this);if(!i){this.fireSelectionChanged({selected:s?k:[],unselected:s?[]:k});}}return this;};f.prototype.setSelectionStates=function(s,u,r,i){if(!Array.isArray(s)){s=[s];}if(!Array.isArray(u)){u=[u];}s=(r||this.getRecursiveSelection()?this._collectNodesRecursively(s):s);u=(r||this.getRecursiveSelection()?this._collectNodesRecursively(u):u);if(this.getRecursiveSelection()){u=this._nodeHierarchy._appendAncestors(u,s);}var k=s.filter(function(n){return n&&(this._selectedNodes.has(n)===false);},this);var l=u.filter(function(n){return n&&(this._selectedNodes.has(n)===true);},this);if(k.length>0||l.length>0){k.forEach(function(n){this._selectedNodes.add(n);this._updateHighlightColor(n,true);},this);l.forEach(function(n){this._selectedNodes.delete(n);},this);l.forEach(function(n){this._updateHighlightColor(n,this._isAncestorSelected(n));},this);if(!i){this.fireSelectionChanged({selected:k,unselected:l});}}return this;};f.prototype._collectNodesRecursively=function(n){var r=[],t=this;if(!Array.isArray(n)){n=[n];}n.forEach(function k(i){r.push(i);t._nodeHierarchy.enumerateChildren(i,k,false,true);});return r;};f.prototype._getOpacity=function(n){return n.opacity!==undefined?n.opacity:null;};f.prototype.getOpacity=function(n){if(Array.isArray(n)){return n.map(this._getOpacity,this);}else{return this._getOpacity(n);}};f.prototype.setTotalOpacity=function(n,t){this.setOpacity(n,t);return{opacity:t,totalOpacity:t};};f.prototype.setOpacity=function(n,o,r){if(!Array.isArray(n)){n=[n];}var i=Array.isArray(o);if(o===null){o=undefined;}else if(i){o.forEach(function(q,s){if(q===null){o[s]=undefined;}});}var k=[];var l=n;if(!i){k.length=l.length;k.fill(o);}else{k=o;}var m=[];var u=new Set();var p=l.filter(function(q,s){if(u.has(q)){return false;}u.add(q);var p=q?q.opacity!==k[s]:false;if(p){m.push(k[s]);}return p;},this);if(p.length>0){p.forEach(function(q,s){q.setOpacity(m[s]);},this);this.fireOpacityChanged({changed:p,opacity:i?m:m[0]});}return this;};f.prototype._getTintColorABGR=function(n){return n.tintColor!==undefined?n.tintColor:null;};f.prototype._getTintColor=function(n){return n.tintColor!==undefined?a(b(n.tintColor)):null;};f.prototype.getTintColor=function(n,i){var k=i?"_getTintColorABGR":"_getTintColor";if(Array.isArray(n)){return n.map(this[k],this);}else{return this[k](n);}};function h(i){switch(typeof i){case"number":return i>>>0;case"string":return sap.ui.core.CSSColor.isValid(i)?d(c(i)):undefined;default:return undefined;}}f.prototype.setTintColor=function(n,t,r){if(!Array.isArray(n)){n=[n];}var i=Array.isArray(t);var k=[];var l=n;if(r){l=[];n.forEach(function(w,x){var y=this._collectNodesRecursively(w);l=l.concat(y);var z=k.length;k.length=z+y.length;k.fill(i?t[x]:t,z);},this);}else if(!i){k.length=l.length;k.fill(t);}else{k=t;}var m=[];var u=new Set();var o=l.filter(function(w,x){if(u.has(w)){return false;}u.add(w);var o=w?w.tintColor!==h(k[x]):false;if(o){m.push(k[x]);}return o;},this);if(o.length>0){var p=this._mask;var q=[];o.forEach(function(w,x){var y=h(m[x]);w.setTintColor(p,y);q.push(y);},this);var s={changed:o,tintColor:i?m:m[0],tintColorABGR:i?q:q[0]};this.fireTintColorChanged(s);}return this;};f.prototype.setHighlightColor=function(i){i=h(i);if(i===undefined){return this;}this._highlightColorABGR=i;if(this._selectedNodes.size>0){this._selectedNodes.forEach(function(n){this._updateHighlightColor(n,true);},this);}this.fireHighlightColorChanged({highlightColor:a(b(i)),highlightColorABGR:i});return this;};f.prototype.getHighlightColor=function(i){return i?this._highlightColorABGR:a(b(this._highlightColorABGR));};f.prototype.getTransformationWorld=function(n){function i(k){return E._decompose(k._matrixWorld());}if(!Array.isArray(n)){return i(n);}var r=[];n.forEach(function(k){r.push(i(k));});return r;};f.prototype.getTransformation=function(n){function i(k){var t=E._decompose(k.matrix);return{translation:t.position,quaternion:t.quaternion,scale:t.scale};}if(!Array.isArray(n)){return i(n);}var r=[];n.forEach(function(k){r.push(i(k));});return r;};function j(i){return new Float32Array([i[0],i[4],i[1],i[5],i[3],i[7]]);}f.prototype.setTransformation=function(n,t){var i=Array.isArray(n);if(!Array.isArray(n)){n=[n];}var k={changed:[],transformation:[]};var l=function(m){return E._decompose(m.matrix);};if(!t){n.forEach(function(m){if(m.userData.matrix){m.setMatrix(m.userData.matrix);delete m.userData.matrix;}k.changed.push(m);k.transformation.push(l(m));},this);}else{if(!Array.isArray(t)){t=[t];}n.forEach(function(m,o){if(!m.userData.matrix){m.userData.matrix=m.matrix.slice();}var p=t[o];if(p.transform){m.setMatrix(j(p.transform));}else{var q;if(p.quaternion){q=p.quaternion;}else if(p.angleAxis){var r=p.angleAxis;var u=r[3]/2,s=Math.sin(u);q=[r[0]*s,r[1]*s,r[2]*s,Math.cos(u)];}else if(p.euler){L.warning("svg.ViewStateManager.setTransformation: Euler angles are not yet supported");q=[0,0,0,1];}var w=E._compose(p.translation,q,p.scale);m.setMatrix(w);}k.changed.push(m);k.transformation.push(l(m));},this);}if(!i){k.changed=k.changed[0];k.transformation=k.transformation[0];}this.fireTransformationChanged(k);return this;};f.prototype._resetNodesStatusByCurrenView=function(i){var n=this.getNodeHierarchy();var k=i.getNodeInfos();if(!n||!k){return;}var l=[];var t=[];k.forEach(function(p){if(p.target){if(p.transform){l.push(p.target);t.push({transform:p.transform});}else if(p[A.Translate]&&p[A.Rotate]&&p[A.Scale]){l.push(p.target);t.push({translation:p[A.Translate].slice(),quaternion:p[A.Rotate].slice(),scale:p[A.Scale].slice()});}}});if(i.userData&&i.userData.nodeStartDataByAnimation){i.userData.nodeStartDataByAnimation.forEach(function(p,q){if(p[A.Translate]&&p[A.Rotate]&&p[A.Scale]){l.push(q);t.push({translation:p[A.Translate].slice(),quaternion:p[A.Rotate].slice(),scale:p[A.Scale].slice()});}});}if(l.length){this.setTransformation(l,t);}var m=[];var o=[];k.forEach(function(p){if(!p.target.userData.skipIt){(p.visible?m:o).push(p.target);}});this.setVisibilityState(n.getChildren()[0].children,false,true);this.setVisibilityState(m,true,false);this.setVisibilityState(o,false,false);};f.prototype._onActivateView=function(i,k,l){var m=this.getViewManager();if(m&&l.source.getId()===m){this.activateView(l.view);}};f.prototype.activateView=function(i){this.fireViewStateApplying({view:i});this._resetNodesStatusByCurrenView(i);this.fireViewStateApplied({view:i});v.getEventBus().publish("sap.ui.vk","viewStateApplied",{source:this,view:i});return this;};f.prototype.setJoints=function(i,p){return this;};f.prototype._propagateOpacityToJointChildren=function(n,o){return this;};f.prototype._setJointNodeMatrix=function(){return this;};e=function(){this._visibilityChanges=new Set();};e.prototype.getInfo=function(n){var i=[];this._visibilityChanges.forEach(function(k){var l=n.createNodeProxy(k);var m=l.getVeId();n.destroyNodeProxy(l);if(m){i.push(m);}else{i.push(n.getScene().nodeRefToPersistentId(k));}});return i;};e.prototype.clear=function(){this._visibilityChanges.clear();};e.prototype.trackNodeRef=function(n){if(this._visibilityChanges.has(n)){this._visibilityChanges.delete(n);}else{this._visibilityChanges.add(n);}};return f;});
