import React from 'react'
import { View, StyleSheet, AsyncStorage, ActivityIndicator } from 'react-native'
import { fetchUEs } from '../../../services/api'
import { UES_KEY } from '../../../constants/StorageKey'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import UEList from '../components/UEList'

class MyUEScreen extends React.Component {
  constructor(props) {
    super(props)
    this.getUEsFromServer()
    this.getUEsFromMemory()
    this.state = {
      ues: []
    }
  }
  static navigationOptions = ({ screenProps }) =>
    DefaultTopbar({ navigate: screenProps.goTo }, 'Mes UEs')

  getUEsFromMemory = async () => {
    try {
      const ues = await AsyncStorage.getItem(UES_KEY)
      if (ues) this.setState({ ues: JSON.parse(ues) })
    } catch (e) {
      console.log(e)
    }
  }
  getUEsFromServer = async () => {
    try {
      const ues = await fetchUEs()
      this.setState({ ues })
      await AsyncStorage.setItem(UES_KEY, JSON.stringify(ues))
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }
  render() {
    const { user } = this.props.screenProps
    let { ues } = this.state
    const { navigate } = this.props.navigation
    if (ues.length === 0 || !user)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )

    const myues = user.uvs.map(uv => {
      const found = ues.find(u => u.code === uv)
      return found
        ? found
        : {
            slug: uv.toLowerCase(),
            code: uv,
            name: '',
            category: 'other',
            nodetails: true
          }
    })
    return (
      <View style={styles.container}>
        <UEList
          ues={myues}
          onPress={ue =>
            navigate('UEDetails', { slug: ue.slug, code: ue.code })
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  item: {
    marginRight: 20
  },
  list: {
    marginTop: 0
  }
})

export default MyUEScreen