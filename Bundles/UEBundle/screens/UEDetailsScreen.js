import React from 'react'
import { ScrollView, StyleSheet, Image, Text, AsyncStorage } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { List } from '@ant-design/react-native'
import cs from '../assets/imgs/cs.png'
import { fetchUEDetails } from '../../../services/api'

class UEDetailsScreen extends React.Component {
  constructor(props) {
    super(props)
    this.getDetails(props.navigation.getParam('slug'))
    this.state = {
      ue: null
    }
  }
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('code', '...')
    }
  }

  getDetails = async slug => {
    try {
      const ue = await fetchUEDetails(slug)
      console.log(ue)
      this.setState({ ue })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    console.log(this.state.ue)
    return (
      <ScrollView style={styles.container}>
        <List>
          <List.Item
            thumb={<Image source={cs} style={styles.item} />}
            arrow='horizontal'
          >
            2
          </List.Item>
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  },
  item: {
    marginRight: 20
  }
})

export default UEDetailsScreen
