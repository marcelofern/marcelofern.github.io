(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{220:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},221:function(t,e,n){"use strict";var strong=n(222),r=n(220);t.exports=n(223)("Map",(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,"Map"),t);return e&&e.v},set:function(t,e){return strong.def(r(this,"Map"),0===t?0:t,e)}},strong,!0)},222:function(t,e,n){"use strict";var r=n(28).f,o=n(73),v=n(147),l=n(50),c=n(145),f=n(146),_=n(105),m=n(148),h=n(106),d=n(22),w=n(103).fastKey,y=n(220),k=d?"_s":"size",x=function(t,e){var n,r=w(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,_){var m=t((function(t,r){c(t,m,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[k]=0,null!=r&&f(r,n,t[_],t)}));return v(m.prototype,{clear:function(){for(var t=y(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[k]=0},delete:function(t){var n=y(this,e),r=x(n,t);if(r){var o=r.n,v=r.p;delete n._i[r.i],r.r=!0,v&&(v.n=o),o&&(o.p=v),n._f==r&&(n._f=o),n._l==r&&(n._l=v),n[k]--}return!!r},forEach:function(t){y(this,e);for(var n,r=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!x(y(this,e),t)}}),d&&r(m.prototype,"size",{get:function(){return y(this,e)[k]}}),m},def:function(t,e,n){var r,o,v=x(t,e);return v?v.v=n:(t._l=v={i:o=w(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=v),r&&(r.n=v),t[k]++,"F"!==o&&(t._i[o]=v)),t},getEntry:x,setStrong:function(t,e,n){_(t,e,(function(t,n){this._t=y(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this._k,e=this._l;e&&e.r;)e=e.p;return this._t&&(this._l=e=e?e.n:this._t._f)?m(0,"keys"==t?e.k:"values"==t?e.v:[e.k,e.v]):(this._t=void 0,m(1))}),n?"entries":"values",!n,!0),h(e)}}},223:function(t,e,n){"use strict";var r=n(12),o=n(7),v=n(29),l=n(147),meta=n(103),c=n(146),f=n(145),_=n(21),m=n(23),h=n(104),d=n(72),w=n(107);t.exports=function(t,e,n,y,k,x){var j=r[t],O=j,C=k?"set":"add",I=O&&O.prototype,P={},S=function(t){var e=I[t];v(I,t,"delete"==t||"has"==t?function(a){return!(x&&!_(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return x&&!_(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof O&&(x||I.forEach&&!m((function(){(new O).entries().next()})))){var U=new O,E=U[C](x?{}:-0,1)!=U,T=m((function(){U.has(1)})),M=h((function(t){new O(t)})),D=!x&&m((function(){for(var t=new O,e=5;e--;)t[C](e,e);return!t.has(-0)}));M||((O=e((function(e,n){f(e,O,t);var r=w(new j,e,O);return null!=n&&c(n,k,r[C],r),r}))).prototype=I,I.constructor=O),(T||D)&&(S("delete"),S("has"),k&&S("get")),(D||E)&&S(C),x&&I.clear&&delete I.clear}else O=y.getConstructor(e,t,k,C),l(O.prototype,n),meta.NEED=!0;return d(O,t),P[t]=O,o(o.G+o.W+o.F*(O!=j),P),x||y.setStrong(O,t,k),O}},224:function(t,e,n){"use strict";n(108);var r=n(75);e.a=Object(r.a)("layout")},225:function(t,e,n){"use strict";n(27),n(13);var r=n(3),o=(n(37),n(221),n(38),n(6),n(4),n(16),n(54),n(55),n(149),n(1)),v=n(109),l=n(2);function c(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?c(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):c(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var _=["sm","md","lg","xl"],m=["start","end","center"];function h(t,e){return _.reduce((function(n,r){return n[t+Object(l.n)(r)]=e(),n}),{})}var d=function(t){return[].concat(m,["baseline","stretch"]).includes(t)},w=h("align",(function(){return{type:String,default:null,validator:d}})),y=function(t){return[].concat(m,["space-between","space-around"]).includes(t)},k=h("justify",(function(){return{type:String,default:null,validator:y}})),x=function(t){return[].concat(m,["space-between","space-around","stretch"]).includes(t)},j=h("alignContent",(function(){return{type:String,default:null,validator:x}})),O={align:Object.keys(w),justify:Object.keys(k),alignContent:Object.keys(j)},C={align:"align",justify:"justify",alignContent:"align-content"};function I(t,e,n){var r=C[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var P=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:f(f(f({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},w),{},{justify:{type:String,default:null,validator:y}},k),{},{alignContent:{type:String,default:null,validator:x}},j),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var c in n)l+=String(n[c]);var f=P.get(l);return f||function(){var t,e;for(e in f=[],O)O[e].forEach((function(t){var r=n[t],o=I(e,t,r);o&&f.push(o)}));f.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),P.set(l,f)}(),t(n.tag,Object(v.a)(data,{staticClass:"row",class:f}),o)}})},251:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{ramonUrl:"https://github.com/ramonsaraiva",vimrcUrl:"https://github.com/marcelofern/dotfiles/blob/master/.config/nvim/init.vim",vimPicUrl:"/images/vim/vim_config.png",gruvboxUrl:"https://github.com/morhetz/gruvbox",gruvPicUrl:"/images/vim/vim_gruvbox.png"}},head:{title:"Vim - MarceloFern",meta:[{hid:"description",name:"description",content:"Vim for software engineers - Marcelo Fernandes"}]}},o=n(56),v=n(74),l=n.n(v),c=n(217),f=n(224),_=n(225),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("\n        VIM \n        "),n("span",{staticClass:"medium-text"},[n("i",[t._v("(for software engineers)")])])])]),t._v(" "),n("v-row",[n("p",{staticClass:"caption"},[t._v("Date: 2020-08-31")])]),t._v(" "),n("v-row",[n("p",[n("strong",[n("i",[t._v("TL;DR --")])]),t._v(" Here is my\n        "),n("a",{attrs:{href:t.vimrcUrl,target:"_blank"}},[t._v("vimrc file.")])])]),t._v(" "),n("v-row",[n("p",[t._v("\n        I came across "),n("i",[t._v("vim")]),t._v(" for the first time when I needed to\n        edit a file on a remote server. The first Google\n        result pointed me towards two tools: "),n("i",[t._v("Vim")]),t._v(" and "),n("i",[t._v("Nano")]),t._v(".\n        I tried "),n("i",[t._v("vim")]),t._v(" first. As I began typing,\n        the most insane things started to happen:\n        words being deleted, the cursor\n        going up and down, a nightmare. I freaked out and forcefully \n        "),n("i",[t._v("killed")]),t._v(" the terminal because I\n        didn't know how to close "),n("i",[t._v("vim")]),t._v(". I then tried "),n("i",[t._v("Nano")]),t._v(".\n        After that prior experience, I was happy to press\n        and hold the arrow key down to the line\n        I needed to delete, and then proceed to hold\n        the delete key for all its 100 characters or so.\n      ")]),t._v(" "),n("p",[t._v("\n        It wasn't until later that I would understand what I just missed.\n        During a few code-pairing sections I witnessed my ex-colleague at\n        work (now friend,\n        "),n("a",{attrs:{href:t.ramonUrl,target:"_blank"}},[t._v("@ramonsaraiva")]),t._v(")\n        taming "),n("i",[t._v("vim")]),t._v(" flawlessly. I was sold right after I asked\n        him a few questions about his environment.\n        That was a triggering point\n        that culminated on my customised "),n("i",[t._v("vim")]),t._v("\n        work-flow.\n      ")])]),t._v(" "),n("v-row",[n("h2",[t._v("Should I learn "),n("i",[t._v("vim")]),t._v("?")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        If you only poke files occasionally, customising\n        "),n("i",[t._v("vim")]),t._v(" is probably not worth the effort.\n        But if you work as a software engineer \n        you probably spend a lot of time editing text files.\n        Therefore having knowledge of an advanced text editor\n        becomes an asset.\n      ")]),t._v(" "),n("p",[t._v("\n        One other thing preventing people of using "),n("i",[t._v("vim")]),t._v(' is the\n        movement commands. Although they can look intimidating at first,\n        there is logic to them. Once they are familiar, you\n        will edit text faster than in other editors. If you spend a long\n        enough time, you will be able to start "guessing" new\n        movement commands because you know what the fundamentals are.\n        But please be aware that to learn '),n("i",[t._v("vim")]),t._v(" you will\n        need to dedicate some time apart. But it will be worth it.\n      ")])]),t._v(" "),n("v-row",[n("h2",[t._v("My customised setup")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        This is what my customised setup looks like:\n      ")])]),t._v(" "),n("v-row",[n("a",{attrs:{href:t.vimPicUrl,target:"_blank"}},[n("img",{attrs:{src:t.vimPicUrl}})])]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])]),t._v(" "),n("v-row",[n("h2",[t._v("Main plug-ins")])]),t._v(" "),n("v-row",[n("p",[n("strong",[n("i",[t._v("for a full list of plug-ins visit:")])]),t._v(" "),n("a",{attrs:{href:t.vimrcUrl,target:"_blank"}},[t._v("my vimrc file.")])])]),t._v(" "),n("v-row",[n("h3",[t._v("CtrlP")])]),t._v(" "),n("v-row",[n("p",[n("a",{attrs:{href:"https://github.com/kien/ctrlp.vim",target:"_blank"}},[t._v("\n          CtrlP\n        ")]),t._v("\n        is a fuzzy file finder for "),n("i",[t._v("vim")]),t._v(".\n      ")])]),t._v(" "),n("v-row",[n("a",{attrs:{href:"/images/vim/vim_ctrlp.png",target:"_blank"}},[n("img",{attrs:{src:"/images/vim/vim_ctrlp.png"}})])]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])]),t._v(" "),n("v-row",[n("h3",[t._v("Ack")])]),t._v(" "),n("v-row",[n("p",[n("a",{attrs:{href:"https://github.com/mileszs/ack.vim",target:"_blank"}},[t._v("\n          Ack\n        ")]),t._v("\n        is a similar tool to Ctrlp, but instead of searching for files,\n        it searches for strings. It is claimed to replace 99% of\n        the usages of "),n("i",[t._v("grep")])])]),t._v(" "),n("v-row",[n("a",{attrs:{href:"/images/vim/vim_ack.png",target:"_blank"}},[n("img",{attrs:{src:"/images/vim/vim_ack.png"}})])]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])]),t._v(" "),n("v-row",[n("h3",[t._v("Fugitive")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        A git integration for vim."),n("br"),t._v("\n        This plug-in along with\n        "),n("a",{attrs:{href:"https://github.com/airblade/vim-gitgutter",target:"_blank"}},[t._v("\n          gitgutter\n        ")]),t._v("provides useful visual marks \n        on your files (additions/removals/changes),\n        commands to roll back changes, navigate through them,\n        analyse gitblame, and much more.\n      ")])]),t._v(" "),n("v-row",[n("a",{attrs:{href:"/images/vim/vim_fugitive.png",target:"_blank"}},[n("img",{attrs:{src:"/images/vim/vim_fugitive.png"}})])]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])]),t._v(" "),n("v-row",[n("h3",[t._v("NerdTree")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        One of the most popular plug-ins for vim.\n        NerdTree is a file system explorer for vim.\n      ")])]),t._v(" "),n("v-row",[n("a",{attrs:{href:"/images/vim/nerd_tree.png",target:"_blank"}},[n("img",{attrs:{src:"/images/vim/nerd_tree.png"}})])]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])]),t._v(" "),n("v-row",[n("h3",[t._v("Gruvbox")])]),t._v(" "),n("v-row",[n("p",[n("a",{attrs:{href:t.gruvboxUrl,target:"_blank"}},[t._v("Gruvbox")]),t._v("\n        is a colour scheme for "),n("i",[t._v("vim")]),t._v("."),n("br"),t._v("\n        This library is what makes my "),n("i",[t._v("vim")]),t._v(" look like the\n        image below."),n("br"),t._v("\n        Its syntax highlighting works pretty smoothly with any common\n        programming language.\n      ")]),t._v(" "),n("a",{attrs:{href:t.vimPicUrl,target:"_blank"}},[n("img",{attrs:{src:t.vimPicUrl}})]),t._v(" "),n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])]),t._v(" "),n("br")],1)],1)}),[],!1,null,"3cf770c3",null);e.default=component.exports;l()(component,{VFlex:c.a,VLayout:f.a,VRow:_.a})}}]);