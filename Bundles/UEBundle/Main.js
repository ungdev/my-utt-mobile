import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { SceneMap,TabView, TabBar } from 'react-native-tab-view'
import { BackHandler, Dimensions, Text } from 'react-native'

import TabBarIcon from '../../components/TabBarIcon'
import MyUE from './screens/MyUE'
import SearchUE from './screens/SearchUE'
import UEDetails from './screens/UEDetails'
import UECommentaries from './screens/UECommentaries'
import UEReviews from './screens/UEReviews'
import Viewer from './screens/UEReviewViewer'

// First Stack is the left button
const MyUEsStack = createStackNavigator({
  MyUE,
  UEDetails,
  UECommentaries,
  UEReviews,
  Viewer
})

// Second Stack is the right button
const SearchStack = createStackNavigator({
  SearchUE,
  UEDetails,
  UECommentaries,
  UEReviews,
  Viewer
})

class UEBundle extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'MyUEsStack', title: 'Mes UEs', icon: 'briefcase' },
        { key: 'SearchStack', title: 'Rechercher', icon: 'search' }
      ]
    }
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.navigate('Main')
      return true
    })
  }
  componentWillUnmount() {
    this.backHandler.remove()
  }

  goTo = destination => this.props.navigation.navigate(destination)

  render() {
    return (
      <TabView
        screenProps={this.props.screenProps}
        navigationState={this.state}
        renderScene={({ route }) => {
          switch (route.key) {
            case 'MyUEsStack':
              return (
                <MyUEsStack
                  screenProps={{ ...this.props.screenProps, goTo: this.goTo }}
                />
              )
            case 'SearchStack':
              return (
                <SearchStack
                  screenProps={{ ...this.props.screenProps, goTo: this.goTo }}
                />
              )
            default:
              return null
          }
        }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#4098ff' }}
            style={{ backgroundColor: 'white' }}
            renderIcon={({ route, focused }) => (
              <TabBarIcon focused={focused} name={route.icon} />
            )}
            renderLabel={({ route, focused, color }) => (
              <Text style={{ color: focused ? '#4098ff' : '#ccc', margin: 2 }}>
                {route.title}
              </Text>
            )}
          />
        )}
        tabBarPosition='bottom'
        onIndexChange={index => this.setState({ index })}
        initialLayout={{ width: Dimensions.get('window').width }}
      />
    )
  }
}

export default UEBundle
