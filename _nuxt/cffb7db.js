(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{232:function(e,t,n){var o=n(21);e.exports=function(e,t){if(!o(e)||e._t!==t)throw TypeError("Incompatible receiver, "+t+" required!");return e}},233:function(e,t,n){"use strict";var strong=n(234),o=n(232),r="Map";e.exports=n(235)(r,(function(e){return function(){return e(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(e){var t=strong.getEntry(o(this,r),e);return t&&t.v},set:function(e,t){return strong.def(o(this,r),0===e?0:e,t)}},strong,!0)},234:function(e,t,n){"use strict";var o=n(27).f,r=n(77),c=n(160),l=n(55),h=n(158),d=n(159),f=n(115),m=n(161),v=n(116),y=n(24),_=n(112).fastKey,w=n(232),k=y?"_s":"size",N=function(e,t){var n,o=_(t);if("F"!==o)return e._i[o];for(n=e._f;n;n=n.n)if(n.k==t)return n};e.exports={getConstructor:function(e,t,n,f){var m=e((function(e,o){h(e,m,t,"_i"),e._t=t,e._i=r(null),e._f=void 0,e._l=void 0,e[k]=0,null!=o&&d(o,n,e[f],e)}));return c(m.prototype,{clear:function(){for(var e=w(this,t),data=e._i,n=e._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];e._f=e._l=void 0,e[k]=0},delete:function(e){var n=w(this,t),o=N(n,e);if(o){var r=o.n,c=o.p;delete n._i[o.i],o.r=!0,c&&(c.n=r),r&&(r.p=c),n._f==o&&(n._f=r),n._l==o&&(n._l=c),n[k]--}return!!o},forEach:function(e){w(this,t);for(var n,o=l(e,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(o(n.v,n.k,this);n&&n.r;)n=n.p},has:function(e){return!!N(w(this,t),e)}}),y&&o(m.prototype,"size",{get:function(){return w(this,t)[k]}}),m},def:function(e,t,n){var o,r,c=N(e,t);return c?c.v=n:(e._l=c={i:r=_(t,!0),k:t,v:n,p:o=e._l,n:void 0,r:!1},e._f||(e._f=c),o&&(o.n=c),e[k]++,"F"!==r&&(e._i[r]=c)),e},getEntry:N,setStrong:function(e,t,n){f(e,t,(function(e,n){this._t=w(e,t),this._k=n,this._l=void 0}),(function(){for(var e=this,t=e._k,n=e._l;n&&n.r;)n=n.p;return e._t&&(e._l=n=n?n.n:e._t._f)?m(0,"keys"==t?n.k:"values"==t?n.v:[n.k,n.v]):(e._t=void 0,m(1))}),n?"entries":"values",!n,!0),v(t)}}},235:function(e,t,n){"use strict";var o=n(12),r=n(4),c=n(29),l=n(160),meta=n(112),h=n(159),d=n(158),f=n(21),m=n(16),v=n(114),y=n(76),_=n(117);e.exports=function(e,t,n,w,k,N){var D=o[e],F=D,S=k?"set":"add",H=F&&F.prototype,T={},I=function(e){var t=H[e];c(H,e,"delete"==e||"has"==e?function(a){return!(N&&!f(a))&&t.call(this,0===a?0:a)}:"get"==e?function(a){return N&&!f(a)?void 0:t.call(this,0===a?0:a)}:"add"==e?function(a){return t.call(this,0===a?0:a),this}:function(a,b){return t.call(this,0===a?0:a,b),this})};if("function"==typeof F&&(N||H.forEach&&!m((function(){(new F).entries().next()})))){var A=new F,C=A[S](N?{}:-0,1)!=A,x=m((function(){A.has(1)})),j=v((function(e){new F(e)})),O=!N&&m((function(){for(var e=new F,t=5;t--;)e[S](t,t);return!e.has(-0)}));j||((F=t((function(t,n){d(t,F,e);var o=_(new D,t,F);return null!=n&&h(n,k,o[S],o),o}))).prototype=H,H.constructor=F),(x||O)&&(I("delete"),I("has"),k&&I("get")),(O||C)&&I(S),N&&H.clear&&delete H.clear}else F=w.getConstructor(t,e,k,S),l(F.prototype,n),meta.NEED=!0;return y(F,e),T[e]=F,r(r.G+r.W+r.F*(F!=D),T),N||w.setStrong(F,e,k),F}},236:function(e,t,n){"use strict";n(118);var o=n(78);t.a=Object(o.a)("layout")},237:function(e,t,n){"use strict";var o=n(3),r=(n(54),n(53),n(11),n(40),n(233),n(39),n(14),n(34),n(10),n(13),n(22),n(23),n(162),n(1)),c=n(113),l=n(2);function h(object,e){var t=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),t.push.apply(t,n)}return t}function d(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?h(Object(source),!0).forEach((function(t){Object(o.a)(e,t,source[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):h(Object(source)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(source,t))}))}return e}var f=["sm","md","lg","xl"],m=["start","end","center"];function v(e,t){return f.reduce((function(n,o){return n[e+Object(l.B)(o)]=t(),n}),{})}var y=function(e){return[].concat(m,["baseline","stretch"]).includes(e)},_=v("align",(function(){return{type:String,default:null,validator:y}})),w=function(e){return[].concat(m,["space-between","space-around"]).includes(e)},k=v("justify",(function(){return{type:String,default:null,validator:w}})),N=function(e){return[].concat(m,["space-between","space-around","stretch"]).includes(e)},D=v("alignContent",(function(){return{type:String,default:null,validator:N}})),F={align:Object.keys(_),justify:Object.keys(k),alignContent:Object.keys(D)},S={align:"align",justify:"justify",alignContent:"align-content"};function H(e,t,n){var o=S[e];if(null!=n){if(t){var r=t.replace(e,"");o+="-".concat(r)}return(o+="-".concat(n)).toLowerCase()}}var T=new Map;t.a=r.a.extend({name:"v-row",functional:!0,props:d(d(d({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:y}},_),{},{justify:{type:String,default:null,validator:w}},k),{},{alignContent:{type:String,default:null,validator:N}},D),render:function(e,t){var n=t.props,data=t.data,r=t.children,l="";for(var h in n)l+=String(n[h]);var d=T.get(l);return d||function(){var e,t;for(t in d=[],F)F[t].forEach((function(e){var o=n[e],r=H(t,e,o);r&&d.push(r)}));d.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(o.a)(e,"align-".concat(n.align),n.align),Object(o.a)(e,"justify-".concat(n.justify),n.justify),Object(o.a)(e,"align-content-".concat(n.alignContent),n.alignContent),e)),T.set(l,d)}(),e(n.tag,Object(c.a)(data,{staticClass:"row",class:d}),r)}})},368:function(e,t,n){"use strict";n.r(t);var o={data:function(){return{hadoopDocUrl:"https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsDesign.html#Introduction",hdfsUrl:"/images/big_data/hdfs.png",replicaUrl:"/images/big_data/data_nodes_replicas.png",userQuotasUrl:"https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsQuotaAdminGuide.html",accessPermissionsUrl:"https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-hdfs/HdfsPermissionsGuide.html",rackAwareUrl:"https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/RackAwareness.html",fsUrl:"https://hadoop.apache.org/docs/current/hadoop-project-dist/hadoop-common/FileSystemShell.html"}},head:{title:"Hadoop - HDFS",meta:[{hid:"description",name:"description",content:"Hadoop - HDFS- Marcelo Fernandes"}]}},r=n(58),c=n(75),l=n.n(c),h=n(229),d=n(236),f=n(237),component=Object(r.a)(o,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[e._v("Hadoop - HDFS")])]),e._v(" "),n("v-row",[n("p",{staticClass:"caption"},[e._v("Date: 2020-11-16")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        According to Hadoop's documentation\n        "),n("a",{attrs:{href:e.hadoopDocUrl,target:"_blank"}},[e._v("[1]")]),e._v(", the\n        Hadoop Distributed File System (HDFS) is a distributed\n        file system designed to run on commodity (cheap) hardware.\n      ")]),e._v(" "),n("p",[e._v("\n        It is manly made to be highly fault-tolerant and to be\n        deployed on low-cost hardware.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Principles")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        HDFS architecture is composed by 6 principles:\n      ")])]),e._v(" "),n("v-row",[n("ol",[n("li",[n("b",[e._v("Hardware Failure")]),e._v(": Hardware failures are always present in large\n          systems. In a HDFS instance\n          that is composed by thousands of machines, some machines\n          are likely to be non-functional at any given time. With that in\n          mind, Hadoop must quickly detect faults and immediately\n          recovery from them.\n        ")]),e._v(" "),n("li",[n("b",[e._v("Streaming Data Access")]),e._v(": HDFS is designed and optimised to perform\n          batch processing rather than interactive use by users.\n          This means that the it is more important to have high throughput\n          of data access rather than low latency of data access.\n        ")]),e._v(" "),n("li",[n("b",[e._v("Large Datasets")]),e._v(": HDFS is optimised to work on large files.\n          It should provide high aggregate data bandwidth and scale to\n          hundreds of nodes in a single cluster. Also, a single instance\n          should support tens of millions of files -- considering that\n          the typical file is gigabytes to terabytes in size.\n        ")]),e._v(" "),n("li",[n("b",[e._v("Simple Coherency Model")]),e._v(": As in most big data frameworks,\n          HDFS applications typically write the data once and then\n          proceed to read it many times. A file that has been created\n          won't be changed except to append or truncate data. Appending\n          the content to the end of the files is supported but cannot\n          be updated at an arbitrary point. This simplifies data coherency\n          issues and enables high throughput access. MapReduce and web-crawler\n          applications fit within this model.\n        ")]),e._v(" "),n("li",[n("b",[e._v('"Moving Computation is Cheaper than Moving Data"')]),e._v(": Computational\n          operations are usually more efficient if they are executed\n          close to the data they are operating on. This is easier to\n          notice when the size of the data is massive. This will minimise\n          network congestion and will increase the overall throughput.\n        ")]),e._v(" "),n("li",[n("b",[e._v("Portability Across Heterogeneous Hardware and Software Platforms")]),e._v(":\n          HDFS should be easy to port from one platform to another.\n        ")])])]),e._v(" "),n("v-row",[n("h2",[e._v("\n        NameNode and DataNodes\n      ")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        HDFS is based on a master/worker architecture.\n        There can be only one master server, which is referred as\n        "),n("b",[e._v("NameNode")]),e._v(". The NameNode will manage the\n        "),n("a",{attrs:{href:"#namespace"}},[e._v("file system namespace")]),e._v(" and control access\n        to files by clients. The "),n("b",[e._v("DataNodes")]),e._v(" manage storage\n        attached to the nodes they run on. When the clients uploads\n        a file, the file will be split into one\n        or more blocks. These blocks are stored in a set of DataNodes.\n      ")]),e._v(" "),n("p",[e._v("\n        The NameNode executes file system namespace operations such as\n        opening, closing, and renaming files and directories. It also\n        determines the mapping of blocks to DataNodes. The NameNode is\n        the arbitrator and repository for all HDFS metadata. Although this\n        greatly facilitates the architecture, it also creates a single point\n        of failure.\n      ")]),e._v(" "),n("p",[e._v("\n        The DataNodes\n        are responsible for serving the read and write requests from\n        the file system's clients. DataNodes also execute block creation,\n        deletion, and replication upon instructions from the NameNode.\n        In a real deployment there will be, usually, one DataNode running\n        per machine, though this is not a constraint.\n      ")])]),e._v(" "),n("v-row",[n("a",{staticClass:"img-link",attrs:{href:e.hdfsUrl,target:"_blank"}},[n("img",{attrs:{src:e.hdfsUrl}})])]),e._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),n("v-row",[n("h2",{attrs:{id:"namespace"}},[e._v("\n        File System Namespace\n      ")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        HDFS supports the classic hierarchical file organisation.\n        A client can create directories and store files inside\n        these directories. The file system namespace hierarchy is\n        very similar to other existing file systems, and\n        operations such create, remove, move, and rename files are\n        supported.\n      ")]),e._v(" "),n("p",[e._v("\n        HDFS supports user quotas\n        "),n("a",{attrs:{target:"_blank",href:e.userQuotasUrl}},[e._v("[2]")]),e._v("\n        and access permissions\n        "),n("a",{attrs:{target:"_blank",href:e.accessPermissionsUrl}},[e._v("[3]")]),e._v(".\n        HDFS does not support hard links or soft links.\n      ")]),e._v(" "),n("p",[e._v("\n        The NameNode will maintain the file system namespace.\n        This means that any change to the file system namespace or its\n        properties is recorded by the NameNode. An application can\n        specify the number of replicas of a file that should be\n        maintained by HDFS. The number of copies of a file is called\n        the replication factor of that file, and this information is\n        stored by the NameNode.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Data Replication")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        HDFS is expected to store large files across many machines\n        in a large cluster. Each file is stored as sequence of blocks,\n        and these blocks are replicated to enhance fault tolerance.\n        Both the block size and replication factor are configurable\n        in a per-file basis. Additionally, the replication factor can be\n        changed after creation.\n      ")]),e._v(" "),n("p",[e._v("\n        All the blocks in a file, except the last block, have the same size.\n        Users can start new blocks without filling out the last block.\n      ")]),e._v(" "),n("p",[e._v("\n        Files in HDFS are "),n("b",[e._v("write-once")]),e._v(" (except for appends and\n        truncates), and are properly locked so that only one writer\n        can operate at any time.\n      ")]),e._v(" "),n("p",[e._v("\n        The NameNode makes all decisions regarding replication of blocks.\n        It periodically receives a Heartbeat and a Blockreport from\n        each of the DataNodes in the cluster. Receipt of a Heartbeat implies\n        that the DataNode is functioning as expected. A Blockreport\n        contains a list the blocks in that DataNode.\n      ")])]),e._v(" "),n("v-row",[n("a",{staticClass:"img-link",attrs:{href:e.replicaUrl,target:"_blank"}},[n("img",{attrs:{src:e.replicaUrl}})])]),e._v(" "),n("v-row",[n("p",{staticClass:"small-text"},[n("i",[e._v("Click on the image to expand it in a new tab.")])])]),e._v(" "),n("v-row",[n("h3",[e._v("Replica Placement")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The optimisation of replica placements is one of the features\n        that distinguishes HDFS from most other distributed file systems.\n        The purpose of the proposed rack-aware replica placement policy\n        is to improve data reliability, availability, and network bandwidth\n        utilisation. The current implementation for the replica placement\n        policy is a first effort in this direction.\n      ")]),e._v(" "),n("p",[e._v("\n        Large HDFS instances typically run on a cluster of computers\n        that are commonly spread across many racks. Communication that\n        happens between two nodes placed in different racks has to go\n        through switches. In typical scenarios, network bandwidth between\n        machines in the same rack is greater than between machines\n        in different racks.\n      ")]),e._v(" "),n("p",[e._v("\n        The NameNode will determine the rack id each DataNode belongs to\n        via a process described in Hadoop Rack Awareness\n        "),n("a",{attrs:{target:"_blank",href:e.rackAwareUrl}},[e._v("[4]")]),e._v(".\n        A simple non-optimal policy is to place replicas on different racks.\n        This prevents losing data when an entire rack fails and allows use\n        of bandwidth from multiple racks when reading data.\n        This policy also evenly distributes replicas in the cluster, which\n        facilitates load balancing on component failure. One of the\n        down-sides is that the cost of writes is increased due to\n        the needs to transfer blocks to multiple racks.\n      ")]),e._v(" "),n("p",[e._v("\n        For the common case, for a replication factor of three, HDFS's\n        placement policy is to put one replica on the local machine\n        if the writer is on a DataNode, otherwise on a random DataNode in\n        the same rack as that of the writer. The second replica would be\n        placed on a node in a different (remote) rack, and the last on\n        a different node in the same remote rack. This policy aids to cut\n        the inter-rack write traffic, which generally improves write\n        performance. The chance of rack failure is far less than that\n        of node failure; therefore this policy does not impact data \n        reliability and availability guarantees. However, the down-side\n        is that it does not reduce the aggregate network bandwidth used\n        when reading data because a block is placed in only two unique\n        racks rather than three. The blocks do not evenly distribute\n        accross the racks. This policy improves write performance\n        without compromising data reliability or read performance too much.\n      ")]),e._v(" "),n("p",[e._v("\n        For a replication factor greater than 3, the 4th and subsequent\n        replicas are determined randomly while keeping the number of\n        replicas per rack below the upper limit, which is basically\n        "),n("i",[e._v("(replicas -1) / racks +2")]),e._v(".\n      ")]),e._v(" "),n("p",[e._v("\n        Since the NameNod does not allow DataNodes to have multiple\n        replicas of the same block, the maximum number of replicas\n        created is the total number of DataNodes at that time.\n      ")]),e._v(" "),n("p",[e._v("\n        The NameNode chooses nodes based on rack awareness at first,\n        and then proceeds to check that the candidate node has\n        storage required by the policy associated with the file.\n        If the candidate node does not have the storage type, the NameNode\n        proceeds to look for another candidate. If no nodes to place\n        replicas can be found, the NameNode looks for nodes having\n        fallback storage types in the second turn.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Selecting a replica")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        As HDFS will try to minimise bandwidth consumption and\n        read latency, it will process a read request from a replica that is\n        closer to the reader. If there is a replica in the same rack\n        as the reader node, then that replica is selected. If the HDFS system\n        is distributed across many data centers, then the replica resident\n        in the local data center is preferred.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Safemode")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        When the NameNode starts, it initialises on a special mode called\n        Safemode. In this mode, replication of data blocks is forbidden.\n        The NameNode will then receive Heartbeat and Blockreport messages\n        from the DataNodes. The Blockreport will contain information\n        about the data blocks that a DataNode is hosting. Each of these\n        blocks will have a specified minimum number of replicas. A block\n        is then considered safely replicated if the minimum number of\n        replicas matches the information received by the NameNode.\n        After a configurable percentage of safely replicated data blocks\n        is checked with the NameNode (plus an additional 30 seconds), the\n        NameNode can exit the Safemode state. It then determines\n        the list of data blocks that still have fewer than the\n        specified number of replicas and proceeds to replicate these blocks.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Persistence of File System Metadata")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The HDFS namespace is stored by the NameNode. The NameNode uses\n        a transaction log called EditLog to persistently record\n        changes that occur to a file. For instance, if a new fiile\n        is created, the NameNode will insert a record into the EditLog\n        indicating this action. Changing the replication factor of\n        a file also adds a new record to the EditLog. The NameNode\n        hosts the EditLog in a file within its local host OS. The entirety\n        of the system namespace, including the mapping of blocks to files\n        and file system properties, is stored in another file called\n        the FsImage. The FsImage is also stored in a file inside the\n        NameNode OS.\n      ")]),e._v(" "),n("p",[e._v("\n        When on-line, the NameNode keeps an image of the entire\n        file system namespace and file Blockmap in memory.\n        Whenever the NameNode stats up, or a checkpoint is triggered\n        by a configurable threshold, it reads the FsImage and EditLog from\n        disk, applies all the transactions from the EditLog to the in-memory\n        representationof the FsImage, and applies the new version\n        into the FsImage on disk. The NameNode can then truncate the\n        old EditLog because all the transactions have been applied\n        to the persistent FsImage. This process is called a checkpoint.\n        The purpose of a checkpoint is to make sure that the HDFS has a\n        consistent and up-to-date view of the file system metadata by\n        taking a snapshot of the file system and then saving it to the\n        FsImage. Even though it is efficient to read a FsImage, it is not\n        as efficient to make incremental edits directly to a FsImage.\n        Instead of modifying the FsImage file for each edit, we persist\n        the edits in the Editlog. A checkpoint can be triggered at a given\n        time interval (dfs.namenode.checkpoint.period) expressed in seconds,\n        or after a given number of filesystem transactions have accumulated\n        (dfs.namenode.checkpoint.txns). If both these properties are set,\n        the first threshold to be reached triggers a checkpoint.\n      ")]),e._v(" "),n("p",[e._v("\n        The DataNode stores HDFS data in files inside its local file system.\n        The DataNode has no knowledge about HDFS files. It stores each\n        block of HDFS data in a separate file in its local file system. Also,\n        the DataNode does not create all files in the same directory, it uses\n        a heuristic to determine the optimal number of files per directory\n        and creates subdirectories accordingly. It is not optimal to\n        have all local files in the same directory because the local file\n        system might not be able to efficiently support a huge number\n        of files in a single directory. When a DataNode starts up, it\n        scans through its local file system, generates a list of all\n        HDFS data blocks that correspond to each local file, and sends\n        this report to the NameNode. The report is called Blockreport.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Communication Protocols")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        HDFS communication protocols are layered on top of the TCP/IP\n        protocol. A client establishes a connection to a configurable\n        TCP port on the NameNode machine. It talks the ClientProtocol\n        with the NameNode. The DataNodes talk to the NameNode using the\n        DataNode Protocol. A "),n("i",[e._v("Remote Procedure Call")]),e._v("(RPC) abstraction\n        wraps both the Client Protocol and the DataNode Protocol.\n        By design, the NameNode never initiates any RPCs, it only responds\n        to RPC requests issued by either the DataNodes or the client.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Robustness")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The primary directive of HDFS is to store data reliably\n        even in the presence of failures. The three common types of failures\n        are: NameNode failures, DataNode failures, and network partitions.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Data disk failure, Heartbeats, and Re-replication")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Each DataNode periodically sends a Heartbeat message to the\n        NameNode. A network partition can cause a subset of DataNodes\n        to lose conectivity with the NameNode. The NameNode can detect\n        this condition by the absence of Heartbeat messages. The NameNode\n        marks DataNodes without recent Heartbeats as dead and therefore won't\n        forward any new IO requests to them. Any data registered to a dead\n        DataNode isn't available to HDFS any more. If a DataNode dies,\n        the replication factor of some blocks may go bellow\n        their configured value. The NameNode constantly tracks which blocks\n        need to be replicated and initiates replication whenever replication\n        is needed. The necessity for re-replication may arise by many reasons:\n        a DataNode may become unavailable, a replica may become corrupted,\n        a hard disk on a DataNode may fail, or the replication factor of a file\n        may be increased.\n      ")]),e._v(" "),n("p",[e._v("\n        The time-out to set DataNodes as dead is conservatively long\n        (over 10 minutes by default), so that replication storms caused\n        by state flapping of DataNodes can be avoided. Users can set\n        a shorter interval to mark DataNodes as stale and avoid stale\n        nodes on reading and/or writing by configuration for performance\n        sensitive workloads.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Cluster Rebalancing")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The HDFS architecture is compatible with data rebalancing schemes.\n        A scheme might automatically move data from one DataNode to another\n        if the free space on a DataNode falls bellow a certain threshold.\n        Whenever a sudden high demand for a particular file arises, a scheme\n        might dynamically create additional replicas and rebalance other\n        data in the cluster. These types of data rebalancing schemes are\n        "),n("b",[e._v("not\n        yet implemented.")])])]),e._v(" "),n("v-row",[n("h3",[e._v("Data Integrity")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        A fetched block of data can arrive corrupted. This corruption\n        can happen due to faults in a storage device, network faults, or\n        buggy software. The HDFS client software implements checksum\n        checking on the contents of HDFS files. When a client creates\n        an HDFS file, it computes a checksum of each block of the file\n        and stores these checksums in a separate hidden file in the same\n        HDFS namespace. When a client retrieves file contents, it verifies\n        that the data it received from each DataNode matches the checksum\n        stored in the associated checksum file. If not, then the client can\n        opt to retrieve that block from another DataNode that has a replica\n        of it.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Metadata Disk Failure")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The FsImage and the EditLog are paramount data structures of HDFS.\n        If one of these files gets corrupted, the HDFS instance will become\n        non-functional. For this reason, the NameNode can be configured to\n        maintain multiple copies of the FsImage and EditLog. Any update\n        to either file triggers each of the FsImages or EditLogs to get\n        updated synchronously. This synchronous update of multiple copies\n        of FsImage and EditLog may degrade the rate of namespace\n        transactions per second that a NameNode can support. However,\n        this degradation is tolerable because even though HDFS applications\n        are very data intensive, they are not metadata intensive. When a\n        NameNode restarts, it selects the latest consistent FsImage and\n        EditLog to use.\n      ")]),e._v(" "),n("p",[e._v("\n        Another option to increase resilience against failures is to enable\n        High Availability using multiple NameNodes either with a shared\n        storage on NFS or using a distributed edit log (called Journal).\n        The latter is the recommended approach.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Snapshots")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        Snapshots support storing a copy of data at a particular instant\n        of time. One usage of the snapshot feature may be to roll back\n        a corrupted HDFS instance to a previously known good point in time.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Data Organisation")])]),e._v(" "),n("v-row",[n("h3",[e._v("Data Blocks")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        HDFS is designed to support extremely large files. Applications\n        that are compatible with HDFS are those that deal with large\n        datasets. These applications write their data only once but\n        they read it one or more times and require these reads to be\n        satisfied at streaming speeds. HDFS supports write-once-read-many\n        semantics on files. A typical block size used by HDFS is 128MB.\n        Thus, an HDFS file is chopped up into 128MB chunks, and if possible,\n        each chunk will reside on a different DataNode.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Replication Pipelining")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        When a client is writing data with a replication factor of three,\n        the NameNode retrieves a list of DataNodes using a replication\n        target choosing algorithm. This list contains the DataNodes that\n        will host a replica of that block. The client then writes to\n        the first DataNode. The first DataNode starts receiving the\n        data in portions, writes each portion to its local repository\n        and transfers that portion to the second DataNode in the list.\n        The second DataNode will start receiving each portion of the data\n        block, writes that portion to its repository and then flushes\n        that portion to the third DataNode. Finally the third DataNode\n        writes the data to its local repository. Thus, a DataNode can be\n        receiving data from the previous one in the pipeline and at the\n        same time be forwarding data to the next one in the pipeline. Therefore\n        the data is pipelined from one DateNode to the next.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Accessibility")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The HDFS can be accessed in many different ways. Natively,\n        HDFS provides a FileSystem Java API for applications to use. There\n        is also a C language wrapper and a REST API for this Java API.\n        In addition to that, an HTTP browser can also be used to browse\n        files in the HDFS instance. By using NFS gateway, HDFS can be mounted\n        as part of the client's local file system.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("FS Shell")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The HDFS allows user data to be organised in the form of files\n        and directories. It provides a command-line interface called FS Shell\n        "),n("a",{attrs:{href:e.fsUrl,target:"_blank"}},[e._v("[5]")]),e._v("\n        that lets a user interact with the data. The syntax of this command set\n        is similar to other shells such as bash and csh.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("DFSAdmin")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        The DFSAdmin command set is used for administering an HDFS cluster.\n        These commands should only by used by an HDFS administrator.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Browser Interface")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        A typical HDFS install configures a web server to expose the HDFS\n        namespace through a configurable TCP port.\n      ")])]),e._v(" "),n("v-row",[n("h2",[e._v("Space Reclamation")])]),e._v(" "),n("v-row",[n("h3",[e._v("File Deletes and Undeletes")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        If trash configuration is enabled, files removed via FS Shell\n        are not immediately removed from HDFS. Instead, HDFS moves\n        it to a trash directory (each user has its own trash directory\n        under /user/<username>/.Trash). The file can be restored\n        quickly as long as it remains in the trash.\n      ")]),e._v(" "),n("p",[e._v("\n        Most recent deleted files are moved to the current trash\n        directory /user/<username>/.Trash/Current, and in a configurable\n        interval, HDFS creates checkpoints under\n        /user/<username>/.Trash/<date> for files in the\n        current trash directory and deletes old checkpoints when they are\n        expired.\n      ")]),e._v(" "),n("p",[e._v("\n        After the expiry of its life in trash, the NameNode deletes the file\n        from the HDFS namespace. The deletion of a file causes the blocks\n        associated with the file to be freed. Note that there could be an\n        appreciable time delay between the time a file is deleted by a user\n        and the time of the corresponding increase in free space in HDFS.\n      ")])]),e._v(" "),n("v-row",[n("h3",[e._v("Decrease Replication Factor")])]),e._v(" "),n("v-row",[n("p",[e._v("\n        When the replication factor of a file is reduced, the NameNode\n        selects excess replicas that can be deleted. The next Heartbeat\n        transfers this information to the DataNode. The DataNode then removes\n        the corresponding blocks and the corresponding free space appears in\n        the cluster. Once again, there might be a time delay between the\n        completion of the setReplication API call and the appearence of\n        free space in the cluster.\n      ")])])],1)],1)}),[],!1,null,"945fe160",null);t.default=component.exports;l()(component,{VFlex:h.a,VLayout:d.a,VRow:f.a})}}]);