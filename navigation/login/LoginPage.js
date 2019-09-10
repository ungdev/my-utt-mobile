import React from 'react'
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native'
import Button from '../../components/Button'
import { getToken } from '../../services/api'
import EtuLoginPage from './EtuLoginPage'
import { AsyncStorage } from 'react-native'
import { CLIENT_ID_KEY, CLIENT_SECRET_KEY } from '../../constants/StorageKey'

class LoginPage extends React.Component {
  componentDidMount() {
    this.autoLogin()
    this.mount = true
  }
  componentWillUnmount() {
    this.mount = false
  }
  constructor(props) {
    super(props)
    this.state = {
      fetch: true,
      modalVisible: false
    }
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
    if (this.mount) this.setState({ fetch: false })
  }
  closeModal = (url = null) => {
    this.setState({ modalVisible: false, fetch: true })
    if (url) this.login(url)
    else {
      this.setState({ fetch: false })
    }
  }

  login = async url => {
    const params = url.split('?')[1].split('&')
    const clientId = params[0].split('=')[1]
    const clientSecret = params[1].split('=')[1]
    try {
      await AsyncStorage.setItem(CLIENT_ID_KEY, clientId)
      await AsyncStorage.setItem(CLIENT_SECRET_KEY, clientSecret)
      this.autoLogin()
    } catch (e) {
      console.log(e)
      this.setState({ fetch: false })
    }
  }
  render() {
    if (this.state.fetch)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    return (
      <View style={styles.container}>
        <EtuLoginPage
          visible={this.state.modalVisible}
          closeModal={this.closeModal}
        />
        <Image
          source={require('../../assets/images/icon_trans.png')}
          style={{ width: 300, height: 300 }}
        />
        <Button
          onPress={() => this.setState({ modalVisible: true })}
          title='Connexion avec le site étudiant'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  ancientText: {
    color: 'black',
    marginBottom: 10
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default LoginPage
