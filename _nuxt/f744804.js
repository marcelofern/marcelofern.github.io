(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{220:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},221:function(t,e,n){"use strict";var strong=n(222),r=n(220);t.exports=n(223)("Map",(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,"Map"),t);return e&&e.v},set:function(t,e){return strong.def(r(this,"Map"),0===t?0:t,e)}},strong,!0)},222:function(t,e,n){"use strict";var r=n(28).f,o=n(73),c=n(147),l=n(50),f=n(145),v=n(146),_=n(105),d=n(148),h=n(106),y=n(22),j=n(103).fastKey,w=n(220),O=y?"_s":"size",x=function(t,e){var n,r=j(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,_){var d=t((function(t,r){f(t,d,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[O]=0,null!=r&&v(r,n,t[_],t)}));return c(d.prototype,{clear:function(){for(var t=w(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[O]=0},delete:function(t){var n=w(this,e),r=x(n,t);if(r){var o=r.n,c=r.p;delete n._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),n._f==r&&(n._f=o),n._l==r&&(n._l=c),n[O]--}return!!r},forEach:function(t){w(this,e);for(var n,r=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!x(w(this,e),t)}}),y&&r(d.prototype,"size",{get:function(){return w(this,e)[O]}}),d},def:function(t,e,n){var r,o,c=x(t,e);return c?c.v=n:(t._l=c={i:o=j(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[O]++,"F"!==o&&(t._i[o]=c)),t},getEntry:x,setStrong:function(t,e,n){_(t,e,(function(t,n){this._t=w(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this._k,e=this._l;e&&e.r;)e=e.p;return this._t&&(this._l=e=e?e.n:this._t._f)?d(0,"keys"==t?e.k:"values"==t?e.v:[e.k,e.v]):(this._t=void 0,d(1))}),n?"entries":"values",!n,!0),h(e)}}},223:function(t,e,n){"use strict";var r=n(12),o=n(7),c=n(29),l=n(147),meta=n(103),f=n(146),v=n(145),_=n(21),d=n(23),h=n(104),y=n(72),j=n(107);t.exports=function(t,e,n,w,O,x){var k=r[t],m=k,S=O?"set":"add",E=m&&m.prototype,C={},D=function(t){var e=E[t];c(E,t,"delete"==t||"has"==t?function(a){return!(x&&!_(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return x&&!_(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof m&&(x||E.forEach&&!d((function(){(new m).entries().next()})))){var P=new m,F=P[S](x?{}:-0,1)!=P,M=d((function(){P.has(1)})),L=h((function(t){new m(t)})),T=!x&&d((function(){for(var t=new m,e=5;e--;)t[S](e,e);return!t.has(-0)}));L||((m=e((function(e,n){v(e,m,t);var r=j(new k,e,m);return null!=n&&f(n,O,r[S],r),r}))).prototype=E,E.constructor=m),(M||T)&&(D("delete"),D("has"),O&&D("get")),(T||F)&&D(S),x&&E.clear&&delete E.clear}else m=w.getConstructor(e,t,O,S),l(m.prototype,n),meta.NEED=!0;return y(m,t),C[t]=m,o(o.G+o.W+o.F*(m!=k),C),x||w.setStrong(m,t,O),m}},224:function(t,e,n){"use strict";n(108);var r=n(75);e.a=Object(r.a)("layout")},225:function(t,e,n){"use strict";n(27),n(13);var r=n(3),o=(n(37),n(221),n(38),n(6),n(4),n(16),n(54),n(55),n(149),n(1)),c=n(109),l=n(2);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _=["sm","md","lg","xl"],d=["start","end","center"];function h(t,e){return _.reduce((function(n,r){return n[t+Object(l.n)(r)]=e(),n}),{})}var y=function(t){return[].concat(d,["baseline","stretch"]).includes(t)},j=h("align",(function(){return{type:String,default:null,validator:y}})),w=function(t){return[].concat(d,["space-between","space-around"]).includes(t)},O=h("justify",(function(){return{type:String,default:null,validator:w}})),x=function(t){return[].concat(d,["space-between","space-around","stretch"]).includes(t)},k=h("alignContent",(function(){return{type:String,default:null,validator:x}})),m={align:Object.keys(j),justify:Object.keys(O),alignContent:Object.keys(k)},S={align:"align",justify:"justify",alignContent:"align-content"};function E(t,e,n){var r=S[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var C=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:y}},j),{},{justify:{type:String,default:null,validator:w}},O),{},{alignContent:{type:String,default:null,validator:x}},k),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var f in n)l+=String(n[f]);var v=C.get(l);return v||function(){var t,e;for(e in v=[],m)m[e].forEach((function(t){var r=n[t],o=E(e,t,r);o&&v.push(o)}));v.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),C.set(l,v)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:v}),o)}})},261:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{}},head:{title:"Database Exercises - MarceloFern",meta:[{hid:"description",name:"description",content:"Database Exercises - Marcelo Fernandes"}]}},o=n(56),c=n(74),l=n.n(c),f=n(217),v=n(224),_=n(225),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("Exercises")])]),t._v(" "),n("v-row",[n("p",{staticClass:"caption"},[t._v("Date: 2020-10-07")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        This is a list of exercises (in .sql format) for practicing\n        your SQL queries. The first file will contain the\n        SQL statements to generate the db, and the following files\n        will contain questions and solutions for various different\n        types of queries.\n      ")]),t._v(" "),n("p",[t._v("\n        The exercise scenario simulates a university database:\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[t._v("\n          Create the database: \n          "),n("a",{attrs:{href:"/files/sql/create_db.sql",target:"_blank"}},[t._v("\n            create_db.sql\n          ")])]),t._v(" "),n("li",[t._v("\n          Simple joins:\n          "),n("a",{attrs:{href:"/files/sql/simple_join_exercises.sql",target:"_blank"}},[t._v("\n            simple_join_exercises.sql\n          ")])]),t._v(" "),n("li",[t._v("\n          Outer joins:\n          "),n("a",{attrs:{href:"/files/sql/outer_join_exercises.sql",target:"_blank"}},[t._v("\n            outer_join_exercises.sql\n          ")])]),t._v(" "),n("li",[t._v("\n          Non equi and self joins:\n          "),n("a",{attrs:{href:"/files/sql/non_equi_self_join_exercises.sql",target:"_blank"}},[t._v("\n            non_equi_self_join_exercises.sql\n          ")])]),t._v(" "),n("li",[t._v("\n          Database functions:\n          "),n("a",{attrs:{href:"/files/sql/functions_exercises.sql",target:"_blank"}},[t._v("\n            functions_exercises.sql\n          ")])]),t._v(" "),n("li",[t._v("\n          Subqueries and Views:\n          "),n("a",{attrs:{href:"/files/sql/subqueries_and_views.sql",target:"_blank"}},[t._v("\n            subqueries_and_views.sql\n          ")])])])])],1)],1)}),[],!1,null,"66bf3918",null);e.default=component.exports;l()(component,{VFlex:f.a,VLayout:v.a,VRow:_.a})}}]);