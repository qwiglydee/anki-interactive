(function(){
    let answered = Persistence.getItem('answer') || []; // list of cloze insertions

    let the_clozen = customElements.get('my-cloze').parse(document.querySelector(".my-clozen"));
    the_clozen.forEach(cloze => {cloze.contentEditable = false; });

    let correct = the_clozen.map(cloze => cloze.value).map(val => val ? val.splitrim('/') : []);
    let case_sens = answered && answered.filter((e) => e && e.toLowerCase() !== e).length > 0;

    function compare(idx) {
        if( answered.length == 0 ) return 'ground';
        let ans = answered[idx], tru = correct[idx];
        if( !ans ) return 'missed';
        if (!case_sens) {
            ans = ans.toLowerCase();
            tru = tru.map((e) => e.toLowerCase());
        }
        if( tru.indexOf(ans) === -1 ) return 'missed';
        return 'correct';
    }

    the_clozen.forEach((cloze, idx) => {
        cloze.classList.add(compare(idx));

        cloze.addEventListener('click', ev => {
            if( cloze.classList.contains('answered') ) {
                cloze.value = correct[idx].join(" / ");
                cloze.classList.remove('answered');
                cloze.classList.add(compare(idx));
            } else if ( answered[idx] ) {
                cloze.value = answered[idx];
                cloze.classList.remove('ground', 'correct', 'missed');
                cloze.classList.add('answered');
            }
        });
    });
})();
