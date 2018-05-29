"""
Add-on script to update user's collection from .apkg
"""
import os

import anki
from anki import hooks
import aqt

from . import apkgutils, apkgupdate

config = aqt.mw.addonManager.getConfig(__name__)

THISDIR = os.path.dirname(os.path.abspath(__file__))
APKGPATH = os.path.join(THISDIR, "update.apkg")


def update():
    src = apkgutils.import_apkg(APKGPATH)
    dst = aqt.mw.col

    apkgupdate.update_models(src, dst, force=config['skip_timestamp_check'])
    if not config['skip_demo_deck']:
        apkgupdate.update_notes(src, dst, force=config['skip_timestamp_check'])

    dst.log("InteractiveAnki updated")
    dst.save("Upgrade")

hooks.addHook("profileLoaded", update)

