import{r as d,a as E,g as O}from"./vendor-CkGwFcbm.js";var m={exports:{}},i={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var l;function g(){if(l)return i;l=1;var r=d(),o=Symbol.for("react.element"),t=Symbol.for("react.fragment"),e=Object.prototype.hasOwnProperty,s=r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function c(a,n,_){var u,f={},p=null,R=null;_!==void 0&&(p=""+_),n.key!==void 0&&(p=""+n.key),n.ref!==void 0&&(R=n.ref);for(u in n)e.call(n,u)&&!v.hasOwnProperty(u)&&(f[u]=n[u]);if(a&&a.defaultProps)for(u in n=a.defaultProps,n)f[u]===void 0&&(f[u]=n[u]);return{$$typeof:o,type:a,key:p,ref:R,props:f,_owner:s.current}}return i.Fragment=t,i.jsx=c,i.jsxs=c,i}var x;function j(){return x||(x=1,m.exports=g()),m.exports}var b=j();function y(r){var o,t,e="";if(typeof r=="string"||typeof r=="number")e+=r;else if(typeof r=="object")if(Array.isArray(r)){var s=r.length;for(o=0;o<s;o++)r[o]&&(t=y(r[o]))&&(e&&(e+=" "),e+=t)}else for(t in r)r[t]&&(e&&(e+=" "),e+=t);return e}function D(){for(var r,o,t=0,e="",s=arguments.length;t<s;t++)(r=arguments[t])&&(o=y(r))&&(e&&(e+=" "),e+=o);return e}var h=E();const k=O(h);export{k as R,D as c,b as j,h as r};
//# sourceMappingURL=ui-Czx-X8P4.js.map
