(function(){
    Persistence.setItem('answer', null);
    let the_input = document.querySelector("my-input");
    the_input.addEventListener('input', e=>{
        Persistence.setItem('answer', the_input.value);
    })
})();
