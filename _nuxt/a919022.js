(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{232:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},233:function(t,e,n){"use strict";var strong=n(234),r=n(232),o="Map";t.exports=n(235)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,o),t);return e&&e.v},set:function(t,e){return strong.def(r(this,o),0===t?0:t,e)}},strong,!0)},234:function(t,e,n){"use strict";var r=n(27).f,o=n(77),c=n(160),l=n(55),f=n(158),h=n(159),d=n(115),v=n(161),y=n(116),m=n(24),w=n(112).fastKey,_=n(232),k=m?"_s":"size",j=function(t,e){var n,r=w(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,d){var v=t((function(t,r){f(t,v,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[k]=0,null!=r&&h(r,n,t[d],t)}));return c(v.prototype,{clear:function(){for(var t=_(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[k]=0},delete:function(t){var n=_(this,e),r=j(n,t);if(r){var o=r.n,c=r.p;delete n._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),n._f==r&&(n._f=o),n._l==r&&(n._l=c),n[k]--}return!!r},forEach:function(t){_(this,e);for(var n,r=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!j(_(this,e),t)}}),m&&r(v.prototype,"size",{get:function(){return _(this,e)[k]}}),v},def:function(t,e,n){var r,o,c=j(t,e);return c?c.v=n:(t._l=c={i:o=w(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[k]++,"F"!==o&&(t._i[o]=c)),t},getEntry:j,setStrong:function(t,e,n){d(t,e,(function(t,n){this._t=_(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?v(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,v(1))}),n?"entries":"values",!n,!0),y(e)}}},235:function(t,e,n){"use strict";var r=n(12),o=n(4),c=n(29),l=n(160),meta=n(112),f=n(159),h=n(158),d=n(21),v=n(16),y=n(114),m=n(76),w=n(117);t.exports=function(t,e,n,_,k,j){var O=r[t],x=O,C=k?"set":"add",M=x&&x.prototype,S={},P=function(t){var e=M[t];c(M,t,"delete"==t||"has"==t?function(a){return!(j&&!d(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return j&&!d(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof x&&(j||M.forEach&&!v((function(){(new x).entries().next()})))){var E=new x,A=E[C](j?{}:-0,1)!=E,I=v((function(){E.has(1)})),D=y((function(t){new x(t)})),F=!j&&v((function(){for(var t=new x,e=5;e--;)t[C](e,e);return!t.has(-0)}));D||((x=e((function(e,n){h(e,x,t);var r=w(new O,e,x);return null!=n&&f(n,k,r[C],r),r}))).prototype=M,M.constructor=x),(I||F)&&(P("delete"),P("has"),k&&P("get")),(F||A)&&P(C),j&&M.clear&&delete M.clear}else x=_.getConstructor(e,t,k,C),l(x.prototype,n),meta.NEED=!0;return m(x,t),S[t]=x,o(o.G+o.W+o.F*(x!=O),S),j||_.setStrong(x,t,k),x}},236:function(t,e,n){"use strict";n(118);var r=n(78);e.a=Object(r.a)("layout")},237:function(t,e,n){"use strict";var r=n(3),o=(n(54),n(53),n(11),n(40),n(233),n(39),n(14),n(34),n(10),n(13),n(22),n(23),n(162),n(1)),c=n(113),l=n(2);function f(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function h(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var d=["sm","md","lg","xl"],v=["start","end","center"];function y(t,e){return d.reduce((function(n,r){return n[t+Object(l.B)(r)]=e(),n}),{})}var m=function(t){return[].concat(v,["baseline","stretch"]).includes(t)},w=y("align",(function(){return{type:String,default:null,validator:m}})),_=function(t){return[].concat(v,["space-between","space-around"]).includes(t)},k=y("justify",(function(){return{type:String,default:null,validator:_}})),j=function(t){return[].concat(v,["space-between","space-around","stretch"]).includes(t)},O=y("alignContent",(function(){return{type:String,default:null,validator:j}})),x={align:Object.keys(w),justify:Object.keys(k),alignContent:Object.keys(O)},C={align:"align",justify:"justify",alignContent:"align-content"};function M(t,e,n){var r=C[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var S=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:h(h(h({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:m}},w),{},{justify:{type:String,default:null,validator:_}},k),{},{alignContent:{type:String,default:null,validator:j}},O),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var f in n)l+=String(n[f]);var h=S.get(l);return h||function(){var t,e;for(e in h=[],x)x[e].forEach((function(t){var r=n[t],o=M(e,t,r);o&&h.push(o)}));h.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),S.set(l,h)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:h}),o)}})},265:function(t,e,n){var content=n(338);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(33).default)("5585af76",content,!0,{sourceMap:!1})},337:function(t,e,n){"use strict";n(265)},338:function(t,e,n){var r=n(32)(!1);r.push([t.i,".book-pic[data-v-b26ad0a4]{display:block;width:50%;margin:0 auto}",""]),t.exports=r},394:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{bookPicUrl:"/images/books/meditations-marcus-aurelius.jpg"}},head:{title:"Meditations",meta:[{hid:"description",name:"description",content:"Meditations, Marcus Aurelius - by Marcelo Fernandes"}]}},o=(n(337),n(58)),c=n(75),l=n.n(c),f=n(229),h=n(236),d=n(237),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("Meditations, Marcus Aurelius")])]),t._v(" "),n("v-row",[n("p",[n("br"),n("br")]),t._v(" "),n("p",{staticClass:"caption"},[t._v("Date: 2021-01-24")])]),t._v(" "),n("v-row",{staticClass:"book-pic"},[n("a",{staticClass:"img-link",attrs:{href:t.bookPicUrl,target:"_blank"}},[n("img",{attrs:{src:t.bookPicUrl}})]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("br"),t._v(" "),n("i",[t._v("Click on the image to expand it in a new tab.")])])])],1),t._v(" "),n("v-row",{staticClass:"text-align: justify;"},[n("p",[n("i",[n("br"),n("br"),t._v('\n        "(...) Say to yourself in the early morning: I shall meet today\n        inquisitive, ungrateful, violent, treacherous, envious,\n        uncharitable men.\n        All these things have come upon them through ignorance of real\n        good and ill. But I, because I have seen that the nature of good\n        is the right, and of ill the wrong, and that the nature of the man\n        himself who does wrong is akin to my own (not of the same blood and\n        seed, but partaking with me in mind, that is in a portion of\n        divinity), I can neither be harmed by any of them, for no man will\n        involve me in wrong, nor can I be angry with my kinsman or hate\n        him; for we have come into the wolrd to work together, like feet,\n        like hands, like eyelids, like the rows of upper and lower teeth.\n        To work against one another therefore is to oppose Nature, and to\n        be vexed with another or to turn away from him is to tend to\n        antagonism." - Marcus Aurelius\n      ')])])]),t._v(" "),n("v-row",[n("p",[n("br"),t._v("---"),n("br"),n("br")])]),t._v(" "),n("v-row",[n("h2",[t._v("Marcus who?")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Marcus Aurelius (121 - 180 AD) was a Roman emperor from 161 to\n        180, and also a stoic philosopher. He inherited the empire from\n        his uncle Antonius Pius after the later died. Marcus was educated at\n        home, as most aristocratic children those days. He was taught by\n        masters from different areas, and learned oratory from two\n        of the most esteemed orators of their time, Herodes Atticus and\n        Caninius Celer.\n      ")]),t._v(" "),n("p",[t._v('\n        "Meditations" is a compilation of several excerpts from Marcus\n        Aurelius diary. The book as it came to be, is further divided in 12\n        smaller books, which represent different periods of his life.\n        The collection is neither in chronological order nor was \n        intended to be read by anyone but himself.\n      ')])]),t._v(" "),n("v-row",[n("h2",[t._v("Opinions")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Marcus' writing style is very distinct from most modern philosophy\n        books. The text is straight to the point, Marcus does not find\n        use in any jargon or technically, his writing is nothing but\n        clear and concise.\n      ")]),t._v(" "),n("p",[t._v("\n        Aurelius' perspective of time is what gives rise to most of his\n        reasoning. Here is my interpretation of his ideas: "),n("b",[n("i",[t._v("Man\n        can live for several decades, but they will eventually die.\n        Just as many did before him, and as many will do for several\n        years after his death.\n        If a man is glorious in his life, and if he is remembered by\n        many that come after him, these men who remember his legacy will\n        also eventually die. With their death, his memory also vanishes\n        away. So why worry about glory? Why worry about legacies? Why fight\n        against Nature? Won't Nature get back what is hers in due time?\n        If that is so, a man should be grateful for the time Nature has given\n        to him, and to his existence. Instead of preoccupying about\n        things that are out of his control, he should direct his\n        focus towards being a good man,\n        and keeping his ethics to the highest standard.")])])])])],1)],1)}),[],!1,null,"b26ad0a4",null);e.default=component.exports;l()(component,{VFlex:f.a,VLayout:h.a,VRow:d.a})}}]);