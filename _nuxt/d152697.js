(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{220:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},221:function(t,e,n){"use strict";var strong=n(222),r=n(220);t.exports=n(223)("Map",(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,"Map"),t);return e&&e.v},set:function(t,e){return strong.def(r(this,"Map"),0===t?0:t,e)}},strong,!0)},222:function(t,e,n){"use strict";var r=n(28).f,o=n(73),c=n(147),l=n(50),v=n(145),d=n(146),f=n(105),h=n(148),_=n(106),w=n(22),y=n(103).fastKey,m=n(220),k=w?"_s":"size",O=function(t,e){var n,r=y(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,f){var h=t((function(t,r){v(t,h,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[k]=0,null!=r&&d(r,n,t[f],t)}));return c(h.prototype,{clear:function(){for(var t=m(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[k]=0},delete:function(t){var n=m(this,e),r=O(n,t);if(r){var o=r.n,c=r.p;delete n._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),n._f==r&&(n._f=o),n._l==r&&(n._l=c),n[k]--}return!!r},forEach:function(t){m(this,e);for(var n,r=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!O(m(this,e),t)}}),w&&r(h.prototype,"size",{get:function(){return m(this,e)[k]}}),h},def:function(t,e,n){var r,o,c=O(t,e);return c?c.v=n:(t._l=c={i:o=y(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[k]++,"F"!==o&&(t._i[o]=c)),t},getEntry:O,setStrong:function(t,e,n){f(t,e,(function(t,n){this._t=m(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this._k,e=this._l;e&&e.r;)e=e.p;return this._t&&(this._l=e=e?e.n:this._t._f)?h(0,"keys"==t?e.k:"values"==t?e.v:[e.k,e.v]):(this._t=void 0,h(1))}),n?"entries":"values",!n,!0),_(e)}}},223:function(t,e,n){"use strict";var r=n(12),o=n(7),c=n(29),l=n(147),meta=n(103),v=n(146),d=n(145),f=n(21),h=n(23),_=n(104),w=n(72),y=n(107);t.exports=function(t,e,n,m,k,O){var j=r[t],C=j,E=k?"set":"add",T=C&&C.prototype,x={},S=function(t){var e=T[t];c(T,t,"delete"==t||"has"==t?function(a){return!(O&&!f(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return O&&!f(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof C&&(O||T.forEach&&!h((function(){(new C).entries().next()})))){var A=new C,I=A[E](O?{}:-0,1)!=A,M=h((function(){A.has(1)})),D=_((function(t){new C(t)})),L=!O&&h((function(){for(var t=new C,e=5;e--;)t[E](e,e);return!t.has(-0)}));D||((C=e((function(e,n){d(e,C,t);var r=y(new j,e,C);return null!=n&&v(n,k,r[E],r),r}))).prototype=T,T.constructor=C),(M||L)&&(S("delete"),S("has"),k&&S("get")),(L||I)&&S(E),O&&T.clear&&delete T.clear}else C=m.getConstructor(e,t,k,E),l(C.prototype,n),meta.NEED=!0;return w(C,t),x[t]=C,o(o.G+o.W+o.F*(C!=j),x),O||m.setStrong(C,t,k),C}},224:function(t,e,n){"use strict";n(108);var r=n(75);e.a=Object(r.a)("layout")},225:function(t,e,n){"use strict";n(27),n(13);var r=n(3),o=(n(37),n(221),n(38),n(6),n(4),n(16),n(54),n(55),n(149),n(1)),c=n(109),l=n(2);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f=["sm","md","lg","xl"],h=["start","end","center"];function _(t,e){return f.reduce((function(n,r){return n[t+Object(l.n)(r)]=e(),n}),{})}var w=function(t){return[].concat(h,["baseline","stretch"]).includes(t)},y=_("align",(function(){return{type:String,default:null,validator:w}})),m=function(t){return[].concat(h,["space-between","space-around"]).includes(t)},k=_("justify",(function(){return{type:String,default:null,validator:m}})),O=function(t){return[].concat(h,["space-between","space-around","stretch"]).includes(t)},j=_("alignContent",(function(){return{type:String,default:null,validator:O}})),C={align:Object.keys(y),justify:Object.keys(k),alignContent:Object.keys(j)},E={align:"align",justify:"justify",alignContent:"align-content"};function T(t,e,n){var r=E[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var x=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:w}},y),{},{justify:{type:String,default:null,validator:m}},k),{},{alignContent:{type:String,default:null,validator:O}},j),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var v in n)l+=String(n[v]);var d=x.get(l);return d||function(){var t,e;for(e in d=[],C)C[e].forEach((function(t){var r=n[t],o=T(e,t,r);o&&d.push(o)}));d.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),x.set(l,d)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},281:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{}},head:{title:"Transaction Management - MarceloFern",meta:[{hid:"description",name:"description",content:"Transaction Management - Marcelo Fernandes"}]}},o=n(56),c=n(74),l=n.n(c),v=n(217),d=n(224),f=n(225),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("Transaction Management")])]),t._v(" "),n("v-row",[n("p",{staticClass:"caption"},[t._v("Date: 2020-10-05")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Each unit of interaction/work with the database is called transaction.\n        In a multi-user environment there will be concurrent transactions.\n        This could affect the data integrity.\n      ")]),t._v(" "),n("p",[t._v("\n        A transaction can happen on multiple steps, consider the following\n        scenario:\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[t._v("\n          The availability for an item is checked in the stock\n        ")]),t._v(" "),n("li",[t._v("\n          The item is added to the Order table\n        ")]),t._v(" "),n("li",[t._v("\n          The details of this item is added to the OrderItem table\n        ")]),t._v(" "),n("li",[t._v("\n          The stock is updated with the new quantity available for each\n          item that has been ordered\n        ")])])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Note that all that sequence of commands are interrelated and represent\n        one transaction.\n      ")]),t._v(" "),n("p",[t._v("\n        A transaction can be initialised by any SQL statement. Additionally,\n        you could begin a transaction explicitly by calling the command\n        SET TRANSACTION. Two other commands are available:\n      ")])]),t._v(" "),n("v-row",[n("ul",[n("li",[n("b",[n("i",[t._v("COMMIT:")])]),t._v(" Ends a transaction and makes the changes\n          permanent and visible to other users\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("ROLLBACK:")])]),t._v(" Ends a transaction and undoes all the\n          data updates made since. Note that tables, views, and other\n          database objects won't be rolled back; this operation only\n          affects the data\n        ")])])]),t._v(" "),n("v-row",[n("h2",[t._v("Concurrency Issues")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        In a multi-user database environment, the data will be updated\n        often. In certain situations, the data will be updated while it\n        is being analysed, creating a discrepancy between the data being\n        analysed versus the current data in the database.\n      ")]),t._v(" "),n("p",[t._v("\n        Although there are many scenarios where a transaction\n        create data inconsistencies, the data integrity can be \n        assured if the transactions satisfy the following "),n("b",[t._v("ACID")]),t._v("\n        properties:\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[n("b",[n("i",[t._v("Atomicity:")])]),t._v(" A transaction is a unit of work.\n          Either all operations of a transaction are reflected in the\n          database or none are\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("Consistency:")])]),t._v(" Execution of a transaction in isolation\n          preserves data consistency. The transaction must start with the\n          database in a consistent state and finish with the database\n          in a consistent state\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("Isolation:")])]),t._v(' Each transaction is "unaware" of other\n          transactions being executed concurrently in the system.\n          Intermediary steps are hidden from the view of other users until\n          the transaction finishes\n        ')]),t._v(" "),n("li",[n("b",[n("i",[t._v("Durability:")])]),t._v(" After a successful transaction,\n          its changes will persist even after subsequent system failure\n        ")])])]),t._v(" "),n("v-row",[n("p",[t._v("\n        To make sure that ACID properties work, we must ensure\n        that transaction schedules are Serialisable and Recoverable.\n      ")])]),t._v(" "),n("v-row",[n("h2",[t._v("Locking")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        There are two types of lock: "),n("i",[t._v("shared lock")]),t._v(" and "),n("i",[t._v("exclusive\n        lock")]),t._v(". Locking can occur at the database level, the table level,\n        the record level, and the field level. Locks will synchronise\n        access to shared data items following these rules:\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[t._v("\n          Before reading X, get "),n("b",[t._v("shared")]),t._v("(read) lock on X\n        ")]),t._v(" "),n("li",[t._v("\n          Before writing to X, get "),n("b",[t._v("exclusive")]),t._v("(write) lock on X\n        ")]),t._v(" "),n("li",[t._v("\n          An attempt to get a shared lock on X is blocked if another\n          transaction already has exclusive lock on X\n        ")]),t._v(" "),n("li",[t._v("\n          An attempt to get an exclusive lock on X is blocked if another\n          transaction has any kind of lock on X\n        ")])])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Although locks can guarantee data correctness, it introduces some\n        undesirable effects:\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[n("b",[n("i",[t._v("Livelock / Starvation:")])]),t._v(" One transaction is\n          permanently frozen and can't access the data\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("Deadlock:")])]),t._v(" No transactions can proceed due to\n          each of them waiting on a lock held by another.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("Reduced Performance:")])]),t._v(" Locking will introduce\n          delays while waiting for locks to be released. This will\n          reduce concurrency power and hence, throughput.\n        ")])])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Note that different database implementations will try to solve\n        the undesirable effects listed above.\n      ")])])],1)],1)}),[],!1,null,"654178d1",null);e.default=component.exports;l()(component,{VFlex:v.a,VLayout:d.a,VRow:f.a})}}]);