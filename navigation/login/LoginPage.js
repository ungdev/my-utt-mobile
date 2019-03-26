import React from 'react'
import { View, StyleSheet, Image, AsyncStorage } from 'react-native'
import { Button } from 'react-native-paper'
import fondation from '../../assets/images/fondationUTT.png'
import utt from '../../assets/images/logo_UTT.png'
import moment from 'moment'
import { ACCESS_TOKEN_EXPIRATION_KEY } from '../../constants/StorageKey'

class LoginPage extends React.Component {
  componentDidMount() {
    this.autoLogin()
  }

  autoLogin = async () => {
    try {
      console.log('Try Autologin')
      const expiration_date = await AsyncStorage.getItem(
        ACCESS_TOKEN_EXPIRATION_KEY
      )
      if (expiration_date !== null) {
        if (moment().isBefore(expiration_date * 1000)) {
          console.log('AUTOLOGIN SUCCESSFUL')
          this.props.navigation.navigate('Main')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  login = () => this.props.navigation.navigate('EtuLogin')
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.partners}>
          <Image
            style={{ flex: 4, marginRight: 10, height: 300 }}
            resizeMode='contain'
            source={fondation}
          />
          <Image
            style={{ flex: 4, marginLeft: 10, height: 300 }}
            resizeMode='contain'
            source={utt}
          />
        </View>
        <View style={styles.buttons}>
          <Button mode='contained' onPress={this.login}>
            Se connecter
          </Button>
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
})

export default LoginPage
