import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-paper'
import fondation from '../../assets/images/fondationUTT.png'
import utt from '../../assets/images/logo_UTT.png'
import { getToken } from '../../services/api'

class LoginPage extends React.Component {
  componentDidMount() {
    this.autoLogin()
  }

  autoLogin = async () => {
    try {
      console.log('Try Autologin with old credentials if exist')
      const token = await getToken()
      if (token) {
        console.log('Autologin successfull')
        this.props.navigation.navigate('Main')
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
