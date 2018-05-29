(function(){
    let answered = Persistence.getItem('answer') || "";
    let correct = "{{Answer}}";
    let the_input = document.querySelector("my-input");

    let case_sens = answered != answered.toLowerCase();

    function compare() {
        if( ! answered ) return 'ground';
        let ans = answered, tru = correct;
        if(!case_sens) {
            ans = answered.toLowerCase();
            tru = correct.toLowerCase();
        }
        if( ans !== tru ) return 'missed';
        return 'correct'
    }

    the_input.classList.add(compare());

    the_input.addEventListener('click', ev => {
        if( the_input.classList.contains('answered') ) {
            the_input.value = correct;
            the_input.classList.remove('answered');
            the_input.classList.add(compare());
        } else if ( answered ) {
            the_input.value = answered;
            the_input.classList.remove('ground', 'correct', 'missed');
            the_input.classList.add('answered');
        }
    });
})();
