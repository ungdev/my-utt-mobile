import {
  createStackNavigator,
} from 'react-navigation'

import UserProfile from './screens/UserProfile'
import UEDetails from '../UEBundle/screens/UEDetails'
import UECommentaries from '../UEBundle/screens/UECommentaries'

export default createStackNavigator({
  UserProfile,
  UEDetails,
  UECommentaries
})