import React from 'react'
import { TabView, TabBar, SceneMap } from 'react-native-tab-view'
import { Dimensions, Text } from 'react-native'

import TabBarIcon from '../../components/TabBarIcon'
import MyUE from './screens/MyUE'
import SearchUE from './screens/SearchUE'
import DefaultTopbar from '../../constants/DefaultTopbar'

class UEBundle extends React.Component {
  static navigationOptions = () => DefaultTopbar('UE')
  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      routes: [
        { key: 'MyUE', title: 'Mes UEs', icon: 'briefcase' },
        { key: 'SearchUE', title: 'Rechercher', icon: 'search' }
      ]
    }
  }

  render() {
    return (
      <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          MyUE: () => (
            <MyUE
              screenProps={this.props.screenProps}
              navigation={this.props.navigation}
            />
          ),
          SearchUE: () => (
            <SearchUE
              screenProps={this.props.screenProps}
              navigation={this.props.navigation}
            />
          )
        })}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#4098ff' }}
            style={{ backgroundColor: 'white' }}
            renderIcon={({ route, focused }) => (
              <TabBarIcon focused={focused} name={route.icon} />
            )}
            renderLabel={({ route, focused }) => (
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
