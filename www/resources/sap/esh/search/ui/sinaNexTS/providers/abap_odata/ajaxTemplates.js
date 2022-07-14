/*! 
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	 
 */
(function(){sap.ui.define(["require","exports"],function(r,e){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.navigationEvent=e.isNavigationEvent=e.objectSuggestionRequest=e.isObjectSuggestionRequest=e.suggestionRequest=e.isSuggestionRequest=e.valueHelperRequest=e.isValueHelperRequest=e.chartRequest=e.isChartRequest=e.nlqSearchRequest=e.isNlqSearchRequest=e.searchRequest=e.isSearchRequest=void 0;function i(o){if(typeof o==="object"){var h=o;if(typeof h.d==="object"){var j=h;if(typeof j.d.QueryOptions==="object"){var Q=j.d.QueryOptions;if(typeof Q.SearchType==="string"&&Q.SearchType===""&&!j.d.ActivateNLQ){return true;}}}}return false;}e.isSearchRequest=i;e.searchRequest={d:{Filter:{},Id:"1",QueryOptions:{SearchTerms:"",Top:10,Skip:0,SearchType:"",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:"",},DataSources:[],OrderBy:[],ResultList:{SearchResults:[{HitAttributes:[],Attributes:[],},],},ExecutionDetails:[],MaxFacetValues:5,Facets:[{Values:[],},],},};function a(o){if(typeof o==="object"){var h=o;if(typeof h.d==="object"){var j=h;if(typeof j.d.QueryOptions==="object"){var Q=j.d.QueryOptions;if(typeof Q.SearchType==="string"&&Q.SearchType===""&&typeof j.d.ActivateNLQ==="boolean"&&j.d.ActivateNLQ===true){return true;}}}}return false;}e.isNlqSearchRequest=a;e.nlqSearchRequest={d:{Filter:{},Id:"1",ActivateNLQ:true,QueryOptions:{SearchTerms:"",Top:10,Skip:0,SearchType:"",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:"",},DataSources:[],OrderBy:[],ResultList:{SearchResults:[{HitAttributes:[],Attributes:[],},],NLQQueries:[{NLQConnectorQueries:[{SearchFilter:{SubFilters:[{SubFilters:[{SubFilters:[{SubFilters:[{SubFilters:[{SubFilters:[],},],},],},],},],},],},},],},],},ExecutionDetails:[],MaxFacetValues:5,Facets:[{Values:[],},],},};function b(o){if(typeof o==="object"){var h=o;if(typeof h.d==="object"){var j=h;if(typeof j.d.QueryOptions==="object"){var k=j;return(typeof k.d.QueryOptions.SearchType==="string"&&k.d.QueryOptions.SearchType==="F");}}}return false;}e.isChartRequest=b;e.chartRequest={d:{Id:"1",DataSources:[],Filter:{},QueryOptions:{SearchTerms:"",Skip:0,SearchType:"F",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:"",},FacetRequests:[],MaxFacetValues:5,Facets:[{Values:[],},],ExecutionDetails:[],},};function c(o){if(typeof o==="object"){var h=o;if(typeof h.d==="object"){var j=h;if(typeof j.d.ValueHelpAttribute==="string")return true;}}return false;}e.isValueHelperRequest=c;e.valueHelperRequest={d:{Id:"1",ValueHelpAttribute:"",ValueFilter:"",DataSources:[],Filter:{},QueryOptions:{SearchTerms:"",Top:1000,Skip:0,SearchType:"V",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:"",},ValueHelp:[],},};function d(o){if(typeof o==="object"){var h=o;if(typeof h.d==="object"){var j=h;if(typeof j.d.SuggestionInput==="string")return true;}}return false;}e.isSuggestionRequest=d;e.suggestionRequest={d:{Id:"1",SuggestionInput:"",IncludeAttributeSuggestions:false,IncludeHistorySuggestions:false,IncludeDataSourceSuggestions:false,DetailLevel:1,QueryOptions:{Top:0,Skip:0,SearchType:"S",SearchTerms:"",ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:"",},Filter:{},DataSources:[],Suggestions:[],ExecutionDetails:[],},};function f(o){if(typeof o==="object"){var h=o;if(typeof h.d==="object"){var j=h;if(j.d.IncludeAttributeSuggestions!=="undefined"&&j.d.IncludeAttributeSuggestions===true)return true;}}return false;}e.isObjectSuggestionRequest=f;e.objectSuggestionRequest={d:{Id:"1",IncludeAttributeSuggestions:true,QueryOptions:{SearchTerms:"a",Top:10,Skip:0,ClientSessionID:"",ClientCallTimestamp:"",ClientServiceName:"",ClientLastExecutionID:"",},DataSources:[{Id:"UIA000~EPM_BPA_DEMO~",Type:"View",},],ObjectSuggestions:{SearchResults:[{HitAttributes:[],Attributes:[],},],},Filter:{},ExecutionDetails:[],},};function g(o){if(typeof o==="object"){var h=o;return Array.isArray(h.Events);}return false;}e.isNavigationEvent=g;e.navigationEvent={SemanticObjectType:"",Intent:"",System:"",Client:"",Parameters:[],};});})();
