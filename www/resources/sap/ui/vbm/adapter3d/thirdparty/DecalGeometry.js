
THREE.DecalGeometry=function(m,a,o,b){THREE.BufferGeometry.call(this);var c=[];var n=[];var u=[];var d=new THREE.Vector3();var e=new THREE.Matrix4();e.makeRotationFromEuler(o);e.setPosition(a);var f=new THREE.Matrix4().getInverse(e);g();this.setAttribute('position',new THREE.Float32BufferAttribute(c,3));this.setAttribute('normal',new THREE.Float32BufferAttribute(n,3));this.setAttribute('uv',new THREE.Float32BufferAttribute(u,2));function g(){var i;var l=new THREE.BufferGeometry();var p=[];var v=new THREE.Vector3();var q=new THREE.Vector3();if(m.geometry.isGeometry){l.fromGeometry(m.geometry);}else{l.copy(m.geometry);}var r=l.attributes.position;var s=l.attributes.normal;if(l.index!==null){var t=l.index;for(i=0;i<t.count;i++){v.fromBufferAttribute(r,t.getX(i));q.fromBufferAttribute(s,t.getX(i));h(p,v,q);}}else{for(i=0;i<r.count;i++){v.fromBufferAttribute(r,i);q.fromBufferAttribute(s,i);h(p,v,q);}}if(m.matrixWorld.determinant()<0){for(i=0;i<p.length;i+=3){var w=p[i];p[i+0]=p[i+2];p[i+2]=w;}}p=j(p,d.set(1,0,0));p=j(p,d.set(-1,0,0));p=j(p,d.set(0,1,0));p=j(p,d.set(0,-1,0));p=j(p,d.set(0,0,1));p=j(p,d.set(0,0,-1));for(i=0;i<p.length;i++){var x=p[i];u.push(0.5+(x.position.x/b.x),0.5+(x.position.y/b.y));x.position.applyMatrix4(e);c.push(x.position.x,x.position.y,x.position.z);n.push(x.normal.x,x.normal.y,x.normal.z);}}function h(i,v,l){v.applyMatrix4(m.matrixWorld);v.applyMatrix4(f);l.transformDirection(m.matrixWorld);i.push(new THREE.DecalVertex(v.clone(),l.clone()));}function j(l,d){var p=[];var s=0.5*Math.abs(b.dot(d));for(var i=0;i<l.length;i+=3){var v,q,r,t=0;var w,x,y,z;var A=l[i+0].position.dot(d)-s;var B=l[i+1].position.dot(d)-s;var C=l[i+2].position.dot(d)-s;v=A>0;q=B>0;r=C>0;t=(v?1:0)+(q?1:0)+(r?1:0);switch(t){case 0:{p.push(l[i]);p.push(l[i+1]);p.push(l[i+2]);break;}case 1:{if(v){w=l[i+1];x=l[i+2];y=k(l[i],w,d,s);z=k(l[i],x,d,s);}if(q){w=l[i];x=l[i+2];y=k(l[i+1],w,d,s);z=k(l[i+1],x,d,s);p.push(y);p.push(x.clone());p.push(w.clone());p.push(x.clone());p.push(y.clone());p.push(z);break;}if(r){w=l[i];x=l[i+1];y=k(l[i+2],w,d,s);z=k(l[i+2],x,d,s);}p.push(w.clone());p.push(x.clone());p.push(y);p.push(z);p.push(y.clone());p.push(x.clone());break;}case 2:{if(!v){w=l[i].clone();x=k(w,l[i+1],d,s);y=k(w,l[i+2],d,s);p.push(w);p.push(x);p.push(y);}if(!q){w=l[i+1].clone();x=k(w,l[i+2],d,s);y=k(w,l[i],d,s);p.push(w);p.push(x);p.push(y);}if(!r){w=l[i+2].clone();x=k(w,l[i],d,s);y=k(w,l[i+1],d,s);p.push(w);p.push(x);p.push(y);}break;}case 3:{break;}}}return p;}function k(i,l,p,s){var q=i.position.dot(p)-s;var r=l.position.dot(p)-s;var t=q/(q-r);var v=new THREE.DecalVertex(new THREE.Vector3(i.position.x+t*(l.position.x-i.position.x),i.position.y+t*(l.position.y-i.position.y),i.position.z+t*(l.position.z-i.position.z)),new THREE.Vector3(i.normal.x+t*(l.normal.x-i.normal.x),i.normal.y+t*(l.normal.y-i.normal.y),i.normal.z+t*(l.normal.z-i.normal.z)));return v;}};
THREE.DecalGeometry.prototype=Object.create(THREE.BufferGeometry.prototype);THREE.DecalGeometry.prototype.constructor=THREE.DecalGeometry;
THREE.DecalVertex=function(p,n){this.position=p;this.normal=n;};
THREE.DecalVertex.prototype.clone=function(){return new this.constructor(this.position.clone(),this.normal.clone());};
