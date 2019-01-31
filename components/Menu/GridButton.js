import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  PixelRatio
} from 'react-native'
import { normalize } from '../../services/font'

const GridButton = props => {
  return (
    <TouchableOpacity style={styles.container}>
      {props.image && <Image source={props.image} style={{ width: 70, height: 70 }} ></Image>}
      <Text style={styles.title}>{props.title}</Text>
    </TouchableOpacity>
  )
}
let fontSize = 19
if(PixelRatio.get() <= 2) fontSize = 17
const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 3 - 6,
    height: Dimensions.get('window').width / 3 - 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 1,
    marginVertical: 1,
    backgroundColor:'#FFFFFF'
  },
  title: {
    position: 'absolute',
    bottom: 5,
    fontSize: normalize(10),
    textAlign: 'center'
  }
})


export default GridButton
