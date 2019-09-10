import React from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { Avatar, Divider } from 'react-native-elements'
import ProfileElement from '../components/ProfileElement'
import SocialButton from '../components/SocialButton'
import moment from 'moment'
import ProfileUEList from '../components/ProfileUEList'

class UserProfile extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Mon Profile')

  getAddress = user => {
    return (
      <Text style={styles.value}>
        {user.address}
        {'  '}
        {user.addressPrivacy !== 'public' && (
          <Icon name='lock' size={20} color='#000' />
        )}
        {'\n' + user.postalCode}
        {'  '}
        {user.postalCodePrivacy !== 'public' && (
          <Icon name='lock' size={20} color='#000' />
        )}
        {'\n' + user.city}
        {'  '}
        {user.cityPrivacy !== 'public' && (
          <Icon name='lock' size={20} color='#000' />
        )}
      </Text>
    )
  }

  render() {
    const { user } = this.props.screenProps
    if (!user) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    const image = user._links.find(link => link.rel === 'user.image')
    const image_uri = 'https://etu.utt.fr' + image.uri // TODO replace by config
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
        <Divider style={{ width: '90%' }} />
        <ProfileElement
          type='Numéro étudiant'
          value={user.studentId}
          icon='id-card'
        />
        <ProfileElement
          type='Branche'
          value={
            user.branch +
            ' ' +
            user.level +
            (user.speciality ? ' ' + user.speciality : '')
          }
          icon='graduation-cap'
        />
        <ProfileElement type='E-mail' value={user.email} icon='envelope' />
        <ProfileElement
          type='E-mail personnel'
          value={user.personnalMail}
          icon='envelope'
          private={user.personnalMailPrivacy !== 'public'}
        />
        <ProfileElement
          type='Téléphone'
          value={user.phone}
          icon='phone'
          private={user.phonePrivacy !== 'public'}
        />
        <ProfileElement
          type='Adresse'
          value={this.getAddress(user)}
          icon='home'
        />
        <ProfileElement
          type='Sexe'
          value={user.sex === 'male' ? 'Homme' : 'Femme'}
          icon='venus-mars'
          private={user.sexPrivacy !== 'public'}
        />
        <ProfileElement
          type='Nationalité'
          value={user.nationality}
          icon='flag'
          private={user.nationalityPrivacy !== 'public'}
        />
        <ProfileElement
          type='Date de naissance'
          value={moment(user.birthday.date).format('DD/MM/YYYY')}
          icon='birthday-cake'
          private={user.birthdayPrivacy !== 'public'}
        />
        <ProfileUEList ues={user.uvs} navigation={this.props.navigation} />
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
    flexGrow: 1,
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
