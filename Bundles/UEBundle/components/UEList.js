import React from 'react'
import { Image, Text, StyleSheet } from 'react-native'
import { List } from '@ant-design/react-native'
import cs from '../assets/imgs/cs.png'
import tm from '../assets/imgs/tm.png'
import ec from '../assets/imgs/ec.png'
import me from '../assets/imgs/me.png'
import st from '../assets/imgs/st.png'
import ct from '../assets/imgs/ct.png'
import other from '../assets/imgs/other.png'

const UEList = props => (
  <List>
    {props.ues.map(ue => {
      let image = other
      switch (ue.category) {
        case 'cs':
          image = cs
          break
        case 'tm':
          image = tm
          break
        case 'ec':
          image = ec
          break
        case 'me':
          image = me
          break
        case 'st':
          image = st
          break
        case 'ct':
          image = ct
          break
        default:
          break
      }
      return (
        <List.Item
          key={ue.slug}
          thumb={<Image source={image} style={styles.item} />}
          arrow={ue.name !== '' ? 'horizontal' : null}
          onPress={ue.name !== '' ? () => props.onPress(ue) : null}
        >
          <Text>{ue.code}</Text>
          <Text>{ue.name}</Text>
        </List.Item>
      )
    })}
    {props.ues && props.ues.length === 0 && (
      <List.Item
      >
        <Text>Vous n'avez pas d'UE</Text>
      </List.Item>
    )}
  </List>
)

const styles = StyleSheet.create({
  item: {
    marginRight: 20
  }
})

export default UEList
