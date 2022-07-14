/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)

        (c) Copyright 2009-2015 SAP SE. All rights reserved
    
 */
sap.ui.define(["./Element","./Path","sap/base/util/uid"],function(E,P,u){"use strict";var T=function(p){p=p||{};E.call(this,p);this.type="Text";this.text=p.text;this.content=p.content||(p.children?j(p.children,p.textStyles):[]);this.style=p.style||{};this.style.size=t(this.style.size||1);this.x=(p.textTranslate&&p.textTranslate[0])||p.x||0;this.y=(p.textTranslate&&p.textTranslate[1])||p.y||0;this.fillStyle=p.fillStyle||{colour:[0,0,0,1]};this.lineStyle=p.lineStyle||{colour:[0,0,0,0],width:1};if(this.style.fill){this.fillStyle={colour:this.style.fill};}if(this.style.stroke){if(this.lineStyle==null){this.lineStyle={};}this.lineStyle.colour=this.style.stroke;}this.setMaterial(p.material);};T.prototype=Object.assign(Object.create(E.prototype),{constructor:T});T.prototype.tagName=function(){return"text";};T.prototype.defaultFillAlpha=1;var a=document.createElement("canvas");var b=a.getContext("2d");T.prototype._expandBoundingBox=function(m,n){if(this.domRef){var o=this.domRef.getBBox();if(o){this._expandBoundingBoxCE(m,n,o.x+o.width*0.5,o.y+o.height*0.5,o.width*0.5,o.height*0.5);return;}}function p(y){var z="";for(var i=0,l=y.length;i<l;i++){var c=y[i];if(c.text){z+=c.text;}if(c.content){z+=p(c.content);}}return z;}var q=isNaN(this.strokeWidth)?0:this.strokeWidth*0.5;b.font=this.style.size+"px "+(this.style.fontFace||"Arial");var v=b.measureText((this.text?this.text:"")+(this.content?p(this.content):""));var w=v.width*0.5+q;var x=(v.actualBoundingBoxAscent||this.style.size)*0.5+q;this._expandBoundingBoxCE(m,n,this.x+w,this.y-x,w,x);};function s(c,i){if(c.size){i("font-size",c.size);}if(c.fontFace){i("font-family",c.fontFace);}if(c.fontStyle){i("font-style",c.fontStyle);}if(c.fontWeight){i("font-weight",c.fontWeight);}if(c.textDecoration){i("text-decoration",c.textDecoration);}if(c.fill){i("fill",c.fill);}if(c.stroke){i("stroke",c.stroke);}}T.prototype._setSpecificAttributes=function(c){c("x",this.x);c("y",this.y);s(this.style,c);};function d(c,i){if(c.x!==undefined){i("x",c.x);}if(c.y!==undefined){i("y",c.y);}if(c.dx){i("dx",c.dx);}if(c.dy){i("dy",c.dy);}}function r(m,n){if(!m||m.length===0){return;}var o=n.writeAttribute.bind(n);for(var i=0,l=m.length;i<l;i++){var c=m[i];switch(c.type){case 10:case undefined:case"text":n.write(c.text);break;case 11:case"span":n.write("<tspan");d(c,o);if(c.style){s(c.style,o);}n.write(">");if(c.text){n.write(c.text);}r(c.content,n);n.write("</tspan>");break;case 12:case"path":n.write("<textPath");d(c,o);if(c.style){s(c.style,o);}if(!c.path&&c.pathSegments){c.path=new P({segments:c.pathSegments});}var p=c.path;if(p instanceof P){n.writeAttribute("href","#"+p.uid);n.write(">");n.write("<"+p.tagName());n.writeAttribute("id",p.uid);p._setSpecificAttributes(o);n.write("/>");}else{n.write(">");}if(c.text){n.write(c.text);}r(c.content,n);n.write("</textPath>");break;default:break;}}}T.prototype._renderContent=function(c){if(this.text){c.write(this.text);}r(this.content,c);};function e(m,p){if(!m||m.length===0){return;}var n,o;for(var i=0,l=m.length;i<l;i++){var c=m[i];switch(c.type){case 10:case undefined:case"text":p.append(c.text);break;case 11:case"span":n=document.createElementNS(E._svgNamespace,"tspan");o=n.setAttribute.bind(n);d(c,o);if(c.style){s(c.style,o);}if(c.text){n.append(c.text);}e(c.content,n);p.append(n);break;case 12:case"path":n=document.createElementNS(E._svgNamespace,"textPath");o=n.setAttribute.bind(n);d(c,o);if(c.style){s(c.style,o);}if(!c.path&&c.pathSegments){c.path=new P({segments:c.pathSegments});}var q=c.path;if(q instanceof P){n.setAttribute("href","#"+q.uid);var v=document.createElementNS(E._svgNamespace,q.tagName());v.setAttribute("id",q.uid);q._setSpecificAttributes(v.setAttribute.bind(v));n.append(v);}if(c.text){n.append(c.text);}e(c.content,n);p.append(n);break;default:break;}}}T.prototype._createContent=function(c){if(this.text){c.append(this.text);}e(this.content,c);};function t(c){switch(typeof c){case"number":return c;case"string":if(c.endsWith("pt")){return parseFloat(c)*4/3;}else if(c.endsWith("em")){return parseFloat(c)*16;}return parseFloat(c);default:return 0;}}function g(p){var c=[];for(var i=0;i<p.childNodes.length;i++){var n=p.childNodes[i];if(n.data!==undefined){c.push({type:10,text:n.data});}else if(n.childNodes.length>0){var l={type:11,content:g(n)};var m=n.style;var o={};if(m.fontSize){o.size=t(m.fontSize);}if(m.fontFamily){o.fontFace=m.fontFamily.replaceAll("\"","'");}if(m.textDecoration){o.textDecoration=m.textDecoration;}if(m.color){o.fill=m.color;}switch(n.tagName){case"EM":o.fontStyle="italic";break;case"STRONG":o.fontWeight="bold";break;default:break;}if(Object.keys(o).length){l.style=o;}c.push(l);}}return c;}function f(c){var m=0;for(var i=0;i<c.length;i++){var l=c[i];var n=l.style&&l.style.size;if(n!==undefined){n=t(n);if(typeof n=="number"&&isFinite(n)){m=Math.max(m,n);}}if(l.content){m=Math.max(m,f(l.content));}}return m;}T.prototype.setHtmlTextContent=function(c){var l=document.createElement("html");l.innerHTML=c;var m=[];var n=l.getElementsByTagName("body");var o=n.length>0?n[0].childNodes:[];for(var i=0,y=this.y;i<o.length;i++){var p=o[i];if(p.childNodes.length>0){var q=g(p);var v;if(p.nodeName==="P"){v=Math.max(f(q),t(this.style.size));y+=i>0?v:0;}m.push({type:11,x:(p.style.paddingLeft||0)+this.x,y:y,content:g(p)});if(p.nodeName==="P"){y+=v*0.25;}}else if(p.data){m.push({type:10,text:p.data});}}delete this.text;this.content=m;this.invalidate();};function h(l,m){var v="";var n=[];for(var i=0;i<l.length;i++){var c=l[i];switch(c.type){case 10:case undefined:case"text":v+=c.text;break;case 11:case"span":case 12:case"path":var o=c.style;if(!m||c.y!==undefined||c.dy!==undefined){n.push("p");v+="<p style=\"text-align: left;";if(c.x){v+=" padding-left: "+(typeof c.x==="number"?c.x+"px":c.x)+";";}v+="\">";}if(o){if(o.textDecoration||o.size||o.fontFace||o.fill){n.push("span");v+="<span style=\"";if(o.textDecoration){v+="text-decoration: "+o.textDecoration+";";}if(o.size){v+="font-size: "+(o.size*0.75)+"pt;";}if(o.fill){v+="color: "+o.fill+";";}if(o.fontFace){v+="font-family: "+o.fontFace+";";}v+="\">";}if(o.fontStyle==="italic"){n.push("em");v+="<em>";}if(o.fontWeight==="bold"){n.push("strong");v+="<strong>";}}if(n.length===0){n.push("span");v+="<span>";}if(c.text){v+=c.text;}v+=h(c.content,true);var p=n.pop();while(p!==undefined){v+="</"+p+">";p=n.pop();}break;default:break;}}return v;}T.prototype.getHtmlTextContent=function(){var c=h(this.content,false);return this.text?this.text+c:c;};function j(l,m){var n=[];for(var i=0;i<l.length;i++){var c=l[i];switch(c.type){case undefined:case"text":n.push({type:10,text:c.text});break;default:case"span":case"path":var o={type:c.type==="path"?12:11};if(c.x!==undefined){o.x=c.x;}if(c.y!==undefined){o.x=c.y;}if(c.dx!==undefined){o.x=c.dx;}if(c.dy!==undefined){o.x=c.dy;}if(c.style_id){o.style=m.get(c.style_id);}if(c.text){o.text=c.text;}if(c.children){o.content=j(c.children,m);}n.push(o);break;}}return n;}function k(l,m){var n=[];for(var i=0;i<l.length;i++){var c=l[i];switch(c.type){case 10:case undefined:n.push({text:c.text});break;case 11:case"span":case 12:case"path":var o={type:"span"};if(c.x!==undefined){o.x=c.x;}if(c.y!==undefined){o.y=c.y;}if(c.dx!==undefined){o.dx=c.dx;}if(c.dy!==undefined){o.dy=c.dy;}if(c.text){o.text=c.text;}var p=c.style;if(p){p.veid=p.veid||u();o["style_id"]=p.veid;m.push(p);}if(c.content){o.children=k(c.content,m);}n.push(o);break;default:break;}}return n;}T.prototype._getParametricShape=function(c,l,i){var p=E.prototype._getParametricShape.call(this,c,l,i);p.type="text";if(this.x){p.x=this.x;}if(this.y){p.y=this.y;}var m=this.style;if(m){m.veid=m.veid||u();p["style_id"]=m.veid;i.push(m);}if(this.text){p.text=this.text;}p.children=k(this.content,i);return p;};T.prototype.copy=function(c,i){E.prototype.copy.call(this,c,i);this.text=c.text;this.content=c.content;this.style=c.style;this.x=c.x;this.y=c.y;return this;};return T;});