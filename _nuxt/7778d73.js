(window.webpackJsonp=window.webpackJsonp||[]).push([[51],{235:function(t,e,n){var o=n(21);t.exports=function(t,e){if(!o(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},236:function(t,e,n){"use strict";var strong=n(237),o=n(235),r="Map";t.exports=n(238)(r,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(o(this,r),t);return e&&e.v},set:function(t,e){return strong.def(o(this,r),0===t?0:t,e)}},strong,!0)},237:function(t,e,n){"use strict";var o=n(27).f,r=n(77),c=n(163),l=n(55),h=n(161),v=n(162),f=n(118),d=n(165),_=n(119),m=n(24),w=n(115).fastKey,y=n(235),k=m?"_s":"size",j=function(t,e){var n,o=w(e);if("F"!==o)return t._i[o];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,f){var d=t((function(t,o){h(t,d,e,"_i"),t._t=e,t._i=r(null),t._f=void 0,t._l=void 0,t[k]=0,null!=o&&v(o,n,t[f],t)}));return c(d.prototype,{clear:function(){for(var t=y(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[k]=0},delete:function(t){var n=y(this,e),o=j(n,t);if(o){var r=o.n,c=o.p;delete n._i[o.i],o.r=!0,c&&(c.n=r),r&&(r.p=c),n._f==o&&(n._f=r),n._l==o&&(n._l=c),n[k]--}return!!o},forEach:function(t){y(this,e);for(var n,o=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(o(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!j(y(this,e),t)}}),m&&o(d.prototype,"size",{get:function(){return y(this,e)[k]}}),d},def:function(t,e,n){var o,r,c=j(t,e);return c?c.v=n:(t._l=c={i:r=w(e,!0),k:e,v:n,p:o=t._l,n:void 0,r:!1},t._f||(t._f=c),o&&(o.n=c),t[k]++,"F"!==r&&(t._i[r]=c)),t},getEntry:j,setStrong:function(t,e,n){f(t,e,(function(t,n){this._t=y(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?d(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,d(1))}),n?"entries":"values",!n,!0),_(e)}}},238:function(t,e,n){"use strict";var o=n(12),r=n(4),c=n(29),l=n(163),meta=n(115),h=n(162),v=n(161),f=n(21),d=n(16),_=n(117),m=n(76),w=n(120);t.exports=function(t,e,n,y,k,j){var O=o[t],K=O,C=k?"set":"add",Q=K&&K.prototype,x={},R=function(t){var e=Q[t];c(Q,t,"delete"==t||"has"==t?function(a){return!(j&&!f(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return j&&!f(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof K&&(j||Q.forEach&&!d((function(){(new K).entries().next()})))){var S=new K,E=S[C](j?{}:-0,1)!=S,B=d((function(){S.has(1)})),P=_((function(t){new K(t)})),F=!j&&d((function(){for(var t=new K,e=5;e--;)t[C](e,e);return!t.has(-0)}));P||((K=e((function(e,n){v(e,K,t);var o=w(new O,e,K);return null!=n&&h(n,k,o[C],o),o}))).prototype=Q,Q.constructor=K),(B||F)&&(R("delete"),R("has"),k&&R("get")),(F||E)&&R(C),j&&Q.clear&&delete Q.clear}else K=y.getConstructor(e,t,k,C),l(K.prototype,n),meta.NEED=!0;return m(K,t),x[t]=K,r(r.G+r.W+r.F*(K!=O),x),j||y.setStrong(K,t,k),K}},239:function(t,e,n){"use strict";n(121);var o=n(78);e.a=Object(o.a)("layout")},240:function(t,e,n){"use strict";var o=n(3),r=(n(54),n(53),n(11),n(40),n(236),n(39),n(14),n(34),n(10),n(13),n(22),n(23),n(164),n(1)),c=n(116),l=n(2);function h(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function v(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(e){Object(o.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f=["sm","md","lg","xl"],d=["start","end","center"];function _(t,e){return f.reduce((function(n,o){return n[t+Object(l.B)(o)]=e(),n}),{})}var m=function(t){return[].concat(d,["baseline","stretch"]).includes(t)},w=_("align",(function(){return{type:String,default:null,validator:m}})),y=function(t){return[].concat(d,["space-between","space-around"]).includes(t)},k=_("justify",(function(){return{type:String,default:null,validator:y}})),j=function(t){return[].concat(d,["space-between","space-around","stretch"]).includes(t)},O=_("alignContent",(function(){return{type:String,default:null,validator:j}})),K={align:Object.keys(w),justify:Object.keys(k),alignContent:Object.keys(O)},C={align:"align",justify:"justify",alignContent:"align-content"};function Q(t,e,n){var o=C[t];if(null!=n){if(e){var r=e.replace(t,"");o+="-".concat(r)}return(o+="-".concat(n)).toLowerCase()}}var x=new Map;e.a=r.a.extend({name:"v-row",functional:!0,props:v(v(v({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:m}},w),{},{justify:{type:String,default:null,validator:y}},k),{},{alignContent:{type:String,default:null,validator:j}},O),render:function(t,e){var n=e.props,data=e.data,r=e.children,l="";for(var h in n)l+=String(n[h]);var v=x.get(l);return v||function(){var t,e;for(e in v=[],K)K[e].forEach((function(t){var o=n[t],r=Q(e,t,o);r&&v.push(r)}));v.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(o.a)(t,"align-".concat(n.align),n.align),Object(o.a)(t,"justify-".concat(n.justify),n.justify),Object(o.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),x.set(l,v)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:v}),r)}})},390:function(t,e,n){"use strict";n.r(e);var o={data:function(){return{assistedQueen:"/images/chess/basic-checkmate-assisted-queen.png",queen:"/images/chess/basic-checkmate-queen.png",rook:"/images/chess/basic-checkmate-rook.png",assistedRooks:"/images/chess/basic-checkmate-two-rooks.png"}},head:{title:"Basic Checkmates",meta:[{hid:"description",name:"description",content:"Chess - Basic Checkmates - Marcelo Fernandes"}]}},r=n(58),c=n(75),l=n.n(c),h=n(232),v=n(239),f=n(240),component=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("Basic Checkmates")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Often when checkmating, one piece is checkmating and another piece is\n        assisting and protecting the first one. This is called\n        "),n("i",[t._v("assisted checkmate")])])]),t._v(" "),n("v-row",[n("h2",[t._v("Assisting the Queen")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Since the King cannot move into check, it is often possible to\n        checkmate by moving the Queen next to the opponent's King and having\n        another piece to support the Queen.\n      ")]),t._v(" "),n("p",[t._v("\n        In this example the move Qxg7# would mean the end of the game.\n      ")])]),t._v(" "),n("v-row",[n("a",{staticClass:"img-link",attrs:{href:t.assistedQueen,target:"_blank"}},[n("img",{attrs:{src:t.assistedQueen}})])]),t._v(" "),n("v-row",[n("h2",[t._v("Checkmate with two Rooks (or a Rook and a Queen)")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        In this case the objective is to push the lone King to the edge of\n        the board. If one Rook (or the Queen) is defending a particular file\n        then the King cannot cross it, and you can force the King to the edge\n        one step at a time until you check it. This works on ranks as well.\n      ")])]),t._v(" "),n("v-row",[n("a",{staticClass:"img-link",attrs:{href:t.assistedRooks,target:"_blank"}},[n("img",{attrs:{src:t.assistedRooks}})])]),t._v(" "),n("v-row",[n("h2",[t._v("Checkmate with the Queen and King")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Follow this process:\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[t._v("\n          Move your Queen to one Knight move away from the enemy's King.\n        ")]),t._v(" "),n("li",[t._v("\n          Mimic each movement from the enemy's King with your Queen until\n          your Queen is at the second rank/file, blocking the King from moving\n          vertically/horizontally. The King will only have two squares to\n          move onto at the corner of the board. Do not move your Queen to a\n          Knight move away from the enemy King at this stage otherwise you\n          will have a stale mate.\n        ")]),t._v(" "),n("li",[t._v("\n          Bring the King close to perform an assisted checkmate with the Queen.\n        ")])])]),t._v(" "),n("v-row",[n("a",{staticClass:"img-link",attrs:{href:t.queen,target:"_blank"}},[n("img",{attrs:{src:t.queen}})])]),t._v(" "),n("v-row",[n("h2",[t._v("Checkmate with the Rook and King")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Follow this process:\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[t._v("\n          Use the Rook to put the opposite King in a box.\n        ")]),t._v(" "),n("li",[t._v("\n          Bring your King towards the Rook for protection.\n        ")]),t._v(" "),n("li",[t._v("\n          If possible, shrink the box with the Rook. If not, move your King\n          closer to the opposite King.\n        ")]),t._v(" "),n("li",[t._v("\n          Once the opposite King is on a corner, checkmate by using your Rook\n          while the King is covering the missing squares.\n        ")])])]),t._v(" "),n("v-row",[n("a",{staticClass:"img-link",attrs:{href:t.rook,target:"_blank"}},[n("img",{attrs:{src:t.rook}})])]),t._v(" "),n("v-row",[n("h2",[t._v("Another piece + King")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Unfortunately only the Queen and Rook can, by themselves, help the\n        King to checkmate.\n      ")])])],1)],1)}),[],!1,null,"cf67d010",null);e.default=component.exports;l()(component,{VFlex:h.a,VLayout:v.a,VRow:f.a})}}]);