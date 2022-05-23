// Copyright (c) 2009-2017 SAP SE, All Rights Reserved
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/util/isEmptyObject","sap/base/Log"],function(q,i,L){"use strict";function P(){}P.prototype._getItemIndex=function(I,s){var r;for(r=0;r<I.length;r++){if(I[r].id===s){break;}}r=(r>=I.length)?-1:r;return r;};P.prototype._applyRenameGroup=function(g,n,o){var G,b=false;if(!n){return false;}if(g&&o&&o.groups&&o.groups[g]){G=o.groups[g];if(G.identification&&G.identification.title){o.groups[g].identification.title=n;b=true;}}return b;};P.prototype._applyGroupVisibility=function(g,G,o){var b=false;if(G===undefined){return false;}if(g&&o&&o.groups&&o.groups[g]){o.groups[g].identification.isVisible=G;b=true;}return b;};P.prototype.mixinPersonalization=function(o,p){var d=new q.Deferred(),t=this;if(!p||i(p)){return d.resolve(o).promise();}if(p.groups){Object.keys(p.groups).forEach(function(g){var G=p.groups[g];if(o.groups[g]){if(G.identification){if(G.identification.title){t._applyRenameGroup(g,G.identification.title,o);}if(G.identification.hasOwnProperty("isVisible")&&G.identification.isVisible===false){t._applyGroupVisibility(g,false,o);}}}});}this._applyAddGroups(o,p);if(p.removedGroups&&Array.isArray(p.removedGroups)){p.removedGroups.forEach(function(g){t._applyRemoveGroup(o,g);});}this._applyMoveGroup(o,p);this._applyItemChanges(o,p);this._applyTileSettings(o,p);return d.resolve(o).promise();};P.prototype._applyAddGroups=function(o,p){var n=[];o.site=o.site||{};o.site.payload=o.site.payload||{};o.site.payload.groupsOrder=o.site.payload.groupsOrder||[];o.groups=o.groups||{};if(Array.isArray(p.groupOrder)){o.site.payload.groupsOrder.forEach(function(g){if(p.groupOrder.indexOf(g)===-1){if((p.removedGroups&&p.removedGroups.indexOf(g)===-1)||!p.removedGroups){n.push(g);}}});}if(Array.isArray(p.groupOrder)&&p.addedGroups&&Object.keys(p.addedGroups).length>0){Object.keys(p.addedGroups).forEach(function(g){o.groups[g]=p.addedGroups[g];o.groups[g].payload.isPreset=false;});o.site.payload.groupsOrder=p.groupOrder;}n.forEach(function(N){o.site.payload.groupsOrder.push(N);});};P.prototype._checkRenameGroup=function(g,p,o,a){if(g&&p&&o){if(o[g]){if(p[g].identification.title!==o[g].identification.title){a=a||{};a.groups=a.groups||{};a.groups[g]=a.groups[g]||{};a.groups[g].identification=a.groups[g].identification||{};a.groups[g].identification.title=p[g].identification.title;}}}return a;};P.prototype._checkTileSettings=function(p,o){if(!p.modifiedTiles){return;}o.modifiedTiles=p.modifiedTiles;};P.prototype._applyTileSettings=function(s,p){var g,m;if(!p.modifiedTiles){return;}g=Object.keys(s.groups).map(function(k){return this[k];},s.groups);m=Object.keys(p.modifiedTiles).map(function(k){return this[k];},p.modifiedTiles);g.some(function(G){["tiles","links"].forEach(function(t){if(G.payload[t]){G.payload[t].some(function(T){var a;m.some(function(u,I){if(u.id===T.id){if(u.title!==undefined){T.title=u.title;}if(u.subTitle!==undefined){T.subTitle=u.subTitle;}if(u.info!==undefined){T.info=u.info;}a=I;return true;}return false;});if(a!==undefined){m.splice(a,1);}return m.length===0;});}});return m.length===0;});s.modifiedTiles=p.modifiedTiles;};P.prototype._checkGroupVisibility=function(g,p,o,a){if(g&&p&&o){if(o[g]){if(p[g].identification.isVisible!==o[g].identification.isVisible&&typeof p[g].identification.isVisible==="boolean"){a=a||{};a.groups=a.groups||{};a.groups[g]=a.groups[g]||{};a.groups[g].identification=a.groups[g].identification||{};a.groups[g].identification.isVisible=p[g].identification.isVisible;}}}return a;};P.prototype._addGroupToPersonalizationDelta=function(p,o,g){var s=false,G,n;if(p&&p.site&&p.site.payload&&p.site.payload.groupsOrder&&p.groups&&g&&p.groups[g]&&o){G=p.site.payload.groupsOrder;n=p.groups[g];o.addedGroups=o.addedGroups||{};o.addedGroups[g]={};o.addedGroups[g].identification=q.extend({},n.identification);o.addedGroups[g].payload=q.extend({},n.payload);o.addedGroups[g].payload.tiles=[];o.addedGroups[g].payload.links=[];o.groupOrder=G;s=true;}return s;};P.prototype.extractPersonalization=function(p,o){var d=new q.Deferred(),a,b={},O,e,t=this;if(o&&o._version){b._version=o._version;}if(p&&p.groups&&o&&o.groups){a=p.groups;O=o.groups;e=this._getExtractHelperObject(o,p,b);Object.keys(O).forEach(function(g){t._checkRemoveGroup(p,b,g);t._extractFromOriginalSiteOneGroup(o,e,g,"tiles");t._extractFromOriginalSiteOneGroup(o,e,g,"links");});Object.keys(a).forEach(function(g){if(O[g]){t._checkRenameGroup(g,a,O,b);t._checkGroupVisibility(g,a,O,b);}else{t._addGroupToPersonalizationDelta(p,b,g);}t._extractFromPersonalizedSiteOneGroup(p,e,g,"tiles");t._extractFromPersonalizedSiteOneGroup(p,e,g,"links");});this._checkMoveGroup(p,o,b);this._checkTileSettings(p,b);this._cleanupRemovedGroups(o,b);if(e.oPersonalizationDelta.movedTiles&&i(e.oPersonalizationDelta.movedTiles)){delete(e.oPersonalizationDelta.movedTiles);}if(e.oPersonalizationDelta.movedLinks&&i(e.oPersonalizationDelta.movedLinks)){delete(e.oPersonalizationDelta.movedLinks);}}return d.resolve(b).promise();};P.prototype._checkRemoveGroup=function(p,o,O){var s=false;if(p&&p.groups&&o&&O){if(!p.groups[O]){o.removedGroups=o.removedGroups||[];o.groupOrder=o.groupOrder||[];if(o.removedGroups.indexOf(O)===-1){o.removedGroups.push(O);}if(p.site&&p.site.payload&&p.site.payload.groupsOrder&&Array.isArray(p.site.payload.groupsOrder)){o.groupOrder=p.site.payload.groupsOrder.slice(0);}}s=true;}return s;};P.prototype._applyRemoveGroup=function(o,g){var O,G,a;if(o&&o.groups&&o.site&&o.site.payload&&o.site.payload.groupsOrder&&g){O=o.groups;G=o.site.payload.groupsOrder;a=G.indexOf(g);if(!(a===-1)){G.splice(a,1);delete(O[g]);return true;}}return false;};P.prototype._checkMoveGroup=function(p,o,a){var b,O,c=false,s=false;if(p.site&&p.site.payload&&Array.isArray(p.site.payload.groupsOrder)&&o.site&&o.site.payload&&Array.isArray(o.site.payload.groupsOrder)){b=p.site.payload.groupsOrder;O=o.site.payload.groupsOrder;if(b.length===O.length){c=(function(){var S=false,I;for(I=0;I<O.length;I++){if(O[I]!==b[I]){S=true;break;}}return S;})();if(c){a.groupOrder=b;s=true;}}}return s;};P.prototype._applyMoveGroup=function(o,p){var s=false;if(Array.isArray(p.groupOrder)){o.site=o.site||{};o.site.payload=o.site.payload||{};if(!Array.isArray(o.site.payload.groupsOrder)){o.site.payload.groupsOrder=[];}if(o.site.payload.groupsOrder.length===p.groupOrder.length){o.site.payload.groupsOrder=p.groupOrder;s=true;}}return s;};P.prototype._getHashedItemsFromSite=function(s){var r=null;if(s&&s.groups){if(Object.keys(s.groups).length>0){r={};Object.keys(s.groups).forEach(function(g){var G=s.groups[g],a;r[g]={};if(G.payload){["tiles","links"].forEach(function(t){r[g][t]={};if(Array.isArray(G.payload[t])){a=G.payload[t];a.forEach(function(I,b){var c;if(I.id){c=I.id;r[g][t][c]={iIndex:b,sItemId:I};}});}});}});}}return r;};P.prototype._getExtractHelperObject=function(o,p,a){var r=null;r={};r.oHashedItemsOriginal=this._getHashedItemsFromSite(o)||{};r.oHashedItemsPersonalized=this._getHashedItemsFromSite(p);r.oPersonalizationDelta=a;return r;};P.prototype._extractFromOriginalSiteOneGroup=function(o,e,g,I){var s=false,O,m,M,p="movedTiles";I=I||"tiles";if(I!=="tiles"){p="movedLinks";}M=function(a,f){m[a]=m[a]?m[a]:{};m[a].fromGroup=f;m[a].toGroup=null;};if(e&&e.oHashedItemsPersonalized&&e.oPersonalizationDelta&&o&&o.groups&&o.groups[g]&&o.groups[g].payload&&Array.isArray(o.groups[g].payload[I])){O=o.groups[g].payload[I];e.oPersonalizationDelta[p]=e.oPersonalizationDelta[p]?e.oPersonalizationDelta[p]:{};m=e.oPersonalizationDelta[p];if(e.oHashedItemsPersonalized[g]){O.forEach(function(a){if(!e.oHashedItemsPersonalized[g][I][a.id]){M(a.id,g);}});s=true;}else{O.forEach(function(a){M(a.id,g);});s=true;}}return s;};P.prototype._handleItemChangeExtract=function(e,g,I){return false;};P.prototype._extractFromPersonalizedSiteOneGroup=function(p,e,g,I){var s=false,m,t,T=false,a,b=this,c="movedTiles";I=I||"tiles";if((I!=="tiles")&&(I!=="links")){return s;}if(I!=="tiles"){c="movedLinks";}if(e&&e.oPersonalizationDelta&&p&&p.groups&&p.groups[g]&&p.groups[g].payload&&Array.isArray(p.groups[g].payload[I])){a=p.groups[g].payload[I];e.oPersonalizationDelta[c]=e.oPersonalizationDelta[c]?e.oPersonalizationDelta[c]:{};m=e.oPersonalizationDelta[c];t=[];a.forEach(function(o,d){t.push(o.id);if(e.oHashedItemsOriginal[g]&&e.oHashedItemsOriginal[g][I][o.id]){if(m[o.id]){L.error("Extract personalization failed","The Tile ID "+o.id+" is not unique in the site","PersonalizationProcessor");delete(m[o.id]);}if(e.oHashedItemsOriginal[g][I][o.id].iIndex!==d){T=true;}b._handleItemChangeExtract(e,g,I);}else{T=true;if(m[o.id]){if(m[o.id].fromGroup&&(m[o.id].fromGroup!==g)){if(!m[o.id].toGroup){m[o.id].toGroup=g;b._handleItemChangeExtract(e,g,I);}}}else{m[o.id]={};m[o.id].fromGroup=null;m[o.id].toGroup=g;m[o.id].item=o;}}});if(T){e.oPersonalizationDelta.groups=e.oPersonalizationDelta.groups||{};e.oPersonalizationDelta.groups[g]=e.oPersonalizationDelta.groups[g]||{};e.oPersonalizationDelta.groups[g].payload=e.oPersonalizationDelta.groups[g].payload||{};if(I==="tiles"){e.oPersonalizationDelta.groups[g].payload.tileOrder=t;}else{e.oPersonalizationDelta.groups[g].payload.linkOrder=t;}}s=true;}return s;};P.prototype._cleanupRemovedGroups=function(o,p){var I,m;if(p.removedGroups&&p&&Array.isArray(p.removedGroups)&&(p.removedGroups.length>0)){p.removedGroups.forEach(function(g){if(o&&o.groups&&o.groups[g]&&o.groups[g].payload){[{sType:"tiles",sPersonalizationDeltaType:"movedTiles"},{sType:"links",sPersonalizationDeltaType:"movedLinks"}].forEach(function(t){if(Array.isArray(o.groups[g].payload[t.sType])){I=o.groups[g].payload[t.sType];I.forEach(function(a){if(p[t.sPersonalizationDeltaType]){m=p[t.sPersonalizationDeltaType][a.id];if(m&&m.fromGroup&&(m.fromGroup===g)&&!m.toGroup){delete(p[t.sPersonalizationDeltaType][a.id]);}}});}});}});}};P.prototype._setItemOrderOnSiteCollection=function(o,I){var s=true,S=o.length,a,b={},c,C,d,f;if(!Array.isArray(o)||!Array.isArray(o)||(o.length!==I.length)){return false;}a=o.splice(0,o.length);for(c=0;c<I.length;c++){d=I[c];C=a.shift();if(C&&d===C.id){o.push(C);}else if(b[d]){o.push(b[d]);delete(b[d]);if(C){b[C.id]=C;}}else if(C){b[C.id]=C;f=false;while(a.length>0){C=a.shift();if(d===C.id){o.push(C);f=true;break;}else{b[C.id]=C;}}if(!f){s=false;}}}if(o.length!==S){s=false;}return s;};P.prototype._setItemOrderOnSiteGroupForItemType=function(o,d,I){var s=true,t,a;if((I==="tiles")||(I==="links")){a=(I==="tiles")?"tileOrder":"linkOrder";}else{return false;}if(d.payload&&Array.isArray(d.payload[a])&&(d.payload[a].length>0)){if(o.payload&&Array.isArray(o.payload[I])&&(o.payload[I].length>0)){t=this._setItemOrderOnSiteCollection(o.payload[I],d.payload[a]);if(!t){s=false;}}else{s=false;}}return s;};P.prototype._setItemOrderOnSite=function(o,p){var s=true,t,a=this;if(o.groups&&p.groups){Object.keys(p.groups).forEach(function(g){if(p.groups[g]&&o.groups[g]){t=a._setItemOrderOnSiteGroupForItemType(o.groups[g],p.groups[g],"tiles");if(!t){s=false;}t=a._setItemOrderOnSiteGroupForItemType(o.groups[g],p.groups[g],"links");if(!t){s=false;}}});}return s;};P.prototype._applyMoveItemsWithoutOrder=function(o,p,I){var s=true,t,T,a="tileOrder",d,b,c,O=[],e=this;function f(C,g){var s=true;if(o.groups[g]&&o.groups[g].payload&&p.groups&&p.groups[g]&&p.groups[g].payload&&Array.isArray(p.groups[g].payload[a])&&(p.groups[g].payload[a].length>0)){if(!Array.isArray(o.groups[g].payload[I])){o.groups[g].payload[I]=[];}o.groups[g].payload[I].push(C);}else{s=false;}return s;}if((I==="tiles")||(I==="links")){T=(I==="tiles")?"movedTiles":"movedLinks";a=(I==="tiles")?"tileOrder":"linkOrder";}else{return false;}if(!o||!o.groups||!o.site||!o.site.payload||!Array.isArray(o.site.payload.groupsOrder)||!p){return false;}if(p[T]){Object.keys(p[T]).forEach(function(g){d=p[T][g];if(d.fromGroup){if(d.toGroup){if(d.fromGroup!==d.toGroup){if(o.groups[d.fromGroup]&&o.groups[d.fromGroup].payload&&Array.isArray(o.groups[d.fromGroup].payload[I])){O=o.groups[d.fromGroup].payload[I];b=e._getItemIndex(O,g);if(b>=0){c=O.splice(b,1);t=f(c[0],d.toGroup);if(!t){s=false;}}else{s=false;}}else{s=false;}}else{s=false;}}else if(o.groups[d.fromGroup]&&o.groups[d.fromGroup].payload&&Array.isArray(o.groups[d.fromGroup].payload[I])){O=o.groups[d.fromGroup].payload[I];b=e._getItemIndex(O,g);if(b>=0){O.splice(b,1);}else{s=false;}}else{s=false;}}else if(d.toGroup){if(d.item&&!i(d.item)){t=f(d.item,d.toGroup);if(!t){s=false;}}else{s=false;}}else{s=false;}});}return s;};P.prototype._applyItemChanges=function(o,p){var s=true,S;S=this._applyMoveItemsWithoutOrder(o,p,"tiles");if(!S){s=false;}S=this._applyMoveItemsWithoutOrder(o,p,"links");if(!S){s=false;}if(p.groups){S=this._setItemOrderOnSite(o,p);if(!S){s=false;}}return s;};return P;});
