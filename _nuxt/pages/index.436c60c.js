(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{217:function(t,n,e){"use strict";e(111);var r=e(74);n.a=Object(r.a)("layout")},218:function(t,n,e){"use strict";e(26),e(12);var r=e(3),o=(e(46),e(209),e(47),e(6),e(4),e(17),e(58),e(59),e(145),e(0)),c=e(112),l=e(2);function f(object,t){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var e=Object.getOwnPropertySymbols(object);t&&(e=e.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),n.push.apply(n,e)}return n}function d(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?f(Object(source),!0).forEach((function(n){Object(r.a)(t,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):f(Object(source)).forEach((function(n){Object.defineProperty(t,n,Object.getOwnPropertyDescriptor(source,n))}))}return t}var v=["sm","md","lg","xl"],y=["start","end","center"];function j(t,n){return v.reduce((function(e,r){return e[t+Object(l.n)(r)]=n(),e}),{})}var O=function(t){return[].concat(y,["baseline","stretch"]).includes(t)},w=j("align",(function(){return{type:String,default:null,validator:O}})),m=function(t){return[].concat(y,["space-between","space-around"]).includes(t)},C=j("justify",(function(){return{type:String,default:null,validator:m}})),h=function(t){return[].concat(y,["space-between","space-around","stretch"]).includes(t)},x=j("alignContent",(function(){return{type:String,default:null,validator:h}})),_={align:Object.keys(w),justify:Object.keys(C),alignContent:Object.keys(x)},k={align:"align",justify:"justify",alignContent:"align-content"};function S(t,n,e){var r=k[t];if(null!=e){if(n){var o=n.replace(t,"");r+="-".concat(o)}return(r+="-".concat(e)).toLowerCase()}}var P=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:O}},w),{},{justify:{type:String,default:null,validator:m}},C),{},{alignContent:{type:String,default:null,validator:h}},x),render:function(t,n){var e=n.props,data=n.data,o=n.children,l="";for(var f in e)l+=String(e[f]);var d=P.get(l);return d||function(){var t,n;for(n in d=[],_)_[n].forEach((function(t){var r=e[t],o=S(n,t,r);o&&d.push(o)}));d.push((t={"no-gutters":e.noGutters,"row--dense":e.dense},Object(r.a)(t,"align-".concat(e.align),e.align),Object(r.a)(t,"justify-".concat(e.justify),e.justify),Object(r.a)(t,"align-content-".concat(e.alignContent),e.alignContent),t)),P.set(l,d)}(),t(e.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},220:function(t,n,e){var content=e(230);"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(32).default)("108111e5",content,!0,{sourceMap:!1})},229:function(t,n,e){"use strict";var r=e(220);e.n(r).a},230:function(t,n,e){(n=e(31)(!1)).push([t.i,"#app .layout[data-v-5a0a626f]{height:70vh}#app .section-wrapper[data-v-5a0a626f]{padding-bottom:1em}",""]),t.exports=n},237:function(t,n,e){"use strict";e.r(n);var r={data:function(){return{hideFooter:!0}},head:{title:"Home",meta:[{hid:"description",name:"description",content:"Marcelo - Software Engineer -  Wellington NZ"}]}},o=(e(229),e(53)),c=e(73),l=e.n(c),f=e(216),d=e(217),v=e(218),component=Object(o.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-layout",{attrs:{id:"layout",column:"","justify-center":"","align-center":""}},[e("v-flex",{attrs:{xs6:"",sm6:"",md6:""}},[e("v-row",[e("div",{staticClass:"section-wrapper"},[e("span",{staticClass:"medium-text"},[t._v(">>")]),t._v(" "),e("NuxtLink",{staticClass:"big-link",attrs:{to:"/projects"}},[t._v("\n          PROJECTS\n        ")])],1)]),t._v(" "),e("v-row",[e("div",{staticClass:"section-wrapper"},[e("span",{staticClass:"medium-text"},[t._v(">>")]),t._v(" "),e("NuxtLink",{staticClass:"big-link",attrs:{to:"/academia"}},[t._v("\n          ACADEMIA\n        ")])],1)]),t._v(" "),e("v-row",[e("div",{staticClass:"section-wrapper"},[e("span",{staticClass:"medium-text"},[t._v(">>")]),t._v(" "),e("NuxtLink",{staticClass:"big-link",attrs:{to:"/about"}},[t._v("\n          MARCELO?\n        ")])],1)])],1)],1)}),[],!1,null,"5a0a626f",null);n.default=component.exports;l()(component,{VFlex:f.a,VLayout:d.a,VRow:v.a})}}]);