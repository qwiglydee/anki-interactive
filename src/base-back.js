(function(){
    let answered = Persistence.getItem('answer') || "";
    let correct = "{{Answer}}";
    let the_input = document.querySelector("my-input");
    if(answered) {
        // sensitive if answered in mixed case
        let case_sens = answered.toLowerCase() !== answered;
        if(!case_sens) {
            answered = answered.toLowerCase();
            correct = correct.toLowerCase();
        }
        the_input.classList.add(answered === correct ? 'correct' : 'missed');
    } else {
        the_input.classList.add('ground');
    }
})();
