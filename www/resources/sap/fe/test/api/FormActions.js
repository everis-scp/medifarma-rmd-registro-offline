/*
 * ! SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./FormAPI","sap/fe/test/Utils","sap/ui/test/OpaBuilder","sap/fe/test/builder/FEBuilder","sap/fe/test/builder/MacroFieldBuilder"],function(F,U,O,a,M){"use strict";var b=function(f,v){return F.call(this,f,v);};b.prototype=Object.create(F.prototype);b.prototype.constructor=b;b.prototype.isAction=true;function _(o,s){var f=o.getBuilder(),S,B=s?"--seeMore":"--seeLess";f.has(function(e){S=e.getId().substring(e.getId().lastIndexOf("::")+2);return true;}).execute();return o.prepareResult(O.create(o).hasId(new RegExp(U.formatMessage("{0}$",B))).has(function(e){return e.getId().substring(e.getId().lastIndexOf("::")+2)===S+B;}).doPress().description(U.formatMessage("Pressing '{0}' action",B)).execute());}b.prototype.iExecuteAction=function(A){var f=this.getBuilder();return this.prepareResult(f.doOnAggregation("actions",this.createActionMatcher(A),O.Actions.press()).description(U.formatMessage("Pressing action '{1}' on form '{0}'",this.getIdentifier(),A)).execute());};b.prototype.iExecuteShowMore=function(){return _(this,true);};b.prototype.iExecuteShowLess=function(){return _(this,false);};b.prototype.iClickLink=function(f){return this.prepareResult(this.createFieldBuilder(f).hasState({controlType:"sap.m.Link"}).doPress().description(U.formatMessage("Clicking link '{1}' on form '{0}'",this.getIdentifier(),f)).execute());};b.prototype.iClickCheckBox=function(f){return this.prepareResult(this.createFieldBuilder(f).hasState({controlType:"sap.m.CheckBox"}).doPress().description(U.formatMessage("Clicking checkBox '{1}' on form '{0}'",this.getIdentifier(),f)).execute());};b.prototype.iChangeField=function(f,v){return this.prepareResult(this.createFieldBuilder(f).doEnterText(v,true,false,true).description(U.formatMessage("Entering value '{1}' into field '{2}' on form '{0}'",this.getIdentifier(),v,f)).execute());};b.prototype.iOpenValueHelp=function(f){return this.prepareResult(this.createFieldBuilder(f).hasState({visible:true}).doOpenValueHelp().description(U.formatMessage("Opening the value help for field '{1}' on form '{0}'",this.getIdentifier(),f)).execute());};return b;});
