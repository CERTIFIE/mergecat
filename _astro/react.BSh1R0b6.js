import{r as c}from"./index.CFBJwle0.js";import{b as P,g as _,c as I,p as B}from"./client.BTcJEq2_.js";var m={exports:{}},x={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var N;function T(){if(N)return x;N=1;var e=Symbol.for("react.transitional.element"),t=Symbol.for("react.fragment");function n(o,r,i){var u=null;if(i!==void 0&&(u=""+i),r.key!==void 0&&(u=""+r.key),"key"in r){i={};for(var l in r)l!=="key"&&(i[l]=r[l])}else i=r;return r=i.ref,{$$typeof:e,type:o,key:u,ref:r!==void 0?r:null,props:i}}return x.Fragment=t,x.jsx=n,x.jsxs=n,x}var R;function $(){return R||(R=1,m.exports=T()),m.exports}var Q=$();/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const q=e=>(e.match(/\d+[xX]\d+|[A-Z]?[a-z]+|[A-Z]|\d+/g)??[]).join("-").toLowerCase();/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function F(e,t,n=[]){if(t==null)throw new Error("[lucide]: iconNode is required when icon name is used");return{name:q(e),size:24,node:t,...n.length>0?{aliases:n}:{}}}/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=e=>{let t="",n=!1;for(const o of e){if(o==="-"||o==="_"||o<=" "){n=t.length>0;continue}t.length===0?t+=o.toLowerCase():t+=n?o.toUpperCase():o,n=!1}return t};/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=e=>{const t=J(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const v=(...e)=>{const t=new Set;for(const n of e)if(typeof n=="string")for(const o of n.split(/\s+/))o&&t.add(o);return[...t].join(" ")};/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor","stroke-width":2,"stroke-linecap":"round","stroke-linejoin":"round"};/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function S(e){return e!=null}function M(e,t={}){const n=t.attributeNames??{},o=s=>n[s]??s,r=e.size??e.width??h.width,i=e.size??e.height??h.height,u=e.aliases?.filter(s=>typeof s=="string"&&s.trim()!=="").map(s=>`lucide-${s}`)??[],l=[...e.name?[`lucide-${e.name}`]:[],...u],a=t.className?.split(" ").filter(Boolean)??[],k=t.includeDefaultClasses===!1?v(...a):v("lucide",...l,...a),b=t.absoluteStrokeWidth?Number(t.strokeWidth??h["stroke-width"])*Number(e.size??e.width??h.width)/Number(t.size??t.width??h.width):t.strokeWidth??h["stroke-width"];return["svg",{...Object.entries(h).reduce((s,[d,f])=>(s[o(d)]=f,s),{}),..."color"in t&&t.color&&{[o("stroke")]:t.color},..."size"in t&&S(t.size)&&{[o("width")]:t.size,[o("height")]:t.size},..."width"in t&&S(t.width)&&{[o("width")]:t.width},..."height"in t&&S(t.height)&&{[o("height")]:t.height},[o("stroke-width")]:b,...k&&{[o("class")]:k},[o("viewBox")]:`0 0 ${r} ${i}`,...t.hasA11yProp===!1?{[o("aria-hidden")]:"true"}:{},..."attributes"in t&&t.attributes},e.node.map(s=>{const[d,f,w]=s,g=t.nonScalingStroke?{[o("vector-effect")]:"non-scaling-stroke",...f}:f;return w?[d,g,w]:[d,g]})]}/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function U(e,t={}){return M(e,{...t,attributeNames:{...t.attributeNames,class:"className","stroke-width":"strokeWidth","stroke-linecap":"strokeLinecap","stroke-linejoin":"strokeLinejoin","vector-effect":"vectorEffect"}})}/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=e=>{if(e==null||typeof e!="object")return!1;for(const t in e)if(Object.prototype.hasOwnProperty.call(e,t)&&(t.startsWith("aria-")||t==="role"||t==="title")&&e[t]!=null)return!0;return!1},Z=c.createContext({}),G=()=>c.useContext(Z),H=c.forwardRef(({color:e,size:t,width:n,height:o,strokeWidth:r,absoluteStrokeWidth:i,nonScalingStroke:u,className:l="",children:a,iconNode:k=[],icon:b={node:k,aliases:[],size:24},...C},s)=>{const{size:d=24,strokeWidth:f=2,absoluteStrokeWidth:w=!1,nonScalingStroke:g=!1,color:A="currentColor",className:E=""}=G()??{},j=!!a||Y(C),[y,W,z=[]]=U(b,{color:e??A,width:n??t??d,height:o??t??d,strokeWidth:r??f,absoluteStrokeWidth:i??w,nonScalingStroke:u??g,className:v(E,l),hasA11yProp:j,attributes:C});return c.createElement(y,{ref:s,...W},[...z.map(([p,L])=>c.createElement(p,L)),...Array.isArray(a)?a:[a]])});/**
 * @license lucide-react v1.76.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */function V(e,t=[],n=[]){const o=typeof e=="string"?F(e,t,n):e,r=c.forwardRef(({className:i,...u},l)=>c.createElement(H,{ref:l,icon:o,className:i,...u}));return o.name&&(r.displayName=D(o.name)),r}function K(){return c.useSyncExternalStore(P,_,I)}function tt(e,t){return B(e).map((n,o)=>c.createElement(c.Fragment,{key:o},typeof n=="string"?n:t[n.index]?.(n.text)??n.text))}export{V as c,Q as j,tt as r,K as u};
