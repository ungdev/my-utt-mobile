# Campus UTT

## Requirement :

* React Native with expo
* Campus UTT API up and running : https://github.com/ungdev/campus-utt-mobile-api

## Installation :

1. clone repository
* git clone https://github.com/ungdev/campus-utt-mobile.git
2. copy config file and edit it
* cd campus-utt-mobile
* cp config.js.example config.js
* nano config.js
3. install dependencies :
* yarn
4. launch the app on expo :
* yarn start

## File Architecture :

* /assets/* => all font, images, files used in the app
* /components/* => all react components that can be reused multiple times
* /constants/* => to be replaced by /theme/*, store theme information like colors etc
* /navigation/* => handle app navigation, where the user should be redirected, not the actual content
* /node_modules/* => dependencies, dont touch it
* /screens/* => pages, content, etc
* App.js => entry point of the app
* app.json => app infos, like version (it's important to increase it when you publish a new version)
* config.js(.example) => configuration file for globale static variables
* README.md => this file
