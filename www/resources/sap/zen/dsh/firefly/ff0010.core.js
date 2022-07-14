/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/zen/dsh/firefly/ff0005.language.ext"],function(f){"use strict";f.XCompararorStringAsNumber=function(){};f.XCompararorStringAsNumber.prototype=new f.XObject();f.XCompararorStringAsNumber.prototype._ff_c="XCompararorStringAsNumber";f.XCompararorStringAsNumber.prototype.m_sortDirection=null;f.XCompararorStringAsNumber.prototype.setupExt=function(s){this.m_sortDirection=s;};f.XCompararorStringAsNumber.prototype.compare=function(o,a){var i=f.XInteger.convertFromString(o);var b=f.XInteger.convertFromString(a);if(i===b){return 0;}var r=1;if(i<b){r=-1;}if(this.m_sortDirection===f.XSortDirection.DESCENDING){return-r;}return r;};f.XComparatorDouble=function(){};f.XComparatorDouble.prototype=new f.XObject();f.XComparatorDouble.prototype._ff_c="XComparatorDouble";f.XComparatorDouble.create=function(){return new f.XComparatorDouble();};f.XComparatorDouble.prototype.compare=function(o,a){var s=o.getDouble();var b=a.getDouble();if(s===b){return 0;}else if(s>b){return 1;}else{return-1;}};f.XComparatorName=function(){};f.XComparatorName.prototype=new f.XObject();f.XComparatorName.prototype._ff_c="XComparatorName";f.XComparatorName.create=function(){return new f.XComparatorName();};f.XComparatorName.prototype.compare=function(o,a){var s=o.getName();var b=a.getName();return f.XString.compare(s,b);};f.XArrayUtils={copyFromStringArray:function(s,t,a,b,l){var c=a;var d=b;var v;for(var i=0;i<l;i++){v=s.get(c);t.set(d,v);c++;d++;}},copyFromObjectArray:function(s,t,a,b,l){var c=a;var d=b;var v;for(var i=0;i<l;i++){v=s.get(c);t.set(d,v);c++;d++;}}};f.XListUtils={addAllObjects:function(s,t){if(f.notNull(s)&&s!==t){var l=s.getValuesAsReadOnlyList();var a=l.size();for(var i=0;i<a;i++){t.add(l.get(i));}}},sublist:function(s,t,b,e){for(var i=b;i<=e;i++){t.add(s.get(i));}return t;},addAllStrings:function(s,t){if(f.notNull(s)&&s!==t){var l=s.getValuesAsReadOnlyListOfString();var a=l.size();for(var i=0;i<a;i++){t.add(l.get(i));}}},reorderList:function(l,o){if(f.notNull(l)&&f.notNull(o)){if(l.size()===o.size()){var e=l.getKeysAsReadOnlyListOfString();if(e.size()===o.size()){var a=true;var n;for(var i=0;i<o.size();i++){n=o.get(i);if(!f.XString.isEqual(n,e.get(i))){a=false;break;}}if(a===false){var b;var c;for(var j=0;j<o.size();j++){n=o.get(j);b=l.getByKey(n);if(f.isNull(b)){return;}}for(var k=0;k<o.size();k++){n=o.get(k);b=l.getByKey(n);c=l.getIndex(b);l.moveElement(c,k);}}}}}},isListEquals:function(t,o){if(t===o){return true;}if(f.isNull(t)||f.isNull(o)){return false;}if(t.size()!==o.size()){return false;}for(var i=0;i<t.size();i++){if(t.get(i)===null&&o.get(i)===null){continue;}else if(t.get(i)===null||o.get(i)===null){return false;}else if(!t.get(i).isEqualTo(o.get(i))){return false;}}return true;},isListOfStringEquals:function(t,o){if(f.isNull(o)){return false;}if(t===o){return true;}var a=o;if(t.size()!==a.size()){return false;}for(var i=0;i<t.size();i++){if(!f.XString.isEqual(t.get(i),a.get(i))){return false;}}return true;},assertGetSetIndexValid:function(s,i){if(i<0||i>=s.size()){throw f.XException.createIllegalArgumentException("illegal index");}},assertInsertIndexValid:function(s,i){if(i<0||i>s.size()){throw f.XException.createIllegalArgumentException("illegal index");}}};f.XMapUtils={putAllObjects:function(s,t){var k=s.getKeysAsReadOnlyListOfString();var a=k.size();var b;var v;for(var i=0;i<a;i++){b=k.get(i);v=s.getByKey(b);t.put(b,v);}},putAllStrings:function(s,t){var k=s.getKeysAsReadOnlyListOfString();var a=k.size();var b;var v;for(var i=0;i<a;i++){b=k.get(i);v=s.getByKey(b);t.put(b,v);}}};f.XIteratorWrapper=function(){};f.XIteratorWrapper.prototype=new f.XObject();f.XIteratorWrapper.prototype._ff_c="XIteratorWrapper";f.XIteratorWrapper.create=function(l){var n=new f.XIteratorWrapper();n.m_iterator=l;return n;};f.XIteratorWrapper.prototype.m_iterator=null;f.XIteratorWrapper.prototype.releaseObject=function(){this.m_iterator=null;f.XObject.prototype.releaseObject.call(this);};f.XIteratorWrapper.prototype.hasNext=function(){return this.m_iterator.hasNext();};f.XIteratorWrapper.prototype.next=function(){return this.m_iterator.next();};f.XObjectIterator=function(){};f.XObjectIterator.prototype=new f.XObject();f.XObjectIterator.prototype._ff_c="XObjectIterator";f.XObjectIterator.create=function(l){var n=new f.XObjectIterator();n.m_list=l;n.m_index=-1;return n;};f.XObjectIterator.prototype.m_list=null;f.XObjectIterator.prototype.m_index=0;f.XObjectIterator.prototype.releaseObject=function(){this.m_list=null;f.XObject.prototype.releaseObject.call(this);};f.XObjectIterator.prototype.getList=function(){return this.m_list;};f.XObjectIterator.prototype.hasNext=function(){return this.m_index+1<this.getList().size();};f.XObjectIterator.prototype.next=function(){this.m_index++;return this.getList().get(this.m_index);};f.XUniversalIterator=function(){};f.XUniversalIterator.prototype=new f.XObject();f.XUniversalIterator.prototype._ff_c="XUniversalIterator";f.XUniversalIterator.create=function(l){var n=new f.XUniversalIterator();n.m_list=l;n.m_index=-1;return n;};f.XUniversalIterator.prototype.m_list=null;f.XUniversalIterator.prototype.m_index=0;f.XUniversalIterator.prototype.releaseObject=function(){this.m_list=null;f.XObject.prototype.releaseObject.call(this);};f.XUniversalIterator.prototype.getList=function(){return this.m_list;};f.XUniversalIterator.prototype.hasNext=function(){return this.m_index+1<this.getList().size();};f.XUniversalIterator.prototype.next=function(){this.m_index++;return this.getList().get(this.m_index);};f.DfAbstractReadOnlyBinary=function(){};f.DfAbstractReadOnlyBinary.prototype=new f.XObjectExt();f.DfAbstractReadOnlyBinary.prototype._ff_c="DfAbstractReadOnlyBinary";f.DfAbstractReadOnlyBinary.prototype.isEmpty=function(){return!this.hasElements();};f.DfAbstractKeyBagOfString=function(){};f.DfAbstractKeyBagOfString.prototype=new f.DfAbstractReadOnlyBinary();f.DfAbstractKeyBagOfString.prototype._ff_c="DfAbstractKeyBagOfString";f.DfAbstractKeyBagOfString.prototype.getKeysAsIteratorOfString=function(){return this.getKeysAsReadOnlyListOfString().getIterator();};f.XSortDirection=function(){};f.XSortDirection.prototype=new f.XConstant();f.XSortDirection.prototype._ff_c="XSortDirection";f.XSortDirection.ASCENDING=null;f.XSortDirection.DESCENDING=null;f.XSortDirection.NONE=null;f.XSortDirection.DISABLED=null;f.XSortDirection.DEFAULT_VALUE=null;f.XSortDirection.staticSetup=function(){f.XSortDirection.ASCENDING=f.XConstant.setupName(new f.XSortDirection(),"ASCENDING");f.XSortDirection.DESCENDING=f.XConstant.setupName(new f.XSortDirection(),"DESCENDING");f.XSortDirection.DEFAULT_VALUE=f.XConstant.setupName(new f.XSortDirection(),"DEFAULT");f.XSortDirection.NONE=f.XConstant.setupName(new f.XSortDirection(),"NONE");f.XSortDirection.DISABLED=f.XConstant.setupName(new f.XSortDirection(),"DISABLED");};f.DfAbstractMapByString=function(){};f.DfAbstractMapByString.prototype=new f.DfAbstractKeyBagOfString();f.DfAbstractMapByString.prototype._ff_c="DfAbstractMapByString";f.DfAbstractMapByString.prototype.getIterator=function(){return this.getValuesAsReadOnlyList().getIterator();};f.DfAbstractMapByString.prototype.putAll=function(o){f.XMapUtils.putAllObjects(o,this);};f.DfAbstractMapByString.prototype.putIfNotNull=function(k,e){if(f.notNull(e)){this.put(k,e);}};f.DfAbstractMapByString.prototype.isEqualTo=function(o){if(f.isNull(o)){return false;}if(this===o){return true;}var a=o;if(this.size()!==a.size()){return false;}var k=this.getKeysAsIteratorOfString();while(k.hasNext()){var b=k.next();if(!a.containsKey(b)){return false;}var t=this.getByKey(b);var c=a.getByKey(b);var d=t;var e=c;if(d!==e){if(f.isNull(t)){return false;}if(!t.isEqualTo(c)){return false;}}}f.XObjectExt.release(k);return true;};f.DfAbstractMapOfStringByString=function(){};f.DfAbstractMapOfStringByString.prototype=new f.DfAbstractKeyBagOfString();f.DfAbstractMapOfStringByString.prototype._ff_c="DfAbstractMapOfStringByString";f.DfAbstractMapOfStringByString.prototype.getIterator=function(){return this.getValuesAsReadOnlyListOfString().getIterator();};f.DfAbstractMapOfStringByString.prototype.isEqualTo=function(o){if(f.isNull(o)){return false;}if(this===o){return true;}var a=o;if(this.size()!==a.size()){return false;}var k=this.getKeysAsIteratorOfString();while(k.hasNext()){var b=k.next();if(!a.containsKey(b)){return false;}if(!f.XString.isEqual(this.getByKey(b),a.getByKey(b))){return false;}}f.XObjectExt.release(k);return true;};f.DfAbstractMapOfStringByString.prototype.putAll=function(o){f.XMapUtils.putAllStrings(o,this);};f.DfAbstractSetOfString=function(){};f.DfAbstractSetOfString.prototype=new f.DfAbstractReadOnlyBinary();f.DfAbstractSetOfString.prototype._ff_c="DfAbstractSetOfString";f.DfAbstractSetOfString.prototype.getIterator=function(){return this.getValuesAsReadOnlyListOfString().getIterator();};f.DfAbstractSetOfString.prototype.addAll=function(o){f.XListUtils.addAllStrings(o,this);};f.DfAbstractSetOfString.prototype.isEqualTo=function(o){if(f.isNull(o)){return false;}if(this===o){return true;}var a=o;if(this.size()!==a.size()){return false;}var v=this.getIterator();while(v.hasNext()){var b=v.next();if(!a.contains(b)){return false;}}f.XObjectExt.release(v);return true;};f.DfAbstractList=function(){};f.DfAbstractList.prototype=new f.DfAbstractReadOnlyBinary();f.DfAbstractList.prototype._ff_c="DfAbstractList";f.DfAbstractList.prototype.getValuesAsReadOnlyList=function(){return this;};f.DfAbstractList.prototype.isEqualTo=function(o){return f.XListUtils.isListEquals(this,o);};f.DfAbstractList.prototype.addAll=function(o){f.XListUtils.addAllObjects(o,this);};f.DfAbstractList.prototype.contains=function(e){return this.getIndex(e)!==-1;};f.DfAbstractList.prototype.getIndex=function(e){var t=this.size();var o=e;for(var i=0;i<t;i++){var a=this.get(i);if(a===o){return i;}if(f.notNull(a)&&a.isEqualTo(o)){return i;}}return-1;};f.DfAbstractList.prototype.removeElement=function(e){var i=this.getIndex(e);if(i!==-1){this.removeAt(i);}return e;};f.DfAbstractListOfString=function(){};f.DfAbstractListOfString.prototype=new f.DfAbstractReadOnlyBinary();f.DfAbstractListOfString.prototype._ff_c="DfAbstractListOfString";f.DfAbstractListOfString.prototype.getValuesAsReadOnlyListOfString=function(){return this;};f.DfAbstractListOfString.prototype.isEqualTo=function(o){return f.XListUtils.isListOfStringEquals(this,o);};f.DfAbstractListOfString.prototype.addAll=function(o){f.XListUtils.addAllStrings(o,this);};f.CoreModule=function(){};f.CoreModule.prototype=new f.DfModule();f.CoreModule.prototype._ff_c="CoreModule";f.CoreModule.s_module=null;f.CoreModule.getInstance=function(){if(f.isNull(f.CoreModule.s_module)){f.DfModule.checkInitialized(f.LanguageExtModule.getInstance());f.CoreModule.s_module=f.DfModule.startExt(new f.CoreModule());f.XSortDirection.staticSetup();f.DfModule.stopExt(f.CoreModule.s_module);}return f.CoreModule.s_module;};f.CoreModule.prototype.getName=function(){return"ff0010.core";};f.CoreModule.getInstance();return sap.firefly;});