if( customElements.get('my-input') === undefined ) {
    customElements.define('my-input', class MyInput extends HTMLElement {
        /** Wrapper around input to make it like MD text field box
         * @prop placholder -- to pass to input
         */
        connectedCallback() {
            this.readonly = this.hasAttribute('readonly');
            this.placeholder = this.getAttribute('placeholder') || "…";

            this._render();
            this.value = (this.getAttribute('value') || "").trim();

            if(!this.readonly) {
                this._bind_events();
            }
        }

        _render() {
            this.innerHTML = `<div class="md-textbox"><input type="text" placeholder="${this.placeholder}" ${this.readonly?"readonly":""}><hr></div>`;
            this._input = this.querySelector('input');
        }

        _bind_events() {
            this._input.addEventListener('focus', e => {
                this.classList.add('focus');
            });
            this._input.addEventListener('blur', e => {
                this.classList.remove('focus');
            });
        }

        get value() {
            return this._input.value.trim();
        }

        set value(val) {
            this._input.value = val;
        }
    });
}