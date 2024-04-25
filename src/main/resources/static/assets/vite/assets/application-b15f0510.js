/* empty css                           */import{i as te,c as ee,a as oe,L as we,x as T,f as re,b as Wt,g as Ie,_ as p,e as ie,r as H,n as c,w as He,h as pe,j as Gt,d as qt,o as j,k as nt,l as pt,T as dt,m as xe,p as We,t as _e,q as Ce,u as qe}from"./chunk.WLV3FVBR-84c5c805.js";import{H as je,o as Ae,a as Ue}from"./sl-dialog-show-6ea02fac.js";import{g as Ge}from"./_commonjsHelpers-042e6b4d.js";import{d as Ye,i as Xe}from"./debounce-1cf2551d.js";import{E as fe}from"./index-85ef12c9.js";/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const st=t=>(e,o)=>{o!==void 0?o.addInitializer(()=>{customElements.define(t,e)}):customElements.define(t,e)};var Ke=te`
  ${ee}

  :host {
    --track-width: 2px;
    --track-color: rgb(128 128 128 / 25%);
    --indicator-color: var(--sl-color-primary-600);
    --speed: 2s;

    display: inline-flex;
    width: 1em;
    height: 1em;
  }

  .spinner {
    flex: 1 1 auto;
    height: 100%;
    width: 100%;
  }

  .spinner__track,
  .spinner__indicator {
    fill: none;
    stroke-width: var(--track-width);
    r: calc(0.5em - var(--track-width) / 2);
    cx: 0.5em;
    cy: 0.5em;
    transform-origin: 50% 50%;
  }

  .spinner__track {
    stroke: var(--track-color);
    transform-origin: 0% 0%;
  }

  .spinner__indicator {
    stroke: var(--indicator-color);
    stroke-linecap: round;
    stroke-dasharray: 150% 75%;
    animation: spin var(--speed) linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
      stroke-dasharray: 0.01em, 2.75em;
    }

    50% {
      transform: rotate(450deg);
      stroke-dasharray: 1.375em, 1.375em;
    }

    100% {
      transform: rotate(1080deg);
      stroke-dasharray: 0.01em, 2.75em;
    }
  }
`,ke=class extends oe{constructor(){super(...arguments),this.localize=new we(this)}render(){return T`
      <svg part="base" class="spinner" role="progressbar" aria-label=${this.localize.term("loading")}>
        <circle class="spinner__track"></circle>
        <circle class="spinner__indicator"></circle>
      </svg>
    `}};ke.styles=Ke;var wt=new WeakMap,xt=new WeakMap,_t=new WeakMap,Yt=new WeakSet,Dt=new WeakMap,Qe=class{constructor(t,e){this.handleFormData=o=>{const r=this.options.disabled(this.host),i=this.options.name(this.host),n=this.options.value(this.host),s=this.host.tagName.toLowerCase()==="sl-button";!r&&!s&&typeof i=="string"&&i.length>0&&typeof n<"u"&&(Array.isArray(n)?n.forEach(l=>{o.formData.append(i,l.toString())}):o.formData.append(i,n.toString()))},this.handleFormSubmit=o=>{var r;const i=this.options.disabled(this.host),n=this.options.reportValidity;this.form&&!this.form.noValidate&&((r=wt.get(this.form))==null||r.forEach(s=>{this.setUserInteracted(s,!0)})),this.form&&!this.form.noValidate&&!i&&!n(this.host)&&(o.preventDefault(),o.stopImmediatePropagation())},this.handleFormReset=()=>{this.options.setValue(this.host,this.options.defaultValue(this.host)),this.setUserInteracted(this.host,!1),Dt.set(this.host,[])},this.handleInteraction=o=>{const r=Dt.get(this.host);r.includes(o.type)||r.push(o.type),r.length===this.options.assumeInteractionOn.length&&this.setUserInteracted(this.host,!0)},this.checkFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const r of o)if(typeof r.checkValidity=="function"&&!r.checkValidity())return!1}return!0},this.reportFormValidity=()=>{if(this.form&&!this.form.noValidate){const o=this.form.querySelectorAll("*");for(const r of o)if(typeof r.reportValidity=="function"&&!r.reportValidity())return!1}return!0},(this.host=t).addController(this),this.options=Wt({form:o=>{const r=o.form;if(r){const n=o.getRootNode().getElementById(r);if(n)return n}return o.closest("form")},name:o=>o.name,value:o=>o.value,defaultValue:o=>o.defaultValue,disabled:o=>{var r;return(r=o.disabled)!=null?r:!1},reportValidity:o=>typeof o.reportValidity=="function"?o.reportValidity():!0,checkValidity:o=>typeof o.checkValidity=="function"?o.checkValidity():!0,setValue:(o,r)=>o.value=r,assumeInteractionOn:["sl-input"]},e)}hostConnected(){const t=this.options.form(this.host);t&&this.attachForm(t),Dt.set(this.host,[]),this.options.assumeInteractionOn.forEach(e=>{this.host.addEventListener(e,this.handleInteraction)})}hostDisconnected(){this.detachForm(),Dt.delete(this.host),this.options.assumeInteractionOn.forEach(t=>{this.host.removeEventListener(t,this.handleInteraction)})}hostUpdated(){const t=this.options.form(this.host);t||this.detachForm(),t&&this.form!==t&&(this.detachForm(),this.attachForm(t)),this.host.hasUpdated&&this.setValidity(this.host.validity.valid)}attachForm(t){t?(this.form=t,wt.has(this.form)?wt.get(this.form).add(this.host):wt.set(this.form,new Set([this.host])),this.form.addEventListener("formdata",this.handleFormData),this.form.addEventListener("submit",this.handleFormSubmit),this.form.addEventListener("reset",this.handleFormReset),xt.has(this.form)||(xt.set(this.form,this.form.reportValidity),this.form.reportValidity=()=>this.reportFormValidity()),_t.has(this.form)||(_t.set(this.form,this.form.checkValidity),this.form.checkValidity=()=>this.checkFormValidity())):this.form=void 0}detachForm(){if(!this.form)return;const t=wt.get(this.form);t&&(t.delete(this.host),t.size<=0&&(this.form.removeEventListener("formdata",this.handleFormData),this.form.removeEventListener("submit",this.handleFormSubmit),this.form.removeEventListener("reset",this.handleFormReset),xt.has(this.form)&&(this.form.reportValidity=xt.get(this.form),xt.delete(this.form)),_t.has(this.form)&&(this.form.checkValidity=_t.get(this.form),_t.delete(this.form)),this.form=void 0))}setUserInteracted(t,e){e?Yt.add(t):Yt.delete(t),t.requestUpdate()}doAction(t,e){if(this.form){const o=document.createElement("button");o.type=t,o.style.position="absolute",o.style.width="0",o.style.height="0",o.style.clipPath="inset(50%)",o.style.overflow="hidden",o.style.whiteSpace="nowrap",e&&(o.name=e.name,o.value=e.value,["formaction","formenctype","formmethod","formnovalidate","formtarget"].forEach(r=>{e.hasAttribute(r)&&o.setAttribute(r,e.getAttribute(r))})),this.form.append(o),o.click(),o.remove()}}getForm(){var t;return(t=this.form)!=null?t:null}reset(t){this.doAction("reset",t)}submit(t){this.doAction("submit",t)}setValidity(t){const e=this.host,o=!!Yt.has(e),r=!!e.required;e.toggleAttribute("data-required",r),e.toggleAttribute("data-optional",!r),e.toggleAttribute("data-invalid",!t),e.toggleAttribute("data-valid",t),e.toggleAttribute("data-user-invalid",!t&&o),e.toggleAttribute("data-user-valid",t&&o)}updateValidity(){const t=this.host;this.setValidity(t.validity.valid)}emitInvalidEvent(t){const e=new CustomEvent("sl-invalid",{bubbles:!1,composed:!1,cancelable:!0,detail:{}});t||e.preventDefault(),this.host.dispatchEvent(e)||t==null||t.preventDefault()}},ne=Object.freeze({badInput:!1,customError:!1,patternMismatch:!1,rangeOverflow:!1,rangeUnderflow:!1,stepMismatch:!1,tooLong:!1,tooShort:!1,typeMismatch:!1,valid:!0,valueMissing:!1});Object.freeze(re(Wt({},ne),{valid:!1,valueMissing:!0}));Object.freeze(re(Wt({},ne),{valid:!1,customError:!0}));var Je=te`
  ${ee}

  :host {
    display: inline-block;
    position: relative;
    width: auto;
    cursor: pointer;
  }

  .button {
    display: inline-flex;
    align-items: stretch;
    justify-content: center;
    width: 100%;
    border-style: solid;
    border-width: var(--sl-input-border-width);
    font-family: var(--sl-input-font-family);
    font-weight: var(--sl-font-weight-semibold);
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    white-space: nowrap;
    vertical-align: middle;
    padding: 0;
    transition:
      var(--sl-transition-x-fast) background-color,
      var(--sl-transition-x-fast) color,
      var(--sl-transition-x-fast) border,
      var(--sl-transition-x-fast) box-shadow;
    cursor: inherit;
  }

  .button::-moz-focus-inner {
    border: 0;
  }

  .button:focus {
    outline: none;
  }

  .button:focus-visible {
    outline: var(--sl-focus-ring);
    outline-offset: var(--sl-focus-ring-offset);
  }

  .button--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* When disabled, prevent mouse events from bubbling up from children */
  .button--disabled * {
    pointer-events: none;
  }

  .button__prefix,
  .button__suffix {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    pointer-events: none;
  }

  .button__label {
    display: inline-block;
  }

  .button__label::slotted(sl-icon) {
    vertical-align: -2px;
  }

  /*
   * Standard buttons
   */

  /* Default */
  .button--standard.button--default {
    background-color: var(--sl-color-neutral-0);
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--standard.button--default:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-50);
    border-color: var(--sl-color-primary-300);
    color: var(--sl-color-primary-700);
  }

  .button--standard.button--default:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-100);
    border-color: var(--sl-color-primary-400);
    color: var(--sl-color-primary-700);
  }

  /* Primary */
  .button--standard.button--primary {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:hover:not(.button--disabled) {
    background-color: var(--sl-color-primary-500);
    border-color: var(--sl-color-primary-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--primary:active:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--standard.button--success {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:hover:not(.button--disabled) {
    background-color: var(--sl-color-success-500);
    border-color: var(--sl-color-success-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--success:active:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--standard.button--neutral {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:hover:not(.button--disabled) {
    background-color: var(--sl-color-neutral-500);
    border-color: var(--sl-color-neutral-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--neutral:active:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--standard.button--warning {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }
  .button--standard.button--warning:hover:not(.button--disabled) {
    background-color: var(--sl-color-warning-500);
    border-color: var(--sl-color-warning-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--warning:active:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--standard.button--danger {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:hover:not(.button--disabled) {
    background-color: var(--sl-color-danger-500);
    border-color: var(--sl-color-danger-500);
    color: var(--sl-color-neutral-0);
  }

  .button--standard.button--danger:active:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  /*
   * Outline buttons
   */

  .button--outline {
    background: none;
    border: solid 1px;
  }

  /* Default */
  .button--outline.button--default {
    border-color: var(--sl-color-neutral-300);
    color: var(--sl-color-neutral-700);
  }

  .button--outline.button--default:hover:not(.button--disabled),
  .button--outline.button--default.button--checked:not(.button--disabled) {
    border-color: var(--sl-color-primary-600);
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--default:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Primary */
  .button--outline.button--primary {
    border-color: var(--sl-color-primary-600);
    color: var(--sl-color-primary-600);
  }

  .button--outline.button--primary:hover:not(.button--disabled),
  .button--outline.button--primary.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-primary-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--primary:active:not(.button--disabled) {
    border-color: var(--sl-color-primary-700);
    background-color: var(--sl-color-primary-700);
    color: var(--sl-color-neutral-0);
  }

  /* Success */
  .button--outline.button--success {
    border-color: var(--sl-color-success-600);
    color: var(--sl-color-success-600);
  }

  .button--outline.button--success:hover:not(.button--disabled),
  .button--outline.button--success.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-success-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--success:active:not(.button--disabled) {
    border-color: var(--sl-color-success-700);
    background-color: var(--sl-color-success-700);
    color: var(--sl-color-neutral-0);
  }

  /* Neutral */
  .button--outline.button--neutral {
    border-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-600);
  }

  .button--outline.button--neutral:hover:not(.button--disabled),
  .button--outline.button--neutral.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-neutral-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--neutral:active:not(.button--disabled) {
    border-color: var(--sl-color-neutral-700);
    background-color: var(--sl-color-neutral-700);
    color: var(--sl-color-neutral-0);
  }

  /* Warning */
  .button--outline.button--warning {
    border-color: var(--sl-color-warning-600);
    color: var(--sl-color-warning-600);
  }

  .button--outline.button--warning:hover:not(.button--disabled),
  .button--outline.button--warning.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-warning-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--warning:active:not(.button--disabled) {
    border-color: var(--sl-color-warning-700);
    background-color: var(--sl-color-warning-700);
    color: var(--sl-color-neutral-0);
  }

  /* Danger */
  .button--outline.button--danger {
    border-color: var(--sl-color-danger-600);
    color: var(--sl-color-danger-600);
  }

  .button--outline.button--danger:hover:not(.button--disabled),
  .button--outline.button--danger.button--checked:not(.button--disabled) {
    background-color: var(--sl-color-danger-600);
    color: var(--sl-color-neutral-0);
  }

  .button--outline.button--danger:active:not(.button--disabled) {
    border-color: var(--sl-color-danger-700);
    background-color: var(--sl-color-danger-700);
    color: var(--sl-color-neutral-0);
  }

  @media (forced-colors: active) {
    .button.button--outline.button--checked:not(.button--disabled) {
      outline: solid 2px transparent;
    }
  }

  /*
   * Text buttons
   */

  .button--text {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-600);
  }

  .button--text:hover:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:focus-visible:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-500);
  }

  .button--text:active:not(.button--disabled) {
    background-color: transparent;
    border-color: transparent;
    color: var(--sl-color-primary-700);
  }

  /*
   * Size modifiers
   */

  .button--small {
    height: auto;
    min-height: var(--sl-input-height-small);
    font-size: var(--sl-button-font-size-small);
    line-height: calc(var(--sl-input-height-small) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-small);
  }

  .button--medium {
    height: auto;
    min-height: var(--sl-input-height-medium);
    font-size: var(--sl-button-font-size-medium);
    line-height: calc(var(--sl-input-height-medium) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-medium);
  }

  .button--large {
    height: auto;
    min-height: var(--sl-input-height-large);
    font-size: var(--sl-button-font-size-large);
    line-height: calc(var(--sl-input-height-large) - var(--sl-input-border-width) * 2);
    border-radius: var(--sl-input-border-radius-large);
  }

  /*
   * Pill modifier
   */

  .button--pill.button--small {
    border-radius: var(--sl-input-height-small);
  }

  .button--pill.button--medium {
    border-radius: var(--sl-input-height-medium);
  }

  .button--pill.button--large {
    border-radius: var(--sl-input-height-large);
  }

  /*
   * Circle modifier
   */

  .button--circle {
    padding-left: 0;
    padding-right: 0;
  }

  .button--circle.button--small {
    width: var(--sl-input-height-small);
    border-radius: 50%;
  }

  .button--circle.button--medium {
    width: var(--sl-input-height-medium);
    border-radius: 50%;
  }

  .button--circle.button--large {
    width: var(--sl-input-height-large);
    border-radius: 50%;
  }

  .button--circle .button__prefix,
  .button--circle .button__suffix,
  .button--circle .button__caret {
    display: none;
  }

  /*
   * Caret modifier
   */

  .button--caret .button__suffix {
    display: none;
  }

  .button--caret .button__caret {
    height: auto;
  }

  /*
   * Loading modifier
   */

  .button--loading {
    position: relative;
    cursor: wait;
  }

  .button--loading .button__prefix,
  .button--loading .button__label,
  .button--loading .button__suffix,
  .button--loading .button__caret {
    visibility: hidden;
  }

  .button--loading sl-spinner {
    --indicator-color: currentColor;
    position: absolute;
    font-size: 1em;
    height: 1em;
    width: 1em;
    top: calc(50% - 0.5em);
    left: calc(50% - 0.5em);
  }

  /*
   * Badges
   */

  .button ::slotted(sl-badge) {
    position: absolute;
    top: 0;
    right: 0;
    translate: 50% -50%;
    pointer-events: none;
  }

  .button--rtl ::slotted(sl-badge) {
    right: auto;
    left: 0;
    translate: -50% -50%;
  }

  /*
   * Button spacing
   */

  .button--has-label.button--small .button__label {
    padding: 0 var(--sl-spacing-small);
  }

  .button--has-label.button--medium .button__label {
    padding: 0 var(--sl-spacing-medium);
  }

  .button--has-label.button--large .button__label {
    padding: 0 var(--sl-spacing-large);
  }

  .button--has-prefix.button--small {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--small .button__label {
    padding-inline-start: var(--sl-spacing-x-small);
  }

  .button--has-prefix.button--medium {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--medium .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-prefix.button--large .button__label {
    padding-inline-start: var(--sl-spacing-small);
  }

  .button--has-suffix.button--small,
  .button--caret.button--small {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--small .button__label,
  .button--caret.button--small .button__label {
    padding-inline-end: var(--sl-spacing-x-small);
  }

  .button--has-suffix.button--medium,
  .button--caret.button--medium {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--medium .button__label,
  .button--caret.button--medium .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large,
  .button--caret.button--large {
    padding-inline-end: var(--sl-spacing-small);
  }

  .button--has-suffix.button--large .button__label,
  .button--caret.button--large .button__label {
    padding-inline-end: var(--sl-spacing-small);
  }

  /*
   * Button groups support a variety of button types (e.g. buttons with tooltips, buttons as dropdown triggers, etc.).
   * This means buttons aren't always direct descendants of the button group, thus we can't target them with the
   * ::slotted selector. To work around this, the button group component does some magic to add these special classes to
   * buttons and we style them here instead.
   */

  :host(.sl-button-group__button--first:not(.sl-button-group__button--last)) .button {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
  }

  :host(.sl-button-group__button--inner) .button {
    border-radius: 0;
  }

  :host(.sl-button-group__button--last:not(.sl-button-group__button--first)) .button {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }

  /* All except the first */
  :host(.sl-button-group__button:not(.sl-button-group__button--first)) {
    margin-inline-start: calc(-1 * var(--sl-input-border-width));
  }

  /* Add a visual separator between solid buttons */
  :host(
      .sl-button-group__button:not(
          .sl-button-group__button--first,
          .sl-button-group__button--radio,
          [variant='default']
        ):not(:hover)
    )
    .button:after {
    content: '';
    position: absolute;
    top: 0;
    inset-inline-start: 0;
    bottom: 0;
    border-left: solid 1px rgb(128 128 128 / 33%);
    mix-blend-mode: multiply;
  }

  /* Bump hovered, focused, and checked buttons up so their focus ring isn't clipped */
  :host(.sl-button-group__button--hover) {
    z-index: 1;
  }

  /* Focus and checked are always on top */
  :host(.sl-button-group__button--focus),
  :host(.sl-button-group__button[checked]) {
    z-index: 2;
  }
`,w=class extends oe{constructor(){super(...arguments),this.formControlController=new Qe(this,{assumeInteractionOn:["click"]}),this.hasSlotController=new je(this,"[default]","prefix","suffix"),this.localize=new we(this),this.hasFocus=!1,this.invalid=!1,this.title="",this.variant="default",this.size="medium",this.caret=!1,this.disabled=!1,this.loading=!1,this.outline=!1,this.pill=!1,this.circle=!1,this.type="button",this.name="",this.value="",this.href="",this.rel="noreferrer noopener"}get validity(){return this.isButton()?this.button.validity:ne}get validationMessage(){return this.isButton()?this.button.validationMessage:""}firstUpdated(){this.isButton()&&this.formControlController.updateValidity()}handleBlur(){this.hasFocus=!1,this.emit("sl-blur")}handleFocus(){this.hasFocus=!0,this.emit("sl-focus")}handleClick(){this.type==="submit"&&this.formControlController.submit(this),this.type==="reset"&&this.formControlController.reset(this)}handleInvalid(t){this.formControlController.setValidity(!1),this.formControlController.emitInvalidEvent(t)}isButton(){return!this.href}isLink(){return!!this.href}handleDisabledChange(){this.isButton()&&this.formControlController.setValidity(this.disabled)}click(){this.button.click()}focus(t){this.button.focus(t)}blur(){this.button.blur()}checkValidity(){return this.isButton()?this.button.checkValidity():!0}getForm(){return this.formControlController.getForm()}reportValidity(){return this.isButton()?this.button.reportValidity():!0}setCustomValidity(t){this.isButton()&&(this.button.setCustomValidity(t),this.formControlController.updateValidity())}render(){const t=this.isLink(),e=t?pe`a`:pe`button`;return Gt`
      <${e}
        part="base"
        class=${qt({button:!0,"button--default":this.variant==="default","button--primary":this.variant==="primary","button--success":this.variant==="success","button--neutral":this.variant==="neutral","button--warning":this.variant==="warning","button--danger":this.variant==="danger","button--text":this.variant==="text","button--small":this.size==="small","button--medium":this.size==="medium","button--large":this.size==="large","button--caret":this.caret,"button--circle":this.circle,"button--disabled":this.disabled,"button--focused":this.hasFocus,"button--loading":this.loading,"button--standard":!this.outline,"button--outline":this.outline,"button--pill":this.pill,"button--rtl":this.localize.dir()==="rtl","button--has-label":this.hasSlotController.test("[default]"),"button--has-prefix":this.hasSlotController.test("prefix"),"button--has-suffix":this.hasSlotController.test("suffix")})}
        ?disabled=${j(t?void 0:this.disabled)}
        type=${j(t?void 0:this.type)}
        title=${this.title}
        name=${j(t?void 0:this.name)}
        value=${j(t?void 0:this.value)}
        href=${j(t?this.href:void 0)}
        target=${j(t?this.target:void 0)}
        download=${j(t?this.download:void 0)}
        rel=${j(t?this.rel:void 0)}
        role=${j(t?void 0:"button")}
        aria-disabled=${this.disabled?"true":"false"}
        tabindex=${this.disabled?"-1":"0"}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
        @invalid=${this.isButton()?this.handleInvalid:null}
        @click=${this.handleClick}
      >
        <slot name="prefix" part="prefix" class="button__prefix"></slot>
        <slot part="label" class="button__label"></slot>
        <slot name="suffix" part="suffix" class="button__suffix"></slot>
        ${this.caret?Gt` <sl-icon part="caret" class="button__caret" library="system" name="caret"></sl-icon> `:""}
        ${this.loading?Gt`<sl-spinner part="spinner"></sl-spinner>`:""}
      </${e}>
    `}};w.styles=Je;w.dependencies={"sl-icon":Ie,"sl-spinner":ke};p([ie(".button")],w.prototype,"button",2);p([H()],w.prototype,"hasFocus",2);p([H()],w.prototype,"invalid",2);p([c()],w.prototype,"title",2);p([c({reflect:!0})],w.prototype,"variant",2);p([c({reflect:!0})],w.prototype,"size",2);p([c({type:Boolean,reflect:!0})],w.prototype,"caret",2);p([c({type:Boolean,reflect:!0})],w.prototype,"disabled",2);p([c({type:Boolean,reflect:!0})],w.prototype,"loading",2);p([c({type:Boolean,reflect:!0})],w.prototype,"outline",2);p([c({type:Boolean,reflect:!0})],w.prototype,"pill",2);p([c({type:Boolean,reflect:!0})],w.prototype,"circle",2);p([c()],w.prototype,"type",2);p([c()],w.prototype,"name",2);p([c()],w.prototype,"value",2);p([c()],w.prototype,"href",2);p([c()],w.prototype,"target",2);p([c()],w.prototype,"rel",2);p([c()],w.prototype,"download",2);p([c()],w.prototype,"form",2);p([c({attribute:"formaction"})],w.prototype,"formAction",2);p([c({attribute:"formenctype"})],w.prototype,"formEnctype",2);p([c({attribute:"formmethod"})],w.prototype,"formMethod",2);p([c({attribute:"formnovalidate",type:Boolean})],w.prototype,"formNoValidate",2);p([c({attribute:"formtarget"})],w.prototype,"formTarget",2);p([He("disabled",{waitUntilFirstUpdate:!0})],w.prototype,"handleDisabledChange",1);w.define("sl-button");var Ze=te`
  ${ee}

  :host {
    --arrow-color: var(--sl-color-neutral-1000);
    --arrow-size: 6px;

    /*
     * These properties are computed to account for the arrow's dimensions after being rotated 45º. The constant
     * 0.7071 is derived from sin(45), which is the diagonal size of the arrow's container after rotating.
     */
    --arrow-size-diagonal: calc(var(--arrow-size) * 0.7071);
    --arrow-padding-offset: calc(var(--arrow-size-diagonal) - var(--arrow-size));

    display: contents;
  }

  .popup {
    position: absolute;
    isolation: isolate;
    max-width: var(--auto-size-available-width, none);
    max-height: var(--auto-size-available-height, none);
  }

  .popup--fixed {
    position: fixed;
  }

  .popup:not(.popup--active) {
    display: none;
  }

  .popup__arrow {
    position: absolute;
    width: calc(var(--arrow-size-diagonal) * 2);
    height: calc(var(--arrow-size-diagonal) * 2);
    rotate: 45deg;
    background: var(--arrow-color);
    z-index: -1;
  }
`;const Q=Math.min,O=Math.max,Bt=Math.round,zt=Math.floor,J=t=>({x:t,y:t}),to={left:"right",right:"left",bottom:"top",top:"bottom"},eo={start:"end",end:"start"};function Qt(t,e,o){return O(t,Q(e,o))}function ft(t,e){return typeof t=="function"?t(e):t}function Z(t){return t.split("-")[0]}function bt(t){return t.split("-")[1]}function $e(t){return t==="x"?"y":"x"}function se(t){return t==="y"?"height":"width"}function Et(t){return["top","bottom"].includes(Z(t))?"y":"x"}function ae(t){return $e(Et(t))}function oo(t,e,o){o===void 0&&(o=!1);const r=bt(t),i=ae(t),n=se(i);let s=i==="x"?r===(o?"end":"start")?"right":"left":r==="start"?"bottom":"top";return e.reference[n]>e.floating[n]&&(s=Ft(s)),[s,Ft(s)]}function ro(t){const e=Ft(t);return[Jt(t),e,Jt(e)]}function Jt(t){return t.replace(/start|end/g,e=>eo[e])}function io(t,e,o){const r=["left","right"],i=["right","left"],n=["top","bottom"],s=["bottom","top"];switch(t){case"top":case"bottom":return o?e?i:r:e?r:i;case"left":case"right":return e?n:s;default:return[]}}function no(t,e,o,r){const i=bt(t);let n=io(Z(t),o==="start",r);return i&&(n=n.map(s=>s+"-"+i),e&&(n=n.concat(n.map(Jt)))),n}function Ft(t){return t.replace(/left|right|bottom|top/g,e=>to[e])}function so(t){return{top:0,right:0,bottom:0,left:0,...t}}function Se(t){return typeof t!="number"?so(t):{top:t,right:t,bottom:t,left:t}}function Mt(t){return{...t,top:t.y,left:t.x,right:t.x+t.width,bottom:t.y+t.height}}function be(t,e,o){let{reference:r,floating:i}=t;const n=Et(e),s=ae(e),l=se(s),a=Z(e),d=n==="y",b=r.x+r.width/2-i.width/2,f=r.y+r.height/2-i.height/2,g=r[l]/2-i[l]/2;let u;switch(a){case"top":u={x:b,y:r.y-i.height};break;case"bottom":u={x:b,y:r.y+r.height};break;case"right":u={x:r.x+r.width,y:f};break;case"left":u={x:r.x-i.width,y:f};break;default:u={x:r.x,y:r.y}}switch(bt(e)){case"start":u[s]-=g*(o&&d?-1:1);break;case"end":u[s]+=g*(o&&d?-1:1);break}return u}const ao=async(t,e,o)=>{const{placement:r="bottom",strategy:i="absolute",middleware:n=[],platform:s}=o,l=n.filter(Boolean),a=await(s.isRTL==null?void 0:s.isRTL(e));let d=await s.getElementRects({reference:t,floating:e,strategy:i}),{x:b,y:f}=be(d,r,a),g=r,u={},h=0;for(let m=0;m<l.length;m++){const{name:y,fn:v}=l[m],{x,y:_,data:$,reset:A}=await v({x:b,y:f,initialPlacement:r,placement:g,strategy:i,middlewareData:u,rects:d,platform:s,elements:{reference:t,floating:e}});if(b=x??b,f=_??f,u={...u,[y]:{...u[y],...$}},A&&h<=50){h++,typeof A=="object"&&(A.placement&&(g=A.placement),A.rects&&(d=A.rects===!0?await s.getElementRects({reference:t,floating:e,strategy:i}):A.rects),{x:b,y:f}=be(d,g,a)),m=-1;continue}}return{x:b,y:f,placement:g,strategy:i,middlewareData:u}};async function le(t,e){var o;e===void 0&&(e={});const{x:r,y:i,platform:n,rects:s,elements:l,strategy:a}=t,{boundary:d="clippingAncestors",rootBoundary:b="viewport",elementContext:f="floating",altBoundary:g=!1,padding:u=0}=ft(e,t),h=Se(u),y=l[g?f==="floating"?"reference":"floating":f],v=Mt(await n.getClippingRect({element:(o=await(n.isElement==null?void 0:n.isElement(y)))==null||o?y:y.contextElement||await(n.getDocumentElement==null?void 0:n.getDocumentElement(l.floating)),boundary:d,rootBoundary:b,strategy:a})),x=f==="floating"?{...s.floating,x:r,y:i}:s.reference,_=await(n.getOffsetParent==null?void 0:n.getOffsetParent(l.floating)),$=await(n.isElement==null?void 0:n.isElement(_))?await(n.getScale==null?void 0:n.getScale(_))||{x:1,y:1}:{x:1,y:1},A=Mt(n.convertOffsetParentRelativeRectToViewportRelativeRect?await n.convertOffsetParentRelativeRectToViewportRelativeRect({rect:x,offsetParent:_,strategy:a}):x);return{top:(v.top-A.top+h.top)/$.y,bottom:(A.bottom-v.bottom+h.bottom)/$.y,left:(v.left-A.left+h.left)/$.x,right:(A.right-v.right+h.right)/$.x}}const lo=t=>({name:"arrow",options:t,async fn(e){const{x:o,y:r,placement:i,rects:n,platform:s,elements:l,middlewareData:a}=e,{element:d,padding:b=0}=ft(t,e)||{};if(d==null)return{};const f=Se(b),g={x:o,y:r},u=ae(i),h=se(u),m=await s.getDimensions(d),y=u==="y",v=y?"top":"left",x=y?"bottom":"right",_=y?"clientHeight":"clientWidth",$=n.reference[h]+n.reference[u]-g[u]-n.floating[h],A=g[u]-n.reference[u],k=await(s.getOffsetParent==null?void 0:s.getOffsetParent(d));let E=k?k[_]:0;(!E||!await(s.isElement==null?void 0:s.isElement(k)))&&(E=l.floating[_]||n.floating[h]);const B=$/2-A/2,X=E/2-m[h]/2-1,mt=Q(f[v],X),vt=Q(f[x],X),L=mt,yt=E-m[h]-vt,P=E/2-m[h]/2+B,F=Qt(L,P,yt),M=!a.arrow&&bt(i)!=null&&P!=F&&n.reference[h]/2-(P<L?mt:vt)-m[h]/2<0,q=M?P<L?P-L:P-yt:0;return{[u]:g[u]+q,data:{[u]:F,centerOffset:P-F-q,...M&&{alignmentOffset:q}},reset:M}}}),co=function(t){return t===void 0&&(t={}),{name:"flip",options:t,async fn(e){var o,r;const{placement:i,middlewareData:n,rects:s,initialPlacement:l,platform:a,elements:d}=e,{mainAxis:b=!0,crossAxis:f=!0,fallbackPlacements:g,fallbackStrategy:u="bestFit",fallbackAxisSideDirection:h="none",flipAlignment:m=!0,...y}=ft(t,e);if((o=n.arrow)!=null&&o.alignmentOffset)return{};const v=Z(i),x=Z(l)===l,_=await(a.isRTL==null?void 0:a.isRTL(d.floating)),$=g||(x||!m?[Ft(l)]:ro(l));!g&&h!=="none"&&$.push(...no(l,m,h,_));const A=[l,...$],k=await le(e,y),E=[];let B=((r=n.flip)==null?void 0:r.overflows)||[];if(b&&E.push(k[v]),f){const L=oo(i,s,_);E.push(k[L[0]],k[L[1]])}if(B=[...B,{placement:i,overflows:E}],!E.every(L=>L<=0)){var X,mt;const L=(((X=n.flip)==null?void 0:X.index)||0)+1,yt=A[L];if(yt)return{data:{index:L,overflows:B},reset:{placement:yt}};let P=(mt=B.filter(F=>F.overflows[0]<=0).sort((F,M)=>F.overflows[1]-M.overflows[1])[0])==null?void 0:mt.placement;if(!P)switch(u){case"bestFit":{var vt;const F=(vt=B.map(M=>[M.placement,M.overflows.filter(q=>q>0).reduce((q,Ne)=>q+Ne,0)]).sort((M,q)=>M[1]-q[1])[0])==null?void 0:vt[0];F&&(P=F);break}case"initialPlacement":P=l;break}if(i!==P)return{reset:{placement:P}}}return{}}}};async function uo(t,e){const{placement:o,platform:r,elements:i}=t,n=await(r.isRTL==null?void 0:r.isRTL(i.floating)),s=Z(o),l=bt(o),a=Et(o)==="y",d=["left","top"].includes(s)?-1:1,b=n&&a?-1:1,f=ft(e,t);let{mainAxis:g,crossAxis:u,alignmentAxis:h}=typeof f=="number"?{mainAxis:f,crossAxis:0,alignmentAxis:null}:{mainAxis:0,crossAxis:0,alignmentAxis:null,...f};return l&&typeof h=="number"&&(u=l==="end"?h*-1:h),a?{x:u*b,y:g*d}:{x:g*d,y:u*b}}const ho=function(t){return t===void 0&&(t=0),{name:"offset",options:t,async fn(e){const{x:o,y:r}=e,i=await uo(e,t);return{x:o+i.x,y:r+i.y,data:i}}}},po=function(t){return t===void 0&&(t={}),{name:"shift",options:t,async fn(e){const{x:o,y:r,placement:i}=e,{mainAxis:n=!0,crossAxis:s=!1,limiter:l={fn:y=>{let{x:v,y:x}=y;return{x:v,y:x}}},...a}=ft(t,e),d={x:o,y:r},b=await le(e,a),f=Et(Z(i)),g=$e(f);let u=d[g],h=d[f];if(n){const y=g==="y"?"top":"left",v=g==="y"?"bottom":"right",x=u+b[y],_=u-b[v];u=Qt(x,u,_)}if(s){const y=f==="y"?"top":"left",v=f==="y"?"bottom":"right",x=h+b[y],_=h-b[v];h=Qt(x,h,_)}const m=l.fn({...e,[g]:u,[f]:h});return{...m,data:{x:m.x-o,y:m.y-r}}}}},ge=function(t){return t===void 0&&(t={}),{name:"size",options:t,async fn(e){const{placement:o,rects:r,platform:i,elements:n}=e,{apply:s=()=>{},...l}=ft(t,e),a=await le(e,l),d=Z(o),b=bt(o),f=Et(o)==="y",{width:g,height:u}=r.floating;let h,m;d==="top"||d==="bottom"?(h=d,m=b===(await(i.isRTL==null?void 0:i.isRTL(n.floating))?"start":"end")?"left":"right"):(m=d,h=b==="end"?"top":"bottom");const y=u-a[h],v=g-a[m],x=!e.middlewareData.shift;let _=y,$=v;if(f){const k=g-a.left-a.right;$=b||x?Q(v,k):k}else{const k=u-a.top-a.bottom;_=b||x?Q(y,k):k}if(x&&!b){const k=O(a.left,0),E=O(a.right,0),B=O(a.top,0),X=O(a.bottom,0);f?$=g-2*(k!==0||E!==0?k+E:O(a.left,a.right)):_=u-2*(B!==0||X!==0?B+X:O(a.top,a.bottom))}await s({...e,availableWidth:$,availableHeight:_});const A=await i.getDimensions(n.floating);return g!==A.width||u!==A.height?{reset:{rects:!0}}:{}}}};function tt(t){return Ee(t)?(t.nodeName||"").toLowerCase():"#document"}function R(t){var e;return(t==null||(e=t.ownerDocument)==null?void 0:e.defaultView)||window}function Y(t){var e;return(e=(Ee(t)?t.ownerDocument:t.document)||window.document)==null?void 0:e.documentElement}function Ee(t){return t instanceof Node||t instanceof R(t).Node}function U(t){return t instanceof Element||t instanceof R(t).Element}function N(t){return t instanceof HTMLElement||t instanceof R(t).HTMLElement}function me(t){return typeof ShadowRoot>"u"?!1:t instanceof ShadowRoot||t instanceof R(t).ShadowRoot}function Pt(t){const{overflow:e,overflowX:o,overflowY:r,display:i}=D(t);return/auto|scroll|overlay|hidden|clip/.test(e+r+o)&&!["inline","contents"].includes(i)}function fo(t){return["table","td","th"].includes(tt(t))}function ce(t){const e=de(),o=D(t);return o.transform!=="none"||o.perspective!=="none"||(o.containerType?o.containerType!=="normal":!1)||!e&&(o.backdropFilter?o.backdropFilter!=="none":!1)||!e&&(o.filter?o.filter!=="none":!1)||["transform","perspective","filter"].some(r=>(o.willChange||"").includes(r))||["paint","layout","strict","content"].some(r=>(o.contain||"").includes(r))}function bo(t){let e=ut(t);for(;N(e)&&!jt(e);){if(ce(e))return e;e=ut(e)}return null}function de(){return typeof CSS>"u"||!CSS.supports?!1:CSS.supports("-webkit-backdrop-filter","none")}function jt(t){return["html","body","#document"].includes(tt(t))}function D(t){return R(t).getComputedStyle(t)}function Ut(t){return U(t)?{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}:{scrollLeft:t.pageXOffset,scrollTop:t.pageYOffset}}function ut(t){if(tt(t)==="html")return t;const e=t.assignedSlot||t.parentNode||me(t)&&t.host||Y(t);return me(e)?e.host:e}function Pe(t){const e=ut(t);return jt(e)?t.ownerDocument?t.ownerDocument.body:t.body:N(e)&&Pt(e)?e:Pe(e)}function St(t,e,o){var r;e===void 0&&(e=[]),o===void 0&&(o=!0);const i=Pe(t),n=i===((r=t.ownerDocument)==null?void 0:r.body),s=R(i);return n?e.concat(s,s.visualViewport||[],Pt(i)?i:[],s.frameElement&&o?St(s.frameElement):[]):e.concat(i,St(i,[],o))}function Oe(t){const e=D(t);let o=parseFloat(e.width)||0,r=parseFloat(e.height)||0;const i=N(t),n=i?t.offsetWidth:o,s=i?t.offsetHeight:r,l=Bt(o)!==n||Bt(r)!==s;return l&&(o=n,r=s),{width:o,height:r,$:l}}function ue(t){return U(t)?t:t.contextElement}function ct(t){const e=ue(t);if(!N(e))return J(1);const o=e.getBoundingClientRect(),{width:r,height:i,$:n}=Oe(e);let s=(n?Bt(o.width):o.width)/r,l=(n?Bt(o.height):o.height)/i;return(!s||!Number.isFinite(s))&&(s=1),(!l||!Number.isFinite(l))&&(l=1),{x:s,y:l}}const go=J(0);function Re(t){const e=R(t);return!de()||!e.visualViewport?go:{x:e.visualViewport.offsetLeft,y:e.visualViewport.offsetTop}}function mo(t,e,o){return e===void 0&&(e=!1),!o||e&&o!==R(t)?!1:e}function ot(t,e,o,r){e===void 0&&(e=!1),o===void 0&&(o=!1);const i=t.getBoundingClientRect(),n=ue(t);let s=J(1);e&&(r?U(r)&&(s=ct(r)):s=ct(t));const l=mo(n,o,r)?Re(n):J(0);let a=(i.left+l.x)/s.x,d=(i.top+l.y)/s.y,b=i.width/s.x,f=i.height/s.y;if(n){const g=R(n),u=r&&U(r)?R(r):r;let h=g.frameElement;for(;h&&r&&u!==g;){const m=ct(h),y=h.getBoundingClientRect(),v=D(h),x=y.left+(h.clientLeft+parseFloat(v.paddingLeft))*m.x,_=y.top+(h.clientTop+parseFloat(v.paddingTop))*m.y;a*=m.x,d*=m.y,b*=m.x,f*=m.y,a+=x,d+=_,h=R(h).frameElement}}return Mt({width:b,height:f,x:a,y:d})}function vo(t){let{rect:e,offsetParent:o,strategy:r}=t;const i=N(o),n=Y(o);if(o===n)return e;let s={scrollLeft:0,scrollTop:0},l=J(1);const a=J(0);if((i||!i&&r!=="fixed")&&((tt(o)!=="body"||Pt(n))&&(s=Ut(o)),N(o))){const d=ot(o);l=ct(o),a.x=d.x+o.clientLeft,a.y=d.y+o.clientTop}return{width:e.width*l.x,height:e.height*l.y,x:e.x*l.x-s.scrollLeft*l.x+a.x,y:e.y*l.y-s.scrollTop*l.y+a.y}}function yo(t){return Array.from(t.getClientRects())}function Le(t){return ot(Y(t)).left+Ut(t).scrollLeft}function wo(t){const e=Y(t),o=Ut(t),r=t.ownerDocument.body,i=O(e.scrollWidth,e.clientWidth,r.scrollWidth,r.clientWidth),n=O(e.scrollHeight,e.clientHeight,r.scrollHeight,r.clientHeight);let s=-o.scrollLeft+Le(t);const l=-o.scrollTop;return D(r).direction==="rtl"&&(s+=O(e.clientWidth,r.clientWidth)-i),{width:i,height:n,x:s,y:l}}function xo(t,e){const o=R(t),r=Y(t),i=o.visualViewport;let n=r.clientWidth,s=r.clientHeight,l=0,a=0;if(i){n=i.width,s=i.height;const d=de();(!d||d&&e==="fixed")&&(l=i.offsetLeft,a=i.offsetTop)}return{width:n,height:s,x:l,y:a}}function _o(t,e){const o=ot(t,!0,e==="fixed"),r=o.top+t.clientTop,i=o.left+t.clientLeft,n=N(t)?ct(t):J(1),s=t.clientWidth*n.x,l=t.clientHeight*n.y,a=i*n.x,d=r*n.y;return{width:s,height:l,x:a,y:d}}function ve(t,e,o){let r;if(e==="viewport")r=xo(t,o);else if(e==="document")r=wo(Y(t));else if(U(e))r=_o(e,o);else{const i=Re(t);r={...e,x:e.x-i.x,y:e.y-i.y}}return Mt(r)}function De(t,e){const o=ut(t);return o===e||!U(o)||jt(o)?!1:D(o).position==="fixed"||De(o,e)}function Co(t,e){const o=e.get(t);if(o)return o;let r=St(t,[],!1).filter(l=>U(l)&&tt(l)!=="body"),i=null;const n=D(t).position==="fixed";let s=n?ut(t):t;for(;U(s)&&!jt(s);){const l=D(s),a=ce(s);!a&&l.position==="fixed"&&(i=null),(n?!a&&!i:!a&&l.position==="static"&&!!i&&["absolute","fixed"].includes(i.position)||Pt(s)&&!a&&De(t,s))?r=r.filter(b=>b!==s):i=l,s=ut(s)}return e.set(t,r),r}function Ao(t){let{element:e,boundary:o,rootBoundary:r,strategy:i}=t;const s=[...o==="clippingAncestors"?Co(e,this._c):[].concat(o),r],l=s[0],a=s.reduce((d,b)=>{const f=ve(e,b,i);return d.top=O(f.top,d.top),d.right=Q(f.right,d.right),d.bottom=Q(f.bottom,d.bottom),d.left=O(f.left,d.left),d},ve(e,l,i));return{width:a.right-a.left,height:a.bottom-a.top,x:a.left,y:a.top}}function ko(t){return Oe(t)}function $o(t,e,o){const r=N(e),i=Y(e),n=o==="fixed",s=ot(t,!0,n,e);let l={scrollLeft:0,scrollTop:0};const a=J(0);if(r||!r&&!n)if((tt(e)!=="body"||Pt(i))&&(l=Ut(e)),r){const d=ot(e,!0,n,e);a.x=d.x+e.clientLeft,a.y=d.y+e.clientTop}else i&&(a.x=Le(i));return{x:s.left+l.scrollLeft-a.x,y:s.top+l.scrollTop-a.y,width:s.width,height:s.height}}function ye(t,e){return!N(t)||D(t).position==="fixed"?null:e?e(t):t.offsetParent}function ze(t,e){const o=R(t);if(!N(t))return o;let r=ye(t,e);for(;r&&fo(r)&&D(r).position==="static";)r=ye(r,e);return r&&(tt(r)==="html"||tt(r)==="body"&&D(r).position==="static"&&!ce(r))?o:r||bo(t)||o}const So=async function(t){let{reference:e,floating:o,strategy:r}=t;const i=this.getOffsetParent||ze,n=this.getDimensions;return{reference:$o(e,await i(o),r),floating:{x:0,y:0,...await n(o)}}};function Eo(t){return D(t).direction==="rtl"}const Tt={convertOffsetParentRelativeRectToViewportRelativeRect:vo,getDocumentElement:Y,getClippingRect:Ao,getOffsetParent:ze,getElementRects:So,getClientRects:yo,getDimensions:ko,getScale:ct,isElement:U,isRTL:Eo};function Po(t,e){let o=null,r;const i=Y(t);function n(){clearTimeout(r),o&&o.disconnect(),o=null}function s(l,a){l===void 0&&(l=!1),a===void 0&&(a=1),n();const{left:d,top:b,width:f,height:g}=t.getBoundingClientRect();if(l||e(),!f||!g)return;const u=zt(b),h=zt(i.clientWidth-(d+f)),m=zt(i.clientHeight-(b+g)),y=zt(d),x={rootMargin:-u+"px "+-h+"px "+-m+"px "+-y+"px",threshold:O(0,Q(1,a))||1};let _=!0;function $(A){const k=A[0].intersectionRatio;if(k!==a){if(!_)return s();k?s(!1,k):r=setTimeout(()=>{s(!1,1e-7)},100)}_=!1}try{o=new IntersectionObserver($,{...x,root:i.ownerDocument})}catch{o=new IntersectionObserver($,x)}o.observe(t)}return s(!0),n}function Oo(t,e,o,r){r===void 0&&(r={});const{ancestorScroll:i=!0,ancestorResize:n=!0,elementResize:s=typeof ResizeObserver=="function",layoutShift:l=typeof IntersectionObserver=="function",animationFrame:a=!1}=r,d=ue(t),b=i||n?[...d?St(d):[],...St(e)]:[];b.forEach(v=>{i&&v.addEventListener("scroll",o,{passive:!0}),n&&v.addEventListener("resize",o)});const f=d&&l?Po(d,o):null;let g=-1,u=null;s&&(u=new ResizeObserver(v=>{let[x]=v;x&&x.target===d&&u&&(u.unobserve(e),cancelAnimationFrame(g),g=requestAnimationFrame(()=>{u&&u.observe(e)})),o()}),d&&!a&&u.observe(d),u.observe(e));let h,m=a?ot(t):null;a&&y();function y(){const v=ot(t);m&&(v.x!==m.x||v.y!==m.y||v.width!==m.width||v.height!==m.height)&&o(),m=v,h=requestAnimationFrame(y)}return o(),()=>{b.forEach(v=>{i&&v.removeEventListener("scroll",o),n&&v.removeEventListener("resize",o)}),f&&f(),u&&u.disconnect(),u=null,a&&cancelAnimationFrame(h)}}const Ro=(t,e,o)=>{const r=new Map,i={platform:Tt,...o},n={...i.platform,_c:r};return ao(t,e,{...i,platform:n})};function Lo(t){return Do(t)}function Xt(t){return t.assignedSlot?t.assignedSlot:t.parentNode instanceof ShadowRoot?t.parentNode.host:t.parentNode}function Do(t){for(let e=t;e;e=Xt(e))if(e instanceof Element&&getComputedStyle(e).display==="none")return null;for(let e=Xt(t);e;e=Xt(e)){if(!(e instanceof Element))continue;const o=getComputedStyle(e);if(o.display!=="contents"&&(o.position!=="static"||o.filter!=="none"||e.tagName==="BODY"))return e}return null}function zo(t){return t!==null&&typeof t=="object"&&"getBoundingClientRect"in t}var C=class extends oe{constructor(){super(...arguments),this.active=!1,this.placement="top",this.strategy="absolute",this.distance=0,this.skidding=0,this.arrow=!1,this.arrowPlacement="anchor",this.arrowPadding=10,this.flip=!1,this.flipFallbackPlacements="",this.flipFallbackStrategy="best-fit",this.flipPadding=0,this.shift=!1,this.shiftPadding=0,this.autoSizePadding=0}async connectedCallback(){super.connectedCallback(),await this.updateComplete,this.start()}disconnectedCallback(){super.disconnectedCallback(),this.stop()}async updated(t){super.updated(t),t.has("active")&&(this.active?this.start():this.stop()),t.has("anchor")&&this.handleAnchorChange(),this.active&&(await this.updateComplete,this.reposition())}async handleAnchorChange(){if(await this.stop(),this.anchor&&typeof this.anchor=="string"){const t=this.getRootNode();this.anchorEl=t.getElementById(this.anchor)}else this.anchor instanceof Element||zo(this.anchor)?this.anchorEl=this.anchor:this.anchorEl=this.querySelector('[slot="anchor"]');this.anchorEl instanceof HTMLSlotElement&&(this.anchorEl=this.anchorEl.assignedElements({flatten:!0})[0]),this.anchorEl&&this.start()}start(){this.anchorEl&&(this.cleanup=Oo(this.anchorEl,this.popup,()=>{this.reposition()}))}async stop(){return new Promise(t=>{this.cleanup?(this.cleanup(),this.cleanup=void 0,this.removeAttribute("data-current-placement"),this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height"),requestAnimationFrame(()=>t())):t()})}reposition(){if(!this.active||!this.anchorEl)return;const t=[ho({mainAxis:this.distance,crossAxis:this.skidding})];this.sync?t.push(ge({apply:({rects:o})=>{const r=this.sync==="width"||this.sync==="both",i=this.sync==="height"||this.sync==="both";this.popup.style.width=r?`${o.reference.width}px`:"",this.popup.style.height=i?`${o.reference.height}px`:""}})):(this.popup.style.width="",this.popup.style.height=""),this.flip&&t.push(co({boundary:this.flipBoundary,fallbackPlacements:this.flipFallbackPlacements,fallbackStrategy:this.flipFallbackStrategy==="best-fit"?"bestFit":"initialPlacement",padding:this.flipPadding})),this.shift&&t.push(po({boundary:this.shiftBoundary,padding:this.shiftPadding})),this.autoSize?t.push(ge({boundary:this.autoSizeBoundary,padding:this.autoSizePadding,apply:({availableWidth:o,availableHeight:r})=>{this.autoSize==="vertical"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-height",`${r}px`):this.style.removeProperty("--auto-size-available-height"),this.autoSize==="horizontal"||this.autoSize==="both"?this.style.setProperty("--auto-size-available-width",`${o}px`):this.style.removeProperty("--auto-size-available-width")}})):(this.style.removeProperty("--auto-size-available-width"),this.style.removeProperty("--auto-size-available-height")),this.arrow&&t.push(lo({element:this.arrowEl,padding:this.arrowPadding}));const e=this.strategy==="absolute"?o=>Tt.getOffsetParent(o,Lo):Tt.getOffsetParent;Ro(this.anchorEl,this.popup,{placement:this.placement,middleware:t,strategy:this.strategy,platform:re(Wt({},Tt),{getOffsetParent:e})}).then(({x:o,y:r,middlewareData:i,placement:n})=>{const s=getComputedStyle(this).direction==="rtl",l={top:"bottom",right:"left",bottom:"top",left:"right"}[n.split("-")[0]];if(this.setAttribute("data-current-placement",n),Object.assign(this.popup.style,{left:`${o}px`,top:`${r}px`}),this.arrow){const a=i.arrow.x,d=i.arrow.y;let b="",f="",g="",u="";if(this.arrowPlacement==="start"){const h=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";b=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"",f=s?h:"",u=s?"":h}else if(this.arrowPlacement==="end"){const h=typeof a=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:"";f=s?"":h,u=s?h:"",g=typeof d=="number"?`calc(${this.arrowPadding}px - var(--arrow-padding-offset))`:""}else this.arrowPlacement==="center"?(u=typeof a=="number"?"calc(50% - var(--arrow-size-diagonal))":"",b=typeof d=="number"?"calc(50% - var(--arrow-size-diagonal))":""):(u=typeof a=="number"?`${a}px`:"",b=typeof d=="number"?`${d}px`:"");Object.assign(this.arrowEl.style,{top:b,right:f,bottom:g,left:u,[l]:"calc(var(--arrow-size-diagonal) * -1)"})}}),this.emit("sl-reposition")}render(){return T`
      <slot name="anchor" @slotchange=${this.handleAnchorChange}></slot>

      <div
        part="popup"
        class=${qt({popup:!0,"popup--active":this.active,"popup--fixed":this.strategy==="fixed","popup--has-arrow":this.arrow})}
      >
        <slot></slot>
        ${this.arrow?T`<div part="arrow" class="popup__arrow" role="presentation"></div>`:""}
      </div>
    `}};C.styles=Ze;p([ie(".popup")],C.prototype,"popup",2);p([ie(".popup__arrow")],C.prototype,"arrowEl",2);p([c()],C.prototype,"anchor",2);p([c({type:Boolean,reflect:!0})],C.prototype,"active",2);p([c({reflect:!0})],C.prototype,"placement",2);p([c({reflect:!0})],C.prototype,"strategy",2);p([c({type:Number})],C.prototype,"distance",2);p([c({type:Number})],C.prototype,"skidding",2);p([c({type:Boolean})],C.prototype,"arrow",2);p([c({attribute:"arrow-placement"})],C.prototype,"arrowPlacement",2);p([c({attribute:"arrow-padding",type:Number})],C.prototype,"arrowPadding",2);p([c({type:Boolean})],C.prototype,"flip",2);p([c({attribute:"flip-fallback-placements",converter:{fromAttribute:t=>t.split(" ").map(e=>e.trim()).filter(e=>e!==""),toAttribute:t=>t.join(" ")}})],C.prototype,"flipFallbackPlacements",2);p([c({attribute:"flip-fallback-strategy"})],C.prototype,"flipFallbackStrategy",2);p([c({type:Object})],C.prototype,"flipBoundary",2);p([c({attribute:"flip-padding",type:Number})],C.prototype,"flipPadding",2);p([c({type:Boolean})],C.prototype,"shift",2);p([c({type:Object})],C.prototype,"shiftBoundary",2);p([c({attribute:"shift-padding",type:Number})],C.prototype,"shiftPadding",2);p([c({attribute:"auto-size"})],C.prototype,"autoSize",2);p([c()],C.prototype,"sync",2);p([c({type:Object})],C.prototype,"autoSizeBoundary",2);p([c({attribute:"auto-size-padding",type:Number})],C.prototype,"autoSizePadding",2);C.define("sl-popup");var To=Ye,Bo=Xe,Fo="Expected a function";function Mo(t,e,o){var r=!0,i=!0;if(typeof t!="function")throw new TypeError(Fo);return Bo(o)&&(r="leading"in o?!!o.leading:r,i="trailing"in o?!!o.trailing:i),To(t,e,{leading:r,maxWait:e,trailing:i})}var Vo=Mo;const No=Ge(Vo);var Io=Object.defineProperty,Ho=Object.getOwnPropertyDescriptor,Ot=(t,e,o,r)=>{for(var i=r>1?void 0:r?Ho(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&Io(e,o,i),i};let ht=class extends nt{constructor(){var t;super(...arguments),this.input=this.querySelector("input"),this.contentEl=this.querySelector("[data-type-ahead-content]"),this._initialContentHtml=((t=this.contentEl)==null?void 0:t.innerHTML)||"",this._searchAbortController=new AbortController,this._throttledSearch=No(this._search,300,{leading:!1}),this.queryPath="",this.queryKey="q",this.fetching=!1,this.shouldReFetch=!1}connectedCallback(){super.connectedCallback(),(!this.input||!this.contentEl)&&console.warn("DrbTypeAhead must contain an input element and a content element with the [data-type-ahead-content] attribute."),this.input.addEventListener("input",()=>{this.input.value?this._throttledSearch():this.reset()})}_setContent(t){this.contentEl.innerHTML=t}async _search(){if(this.fetching){this.shouldReFetch=!0;return}this.fetching=!0;const t=this.queryPath.startsWith("/")?new URL(window.location.origin+this.queryPath):new URL(this.queryPath);t.searchParams.set(this.queryKey,this.input.value);try{const e=await fetch(t.toString(),{method:"GET",headers:{"X-Requested-With":"XMLHttpRequest"},signal:this._searchAbortController.signal});if(!e.ok)throw new Error("Something went wrong");const o=await e.text();this._setContent(o)}catch(e){console.warn("Search error:",e)}finally{this.fetching=!1,this.shouldReFetch&&(this.shouldReFetch=!1,this._search())}}reset(){this.input.value="",this._throttledSearch.cancel(),this._searchAbortController.abort(),this._searchAbortController=new AbortController,this.fetching=!1,this.shouldReFetch=!1,this._setContent(this._initialContentHtml)}render(){return T`
      <slot></slot>
    `}};Ot([c({attribute:"query-path",type:String})],ht.prototype,"queryPath",2);Ot([c({attribute:"query-key",type:String})],ht.prototype,"queryKey",2);Ot([H()],ht.prototype,"fetching",2);Ot([H()],ht.prototype,"shouldReFetch",2);ht=Ot([st("drb-type-ahead")],ht);const Wo=`:host{display:contents}sl-popup::part(popup){z-index:9999;z-index:var(--zi-default-overlay, 9999);min-width:150px;min-width:var(--popover-min-width, 150px);padding:12px;padding:var(--popover-padding, 12px);overflow-x:hidden;transition-property:opacity,transform,visibility,height,padding;transition-duration:.2s,.2s,.2s,0s,0s;transition-timing-function:cubic-bezier(.34,1.56,.64,1);border:1px solid #f3f3f4;border:var(--popover-border, 1px solid #f3f3f4);border-radius:16px;border-radius:var(--popover-radius, 16px);background:#fff;background:var(--popover-bg, #fff)}sl-popup:not([active])::part(popup){display:block;visibility:hidden;height:0;padding:0;transform:var(--popover-none-transform);transform:var(--popover-initial-transform);transition-delay:0s,0s,0s,.2s,.2s;opacity:0}sl-popup::part(arrow){--arrow-color: var(--popover-arrow-color, #f3f3f4)}
`;var qo=Object.defineProperty,jo=Object.getOwnPropertyDescriptor,Rt=(t,e,o,r)=>{for(var i=r>1?void 0:r?jo(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&qo(e,o,i),i};let rt=class extends nt{constructor(){super(...arguments),this.isActive=!1,this.placement="bottom-end",this.distance=0,this.sync=""}render(){return T`
      <sl-popup
        active="${this.isActive||dt}"
        placement="${this.placement}"
        distance="${this.distance}"
        sync="${this.sync}"
      >
        <slot slot="anchor"></slot>
        <slot name="popover-content"></slot>
      </sl-popup>
    `}};rt.styles=pt(Wo);Rt([c({attribute:"active",reflect:!0,type:Boolean})],rt.prototype,"isActive",2);Rt([c({type:String})],rt.prototype,"placement",2);Rt([c({type:Number})],rt.prototype,"distance",2);Rt([c({type:String})],rt.prototype,"sync",2);rt=Rt([st("drb-popover")],rt);const Uo=`:host{display:contents}.dropdown-option{display:inline-flex;position:relative;box-sizing:border-box;align-items:center;width:100%;width:var(--dropdown-option-width, 100%);height:38px;height:var(--dropdown-option-height, 38px);margin:0;padding:12px;padding:var(--dropdown-option-padding, 12px);border:1px solid transparent;border:1px solid var(--dropdown-option-border-color, transparent);border-radius:8px;border-radius:var(--dropdown-option-radius, 8px);background-color:#fff;background-color:var(--dropdown-option-bg-color, #fff);color:#3d3d4e;color:var(--dropdown-option-color, #3d3d4e);font-size:14px;font-size:var(--dropdown-option-font-size, 14px);font-weight:500;font-weight:var(--dropdown-option-font-weight, 500);line-height:1;cursor:pointer}.dropdown-option:hover,.dropdown-option:focus-visible{--dropdown-option-bg-color: #fafafb;--dropdown-option-border-color: #f3f3f4;outline:0}:host([selected]) .dropdown-option{--dropdown-option-bg-color: rgba(243, 175, 228, .2);--dropdown-option-border-color: rgba(120, 60, 106, .1)}.dropdown-option__text{width:100%;overflow:hidden;text-align:left;text-overflow:ellipsis;white-space:nowrap}
`;var Go=Object.defineProperty,Yo=Object.getOwnPropertyDescriptor,gt=(t,e,o,r)=>{for(var i=r>1?void 0:r?Yo(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&Go(e,o,i),i};let et=class extends nt{constructor(){var t,e;super(...arguments),this.dropdown=this.closest("drb-dropdown"),this.unstyled=!1,this.selected=!1,this.noSelected=!1,this.label=((t=this.textContent)==null?void 0:t.trim())||"",this.value=((e=this.textContent)==null?void 0:e.trim())||""}connectedCallback(){super.connectedCallback(),this.dropdown&&(this._syncSelected(),this.addEventListener("click",()=>{this.dropdown.value=this.value,this.dropdown.label=this.label,this.dropdown.close()}),this.dropdown.addEventListener("change",this._syncSelected.bind(this)))}_syncSelected(){this.noSelected||(this.selected=this.dropdown.value===this.value)}render(){return this.unstyled?T`<slot></slot>`:T`
        <button class="dropdown-option">
          <span class="dropdown-option__text">
            <slot></slot>
          </span>
        </button>
      `}};et.styles=pt(Uo);gt([c({reflect:!0,type:Boolean})],et.prototype,"unstyled",2);gt([c({reflect:!0,type:Boolean})],et.prototype,"selected",2);gt([c({attribute:"no-selected",type:Boolean})],et.prototype,"noSelected",2);gt([c()],et.prototype,"label",2);gt([c()],et.prototype,"value",2);et=gt([st("drb-dropdown-option")],et);const Xo=`:host{--popover-initial-transform: translate(0, -6px);display:contents}
`;var Ko=Object.defineProperty,Qo=Object.getOwnPropertyDescriptor,at=(t,e,o,r)=>{for(var i=r>1?void 0:r?Qo(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&Ko(e,o,i),i};let I=class extends nt{constructor(){super(),this.isDraggingFromWithin=!1,this.isActive=!1,this.name="",this.value="",this.label="",this.fitContent=!1,this.placement="bottom-end",this._toggleOpen=()=>{this.isActive?this.close():this.open()},this._syncLabel=()=>{const t=Array.from(this.querySelectorAll("drb-dropdown-option")).find(e=>e.value===this.value);t&&(this.label=t.label)},this.attachInternals&&(this.internals=this.attachInternals())}connectedCallback(){super.connectedCallback(),this._syncLabel(),document.addEventListener("click",t=>{const e=t.target;!this.contains(e)&&this.isActive&&!this.isDraggingFromWithin&&this.close()}),document.addEventListener("keyup",t=>{t.key==="Escape"&&this.isActive&&(t.stopPropagation(),this.close())}),document.addEventListener("mouseup",()=>{Ae(()=>{this.isDraggingFromWithin=!1})})}updated(t){var e;if(t.has("label")){const o=this.querySelector("[data-dropdown-label]");o&&this.label&&(o.innerHTML=this.label)}t.has("value")&&(this.close(),(e=this.internals)==null||e.setFormValue(this.value),t.has("label")||this._syncLabel(),this.dispatchEvent(new CustomEvent("change",{bubbles:!0,composed:!0})))}close(){this.isActive=!1,setTimeout(()=>{Array.from(this.querySelectorAll("drb-type-ahead")).forEach(e=>e.reset())},300)}open(){this.isActive=!0}render(){return T`
      <drb-popover
        active="${this.isActive||dt}"
        distance="8"
        placement="${this.placement}"
        sync="${this.fitContent?"":"width"}"
      >
        <slot @click="${this._toggleOpen}"></slot>
        <slot
          name="dropdown-content"
          slot="popover-content"
          @mousedown="${()=>{this.isDraggingFromWithin=!0}}"
        ></slot>
      </drb-popover>
    `}};I.styles=pt(Xo);I.formAssociated=!0;at([c({attribute:"active",reflect:!0})],I.prototype,"isActive",2);at([c()],I.prototype,"name",2);at([c({reflect:!0,type:String})],I.prototype,"value",2);at([c({reflect:!0,type:String})],I.prototype,"label",2);at([c({attribute:"fit-content",type:Boolean})],I.prototype,"fitContent",2);at([c({attribute:"placement",type:String})],I.prototype,"placement",2);I=at([st("drb-dropdown")],I);let he=!1;if(typeof window<"u"){const t={get passive(){he=!0}};window.addEventListener("testPassive",null,t),window.removeEventListener("testPassive",null,t)}const Vt=typeof window<"u"&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||window.navigator.platform==="MacIntel"&&window.navigator.maxTouchPoints>1);let K=[],S=new Map,Nt=!1,Te=-1,At,Ct,V,kt;const Be=t=>K.some(e=>!!(e.options.allowTouchMove&&e.options.allowTouchMove(t))),It=t=>{const e=t||window.event;return Be(e.target)||e.touches.length>1?!0:(e.preventDefault&&e.preventDefault(),!1)},Jo=t=>{if(kt===void 0){const e=!!t&&t.reserveScrollBarGap===!0,o=window.innerWidth-document.documentElement.getBoundingClientRect().width;if(e&&o>0){const r=parseInt(window.getComputedStyle(document.body).getPropertyValue("padding-right"),10);kt=document.body.style.paddingRight,document.body.style.paddingRight=`${r+o}px`}}At===void 0&&(At=document.body.style.overflow,document.body.style.overflow="hidden")},Zo=()=>{kt!==void 0&&(document.body.style.paddingRight=kt,kt=void 0),At!==void 0&&(document.body.style.overflow=At,At=void 0)},tr=()=>window.requestAnimationFrame(()=>{const t=document.documentElement,e=document.body;if(V===void 0){Ct={...t.style},V={...e.style};const{scrollY:o,scrollX:r,innerHeight:i}=window;t.style.height="100%",t.style.overflow="hidden",e.style.position="fixed",e.style.top=`${-o}px`,e.style.left=`${-r}px`,e.style.width="100%",e.style.height="auto",e.style.overflow="hidden",setTimeout(()=>window.requestAnimationFrame(()=>{const n=i-window.innerHeight;n&&o>=i&&(e.style.top=-(o+n)+"px")}),300)}}),er=()=>{if(V!==void 0){const t=-parseInt(document.body.style.top,10),e=-parseInt(document.body.style.left,10),o=document.documentElement,r=document.body;o.style.height=(Ct==null?void 0:Ct.height)||"",o.style.overflow=(Ct==null?void 0:Ct.overflow)||"",r.style.position=V.position||"",r.style.top=V.top||"",r.style.left=V.left||"",r.style.width=V.width||"",r.style.height=V.height||"",r.style.overflow=V.overflow||"",window.scrollTo(e,t),V=void 0}},or=t=>t?t.scrollHeight-t.scrollTop<=t.clientHeight:!1,rr=(t,e)=>{const o=t.targetTouches[0].clientY-Te;return Be(t.target)?!1:e&&e.scrollTop===0&&o>0||or(e)&&o<0?It(t):(t.stopPropagation(),!0)},ir=(t,e)=>{if(!t){console.error("disableBodyScroll unsuccessful - targetElement must be provided when calling disableBodyScroll on IOS devices.");return}if(S.set(t,S!=null&&S.get(t)?(S==null?void 0:S.get(t))+1:1),K.some(r=>r.targetElement===t))return;const o={targetElement:t,options:e||{}};K=[...K,o],Vt?tr():Jo(e),Vt&&(t.ontouchstart=r=>{r.targetTouches.length===1&&(Te=r.targetTouches[0].clientY)},t.ontouchmove=r=>{r.targetTouches.length===1&&rr(r,t)},Nt||(document.addEventListener("touchmove",It,he?{passive:!1}:void 0),Nt=!0))},nr=t=>{if(!t){console.error("enableBodyScroll unsuccessful - targetElement must be provided when calling enableBodyScroll on IOS devices.");return}S.set(t,S!=null&&S.get(t)?(S==null?void 0:S.get(t))-1:0),(S==null?void 0:S.get(t))===0&&(K=K.filter(e=>e.targetElement!==t),S==null||S.delete(t)),Vt&&(t.ontouchstart=null,t.ontouchmove=null,Nt&&K.length===0&&(document.removeEventListener("touchmove",It,he?{passive:!1}:void 0),Nt=!1)),K.length===0&&(Vt?er():Zo())};/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const $t=(t,e)=>{var r;const o=t._$AN;if(o===void 0)return!1;for(const i of o)(r=i._$AO)==null||r.call(i,e,!1),$t(i,e);return!0},Ht=t=>{let e,o;do{if((e=t._$AM)===void 0)break;o=e._$AN,o.delete(t),t=e}while((o==null?void 0:o.size)===0)},Fe=t=>{for(let e;e=t._$AM;t=e){let o=e._$AN;if(o===void 0)e._$AN=o=new Set;else if(o.has(t))break;o.add(t),lr(e)}};function sr(t){this._$AN!==void 0?(Ht(this),this._$AM=t,Fe(this)):this._$AM=t}function ar(t,e=!1,o=0){const r=this._$AH,i=this._$AN;if(i!==void 0&&i.size!==0)if(e)if(Array.isArray(r))for(let n=o;n<r.length;n++)$t(r[n],!1),Ht(r[n]);else r!=null&&($t(r,!1),Ht(r));else $t(this,t)}const lr=t=>{t.type==_e.CHILD&&(t._$AP??(t._$AP=ar),t._$AQ??(t._$AQ=sr))};class cr extends xe{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,o,r){super._$AT(e,o,r),Fe(this),this.isConnected=e._$AU}_$AO(e,o=!0){var r,i;e!==this.isConnected&&(this.isConnected=e,e?(r=this.reconnected)==null||r.call(this):(i=this.disconnected)==null||i.call(this)),o&&($t(this,e),Ht(this))}setValue(e){if(We(this._$Ct))this._$Ct._$AI(e,this);else{const o=[...this._$Ct._$AH];o[this._$Ci]=e,this._$Ct._$AI(o,this,0)}}disconnected(){}reconnected(){}}/**
 * @license
 * Copyright 2020 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */const Me=()=>new dr;class dr{}const Kt=new WeakMap,Ve=Ce(class extends cr{render(t){return dt}update(t,[e]){var r;const o=e!==this.G;return o&&this.G!==void 0&&this.ot(void 0),(o||this.rt!==this.lt)&&(this.G=e,this.ct=(r=t.options)==null?void 0:r.host,this.ot(this.lt=t.element)),dt}ot(t){if(typeof this.G=="function"){const e=this.ct??globalThis;let o=Kt.get(e);o===void 0&&(o=new WeakMap,Kt.set(e,o)),o.get(this.G)!==void 0&&this.G.call(this.ct,void 0),o.set(this.G,t),t!==void 0&&this.G.call(this.ct,t)}else this.G.value=t}get rt(){var t,e;return typeof this.G=="function"?(t=Kt.get(this.ct??globalThis))==null?void 0:t.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.rt===this.lt&&this.ot(void 0)}reconnected(){this.ot(this.lt)}});/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */class Zt extends xe{constructor(e){if(super(e),this.et=dt,e.type!==_e.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(e){if(e===dt||e==null)return this.vt=void 0,this.et=e;if(e===qe)return e;if(typeof e!="string")throw Error(this.constructor.directiveName+"() called with a non-string value");if(e===this.et)return this.vt;this.et=e;const o=[e];return o.raw=o,this.vt={_$litType$:this.constructor.resultType,strings:o,values:[]}}}Zt.directiveName="unsafeHTML",Zt.resultType=1;const ur=Ce(Zt),hr=`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 7L7 17M7 7L17 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,pr=`:host{--dialog-exit-duration: .2s;display:contents;visibility:hidden;transition:visibility var(--dialog-exit-duration)}:host([open]){visibility:visible}:host([mounting]){visibility:hidden;transition:none}.dialog{display:grid;position:fixed;z-index:10005;z-index:var(--zi-dialog, 10005);top:0;left:0;width:100vw;max-width:none;height:100%;max-height:none;margin:0;padding:0;overflow-y:scroll;transition:opacity var(--dialog-exit-duration) ease-in;border:none;opacity:0;background:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=);font-family:Mona Sans,Helvetica Neue,Helvetica,Arial,sans-serif;white-space:normal;pointer-events:none;place-items:end center;overscroll-behavior:contain}@media (min-width: 500px){.dialog{place-items:center}.dialog--drawer{place-items:start end}}.dialog[open]{transition-duration:.3s;transition-timing-function:ease-out;opacity:1;pointer-events:all}.dialog::backdrop{opacity:0}.dialog__close{--close-padding: 8px;--close-offset-x: 11px;--close-offset-y: 12px;position:absolute;top:calc(var(--close-offset-y) - var(--close-padding));right:calc(var(--close-offset-x) - var(--close-padding));box-sizing:content-box;width:22px;height:22px;padding:var(--close-padding);transition:color .2s ease;border:none;background:none;color:#0d0c22;cursor:pointer}@media (min-width: 500px){.dialog__close{--close-offset-x: 22px;--close-offset-y: 22px}}.dialog__close:hover{color:#565564}.dialog__close svg{width:100%;height:100%}.dialog__wrapper{position:relative;box-sizing:border-box;width:100vw;margin:24px 0 0;padding:32px 16px;padding:var(--dialog-padding, 32px 16px);transform:translateY(16px);transition:transform var(--dialog-exit-duration) cubic-bezier(.32,0,.59,.03);border-radius:16px 16px 0 0;border-radius:var(--dialog-radius, 16px 16px 0 0);background-color:#fff;background-color:var(--dialog-bg-color, #ffffff)}@media (min-width: 500px){.dialog__wrapper{max-width:min(100vw,484px);max-width:min(100vw,var(--dialog-max-width, 484px));margin:24px 0;padding:48px;padding:var(--dialog-padding, 48px);border-radius:16px;border-radius:var(--dialog-radius, 16px)}.dialog--drawer .dialog__wrapper{max-width:400px;max-width:var(--dialog-max-width, 400px);height:100%;margin:0;padding:48px 32px;padding:var(--dialog-padding, 48px 32px);transform:translate(16px);border-radius:0}}.dialog[open] .dialog__wrapper{transform:translate(0);transition-duration:.4s;transition-timing-function:cubic-bezier(.34,1.56,.64,1)}
`;var fr=Object.defineProperty,br=Object.getOwnPropertyDescriptor,lt=(t,e,o,r)=>{for(var i=r>1?void 0:r?br(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&fr(e,o,i),i};let G=class extends nt{constructor(){super(...arguments),this.dialogRef=Me(),this.isMounting=!0,this.isOpen=!1,this.preventLightDismiss=!1,this.drawer=!1,this.returnValue="",this.isDraggingFromDialog=!1}async firstUpdated(){await Ue(this.dialogRef.value),this.isMounting=!1,this.isOpen&&this.open()}connectedCallback(){super.connectedCallback(),document.addEventListener("click",t=>{const e=t.target.closest("[data-dialog-open]");(e==null?void 0:e.getAttribute("data-dialog-open"))===this.id&&this.open()})}createRenderRoot(){const t=super.createRenderRoot();return t.addEventListener("click",e=>{const o=e.target.closest("[data-dialog-close]");o&&this.close(o.getAttribute("data-dialog-close"))}),t}open(){var t;(t=this.dialogRef.value)==null||t.showModal(),this.isOpen=!0,ir(this.dialogRef.value,{reserveScrollBarGap:!0}),this.dispatchEvent(new CustomEvent("drb-dialog-opened")),this.id&&fe.track("ModalDisplayed",{modal_id:this.id})}close(t){var e;(e=this.dialogRef.value)==null||e.close(t)}lightDismiss(t){var o;const e=t.detail===0;this.preventLightDismiss||this.isDraggingFromDialog||e||(o=this.dialogRef.value)==null||o.close("dismiss")}_onNativeDialogClose(){var t;this.returnValue=(t=this.dialogRef.value)==null?void 0:t.returnValue,this.isOpen=!1,nr(this.dialogRef.value),this.dispatchEvent(new CustomEvent("drb-dialog-closed")),this.id&&fe.track("ModalDismissed",{modal_id:this.id})}render(){return T`
      <dialog
        ${Ve(this.dialogRef)}
        class="dialog ${qt({"dialog--drawer":this.drawer})}"
        @click="${this.lightDismiss}"
        @mouseup="${()=>{Ae(()=>{this.isDraggingFromDialog=!1})}}"
        @close="${this._onNativeDialogClose}"
      >
        <div class="dialog__wrapper" @mousedown="${()=>{this.isDraggingFromDialog=!0}}">
          <button class="dialog__close" @click="${this.close}">
            ${ur(hr)}
          </button>

          <slot></slot>
        </div>
      </dialog>
    `}};G.styles=pt(pr);lt([c({attribute:"mounting",reflect:!0,type:Boolean})],G.prototype,"isMounting",2);lt([c({attribute:"open",reflect:!0,type:Boolean})],G.prototype,"isOpen",2);lt([c({attribute:"prevent-light-dismiss",type:Boolean})],G.prototype,"preventLightDismiss",2);lt([c({type:Boolean})],G.prototype,"drawer",2);lt([c({attribute:!1,type:String})],G.prototype,"returnValue",2);lt([H()],G.prototype,"isDraggingFromDialog",2);G=lt([st("drb-dialog")],G);const gr=`:host{display:contents;position:relative}
`,mr=(t,e=0)=>{if(!t)return;const o=t.getBoundingClientRect();o.top<e&&window.scrollTo({top:window.scrollY+o.top-e,behavior:"smooth"})};var vr=Object.defineProperty,yr=Object.getOwnPropertyDescriptor,W=(t,e,o,r)=>{for(var i=r>1?void 0:r?yr(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&vr(e,o,i),i};let z=class extends nt{constructor(){super(...arguments),this._fetchAbortController=new AbortController,this._sentinelElRef=Me(),this.disabled=!1,this.perPage=10,this.offset=500,this.resultsKey="",this.baseUrl=document.location.toString(),this.page=1,this.fetching=!1,this.hasMore=!0,this.shouldReplaceContent=!1}connectedCallback(){super.connectedCallback()}_fetchNextPage(){this.page++,this._fetchPage(this.page)}async _fetchPage(t){const e=this.baseUrl.startsWith("/")?new URL(window.location.origin+this.baseUrl):new URL(this.baseUrl);e.searchParams.set("page",t.toString()),e.searchParams.set("perPage",this.perPage.toString()),this.fetching=!0;try{const o=await fetch(e.toString(),{method:"GET",headers:{"X-Requested-With":"XMLHttpRequest"},signal:this._fetchAbortController.signal});if(o.status===404){this.hasMore=!1;return}if(!o.ok)throw new Error("Something went wrong");const r=await o.json(),i=this.resultsKey?r[this.resultsKey]:r,s=new DOMParser().parseFromString(i,"text/html");this.shouldReplaceContent?(this.innerHTML=s.body.innerHTML,this.shouldReplaceContent=!1,mr(this.firstElementChild,96)):(Array.from(s.body.children).forEach(l=>{const a=l.getAttribute("data-id");a&&this.querySelector(`[data-id="${a}"]`)&&l.remove()}),this.insertAdjacentHTML("beforeend",s.body.innerHTML))}catch(o){console.error(o)}finally{this.fetching=!1}}_updateSentinelObserver(){this.disabled||this.fetching||!this.hasMore?this._sentinelObserver.unobserve(this._sentinelElRef.value):this._sentinelObserver.observe(this._sentinelElRef.value)}firstUpdated(){this._sentinelObserver=new IntersectionObserver(t=>{t.forEach(e=>{e.intersectionRatio>0&&this._fetchNextPage()})},{rootMargin:`${this.offset}px`})}updated(){this._updateSentinelObserver()}reset(t){this.baseUrl=t||this.baseUrl,this.page=0,this.hasMore=!0,this.fetching=!1,this.disabled=!1,this.shouldReplaceContent=!0,this._fetchAbortController.abort(),this._fetchAbortController=new AbortController,this._fetchNextPage()}render(){const t=!this.hasMore&&this.page===1,e=!this.hasMore&&this.page!==1;return T`
      <slot></slot>

      <slot name="no-results" part="no-results" ?hidden=${!t}>
        No results found
      </slot>

      <slot name="no-more-results" part="no-more-results" ?hidden=${!e}>
        You've reached the end of the list
      </slot>

      <div ${Ve(this._sentinelElRef)}></div>
    `}};z.styles=pt(gr);W([c({type:Boolean})],z.prototype,"disabled",2);W([c({attribute:"per-page",type:Number})],z.prototype,"perPage",2);W([c({type:Number})],z.prototype,"offset",2);W([c({attribute:"results-key",type:String})],z.prototype,"resultsKey",2);W([c({attribute:"base-url",type:String})],z.prototype,"baseUrl",2);W([c({type:Number})],z.prototype,"page",2);W([H()],z.prototype,"fetching",2);W([H()],z.prototype,"hasMore",2);W([H()],z.prototype,"shouldReplaceContent",2);z=W([st("drb-infinite-scroll")],z);const wr=`:host{display:inline-flex}.counter{color:#6e6d7a;color:var(--character-counter-color, #6e6d7a);font-family:IBM Plex Mono,Consolas,Liberation Mono,Menlo,Courier,monospace;font-family:var(--character-counter-font-family, "IBM Plex Mono", Consolas, "Liberation Mono", Menlo, Courier, monospace);font-size:10px;font-size:var(--character-counter-font-size, 10px);font-weight:400;line-height:1}.counter.warning{color:#f5ad05;color:var(--character-counter-warning-color, #f5ad05)}.counter.error{color:#f50505;color:var(--character-counter-error-color, #f50505)}
`;var xr=Object.defineProperty,_r=Object.getOwnPropertyDescriptor,Lt=(t,e,o,r)=>{for(var i=r>1?void 0:r?_r(e,o):e,n=t.length-1,s;n>=0;n--)(s=t[n])&&(i=(r?s(e,o,i):s(i))||i);return r&&i&&xr(e,o,i),i};let it=class extends nt{constructor(){super(...arguments),this.max=80,this.inputErrorClass="error",this.currentLength=0,this.inputElement=null,this._updateCounter=()=>{var t,e,o;this.currentLength=((e=(t=this.inputElement)==null?void 0:t.value)==null?void 0:e.length)||0,(o=this.inputElement)==null||o.classList.toggle(this.inputErrorClass,this.currentLength>this.max)}}connectedCallback(){var t;super.connectedCallback(),this.inputElement=document.getElementById(this.getAttribute("for")),(t=this.inputElement)==null||t.addEventListener("input",this._updateCounter),this._updateCounter()}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.inputElement)==null||t.removeEventListener("input",this._updateCounter)}render(){const t={warning:this.currentLength>this.max*.8,error:this.currentLength>this.max};return T`
      <div class="counter ${qt(t)}">
        ${this.currentLength}/${this.max}
      </div>
    `}};it.styles=pt(wr);Lt([c({type:Number})],it.prototype,"max",2);Lt([c({attribute:"input-error-class",type:String})],it.prototype,"inputErrorClass",2);Lt([H()],it.prototype,"currentLength",2);Lt([H()],it.prototype,"inputElement",2);it=Lt([st("drb-character-counter")],it);document.addEventListener("submit",t=>{if(t.target.closest("form[data-on-submit-update-dom]")){const e=t.target,o=document.querySelector(e.dataset.onSubmitUpdateDom);if(o){t.preventDefault();const r=new FormData(e);fetch(e.action,{method:r.get("_method")||e.method,body:r,headers:{"X-Requested-With":"XMLHttpRequest"}}).then(i=>i.text()).then(i=>{o.outerHTML=i}).catch(i=>{var n;return(n=Dribbble==null?void 0:Dribbble.Notify)==null?void 0:n.error(i)})}}});
//# sourceMappingURL=application-b15f0510.js.map
