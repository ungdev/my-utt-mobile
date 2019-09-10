import React from 'react'
import { ActivityIndicator, View, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-paper'
import fondation from '../../assets/images/fondationUTT.png'
import utt from '../../assets/images/logo_UTT.png'
import { getToken } from '../../services/api'

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
      fetch: true
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

  login = () => this.props.navigation.navigate('EtuLogin')
  render() {
    if (this.state.fetch)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    return (
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/icon_trans.png')}
          style={{ width: 300, height: 300 }}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCDCDC'
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
