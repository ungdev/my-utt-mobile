import React from 'react'
import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation'

import TabBarIcon from '../../components/TabBarIcon'
import HomeScreen from './screens/HomeScreen'
import SearchUEScreen from './screens/SearchUEScreen'
import UEDetailsScreen from './screens/UEDetailsScreen'
import SettingsScreen from './screens/SettingsScreen'

const HomeStack = createStackNavigator({
  Home: HomeScreen
})
const SearchStack = createStackNavigator({
  Search: SearchUEScreen,
  Details: UEDetailsScreen
})
const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
})

HomeStack.navigationOptions = {
  tabBarLabel: 'Mes UEs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='briefcase' />
  )
}

SearchStack.navigationOptions = {
  tabBarLabel: 'Rechercher',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='search' />
  )
}

SettingsStack.navigationOptions = {
  tabBarLabel: 'Catalogue',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name='book' />
  )
}

export default createBottomTabNavigator({
  HomeStack,
  SearchStack,
  SettingsStack
})
