import React from 'react'
import { TabView, TabBar } from 'react-native-tab-view'
import { AsyncStorage, Dimensions, Text } from 'react-native'

import { fetchCourses } from '../../api/course'
import { COURSES_KEY } from '../../constants/StorageKey'
import Timetable from './screens/Timetable'
import TimetableLoading from './screens/TimetableLoading'
import DefaultTopbar from '../../constants/DefaultTopbar'

class TimetableBundle extends React.Component {
  static navigationOptions = () => DefaultTopbar('Emploi du temps')
  constructor(props) {
    super(props)
    const user = props.navigation.getParam('user')
    if (!user) {
      this.getCoursesFromServer(this.props.screenProps.user, true)
      this.getCoursesFromMemory()
    } else {
      this.getCoursesFromServer(user)
    }
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
  getCoursesFromServer = async (user, addToStorage = false) => {
    try {
      const courses = await fetchCourses(user.login)
      this.setState({ courses })
      if (addToStorage) {
        await AsyncStorage.setItem(COURSES_KEY, JSON.stringify(courses))
      }
    } catch (e) {
      console.log(e)
    }
  }
  render() {
    let user = this.props.navigation.getParam('user')
    if (!user) {
      user = this.props.screenProps.user
    }
    const { courses } = this.state
    if (courses === null)
      // TODO add fetching because if user has no course it would spin forever
      return <TimetableLoading />
    return (
      <TabView
        screenProps={this.props.screenProps}
        navigationState={this.state}
        renderScene={({ route }) => (
          <Timetable
            screenProps={{
              ...this.props.screenProps,
              key: route.key,
              title: route.title,
              courses: courses.filter(course => course.day === route.key)
            }}
            navigation={this.props.navigation}
            user={user}
          />
        )}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#4098ff' }}
            style={{ backgroundColor: 'white' }}
            tabStyle={{ padding: 0 }}
            renderLabel={({ route, focused }) => (
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
