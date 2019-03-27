import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../../components/TabBarIcon'
import MyUEScreen from './screens/MyUEScreen'
import SearchUEScreen from './screens/SearchUEScreen'
import UEDetailsScreen from './screens/UEDetailsScreen'
import UECommentaireScreen from './screens/UECommentaireScreen'

const MyUEsStack = createStackNavigator({
  MyUEs: MyUEScreen,
  Details: UEDetailsScreen,
  Commentaires: UECommentaireScreen,
})
const SearchStack = createStackNavigator({
  Search: SearchUEScreen,
  Details: UEDetailsScreen
})

MyUEsStack.navigationOptions = {
  tabBarLabel: 'Mes UEs',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='briefcase' />
}

SearchStack.navigationOptions = {
  tabBarLabel: 'Rechercher',
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name='search' />
}

export default createBottomTabNavigator({
  MyUEsStack,
  SearchStack
})
