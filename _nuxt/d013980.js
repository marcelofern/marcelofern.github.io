(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{235:function(t,n,e){var r=e(21);t.exports=function(t,n){if(!r(t)||t._t!==n)throw TypeError("Incompatible receiver, "+n+" required!");return t}},236:function(t,n,e){"use strict";var strong=e(237),r=e(235),o="Map";t.exports=e(238)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var n=strong.getEntry(r(this,o),t);return n&&n.v},set:function(t,n){return strong.def(r(this,o),0===t?0:t,n)}},strong,!0)},237:function(t,n,e){"use strict";var r=e(27).f,o=e(77),c=e(163),l=e(55),f=e(161),v=e(162),d=e(118),_=e(164),y=e(119),h=e(24),m=e(115).fastKey,j=e(235),w=h?"_s":"size",O=function(t,n){var e,r=m(n);if("F"!==r)return t._i[r];for(e=t._f;e;e=e.n)if(e.k==n)return e};t.exports={getConstructor:function(t,n,e,d){var _=t((function(t,r){f(t,_,n,"_i"),t._t=n,t._i=o(null),t._f=void 0,t._l=void 0,t[w]=0,null!=r&&v(r,e,t[d],t)}));return c(_.prototype,{clear:function(){for(var t=j(this,n),data=t._i,e=t._f;e;e=e.n)e.r=!0,e.p&&(e.p=e.p.n=void 0),delete data[e.i];t._f=t._l=void 0,t[w]=0},delete:function(t){var e=j(this,n),r=O(e,t);if(r){var o=r.n,c=r.p;delete e._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),e._f==r&&(e._f=o),e._l==r&&(e._l=c),e[w]--}return!!r},forEach:function(t){j(this,n);for(var e,r=l(t,arguments.length>1?arguments[1]:void 0,3);e=e?e.n:this._f;)for(r(e.v,e.k,this);e&&e.r;)e=e.p},has:function(t){return!!O(j(this,n),t)}}),h&&r(_.prototype,"size",{get:function(){return j(this,n)[w]}}),_},def:function(t,n,e){var r,o,c=O(t,n);return c?c.v=e:(t._l=c={i:o=m(n,!0),k:n,v:e,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[w]++,"F"!==o&&(t._i[o]=c)),t},getEntry:O,setStrong:function(t,n,e){d(t,n,(function(t,e){this._t=j(t,n),this._k=e,this._l=void 0}),(function(){for(var t=this,n=t._k,e=t._l;e&&e.r;)e=e.p;return t._t&&(t._l=e=e?e.n:t._t._f)?_(0,"keys"==n?e.k:"values"==n?e.v:[e.k,e.v]):(t._t=void 0,_(1))}),e?"entries":"values",!e,!0),y(n)}}},238:function(t,n,e){"use strict";var r=e(12),o=e(4),c=e(29),l=e(163),meta=e(115),f=e(162),v=e(161),d=e(21),_=e(16),y=e(117),h=e(76),m=e(120);t.exports=function(t,n,e,j,w,O){var k=r[t],E=k,x=w?"set":"add",D=E&&E.prototype,N={},S=function(t){var n=D[t];c(D,t,"delete"==t||"has"==t?function(a){return!(O&&!d(a))&&n.call(this,0===a?0:a)}:"get"==t?function(a){return O&&!d(a)?void 0:n.call(this,0===a?0:a)}:"add"==t?function(a){return n.call(this,0===a?0:a),this}:function(a,b){return n.call(this,0===a?0:a,b),this})};if("function"==typeof E&&(O||D.forEach&&!_((function(){(new E).entries().next()})))){var C=new E,L=C[x](O?{}:-0,1)!=C,T=_((function(){C.has(1)})),F=y((function(t){new E(t)})),P=!O&&_((function(){for(var t=new E,n=5;n--;)t[x](n,n);return!t.has(-0)}));F||((E=n((function(n,e){v(n,E,t);var r=m(new k,n,E);return null!=e&&f(e,w,r[x],r),r}))).prototype=D,D.constructor=E),(T||P)&&(S("delete"),S("has"),w&&S("get")),(P||L)&&S(x),O&&D.clear&&delete D.clear}else E=j.getConstructor(n,t,w,x),l(E.prototype,e),meta.NEED=!0;return h(E,t),N[t]=E,o(o.G+o.W+o.F*(E!=k),N),O||j.setStrong(E,t,w),E}},239:function(t,n,e){"use strict";e(121);var r=e(78);n.a=Object(r.a)("layout")},240:function(t,n,e){"use strict";var r=e(3),o=(e(54),e(53),e(11),e(40),e(236),e(39),e(14),e(34),e(10),e(13),e(22),e(23),e(165),e(1)),c=e(116),l=e(2);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var d=["sm","md","lg","xl"],_=["start","end","center"];function y(t,n){return d.reduce((function(e,r){return e[t+Object(l.B)(r)]=n(),e}),{})}var h=function(t){return[].concat(_,["baseline","stretch"]).includes(t)},m=y("align",(function(){return{type:String,default:null,validator:h}})),j=function(t){return[].concat(_,["space-between","space-around"]).includes(t)},w=y("justify",(function(){return{type:String,default:null,validator:j}})),O=function(t){return[].concat(_,["space-between","space-around","stretch"]).includes(t)},k=y("alignContent",(function(){return{type:String,default:null,validator:O}})),E={align:Object.keys(m),justify:Object.keys(w),alignContent:Object.keys(k)},x={align:"align",justify:"justify",alignContent:"align-content"};function D(t,n,e){var r=x[t];if(null!=e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return(r+="-".concat(e)).toLowerCase()}}var N=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:h}},m),{},{justify:{type:String,default:null,validator:j}},w),{},{alignContent:{type:String,default:null,validator:O}},k),render:function(t,n){var e=n.props,data=n.data,o=n.children,l="";for(var f in e)l+=String(e[f]);var v=N.get(l);return v||function(){var t,n;for(n in v=[],E)E[n].forEach((function(t){var r=e[t],o=D(n,t,r);o&&v.push(o)}));v.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(r.a)(t,"align-".concat(e.align),e.align),Object(r.a)(t,"justify-".concat(e.justify),e.justify),Object(r.a)(t,"align-content-".concat(e.alignContent),e.alignContent),t)),N.set(l,v)}(),t(e.tag,Object(c.a)(data,{staticClass:"row",class:v}),o)}})},358:function(t,n,e){"use strict";e.r(n);var r={data:function(){return{}},head:{title:"Database Systems",meta:[{hid:"description",name:"description",content:"Database Systems - Marcelo Fernandes"}]}},o=e(58),c=e(75),l=e.n(c),f=e(232),v=e(239),d=e(240),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-layout",{staticClass:"post"},[e("v-flex",[e("v-row",[e("h1",[t._v("Database Systems")])]),t._v(" "),e("v-row",[e("ul",[e("li",[e("NuxtLink",{attrs:{to:"database-systems/design"}},[t._v("\n            Database Design\n          ")]),t._v(" - Data Model, ERD, Normalisation (1NF, 2NF, 3NF,\n          BCNF, 4NF)\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/data-retrieval"}},[t._v("\n            Data Retrieval\n          ")]),t._v(" - Single Table Data Retrieval - Multiple\n          Table Data Retrieval\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/database-update"}},[t._v("\n            Database Update\n          ")]),t._v(" - INSERT, UPDATE, DELETE\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/sql-functions"}},[t._v("\n            SQL Functions\n          ")]),t._v(" - Aggregate, Date, NVL, Character, Arithmetic,\n          and Data Type Conversion functions\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/views"}},[t._v("\n            Views\n          ")]),t._v(" - CREATE VIEW, benefits, and usage\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/table-management"}},[t._v("\n            Table Management\n          ")]),t._v(" - CREATE, DROP, indexes, constraints, sequences,\n          copying tables, and database transaction\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/security"}},[t._v("\n            Database Security\n          ")]),t._v(" - Issues, users privileges, GRANT and REVOKE,\n          multi-user environments, etc\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/transaction-management"}},[t._v("\n            Transaction Management\n          ")]),t._v(" - transactions, consistency, multi-user environment\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/exercises"}},[t._v("\n            Exercises\n          ")]),t._v(" - A list of exercises to practice with a real-life\n          scenario\n        ")],1),t._v(" "),e("li",[e("NuxtLink",{attrs:{to:"database-systems/project"}},[t._v("\n            Project\n          ")]),t._v(" - Creation of an IT help-desk database\n          scenario\n        ")],1)])])],1)],1)}),[],!1,null,"e734ab1e",null);n.default=component.exports;l()(component,{VFlex:f.a,VLayout:v.a,VRow:d.a})}}]);