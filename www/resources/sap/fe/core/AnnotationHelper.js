/*!
 * SAP UI development toolkit for HTML5 (SAPUI5)
        (c) Copyright 2009-2017 SAP SE. All rights reserved
    
 */
sap.ui.define(["sap/base/Log","sap/ui/model/odata/v4/AnnotationHelper"],function(L,O){"use strict";var A={getPresentationContext:function(e){var p=e.getPath();var P=e.getObject(p+"/@com.sap.vocabularies.UI.v1.PresentationVariant");if(P&&P.Visualizations){return p+"/@com.sap.vocabularies.UI.v1.PresentationVariant";}else{return p+"/@com.sap.vocabularies.UI.v1.LineItem";}},getTargetContext:function(t){var T=t.getObject(t.getPath()),n=O.getNavigationPath(t.getPath());return n+"/"+T;},getFormContext:function(t){var a=t.getObject(),n=O.getNavigationPath(a),s,T;if(n){s=O.getNavigationPath(t.getPath());T=t.getModel().getObject(s+"/"+n+"/@sapui.name");return"/"+T+a.replace(n,"");}return t.getPath();},getNavigationContext:function(c){return O.getNavigationPath(c.getPath());},replaceSpecialCharsInId:function(i){if(i.indexOf(" ")>=0){L.error("Annotation Helper: Spaces are not allowed in ID parts. Please check the annotations, probably something is wrong there.");}return i.replace(/@/g,"").replace(/\//g,"::").replace(/#/g,"::");},createBindingForDraftAdminBlock:function(m,e,f){var p="/"+e+"/DraftAdministrativeData/";return m.requestObject(p).then(function(d){var b="{parts: [{path: 'InProcessByUser'}, "+"{path: 'LastChangedByUser'} ";if(d.InProcessByUserDescription){b+=" ,{path: 'InProcessByUserDescription'}";}if(d.LastChangedByUserDescription){b+=", {path: 'LastChangedByUserDescription'}";}b+="], formatter: '.editFlow."+f+"'}";return b;});},getBindingForDraftAdminBlockInline:function(c,e){return A.createBindingForDraftAdminBlock(c.getModel(),e,"formatDraftOwnerTextInline");},getBindingForDraftAdminBlockInPopover:function(c,e){return A.createBindingForDraftAdminBlock(c.getModel(),e,"formatDraftOwnerTextInPopover");},checkForActions:function(l){var o;for(var i=0;i<l.length;i++){o=l[i];if((o["$Type"]==="com.sap.vocabularies.UI.v1.DataFieldForAction"||(o["$Type"]==="com.sap.vocabularies.UI.v1.DataFieldForIntentBasedNavigation"&&(o.RequiresContext&&o.RequiresContext.Bool==="true")))&&!(o.Inline&&o.Inline.Bool!=="true")){return true;}}return false;},hasDeterminingActions:function(e){var d=e["@com.sap.vocabularies.UI.v1.LineItem"];for(var i in d){if(d[i].$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"&&d[i].Determining===true){return true;}}return false;},getNavigationInsertableRestrictions:function(c,r,I){var i,n;for(i in r){n=r[i];if(n.NavigationProperty.$NavigationPropertyPath===c&&n.InsertRestrictions){if(n.InsertRestrictions.Insertable&&n.InsertRestrictions.Insertable.$Path){return("{= %{"+n.InsertRestrictions.Insertable.$Path+"} ? ${ui>/editable} === 'Editable'  : false }");}return n.InsertRestrictions.Insertable?"{= ${ui>/editable} === 'Editable' }":false;}}if(I&&I.$Path){return"{= ${"+c+"/"+I.$Path+"}"+" && ${ui>/editable} === 'Editable'}";}return"{= "+(I!==false)+" && ${ui>/editable} === 'Editable'}";},isNavigationPropertyDeletable:function(c,r,d){var i,n;for(i in r){n=r[i];if(n.NavigationProperty.$NavigationPropertyPath===c&&n.DeleteRestrictions){return n.DeleteRestrictions.Deletable;}}if(d&&d.$Path){return"{= ${"+c+"/"+d.$Path+"}"+" && ${ui>/editable} === 'Editable'}";}return"{= "+(d!==false)+" && ${ui>/editable} === 'Editable'}";},showFooter:function(d,c){var h="";var s;var H=[];for(var i in d){var D=d[i];if(D.$Type==="com.sap.vocabularies.UI.v1.DataFieldForAction"&&D.Determining===true){if(!D["@com.sap.vocabularies.UI.v1.Hidden"]){return true;}else if(D["@com.sap.vocabularies.UI.v1.Hidden"].$Path){if(H.indexOf(D["@com.sap.vocabularies.UI.v1.Hidden"].$Path)===-1){H.push(D["@com.sap.vocabularies.UI.v1.Hidden"].$Path);}}}}if(H.length){for(var a in H){if(H[a]){s="(%{"+H[a]+"} === true ? false : true )";}if(a==H.length-1){h=h+s;}else{h=h+s+"||";}}return("{= "+h+(c?" || ${ui>/editable} === 'Editable' ":" ")+"|| ${localUI>/showMessageFooter} === true}");}else{return("{= "+(c?"${ui>/editable} === 'Editable' || ":"")+"${localUI>/showMessageFooter} === true}");}}};A.getBindingForDraftAdminBlockInline.requiresIContext=true;A.getBindingForDraftAdminBlockInPopover.requiresIContext=true;return A;},true);
