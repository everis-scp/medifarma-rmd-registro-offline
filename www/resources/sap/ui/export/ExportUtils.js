/*!
 * SAPUI5

		(c) Copyright 2009-2021 SAP SE. All rights reserved
	
 */
sap.ui.define(['sap/ui/core/library','sap/m/library','./library','sap/ui/core/Core','sap/base/Log','sap/base/util/uid','sap/ui/core/Item','sap/ui/core/syncStyleClass','sap/ui/model/json/JSONModel','sap/m/Button','sap/m/CheckBox','sap/m/Dialog','sap/m/Input','sap/m/Label','sap/m/Select','sap/m/Text','sap/m/VBox','sap/ui/VersionInfo','sap/ui/util/openWindow'],function(c,l,a,C,L,u,I,s,J,B,b,D,d,e,S,T,V,f,o){'use strict';var g=l.ButtonType;var h=c.ValueState;var F=a.FileType;var E=a.EdmType;var j=null;var r=C.getLibraryResourceBundle('sap.ui.export',true);var k='sap.ui.export.ExportUtils';var U=/[\\\/\?\*:\[\]]/g;f.load().then(function(v){var M=/^[0-9]+\.[0-9]+/.exec(v.version);j=M?M[0]:null;});function m(p,R){var q;var t={fileName:'Standard',fileType:[{key:'xlsx'}],selectedFileType:'xlsx',splitCells:false,includeFilterSettings:false,addDateTime:false};var v=Object.assign({},t,p||{});for(var i=0;i<v.fileType.length;i++){q=null;if(!v.fileType[i].text){v.fileType[i].text=R.getText(v.fileType[i].key.toUpperCase()+'_FILETYPE');}if(v.fileType[i].key===v.selectedFileType){q=v.fileType[i].key;}}if(!q){v.selectedFileType=v.fileType[0].key;}return v;}var n={_INTERCEPTSERVICE:'sap/ushell/cloudServices/interceptor/InterceptService',interceptUrl:function(i){var p=sap.ui.require(n._INTERCEPTSERVICE);if(p){var q=p.getInstance();if(q&&q.interceptUrl){i=q.interceptUrl(i);}}return i;},getExportSettingsViaDialog:function(i,O,p){return new Promise(function(R,q){var t;r.then(function(v){var w=new J();w.setData(m(i,v));var x=u();t=new D({id:x,title:v.getText('EXPORT_SETTINGS_TITLE'),horizontalScrolling:false,verticalScrolling:false,content:[new V({renderType:'Bare',width:'100%',items:[new e({text:v.getText('FILE_NAME'),labelFor:x+'-fileName'}),new d({id:x+'-fileName',value:'{/fileName}',liveChange:function(y){var z=y.getSource();var A=y.getParameter('value');var G=/[\\/:|?"*<>]/;var H=C.byId(x+'-export');var K=G.test(A);if(K){z.setValueState(h.Error);z.setValueStateText(v.getText('FILENAME_ERROR'));}else if(A.length>100){z.setValueState(h.Warning);z.setValueStateText(v.getText('FILENAME_WARNING'));}else{z.setValueState(h.None);z.setValueStateText(null);}H.setEnabled(!K);}}).addStyleClass('sapUiTinyMarginBottom'),new e({text:v.getText('SELECT_FORMAT'),labelFor:x+'-fileType',visible:false}),new S({id:x+'-fileType',width:'100%',selectedKey:'{/selectedFileType}',visible:false,items:{path:'/fileType',template:new I({key:'{key}',text:'{text}'})}}),new b({id:x+'-splitCells',selected:'{/splitCells}',text:v.getText('SPLIT_CELLS')}),new b({id:x+'-includeFilterSettings',selected:'{/includeFilterSettings}',text:v.getText('INCLUDE_FILTER_SETTINGS')}),new b({id:x+'-addDateTime',selected:'{/addDateTime}',text:v.getText('ADD_DATE_TIME'),visible:false})]}).addStyleClass('sapUiExportSettingsLabel')],endButton:new B({id:x+'-cancel',text:v.getText('CANCEL_BUTTON'),press:function(){t.close();}}),beginButton:new B({id:x+'-export',text:v.getText('EXPORT_BUTTON'),type:g.Emphasized,press:function(){if(t){t._bSuccess=true;t.close();R(w.getData());}}}),afterClose:function(){if(!t._bSuccess){q(null);}t.destroy();t=null;}});t.addStyleClass('sapUiContentPadding sapUiExportSettings');t.setModel(w);if(O){s('sapUiSizeCompact',O,t);}t.open();if(p){p(t);}});});},_getReadableFilterValue:function(i){switch(i.op||i.name){case'==':return'='+i.right.value;case'>':case'<':case'!=':case'<=':case'>=':return i.op+i.right.value;case'between':return i.args[1].value+'...'+i.args[2].value;case'contains':return'*'+i.args[1].value+'*';case'endswith':return'*'+i.args[1].value;case'startswith':return i.args[1].value+'*';default:throw Error('getReadableFilter');}},_parseFilter:function(i){switch(i.type){case'Logical':return n._parseLogical(i);case'Binary':return n._parseBinary(i);case'Unary':return n._parseUnary(i);case'Call':return n._parseCall(i);default:throw Error('Filter type '+i.type+' not supported');}},_parseLogical:function(i){if(i.op=='&&'&&i.left.type==='Binary'&&i.right.type==='Binary'&&i.left.op==='>='&&i.right.op==='<='&&i.left.left.path===i.right.left.path){return n._parseCall({args:[{path:i.left.left.path,type:'Reference'},{type:'Literal',value:i.left.right.value},{type:'Literal',value:i.right.right.value}],name:'between',type:'Call'});}return n._parseFilter(i.left).concat(n._parseFilter(i.right));},_parseBinary:function(i){if(!i.left||i.left.type!='Reference'||!i.right||i.right.type!='Literal'){return[];}return[{key:i.left.path,value:n._getReadableFilterValue(i)}];},_parseUnary:function(i){var p;if(!i.arg){return[];}p=n._parseFilter(i.arg);p[0].value='!'+p[0].value;return p;},_parseCall:function(i){if(!i.args||i.args.length<2){return[];}return[{key:i.args[0].path,value:n._getReadableFilterValue(i)}];},parseFilterConfiguration:function(i,p){return new Promise(function(R,q){r.then(function(t){var v,w;v={name:t.getText('FILTER_HEADER'),items:[]};if(!i||!(i.isA('sap.ui.model.ListBinding')||i.isA('sap.ui.model.TreeBinding'))){L.error('A ListBinding is required for parsing the filter settings');q();return null;}var x=i.getFilterInfo();if(x){v.items=n._parseFilter(x);}if(typeof p==='function'){v.items.forEach(function(y){w=p(y.key);y.key=w&&typeof w==='string'?w:y.key;});}R(v);});});},getAvailableCloudExportTargets:function(){var i=n.getCloudExportService();return i.then(function(p){return p&&p.getSupportedTargets?p.getSupportedTargets():[];}).catch(function(){return[];});},getCloudExportService:function(){return sap.ushell&&sap.ushell.Container&&sap.ushell.Container.getServiceAsync?sap.ushell.Container.getServiceAsync('ProductivityIntegration'):Promise.reject();},saveAsFile:function(i,p){var q,t,v;if(!(i instanceof Blob)){return;}q=document.createElementNS('http://www.w3.org/1999/xhtml','a');t='download'in q;if(t){v=function(w,x){q.download=x;q.href=URL.createObjectURL(w);q.dispatchEvent(new MouseEvent('click'));};}if(typeof v==='undefined'){v=function(w){var x=new FileReader();x.onloadend=function(){var y,z;z=x.result.replace(/^data:[^;]*;/,'data:attachment/file;');y=o(z,'_blank');if(!y){window.location.href=z;}};x.readAsDataURL(w);};}v(i,p);},validateSettings:function(i){var p;n._validateDataSource(i.dataSource);i.fileType=F[i.fileType]?i.fileType:F.XLSX;p='.'+i.fileType.toLowerCase();i.fileName=i.fileName||'export'+p;if(!i.fileName.endsWith(p)){i.fileName+=p;L.warning(k+': fileName was missing the proper file extension - extension has been added');}if(typeof i.showProgress!=='boolean'){i.showProgress=true;}n._validateWorkbook(i.workbook);if(typeof i.worker!=='boolean'){i.worker=true;}n._validateScaleCustomizing(i.customizing,'currency');n._validateScaleCustomizing(i.customizing,'unit');},_validateDataSource:function(i){var p;if(!i||typeof i!=='object'){throw new Error(k+': dataSource has not been specified');}i.type=i.type||'odata';if(i.type==='array'&&!Array.isArray(i.data)){L.warning(k+': Defined type does not match the provided data');}if(Array.isArray(i.data)){i.count=i.data.length;}if(i.type==='odata'&&(typeof i.dataUrl!=='string'||i.dataUrl.length===0)){throw new Error(k+': Unable to export data. No dataUrl provided.');}if(typeof i.count!=='number'||i.count<0||isNaN(i.count)||i.count%1!==0){L.info(k+': Invalid value for dataSource.count - value will be ignored');i.count=null;}if(typeof i.useBatch!=='boolean'){i.useBatch=false;L.info(k+': Parameter useBatch not provided. Applying default value "false"');}else if(i.useBatch===true){if(typeof i.serviceUrl!=='string'||i.serviceUrl.length===0){i.useBatch=false;L.warning(k+': serviceUrl is required for OData batch requests');}if(typeof i.headers!=='object'){i.useBatch=false;L.warning(k+': headers are required for OData batch requests.');}}p=i.sizeLimit;if(!p||isNaN(p)||p%1!==0){var M=5000,q=200;p=i.count?Math.round(i.count/(q*5))*q:q;p=Math.min(M,Math.max(p,q));i.sizeLimit=p;L.info(k+': No valid sizeLimit provided. sizeLimit is set to '+p);}},_validateWorkbook:function(w){if(!(w instanceof Object)||!Array.isArray(w.columns)){throw new Error(k+'column configuration is not provided. Export is not possible');}w.columns=w.columns.filter(function(i,p){var W;if(!(i instanceof Object)){L.error(k+': Column '+p+' skipped due to invalid configuration');return false;}if(Array.isArray(i.property)&&i.type!==E.String&&i.type!=null){L.warning(k+': Type '+i.type+' does not support an array of properties');i.property=i.property[0];}if(typeof i.property!=='string'&&!Array.isArray(i.property)){L.error(k+': Column '+p+' skipped due to missing mandatory property');return false;}i.label=i.label||(i.property instanceof Array?i.property[0]:i.property);W=i.width;if(typeof W==='string'){var q;q=W.toLowerCase();W=parseFloat(q);if(q.indexOf('em')>0){W=W*2;}else if(q.indexOf('px')>0){W=W/8;}}if(isNaN(W)||W<1){W=10;}i.width=Math.round(W);n._validateType(i,p);n._validateString(i,'textAlign');if(i.textAlign){var t=(i.textAlign+'').toLowerCase();if(['begin','end'].indexOf(t)>-1){var v=['left','right'];t=(C.getConfiguration().getRTL()?v.reverse():v)[['begin','end'].indexOf(t)];}if(t!==''&&['left','right','center'].indexOf(t)==-1){L.warning(k+': Incorrect column alignment value '+t+' on column "'+(i.label||i.property)+'". Default alignment is used.');t='';}i.textAlign=t;}['autoScale','delimiter','displayUnit','utc','wrap'].forEach(function(P){n._validateProperty(i,P,'boolean');});['inputFormat','unit','unitProperty','template','trueValue','falseValue'].forEach(function(P){n._validateString(i,P);});if(i.template&&!Array.isArray(i.property)&&typeof i.inputFormat!=='string'){L.warning(k+': Template is not applicable on a single property without inputFormat - value will be discarded on column "'+(i.label||i.property)+'".');delete i.template;}if(i.type===E.Boolean&&(i.trueValue===null||i.falseValue===null)){L.warning(k+': The properties trueValue and falseValue have to be assigned correctly on column "'+(i.label||i.property)+'". Values will be discarded.');delete i.trueValue;delete i.falseValue;}if(i.autoScale===true&&(i.type!==E.Number||(!i.unit&&!i.unitProperty))){L.warning(k+': autoScale cannot be taken into account due to invalid configuration.');delete i.autoScale;}if(i.utc!=null&&(i.type===E.Date||i.type===E.Time)){i.utc=true;}if(i.type===E.DateTime){n._validateProperty(i,'utc','boolean',true);}var x=i.scale;if(i.type===E.Number&&isNaN(x)&&x!=='variable'){L.warning(k+': scale parameter for numerical column configuration is missing.');}if(typeof x==='string'){x=parseInt(x);}if(isNaN(x)){x=null;}i.scale=x;if(i.valueMap&&typeof i.valueMap!=='object'){L.warning(k+': Invalid value for property "valueMap" on column "'+(i.label||i.property)+'". Value will be discarded.');delete i.valueMap;}return true;});n._validateWorkbookContext(w.context);n._validateString(w,'hierarchyLevel');},_validateType:function(i){var t,p;if(typeof i.type!=='string'){i.type=E.String;return;}if(!E[i.type]){p=E.String;for(t in E){if(t.toLowerCase()==i.type.toLowerCase()){p=t;}}L.warning(k+': Unsupported column type '+i.type+' on column "'+(i.label||i.property)+'". EdmType.'+p+' is applied.');i.type=p;}if(i.type===E.Currency&&!i.unitProperty){L.warning(k+': Missing unitProperty for type Currency on column "'+(i.label||i.property)+'". Type is reverted to "String".');i.type=E.String;}else if(i.type===E.Enumeration&&(!i.valueMap||typeof i.valueMap!=='object')){L.warning(k+': Invalid valueMap for type Enumeration on column "'+(i.label||i.property)+'". Type is reverted to "String".');i.type=E.String;}},_validateWorkbookContext:function(i){if(!(i instanceof Object)){return;}n._validateString(i,'application','SAP UI5');n._validateString(i,'version',j);n._validateString(i,'title');n._validateString(i,'modifiedBy');n._validateString(i,'sheetName','SAPUI5 Spreadsheet Export',31,U);n._validateString(i,'metaSheetName','Metadata',31,U);if(i.metainfo){if(!Array.isArray(i.metainfo)){L.warning(k+': Invalid value for property "metainfo". Value will be discarded.');i.metainfo=null;}else{i.metainfo.filter(function(G,p){if(typeof G.name!=='string'||G.name.length===0){L.warning(k+': Invalid name for metainfo group at index '+p+'. Entry will be discarded.');return false;}return true;});}}},_validateString:function(i,p,q,M,R){var v;n._validateProperty(i,p,'string',q);v=i[p];if(typeof v==='string'&&(typeof R==='string'||R instanceof RegExp)){v=v.replace(R,'');}if(typeof v==='string'&&M&&v.length>M){L.warning(k+': The value of '+p+' exceeds the max length of '+M+' and will be truncated.');v=v.slice(0,M);}i[p]=v;},_validateProperty:function(i,p,t,q){var v=i[p];if(v!=null&&typeof v!==t){L.warning(k+': Invalid value for property "'+p+'. Value will be discarded.');v=null;}i[p]=v==null&&q?q:v;},_validateScaleCustomizing:function(i,p){var K,q;q=i[p];if(!(q instanceof Object)||Array.isArray(q)){L.warning(k+': Invalid scale customizing for '+p+'.');i[p]={};}else{for(K in q){if(!(q[K]instanceof Object)){L.warning(k+': Key '+K+' has been removed from customizing.');delete q[K];}else if(typeof q[K].scale!=='number'||q[K].scale<0){L.warning(k+': Key '+K+' has been removed from customizing due to invalid scale.');delete q[K];}}}}};return n;},true);
