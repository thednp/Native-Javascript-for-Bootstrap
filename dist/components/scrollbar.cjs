"use strict";Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const t=require("./shorty-1329a513.cjs"),b="fixed-top",f="fixed-bottom",d="sticky-top",l="position-sticky",h=o=>[...t.ho(b,o),...t.ho(f,o),...t.ho(d,o),...t.ho(l,o),...t.ho("is-fixed",o)],m=o=>{const i=t.Jn(o);t.qn(i,{paddingRight:"",overflow:""});const s=h(i);s.length&&s.forEach(e=>{t.qn(e,{paddingRight:"",marginRight:""})})},g=o=>{const{clientWidth:i}=t.k(o),{innerWidth:s}=t.$n(o);return Math.abs(s-i)},y=(o,i)=>{const s=t.Jn(o),e=parseInt(t.E(s,"paddingRight"),10),c=t.E(s,"overflow")==="hidden"&&e?0:g(o),a=h(s);i&&(t.qn(s,{overflow:"hidden",paddingRight:`${e+c}px`}),a.length&&a.forEach(n=>{const p=t.E(n,"paddingRight");if(n.style.paddingRight=`${parseInt(p,10)+c}px`,[d,l].some(r=>t.kn(n,r))){const r=t.E(n,"marginRight");n.style.marginRight=`${parseInt(r,10)-c}px`}}))};exports.measureScrollbar=g;exports.resetScrollbar=m;exports.setScrollbar=y;
//# sourceMappingURL=scrollbar.cjs.map