"use strict";const d={},c=o=>{const{type:n,target:s,currentTarget:r}=o;[...d[n]].forEach(([e,t])=>{[r,s].includes(e)&&[...t].forEach(([a,i])=>{a.apply(e,[o]),typeof i=="object"&&i.once&&p(e,n,a,i)})})},E=(o,n,s,r)=>{d[n]||(d[n]=new Map);const e=d[n];e.has(o)||e.set(o,new Map);const t=e.get(o),{size:a}=t;t.set(s,r),a||o.addEventListener(n,c,r)},p=(o,n,s,r)=>{const e=d[n],t=e&&e.get(o),a=t&&t.get(s),i=a!==void 0?a:r;t&&t.has(s)&&t.delete(s),e&&(!t||!t.size)&&e.delete(o),(!e||!e.size)&&delete d[n],(!t||!t.size)&&o.removeEventListener(n,c,i)};exports.E=E;exports.d=p;
//# sourceMappingURL=event-listener-09f2aa63.cjs.map
