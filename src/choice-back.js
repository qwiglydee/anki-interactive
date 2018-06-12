(function(){
    let the_choices = document.querySelector("my-choices");
    the_choices.shuffle(Persistence.getItem('seed') || new Date().valueOf());

    let answered = Persistence.getItem('answer') || []; // list of selected choices

    let items = split_choices("{{Choices}}"),
        items_p = items.filter((i) => i[0] == '+').map((i)=>i.replace(/^\+\s*/, '')),
        items_m = items.filter((i) => i[0] == '-').map((i)=>i.replace(/^\-\s*/, ''));
    let correct = items_p.length ? items_p : items_m;

    the_choices.items.forEach(li => {
        let val = li.dataset['value'];
        if(correct.indexOf(val) === -1) { // incorrect
            li.classList.add('disabled');
        } else { // correct
            li.classList.add('selected');
            if(answered.length) {
                li.classList.add(answered.indexOf(val) >= 0 ? 'correct' : 'missed');
            } else {
                li.classList.add('ground');
            }
        }
    });
})();
