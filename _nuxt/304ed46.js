(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{232:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},233:function(t,e,n){"use strict";var strong=n(234),r=n(232),o="Map";t.exports=n(235)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,o),t);return e&&e.v},set:function(t,e){return strong.def(r(this,o),0===t?0:t,e)}},strong,!0)},234:function(t,e,n){"use strict";var r=n(27).f,o=n(77),c=n(160),l=n(55),d=n(158),f=n(159),v=n(115),h=n(161),_=n(116),w=n(24),y=n(112).fastKey,m=n(232),H=w?"_s":"size",C=function(t,e){var n,r=y(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,v){var h=t((function(t,r){d(t,h,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[H]=0,null!=r&&f(r,n,t[v],t)}));return c(h.prototype,{clear:function(){for(var t=m(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[H]=0},delete:function(t){var n=m(this,e),r=C(n,t);if(r){var o=r.n,c=r.p;delete n._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),n._f==r&&(n._f=o),n._l==r&&(n._l=c),n[H]--}return!!r},forEach:function(t){m(this,e);for(var n,r=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!C(m(this,e),t)}}),w&&r(h.prototype,"size",{get:function(){return m(this,e)[H]}}),h},def:function(t,e,n){var r,o,c=C(t,e);return c?c.v=n:(t._l=c={i:o=y(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[H]++,"F"!==o&&(t._i[o]=c)),t},getEntry:C,setStrong:function(t,e,n){v(t,e,(function(t,n){this._t=m(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?h(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,h(1))}),n?"entries":"values",!n,!0),_(e)}}},235:function(t,e,n){"use strict";var r=n(12),o=n(4),c=n(29),l=n(160),meta=n(112),d=n(159),f=n(158),v=n(21),h=n(16),_=n(114),w=n(76),y=n(117);t.exports=function(t,e,n,m,H,C){var O=r[t],S=O,j=H?"set":"add",D=S&&S.prototype,k={},x=function(t){var e=D[t];c(D,t,"delete"==t||"has"==t?function(a){return!(C&&!v(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return C&&!v(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof S&&(C||D.forEach&&!h((function(){(new S).entries().next()})))){var P=new S,F=P[j](C?{}:-0,1)!=P,A=h((function(){P.has(1)})),R=_((function(t){new S(t)})),L=!C&&h((function(){for(var t=new S,e=5;e--;)t[j](e,e);return!t.has(-0)}));R||((S=e((function(e,n){f(e,S,t);var r=y(new O,e,S);return null!=n&&d(n,H,r[j],r),r}))).prototype=D,D.constructor=S),(A||L)&&(x("delete"),x("has"),H&&x("get")),(L||F)&&x(j),C&&D.clear&&delete D.clear}else S=m.getConstructor(e,t,H,j),l(S.prototype,n),meta.NEED=!0;return w(S,t),k[t]=S,o(o.G+o.W+o.F*(S!=O),k),C||m.setStrong(S,t,H),S}},236:function(t,e,n){"use strict";n(118);var r=n(78);e.a=Object(r.a)("layout")},237:function(t,e,n){"use strict";var r=n(3),o=(n(54),n(53),n(11),n(40),n(233),n(39),n(14),n(34),n(10),n(13),n(22),n(23),n(162),n(1)),c=n(113),l=n(2);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var v=["sm","md","lg","xl"],h=["start","end","center"];function _(t,e){return v.reduce((function(n,r){return n[t+Object(l.B)(r)]=e(),n}),{})}var w=function(t){return[].concat(h,["baseline","stretch"]).includes(t)},y=_("align",(function(){return{type:String,default:null,validator:w}})),m=function(t){return[].concat(h,["space-between","space-around"]).includes(t)},H=_("justify",(function(){return{type:String,default:null,validator:m}})),C=function(t){return[].concat(h,["space-between","space-around","stretch"]).includes(t)},O=_("alignContent",(function(){return{type:String,default:null,validator:C}})),S={align:Object.keys(y),justify:Object.keys(H),alignContent:Object.keys(O)},j={align:"align",justify:"justify",alignContent:"align-content"};function D(t,e,n){var r=j[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var k=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:f(f(f({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:w}},y),{},{justify:{type:String,default:null,validator:m}},H),{},{alignContent:{type:String,default:null,validator:C}},O),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var d in n)l+=String(n[d]);var f=k.get(l);return f||function(){var t,e;for(e in f=[],S)S[e].forEach((function(t){var r=n[t],o=D(e,t,r);o&&f.push(o)}));f.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),k.set(l,f)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:f}),o)}})},364:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{hcatalogUrl:"/images/big_data/Hcatalog.png"}},head:{title:"Apache Hive",meta:[{hid:"description",name:"description",content:"Apache Hive - Marcelo Fernandes"}]}},o=n(58),c=n(75),l=n.n(c),d=n(229),f=n(236),v=n(237),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("Apache Hive")])]),t._v(" "),n("v-row",[n("p",{staticClass:"caption"},[t._v("Date: 2020-11-19")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        The Apache Hive data warehouse software facilitates\n        reading, writing, and managing of large datasets\n        that reside in distributed storages.\n      ")]),t._v(" "),n("p",[t._v("\n        Hive is built on top of Hadoop, and it provides\n        the following features:\n      ")])]),t._v(" "),n("v-row",[n("ul",[n("li",[t._v("\n          Tools that enable easy access to data via SQL,\n          facilitating data warehousing tasks such as\n          extract/transform/load, reporting, and data analysis.\n        ")]),t._v(" "),n("li",[t._v("\n          A mechanism to impose structure on a variety of data\n          formats.\n        ")]),t._v(" "),n("li",[t._v("\n          Access to files that are either stored directly in HDFS\n          or in other data storage system such as HBase.\n        ")]),t._v(" "),n("li",[t._v("\n          Query execution via Tez, Spark, or MapReduce.\n        ")]),t._v(" "),n("li",[t._v("\n          Procedural language with HPL-SQL\n        ")]),t._v(" "),n("li",[t._v("\n          Sub-second query retrieval via Hive LLAP, YARN, and\n          Apache Slider.\n        ")])])]),t._v(" "),n("v-row",[n("p",[t._v("\n      Hive provides standard SQL functionality. Hive's SQL can also be\n      extended with user code via user defined functions (UDFs), user\n      defined aggregates (UDAFs), and user defined table functions (UDTFs).\n      ")])]),t._v(" "),n("v-row",[n("p",[t._v('\n        There is not a single "Hive format" in which data must be stored.\n        Hive comes with many built in connectors for comma and tab-separated\n        values (CSV/TSV) text files, Apache Parquet, Apache ORC, and other\n        formats. Users can extend Hive with connectors for other formats.\n      ')]),t._v(" "),n("p",[t._v("\n        Hive is not designed for online transaction processing (OLTP)\n        workloads. Instead, it is best used for traditional data warehousing\n        tasks.\n      ")]),t._v(" "),n("p",[t._v("\n        Hive is designed to maximise scalability (scale out with more\n        machines added dynamically to Hadoop cluster), performance,\n        extensibility, fault-tolerance, and loose-coupling with its\n        input formats.\n      ")])]),t._v(" "),n("v-row",[n("h2",[t._v("HCatalog")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        HCatalog is a table and storage management layer for Hadoop that\n        enables users with different data processing tools (Pig, MapReduce)\n        to more easily read and write data on the grid. HCatalog's\n        table abstraction presents users with a relational view of data\n        inside HDFS, and ensures that users do not need to worry\n        about where or in what format their data is stored (RCFile, text,\n        SequenceFiles, or ORC files).\n      ")]),t._v(" "),n("p",[t._v("\n        HCatalog supports reading and writing files in any format\n        for which a SerDe (serializer-deserializer) can be written.\n        By default, HCatalog supports RCFile, CSV, JSON, SequenceFile,\n        and ORC file formats. To use a custom format, you must\n        provide the InputFormat, OutputFormat, and SerDe.\n      ")])]),t._v(" "),n("v-row",[n("a",{staticClass:"img-link",attrs:{href:t.hcatalogUrl,target:"_blank"}},[n("img",{attrs:{src:t.hcatalogUrl}})])]),t._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[t._v("Click on the image to expand it in a new tab.")])])]),t._v(" "),n("v-row",[n("p",[t._v("\n        HCatalog is built on top of the Hive metastore and incorporates\n        Hive's DDL. HCatalog provides read and write interfaces for Pig\n        and MapReduce and uses Hive's command line interface for issuing\n        data definition and metadata exploration commands.\n      ")])]),t._v(" "),n("v-row",[n("h2",[t._v("WebHCat")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        WebHCat is the HCatalog REST API. Developers make HTTP requests\n        to access Hadoop MapReduce (or YARN), Pig, Hive, and HCatalog\n        DDL from within applications. Data and code used by this API are\n        maintained in HDFS. HCatalog DDL commands are executed\n        directly when requested. MapReduce, Pig, and Hive jobs are placed\n        in queue by WebHCat servers and can be monitored for progress\n        or stopped as required. Developers specify a location in HDFS into\n        which Pig, Hive, and MapReduce results should be placed.\n      ")])])],1)],1)}),[],!1,null,"76ed71e4",null);e.default=component.exports;l()(component,{VFlex:d.a,VLayout:f.a,VRow:v.a})}}]);