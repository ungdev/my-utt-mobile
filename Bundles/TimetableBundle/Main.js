import React from 'react'
import { createStackNavigator } from 'react-navigation'
import { TabView, TabBar } from 'react-native-tab-view'
import { AsyncStorage, BackHandler, Dimensions, Text } from 'react-native'

import { fetchCourses } from '../../services/api'
import { COURSES_KEY } from '../../constants/StorageKey'
import Timetable from './screens/Timetable'
import TimetableLoading from './screens/TimetableLoading'

const TimetableStack = createStackNavigator({
  Timetable
})
const TimetableLoadingStack = createStackNavigator({
  TimetableLoading
})

class TimetableBundle extends React.Component {
  constructor(props) {
    super(props)
    this.getCoursesFromServer()
    this.getCoursesFromMemory()
    this.state = {
      index: 0,
      routes: [
        { key: 'monday', title: 'Lundi' },
        { key: 'tuesday', title: 'Mardi' },
        { key: 'wednesday', title: 'Mercredi' },
        { key: 'thursday', title: 'Jeudi' },
        { key: 'friday', title: 'Vendredi' },
        { key: 'saturday', title: 'Samedi' }
      ],
      courses: null
    }
  }

  getCoursesFromMemory = async () => {
    try {
      const courses = await AsyncStorage.getItem(COURSES_KEY)
      if (courses) this.setState({ courses: JSON.parse(courses) })
    } catch (e) {
      console.log(e)
    }
  }
  getCoursesFromServer = async () => {
    try {
      const courses = await fetchCourses(this.props.screenProps.user.login)
      this.setState({ courses })
      await AsyncStorage.setItem(COURSES_KEY, JSON.stringify(courses))
    } catch (e) {
      console.log(e)
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

  goTo = (destination, param = null) => this.props.navigation.navigate(destination, param)

  render() {
    const { courses } = this.state
    if (courses === null)
      // TODO add fetching because if user has no course it would spin forever
      return <TimetableLoadingStack />
    return (
      <TabView
        screenProps={this.props.screenProps}
        navigationState={this.state}
        renderScene={({ route }) => (
          <TimetableStack
            screenProps={{
              ...this.props.screenProps,
              goTo: this.goTo,
              key: route.key,
              title: route.title,
              courses: courses.filter(course => course.day === route.key)
            }}
          />
        )}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#4098ff' }}
            style={{ backgroundColor: 'white' }}
            tabStyle={{ padding: 0 }}
            renderLabel={({ route, focused, color }) => (
              <Text
                style={{
                  color: focused ? '#4098ff' : '#ccc',
                  margin: 0,
                  fontSize: 10,
                  fontWeight: 'bold'
                }}
              >
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

export default TimetableBundle
