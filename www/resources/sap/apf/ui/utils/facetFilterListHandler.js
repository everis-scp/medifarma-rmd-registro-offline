/*!
 * SAP APF Analysis Path Framework
 *
 * (c) Copyright 2012-2014 SAP AG. All rights reserved
 */
sap.ui.define(["sap/m/FacetFilterList","sap/m/FacetFilterItem","sap/apf/ui/utils/facetFilterListConverter","sap/apf/ui/utils/facetFilterValueFormatter","sap/ui/thirdparty/jquery"],function(F,a,f,b,q){"use strict";sap.apf.ui.utils.FacetFilterListHandler=function(c,u,C){"use strict";var d=[];var o;var e=new sap.apf.ui.utils.FacetFilterListConverter();function _(h){if(h===null||h.length===0){var m=c.createMessageObject({code:"6010",aParameters:[c.getTextNotHtmlEncoded(C.getLabel())]});c.putMessage(m);o.setActive(false);}}function g(h,s,p,i){var j=new sap.apf.ui.utils.FacetFilterValueFormatter(u,c);var k=j.getFormattedFFData(h,s,p);var m=e.getFFListDataFromFilterValues(k,s,d);var l=o.getModel();l.setSizeLimit(m.length);l.setData(m);var n=l.getData();if(i){n.forEach(function(r){if(r.selected==false){if(!sap.ui.Device.browser.msie){if(Object.values(o.getSelectedKeys()).indexOf(r.text)>-1){o.removeSelectedKey(r.key);}}else{if(Object.keys(o.getSelectedKeys()).indexOf(r.text)>-1){o.removeSelectedKey(r.key);}}}});}l.updateBindings();}this.createFacetFilterList=function(){var t=this;o=new sap.m.FacetFilterList({title:c.getTextNotHtmlEncoded(C.getLabel()),multiSelect:C.isMultiSelection(),key:C.getPropertyName(),growing:false,growingScrollToLoad:true,listClose:this.onListClose.bind(this),listOpen:this.onListOpen.bind(this)});o.bindItems("/",new sap.m.FacetFilterItem({key:'{key}',text:'{text}',selected:'{selected}'}));var m=new sap.ui.model.json.JSONModel([]);m.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);o.setModel(m);if(!C.hasValueHelpRequest()){this.getFacetFilterListData().done(_);}this.getSelectedFFValues().then(function(G){h(G);});return o;function h(G){G.oFilterRestrictionPropagationPromiseForSelectedValues.done(function(n,N){h({aSelectedFilterValues:n,oFilterRestrictionPropagationPromiseForSelectedValues:N});});if(G.aSelectedFilterValues.length>0||(d.length>0)){d=G.aSelectedFilterValues;t.getFacetFilterListData().done(function(i,s,p){g(i,s,p,true);});}}};this.getFacetFilterListData=function(){var s;var h=q.Deferred();var i=C.getValues();i.then(function(j){s=C.getAliasNameIfExistsElsePropertyName()||C.getPropertyName();C.getMetadata().then(function(p){h.resolve(j,s,p);});});return h.promise();};this.getSelectedFFValues=function(){var h=q.Deferred();var i=C.getSelectedValues();i.then(function(s,n){h.resolve({aSelectedFilterValues:s,oFilterRestrictionPropagationPromiseForSelectedValues:n});});return h.promise();};this.setSelectedFFValues=function(h){C.setSelectedValues(h);};this.onListClose=function(){var s=[],S,h,i,j;S=o.getSelectedItems();s=S.map(function(I){return I.getKey();});h=JSON.stringify(s.sort());i=JSON.stringify(d.sort());j=(h!==i);if(j){d=s;this.setSelectedFFValues(s);u.selectionChanged(true);}};this.onListOpen=function(){o.setBusy(true);this.getFacetFilterListData().done(function(h,s,p){g(h,s,p,false);o.setBusy(false);});};};});