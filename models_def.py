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