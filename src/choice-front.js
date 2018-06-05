(function(){
    let the_choices = document.querySelector("my-choices");
    let seed = new Date().valueOf();
    Persistence.setItem('seed', seed);
    the_choices.shuffle(seed);

    Persistence.setItem('answer', []); // list of selected choices
    the_choices.addEventListener('change', ev => {
        Persistence.setItem('answer', ev.detail);
    });
})();
