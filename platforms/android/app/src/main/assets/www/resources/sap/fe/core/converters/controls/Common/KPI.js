/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
 *      (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["../../helpers/ID","sap/fe/core/templating/PropertyHelper","sap/fe/core/formatters/TableFormatterTypes","../../helpers/Aggregation","sap/fe/core/converters/helpers/IssueManager","./Criticality","sap/fe/core/converters/helpers/SelectionVariantHelper"],function(I,P,T,A,a,C,S){"use strict";var _={};var g=S.getFilterDefinitionsFromSelectionVariant;var b=C.getMessageTypeFromCriticalityType;var c=a.IssueType;var d=a.IssueSeverity;var e=a.IssueCategory;var f=A.AggregationHelper;var M=T.MessageType;var i=P.isPathExpression;var K=I.KPIID;function h(k,l,m){var n;var o=m.getConverterContextFor("/"+l.entitySet);var p=o.getAnnotationsByTerm("UI","com.sap.vocabularies.UI.v1.KPI");var t=p.find(function(H){return H.qualifier===l.qualifier;});var q=new f(o.getEntityType(),o);if(t&&((n=t.Detail)===null||n===void 0?void 0:n.DefaultPresentationVariant)&&q.isAnalyticsSupported()){var r,s;var u=K(k);var v=t.DataPoint;var w=v.Value.$target;if(!q.isPropertyAggregatable(w)){m.getDiagnostics().addIssue(e.Annotation,d.Medium,c.KPI_ISSUES.MAIN_PROPERTY_NOT_AGGREGATABLE+l.qualifier);return undefined;}var x={id:u,entitySet:l.entitySet,datapoint:{propertyPath:v.Value.path,annotationPath:o.getEntitySetBasedAnnotationPath(v.fullyQualifiedName)},selectionVariantFilterDefinitions:t.SelectionVariant?g(t.SelectionVariant):undefined};var y=v.Value.$target;if((r=y.annotations.Measures)===null||r===void 0?void 0:r.ISOCurrency){var z;var B=(z=y.annotations.Measures)===null||z===void 0?void 0:z.ISOCurrency;if(i(B)){x.datapoint.unit={value:B.$target.name,isCurrency:true,isPath:true};}else{x.datapoint.unit={value:B.toString(),isCurrency:true,isPath:false};}}else if((s=y.annotations.Measures)===null||s===void 0?void 0:s.Unit){var D;var E=(D=y.annotations.Measures)===null||D===void 0?void 0:D.Unit;if(i(E)){x.datapoint.unit={value:E.$target.name,isCurrency:false,isPath:true};}else{x.datapoint.unit={value:E.toString(),isCurrency:false,isPath:false};}}if(v.Criticality){if(typeof v.Criticality==="object"){var F=v.Criticality.$target;if(q.isPropertyAggregatable(F)){x.datapoint.criticalityPath=v.Criticality.path;}else{x.datapoint.criticalityValue=M.None;}}else{x.datapoint.criticalityValue=b(v.Criticality);}}else if(v.CriticalityCalculation){x.datapoint.criticalityCalculationMode=v.CriticalityCalculation.ImprovementDirection;x.datapoint.criticalityCalculationThresholds=[];switch(x.datapoint.criticalityCalculationMode){case"UI.ImprovementDirectionType/Target":x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.DeviationRangeLowValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.ToleranceRangeLowValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.AcceptanceRangeLowValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.AcceptanceRangeHighValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.ToleranceRangeHighValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.DeviationRangeHighValue);break;case"UI.ImprovementDirectionType/Minimize":x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.AcceptanceRangeHighValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.ToleranceRangeHighValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.DeviationRangeHighValue);break;case"UI.ImprovementDirectionType/Maximize":default:x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.DeviationRangeLowValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.ToleranceRangeLowValue);x.datapoint.criticalityCalculationThresholds.push(v.CriticalityCalculation.AcceptanceRangeLowValue);}}else{x.datapoint.criticalityValue=M.None;}return x;}else{var G;if(!t){m.getDiagnostics().addIssue(e.Annotation,d.Medium,c.KPI_ISSUES.KPI_NOT_FOUND+l.qualifier);}else if(!((G=t.Detail)===null||G===void 0?void 0:G.DefaultPresentationVariant)){m.getDiagnostics().addIssue(e.Annotation,d.Medium,c.KPI_ISSUES.KPI_DETAIL_NOT_FOUND+l.qualifier);}else{m.getDiagnostics().addIssue(e.Annotation,d.Medium,c.KPI_ISSUES.NO_ANALYTICS+l.entitySet);}return undefined;}}function j(k){var l=k.getManifestWrapper().getKPIConfiguration(),m=[];Object.keys(l).forEach(function(n){var D=h(n,l[n],k);if(D){m.push(D);}});return m;}_.getKPIDefinitions=j;return _;},false);