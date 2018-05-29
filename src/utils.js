if(!Persistence.isAvailable()) {
    /* dumb implementaion */
    window.Persistence = {
        isAvailable: function() { return false; },
        clear: function(){},
        getItem: function(){},
        setItem: function(){},
        removeItem: function(){}
    };
}

function rng(seed) {
    /* creating random generator with persistent seed */
    window.random = new Random();
    if( seed ) { // from front side
        window.random.seed(seed);
        Persistence.setItem('seed', seed);
    } else {  // from back side
        window.random.seed(Persistence.getItem('seed') || 42);
    }
}

function debug(message) {
    let d = document.querySelector("#debug");
    if(!d) return;
    d.textContent += "\n"+message;
}

String.prototype.splitrim = function (sep) {
    return this.split(sep).map(function (e) {
        return e.replace(/<br\/?>/, ' ').trim();
    });
};

Array.prototype.shuffle = function () {
    // Fisher–Yates shuffle
    let rng = window.random;
    if( !rng ) throw "No random generator";
    for (let i = this.length-1; i >= 1; i--) {
        let j = Math.floor(rng.nextFloat() * i);
        [this[i], this[j]] = [this[j], this[i]];
    }
};

function hide(elem) { elem.classList.add('hidden'); };

function show(elem) { elem.classList.remove('hidden'); };

function toggle(elem) { elem.classList.toggle('hidden'); };