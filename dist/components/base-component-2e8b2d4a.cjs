"use strict";const _="aria-describedby",K="aria-expanded",X="aria-hidden",ee="aria-modal",te="aria-pressed",ne="aria-selected",oe="DOMContentLoaded",se="focus",re="focusin",ie="focusout",ae="keydown",le="keyup",ce="click",ue="mousedown",de="hover",me="mouseenter",pe="mouseleave",ge="mousemove",he="pointerdown",fe="pointermove",be="pointerup",we="resize",ye="scroll",ve="touchstart",Ee="ArrowDown",Ae="ArrowUp",Le="ArrowLeft",Ne="ArrowRight",ke="Escape",Me="transitionDuration",Te="transitionDelay",M="transitionend",q="transitionProperty",Pe=navigator.userAgentData,L=Pe,{userAgent:Be}=navigator,N=Be,C=/iPhone|iPad|iPod|Android/i;L?L.brands.some(e=>C.test(e.brand)):C.test(N);const F=/(iPhone|iPod|iPad)/,Ce=L?L.brands.some(e=>F.test(e.brand)):F.test(N);N&&N.includes("Firefox");const{head:k}=document;["webkitPerspective","perspective"].some(e=>e in k.style);const Fe=(e,t,n,o)=>{const s=o||!1;e.addEventListener(t,n,s)},je=(e,t,n,o)=>{const s=o||!1;e.removeEventListener(t,n,s)},De=(e,t,n,o)=>{const s=i=>{(i.target===e||i.currentTarget===e)&&(n.apply(e,[i]),je(e,t,s,o))};Fe(e,t,s,o)},S=()=>{};(()=>{let e=!1;try{const t=Object.defineProperty({},"passive",{get:()=>(e=!0,e)});De(document,oe,S,t)}catch{}return e})();["webkitTransform","transform"].some(e=>e in k.style);["webkitAnimation","animation"].some(e=>e in k.style);["webkitTransition","transition"].some(e=>e in k.style);const V=(e,t)=>e.getAttribute(t),He=(e,t)=>e.hasAttribute(t),W=(e,t,n)=>e.setAttribute(t,n),$e=(e,t)=>e.removeAttribute(t),qe=(e,...t)=>{e.classList.add(...t)},Se=(e,...t)=>{e.classList.remove(...t)},Ve=(e,t)=>e.classList.contains(t),E=e=>e!=null&&typeof e=="object"||!1,a=e=>E(e)&&typeof e.nodeType=="number"&&[1,2,3,4,5,6,7,8,9,10,11].some(t=>e.nodeType===t)||!1,u=e=>a(e)&&e.nodeType===1||!1,w=new Map,f={set:(e,t,n)=>{!u(e)||(w.has(t)||w.set(t,new Map),w.get(t).set(e,n))},getAllFor:e=>w.get(e)||null,get:(e,t)=>{if(!u(e)||!t)return null;const n=f.getAllFor(t);return e&&n&&n.get(e)||null},remove:(e,t)=>{const n=f.getAllFor(t);!n||!u(e)||(n.delete(e),n.size===0&&w.delete(t))}},We=(e,t)=>f.get(e,t),b=e=>typeof e=="string"||!1,x=e=>E(e)&&e.constructor.name==="Window"||!1,z=e=>a(e)&&e.nodeType===9||!1,g=e=>x(e)?e.document:z(e)?e:a(e)?e.ownerDocument:window.document,y=e=>Object.entries(e),O=e=>{if(!e)return;if(b(e))return g().createElement(e);const{tagName:t}=e,n=O(t);if(!n)return;const o={...e};return delete o.tagName,y(o).forEach(([s,i])=>{b(s)&&b(i)&&W(n,s,i)}),n},R=(e,t)=>e.dispatchEvent(t),v=(e,t)=>{const n=getComputedStyle(e),o=t.replace("webkit","Webkit").replace(/([A-Z])/g,"-$1").toLowerCase();return n.getPropertyValue(o)},xe=e=>{const t=v(e,q),n=v(e,Te),o=n.includes("ms")?1:1e3,s=t&&t!=="none"?parseFloat(n)*o:0;return Number.isNaN(s)?0:s},Q=e=>{const t=v(e,q),n=v(e,Me),o=n.includes("ms")?1:1e3,s=t&&t!=="none"?parseFloat(n)*o:0;return Number.isNaN(s)?0:s},ze=(e,t)=>{let n=0;const o=new Event(M),s=Q(e),i=xe(e);if(s){const l=c=>{c.target===e&&(t.apply(e,[c]),e.removeEventListener(M,l),n=1)};e.addEventListener(M,l),setTimeout(()=>{n||R(e,o)},s+i+17)}else t.apply(e,[o])},Oe=(e,t)=>e.focus(t),j=e=>["true",!0].includes(e)?!0:["false",!1].includes(e)?!1:["null","",null,void 0].includes(e)?null:e!==""&&!Number.isNaN(+e)?+e:e,U=e=>e.toLowerCase(),Re=(e,t,n,o)=>{const s={...n},i={...e.dataset},l={...t},c={},d="title";return y(i).forEach(([r,m])=>{const A=o&&typeof r=="string"&&r.includes(o)?r.replace(o,"").replace(/[A-Z]/g,Y=>U(Y)):r;c[A]=j(m)}),y(s).forEach(([r,m])=>{s[r]=j(m)}),y(t).forEach(([r,m])=>{r in s?l[r]=s[r]:r in c?l[r]=c[r]:l[r]=r===d?V(e,d):m}),l},P=(e,...t)=>Object.assign(e,...t),D=e=>Object.keys(e),Qe=(e,t)=>{const n=new CustomEvent(e,{cancelable:!0,bubbles:!0});return E(t)&&P(n,t),n},Ue={passive:!0},Ge=e=>e.offsetHeight,Ze=(e,t)=>{y(t).forEach(([n,o])=>{if(o&&b(n)&&n.includes("--"))e.style.setProperty(n,o);else{const s={};s[n]=o,P(e.style,s)}})},T=e=>E(e)&&e.constructor.name==="Map"||!1,Ie=e=>typeof e=="number"||!1,p=new Map,Je={set:(e,t,n,o)=>{!u(e)||(o&&o.length?(p.has(e)||p.set(e,new Map),p.get(e).set(o,setTimeout(t,n))):p.set(e,setTimeout(t,n)))},get:(e,t)=>{if(!u(e))return null;const n=p.get(e);return t&&n&&T(n)?n.get(t)||null:Ie(n)?n:null},clear:(e,t)=>{if(!u(e))return;const n=p.get(e);t&&t.length&&T(n)?(clearTimeout(n.get(t)),n.delete(t),n.size===0&&p.delete(e)):(clearTimeout(n),p.delete(e))}},G=(e,t)=>{const{width:n,height:o,top:s,right:i,bottom:l,left:c}=e.getBoundingClientRect();let d=1,r=1;if(t&&u(e)){const{offsetWidth:m,offsetHeight:A}=e;d=m>0?Math.round(n)/m:1,r=A>0?Math.round(o)/A:1}return{width:n/d,height:o/r,top:s/r,right:i/d,bottom:l/r,left:c/d,x:c/d,y:s/r}},Ye=e=>g(e).body,B=e=>g(e).documentElement;let H=0,$=0;const h=new Map,Z=(e,t)=>{let n=t?H:$;if(t){const o=Z(e),s=h.get(o)||new Map;h.has(o)||h.set(o,s),T(s)&&!s.has(t)?(s.set(t,n),H+=1):n=s.get(t)}else{const o=e.id||e;h.has(o)?n=h.get(o):(h.set(o,n),$+=1)}return n},_e=e=>{var t;return e?z(e)?e.defaultView:a(e)?(t=e?.ownerDocument)==null?void 0:t.defaultView:e:window},Ke=e=>Array.isArray(e)||!1,Xe=e=>{if(!a(e))return!1;const{top:t,bottom:n}=G(e),{clientHeight:o}=B(e);return t<=o&&n>=0},et=e=>typeof e=="function"||!1,tt=e=>a(e)&&["SVG","Image","Video","Canvas"].some(t=>e.constructor.name.includes(t))||!1,nt=e=>E(e)&&e.constructor.name==="NodeList"||!1,ot=e=>B(e).dir==="rtl",I=(e,t)=>e?e.closest(t)||I(e.getRootNode().host,t):null,J=(e,t)=>u(e)?e:(a(t)?t:g()).querySelector(e),st=(e,t)=>(a(t)?t:g()).getElementsByTagName(e),rt=(e,t)=>(a(t)?t:g()).querySelectorAll(e),it=(e,t)=>(t&&a(t)?t:g()).getElementsByClassName(e),at="5.0.0-alpha1",lt=at;class ct{element;options;constructor(t,n){const o=J(t);if(!o)throw b(t)?Error(`${this.name} Error: "${t}" is not a valid selector.`):Error(`${this.name} Error: your target is not an instance of HTMLElement.`);const s=f.get(o,this.name);s&&s.dispose(),this.element=o,this.defaults&&D(this.defaults).length&&(this.options=Re(o,this.defaults,n||{},"bs")),f.set(o,this.name,this)}get version(){return lt}get name(){return"BaseComponent"}get defaults(){return{}}dispose(){f.remove(this.element,this.name),D(this).forEach(t=>{delete this[t]})}}exports.$n=_e;exports.$t=O;exports.Ae=te;exports.An=$e;exports.BaseComponent=ct;exports.Bn=Oe;exports.Bt=ve;exports.E=v;exports.Ee=K;exports.F=W;exports.Fe=Ne;exports.Gn=Je;exports.He=Ee;exports.Jn=Ye;exports.Ln=We;exports.Lt=we;exports.Mn=qe;exports.Mt=he;exports.Nn=Se;exports.Pe=Ae;exports.Q=R;exports.Qn=Ge;exports.Rn=Ue;exports.Se=ne;exports.Tt=be;exports.Ue=Le;exports.W=x;exports.Wn=Qe;exports.Yt=S;exports.Zt=V;exports._=se;exports.a=a;exports.ae=Z;exports.be=X;exports.bo=rt;exports.ct=ae;exports.d=g;exports.de=I;exports.dt=ue;exports.eo=Xe;exports.et=ie;exports.ft=de;exports.g=b;exports.ge=_;exports.go=J;exports.gt=pe;exports.hn=He;exports.ho=it;exports.ht=ge;exports.it=le;exports.je=ke;exports.k=B;exports.kn=Ve;exports.kt=fe;exports.ln=Ce;exports.lo=nt;exports.mt=me;exports.oe=Q;exports.pe=st;exports.po=ot;exports.q=P;exports.qn=Ze;exports.se=U;exports.so=et;exports.tt=re;exports.u=u;exports.ue=Ke;exports.uo=tt;exports.ut=ce;exports.w=G;exports.we=ee;exports.xt=ye;exports.zn=ze;
//# sourceMappingURL=base-component-2e8b2d4a.cjs.map
