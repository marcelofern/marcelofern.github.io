(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{217:function(e,t,n){"use strict";n(111);var r=n(74);t.a=Object(r.a)("layout")},218:function(e,t,n){"use strict";n(26),n(12);var r=n(3),o=(n(46),n(209),n(47),n(6),n(4),n(17),n(58),n(59),n(145),n(0)),l=n(112),c=n(2);function h(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(t){Object(r.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var v=["sm","md","lg","xl"],f=["start","end","center"];function w(e,t){return v.reduce((function(n,r){return n[e+Object(c.n)(r)]=t(),n}),{})}var m=function(e){return[].concat(f,["baseline","stretch"]).includes(e)},k=w("align",(function(){return{type:String,default:null,validator:m}})),_=function(e){return[].concat(f,["space-between","space-around"]).includes(e)},y=w("justify",(function(){return{type:String,default:null,validator:_}})),T=function(e){return[].concat(f,["space-between","space-around","stretch"]).includes(e)},j=w("alignContent",(function(){return{type:String,default:null,validator:T}})),O={align:Object.keys(k),justify:Object.keys(y),alignContent:Object.keys(j)},J={align:"align",justify:"justify",alignContent:"align-content"};function x(e,t,n){var r=J[e];if(null!=n){if(t){var o=t.replace(e,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var C=new Map;t.a=o.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:m}},k),{},{justify:{type:String,default:null,validator:_}},y),{},{alignContent:{type:String,default:null,validator:T}},j),render:function(e,t){var n=t.props,data=t.data,o=t.children,c="";for(var h in n)c+=String(n[h]);var d=C.get(c);return d||function(){var e,t;for(t in d=[],O)O[t].forEach((function(e){var r=n[e],o=x(t,e,r);o&&d.push(o)}));d.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(r.a)(e,"align-".concat(n.align),n.align),Object(r.a)(e,"justify-".concat(n.justify),n.justify),Object(r.a)(e,"align-content-".concat(n.alignContent),n.alignContent),e)),C.set(c,d)}(),e(n.tag,Object(l.a)(data,{staticClass:"row",class:d}),o)}})},241:function(e,t,n){"use strict";n.r(t);var r={data:function(){return{exampleUrl:"/images/big_data/mapreduce_example.png"}},head:{title:"Map Reduce - MarceloFern",meta:[{hid:"description",name:"description",content:"Map Reduce - Marcelo Fernandes"}]}},o=n(53),l=n(73),c=n.n(l),h=n(216),d=n(217),v=n(218),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[e._v("Map Reduce")])]),e._v(" "),n("v-row",[n("p",{staticClass:"caption"},[e._v("Date: 2020-11-14")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        MapReduce is a programming model (way of structuring a computation),\n        that facilitates data in multiple machines to be processed\n        in a parallel and distributed way.\n      ")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        A MapReduce system (or framework), will orchestrate the\n        mapping and reducing operations by running multiple\n        parallel-tasks across the distributed server,\n        whilst managing the necessary communication\n        between nodes and transferring data from multiple locations\n        in a way such that faults and redundancies are avoided.\n      ")]),e._v(" "),n("p",[e._v("\n        MapReduce algorithms aren't necessarily faster than their traditional\n        counter-parts. However, substantial gains start to appear with\n        multi-threaded implementations on multi-processor hardware.\n        The real use-case is found when the fault tolerance and an \n        optimised communication cost provided by a framework are relevant\n        "),n("a",{attrs:{href:"https://doi.org/10.1145/2331042.2331053",target:"_blank"}},[e._v("[1]")]),e._v(".\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Operations")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        A MapReduce framework is usually composed by these three sequential\n        procedures:\n      ")])]),e._v(" "),n("v-row",[n("ol",[n("li",[n("b",[n("i",[e._v("Map:")])]),e._v(" Each work (node) will apply the designed\n          "),n("b",[e._v("map")]),e._v(" function to their local data. The output will then\n          be written in a temporary storage. A master node will ensure\n          that only one copy of the redundant input data is processed.\n          Each mapper emits zero, one, or multiple output key/value pairs\n          for each input key/value pairs.\n        ")]),e._v(" "),n("li",[n("b",[n("i",[e._v("Shuffle:")])]),e._v(" Intermediate step in which the\n          output created by the mapper is transferred to the reducer.\n          In this process, the framework will perform a sorting and will\n          then transfer the map output to the reducer as input.\n          A shuffling can be triggered before the map phase has finished,\n          which will save some time in the MapReduce operation.\n          The sorting that happens in the\n          procedure is used to save time for the reducer, helping it\n          to easily distinguish when a new reduce task should be started.\n        ")]),e._v(" "),n("li",[n("b",[n("i",[e._v("Reduce:")])]),e._v(" Worker nodes will process each\n          group of output data per key (in a parallel way)\n        ")])])]),e._v(" "),n("v-row",[n("h2",[e._v("Example")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Consider the classic example of counting the number of words from\n        a certain data source:\n      ")])]),e._v(" "),n("v-row",[n("a",{attrs:{href:e.exampleUrl,target:"_blank"}},[n("img",{attrs:{src:e.exampleUrl}})])]),e._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),n("v-row",[n("h2",[e._v("Hadoop: JobTracker and TaskTracker")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        In the Hadoop framework, the JobTracker is the service that\n        delegates MapReduce tasks to specific nodes in the cluster,\n        ideally to nodes that have the data or are in\n        the same rack.\n      ")]),e._v(" "),n("p",[e._v("\n        The JobTracker has information about which node contains\n        the data, or which node has the information about data. The\n        JobTracker also knows which machines are near the data so that\n        if the original node with the data cannot process\n        the work, then the priority will be given to nodes in the same\n        rack. This technique will help reducing the network traffic.\n      ")]),e._v(" "),n("p",[e._v("\n        The Hadoop documentation\n        "),n("a",{attrs:{href:"https://cwiki.apache.org/confluence/display/HADOOP2/JobTracker",target:"_blank"}},[e._v("[2]")]),e._v("\n        states that the JobTracker behaves\n        in the following way:\n      ")])]),e._v(" "),n("v-row",[n("ol",[n("li",[e._v("\n          Client applications submit jobs to the JobTracker\n        ")]),e._v(" "),n("li",[e._v("\n          The JobTracker talks to the NameNode (master node) to determine\n          the location of the data\n        ")]),e._v(" "),n("li",[e._v("\n          The JobTracker locates TastTracker nodes with available slots at\n          or near the data\n        ")]),e._v(" "),n("li",[e._v("\n          The JobTracker submits the work to the chosen TaskTracker nodes\n        ")]),e._v(" "),n("li",[e._v("\n          The TaskTracker nodes are monitored. If they do not submit\n          heartbeat signals often enough, they are deemed to have\n          failed and the work is scheduled on a different TaskTracker\n        ")]),e._v(" "),n("li",[e._v("\n          A TaskTracker will notify the JobTracker when a task fails. The\n          JobTracker decides what to do then: it may resubmit the job\n          elsewhere, it may mark that specific record as something to avoid,\n          and it may even blacklist the TaskTracker as unreliable.\n        ")]),e._v(" "),n("li",[e._v("\n          When the work is completed, the JobTracker updates its status\n        ")]),e._v(" "),n("li",[e._v("\n          Client applications can poll the JobTracker for information\n        ")])])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Some limitations of this approach:\n      ")])]),e._v(" "),n("v-row",[n("ol",[n("li",[e._v("\n          The allocation of work to a TaskTracker is simple. Every\n          TaskTracker node is provided with a number N of available slots.\n          Every active map takes up one slot. The JobkTracker will delegate\n          the work to the TaskTracker nearest to the data that has at least\n          one available slot. There will be no consideration with regards\n          to the current load on that node, and hence its actual availability\n          and processing capacity.\n        ")]),e._v(" "),n("li",[e._v("\n          If one TaskTracker is slow, it can delay the entire MapReduce job.\n          However, with the speculative execution enabled, the single task\n          can be executed on multiple slave nodes.\n        ")]),e._v(" "),n("li",[e._v("\n          The JobTracker is a point of failure for the Hadoop MapReduce\n          service. If it goes down, all running jobs are halted.\n        ")])])])],1)],1)}),[],!1,null,"4f25bab6",null);t.default=component.exports;c()(component,{VFlex:h.a,VLayout:d.a,VRow:v.a})}}]);