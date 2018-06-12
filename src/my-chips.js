if( customElements.get('my-chips') === undefined ) {
    customElements.define('my-chips', class MyChips extends HTMLElement {
        /** list of choices like MD chips
         * @param {string} items value of field from card, |-joined items
         * @param {boolean} removable toadd 'backspace' button
         * @fires select {detail: value|null} when chip clicked
         */
        connectedCallback() {
            this.readonly = this.hasAttribute('readonly');
            this.removable = this.hasAttribute('removable');
            this.items = split_choices(this.getAttribute('items'));

            this._render();
            if( !this.readonly ) {
                this._bind_events();
            }
        }

        shuffle(seed) {
            this.items.shuffle(seed);
            this._render();
            if( !this.readonly ) {
                this._bind_events();
            }
        }

        _render() {
            let l = this.items.map(i => `<li data-value="${i}" ${this.readonly?'':'tabindex="0"'}><label>${i}</label></li>`);
            if( this.removable ) {
                l.push(`<li class="remove" ${this.readonly?'':'tabindex="0"'}><label><i>⌫</i></label></li>`);
            }
            this.innerHTML = `<ul class="md-chips ${this.removable?'removable':''}">${l.join("")}</ul>`;
            this._items = Array.from(this.querySelectorAll('li'));
        }

        _bind_events() {
            this._items.forEach(li => {
                li.addEventListener('click', e => {
                    if( li.classList.contains('remove') ) {
                        this.dispatchEvent(new CustomEvent('select', {detail: null}));
                    } else {
                        this._items.forEach(li=>li.classList.remove('selected'));
                        li.classList.add('selected');
                        this.dispatchEvent(new CustomEvent('select', {detail: li.dataset['value']}));
                    }
                });
            });
        }
    });
}
