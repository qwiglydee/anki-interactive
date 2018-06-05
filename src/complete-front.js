(function(){
    let answer = [];
    Persistence.setItem('answer', answer); // list of cloze insertions

    let the_choices = document.querySelector("my-choices");
    the_choices.shuffle();

    let the_clozen = clozify(document.querySelector(".my-clozen"), {placeholder: "… … …"}),
        current = null;

    hide(the_choices);

    the_clozen.addEventListener('focus', ev => {
        current = ev.detail;
        show(the_choices);
    });

    the_clozen.addEventListener('blur', ev => {
        current = null;
        hide(the_choices);
    });

    the_choices.addEventListener('change', ev => {
        if(current) {
            let val = ev.detail[0];
            current.cloze.value = val;
            current.cloze.focus();
            answer[current.idx] = val;
            Persistence.setItem('answer', answer);
        }
    });

})();
