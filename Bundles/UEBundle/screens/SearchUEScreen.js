import React from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { InputItem } from '@ant-design/react-native'
import { fetchUEs } from '../../../services/api'
import { UES_KEY } from '../../../constants/StorageKey'
import DefaultTopbar from '../../../constants/DefaultTopbar'
import UEList from '../components/UEList'

class SearchUEScreen extends React.Component {
  constructor(props) {
    super(props)
    this.getUEsFromServer()
    this.getUEsFromMemory()
    this.state = {
      ues: [],
      search: ''
    }
  }
  static navigationOptions = ({ navigation }) =>
    DefaultTopbar(navigation, 'Rechercher une UE')

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
    let { ues } = this.state
    const { navigate } = this.props.navigation
    if (ues.length === 0)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    ues = ues.filter(ue => {
      const fullname = `${ue.slug} ${ue.name}`
      return (
        fullname.toUpperCase().indexOf(this.state.search.toUpperCase()) !== -1
      )
    })
    return (
      <View style={styles.container}>
        <InputItem
          clear
          value={this.state.search}
          onChange={value => {
            this.setState({
              search: value
            })
          }}
          placeholder='Rechercher une UE ici'
        >
          <Icon name='search' size={26} />
        </InputItem>
        <ScrollView style={styles.list}>
          <UEList
            ues={ues}
            onPress={ue =>
              navigate('Details', { slug: ue.slug, code: ue.code })
            }
          />
        </ScrollView>
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
  list: {
    marginTop: 0
  }
})

export default SearchUEScreen
