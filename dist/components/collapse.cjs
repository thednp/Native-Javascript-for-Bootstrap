"use strict";const e=require("./base-component-CEXwoid1.js"),q=require("./dataBsToggle-Dj-Ng54N.js"),g=require("./collapsingClass-CLblascz.js"),h=require("./showClass-D_Ms1FgG.js"),p=require("./getTargetElement-BJtPWRez.js"),$=require("./isDisabled-CST_xG4K.js"),l="collapse",E="Collapse",v=`.${l}`,u=`[${q.dataBsToggle}="${l}"]`,w={parent:null},c=a=>e.to(a,E),b=a=>new m(a),f=e.mo(`show.bs.${l}`),T=e.mo(`shown.bs.${l}`),d=e.mo(`hide.bs.${l}`),x=e.mo(`hidden.bs.${l}`),Y=a=>{const{element:t,parent:s,triggers:n}=a;e.q(t,f),f.defaultPrevented||(e.ho.set(t,e.ee,17),s&&e.ho.set(s,e.ee,17),e.qn(t,g.collapsingClass),e.Yn(t,l),e.Eo(t,{height:`${t.scrollHeight}px`}),e.so(t,()=>{e.ho.clear(t),s&&e.ho.clear(s),n.forEach(o=>e.Qn(o,e.Oe,"true")),e.Yn(t,g.collapsingClass),e.qn(t,l),e.qn(t,h.showClass),e.Eo(t,{height:""}),e.q(t,T)}))},C=a=>{const{element:t,parent:s,triggers:n}=a;e.q(t,d),d.defaultPrevented||(e.ho.set(t,e.ee,17),s&&e.ho.set(s,e.ee,17),e.Eo(t,{height:`${t.scrollHeight}px`}),e.Yn(t,l),e.Yn(t,h.showClass),e.qn(t,g.collapsingClass),e.bo(t),e.Eo(t,{height:"0px"}),e.so(t,()=>{e.ho.clear(t),s&&e.ho.clear(s),n.forEach(o=>e.Qn(o,e.Oe,"false")),e.Yn(t,g.collapsingClass),e.qn(t,l),e.Eo(t,{height:""}),e.q(t,x)}))},k=a=>{const{target:t}=a,s=t&&e.ke(t,u),n=s&&p.getTargetElement(s),o=n&&c(n);o&&(o.toggle(),s?.tagName==="A"&&a.preventDefault())};class m extends e.BaseComponent{static selector=v;static init=b;static getInstance=c;constructor(t,s){super(t,s);const{element:n,options:o}=this,i=e.d(n);this.triggers=[...e.de(u,i)].filter(r=>p.getTargetElement(r)===n),this.parent=e.m(o.parent)?o.parent:e.k(o.parent)?p.getTargetElement(n)||e.Ro(o.parent,i):null,this._toggleEventListeners(!0)}get name(){return E}get defaults(){return w}hide(){const{triggers:t,element:s}=this;e.ho.get(s)||(C(this),t.length&&t.forEach(n=>e.qn(n,`${l}d`)))}show(){const{element:t,parent:s,triggers:n}=this;let o,i;s&&(o=[...e.de(`.${l}.${h.showClass}`,s)].find(r=>c(r)),i=o&&c(o)),(!s||!e.ho.get(s))&&!e.ho.get(t)&&(i&&o!==t&&(C(i),i.triggers.forEach(r=>{e.qn(r,`${l}d`)})),Y(this),n.length&&n.forEach(r=>e.Yn(r,`${l}d`)))}toggle(){e.Zn(this.element,h.showClass)?this.hide():this.show()}_toggleEventListeners=t=>{const s=t?e.E:e.r,{triggers:n}=this;n.length&&n.forEach(o=>{$.isDisabled(o)||s(o,e.vt,k)})};dispose(){this._toggleEventListeners(),super.dispose()}}module.exports=m;
//# sourceMappingURL=collapse.cjs.map
