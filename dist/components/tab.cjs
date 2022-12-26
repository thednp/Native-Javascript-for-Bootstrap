"use strict";const t=require("./shorty-1329a513.cjs"),m=require("./event-listener-2a5f29ed.cjs"),v=require("./collapsingClass-889bd3db.cjs"),c=require("./activeClass-a1284579.cjs"),u=require("./fadeClass-a4944cf1.cjs"),f=require("./showClass-2174a6d6.cjs"),T=require("./dropdownClasses-c131c53f.cjs"),P=require("./dataBsToggle-c8bc9e7f.cjs"),p=require("./getTargetElement-379ad550.cjs"),W=require("./base-component.cjs"),h="tab",S="Tab",k=`[${P.dataBsToggle}="${h}"]`,y=a=>t.Ln(a,S),z=a=>new G(a),C=t.Wn(`show.bs.${h}`),M=t.Wn(`shown.bs.${h}`),b=t.Wn(`hide.bs.${h}`),E=t.Wn(`hidden.bs.${h}`),d=new Map,H=a=>{const{tabContent:n,nav:e}=a;n&&t.kn(n,v.collapsingClass)&&(n.style.height="",t.Nn(n,v.collapsingClass)),e&&t.Gn.clear(e)},x=a=>{const{element:n,tabContent:e,content:s,nav:l}=a,{tab:o}=t.u(l)&&d.get(l)||{tab:null};if(e&&s&&t.kn(s,u.fadeClass)){const{currentHeight:i,nextHeight:r}=d.get(n)||{currentHeight:0,nextHeight:0};i===r?H(a):setTimeout(()=>{e.style.height=`${r}px`,t.Qn(e),t.zn(e,()=>H(a))},50)}else l&&t.Gn.clear(l);M.relatedTarget=o,t.Q(n,M)},q=a=>{const{element:n,content:e,tabContent:s,nav:l}=a,{tab:o,content:i}=l&&d.get(l)||{tab:null,content:null};let r=0;if(s&&e&&t.kn(e,u.fadeClass)&&([i,e].forEach(g=>{t.u(g)&&t.Mn(g,"overflow-hidden")}),r=t.u(i)?i.scrollHeight:0),C.relatedTarget=o,E.relatedTarget=n,t.Q(n,C),!C.defaultPrevented){if(e&&t.Mn(e,c.activeClass),i&&t.Nn(i,c.activeClass),s&&e&&t.kn(e,u.fadeClass)){const g=e.scrollHeight;d.set(n,{currentHeight:r,nextHeight:g,tab:null,content:null}),t.Mn(s,v.collapsingClass),s.style.height=`${r}px`,t.Qn(s),[i,e].forEach(w=>{w&&t.Nn(w,"overflow-hidden")})}e&&e&&t.kn(e,u.fadeClass)?setTimeout(()=>{t.Mn(e,f.showClass),t.zn(e,()=>{x(a)})},1):(e&&t.Mn(e,f.showClass),x(a)),o&&t.Q(o,E)}},$=a=>{const{nav:n}=a;if(!t.u(n))return{tab:null,content:null};const e=t.ho(c.activeClass,n);let s=null;e.length===1&&!T.dropdownMenuClasses.some(o=>t.kn(e[0].parentElement,o))?[s]=e:e.length>1&&(s=e[e.length-1]);const l=t.u(s)?p.getTargetElement(s):null;return{tab:s,content:l}},N=a=>{if(!t.u(a))return null;const n=t.de(a,`.${T.dropdownMenuClasses.join(",.")}`);return n?t.go(`.${T.dropdownMenuClasses[0]}-toggle`,n):null},Q=(a,n)=>{(n?m.E:m.r)(a.element,t.ut,D)},D=a=>{const n=y(a.target);n&&(a.preventDefault(),n.show())};class G extends W{static selector=k;static init=z;static getInstance=y;constructor(n){super(n);const{element:e}=this,s=p.getTargetElement(e);if(!s)return;const l=t.de(e,".nav"),o=t.de(s,".tab-content");this.nav=l,this.content=s,this.tabContent=o,this.dropdown=N(e);const{tab:i}=$(this);if(l&&!i){const r=t.go(k,l),g=r&&p.getTargetElement(r);g&&(t.Mn(r,c.activeClass),t.Mn(g,f.showClass),t.Mn(g,c.activeClass),t.F(e,t.Se,"true"))}Q(this,!0)}get name(){return S}show(){const{element:n,content:e,nav:s,dropdown:l}=this;if(!(s&&t.Gn.get(s))&&!t.kn(n,c.activeClass)){const{tab:o,content:i}=$(this);if(s&&d.set(s,{tab:o,content:i,currentHeight:0,nextHeight:0}),b.relatedTarget=n,t.u(o)&&t.Q(o,b),b.defaultPrevented)return;t.Mn(n,c.activeClass),t.F(n,t.Se,"true");const r=t.u(o)&&N(o);if(r&&t.kn(r,c.activeClass)&&t.Nn(r,c.activeClass),s){const g=()=>{o&&(t.Nn(o,c.activeClass),t.F(o,t.Se,"false")),l&&!t.kn(l,c.activeClass)&&t.Mn(l,c.activeClass)};i&&(t.kn(i,u.fadeClass)||e&&t.kn(e,u.fadeClass))?t.Gn.set(s,g,1):g()}i&&(t.Nn(i,f.showClass),t.kn(i,u.fadeClass)?t.zn(i,()=>q(this)):q(this))}}dispose(){Q(this),super.dispose()}}module.exports=G;
//# sourceMappingURL=tab.cjs.map