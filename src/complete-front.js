(function(){
    let answer = [];
    Persistence.setItem('answer', answer); // list of cloze insertions

    let the_choices = document.querySelector("my-choices");
    let the_clozes = customElements.get('my-cloze').parse(document.querySelector(".my-clozen"));
    let current_cloze = null, current_idx;

    the_clozes.forEach((cloze, idx) => {
        cloze.addEventListener('focus', ev => {
            current_cloze = cloze;
            current_idx = idx;
        });
    })

    the_choices.addEventListener('change', ev => {
        if(current_cloze) {
            let val = ev.detail[0];
            current_cloze.value = val;
            answer[current_idx] = val;
            Persistence.setItem('answer', answer);
        }
    });

})();
