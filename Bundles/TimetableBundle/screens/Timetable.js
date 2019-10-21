import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import ScheduleHours from '../components/ScheduleHours'
import ScheduleItems from '../components/ScheduleItems'
import { TouchableHighlight } from 'react-native-gesture-handler'

class Timetable extends React.Component {
  static navigationOptions = ({ screenProps }) =>
    DefaultTopbar({ navigate: screenProps.goTo }, 'Emploi du temps')

  render() {
    const { user } = this.props.screenProps
    return (
      <View style={styles.container}>
        <ScrollView style={styles.subcontainer}>
          <TouchableHighlight
            onPress={() =>
              this.props.screenProps.goTo('Profile', {
                user
              })
            }
          >
            <View style={styles.title}>
              <Text style={styles.fullName}>{user.fullName}</Text>
              {user.surname ? (
                <Text style={styles.surname}>({user.surname})</Text>
              ) : (
                <Text />
              )}
              {user.branch !== null && (
                <Text style={styles.branch}>
                  {user.branch} {user.speciality ? '- ' + user.speciality : ''}
                </Text>
              )}
            </View>
          </TouchableHighlight>
          <View style={styles.title}>
            <Text style={styles.day}>{this.props.screenProps.title}</Text>
          </View>
          <View style={styles.timetable}>
            <ScheduleHours />
            <ScheduleItems courses={this.props.screenProps.courses} />
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6C6C6'
  },
  subcontainer: {
    flex: 1,
    marginTop: 3
  },
  timetable: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: 'white'
  },
  title: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center'
  },
  fullName: {
    marginTop: 10,
    fontSize: 30
  },
  surname: {
    fontSize: 20
  },
  branch: {
    fontSize: 20,
    marginBottom: 20
  },
  day: {
    fontSize: 25
  }
})

export default Timetable
