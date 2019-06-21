import React from 'react'
import { View, StyleSheet, AsyncStorage } from 'react-native'
import { Appbar } from 'react-native-paper'
import GridButton from '../components/Menu/GridButton'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRATION_KEY,
  CLIENT_ID_KEY,
  CLIENT_SECRET_KEY,
  USER_KEY
} from '../constants/StorageKey'
import { fetchUser, getToken } from '../services/api'
import { registerForExpoPushNotifications } from '../services/expoPushNotifications'

class MainMenu extends React.Component {
  constructor(props) {
    super(props)
    this.checkToken()
    registerForExpoPushNotifications()
  }

  checkToken = async () => {
    try {
      const token = await getToken()
      if (token) {
        this.getUserInformations()
      } else {
        this.props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }
  click = async d => {
    switch (d) {
      case 'ue':
        this.props.navigation.navigate('UE')
        break
      case 'profile':
        this.props.navigation.navigate('Profile')
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
      this.props.screenProps.setUser(user)
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
          name: 'Mon profil',
          image: 'user',
          destination: 'profile'
        },
        {
          name: 'Guide des UEs',
          image: 'book',
          destination: 'ue'
        },
        {
          name: 'Emploi du temps',
          image: 'table'
        }
      ],
      [
        {
          name: 'Événements',
          image: 'calendar'
        },
        {
          name: 'Chat',
          image: 'comments'
        },
        {
          name: 'Paramètres',
          image: 'gear'
        }
      ],
      [
        {
          name: 'Trombinoscopes',
          image: 'address-book',
          destination: 'trombi'
        },
        {
          name: 'Associations',
          image: 'users'
        },
        {
          name: 'Se déconnecter',
          image: 'sign-out',
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
            image={<Icon name={section.image} size={70} color='#333' />}
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
