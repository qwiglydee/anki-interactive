    var the_clozen = clozify(document.querySelector(".my-clozen")); //, {placeholder: "???"});
    var cur_cloze = null;

//    the_clozen.items.forEach(cloze => {
//        if( cloze.value ) { // ground/correct/missed
//            cloze.classList.add(cloze.value);
//        }
//    });

    function on_cloze_focus(ev) {
        console.debug("cloze focus", ev, ev.detail);
        cur_cloze = ev.detail;
    }

    function on_cloze_blur(ev) {
        console.debug("cloze blur", ev, ev.detail);
        cur_cloze = null;
    }

    function on_cloze_input(ev) {
        console.debug("cloze change", ev, ev.detail);
    }

    function on_input(ev) {
        console.debug("input change", ev, ev.detail, " = ", the_input.value);
    };

    function on_chip_select(ev) {
        console.debug("chip select", ev, ev.detail);
        if( cur_cloze ) {
            cur_cloze.cloze.value = ev.detail;
            cur_cloze.cloze.focus();
        }
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


