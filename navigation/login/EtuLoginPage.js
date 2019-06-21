import React from 'react'
import { WebView } from 'react-native'
import config from '../../config'
import { Constants } from 'expo'
import { AsyncStorage } from 'react-native'
import { CLIENT_ID_KEY, CLIENT_SECRET_KEY } from '../../constants/StorageKey'
import { getToken } from '../../services/api'

class EtuLoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.tryLogin(false)
  }

  tryLogin = async (redirect = true) => {
    try {
      const token = await getToken()
      if (token) {
        this.props.navigation.navigate('Main')
      } else {
        if (redirect) this.props.navigation.navigate('Login')
      }
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }

  login = async url => {
    const params = url.split('?')[1].split('&')
    const clientId = params[0].split('=')[1]
    const clientSecret = params[1].split('=')[1]
    try {
      await AsyncStorage.setItem(CLIENT_ID_KEY, clientId)
      await AsyncStorage.setItem(CLIENT_SECRET_KEY, clientSecret)
      this.tryLogin()
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    return (
      <WebView
        source={{
          uri: `${config.etu_utt_baseuri}oauth/client-create?name=${
            config.etu_utt_app_name
          }&device=${Constants.deviceName}&device_uid=${
            Constants.deviceId
          }&scope=${config.etu_utt_scope}`
        }}
        style={{ marginTop: 20 }}
        onLoadStart={e => {
          if (e.nativeEvent.url.indexOf('etuutt.invalid') !== -1) {
            if (e.nativeEvent.url.indexOf('authentification_canceled') === -1) {
              this.login(e.nativeEvent.url)
            } else {
              this.props.navigation.navigate('Login')
            }
          }
        }}
      />
    )
  }
}

export default EtuLoginPage
