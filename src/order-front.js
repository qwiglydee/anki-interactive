(function(){
    let answer = [];
    Persistence.setItem('answer', answer); // list of cloze insertions

    let the_chips = document.querySelector("my-chips");
    let the_clozes = customElements.get('my-cloze').parse(document.querySelector(".my-clozen"));
    let current_cloze = null, current_idx;

    the_clozes.forEach((cloze, idx) => {
        cloze.addEventListener('focus', ev => {
            current_cloze = cloze;
            current_idx = idx;
        });
    });

    the_chips.addEventListener('select', ev => {
        if( current_cloze ) {
            let ans = current_cloze.value;
            ans = ans ? ans.split(' ') : [];

            if( ev.detail ) {
                ans.push(ev.detail);
            } else if( ans.length ) {
                ans.pop();
            }

            ans = ans.join(' ');
            current_cloze.value = ans;
            answer[current_idx] = ans;
            Persistence.setItem('answer', answer);
        }
    });
})();
