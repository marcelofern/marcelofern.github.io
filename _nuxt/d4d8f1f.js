(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{220:function(t,n,e){var r=e(21);t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},221:function(t,n,e){"use strict";var strong=e(222),r=e(220);t.exports=e(223)("Map",(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var n=strong.getEntry(r(this,"Map"),t);return n&&n.v},set:function(t,n){return strong.def(r(this,"Map"),0===t?0:t,n)}},strong,!0)},222:function(t,n,e){"use strict";var r=e(28).f,o=e(73),c=e(147),l=e(50),f=e(145),v=e(146),d=e(105),h=e(148),y=e(106),_=e(22),w=e(103).fastKey,j=e(220),O=_?"_s":"size",m=function(t,n){var e,r=w(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,d){var h=t((function(t,r){f(t,h,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[O]=0,null!=r&&v(r,e,t[d],t)}));return c(h.prototype,{clear:function(){for(var t=j(this,n),data=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete data[e.i];t._f=t._l=void 0,t[O]=0},delete:function(t){var e=j(this,n),r=m(e,t);if(r){var o=r.n,c=r.p;delete e._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),e._f==r&&(e._f=o),e._l==r&&(e._l=c),e[O]--}return!!r},forEach:function(t){j(this,n);for(var e,r=l(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(r(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!m(j(this,n),t)}}),_&&r(h.prototype,"size",{get:function(){return j(this,n)[O]}}),h},def:function(t,n,e){var r,o,c=m(t,n);return c?c.v=e:(t._l=c={i:o=w(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[O]++,"F"!==o&&(t._i[o]=c)),t},getEntry:m,setStrong:function(t,n,e){d(t,n,(function(t,e){this._t=j(t,n),this._k=e,this._l=void 0}),(function(){for(var t=this._k,n=this._l;n&&n.r;)n=n.p;return this._t&&(this._l=n=n?n.n:this._t._f)?h(0,"keys"==t?n.k:"values"==t?n.v:[n.k,n.v]):(this._t=void 0,h(1))}),e?"entries":"values",!e,!0),y(n)}}},223:function(t,n,e){"use strict";var r=e(12),o=e(7),c=e(29),l=e(147),meta=e(103),f=e(146),v=e(145),d=e(21),h=e(23),y=e(104),_=e(72),w=e(107);t.exports=function(t,n,e,j,O,m){var C=r[t],k=C,x=O?"set":"add",E=k&&k.prototype,S={},M=function(t){var n=E[t];c(E,t,"delete"==t||"has"==t?function(a){return!(m&&!d(a))&&n.call(this,0===a?0:a)}:"get"==t?function(a){return m&&!d(a)?void 0:n.call(this,0===a?0:a)}:"add"==t?function(a){return n.call(this,0===a?0:a),this}:function(a,b){return n.call(this,0===a?0:a,b),this})};if("function"==typeof k&&(m||E.forEach&&!h((function(){(new k).entries().next()})))){var P=new k,D=P[x](m?{}:-0,1)!=P,L=h((function(){P.has(1)})),F=y((function(t){new k(t)})),N=!m&&h((function(){for(var t=new k,n=5;n--;)t[x](n,n);return!t.has(-0)}));F||((k=n((function(n,e){v(n,k,t);var r=w(new C,n,k);return null!=e&&f(e,O,r[x],r),r}))).prototype=E,E.constructor=k),(L||N)&&(M("delete"),M("has"),O&&M("get")),(N||D)&&M(x),m&&E.clear&&delete E.clear}else k=j.getConstructor(n,t,O,x),l(k.prototype,e),meta.NEED=!0;return _(k,t),S[t]=k,o(o.G+o.W+o.F*(k!=C),S),m||j.setStrong(k,t,O),k}},224:function(t,n,e){"use strict";e(108);var r=e(75);n.a=Object(r.a)("layout")},225:function(t,n,e){"use strict";e(27),e(13);var r=e(3),o=(e(37),e(221),e(38),e(6),e(4),e(16),e(54),e(55),e(149),e(1)),c=e(109),l=e(2);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var d=["sm","md","lg","xl"],h=["start","end","center"];function y(t,n){return d.reduce((function(e,r){return e[t+Object(l.n)(r)]=n(),e}),{})}var _=function(t){return[].concat(h,["baseline","stretch"]).includes(t)},w=y("align",(function(){return{type:String,default:null,validator:_}})),j=function(t){return[].concat(h,["space-between","space-around"]).includes(t)},O=y("justify",(function(){return{type:String,default:null,validator:j}})),m=function(t){return[].concat(h,["space-between","space-around","stretch"]).includes(t)},C=y("alignContent",(function(){return{type:String,default:null,validator:m}})),k={align:Object.keys(w),justify:Object.keys(O),alignContent:Object.keys(C)},x={align:"align",justify:"justify",alignContent:"align-content"};function E(t,n,e){var r=x[t];if(null!=e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return(r+="-".concat(e)).toLowerCase()}}var S=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:_}},w),{},{justify:{type:String,default:null,validator:j}},O),{},{alignContent:{type:String,default:null,validator:m}},C),render:function(t,n){var e=n.props,data=n.data,o=n.children,l="";for(var f in e)l+=String(e[f]);var v=S.get(l);return v||function(){var t,n;for(n in v=[],k)k[n].forEach((function(t){var r=e[t],o=E(n,t,r);o&&v.push(o)}));v.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(r.a)(t,"align-".concat(e.align),e.align),Object(r.a)(t,"justify-".concat(e.justify),e.justify),Object(r.a)(t,"align-content-".concat(e.alignContent),e.alignContent),t)),S.set(l,v)}(),t(e.tag,Object(c.a)(data,{staticClass:"row",class:v}),o)}})},229:function(t,n,e){var content=e(241);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(32).default)("c0c303e8",content,!0,{sourceMap:!1})},240:function(t,n,e){"use strict";e(229)},241:function(t,n,e){(n=e(31)(!1)).push([t.i,"#app .layout[data-v-58012d5a]{height:70vh}#app .section-wrapper[data-v-58012d5a]{padding-bottom:1em}",""]),t.exports=n},268:function(t,n,e){"use strict";e.r(n);var r={data:function(){return{hideFooter:!0}},head:{title:"Marcelo",meta:[{hid:"description",name:"description",content:"Marcelo - Software Engineer -  Wellington NZ"}]}},o=(e(240),e(56)),c=e(74),l=e.n(c),f=e(217),v=e(224),d=e(225),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-layout",{attrs:{id:"layout",column:"","justify-center":"","align-center":""}},[e("v-flex",{attrs:{xs6:"",sm6:"",md6:""}},[e("v-row",[e("div",{staticClass:"section-wrapper"},[e("span",{staticClass:"medium-text"},[t._v(">>")]),t._v(" "),e("NuxtLink",{staticClass:"big-link",attrs:{to:"/projects"}},[t._v("\n          PROJECTS\n        ")])],1)]),t._v(" "),e("v-row",[e("div",{staticClass:"section-wrapper"},[e("span",{staticClass:"medium-text"},[t._v(">>")]),t._v(" "),e("NuxtLink",{staticClass:"big-link",attrs:{to:"/academia"}},[t._v("\n          ACADEMIA\n        ")])],1)]),t._v(" "),e("v-row",[e("div",{staticClass:"section-wrapper"},[e("span",{staticClass:"medium-text"},[t._v(">>")]),t._v(" "),e("NuxtLink",{staticClass:"big-link",attrs:{to:"/about"}},[t._v("\n          MARCELO?\n        ")])],1)])],1)],1)}),[],!1,null,"58012d5a",null);n.default=component.exports;l()(component,{VFlex:f.a,VLayout:v.a,VRow:d.a})}}]);