import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-paper'
import { AuthSession } from 'expo'
import axios from 'axios'
import fondation from '../assets/images/fondationUTT.png'
import utt from '../assets/images/logo_UTT.png'

class LoginPage extends React.Component {

  constructor(props) {
    super(props)
    this.login = this.login.bind(this)
  }

  componentDidMount () {
    //TODO autologin
  }

  login = async () => {
    console.log('login !')
    url = "https://campus.uttnetgroup.fr/api/v1/etuutt/link"
    try {
      let res = await axios.get(url) //get url to log to
      let result = await AuthSession.startAsync({ //open auth session
        authUrl: res.data.redirectUri
      })
      /*
      when the user logs into etu.utt.fr via utt's CAS, he is redirected to
      https://auth.expo.io/@arnaud9145/campus-utt-mobile
      expo detect that and add the credentials to the result of the promise
      */
      if(result.type === 'success') { //if not the user failed auth or canceled
        this.props.navigation.navigate('Main')
      }
      console.log(result)
    } catch (e) { console.log(e) }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.partners}>
          <Image style={{ flex: 4, marginRight: 10, height: 300 }} resizeMode="contain" source={fondation} />
          <Image style={{ flex: 4, marginLeft: 10, height: 300 }} resizeMode="contain" source={utt} />
        </View>
        <View style={styles.buttons}>
          <Button mode="contained" onPress={this.login} >Se connecter</Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    justifyContent: 'center',
    alignContent: 'center',
    padding: 20
  },
  partners: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start'
  },
  buttons: {
    flex: 8,
    justifyContent: 'center',
    alignContent: 'center'
  }
});


export default LoginPage
