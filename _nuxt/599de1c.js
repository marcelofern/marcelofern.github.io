(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{147:function(t,o,e){var content=e(201);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(33).default)("7388ab72",content,!0,{sourceMap:!1})},159:function(t,o,e){"use strict";e(18);var r={data:function(){return{}},computed:{showFooter:function(){return"index"!==this.$nuxt.$route.name}}},n=e(58),l=e(75),d=e.n(l),c=e(230),f=e(231),m=e(232),x=e(234),h=e(233),component=Object(n.a)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-app",{attrs:{dark:""}},[e("v-main",[e("v-container",[e("nuxt")],1)],1),t._v(" "),e("br"),t._v(" "),t.showFooter?e("v-footer",{attrs:{absolute:!1,app:"",id:"footer"}},[e("div",{staticClass:"footer-items"},[e("v-flex",{attrs:{col:"9"}},[e("NuxtLink",{attrs:{to:"/"}},[t._v("HOME")]),t._v(" "),e("NuxtLink",{attrs:{to:"/assorted"}},[t._v("ASSORTED")]),t._v(" "),e("NuxtLink",{attrs:{to:"/projects"}},[t._v("PROJECTS")]),t._v(" "),e("NuxtLink",{attrs:{to:"/about"}},[t._v("ABOUT")])],1)],1)]):t._e()],1)}),[],!1,null,null,null);o.a=component.exports;d()(component,{VApp:c.a,VContainer:f.a,VFlex:m.a,VFooter:x.a,VMain:h.a})},171:function(t,o,e){e(172),t.exports=e(173)},200:function(t,o,e){"use strict";e(147)},201:function(t,o,e){var r=e(32)(!1);r.push([t.i,"h1[data-v-bfedb7fe]{font-size:20px}",""]),t.exports=r},206:function(t,o,e){var content=e(207);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,e(33).default)("a07579c2",content,!0,{sourceMap:!1})},207:function(t,o,e){var r=e(32)(!1);r.push([t.i,'#app{font-family:"Roboto Mono",sans-serif}.post{color:#cfd1d4;font-size:15px}p{text-align:justify}h1{color:#b8bb26;padding-bottom:1.5rem}h1:before{content:"# "}h2{color:#d79921}h2,h3{padding:1.5rem 0}h3{color:#d65d0e}h4{color:#b8bb26;padding:1.5rem 0}a{border-bottom:1px solid #83a598;text-decoration:none}blockquote{border-left:3px solid #8ec07c;padding-left:1.5rem;margin:1em 0}blockquote p{margin-bottom:5px!important}.img-link{border-bottom:none;padding:1rem 0}.big-link{color:#b8bb26!important;border-bottom:1px solid #63c0f5;text-decoration:none}.big-link,.big-text{font-size:36px}.medium-text{font-size:20px}.small-text{font-size:12px}.red-text{color:#fb4934}.red-str-text{color:#cc241d}.blue-text{color:#83a598}.gray-text{color:#cfd1d4}.v-expansion-panel{color:#cfd1d4!important}.v-expansion-panel .v-expansion-panel-header{font-size:15px}.post{padding-top:3rem;max-width:650px;margin:0 auto}.post img{width:100%}.post-gallery{max-width:850px}.footer-items{max-width:50%;margin:0 auto;text-align:center}.row{margin:0!important}@media screen and (max-width:960px){.post{max-width:90%}.footer-items{max-width:100%}}ul{margin-left:1em}ul,ul li{padding-bottom:.5em}ul li{padding-left:.5em}ol{margin-left:1.5em}ol,ol li{padding-bottom:.5em}',""]),t.exports=r},51:function(t,o,e){"use strict";var r={layout:"empty",props:{error:{type:Object,default:null}},data:function(){return{pageNotFound:"404 Not Found",otherError:"An error occurred"}},head:function(){return{title:404===this.error.statusCode?this.pageNotFound:this.otherError}}},n=(e(200),e(58)),l=e(75),d=e.n(l),c=e(230),component=Object(n.a)(r,(function(){var t=this,o=t.$createElement,e=t._self._c||o;return e("v-app",{attrs:{dark:""}},[404===t.error.statusCode?e("h1",[t._v("\n    "+t._s(t.pageNotFound)+"\n  ")]):e("h1",[t._v("\n    "+t._s(t.otherError)+"\n  ")]),t._v(" "),e("NuxtLink",{attrs:{to:"/"}},[t._v("\n    Home page\n  ")])],1)}),[],!1,null,"bfedb7fe",null);o.a=component.exports;d()(component,{VApp:c.a})}},[[171,54,2,55]]]);