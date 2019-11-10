import React from 'react'
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Button } from '@ant-design/react-native'
import { fetchUEDetails } from '../../../api/ue'
import { normalize } from '../../../services/font'
import Tag from '../../../components/Tag'
import DefaultTopbar from '../../../constants/DefaultTopbar'

class UEDetails extends React.Component {
  constructor(props) {
    super(props)
    this.getDetails(props.navigation.getParam('slug'))
    this.state = {
      ue: null
    }
  }
  static navigationOptions = ({ navigation }) => {
    let title = `${navigation.getParam('code', '...')}`
    return DefaultTopbar(title)
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

  translateDiplome = diplomes => {
    switch (diplomes) {
      case 'UV mast.':
        return 'UE Master'
      case 'UV ing.':
        return 'UE Ingénieur'
      case 'UV ing. ou UV mast.':
        return 'UE Ingénieur ou Master'
      default:
        return ''
    }
  }

  render() {
    const { ue } = this.state
    const { navigation, screenProps } = this.props
    const { user } = screenProps
    if (!ue)
      return (
        <View style={styles.spin}>
          <ActivityIndicator size='large' color='#4098ff' />
        </View>
      )
    return (
      <View style={styles.container}>
        <ScrollView style={styles.subcontainer}>
          <Text style={styles.title}>{ue.name}</Text>
          {ue.isOld > 0 && <Text style={styles.closed}>(UE fermée)</Text>}
          <Text style={styles.subtitle}>
            {this.translateDiplome(ue.diplomes)}
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
          {ue.mineurs !== '' && <Text style={styles.p}>{ue.mineurs}</Text>}
          <Text style={styles.attributes}>Crédits : {ue.credits}</Text>
          {ue.cm > 0 && (
            <Text style={styles.attributes}>Cours magistraux : {ue.cm}h</Text>
          )}
          {ue.td > 0 && (
            <Text style={styles.attributes}>Traveaux dirigés : {ue.td}h</Text>
          )}
          {ue.tp > 0 && (
            <Text style={styles.attributes}>Traveaux pratiques : {ue.tp}h</Text>
          )}
          {ue.projet > 0 && (
            <Text style={styles.attributes}>Projets : {ue.projet}h</Text>
          )}
          {ue.the > 0 && (
            <Text style={styles.attributes}>Travail personnel : {ue.the}h</Text>
          )}
          {ue.stage > 0 && (
            <Text style={styles.attributes}>Stage : {ue.stage} semaines</Text>
          )}
          {user && user.isStudent && (
            <Button
              onPress={() =>
                navigation.navigate('UECommentaries', {
                  slug: navigation.getParam('slug', '...'),
                  code: navigation.getParam('code', '...')
                })
              }
            >
              Voir les commentaires
            </Button>
          )}
          {user && user.isStudent && (
            <Button
              onPress={() =>
                navigation.navigate('UEReviews', {
                  slug: navigation.getParam('slug', '...'),
                  code: navigation.getParam('code', '...')
                })
              }
            >
              Voir les annales
            </Button>
          )}
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
  closed: {
    fontSize: normalize(20),
    textAlign: 'center',
    marginBottom: 5
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

export default UEDetails
