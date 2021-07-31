if( customElements.get('my-cloze') === undefined ) {
    customElements.define('my-cloze', class MyCloze extends HTMLElement {
        /** single cloze deletion
         * @param textContent -> value
         * @param {string} placholder
         * @param {string} fill -- initial value for editable
         * @fires input (standard, if editable)
         */
         connectedCallback() {
            this.tabIndex = "1";
            if( !this.getAttribute('placeholder') ) this.setAttribute('placeholder', "…")
            this.fill = this.getAttribute('fill');
            this._bind_events();
            this._contracted(this.textContent);
         }

         _bind_events() {
            this.addEventListener('focus', e => {
                if( !this.value && this.fill ) this.value = this.fill;
            });
            this.addEventListener('keypress', e => {
                if( e.key === 'Enter') {
                    e.preventDefault();
                }
            });
            this.addEventListener('input', e => {
                this._contracted(this.textContent);
            });
         }

         get value() {
            return this.textContent.trim();
         }

         set value(val) {
            this.textContent = val;
            this._contracted(val);
         }

         _contracted(val) {
            this.classList.toggle("contracted", val && (val[0] === "'" || val[0] === "’"));
         }
    });
}

function clozify(root, params) {
    /** wraper for anki-generated cloze-content.
     * replaces spans with my-cloze elements, tracks focused cloze with delayed blur.
     *
     * @param {Element} root
     * @param {placeholder: String, editable: boolean} params
     *
     * @property {Array[MyCloze]} items
     *
     * @fires focus { detail: my-cloze }
     * @fires blur when a cloze is blured and not refocused within 100ms
     * @fires input { detail: my-cloze.value }
     *
     */
    if(!params) params = {};
    root.items = [];
    Array.from(root.childNodes).forEach(child => {
        // <span class="cloze">[text]</span> -> <my-cloze placeholder="text"></my-close>
        // <span class="cloze">[~text]</span> -> <my-cloze placeholder="text" fill="text" contenteditable></my-close>
        // <span class="cloze">[~]</span> -> <my-cloze contenteditable></my-close>
        // <span class="cloze">text</span> -> <my-cloze>text</my-close>
        if( child.tagName === 'SPAN' && child.classList.contains('cloze') ) {
            let cloze = document.createElement("my-cloze");
            if( params.placeholder ) cloze.setAttribute('placeholder', params.placeholder);
            if( params.editable ) cloze.contentEditable = true;
            let text = child.textContent;
            if (text[0] === '[') { // front side hints
                text = text.substr(1, text.length - 2);
                if (text[0] === '~') { // editable cloze
                    text = text.substr(1).trim();
                    cloze.contentEditable = true;
                    if( text ) cloze.setAttribute('fill', text);
                }
                if ( text && text !== '...') { // placeholder/prefill
                    cloze.setAttribute('placeholder', text);
                }
            } else { // back side answers
                // using setter to check 'contracted' class
                cloze.value = text;
            }
            root.replaceChild(cloze, child);
            root.items.push(cloze);
        }
    });

    let current = null;

    let blur_delay = null;
    root.items.forEach((cloze, idx) => {
        cloze.addEventListener('focus', ev => {
            if( blur_delay ) window.clearTimeout(blur_delay);
            blur_delay = undefined;

            cloze.classList.add('focus');
            if( cloze.contentEditable ) placeCaretAtEnd(cloze);

            if( cloze !== root.current ) {
                if( root.current ) {
                    root.current.classList.remove('focus');
                }
                root.current = cloze;
                root.dispatchEvent(new CustomEvent('focus', {detail: { cloze: cloze, idx: idx}}));
            }
        });

        cloze.addEventListener('blur', ev => {
            if( blur_delay ) return;
            blur_delay = window.setTimeout(() => {
                if( root.current ) {
                    root.current.classList.remove('focus');
                }
                root.current = undefined;
                root.current_idx = undefined;
                blur_delay = undefined;

                root.dispatchEvent(new CustomEvent('blur'));
            }, 150);
        });

        cloze.addEventListener('input', ev => {
            ev.stopPropagation();
            root.dispatchEvent(new CustomEvent('input', {detail: cloze.value}));
        });
    });

    return root;
}
