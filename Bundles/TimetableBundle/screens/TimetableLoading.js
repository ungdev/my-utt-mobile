import React from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'

class TimetableLoading extends React.Component {
  static navigationOptions = () =>
    DefaultTopbar('Emploi du temps')

  render() {
    return (
      <View style={styles.spin}>
        <ActivityIndicator size='large' color='#4098ff' />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default TimetableLoading
