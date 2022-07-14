/*!
 * SAPUI5
  (c) Copyright 2009-2021 SAP SE. All rights reserved
 */
sap.ui.define(["sap/zen/dsh/firefly/ff0020.core.native"],function(f){"use strict";f.XCollectionFactory={LOOKUP_LIST:0,LINKED_MAP:1,MAPPED_LIST:2,createNamedList:function(t){if(t===f.XCollectionFactory.LOOKUP_LIST){return f.XLookupListOfNameObject.create();}else if(t===f.XCollectionFactory.LINKED_MAP){return f.XLinkedMap.createLinkedMap();}else if(t===f.XCollectionFactory.MAPPED_LIST){return f.XListOfNameObject.create();}else{return null;}}};f.XCollectionUtils={getByName:function(l,n){if(f.isNull(l)){return null;}var s=l.size();for(var i=0;i<s;i++){var e=l.get(i);if(f.notNull(e)&&f.XString.isEqual(n,e.getName())){return e;}}return null;},getIndexByName:function(l,n){if(f.isNull(l)){return-1;}var s=l.size();for(var i=0;i<s;i++){var e=l.get(i);if(f.XString.isEqual(n,e.getName())){return i;}}return-1;},hasElements:function(c){return f.notNull(c)&&c.hasElements();},releaseEntriesFromCollection:function(c){if(f.notNull(c)){var i=c.getIterator();while(i.hasNext()){f.XObjectExt.release(i.next());}f.XObjectExt.release(i);}},releaseEntriesAndCollectionIfNotNull:function(c){f.XCollectionUtils.releaseEntriesFromCollection(c);f.XObjectExt.release(c);return null;},createListCopy:function(o){if(f.isNull(o)){return null;}var l=f.XList.create();l.addAll(o);return l;},createListOfNames:function(s){var l=f.XListOfString.create();var i=s.getIterator();while(i.hasNext()){l.add(i.next().getName());}return l;},addAll:function(t,s){var i=s.getIterator();while(i.hasNext()){t.add(i.next());}return t;},addAllClones:function(t,s){if(f.notNull(s)){var i=s.getIterator();while(i.hasNext()){t.add(f.XObjectExt.cloneIfNotNull(i.next()));}f.XObjectExt.release(i);}return t;},createListOfClones:function(s){var r=f.XList.create();f.XCollectionUtils.addAllClones(r,s);return r;},sortListAsIntegers:function(l,s){var a=f.XListOfString.createFromReadOnlyList(l);var c=new f.XCompararorStringAsNumber();c.setupExt(s);a.sortByComparator(c);return a;},join:function(l,s){var a=f.XStringBuffer.create();if(f.XCollectionUtils.hasElements(l)&&f.notNull(s)){a.append(l.get(0));var b=l.size();for(var i=1;i<b;i++){var v=l.get(i);if(f.XStringUtils.isNotNullAndNotEmpty(v)){a.append(s).append(v);}}}return a.toString();},concatenateByteArrays:function(a,b){var c=f.XByteArray.create(null,a.size()+b.size());f.XByteArray.copy(a,0,c,0,a.size());f.XByteArray.copy(b,0,c,a.size(),b.size());return c;},singletonList:function(e){var l=f.XList.create();l.add(e);return l;},addIfNotPresent:function(l,v){if(f.notNull(l)&&f.XStringUtils.isNotNullAndNotEmpty(v)&&!l.contains(v)){l.add(v);}},addIfNotNull:function(l,v){if(f.notNull(l)&&f.notNull(v)){l.add(v);}},contains:function(c,p){if(f.notNull(c)){var i=c.getIterator();while(i.hasNext()){if(p(i.next())){f.XObjectExt.release(i);return true;}}f.XObjectExt.release(i);}return false;},reduce:function(c,i,r){var a=i;var b=c.getIterator();while(b.hasNext()){a=r(a,b.next());}f.XObjectExt.release(b);return a;},removeIf:function(c,p){var e=false;if(f.notNull(c)){var a=c.getValuesAsReadOnlyList();var s=c.size();for(var i=s-1;i>=0;i--){var b=a.get(i);if(p(b)){c.removeElement(b);e=true;}}}return e;},removeFromMapIf:function(m,p){var e=false;if(f.notNull(m)){var a=m.getKeysAsReadOnlyListOfString();var s=a.size();for(var i=s-1;i>=0;i--){var k=a.get(i);var v=m.getByKey(k);if(p(k,v)){m.remove(k);e=true;}}}return e;},filter:function(c,p){if(f.notNull(c)){var a=f.XList.create();var i=c.getIterator();while(i.hasNext()){var e=i.next();if(p(e)){a.add(e);}}f.XObjectExt.release(i);return a;}return null;},map:function(v,m){var r=f.XList.create();if(f.XCollectionUtils.hasElements(v)){var i=v.getIterator();while(i.hasNext()){r.add(m(i.next()));}f.XObjectExt.release(i);}return r;},forEach:function(c,a){if(f.notNull(c)){var i=c.getIterator();while(i.hasNext()){a(i.next());}f.XObjectExt.release(i);}}};f.XStream={of:function(v){return f.XStreamReference.create(v);}};f.XStreamCollector={toList:function(){return f.XStreamCollectorImpl.create(function(){var l=f.XList.create();return l;}.bind(this),function(r,n){r.add(n);return r;}.bind(this));},to:function(c){return f.XStreamCollectorImpl.create(function(){return c;}.bind(this),function(r,n){r.add(n);return r;}.bind(this));},toListOfString:function(t){return f.XStreamCollectorImpl.create(function(){return f.XListOfString.create();}.bind(this),function(r,n){r.add(t(n));return r;}.bind(this));},toSetOfString:function(t){return f.XStreamCollectorImpl.create(function(){return f.XHashSetOfString.create();}.bind(this),function(r,n){r.add(t(n));return r;}.bind(this));},toMap:function(k,v){return f.XStreamCollectorImpl.create(function(){return f.XHashMapByString.create();}.bind(this),function(r,n){var a=k(n);var b=v(n);r.put(a,b);return r;}.bind(this));}};f.XStreamCollectorImpl=function(){};f.XStreamCollectorImpl.prototype=new f.XObject();f.XStreamCollectorImpl.prototype._ff_c="XStreamCollectorImpl";f.XStreamCollectorImpl.create=function(s,_){var c=new f.XStreamCollectorImpl();c.setupCollector(s,_);return c;};f.XStreamCollectorImpl.prototype.m_collectionSupplier=null;f.XStreamCollectorImpl.prototype.m_applyValueFunction=null;f.XStreamCollectorImpl.prototype.setupCollector=function(s,_){this.m_collectionSupplier=s;this.m_applyValueFunction=_;};f.XStreamCollectorImpl.prototype.releaseObject=function(){f.XObject.prototype.releaseObject.call(this);this.m_collectionSupplier=null;this.m_applyValueFunction=null;};f.XStreamCollectorImpl.prototype.apply=function(v){var r=this.m_collectionSupplier();while(v.hasNext()){this.m_applyValueFunction(r,v.next());}return r;};f.XStreamBase=function(){};f.XStreamBase.prototype=new f.XObject();f.XStreamBase.prototype._ff_c="XStreamBase";f.XStreamBase.prototype.m_prevStreamOperation=null;f.XStreamBase.prototype.m_nextValue=null;f.XStreamBase.prototype.setupStream=function(p){this.m_prevStreamOperation=p;};f.XStreamBase.prototype.releaseObject=function(){f.XObject.prototype.releaseObject.call(this);this.m_prevStreamOperation=f.XObjectExt.release(this.m_prevStreamOperation);this.m_nextValue=null;};f.XStreamBase.prototype.hasNext=function(){while(this.m_prevStreamOperation.hasNext()){if(this.applyNextValue(this.m_prevStreamOperation.next())){return true;}}return false;};f.XStreamBase.prototype.next=function(){return this.m_nextValue;};f.XStreamBase.prototype.checkNotConsumed=function(){if(this.isReleased()){throw f.XException.createIllegalStateException("Stream has already been operated upon or closed");}};f.XStreamBase.prototype.filterNullValues=function(){this.checkNotConsumed();return f.XStreamFilterOperation.create(this,function(v){return f.notNull(v);}.bind(this));};f.XStreamBase.prototype.filter=function(p){this.checkNotConsumed();return f.XStreamFilterOperation.create(this,p);};f.XStreamBase.prototype.map=function(m){this.checkNotConsumed();return f.XStreamMapOperation.create(this,m);};f.XStreamBase.prototype.findAny=function(){this.checkNotConsumed();var v=null;if(this.hasNext()){v=this.next();}f.XObjectExt.release(this);return v;};f.XStreamBase.prototype.reduce=function(i,r){this.checkNotConsumed();var a=i;while(this.hasNext()){a=r(a,this.next());}f.XObjectExt.release(this);return a;};f.XStreamBase.prototype.collect=function(c){this.checkNotConsumed();var r=c.apply(this);f.XObjectExt.release(c);f.XObjectExt.release(this);return r;};f.XStreamBase.prototype.forEach=function(c){this.checkNotConsumed();while(this.hasNext()){c(this.next());}f.XObjectExt.release(this);};f.XArray2Dim=function(){};f.XArray2Dim.prototype=new f.DfAbstractReadOnlyBinary();f.XArray2Dim.prototype._ff_c="XArray2Dim";f.XArray2Dim.create=function(d,a){var o=new f.XArray2Dim();o.setupExt(d,a,null);return o;};f.XArray2Dim.prototype.m_dim0count=0;f.XArray2Dim.prototype.m_dim1count=0;f.XArray2Dim.prototype.m_list=null;f.XArray2Dim.prototype.setupExt=function(d,a,s){this.m_dim0count=d;this.m_dim1count=a;if(f.isNull(s)){var b=d*a;this.m_list=f.XArray.create(b);}else{this.m_list=s;}};f.XArray2Dim.prototype.releaseObject=function(){this.m_dim0count=-1;this.m_dim1count=-1;this.m_list=f.XObjectExt.release(this.m_list);f.DfAbstractReadOnlyBinary.prototype.releaseObject.call(this);};f.XArray2Dim.prototype.createArrayCopy=function(){var c=this.m_list.createArrayCopy();var o=new f.XArray2Dim();o.setupExt(this.m_dim0count,this.m_dim1count,c);return o;};f.XArray2Dim.prototype.clear=function(){this.m_list.clear();};f.XArray2Dim.prototype.size=function(){return f.isNull(this.m_list)?-1:this.m_list.size();};f.XArray2Dim.prototype.hasElements=function(){var s=this.m_list.size();for(var i=0;i<s;i++){if(this.m_list.get(i)!==null){return true;}}return false;};f.XArray2Dim.prototype.setByIndices=function(i,a,e){if(i>=this.m_dim0count){throw f.XException.createIllegalArgumentException("Index0 is too big");}if(a>=this.m_dim1count){throw f.XException.createIllegalArgumentException("Index1 is too big");}var p=i+a*this.m_dim0count;this.m_list.set(p,e);};f.XArray2Dim.prototype.getByIndices=function(i,a){if(i>=this.m_dim0count||a>=this.m_dim1count){return null;}var p=i+a*this.m_dim0count;return this.m_list.get(p);};f.XArray2Dim.prototype.size0=function(){return this.m_dim0count;};f.XArray2Dim.prototype.size1=function(){return this.m_dim1count;};f.XArray2Dim.prototype.toString=function(){var s=f.XStringBuffer.create();s.append("Size0: ").appendInt(this.m_dim0count).appendNewLine();s.append("Size1: ").appendInt(this.m_dim1count).appendNewLine();s.append("Values:");for(var i=0;i<this.m_dim1count;i++){s.appendNewLine();s.append("[");for(var a=0;a<this.m_dim0count;a++){var e=this.getByIndices(a,i);s.append(f.isNull(e)?"null":e.toString());if(a<this.m_dim0count-1){s.append(", ");}}s.append("]");}return s.toString();};f.XReadOnlyListWrapper=function(){};f.XReadOnlyListWrapper.prototype=new f.XObject();f.XReadOnlyListWrapper.prototype._ff_c="XReadOnlyListWrapper";f.XReadOnlyListWrapper.create=function(l){var n=new f.XReadOnlyListWrapper();n.m_originList=l;return n;};f.XReadOnlyListWrapper.prototype.m_originList=null;f.XReadOnlyListWrapper.prototype.releaseObject=function(){this.m_originList=null;f.XObject.prototype.releaseObject.call(this);};f.XReadOnlyListWrapper.prototype.getValuesAsReadOnlyList=function(){return this;};f.XReadOnlyListWrapper.prototype.getIterator=function(){return f.XUniversalIterator.create(this.m_originList);};f.XReadOnlyListWrapper.prototype.contains=function(e){return this.m_originList.contains(e);};f.XReadOnlyListWrapper.prototype.size=function(){return this.m_originList.size();};f.XReadOnlyListWrapper.prototype.isEmpty=function(){return this.m_originList.isEmpty();};f.XReadOnlyListWrapper.prototype.hasElements=function(){return this.m_originList.hasElements();};f.XReadOnlyListWrapper.prototype.get=function(i){return this.m_originList.get(i);};f.XReadOnlyListWrapper.prototype.getIndex=function(e){return this.m_originList.getIndex(e);};f.XReadOnlyListWrapper.prototype.toString=function(){return this.m_originList.toString();};f.XStreamFilterOperation=function(){};f.XStreamFilterOperation.prototype=new f.XStreamBase();f.XStreamFilterOperation.prototype._ff_c="XStreamFilterOperation";f.XStreamFilterOperation.create=function(p,a){var b=new f.XStreamFilterOperation();b.setupFilterOperation(p,a);return b;};f.XStreamFilterOperation.prototype.m_predicate=null;f.XStreamFilterOperation.prototype.setupFilterOperation=function(p,a){f.XStreamBase.prototype.setupStream.call(this,p);this.m_predicate=a;};f.XStreamFilterOperation.prototype.releaseObject=function(){f.XStreamBase.prototype.releaseObject.call(this);this.m_predicate=null;};f.XStreamFilterOperation.prototype.applyNextValue=function(v){if(this.m_predicate(v)){this.m_nextValue=v;return true;}return false;};f.XStreamMapOperation=function(){};f.XStreamMapOperation.prototype=new f.XStreamBase();f.XStreamMapOperation.prototype._ff_c="XStreamMapOperation";f.XStreamMapOperation.create=function(p,m){var a=new f.XStreamMapOperation();a.setupMapOperation(p,m);return a;};f.XStreamMapOperation.prototype.m_mapper=null;f.XStreamMapOperation.prototype.setupMapOperation=function(p,m){f.XStreamBase.prototype.setupStream.call(this,p);this.m_mapper=m;};f.XStreamMapOperation.prototype.releaseObject=function(){f.XStreamBase.prototype.releaseObject.call(this);this.m_mapper=null;};f.XStreamMapOperation.prototype.applyNextValue=function(v){this.m_nextValue=this.m_mapper(v);return true;};f.XStreamReference=function(){};f.XStreamReference.prototype=new f.XStreamBase();f.XStreamReference.prototype._ff_c="XStreamReference";f.XStreamReference.create=function(v){var s=new f.XStreamReference();s.m_values=f.notNull(v)?v.getValuesAsReadOnlyList():null;return s;};f.XStreamReference.prototype.m_values=null;f.XStreamReference.prototype.m_index=0;f.XStreamReference.prototype.releaseObject=function(){f.XStreamBase.prototype.releaseObject.call(this);this.m_values=null;};f.XStreamReference.prototype.hasNext=function(){if(f.notNull(this.m_values)&&this.m_values.size()>this.m_index){this.applyNextValue(this.m_values.get(this.m_index));this.m_index++;return true;}return false;};f.XStreamReference.prototype.applyNextValue=function(v){this.m_nextValue=v;return true;};f.XSimpleMap=function(){};f.XSimpleMap.prototype=new f.DfAbstractReadOnlyBinary();f.XSimpleMap.prototype._ff_c="XSimpleMap";f.XSimpleMap.create=function(){var m=new f.XSimpleMap();m.m_list=f.XList.create();return m;};f.XSimpleMap.prototype.m_list=null;f.XSimpleMap.prototype.releaseObject=function(){this.m_list=f.XObjectExt.release(this.m_list);f.DfAbstractReadOnlyBinary.prototype.releaseObject.call(this);};f.XSimpleMap.prototype.containsKey=function(k){return this.getByKey(k)!==null;};f.XSimpleMap.prototype.getByKey=function(k){for(var i=0;i<this.m_list.size();i++){var p=this.m_list.get(i);if(f.XObjectExt.areEqual(p.getFirstObject(),k)){return p.getSecondObject();}}return null;};f.XSimpleMap.prototype.contains=function(e){for(var i=0;i<this.m_list.size();i++){var p=this.m_list.get(i);if(f.XObjectExt.areEqual(p.getSecondObject(),e)){return true;}}return false;};f.XSimpleMap.prototype.getKeysAsIterator=function(){return this.getKeysAsReadOnlyList().getIterator();};f.XSimpleMap.prototype.getKeysAsReadOnlyList=function(){var l=f.XList.create();for(var i=0;i<this.m_list.size();i++){var p=this.m_list.get(i);l.add(p.getFirstObject());}return l;};f.XSimpleMap.prototype.getIterator=function(){return this.getValuesAsReadOnlyList().getIterator();};f.XSimpleMap.prototype.getValuesAsReadOnlyList=function(){var l=f.XList.create();for(var i=0;i<this.m_list.size();i++){var p=this.m_list.get(i);l.add(p.getSecondObject());}return l;};f.XSimpleMap.prototype.put=function(k,e){this.remove(k);var p=f.XPair.create(k,e);this.m_list.add(p);};f.XSimpleMap.prototype.remove=function(k){for(var i=0;i<this.m_list.size();i++){var p=this.m_list.get(i);if(f.XObjectExt.areEqual(p.getFirstObject(),k)){return this.m_list.removeAt(i).getSecondObject();}}return null;};f.XSimpleMap.prototype.createMapCopy=function(){var m=f.XSimpleMap.create();for(var i=0;i<this.m_list.size();i++){var p=this.m_list.get(i);m.put(p.getFirstObject(),p.getSecondObject());}return m;};f.XSimpleMap.prototype.hasElements=function(){return this.m_list.hasElements();};f.XSimpleMap.prototype.size=function(){return this.m_list.size();};f.XSimpleMap.prototype.clear=function(){this.m_list.clear();};f.XSimpleMap.prototype.toString=function(){return this.m_list.toString();};f.XUnmodSetOfNameObject=function(){};f.XUnmodSetOfNameObject.prototype=new f.DfAbstractKeyBagOfString();f.XUnmodSetOfNameObject.prototype._ff_c="XUnmodSetOfNameObject";f.XUnmodSetOfNameObject.create=function(b){var l=new f.XUnmodSetOfNameObject();l.m_storage=f.XWeakReferenceUtil.getWeakRef(b);return l;};f.XUnmodSetOfNameObject.prototype.m_storage=null;f.XUnmodSetOfNameObject.prototype.releaseObject=function(){this.m_storage=f.XObjectExt.release(this.m_storage);f.DfAbstractKeyBagOfString.prototype.releaseObject.call(this);};f.XUnmodSetOfNameObject.prototype.getHardStorage=function(){return f.XWeakReferenceUtil.getHardRef(this.m_storage);};f.XUnmodSetOfNameObject.prototype.getValuesAsReadOnlyList=function(){return this.getHardStorage().getValuesAsReadOnlyList();};f.XUnmodSetOfNameObject.prototype.getIterator=function(){return this.getHardStorage().getIterator();};f.XUnmodSetOfNameObject.prototype.size=function(){return this.getHardStorage().size();};f.XUnmodSetOfNameObject.prototype.hasElements=function(){return this.getHardStorage().hasElements();};f.XUnmodSetOfNameObject.prototype.contains=function(e){return this.getHardStorage().contains(e);};f.XUnmodSetOfNameObject.prototype.containsKey=function(k){return this.getHardStorage().containsKey(k);};f.XUnmodSetOfNameObject.prototype.getByKey=function(k){return this.getHardStorage().getByKey(k);};f.XUnmodSetOfNameObject.prototype.getKeysAsReadOnlyListOfString=function(){return this.getHardStorage().getKeysAsReadOnlyListOfString();};f.XUnmodSetOfNameObject.prototype.toString=function(){return this.getHardStorage().toString();};f.XAbstractReadOnlyMap=function(){};f.XAbstractReadOnlyMap.prototype=new f.DfAbstractMapByString();f.XAbstractReadOnlyMap.prototype._ff_c="XAbstractReadOnlyMap";f.XAbstractReadOnlyMap.prototype.m_storage=null;f.XAbstractReadOnlyMap.prototype.setup=function(){this.m_storage=f.XHashMapByString.create();};f.XAbstractReadOnlyMap.prototype.releaseObject=function(){this.m_storage=f.XObjectExt.release(this.m_storage);f.DfAbstractMapByString.prototype.releaseObject.call(this);};f.XAbstractReadOnlyMap.prototype.getByKey=function(k){return this.m_storage.getByKey(k);};f.XAbstractReadOnlyMap.prototype.hasElements=function(){return this.m_storage.hasElements();};f.XAbstractReadOnlyMap.prototype.size=function(){return this.m_storage.size();};f.XAbstractReadOnlyMap.prototype.getValuesAsReadOnlyList=function(){return this.m_storage.getValuesAsReadOnlyList();};f.XAbstractReadOnlyMap.prototype.contains=function(e){return this.m_storage.contains(e);};f.XAbstractReadOnlyMap.prototype.containsKey=function(k){return this.m_storage.containsKey(k);};f.XAbstractReadOnlyMap.prototype.getKeysAsReadOnlyListOfString=function(){return this.m_storage.getKeysAsReadOnlyListOfString();};f.XAbstractReadOnlyMap.prototype.toString=function(){return this.m_storage.toString();};f.XWeakMap=function(){};f.XWeakMap.prototype=new f.DfAbstractMapByString();f.XWeakMap.prototype._ff_c="XWeakMap";f.XWeakMap.create=function(){var h=new f.XWeakMap();h.m_storage=f.XHashMapByString.create();return h;};f.XWeakMap.prototype.m_storage=null;f.XWeakMap.prototype.releaseObject=function(){this.m_storage=f.XObjectExt.release(this.m_storage);f.DfAbstractMapByString.prototype.releaseObject.call(this);};f.XWeakMap.prototype.containsKey=function(k){return this.m_storage.containsKey(k);};f.XWeakMap.prototype.contains=function(e){var v=this.getValuesAsReadOnlyList();return v.contains(e);};f.XWeakMap.prototype.getByKey=function(k){if(f.isNull(k)){return null;}var w=this.m_storage.getByKey(k);var h=f.XWeakReferenceUtil.getHardRef(w);return h;};f.XWeakMap.prototype.remove=function(k){var w=this.m_storage.remove(k);return f.XWeakReferenceUtil.getHardRef(w);};f.XWeakMap.prototype.cloneExt=function(a){return this.createMapByStringCopy();};f.XWeakMap.prototype.createMapByStringCopy=function(){var c=f.XWeakMap.create();var i=this.getKeysAsIteratorOfString();while(i.hasNext()){var n=i.next();c.put(n,this.getByKey(n));}return c;};f.XWeakMap.prototype.getKeysAsReadOnlyListOfString=function(){return this.m_storage.getKeysAsReadOnlyListOfString();};f.XWeakMap.prototype.put=function(k,e){if(f.isNull(k)){throw f.XException.createIllegalArgumentException("Null cannot be key");}this.m_storage.put(k,f.XWeakReferenceUtil.getWeakRef(e));};f.XWeakMap.prototype.getValuesAsReadOnlyList=function(){var l=f.XList.create();var i=this.getKeysAsIteratorOfString();while(i.hasNext()){var n=i.next();var w=this.m_storage.getByKey(n);var h=f.XWeakReferenceUtil.getHardRef(w);l.add(h);}return l;};f.XWeakMap.prototype.hasElements=function(){return this.m_storage.hasElements();};f.XWeakMap.prototype.size=function(){return this.m_storage.size();};f.XWeakMap.prototype.clear=function(){this.m_storage.clear();};f.XWeakMap.prototype.toString=function(){return this.m_storage.toString();};f.XLinkedHashMapByString=function(){};f.XLinkedHashMapByString.prototype=new f.XAbstractReadOnlyMap();f.XLinkedHashMapByString.prototype._ff_c="XLinkedHashMapByString";f.XLinkedHashMapByString.create=function(){var h=new f.XLinkedHashMapByString();h.setup();h.m_order=f.XListOfString.create();return h;};f.XLinkedHashMapByString.prototype.m_order=null;f.XLinkedHashMapByString.prototype.releaseObject=function(){this.m_order=f.XObjectExt.release(this.m_order);f.XAbstractReadOnlyMap.prototype.releaseObject.call(this);};f.XLinkedHashMapByString.prototype.clear=function(){this.m_storage.clear();this.m_order.clear();};f.XLinkedHashMapByString.prototype.remove=function(k){if(f.isNull(k)){return null;}this.m_order.removeElement(k);return this.m_storage.remove(k);};f.XLinkedHashMapByString.prototype.cloneExt=function(a){return this.createMapByStringCopy();};f.XLinkedHashMapByString.prototype.createMapByStringCopy=function(){var c=f.XLinkedHashMapByString.create();for(var i=0;i<this.m_order.size();i++){var n=this.m_order.get(i);c.put(n,this.getByKey(n));}return c;};f.XLinkedHashMapByString.prototype.getKeysAsReadOnlyListOfString=function(){return this.m_order.createListOfStringCopy();};f.XLinkedHashMapByString.prototype.put=function(k,e){if(f.notNull(k)){if(!this.m_storage.containsKey(k)){this.m_order.add(k);}this.m_storage.put(k,e);}};f.XLinkedHashMapByString.prototype.getValuesAsReadOnlyList=function(){var l=f.XList.create();for(var i=0;i<this.m_order.size();i++){l.add(this.m_storage.getByKey(this.m_order.get(i)));}return l;};f.XLinkedHashMapByString.prototype.isEqualTo=function(o){if(f.isNull(o)){return false;}if(this===o){return true;}var a=o;if(this.size()!==a.size()){return false;}var t=this.getKeysAsReadOnlyListOfString();var b=this.getValuesAsReadOnlyList();var c=a.getKeysAsReadOnlyListOfString();var d=a.getValuesAsReadOnlyList();for(var k=0;k<t.size();k++){if(!f.XString.isEqual(t.get(k),c.get(k))){return false;}if(!b.get(k).isEqualTo(d.get(k))){return false;}}return true;};f.XListWeakRef=function(){};f.XListWeakRef.prototype=new f.DfAbstractReadOnlyBinary();f.XListWeakRef.prototype._ff_c="XListWeakRef";f.XListWeakRef.create=function(){var l=new f.XListWeakRef();l.setup();return l;};f.XListWeakRef.prototype.m_list=null;f.XListWeakRef.prototype.setup=function(){this.m_list=f.XList.create();};f.XListWeakRef.prototype.releaseObject=function(){this.m_list=f.XObjectExt.release(this.m_list);f.DfAbstractReadOnlyBinary.prototype.releaseObject.call(this);};f.XListWeakRef.prototype.add=function(e){this.m_list.add(f.XWeakReferenceUtil.getWeakRef(e));};f.XListWeakRef.prototype.addAll=function(o){f.XListUtils.addAllObjects(o,this);};f.XListWeakRef.prototype.insert=function(i,e){this.m_list.insert(i,f.XWeakReferenceUtil.getWeakRef(e));};f.XListWeakRef.prototype.get=function(i){var w=this.m_list.get(i);return f.XWeakReferenceUtil.getHardRef(w);};f.XListWeakRef.prototype.getIndex=function(e){var s=this.size();for(var i=0;i<s;i++){if(this.elementsEqual(this.get(i),e)){return i;}}return-1;};f.XListWeakRef.prototype.removeAt=function(i){if(i<0||i>=this.size()){throw f.XException.createIllegalArgumentException("illegal index");}var w=this.m_list.removeAt(i);return f.XWeakReferenceUtil.getHardRef(w);};f.XListWeakRef.prototype.removeElement=function(e){var s=this.size();for(var i=0;i<s;i++){if(this.elementsEqual(this.get(i),e)){this.m_list.removeAt(i);return e;}}return null;};f.XListWeakRef.prototype.elementsEqual=function(e,a){return f.isNull(e)&&f.isNull(a)||f.notNull(e)&&e.isEqualTo(a);};f.XListWeakRef.prototype.contains=function(e){return this.getIndex(e)!==-1;};f.XListWeakRef.prototype.createListCopy=function(){var t=f.XList.create();var s=this.size();for(var i=0;i<s;i++){t.add(this.get(i));}return t;};f.XListWeakRef.prototype.sublist=function(b,e){var s=f.XMath.max(b,0);var a=e<0?this.size():e;var t=f.XList.create();var c=this.size();for(var i=s;i<c&&i<=a;i++){t.add(this.get(i));}return t;};f.XListWeakRef.prototype.set=function(i,e){this.m_list.set(i,f.XWeakReferenceUtil.getWeakRef(e));};f.XListWeakRef.prototype.getIterator=function(){var c=this.createListCopy();return c.getIterator();};f.XListWeakRef.prototype.getValuesAsReadOnlyList=function(){return this;};f.XListWeakRef.prototype.sortByComparator=f.noSupport;f.XListWeakRef.prototype.sortByDirection=f.noSupport;f.XListWeakRef.prototype.moveElement=function(a,t){this.m_list.moveElement(a,t);};f.XListWeakRef.prototype.createArrayCopy=f.noSupport;f.XListWeakRef.prototype.hasElements=function(){return this.m_list.hasElements();};f.XListWeakRef.prototype.size=function(){return this.m_list.size();};f.XListWeakRef.prototype.clear=function(){this.m_list.clear();};f.XListWeakRef.prototype.toString=function(){return this.m_list.toString();};f.XSetOfNameObject=function(){};f.XSetOfNameObject.prototype=new f.XAbstractReadOnlyMap();f.XSetOfNameObject.prototype._ff_c="XSetOfNameObject";f.XSetOfNameObject.create=function(){var l=new f.XSetOfNameObject();l.setup();return l;};f.XSetOfNameObject.prototype.createSetCopy=function(){var c=f.XSetOfNameObject.create();var i=this.m_storage.getIterator();while(i.hasNext()){c.add(i.next());}return c;};f.XSetOfNameObject.prototype.cloneExt=function(a){var c=f.XSetOfNameObject.create();f.XCollectionUtils.addAllClones(c,this.m_storage);return c;};f.XSetOfNameObject.prototype.add=function(e){this.m_storage.put(e.getName(),e);};f.XSetOfNameObject.prototype.removeElement=function(e){this.m_storage.remove(e.getName());return e;};f.XSetOfNameObject.prototype.addAll=function(o){f.XListUtils.addAllObjects(o,this);};f.XSetOfNameObject.prototype.unmodifiableSetOfNameObject=function(){return f.XUnmodSetOfNameObject.create(this);};f.XSetOfNameObject.prototype.clear=function(){this.m_storage.clear();};f.XSetOfNameObject.prototype.put=function(k,e){this.m_storage.put(k,e);};f.XSetOfNameObject.prototype.createMapByStringCopy=function(){return this.m_storage.createMapByStringCopy();};f.XSetOfNameObject.prototype.remove=function(k){return this.m_storage.remove(k);};f.XAbstractList=function(){};f.XAbstractList.prototype=new f.DfAbstractList();f.XAbstractList.prototype._ff_c="XAbstractList";f.XAbstractList.prototype.m_list=null;f.XAbstractList.prototype.releaseObject=function(){this.m_list=f.XObjectExt.release(this.m_list);f.DfAbstractList.prototype.releaseObject.call(this);};f.XAbstractList.prototype.hasElements=function(){return this.m_list.hasElements();};f.XAbstractList.prototype.size=function(){return this.m_list.size();};f.XAbstractList.prototype.clear=function(){this.m_list.clear();};f.XAbstractList.prototype.getValuesAsReadOnlyList=function(){return this.m_list.getValuesAsReadOnlyList();};f.XAbstractList.prototype.getIterator=function(){return this.m_list.getIterator();};f.XAbstractList.prototype.getIndex=function(e){return this.m_list.getIndex(e);};f.XAbstractList.prototype.get=function(i){return this.m_list.get(i);};f.XAbstractList.prototype.moveElement=function(a,t){this.m_list.moveElement(a,t);};f.XAbstractList.prototype.sortByComparator=function(c){this.m_list.sortByComparator(c);};f.XAbstractList.prototype.sortByDirection=function(s){this.m_list.sortByDirection(s);};f.XAbstractList.prototype.createListCopy=function(){return this.m_list.createListCopy();};f.XAbstractList.prototype.sublist=function(b,e){return this.m_list.sublist(b,e);};f.XAbstractList.prototype.createArrayCopy=function(){return this.m_list.createArrayCopy();};f.XAbstractList.prototype.insert=function(i,e){this.m_list.insert(i,e);};f.XAbstractList.prototype.removeAt=function(i){return this.m_list.removeAt(i);};f.XAbstractList.prototype.addAll=function(o){this.m_list.addAll(o);};f.XAbstractList.prototype.add=function(e){this.m_list.add(e);};f.XAbstractList.prototype.removeElement=function(e){return this.m_list.removeElement(e);};f.XAbstractList.prototype.set=function(i,e){this.m_list.set(i,e);};f.XAbstractList.prototype.toString=function(){return this.m_list.toString();};f.XListOfNameObject=function(){};f.XListOfNameObject.prototype=new f.XAbstractList();f.XListOfNameObject.prototype._ff_c="XListOfNameObject";f.XListOfNameObject.create=function(){var l=new f.XListOfNameObject();l.setup();return l;};f.XListOfNameObject._getName=function(e){return f.isNull(e)?null:e.getName();};f.XListOfNameObject.prototype.m_map=null;f.XListOfNameObject.prototype.setup=function(){this.m_map=f.XWeakMap.create();this.m_list=f.XList.create();};f.XListOfNameObject.prototype.releaseObject=function(){this.m_map=f.XObjectExt.release(this.m_map);f.XAbstractList.prototype.releaseObject.call(this);};f.XListOfNameObject.prototype.containsKey=function(k){return this.m_map.containsKey(k);};f.XListOfNameObject.prototype.getByKey=function(k){return this.m_map.getByKey(k);};f.XListOfNameObject.prototype.getKeysAsReadOnlyListOfString=function(){var r=f.XListOfString.create();var s=this.m_list.size();for(var i=0;i<s;i++){var n=this.m_list.get(i).getName();if(f.notNull(n)){r.add(n);}}return r;};f.XListOfNameObject.prototype.getKeysAsIteratorOfString=function(){return this.m_map.getKeysAsIteratorOfString();};f.XListOfNameObject.prototype._putNameNotNull=function(e){var n=e.getName();if(f.notNull(n)){this.m_map.put(n,e);}};f.XListOfNameObject.prototype._removeNameNotNull=function(e){var n=e.getName();if(f.notNull(n)){this.m_map.remove(n);}};f.XListOfNameObject.prototype.add=function(e){if(f.notNull(e)){this.m_list.add(e);this._putNameNotNull(e);}};f.XListOfNameObject.prototype.addAll=function(o){f.XListUtils.addAllObjects(o,this);};f.XListOfNameObject.prototype.insert=function(i,e){if(f.notNull(e)){this.m_list.insert(i,e);this._putNameNotNull(e);}};f.XListOfNameObject.prototype.set=function(i,e){if(f.notNull(e)){this.m_list.set(i,e);this._putNameNotNull(e);}};f.XListOfNameObject.prototype.removeAt=function(i){var o=this.m_list.removeAt(i);this._removeNameNotNull(o);return o;};f.XListOfNameObject.prototype.removeElement=function(e){if(f.notNull(e)){this.m_list.removeElement(e);this._removeNameNotNull(e);}return e;};f.XListOfNameObject.prototype.clear=function(){f.XAbstractList.prototype.clear.call(this);this.m_map.clear();};f.XListOfNameObject.prototype._getIndexByName=function(n){if(this.m_map.containsKey(n)){return f.XCollectionUtils.getIndexByName(this.m_list,n);}return-1;};f.XLookupListOfNameObject=function(){};f.XLookupListOfNameObject.prototype=new f.XAbstractList();f.XLookupListOfNameObject.prototype._ff_c="XLookupListOfNameObject";f.XLookupListOfNameObject.create=function(){var l=new f.XLookupListOfNameObject();l.setup();return l;};f.XLookupListOfNameObject.prototype.setup=function(){this.m_list=f.XList.create();};f.XLookupListOfNameObject.prototype.containsKey=function(k){return this.getByKey(k)!==null;};f.XLookupListOfNameObject.prototype.getByKey=function(k){return f.XCollectionUtils.getByName(this,k);};f.XLookupListOfNameObject.prototype.getKeysAsIteratorOfString=function(){return this.getKeysAsReadOnlyListOfString().getIterator();};f.XLookupListOfNameObject.prototype.getKeysAsReadOnlyListOfString=function(){var k=f.XListOfString.create();var s=this.size();for(var i=0;i<s;i++){var c=this.get(i);if(f.notNull(c)){k.add(c.getName());}}return k;};f.XLinkedMap=function(){};f.XLinkedMap.prototype=new f.XListOfNameObject();f.XLinkedMap.prototype._ff_c="XLinkedMap";f.XLinkedMap.createLinkedMap=function(){var l=new f.XLinkedMap();l.setup();return l;};f.XLinkedMap.prototype.add=function(e){var n=f.DfNameObject.getSafeName(e);if(f.notNull(n)){var o=this._getIndexByName(n);if(o!==-1){this.m_list.removeAt(o);}this.m_list.add(e);this.m_map.put(n,e);}};f.XLinkedMap.prototype.insert=function(i,e){var n=f.DfNameObject.getSafeName(e);if(f.notNull(n)){var o=this._getIndexByName(n);if(o!==-1){this.m_list.removeAt(o);}var l=this.m_list.size();if(i>=l&&o!==-1){this.m_list.insert(l,e);}else{this.m_list.insert(i,e);}this.m_map.put(n,e);}};f.XLinkedMap.prototype.set=function(i,e){var n=f.DfNameObject.getSafeName(e);if(f.notNull(n)){var o=this._getIndexByName(n);this.m_list.set(i,e);if(o!==-1&&o!==i){this.m_list.removeAt(o);}this.m_map.put(n,e);}};f.XLinkedMap.prototype._getIndexByName=function(n){if(this.m_map.containsKey(n)){return f.XCollectionUtils.getIndexByName(this.m_list,n);}return-1;};f.CoreExtModule=function(){};f.CoreExtModule.prototype=new f.DfModule();f.CoreExtModule.prototype._ff_c="CoreExtModule";f.CoreExtModule.s_module=null;f.CoreExtModule.getInstance=function(){if(f.isNull(f.CoreExtModule.s_module)){f.DfModule.checkInitialized(f.CoreModule.getInstance());f.DfModule.checkInitialized(f.PlatformModule.getInstance());f.CoreExtModule.s_module=f.DfModule.startExt(new f.CoreExtModule());f.DfModule.stopExt(f.CoreExtModule.s_module);}return f.CoreExtModule.s_module;};f.CoreExtModule.prototype.getName=function(){return"ff0030.core.ext";};f.CoreExtModule.getInstance();return sap.firefly;});
