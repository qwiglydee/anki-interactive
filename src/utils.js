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

function debug(message) {
    let d = document.querySelector("#debug");
    if(!d) return;
    d.textContent += "\n"+message;
}

String.prototype.splitrim = function (sep) {
    return this.split(sep).map(e => e.trim()).filter(e => e !== "");
};

String.prototype.stripspaces = function() {
    return this.replace(/\s+/g, ' ');
};

function placeCaretAtEnd(el) {
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}

function hide(elem) { elem.classList.add('hidden'); };

function show(elem) { elem.classList.remove('hidden'); };

function toggle(elem) { elem.classList.toggle('hidden'); };