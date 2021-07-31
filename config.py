from pathlib import Path

WORKDIR = Path(__file__).parent
SRCDIR = WORKDIR / "src"
BUILDDIR = WORKDIR / "build"
DISTDIR = WORKDIR / "dist"
DECKFILE = BUILDDIR / "interactive.anki2"
APKGFILE = DISTDIR / "interactive.apkg"