(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{235:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},236:function(t,e,n){"use strict";var strong=n(237),r=n(235),o="Map";t.exports=n(238)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,o),t);return e&&e.v},set:function(t,e){return strong.def(r(this,o),0===t?0:t,e)}},strong,!0)},237:function(t,e,n){"use strict";var r=n(27).f,o=n(77),l=n(163),c=n(55),v=n(161),f=n(162),_=n(118),A=n(164),h=n(119),d=n(24),T=n(115).fastKey,B=n(235),w=d?"_s":"size",D=function(t,e){var n,r=T(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,_){var A=t((function(t,r){v(t,A,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[w]=0,null!=r&&f(r,n,t[_],t)}));return l(A.prototype,{clear:function(){for(var t=B(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[w]=0},delete:function(t){var n=B(this,e),r=D(n,t);if(r){var o=r.n,l=r.p;delete n._i[r.i],r.r=!0,l&&(l.n=o),o&&(o.p=l),n._f==r&&(n._f=o),n._l==r&&(n._l=l),n[w]--}return!!r},forEach:function(t){B(this,e);for(var n,r=c(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!D(B(this,e),t)}}),d&&r(A.prototype,"size",{get:function(){return B(this,e)[w]}}),A},def:function(t,e,n){var r,o,l=D(t,e);return l?l.v=n:(t._l=l={i:o=T(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=l),r&&(r.n=l),t[w]++,"F"!==o&&(t._i[o]=l)),t},getEntry:D,setStrong:function(t,e,n){_(t,e,(function(t,n){this._t=B(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?A(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,A(1))}),n?"entries":"values",!n,!0),h(e)}}},238:function(t,e,n){"use strict";var r=n(12),o=n(4),l=n(29),c=n(163),meta=n(115),v=n(162),f=n(161),_=n(21),A=n(16),h=n(117),d=n(76),T=n(120);t.exports=function(t,e,n,B,w,D){var $=r[t],G=$,I=w?"set":"add",y=G&&G.prototype,k={},m=function(t){var e=y[t];l(y,t,"delete"==t||"has"==t?function(a){return!(D&&!_(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return D&&!_(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof G&&(D||y.forEach&&!A((function(){(new G).entries().next()})))){var j=new G,O=j[I](D?{}:-0,1)!=j,P=A((function(){j.has(1)})),x=h((function(t){new G(t)})),E=!D&&A((function(){for(var t=new G,e=5;e--;)t[I](e,e);return!t.has(-0)}));x||((G=e((function(e,n){f(e,G,t);var r=T(new $,e,G);return null!=n&&v(n,w,r[I],r),r}))).prototype=y,y.constructor=G),(P||E)&&(m("delete"),m("has"),w&&m("get")),(E||O)&&m(I),D&&y.clear&&delete y.clear}else G=B.getConstructor(e,t,w,I),c(G.prototype,n),meta.NEED=!0;return d(G,t),k[t]=G,o(o.G+o.W+o.F*(G!=$),k),D||B.setStrong(G,t,w),G}},239:function(t,e,n){"use strict";n(121);var r=n(78);e.a=Object(r.a)("layout")},240:function(t,e,n){"use strict";var r=n(3),o=(n(54),n(53),n(11),n(40),n(236),n(39),n(14),n(34),n(10),n(13),n(22),n(23),n(165),n(1)),l=n(116),c=n(2);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _=["sm","md","lg","xl"],A=["start","end","center"];function h(t,e){return _.reduce((function(n,r){return n[t+Object(c.B)(r)]=e(),n}),{})}var d=function(t){return[].concat(A,["baseline","stretch"]).includes(t)},T=h("align",(function(){return{type:String,default:null,validator:d}})),B=function(t){return[].concat(A,["space-between","space-around"]).includes(t)},w=h("justify",(function(){return{type:String,default:null,validator:B}})),D=function(t){return[].concat(A,["space-between","space-around","stretch"]).includes(t)},$=h("alignContent",(function(){return{type:String,default:null,validator:D}})),G={align:Object.keys(T),justify:Object.keys(w),alignContent:Object.keys($)},I={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,n){var r=I[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var k=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:f(f(f({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},T),{},{justify:{type:String,default:null,validator:B}},w),{},{alignContent:{type:String,default:null,validator:D}},$),render:function(t,e){var n=e.props,data=e.data,o=e.children,c="";for(var v in n)c+=String(n[v]);var f=k.get(c);return f||function(){var t,e;for(e in f=[],G)G[e].forEach((function(t){var r=n[t],o=y(e,t,r);o&&f.push(o)}));f.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),k.set(c,f)}(),t(n.tag,Object(l.a)(data,{staticClass:"row",class:f}),o)}})},369:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{}},head:{title:"BTW (Burrows-Wheeler-Transform)",meta:[{hid:"description",name:"description",content:"Burrows Wheeler Transform (BWT) - Marcelo Fernandes"}]}},o=n(58),l=n(75),c=n.n(l),v=n(232),f=n(239),_=n(240),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("Burrows Wheeler Transform (BWT)")])]),t._v(" "),n("v-row",[n("p",{staticClass:"caption"},[t._v("Date: 2020-11-13")])]),t._v(" "),n("v-row",[n("p",[t._v("\n          BWT is a text transformation technique. It can be used to improve\n          the efficiency of data-compression algorithms (such as bzip2)."),n("br"),t._v("\n          The transformation can be reversed knowing just the\n          position of the first character.\n        ")]),t._v(" "),n("p",[t._v("\n          For a string that contains many repeated strings (or sub-strings),\n          such as:\n        ")])]),t._v(" "),n("v-row",[n("blockquote",[t._v("\n          Peter Piper picked a peck of pickled peppers\n          A peck of pickled peppers Peter Piper picked^\n        ")])]),t._v(" "),n("v-row",[n("p",[t._v("\n          The equivalent BWT string will be:\n        ")])]),t._v(" "),n("v-row",[n("blockquote",[t._v("\n          ssrrdkkaAddrrffd ^ eeiiiieeeeppkllkppttppppPPooppppPPcccccckk\n          iipp eeeeeeeerree\n        ")])]),t._v(" "),n("v-row",[n("p",[t._v("\n          Take a note of how many repeated characters are in the string above.\n          This output will be easy to compress due to the high number of\n          repeated characters.\n        ")])]),t._v(" "),n("v-row",[n("h2",[t._v("Example: Transforming a string into its BWT version")])]),t._v(" "),n("v-row",[n("p",[t._v("\n          Let's transform the string "),n("b",[t._v("BIGDATA$")]),t._v(". Note how $ is appended\n          to indicate the end of the string.\n        ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[t._v("\n            Firstly, create a list with all the N circular shifts of your\n            input, where N = the string length:\n            "),n("br"),t._v(" "),n("ul",[n("li",[t._v("BIGDATA$")]),t._v(" "),n("li",[t._v("IGDATA$B")]),t._v(" "),n("li",[t._v("GDATA$BI")]),t._v(" "),n("li",[t._v("DATA$BIG")]),t._v(" "),n("li",[t._v("ATA$BIGD")]),t._v(" "),n("li",[t._v("TA$BIGDA")]),t._v(" "),n("li",[t._v("A$BIGDAT")]),t._v(" "),n("li",[t._v("$BIGDATA")])])]),n("li",[t._v("\n              Now we want to sort the circular shifts above alphabetically\n              (but considering the characters ^ and $ too)."),n("br"),t._v(" "),n("ul",[n("li",[t._v("$BIGDATA")]),t._v(" "),n("li",[t._v("A$BIGDAT")]),t._v(" "),n("li",[t._v("ATA$BIGD")]),t._v(" "),n("li",[t._v("BIGDATA$")]),t._v(" "),n("li",[t._v("DATA$BIG")]),t._v(" "),n("li",[t._v("GDATA$BI")]),t._v(" "),n("li",[t._v("IGDATA$B")]),t._v(" "),n("li",[t._v("TA$BIGDA")])])]),t._v(" "),n("li",[t._v("\n            The last step is to select the "),n("b",[t._v("last")]),t._v(" character of each\n            sorted entry from the list above. Therefore our result is:\n            "),n("b",[n("i",[t._v("ATD$GIBA")])])])])]),t._v(" "),n("v-row",[n("p",[t._v("Here is a Python script that would create this transform:")])]),t._v(" "),n("v-row",[n("blockquote",[n("pre",[t._v("def bwt_transform(string):\n    string += '$'\n    table = sorted(string[i:] + string[:i] for i in range(len(string)))\n    return ''.join([row[-1:] for row in table])\n        ")])])]),t._v(" "),n("v-row",[n("h2",[t._v("Example: Reverting the transformed string back")])]),t._v(" "),n("v-row",[n("p",[t._v("\n          Let's grab our string from the previous section\n          and revert it back to the original.\n        ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[t._v("\n            Break the string down to its characters and sort them\n            alphabetically: "),n("b",[n("i",[t._v("$, A, A, B, D, G, I, T")])])]),t._v(" "),n("li",[t._v("\n            Break the string down again, append the previous group,\n            and sort it alphabetically:"),n("br"),t._v("\n            1: Break it down and append:\n            "),n("b",[n("i",[t._v("A$, TA, DA, $B, GD, IG, BI, AT")])]),n("br"),t._v("\n            2: Sort alphabetically:\n            "),n("b",[n("i",[t._v("$B, A$, AT, BI, DA, GD, IG, TA")])]),n("br")]),t._v(" "),n("li",[t._v("\n            This process is repeated over and over, until you have the full\n            length of the string:\n          ")]),t._v(" "),n("li",[n("ol",[n("li",[t._v("['$', 'A', 'A', 'B', 'D', 'G', 'I', 'T']")]),t._v(" "),n("li",[t._v("['$B', 'A$', 'AT', 'BI', 'DA', 'GD', 'IG', 'TA']")]),t._v(" "),n("li",[t._v("['$BI', 'A$B', 'ATA', 'BIG', 'DAT', 'GDA', 'IGD', 'TA$']")]),t._v(" "),n("li",[t._v("['$BIG', 'A$BI', 'ATA$', 'BIGD', 'DATA', 'GDAT', 'IGDA', 'TA$B']")]),t._v(" "),n("li",[t._v("['$BIGD', 'A$BIG', 'ATA$B', 'BIGDA', 'DATA$', 'GDATA', 'IGDAT', 'TA$BI']")]),t._v(" "),n("li",[t._v("['$BIGDA', 'A$BIGD', 'ATA$BI', 'BIGDAT', 'DATA$B', 'GDATA$', 'IGDATA', 'TA$BIG']")]),t._v(" "),n("li",[t._v("['$BIGDAT', 'A$BIGDA', 'ATA$BIG', 'BIGDATA', 'DATA$BI', 'GDATA$B', 'IGDATA$', 'TA$BIGD']")]),t._v(" "),n("li",[t._v("['$BIGDATA', 'A$BIGDAT', 'ATA$BIGD', 'BIGDATA$', 'DATA$BIG', 'GDATA$BI', 'IGDATA$B', 'TA$BIGDA']")])])]),t._v(" "),n("li",[t._v("\n            Then the last step is to find the element in the last list that\n            ends with $: "),n("b",[t._v("BIGDATA$")])])])]),t._v(" "),n("v-row",[n("p",[t._v("Here is a python script to reverse the BWT")])]),t._v(" "),n("v-row",[n("blockquote",[n("pre",[t._v("def bwt_reverse_transform(string):\n    table = [''] * len(string)\n    for i in range(len(string)):\n        table = sorted(string[i] + table[i] for i in range(len(string)))\n    return [i for i in table if i.endswith('$')][0]\n          ")])])]),t._v(" "),n("v-row")],1)],1)}),[],!1,null,"4a413bb5",null);e.default=component.exports;c()(component,{VFlex:v.a,VLayout:f.a,VRow:_.a})}}]);