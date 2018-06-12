if( customElements.get('my-choices') === undefined ) {
    customElements.define('my-choices', class MyChoices extends HTMLElement {
        /** list of choices like MD list/items with controls
         * @param {string} items value of field from card, |-joined items, +/- are stripped
         * @param {string} type of control 'radio' or 'checkbox'
         * @fires change {detail: [values]} when items are reselected
         */
        connectedCallback() {
            this.readonly = this.hasAttribute('readonly');
            this.type = this.getAttribute('type') || 'checkbox';
            this.choices = split_choices(this.getAttribute('items')).map((i)=>i.replace(/^[\+\-]\s*/, ''));

            this._render();
            if( !this.readonly ) {
                this._bind_events();
            }
        }

        shuffle(seed) {
            this.choices.shuffle(seed);
            this._render();
            if( !this.readonly ) {
                this._bind_events();
            }
        }

        _render() {
            let l = this.choices.map(i =>
                `<li data-value="${i}" ${this.readonly?'':'tabindex="0"'}><div class="md-control md-${this.type}"><div class="md-control__outline"><div class="md-control__inline"></div></div></div><label>${i}</label></li>`
            );
            this.innerHTML = `<ul class="md-list">${l.join("")}</ul>`;
            this.items = Array.from(this.querySelectorAll('li'));
        }

        _bind_events() {
            this.items.forEach(li => {
                li.addEventListener('click', e => {
                    if( li.classList.contains('selected') ) {
                        li.classList.remove('selected');
                    } else {
                        if( this.type === 'radio') {
                            this.items.forEach(li => li.classList.remove('selected'));
                        }
                        li.classList.add('selected');
                    }
                    this.dispatchEvent(new CustomEvent('change', {detail: this.value}));
                });
            });
        }

        get value() {
            return this.items.filter(i => i.classList.contains('selected')).map(i => i.dataset['value']);
        }
    });
}
