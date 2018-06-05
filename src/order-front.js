(function(){
    let answer = [];
    Persistence.setItem('answer', answer); // list of cloze insertions

    let the_chips = document.querySelector("my-chips");
    let the_clozes = customElements.get('my-cloze').parse(document.querySelector(".my-clozen"), {placeholder: "… … …"});
    let current_cloze, current_idx;

    hide(the_chips);

    function update_cloze(cloze, words) {
        if( words.length ) {
            cloze.value = "…" + words.join("\u0009") + "…";
        } else {
            cloze.value = null;
        }
    }

    let autofocus_delay;
    function focus_cloze(cloze, idx) {
        // sticky focus
        if( autofocus_delay ) window.clearTimeout(autofocus_delay);
        if( cloze !== undefined ) {
            if( current_cloze ) {
                current_cloze.classList.remove('focus');
            }
            current_cloze = cloze;
            current_idx = idx;
            current_cloze.classList.add('focus');
            show(the_chips);
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
            if( current_cloze ) {
                current_cloze.classList.remove('focus');
            }
            current_cloze = undefined;
            current_idx = undefined;
            hide(the_chips);
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
    });

    the_chips.addEventListener('select', ev => {
        if( current_cloze ) {
            let ans = answer[current_idx];
            ans = ans ? ans.split("\t") : [];

            if( ev.detail ) {
                ans.push(ev.detail);
            } else if( ans.length ) {
                ans.pop();
            }

            update_cloze(current_cloze, ans);
            answer[current_idx] = ans.join("\t");
            Persistence.setItem('answer', answer);
            focus_cloze();
        }
    });
})();
