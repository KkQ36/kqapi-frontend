"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[703],{28826:function(F,v,a){a.r(v),a.d(v,{default:function(){return O}});var g=a(17061),n=a.n(g),y=a(17156),c=a.n(y),T=a(27424),h=a.n(T),I=a(12679),S=a(57405),s=a(67294),A=a(11382),j=a(39048),E=a(42122),G=a.n(E);function C(u){return i.apply(this,arguments)}function i(){return i=c()(n()().mark(function u(o){return n()().wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",(0,S.request)("/api/analysis/top/interface/invoke",G()({method:"GET"},o||{})));case 1:case"end":return e.stop()}},u)})),i.apply(this,arguments)}var l=a(85893),D=function(){var o=(0,s.useState)([]),f=h()(o,2),e=f[0],P=f[1],R=(0,s.useState)(!0),p=h()(R,2),U=p[0],Z=p[1];(0,s.useEffect)(function(){var r=function(){var B=c()(n()().mark(function m(){var d;return n()().wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,C();case 3:d=t.sent,d.data&&P(d.data),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error("Error fetching data:",t.t0);case 10:return t.prev=10,Z(!1),t.finish(10);case 13:case"end":return t.stop()}},m,null,[[0,7,10,13]])}));return function(){return B.apply(this,arguments)}}();r()},[]);var $=e.map(function(r){return{value:r.totalNum,name:r.name}}),z={title:{text:"\u8C03\u7528\u6B21\u6570\u6700\u591A\u7684\u63A5\u53E3TOP3",left:"center"},tooltip:{trigger:"item"},legend:{orient:"vertical",left:"left"},series:[{name:"Access From",type:"pie",radius:"70%",data:$,emphasis:{itemStyle:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]};return(0,l.jsx)(I._z,{children:(0,l.jsx)(A.Z,{spinning:U,children:(0,l.jsx)(j.Z,{option:z})})})},O=D}}]);
