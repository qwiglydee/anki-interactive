"""
Utils to update collections.
"""
import anki


def update_models(src, dst, force=False):
    """
    Create or update models from src into dst.
    A model is updated if its timestamp refreshed.

    :param src: source collection
    :param dst: destination collection
    :param force: skip timestamp check
    """
    for srcmod in src.models.all():
        dstmod = dst.models.byName(srcmod['name'])
        if not force and dstmod is not None and dstmod['mod'] >= srcmod['mod']:
            continue
        if dstmod is None:
            dstmod = srcmod.copy()
            dst.models.add(dstmod)
            dst.log("Created model %s" % dstmod['name'])
        else:
            dstmod['css'] = srcmod['css']
            dstmod['tmpls'] = srcmod['tmpls']
            dst.log("Updated model %s" % dstmod['name'])
        dst.models.save(dstmod)


def update_notes(src, dst, force=False):
    """
    Create or update notes from src (single deck) into dst.
    All notes are created from scratch if deck timestamp refreshed.

    :param src: source collection
    :param dst: destination collection
    :param force: skip timestamp check
    """
    srcdeck = src.decks.all()[0]
    dstdeck = dst.decks.byName(srcdeck['name'])

    if not force and dstdeck is not None and dstdeck['mod'] >= srcdeck['mod']:
        return

    if dstdeck is not None:
        dst.decks.rem(dstdeck['id'], cardsToo=True)

    dstdeck_id = dst.decks.id(srcdeck['name'], create=True, type=srcdeck)
    dstdeck = dst.decks.get(dstdeck_id, default=False)

    srcnotes = src.findNotes("")
    for srcnote_id in srcnotes:
        srcnote = src.getNote(srcnote_id)
        srcmodel = src.models.get(srcnote.mid)
        dstmodel = dst.models.byName(srcmodel['name'])
        dstmodel['did'] = dstdeck_id

        dstnote = anki.notes.Note(dst, dstmodel)
        dstnote.guid = srcnote.guid
        dstnote.fields = srcnote.fields
        dst.addNote(dstnote)

    dst.log("Created %d notes in %s" % (len(srcnotes), dstdeck['name']))
