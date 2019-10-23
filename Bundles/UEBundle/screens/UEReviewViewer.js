import React from 'react'
import {
  TouchableOpacity,
  Platform,
  StyleSheet,
  Text,
  View,
  WebView
} from 'react-native'

class UEReviewViewer extends React.Component {
  static navigationOptions = ({ navigation }) => {
    let title = `${navigation.getParam('name', '...')}`
    return {
      title,
      headerStyle: {
        backgroundColor: '#4098ff'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: Platform.OS === 'ios' && (
        <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
          <Text style={{ marginLeft: 8, color: 'white', fontSize: 20 }}>
            Retour
          </Text>
        </TouchableOpacity>
      )
    }
  }

  render() {
    const uri = this.props.navigation.getParam('url', '...')
    console.log(uri)
    return (
      <WebView
        originWhitelist={['*']}
        style={{ marginTop: 20 }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        source={{ uri: 'https://etu.utt.fr' }}
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
