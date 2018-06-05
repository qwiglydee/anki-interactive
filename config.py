import os

THISDIR = os.path.dirname(os.path.abspath(__file__))
SRCDIR = os.path.join(THISDIR, "src")
BUILDDIR = os.path.join(THISDIR, "build")
DECKFILE = os.path.join(BUILDDIR, "interactive.anki2")
APKGFILE = os.path.join(BUILDDIR, "interactive.apkg")
ADDONDIR = os.path.join(BUILDDIR, "addon")
ADDONFILE = os.path.join(BUILDDIR, "addon.zip")



