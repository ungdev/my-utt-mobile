import React from 'react'
import { createSwitchNavigator } from 'react-navigation'

import MainNavigator from './MainNavigator'
import LoginPage from '../screens/LoginPage'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainNavigator,
  Login: LoginPage,
},{
  initialRouteName: 'Login'
});