(function(){
    let answer = [];
    Persistence.setItem('answer', answer); // list of cloze insertions

    let the_chips = document.querySelector("my-chips");
    let the_clozen = clozify(document.querySelector(".my-clozen"), {editable: !the_chips}),
        current = null;

    the_clozen.addEventListener('focus', ev => {
        current = ev.detail;
        if( the_chips ) show(the_chips);
    });

    the_clozen.addEventListener('blur', ev => {
        current = null;
        if( the_chips ) hide(the_chips);
    });

    the_clozen.addEventListener('input', ev => {
        answer[current.idx] = ev.detail;
        Persistence.setItem('answer', answer);
    })

    if( the_chips ) {
        hide(the_chips);

        the_chips.addEventListener('select', ev => {
            if(current) {
                current.cloze.value = ev.detail;
                current.cloze.focus();
                answer[current.idx] = ev.detail;
                Persistence.setItem('answer', answer);
            }
        });
    }

})();
