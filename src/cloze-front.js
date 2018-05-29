(function(){
    let answer = [];
    Persistence.setItem('answer', answer); // list of cloze insertions

    let the_chips = document.querySelector("my-chips");
    let the_clozes = customElements.get('my-cloze').parse(document.querySelector(".my-clozen"));
    let current_cloze = null, current_idx;

    the_clozes.forEach((cloze, idx) => {
        if( ! the_chips ) {
            cloze.contentEditable = true;
        }
        cloze.addEventListener('focus', ev => {
            current_cloze = cloze;
            current_idx = idx;
            if( the_chips ) show(the_chips);
        });
        cloze.addEventListener('input', ev => {
            answer[idx] = cloze.value;
            Persistence.setItem('answer', answer);
        });
    })

    if( the_chips ) {
        hide(the_chips);
        the_chips.addEventListener('select', ev => {
            if(current_cloze) {
                current_cloze.value = ev.detail;
                if( current_cloze.contentEditable ) { current_cloze.focus(); }
                answer[current_idx] = ev.detail;
                Persistence.setItem('answer', answer);
            }
        });
    }
})();
