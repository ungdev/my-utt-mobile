import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { WebView } from 'react-native-webview'
import config from '../../config'
import Constants from 'expo-constants'
import Icon from 'react-native-vector-icons/FontAwesome'

class EtuLoginPage extends React.Component {
  constructor(props) {
    super(props)
    this.uri = `${config.etu_utt_baseuri}oauth/client-create?name=${config.etu_utt_app_name}&device=${Constants.deviceName}&device_uid=${Constants.deviceId}&scope=${config.etu_utt_scope}`
    this.state = {
      uri: this.uri
    }
  }

  render() {
    let WebViewRef = null
    console.log(this.state.uri, this.uri)
    if (!this.state.uri) {
      this.setState({ uri: this.uri })
      return null
    }
    return (
      <Modal
        animationType={'slide'}
        visible={this.props.visible}
        onRequestClose={() => this.props.closeModal()}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              onPress={() => this.props.closeModal()}
              style={{ marginTop: 20, padding: 10 }}
            >
              <Text style={{ color: '#4098ff' }}>fermer</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => WebViewRef.reload()}
              style={{ marginTop: 20, padding: 10 }}
            >
              <Icon name='refresh' size={20} color='#4098ff' />
            </TouchableOpacity>
          </View>
          <WebView
            ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
            source={{
              uri: this.state.uri
            }}
            startInLoadingState={true}
            originWhitelist={['*']}
            style={{ marginTop: 20 }}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            onLoadStart={e => {
              if (e.nativeEvent.url.indexOf('http://etu.utt.fr/user') !== -1) {
                this.setState({ uri: this.uri })
              }
              if (e.nativeEvent.url.indexOf('http://etu.utt.fr/') !== -1) {
                this.setState({ uri: this.uri })
              }
              if (e.nativeEvent.url.indexOf('https://etu.utt.fr/redirect') !== -1) {
                if (
                  e.nativeEvent.url.indexOf('authentification_canceled') === -1
                ) {
                  this.props.closeModal(e.nativeEvent.url)
                } else {
                  this.props.closeModal()
                }
              }
            }}
          />
        </View>
      </Modal>
    )
  }
}

export default EtuLoginPage
