VBI.QuadTree=
function(m,b,r){"use strict";var L=0,R=1,c=2,d=3,O=4;var q=function(e,f,m,b){var g=[];var i=[];return{quc:function(r,a){var t;for(var n=0,l=i.length;n<l;++n){t=i[n];if(t[0]>r[2]||t[2]<r[0]||t[1]>r[3]||t[3]<r[1]){continue;}a(t);}if(g.length){this.calcIntersectingNodes(r,a);}},qua:function(r,a){this.quc(r,function(h){a.push(h);});},calcIntersectingNodes:function(r,a){var l=e[0],t=e[1],w=(e[2]-l)/2.0,h=(e[3]-t)/2.0;if(r[0]<l+w){if(r[1]<t+h){g[L].quc(r,a);}if(r[3]>=t+h){g[c].quc(r,a);}}if(r[2]>=l+w){if(r[1]<t+h){g[R].quc(r,a);}if(r[3]>=t+h){g[d].quc(r,a);}}},calcQuadrant:function(r){var l,t,w=((e[2]-(l=e[0]))/2.0),h=((e[3]-(t=e[1]))/2.0);if(r[2]<l+w){if(r[3]<t+h){return L;}if(r[1]>=t+h){return c;}return O;}if(r[0]>=l+w){if(r[3]<t+h){return R;}if(r[1]>=t+h){return d;}return O;}return O;},subdivide:function(){var a=e[0];var h=e[1];var w=((e[2]-a)/2.0),j=((e[3]-h)/2.0);var k=++this.m_D;var l,t;g[L]=q([l=a,t=h,l+w,t+j],k,m,b);g[R]=q([l=a+w,t=h,l+w,t+j],k,m,b);g[c]=q([l=a,t=h+j,l+w,t+j],k,m,b);g[d]=q([l=a+w,t=h+j,l+w,t+j],k,m,b);var n=i;i=[];for(var o=0,p=n.length;o<p;++o){this.insert(n[o]);}},insert:function(r){var a;if(g.length){if((a=this.calcQuadrant(r))==O){i.push(r);}else{g[a].insert(r);}}else{i.push(r);if(i.length>m&&this.m_D<b){this.subdivide();}}},clear:function(){for(var n=0,l=g.length;n<l;++n){g[n].clear();}i.length=0;g.length=0;},getNodes:function(){return g.length?g:null;},m_R:e,m_D:f};};return{insertArray:function(i){for(var n=0,l=i.length;n<l;++n){this.m_Root.insert(i[n]);}},insert:function(r){this.m_Root.insert(r);},queryArray:function(r,a){return this.m_Root.qua(r,a);},queryCallback:function(r,a){return this.m_Root.quc(r,a);},clear:function(){this.m_Root.clear();},m_Root:(function(){return q(r,0,m,b);})()};}
;
