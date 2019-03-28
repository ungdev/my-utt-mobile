import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Button } from '@ant-design/react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { fetchUEDetails } from '../../../services/api'
import { normalize } from '../../../services/font'
import Tag from '../../../components/Tag'

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
      title : `${navigation.getParam('code', '...')}`,
      headerStyle: {
        backgroundColor: '#4098ff'
      },
      headerTitleStyle: {
        color: 'white'
      },
      headerLeft: Platform.OS === 'ios' && (
        <TouchableOpacity style={styles.back} onPress={() => navigation.pop()}>
          <Icon
            name='angle-left'
            size={32}
            style={{ marginLeft: 10 }}
            color='#fff'
          />
          <Text style={{ marginLeft: 8, color: 'white', fontSize: 20 }}>
            Retour
          </Text>
        </TouchableOpacity>
      )
    }
  }

  getDetails = async slug => {
    try {
      const ue = await fetchUEDetails(slug)
      this.setState({ ue })
    } catch (e) {
      console.log(e)
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    const { ue } = this.state
    const { navigation } = this.props
    if (!ue)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    return (
      <View style={styles.container}>
        <ScrollView style={styles.subcontainer}>
          <Text style={styles.title}>
            {ue.code} - {ue.name}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Tag style={styles.tag}>Automne</Tag>
            <Text style={{ width: 10 }} />
            <Tag style={styles.tag}>Printemps</Tag>
          </View>
          <Text style={styles.subtitle}>Objectifs : </Text>
          <Text style={styles.p}>{ue.objectifs}</Text>
          <Text style={styles.subtitle}>Programme : </Text>
          <Text style={styles.p}>{ue.programme}</Text>
          <Text style={styles.attributes}>Crédits : {ue.credits}</Text>
          {ue.cm > 0 && (
            <Text style={styles.attributes}>Cours magistraux : {ue.cm}</Text>
          )}
          {ue.td > 0 && (
            <Text style={styles.attributes}>Traveaux dirigés : {ue.td}</Text>
          )}
          {ue.tp > 0 && (
            <Text style={styles.attributes}>Traveaux pratiques : {ue.tp}</Text>
          )}
          {ue.the > 0 && (
            <Text style={styles.attributes}>Travail personnel : {ue.the}</Text>
          )}
          <Button
            onPress={() =>
              navigation.navigate('Commentaires', {
                slug: navigation.getParam('slug', '...'),
                code: navigation.getParam('code', '...')
              })
            }
          >
            Voir les commentaires
          </Button>
          <Text style={{ marginBottom: 40 }} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subcontainer: {
    flex: 1,
    marginTop: 15,
    padding: 10,
    backgroundColor: '#fff',
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').width * 0.9
  },
  spin: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: normalize(30),
    textAlign: 'center',
    marginBottom: 20
  },
  subtitle: {
    fontSize: normalize(20),
    marginTop: 20,
    marginBottom: 5,
    color: '#4098ff'
  },
  p: {
    fontSize: normalize(15),
    textAlign: 'justify'
  },
  attributes: {
    fontSize: normalize(15),
    marginTop: 10,
    marginBottom: 5
  },
  tag: {
    marginLeft: 20
  },
  back: { flexDirection: 'row', alignItems: 'center' }
})

export default UEDetailsScreen
