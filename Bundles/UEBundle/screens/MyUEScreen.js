import React from 'react'
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Text,
  AsyncStorage,
  ActivityIndicator
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { List } from '@ant-design/react-native'
import cs from '../assets/imgs/cs.png'
import tm from '../assets/imgs/tm.png'
import ec from '../assets/imgs/ec.png'
import me from '../assets/imgs/me.png'
import st from '../assets/imgs/st.png'
import ct from '../assets/imgs/ct.png'
import other from '../assets/imgs/other.png'
import { fetchUEs } from '../../../services/api'
import { UES_KEY, USER_KEY } from '../../../constants/StorageKey'

class MyUEScreen extends React.Component {
  constructor(props) {
    super(props)
    this.getUEsFromServer()
    this.getUEsFromMemory()
    this.state = {
      ues: [],
      user: null
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mes UE',
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
      const user = await AsyncStorage.getItem(USER_KEY)
      if (user) this.setState({ user: JSON.parse(user) })
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
    let { ues, user } = this.state
    const { navigate } = this.props.navigation
    if (ues.length === 0 || !user)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )

    const myue = user.uvs.map(uv => {
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
        <List>
          {myue.map((ue, index) => {
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
                console.log(ue.category)

                break
            }
            return (
              <List.Item
                key={index}
                thumb={<Image source={image} style={styles.item} />}
                arrow={ue.nodetails ? null : 'horizontal'}
                onPress={
                  ue.nodetails
                    ? null
                    : () => {
                        navigate('Details', {
                          slug: ue.slug,
                          code: ue.code
                        })
                      }
                }
              >
                <Text>{ue.code}</Text>
                <Text>{ue.name}</Text>
              </List.Item>
            )
          })}
        </List>
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
