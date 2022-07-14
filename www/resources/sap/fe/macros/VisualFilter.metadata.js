/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["./MacroMetadata","sap/fe/core/converters/MetaModelConverter","sap/fe/core/converters/helpers/Aggregation","sap/fe/core/templating/DataModelPathHelper"],function(M,a,A,D){"use strict";var V=M.extend("sap.fe.macros.VisualFilter",{name:"VisualFilter",namespace:"sap.fe.macros",fragment:"sap.fe.macros.VisualFilter",metadata:{properties:{id:{type:"string"},title:{type:"string",defaultValue:""},contextPath:{type:"sap.ui.model.Context",required:true,$kind:["EntitySet","NavigationProperty"]},metaPath:{type:"sap.ui.model.Context"},outParameter:{type:"string"},selectionVariantAnnotation:{type:"sap.ui.model.Context"},inParameters:{type:"sap.ui.model.Context"},multipleSelectionAllowed:{type:"boolean"},required:{type:"boolean"},showOverlayInitially:{type:"boolean"},requiredProperties:{type:"sap.ui.model.Context"}}},create:function(p,c,s){p.groupId="$auto.visualFilters";p.inParameters=p.inParameters.getObject();this.setDefaultValue(p,"aggregateProperties",undefined);this.setDefaultValue(p,"bCustomAggregate",false);var C=a.getInvolvedDataModelObjects(p.metaPath,p.contextPath);var o=this.getConverterContext(C,p.contextPath,s);var b=new A.AggregationHelper(o.getEntityType(),o);var d=b.getCustomAggregateDefinitions();var m=p.contextPath&&p.contextPath.getModel();var P=p.metaPath&&p.metaPath.getPath();var e=m.getObject(P);var f,g;var v=e&&e.Visualizations;if(v){for(var i=0;i<v.length;i++){var h=e.Visualizations[i]&&e.Visualizations[i].$AnnotationPath;f=o.getEntityTypeAnnotation(h)&&o.getEntityTypeAnnotation(h).annotation;}}if(f&&f.Measures[0]){g=f.Measures[0].value;}if(d[g]){p.bCustomAggregate=true;}var S=p.selectionVariantAnnotation&&p.selectionVariantAnnotation.getObject();var k=0;if(S&&!p.multipleSelectionAllowed){for(var j=0;j<S.SelectOptions.length;j++){if(S.SelectOptions[j].PropertyName.$PropertyPath===f.Dimensions[0].value){k++;if(k>1){throw new Error("Multiple SelectOptions for FilterField having SingleValue Allowed Expression");}}}}var l=o.getAnnotationsByTerm("Analytics","com.sap.vocabularies.Analytics.v1.AggregatedProperties",[o.getEntityContainer(),o.getEntityType()]);var n=this.getAggregateProperties(l[0],g);if(n){p.aggregateProperties=n;}var u=this.getUoM(m,p.contextPath,g,n);if(u&&u.$Path&&d[u.$Path]){p.bUoMHasCustomAggregate=true;}else{p.bUoMHasCustomAggregate=false;}return p;},getAggregateProperties:function(b,m){var o={};if(!b){return;}b.some(function(c){if(c.Name===m){o=c;return true;}});return o;},getUoM:function(m,c,s,o){var i=m.getObject(c+"/"+s+"@Org.OData.Measures.V1.ISOCurrency");var u=m.getObject(c+"/"+s+"@Org.OData.Measures.V1.Unit");if(!i&&!u&&o&&o.AggregatableProperty){i=m.getObject(c+"/"+o.AggregatableProperty.value+"@Org.OData.Measures.V1.ISOCurrency");u=m.getObject(c+"/"+o.AggregatableProperty.value+"@Org.OData.Measures.V1.Unit");}return i||u;}});return V;});