import{c as r,u,j as o}from"./react.BSh1R0b6.js";import{r as c}from"./index.CFBJwle0.js";import"./client.BTcJEq2_.js";/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const m={name:"moon",size:24,node:[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]]};m.node;const h=r(m);/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const i={name:"sun",size:24,node:[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]]};i.node;const l=r(i),p="mergecat-site-theme";function y(){const{t:s}=u(),[t,n]=c.useState(!0);c.useEffect(()=>{n(document.documentElement.classList.contains("dark"))},[]);const d=()=>{const e=!t;n(e);const a=document.documentElement;a.classList.toggle("dark",e),a.classList.toggle("light",!e);try{localStorage.setItem(p,e?"dark":"light")}catch{}};return o.jsx("button",{type:"button",onClick:d,"aria-label":s(t?"theme.toLight":"theme.toDark"),className:"gummy inline-flex size-9 cursor-pointer items-center justify-center rounded-md text-muted-foreground hover:bg-hover hover:text-foreground",children:t?o.jsx(l,{className:"size-[18px]","aria-hidden":!0}):o.jsx(h,{className:"size-[18px]","aria-hidden":!0})})}export{y as ThemeToggle};
