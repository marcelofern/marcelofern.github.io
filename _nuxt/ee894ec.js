(window.webpackJsonp=window.webpackJsonp||[]).push([[61],{235:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},236:function(t,e,n){"use strict";var strong=n(237),r=n(235),o="Map";t.exports=n(238)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,o),t);return e&&e.v},set:function(t,e){return strong.def(r(this,o),0===t?0:t,e)}},strong,!0)},237:function(t,e,n){"use strict";var r=n(27).f,o=n(77),c=n(163),l=n(55),f=n(161),_=n(162),d=n(118),v=n(165),h=n(119),j=n(24),y=n(115).fastKey,w=n(235),k=j?"_s":"size",O=function(t,e){var n,r=y(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,d){var v=t((function(t,r){f(t,v,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[k]=0,null!=r&&_(r,n,t[d],t)}));return c(v.prototype,{clear:function(){for(var t=w(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[k]=0},delete:function(t){var n=w(this,e),r=O(n,t);if(r){var o=r.n,c=r.p;delete n._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),n._f==r&&(n._f=o),n._l==r&&(n._l=c),n[k]--}return!!r},forEach:function(t){w(this,e);for(var n,r=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!O(w(this,e),t)}}),j&&r(v.prototype,"size",{get:function(){return w(this,e)[k]}}),v},def:function(t,e,n){var r,o,c=O(t,e);return c?c.v=n:(t._l=c={i:o=y(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[k]++,"F"!==o&&(t._i[o]=c)),t},getEntry:O,setStrong:function(t,e,n){d(t,e,(function(t,n){this._t=w(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?v(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,v(1))}),n?"entries":"values",!n,!0),h(e)}}},238:function(t,e,n){"use strict";var r=n(12),o=n(4),c=n(29),l=n(163),meta=n(115),f=n(162),_=n(161),d=n(21),v=n(16),h=n(117),j=n(76),y=n(120);t.exports=function(t,e,n,w,k,O){var m=r[t],C=m,x=k?"set":"add",S=C&&C.prototype,E={},F=function(t){var e=S[t];c(S,t,"delete"==t||"has"==t?function(a){return!(O&&!d(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return O&&!d(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof C&&(O||S.forEach&&!v((function(){(new C).entries().next()})))){var P=new C,B=P[x](O?{}:-0,1)!=P,D=v((function(){P.has(1)})),L=h((function(t){new C(t)})),z=!O&&v((function(){for(var t=new C,e=5;e--;)t[x](e,e);return!t.has(-0)}));L||((C=e((function(e,n){_(e,C,t);var r=y(new m,e,C);return null!=n&&f(n,k,r[x],r),r}))).prototype=S,S.constructor=C),(D||z)&&(F("delete"),F("has"),k&&F("get")),(z||B)&&F(x),O&&S.clear&&delete S.clear}else C=w.getConstructor(e,t,k,x),l(C.prototype,n),meta.NEED=!0;return j(C,t),E[t]=C,o(o.G+o.W+o.F*(C!=m),E),O||w.setStrong(C,t,k),C}},239:function(t,e,n){"use strict";n(121);var r=n(78);e.a=Object(r.a)("layout")},240:function(t,e,n){"use strict";var r=n(3),o=(n(54),n(53),n(11),n(40),n(236),n(39),n(14),n(34),n(10),n(13),n(22),n(23),n(164),n(1)),c=n(116),l=n(2);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function _(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d=["sm","md","lg","xl"],v=["start","end","center"];function h(t,e){return d.reduce((function(n,r){return n[t+Object(l.B)(r)]=e(),n}),{})}var j=function(t){return[].concat(v,["baseline","stretch"]).includes(t)},y=h("align",(function(){return{type:String,default:null,validator:j}})),w=function(t){return[].concat(v,["space-between","space-around"]).includes(t)},k=h("justify",(function(){return{type:String,default:null,validator:w}})),O=function(t){return[].concat(v,["space-between","space-around","stretch"]).includes(t)},m=h("alignContent",(function(){return{type:String,default:null,validator:O}})),C={align:Object.keys(y),justify:Object.keys(k),alignContent:Object.keys(m)},x={align:"align",justify:"justify",alignContent:"align-content"};function S(t,e,n){var r=x[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var E=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:_(_(_({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:j}},y),{},{justify:{type:String,default:null,validator:w}},k),{},{alignContent:{type:String,default:null,validator:O}},m),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var f in n)l+=String(n[f]);var _=E.get(l);return _||function(){var t,e;for(e in _=[],C)C[e].forEach((function(t){var r=n[t],o=S(e,t,r);o&&_.push(o)}));_.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),E.set(l,_)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:_}),o)}})},399:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{bucketUrl:"https://marcelofern.s3.eu-west-1.amazonaws.com/gallery/",bucketFolder:"2022-01-02-ben-lomond/",images:{near_saddle_view:"near_saddle_view.jpg",goat:"goat.jpg",ice_near_saddle_view:"ice_near_saddle_view.jpg",jetstar_saddle_view:"jetstar_saddle_view.jpg",peak_view_1:"peak_view_1.jpg",peak_view_2:"peak_view_2.jpg",pipit_eating_cicada_1:"pipit_eating_cicada_1.jpg",pipit_eating_cicada_2:"pipit_eating_cicada_2.jpg",pipit_eating_cicada_3:"pipit_eating_cicada_3.jpg",pipit_eating_cicada_4:"pipit_eating_cicada_4.jpg",alpine_lake_1:"alpine_lake_1.jpg",mum_duck_and_2_chics:"mum_duck_and_2_chics.jpg",onsen_bath_1:"onsen_bath_1.jpg",onsen_view_sunset:"onsen_view_sunset.jpg"}}},head:{title:"Ben Lomond",meta:[{hid:"description",name:"description",content:"Ben Lomond 2022-01-02 - Marcelo Fernandes"}]}},o=n(58),c=n(75),l=n.n(c),f=n(232),_=n(239),d=n(240),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post post-gallery"},[n("v-flex",[n("v-row",[n("h1",[t._v("Ben Lomond 2022-01-02")])]),t._v(" "),t._l(t.images,(function(e){return[n("v-row",[n("a",{staticClass:"img-link",attrs:{href:t.bucketUrl+t.bucketFolder+e,target:"_blank"}},[n("img",{attrs:{src:t.bucketUrl+t.bucketFolder+e}})])]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])])]}))],2)],1)}),[],!1,null,"ead8152a",null);e.default=component.exports;l()(component,{VFlex:f.a,VLayout:_.a,VRow:d.a})}}]);