import React from 'react'
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { List, InputItem } from '@ant-design/react-native'
import cs from '../assets/imgs/cs.png'
import tm from '../assets/imgs/tm.png'
import ec from '../assets/imgs/ec.png'
import me from '../assets/imgs/me.png'
import st from '../assets/imgs/st.png'
import ct from '../assets/imgs/ct.png'
import other from '../assets/imgs/other.png'
import { fetchUEs } from '../../../services/api'
import { UES_KEY } from '../../../constants/StorageKey'

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
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Rechercher une UE',
      headerStyle: {
        backgroundColor: '#4098ff'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.navigate('Main')}>
          <Icon
            name='angle-left'
            size={32}
            style={{ marginLeft: 10 }}
            color='#fff'
          />
        </TouchableOpacity>
      )
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
        <View style={styles.list}>
          <FlatList
            data={ues}
            renderItem={item => {
              const ue = item.item
              let image = other
              switch (ue.category) {
                case 'cs':
                  image = cs
                  break
                case 'tm':
                  image = tm
                  break
                case 'ec':
                  image = ec
                  break
                case 'me':
                  image = me
                  break
                case 'st':
                  image = st
                  break
                case 'ct':
                  image = ct
                  break
                default:
                  break
              }
              return (
                <List key={item.index}>
                  <List.Item
                    key={item.index}
                    thumb={<Image source={image} style={styles.item} />}
                    arrow='horizontal'
                    onPress={() =>
                      navigate('Details', { slug: ue.slug, code: ue.code })
                    }
                  >
                    <Text>{ue.code}</Text>
                    <Text>{ue.name}</Text>
                  </List.Item>
                </List>
              )
            }}
          />
        </View>
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

export default SearchUEScreen
