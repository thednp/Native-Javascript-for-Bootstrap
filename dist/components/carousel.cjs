"use strict";const t=require("./base-component-CEXwoid1.js"),f=require("./activeClass-CxJYQAGN.js"),q=require("./getTargetElement-BJtPWRez.js"),H=require("./isDisabled-CST_xG4K.js"),x="carousel",Y="Carousel",T=`[data-bs-ride="${x}"]`,h=`${x}-item`,A="data-bs-slide-to",m="data-bs-slide",p="paused",S={pause:"hover",keyboard:!1,touch:!0,interval:5e3},g=n=>t.to(n,Y),k=n=>new X(n);let C=0,P=0,b=0;const E=t.mo(`slide.bs.${x}`),y=t.mo(`slid.bs.${x}`),N=n=>{const{index:i,direction:e,element:s,slides:a,options:c}=n;if(n.isAnimating){const r=D(n),o=e==="left"?"next":"prev",d=e==="left"?"start":"end";t.qn(a[i],f.activeClass),t.Yn(a[i],`${h}-${o}`),t.Yn(a[i],`${h}-${d}`),t.Yn(a[r],f.activeClass),t.Yn(a[r],`${h}-${d}`),t.q(s,y),t.ho.clear(s,m),n.cycle&&!t.d(s).hidden&&c.interval&&!n.isPaused&&n.cycle()}};function w(){const n=g(this);n&&!n.isPaused&&!t.ho.get(this,p)&&t.qn(this,p)}function B(){const n=g(this);n&&n.isPaused&&!t.ho.get(this,p)&&n.cycle()}function O(n){n.preventDefault();const i=t.ke(this,T)||q.getTargetElement(this),e=i&&g(i);if(!e||e.isAnimating)return;const s=+(t.j(this,A)||0);this&&!t.Zn(this,f.activeClass)&&!Number.isNaN(s)&&e.to(s)}function U(n){n.preventDefault();const i=t.ke(this,T)||q.getTargetElement(this),e=i&&g(i);if(!e||e.isAnimating)return;const s=t.j(this,m);s==="next"?e.next():s==="prev"&&e.prev()}const j=({code:n,target:i})=>{const e=t.d(i),[s]=[...t.de(T,e)].filter(d=>t.Do(d)),a=g(s);if(!a||a.isAnimating||/textarea|input|select/i.test(i.nodeName))return;const c=t.Uo(s),r=c?t.rn:t.cn,o=c?t.cn:t.rn;n===o?a.prev():n===r&&a.next()};function R(n){const{target:i}=n,e=g(this);e&&e.isTouch&&(e.indicator&&!e.indicator.contains(i)||!e.controls.includes(i))&&(n.stopImmediatePropagation(),n.stopPropagation(),n.preventDefault())}function K(n){const{target:i}=n,e=g(this);if(!e||e.isAnimating||e.isTouch)return;const{controls:s,indicators:a}=e;[...s,...a].every(c=>c===i||c.contains(i))||(C=n.pageX,this.contains(i)&&(e.isTouch=!0,L(e,!0)))}const Z=n=>{P=n.pageX},_=n=>{const{target:i}=n,e=t.d(i),s=[...t.de(T,e)].map(o=>g(o)).find(o=>o.isTouch);if(!s)return;const{element:a,index:c}=s,r=t.Uo(a);b=n.pageX,s.isTouch=!1,L(s),!e.getSelection()?.toString().length&&a.contains(i)&&Math.abs(C-b)>120&&(P<C?s.to(c+(r?-1:1)):P>C&&s.to(c+(r?1:-1))),C=0,P=0,b=0},I=(n,i)=>{const{indicators:e}=n;[...e].forEach(s=>t.Yn(s,f.activeClass)),n.indicators[i]&&t.qn(e[i],f.activeClass)},L=(n,i)=>{const{element:e}=n,s=i?t.E:t.r;s(t.d(e),t.zt,Z,t.vo),s(t.d(e),t.It,_,t.vo)},D=n=>{const{slides:i,element:e}=n,s=t.Ro(`.${h}.${f.activeClass}`,e);return s?[...i].indexOf(s):-1};class X extends t.BaseComponent{static selector=T;static init=k;static getInstance=g;constructor(i,e){super(i,e);const{element:s}=this;this.direction=t.Uo(s)?"right":"left",this.isTouch=!1,this.slides=t.Go(h,s);const{slides:a}=this;if(a.length<2)return;const c=D(this),r=[...a].find(u=>t.Ee(u,`.${h}-next`));this.index=c;const o=t.d(s);this.controls=[...t.de(`[${m}]`,s),...t.de(`[${m}][${q.dataBsTarget}="#${s.id}"]`,o)].filter((u,v,l)=>v===l.indexOf(u)),this.indicator=t.Ro(`.${x}-indicators`,s),this.indicators=[...this.indicator?t.de(`[${A}]`,this.indicator):[],...t.de(`[${A}][${q.dataBsTarget}="#${s.id}"]`,o)].filter((u,v,l)=>v===l.indexOf(u));const{options:d}=this;this.options.interval=d.interval===!0?S.interval:d.interval,r?this.index=[...a].indexOf(r):c<0&&(this.index=0,t.qn(a[0],f.activeClass),this.indicators.length&&I(this,0)),this.indicators.length&&I(this,this.index),this._toggleEventListeners(!0),d.interval&&this.cycle()}get name(){return Y}get defaults(){return S}get isPaused(){return t.Zn(this.element,p)}get isAnimating(){return t.Ro(`.${h}-next,.${h}-prev`,this.element)!==null}cycle(){const{element:i,options:e,isPaused:s,index:a}=this;t.ho.clear(i,x),s&&(t.ho.clear(i,p),t.Yn(i,p)),t.ho.set(i,()=>{this.element&&!this.isPaused&&!this.isTouch&&t.Do(i)&&this.to(a+1)},e.interval,x)}pause(){const{element:i,options:e}=this;this.isPaused||!e.interval||(t.qn(i,p),t.ho.set(i,()=>{},1,p))}next(){this.isAnimating||this.to(this.index+1)}prev(){this.isAnimating||this.to(this.index-1)}to(i){const{element:e,slides:s,options:a}=this,c=D(this),r=t.Uo(e);let o=i;if(this.isAnimating||c===o||t.ho.get(e,m))return;c<o||c===0&&o===s.length-1?this.direction=r?"right":"left":(c>o||c===s.length-1&&o===0)&&(this.direction=r?"left":"right");const{direction:d}=this;o<0?o=s.length-1:o>=s.length&&(o=0);const u=d==="left"?"next":"prev",v=d==="left"?"start":"end",l={relatedTarget:s[o],from:c,to:o,direction:d};t.N(E,l),t.N(y,l),t.q(e,E),!E.defaultPrevented&&(this.index=o,I(this,o),t.ue(s[o])&&t.Zn(e,"slide")?t.ho.set(e,()=>{t.qn(s[o],`${h}-${u}`),t.bo(s[o]),t.qn(s[o],`${h}-${v}`),t.qn(s[c],`${h}-${v}`),t.so(s[o],()=>this.slides&&this.slides.length&&N(this))},0,m):(t.qn(s[o],f.activeClass),t.Yn(s[c],f.activeClass),t.ho.set(e,()=>{t.ho.clear(e,m),e&&a.interval&&!this.isPaused&&this.cycle(),t.q(e,y)},0,m)))}_toggleEventListeners=i=>{const{element:e,options:s,slides:a,controls:c,indicators:r}=this,{touch:o,pause:d,interval:u,keyboard:v}=s,l=i?t.E:t.r;d&&u&&(l(e,t.wt,w),l(e,t.At,B)),o&&a.length>2&&(l(e,t.Ot,K,t.vo),l(e,t.Qt,R,{passive:!1}),l(e,t.je,R,{passive:!1})),c.length&&c.forEach($=>{H.isDisabled($)||l($,t.vt,U)}),r.length&&r.forEach($=>{H.isDisabled($)||l($,t.vt,O)}),v&&l(t.d(e),t.ft,j)};dispose(){const{isAnimating:i}=this,e={...this,isAnimating:i};this._toggleEventListeners(),super.dispose(),e.isAnimating&&t.so(e.slides[e.index],()=>{N(e)})}}module.exports=X;
//# sourceMappingURL=carousel.cjs.map