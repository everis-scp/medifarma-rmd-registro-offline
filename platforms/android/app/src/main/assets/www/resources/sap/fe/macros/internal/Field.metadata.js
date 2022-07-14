/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2021 SAP SE. All rights reserved
    
 */
sap.ui.define(["../MacroMetadata","sap/fe/core/converters/MetaModelConverter","sap/fe/core/templating/UIFormatters","sap/fe/core/helpers/BindingExpression","sap/fe/core/templating/DataModelPathHelper","sap/fe/macros/field/FieldTemplating","sap/fe/core/TemplateModel","sap/ui/model/json/JSONModel"],function(M,a,U,B,D,F,T,J){"use strict";var b=M.extend("sap.fe.macros.internal.Field",{name:"Field",namespace:"sap.fe.macros.internal",fragment:"sap.fe.macros.internal.Field",metadata:{stereotype:"xmlmacro",designtime:"sap/fe/macros/internal/Field.designtime",properties:{idPrefix:{type:"string"},_apiId:{type:"string"},vhIdPrefix:{type:"string",defaultValue:"FieldValueHelp"},_vhFlexId:{type:"string",computed:true},entitySet:{type:"sap.ui.model.Context",required:true,$kind:["EntitySet","NavigationProperty"]},entityType:{type:"sap.ui.model.Context",required:false,computed:true,$kind:["EntityType"]},navigateAfterAction:{type:"boolean",defaultValue:true},dataField:{type:"sap.ui.model.Context",required:true,$kind:"Property",$Type:["com.sap.vocabularies.UI.v1.DataField","com.sap.vocabularies.UI.v1.DataFieldWithUrl","com.sap.vocabularies.UI.v1.DataFieldForAnnotation","com.sap.vocabularies.UI.v1.DataFieldForAction","com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation","com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath","com.sap.vocabularies.UI.v1.DataPointType"]},semanticObjects:{type:"sap.ui.model.Context",required:false,computed:true},editMode:{type:"sap.ui.mdc.enum.EditMode"},wrap:{type:"boolean"},"class":{type:"string"},ariaLabelledBy:{type:"string"},editableExpression:{type:"string",computed:true},enabledExpression:{type:"string",computed:true},semanticObject:{type:"string",required:false},formatOptions:{type:"object",properties:{valueFormat:{type:"string"},textAlignMode:{type:"string",defaultValue:"Table",allowedValues:["Table","Form"]},displayMode:{type:"string",allowedValues:["Value","Description","ValueDescription","DescriptionValue"]},measureDisplayMode:{type:"string",allowedValues:["Hidden","ReadOnly"]},textLinesDisplay:{type:"number",configurable:true},textLinesEdit:{type:"number",configurable:true},textMaxLines:{type:"number",configurable:true},showEmptyIndicator:{type:"boolean",defaultValue:false},semanticKeyStyle:{type:"string",defaultValue:"",allowedValues:["ObjectIdentifier","Label",""]},showIconUrl:{type:"boolean",defaultValue:false},ignoreNavigationAvailable:{type:"boolean",defaultValue:false},isAnalytics:{type:"boolean",defaultValue:false}}}},events:{onChange:{type:"function"}}},create:function(p,c,s){var o=this.getOverrides(c,p.dataField.getPath());var d=a.convertMetaModelContext(p.dataField);var e=a.getInvolvedDataModelObjects(p.dataField,p.entitySet);var P=d;var E="";var A,S,f=[],g=[];if(d&&d.term==="com.sap.vocabularies.UI.v1.DataPoint"){d.$Type=d.$Type||"com.sap.vocabularies.UI.v1.DataPointType";}if(d&&d.$Type){switch(d.$Type){case"com.sap.vocabularies.UI.v1.DataField":case"com.sap.vocabularies.UI.v1.DataPointType":case"com.sap.vocabularies.UI.v1.DataFieldWithNavigationPath":case"com.sap.vocabularies.UI.v1.DataFieldWithUrl":if(typeof d.Value==="object"){P=d.Value.$target;E=d.Value.path;A=d.Value.$target&&d.Value.$target.annotations&&d.Value.$target.annotations.Common;if(A){f=Object.keys(A).filter(function(v){return v==="SemanticObject"||v.startsWith("SemanticObject#");});for(var i=0;i<f.length;i++){S=B.compileBinding(B.annotationExpression(d.Value.$target.annotations&&d.Value.$target.annotations.Common[f[i]]));g.push({key:S.indexOf("{")===-1?S:S.split("{")[1].split("}")[0],value:S});}}}break;case"com.sap.vocabularies.UI.v1.DataFieldForAnnotation":if(d.Target.$target){switch(d.Target.$target.$Type){case"com.sap.vocabularies.UI.v1.DataField":case"com.sap.vocabularies.UI.v1.DataPointType":if(typeof d.Target.$target.Value==="object"){P=d.Target.$target.Value.$target;E=d.Target.$target.Value.path;}break;default:if(typeof d.Target==="object"){P=d.Target.$target;E=d.Target.path;}break;}}break;}}else if(d&&d._type==="Property"){var A=d.annotations&&d.annotations.Common;if(A){f=Object.keys(A).filter(function(v){return v==="SemanticObject"||v.startsWith("SemanticObject#");});for(var i=0;i<f.length;i++){S=B.compileBinding(B.annotationExpression(d.annotations.Common[f[i]]));g.push({key:S.indexOf("{")===-1?S:S.split("{")[1].split("}")[0],value:S});}}}if(!!p.semanticObject&&p.semanticObject[0]==="{"){g.push({key:p.semanticObject.substr(1,p.semanticObject.length-2),value:p.semanticObject});}p.visible=F.getVisibleExpression(e,p.formatOptions);if(E&&E.length>0){e=D.enhanceDataModelPath(e,E);}p.dataSourcePath=D.getTargetObjectPath(e);var m=s.models.metaModel||s.models.entitySet;p.entityType=m.createBindingContext("/"+e.targetEntityType.fullyQualifiedName);var h=P&&P.Value?P.Value:P;if(p.editMode!==undefined&&p.editMode!==null){p.editModeAsObject=p.editMode;}else{var j=p.formatOptions.measureDisplayMode?p.formatOptions.measureDisplayMode==="ReadOnly":false;p.editModeAsObject=U.getEditMode(h,e,j,true,d);p.editMode=B.compileBinding(p.editModeAsObject);}p.editableExpression=U.getEditableExpression(h,d,e);p.enabledExpression=U.getEnabledExpression(h,d);if(!p.formatOptions.displayMode){p.formatOptions.displayMode=U.getDisplayMode(P,e,p.editModeAsObject);}p.formatOptions.textLinesDisplay=p.formatOptions.textLinesDisplay||o.textLinesDisplay||(o.formatOptions&&o.formatOptions.textLinesDisplay);p.formatOptions.textLinesEdit=o.textLinesEdit||(o.formatOptions&&o.formatOptions.textLinesEdit)||p.formatOptions.textLinesEdit||4;p.formatOptions.textMaxLines=o.textMaxLines||(o.formatOptions&&o.formatOptions.textMaxLines)||p.formatOptions.textMaxLines;if(p._flexId){p._apiId=p._flexId;p._flexId+="-content";p._vhFlexId=p._flexId+"_"+p.vhIdPrefix;}p.displayStyle=F.getDisplayStyle(P,d,e,p.formatOptions,p.semanticObject);p.editStyle=F.getEditStyle(P,d,p.formatOptions);var k=["Avatar","AmountWithCurrency","ObjectIdentifier"];if(p.displayStyle&&k.indexOf(p.fieldStyle)===-1&&e.targetObject){p.text=F.getTextBinding(e,p.formatOptions);}else{p.text="";}p.valueBindingExpression=F.getValueBinding(e,p.formatOptions);p.valueAsStringBindingExpression=F.getValueBinding(e,p.formatOptions,true,true,undefined,true);if(e.targetObject){p.unitBindingExpression=F.getUnitBinding(e,p.formatOptions);p.textBindingExpression=F.getAssociatedTextBinding(e,p.formatOptions);}var l=p.dataField.getObject();p.formatOptions.navigationAvailable=true;if(l&&l.$Type==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"&&l.NavigationAvailable!==undefined&&p.formatOptions.ignoreNavigationAvailable!=="true"){if(l.NavigationAvailable.$Path){p.formatOptions.navigationAvailable="{"+l.NavigationAvailable.$Path+"}";}else{p.formatOptions.navigationAvailable=l.NavigationAvailable;}}if(p.dataField.getObject("@sapui.name")&&p.dataField.getObject("@sapui.name").indexOf("com.sap.vocabularies.UI.v1.DataPoint")>-1){var n=p.dataField.getObject();n.$Type=n.$Type||"com.sap.vocabularies.UI.v1.DataPointType";p.dataField=new T(n,p.dataField.getModel()).createBindingContext("/");}if(g.length>0){var C,q,r=[];for(var i=0;i<g.length;i++){C=g[i].key;q=B.compileBinding(B.annotationExpression(g[i].value));r.push({key:C,value:q});}var t=new J(r);t.$$valueAsPromise=true;var u=t.createBindingContext("/");p.semanticObjects=u;}else{p.semanticObjects=new J([]).createBindingContext("/");}return p;}});return b;});
