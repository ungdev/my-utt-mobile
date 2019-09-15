import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import moment from 'moment'

getColorByCategory = category => {
  switch (category) {
    case 'soiree':
      return 'red'
    case 'culture':
      return 'yellow'
    case 'formation':
      return 'green'
    case 'sport':
      return 'purple'
    default:
      return '#4098ff'
  }
}

const EventLine = props =>
  props.empty ? (
    <View style={styles.emptyContainer}>
      <Text style={styles.empty}>{props.children}</Text>
    </View>
  ) : (
    <TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.dates}>
          <Text>{moment(props.start).format('HH:mm')}</Text>
          <Text>{moment(props.end).format('HH:mm')}</Text>
        </View>
        <Text
          style={{
            backgroundColor: getColorByCategory(props.category),
            width: 3,
            alignSelf: 'stretch',
            marginHorizontal: 5
          }}
        ></Text>

        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignSelf: 'stretch',
            alignItems: 'center'
          }}
        >
          <Text numberOfLines={2} style={{ flex: 1 }}>
            {props.children}
          </Text>
          <Text
            style={{ width: 50, backgroundColor: 'gray', alignSelf: 'stretch', marginHorizontal: 2 }}
          ></Text>
        </View>
      </View>
    </TouchableOpacity>
  )

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: 50,
    marginBottom: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    height: 50,
    marginBottom: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  empty: {
    color: 'gray'
  },
  dates: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    justifyContent: 'center',
    width: 60
  }
})

export default EventLine
