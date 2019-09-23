import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Tooltip } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

const ProfileElement = props => {
  if (props.value === null || props.value === '') return null
  const component = (
    <View style={styles.container}>
      <Icon name={props.icon} size={50} color='#333' />
      <View style={styles.text}>
        <View style={styles.typeContainer}>
          <Text style={styles.type}>{props.type}</Text>
          {props.private && (
            <Tooltip popover={<Text>Information privée</Text>}>
              <Icon name='lock' size={20} color='#000' />
            </Tooltip>
          )}
        </View>
        {typeof props.value !== Object ? (
          <Text style={styles.value}>{props.value}</Text>
        ) : (
          props.value
        )}
      </View>
    </View>
  )
  if (props.onPress) {
    return (
      <TouchableOpacity onPress={props.onPress} style={styles.button}>
        {component}
      </TouchableOpacity>
    )
  } else {
    return component
  }
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
    fontWeight: 'bold',
    marginRight: 10
  },
  typeContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  value: {
    fontSize: 20
  },
  button: { flex: 1, alignSelf: 'stretch' }
})

export default ProfileElement
