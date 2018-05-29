 
> This software is very beta. It's been tested only on linux Anki v2.1 and AnkiDroid v2.8.3. Older Anki won't be supported.

# Interactive Cards for Anki

The cards enable some interactive features to enter and edit answers and receive feedback, similar to what's often found in exercises of many other language-learning applications.

The features include:
 * typing answer into an input field, or selecting one or more answers from a set of provided options
 * typing cloze insertions right into a text with cloze deletions
 * changing already provided words
 * selecting words to insert from a list, optionally editing them
 * putting words in right order
 
Also, there is quite a design and user-friendly feedback.

For details see TODO:WIKI

## Installation

To install all the models or update them, install this TODO:ADDON. The addon will recreate all the models and demo deck in your collection. When some fixes or improvements are released, they will be delivered through add-on update and all existing templates will be replaced.

## Development

The templates for models are compiled from a (huge) bunch of source files. To modify them it is necessary to clone this repo and rebuild all the models.

 * script `build.py` compiles all templates into temporary collection into `build` dir.
 * script `dist.py` assembles the collection and other addon stuff into `dist` dir. You may symlink or copy this directory right into Anky's addons directory.
 
 For the scripts to work your PYTHONPATH should contains anki sources as well as all its requirements.


