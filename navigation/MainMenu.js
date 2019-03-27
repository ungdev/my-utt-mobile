import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Appbar } from 'react-native-paper'
import GridButton from '../components/Menu/GridButton'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import moment from 'moment'
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRATION_KEY,
  CLIENT_ID_KEY,
  CLIENT_SECRET_KEY,
  USER_KEY
} from '../constants/StorageKey'
import { fetchUser } from '../services/api';

class MainMenu extends React.Component {
  constructor(props) {
    super(props)
    this.checkToken()
  }

  checkToken = async () => {
    try {
      const expiration_date = await AsyncStorage.getItem(
        ACCESS_TOKEN_EXPIRATION_KEY
      )
      if (expiration_date) {
        if (moment().isAfter(expiration_date * 1000)) {
          this.props.navigation.navigate('Login')
        } else {
          this.getUserInformations()
        }
      }
    } catch (e) {
      console.log(e)
    }
  }
  click = async d => {
    switch (d) {
      case 'ue':
        this.props.navigation.navigate('UE')
        break
      case 'logout':
        try {
          await AsyncStorage.setItem(ACCESS_TOKEN_EXPIRATION_KEY, '')
          await AsyncStorage.setItem(ACCESS_TOKEN_KEY, '')
          await AsyncStorage.setItem(CLIENT_ID_KEY, '')
          await AsyncStorage.setItem(CLIENT_SECRET_KEY, '')
          this.props.navigation.navigate('Login')
        } catch (e) {
          console.log(e)
        }
        break
      default:
        break
    }
  }

  getUserInformations = async () => {
    try {
      const user = await fetchUser()
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    let grid = []
    let gridContent = [
      [
        {
          name: 'Trombinoscope',
          image: <Icon name='address-book' size={70} color='#333' />,
          destination: 'trombi'
        },
        {
          name: 'Guide des UEs',
          image: <Icon name='book' size={70} color='#333' />,
          destination: 'ue'
        },
        {
          name: 'Emploi du temps',
          image: <Icon name='table' size={70} color='#333' />
        }
      ],
      [
        {
          name: 'Événements',
          image: <Icon name='calendar' size={70} color='#333' />
        },
        {
          name: 'Chat',
          image: <Icon name='comments' size={70} color='#333' />
        },
        {
          name: 'Paramètres',
          image: <Icon name='gear' size={70} color='#333' />
        }
      ],
      [
        {
          name: ''
        },
        {
          name: ''
        },
        {
          name: 'Se déconnecter',
          image: <Icon name='sign-out' size={70} color='#333' />,
          destination: 'logout'
        }
      ]
    ]
    let key = 0
    gridContent.forEach(row => {
      let rowContent = []
      row.forEach(section => {
        rowContent.push(
          <GridButton
            key={key++}
            title={section.name}
            image={section.image}
            onPress={() => this.click(section.destination)}
          />
        )
      })
      grid.push(
        <View key={key++} style={styles.row}>
          {rowContent}
        </View>
      )
    })
    return (
      <View style={styles.container}>
        <Appbar style={styles.bottom} />
        <ScrollView style={styles.grid}>{grid}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C6C6C6'
  },
  grid: {
    flex: 1,
    marginTop: 55
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: '#333'
  }
})

export default MainMenu
