define(["exports"],(function(t){"use strict";try{self["workbox:core:6.5.4"]&&_()}catch(t){}const e=(t,...e)=>{let s=t;return e.length>0&&(s+=` :: ${JSON.stringify(e)}`),s};class s extends Error{constructor(t,s){super(e(t,s)),this.name=t,this.details=s}}try{self["workbox:routing:6.5.4"]&&_()}catch(t){}const n=t=>t&&"object"==typeof t?t:{handle:t};class r{constructor(t,e,s="GET"){this.handler=n(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=n(t)}}class i extends r{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}const a=t=>new URL(String(t),location.href).href.replace(new RegExp(`^${location.origin}`),"");class o{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=i&&i.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:r})}catch(t){c=Promise.reject(t)}const h=i&&i.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:t,sameOrigin:e,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,n(t))}setCatchHandler(t){this.o=n(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let c;const h={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},u=t=>[h.prefix,t,h.suffix].filter((t=>t&&t.length>0)).join("-"),l=t=>t||u(h.precache),f=t=>t||u(h.runtime);function w(t){t.then((()=>{}))}const d=new Set;function p(){return p=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e];for(var n in s)({}).hasOwnProperty.call(s,n)&&(t[n]=s[n])}return t},p.apply(null,arguments)}const y=(t,e)=>e.some((e=>t instanceof e));let m,g;const v=new WeakMap,R=new WeakMap,q=new WeakMap,b=new WeakMap,D=new WeakMap;let U={get(t,e,s){if(t instanceof IDBTransaction){if("done"===e)return R.get(t);if("objectStoreNames"===e)return t.objectStoreNames||q.get(t);if("store"===e)return s.objectStoreNames[1]?void 0:s.objectStore(s.objectStoreNames[0])}return O(t[e])},set:(t,e,s)=>(t[e]=s,!0),has:(t,e)=>t instanceof IDBTransaction&&("done"===e||"store"===e)||e in t};function E(t){return t!==IDBDatabase.prototype.transaction||"objectStoreNames"in IDBTransaction.prototype?(g||(g=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])).includes(t)?function(...e){return t.apply(x(this),e),O(v.get(this))}:function(...e){return O(t.apply(x(this),e))}:function(e,...s){const n=t.call(x(this),e,...s);return q.set(n,e.sort?e.sort():[e]),O(n)}}function C(t){return"function"==typeof t?E(t):(t instanceof IDBTransaction&&function(t){if(R.has(t))return;const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("complete",r),t.removeEventListener("error",i),t.removeEventListener("abort",i)},r=()=>{e(),n()},i=()=>{s(t.error||new DOMException("AbortError","AbortError")),n()};t.addEventListener("complete",r),t.addEventListener("error",i),t.addEventListener("abort",i)}));R.set(t,e)}(t),y(t,m||(m=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction]))?new Proxy(t,U):t)}function O(t){if(t instanceof IDBRequest)return function(t){const e=new Promise(((e,s)=>{const n=()=>{t.removeEventListener("success",r),t.removeEventListener("error",i)},r=()=>{e(O(t.result)),n()},i=()=>{s(t.error),n()};t.addEventListener("success",r),t.addEventListener("error",i)}));return e.then((e=>{e instanceof IDBCursor&&v.set(e,t)})).catch((()=>{})),D.set(e,t),e}(t);if(b.has(t))return b.get(t);const e=C(t);return e!==t&&(b.set(t,e),D.set(e,t)),e}const x=t=>D.get(t);const L=["get","getKey","getAll","getAllKeys","count"],N=["put","add","delete","clear"],I=new Map;function k(t,e){if(!(t instanceof IDBDatabase)||e in t||"string"!=typeof e)return;if(I.get(e))return I.get(e);const s=e.replace(/FromIndex$/,""),n=e!==s,r=N.includes(s);if(!(s in(n?IDBIndex:IDBObjectStore).prototype)||!r&&!L.includes(s))return;const i=async function(t,...e){const i=this.transaction(t,r?"readwrite":"readonly");let a=i.store;return n&&(a=a.index(e.shift())),(await Promise.all([a[s](...e),r&&i.done]))[0]};return I.set(e,i),i}U=(t=>p({},t,{get:(e,s,n)=>k(e,s)||t.get(e,s,n),has:(e,s)=>!!k(e,s)||t.has(e,s)}))(U);try{self["workbox:expiration:6.5.4"]&&_()}catch(t){}const B="cache-entries",M=t=>{const e=new URL(t,location.href);return e.hash="",e.href};class W{constructor(t){this.h=null,this.u=t}l(t){const e=t.createObjectStore(B,{keyPath:"id"});e.createIndex("cacheName","cacheName",{unique:!1}),e.createIndex("timestamp","timestamp",{unique:!1})}p(t){this.l(t),this.u&&function(t,{blocked:e}={}){const s=indexedDB.deleteDatabase(t);e&&s.addEventListener("blocked",(t=>e(t.oldVersion,t))),O(s).then((()=>{}))}(this.u)}async setTimestamp(t,e){const s={url:t=M(t),timestamp:e,cacheName:this.u,id:this.m(t)},n=(await this.getDb()).transaction(B,"readwrite",{durability:"relaxed"});await n.store.put(s),await n.done}async getTimestamp(t){const e=await this.getDb(),s=await e.get(B,this.m(t));return null==s?void 0:s.timestamp}async expireEntries(t,e){const s=await this.getDb();let n=await s.transaction(B).store.index("timestamp").openCursor(null,"prev");const r=[];let i=0;for(;n;){const s=n.value;s.cacheName===this.u&&(t&&s.timestamp<t||e&&i>=e?r.push(n.value):i++),n=await n.continue()}const a=[];for(const t of r)await s.delete(B,t.id),a.push(t.url);return a}m(t){return this.u+"|"+M(t)}async getDb(){return this.h||(this.h=await function(t,e,{blocked:s,upgrade:n,blocking:r,terminated:i}={}){const a=indexedDB.open(t,e),o=O(a);return n&&a.addEventListener("upgradeneeded",(t=>{n(O(a.result),t.oldVersion,t.newVersion,O(a.transaction),t)})),s&&a.addEventListener("blocked",(t=>s(t.oldVersion,t.newVersion,t))),o.then((t=>{i&&t.addEventListener("close",(()=>i())),r&&t.addEventListener("versionchange",(t=>r(t.oldVersion,t.newVersion,t)))})).catch((()=>{})),o}("workbox-expiration",1,{upgrade:this.p.bind(this)})),this.h}}class j{constructor(t,e={}){this.v=!1,this.R=!1,this.q=e.maxEntries,this.D=e.maxAgeSeconds,this.U=e.matchOptions,this.u=t,this._=new W(t)}async expireEntries(){if(this.v)return void(this.R=!0);this.v=!0;const t=this.D?Date.now()-1e3*this.D:0,e=await this._.expireEntries(t,this.q),s=await self.caches.open(this.u);for(const t of e)await s.delete(t,this.U);this.v=!1,this.R&&(this.R=!1,w(this.expireEntries()))}async updateTimestamp(t){await this._.setTimestamp(t,Date.now())}async isURLExpired(t){if(this.D){const e=await this._.getTimestamp(t),s=Date.now()-1e3*this.D;return void 0===e||e<s}return!1}async delete(){this.R=!1,await this._.expireEntries(1/0)}}try{self["workbox:cacheable-response:6.5.4"]&&_()}catch(t){}class T{constructor(t={}){this.C=t.statuses,this.O=t.headers}isResponseCacheable(t){let e=!0;return this.C&&(e=this.C.includes(t.status)),this.O&&e&&(e=Object.keys(this.O).some((e=>t.headers.get(e)===this.O[e]))),e}}try{self["workbox:strategies:6.5.4"]&&_()}catch(t){}const P={cacheWillUpdate:async({response:t})=>200===t.status||0===t.status?t:null};function S(t,e){const s=new URL(t);for(const t of e)s.searchParams.delete(t);return s.href}async function F(t,e,s,n){const r=S(e.url,s);if(e.url===r)return t.match(e,n);const i=Object.assign(Object.assign({},n),{ignoreSearch:!0}),a=await t.keys(e,i);for(const e of a){if(r===S(e.url,s))return t.match(e,n)}}class A{constructor(){this.promise=new Promise(((t,e)=>{this.resolve=t,this.reject=e}))}}async function K(){for(const t of d)await t()}function H(t){return new Promise((e=>setTimeout(e,t)))}function $(t){return"string"==typeof t?new Request(t):t}class G{constructor(t,e){this.L={},Object.assign(this,e),this.event=e.event,this.N=t,this.I=new A,this.k=[],this.B=[...t.plugins],this.M=new Map;for(const t of this.B)this.M.set(t,{});this.event.waitUntil(this.I.promise)}async fetch(t){const{event:e}=this;let n=$(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const i=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.N.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:i,response:t});return t}catch(t){throw r&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:r.clone(),request:i.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=$(t);let s;const{cacheName:n,matchOptions:r}=this.N,i=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const n=$(t);await H(0);const r=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:a(r.url)});const i=await this.W(e);if(!i)return!1;const{cacheName:o,matchOptions:c}=this.N,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await F(h,r.clone(),["__WB_REVISION__"],c):null;try{await h.put(r,u?i.clone():i)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await K(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:i.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.L[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=$(await t({mode:e,request:n,event:this.event,params:this.params}));this.L[s]=n}return this.L[s]}hasCallback(t){for(const e of this.N.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.N.plugins)if("function"==typeof e[t]){const s=this.M.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.k.push(t),t}async doneWaiting(){let t;for(;t=this.k.shift();)await t}destroy(){this.I.resolve(null)}async W(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class V{constructor(t={}){this.cacheName=f(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new G(this,{event:e,request:s,params:n}),i=this.j(r,s,e);return[i,this.T(i,r,s,e)]}async j(t,e,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(r=await this.P(e,t),!r||"error"===r.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(r=await i({error:s,event:n,request:e}),r)break;if(!r)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))r=await s({event:n,request:e,response:r});return r}async T(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}try{self["workbox:routing:6.5.4"]&&_()}catch(t){}const Q=t=>t&&"object"==typeof t?t:{handle:t};class J{constructor(t,e,s="GET"){this.handler=Q(e),this.match=t,this.method=s}setCatchHandler(t){this.catchHandler=Q(t)}}class z extends J{constructor(t,e,s){super((({url:e})=>{const s=t.exec(e.href);if(s&&(e.origin===location.origin||0===s.index))return s.slice(1)}),e,s)}}class X{constructor(){this.t=new Map,this.i=new Map}get routes(){return this.t}addFetchListener(){self.addEventListener("fetch",(t=>{const{request:e}=t,s=this.handleRequest({request:e,event:t});s&&t.respondWith(s)}))}addCacheListener(){self.addEventListener("message",(t=>{if(t.data&&"CACHE_URLS"===t.data.type){const{payload:e}=t.data,s=Promise.all(e.urlsToCache.map((e=>{"string"==typeof e&&(e=[e]);const s=new Request(...e);return this.handleRequest({request:s,event:t})})));t.waitUntil(s),t.ports&&t.ports[0]&&s.then((()=>t.ports[0].postMessage(!0)))}}))}handleRequest({request:t,event:e}){const s=new URL(t.url,location.href);if(!s.protocol.startsWith("http"))return;const n=s.origin===location.origin,{params:r,route:i}=this.findMatchingRoute({event:e,request:t,sameOrigin:n,url:s});let a=i&&i.handler;const o=t.method;if(!a&&this.i.has(o)&&(a=this.i.get(o)),!a)return;let c;try{c=a.handle({url:s,request:t,event:e,params:r})}catch(t){c=Promise.reject(t)}const h=i&&i.catchHandler;return c instanceof Promise&&(this.o||h)&&(c=c.catch((async n=>{if(h)try{return await h.handle({url:s,request:t,event:e,params:r})}catch(t){t instanceof Error&&(n=t)}if(this.o)return this.o.handle({url:s,request:t,event:e});throw n}))),c}findMatchingRoute({url:t,sameOrigin:e,request:s,event:n}){const r=this.t.get(s.method)||[];for(const i of r){let r;const a=i.match({url:t,sameOrigin:e,request:s,event:n});if(a)return r=a,(Array.isArray(r)&&0===r.length||a.constructor===Object&&0===Object.keys(a).length||"boolean"==typeof a)&&(r=void 0),{route:i,params:r}}return{}}setDefaultHandler(t,e="GET"){this.i.set(e,Q(t))}setCatchHandler(t){this.o=Q(t)}registerRoute(t){this.t.has(t.method)||this.t.set(t.method,[]),this.t.get(t.method).push(t)}unregisterRoute(t){if(!this.t.has(t.method))throw new s("unregister-route-but-not-found-with-method",{method:t.method});const e=this.t.get(t.method).indexOf(t);if(!(e>-1))throw new s("unregister-route-route-not-registered");this.t.get(t.method).splice(e,1)}}let Y;const Z=()=>(Y||(Y=new X,Y.addFetchListener(),Y.addCacheListener()),Y);function tt(t,e){const s=e();return t.waitUntil(s),s}try{self["workbox:precaching:6.5.4"]&&_()}catch(t){}function et(t){if(!t)throw new s("add-to-cache-list-unexpected-type",{entry:t});if("string"==typeof t){const e=new URL(t,location.href);return{cacheKey:e.href,url:e.href}}const{revision:e,url:n}=t;if(!n)throw new s("add-to-cache-list-unexpected-type",{entry:t});if(!e){const t=new URL(n,location.href);return{cacheKey:t.href,url:t.href}}const r=new URL(n,location.href),i=new URL(n,location.href);return r.searchParams.set("__WB_REVISION__",e),{cacheKey:r.href,url:i.href}}class st{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:t,state:e})=>{e&&(e.originalRequest=t)},this.cachedResponseWillBeUsed=async({event:t,state:e,cachedResponse:s})=>{if("install"===t.type&&e&&e.originalRequest&&e.originalRequest instanceof Request){const t=e.originalRequest.url;s?this.notUpdatedURLs.push(t):this.updatedURLs.push(t)}return s}}}class nt{constructor({precacheController:t}){this.cacheKeyWillBeUsed=async({request:t,params:e})=>{const s=(null==e?void 0:e.cacheKey)||this.S.getCacheKeyForURL(t.url);return s?new Request(s,{headers:t.headers}):t},this.S=t}}let rt,it;async function at(t,e){let n=null;if(t.url){n=new URL(t.url).origin}if(n!==self.location.origin)throw new s("cross-origin-copy-response",{origin:n});const r=t.clone(),i={headers:new Headers(r.headers),status:r.status,statusText:r.statusText},a=e?e(i):i,o=function(){if(void 0===rt){const t=new Response("");if("body"in t)try{new Response(t.body),rt=!0}catch(t){rt=!1}rt=!1}return rt}()?r.body:await r.blob();return new Response(o,a)}try{self["workbox:strategies:6.5.4"]&&_()}catch(t){}function ot(t){return"string"==typeof t?new Request(t):t}class ct{constructor(t,e){this.L={},Object.assign(this,e),this.event=e.event,this.N=t,this.I=new A,this.k=[],this.B=[...t.plugins],this.M=new Map;for(const t of this.B)this.M.set(t,{});this.event.waitUntil(this.I.promise)}async fetch(t){const{event:e}=this;let n=ot(t);if("navigate"===n.mode&&e instanceof FetchEvent&&e.preloadResponse){const t=await e.preloadResponse;if(t)return t}const r=this.hasCallback("fetchDidFail")?n.clone():null;try{for(const t of this.iterateCallbacks("requestWillFetch"))n=await t({request:n.clone(),event:e})}catch(t){if(t instanceof Error)throw new s("plugin-error-request-will-fetch",{thrownErrorMessage:t.message})}const i=n.clone();try{let t;t=await fetch(n,"navigate"===n.mode?void 0:this.N.fetchOptions);for(const s of this.iterateCallbacks("fetchDidSucceed"))t=await s({event:e,request:i,response:t});return t}catch(t){throw r&&await this.runCallbacks("fetchDidFail",{error:t,event:e,originalRequest:r.clone(),request:i.clone()}),t}}async fetchAndCachePut(t){const e=await this.fetch(t),s=e.clone();return this.waitUntil(this.cachePut(t,s)),e}async cacheMatch(t){const e=ot(t);let s;const{cacheName:n,matchOptions:r}=this.N,i=await this.getCacheKey(e,"read"),a=Object.assign(Object.assign({},r),{cacheName:n});s=await caches.match(i,a);for(const t of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await t({cacheName:n,matchOptions:r,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(t,e){const n=ot(t);await H(0);const r=await this.getCacheKey(n,"write");if(!e)throw new s("cache-put-with-no-response",{url:a(r.url)});const i=await this.W(e);if(!i)return!1;const{cacheName:o,matchOptions:c}=this.N,h=await self.caches.open(o),u=this.hasCallback("cacheDidUpdate"),l=u?await F(h,r.clone(),["__WB_REVISION__"],c):null;try{await h.put(r,u?i.clone():i)}catch(t){if(t instanceof Error)throw"QuotaExceededError"===t.name&&await K(),t}for(const t of this.iterateCallbacks("cacheDidUpdate"))await t({cacheName:o,oldResponse:l,newResponse:i.clone(),request:r,event:this.event});return!0}async getCacheKey(t,e){const s=`${t.url} | ${e}`;if(!this.L[s]){let n=t;for(const t of this.iterateCallbacks("cacheKeyWillBeUsed"))n=ot(await t({mode:e,request:n,event:this.event,params:this.params}));this.L[s]=n}return this.L[s]}hasCallback(t){for(const e of this.N.plugins)if(t in e)return!0;return!1}async runCallbacks(t,e){for(const s of this.iterateCallbacks(t))await s(e)}*iterateCallbacks(t){for(const e of this.N.plugins)if("function"==typeof e[t]){const s=this.M.get(e),n=n=>{const r=Object.assign(Object.assign({},n),{state:s});return e[t](r)};yield n}}waitUntil(t){return this.k.push(t),t}async doneWaiting(){let t;for(;t=this.k.shift();)await t}destroy(){this.I.resolve(null)}async W(t){let e=t,s=!1;for(const t of this.iterateCallbacks("cacheWillUpdate"))if(e=await t({request:this.request,response:e,event:this.event})||void 0,s=!0,!e)break;return s||e&&200!==e.status&&(e=void 0),e}}class ht{constructor(t={}){this.cacheName=f(t.cacheName),this.plugins=t.plugins||[],this.fetchOptions=t.fetchOptions,this.matchOptions=t.matchOptions}handle(t){const[e]=this.handleAll(t);return e}handleAll(t){t instanceof FetchEvent&&(t={event:t,request:t.request});const e=t.event,s="string"==typeof t.request?new Request(t.request):t.request,n="params"in t?t.params:void 0,r=new ct(this,{event:e,request:s,params:n}),i=this.j(r,s,e);return[i,this.T(i,r,s,e)]}async j(t,e,n){let r;await t.runCallbacks("handlerWillStart",{event:n,request:e});try{if(r=await this.P(e,t),!r||"error"===r.type)throw new s("no-response",{url:e.url})}catch(s){if(s instanceof Error)for(const i of t.iterateCallbacks("handlerDidError"))if(r=await i({error:s,event:n,request:e}),r)break;if(!r)throw s}for(const s of t.iterateCallbacks("handlerWillRespond"))r=await s({event:n,request:e,response:r});return r}async T(t,e,s,n){let r,i;try{r=await t}catch(i){}try{await e.runCallbacks("handlerDidRespond",{event:n,request:s,response:r}),await e.doneWaiting()}catch(t){t instanceof Error&&(i=t)}if(await e.runCallbacks("handlerDidComplete",{event:n,request:s,response:r,error:i}),e.destroy(),i)throw i}}class ut extends ht{constructor(t={}){t.cacheName=l(t.cacheName),super(t),this.F=!1!==t.fallbackToNetwork,this.plugins.push(ut.copyRedirectedCacheableResponsesPlugin)}async P(t,e){const s=await e.cacheMatch(t);return s||(e.event&&"install"===e.event.type?await this.A(t,e):await this.K(t,e))}async K(t,e){let n;const r=e.params||{};if(!this.F)throw new s("missing-precache-entry",{cacheName:this.cacheName,url:t.url});{const s=r.integrity,i=t.integrity,a=!i||i===s;n=await e.fetch(new Request(t,{integrity:"no-cors"!==t.mode?i||s:void 0})),s&&a&&"no-cors"!==t.mode&&(this.H(),await e.cachePut(t,n.clone()))}return n}async A(t,e){this.H();const n=await e.fetch(t);if(!await e.cachePut(t,n.clone()))throw new s("bad-precaching-response",{url:t.url,status:n.status});return n}H(){let t=null,e=0;for(const[s,n]of this.plugins.entries())n!==ut.copyRedirectedCacheableResponsesPlugin&&(n===ut.defaultPrecacheCacheabilityPlugin&&(t=s),n.cacheWillUpdate&&e++);0===e?this.plugins.push(ut.defaultPrecacheCacheabilityPlugin):e>1&&null!==t&&this.plugins.splice(t,1)}}ut.defaultPrecacheCacheabilityPlugin={cacheWillUpdate:async({response:t})=>!t||t.status>=400?null:t},ut.copyRedirectedCacheableResponsesPlugin={cacheWillUpdate:async({response:t})=>t.redirected?await at(t):t};class lt{constructor({cacheName:t,plugins:e=[],fallbackToNetwork:s=!0}={}){this.$=new Map,this.G=new Map,this.V=new Map,this.N=new ut({cacheName:l(t),plugins:[...e,new nt({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this.N}precache(t){this.addToCacheList(t),this.J||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this.J=!0)}addToCacheList(t){const e=[];for(const n of t){"string"==typeof n?e.push(n):n&&void 0===n.revision&&e.push(n.url);const{cacheKey:t,url:r}=et(n),i="string"!=typeof n&&n.revision?"reload":"default";if(this.$.has(r)&&this.$.get(r)!==t)throw new s("add-to-cache-list-conflicting-entries",{firstEntry:this.$.get(r),secondEntry:t});if("string"!=typeof n&&n.integrity){if(this.V.has(t)&&this.V.get(t)!==n.integrity)throw new s("add-to-cache-list-conflicting-integrities",{url:r});this.V.set(t,n.integrity)}if(this.$.set(r,t),this.G.set(r,i),e.length>0){const t=`Workbox is precaching URLs without revision info: ${e.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(t)}}}install(t){return tt(t,(async()=>{const e=new st;this.strategy.plugins.push(e);for(const[e,s]of this.$){const n=this.V.get(s),r=this.G.get(e),i=new Request(e,{integrity:n,cache:r,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:s},request:i,event:t}))}const{updatedURLs:s,notUpdatedURLs:n}=e;return{updatedURLs:s,notUpdatedURLs:n}}))}activate(t){return tt(t,(async()=>{const t=await self.caches.open(this.strategy.cacheName),e=await t.keys(),s=new Set(this.$.values()),n=[];for(const r of e)s.has(r.url)||(await t.delete(r),n.push(r.url));return{deletedURLs:n}}))}getURLsToCacheKeys(){return this.$}getCachedURLs(){return[...this.$.keys()]}getCacheKeyForURL(t){const e=new URL(t,location.href);return this.$.get(e.href)}getIntegrityForCacheKey(t){return this.V.get(t)}async matchPrecache(t){const e=t instanceof Request?t.url:t,s=this.getCacheKeyForURL(e);if(s){return(await self.caches.open(this.strategy.cacheName)).match(s)}}createHandlerBoundToURL(t){const e=this.getCacheKeyForURL(t);if(!e)throw new s("non-precached-url",{url:t});return s=>(s.request=new Request(t),s.params=Object.assign({cacheKey:e},s.params),this.strategy.handle(s))}}const ft=()=>(it||(it=new lt),it);class wt extends J{constructor(t,e){super((({request:s})=>{const n=t.getURLsToCacheKeys();for(const r of function*(t,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:s="index.html",cleanURLs:n=!0,urlManipulation:r}={}){const i=new URL(t,location.href);i.hash="",yield i.href;const a=function(t,e=[]){for(const s of[...t.searchParams.keys()])e.some((t=>t.test(s)))&&t.searchParams.delete(s);return t}(i,e);if(yield a.href,s&&a.pathname.endsWith("/")){const t=new URL(a.href);t.pathname+=s,yield t.href}if(n){const t=new URL(a.href);t.pathname+=".html",yield t.href}if(r){const t=r({url:i});for(const e of t)yield e.href}}(s.url,e)){const e=n.get(r);if(e){return{cacheKey:e,integrity:t.getIntegrityForCacheKey(e)}}}}),t.strategy)}}function dt(t){const e=ft();!function(t,e,n){let r;if("string"==typeof t){const s=new URL(t,location.href);r=new J((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)r=new z(t,e,n);else if("function"==typeof t)r=new J(t,e,n);else{if(!(t instanceof J))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});r=t}Z().registerRoute(r)}(new wt(e,t))}t.CacheableResponsePlugin=class{constructor(t){this.cacheWillUpdate=async({response:t})=>this.X.isResponseCacheable(t)?t:null,this.X=new T(t)}},t.ExpirationPlugin=class{constructor(t={}){this.cachedResponseWillBeUsed=async({event:t,request:e,cacheName:s,cachedResponse:n})=>{if(!n)return null;const r=this.Y(n),i=this.Z(s);w(i.expireEntries());const a=i.updateTimestamp(e.url);if(t)try{t.waitUntil(a)}catch(t){}return r?n:null},this.cacheDidUpdate=async({cacheName:t,request:e})=>{const s=this.Z(t);await s.updateTimestamp(e.url),await s.expireEntries()},this.tt=t,this.D=t.maxAgeSeconds,this.et=new Map,t.purgeOnQuotaError&&function(t){d.add(t)}((()=>this.deleteCacheAndMetadata()))}Z(t){if(t===f())throw new s("expire-custom-caches-only");let e=this.et.get(t);return e||(e=new j(t,this.tt),this.et.set(t,e)),e}Y(t){if(!this.D)return!0;const e=this.st(t);if(null===e)return!0;return e>=Date.now()-1e3*this.D}st(t){if(!t.headers.has("date"))return null;const e=t.headers.get("date"),s=new Date(e).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[t,e]of this.et)await self.caches.delete(t),await e.delete();this.et=new Map}},t.StaleWhileRevalidate=class extends V{constructor(t={}){super(t),this.plugins.some((t=>"cacheWillUpdate"in t))||this.plugins.unshift(P)}async P(t,e){const n=e.fetchAndCachePut(t).catch((()=>{}));e.waitUntil(n);let r,i=await e.cacheMatch(t);if(i);else try{i=await n}catch(t){t instanceof Error&&(r=t)}if(!i)throw new s("no-response",{url:t.url,error:r});return i}},t.precacheAndRoute=function(t,e){!function(t){ft().precache(t)}(t),dt(e)},t.registerRoute=function(t,e,n){let a;if("string"==typeof t){const s=new URL(t,location.href);a=new r((({url:t})=>t.href===s.href),e,n)}else if(t instanceof RegExp)a=new i(t,e,n);else if("function"==typeof t)a=new r(t,e,n);else{if(!(t instanceof r))throw new s("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});a=t}return(c||(c=new o,c.addFetchListener(),c.addCacheListener()),c).registerRoute(a),a}}));
//# sourceMappingURL=workbox-3f84e27d.js.map
