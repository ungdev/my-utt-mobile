import React from 'react'
import {
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { Avatar, Divider } from 'react-native-elements'
import ProfileElement from '../components/ProfileElement'
import SocialButton from '../components/SocialButton'
import moment from 'moment'
import ProfileUEList from '../components/ProfileUEList'
import { fetchPublicUser } from '../../../api/user'
import Button from '../../../components/Button'
import config from '../../../config'

class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const user = navigation.getParam('user')
    return DefaultTopbar(user ? user.fullName : 'Mon Profil')
  }

  constructor(props) {
    super(props)
    const user = props.navigation.getParam('user')
    this.state = {
      user: user ? null : props.screenProps.user
    }
    if (user) this.fetchUserInformations(user.login)
  }

  fetchUserInformations = async login => {
    try {
      const user = await fetchPublicUser(login)
      this.setState({ user })
    } catch (e) {
      console.log(e.response || e)
    }
  }

  getAddress = (user, thisuser) => {
    if (user.address && user.postalCode && user.city) {
      return (
        <ProfileElement
          type='Adresse'
          value={
            <Text style={styles.value}>
              {user.address}
              {'  '}
              {user.addressPrivacy !== 'public' &&
                user.studentId === thisuser.studentId && (
                  <Icon name='lock' size={20} color='#000' />
                )}
              {'\n' + user.postalCode}
              {'  '}
              {user.postalCodePrivacy !== 'public' &&
                user.studentId === thisuser.studentId && (
                  <Icon name='lock' size={20} color='#000' />
                )}
              {'\n' + user.city}
              {'  '}
              {user.cityPrivacy !== 'public' &&
                user.studentId === thisuser.studentId && (
                  <Icon name='lock' size={20} color='#000' />
                )}
            </Text>
          }
          icon='home'
        />
      )
    } else {
      return (
        <React.Fragment>
          <ProfileElement type='Adresse' value={user.address} icon='home' />
          <ProfileElement type='Ville' value={user.city} icon='building' />
          <ProfileElement
            type='Code postal'
            value={user.postalCode}
            icon='building'
          />
        </React.Fragment>
      )
    }
  }

  showPhonePopup = user => {
    Alert.alert(
      'Voulez vous appeler ou envoyer un message ?',
      `${user.fullName} ${user.phone}`,
      [
        {
          text: 'Appeler',
          onPress: () => Linking.openURL(`tel:${user.phone}`)
        },
        {
          text: 'Message',
          onPress: () => Linking.openURL(`sms:${user.phone}`)
        },
        { text: 'Annuler' }
      ]
    )
  }

  showMailPopup = (name, mail) => {
    Alert.alert(
      'Voulez vous envoyer un mail à cette personne ?',
      `${name} ${mail}`,
      [
        {
          text: 'Ok',
          onPress: () => Linking.openURL(`mailto:${mail}`)
        },
        { text: 'Annuler' }
      ]
    )
  }
  render() {
    let { user } = this.state
    const thisuser = this.props.screenProps.user
    if (!user) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    const image = user._links.find(link => link.rel === 'user.image')
    const image_uri = config.etu_utt_baseuri + image.uri

    const displayUEList = () => {
      if (!user.uvs || user.uvs.length === 0) return false
      if (user.uvs.length === 1 && user.uvs[0] === '') return false
      return true
    }

    const getUserBranch = user => {
      let r = user.branch
      if (user.level) r += ' ' + user.level
      if (user.speciality) r += ` (${user.speciality})`
      return r
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar
          rounded
          size='xlarge'
          source={{
            uri: image_uri
          }}
        />
        <Text style={styles.fullName}>{user.fullName}</Text>
        {user.surname ? (
          <Text style={styles.surname}>({user.surname})</Text>
        ) : (
          <Text />
        )}
        <View style={styles.social}>
          <SocialButton type='facebook' link={user.facebook} />
          <SocialButton type='linkedin' link={user.linkedin} />
          <SocialButton type='viadeo' link={user.viadeo} />
          <SocialButton type='twitter' link={user.twitter} />
          <SocialButton type='website' link={user.website} />
        </View>
        {user.studentId !== thisuser.studentId && (
          <View style={styles.buttonContainer}>
            <Button
              onPress={() =>
                this.props.navigation.navigate('Timetable', { user })
              }
              title="Voir l'emploi du temps"
            />
          </View>
        )}
        <Divider style={{ width: '90%' }} />
        <ProfileElement
          type='Numéro étudiant'
          value={user.studentId}
          icon='id-card'
        />
        <ProfileElement
          type='Branche'
          value={getUserBranch(user)}
          icon='graduation-cap'
        />
        <ProfileElement
          type='E-mail'
          value={user.email}
          icon='envelope'
          onPress={() => this.showMailPopup(user.fullName, user.email)}
        />
        <ProfileElement
          type='E-mail personnel'
          value={user.personalMail}
          icon='envelope'
          private={
            thisuser.studentId === user.studentId &&
            user.personalMailPrivacy !== 'public'
          }
          onPress={() => this.showMailPopup(user.fullName, user.personalMail)}
        />
        <ProfileElement
          type='Téléphone'
          value={user.phone}
          icon='phone'
          private={
            thisuser.studentId === user.studentId &&
            user.phonePrivacy !== 'public'
          }
          onPress={() => this.showPhonePopup(user)}
        />
        {this.getAddress(user, thisuser)}
        {user.sex !== null && (
          <ProfileElement
            type='Sexe'
            value={user.sex === 'male' ? 'Homme' : 'Femme'}
            icon='venus-mars'
            private={
              thisuser.studentId === user.studentId &&
              user.sexPrivacy !== 'public'
            }
          />
        )}
        <ProfileElement
          type='Nationalité'
          value={user.nationality}
          icon='flag'
          private={
            thisuser.studentId === user.studentId &&
            user.nationalityPrivacy !== 'public'
          }
        />
        <ProfileElement
          type='Date de naissance'
          value={
            user.birthday
              ? moment(
                  typeof user.birthday === 'string'
                    ? user.birthday
                    : user.birthday.date
                ).format('DD/MM/YYYY')
              : null
          }
          icon='birthday-cake'
          private={
            thisuser.studentId === user.studentId &&
            user.birthdayPrivacy !== 'public'
          }
        />
        {displayUEList() && (
          <ProfileUEList ues={user.uvs} navigation={this.props.navigation} />
        )}
        {/* TODO
          
          <ProfileElement
          type='Cotidant BDE'
          value={user.bdeMember}
          icon='bde'
        />*/}
        {/* TODO BADGES */}
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 20
  },
  avatar: { marginTop: 20 },
  value: {
    fontSize: 20
  },
  fullName: {
    marginTop: 10,
    fontSize: 30
  },
  surname: {
    fontSize: 20,
    marginBottom: 20
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  social: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center'
  }
})

export default UserProfile
