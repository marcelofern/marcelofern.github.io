(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{235:function(t,n,e){var r=e(21);t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},236:function(t,n,e){"use strict";var strong=e(237),r=e(235),o="Map";t.exports=e(238)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var n=strong.getEntry(r(this,o),t);return n&&n.v},set:function(t,n){return strong.def(r(this,o),0===t?0:t,n)}},strong,!0)},237:function(t,n,e){"use strict";var r=e(27).f,o=e(77),l=e(163),c=e(55),f=e(161),v=e(162),d=e(118),_=e(165),y=e(119),h=e(24),w=e(115).fastKey,j=e(235),k=h?"_s":"size",O=function(t,n){var e,r=w(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,d){var _=t((function(t,r){f(t,_,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[k]=0,null!=r&&v(r,e,t[d],t)}));return l(_.prototype,{clear:function(){for(var t=j(this,n),data=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete data[e.i];t._f=t._l=void 0,t[k]=0},delete:function(t){var e=j(this,n),r=O(e,t);if(r){var o=r.n,l=r.p;delete e._i[r.i],r.r=!0,l&&(l.n=o),o&&(o.p=l),e._f==r&&(e._f=o),e._l==r&&(e._l=l),e[k]--}return!!r},forEach:function(t){j(this,n);for(var e,r=c(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(r(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!O(j(this,n),t)}}),h&&r(_.prototype,"size",{get:function(){return j(this,n)[k]}}),_},def:function(t,n,e){var r,o,l=O(t,n);return l?l.v=e:(t._l=l={i:o=w(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=l),r&&(r.n=l),t[k]++,"F"!==o&&(t._i[o]=l)),t},getEntry:O,setStrong:function(t,n,e){d(t,n,(function(t,e){this._t=j(t,n),this._k=e,this._l=void 0}),(function(){for(var t=this,n=t._k,e=t._l;e&&e.r;)e=e.p;return t._t&&(t._l=e=e?e.n:t._t._f)?_(0,"keys"==n?e.k:"values"==n?e.v:[e.k,e.v]):(t._t=void 0,_(1))}),e?"entries":"values",!e,!0),y(n)}}},238:function(t,n,e){"use strict";var r=e(12),o=e(4),l=e(29),c=e(163),meta=e(115),f=e(162),v=e(161),d=e(21),_=e(16),y=e(117),h=e(76),w=e(120);t.exports=function(t,n,e,j,k,O){var x=r[t],m=x,L=k?"set":"add",N=m&&m.prototype,S={},E=function(t){var n=N[t];l(N,t,"delete"==t||"has"==t?function(a){return!(O&&!d(a))&&n.call(this,0===a?0:a)}:"get"==t?function(a){return O&&!d(a)?void 0:n.call(this,0===a?0:a)}:"add"==t?function(a){return n.call(this,0===a?0:a),this}:function(a,b){return n.call(this,0===a?0:a,b),this})};if("function"==typeof m&&(O||N.forEach&&!_((function(){(new m).entries().next()})))){var C=new m,P=C[L](O?{}:-0,1)!=C,G=_((function(){C.has(1)})),B=y((function(t){new m(t)})),D=!O&&_((function(){for(var t=new m,n=5;n--;)t[L](n,n);return!t.has(-0)}));B||((m=n((function(n,e){v(n,m,t);var r=w(new x,n,m);return null!=e&&f(e,k,r[L],r),r}))).prototype=N,N.constructor=m),(G||D)&&(E("delete"),E("has"),k&&E("get")),(D||P)&&E(L),O&&N.clear&&delete N.clear}else m=j.getConstructor(n,t,k,L),c(m.prototype,e),meta.NEED=!0;return h(m,t),S[t]=m,o(o.G+o.W+o.F*(m!=x),S),O||j.setStrong(m,t,k),m}},239:function(t,n,e){"use strict";e(121);var r=e(78);n.a=Object(r.a)("layout")},240:function(t,n,e){"use strict";var r=e(3),o=(e(54),e(53),e(11),e(40),e(236),e(39),e(14),e(34),e(10),e(13),e(22),e(23),e(164),e(1)),l=e(116),c=e(2);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var d=["sm","md","lg","xl"],_=["start","end","center"];function y(t,n){return d.reduce((function(e,r){return e[t+Object(c.B)(r)]=n(),e}),{})}var h=function(t){return[].concat(_,["baseline","stretch"]).includes(t)},w=y("align",(function(){return{type:String,default:null,validator:h}})),j=function(t){return[].concat(_,["space-between","space-around"]).includes(t)},k=y("justify",(function(){return{type:String,default:null,validator:j}})),O=function(t){return[].concat(_,["space-between","space-around","stretch"]).includes(t)},x=y("alignContent",(function(){return{type:String,default:null,validator:O}})),m={align:Object.keys(w),justify:Object.keys(k),alignContent:Object.keys(x)},L={align:"align",justify:"justify",alignContent:"align-content"};function N(t,n,e){var r=L[t];if(null!=e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return(r+="-".concat(e)).toLowerCase()}}var S=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:h}},w),{},{justify:{type:String,default:null,validator:j}},k),{},{alignContent:{type:String,default:null,validator:O}},x),render:function(t,n){var e=n.props,data=n.data,o=n.children,c="";for(var f in e)c+=String(e[f]);var v=S.get(c);return v||function(){var t,n;for(n in v=[],m)m[n].forEach((function(t){var r=e[t],o=N(n,t,r);o&&v.push(o)}));v.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(r.a)(t,"align-".concat(e.align),e.align),Object(r.a)(t,"justify-".concat(e.justify),e.justify),Object(r.a)(t,"align-content-".concat(e.alignContent),e.alignContent),t)),S.set(c,v)}(),t(e.tag,Object(l.a)(data,{staticClass:"row",class:v}),o)}})},370:function(t,n,e){"use strict";e.r(n);var r={data:function(){return{}},head:{title:"Gallery",meta:[{hid:"description",name:"description",content:"Gallery - Marcelo Fernandes"}]}},o=e(58),l=e(75),c=e.n(l),f=e(232),v=e(239),d=e(240),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-layout",{staticClass:"post"},[e("v-flex",[e("v-row",[e("h1",[t._v("GALLERY")])]),t._v(" "),e("v-row",[e("ul",[e("li",[e("NuxtLink",{attrs:{to:"gallery/2022-01-07-queenstown"}},[t._v("\n            2022-01-07 Queenstown\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2022-01-06-kingston"}},[t._v("\n            2022-01-06 Kingston\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2022-01-05-shotover-river-queenstown"}},[t._v("\n            2022-01-05 Shotover River - Queenstown\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2022-01-04-wanaka-blue-pools"}},[t._v("\n            2022-01-04 Wanaka - Blue Pools\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2022-01-03-arrowtown-wanaka"}},[t._v("\n            2022-01-03 Arrowtown - Wanaka\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2022-01-02-ben-lomond"}},[t._v("\n            2022-01-02 Ben Lomond\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2022-01-01-queenstown"}},[t._v("\n            2022-01-01 Queenstown\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2021-12-25-new-plymouth"}},[t._v("\n            2021-12-25 New Plymouth Xmas\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2021-12-18-wellington-botanic-gardens"}},[t._v("\n            2021-12-18 Wellington Botanic Gardens\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2021-12-11-zealandia"}},[t._v("\n            2021-12-11 Zealandia\n          ")])],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"gallery/2021-12-05-mount-vic"}},[t._v("\n            2021-12-05 Mount Victoria - Wellington\n          ")])],1)])])],1)],1)}),[],!1,null,"0c103e92",null);n.default=component.exports;c()(component,{VFlex:f.a,VLayout:v.a,VRow:d.a})}}]);