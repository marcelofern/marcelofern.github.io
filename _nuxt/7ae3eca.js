(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{227:function(e,t,n){var r=n(21);e.exports=function(e,t){if(!r(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},228:function(e,t,n){"use strict";var strong=n(229),r=n(227);e.exports=n(230)("Map",(function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(e){var t=strong.getEntry(r(this,"Map"),e);return t&&t.v},set:function(e,t){return strong.def(r(this,"Map"),0===e?0:e,t)}},strong,!0)},229:function(e,t,n){"use strict";var r=n(28).f,o=n(73),c=n(154),l=n(50),h=n(152),d=n(153),v=n(108),f=n(155),_=n(109),w=n(22),m=n(105).fastKey,k=n(227),y=w?"_s":"size",T=function(e,t){var n,r=m(t);if("F"!==r)return e._i[r];for(n=e._f;n;n=n.n)if(n.k==t)return n};e.exports={getConstructor:function(e,t,n,v){var f=e((function(e,r){h(e,f,t,"_i"),e._t=t,e._i=o(null),e._f=void 0,e._l=void 0,e[y]=0,null!=r&&d(r,n,e[v],e)}));return c(f.prototype,{clear:function(){for(var e=k(this,t),data=e._i,n=e._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];e._f=e._l=void 0,e[y]=0},delete:function(e){var n=k(this,t),r=T(n,e);if(r){var o=r.n,c=r.p;delete n._i[r.i],r.r=!0,c&&(c.n=o),o&&(o.p=c),n._f==r&&(n._f=o),n._l==r&&(n._l=c),n[y]--}return!!r},forEach:function(e){k(this,t);for(var n,r=l(e,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(r(n.v,n.k,this);n&&n.r;)n=n.p},has:function(e){return!!T(k(this,t),e)}}),w&&r(f.prototype,"size",{get:function(){return k(this,t)[y]}}),f},def:function(e,t,n){var r,o,c=T(e,t);return c?c.v=n:(e._l=c={i:o=m(t,!0),k:t,v:n,p:r=e._l,n:void 0,r:!1},e._f||(e._f=c),r&&(r.n=c),e[y]++,"F"!==o&&(e._i[o]=c)),e},getEntry:T,setStrong:function(e,t,n){v(e,t,(function(e,n){this._t=k(e,t),this._k=n,this._l=void 0}),(function(){for(var e=this._k,t=this._l;t&&t.r;)t=t.p;return this._t&&(this._l=t=t?t.n:this._t._f)?f(0,"keys"==e?t.k:"values"==e?t.v:[t.k,t.v]):(this._t=void 0,f(1))}),n?"entries":"values",!n,!0),_(t)}}},230:function(e,t,n){"use strict";var r=n(12),o=n(7),c=n(29),l=n(154),meta=n(105),h=n(153),d=n(152),v=n(21),f=n(23),_=n(107),w=n(72),m=n(110);e.exports=function(e,t,n,k,y,T){var j=r[e],O=j,x=y?"set":"add",C=O&&O.prototype,J={},M=function(e){var t=C[e];c(C,e,"delete"==e||"has"==e?function(a){return!(T&&!v(a))&&t.call(this,0===a?0:a)}:"get"==e?function(a){return T&&!v(a)?void 0:t.call(this,0===a?0:a)}:"add"==e?function(a){return t.call(this,0===a?0:a),this}:function(a,b){return t.call(this,0===a?0:a,b),this})};if("function"==typeof O&&(T||C.forEach&&!f((function(){(new O).entries().next()})))){var E=new O,S=E[x](T?{}:-0,1)!=E,R=f((function(){E.has(1)})),P=_((function(e){new O(e)})),D=!T&&f((function(){for(var e=new O,t=5;t--;)e[x](t,t);return!e.has(-0)}));P||((O=t((function(t,n){d(t,O,e);var r=m(new j,t,O);return null!=n&&h(n,y,r[x],r),r}))).prototype=C,C.constructor=O),(R||D)&&(M("delete"),M("has"),y&&M("get")),(D||S)&&M(x),T&&C.clear&&delete C.clear}else O=k.getConstructor(t,e,y,x),l(O.prototype,n),meta.NEED=!0;return w(O,e),J[e]=O,o(o.G+o.W+o.F*(O!=j),J),T||k.setStrong(O,e,y),O}},231:function(e,t,n){"use strict";n(111);var r=n(75);t.a=Object(r.a)("layout")},232:function(e,t,n){"use strict";n(27),n(13);var r=n(3),o=(n(37),n(228),n(38),n(6),n(4),n(16),n(54),n(55),n(156),n(1)),c=n(106),l=n(2);function h(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=["sm","md","lg","xl"],f=["start","end","center"];function _(e,t){return v.reduce((function(n,r){return n[e+Object(l.B)(r)]=t(),n}),{})}var w=function(e){return[].concat(f,["baseline","stretch"]).includes(e)},m=_("align",(function(){return{type:String,default:null,validator:w}})),k=function(e){return[].concat(f,["space-between","space-around"]).includes(e)},y=_("justify",(function(){return{type:String,default:null,validator:k}})),T=function(e){return[].concat(f,["space-between","space-around","stretch"]).includes(e)},j=_("alignContent",(function(){return{type:String,default:null,validator:T}})),O={align:Object.keys(m),justify:Object.keys(y),alignContent:Object.keys(j)},x={align:"align",justify:"justify",alignContent:"align-content"};function C(e,t,n){var r=x[e];if(null!=n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var J=new Map;t.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:w}},m),{},{justify:{type:String,default:null,validator:k}},y),{},{alignContent:{type:String,default:null,validator:T}},j),render:function(e,t){var n=t.props,data=t.data,o=t.children,l="";for(var h in n)l+=String(n[h]);var d=J.get(l);return d||function(){var e,t;for(t in d=[],O)O[t].forEach((function(e){var r=n[e],o=C(t,e,r);o&&d.push(o)}));d.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(e,"align-".concat(n.align),n.align),Object(r.a)(e,"justify-".concat(n.justify),n.justify),Object(r.a)(e,"align-content-".concat(n.alignContent),n.alignContent),e)),J.set(l,d)}(),e(n.tag,Object(c.a)(data,{staticClass:"row",class:d}),o)}})},348:function(e,t,n){"use strict";n.r(t);var r={data:function(){return{exampleUrl:"/images/big_data/mapreduce_example.png"}},head:{title:"Map Reduce",meta:[{hid:"description",name:"description",content:"Map Reduce - Marcelo Fernandes"}]}},o=n(56),c=n(74),l=n.n(c),h=n(224),d=n(231),v=n(232),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[e._v("Map Reduce")])]),e._v(" "),n("v-row",[n("p",{staticClass:"caption"},[e._v("Date: 2020-11-14")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        MapReduce is a programming model (way of structuring a computation),\n        that facilitates data in multiple machines to be processed\n        in a parallel and distributed way.\n      ")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        A MapReduce system (or framework), will orchestrate the\n        mapping and reducing operations by running multiple\n        parallel-tasks across the distributed server,\n        whilst managing the necessary communication\n        between nodes and transferring data from multiple locations\n        in a way such that faults and redundancies are avoided.\n      ")]),e._v(" "),n("p",[e._v("\n        MapReduce algorithms aren't necessarily faster than their traditional\n        counter-parts. However, substantial gains start to appear with\n        multi-threaded implementations on multi-processor hardware.\n        The real use-case is found when the fault tolerance and an \n        optimised communication cost provided by a framework are relevant\n        "),n("a",{attrs:{href:"https://doi.org/10.1145/2331042.2331053",target:"_blank"}},[e._v("[1]")]),e._v(".\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Operations")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        A MapReduce framework is usually composed by these three sequential\n        procedures:\n      ")])]),e._v(" "),n("v-row",[n("ol",[n("li",[n("b",[n("i",[e._v("Map:")])]),e._v(" Each work (node) will apply the designed\n          "),n("b",[e._v("map")]),e._v(" function to their local data. The output will then\n          be written in a temporary storage. A master node will ensure\n          that only one copy of the redundant input data is processed.\n          Each mapper emits zero, one, or multiple output key/value pairs\n          for each input key/value pairs.\n        ")]),e._v(" "),n("li",[n("b",[n("i",[e._v("Shuffle:")])]),e._v(" Intermediate step in which the\n          output created by the mapper is transferred to the reducer.\n          In this process, the framework will perform a sorting and will\n          then transfer the map output to the reducer as input.\n          A shuffling can be triggered before the map phase has finished,\n          which will save some time in the MapReduce operation.\n          The sorting that happens in the\n          procedure is used to save time for the reducer, helping it\n          to easily distinguish when a new reduce task should be started.\n        ")]),e._v(" "),n("li",[n("b",[n("i",[e._v("Reduce:")])]),e._v(" Worker nodes will process each\n          group of output data per key (in a parallel way)\n        ")])])]),e._v(" "),n("v-row",[n("h2",[e._v("Example")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Consider the classic example of counting the number of words from\n        a certain data source:\n      ")])]),e._v(" "),n("v-row",[n("a",{staticClass:"img-link",attrs:{href:e.exampleUrl,target:"_blank"}},[n("img",{attrs:{src:e.exampleUrl}})])]),e._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),n("v-row",[n("h2",[e._v("Hadoop: JobTracker and TaskTracker")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        In the Hadoop framework, the JobTracker is the service that\n        delegates MapReduce tasks to specific nodes in the cluster,\n        ideally to nodes that have the data or are in\n        the same rack.\n      ")]),e._v(" "),n("p",[e._v("\n        The JobTracker has information about which node contains\n        the data, or which node has the information about data. The\n        JobTracker also knows which machines are near the data so that\n        if the original node with the data cannot process\n        the work, then the priority will be given to nodes in the same\n        rack. This technique will help reducing the network traffic.\n      ")]),e._v(" "),n("p",[e._v("\n        The Hadoop documentation\n        "),n("a",{attrs:{href:"https://cwiki.apache.org/confluence/display/HADOOP2/JobTracker",target:"_blank"}},[e._v("[2]")]),e._v("\n        states that the JobTracker behaves\n        in the following way:\n      ")])]),e._v(" "),n("v-row",[n("ol",[n("li",[e._v("\n          Client applications submit jobs to the JobTracker\n        ")]),e._v(" "),n("li",[e._v("\n          The JobTracker talks to the NameNode (master node) to determine\n          the location of the data\n        ")]),e._v(" "),n("li",[e._v("\n          The JobTracker locates TastTracker nodes with available slots at\n          or near the data\n        ")]),e._v(" "),n("li",[e._v("\n          The JobTracker submits the work to the chosen TaskTracker nodes\n        ")]),e._v(" "),n("li",[e._v("\n          The TaskTracker nodes are monitored. If they do not submit\n          heartbeat signals often enough, they are deemed to have\n          failed and the work is scheduled on a different TaskTracker\n        ")]),e._v(" "),n("li",[e._v("\n          A TaskTracker will notify the JobTracker when a task fails. The\n          JobTracker decides what to do then: it may resubmit the job\n          elsewhere, it may mark that specific record as something to avoid,\n          and it may even blacklist the TaskTracker as unreliable.\n        ")]),e._v(" "),n("li",[e._v("\n          When the work is completed, the JobTracker updates its status\n        ")]),e._v(" "),n("li",[e._v("\n          Client applications can poll the JobTracker for information\n        ")])])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Some limitations of this approach:\n      ")])]),e._v(" "),n("v-row",[n("ol",[n("li",[e._v("\n          The allocation of work to a TaskTracker is simple. Every\n          TaskTracker node is provided with a number N of available slots.\n          Every active map takes up one slot. The JobkTracker will delegate\n          the work to the TaskTracker nearest to the data that has at least\n          one available slot. There will be no consideration with regards\n          to the current load on that node, and hence its actual availability\n          and processing capacity.\n        ")]),e._v(" "),n("li",[e._v("\n          If one TaskTracker is slow, it can delay the entire MapReduce job.\n          However, with the speculative execution enabled, the single task\n          can be executed on multiple slave nodes.\n        ")]),e._v(" "),n("li",[e._v("\n          The JobTracker is a point of failure for the Hadoop MapReduce\n          service. If it goes down, all running jobs are halted.\n        ")])])])],1)],1)}),[],!1,null,"107cfed8",null);t.default=component.exports;l()(component,{VFlex:h.a,VLayout:d.a,VRow:v.a})}}]);