(function(){var q={Version:"7.1.5044.21402"};window.cfx.overlaybubble=q;var m=window.cfx,f=window.sfx,n=function r(){r._ic();this.b=0;this.a=null};n.prototype={_0dM:function(){return this}};n._dt("CWGS",f.Sy,0);var o=function c(){c._ic();this.a=this.h=null;this.f=0;this.b=null;this.k=!1;this.j=0;this.d=null;this._0OverlayBubble()};q.OverlayBubble=o;o.prototype={_0OverlayBubble:function(){this.g=new f.f;this.e=new f.d;this.i=1;this.c=2;return this},getHorizontalAlignment:function(){return this.i},
setHorizontalAlignment:function(c){this.i=c},iee:function(){return this.h.iee()},ied:function(){return!1},ief:function(){return!0},getVerticalAlignment:function(){return this.c},setVerticalAlignment:function(c){this.c=c},n:function(c,b){var a=null;null!=c.b.a.c?a=this.a.expandMacros(c.b.a.c,c.d,c.e,!0):(a=this.a.getAxisY(),a=a.getDataFormat().a(b/a.q));return a},m:function(c,b,a){b/=a;c.P&&(b*=c.aU);a=c=0;b*=this.f;a=b/2;switch(this.i){case 0:c=this.e.x;break;case 2:c=this.e.g()-b;break;default:c=
this.g.x-a}switch(this.c){case 0:a=this.e.y;break;case 2:a=this.e.c()-b;break;default:a=this.g.y-a}return(new f.d)._02d(c,a,b,b)},iei:function(){return this.a.r.iaH()},reset:function(){},icV:function(){return 1},ic1:function(){this.k=!0;var c=this.a.r,b=c.iaM();this.d=Array(b);for(var a=c.iaH(),d=0;d<b;d++){var g=(new n)._0dM();this.d[d]=g;for(var i=Array(a),e=0;e<a;e++){var j=c.getItem(d,e),h=(new l)._0dO();i[e]=h;h.b=e;1.0E108!=j&&(h.a=j)}f.E.f(i,(new p)._0dN());g.a=i;g.b=i[0].a}return!0},icW:function(){return 8193},
_iCommands:function(){return!1},icp:function(c){this.a=f.V.D(c,m.Chart);this.h=this.a.getAxisX();this.a.getLegendBox().getItemAttributes().getItemList(this.a.getAxisX()).setVisible(!1);return!0},iej:function(){return!1},ieg:function(){},overrideWizardValidation:function(){},icq:function(){return null},ic0:function(){return!0},getHighlightArgs:function(c,b,a){return this.h.getHighlightArgs(c,b,a)},ic2:function(){return!1},icX:function(c,b,a){this.k||this.ic1(b);var b=a.v._nc(),d=this.d[a.d],g=d.b,
i=!1;if(a.b.a.b){a.e=d.a[0].b;var e=this.n(a,g),e=a.c.idV(e,a.ah);b.w-=e.w+12;a.P?a.b.a.b=!1:(i=!0,this.b=(new m.cE)._01cE(a.b.a.a._nc(),0,0))}this.g._i1(f.u.z(b.x+b.g(),2),f.u.z(b.y+b.c(),2));this.f=f.a.o(b.w,b.h);this.j=this.f/2;this.e._i2(this.g.x-this.j,this.g.y-this.j,this.f,this.f);e=new f.d;d=d.a;c.b=1;c.a=0;for(var j=d.length,h=0;h<j;h++){var k=h;a.m_bDetecting&&(k=j-h-1);var k=d[k],l=k.a;a.e=k.b;a.aw();a.ao(a.d,a.e,!1);a.N(!0);a.ax(a.d,a.e);e._cf(this.m(a,l,g));a.c.idK(a.x,e.x,e.y,e.w,e.h);
a.c.idi(a.n,e.x,e.y,e.w,e.h);if(a.m_bDetecting&&a.detectCheck()){c.b=0;break}i&&this.p(a,h,l,e,b);a.an(0,0)}null!=this.b&&(this.b._d(),this.b=null)},icZ:function(){},icU:function(c,b,a){switch(b){case 11:return this.o(a)}return null},ieh:function(c,b){b.m=0;b.o=b.a.m-1;b.A=1;b.e=b.m-b.A},ic3:function(){return!1},iek:function(c,b,a,d,g){var i=new f._p1(c.a),b=this.h.iek(i,b,a,d._nc(),g);c.a=i.a;return b},iel:function(c,b){var a=b.e,d=this.d[0].a[a+1].b;b.e=d;b.ao(-1,d,!1);b.bg(d);b.N(!1);b.b.d=1;var g=
this.h.iee();c.b=g.Se()>d?g.id_(d):f.b.j(null,"Value {0}",d+1);c.a=null;c.d=d;c.c=null;b.e=a+1;return!0},p:function(c,b,a,d,g){var i=c.b.a._nc();if(i.b&&1.0E108!=a&&(a=this.n(c,a),null!=a)){var e=c.c.idV(a,c.ah),j=e.h/2,h=new f.e;h.x=g.g()+12;var g=f.D.d,k=this.d[c.d];b<k.a.length-1&&(g=k.a[b+1].a);f.D.g(g)?h.y=(d.y+d.c()-e.h)/2:(b=this.m(c,g,k.b),h.y=0==this.c?(d.c()+b.c()-e.h)/2:(d.y+b.y-e.h)/2);b=f.a.j(h.y+j);e=(new f.ao)._01ao(i.a);null!=this.b?c.a6(this.b,a,h._nc()):(i=(new f.ar)._0ar(i.a),j=
(new f.at)._0at(),c.c.idE(a,c.ah,i,h.x,h.y,j),i._d(),j._d());c.c.idr(e,(d.x+d.g())/2,b,h.x-4,b);e._d()}},o:function(c){c=c.a;0==c.b&&(c.b=17);return null}};o._dt("CWGO",f.Sy,0,m.ico,m.icT,m.icY,m.iec,m.i_n);var p=function b(){b._ic()};p.prototype={_0dN:function(){return this},SF:function(b,a){var d=f.V.D(b,l),g=f.V.D(a,l);return d.a==g.a?0:d.a>g.a?-1:1}};p._dt("CWGO",f.Sy,0,f.SE);var l=function a(){a._ic();this.a=this.b=0};l.prototype={_0dO:function(){return this}};l._dt("CWGO",f.Sy,0)})();
