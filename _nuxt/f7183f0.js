(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{235:function(t,n,e){var r=e(21);t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},236:function(t,n,e){"use strict";var strong=e(237),r=e(235),o="Map";t.exports=e(238)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var n=strong.getEntry(r(this,o),t);return n&&n.v},set:function(t,n){return strong.def(r(this,o),0===t?0:t,n)}},strong,!0)},237:function(t,n,e){"use strict";var r=e(27).f,o=e(77),c=e(163),l=e(55),f=e(161),d=e(162),v=e(118),h=e(164),_=e(119),y=e(24),w=e(115).fastKey,m=e(235),j=y?"_s":"size",k=function(t,n){var e,r=w(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,v){var h=t((function(t,r){f(t,h,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[j]=0,null!=r&&d(r,e,t[v],t)}));return c(h.prototype,{clear:function(){for(var t=m(this,n),data=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete data[e.i];t._f=t._l=void 0,t[j]=0},delete:function(t){var e=m(this,n),r=k(e,t);if(r){var o=r.n,c=r.p;delete e._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),e._f==r&&(e._f=o),e._l==r&&(e._l=c),e[j]--}return!!r},forEach:function(t){m(this,n);for(var e,r=l(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(r(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!k(m(this,n),t)}}),y&&r(h.prototype,"size",{get:function(){return m(this,n)[j]}}),h},def:function(t,n,e){var r,o,c=k(t,n);return c?c.v=e:(t._l=c={i:o=w(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[j]++,"F"!==o&&(t._i[o]=c)),t},getEntry:k,setStrong:function(t,n,e){v(t,n,(function(t,e){this._t=m(t,n),this._k=e,this._l=void 0}),(function(){for(var t=this,n=t._k,e=t._l;e&&e.r;)e=e.p;return t._t&&(t._l=e=e?e.n:t._t._f)?h(0,"keys"==n?e.k:"values"==n?e.v:[e.k,e.v]):(t._t=void 0,h(1))}),e?"entries":"values",!e,!0),_(n)}}},238:function(t,n,e){"use strict";var r=e(12),o=e(4),c=e(29),l=e(163),meta=e(115),f=e(162),d=e(161),v=e(21),h=e(16),_=e(117),y=e(76),w=e(120);t.exports=function(t,n,e,m,j,k){var O=r[t],x=O,S=j?"set":"add",C=x&&x.prototype,B={},D=function(t){var n=C[t];c(C,t,"delete"==t||"has"==t?function(a){return!(k&&!v(a))&&n.call(this,0===a?0:a)}:"get"==t?function(a){return k&&!v(a)?void 0:n.call(this,0===a?0:a)}:"add"==t?function(a){return n.call(this,0===a?0:a),this}:function(a,b){return n.call(this,0===a?0:a,b),this})};if("function"==typeof x&&(k||C.forEach&&!h((function(){(new x).entries().next()})))){var E=new x,L=E[S](k?{}:-0,1)!=E,N=h((function(){E.has(1)})),P=_((function(t){new x(t)})),F=!k&&h((function(){for(var t=new x,n=5;n--;)t[S](n,n);return!t.has(-0)}));P||((x=n((function(n,e){d(n,x,t);var r=w(new O,n,x);return null!=e&&f(e,j,r[S],r),r}))).prototype=C,C.constructor=x),(N||F)&&(D("delete"),D("has"),j&&D("get")),(F||L)&&D(S),k&&C.clear&&delete C.clear}else x=m.getConstructor(n,t,j,S),l(x.prototype,e),meta.NEED=!0;return y(x,t),B[t]=x,o(o.G+o.W+o.F*(x!=O),B),k||m.setStrong(x,t,j),x}},239:function(t,n,e){"use strict";e(121);var r=e(78);n.a=Object(r.a)("layout")},240:function(t,n,e){"use strict";var r=e(3),o=(e(54),e(53),e(11),e(40),e(236),e(39),e(14),e(34),e(10),e(13),e(22),e(23),e(165),e(1)),c=e(116),l=e(2);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var v=["sm","md","lg","xl"],h=["start","end","center"];function _(t,n){return v.reduce((function(e,r){return e[t+Object(l.B)(r)]=n(),e}),{})}var y=function(t){return[].concat(h,["baseline","stretch"]).includes(t)},w=_("align",(function(){return{type:String,default:null,validator:y}})),m=function(t){return[].concat(h,["space-between","space-around"]).includes(t)},j=_("justify",(function(){return{type:String,default:null,validator:m}})),k=function(t){return[].concat(h,["space-between","space-around","stretch"]).includes(t)},O=_("alignContent",(function(){return{type:String,default:null,validator:k}})),x={align:Object.keys(w),justify:Object.keys(j),alignContent:Object.keys(O)},S={align:"align",justify:"justify",alignContent:"align-content"};function C(t,n,e){var r=S[t];if(null!=e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return(r+="-".concat(e)).toLowerCase()}}var B=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:y}},w),{},{justify:{type:String,default:null,validator:m}},j),{},{alignContent:{type:String,default:null,validator:k}},O),render:function(t,n){var e=n.props,data=n.data,o=n.children,l="";for(var f in e)l+=String(e[f]);var d=B.get(l);return d||function(){var t,n;for(n in d=[],x)x[n].forEach((function(t){var r=e[t],o=C(n,t,r);o&&d.push(o)}));d.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(r.a)(t,"align-".concat(e.align),e.align),Object(r.a)(t,"justify-".concat(e.justify),e.justify),Object(r.a)(t,"align-content-".concat(e.alignContent),e.alignContent),t)),B.set(l,d)}(),t(e.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},356:function(t,n,e){"use strict";e.r(n);var r={data:function(){return{}},head:{title:"Big Data",meta:[{hid:"description",name:"description",content:"Big Data - Marcelo Fernandes"}]}},o=e(58),c=e(75),l=e.n(c),f=e(232),d=e(239),v=e(240),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-layout",{staticClass:"post"},[e("v-flex",[e("v-row",[e("h1",[t._v("Big Data")])]),t._v(" "),e("v-row",[e("blockquote",[t._v('\n        As a scientist, it is disappointing to me that the bulk of Big\n        Data, today, is focused on issues of marketing and predictive\n        analytics (e.g., "Who is likely to buy product x, given that\n        they bought product y two weeks previously?"); and machine\n        learning (e.g., driverless cars, computer vision, speech\n        recognition). Machine learning relies heavily on hyped up\n        techniques such as neural networks and deep learning; neither\n        of which are leading to fundamental laws and principles that\n        simplify and broaden our understanding of the natural world and\n        the physical universe. For the most part, these techniques use\n        data that is relatively new, poorly annotated, and not deposited for\n        public evaluation or for re-use. In short, Big Data has followed\n        the path of least resistance, avoiding most of the tough issues.\n      ')])]),t._v(" "),e("v-row",[e("p",[t._v("2018, Jules J. Berman"),e("br"),e("br")])]),t._v(" "),e("v-row",[e("ul",[e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/core-concepts"}},[t._v("\n            Core Concepts\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/map-reduce"}},[t._v("\n            Map Reduce\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/hadoop-hdfs"}},[t._v("\n            Hadoop - HDFS\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/apache-hive"}},[t._v("\n            Apache Hive\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/apache-spark"}},[t._v("\n            Apache Spark\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/sampling"}},[t._v("\n            Random Sampling\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/monte-carlo"}},[t._v("\n            Monte Carlo Simulation\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"/academia/big-data/burrows-wheeler-transform"}},[t._v("\n            BWT (Burrows wheeler transform)\n          ")])],1)])])],1)],1)}),[],!1,null,"1922c31e",null);n.default=component.exports;l()(component,{VFlex:f.a,VLayout:d.a,VRow:v.a})}}]);