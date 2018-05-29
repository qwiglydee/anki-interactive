"""
Assembling addon stuff
"""
import os
import shutil
import zipfile

import build

THISDIR = os.path.dirname(os.path.abspath(__file__))
DSTDIR = os.path.join(THISDIR, "dist")
ZIPFILE = os.path.join(THISDIR, "build", "addon.zip")


def copy_files():
    shutil.copyfile(os.path.join(THISDIR, "apkgutils.py"), os.path.join(DSTDIR, "apkgutils.py"))
    shutil.copyfile(os.path.join(THISDIR, "apkgupdate.py"), os.path.join(DSTDIR, "apkgupdate.py"))
    shutil.copyfile(os.path.join(THISDIR, "addon-conf.json"), os.path.join(DSTDIR, "config.json"))
    shutil.copyfile(os.path.join(THISDIR, "addon.py"), os.path.join(DSTDIR, "__init__.py"))
    shutil.copyfile(build.APKGPATH, os.path.join(DSTDIR, "update.apkg"))


def make_zip():
    apkg = zipfile.ZipFile(ZIPFILE, "w")
    for entry in os.scandir(DSTDIR):
        apkg.write(entry.path, entry.name)
    apkg.close()


if __name__ == "__main__":
    print("Rebuilding...")
    build.build()
    print("Copying files...")
    copy_files()
    print("Zipping addon...")
    make_zip()