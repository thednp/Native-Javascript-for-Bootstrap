"use strict";const t=require("./base-component-DMuoZh8G.js"),i=require("./activeClass-CxJYQAGN.js"),r=require("./dataBsToggle-Dj-Ng54N.js"),l=require("./isDisabled-BhBg0EpT.js"),u="button",c="Button",g=`[${r.dataBsToggle}="${u}"]`,v=n=>t.Xn(n,c),b=n=>new a(n);class a extends t.BaseComponent{static selector=g;static init=b;static getInstance=v;constructor(s){super(s);const{element:e}=this;this.isActive=t.Gn(e,i.activeClass),t.Wn(e,t.Ie,String(!!this.isActive)),this._toggleEventListeners(!0)}get name(){return c}toggle=s=>{s&&s.preventDefault();const{element:e,isActive:o}=this;if(l.isDisabled(e))return;(o?t.qn:t.Kn)(e,i.activeClass),t.Wn(e,t.Ie,o?"false":"true"),this.isActive=t.Gn(e,i.activeClass)};_toggleEventListeners=s=>{(s?t.E:t.r)(this.element,t.gt,this.toggle)};dispose(){this._toggleEventListeners(),super.dispose()}}module.exports=a;
//# sourceMappingURL=button.cjs.map
