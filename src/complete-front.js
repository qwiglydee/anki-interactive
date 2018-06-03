(function(){
    let answer = [];
    Persistence.setItem('answer', answer); // list of cloze insertions

    let the_choices = document.querySelector("my-choices");
    let the_clozes = customElements.get('my-cloze').parse(document.querySelector(".my-clozen"), {placeholder: "……"});
    let current_cloze = null, current_idx;

    hide(the_choices);

    let autofocus_delay;
    function focus_cloze(cloze, idx) {
        // sticky focus
        if( autofocus_delay ) window.clearTimeout(autofocus_delay);
        if( cloze !== undefined ) {
            current_cloze = cloze;
            current_idx = idx;
            show(the_choices);
        }
        autofocus_delay = window.setTimeout(function() {
            current_cloze.focus();
            if( current_cloze.contentEditable ) placeCaretAtEnd(current_cloze);
            autofocus_delay = undefined;
        }, 100);
    }
    function blur_cloze() {
        // delayed blur, overriden by autofocus
        if( autofocus_delay ) return;
        autofocus_delay = window.setTimeout(function() {
            current_cloze = undefined;
            current_idx = undefined;
            hide(the_choices);
            autofocus_delay = undefined;
        }, 150);
    }



    the_clozes.forEach((cloze, idx) => {
        cloze.addEventListener('focus', ev => {
            focus_cloze(cloze, idx);
        });
        cloze.addEventListener('blur', ev => {
            blur_cloze();
        });
    })

    the_choices.addEventListener('change', ev => {
        if(current_cloze) {
            let val = ev.detail[0];
            current_cloze.value = val;
            answer[current_idx] = val;
            Persistence.setItem('answer', answer);
            focus_cloze();
        }
    });

})();
