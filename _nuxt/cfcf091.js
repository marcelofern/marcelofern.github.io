(window.webpackJsonp=window.webpackJsonp||[]).push([[12],{220:function(t,e,n){var l=n(21);t.exports=function(t,e){if(!l(t)||t._t!==e)throw TypeError("Incompatible receiver, "+e+" required!");return t}},221:function(t,e,n){"use strict";var strong=n(222),l=n(220);t.exports=n(223)("Map",(function(t){return function(){return t(this,arguments.length>0?arguments[0]:void 0)}}),{get:function(t){var e=strong.getEntry(l(this,"Map"),t);return e&&e.v},set:function(t,e){return strong.def(l(this,"Map"),0===t?0:t,e)}},strong,!0)},222:function(t,e,n){"use strict";var l=n(28).f,v=n(73),o=n(147),r=n(50),_=n(145),c=n(146),h=n(105),f=n(148),d=n(106),C=n(22),E=n(103).fastKey,m=n(220),w=C?"_s":"size",x=function(t,e){var n,l=E(e);if("F"!==l)return t._i[l];for(n=t._f;n;n=n.n)if(n.k==e)return n};t.exports={getConstructor:function(t,e,n,h){var f=t((function(t,l){_(t,f,e,"_i"),t._t=e,t._i=v(null),t._f=void 0,t._l=void 0,t[w]=0,null!=l&&c(l,n,t[h],t)}));return o(f.prototype,{clear:function(){for(var t=m(this,e),data=t._i,n=t._f;n;n=n.n)n.r=!0,n.p&&(n.p=n.p.n=void 0),delete data[n.i];t._f=t._l=void 0,t[w]=0},delete:function(t){var n=m(this,e),l=x(n,t);if(l){var v=l.n,o=l.p;delete n._i[l.i],l.r=!0,o&&(o.n=v),v&&(v.p=o),n._f==l&&(n._f=v),n._l==l&&(n._l=o),n[w]--}return!!l},forEach:function(t){m(this,e);for(var n,l=r(t,arguments.length>1?arguments[1]:void 0,3);n=n?n.n:this._f;)for(l(n.v,n.k,this);n&&n.r;)n=n.p},has:function(t){return!!x(m(this,e),t)}}),C&&l(f.prototype,"size",{get:function(){return m(this,e)[w]}}),f},def:function(t,e,n){var l,v,o=x(t,e);return o?o.v=n:(t._l=o={i:v=E(e,!0),k:e,v:n,p:l=t._l,n:void 0,r:!1},t._f||(t._f=o),l&&(l.n=o),t[w]++,"F"!==v&&(t._i[v]=o)),t},getEntry:x,setStrong:function(t,e,n){h(t,e,(function(t,n){this._t=m(t,e),this._k=n,this._l=void 0}),(function(){for(var t=this._k,e=this._l;e&&e.r;)e=e.p;return this._t&&(this._l=e=e?e.n:this._t._f)?f(0,"keys"==t?e.k:"values"==t?e.v:[e.k,e.v]):(this._t=void 0,f(1))}),n?"entries":"values",!n,!0),d(e)}}},223:function(t,e,n){"use strict";var l=n(12),v=n(7),o=n(29),r=n(147),meta=n(103),_=n(146),c=n(145),h=n(21),f=n(23),d=n(104),C=n(72),E=n(107);t.exports=function(t,e,n,m,w,x){var O=l[t],y=O,R=w?"set":"add",N=y&&y.prototype,T={},S=function(t){var e=N[t];o(N,t,"delete"==t||"has"==t?function(a){return!(x&&!h(a))&&e.call(this,0===a?0:a)}:"get"==t?function(a){return x&&!h(a)?void 0:e.call(this,0===a?0:a)}:"add"==t?function(a){return e.call(this,0===a?0:a),this}:function(a,b){return e.call(this,0===a?0:a,b),this})};if("function"==typeof y&&(x||N.forEach&&!f((function(){(new y).entries().next()})))){var I=new y,L=I[R](x?{}:-0,1)!=I,k=f((function(){I.has(1)})),M=d((function(t){new y(t)})),j=!x&&f((function(){for(var t=new y,e=5;e--;)t[R](e,e);return!t.has(-0)}));M||((y=e((function(e,n){c(e,y,t);var l=E(new O,e,y);return null!=n&&_(n,w,l[R],l),l}))).prototype=N,N.constructor=y),(k||j)&&(S("delete"),S("has"),w&&S("get")),(j||L)&&S(R),x&&N.clear&&delete N.clear}else y=m.getConstructor(e,t,w,R),r(y.prototype,n),meta.NEED=!0;return C(y,t),T[t]=y,v(v.G+v.W+v.F*(y!=O),T),x||m.setStrong(y,t,w),y}},224:function(t,e,n){"use strict";n(108);var l=n(75);e.a=Object(l.a)("layout")},225:function(t,e,n){"use strict";n(27),n(13);var l=n(3),v=(n(37),n(221),n(38),n(6),n(4),n(16),n(54),n(55),n(149),n(1)),o=n(109),r=n(2);function _(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function c(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?_(Object(source),!0).forEach((function(e){Object(l.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):_(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var h=["sm","md","lg","xl"],f=["start","end","center"];function d(t,e){return h.reduce((function(n,l){return n[t+Object(r.n)(l)]=e(),n}),{})}var C=function(t){return[].concat(f,["baseline","stretch"]).includes(t)},E=d("align",(function(){return{type:String,default:null,validator:C}})),m=function(t){return[].concat(f,["space-between","space-around"]).includes(t)},w=d("justify",(function(){return{type:String,default:null,validator:m}})),x=function(t){return[].concat(f,["space-between","space-around","stretch"]).includes(t)},O=d("alignContent",(function(){return{type:String,default:null,validator:x}})),y={align:Object.keys(E),justify:Object.keys(w),alignContent:Object.keys(O)},R={align:"align",justify:"justify",alignContent:"align-content"};function N(t,e,n){var l=R[t];if(null!=n){if(e){var v=e.replace(t,"");l+="-".concat(v)}return(l+="-".concat(n)).toLowerCase()}}var T=new Map;e.a=v.a.extend({name:"v-row",functional:!0,props:c(c(c({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:C}},E),{},{justify:{type:String,default:null,validator:m}},w),{},{alignContent:{type:String,default:null,validator:x}},O),render:function(t,e){var n=e.props,data=e.data,v=e.children,r="";for(var _ in n)r+=String(n[_]);var c=T.get(r);return c||function(){var t,e;for(e in c=[],y)y[e].forEach((function(t){var l=n[t],v=N(e,t,l);v&&c.push(v)}));c.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(l.a)(t,"align-".concat(n.align),n.align),Object(l.a)(t,"justify-".concat(n.justify),n.justify),Object(l.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),T.set(r,c)}(),t(n.tag,Object(o.a)(data,{staticClass:"row",class:c}),v)}})},258:function(t,e,n){"use strict";n.r(e);var l={data:function(){return{}},head:{title:"Data Retrieval - MarceloFern",meta:[{hid:"description",name:"description",content:"Data Retrieval - Marcelo Fernandes - Single Table Data Retrieval, Multi Table Data Retrieval"}]}},v=n(56),o=n(74),r=n.n(o),_=n(217),c=n(224),h=n(225),component=Object(v.a)(l,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-layout",{staticClass:"post"},[n("v-flex",[n("v-row",[n("h1",[t._v("Data Retrieval")])]),t._v(" "),n("v-row",[n("p",{staticClass:"caption"},[t._v("Date: 2020-09-18")])]),t._v(" "),n("v-row",[n("h2",[t._v("Single Table Data Retrieval")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Simple queries can be executed by the SELECT statement. This\n        statement is the equivalent of the relation algebra's "),n("i",[t._v("\n        Selection, Projection, and Join")]),t._v(".\n      ")]),t._v(" "),n("p",[t._v("\n        The SELECT statement has the following form:\n      ")])]),t._v(" "),n("v-row",[n("blockquote",[n("p",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" ["),n("b",{staticClass:"blue-text"},[t._v("DISTINCT")]),t._v("\n          | "),n("b",{staticClass:"blue-text"},[n("b",{staticClass:"blue-text"},[t._v("ALL")])]),t._v("]"),t._v("\n          {* | [columnExpression\n          ["),n("b",{staticClass:"blue-text"},[t._v("AS")]),t._v(" newName]] [,...]}\n        ")]),t._v(" "),n("p",[n("b",{staticClass:"blue-text"},[n("b",{staticClass:"blue-text"},[t._v("FROM")])]),t._v("\n          TableName [alias] [,,..]\n        ")]),t._v(" "),n("p",[t._v("\n          ["),n("b",{staticClass:"blue-text"},[n("b",{staticClass:"blue-text"},[t._v("WHERE")])]),t._v(" "),n("i",[t._v("condition")]),t._v("]\n        ")]),t._v(" "),n("p",[t._v("\n          ["),n("b",{staticClass:"blue-text"},[n("b",{staticClass:"blue-text"},[t._v("GROUP BY")])]),t._v("\n          columnList]["),n("b",{staticClass:"blue-text"},[n("b",{staticClass:"blue-text"},[t._v("HAVING")])]),t._v(" "),n("i",[t._v("condition")]),t._v("]\n        ")]),t._v(" "),n("p",[t._v("\n          ["),n("b",{staticClass:"blue-text"},[n("b",{staticClass:"blue-text"},[t._v("ORDER BY")])]),t._v("\n          columnList]\n        ")])])]),t._v(" "),n("v-row",[n("ul",[n("li",[n("b",[t._v("columnExpression:")]),t._v(" represents a column name\n          or an expression\n        ")]),t._v(" "),n("li",[n("b",[t._v("TableName:")]),t._v(" an existent database table or view.\n        ")]),t._v(" "),n("li",[n("b",[t._v("alias:")]),t._v(" optional abbreviation for Tablename\n        ")])])]),t._v(" "),n("br"),t._v(" "),n("v-row",[n("p",[t._v("\n        The order of the clauses in a SELECT statement "),n("b",[t._v("cannot")]),t._v(" be\n        changed. SELECT and FROM are the only mandatory clauses.\n      ")]),t._v(" "),n("p",[t._v("The sequence that data is processed in a SELECT\n      statement is:\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[n("b",[n("i",[t._v("FROM:")])]),t._v(" which table or tables will be used.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("WHERE:")])]),t._v(" filters the rows based on a condition.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("GROUP BY:")])]),t._v(" Creates groups of rows with the\n          same column value.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("HAVING:")])]),t._v(" Filter the groups based on a condition.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("SELECT:")])]),t._v(" Specifies the columns that will show up\n          in the output.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("ORDER BY:")])]),t._v(" The output ordering based on a column.\n        ")])])]),t._v(" "),n("v-row",[n("h3",[t._v("WHERE clause")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        The WHERE clause filters out rows that don't respect a\n        "),n("i",[t._v("condition")]),t._v("."),n("br"),t._v("\n        There are 5 basic conditions (or "),n("i",[t._v("predicates")]),t._v(") for\n        the WHERE clause:\n      ")])]),t._v(" "),n("v-row",[n("ul",[n("li",[n("b",[n("i",[t._v("Comparison:")])]),t._v(" Between two expressions:"),n("br"),t._v(" "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" score > 80 (greater than)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" score <> 80 (not equal to -\n            ISO standard)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" score != 80 (not equal to)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" (score != 80)\n            "),n("b",{staticClass:"blue-text"},[t._v(" AND")]),t._v(" (score > 24)"),n("br")])]),t._v(" "),n("li",[n("b",[n("i",[t._v("Range:")])]),t._v(" If a value falls within\n          a range of values:"),n("br"),t._v(" "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" score BETWEEN 40\n            "),n("b",{staticClass:"blue-text"},[t._v("AND")]),t._v(" 60"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" score > = 10 and score < 20\n          ")])]),t._v(" "),n("li",[n("b",[n("i",[t._v("Membership:")])]),t._v(" If the value belongs to a defined\n          set:"),n("br"),t._v(" "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" name IN ('Messi', 'Ronaldo')\n          ")])]),t._v(" "),n("li",[n("b",[n("i",[t._v("Pattern Match:")])]),t._v(" If the value matches a given\n          string pattern:"),n("br"),t._v(" "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" name LIKE 'M%'\n            (names starting with M)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" name LIKE 'M___'\n            (names starting with M and with exactly \n            4 characters)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" name LIKE '%son%'\n            (names that included son)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" position LIKE '15#%'\n            ESCAPE '#' (escaping the % character)"),n("br")])]),t._v(" "),n("li",[n("b",[n("i",[t._v("Null:")])]),t._v(" if the value is "),n("b",{staticClass:"blue-text"},[t._v("\n          NULL")]),n("br"),t._v(" "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" profession is\n            "),n("b",{staticClass:"blue-text"},[t._v("NULL")]),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" target\n            "),n("b",{staticClass:"blue-text"},[t._v("IS")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("NOT")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("NULL")]),n("br")])])])]),t._v(" "),n("v-row",[n("h3",[t._v("ORDER BY clause")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Columns can be ordered by one or many columns.\n      ")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("ORDER BY")]),t._v(" salary DESC"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("ORDER BY")]),t._v(" age, salary ASC\n      ")])]),t._v(" "),n("v-row",[n("h3",[t._v("GROUP BY clause")])]),t._v(" "),n("v-row",[n("p",[t._v('\n        The GROUP BY clause groups the data from a SELECT table\n        and creates a single summary row for each group. Each group\n        is composed by different values from the column that is\n        "grouped by".\n      ')])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("GROUP BY")]),t._v(" class "),n("b",{staticClass:"blue-text"},[t._v("\n        HAVING COUNT")]),t._v("(student) > 1\n      ")])]),t._v(" "),n("v-row",[n("h3",[t._v("Aggregation functions")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Aggregation functions are used for executing an operation\n        on a table column, and retrieving a single result based on that\n        operation.\n      ")])]),t._v(" "),n("v-row",[n("ul",[n("li",[n("b",[n("i",[t._v("COUNT:")])]),t._v(" fetches the number of values in a specified\n          column.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("SUM:")])]),t._v(" fetches the sum of the values in a specified\n          column.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("AVG:")])]),t._v(" fetches the average of the values in a\n          specified column.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("MIN:")])]),t._v(" fetches the smallest values in a specified\n          column.\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("MAX:")])]),t._v(" fetches the largest value in a specified\n          column.\n        ")])])]),t._v(" "),n("v-row",[n("h2",[t._v("Subqueries")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Subqueries can be created by nesting SELECT statements.\n        The results from the inner queried are used to determine\n        the final results for the outter query. This operation is called\n        "),n("b",[t._v("subselect")]),n("br"),t._v("\n        Additionally, SELECTs can be used in WHERE and HAVING\n        clauses to filter out results. This operation is called\n        "),n("b",[t._v("subquery")]),t._v(" or "),n("b",[t._v("nested query")])])]),t._v(" "),n("v-row",[n("ul",[n("li",[n("b",[n("i",[t._v("Scalar subquery:")])]),t._v(" returns a single column and\n          a single row. I.e, a single value."),n("br"),t._v("\n          Example:"),n("br"),t._v(" "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" fName, lName"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Student"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" collegeNo =\n            ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" collegeNo\n            "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" College\n            "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" street = ‘Austin St’);\n          ")])]),t._v(" "),n("li",[n("b",[n("i",[t._v("Row subquery:")])]),t._v(" returns multiple columns but a\n          single row\n        ")]),t._v(" "),n("li",[n("b",[n("i",[t._v("Table subquery:")])]),t._v(" returns one or more columns and\n          multiple rows.\n          "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" fName, lName"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Parent"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" chieldId\n            "),n("b",{staticClass:"blue-text"},[t._v("IN")]),t._v("\n            ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" studentId from Student\n            "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v("\n            collegeNo = ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v("\n            collegeNo "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" College\n            "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" street =\n            'Austin St'));\n          ")])])])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Additionally, the key-word "),n("b",[t._v("EXISTS")]),t._v(" is designed to\n        be used only with sub-queries. The result of a query containing\n        the EXISTS key-word is a true/false boolean.\n      ")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" staffId, fName"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Staff s"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("EXISTS")]),t._v("\n        ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" * "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v("\n        Branch b "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" s.branchId = \n        b.branchId "),n("b",{staticClass:"blue-text"},[t._v("AND")]),t._v(" city = 'London');\n      ")])]),t._v(" "),n("v-row",[n("p",[t._v("Which is the same as:")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" staffId, fName"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Staff s, Branch b"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" s.branchId = b.branchId\n        "),n("b",{staticClass:"blue-text"},[t._v("AND")]),t._v(" city = 'London';\n      ")])]),t._v(" "),n("v-row",[n("h2",[t._v("Multi Table Data Retrieval")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Multi table data queries can be performed using a "),n("b",[t._v("join")]),t._v("\n        operation. The idea is to combine information from different\n        tables by looking at their related rows. The related rows\n        will be the ones where the different tables have the same value\n        for a given column\n      ")]),t._v(" "),n("p",[t._v("\n        The "),n("b",[t._v("join")]),t._v(" operation is used when the result of an SQL query\n        displays information about columns from more than one table.\n        If this is not the case, and only the columns from a single\n        table are required in the result, a "),n("b",[t._v("subquery")]),t._v(" is more\n        appropriate.\n      ")])]),t._v(" "),n("v-row",[n("h3",[t._v("Simple Join / Inner Join")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        A simple join can be performed by including more than one table\n        in the FROM clause. The tables must be split by comma and\n        the table name can be followed by an alias:\n      ")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" p.city, fName, lName, presidentId\n        "),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Player p, Team t"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" p.id = t.captainId;\n      ")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        This can also be written as:\n      ")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" p.city, fName, lName, presidentId\n        "),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Player p\n        "),n("b",{staticClass:"blue-text"},[t._v("JOIN")]),t._v(" Team t"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("ON")]),t._v(" (p.id = t.captainId);\n      ")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Or:\n      ")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" p.city, fName, lName, presidentId\n        "),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Player p\n        "),n("b",{staticClass:"blue-text"},[t._v("INNER JOIN")]),t._v(" Team t"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("ON")]),t._v(" (p.id = t.captainId);\n      ")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Given that the "),n("b",[t._v("city")]),t._v(" column is defined on\n        both tables, we need to specify which one we are\n        pulling data from, hence we use the alias in front of the column\n        name. The other columns are defined only in one of the\n        tables. Although this example would work, the best practice is to\n        include the alias in front of every column name to clarify\n        which table the column is coming from.\n      ")]),t._v(" "),n("p",[t._v("\n        To join those tables, we specify the WHERE/ON clause to search for\n        "),n("b",[t._v("matching columns")]),t._v(" from both tables.\n      ")]),t._v(" "),n("p",[t._v("An example of a join operation with 3 tables:")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" b.branchId, s.StaffId, s.fName,\n        p.propertyId"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Branch b, Staff s,\n        Property p"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" b.branchId = s.branchId\n        "),n("b",{staticClass:"blue-text"},[t._v("AND")]),t._v(" s.staffId = p.staffId"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("ORDER BY")]),t._v(" b.branchId, s.staffId,\n        p.propertyId;\n      ")])]),t._v(" "),n("v-row",[n("p",[t._v("Or:")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" b.branchId, s.StaffId, s.fName,\n        p.propertyId"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Branch b"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("INNER JOIN")]),t._v(" Staff s\n        "),n("b",{staticClass:"blue-text"},[t._v("ON")]),t._v(" (b.branchId = s.branchId)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("INNER JOIN")]),t._v(" Property p\n        "),n("b",{staticClass:"blue-text"},[t._v("ON")]),t._v(" (s.staffId = p.staffId)"),n("br")])]),t._v(" "),n("v-row",[n("h3",[t._v("JOIN Clause")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        A JOIN between tables results in a "),n("b",[t._v("Cartesian product")]),t._v(".\n        The Cartesian product between two tables is a third table that\n        consists of all possible pairs of rows from the two tables.\n        The third table will have all the columns from the first table\n        followed by all the columns from the second table.\n      ")]),t._v(" "),n("p",[t._v("\n        The Cartesian product can be obtained by:\n      ")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("[DISTINCT")]),t._v(" |\n        "),n("b",{staticClass:"blue-text"},[t._v("ALL")]),t._v("] {* | columnList}"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Table1 "),n("b",{staticClass:"blue-text"},[t._v("CROSS")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("JOIN")]),t._v(" Table2\n      ")])]),t._v(" "),n("v-row",[n("h4",[t._v("Outer Joins")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        So far, we have presented join operations that retrieve\n        related rows from different tables when they have matching\n        columns. The "),n("b",[t._v("outer")]),t._v(" join is used when we want\n        to retain the rows that do not satisfy the join\n        condition "),n("b",[t._v("as well as the ones that do satisfy the join condition.\n        ")])]),t._v(" "),n("p",[t._v("\n        There are 3 different types of outer joins: "),n("b",[t._v("Left, Right,\n        and Full")]),t._v(":\n      ")])]),t._v(" "),n("v-row",[n("ol",[n("li",[n("b",[t._v("Left:")]),t._v(" The left outer join will keep the rows from the\n          first table that don't meet the joining criteria\n          while setting the second table column values to NULL"),n("br"),t._v(" "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" b.name, p.name, p.ownerName"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Branch b "),n("b",{staticClass:"blue-text"},[t._v("\n            LEFT OUTER")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("JOIN")]),t._v(" Property p\n            "),n("b",{staticClass:"blue-text"},[t._v("ON")]),t._v(" b.city = p.city\n          ")]),t._v("\n          The property name and ownerName would be set to NULL for\n          the cases where b.city =! p.city"),n("br"),n("br")]),t._v(" "),n("li",[n("b",[t._v("Right:")]),t._v(" The right outer join will keep the rows from the\n          "),n("b",[t._v("second")]),t._v(" table that don't meet the joining criteria\n          while setting the first table columns value to NULL"),n("br"),t._v(" "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" b.name, p.name, p.ownerName"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Branch b "),n("b",{staticClass:"blue-text"},[t._v("\n            RIGHT OUTER")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("JOIN")]),t._v(" Property p\n            "),n("b",{staticClass:"blue-text"},[t._v("ON")]),t._v(" b.city = p.city\n          ")]),t._v("\n          The branch name would be set to NULL for\n          the cases where b.city =! p.city"),n("br"),n("br")]),t._v(" "),n("li",[n("b",[t._v("Full:")]),t._v(" Includes not only the matching results but also\n          results from both tables that do not match the join condition.\n          "),n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" b.name, p.name, p.ownerName"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Branch b "),n("b",{staticClass:"blue-text"},[t._v("\n            FULL OUTER")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("JOIN")]),t._v(" Property p\n            "),n("b",{staticClass:"blue-text"},[t._v("ON")]),t._v(" b.city = p.city\n          ")]),t._v("\n          Some rows would have the branch name set to NULL whereas\n          some rows would have the property name and ownerName set to NULL\n          (both happening when b.city =! p.city)."),n("br")])])]),t._v(" "),n("v-row",[n("h3",[t._v("Non-Equi Join")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Some times there isn't a primary key - foreign key\n        relationship between tables, but there might be\n        some other ways in which we want to relate data.\n        For those cases, the condition \"equal to\" won't surface and\n        we have to resort to a different kind of conditional operator.\n        This particular JOIN scenario is named NON-EQUI JOIN.\n      ")]),t._v(" "),n("p",[t._v("Example:")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" playerId, scores"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Player, Score"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" Score\n        "),n("b",{staticClass:"blue-text"},[t._v("BETWEEN")]),t._v(" 20\n        "),n("b",{staticClass:"blue-text"},[t._v("AND")]),t._v(" 50;\n      ")])]),t._v(" "),n("v-row",[n("h3",[t._v("Self Join")])]),t._v(" "),n("v-row",[n("p",[t._v("\n        Used for the cases where we need to fetch data from a recursive\n        relationship. We then SELF-JOIN the table (Joining the table to\n        itself).\n      ")]),t._v(" "),n("p",[t._v("\n        Example - List the book code for each pair of book that has \n        the same price:\n      ")])]),t._v(" "),n("v-row",[n("blockquote",[n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" f.BOOK_CODE, s.BOOK_CODE, f.PRICE"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" BOOK f, BOOK s"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" f.PRICE = s.PRICE\n        "),n("b",{staticClass:"blue-text"},[t._v("AND")]),t._v(" f.BOOK_CODE <> s.BOOK_CODE"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("ORDER BY")]),t._v(" f.BOOK_CODE, s.BOOK_CODE;\n      ")])]),t._v(" "),n("v-row",[n("h3",[t._v("Combining results (UNION, INTERSECT, EXCEPT)")])]),t._v(" "),n("v-row",[n("p",[t._v("Combining operators follow the corresponding format:")]),t._v(" "),n("p",[n("u",[t._v("operator")]),t._v(" ["),n("b",{staticClass:"blue-text"},[t._v("ALL")]),t._v("] \n        ["),n("b",{staticClass:"blue-text"},[t._v("CORRESPONDING")]),t._v("\n        ["),n("b",{staticClass:"blue-text"},[t._v("BY")]),t._v(" {column1 [, ...]}]]\n      ")]),t._v(" "),n("p",[t._v("\n        If CORRESPONDING BY is specified, then the union is performed \n        on the named column(s). If CORRESPONDING is specified but\n        not with the BY clause, the set of operation is performed\n        on the columns that are common to both tables.\n      ")])]),t._v(" "),n("v-row",[n("ul",[n("li",[n("b",[n("i",[t._v("Union:")])]),t._v(" creates a resulting table with \n          all rows that belong to a either a table A or a table B\n          along with the rows that appear on both tables.\n          "),n("br"),t._v(" "),n("blockquote",[t._v("\n            ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" * "),n("b",{staticClass:"blue-text"},[t._v("\n            FROM")]),t._v(" Staff "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v("\n            city "),n("b",{staticClass:"blue-text"},[t._v("IS")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("\n            NOT")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("NULL")]),t._v(")"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("UNI"),n("b",{staticClass:"blue-text"},[t._v("ON")])]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("CORRESPONDING BY")]),t._v(" city"),n("br"),t._v("\n            ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" * "),n("b",{staticClass:"blue-text"},[t._v("\n            FROM")]),t._v(" Warehouse "),n("b",{staticClass:"blue-text"},[t._v("WHERE")]),t._v(" city\n            "),n("b",{staticClass:"blue-text"},[t._v("IS")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("NOT")]),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("NULL")]),t._v(")"),n("br")])]),t._v(" "),n("li",[n("b",[n("i",[t._v("Intersection:")])]),t._v(" creates a resulting table\n          with only all rows that are common to both tables A and B.\n          "),n("br"),t._v(" "),n("blockquote",[t._v("\n            ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" city "),n("b",{staticClass:"blue-text"},[t._v("\n            FROM")]),t._v(" Staff)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("INTERSECT")]),n("br"),t._v("\n            ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" city\n            "),n("b",{staticClass:"blue-text"},[t._v("FROM")]),t._v(" Branch)\n          ")])]),t._v(" "),n("li",[n("b",[n("i",[t._v("Difference (except):")])]),t._v(" retrieves a table with all rows\n          that are in table A but not in table B."),n("br"),t._v(" "),n("blockquote",[t._v("\n            ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" name "),n("b",{staticClass:"blue-text"},[t._v("\n            FROM")]),t._v(" Customer)"),n("br"),t._v(" "),n("b",{staticClass:"blue-text"},[t._v("EXCEPT")]),n("br"),t._v("\n            ("),n("b",{staticClass:"blue-text"},[t._v("SELECT")]),t._v(" name "),n("b",{staticClass:"blue-text"},[t._v("\n            FROM")]),t._v(" Staff)"),n("br")])])])]),t._v(" "),n("v-row",[n("p",[t._v("\n        One important thing to keep in mind is that two tables can\n        only be combined if they have the same structure. Tables\n        with the same structure are called "),n("b",[t._v("union-compatible")]),t._v(".\n        This implies that the tables have the same number of columns \n        and that those columns have the same data types and lengths.\n      ")])])],1)],1)}),[],!1,null,"341b1451",null);e.default=component.exports;r()(component,{VFlex:_.a,VLayout:c.a,VRow:h.a})}}]);