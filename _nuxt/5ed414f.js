(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{232:function(t,e,n){var r=n(21);t.exports=function(t,e){if(!r(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},233:function(t,e,n){"use strict";var strong=n(234),r=n(232),o="Map";t.exports=n(235)(o,(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(r(this,o),t);return e&&e.v},set:function(t,e){return strong.def(r(this,o),0===t?0:t,e)}},strong,!0)},234:function(t,e,n){"use strict";var r=n(27).f,o=n(77),c=n(160),l=n(55),d=n(158),f=n(159),h=n(115),v=n(161),m=n(116),y=n(24),_=n(112).fastKey,w=n(232),k=y?"_s":"size",S=function(t,e){var n,r=_(e);if("F"!==r)return t._i[r];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,h){var v=t((function(t,r){d(t,v,e,"_i"),t._t=e,t._i=o(null),t._f=void 0,t._l=void 0,t[k]=0,null!=r&&f(r,n,t[h],t)}));return c(v.prototype,{clear:function(){for(var t=w(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[k]=0},delete:function(t){var n=w(this,e),r=S(n,t);if(r){var o=r.n,c=r.p;delete n._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),n._f==r&&(n._f=o),n._l==r&&(n._l=c),n[k]--}return!!r},forEach:function(t){w(this,e);for(var n,r=l(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!S(w(this,e),t)}}),y&&r(v.prototype,"size",{get:function(){return w(this,e)[k]}}),v},def:function(t,e,n){var r,o,c=S(t,e);return c?c.v=n:(t._l=c={i:o=_(e,!0),k:e,v:n,p:r=t._l,n:void 0,r:!1},t._f||(t._f=c),r&&(r.n=c),t[k]++,"F"!==o&&(t._i[o]=c)),t},getEntry:S,setStrong:function(t,e,n){h(t,e,(function(t,n){this._t=w(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this,e=t._k,n=t._l;n&&n.r;)n=n.p;return t._t&&(t._l=n=n?n.n:t._t._f)?v(0,"keys"==e?n.k:"values"==e?n.v:[n.k,n.v]):(t._t=void 0,v(1))}),n?"entries":"values",!n,!0),m(e)}}},235:function(t,e,n){"use strict";var r=n(12),o=n(4),c=n(29),l=n(160),meta=n(112),d=n(159),f=n(158),h=n(21),v=n(16),m=n(114),y=n(76),_=n(117);t.exports=function(t,e,n,w,k,S){var j=r[t],O=j,D=k?"set":"add",R=O&&O.prototype,C={},x=function(t){var e=R[t];c(R,t,"delete"==t||"has"==t?function(a){return!(S&&!h(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return S&&!h(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof O&&(S||R.forEach&&!v((function(){(new O).entries().next()})))){var P=new O,A=P[D](S?{}:-0,1)!=P,E=v((function(){P.has(1)})),F=m((function(t){new O(t)})),M=!S&&v((function(){for(var t=new O,e=5;e--;)t[D](e,e);return!t.has(-0)}));F||((O=e((function(e,n){f(e,O,t);var r=_(new j,e,O);return null!=n&&d(n,k,r[D],r),r}))).prototype=R,R.constructor=O),(E||M)&&(x("delete"),x("has"),k&&x("get")),(M||A)&&x(D),S&&R.clear&&delete R.clear}else O=w.getConstructor(e,t,k,D),l(O.prototype,n),meta.NEED=!0;return y(O,t),C[t]=O,o(o.G+o.W+o.F*(O!=j),C),S||w.setStrong(O,t,k),O}},236:function(t,e,n){"use strict";n(118);var r=n(78);e.a=Object(r.a)("layout")},237:function(t,e,n){"use strict";var r=n(3),o=(n(54),n(53),n(11),n(40),n(233),n(39),n(14),n(34),n(10),n(13),n(22),n(23),n(162),n(1)),c=n(113),l=n(2);function d(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function f(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?d(Object(source),!0).forEach((function(e){Object(r.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):d(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h=["sm","md","lg","xl"],v=["start","end","center"];function m(t,e){return h.reduce((function(n,r){return n[t+Object(l.B)(r)]=e(),n}),{})}var y=function(t){return[].concat(v,["baseline","stretch"]).includes(t)},_=m("align",(function(){return{type:String,default:null,validator:y}})),w=function(t){return[].concat(v,["space-between","space-around"]).includes(t)},k=m("justify",(function(){return{type:String,default:null,validator:w}})),S=function(t){return[].concat(v,["space-between","space-around","stretch"]).includes(t)},j=m("alignContent",(function(){return{type:String,default:null,validator:S}})),O={align:Object.keys(_),justify:Object.keys(k),alignContent:Object.keys(j)},D={align:"align",justify:"justify",alignContent:"align-content"};function R(t,e,n){var r=D[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var C=new Map;e.a=o.a.extend({name:"v-row",functional:!0,props:f(f(f({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:y}},_),{},{justify:{type:String,default:null,validator:w}},k),{},{alignContent:{type:String,default:null,validator:S}},j),render:function(t,e){var n=e.props,data=e.data,o=e.children,l="";for(var d in n)l+=String(n[d]);var f=C.get(l);return f||function(){var t,e;for(e in f=[],O)O[e].forEach((function(t){var r=n[t],o=R(e,t,r);o&&f.push(o)}));f.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(t,"align-".concat(n.align),n.align),Object(r.a)(t,"justify-".concat(n.justify),n.justify),Object(r.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),C.set(l,f)}(),t(n.tag,Object(c.a)(data,{staticClass:"row",class:f}),o)}})},365:function(t,e,n){"use strict";n.r(e);var r={data:function(){return{hcatalogUrl:"/images/big_data/Hcatalog.png"}},head:{title:"Apache Spark",meta:[{hid:"description",name:"description",content:"Apache Spark - Marcelo Fernandes"}]}},o=n(58),c=n(75),l=n.n(c),d=n(229),f=n(236),h=n(237),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("Apache Spark")])]),t._v(" "),n("v-row",[n("p",{staticClass:"caption"},[t._v("Date: 2020-11-20")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Spark is a unified analytics engine for large-scale data\n        processing. It has high-level API's in multiple languages,\n        including Java, Scala, Python, and R. Spark has an opitmised\n        engine that supports general execution graphs. It als supports\n        a set of higher-level tools such as Spark SQL for SQL and\n        structured data processing, MLlib for machine learning, GraphX\n        for graph processing, and Structured Steaming for incremental\n        computation and stream processing.\n      ")]),t._v(" "),n("p",[t._v("\n        Spark uses Hadoop's client libraries for HDFS and YARN.\n        Python users can install Spark from PyPI.\n      ")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Apache Spark has its architectural foundation in the resilient\n        dataset (RDD), a read-only multiset of data items distributed\n        over a cluster of machines, that is maintained in a fault-tolerant\n        way.\n      ")]),t._v(" "),n("p",[t._v("\n        Spark and its RDDs were developed in 2012 in response to limitations\n        in the MapReduce cluster computing paradigm, which forces a particular\n        linear data-flow structure on distributed programs: MapReduce programs\n        read input data from disk, map a function across the data, reduce\n        the results of the map, and store reduction results on disk.\n        Spark's RDDs function as a working set for distributed programs\n        that offers a (deliberately) restricted form of distributed\n        shared memory.\n      ")]),t._v(" "),n("p",[t._v("\n        Spark facilitates the implementation of both iterative algorithms,\n        which visit their data set multiple times in a loop, and interactive/\n        exploratory data analysis, i.e., the repeated database-style\n        querying of data. The latency of such applications may be reduced\n        by several orders of magnitude compared to Apache Hadoop MapReduce\n        implementation. Among the class of iterative algorithms are the\n        training algorithms for machine learning systems, which formed\n        the initial impetus for developing Apache Spark.\n      ")]),t._v(" "),n("p",[t._v("\n        Apache Spark requires a cluster manager and a distributed storage\n        system. For cluster management, Spark supports standalone (native\n        Spark cluster, where you can launch a cluster either manually or\n        use the launch scripts provided by the install package. It is also\n        possible to run these daemons on a single machine for testing),\n        Hadoop YARN, Apache Mesos or Kubernetes. For distributed storage,\n        Spark can interface with a wide variety, including Alluxio,\n        HDFS, MapR File System, Cassandra, OpenStack Swift, Amazon S3,\n        Kudu, Lustre file system, or a custom solution can be implemented.\n        Spark also supports a pseudo-distributed local mode, usually\n        used only for development or testing purposes, where distributed\n        storage is not required and the local file system can be used instead;\n        in such a scenario, Spark is run on a single machine with one\n        executor per CPU core.\n      ")])]),t._v(" "),n("v-row",[n("h2",[t._v("Spark Core")])]),t._v(" "),n("v-row",[n("p",[t._v('\n        Spark Core is the basis of the whole project. It provides\n        distributed task dispatching, scheduling, and basic I/O\n        functionalities. The Spark Core is exposed through application\n        programming interfaces (Java, Python, Scala, .NET, and R) centered\n        on the RDD abstraction. This interface mirrors a function/high-order\n        model of programming: a "driver" program invokes parallel operations\n        such as map, filter, or reduce on an RDD by passing a function to Spark,\n        which then schedules the functions\'s execution in parallel to the cluster.\n        These operations, and additional ones such as joins, take RDDs as input\n        and procue new RDDs. RDDs are immutable and their operations\n        are lazy; fault-tolerance is achieved by keeping track of the lineage\n        of each RDD (the sequence of operations that produced it) so that\n        it can be reconstructed in the case of data loss.\n      ')])])],1)],1)}),[],!1,null,"8c405678",null);e.default=component.exports;l()(component,{VFlex:d.a,VLayout:f.a,VRow:h.a})}}]);