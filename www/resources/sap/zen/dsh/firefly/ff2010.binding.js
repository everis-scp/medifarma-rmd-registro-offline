/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/zen/dsh/firefly/ff1040.kernel.native"],function(F){"use strict";F.DataManifestConstants={};F.DpBindingFactory=function(){};F.DpBindingFactory.prototype=new F.XObject();F.DpBindingFactory.prototype._ff_c="DpBindingFactory";F.DpBindingFactory.s_factories=null;F.DpBindingFactory.staticSetup=function(){F.DpBindingFactory.s_factories=F.XHashMapByString.create();};F.DpBindingFactory.registerFactory=function(c,f){F.DpBindingFactory.s_factories.put(c.getName(),f);};F.DpBindingFactory.createBindingProvider=function(c,p){var f=null;var a=c.getComponentType();while(F.notNull(a)){var n=a.getName();f=F.DpBindingFactory.s_factories.getByKey(n);if(F.notNull(f)){break;}a=a.getParent();}var b=null;if(F.notNull(f)){b=f.newBindingProvider(c,p);}return b;};F.DpDataManifestFactory={HAS_ERROR:"HasError",ERROR_TEXT:"ErrorText",create:function(e){var d=F.PrFactory.createStructure();d.putBoolean(F.DpDataManifestFactory.HAS_ERROR,true);d.putString(F.DpDataManifestFactory.ERROR_TEXT,e);return d;},createByMessages:function(m){var d=F.PrFactory.createStructure();if(F.notNull(m)&&m.hasErrors()){d.putBoolean(F.DpDataManifestFactory.HAS_ERROR,true);d.putString(F.DpDataManifestFactory.ERROR_TEXT,m.getSummary());}return d;}};F.DpBindingStringFactory=function(){};F.DpBindingStringFactory.prototype=new F.DpBindingFactory();F.DpBindingStringFactory.prototype._ff_c="DpBindingStringFactory";F.DpBindingStringFactory.staticSetupStringBindingFactory=function(){F.DpBindingFactory.registerFactory(F.XValueType.STRING,new F.DpBindingStringFactory());};F.DpBindingStringFactory.prototype.newBindingProvider=function(c,p){var d=c;return F.DpBindingStringProvider.create(d,p);};F.DpBindingStringProvider=function(){};F.DpBindingStringProvider.prototype=new F.XObject();F.DpBindingStringProvider.prototype._ff_c="DpBindingStringProvider";F.DpBindingStringProvider.create=function(d,p){var n=new F.DpBindingStringProvider();n.m_dp=d;n.m_path=p;return n;};F.DpBindingStringProvider.prototype.m_dp=null;F.DpBindingStringProvider.prototype.m_path=null;F.DpBindingStringProvider.prototype.getSenderBindings=function(){var l=F.XList.create();l.add(F.SemanticBindingType.STRING);l.add(F.SemanticBindingType.INTEGER);return l;};F.DpBindingStringProvider.prototype.getReceiverBindings=function(){var l=F.XList.create();l.add(F.SemanticBindingType.STRING);l.add(F.SemanticBindingType.INTEGER);return l;};F.DpBindingStringProvider.prototype.getSenderProtocolBindings=function(t){var l=F.XList.create();l.add(F.ProtocolBindingType.STRING);l.add(F.ProtocolBindingType.INTEGER);return l;};F.DpBindingStringProvider.prototype.getReceiverProtocolBindings=function(t){var l=F.XList.create();l.add(F.ProtocolBindingType.STRING);l.add(F.ProtocolBindingType.INTEGER);return l;};F.DpBindingStringProvider.prototype.newSenderBinding=function(t,p){return F.DpBindingStringSender.create(this.m_dp,this.m_path);};F.DpBindingStringProvider.prototype.newReceiverBinding=function(t,p){return F.DpBindingStringReceiver.create(this.m_dp,this.m_path);};F.DpBindingStringReceiver=function(){};F.DpBindingStringReceiver.prototype=new F.XObject();F.DpBindingStringReceiver.prototype._ff_c="DpBindingStringReceiver";F.DpBindingStringReceiver.create=function(d,p){var r=new F.DpBindingStringReceiver();r.m_dp=d;r.m_path=p;return r;};F.DpBindingStringReceiver.prototype.m_dp=null;F.DpBindingStringReceiver.prototype.m_path=null;F.DpBindingStringReceiver.prototype.getComponentType=function(){return F.IoComponentType.BINDING_RECEIVER;};F.DpBindingStringReceiver.prototype.isReceiverReady=function(){return true;};F.DpBindingStringReceiver.prototype.registerReceiverReadyListener=function(l,c){};F.DpBindingStringReceiver.prototype.unregisterReceiverReadyListener=function(l){};F.DpBindingStringReceiver.prototype.setDataManifest=function(d){};F.DpBindingStringReceiver.prototype.setString=function(v){this.m_dp.setString(v);};F.DpBindingStringReceiver.prototype.getString=function(){return this.m_dp.getString();};F.DpBindingStringReceiver.prototype.setInteger=function(v){this.m_dp.setString(F.XInteger.convertToString(v));};F.DpBindingStringReceiver.prototype.getInteger=function(){return F.XInteger.convertFromString(this.getString());};F.DpBindingStringSender=function(){};F.DpBindingStringSender.prototype=new F.XObject();F.DpBindingStringSender.prototype._ff_c="DpBindingStringSender";F.DpBindingStringSender.create=function(d,p){var s=new F.DpBindingStringSender();s.m_dp=d;s.m_path=p;return s;};F.DpBindingStringSender.prototype.m_dp=null;F.DpBindingStringSender.prototype.m_path=null;F.DpBindingStringSender.prototype.getComponentType=function(){return F.IoComponentType.BINDING_SENDER;};F.DpBindingStringSender.prototype.isSenderValueReady=function(){return true;};F.DpBindingStringSender.prototype.registerValueChangedListener=function(l,c){};F.DpBindingStringSender.prototype.unregisterValueChangedListener=function(l){};F.DpBindingStringSender.prototype.processSenderUpdate=function(){};F.DpBindingStringSender.prototype.getDataManifest=function(){return null;};F.DpBindingStringSender.prototype.getInteger=function(){return F.XInteger.convertFromString(this.getString());};F.DpBindingStringSender.prototype.getString=function(){return this.m_dp.getString();};F.DpBinding=function(){};F.DpBinding.prototype=new F.DfProcessContext();F.DpBinding.prototype._ff_c="DpBinding";F.DpBinding.prototype.m_sender=null;F.DpBinding.prototype.m_receiver=null;F.DpBinding.prototype.m_pullOnReceiverReady=false;F.DpBinding.prototype.m_cacheId=null;F.DpBinding.prototype.m_dataError=null;F.DpBinding.prototype.m_cacheDataManifest=null;F.DpBinding.prototype.m_dataBinding=null;F.DpBinding.prototype.m_protocolBinding=null;F.DpBinding.prototype.setupExt=function(p,d,a){this.setupProcessContext(p);this.m_dataBinding=d;this.m_protocolBinding=a;};F.DpBinding.prototype.releaseObject=function(){if(F.notNull(this.m_sender)){this.m_sender.unregisterValueChangedListener(this);}if(F.notNull(this.m_receiver)){this.m_receiver.unregisterReceiverReadyListener(this);}this.m_sender=F.XObjectExt.release(this.m_sender);this.m_receiver=F.XObjectExt.release(this.m_receiver);F.DfProcessContext.prototype.releaseObject.call(this);};F.DpBinding.prototype.bind=function(s,r,p){this.m_sender=s;this.m_receiver=r;this.m_pullOnReceiverReady=p;if(F.notNull(this.m_sender)){this.m_sender.registerValueChangedListener(this,null);}if(F.notNull(this.m_receiver)&&p){this.m_receiver.registerReceiverReadyListener(this,null);}this.transport();};F.DpBinding.prototype.onSenderValueChanged=function(s,c){this.transport();};F.DpBinding.prototype.onReceiverReadyChanged=function(r,c){this.transport();};F.DpBinding.prototype.transport=function(){if(F.notNull(this.m_sender)&&F.notNull(this.m_receiver)){if(this.m_pullOnReceiverReady===false||this.m_receiver.isReceiverReady()){if(this.m_sender.isSenderValueReady()===false){this.m_sender.processSenderUpdate();var i=this.m_sender.isSenderValueReady();if(i===false){this.transportDataFromCache();this.transferDataManifestFromCache();}}else{this.transportData();this.transferDataManifest();}}}};F.DpBinding.prototype.transportDataFromCache=function(){};F.DpBinding.prototype.getSender=function(){return this.m_sender;};F.DpBinding.prototype.getReceiver=function(){return this.m_receiver;};F.DpBinding.prototype.getCacheId=function(){return this.m_cacheId;};F.DpBinding.prototype.setCacheId=function(c){this.m_cacheId=c;};F.DpBinding.prototype.transferDataManifest=function(){if(F.notNull(this.m_sender)){var d=null;if(F.notNull(this.m_dataError)){d=F.DpDataManifestFactory.create(this.m_dataError);}else{try{d=this.m_sender.getDataManifest();}catch(e){this.m_dataError=F.XException.getStackTrace(e,0);this.log(this.m_dataError);}}if(F.notNull(this.m_receiver)){if(F.notNull(d)){try{this.m_receiver.setDataManifest(d);}catch(f){this.log(F.XException.getStackTrace(f,0));}}}this.m_dataError=null;}};F.DpBinding.prototype.transferDataManifestFromCache=function(){if(F.notNull(this.m_sender)){if(F.notNull(this.m_receiver)){if(F.notNull(this.m_cacheDataManifest)){try{this.m_receiver.setDataManifest(this.m_cacheDataManifest);}catch(f){this.log(F.XException.getStackTrace(f,0));}}}this.m_dataError=null;this.m_cacheDataManifest=null;}};F.DpBindingManager=function(){};F.DpBindingManager.prototype=new F.DfProcessContext();F.DpBindingManager.prototype._ff_c="DpBindingManager";F.DpBindingManager.create=function(p){var n=new F.DpBindingManager();n.setupProcessContext(p);return n;};F.DpBindingManager.doBinding=function(p,s,r,a,b,c,d,e){var f=null;var t=a;if(F.isNull(t)){t=r.getDefaultProtocol();}var g=b.newSenderBinding(s,t);var h=c.newReceiverBinding(r,t);if(F.notNull(g)&&F.notNull(h)){if(t.isTypeOf(F.ProtocolBindingType.JSON)){f=F.DpBindingJson.create(p,r,t,true);}else if(t.isTypeOf(F.ProtocolBindingType.STRING)){f=F.DpBindingString.create(p,r,t);}else if(t.isTypeOf(F.ProtocolBindingType.INTEGER)){f=F.DpBindingInteger.create(p,r,t);}if(F.notNull(f)){f.setCacheId(d);f.bind(g,h,e);}}return f;};F.DpBindingManager.prototype.selectSpecificBindingProvider=F.noSupport;F.DpBindingManager.prototype.bindTogether=function(s,a,b,r,c,d,t,e,p,i){var f=null;var g=null;if(i===true||F.XString.startsWith(s,"ui:")){f=this.getBindingProvider2(s,a,b);}else{f=this.getBindingProvider2(s,a,b);}g=this.getBindingProvider2(r,c,d);if(F.notNull(f)&&F.notNull(g)){return this.doBindingWithProviders(f,g,t,e,p);}else{return null;}};F.DpBindingManager.prototype.getBindingProvider=function(e,d,c,m){var t=e;if(F.isNull(t)&&F.notNull(d)){t=F.XStringUtils.concatenate2(d.getName(),":");}if(F.notNull(t)){var p=F.SigSelParser.create();var r=p.parse(t);if(r.isValid()){var o=r.getData();var s=this.getSession();var a=s.getSelector();if(o.size()>=1){var b=o.get(0);var f=a.selectComponentByOp(b,d,c,-1,m);return f;}}}return null;};F.DpBindingManager.prototype.getBindingProvider2=function(e,d,c){var a=null;var o=null;var t=e;if(F.isNull(t)&&F.notNull(d)){t=F.XStringUtils.concatenate2(d.getName(),":");}if(F.notNull(t)){var p=F.SigSelParser.create();var r=p.parse(t);if(r.isValid()){var b=r.getData();var s=this.getSession();var f=s.getSelector();if(b.size()>=1){o=b.get(0);a=f.selectComponentByOp(o,d,c,-1,false);}}}var g=null;if(F.notNull(o)&&F.notNull(a)){g=F.DpBindingFactory.createBindingProvider(a,o.getSelectedProperty());}return g;};F.DpBindingManager.prototype.doBindingWithProviders=function(a,b,t,c,p){var d=this.getProcess();var e=null;var f=null;if(F.notNull(a)&&F.notNull(b)){var g=a.getSenderBindings();var h=b.getReceiverBindings();if(F.notNull(t)){for(var s=0;s<g.size();s++){e=g.get(s);if(e.isEqualTo(t)){break;}e=null;}for(var r=0;r<h.size();r++){f=h.get(r);if(t.isTypeOf(f)){break;}f=null;}}if(F.isNull(e)||F.isNull(f)){for(var i=0;i<h.size();i++){f=h.get(i);if(g.contains(f)){e=f;break;}}}if(F.notNull(e)&&F.notNull(f)){var j=a.getSenderProtocolBindings(e);var l=b.getReceiverProtocolBindings(f);var m=null;if(F.notNull(l)&&F.notNull(j)){for(var k=0;k<l.size();k++){var n=l.get(k);if(j.contains(n)){m=n;break;}}}return F.DpBindingManager.doBinding(d,e,f,m,a,b,c,p);}}return null;};F.DpBindingManager.prototype.selectComponentByExpr=function(s,d,c,m,a){var b=this.getSession();var e=b.getSelector();return e.selectComponentByExpr(s,d,c,m,a);};F.DpBindingManager.prototype.selectComponentsByExpr=function(s,d,c,m){var a=this.getSession();var b=a.getSelector();return b.selectComponentsByExpr(s,d,c,m);};F.DpBindingManager.prototype.selectComponentsByOp=function(o,d,c,m){var s=this.getSession();var a=s.getSelector();return a.selectComponentsByOp(o,d,c,m);};F.DpBindingManager.prototype.selectComponentByOp=function(o,d,c,m,a){var s=this.getSession();var b=s.getSelector();return b.selectComponentByOp(o,d,c,m,a);};F.DpBindingInteger=function(){};F.DpBindingInteger.prototype=new F.DpBinding();F.DpBindingInteger.prototype._ff_c="DpBindingInteger";F.DpBindingInteger.create=function(p,d,a){var n=new F.DpBindingInteger();n.setupExt(p,d,a);return n;};F.DpBindingInteger.prototype.getComponentType=function(){return F.IoComponentType.BINDING_ADAPTER_INT;};F.DpBindingInteger.prototype.transportData=function(){var i=this.m_sender.getInteger();this.m_receiver.setInteger(i);};F.DpBindingJson=function(){};F.DpBindingJson.prototype=new F.DpBinding();F.DpBindingJson.prototype._ff_c="DpBindingJson";F.DpBindingJson.create=function(p,d,a,c){var n=new F.DpBindingJson();n.setupExt(p,d,a);n.m_checkForChanges=c;return n;};F.DpBindingJson.prototype.m_checkForChanges=false;F.DpBindingJson.prototype.m_lastChecksum=null;F.DpBindingJson.prototype.getComponentType=function(){return F.IoComponentType.BINDING_ADAPTER_JSON;};F.DpBindingJson.prototype.transportData=function(){if(F.notNull(this.m_sender)){try{var a=this.m_sender.getElement();this.putInCache(a);this.setAtReceiver(a);}catch(e){this.m_dataError=F.XException.getStackTrace(e,0);this.log(this.m_dataError);}}};F.DpBindingJson.prototype.transportDataFromCache=function(){try{var a=this.pullFromCache();this.setAtReceiver(a);}catch(e){this.log(F.XException.getStackTrace(e,0));}};F.DpBindingJson.prototype.putInCache=function(e){var c=this.getCacheId();if(F.notNull(c)&&F.notNull(e)){var a=this.getProcess().getCacheManager();var b=a.getSubCache("dpbinding");if(F.notNull(b)){b.put(c,e,null);}}};F.DpBindingJson.prototype.pullFromCache=function(){var e=null;var c=this.getCacheId();if(F.notNull(c)){var a=this.getProcess().getCacheManager();var b=a.getSubCache("dpbinding");if(F.notNull(b)){e=b.getByKey(c);}}return e;};F.DpBindingJson.prototype.setAtReceiver=function(e){if(F.notNull(this.m_receiver)&&F.notNull(e)){var p=true;if(this.m_checkForChanges){var n=F.PrUtils.serialize(e,true,false,0);var a=F.XSha1.createSHA1(n);if(F.notNull(a)&&F.notNull(this.m_lastChecksum)){if(F.XString.isEqual(a,this.m_lastChecksum)){p=false;}}this.m_lastChecksum=a;}if(p){this.m_receiver.setElement(e);}}};F.DpBindingString=function(){};F.DpBindingString.prototype=new F.DpBinding();F.DpBindingString.prototype._ff_c="DpBindingString";F.DpBindingString.create=function(p,d,a){var n=new F.DpBindingString();n.setupExt(p,d,a);return n;};F.DpBindingString.prototype.getComponentType=function(){return F.IoComponentType.BINDING_ADAPTER_STRING;};F.DpBindingString.prototype.transportData=function(){var s=this.m_sender.getString();this.m_receiver.setString(s);};F.DpSelection=function(){};F.DpSelection.prototype=new F.XObjectExt();F.DpSelection.prototype._ff_c="DpSelection";F.DpSelection.create=function(l){var n=new F.DpSelection();n.m_list=l;return n;};F.DpSelection.prototype.m_list=null;F.DpSelection.prototype.getComponentType=function(){return F.KernelComponentType.SIGSEL_RESULT_LIST;};F.DpSelection.prototype.getValuesAsReadOnlyList=function(){return this.m_list;};F.DpSelection.prototype.getIterator=function(){return this.m_list.getIterator();};F.DpSelection.prototype.contains=function(e){return this.m_list.contains(e);};F.DpSelection.prototype.isEmpty=function(){return this.m_list.isEmpty();};F.DpSelection.prototype.hasElements=function(){return this.m_list.hasElements();};F.DpSelection.prototype.size=function(){return this.m_list.size();};F.DpSelection.prototype.get=function(i){return this.m_list.get(i);};F.DpSelection.prototype.getIndex=function(e){return this.m_list.getIndex(e);};F.ProtocolBindingType=function(){};F.ProtocolBindingType.prototype=new F.XConstantWithParent();F.ProtocolBindingType.prototype._ff_c="ProtocolBindingType";F.ProtocolBindingType.STRING=null;F.ProtocolBindingType.INTEGER=null;F.ProtocolBindingType.JSON=null;F.ProtocolBindingType.ABSTRACT_CHART_PROTOCOL=null;F.ProtocolBindingType.HIGH_CHART_PROTOCOL=null;F.ProtocolBindingType.GOOGLE_CHART_PROTOCOL=null;F.ProtocolBindingType.VIZ_FRAME_PROTOCOL=null;F.ProtocolBindingType.MICRO_CHART_PROTOCOL=null;F.ProtocolBindingType.SAP_KPI_PROTOCOL=null;F.ProtocolBindingType.PLAIN_GRID=null;F.ProtocolBindingType.FIREFLY_GRID=null;F.ProtocolBindingType.SAC_TABLE_GRID=null;F.ProtocolBindingType.s_instances=null;F.ProtocolBindingType.create=function(n,p){var a=new F.ProtocolBindingType();a.setupExt(n,p);F.ProtocolBindingType.s_instances.put(n,a);return a;};F.ProtocolBindingType.lookup=function(n){return F.ProtocolBindingType.s_instances.getByKey(n);};F.ProtocolBindingType.staticSetup=function(){F.ProtocolBindingType.s_instances=F.XHashMapByString.create();F.ProtocolBindingType.STRING=F.ProtocolBindingType.create("String",null);F.ProtocolBindingType.INTEGER=F.ProtocolBindingType.create("Integer",null);F.ProtocolBindingType.JSON=F.ProtocolBindingType.create("Json",null);F.ProtocolBindingType.ABSTRACT_CHART_PROTOCOL=F.ProtocolBindingType.create("Chart",F.ProtocolBindingType.JSON);F.ProtocolBindingType.HIGH_CHART_PROTOCOL=F.ProtocolBindingType.create("HighChart",F.ProtocolBindingType.ABSTRACT_CHART_PROTOCOL);F.ProtocolBindingType.GOOGLE_CHART_PROTOCOL=F.ProtocolBindingType.create("GoogleChart",F.ProtocolBindingType.ABSTRACT_CHART_PROTOCOL);F.ProtocolBindingType.VIZ_FRAME_PROTOCOL=F.ProtocolBindingType.create("VizFrame",F.ProtocolBindingType.ABSTRACT_CHART_PROTOCOL);F.ProtocolBindingType.MICRO_CHART_PROTOCOL=F.ProtocolBindingType.create("MicroChart",F.ProtocolBindingType.ABSTRACT_CHART_PROTOCOL);F.ProtocolBindingType.SAP_KPI_PROTOCOL=F.ProtocolBindingType.create("SapKpiProtocol",F.ProtocolBindingType.JSON);F.ProtocolBindingType.PLAIN_GRID=F.ProtocolBindingType.create("PlainGrid",F.ProtocolBindingType.JSON);F.ProtocolBindingType.FIREFLY_GRID=F.ProtocolBindingType.create("FireflyGrid",F.ProtocolBindingType.JSON);F.ProtocolBindingType.SAC_TABLE_GRID=F.ProtocolBindingType.create("SacTableGrid",F.ProtocolBindingType.JSON);};F.SemanticBindingType=function(){};F.SemanticBindingType.prototype=new F.XConstantWithParent();F.SemanticBindingType.prototype._ff_c="SemanticBindingType";F.SemanticBindingType.STRING=null;F.SemanticBindingType.INTEGER=null;F.SemanticBindingType.JSON=null;F.SemanticBindingType.SINGLE=null;F.SemanticBindingType.MULTI=null;F.SemanticBindingType.GRID=null;F.SemanticBindingType.TABLE=null;F.SemanticBindingType.CHART=null;F.SemanticBindingType.KPI=null;F.SemanticBindingType.COLUMN=null;F.SemanticBindingType.BAR=null;F.SemanticBindingType.LINE=null;F.SemanticBindingType.BOXPLOT=null;F.SemanticBindingType.PIE=null;F.SemanticBindingType.VARIABLEPIE=null;F.SemanticBindingType.BELLCURVE=null;F.SemanticBindingType.AREA=null;F.SemanticBindingType.SPLINE=null;F.SemanticBindingType.WORDCLOUD=null;F.SemanticBindingType.SCATTER=null;F.SemanticBindingType.VARIWIDE=null;F.SemanticBindingType.BUBBLE=null;F.SemanticBindingType.COMBBCL=null;F.SemanticBindingType.HEATMAP=null;F.SemanticBindingType.TREEMAP=null;F.SemanticBindingType.TIMESERIES=null;F.SemanticBindingType.s_instances=null;F.SemanticBindingType.create=function(n,p,a){var b=new F.SemanticBindingType();b.setupExt(n,p);b.m_defaultProtocol=a;F.SemanticBindingType.s_instances.put(n,b);return b;};F.SemanticBindingType.lookup=function(n){return F.SemanticBindingType.s_instances.getByKey(n);};F.SemanticBindingType.staticSetup=function(){F.SemanticBindingType.s_instances=F.XHashMapByString.create();F.SemanticBindingType.STRING=F.SemanticBindingType.create("String",null,F.ProtocolBindingType.STRING);F.SemanticBindingType.INTEGER=F.SemanticBindingType.create("Integer",null,F.ProtocolBindingType.INTEGER);F.SemanticBindingType.JSON=F.SemanticBindingType.create("Json",null,F.ProtocolBindingType.JSON);F.SemanticBindingType.SINGLE=F.SemanticBindingType.create("Single",F.SemanticBindingType.JSON,null);F.SemanticBindingType.MULTI=F.SemanticBindingType.create("Multi",F.SemanticBindingType.JSON,null);F.SemanticBindingType.TABLE=F.SemanticBindingType.create("Table",F.SemanticBindingType.SINGLE,null);F.SemanticBindingType.GRID=F.SemanticBindingType.create("Grid",F.SemanticBindingType.SINGLE,null);F.SemanticBindingType.CHART=F.SemanticBindingType.create("Chart",F.SemanticBindingType.SINGLE,F.ProtocolBindingType.HIGH_CHART_PROTOCOL);F.SemanticBindingType.COMBBCL=F.SemanticBindingType.create("Combbcl",F.SemanticBindingType.CHART,null);F.SemanticBindingType.TIMESERIES=F.SemanticBindingType.create("Timeseries",F.SemanticBindingType.CHART,null);F.SemanticBindingType.COLUMN=F.SemanticBindingType.create("Column",F.SemanticBindingType.CHART,null);F.SemanticBindingType.BAR=F.SemanticBindingType.create("Bar",F.SemanticBindingType.CHART,null);F.SemanticBindingType.LINE=F.SemanticBindingType.create("Line",F.SemanticBindingType.CHART,null);F.SemanticBindingType.PIE=F.SemanticBindingType.create("Pie",F.SemanticBindingType.CHART,null);F.SemanticBindingType.WORDCLOUD=F.SemanticBindingType.create("WordCloud",F.SemanticBindingType.CHART,null);F.SemanticBindingType.BELLCURVE=F.SemanticBindingType.create("BellCurve",F.SemanticBindingType.CHART,null);F.SemanticBindingType.AREA=F.SemanticBindingType.create("Area",F.SemanticBindingType.CHART,null);F.SemanticBindingType.SCATTER=F.SemanticBindingType.create("Scatter",F.SemanticBindingType.CHART,null);F.SemanticBindingType.SPLINE=F.SemanticBindingType.create("Spline",F.SemanticBindingType.CHART,null);F.SemanticBindingType.VARIABLEPIE=F.SemanticBindingType.create("VariablePie",F.SemanticBindingType.CHART,null);F.SemanticBindingType.VARIWIDE=F.SemanticBindingType.create("Variwide",F.SemanticBindingType.CHART,null);F.SemanticBindingType.BOXPLOT=F.SemanticBindingType.create("BoxPlot",F.SemanticBindingType.CHART,null);F.SemanticBindingType.BUBBLE=F.SemanticBindingType.create("Bubble",F.SemanticBindingType.CHART,null);F.SemanticBindingType.HEATMAP=F.SemanticBindingType.create("Heatmap",F.SemanticBindingType.CHART,null);F.SemanticBindingType.TREEMAP=F.SemanticBindingType.create("Treemap",F.SemanticBindingType.CHART,null);F.SemanticBindingType.KPI=F.SemanticBindingType.create("Kpi",F.SemanticBindingType.SINGLE,F.ProtocolBindingType.SAP_KPI_PROTOCOL);};F.SemanticBindingType.prototype.m_defaultProtocol=null;F.SemanticBindingType.prototype.getDefaultProtocol=function(){if(F.notNull(this.m_defaultProtocol)){return this.m_defaultProtocol;}var t=this.getParent();if(F.isNull(t)){return null;}return t.getDefaultProtocol();};F.BindingModule=function(){};F.BindingModule.prototype=new F.DfModule();F.BindingModule.prototype._ff_c="BindingModule";F.BindingModule.s_module=null;F.BindingModule.getInstance=function(){if(F.isNull(F.BindingModule.s_module)){F.DfModule.checkInitialized(F.KernelNativeModule.getInstance());F.BindingModule.s_module=F.DfModule.startExt(new F.BindingModule());F.ProtocolBindingType.staticSetup();F.SemanticBindingType.staticSetup();F.DpBindingFactory.staticSetup();F.DpBindingStringFactory.staticSetupStringBindingFactory();F.DfModule.stopExt(F.BindingModule.s_module);}return F.BindingModule.s_module;};F.BindingModule.prototype.getName=function(){return"ff2010.binding";};F.BindingModule.getInstance();return sap.firefly;});
