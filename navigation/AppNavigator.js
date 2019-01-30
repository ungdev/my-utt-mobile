import React from 'react'
import { createSwitchNavigator } from 'react-navigation'

import MainNavigator from './MainNavigator'
import AuthNavigator from './AuthNavigator'
import AuthLoadingNavigator from './AuthLoadingNavigator'

export default createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainNavigator,
  Auth: AuthNavigator,
  AuthLoading: AuthLoadingNavigator,
},{
  initialRouteName: 'AuthLoading'
});