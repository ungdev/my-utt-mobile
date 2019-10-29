import React from 'react'
import { Linking, StyleSheet, TouchableOpacity } from 'react-native'
import { WebView } from 'react-native-webview'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import Icon from 'react-native-vector-icons/FontAwesome'

class UEReviewViewer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const title = `${navigation.getParam('name', '...')}`
    const button = (
      <TouchableOpacity
        onPress={() => Linking.openURL(navigation.getParam('url', null))}
      >
        <Icon
          name='link'
          color='white'
          size={20}
          style={{ marginHorizontal: 20 }}
        />
      </TouchableOpacity>
    )
    return DefaultTopbar(title, button)
  }

  render() {
    const uri = this.props.navigation.getParam('url', '...')
    return (
      <WebView
        originWhitelist={['*']}
        startInLoadingState={true}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri }}
      />
    )
  }
}

const styles = StyleSheet.create({
  back: { flexDirection: 'row', alignItems: 'center' },
  container: {
    flex: 1
  }
})
export default UEReviewViewer
