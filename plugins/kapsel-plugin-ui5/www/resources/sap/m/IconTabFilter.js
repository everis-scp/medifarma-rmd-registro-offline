/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Item','sap/ui/core/Renderer','sap/ui/core/IconPool','sap/ui/core/InvisibleText','sap/ui/core/library','sap/ui/core/Control'],function(l,I,R,a,b,c,C){"use strict";var T=c.TextAlign;var d=c.TextDirection;var e=l.ImageHelper;var f=l.IconTabFilterDesign;var g=c.IconColor;var h=I.extend("sap.m.IconTabFilter",{metadata:{interfaces:["sap.m.IconTab","sap.ui.core.PopupInterface"],library:"sap.m",designtime:"sap/m/designtime/IconTabFilter.designtime",properties:{count:{type:"string",group:"Data",defaultValue:''},showAll:{type:"boolean",group:"Misc",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:''},iconColor:{type:"sap.ui.core.IconColor",group:"Appearance",defaultValue:g.Default},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true},visible:{type:"boolean",group:"Behavior",defaultValue:true},design:{type:"sap.m.IconTabFilterDesign",group:"Appearance",defaultValue:f.Vertical}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}}}});h._aAllIconColors=['sapMITBFilterCritical','sapMITBFilterPositive','sapMITBFilterNegative','sapMITBFilterDefault','sapMITBFilterNeutral'];h.prototype._getImageControl=function(i,p,j){var P={src:this.getIcon(),densityAware:this.getIconDensityAware(),useIconTooltip:false};if(P.src){this._oImageControl=e.getImageControl(this.getId()+"-icon",this._oImageControl,p,P,i,j);}else if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=null;}return this._oImageControl;};h.prototype.exit=function(E){if(this._oImageControl){this._oImageControl.destroy();}if(I.prototype.exit){I.prototype.exit.call(this,E);}if(this._invisibleText){this._invisibleText.destroy();this._invisibleText=null;}};h.prototype.invalidate=function(){var i=this.getParent(),o,O;if(!i){return;}o=i.getParent();if(!(o instanceof sap.m.IconTabBar)){i.invalidate();return;}O=o.getParent();if(O instanceof sap.m.ObjectHeader){O.invalidate();}else{o.invalidate();}};h.prototype.setProperty=function(p,v,s){switch(p){case'textDirection':case'text':case'count':case'showAll':case'icon':case'iconColor':case'iconDensityAware':case'design':if(this.getProperty(p)===v){return this;}C.prototype.setProperty.call(this,p,v,true);if(!s){var i=this.getParent();if(i instanceof sap.m.IconTabHeader){i.invalidate();}}break;default:C.prototype.setProperty.apply(this,arguments);break;}return this;};h.prototype._getNonEmptyKey=function(){var k=this.getKey();if(k){return k;}return this.getId();};h.prototype.render=function(r,v,i){var t=this;if(!t.getVisible()){return;}var j=this.getParent(),k=j.getParent(),m=k instanceof sap.m.IconTabBar,n=sap.ui.getCore().getLibraryResourceBundle('sap.m'),o='role="tab"',p=t.getId(),q=t.getCount(),s=t.getText(),u=t.getIcon(),w=t.getDesign(),x=t.getIconColor(),y=x==='Positive'||x==='Critical'||x==='Negative',z=w===f.Horizontal,A=m&&k.getUpperCase(),B=j._bTextOnly,D=j._bInLine||j.isInlineMode();if(m){o+=' aria-controls="'+k.sId+'-content" ';}if(s.length||q!==''||u){o+='aria-labelledby="';var E=[];if(q!==''){E.push(p+'-count');}if(s.length){E.push(p+'-text');}if(u){E.push(p+'-icon');}if(y){E.push(p+'-iconColor');}o+=E.join(' ');o+='"';}r.write('<div '+o+' ');if(v!==undefined&&i!==undefined){r.writeAccessibilityState({posinset:v+1,setsize:i});}r.writeElementData(t);r.addClass('sapMITBItem');if(!q){r.addClass('sapMITBItemNoCount');}if(z){r.addClass('sapMITBHorizontal');}else{r.addClass('sapMITBVertical');}if(t.getShowAll()){r.addClass('sapMITBAll');}else{r.addClass('sapMITBFilter');r.addClass('sapMITBFilter'+x);}if(!t.getEnabled()){r.addClass('sapMITBDisabled');r.writeAttribute('aria-disabled',true);}r.writeAttribute('aria-selected',false);var F=t.getTooltip_AsString();if(F){r.writeAttributeEscaped('title',F);}r.writeClasses();r.write('>');if(!D){r.write('<div id="'+p+'-tab" class="sapMITBTab">');if(!t.getShowAll()||!u){if(y){r.write('<div id="'+p+'-iconColor" style="display: none;">'+n.getText('ICONTABBAR_ICONCOLOR_'+x.toUpperCase())+'</div>');}r.renderControl(t._getImageControl(['sapMITBFilterIcon','sapMITBFilter'+x],j,h._aAllIconColors));}if(!t.getShowAll()&&!u&&!B){r.write('<span class="sapMITBFilterNoIcon"> </span>');}if(z&&!t.getShowAll()){r.write('</div>');r.write('<div class="sapMITBHorizontalWrapper">');}r.write('<span id="'+p+'-count" ');r.addClass('sapMITBCount');r.writeClasses();r.write('>');if(q===''&&z){r.write('&nbsp;');}else{r.writeEscaped(q);}r.write('</span>');if(!z){r.write('</div>');}}if(s.length){r.write('<div id="'+p+'-text" ');r.addClass('sapMITBText');if(A){r.addClass('sapMITBTextUpperCase');}if(D){r.writeAttribute('dir','ltr');}r.writeClasses();r.write('>');r.writeEscaped(j._getDisplayText(t));r.write('</div>');}if(!D&&z){r.write('</div>');}r.write('<div class="sapMITBContentArrow"></div>');r.write('</div>');};h.prototype.renderInSelectList=function(r,s,v,i){var t=this;if(this._invisibleText){this._invisibleText.destroy();this._invisibleText=null;}if(!t.getVisible()){return;}var j=true,k,m=s._iconTabHeader,n=sap.ui.getCore().getLibraryResourceBundle('sap.m');if(m){j=m._bTextOnly;k=s._bIconOnly;}r.write('<li');r.writeElementData(t);r.writeAttribute('tabindex','-1');r.writeAttribute('role','option');if(v!==undefined&&i!==undefined){r.writeAttribute('aria-posinset',v+1);r.writeAttribute('aria-setsize',i);}var o=t.getTooltip_AsString();if(o){r.writeAttributeEscaped('title',o);}if(!t.getEnabled()){r.addClass('sapMITBDisabled');r.writeAttribute('aria-disabled',true);}r.addClass('sapMITBSelectItem');if(s.getSelectedItem()==t){r.addClass('sapMITBSelectItemSelected');r.writeAttribute('aria-selected',true);}var p=t.getIconColor();r.addClass('sapMITBFilter'+p);r.writeClasses();var q=t.getId(),u=p=='Positive'||p=='Critical'||p=='Negative';var w=' aria-labelledby="';if(!k){w+=q+'-text ';}if(!j&&t.getIcon()){w+=q+'-icon ';}if(u){this._invisibleText=new b({text:n.getText('ICONTABBAR_ICONCOLOR_'+p.toUpperCase())});w+=this._invisibleText.getId();}w+='"';r.write(w+'>');if(this._invisibleText){r.renderControl(this._invisibleText);}if(!j){this._renderIcon(r);}if(!k){this._renderText(r);}r.write('</li>');};h.prototype._renderIcon=function(r){var i=this.getIcon();if(i){var j=a.getIconInfo(i);var k=['sapMITBSelectItemIcon'];if(j&&!j.suppressMirroring){k.push('sapUiIconMirrorInRTL');}r.writeIcon(i,k,{id:this.getId()+'-icon','aria-hidden':true});}else{r.write('<span class="sapUiIcon"></span>');}};h.prototype._renderText=function(r){var t=this.getText(),i=this.getCount(),j=sap.ui.getCore().getConfiguration().getRTL(),k=this.getTextDirection();r.write('<span');r.writeAttribute('id',this.getId()+'-text');r.writeAttribute('dir','ltr');r.addClass('sapMText');r.addClass('sapMTextNoWrap');r.addClass('sapMITBText');r.writeClasses();if(k!==d.Inherit){r.writeAttribute('dir',k.toLowerCase());}var m=R.getTextAlign(T.Begin,k);if(m){r.addStyle('text-align',m);r.writeStyles();}if(i){if(j){t='('+i+') '+t;}else{t+=' ('+i+')';}}r.write('>');r.writeEscaped(t);r.write('</span>');};return h;});
