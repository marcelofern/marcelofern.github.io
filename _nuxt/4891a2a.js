(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{235:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},236:function(t,e,n){"use strict";var strong=n(237),r=n(235),o="Map";t.exports=n(238)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,o),t);return e&&e.v},set:function(t,e){return strong.def(r(this,o),0===t?0:t,e)}},strong,!0)},237:function(t,e,n){"use strict";var r=n(27).f,o=n(77),c=n(163),l=n(55),f=n(161),v=n(162),_=n(118),d=n(165),h=n(119),j=n(24),y=n(115).fastKey,w=n(235),m=j?"_s":"size",O=function(t,e){var n,r=y(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,_){var d=t((function(t,r){f(t,d,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[m]=0,null!=r&&v(r,n,t[_],t)}));return c(d.prototype,{clear:function(){for(var t=w(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[m]=0},delete:function(t){var n=w(this,e),r=O(n,t);if(r){var o=r.n,c=r.p;delete n._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),n._f==r&&(n._f=o),n._l==r&&(n._l=c),n[m]--}return!!r},forEach:function(t){w(this,e);for(var n,r=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!O(w(this,e),t)}}),j&&r(d.prototype,"size",{get:function(){return w(this,e)[m]}}),d},def:function(t,e,n){var r,o,c=O(t,e);return c?c.v=n:(t._l=c={i:o=y(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[m]++,"F"!==o&&(t._i[o]=c)),t},getEntry:O,setStrong:function(t,e,n){_(t,e,(function(t,n){this._t=w(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?d(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,d(1))}),n?"entries":"values",!n,!0),h(e)}}},238:function(t,e,n){"use strict";var r=n(12),o=n(4),c=n(29),l=n(163),meta=n(115),f=n(162),v=n(161),_=n(21),d=n(16),h=n(117),j=n(76),y=n(120);t.exports=function(t,e,n,w,m,O){var k=r[t],S=k,C=m?"set":"add",x=S&&S.prototype,E={},F=function(t){var e=x[t];c(x,t,"delete"==t||"has"==t?function(a){return!(O&&!_(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return O&&!_(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof S&&(O||x.forEach&&!d((function(){(new S).entries().next()})))){var P=new S,D=P[C](O?{}:-0,1)!=P,R=d((function(){P.has(1)})),z=h((function(t){new S(t)})),B=!O&&d((function(){for(var t=new S,e=5;e--;)t[C](e,e);return!t.has(-0)}));z||((S=e((function(e,n){v(e,S,t);var r=y(new k,e,S);return null!=n&&f(n,m,r[C],r),r}))).prototype=x,x.constructor=S),(R||B)&&(F("delete"),F("has"),m&&F("get")),(B||D)&&F(C),O&&x.clear&&delete x.clear}else S=w.getConstructor(e,t,m,C),l(S.prototype,n),meta.NEED=!0;return j(S,t),E[t]=S,o(o.G+o.W+o.F*(S!=k),E),O||w.setStrong(S,t,m),S}},239:function(t,e,n){"use strict";n(121);var r=n(78);e.a=Object(r.a)("layout")},240:function(t,e,n){"use strict";var r=n(3),o=(n(54),n(53),n(11),n(40),n(236),n(39),n(14),n(34),n(10),n(13),n(22),n(23),n(164),n(1)),c=n(116),l=n(2);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _=["sm","md","lg","xl"],d=["start","end","center"];function h(t,e){return _.reduce((function(n,r){return n[t+Object(l.B)(r)]=e(),n}),{})}var j=function(t){return[].concat(d,["baseline","stretch"]).includes(t)},y=h("align",(function(){return{type:String,default:null,validator:j}})),w=function(t){return[].concat(d,["space-between","space-around"]).includes(t)},m=h("justify",(function(){return{type:String,default:null,validator:w}})),O=function(t){return[].concat(d,["space-between","space-around","stretch"]).includes(t)},k=h("alignContent",(function(){return{type:String,default:null,validator:O}})),S={align:Object.keys(y),justify:Object.keys(m),alignContent:Object.keys(k)},C={align:"align",justify:"justify",alignContent:"align-content"};function x(t,e,n){var r=C[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var E=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:j}},y),{},{justify:{type:String,default:null,validator:w}},m),{},{alignContent:{type:String,default:null,validator:O}},k),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var f in n)l+=String(n[f]);var v=E.get(l);return v||function(){var t,e;for(e in v=[],S)S[e].forEach((function(t){var r=n[t],o=x(e,t,r);o&&v.push(o)}));v.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),E.set(l,v)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:v}),o)}})},403:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{bucketUrl:"https://marcelofern.s3.eu-west-1.amazonaws.com/gallery/",bucketFolder:"2022-01-05-shotover-river-queenstown/",images:{beach:"beach.jpg",beach_pool:"beach_pool.jpg",beach_river:"beach_river.jpg",bridge_3:"bridge_3.jpg",bridge_view_2:"bridge_view_2.jpg",bridge_view:"bridge_view.jpg",evie_dislikes_jetboat:"evie_dislikes_jetboat.jpg",lotr_view_1:"lotr_view_1.jpg",lotr_view_4:"lotr_view_4.jpg",marcelo_jumping:"marcelo_jumping.jpg",morningstar_sign:"morningstar_sign.jpg",river_blue:"river_blue.jpg",v_mountains_2:"v_mountains_2.jpg",v_mountains:"v_mountains.jpg"}}},head:{title:"Shotover River - Queenstown",meta:[{hid:"description",name:"description",content:"Shotover River - Queenstown - 2022-01-05 - Marcelo Fernandes"}]}},o=n(58),c=n(75),l=n.n(c),f=n(232),v=n(239),_=n(240),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post post-gallery"},[n("v-flex",[n("v-row",[n("h1",[t._v("Shotover River - Queenstown 2022-01-05")])]),t._v(" "),t._l(t.images,(function(e){return[n("v-row",[n("a",{staticClass:"img-link",attrs:{href:t.bucketUrl+t.bucketFolder+e,target:"_blank"}},[n("img",{attrs:{src:t.bucketUrl+t.bucketFolder+e}})])]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])])]}))],2)],1)}),[],!1,null,"4e16842c",null);e.default=component.exports;l()(component,{VFlex:f.a,VLayout:v.a,VRow:_.a})}}]);