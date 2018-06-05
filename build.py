"""
Assembling addon
"""
import os
import shutil
import zipfile

import config
import compile


def copy_files():
    shutil.copyfile(os.path.join(config.THISDIR, "apkgutils.py"), os.path.join(config.ADDONDIR, "apkgutils.py"))
    shutil.copyfile(os.path.join(config.THISDIR, "apkgupdate.py"), os.path.join(config.ADDONDIR, "apkgupdate.py"))
    shutil.copyfile(os.path.join(config.THISDIR, "addon-conf.json"), os.path.join(config.ADDONDIR, "config.json"))
    shutil.copyfile(os.path.join(config.THISDIR, "addon.py"), os.path.join(config.ADDONDIR, "__init__.py"))
    shutil.copyfile(config.APKGFILE, os.path.join(config.ADDONDIR, "update.apkg"))


def make_zip():
    addon = zipfile.ZipFile(config.ADDONFILE, "w")
    for entry in os.scandir(config.ADDONDIR):
        if entry.name in ('__pycache__', 'meta.json'):
            continue
        addon.write(entry.path, entry.name)
    addon.close()


if __name__ == "__main__":
    print("Rebuilding...")
    compile.build()

    if not os.path.exists(config.ADDONDIR):
        os.mkdir(config.ADDONDIR)

    print("Copying files...")
    copy_files()
    print("Zipping addon...")
    make_zip()