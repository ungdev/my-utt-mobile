import React from 'react'
import { createSwitchNavigator } from 'react-navigation'

import Main from './MainMenu'
import Login from './login/LoginPage'
import EtuLogin from './login/EtuLoginPage'
import UE from '../Bundles/UEBundle/Main'
import Profile from '../Bundles/ProfileBundle/Main'
import Events from '../Bundles/EventsBundle/Main'
import Assos from '../Bundles/AssosBundle/Main'
import Timetable from '../Bundles/TimetableBundle/Main'

const Navigator = createSwitchNavigator(
  {
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main, // menu with all buttons to select a bundle
    Login,
    EtuLogin,
    UE,
    Profile,
    Events,
    Assos,
    Timetable
  },
  {
    initialRouteName: 'Login'
  }
)

class AppNavigator extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      orgas: null
    }
  }

  setUser = user => this.setState({ user })
  setOrgas = orgas => this.setState({ orgas })

  render() {
    return (
      <Navigator
        screenProps={{
          user: this.state.user,
          setUser: this.setUser,
          orgas: this.state.orgas,
          setOrgas: this.setOrgas
        }}
      />
    )
  }
}

export default AppNavigator
