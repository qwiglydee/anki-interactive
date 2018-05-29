import os
from anki.consts import MODEL_STD, MODEL_CLOZE

COMMON_FIELDS = ('Header', 'Intro', 'Cover', 'Instruction', 'Explanation', 'Reference')
STICKY_FIELDS = ('Header', 'Intro', 'Cover', 'Instruction', 'Reference')

MODELS = {
    'InteractiveDebug': {
        'type': MODEL_STD,
        'fields': ('Front', 'Back') + COMMON_FIELDS,
        'css': ("clean.css", "main.css", "theme.css"),
        'html': ("debug-front.html", "debug-back.html")
    },
    'InteractiveBase': {
        'type': MODEL_STD,
        'fields': ('Question', 'Answer') + COMMON_FIELDS,
        'css': ("clean.css", "main.css", "theme.css"),
        'html': ("base-front.html", "base-back.html")
    },
    'InteractiveChoice': {
        'type': MODEL_STD,
        'fields': ('Question', 'Choices') + COMMON_FIELDS,
        'css': ("clean.css", "main.css", "theme.css"),
        'html': ("choice-front.html", "choice-back.html")
    },
    'InteractiveCloze': {
        'type': MODEL_CLOZE,
        'fields': ('Text', 'Words') + COMMON_FIELDS,
        'css': ("clean.css", "main.css", "theme.css"),
        'html': ("cloze-front.html", "cloze-back.html")
    },
    'InteractiveComplete': {
        'type': MODEL_CLOZE,
        'fields': ('Text', 'Choices') + COMMON_FIELDS,
        'css': ("clean.css", "main.css", "theme.css"),
        'html': ("complete-front.html", "cloze-back.html")
    },
    'InteractiveOrder': {
        'type': MODEL_CLOZE,
        'fields': ('Text', 'Words') + COMMON_FIELDS,
        'css': ("clean.css", "main.css", "theme.css"),
        'html': ("order-front.html", "cloze-back.html")
    },
}

DECKNAME = "Interactive Demo"

NOTES = [
    {
        'model': 'InteractiveBase',
        'guid': 'qmax000001',
        'fields': {
            'Header': "Base card",
            'Intro': "Anyone who needs to remember things in their daily life need a program to practice remembering.",
            'Question': "What is a program which makes remembering things easy.",
            'Answer': "Anki",
            'Instruction': "Type-in answer.",
            'Explanation': "Because there are two simple concepts behind Anki: <em>active recall testing</em> and <em>spaced repetition</em>",
            'Reference': "https://apps.ankiweb.net/docs/manual.html"
        }
    },
    {
        'model': 'InteractiveChoice',
        'guid': 'qmax000002',
        'fields': {
            'Header': "Choice card",
            'Intro': "Anki is a program which makes remembering things easy.",
            'Question': "There are two simple concepts behind Anki:",
            'Choices': "+ active recall | + spaced repetition | active repetition | spaced recall",
            'Instruction': "Select correct answers.",
        }
    },
    {
        'model': 'InteractiveCloze',
        'guid': 'qmax000003',
        'fields': {
            'Header': "Clozing card",
            'Intro': "Anki is a program which makes remembering things easy.",
            'Text': "There are two simple concepts behind Anki: active {{c1::recall::remembering}} and spaced {{c1::repetition::iteration}}",
            'Instruction': "Type-in missed words.",
        }
    },
    {
        'model': 'InteractiveCloze',
        'guid': 'qmax000004',
        'fields': {
            'Header': "Clozing card with editable words",
            'Intro': "Anki is a program which makes remembering things easy.<br>There are two simple concepts behind Anki: <em>active recall testing</em> and <em>spaced repetition</em>.",
            'Text': "They are not {{c1::known::~know}} to most learners, despite having been {{c1::written::~write}} about in the scientific literature for many years.",
            'Instruction': "Put words into proper form.",
        }
    },
    {
        'model': 'InteractiveCloze',
        'guid': 'qmax000005',
        'fields': {
            'Header': "Clozing card with choices",
            'Intro': "Anki is a program which makes remembering things easy.",
            'Text': "There are two simple concepts behind Anki: {{c1::active}} recall and {{c1::spaced}} repetition.",
            'Words': "active|alive|energetic|spaced|separated|isolated",
            'Instruction': "Select words to insert.",
            }
    },
    {
        'model': 'InteractiveCloze',
        'guid': 'qmax000006',
        'fields': {
            'Header': "Clozing card with editable choices",
            'Intro': "Anki is a program which makes remembering things easy. There are two simple concepts behind Anki: <em>active recall testing</em> and <em>spaced repetition</em>.",
            'Text': "They are not {{c1::known::~}} to most learners, despite having been {{c1::written::~}} about in the scientific literature for many years.",
            'Words': "know|write",
            'Instruction': "Select words to insert and put them in proper form.",
        }
    },
    {
        'model': 'InteractiveComplete',
        'guid': 'qmax000007',
        'fields': {
            'Header': "Completion card",
            'Intro': "Anki is a program which makes remembering things easy. There are two simple concepts behind Anki: <em>active recall testing</em> and <em>spaced repetition</em>.",
            'Text': "They are not known to most learners, {{c1::despite having been written about}} in the scientific literature for many years.",
            'Choices': "despite having been written about | in spite of being written about | despite being written about",
            'Instruction': "Select correct sentence completion.",
        }
    },
    {
        'model': 'InteractiveOrder',
        'guid': 'qmax000008',
        'fields': {
            'Header': "Ordering card",
            'Intro': "Anki is a program which makes remembering things easy. There are two simple concepts behind Anki: <em>active recall testing</em> and <em>spaced repetition</em>.",
            'Text': "They {{c1::are not known}} to most learners, despite {{c1::having been written}} about in the scientific literature for many years.",
            'Words': "are|not|known|knowing|have|having|been|being|writing|written",
            'Instruction': "Place the words in proper order.",
        }
    }
]

