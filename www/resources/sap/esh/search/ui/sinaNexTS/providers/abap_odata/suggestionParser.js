/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports","../../core/core","../../sina/SuggestionCalculationMode"],function(r,e,c,S){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.SuggestionParser=void 0;var a=(function(){function a(p,i){this.provider=p;this.sina=p.sina;this.itemParser=i;}a.prototype.parseObjectSuggestions=function(q,d){if(!d.d.ObjectSuggestions||!d.d.ObjectSuggestions.SearchResults||!d.d.ObjectSuggestions.SearchResults.results){return[];}var s=[];var o=d.d.ObjectSuggestions.SearchResults.results;for(var i=0;i<o.length;++i){var b=o[i];s.push(this.parseObjectSuggestion(b));}return Promise.all(s);};a.prototype.parseObjectSuggestion=function(o){return this.itemParser.parseItem(o).then(function(b){this.fillValueHighlighted(b);var t=c.map(b.titleAttributes,function(d){return d.valueFormatted;},this).join(" ");return this.sina._createObjectSuggestion({calculationMode:S.SuggestionCalculationMode.Data,label:t,object:b,});}.bind(this));};a.prototype.fillValueHighlighted=function(o){var d=function(b){if(!b){return;}for(var i=0;i<b.length;++i){var f=b[i];if(!f.valueHighlighted){f.valueHighlighted=f.valueFormatted;}}};d(o.detailAttributes);d(o.titleAttributes);};a.prototype.parseRegularSuggestions=function(q,d){var s=[];var b;var p;var f=[];var g;var h;if(!d.d.Suggestions||!d.d.Suggestions.results){return[];}var j=d.d.Suggestions.results;for(var i=0;i<j.length;i++){b=null;g=j[i];switch(g.Type){case"H":b=this.parseSearchTermSuggestion(q,g);break;case"A":b=this.parseSearchTermAndDataSourceSuggestion(q,g);b.cell=g;break;case"M":b=this.parseDataSourceSuggestion(q,g);break;}if(b){if(b.type===this.sina.SuggestionType.SearchTermAndDataSource){if(f[b.searchTerm]===undefined){h=this._getParentCell(b.cell);p=this.parseSearchTermSuggestion(q,h);f[b.searchTerm]=p;}delete b.cell;f[b.searchTerm].childSuggestions.push(b);}else{s.push(b);}}}Object.keys(f).forEach(function(k){s.push(f[k]);});return s;};a.prototype.parseDataSourceSuggestion=function(q,b){var d=S.SuggestionCalculationMode.Data;var f=this.sina.getDataSource(b.FromDataSource);if(!f){return null;}var g=q.filter.clone();g.setDataSource(f);return this.sina._createDataSourceSuggestion({calculationMode:d,dataSource:f,label:b.SearchTermsHighlighted,});};a.prototype.parseSearchTermSuggestion=function(q,b){var d=this.parseCalculationMode(b.Type);var f=q.filter.clone();f.setSearchTerm(b.SearchTerms);return this.sina._createSearchTermSuggestion({searchTerm:b.SearchTerms,calculationMode:d,filter:f,label:b.SearchTermsHighlighted,});};a.prototype.parseSearchTermAndDataSourceSuggestion=function(q,b){var d=this.parseCalculationMode(b.Type);var f=q.filter.clone();f.setSearchTerm(b.SearchTerms);var g=this.sina.getDataSource(b.FromDataSource);if(!g){return null;}f.setDataSource(g);return this.sina._createSearchTermAndDataSourceSuggestion({searchTerm:b.SearchTerms,dataSource:g,calculationMode:d,filter:f,label:b.SearchTermsHighlighted,});};a.prototype.parseCalculationMode=function(s){switch(s){case"H":return S.SuggestionCalculationMode.History;case"A":case"M":return S.SuggestionCalculationMode.Data;}};a.prototype._getParentCell=function(b){var p=b;p.FromDataSource="<All>";p.FromDataSourceAttribute="";p.Type="A";return p;};return a;}());e.SuggestionParser=a;});})();
