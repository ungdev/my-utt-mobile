import React from 'react'
import {
  ActivityIndicator,
  Image,
  View,
  StyleSheet,
  AsyncStorage,
  Dimensions,
  Text
} from 'react-native'
import GridButton from '../components/Menu/GridButton'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import {
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRATION_KEY,
  CLIENT_ID_KEY,
  CLIENT_SECRET_KEY,
  TUTORIAL_KEY,
  USER_KEY,
  ORGAS_KEY
} from '../constants/StorageKey'
import { fetchUser, fetchOrgas, getToken } from '../services/api'
import { registerForExpoPushNotifications } from '../services/expoPushNotifications'
import { createStackNavigator } from 'react-navigation'
import Popover from 'react-native-popover-view'

class MainMenu extends React.Component {
  static navigationOptions = () => ({ header: null })

  constructor(props) {
    super(props)
    this.checkToken()
    registerForExpoPushNotifications()
    this.state = {
      tutorial: ''
    }
  }

  launchTutorial = async () => {
    const tutorialDone = await AsyncStorage.getItem(TUTORIAL_KEY)
    if (tutorialDone !== 'done') {
      this.setState({ tutorial: 'tutorial' })
      await AsyncStorage.setItem(TUTORIAL_KEY, 'done')
    }
  }

  checkToken = async () => {
    try {
      const token = await getToken()
      if (token) {
        this.getUserFromMemory()
        this.updateUser()
        this.launchTutorial()
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
      case 'events':
        this.props.navigation.navigate('Events')
        break
      case 'logout':
        this.logout()
        break
      case 'orgas':
        this.props.navigation.navigate('Assos')
        break
      case 'ung':
        const asso = this.props.screenProps.orgas.find(
          orga => orga.login === 'ung'
        )
        this.props.navigation.navigate('AssosDetails', { asso })
        break
      case 'about':
        this.props.navigation.navigate('About')
        break
      case 'profile':
        this.props.navigation.navigate('Profile')
        break
      case 'ue':
        this.props.navigation.navigate('UE')
        break
      case 'edt':
        this.props.navigation.navigate('Timetable')
        break
      case 'trombi':
        this.props.navigation.navigate('Trombi')
        break
      default:
        break
    }
  }

  logout = async () => {
    try {
      await AsyncStorage.removeItem(ACCESS_TOKEN_EXPIRATION_KEY)
      await AsyncStorage.removeItem(ACCESS_TOKEN_KEY)
      await AsyncStorage.removeItem(CLIENT_ID_KEY)
      await AsyncStorage.removeItem(CLIENT_SECRET_KEY)
      this.props.navigation.navigate('Login')
    } catch (e) {
      console.log(e)
    }
  }

  getUserFromMemory = async () => {
    try {
      const userInMemory = await AsyncStorage.getItem(USER_KEY)
      if (!userInMemory) return
      const user = JSON.parse(userInMemory)
      this.props.screenProps.setUser(user)
      this.getOrgasFromMemory()
    } catch (e) {
      console.log(e.response || e)
    }
  }
  updateUser = async () => {
    try {
      const user = await fetchUser()
      await AsyncStorage.setItem(USER_KEY, JSON.stringify(user))
      this.props.screenProps.setUser(user)
      this.updateOrgas()
    } catch (e) {
      console.log(e.response || e)
      this.logout()
    }
  }
  getOrgasFromMemory = async () => {
    try {
      const orgasInMemory = await AsyncStorage.getItem(ORGAS_KEY)
      if (!orgasInMemory) return
      const orgas = JSON.parse(orgasInMemory)
      this.props.screenProps.setOrgas(orgas)
    } catch (e) {
      console.log(e.response || e)
    }
  }
  updateOrgas = async () => {
    try {
      const orgas = await fetchOrgas()
      await AsyncStorage.setItem(ORGAS_KEY, JSON.stringify(orgas))
      this.props.screenProps.setOrgas(orgas)
    } catch (e) {
      console.log(e.response || e)
      this.logout()
    }
  }

  nextTutorial = async () => {
    const tutorials = [
      'tutorial',
      'profile',
      'ue',
      'edt',
      'events',
      'orgas',
      'ung',
      'about',
      'logout',
      'dev',
      'end'
    ]
    const index = tutorials.findIndex(tuto => this.state.tutorial === tuto)
    if (index === -1) return
    if (index + 1 === tutorials.length) {
      this.setState({ tutorial: '' })
      return
    }
    let tutorial = tutorials[index + 1]
    this.setState({ tutorial: '' })
    setTimeout(() => this.setState({ tutorial }), 1000)
  }

  render() {
    const { user, orgas } = this.props.screenProps
    if (!user || !orgas) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    let grid = []
    let content = [
      {
        name: 'Mon profil',
        icon: 'user',
        destination: 'profile',
        tutorialTitle: 'Tu retrouveras ici ton profil !',
        tutorialContent:
          'Toutes tes informations y seront, tel que tu les auras rentrées sur le site étudiant'
      },
      {
        name: 'Guide des UEs',
        icon: 'book',
        destination: 'ue',
        tutorialTitle: 'Voici le guide des UEs !',
        tutorialContent:
          "MATH01, LO02,... Elles t'y attendent toutes ! Tu y retrouveras tes UEs mais tu peux aussi chercher les prochaines que tu souhaites faire"
      },
      {
        name: 'Emploi du temps',
        icon: 'table',
        destination: 'edt',
        tutorialTitle: 'Tu retrouveras ici ton emploi du temps',
        tutorialContent:
          'Désolé mais l\'excuse de "Mince, je ne savais pas qu\'il y avait cours" ne tiendra plus.'
      },
      {
        name: 'Événements',
        icon: 'calendar',
        destination: 'events',
        tutorialTitle: 'Cet onglet te permet de voir les événements étudiants',
        tutorialContent:
          "Tu n'auras plus aucune excuse pour rater une soirée ;)"
      },
      /* {
        name: 'Chat',
        icon: 'comments'
      },
      {
        name: 'Paramètres',
        icon: 'gear'
      },*/
      {
        name: 'Trombinoscopes',
        icon: 'address-book',
        destination: 'trombi',
        tutorialTitle: "Tu cherches quelqu'un ?",
        tutorialContent: 'Tu trouveras peut être cette personne ici.'
      },
      {
        name: 'Associations',
        icon: 'users',
        destination: 'orgas',
        tutorialTitle: 'Le cœur de la vie étudiante',
        tutorialContent:
          "Tu souhaites découvrir les associations de l'UTT ? Elles sont toutes ici !"
      },
      {
        name: '',
        image: require('../assets/images/ung.png'),
        destination: 'ung',
        tutorialTitle: 'Ton humble serviteur',
        tutorialContent:
          "L'UTT Net Group est l'association d'informatique de l'UTT. Tout ce qui touche à l'informatique au niveau associatif, c'est nous ! C'est notamment nous qui développons cette application et le site étudiant ;)"
      },
      {
        name: 'À propos',
        icon: 'question',
        destination: 'about',
        tutorialTitle: 'Tu souhaites en savoir plus ?',
        tutorialContent:
          'Si tu cherches des informations supplémentaires sur cette application, regarde par ici !'
      },
      {
        name: 'Se déconnecter',
        icon: 'sign-out',
        destination: 'logout',
        tutorialTitle: 'Si jamais tu souhaites te déconnecter...',
        tutorialContent: "FAIS PAS ÇA STP :'("
      }
    ]

    let gridContent = []
    for (let i = 0; i < content.length; i += 3) {
      gridContent.push(content.slice(i, i + 3))
    }

    let key = 0
    gridContent.forEach(row => {
      let rowContent = []
      row.forEach(section => {
        rowContent.push(
          <GridButton
            key={key++}
            title={section.name}
            image={
              section.icon ? (
                <Icon name={section.icon} size={70} color='#333' />
              ) : (
                <Image
                  source={section.image}
                  style={section.name ? styles.shortImage : styles.image}
                />
              )
            }
            tutorialTitle={section.tutorialTitle}
            tutorialContent={section.tutorialContent}
            onPress={() => this.click(section.destination)}
            tutorialVisible={this.state.tutorial === section.destination}
            closeTutorial={this.nextTutorial}
          />
        )
      })
      if (rowContent.length < 3) {
        rowContent.push(<View style={styles.empty} key={key++} />)
      }
      if (rowContent.length < 3) {
        rowContent.push(<View style={styles.empty} key={key++} />)
      }
      grid.push(
        <View key={key++} style={styles.row}>
          {rowContent}
        </View>
      )
    })
    return (
      <View style={styles.container}>
        <ScrollView style={styles.grid}>{grid}</ScrollView>
        <Popover
          isVisible={this.state.tutorial === 'tutorial'}
          onRequestClose={this.nextTutorial}
        >
          <Text style={styles.popupTitle}>
            Bienvenu sur ton application MyUTT !
          </Text>
          <Text style={styles.popup}>
            L'UNG est fière de te présenter son nouveau jouet. Ce petit tutoriel
            va t'apprendre les bases de l'application !
          </Text>
        </Popover>
        <Popover
          isVisible={this.state.tutorial === 'dev'}
          onRequestClose={this.nextTutorial}
        >
          <Text style={styles.popupTitle}>Tu souhaites participer ?</Text>
          <Text style={styles.popup}>
            Si tu souhaites aider au développement, en faisant des suggestions
            ou en développant, n'hésite pas à nous contacter par mail :
            <Text style={{ color: '#4098ff' }}> ung@utt.fr</Text>, nous sommes
            ouverts aux suggestions ! Et si tu ne sais pas développer, c'est pas
            grave ! Ça s'apprend ;)
          </Text>
        </Popover>
        <Popover
          isVisible={this.state.tutorial === 'end'}
          onRequestClose={this.nextTutorial}
        >
          <Text style={styles.popupTitle}>Voilà c'est tout</Text>
          <Text style={styles.popup}>
            Évidemment, c'est assez peu pour le moment, mais nous continuons de
            bosser dur pour ajouter toutes les fonctionnalités du site étudiant
            ici, et plus encore !
          </Text>
          <Text style={styles.popupEnd}>L'équipe UNG - UTT Net Group</Text>
        </Popover>
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
    marginTop: 3
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  empty: {
    width: Dimensions.get('window').width / 3 - 6,
    height: Dimensions.get('window').width / 3 - 6,
    marginHorizontal: 1,
    marginVertical: 1
  },
  image: {
    width: Dimensions.get('window').width / 3 - 20,
    height: Dimensions.get('window').width / 3 - 20
  },
  shortImage: {
    width: Dimensions.get('window').width / 4 - 25,
    height: Dimensions.get('window').width / 4 - 25
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  popupTitle: {
    fontSize: 20,
    padding: 10,
    textAlign: 'center'
  },
  popupEnd: {
    fontSize: 15,
    padding: 10,
    textAlign: 'right'
  },
  popup: {
    textAlign: 'justify',
    padding: 10
  }
})

export default createStackNavigator({ MainMenu })
