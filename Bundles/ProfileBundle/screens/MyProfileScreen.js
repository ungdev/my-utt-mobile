import React from 'react'
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  ActivityIndicator
} from 'react-native'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import { Avatar } from 'react-native-paper'
import ProfileElement from '../components/ProfileElement'
import moment from 'moment'

class MyProfile extends React.Component {
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Mon Profile')

  render() {
    const { user } = this.props.screenProps
    if (!user) {
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    }
    console.log(user)
    const image = user._links.find(link => link.rel === 'user.image')
    const image_uri = 'https://etu.utt.fr' + image.uri // TODO replace by config
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Avatar.Image size={170} source={{ uri: image_uri }} />
        <Text style={styles.fullName}>{user.fullName}</Text>
        <Text style={styles.surname}>({user.surname})</Text>
        <ProfileElement
          type='Numéro étudiant'
          value={user.studentId}
          icon='id-card'
        />
        <ProfileElement type='E-mail' value={user.email} icon='envelope' />
        <ProfileElement
          type='E-mail personnel'
          value={user.personnalMail}
          icon='envelope'
        />
        <ProfileElement type='Téléphone' value={user.phone} icon='phone' />
        <ProfileElement
          type='Sexe'
          value={user.sex === 'male' ? 'Homme' : 'Femme'}
          icon='venus-mars'
        />
        <ProfileElement
          type='Nationalité'
          value={user.nationality}
          icon='flag'
        />
        <ProfileElement
          type='Date de naissance'
          value={moment(user.birthday.date).format('DD/MM/YYYY')}
          icon='birthday-cake'
        />
        <ProfileElement
          type='Branche'
          value={user.branch + ' ' + user.level + ' ' + user.speciality}
          icon='graduation-cap'
        />
        {/* TODO
          
          <ProfileElement
          type='Cotidant BDE'
          value={user.bdeMember}
          icon='bde'
        />*/}

        <ProfileElement type='Facebook' value={user.facebook} icon='facebook' />
        <ProfileElement type='Viadeo' value={user.viadeo} icon='viadeo' />
        <ProfileElement type='LinkedIn' value={user.linkedin} icon='linkedin' />
        <ProfileElement
          type='Site internet'
          value={user.website}
          icon='papaerclip'
        />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  fullName: {
    marginTop: 10,
    fontSize: 30
  },
  surname: {
    fontSize: 20
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MyProfile
