"""
Utils to handle stand-alone anki2/apkg.
"""
import os
import zipfile
import json

try:
    import anki
except ImportError:
    raise ImportError("Anki isn't in PYTHONPATH")


def create_deck(deckpath, deckname):
    """
    Create bare collection in .anki2 file.
    :param deckpath: path to .anki2 to create
    :param deckname: name of default deck
    """
    assert deckpath.endswith(".anki2")
    if os.path.exists(deckpath):
        raise RuntimeError("anki2 file already exists")
    db = anki.storage.DB(deckpath)
    anki.storage._addSchema(db, setColConf=False)

    deck, dconf, aconf = anki.storage._getColVars(db)
    deck['name'] = deckname
    anki.storage._addColVars(db, deck, dconf, aconf)

    cwd = os.getcwd()
    coll = anki.collection._Collection(db, server=False, log=False)
    os.chdir(cwd)
    return coll


def open_deck(deckpath):
    """
    Load bare collection from .anki2 file
    :param deckpath: path to .anki2 to load
    """
    assert deckpath.endswith(".anki2")
    if not os.path.exists(deckpath):
        raise RuntimeError("anki2 file not found")
    db = anki.storage.DB(deckpath)
    cwd = os.getcwd()
    coll = anki.collection._Collection(db, server=False, log=False)
    os.chdir(cwd)
    return coll


def export_apkg(coll, apkgpath):
    """
    export deck as apkg file
    without media
    :param apkgpath: path to .apkg to create
    :param coll: collection
    """
    assert apkgpath.endswith(".apkg")
    deckpath = coll.path
    apkg = zipfile.ZipFile(apkgpath, "w")
    apkg.write(deckpath, "collection.anki2")
    apkg.writestr('media', "{}")
    apkg.close()

    return apkg


def import_apkg(apkgpath):
    """
    load deck from .apkg file
    without media
    :param apkgpath: path to .apkg to import
    :return coll: imported collection
    """
    assert apkgpath.endswith(".apkg")
    apkg = zipfile.ZipFile(apkgpath, "r")
    tmppath = anki.utils.tmpfile(suffix=".anki2")
    with open(tmppath, "wb") as f:
        f.write(apkg.read("collection.anki2"))
    return open_deck(tmppath)
