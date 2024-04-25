/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const D=globalThis,it=D.ShadowRoot&&(D.ShadyCSS===void 0||D.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,rt=Symbol(),lt=new WeakMap;let Ct=class{constructor(t,e,i){if(this._$cssResult$=!0,i!==rt)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=t,this.t=e}get styleSheet(){let t=this.o;const e=this.t;if(it&&t===void 0){const i=e!==void 0&&e.length===1;i&&(t=lt.get(e)),t===void 0&&((this.o=t=new CSSStyleSheet).replaceSync(this.cssText),i&&lt.set(e,t))}return t}toString(){return this.cssText}};const Wt=s=>new Ct(typeof s=="string"?s:s+"",void 0,rt),ot=(s,...t)=>{const e=s.length===1?s[0]:t.reduce((i,r,o)=>i+(n=>{if(n._$cssResult$===!0)return n.cssText;if(typeof n=="number")return n;throw Error("Value passed to 'css' function must be a 'css' function result: "+n+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(r)+s[o+1],s[0]);return new Ct(e,s,rt)},Ft=(s,t)=>{if(it)s.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const e of t){const i=document.createElement("style"),r=D.litNonce;r!==void 0&&i.setAttribute("nonce",r),i.textContent=e.cssText,s.appendChild(i)}},at=it?s=>s:s=>s instanceof CSSStyleSheet?(t=>{let e="";for(const i of t.cssRules)e+=i.cssText;return Wt(e)})(s):s;/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const{is:qt,defineProperty:Zt,getOwnPropertyDescriptor:Yt,getOwnPropertyNames:Jt,getOwnPropertySymbols:Kt,getPrototypeOf:Xt}=Object,y=globalThis,ct=y.trustedTypes,Gt=ct?ct.emptyScript:"",q=y.reactiveElementPolyfillSupport,k=(s,t)=>s,V={toAttribute(s,t){switch(t){case Boolean:s=s?Gt:null;break;case Object:case Array:s=s==null?s:JSON.stringify(s)}return s},fromAttribute(s,t){let e=s;switch(t){case Boolean:e=s!==null;break;case Number:e=s===null?null:Number(s);break;case Object:case Array:try{e=JSON.parse(s)}catch{e=null}}return e}},nt=(s,t)=>!qt(s,t),ht={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:nt};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),y.litPropertyMetadata??(y.litPropertyMetadata=new WeakMap);class x extends HTMLElement{static addInitializer(t){this._$Ei(),(this.l??(this.l=[])).push(t)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(t,e=ht){if(e.state&&(e.attribute=!1),this._$Ei(),this.elementProperties.set(t,e),!e.noAccessor){const i=Symbol(),r=this.getPropertyDescriptor(t,i,e);r!==void 0&&Zt(this.prototype,t,r)}}static getPropertyDescriptor(t,e,i){const{get:r,set:o}=Yt(this.prototype,t)??{get(){return this[e]},set(n){this[e]=n}};return{get(){return r==null?void 0:r.call(this)},set(n){const a=r==null?void 0:r.call(this);o.call(this,n),this.requestUpdate(t,a,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(t){return this.elementProperties.get(t)??ht}static _$Ei(){if(this.hasOwnProperty(k("elementProperties")))return;const t=Xt(this);t.finalize(),t.l!==void 0&&(this.l=[...t.l]),this.elementProperties=new Map(t.elementProperties)}static finalize(){if(this.hasOwnProperty(k("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(k("properties"))){const e=this.properties,i=[...Jt(e),...Kt(e)];for(const r of i)this.createProperty(r,e[r])}const t=this[Symbol.metadata];if(t!==null){const e=litPropertyMetadata.get(t);if(e!==void 0)for(const[i,r]of e)this.elementProperties.set(i,r)}this._$Eh=new Map;for(const[e,i]of this.elementProperties){const r=this._$Eu(e,i);r!==void 0&&this._$Eh.set(r,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(t){const e=[];if(Array.isArray(t)){const i=new Set(t.flat(1/0).reverse());for(const r of i)e.unshift(at(r))}else t!==void 0&&e.push(at(t));return e}static _$Eu(t,e){const i=e.attribute;return i===!1?void 0:typeof i=="string"?i:typeof t=="string"?t.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var t;this._$Eg=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$ES(),this.requestUpdate(),(t=this.constructor.l)==null||t.forEach(e=>e(this))}addController(t){var e;(this._$E_??(this._$E_=new Set)).add(t),this.renderRoot!==void 0&&this.isConnected&&((e=t.hostConnected)==null||e.call(t))}removeController(t){var e;(e=this._$E_)==null||e.delete(t)}_$ES(){const t=new Map,e=this.constructor.elementProperties;for(const i of e.keys())this.hasOwnProperty(i)&&(t.set(i,this[i]),delete this[i]);t.size>0&&(this._$Ep=t)}createRenderRoot(){const t=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return Ft(t,this.constructor.elementStyles),t}connectedCallback(){var t;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(t=this._$E_)==null||t.forEach(e=>{var i;return(i=e.hostConnected)==null?void 0:i.call(e)})}enableUpdating(t){}disconnectedCallback(){var t;(t=this._$E_)==null||t.forEach(e=>{var i;return(i=e.hostDisconnected)==null?void 0:i.call(e)})}attributeChangedCallback(t,e,i){this._$AK(t,i)}_$EO(t,e){var o;const i=this.constructor.elementProperties.get(t),r=this.constructor._$Eu(t,i);if(r!==void 0&&i.reflect===!0){const n=(((o=i.converter)==null?void 0:o.toAttribute)!==void 0?i.converter:V).toAttribute(e,i.type);this._$Em=t,n==null?this.removeAttribute(r):this.setAttribute(r,n),this._$Em=null}}_$AK(t,e){var o;const i=this.constructor,r=i._$Eh.get(t);if(r!==void 0&&this._$Em!==r){const n=i.getPropertyOptions(r),a=typeof n.converter=="function"?{fromAttribute:n.converter}:((o=n.converter)==null?void 0:o.fromAttribute)!==void 0?n.converter:V;this._$Em=r,this[r]=a.fromAttribute(e,n.type),this._$Em=null}}requestUpdate(t,e,i,r=!1,o){if(t!==void 0){if(i??(i=this.constructor.getPropertyOptions(t)),!(i.hasChanged??nt)(r?o:this[t],e))return;this.C(t,e,i)}this.isUpdatePending===!1&&(this._$Eg=this._$EP())}C(t,e,i){this._$AL.has(t)||this._$AL.set(t,e),i.reflect===!0&&this._$Em!==t&&(this._$Ej??(this._$Ej=new Set)).add(t)}async _$EP(){this.isUpdatePending=!0;try{await this._$Eg}catch(e){Promise.reject(e)}const t=this.scheduleUpdate();return t!=null&&await t,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var i;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[o,n]of this._$Ep)this[o]=n;this._$Ep=void 0}const r=this.constructor.elementProperties;if(r.size>0)for(const[o,n]of r)n.wrapped!==!0||this._$AL.has(o)||this[o]===void 0||this.C(o,this[o],n)}let t=!1;const e=this._$AL;try{t=this.shouldUpdate(e),t?(this.willUpdate(e),(i=this._$E_)==null||i.forEach(r=>{var o;return(o=r.hostUpdate)==null?void 0:o.call(r)}),this.update(e)):this._$ET()}catch(r){throw t=!1,this._$ET(),r}t&&this._$AE(e)}willUpdate(t){}_$AE(t){var e;(e=this._$E_)==null||e.forEach(i=>{var r;return(r=i.hostUpdated)==null?void 0:r.call(i)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(t)),this.updated(t)}_$ET(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$Eg}shouldUpdate(t){return!0}update(t){this._$Ej&&(this._$Ej=this._$Ej.forEach(e=>this._$EO(e,this[e]))),this._$ET()}updated(t){}firstUpdated(t){}}x.elementStyles=[],x.shadowRootOptions={mode:"open"},x[k("elementProperties")]=new Map,x[k("finalized")]=new Map,q==null||q({ReactiveElement:x}),(y.reactiveElementVersions??(y.reactiveElementVersions=[])).push("2.0.2");/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const z=globalThis,W=z.trustedTypes,dt=W?W.createPolicy("lit-html",{createHTML:s=>s}):void 0,xt="$lit$",_=`lit$${(Math.random()+"").slice(9)}$`,Pt="?"+_,Qt=`<${Pt}>`,E=document,R=()=>E.createComment(""),H=s=>s===null||typeof s!="object"&&typeof s!="function",Lt=Array.isArray,te=s=>Lt(s)||typeof(s==null?void 0:s[Symbol.iterator])=="function",Z=`[ 	
\f\r]`,M=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,ut=/-->/g,pt=/>/g,w=RegExp(`>|${Z}(?:([^\\s"'>=/]+)(${Z}*=${Z}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),ft=/'/g,gt=/"/g,Tt=/^(?:script|style|textarea|title)$/i,ee=s=>(t,...e)=>({_$litType$:s,strings:t,values:e}),Mt=ee(1),C=Symbol.for("lit-noChange"),u=Symbol.for("lit-nothing"),vt=new WeakMap,S=E.createTreeWalker(E,129);function Ot(s,t){if(!Array.isArray(s)||!s.hasOwnProperty("raw"))throw Error("invalid template strings array");return dt!==void 0?dt.createHTML(t):t}const se=(s,t)=>{const e=s.length-1,i=[];let r,o=t===2?"<svg>":"",n=M;for(let a=0;a<e;a++){const l=s[a];let c,d,h=-1,$=0;for(;$<l.length&&(n.lastIndex=$,d=n.exec(l),d!==null);)$=n.lastIndex,n===M?d[1]==="!--"?n=ut:d[1]!==void 0?n=pt:d[2]!==void 0?(Tt.test(d[2])&&(r=RegExp("</"+d[2],"g")),n=w):d[3]!==void 0&&(n=w):n===w?d[0]===">"?(n=r??M,h=-1):d[1]===void 0?h=-2:(h=n.lastIndex-d[2].length,c=d[1],n=d[3]===void 0?w:d[3]==='"'?gt:ft):n===gt||n===ft?n=w:n===ut||n===pt?n=M:(n=w,r=void 0);const b=n===w&&s[a+1].startsWith("/>")?" ":"";o+=n===M?l+Qt:h>=0?(i.push(c),l.slice(0,h)+xt+l.slice(h)+_+b):l+_+(h===-2?a:b)}return[Ot(s,o+(s[e]||"<?>")+(t===2?"</svg>":"")),i]};class B{constructor({strings:t,_$litType$:e},i){let r;this.parts=[];let o=0,n=0;const a=t.length-1,l=this.parts,[c,d]=se(t,e);if(this.el=B.createElement(c,i),S.currentNode=this.el.content,e===2){const h=this.el.content.firstChild;h.replaceWith(...h.childNodes)}for(;(r=S.nextNode())!==null&&l.length<a;){if(r.nodeType===1){if(r.hasAttributes())for(const h of r.getAttributeNames())if(h.endsWith(xt)){const $=d[n++],b=r.getAttribute(h).split(_),I=/([.?@])?(.*)/.exec($);l.push({type:1,index:o,name:I[2],strings:b,ctor:I[1]==="."?re:I[1]==="?"?oe:I[1]==="@"?ne:F}),r.removeAttribute(h)}else h.startsWith(_)&&(l.push({type:6,index:o}),r.removeAttribute(h));if(Tt.test(r.tagName)){const h=r.textContent.split(_),$=h.length-1;if($>0){r.textContent=W?W.emptyScript:"";for(let b=0;b<$;b++)r.append(h[b],R()),S.nextNode(),l.push({type:2,index:++o});r.append(h[$],R())}}}else if(r.nodeType===8)if(r.data===Pt)l.push({type:2,index:o});else{let h=-1;for(;(h=r.data.indexOf(_,h+1))!==-1;)l.push({type:7,index:o}),h+=_.length-1}o++}}static createElement(t,e){const i=E.createElement("template");return i.innerHTML=t,i}}function L(s,t,e=s,i){var n,a;if(t===C)return t;let r=i!==void 0?(n=e._$Co)==null?void 0:n[i]:e._$Cl;const o=H(t)?void 0:t._$litDirective$;return(r==null?void 0:r.constructor)!==o&&((a=r==null?void 0:r._$AO)==null||a.call(r,!1),o===void 0?r=void 0:(r=new o(s),r._$AT(s,e,i)),i!==void 0?(e._$Co??(e._$Co=[]))[i]=r:e._$Cl=r),r!==void 0&&(t=L(s,r._$AS(s,t.values),r,i)),t}class ie{constructor(t,e){this._$AV=[],this._$AN=void 0,this._$AD=t,this._$AM=e}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(t){const{el:{content:e},parts:i}=this._$AD,r=((t==null?void 0:t.creationScope)??E).importNode(e,!0);S.currentNode=r;let o=S.nextNode(),n=0,a=0,l=i[0];for(;l!==void 0;){if(n===l.index){let c;l.type===2?c=new N(o,o.nextSibling,this,t):l.type===1?c=new l.ctor(o,l.name,l.strings,this,t):l.type===6&&(c=new le(o,this,t)),this._$AV.push(c),l=i[++a]}n!==(l==null?void 0:l.index)&&(o=S.nextNode(),n++)}return S.currentNode=E,r}p(t){let e=0;for(const i of this._$AV)i!==void 0&&(i.strings!==void 0?(i._$AI(t,i,e),e+=i.strings.length-2):i._$AI(t[e])),e++}}class N{get _$AU(){var t;return((t=this._$AM)==null?void 0:t._$AU)??this._$Cv}constructor(t,e,i,r){this.type=2,this._$AH=u,this._$AN=void 0,this._$AA=t,this._$AB=e,this._$AM=i,this.options=r,this._$Cv=(r==null?void 0:r.isConnected)??!0}get parentNode(){let t=this._$AA.parentNode;const e=this._$AM;return e!==void 0&&(t==null?void 0:t.nodeType)===11&&(t=e.parentNode),t}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(t,e=this){t=L(this,t,e),H(t)?t===u||t==null||t===""?(this._$AH!==u&&this._$AR(),this._$AH=u):t!==this._$AH&&t!==C&&this._(t):t._$litType$!==void 0?this.g(t):t.nodeType!==void 0?this.$(t):te(t)?this.T(t):this._(t)}k(t){return this._$AA.parentNode.insertBefore(t,this._$AB)}$(t){this._$AH!==t&&(this._$AR(),this._$AH=this.k(t))}_(t){this._$AH!==u&&H(this._$AH)?this._$AA.nextSibling.data=t:this.$(E.createTextNode(t)),this._$AH=t}g(t){var o;const{values:e,_$litType$:i}=t,r=typeof i=="number"?this._$AC(t):(i.el===void 0&&(i.el=B.createElement(Ot(i.h,i.h[0]),this.options)),i);if(((o=this._$AH)==null?void 0:o._$AD)===r)this._$AH.p(e);else{const n=new ie(r,this),a=n.u(this.options);n.p(e),this.$(a),this._$AH=n}}_$AC(t){let e=vt.get(t.strings);return e===void 0&&vt.set(t.strings,e=new B(t)),e}T(t){Lt(this._$AH)||(this._$AH=[],this._$AR());const e=this._$AH;let i,r=0;for(const o of t)r===e.length?e.push(i=new N(this.k(R()),this.k(R()),this,this.options)):i=e[r],i._$AI(o),r++;r<e.length&&(this._$AR(i&&i._$AB.nextSibling,r),e.length=r)}_$AR(t=this._$AA.nextSibling,e){var i;for((i=this._$AP)==null?void 0:i.call(this,!1,!0,e);t&&t!==this._$AB;){const r=t.nextSibling;t.remove(),t=r}}setConnected(t){var e;this._$AM===void 0&&(this._$Cv=t,(e=this._$AP)==null||e.call(this,t))}}class F{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(t,e,i,r,o){this.type=1,this._$AH=u,this._$AN=void 0,this.element=t,this.name=e,this._$AM=r,this.options=o,i.length>2||i[0]!==""||i[1]!==""?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=u}_$AI(t,e=this,i,r){const o=this.strings;let n=!1;if(o===void 0)t=L(this,t,e,0),n=!H(t)||t!==this._$AH&&t!==C,n&&(this._$AH=t);else{const a=t;let l,c;for(t=o[0],l=0;l<o.length-1;l++)c=L(this,a[i+l],e,l),c===C&&(c=this._$AH[l]),n||(n=!H(c)||c!==this._$AH[l]),c===u?t=u:t!==u&&(t+=(c??"")+o[l+1]),this._$AH[l]=c}n&&!r&&this.O(t)}O(t){t===u?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,t??"")}}class re extends F{constructor(){super(...arguments),this.type=3}O(t){this.element[this.name]=t===u?void 0:t}}class oe extends F{constructor(){super(...arguments),this.type=4}O(t){this.element.toggleAttribute(this.name,!!t&&t!==u)}}class ne extends F{constructor(t,e,i,r,o){super(t,e,i,r,o),this.type=5}_$AI(t,e=this){if((t=L(this,t,e,0)??u)===C)return;const i=this._$AH,r=t===u&&i!==u||t.capture!==i.capture||t.once!==i.once||t.passive!==i.passive,o=t!==u&&(i===u||r);r&&this.element.removeEventListener(this.name,this,i),o&&this.element.addEventListener(this.name,this,t),this._$AH=t}handleEvent(t){var e;typeof this._$AH=="function"?this._$AH.call(((e=this.options)==null?void 0:e.host)??this.element,t):this._$AH.handleEvent(t)}}class le{constructor(t,e,i){this.element=t,this.type=6,this._$AN=void 0,this._$AM=e,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(t){L(this,t)}}const Y=z.litHtmlPolyfillSupport;Y==null||Y(B,N),(z.litHtmlVersions??(z.litHtmlVersions=[])).push("3.1.0");const ae=(s,t,e)=>{const i=(e==null?void 0:e.renderBefore)??t;let r=i._$litPart$;if(r===void 0){const o=(e==null?void 0:e.renderBefore)??null;i._$litPart$=r=new N(t.insertBefore(R(),o),o,void 0,e??{})}return r._$AI(s),r};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */let U=class extends x{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var e;const t=super.createRenderRoot();return(e=this.renderOptions).renderBefore??(e.renderBefore=t.firstChild),t}update(t){const e=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(t),this._$Do=ae(e,this.renderRoot,this.renderOptions)}connectedCallback(){var t;super.connectedCallback(),(t=this._$Do)==null||t.setConnected(!0)}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this._$Do)==null||t.setConnected(!1)}render(){return C}};var Et;U._$litElement$=!0,U.finalized=!0,(Et=globalThis.litElementHydrateSupport)==null||Et.call(globalThis,{LitElement:U});const J=globalThis.litElementPolyfillSupport;J==null||J({LitElement:U});(globalThis.litElementVersions??(globalThis.litElementVersions=[])).push("4.0.2");var kt=ot`
  :host {
    box-sizing: border-box;
  }

  :host *,
  :host *::before,
  :host *::after {
    box-sizing: inherit;
  }

  [hidden] {
    display: none !important;
  }
`;function ce(s,t){return{top:Math.round(s.getBoundingClientRect().top-t.getBoundingClientRect().top),left:Math.round(s.getBoundingClientRect().left-t.getBoundingClientRect().left)}}var Q=new Set;function he(){const s=document.documentElement.clientWidth;return Math.abs(window.innerWidth-s)}function Ve(s){if(Q.add(s),!document.body.classList.contains("sl-scroll-lock")){const t=he();document.body.classList.add("sl-scroll-lock"),document.body.style.setProperty("--sl-scroll-lock-size",`${t}px`)}}function We(s){Q.delete(s),Q.size===0&&(document.body.classList.remove("sl-scroll-lock"),document.body.style.removeProperty("--sl-scroll-lock-size"))}function Fe(s,t,e="vertical",i="smooth"){const r=ce(s,t),o=r.top+t.scrollTop,n=r.left+t.scrollLeft,a=t.scrollLeft,l=t.scrollLeft+t.offsetWidth,c=t.scrollTop,d=t.scrollTop+t.offsetHeight;(e==="horizontal"||e==="both")&&(n<a?t.scrollTo({left:n,behavior:i}):n+s.clientWidth>l&&t.scrollTo({left:n-t.offsetWidth+s.clientWidth,behavior:i})),(e==="vertical"||e==="both")&&(o<c?t.scrollTo({top:o,behavior:i}):o+s.clientHeight>d&&t.scrollTo({top:o-t.offsetHeight+s.clientHeight,behavior:i}))}var de=ot`
  ${kt}

  :host {
    display: inline-block;
    color: var(--sl-color-neutral-600);
  }

  .icon-button {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    background: none;
    border: none;
    border-radius: var(--sl-border-radius-medium);
    font-size: inherit;
    color: inherit;
    padding: var(--sl-spacing-x-small);
    cursor: pointer;
    transition: var(--sl-transition-x-fast) color;
    -webkit-appearance: none;
  }

  .icon-button:hover:not(.icon-button--disabled),
  .icon-button:focus-visible:not(.icon-button--disabled) {
    color: var(--sl-color-primary-600);
  }

  .icon-button:active:not(.icon-button--disabled) {
    color: var(--sl-color-primary-700);
  }

  .icon-button:focus {
    outline: none;
  }

  .icon-button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .icon-button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .icon-button__icon {
    pointer-events: none;
  }
`,ue=ot`
  ${kt}

  :host {
    display: inline-block;
    width: 1em;
    height: 1em;
    box-sizing: content-box !important;
  }

  svg {
    display: block;
    height: 100%;
    width: 100%;
  }
`,tt="";function $t(s){tt=s}function pe(s=""){if(!tt){const t=[...document.getElementsByTagName("script")],e=t.find(i=>i.hasAttribute("data-shoelace"));if(e)$t(e.getAttribute("data-shoelace"));else{const i=t.find(o=>/shoelace(\.min)?\.js($|\?)/.test(o.src)||/shoelace-autoloader(\.min)?\.js($|\?)/.test(o.src));let r="";i&&(r=i.getAttribute("src")),$t(r.split("/").slice(0,-1).join("/"))}}return tt.replace(/\/$/,"")+(s?`/${s.replace(/^\//,"")}`:"")}var fe={name:"default",resolver:s=>pe(`assets/icons/${s}.svg`)},ge=fe,mt={caret:`
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  `,check:`
    <svg part="checked-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor">
          <g transform="translate(3.428571, 3.428571)">
            <path d="M0,5.71428571 L3.42857143,9.14285714"></path>
            <path d="M9.14285714,0 L3.42857143,9.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"chevron-down":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,"chevron-left":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
    </svg>
  `,"chevron-right":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
    </svg>
  `,copy:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V2Zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H6ZM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1H2Z"/>
    </svg>
  `,eye:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
      <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
      <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
    </svg>
  `,"eye-slash":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
      <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
      <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
      <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
    </svg>
  `,eyedropper:`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eyedropper" viewBox="0 0 16 16">
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z"></path>
    </svg>
  `,"grip-vertical":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grip-vertical" viewBox="0 0 16 16">
      <path d="M7 2a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zM7 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-3 3a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm3 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"></path>
    </svg>
  `,indeterminate:`
    <svg part="indeterminate-icon" class="checkbox__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round">
        <g stroke="currentColor" stroke-width="2">
          <g transform="translate(2.285714, 6.857143)">
            <path d="M10.2857143,1.14285714 L1.14285714,1.14285714"></path>
          </g>
        </g>
      </g>
    </svg>
  `,"person-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
      <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
    </svg>
  `,"play-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play-fill" viewBox="0 0 16 16">
      <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path>
    </svg>
  `,"pause-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pause-fill" viewBox="0 0 16 16">
      <path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path>
    </svg>
  `,radio:`
    <svg part="checked-icon" class="radio__icon" viewBox="0 0 16 16">
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g fill="currentColor">
          <circle cx="8" cy="8" r="3.42857143"></circle>
        </g>
      </g>
    </svg>
  `,"star-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  `,"x-lg":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
    </svg>
  `,"x-circle-fill":`
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"></path>
    </svg>
  `},ve={name:"system",resolver:s=>s in mt?`data:image/svg+xml,${encodeURIComponent(mt[s])}`:""},$e=ve,me=[ge,$e],et=[];function be(s){et.push(s)}function _e(s){et=et.filter(t=>t!==s)}function bt(s){return me.find(t=>t.name===s)}var zt=Object.defineProperty,ye=Object.defineProperties,we=Object.getOwnPropertyDescriptor,Ae=Object.getOwnPropertyDescriptors,_t=Object.getOwnPropertySymbols,Se=Object.prototype.hasOwnProperty,Ee=Object.prototype.propertyIsEnumerable,K=(s,t)=>{if(t=Symbol[s])return t;throw Error("Symbol."+s+" is not defined")},yt=(s,t,e)=>t in s?zt(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e,Ut=(s,t)=>{for(var e in t||(t={}))Se.call(t,e)&&yt(s,e,t[e]);if(_t)for(var e of _t(t))Ee.call(t,e)&&yt(s,e,t[e]);return s},qe=(s,t)=>ye(s,Ae(t)),p=(s,t,e,i)=>{for(var r=i>1?void 0:i?we(t,e):t,o=s.length-1,n;o>=0;o--)(n=s[o])&&(r=(i?n(t,e,r):n(r))||r);return i&&r&&zt(t,e,r),r},Ce=function(s,t){this[0]=s,this[1]=t},Ze=s=>{var t=s[K("asyncIterator")],e=!1,i,r={};return t==null?(t=s[K("iterator")](),i=o=>r[o]=n=>t[o](n)):(t=t.call(s),i=o=>r[o]=n=>{if(e){if(e=!1,o==="throw")throw n;return n}return e=!0,{done:!1,value:new Ce(new Promise(a=>{var l=t[o](n);if(!(l instanceof Object))throw TypeError("Object expected");a(l)}),1)}}),r[K("iterator")]=()=>r,i("next"),"throw"in t?i("throw"):r.throw=o=>{throw o},"return"in t&&i("return"),r};function Rt(s,t){const e=Ut({waitUntilFirstUpdate:!1},t);return(i,r)=>{const{update:o}=i,n=Array.isArray(s)?s:[s];i.update=function(a){n.forEach(l=>{const c=l;if(a.has(c)){const d=a.get(c),h=this[c];d!==h&&(!e.waitUntilFirstUpdate||this.hasUpdated)&&this[r](d,h)}}),o.call(this,a)}}}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const xe={attribute:!0,type:String,converter:V,reflect:!1,hasChanged:nt},Pe=(s=xe,t,e)=>{const{kind:i,metadata:r}=e;let o=globalThis.litPropertyMetadata.get(r);if(o===void 0&&globalThis.litPropertyMetadata.set(r,o=new Map),o.set(e.name,s),i==="accessor"){const{name:n}=e;return{set(a){const l=t.get.call(this);t.set.call(this,a),this.requestUpdate(n,l,s)},init(a){return a!==void 0&&this.C(n,void 0,s),a}}}if(i==="setter"){const{name:n}=e;return function(a){const l=this[n];t.call(this,a),this.requestUpdate(n,l,s)}}throw Error("Unsupported decorator location: "+i)};function f(s){return(t,e)=>typeof e=="object"?Pe(s,t,e):((i,r,o)=>{const n=r.hasOwnProperty(o);return r.constructor.createProperty(o,n?{...i,wrapped:!0}:i),n?Object.getOwnPropertyDescriptor(r,o):void 0})(s,t,e)}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Ht(s){return f({...s,state:!0,attribute:!1})}/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const wt=(s,t,e)=>(e.configurable=!0,e.enumerable=!0,Reflect.decorate&&typeof t!="object"&&Object.defineProperty(s,t,e),e);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */function Le(s,t){return(e,i,r)=>{const o=n=>{var a;return((a=n.renderRoot)==null?void 0:a.querySelector(s))??null};if(t){const{get:n,set:a}=typeof i=="object"?e:r??(()=>{const l=Symbol();return{get(){return this[l]},set(c){this[l]=c}}})();return wt(e,i,{get(){let l=n.call(this);return l===void 0&&(l=o(this),(l!==null||this.hasUpdated)&&a.call(this,l)),l}})}return wt(e,i,{get(){return o(this)}})}}var T=class extends U{constructor(){super(),Object.entries(this.constructor.dependencies).forEach(([s,t])=>{this.constructor.define(s,t)})}emit(s,t){const e=new CustomEvent(s,Ut({bubbles:!0,cancelable:!1,composed:!0,detail:{}},t));return this.dispatchEvent(e),e}static define(s,t=this,e={}){const i=customElements.get(s);if(!i){customElements.define(s,class extends t{},e);return}let r=" (unknown version)",o=r;"version"in t&&t.version&&(r=" v"+t.version),"version"in i&&i.version&&(o=" v"+i.version),!(r&&o&&r===o)&&console.warn(`Attempted to register <${s}>${r}, but <${s}>${o} has already been registered.`)}};T.version="2.12.0";T.dependencies={};p([f()],T.prototype,"dir",2);p([f()],T.prototype,"lang",2);/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Te=(s,t)=>t===void 0?(s==null?void 0:s._$litType$)!==void 0:(s==null?void 0:s._$litType$)===t,Ye=s=>s.strings===void 0;var O=Symbol(),j=Symbol(),X,G=new Map,m=class extends T{constructor(){super(...arguments),this.initialRender=!1,this.svg=null,this.label="",this.library="default"}async resolveIcon(s,t){var e;let i;if(t!=null&&t.spriteSheet)return Mt`<svg part="svg">
        <use part="use" href="${s}"></use>
      </svg>`;try{if(i=await fetch(s,{mode:"cors"}),!i.ok)return i.status===410?O:j}catch{return j}try{const r=document.createElement("div");r.innerHTML=await i.text();const o=r.firstElementChild;if(((e=o==null?void 0:o.tagName)==null?void 0:e.toLowerCase())!=="svg")return O;X||(X=new DOMParser);const a=X.parseFromString(o.outerHTML,"text/html").body.querySelector("svg");return a?(a.part.add("svg"),document.adoptNode(a)):O}catch{return O}}connectedCallback(){super.connectedCallback(),be(this)}firstUpdated(){this.initialRender=!0,this.setIcon()}disconnectedCallback(){super.disconnectedCallback(),_e(this)}getIconSource(){const s=bt(this.library);return this.name&&s?{url:s.resolver(this.name),fromLibrary:!0}:{url:this.src,fromLibrary:!1}}handleLabelChange(){typeof this.label=="string"&&this.label.length>0?(this.setAttribute("role","img"),this.setAttribute("aria-label",this.label),this.removeAttribute("aria-hidden")):(this.removeAttribute("role"),this.removeAttribute("aria-label"),this.setAttribute("aria-hidden","true"))}async setIcon(){var s;const{url:t,fromLibrary:e}=this.getIconSource(),i=e?bt(this.library):void 0;if(!t){this.svg=null;return}let r=G.get(t);if(r||(r=this.resolveIcon(t,i),G.set(t,r)),!this.initialRender)return;const o=await r;if(o===j&&G.delete(t),t===this.getIconSource().url){if(Te(o)){this.svg=o;return}switch(o){case j:case O:this.svg=null,this.emit("sl-error");break;default:this.svg=o.cloneNode(!0),(s=i==null?void 0:i.mutator)==null||s.call(i,this.svg),this.emit("sl-load")}}}render(){return this.svg}};m.styles=ue;p([Ht()],m.prototype,"svg",2);p([f({reflect:!0})],m.prototype,"name",2);p([f()],m.prototype,"src",2);p([f()],m.prototype,"label",2);p([f({reflect:!0})],m.prototype,"library",2);p([Rt("label")],m.prototype,"handleLabelChange",1);p([Rt(["name","src","library"])],m.prototype,"setIcon",1);/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},Oe=s=>(...t)=>({_$litDirective$:s,values:t});class ke{constructor(t){}get _$AU(){return this._$AM._$AU}_$AT(t,e,i){this._$Ct=t,this._$AM=e,this._$Ci=i}_$AS(t,e){return this.update(t,e)}update(t,e){return this.render(...e)}}/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const ze=Oe(class extends ke{constructor(s){var t;if(super(s),s.type!==Me.ATTRIBUTE||s.name!=="class"||((t=s.strings)==null?void 0:t.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(s){return" "+Object.keys(s).filter(t=>s[t]).join(" ")+" "}update(s,[t]){var i,r;if(this.it===void 0){this.it=new Set,s.strings!==void 0&&(this.st=new Set(s.strings.join(" ").split(/\s/).filter(o=>o!=="")));for(const o in t)t[o]&&!((i=this.st)!=null&&i.has(o))&&this.it.add(o);return this.render(t)}const e=s.element.classList;for(const o of this.it)o in t||(e.remove(o),this.it.delete(o));for(const o in t){const n=!!t[o];n===this.it.has(o)||(r=this.st)!=null&&r.has(o)||(n?(e.add(o),this.it.add(o)):(e.remove(o),this.it.delete(o)))}return C}});/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Bt=Symbol.for(""),Ue=s=>{if((s==null?void 0:s.r)===Bt)return s==null?void 0:s._$litStatic$},At=(s,...t)=>({_$litStatic$:t.reduce((e,i,r)=>e+(o=>{if(o._$litStatic$!==void 0)return o._$litStatic$;throw Error(`Value passed to 'literal' function must be a 'literal' result: ${o}. Use 'unsafeStatic' to pass non-literal values, but
            take care to ensure page security.`)})(i)+s[r+1],s[0]),r:Bt}),St=new Map,Re=s=>(t,...e)=>{const i=e.length;let r,o;const n=[],a=[];let l,c=0,d=!1;for(;c<i;){for(l=t[c];c<i&&(o=e[c],(r=Ue(o))!==void 0);)l+=r+t[++c],d=!0;c!==i&&a.push(o),n.push(l),c++}if(c===i&&n.push(t[i]),d){const h=n.join("$$lit$$");(t=St.get(h))===void 0&&(n.raw=n,St.set(h,t=n)),e=a}return s(t,...e)},He=Re(Mt);/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const v=s=>s??u;var g=class extends T{constructor(){super(...arguments),this.hasFocus=!1,this.label="",this.disabled=!1}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(s){this.disabled&&(s.preventDefault(),s.stopPropagation())}click(){this.button.click()}focus(s){this.button.focus(s)}blur(){this.button.blur()}render(){const s=!!this.href,t=s?At`a`:At`button`;return He`
      <${t}
        part="base"
        class=${ze({"icon-button":!0,"icon-button--disabled":!s&&this.disabled,"icon-button--focused":this.hasFocus})}
        ?disabled=${v(s?void 0:this.disabled)}
        type=${v(s?void 0:"button")}
        href=${v(s?this.href:void 0)}
        target=${v(s?this.target:void 0)}
        download=${v(s?this.download:void 0)}
        rel=${v(s&&this.target?"noreferrer noopener":void 0)}
        role=${v(s?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        aria-label="${this.label}"
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @click=${this.handleClick}
      >
        <sl-icon
          class="icon-button__icon"
          name=${v(this.name)}
          library=${v(this.library)}
          src=${v(this.src)}
          aria-hidden="true"
        ></sl-icon>
      </${t}>
    `}};g.styles=de;g.dependencies={"sl-icon":m};p([Le(".icon-button")],g.prototype,"button",2);p([Ht()],g.prototype,"hasFocus",2);p([f()],g.prototype,"name",2);p([f()],g.prototype,"library",2);p([f()],g.prototype,"src",2);p([f()],g.prototype,"href",2);p([f()],g.prototype,"target",2);p([f()],g.prototype,"download",2);p([f()],g.prototype,"label",2);p([f({type:Boolean,reflect:!0})],g.prototype,"disabled",2);const st=new Set,Be=new MutationObserver(Dt),P=new Map;let Nt=document.documentElement.dir||"ltr",It=document.documentElement.lang||navigator.language,A;Be.observe(document.documentElement,{attributes:!0,attributeFilter:["dir","lang"]});function jt(...s){s.map(t=>{const e=t.$code.toLowerCase();P.has(e)?P.set(e,Object.assign(Object.assign({},P.get(e)),t)):P.set(e,t),A||(A=t)}),Dt()}function Dt(){Nt=document.documentElement.dir||"ltr",It=document.documentElement.lang||navigator.language,[...st.keys()].map(s=>{typeof s.requestUpdate=="function"&&s.requestUpdate()})}let Ne=class{constructor(t){this.host=t,this.host.addController(this)}hostConnected(){st.add(this.host)}hostDisconnected(){st.delete(this.host)}dir(){return`${this.host.dir||Nt}`.toLowerCase()}lang(){return`${this.host.lang||It}`.toLowerCase()}getTranslationData(t){var e,i;const r=new Intl.Locale(t.replace(/_/g,"-")),o=r==null?void 0:r.language.toLowerCase(),n=(i=(e=r==null?void 0:r.region)===null||e===void 0?void 0:e.toLowerCase())!==null&&i!==void 0?i:"",a=P.get(`${o}-${n}`),l=P.get(o);return{locale:r,language:o,region:n,primary:a,secondary:l}}exists(t,e){var i;const{primary:r,secondary:o}=this.getTranslationData((i=e.lang)!==null&&i!==void 0?i:this.lang());return e=Object.assign({includeFallback:!1},e),!!(r&&r[t]||o&&o[t]||e.includeFallback&&A&&A[t])}term(t,...e){const{primary:i,secondary:r}=this.getTranslationData(this.lang());let o;if(i&&i[t])o=i[t];else if(r&&r[t])o=r[t];else if(A&&A[t])o=A[t];else return console.error(`No translation found for: ${String(t)}`),String(t);return typeof o=="function"?o(...e):o}date(t,e){return t=new Date(t),new Intl.DateTimeFormat(this.lang(),e).format(t)}number(t,e){return t=Number(t),isNaN(t)?"":new Intl.NumberFormat(this.lang(),e).format(t)}relativeTime(t,e,i){return new Intl.RelativeTimeFormat(this.lang(),i).format(t,e)}};var Vt={$code:"en",$name:"English",$dir:"ltr",carousel:"Carousel",clearEntry:"Clear entry",close:"Close",copied:"Copied",copy:"Copy",currentValue:"Current value",error:"Error",goToSlide:(s,t)=>`Go to slide ${s} of ${t}`,hidePassword:"Hide password",loading:"Loading",nextSlide:"Next slide",numOptionsSelected:s=>s===0?"No options selected":s===1?"1 option selected":`${s} options selected`,previousSlide:"Previous slide",progress:"Progress",remove:"Remove",resize:"Resize",scrollToEnd:"Scroll to end",scrollToStart:"Scroll to start",selectAColorFromTheScreen:"Select a color from the screen",showPassword:"Show password",slideNum:s=>`Slide ${s}`,toggleColorFormat:"Toggle color format"};jt(Vt);var Ie=Vt,Ke=class extends Ne{};jt(Ie);export{Ke as L,g as S,u as T,p as _,T as a,Ut as b,kt as c,ze as d,Le as e,qe as f,m as g,At as h,ot as i,He as j,U as k,Wt as l,ke as m,f as n,v as o,Ye as p,Oe as q,Ht as r,Fe as s,Me as t,C as u,Ze as v,Rt as w,Mt as x,Ve as y,We as z};
//# sourceMappingURL=chunk.WLV3FVBR-84c5c805.js.map
