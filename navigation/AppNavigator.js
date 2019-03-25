import React from 'react'
import { createSwitchNavigator } from 'react-navigation'

//import MainNavigator from './MainNavigator'
import MainMenu from './MainMenu'
import LoginPage from './login/LoginPage'
import EtuLoginPage from './login/EtuLoginPage'
import UEBundle from '../Bundles/UEBundle/Main'

export default createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainMenu, // menu with all buttons to select a bundle
    Login: LoginPage,
    EtuLogin: EtuLoginPage,
    UE: UEBundle
  },
  {
    initialRouteName: 'Login'
  }
)
