(function(){
    let answer = [];
    Persistence.setItem('answer', answer); // list of cloze insertions

    let the_chips = document.querySelector("my-chips");
    the_chips.shuffle();

    let the_clozen = clozify(document.querySelector(".my-clozen"), {placeholder: "… … …"}),
        current = null;

    hide(the_chips);

    the_clozen.addEventListener('focus', ev => {
        current = ev.detail;
        show(the_chips);
    });

    the_clozen.addEventListener('blur', ev => {
        current = null;
        hide(the_chips);
    });

    the_chips.addEventListener('select', ev => {
        if( current ) {
            let ans = answer[current.idx];
            ans = ans ? ans.split("\t") : [];

            if( ev.detail ) {
                ans.push(ev.detail);
            } else if( ans.length ) {
                ans.pop();
            }

            update_cloze(current.cloze, ans);
            current.cloze.focus();
            answer[current.idx] = ans.join("\t");
            Persistence.setItem('answer', answer);
        }
    });

    function update_cloze(cloze, words) {
        if( words.length ) {
            cloze.value = words.join("\u0009") + "…";
        } else {
            cloze.value = null;
        }
    }
})();
