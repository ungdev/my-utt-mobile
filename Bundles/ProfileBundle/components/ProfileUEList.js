import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  AsyncStorage
} from 'react-native'
import { fetchUEs } from '../../../services/api'
import { UES_KEY } from '../../../constants/StorageKey'
import Tag from '../../../components/Tag'
import Icon from 'react-native-vector-icons/FontAwesome'

class ProfileUEList extends React.Component {
  constructor(props) {
    super(props)
    this.getUEsFromServer()
    this.getUEsFromMemory()
    this.state = {
      ues: []
    }
  }

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
    let { ues, navigation } = this.props
    const allues = this.state.ues
    if (!ues || ues.length <= 0 || allues.length <= 0) return null
    ues = ues.map(
      ue => allues.find(u => u.code === ue) || { code: ue, notFound: true }
    )
    return (
      <View style={styles.container}>
        <Icon name='graduation-cap' size={50} color='#333' />
        <View style={styles.text}>
          <Text style={styles.type}>Liste des UEs</Text>
          <View style={styles.ues}>
            {ues.map(ue =>
              ue.notFound ? (
                <Tag key={ue.code}>{ue.code}</Tag>
              ) : (
                <TouchableOpacity
                  key={ue.slug}
                  onPress={() =>
                    navigation.push('UEDetails', { slug: ue.slug, code: ue.code })
                  }
                >
                  <Tag>{ue.code}</Tag>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    padding: 15
  },
  text: {
    marginLeft: 20
  },
  type: {
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 10
  },
  value: {
    fontSize: 20
  },
  ues: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5
  }
})

export default ProfileUEList
