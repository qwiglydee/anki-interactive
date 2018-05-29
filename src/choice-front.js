(function(){
    let the_choices = document.querySelector("my-choices");
    Persistence.setItem('answer', []); // list of selected choices
    the_choices.addEventListener('change', ev => {
        Persistence.setItem('answer', ev.detail);
    });
})();
