import { createStackNavigator } from 'react-navigation'

import Assos from './screens/Assos'
import AssosDetails from './screens/AssosDetails'
import Profile from '../ProfileBundle/screens/UserProfile'
import UEDetails from '../UEBundle/screens/UEDetails'
import UECommentaries from '../UEBundle/screens/UECommentaries'

export default createStackNavigator({
  Assos,
  AssosDetails,
  Profile,
  UEDetails,
  UECommentaries
})
