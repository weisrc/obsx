(function(e,f){typeof exports=="object"&&typeof module!="undefined"?f(exports):typeof define=="function"&&define.amd?define(["exports"],f):(e=typeof globalThis!="undefined"?globalThis:e||self,f(e.obsx={}))})(this,function(e){"use strict";const f=Symbol("info"),b=(n,u)=>{do u(n);while(n=n[f].prev)};e.ignored=!1;function w(n){let u=e.ignored;e.ignored=!0,n(),e.ignored=u}function h(n,u,i,t=[]){if(!e.ignored)for(let o of u[f][n].keys())t.includes(o)||(o(...i),t.push(o))}function v(n,u,i){let t=u[f][n];return t.set(i,0),()=>t.delete(i)}function a(n,u){let i=[];return b(n,t=>i.push(v("set",t,u))),()=>i.forEach(t=>t())}e.use=()=>{};function g(n){let u=[],i=()=>{for(let o of u)o();u=[];let t=e.use;e.use=o=>u.push(a(o,i)),n(),e.use=t};i()}function M(n){let u=[n],i=()=>u;return m(i,i,i)[0]}function m(n,u,i,t){return i[f]={prev:t,call:new Map,set:new Map},new Proxy(Object.defineProperty(i,"$",{get:n,set:u}),{get(o,d,_){if(d in i)return i[d];let l=m(()=>{var r;return e.use(l),(r=n())==null?void 0:r[d]},r=>{n()[d]=r;let s=[];b(l,c=>h("set",c,[],s))},(...r)=>{var c;e.use(l);let s=(c=n())==null?void 0:c[d](...r);return h("call",l,[r,s]),s},_);return i[d]=l}})}e.bubble=b,e.emit=h,e.ignore=w,e.info=f,e.observe=M,e.on=v,e.run=g,e.watch=a,Object.defineProperties(e,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
