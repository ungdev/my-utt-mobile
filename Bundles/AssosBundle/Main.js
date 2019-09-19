import { createStackNavigator } from 'react-navigation'

import Assos from './screens/Assos'
import AssosDetails from './screens/AssosDetails'
import Profile from '../ProfileBundle/screens/UserProfile'

export default createStackNavigator({
  Assos,
  AssosDetails,
  Profile
})
