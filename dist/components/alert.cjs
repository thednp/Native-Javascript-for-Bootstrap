"use strict";const s=require("./base-component-CEXwoid1.js"),u=require("./fadeClass-Co6nOzNJ.js"),i=require("./showClass-D_Ms1FgG.js"),g=require("./dataBsDismiss-CMHF7If_.js"),h=require("./isDisabled-CST_xG4K.js"),n="alert",l="Alert",p=`.${n}`,v=`[${g.dataBsDismiss}="${n}"]`,C=t=>s.to(t,l),E=t=>new a(t),r=s.mo(`close.bs.${n}`),q=s.mo(`closed.bs.${n}`),c=t=>{const{element:e}=t;s.q(e,q),t._toggleEventListeners(),t.dispose(),e.remove()};class a extends s.BaseComponent{static selector=p;static init=E;static getInstance=C;dismiss;constructor(e){super(e),this.dismiss=s.Ro(v,this.element),this._toggleEventListeners(!0)}get name(){return l}close=()=>{const{element:e}=this;!e||!s.Zn(e,i.showClass)||(s.q(e,r),!r.defaultPrevented&&(s.Yn(e,i.showClass),s.Zn(e,u.fadeClass)?s.so(e,()=>c(this)):c(this)))};_toggleEventListeners=e=>{const d=e?s.E:s.r,{dismiss:o,close:m}=this;o&&!h.isDisabled(o)&&d(o,s.vt,m)};dispose(){this._toggleEventListeners(),super.dispose()}}module.exports=a;
//# sourceMappingURL=alert.cjs.map