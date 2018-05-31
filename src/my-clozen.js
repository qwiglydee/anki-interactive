if( customElements.get('my-cloze') === undefined ) {
    customElements.define('my-cloze', class MyCloze extends HTMLElement {
        /** single cloze deletion
         * @param {string} placholder -- text to show when empty
         * @param {boolean} editable -- enable to edit
         * @param {string} fill -- text to place when editing empty
         * @fires input (standard, if editable)
         */
         connectedCallback() {
            this.tabIndex = "1";
            this.setAttribute('placeholder', this.getAttribute('placeholder') || "...")
            this.fill = this.getAttribute('fill');
            this._bind_events();
         }

         _bind_events() {
            this.addEventListener('focus', e => {
                if( !this.value && this.fill ) this.value = this.fill;
            });
            this.addEventListener('input', e => {
                let val = this.textContent;
                this.classList.toggle("contracted", val[0] === "'" || val[0] === "’");
            });
         }

         get value() {
            return this.textContent;
         }

         set value(val) {
            this.textContent = val;
            this.classList.toggle("contracted", val[0] === "'" || val[0] === "’");
         }

         static parse(element) {
            /* parse anki-generated text and replace with my-cloze elements */
            let clozen = [];
            Array.from(element.childNodes).forEach(child => {
                if( child.tagName === 'SPAN' && child.classList.contains('cloze') ) {
                    let cloze = document.createElement("my-cloze");
                    let text = child.textContent;
                    if (text[0] === '[') { // front side hints
                        text = text.substr(1, text.length - 2);
                        if ( text && text !== '...') { // non default hint
                            if (text[0] === '~') { // editable cloze
                                text = text.substr(1).trim();
                                cloze.contentEditable = true;
                                cloze.setAttribute('fill', text);
                            }
                            cloze.setAttribute('placeholder', text);
                        }
                    } else { // back side answers
                        cloze.value = text;
                    }
                    element.replaceChild(cloze, child);
                    clozen.push(cloze);
                }
            });
            return clozen;
         }
    });
}
