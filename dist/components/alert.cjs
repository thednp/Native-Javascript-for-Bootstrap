"use strict";const s=require("./base-component-DMuoZh8G.js"),u=require("./fadeClass-Co6nOzNJ.js"),r=require("./showClass-D_Ms1FgG.js"),g=require("./dataBsDismiss-CMHF7If_.js"),h=require("./isDisabled-BhBg0EpT.js"),o="alert",a="Alert",p=`.${o}`,C=`[${g.dataBsDismiss}="${o}"]`,v=e=>s.Xn(e,a),E=e=>new d(e),c=s.po(`close.bs.${o}`),b=s.po(`closed.bs.${o}`),l=e=>{const{element:t}=e;s.G(t,b),e._toggleEventListeners(),e.dispose(),t.remove()};class d extends s.BaseComponent{static selector=p;static init=E;static getInstance=v;dismiss;constructor(t){super(t),this.dismiss=s.Ho(C,this.element),this._toggleEventListeners(!0)}get name(){return a}close=t=>{const{element:n,dismiss:i}=this;!n||!s.Gn(n,r.showClass)||t&&i&&h.isDisabled(i)||(s.G(n,c),!c.defaultPrevented&&(s.qn(n,r.showClass),s.Gn(n,u.fadeClass)?s.no(n,()=>l(this)):l(this)))};_toggleEventListeners=t=>{const n=t?s.E:s.r,{dismiss:i,close:m}=this;i&&n(i,s.gt,m)};dispose(){this._toggleEventListeners(),super.dispose()}}module.exports=d;
//# sourceMappingURL=alert.cjs.map
