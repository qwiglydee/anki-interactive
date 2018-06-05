    function on_input(ev) {
        console.debug("input change", ev, ev.detail, " = ", the_input.value);
    };

    function on_chip_select(ev) {
        console.debug("chip select", ev, ev.detail);
    }

    function on_chip_remove(ev) {
        console.debug("chip remove", ev, ev.detail);
    }

    function on_choice_change(ev) {
        console.debug("choices change", ev, ev.detail);
    }

    var the_input = document.querySelector('my-input');

    var the_choices = document.querySelector('my-choices');
    the_choices.items[1].classList.add('correct');
    the_choices.items[1].classList.add('selected');
    the_choices.items[2].classList.add('missed');
    the_choices.items[2].classList.add('selected');
    the_choices.items[3].classList.add('disabled');


    var the_clozes = customElements.get('my-cloze').parse(document.querySelector(".my-clozen"), {placeholder: "???"});

    the_clozes.forEach(e => {
        if( e.value ) { // ground/correct/missed
            e.classList.add(e.value);
        }
        e.addEventListener('focus', ev => {
            console.debug("cloze focus", ev, ev.target);
        })
        e.addEventListener('input', ev => {
            console.debug("cloze change", ev, ev.detail, " = ", ev.target.value);
        })
    })
