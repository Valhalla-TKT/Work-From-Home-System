import{v as S,i as L,c as D,f as F,b as T,S as R,_ as l,e as g,n as m,w as q,a as z,L as P,y as v,z as y,x as b,d as N,o as w}from"./chunk.WLV3FVBR-84c5c805.js";var $=class{constructor(e,...t){this.slotNames=[],this.handleSlotChange=o=>{const i=o.target;(this.slotNames.includes("[default]")&&!i.name||i.name&&this.slotNames.includes(i.name))&&this.host.requestUpdate()},(this.host=e).addController(this),this.slotNames=t}hasDefaultSlot(){return[...this.host.childNodes].some(e=>{if(e.nodeType===e.TEXT_NODE&&e.textContent.trim()!=="")return!0;if(e.nodeType===e.ELEMENT_NODE){const t=e;if(t.tagName.toLowerCase()==="sl-visually-hidden")return!1;if(!t.hasAttribute("slot"))return!0}return!1})}hasNamedSlot(e){return this.host.querySelector(`:scope > [slot="${e}"]`)!==null}test(e){return e==="[default]"?this.hasDefaultSlot():this.hasNamedSlot(e)}hostConnected(){this.host.shadowRoot.addEventListener("slotchange",this.handleSlotChange)}hostDisconnected(){this.host.shadowRoot.removeEventListener("slotchange",this.handleSlotChange)}};function K(e){return!!(e.offsetParent||e.offsetWidth||e.offsetHeight||e.getClientRects().length)}function O(e){const t=e.tagName.toLowerCase();return e.getAttribute("tabindex")==="-1"||e.hasAttribute("disabled")||t==="input"&&e.getAttribute("type")==="radio"&&!e.hasAttribute("checked")||!K(e)||window.getComputedStyle(e).visibility==="hidden"?!1:(t==="audio"||t==="video")&&e.hasAttribute("controls")||e.hasAttribute("tabindex")||e.hasAttribute("contenteditable")&&e.getAttribute("contenteditable")!=="false"?!0:["button","input","select","textarea","a","audio","video","summary"].includes(t)}function _(e){const t=[];function o(i){if(i instanceof Element){if(i.hasAttribute("inert"))return;!t.includes(i)&&O(i)&&t.push(i);const a=r=>{var s;return((s=r.getRootNode({composed:!0}))==null?void 0:s.host)!==e};i instanceof HTMLSlotElement&&a(i)&&i.assignedElements({flatten:!0}).forEach(r=>{o(r)}),i.shadowRoot!==null&&i.shadowRoot.mode==="open"&&o(i.shadowRoot)}[...i.children].forEach(a=>o(a))}return o(e),t.sort((i,a)=>{const r=Number(i.getAttribute("tabindex"))||0;return(Number(a.getAttribute("tabindex"))||0)-r})}function*A(e=document.activeElement){e!=null&&(yield e,"shadowRoot"in e&&e.shadowRoot&&e.shadowRoot.mode!=="closed"&&(yield*S(A(e.shadowRoot.activeElement))))}function H(){return[...A()].pop()}var d=[],I=class{constructor(e){this.tabDirection="forward",this.handleFocusIn=()=>{this.isActive()&&this.checkFocus()},this.handleKeyDown=t=>{var o,i;if(t.key!=="Tab"||this.isExternalActivated||!this.isActive())return;t.shiftKey?this.tabDirection="backward":this.tabDirection="forward",t.preventDefault();const a=_(this.element),r=H();let s=a.findIndex(C=>C===r);if(s===-1){this.currentFocus=a[0],(o=this.currentFocus)==null||o.focus({preventScroll:!0});return}const p=this.tabDirection==="forward"?1:-1;s+p>=a.length?s=0:s+p<0?s=a.length-1:s+=p,this.currentFocus=a[s],(i=this.currentFocus)==null||i.focus({preventScroll:!0}),setTimeout(()=>this.checkFocus())},this.handleKeyUp=()=>{this.tabDirection="forward"},this.element=e}activate(){d.push(this.element),document.addEventListener("focusin",this.handleFocusIn),document.addEventListener("keydown",this.handleKeyDown),document.addEventListener("keyup",this.handleKeyUp)}deactivate(){d=d.filter(e=>e!==this.element),this.currentFocus=null,document.removeEventListener("focusin",this.handleFocusIn),document.removeEventListener("keydown",this.handleKeyDown),document.removeEventListener("keyup",this.handleKeyUp)}isActive(){return d[d.length-1]===this.element}activateExternal(){this.isExternalActivated=!0}deactivateExternal(){this.isExternalActivated=!1}checkFocus(){if(this.isActive()&&!this.isExternalActivated){const e=_(this.element);if(!this.element.matches(":focus-within")){const t=e[0],o=e[e.length-1],i=this.tabDirection==="forward"?t:o;typeof(i==null?void 0:i.focus)=="function"&&(this.currentFocus=i,i.focus({preventScroll:!0}))}}}},M=L`
  ${D}

  :host {
    --width: 31rem;
    --header-spacing: var(--sl-spacing-large);
    --body-spacing: var(--sl-spacing-large);
    --footer-spacing: var(--sl-spacing-large);

    display: contents;
  }

  .dialog {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: var(--sl-z-index-dialog);
  }

  .dialog__panel {
    display: flex;
    flex-direction: column;
    z-index: 2;
    width: var(--width);
    max-width: calc(100% - var(--sl-spacing-2x-large));
    max-height: calc(100% - var(--sl-spacing-2x-large));
    background-color: var(--sl-panel-background-color);
    border-radius: var(--sl-border-radius-medium);
    box-shadow: var(--sl-shadow-x-large);
  }

  .dialog__panel:focus {
    outline: none;
  }

  /* Ensure there's enough vertical padding for phones that don't update vh when chrome appears (e.g. iPhone) */
  @media screen and (max-width: 420px) {
    .dialog__panel {
      max-height: 80vh;
    }
  }

  .dialog--open .dialog__panel {
    display: flex;
    opacity: 1;
  }

  .dialog__header {
    flex: 0 0 auto;
    display: flex;
  }

  .dialog__title {
    flex: 1 1 auto;
    font: inherit;
    font-size: var(--sl-font-size-large);
    line-height: var(--sl-line-height-dense);
    padding: var(--header-spacing);
    margin: 0;
  }

  .dialog__header-actions {
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: end;
    gap: var(--sl-spacing-2x-small);
    padding: 0 var(--header-spacing);
  }

  .dialog__header-actions sl-icon-button,
  .dialog__header-actions ::slotted(sl-icon-button) {
    flex: 0 0 auto;
    display: flex;
    align-items: center;
    font-size: var(--sl-font-size-medium);
  }

  .dialog__body {
    flex: 1 1 auto;
    display: block;
    padding: var(--body-spacing);
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  .dialog__footer {
    flex: 0 0 auto;
    text-align: right;
    padding: var(--footer-spacing);
  }

  .dialog__footer ::slotted(sl-button:not(:first-of-type)) {
    margin-inline-start: var(--sl-spacing-x-small);
  }

  .dialog:not(.dialog--has-footer) .dialog__footer {
    display: none;
  }

  .dialog__overlay {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: var(--sl-overlay-background-color);
  }

  @media (forced-colors: active) {
    .dialog__panel {
      border: solid 1px var(--sl-color-neutral-0);
    }
  }
`,E=new Map,U=new WeakMap;function B(e){return e??{keyframes:[],options:{duration:0}}}function x(e,t){return t.toLowerCase()==="rtl"?{keyframes:e.rtlKeyframes||e.keyframes,options:e.options}:e}function u(e,t){E.set(e,B(t))}function c(e,t,o){const i=U.get(e);if(i!=null&&i[t])return x(i[t],o.dir);const a=E.get(t);return a?x(a,o.dir):{keyframes:[],options:{duration:0}}}function k(e,t){return new Promise(o=>{function i(a){a.target===e&&(e.removeEventListener(t,i),o())}e.addEventListener(t,i)})}function h(e,t,o){return new Promise(i=>{if((o==null?void 0:o.duration)===1/0)throw new Error("Promise-based animations must be finite.");const a=e.animate(t,F(T({},o),{duration:j()?0:o.duration}));a.addEventListener("cancel",i,{once:!0}),a.addEventListener("finish",i,{once:!0})})}function j(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function f(e){return Promise.all(e.getAnimations().map(t=>new Promise(o=>{const i=requestAnimationFrame(o);t.addEventListener("cancel",()=>i,{once:!0}),t.addEventListener("finish",()=>i,{once:!0}),t.cancel()})))}var n=class extends z{constructor(){super(...arguments),this.hasSlotController=new $(this,"footer"),this.localize=new P(this),this.modal=new I(this),this.open=!1,this.label="",this.noHeader=!1,this.handleDocumentKeyDown=e=>{e.key==="Escape"&&this.modal.isActive()&&this.open&&(e.stopPropagation(),this.requestClose("keyboard"))}}firstUpdated(){this.dialog.hidden=!this.open,this.open&&(this.addOpenListeners(),this.modal.activate(),v(this))}disconnectedCallback(){super.disconnectedCallback(),this.modal.deactivate(),y(this)}requestClose(e){if(this.emit("sl-request-close",{cancelable:!0,detail:{source:e}}).defaultPrevented){const o=c(this,"dialog.denyClose",{dir:this.localize.dir()});h(this.panel,o.keyframes,o.options);return}this.hide()}addOpenListeners(){document.addEventListener("keydown",this.handleDocumentKeyDown)}removeOpenListeners(){document.removeEventListener("keydown",this.handleDocumentKeyDown)}async handleOpenChange(){if(this.open){this.emit("sl-show"),this.addOpenListeners(),this.originalTrigger=document.activeElement,this.modal.activate(),v(this);const e=this.querySelector("[autofocus]");e&&e.removeAttribute("autofocus"),await Promise.all([f(this.dialog),f(this.overlay)]),this.dialog.hidden=!1,requestAnimationFrame(()=>{this.emit("sl-initial-focus",{cancelable:!0}).defaultPrevented||(e?e.focus({preventScroll:!0}):this.panel.focus({preventScroll:!0})),e&&e.setAttribute("autofocus","")});const t=c(this,"dialog.show",{dir:this.localize.dir()}),o=c(this,"dialog.overlay.show",{dir:this.localize.dir()});await Promise.all([h(this.panel,t.keyframes,t.options),h(this.overlay,o.keyframes,o.options)]),this.emit("sl-after-show")}else{this.emit("sl-hide"),this.removeOpenListeners(),this.modal.deactivate(),await Promise.all([f(this.dialog),f(this.overlay)]);const e=c(this,"dialog.hide",{dir:this.localize.dir()}),t=c(this,"dialog.overlay.hide",{dir:this.localize.dir()});await Promise.all([h(this.overlay,t.keyframes,t.options).then(()=>{this.overlay.hidden=!0}),h(this.panel,e.keyframes,e.options).then(()=>{this.panel.hidden=!0})]),this.dialog.hidden=!0,this.overlay.hidden=!1,this.panel.hidden=!1,y(this);const o=this.originalTrigger;typeof(o==null?void 0:o.focus)=="function"&&setTimeout(()=>o.focus()),this.emit("sl-after-hide")}}async show(){if(!this.open)return this.open=!0,k(this,"sl-after-show")}async hide(){if(this.open)return this.open=!1,k(this,"sl-after-hide")}render(){return b`
      <div
        part="base"
        class=${N({dialog:!0,"dialog--open":this.open,"dialog--has-footer":this.hasSlotController.test("footer")})}
      >
        <div part="overlay" class="dialog__overlay" @click=${()=>this.requestClose("overlay")} tabindex="-1"></div>

        <div
          part="panel"
          class="dialog__panel"
          role="dialog"
          aria-modal="true"
          aria-hidden=${this.open?"false":"true"}
          aria-label=${w(this.noHeader?this.label:void 0)}
          aria-labelledby=${w(this.noHeader?void 0:"title")}
          tabindex="-1"
        >
          ${this.noHeader?"":b`
                <header part="header" class="dialog__header">
                  <h2 part="title" class="dialog__title" id="title">
                    <slot name="label"> ${this.label.length>0?this.label:String.fromCharCode(65279)} </slot>
                  </h2>
                  <div part="header-actions" class="dialog__header-actions">
                    <slot name="header-actions"></slot>
                    <sl-icon-button
                      part="close-button"
                      exportparts="base:close-button__base"
                      class="dialog__close"
                      name="x-lg"
                      label=${this.localize.term("close")}
                      library="system"
                      @click="${()=>this.requestClose("close-button")}"
                    ></sl-icon-button>
                  </div>
                </header>
              `}
          ${""}
          <slot part="body" class="dialog__body" tabindex="-1"></slot>

          <footer part="footer" class="dialog__footer">
            <slot name="footer"></slot>
          </footer>
        </div>
      </div>
    `}};n.styles=M;n.dependencies={"sl-icon-button":R};l([g(".dialog")],n.prototype,"dialog",2);l([g(".dialog__panel")],n.prototype,"panel",2);l([g(".dialog__overlay")],n.prototype,"overlay",2);l([m({type:Boolean,reflect:!0})],n.prototype,"open",2);l([m({reflect:!0})],n.prototype,"label",2);l([m({attribute:"no-header",type:Boolean,reflect:!0})],n.prototype,"noHeader",2);l([q("open",{waitUntilFirstUpdate:!0})],n.prototype,"handleOpenChange",1);u("dialog.show",{keyframes:[{opacity:0,scale:.8},{opacity:1,scale:1}],options:{duration:250,easing:"ease"}});u("dialog.hide",{keyframes:[{opacity:1,scale:1},{opacity:0,scale:.8}],options:{duration:250,easing:"ease"}});u("dialog.denyClose",{keyframes:[{scale:1},{scale:1.02},{scale:1}],options:{duration:250}});u("dialog.overlay.show",{keyframes:[{opacity:0},{opacity:1}],options:{duration:250}});u("dialog.overlay.hide",{keyframes:[{opacity:1},{opacity:0}],options:{duration:250}});n.define("sl-dialog");const V=e=>{requestAnimationFrame(()=>{requestAnimationFrame(()=>{e()})})},X=e=>Promise.allSettled(e.getAnimations().map(t=>t.finished));document.addEventListener("click",e=>{e.target.closest("[data-sl-dialog-show]")&&document.querySelector(`sl-dialog#${e.target.dataset.slDialogShow}`).show(),e.target.closest("[data-sl-dialog-hide]")&&e.target.closest("sl-dialog").hide()});export{$ as H,X as a,V as o};
//# sourceMappingURL=sl-dialog-show-6ea02fac.js.map
