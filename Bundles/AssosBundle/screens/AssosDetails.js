import React from 'react'
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Divider } from 'react-native-elements'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { List } from 'react-native-paper'
import { List as AntList } from '@ant-design/react-native'
import { normalize } from '../../../services/font'
import { fetchOrga } from '../../../services/api'
import ProfileElement from '../../ProfileBundle/components/ProfileElement'
import { WebBrowser } from 'expo'
import HTML from 'react-native-render-html'

class AssosDetails extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const asso = navigation.getParam('asso')
    return DefaultTopbar(asso.name)
  }

  constructor(props) {
    super(props)
    this.state = {
      asso: null
    }
    this.getAssoDetails()
  }
  componentDidMount() {}

  filterDescription = description => {
    return description
      ? description.replace(/<img.*?src="(.*?)"[^\>]+>/g, '')
      : ''
  }

  translateRole = role => {
    switch (role) {
      case 'manager':
        return 'Responsable'
      case 'president':
        return 'Président'
      case 'vice_president':
        return 'Vice président'
      case 'secretary':
        return 'Secrétaire'
      case 'vice_secretary':
        return 'Vice secrétaire'
      case 'treasurer':
        return 'Trésorier'
      case 'vice_treasurer':
        return 'Vice trésorier'
      case 'member':
        return 'Membre'
      default:
        return ''
    }
  }

  getAssoDetails = async () => {
    try {
      const navigationAsso = this.props.navigation.getParam('asso')
      const asso = await fetchOrga(navigationAsso.login)
      this.setState({ asso })
    } catch (e) {
      console.log(e)
      this.props.navigation.pop()
    }
  }
  getOrgaImageLink = orga => {
    if (!orga) return null
    return (
      'https://etu.utt.fr' +
      orga._links.find(link => link.rel === 'orga.image').uri
    )
  }

  showPhonePopup = asso => {
    Alert.alert(
      'Voulez vous appeler ou envoyer un message ?',
      `${asso.name} - ${asso.phone}`,
      [
        {
          text: 'Appeler',
          onPress: () => Linking.openURL(`tel:${asso.phone}`)
        },
        {
          text: 'Message',
          onPress: () => Linking.openURL(`sms:${asso.phone}`)
        },
        { text: 'Annuler' }
      ]
    )
  }

  showMailPopup = (name, mail) => {
    Alert.alert(
      'Voulez vous envoyer un mail à cette association ?',
      `${name} - ${mail}`,
      [
        {
          text: 'Ok',
          onPress: () => Linking.openURL(`mailto:${mail}`)
        },
        { text: 'Annuler' }
      ]
    )
  }

  openModal = async link => {
    await WebBrowser.openBrowserAsync(link)
  }

  render() {
    const { asso } = this.state
    if (!asso) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    let groups = []
    const { members } = asso._embed
    members.forEach(member => {
      const groupId = member.group.id
      if (!groups.find(group => group.id === groupId)) groups.push(member.group)
    })
    groups = groups.sort((a, b) => {
      if (a.position > b.position) return 1
      if (a.position < b.position) return -1
      return 0
    })
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.subcontainer}>
          <Text style={styles.title}>{asso.name}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: this.getOrgaImageLink(asso)
              }}
              style={{ width: 150, height: 150 }}
            />
          </View>

          <Text style={styles.p}>{asso.descriptionShort}</Text>
          <Divider style={{ width: '90%', marginVertical: 20 }} />
          <ProfileElement
            type='Téléphone'
            value={asso.phone}
            icon='phone'
            onPress={() => this.showPhonePopup(asso)}
          />
          <ProfileElement
            type='E-mail'
            value={asso.mail}
            icon='envelope'
            onPress={() => this.showMailPopup(asso.name, asso.mail)}
          />
          <ProfileElement
            type='Site web'
            value={asso.website}
            icon='link'
            onPress={() => this.openModal(asso.website)}
          />
          {asso.description !== null && asso.description !== '' && (
            <List.Accordion
              title="Description de l'association"
              style={{ backgroundColor: 'white' }}
            >
              <HTML html={this.filterDescription(asso.description)} />
            </List.Accordion>
          )}

          <Text style={styles.subtitle}>Membres de l'association : </Text>
          {groups.map(group => (
            <AntList renderHeader={group.name} key={group.id}>
              {members
                .filter(member => member.group.id === group.id)
                .sort((a, b) => {
                  if (a.role > b.role) return 1
                  if (a.role < b.role) return -1
                  return 0
                })
                .map(member => (
                  <AntList.Item
                    arrow='horizontal'
                    key={member._embed.user.studentId}
                    onPress={() =>
                      this.props.navigation.push('Profile', {
                        user: member._embed.user
                      })
                    }
                  >
                    <Text>{member._embed.user.fullName}</Text>
                    <AntList.Item.Brief>
                      {this.translateRole(member.role)}
                    </AntList.Item.Brief>
                  </AntList.Item>
                ))}
            </AntList>
          ))}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  subcontainer: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.9
  },
  imageContainer: {
    marginBottom: 15,
    flex: 1,
    alignItems: 'center'
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tags: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  title: {
    fontSize: normalize(30),
    textAlign: 'center',
    marginBottom: 20
  },
  subtitle: {
    fontSize: normalize(20),
    marginTop: 20,
    marginBottom: 5,
    color: '#4098ff'
  },
  p: {
    fontSize: normalize(15),
    textAlign: 'justify'
  }
})

export default AssosDetails
