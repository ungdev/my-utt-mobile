import {
  createStackNavigator,
} from 'react-navigation'

import MyProfile from './screens/MyProfileScreen'
import UEDetailsScreen from '../UEBundle/screens/UEDetailsScreen'
import UECommentaireScreen from '../UEBundle/screens/UECommentaireScreen'

export default createStackNavigator({
  MyProfile: MyProfile,
  Details: UEDetailsScreen,
  Commentaires: UECommentaireScreen
})