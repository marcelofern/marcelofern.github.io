(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{227:function(t,n,e){var r=e(21);t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},228:function(t,n,e){"use strict";var strong=e(229),r=e(227);t.exports=e(230)("Map",(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var n=strong.getEntry(r(this,"Map"),t);return n&&n.v},set:function(t,n){return strong.def(r(this,"Map"),0===t?0:t,n)}},strong,!0)},229:function(t,n,e){"use strict";var r=e(28).f,o=e(74),c=e(154),l=e(50),f=e(152),v=e(153),d=e(108),h=e(155),y=e(109),_=e(22),j=e(105).fastKey,w=e(227),O=_?"_s":"size",m=function(t,n){var e,r=j(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,d){var h=t((function(t,r){f(t,h,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[O]=0,null!=r&&v(r,e,t[d],t)}));return c(h.prototype,{clear:function(){for(var t=w(this,n),data=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete data[e.i];t._f=t._l=void 0,t[O]=0},delete:function(t){var e=w(this,n),r=m(e,t);if(r){var o=r.n,c=r.p;delete e._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),e._f==r&&(e._f=o),e._l==r&&(e._l=c),e[O]--}return!!r},forEach:function(t){w(this,n);for(var e,r=l(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(r(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!m(w(this,n),t)}}),_&&r(h.prototype,"size",{get:function(){return w(this,n)[O]}}),h},def:function(t,n,e){var r,o,c=m(t,n);return c?c.v=e:(t._l=c={i:o=j(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[O]++,"F"!==o&&(t._i[o]=c)),t},getEntry:m,setStrong:function(t,n,e){d(t,n,(function(t,e){this._t=w(t,n),this._k=e,this._l=void 0}),(function(){for(var t=this._k,n=this._l;n&&n.r;)n=n.p;return this._t&&(this._l=n=n?n.n:this._t._f)?h(0,"keys"==t?n.k:"values"==t?n.v:[n.k,n.v]):(this._t=void 0,h(1))}),e?"entries":"values",!e,!0),y(n)}}},230:function(t,n,e){"use strict";var r=e(12),o=e(7),c=e(29),l=e(154),meta=e(105),f=e(153),v=e(152),d=e(21),h=e(23),y=e(107),_=e(73),j=e(110);t.exports=function(t,n,e,w,O,m){var k=r[t],S=k,x=O?"set":"add",C=S&&S.prototype,E={},M=function(t){var n=C[t];c(C,t,"delete"==t||"has"==t?function(a){return!(m&&!d(a))&&n.call(this,0===a?0:a)}:"get"==t?function(a){return m&&!d(a)?void 0:n.call(this,0===a?0:a)}:"add"==t?function(a){return n.call(this,0===a?0:a),this}:function(a,b){return n.call(this,0===a?0:a,b),this})};if("function"==typeof S&&(m||C.forEach&&!h((function(){(new S).entries().next()})))){var P=new S,L=P[x](m?{}:-0,1)!=P,D=h((function(){P.has(1)})),F=y((function(t){new S(t)})),B=!m&&h((function(){for(var t=new S,n=5;n--;)t[x](n,n);return!t.has(-0)}));F||((S=n((function(n,e){v(n,S,t);var r=j(new k,n,S);return null!=e&&f(e,O,r[x],r),r}))).prototype=C,C.constructor=S),(D||B)&&(M("delete"),M("has"),O&&M("get")),(B||L)&&M(x),m&&C.clear&&delete C.clear}else S=w.getConstructor(n,t,O,x),l(S.prototype,e),meta.NEED=!0;return _(S,t),E[t]=S,o(o.G+o.W+o.F*(S!=k),E),m||w.setStrong(S,t,O),S}},231:function(t,n,e){"use strict";e(111);var r=e(75);n.a=Object(r.a)("layout")},232:function(t,n,e){"use strict";e(27),e(13);var r=e(3),o=(e(37),e(228),e(38),e(6),e(4),e(16),e(54),e(55),e(156),e(1)),c=e(106),l=e(2);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var d=["sm","md","lg","xl"],h=["start","end","center"];function y(t,n){return d.reduce((function(e,r){return e[t+Object(l.B)(r)]=n(),e}),{})}var _=function(t){return[].concat(h,["baseline","stretch"]).includes(t)},j=y("align",(function(){return{type:String,default:null,validator:_}})),w=function(t){return[].concat(h,["space-between","space-around"]).includes(t)},O=y("justify",(function(){return{type:String,default:null,validator:w}})),m=function(t){return[].concat(h,["space-between","space-around","stretch"]).includes(t)},k=y("alignContent",(function(){return{type:String,default:null,validator:m}})),S={align:Object.keys(j),justify:Object.keys(O),alignContent:Object.keys(k)},x={align:"align",justify:"justify",alignContent:"align-content"};function C(t,n,e){var r=x[t];if(null!=e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return(r+="-".concat(e)).toLowerCase()}}var E=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:_}},j),{},{justify:{type:String,default:null,validator:w}},O),{},{alignContent:{type:String,default:null,validator:m}},k),render:function(t,n){var e=n.props,data=n.data,o=n.children,l="";for(var f in e)l+=String(e[f]);var v=E.get(l);return v||function(){var t,n;for(n in v=[],S)S[n].forEach((function(t){var r=e[t],o=C(n,t,r);o&&v.push(o)}));v.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(r.a)(t,"align-".concat(e.align),e.align),Object(r.a)(t,"justify-".concat(e.justify),e.justify),Object(r.a)(t,"align-content-".concat(e.alignContent),e.alignContent),t)),E.set(l,v)}(),t(e.tag,Object(c.a)(data,{staticClass:"row",class:v}),o)}})},349:function(t,n,e){"use strict";e.r(n);var r={data:function(){return{}},head:{title:"Mathematical Logic",meta:[{hid:"description",name:"description",content:"Mathematical Logic - Marcelo Fernandes"}]}},o=e(56),c=e(72),l=e.n(c),f=e(224),v=e(231),d=e(232),component=Object(o.a)(r,(function(){var t=this.$createElement,n=this._self._c||t;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[this._v("Mathematical Logic")])]),this._v(" "),n("br"),this._v(" "),n("v-row",[n("ul",[n("li",[n("NuxtLink",{attrs:{to:"/academia/mathematical-logic/induction"}},[this._v("\n            Induction\n          ")])],1)])])],1)],1)}),[],!1,null,"4a9dab2a",null);n.default=component.exports;l()(component,{VFlex:f.a,VLayout:v.a,VRow:d.a})}}]);