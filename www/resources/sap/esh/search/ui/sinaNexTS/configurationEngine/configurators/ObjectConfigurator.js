/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){var a=(this&&this.__extends)||(function(){var e=function(d,b){e=Object.setPrototypeOf||({__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;})||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return e(d,b);};return function(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");e(d,b);function _(){this.constructor=d;}d.prototype=b===null?Object.create(b):(_.prototype=b.prototype,new _());};})();var c=(this&&this.__awaiter)||function(t,_,P,g){function b(v){return v instanceof P?v:new P(function(r){r(v);});}return new(P||(P=Promise))(function(r,d){function f(v){try{s(g.next(v));}catch(e){d(e);}}function i(v){try{s(g["throw"](v));}catch(e){d(e);}}function s(e){e.done?r(e.value):b(e.value).then(f,i);}s((g=g.apply(t,_||[])).next());});};var h=(this&&this.__generator)||function(b,d){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g;return g={next:i(0),"throw":i(1),"return":i(2)},typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function i(n){return function(v){return s([n,v]);};}function s(o){if(f)throw new TypeError("Generator is already executing.");while(_)try{if(f=1,y&&(t=o[0]&2?y["return"]:o[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,o[1])).done)return t;if(y=0,t)o=[o[0]&2,t.value];switch(o[0]){case 0:case 1:t=o;break;case 4:_.label++;return{value:o[1],done:false};case 5:_.label++;y=o[1];o=[0];continue;case 7:o=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(o[0]===6||o[0]===2)){_=0;continue;}if(o[0]===3&&(!t||(o[1]>t[0]&&o[1]<t[3]))){_.label=o[1];break;}if(o[0]===6&&_.label<t[1]){_.label=t[1];t=o;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(o);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}o=d.call(b,_);}catch(e){o=[6,e];y=0;}finally{f=t=0;}if(o[0]&5)throw o[1];return{value:o[0]?o[1]:void 0,done:true};}};sap.ui.define(["require","exports","../../core/core","./Configurator"],function(r,e,b,C){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.ObjectConfigurator=void 0;var O=(function(_){a(O,_);function O(){return _!==null&&_.apply(this,arguments)||this;}O.prototype.initAsync=function(){return c(this,void 0,void 0,function(){var p,i,d,f;return h(this,function(g){this.properties=[];p=[];for(i=0;i<this.type.properties.length;++i){d=this.type.properties[i];f=this.configuration[d.name];if(!f){continue;}p.push(this.createPropertyConfiguratorAsync(d,f));}return[2,Promise.all(p)];});});};O.prototype.createPropertyConfiguratorAsync=function(p,d){return c(this,void 0,void 0,function(){return h(this,function(f){return[2,this.createConfiguratorAsync({type:p.type,typeContext:p,configuration:d,}).then(function(g){this.properties.push({name:p.name,configurator:g,});}.bind(this))];});});};O.prototype.isSuitable=function(o){if(b.isObject(o.configuration)&&b.isObject(o.type)&&o.type.type==="object"){return true;}};O.prototype.configure=function(o,d){d=this.createContext(d,o);this.object=o;for(var i=0;i<this.properties.length;++i){var p=this.properties[i];o[p.name]=p.configurator.configure(o[p.name],d);}return o;};O.prototype.configureAsync=function(o,d){return c(this,void 0,void 0,function(){var f;return h(this,function(g){d=this.createContext(d,o);this.object=o;f=function(p){return Promise.resolve().then(function(){return p.configurator.configureAsync(o[p.name],d);}).then(function(v){o[p.name]=v;});};return[2,Promise.all(b.map(this.properties,f,this)).then(function(){return o;})];});});};return O;}(C.Configurator));e.ObjectConfigurator=O;});})();