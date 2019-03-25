import React from 'react'
import { WebView } from 'react-native'
import axios from 'axios'
import config from '../../config'
import { Constants } from 'expo'
import { AsyncStorage } from 'react-native'
import moment from 'moment'
import {
  CLIENT_ID_KEY,
  CLIENT_SECRET_KEY,
  ACCESS_TOKEN_KEY,
  ACCESS_TOKEN_EXPIRATION_KEY
} from '../../constants/StorageKey'

class EtuLoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.tryLogin()
  }

  tryLogin = async () => {
    try {
      const expiration_date = await AsyncStorage.getItem(
        ACCESS_TOKEN_EXPIRATION_KEY
      )
      if (expiration_date) {
        if (moment().isBefore(expiration_date * 1000)) {
          this.props.navigation.navigate('Main')
        }
      }
    } catch (e) {
      console.log(e)
    }
  }

  login = async url => {
    const params = url.split('?')[1].split('&')
    const clientId = params[0].split('=')[1]
    const clientSecret = params[1].split('=')[1]
    this.getToken(clientId, clientSecret)
    try {
      await AsyncStorage.setItem(CLIENT_ID_KEY, clientId)
      await AsyncStorage.setItem(CLIENT_SECRET_KEY, clientSecret)
    } catch (e) {
      console.log(e)
    }
  }

  getToken = async (clientId, clientSecret) => {
    const res = await axios.post(
      `${
        config.etu_utt_baseuri
      }oauth/token?grant_type=client_credentials&scope=${
        config.etu_utt_scope
      }&client_id=${clientId}&client_secret=${clientSecret}`
    )
    //refresh token ?
    try {
      await AsyncStorage.setItem(ACCESS_TOKEN_KEY, res.data.access_token)
      await AsyncStorage.setItem(ACCESS_TOKEN_EXPIRATION_KEY, res.data.expires)
    } catch (e) {
      console.log(e)
    }
    this.props.navigation.navigate('Main')
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
