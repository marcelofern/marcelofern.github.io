(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{217:function(e,n,t){"use strict";t(111);var r=t(74);n.a=Object(r.a)("layout")},218:function(e,n,t){"use strict";t(26),t(12);var r=t(3),o=(t(46),t(209),t(47),t(6),t(4),t(17),t(58),t(59),t(145),t(0)),c=t(112),l=t(2);function v(object,e){var n=Object.keys(object);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(object);e&&(t=t.filter((function(e){return Object.getOwnPropertyDescriptor(object,e).enumerable}))),n.push.apply(n,t)}return n}function f(e){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(n){Object(r.a)(e,n,source[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(source,n))}))}return e}var d=["sm","md","lg","xl"],_=["start","end","center"];function y(e,n){return d.reduce((function(t,r){return t[e+Object(l.n)(r)]=n(),t}),{})}var w=function(e){return[].concat(_,["baseline","stretch"]).includes(e)},O=y("align",(function(){return{type:String,default:null,validator:w}})),j=function(e){return[].concat(_,["space-between","space-around"]).includes(e)},E=y("justify",(function(){return{type:String,default:null,validator:j}})),h=function(e){return[].concat(_,["space-between","space-around","stretch"]).includes(e)},m=y("alignContent",(function(){return{type:String,default:null,validator:h}})),C={align:Object.keys(O),justify:Object.keys(E),alignContent:Object.keys(m)},S={align:"align",justify:"justify",alignContent:"align-content"};function L(e,n,t){var r=S[e];if(null!=t){if(n){var o=n.replace(e,"");r+="-".concat(o)}return(r+="-".concat(t)).toLowerCase()}}var P=new Map;n.a=o.a.extend({name:"v-row",functional:!0,props:f(f(f({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:w}},O),{},{justify:{type:String,default:null,validator:j}},E),{},{alignContent:{type:String,default:null,validator:h}},m),render:function(e,n){var t=n.props,data=n.data,o=n.children,l="";for(var v in t)l+=String(t[v]);var f=P.get(l);return f||function(){var e,n;for(n in f=[],C)C[n].forEach((function(e){var r=t[e],o=L(n,e,r);o&&f.push(o)}));f.push((e={"no-gutters":t.noGutters,"row--dense":t.dense},Object(r.a)(e,"align-".concat(t.align),t.align),Object(r.a)(e,"justify-".concat(t.justify),t.justify),Object(r.a)(e,"align-content-".concat(t.alignContent),t.alignContent),e)),P.set(l,f)}(),e(t.tag,Object(c.a)(data,{staticClass:"row",class:f}),o)}})},243:function(e,n,t){"use strict";t.r(n);var r={data:function(){return{}},head:{title:"Database Views - MarceloFern",meta:[{hid:"description",name:"description",content:"Database Views - Marcelo Fernandes"}]}},o=t(53),c=t(73),l=t.n(c),v=t(216),f=t(217),d=t(218),component=Object(o.a)(r,(function(){var e=this,n=e.$createElement,t=e._self._c||n;return t("v-layout",{staticClass:"post"},[t("v-flex",[t("v-row",[t("h1",[e._v("Database Views")])]),e._v(" "),t("v-row",[t("p",[e._v("\n        Views are an individual user's picture of the database.\n        They can be more technically introduced as a derived\n        table, given that any data in a view is retrieved\n        from base tables (the existing and permanent tables).\n      ")]),e._v(" "),t("p",[e._v("\n        Base syntax:\n      ")])]),e._v(" "),t("v-row",[t("blockquote",[e._v("\n        CREATE VIEW view_name AS SELECT query;\n      ")]),e._v(" "),t("blockquote",[e._v("\n        CREATE OR REPLACE VIEW view_name AS SELECT query;\n      ")])]),e._v(" "),t("v-row",[t("h2",[e._v("Benefits of using Views")])]),e._v(" "),t("v-row",[t("ol",[t("li",[e._v("\n          Usually includes less information from an underlying\n          full base table\n        ")]),e._v(" "),t("li",[e._v("\n          Simplifies the processing of data by the user\n        ")]),e._v(" "),t("li",[e._v("\n          May contain information from multiple base tables\n        ")]),e._v(" "),t("li",[e._v("\n          Splits the task to be done, therefore reducing complexity\n        ")]),e._v(" "),t("li",[e._v("\n          Interstitial results for debugging\n        ")]),e._v(" "),t("li",[e._v("\n          Provides security my excluding sensitive information\n        ")]),e._v(" "),t("li",[e._v("\n          Data independence as it can be used even after database\n          structure changes\n        ")]),e._v(" "),t("li",[e._v("\n          Customisable display to meet each user's criteria\n        ")])])]),e._v(" "),t("v-row",[t("h2",[e._v("Creating and using Views")])]),e._v(" "),t("v-row",[t("blockquote",[e._v("\n        CREATE VIEW PLAYER_CLUB AS"),t("br"),e._v("\n        (SELECT p.first_name, p.last_name, c.name"),t("br"),e._v("\n         FROM PLAYER p"),t("br"),e._v("\n         INNER JOIN CLUB c ON (p.club_id = c.id));\n      ")])]),e._v(" "),t("v-row",[t("blockquote",[e._v("\n        SELECT * FROM PLAYER_CLUB;\n      ")])]),e._v(" "),t("v-row",[t("blockquote",[e._v("\n        DROP VIEW PLAYER_CLUB;\n      ")])])],1)],1)}),[],!1,null,"656a0898",null);n.default=component.exports;l()(component,{VFlex:v.a,VLayout:f.a,VRow:d.a})}}]);