(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{220:function(t,n,e){var r=e(21);t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},221:function(t,n,e){"use strict";var strong=e(222),r=e(220);t.exports=e(223)("Map",(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var n=strong.getEntry(r(this,"Map"),t);return n&&n.v},set:function(t,n){return strong.def(r(this,"Map"),0===t?0:t,n)}},strong,!0)},222:function(t,n,e){"use strict";var r=e(28).f,o=e(73),c=e(147),l=e(50),f=e(145),d=e(146),v=e(105),h=e(148),_=e(106),y=e(22),w=e(103).fastKey,m=e(220),j=y?"_s":"size",k=function(t,n){var e,r=w(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,v){var h=t((function(t,r){f(t,h,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[j]=0,null!=r&&d(r,e,t[v],t)}));return c(h.prototype,{clear:function(){for(var t=m(this,n),data=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete data[e.i];t._f=t._l=void 0,t[j]=0},delete:function(t){var e=m(this,n),r=k(e,t);if(r){var o=r.n,c=r.p;delete e._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),e._f==r&&(e._f=o),e._l==r&&(e._l=c),e[j]--}return!!r},forEach:function(t){m(this,n);for(var e,r=l(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(r(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!k(m(this,n),t)}}),y&&r(h.prototype,"size",{get:function(){return m(this,n)[j]}}),h},def:function(t,n,e){var r,o,c=k(t,n);return c?c.v=e:(t._l=c={i:o=w(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[j]++,"F"!==o&&(t._i[o]=c)),t},getEntry:k,setStrong:function(t,n,e){v(t,n,(function(t,e){this._t=m(t,n),this._k=e,this._l=void 0}),(function(){for(var t=this._k,n=this._l;n&&n.r;)n=n.p;return this._t&&(this._l=n=n?n.n:this._t._f)?h(0,"keys"==t?n.k:"values"==t?n.v:[n.k,n.v]):(this._t=void 0,h(1))}),e?"entries":"values",!e,!0),_(n)}}},223:function(t,n,e){"use strict";var r=e(12),o=e(7),c=e(29),l=e(147),meta=e(103),f=e(146),d=e(145),v=e(21),h=e(23),_=e(104),y=e(72),w=e(107);t.exports=function(t,n,e,m,j,k){var O=r[t],x=O,S=j?"set":"add",C=x&&x.prototype,D={},E=function(t){var n=C[t];c(C,t,"delete"==t||"has"==t?function(a){return!(k&&!v(a))&&n.call(this,0===a?0:a)}:"get"==t?function(a){return k&&!v(a)?void 0:n.call(this,0===a?0:a)}:"add"==t?function(a){return n.call(this,0===a?0:a),this}:function(a,b){return n.call(this,0===a?0:a,b),this})};if("function"==typeof x&&(k||C.forEach&&!h((function(){(new x).entries().next()})))){var B=new x,L=B[S](k?{}:-0,1)!=B,M=h((function(){B.has(1)})),N=_((function(t){new x(t)})),F=!k&&h((function(){for(var t=new x,n=5;n--;)t[S](n,n);return!t.has(-0)}));N||((x=n((function(n,e){d(n,x,t);var r=w(new O,n,x);return null!=e&&f(e,j,r[S],r),r}))).prototype=C,C.constructor=x),(M||F)&&(E("delete"),E("has"),j&&E("get")),(F||L)&&E(S),k&&C.clear&&delete C.clear}else x=m.getConstructor(n,t,j,S),l(x.prototype,e),meta.NEED=!0;return y(x,t),D[t]=x,o(o.G+o.W+o.F*(x!=O),D),k||m.setStrong(x,t,j),x}},224:function(t,n,e){"use strict";e(108);var r=e(75);n.a=Object(r.a)("layout")},225:function(t,n,e){"use strict";e(27),e(13);var r=e(3),o=(e(37),e(221),e(38),e(6),e(4),e(16),e(54),e(55),e(149),e(1)),c=e(109),l=e(2);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var v=["sm","md","lg","xl"],h=["start","end","center"];function _(t,n){return v.reduce((function(e,r){return e[t+Object(l.n)(r)]=n(),e}),{})}var y=function(t){return[].concat(h,["baseline","stretch"]).includes(t)},w=_("align",(function(){return{type:String,default:null,validator:y}})),m=function(t){return[].concat(h,["space-between","space-around"]).includes(t)},j=_("justify",(function(){return{type:String,default:null,validator:m}})),k=function(t){return[].concat(h,["space-between","space-around","stretch"]).includes(t)},O=_("alignContent",(function(){return{type:String,default:null,validator:k}})),x={align:Object.keys(w),justify:Object.keys(j),alignContent:Object.keys(O)},S={align:"align",justify:"justify",alignContent:"align-content"};function C(t,n,e){var r=S[t];if(null!=e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return(r+="-".concat(e)).toLowerCase()}}var D=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:y}},w),{},{justify:{type:String,default:null,validator:m}},j),{},{alignContent:{type:String,default:null,validator:k}},O),render:function(t,n){var e=n.props,data=n.data,o=n.children,l="";for(var f in e)l+=String(e[f]);var d=D.get(l);return d||function(){var t,n;for(n in d=[],x)x[n].forEach((function(t){var r=e[t],o=C(n,t,r);o&&d.push(o)}));d.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(r.a)(t,"align-".concat(e.align),e.align),Object(r.a)(t,"justify-".concat(e.justify),e.justify),Object(r.a)(t,"align-content-".concat(e.alignContent),e.alignContent),t)),D.set(l,d)}(),t(e.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},245:function(t,n,e){"use strict";e.r(n);var r={data:function(){return{}},head:{title:"Big Data - MarceloFern",meta:[{hid:"description",name:"description",content:"Big Data - Marcelo Fernandes"}]}},o=e(56),c=e(74),l=e.n(c),f=e(217),d=e(224),v=e(225),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-layout",{staticClass:"post"},[e("v-flex",[e("v-row",[e("h1",[t._v("Big Data")])]),t._v(" "),e("v-row",[e("blockquote",[t._v('\n        As a scientist, it is disappointing to me that the bulk of Big\n        Data, today, is focused on issues of marketing and predictive\n        analytics (e.g., "Who is likely to buy product x, given that\n        they bought product y two weeks previously?"); and machine\n        learning (e.g., driverless cars, computer vision, speech\n        recognition). Machine learning relies heavily on hyped up\n        techniques such as neural networks and deep learning; neither\n        of which are leading to fundamental laws and principles that\n        simplify and broaden our understanding of the natural world and\n        the physical universe. For the most part, these techniques use\n        data that is relatively new, poorly annotated, and not deposited for\n        public evaluation or for re-use. In short, Big Data has followed\n        the path of least resistance, avoiding most of the tough issues.\n      ')])]),t._v(" "),e("v-row",[e("p",[t._v("2018, Jules J. Berman")])]),t._v(" "),e("v-row",[e("ul",[e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/core-concepts"}},[t._v("\n            Core Concepts\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/map-reduce"}},[t._v("\n            Map Reduce\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/hadoop-hdfs"}},[t._v("\n            Hadoop - HDFS\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/apache-hive"}},[t._v("\n            Apache Hive\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/apache-spark"}},[t._v("\n            Apache Spark\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/sampling"}},[t._v("\n            Random Sampling\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/monte-carlo"}},[t._v("\n            Monte Carlo Simulation\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/burrows-wheeler-transform"}},[t._v("\n            BWT (Burrows wheeler transform)\n          ")])],1)])])],1)],1)}),[],!1,null,"5602b5e5",null);n.default=component.exports;l()(component,{VFlex:f.a,VLayout:d.a,VRow:v.a})}}]);