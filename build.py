"""
Building models and demo notes into .anki2/.apkg
"""
import os
import re

import anki
from anki import notes

import apkgutils
import models_def
import notes_def

THISDIR = os.path.dirname(os.path.abspath(__file__))
DECKPATH = os.path.join(THISDIR, "build", "interactive.anki2")
APKGPATH = os.path.join(THISDIR, "build", "interactive.apkg")
SRCPATH = os.path.join(THISDIR, "src")


class Sources(dict):
    """
    Caching dictionary of all sources in SRCPATH
    """
    def __getitem__(self, name):
        if name not in self:
            with open(os.path.join(SRCPATH, name)) as f:
                self[name] = f.read()
        return super().__getitem__(name)

    def compile_html(self, html):
        html = re.sub('{{> (.*)}}', lambda m: self[m.group(1)+".html"], html)
        html = re.sub('<script src="(.*)"></script>', lambda m: "<script>" + self[m.group(1)] + "</script>\n", html)
        return html

    def compile_css(self, csslist):
        return "\n".join(map(lambda f: self[f], csslist))


sources = Sources()


def create_models(coll):
    for name, conf in models_def.MODELS.items():
        create_model(coll, name, conf)
    coll.save()


def create_model(coll, name, conf):
    model = coll.models.new(name)
    model['type'] = conf['type']

    for fld in conf['fields']:
        f = coll.models.newField(fld)
        if fld in models_def.COMMON_FIELDS:
            f['sticky'] = True
        coll.models.addField(model, f)
    model['sortf'] = 0
    model['latexPre'] = ""
    model['latexPost'] = ""
    model['css'] = sources.compile_css(conf['css'])
    tmpl = coll.models.newTemplate(name)
    tmpl['qfmt'] = sources.compile_html(sources[conf['html'][0]])
    tmpl['afmt'] = sources.compile_html(sources[conf['html'][1]])
    coll.models.addTemplate(model, tmpl)
    coll.models.add(model)


def create_notes(coll):
    for conf in notes_def.NOTES:
        create_note(coll, conf)
    coll.save()


def create_note(coll, conf):
    model = coll.models.byName(conf['model'])
    note = notes.Note(coll, model)
    note.guid = conf['guid']
    for fld, val in conf['fields'].items():
        note[fld] = val
    coll.addNote(note)


def build():
    """
    rebuilding collection with models/templates and notes/cards
    """
    if os.path.exists(DECKPATH):
        os.unlink(DECKPATH)

    if os.path.exists(APKGPATH):
        os.unlink(APKGPATH)

    coll = apkgutils.create_deck(DECKPATH, notes_def.DECKNAME)

    print("Building models...")
    create_models(coll)
    print("Created %d models" % len(coll.models.all()))

    print("Building notes...")
    create_notes(coll)
    print("Created %d notes" % coll.noteCount())

    apkgutils.export_apkg(coll, APKGPATH)


if __name__ == "__main__":
    build()
