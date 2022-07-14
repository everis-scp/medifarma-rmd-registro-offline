/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseListContent","./TimelineContentRenderer","sap/ui/integration/library","sap/m/library","sap/ui/core/Core","sap/ui/integration/util/BindingHelper"],function(B,T,l,L,C,a){"use strict";var A=l.CardActionArea;var b,c;var d=B.extend("sap.ui.integration.cards.TimelineContent",{metadata:{library:"sap.ui.integration"},renderer:T});d.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._oTimeLineItemTemplate){this._oTimeLineItemTemplate.destroy();this._oTimeLineItemTemplate=null;}};d.prototype.loadDependencies=function(o){return new Promise(function(r,e){C.loadLibrary("sap.suite.ui.commons",{async:true}).then(function(){sap.ui.require(["sap/suite/ui/commons/Timeline","sap/suite/ui/commons/TimelineItem"],function(_,f){b=_;c=f;r();},function(E){e(E);});}).catch(function(){e("Timeline content type is not available with this distribution.");});});};d.prototype._getTimeline=function(){var t=this.getAggregation("_content");if(this._bIsBeingDestroyed){return null;}if(!t){t=new b({id:this.getId()+"-Timeline",showHeaderBar:false,enableScroll:false});this.setAggregation("_content",t);}return t;};d.prototype.setConfiguration=function(o){B.prototype.setConfiguration.apply(this,arguments);if(!o){return this;}if(o.items){this._setStaticItems(o.items);return this;}if(o.item){this._setItem(o.item);}return this;};d.prototype.onDataChanged=function(){this._checkHiddenNavigationItems(this.getConfiguration().item);};d.prototype._setItem=function(i){var s={userNameClickable:false,title:i.title&&i.title.value,text:i.description&&i.description.value,dateTime:i.dateTime&&i.dateTime.value,userName:i.owner&&i.owner.value,icon:i.icon&&i.icon.src};if(i.ownerImage&&i.ownerImage.value){s.userPicture=a.formattedProperty(i.ownerImage.value,function(v){return this._oIconFormatter.formatSrc(v);}.bind(this));}this._oTimeLineItemTemplate=new c(s);this._oActions.attach({area:A.ContentItem,actions:i.actions,control:this,actionControl:this._oItemTemplate});var o={template:this._oTimeLineItemTemplate};this._filterHiddenNavigationItems(i,o);this._bindAggregationToControl("content",this._getTimeline(),o);return this;};d.prototype._setStaticItems=function(i){var t=this._getTimeline(),o;i.forEach(function(I){o=new c({title:I.title,text:I.description,userPicture:I.ownerImage,dateTime:I.dateTime,userName:I.owner,icon:I.icon});t.addContent(o);});};d.prototype.getInnerList=function(){return this._getTimeline();};return d;});
