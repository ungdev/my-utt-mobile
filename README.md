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


## Create a bundle

* Create the folder Bundles/NameOfYourBundleBundle
* Create the bundle entry point, usually "Main.js" in that folder
* Do whatever you want in that folder, add tabs, functionnalities...
* Dont forget to implement a return button on the top left corner to return to main menu
* Go to navigation/AppNavigator.js => add your Bundle in the list
* Go to navigation/MainMenu.js => add a button to your app with destination equal to the Bundle name in AppNavigator

## Icons

* you can see all icons usable here : https://oblador.github.io/react-native-vector-icons/