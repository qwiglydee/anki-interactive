
> The project is abandoned 
> 
> The reasons are that Anki itself is not designed for such kind of content:
> - not supposed to be cross-platform (each variation have it's own peculiariries)
> - interactive stuff not supported (no good support for javascript)
> - custom feedback not supported (no way to keep/show answer)
> - internals are not documented and may break in any version
> 
> All those make developing for ani a pain in the arse.
>

>
> Maybe, some parts of these cards will be released in another project
> 

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
 * `src` -- all the source files for templates
 * `models_def.py` -- configuration of models
 * `notes_def.py` -- configuration of notes in demo deck
 * `build.py` -- script to compile all the stuff into apkg file, and put all the addon stuff.
 * `dist` -- directory containing built package
