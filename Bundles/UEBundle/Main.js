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

// First Stack is the left button
const MyUEsStack = createStackNavigator({
  MyUEs: MyUEScreen,
  Details: UEDetailsScreen,
  Commentaires: UECommentaireScreen
})

// Second Stack is the right button
const SearchStack = createStackNavigator({
  Search: SearchUEScreen,
  Details: UEDetailsScreen,
  Commentaires: UECommentaireScreen
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
