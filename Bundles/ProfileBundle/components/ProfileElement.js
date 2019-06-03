import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const ProfileElement = props => {
  if (props.value === null) return null
  return (
    <View style={styles.container}>
      <Icon name={props.icon} size={50} color='#333' />
      <View style={styles.text}>
        <Text style={styles.type}>{props.type}</Text>
        <Text style={styles.value}>{props.value}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  text: {
    marginLeft: 20
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  value: {
    fontSize: 20
  }
})

export default ProfileElement
