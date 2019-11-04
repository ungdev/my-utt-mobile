import React from 'react'
import { createSwitchNavigator, createStackNavigator } from 'react-navigation'

import Main from './MainMenu'
import Login from './login/LoginPage'
import EtuLogin from './login/EtuLoginPage'
import UE from '../Bundles/UEBundle/Main'
import UECommentaries from '../Bundles/UEBundle/screens/UECommentaries'
import UEDetails from '../Bundles/UEBundle/screens/UEDetails'
import UEReviews from '../Bundles/UEBundle/screens/UEReviews'
import UEReviewViewer from '../Bundles/UEBundle/screens/UEReviewViewer'
import Profile from '../Bundles/ProfileBundle/screens/Profile'
import Trombi from '../Bundles/TrombiBundle/screens/Trombi'
import TrombiResult from '../Bundles/TrombiBundle/screens/TrombiResult'
import Events from '../Bundles/EventsBundle/screens/Events'
import EventsDetails from '../Bundles/EventsBundle/screens/EventsDetails'
import Assos from '../Bundles/AssosBundle/screens/Assos'
import AssosDetails from '../Bundles/AssosBundle/screens/AssosDetails'
import Timetable from '../Bundles/TimetableBundle/Main'
import About from '../Bundles/AboutBundle/screens/About'
import DefaultTopbar from '../constants/DefaultTopbar'

const MainApp = createStackNavigator(
  {
    Main, // menu with all buttons to select a bundle
    About,
    Assos,
    AssosDetails,
    Events,
    EventsDetails,
    Profile,
    Timetable,
    Trombi,
    TrombiResult,
    UE,
    UECommentaries,
    UEDetails,
    UEReviews,
    UEReviewViewer
  },
  {
    navigationOptions: () => DefaultTopbar('My UTT')
  }
)
const Navigator = createSwitchNavigator(
  {
    MainApp,
    Login,
    EtuLogin
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

  static navigationOptions = () => ({
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false
    }
  })
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
