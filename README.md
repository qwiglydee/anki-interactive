 
> This software is very beta. It's been tested only on linux Anki v2.1 and AnkiDroid v2.8.3. Older Anki won't be supported.

# Interactive Cards for Anki

The cards enable some interactive features to enter and edit answers and receive feedback, similar to what's often found in exercises of many language-learning applications.

The features are: 
* typing answer in input field
* typing missing words right inside a text
* selecting words or answers from list of options
* placing words in proper order.
 
Also, there is quite a design and user-friendly feedback.

Detailed description is in [the wiki](https://github.com/qwiglydee/anki-interactive/wiki)
Discussion goes [here at reddit](https://www.reddit.com/r/Anki/comments/8n4qt1/anki21_interactive_cards_for_language_learning/)

## Installation

Packaged version is [at the dist folder](https://github.com/qwiglydee/anki-interactive/raw/master/dist/interactive.apkg)

## Development

The templates for models are compiled from a pretty big set of html, css and javascript files. In order to modify them you need to install anki sources, clone this repo and use compiling scripts.

For the scripts to work, PYTHONPATH should contains anki sources as well as all its requirements.

Key points:
 * `src` -- all the source files
 * `models_def.py` -- configuration of models
 * `notes_def.py` -- configuration of notes in demo deck
 * `dist.py` -- script to compile all the stuff into apkg file, and put all the addon stuff.
 * `dist` -- addon directory. After rebuild, you may symlink or copy this right into Anky's addons directory.
 
